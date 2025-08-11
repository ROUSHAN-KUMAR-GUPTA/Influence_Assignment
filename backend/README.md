# Backend - LinkedIn AI Agent

This backend contains OpenAI integration, NewsAPI, Agenda scheduler and dry-run LinkedIn post simulation.

Run:

```
cd backend
npm install
npm run dev
```

API endpoints:
- GET /auth/linkedin -> redirect to LinkedIn OAuth
- GET /auth/linkedin/callback -> OAuth callback
- POST /api/profile/analyze
- POST /api/research/trends
- POST /api/generate
- POST /api/drafts
- POST /api/schedule
- POST /api/post/:draftId
- POST /api/media/upload
- GET /api/analytics/posts

.env is prefilled for demo (DRY_RUN=true)
