'use client';

import { useState } from 'react';
import { BarChart3, ArrowUp, ArrowDown, Info } from 'lucide-react';

export default function HiringTrends() {
  const [activeView, setActiveView] = useState('monthly');
  const [showTooltip, setShowTooltip] = useState(null);
  
  const monthlyData = [
    { month: 'Jan', candidates: 42, hired: 3, rejected: 28 },
    { month: 'Feb', candidates: 38, hired: 4, rejected: 22 },
    { month: 'Mar', candidates: 55, hired: 5, rejected: 30 },
    { month: 'Apr', candidates: 47, hired: 2, rejected: 25 },
    { month: 'May', candidates: 65, hired: 6, rejected: 35 },
    { month: 'Jun', candidates: 78, hired: 8, rejected: 40 },
    { month: 'Jul', candidates: 54, hired: 5, rejected: 32 },
    { month: 'Aug', candidates: 68, hired: 7, rejected: 38 },
    { month: 'Sep', candidates: 72, hired: 6, rejected: 42 },
    { month: 'Oct', candidates: 84, hired: 9, rejected: 45 },
    { month: 'Nov', candidates: 96, hired: 12, rejected: 52 },
    { month: 'Dec', candidates: 58, hired: 6, rejected: 30 }
  ];
  
  const quarterlyData = [
    { quarter: 'Q1', candidates: 135, hired: 12, rejected: 80 },
    { quarter: 'Q2', candidates: 190, hired: 16, rejected: 100 },
    { quarter: 'Q3', candidates: 194, hired: 18, rejected: 112 },
    { quarter: 'Q4', candidates: 238, hired: 27, rejected: 127 }
  ];
  
  const data = activeView === 'monthly' ? monthlyData : quarterlyData;
  const maxCandidates = Math.max(...data.map(item => item.candidates));
  const maxBarHeight = 180; // pixels
  
  // Calculate month-over-month growth
  const lastMonthIndex = monthlyData.length - 1;
  const previousMonthIndex = monthlyData.length - 2;
  const candidatesGrowth = (
    (monthlyData[lastMonthIndex].candidates - monthlyData[previousMonthIndex].candidates) / 
    monthlyData[previousMonthIndex].candidates
  ) * 100;
  
  const hiredGrowth = (
    (monthlyData[lastMonthIndex].hired - monthlyData[previousMonthIndex].hired) / 
    monthlyData[previousMonthIndex].hired
  ) * 100;
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <BarChart3 size={18} className="mr-2 text-indigo-500" />
            Hiring Trends
          </h2>
          <div className="flex space-x-1 bg-gray-100 rounded-md p-0.5">
            <button
              className={`text-xs px-3 py-1 rounded ${
                activeView === 'monthly' 
                  ? 'bg-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveView('monthly')}
            >
              Monthly
            </button>
            <button
              className={`text-xs px-3 py-1 rounded ${
                activeView === 'quarterly' 
                  ? 'bg-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveView('quarterly')}
            >
              Quarterly
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-500 mb-1">Total Candidates</div>
            <div className="text-2xl font-bold text-gray-900">757</div>
            <div className={`flex items-center text-sm mt-2 ${
              candidatesGrowth > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {candidatesGrowth > 0 ? (
                <ArrowUp size={14} className="mr-1" />
              ) : (
                <ArrowDown size={14} className="mr-1" />
              )}
              {Math.abs(candidatesGrowth).toFixed(1)}% vs previous {activeView === 'monthly' ? 'month' : 'quarter'}
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-500 mb-1">Hired</div>
            <div className="text-2xl font-bold text-gray-900">73</div>
            <div className={`flex items-center text-sm mt-2 ${
              hiredGrowth > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {hiredGrowth > 0 ? (
                <ArrowUp size={14} className="mr-1" />
              ) : (
                <ArrowDown size={14} className="mr-1" />
              )}
              {Math.abs(hiredGrowth).toFixed(1)}% vs previous {activeView === 'monthly' ? 'month' : 'quarter'}
            </div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</div>
            <div className="text-2xl font-bold text-gray-900">9.6%</div>
            <div className="flex items-center text-sm mt-2 text-gray-500">
              <Info size={14} className="mr-1" />
              Industry average: 8.2%
            </div>
          </div>
        </div>
      
        <div className="relative" style={{ height: `${maxBarHeight + 60}px` }}>
          <div className="flex justify-between h-full">
            {data.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center relative group"
                onMouseEnter={() => setShowTooltip(index)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <div className="flex-grow flex items-end h-full">
                  <div 
                    className="w-8 sm:w-12 bg-blue-100 rounded-t relative"
                    style={{ height: `${(item.candidates / maxCandidates) * maxBarHeight}px` }}
                  >
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t"
                      style={{ height: `${(item.hired / item.candidates) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-xs font-medium text-gray-500 mt-2">
                  {activeView === 'monthly' ? item.month : item.quarter}
                </div>
                
                {showTooltip === index && (
                  <div className="absolute bottom-full mb-2 bg-gray-900 text-white rounded p-2 text-xs z-10 w-32 shadow-lg">
                    <div className="font-medium">{activeView === 'monthly' ? item.month : item.quarter}</div>
                    <div className="grid grid-cols-2 gap-x-2 mt-1">
                      <span>Candidates:</span>
                      <span className="text-right font-medium">{item.candidates}</span>
                      <span>Hired:</span>
                      <span className="text-right font-medium text-green-300">{item.hired}</span>
                      <span>Rejected:</span>
                      <span className="text-right font-medium text-red-300">{item.rejected}</span>
                      <span>Rate:</span>
                      <span className="text-right font-medium">
                        {((item.hired / item.candidates) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Horizontal grid lines */}
          <div className="absolute left-0 right-0 top-0 border-t border-gray-100"></div>
          <div className="absolute left-0 right-0 top-1/4 border-t border-gray-100"></div>
          <div className="absolute left-0 right-0 top-2/4 border-t border-gray-100"></div>
          <div className="absolute left-0 right-0 top-3/4 border-t border-gray-100"></div>
        </div>
        
        <div className="flex items-center justify-center mt-4 space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-100 mr-1"></div>
            <span className="text-xs text-gray-600">Candidates</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 mr-1"></div>
            <span className="text-xs text-gray-600">Hired</span>
          </div>
        </div>
      </div>
    </div>
  );
}