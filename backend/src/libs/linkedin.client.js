const axios = require('axios');
async function postDraft(accessToken, linkedinId, draft, mediaUrn) {
  const author = `urn:li:person:${linkedinId}`;
  const url = 'https://api.linkedin.com/v2/ugcPosts';
  const body = {
    author,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: { text: draft.body },
        shareMediaCategory: mediaUrn ? 'IMAGE' : 'NONE',
        media: mediaUrn ? [{ status: 'READY', description: { text: '' }, media: mediaUrn, title: { text: draft.title || '' } }] : []
      }
    },
    visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'CONNECTIONS' }
  };
  const res = await axios.post(url, body, { headers: { Authorization: `Bearer ${accessToken}`, 'X-Restli-Protocol-Version': '2.0.0', 'Content-Type': 'application/json' } });
  return res.data;
}
module.exports = { postDraft };
