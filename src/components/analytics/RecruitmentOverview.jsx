'use client';

import { Users, UserPlus, Clock, Briefcase, TrendingUp, TrendingDown } from 'lucide-react';

export default function RecruitmentOverview() {
  const metrics = [
    {
      title: 'Active Candidates',
      value: 244,
      change: 12.5,
      changeText: 'vs last month',
      icon: <Users size={20} className="text-blue-500" />,
      iconBg: 'bg-blue-100',
      trend: 'up'
    },
    {
      title: 'Time to Hire',
      value: '21',
      unit: 'days',
      change: -8.3,
      changeText: 'faster than avg',
      icon: <Clock size={20} className="text-indigo-500" />,
      iconBg: 'bg-indigo-100',
      trend: 'down'
    },
    {
      title: 'Open Positions',
      value: 12,
      change: 2,
      changeText: 'from last week',
      icon: <Briefcase size={20} className="text-purple-500" />,
      iconBg: 'bg-purple-100',
      trend: 'up'
    },
    {
      title: 'Hired This Month',
      value: 8,
      change: 33.3,
      changeText: 'vs last month',
      icon: <UserPlus size={20} className="text-green-500" />,
      iconBg: 'bg-green-100',
      trend: 'up'
    }
  ];

  return (
    <>
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${metric.iconBg}`}>
                {metric.icon}
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
                <div className="flex items-end">
                  <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                  {metric.unit && <span className="ml-1 text-sm text-gray-600">{metric.unit}</span>}
                </div>
              </div>
            </div>
            <div className={`flex items-center text-sm ${
              metric.trend === 'up' 
                ? metric.title === 'Time to Hire' ? 'text-red-500' : 'text-green-500'
                : metric.title === 'Time to Hire' ? 'text-green-500' : 'text-red-500'
            }`}>
              {metric.trend === 'up' ? (
                <TrendingUp size={16} className="mr-1" />
              ) : (
                <TrendingDown size={16} className="mr-1" />
              )}
              {Math.abs(metric.change)}%
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {metric.changeText}
          </div>
        </div>
      ))}
    </>
  );
}