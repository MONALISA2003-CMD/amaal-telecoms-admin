import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CircleUserRound } from 'lucide-react';
import { businessGetSafe } from '@/lib/business';
type Props = { params: Promise<{ id: string }> };
export default async function CustomerDetailPage({ params }: Props) {
  const { id } = await params; const me = await businessGetSafe<any>('/api/me');
  if (!me?.permissions?.includes('customers.view')) redirect('/overview');
  const detail = await businessGetSafe<any>(`/api/customers/${encodeURIComponent(id)}/360`); if (!detail) notFound();
  const c = detail.customer;
  return <div className="customerStandalone"><Link href="/customers" className="backLink"><ArrowLeft size={15}/> Back to customers</Link><div className="panel standaloneHead"><span className="standaloneAvatar"><CircleUserRound size={24}/></span><div><span className="eyebrow">Customer {c.customer_no}</span><h2>{c.name}</h2><p>{c.company_name || c.customer_type || 'Customer'}</p></div></div><div className="panel"><h3>Customer relationship</h3><p className="standaloneHint">This record connects the customer across sales, orders, credit, service, deliveries and follow-up.</p><div className="standaloneGrid">{[['Sales',detail.sales?.length||0],['Orders',detail.orders?.length||0],['Credit accounts',detail.credit?.length||0],['Service cases',detail.warranty?.length||0],['Returns',detail.returns?.length||0],['Deliveries',detail.deliveries?.length||0]].map(([label,value])=><div key={String(label)}><span>{label}</span><strong>{value}</strong></div>)}</div></div></div>;
}
