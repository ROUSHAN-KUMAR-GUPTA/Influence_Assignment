import React, { useState } from 'react'
import axios from 'axios'
export default function Generate(){
  const [profileId,setProfileId]=useState('')
  const [drafts,setDrafts]=useState([])
  const [image,setImage]=useState(null)
  const uploadImage=async()=>{
    if(!image) return null;
    const fd=new FormData(); fd.append('image', image);
    const r=await axios.post('http://localhost:4000/api/media/upload', fd, { headers: {'Content-Type':'multipart/form-data'} });
    return r.data;
  }
  const handleGen=async()=>{
    const r=await axios.post('http://localhost:4000/api/generate',{ profileAnalysisId: profileId });
    setDrafts(r.data.drafts || []);
  }
  const postNow=async(id)=>{ await axios.post(`http://localhost:4000/api/post/${id}`); alert('Posted (simulated)') }
  return (<div className="container"><h2>Generate Posts</h2>
    <input placeholder="profileAnalysisId" value={profileId} onChange={e=>setProfileId(e.target.value)}/>
    <div><input type=file onChange={e=>setImage(e.target.files[0])}/></div>
    <div><button onClick={handleGen}>Generate</button></div>
    <div>{drafts.map(d=>(<div key={d._id} style={{border:'1px solid #ddd',padding:8,margin:8}}>
      <h3>{d.title}</h3><p>{d.body}</p><div><button onClick={()=>postNow(d._id)}>Post Now</button></div></div>))}</div>
  </div>)
}
