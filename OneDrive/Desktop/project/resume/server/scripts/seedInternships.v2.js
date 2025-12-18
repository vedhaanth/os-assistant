const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Internship = require('../models/Internship');

dotenv.config();

const rawInternshipData = `IBM India BCA MS Excel, Communication, Business Writing Uttar Pradesh Lucknow Embedded Systems Intern
Capgemini B.Tech Computer Science Java, Spring Boot, MySQL Telangana Hyderabad Full Stack Intern
Persistent Systems M.Tech Computer Science AI, Machine Learning, Python Tamil Nadu Kanchipuram Cloud Engineering Intern
Zoho B.Sc IT JavaScript, React, Node.js Tamil Nadu Chennai Frontend Intern
Oracle India B.Sc IT Business Analysis, Excel, Power BI Maharashtra Mumbai AI Intern
Capgemini B.Sc IT Java, Spring Boot, MySQL Delhi New Delhi Frontend Intern
HCL Technologies B.Tech ECE Embedded Systems, IoT, C Punjab Amritsar IoT Intern
Mindtree M.Tech Computer Science Python, Django, REST APIs Delhi New Delhi Database Intern
TCS B.Tech ECE Python, Django, REST APIs Delhi New Delhi AI Intern
Mphasis B.Com Python, SQL, Data Analysis Maharashtra Mumbai Software Development Intern
L&T Infotech B.Com C++, Cloud Computing, Linux Punjab Amritsar Network Security Intern
HCL Technologies M.Tech Computer Science AI, Machine Learning, Python Uttar Pradesh Lucknow Machine Learning Intern
TCS B.Tech Computer Science Cloud, Kubernetes, Docker Gujarat Ahmedabad Web Development Intern
Infosys B.Com C++, Cloud Computing, Linux Uttar Pradesh Lucknow Software Development Intern
Persistent Systems BBA Cloud, Kubernetes, Docker Tamil Nadu Chennai Network Security Intern
TCS B.Sc IT MS Excel, Communication, Business Writing Haryana Gurgaon Software Development Intern
Persistent Systems BBA Python, SQL, Data Analysis Delhi New Delhi UI/UX Design Intern
L&T Infotech B.Sc IT Embedded Systems, IoT, C Gujarat Ahmedabad Software Development Intern
HCL Technologies M.Tech Computer Science Python, SQL, Data Analysis Punjab Amritsar Backend Intern
Cognizant BBA MS Excel, Communication, Business Writing Madhya Pradesh Indore UI/UX Design Intern
Zoho BBA Python, Django, REST APIs Haryana Gurgaon IoT Intern
Cognizant MCA AI, Machine Learning, Python Maharashtra Mumbai Data Analyst Intern
Capgemini B.Tech Mechanical MS Excel, Communication, Business Writing West Bengal Kolkata Data Analyst Intern
Mindtree MCA Embedded Systems, IoT, C Maharashtra Mumbai Software Development Intern
Infosys BCA Python, Django, REST APIs Delhi New Delhi Full Stack Intern
L&T Infotech BBA JavaScript, React, Node.js Tamil Nadu Chennai Business Analyst Intern
L&T Infotech B.Tech Mechanical Python, Django, REST APIs Rajasthan Jaipur Backend Intern
L&T Infotech B.Sc IT MS Excel, Communication, Business Writing Uttar Pradesh Lucknow Data Analyst Intern
Oracle India B.Tech Mechanical Embedded Systems, IoT, C Karnataka Bengaluru Business Analyst Intern
Accenture BCA Java, Spring Boot, MySQL West Bengal Kolkata Embedded Systems Intern`;

const processInternship = (line) => {
  const parts = line.trim().split(' ');
  const result = {
    company_name: '',
    qualification: '',
    skills_required: [],
    state: '',
    district: '',
    intern_title: ''
  };

  let currentIndex = 0;

  // Handle company name
  if (parts[1] === 'India' || parts[1] === 'Technologies' || parts[1] === 'Systems' || parts[1] === 'Infotech') {
    result.company_name = parts[0] + ' ' + parts[1];
    currentIndex = 2;
  } else if (parts[0] === 'L&T') {
    result.company_name = parts[0] + ' ' + parts[1];
    currentIndex = 2;
  } else {
    result.company_name = parts[0];
    currentIndex = 1;
  }

  // Handle qualification
  if (parts[currentIndex] === 'B.Tech' || parts[currentIndex] === 'M.Tech') {
    result.qualification = parts[currentIndex] + ' ' + parts[currentIndex + 1];
    currentIndex += 2;
  } else {
    result.qualification = parts[currentIndex];
    currentIndex++;
  }

  // Find state index
  const states = ['Tamil Nadu', 'Maharashtra', 'Delhi', 'Uttar Pradesh', 'Karnataka', 'Telangana', 'Kerala', 'Gujarat', 'Rajasthan', 'Punjab', 'Haryana', 'Madhya Pradesh', 'West Bengal'];
  const stateIndex = parts.findIndex((part, index) => index >= currentIndex && states.includes(part));

  if (stateIndex !== -1) {
    // Get skills (everything between qualification and state)
    result.skills_required = parts.slice(currentIndex, stateIndex).join(' ').split(', ');
    result.state = parts[stateIndex];
    result.district = parts[stateIndex + 1];
    result.intern_title = parts.slice(stateIndex + 2).join(' ');
  }

  return result;
};

async function seedInternships() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing internships
    await Internship.deleteMany({});
    console.log('Cleared existing internships');

    // Process each line
    const internships = rawInternshipData
      .split('\n')
      .map(line => processInternship(line))
      .filter(internship =>
        internship.company_name &&
        internship.qualification &&
        internship.skills_required.length > 0 &&
        internship.state &&
        internship.district &&
        internship.intern_title
      );

    // Insert the processed internships
    await Internship.insertMany(internships);
    console.log(`Successfully processed and inserted ${internships.length} internships`);

    // Verify the data
    const verifyCount = await Internship.countDocuments();
    console.log(`Verified count in database: ${verifyCount} internships`);

    // Sample verification
    const sample = await Internship.findOne();
    console.log('Sample internship:', sample);

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding internships:', error);
    process.exit(1);
  }
}

seedInternships();