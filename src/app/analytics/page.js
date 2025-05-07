'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar';
import Sidebar from '../../components/layout/Sidebar';
import RecruitmentPipeline from '../../components/analytics/RecruitmentPipeline';
import SourceDistribution from '../../components/analytics/SourceDistribution';
import TimeToHire from '../../components/analytics/TimeToHire';

export default function Analytics() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);
  
  if (loading || !user) {
    return null; // or a loading spinner
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      
      <div className="pt-16 lg:ml-64">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Recruitment Analytics</h1>
          
          <div className="mb-6">
            <RecruitmentPipeline />
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SourceDistribution />
            <TimeToHire />
          </div>
        </div>
      </div>
    </div>
  );
}