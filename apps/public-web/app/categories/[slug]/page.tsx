import { redirect } from 'next/navigation';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === 'phones') redirect('/phones');
  if (slug === 'tvs' || slug === 'televisions' || slug === 'tv-entertainment') redirect('/tvs');
  redirect(`/shop?category=${encodeURIComponent(slug)}`);
}
