const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const {
      educationLevel,
      skills,
      sector,
      location,
      internshipType,
      experience,
      languages,
      certifications,
      projects
    } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update profile
    user.profile = {
      educationLevel,
      skills,
      sector,
      location,
      internshipType,
      experience,
      languages,
      certifications,
      projects
    };

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      profile: user.profile
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error during profile update' });
  }
});

// @route   POST /api/users/bookmark/:internshipId
// @desc    Toggle bookmark for internship
// @access  Private
router.post('/bookmark/:internshipId', auth, async (req, res) => {
  try {
    const { internshipId } = req.params;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bookmarkIndex = user.bookmarkedInternships.indexOf(internshipId);
    
    if (bookmarkIndex > -1) {
      // Remove bookmark
      user.bookmarkedInternships.splice(bookmarkIndex, 1);
    } else {
      // Add bookmark
      user.bookmarkedInternships.push(internshipId);
    }

    await user.save();

    res.json({
      message: bookmarkIndex > -1 ? 'Bookmark removed' : 'Bookmark added',
      bookmarkedInternships: user.bookmarkedInternships
    });

  } catch (error) {
    console.error('Bookmark error:', error);
    res.status(500).json({ message: 'Server error during bookmark operation' });
  }
});

// @route   GET /api/users/bookmarks
// @desc    Get user's bookmarked internships
// @access  Private
router.get('/bookmarks', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('bookmarkedInternships');
    res.json({ bookmarkedInternships: user.bookmarkedInternships });
  } catch (error) {
    console.error('Get bookmarks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/search-history
// @desc    Save search history
// @access  Private
router.post('/search-history', auth, async (req, res) => {
  try {
    const { query, results } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add to search history (keep only last 10 searches)
    user.searchHistory.unshift({ query, results });
    if (user.searchHistory.length > 10) {
      user.searchHistory = user.searchHistory.slice(0, 10);
    }

    await user.save();

    res.json({ message: 'Search history saved' });

  } catch (error) {
    console.error('Search history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;