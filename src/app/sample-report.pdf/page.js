'use client';

import { useEffect, useState } from 'react';
import { 
  ArrowLeft, Download, Mail, User, Star, Calendar, 
  Clock, MessageSquare, Award, X, FileText, 
  CheckCircle, ChevronDown, ChevronUp, ExternalLink,
  ThumbsUp, ThumbsDown
} from 'lucide-react';

export default function PDFReportView() {
  const [loading, setLoading] = useState(true);
  const [expandedCandidates, setExpandedCandidates] = useState({});
  const [activeTab, setActiveTab] = useState('general');
  
  // Same candidates as in ReportGenerator component
  const job = {
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Lahore, Pakistan"
  };
  
  const candidates = [
    {
      id: 1,
      name: "Hamza Khan",
      location: "Lahore, Pakistan",
      experience: "6 years",
      education: "MS Computer Science, LUMS",
      platform: "LinkedIn",
      availability: "2 weeks notice",
      skills: ["React", "TypeScript", "Next.js", "Redux", "Tailwind CSS", "GraphQL"],
      matchScore: 92,
      notes: "Excellent communication skills, very strong technical background.",
      salary: { minimum: 250000, maximum: 300000 }
    },
    {
      id: 2,
      name: "Sadia Nasir",
      location: "Karachi, Pakistan",
      experience: "3 years",
      education: "BS Computer Science, LSE",
      platform: "Indeed",
      availability: "Immediate",
      skills: ["JavaScript", "React", "CSS", "Node.js", "Express", "MongoDB"],
      matchScore: 88,
      notes: "Strong problem-solving abilities, good cultural fit.",
      salary: { minimum: 200000, maximum: 260000 }
    },
    {
      id: 3,
      name: "Ali Hassan",
      location: "Islamabad, Pakistan",
      experience: "4 years",
      education: "BS Software Engineering, NUST",
      platform: "Referral",
      availability: "1 month notice",
      skills: ["React", "JavaScript", "CSS", "HTML5", "Vue.js", "Firebase"],
      matchScore: 85,
      notes: "Versatile with multiple frameworks, good team player.",
      salary: { minimum: 220000, maximum: 280000 }
    },
    {
      id: 4,
      name: "Fatima Ahmed",
      location: "Lahore, Pakistan",
      experience: "5 years",
      education: "MS Information Technology, FAST-NUCES",
      platform: "LinkedIn",
      availability: "2 weeks notice",
      skills: ["React", "Angular", "JavaScript", "CSS", "UI/UX Design", "Jest"],
      matchScore: 82,
      notes: "Strong in UI/UX combined with technical skills.",
      salary: { minimum: 240000, maximum: 290000 }
    },
    {
      id: 5,
      name: "Usman Ali",
      location: "Lahore, Pakistan",
      experience: "2 years",
      education: "BS Computer Science, Punjab University",
      platform: "JobPortal",
      availability: "Immediate",
      skills: ["React", "JavaScript", "Bootstrap", "HTML", "CSS", "Git"],
      matchScore: 78,
      notes: "Quick learner, good foundation in fundamentals.",
      salary: { minimum: 180000, maximum: 220000 }
    },
    {
      id: 6,
      name: "Ayesha Khan",
      location: "Faisalabad, Pakistan",
      experience: "3.5 years",
      education: "BS Software Engineering, UET",
      platform: "Indeed",
      availability: "2 weeks notice",
      skills: ["React", "Redux", "Material UI", "JavaScript", "TypeScript", "Node.js"],
      matchScore: 80,
      notes: "Good balance of frontend and backend skills.",
      salary: { minimum: 210000, maximum: 260000 }
    },
    {
      id: 7,
      name: "Bilal Mahmood",
      location: "Rawalpindi, Pakistan",
      experience: "4 years",
      education: "BS Computer Science, COMSATS",
      platform: "Referral",
      availability: "1 month notice",
      skills: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Jest", "Cypress"],
      matchScore: 83,
      notes: "Strong in testing and quality assurance practices.",
      salary: { minimum: 230000, maximum: 280000 }
    }
  ];

  // Generate interview data for each candidate (same logic as in ReportGenerator)
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
  
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
      />
    ));
  };
  
  // Calculate statistics for the executive summary
  const avgRecommendationScore = Math.round(
    candidatesWithInterviews.reduce((sum, c) => sum + c.interview.recommendationScore, 0) / 
    candidatesWithInterviews.length
  );
  
  const avgResponseTime = (
    candidatesWithInterviews.reduce((sum, c) => sum + c.interview.responseTime, 0) / 
    candidatesWithInterviews.length
  ).toFixed(1);
  
  const stronglyRecommendedCount = candidatesWithInterviews.filter(
    c => c.interview.recommendationTier === "Strongly Recommend"
  ).length;
  
  const topCandidateScore = Math.max(
    ...candidatesWithInterviews.map(c => c.interview.recommendationScore)
  );
  
  const topCandidate = candidatesWithInterviews.find(
    c => c.interview.recommendationScore === topCandidateScore
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="mt-4 text-gray-600">Loading report...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-indigo-600 text-white py-4 px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={() => window.close()}
            className="p-1 rounded-full hover:bg-indigo-500 mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Candidate Analysis Report</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white text-indigo-600 px-4 py-1.5 rounded-md text-sm font-medium flex items-center">
            <Download size={16} className="mr-1.5" />
            Download PDF
          </button>
          <button className="bg-indigo-500 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center">
            <Mail size={16} className="mr-1.5" />
            Share
          </button>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-indigo-50 p-8 rounded-lg mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-indigo-700">Candidate Analysis Report</h1>
              <h2 className="text-xl text-indigo-600 mt-2">{job.title} - {job.company}</h2>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Generated on May 10, 2025</p>
              <p className="text-gray-600">Reference: CFR-2025-0042</p>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <User size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{candidates.length}</h3>
                  <p className="text-sm text-gray-600">Candidates Analyzed</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Star size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{avgRecommendationScore}%</h3>
                  <p className="text-sm text-gray-600">Avg. Recommendation Score</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Clock size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{avgResponseTime} hrs</h3>
                  <p className="text-sm text-gray-600">Avg. Response Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Executive Summary</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              This report provides a comprehensive analysis of {candidates.length} shortlisted candidates for the {job.title} position at {job.company}. The candidates were evaluated based on their technical skills, communication abilities, problem-solving approach, and cultural fit.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Our assessment included detailed interviews with each candidate, focusing on their experience with React, Next.js, and related frontend technologies. The interviews were structured to evaluate both technical proficiency and soft skills essential for success in this role.
            </p>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Key Findings:</h3>
              <ul className="list-disc ml-5 text-blue-800 space-y-1">
                <li>{stronglyRecommendedCount} candidates received a "Strongly Recommend" rating</li>
                <li>Top candidate ({topCandidate?.name}) scored {topCandidateScore}% on our recommendation scale</li>
                <li>All candidates demonstrated proficiency with React and JavaScript</li>
                <li>Average response time to interview invitations was {avgResponseTime} hours</li>
                <li>The most common skill gap was in automated testing frameworks</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Candidate Rankings</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Strengths</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Sort candidates by recommendation score and map them */}
                  {candidatesWithInterviews
                    .sort((a, b) => b.interview.recommendationScore - a.interview.recommendationScore)
                    .map((candidate, index) => (
                    <tr key={candidate.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                            <div className="text-sm text-gray-500">{candidate.education}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          candidate.interview.recommendationScore >= 90 ? "bg-green-100 text-green-800" :
                          candidate.interview.recommendationScore >= 80 ? "bg-blue-100 text-blue-800" :
                          candidate.interview.recommendationScore >= 70 ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {candidate.interview.recommendationScore}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {candidate.experience}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {candidate.interview.responseTime} hours
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 2).map((skill, i) => (
                            <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Detailed Candidate Profiles - For each candidate */}
        {candidatesWithInterviews
          .sort((a, b) => b.interview.recommendationScore - a.interview.recommendationScore)
          .map((candidate, index) => index === 0 && (
          <div key={candidate.id} className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Detailed Candidate Profile</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="border-b pb-4 mb-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{candidate.name}</h3>
                    <p className="text-gray-600">{candidate.education} • {candidate.experience} experience</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      candidate.interview.recommendationTier === "Strongly Recommend" ? "bg-green-100 text-green-800" :
                      candidate.interview.recommendationTier === "Recommend" ? "bg-blue-100 text-blue-800" :
                      candidate.interview.recommendationTier === "Consider" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      <Award size={16} className="mr-1" />
                      {candidate.interview.recommendationTier}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{candidate.interview.recommendationScore}% recommendation score</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Interview Analysis</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md flex items-center">
                        <Calendar size={14} className="mr-1.5" />
                        <span>{candidate.interview.interviewDate.toLocaleDateString()}</span>
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md flex items-center">
                        <Clock size={14} className="mr-1.5" />
                        <span>{candidate.interview.interviewDuration} minutes</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-700 mb-2">Interview Highlights</h5>
                      <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                        {candidate.interview.notes.map((note, i) => (
                          <li key={i}>{note}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Sample Q&A</h5>
                      <div className="border rounded-md overflow-hidden mb-3">
                        <div className="bg-gray-50 px-4 py-2 border-b">
                          <p className="text-sm font-medium text-gray-700">{candidate.interview.questions[0]}</p>
                        </div>
                        <div className="p-3">
                          <div className="flex items-start space-x-2">
                            <MessageSquare size={16} className="text-indigo-500 mt-0.5" />
                            <p className="text-sm text-gray-600">
                              {candidate.interview.answers[0]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Skills Assessment</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium text-gray-700">Technical Skills</p>
                        <div className="flex">
                          {renderStars(candidate.interview.scores.technical)}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${(candidate.interview.scores.technical / 5) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium text-gray-700">Communication</p>
                        <div className="flex">
                          {renderStars(candidate.interview.scores.communication)}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(candidate.interview.scores.communication / 5) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <p className="text-sm font-medium text-gray-700">Problem Solving</p>
                        <div className="flex">
                          {renderStars(candidate.interview.scores.problemSolving)}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${(candidate.interview.scores.problemSolving / 5) * 100}%` }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium text-gray-700">Cultural Fit</p>
                        <div className="flex">
                          {renderStars(candidate.interview.scores.cultureFit)}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${(candidate.interview.scores.cultureFit / 5) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Areas for Development</h4>
                    <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                      <li>Could benefit from more experience with automated testing frameworks</li>
                      <li>Limited knowledge of backend integration patterns</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">All Candidates Detailed Assessments</h2>
          {candidatesWithInterviews
            .sort((a, b) => b.interview.recommendationScore - a.interview.recommendationScore)
            .map((candidate) => (
              <div key={candidate.id} className="bg-white p-6 rounded-lg shadow-sm mb-4">
                <div 
                  className="cursor-pointer flex justify-between items-center"
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
                    {expandedCandidates[candidate.id] ? (
                      <ChevronUp size={20} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </div>
                </div>
                
                {expandedCandidates[candidate.id] && (
                  <div className="mt-4 pt-4 border-t">
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
                )}
              </div>
            ))}
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommendations</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              Based on our comprehensive assessment of all candidates, we recommend proceeding with the following actions:
            </p>
            
            <div className="mt-6 space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-800">Primary Recommendation</h3>
                <p className="mt-2 text-gray-700">
                  Extend an offer to <strong>{candidatesWithInterviews
                    .sort((a, b) => b.interview.recommendationScore - a.interview.recommendationScore)[0].name}</strong> for the {job.title} position. 
                  Their exceptional technical skills, communication abilities, and problem-solving approach make them the ideal candidate for this role. 
                  We recommend scheduling a final interview with the CTO and technical leads to confirm the fit.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-800">Secondary Options</h3>
                <p className="mt-2 text-gray-700">
                  Should negotiations with {candidatesWithInterviews
                    .sort((a, b) => b.interview.recommendationScore - a.interview.recommendationScore)[0].name} not proceed as expected, we recommend considering <strong>{candidatesWithInterviews
                    .sort((a, b) => b.interview.recommendationScore - a.interview.recommendationScore)[1].name}</strong> and <strong>{candidatesWithInterviews
                    .sort((a, b) => b.interview.recommendationScore - a.interview.recommendationScore)[2].name}</strong> as excellent backup candidates. Both demonstrate strong capabilities and would be valuable additions to the team.
                </p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-800">Additional Considerations</h3>
                <p className="mt-2 text-gray-700">
                  Given the strong technical capabilities of several candidates not selected for this role, we recommend keeping their profiles active for future openings, particularly in the frontend and full-stack development teams.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pb-8 text-center text-gray-500 text-sm">
          <p>Generated by Increw Recruitment Platform</p>
          <p>Report ID: CFR-2025-0042 • May 10, 2025</p>
        </div>
      </div>
    </div>
  );
}