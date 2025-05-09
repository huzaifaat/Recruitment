'use client';

import { useState } from 'react';
import { Users, UserCheck, UserX, Phone, CalendarCheck, BadgeCheck, MoreHorizontal } from 'lucide-react';

export default function RecruitmentPipeline() {
  const [activeTab, setActiveTab] = useState('all');
  
  const pipelineData = {
    all: [
      { stage: 'Sourced', count: 155, percentage: 100, color: 'bg-blue-500', icon: <Users className="h-5 w-5 text-blue-500" /> },
      { stage: 'Contacted', count: 65, percentage: 42, color: 'bg-indigo-500', icon: <Phone className="h-5 w-5 text-indigo-500" /> },
      { stage: 'Interviewed', count: 42, percentage: 27, color: 'bg-purple-500', icon: <CalendarCheck className="h-5 w-5 text-purple-500" /> },
      { stage: 'Shortlisted', count: 27, percentage: 17, color: 'bg-yellow-500', icon: <UserCheck className="h-5 w-5 text-yellow-500" /> },
      { stage: 'Rejected', count: 38, percentage: 25, color: 'bg-red-500', icon: <UserX className="h-5 w-5 text-red-500" /> },
      { stage: 'Hired', count: 12, percentage: 8, color: 'bg-green-500', icon: <BadgeCheck className="h-5 w-5 text-green-500" /> }
    ],
    frontend: [
      { stage: 'Sourced', count: 85, percentage: 100, color: 'bg-blue-500', icon: <Users className="h-5 w-5 text-blue-500" /> },
      { stage: 'Contacted', count: 42, percentage: 49, color: 'bg-indigo-500', icon: <Phone className="h-5 w-5 text-indigo-500" /> },
      { stage: 'Interviewed', count: 28, percentage: 33, color: 'bg-purple-500', icon: <CalendarCheck className="h-5 w-5 text-purple-500" /> },
      { stage: 'Shortlisted', count: 16, percentage: 19, color: 'bg-yellow-500', icon: <UserCheck className="h-5 w-5 text-yellow-500" /> },
      { stage: 'Rejected', count: 20, percentage: 24, color: 'bg-red-500', icon: <UserX className="h-5 w-5 text-red-500" /> },
      { stage: 'Hired', count: 8, percentage: 9, color: 'bg-green-500', icon: <BadgeCheck className="h-5 w-5 text-green-500" /> }
    ],
    backend: [
      { stage: 'Sourced', count: 70, percentage: 100, color: 'bg-blue-500', icon: <Users className="h-5 w-5 text-blue-500" /> },
      { stage: 'Contacted', count: 23, percentage: 33, color: 'bg-indigo-500', icon: <Phone className="h-5 w-5 text-indigo-500" /> },
      { stage: 'Interviewed', count: 14, percentage: 20, color: 'bg-purple-500', icon: <CalendarCheck className="h-5 w-5 text-purple-500" /> },
      { stage: 'Shortlisted', count: 11, percentage: 16, color: 'bg-yellow-500', icon: <UserCheck className="h-5 w-5 text-yellow-500" /> },
      { stage: 'Rejected', count: 18, percentage: 26, color: 'bg-red-500', icon: <UserX className="h-5 w-5 text-red-500" /> },
      { stage: 'Hired', count: 4, percentage: 6, color: 'bg-green-500', icon: <BadgeCheck className="h-5 w-5 text-green-500" /> }
    ]
  };
  
  const tabs = [
    { id: 'all', label: 'All Positions' },
    { id: 'frontend', label: 'Frontend Developer' },
    { id: 'backend', label: 'Backend Engineer' }
  ];
  
  const maxHeight = 12; // rem units
  const data = pipelineData[activeTab];
  const maxCount = Math.max(...data.map(item => item.count));
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Recruitment Pipeline</h2>
          <div className="flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`px-3 py-1.5 text-sm font-medium rounded ${
                  activeTab === tab.id 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Current Recruitment Cycle</span>
          </div>
          <div className="flex space-x-2">
            <select className="text-sm border-gray-300 rounded-md shadow-sm">
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>Last Year</option>
              <option>All Time</option>
            </select>
            <button className="p-1.5 rounded-md hover:bg-gray-100">
              <MoreHorizontal className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      
        <div className="relative">
          <div className="flex items-end space-x-12 justify-between h-64">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center group relative">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  {item.percentage}% of sourced candidates
                </div>
                <div 
                  className={`w-16 ${item.color} rounded-t-lg transition-all duration-700 ease-out`} 
                  style={{ height: `${(item.count / maxCount) * maxHeight}rem` }}
                ></div>
                <div className="mt-3 flex flex-col items-center">
                  <div className="p-2 rounded-full bg-gray-100">
                    {item.icon}
                  </div>
                  <span className="mt-1 text-xs font-medium text-gray-600">{item.stage}</span>
                  <span className="text-lg font-semibold text-gray-900">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Axis lines */}
          <div className="absolute left-0 top-0 h-64 border-r border-gray-200"></div>
          <div className="absolute bottom-24 left-0 right-0 border-t border-gray-200"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 border-t">
        {data.map((item, index) => (
          <div key={index} className="p-4 text-center border-r last:border-r-0 border-gray-100">
            <div className="text-lg font-bold text-gray-900">{item.count}</div>
            <div className="text-xs text-gray-500">{item.stage}</div>
            <div className="mt-1 flex items-center justify-center">
              <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
              <span className="ml-1 text-xs text-gray-500">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}