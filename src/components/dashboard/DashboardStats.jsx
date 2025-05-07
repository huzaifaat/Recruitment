'use client';

import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Users, Briefcase, Clock, CheckCircle } from 'lucide-react';

export default function DashboardStats() {
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalCandidates: 0,
    shortlisted: 0,
    avgTimeToHire: 0,
  });
  
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    // Simulate stats loading
    setTimeout(() => {
      setStats({
        activeJobs: 3,
        totalCandidates: 150,
        shortlisted: 23,
        avgTimeToHire: 14,
      });
      
      setChartData([
        { name: 'Week 1', candidates: 45, shortlisted: 7 },
        { name: 'Week 2', candidates: 38, shortlisted: 5 },
        { name: 'Week 3', candidates: 27, shortlisted: 6 },
        { name: 'Week 4', candidates: 40, shortlisted: 5 },
      ]);
    }, 1000);
  }, []);
  
  const statCards = [
    {
      title: 'Active Jobs',
      value: stats.activeJobs,
      icon: Briefcase,
      color: 'text-blue-500 bg-blue-100',
    },
    {
      title: 'Total Candidates',
      value: stats.totalCandidates,
      icon: Users,
      color: 'text-green-500 bg-green-100',
    },
    {
      title: 'Shortlisted',
      value: stats.shortlisted,
      icon: CheckCircle,
      color: 'text-purple-500 bg-purple-100',
    },
    {
      title: 'Avg. Time to Hire',
      value: `${stats.avgTimeToHire} days`,
      icon: Clock,
      color: 'text-orange-500 bg-orange-100',
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </Card>
          );
        })}
      </div>
      
      <Card>
        <h3 className="text-lg font-semibold mb-4">Recruitment Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="candidates" name="Candidates" fill="#4f46e5" />
            <Bar dataKey="shortlisted" name="Shortlisted" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}