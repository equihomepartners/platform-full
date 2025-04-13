import React, { useState } from 'react';
import { Search, FileText, Download, ExternalLink, ChevronRight } from 'lucide-react';

const Documentation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const documentationCategories = [
    { id: 'all', name: 'All Documentation' },
    { id: 'user', name: 'User Guides' },
    { id: 'admin', name: 'Administration' },
    { id: 'api', name: 'API Documentation' },
    { id: 'security', name: 'Security & Compliance' },
    { id: 'release', name: 'Release Notes' }
  ];

  const documentationItems = [
    {
      id: 1,
      title: 'User Manual',
      description: 'Complete guide to using the Equihome platform',
      category: 'user',
      lastUpdated: '2023-05-15',
      format: 'PDF',
      url: '/docs/user-manual.pdf'
    },
    {
      id: 2,
      title: 'API Documentation',
      description: 'Technical guide for developers',
      category: 'api',
      lastUpdated: '2023-06-01',
      format: 'PDF',
      url: '/docs/api-docs.pdf'
    },
    {
      id: 3,
      title: 'Compliance Guidelines',
      description: 'Regulatory and security compliance information',
      category: 'security',
      lastUpdated: '2023-05-20',
      format: 'PDF',
      url: '/docs/compliance.pdf'
    },
    {
      id: 4,
      title: 'Administrator Guide',
      description: 'Guide for system administrators',
      category: 'admin',
      lastUpdated: '2023-05-10',
      format: 'PDF',
      url: '/docs/admin-guide.pdf'
    },
    {
      id: 5,
      title: 'Traffic Light System Guide',
      description: 'Guide to using the Traffic Light System',
      category: 'user',
      lastUpdated: '2023-05-25',
      format: 'PDF',
      url: '/docs/traffic-light-guide.pdf'
    },
    {
      id: 6,
      title: 'Portfolio Management Guide',
      description: 'Guide to using the Portfolio Management System',
      category: 'user',
      lastUpdated: '2023-05-28',
      format: 'PDF',
      url: '/docs/portfolio-guide.pdf'
    },
    {
      id: 7,
      title: 'Underwriting System Guide',
      description: 'Guide to using the Underwriting System',
      category: 'user',
      lastUpdated: '2023-05-30',
      format: 'PDF',
      url: '/docs/underwriting-guide.pdf'
    },
    {
      id: 8,
      title: 'Release Notes v1.2.5',
      description: 'Latest release notes for version 1.2.5',
      category: 'release',
      lastUpdated: '2023-06-05',
      format: 'HTML',
      url: '/docs/release-notes-v1.2.5.html'
    }
  ];

  const filteredDocumentation = documentationItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const downloadDocument = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-neutral-900">Documentation</h2>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-150">
          <FileText size={16} className="mr-2" />
          Upload Document
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:placeholder-neutral-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search documentation"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white rounded-md shadow-sm border border-neutral-200 overflow-hidden">
            <nav className="flex flex-col">
              {documentationCategories.map(category => (
                <button
                  key={category.id}
                  className={`flex items-center px-4 py-3 text-sm font-medium ${
                    activeCategory === category.id
                      ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {filteredDocumentation.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-md shadow-sm border border-neutral-200">
              <p className="text-neutral-500">No documentation found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocumentation.map(doc => (
                <div key={doc.id} className="bg-white rounded-md shadow-sm border border-neutral-200 p-4 hover:shadow-md transition-shadow duration-150">
                  <div className="flex items-start">
                    <div className="p-2 rounded-md bg-primary-50 text-primary-500 mr-3">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-neutral-900">{doc.title}</h3>
                      <p className="text-xs text-neutral-500 mt-0.5">{doc.description}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-neutral-500">Last updated: {doc.lastUpdated}</span>
                        <span className="mx-2 text-neutral-300">•</span>
                        <span className="text-xs text-neutral-500">{doc.format}</span>
                      </div>
                    </div>
                    <button 
                      className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none transition-colors duration-150"
                      onClick={() => downloadDocument(doc.url)}
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Documentation;
