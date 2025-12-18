export interface Internship {
  company_name: string;
  qualification: string;
  skills_required: string[];
  state: string;
  district: string;
  intern_title: string;
  _id: string;
}

export const internshipsData: Internship[] = [
  {
    company_name: "IBM India",
    qualification: "BCA",
    skills_required: ["MS Excel", "Communication", "Business Writing"],
    state: "Uttar Pradesh",
    district: "Lucknow",
    intern_title: "Embedded Systems Intern",
    _id: "int_001"
  },
  {
    company_name: "Capgemini",
    qualification: "B.Tech Computer Science",
    skills_required: ["Java", "Spring Boot", "MySQL"],
    state: "Telangana",
    district: "Hyderabad",
    intern_title: "Full Stack Intern",
    _id: "int_002"
  },
  // ... Add more internships here
  {
    company_name: "Tech Mahindra",
    qualification: "MBA",
    skills_required: ["C++", "Cloud Computing", "Linux"],
    state: "Haryana",
    district: "Gurgaon",
    intern_title: "Frontend Intern",
    _id: "int_150"
  }
];

export default internshipsData;