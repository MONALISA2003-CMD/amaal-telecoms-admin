export type ImageItem={url:string;altText?:string;primary?:boolean;sortOrder?:number};
export type Variant={code:string;name:string;colour?:string;storage?:string;size?:string;sellingPrice:number;compareAtPrice?:number|null;trackInventory?:boolean;available?:number};
export type ProductAttribute={key:string;value:string;unit?:string;sortOrder?:number};
export type Product={id:string;name:string;slug:string;product_type?:string;short_description?:string;description?:string;specifications?:unknown;attributes?:ProductAttribute[];featured?:boolean;brand_name?:string;brand_slug?:string;category_name?:string;category_slug?:string;variants?:Variant[];images?:ImageItem[]};
export type Category={id:string;name:string;slug:string;description?:string;image_url?:string;banner_url?:string;icon_url?:string;featured?:boolean;sort_order?:number;parent_id?:string|null};
export type Brand={id:string;name:string;slug:string;description?:string;logo_url?:string;image_url?:string;featured?:boolean;sort_order?:number};
export type Collection={id:string;name:string;slug?:string;description?:string;image_url?:string;featured?:boolean;products?:Array<{id:string;name:string;slug:string;brand?:string;category?:string}>};
export type Catalog={updatedAt:string;categories:Category[];brands:Brand[];products:Product[];collections:Collection[]};
const api=process.env.NEXT_PUBLIC_API_BASE_URL||process.env.AMAAL_API_BASE_URL||'http://localhost:4000';
export async function getCatalog():Promise<Catalog|null>{try{const r=await fetch(`${api}/api/public/catalog`,{next:{revalidate:60}});if(!r.ok)return null;return await r.json();}catch{return null}}
export function price(p:Product){const v=p.variants?.[0];return v?.sellingPrice==null?'':new Intl.NumberFormat('en-UG',{style:'currency',currency:'UGX',maximumFractionDigits:0}).format(Number(v.sellingPrice))}
export function publicPrice(){return 'Price coming soon'}
export function publicPhoto(){return ''}
export function image(p:Product){return p.images?.find(x=>x.primary)?.url||p.images?.[0]?.url||''}

export type PublicCatalogueResult = Catalog & {source:'database'|'fallback'};
export async function getPublicCatalogue():Promise<PublicCatalogueResult>{
  const live=await getCatalog();
  if(live) return {...live,source:'database'};
  return {updatedAt:new Date().toISOString(),categories:[],brands:[],products:[],collections:[],source:'fallback'};
}
export function searchProducts(catalog:Catalog, query:string){
  const q=query.trim().toLowerCase();
  if(!q) return catalog.products;
  return catalog.products.filter(p=>`${p.name} ${p.brand_name??''} ${p.category_name??''} ${p.short_description??''} ${p.description??''}`.toLowerCase().includes(q));
}
