const express = require('express');
const Internship = require('../models/Internship');
const auth = require('../middleware/auth');
const redisService = require('../services/redisService');
const exportService = require('../services/exportService');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const router = express.Router();

// Utility function for advanced filtering
const buildAdvancedFilter = (params) => {
  const filter = {};
  const {
    state,
    district,
    skills,
    company_name,
    qualification,
    intern_title,
    minSkills,
    maxSkills,
    searchTerm,
    startDate,
    endDate,
    minStipend,
    maxStipend
  } = params;

  // Location filters
  if (state) filter.state = new RegExp(state, 'i');
  if (district) filter.district = new RegExp(district, 'i');

  // Skills filter with min/max requirements
  if (skills) {
    const skillsArray = skills.split(',').map(skill => skill.trim());
    filter.skills_required = { $in: skillsArray.map(skill => new RegExp(skill, 'i')) };

    if (minSkills) {
      filter.$where = function () {
        return this.skills_required.length >= parseInt(minSkills);
      };
    }
    if (maxSkills) {
      filter.$where = function () {
        return this.skills_required.length <= parseInt(maxSkills);
      };
    }
  }

  // Company name filter
  if (company_name) {
    filter.company_name = new RegExp(company_name, 'i');
  }

  // Qualification filter
  if (qualification) {
    filter.qualification = new RegExp(qualification, 'i');
  }

  // Position type filter
  if (intern_title) {
    filter.intern_title = new RegExp(intern_title, 'i');
  }

  // Global search term
  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm, 'i');
    filter.$or = [
      { company_name: searchRegex },
      { qualification: searchRegex },
      { skills_required: searchRegex },
      { state: searchRegex },
      { district: searchRegex },
      { intern_title: searchRegex }
    ];
  }

  // Date range filter
  if (startDate || endDate) {
    filter.start_date = {};
    if (startDate) {
      filter.start_date.$gte = new Date(startDate);
    }
    if (endDate) {
      filter.start_date.$lte = new Date(endDate);
    }
  }

  // Stipend range filter
  if (minStipend || maxStipend) {
    filter.stipend = {};
    if (minStipend) {
      filter.stipend.$gte = Number(minStipend);
    }
    if (maxStipend) {
      filter.stipend.$lte = Number(maxStipend);
    }
  }

  return filter;
};

// @route   GET /api/internships
// @desc    Get all internships with advanced filtering, sorting, and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      searchTerm,
      state,
      district,
      skills,
      company_name,
      qualification,
      intern_title,
      minSkills,
      maxSkills
    } = req.query;

    // Generate cache key based on query parameters
    const cacheKey = redisService.generateSearchKey({
      page,
      limit,
      sortBy,
      sortOrder,
      searchTerm,
      state,
      district,
      skills,
      company_name,
      qualification,
      intern_title,
      minSkills,
      maxSkills
    });

    // Try to get cached results
    const cachedResults = await redisService.get(cacheKey);
    if (cachedResults) {
      return res.json(cachedResults);
    }

    // Build advanced filter
    const filter = buildAdvancedFilter({
      state,
      district,
      skills,
      company_name,
      qualification,
      intern_title,
      minSkills,
      maxSkills,
      searchTerm
    });

    // Prepare sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const internships = await Internship.find(filter)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Internship.countDocuments(filter);

    const results = {
      internships,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    };

    // Cache the results for 1 hour
    await redisService.set(cacheKey, results, 3600);

    res.json(results);

  } catch (error) {
    console.error('Get internships error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/internships/recommendations
// @desc    Get personalized internship recommendations
// @access  Private
router.get('/recommendations', auth, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.id);

    if (!user || !user.profile) {
      return res.status(400).json({ message: 'User profile not found. Please complete your profile first.' });
    }

    const { profile } = user;

    // Build matching query
    const matchQuery = { isActive: true };

    // Add deadline filter
    matchQuery.$or = [
      { applicationDeadline: { $gte: new Date() } },
      { applicationDeadline: { $exists: false } }
    ];

    // Get all internships for matching
    const allInternships = await Internship.find(matchQuery);

    // Calculate match scores
    const scoredInternships = allInternships.map(internship => {
      let score = 0;
      let maxScore = 0;

      // Skill matching (45% weight)
      const skillWeight = 45;
      const matchedSkills = internship.skills.filter(skill =>
        profile.skills && profile.skills.some(userSkill =>
          userSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(userSkill.toLowerCase())
        )
      );
      const skillMatch = internship.skills.length > 0 ?
        (matchedSkills.length / internship.skills.length) * 100 : 0;
      score += (skillMatch / 100) * skillWeight;
      maxScore += skillWeight;

      // Sector matching (25% weight)
      const sectorWeight = 25;
      if (profile.sector === internship.sector) {
        score += sectorWeight;
      }
      maxScore += sectorWeight;

      // Location matching (20% weight)
      const locationWeight = 20;
      const locationMatch = profile.location === 'All India' ||
        profile.location === internship.location ||
        internship.type === 'Remote';
      if (locationMatch) {
        score += locationWeight;
      }
      maxScore += locationWeight;

      // Type matching (10% weight)
      const typeWeight = 10;
      if (profile.internshipType === 'Any' || profile.internshipType === internship.type) {
        score += typeWeight;
      }
      maxScore += typeWeight;

      const finalScore = Math.round((score / maxScore) * 100);

      return {
        ...internship.toObject(),
        matchScore: finalScore,
        matchedSkills,
        skillMatch: Math.round(skillMatch),
        locationMatch,
        sectorMatch: profile.sector === internship.sector
      };
    });

    // Sort by match score and return top 5
    const recommendations = scoredInternships
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    res.json({
      recommendations,
      userProfile: profile,
      totalInternships: allInternships.length
    });

  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({ message: 'Server error generating recommendations' });
  }
});

// @route   GET /api/internships/:id
// @desc    Get single internship
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.json(internship);
  } catch (error) {
    console.error('Get internship error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/internships/search/by-location
// @desc    Search internships by location (state and district)
// @access  Public
router.get('/search/by-location', async (req, res) => {
  try {
    const { state, district } = req.query;
    const filter = {};

    if (state) filter.state = new RegExp(state, 'i');
    if (district) filter.district = new RegExp(district, 'i');

    const internships = await Internship.find(filter);
    res.json(internships);
  } catch (error) {
    console.error('Location search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/internships/search/by-skills
// @desc    Search internships by required skills
// @access  Public
router.get('/search/by-skills', async (req, res) => {
  try {
    const { skills } = req.query;
    if (!skills) {
      return res.status(400).json({ message: 'Skills parameter is required' });
    }

    const skillsArray = skills.split(',').map(skill => skill.trim());
    const internships = await Internship.find({
      skills_required: { $in: skillsArray.map(skill => new RegExp(skill, 'i')) }
    });

    res.json(internships);
  } catch (error) {
    console.error('Skills search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/internships/search/by-company
// @desc    Search internships by company name
// @access  Public
router.get('/search/by-company', async (req, res) => {
  try {
    const { company } = req.query;
    if (!company) {
      return res.status(400).json({ message: 'Company parameter is required' });
    }

    const internships = await Internship.find({
      company_name: new RegExp(company, 'i')
    });

    res.json(internships);
  } catch (error) {
    console.error('Company search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/internships/search/by-qualification
// @desc    Search internships by qualification requirements
// @access  Public
router.get('/search/by-qualification', async (req, res) => {
  try {
    const { qualification } = req.query;
    if (!qualification) {
      return res.status(400).json({ message: 'Qualification parameter is required' });
    }

    const internships = await Internship.find({
      qualification: new RegExp(qualification, 'i')
    });

    res.json(internships);
  } catch (error) {
    console.error('Qualification search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/internships/search/by-position
// @desc    Search internships by position type
// @access  Public
router.get('/search/by-position', async (req, res) => {
  try {
    const { position } = req.query;
    if (!position) {
      return res.status(400).json({ message: 'Position parameter is required' });
    }

    const internships = await Internship.find({
      intern_title: new RegExp(position, 'i')
    });

    res.json(internships);
  } catch (error) {
    console.error('Position search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/internships/stats/overview
// @desc    Get internship statistics overview
// @access  Public
router.get('/stats/overview', async (req, res) => {
  try {
    const totalInternships = await Internship.countDocuments();
    const companies = await Internship.distinct('company_name');
    const locations = await Internship.distinct('state');
    const positions = await Internship.distinct('intern_title');
    const qualifications = await Internship.distinct('qualification');

    // Get skills frequency
    const internships = await Internship.find({}, 'skills_required');
    const skillsFrequency = {};
    internships.forEach(internship => {
      internship.skills_required.forEach(skill => {
        skillsFrequency[skill] = (skillsFrequency[skill] || 0) + 1;
      });
    });

    // Sort skills by frequency
    const topSkills = Object.entries(skillsFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count }));

    res.json({
      totalInternships,
      totalCompanies: companies.length,
      totalLocations: locations.length,
      totalPositions: positions.length,
      topSkills,
      companies,
      locations,
      positions,
      qualifications
    });
  } catch (error) {
    console.error('Stats overview error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/internships/export/csv
// @desc    Export internships to CSV
// @access  Public
router.get('/export/csv', async (req, res) => {
  try {
    const filter = buildAdvancedFilter(req.query);
    const internships = await Internship.find(filter);

    const fileName = `internships_${Date.now()}.csv`;
    const filePath = path.join(uploadsDir, fileName);

    await exportService.exportToCsv(internships, filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Download error:', err);
      }
      // Delete the file after download
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting file:', unlinkErr);
      });
    });
  } catch (error) {
    console.error('CSV export error:', error);
    res.status(500).json({ message: 'Error exporting to CSV' });
  }
});

// @route   GET /api/internships/export/excel
// @desc    Export internships to Excel
// @access  Public
router.get('/export/excel', async (req, res) => {
  try {
    const filter = buildAdvancedFilter(req.query);
    const internships = await Internship.find(filter);

    const fileName = `internships_${Date.now()}.xlsx`;
    const filePath = path.join(uploadsDir, fileName);

    await exportService.exportToExcel(internships, filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Download error:', err);
      }
      // Delete the file after download
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting file:', unlinkErr);
      });
    });
  } catch (error) {
    console.error('Excel export error:', error);
    res.status(500).json({ message: 'Error exporting to Excel' });
  }
});

module.exports = router;