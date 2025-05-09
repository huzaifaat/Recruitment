'use client';

import { useState } from 'react';
import { Clock, HelpCircle, TrendingDown, TrendingUp } from 'lucide-react';

export default function TimeToHire() {
  const [activeTab, setActiveTab] = useState('days');
  
  const timeData = [
    { 
      role: 'Frontend', 
      days: 15, 
      vs_prev: -12, 
      stages: { 
        sourcing: 2, 
        screening: 4, 
        interview: 6, 
        decision: 3 
      }, 
      color: 'bg-blue-500' 
    },
    { 
      role: 'Backend', 
      days: 24, 
      vs_prev: 6, 
      stages: { 
        sourcing: 5, 
        screening: 6, 
        interview: 8, 
        decision: 5 
      }, 
      color: 'bg-indigo-500' 
    },
    { 
      role: 'UI/UX', 
      days: 18, 
      vs_prev: -5, 
      stages: { 
        sourcing: 3, 
        screening: 5, 
        interview: 7, 
        decision: 3 
      }, 
      color: 'bg-purple-500' 
    },
    { 
      role: 'DevOps', 
      days: 35, 
      vs_prev: 10, 
      stages: { 
        sourcing: 7, 
        screening: 8, 
        interview: 12, 
        decision: 8 
      }, 
      color: 'bg-red-500' 
    },
    { 
      role: 'PM', 
      days: 12, 
      vs_prev: -8, 
      stages: { 
        sourcing: 2, 
        screening: 3, 
        interview: 5, 
        decision: 2 
      }, 
      color: 'bg-green-500' 
    }
  ];
  
  const stageColors = {
    sourcing: 'bg-blue-400',
    screening: 'bg-indigo-400',
    interview: 'bg-purple-400',
    decision: 'bg-green-400'
  };
  
  const maxDays = Math.max(...timeData.map(item => item.days));
  const avgDays = Math.round(timeData.reduce((sum, item) => sum + item.days, 0) / timeData.length);
  const maxBarValue = activeTab === 'days' ? maxDays : maxDays;
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 flex items-center">
          <Clock size={18} className="mr-2 text-indigo-500" />
          Time-to-Hire Analysis
        </h2>
        
        <div className="flex space-x-1 bg-gray-100 rounded-md p-0.5">
          <button
            className={`text-xs px-3 py-1 rounded ${
              activeTab === 'days' 
                ? 'bg-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('days')}
          >
            Days
          </button>
          <button
            className={`text-xs px-3 py-1 rounded ${
              activeTab === 'stages' 
                ? 'bg-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab('stages')}
          >
            Stages
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4 bg-blue-50 p-3 rounded-md">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
            <Clock size={20} />
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">Average time to hire</div>
            <div className="text-xs text-gray-500">Across all positions</div>
          </div>
        </div>
        <div className="text-2xl font-bold text-blue-600">{avgDays} days</div>
      </div>
      
      <div className="space-y-4">
        {timeData.map((item, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">{item.role}</span>
                {Math.abs(item.vs_prev) >= 10 && (
                  <div 
                    className={`ml-2 flex items-center text-xs font-medium ${
                      item.vs_prev > 0 ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {item.vs_prev > 0 ? (
                      <TrendingUp size={12} className="mr-0.5" />
                    ) : (
                      <TrendingDown size={12} className="mr-0.5" />
                    )}
                    {Math.abs(item.vs_prev)}%
                  </div>
                )}
              </div>
              <span className="text-sm font-bold text-gray-900">{item.days} days</span>
            </div>
            
            {activeTab === 'days' ? (
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: `${(item.days / maxBarValue) * 100}%` }}
                ></div>
              </div>
            ) : (
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden flex">
                {Object.entries(item.stages).map(([stage, value], i) => (
                  <div 
                    key={stage}
                    className={`h-full ${stageColors[stage]}`}
                    style={{ width: `${(value / item.days) * 100}%` }}
                    title={`${stage}: ${value} days`}
                  ></div>
                ))}
              </div>
            )}
            
            {activeTab === 'stages' && (
              <div className="mt-1 flex justify-between">
                <div className="flex space-x-3 text-xs">
                  {Object.entries(item.stages).map(([stage, value]) => (
                    <div key={stage} className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${stageColors[stage]}`}></div>
                      <span className="ml-1 text-gray-500 capitalize">{stage}: {value}d</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-600">
            <HelpCircle size={14} className="mr-1 text-gray-400" />
            DevOps positions take the longest to fill at 35 days
          </div>
          <button className="text-xs text-indigo-600 hover:text-indigo-800">
            View Detailed Report
          </button>
        </div>
      </div>
    </div>
  );
}