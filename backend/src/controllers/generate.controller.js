const aiClient = require('../libs/ai.client');
const Draft = require('../models/Draft');
const ProfileAnalysis = require('../models/ProfileAnalysis');
const Trend = require('../models/Trend');

exports.generatePosts = async (req, res) => {
  try {
    const { profileAnalysisId, trendIds, toneOverride, userId } = req.body;
    const profile = profileAnalysisId ? await ProfileAnalysis.findById(profileAnalysisId) : { rawProfile: { text: 'Sample profile' } };
    const trends = trendIds && trendIds.length ? await Trend.find({ _id: { $in: trendIds } }) : await Trend.find().limit(3);
    const drafts = await aiClient.generatePosts(profile, trends, { tone: toneOverride });
    // save drafts
    const saved = [];
    for (const d of drafts) {
      const doc = new Draft({ user: userId || null, title: d.title, body: d.body, hashtags: d.hashtags, aiMetadata: d.aiMetadata || {}, imageUrl: d.imageUrl || '' });
      await doc.save();
      saved.push(doc);
    }
    res.json({ drafts: saved });
  } catch (err) {
    console.error('generatePosts error', err);
    res.status(500).json({ error: 'generate failed' });
  }
};

exports.saveDraft = async (req, res) => {
  const { draft } = req.body;
  const doc = new Draft(draft);
  await doc.save();
  res.json(doc);
};
