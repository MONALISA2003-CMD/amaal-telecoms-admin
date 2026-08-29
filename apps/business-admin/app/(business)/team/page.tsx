import { redirect } from 'next/navigation';
import { businessGetSafe } from '@/lib/business';
import { TeamWorkspace } from '@/components/TeamWorkspace';
type Me={permissions?:string[];isSuperAdmin?:boolean};
export default async function TeamPage(){const me=await businessGetSafe<Me>('/api/me');if(!me)redirect('/login');if(!me.permissions?.includes('staff.view'))redirect('/overview');const [staff,roles,permissions,invitations]=await Promise.all([businessGetSafe<any[]>('/api/staff'),businessGetSafe<any[]>('/api/roles'),businessGetSafe<any[]>('/api/permissions'),businessGetSafe<any[]>('/api/invitations')]);return <TeamWorkspace staff={staff??[]} roles={roles??[]} permissions={permissions??[]} invitations={invitations??[]} canManage={me.permissions.includes('staff.manage')} canRoles={me.permissions.includes('roles.manage')} isSuperAdmin={Boolean(me.isSuperAdmin)}/>}
