const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
    trim: true
  },
  qualification: {
    type: String,
    required: true,
    trim: true
  },
  skills_required: [{
    type: String,
    trim: true
  }],
  state: {
    type: String,
    required: true,
    trim: true
  },
  district: {
    type: String,
    required: true,
    trim: true
  },
  intern_title: {
    type: String,
    required: true,
    trim: true
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  stipend: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

// Index for better search performance
InternshipSchema.index({ sector: 1, location: 1, skills: 1 });
InternshipSchema.index({ isActive: 1, applicationDeadline: 1 });

module.exports = mongoose.model('Internship', InternshipSchema);