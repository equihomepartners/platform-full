import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../../services/api/ApiContext';

// Task status enum
export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  DONE = 'done'
}

// Task priority enum
export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

// Task interface
export interface Task {
  id: string | number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  attachments?: any[];
  comments?: any[];
}

// Task filters interface
export interface TaskFilters {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  assignee?: string[];
  dueDate?: {
    from?: string;
    to?: string;
  };
  search?: string;
}

// Hook for task management
export const useTasks = () => {
  const { api, loading: apiLoading, error: apiError } = useApi();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({});

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.dashboard.getPendingTasks();

      // Handle the new response format with status, data, and meta fields
      const data = response.status === 'success' ? response.data : response;

      // Transform the data to match the Task interface
      const transformedTasks: Task[] = data.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description || '',
        status: task.status || TaskStatus.TODO,
        priority: task.priority || TaskPriority.MEDIUM,
        dueDate: task.dueDate,
        assignee: task.assignee,
        createdBy: task.createdBy || 'System',
        createdAt: task.createdAt || new Date().toISOString(),
        updatedAt: task.updatedAt || new Date().toISOString(),
        tags: task.tags || [],
        attachments: task.attachments || [],
        comments: task.comments || []
      }));

      setTasks(transformedTasks);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch tasks'));
    } finally {
      setLoading(false);
    }
  }, [api.dashboard]);

  // Apply filters
  const applyFilters = useCallback((newFilters: TaskFilters) => {
    setFilters(newFilters);
  }, []);

  // Get filtered tasks
  const getFilteredTasks = useCallback(() => {
    return tasks.filter(task => {
      // Filter by status
      if (filters.status && filters.status.length > 0 && !filters.status.includes(task.status)) {
        return false;
      }

      // Filter by priority
      if (filters.priority && filters.priority.length > 0 && !filters.priority.includes(task.priority)) {
        return false;
      }

      // Filter by assignee
      if (filters.assignee && filters.assignee.length > 0 && !filters.assignee.includes(task.assignee)) {
        return false;
      }

      // Filter by due date
      if (filters.dueDate) {
        const taskDueDate = new Date(task.dueDate);

        if (filters.dueDate.from) {
          const fromDate = new Date(filters.dueDate.from);
          if (taskDueDate < fromDate) {
            return false;
          }
        }

        if (filters.dueDate.to) {
          const toDate = new Date(filters.dueDate.to);
          if (taskDueDate > toDate) {
            return false;
          }
        }
      }

      // Filter by search term
      if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.toLowerCase();
        const titleMatch = task.title.toLowerCase().includes(searchTerm);
        const descriptionMatch = task.description?.toLowerCase().includes(searchTerm) || false;

        if (!titleMatch && !descriptionMatch) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, filters]);

  // Create task
  const createTask = useCallback(async (task: Omit<Task, 'id'>) => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call an API endpoint
      const newTask: Task = {
        ...task,
        id: `task_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setTasks(prevTasks => [...prevTasks, newTask]);
      return newTask;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create task'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update task
  const updateTask = useCallback(async (id: string | number, updates: Partial<Task>) => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call an API endpoint
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id
            ? {
                ...task,
                ...updates,
                updatedAt: new Date().toISOString()
              }
            : task
        )
      );

      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update task'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete task
  const deleteTask = useCallback(async (id: string | number) => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call an API endpoint
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete task'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add comment to task
  const addComment = useCallback(async (taskId: string | number, comment: string) => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call an API endpoint
      const newComment = {
        id: `comment_${Date.now()}`,
        text: comment,
        createdBy: 'You',
        createdAt: new Date().toISOString()
      };

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? {
                ...task,
                comments: [...(task.comments || []), newComment],
                updatedAt: new Date().toISOString()
              }
            : task
        )
      );

      return newComment;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add comment'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add attachment to task
  const addAttachment = useCallback(async (taskId: string | number, attachment: any) => {
    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would call an API endpoint
      const newAttachment = {
        id: `attachment_${Date.now()}`,
        name: attachment.name,
        size: attachment.size,
        type: attachment.type,
        url: URL.createObjectURL(attachment),
        uploadedBy: 'You',
        uploadedAt: new Date().toISOString()
      };

      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? {
                ...task,
                attachments: [...(task.attachments || []), newAttachment],
                updatedAt: new Date().toISOString()
              }
            : task
        )
      );

      return newAttachment;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add attachment'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    filteredTasks: getFilteredTasks(),
    loading: loading || apiLoading,
    error: error || apiError,
    filters,
    applyFilters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    addComment,
    addAttachment
  };
};

export default useTasks;
