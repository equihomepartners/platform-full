import { create } from 'zustand';
import { Task } from '../types';

interface TaskState {
  tasks: Task[];
  selectedTaskId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setTasks: (tasks: Task[]) => void;
  setSelectedTaskId: (id: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

// Mock data for development
const mockTasks: Task[] = [
  {
    id: 'task-1-1',
    dealId: '1',
    title: 'Initial review',
    description: 'Perform initial review of application for John Smith',
    assignedTo: 'underwriter1',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    createdBy: 'system',
    createdAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString()
  },
  {
    id: 'task-2-1',
    dealId: '2',
    title: 'Property valuation',
    description: 'Verify property valuation for 456 High St',
    assignedTo: 'underwriter2',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in-progress',
    createdBy: 'underwriter1',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'task-3-1',
    dealId: '3',
    title: 'Final approval',
    description: 'Prepare final approval for Robert Johnson\'s application',
    assignedTo: 'manager1',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in-progress',
    createdBy: 'underwriter2',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lastUpdatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const useTaskStore = create<TaskState>((set) => ({
  tasks: mockTasks,
  selectedTaskId: null,
  isLoading: false,
  error: null,
  
  // Actions
  setTasks: (tasks) => set({ tasks }),
  setSelectedTaskId: (id) => set({ selectedTaskId: id }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, task]
  })),
  
  updateTask: (id, updatedTask) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    )
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id)
  }))
}));
