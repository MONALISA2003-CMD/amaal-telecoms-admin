'use client';
import {useEffect} from 'react';
export default function SearchEvent({query,resultCount}:{query:string;resultCount:number}){useEffect(()=>{if(query.trim().length<2)return;const base=process.env.NEXT_PUBLIC_API_BASE_URL||process.env.AMAAL_API_BASE_URL||'';fetch(`${base}/api/public/search/event`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query,resultCount})}).catch(()=>{})},[query,resultCount]);return null}
