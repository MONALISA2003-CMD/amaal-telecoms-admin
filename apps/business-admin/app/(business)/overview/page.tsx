import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { engineRequest } from '@/lib/engine';
import { MetricCard } from '@/components/MetricCard';

async function getDashboard(){
  const jar=await cookies();
  const cookie=jar.getAll().map(c=>`${c.name}=${c.value}`).join('; ');
  try{return await engineRequest<{users:number;activeLocations:number;auditEvents:number;unreadNotifications:number}>('/api/dashboard',{headers:{Cookie:cookie}})}catch{return null}
}
export default async function Overview(){
  const data=await getDashboard();
  if(!data) redirect('/login');
  return <div><section className="welcome"><h2>Business overview</h2><p>A clear view of what is happening across Amaal Telecoms.</p></section><section className="metrics"><MetricCard label="Active team members" value={data.users.toLocaleString()} note="From the business system"/><MetricCard label="Active locations" value={data.activeLocations.toLocaleString()} note="Currently operating"/><MetricCard label="Unread notifications" value={data.unreadNotifications.toLocaleString()} note="Needs attention"/><MetricCard label="Business activity" value={data.auditEvents.toLocaleString()} note="Recorded activities"/></section><div className="grid"><section className="panel"><h3>Business activity</h3><div className="chart">{[35,52,44,68,58,78,70,90,74,86,66,95].map((h,i)=><div className="bar" style={{height:`${h}%`}} key={i}/>)}</div><div className="quick"><a href="/sales">View sales</a><a href="/stock">Check stock</a><a href="/orders">View orders</a><a href="/website">Manage website</a></div></section><section className="attention"><h3>Needs attention</h3><div className="attentionList"><div className="attentionItem"><div><strong>Notifications</strong><br/><span>Review unread business activity.</span></div><span className="pill">Review</span></div><div className="attentionItem"><div><strong>Team</strong><br/><span>Keep business access current.</span></div><span className="pill">Manage</span></div><div className="attentionItem"><div><strong>Website</strong><br/><span>Prepare approved content for customers.</span></div><span className="pill">Open</span></div></div></section></div></div>
}
