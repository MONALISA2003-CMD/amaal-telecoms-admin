import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Amaal — Premium Consumer Electronics',description:'Discover genuine consumer electronics from trusted brands at Amaal.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
