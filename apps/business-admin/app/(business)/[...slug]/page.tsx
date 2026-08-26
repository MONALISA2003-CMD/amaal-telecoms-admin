import { notFound } from 'next/navigation';
import { Workspace, type Card } from '@/components/Workspace';
import { PurchasingWorkspace } from '@/components/PurchasingWorkspace';
import { businessGetSafe, money, number } from '@/lib/business';

type Params = { slug: string[] };
type ApiRecord = Record<string, any>;

const titles: Record<string, [string, string]> = {
  sales: ['Sales', 'Monitor sales activity and move into the existing POS and sales workflows.'],
  products: ['Products', 'Manage the business catalogue using the business product and pricing records.'],
  stock: ['Stock', 'See stock position, locations and replenishment pressure from the business stock records.'],
  purchasing: ['Purchasing', 'Monitor supplier procurement, purchase orders and receiving.'],
  customers: ['Customers', 'Manage customer relationships and understand outstanding balances and service workload.'],
  orders: ['Orders', 'Track customer orders from payment through fulfilment and delivery.'],
  finance: ['Finance', 'Review the authoritative accounting position from the business finance records.'],
  credit: ['Credit', 'Monitor customer credit exposure, applications and amounts due.'],
  delivery: ['Delivery', 'Monitor shipments, delivery workload and exceptions.'],
  service: ['Service', 'Keep returns, warranty and repair work visible in one business workspace.'],
  website: ['Website', 'Manage the connected public website without exposing technical hosting controls.'],
  reports: ['Reports', 'Use the business performance records for cross-business performance.'],
  team: ['Team', 'Review the people and access information available to your role.'],
  settings: ['Business Settings', 'Review the business configuration exposed to your role.'],
};


function makeCards(entries: ReadonlyArray<readonly [string, unknown]>): Card[] {
  return entries.map(([label, value]) => ({
    label: String(label),
    value: value == null ? '—' : String(value),
  }));
}

export default async function BusinessWorkspace({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (slug.length !== 1 || !titles[slug[0]]) notFound();
  const key = slug[0];
  const [title, description] = titles[key];

  if (key === 'sales') {
    const d = await businessGetSafe<ApiRecord>('/api/sales/summary');
    const rows = await businessGetSafe<any>('/api/sales?limit=12');
    return <Workspace title={title} description={description} actions={[{ label: 'Refresh sales', href: '/sales' }]}
      cards={makeCards([
        ['Sales value', number(d?.today?.total)],
        ['Transactions', number(d?.today?.count)],
        ['Open drafts', number(d?.openDrafts)],
        ['Units sold', number(d?.unitsToday)],
      ])}
      rows={Array.isArray(rows) ? rows : rows?.rows} columns={[{ key: 'sale_no', label: 'Sale' }, { key: 'status', label: 'Status' }, { key: 'grand_total', label: 'Amount' }, { key: 'created_at', label: 'Date' }]} />;
  }

  if (key === 'products') {
    const [summary, products] = await Promise.all([
      businessGetSafe<ApiRecord>('/api/catalog/summary'),
      businessGetSafe<any>('/api/catalog/products?limit=15'),
    ]);
    return <Workspace title={title} description={description} actions={[{ label: 'Catalogue', href: '/products' }]}
      cards={makeCards([
        ['Products', number(summary?.products)],
        ['Active brands', number(summary?.brands)],
        ['Categories', number(summary?.categories)],
        ['Published online', number(summary?.published)],
      ])}
      rows={products?.rows ?? []} columns={[{ key: 'name', label: 'Product' }, { key: 'brand_name', label: 'Brand' }, { key: 'category_name', label: 'Category' }, { key: 'variant_count', label: 'Variants' }, { key: 'min_price', label: 'From' }]} />;
  }

  if (key === 'stock') {
    const [summary, overview] = await Promise.all([
      businessGetSafe<ApiRecord>('/api/inventory/summary'),
      businessGetSafe<any>('/api/inventory/overview'),
    ]);
    return <Workspace title={title} description={description} actions={[{ label: 'Refresh stock', href: '/stock' }]}
      cards={makeCards([
        ['Stock units', number(summary?.onHand)],
        ['Reserved units', number(summary?.reserved)],
        ['Low-stock lines', number(summary?.lowStock)],
        ['Locations', number(summary?.locations)],
      ])}
      rows={overview?.lowStock ?? []} columns={[{ key: 'product_name', label: 'Product' }, { key: 'sku', label: 'Product code' }, { key: 'location_name', label: 'Location' }, { key: 'available', label: 'Available' }, { key: 'reorder_point', label: 'Reorder point' }]} />;
  }

  if (key === 'purchasing') {
    const [me, summary, suppliers, requisitions, orders, receipts, invoices, payments, analytics, readiness, variants, departments] = await Promise.all([
      businessGetSafe<ApiRecord>('/api/me'),
      businessGetSafe<ApiRecord>('/api/procurement/summary'),
      businessGetSafe<any[]>('/api/suppliers?limit=200'),
      businessGetSafe<any[]>('/api/procurement/requisitions'),
      businessGetSafe<any[]>('/api/procurement/orders'),
      businessGetSafe<any[]>('/api/procurement/receipts'),
      businessGetSafe<any[]>('/api/procurement/invoices'),
      businessGetSafe<any[]>('/api/procurement/payments'),
      businessGetSafe<ApiRecord>('/api/procurement/control-center'),
      businessGetSafe<ApiRecord>('/api/procurement/readiness'),
      businessGetSafe<any[]>('/api/catalog/variants'),
      businessGetSafe<any[]>('/api/departments'),
    ]);
    return <PurchasingWorkspace summary={summary} suppliers={suppliers ?? []} requisitions={requisitions ?? []} orders={orders ?? []} receipts={receipts ?? []} invoices={invoices ?? []} payments={payments ?? []} analytics={analytics ?? {}} readiness={readiness ?? {}} variants={variants ?? []} departments={departments ?? []} permissions={me?.permissions ?? []}/>;
  }

  if (key === 'customers') {
    const [summary, result] = await Promise.all([
      businessGetSafe<ApiRecord>('/api/customers/summary'),
      businessGetSafe<any>('/api/customers?limit=15'),
    ]);
    return <Workspace title={title} description={description} actions={[{ label: 'Customer directory', href: '/customers' }]}
      cards={makeCards([
        ['Customers', number(summary?.customers)],
        ['Active', number(summary?.active)],
        ['New in 30 days', number(summary?.new30d)],
        ['Outstanding balance', money(summary?.outstandingBalance)],
      ])}
      rows={Array.isArray(result) ? result : result?.rows ?? []} columns={[{ key: 'customer_no', label: 'Customer' }, { key: 'name', label: 'Name' }, { key: 'phone', label: 'Phone' }, { key: 'outstanding_balance', label: 'Balance' }, { key: 'open_cases', label: 'Open cases' }]} />;
  }

  if (key === 'orders') {
    const [summary, result] = await Promise.all([
      businessGetSafe<ApiRecord>('/api/orders/summary'),
      businessGetSafe<any>('/api/orders?limit=15'),
    ]);
    return <Workspace title={title} description={description} cards={makeCards([
      ['Total orders', number(summary?.total)],
      ['Pending payment', number(summary?.pending)],
      ['Processing', number(summary?.processing)],
      ['Dispatched', number(summary?.dispatched)],
    ])}
      rows={Array.isArray(result) ? result : result?.rows ?? []} columns={[{ key: 'order_no', label: 'Order' }, { key: 'status', label: 'Status' }, { key: 'payment_status', label: 'Payment' }, { key: 'customer_name', label: 'Customer' }, { key: 'grand_total', label: 'Total' }]} />;
  }

  if (key === 'finance') {
    const summary = await businessGetSafe<ApiRecord>('/api/finance/summary');
    return <Workspace title={title} description={description} cards={makeCards([
      ['Revenue', money(summary?.revenue)],
      ['Expenses', money(summary?.expenses)],
      ['Net result', money(summary?.net)],
      ['Receivables', money(summary?.receivables)],
      ['Payables', money(summary?.payables)],
    ])} />;
  }

  if (key === 'credit') {
    const summary = await businessGetSafe<ApiRecord>('/api/credit/summary');
    return <Workspace title={title} description={description} cards={makeCards([
      ['Active profiles', number(summary?.profiles)],
      ['Pending applications', number(summary?.pendingApplications)],
      ['Active accounts', number(summary?.activeAccounts)],
      ['Outstanding credit', money(summary?.outstanding)],
      ['Due balance', money(summary?.dueBalance)],
    ])} />;
  }

  if (key === 'delivery') {
    const summary = await businessGetSafe<ApiRecord>('/api/delivery/summary');
    return <Workspace title={title} description={description} cards={makeCards([
      ['Total shipments', number(summary?.total)],
      ['Pending', number(summary?.pending)],
      ['In transit', number(summary?.transit)],
      ['Out for delivery', number(summary?.outForDelivery)],
      ['Failed', number(summary?.failed)],
    ])} />;
  }

  if (key === 'service') {
    const [returns, warranty] = await Promise.all([
      businessGetSafe<ApiRecord>('/api/returns/summary'),
      businessGetSafe<ApiRecord>('/api/warranty/summary'),
    ]);
    return <Workspace title={title} description={description} cards={makeCards([
      ['Returns awaiting action', number(returns?.requested)],
      ['Refunds pending', number(returns?.refundPending)],
      ['Warranty cases open', number(warranty?.open)],
      ['Repairs in progress', number(warranty?.inRepair)],
      ['Ready for collection', number(warranty?.ready)],
    ])} />;
  }

  if (key === 'website') {
    const sites = await businessGetSafe<any>('/api/web/sites');
    return <Workspace title={title} description={description} cards={makeCards([
      ['Connected sites', number(Array.isArray(sites) ? sites.length : null)],
      ['Business-owned content', 'Approved'],
      ['Publishing', 'Permission controlled'],
      ['Technical hosting', 'Console only'],
    ])}
      rows={Array.isArray(sites) ? sites : []} columns={[{ key: 'name', label: 'Site' }, { key: 'slug', label: 'Slug' }, { key: 'status', label: 'Status' }, { key: 'primary_domain', label: 'Domain' }]} />;
  }

  if (key === 'reports') {
    const summary = await businessGetSafe<ApiRecord>('/api/bi/summary');
    const marginPercent = summary?.grossMarginPct == null ? '—' : `${Number(summary.grossMarginPct).toFixed(1)}%`;
    return <Workspace title={title} description={description} cards={makeCards([
      ['Revenue', money(summary?.sales?.revenue)],
      ['Gross margin', money(summary?.margin?.gross_margin)],
      ['Orders', number(summary?.orders?.total)],
      ['Net sales', money(summary?.netSales)],
      ['Gross margin %', marginPercent],
    ])} />;
  }

  if (key === 'team') {
    const staff = await businessGetSafe<any>('/api/staff');
    return <Workspace title={title} description={description} cards={makeCards([
      ['Team members', number(Array.isArray(staff) ? staff.length : null)],
      ['Access control', 'Backend enforced'],
      ['Technical administration', 'Console only'],
    ])}
      rows={Array.isArray(staff) ? staff : []} columns={[{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'status', label: 'Status' }, { key: 'roles', label: 'Roles' }]} />;
  }

  if (key === 'settings') {
    const organization = await businessGetSafe<ApiRecord>('/api/organization');
    return <Workspace title={title} description={description} cards={makeCards([
      ['Business', organization?.trading_name ?? organization?.legal_name ?? '—'],
      ['Currency', 'UGX'],
      ['Timezone', 'Africa/Kampala'],
      ['Business records', 'Connected'],
    ])} />;
  }

  return notFound();
}
