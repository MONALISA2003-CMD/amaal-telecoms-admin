'use client';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
type CartItem={id:string;name:string;price:string;qty:number};
export default function AddToBag({id,name,price}:{id:string;name:string;price:string}){const [added,setAdded]=useState(false);function add(){try{const key='amaal_cart_v1';const items:CartItem[]=JSON.parse(localStorage.getItem(key)||'[]');const existing=items.find(x=>x.id===id);if(existing)existing.qty+=1;else items.push({id,name,price,qty:1});localStorage.setItem(key,JSON.stringify(items));window.dispatchEvent(new Event('amaal-cart-updated'));setAdded(true);setTimeout(()=>setAdded(false),1400)}catch{}}return <button className="add-button" onClick={add}><ShoppingBag size={15}/>{added?'Added':'Add to bag'}</button>}
