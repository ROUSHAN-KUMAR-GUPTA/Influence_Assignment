const ScheduledJob = require('../models/ScheduledJob');
const Draft = require('../models/Draft');
const { agenda } = require('../jobs/agenda');

exports.schedulePost = async (req, res) => {
  try {
    const { draftId, postAt, userId } = req.body;
    if (!draftId || !postAt) return res.status(400).json({ error: 'draftId, postAt required' });
    const sj = new ScheduledJob({ user: userId, draft: draftId, postAt: new Date(postAt) });
    await sj.save();
    await agenda.schedule(new Date(postAt), 'postToLinkedIn', { scheduledJobId: sj._id.toString() });
    res.json({ scheduledJob: sj });
  } catch (err) {
    console.error('schedulePost err', err);
    res.status(500).json({ error: 'scheduling failed' });
  }
};
