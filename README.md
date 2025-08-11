# LinkedIn Personal Branding AI Agent

This is the full project scaffold for the Influence OS AI Intern assignment. It includes:
- Backend (Express, MongoDB, Agenda scheduler)
- Frontend (React + Vite)
- NewsAPI integration + AI summarization (OpenAI)
- LinkedIn media upload flow (dry-run)
- Analytics dashboard (demo/simulated in dry-run)
- Calendar scheduling UI

## Run locally
1. Make sure MongoDB is running locally on default port.
2. Install backend deps and start server:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. Install frontend deps and start dev server:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Open http://localhost:5173

DRY_RUN=true is set in backend/.env so LinkedIn calls are simulated.
See backend/README.md for backend API endpoints.
