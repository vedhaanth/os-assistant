const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// Export utility functions
const exportService = {
  async exportToCsv(internships, filePath) {
    const csvWriter = createCsvWriter({
      path: filePath,
      header: [
        { id: 'intern_title', title: 'Position' },
        { id: 'company_name', title: 'Company' },
        { id: 'state', title: 'State' },
        { id: 'district', title: 'District' },
        { id: 'qualification', title: 'Qualification' },
        { id: 'skills_required', title: 'Required Skills' },
        { id: 'createdAt', title: 'Posted Date' }
      ]
    });

    const records = internships.map(internship => ({
      ...internship,
      skills_required: internship.skills_required.join(', '),
      createdAt: new Date(internship.createdAt).toLocaleDateString()
    }));

    await csvWriter.writeRecords(records);
    return filePath;
  },

  async exportToExcel(internships, filePath) {
    const records = internships.map(internship => ({
      Position: internship.intern_title,
      Company: internship.company_name,
      State: internship.state,
      District: internship.district,
      Qualification: internship.qualification,
      'Required Skills': internship.skills_required.join(', '),
      'Posted Date': new Date(internship.createdAt).toLocaleDateString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(records);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Internships');

    XLSX.writeFile(workbook, filePath);
    return filePath;
  }
};

module.exports = exportService;