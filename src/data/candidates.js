export const generateCandidates = (jobId) => {
    const platforms = ['LinkedIn', 'GitHub', 'Rozee.pk', 'Codable'];
    const universities = ['LUMS', 'NUST', 'FAST', 'COMSATS', 'UET', 'MIT', 'Stanford', 'IBA'];
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
    
    for (let i = 1; i <= 50; i++) {
      const platform = platforms[Math.floor(Math.random() * platforms.length)];
      const university = universities[Math.floor(Math.random() * universities.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const yearsExperience = Math.floor(Math.random() * 10) + 1;
      const relevantSkills = getRandomSubset(skillsForJob, 3, 7);
      const matchScore = Math.floor(Math.random() * 40) + 60; // 60-99%
      const availability = Math.floor(Math.random() * 3) + 1; // 1-3 months
      const minimumSalary = Math.floor(Math.random() * 50) + 50; // 50-99k
      const maximumSalary = minimumSalary + Math.floor(Math.random() * 50) + 10; // min+10k to min+59k
      
      candidates.push({
        id: `${jobId}-${i}`,
        jobId,
        name: `Candidate ${i}`,
        platform,
        location,
        email: `candidate${i}@example.com`,
        phone: `+92 ${Math.floor(Math.random() * 1000000000) + 1000000000}`,
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
      });
    }
    
    return candidates.sort((a, b) => b.matchScore - a.matchScore);
};