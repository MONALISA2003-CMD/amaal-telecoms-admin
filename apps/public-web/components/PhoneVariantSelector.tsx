'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import type { PhoneProduct, PhoneVariant } from '../lib/phone-catalogue';
export default function PhoneVariantSelector({ product }: { product: PhoneProduct }) {
  const [selected, setSelected] = useState(0); const v=product.variants[selected];
  return <div className="phone-variant-panel"><div className="variant-heading"><div><p className="eyebrow">OPTIONS</p><strong>Choose your option</strong></div><span>{product.variants.length} options</span></div><div className="variant-options" role="radiogroup" aria-label={`${product.name} variants`}>{product.variants.map((x,i)=><button type="button" role="radio" aria-checked={selected===i} className={`variant-option ${selected===i?'selected':''}`} key={x.label} onClick={()=>setSelected(i)}><span>{x.label}</span>{selected===i&&<Check size={15}/>}</button>)}</div><div className="selected-variant"><span>Your choice</span><strong>{v.label}</strong></div><p className="variant-note">These are choices for the same phone model.</p></div>
}
