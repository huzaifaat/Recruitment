'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import Navbar from '../../../components/layout/Navbar';
import Sidebar from '../../../components/layout/Sidebar';
import ShortlistedCandidates from '../../../components/candidates/ShortlistedCandidates';

export default function ShortlistedPage() {
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
          <h1 className="text-2xl font-bold mb-6">Shortlisted Candidates</h1>
          
          <ShortlistedCandidates />
        </div>
      </div>
    </div>
  );
}