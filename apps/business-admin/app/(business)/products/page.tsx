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
  const [result, brands, categories, collections] = await Promise.all([
    businessGetSafe<ProductResult>('/api/catalog/products?limit=100&offset=0'),
    businessGetSafe<Option[]>('/api/catalog/brands'),
    businessGetSafe<Option[]>('/api/catalog/categories'),
    businessGetSafe<Collection[]>('/api/catalog/collections'),
  ]);
  const productRows = Array.isArray(result?.rows) ? result.rows as any[] : [];
  const brandRows = Array.isArray(brands) ? brands : [];
  const categoryRows = Array.isArray(categories) ? categories : [];
  const collectionRows = Array.isArray(collections) ? collections : [];
  return <CatalogueManager products={productRows} brands={brandRows} categories={categoryRows} collections={collectionRows} canManage={permissions.has('catalog.manage')} isSuperAdmin={Boolean(me.isSuperAdmin)} />;
}
