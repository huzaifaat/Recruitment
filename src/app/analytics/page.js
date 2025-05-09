'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import RecruitmentPipeline from '../../components/analytics/RecruitmentPipeline';
import SourceDistribution from '../../components/analytics/SourceDistribution';
import TimeToHire from '../../components/analytics/TimeToHire';
import TopCandidateSkills from '../../components/analytics/TopCandidateSkills';
import RecruitmentOverview from '../../components/analytics/RecruitmentOverview';
import HiringTrends from '../../components/analytics/HiringTrends';
import DateRangePicker from '../../components/analytics/DateRangePicker';
import { Calendar, BarChart3, PieChart, Clock, Briefcase, Users, Filter } from 'lucide-react';

export default function Analytics() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState('all');
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);
  
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const jobs = [
    { id: 'all', title: 'All Jobs' },
    { id: '1', title: 'Senior Frontend Developer' },
    { id: '2', title: 'Backend Engineer' },
    { id: '3', title: 'UI/UX Designer' },
    { id: '4', title: 'DevOps Engineer' },
    { id: '5', title: 'Project Manager' }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      
      <div className="pt-16 lg:ml-64">
        <div className="p-6">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Recruitment Analytics</h1>
            
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <DateRangePicker 
                onChange={setDateRange} 
                className="w-full sm:w-auto"
              />
              
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="flex items-center space-x-1 bg-white px-4 py-2 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors"
              >
                <Filter size={16} />
                <span>Filters</span>
              </button>
            </div>
          </div>
          
          {isFiltersOpen && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job
                  </label>
                  <select
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    {jobs.map(job => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedJob('all');
                      setDateRange({ start: null, end: null });
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium"
                  >
                    Reset
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <RecruitmentOverview />
          </div>
          
          <div className="mb-6">
            <RecruitmentPipeline />
          </div>
          
          <div className="mb-6">
            <HiringTrends />
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SourceDistribution />
            <TimeToHire />
          </div>
          
          <div className="mt-6">
            <TopCandidateSkills />
          </div>
        </div>
      </div>
    </div>
  );
}