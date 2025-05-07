'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { jobs } from '../../data/jobs';

export default function ScrapeAnimation({ jobId }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing...');
  const [platforms, setPlatforms] = useState([
    { name: 'LinkedIn', progress: 0, color: '#0077B5', logo: '🔗' },
    { name: 'GitHub', progress: 0, color: '#24292e', logo: '🐙' },
    { name: 'Rozee.pk', progress: 0, color: '#FF5C39', logo: '🌹' },
    { name: 'Codable', progress: 0, color: '#6E41E2', logo: '💻' },
  ]);
  
  const job = jobs.find(j => j.id === jobId) || { title: 'Selected job' };
  
  useEffect(() => {
    const totalDuration = 5000; // 5 seconds for the entire animation
    
    // Update overall progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        if (newProgress <= 20) {
          setStatus('Connecting to platforms...');
        } else if (newProgress <= 40) {
          setStatus('Analyzing job requirements...');
        } else if (newProgress <= 60) {
          setStatus('Finding matching profiles...');
        } else if (newProgress <= 80) {
          setStatus('Ranking candidates...');
        } else {
          setStatus('Finalizing results...');
        }
        
        return newProgress < 100 ? newProgress : 100;
      });
    }, totalDuration / 100);
    
    // Update platform-specific progress at variable rates
    const platformIntervals = platforms.map((platform, index) => {
      // Stagger the start times
      const startDelay = index * 300;
      
      return setTimeout(() => {
        const interval = setInterval(() => {
          setPlatforms(prev => {
            const updated = [...prev];
            // Random progress increments to simulate variable speeds
            const increment = Math.random() * 3 + 1;
            let newProgress = updated[index].progress + increment;
            
            if (newProgress > 100) newProgress = 100;
            
            updated[index] = { ...updated[index], progress: newProgress };
            return updated;
          });
        }, 100);
        
        // Clear this platform's interval once global animation is done
        return () => clearInterval(interval);
      }, startDelay);
    });
    
    return () => {
      clearInterval(progressInterval);
      platformIntervals.forEach(timeout => clearTimeout(timeout));
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Finding Candidates</h2>
        <p className="text-center text-gray-600 mb-8">
          Searching for candidates matching <span className="font-semibold text-indigo-600">{job.title}</span>
        </p>
        
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{status}</span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <motion.div
              className="bg-indigo-600 h-4 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            ></motion.div>
          </div>
        </div>
        
        <div className="space-y-4">
          {platforms.map((platform) => (
            <div key={platform.name} className="relative">
              <div className="flex items-center mb-1">
                <span className="text-xl mr-2">{platform.logo}</span>
                <span className="text-sm font-medium">{platform.name}</span>
                <span className="ml-auto text-sm">{Math.round(platform.progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: platform.color }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${platform.progress}%` }}
                  transition={{ duration: 0.1 }}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            This process might take a few moments. We're analyzing profiles across multiple platforms
            to find the best matches for your job requirements.
          </p>
        </div>
      </motion.div>
      
      <div className="mt-12">
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="flex flex-col items-center"
        >
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Processing candidate data...</p>
        </motion.div>
      </div>
    </div>
  );
}