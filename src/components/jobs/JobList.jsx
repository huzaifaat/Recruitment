'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import Card from '../ui/Card';
import Button from '../ui/Button';
import AddJobModal from './AddJobModal';
import ScrapeAnimation from './ScrapeAnimation';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import { jobs as initialJobs } from '../../data/jobs';
import { generateCandidates } from '../../data/candidates';

export default function JobList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(searchParams.get('id') || null);
  
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setJobs(initialJobs);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const handleAddJob = (newJob) => {
    setJobs([...jobs, newJob]);
  };
  
  const handleScrapeProfiles = (jobId) => {
    setIsScraping(true);
    setSelectedJobId(jobId);
    
    // Simulate scraping process
    setTimeout(() => {
      setJobs(jobs.map(job => 
        job.id === jobId 
          ? { ...job, candidates: 50, contacted: 0, shortlisted: 0 } 
          : job
      ));
      setIsScraping(false);
      
      // Generate candidates for this job
      localStorage.setItem(`candidates-${jobId}`, JSON.stringify(generateCandidates(jobId)));
      
      // Redirect to candidates page
      router.push(`/candidates?job=${jobId}`);
    }, 5000);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  if (isScraping) {
    return <ScrapeAnimation jobId={selectedJobId} />;
  }
  
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        <div className="h-16 bg-gray-200 rounded"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Job Listings</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center"
        >
          <Plus size={18} className="mr-1" /> Add New Job
        </Button>
      </div>
      
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search jobs..."
              className="input pl-10"
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center">
              <Filter size={18} className="mr-2" /> Filter
            </Button>
            <Button variant="outline" className="flex items-center">
              <Calendar size={18} className="mr-2" /> Date
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <div className="p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-600">{job.title}</h3>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <span>{job.company}</span>
                    <span className="mx-2">•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                    {job.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    Posted on {formatDate(job.createdAt)}
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-600 line-clamp-2">{job.description}</p>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {job.requirements.slice(0, 3).map((req, i) => (
                  <span key={i} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {req}
                  </span>
                ))}
                {job.requirements.length > 3 && (
                  <span className="text-xs text-gray-500">+{job.requirements.length - 3} more</span>
                )}
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="flex space-x-4 text-sm">
                  <span className="text-gray-600">
                    <strong className="text-gray-900">{job.candidates}</strong> candidates
                  </span>
                  <span className="text-gray-600">
                    <strong className="text-gray-900">{job.contacted}</strong> contacted
                  </span>
                  <span className="text-gray-600">
                    <strong className="text-gray-900">{job.shortlisted}</strong> shortlisted
                  </span>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-2">
                  {job.candidates > 0 ? (
                    <Link href={`/candidates?job=${job.id}`}>
                      <Button>View Candidates</Button>
                    </Link>
                  ) : (
                    <Button onClick={() => handleScrapeProfiles(job.id)}>
                      Scrape Profiles
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddJob={handleAddJob}
      />
    </div>
  );
}