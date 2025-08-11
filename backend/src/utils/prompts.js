module.exports = {
  profileAnalysis: (profileText) => `You are a LinkedIn personal-brand analyst. Given the profile text below, return JSON with keys: targetAudience, keyStrengths (array), tone, postingFrequency. Profile:\n\n${profileText}`,
  generatePosts: (profile, trends) => `You are a LinkedIn content writer. Create 3 post drafts for this profile: ${JSON.stringify(profile)}. Use trends: ${JSON.stringify(trends)}. Return JSON array of objects: {title, body, hashtags}`
};
