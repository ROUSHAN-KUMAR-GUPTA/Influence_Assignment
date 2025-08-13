##Influence Assignment – AI LinkedIn Personal Branding Agent
#📌 Overview
This project is an AI-powered LinkedIn content creation and scheduling tool built as part of the Influence OS – AI Intern Project.
It allows users to research topics, generate engaging LinkedIn posts using AI, preview & edit them, and schedule posts for automatic publishing.

🎯 Features
🔹 AI Content Generation – Generates professional LinkedIn posts from user-provided topics using OpenAI API.

🔹 Post Preview & Editing – Edit AI-generated content before publishing.

🔹 Post Scheduling – Set a future date & time to auto-publish posts using Agenda Scheduler.

🔹 Dashboard – View, edit, or delete scheduled posts.

🔹 Secure Authentication – User login & signup system.

🔹 Cloud Database – Stores users & scheduled posts in MongoDB Atlas.

🛠 Tech Stack
Frontend
React.js

Vite

Tailwind CSS

Backend
Node.js

Express.js

MongoDB Atlas

Agenda Scheduler

AI Integration
OpenAI API

Deployment
Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

📂 Project Structure

Influence_Assignment/
│── backend/          # Express.js backend
│── frontend/         # React frontend
│── README.md         # Project documentation


⚙️ Environment Variables
Create a .env file in the backend folder and add:

PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
OPENAI_API_KEY=your_openai_api_key

📦 Installation & Setup
1. Clone the repository

git clone https://github.com/<your-username>/Influence_Assignment.git
cd Influence_Assignment
2. Setup Backend

cd backend
npm install
npm start
3. Setup Frontend

cd frontend
npm install
npm run dev

