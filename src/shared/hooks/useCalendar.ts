import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../services/api/ApiContext';

// Event interface
export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay?: boolean;
  location?: string;
  description?: string;
  attendees?: string[];
  category?: string;
  color?: string;
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string;
    count?: number;
  };
  reminders?: {
    time: number;
    unit: 'minutes' | 'hours' | 'days';
  }[];
}

// Event filters interface
export interface EventFilters {
  categories?: string[];
  attendees?: string[];
  search?: string;
}

// Hook for calendar management
export const useCalendar = () => {
  const { api, loading: apiLoading, error: apiError } = useApi();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<EventFilters>({});
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString()
  });

  // Fetch events
  const fetchEvents = useCallback(async (start?: string, end?: string) => {
    setLoading(true);
    setError(null);

    try {
      const startDate = start || dateRange.start;
      const endDate = end || dateRange.end;

      const response = await api.calendar.getEvents(startDate, endDate);

      // Handle the new response format with status, data, and meta fields
      const data = response.status === 'success' ? response.data : response;

      // Transform the data to match the CalendarEvent interface
      const transformedEvents: CalendarEvent[] = data.map((event: any) => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay || false,
        location: event.location,
        description: event.description,
        attendees: event.attendees,
        category: event.category,
        color: getEventColor(event.category),
        recurrence: event.recurrence,
        reminders: event.reminders
      }));

      setEvents(transformedEvents);

      if (start && end) {
        setDateRange({ start, end });
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch events'));
    } finally {
      setLoading(false);
    }
  }, [api.calendar, dateRange]);

  // Get event color based on category
  const getEventColor = (category?: string): string => {
    if (!category) return '#6b81ad'; // Default color (primary)

    switch (category.toLowerCase()) {
      case 'meeting':
        return '#6b81ad'; // Primary color
      case 'presentation':
        return '#5a9e9e'; // Secondary color
      case 'training':
        return '#8f6e3b'; // Warning color
      case 'deadline':
        return '#a14545'; // Error color
      case 'personal':
        return '#3b7861'; // Success color
      default:
        return '#6b81ad'; // Default color (primary)
    }
  };

  // Apply filters
  const applyFilters = useCallback((newFilters: EventFilters) => {
    setFilters(newFilters);
  }, []);

  // Get filtered events
  const getFilteredEvents = useCallback(() => {
    return events.filter(event => {
      // Filter by categories
      if (filters.categories && filters.categories.length > 0 && event.category) {
        if (!filters.categories.includes(event.category)) {
          return false;
        }
      }

      // Filter by attendees
      if (filters.attendees && filters.attendees.length > 0 && event.attendees) {
        const hasMatchingAttendee = event.attendees.some(attendee =>
          filters.attendees?.includes(attendee)
        );

        if (!hasMatchingAttendee) {
          return false;
        }
      }

      // Filter by search term
      if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.toLowerCase();
        const titleMatch = event.title.toLowerCase().includes(searchTerm);
        const locationMatch = event.location?.toLowerCase().includes(searchTerm) || false;
        const descriptionMatch = event.description?.toLowerCase().includes(searchTerm) || false;

        if (!titleMatch && !locationMatch && !descriptionMatch) {
          return false;
        }
      }

      return true;
    });
  }, [events, filters]);

  // Create event
  const createEvent = useCallback(async (event: Omit<CalendarEvent, 'id'>) => {
    setLoading(true);
    setError(null);

    try {
      const newEvent = await api.calendar.createEvent(event);

      // Add color based on category
      newEvent.color = getEventColor(newEvent.category);

      setEvents(prevEvents => [...prevEvents, newEvent]);
      return newEvent;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create event'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api.calendar]);

  // Update event
  const updateEvent = useCallback(async (id: string, updates: Partial<CalendarEvent>) => {
    setLoading(true);
    setError(null);

    try {
      await api.calendar.updateEvent(id, updates);

      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === id
            ? {
                ...event,
                ...updates,
                color: updates.category ? getEventColor(updates.category) : event.color
              }
            : event
        )
      );

      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update event'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api.calendar]);

  // Delete event
  const deleteEvent = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await api.calendar.deleteEvent(id);

      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete event'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api.calendar]);

  // Change date range
  const changeDateRange = useCallback((start: string, end: string) => {
    fetchEvents(start, end);
  }, [fetchEvents]);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    filteredEvents: getFilteredEvents(),
    loading: loading || apiLoading,
    error: error || apiError,
    dateRange,
    filters,
    applyFilters,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    changeDateRange
  };
};

export default useCalendar;
