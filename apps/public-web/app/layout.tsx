import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:{default:'Amaal — Premium Consumer Electronics',template:'%s — Amaal'},description:'Premium consumer electronics and appliances from trusted brands at Amaal.',metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'https://amaal.example')};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
