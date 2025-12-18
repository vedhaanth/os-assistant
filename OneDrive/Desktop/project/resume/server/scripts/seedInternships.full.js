const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Internship = require('../models/Internship');

dotenv.config();

// Raw internship data (full dataset)
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

// Function to process the raw data
const processRawData = (rawData) => {
  return rawData.split('\\n')
    .map(line => {
      try {
        let parts = line.trim().split(' ');
        let company_name = '';
        let qualification = '';
        let skills = '';
        let state = '';
        let district = '';
        let intern_title = '';

        // Handle company names with multiple words
        if (parts[1] === 'India' || parts[1] === 'Technologies' || parts[1] === 'Systems' || parts[1] === 'Infotech') {
          company_name = parts[0] + ' ' + parts[1];
          parts = parts.slice(2);
        } else if (parts[0] === 'L&T') {
          company_name = parts[0] + ' ' + parts[1];
          parts = parts.slice(2);
        } else {
          company_name = parts[0];
          parts = parts.slice(1);
        }

        // Handle qualifications with multiple words
        if (parts[0] === 'B.Tech' || parts[0] === 'M.Tech') {
          qualification = parts[0] + ' ' + parts[1];
          parts = parts.slice(2);
        } else {
          qualification = parts[0];
          parts = parts.slice(1);
        }

        // Find the state index by looking for known states
        const stateIndex = parts.findIndex(p =>
          ['Tamil Nadu', 'Maharashtra', 'Delhi', 'Uttar Pradesh', 'Karnataka', 'Telangana', 'Kerala', 'Gujarat', 'Rajasthan', 'Punjab', 'Haryana', 'Madhya Pradesh', 'West Bengal']
            .some(state => p === state)
        );

        if (stateIndex !== -1) {
          // Everything before stateIndex is skills
          skills = parts.slice(0, stateIndex).join(' ');
          state = parts[stateIndex];
          district = parts[stateIndex + 1];
          intern_title = parts.slice(stateIndex + 2).join(' ');
        }

        console.log('Processing:', { company_name, qualification, skills, state, district, intern_title }); // Debug log

        return {
          company_name,
          qualification,
          skills_required: skills.split(', ').filter(s => s),
          state,
          district,
          intern_title
        };
      } catch (err) {
        console.error('Error processing line:', line, err);
        return null;
      }
    })
    .filter(item => {
      const isValid = item &&
        item.company_name &&
        item.qualification &&
        item.skills_required.length > 0 &&
        item.state &&
        item.district &&
        item.intern_title;

      if (!isValid) {
        console.log('Filtered out:', item); // Debug log for filtered items
      }
      return isValid;
    });
};

async function seedInternships() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing internships
    await Internship.deleteMany({});
    console.log('Cleared existing internships');

    // Process and insert the data
    const internships = processRawData(rawInternshipData);
    console.log('Total internships to insert:', internships.length); // Debug log

    await Internship.insertMany(internships);
    console.log(`Successfully inserted ${internships.length} internships`);

    // Verify the insertion
    const count = await Internship.countDocuments();
    console.log(`Total internships in database: ${count}`);

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding internships:', error);
    process.exit(1);
  }
}

seedInternships();