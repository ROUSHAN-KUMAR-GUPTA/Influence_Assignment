const express = require('express');
const router = express.Router();

// controllers
const authCtrl = require('../controllers/auth.controller');
const profileCtrl = require('../controllers/profile.controller');
const generateCtrl = require('../controllers/generate.controller');
const scheduleCtrl = require('../controllers/schedule.controller');
const postCtrl = require('../controllers/post.controller');
const mediaCtrl = require('../controllers/media.controller');
const draftsCtrl = require('../controllers/drafts.controller');

// Auth
router.get('/auth/linkedin', authCtrl.redirectToLinkedIn);
router.get('/auth/linkedin/callback', authCtrl.callback);

// Profile analysis
router.post('/api/profile/analyze', profileCtrl.analyze);

// Research (trends)
router.post('/api/research/trends', profileCtrl.fetchTrends);

// Generate
router.post('/api/generate', generateCtrl.generatePosts);

// Drafts & schedule
router.post('/api/drafts', generateCtrl.saveDraft);
router.get('/api/drafts', draftsCtrl.list);
router.post('/api/schedule', scheduleCtrl.schedulePost);
router.post('/api/post/:draftId', postCtrl.postNow);

// Media upload (image attach)
router.post('/api/media/upload', mediaCtrl.uploadMedia);

// Analytics (placeholder)
router.get('/api/analytics/posts', profileCtrl.getAnalytics);

module.exports = router;
