import Link from 'next/link';
import {Search, ArrowRight, X} from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import SearchEvent from '../../components/SearchEvent';
import ProductCard from '../../components/ProductCard';
import SaveSearch from '../../components/SaveSearch';
import {getCatalog,type Product} from '../../lib/catalog';

function tokens(value:string){return value.toLowerCase().trim().split(/\s+/).filter(Boolean)}
function scoreProduct(p:Product,query:string){
  const q=tokens(query); if(!q.length)return 0;
  const fields=[p.name,p.brand_name,p.category_name,p.short_description,p.description,...(p.attributes??[]).flatMap(a=>[a.key,a.value])].filter(Boolean).join(' ').toLowerCase();
  const name=(p.name??'').toLowerCase(), brand=(p.brand_name??'').toLowerCase(), category=(p.category_name??'').toLowerCase();
  let score=0;
  for(const token of q){
    if(name===token)score+=100;
    else if(name.includes(token))score+=45;
    else if(brand.includes(token))score+=30;
    else if(category.includes(token))score+=25;
    else if(fields.includes(token))score+=10;
    else if([...fields.split(/\W+/)].some(w=>w.length>=3&&Math.abs(w.length-token.length)<=1&&w.startsWith(token.slice(0,Math.min(3,token.length)))))score+=3;
    else return -1;
  }
  return score;
}
function lowestPrice(p:Product){const prices=(p.variants??[]).map(v=>Number(v.sellingPrice)).filter(Number.isFinite);return prices.length?Math.min(...prices):Infinity}
function StaticSuggestion({label,href,kind}:{label:string;href:string;kind:string}){return <Link className="search-suggestion" href={href}><span>{kind}</span><strong>{label}</strong><ArrowRight size={14}/></Link>}

export default async function SearchPage({searchParams}:{searchParams:Promise<{q?:string;brand?:string;category?:string;sort?:string}>}){
  const params=await searchParams; const q=(params.q??'').trim();
  const catalog=await getCatalog();
  const all=catalog?.products??[];
  const brands=Array.from(new Set(all.map(p=>p.brand_name).filter(Boolean) as string[])).sort((a,b)=>a.localeCompare(b));
  const categories=Array.from(new Set(all.map(p=>p.category_name).filter(Boolean) as string[])).sort((a,b)=>a.localeCompare(b));
  const query=q.toLowerCase();
  let products=all.filter(p=>(!params.brand||p.brand_name===params.brand)&&(!params.category||p.category_name===params.category));
  const scored=products.map(p=>({p,s:scoreProduct(p,q)})).filter(x=>!q||x.s>=0);
  if(q)scored.sort((a,b)=>b.s-a.s||a.p.name.localeCompare(b.p.name));
  products=scored.map(x=>x.p);
  if(params.sort==='price-asc')products.sort((a,b)=>lowestPrice(a)-lowestPrice(b));
  if(params.sort==='price-desc')products.sort((a,b)=>lowestPrice(b)-lowestPrice(a));
  if(params.sort==='name')products.sort((a,b)=>a.name.localeCompare(b.name));
  const relatedBrands=q?brands.filter(b=>b.toLowerCase().includes(query)).slice(0,4):[];
  const relatedCategories=q?categories.filter(c=>c.toLowerCase().includes(query)).slice(0,4):[];
  const total=products.length;
  return <main><SiteHeader/><section className="section search-page"><SearchEvent query={q} resultCount={total}/><p className="eyebrow">SEARCH AMAAL</p><h1>Find what you need.</h1><form className="search-form" method="get"><Search size={19}/><input name="q" defaultValue={q} placeholder="Search phones, TVs, laptops, tablets, speakers…" aria-label="Search products"/><button>Search</button></form>
    {q&&(relatedBrands.length||relatedCategories.length)?<div className="search-suggestions" aria-label="Search suggestions">{relatedBrands.map(b=><StaticSuggestion key={`b-${b}`} label={b} href={`/search?q=${encodeURIComponent(b)}`} kind="Brand"/>)}{relatedCategories.map(c=><StaticSuggestion key={`c-${c}`} label={c} href={`/search?q=${encodeURIComponent(c)}`} kind="Category"/>)}</div>:null}
    <div className="search-actions"><SaveSearch query={q}/></div>
    <form className="search-filters" method="get"><input type="hidden" name="q" value={q}/><label>Brand<select name="brand" defaultValue={params.brand??''}><option value="">All brands</option>{brands.map(b=><option key={b} value={b}>{b}</option>)}</select></label><label>Category<select name="category" defaultValue={params.category??''}><option value="">All categories</option>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select></label><label>Sort<select name="sort" defaultValue={params.sort??''}><option value="">Relevance</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A–Z</option></select></label><button>Apply</button>{(params.brand||params.category||params.sort)&&<Link href={q?`/search?q=${encodeURIComponent(q)}`:'/search'} className="search-clear"><X size={14}/> Clear</Link>}</form>
    <div className="section-head results-head"><h2>{q?`${total} result${total===1?'':'s'} for “${q}”`:'Browse our published catalogue'}</h2></div>{products.length>0?<div className="product-grid">{products.slice(0,48).map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="empty"><Search/><h2>{q?'No products matched your search.':'No products are currently published.'}</h2><p>{q?'Try a different model, brand, category or specification.':'Browse the shop to explore the current published catalogue.'}</p><Link className="button outline" href="/shop">Browse shop</Link></div>}</section><SiteFooter/></main>
}
