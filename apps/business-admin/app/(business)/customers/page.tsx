import { redirect } from 'next/navigation';
import { CustomerWorkspace } from '@/components/CustomerWorkspace';
import { businessGetSafe } from '@/lib/business';
type Me = { permissions?: string[] };
export default async function CustomersPage() {
  const me = await businessGetSafe<Me>('/api/me'); const permissions = me?.permissions ?? [];
  if (!permissions.includes('customers.view')) redirect('/overview');
  const [summary, result, groups, tasks, cases] = await Promise.all([businessGetSafe<any>('/api/customers/summary'),businessGetSafe<any>('/api/customers?limit=200&offset=0'),businessGetSafe<any[]>('/api/customer-groups'),businessGetSafe<any[]>('/api/crm/tasks/all'),businessGetSafe<any[]>('/api/support/cases')]);
  return <CustomerWorkspace summary={summary} customers={Array.isArray(result) ? result : result?.rows ?? []} total={Array.isArray(result) ? result.length : result?.total ?? 0} groups={groups ?? []} tasks={tasks ?? []} cases={cases ?? []} permissions={permissions} />;
}
