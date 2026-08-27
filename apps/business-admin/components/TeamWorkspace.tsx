'use client';

import { useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Archive, CheckCircle2, Pencil, Plus, ShieldCheck, Trash2, Users, X, Building2, UserRoundPen } from 'lucide-react';

type Staff = { id: string; name?: string; email?: string; status?: string; roles?: string[]; created_at?: string; updated_at?: string };
type Role = { id: string; name: string; description?: string; system?: boolean; permissions?: string[] };
type Department = { id: string; name: string; code: string; description?: string; manager_name?: string; user_count?: number; status?: string };

type Props = { active: Staff[]; deleted: Staff[]; roles: Role[]; departments?: Department[]; permissions: string[]; isSuperAdmin: boolean; currentUserId?: string };

async function api(path: string, init: RequestInit = {}) {
  const response = await fetch(`${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...(init.headers || {}) } });
  const text = await response.text();
  let payload: any = null;
  try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }
  if (!response.ok) throw new Error(payload?.error || 'The staff action could not be completed.');
  return payload;
}

function formatDate(value?: string) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('en-UG', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <div className="adminModalBackdrop" role="dialog" aria-modal="true"><div className="adminModal"><header><div><span className="eyebrow">Team management</span><h3>{title}</h3></div><button className="iconButton" onClick={onClose} aria-label="Close"><X size={17} /></button></header>{children}</div></div>;
}

function Field({ label, value, onChange, type = 'text', required = false, placeholder = '' }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; placeholder?: string }) {
  return <label className="adminField"><span>{label}{required ? ' *' : ''}</span><input type={type} required={required} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} /></label>;
}

function RoleSelect({ roles, value, onChange }: { roles: Role[]; value: string; onChange: (value: string) => void }) {
  return <label className="adminField"><span>Role</span><select value={value} onChange={e => onChange(e.target.value)}>{roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}</select></label>;
}

export function TeamWorkspace({ active, deleted, roles, departments = [], permissions, isSuperAdmin, currentUserId }: Props) {
  const [rows, setRows] = useState(active);
  const [deletedRows, setDeletedRows] = useState(deleted);
  const [roleRows, setRoleRows] = useState(roles);
  const [departmentRows, setDepartmentRows] = useState(departments);
  const [modal, setModal] = useState<'add' | 'roles' | 'delete' | 'profile' | 'department' | 'editDepartment' | null>(null);
  const [selected, setSelected] = useState<Staff | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', roleId: roles.find(r => r.name === 'Manager')?.id || roles[0]?.id || '' });
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [confirmation, setConfirmation] = useState('');
  const [profileForm, setProfileForm] = useState({ name: '', phone: '', employeeId: '', jobTitle: '', departmentId: '' });
  const [departmentForm, setDepartmentForm] = useState({ name: '', code: '', description: '', managerId: '' });

  const canManage = isSuperAdmin || permissions.includes('staff.manage');
  const canRoles = isSuperAdmin || permissions.includes('roles.manage');
  const canProfiles = isSuperAdmin || permissions.includes('staff.profile.manage');
  const canDepartments = isSuperAdmin || permissions.includes('departments.manage');
  const availableRoles = useMemo(() => isSuperAdmin ? roleRows : roleRows.filter(role => role.name !== 'Super Admin'), [roleRows, isSuperAdmin]);

  function resetState() { setError(''); setMessage(''); }
  function openAdd() { resetState(); setForm({ name: '', email: '', password: '', roleId: availableRoles.find(r => r.name === 'Manager')?.id || availableRoles[0]?.id || '' }); setModal('add'); }
  function openRoles(person: Staff) { resetState(); setSelected(person); setSelectedRoles((person.roles || []).map(name => roleRows.find(r => r.name === name)?.id).filter(Boolean) as string[]); setModal('roles'); }
  function openProfile(person: Staff) { resetState(); setSelected(person); setProfileForm({ name: person.name || '', phone: '', employeeId: '', jobTitle: '', departmentId: '' }); setModal('profile'); }
  function openDepartment() { resetState(); setSelected(null); setDepartmentForm({ name: '', code: '', description: '', managerId: '' }); setModal('department'); }
  function openEditDepartment(d: Department) { resetState(); setSelected(d as unknown as Staff); setDepartmentForm({ name: d.name || '', code: d.code || '', description: d.description || '', managerId: rows.find(p => p.name === d.manager_name)?.id || '' }); setModal('editDepartment'); }

  async function refresh() {
    const [next, removed, nextRoles, nextDepartments] = await Promise.all([api('/api/staff'), api('/api/staff/deleted'), api('/api/roles'), api('/api/departments')]);
    setRows(Array.isArray(next) ? next : []); setDeletedRows(Array.isArray(removed) ? removed : []); setRoleRows(Array.isArray(nextRoles) ? nextRoles : []); setDepartmentRows(Array.isArray(nextDepartments) ? nextDepartments : []);
  }

  async function addStaff(e: FormEvent) {
    e.preventDefault(); setBusy(true); resetState();
    try { await api('/api/users', { method: 'POST', body: JSON.stringify(form) }); await refresh(); setModal(null); setMessage('Staff account created successfully.'); }
    catch (e: any) { setError(e.message); } finally { setBusy(false); }
  }

  async function saveRoles(e: FormEvent) {
    e.preventDefault(); if (!selected) return; setBusy(true); resetState();
    try { await api(`/api/users/${selected.id}/roles`, { method: 'PUT', body: JSON.stringify({ roleIds: selectedRoles }) }); await refresh(); setModal(null); setMessage('Staff roles updated.'); }
    catch (e: any) { setError(e.message); } finally { setBusy(false); }
  }

  async function toggleStatus(person: Staff) {
    if (!canManage || person.id === currentUserId) return; setBusy(true); resetState();
    try { await api(`/api/users/${person.id}/status`, { method: 'PATCH', body: JSON.stringify({ status: person.status === 'Active' ? 'Suspended' : 'Active' }) }); await refresh(); setMessage(person.status === 'Active' ? 'Staff account deactivated immediately.' : 'Staff account reactivated.'); }
    catch (e: any) { setError(e.message); } finally { setBusy(false); }
  }


  async function saveProfile(e: FormEvent) {
    e.preventDefault(); if (!selected) return; setBusy(true); resetState();
    try { await api(`/api/users/${selected.id}/profile`, { method: 'PATCH', body: JSON.stringify(profileForm) }); await refresh(); setModal(null); setMessage('Staff profile updated.'); }
    catch (e: any) { setError(e.message); } finally { setBusy(false); }
  }


  async function editDepartment(e: FormEvent) {
    e.preventDefault(); if (!selected) return; setBusy(true); resetState();
    try { await api(`/api/departments/${selected.id}`, { method: 'PATCH', body: JSON.stringify(departmentForm) }); await refresh(); setModal(null); setMessage('Department updated.'); }
    catch (e: any) { setError(e.message); } finally { setBusy(false); }
  }

  async function archiveDepartment(d: Department) {
    if (!canDepartments) return; setBusy(true); resetState();
    try { await api(`/api/departments/${d.id}`, { method: 'DELETE' }); await refresh(); setMessage('Department archived.'); }
    catch (e: any) { setError(e.message); } finally { setBusy(false); }
  }

  async function addDepartment(e: FormEvent) {
    e.preventDefault(); setBusy(true); resetState();
    try { await api('/api/departments', { method: 'POST', body: JSON.stringify(departmentForm) }); await refresh(); setModal(null); setMessage('Department created successfully.'); }
    catch (e: any) { setError(e.message); } finally { setBusy(false); }
  }

  async function deleteStaff(e: FormEvent) {
    e.preventDefault(); if (!selected) return; setBusy(true); resetState();
    try { await api(`/api/users/${selected.id}`, { method: 'DELETE', body: JSON.stringify({ confirmation }) }); await refresh(); setModal(null); setConfirmation(''); setMessage('Staff account deleted and moved out of active staff. Historical business records remain preserved.'); }
    catch (e: any) { setError(e.message); } finally { setBusy(false); }
  }

  return <div className="teamWorkspace">
    <section className="welcome"><div><span className="eyebrow">People · Team</span><h2>Team</h2><p>Manage active staff, roles and access while keeping deleted staff safely separated from everyday accounts.</p></div>{canManage && <div className="workspaceActions"><button onClick={openAdd}><Plus size={15} /> Add staff</button></div>}</section>

    {message && <div className="success" role="status">{message}</div>}
    {error && <div className="error" role="alert">{error}</div>}

    <section className="metrics"><article className="metric"><span>Active staff</span><strong>{rows.length}</strong><small>People who can currently access the business workspace.</small></article><article className="metric"><span>Deleted staff</span><strong>{deletedRows.length}</strong><small>Accounts permanently deactivated and kept apart from active staff.</small></article><article className="metric"><span>Available roles</span><strong>{roleRows.length}</strong><small>Roles currently available for staff access.</small></article></section>

    <section className="panel teamPanel"><div className="panelHeading"><div><h3><CheckCircle2 size={16} /> Active staff</h3><p>Only active accounts appear in this everyday staff list.</p></div></div><StaffTable rows={rows} canManage={canManage} isSuperAdmin={isSuperAdmin} currentUserId={currentUserId} onRoles={canRoles ? openRoles : undefined} onProfile={canProfiles ? openProfile : undefined} onToggle={toggleStatus} onDelete={person => { if (!isSuperAdmin || person.id === currentUserId) return; setSelected(person); setConfirmation(''); resetState(); setModal('delete'); }} /></section>

    <section className="panel teamPanel"><div className="panelHeading"><div><h3><Building2 size={16} /> Departments</h3><p>Organise people around the parts of the business they work in.</p></div>{canDepartments && <button className="softAction" onClick={openDepartment}><Plus size={13}/> Add department</button>}</div><div className="tableWrap"><table><thead><tr><th>Department</th><th>Code</th><th>Manager</th><th>People</th><th>Status</th>{canDepartments && <th>Actions</th>}</tr></thead><tbody>{departmentRows.length ? departmentRows.map(d => <tr key={d.id}><td><strong>{d.name}</strong><div className="muted">{d.description || 'Business department'}</div></td><td>{d.code}</td><td>{d.manager_name || 'Not assigned'}</td><td>{d.user_count ?? 0}</td><td><span className={`teamStatus ${d.status === 'Inactive' ? 'deleted' : 'active'}`}>{d.status || 'Active'}</span></td>{canDepartments && <td className="actions"><button className="softAction" onClick={() => openEditDepartment(d)}><Pencil size={13}/> Edit</button>{d.status !== 'Inactive' && (d.user_count ?? 0) === 0 && <button className="dangerAction small" onClick={() => archiveDepartment(d)}><Archive size={13}/> Archive</button>}</td>}</tr>) : <tr><td colSpan={canDepartments ? 6 : 5}><div className="emptyState">No departments have been created yet.</div></td></tr>}</tbody></table></div></section>

    <section className="panel teamPanel deletedStaffPanel"><div className="panelHeading"><div><h3><Archive size={16} /> Deleted staff</h3><p>Accounts removed from active use remain here for clear historical separation.</p></div></div><StaffTable rows={deletedRows} deleted empty="No deleted staff accounts are available." /></section>

    {modal === 'add' && <Modal title="Add staff member" onClose={() => setModal(null)}><form onSubmit={addStaff}><div className="adminFormGrid"><Field label="Full name" required value={form.name} onChange={v => setForm({ ...form, name: v })}/><Field label="Email address" required type="email" value={form.email} onChange={v => setForm({ ...form, email: v })}/><Field label="Temporary password" required type="password" value={form.password} onChange={v => setForm({ ...form, password: v })} placeholder="Use a strong temporary password"/><RoleSelect roles={availableRoles} value={form.roleId} onChange={v => setForm({ ...form, roleId: v })}/></div>{error && <div className="error">{error}</div>}<div className="adminSubmit"><button type="button" onClick={() => setModal(null)}>Cancel</button><button className="primaryAction" disabled={busy}>{busy ? 'Creating…' : 'Create staff account'}</button></div></form></Modal>}

    {modal === 'roles' && selected && <Modal title={`Manage access · ${selected.name || selected.email}`} onClose={() => setModal(null)}><form onSubmit={saveRoles}><p className="muted">Choose the roles this staff member should have. Super Admin access can only be granted by a Super Admin.</p><div className="checkgrid">{availableRoles.map(role => <label className="check" key={role.id}><input type="checkbox" checked={selectedRoles.includes(role.id)} onChange={e => setSelectedRoles(e.target.checked ? [...selectedRoles, role.id] : selectedRoles.filter(id => id !== role.id))}/><span><strong>{role.name}</strong><small>{role.description || 'Business access role'}</small></span></label>)}</div>{isSuperAdmin && <div className="notice"><ShieldCheck size={15}/> Super Admin can grant the highest access role when appropriate.</div>}{error && <div className="error">{error}</div>}<div className="adminSubmit"><button type="button" onClick={() => setModal(null)}>Cancel</button><button className="primaryAction" disabled={busy || !selectedRoles.length}>{busy ? 'Saving…' : 'Save roles'}</button></div></form></Modal>}

    {modal === 'profile' && selected && <Modal title={`Edit staff profile · ${selected.name || selected.email}`} onClose={() => setModal(null)}><form onSubmit={saveProfile}><div className="adminFormGrid"><Field label="Full name" required value={profileForm.name} onChange={v => setProfileForm({ ...profileForm, name: v })}/><Field label="Phone number" value={profileForm.phone} onChange={v => setProfileForm({ ...profileForm, phone: v })}/><Field label="Employee number" value={profileForm.employeeId} onChange={v => setProfileForm({ ...profileForm, employeeId: v })}/><Field label="Job title" value={profileForm.jobTitle} onChange={v => setProfileForm({ ...profileForm, jobTitle: v })}/><label className="adminField"><span>Department</span><select value={profileForm.departmentId} onChange={e => setProfileForm({ ...profileForm, departmentId: e.target.value })}><option value="">No department</option>{departmentRows.filter(d => d.status !== 'Inactive').map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</select></label></div>{error && <div className="error">{error}</div>}<div className="adminSubmit"><button type="button" onClick={() => setModal(null)}>Cancel</button><button className="primaryAction" disabled={busy}>{busy ? 'Saving…' : 'Save profile'}</button></div></form></Modal>}

    {modal === 'editDepartment' && selected && <Modal title={`Edit department · ${selected.name}`} onClose={() => setModal(null)}><form onSubmit={editDepartment}><div className="adminFormGrid"><Field label="Department name" required value={departmentForm.name} onChange={v => setDepartmentForm({ ...departmentForm, name: v })}/><Field label="Department code" required value={departmentForm.code} onChange={v => setDepartmentForm({ ...departmentForm, code: v })}/><Field label="Description" value={departmentForm.description} onChange={v => setDepartmentForm({ ...departmentForm, description: v })}/><label className="adminField"><span>Manager</span><select value={departmentForm.managerId} onChange={e => setDepartmentForm({ ...departmentForm, managerId: e.target.value })}><option value="">No manager</option>{rows.map(person => <option key={person.id} value={person.id}>{person.name || person.email}</option>)}</select></label></div>{error && <div className="error">{error}</div>}<div className="adminSubmit"><button type="button" onClick={() => setModal(null)}>Cancel</button><button className="primaryAction" disabled={busy}>{busy ? 'Saving…' : 'Save department'}</button></div></form></Modal>}

    {modal === 'department' && <Modal title="Add department" onClose={() => setModal(null)}><form onSubmit={addDepartment}><div className="adminFormGrid"><Field label="Department name" required value={departmentForm.name} onChange={v => setDepartmentForm({ ...departmentForm, name: v })}/><Field label="Department code" required value={departmentForm.code} onChange={v => setDepartmentForm({ ...departmentForm, code: v })}/><Field label="Description" value={departmentForm.description} onChange={v => setDepartmentForm({ ...departmentForm, description: v })}/><label className="adminField"><span>Manager</span><select value={departmentForm.managerId} onChange={e => setDepartmentForm({ ...departmentForm, managerId: e.target.value })}><option value="">No manager</option>{rows.map(person => <option key={person.id} value={person.id}>{person.name || person.email}</option>)}</select></label></div>{error && <div className="error">{error}</div>}<div className="adminSubmit"><button type="button" onClick={() => setModal(null)}>Cancel</button><button className="primaryAction" disabled={busy}>{busy ? 'Creating…' : 'Create department'}</button></div></form></Modal>}

    {modal === 'delete' && selected && <Modal title="Delete staff account" onClose={() => setModal(null)}><form onSubmit={deleteStaff}><p>This permanently disables the staff identity and moves it out of active staff while preserving historical business records.</p><Field label="Type the staff email to confirm" required value={confirmation} onChange={setConfirmation} placeholder={selected.email}/>{error && <div className="error">{error}</div>}<div className="adminSubmit"><button type="button" onClick={() => setModal(null)}>Cancel</button><button className="dangerAction" disabled={busy || confirmation !== selected.email}>{busy ? 'Deleting…' : 'Delete staff account'}</button></div></form></Modal>}
  </div>;
}

function StaffTable({ rows, deleted = false, canManage = false, isSuperAdmin = false, currentUserId, onRoles, onProfile, onToggle, onDelete, empty = 'No active staff accounts are available.' }: { rows: Staff[]; deleted?: boolean; canManage?: boolean; isSuperAdmin?: boolean; currentUserId?: string; onRoles?: (person: Staff) => void; onProfile?: (person: Staff) => void; onToggle?: (person: Staff) => void; onDelete?: (person: Staff) => void; empty?: string }) {
  return <div className="tableWrap"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>{deleted ? 'Removed' : 'Joined'}</th>{!deleted && canManage && <th>Actions</th>}</tr></thead><tbody>{rows.length ? rows.map(person => <tr key={person.id}><td><div className="teamName"><span className="teamAvatar"><Users size={14}/></span><strong>{person.name || '—'}</strong></div></td><td>{person.email || '—'}</td><td>{Array.isArray(person.roles) && person.roles.length ? person.roles.join(', ') : 'Staff'}</td><td><span className={`teamStatus ${deleted ? 'deleted' : 'active'}`}>{deleted ? 'Deleted' : person.status || 'Active'}</span></td><td>{formatDate(deleted ? person.updated_at : person.created_at)}</td>{!deleted && canManage && <td className="actions">{onProfile && <button className="softAction" onClick={() => onProfile(person)}><UserRoundPen size={13}/> Profile</button>}<button className="softAction" onClick={() => onRoles?.(person)}><Pencil size={13}/> Roles</button>{person.id !== currentUserId && <button className="softAction" onClick={() => onToggle?.(person)}><ShieldCheck size={13}/> {person.status === 'Active' ? 'Deactivate' : 'Activate'}</button>}{isSuperAdmin && person.id !== currentUserId && <button className="dangerAction small" onClick={() => onDelete?.(person)}><Trash2 size={13}/> Delete</button>}</td>}</tr>) : <tr><td colSpan={deleted || !canManage ? 5 : 6}><div className="emptyState">{empty}</div></td></tr>}</tbody></table></div>;
}

