import Link from 'next/link';

export type Card = { label: string; value: string; note?: string };
export type Row = Record<string, unknown>;

export function Workspace({
  title, description, cards, rows = [], columns = [], actions = [],
}: {
  title: string;
  description: string;
  cards: Card[];
  rows?: Row[];
  columns?: { key: string; label: string }[];
  actions?: { label: string; href: string }[];
}) {
  return (
    <div className="workspace">
      <section className="welcome">
        <div>
          <span className="eyebrow">Business workspace</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {actions.length > 0 && (
          <div className="workspaceActions">
            {actions.map((action) => (
              <Link key={action.href} href={action.href}>{action.label}</Link>
            ))}
          </div>
        )}
      </section>
      <section className="metrics">
        {cards.map((card) => (
          <article className="metric" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            {card.note && <small>{card.note}</small>}
          </article>
        ))}
      </section>
      {columns.length > 0 && (
        <section className="panel tablePanel">
          <div className="panelHeading">
            <div>
              <h3>Recent activity</h3>
              <p>Live records from the business records.</p>
            </div>
          </div>
          <div className="tableWrap">
            <table>
              <thead>
                <tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr>
              </thead>
              <tbody>
                {rows.length ? rows.map((row, index) => (
                  <tr key={String(row.id ?? index)}>
                    {columns.map((column) => <td key={column.key}>{String(row[column.key] ?? '—')}</td>)}
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={columns.length}>
                      <div className="emptyState">No records are available for this view.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
