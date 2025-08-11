const axios = require('axios');
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
async function _chat(messages, model = 'gpt-4', max_tokens = 800) {
  const res = await axios.post(OPENAI_URL, { model, messages, max_tokens }, { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } });
  return res.data;
}
async function analyzeProfile(profileText) {
  const system = { role: 'system', content: 'You are a LinkedIn personal branding analyst.' };
  const user = { role: 'user', content: `Analyze this profile and return JSON: {"targetAudience":"","keyStrengths":[],"tone":"","postingFrequency":""}. Profile: ${profileText}` };
  const r = await _chat([system, user]);
  const content = r.choices[0].message.content.trim();
  try { return JSON.parse(content); } catch (e) { const match = content.match(/\{[\s\S]*\}/); if (match) return JSON.parse(match[0]); throw new Error('AI returned non-json'); }
}
async function summarizeTrends(articles, industry) {
  const system = { role: 'system', content: 'You are a market research assistant for LinkedIn content.' };
  const user = { role: 'user', content: `Given these articles: ${JSON.stringify(articles)}, summarize top 4 trends for industry: ${industry}. Return JSON array of {title, summary, sourceUrl}.` };
  const r = await _chat([system, user], 'gpt-4');
  const content = r.choices[0].message.content.trim();
  try { return JSON.parse(content); } catch (e) { const match = content.match(/\[[\s\S]*\]/); if (match) return JSON.parse(match[0]); return articles.slice(0,4).map(a=>({ title: a.title, summary: a.description || '', sourceUrl: a.url || '' })); }
}
async function generatePosts(profile, trends, opts = {}) {
  const system = { role: 'system', content: 'You are a LinkedIn post writer. Return strict JSON array.' };
  const user = { role: 'user', content: `Generate 3 post drafts for the profile: ${JSON.stringify(profile)} using trends: ${JSON.stringify(trends)}. Each post: {title, body, hashtags}.` };
  const r = await _chat([system, user], opts.model || 'gpt-4');
  const content = r.choices[0].message.content.trim();
  try { const parsed = JSON.parse(content); return parsed.map(p=>({ ...p, aiMetadata: { model: r.model || 'gpt-4' } })); } catch (e) { const match = content.match(/\[[\s\S]*\]/); if (match) return JSON.parse(match[0]); return [{ title: 'Sample', body: 'Sample body', hashtags: ['#sample'] }]; }
}
module.exports = { analyzeProfile, summarizeTrends, generatePosts };
