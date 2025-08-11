const aiClient = require('../libs/ai.client');
const ProfileAnalysis = require('../models/ProfileAnalysis');
const Trend = require('../models/Trend');
const axios = require('axios');

exports.analyze = async (req, res) => {
  try {
    const { profileText, userId } = req.body;
    if (!profileText) return res.status(400).json({ error: 'profileText required' });
    const analysis = await aiClient.analyzeProfile(profileText);
    const db = new ProfileAnalysis({ user: userId, rawProfile: { text: profileText }, ...analysis });
    await db.save();
    res.json(db);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'analysis failed' });
  }
};

exports.fetchTrends = async (req, res) => {
  try {
    const { industry, keywords } = req.body;
    const q = keywords && keywords.length ? keywords.join(' OR ') : industry || 'technology';
    const newsKey = process.env.NEWSAPI_KEY;
    const newsUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&pageSize=6&apiKey=${newsKey}`;
    const newsRes = await axios.get(newsUrl);
    const articles = newsRes.data.articles || [];
    // summarize with AI
    const summaries = articles.map(a => ({ title: a.title, url: a.url, description: a.description || '' }));
    const trends = await aiClient.summarizeTrends(summaries, industry);
    // save to DB
    const docs = await Trend.insertMany(trends.map(t => ({ title: t.title, summary: t.summary, sourceUrl: t.sourceUrl || '' })));
    res.json({ trends: docs });
  } catch (err) {
    console.error('fetchTrends err', err.message);
    // fallback sample
    const sample = [{ title: 'Sample Trend A', summary: 'Short summary', sourceUrl: '' }];
    const docs = await Trend.insertMany(sample);
    res.json({ trends: docs });
  }
};

exports.getAnalytics = async (req, res) => {
  // In dry-run mode we simulate analytics for demo purposes
  const dry = process.env.DRY_RUN === 'true';
  if (dry) {
    const sample = [
      { postId: 'dry-1', title: 'How I built X', likes: 34, comments: 6, shares: 2, impressions: 1200, createdAt: new Date() },
      { postId: 'dry-2', title: 'Career advice', likes: 58, comments: 12, shares: 3, impressions: 2100, createdAt: new Date(Date.now()-86400000) }
    ];
    return res.json({ posts: sample });
  }
  // TODO: implement real LinkedIn metrics fetching if DRY_RUN=false
  res.json({ posts: [] });
};
