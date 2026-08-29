export type ImageItem={url:string;altText?:string;primary?:boolean;sortOrder?:number};
export type Variant={code:string;name:string;colour?:string;storage?:string;size?:string;sellingPrice:number};
export type Product={id:string;name:string;slug:string;short_description?:string;description?:string;featured?:boolean;brand_name?:string;brand_slug?:string;category_name?:string;category_slug?:string;variants?:Variant[];images?:ImageItem[]};
export type Category={id:string;name:string;slug:string;description?:string;image_url?:string;banner_url?:string;icon_url?:string;featured?:boolean;sort_order?:number;parent_id?:string|null};
export type Brand={id:string;name:string;slug:string;description?:string;logo_url?:string;image_url?:string;featured?:boolean;sort_order?:number};
export type Collection={id:string;name:string;slug?:string;description?:string;image_url?:string;featured?:boolean;products?:Array<{id:string;name:string;slug:string;brand?:string;category?:string}>};
export type Catalog={updatedAt:string;categories:Category[];brands:Brand[];products:Product[];collections:Collection[]};
const api=process.env.AMAAL_API_BASE_URL||'http://localhost:4000';
export async function getCatalog():Promise<Catalog|null>{
  try{const r=await fetch(`${api}/api/public/catalog`,{next:{revalidate:60}});if(!r.ok)return null;return await r.json();}catch{return null;}
}
export function price(p:Product){const v=p.variants?.[0];return v?.sellingPrice==null?'':new Intl.NumberFormat('en-UG',{style:'currency',currency:'UGX',maximumFractionDigits:0}).format(v.sellingPrice)}
export function image(p:Product){return p.images?.find(x=>x.primary)?.url||p.images?.[0]?.url||''}
