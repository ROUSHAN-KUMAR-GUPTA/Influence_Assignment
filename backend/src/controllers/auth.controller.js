const axios = require('axios');
const User = require('../models/User');
exports.redirectToLinkedIn = (req, res) => {
  const base = 'https://www.linkedin.com/oauth/v2/authorization';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.LINKEDIN_CLIENT_ID,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
    scope: 'r_liteprofile r_emailaddress w_member_social',
    state: 'SOME_RANDOM_STATE'
  });
  res.redirect(`${base}?${params.toString()}`);
};
exports.callback = async (req, res) => {
  try {
    const code = req.query.code;
    if (!code) return res.status(400).send('No code');
    const tokenRes = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET
    }).toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    const { access_token, expires_in } = tokenRes.data;
    const meRes = await axios.get('https://api.linkedin.com/v2/me', { headers: { Authorization: `Bearer ${access_token}` } });
    const linkedinId = meRes.data.id;
    let user = await User.findOne({ 'linkedin.id': linkedinId });
    if (!user) {
      user = new User({ name: `${meRes.data.localizedFirstName || ''} ${meRes.data.localizedLastName || ''}`, linkedin: { id: linkedinId } });
    }
    user.linkedin.accessToken = access_token;
    user.linkedin.expiresAt = new Date(Date.now() + (expires_in * 1000));
    await user.save();
    return res.redirect(`${process.env.FRONTEND_URL}/?auth=success`);
  } catch (err) {
    console.error('LinkedIn auth callback error:', err.message);
    return res.status(500).send('Auth error');
  }
};
