import { notFound } from 'next/navigation';
import { Workspace } from '@/components/Workspace';
import { PurchasingWorkspace } from '@/components/PurchasingWorkspace';
import { FinanceWorkspace } from '@/components/FinanceWorkspace';
import { CreditWorkspace } from '@/components/CreditWorkspace';
import { TeamWorkspace } from '@/components/TeamWorkspace';
import { DeliveryWorkspace } from '@/components/DeliveryWorkspace';
import { ServiceWorkspace } from '@/components/ServiceWorkspace';
import { ReportsWorkspace } from '@/components/ReportsWorkspace';
import { ReviewsWorkspace } from '@/components/ReviewsWorkspace';
import { WebsiteWorkspace } from '@/components/WebsiteWorkspace';
import { businessGetSafe, cardEntries, money, number } from '@/lib/business';

type Params = { slug: string[] };
type ApiRecord = Record<string, any>;

const titles: Record<string, [string, string]> = {
  sales: ['Sales', 'Monitor sales activity and move into the existing POS and sales workflows.'],
  products: ['Products', 'Manage the business catalogue using the business product and pricing records.'],
  stock: ['Stock', 'See stock position, locations and replenishment pressure from the business stock records.'],
  purchasing: ['Purchasing', 'Monitor supplier procurement, purchase orders and receiving.'],
  customers: ['Customers', 'Manage customer relationships and understand outstanding balances and service workload.'],
  reviews: ['Reviews & Q&A', 'Moderate customer reviews and product questions.'],
  orders: ['Orders', 'Track customer orders from payment through fulfilment and delivery.'],
  finance: ['Finance', 'Review the authoritative accounting position from the business finance records.'],
  credit: ['Credit', 'Monitor customer credit exposure, applications and amounts due.'],
  delivery: ['Delivery', 'Monitor shipments, delivery workload and exceptions.'],
  service: ['Service', 'Keep returns, warranty and repair work visible in one business workspace.'],
  website: ['Website', 'Manage the connected public website without exposing hosting controls.'],
  reports: ['Reports', 'Use the business performance records for cross-business performance.'],
  team: ['Team', 'Review the people and access information available to your role.'],
  settings: ['Business Settings', 'Review the business configuration exposed to your role.'],
};


export default async function BusinessWorkspace({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (slug.length !== 1 || !titles[slug[0]]) notFound();
  const key = slug[0];
  const [title, description] = titles[key];

  if (key === 'sales') {
    const d = await businessGetSafe<ApiRecord>('/api/sales/summary');
    const rows = await businessGetSafe<any>('/api/sales?limit=12');
    return <Workspace title={title} description={description} actions={[{ label: 'Refresh sales', href: '/sales' }]}
      cards={cardEntries([
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
      cards={cardEntries([
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
      cards={cardEntries([
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
      cards={cardEntries([
        ['Customers', number(summary?.customers)],
        ['Active', number(summary?.active)],
        ['New in 30 days', number(summary?.new30d)],
        ['Outstanding balance', money(summary?.outstandingBalance)],
      ])}
      rows={Array.isArray(result) ? result : result?.rows ?? []} columns={[{ key: 'customer_no', label: 'Customer' }, { key: 'name', label: 'Name' }, { key: 'phone', label: 'Phone' }, { key: 'outstanding_balance', label: 'Balance' }, { key: 'open_cases', label: 'Open cases' }]} />;
  }

  if (key === 'reviews') {
    const [me, reviews, questions] = await Promise.all([businessGetSafe<ApiRecord>('/api/me'), businessGetSafe<any[]>('/api/catalog/reviews'), businessGetSafe<any[]>('/api/catalog/questions')]);
    return <ReviewsWorkspace reviews={reviews ?? []} questions={questions ?? []} permissions={me?.permissions ?? []} />;
  }

  if (key === 'orders') {
    const [summary, result] = await Promise.all([
      businessGetSafe<ApiRecord>('/api/orders/summary'),
      businessGetSafe<any>('/api/orders?limit=15'),
    ]);
    return <Workspace title={title} description={description} cards={cardEntries([
      ['Total orders', number(summary?.total)],
      ['Pending payment', number(summary?.pending)],
      ['Processing', number(summary?.processing)],
      ['Dispatched', number(summary?.dispatched)],
    ])}
      rows={Array.isArray(result) ? result : result?.rows ?? []} columns={[{ key: 'order_no', label: 'Order' }, { key: 'status', label: 'Status' }, { key: 'payment_status', label: 'Payment' }, { key: 'customer_name', label: 'Customer' }, { key: 'grand_total', label: 'Total' }]} />;
  }

  if (key === 'finance') {
    const [me, summary, pnl, balanceSheet, receivables, payables, accounts, cashAccounts, expenses, bankTransactions, taxes, periods, journals] = await Promise.all([
      businessGetSafe<ApiRecord>('/api/me'),
      businessGetSafe<ApiRecord>('/api/finance/summary'),
      businessGetSafe<ApiRecord>('/api/finance/profit-loss'),
      businessGetSafe<ApiRecord>('/api/finance/balance-sheet'),
      businessGetSafe<any[]>('/api/finance/receivables'),
      businessGetSafe<any[]>('/api/finance/payables'),
      businessGetSafe<any[]>('/api/finance/accounts'),
      businessGetSafe<any[]>('/api/finance/cash-accounts'),
      businessGetSafe<any[]>('/api/finance/expenses'),
      businessGetSafe<any[]>('/api/finance/bank-transactions'),
      businessGetSafe<any[]>('/api/finance/taxes'),
      businessGetSafe<any[]>('/api/finance/periods'),
      businessGetSafe<any[]>('/api/finance/journals'),
    ]);
    return <FinanceWorkspace summary={summary ?? {}} pnl={pnl ?? {}} balanceSheet={balanceSheet ?? {}} receivables={receivables ?? []} payables={payables ?? []} accounts={accounts ?? []} cashAccounts={cashAccounts ?? []} expenses={expenses ?? []} bankTransactions={bankTransactions ?? []} taxes={taxes ?? []} periods={periods ?? []} journals={journals ?? []} permissions={me?.permissions ?? []}/>;
  }

  if (key === 'credit') {
    const [me, summary, profiles, applications, accounts, customers] = await Promise.all([
      businessGetSafe<ApiRecord>('/api/me'),
      businessGetSafe<ApiRecord>('/api/credit/summary'),
      businessGetSafe<any[]>('/api/credit/profiles'),
      businessGetSafe<any[]>('/api/credit/applications'),
      businessGetSafe<any[]>('/api/credit/accounts'),
      businessGetSafe<any>('/api/customers?limit=500'),
    ]);
    const customerRows = Array.isArray(customers) ? customers : customers?.rows ?? [];
    return <CreditWorkspace summary={summary ?? {}} profiles={profiles ?? []} applications={applications ?? []} accounts={accounts ?? []} customers={customerRows} permissions={me?.permissions ?? []}/>;
  }

  if (key === 'service') {
    const [me, returnsSummary, warrantySummary, returns, claims, policies, partners, customers, orders, sales, variants, locations, staff] = await Promise.all([
      businessGetSafe<ApiRecord>('/api/me'),
      businessGetSafe<ApiRecord>('/api/returns/summary'),
      businessGetSafe<ApiRecord>('/api/warranty/summary'),
      businessGetSafe<any[]>('/api/returns'),
      businessGetSafe<any[]>('/api/warranty/claims'),
      businessGetSafe<any[]>('/api/warranty/policies'),
      businessGetSafe<any[]>('/api/warranty/partners'),
      businessGetSafe<any[]>('/api/customers?limit=200'),
      businessGetSafe<any>('/api/orders?limit=200'),
      businessGetSafe<any>('/api/sales?limit=200'),
      businessGetSafe<any[]>('/api/catalog/variants'),
      businessGetSafe<any[]>('/api/inventory/locations'),
      businessGetSafe<any[]>('/api/staff'),
    ]);
    return <ServiceWorkspace
      returnsSummary={returnsSummary ?? {}}
      warrantySummary={warrantySummary ?? {}}
      returns={returns ?? []}
      claims={claims ?? []}
      policies={policies ?? []}
      partners={partners ?? []}
      customers={customers ?? []}
      orders={Array.isArray(orders) ? orders : orders?.rows ?? []}
      sales={Array.isArray(sales) ? sales : sales?.rows ?? []}
      variants={variants ?? []}
      locations={locations ?? []}
      staff={staff ?? []}
      permissions={me?.permissions ?? []}
    />;
  }

  if (key === 'delivery') {
    const [me, summary, shipments, zones, partners, orders, drivers] = await Promise.all([
      businessGetSafe<ApiRecord>('/api/me'),
      businessGetSafe<ApiRecord>('/api/delivery/summary'),
      businessGetSafe<any[]>('/api/delivery/shipments'),
      businessGetSafe<any[]>('/api/delivery/zones'),
      businessGetSafe<any[]>('/api/delivery/partners'),
      businessGetSafe<any[]>('/api/orders?limit=300'),
      businessGetSafe<any[]>('/api/delivery/drivers'),
    ]);
    return <DeliveryWorkspace summary={summary ?? {}} shipments={shipments ?? []} zones={zones ?? []} partners={partners ?? []} orders={orders ?? []} drivers={drivers ?? []} permissions={me?.permissions ?? []} isSuperAdmin={Boolean(me?.isSuperAdmin)} />;
  }


  if (key === 'website') {
    const [me, sites] = await Promise.all([
      businessGetSafe<ApiRecord>('/api/me'),
      businessGetSafe<any[]>('/api/web/sites'),
    ]);
    return <WebsiteWorkspace sites={Array.isArray(sites) ? sites : []} permissions={me?.permissions ?? []} />;
  }

  if (key === 'reports') {
    const me = await businessGetSafe<ApiRecord>('/api/me');
    const [summary, trend, products, customers, procurement, delivery, warranty, returns, finance, tax, website, snapshots] = await Promise.all([
      businessGetSafe<any>('/api/bi/summary'),
      businessGetSafe<any[]>('/api/bi/sales-trend'),
      businessGetSafe<any[]>('/api/bi/products'),
      businessGetSafe<any[]>('/api/bi/customers'),
      businessGetSafe<any[]>('/api/bi/procurement'),
      businessGetSafe<any[]>('/api/bi/delivery'),
      businessGetSafe<any[]>('/api/bi/warranty'),
      businessGetSafe<any[]>('/api/bi/returns'),
      businessGetSafe<any[]>('/api/bi/finance'),
      businessGetSafe<any>('/api/bi/tax'),
      businessGetSafe<any>('/api/bi/website-activity'),
      businessGetSafe<any[]>('/api/bi/snapshots'),
    ]);
    return <ReportsWorkspace
      summary={summary}
      trend={trend ?? []}
      products={products ?? []}
      customers={customers ?? []}
      procurement={procurement ?? []}
      delivery={delivery ?? []}
      warranty={warranty ?? []}
      returns={returns ?? []}
      finance={finance ?? []}
      tax={tax}
      website={website}
      snapshots={snapshots ?? []}
      canManage={Boolean(me?.permissions?.includes('bi.manage'))}
      canExport={Boolean(me?.permissions?.includes('bi.export'))}
    />;
  }

  if (key === 'team') {
    const me = await businessGetSafe<ApiRecord>('/api/me');
    const [staff, roles, permissions, invitations] = await Promise.all([
      businessGetSafe<any[]>('/api/staff'),
      businessGetSafe<any[]>('/api/roles'),
      businessGetSafe<any[]>('/api/permissions'),
      businessGetSafe<any[]>('/api/invitations'),
    ]);
    return <TeamWorkspace
      staff={staff ?? []}
      roles={roles ?? []}
      permissions={permissions ?? []}
      invitations={invitations ?? []}
      canManage={Boolean(me?.permissions?.includes('staff.manage'))}
      canRoles={Boolean(me?.permissions?.includes('roles.manage'))}
      isSuperAdmin={Boolean(me?.isSuperAdmin)}
    />;
  }

  if (key === 'settings') {
    const organization = await businessGetSafe<ApiRecord>('/api/organization');
    return <Workspace title={title} description={description} cards={cardEntries([
      ['Business', organization?.trading_name ?? organization?.legal_name ?? '—'],
      ['Currency', 'UGX'],
      ['Timezone', 'Africa/Kampala'],
      ['Business records', 'Connected'],
    ])} />;
  }

  return notFound();
}
