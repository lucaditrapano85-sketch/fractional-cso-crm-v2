function renderPMIHome(p) {
  const nome = p.nome_azienda || window._userProfileData?.company_name || 'Benvenuto';
  const score = p.score_globale || 0;
  const dims = p.dims || {};
  const STD = ['Vendite','Marketing','Clienti','Pipeline','Pricing','Processi','Team','Digitale'];

  // Colore score
  const scoreColor = score < 40 ? '#F43F5E' : score < 60 ? '#FBBF24' : '#34D399';
  const scoreLabel = score < 30 ? 'Emergenza' : score < 50 ? 'Intervento urgente' : score < 70 ? 'In crescita' : 'Eccellenza';

  // Livello gamification
  const livello = score < 25 ? 'Emergenza' : score < 50 ? 'Sopravvivenza' : score < 75 ? 'Crescita' : 'Eccellenza';
  const prossimoLivello = score < 25 ? 'Sopravvivenza' : score < 50 ? 'Crescita' : score < 75 ? 'Eccellenza' : 'Master';

  // Azione settimanale
  const azione = window._azioneSettimanale || 'Chiama i tuoi 5 clienti migliori e chiedi come puoi aiutarli questa settimana.';
  const azioneDim = window._azioneDimensione || 'Vendite';

  // Media settore (placeholder, verrà da benchmark ISTAT)
  const mediaSett = 60;

  // Sfondo deep space
  document.getElementById('app-pmi').style.background = '#06080F';

  const mainEl = document.querySelector('#app-pmi .pmi-main') || document.querySelector('#app-pmi > div:last-child');
  mainEl.style.background = 'transparent';
  mainEl.style.position = 'relative';
  mainEl.style.overflow = 'hidden';

  mainEl.innerHTML = `
    <canvas id="leva-waves-home" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;"></canvas>
    <div style="position:relative;z-index:1;padding:24px 28px;">

      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <div>
          <div style="color:rgba(255,255,255,0.3);font-size:12px;letter-spacing:0.05em;text-transform:uppercase;">Buongiorno</div>
          <div style="color:white;font-size:24px;font-weight:500;margin-top:2px;">${nome}</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <div style="height:8px;width:8px;border-radius:50%;background:#34D399;animation:leva-pulse 2s infinite;"></div>
          <span style="color:rgba(255,255,255,0.35);font-size:12px;">Live</span>
          <div style="padding:5px 12px;border-radius:8px;border:0.5px solid rgba(255,107,43,0.3);color:#FF6B2B;font-size:12px;">${livello}</div>
          <div style="padding:5px 12px;border-radius:8px;border:0.5px solid rgba(123,97,255,0.3);color:#A78BFA;font-size:12px;">Sett. 1</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px;margin-bottom:20px;">
        <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.05);border-radius:12px;padding:16px;">
          <div style="color:rgba(255,255,255,0.3);font-size:11px;margin-bottom:8px;">SCORE</div>
          <div style="color:${scoreColor};font-size:32px;font-weight:500;">${score}</div>
          <div style="color:rgba(255,255,255,0.2);font-size:11px;margin-top:4px;">su 100</div>
        </div>
        <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.05);border-radius:12px;padding:16px;">
          <div style="color:rgba(255,255,255,0.3);font-size:11px;margin-bottom:8px;">RECUPERO STIMATO</div>
          <div style="color:#34D399;font-size:32px;font-weight:500;">€2.000</div>
          <div style="color:rgba(255,255,255,0.2);font-size:11px;margin-top:4px;">questo mese</div>
        </div>
        <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.05);border-radius:12px;padding:16px;">
          <div style="color:rgba(255,255,255,0.3);font-size:11px;margin-bottom:8px;">AZIONI</div>
          <div style="color:#7B61FF;font-size:32px;font-weight:500;">0<span style="font-size:16px;color:rgba(255,255,255,0.15);">/12</span></div>
          <div style="height:3px;background:rgba(255,255,255,0.04);border-radius:2px;margin-top:8px;"><div style="height:100%;width:0%;background:#7B61FF;border-radius:2px;"></div></div>
        </div>
        <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.05);border-radius:12px;padding:16px;">
          <div style="color:rgba(255,255,255,0.3);font-size:11px;margin-bottom:8px;">STREAK</div>
          <div style="color:#FF6B2B;font-size:32px;font-weight:500;">0<span style="font-size:14px;color:rgba(255,255,255,0.15);"> sett</span></div>
          <div style="display:flex;gap:3px;margin-top:8px;">
            ${[1,2,3,4,5].map(()=>'<div style="width:16px;height:4px;border-radius:2px;background:rgba(255,255,255,0.04);"></div>').join('')}
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1.2fr 0.8fr;gap:16px;margin-bottom:16px;">
        <div>
          <div style="background:rgba(123,97,255,0.07);border:0.5px solid rgba(123,97,255,0.18);border-radius:14px;padding:20px;margin-bottom:12px;animation:leva-glow 4s infinite;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
              <div style="width:6px;height:6px;border-radius:50%;background:#7B61FF;animation:leva-pulse 1.5s infinite;"></div>
              <div style="color:#A78BFA;font-size:12px;font-weight:500;">Leva dice</div>
              <div style="color:rgba(255,255,255,0.2);font-size:11px;">ora</div>
            </div>
            <div style="color:white;font-size:15px;line-height:1.6;">${azione}</div>
            <div style="margin-top:14px;display:flex;gap:8px;">
              <div style="padding:8px 16px;border-radius:8px;background:#7B61FF;color:white;font-size:13px;cursor:pointer;">Fatto</div>
              <div style="padding:8px 16px;border-radius:8px;border:0.5px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.35);font-size:13px;cursor:pointer;">Dimmi di piu</div>
            </div>
          </div>

          <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.05);border-radius:14px;padding:20px;">
            <div style="color:rgba(255,255,255,0.3);font-size:12px;margin-bottom:14px;">I TUOI KPI</div>
            ${['Vendite','Pipeline','Clienti'].map((d,i) => {
              const val = dims[d] || 0;
              const colors = ['#7B61FF','#FBBF24','#34D399'];
              return `<div style="margin-bottom:${i<2?'14px':'0'};">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <span style="color:rgba(255,255,255,0.4);font-size:12px;">${d}</span>
                  <span style="color:white;font-size:13px;font-weight:500;">${val}/100</span>
                </div>
                <div style="height:4px;background:rgba(255,255,255,0.03);border-radius:2px;">
                  <div style="height:100%;width:${val}%;background:${colors[i]};border-radius:2px;"></div>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>

        <div>
          <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.05);border-radius:14px;padding:20px;margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
              <div style="color:rgba(255,255,255,0.3);font-size:12px;">PROSSIMO LIVELLO</div>
              <div style="color:#FF6B2B;font-size:13px;font-weight:500;">${prossimoLivello}</div>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.03);border-radius:3px;margin-bottom:10px;">
              <div style="height:100%;width:${Math.min(score/75*100,100)}%;background:#FF6B2B;border-radius:3px;"></div>
            </div>
          </div>

          <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.05);border-radius:14px;padding:20px;">
            <div style="color:rgba(255,255,255,0.3);font-size:12px;margin-bottom:12px;">POSIZIONAMENTO</div>
            ${STD.map(d => {
              const val = dims[d] || 0;
              const c = val < 40 ? '#F43F5E' : val < 60 ? '#FBBF24' : '#34D399';
              return `<div style="margin-bottom:8px;">
                <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
                  <span style="color:rgba(255,255,255,0.35);font-size:11px;">${d}</span>
                  <span style="color:${c};font-size:11px;">${val}</span>
                </div>
                <div style="height:4px;background:rgba(255,255,255,0.03);border-radius:2px;position:relative;">
                  <div style="height:100%;width:${val}%;background:${c};border-radius:2px;"></div>
                  <div style="position:absolute;top:-1px;left:${mediaSett}%;width:1px;height:6px;background:rgba(255,255,255,0.12);"></div>
                </div>
              </div>`;
            }).join('')}
            <div style="color:rgba(255,255,255,0.1);font-size:10px;margin-top:6px;">| = media settore</div>
          </div>
        </div>
      </div>

      <div style="background:rgba(255,255,255,0.015);border:0.5px solid rgba(255,255,255,0.03);border-radius:14px;padding:16px 20px;display:flex;align-items:center;gap:12px;">
        <div style="width:6px;height:6px;border-radius:50%;background:#7B61FF;animation:leva-pulse 2s infinite;"></div>
        <div style="color:rgba(255,255,255,0.35);font-size:13px;flex:1;">Analizzando i tuoi dati...</div>
        <div style="padding:6px 14px;border-radius:8px;border:0.5px solid rgba(123,97,255,0.3);color:#A78BFA;font-size:12px;cursor:pointer;">Chiedi a Leva</div>
      </div>

    </div>
  `;

  // Avvia le onde
  if (window.initLevaWaves) {
    if (window._wavesInstance) window._wavesInstance.stop();
    window._wavesInstance = initLevaWaves('leva-waves-home');
  }
}
