'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Mail, X } from 'lucide-react';

export default function EmailSender({ candidate, jobTitle, onClose, onSendSuccess }) {
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  // Email template with default values
  const [emailData, setEmailData] = useState({
    from: 'huzaifaathar1@gmail.com',
    to: candidate?.email || '',
    subject: `Interview Invitation from Increw`,
    body: `Dear ${candidate?.name},

Thank you for your interest in ${jobTitle} at Increw. We were impressed with your application and would like to invite you to an online interview.

To make the process as smooth as possible, we'll be using our online interview platform, which you can access through this link: [Insert Link to Increw's Online Interview Platform Homepage].

Please use the platform to appear in an automated online interview at your convenience. Once you log in, you'll be able to start the interview which will take around 15 to 20 minutes. Please make sure to submit your interview in the next 24 hours.

We look forward to speaking with you soon and discussing this exciting opportunity at Increw.

Best regards,
[Your Name]
HR Manager`
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value
    });
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);
    
    try {
      // Make an actual API call to send the email
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send email');
      }
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to send email');
      }
      
      console.log('Email sent: ', result.messageId);
      setSendSuccess(true);
      
      // Notify parent component
      if (onSendSuccess) {
        onSendSuccess(candidate.id);
      }
      
      // Wait for a moment to show success message before closing
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (err) {
      setError(`Failed to send email: ${err.message}`);
      console.error('Error sending email:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Send Interview Invitation</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              disabled={isSending}
            >
              <X size={20} />
            </button>
          </div>
          
          {sendSuccess ? (
            <div className="bg-green-50 text-green-800 p-4 rounded-md mb-4">
              Email sent successfully to {candidate.name}!
            </div>
          ) : (
            <form onSubmit={handleSendEmail}>
              {error && (
                <div className="bg-red-50 text-red-800 p-4 rounded-md mb-4">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <input
                    type="email"
                    name="from"
                    value={emailData.from}
                    onChange={handleChange}
                    className="input"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <input
                    type="email"
                    name="to"
                    value={emailData.to}
                    onChange={handleChange}
                    className="input"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={emailData.subject}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Body
                  </label>
                  <textarea
                    name="body"
                    value={emailData.body}
                    onChange={handleChange}
                    rows={15}
                    className="input font-mono text-sm"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isSending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isSending}
                    className="flex items-center"
                  >
                    <Mail size={18} className="mr-2" />
                    Send Email
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
}