'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export type PosLocation = { id: string; name: string; code?: string };
export type PosProduct = { variant_id: string; sku: string; variant_name?: string; product_name: string; selling_price: number | string; tax_rate: number | string; serialized?: boolean; available: number | string };
type CartLine = PosProduct & { quantity: number };

function money(value: unknown) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '—';
  return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(n);
}

export function POSWorkspace({ locations }: { locations: PosLocation[] }) {
  const [locationId, setLocationId] = useState(locations[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<PosProduct[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const total = useMemo(() => cart.reduce((sum, line) => sum + Number(line.selling_price) * line.quantity, 0), [cart]);

  async function search() {
    if (!locationId) { setMessage('Select a selling location first.'); return; }
    setMessage('');
    const response = await fetch(`/api/sales/products?locationId=${encodeURIComponent(locationId)}&q=${encodeURIComponent(query)}&limit=20`, { cache: 'no-store' });
    const data = await response.json().catch(() => []);
    if (!response.ok) { setMessage(data.error || 'Products could not be loaded.'); return; }
    setProducts(Array.isArray(data) ? data : []);
  }

  function add(product: PosProduct) {
    if (product.serialized) { setMessage('Serialized products require serial/IMEI selection. Use the technical/advanced sales workflow for this item.'); return; }
    setCart((current) => {
      const existing = current.find((line) => line.variant_id === product.variant_id);
      if (existing) return current.map((line) => line.variant_id === product.variant_id ? { ...line, quantity: Math.min(line.quantity + 1, Number(product.available) || 1) } : line);
      return [...current, { ...product, quantity: 1 }];
    });
  }

  async function completeSale() {
    if (!locationId || !cart.length || total <= 0) return;
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': crypto.randomUUID() },
        body: JSON.stringify({ locationId, lines: cart.map((line) => ({ variantId: line.variant_id, quantity: line.quantity })), payments: [{ method: paymentMethod, amount: total }], allowPartial: false }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Sale could not be completed.');
      setMessage(`Sale ${data.sale_no || ''} completed successfully.`);
      setCart([]); setProducts([]); setQuery('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Sale could not be completed.');
    } finally { setBusy(false); }
  }

  return <div className="posWorkspace">
    <div className="detailBack"><Link href="/sales">← Back to Sales</Link></div>
    <section className="workspaceHero"><div><span className="eyebrow">Point of sale</span><h2>New sale</h2><p>Use the existing sales records to price, validate stock and record the transaction. Your business records remain in the existing system.</p></div></section>
    {message && <div className="inlineMessage" role="status">{message}</div>}
    <div className="posGrid">
      <section className="panel"><div className="panelHeading"><div><h3>Product search</h3><p>Availability and pricing come from the business records.</p></div></div><div className="posControls"><select value={locationId} onChange={(event) => setLocationId(event.target.value)} aria-label="Selling location"><option value="">Select location</option>{locations.map((location) => <option key={location.id} value={location.id}>{location.name}{location.code ? ` · ${location.code}` : ''}</option>)}</select><div className="posSearch"><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') search(); }} placeholder="Search product, Product code or barcode" /><button onClick={search}>Search</button></div></div><div className="productGrid">{products.map((product) => <button className="productTile" key={product.variant_id} onClick={() => add(product)}><strong>{product.product_name}</strong><span>{product.variant_name || product.sku}</span><b>{money(product.selling_price)}</b><small>{Number(product.available).toLocaleString('en-UG')} available{product.serialized ? ' · Serial required' : ''}</small></button>)}{!products.length && <div className="emptyState">Search for a product to begin.</div>}</div></section>
      <section className="panel cartPanel"><div className="panelHeading"><div><h3>Current sale</h3><p>{cart.length} line{cart.length === 1 ? '' : 's'}</p></div></div><div className="cartList">{cart.length ? cart.map((line) => <div className="cartItem" key={line.variant_id}><div><strong>{line.product_name}</strong><span>{line.sku}</span></div><div className="cartQty"><button onClick={() => setCart((items) => items.flatMap((item) => item.variant_id === line.variant_id ? (item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []) : [item]))}>−</button><span>{line.quantity}</span><button onClick={() => add(line)}>+</button></div><strong>{money(Number(line.selling_price) * line.quantity)}</strong></div>) : <div className="emptyState">Your sale is empty.</div>}</div><div className="cartFooter"><div><span>Total</span><strong>{money(total)}</strong></div><select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}><option>Cash</option><option>Mobile Money</option><option>Card</option><option>Bank Transfer</option><option>Online Payment</option></select><button className="goldAction fullButton" disabled={busy || !cart.length || !locationId} onClick={completeSale}>{busy ? 'Completing…' : 'Complete sale'}</button></div></section>
    </div>
  </div>;
}
