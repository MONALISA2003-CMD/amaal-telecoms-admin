import { redirect } from 'next/navigation';
import { businessGetSafe } from '@/lib/business';
import { OrdersWorkspace } from '@/components/OrdersWorkspace';

type Me = { permissions?: string[] };

export default async function OrdersPage() {
  const me = await businessGetSafe<Me>('/api/me');
  const permissions = me?.permissions ?? [];
  if (!permissions.includes('orders.view')) redirect('/overview');
  const [summary, analytics, orders, customers, locations, variants] = await Promise.all([
    businessGetSafe<any>('/api/orders/summary'),
    businessGetSafe<any>('/api/orders/analytics?days=30'),
    businessGetSafe<any[]>('/api/orders?limit=200'),
    businessGetSafe<any[]>('/api/customers?limit=500'),
    businessGetSafe<any[]>('/api/inventory/locations'),
    businessGetSafe<any[]>('/api/catalog/variants'),
  ]);
  return <OrdersWorkspace summary={summary ?? {}} analytics={analytics ?? {}} orders={Array.isArray(orders) ? orders : []} customers={Array.isArray(customers) ? customers : []} locations={Array.isArray(locations) ? locations : []} variants={Array.isArray(variants) ? variants : []} permissions={permissions} />;
}
