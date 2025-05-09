export const generateCandidates = (jobId) => {
  const platforms = ['LinkedIn', 'GitHub', 'Rozee.pk', 'Codable'];
  const universities = ['LUMS', 'NUST', 'FAST', 'COMSATS', 'UET', 'MIT', 'Stanford', 'IBA', 'LSE', 'GCU', 'Punjab University'];
  const locations = ['Lahore', 'Karachi', 'Islamabad', 'Remote'];
  const skills = {
    '1': ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Redux', 'HTML5', 'CSS3', 'Tailwind CSS', 'Jest', 'Cypress'],
    '2': ['Python', 'Django', 'Flask', 'FastAPI', 'SQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS'],
    '3': ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'Azure', 'GCP', 'Jenkins', 'GitLab CI', 'Ansible', 'Linux'],
  };
  
  const getRandomSubset = (array, min, max) => {
    // Ensure array is valid and iterable
    if (!array || !Array.isArray(array)) {
      console.warn(`Skills not found for job ID: ${jobId}`);
      return []; // Return empty array as fallback
    }
    
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  const candidates = [];
  
  // Default to job ID 1 skills if the requested job ID doesn't exist
  const skillsForJob = skills[jobId] || skills['1'];
  
  // Add the two specific candidates first
  candidates.push({
    id: `${jobId}-1`,
    jobId,
    name: 'Waqar Qureshi',
    platform: 'LinkedIn',
    location: 'Islamabad',
    email: 'waqarqureshi94@gmail.com',
    phone: '+92 300 1234567',
    education: 'MS Computer Science, LUMS',
    experience: '4 years',
    skills: getRandomSubset(skillsForJob, 4, 6),
    matchScore: 95, // High match score
    contacted: false,
    availability: '1 month',
    salary: {
      minimum: 120000,
      maximum: 150000,
    },
    notes: '',
    selected: false,
    emailSent: false,
  });
  
  candidates.push({
    id: `${jobId}-2`,
    jobId,
    name: 'Sadia Nasir',
    platform: 'Rozee.pk',
    location: 'Lahore',
    email: 'Sadia.nasir98@gmail.com',
    phone: '+92 315 7891234',
    education: 'BS Computer Science, LSE',
    experience: '3 years',
    skills: getRandomSubset(skillsForJob, 4, 6),
    matchScore: 92, // High match score
    contacted: false,
    availability: '2 weeks',
    salary: {
      minimum: 100000,
      maximum: 130000,
    },
    notes: '',
    selected: false,
    emailSent: false,
  });
  
  // Generate the remaining candidates with realistic Pakistani names
  for (let i = 3; i <= 50; i++) {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const university = universities[Math.floor(Math.random() * universities.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const yearsExperience = Math.floor(Math.random() * 10) + 1;
    const relevantSkills = getRandomSubset(skillsForJob, 3, 7);
    const matchScore = Math.floor(Math.random() * 40) + 60; // 60-99%
    const availability = Math.floor(Math.random() * 3) + 1; // 1-3 months
    const minimumSalary = Math.floor(Math.random() * 50) + 50; // 50-99k
    const maximumSalary = minimumSalary + Math.floor(Math.random() * 50) + 10; // min+10k to min+59k
    
    const candidateName = getRandomName();
    const emailUsername = candidateName.toLowerCase().replace(' ', '.') + Math.floor(Math.random() * 100);
    const emailDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com'];
    const emailDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
    
    candidates.push({
      id: `${jobId}-${i}`,
      jobId,
      name: candidateName,
      platform,
      location,
      email: `${emailUsername}@${emailDomain}`,
      phone: `+92 ${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 100000000) + 900000000}`,
      education: `${Math.random() > 0.7 ? 'MS' : 'BS'} Computer Science, ${university}`,
      experience: `${yearsExperience} years`,
      skills: relevantSkills,
      matchScore,
      contacted: false,
      availability: `${availability} month${availability > 1 ? 's' : ''}`,
      salary: {
        minimum: minimumSalary * 1000,
        maximum: maximumSalary * 1000,
      },
      notes: '',
      selected: false,
      emailSent: false,
    });
  }
  
  return candidates.sort((a, b) => b.matchScore - a.matchScore);
};

// Helper function to generate random Pakistani names
function getRandomName() {
  const firstNames = [
    'Ahmed', 'Ali', 'Usman', 'Bilal', 'Faisal', 'Hassan', 'Imran', 'Kamran', 'Saad', 'Tariq',
    'Muhammad', 'Asim', 'Fahad', 'Hamza', 'Junaid', 'Nabeel', 'Omar', 'Qasim', 'Rizwan', 'Shahid',
    'Aisha', 'Ayesha', 'Fatima', 'Hira', 'Khadija', 'Maryam', 'Nadia', 'Saima', 'Zainab', 'Zara',
    'Amna', 'Bushra', 'Faiza', 'Hina', 'Iram', 'Maheen', 'Noor', 'Rabia', 'Sana', 'Tanzila'
  ];
  
  const lastNames = [
    'Khan', 'Ahmed', 'Ali', 'Malik', 'Shah', 'Siddiqui', 'Hashmi', 'Butt', 'Chaudhry', 'Qureshi',
    'Hassan', 'Akram', 'Iqbal', 'Javed', 'Mahmood', 'Raza', 'Sheikh', 'Baig', 'Mirza', 'Rizvi',
    'Abbasi', 'Bhatti', 'Farooq', 'Gul', 'Hamid', 'Janjua', 'Karim', 'Lodhi', 'Naqvi', 'Sajjad'
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
}