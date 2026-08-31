'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export type GalleryImage = { src: string; alt: string };

export default function ProductGallery({ images, compact = false, label = 'Product' }: { images: GalleryImage[]; compact?: boolean; label?: string }) {
  const safe = images.filter(Boolean);
  const [index, setIndex] = useState(0);
  if (!safe.length) return <div className={compact ? 'product-gallery product-gallery-compact' : 'product-gallery'}><div className="gallery-empty">AMAAL</div></div>;

  const go = (direction: 1 | -1) => setIndex(i => (i + direction + safe.length) % safe.length);
  return (
    <div className={`product-gallery${compact ? ' product-gallery-compact' : ''}`}>
      <div className="gallery-main">
        <img src={safe[index].src} alt={safe[index].alt} draggable={false} />
        {safe.length > 1 && <>
          <button type="button" className="gallery-arrow gallery-arrow-left" aria-label={`Previous ${label} image`} onClick={e => { e.stopPropagation(); go(-1); }}><ChevronLeft size={16}/></button>
          <button type="button" className="gallery-arrow gallery-arrow-right" aria-label={`Next ${label} image`} onClick={e => { e.stopPropagation(); go(1); }}><ChevronRight size={16}/></button>
        </>}
        {safe.length > 1 && <span className="gallery-count">{index + 1} / {safe.length}</span>}
      </div>
      {safe.length > 1 && <div className="gallery-thumbs" aria-label={`${label} image choices`}>
        {safe.map((img, i) => <button type="button" key={img.src} className={`gallery-thumb${i === index ? ' active' : ''}`} aria-label={`View image ${i + 1}`} onClick={e => { e.stopPropagation(); setIndex(i); }}><img src={img.src} alt="" draggable={false}/></button>)}
      </div>}
    </div>
  );
}
