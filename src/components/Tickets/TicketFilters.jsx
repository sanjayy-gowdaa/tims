import React from 'react';
import { useTicketStore } from '@/store/ticketStore';
import { TICKET_CATEGORIES, TICKET_PRIORITIES, TICKET_STATUSES } from '@/utils/constants';

const TicketFilters = () => {
  const { filters, setFilters, resetFilters } = useTicketStore();

  const handleFilterChange = (key, value) => {
    setFilters({ [key]: value });
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-primary-600 hover:text-primary-800"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="status-filter" className="block text-xs font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="input-field text-sm"
          >
            <option value="all">All Statuses</option>
            {TICKET_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="priority-filter" className="block text-xs font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority-filter"
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="input-field text-sm"
          >
            <option value="all">All Priorities</option>
            {TICKET_PRIORITIES.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category-filter" className="block text-xs font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="input-field text-sm"
          >
            <option value="all">All Categories</option>
            {TICKET_CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search-filter" className="block text-xs font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            id="search-filter"
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search tickets..."
            className="input-field text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default TicketFilters;
