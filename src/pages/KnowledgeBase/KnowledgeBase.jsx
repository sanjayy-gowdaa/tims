import React, { useState } from 'react';
import { MagnifyingGlassIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 1,
      name: 'Getting Started',
      articles: 12,
      icon: '🚀',
      description: 'Learn the basics of using TIMS',
    },
    {
      id: 2,
      name: 'IT Support',
      articles: 28,
      icon: '💻',
      description: 'Common IT issues and solutions',
    },
    {
      id: 3,
      name: 'HR Policies',
      articles: 15,
      icon: '👥',
      description: 'Human resources guidelines',
    },
    {
      id: 4,
      name: 'Facilities',
      articles: 10,
      icon: '🏢',
      description: 'Building and facility management',
    },
    {
      id: 5,
      name: 'Finance',
      articles: 18,
      icon: '💰',
      description: 'Financial processes and procedures',
    },
    {
      id: 6,
      name: 'Security',
      articles: 22,
      icon: '🔒',
      description: 'Security policies and best practices',
    },
  ];

  const popularArticles = [
    'How to reset your password',
    'VPN setup guide',
    'Submit expense reports',
    'Request hardware equipment',
    'Access building after hours',
  ];

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
        <p className="mt-1 text-sm text-gray-600">
          Find answers and solutions to common questions
        </p>
      </div>

      {/* Search Bar */}
      <div className="card mb-8">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
            placeholder="Search for articles, guides, and solutions..."
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="card hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="text-4xl mb-3">{category.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{category.description}</p>
            <div className="flex items-center text-sm text-gray-500">
              <BookOpenIcon className="h-4 w-4 mr-1" />
              <span>{category.articles} articles</span>
            </div>
          </div>
        ))}
      </div>

      {/* Popular Articles */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Articles</h3>
        <ul className="space-y-3">
          {popularArticles.map((article, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex items-center text-sm text-primary-600 hover:text-primary-800"
              >
                <span className="mr-2">→</span>
                {article}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KnowledgeBase;
