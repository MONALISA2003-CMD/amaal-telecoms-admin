import Link from 'next/link';
import {notFound,redirect} from 'next/navigation';
import SiteHeader from '../../../components/SiteHeader';import SiteFooter from '../../../components/SiteFooter';
import {amaalCategoryNavigation} from '../../../lib/category-navigation';
import {computerProducts} from '../../../lib/computer-catalogue';
import {audioProducts} from '../../../lib/audio-catalogue';
import {tabletProducts} from '../../../lib/tablet-catalogue';
import {accessoryProducts} from '../../../lib/accessory-catalogue';
import UnifiedCatalogueClient from '../../../components/UnifiedCatalogueClient';
import ComputerCatalogueClient from '../../../components/ComputerCatalogueClient';
export default async function CategoryPathPage({params}:{params:Promise<{path:string[]}>}){
 const {path}=await params; const clean=path.filter(Boolean); const key=clean.join('/');
 if(key==='phones') redirect('/phones');
 if(['tvs','televisions','tv-entertainment'].includes(key)) redirect('/tvs');
 if(key==='audio') redirect('/categories/entertainment/audio');
 if(key==='computers') return <DomainPage title="Computers" description="Laptops, desktops and performance machines, organized by brand, family and configuration." href="/categories" nodes={nodes('computers')} count={computerProducts.length}/>;
 if(key==='computers/laptops') return <ComputerListing title="Laptops" items={computerProducts}/>;
 if(key==='computers/laptops/business') return <ComputerListing title="Business laptops" items={computerProducts.filter(p=>p.tier==='BUSINESS'||p.tier==='PREMIUM')}/>;
 if(key==='computers/laptops/gaming') return <ComputerListing title="Gaming laptops" items={computerProducts.filter(p=>p.tier==='GAMING')}/>;
 if(key==='computers/laptops/apple') return <ComputerListing title="MacBook" items={computerProducts.filter(p=>p.brand==='Apple')}/>;
 if(key==='entertainment') return <DomainPage title="Entertainment" description="Smart TVs and immersive sound, organized in one entertainment category." href="/categories" nodes={nodes('entertainment')} count={0}/>;
 if(key==='entertainment/audio') return <AudioListing title="Audio" items={audioProducts}/>;
 if(key==='entertainment/audio/woofers') return <AudioListing title="Woofers" items={audioProducts.filter(p=>p.type==='Woofer')}/>;
 if(key==='entertainment/audio/party-speakers') return <AudioListing title="Party speakers" items={audioProducts.filter(p=>p.type.toLowerCase().includes('party'))}/>;
 if(key==='entertainment/audio/sound-towers') return <AudioListing title="Sound towers" items={audioProducts.filter(p=>p.type==='Sound Tower')}/>;
 if(key==='entertainment/audio/portable-speakers') return <AudioListing title="Portable speakers" items={audioProducts.filter(p=>p.type.toLowerCase().includes('portable'))}/>;
 if(key==='entertainment/audio/portable-speakers') return <AudioListing title="Portable speakers" items={audioProducts.filter(p=>p.type.toLowerCase().includes('portable'))}/>;
 if(key==='tablets') return <DomainPage title="Tablets" description="Portable screens for work, study and entertainment." href="/categories" nodes={nodes('tablets')} count={0}/>;
 if(key==='accessories') return <DomainPage title="Accessories" description="Useful additions for your devices and everyday setup." href="/categories" nodes={[]} count={0}/>;
 notFound();
}
function nodes(slug:string){return amaalCategoryNavigation.find(x=>x.slug===slug)?.children||[]}
function DomainPage({title,description,href,nodes,count}:{title:string;description:string;href:string;nodes:{name:string;description:string;href:string}[];count:number}){return <main><SiteHeader/><section className="section listing-page"><Link className="backLink" href={href}>← All categories</Link><p className="eyebrow">CATEGORY</p><h1>{title}.</h1><p className="listingLead">{description}</p>{count>0&&<p className="category-count">{count} curated products</p>}<div className="category-subcategory-grid">{nodes.map(n=><Link className="subcategory-card" href={n.href} key={n.href}><span>AMAAL</span><h2>{n.name}</h2><p>{n.description}</p><b>Explore →</b></Link>)}</div></section><SiteFooter/></main>}
function ComputerListing({title,items}:{title:string;items:typeof computerProducts}){return <main><SiteHeader/><section className="section listing-page"><Link className="backLink" href="/categories/computers">← Computers</Link><p className="eyebrow">COMPUTERS · LAPTOPS</p><h1>{title}.</h1><p className="listingLead">Choose by brand, family, performance level and screen size. Prices are confirmed when products are listed.</p><ComputerCatalogueClient items={items}/></section><SiteFooter/></main>}
function AudioListing({title,items}:{title:string;items:typeof audioProducts}){return <main><SiteHeader/><section className="section listing-page"><Link className="backLink" href="/categories/entertainment">← Entertainment</Link><p className="eyebrow">ENTERTAINMENT · AUDIO</p><h1>{title}.</h1><p className="listingLead">Compare sound products by brand and product type. Photos and prices are added when the exact unit is live in the catalogue.</p><UnifiedCatalogueClient items={items} basePath="/categories/entertainment/audio" searchPlaceholder="Search speakers, woofers, towers…" filterLabel="sound products"/></section><SiteFooter/></main>}
function TabletListing({title,items}:{title:string;items:typeof tabletProducts}){return <main><SiteHeader/><section className="section listing-page"><Link className="backLink" href="/categories">← All categories</Link><p className="eyebrow">TABLETS</p><h1>{title}.</h1><p className="listingLead">Compare current tablet families by brand and use case. Storage and connectivity are selected at the point of purchase.</p><UnifiedCatalogueClient items={items} basePath="/categories/tablets" searchPlaceholder="Search iPad, Galaxy Tab…" filterLabel="tablets"/></section><SiteFooter/></main>}
function AccessoryListing({title,items}:{title:string;items:typeof accessoryProducts}){return <main><SiteHeader/><section className="section listing-page"><Link className="backLink" href="/categories">← All categories</Link><p className="eyebrow">ACCESSORIES</p><h1>{title}.</h1><p className="listingLead">Practical accessories for phones, computers, tablets and gaming setups. Compatibility is confirmed before purchase.</p><UnifiedCatalogueClient items={items} basePath="/categories/accessories" searchPlaceholder="Search accessories…" filterLabel="accessories"/></section><SiteFooter/></main>}
