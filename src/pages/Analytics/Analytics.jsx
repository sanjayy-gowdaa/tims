import React from 'react';
import { useQuery } from 'react-query';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { analyticsService } from '@/services/analyticsService';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const { data: analytics, isLoading } = useQuery(
    'analytics',
    analyticsService.getTicketStats,
    {
      initialData: {
        categoryStats: [],
        agentPerformance: [],
        mttr: '0h',
        slaCompliance: 0,
      },
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const categoryChartData = {
    labels: analytics.categoryStats?.map(c => c.name) || [],
    datasets: [
      {
        label: 'Tickets by Category',
        data: analytics.categoryStats?.map(c => c.count) || [],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  const agentChartData = {
    labels: analytics.agentPerformance?.map(a => a.name) || [],
    datasets: [
      {
        label: 'Tickets Resolved',
        data: analytics.agentPerformance?.map(a => a.resolved) || [],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
      {
        label: 'Avg Resolution Time (hrs)',
        data: analytics.agentPerformance?.map(a => a.avgTime) || [],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
    ],
  };

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="mt-1 text-sm text-gray-600">
          Comprehensive insights and performance metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Mean Time to Resolution</h3>
          <p className="text-3xl font-bold text-gray-900">{analytics.mttr}</p>
          <p className="text-sm text-green-600 mt-1">↓ 15% from last month</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500 mb-1">SLA Compliance</h3>
          <p className="text-3xl font-bold text-gray-900">{analytics.slaCompliance}%</p>
          <p className="text-sm text-green-600 mt-1">↑ 5% from last month</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Customer Satisfaction</h3>
          <p className="text-3xl font-bold text-gray-900">4.8/5</p>
          <p className="text-sm text-green-600 mt-1">↑ 0.3 from last month</p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500 mb-1">First Response Time</h3>
          <p className="text-3xl font-bold text-gray-900">2.5h</p>
          <p className="text-sm text-green-600 mt-1">↓ 20% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Category Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tickets by Category</h3>
          <div className="h-80 flex items-center justify-center">
            <Doughnut
              data={categoryChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Agent Performance */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Agent Performance</h3>
          <div className="h-80">
            <Bar
              data={agentChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Export Reports</h3>
        <div className="flex gap-4">
          <button className="btn-primary">
            Export as PDF
          </button>
          <button className="btn-secondary">
            Export as CSV
          </button>
          <button className="btn-secondary">
            Export as Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
