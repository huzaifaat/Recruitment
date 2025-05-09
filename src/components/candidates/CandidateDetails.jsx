'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { Phone, Mail, MapPin, BookOpen, Briefcase, CheckCircle, Send } from 'lucide-react';

export default function CandidateDetails({ candidate, onUpdateCandidate, jobTitle, onSendEmail }) {
  const [notes, setNotes] = useState(candidate.notes);
  const [isContacting, setIsContacting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleNoteChange = (e) => {
    setNotes(e.target.value);
  };
  
  const handleSaveNotes = () => {
    onUpdateCandidate(candidate.id, { notes });
  };
  
  const handleContactCandidate = () => {
    setIsContacting(true);
  };
  
  const handleUpdateContact = (data) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onUpdateCandidate(candidate.id, {
        ...data,
        contacted: true,
      });
      setIsContacting(false);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSelectCandidate = () => {
    onUpdateCandidate(candidate.id, { 
      selected: !candidate.selected 
    });
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">{candidate.name}</h2>
            <p className="text-gray-600">{candidate.experience} experience</p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex gap-2">
            {candidate.contacted ? (
              <>
                <Button
                  variant={candidate.selected ? 'secondary' : 'outline'}
                  onClick={handleSelectCandidate}
                  className="flex items-center"
                >
                  <CheckCircle size={18} className="mr-2" />
                  {candidate.selected ? 'Selected' : 'Select Candidate'}
                </Button>
                
                {candidate.selected && !candidate.emailSent && (
                  <Button
                    onClick={onSendEmail}
                    className="flex items-center"
                  >
                    <Send size={18} className="mr-2" />
                    Send Interview Invite
                  </Button>
                )}
                
                {candidate.emailSent && (
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                    <CheckCircle size={16} className="mr-1" />
                    Email Sent
                  </span>
                )}
              </>
            ) : (
              <Button onClick={handleContactCandidate}>
                Contact Candidate
              </Button>
            )}
          </div>
        </div>
        
        <hr className="my-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Candidate Information</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail size={18} className="mr-2" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={18} className="mr-2" />
                <span>{candidate.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2" />
                <span>{candidate.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BookOpen size={18} className="mr-2" />
                <span>{candidate.education}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase size={18} className="mr-2" />
                <span>{candidate.experience}</span>
              </div>
            </div>
            
            {candidate.contacted && (
              <div className="mt-6">
                <h3 className="font-medium mb-3">Availability & Expectations</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Notice period:</span>
                    <span className="font-medium">{candidate.availability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salary expectation:</span>
                    <span className="font-medium">
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
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Match Score</h3>
              <span className="text-lg font-semibold">{candidate.matchScore}%</span>
            </div>
            <ProgressBar value={candidate.matchScore} max={100} />
            
            <div className="mt-6">
              <h3 className="font-medium mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, i) => (
                  <span key={i} className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-3">Notes</h3>
              <textarea
                value={notes}
                onChange={handleNoteChange}
                rows={4}
                className="input"
                placeholder="Add your notes about this candidate..."
              />
              <div className="mt-2 text-right">
                <Button
                  onClick={handleSaveNotes}
                  variant="outline"
                  size="sm"
                >
                  Save Notes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {isContacting && (
        <ContactForm 
          onSubmit={handleUpdateContact}
          onCancel={() => setIsContacting(false)}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

function ContactForm({ onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    availability: '1 month',
    salary: {
      minimum: 75000,
      maximum: 100000,
    },
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'minimum' || name === 'maximum') {
      setFormData({
        ...formData,
        salary: {
          ...formData.salary,
          [name]: parseInt(value),
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">Update Candidate Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notice Period / Availability
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="Immediate">Immediate</option>
              <option value="2 weeks">2 weeks</option>
              <option value="1 month">1 month</option>
              <option value="2 months">2 months</option>
              <option value="3 months">3 months</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary Expectation (PKR)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Minimum
                </label>
                <input
                  type="number"
                  name="minimum"
                  value={formData.salary.minimum}
                  onChange={handleChange}
                  min="0"
                  step="5000"
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Maximum
                </label>
                <input
                  type="number"
                  name="maximum"
                  value={formData.salary.maximum}
                  onChange={handleChange}
                  min="0"
                  step="5000"
                  className="input"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
            >
              Save Information
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}