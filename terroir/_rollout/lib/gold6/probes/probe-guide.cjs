const { chromium } = require((() => { try { return require.resolve('playwright'); } catch (e) { return require('child_process').execSync('npm root -g').toString().trim() + '/playwright'; } })());
const U = process.argv[2];
const ok=(n,c,d='')=>console.log((c?'PASS ':'FAIL ')+n+(d?'  ('+d+')':''));
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1280,height:900}});
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto(U,{waitUntil:'load'}); await p.waitForTimeout(4500);
  const vis = () => p.evaluate(()=>[...document.querySelectorAll('.container[class*="gx-"] details.sfold')].filter(d=>!d.closest('[hidden]')&&!d.hidden).map(d=>d.id+(d.open?'*':'')));
  const nch = await p.$$eval('.gx-chapter:not([data-lens])', x=>x.length), chips = await p.$$eval('.gx-tags .band-nav__chip', a=>a.length);
  ok('chapter chips = All + chapters', chips===nch+1, chips+' vs '+(nch+1));
  const all0 = await vis(); ok('landing: all folds closed', all0.every(x=>!x.endsWith('*')), all0.filter(x=>x.endsWith('*')).join(','));
  /* §8 lens chapters (data-lens) are reached from the doors, never from the chapter bar */
  const lenses = await p.$$eval('.gx-chapter[data-lens]', x=>x.map(c=>c.dataset.chapter)); const navch = await p.$$eval('.gx-chapter:not([data-lens])', x=>x.map(c=>c.dataset.chapter)); const chapters = navch;
  for (const ch of chapters) {
    await p.goto(U+'#t='+ch,{waitUntil:'load'}); await p.waitForTimeout(1200);
    const v = await vis();
    const want = await p.evaluate(ch=>[...document.querySelectorAll('.container[class*="gx-"] details.sfold[data-tags]')].filter(d=>(' '+d.dataset.tags+' ').includes(' '+ch+' ')).map(d=>d.id), ch);
    ok(`chapter ${ch}: only its folds, closed`, JSON.stringify(v)===JSON.stringify(want) && v.every(x=>!x.endsWith('*')), v.join(','));
    const ro = await p.$eval('.gx-readout', r=>!r.hidden && r.textContent).catch(()=>false); ok(`chapter ${ch}: readout shows`, !!ro, String(ro).slice(0,60));
    const sub = await p.$$eval('.gx-chapter[data-chapter="'+ch+'"] .gx-subtag', a=>a.map(x=>x.dataset.tag));
    if (sub.length) { await p.goto(U+'#t='+sub[0],{waitUntil:'load'}); await p.waitForTimeout(1200); const s=await vis();
      /* #tables never auto-opens (the organiser renders inside it): exempt it from 'opened' */
      ok(`sub-tag ${sub[0]}: its folds only${s.length<=3?', opened':''}`, s.length>0 && (s.length>3 || s.filter(x=>x.replace('*','')!=='tables').every(x=>x.endsWith('*'))), s.join(',')); }
  }
  // pointer card → table card while filtered
  const ref = await p.$$eval('.fcard__ref a', a=>a.map(x=>[x.getAttribute('href'), x.closest('details.sfold').id, x.closest('details.sfold').dataset.tags.split(' ')[1]]));
  if (ref.length) { const [h, fid, st] = ref[0];
    await p.goto(U+'#t='+st,{waitUntil:'load'}); await p.waitForTimeout(1500);
    await p.evaluate(([fid,h])=>{const a=document.querySelector('#'+fid+' .fcard__ref a[href="'+h+'"]'); for(let d=a.closest('details');d;d=d.parentElement&&d.parentElement.closest('details')) d.open=true;}, [fid,h]); await p.waitForTimeout(300);
    await p.locator('#'+fid+' .fcard__ref a[href="'+h+'"]').first().click(); await p.waitForTimeout(1300);
    const t = await p.evaluate(h=>{const e=document.getElementById(h.slice(1)); if(!e) return 'missing'; const r=e.getBoundingClientRect(); return {hidden:!!e.closest('[hidden]'), top:Math.round(r.top), h:Math.round(r.height)}}, h);
    ok('pointer link lands on its visible table card', t!=='missing' && !t.hidden && t.h>0 && t.top>-50 && t.top<400, h+' '+JSON.stringify(t)); }
  await p.goto(U+'#t='+chapters[0],{waitUntil:'load'}); await p.waitForTimeout(1000);
  await p.click('.gx-tags .band-nav__chip[data-tag=""]'); await p.waitForTimeout(600);
  let v=await vis(); ok('All restores every fold', v.length===all0.length, v.length+' vs '+all0.length);
  await p.click('.gx-tags .band-nav__chip[data-tag="'+chapters[1]+'"]'); await p.waitForTimeout(500); await p.goBack(); await p.waitForTimeout(800);
  v=await vis(); ok('back button clears the filter', v.length===all0.length, v.length+' vs '+all0.length);
  await p.goto(U,{waitUntil:'load'}); await p.waitForTimeout(4500);
  const nterm=await p.$$eval('span.term',x=>x.length); ok('glossary marks terms', nterm>50, String(nterm));
  const nfacts=await p.$$eval('.fcard__facts',x=>x.length), nf=await p.$$eval('details.fcard',x=>x.length); ok('every card carries labelled facts', nfacts>=nf, nfacts+' facts / '+nf+' cards');
  const cs = await p.evaluate(()=>{const c=document.getElementById('ce-soir'); return c?{inTail:!!c.closest('.gx-tail'), groups:c.querySelectorAll('.gx-cs-group').length}:'missing'}); ok('guest list at the foot, 3 groups', cs!=='missing'&&cs.inTail&&cs.groups===3, JSON.stringify(cs));
  const m = await b.newPage({viewport:{width:390,height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true});
  m.on('pageerror',e=>errs.push('phone: '+e.message));
  await m.goto(U,{waitUntil:'load'}); await m.waitForTimeout(4500);
  ok('phone 390: no sideways scroll', (await m.evaluate(()=>document.documentElement.scrollWidth))<=390);
  await m.evaluate(()=>{document.querySelectorAll('details.sfold').forEach(d=>d.open=true); document.querySelectorAll('details.fcard').forEach(d=>d.open=true);}); await m.waitForTimeout(800);
  const sw=await m.evaluate(()=>document.documentElement.scrollWidth); ok('phone 390, everything open: no sideways scroll', sw<=390, String(sw));
  ok('no page errors', errs.length===0, errs.slice(0,3).join(' / '));
  await b.close();
})();
