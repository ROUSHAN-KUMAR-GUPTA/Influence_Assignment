import React, { useState } from 'react'
import axios from 'axios'
export default function Analyze(){
  const [text,setText]=useState('Experienced software engineer...')
  const [result,setResult]=useState(null)
  const handle=async()=>{ const r=await axios.post('http://localhost:4000/api/profile/analyze',{ profileText: text }); setResult(r.data) }
  return (<div className="container"><h2>Profile Analysis</h2><textarea rows=6 value={text} onChange={e=>setText(e.target.value)} style={{width:'100%'}}/>
  <div><button onClick={handle}>Analyze</button></div>
  {result && <pre>{JSON.stringify(result,null,2)}</pre>}</div>)
}
