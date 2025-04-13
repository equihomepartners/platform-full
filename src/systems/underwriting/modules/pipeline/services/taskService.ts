import { Task } from '../types';

// Task Service
export const TaskService = {
  // Get all tasks
  getTasks: async (): Promise<Task[]> => {
    try {
      const response = await fetch('/api/underwriting/pipeline/tasks');
      const data = await response.json();
      return data.tasks;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Get tasks for a deal
  getTasksForDeal: async (dealId: string): Promise<Task[]> => {
    try {
      const response = await fetch(`/api/underwriting/pipeline/deals/${dealId}/tasks`);
      const data = await response.json();
      return data.tasks;
    } catch (error) {
      console.error(`Error fetching tasks for deal ${dealId}:`, error);
      throw error;
    }
  },

  // Create a new task
  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    try {
      const response = await fetch('/api/underwriting/pipeline/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update a task
  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    try {
      const response = await fetch(`/api/underwriting/pipeline/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (id: string): Promise<void> => {
    try {
      await fetch(`/api/underwriting/pipeline/tasks/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  },
};
