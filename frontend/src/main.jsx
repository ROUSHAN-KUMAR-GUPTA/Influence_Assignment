import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import Generate from './pages/Generate'
import CalendarPage from './pages/CalendarPage'
import Analytics from './pages/Analytics'
import './index.css'
function App(){ return (
  <BrowserRouter>
    <div className="p-6">
      <nav className="mb-6">
        <Link className="mr-4" to="/">Home</Link>
        <Link className="mr-4" to="/analyze">Analyze</Link>
        <Link className="mr-4" to="/generate">Generate</Link>
        <Link className="mr-4" to="/calendar">Calendar</Link>
        <Link className="mr-4" to="/analytics">Analytics</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/analyze" element={<Analyze/>} />
        <Route path="/generate" element={<Generate/>} />
        <Route path="/calendar" element={<CalendarPage/>} />
        <Route path="/analytics" element={<Analytics/>} />
      </Routes>
    </div>
  </BrowserRouter>
)}
createRoot(document.getElementById('root')).render(<App />)
