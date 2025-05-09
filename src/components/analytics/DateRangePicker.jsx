'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

export default function DateRangePicker({ onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('last30days');
  const [customDateRange, setCustomDateRange] = useState({
    start: null,
    end: null
  });
  const dropdownRef = useRef(null);
  
  const dateRanges = [
    { id: 'last7days', label: 'Last 7 Days' },
    { id: 'last30days', label: 'Last 30 Days' },
    { id: 'lastQuarter', label: 'Last Quarter' },
    { id: 'lastYear', label: 'Last Year' },
    { id: 'allTime', label: 'All Time' },
    { id: 'custom', label: 'Custom Range' }
  ];
  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    let startDate = null;
    let endDate = null;
    
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    
    if (selectedRange === 'last7days') {
      const startOfRange = new Date(now);
      startOfRange.setDate(now.getDate() - 7);
      startOfRange.setHours(0, 0, 0, 0);
      startDate = startOfRange;
      endDate = endOfDay;
    } else if (selectedRange === 'last30days') {
      const startOfRange = new Date(now);
      startOfRange.setDate(now.getDate() - 30);
      startOfRange.setHours(0, 0, 0, 0);
      startDate = startOfRange;
      endDate = endOfDay;
    } else if (selectedRange === 'lastQuarter') {
      const startOfRange = new Date(now);
      startOfRange.setMonth(now.getMonth() - 3);
      startOfRange.setHours(0, 0, 0, 0);
      startDate = startOfRange;
      endDate = endOfDay;
    } else if (selectedRange === 'lastYear') {
      const startOfRange = new Date(now);
      startOfRange.setFullYear(now.getFullYear() - 1);
      startOfRange.setHours(0, 0, 0, 0);
      startDate = startOfRange;
      endDate = endOfDay;
    } else if (selectedRange === 'allTime') {
      startDate = null;
      endDate = null;
    } else if (selectedRange === 'custom') {
      startDate = customDateRange.start;
      endDate = customDateRange.end;
    }
    
    onChange({ start: startDate, end: endDate });
  }, [selectedRange, customDateRange, onChange]);
  
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const getDisplayText = () => {
    if (selectedRange === 'custom') {
      if (customDateRange.start && customDateRange.end) {
        return `${formatDate(customDateRange.start)} - ${formatDate(customDateRange.end)}`;
      }
      return 'Select dates';
    }
    
    const selectedOption = dateRanges.find(option => option.id === selectedRange);
    return selectedOption ? selectedOption.label : 'Select range';
  };
  
  const handleRangeSelect = (rangeId) => {
    setSelectedRange(rangeId);
    if (rangeId !== 'custom') {
      setIsOpen(false);
    }
  };
  
  const handleDateChange = (type, e) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    
    setCustomDateRange(prev => ({
      ...prev,
      [type]: date
    }));
  };
  
  const applyCustomRange = () => {
    if (customDateRange.start && customDateRange.end) {
      setIsOpen(false);
    }
  };
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar size={16} />
        <span className="text-sm text-gray-700">{getDisplayText()}</span>
        <ChevronDown size={16} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 w-64 z-10">
          <div className="p-3 border-b">
            <h3 className="text-sm font-medium text-gray-700">Date Range</h3>
          </div>
          
          <div className="p-2">
            {dateRanges.map(range => (
              <button
                key={range.id}
                className={`w-full text-left px-3 py-2 text-sm rounded ${
                  selectedRange === range.id 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleRangeSelect(range.id)}
              >
                {range.label}
              </button>
            ))}
          </div>
          
          {selectedRange === 'custom' && (
            <div className="p-3 border-t">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    onChange={(e) => handleDateChange('start', e)}
                    value={customDateRange.start ? customDateRange.start.toISOString().split('T')[0] : ''}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    onChange={(e) => handleDateChange('end', e)}
                    value={customDateRange.end ? customDateRange.end.toISOString().split('T')[0] : ''}
                    min={customDateRange.start ? customDateRange.start.toISOString().split('T')[0] : ''}
                  />
                </div>
                
                <button
                  className="w-full bg-indigo-600 text-white rounded-md py-1.5 text-sm font-medium hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                  disabled={!customDateRange.start || !customDateRange.end}
                  onClick={applyCustomRange}
                >
                  Apply Range
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}