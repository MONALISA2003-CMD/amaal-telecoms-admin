'use client';

import { useEffect, useMemo, useState } from 'react';
import { Activity, Boxes, CircleDollarSign, RefreshCw, ShoppingCart, Users } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Any = Record<string, any>;

const money = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) ? new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(n) : '—';
};
const number = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) ? new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 }).format(n) : '—';
};

async function get(path: string) {
  const response = await fetch(path, { cache: 'no-store', headers: { Accept: 'application/json' } });
  const text = await response.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = null; }
  if (!response.ok) throw new Error(data?.error || 'Live business data is temporarily unavailable.');
  return data;
}

export function LiveBusinessPulse() {
  const [summary, setSummary] = useState<Any | null>(null);
  const [trend, setTrend] = useState<Any[]>([]);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [error, setError] = useState('');

  async function load() {
    try {
      const [s, t] = await Promise.all([get('/api/bi/summary'), get('/api/bi/sales-trend')]);
      setSummary(s || null);
      setTrend(Array.isArray(t) ? t : []);
      setUpdatedAt(new Date());
      setError('');
    } catch (e: any) {
      setError(e?.message || 'Live business data is temporarily unavailable.');
    }
  }

  useEffect(() => {
    let active = true;
    const run = async () => { if (active && document.visibilityState !== 'hidden') await load(); };
    run();
    const timer = window.setInterval(run, 15000);
    const onVisible = () => { if (document.visibilityState === 'visible') run(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { active = false; window.clearInterval(timer); document.removeEventListener('visibilitychange', onVisible); };
  }, []);

  const chartData = useMemo(() => trend.slice(-14).map((x: Any) => ({
    day: String(x.day || '').slice(5),
    revenue: Number(x.revenue || 0),
  })), [trend]);

  return <section className="livePulse" aria-label="Live business pulse">
    <div className="livePulseHead">
      <div><span className="eyebrow"><Activity size={12} /> Live business pulse</span><strong>Updates automatically</strong></div>
      <div className="livePulseMeta"><span><i /> Connected to current business records</span>{updatedAt && <span>Updated {updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}<button onClick={load} title="Refresh now"><RefreshCw size={13} /></button></div>
    </div>
    {error ? <div className="livePulseError">{error}</div> : <div className="livePulseGrid">
      <div className="livePulseChart"><div className="livePulseLabel"><span>Revenue movement</span><b>{money(summary?.sales?.revenue)}</b></div><div className="livePulseChartBox">{chartData.length ? <ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><XAxis dataKey="day" hide /><YAxis hide /><Tooltip formatter={(value) => money(value)} /><Area dataKey="revenue" type="monotone" stroke="#b89032" fill="#b89032" fillOpacity={0.10} strokeWidth={2} /></AreaChart></ResponsiveContainer> : <span>No completed sales yet</span>}</div></div>
      <Pulse icon={ShoppingCart} label="Orders" value={number(summary?.orders?.total)} note={`${number(summary?.orders?.open)} open`} />
      <Pulse icon={Boxes} label="Stock" value={number(summary?.inventory?.units)} note={`${number(summary?.inventory?.variants)} product lines`} />
      <Pulse icon={Users} label="Customers" value={number(summary?.customers?.total)} note={`${number(summary?.customers?.acquired)} added in period`} />
      <Pulse icon={CircleDollarSign} label="Gross margin" value={`${Number(summary?.grossMarginPct || 0).toFixed(1)}%`} note={money(summary?.margin?.gross_margin)} />
    </div>}
  </section>;
}

function Pulse({ icon: Icon, label, value, note }: { icon: any; label: string; value: string; note: string }) {
  return <div className="livePulseMetric"><span><Icon size={15} /></span><div><small>{label}</small><strong>{value}</strong><em>{note}</em></div></div>;
}
