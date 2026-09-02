import Link from 'next/link';
import SiteHeader from '../../../../../components/SiteHeader';
import SiteFooter from '../../../../../components/SiteFooter';
import UnifiedCatalogueClient from '../../../../../components/UnifiedCatalogueClient';
import {audioProducts} from '../../../../../lib/audio-catalogue';
export default function PortableSpeakersPage(){const items=audioProducts.filter(p=>p.type.toLowerCase().includes('portable'));return <main><SiteHeader/><section className="section listing-page"><Link className="backLink" href="/categories/entertainment/audio">← Entertainment · Audio</Link><p className="eyebrow">ENTERTAINMENT · AUDIO</p><h1>Portable speakers.</h1><p className="listingLead">Portable Bluetooth speakers for everyday and outdoor listening.</p><UnifiedCatalogueClient items={items} basePath="/categories/entertainment/audio" searchPlaceholder="Search portable speakers…" filterLabel="portable speakers"/></section><SiteFooter/></main>
}
