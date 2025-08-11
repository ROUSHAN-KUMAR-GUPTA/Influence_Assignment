import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
export default function Analytics(){
  const [posts,setPosts]=useState([])
  useEffect(()=>{ axios.get('http://localhost:4000/api/analytics/posts').then(r=>setPosts(r.data.posts || [])) },[])
  const labels = posts.map(p=>p.title)
  const data = { labels, datasets: [{ label:'Likes', data: posts.map(p=>p.likes || 0) }, { label:'Impressions', data: posts.map(p=>p.impressions || 0) }] }
  return (<div className="container"><h2>Analytics</h2><Bar data={data} />
    <h3>Posts table</h3>
    <table border=1 cellPadding=6><thead><tr><th>Title</th><th>Likes</th><th>Comments</th><th>Shares</th><th>Impr</th></tr></thead>
    <tbody>{posts.map(p=>(<tr key={p.postId}><td>{p.title}</td><td>{p.likes}</td><td>{p.comments}</td><td>{p.shares}</td><td>{p.impressions}</td></tr>))}</tbody></table>
  </div>)
}
