import React from 'react'
export default function Home(){
  const openLinkedInAuth = ()=> window.location.href='http://localhost:4000/auth/linkedin';
  return (<div className="container"><h1>LinkedIn AI Agent — Demo</h1><p>Dry-run mode enabled.</p><button onClick={openLinkedInAuth}>Login with LinkedIn</button></div>)
}
