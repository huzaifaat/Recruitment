'use client';

import { useState } from 'react';
import { Code, Filter } from 'lucide-react';

export default function TopCandidateSkills() {
  const [activeRole, setActiveRole] = useState('all');
  
  const skillsData = {
    all: [
      { skill: 'React', count: 145, percentage: 58 },
      { skill: 'JavaScript', count: 182, percentage: 73 },
      { skill: 'TypeScript', count: 118, percentage: 47 },
      { skill: 'Next.js', count: 93, percentage: 37 },
      { skill: 'Node.js', count: 105, percentage: 42 },
      { skill: 'Python', count: 87, percentage: 35 },
      { skill: 'Django', count: 45, percentage: 18 },
      { skill: 'SQL', count: 110, percentage: 44 },
      { skill: 'MongoDB', count: 78, percentage: 31 },
      { skill: 'Docker', count: 92, percentage: 37 },
      { skill: 'AWS', count: 85, percentage: 34 },
      { skill: 'Git', count: 190, percentage: 76 }
    ],
    frontend: [
      { skill: 'React', count: 82, percentage: 96 },
      { skill: 'JavaScript', count: 85, percentage: 100 },
      { skill: 'TypeScript', count: 70, percentage: 82 },
      { skill: 'Next.js', count: 65, percentage: 76 },
      { skill: 'CSS3', count: 85, percentage: 100 },
      { skill: 'HTML5', count: 85, percentage: 100 },
      { skill: 'Redux', count: 58, percentage: 68 },
      { skill: 'Tailwind CSS', count: 52, percentage: 61 },
      { skill: 'Jest', count: 44, percentage: 52 },
      { skill: 'GraphQL', count: 38, percentage: 45 },
      { skill: 'Webpack', count: 35, percentage: 41 },
      { skill: 'Responsive Design', count: 80, percentage: 94 }
    ],
    backend: [
      { skill: 'Node.js', count: 65, percentage: 93 },
      { skill: 'Python', count: 60, percentage: 86 },
      { skill: 'SQL', count: 68, percentage: 97 },
      { skill: 'MongoDB', count: 55, percentage: 79 },
      { skill: 'Express', count: 62, percentage: 89 },
      { skill: 'Django', count: 42, percentage: 60 },
      { skill: 'FastAPI', count: 30, percentage: 43 },
      { skill: 'API Design', count: 65, percentage: 93 },
      { skill: 'ORM', count: 58, percentage: 83 },
      { skill: 'PostgreSQL', count: 50, percentage: 71 },
      { skill: 'Redis', count: 45, percentage: 64 },
      { skill: 'Authentication', count: 60, percentage: 86 }
    ]
  };
  
  const roles = [
    { id: 'all', label: 'All Roles' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' }
  ];
  
  const skillCategories = {
    languages: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML5', 'CSS3'],
    frameworks: ['React', 'Next.js', 'Node.js', 'Django', 'Express', 'FastAPI'],
    tools: ['Git', 'Docker', 'Webpack', 'Jest'],
    databases: ['MongoDB', 'PostgreSQL', 'Redis'],
    concepts: ['API Design', 'ORM', 'Authentication', 'Responsive Design', 'GraphQL'],
    cloud: ['AWS']
  };
  
  // Group skills by category
  const groupedSkills = {};
  Object.entries(skillCategories).forEach(([category, categorySkills]) => {
    groupedSkills[category] = skillsData[activeRole]
      .filter(item => categorySkills.includes(item.skill))
      .sort((a, b) => b.count - a.count);
  });
  
  const getSkillColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-indigo-500';
    if (percentage >= 20) return 'bg-purple-500';
    return 'bg-gray-500';
  };
  
  const getSkillTextColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-indigo-600';
    if (percentage >= 20) return 'text-purple-600';
    return 'text-gray-600';
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <Code size={18} className="mr-2 text-indigo-500" />
            Top Candidate Skills
          </h2>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="flex">
                {roles.map((role, i) => (
                  <button
                    key={role.id}
                    className={`px-3 py-1.5 text-sm font-medium ${
                      activeRole === role.id 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    } ${i === 0 ? 'rounded-l' : i === roles.length - 1 ? 'rounded-r' : ''}`}
                    onClick={() => setActiveRole(role.id)}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>
            
            <button className="p-1.5 rounded-md hover:bg-gray-100 border border-gray-200">
              <Filter size={18} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            skills.length > 0 && (
              <div key={category} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 capitalize mb-4">
                  {category}
                </h3>
                <div className="space-y-3">
                  {skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={`font-medium ${getSkillTextColor(skill.percentage)}`}>
                          {skill.skill}
                        </span>
                        <span className="text-gray-500">
                          {skill.count} candidates ({skill.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className={`${getSkillColor(skill.percentage)} h-2 rounded-full`}
                          style={{ width: `${skill.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
        
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {activeRole === 'all' ? 'JavaScript' : activeRole === 'frontend' ? 'React' : 'SQL'} is the most in-demand skill for {activeRole === 'all' ? 'all roles' : `${activeRole} roles`}.
            </p>
            <button className="text-xs text-indigo-600 hover:text-indigo-800">
              Download Skill Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}