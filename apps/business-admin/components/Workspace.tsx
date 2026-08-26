import Link from 'next/link';

export type Card = { label: string; value: string; note?: string };
export type Row = { [key: string]: string | number | null | undefined };

export function Workspace({
  title, description, cards, rows = [], columns = [], actions = [],
}: {
  title: string; description: string; cards: Card[]; rows?: Row[];
  columns?: { key: string; label: string }[]; actions?: { label: string; href: string }[];
}) {
  return (
    <div className="workspace">
      <section className="welcome">
        <div>
          <span className="eyebrow">Business workspace</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {actions.length > 0 && <div className="workspaceActions">{actions.map(a => <Link key={a.href} href={a.href}>{a.label}</Link>)}</div>}
      </section>
      <section className="metrics">
        {cards.map(card => (
          <article className="metric" key={card.label}>
            <span>{card.label}</span><strong>{card.value}</strong>{card.note && <small>{card.note}</small>}
          </article>
        ))}
      </section>
      {columns.length > 0 && (
        <section className="panel tablePanel">
          <div className="panelHeading"><div><h3>Recent activity</h3><p>Live records from the existing business engine.</p></div></div>
          <div className="tableWrap">
            <table><thead><tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}</tr></thead>
              <tbody>{rows.length ? rows.map((row, i) => <tr key={String(row.id ?? i)}>{columns.map(c => <td key={c.key}>{String(row[c.key] ?? '—')}</td>)}</tr>) : <tr><td colSpan={columns.length}><div className="emptyState">No records are available for this view.</div></td></tr>}</tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
