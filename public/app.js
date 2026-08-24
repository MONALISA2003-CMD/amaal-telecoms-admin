(() => {
  'use strict';
  const root = document.getElementById('app');
  const state = { me:null, setup:false, view:'Dashboard', data:null, error:'', loading:false };
  const navItems = ['Dashboard','Staff','Roles','Branches','Audit','Notifications','Settings'];
  const esc = v => String(v ?? '').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const api = async (path, options={}) => {
    const token = localStorage.getItem('amaal_token');
    const headers = {'Content-Type':'application/json', ...(options.headers||{})};
    if(token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(`/api${path}`, {...options,headers});
    const text = await res.text();
    let data = {}; try { data = text ? JSON.parse(text) : {}; } catch { data = {error:text || 'Invalid server response'}; }
    if(!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
    return data;
  };
  const field = (label,name,type='text',value='',extra='') => `<label class="field"><span>${esc(label)}</span><input name="${esc(name)}" type="${type}" value="${esc(value)}" ${extra}></label>`;
  const button = (text,cls='btn btn-primary',extra='') => `<button class="${cls}" ${extra}>${esc(text)}</button>`;
  function render(){
    if(!state.me){ renderAuth(); return; }
    renderAdmin();
  }
  function renderAuth(){
    root.innerHTML = `<div class="auth-shell"><form id="authForm" class="card auth-card stack">
      <div><div class="brand" style="font-size:26px">Amaal Telecoms</div><div class="muted small" style="margin-top:5px">${state.setup?'Create the first real administrator.':'Secure administrator sign in.'}</div></div>
      ${state.setup ? field('Company name','companyName','text','Amaal Telecoms','required') : ''}
      ${field('Administrator email','email','email','','required autocomplete="email"')}
      ${field('Password','password','password','','required autocomplete="current-password"')}
      ${state.setup ? `<div class="row">${field('Phone','phone')} ${field('Address','address')}</div>`:''}
      ${state.error?`<div class="error">${esc(state.error)}</div>`:''}
      ${button(state.loading?'Please wait…':(state.setup?'Create administrator':'Sign in'),'btn btn-primary','type="submit" '+(state.loading?'disabled':''))}
    </form></div>`;
    document.getElementById('authForm').addEventListener('submit',async e=>{
      e.preventDefault(); state.loading=true; state.error=''; render();
      const f=Object.fromEntries(new FormData(e.currentTarget).entries());
      try{ const d=await api(state.setup?'/setup':'/login',{method:'POST',body:JSON.stringify(state.setup?f:{email:f.email,password:f.password})}); localStorage.setItem('amaal_token',d.token); state.me=await api('/me'); state.view='Dashboard'; await load(); }
      catch(err){state.error=err.message;}
      finally{state.loading=false; render();}
    });
  }
  function renderAdmin(){
    root.innerHTML = `<div class="layout"><aside class="sidebar"><div class="brand" style="font-size:21px">Amaal Telecoms</div><nav class="nav">${navItems.map(n=>`<button data-nav="${n}" class="${state.view===n?'active':''}">${n}</button>`).join('')}</nav><div class="sidebar-bottom"><div class="small" style="color:#94a3b8">${esc(state.me.user?.email||'')}</div><button id="logout" class="btn btn-danger" style="margin-top:10px;width:100%">Sign out</button></div></aside><main class="main"><div class="mobilebar"><b>Amaal Telecoms</b><button id="logoutMobile" class="btn btn-secondary">Sign out</button></div><div class="header"><div><h1>${esc(state.view)}</h1><div class="muted small" style="margin-top:5px">Cloud-backed administrative foundation. No demo business records.</div></div></div>${state.error?`<div class="error" style="margin-top:16px">${esc(state.error)}</div>`:''}<section class="content">${state.loading?'<div class="loading">Loading…</div>':pageHtml()}</section></main></div>`;
    document.querySelectorAll('[data-nav]').forEach(b=>b.addEventListener('click',async()=>{state.view=b.dataset.nav;state.error='';state.data=null;render();await load();}));
    document.getElementById('logout')?.addEventListener('click',logout); document.getElementById('logoutMobile')?.addEventListener('click',logout);
    bindPage();
  }
  function pageHtml(){
    if(!state.data && state.view!=='Dashboard') return '<div class="loading">Loading…</div>';
    if(state.view==='Dashboard') return state.data?dashboardHtml(state.data):'<div class="loading">Loading…</div>';
    if(state.view==='Staff') return staffHtml(state.data||[]);
    if(state.view==='Roles') return simpleTable(state.data||[],'Roles');
    if(state.view==='Branches') return branchesHtml(state.data||[]);
    if(state.view==='Audit') return auditHtml(state.data||[]);
    if(state.view==='Notifications') return notificationsHtml(state.data||[]);
    if(state.view==='Settings') return settingsHtml(state.data||{});
    return '';
  }
  const dashboardHtml=d=>`<div class="grid stats">${[['Staff',d.users],['Active branches',d.activeBranches],['Audit events',d.auditEvents],['Unread notifications',d.unreadNotifications]].map(([a,b])=>`<div class="card stat"><div class="stat-label">${esc(a)}</div><div class="stat-value">${esc(b)}</div></div>`).join('')}</div>`;
  function simpleTable(rows,title){return `<div class="card table-card"><table class="table"><thead><tr><th>Name</th><th>Description</th><th>Status</th></tr></thead><tbody>${rows.map(r=>`<tr><td><b>${esc(r.name||r.title||'—')}</b></td><td>${esc(r.description||r.body||'')}</td><td>${r.status?`<span class="pill">${esc(r.status)}</span>`:'—'}</td></tr>`).join('')}</tbody></table>${!rows.length?'<div class="empty">No records yet.</div>':''}</div>`}
  function staffHtml(rows){return `<div class="toolbar">${button('Add staff','btn btn-primary','id="addStaff"')}</div>${simpleTable(rows,'Staff')}`}
  function branchesHtml(rows){return `<div class="card" style="padding:18px;margin-bottom:14px"><form id="branchForm"><div class="row">${field('Branch name','name','','','required')}${field('Address','address')}</div><div class="actions">${button('Add branch','btn btn-primary','type="submit"')}</div></form></div>${simpleTable(rows,'Branches')}`}
  function auditHtml(rows){return `<div class="card table-card"><table class="table"><thead><tr><th>Time</th><th>Action</th><th>Actor</th><th>Detail</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${esc(r.created_at?new Date(r.created_at).toLocaleString():'')}</td><td><b>${esc(r.action)}</b></td><td>${esc(r.actor_email||'System')}</td><td>${esc(r.detail||'')}</td></tr>`).join('')}</tbody></table>${!rows.length?'<div class="empty">No audit events yet.</div>':''}</div>`}
  function notificationsHtml(rows){return `<div class="toolbar">${button('New notification','btn btn-primary','id="addNotification"')}</div><div class="card table-card"><table class="table"><thead><tr><th>Title</th><th>Message</th><th>Created</th><th>Read</th></tr></thead><tbody>${rows.map(r=>`<tr><td><b>${esc(r.title)}</b></td><td>${esc(r.body)}</td><td>${esc(r.created_at?new Date(r.created_at).toLocaleString():'')}</td><td>${r.read_at?'Yes':'No'}</td></tr>`).join('')}</tbody></table>${!rows.length?'<div class="empty">No notifications yet.</div>':''}</div>`}
  function settingsHtml(d){return `<form id="settingsForm" class="card" style="padding:18px;max-width:760px"><div class="row">${field('Company name','companyName','text',d.companyName||'')}${field('Company email','companyEmail','email',d.companyEmail||'')}${field('Phone','companyPhone','text',d.companyPhone||'')}${field('Address','companyAddress','text',d.companyAddress||'')}${field('Currency','currency','text',d.currency||'UGX')}${field('Timezone','timezone','text',d.timezone||'Africa/Kampala')}${field('Session minutes','sessionMinutes','number',d.sessionMinutes||60,'min="1"')}</div><div class="actions">${button('Save settings','btn btn-primary','type="submit"')}</div></form>`}
  function modal(html){const wrap=document.createElement('div');wrap.className='modal-backdrop';wrap.innerHTML=`<div class="modal card">${html}</div>`;document.body.appendChild(wrap);return wrap}
  function bindPage(){
    document.getElementById('branchForm')?.addEventListener('submit',async e=>{e.preventDefault();try{await api('/branches',{method:'POST',body:JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))});await load();}catch(err){state.error=err.message;render();}});
    document.getElementById('settingsForm')?.addEventListener('submit',async e=>{e.preventDefault();try{const f=Object.fromEntries(new FormData(e.currentTarget).entries());f.sessionMinutes=Number(f.sessionMinutes);await api('/settings',{method:'PUT',body:JSON.stringify(f)});state.data=await api('/settings');render();}catch(err){state.error=err.message;render();}});
    document.getElementById('addStaff')?.addEventListener('click',()=>staffModal());
    document.getElementById('addNotification')?.addEventListener('click',()=>notificationModal());
  }
  function staffModal(){const m=modal(`<h2 style="margin-top:0">Create staff</h2><form id="staffForm" class="stack">${field('Name','name','','','required')}${field('Email','email','email','','required')}${field('Temporary password','password','password','','required minlength="10"')}<div class="actions">${button('Cancel','btn btn-secondary','type="button" id="cancel"')}${button('Create','btn btn-primary','type="submit"')}</div></form>`);m.querySelector('#cancel').onclick=()=>m.remove();m.querySelector('form').onsubmit=async e=>{e.preventDefault();try{await api('/users',{method:'POST',body:JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))});m.remove();await load();}catch(err){alert(err.message)}}}
  function notificationModal(){const m=modal(`<h2 style="margin-top:0">New notification</h2><form id="notificationForm" class="stack">${field('Title','title','','Notification') }<label class="field"><span>Message</span><textarea name="body" rows="5"></textarea></label><div class="actions">${button('Cancel','btn btn-secondary','type="button" id="cancel"')}${button('Create','btn btn-primary','type="submit"')}</div></form>`);m.querySelector('#cancel').onclick=()=>m.remove();m.querySelector('form').onsubmit=async e=>{e.preventDefault();try{await api('/notifications',{method:'POST',body:JSON.stringify(Object.fromEntries(new FormData(e.currentTarget).entries()))});m.remove();await load();}catch(err){alert(err.message)}}}
  async function load(){state.loading=true;state.error='';render();try{if(state.view==='Dashboard')state.data=await api('/dashboard');else if(state.view==='Staff')state.data=await api('/staff');else if(state.view==='Roles')state.data=await api('/roles');else if(state.view==='Branches')state.data=await api('/branches');else if(state.view==='Audit')state.data=await api('/audit');else if(state.view==='Notifications')state.data=await api('/notifications');else if(state.view==='Settings')state.data=await api('/settings');}catch(e){state.error=e.message;}finally{state.loading=false;render();}}
  async function logout(){try{await api('/logout',{method:'POST'});}catch{}localStorage.removeItem('amaal_token');state.me=null;state.setup=false;state.data=null;state.error='';render();}
  async function boot(){try{const h=await api('/health');if(!h.ok)throw new Error('Backend/database unavailable');const s=await api('/setup-status');state.setup=s.setupRequired;if(localStorage.getItem('amaal_token')){try{state.me=await api('/me');}catch{localStorage.removeItem('amaal_token');state.me=null;}}}catch(e){state.error=e.message;}render();if(state.me)await load();}
  boot();
})();
