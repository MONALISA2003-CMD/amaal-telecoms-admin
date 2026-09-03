import Link from 'next/link';
import SiteHeader from '../../../../../components/SiteHeader';
import SiteFooter from '../../../../../components/SiteFooter';
import UnifiedCatalogueClient from '../../../../../components/UnifiedCatalogueClient';
import {audioProducts} from '../../../../../lib/audio-catalogue';
export default function WoofersPage(){const items=audioProducts.filter(p=>p.type==='Woofer');return <main><SiteHeader/><section className="section listing-page"><Link className="backLink" href="/categories/entertainment/audio">← Entertainment · Audio</Link><p className="eyebrow">ENTERTAINMENT · AUDIO</p><h1>Woofers.</h1><p className="listingLead">Bass-focused sound products for home listening and entertainment.</p><UnifiedCatalogueClient items={items} basePath="/categories/entertainment/audio" searchPlaceholder="Search woofers…" filterLabel="woofers"/></section><SiteFooter/></main>}
