import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function BusinessShell({ children }: { children: React.ReactNode }) {
  return <div className="shell"><Sidebar/><main className="main"><Topbar/><div className="content">{children}</div></main></div>;
}
