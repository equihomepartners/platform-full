import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Deal, Task } from '../../types';

interface TaskManagerProps {
  deals: Deal[];
  isLoading: boolean;
}

const TaskManager: React.FC<TaskManagerProps> = ({ deals, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Generate mock tasks from deals
  const generateTasks = (deals: Deal[]): Task[] => {
    const tasks: Task[] = [];
    
    deals.forEach(deal => {
      // Add a task for each deal based on its status
      switch (deal.status) {
        case 'new':
          tasks.push({
            id: `task-${deal.id}-1`,
            dealId: deal.id,
            title: 'Initial review',
            description: `Perform initial review of application for ${deal.borrower.name}`,
            assignedTo: 'underwriter1',
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
            createdBy: 'system',
            createdAt: deal.submittedAt,
            lastUpdatedAt: deal.submittedAt
          });
          break;
        case 'in-review':
          tasks.push({
            id: `task-${deal.id}-2`,
            dealId: deal.id,
            title: 'Property valuation',
            description: `Verify property valuation for ${deal.property.address}`,
            assignedTo: 'underwriter2',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'in-progress',
            createdBy: 'underwriter1',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            lastUpdatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          });
          break;
        case 'underwriting':
          tasks.push({
            id: `task-${deal.id}-3`,
            dealId: deal.id,
            title: 'Final approval',
            description: `Prepare final approval for ${deal.borrower.name}'s application`,
            assignedTo: 'manager1',
            dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'in-progress',
            createdBy: 'underwriter2',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            lastUpdatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          });
          break;
        default:
          // No tasks for other statuses
          break;
      }
    });
    
    return tasks;
  };

  const tasks = generateTasks(deals);

  // Filter tasks based on search term and status filter
  const filteredTasks = tasks.filter(task => {
    const deal = deals.find(d => d.id === task.dealId);
    if (!deal) return false;
    
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.property.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get deal information
  const getDealInfo = (dealId: string) => {
    const deal = deals.find(d => d.id === dealId);
    return deal ? `${deal.borrower.name} - ${deal.property.address}` : 'Unknown Deal';
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading tasks...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Add Task</Button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="flex justify-center items-center h-64 bg-gray-50 rounded-md">
          <p className="text-gray-500">No tasks found matching your criteria.</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Deal</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-gray-500">{task.description}</div>
                  </TableCell>
                  <TableCell>{getDealInfo(task.dealId)}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>{formatDate(task.dueDate)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(task.status)}>
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
