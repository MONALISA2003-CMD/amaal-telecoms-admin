import {getCatalog, type Catalog, type Product, type Category} from './catalog';

export async function getPublishedCatalog(): Promise<Catalog> {
  const catalog = await getCatalog();
  return catalog ?? {updatedAt:new Date(0).toISOString(),categories:[],brands:[],products:[],collections:[]};
}

export function findCategory(catalog: Catalog, candidates: string[]): Category | undefined {
  const wanted = candidates.map(x=>x.toLowerCase());
  return catalog.categories.find(c => wanted.includes(c.slug.toLowerCase()))
    ?? catalog.categories.find(c => wanted.includes(c.name.toLowerCase()));
}

export function productsForCategory(catalog: Catalog, candidates: string[]): Product[] {
  const cat = findCategory(catalog,candidates);
  if(!cat) return [];
  const ids = new Set<string>([cat.id]);
  let changed = true;
  while(changed){changed=false; for(const c of catalog.categories){if(c.parent_id && ids.has(c.parent_id) && !ids.has(c.id)){ids.add(c.id);changed=true;}}}
  return catalog.products.filter(p=>p.category_slug ? ids.has(catalog.categories.find(c=>c.slug===p.category_slug)?.id||'') : false);
}

export function productsForCategoryName(catalog: Catalog, name: string): Product[] {
  const needle=name.toLowerCase();
  return catalog.products.filter(p=>String(p.category_name||'').toLowerCase()===needle || String(p.category_name||'').toLowerCase().includes(needle));
}
