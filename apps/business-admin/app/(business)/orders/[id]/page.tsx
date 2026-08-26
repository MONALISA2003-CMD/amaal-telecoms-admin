import { notFound, redirect } from 'next/navigation';
import { businessGetSafe } from '@/lib/business';
import { OrderDetail } from '@/components/OrdersWorkspace';

type Params = { id: string };
type Me = { permissions?: string[] };

export default async function OrderDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const me = await businessGetSafe<Me>('/api/me');
  const permissions = me?.permissions ?? [];
  if (!permissions.includes('orders.view')) redirect('/overview');
  const order = await businessGetSafe<any>(`/api/orders/${encodeURIComponent(id)}`);
  if (!order) notFound();
  return <OrderDetail order={order} permissions={permissions} />;
}
