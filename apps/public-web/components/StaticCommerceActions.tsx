'use client';
import Link from 'next/link';import WishlistButton from './WishlistButton';
export default function StaticCommerceActions({id}:{id:string}){return <div className="static-actions"><WishlistButton id={id}/><Link className="button outline" href="/contact">Ask about this product</Link></div>}
