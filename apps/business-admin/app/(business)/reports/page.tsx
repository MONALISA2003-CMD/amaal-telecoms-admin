import { redirect } from 'next/navigation';
import { businessGetSafe } from '@/lib/business';
import { ReportsWorkspace } from '@/components/ReportsWorkspace';

type Me={permissions?:string[];isSuperAdmin?:boolean};
export default async function ReportsPage(){const me=await businessGetSafe<Me>('/api/me');if(!me)redirect('/login');if(!me.permissions?.includes('bi.view'))redirect('/overview');
 const [summary,trend,products,customers,procurement,delivery,warranty,returns,finance,tax,website,snapshots]=await Promise.all([
  businessGetSafe<any>('/api/bi/summary'),businessGetSafe<any[]>('/api/bi/sales-trend'),businessGetSafe<any[]>('/api/bi/products'),businessGetSafe<any[]>('/api/bi/customers'),businessGetSafe<any[]>('/api/bi/procurement'),businessGetSafe<any[]>('/api/bi/delivery'),businessGetSafe<any[]>('/api/bi/warranty'),businessGetSafe<any[]>('/api/bi/returns'),businessGetSafe<any[]>('/api/bi/finance'),businessGetSafe<any>('/api/bi/tax'),businessGetSafe<any>('/api/bi/website-activity'),businessGetSafe<any[]>('/api/bi/snapshots')]);
 return <ReportsWorkspace summary={summary} trend={trend??[]} products={products??[]} customers={customers??[]} procurement={procurement??[]} delivery={delivery??[]} warranty={warranty??[]} returns={returns??[]} finance={finance??[]} tax={tax} website={website} snapshots={snapshots??[]} canManage={me.permissions.includes('bi.manage')} canExport={me.permissions.includes('bi.export')}/>;
}
