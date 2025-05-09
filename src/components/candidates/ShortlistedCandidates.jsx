import React, { useState } from 'react';
import { CheckCircle, User, MoreVertical, ArrowUp, ArrowDown, Mail, Phone, Clock, Send } from 'lucide-react';
import EmailSender from '../email/EmailSender';

const ShortlistedCandidates = () => {
  const [sortField, setSortField] = useState('matchScore');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidates, setCandidates] = useState([
    {
      id: '1-3',
      name: 'Hamza Khan',
      email: 'hamza.khan@gmail.com',
      education: 'MS Computer Science, LUMS',
      experience: '6 years',
      location: 'Lahore',
      skills: ['React', 'Next.js', 'TypeScript', 'Redux', 'Tailwind CSS'],
      matchScore: 95,
      platform: 'LinkedIn',
      availability: '1 month',
      salary: {
        minimum: 150000,
        maximum: 180000
      },
      notes: 'Excellent cultural fit. Worked with similar tech stack before.',
      selected: true,
      emailSent: false
    },
    {
      id: '1-7',
      name: 'Sara Ahmed',
      email: 'sara.ahmed@outlook.com',
      education: 'BS Computer Science, FAST',
      experience: '5 years',
      location: 'Karachi',
      skills: ['JavaScript', 'React', 'Next.js', 'Node.js', 'CSS3'],
      matchScore: 91,
      platform: 'GitHub',
      availability: '2 months',
      salary: {
        minimum: 140000,
        maximum: 170000
      },
      notes: 'Strong portfolio. Previously worked at a fintech startup.',
      selected: true,
      emailSent: false
    },
    {
      id: '1-1',
      name: 'Waqar Qureshi',
      email: 'waqarqureshi94@gmail.com',
      education: 'MS Computer Science, LUMS',
      experience: '4 years',
      location: 'Islamabad',
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Redux'],
      matchScore: 95,
      platform: 'LinkedIn',
      availability: '1 month',
      salary: {
        minimum: 120000,
        maximum: 150000
      },
      notes: 'Strong candidate with excellent skills. Good cultural fit.',
      selected: true,
      emailSent: false
    },
    {
      id: '1-2',
      name: 'Sadia Nasir',
      email: 'Sadia.nasir98@gmail.com',
      education: 'BS Computer Science, LSE',
      experience: '3 years',
      location: 'Lahore',
      skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Redux'],
      matchScore: 92,
      platform: 'Rozee.pk',
      availability: '2 weeks',
      salary: {
        minimum: 100000,
        maximum: 130000
      },
      notes: 'Strong frontend skills. Quick learner.',
      selected: true,
      emailSent: false
    },
    {
      id: '1-12',
      name: 'Ali Hassan',
      email: 'ali.hassan@gmail.com',
      education: 'MS Computer Science, NUST',
      experience: '4 years',
      location: 'Islamabad',
      skills: ['TypeScript', 'React', 'Redux', 'HTML5', 'Cypress'],
      matchScore: 88,
      platform: 'LinkedIn',
      availability: '1 month',
      salary: {
        minimum: 130000,
        maximum: 160000
      },
      notes: 'Great communication skills. Experienced with test-driven development.',
      selected: true,
      emailSent: false
    },
    {
      id: '1-18',
      name: 'Fatima Malik',
      email: 'fatima.malik@gmail.com',
      education: 'BS Computer Science, IBA',
      experience: '3 years',
      location: 'Lahore',
      skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Jest'],
      matchScore: 85,
      platform: 'Rozee.pk',
      availability: '2 months',
      salary: {
        minimum: 120000,
        maximum: 150000
      },
      notes: 'Skilled in frontend development. Good eye for design.',
      selected: true,
      emailSent: false
    },
    {
      id: '1-24',
      name: 'Usman Ali',
      email: 'usman.ali@hotmail.com',
      education: 'BS Software Engineering, UET',
      experience: '7 years',
      location: 'Remote',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
      matchScore: 83,
      platform: 'GitHub',
      availability: '3 months',
      salary: {
        minimum: 160000,
        maximum: 190000
      },
      notes: 'Extensive experience with modern frontend frameworks. Strong problem-solving skills.',
      selected: true,
      emailSent: false
    },
    {
      id: '1-29',
      name: 'Ayesha Khan',
      email: 'ayesha.khan@gmail.com',
      education: 'MS Computer Science, COMSATS',
      experience: '4 years',
      location: 'Islamabad',
      skills: ['JavaScript', 'React', 'Redux', 'HTML5', 'CSS3'],
      matchScore: 79,
      platform: 'LinkedIn',
      availability: '1 month',
      salary: {
        minimum: 125000,
        maximum: 155000
      },
      notes: 'Quick learner. Good team player.',
      selected: true,
      emailSent: false
    },
    {
      id: '1-35',
      name: 'Zain Ahmed',
      email: 'zain.ahmed@yahoo.com',
      education: 'BS Computer Science, FAST',
      experience: '5 years',
      location: 'Karachi',
      skills: ['React', 'JavaScript', 'Node.js', 'MongoDB', 'Express'],
      matchScore: 76,
      platform: 'Codable',
      availability: '2 months',
      salary: {
        minimum: 135000,
        maximum: 165000
      },
      notes: 'Full-stack developer. Experienced with MERN stack.',
      selected: true,
      emailSent: false
    }
  ]);
  
  // Sort the candidates
  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortField === 'matchScore') {
      return sortDirection === 'desc' ? b.matchScore - a.matchScore : a.matchScore - b.matchScore;
    }
    if (sortField === 'experience') {
      const aExp = parseInt(a.experience);
      const bExp = parseInt(b.experience);
      return sortDirection === 'desc' ? bExp - aExp : aExp - bExp;
    }
    if (sortField === 'salary') {
      return sortDirection === 'desc' 
        ? b.salary.minimum - a.salary.minimum 
        : a.salary.minimum - b.salary.minimum;
    }
    // Default sort by name
    return sortDirection === 'desc' 
      ? b.name.localeCompare(a.name) 
      : a.name.localeCompare(b.name);
  });
  
  // Handle sort click
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Handle email send
  const handleSendEmail = (candidate) => {
    setSelectedCandidate(candidate);
    setShowEmailModal(true);
  };

  // Handle email send success
  const handleEmailSendSuccess = (candidateId) => {
    const updatedCandidates = candidates.map(c => 
      c.id === candidateId ? { ...c, emailSent: true } : c
    );
    setCandidates(updatedCandidates);
  };
  
  // Get email sent count
  const getEmailSentCount = () => {
    return candidates.filter(c => c.emailSent).length;
  };

  // Send emails to all candidates
  const handleSendAllEmails = () => {
    // In a real application, you would implement batch email sending
    alert('This would send emails to all candidates - implement batch email sending');
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Final Shortlisted Candidates</h2>
          <div className="flex space-x-2">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
              onClick={handleSendAllEmails}
            >
              <Send className="mr-2 h-4 w-4" />
              Send All Invites ({getEmailSentCount()}/{candidates.length})
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
              Export
            </button>
          </div>
        </div>
        <p className="mt-1 text-gray-600">{candidates.length} candidates for Senior Frontend Developer position at TechCorp</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('matchScore')}
              >
                <div className="flex items-center">
                  Match Score
                  {sortField === 'matchScore' && (
                    sortDirection === 'desc' ? <ArrowDown className="w-4 h-4 ml-1" /> : <ArrowUp className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('experience')}
              >
                <div className="flex items-center">
                  Experience
                  {sortField === 'experience' && (
                    sortDirection === 'desc' ? <ArrowDown className="w-4 h-4 ml-1" /> : <ArrowUp className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Availability
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('salary')}
              >
                <div className="flex items-center">
                  Salary Range
                  {sortField === 'salary' && (
                    sortDirection === 'desc' ? <ArrowDown className="w-4 h-4 ml-1" /> : <ArrowUp className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                        {candidate.selected && (
                          <CheckCircle className="ml-1 h-4 w-4 text-green-500" />
                        )}
                        {candidate.emailSent && (
                          <Mail className="ml-1 h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{candidate.email}</div>
                      <div className="text-sm text-gray-500">{candidate.education}</div>
                      <div className="text-sm text-gray-500">{candidate.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${candidate.matchScore >= 90 ? 'bg-green-100 text-green-800' : 
                      candidate.matchScore >= 80 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {candidate.matchScore}%
                  </span>
                  <div className="text-xs text-gray-500 mt-1">via {candidate.platform}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {candidate.experience}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                        +{candidate.skills.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-1 h-4 w-4 text-gray-400" />
                    {candidate.availability}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Rs. {(candidate.salary.minimum/1000).toFixed(0)}k - {(candidate.salary.maximum/1000).toFixed(0)}k
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      className={`p-1 ${candidate.emailSent ? 'text-green-600' : 'text-blue-600 hover:text-blue-900'}`}
                      onClick={() => handleSendEmail(candidate)}
                      title={candidate.emailSent ? "Email already sent" : "Send interview invitation"}
                    >
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-blue-600 hover:text-blue-900" title="Call candidate">
                      <Phone className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700" title="More options">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">Showing {candidates.length} of {candidates.length} shortlisted candidates</div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            Send to Client
          </button>
        </div>
      </div>

      {showEmailModal && selectedCandidate && (
        <EmailSender 
          candidate={selectedCandidate}
          jobTitle="Senior Frontend Developer"
          onClose={() => setShowEmailModal(false)}
          onSendSuccess={handleEmailSendSuccess}
        />
      )}
    </div>
  );
};

export default ShortlistedCandidates;