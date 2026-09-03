import Link from 'next/link';
import SiteHeader from '../../../../../components/SiteHeader';
import SiteFooter from '../../../../../components/SiteFooter';
import UnifiedCatalogueClient from '../../../../../components/UnifiedCatalogueClient';
import {audioProducts} from '../../../../../lib/audio-catalogue';
export default function PartySpeakersPage(){const items=audioProducts.filter(p=>p.type.toLowerCase().includes('party'));return <main><SiteHeader/><section className="section listing-page"><Link className="backLink" href="/categories/entertainment/audio">← Entertainment · Audio</Link><p className="eyebrow">ENTERTAINMENT · AUDIO</p><h1>Party speakers.</h1><p className="listingLead">Powerful speakers for gatherings, celebrations and larger spaces.</p><UnifiedCatalogueClient items={items} basePath="/categories/entertainment/audio" searchPlaceholder="Search party speakers…" filterLabel="party speakers"/></section><SiteFooter/></main>}
