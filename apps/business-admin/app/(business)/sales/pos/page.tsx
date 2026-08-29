import { redirect } from 'next/navigation';
import { POSWorkspace, type PosLocation } from '@/components/POSWorkspace';
import { businessGetSafe } from '@/lib/business';

type Me = { permissions?: string[] };

export default async function SalesPOSPage() {
  const me = await businessGetSafe<Me>('/api/me');
  if (!me) redirect('/login');
  const permissions = new Set(me.permissions ?? []);
  if (!permissions.has('sales.view')) redirect('/overview');
  const locations = await businessGetSafe<PosLocation[]>('/api/inventory/locations');
  return <POSWorkspace locations={Array.isArray(locations) ? locations : []} />;
}
