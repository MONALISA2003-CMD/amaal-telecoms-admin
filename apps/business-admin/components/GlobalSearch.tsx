'use client';
import { useState } from 'react';

type Result = { id: string; title: string; subtitle?: string; status?: string; module?: string; type?: string };

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function search(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length < 2) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/global-search?q=${encodeURIComponent(trimmed)}`, { cache: 'no-store' });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Search is temporarily unavailable.');
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      setResults([]);
      setError(err instanceof Error ? err.message : 'Search is temporarily unavailable.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="searchWorkspace">
      <section className="welcome">
        <div>
          <span className="eyebrow">Business search</span>
          <h2>Find anything</h2>
          <p>Search only returns records your current backend permissions allow you to see.</p>
        </div>
      </section>
      <form className="searchForm" onSubmit={search}>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Product, customer, supplier, sale or order…" autoFocus />
        <button className="primary" type="submit" disabled={loading}>{loading ? 'Searching…' : 'Search'}</button>
      </form>
      {error && <div className="error" role="alert">{error}</div>}
      <section className="panel">
        <div className="panelHeading">
          <div><h3>Results</h3><p>{results.length ? `${results.length} matching records` : 'Enter at least two characters to begin.'}</p></div>
        </div>
        <div className="searchResults">
          {results.map((result, index) => (
            <div className="searchResult" key={`${result.module}-${result.id}-${index}`}>
              <div><strong>{result.title}</strong><span>{result.type || result.module} · {result.subtitle || '—'}</span></div>
              <em>{result.status || '—'}</em>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
