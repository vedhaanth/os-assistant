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
  try {
    const states = ['Tamil Nadu', 'Maharashtra', 'Delhi', 'Uttar Pradesh', 'Karnataka', 'Telangana', 'Kerala', 'Gujarat', 'Rajasthan', 'Punjab', 'Haryana', 'Madhya Pradesh', 'West Bengal'];
    let parts = line.trim().split(' ');

    // Initialize the result object
    const result = {
      company_name: '',
      qualification: '',
      skills_required: [],
      state: '',
      district: '',
      intern_title: ''
    };

    // Find the state index first
    const stateIndex = parts.findIndex((part, idx) =>
      states.some(state => {
        if (state.includes(' ')) {
          // Handle two-word states like "Tamil Nadu"
          return parts.slice(idx, idx + 2).join(' ') === state;
        }
        return part === state;
      })
    );

    if (stateIndex === -1) {
      throw new Error('Could not find state in: ' + line);
    }

    // Handle two-word states
    const stateWord = states.find(state => {
      if (state.includes(' ')) {
        return parts.slice(stateIndex, stateIndex + 2).join(' ') === state;
      }
      return parts[stateIndex] === state;
    });

    // Company name processing
    if (parts[1] === 'India' || parts[1] === 'Technologies' || parts[1] === 'Systems' || parts[1] === 'Infotech') {
      result.company_name = parts[0] + ' ' + parts[1];
      parts = parts.slice(2);
    } else if (parts[0] === 'L&T') {
      result.company_name = parts[0] + ' ' + parts[1];
      parts = parts.slice(2);
    } else {
      result.company_name = parts[0];
      parts = parts.slice(1);
    }

    // Qualification processing
    if (parts[0] === 'B.Tech' || parts[0] === 'M.Tech') {
      if (parts[1] === 'Computer' || parts[1] === 'Mechanical' || parts[1] === 'ECE') {
        result.qualification = parts[0] + ' ' + parts[1];
        parts = parts.slice(2);
      } else {
        result.qualification = parts[0];
        parts = parts.slice(1);
      }
    } else {
      result.qualification = parts[0];
      parts = parts.slice(1);
    }

    // Update stateIndex after slicing
    const newStateIndex = parts.findIndex(part => part === stateWord || (stateWord && stateWord.startsWith(part)));

    // Skills processing (everything between qualification and state)
    const skillsString = parts.slice(0, newStateIndex).join(' ');
    result.skills_required = skillsString.split(', ').map(skill => skill.trim());

    // State and district
    result.state = stateWord;
    const districtIndex = newStateIndex + (stateWord.includes(' ') ? 2 : 1);
    result.district = parts[districtIndex];

    // Intern title (everything after district)
    result.intern_title = parts.slice(districtIndex + 1).join(' ');

    return result;
  } catch (error) {
    console.error('Error processing line:', line, error);
    return null;
  }
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
        internship &&
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

    // Show some samples for verification
    const samples = await Internship.find().limit(3);
    console.log('\nSample internships:');
    samples.forEach((sample, index) => {
      console.log(`\nSample ${index + 1}:`);
      console.log('Company:', sample.company_name);
      console.log('Qualification:', sample.qualification);
      console.log('Skills:', sample.skills_required);
      console.log('Location:', sample.district + ', ' + sample.state);
      console.log('Position:', sample.intern_title);
    });

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding internships:', error);
    process.exit(1);
  }
}

seedInternships();