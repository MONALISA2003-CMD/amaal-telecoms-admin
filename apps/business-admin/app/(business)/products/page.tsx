import { redirect } from 'next/navigation';
import { ProductCatalogue } from '@/components/ProductCatalogue';
import { businessGetSafe } from '@/lib/business';
import { CatalogueAdminBar } from '@/components/ProductAdmin';
import { starterCatalogueBrands, starterCatalogueCategories, starterCatalogueItems } from '@/data/starter-catalogue';

type Me = { permissions?: string[] };
type ProductResult = { rows?: Array<Record<string, unknown>>; total?: number };
type Option = { id: string; name: string; product_count?: number };
type Summary = { products?: number; brands?: number; categories?: number; variants?: number; published?: number };

export default async function ProductsPage() {
  const me = await businessGetSafe<Me>('/api/me');
  if (!me) redirect('/login');
  const permissions = new Set(me.permissions ?? []);
  if (!permissions.has('catalog.view')) redirect('/overview');
  const [summary, result, brands, categories] = await Promise.all([
    businessGetSafe<Summary>('/api/catalog/summary'),
    businessGetSafe<ProductResult>('/api/catalog/products?limit=100&offset=0'),
    businessGetSafe<Option[]>('/api/catalog/brands'),
    businessGetSafe<Option[]>('/api/catalog/categories'),
  ]);
  return <ProductCatalogue summary={summary} products={Array.isArray(result?.rows) ? result.rows as any[] : []} total={Number(result?.total ?? 0)} brands={Array.isArray(brands) ? brands : []} categories={Array.isArray(categories) ? categories : []} canManage={permissions.has('catalog.manage')} canPublish={permissions.has('catalog.publish')} starterCatalogue={{ brands: starterCatalogueBrands, categories: starterCatalogueCategories, items: starterCatalogueItems }} />;
}
