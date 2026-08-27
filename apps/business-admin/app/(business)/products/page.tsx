import { redirect } from 'next/navigation';
import { CatalogueManager } from '@/components/CatalogueManager';
import { businessGetSafe } from '@/lib/business';

type Me = { permissions?: string[]; isSuperAdmin?: boolean };
type ProductResult = { rows?: Array<Record<string, unknown>>; total?: number };
type Option = { id: string; name: string; product_count?: number };
type Collection = { id: string; name: string; description?: string; status?: string; website_visibility?: string; featured?: boolean; sort_order?: number; product_count?: number };

export default async function ProductsPage() {
  const me = await businessGetSafe<Me>('/api/me');
  if (!me) redirect('/login');
  const permissions = new Set(me.permissions ?? []);
  if (!permissions.has('catalog.view')) redirect('/overview');
  const loadAllProducts = async () => {
    const pageSize = 500;
    const first = await businessGetSafe<ProductResult>(`/api/catalog/products?limit=${pageSize}&offset=0`);
    if (!first) return { rows: [], total: 0 };
    const total = Number(first.total ?? first.rows?.length ?? 0);
    if ((first.rows?.length ?? 0) >= total) return { rows: first.rows ?? [], total };
    const pages: Promise<ProductResult | null>[] = [];
    for (let offset = pageSize; offset < total; offset += pageSize) pages.push(businessGetSafe<ProductResult>(`/api/catalog/products?limit=${pageSize}&offset=${offset}`));
    const rest = await Promise.all(pages);
    return { rows: [...(first.rows ?? []), ...rest.flatMap(page => page?.rows ?? [])], total };
  };
  const [result, brands, categories, collections] = await Promise.all([
    loadAllProducts(),
    businessGetSafe<Option[]>('/api/catalog/brands'),
    businessGetSafe<Option[]>('/api/catalog/categories'),
    businessGetSafe<Collection[]>('/api/catalog/collections'),
  ]);
  const productRows = result.rows as any[];
  const brandRows = Array.isArray(brands) ? brands : [];
  const categoryRows = Array.isArray(categories) ? categories : [];
  const collectionRows = Array.isArray(collections) ? collections : [];
  return <CatalogueManager products={productRows} brands={brandRows} categories={categoryRows} collections={collectionRows} canManage={permissions.has('catalog.manage')} isSuperAdmin={Boolean(me.isSuperAdmin)} />;
}
