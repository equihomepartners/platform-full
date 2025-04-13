import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Home,
  DollarSign,
  Percent,
  User,
  Calendar,
  MapPin,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { usePortfolioStore } from '../store';

const PortfolioManagement: React.FC = () => {
  const {
    loans,
    loadingLoans,
    loansError,
    fetchLoans
  } = usePortfolioStore();

  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('suburb');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    zone: 'all',
    propertyType: 'all',
    ltvRange: 'all'
  });

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  // Handle sorting
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort loans
  const filteredLoans = loans
    .filter(loan => {
      // Search filter
      if (searchTerm && !loan.suburb.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !loan.location.address.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Zone filter
      if (filters.zone !== 'all' && loan.zone !== filters.zone) {
        return false;
      }

      // Property type filter
      if (filters.propertyType !== 'all' && loan.propertyDetails.type !== filters.propertyType) {
        return false;
      }

      // LTV range filter
      if (filters.ltvRange !== 'all') {
        const ltv = loan.ltv;
        if (filters.ltvRange === '0-20' && (ltv < 0 || ltv > 20)) return false;
        if (filters.ltvRange === '20-40' && (ltv < 20 || ltv > 40)) return false;
        if (filters.ltvRange === '40-60' && (ltv < 40 || ltv > 60)) return false;
        if (filters.ltvRange === '60-80' && (ltv < 60 || ltv > 80)) return false;
        if (filters.ltvRange === '80+' && ltv < 80) return false;
      }

      return true;
    })
    .sort((a, b) => {
      let valueA, valueB;

      switch (sortField) {
        case 'suburb':
          valueA = a.suburb;
          valueB = b.suburb;
          break;
        case 'propertyValue':
          valueA = a.propertyValue;
          valueB = b.propertyValue;
          break;
        case 'loanAmount':
          valueA = a.loanAmount;
          valueB = b.loanAmount;
          break;
        case 'ltv':
          valueA = a.ltv;
          valueB = b.ltv;
          break;
        case 'irr':
          valueA = a.performanceMetrics.irr;
          valueB = b.performanceMetrics.irr;
          break;
        default:
          valueA = a.suburb;
          valueB = b.suburb;
      }

      if (typeof valueA === 'string') {
        return sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortDirection === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      }
    });

  // Loading state
  if (loadingLoans) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Error state
  if (loansError) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Error Loading Loans</h2>
        <p className="text-gray-500">
          {loansError.message || 'Unable to load loan data. Please try again later.'}
        </p>
        <button
          onClick={() => fetchLoans()}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-primary-900">Portfolio Management</h1>
            <p className="text-sm text-neutral-600 mt-1">
              Manage and optimize your loan portfolio across multiple suburbs and property types
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right mr-4">
              <p className="text-sm font-medium text-neutral-500">Total Loans</p>
              <p className="text-xl font-bold text-primary-700">{filteredLoans.length}</p>
            </div>
            <button className="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md shadow-sm hover:bg-primary-700 flex items-center">
              <Plus size={16} className="mr-1.5" />
              Add Loan
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-primary-50 rounded-full mr-3 border border-primary-100">
            <Filter size={20} className="text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary-800">Search & Filter</h3>
            <p className="text-sm text-neutral-600 mt-1">Find and filter loans by various criteria</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search by suburb or address"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={filters.zone}
                onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
              >
                <option value="all">All Zones</option>
                <option value="green">Green Zone</option>
                <option value="yellow">Yellow Zone</option>
                <option value="red">Red Zone</option>
              </select>
            </div>

            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={filters.propertyType}
                onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              >
                <option value="all">All Property Types</option>
                <option value="House">Houses</option>
                <option value="Apartment">Apartments</option>
                <option value="Townhouse">Townhouses</option>
              </select>
            </div>

            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={filters.ltvRange}
                onChange={(e) => setFilters({ ...filters, ltvRange: e.target.value })}
              >
                <option value="all">All LTV Ranges</option>
                <option value="0-20">0-20%</option>
                <option value="20-40">20-40%</option>
                <option value="40-60">40-60%</option>
                <option value="60-80">60-80%</option>
                <option value="80+">80%+</option>
              </select>
            </div>

            <button
              className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none transition-colors duration-150"
              onClick={() => setFilters({ zone: 'all', propertyType: 'all', ltvRange: 'all' })}
            >
              <Filter className="h-4 w-4 mr-2" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('suburb')}
                >
                  <div className="flex items-center">
                    Suburb
                    {sortField === 'suburb' && (
                      <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === 'asc' ? 'text-primary-600' : 'text-primary-600 transform rotate-180'}`} />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('propertyValue')}
                >
                  <div className="flex items-center">
                    Property Value
                    {sortField === 'propertyValue' && (
                      <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === 'asc' ? 'text-primary-600' : 'text-primary-600 transform rotate-180'}`} />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('loanAmount')}
                >
                  <div className="flex items-center">
                    Loan Amount
                    {sortField === 'loanAmount' && (
                      <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === 'asc' ? 'text-primary-600' : 'text-primary-600 transform rotate-180'}`} />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('ltv')}
                >
                  <div className="flex items-center">
                    LTV
                    {sortField === 'ltv' && (
                      <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === 'asc' ? 'text-primary-600' : 'text-primary-600 transform rotate-180'}`} />
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('irr')}
                >
                  <div className="flex items-center">
                    IRR
                    {sortField === 'irr' && (
                      <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === 'asc' ? 'text-primary-600' : 'text-primary-600 transform rotate-180'}`} />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Zone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredLoans.map((loan) => (
                <tr
                  key={loan.id}
                  className={`hover:bg-neutral-50 ${selectedLoan?.id === loan.id ? 'bg-primary-50' : ''}`}
                  onClick={() => setSelectedLoan(loan)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                    {loan.suburb}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    ${loan.propertyValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    ${loan.loanAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {loan.ltv.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {loan.performanceMetrics.irr}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      loan.zone === 'green' ? 'bg-green-100 text-green-800' :
                      loan.zone === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-accent-100 text-accent-800'
                    }`}>
                      {loan.zone.charAt(0).toUpperCase() + loan.zone.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    <button
                      className="text-primary-600 hover:text-primary-900 transition-colors duration-150"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLoan(loan);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLoans.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-neutral-500">
                    No loans found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loan Details */}
      {selectedLoan && (
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold text-primary-800">Loan Details</h2>
            <button
              className="text-neutral-400 hover:text-neutral-500 transition-colors duration-150"
              onClick={() => setSelectedLoan(null)}
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="space-y-6">
              <div className="flex items-center">
                <Home className="h-5 w-5 text-primary-600 mr-2" />
                <h3 className="text-lg font-semibold text-primary-800">Property Details</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-neutral-500">Address</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.location.address}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Property Type</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.propertyDetails.type}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Bedrooms / Bathrooms</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.propertyDetails.bedrooms} / {selectedLoan.propertyDetails.bathrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Land Size</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.propertyDetails.landSize} m²</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Year Built</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.propertyDetails.yearBuilt}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Condition</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.propertyDetails.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Yearly Growth</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.propertyDetails.yearlyGrowth}%</p>
                </div>
              </div>
            </div>

            {/* Loan Terms */}
            <div className="space-y-6">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-secondary-600 mr-2" />
                <h3 className="text-lg font-semibold text-primary-800">Loan Terms</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-neutral-500">Loan Amount</p>
                  <p className="text-sm font-medium text-neutral-900">${selectedLoan.loanAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Property Value</p>
                  <p className="text-sm font-medium text-neutral-900">${selectedLoan.propertyValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">LTV</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.ltv.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Interest Rate</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.loanTerms.interestRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Start Date</p>
                  <p className="text-sm font-medium text-neutral-900">{new Date(selectedLoan.loanTerms.startDate).toLocaleDateString('en-AU')}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">End Date</p>
                  <p className="text-sm font-medium text-neutral-900">{new Date(selectedLoan.loanTerms.endDate).toLocaleDateString('en-AU')}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Payment Frequency</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.loanTerms.paymentFrequency.charAt(0).toUpperCase() + selectedLoan.loanTerms.paymentFrequency.slice(1)}</p>
                </div>
              </div>
            </div>

            {/* Performance & Risk */}
            <div className="space-y-6">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-primary-600 mr-2" />
                <h3 className="text-lg font-semibold text-primary-800">Performance & Risk</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-neutral-500">IRR</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.performanceMetrics.irr}%</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">ROI</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.performanceMetrics.roi}%</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Cash Yield</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.performanceMetrics.cashYield}%</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Total Return</p>
                  <p className="text-sm font-medium text-neutral-900">${selectedLoan.performanceMetrics.totalReturn.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Default Probability</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.riskMetrics.defaultProbability}%</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Expected Loss</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.riskMetrics.expectedLoss}%</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Stress Test Impact</p>
                  <p className="text-sm font-medium text-neutral-900">{selectedLoan.riskMetrics.stressTestImpact}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Borrower Details */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-primary-600 mr-2" />
              <h3 className="text-lg font-semibold text-primary-800">Borrower Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-neutral-500">Name</p>
                <p className="text-sm font-medium text-neutral-900">{selectedLoan.borrowerDetails.name}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Income</p>
                <p className="text-sm font-medium text-neutral-900">${selectedLoan.borrowerDetails.income.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Occupation</p>
                <p className="text-sm font-medium text-neutral-900">{selectedLoan.borrowerDetails.occupation}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Credit Score</p>
                <p className="text-sm font-medium text-neutral-900">{selectedLoan.borrowerDetails.creditScore}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-150">
                View Full Details
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-150">
                Edit Loan
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-150">
                Download Documents
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioManagement;
