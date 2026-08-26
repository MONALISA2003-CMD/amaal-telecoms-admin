import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { SaleActions } from '@/components/SaleActions';
import { businessGetSafe, money, number } from '@/lib/business';

type Sale = {
  id: string; sale_no: string; status: string; subtotal: number | string; discount_amount: number | string; tax_amount: number | string; grand_total: number | string; currency?: string;
  created_at: string; completed_at?: string; customer_name?: string; customer_phone?: string; customer_email?: string; location_name?: string; cashier_email?: string;
  lines?: { id: string; product_name: string; sku: string; quantity: number | string; unit_price: number | string; discount_amount: number | string; tax_amount: number | string; line_total: number | string }[];
  payments?: { id: string; method: string; amount: number | string; reference?: string; received_at?: string }[];
  history?: { id: string; status: string; notes?: string; created_at: string; actor_email?: string }[];
  approvals?: { id: string; approval_type: string; status: string; reason?: string; requested_at?: string; approved_at?: string; requested_by_email?: string; approved_by_email?: string }[];
};
type Me = { permissions?: string[] };

export default async function SaleDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [sale, me] = await Promise.all([businessGetSafe<Sale>(`/api/sales/${encodeURIComponent(id)}`), businessGetSafe<Me>('/api/me')]);
  if (!me) redirect('/login');
  if (!sale) notFound();
  const permissions = new Set(me.permissions ?? []);

  return <div className="detailWorkspace">
    <div className="detailBack"><Link href="/sales">← Back to Sales</Link></div>
    <section className="workspaceHero">
      <div><span className="eyebrow">Sale detail</span><h2>{sale.sale_no}</h2><p>{sale.customer_name || 'Walk-in customer'} · {sale.location_name || 'Location unavailable'} · {sale.status}</p></div>
      <SaleActions saleId={sale.id} status={sale.status} canVoid={permissions.has('sales.void')} canFinanceSync={permissions.has('finance.sync')} />
    </section>

    <section className="metrics salesMetrics">
      <article className="metric metricFeatured"><span>Total</span><strong>{money(sale.grand_total, sale.currency || 'UGX')}</strong><small>{sale.status}</small></article>
      <article className="metric"><span>Subtotal</span><strong>{money(sale.subtotal, sale.currency || 'UGX')}</strong><small>Before discount and tax</small></article>
      <article className="metric"><span>Discount</span><strong>{money(sale.discount_amount, sale.currency || 'UGX')}</strong><small>Applied to this sale</small></article>
      <article className="metric"><span>Tax</span><strong>{money(sale.tax_amount, sale.currency || 'UGX')}</strong><small>Recorded by the engine</small></article>
    </section>

    <div className="detailGrid">
      <section className="panel"><div className="panelHeading"><div><h3>Sale lines</h3><p>Products and amounts recorded by the existing sales records.</p></div></div><div className="tableWrap"><table><thead><tr><th>Product</th><th>Product code</th><th>Qty</th><th>Unit price</th><th>Discount</th><th>Total</th></tr></thead><tbody>{sale.lines?.length ? sale.lines.map((line) => <tr key={line.id}><td>{line.product_name}</td><td>{line.sku}</td><td>{line.quantity}</td><td>{money(line.unit_price, sale.currency || 'UGX')}</td><td>{money(line.discount_amount, sale.currency || 'UGX')}</td><td>{money(line.line_total, sale.currency || 'UGX')}</td></tr>) : <tr><td colSpan={6}><div className="emptyState">No sale lines are available.</div></td></tr>}</tbody></table></div></section>
      <section className="panel"><div className="panelHeading"><div><h3>Payments</h3><p>Recorded payment methods and references.</p></div></div><div className="stackList">{sale.payments?.length ? sale.payments.map((payment) => <div className="stackItem" key={payment.id}><div><strong>{payment.method}</strong><span>{payment.reference || 'No reference'}</span></div><strong>{money(payment.amount, sale.currency || 'UGX')}</strong></div>) : <div className="emptyState">No payments recorded.</div>}</div></section>
      <section className="panel"><div className="panelHeading"><div><h3>Approval history</h3><p>Existing sales approval records; no new approval system is created here.</p></div></div><div className="stackList">{sale.approvals?.length ? sale.approvals.map((approval) => <div className="stackItem" key={approval.id}><div><strong>{approval.approval_type}</strong><span>{approval.reason || 'No reason recorded'}</span></div><span className="status">{approval.status}</span></div>) : <div className="emptyState">No approval records are attached to this sale.</div>}</div></section>
      <section className="panel"><div className="panelHeading"><div><h3>Status history</h3><p>Operational history from the business records.</p></div></div><div className="timeline">{sale.history?.length ? sale.history.map((item) => <div className="timelineItem" key={item.id}><span className="timelineDot" /><div><strong>{item.status}</strong><span>{item.notes || 'Status updated'} · {item.actor_email || 'Business user'}</span></div></div>) : <div className="emptyState">No status history is available.</div>}</div></section>
    </div>
  </div>;
}
