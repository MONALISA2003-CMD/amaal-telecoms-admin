'use client';

import Link from 'next/link';
import { useMemo, useState, type ReactNode } from 'react';
import CommerceLifecyclePanel from '@/components/CommerceLifecyclePanel';
import { ArrowRight, ChevronRight, CircleUserRound, CreditCard, FileText, Headphones , MessageSquare, Package, Plus, RefreshCw, Search, ShoppingCart, Tag, Truck, Users, X } from 'lucide-react';

type Customer = {
  id: string; customer_no: string; name: string; customer_type?: string; company_name?: string; email?: string; phone?: string;
  city?: string; region?: string; country_code?: string; status?: string; outstanding_balance?: number | string; open_cases?: number;
};
type Summary = { customers?: number; active?: number; businessCustomers?: number; new30d?: number; openCases?: number; outstandingBalance?: number | string };
type Props = { summary: Summary | null; customers: Customer[]; total: number; groups: any[]; tasks: any[]; cases: any[]; permissions: string[] };

type Detail = {
  customer: Customer & { credit_limit?: number | string; notes?: string; address_line1?: string; address_line2?: string; tax_number?: string };
  sales: any[]; orders: any[]; credit: any[]; warranty: any[]; returns: any[]; deliveries: any[]; documents: any[]; tasks: any[]; notes: any[]; mergeHistory: any[];
  metrics: { salesCount: number; orderCount: number; revenue: number; lastPurchase?: string | null; openCases: number; interactionCount: number };
};

const money = (value: unknown) => { const n = Number(value); return Number.isFinite(n) ? new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(n) : '—'; };
const number = (value: unknown) => { const n = Number(value); return Number.isFinite(n) ? n.toLocaleString('en-UG') : '—'; };
const date = (value: unknown) => { if (!value) return '—'; const d = new Date(String(value)); return Number.isNaN(d.getTime()) ? '—' : new Intl.DateTimeFormat('en-UG', { day: '2-digit', month: 'short', year: 'numeric' }).format(d); };

async function call(path: string, options?: RequestInit) {
  const response = await fetch(path, { ...options, headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.error || 'The action could not be completed.');
  return data;
}

export function CustomerWorkspace({ summary, customers, total, groups, tasks, cases, permissions }: Props) {
  const canManage = permissions.includes('customers.manage');
  const canCrm = permissions.includes('crm.manage');
  const canSupport = permissions.includes('support.manage');
  const canPrivacy = permissions.includes('customers.privacy');
  const canExport = permissions.includes('customers.export');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('All');
  const [selected, setSelected] = useState<Customer | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [busy, setBusy] = useState(false);
  const [modal, setModal] = useState<'customer'|'group'|'task'|'case'|'note'|'consent'|null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return customers.filter((c) => (!q || [c.name, c.customer_no, c.email, c.phone, c.company_name].some(v => String(v || '').toLowerCase().includes(q))) && (type === 'All' || c.customer_type === type) && (status === 'All' || c.status === status));
  }, [customers, query, type, status]);

  async function openCustomer(customer: Customer) {
    setSelected(customer); setBusy(true); setError('');
    try { setDetail(await call(`/api/customers/${customer.id}/360`)); } catch (e: any) { setError(e.message); } finally { setBusy(false); }
  }
  async function refresh() { window.location.reload(); }
  async function submit(path: string, payload: any, method = 'POST') {
    setBusy(true); setError('');
    try { await call(path, { method, body: JSON.stringify(payload) }); setModal(null); setMessage('Saved successfully.'); await refresh(); }
    catch (e: any) { setError(e.message); }
    finally { setBusy(false); }
  }

  return <div className="customerWorkspace">
    <section className="customerHero">
      <div><div className="eyebrowRow"><span className="eyebrow">Commerce · Customers</span><span className="customerLive"><i /> Live customer records</span></div><h2>Customers</h2><p>One place for customer relationships, balances, purchases, service and follow-up.</p></div>
      <div className="customerHeroActions">{canManage && <button className="goldAction" onClick={() => setModal('customer')}><Plus size={15}/> Add customer</button>}{canExport && <button className="softAction" onClick={() => { window.location.href = '/api/customers/export'; }}>Export</button>}</div>
    </section>

    <section className="customerStats">
      <Stat icon={<Users size={17}/>} label="Customers" value={number(summary?.customers)} note={`${number(total)} shown in this view`} />
      <Stat icon={<CircleUserRound size={17}/>} label="Active customers" value={number(summary?.active)} note="Ready for normal business activity" />
      <Stat icon={<ShoppingCart size={17}/>} label="New in 30 days" value={number(summary?.new30d)} note="Recently added customers" />
      <Stat icon={<CreditCard size={17}/>} label="Outstanding balance" value={money(summary?.outstandingBalance)} note="Across customer accounts" />
    </section>

    <section className="customerGrid">
      <div className="panel customerDirectory">
        <div className="panelHeading"><div><h3>Customer directory</h3><p>Search and open a customer to see their complete business relationship.</p></div><button className="iconSoft" onClick={refresh} aria-label="Refresh customers"><RefreshCw size={15}/></button></div>
        <div className="customerFilters"><div className="customerSearch"><Search size={15}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search name, phone, email or customer number" /></div><select value={type} onChange={e => setType(e.target.value)}><option>All</option><option>Individual</option><option>Business</option><option>Corporate</option></select><select value={status} onChange={e => setStatus(e.target.value)}><option>All</option><option>Active</option><option>Inactive</option><option>Blocked</option><option>Anonymized</option></select></div>
        <div className="customerList">{filtered.length ? filtered.map(c => <button className={`customerListRow ${selected?.id === c.id ? 'active' : ''}`} key={c.id} onClick={() => openCustomer(c)}><span className="customerAvatar">{(c.name || '?').slice(0,1).toUpperCase()}</span><span className="customerMain"><strong>{c.name}</strong><small>{c.company_name || c.customer_no}</small><small>{c.phone || c.email || 'No contact details'}</small></span><span className="customerRowRight"><b>{money(c.outstanding_balance)}</b><small>{number(c.open_cases)} open cases</small></span><ChevronRight size={15}/></button>) : <div className="customerEmpty"><Users size={24}/><strong>No customers match this view</strong><span>Try a different search or add a new customer.</span></div>}</div>
      </div>

      <CustomerDetail detail={detail} busy={busy} canManage={canManage} canCrm={canCrm} canSupport={canSupport} canPrivacy={canPrivacy} onAction={setModal} onRefresh={async () => selected && openCustomer(selected)} />
    </section>

    <CommerceLifecyclePanel canManage={canManage}/>
    <section className="customerBottomGrid">
      <Panel title="Follow-up today" icon={<MessageSquare size={16}/>} action={<Link href="/customers" className="textAction">Customer workspace</Link>}>
        {tasks.filter(t => t.status !== 'Completed').slice(0,6).map(t => <div className="customerMiniRow" key={t.id}><div><strong>{t.title}</strong><span>{t.customer_name || t.customer_no || 'Customer'} · {date(t.due_at)}</span></div><b>{t.priority || 'Normal'}</b></div>)}
        {!tasks.filter(t => t.status !== 'Completed').length && <Empty text="No follow-ups are due."/>}
      </Panel>
      <Panel title="Customer service" icon={<Headphones size={16}/>} action={<Link href="/customers" className="textAction">Open customers</Link>}>
        {cases.slice(0,6).map(c => <div className="customerMiniRow" key={c.id}><div><strong>{c.title}</strong><span>{c.customer_name} · {c.case_no}</span></div><b>{c.status}</b></div>)}
        {!cases.length && <Empty text="No customer cases are waiting."/>}
      </Panel>
      <Panel title="Customer groups" icon={<Tag size={16}/>} action={canCrm ? <button className="textAction" onClick={() => setModal('group')}>New group</button> : undefined}>
        {groups.slice(0,6).map(g => <div className="customerMiniRow" key={g.id}><div><strong>{g.name}</strong><span>{g.description || 'Customer segment'}</span></div><b>{number(g.member_count)} members</b></div>)}
        {!groups.length && <Empty text="No customer groups yet."/>}
      </Panel>
    </section>

    {message && <div className="customerToast" onClick={() => setMessage('')}>{message}</div>}
    {error && <div className="customerToast errorToast" onClick={() => setError('')}>{error}</div>}
    {modal === 'customer' && <CustomerForm busy={busy} onClose={() => setModal(null)} onSubmit={payload => submit('/api/customers', payload)} />}
    {modal === 'group' && <GroupForm busy={busy} onClose={() => setModal(null)} onSubmit={payload => submit('/api/customer-groups', payload)} />}
    {modal === 'task' && selected && <TaskForm busy={busy} onClose={() => setModal(null)} onSubmit={payload => submit(`/api/customers/${selected.id}/tasks`, payload)} />}
    {modal === 'case' && selected && <CaseForm busy={busy} onClose={() => setModal(null)} onSubmit={payload => submit(`/api/customers/${selected.id}/cases`, payload)} />}
    {modal === 'note' && selected && <NoteForm busy={busy} onClose={() => setModal(null)} onSubmit={payload => submit(`/api/customers/${selected.id}/notes`, payload)} />}
    {modal === 'consent' && selected && <ConsentForm busy={busy} onClose={() => setModal(null)} onSubmit={payload => submit(`/api/customers/${selected.id}/consent`, payload, 'PUT')} />}
  </div>;
}

function CustomerDetail({ detail, busy, canManage, canCrm, canSupport, canPrivacy, onAction, onRefresh }: { detail: Detail | null; busy: boolean; canManage: boolean; canCrm: boolean; canSupport: boolean; canPrivacy: boolean; onAction: (x: any) => void; onRefresh: () => void }) {
  if (!detail) return <div className="panel customerDetailEmpty"><CircleUserRound size={30}/><strong>{busy ? 'Opening customer…' : 'Select a customer'}</strong><span>Choose a customer from the directory to see purchases, orders, balances, service history and follow-up.</span></div>;
  const c = detail.customer;
  return <div className="customerDetailStack">
    <section className="panel customerProfileHero"><div className="profileIdentity"><span className="profileAvatar">{c.name.slice(0,1).toUpperCase()}</span><div><span className="eyebrow">{c.customer_no}</span><h3>{c.name}</h3><p>{c.company_name || c.customer_type || 'Customer'}</p></div></div><div className="profileActions">{canCrm && <button onClick={() => onAction('note')}><MessageSquare size={14}/> Note</button>}{canCrm && <button onClick={() => onAction('task')}><FileText size={14}/> Follow-up</button>}{canSupport && <button onClick={() => onAction('case')}><Headphones size={14}/> Service case</button>}{canPrivacy && <button onClick={() => onAction('consent')}><ShieldIcon/> Privacy</button>}<button onClick={onRefresh}><RefreshCw size={14}/></button></div></section>
    <section className="detailKpis"><MiniStat label="Customer value" value={money(detail.metrics.revenue)}/><MiniStat label="Purchases" value={number(detail.metrics.salesCount + detail.metrics.orderCount)}/><MiniStat label="Outstanding" value={money(c.outstanding_balance)}/><MiniStat label="Open service cases" value={number(detail.metrics.openCases)}/></section>
    <section className="panel customerConnections"><div className="panelHeading"><div><h3>Connected business activity</h3><p>This customer is connected across the core business workflows.</p></div></div><div className="connectionGrid"><Connection icon={<ShoppingCart size={15}/>} title="Sales" value={number(detail.sales.length)} href="/sales"/><Connection icon={<Package size={15}/>} title="Orders" value={number(detail.orders.length)} href="/orders"/><Connection icon={<CreditCard size={15}/>} title="Credit" value={number(detail.credit.length)} href="/credit"/><Connection icon={<Truck size={15}/>} title="Deliveries" value={number(detail.deliveries.length)} href="/delivery"/><Connection icon={<Headphones size={15}/>} title="Warranty & service" value={number(detail.warranty.length + detail.returns.length)} href="/service"/><Connection icon={<Users size={15}/>} title="Follow-ups" value={number(detail.tasks.length)} href="/customers"/></div></section>
    <section className="customerDetailColumns">
      <Panel title="Profile" icon={<CircleUserRound size={16}/>}><div className="detailLines"><Line label="Phone" value={c.phone || '—'}/><Line label="Email" value={c.email || '—'}/><Line label="Address" value={[c.address_line1,c.address_line2,c.city,c.region,c.country_code].filter(Boolean).join(', ') || '—'}/><Line label="Customer type" value={c.customer_type || '—'}/><Line label="Status" value={c.status || '—'}/><Line label="Credit limit" value={money(c.credit_limit)}/></div></Panel>
      <Panel title="Recent purchases" icon={<ShoppingCart size={16}/>} action={<Link href="/sales" className="textAction">Sales</Link>}>{detail.sales.slice(0,5).map(s => <div className="customerMiniRow" key={s.id}><div><strong>{s.sale_no}</strong><span>{date(s.created_at)} · {s.status}</span></div><b>{money(s.grand_total)}</b></div>)}{!detail.sales.length && <Empty text="No recorded sales for this customer."/>}</Panel>
      <Panel title="Orders" icon={<Package size={16}/>} action={<Link href="/orders" className="textAction">Orders</Link>}>{detail.orders.slice(0,5).map(o => <div className="customerMiniRow" key={o.id}><div><strong>{o.order_no}</strong><span>{date(o.created_at)} · {o.payment_status || o.status}</span></div><b>{money(o.grand_total)}</b></div>)}{!detail.orders.length && <Empty text="No recorded orders for this customer."/>}</Panel>
      <Panel title="Follow-up & notes" icon={<MessageSquare size={16}/>} action={canCrm ? <button className="textAction" onClick={() => onAction('task')}>Add follow-up</button> : undefined}>{detail.tasks.slice(0,4).map(t => <div className="customerMiniRow" key={t.id}><div><strong>{t.title}</strong><span>{date(t.due_at)} · {t.status}</span></div><b>{t.priority}</b></div>)}{detail.notes.slice(0,3).map(n => <div className="noteRow" key={n.id}><strong>Note</strong><span>{n.note}</span></div>)}{!detail.tasks.length && !detail.notes.length && <Empty text="No follow-up or notes recorded."/>}</Panel>
    </section>
  </div>;
}

function Panel({ title, icon, children, action }: { title: string; icon?: ReactNode; children: ReactNode; action?: ReactNode }) { return <section className="panel customerPanel"><div className="panelHeading"><div><h3>{icon}{title}</h3></div>{action}</div>{children}</section>; }
function Stat({ icon, label, value, note }: { icon: ReactNode; label: string; value: string; note: string }) { return <article className="customerStat"><span className="customerStatIcon">{icon}</span><span>{label}</span><strong>{value}</strong><small>{note}</small></article>; }
function MiniStat({ label, value }: { label: string; value: string }) { return <div><span>{label}</span><strong>{value}</strong></div>; }
function Line({ label, value }: { label: string; value: string }) { return <div><span>{label}</span><strong>{value}</strong></div>; }
function Connection({ icon, title, value, href }: { icon: ReactNode; title: string; value: string; href: string }) { return <Link href={href} className="customerConnection"><span>{icon}</span><div><strong>{title}</strong><small>{value} records</small></div><ArrowRight size={14}/></Link>; }
function Empty({ text }: { text: string }) { return <div className="customerSmallEmpty">{text}</div>; }
function ShieldIcon() { return <span className="shieldIcon">✓</span>; }

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) { return <div className="customerModalBackdrop"><div className="customerModal"><div className="customerModalHead"><div><span className="eyebrow">Customer workspace</span><h3>{title}</h3></div><button onClick={onClose}><X size={17}/></button></div>{children}</div></div>; }
function Input({ label, value, onChange, type='text', required=false }: { label: string; value: string; onChange: (v:string)=>void; type?: string; required?: boolean }) { return <label className="customerField"><span>{label}{required ? ' *' : ''}</span><input type={type} value={value} required={required} onChange={e=>onChange(e.target.value)}/></label>; }
function Select({ label, value, onChange, options }: { label:string; value:string; onChange:(v:string)=>void; options:string[] }) { return <label className="customerField"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o}>{o}</option>)}</select></label>; }
function Textarea({ label, value, onChange }: { label:string; value:string; onChange:(v:string)=>void }) { return <label className="customerField"><span>{label}</span><textarea value={value} onChange={e=>onChange(e.target.value)}/></label>; }
function FormActions({ busy, onClose, label }: { busy:boolean; onClose:()=>void; label:string }) { return <div className="customerFormActions"><button type="button" className="softAction" onClick={onClose}>Cancel</button><button type="submit" className="goldAction" disabled={busy}>{busy ? 'Saving…' : label}</button></div>; }
function CustomerForm({ busy, onClose, onSubmit }: { busy:boolean; onClose:()=>void; onSubmit:(x:any)=>void }) { const [f,setF]=useState<any>({name:'',customerType:'Individual',companyName:'',phone:'',email:'',countryCode:'UG',preferredCurrency:'UGX',city:'',region:'',addressLine1:'',notes:''}); return <Modal title="Add customer" onClose={onClose}><form onSubmit={e=>{e.preventDefault();onSubmit(f)}}><div className="customerFormGrid"><Input label="Full name" required value={f.name} onChange={v=>setF({...f,name:v})}/><Select label="Customer type" value={f.customerType} onChange={v=>setF({...f,customerType:v})} options={['Individual','Business','Corporate']}/><Input label="Company name" value={f.companyName} onChange={v=>setF({...f,companyName:v})}/><Input label="Phone" required value={f.phone} onChange={v=>setF({...f,phone:v})}/><Input label="Email" value={f.email} onChange={v=>setF({...f,email:v})}/><Input label="City" value={f.city} onChange={v=>setF({...f,city:v})}/><Input label="Region" value={f.region} onChange={v=>setF({...f,region:v})}/><Input label="Country" value={f.countryCode} onChange={v=>setF({...f,countryCode:v})}/></div><Textarea label="Address" value={f.addressLine1} onChange={v=>setF({...f,addressLine1:v})}/><Textarea label="Notes" value={f.notes} onChange={v=>setF({...f,notes:v})}/><FormActions busy={busy} onClose={onClose} label="Add customer"/></form></Modal>; }
function GroupForm({ busy,onClose,onSubmit }:{busy:boolean;onClose:()=>void;onSubmit:(x:any)=>void}){const[f,setF]=useState({name:'',description:'',rule:''});return <Modal title="Create customer group" onClose={onClose}><form onSubmit={e=>{e.preventDefault();onSubmit({name:f.name,description:f.description,criteria:{description:f.rule||'Manually managed group'}})}}><Input label="Group name" required value={f.name} onChange={v=>setF({...f,name:v})}/><Textarea label="Description" value={f.description} onChange={v=>setF({...f,description:v})}/><Textarea label="Group rule" value={f.rule} onChange={v=>setF({...f,rule:v})}/><FormActions busy={busy} onClose={onClose} label="Create group"/></form></Modal>;}
function TaskForm({busy,onClose,onSubmit}:{busy:boolean;onClose:()=>void;onSubmit:(x:any)=>void}){const[f,setF]=useState({title:'',description:'',dueAt:'',priority:'Normal'});return <Modal title="Add customer follow-up" onClose={onClose}><form onSubmit={e=>{e.preventDefault();onSubmit(f)}}><Input label="Task" required value={f.title} onChange={v=>setF({...f,title:v})}/><Textarea label="Details" value={f.description} onChange={v=>setF({...f,description:v})}/><div className="customerFormGrid"><Input label="Due date" type="date" value={f.dueAt} onChange={v=>setF({...f,dueAt:v})}/><Select label="Priority" value={f.priority} onChange={v=>setF({...f,priority:v})} options={['Low','Normal','High','Critical']}/></div><FormActions busy={busy} onClose={onClose} label="Save follow-up"/></form></Modal>;}
function CaseForm({busy,onClose,onSubmit}:{busy:boolean;onClose:()=>void;onSubmit:(x:any)=>void}){const[f,setF]=useState({title:'',description:'',priority:'Normal',channel:'Phone'});return <Modal title="Create service case" onClose={onClose}><form onSubmit={e=>{e.preventDefault();onSubmit(f)}}><Input label="Subject" required value={f.title} onChange={v=>setF({...f,title:v})}/><Textarea label="What needs attention?" value={f.description} onChange={v=>setF({...f,description:v})}/><div className="customerFormGrid"><Select label="Priority" value={f.priority} onChange={v=>setF({...f,priority:v})} options={['Low','Normal','High','Urgent']}/><Select label="Channel" value={f.channel} onChange={v=>setF({...f,channel:v})} options={['Phone','Email','SMS','In person','Website']}/></div><FormActions busy={busy} onClose={onClose} label="Create case"/></form></Modal>;}
function NoteForm({busy,onClose,onSubmit}:{busy:boolean;onClose:()=>void;onSubmit:(x:any)=>void}){const[f,setF]=useState({note:'',visibility:'Internal'});return <Modal title="Add customer note" onClose={onClose}><form onSubmit={e=>{e.preventDefault();onSubmit(f)}}><Textarea label="Note" value={f.note} onChange={v=>setF({...f,note:v})}/><Select label="Visibility" value={f.visibility} onChange={v=>setF({...f,visibility:v})} options={['Internal','Private']}/><FormActions busy={busy} onClose={onClose} label="Save note"/></form></Modal>;}
function ConsentForm({busy,onClose,onSubmit}:{busy:boolean;onClose:()=>void;onSubmit:(x:any)=>void}){const[f,setF]=useState({consentType:'marketing',granted:'true',source:'Customer conversation'});return <Modal title="Privacy & consent" onClose={onClose}><form onSubmit={e=>{e.preventDefault();onSubmit({...f,granted:f.granted==='true'})}}><Select label="Permission" value={f.consentType} onChange={v=>setF({...f,consentType:v})} options={['marketing','sms','email','data_processing']}/><Select label="Customer choice" value={f.granted} onChange={v=>setF({...f,granted:v})} options={['true','false']}/><Input label="Source" value={f.source} onChange={v=>setF({...f,source:v})}/><FormActions busy={busy} onClose={onClose} label="Save choice"/></form></Modal>;}
