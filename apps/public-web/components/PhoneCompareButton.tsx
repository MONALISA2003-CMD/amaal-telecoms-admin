'use client';

import { GitCompareArrows } from 'lucide-react';
import { useEffect, useState } from 'react';
import { togglePhoneCompare, isPhoneCompared } from './PhoneCompareTray';

export default function PhoneCompareButton({ slug, name }: { slug: string; name: string }) {
  const [selected, setSelected] = useState(false);
  useEffect(() => setSelected(isPhoneCompared(slug)), [slug]);
  const toggle = () => { togglePhoneCompare(slug); setSelected(isPhoneCompared(slug)); };
  return <button type="button" className={`phone-card-compare ${selected ? 'selected' : ''}`} onClick={toggle} aria-label={`${selected ? 'Remove' : 'Add'} ${name} ${selected ? 'from' : 'to'} comparison`}><GitCompareArrows size={14}/> <span>{selected ? 'Added' : 'Compare'}</span></button>;
}
