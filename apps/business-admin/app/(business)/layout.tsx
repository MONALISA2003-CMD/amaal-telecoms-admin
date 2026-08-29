import type { ReactNode } from 'react';
import { BusinessShell } from '@/components/BusinessShell';

export default function BusinessLayout({ children }: { children: ReactNode }) {
  return <BusinessShell>{children}</BusinessShell>;
}
