import { Archive, CheckCircle2, Users } from 'lucide-react';

type Staff = {
  id: string;
  name?: string;
  email?: string;
  status?: string;
  roles?: string[];
  created_at?: string;
  updated_at?: string;
};

function formatDate(value?: string) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('en-UG', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

export function TeamWorkspace({ active, deleted }: { active: Staff[]; deleted: Staff[] }) {
  return <div className="teamWorkspace">
    <section className="welcome">
      <div><span className="eyebrow">People · Team</span><h2>Team</h2><p>Keep active staff easy to find and keep deactivated staff safely separated from everyday accounts.</p></div>
    </section>

    <section className="metrics">
      <article className="metric"><span>Active staff</span><strong>{active.length}</strong><small>People who can currently access the business workspace.</small></article>
      <article className="metric"><span>Deleted staff</span><strong>{deleted.length}</strong><small>Accounts permanently deactivated and kept apart from active staff.</small></article>
    </section>

    <section className="panel teamPanel">
      <div className="panelHeading"><div><h3><CheckCircle2 size={16} /> Active staff</h3><p>Only active accounts appear in this everyday staff list.</p></div></div>
      <StaffTable rows={active} empty="No active staff accounts are available." />
    </section>

    <section className="panel teamPanel deletedStaffPanel">
      <div className="panelHeading"><div><h3><Archive size={16} /> Deleted staff</h3><p>Accounts removed from active use remain here for clear historical separation.</p></div></div>
      <StaffTable rows={deleted} deleted />
    </section>
  </div>;
}

function StaffTable({ rows, deleted = false, empty = 'No deleted staff accounts are available.' }: { rows: Staff[]; deleted?: boolean; empty?: string }) {
  return <div className="tableWrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>{deleted ? 'Removed' : 'Joined'}</th></tr></thead><tbody>{rows.length ? rows.map((person) => <tr key={person.id}><td><div className="teamName"><span className="teamAvatar"><Users size={14} /></span><strong>{person.name || '—'}</strong></div></td><td>{person.email || '—'}</td><td>{Array.isArray(person.roles) && person.roles.length ? person.roles.join(', ') : 'Staff'}</td><td><span className={`teamStatus ${deleted ? 'deleted' : 'active'}`}>{deleted ? 'Deleted' : 'Active'}</span></td><td>{formatDate(deleted ? person.updated_at : person.created_at)}</td></tr>) : <tr><td colSpan={5}><div className="emptyState">{empty}</div></td></tr>}</tbody></table></div>;
}
