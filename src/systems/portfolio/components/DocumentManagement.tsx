import React, { useState } from 'react';
import { FileText, Download, Upload, Search, Filter, Trash2, Eye, Edit, Plus, ChevronDown } from 'lucide-react';

// Mock document data
const mockDocuments = [
  { 
    id: 'doc1', 
    name: 'Q2 2023 Portfolio Performance Report', 
    type: 'PDF', 
    category: 'Performance',
    size: '2.4 MB', 
    created: '2023-06-15', 
    lastModified: '2023-06-15',
    author: 'John Smith',
    status: 'Final'
  },
  { 
    id: 'doc2', 
    name: 'Risk Assessment Summary', 
    type: 'XLSX', 
    category: 'Risk',
    size: '1.8 MB', 
    created: '2023-06-02', 
    lastModified: '2023-06-05',
    author: 'Sarah Johnson',
    status: 'Final'
  },
  { 
    id: 'doc3', 
    name: 'Suburb Allocation Analysis', 
    type: 'PDF', 
    category: 'Allocation',
    size: '3.2 MB', 
    created: '2023-05-28', 
    lastModified: '2023-05-30',
    author: 'Michael Brown',
    status: 'Final'
  },
  { 
    id: 'doc4', 
    name: 'Cash Flow Projections', 
    type: 'XLSX', 
    category: 'Financial',
    size: '1.5 MB', 
    created: '2023-05-15', 
    lastModified: '2023-05-20',
    author: 'Emily Wilson',
    status: 'Final'
  },
  { 
    id: 'doc5', 
    name: 'Portfolio Optimization Strategy', 
    type: 'DOCX', 
    category: 'Strategy',
    size: '4.1 MB', 
    created: '2023-05-10', 
    lastModified: '2023-05-12',
    author: 'David Lee',
    status: 'Draft'
  },
  { 
    id: 'doc6', 
    name: 'Investor Presentation', 
    type: 'PPTX', 
    category: 'Investor Relations',
    size: '8.7 MB', 
    created: '2023-04-28', 
    lastModified: '2023-05-05',
    author: 'John Smith',
    status: 'Final'
  },
  { 
    id: 'doc7', 
    name: 'Regulatory Compliance Report', 
    type: 'PDF', 
    category: 'Compliance',
    size: '2.9 MB', 
    created: '2023-04-15', 
    lastModified: '2023-04-18',
    author: 'Sarah Johnson',
    status: 'Final'
  },
  { 
    id: 'doc8', 
    name: 'Market Analysis Q2 2023', 
    type: 'PDF', 
    category: 'Market',
    size: '5.3 MB', 
    created: '2023-04-10', 
    lastModified: '2023-04-12',
    author: 'Michael Brown',
    status: 'Final'
  }
];

// Document categories
const documentCategories = [
  'All',
  'Performance',
  'Risk',
  'Allocation',
  'Financial',
  'Strategy',
  'Investor Relations',
  'Compliance',
  'Market'
];

const DocumentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('lastModified');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  
  // Filter and sort documents
  const filteredDocuments = mockDocuments
    .filter(doc => 
      (selectedCategory === 'All' || doc.category === selectedCategory) &&
      (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
       doc.category.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  
  // Toggle sort direction
  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };
  
  // Toggle document selection
  const toggleDocumentSelection = (docId: string) => {
    if (selectedDocuments.includes(docId)) {
      setSelectedDocuments(selectedDocuments.filter(id => id !== docId));
    } else {
      setSelectedDocuments([...selectedDocuments, docId]);
    }
  };
  
  // Toggle select all documents
  const toggleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(filteredDocuments.map(doc => doc.id));
    }
  };
  
  // Get document icon based on type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <div className="p-2 rounded-md bg-accent-50 text-accent-500"><FileText size={16} /></div>;
      case 'XLSX':
        return <div className="p-2 rounded-md bg-success bg-opacity-10 text-success"><FileText size={16} /></div>;
      case 'DOCX':
        return <div className="p-2 rounded-md bg-primary-50 text-primary-500"><FileText size={16} /></div>;
      case 'PPTX':
        return <div className="p-2 rounded-md bg-warning bg-opacity-10 text-warning"><FileText size={16} /></div>;
      default:
        return <div className="p-2 rounded-md bg-neutral-100 text-neutral-500"><FileText size={16} /></div>;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Document Management</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Manage and organize portfolio documents and reports
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md shadow-sm hover:bg-neutral-50 focus:outline-none transition-colors duration-150 flex items-center">
            <Upload size={14} className="mr-1.5" />
            Upload
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-white bg-primary-600 rounded-md shadow-sm hover:bg-primary-700 focus:outline-none transition-colors duration-150 flex items-center">
            <Plus size={14} className="mr-1.5" />
            New Document
          </button>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-neutral-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {documentCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <button className="inline-flex items-center px-3 py-2 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none transition-colors duration-150">
            <Filter size={14} className="mr-1.5" />
            More Filters
          </button>
        </div>
      </div>
      
      {/* Document table */}
      <div className="bg-white shadow-sm rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <button 
                    className="group inline-flex items-center"
                    onClick={() => toggleSort('name')}
                  >
                    Document
                    <ChevronDown 
                      className={`ml-1 h-4 w-4 ${sortBy === 'name' ? 'text-primary-500' : 'text-neutral-400'} ${
                        sortBy === 'name' && sortDirection === 'desc' ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <button 
                    className="group inline-flex items-center"
                    onClick={() => toggleSort('category')}
                  >
                    Category
                    <ChevronDown 
                      className={`ml-1 h-4 w-4 ${sortBy === 'category' ? 'text-primary-500' : 'text-neutral-400'} ${
                        sortBy === 'category' && sortDirection === 'desc' ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <button 
                    className="group inline-flex items-center"
                    onClick={() => toggleSort('lastModified')}
                  >
                    Last Modified
                    <ChevronDown 
                      className={`ml-1 h-4 w-4 ${sortBy === 'lastModified' ? 'text-primary-500' : 'text-neutral-400'} ${
                        sortBy === 'lastModified' && sortDirection === 'desc' ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  <button 
                    className="group inline-flex items-center"
                    onClick={() => toggleSort('author')}
                  >
                    Author
                    <ChevronDown 
                      className={`ml-1 h-4 w-4 ${sortBy === 'author' ? 'text-primary-500' : 'text-neutral-400'} ${
                        sortBy === 'author' && sortDirection === 'desc' ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredDocuments.map((document) => (
                <tr key={document.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        checked={selectedDocuments.includes(document.id)}
                        onChange={() => toggleDocumentSelection(document.id)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getDocumentIcon(document.type)}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">{document.name}</div>
                        <div className="text-xs text-neutral-500">{document.type} • {document.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-neutral-100 text-neutral-800 rounded-md">
                      {document.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {new Date(document.lastModified).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {document.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                      document.status === 'Final' 
                        ? 'bg-success bg-opacity-10 text-success' 
                        : 'bg-warning bg-opacity-10 text-warning'
                    }`}>
                      {document.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      <Eye size={16} />
                    </button>
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      <Download size={16} />
                    </button>
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      <Edit size={16} />
                    </button>
                    <button className="text-accent-600 hover:text-accent-900">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredDocuments.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-sm text-neutral-500">
                    No documents found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-neutral-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-neutral-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredDocuments.length}</span> of{' '}
                <span className="font-medium">{filteredDocuments.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                  <span className="sr-only">Previous</span>
                  <ChevronDown className="h-5 w-5 transform rotate-90" />
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-primary-50 text-sm font-medium text-primary-600">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500 hover:bg-neutral-50">
                  <span className="sr-only">Next</span>
                  <ChevronDown className="h-5 w-5 transform -rotate-90" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManagement;
