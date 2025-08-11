const Draft = require('../models/Draft');
const User = require('../models/User');
const linkedinClient = require('../libs/linkedin.client');

exports.postNow = async (req, res) => {
  try {
    const { draftId } = req.params;
    const draft = await Draft.findById(draftId);
    if (!draft) return res.status(404).json({ error: 'draft not found' });
    // in this scaffold we allow anonymous drafts (user null) - simulate user for demo
    const user = await User.findOne() || { linkedin: { accessToken: null, id: 'demo' } };
    const dry = process.env.DRY_RUN === 'true';
    if (dry) {
      // simulate response
      return res.json({ ok: true, postId: 'dry-post-' + Date.now(), simulated: true });
    }
    if (!user || !user.linkedin || !user.linkedin.accessToken) return res.status(400).json({ error: 'user linkedin token missing' });
    const result = await linkedinClient.postDraft(user.linkedin.accessToken, user.linkedin.id, draft);
    return res.json({ result });
  } catch (err) {
    console.error('postNow err', err);
    return res.status(500).json({ error: 'post failed' });
  }
};
