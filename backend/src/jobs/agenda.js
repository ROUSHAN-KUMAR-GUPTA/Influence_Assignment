const Agenda = require('agenda');
const ScheduledJob = require('../models/ScheduledJob');
const Draft = require('../models/Draft');
const User = require('../models/User');
const linkedinClient = require('../libs/linkedin.client');
const agenda = new Agenda({ db: { address: process.env.MONGO_URI, collection: 'agendaJobs' } });
agenda.define('postToLinkedIn', async job => {
  const { scheduledJobId } = job.attrs.data;
  try {
    const sj = await ScheduledJob.findById(scheduledJobId).populate('draft user');
    if (!sj) throw new Error('ScheduledJob not found');
    const draft = await Draft.findById(sj.draft);
    const user = await User.findById(sj.user);
    const dry = process.env.DRY_RUN === 'true';
    if (dry) {
      sj.status = 'posted';
      sj.linkedinPostId = 'dry-post-' + Date.now();
      await sj.save();
      return;
    }
    const res = await linkedinClient.postDraft(user.linkedin.accessToken, user.linkedin.id, draft);
    sj.status = 'posted';
    sj.linkedinPostId = res && res.id ? res.id : JSON.stringify(res);
    await sj.save();
  } catch (err) {
    console.error('Agenda job error', err);
    if (scheduledJobId) {
      const sj = await ScheduledJob.findById(scheduledJobId);
      if (sj) {
        sj.attempts += 1;
        if (sj.attempts > 3) sj.status = 'failed';
        await sj.save();
      }
    }
    throw err;
  }
});
(async function(){ await agenda.start(); console.log('Agenda started'); })();
module.exports = { agenda };
