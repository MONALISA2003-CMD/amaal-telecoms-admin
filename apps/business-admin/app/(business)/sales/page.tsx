import { redirect } from 'next/navigation';
import { SalesWorkspace, type SalesAnalytics, type SalesSummary } from '@/components/SalesWorkspace';
import { businessGetSafe } from '@/lib/business';

type Me = { permissions?: string[] };

type Sale = { id: string; sale_no: string; status: string; grand_total: number | string; created_at: string; customer_name?: string; location_name?: string; cashier_email?: string; line_count?: number | string; units?: number | string };
type Quote = { id: string; quote_no: string; status: string; grand_total: number | string; customer_name?: string; valid_until?: string; line_count?: number | string };

export default async function SalesPage() {
  const me = await businessGetSafe<Me>('/api/me');
  if (!me) redirect('/login');
  const permissions = new Set(me.permissions ?? []);
  if (!permissions.has('sales.view')) redirect('/overview');

  const [summary, analytics, sales, quotes] = await Promise.all([
    businessGetSafe<SalesSummary>('/api/sales/summary'),
    businessGetSafe<SalesAnalytics>('/api/sales/analytics?days=30'),
    businessGetSafe<Sale[]>('/api/sales?limit=100'),
    permissions.has('sales.quotes') ? businessGetSafe<Quote[]>('/api/sales/quotes') : Promise.resolve(null),
  ]);

  return <SalesWorkspace
    summary={summary}
    analytics={analytics}
    sales={Array.isArray(sales) ? sales : []}
    quotes={Array.isArray(quotes) ? quotes : []}
    canQuoteApprove={permissions.has('sales.approve_discount')}
    canQuoteManage={permissions.has('sales.quotes')}
  />;
}
