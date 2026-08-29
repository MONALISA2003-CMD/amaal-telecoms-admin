'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ArrowRight, Banknote, CheckCircle2, ChevronRight, CircleDollarSign, Clock3,
  Download, PackageCheck, Plus, RefreshCw, Search, ShoppingCart, Truck, X,
  AlertTriangle, UserRound, CreditCard, RotateCcw, ReceiptText
} from 'lucide-react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis, Cell
} from 'recharts';

type Any = Record<string, any>;

async function api(path: string, init: RequestInit = {}) {
  const response = await fetch(path, { ...init, headers: { 'Content-Type': 'application/json', ...(init.headers || {}) } });
  const text = await response.text();
  let payload: any = null;
  try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }
  if (!response.ok) throw new Error(payload?.error || 'The order action could not be completed.');
  return payload;
}

const gold = '#c7a24a';
const navy = '#24324a';
const muted = '#8b93a0';
const statusOrder = ['Pending Payment', 'Paid', 'Processing', 'Packed', 'Ready for Dispatch', 'Dispatched', 'Delivered'];
const palette = ['#c7a24a', '#24324a', '#718096', '#b47f2f', '#9aa7b8', '#d8c58f'];

function money(v: any) { const n = Number(v); return Number.isFinite(n) ? new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(n) : '—'; }
function num(v: any) { const n = Number(v); return Number.isFinite(n) ? new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 }).format(n) : '—'; }
function date(v: any) { if (!v) return '—'; const d = new Date(v); return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString('en-UG', { dateStyle: 'medium', timeStyle: 'short' }); }
function shortDate(v: any) { if (!v) return ''; const d = new Date(v); return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-UG', { day: '2-digit', month: 'short' }); }

function Modal({ title, children, onClose, wide = false }: { title: string; children: React.ReactNode; onClose: () => void; wide?: boolean }) {
  return <div className="adminModalBackdrop"><div className={`adminModal ${wide ? 'wide' : ''}`}><header><div><span className="eyebrow">Order workspace</span><h3>{title}</h3></div><button className="iconButton" onClick={onClose} aria-label="Close"><X size={17} /></button></header>{children}</div></div>;
}
function Field({ label, value, onChange, type = 'text', placeholder = '' }: any) { return <label className="adminField"><span>{label}</span><input type={type} value={value ?? ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} /></label>; }
function Select({ label, value, onChange, options }: any) { return <label className="adminField"><span>{label}</span><select value={value ?? ''} onChange={e => onChange(e.target.value)}>{options.map((o: any) => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}</select></label>; }
function Empty({ title, text }: { title: string; text: string }) { return <div className="ordersEmpty"><ShoppingCart size={20} /><strong>{title}</strong><span>{text}</span></div>; }

export function OrdersWorkspace({ summary, analytics, orders, customers, locations, variants, permissions }: { summary: Any; analytics: Any; orders: Any[]; customers: Any[]; locations: Any[]; variants: Any[]; permissions: string[] }) {
  const [tab, setTab] = useState('overview');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [modal, setModal] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);
  const canCreate = permissions.includes('orders.create');
  const canManage = permissions.includes('orders.manage');
  const canExport = permissions.includes('orders.export');
  const canSales = permissions.includes('sales.create');
  const canReturns = permissions.includes('returns.manage');
  const filtered = useMemo(() => orders.filter(o => {
    const q = query.trim().toLowerCase();
    return (!q || `${o.order_no} ${o.customer_name || ''} ${o.customer_no || ''} ${o.location_name || ''}`.toLowerCase().includes(q)) && (!status || o.status === status);
  }), [orders, query, status, refresh]);
  const daily = (analytics?.daily || []).map((x: Any) => ({ label: shortDate(x.day), value: Number(x.value || 0), orders: Number(x.orders || 0) }));
  const payments = (analytics?.paymentMethods || []).filter((x: Any) => Number(x.value) > 0).map((x: Any) => ({ name: x.method, value: Number(x.value) }));
  const topProducts = (analytics?.topProducts || []).slice(0, 6).map((x: Any) => ({ name: String(x.product_name || x.sku || 'Product').slice(0, 18), value: Number(x.value || 0) }));
  const open = Number(summary?.pending || 0) + Number(summary?.paid || 0) + Number(summary?.processing || 0) + Number(summary?.dispatched || 0);

  return <div className="workspace ordersWorkspace" key={refresh}>
    <section className="welcome ordersHero">
      <div><span className="eyebrow">Commerce · Order management</span><h2>Orders & fulfilment</h2><p>Take an order from payment through preparation, dispatch and completion while keeping customers, stock and sales connected.</p></div>
      <div className="workspaceActions">{canExport && <a href="/api/orders/export" className="ordersExport"><Download size={14} /> Export orders</a>}<button onClick={() => setRefresh(x => x + 1)}><RefreshCw size={14} /> Refresh</button>{canCreate && <button className="primaryAction" onClick={() => setModal('create')}><Plus size={14} /> New order</button>}</div>
    </section>

    <section className="ordersKpis">
      <article><span className="ordersKpiIcon"><ShoppingCart size={18} /></span><div><small>Total orders</small><strong>{num(summary?.total)}</strong><span>All recorded orders</span></div></article>
      <article><span className="ordersKpiIcon"><Clock3 size={18} /></span><div><small>Open orders</small><strong>{num(open)}</strong><span>Payment through dispatch</span></div></article>
      <article><span className="ordersKpiIcon"><CircleDollarSign size={18} /></span><div><small>This month's order value</small><strong>{money(summary?.monthRevenue)}</strong><span>Excluding cancelled/refunded</span></div></article>
      <article className="attention"><span className="ordersKpiIcon"><AlertTriangle size={18} /></span><div><small>Part-paid orders</small><strong>{num(summary?.partialPaid)}</strong><span>Payment still outstanding</span></div></article>
    </section>

    <section className="ordersCommand"><div className="ordersTabs">{[['overview','Overview'],['orders','Order book'],['payments','Payments'],['fulfilment','Fulfilment'],['insights','Insights']].map(([id, label]) => <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>{label}</button>)}</div><div className="ordersQuick"><Link href="/customers"><UserRound size={14} /> Customers</Link><Link href="/stock"><PackageCheck size={14} /> Stock</Link><Link href="/sales"><ReceiptText size={14} /> Sales</Link></div></section>

    {tab === 'overview' && <>
      <section className="ordersGridTop">
        <div className="panel ordersChartPanel"><div className="panelHeading"><div><h3>Order value trend</h3><p>Daily order value for the selected business period.</p></div></div><div className="ordersChart">{daily.length ? <ResponsiveContainer width="100%" height="100%"><AreaChart data={daily} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}><defs><linearGradient id="ordersFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={gold} stopOpacity={0.25} /><stop offset="100%" stopColor={gold} stopOpacity={0.02} /></linearGradient></defs><CartesianGrid stroke="#e9e5dc" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="label" tick={{ fontSize: 9, fill: muted }} tickLine={false} axisLine={false} /><YAxis tick={{ fontSize: 9, fill: muted }} tickLine={false} axisLine={false} tickFormatter={v => `${Math.round(Number(v) / 1000)}k`} /><Tooltip formatter={(v: any) => money(v)} /><Area type="monotone" dataKey="value" stroke={gold} strokeWidth={2.5} fill="url(#ordersFill)" /></AreaChart></ResponsiveContainer> : <Empty title="No order activity yet" text="Order value will appear here as orders are recorded." />}</div></div>
        <div className="panel ordersPipeline"><div className="panelHeading"><div><h3>Order pipeline</h3><p>Where current orders are sitting.</p></div></div><div className="pipelineList">{[['Pending Payment',summary?.pending],['Paid',summary?.paid],['Preparing',summary?.processing],['Dispatched',summary?.dispatched],['Delivered',summary?.delivered]].map(([label,value],i)=><button key={String(label)} onClick={() => { setStatus(String(label) === 'Preparing' ? 'Processing' : String(label)); setTab('orders'); }}><span><i style={{ background: palette[i] }} />{label}</span><strong>{num(value)}</strong><ChevronRight size={15} /></button>)}</div></div>
      </section>
      <section className="ordersGridCharts">
        <div className="panel"><div className="panelHeading"><div><h3>Payment mix</h3><p>Completed order payments.</p></div></div><div className="ordersDonut">{payments.length ? <><div><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={payments} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="78%" paddingAngle={3}>{payments.map((_: Any, i: number) => <Cell key={i} fill={palette[i % palette.length]} />)}</Pie><Tooltip formatter={(v: any) => money(v)} /></PieChart></ResponsiveContainer></div><div className="ordersLegend">{payments.slice(0, 5).map((x: Any, i: number) => <div key={x.name}><span><i style={{ background: palette[i % palette.length] }} />{x.name}</span><strong>{money(x.value)}</strong></div>)}</div></> : <Empty title="No completed payments" text="Payment mix will appear after orders receive payments." />}</div></div>
        <div className="panel"><div className="panelHeading"><div><h3>Top ordered products</h3><p>Products contributing the most order value.</p></div></div><div className="ordersBars">{topProducts.length ? <ResponsiveContainer width="100%" height="100%"><BarChart data={topProducts} layout="vertical" margin={{ left: 5, right: 10, top: 2, bottom: 2 }}><CartesianGrid stroke="#ece8df" strokeDasharray="3 3" horizontal={false} /><XAxis type="number" hide /><YAxis type="category" dataKey="name" width={85} tick={{ fontSize: 9, fill: navy }} tickLine={false} axisLine={false} /><Tooltip formatter={(v: any) => money(v)} /><Bar dataKey="value" fill={gold} radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer> : <Empty title="No product ranking yet" text="Top products will appear as orders are placed." />}</div></div>
      </section>
      <section className="panel"><div className="panelHeading"><div><h3>Recent orders</h3><p>Latest customer orders requiring visibility.</p></div><button className="textAction" onClick={() => setTab('orders')}>Open order book</button></div><OrderTable rows={orders.slice(0, 8)} /></section>
    </>}

    {tab === 'orders' && <section className="panel"><div className="panelHeading"><div><h3>Order book</h3><p>Search, filter and open any order to see its complete journey.</p></div></div><div className="ordersFilters"><div className="ordersSearch"><Search size={15} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search order, customer or phone" /></div><select value={status} onChange={e => setStatus(e.target.value)}><option value="">All stages</option>{statusOrder.concat(['Cancelled','Refunded','Returned']).map(s => <option key={s} value={s}>{s}</option>)}</select><button onClick={() => { setQuery(''); setStatus(''); }}>Clear</button></div><OrderTable rows={filtered} /></section>}
    {tab === 'payments' && <section className="panel"><div className="panelHeading"><div><h3>Payment follow-up</h3><p>Orders where money has not yet fully settled.</p></div></div><OrderTable rows={orders.filter(o => ['Pending Payment', 'Paid'].includes(o.status) || o.payment_status === 'Partially Paid')} paymentFocus /></section>}
    {tab === 'fulfilment' && <section className="panel"><div className="panelHeading"><div><h3>Fulfilment queue</h3><p>Orders moving through preparation and dispatch.</p></div><Link className="textAction" href="/delivery">Open delivery</Link></div><OrderTable rows={orders.filter(o => ['Processing','Packed','Ready for Dispatch','Dispatched'].includes(o.status))} fulfilmentFocus /></section>}
    {tab === 'insights' && <section className="ordersInsightGrid"><div className="panel"><div className="panelHeading"><div><h3>Order stages</h3><p>Current distribution across the order journey.</p></div></div><div className="stageCards">{(analytics?.statuses || []).map((s: Any) => <div key={s.status}><span>{s.status}</span><strong>{num(s.count)}</strong></div>)}{!(analytics?.statuses || []).length && <Empty title="No stage data" text="Order stages will appear here when records exist." />}</div></div><div className="panel"><div className="panelHeading"><div><h3>Operational links</h3><p>Move directly to the team that handles the next step.</p></div></div><div className="ordersLinkStack"><Link href="/stock"><PackageCheck size={17} /><span><strong>Stock</strong><small>Check availability and reservations</small></span><ArrowRight size={15} /></Link><Link href="/delivery"><Truck size={17} /><span><strong>Delivery</strong><small>Track shipments and handovers</small></span><ArrowRight size={15} /></Link><Link href="/sales"><ReceiptText size={17} /><span><strong>Sales</strong><small>Convert completed paid orders</small></span><ArrowRight size={15} /></Link><Link href="/customers"><UserRound size={17} /><span><strong>Customers</strong><small>Review the customer relationship</small></span><ArrowRight size={15} /></Link></div></div></section>}

    {modal === 'create' && <CreateOrderModal customers={customers} locations={locations} variants={variants} onClose={() => setModal(null)} onDone={() => { setModal(null); setRefresh(x => x + 1); }} />}
  </div>;
}

function nextOrderStage(status: string) {
  if (status === 'Pending Payment') return null;
  const index = statusOrder.indexOf(status);
  if (index < 0 || index >= statusOrder.length - 1) return null;
  return statusOrder[index + 1];
}

function CancelModal({ onClose, onDone }: { onClose: () => void; onDone: (body: Any) => void }) {
  const [reason, setReason] = useState('');
  return <Modal title="Cancel order" onClose={onClose}><form onSubmit={e => { e.preventDefault(); onDone({ reason }); }}><Field label="Reason" value={reason} onChange={setReason} placeholder="Why is this order being cancelled?" /><div className="adminSubmit"><button type="button" onClick={onClose}>Keep order</button><button className="primaryAction">Cancel order</button></div></form></Modal>;
}

function PaymentModal({ order, due, onClose, onDone }: { order: Any; due: number; onClose: () => void; onDone: (body: Any) => void }) {
  const [amount, setAmount] = useState(String(due)); const [method, setMethod] = useState('Cash'); const [reference, setReference] = useState('');
  return <Modal title="Record payment" onClose={onClose}><form onSubmit={e => { e.preventDefault(); onDone({ amount: Number(amount), method, reference }); }}><Field label="Amount" type="number" value={amount} onChange={setAmount} /><Select label="Payment method" value={method} onChange={setMethod} options={['Cash','Mobile Money','Card','Bank Transfer','Online Payment'].map(x => ({ value: x, label: x }))} /><Field label="Reference" value={reference} onChange={setReference} placeholder="Optional reference" /><div className="adminSubmit"><button type="button" onClick={onClose}>Cancel</button><button className="primaryAction">Record payment</button></div></form></Modal>;
}

function FulfilmentModal({ onClose, onDone }: { onClose: () => void; onDone: (body: Any) => void }) {
  const [method, setMethod] = useState('Delivery'); const [carrier, setCarrier] = useState(''); const [trackingNumber, setTrackingNumber] = useState(''); const [notes, setNotes] = useState('');
  return <Modal title="Prepare fulfilment" onClose={onClose}><form onSubmit={e => { e.preventDefault(); onDone({ method, trackingNumber, carrier, status: 'Pending', notes }); }}><Select label="Method" value={method} onChange={setMethod} options={['Delivery','Collection','Courier'].map(x => ({ value: x, label: x }))} /><Field label="Carrier / partner" value={carrier} onChange={setCarrier} placeholder="Optional" /><Field label="Tracking number" value={trackingNumber} onChange={setTrackingNumber} placeholder="Optional" /><Field label="Notes" value={notes} onChange={setNotes} placeholder="Optional" /><div className="adminSubmit"><button type="button" onClick={onClose}>Cancel</button><button className="primaryAction">Create fulfilment</button></div></form></Modal>;
}

function RefundModal({ onClose, onDone }: { onClose: () => void; onDone: (body: Any) => void }) {
  const [refundMethod, setRefundMethod] = useState('Original Payment'); const [reason, setReason] = useState('');
  return <Modal title="Start refund" onClose={onClose}><form onSubmit={e => { e.preventDefault(); onDone({ refundMethod, reason }); }}><Select label="Refund method" value={refundMethod} onChange={setRefundMethod} options={['Original Payment','Cash','Mobile Money','Bank Transfer'].map(x => ({ value: x, label: x }))} /><Field label="Reason" value={reason} onChange={setReason} placeholder="Reason for the refund" /><div className="adminSubmit"><button type="button" onClick={onClose}>Cancel</button><button className="primaryAction">Start refund</button></div></form></Modal>;
}

function OrderTable({ rows, paymentFocus = false, fulfilmentFocus = false }: { rows: Any[]; paymentFocus?: boolean; fulfilmentFocus?: boolean }) {
  if (!rows.length) return <Empty title="No matching orders" text="There are no orders in this view right now." />;
  return <div className="tableWrap"><table className="ordersTable"><thead><tr><th>Order</th><th>Customer</th><th>Stage</th><th>Payment</th><th>{fulfilmentFocus ? 'Fulfilment' : 'Location'}</th><th>Total</th><th></th></tr></thead><tbody>{rows.map(o => <tr key={o.id}><td><Link href={`/orders/${encodeURIComponent(o.id)}`} className="orderNumber">{o.order_no}</Link><small>{date(o.created_at)}</small></td><td><strong>{o.customer_name || 'Walk-in customer'}</strong><small>{o.customer_no || '—'}</small></td><td><span className={`orderBadge status-${String(o.status || '').toLowerCase().replaceAll(' ','-')}`}>{o.status}</span></td><td><span className={o.payment_status === 'Paid' ? 'paidText' : 'dueText'}>{o.payment_status || 'Pending'}</span></td><td>{fulfilmentFocus ? (o.fulfillment_status || 'Unfulfilled') : (o.location_name || '—')}</td><td><strong>{money(o.grand_total)}</strong></td><td><Link href={`/orders/${encodeURIComponent(o.id)}`} aria-label={`Open ${o.order_no}`} className="tableArrow"><ChevronRight size={16} /></Link></td></tr>)}</tbody></table></div>;
}

function CreateOrderModal({ customers, locations, variants, onClose, onDone }: { customers: Any[]; locations: Any[]; variants: Any[]; onClose: () => void; onDone: () => void }) {
  const [f, setF] = useState<any>({ locationId: locations[0]?.id || '', customerId: '', shippingName: '', shippingPhone: '', shippingAddress: '', notes: '' });
  const [lines, setLines] = useState<any[]>([{ variantId: variants[0]?.id || '', quantity: 1 }]);
  const [saving, setSaving] = useState(false);
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { await api('/api/orders', { method: 'POST', headers: { 'Idempotency-Key': `admin-${Date.now()}-${Math.random().toString(36).slice(2)}` }, body: JSON.stringify({ ...f, customerId: f.customerId || null, lines: lines.map(x => ({ variantId: x.variantId, quantity: Number(x.quantity) })) }) }); onDone(); } catch (e: any) { alert(e.message); } finally { setSaving(false); } };
  return <Modal title="Create customer order" onClose={onClose} wide><form onSubmit={submit}><div className="adminFormGrid"><Select label="Selling location" value={f.locationId} onChange={(v: string) => setF({ ...f, locationId: v })} options={locations.filter(x => x.status === 'Active').map(x => ({ value: x.id, label: x.name }))} /><Select label="Customer" value={f.customerId} onChange={(v: string) => setF({ ...f, customerId: v })} options={[{ value: '', label: 'Walk-in customer' }, ...customers.filter(x => x.status !== 'Anonymized').map(x => ({ value: x.id, label: `${x.name} · ${x.customer_no || ''}` }))]} /><Field label="Delivery name" value={f.shippingName} onChange={(v: string) => setF({ ...f, shippingName: v })} /><Field label="Delivery phone" value={f.shippingPhone} onChange={(v: string) => setF({ ...f, shippingPhone: v })} /><Field label="Delivery address" value={f.shippingAddress} onChange={(v: string) => setF({ ...f, shippingAddress: v })} /><Field label="Notes" value={f.notes} onChange={(v: string) => setF({ ...f, notes: v })} /></div><div className="orderLineEditor"><div className="orderLineHead"><strong>Products</strong><button type="button" onClick={() => setLines([...lines, { variantId: variants[0]?.id || '', quantity: 1 }])}><Plus size={14} /> Add product</button></div>{lines.map((line, i) => <div className="orderLine" key={i}><Select label={`Product ${i + 1}`} value={line.variantId} onChange={(v: string) => setLines(lines.map((x, j) => j === i ? { ...x, variantId: v } : x))} options={variants.map(x => ({ value: x.id, label: `${x.product_name || x.name} · ${x.sku || ''}` }))} /><Field label="Quantity" type="number" value={line.quantity} onChange={(v: string) => setLines(lines.map((x, j) => j === i ? { ...x, quantity: v } : x))} /><button type="button" className="iconButton" disabled={lines.length === 1} onClick={() => setLines(lines.filter((_, j) => j !== i))}><X size={15} /></button></div>)}</div><div className="adminSubmit"><button type="button" onClick={onClose}>Cancel</button><button className="primaryAction" disabled={saving || !locations.length || !variants.length}>{saving ? 'Creating…' : 'Create order'}</button></div></form></Modal>;
}

export function OrderDetail({ order: initial, permissions }: { order: Any; permissions: string[] }) {
  const [order, setOrder] = useState(initial); const [modal, setModal] = useState<string | null>(null); const [busy, setBusy] = useState(false);
  const canManage = permissions.includes('orders.manage'); const canSales = permissions.includes('sales.create'); const canReturns = permissions.includes('returns.manage');
  const run = async (path: string, body: Any) => { setBusy(true); try { const next = await api(path, { method: 'POST', body: JSON.stringify(body) }); setOrder(next.order || next); setModal(null); } catch (e: any) { alert(e.message); } finally { setBusy(false); } };
  const paid = (order.payments || []).reduce((s: number, p: Any) => s + Number(p.amount || 0), 0); const due = Math.max(0, Number(order.grand_total || 0) - paid);
  return <div className="workspace orderDetailWorkspace">
    <div className="orderBack"><Link href="/orders">← Back to orders</Link></div>
    <section className="welcome ordersHero"><div><span className="eyebrow">Order detail</span><h2>{order.order_no}</h2><p>{order.customer_name || 'Walk-in customer'} · {date(order.created_at)} · {order.location_name}</p></div><div className="workspaceActions">{canManage && ['Pending Payment','Paid'].includes(order.status) && <button onClick={() => setModal('payment')}><Banknote size={14} /> Record payment</button>}{canManage && ['Processing','Packed','Ready for Dispatch'].includes(order.status) && <button onClick={() => setModal('fulfilment')}><Truck size={14} /> Prepare fulfilment</button>}{canReturns && ['Paid','Delivered','Returned','Cancelled'].includes(order.status) && <button onClick={() => setModal('refund')}><RotateCcw size={14} /> Start refund</button>}{canSales && order.status === 'Paid' && <button className="primaryAction" onClick={() => run(`/api/orders/${order.id}/convert-to-sale`, {})}><ReceiptText size={14} /> Convert to sale</button>}</div></section>
    <section className="orderDetailKpis"><article><span>Order total</span><strong>{money(order.grand_total)}</strong></article><article><span>Paid</span><strong>{money(paid)}</strong></article><article><span>Balance</span><strong className={due > 0 ? 'dangerText' : 'paidText'}>{money(due)}</strong></article><article><span>Current stage</span><strong>{order.status}</strong></article></section>
    <section className="orderJourney panel"><div className="panelHeading"><div><h3>Order journey</h3><p>Every stage is kept in order so the team can see what has happened and what comes next.</p></div></div><div className="journeySteps">{statusOrder.map((s, i) => { const current = statusOrder.indexOf(order.status); const done = current >= i && current >= 0; return <div key={s} className={done ? 'done' : ''}><span>{done ? <CheckCircle2 size={16} /> : i + 1}</span><small>{s}</small></div>; })}</div></section>
    {canManage && <section className="panel orderNextAction"><div className="panelHeading"><div><h3>Next action</h3><p>Use the existing order rules to move this order forward.</p></div></div><div className="nextActionRow">{nextOrderStage(order.status) ? <button className="primaryAction" disabled={busy} onClick={() => run(`/api/orders/${order.id}/status`, { status: nextOrderStage(order.status) })}>{nextOrderStage(order.status) === 'Processing' ? 'Start preparing' : nextOrderStage(order.status) === 'Packed' ? 'Mark packed' : nextOrderStage(order.status) === 'Ready for Dispatch' ? 'Ready for dispatch' : nextOrderStage(order.status) === 'Dispatched' ? 'Mark dispatched' : 'Mark delivered'} <ArrowRight size={14} /></button> : <span className="nextActionDone"><CheckCircle2 size={16} /> No further order stage is available here.</span>}{['Pending Payment','Paid'].includes(order.status) && <button disabled={busy} onClick={() => setModal('cancel')}>Cancel order</button>}</div></section>}
    <section className="orderDetailGrid"><div className="panel"><div className="panelHeading"><div><h3>Products</h3><p>Items reserved for this order.</p></div></div><div className="orderDetailLines">{(order.lines || []).map((l: Any) => <div key={l.id}><div><strong>{l.product_name}</strong><span>{l.sku} · {l.variant_name || 'Default'}</span></div><b>{num(l.quantity)} × {money(l.unit_price)}</b></div>)}</div></div><div className="panel"><div className="panelHeading"><div><h3>Customer & delivery</h3><p>Information attached to this order.</p></div></div><div className="orderFacts"><div><span>Customer</span><strong>{order.customer_name || 'Walk-in customer'}</strong></div><div><span>Phone</span><strong>{order.customer_phone || order.shipping_phone || '—'}</strong></div><div><span>Delivery address</span><strong>{order.shipping_address || 'Collection / no address'}</strong></div><div><span>Fulfilment</span><strong>{order.fulfillment_status || 'Unfulfilled'}</strong></div></div></div></section>
    <section className="orderDetailGrid"><div className="panel"><div className="panelHeading"><div><h3>Payments</h3><p>Recorded payments and remaining balance.</p></div></div><div className="orderDetailLines">{(order.payments || []).map((p: Any) => <div key={p.id}><div><strong>{p.method}</strong><span>{date(p.created_at)} · {p.reference || 'No reference'}</span></div><b>{money(p.amount)}</b></div>)}{!(order.payments || []).length && <Empty title="No payment yet" text="This order has not received a payment." />}</div></div><div className="panel"><div className="panelHeading"><div><h3>Activity</h3><p>Recent changes to the order.</p></div></div><div className="orderTimeline">{(order.statusHistory || []).slice().reverse().slice(0, 10).map((h: Any) => <div key={h.id}><i /><div><strong>{h.status}</strong><span>{h.notes || 'Order updated'} · {date(h.created_at)}</span></div></div>)}{!(order.statusHistory || []).length && <Empty title="No activity yet" text="Order updates will appear here." />}</div></div></section>
    {busy && <div className="ordersBusy">Saving your change…</div>}
    {modal === 'payment' && <PaymentModal order={order} due={due} onClose={() => setModal(null)} onDone={(body: Any) => run(`/api/orders/${order.id}/payment`, body)} />}
    {modal === 'fulfilment' && <FulfilmentModal onClose={() => setModal(null)} onDone={(body: Any) => run(`/api/orders/${order.id}/fulfillment`, body)} />}
    {modal === 'refund' && <RefundModal onClose={() => setModal(null)} onDone={(body: Any) => run(`/api/orders/${order.id}/refund`, body)} />}
    {modal === 'cancel' && <CancelModal onClose={() => setModal(null)} onDone={(body: Any) => run(`/api/orders/${order.id}/cancel`, body)} />}
  </div>;
}
