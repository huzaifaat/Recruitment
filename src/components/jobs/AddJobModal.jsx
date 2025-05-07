'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { X } from 'lucide-react';

export default function AddJobModal({ isOpen, onClose, onAddJob }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Convert requirements string to array
    const requirements = formData.requirements
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => line.trim());
    
    const newJob = {
      ...formData,
      id: Date.now().toString(),
      requirements,
      status: 'Active',
      candidates: 0,
      contacted: 0,
      shortlisted: 0,
      createdAt: new Date().toISOString(),
    };
    
    // Simulate API call
    setTimeout(() => {
      onAddJob(newJob);
      setFormData({
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: '',
      });
      setIsLoading(false);
      onClose();
    }, 1500);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-xl font-semibold mb-6">Add New Job</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input mt-1"
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="input mt-1"
                placeholder="e.g. TechCorp"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="input mt-1"
                placeholder="e.g. Remote, Lahore, Pakistan"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="input mt-1"
              placeholder="Provide a detailed description of the job role..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Requirements (one per line)</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={4}
              required
              className="input mt-1"
              placeholder="Bachelor's degree in Computer Science or related field
5+ years experience with React
Experience with Next.js and TypeScript"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
            >
              Add Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}