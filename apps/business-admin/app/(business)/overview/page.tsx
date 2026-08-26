import { redirect } from 'next/navigation';
import { ExecutiveDashboard } from '@/components/ExecutiveDashboard';
import { businessGetSafe } from '@/lib/business';

type Me = { permissions?: string[] };

export default async function Overview() {
  const dashboard = await businessGetSafe<any>('/api/dashboard');
  if (!dashboard) redirect('/login');

  const [bi, sales, inventory, orders, customers, procurement, me, trend, paymentMethods, topProducts] = await Promise.all([
    businessGetSafe<any>('/api/bi/summary'),
    businessGetSafe<any>('/api/sales/summary'),
    businessGetSafe<any>('/api/inventory/summary'),
    businessGetSafe<any>('/api/orders/summary'),
    businessGetSafe<any>('/api/customers/summary'),
    businessGetSafe<any>('/api/procurement/summary'),
    businessGetSafe<Me>('/api/me'),
    businessGetSafe<any[]>('/api/bi/sales-trend'),
    businessGetSafe<any[]>('/api/bi/payment-methods'),
    businessGetSafe<any[]>('/api/bi/products'),
  ]);

  return <ExecutiveDashboard
    dashboard={dashboard}
    bi={bi}
    sales={sales}
    inventory={inventory}
    orders={orders}
    customers={customers}
    procurement={procurement}
    trend={trend ?? []}
    paymentMethods={paymentMethods ?? []}
    topProducts={topProducts ?? []}
    permissions={me?.permissions ?? []}
  />;
}
