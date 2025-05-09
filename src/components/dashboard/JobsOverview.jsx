'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '../ui/Card';
import { ArrowRight } from 'lucide-react';
import { jobs } from '../../data/jobs';

export default function JobsOverview() {
  const [activeJobs, setActiveJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setActiveJobs(jobs);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  if (isLoading) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Jobs Added</h3>
        <Link href="/jobs" className="text-indigo-600 flex items-center text-sm hover:text-indigo-800">
          View all jobs <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
      
      <div className="space-y-4">
        {activeJobs.map((job) => (
          <div key={job.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
            <Link href={`/jobs?id=${job.id}`}>
              <h4 className="font-medium text-indigo-600">{job.title}</h4>
              <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-500">
                <span>{job.company}</span>
                <span>•</span>
                <span>{job.location}</span>
              </div>
              <div className="flex mt-2 justify-between">
                <div className="flex space-x-4 text-sm">
                  <span className="text-gray-600">
                    <strong className="text-gray-900">{20}</strong> candidates
                  </span>
                  <span className="text-gray-600">
                    <strong className="text-gray-900">{6}</strong> shortlisted
                  </span>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {job.status}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
}