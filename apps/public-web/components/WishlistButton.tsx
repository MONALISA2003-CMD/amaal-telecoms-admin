'use client';
import {Heart} from 'lucide-react';import {useEffect,useState} from 'react';import {getWishlist,toggleWishlist} from '../lib/commerce';
export default function WishlistButton({id}:{id:string}){const [saved,setSaved]=useState(false);useEffect(()=>setSaved(getWishlist().includes(id)),[id]);return <button className={`wishlist-button${saved?' saved':''}`} aria-label={saved?'Remove from saved products':'Save product'} title={saved?'Saved':'Save for later'} onClick={()=>setSaved(toggleWishlist(id))}><Heart size={18} fill={saved?'currentColor':'none'}/></button>}
