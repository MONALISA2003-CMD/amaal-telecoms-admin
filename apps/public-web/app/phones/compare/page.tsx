import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import PhoneCompareTray from '../../../components/PhoneCompareTray';
import { phoneCatalogue, type PhoneProduct } from '../../../lib/phone-catalogue';

function values(product: PhoneProduct, key: 'storage' | 'ram') {
  return [...new Set(product.variants.map((v) => v[key]).filter(Boolean) as string[])].join(', ') || '—';
}

export default async function PhoneComparePage({ searchParams }: { searchParams: Promise<{ phones?: string }> }) {
  const params = await searchParams;
  const slugs = (params.phones || '').split(',').filter(Boolean).slice(0, 3);
  const products = slugs.map((slug) => phoneCatalogue.find((p) => p.slug === slug)).filter(Boolean) as PhoneProduct[];
  const rows: Array<[string, (p: PhoneProduct) => string]> = [
    ['Brand', (p) => p.brand], ['Series', (p) => p.series], ['Connectivity', (p) => p.network || '—'],
    ['Storage', (p) => values(p, 'storage')], ['Memory', (p) => values(p, 'ram')], ['Choices', (p) => `${p.variants.length} available`],
  ];
  return <main><SiteHeader/><section className="section phone-compare-page"><Link className="phone-back-link" href="/phones"><ArrowLeft size={15}/> Back to phones</Link><div className="section-head-v2"><div><p className="eyebrow">PHONE COMPARISON</p><h1>Choose with confidence.</h1></div><p>Compare up to three phones side by side.</p></div>{products.length < 2 ? <div className="phone-empty-v2"><p className="eyebrow">ADD MORE PHONES</p><h2>Select at least two phones to compare.</h2><p>Use Compare on any phone card, then return here.</p><Link className="button gold" href="/phones">Browse phones</Link></div> : <div className="phone-compare-table-wrap"><table className="phone-compare-table"><thead><tr><th>Details</th>{products.map((p) => <th key={p.slug}><strong>{p.name}</strong><small>{p.brand}</small></th>)}</tr></thead><tbody>{rows.map(([label, get]) => <tr key={label}><th>{label}</th>{products.map((p) => <td key={p.slug}>{get(p)}</td>)}</tr>)}</tbody></table></div>}<div className="phone-compare-note"><Check size={16}/> Final stock, colour, warranty and delivery can be confirmed directly with Amaal.</div></section><PhoneCompareTray/><SiteFooter/></main>;
}
