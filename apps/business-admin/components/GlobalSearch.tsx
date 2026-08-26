'use client';
import { useState } from 'react';

type Result = { id: string; title: string; subtitle?: string; status?: string; module?: string; type?: string };

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length < 2) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/global-search?q=${encodeURIComponent(query.trim())}`, { cache: 'no-store' });
      const data = await res.json();
      setResults(Array.isArray(data.results) ? data.results : []);
    } finally { setLoading(false); }
  }

  return (
    <div className="searchWorkspace">
      <section className="welcome"><div><span className="eyebrow">Business search</span><h2>Find anything</h2><p>Search only returns records your current backend permissions allow you to see.</p></div></section>
      <form className="searchForm" onSubmit={search}><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Product, customer, supplier, sale or order…" autoFocus /><button className="primary" type="submit">{loading ? 'Searching…' : 'Search'}</button></form>
      <section className="panel">
        <div className="panelHeading"><div><h3>Results</h3><p>{results.length ? `${results.length} matching records` : 'Enter at least two characters to begin.'}</p></div></div>
        <div className="searchResults">{results.map((r,i)=><div className="searchResult" key={`${r.module}-${r.id}-${i}`}><div><strong>{r.title}</strong><span>{r.type || r.module} · {r.subtitle || '—'}</span></div><em>{r.status || '—'}</em></div>)}</div>
      </section>
    </div>
  );
}
