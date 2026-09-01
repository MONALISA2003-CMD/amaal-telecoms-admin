'use client';

import Link from 'next/link';
import { X, GitCompareArrows } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { PhoneProduct } from '../lib/phone-catalogue';
import { phoneCatalogue } from '../lib/phone-catalogue';

const KEY = 'amaal-phone-compare';
const EVENT = 'amaal-phone-compare-change';

function readSlugs(): string[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(window.localStorage.getItem(KEY) || '[]'); } catch { return []; }
}

export function togglePhoneCompare(slug: string) {
  const current = readSlugs();
  const next = current.includes(slug) ? current.filter((x) => x !== slug) : current.length < 3 ? [...current, slug] : current;
  window.localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT));
  return next.length;
}

export function isPhoneCompared(slug: string) { return readSlugs().includes(slug); }

export default function PhoneCompareTray() {
  const [slugs, setSlugs] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setSlugs(readSlugs());
    sync(); window.addEventListener(EVENT, sync); return () => window.removeEventListener(EVENT, sync);
  }, []);
  const products = slugs.map((slug) => phoneCatalogue.find((p) => p.slug === slug)).filter(Boolean) as PhoneProduct[];
  if (!products.length) return null;
  return <aside className="phone-compare-tray" aria-label="Phone comparison tray">
    <div className="phone-compare-tray-copy"><GitCompareArrows size={18}/><div><strong>Compare phones</strong><span>{products.length}/3 selected</span></div></div>
    <div className="phone-compare-items">{products.map((p) => <div key={p.slug} className="phone-compare-item"><span>{p.name}</span><button type="button" onClick={() => togglePhoneCompare(p.slug)} aria-label={`Remove ${p.name} from comparison`}><X size={13}/></button></div>)}</div>
    <Link className="button gold phone-compare-link" href={`/phones/compare?phones=${encodeURIComponent(products.map((p) => p.slug).join(','))}`}>Compare</Link>
  </aside>;
}
