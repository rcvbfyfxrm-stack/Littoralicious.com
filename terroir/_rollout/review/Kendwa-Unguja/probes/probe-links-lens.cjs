const { chromium } = require('playwright');
const U=process.argv[3];
(async () => { const b = await chromium.launch();
 const [w,h,phone] = process.argv[2]==='phone'?[390,844,true]:[1280,900,false];
 const p = await b.newPage({viewport:{width:w,height:h}, isMobile:phone, hasTouch:phone});
 await p.goto(U,{waitUntil:'load'}); await p.waitForTimeout(4500);
 const tags = await p.$$eval('.gx-tags .band-nav__chip[data-tag]:not([data-tag=""]), .gx-subtag', a=>[...new Set(a.map(x=>x.dataset.tag))]);
 let n=0, f=0; const seen=new Set();
 for (const t of tags) {
  await p.goto(U+'#t='+t,{waitUntil:'load'}); await p.waitForTimeout(1500);
  // open every visible fold so links inside are reachable, then list visible links
  await p.evaluate(()=>document.querySelectorAll('.container details').forEach(d=>{ if(!d.closest('[hidden]')) d.open=true; }));
  const links = await p.evaluate(()=>[...document.querySelectorAll('.container a[href^="#"]')].filter(a=>a.getAttribute('href').length>1 && !a.getAttribute('href').startsWith('#t=') && !a.closest('[hidden],.band-nav,.gx-subtags') && a.getClientRects().length).map(a=>a.getAttribute('href')));
  for (const href of [...new Set(links)]) {
    const key=t+href; if (seen.has(key)) continue; seen.add(key); n++;
    await p.goto('about:blank'); await p.goto(U+'#t='+t,{waitUntil:'load'}); await p.waitForTimeout(1500);
    await p.evaluate(()=>document.querySelectorAll('.container details').forEach(d=>{ if(!d.closest('[hidden]')) d.open=true; }));
    const el = await p.evaluateHandle((href)=>[...document.querySelectorAll('.container a[href="'+href+'"]')].find(a=>!a.closest('[hidden],.band-nav,.gx-subtags') && a.getClientRects().length), href);
    await el.asElement().scrollIntoViewIfNeeded(); await el.asElement().click(); await p.waitForTimeout(700);
    const v = await p.evaluate((id)=>{ const e=document.getElementById(id); if(!e) return 'missing'; if (e.closest('[hidden]')) return 'hidden'; for(let d=e.closest('details');d;d=d.parentElement&&d.parentElement.closest('details')) if(!d.open && d!==e) return 'closed ancestor'; const r=e.getBoundingClientRect(); return (r.top>-5 && r.top<innerHeight-40)?'ok':'offscreen '+Math.round(r.top); }, href.slice(1));
    if (v!=='ok') { f++; console.log(`FAIL #t=${t} click ${href} -> ${v}`); }
  }
 }
 console.log(process.argv[2]||'desk','visible links clicked',n,'failures',f); await b.close(); })();
