export type CategoryNavNode={slug:string;name:string;description:string;href:string;children?:CategoryNavNode[]};
export type PublicCategory={name:string;slug:string;description?:string|null;parent_slug?:string|null;sort_order?:number};
export function buildCategoryNavigation(categories:PublicCategory[]):CategoryNavNode[]{
 const byParent=new Map<string,PublicCategory[]>();
 for(const c of categories.filter(c=>c.slug&&c.name)){const key=c.parent_slug||'';const rows=byParent.get(key)||[];rows.push(c);byParent.set(key,rows)}
 const make=(c:PublicCategory):CategoryNavNode=>({slug:c.slug,name:c.name,description:c.description||`Explore ${c.name} at Amaal.`,href:`/shop?category=${encodeURIComponent(c.slug)}`,children:(byParent.get(c.slug)||[]).sort((a,b)=>(a.sort_order??0)-(b.sort_order??0)||a.name.localeCompare(b.name)).map(make)});
 return (byParent.get('')||[]).sort((a,b)=>(a.sort_order??0)-(b.sort_order??0)||a.name.localeCompare(b.name)).map(make);
}
