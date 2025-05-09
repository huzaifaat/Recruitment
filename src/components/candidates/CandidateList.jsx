'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import CandidateDetails from './CandidateDetails';
import ReportGenerator from './ReportGenerator';
import EmailSender from './EmailSender';
import { Search, Filter, CheckCircle, Mail } from 'lucide-react';
import { jobs } from '../../data/jobs';
import { generateCandidates } from '../../data/candidates';

export default function CandidateList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get('job');
  
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmailsSent, setShowEmailsSent] = useState(false);
  
  useEffect(() => {
    if (!jobId) {
      router.push('/jobs');
      return;
    }
    
    // Find job
    const jobData = jobs.find(j => j.id === jobId);
    if (!jobData) {
      router.push('/jobs');
      return;
    }
    setJob(jobData);
    
    // Get candidates from localStorage or generate new ones
    const storedCandidates = localStorage.getItem(`candidates-${jobId}`);
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    } else {
      const newCandidates = generateCandidates(jobId);
      setCandidates(newCandidates);
      localStorage.setItem(`candidates-${jobId}`, JSON.stringify(newCandidates));
    }
    
    setIsLoading(false);
  }, [jobId, router]);
  
  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
  };
  
  const handleContactUpdate = (candidateId, updates) => {
    const updatedCandidates = candidates.map(c => 
      c.id === candidateId ? { ...c, ...updates } : c
    );
    setCandidates(updatedCandidates);
    localStorage.setItem(`candidates-${jobId}`, JSON.stringify(updatedCandidates));
    
    // Update the selected candidate if it's the one being edited
    if (selectedCandidate && selectedCandidate.id === candidateId) {
      setSelectedCandidate({ ...selectedCandidate, ...updates });
    }
  };
  
  const getSelectedCandidates = () => {
    return candidates.filter(c => c.selected);
  };
  
  const getEmailSentCandidates = () => {
    return candidates.filter(c => c.emailSent);
  };
  
  const canGenerateReport = getSelectedCandidates().length >= 5;
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredCandidates = candidates.filter(candidate => {
    const searchLower = searchTerm.toLowerCase();
    
    // If showing emails sent, only show those with emails sent
    if (showEmailsSent && !candidate.emailSent) {
      return false;
    }
    
    // If search term is empty, show all candidates (based on email filter)
    if (!searchTerm) {
      return true;
    }
    
    // Search by name, email, skills, location
    return (
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.email.toLowerCase().includes(searchLower) ||
      candidate.location.toLowerCase().includes(searchLower) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchLower))
    );
  });
  
  const handleSendEmail = () => {
    if (selectedCandidate && selectedCandidate.selected) {
      setShowEmailModal(true);
    }
  };
  
  const handleEmailSendSuccess = (candidateId) => {
    handleContactUpdate(candidateId, { emailSent: true });
  };
  
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        <div className="h-16 bg-gray-200 rounded"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full md:flex-row md:space-x-6">
      <div className="w-full md:w-1/2 lg:w-2/5">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Candidates</h1>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowEmailsSent(!showEmailsSent)}
              className="flex items-center"
              size="sm"
            >
              <Mail size={16} className="mr-2" />
              {showEmailsSent ? 'Show All' : `Emails Sent (${getEmailSentCandidates().length})`}
            </Button>
            <Button
              variant={canGenerateReport ? 'secondary' : 'outline'}
              onClick={() => setShowReportModal(true)}
              disabled={!canGenerateReport}
              className="flex items-center"
            >
              Generate Report ({getSelectedCandidates().length})
            </Button>
          </div>
        </div>
        
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search candidates..."
                className="input pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter size={18} className="mr-2" /> Filter
            </Button>
          </div>
          
          <div className="mt-4">
            <h2 className="font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
          </div>
        </Card>
        
        <div className="space-y-4 overflow-auto pb-6" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {filteredCandidates.length === 0 ? (
            <div className="border rounded-lg p-4 text-center text-gray-500">
              No candidates match your search criteria
            </div>
          ) : (
            filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className={`border rounded-lg p-4 transition-all cursor-pointer ${
                  selectedCandidate?.id === candidate.id 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
                onClick={() => handleCandidateSelect(candidate)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium flex items-center">
                      {candidate.name}
                      {candidate.selected && (
                        <CheckCircle size={16} className="ml-2 text-green-500" />
                      )}
                      {candidate.emailSent && (
                        <Mail size={16} className="ml-2 text-blue-500" />
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{candidate.experience} • {candidate.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">
                      via {candidate.platform}
                    </span>
                    <ProgressBar
                      value={candidate.matchScore}
                      max={100}
                      className="w-24 mt-1"
                      showLabel={false}
                    />
                  </div>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 3 && (
                    <span className="text-xs text-gray-500">+{candidate.skills.length - 3} more</span>
                  )}
                </div>
                
                {candidate.contacted && (
                  <div className="mt-2 text-sm">
                    <span className="text-indigo-600">
                      {candidate.availability} notice • {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'PKR',
                        maximumFractionDigits: 0
                      }).format(candidate.salary.minimum)}-{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'PKR',
                        maximumFractionDigits: 0
                      }).format(candidate.salary.maximum)}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="w-full md:w-1/2 lg:w-3/5 mt-6 md:mt-0">
        {selectedCandidate ? (
          <CandidateDetails 
            candidate={selectedCandidate} 
            onUpdateCandidate={handleContactUpdate}
            jobTitle={job.title}
            onSendEmail={handleSendEmail}
          />
        ) : (
          <Card className="flex flex-col items-center justify-center p-8 h-full">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No candidate selected</h3>
              <p className="text-gray-600 mb-4">
                Select a candidate from the list to view their details.
              </p>
            </div>
          </Card>
        )}
      </div>
      
      {showReportModal && (
        <ReportGenerator
          job={job}
          candidates={getSelectedCandidates()}
          onClose={() => setShowReportModal(false)}
        />
      )}
      
      {showEmailModal && selectedCandidate && (
        <EmailSender 
          candidate={selectedCandidate}
          jobTitle={job.title}
          onClose={() => setShowEmailModal(false)}
          onSendSuccess={handleEmailSendSuccess}
        />
      )}
    </div>
  );
}