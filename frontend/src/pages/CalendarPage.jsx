import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function CalendarPage(){
  const [drafts,setDrafts]=useState([])
  const [draftId,setDraftId]=useState('')
  const [postAt,setPostAt]=useState('')
  useEffect(()=>{ axios.get('http://localhost:4000/api/drafts').then(r=>setDrafts(r.data)).catch(()=>{}) },[])
  const schedule=async()=>{ await axios.post('http://localhost:4000/api/schedule',{ draftId, postAt }); alert('Scheduled (simulated)') }
  return (<div className="container"><h2>Calendar (Simple)</h2>
    <div><label>DraftId: <input value={draftId} onChange={e=>setDraftId(e.target.value)}/></label></div>
    <div><label>Post at: <input type=datetime-local value={postAt} onChange={e=>setPostAt(e.target.value)}/></label></div>
    <div><button onClick={schedule}>Schedule</button></div>
    <h3>Drafts</h3>
    <ul>{drafts.map(d=>(<li key={d._id}>{d.title} — {d._id}</li>))}</ul>
  </div>)
}
