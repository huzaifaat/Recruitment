'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { X, Download, Mail, CheckCircle } from 'lucide-react';

export default function ReportGenerator({ job, candidates, onClose }) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [reportType, setReportType] = useState('detailed');
  const [recipientEmail, setRecipientEmail] = useState('');
  
  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setStep(2);
    }, 3000);
  };
  
  const handleSendReport = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate sending
    setTimeout(() => {
      setIsGenerating(false);
      setIsComplete(true);
    }, 2000);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Generate Candidate Report</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        {step === 1 && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="font-medium mb-2">Selected Position</h3>
              <Card className="p-4">
                <h4 className="font-medium text-indigo-600">{job.title}</h4>
                <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
              </Card>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Selected Candidates ({candidates.length})</h3>
              </div>
              
              <div className="border rounded-lg divide-y max-h-60 overflow-y-auto">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="p-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{candidate.name}</h4>
                      <p className="text-sm text-gray-600">
                        {candidate.experience} • Match score: {candidate.matchScore}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Report Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    reportType === 'summary' ? 'border-indigo-500 bg-indigo-50' : 'hover:border-gray-400'
                  }`}
                  onClick={() => setReportType('summary')}
                >
                  <h4 className="font-medium">Summary Report</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    A concise overview of candidates with key metrics and brief notes.
                  </p>
                </div>
                
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    reportType === 'detailed' ? 'border-indigo-500 bg-indigo-50' : 'hover:border-gray-400'
                  }`}
                  onClick={() => setReportType('detailed')}
                >
                  <h4 className="font-medium">Detailed Report</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Comprehensive analysis with in-depth profiles and comparison matrix.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={handleGenerateReport}
                isLoading={isGenerating}
              >
                Generate Report
              </Button>
            </div>
          </div>
        )}
        
        {step === 2 && !isComplete && (
          <div className="p-6">
            <div className="mb-6">
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-medium text-green-800">Report Successfully Generated</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your {reportType === 'detailed' ? 'detailed' : 'summary'} report for {job.title} with {candidates.length} candidates has been created.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Report Preview</h3>
              <div className="border rounded-lg p-4 h-64 overflow-y-auto">
                <div className="text-center py-4">
                  <h2 className="text-xl font-bold text-indigo-600 mb-1">Candidate Report</h2>
                  <h3 className="font-medium">{job.title} - {job.company}</h3>
                  <p className="text-sm text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
                </div>
                
                <table className="w-full mt-4 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Candidate</th>
                      <th className="px-4 py-2 text-left">Match</th>
                      <th className="px-4 py-2 text-left">Experience</th>
                      <th className="px-4 py-2 text-left">Availability</th>
                      <th className="px-4 py-2 text-left">Salary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {candidates.map((candidate) => (
                      <tr key={candidate.id}>
                        <td className="px-4 py-2">{candidate.name}</td>
                        <td className="px-4 py-2">{candidate.matchScore}%</td>
                        <td className="px-4 py-2">{candidate.experience}</td>
                        <td className="px-4 py-2">{candidate.availability}</td>
                        <td className="px-4 py-2">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'PKR',
                            maximumFractionDigits: 0
                          }).format(candidate.salary.minimum)} - 
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'PKR',
                            maximumFractionDigits: 0
                          }).format(candidate.salary.maximum)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {reportType === 'detailed' && (
                  <div className="mt-6 space-y-4">
                    <h3 className="font-medium">Candidate Details</h3>
                    {candidates.map((candidate) => (
                      <div key={candidate.id} className="border rounded p-3">
                        <h4 className="font-medium">{candidate.name}</h4>
                        <p className="text-sm">{candidate.education}</p>
                        <div className="mt-2">
                          <span className="text-xs font-medium text-gray-500">Skills:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {candidate.skills.map((skill, i) => (
                              <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        {candidate.notes && (
                          <div className="mt-2">
                            <span className="text-xs font-medium text-gray-500">Notes:</span>
                            <p className="text-sm mt-1">{candidate.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center"
                >
                  <Download size={18} className="mr-2" />
                  Download PDF
                </Button>
              </div>
              
              <div>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center"
                >
                  <Download size={18} className="mr-2" />
                  Export as Excel
                </Button>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Share Report</h3>
              <form onSubmit={handleSendReport}>
                <div className="flex space-x-3">
                  <input
                    type="email"
                    placeholder="Recipient email address"
                    className="input flex-1"
                    value={recipientEmail}
                    onChange={e => setRecipientEmail(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    className="flex items-center"
                    isLoading={isGenerating}
                  >
                    <Mail size={18} className="mr-2" />
                    Send
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={onClose}
                variant="outline"
              >
                Close
              </Button>
            </div>
          </div>
        )}
        
        {isComplete && (
          <div className="p-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            
            <h3 className="text-xl font-medium text-center mb-2">Report Sent Successfully</h3>
            <p className="text-center text-gray-600 mb-6">
              The report has been sent to {recipientEmail}.
            </p>
            
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}