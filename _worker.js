const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });
function esc(s=''){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
async function verifyTurnstile(token, ip, env){
  if (!env.TURNSTILE_SECRET_KEY) return true;
  const form = new FormData(); form.append('secret', env.TURNSTILE_SECRET_KEY); form.append('response', token || ''); if (ip) form.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method:'POST', body:form });
  const j = await r.json().catch(()=>({success:false})); return !!j.success;
}
export default { async fetch(request, env, ctx) {
  const url = new URL(request.url);
  if (url.pathname === '/api/contact' && request.method === 'POST') {
    let data; try { data = await request.json(); } catch { return json({ok:false,error:'Invalid request.'},400); }
    if (data.company) return json({ok:true});
    const name = String(data.name||'').trim(), email = String(data.email||'').trim(), message = String(data.message||'').trim();
    if (name.length < 2 || message.length < 10 || !/^\S+@\S+\.\S+$/.test(email)) return json({ok:false,error:'Please complete the required fields.'},400);
    const productionHost = ['kaadifinancial.ca','www.kaadifinancial.ca'].includes(url.hostname);
    if (productionHost && !(await verifyTurnstile(data.turnstileToken, request.headers.get('CF-Connecting-IP'), env))) return json({ok:false,error:'Please complete verification.'},403);
    const to = env.KAADI_FORM_TO || 'mike@phouseproductions.com';
    if (env.RESEND_API_KEY) {
      const subject = `Kaadi Financial website inquiry from ${name}`;
      const html = `<h2>Kaadi Financial website inquiry</h2><p><b>Name:</b> ${esc(name)}</p><p><b>Email:</b> ${esc(email)}</p><p><b>Message:</b><br>${esc(message).replace(/\n/g,'<br>')}</p><p><small>Host: ${esc(url.hostname)}</small></p>`;
      const rr = await fetch('https://api.resend.com/emails', { method:'POST', headers:{ authorization:`Bearer ${env.RESEND_API_KEY}`, 'content-type':'application/json' }, body:JSON.stringify({ from:'pHouse Web Forms <forms@phouseweb.ca>', to: to.split(',').map(x=>x.trim()).filter(Boolean), reply_to: email, subject, html }) });
      if (!rr.ok) return json({ok:false,error:'Notification failed.'},502);
    }
    return json({ok:true});
  }
  return env.ASSETS.fetch(request);
}};
