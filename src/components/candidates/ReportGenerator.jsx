'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { X, Download, Mail, CheckCircle, FileText, ChevronDown, ChevronUp, Star, ExternalLink, Clock, MessageSquare, ThumbsUp, ThumbsDown, Award } from 'lucide-react';

export default function ReportGenerator({ job, candidates, onClose }) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [reportType, setReportType] = useState('detailed');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [expandedCandidates, setExpandedCandidates] = useState({});
  const [activeTab, setActiveTab] = useState('general');
  
  const candidatesWithInterviews = candidates.map(candidate => {
    const questions = [
      "Describe a challenging project you worked on and how you approached it.",
      "How do you stay updated with the latest technologies in your field?",
      "Explain a situation where you had to work with a difficult team member.",
      "What's your process for solving complex technical problems?",
      "How do you ensure your code is maintainable and scalable?"
    ];
    
    const responseTime = Math.floor(Math.random() * 24) + 1;
    const interviewDuration = Math.floor(Math.random() * 30) + 30;
    const interviewDate = new Date();
    interviewDate.setDate(interviewDate.getDate() - Math.floor(Math.random() * 14));
    
    const technicalScore = Math.floor(Math.random() * 2) + 3;
    const communicationScore = Math.floor(Math.random() * 2) + 3;
    const problemSolvingScore = Math.floor(Math.random() * 2) + 3;
    const cultureFitScore = Math.floor(Math.random() * 2) + 3;
    
    const totalScore = technicalScore + communicationScore + problemSolvingScore + cultureFitScore;
    const recommendationScore = Math.round((totalScore / 20) * 100);
    
    let recommendationTier;
    if (recommendationScore >= 90) recommendationTier = "Strongly Recommend";
    else if (recommendationScore >= 80) recommendationTier = "Recommend";
    else if (recommendationScore >= 70) recommendationTier = "Consider";
    else recommendationTier = "Not Recommended";
    
    const generateAnswer = (questionIndex, score) => {
      const goodAnswers = [
        "In my last role at XYZ Corp, I led a project to redesign our payment processing system that had to handle 10x the transaction volume. I started by mapping out the existing architecture, identifying bottlenecks through load testing, and proposed a microservices approach. I collaborated with the database team to optimize queries and implement caching. Despite a tight 3-month deadline, we delivered on time with a system that now handles 15x the previous volume with lower latency.",
        "I maintain a disciplined approach to staying current with technology. I dedicate 5 hours weekly to learning, split between reading technical blogs, taking online courses, and building small proof-of-concept projects. I'm part of three developer communities where we share knowledge. Recently, I completed an advanced course on microservices architecture and applied those concepts to improve our system's scalability.",
        "I once worked with a team member who was resistant to adopting new testing practices. Rather than forcing change, I took time to understand their concerns, which revealed they feared the time investment. I demonstrated how automation would save time long-term by setting up a small example. I also offered to pair program with them initially. Within a month, they became an advocate for the new approach and even suggested further improvements.",
        "My problem-solving approach is systematic. I first gather requirements and constraints, breaking large problems into smaller components. I prototype solutions to validate assumptions quickly. For a recent API performance issue, I used this method to identify that our database queries were inefficient. I redesigned the queries and implemented caching, resulting in a 70% reduction in response time.",
        "I ensure maintainability through several practices: consistent coding standards enforced by linters, comprehensive documentation including architecture diagrams, thorough code reviews, and extensive automated testing with over 90% coverage. For scalability, I design systems to be stateless where possible, implement caching strategies, and use horizontal scaling patterns. This approach has helped our team maintain a legacy system with minimal technical debt."
      ];
      
      const averageAnswers = [
        "I worked on a project to improve our website's payment system. It was challenging because we had a lot more users than before. I analyzed the current system to find the slow parts and suggested we split it into smaller services. I worked with the database team to make it faster. We finished it in about 3 months and it can handle much more traffic now.",
        "I try to keep up with technology by reading blogs and taking some online courses when I have time. I'm in a couple of developer groups online where we talk about new trends. I recently learned about microservices and have been trying to use some of those ideas in my work.",
        "I had a coworker who didn't want to use new testing methods we were introducing. I talked to them about it and found out they thought it would take too much time. I showed them how it would save time in the long run with a small demo. I helped them get started, and eventually they came around to liking the new approach.",
        "When I have a difficult problem, I try to break it down into smaller parts that are easier to solve. I'll make quick prototypes to test my ideas. We had an issue with our API being slow, and I found that our database queries weren't efficient. I fixed the queries and added some caching, which made it much faster.",
        "For maintainability, I follow coding standards, write documentation, do code reviews, and create tests. I try to make systems that can work independently and use caching to make things faster. This has helped us keep an older system running without too many problems."
      ];
      
      if (score >= 4) {
        return goodAnswers[questionIndex];
      } else {
        return averageAnswers[questionIndex];
      }
    };
    
    const answers = questions.map((q, index) => {
      const answerQuality = (technicalScore + communicationScore) / 2;
      return generateAnswer(index, answerQuality);
    });
    
    const generateInterviewNotes = () => {
      const notes = [];
      
      if (technicalScore >= 4) {
        notes.push("Demonstrated strong technical knowledge with in-depth explanations.");
      } else {
        notes.push("Shows adequate technical proficiency, but lacking depth in some areas.");
      }
      
      if (communicationScore >= 4) {
        notes.push("Excellent communication skills, articulated ideas clearly and concisely.");
      } else {
        notes.push("Communication was satisfactory, but could improve in explaining complex concepts.");
      }
      
      if (problemSolvingScore >= 4) {
        notes.push("Impressive problem-solving approach, breaking down issues methodically.");
      } else {
        notes.push("Demonstrates basic problem-solving skills, but could benefit from more structured approaches.");
      }
      
      if (cultureFitScore >= 4) {
        notes.push("Would integrate well with the team culture, shows enthusiasm and collaborative mindset.");
      } else {
        notes.push("Seems adaptable to our culture, though may need some time to fully integrate.");
      }
      
      return notes;
    };
    
    return {
      ...candidate,
      interview: {
        responseTime,
        interviewDate,
        interviewDuration,
        questions,
        answers,
        scores: {
          technical: technicalScore,
          communication: communicationScore,
          problemSolving: problemSolvingScore,
          cultureFit: cultureFitScore
        },
        recommendationScore,
        recommendationTier,
        notes: generateInterviewNotes()
      }
    };
  });
  
  const toggleCandidateExpansion = (candidateId) => {
    setExpandedCandidates(prev => ({
      ...prev,
      [candidateId]: !prev[candidateId]
    }));
  };
  
  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      setStep(2);
    }, 3000);
  };
  
  const handleSendReport = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      setIsComplete(true);
    }, 2000);
  };
  
  const handleViewPdf = () => {
    window.open('/sample-report.pdf', '_blank');
  };
  
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
      />
    ));
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
                    Comprehensive analysis with in-depth profiles, interview responses, and recommendation scores.
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
              <div className="border rounded-lg p-4 max-h-[600px] overflow-y-auto">
                <div className="text-center py-4">
                  <h2 className="text-xl font-bold text-indigo-600 mb-1">Candidate Analysis Report</h2>
                  <h3 className="font-medium">{job.title} - {job.company}</h3>
                  <p className="text-sm text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium border-b pb-2">Executive Summary</h3>
                  <div className="mt-3 text-sm">
                    <p>This report provides a comprehensive analysis of {candidates.length} shortlisted candidates for the {job.title} position at {job.company}. The candidates were evaluated based on their skills, experience, interview performance, and cultural fit.</p>
                    <div className="mt-4 bg-blue-50 p-3 rounded-md">
                      <p className="font-medium text-blue-800">Key Findings:</p>
                      <ul className="list-disc ml-5 mt-2 text-blue-800">
                        <li>Top candidate received a recommendation score of {Math.max(...candidatesWithInterviews.map(c => c.interview.recommendationScore))}%</li>
                        <li>{candidatesWithInterviews.filter(c => c.interview.recommendationTier === "Strongly Recommend").length} candidates are strongly recommended</li>
                        <li>Average response time to interview invitation: {Math.round(candidatesWithInterviews.reduce((sum, c) => sum + c.interview.responseTime, 0) / candidatesWithInterviews.length)} hours</li>
                        <li>Average technical score: {(candidatesWithInterviews.reduce((sum, c) => sum + c.interview.scores.technical, 0) / candidatesWithInterviews.length).toFixed(1)}/5</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium border-b pb-2">Candidate Summary</h3>
                  <table className="w-full mt-4 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Candidate</th>
                        <th className="px-4 py-2 text-left">Match</th>
                        <th className="px-4 py-2 text-left">Experience</th>
                        <th className="px-4 py-2 text-left">Recommendation</th>
                        <th className="px-4 py-2 text-left">Response Time</th>
                        <th className="px-4 py-2 text-left"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {candidatesWithInterviews.map((candidate) => (
                        <tr key={candidate.id}>
                          <td className="px-4 py-2 font-medium">{candidate.name}</td>
                          <td className="px-4 py-2">{candidate.matchScore}%</td>
                          <td className="px-4 py-2">{candidate.experience}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              candidate.interview.recommendationTier === "Strongly Recommend" ? "bg-green-100 text-green-800" :
                              candidate.interview.recommendationTier === "Recommend" ? "bg-blue-100 text-blue-800" :
                              candidate.interview.recommendationTier === "Consider" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {candidate.interview.recommendationTier}
                            </span>
                          </td>
                          <td className="px-4 py-2">{candidate.interview.responseTime} hours</td>
                          <td className="px-4 py-2">
                            <button
                              className="text-indigo-600 hover:text-indigo-800"
                              onClick={() => toggleCandidateExpansion(candidate.id)}
                            >
                              {expandedCandidates[candidate.id] ? (
                                <ChevronUp size={20} />
                              ) : (
                                <ChevronDown size={20} />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {reportType === 'detailed' && (
                  <div className="mt-8 space-y-8">
                    <h3 className="text-lg font-medium border-b pb-2">Detailed Candidate Analysis</h3>
                    
                    {candidatesWithInterviews.map((candidate) => (
                      <div 
                        key={candidate.id} 
                        className={`border rounded-lg ${expandedCandidates[candidate.id] ? 'bg-gray-50' : ''}`}
                      >
                        <div 
                          className="p-4 cursor-pointer flex justify-between items-center"
                          onClick={() => toggleCandidateExpansion(candidate.id)}
                        >
                          <div>
                            <h4 className="font-medium text-lg">{candidate.name}</h4>
                            <p className="text-sm text-gray-600">{candidate.education}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                Recommendation Score: 
                                <span className={`ml-1 ${
                                  candidate.interview.recommendationScore >= 90 ? "text-green-600" :
                                  candidate.interview.recommendationScore >= 80 ? "text-blue-600" :
                                  candidate.interview.recommendationScore >= 70 ? "text-yellow-600" :
                                  "text-red-600"
                                }`}>
                                  {candidate.interview.recommendationScore}%
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                Interviewed on {candidate.interview.interviewDate.toLocaleDateString()}
                              </div>
                            </div>
                            <ChevronDown 
                              size={20} 
                              className={`text-gray-400 transition-transform ${
                                expandedCandidates[candidate.id] ? 'rotate-180' : ''
                              }`} 
                            />
                          </div>
                        </div>
                        
                        {expandedCandidates[candidate.id] && (
                          <div className="px-4 pb-4">
                            <div className="border-t pt-4 mt-2">
                              <div className="flex mb-4 border-b">
                                <button
                                  className={`px-4 py-2 text-sm font-medium ${
                                    activeTab === 'general' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                                  }`}
                                  onClick={() => setActiveTab('general')}
                                >
                                  General Information
                                </button>
                                <button
                                  className={`px-4 py-2 text-sm font-medium ${
                                    activeTab === 'interview' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                                  }`}
                                  onClick={() => setActiveTab('interview')}
                                >
                                  Interview Analysis
                                </button>
                                <button
                                  className={`px-4 py-2 text-sm font-medium ${
                                    activeTab === 'evaluation' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                                  }`}
                                  onClick={() => setActiveTab('evaluation')}
                                >
                                  Evaluation
                                </button>
                              </div>
                              
                              {activeTab === 'general' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h5 className="font-medium mb-2">Candidate Profile</h5>
                                    <div className="space-y-2 text-sm">
                                      <p><span className="font-medium text-gray-600">Location:</span> {candidate.location}</p>
                                      <p><span className="font-medium text-gray-600">Experience:</span> {candidate.experience}</p>
                                      <p><span className="font-medium text-gray-600">Education:</span> {candidate.education}</p>
                                      <p><span className="font-medium text-gray-600">Source:</span> {candidate.platform}</p>
                                      <p><span className="font-medium text-gray-600">Availability:</span> {candidate.availability}</p>
                                      <p>
                                        <span className="font-medium text-gray-600">Salary Expectation:</span>{' '}
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
                                      </p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h5 className="font-medium mb-2">Skills</h5>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                      {candidate.skills.map((skill, i) => (
                                        <span key={i} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded">
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                    
                                    {candidate.notes && (
                                      <div>
                                        <h5 className="font-medium mb-2">Recruiter Notes</h5>
                                        <p className="text-sm bg-gray-100 p-3 rounded">{candidate.notes}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {activeTab === 'interview' && (
                                <div>
                                  <div className="flex items-center space-x-3 mb-4">
                                    <div className="bg-blue-100 text-blue-800 p-2 rounded-lg flex items-center">
                                      <Clock size={16} className="mr-1" />
                                      <span className="text-sm font-medium">Response Time: {candidate.interview.responseTime} hours</span>
                                    </div>
                                    <div className="bg-purple-100 text-purple-800 p-2 rounded-lg flex items-center">
                                      <Clock size={16} className="mr-1" />
                                      <span className="text-sm font-medium">Interview Duration: {candidate.interview.interviewDuration} minutes</span>
                                    </div>
                                  </div>
                                  
                                  <h5 className="font-medium mb-2">Interview Questions & Responses</h5>
                                  <div className="space-y-4 mb-6">
                                    {candidate.interview.questions.map((question, i) => (
                                      <div key={i} className="border rounded-md p-3">
                                        <p className="font-medium mb-2">{i+1}. {question}</p>
                                        <div className="bg-gray-50 p-3 rounded text-sm">
                                          <div className="flex items-center mb-1">
                                            <MessageSquare size={14} className="text-indigo-500 mr-1" />
                                            <span className="text-xs font-medium text-gray-700">Candidate's Response:</span>
                                          </div>
                                          <p className="text-gray-600">{candidate.interview.answers[i]}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  <h5 className="font-medium mb-2">Interviewer Notes</h5>
                                  <ul className="list-disc ml-5 space-y-1 text-sm text-gray-600 mb-4">
                                    {candidate.interview.notes.map((note, i) => (
                                      <li key={i}>{note}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {activeTab === 'evaluation' && (
                                <div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h5 className="font-medium mb-3">Skills Assessment</h5>
                                      
                                      <div className="space-y-3">
                                        <div>
                                          <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-600">Technical Skills</span>
                                            <div className="flex">
                                              {renderStars(candidate.interview.scores.technical)}
                                            </div>
                                          </div>
                                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div 
                                              className="bg-indigo-600 h-1.5 rounded-full" 
                                              style={{ width: `${(candidate.interview.scores.technical / 5) * 100}%` }}
                                            ></div>
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-600">Communication</span>
                                            <div className="flex">
                                              {renderStars(candidate.interview.scores.communication)}
                                            </div>
                                          </div>
                                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div 
                                              className="bg-green-600 h-1.5 rounded-full" 
                                              style={{ width: `${(candidate.interview.scores.communication / 5) * 100}%` }}
                                            ></div>
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-600">Problem Solving</span>
                                            <div className="flex">
                                              {renderStars(candidate.interview.scores.problemSolving)}
                                            </div>
                                          </div>
                                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div 
                                              className="bg-purple-600 h-1.5 rounded-full" 
                                              style={{ width: `${(candidate.interview.scores.problemSolving / 5) * 100}%` }}
                                            ></div>
                                          </div>
                                        </div>
                                        
                                        <div>
                                          <div className="flex justify-between mb-1">
                                            <span className="text-sm text-gray-600">Cultural Fit</span>
                                            <div className="flex">
                                              {renderStars(candidate.interview.scores.cultureFit)}
                                            </div>
                                          </div>
                                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div 
                                              className="bg-yellow-600 h-1.5 rounded-full" 
                                              style={{ width: `${(candidate.interview.scores.cultureFit / 5) * 100}%` }}
                                            ></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <h5 className="font-medium mb-3">Final Recommendation</h5>
                                      
                                      <div className={`rounded-lg p-4 ${
                                        candidate.interview.recommendationScore >= 90 ? "bg-green-50 border border-green-200" :
                                        candidate.interview.recommendationScore >= 80 ? "bg-blue-50 border border-blue-200" :
                                        candidate.interview.recommendationScore >= 70 ? "bg-yellow-50 border border-yellow-200" :
                                        "bg-red-50 border border-red-200"
                                      }`}>
                                        <div className="flex justify-between items-center mb-3">
                                          <span className="text-sm font-medium">Overall Score</span>
                                          <span className={`text-2xl font-bold ${
                                            candidate.interview.recommendationScore >= 90 ? "text-green-600" :
                                            candidate.interview.recommendationScore >= 80 ? "text-blue-600" :
                                            candidate.interview.recommendationScore >= 70 ? "text-yellow-600" :
                                            "text-red-600"
                                          }`}>
                                            {candidate.interview.recommendationScore}%
                                          </span>
                                        </div>
                                        
                                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                          <div 
                                            className={`h-2 rounded-full ${
                                              candidate.interview.recommendationScore >= 90 ? "bg-green-600" :
                                              candidate.interview.recommendationScore >= 80 ? "bg-blue-600" :
                                              candidate.interview.recommendationScore >= 70 ? "bg-yellow-600" :
                                              "bg-red-600"
                                            }`}
                                            style={{ width: `${candidate.interview.recommendationScore}%` }}
                                          ></div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                          <Award 
                                            size={20} 
                                            className={`mr-2 ${
                                              candidate.interview.recommendationScore >= 90 ? "text-green-600" :
                                              candidate.interview.recommendationScore >= 80 ? "text-blue-600" :
                                              candidate.interview.recommendationScore >= 70 ? "text-yellow-600" :
                                              "text-red-600"
                                            }`} 
                                          />
                                          <span className="font-medium">{candidate.interview.recommendationTier}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <form onSubmit={handleSendReport}>
                <h3 className="font-medium mb-2">Export Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <button
                    type="button"
                    onClick={handleViewPdf}
                    className="flex items-center justify-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  >
                    <FileText size={20} className="text-indigo-500" />
                    <span>Download as PDF</span>
                  </button>
                  
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <Mail size={20} className="text-indigo-500" />
                    <input
                      type="email"
                      placeholder="Enter email to send report"
                      className="flex-1 outline-none"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isGenerating}
                    disabled={!recipientEmail}
                  >
                    Send Report
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {isComplete && (
          <div className="p-6">
            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-500" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Report Successfully Sent!</h3>
              <p className="text-gray-600 mb-6">
                The {reportType === 'detailed' ? 'detailed' : 'summary'} report has been sent to {recipientEmail}.
              </p>
              
              <div className="flex flex-col items-center justify-center space-y-2">
                <Button onClick={handleViewPdf} variant="outline" className="w-full md:w-auto">
                  <Download size={16} className="mr-2" />
                  Download Report
                </Button>
                
                <div className="flex items-center mt-6">
                  <p className="text-sm text-gray-500 mr-2">Rate this report:</p>
                  <button className="text-gray-400 hover:text-indigo-600 mr-1">
                    <ThumbsUp size={20} />
                  </button>
                  <button className="text-gray-400 hover:text-red-600">
                    <ThumbsDown size={20} />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <Button variant="outline" onClick={onClose} className="w-full">
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}