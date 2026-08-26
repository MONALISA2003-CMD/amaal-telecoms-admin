import { notFound } from 'next/navigation';
import { Workspace } from '@/components/Workspace';
import { businessGetSafe, money, number } from '@/lib/business';

type Params = { slug: string[] };

const titles: Record<string, [string,string]> = {
  sales: ['Sales', 'Monitor sales activity and move into the existing POS and sales workflows.'],
  products: ['Products', 'Manage the business catalogue using the existing product and pricing engine.'],
  stock: ['Stock', 'See stock position, locations and replenishment pressure from the inventory engine.'],
  purchasing: ['Purchasing', 'Monitor supplier procurement, purchase orders and receiving.'],
  customers: ['Customers', 'Manage customer relationships and understand outstanding balances and service workload.'],
  orders: ['Orders', 'Track customer orders from payment through fulfilment and delivery.'],
  finance: ['Finance', 'Review the authoritative accounting position from the existing finance engine.'],
  credit: ['Credit', 'Monitor customer credit exposure, applications and amounts due.'],
  delivery: ['Delivery', 'Monitor shipments, delivery workload and exceptions.'],
  service: ['Service', 'Keep returns, warranty and repair work visible in one business workspace.'],
  website: ['Website', 'Manage the connected public website without exposing technical hosting controls.'],
  reports: ['Reports', 'Use the existing business-intelligence engine for cross-business performance.'],
  team: ['Team', 'Review the people and access information available to your role.'],
  settings: ['Business Settings', 'Review the business configuration exposed to your role.'],
};

function text(v: unknown) { return v == null ? '—' : String(v); }

export default async function BusinessWorkspace({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (slug.length !== 1 || !titles[slug[0]]) notFound();
  const key = slug[0];
  const [title, description] = titles[key];

  if (key === 'sales') {
    const d = await businessGetSafe<any>('/api/sales/summary');
    const rows = await businessGetSafe<any>('/api/sales?limit=12') as any;
    return <Workspace title={title} description={description} actions={[{label:'Refresh sales',href:'/sales'}]}
      cards={[['Sales value','today.total'],['Transactions','today.count'],['Open drafts','openDrafts'],['Units sold','unitsToday']].map(([label,path])=>({label,value:number(path.split('.').reduce((a:any,k)=>a?.[k],d))}))}
      rows={Array.isArray(rows)?rows:rows?.rows} columns={[{key:'sale_no',label:'Sale'},{key:'status',label:'Status'},{key:'grand_total',label:'Amount'},{key:'created_at',label:'Date'}]} />;
  }
  if (key === 'products') {
    const [s,p] = await Promise.all([businessGetSafe<any>('/api/catalog/summary'),businessGetSafe<any>('/api/catalog/products?limit=15')]);
    return <Workspace title={title} description={description} actions={[{label:'Catalogue',href:'/products'}]}
      cards={[['Products',s?.products],['Active brands',s?.brands],['Categories',s?.categories],['Published online',s?.published]].map(([label,value])=>({label,value:number(value)}))}
      rows={p?.rows ?? []} columns={[{key:'name',label:'Product'},{key:'brand_name',label:'Brand'},{key:'category_name',label:'Category'},{key:'variant_count',label:'Variants'},{key:'min_price',label:'From'}]} />;
  }
  if (key === 'stock') {
    const [s,o] = await Promise.all([businessGetSafe<any>('/api/inventory/summary'),businessGetSafe<any>('/api/inventory/overview')]);
    return <Workspace title={title} description={description} actions={[{label:'Refresh stock',href:'/stock'}]}
      cards={[['Stock units',s?.onHand],['Reserved units',s?.reserved],['Low-stock lines',s?.lowStock],['Locations',s?.locations]].map(([label,value])=>({label,value:number(value)}))}
      rows={o?.lowStock ?? []} columns={[{key:'product_name',label:'Product'},{key:'sku',label:'SKU'},{key:'location_name',label:'Location'},{key:'available',label:'Available'},{key:'reorder_point',label:'Reorder point'}]} />;
  }
  if (key === 'purchasing') {
    const d=await businessGetSafe<any>('/api/procurement/summary');
    return <Workspace title={title} description={description} cards={[['Active suppliers',d?.activeSuppliers],['Pending requests',d?.pendingRequisitions],['Open purchase orders',d?.openPurchaseOrders],['Overdue invoices',d?.overdueInvoices]].map(([label,value])=>({label,value:number(value)}))}
      columns={[]} />;
  }
  if (key === 'customers') {
    const [s,r]=await Promise.all([businessGetSafe<any>('/api/customers/summary'),businessGetSafe<any>('/api/customers?limit=15')]);
    return <Workspace title={title} description={description} actions={[{label:'Customer directory',href:'/customers'}]}
      cards={[['Customers',s?.customers],['Active',s?.active],['New in 30 days',s?.new30d],['Outstanding balance',money(s?.outstandingBalance)]].map(([label,value])=>({label,value:text(value)}))}
      rows={Array.isArray(r)?r:[]} columns={[{key:'customer_no',label:'Customer'},{key:'name',label:'Name'},{key:'phone',label:'Phone'},{key:'outstanding_balance',label:'Balance'},{key:'open_cases',label:'Open cases'}]} />;
  }
  if (key === 'orders') {
    const [s,r]=await Promise.all([businessGetSafe<any>('/api/orders/summary'),businessGetSafe<any>('/api/orders?limit=15')]);
    return <Workspace title={title} description={description} cards={[['Total orders',s?.total],['Pending payment',s?.pending],['Processing',s?.processing],['Dispatched',s?.dispatched]].map(([label,value])=>({label,value:number(value)}))}
      rows={Array.isArray(r)?r:r?.rows} columns={[{key:'order_no',label:'Order'},{key:'status',label:'Status'},{key:'payment_status',label:'Payment'},{key:'customer_name',label:'Customer'},{key:'grand_total',label:'Total'}]} />;
  }
  if (key === 'finance') {
    const d=await businessGetSafe<any>('/api/finance/summary');
    return <Workspace title={title} description={description} cards={[['Revenue',money(d?.revenue)],['Expenses',money(d?.expenses)],['Net result',money(d?.net)],['Receivables',money(d?.receivables)],['Payables',money(d?.payables)]].map(([label,value])=>({label,value:text(value)}))} />;
  }
  if (key === 'credit') {
    const d=await businessGetSafe<any>('/api/credit/summary');
    return <Workspace title={title} description={description} cards={[['Active profiles',d?.profiles],['Pending applications',d?.pendingApplications],['Active accounts',d?.activeAccounts],['Outstanding credit',money(d?.outstanding)],['Due balance',money(d?.dueBalance)]].map(([label,value])=>({label,value:text(value)}))} />;
  }
  if (key === 'delivery') {
    const d=await businessGetSafe<any>('/api/delivery/summary');
    return <Workspace title={title} description={description} cards={[['Total shipments',d?.total],['Pending',d?.pending],['In transit',d?.transit],['Out for delivery',d?.outForDelivery],['Failed',d?.failed]].map(([label,value])=>({label,value:number(value)}))} />;
  }
  if (key === 'service') {
    const [r,w]=await Promise.all([businessGetSafe<any>('/api/returns/summary'),businessGetSafe<any>('/api/warranty/summary')]);
    return <Workspace title={title} description={description} cards={[['Returns awaiting action',r?.requested],['Refunds pending',r?.refundPending],['Warranty cases open',w?.open],['Repairs in progress',w?.inRepair],['Ready for collection',w?.ready]].map(([label,value])=>({label,value:number(value)}))} />;
  }
  if (key === 'website') {
    const sites=await businessGetSafe<any>('/api/web/sites');
    return <Workspace title={title} description={description} cards={[['Connected sites',Array.isArray(sites)?sites.length:0],['Business-owned content','Approved'],['Publishing','Permission controlled'],['Technical hosting','Console only']].map(([label,value])=>({label,value:text(value)}))}
      rows={Array.isArray(sites)?sites:[]} columns={[{key:'name',label:'Site'},{key:'slug',label:'Slug'},{key:'status',label:'Status'},{key:'primary_domain',label:'Domain'}]} />;
  }
  if (key === 'reports') {
    const d=await businessGetSafe<any>('/api/bi/summary');
    return <Workspace title={title} description={description} cards={[['Revenue',money(d?.sales?.revenue)],['Gross margin',money(d?.margin?.gross_margin)],['Orders',d?.orders?.total],['Net sales',money(d?.netSales)],['Gross margin %',`${Number(d?.grossMarginPct ?? 0).toFixed(1)}%`]].map(([label,value])=>({label,value:text(value)}))} />;
  }
  if (key === 'team') {
    const staff=await businessGetSafe<any>('/api/staff');
    return <Workspace title={title} description={description} cards={[['Team members',Array.isArray(staff)?staff.length:0],['Access control','Backend enforced'],['Technical administration','Console only']].map(([label,value])=>({label,value:text(value)}))}
      rows={Array.isArray(staff)?staff:[]} columns={[{key:'name',label:'Name'},{key:'email',label:'Email'},{key:'status',label:'Status'},{key:'roles',label:'Roles'}]} />;
  }
  if (key === 'settings') {
    const org=await businessGetSafe<any>('/api/organization');
    return <Workspace title={title} description={description} cards={[['Business',org?.trading_name ?? org?.legal_name ?? 'Amaal Telecoms'],['Currency','UGX'],['Timezone','Africa/Kampala'],['Data source','Existing engine']].map(([label,value])=>({label,value:text(value)}))} />;
  }
  return notFound();
}
