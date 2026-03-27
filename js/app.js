// -- STATE -------------------------------------------------
let prospects = [];
let currentId = null;
let editingId = null;
let currentCalls = [];

// -- UTILS -------------------------------------------------
function calcScore(p) {
  if (!p.dims || !Object.keys(p.dims).length) return 0;
  const w = {vendite:18,pipeline:18,team:14,processi:12,ricavi:14,marketing:12,sitoweb:6,ecommerce:6};
  let total = 0;
  for (const [k,wt] of Object.entries(w)) {
    const v = p.dims[k] || 0;
    total += (v/5)*wt;
  }
  return Math.round((total/100)*100);
}

// Calcola score da un oggetto dims generico
function calcScoreFromDims(dims) {
  const w = {vendite:18,pipeline:18,team:14,processi:12,ricavi:14,marketing:12,sitoweb:6,ecommerce:6};
  let total = 0;
  for (const [k,wt] of Object.entries(w)) total += ((dims[k]||0)/5)*wt;
  return Math.round(total);
}

// Calcola score target dai targets impostati
function calcScoreTarget(p) {
  const w = {vendite:18,pipeline:18,team:14,processi:12,ricavi:14,marketing:12,sitoweb:6,ecommerce:6};
  const dims = p.dims || {};
  const targets = p.targets || {};
  let total = 0;
  for (const [k,wt] of Object.entries(w)) {
    const tgt = targets[k] || dims[k] || 0;
    total += (tgt/5)*wt;
  }
  return Math.round(total);
}

// Calcola score live: aggiorna i dims in base alle azioni completate
// Ogni azione completata su uno step fa avanzare proporzionalmente il livello
function calcScoreLive(p) {
  const dims = {...(p.dims || {})};
  const targets = p.targets || {};
  const azioniDone = p.azioni_completate || {};
  const azioniCustom = p.azioni_custom || {};
  const settore = p.settore || '';
  const DIMS_IDS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];

  DIMS_IDS.forEach(dimId => {
    const cur = dims[dimId] || 0;
    const tgt = targets[dimId] || cur;
    if (tgt <= cur) return;
    // Per ogni step, conta azioni totali e completate
    for (let step = cur; step < tgt; step++) {
      const stepKey = dimId + '_' + step + '_' + (step+1);
      const azioniCustomList = (azioniCustom[stepKey] || []);
      // Azioni predefinite: 1 per step (la principale)
      const totAzioni = 1 + azioniCustomList.length;
      // Azioni completate: conta quelle flaggate
      let completate = 0;
      const doneKeys = azioniDone[stepKey] || {};
      if (doneKeys.main) completate++;
      azioniCustomList.forEach((_, i) => { if (doneKeys['custom_' + i]) completate++; });
      // Avanza il livello proporzionalmente
      if (totAzioni > 0) {
        dims[dimId] = (dims[dimId] || cur) + (completate / totAzioni);
      }
    }
  });
  return calcScoreFromDims(dims);
}

// Salva snapshot score_history su Supabase
async function salvaScoreSnapshot(p, evento, nota) {
  const scoreAttuale = calcScore(p);
  const scoreLive = calcScoreLive(p);
  const history = p.score_history || [];
  const snapshot = {
    data: new Date().toISOString(),
    score: scoreLive,
    score_base: scoreAttuale,
    dims: {...(p.dims || {})},
    targets: {...(p.targets || {})},
    evento: evento || 'Aggiornamento',
    nota: nota || ''
  };
  // Evita duplicati a distanza di meno di 1 minuto con lo stesso score
  const ultimo = history[history.length - 1];
  if (ultimo && Math.abs(new Date(ultimo.data) - new Date()) < 60000 && ultimo.score === scoreLive) return;
  const newHistory = [...history, snapshot];
  await sb.from('prospects').update({score_history: newHistory}).eq('id', p.id);
  const i = prospects.findIndex(x => x.id === p.id);
  if (i >= 0) prospects[i].score_history = newHistory;
}

function scoreColor(s) {
  if(s>=70) return {text:'#4A9A6A',bg:'#1A2E22',border:'#4A9A6A',label:'Buona base'};
  if(s>=45) return {text:'#C9973A',bg:'#2A2010',border:'#C9973A',label:'Da sviluppare'};
  return {text:'#C05040',bg:'#2A1510',border:'#C05040',label:'Critica'};
}

function showToast(msg, type='success') {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = `toast ${type} show`;
  setTimeout(()=>t.classList.remove('show'), 3000);
}

// -- SESSIONE MODAL ------------------------------------------
function openSessioneModal() {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;
  var DIMS_S = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  var DIM_LABELS_S = {vendite:'Sviluppo clienti',pipeline:'Pipeline & CRM',team:'Team commerciale',processi:'Processi & Compliance',ricavi:'Ricavi & Margini',marketing:'Marketing & Domanda',sitoweb:'Sito Web & Presenza',ecommerce:(typeof getDimLabel==='function'?getDimLabel(p.settore,'ecommerce'):'Ecommerce')};
  var oggi = new Date().toISOString().split('T')[0];
  var dimsHtml = DIMS_S.map(function(d) {
    var livelloAttuale = p.dims?.[d] || 1;
    var targetDim = p.targets?.[d] || livelloAttuale;
    var giaAlTarget = p.targets?.[d] && livelloAttuale >= targetDim;
    var opzioni = '';
    for (var i = livelloAttuale + 1; i <= 5; i++) opzioni += '<option value="'+i+'">'+i+'</option>';
    return '<div class="sess-upgrade-row'+(giaAlTarget?' sess-upgrade-disabled':'')+'" id="sess-row-'+d+'">' +
      '<div class="sess-upgrade-check"><input type="checkbox" id="sess-chk-'+d+'"'+(giaAlTarget?' disabled':'')+' onchange="sessToggleUpgrade(\''+d+'\',this.checked)"></div>' +
      '<div class="sess-upgrade-info"><div class="sess-upgrade-label">'+DIM_LABELS_S[d]+'</div><div class="sess-upgrade-current">Livello attuale: <strong>'+livelloAttuale+'/5</strong>'+(giaAlTarget?' \u00B7 gia al target':' \u00B7 target: '+targetDim+'/5')+'</div></div>' +
      '<div class="sess-upgrade-select" id="sess-sel-wrap-'+d+'" style="display:none"><span class="sess-upgrade-arrow">'+livelloAttuale+' \u2192</span><select class="form-input sess-upgrade-input" id="sess-sel-'+d+'" onchange="sessAggiornaRiepilogo()">'+opzioni+'</select></div>' +
    '</div>';
  }).join('');
  document.getElementById('modal-sessione-body').innerHTML =
    '<div class="sess-date-row"><label>Data sessione</label><input class="form-input" id="sess-data" type="date" value="'+oggi+'"></div>' +
    '<div class="sess-note-row"><label>Note sessione</label><textarea class="form-input" id="sess-note" rows="2" placeholder="Cosa e stato affrontato in questa sessione..."></textarea></div>' +
    '<div class="sess-upgrade-title">Upgrade reali raggiunti in questa sessione</div>' +
    '<div class="sess-upgrade-hint">Segna solo le dimensioni dove il cliente ha implementato concretamente qualcosa \u2014 non dove vuole arrivare.</div>' +
    '<div class="sess-upgrade-list">'+dimsHtml+'</div>' +
    '<div class="sess-riepilogo" id="sess-riepilogo" style="display:none"></div>';
  document.getElementById('modal-sessione-title').textContent = 'Registra sessione \u2014 ' + p.nome;
  document.getElementById('modal-sessione').style.display = 'flex';
}

function sessToggleUpgrade(dim, checked) {
  var wrap = document.getElementById('sess-sel-wrap-' + dim);
  if (wrap) wrap.style.display = checked ? 'flex' : 'none';
  sessAggiornaRiepilogo();
}

function sessAggiornaRiepilogo() {
  var DIMS_S = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  var DIM_LABELS_S = {vendite:'Sviluppo clienti',pipeline:'Pipeline & CRM',team:'Team commerciale',processi:'Processi',ricavi:'Ricavi',marketing:'Marketing',sitoweb:'Sito Web',ecommerce:'Ecommerce'};
  var p = prospects.find(function(x) { return x.id === currentId; });
  var upgrades = DIMS_S.filter(function(d) { return document.getElementById('sess-chk-'+d)?.checked; });
  var riepilogo = document.getElementById('sess-riepilogo');
  if (!riepilogo) return;
  if (!upgrades.length) { riepilogo.style.display = 'none'; return; }
  var testi = upgrades.map(function(d) {
    var attuale = p?.dims?.[d] || 1;
    var nuovo = document.getElementById('sess-sel-'+d)?.value;
    return '<span class="sess-riepilogo-item">'+DIM_LABELS_S[d]+': '+attuale+' \u2192 '+nuovo+'</span>';
  }).join('');
  riepilogo.style.display = 'flex';
  riepilogo.innerHTML = '<span class="sess-riepilogo-label">Upgrade da registrare:</span> ' + testi;
}

async function saveSessione() {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;
  var DIMS_S = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  var nota = document.getElementById('sess-note')?.value || '';
  var data = document.getElementById('sess-data')?.value || new Date().toISOString().split('T')[0];
  var newDims = Object.assign({}, p.dims || {});
  var upgradeEseguiti = {};
  var hasUpgrade = false;
  DIMS_S.forEach(function(d) {
    if (document.getElementById('sess-chk-'+d)?.checked) {
      var nuovoLivello = parseInt(document.getElementById('sess-sel-'+d)?.value);
      if (nuovoLivello && nuovoLivello > (p.dims?.[d] || 1)) {
        newDims[d] = nuovoLivello;
        upgradeEseguiti[d] = { da: p.dims?.[d] || 1, a: nuovoLivello };
        hasUpgrade = true;
      }
    }
  });
  if (hasUpgrade) {
    p.dims = newDims;
    await sb.from('prospects').update({ dims: newDims }).eq('id', p.id);
  }
  var scoreVal = calcScore({ dims: newDims });
  var snapshot = {
    data: new Date(data).toISOString(),
    score: scoreVal,
    score_base: scoreVal,
    dims: Object.assign({}, newDims),
    targets: Object.assign({}, p.targets || {}),
    evento: hasUpgrade ? 'Sessione con upgrade' : 'Sessione registrata',
    nota: nota,
    upgrade: hasUpgrade ? upgradeEseguiti : null,
  };
  p.score_history = (p.score_history || []).concat([snapshot]);
  await sb.from('prospects').update({ score_history: p.score_history }).eq('id', p.id);
  document.getElementById('modal-sessione').style.display = 'none';
  await aggiornaStatoAutomatico(p.id, 'diagnosi');
  renderProspectDetail(p.id);
  showToast(hasUpgrade ? 'Sessione e upgrade salvati' : 'Sessione registrata');
}

function renderListinoServizi(macro) {
  macro = macro || 'manifatturiero';
  var container = document.getElementById('listino-table-container');
  if (!container) return;
  var DIMS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  var DIM_LABELS = {vendite:'Sviluppo commerciale',pipeline:'Pipeline & CRM',team:'Team commerciale',processi:'Processi & Compliance',ricavi:'Ricavi & Margini',marketing:'Marketing & Domanda',sitoweb:'Sito Web & Presenza',ecommerce:'Canale digitale / Specifico settore'};
  var DIM_DESC = {vendite:'Struttura della rete vendita, metodi di acquisizione e gestione dei clienti.',pipeline:'Implementazione CRM, tracciamento opportunita e gestione del funnel commerciale.',team:'Organizzazione, formazione e incentivazione del team commerciale.',processi:'Standardizzazione dei processi di vendita, offerte, contratti e compliance.',ricavi:'Ottimizzazione dei margini, pricing, upsell e gestione dei ricavi ricorrenti.',marketing:'Strategia di marketing, generazione domanda e posizionamento di mercato.',sitoweb:'Ottimizzazione della presenza web, SEO, contenuti e lead generation digitale.',ecommerce:'Canale e-commerce, vendita digitale o dimensione specifica del settore.'};
  var STEP_DESC = {'1':'Base','2':'Strutturato','3':'Ottimizzato','4':'Eccellente','5':'Eccellente+'};
  var listinoMacro = (typeof LISTINO_DEFAULT !== 'undefined' ? LISTINO_DEFAULT[macro] : null) || {};
  var fmtV = function(v) { return v ? v.toLocaleString('it-IT') + '\u20AC' : '\u2014'; };
  var cards = DIMS.map(function(dim) {
    var dimData = listinoMacro[dim] || {};
    var steps = ['1','2','3','4','5'];
    var microKeys = typeof AZIONI_TARGET_BY_SETTORE !== 'undefined' ? Object.keys(AZIONI_TARGET_BY_SETTORE).filter(function(k) { return k.startsWith(macro + '_'); }) : [];
    var microKey = microKeys[0] || (typeof AZIONI_TARGET_BY_SETTORE !== 'undefined' ? Object.keys(AZIONI_TARGET_BY_SETTORE)[0] : '');
    var azioniDim = (typeof AZIONI_TARGET_BY_SETTORE !== 'undefined' && AZIONI_TARGET_BY_SETTORE[microKey]) ? AZIONI_TARGET_BY_SETTORE[microKey][dim] : null;
    var stepRows = steps.map(function(s) {
      var d = dimData[s] || {};
      var rawDesc = (azioniDim && azioniDim[s]) ? azioniDim[s] : '';
      var firstSentence = rawDesc.split('.')[0].trim();
      var stepDesc = firstSentence.length > 10 ? firstSentence + '.' : STEP_DESC[s];
      // Per automotive usa dettagli specifici
      var p = typeof prospects !== 'undefined' && typeof currentId !== 'undefined' ? prospects.find(function(x){return x.id===currentId}) : null;
      var isAutomotive = ['commercio_auto_moto_usato','commercio_auto_moto_nuovo'].indexOf(p && p.settore ? p.settore : '') >= 0;
      if (isAutomotive && typeof getStepDetail === 'function') {
        var detail = getStepDetail(p.settore, dim, s);
        if (detail) stepDesc = detail.chi + ' \u2014 ' + detail.cosa;
      }
      return '<div class="ls-step-row">' +
        '<div class="ls-step-left">' +
          '<div class="ls-step-badge">Livello ' + s + '</div>' +
          '<div class="ls-step-desc">' + stepDesc + '</div>' +
        '</div>' +
        '<div class="ls-step-costs">' +
          '<span class="ls-cost-item"><span class="ls-cost-label">Mensile</span><span class="ls-cost-val ' + (d.r ? '' : 'ls-cost-zero') + '">' + (d.r ? fmtV(d.r) : '\u2014') + '</span></span>' +
          '<span class="ls-cost-sep">+</span>' +
          '<span class="ls-cost-item"><span class="ls-cost-label">Una tantum</span><span class="ls-cost-val ' + (d.u ? '' : 'ls-cost-zero') + '">' + (d.u ? fmtV(d.u) : '\u2014') + '</span></span>' +
        '</div></div>';
    }).join('');
    var primo = dimData['1'] || {};
    return '<div class="ls-card">' +
      '<div class="ls-card-header"><div class="ls-card-title">' + DIM_LABELS[dim] + '</div><div class="ls-card-badge">' + (primo.r ? 'da ' + fmtV(primo.r) + '/mese' : '\u2014') + '</div></div>' +
      '<div class="ls-card-desc">' + DIM_DESC[dim] + '</div>' +
      '<div class="ls-steps">' + stepRows + '</div></div>';
  }).join('');
  container.innerHTML =
    '<div class="ls-grid">' + cards + '</div>' +
    '<div class="ls-footer">Valori al netto IVA \u00B7 R = costo ricorrente mensile \u00B7 U = costo una tantum \u00B7 I prezzi variano in base alla complessita del cliente</div>';
}

function lsMacroSwitch(macro, btn) {
  document.querySelectorAll('.ls-macro-btn').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  renderListinoServizi(macro);
}

function glosCerca(valore) {
  const q = valore.toLowerCase().trim();
  const body = document.getElementById('glos-body');
  if (!body) return;

  if (q.length > 0 && q.length < 3) return;

  if (!q) {
    const bodyR = document.getElementById('glos-body');
    if (bodyR && window._glosGlossario) {
      const htmlR = window._glosGlossario.map(cat => `
        <div class="glos-categoria">
          <div class="glos-cat-title">${cat.categoria}</div>
          <div class="glos-termini">
            ${cat.termini.map(t => `
              <div class="glos-card">
                <div class="glos-card-top">
                  <div class="glos-termine">${t.termine}</div>
                  <div class="glos-cat-badge">${cat.categoria}</div>
                </div>
                <div class="glos-def">${t.def}</div>
                ${t.esempio ? `<div class="glos-esempio"><span class="glos-es-label">Esempio</span>${t.esempio}</div>` : ''}
              </div>`).join('')}
          </div>
        </div>`).join('');
      bodyR.innerHTML = htmlR;
    }
    return;
  }

  const termini = window._glosTermini || [];
  const filtrati = termini.filter(t =>
    t.termine.toLowerCase().includes(q) ||
    t.def.toLowerCase().includes(q) ||
    (t.esempio || '').toLowerCase().includes(q) ||
    (t.categoria || t.cat || '').toLowerCase().includes(q)
  );

  if (!filtrati.length) {
    body.innerHTML = '<div class="glos-empty">Nessun termine trovato per "' + valore + '"</div>';
    return;
  }

  body.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:10px;padding:0">' +
    filtrati.map(t => `
      <div class="glos-card">
        <div class="glos-card-top">
          <div class="glos-termine">${t.termine}</div>
          <div class="glos-cat-badge">${t.categoria || t.cat || ''}</div>
        </div>
        <div class="glos-def">${t.def}</div>
        ${t.esempio ? `<div class="glos-esempio"><span class="glos-es-label">Esempio</span>${t.esempio}</div>` : ''}
      </div>`).join('') + '</div>';
}

function renderGlossario() {
  var container = document.getElementById('view-glossario');
  if (!container) return;

  var GLOSSARIO = [
    {
      categoria: 'Score & Dimensioni',
      termini: [
        { termine: 'Score commerciale', def: 'Punteggio da 0 a 100 che misura la maturita commerciale complessiva dell\'azienda. E la media pesata dei livelli raggiunti nelle 8 dimensioni.', esempio: 'Un\'azienda con score 45 ha ancora ampi margini di miglioramento su vendite, pipeline e marketing.' },
        { termine: 'Dimensione', def: 'Uno degli 8 pilastri della struttura commerciale: Vendite, Pipeline, Team, Processi, Ricavi, Marketing, Sito Web e una dimensione specifica del settore (es. Cantieri & Preventivazione per l\'edilizia, After Sales per l\'automotive).', esempio: 'La dimensione Pipeline misura quanto l\'azienda traccia e gestisce le opportunita commerciali aperte.' },
        { termine: 'Livello (1-5)', def: 'Scala di maturita per ogni dimensione. 1 = assente o molto rudimentale. 2 = presente ma non strutturato. 3 = strutturato ma non ottimizzato. 4 = ottimizzato con KPI misurabili. 5 = eccellente e scalabile senza dipendenza dal titolare.', esempio: 'Vendite a livello 2 significa che il titolare vende tutto da solo senza un processo replicabile.' },
        { termine: 'Target / Obiettivo', def: 'Il livello che si vuole raggiungere in ogni dimensione entro il mandato. Definisce il piano di lavoro e determina la proiezione di crescita del fatturato.', esempio: 'Portare Pipeline da 2 a 4 significa implementare un CRM attivo con stage gate, forecast e pipeline review settimanale.' },
        { termine: 'Gap', def: 'La differenza tra il livello attuale e il target. Indica quanto lavoro rimane da fare su quella dimensione e guida la prioritizzazione degli interventi.', esempio: 'Gap di +2 su Vendite significa due step di miglioramento -- ad esempio da "solo passaparola" a "rete agenti strutturata con KPI".' },
        { termine: 'Score live vs Score target', def: 'Lo score live riflette i livelli reali attuali dell\'azienda. Lo score target riflette i livelli obiettivo del piano. La differenza tra i due mostra il potenziale di crescita commerciale ancora da realizzare.', esempio: 'Score live 45, score target 70: l\'azienda ha un potenziale di +25 punti ancora da esprimere con il piano di intervento.' },
      ]
    },
    {
      categoria: 'Logiche del Modello',
      termini: [
        { termine: 'Modello a Diminishing Returns', def: 'Il modello di proiezione usa una curva a rendimenti decrescenti: ogni step di miglioramento porta meno crescita percentuale del precedente. Passare da 1 a 2 e piu impattante che passare da 4 a 5 perche si parte da una base piu bassa e i margini di recupero sono maggiori.', esempio: 'Portare Pipeline da 1 a 2 puo generare +8% di fatturato a 12 mesi. Portarlo da 4 a 5 ne genera solo +3%, perche l\'azienda e gia strutturata.' },
        { termine: 'Bilanciamento dimensioni', def: 'Il modello penalizza automaticamente i piani sbilanciati. Se si spinge una sola dimensione al massimo senza sviluppare le dimensioni correlate, l\'efficacia reale si riduce fino al 50%. Una struttura commerciale funziona come un sistema -- ogni componente dipende dagli altri.', esempio: 'Portare Vendite a 5 senza migliorare Pipeline genera una penalita: i venditori trovano opportunita che poi si perdono senza un sistema di tracciamento.' },
        { termine: 'Matrice di dipendenze', def: 'Ogni dimensione ha dipendenze logiche da altre dimensioni. Vendite dipende da Pipeline e Team. Marketing dipende da Sito Web. Ecommerce dipende da Marketing e Sito Web. Team dipende da Processi. Ricavi dipende da Vendite e Pipeline.', esempio: 'Investire solo in Marketing senza un Sito Web ottimizzato genera traffico che non converte -- spreco puro.' },
        { termine: 'Tetti strutturali', def: 'Alcune dimensioni hanno un livello massimo realistico in base al modello di business del settore. Un produttore conto terzi non puo portare l\'e-commerce oltre il livello 1 senza cambiare il proprio modello di business. Superare il tetto mostra un warning -- non e un blocco, ma una riflessione strategica obbligatoria.', esempio: 'Un grossista alimentare con tetto ecommerce a 2 puo costruire un portale ordini B2B, ma non ha senso puntare alla vendita diretta al consumatore finale.' },
        { termine: 'Coefficiente di efficienza', def: 'Numero tra 0 e 1 che misura quanto una dimensione riesce ad esprimere il suo pieno potenziale in base allo sviluppo delle dimensioni dipendenti. Un coefficiente di 0.5 significa che quella dimensione sta esprimendo solo meta del suo potenziale teorico.', esempio: 'Marketing con coefficiente 0.6 perche il Sito Web e a livello 1: i contenuti vengono prodotti ma il sito non converte -- efficienza al 60%.' },
        { termine: 'Penalita di sbilanciamento', def: 'Riduzione automatica del contributo di una dimensione quando le sue dipendenze sono significativamente piu basse. La penalita massima e del 50% -- anche nel peggiore dei casi una dimensione mantiene almeno meta del suo potenziale, perche nella realta i sistemi non si azzerano mai completamente.', esempio: 'Vendite a target 5 con Pipeline a 1: penalita del 50%. Il contributo effettivo di Vendite al fatturato viene dimezzato nel calcolo della proiezione.' },
      ]
    },
    {
      categoria: 'KPI Commerciali',
      termini: [
        { termine: 'Tasso di conversione', def: 'Percentuale di contatti o lead qualificati che diventano clienti paganti. Misura l\'efficacia del processo commerciale dalla prima call alla firma. E il KPI piu diretto dell\'efficacia della forza vendita.', esempio: 'Tasso del 20%: su 10 contatti qualificati, 2 diventano clienti. La media del settore serramenti e 25% -- essere al 10% indica un problema nel processo di offerta o follow-up.' },
        { termine: 'Ciclo di vendita', def: 'Numero medio di giorni tra il primo contatto e la firma del contratto. Un ciclo lungo blocca la pipeline e rallenta la crescita. Ridurlo richiede processi di qualificazione piu rapidi e offerte piu chiare.', esempio: 'Ciclo di 90 giorni contro benchmark di 22 giorni: l\'azienda impiega 4 volte piu tempo della media per chiudere -- indica offerte lente, follow-up irregolare o mancanza di urgenza nel processo.' },
        { termine: 'Valore medio ordine', def: 'Importo medio per ogni contratto o ordine. Aumentarlo e spesso piu efficiente che aumentare il numero di clienti perche non aumenta proporzionalmente il costo commerciale.', esempio: 'Passare da 5.000 a 8.000 di ticket medio con lo stesso numero di clienti aumenta il fatturato del 60% senza assumere nessuno.' },
        { termine: 'Concentrazione top 3 clienti', def: 'Percentuale di fatturato generata dai 3 clienti principali. Sopra il 50% indica un rischio di dipendenza elevato: perdere un cliente chiave puo destabilizzare l\'intera azienda. E un indicatore critico di resilienza commerciale.', esempio: 'Concentrazione al 70%: se il cliente principale (che vale il 40% del fatturato) decide di cambiare fornitore, l\'azienda perde quasi meta dei ricavi in un anno.' },
        { termine: 'Tasso di riacquisto', def: 'Percentuale di clienti che tornano ad acquistare nel corso dell\'anno o del ciclo commerciale. Un tasso alto riduce il CAC medio e stabilizza il fatturato. E il principale indicatore di soddisfazione e fidelizzazione.', esempio: 'Tasso dell\'80%: 8 clienti su 10 tornano. Serve acquisirne solo 2 nuovi per mantenere la base -- molto piu efficiente che dipendere interamente dall\'acquisizione.' },
        { termine: 'CAC -- Costo di Acquisizione Cliente', def: 'Quanto spende l\'azienda in media per acquisire un nuovo cliente. Include costi di marketing, commerciale, tempo del titolare e strumenti. Va sempre confrontato con il valore medio dell\'ordine o con il LTV del cliente.', esempio: 'CAC di 500 con ticket medio di 5.000 e sostenibile (ratio 1:10). CAC di 3.000 con lo stesso ticket e un problema strutturale -- l\'acquisizione costa troppo rispetto al valore generato.' },
        { termine: 'DSO -- Days Sales Outstanding', def: 'Giorni medi che passano dalla fattura all\'incasso effettivo. Un DSO alto indica problemi di liquidita e potere contrattuale debole. Ridurlo libera cassa senza aumentare il fatturato.', esempio: 'DSO di 90 giorni: i soldi restano fermi quasi 3 mesi. Con un fatturato di 500k/anno, l\'azienda ha mediamente 125k bloccati nei crediti commerciali.' },
        { termine: 'MRR / ARR', def: 'Monthly Recurring Revenue / Annual Recurring Revenue. Fatturato ricorrente da abbonamenti, contratti continuativi o canoni di manutenzione. Garantisce prevedibilita e stabilita -- e il modello di business piu resiliente.', esempio: 'MRR di 10.000 significa 120k/anno garantiti indipendentemente dall\'acquisizione di nuovi clienti. Per un system integrator, ogni contratto di manutenzione firmato aumenta il MRR.' },
        { termine: 'Fatturato da referral', def: 'Percentuale di fatturato che arriva da clienti segnalati da altri clienti o partner. E il canale con CAC piu basso e tasso di conversione piu alto perche c\'e gia fiducia pre-esistente.', esempio: 'Il 50% da referral: meta dei nuovi clienti arriva senza spese di marketing. Strutturare un programma di referral formale moltiplica questo effetto senza costi significativi.' },
      ]
    },
    {
      categoria: 'Proiezione & Piano Finanziario',
      termini: [
        { termine: 'Proiezione fatturato', def: 'Stima del fatturato raggiungibile a 6, 12, 24 e 36 mesi se si realizzano gli obiettivi del piano commerciale. E espressa come range min-max perche dipende da variabili esterne non controllabili. Si basa sul modello a diminishing returns applicato al settore specifico.', esempio: '484k-497k a 12 mesi: con il piano attuale e condizioni di mercato normali, il fatturato crescera in quella forchetta.' },
        { termine: 'Investimento mensile', def: 'Costo mensile complessivo del piano, includendo fee di consulenza, strumenti da implementare e attivita da attivare per ogni step. Varia in base alle dimensioni attivate e agli step da completare.', esempio: '3.600/mese comprende la fee del Fractional CSO e i costi degli strumenti necessari per gli step in corso.' },
        { termine: 'Costo una tantum', def: 'Investimento iniziale non ricorrente necessario per attivare alcune dimensioni. Tipicamente include setup di CRM, sito web, materiali commerciali o certificazioni.', esempio: 'Setup CRM 1.200 una tantum + 200/mese di canone: l\'investimento iniziale si ammortizza in pochi mesi se il CRM viene usato correttamente.' },
        { termine: 'ROI -- Return on Investment', def: 'Rapporto tra il margine aggiuntivo generato dal piano e l\'investimento totale sostenuto. ROI di 1x significa che ogni euro investito genera 1 euro di margine aggiuntivo. Va sempre interpretato nel contesto temporale -- ROI 0.8x a 24 mesi e molto diverso da ROI 0.8x a 6 mesi.', esempio: 'ROI 0.7x a 24 mesi: l\'azienda ha investito 89k totali e ha generato circa 62k di margine aggiuntivo. Non ancora in pareggio, ma la curva accelera nei mesi successivi.' },
        { termine: 'Breakeven del piano', def: 'Il mese in cui il fatturato aggiuntivo generato copre cumulativamente l\'investimento totale sostenuto fino a quel momento. Dopo il breakeven ogni euro di crescita e puro guadagno netto.', esempio: 'Breakeven a 18 mesi: dall\'anno e mezzo in poi il piano e in attivo. Prima del breakeven l\'azienda sta costruendo la struttura commerciale che poi genera rendimenti nel tempo.' },
        { termine: 'EBITDA netto del piano', def: 'Variazione dell\'EBITDA aziendale attribuibile al piano commerciale, al netto dei costi di investimento sostenuti. Mostra l\'impatto reale sul risultato operativo dell\'azienda.', esempio: 'EBITDA netto +18k a 12 mesi: il piano ha generato 18k di miglioramento del risultato operativo dopo aver dedotto tutti i costi di consulenza e strumenti.' },
      ]
    },
    {
      categoria: 'Benchmark di Settore',
      termini: [
        { termine: 'Benchmark', def: 'Valore di riferimento del settore per un KPI specifico. Permette di confrontare le performance dell\'azienda con quelle del mercato e identificare i gap prioritari da colmare. I benchmark del CRM sono calibrati su PMI italiane per micro-mercato.', esempio: 'Benchmark tasso conversione serramenti: basso 10%, medio 25%, top 42%. Essere al 15% significa essere sotto la media -- priorita alta da affrontare.' },
        { termine: 'Top performer', def: 'Il valore raggiunto dal 10-15% delle aziende migliori del settore su quel KPI. E il riferimento per l\'eccellenza -- non una media, ma un obiettivo ambizioso di lungo periodo.', esempio: 'Top performer DSO serramenti: 15 giorni. Raggiungere questo valore richiede contratti con acconti, pagamenti alla consegna e gestione attiva dei crediti.' },
        { termine: 'Media settore', def: 'Il valore medio delle PMI italiane del micro-mercato specifico su quel KPI. Essere sotto la media indica un gap competitivo da colmare come priorita. Essere sopra indica un vantaggio da preservare.', esempio: 'Media CAC serramenti: 220. Se l\'azienda spende 1.500 per acquisire un cliente, sta bruciando risorse in modo inefficiente rispetto ai concorrenti.' },
        { termine: 'Semaforo benchmark', def: 'Indicatore visivo a tre stati che mostra il posizionamento di ogni KPI rispetto al mercato. Verde = sopra il benchmark top performer. Arancione = nella media di settore. Rosso = sotto la media -- intervento prioritario.', esempio: 'Tasso riacquisto verde e CAC rosso indicano che l\'azienda fidelizza bene ma acquisisce in modo costoso -- priorita: ottimizzare i canali di acquisizione mantenendo la qualita del servizio.' },
        { termine: 'Micro-mercato', def: 'Segmentazione specifica del settore che determina i benchmark applicati. Il CRM copre 32 micro-mercati italiani -- ogni segmento ha benchmark, azioni target e tetti strutturali calibrati sulla sua specifica realta competitiva.', esempio: 'Manifatturiero conto terzi e manifatturiero packaging sono micro-mercati diversi con dinamiche commerciali molto differenti -- usare gli stessi benchmark sarebbe fuorviante.' },
      ]
    },
  ];

  var html = GLOSSARIO.map(function(cat) {
    return '<div class="glos-categoria">' +
      '<div class="glos-cat-title">' + cat.categoria + '</div>' +
      '<div class="glos-termini">' +
      cat.termini.map(function(t) {
        return '<div class="glos-card">' +
          '<div class="glos-termine">' + t.termine + '</div>' +
          '<div class="glos-def">' + t.def + '</div>' +
          (t.esempio ? '<div class="glos-esempio"><span class="glos-es-label">Esempio</span>' + t.esempio + '</div>' : '') +
        '</div>';
      }).join('') +
      '</div></div>';
  }).join('');

  // Raccogli tutti i termini per la ricerca
  var tuttiTermini = [];
  GLOSSARIO.forEach(function(cat) {
    cat.termini.forEach(function(t) { tuttiTermini.push({ termine: t.termine, def: t.def, esempio: t.esempio, categoria: cat.categoria }); });
  });
  window._glosTermini = tuttiTermini;
  window._glosGlossario = GLOSSARIO;

  container.innerHTML =
    '<div class="glos-header">' +
      '<div class="glos-title">Glossario & Logiche del modello</div>' +
      '<div class="glos-subtitle">Definizioni complete dei termini e delle logiche implementate nel CRM \u2014 progettato per essere condiviso con clienti e investitori</div>' +
      '<div class="glos-search-wrap">' +
        '<input class="glos-search" id="glos-search-input" type="text" placeholder="Cerca un termine, definizione o categoria... (min. 3 caratteri)" oninput="glosCerca(this.value)">' +
      '</div>' +
    '</div>' +
    '<div class="glos-body" id="glos-body">' + html + '</div>';
}

// ── STEP STATUS AUTOMATICO ─────────────────────────────
async function aggiornaStatoAutomatico(prospectId, nuovoStato) {
  var p = prospects.find(function(x) { return x.id === prospectId; });
  if (!p) return;
  var ordine = ['nuovo', 'contattato', 'diagnosi', 'proposta', 'chiuso'];
  var idxAttuale = ordine.indexOf(p.stato || 'nuovo');
  var idxNuovo = ordine.indexOf(nuovoStato);
  // Avanza solo se il nuovo stato è successivo — permette di saltare stati
  if (idxNuovo <= idxAttuale) return;
  p.stato = nuovoStato;
  await sb.from('prospects').update({ stato: nuovoStato }).eq('id', prospectId);
  showToast('Stato aggiornato: ' + nuovoStato.charAt(0).toUpperCase() + nuovoStato.slice(1));
  renderSidebar();
  renderDashboard();
}

// ── PREVENTIVI ─────────────────────────────────────────
var _preventiviList = [];

async function loadPreventivi(prospectId) {
  var res = await sb.from('preventivi').select('*').eq('prospect_id', prospectId).order('created_at', { ascending: false });
  _preventiviList = res.data || [];
  return _preventiviList;
}

async function openPreventivoModal(existingId) {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;
  var prev = existingId ? _preventiviList.find(function(x) { return x.id === existingId; }) : null;
  var d = prev ? (prev.dati || {}) : {};
  var modal = document.getElementById('modal-preventivo');
  var body = document.getElementById('modal-preventivo-body');
  if (!modal || !body) return;
  document.getElementById('modal-preventivo-title').textContent = prev ? 'Modifica Preventivo' : 'Nuovo Preventivo';
  var oggi = new Date().toISOString().split('T')[0];
  body.innerHTML =
    '<div class="prev-form">' +
      '<div class="prev-section-title">Il tuo profilo</div>' +
      '<div class="form-grid">' +
        '<div class="form-group form-group-full"><label>Nome consulente</label><input class="form-input" id="prev-consulente" placeholder="Il tuo nome e cognome" value="' + (d.consulente||'') + '"></div>' +
        '<div class="form-group"><label>Email consulente</label><input class="form-input" id="prev-email-cons" placeholder="tua@email.it" value="' + (d.email_consulente||'') + '"></div>' +
        '<div class="form-group"><label>Telefono consulente</label><input class="form-input" id="prev-tel-cons" placeholder="+39 ..." value="' + (d.tel_consulente||'') + '"></div>' +
      '</div>' +
      '<div class="prev-section-title" style="margin-top:16px">Dati cliente</div>' +
      '<div class="form-grid">' +
        '<div class="form-group form-group-full"><label>Azienda</label><input class="form-input" id="prev-azienda" value="' + (p.nome||'') + '" readonly></div>' +
        '<div class="form-group"><label>Referente</label><input class="form-input" id="prev-referente" value="' + (d.referente||p.referente||'') + '"></div>' +
        '<div class="form-group"><label>Email cliente</label><input class="form-input" id="prev-email-cliente" value="' + (d.email_cliente||p.email||'') + '"></div>' +
        '<div class="form-group"><label>Telefono cliente</label><input class="form-input" id="prev-tel-cliente" value="' + (d.tel_cliente||p.telefono||'') + '"></div>' +
        '<div class="form-group"><label>Indirizzo cliente</label><input class="form-input" id="prev-indirizzo" placeholder="Via, Citta" value="' + (d.indirizzo||p.sede_legale||'') + '"></div>' +
      '</div>' +
      '<div class="prev-section-title" style="margin-top:16px">Pacchetto & Prezzo</div>' +
      '<div class="form-grid">' +
        '<div class="form-group form-group-full"><label>Pacchetto</label><select class="form-input" id="prev-pacchetto">' +
          '<option value="diagnosi"' + ((d.pacchetto||'diagnosi')==='diagnosi'?' selected':'') + '>Diagnosi Commerciale \u2014 una tantum</option>' +
          '<option value="advisory"' + (d.pacchetto==='advisory'?' selected':'') + '>Advisory \u2014 fee mensile</option>' +
          '<option value="fractional"' + (d.pacchetto==='fractional'?' selected':'') + '>Fractional CSO \u2014 fee mensile</option>' +
        '</select></div>' +
        '<div class="form-group"><label>Prezzo \u20AC</label><input class="form-input" type="number" id="prev-prezzo" placeholder="es. 2500" value="' + (d.prezzo||'') + '" oninput="prevCalcolaTotale()"></div>' +
        '<div class="form-group" id="prev-durata-wrap"><label>Durata (mesi)</label><input class="form-input" type="number" id="prev-durata-mesi" placeholder="es. 12" min="1" value="' + (d.durata_mesi||'') + '" oninput="prevCalcolaTotale()"></div>' +
        '<div class="form-group"><label>Una tantum \u20AC (opzionale)</label><input class="form-input" type="number" id="prev-unatantum" placeholder="es. 500" value="' + (d.una_tantum||0) + '" oninput="prevCalcolaTotale()"></div>' +
        '<div class="form-group"><label>Validita preventivo (giorni)</label><input class="form-input" type="number" id="prev-validita" value="' + (d.validita||30) + '"></div>' +
      '</div>' +
      '<div class="prev-totale-box" id="prev-totale-box">' +
        '<div class="prev-totale-row"><span>Fee mensile</span><span id="pt-mensile">\u2014</span></div>' +
        '<div class="prev-totale-row"><span>Una tantum</span><span id="pt-unatantum">\u2014</span></div>' +
        '<div class="prev-totale-row prev-totale-finale"><span>Totale contratto</span><span id="pt-totale">\u2014</span></div>' +
      '</div>' +
      '<div class="prev-section-title" style="margin-top:16px">Data preventivo</div>' +
      '<div class="form-grid"><div class="form-group"><label>Data</label><input class="form-input" type="date" id="prev-data" value="' + (d.data||oggi) + '"></div></div>' +
      '<div class="prev-section-title" style="margin-top:16px">Note</div>' +
      '<textarea class="form-input" id="prev-note" rows="3" placeholder="Note aggiuntive o condizioni particolari...">' + (d.note||'') + '</textarea>' +
    '</div>';
  document.getElementById('prev-pacchetto').addEventListener('change', function() {
    document.getElementById('prev-durata-wrap').style.display = this.value === 'diagnosi' ? 'none' : '';
    prevCalcolaTotale();
  });
  document.getElementById('prev-durata-wrap').style.display = (d.pacchetto||'diagnosi') === 'diagnosi' ? 'none' : '';
  prevCalcolaTotale();
  modal.style.display = 'flex';
  modal._editingId = existingId || null;
}

function prevCalcolaTotale() {
  var pacchetto = document.getElementById('prev-pacchetto')?.value;
  var prezzo = parseFloat(document.getElementById('prev-prezzo')?.value) || 0;
  var durata = parseInt(document.getElementById('prev-durata-mesi')?.value) || 0;
  var unatantum = parseFloat(document.getElementById('prev-unatantum')?.value) || 0;
  var fmt = function(v) { return v > 0 ? v.toLocaleString('it-IT') + '\u20AC' : '\u2014'; };
  var elM = document.getElementById('pt-mensile');
  var elU = document.getElementById('pt-unatantum');
  var elT = document.getElementById('pt-totale');
  if (pacchetto === 'diagnosi') {
    if (elM) elM.textContent = '\u2014';
    if (elU) elU.textContent = fmt(prezzo);
    if (elT) elT.textContent = fmt(prezzo + unatantum);
  } else {
    if (elM) elM.textContent = fmt(prezzo) + '/mese';
    if (elU) elU.textContent = unatantum > 0 ? fmt(unatantum) : '\u2014';
    if (elT) elT.textContent = (prezzo * durata + unatantum) > 0 ? fmt(prezzo * durata + unatantum) : '\u2014';
  }
}

async function savePreventivo() {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;
  var pacchetto = document.getElementById('prev-pacchetto')?.value;
  var prezzo = parseFloat(document.getElementById('prev-prezzo')?.value) || 0;
  var durata_mesi = parseInt(document.getElementById('prev-durata-mesi')?.value) || 0;
  var una_tantum = parseFloat(document.getElementById('prev-unatantum')?.value) || 0;
  var totale = pacchetto === 'diagnosi' ? prezzo + una_tantum : prezzo * durata_mesi + una_tantum;
  var dati = {
    consulente: (document.getElementById('prev-consulente')?.value||'').trim(),
    email_consulente: (document.getElementById('prev-email-cons')?.value||'').trim(),
    tel_consulente: (document.getElementById('prev-tel-cons')?.value||'').trim(),
    referente: (document.getElementById('prev-referente')?.value||'').trim(),
    email_cliente: (document.getElementById('prev-email-cliente')?.value||'').trim(),
    tel_cliente: (document.getElementById('prev-tel-cliente')?.value||'').trim(),
    indirizzo: (document.getElementById('prev-indirizzo')?.value||'').trim(),
    pacchetto: pacchetto,
    prezzo: prezzo,
    durata_mesi: durata_mesi,
    una_tantum: una_tantum,
    totale: totale,
    data: document.getElementById('prev-data')?.value,
    validita: parseInt(document.getElementById('prev-validita')?.value) || 30,
    note: (document.getElementById('prev-note')?.value||'').trim(),
  };
  var modal = document.getElementById('modal-preventivo');
  var editingId = modal ? modal._editingId : null;
  if (editingId) {
    await sb.from('preventivi').update({ dati: dati }).eq('id', editingId);
  } else {
    await sb.from('preventivi').insert({ prospect_id: p.id, tipo: 'preventivo', stato: 'bozza', dati: dati });
    await aggiornaStatoAutomatico(p.id, 'proposta');
  }
  modal.style.display = 'none';
  await loadPreventivi(p.id);
  renderPreventivi(p);
  showToast('Preventivo salvato');
}

async function aggiornaStatoPreventivo(id, nuovoStato) {
  await sb.from('preventivi').update({ stato: nuovoStato }).eq('id', id);
  var prev = _preventiviList.find(function(x) { return x.id === id; });
  if (prev) prev.stato = nuovoStato;
  if (nuovoStato === 'accettato') {
    var p = prospects.find(function(x) { return x.id === currentId; });
    if (p) await aggiornaStatoAutomatico(p.id, 'chiuso');
  }
  var p2 = prospects.find(function(x) { return x.id === currentId; });
  if (p2) renderPreventivi(p2);
  renderSidebar();
  renderDashboard();
  if (currentId) await renderProspectDetail(currentId);
  showToast('Stato preventivo: ' + nuovoStato);
}

async function eliminaPreventivo(id) {
  if (!confirm('Sei sicuro di voler eliminare questo preventivo?')) return;
  await sb.from('preventivi').delete().eq('id', id);
  _preventiviList = _preventiviList.filter(function(x) { return x.id !== id; });
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (p) renderPreventivi(p);
  showToast('Preventivo eliminato');
}

function renderPreventivi(p) {
  var container = document.getElementById('preventivi-container');
  if (!container) return;
  var STATO_COLOR = {bozza:'#4A6180',inviato:'#4E9FE6',accettato:'#1CB889',rifiutato:'#E05555'};
  var STATO_LABEL = {bozza:'Bozza',inviato:'Inviato',accettato:'Accettato',rifiutato:'Rifiutato'};
  if (!_preventiviList.length) {
    container.innerHTML = '<div class="prev-empty">Nessun preventivo ancora. <button class="btn btn-primary" style="margin-left:12px" onclick="openPreventivoModal()">+ Nuovo preventivo</button></div>';
    return;
  }
  container.innerHTML =
    '<div class="prev-list-header"><button class="btn btn-primary" onclick="openPreventivoModal()">+ Nuovo preventivo</button></div>' +
    _preventiviList.map(function(pv) {
      var d = pv.dati || {};
      return '<div class="prev-card">' +
        '<div class="prev-card-header">' +
          '<div>' +
            '<div class="prev-card-title">Preventivo del ' + (d.data ? new Date(d.data).toLocaleDateString('it-IT') : '\u2014') + '</div>' +
            '<div class="prev-card-sub">Durata: ' + (d.durata||'\u2014') + ' \u00B7 Fee: ' + (d.fee_mensile ? d.fee_mensile.toLocaleString('it-IT') : '\u2014') + '\u20AC/mese \u00B7 Una tantum: ' + (d.una_tantum ? d.una_tantum.toLocaleString('it-IT') : '\u2014') + '\u20AC</div>' +
          '</div>' +
          '<span class="prev-stato-badge" style="background:' + (STATO_COLOR[pv.stato]||'#4A6180') + '20;color:' + (STATO_COLOR[pv.stato]||'#4A6180') + ';border:1px solid ' + (STATO_COLOR[pv.stato]||'#4A6180') + '40">' + (STATO_LABEL[pv.stato]||pv.stato) + '</span>' +
        '</div>' +
        '<div class="prev-card-actions">' +
          '<button class="btn" onclick="openPreventivoModal(\'' + pv.id + '\')">Modifica</button>' +
          '<button class="btn" onclick="stampaPrev(\'' + pv.id + '\')">Scarica PDF</button>' +
          (pv.stato === 'bozza' ? '<button class="btn" onclick="aggiornaStatoPreventivo(\'' + pv.id + '\',\'inviato\')">Segna inviato</button>' : '') +
          (pv.stato === 'inviato' ? '<button class="btn" style="color:var(--green)" onclick="aggiornaStatoPreventivo(\'' + pv.id + '\',\'accettato\')">Accettato</button><button class="btn" style="color:var(--red)" onclick="aggiornaStatoPreventivo(\'' + pv.id + '\',\'rifiutato\')">Rifiutato</button>' : '') +
          '<button class="btn" style="color:var(--red)" onclick="eliminaPreventivo(\'' + pv.id + '\')">Elimina</button>' +
        '</div>' +
      '</div>';
    }).join('');
}

function stampaPrev(id) {
  var pv = _preventiviList.find(function(x) { return x.id === id; });
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!pv || !p) return;
  var d = pv.dati || {};
  var PACCHETTI = {
    diagnosi: { nome:'Diagnosi Commerciale', tipo:'Una tantum', bullet:['Analisi completa della struttura commerciale su 8 dimensioni chiave','Benchmark con i top performer del settore specifico del cliente','Identificazione delle priorita di intervento con impatto stimato sul fatturato','Piano d\'azione dettagliato con step operativi per ogni area','Sessione di presentazione dei risultati al titolare (2 ore)','Report PDF completo con score, radar diagnostico e piano di crescita'] },
    advisory: { nome:'Advisory', tipo:'Fee mensile', bullet:['1 meeting settimanale online con il cliente (1 ora)','Monitoraggio continuativo del piano di crescita commerciale','Supporto decisionale su tutte le aree del piano di intervento','Aggiornamento mensile dello score di maturita commerciale e dei benchmark','Accesso al piano operativo, alle azioni target e alla reportistica di avanzamento','L\'esecuzione operativa resta in carico al cliente e ai suoi fornitori \u2014 il consulente guida le scelte, non esegue'] },
    fractional: { nome:'Fractional CSO', tipo:'Fee mensile', bullet:['1 meeting settimanale online con il cliente (1 ora)','Canale preferenziale diretto via telefono \u2014 disponibilita entro 4 ore lavorative','Presenza operativa nelle call con fornitori, agenzie e collaboratori','Gestione e supervisione diretta delle trattative commerciali per conto del cliente','Referente commerciale esterno verso tutti gli stakeholder interni ed esterni','Supervisione dell\'esecuzione del piano con intervento diretto sulle criticita','Il consulente agisce come Direttore Commerciale part-time a tutti gli effetti'] }
  };
  var pkt = PACCHETTI[d.pacchetto || 'diagnosi'];
  var isDiagnosi = d.pacchetto === 'diagnosi';
  var fmt = function(v) { return v ? Number(v).toLocaleString('it-IT') + '\u20AC' : '\u2014'; };
  var fmtDate = function(s) { return s ? new Date(s).toLocaleDateString('it-IT',{day:'2-digit',month:'long',year:'numeric'}) : '\u2014'; };
  var scadenza = new Date(d.data || new Date());
  scadenza.setDate(scadenza.getDate() + (d.validita || 30));
  var numRef = 'FCSO-' + new Date(d.data||new Date()).getFullYear() + '-' + (Math.floor(Math.random()*9000)+1000);
  var totaleContratto = isDiagnosi ? (d.prezzo||0)+(d.una_tantum||0) : (d.prezzo||0)*(d.durata_mesi||0)+(d.una_tantum||0);
  var bulletHtml = pkt.bullet.map(function(b){return '<li>'+b+'</li>';}).join('');
  var win = window.open('', '_blank');
  win.document.write('<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"><title>Preventivo \u2014 '+(p.nome||'')+'</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Helvetica Neue,Arial,sans-serif;color:#1a2a3a;background:#fff;font-size:13px;line-height:1.5}.page{max-width:780px;margin:0 auto;padding:48px 52px}.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:36px;padding-bottom:24px;border-bottom:2px solid #0C2340}.logo{display:flex;align-items:center;gap:10px}.logo-bar{width:4px;height:36px;background:#C8A84B;border-radius:2px;flex-shrink:0}.logo-name{font-size:20px;font-weight:700;color:#0C2340;letter-spacing:-.3px}.logo-sub{font-size:9px;color:#8AA4BF;letter-spacing:1.5px;text-transform:uppercase;margin-top:3px}.ref-block{text-align:right;font-size:11px;color:#4A6180;line-height:1.9}.ref-num{font-size:14px;font-weight:700;color:#0C2340;margin-bottom:2px}.hero{background:#0C2340;border-radius:8px;padding:22px 26px;margin-bottom:28px;display:flex;justify-content:space-between;align-items:flex-start;gap:24px}.hero-company{font-size:20px;font-weight:700;color:#fff;margin-bottom:5px}.hero-details{font-size:11px;color:#8AA4BF;line-height:1.8}.hero-contact{text-align:right;font-size:11px;color:#8AA4BF;line-height:1.9}.hero-contact-name{font-size:13px;font-weight:600;color:#C8A84B}.section{margin-bottom:24px;page-break-inside:avoid}.section-title{font-size:9px;font-weight:700;color:#C8A84B;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;padding-bottom:7px;border-bottom:1px solid #E8EFF7}.svc-card{border:1px solid #E0E8F0;border-radius:8px;overflow:hidden;page-break-inside:avoid}.svc-card-header{background:#F7FAFC;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #E0E8F0}.svc-tipo{font-size:10px;font-weight:700;color:#4A6180;text-transform:uppercase;letter-spacing:.8px}.svc-nome{font-size:16px;font-weight:700;color:#0C2340;margin-top:3px}.svc-price-block{text-align:right}.svc-price{font-size:20px;font-weight:700;color:#0C2340}.svc-price-sub{font-size:10px;color:#8AA4BF;margin-top:2px}.svc-body{padding:16px}.svc-bullet{list-style:none;display:flex;flex-direction:column;gap:7px}.svc-bullet li{display:flex;align-items:flex-start;gap:8px;font-size:12px;color:#2A3A4A;line-height:1.5}.svc-bullet li::before{content:\'\';width:6px;height:6px;border-radius:50%;background:#C8A84B;flex-shrink:0;margin-top:5px}.inv-table{width:100%;border-collapse:collapse;page-break-inside:avoid}.inv-table th{font-size:10px;font-weight:600;color:#4A6180;text-align:left;padding:9px 12px;background:#F7FAFC;border-bottom:2px solid #0C2340}.inv-table th:last-child{text-align:right}.inv-table td{padding:11px 12px;border-bottom:1px solid #F0F4F8;font-size:12px;color:#2A3A4A;vertical-align:top}.inv-table td:last-child{text-align:right;font-weight:600;color:#0C2340;white-space:nowrap}.inv-table tr.subtotal td{background:#F7FAFC;font-size:12px;color:#4A6180}.inv-table tr.total td{background:#0C2340;color:#fff;font-size:14px;font-weight:700;padding:13px 12px}.inv-table tr.total td:last-child{color:#C8A84B}.inv-valore-contratto{background:#FDF6E3;border:1px solid #D4A017;border-radius:6px;padding:12px 16px;margin-top:12px;display:flex;justify-content:space-between;align-items:center;page-break-inside:avoid}.inv-vc-label{font-size:11px;color:#B8860B;font-weight:600;text-transform:uppercase;letter-spacing:.8px}.inv-vc-val{font-size:20px;font-weight:700;color:#B8860B}.cond-list{display:flex;flex-direction:column;gap:10px;page-break-inside:avoid}.cond-item{display:flex;gap:10px;font-size:11px;color:#4A6180;line-height:1.6}.cond-num{font-size:10px;font-weight:700;color:#C8A84B;background:#FDF6E3;border-radius:4px;padding:2px 6px;height:fit-content;flex-shrink:0;margin-top:1px}.cond-item strong{color:#0C2340}.firma-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;page-break-inside:avoid}.firma-box{border:1px solid #D0DCE8;border-radius:8px;padding:20px 18px}.firma-label{font-size:9px;font-weight:700;color:#4A6180;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px}.firma-spazio{height:44px;border-bottom:1px solid #0C2340;margin-bottom:8px}.firma-name{font-size:11px;color:#4A6180}.firma-data{font-size:11px;color:#8AA4BF;margin-top:4px}.validity{background:#F7FAFC;border-left:3px solid #C8A84B;padding:10px 14px;font-size:11px;color:#4A6180;margin-top:16px;line-height:1.6;page-break-inside:avoid}.footer{margin-top:32px;padding-top:14px;border-top:1px solid #E0DAD0;display:flex;justify-content:space-between;font-size:10px;color:#8AA4BF}@page{margin:0;size:A4}@media print{body{padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}.page{padding:32px 40px}.section{page-break-inside:avoid}.svc-card{page-break-inside:avoid}.inv-table{page-break-inside:avoid}.firma-grid{page-break-inside:avoid}.cond-list{page-break-inside:avoid}}</style></head><body><div class="page"><div class="header"><div class="logo"><div class="logo-bar"></div><div><div class="logo-name">Fractional CSO</div><div class="logo-sub">Consulenza Commerciale per PMI</div></div></div><div class="ref-block"><div class="ref-num">'+numRef+'</div><div>Data: '+fmtDate(d.data)+'</div><div>Scadenza: '+fmtDate(scadenza.toISOString().split('T')[0])+'</div><div style="margin-top:4px">'+(d.consulente||'')+'</div>'+(d.email_consulente?'<div>'+d.email_consulente+'</div>':'')+(d.tel_consulente?'<div>'+d.tel_consulente+'</div>':'')+'</div></div><div class="hero"><div><div class="hero-company">'+(p.nome||'\u2014')+'</div><div class="hero-details">'+(d.indirizzo?d.indirizzo+'<br>':'')+(p.settore?p.settore.replace(/_/g,' '):'')+'</div></div><div class="hero-contact"><div class="hero-contact-name">'+(d.referente||'')+'</div>'+(d.email_cliente?'<div>'+d.email_cliente+'</div>':'')+(d.tel_cliente?'<div>'+d.tel_cliente+'</div>':'')+'</div></div><div class="section"><div class="section-title">Servizio proposto</div><div class="svc-card"><div class="svc-card-header"><div><div class="svc-tipo">'+pkt.tipo+'</div><div class="svc-nome">'+pkt.nome+'</div></div><div class="svc-price-block"><div class="svc-price">'+fmt(d.prezzo)+'</div><div class="svc-price-sub">'+(isDiagnosi?'una tantum':'al mese')+'</div></div></div><div class="svc-body"><ul class="svc-bullet">'+bulletHtml+'</ul></div></div></div><div class="section"><div class="section-title">Piano di investimento</div><table class="inv-table"><thead><tr><th>Voce</th><th>Quantita</th><th>Prezzo unitario</th><th>Totale</th></tr></thead><tbody><tr><td><strong>'+pkt.nome+'</strong></td><td>'+(isDiagnosi?'1':(d.durata_mesi||'\u2014')+' mesi')+'</td><td>'+(isDiagnosi?fmt(d.prezzo):fmt(d.prezzo)+'/mese')+'</td><td>'+(isDiagnosi?fmt(d.prezzo):fmt((d.prezzo||0)*(d.durata_mesi||0)))+'</td></tr>'+(d.una_tantum>0?'<tr><td><strong>Setup e onboarding</strong><br><span style="font-size:11px;color:#4A6180">Attivita di avvio: configurazione strumenti e kick-off operativo</span></td><td>1</td><td>'+fmt(d.una_tantum)+'</td><td>'+fmt(d.una_tantum)+'</td></tr>':'')+(!isDiagnosi?'<tr class="subtotal"><td colspan="3">Subtotale mensile</td><td>'+fmt(d.prezzo)+'/mese</td></tr>':'')+'<tr class="total"><td colspan="3">Totale contratto</td><td>'+fmt(totaleContratto)+'</td></tr></tbody></table>'+(!isDiagnosi?'<div class="inv-valore-contratto"><div><div class="inv-vc-label">Valore totale del contratto</div><div style="font-size:11px;color:#B8860B;margin-top:2px">'+(d.durata_mesi||'\u2014')+' mesi \u00D7 '+fmt(d.prezzo)+'/mese'+(d.una_tantum>0?' + '+fmt(d.una_tantum)+' setup':'')+'</div></div><div class="inv-vc-val">'+fmt(totaleContratto)+'</div></div>':'')+'</div><div class="section"><div class="section-title">Termini e condizioni</div><div class="cond-list"><div class="cond-item"><span class="cond-num">1</span><span><strong>Inizio del mandato.</strong> Il presente accordo entra in vigore dalla data di firma di entrambe le parti. Le attivita operative iniziano entro 7 giorni lavorativi dalla firma.</span></div><div class="cond-item"><span class="cond-num">2</span><span><strong>Pagamento.</strong> La fee mensile e dovuta anticipatamente all\'inizio di ogni mese di mandato. La quota una tantum, se prevista, e dovuta all\'atto della firma. Pagamento tramite bonifico bancario entro 15 giorni dalla fattura.</span></div><div class="cond-item"><span class="cond-num">3</span><span><strong>Durata e rinnovo.</strong> '+(isDiagnosi?'Il presente incarico e una prestazione una tantum senza impegni continuativi successivi.':'Il mandato ha durata di '+(d.durata_mesi||'\u2014')+' mesi dalla data di inizio e si rinnova automaticamente salvo disdetta scritta con preavviso di 30 giorni.')+'</span></div><div class="cond-item"><span class="cond-num">4</span><span><strong>Riservatezza.</strong> Il consulente si impegna a mantenere riservate tutte le informazioni aziendali acquisite durante il mandato, anche successivamente alla sua conclusione.</span></div><div class="cond-item"><span class="cond-num">5</span><span><strong>Proprieta intellettuale.</strong> I piani commerciali, le analisi e i documenti prodotti durante il mandato sono di proprieta del cliente al completamento del pagamento.</span></div></div></div><div class="section"><div class="section-title">Accettazione e firma</div><div class="firma-grid"><div class="firma-box"><div class="firma-label">Il consulente</div><div class="firma-spazio"></div><div class="firma-name">'+(d.consulente||'\u2014')+'</div><div class="firma-data">Data: _______________</div></div><div class="firma-box"><div class="firma-label">Il cliente \u2014 per accettazione</div><div class="firma-spazio"></div><div class="firma-name">'+(d.referente||p.nome||'\u2014')+'</div><div class="firma-data">Data: _______________</div></div></div></div><div class="validity"><strong>Validita:</strong> Il presente preventivo e valido fino al '+fmtDate(scadenza.toISOString().split('T')[0])+' \u00B7 Tutti i prezzi si intendono IVA esclusa \u00B7 Rif. '+numRef+(d.note?'<br><strong>Note:</strong> '+d.note:'')+'</div><div class="footer"><span>Fractional CSO \u2014 Consulenza Commerciale per PMI Italiane</span><span>Generato il '+new Date().toLocaleDateString('it-IT')+'</span></div></div><script>window.onload=function(){setTimeout(function(){window.print()},300)}<\/script></body></html>');
  win.document.close();
}

function genField(label,val) {
  if(!val) return '';
  return `\x3cdiv style="margin-bottom:10px">
    \x3cdiv style="font-size:10px;color:var(--gray2);letter-spacing:.05em;text-transform:uppercase;margin-bottom:2px">${label}\x3c/div>
    \x3cdiv style="font-size:13px;color:var(--white)">${val}\x3c/div>
  \x3c/div>`;
}

// -- NAVIGATION --------------------------------------------
function showView(name) {
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('view-'+name).classList.add('active');
  document.querySelectorAll('.sidebar .nav-item').forEach(n=>{
    if(n.getAttribute('onclick')?.includes(name)) n.classList.add('active');
  });
  document.querySelectorAll('.prospect-item').forEach(i=>i.classList.remove('active'));
  if(name==='dashboard') renderDashboard();
  if(name==='market') renderMarket();
  if(name==='calendario') renderCalendario();
  if(name==='listino') { renderListinoServizi('manifatturiero'); }
  if(name==='prospects') { renderProspectsView(); }
  if(name==='glossario') renderGlossario();
}

function openProspect(id) {
  currentId = id;
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('view-prospect').classList.add('active');
  document.querySelectorAll('.prospect-item').forEach(i=>i.classList.toggle('active',i.dataset.id===id));
  renderProspectDetail(id);
}

// -- SIDEBAR -----------------------------------------------
function renderSidebar() {
  const el = document.getElementById('sidebar-list');
  el.innerHTML = '';
}

// -- DASHBOARD ---------------------------------------------
function renderDashboard() {
  const total=prospects.length;
  const hot=prospects.filter(p=>calcScore(p)>=70).length;
  const prop=prospects.filter(p=>p.stato==='proposta').length;
  const closed=prospects.filter(p=>p.stato==='chiuso').length;
  document.getElementById('kpi-grid').innerHTML = [
    { label: 'Prospect totali', val: total, cls: '', filter: 'tutti' },
    { label: 'Score alto (≥70)', val: hot, cls: 'gold', filter: 'score' },
    { label: 'In proposta', val: prop, cls: '', filter: 'proposta' },
    { label: 'Chiusi', val: closed, cls: '', filter: 'chiuso' },
  ].map(k => `<div class="kpi-card ${k.cls}" onclick="showView('prospects');setProspectFilter('${k.filter}')" style="cursor:pointer" title="Clicca per vedere i prospect">
    <div class="kpi-label">${k.label}</div>
    <div class="kpi-val">${k.val}</div>
  </div>`).join('');

  const allCols=['nuovo','contattato','diagnosi','proposta','chiuso'];

  // Status summary bar
  document.getElementById('status-summary').innerHTML=allCols.map(stato=>{
    const items=prospects.filter(p=>p.stato===stato);
    const col=STATUS_COLORS[stato]||'#888';
    const totFat=items.reduce((acc,p)=>acc+(p.fatturato_anno_1||0),0);
    const avgScore=items.length?Math.round(items.reduce((a,p)=>a+calcScore(p),0)/items.length):0;
    const fatStr=totFat>=1000000
      ?'EUR'+(totFat/1000000).toFixed(1)+'M'
      :totFat>=1000?'EUR'+(totFat/1000).toFixed(0)+'k':'--';
    const sc=avgScore>=70?'var(--green)':avgScore>=45?'var(--gold)':'var(--gray)';
    return `\x3cdiv class="status-kpi" style="border-top-color:${col}">
      \x3cdiv class="status-kpi-label">
        \x3cdiv class="status-dot" style="background:${col}">\x3c/div>
        \x3cspan style="color:${col}">${STATUS_LABELS[stato]}\x3c/span>
      \x3c/div>
      \x3cdiv class="status-kpi-count">${items.length}\x3c/div>
      \x3cdiv class="status-kpi-fat">Fat. tot: ${fatStr}\x3c/div>
      ${avgScore?`\x3cdiv class="status-kpi-score" style="color:${sc}">Score medio: ${avgScore}\x3c/div>`:''}
    \x3c/div>`;
  }).join('');

  // Pipeline columns
  document.getElementById('pipeline-grid').innerHTML=allCols.map(stato=>{
    const items=prospects.filter(p=>p.stato===stato);
    const colBorder=STATUS_COLORS[stato]||'#888';
    const cards=items.length===0
      ?'\x3cdiv style="font-size:11px;color:var(--gray2);padding:6px 0">Nessuno\x3c/div>'
      :items.map(p=>{
          const s=calcScore(p),c=scoreColor(s);
          const pipeCol=getProspectColor(p);
          const fatStr=p.fatturato_anno_1
            ?'\x3cspan style="font-size:10px;color:var(--gray);margin-left:4px">'+
              (p.fatturato_anno_1>=1000000?'EUR'+(p.fatturato_anno_1/1000000).toFixed(1)+'M':'EUR'+(p.fatturato_anno_1/1000).toFixed(0)+'k')+'\x3c/span>'
            :'';
          return `\x3cdiv class="pipe-card" onclick="openProspect('${p.id}')" style="border-left:3px solid ${pipeCol}">
            \x3cdiv class="pc-name" style="display:flex;align-items:center;gap:6px">
              \x3cdiv style="width:7px;height:7px;border-radius:50%;background:${pipeCol};flex-shrink:0">\x3c/div>
              ${p.nome}${fatStr}
            \x3c/div>
            \x3cdiv class="pc-meta">${MARKET[p.settore]?.label?.split('/')[0]?.trim()||p.settore||'--'} . ${p.dipendenti||'--'} dip.\x3c/div>
            \x3cdiv class="score-pill" style="background:${c.bg};color:${c.text}">${s}/100 . ${c.label}\x3c/div>
          \x3c/div>`;
        }).join('');
    return `\x3cdiv class="pipe-col" style="border-top:2px solid ${colBorder}">
      \x3cdiv class="pipe-col-title">${STATUS_LABELS[stato]}\x3cspan class="pipe-count">${items.length}\x3c/span>\x3c/div>
      \x3cdiv class="pipe-col-scroll">${cards}\x3c/div>
    \x3c/div>`;
  }).join('');
}

// -- SEZIONE PROSPECT --------------------------------------
let _prospectFilter = 'tutti';
let _prospectSearch = '';
let _prospectSort = 'score';

function setProspectFilter(filter) {
  _prospectFilter = filter;
  renderProspects();
}

function renderProspectsView() { renderProspects(); }

function renderProspects() {
  const container = document.getElementById('view-prospects');
  if (!container) return;

  const STATI = ['nuovo', 'contattato', 'diagnosi', 'proposta', 'chiuso'];
  const STATI_LABEL = { nuovo: 'Nuovo', contattato: 'Contattato', diagnosi: 'Diagnosi', proposta: 'Proposta', chiuso: 'Chiuso' };
  const STATI_COLOR = { nuovo: '#6c757d', contattato: '#3498db', diagnosi: '#9b59b6', proposta: '#e67e22', chiuso: '#27ae60' };

  // Filtra prospect
  let lista = prospects.filter(function(p) {
    var matchSearch = !_prospectSearch ||
      (p.nome || '').toLowerCase().includes(_prospectSearch.toLowerCase()) ||
      (p.referente || '').toLowerCase().includes(_prospectSearch.toLowerCase()) ||
      (p.settore || '').toLowerCase().includes(_prospectSearch.toLowerCase()) ||
      (p.sede_legale || '').toLowerCase().includes(_prospectSearch.toLowerCase());

    var matchFilter = _prospectFilter === 'tutti' ? true
      : _prospectFilter === 'score' ? calcScore(p) >= 70
      : p.stato === _prospectFilter;

    return matchSearch && matchFilter;
  });

  // Ordina
  if (_prospectSort === 'score') lista.sort(function(a,b) { return calcScore(b) - calcScore(a); });
  else if (_prospectSort === 'fatturato') lista.sort(function(a,b) { return (b.fatturato_anno_1||0) - (a.fatturato_anno_1||0); });
  else if (_prospectSort === 'data') lista.sort(function(a,b) { return new Date(b.created_at) - new Date(a.created_at); });
  else if (_prospectSort === 'nome') lista.sort(function(a,b) { return (a.nome||'').localeCompare(b.nome||''); });

  // Macro settore label
  function macroLabel(settore) {
    var macro = (settore || '').split('_')[0];
    var map = { manifatturiero:'Manifatturiero', edilizia:'Edilizia', commercio:'Commercio', alimentare:'Alimentare', tech:'Tech', servizi:'Servizi' };
    return map[macro] || settore || '\u2014';
  }

  // Card prospect
  function prospectCard(p) {
    var score = calcScore(p);
    var sColor = score >= 70 ? '#27ae60' : score >= 40 ? '#e67e22' : '#e74c3c';
    var statoColor = STATI_COLOR[p.stato] || '#6c757d';
    var fatturato = p.fatturato_anno_1 ? '\u20AC' + (p.fatturato_anno_1/1000).toFixed(0) + 'k' : p.fatturato || '\u2014';
    return '<div class="prospect-kanban-card" onclick="openProspect(\'' + p.id + '\')" style="cursor:pointer">' +
      '<div class="pkc-header">' +
        '<div class="pkc-color" style="background:' + (p.color||statoColor) + '"></div>' +
        '<div class="pkc-nome">' + (p.nome || '\u2014') + '</div>' +
      '</div>' +
      '<div class="pkc-settore">' + macroLabel(p.settore) + '</div>' +
      '<div class="pkc-score-row">' +
        '<div class="pkc-score-bar-bg"><div class="pkc-score-bar" style="width:' + score + '%;background:' + sColor + '"></div></div>' +
        '<span class="pkc-score-val" style="color:' + sColor + '">' + score + '</span>' +
      '</div>' +
      '<div class="pkc-footer">' +
        '<span class="pkc-fatturato">' + fatturato + '</span>' +
        '<span class="pkc-referente">' + (p.referente || '') + '</span>' +
      '</div>' +
    '</div>';
  }

  // Header stats
  var statsRow = STATI.map(function(s) {
    var n = prospects.filter(function(p) { return p.stato === s; }).length;
    return '<span class="ps-pill" style="border-color:' + STATI_COLOR[s] + ';color:' + STATI_COLOR[s] + '">' + STATI_LABEL[s] + ' <b>' + n + '</b></span>';
  }).join('');

  // Kanban
  var kanban;
  if (_prospectFilter === 'score') {
    kanban = '<div class="prospect-kanban"><div class="pk-col pk-col-wide">' +
      '<div class="pk-col-header" style="background:#27ae60">Score Alto (\u226570) \u2014 ' + lista.length + '</div>' +
      '<div class="pk-col-body pk-col-body-grid">' +
      (lista.map(prospectCard).join('') || '<div class="pk-empty">Nessun prospect</div>') +
      '</div></div></div>';
  } else if (_prospectFilter === 'tutti') {
    kanban = '<div class="prospect-kanban">' + STATI.map(function(s) {
      var col = lista.filter(function(p) { return p.stato === s; });
      return '<div class="pk-col">' +
        '<div class="pk-col-header" style="background:' + STATI_COLOR[s] + '">' + STATI_LABEL[s] + ' <span class="pk-col-count">' + col.length + '</span></div>' +
        '<div class="pk-col-body">' +
        (col.map(prospectCard).join('') || '<div class="pk-empty">\u2014</div>') +
        '</div></div>';
    }).join('') + '</div>';
  } else {
    kanban = '<div class="prospect-kanban"><div class="pk-col pk-col-wide">' +
      '<div class="pk-col-header" style="background:' + (STATI_COLOR[_prospectFilter]||'#3498db') + '">' + (STATI_LABEL[_prospectFilter]||_prospectFilter) + ' \u2014 ' + lista.length + '</div>' +
      '<div class="pk-col-body pk-col-body-grid">' +
      (lista.map(prospectCard).join('') || '<div class="pk-empty">Nessun prospect</div>') +
      '</div></div></div>';
  }

  // Filtri buttons
  var filterBtns = ['tutti','nuovo','contattato','diagnosi','proposta','chiuso'].map(function(f) {
    var active = _prospectFilter === f;
    var style = active ? 'background:' + (STATI_COLOR[f]||'#2c3e50') + ';color:#fff;border-color:' + (STATI_COLOR[f]||'#2c3e50') : '';
    return '<button class="pf-btn' + (active?' active':'') + '" style="' + style + '" onclick="setProspectFilter(\'' + f + '\')">' +
      (f === 'tutti' ? 'Tutti' : STATI_LABEL[f]) + '</button>';
  }).join('');
  var scoreActive = _prospectFilter === 'score';
  filterBtns += '<button class="pf-btn' + (scoreActive?' active':'') + '" style="' + (scoreActive?'background:#f39c12;color:#fff;border-color:#f39c12':'') + '" onclick="setProspectFilter(\'score\')">Score alto</button>';

  container.innerHTML =
    '<div class="prospects-header">' +
      '<div class="prospects-title">' +
        '<h2>Prospect</h2>' +
        '<div class="prospects-stats">' + statsRow + '</div>' +
      '</div>' +
      '<div class="prospects-controls">' +
        '<div class="prospects-search-wrap">' +
          '<input class="prospects-search" type="text" placeholder="Cerca per nome, referente, settore, sede..." value="' + (_prospectSearch||'') + '" oninput="_prospectSearch=this.value;renderProspects()">' +
        '</div>' +
        '<select class="prospects-sort" onchange="_prospectSort=this.value;renderProspects()">' +
          '<option value="score"' + (_prospectSort==='score'?' selected':'') + '>Ordina: Score</option>' +
          '<option value="fatturato"' + (_prospectSort==='fatturato'?' selected':'') + '>Ordina: Fatturato</option>' +
          '<option value="data"' + (_prospectSort==='data'?' selected':'') + '>Ordina: Data</option>' +
          '<option value="nome"' + (_prospectSort==='nome'?' selected':'') + '>Ordina: Nome</option>' +
        '</select>' +
        '<button class="btn-prospect-new" onclick="openNewProspect()">+ Nuovo Prospect</button>' +
      '</div>' +
      '<div class="prospects-filters">' + filterBtns + '</div>' +
    '</div>' +
    kanban;
}

// -- PROSPECT DETAIL ---------------------------------------
async function renderProspectDetail(id) {
  const p = prospects.find(x=>x.id===id);
  if(!p) return;
  const s=calcScore(p), sc=scoreColor(s);

  const pCol = getProspectColor(p);
  document.getElementById('det-company-name').textContent = p.nome;
  document.getElementById('det-company-name').style.borderLeftColor = pCol;

  // Status badge top right
  document.getElementById('det-status-badge').innerHTML =
    `\x3cdiv class="status-dot" style="background:${STATUS_COLORS[p.stato]||'#888'}">\x3c/div>
     \x3cspan>${STATUS_LABELS[p.stato]||p.stato}\x3c/span>`;
  document.getElementById('det-status-badge').style.borderColor = STATUS_COLORS[p.stato]||'var(--border)';

  // Info labels below name
  const settoreLbl = MARKET[p.settore]?.label?.split('/')[0]?.trim() || p.settore || '';
  const labels = [
    settoreLbl ? {icon:'', text: settoreLbl} : null,
    p.dipendenti ? {icon:'', text: p.dipendenti + ' dipendenti'} : null,
    p.referente ? {icon:'', text: p.referente} : null,
    p.sito_web ? {icon:'', text: p.sito_web, link: p.sito_web} : null,
    p.telefono ? {icon:'', text: p.telefono} : null,
    p.fatturato ? {icon:'', text: p.fatturato} : null,
  ].filter(Boolean);

  document.getElementById('det-info-labels').innerHTML = labels.map(l =>
    l.link
      ? `\x3ca href="${l.link.startsWith('http') ? l.link : 'https://'+l.link}" target="_blank" class="det-label" style="text-decoration:none">
          \x3cspan class="det-label-icon">${l.icon}\x3c/span>
          \x3cstrong style="color:var(--gold)">${l.text}\x3c/strong>
        \x3c/a>`
      : `\x3cdiv class="det-label">
          \x3cspan class="det-label-icon">${l.icon}\x3c/span>
          \x3cstrong>${l.text}\x3c/strong>
        \x3c/div>`
  ).join('') + `\x3cdiv class="det-label" style="cursor:pointer;border-color:var(--border2)" onclick="openEditProspect()">
    \x3cspan class="det-label-icon">\x3c/span>
    \x3cstrong style="color:var(--gray)">Modifica\x3c/strong>
  \x3c/div>`;

  document.getElementById('det-score').textContent=s;
  document.getElementById('det-score').style.color=sc.text;
  document.getElementById('det-verdict').textContent=sc.label;
  document.getElementById('det-verdict').style.color=sc.text;
  // Score sopra la ragnatela
  var rsn = document.getElementById('radar-score-num');
  var rsl = document.getElementById('radar-score-label');
  var rsb = document.getElementById('radar-score-box');
  // Score live e target
  const p_live = prospects.find(x => x.id === currentId);
  const sBase = p_live ? calcScore(p_live) : s;
  const sLive = p_live ? calcScoreLive(p_live) : s;
  const sTgt  = p_live ? calcScoreTarget(p_live) : s;
  const scLive = scoreColor(sLive);

  // Numero grande
  if (rsn) { rsn.textContent = sLive || '—'; rsn.style.color = sLive ? scLive.text : 'var(--gray)'; }
  if (rsl) { rsl.textContent = sLive ? scLive.label : ''; rsl.style.color = sLive ? scLive.text : 'var(--gray)'; }
  if (rsb && sLive) {
    rsb.style.borderColor = scLive.border;
    rsb.style.background = sLive >= 70 ? '#e8f5ee' : sLive >= 45 ? '#fdf3e3' : '#fdecea';
  }

  // Barra progressione
  const barWrap = document.getElementById('radar-score-bar-wrap');
  const barLive = document.getElementById('radar-score-bar-live');
  const barTarget = document.getElementById('radar-score-bar-target');
  const baseVal = document.getElementById('radar-score-base-val');
  const rstEl = document.getElementById('radar-score-target');

  if (barWrap && sTgt > 0) {
    barWrap.style.display = 'block';
    const pctLive = (sLive / 100 * 100).toFixed(1) + '%';
    const pctTgt  = (sTgt  / 100 * 100).toFixed(1) + '%';
    if (barLive)  { barLive.style.width = pctLive; barLive.style.background = scLive.text; }
    if (barTarget){ barTarget.style.width = pctTgt; barTarget.style.background = 'var(--gold)'; }
    if (baseVal)  { baseVal.textContent = sBase + '/100'; }
    if (rstEl && sTgt > sLive) {
      rstEl.textContent = '↑ ' + sTgt + ' con il piano';
    } else if (rstEl) {
      rstEl.textContent = '';
    }
  } else if (barWrap) {
    barWrap.style.display = 'none';
  }
  document.getElementById('det-verdesc').textContent=s>=70
    ?'Struttura solida su tutti i fronti. Focus su ottimizzazione e scala.'
    :s>=45?'Basi presenti ma con gap strutturali. Alto potenziale se si interviene con metodo.'
    :'Organizzazione commerciale fragile. Dipendenza dal titolare e assenza di processi sono i rischi principali.';

  document.getElementById('det-dims').innerHTML=DIMS.map(d=>{
    const v=p.dims?.[d.id]||0, pct=(v/5)*100;
    const t=p.targets?.[d.id];
    const col=pct>=60?'#4A9A6A':pct>=35?'#C9973A':'#C05040';
    const _azDim = (AZIONI_TARGET_BY_SETTORE[p.settore || ''] || {})[d.id] || {};
    const _curStep = String(Math.max(v, 1));
    const desc = _azDim[_curStep] || '—';
    const _tgtStep = t ? String(Math.max(t, 1)) : '';
    const tgtDesc = t ? (_azDim[_tgtStep] || '—') : '';
    return `\x3cdiv class="dim-row" style="margin-bottom:10px">
      \x3cdiv class="dim-label" style="display:flex;align-items:center;margin-bottom:3px">${getDimLabel(p.settore, d.id)}\x3c/div>
      \x3cdiv style="display:flex;align-items:center;gap:8px">
        \x3cdiv class="dim-bar-bg" style="flex:1">\x3cdiv class="dim-bar-fill" style="width:${pct}%;background:${col}">\x3c/div>\x3c/div>
        \x3cdiv class="dim-val" style="color:${col}">${v}/5\x3c/div>
      \x3c/div>
      \x3cdiv style="font-size:10px;color:${col};margin-top:2px;line-height:1.3">${desc}\x3c/div>
    \x3c/div>`;
  }).join('');

  // Draw radar + target editor
  setTimeout(() => {
    drawRadar(p.dims || {}, p.targets || {}, p.settore);
    // Mega-grafico cumulativo sotto la ragnatela
    const megaSection = document.getElementById('mega-grafico-section');
    if (megaSection) megaSection.innerHTML = '';
    // Grafico timeline progressione
    const tlContainer = document.getElementById('grafico-timeline-container');
    if (tlContainer) tlContainer.innerHTML = _buildGraficoTimeline(p);
    // Salva snapshot iniziale se non ha ancora storia
    if (!p.score_history || p.score_history.length === 0) {
      salvaScoreSnapshot(p, 'Prima valutazione');
    }
  }, 50);
  setTimeout(() => renderTargetEditor(p), 200);

  document.getElementById('det-info-content').innerHTML=`
    \x3cdiv style="display:grid;grid-template-columns:1fr 1fr;gap:8px 16px">
      ${genField('Referente',p.referente)}
      ${genField('Email',p.email)}
      ${genField('Telefono',p.telefono)}
      ${genField('Fatturato',p.fatturato)}
      ${genField('Settore',MARKET[p.settore]?.label?.split('/')[0]?.trim()||p.settore)}
      ${genField('Dipendenti',p.dipendenti)}
    \x3c/div>
    ${p.note?`\x3cdiv class="divider">\x3c/div>\x3cdiv style="font-size:12px;color:var(--gray);line-height:1.6">${p.note}\x3c/div>`:''}`;

  // ── BENCHMARK KPI DINAMICO ──────────────────────────────────────
  const bench = (typeof BENCHMARK_KPI !== 'undefined' && BENCHMARK_KPI[p.settore]) ? BENCHMARK_KPI[p.settore] : null;
  const kpi = p.kpi_commerciali || {};

  const KPI_LABELS = {
    tasso_conversione_pct:   'Tasso di conversione lead\u2192cliente',
    ciclo_vendita_gg:        'Ciclo di vendita medio',
    valore_medio_ordine:     'Valore medio ordine/contratto',
    concentrazione_top3_pct: 'Concentrazione top 3 clienti',
    tasso_riacquisto_pct:    'Tasso di riacquisto',
    nuovi_clienti_anno:      'Nuovi clienti / anno',
    clienti_attivi:          'Clienti attivi totali',
    fatturato_referral_pct:  '% fatturato da referral',
    cac:                     'CAC \u2014 Costo acquisizione cliente',
    dso_gg:                  'DSO \u2014 Giorni medi incasso',
    mrr:                     'MRR / ARR',
  };

  function _getKpiStatus(val, b) {
    if (val === null || val === undefined || val === '') return null;
    var v = parseFloat(val);
    if (isNaN(v) || !b) return null;
    if (b.verso === 'alto') {
      if (v >= b.alto)  return 'top';
      if (v >= b.medio) return 'ok';
      return 'low';
    } else {
      if (v <= b.alto)  return 'top';
      if (v <= b.medio) return 'ok';
      return 'low';
    }
  }

  function _kpiStatusBadge(s) {
    if (s === 'top') return '\x3cspan class="bench-badge bench-top">\u25B2 Top\x3c/span>';
    if (s === 'ok')  return '\x3cspan class="bench-badge bench-ok">\u25CF Ok\x3c/span>';
    if (s === 'low') return '\x3cspan class="bench-badge bench-low">\u25BC Sotto\x3c/span>';
    return '\x3cspan class="bench-badge bench-nd">\u2014\x3c/span>';
  }

  var benchRowsHtml = '';
  var totKpi = 0, inseriti = 0, topCount = 0, okCount = 0, lowCount = 0;

  if (bench) {
    Object.keys(KPI_LABELS).forEach(function(key) {
      var b = bench[key];
      if (!b || (b.medio === 0 && b.alto === 0)) return;
      totKpi++;
      var val = kpi[key];
      var hasVal = val !== null && val !== undefined && val !== '';
      if (hasVal) inseriti++;
      var status = _getKpiStatus(val, b);
      if (status === 'top') topCount++;
      if (status === 'ok')  okCount++;
      if (status === 'low') lowCount++;
      var displayVal = hasVal ? parseFloat(val).toLocaleString('it-IT') + ' ' + b.unita : '\u2014';
      var rowClass = status ? 'bench-row-' + status : '';
      benchRowsHtml +=
        '\x3ctr class="' + rowClass + '">' +
          '\x3ctd class="bench-td-label">' +
            '\x3cdiv class="bench-kpi-name">' + KPI_LABELS[key] + '\x3c/div>' +
            '\x3cdiv class="bench-kpi-fonte">' + b.fonte + '\x3c/div>' +
          '\x3c/td>' +
          '\x3ctd class="bench-td-num">' + b.medio.toLocaleString('it-IT') + ' ' + b.unita + '\x3c/td>' +
          '\x3ctd class="bench-td-num bench-td-top">' + b.alto.toLocaleString('it-IT') + ' ' + b.unita + '\x3c/td>' +
          '\x3ctd class="bench-td-client">' +
            '\x3cspan class="bench-client-val-inline ' + (status ? 'bench-val-' + status : '') + '">' + displayVal + '\x3c/span>' +
            _kpiStatusBadge(status) +
          '\x3c/td>' +
        '\x3c/tr>';
    });
  } else {
    benchRowsHtml = '\x3ctr>\x3ctd colspan="4" class="bench-empty-td">Nessun benchmark disponibile per questo settore.\x3c/td>\x3c/tr>';
  }

  var summaryHtml = bench ?
    '\x3cdiv class="bench-summary-bar">' +
      '\x3cspan class="bench-sum-item bench-sum-top">\u25B2 Top: ' + topCount + '\x3c/span>' +
      '\x3cspan class="bench-sum-item bench-sum-ok">\u25CF In linea: ' + okCount + '\x3c/span>' +
      '\x3cspan class="bench-sum-item bench-sum-low">\u25BC Sotto: ' + lowCount + '\x3c/span>' +
      '\x3cspan class="bench-sum-item bench-sum-nd">' + inseriti + '/' + totKpi + ' KPI inseriti\x3c/span>' +
      (inseriti < totKpi ? '\x3cspan class="bench-sum-warn">' + (totKpi - inseriti) + ' KPI mancanti\x3c/span>' : '') +
    '\x3c/div>' : '';

  var benchContainer = document.getElementById('det-benchmark');
  if (benchContainer) {
    benchContainer.innerHTML =
      summaryHtml +
      '\x3ctable class="bench-table">' +
        '\x3cthead>\x3ctr>' +
          '\x3cth>Metrica\x3c/th>' +
          '\x3cth>Media settore\x3c/th>' +
          '\x3cth>Top performer\x3c/th>' +
          '\x3cth>' + (p.nome || 'Cliente') + '\x3c/th>' +
        '\x3c/tr>\x3c/thead>' +
        '\x3ctbody>' + benchRowsHtml + '\x3c/tbody>' +
      '\x3c/table>';
  }
  // ── FINE BENCHMARK KPI ───────────────────────────────────────────

  // Render financial sections
  renderFinancials(p);
  renderStruttura(p);
  renderCommercialeData(p);
  renderStrategico(p);
  renderKpiTab(p);

  // Load calls
  const {data:calls_raw,error}=await sb.from('calls').select('*').eq('prospect_id',id);
  const calls = calls_raw ? calls_raw.sort((a,b) => new Date(b.data) - new Date(a.data)) : [];
  currentCalls=calls||[];
  document.getElementById('call-count').textContent = currentCalls.length + ' call registrate';
  if(!currentCalls.length) {
    document.getElementById('call-log').innerHTML='\x3cdiv style="color:var(--gray);font-size:13px;padding:8px 0">Nessuna call registrata. Premi "+ Call" per aggiungere la prima nota.\x3c/div>';
  } else {
    document.getElementById('call-log').innerHTML=currentCalls.map(c=>{
      const ec=c.esito==='positivo'?'#4A9A6A':c.esito==='negativo'?'#C05040':'#C9973A';
      const el=c.esito==='positivo'?'Positivo':c.esito==='negativo'?'Negativo':'Neutro';
      return `\x3cdiv class="call-item">
        \x3cdiv style="display:flex;align-items:center;gap:10px">
          \x3cdiv class="call-date">${new Date(c.data).toLocaleDateString('it-IT',{day:'2-digit',month:'long',year:'numeric'})}\x3c/div>
          \x3cspan class="tag" style="background:${ec}22;color:${ec};font-size:10px">${el}\x3c/span>
        \x3c/div>
        \x3cdiv class="call-note">${(c.note||'').replace(/\n/g,'\x3cbr>')}\x3c/div>
      \x3c/div>`;
    }).join('');
  }
  await loadPreventivi(id);
  renderPreventivi(p);
  renderCronistoria(p);
}

// -- MARKET ------------------------------------------------
function renderMarket() {
  const macros = Object.entries(MARKET).filter(([,d])=>!d.parent);
  let html = '';

  macros.forEach(([macroKey, macro]) => {
    const subs = Object.entries(MARKET).filter(([,d])=>d.parent===macroKey);

    // Macro key metrics summary (3 highlight values)
    const highlight = [macro.metrics[0], macro.metrics[1], macro.metrics[2]];

    // Macro card
    html += `\x3cdiv class="market-macro-card" id="macro-${macroKey}" onclick="toggleMacro('${macroKey}')">
      \x3cdiv class="market-macro-title">
        ${macro.label}
        \x3cspan class="market-expand-btn" id="btn-${macroKey}">${subs.length} sottomercati v\x3c/span>
      \x3c/div>
      \x3cdiv class="market-macro-sub">Clicca per vedere i dati per sottosettore\x3c/div>
      ${highlight.map(m=>`\x3cdiv style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:12px">
        \x3cspan style="color:var(--gray)">${m.label}\x3c/span>
        \x3cdiv style="display:flex;gap:10px">
          \x3cspan style="color:var(--white)">${m.media}\x3c/span>
          \x3cspan style="color:var(--green);font-weight:500">${m.top}\x3c/span>
        \x3c/div>
      \x3c/div>`).join('')}
      \x3cdiv style="display:flex;gap:12px;margin-top:8px;font-size:10px">
        \x3cspan style="color:var(--gray)">* Media settore\x3c/span>
        \x3cspan style="color:var(--green)">* Top performer (quartile superiore)\x3c/span>
      \x3c/div>
    \x3c/div>`;

    // Subs panel (hidden by default, full row)
    html += `\x3cdiv class="market-subs-panel" id="panel-${macroKey}">
      \x3cdiv style="font-size:11px;color:var(--gray);margin-bottom:14px;letter-spacing:.06em;text-transform:uppercase">Sottomercati -- ${macro.label}\x3c/div>
      \x3cdiv class="subs-grid">
        ${subs.map(([subKey, sub])=>`\x3cdiv class="sub-card">
          \x3cdiv class="sub-card-title" style="display:flex;align-items:center;justify-content:space-between">
            ${sub.label}
            \x3cbutton onclick="openDetailPanel('${subKey}')" style="background:var(--amber-bg);border:1px solid var(--gold-dim);color:var(--gold);border-radius:4px;padding:2px 8px;font-size:10px;cursor:pointer;font-family:var(--font-sans);white-space:nowrap;flex-shrink:0;margin-left:8px">Approfondisci ->\x3c/button>
          \x3c/div>
          ${sub.metrics.map(m=>`\x3cdiv style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border);font-size:11px">
            \x3cspan style="color:var(--gray)">${m.label}\x3c/span>
            \x3cdiv style="display:flex;gap:8px">
              \x3cspan style="color:var(--white)">${m.media}\x3c/span>
              \x3cspan style="color:var(--green);font-weight:500">${m.top}\x3c/span>
            \x3c/div>
          \x3c/div>`).join('')}
          \x3cdiv style="display:flex;gap:10px;margin-top:6px;font-size:10px">
            \x3cspan style="color:var(--gray)">* Media\x3c/span>
            \x3cspan style="color:var(--green)">* Top\x3c/span>
          \x3c/div>
        \x3c/div>`).join('')}
      \x3c/div>
    \x3c/div>`;
  });

  document.getElementById('market-grid').innerHTML = html;
}

function toggleMacro(key) {
  const card = document.getElementById('macro-'+key);
  const panel = document.getElementById('panel-'+key);
  const btn = document.getElementById('btn-'+key);
  const isOpen = panel.classList.contains('open');

  // Close all panels first
  document.querySelectorAll('.market-subs-panel').forEach(p=>p.classList.remove('open'));
  document.querySelectorAll('.market-macro-card').forEach(c=>c.classList.remove('expanded'));
  document.querySelectorAll('.market-expand-btn').forEach(b=>{
    const mk = b.id.replace('btn-','');
    const subs = Object.entries(MARKET).filter(([,d])=>d.parent===mk);
    b.textContent = subs.length + ' sottomercati v';
  });

  if (!isOpen) {
    panel.classList.add('open');
    card.classList.add('expanded');
    btn.textContent = 'Chiudi ^';
    // Scroll panel into view smoothly
    setTimeout(()=>panel.scrollIntoView({behavior:'smooth',block:'nearest'}), 50);
  }
}

// -- MODALS ------------------------------------------------
function buildSliders(vals={}) {
  const _sc=document.getElementById('sliders-container'); if(!_sc) return;
  _sc.innerHTML=DIMS.map(d=>{
    const v=vals[d.id]||2;
    const desc=DIM_DESC[d.id]?.[v-1]||'';
    return `\x3cdiv class="slider-row">
      \x3cdiv class="slider-row-top">
        \x3cdiv class="slider-label">${d.label}\x3c/div>
        \x3cinput type="range" min="1" max="5" step="1" value="${v}" id="sl-${d.id}"
          oninput="
            document.getElementById('sv-${d.id}').textContent=this.value;
            document.getElementById('sd-${d.id}').textContent=(DIM_DESC['${d.id}']?.[this.value-1]||'');
            document.getElementById('sd-${d.id}').style.color=this.value>=4?'var(--green)':this.value>=3?'var(--gold)':'var(--red)';
          ">
        \x3cdiv class="slider-val" id="sv-${d.id}">${v}\x3c/div>
      \x3c/div>
      \x3cdiv id="sd-${d.id}" style="font-size:11px;padding:3px 6px;border-radius:4px;
        color:${v>=4?'var(--green)':v>=3?'var(--gold)':'var(--red)'};
        background:${v>=4?'var(--green-bg)':v>=3?'var(--amber-bg)':'var(--red-bg)'};
        line-height:1.4">${desc}\x3c/div>
    \x3c/div>`;
  }).join('');
}

function openModal(id){document.getElementById(id).classList.add('open')}
function closeModal(id){var el=document.getElementById(id);el.classList.remove('open');el.style.display='';}
document.querySelectorAll('.modal-overlay').forEach(el=>el.addEventListener('click',e=>{if(e.target===el)el.classList.remove('open')}));

function _buildSettoreSelectHTML(settore) {
  const _optVL = (v, l, sel) => `<option value="${v}" ${sel===v?'selected':''}>${l}</option>`;
  return `<select class="form-input" id="f-settore">
    <option value="">-- Seleziona settore --</option>
    <optgroup label="Manifatturiero">
      ${[['manifatturiero_meccanica','Meccanica di precisione'],['manifatturiero_automotive','Automotive supply chain'],['manifatturiero_packaging','Packaging & converting'],['manifatturiero_cterzi','Lavorazioni conto terzi'],['manifatturiero_elettromeccanica','Elettromeccanica'],['manifatturiero_tessile_tessuti','Tessile (tessuti)'],['manifatturiero_tessile_capi','Tessile (capi)']].map(x=>_optVL(x[0],x[1],settore)).join('')}
    </optgroup>
    <optgroup label="Servizi B2B">
      ${[['servizi_it','Servizi IT & system integrator'],['servizi_formazione','Formazione aziendale']].map(x=>_optVL(x[0],x[1],settore)).join('')}
    </optgroup>
    <optgroup label="Edilizia / Impianti">
      ${[['edilizia_residenziale','Costruzioni residenziali'],['edilizia_impianti','Impiantistica'],['edilizia_serramenti','Serramenti & facciate']].map(x=>_optVL(x[0],x[1],settore)).join('')}
    </optgroup>
    <optgroup label="Commercio / Distribuzione">
      ${[['commercio_distribuzione_industriale','Distribuzione industriale'],['commercio_ingrosso_alimentare','Ingrosso alimentare'],['commercio_materiali_edili','Materiali edili & ferramenta'],['commercio_ricambi_auto','Ricambi auto & veicoli'],['commercio_abbigliamento_ingrosso','Abbigliamento ingrosso'],['commercio_elettronica','Elettronica & elettrodomestici'],['commercio_auto_moto_nuovo','Auto & moto (nuovo)'],['commercio_auto_moto_usato','Auto & moto (usato)'],['commercio_abbigliamento_dettaglio','Abbigliamento al dettaglio'],['commercio_orologi_gioielli','Orologi & gioielli']].map(x=>_optVL(x[0],x[1],settore)).join('')}
    </optgroup>
    <optgroup label="Alimentare / Food">
      ${[['alimentare_trasformazione','Trasformazione agroalimentare'],['alimentare_vini','Vini & spirits'],['alimentare_forno','Prodotti da forno & pasticceria'],['alimentare_conserve','Conserve & surgelati'],['alimentare_ingredienti','Ingredienti B2B'],['alimentare_birra','Birra artigianale']].map(x=>_optVL(x[0],x[1],settore)).join('')}
    </optgroup>
    <optgroup label="Tech / Software">
      ${[['tech_saas','SaaS B2B'],['tech_system_integrator','System integrator'],['tech_digital_agency','Digital agency & e-commerce'],['tech_automazione','Automazione industriale']].map(x=>_optVL(x[0],x[1],settore)).join('')}
    </optgroup>
  </select>`;
}

function _buildProspectModalBody(p) {
  p = p || {};
  const _esc = (s) => String(s==null?'':s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');

  return `
    <div class="form-grid">
      <div class="form-group form-group-full">
        <label>Nome azienda *</label>
        <input class="form-input" id="f-nome" placeholder="es. Rossi Srl" value="${_esc(p.nome)}">
      </div>
      <div class="form-group">
        <label>Settore *</label>
        ${_buildSettoreSelectHTML(p.settore)}
      </div>
      <div class="form-group">
        <label>Forma giuridica</label>
        <select class="form-input" id="f-forma">
          <option value="">—</option>
          ${['Srl','Srls','Spa','Sapa','Sas','Snc','Ditta individuale','Imprenditore individuale','Cooperativa','Consorzio','Società agricola Srl','Società agricola Sas','Società agricola Snc','Società semplice','Associazione','Fondazione','Ente pubblico','Altro'].map(f=>`<option value="${f}" ${p.forma_giuridica===f?'selected':''}>${f}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Referente</label>
        <input class="form-input" id="f-referente" placeholder="Nome cognome" value="${_esc(p.referente)}">
      </div>
      <div class="form-group">
        <label>Ruolo interlocutore</label>
        <input class="form-input" id="f-ruolo" placeholder="es. Titolare, CFO" value="${_esc(p.ruolo)}">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input class="form-input" id="f-email" placeholder="email@azienda.it" value="${_esc(p.email)}">
      </div>
      <div class="form-group">
        <label>Telefono</label>
        <input class="form-input" id="f-tel" placeholder="+39 ..." value="${_esc(p.telefono)}">
      </div>
      <div class="form-group">
        <label>Sede legale</label>
        <input class="form-input" id="f-sede" placeholder="es. Milano, MI" value="${_esc(p.sede_legale)}">
      </div>
      <div class="form-group form-group-full">
        <label>Note iniziali</label>
        <textarea class="form-input" id="f-note" rows="3" placeholder="Impressioni dalla prima call...">${_esc(p.note)}</textarea>
      </div>
    </div>`;
}
function switchModalTab(tabId, btn) {
  document.querySelectorAll('.mtab-content').forEach(function(t) { t.style.display = 'none'; });
  document.querySelectorAll('.mtab').forEach(function(b) { b.classList.remove('active'); });
  var el = document.getElementById('mtab-' + tabId);
  if (el) el.style.display = 'block';
  if (btn) btn.classList.add('active');
}

function openNewProspect() {
  editingId = null;
  document.getElementById('modal-prospect-title').textContent = 'Nuovo Prospect';
  var bodyEl = document.getElementById('modal-prospect-body');
  bodyEl.innerHTML = _buildProspectModalBody({});
  document.getElementById('modal-prospect').classList.add('open');
  document.getElementById('modal-prospect').style.display = 'flex';
}

function openEditProspect(id) {
  id = id || currentId;
  var p = prospects.find(function(x) { return x.id === id; });
  if (!p) return;
  editingId = p.id;
  document.getElementById('modal-prospect-title').textContent = 'Modifica Prospect';
  var bodyEl = document.getElementById('modal-prospect-body');
  bodyEl.innerHTML = _buildProspectModalBody(p);
  document.getElementById('modal-prospect').classList.add('open');
  document.getElementById('modal-prospect').style.display = 'flex';
}

function _parseNum(val) {
  var n = parseFloat(val);
  return isNaN(n) ? null : n;
}
function _parseBool(val) {
  if (val === 'true') return true;
  if (val === 'false') return false;
  return null;
}

async function saveProspect() {
  var nome = (document.getElementById('f-nome')?.value || '').trim();
  if (!nome) { alert('Inserisci il nome dell\'azienda'); return; }

  var _val = function(id) { return (document.getElementById(id)?.value || '').trim(); };

  var data = {
    nome: nome,
    settore: _val('f-settore'),
    forma_giuridica: _val('f-forma'),
    referente: _val('f-referente'),
    ruolo: _val('f-ruolo'),
    email: _val('f-email'),
    telefono: _val('f-tel'),
    sede_legale: _val('f-sede'),
    note: _val('f-note'),
    color: editingId ? (prospects.find(function(x){return x.id===editingId;})?.color || assignNextColor()) : assignNextColor(),
  };

  var btn = document.getElementById('btn-save-prospect');
  btn.textContent = 'Salvataggio...'; btn.disabled = true;
  try {
    if (editingId) {
      var res = await sb.from('prospects').update(data).eq('id', editingId);
      if (res.error) throw res.error;
      var i = prospects.findIndex(function(x){return x.id===editingId;});
      prospects[i] = {...prospects[i], ...data};
      window._allProspects = prospects;
      showToast('Prospect aggiornato');
    } else {
      var res2 = await sb.from('prospects').insert(data).select().single();
      if (res2.error) throw res2.error;
      prospects.push(res2.data);
      window._allProspects = prospects;
      showToast('Prospect creato');
    }
    renderSidebar();
    closeModal('modal-prospect');
    if (editingId) renderProspectDetail(editingId);
    else openProspect(prospects[prospects.length-1].id);
    renderDashboard();
  } catch(e) {
    showToast('Errore: ' + e.message, 'error');
  } finally {
    btn.textContent = 'Salva'; btn.disabled = false;
  }
}

async function deleteProspect() {
  if(!confirm('Eliminare questo prospect e tutte le sue call?')) return;
  const {error}=await sb.from('prospects').delete().eq('id',currentId);
  if(error){showToast('Errore eliminazione','error');return;}
  prospects=prospects.filter(x=>x.id!==currentId);
  window._allProspects = prospects;
  showToast('Prospect eliminato');
  renderSidebar();
  showView('dashboard');
}

function openAddCall() {
  document.getElementById('call-date').value=new Date().toISOString().split('T')[0];
  document.getElementById('call-note-input').value='';
  document.getElementById('call-esito').value='neutro';
  openModal('modal-call');
}

async function saveCall() {
  const note=document.getElementById('call-note-input').value.trim();
  if(!note){alert('Inserisci le note della call');return;}
  const {error}=await sb.from('calls').insert({
    prospect_id:currentId,
    data:document.getElementById('call-date').value,
    note,
    esito:document.getElementById('call-esito').value,
  });
  if(error){showToast('Errore salvataggio call','error');return;}
  showToast('Call registrata');
  if (currentId) await aggiornaStatoAutomatico(currentId, 'contattato');
  closeModal('modal-call');
  renderProspectDetail(currentId);
}

// -- REPORT ------------------------------------------------

function showReport() {
  const p = prospects.find(x => x.id === currentId);
  if (!p) return;
  document.getElementById('report-content').innerHTML = _buildReportHTML(p);
  openModal('modal-report');
}

function _buildReportHTML(p) {
  const s = calcScore(p);
  const sc = scoreColor(s);
  const bench = MARKET[p.settore];
  const today = new Date().toLocaleDateString('it-IT', {day:'2-digit', month:'long', year:'numeric'});
  const sorted = [...DIMS].sort((a,b) => (p.dims?.[a.id]||1) - (p.dims?.[b.id]||1));
  const crits = sorted.slice(0,3);
  const targets = p.targets || {};
  const settore = p.settore || '';

  // Verdict
  const verdictText = s >= 70 ? 'Struttura commerciale solida' : s >= 45 ? 'Struttura da sviluppare' : 'Struttura critica';
  const verdictDesc = s >= 70
    ? 'Buone basi presenti. Ottimizzazioni mirate possono portare crescita significativa in tempi brevi.'
    : s >= 45 ? 'Fondamenta presenti ma sistemi chiave mancanti frenano la crescita.'
    : 'La situazione attuale limita fortemente la crescita. Priorità: intervenire subito sulle aree critiche.';

  // Priority actions: for each dim where target > cur, take the first step action
  const scadenze = p.target_scadenze || {};
  const priorityActions = DIMS
    .filter(d => (targets[d.id]||0) > (p.dims?.[d.id]||0))
    .slice(0, 5)
    .map(d => {
      const cur = p.dims?.[d.id] || 0;
      const tgt = targets[d.id] || 0;
      const azione = _getAzionePredefinita(settore, d.id, cur, cur + 1);
      const costo = _getCosto(settore, d.id, cur, cur + 1);
      const scad = scadenze[d.id] || null;
      const impattoRaw = _getImpatto(settore, d.id, String(cur + 1));
      const impattoCalc = _calcolaImpatto(impattoRaw, p.fatturato, p.fatturato_anno_1, p.ebitda, p.margine_pct, p.utile_netto);
      return azione ? { dim: getDimLabel(p.settore, d.id), dimId: d.id, cur, tgt, azione, costo, scad, impatto: impattoCalc } : null;
    })
    .filter(Boolean);

  return `<div class="report-preview" id="printable-report">

    <div class="rp-header">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div class="rp-company">${p.nome}</div>
          <div class="rp-sub">${bench?.label || p.settore || '--'} &nbsp;·&nbsp; ${p.dipendenti || '--'} dip. &nbsp;·&nbsp; ${p.fatturato || '--'}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:9px;color:#B8842E;letter-spacing:.1em;text-transform:uppercase;font-weight:700">Diagnosi Commerciale</div>
          <div style="font-size:11px;color:#888;margin-top:3px">${today}</div>
        </div>
      </div>
    </div>

    <div class="rp-score-row">
      <div class="rp-circle" style="border-color:${sc.border};color:${sc.text}">
        <div class="rp-num">${s}</div>
        <div style="font-size:9px;opacity:.6">/100</div>
      </div>
      <div style="flex:1">
        <div style="font-size:17px;font-weight:700;color:#1A1A1A;font-family:'DM Serif Display',serif">${verdictText}</div>
        <div style="font-size:12px;color:#666;margin-top:5px;line-height:1.5">${verdictDesc}</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:20px">

      <div>
        <div class="rp-section-title">Valutazione per area</div>
        ${DIMS.map(d => {
          const v = p.dims?.[d.id] || 0;
          const tgt = targets[d.id] || 0;
          const pct = v > 0 ? (v/5)*100 : 0;
          const col = v >= 4 ? '#4A9A6A' : v >= 3 ? '#C9973A' : v >= 1 ? '#C05040' : '#CCC';
          const hasTgt = tgt > v;
          return `<div class="rp-dim-row" style="margin-bottom:10px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
              <div class="rp-dim-label">${getDimLabel(p.settore, d.id)}</div>
              <div style="font-size:11px;font-weight:700;color:${col}">${v > 0 ? v+'/5' : '—'}${hasTgt ? ' <span style="color:#B8842E;font-weight:400">→ '+tgt+'</span>' : ''}</div>
            </div>
            <div class="rp-bar-bg">
              <div class="rp-bar-fill" style="width:${pct}%;background:${col}"></div>
              ${hasTgt ? '<div style="position:absolute;left:'+((tgt/5)*100)+'%;top:-2px;width:2px;height:9px;background:#B8842E;border-radius:1px"></div>' : ''}
            </div>
          </div>`;
        }).join('')}
      </div>

      <div>
        <div class="rp-section-title">Aree critiche prioritarie</div>
        ${crits.map((d, i) => {
          const v = p.dims?.[d.id] || 1;
          const colors = ['#C05040','#C9973A','#8A6AC9'];
          return `<div class="rp-crit" style="border-left-color:${colors[i]};margin-bottom:10px">
            <div class="rp-crit-title">${getDimLabel(p.settore, d.id)} <span style="font-weight:400;color:#999;font-size:11px">livello ${v}/5</span></div>
            <div class="rp-crit-text">${DIM_DESC[d.id]?.[v-1] || ''}</div>
          </div>`;
        }).join('')}

        ${p.referente ? `<div style="margin-top:16px;padding:12px 14px;background:#F5F2EA;border-radius:8px">
          <div style="font-size:9px;color:#B8842E;letter-spacing:.08em;text-transform:uppercase;font-weight:700;margin-bottom:8px">Referente</div>
          <div style="font-size:13px;font-weight:600;color:#1A1A1A">${p.referente}</div>
          ${p.ruolo ? '<div style="font-size:11px;color:#888;margin-top:2px">'+p.ruolo+'</div>' : ''}
          ${p.email ? '<div style="font-size:11px;color:#666;margin-top:4px">'+p.email+'</div>' : ''}
        </div>` : ''}
      </div>
    </div>

    ${priorityActions.length > 0 ? `
    <div style="margin-bottom:20px">
      <div class="rp-section-title">Piano d'azione — prossimi step</div>
      <div style="border:1px solid #E8E4DC;border-radius:8px;overflow:hidden">
        ${priorityActions.map((a, i) => `
        <div style="display:flex;align-items:flex-start;gap:14px;padding:12px 16px;${i < priorityActions.length-1 ? 'border-bottom:1px solid #E8E4DC;' : ''}background:${i === 0 ? '#FDF8F0' : '#FAFAF7'}">
          <div style="width:28px;height:28px;border-radius:50%;background:${i === 0 ? '#B8842E' : '#E8E4DC'};color:${i === 0 ? '#fff' : '#888'};font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">${i+1}</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap">
              <div style="font-size:10px;color:#B8842E;letter-spacing:.06em;text-transform:uppercase;font-weight:600">${a.dim} &nbsp;${a.cur}/5 → ${a.cur+1}/5</div>
               ${a.costo ? '<div style="font-size:10px;color:#4A9A6A;background:#E8F5EE;border-radius:20px;padding:1px 8px;font-weight:600">≈ ' + _formatEur(a.costo.r) + '€/mese' + (a.costo.u > 0 ? ' + ' + _formatEur(a.costo.u) + '€ setup' : '') + '</div>' : ''}
              ${a.scad ? '<div style="font-size:10px;color:#666;background:#F0EDE6;border-radius:20px;padding:1px 8px">entro '+new Date(a.scad).toLocaleDateString("it-IT",{day:"2-digit",month:"short",year:"numeric"})+'</div>' : ''}
            </div>
            ${a.impatto ? (()=>{
              const ic = a.impatto;
              const hasE = ic.m6.ebitdaMin !== null;
              return '<div style="margin:5px 0 6px;border:1px solid #C8E6C9;border-radius:6px;overflow:hidden;font-size:10px">' +
                '<div style="background:#2E7D32;color:#fff;padding:4px 10px;font-size:9px;font-weight:700;letter-spacing:.06em;display:flex;justify-content:space-between">' +
                  '<span>IMPATTO STIMATO SUL FATTURATO</span>' +
                  '<span style="font-weight:400;opacity:.85">Base: '+_formatEur(ic.fatBase)+'€'+(ic.ebitdaMarginPct?' · EBITDA margin: '+ic.ebitdaMarginPct+'%':'')+'</span>' +
                '</div>' +
                '<table style="width:100%;border-collapse:collapse;background:#fff">' +
                  '<tr style="background:#F1F8E9">' +
                    '<th style="padding:3px 8px;font-size:8px;color:#558B2F;text-align:left;font-weight:700;border-bottom:1px solid #C8E6C9"></th>' +
                    '<th style="padding:3px 8px;font-size:8px;color:#558B2F;border-bottom:1px solid #C8E6C9;border-left:1px solid #C8E6C9">CRESCITA %</th>' +
                    '<th style="padding:3px 8px;font-size:8px;color:#558B2F;border-bottom:1px solid #C8E6C9;border-left:1px solid #C8E6C9">FATTURATO TOTALE</th>' +
                    '<th style="padding:3px 8px;font-size:8px;color:#558B2F;border-bottom:1px solid #C8E6C9;border-left:1px solid #C8E6C9">INCREMENTO</th>' +
                    (hasE ? '<th style="padding:3px 8px;font-size:8px;color:#558B2F;border-bottom:1px solid #C8E6C9;border-left:1px solid #C8E6C9">EBITDA PROIETTATO</th>' : '') +
                  '</tr>' +
                  '<tr>' +
                    '<td style="padding:4px 8px;font-size:9px;font-weight:700;color:#1B5E20;border-bottom:1px solid #E8F5E9">6 mesi</td>' +
                    '<td style="padding:4px 8px;font-size:10px;font-weight:700;color:#2E7D32;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9">+'+ic.m6.pctMin+'–'+ic.m6.pctMax+'%</td>' +
                    '<td style="padding:4px 8px;font-size:9px;color:#1B5E20;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9">'+_formatEur(ic.m6.fatMin)+'–'+_formatEur(ic.m6.fatMax)+'€</td>' +
                    '<td style="padding:4px 8px;font-size:9px;color:#388E3C;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9">+'+_formatEur(ic.m6.deltaFatMin)+'–'+_formatEur(ic.m6.deltaFatMax)+'€</td>' +
                    (hasE ? '<td style="padding:4px 8px;font-size:9px;color:#1B5E20;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9">'+_formatEur(ic.m6.ebitdaMin)+'–'+_formatEur(ic.m6.ebitdaMax)+'€</td>' : '') +
                  '</tr>' +
                  '<tr style="background:#F9FBF9">' +
                    '<td style="padding:4px 8px;font-size:9px;font-weight:700;color:#1B5E20;border-bottom:1px solid #E8F5E9">12 mesi</td>' +
                    '<td style="padding:4px 8px;font-size:10px;font-weight:700;color:#2E7D32;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9">+'+ic.m12.pctMin+'–'+ic.m12.pctMax+'%</td>' +
                    '<td style="padding:4px 8px;font-size:9px;color:#1B5E20;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9">'+_formatEur(ic.m12.fatMin)+'–'+_formatEur(ic.m12.fatMax)+'€</td>' +
                    '<td style="padding:4px 8px;font-size:9px;color:#388E3C;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9">+'+_formatEur(ic.m12.deltaFatMin)+'–'+_formatEur(ic.m12.deltaFatMax)+'€</td>' +
                    (hasE ? '<td style="padding:4px 8px;font-size:9px;color:#1B5E20;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9">'+_formatEur(ic.m12.ebitdaMin)+'–'+_formatEur(ic.m12.ebitdaMax)+'€</td>' : '') +
                  '</tr>' +
                  '<tr>' +
                    '<td style="padding:4px 8px;font-size:9px;font-weight:700;color:#1B5E20">24 mesi</td>' +
                    '<td style="padding:4px 8px;font-size:10px;font-weight:700;color:#2E7D32;border-left:1px solid #E8F5E9">+'+ic.m24.pctMin+'–'+ic.m24.pctMax+'%</td>' +
                    '<td style="padding:4px 8px;font-size:9px;color:#1B5E20;border-left:1px solid #E8F5E9">'+_formatEur(ic.m24.fatMin)+'–'+_formatEur(ic.m24.fatMax)+'€</td>' +
                    '<td style="padding:4px 8px;font-size:9px;color:#388E3C;border-left:1px solid #E8F5E9">+'+_formatEur(ic.m24.deltaFatMin)+'–'+_formatEur(ic.m24.deltaFatMax)+'€</td>' +
                    (hasE ? '<td style="padding:4px 8px;font-size:9px;color:#1B5E20;border-left:1px solid #E8F5E9">'+_formatEur(ic.m24.ebitdaMin)+'–'+_formatEur(ic.m24.ebitdaMax)+'€</td>' : '') +
                  '</tr>' +
                '</table>' +
                '<div style="padding:4px 10px;background:#E8F5E9;font-size:8px;color:#558B2F;font-style:italic;border-top:1px solid #C8E6C9">'+ic.note+'</div>' +
              '</div>';
            })() : ''}
            <div style="font-size:12px;color:#1A1A1A;line-height:1.5">${a.azione}</div>
          </div>
          <div style="width:16px;height:16px;border-radius:4px;border:2px solid #D0C9BE;flex-shrink:0;margin-top:3px"></div>
        </div>`).join('')}
      </div>
      <div style="display:flex;justify-content:flex-end;align-items:center;gap:12px;padding:10px 16px;background:#F0EDE6;border-top:1px solid #E8E4DC">
        <div style="font-size:11px;color:#888">Investimento mensile stimato:</div>
        <div style="font-size:13px;font-weight:700;color:#B8842E">${(()=>{
          const tt=priorityActions.filter(a=>a.costo).map(a=>{
            const c = a.costo;
            return [c.r || 0, (c.r || 0) + Math.round((c.u || 0) / 12)];
          });
          if(!tt.length)return '—';
          return tt.reduce((s,t)=>s+t[0],0).toLocaleString('it-IT')+'–'+tt.reduce((s,t)=>s+t[1],0).toLocaleString('it-IT')+' €/mese';
        })()}</div>
      </div>
    </div>` : ''}

    ${bench ? `
    <div style="margin-bottom:20px">
      <div class="rp-section-title">Benchmark di settore — ${bench.label}</div>
      <div style="border:1px solid #E8E4DC;border-radius:8px;overflow:hidden">
        ${bench.metrics.map((m, i) => `
        <div class="rp-bench" style="${i < bench.metrics.length-1 ? 'border-bottom:1px solid #E8E4DC;' : ''}padding:9px 14px">
          <div style="font-size:12px;color:#444">${m.label}</div>
          <div style="display:flex;gap:20px">
            <span style="font-size:11px;color:#999">Media: ${m.media}</span>
            <span style="font-size:11px;color:#4A9A6A;font-weight:600">Top: ${m.top}</span>
          </div>
        </div>`).join('')}
      </div>
    </div>` : ''}

    <div class="rp-footer">
      <span>Documento riservato — preparato per ${p.nome}</span>
      <span style="color:#B8842E;font-weight:600">Fractional CSO</span>
      <span>${today}</span>
    </div>

  </div>`;
}

function printReport() {
  const p = prospects.find(x => x.id === currentId);
  if (!p) return;
  const html = _buildReportHTML(p);
  const w = window.open('', '_blank');
  w.document.write(`<!DOCTYPE html><html lang="it"><head>
    <meta charset="UTF-8">
    <title>Report — ${p.nome}</title>
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'DM Sans', sans-serif; background: #FAFAF7; padding: 32px; }
      @media print {
        body { padding: 0; background: white; }
        @page { margin: 18mm 20mm; size: A4; }
      }
      .report-preview { background: #FAFAF7; color: #1A1A1A; max-width: 720px; margin: 0 auto; font-family: 'DM Sans', sans-serif; }
      .rp-header { border-bottom: 2px solid #C9973A; padding-bottom: 16px; margin-bottom: 20px; }
      .rp-company { font-size: 24px; font-family: 'DM Serif Display', serif; color: #1A1A1A; }
      .rp-sub { font-size: 12px; color: #888; margin-top: 4px; }
      .rp-score-row { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; background: #F0EDE6; border-radius: 10px; padding: 16px 20px; }
      .rp-circle { width: 72px; height: 72px; border-radius: 50%; border: 3px solid; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0; }
      .rp-num { font-size: 28px; font-family: 'DM Serif Display', serif; font-weight: 700; line-height: 1; }
      .rp-section-title { font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: #999; margin-bottom: 12px; font-weight: 700; }
      .rp-dim-row { position: relative; }
      .rp-dim-label { font-size: 11px; color: #444; }
      .rp-bar-bg { position: relative; flex: 1; height: 5px; background: #E8E4DC; border-radius: 3px; overflow: visible; }
      .rp-bar-fill { height: 100%; border-radius: 3px; }
      .rp-crit { border-left: 3px solid #C9973A; padding: 9px 14px; background: #F5F2EA; border-radius: 0 8px 8px 0; }
      .rp-crit-title { font-size: 12px; font-weight: 700; color: #1A1A1A; }
      .rp-crit-text { font-size: 11px; color: #666; margin-top: 3px; line-height: 1.5; }
      .rp-bench { display: flex; justify-content: space-between; align-items: center; }
      .rp-footer { margin-top: 20px; padding-top: 14px; border-top: 1px solid #E8E4DC; font-size: 10px; color: #999; display: flex; justify-content: space-between; gap: 12px; }
      h1, h2, h3 { font-family: 'DM Serif Display', serif; font-weight: 400; }
    </style>
  </head><body>${html}
  <script>window.onload = () => { setTimeout(() => window.print(), 800); }<\/script>
  </body></html>`);
  w.document.close();
}




// -- CALENDARIO --------------------------------------------
let calYear = new Date().getFullYear();
let calMonth = new Date().getMonth();
let allEventi = [];
let editingEventoId = null;

const TIPO_LABELS = {follow_up:'Follow-up', call:'Call', demo:'Demo', altro:'Altro'};

async function loadEventi() {
  const {data, error} = await sb.from('eventi').select('*, prospects(nome)').order('data', {ascending:true});
  if (!error) allEventi = data || [];
}

function renderCalendario() {
  renderCalGrid();
  renderUpcoming();
}

function renderCalGrid() {
  const months = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
  document.getElementById('cal-month-title').textContent = `${months[calMonth]} ${calYear}`;

  const days = ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];
  const firstDay = new Date(calYear, calMonth, 1);
  const lastDay = new Date(calYear, calMonth + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7; // 0=Mon

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  let html = days.map(d => `\x3cdiv class="cal-header-cell">${d}\x3c/div>`).join('');

  // Empty cells before first day
  for (let i = 0; i < startDow; i++) {
    const prevDate = new Date(calYear, calMonth, -startDow + i + 1);
    html += `\x3cdiv class="cal-cell other-month">\x3cdiv class="cal-day-num">${prevDate.getDate()}\x3c/div>\x3c/div>`;
  }

  // Days of month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday = dateStr === todayStr;
    const dayEventi = allEventi.filter(e => e.data === dateStr);

    const evHtml = dayEventi.slice(0,3).map(e => {
      const eProspect = prospects.find(x => x.id === e.prospect_id);
      const eCol = eProspect ? getProspectColor(eProspect) : '#888888';
      const eColBg = eCol + '22';
      const doneStyle = e.completato ? 'opacity:.4;text-decoration:line-through;' : '';
      return `\x3cdiv class="cal-event" style="background:${eColBg};color:${eCol};border-left:2px solid ${eCol};${doneStyle}" onclick="event.stopPropagation();openEditEvento('${e.id}')" title="${e.titolo}">${e.titolo}\x3c/div>`;
    }).join('') + (dayEventi.length > 3 ? `\x3cdiv style="font-size:10px;color:var(--gray)">+${dayEventi.length-3} altri\x3c/div>` : '');

    html += `\x3cdiv class="cal-cell ${isToday?'today':''}" onclick="openAddEventoData('${dateStr}')">
      \x3cdiv class="cal-day-num">${d}\x3c/div>
      ${evHtml}
    \x3c/div>`;
  }

  // Fill remaining cells
  const totalCells = startDow + lastDay.getDate();
  const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remaining; i++) {
    html += `\x3cdiv class="cal-cell other-month">\x3cdiv class="cal-day-num">${i}\x3c/div>\x3c/div>`;
  }

  document.getElementById('cal-grid').innerHTML = html;
}

function renderUpcoming() {
  const today = new Date().toISOString().split('T')[0];
  const upcoming = allEventi
    .filter(e => e.data >= today && !e.completato)
    .slice(0, 8);

  if (!upcoming.length) {
    document.getElementById('upcoming-list').innerHTML = '\x3cdiv style="color:var(--gray);font-size:13px">Nessun evento in programma\x3c/div>';
    return;
  }

  document.getElementById('upcoming-list').innerHTML = upcoming.map(e => {
    const d = new Date(e.data + 'T12:00:00');
    const dateLabel = d.toLocaleDateString('it-IT', {day:'2-digit', month:'short'});
    const prospectName = e.prospects?.nome || '';
    const eProspect = prospects.find(x => x.id === e.prospect_id);
    const eCol = eProspect ? getProspectColor(eProspect) : '#888888';
    return `\x3cdiv class="upcoming-item" onclick="openEditEvento('${e.id}')" style="border-left:3px solid ${eCol}">
      \x3cdiv class="upcoming-date" style="color:${eCol}">${dateLabel}${e.ora ? '\x3cbr>\x3cspan style="font-size:10px;color:var(--gray2)">' + e.ora.slice(0,5) + '\x3c/span>' : ''}\x3c/div>
      \x3cdiv style="flex:1;min-width:0">
        \x3cdiv class="upcoming-title">${e.titolo}\x3c/div>
        ${prospectName ? `\x3cdiv class="upcoming-prospect" style="color:${eCol};opacity:.8">${prospectName}\x3c/div>` : ''}
      \x3c/div>
      \x3cspan class="upcoming-tipo" style="background:${eCol}22;color:${eCol}">${TIPO_LABELS[e.tipo]||e.tipo}\x3c/span>
      \x3cbutton class="check-btn ${e.completato?'done':''}" onclick="event.stopPropagation();toggleEvento('${e.id}',${e.completato})" title="Segna come completato">v\x3c/button>
    \x3c/div>`;
  }).join('');
}

function calPrev() {
  calMonth--;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalGrid();
}

function calNext() {
  calMonth++;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalGrid();
}

function populateProspectSelect() {
  const sel = document.getElementById('ev-prospect');
  sel.innerHTML = '\x3coption value="">-- Nessuno (evento generico) --\x3c/option>';
  prospects.forEach(p => {
    sel.innerHTML += `\x3coption value="${p.id}">${p.nome}\x3c/option>`;
  });
}

function openAddEventoGenerico() {
  editingEventoId = null;
  document.getElementById('modal-evento-title').textContent = 'Nuovo Evento';
  document.getElementById('ev-titolo').value = '';
  document.getElementById('ev-data').value = new Date().toISOString().split('T')[0];
  document.getElementById('ev-ora').value = '';
  document.getElementById('ev-tipo').value = 'follow_up';
  document.getElementById('ev-note').value = '';
  document.getElementById('btn-delete-evento').style.display = 'none';
  populateProspectSelect();
  openModal('modal-evento');
}

function openAddEventoData(dateStr) {
  editingEventoId = null;
  document.getElementById('modal-evento-title').textContent = 'Nuovo Evento';
  document.getElementById('ev-titolo').value = '';
  document.getElementById('ev-data').value = dateStr;
  document.getElementById('ev-ora').value = '';
  document.getElementById('ev-tipo').value = 'follow_up';
  document.getElementById('ev-note').value = '';
  document.getElementById('btn-delete-evento').style.display = 'none';
  populateProspectSelect();
  openModal('modal-evento');
}

function openAddEvento() {
  // Called from prospect detail ? pre-select current prospect
  openAddEventoGenerico();
  if (currentId) document.getElementById('ev-prospect').value = currentId;
}

function openEditEvento(id) {
  const e = allEventi.find(x => x.id === id);
  if (!e) return;
  editingEventoId = id;
  document.getElementById('modal-evento-title').textContent = 'Modifica Evento';
  document.getElementById('ev-titolo').value = e.titolo || '';
  document.getElementById('ev-data').value = e.data || '';
  document.getElementById('ev-ora').value = e.ora ? e.ora.slice(0,5) : '';
  document.getElementById('ev-tipo').value = e.tipo || 'follow_up';
  document.getElementById('ev-note').value = e.note || '';
  document.getElementById('btn-delete-evento').style.display = 'inline-flex';
  populateProspectSelect();
  document.getElementById('ev-prospect').value = e.prospect_id || '';
  openModal('modal-evento');
}

async function saveEvento() {
  const titolo = document.getElementById('ev-titolo').value.trim();
  const data = document.getElementById('ev-data').value;
  if (!titolo || !data) { alert('Titolo e data sono obbligatori'); return; }

  const payload = {
    titolo,
    data,
    ora: document.getElementById('ev-ora').value || null,
    tipo: document.getElementById('ev-tipo').value,
    note: document.getElementById('ev-note').value,
    prospect_id: document.getElementById('ev-prospect').value || null,
  };

  const btn = document.getElementById('btn-save-evento');
  btn.textContent = 'Salvataggio...'; btn.disabled = true;

  try {
    if (editingEventoId) {
      const {error} = await sb.from('eventi').update(payload).eq('id', editingEventoId);
      if (error) throw error;
      const i = allEventi.findIndex(x => x.id === editingEventoId);
      // reload to get prospect name
      const {data: row} = await sb.from('eventi').select('*, prospects(nome)').eq('id', editingEventoId).single();
      if (row) allEventi[i] = row;
      showToast('Evento aggiornato');
    } else {
      const {data: row, error} = await sb.from('eventi').insert(payload).select('*, prospects(nome)').single();
      if (error) throw error;
      allEventi.push(row);
      showToast('Evento salvato');
    }
    closeModal('modal-evento');
    renderCalendario();
  } catch(e) {
    showToast('Errore: ' + e.message, 'error');
  } finally {
    btn.textContent = 'Salva'; btn.disabled = false;
  }
}

async function deleteEvento() {
  if (!confirm('Eliminare questo evento?')) return;
  const {error} = await sb.from('eventi').delete().eq('id', editingEventoId);
  if (error) { showToast('Errore eliminazione', 'error'); return; }
  allEventi = allEventi.filter(x => x.id !== editingEventoId);
  showToast('Evento eliminato');
  closeModal('modal-evento');
  renderCalendario();
}

async function toggleEvento(id, current) {
  const {error} = await sb.from('eventi').update({completato: !current}).eq('id', id);
  if (error) { showToast('Errore', 'error'); return; }
  const e = allEventi.find(x => x.id === id);
  if (e) e.completato = !current;
  renderCalendario();
}


// -- DETAIL PANEL ------------------------------------------
function openDetailPanel(subKey) {
  const sub = MARKET[subKey];
  const detail = MARKET_DETAIL[subKey];
  if (!sub) return;

  document.getElementById('dp-title').textContent = sub.label;

  let html = '';

  // Base metrics
  html += `\x3cdiv class="detail-section">
    \x3cdiv class="detail-section-title">Benchmark principali\x3c/div>
    ${sub.metrics.map(m => `\x3cdiv class="kpi-detail-row">
      \x3cdiv class="kpi-detail-nome">${m.label}\x3c/div>
      \x3cdiv style="display:flex;gap:16px">
        \x3cspan style="font-size:12px;color:var(--gray)">${m.media} \x3cspan style="font-size:10px">media\x3c/span>\x3c/span>
        \x3cspan style="font-size:12px;color:var(--green);font-weight:600">${m.top} \x3cspan style="font-size:10px">top\x3c/span>\x3c/span>
      \x3c/div>
    \x3c/div>`).join('')}
  \x3c/div>`;

  if (!detail) {
    html += '\x3cdiv style="color:var(--gray);font-size:13px;padding:20px 0">Dati dettagliati non ancora disponibili per questo sottomercato.\x3c/div>';
    document.getElementById('dp-content').innerHTML = html;
    document.getElementById('detail-panel-overlay').classList.add('open');
    return;
  }

  // Ciclo vendita
  if (detail.ciclo_fasi) {
    html += `\x3cdiv class="detail-section">
      \x3cdiv class="detail-section-title">Fasi del ciclo di vendita\x3c/div>
      ${detail.ciclo_fasi.map(f => `\x3cdiv class="ciclo-item">
        \x3cdiv class="ciclo-fase">${f.fase}\x3c/div>
        \x3cdiv class="ciclo-durata">${f.durata}\x3c/div>
        \x3cdiv class="ciclo-note">${f.note}\x3c/div>
      \x3c/div>`).join('')}
    \x3c/div>`;
  }

  // Struttura commerciale
  if (detail.struttura_commerciale) {
    html += `\x3cdiv class="detail-section">
      \x3cdiv class="detail-section-title">Struttura commerciale tipica\x3c/div>
      \x3cdiv class="stagionalita-text">${detail.struttura_commerciale}\x3c/div>
    \x3c/div>`;
  }

  // Obiezioni
  if (detail.obiezioni) {
    html += `\x3cdiv class="detail-section">
      \x3cdiv class="detail-section-title">Obiezioni piu comuni\x3c/div>
      ${detail.obiezioni.map(o => `\x3cdiv class="obiezione-item">${o}\x3c/div>`).join('')}
    \x3c/div>`;
  }

  // Canali
  if (detail.canali) {
    html += `\x3cdiv class="detail-section">
      \x3cdiv class="detail-section-title">Canali di acquisizione (per efficacia)\x3c/div>
      ${[...detail.canali].sort((a,b) => b.efficacia - a.efficacia).map(c => `\x3cdiv class="canale-row">
        \x3cdiv class="canale-label">${c.nome}\x3c/div>
        \x3cdiv class="canale-bar-bg">\x3cdiv class="canale-bar-fill" style="width:${c.efficacia}%">\x3c/div>\x3c/div>
        \x3cdiv class="canale-pct">${c.efficacia}%\x3c/div>
      \x3c/div>`).join('')}
    \x3c/div>`;
  }

  // Stagionalit?
  if (detail.stagionalita) {
    html += `\x3cdiv class="detail-section">
      \x3cdiv class="detail-section-title">Stagionalita\x3c/div>
      \x3cdiv class="stagionalita-text">${detail.stagionalita}\x3c/div>
    \x3c/div>`;
  }

  // KPI
  if (detail.kpi) {
    html += `\x3cdiv class="detail-section">
      \x3cdiv class="detail-section-title">KPI chiave del settore\x3c/div>
      ${detail.kpi.map(k => `\x3cdiv class="kpi-detail-row">
        \x3cdiv class="kpi-detail-nome">${k.nome}\x3c/div>
        \x3cdiv class="kpi-detail-val">${k.benchmark}\x3c/div>
      \x3c/div>`).join('')}
    \x3c/div>`;
  }

  // Valore cliente
  if (detail.valore_cliente) {
    html += `\x3cdiv class="detail-section">
      \x3cdiv class="detail-section-title">Valore cliente annuo\x3c/div>
      \x3cdiv class="valore-badge">${detail.valore_cliente}\x3c/div>
    \x3c/div>`;
  }

  // Segnali di maturit?
  if (detail.maturita) {
    html += `\x3cdiv class="detail-section">
      \x3cdiv class="detail-section-title">Segnali di maturita commerciale\x3c/div>
      ${detail.maturita.map(m => `\x3cdiv class="maturita-item">
        \x3cdiv class="maturita-dot">\x3c/div>
        \x3cdiv>${m}\x3c/div>
      \x3c/div>`).join('')}
    \x3c/div>`;
  }

  // Add my data section
  html += renderMyBenchSection(subKey, sub);

  document.getElementById('dp-content').innerHTML = html;
  document.getElementById('detail-panel-overlay').classList.add('open');
}

function closeDetailPanel(e) {
  if (e.target === document.getElementById('detail-panel-overlay')) {
    document.getElementById('detail-panel-overlay').classList.remove('open');
  }
}

function closeDetailPanelDirect() {
  document.getElementById('detail-panel-overlay').classList.remove('open');
}

// -- BENCHMARK CUSTOM --------------------------------------
let benchmarkCache = {}; // key: settore_key, value: record

async function loadBenchmarkCustom() {
  const {data, error} = await sb.from('benchmark_custom').select('*');
  if (!error && data) {
    data.forEach(row => { benchmarkCache[row.settore_key] = row; });
  }
}

function renderMyBenchSection(subKey, subData) {
  const saved = benchmarkCache[subKey];
  const metrics = subData.metrics;

  // Comparison table if saved data exists
  let compareHtml = '';
  if (saved) {
    const comparisons = [];
    if (saved.ciclo_vendita_gg) {
      const ref = metrics.find(m => m.label.toLowerCase().includes('ciclo'));
      comparisons.push({ label: 'Ciclo vendita medio', ref: ref ? ref.media : '--', mine: saved.ciclo_vendita_gg + ' gg' });
    }
    if (saved.tasso_chiusura_pct) {
      const ref = metrics.find(m => m.label.toLowerCase().includes('chiusura'));
      comparisons.push({ label: 'Tasso di chiusura', ref: ref ? ref.media : '--', mine: saved.tasso_chiusura_pct + '%' });
    }
    if (saved.valore_cliente_medio) {
      comparisons.push({ label: 'Valore cliente medio', ref: '--', mine: saved.valore_cliente_medio });
    }

    if (comparisons.length) {
      compareHtml = `\x3cdiv style="margin-bottom:12px">
        \x3cdiv style="font-size:10px;color:var(--gray);letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px;display:flex;justify-content:space-between">
          \x3cspan>Metrica\x3c/span>
          \x3cdiv style="display:flex;gap:16px">\x3cspan>Benchmark\x3c/span>\x3cspan style="color:var(--gold)">Il tuo dato\x3c/span>\x3c/div>
        \x3c/div>
        ${comparisons.map(c => `\x3cdiv class="compare-row">
          \x3cdiv class="compare-label">${c.label}\x3c/div>
          \x3cdiv style="display:flex;gap:16px">
            \x3cdiv class="compare-ref">${c.ref}\x3c/div>
            \x3cdiv class="compare-mine">${c.mine}\x3c/div>
          \x3c/div>
        \x3c/div>`).join('')}
      \x3c/div>`;
    }
  }

  return `\x3cdiv class="my-bench-section">
    \x3cdiv class="my-bench-header">
      \x3cdiv class="my-bench-title">
        I miei dati di campo
        ${saved ? '\x3cspan class="my-bench-badge">AGGIORNATO\x3c/span>' : '\x3cspan style="font-size:10px;color:var(--gray);font-weight:400">nessun dato ancora\x3c/span>'}
      \x3c/div>
      \x3cbutton onclick="toggleMyBenchForm('${subKey}')" style="background:none;border:1px solid var(--border2);color:var(--gray);border-radius:4px;padding:3px 10px;font-size:10px;cursor:pointer;font-family:'DM Sans',sans-serif" id="toggle-bench-${subKey}">
        ${saved ? 'Modifica' : '+ Aggiungi'}
      \x3c/button>
    \x3c/div>
    ${compareHtml}
    \x3cdiv id="bench-form-${subKey}" style="display:none">
      \x3cdiv class="my-bench-grid">
        \x3cdiv class="my-bench-field">
          \x3clabel>Ciclo vendita che osservo (giorni)\x3c/label>
          \x3cinput type="number" id="bf-ciclo-${subKey}" placeholder="es. 45" value="${saved?.ciclo_vendita_gg || ''}">
        \x3c/div>
        \x3cdiv class="my-bench-field">
          \x3clabel>Mio tasso di chiusura (%)\x3c/label>
          \x3cinput type="number" id="bf-tasso-${subKey}" placeholder="es. 28" min="0" max="100" value="${saved?.tasso_chiusura_pct || ''}">
        \x3c/div>
        \x3cdiv class="my-bench-field">
          \x3clabel>Canale che funziona di piu per me\x3c/label>
          \x3cinput type="text" id="bf-canale-${subKey}" placeholder="es. LinkedIn outreach" value="${saved?.canale_top || ''}">
        \x3c/div>
        \x3cdiv class="my-bench-field">
          \x3clabel>Valore cliente medio che vedo\x3c/label>
          \x3cinput type="text" id="bf-valore-${subKey}" placeholder="es. 25k-60k EUR/anno" value="${saved?.valore_cliente_medio || ''}">
        \x3c/div>
        \x3cdiv class="my-bench-field full">
          \x3clabel>Obiezione piu frequente che incontro\x3c/label>
          \x3cinput type="text" id="bf-obiezione-${subKey}" placeholder='es. "Abbiamo gia qualcuno"' value="${saved?.obiezione_top || ''}">
        \x3c/div>
        \x3cdiv class="my-bench-field full">
          \x3clabel>Note di campo\x3c/label>
          \x3ctextarea id="bf-note-${subKey}" placeholder="Osservazioni, pattern che stai notando, differenze dal benchmark...">${saved?.note || ''}\x3c/textarea>
        \x3c/div>
      \x3c/div>
      \x3cbutton class="my-bench-save" onclick="saveMyBench('${subKey}')">Salva i miei dati\x3c/button>
    \x3c/div>
  \x3c/div>`;
}

function toggleMyBenchForm(subKey) {
  const form = document.getElementById('bench-form-' + subKey);
  const btn = document.getElementById('toggle-bench-' + subKey);
  if (form.style.display === 'none') {
    form.style.display = 'block';
    btn.textContent = 'Annulla';
  } else {
    form.style.display = 'none';
    const saved = benchmarkCache[subKey];
    btn.textContent = saved ? 'Modifica' : '+ Aggiungi';
  }
}

async function saveMyBench(subKey) {
  const payload = {
    settore_key: subKey,
    ciclo_vendita_gg: parseInt(document.getElementById('bf-ciclo-' + subKey)?.value) || null,
    tasso_chiusura_pct: parseInt(document.getElementById('bf-tasso-' + subKey)?.value) || null,
    canale_top: document.getElementById('bf-canale-' + subKey)?.value || null,
    valore_cliente_medio: document.getElementById('bf-valore-' + subKey)?.value || null,
    obiezione_top: document.getElementById('bf-obiezione-' + subKey)?.value || null,
    note: document.getElementById('bf-note-' + subKey)?.value || null,
    updated_at: new Date().toISOString(),
  };

  const existing = benchmarkCache[subKey];
  let error;

  if (existing) {
    ({ error } = await sb.from('benchmark_custom').update(payload).eq('settore_key', subKey));
  } else {
    const { data, error: err } = await sb.from('benchmark_custom').insert(payload).select().single();
    error = err;
    if (data) benchmarkCache[subKey] = data;
  }

  if (error) { showToast('Errore salvataggio: ' + error.message, 'error'); return; }

  // Reload from DB to get fresh data
  const { data: fresh } = await sb.from('benchmark_custom').select('*').eq('settore_key', subKey).single();
  if (fresh) benchmarkCache[subKey] = fresh;

  showToast('Dati salvati!');
  // Reopen detail panel to refresh view
  openDetailPanel(subKey);
}


// -- SCHEDA FINANZIARIA ------------------------------------
let currentFinTab = 'financials';

function switchFinTab(tab) {
  currentFinTab = tab;
  document.querySelectorAll('.fin-tab').forEach((t,i) => {
    const tabs = ['struttura','financials','commerciale','strategico','kpi'];
    t.classList.toggle('active', tabs[i] === tab);
  });
  document.querySelectorAll('.fin-pane').forEach(p => p.classList.remove('active'));
  document.getElementById('fin-pane-'+tab).classList.add('active');
  if (tab === 'kpi') {
    var p = prospects.find(function(x) { return x.id === currentId; });
    if (p) renderKpiTab(p);
  }
}

function fmt(val, prefix='', suffix='') {
  if (val === null || val === undefined || val === '') return '--';
  const n = parseFloat(val);
  if (isNaN(n)) return String(val);
  if (n >= 1000000) return prefix + (n/1000000).toFixed(1).replace('.0','') + 'M' + suffix;
  if (n >= 1000) return prefix + (n/1000).toFixed(0) + 'k' + suffix;
  return prefix + n.toFixed(0) + suffix;
}

function fmtBool(val) {
  if (val === null || val === undefined) return '--';
  return val ? 'Si' : 'No';
}

function renderFinancials(p) {
  var el = document.getElementById('fin-financials-content');
  if (!el) return;
  var hasFinData = p.fatturato_anno_1 || p.utile_netto || p.margine_pct;
  var fmtF = function(v, suf) { return (v != null && v !== '') ? Number(v).toLocaleString('it-IT') + (suf||'') : '\u2014'; };
  var fmtBoolF = function(v) { return v === true ? 'Si' : v === false ? 'No' : '\u2014'; };

  var kpiCards = hasFinData ?
    '<div class="fin-kpi-row">' +
      '<div class="fin-kpi-card"><div class="fin-kpi-label">Fatturato anno</div><div class="fin-kpi-val">' + fmtF(p.fatturato_anno_1,'\u20AC') + '</div></div>' +
      '<div class="fin-kpi-card"><div class="fin-kpi-label">Utile netto</div><div class="fin-kpi-val">' + fmtF(p.utile_netto,'\u20AC') + '</div>' + (p.margine_pct ? '<div class="fin-kpi-sub">Margine ' + p.margine_pct + '%</div>' : '') + '</div>' +
      '<div class="fin-kpi-card"><div class="fin-kpi-label">Costi fissi mensili</div><div class="fin-kpi-val">' + fmtF(p.costi_fissi_mensili,'\u20AC') + '</div>' + (p.costi_fissi_mensili ? '<div class="fin-kpi-sub">' + fmtF(p.costi_fissi_mensili*12,'\u20AC') + '/anno</div>' : '') + '</div>' +
    '</div>' : '';

  var hasExtra = p.immobili_proprieta != null || p.leasing_rata_mensile || p.banche_riferimento;
  var extraSection = hasExtra ?
    '<div class="fin-section-label" style="margin-top:16px">Patrimonio & Finanziamenti</div>' +
    '<div class="fin-rows">' +
      (p.immobili_proprieta != null ? '<div class="fin-row"><span class="fin-label">Immobili di proprieta</span><span class="fin-val">' + fmtBoolF(p.immobili_proprieta) + (p.immobili_valore ? ' \u00B7 ' + fmtF(p.immobili_valore,'\u20AC') : '') + '</span></div>' : '') +
      (p.leasing_rata_mensile ? '<div class="fin-row"><span class="fin-label">Leasing rata mensile</span><span class="fin-val">' + fmtF(p.leasing_rata_mensile,'\u20AC/mese') + (p.leasing_note ? ' \u2014 ' + p.leasing_note : '') + '</span></div>' : '') +
      (p.banche_riferimento ? '<div class="fin-row"><span class="fin-label">Banche di riferimento</span><span class="fin-val">' + p.banche_riferimento + '</span></div>' : '') +
    '</div>' : '';

  var emptyState = !hasFinData ? '<div class="fin-empty">Nessun dato finanziario. Usa la calcolatrice qui sotto per inserire i dati.</div>' : '';

  el.innerHTML =
    emptyState +
    kpiCards +
    extraSection +
    '<div class="fin-section-label" style="margin-top:' + (hasFinData||hasExtra?'20px':'0') + '">Calcolatrice P&L</div>' +
    '<div id="calcolatrice-container">' + buildCalcolatricePL() + '</div>' +
    '<div style="margin-top:10px"><button class="fin-edit-btn" onclick="openFinModal(\'extra\')">Modifica patrimonio & finanziamenti</button></div>';
  setTimeout(function() { if (typeof aggiornaCalcolatrice === 'function') aggiornaCalcolatrice(); }, 80);
}

function renderStruttura(p) {
  const hasData = p.dipendenti_diretti || p.collaboratori || p.forma_giuridica || p.anno_fondazione;
  if (!hasData) {
    document.getElementById('fin-struttura-content').innerHTML = `
      \x3cdiv class="no-data-msg">Nessun dato strutturale inserito\x3cspan>Clicca "Aggiungi" per completare\x3c/span>\x3c/div>
      \x3cdiv style="text-align:center">\x3cbutton class="fin-edit-btn" onclick="openFinModal('struttura')">+ Aggiungi dati strutturali\x3c/button>\x3c/div>`;
    return;
  }
  const hasTech = p.tool_crm || p.tool_erp || p.tool_ecommerce || p.tool_marketing || p.tool_altri;
  const fgLabel = FORME_GIURIDICHE[p.forma_giuridica]?.label || p.forma_giuridica || '--';

  document.getElementById('fin-struttura-content').innerHTML = `
    \x3cdiv class="fin-grid">
      \x3cdiv class="fin-kpi">
        \x3cdiv class="fin-kpi-label">Dipendenti diretti\x3c/div>
        \x3cdiv class="fin-kpi-val">${p.dipendenti_diretti || '--'}\x3c/div>
      \x3c/div>
      \x3cdiv class="fin-kpi">
        \x3cdiv class="fin-kpi-label">Collaboratori esterni\x3c/div>
        \x3cdiv class="fin-kpi-val">${p.collaboratori || '--'}\x3c/div>
      \x3c/div>
      \x3cdiv class="fin-kpi">
        \x3cdiv class="fin-kpi-label">Anno fondazione\x3c/div>
        \x3cdiv class="fin-kpi-val">${p.anno_fondazione || '--'}\x3c/div>
        \x3cdiv class="fin-kpi-sub">${p.anno_fondazione ? (new Date().getFullYear() - p.anno_fondazione) + ' anni' : ''}\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3cdiv class="fin-section-label">Dati societari\x3c/div>
    \x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">Forma giuridica\x3c/div>\x3cdiv class="fin-field-val">${fgLabel}\x3c/div>\x3c/div>
    \x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">Struttura proprietaria\x3c/div>\x3cdiv class="fin-field-val">${p.soci_struttura || '--'}\x3c/div>\x3c/div>
    ${p.codice_ateco ? `\x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">Codice ATECO\x3c/div>\x3cdiv class="fin-field-val">${p.codice_ateco}\x3c/div>\x3c/div>` : ''}
    ${p.sede_legale ? `\x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">Sede legale\x3c/div>\x3cdiv class="fin-field-val">${p.sede_legale}\x3c/div>\x3c/div>` : ''}

    ${hasTech ? `
    \x3cdiv class="fin-section-label" style="margin-top:14px"> Strumenti & Tech\x3c/div>
    ${p.tool_crm ? `\x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">CRM\x3c/div>\x3cdiv class="fin-field-val" style="color:var(--white)">${p.tool_crm}\x3c/div>\x3c/div>` : ''}
    ${p.tool_erp ? `\x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">Gestionale / ERP\x3c/div>\x3cdiv class="fin-field-val" style="color:var(--white)">${p.tool_erp}\x3c/div>\x3c/div>` : ''}
    ${p.tool_ecommerce ? `\x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">E-commerce\x3c/div>\x3cdiv class="fin-field-val" style="color:var(--white)">${p.tool_ecommerce}\x3c/div>\x3c/div>` : ''}
    ${p.tool_marketing ? `\x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">Marketing & comm.\x3c/div>\x3cdiv class="fin-field-val" style="color:var(--white)">${p.tool_marketing}\x3c/div>\x3c/div>` : ''}
    ${p.tool_altri ? `\x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">Altri strumenti\x3c/div>\x3cdiv class="fin-field-val" style="color:var(--white)">${p.tool_altri}\x3c/div>\x3c/div>` : ''}
    ` : `
    \x3cdiv style="margin-top:12px;font-size:11px;color:var(--gray2)">Nessuno strumento inserito -- aggiungili con Modifica\x3c/div>
    `}

    \x3cdiv style="text-align:right;margin-top:10px">\x3cbutton class="fin-edit-btn" onclick="openFinModal('struttura')">Modifica\x3c/button>\x3c/div>`;
}

function renderCommercialeData(p) {
  const el = document.getElementById('fin-commerciale-content');
  const profilo = PROFILI_COMMERCIALI[p.settore];
  const kpi = p.kpi_commerciali || {};
  const tipoInfo = profilo ? TIPO_CLIENTELA_LABELS[profilo.tipo_clientela] : null;

  // Header: tipo clientela badge
  let header = '';
  if (tipoInfo) {
    header = `\x3cdiv style="display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap">
      \x3cdiv style="display:inline-flex;align-items:center;gap:6px;background:var(--bg3);border:1px solid var(--border);border-radius:20px;padding:4px 12px;font-size:11px;color:${tipoInfo.color};font-weight:500">
        ${tipoInfo.icon} ${tipoInfo.label}
      \x3c/div>
      \x3cdiv style="font-size:11px;color:var(--gray)">KPI adattati al tipo di clientela\x3c/div>
    \x3c/div>`;
  }

  const hasKpiData = profilo && Object.keys(kpi).some(k => kpi[k] !== null && kpi[k] !== '');
  const hasBaseData = p.clienti_attivi || p.nuovi_clienti_anno || p.tasso_riacquisto_pct || p.fatturato_top3_pct;

  if (!hasKpiData && !hasBaseData) {
    el.innerHTML = header + `
      \x3cdiv class="no-data-msg">
        ${profilo ? `Profilo commerciale: \x3cstrong style="color:var(--white)">${tipoInfo?.label || profilo.tipo_clientela}\x3c/strong>` : 'Seleziona il settore per KPI personalizzati'}
        \x3cspan>Inserisci i dati per attivare la diagnosi commerciale\x3c/span>
      \x3c/div>
      \x3cdiv style="text-align:center">\x3cbutton class="fin-edit-btn" onclick="openFinModal('commerciale')">+ Inserisci dati commerciali\x3c/button>\x3c/div>`;
    return;
  }

  // Build KPI grid with color indicators
  function kpiCard(label, val, unita, soglie, note) {
    const ttIcon = note
      ? `\x3cspan class="tt-wrap" style="flex-shrink:0">\x3cspan class="tt-icon">?\x3c/span>\x3cspan class="tt-bubble">${note}\x3c/span>\x3c/span>`
      : '';
    if (val === null || val === undefined || val === '') {
      return `\x3cdiv class="fin-kpi" style="opacity:.5">
        \x3cdiv class="fin-kpi-label" style="display:flex;align-items:center;justify-content:space-between;gap:4px">
          \x3cspan>${label}\x3c/span>${ttIcon}
        \x3c/div>
        \x3cdiv class="fin-kpi-val" style="color:var(--gray2)">--\x3c/div>
      \x3c/div>`;
    }
    const livello = soglie ? getSogliaColor(val, soglie) : null;
    const sc = livello ? SOGLIA_COLORS[livello] : null;
    const displayVal = unita === '%' ? val + '%' : unita === 'EUR' ? fmt(val,'EUR') : val + (unita && unita !== 'n.' && unita !== '' ? ' ' + unita : '');
    return `\x3cdiv class="fin-kpi" style="${sc ? 'border-color:'+sc.border+';background:'+sc.bg+';' : ''}">
      \x3cdiv class="fin-kpi-label" style="display:flex;align-items:center;justify-content:space-between;gap:4px">
        \x3cspan>${label}\x3c/span>
        \x3cspan style="display:flex;align-items:center;gap:4px">
          ${ttIcon}
          ${sc ? `\x3cspan style="color:${sc.text};font-size:12px">${sc.icon}\x3c/span>` : ''}
        \x3c/span>
      \x3c/div>
      \x3cdiv class="fin-kpi-val" style="color:${sc ? sc.text : 'var(--white)'}">
        ${displayVal}
      \x3c/div>
    \x3c/div>`;
  }

  // Build KPI cards from profilo or fallback
  let kpiGrid = '';
  if (profilo) {
    const kpiDefs = profilo.kpi;

    // Filtra: mostra opzionali solo se hanno un valore inserito
    const kpiVisibili = kpiDefs.filter(k => {
      if (!k.opzionale) return true; // obbligatori sempre visibili
      const v = kpi[k.id];
      return v !== null && v !== undefined && v !== '';
    });

    // Per i KPI opzionali vuoti: non penalizzare con rosso ? non mostrare
    // Per i KPI non opzionali vuoti: mostrare come "?" senza colore
    function kpiCardContextual(k) {
      const v = kpi[k.id] ?? null;
      if (k.opzionale && (v === null || v === '')) return ''; // non mostrare
      return kpiCard(k.label, v, k.unita, k.soglie, k.note);
    }

    // Divide in righe da 3
    const chunks = [];
    for (let i = 0; i < kpiVisibili.length; i += 3) chunks.push(kpiVisibili.slice(i, i+3));
    kpiGrid = chunks.map(row =>
      `\x3cdiv class="fin-grid" style="margin-bottom:12px">${row.map(k => kpiCardContextual(k)).join('')}\x3c/div>`
    ).join('');
  } else {
    // Fallback generico
    const fatPerCliente = (p.fatturato_anno_1 && p.clienti_attivi) ? fmt(p.fatturato_anno_1/p.clienti_attivi,'EUR') : null;
    kpiGrid = `\x3cdiv class="fin-grid" style="margin-bottom:12px">
      ${kpiCard('Clienti attivi', p.clienti_attivi, 'n.', null, fatPerCliente ? 'Media/cliente: '+fatPerCliente : null)}
      ${kpiCard('Nuovi clienti/anno', p.nuovi_clienti_anno, 'n.', null, null)}
      ${kpiCard('Tasso riacquisto', p.tasso_riacquisto_pct, '%', {verde:[70,100],giallo:[50,69],rosso:[0,49]}, null)}
      ${kpiCard('% top 3 clienti', p.fatturato_top3_pct, '%', {verde:[0,40],giallo:[41,60],rosso:[61,100]}, null)}
    \x3c/div>`;
  }

  // Cross-check fatturato ? valore medio ? volume (se dati disponibili)
  let crossCheckHtml = '';
  const fatturato = p.fatturato_anno_1;
  const kpiObj = p.kpi_commerciali || {};
  const valMedio = kpiObj.valore_medio_ordine || kpiObj.scontrino_medio || kpiObj.valore_medio_commessa || kpiObj.acv || kpiObj.valore_medio_progetto || kpiObj.prezzo_medio_vendita || kpiObj.ticket_medio_anno;
  const volGiorno = kpiObj.clienti_giornalieri || kpiObj.ordini_giornalieri || kpiObj.transazioni_mese;

  if (fatturato && valMedio && valMedio > 0) {
    const ggLavorativi = 250;
    const transazioniImplicite = Math.round(fatturato / valMedio);
    const perGiorno = (transazioniImplicite / ggLavorativi).toFixed(1);
    const coerente = volGiorno ? Math.abs(parseFloat(perGiorno) - parseFloat(volGiorno)) / parseFloat(volGiorno) < 0.4 : null;
    crossCheckHtml = `\x3cdiv style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--rs);padding:10px 14px;margin-bottom:12px">
      \x3cdiv style="font-size:10px;font-weight:600;color:var(--gray);letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px"> Coerenza fatturato x valore transazione\x3c/div>
      \x3cdiv style="font-size:12px;color:var(--white);line-height:1.7">
        \x3cspan style="color:var(--gold)">${fmt(fatturato,'EUR')}\x3c/span> ÷ \x3cspan style="color:var(--gold)">${fmt(valMedio,'EUR')}\x3c/span> = 
        \x3cspan style="font-weight:600;color:var(--white)">${transazioniImplicite.toLocaleString('it-IT')} transazioni/anno\x3c/span>
        -> \x3cspan style="color:var(--white)">${perGiorno} al giorno\x3c/span>
        ${coerente !== null
          ? coerente
            ? `\x3cspan style="color:var(--green);margin-left:6px">v coerente con i dati inseriti\x3c/span>`
            : `\x3cspan style="color:var(--gold);margin-left:6px">! scostamento rilevante -- verificare\x3c/span>`
          : `\x3cspan style="color:var(--gray2);margin-left:6px;font-size:11px">inserisci volume giornaliero per verifica\x3c/span>`}
      \x3c/div>
    \x3c/div>`;
  }

  // Diagnosi legami
  let diagnosiHtml = '';
  if (profilo && profilo.diagnosi_legami) {
    const allVals = { ...kpi, clienti_attivi: p.clienti_attivi, tasso_riacquisto: p.tasso_riacquisto_pct, nuovi_clienti_anno: p.nuovi_clienti_anno, fatturato_top3_pct: p.fatturato_top3_pct };
    const problemi = profilo.diagnosi_legami.filter(d => {
      try { return d.condizione(allVals); } catch(e) { return false; }
    });
    if (problemi.length) {
      diagnosiHtml = `\x3cdiv style="margin-top:12px">
        \x3cdiv style="font-size:10px;font-weight:600;color:var(--white);letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px"> Diagnosi -- Legami tra i dati\x3c/div>
        ${problemi.map(d => {
          const sc = SOGLIA_COLORS[d.livello] || SOGLIA_COLORS.giallo;
          return `\x3cdiv style="border-left:3px solid ${sc.border};background:${sc.bg};border-radius:0 var(--rs) var(--rs) 0;padding:10px 14px;margin-bottom:8px">
            \x3cdiv style="font-size:12px;font-weight:600;color:${sc.text};margin-bottom:4px">${d.label}\x3c/div>
            \x3cdiv style="font-size:11px;color:var(--gray);line-height:1.5">${d.desc}\x3c/div>
          \x3c/div>`;
        }).join('')}
      \x3c/div>`;
    } else if (Object.keys(kpi).some(k => kpi[k] !== null && kpi[k] !== '')) {
      diagnosiHtml = `\x3cdiv style="margin-top:12px;background:var(--green-bg);border:1px solid var(--green);border-radius:var(--rs);padding:10px 14px">
        \x3cdiv style="font-size:12px;color:var(--green);font-weight:500">v Nessuna criticita rilevata dai dati inseriti\x3c/div>
      \x3c/div>`;
    }
  }

  el.innerHTML = header + crossCheckHtml + kpiGrid + diagnosiHtml +
    `\x3cdiv style="text-align:right;margin-top:12px">\x3cbutton class="fin-edit-btn" onclick="openFinModal('commerciale')">Modifica dati commerciali\x3c/button>\x3c/div>`;
}

function renderStrategico(p) {
  const hasData = p.export_attivo !== null || p.certificazioni || p.note_strategiche;
  if (!hasData) {
    document.getElementById('fin-strategico-content').innerHTML = `
      \x3cdiv class="no-data-msg">Nessun dato strategico inserito\x3cspan>Clicca "Aggiungi" per completare\x3c/span>\x3c/div>
      \x3cdiv style="text-align:center">\x3cbutton class="fin-edit-btn" onclick="openFinModal('strategico')">+ Aggiungi dati strategici\x3c/button>\x3c/div>`;
    return;
  }
  document.getElementById('fin-strategico-content').innerHTML = `
    \x3cdiv class="fin-grid-2">
      \x3cdiv class="fin-kpi">
        \x3cdiv class="fin-kpi-label">Export attivo\x3c/div>
        \x3cdiv class="fin-kpi-val">${fmtBool(p.export_attivo)}\x3c/div>
        \x3cdiv class="fin-kpi-sub">${p.export_pct ? p.export_pct+'% del fatturato' : ''}\x3c/div>
      \x3c/div>
      \x3cdiv class="fin-kpi">
        \x3cdiv class="fin-kpi-label">Certificazioni\x3c/div>
        \x3cdiv class="fin-kpi-val" style="font-size:14px">${p.certificazioni || '--'}\x3c/div>
      \x3c/div>
    \x3c/div>
    ${p.note_strategiche ? `
    \x3cdiv class="fin-section-label">Note strategiche\x3c/div>
    \x3cdiv style="font-size:13px;color:var(--gray);line-height:1.6;background:var(--bg3);border-radius:var(--rs);padding:12px 14px">${p.note_strategiche}\x3c/div>` : ''}
    \x3cdiv style="text-align:right">\x3cbutton class="fin-edit-btn" onclick="openFinModal('strategico')">Modifica\x3c/button>\x3c/div>`;
}

function renderKpiTab(p) {
  var container = document.getElementById('fin-kpi-content');
  if (!container) return;
  var kpi = p.kpi_commerciali || {};
  var settore = p.settore || '';

  var KPI_BASE = [
    { id: 'tasso_conversione_pct', label: 'Tasso conversione lead\u2192cliente', unita: '%' },
    { id: 'ciclo_vendita_gg', label: 'Ciclo di vendita medio', unita: 'gg' },
    { id: 'valore_medio_ordine', label: 'Valore medio ordine/contratto', unita: '\u20AC' },
    { id: 'concentrazione_top3_pct', label: 'Concentrazione top 3 clienti', unita: '%' },
    { id: 'tasso_riacquisto_pct', label: 'Tasso di riacquisto', unita: '%' },
    { id: 'nuovi_clienti_anno', label: 'Nuovi clienti / anno', unita: 'n' },
    { id: 'clienti_attivi', label: 'Clienti attivi totali', unita: 'n' },
    { id: 'fatturato_referral_pct', label: '% fatturato da referral', unita: '%' },
    { id: 'cac', label: 'CAC \u2014 Costo acquisizione cliente', unita: '\u20AC' },
    { id: 'dso_gg', label: 'DSO \u2014 Giorni medi incasso', unita: 'gg' },
  ];
  var KPI_ARR = { id: 'arr', label: 'ARR \u2014 Fatturato ricorrente annuale', unita: '\u20AC' };
  var IS_RETAIL = ['commercio_ricambi_auto','commercio_elettronica','commercio_abbigliamento_dettaglio','commercio_orologi_gioielli','alimentare_forno'].indexOf(settore) >= 0;
  var HAS_ARR = ['edilizia_impianti','commercio_auto_moto_nuovo','commercio_auto_moto_usato','alimentare_vini','alimentare_birra','tech_saas','tech_system_integrator','tech_digital_agency','tech_automazione','servizi_it','servizi_formazione'].indexOf(settore) >= 0;
  var KPI_LIST = IS_RETAIL
    ? KPI_BASE.filter(function(k) { return ['ciclo_vendita_gg','concentrazione_top3_pct'].indexOf(k.id) < 0; })
    : KPI_BASE.slice();
  if (HAS_ARR) KPI_LIST.push(KPI_ARR);
  if (settore === 'commercio_auto_moto_usato') {
    KPI_LIST = [
      { id: 'tasso_conversione_pct', label: 'Tasso conversione lead\u2192contratto', unita: '%' },
      { id: 'ciclo_vendita_gg', label: 'Ciclo di vendita medio', unita: 'gg' },
      { id: 'valore_medio_ordine', label: 'Valore medio veicolo venduto', unita: '\u20AC' },
      { id: 'tasso_riacquisto_pct', label: 'Tasso di riacquisto', unita: '%' },
      { id: 'nuovi_clienti_anno', label: 'Nuovi clienti / anno', unita: 'n' },
      { id: 'cac', label: 'CAC \u2014 Costo acquisizione cliente', unita: '\u20AC' },
      { id: 'contratti_anno', label: 'Contratti vendita / anno', unita: 'n' },
      { id: 'rotazione_veicoli_gg', label: 'Rotazione media veicoli', unita: 'gg' },
      { id: 'costo_ripristino_medio', label: 'Costo medio ripristino veicolo', unita: '\u20AC' },
    ];
  }
  var rows = KPI_LIST.map(function(k) {
    var val = kpi[k.id];
    var hasVal = val !== null && val !== undefined && val !== '';
    return '<div class="kpi-edit-row">' +
      '<label class="kpi-edit-label">' + k.label + '</label>' +
      '<div class="kpi-edit-input-wrap">' +
        '<input class="form-input kpi-edit-input" type="number" step="0.1" id="kpiedit-' + k.id + '" value="' + (hasVal ? val : '') + '" placeholder="\u2014">' +
        '<span class="kpi-edit-unit">' + k.unita + '</span>' +
      '</div>' +
    '</div>';
  }).join('');
  container.innerHTML =
    '<div style="padding:16px 20px">' +
      '<div class="fin-section-label">KPI Commerciali</div>' +
      '<p style="font-size:12px;color:var(--gray);margin-bottom:16px">Inserisci i valori reali del cliente. Vengono usati per il confronto con i benchmark di settore.</p>' +
      '<div class="kpi-edit-grid">' + rows + '</div>' +
      '<button class="btn btn-primary" style="margin-top:16px" onclick="saveKpiTab()">Salva KPI</button>' +
    '</div>';
}

async function saveKpiTab() {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;
  var settore = p.settore || '';
  var IS_RETAIL = ['commercio_ricambi_auto','commercio_elettronica','commercio_abbigliamento_dettaglio','commercio_orologi_gioielli','alimentare_forno'].indexOf(settore) >= 0;
  var HAS_ARR = ['edilizia_impianti','commercio_auto_moto_nuovo','commercio_auto_moto_usato','alimentare_vini','alimentare_birra','tech_saas','tech_system_integrator','tech_digital_agency','tech_automazione','servizi_it','servizi_formazione'].indexOf(settore) >= 0;
  var KPI_IDS = ['tasso_conversione_pct','valore_medio_ordine','tasso_riacquisto_pct',
    'nuovi_clienti_anno','clienti_attivi','fatturato_referral_pct','cac','dso_gg'];
  if (!IS_RETAIL) KPI_IDS.splice(1, 0, 'ciclo_vendita_gg', 'concentrazione_top3_pct');
  if (HAS_ARR) KPI_IDS.push('arr');
  if (settore === 'commercio_auto_moto_usato') {
    KPI_IDS = ['tasso_conversione_pct','ciclo_vendita_gg','valore_medio_ordine',
      'tasso_riacquisto_pct','nuovi_clienti_anno','cac',
      'contratti_anno','rotazione_veicoli_gg','costo_ripristino_medio'];
  }
  var kpi_commerciali = {};
  KPI_IDS.forEach(function(id) {
    var el = document.getElementById('kpiedit-'+id);
    if (el) {
      var val = parseFloat(el.value);
      kpi_commerciali[id] = isNaN(val) ? null : val;
    }
  });
  p.kpi_commerciali = kpi_commerciali;
  var res = await sb.from('prospects').update({ kpi_commerciali: kpi_commerciali }).eq('id', p.id);
  if (res.error) { showToast('Errore: ' + res.error.message, 'error'); return; }
  showToast('KPI salvati');
  renderProspectDetail(p.id);
}

const FIN_FORMS = {
  financials: {
    title: 'Dati Finanziari',
    fields: [],
    bools: [],
    extra: 'calcolatrice'
  },
  struttura: {
    title: 'Struttura Aziendale',
    fields: [
      { id:'forma_giuridica', label:'Forma giuridica', fmt:'forma_giuridica',
        tt:`La forma legale: Srl, ditta individuale, forfettario, Snc ecc. Determina aliquote fiscali, responsabilita personale e possibilita di crescita.` },
      { id:'anno_fondazione', label:'Anno di fondazione', fmt:'year',
        tt:`Anno di costituzione ufficiale. Indica maturita e storia commerciale.` },
      { id:'soci_struttura', label:'Struttura proprietaria / soci', fmt:'text', placeholder:'es. Famiglia Rossi 60%, Soci di minoranza 40%',
        tt:`Chi possiede la societa e in che quota percentuale. Utile per capire i centri di potere e i potenziali conflitti tra soci.` },
      { id:'dipendenti_diretti', label:'Dipendenti diretti (full time)', fmt:'int',
        tt:`Il numero di persone assunte a tempo indeterminato o determinato con contratto diretto. NON includere agenti, consulenti o co.co.co.` },
      { id:'collaboratori', label:'Collaboratori / part-time / esterni', fmt:'int',
        tt:`Agenti, consulenti, part-time, co.co.co., P.IVA che lavorano stabilmente ma senza contratto diretto.` },
      { id:'banche_riferimento', label:'Banche di riferimento', fmt:'text', placeholder:'es. Intesa SP, UniCredit, BCC locale',
        tt:`Banche con cui opera la societa (conto, fido, mutui). Avere una sola banca e un rischio -- meglio diversificare.` },
      { id:'codice_ateco', label:'Codice ATECO principale', fmt:'text', placeholder:'es. 46.69.09 -- Commercio ingrosso',
        tt:`Codice attivita economica principale -- visura camerale o P.IVA. Determina aliquote INAIL e alcune agevolazioni fiscali.` },
      { id:'codice_fiscale', label:'P.IVA / Codice Fiscale', fmt:'text', placeholder:'es. IT12345678901',
        tt:`La Partita IVA aziendale (11 cifre) o il codice fiscale se e una ditta individuale. Serve per verifiche su Registro Imprese e banche dati.` },
      { id:'sede_legale', label:'Sede legale', fmt:'text', placeholder:'es. Via Roma 1, 20121 Milano',
        tt:`Indirizzo ufficiale al Registro Imprese. Puo differire dalla sede operativa.` },
      { id:'sito_web', label:'Sito web', fmt:'text', placeholder:'es. https://www.azienda.it',
        tt:`Il sito web aziendale. Utile per valutare la presenza online prima della prima call.` },
      { id:'tool_crm', label:'CRM in uso', fmt:'text', placeholder:'es. HubSpot, Pipedrive, Salesforce, Excel, nessuno',
        tt:`Il CRM che usano per gestire clienti e trattative. Se rispondono "Excel" o "niente" e gia un gap importante.` },
      { id:'tool_erp', label:'Gestionale / ERP', fmt:'text', placeholder:'es. Zucchetti, TeamSystem, SAP, Danea, nessuno',
        tt:`Il software gestionale per contabilita, magazzino, fatturazione. Indica il livello di digitalizzazione operativa.` },
      { id:'tool_ecommerce', label:'E-commerce / sito vendita', fmt:'text', placeholder:'es. Shopify, WooCommerce, Amazon, nessuno',
        tt:`Piattaforma e-commerce o marketplace usati per vendere online.` },
      { id:'tool_marketing', label:'Marketing & comunicazione', fmt:'text', placeholder:'es. Mailchimp, ActiveCampaign, Meta Ads, nessuno',
        tt:`Strumenti per email marketing, social, advertising. Indica se hanno una struttura di marketing digitale.` },
      { id:'tool_altri', label:'Altri strumenti rilevanti', fmt:'text', placeholder:'es. Fatture in Cloud, Trello, WhatsApp Business',
        tt:`Qualsiasi altro software o strumento che usano regolarmente nel business.` },
    ],
    bools: [
      { id:'export_attivo', label:'Attivita export attiva',
        tt:`Attiva se la societa esporta fuori dall'Italia, anche occasionalmente.` },
    ]
  },
  commerciale: {
    title: 'Dati Commerciali',
    fields: [], // generato dinamicamente in openFinModal
    bools: [],
    extra: 'commerciale_dinamico'
  },
  strategico: {
    title: 'Dati Strategici',
    fields: [
      { id:'export_pct', label:'% fatturato da export', fmt:'pct',
        tt:`Percentuale del fatturato da clienti esteri. Alta quota export diversifica il rischio ma richiede strutture commerciali dedicate.` },
      { id:'certificazioni', label:'Certificazioni (ISO, BIO, ecc.)', fmt:'text', placeholder:'es. ISO 9001, ISO 14001',
        tt:`Le certificazioni di qualita, ambientali o di settore ottenute. Sono leve commerciali importanti: ISO 9001 (qualita), ISO 14001 (ambiente), BRC/IFS (food), IATF (automotive), CE, BIO ecc.` },
      { id:'note_strategiche', label:'Note strategiche', fmt:'textarea', placeholder:'Punti di forza, debolezze, opportunita, minacce...',
        tt:`Il tuo spazio libero per annotare tutto cio che non rientra nelle altre categorie: punti di forza e debolezza, opportunita di mercato, rischi, osservazioni sulla concorrenza, note personali sul titolare.` },
    ],
    bools: [{ id:'export_attivo', label:'Export attivo',
      tt:`Attiva se la societa esporta fuori dall'Italia.` }]
  },
  extra: {
    title: 'Patrimonio & Finanziamenti',
    fields: [
      { id:'immobili_valore', label:'Valore immobili di proprieta', fmt:'euro' },
      { id:'leasing_rata_mensile', label:'Rata mensile totale leasing/finanz.', fmt:'euro' },
      { id:'leasing_note', label:'Note leasing/finanziamenti', fmt:'text', placeholder:'es. Auto aziendale + macchinario' },
      { id:'banche_riferimento', label:'Banche di riferimento', fmt:'text', placeholder:'es. Intesa, UniCredit' },
    ],
    bools: [{ id:'immobili_proprieta', label:'Immobili di proprieta' }],
    extra: null
  },
  financials_manual: {
    title: 'Dati Finanziari (manuale)',
    fields: [
      { id:'fatturato_anno_1', label:'Fatturato anno corrente', fmt:'euro' },
      { id:'utile_netto', label:'Utile netto', fmt:'euro' },
      { id:'margine_pct', label:'Margine %', fmt:'pct' },
      { id:'costi_fissi_mensili', label:'Costi fissi mensili', fmt:'euro' },
    ],
    bools: [],
    extra: null
  },
};

function renderCronistoria(p) {
  const card = document.getElementById('card-cronistoria');
  const container = document.getElementById('cronistoria-content');
  if (!card || !container) return;
  const history = p.score_history || [];
  if (history.length === 0) { card.style.display = 'none'; return; }
  card.style.display = 'block';
  container.innerHTML = _buildCronistoria(p);
}

function openFinModal(tab) {
  const p = prospects.find(x => x.id === currentId);
  if (!p) return;
  const cfg = FIN_FORMS[tab];
  document.getElementById('modal-fin-title').textContent = cfg.title;

  let html = '\x3cdiv class="form-grid">';
  cfg.fields.forEach(f => {
    const val = p[f.id] !== null && p[f.id] !== undefined ? p[f.id] : '';
    html += buildFinField(f, val);
  });
  if (cfg.bools.length) {
    cfg.bools.forEach(b => {
      const checked = p[b.id] ? 'checked' : '';
      html += `\x3cdiv class="form-group full" style="flex-direction:row;align-items:center;gap:10px">
        \x3cinput type="checkbox" id="fin-${b.id}" ${checked} style="width:16px;height:16px;accent-color:var(--gold)">
        \x3clabel style="font-size:13px;color:var(--white);text-transform:none;letter-spacing:0">${b.label}\x3c/label>\x3c/div>`;
    });
  }
  html += '\x3c/div>';
  // Inject calcolatrice P&L for financials tab
  if (cfg.extra === 'calcolatrice') {
    html += buildCalcolatricePL();
  }
  if (cfg.extra === 'commerciale_dinamico') {
    html = buildCommercialeForm(p);
  }
  html += `\x3cinput type="hidden" id="fin-current-tab" value="${tab}">`;
  document.getElementById('modal-fin-body').innerHTML = html;
  openModal('modal-financials');
  if (cfg.extra === 'calcolatrice') setTimeout(aggiornaCalcolatrice, 80);
  if (tab === 'struttura') setTimeout(() => {
    const formaEl = document.getElementById('fin-forma_giuridica');
    if (formaEl?.value) aggiornaSchemaFiscale(formaEl.value);
  }, 80);
}

async function saveFinancials() {
  const p = prospects.find(x => x.id === currentId);
  if (!p) return;
  const tab = document.getElementById('fin-current-tab').value;
  if (tab === 'commerciale') { await saveCommercialeForm(); return; }
  const cfg = FIN_FORMS[tab];

  const updates = {};
  cfg.fields.forEach(f => {
    const el = document.getElementById('fin-' + f.id);
    if (!el) return;
    if (f.readonly) return; // campo calcolato, non salvare
    const val = el.value.trim();
    if (f.fmt === 'euro' || f.fmt === 'pct') {
      updates[f.id] = val !== '' ? parseFloat(val) : null;
    } else if (f.fmt === 'int' || f.fmt === 'year') {
      updates[f.id] = val !== '' ? parseInt(val) : null;
    } else {
      updates[f.id] = val !== '' ? val : null;
    }
  });
  cfg.bools.forEach(b => {
    const el = document.getElementById('fin-' + b.id);
    if (el) updates[b.id] = el.checked;
  });

  const btn = document.getElementById('btn-save-fin');
  btn.textContent = 'Salvataggio...'; btn.disabled = true;

  try {
    const {error} = await sb.from('prospects').update(updates).eq('id', currentId);
    if (error) throw error;
    const i = prospects.findIndex(x => x.id === currentId);
    prospects[i] = {...prospects[i], ...updates};

    // Auto-calcolo EBITDA dai dati finanziari inseriti
    // Priorità: ebitda esplicito > calcolo da cogs + costi fissi > stima da utile netto
    const pi = prospects[i];
    // Ricalcola EBITDA se la calcolatrice P&L ha dati (cogs + costi fissi)
    // oppure se ebitda non è ancora compilato ma ci sono dati sufficienti
    const hasPLData = pi.costi_fissi_mensili && pi.fatturato_anno_1 && (pi.cogs_pct || pi.cogs_val);
    if (pi.fatturato_anno_1 && (!pi.ebitda || hasPLData)) {
      let ebitdaCalcolato = null;
      if (hasPLData) {
        const cogs = pi.cogs_val > 0 ? pi.cogs_val : pi.fatturato_anno_1 * pi.cogs_pct / 100;
        const margineLordo = pi.fatturato_anno_1 - cogs;
        ebitdaCalcolato = Math.round((margineLordo - pi.costi_fissi_mensili * 12) / 1000) * 1000;
      } else if (pi.utile_netto && pi.fatturato_anno_1) {
        // Stima EBITDA: utile netto + ~4% ammortamenti tipici PMI
        ebitdaCalcolato = Math.round((pi.utile_netto + pi.fatturato_anno_1 * 0.04) / 1000) * 1000;
      } else if (pi.margine_pct && pi.fatturato_anno_1) {
        ebitdaCalcolato = Math.round(pi.fatturato_anno_1 * pi.margine_pct / 100 / 1000) * 1000;
      }
      if (ebitdaCalcolato !== null && ebitdaCalcolato > 0) {
        prospects[i].ebitda = ebitdaCalcolato;
        await sb.from('prospects').update({ebitda: ebitdaCalcolato}).eq('id', currentId);
      }
    }

    // Se fatturato_anno_1 aggiornato → aggiorna anche la fascia stimata
    if (updates.fatturato_anno_1) {
      const nuovaFascia = _fasciaFromAnno1(updates.fatturato_anno_1);
      if (nuovaFascia && prospects[i].fatturato !== nuovaFascia) {
        prospects[i].fatturato = nuovaFascia;
        await sb.from('prospects').update({fatturato: nuovaFascia}).eq('id', currentId);
        renderProspectDetail(currentId);
      }
    }
    showToast('Dati salvati');
    closeModal('modal-financials');
    renderFinancials(prospects[i]);
    renderStruttura(prospects[i]);
    renderCommercialeData(prospects[i]);
    renderStrategico(prospects[i]);
    renderCronistoria(prospects[i]);
  } catch(e) {
    showToast('Errore: ' + e.message, 'error');
  } finally {
    btn.textContent = 'Salva'; btn.disabled = false;
  }
}


// -- RADAR CHART + TARGETS ---------------------------------

function drawRadar(dims_vals, targets_vals, settore) {
  const svg = document.getElementById('radar-svg');
  if (!svg) return;
  const cx = 180, cy = 180, r = 110;
  const n = DIMS.length;
  const labels = DIMS.map(d => getDimLabel(settore, d.id));
  const angles = DIMS.map((_, i) => (Math.PI * 2 * i / n) - Math.PI / 2);

  // Helper: point on circle
  const pt = (val, angle, scale=1) => {
    const v = (val / 5) * r * scale;
    return [cx + v * Math.cos(angle), cy + v * Math.sin(angle)];
  };

  let html = '';

  // Grid rings (5 levels)
  for (let ring = 1; ring <= 5; ring++) {
    const pts = angles.map(a => pt(ring, a)).map(p => p.join(',')).join(' ');
    html += `\x3cpolygon points="${pts}" fill="none" stroke="var(--border)" stroke-width="${ring===5?1.5:0.8}" opacity="0.6"/>`;
  }

  // Axes
  angles.forEach((a, i) => {
    const [x2, y2] = pt(5, a);
    html += `\x3cline x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="var(--border2)" stroke-width="1"/>`;
  });

  // Target polygon (dashed gold)
  if (targets_vals && Object.keys(targets_vals).length) {
    const tpts = DIMS.map((d, i) => {
      const v = targets_vals[d.id] || 0;
      return pt(v, angles[i]).join(',');
    }).join(' ');
    html += `\x3cpolygon points="${tpts}" fill="rgba(201,151,58,.08)" stroke="#C9973A" stroke-width="1.5" stroke-dasharray="5,3"/>`;
    // Target dots
    DIMS.forEach((d, i) => {
      const v = targets_vals[d.id] || 0;
      if (!v) return;
      const [x, y] = pt(v, angles[i]);
      html += `\x3ccircle cx="${x}" cy="${y}" r="4" fill="#C9973A" stroke="var(--bg2)" stroke-width="1.5"/>`;
    });
  }

  // Current polygon (green)
  const cpts = DIMS.map((d, i) => {
    const v = dims_vals[d.id] || 0;
    return pt(v, angles[i]).join(',');
  }).join(' ');
  html += `\x3cpolygon points="${cpts}" fill="rgba(74,154,106,.25)" stroke="#4A9A6A" stroke-width="2"/>`;
  // Current dots
  DIMS.forEach((d, i) => {
    const v = dims_vals[d.id] || 0;
    const [x, y] = pt(v, angles[i]);
    html += `\x3ccircle cx="${x}" cy="${y}" r="4" fill="#4A9A6A" stroke="var(--bg2)" stroke-width="1.5"/>`;
  });

  // Labels ? split long labels on 2 lines, font-size 8
  DIMS.forEach((d, i) => {
    const [lx, ly] = pt(6.5, angles[i]);
    const anchor = lx < cx - 8 ? 'end' : lx > cx + 8 ? 'start' : 'middle';
    let lines;
    const _lbl = getDimLabel(settore, d.id);
    if (_lbl.includes(' & ')) {
      lines = _lbl.split(' & ');
    } else if (_lbl.length > 10) {
      const mid = _lbl.lastIndexOf(' ', 12);
      lines = mid > 0 ? [_lbl.slice(0, mid), _lbl.slice(mid+1)] : [_lbl];
    } else {
      lines = [_lbl];
    }
    const lineH = 9;
    const startY = ly - ((lines.length - 1) * lineH / 2);
    lines.forEach((line, li) => {
      html += `\x3ctext x="${lx}" y="${startY + li * lineH}" text-anchor="${anchor}" font-size="8" fill="var(--gray)" font-family="DM Sans,sans-serif" font-weight="500">${line}\x3c/text>`;
    });
  });

  svg.innerHTML = html;
}

// Recupera l'azione predefinita per settore+dimensione+step
function _getAzionePredefinita(settore, dimId, fromStep, toStep) {
  const chiave = String(toStep);
  if (AZIONI_TARGET_BY_SETTORE[settore] && AZIONI_TARGET_BY_SETTORE[settore][dimId] && AZIONI_TARGET_BY_SETTORE[settore][dimId][chiave]) {
    return AZIONI_TARGET_BY_SETTORE[settore][dimId][chiave];
  }
  if (AZIONI_TARGET_GENERIC[dimId] && AZIONI_TARGET_GENERIC[dimId][chiave]) {
    return AZIONI_TARGET_GENERIC[dimId][chiave][0] || null;
  }
  return null;
}

function _getCosto(settore, dimId, fromStep, toStep) {
  const chiaveRange = fromStep + '-' + toStep;
  const chiaveStep = String(toStep);
  // 1. STEP_DETAIL_BY_SETTORE — costi specifici per micro-settore (priorità massima)
  const detail = STEP_DETAIL_BY_SETTORE?.[settore]?.[dimId]?.[chiaveRange];
  if (detail && (detail.costo_mensile !== undefined || detail.costo_setup !== undefined)) {
    return { r: detail.costo_mensile || 0, u: detail.costo_setup || 0 };
  }
  // 2. COSTI_BY_SETTORE (override specifico) — supporta sia "1-2" che "2"
  if (COSTI_BY_SETTORE[settore]?.[dimId]?.[chiaveRange]) {
    return COSTI_BY_SETTORE[settore][dimId][chiaveRange];
  }
  if (COSTI_BY_SETTORE[settore]?.[dimId]?.[chiaveStep]) {
    return COSTI_BY_SETTORE[settore][dimId][chiaveStep];
  }
  // 3. Fallback: LISTINO_DEFAULT via MICRO_TO_MACRO — supporta sia "1-2" che "2"
  const macro = MICRO_TO_MACRO[settore] || settore;
  if (LISTINO_DEFAULT[macro]?.[dimId]?.[chiaveRange]) {
    return LISTINO_DEFAULT[macro][dimId][chiaveRange];
  }
  if (LISTINO_DEFAULT[macro]?.[dimId]?.[chiaveStep]) {
    return LISTINO_DEFAULT[macro][dimId][chiaveStep];
  }
  return null;
}

function _getCostoLabel(settore, dimId, fromStep, toStep) {
  // Restituisce stringa leggibile per il badge nel UI
  const c = _getCosto(settore, dimId, fromStep, toStep);
  if (!c) return null;
  const parts = [];
  if (c.r > 0) parts.push(_formatEur(c.r) + '€/mese');
  if (c.u > 0) parts.push(_formatEur(c.u) + '€ setup');
  return parts.join(' + ');
}

function _getImpatto(settore, dimId, stepKey) {
  const tetti = (typeof TETTO_BY_SETTORE !== 'undefined' ? TETTO_BY_SETTORE[settore] : null) || {};
  const tetto = tetti[dimId] || 5;
  const targetLvl = parseInt((stepKey || '').split('-')[1] || stepKey) || 5;
  if (targetLvl > tetto) return null;
  const settoreData = IMPATTO_BY_SETTORE[settore] || IMPATTO_BY_SETTORE['manifatturiero_meccanica'];
  const dimData = settoreData?.[dimId];
  // Supporta sia "1-2" (range) che "2" (step singolo)
  const singleKey = String(stepKey).includes('-') ? String(stepKey).split('-')[1] : String(stepKey);
  const rangeKey = String(stepKey).includes('-') ? String(stepKey) : (parseInt(stepKey) - 1) + '-' + stepKey;
  return dimData?.[rangeKey] || dimData?.[singleKey] || null;
}

function _fasciaFromAnno1(fatturato_anno_1) {
  if (!fatturato_anno_1) return null;
  const v = fatturato_anno_1;
  if (v < 100000)    return '<100k';
  if (v < 250000)    return '100k-250k';
  if (v < 500000)    return '250k-500k';
  if (v < 1000000)   return '500k-1M';
  if (v < 2000000)   return '1M-2M';
  if (v < 5000000)   return '2M-5M';
  return '5M-20M';
}

var PESI_BY_SETTORE = 
{
  "manifatturiero_meccanica": {
    "vendite": 28,
    "pipeline": 12,
    "team": 12,
    "processi": 10,
    "ricavi": 10,
    "marketing": 14,
    "sitoweb": 8,
    "ecommerce": 6
  },
  "manifatturiero_automotive": {
    "vendite": 30,
    "pipeline": 14,
    "team": 12,
    "processi": 11,
    "ricavi": 11,
    "marketing": 12,
    "sitoweb": 6,
    "ecommerce": 4
  },
  "manifatturiero_packaging": {
    "vendite": 26,
    "pipeline": 11,
    "team": 11,
    "processi": 10,
    "ricavi": 10,
    "marketing": 16,
    "sitoweb": 9,
    "ecommerce": 7
  },
  "manifatturiero_cterzi": {
    "vendite": 30,
    "pipeline": 13,
    "team": 13,
    "processi": 12,
    "ricavi": 10,
    "marketing": 12,
    "sitoweb": 7,
    "ecommerce": 3
  },
  "manifatturiero_elettromeccanica": {
    "vendite": 28,
    "pipeline": 12,
    "team": 12,
    "processi": 11,
    "ricavi": 12,
    "marketing": 13,
    "sitoweb": 8,
    "ecommerce": 4
  },
  "manifatturiero_tessile": {
    "vendite": 30,
    "pipeline": 10,
    "team": 11,
    "processi": 8,
    "ricavi": 10,
    "marketing": 20,
    "sitoweb": 7,
    "ecommerce": 4
  },
  "servizi_it": {
    "vendite": 24,
    "pipeline": 17,
    "team": 15,
    "processi": 9,
    "ricavi": 13,
    "marketing": 13,
    "sitoweb": 7,
    "ecommerce": 2
  },
  "servizi_formazione": {
    "vendite": 24,
    "pipeline": 16,
    "team": 14,
    "processi": 9,
    "ricavi": 13,
    "marketing": 14,
    "sitoweb": 6,
    "ecommerce": 4
  },
  "edilizia_residenziale": {
    "vendite": 32,
    "pipeline": 14,
    "team": 12,
    "processi": 10,
    "ricavi": 12,
    "marketing": 12,
    "sitoweb": 6,
    "ecommerce": 2
  },
  "edilizia_impianti": {
    "vendite": 30,
    "pipeline": 14,
    "team": 12,
    "processi": 10,
    "ricavi": 14,
    "marketing": 12,
    "sitoweb": 6,
    "ecommerce": 2
  },
  "edilizia_ristrutturazioni": {
    "vendite": 32,
    "pipeline": 13,
    "team": 12,
    "processi": 10,
    "ricavi": 11,
    "marketing": 13,
    "sitoweb": 6,
    "ecommerce": 3
  },
  "edilizia_serramenti": {
    "vendite": 26,
    "pipeline": 13,
    "team": 11,
    "processi": 9,
    "ricavi": 11,
    "marketing": 12,
    "sitoweb": 10,
    "ecommerce": 8
  },
  "commercio_distribuzione_industriale": {
    "vendite": 30,
    "pipeline": 14,
    "team": 10,
    "processi": 8,
    "ricavi": 14,
    "marketing": 10,
    "sitoweb": 6,
    "ecommerce": 8
  },
  "commercio_ingrosso_alimentare": {
    "vendite": 28,
    "pipeline": 13,
    "team": 10,
    "processi": 8,
    "ricavi": 16,
    "marketing": 10,
    "sitoweb": 5,
    "ecommerce": 10
  },
  "commercio_materiali_edili": {
    "vendite": 30,
    "pipeline": 13,
    "team": 10,
    "processi": 8,
    "ricavi": 14,
    "marketing": 11,
    "sitoweb": 7,
    "ecommerce": 7
  },
  "commercio_ricambi_auto": {
    "vendite": 28,
    "pipeline": 12,
    "team": 10,
    "processi": 8,
    "ricavi": 15,
    "marketing": 9,
    "sitoweb": 6,
    "ecommerce": 12
  },
  "commercio_auto_moto_usato": {
    "vendite": 28,
    "pipeline": 14,
    "team": 12,
    "processi": 9,
    "ricavi": 14,
    "marketing": 10,
    "sitoweb": 7,
    "ecommerce": 6
  },
  "commercio_auto_moto_nuovo": {
    "vendite": 24,
    "pipeline": 14,
    "team": 13,
    "processi": 10,
    "ricavi": 14,
    "marketing": 11,
    "sitoweb": 8,
    "ecommerce": 6
  },
  "commercio_abbigliamento_ingrosso": {
    "vendite": 28,
    "pipeline": 12,
    "team": 10,
    "processi": 8,
    "ricavi": 14,
    "marketing": 14,
    "sitoweb": 7,
    "ecommerce": 7
  },
  "commercio_elettronica": {
    "vendite": 26,
    "pipeline": 13,
    "team": 10,
    "processi": 8,
    "ricavi": 13,
    "marketing": 11,
    "sitoweb": 7,
    "ecommerce": 12
  },
  "commercio_abbigliamento_dettaglio": {
    "vendite": 20,
    "pipeline": 10,
    "team": 10,
    "processi": 8,
    "ricavi": 10,
    "marketing": 18,
    "sitoweb": 6,
    "ecommerce": 18
  },
  "commercio_orologi_gioielli": {
    "vendite": 28,
    "pipeline": 16,
    "team": 12,
    "processi": 8,
    "ricavi": 14,
    "marketing": 12,
    "sitoweb": 6,
    "ecommerce": 4
  },
  "alimentare_trasformazione": {
    "vendite": 28,
    "pipeline": 10,
    "team": 10,
    "processi": 8,
    "ricavi": 16,
    "marketing": 16,
    "sitoweb": 6,
    "ecommerce": 6
  },
  "alimentare_vini": {
    "vendite": 24,
    "pipeline": 10,
    "team": 10,
    "processi": 7,
    "ricavi": 14,
    "marketing": 22,
    "sitoweb": 7,
    "ecommerce": 6
  },
  "alimentare_forno": {
    "vendite": 30,
    "pipeline": 10,
    "team": 10,
    "processi": 8,
    "ricavi": 22,
    "marketing": 10,
    "sitoweb": 5,
    "ecommerce": 5
  },
  "alimentare_conserve": {
    "vendite": 28,
    "pipeline": 10,
    "team": 10,
    "processi": 8,
    "ricavi": 16,
    "marketing": 16,
    "sitoweb": 6,
    "ecommerce": 6
  },
  "alimentare_ingredienti": {
    "vendite": 26,
    "pipeline": 11,
    "team": 11,
    "processi": 9,
    "ricavi": 16,
    "marketing": 15,
    "sitoweb": 7,
    "ecommerce": 5
  },
  "tech_saas": {
    "vendite": 16,
    "pipeline": 18,
    "team": 14,
    "processi": 8,
    "ricavi": 14,
    "marketing": 18,
    "sitoweb": 8,
    "ecommerce": 4
  },
  "tech_system_integrator": {
    "vendite": 24,
    "pipeline": 16,
    "team": 14,
    "processi": 9,
    "ricavi": 14,
    "marketing": 13,
    "sitoweb": 7,
    "ecommerce": 3
  },
  "tech_digital_agency": {
    "vendite": 22,
    "pipeline": 16,
    "team": 14,
    "processi": 8,
    "ricavi": 14,
    "marketing": 16,
    "sitoweb": 8,
    "ecommerce": 2
  },
  "tech_automazione": {
    "vendite": 26,
    "pipeline": 14,
    "team": 14,
    "processi": 10,
    "ricavi": 14,
    "marketing": 13,
    "sitoweb": 7,
    "ecommerce": 2
  }
};
window.PESI_BY_SETTORE = PESI_BY_SETTORE;

// ─── MODELLO CRESCITA COMPOSTA CON DIMINISHING RETURNS + PENALITÀ SBILANCIAMENTO ─
// Formula base: crescita_totale = 1 - ∏(1 - contributo_i × peso_i/100 × efficienza_i)
// Ogni dimensione contribuisce in modo moltiplicativo (non additivo).
// Se una dimensione viene spinta senza bilanciare le dipendenze, subisce una penalità.
//
// MATRICE DIPENDENZE: quanto la dimensione A dipende dalla dimensione B
// vendite:   pipeline(0.35) · team(0.25) · processi(0.20) · marketing(0.20)
// pipeline:  vendite(0.40) · processi(0.35) · team(0.25)
// team:      processi(0.40) · vendite(0.35) · pipeline(0.25)
// processi:  team(0.35) · pipeline(0.30) · vendite(0.35)
// ricavi:    vendite(0.35) · pipeline(0.30) · processi(0.20) · team(0.15)
// marketing: vendite(0.30) · sitoweb(0.35) · pipeline(0.20) · processi(0.15)
// sitoweb:   marketing(0.45) · ecommerce(0.30) · processi(0.25)
// ecommerce: sitoweb(0.50) · marketing(0.35) · processi(0.15)


// ─── MATRICI DI DIPENDENZA PER MACROSETTORE + OVERRIDE MICRO ──────────────────
// Ogni valore indica quanto la dimensione A dipende dalla dimensione B
// per esprimere il suo pieno potenziale. Somma dei pesi = 1.0 per dimensione.

const _DIPENDENZE_MACRO = {
  manifatturiero: {
    vendite:   {pipeline:0.40, team:0.30, processi:0.20, marketing:0.10},
    pipeline:  {vendite:0.45, processi:0.35, team:0.20},
    team:      {processi:0.45, vendite:0.35, pipeline:0.20},
    processi:  {team:0.40, pipeline:0.35, vendite:0.25},
    ricavi:    {vendite:0.40, pipeline:0.35, processi:0.25},
    marketing: {vendite:0.25, sitoweb:0.40, processi:0.20, pipeline:0.15},
    sitoweb:   {marketing:0.50, processi:0.30, ecommerce:0.20},
    ecommerce: {sitoweb:0.55, marketing:0.30, processi:0.15}
  },
  servizi: {
    vendite:   {pipeline:0.35, team:0.30, processi:0.25, marketing:0.10},
    pipeline:  {vendite:0.40, processi:0.30, team:0.30},
    team:      {processi:0.35, vendite:0.40, pipeline:0.25},
    processi:  {team:0.40, pipeline:0.30, vendite:0.30},
    ricavi:    {vendite:0.35, pipeline:0.35, processi:0.20, team:0.10},
    marketing: {sitoweb:0.40, vendite:0.25, pipeline:0.20, processi:0.15},
    sitoweb:   {marketing:0.40, processi:0.30, ecommerce:0.30},
    ecommerce: {sitoweb:0.45, marketing:0.40, processi:0.15}
  },
  edilizia: {
    vendite:   {marketing:0.35, team:0.25, pipeline:0.25, processi:0.15},
    pipeline:  {vendite:0.50, processi:0.30, team:0.20},
    team:      {processi:0.40, vendite:0.40, pipeline:0.20},
    processi:  {team:0.45, vendite:0.35, pipeline:0.20},
    ricavi:    {vendite:0.45, pipeline:0.30, processi:0.25},
    marketing: {sitoweb:0.45, vendite:0.30, processi:0.25},
    sitoweb:   {marketing:0.50, processi:0.30, ecommerce:0.20},
    ecommerce: {sitoweb:0.50, marketing:0.35, processi:0.15}
  },
  commercio: {
    vendite:   {pipeline:0.35, team:0.25, ricavi:0.25, processi:0.15},
    pipeline:  {vendite:0.40, ecommerce:0.30, processi:0.30},
    team:      {vendite:0.40, processi:0.35, pipeline:0.25},
    processi:  {pipeline:0.40, team:0.35, vendite:0.25},
    ricavi:    {vendite:0.40, pipeline:0.35, ecommerce:0.25},
    marketing: {ecommerce:0.35, sitoweb:0.35, vendite:0.30},
    sitoweb:   {marketing:0.45, ecommerce:0.35, processi:0.20},
    ecommerce: {sitoweb:0.45, marketing:0.35, pipeline:0.20}
  },
  alimentare: {
    vendite:   {pipeline:0.40, team:0.35, processi:0.25},
    pipeline:  {vendite:0.50, processi:0.30, ricavi:0.20},
    team:      {vendite:0.45, processi:0.40, pipeline:0.15},
    processi:  {team:0.45, pipeline:0.35, vendite:0.20},
    ricavi:    {vendite:0.50, pipeline:0.35, processi:0.15},
    marketing: {sitoweb:0.40, vendite:0.30, ecommerce:0.30},
    sitoweb:   {marketing:0.50, ecommerce:0.30, processi:0.20},
    ecommerce: {marketing:0.50, sitoweb:0.35, processi:0.15}
  },
  tech: {
    vendite:   {pipeline:0.35, marketing:0.30, team:0.20, processi:0.15},
    pipeline:  {vendite:0.35, ecommerce:0.35, processi:0.30},
    team:      {processi:0.35, vendite:0.35, pipeline:0.30},
    processi:  {team:0.35, pipeline:0.35, vendite:0.30},
    ricavi:    {pipeline:0.40, ecommerce:0.35, vendite:0.25},
    marketing: {sitoweb:0.45, ecommerce:0.30, vendite:0.25},
    sitoweb:   {marketing:0.50, ecommerce:0.30, processi:0.20},
    ecommerce: {sitoweb:0.45, marketing:0.40, pipeline:0.15}
  }
};

// Override micro-settori che si discostano significativamente dal macro
const _DIPENDENZE_OVERRIDE = {
  tech_saas: {
    ecommerce: {marketing:0.60, sitoweb:0.30, pipeline:0.10}
  },
  alimentare_forno: {
    ricavi: {vendite:0.65, pipeline:0.35}
  },
  commercio_abbigliamento_dettaglio: {
    ecommerce: {marketing:0.65, sitoweb:0.25, processi:0.10}
  },
  manifatturiero_cterzi: {
    pipeline: {processi:0.55, vendite:0.30, team:0.15}
  },
  alimentare_vini: {
    marketing: {ecommerce:0.35, sitoweb:0.35, vendite:0.30}
  },
  edilizia_serramenti: {
    ecommerce: {marketing:0.45, sitoweb:0.45, processi:0.10}
  }
};

// Mappa settore → macrosettore
const _MACRO_MAP = {
  manifatturiero_meccanica:'manifatturiero', manifatturiero_automotive:'manifatturiero',
  manifatturiero_packaging:'manifatturiero', manifatturiero_cterzi:'manifatturiero',
  manifatturiero_elettromeccanica:'manifatturiero', manifatturiero_tessile:'manifatturiero',
  servizi_it:'servizi', servizi_formazione:'servizi',
  edilizia_residenziale:'edilizia', edilizia_impianti:'edilizia',
  edilizia_ristrutturazioni:'edilizia', edilizia_serramenti:'edilizia',
  commercio_distribuzione_industriale:'commercio', commercio_ingrosso_alimentare:'commercio',
  commercio_materiali_edili:'commercio', commercio_ricambi_auto:'commercio',
  commercio_abbigliamento_ingrosso:'commercio', commercio_elettronica:'commercio',
  commercio_auto_moto_nuovo:'commercio', commercio_auto_moto_usato:'commercio', commercio_abbigliamento_dettaglio:'commercio',
  commercio_orologi_gioielli:'commercio',
  alimentare_trasformazione:'alimentare', alimentare_vini:'alimentare',
  alimentare_forno:'alimentare', alimentare_conserve:'alimentare',
  alimentare_ingredienti:'alimentare',
  tech_saas:'tech', tech_system_integrator:'tech',
  tech_digital_agency:'tech', tech_automazione:'tech'
};

function _getDipendenze(settore, dimId) {
  // 1. Controlla override micro-settore
  if (_DIPENDENZE_OVERRIDE[settore] && _DIPENDENZE_OVERRIDE[settore][dimId]) {
    return _DIPENDENZE_OVERRIDE[settore][dimId];
  }
  // 2. Usa matrice macrosettore
  const macro = _MACRO_MAP[settore];
  if (macro && _DIPENDENZE_MACRO[macro] && _DIPENDENZE_MACRO[macro][dimId]) {
    return _DIPENDENZE_MACRO[macro][dimId];
  }
  // 3. Fallback generico
  return {pipeline:0.35, team:0.25, processi:0.20, marketing:0.20};
}


function _calcolaPenalita(settore, dimId, targets) {
  const matrice = (MATRICE_DIPENDENZE_BY_SETTORE && MATRICE_DIPENDENZE_BY_SETTORE[settore])
    ? MATRICE_DIPENDENZE_BY_SETTORE[settore]
    : MATRICE_DIPENDENZE;
  const dipendenze = matrice[dimId] || [];
  if (dipendenze.length === 0) return 0;

  const targetDim = targets[dimId] || 1;
  let gapTotale = 0;

  dipendenze.forEach(dep => {
    const targetDep = targets[dep] || 1;
    const gap = Math.max(0, targetDim - targetDep);
    gapTotale += gap;
  });

  const gapMedio = gapTotale / dipendenze.length;
  const gapMax = 4;

  // Penalità esponenziale — gap piccoli impattano poco, gap grandi impattano molto
  // Gap di 1 → penalità ~35%, gap di 2 → penalità ~65%, gap di 3 → penalità ~80%, gap di 4 → penalità ~85%
  const penalita = 1 - Math.pow(1 - (gapMedio / gapMax), 1.5);

  return Math.min(penalita, 0.85);
}

// ── IMPATTO UNITARIO AUTOMOTIVE ──────────────────────────────────────
const UNITA_PER_STEP_AUTOMOTIVE = {
  commercio_auto_moto_usato: {
    vendite: {
      '1-2': { unita_mese: 1.0,  tipo: 'auto' },
      '2-3': { unita_mese: 2.5,  tipo: 'auto' },
      '3-4': { unita_mese: 4.0,  tipo: 'auto' },
      '4-5': { unita_mese: 6.0,  tipo: 'auto' },
    },
    pipeline: {
      '1-2': { recupero_pct: 0.15 },
      '2-3': { recupero_pct: 0.30 },
      '3-4': { recupero_pct: 0.15 },
      '4-5': { recupero_pct: 0.10 },
    },
    team: {
      '1-2': { moltiplicatore: 0.10 },
      '2-3': { moltiplicatore: 0.20 },
      '3-4': { moltiplicatore: 0.15 },
      '4-5': { moltiplicatore: 0.10 },
    },
    marketing: {
      '1-2': { contatti_mese: 2,  conv_pct: 0.20 },
      '2-3': { contatti_mese: 5,  conv_pct: 0.25 },
      '3-4': { contatti_mese: 8,  conv_pct: 0.30 },
      '4-5': { contatti_mese: 12, conv_pct: 0.35 },
    },
    ecommerce: {
      '1-2': { margine_extra_pct: 0.05, unita_piccolo: 0.5,  unita_grande: 4  },
      '2-3': { margine_extra_pct: 0.08, unita_piccolo: 1.0,  unita_grande: 8  },
      '3-4': { margine_extra_pct: 0.06, unita_piccolo: 1.5,  unita_grande: 12 },
      '4-5': { margine_extra_pct: 0.04, unita_piccolo: 2.0,  unita_grande: 17 },
    },
    processi: {
      '1-2': { efficienza_pct: 0.05 },
      '2-3': { efficienza_pct: 0.08 },
      '3-4': { efficienza_pct: 0.06 },
      '4-5': { efficienza_pct: 0.04 },
    },
    ricavi: {
      '1-2': { upsell_pct: 0.04 },
      '2-3': { upsell_pct: 0.07 },
      '3-4': { upsell_pct: 0.05 },
      '4-5': { upsell_pct: 0.04 },
    },
    sitoweb: {
      '1-2': { contatti_mese: 1,  conv_pct: 0.15 },
      '2-3': { contatti_mese: 3,  conv_pct: 0.20 },
      '3-4': { contatti_mese: 5,  conv_pct: 0.25 },
      '4-5': { contatti_mese: 7,  conv_pct: 0.30 },
    },
  },
  commercio_auto_moto_nuovo: {
    vendite: {
      '1-2': { unita_mese: 0.5,  tipo: 'auto' },
      '2-3': { unita_mese: 1.5,  tipo: 'auto' },
      '3-4': { unita_mese: 2.5,  tipo: 'auto' },
      '4-5': { unita_mese: 3.5,  tipo: 'auto' },
    },
    pipeline: {
      '1-2': { recupero_pct: 0.10 },
      '2-3': { recupero_pct: 0.20 },
      '3-4': { recupero_pct: 0.15 },
      '4-5': { recupero_pct: 0.10 },
    },
    team: {
      '1-2': { moltiplicatore: 0.08 },
      '2-3': { moltiplicatore: 0.15 },
      '3-4': { moltiplicatore: 0.12 },
      '4-5': { moltiplicatore: 0.08 },
    },
    marketing: {
      '1-2': { contatti_mese: 3,  conv_pct: 0.15 },
      '2-3': { contatti_mese: 6,  conv_pct: 0.20 },
      '3-4': { contatti_mese: 10, conv_pct: 0.25 },
      '4-5': { contatti_mese: 15, conv_pct: 0.30 },
    },
    ecommerce: {
      '1-2': { margine_extra_pct: 0.03 },
      '2-3': { margine_extra_pct: 0.05 },
      '3-4': { margine_extra_pct: 0.04 },
      '4-5': { margine_extra_pct: 0.03 },
    },
    processi: {
      '1-2': { efficienza_pct: 0.04 },
      '2-3': { efficienza_pct: 0.07 },
      '3-4': { efficienza_pct: 0.05 },
      '4-5': { efficienza_pct: 0.03 },
    },
    ricavi: {
      '1-2': { upsell_pct: 0.05 },
      '2-3': { upsell_pct: 0.08 },
      '3-4': { upsell_pct: 0.06 },
      '4-5': { upsell_pct: 0.04 },
    },
    sitoweb: {
      '1-2': { contatti_mese: 2,  conv_pct: 0.10 },
      '2-3': { contatti_mese: 5,  conv_pct: 0.15 },
      '3-4': { contatti_mese: 8,  conv_pct: 0.20 },
      '4-5': { contatti_mese: 12, conv_pct: 0.25 },
    },
  },
};
window.UNITA_PER_STEP_AUTOMOTIVE = UNITA_PER_STEP_AUTOMOTIVE;

const UNITA_PER_STEP_BY_SETTORE = {
  // ── MANIFATTURIERO ──────────────────────────────────────
  _manifatturiero: {
    vendite:   { '1-2':{tipo:'ordini',val:0.5}, '2-3':{tipo:'ordini',val:1.5}, '3-4':{tipo:'ordini',val:2.5}, '4-5':{tipo:'ordini',val:3.5} },
    pipeline:  { '1-2':{tipo:'recupero',val:0.10}, '2-3':{tipo:'recupero',val:0.20}, '3-4':{tipo:'recupero',val:0.15}, '4-5':{tipo:'recupero',val:0.10} },
    marketing: { '1-2':{tipo:'contatti',val:1,conv:0.20}, '2-3':{tipo:'contatti',val:2,conv:0.22}, '3-4':{tipo:'contatti',val:4,conv:0.25}, '4-5':{tipo:'contatti',val:6,conv:0.28} },
    ricavi:    { '1-2':{tipo:'vmo_pct',val:0.03}, '2-3':{tipo:'vmo_pct',val:0.05}, '3-4':{tipo:'vmo_pct',val:0.04}, '4-5':{tipo:'vmo_pct',val:0.03} },
    team:      { '1-2':{tipo:'molt',val:0.08}, '2-3':{tipo:'molt',val:0.15}, '3-4':{tipo:'molt',val:0.12}, '4-5':{tipo:'molt',val:0.08} },
    processi:  { '1-2':{tipo:'molt',val:0.06}, '2-3':{tipo:'molt',val:0.10}, '3-4':{tipo:'molt',val:0.08}, '4-5':{tipo:'molt',val:0.05} },
    sitoweb:   { '1-2':{tipo:'contatti',val:0.5,conv:0.15}, '2-3':{tipo:'contatti',val:1.5,conv:0.18}, '3-4':{tipo:'contatti',val:3,conv:0.20}, '4-5':{tipo:'contatti',val:5,conv:0.22} },
    ecommerce: { '1-2':{tipo:'contatti',val:0.5,conv:0.10}, '2-3':{tipo:'contatti',val:1,conv:0.12}, '3-4':{tipo:'contatti',val:2,conv:0.15}, '4-5':{tipo:'contatti',val:3,conv:0.18} },
  },
  // ── EDILIZIA ────────────────────────────────────────────
  _edilizia: {
    vendite:   { '1-2':{tipo:'ordini',val:0.5}, '2-3':{tipo:'ordini',val:1.5}, '3-4':{tipo:'ordini',val:2.0}, '4-5':{tipo:'ordini',val:3.0} },
    pipeline:  { '1-2':{tipo:'recupero',val:0.12}, '2-3':{tipo:'recupero',val:0.25}, '3-4':{tipo:'recupero',val:0.15}, '4-5':{tipo:'recupero',val:0.10} },
    marketing: { '1-2':{tipo:'contatti',val:1,conv:0.25}, '2-3':{tipo:'contatti',val:3,conv:0.28}, '3-4':{tipo:'contatti',val:5,conv:0.30}, '4-5':{tipo:'contatti',val:8,conv:0.32} },
    ricavi:    { '1-2':{tipo:'vmo_pct',val:0.04}, '2-3':{tipo:'vmo_pct',val:0.06}, '3-4':{tipo:'vmo_pct',val:0.05}, '4-5':{tipo:'vmo_pct',val:0.04} },
    team:      { '1-2':{tipo:'molt',val:0.08}, '2-3':{tipo:'molt',val:0.15}, '3-4':{tipo:'molt',val:0.12}, '4-5':{tipo:'molt',val:0.08} },
    processi:  { '1-2':{tipo:'molt',val:0.06}, '2-3':{tipo:'molt',val:0.10}, '3-4':{tipo:'molt',val:0.08}, '4-5':{tipo:'molt',val:0.05} },
    sitoweb:   { '1-2':{tipo:'contatti',val:1,conv:0.20}, '2-3':{tipo:'contatti',val:3,conv:0.22}, '3-4':{tipo:'contatti',val:5,conv:0.25}, '4-5':{tipo:'contatti',val:8,conv:0.28} },
    ecommerce: { '1-2':{tipo:'contatti',val:0.5,conv:0.15}, '2-3':{tipo:'contatti',val:1,conv:0.18}, '3-4':{tipo:'contatti',val:2,conv:0.20}, '4-5':{tipo:'contatti',val:3,conv:0.22} },
  },
  // ── COMMERCIO B2B ───────────────────────────────────────
  _distribuzione: {
    vendite:   { '1-2':{tipo:'ordini',val:2}, '2-3':{tipo:'ordini',val:5}, '3-4':{tipo:'ordini',val:8}, '4-5':{tipo:'ordini',val:12} },
    pipeline:  { '1-2':{tipo:'recupero',val:0.10}, '2-3':{tipo:'recupero',val:0.20}, '3-4':{tipo:'recupero',val:0.15}, '4-5':{tipo:'recupero',val:0.10} },
    marketing: { '1-2':{tipo:'contatti',val:2,conv:0.20}, '2-3':{tipo:'contatti',val:5,conv:0.22}, '3-4':{tipo:'contatti',val:8,conv:0.25}, '4-5':{tipo:'contatti',val:12,conv:0.28} },
    ricavi:    { '1-2':{tipo:'vmo_pct',val:0.03}, '2-3':{tipo:'vmo_pct',val:0.05}, '3-4':{tipo:'vmo_pct',val:0.04}, '4-5':{tipo:'vmo_pct',val:0.03} },
    team:      { '1-2':{tipo:'molt',val:0.08}, '2-3':{tipo:'molt',val:0.15}, '3-4':{tipo:'molt',val:0.12}, '4-5':{tipo:'molt',val:0.08} },
    processi:  { '1-2':{tipo:'molt',val:0.06}, '2-3':{tipo:'molt',val:0.10}, '3-4':{tipo:'molt',val:0.08}, '4-5':{tipo:'molt',val:0.05} },
    sitoweb:   { '1-2':{tipo:'contatti',val:1,conv:0.15}, '2-3':{tipo:'contatti',val:2,conv:0.18}, '3-4':{tipo:'contatti',val:4,conv:0.20}, '4-5':{tipo:'contatti',val:6,conv:0.22} },
    ecommerce: { '1-2':{tipo:'ordini',val:1}, '2-3':{tipo:'ordini',val:3}, '3-4':{tipo:'ordini',val:5}, '4-5':{tipo:'ordini',val:8} },
  },
  // ── COMMERCIO B2C RETAIL ────────────────────────────────
  _retail: {
    vendite:   { '1-2':{tipo:'pct_fat',val:0.05}, '2-3':{tipo:'pct_fat',val:0.10}, '3-4':{tipo:'pct_fat',val:0.08}, '4-5':{tipo:'pct_fat',val:0.06} },
    pipeline:  { '1-2':{tipo:'recupero',val:0.08}, '2-3':{tipo:'recupero',val:0.15}, '3-4':{tipo:'recupero',val:0.10}, '4-5':{tipo:'recupero',val:0.08} },
    marketing: { '1-2':{tipo:'pct_fat',val:0.03}, '2-3':{tipo:'pct_fat',val:0.06}, '3-4':{tipo:'pct_fat',val:0.08}, '4-5':{tipo:'pct_fat',val:0.10} },
    ricavi:    { '1-2':{tipo:'vmo_pct',val:0.04}, '2-3':{tipo:'vmo_pct',val:0.06}, '3-4':{tipo:'vmo_pct',val:0.05}, '4-5':{tipo:'vmo_pct',val:0.04} },
    team:      { '1-2':{tipo:'molt',val:0.08}, '2-3':{tipo:'molt',val:0.12}, '3-4':{tipo:'molt',val:0.10}, '4-5':{tipo:'molt',val:0.07} },
    processi:  { '1-2':{tipo:'molt',val:0.05}, '2-3':{tipo:'molt',val:0.08}, '3-4':{tipo:'molt',val:0.07}, '4-5':{tipo:'molt',val:0.05} },
    sitoweb:   { '1-2':{tipo:'pct_fat',val:0.02}, '2-3':{tipo:'pct_fat',val:0.04}, '3-4':{tipo:'pct_fat',val:0.06}, '4-5':{tipo:'pct_fat',val:0.08} },
    ecommerce: { '1-2':{tipo:'pct_fat',val:0.03}, '2-3':{tipo:'pct_fat',val:0.06}, '3-4':{tipo:'pct_fat',val:0.08}, '4-5':{tipo:'pct_fat',val:0.10} },
  },
  // ── ALIMENTARE ──────────────────────────────────────────
  _food: {
    vendite:   { '1-2':{tipo:'ordini',val:2}, '2-3':{tipo:'ordini',val:4}, '3-4':{tipo:'ordini',val:6}, '4-5':{tipo:'ordini',val:8} },
    pipeline:  { '1-2':{tipo:'recupero',val:0.10}, '2-3':{tipo:'recupero',val:0.20}, '3-4':{tipo:'recupero',val:0.15}, '4-5':{tipo:'recupero',val:0.10} },
    marketing: { '1-2':{tipo:'contatti',val:2,conv:0.25}, '2-3':{tipo:'contatti',val:5,conv:0.28}, '3-4':{tipo:'contatti',val:8,conv:0.30}, '4-5':{tipo:'contatti',val:12,conv:0.32} },
    ricavi:    { '1-2':{tipo:'vmo_pct',val:0.03}, '2-3':{tipo:'vmo_pct',val:0.05}, '3-4':{tipo:'vmo_pct',val:0.04}, '4-5':{tipo:'vmo_pct',val:0.03} },
    team:      { '1-2':{tipo:'molt',val:0.07}, '2-3':{tipo:'molt',val:0.13}, '3-4':{tipo:'molt',val:0.10}, '4-5':{tipo:'molt',val:0.07} },
    processi:  { '1-2':{tipo:'molt',val:0.05}, '2-3':{tipo:'molt',val:0.09}, '3-4':{tipo:'molt',val:0.07}, '4-5':{tipo:'molt',val:0.05} },
    sitoweb:   { '1-2':{tipo:'contatti',val:1,conv:0.20}, '2-3':{tipo:'contatti',val:2,conv:0.22}, '3-4':{tipo:'contatti',val:4,conv:0.25}, '4-5':{tipo:'contatti',val:6,conv:0.28} },
    ecommerce: { '1-2':{tipo:'ordini',val:1}, '2-3':{tipo:'ordini',val:3}, '3-4':{tipo:'ordini',val:5}, '4-5':{tipo:'ordini',val:8} },
  },
  // ── TECH ────────────────────────────────────────────────
  _tech: {
    vendite:   { '1-2':{tipo:'ordini',val:0.5}, '2-3':{tipo:'ordini',val:1.5}, '3-4':{tipo:'ordini',val:2.5}, '4-5':{tipo:'ordini',val:3.5} },
    pipeline:  { '1-2':{tipo:'recupero',val:0.15}, '2-3':{tipo:'recupero',val:0.30}, '3-4':{tipo:'recupero',val:0.20}, '4-5':{tipo:'recupero',val:0.15} },
    marketing: { '1-2':{tipo:'contatti',val:3,conv:0.15}, '2-3':{tipo:'contatti',val:8,conv:0.18}, '3-4':{tipo:'contatti',val:15,conv:0.20}, '4-5':{tipo:'contatti',val:25,conv:0.22} },
    ricavi:    { '1-2':{tipo:'vmo_pct',val:0.05}, '2-3':{tipo:'vmo_pct',val:0.08}, '3-4':{tipo:'vmo_pct',val:0.06}, '4-5':{tipo:'vmo_pct',val:0.04} },
    team:      { '1-2':{tipo:'molt',val:0.08}, '2-3':{tipo:'molt',val:0.15}, '3-4':{tipo:'molt',val:0.12}, '4-5':{tipo:'molt',val:0.08} },
    processi:  { '1-2':{tipo:'molt',val:0.07}, '2-3':{tipo:'molt',val:0.12}, '3-4':{tipo:'molt',val:0.09}, '4-5':{tipo:'molt',val:0.06} },
    sitoweb:   { '1-2':{tipo:'contatti',val:2,conv:0.12}, '2-3':{tipo:'contatti',val:5,conv:0.15}, '3-4':{tipo:'contatti',val:10,conv:0.18}, '4-5':{tipo:'contatti',val:18,conv:0.20} },
    ecommerce: { '1-2':{tipo:'pct_fat',val:0.05}, '2-3':{tipo:'pct_fat',val:0.10}, '3-4':{tipo:'pct_fat',val:0.12}, '4-5':{tipo:'pct_fat',val:0.15} },
  },
  // ── SERVIZI B2B ─────────────────────────────────────────
  _servizi: {
    vendite:   { '1-2':{tipo:'ordini',val:0.5}, '2-3':{tipo:'ordini',val:1.5}, '3-4':{tipo:'ordini',val:2.0}, '4-5':{tipo:'ordini',val:3.0} },
    pipeline:  { '1-2':{tipo:'recupero',val:0.15}, '2-3':{tipo:'recupero',val:0.25}, '3-4':{tipo:'recupero',val:0.18}, '4-5':{tipo:'recupero',val:0.12} },
    marketing: { '1-2':{tipo:'contatti',val:2,conv:0.20}, '2-3':{tipo:'contatti',val:5,conv:0.22}, '3-4':{tipo:'contatti',val:8,conv:0.25}, '4-5':{tipo:'contatti',val:12,conv:0.28} },
    ricavi:    { '1-2':{tipo:'vmo_pct',val:0.04}, '2-3':{tipo:'vmo_pct',val:0.07}, '3-4':{tipo:'vmo_pct',val:0.05}, '4-5':{tipo:'vmo_pct',val:0.04} },
    team:      { '1-2':{tipo:'molt',val:0.08}, '2-3':{tipo:'molt',val:0.15}, '3-4':{tipo:'molt',val:0.12}, '4-5':{tipo:'molt',val:0.08} },
    processi:  { '1-2':{tipo:'molt',val:0.07}, '2-3':{tipo:'molt',val:0.11}, '3-4':{tipo:'molt',val:0.09}, '4-5':{tipo:'molt',val:0.06} },
    sitoweb:   { '1-2':{tipo:'contatti',val:1,conv:0.18}, '2-3':{tipo:'contatti',val:3,conv:0.20}, '3-4':{tipo:'contatti',val:5,conv:0.22}, '4-5':{tipo:'contatti',val:8,conv:0.25} },
    ecommerce: { '1-2':{tipo:'pct_fat',val:0.03}, '2-3':{tipo:'pct_fat',val:0.06}, '3-4':{tipo:'pct_fat',val:0.08}, '4-5':{tipo:'pct_fat',val:0.10} },
  },
  // ── AUTOMOTIVE (già esistente, mantieni) ────────────────
  commercio_auto_moto_usato: null, // usa UNITA_PER_STEP_AUTOMOTIVE
  commercio_auto_moto_nuovo: null,
};
window.UNITA_PER_STEP_BY_SETTORE = UNITA_PER_STEP_BY_SETTORE;

const SETTORE_TO_UNITA_KEY = {
  manifatturiero_meccanica:          '_manifatturiero',
  manifatturiero_automotive:         '_manifatturiero',
  manifatturiero_packaging:          '_manifatturiero',
  manifatturiero_cterzi:             '_manifatturiero',
  manifatturiero_elettromeccanica:   '_manifatturiero',
  manifatturiero_tessile_tessuti:    '_manifatturiero',
  manifatturiero_tessile_capi:       '_manifatturiero',
  edilizia_residenziale:             '_edilizia',
  edilizia_impianti:                 '_edilizia',
  edilizia_serramenti:               '_edilizia',
  commercio_distribuzione_industriale: '_distribuzione',
  commercio_ingrosso_alimentare:     '_distribuzione',
  commercio_materiali_edili:         '_distribuzione',
  commercio_abbigliamento_ingrosso:  '_distribuzione',
  commercio_ricambi_auto:            '_distribuzione',
  commercio:                         '_retail',
  commercio_elettronica:             '_retail',
  commercio_abbigliamento_dettaglio: '_retail',
  commercio_orologi_gioielli:        '_retail',
  commercio_auto_moto_usato:         'commercio_auto_moto_usato',
  commercio_auto_moto_nuovo:         'commercio_auto_moto_nuovo',
  alimentare_trasformazione:         '_food',
  alimentare_vini:                   '_food',
  alimentare_forno:                  '_food',
  alimentare_conserve:               '_food',
  alimentare_ingredienti:            '_food',
  alimentare_birra:                  '_food',
  tech_saas:                         '_tech',
  tech_system_integrator:            '_tech',
  tech_digital_agency:               '_tech',
  tech_automazione:                  '_tech',
  servizi_b2b:                       '_servizi',
  servizi_it:                        '_servizi',
  servizi_formazione:                '_servizi',
};
window.SETTORE_TO_UNITA_KEY = SETTORE_TO_UNITA_KEY;

function _calcolaImpattoUnitario(settore, dimId, stepKey, p) {
  // Normalizza chiave: genera sia range "1-2" che singolo "2"
  const rangeKey = String(stepKey).includes('-') ? String(stepKey) : (parseInt(stepKey) - 1) + '-' + stepKey;
  const singleKey = String(stepKey).includes('-') ? String(stepKey).split('-')[1] : String(stepKey);

  const fat = p?.fatturato_anno_1 || 1;
  const vmo = p?.kpi_commerciali?.valore_medio_ordine || null;
  const tconv = (p?.kpi_commerciali?.tasso_conversione_pct || 25) / 100;

  // Curva ramp-up
  const ramp = { 6: 0.40, 12: 0.75, 24: 1.00 };
  const calcPct = (fattoreAnnuo, minMolt, maxMolt) => {
    minMolt = minMolt || 0.85;
    maxMolt = maxMolt || 1.15;
    return {
      pct_6m:  [Math.round(fattoreAnnuo*ramp[6] *minMolt*1000)/10, Math.round(fattoreAnnuo*ramp[6] *maxMolt*1000)/10],
      pct_12m: [Math.round(fattoreAnnuo*ramp[12]*minMolt*1000)/10, Math.round(fattoreAnnuo*ramp[12]*maxMolt*1000)/10],
      pct_24m: [Math.round(fattoreAnnuo*ramp[24]*minMolt*1000)/10, Math.round(fattoreAnnuo*ramp[24]*maxMolt*1000)/10],
    };
  };

  // Determina la chiave dati
  const unitaKey = SETTORE_TO_UNITA_KEY?.[settore];
  let dati = null;

  if (unitaKey === 'commercio_auto_moto_usato' || unitaKey === 'commercio_auto_moto_nuovo') {
    // Usa UNITA_PER_STEP_AUTOMOTIVE esistente — prova range poi singolo
    dati = UNITA_PER_STEP_AUTOMOTIVE?.[settore]?.[dimId]?.[rangeKey]
        || UNITA_PER_STEP_AUTOMOTIVE?.[settore]?.[dimId]?.[singleKey];
    if (!dati) return null;

    if (dati.unita_mese && vmo) {
      return calcPct(dati.unita_mese * 12 * vmo / fat);
    }
    if (dati.recupero_pct) {
      const fatRec = fat * dati.recupero_pct * tconv;
      return calcPct(fatRec / fat);
    }
    if (dati.contatti_mese) {
      return calcPct(dati.contatti_mese * 12 * (dati.conv_pct || tconv) * (vmo || 10000) / fat);
    }
    if (dati.moltiplicatore) return calcPct(dati.moltiplicatore * 0.7);
    if (dati.margine_extra_pct) {
      const fatCliente = p?.fatturato_anno_1 || 0;
      const vmoCliente = vmo || 10000;
      const forbicePiccolo = {'1-2':[0.5,1.0],'2-3':[1.0,2.0],'3-4':[2.0,4.0],'4-5':[4.0,6.0]};
      const forbiceGrande  = {'1-2':[2,5],'2-3':[5,10],'3-4':[10,20],'4-5':[20,35]};
      const forbice = fatCliente < 2000000 ? forbicePiccolo : forbiceGrande;
      const [minA, maxA] = forbice[rangeKey] || forbice[singleKey] || [0.5,1.0];
      return {
        pct_6m:  [Math.round(minA*12*vmoCliente*ramp[6] /fat*1000)/10, Math.round(maxA*12*vmoCliente*ramp[6] /fat*1000)/10],
        pct_12m: [Math.round(minA*12*vmoCliente*ramp[12]/fat*1000)/10, Math.round(maxA*12*vmoCliente*ramp[12]/fat*1000)/10],
        pct_24m: [Math.round(minA*12*vmoCliente*ramp[24]/fat*1000)/10, Math.round(maxA*12*vmoCliente*ramp[24]/fat*1000)/10],
      };
    }
    return null;
  }

  // Settori generici
  if (!unitaKey) return null;
  const tabella = UNITA_PER_STEP_BY_SETTORE?.[unitaKey];
  if (!tabella) return null;
  dati = tabella?.[dimId]?.[rangeKey] || tabella?.[dimId]?.[singleKey];
  if (!dati) return null;

  const vmoEff = vmo || 1000; // fallback VMO generico

  switch (dati.tipo) {
    case 'ordini':
      // transazioni aggiuntive × VMO
      return calcPct(dati.val * 12 * vmoEff / fat);

    case 'recupero':
      // % transazioni recuperate × VMO
      return calcPct(fat * dati.val * tconv / fat);

    case 'contatti':
      // contatti aggiuntivi × conversione × VMO
      return calcPct(dati.val * 12 * (dati.conv || tconv) * vmoEff / fat);

    case 'pct_fat':
      // percentuale diretta del fatturato
      return calcPct(dati.val);

    case 'vmo_pct':
      // aumento del valore medio ordine × transazioni attuali
      var transAnnue = fat / (vmoEff || 1);
      return calcPct(dati.val * transAnnue * vmoEff / fat);

    case 'molt':
      // moltiplicatore sull'efficacia esistente
      return calcPct(dati.val * 0.7);

    default:
      return null;
  }
}
window._calcolaImpattoUnitario = _calcolaImpattoUnitario;


function getStepDetail(settore, dimId, stepKey) {
  return STEP_DETAIL_BY_SETTORE?.[settore]?.[dimId]?.[stepKey] || null;
}
window.getStepDetail = getStepDetail;

function _calcolaImpattoCumulativo(p) {
  if (!p) return null;
  if (!p.fatturato_anno_1) return null;
  const settore = p.settore;
  const targets = p.targets || {};
  const dims = p.dims || {};
  const pesi = PESI_BY_SETTORE[settore];
  if (!pesi) return null;

  const fatBase = p.fatturato_anno_1 || null;
  const fasciaMap = {'<100k':75000,'100k-250k':175000,'250k-500k':375000,'500k-1M':750000,'1M-2M':1500000,'2M-5M':3500000,'5M-20M':12500000};
  const fat = fatBase || fasciaMap[p.fatturato] || null;
  if (!fat) return null;

  const ebitdaMargin = p.ebitda && fat ? p.ebitda/fat : p.margine_pct ? p.margine_pct/100 : null;
  const leva = fat >= 2000000 ? 1.5 : fat >= 500000 ? 1.35 : 1.2;

  const DIMS_IDS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  const attive = DIMS_IDS.filter(id => (targets[id]||0) > (dims[id]||0));
  const ORGANICA_CURVA = [0,0.005,0.012,0.025,0.042,0.065];
  const ORGANICA_PESI = {
    manifatturiero:{vendite:0.32,pipeline:0.22,team:0.18,processi:0.10,ricavi:0.09,marketing:0.06,sitoweb:0.02,ecommerce:0.01},
    manifatturiero_meccanica:{vendite:0.34,pipeline:0.22,team:0.18,processi:0.10,ricavi:0.08,marketing:0.05,sitoweb:0.02,ecommerce:0.01},
    manifatturiero_automotive:{vendite:0.33,pipeline:0.23,team:0.18,processi:0.11,ricavi:0.08,marketing:0.05,sitoweb:0.01,ecommerce:0.01},
    manifatturiero_packaging:{vendite:0.30,pipeline:0.20,team:0.17,processi:0.10,ricavi:0.09,marketing:0.08,sitoweb:0.04,ecommerce:0.02},
    manifatturiero_cterzi:{vendite:0.33,pipeline:0.21,team:0.18,processi:0.12,ricavi:0.09,marketing:0.05,sitoweb:0.01,ecommerce:0.01},
    manifatturiero_food:{vendite:0.28,pipeline:0.18,team:0.16,processi:0.10,ricavi:0.09,marketing:0.10,sitoweb:0.05,ecommerce:0.04},
    commercio:{vendite:0.28,pipeline:0.20,team:0.15,processi:0.10,ricavi:0.09,marketing:0.12,sitoweb:0.04,ecommerce:0.02},
    commercio_ingrosso:{vendite:0.30,pipeline:0.22,team:0.16,processi:0.11,ricavi:0.10,marketing:0.08,sitoweb:0.02,ecommerce:0.01},
    commercio_dettaglio:{vendite:0.22,pipeline:0.16,team:0.14,processi:0.09,ricavi:0.08,marketing:0.15,sitoweb:0.08,ecommerce:0.08},
    commercio_auto:{vendite:0.30,pipeline:0.22,team:0.16,processi:0.10,ricavi:0.09,marketing:0.08,sitoweb:0.03,ecommerce:0.02},
    commercio_auto_moto_usato:{vendite:0.32,pipeline:0.18,team:0.14,processi:0.08,ricavi:0.10,marketing:0.08,sitoweb:0.04,ecommerce:0.06},
    commercio_auto_moto_nuovo:{vendite:0.28,pipeline:0.18,team:0.15,processi:0.09,ricavi:0.10,marketing:0.10,sitoweb:0.06,ecommerce:0.04},
    servizi:{vendite:0.27,pipeline:0.24,team:0.20,processi:0.12,ricavi:0.09,marketing:0.06,sitoweb:0.01,ecommerce:0.01},
    servizi_it:{vendite:0.25,pipeline:0.23,team:0.20,processi:0.12,ricavi:0.09,marketing:0.08,sitoweb:0.02,ecommerce:0.01},
    servizi_logistica:{vendite:0.29,pipeline:0.22,team:0.18,processi:0.14,ricavi:0.09,marketing:0.06,sitoweb:0.01,ecommerce:0.01},
    servizi_formazione:{vendite:0.25,pipeline:0.22,team:0.22,processi:0.10,ricavi:0.09,marketing:0.08,sitoweb:0.03,ecommerce:0.01},
    ecommerce:{vendite:0.15,pipeline:0.14,team:0.10,processi:0.08,ricavi:0.10,marketing:0.22,sitoweb:0.12,ecommerce:0.09},
    retail_digitale:{vendite:0.14,pipeline:0.13,team:0.09,processi:0.08,ricavi:0.09,marketing:0.24,sitoweb:0.13,ecommerce:0.10},
  };
  const pesiOrg = ORGANICA_PESI[settore] || ORGANICA_PESI[settore?.split('_')[0]] || {vendite:0.28,pipeline:0.20,team:0.17,processi:0.11,ricavi:0.09,marketing:0.09,sitoweb:0.04,ecommerce:0.02};
  let crescitaOrg = 0;
  DIMS_IDS.forEach(id => { crescitaOrg += (ORGANICA_CURVA[dims[id]||0]||0) * (pesiOrg[id]||0); });
  crescitaOrg = Math.min(crescitaOrg, 0.08);
  // Floor organico con target: usa il livello target dove definito
  let crescitaOrgConTarget = 0;
  DIMS_IDS.forEach(id => {
    const livTgt = (targets[id] && targets[id] > (dims[id]||0)) ? targets[id] : (dims[id]||0);
    crescitaOrgConTarget += (ORGANICA_CURVA[livTgt]||0) * (pesiOrg[id]||0);
  });
  crescitaOrgConTarget = Math.min(crescitaOrgConTarget, 0.08);
  // Usa sempre il floor più alto tra organica attuale e organica con target
  crescitaOrg = Math.max(crescitaOrg, crescitaOrgConTarget);
  let isSuggerito = false;
  let usaOrganica = false;
  if (attive.length === 0) { isSuggerito = true; usaOrganica = true; }
  const attive2 = DIMS_IDS.filter(id => !usaOrganica && (targets[id]||0) > (dims[id]||0));
  if (attive2.length === 0 && !usaOrganica) return null;

  // Calcolo costi separando ricorrenti e una tantum
  let costoRicorrenteMensile = 0;
  let costoUnaTantumTot = 0;      // somma una tantum di tutti gli step attivi
  const penalitaPerDim = {};
  if (!usaOrganica) attive.forEach(id => {
    const cur = dims[id] || 0;
    const tgt = targets[id] || 0;
    penalitaPerDim[id] = _calcolaPenalita(settore, id, targets);
    for (let step = cur; step < tgt; step++) {
      const c = _getCosto(settore, id, step, step+1);
      if (c) {
        costoRicorrenteMensile += c.r || 0;
        costoUnaTantumTot      += c.u || 0;
      }
    }
  });
  const costoMensileTot = costoRicorrenteMensile; // alias per compatibilità

  // Calcola crescita composta con penalità
  const calcCrescitaComposta = (orizzonte) => {
    if (usaOrganica) {
      const anni = orizzonte / 12;
      return Math.min(Math.pow(1 + crescitaOrg, anni) - 1, 0.30);
    }
    const anni = orizzonte / 12;
    const floorOrganico = Math.pow(1 + crescitaOrg, anni) - 1;
    let prodotto = 1;
    attive.forEach(id => {
      const cur = dims[id] || 0;
      const tgt = targets[id] || 0;
      let contributoTot = 0;
      for (let step = cur; step < tgt; step++) {
        const stepKey = String(step + 1);
        const imp = _calcolaImpattoUnitario(settore, id, stepKey, p) || _getImpatto(settore, id, stepKey);
        if (imp) {
          const pctArr = orizzonte === 6 ? imp.pct_6m : orizzonte === 12 ? imp.pct_12m : imp.pct_24m;
          const midPct = (pctArr[0] + pctArr[1]) / 2 / 100;
          contributoTot += midPct;
        }
      }
      const peso = (pesi[id] || 0) / 100;
      const efficienza = 1 - penalitaPerDim[id]; // riduce il contributo se sbilanciato
      const contributoPesato = Math.min(contributoTot * peso * efficienza, 0.95);
      prodotto *= (1 - contributoPesato);
    });
    const crescitaDaPiano = Math.min(1 - prodotto, 0.50);
    const crescitaTotale = Math.min(floorOrganico + crescitaDaPiano, 0.60);
    // Garantisce che il piano non peggiori mai la situazione organica
    return Math.max(crescitaTotale, floorOrganico);
  };

  const crescita6  = calcCrescitaComposta(6);
  const crescita12 = calcCrescitaComposta(12);
  const crescita24 = calcCrescitaComposta(24);

  const withRange = (c, orizzonte) => {
    const anni = (orizzonte || 24) / 12;
    const floorVal = Math.pow(1 + crescitaOrg, anni) - 1;
    const minC = Math.max(c * 0.82, floorVal);
    const maxC = Math.max(c * 1.18, floorVal);
    return [
      Math.round(fat * (1 + minC) / 1000) * 1000,
      Math.round(fat * (1 + maxC) / 1000) * 1000
    ];
  };

  const fat6  = withRange(crescita6, 6);
  const fat12 = withRange(crescita12, 12);
  const fat24 = withRange(crescita24, 24);

  const pct6  = [Math.round(crescita6*82), Math.round(crescita6*118)];
  const pct12 = [Math.round(crescita12*82), Math.round(crescita12*118)];
  const pct24 = [Math.round(crescita24*82), Math.round(crescita24*118)];

  const ebitda24min = ebitdaMargin ? Math.round(fat24[0] * ebitdaMargin * leva / 1000) * 1000 : null;
  const ebitda24max = ebitdaMargin ? Math.round(fat24[1] * ebitdaMargin * leva / 1000) * 1000 : null;

  // ROI calcolato dopo con costoTot24upd
  const deltaMin24 = fat24[0] - fat;
  const deltaMax24 = fat24[1] - fat;

  // Alert sbilanciamento: dimensioni con penalità > 20%
  const alertSbilanciamento = attive
    .filter(id => penalitaPerDim[id] > 0.20)
    .map(id => {
      const LABEL = {vendite:'Struttura commerciale',pipeline:'Pipeline & CRM',team:'Capitale umano',processi:'Processi & script',ricavi:'Prevedibilità ricavi',marketing:'Marketing & lead gen',sitoweb:'Sito web',ecommerce:'E-commerce & digital'};
      return {id, label: LABEL[id]||id, penalita: Math.round(penalitaPerDim[id]*100)};
    });

  // ─── EBITDA NETTO: formula corretta con ricorrente + una tantum ────────────
  // Costo per periodo N mesi = (ricorrente_mensile × N) + una_tantum (pagata una volta)
  // EBITDA netto = delta EBITDA nel periodo - costo nel periodo
  // Delta EBITDA = EBITDA proiettato annuo - EBITDA base
  //
  // Orizzonti: 6 / 12 / 24 / 36 / 48 / 60 mesi
  // EBITDA netto = delta EBITDA - costo investimento
  // Delta EBITDA = quanto guadagno IN PIÙ rispetto alla base grazie all'investimento
  // NON si confronta EBITDA totale vs costo — si confronta solo il guadagno incrementale
  //
  // Esempio corretto:
  //   EBITDA base: 85k€ | EBITDA proiettato 24m: 105k€ | Delta: +20k€
  //   Costo annuo investimento: 36k€
  //   EBITDA netto 24m: +20k€ - 36k€ = -16k€ (ancora in rientro)
  //   → Con mesi successivi il delta cresce e supera il costo → breakeven

  const ebitdaBase = p.ebitda || (ebitdaMargin ? Math.round(fat * ebitdaMargin / 1000) * 1000 : null);

  // Funzione costo totale per N mesi: ricorrente × N + una tantum (pagata 1 volta)
  const costoPerMesi = (n) => Math.round((costoRicorrenteMensile * n + costoUnaTantumTot) / 1000) * 1000;

  // Fatturato proiettato per orizzonti estesi usando crescita composta
  // Usiamo i % di crescita calcolati e li estrapoliamo oltre 24m
  const proiettaFat = (mesi) => {
    // Crescita per anno: usiamo crescita24 come tasso annuo di regime
    const crescitaAnnua = crescita24;
    const anni = mesi / 12;
    return [
      Math.round(fat * Math.pow(1 + crescitaAnnua * 0.82, anni) / 1000) * 1000,
      Math.round(fat * Math.pow(1 + crescitaAnnua * 1.18, anni) / 1000) * 1000
    ];
  };

  const fat36 = proiettaFat(36); const fat48 = proiettaFat(48); const fat60 = proiettaFat(60);
  const pct36 = [Math.round((fat36[0]/fat-1)*100), Math.round((fat36[1]/fat-1)*100)];
  const pct48 = [Math.round((fat48[0]/fat-1)*100), Math.round((fat48[1]/fat-1)*100)];
  const pct60 = [Math.round((fat60[0]/fat-1)*100), Math.round((fat60[1]/fat-1)*100)];

  // EBITDA proiettato per ogni orizzonte (con leva operativa)
  const eProj = (fatArr) => ebitdaMargin ? fatArr.map(f => Math.round(f * ebitdaMargin * leva / 1000) * 1000) : [null, null];
  const [ep6min,ep6max]   = eProj(fat6);
  const [ep12min,ep12max] = eProj(fat12);
  const [ep24min,ep24max] = eProj(fat24);
  const [ep36min,ep36max] = eProj(fat36);
  const [ep48min,ep48max] = eProj(fat48);
  const [ep60min,ep60max] = eProj(fat60);

  // Delta EBITDA annualizzato per ogni orizzonte
  // A 6m: annualizziamo il delta semestrale (×2) per confronto equo con il costo annuo
  const deltaAnnuo = (epMin, epMax) => ebitdaBase ? [epMin - ebitdaBase, epMax - ebitdaBase] : [null, null];
  const [d6min,d6max]   = deltaAnnuo(ep6min,  ep6max);
  const [d12min,d12max] = deltaAnnuo(ep12min, ep12max);
  const [d24min,d24max] = deltaAnnuo(ep24min, ep24max);
  const [d36min,d36max] = deltaAnnuo(ep36min, ep36max);
  const [d48min,d48max] = deltaAnnuo(ep48min, ep48max);
  const [d60min,d60max] = deltaAnnuo(ep60min, ep60max);

  // EBITDA netto = delta EBITDA annualizzato - costo annuo ricorrente
  // (una tantum già assorbita nel calcolo del costo totale per il primo periodo)
  const costoAnnuo = Math.round(costoRicorrenteMensile * 12 / 1000) * 1000;
  const netto = (dMin, dMax) => dMin !== null ? [dMin - costoAnnuo, dMax - costoAnnuo] : [null, null];
  const [ebitdaNettoMin6,  ebitdaNettoMax6]  = netto(d6min,  d6max);
  const [ebitdaNettoMin12, ebitdaNettoMax12] = netto(d12min, d12max);
  const [ebitdaNettoMin24, ebitdaNettoMax24] = netto(d24min, d24max);
  const [ebitdaNettoMin36, ebitdaNettoMax36] = netto(d36min, d36max);
  const [ebitdaNettoMin48, ebitdaNettoMax48] = netto(d48min, d48max);
  const [ebitdaNettoMin60, ebitdaNettoMax60] = netto(d60min, d60max);

  const deltaEbitda24min = d24min; const deltaEbitda24max = d24max;

  // Breakeven: primo orizzonte in cui il delta EBITDA annualizzato copre il costo annuo
  const breakevenMesi = !ebitdaBase ? null :
    (ebitdaNettoMin6  !== null && ebitdaNettoMin6  >= 0) ? 6  :
    (ebitdaNettoMin12 !== null && ebitdaNettoMin12 >= 0) ? 12 :
    (ebitdaNettoMin24 !== null && ebitdaNettoMin24 >= 0) ? 24 :
    (ebitdaNettoMin36 !== null && ebitdaNettoMin36 >= 0) ? 36 :
    (ebitdaNettoMin48 !== null && ebitdaNettoMin48 >= 0) ? 48 :
    (ebitdaNettoMin60 !== null && ebitdaNettoMin60 >= 0) ? 60 : null;

  // Interpolazione per breakeven più preciso
  let breakevenStr = breakevenMesi ? breakevenMesi + ' mesi' : 'oltre 60 mesi';
  if (!breakevenMesi) {
    // Cerca tra coppie di orizzonti adiacenti dove il netto cambia segno
    const orizzonti = [[6,ebitdaNettoMin6],[12,ebitdaNettoMin12],[24,ebitdaNettoMin24],[36,ebitdaNettoMin36],[48,ebitdaNettoMin48],[60,ebitdaNettoMin60]];
    for (let i = 0; i < orizzonti.length - 1; i++) {
      const [m1, n1] = orizzonti[i]; const [m2, n2] = orizzonti[i+1];
      if (n1 !== null && n2 !== null && n1 < 0 && n2 >= 0) {
        const mesi = Math.round(m1 + (m2 - m1) * (-n1 / (n2 - n1)));
        breakevenStr = '~' + mesi + ' mesi'; break;
      }
    }
  }

  const costoTot6 = costoPerMesi(6);
  const sostenibilita = {
    m6: ebitdaNettoMin6 !== null && ebitdaNettoMin6 >= 0,
    m12: ebitdaNettoMin12 !== null && ebitdaNettoMin12 >= 0,
    m24: ebitdaNettoMin24 !== null && ebitdaNettoMin24 >= 0,
    breakeven: breakevenMesi, breakevenStr
  };

  // ROI aggiornato con costo totale corretto
  const costoTot24upd = costoPerMesi(24);
  const deltaMin24upd = fat24[0] - fat;
  const deltaMax24upd = fat24[1] - fat;
  const roiMin24 = costoTot24upd > 0 ? Math.round((deltaMin24upd / costoTot24upd) * 10) / 10 : null;
  const roiMax24 = costoTot24upd > 0 ? Math.round((deltaMax24upd / costoTot24upd) * 10) / 10 : null;

  return {
    fat, fatBase, ebitdaMargin,
    ebitdaMarginPct: ebitdaMargin ? Math.round(ebitdaMargin*1000)/10 : null,
    ebitdaBase,
    nDimAttive: usaOrganica ? DIMS_IDS.filter(id=>(dims[id]||0)>0).length : attive2.length,
    // Orizzonti fatturato
    fat6, fat12, fat24, fat36, fat48, fat60,
    pct6, pct12, pct24, pct36, pct48, pct60,
    // EBITDA proiettato
    ebitda24min: ep24min, ebitda24max: ep24max,
    // EBITDA netto (delta - costo annuo ricorrente)
    ebitdaNettoMin6, ebitdaNettoMax6,
    ebitdaNettoMin12, ebitdaNettoMax12,
    ebitdaNettoMin24, ebitdaNettoMax24,
    ebitdaNettoMin36, ebitdaNettoMax36,
    ebitdaNettoMin48, ebitdaNettoMax48,
    ebitdaNettoMin60, ebitdaNettoMax60,
    deltaEbitda24min, deltaEbitda24max,
    // Costi
    costoRicorrenteMensile: Math.round(costoRicorrenteMensile/100)*100,
    costoUnaTantumTot: Math.round(costoUnaTantumTot/100)*100,
    costoMensileTot: Math.round(costoRicorrenteMensile/100)*100,
    costoAnnuo,
    costoTot6, costoTot24: costoTot24upd,
    // ROI e sostenibilità
    roiMin: roiMin24, roiMax: roiMax24,
    dimAttive: attive,
    penalitaPerDim,
    alertSbilanciamento,
    sostenibilita
  };
}


function _buildGraficoTimeline(p) {
  if (!p) return '';
  var fmtF = function(v) { return v >= 1000000 ? (v/1000000).toFixed(1)+'M' : Math.round(v/1000)+'k'; };
  const settore = p.settore || '';
  const dims = p.dims || {};
  const targets = p.targets || {};
  const fat = p.fatturato_anno_1 || 0;
  if (!fat) return '<div class="tl-empty">Inserisci il fatturato per vedere le proiezioni.</div>';

  const ic = _calcolaImpattoCumulativo(p);
  if (!ic) return '<div class="tl-empty">Imposta i target per vedere le proiezioni.</div>';

  const fat12min = ic.fat12 ? ic.fat12[0] : fat;
  const fat12max = ic.fat12 ? ic.fat12[1] : fat;
  const fat24min = ic.fat24 ? ic.fat24[0] : fat;
  const fat24max = ic.fat24 ? ic.fat24[1] : fat;
  const fat6min  = ic.fat6  ? ic.fat6[0]  : fat;
  const fat6max  = ic.fat6  ? ic.fat6[1]  : fat;
  const costoMensile = ic.costoMensileTot || 0;
  const breakevenStr = ic.sostenibilita?.breakevenStr || '\u2014';
  const roiMin = ic.roiMin !== null ? ic.roiMin : null;
  const roiMax = ic.roiMax !== null ? ic.roiMax : null;
  const roiStr = (roiMin !== null && roiMax !== null) ? roiMin.toFixed(1) + '\u2013' + roiMax.toFixed(1) + 'x' : '\u2014';
  const costoLabel = costoMensile > 0 ? '\u2248' + fmtF(costoMensile) + '\u20AC/mese' : '\u2014';

  const pct12min = fat ? Math.round((fat12min - fat) / fat * 100) : 0;
  const pct12max = fat ? Math.round((fat12max - fat) / fat * 100) : 0;

  // Punti grafico linee: oggi, 3m, 6m, 12m, 18m, 24m
  const pts = {
    base: [fat, fat, fat, fat, fat, fat],
    min:  [fat, Math.round(fat+(fat6min-fat)*0.5), fat6min, fat12min, Math.round(fat12min+(fat24min-fat12min)*0.5), fat24min],
    max:  [fat, Math.round(fat+(fat6max-fat)*0.5), fat6max, fat12max, Math.round(fat12max+(fat24max-fat12max)*0.5), fat24max],
  };

  // Dimensioni con gap
  const DIMS_IDS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  const _getDimLabel = typeof window.getDimLabel === 'function' ? window.getDimLabel : function(s, id){ return id; };
  const dimsHtml = DIMS_IDS.map(function(d) {
    const cur = dims[d] || 1;
    const tgt = targets[d] || cur;
    const haGap = tgt > cur;
    const curPct = Math.round((cur - 1) / 4 * 100);
    const tgtPct = Math.round((tgt - 1) / 4 * 100);
    const badgeClass = haGap ? 'tl-badge-gap' : 'tl-badge-ok';
    const badgeText = haGap ? (cur + ' \u2192 ' + tgt) : ('livello ' + cur);
    return '<div class="tl-dim-row">' +
      '<div class="tl-dim-header">' +
        '<span class="tl-dim-name">' + _getDimLabel(settore, d) + '</span>' +
        '<span class="tl-dim-badge ' + badgeClass + '">' + badgeText + '</span>' +
      '</div>' +
    '</div>';
  }).join('');

  // Azioni prioritarie (prime 3 con gap)
  const azioniHtml = DIMS_IDS.filter(function(d){ return (targets[d]||0) > (dims[d]||1); })
    .slice(0, 3)
    .map(function(d) {
      const cur = dims[d] || 1;
      const tgt = targets[d] || cur;
      const stepKey = String(cur + 1);
      const desc = (AZIONI_TARGET_BY_SETTORE?.[settore]?.[d]?.[stepKey] || '').split('.')[0];
      const detail = typeof getStepDetail === 'function' ? getStepDetail(settore, d, stepKey) : null;
      const costoStr = detail ? (detail.costo_mensile > 0 ? '\u2248' + detail.costo_mensile.toLocaleString('it-IT') + '\u20AC/mese' : 'Nessun costo') + ' \u00B7 Operativo in ~' + detail.tempo_mesi + ' ' + (detail.tempo_mesi === 1 ? 'mese' : 'mesi') : '';
      const colors = {vendite:'#378ADD',pipeline:'#1CB889',ecommerce:'#BA7517',marketing:'#BA7517',team:'#378ADD',processi:'#888780',ricavi:'#1CB889',sitoweb:'#888780'};
      const col = colors[d] || '#888780';
      return '<div class="tl-azione-row">' +
        '<div class="tl-azione-dot" style="background:' + col + '"></div>' +
        '<div>' +
          '<div class="tl-azione-text">' + _getDimLabel(settore, d) + ' ' + stepKey + ' \u2014 ' + (desc || '\u2014') + '</div>' +
          (costoStr ? '<div class="tl-azione-costo">' + costoStr + '</div>' : '') +
        '</div>' +
      '</div>';
    }).join('') || '<div class="tl-azione-row"><div class="tl-azione-text" style="color:var(--text-muted)">Imposta i target per vedere le azioni prioritarie.</div></div>';

  const chartId = 'tl-line-chart-' + p.id;

  const html = '<div class="tl-wrap">' +

    // 1. CARD METRICHE
    '<div class="tl-section-label">Quadro economico</div>' +
    '<div class="tl-metric-cards">' +
      '<div class="tl-mc"><div class="tl-mc-label">Fatturato attuale</div><div class="tl-mc-val">' + fmtF(fat) + '\u20AC</div><div class="tl-mc-sub">anno corrente</div></div>' +
      '<div class="tl-mc"><div class="tl-mc-label">Proiezione 12 mesi</div><div class="tl-mc-val tl-green">' + fmtF(fat12min) + '\u2013' + fmtF(fat12max) + '\u20AC</div><div class="tl-mc-sub">+' + pct12min + '\u2013' + pct12max + '%</div></div>' +
      '<div class="tl-mc"><div class="tl-mc-label">Investimento piano</div><div class="tl-mc-val tl-blue">' + costoLabel + '</div><div class="tl-mc-sub">costi fissi mensili</div></div>' +
      '<div class="tl-mc"><div class="tl-mc-label">ROI stimato</div><div class="tl-mc-val tl-amber">' + roiStr + '</div><div class="tl-mc-sub">breakeven ' + breakevenStr + '</div></div>' +
    '</div>' +

    // 2. GRAFICO LINEE
    '<div class="tl-divider"></div>' +
    '<div class="tl-section-label">Proiezione fatturato</div>' +
    '<div class="tl-legend">' +
      '<span class="tl-leg-item"><span class="tl-leg-dot" style="background:#B4B2A9"></span>Base attuale</span>' +
      '<span class="tl-leg-item"><span class="tl-leg-dot" style="background:#85B7EB"></span>Scenario minimo</span>' +
      '<span class="tl-leg-item"><span class="tl-leg-dot" style="background:#1CB889"></span>Scenario massimo</span>' +
    '</div>' +
    '<div class="tl-chart-wrap"><canvas id="' + chartId + '"></canvas></div>' +

    // 3. DIMENSIONI
    '<div class="tl-divider"></div>' +
    '<div class="tl-section-label">Dimensioni \u2014 livello attuale vs target</div>' +
    '<div class="tl-dims-grid">' + dimsHtml + '</div>' +

    // 4. AZIONI PRIORITARIE
    '<div class="tl-divider"></div>' +
    '<div class="tl-section-label">Prossime azioni</div>' +
    '<div class="tl-azioni-box">' + azioniHtml + '</div>' +

  '</div>';

  // Inizializza Chart.js dopo il render
  setTimeout(function() {
    const canvas = document.getElementById(chartId);
    if (!canvas || !window.Chart) return;
    if (canvas._chartInstance) canvas._chartInstance.destroy();
    canvas._chartInstance = new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Oggi','3 mesi','6 mesi','12 mesi','18 mesi','24 mesi'],
        datasets: [
          {
            label: 'Base attuale',
            data: pts.base,
            borderColor: '#B4B2A9',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [5,5],
            pointRadius: 0,
            tension: 0,
          },
          {
            label: 'Scenario minimo',
            data: pts.min,
            borderColor: '#85B7EB',
            backgroundColor: 'rgba(133,183,235,0.08)',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#85B7EB',
            fill: false,
            tension: 0.35,
          },
          {
            label: 'Scenario massimo',
            data: pts.max,
            borderColor: '#1CB889',
            backgroundColor: 'rgba(28,184,137,0.08)',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#1CB889',
            fill: '-1',
            tension: 0.35,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function(ctx) { return ctx.dataset.label + ': ' + fmtF(ctx.parsed.y) + '\u20AC'; }
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 } } },
          y: {
            grid: { color: 'rgba(128,128,128,0.1)' },
            ticks: { font: { size: 11 }, callback: function(v) { return fmtF(v) + '\u20AC'; } },
            min: Math.round(fat * 0.8 / 10000) * 10000,
          }
        }
      }
    });
  }, 100);

  return html;
}
window._buildGraficoTimeline = _buildGraficoTimeline;

function _buildGraficoTimeline_OLD(p) {
  const DIMS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  const DIM_LABELS_MAP = {
    vendite:'Vendite', pipeline:'Pipeline', team:'Team',
    processi:'Processi', ricavi:'Ricavi', marketing:'Marketing',
    sitoweb:'Sito Web', ecommerce: typeof getDimLabel === 'function' ? getDimLabel(p.settore,'ecommerce') : 'Ecommerce'
  };

  const history = (p.score_history||[]).filter(s => s.score > 0).sort((a,b)=>new Date(a.data)-new Date(b.data));
  const targets = p.targets || {};
  const dimsAttuali = p.dims || {};

  const scoreTarget = Object.keys(targets).length
    ? Math.round((Object.values(targets).reduce((a,b)=>a+parseInt(b),0)/(Object.keys(targets).length*5))*100)
    : 70;
  const scoreAttuale = history.length ? history[history.length-1].score : 0;
  const gap = scoreTarget - scoreAttuale;
  const sessioni = history.length;

  // Calcola fatturato proiettato 12m da _calcolaImpattoCumulativo se disponibile
  let fat12m = null, fat12pct = null, breakeven = null, roi24 = null, costoMensile = 0, costoTot6 = null;
  try {
    const ic = _calcolaImpattoCumulativo(p);
    if (ic) {
      fat12m = ic.fat12 ? Math.round((ic.fat12[0] + ic.fat12[1]) / 2) : null;
      fat12pct = ic.pct12 ? Math.round((ic.pct12[0] + ic.pct12[1]) / 2) : null;
      breakeven = ic.sostenibilita ? ic.sostenibilita.breakeven : null;
      roi24 = (ic.roiMin !== null && ic.roiMax !== null) ? ((ic.roiMin + ic.roiMax) / 2).toFixed(1) : null;
      costoMensile = ic.costoMensileTot || 0;
      costoTot6 = ic.costoTot6 || null;
    }
  } catch(e) {}

  const fat12Str = fat12m ? (fat12m >= 1000000 ? (fat12m/1000000).toFixed(1)+'M\u20AC' : Math.round(fat12m/1000)+'k\u20AC') : '\u2014';
  const fat12PctStr = fat12pct ? '+'+fat12pct+'%' : '';
  const breakevenStr = breakeven ? breakeven+'m' : '\u2014';
  const roiStr = roi24 ? roi24+'x' : '\u2014';
  const costoLabel = costoMensile > 0 ? costoMensile.toLocaleString('it-IT') + '\u20AC/mese' : '\u2014';
  const costo6Str = costoTot6 ? Math.round((costoTot6[0]+costoTot6[1])/2).toLocaleString('it-IT')+'\u20AC in 6 mesi' : '';

  // Metric cards
  const metriche =
    '<div class="tl-metrics">' +
      '<div class="tl-metric">' +
        '<div class="tl-metric-label">Score attuale</div>' +
        '<div class="tl-metric-val">' + scoreAttuale + '</div>' +
        '<div class="tl-metric-sub">su 100</div>' +
      '</div>' +
      '<div class="tl-metric">' +
        '<div class="tl-metric-label">Score target</div>' +
        '<div class="tl-metric-val tl-blue">' + scoreTarget + '</div>' +
        '<div class="tl-metric-sub">gap ' + (gap>0?'+'+gap:gap) + '</div>' +
      '</div>' +
      '<div class="tl-metric">' +
        '<div class="tl-metric-label">Fatturato 12m</div>' +
        '<div class="tl-metric-val tl-green">' + fat12Str + '</div>' +
        '<div class="tl-metric-sub">' + fat12PctStr + '</div>' +
      '</div>' +
      '<div class="tl-metric">' +
        '<div class="tl-metric-label">Breakeven piano</div>' +
        '<div class="tl-metric-val tl-orange">' + breakevenStr + '</div>' +
        '<div class="tl-metric-sub">ROI 24m: ' + roiStr + '</div>' +
      '</div>' +
      '<div class="tl-metric">' +
        '<div class="tl-metric-label">Investimento mensile</div>' +
        '<div class="tl-metric-val gmc-investimento" style="color:var(--gold,#C8A84B)">' + costoLabel + '</div>' +
        '<div class="tl-metric-sub">' + costo6Str + '</div>' +
      '</div>' +
    '</div>';

  if (history.length < 1) {
    return metriche + '<div class="tl-empty">Registra la prima sessione per visualizzare la progressione nel tempo.</div>';
  }

  const chartId = 'tl-chart-' + p.id;

  // Dati grafico score + fatturato
  const oggi = new Date();
  const labels = [];
  const dataScore = [];
  const dataScoreProj = [];
  const dataFat = p.fatturato_anno_1 ? [] : null;
  const dataFatProj = fat12m && p.fatturato_anno_1 ? [] : null;

  history.forEach(function(s) {
    const label = new Date(s.data).toLocaleDateString('it-IT',{day:'2-digit',month:'2-digit'});
    labels.push(label);
    dataScore.push(s.score);
    dataScoreProj.push(null);
    if (dataFat) dataFat.push(Math.round(p.fatturato_anno_1/1000));
    if (dataFatProj) dataFatProj.push(null);
  });

  const ultimaData = new Date(history[history.length-1].data);
  if (oggi > ultimaData) {
    labels.push('Oggi');
    dataScore.push(scoreAttuale);
    dataScoreProj.push(scoreAttuale);
    if (dataFat) dataFat.push(Math.round(p.fatturato_anno_1/1000));
    if (dataFatProj) dataFatProj.push(Math.round(p.fatturato_anno_1/1000));
  } else {
    dataScoreProj[dataScoreProj.length-1] = scoreAttuale;
    if (dataFatProj) dataFatProj[dataFatProj.length-1] = Math.round(p.fatturato_anno_1/1000);
  }

  [3,6,12].forEach(function(m) {
    const scoreP = Math.min(scoreTarget, Math.round(scoreAttuale + (scoreTarget-scoreAttuale)*(m/12)));
    const fatP = fat12m ? Math.round(p.fatturato_anno_1/1000 + (fat12m/1000 - p.fatturato_anno_1/1000)*(m/12)) : null;
    labels.push('+'+m+'m');
    dataScore.push(null);
    dataScoreProj.push(scoreP);
    if (dataFat) dataFat.push(null);
    if (dataFatProj) dataFatProj.push(fatP);
  });

  const oggiIdx = labels.indexOf('Oggi');

  // Timeline sessioni HTML
  const sessioniHtml = history.length ? history.slice().reverse().map(function(s,i) {
    const data = new Date(s.data).toLocaleDateString('it-IT',{day:'2-digit',month:'2-digit',year:'numeric'});
    const isLast = i === 0;
    const dimChips = s.dims && Object.keys(s.dims).length ? DIMS.map(function(d) {
      const val = s.dims[d];
      if (!val) return '';
      const prev = history[history.length-1-i-1] ? history[history.length-1-i-1].dims?.[d] : undefined;
      const delta = prev !== undefined ? val - prev : 0;
      const color = delta > 0 ? 'tl-chip-up' : delta < 0 ? 'tl-chip-down' : 'tl-chip-eq';
      const arrow = delta > 0 ? ' \u2191' : delta < 0 ? ' \u2193' : '';
      return '<span class="tl-chip ' + color + '">' + DIM_LABELS_MAP[d] + ' ' + val + '/5' + arrow + '</span>';
    }).filter(Boolean).join('') : '';
    return '<div class="tl-sess-item">' +
      '<div class="tl-sess-dot ' + (isLast?'tl-sess-dot-active':'') + '"></div>' +
      '<div class="tl-sess-card">' +
        '<div class="tl-sess-header">' +
          '<span class="tl-sess-evento">' + (s.evento||'Sessione') + '</span>' +
          '<span class="tl-sess-meta">' + data + ' \u00B7 score ' + s.score + '</span>' +
        '</div>' +
        (s.nota ? '<div class="tl-sess-nota">"' + s.nota + '"</div>' : '') +
        (dimChips ? '<div class="tl-sess-chips">' + dimChips + '</div>' : '') +
      '</div>' +
    '</div>';
  }).join('') : '<div class="tl-empty">Nessuna sessione ancora.</div>';

  // Barre dimensioni attuale vs target
  const dimBarre = DIMS.map(function(d) {
    const att = dimsAttuali[d]||1;
    const tgt = targets[d]||att;
    const attPct = Math.round((att/5)*100);
    const tgtPct = Math.round((tgt/5)*100);
    const deltaStr = tgt > att ? '\u2192'+tgt : tgt < att ? '\u2192'+tgt : '='+tgt;
    const deltaColor = tgt > att ? 'tl-blue' : tgt < att ? 'tl-red' : 'tl-muted';
    return '<div class="tl-dim-row">' +
      '<div class="tl-dim-label">' + DIM_LABELS_MAP[d] + '</div>' +
      '<div class="tl-dim-bar-wrap">' +
        '<div class="tl-dim-bar-bg">' +
          '<div class="tl-dim-bar-att" style="width:' + attPct + '%"></div>' +
          '<div class="tl-dim-bar-tgt" style="width:' + tgtPct + '%"></div>' +
        '</div>' +
        '<span class="tl-dim-val">' + att + '/5</span>' +
        '<span class="tl-dim-delta ' + deltaColor + '">' + deltaStr + '</span>' +
      '</div>' +
    '</div>';
  }).join('');

  setTimeout(function() {
    if (typeof Chart === 'undefined') return;
    const c = document.getElementById(chartId);
    if (!c) return;
    if (c._chart) c._chart.destroy();

    const oggiPlugin = {id:'oggiTL',afterDraw:function(ch){
      if (oggiIdx<0) return;
      const ctx=ch.ctx,chartArea=ch.chartArea,scales=ch.scales;
      const x=scales.x.getPixelForValue(oggiIdx);
      ctx.save();ctx.beginPath();ctx.moveTo(x,chartArea.top);ctx.lineTo(x,chartArea.bottom);
      ctx.strokeStyle='#e67e22';ctx.lineWidth=1.5;ctx.setLineDash([4,3]);ctx.stroke();
      ctx.fillStyle='#e67e22';ctx.font='10px sans-serif';
      ctx.fillText('Oggi',x+4,chartArea.top+12);ctx.restore();
    }};

    const datasets = [
      {label:'Score reale',data:dataScore,borderColor:'#2c3e50',backgroundColor:'#2c3e50',borderWidth:2.5,pointRadius:dataScore.map(function(v){return v!==null?5:0;}),pointBackgroundColor:'#2c3e50',pointBorderColor:'#fff',pointBorderWidth:2,spanGaps:false,tension:0.3,yAxisID:'y'},
      {label:'Proiezione score',data:dataScoreProj,borderColor:'#185FA5',backgroundColor:'rgba(24,95,165,0.06)',borderWidth:2,borderDash:[6,3],pointRadius:3,spanGaps:false,tension:0.3,fill:'origin',yAxisID:'y'},
    ];

    if (dataFat && p.fatturato_anno_1) {
      datasets.push({label:'Fatturato',data:dataFat,borderColor:'#3B6D11',backgroundColor:'rgba(99,153,34,0.18)',borderWidth:0,pointRadius:0,spanGaps:true,tension:0.4,fill:true,yAxisID:'y2'});
      if (dataFatProj) datasets.push({label:'Fatturato proiettato',data:dataFatProj,borderColor:'#639922',backgroundColor:'transparent',borderWidth:1.5,borderDash:[5,3],pointRadius:0,spanGaps:true,tension:0.4,yAxisID:'y2'});
    }

    const scales = {
      x:{grid:{color:'rgba(0,0,0,0.04)'},ticks:{font:{size:11},color:'#888',autoSkip:false,maxRotation:0}},
      y:{min:0,max:100,position:'left',grid:{color:'rgba(0,0,0,0.05)'},ticks:{font:{size:11},color:'#888'},title:{display:true,text:'Score',font:{size:10},color:'#aaa'}},
    };
    if (dataFat && p.fatturato_anno_1) {
      const fatBase = Math.round(p.fatturato_anno_1/1000);
      scales.y2 = {min:Math.round(fatBase*0.9),max:fat12m?Math.round(fat12m/1000*1.1):Math.round(fatBase*1.3),position:'right',grid:{display:false},ticks:{font:{size:11},color:'#639922',callback:function(v){return v+'k\u20AC';}},title:{display:true,text:'Fatturato',font:{size:10},color:'#639922'}};
    }

    c._chart = new Chart(c,{type:'line',plugins:[oggiPlugin],data:{labels:labels,datasets:datasets},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{display:false}},scales:scales}});
  },150);

  const fatLegend = p.fatturato_anno_1
    ? '<span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:10px;background:rgba(99,153,34,0.2);border:1px solid #639922;display:inline-block;border-radius:2px"></span>Fatturato (dx)</span>'
    : '';

  // Proiezione crescita e investimento
  var proiezioneHtml = '';
  try {
    var ic2 = _calcolaImpattoCumulativo(p);
    if (ic2 && ic2.fat6) {
      var projRows = [
        { label:'6 mesi',  fat: ic2.fat6,  pct: ic2.pct6  },
        { label:'12 mesi', fat: ic2.fat12, pct: ic2.pct12 },
        { label:'24 mesi', fat: ic2.fat24, pct: ic2.pct24 },
        { label:'36 mesi', fat: ic2.fat36, pct: ic2.pct36 },
      ].filter(function(r) { return r.fat && r.fat[0]; });

      var fmtF = function(v) { return v >= 1000000 ? (v/1000000).toFixed(1)+'M\u20AC' : Math.round(v/1000)+'k\u20AC'; };
      var fmtR = function(arr) { return arr ? fmtF(arr[0])+'\u2013'+fmtF(arr[1]) : '\u2014'; };
      var fmtP = function(arr) { return arr ? '+'+arr[0]+'\u2013'+arr[1]+'%' : '\u2014'; };

      var costoMensileStr = ic2.costoMensileTot ? '\u2248'+fmtF(ic2.costoMensileTot)+'/mese' : '\u2014';
      var totale24 = ic2.costoTot24 ? '\u2248 '+fmtF(ic2.costoTot24)+' totali 24m' : '';
      var roi24str2 = (ic2.roiMin !== null && ic2.roiMax !== null) ? ((ic2.roiMin + ic2.roiMax) / 2).toFixed(1)+'x' : '\u2014';

      var tableRows = projRows.map(function(r) {
        return '<tr class="tl-proj-row">' +
          '<td class="tl-proj-td tl-proj-label">' + r.label + '</td>' +
          '<td class="tl-proj-td tl-proj-fat">' + fmtR(r.fat) + '</td>' +
          '<td class="tl-proj-td tl-proj-pct">' + fmtP(r.pct) + '</td>' +
          '<td class="tl-proj-td tl-proj-cost">' + costoMensileStr + '</td>' +
        '</tr>';
      }).join('');

      proiezioneHtml =
        '<div class="tl-section-title" style="margin-top:16px">Proiezione crescita e investimento</div>' +
        '<table class="tl-proj-table">' +
          '<thead><tr>' +
            '<th class="tl-proj-th">Orizzonte</th>' +
            '<th class="tl-proj-th">Fatturato</th>' +
            '<th class="tl-proj-th">Crescita</th>' +
            '<th class="tl-proj-th">Investimento</th>' +
          '</tr></thead>' +
          '<tbody>' + tableRows + '</tbody>' +
        '</table>' +
        '<div class="tl-proj-footer">' +
          '<span>' + totale24 + '</span>' +
          '<span>ROI stimato 24m: <b>' + roi24str2 + '</b></span>' +
        '</div>';
    }
  } catch(e) {}

  return metriche +
    '<div class="tl-section-title" style="margin-top:16px">Progressione score e fatturato nel tempo</div>' +
    '<div style="display:flex;gap:12px;margin-bottom:6px;font-size:11px;color:#888;flex-wrap:wrap">' +
      '<span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:3px;background:#2c3e50;display:inline-block;border-radius:2px"></span>Score reale</span>' +
      '<span style="display:flex;align-items:center;gap:4px"><span style="width:10px;height:2px;border-top:2px dashed #185FA5;display:inline-block"></span>Proiezione score</span>' +
      fatLegend +
    '</div>' +
    '<div style="position:relative;width:100%;height:220px;margin-bottom:20px">' +
      '<canvas id="' + chartId + '"></canvas>' +
    '</div>' +
    '<div class="tl-section-title">Sessioni registrate</div>' +
    '<div class="tl-sessioni">' + sessioniHtml + '</div>' +
    '<div class="tl-section-title" style="margin-top:16px">Dimensioni \u2014 attuale vs target</div>' +
    '<div class="tl-dims">' + dimBarre + '</div>' +
    proiezioneHtml;
}

function _buildCronistoria(p) {
  const history = p.score_history || [];
  if (history.length === 0) return '';

  const fmt = (d) => {
    const dt = new Date(d);
    return dt.toLocaleDateString('it-IT', {day:'2-digit', month:'short', year:'numeric'}) +
           ' ' + dt.toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'});
  };
  const scoreCol = (s) => s >= 70 ? '#2E7D32' : s >= 45 ? '#B8842E' : '#C62828';

  const scrollHint = history.length > 4
    ? '<div style="font-size:10px;color:var(--text-muted);text-align:right;margin-bottom:4px;">\u2195 scorri per vedere tutti gli aggiornamenti</div>'
    : '';
  let html = '<div style="margin-top:20px;">';
  html += scrollHint;
  const containerStyle = history.length > 4
    ? 'max-height:240px;overflow-y:scroll;padding-right:8px;'
    : '';
  html += '<div style="' + containerStyle + '">';

  history.slice().reverse().forEach((snap, idx) => {
    const col = scoreCol(snap.score);
    html += '<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:12px;">';
    // Dot
    html += '<div style="width:10px;height:10px;border-radius:50%;background:' + col + ';border:2px solid #fff;flex-shrink:0;margin-top:4px;"></div>';
    // Content
    html += '<div style="flex:1;">';
    html += '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:7px 10px">';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">';
    html += '<div style="font-size:10px;font-weight:700;color:' + col + '">' + snap.evento + '</div>';
    html += '<div style="font-size:18px;font-weight:700;font-family:\'DM Serif Display\',serif;color:' + col + '">' + snap.score + '<span style="font-size:10px;color:var(--gray)">/100</span></div>';
    html += '</div>';
    html += '<div style="font-size:9px;color:var(--gray)">' + fmt(snap.data) + (snap.nota ? ' · ' + snap.nota : '') + '</div>';
    if (snap.score_base && snap.score_base !== snap.score) {
      html += '<div style="font-size:9px;color:var(--gray);margin-top:2px">Score base: ' + snap.score_base + ' · Live: ' + snap.score + '</div>';
    }
    html += '</div></div></div>';
  });

  html += '</div></div>';
  return html;
}



// Mostra input per azione custom
function aggiungiAzioneCustom(stepKey) {
  const input = document.getElementById('custom-input-' + stepKey);
  if (input) { input.style.display = 'block'; document.getElementById('custom-text-' + stepKey).focus(); }
}

// Salva azione custom nel prospect
async function salvaAzioneCustom(stepKey) {
  const inputEl = document.getElementById('custom-text-' + stepKey);
  if (!inputEl) return;
  const testo = inputEl.value.trim();
  if (!testo) return;
  const p = prospects.find(x => x.id === currentId);
  if (!p) return;
  const azioniCustom = Object.assign({}, p.azioni_custom || {});
  if (!azioniCustom[stepKey]) azioniCustom[stepKey] = [];
  azioniCustom[stepKey].push(testo);
  await sb.from('prospects').update({ azioni_custom: azioniCustom }).eq('id', currentId);
  const i = prospects.findIndex(x => x.id === currentId);
  prospects[i].azioni_custom = azioniCustom;
  inputEl.value = '';
  document.getElementById('custom-input-' + stepKey).style.display = 'none';
  // Rirenderizzo solo il blocco
  const block = document.getElementById('az-block-' + stepKey.split('_')[0]);
  const pi = prospects[i];
  if (block) block.innerHTML = '';
  showToast('Azione aggiunta!');
}

function renderTargetEditor(p) {
  const container = document.getElementById('target-editor-content');
  if (container) container.innerHTML = '';
  const targets = p.targets || {};
  const scadenze = p.target_scadenze || {};
  const settore = p.settore || '';
  const azioniDone = p.azioni_completate || {};
  const azioniCustom = p.azioni_custom || {};
  let html = DIMS.map(d => {
    const cur = p.dims?.[d.id] || 0;
    const savedTgt = (d.id in targets) ? targets[d.id] : null;
    const tgt = (savedTgt !== null && savedTgt > 0) ? savedTgt : cur;
    const scad = scadenze[d.id] || '';
    const curCol = cur >= 4 ? 'var(--green)' : cur >= 3 ? 'var(--gold)' : 'var(--red)';
    const tgtCol = tgt >= 4 ? 'var(--green)' : tgt >= 3 ? 'var(--gold)' : 'var(--red)';
    const azioniDim = (AZIONI_TARGET_BY_SETTORE[settore] || {})[d.id] || {};
    const curLvl = Math.max(cur, 1);
    const tgtLvl = Math.max(tgt, 1);
    const curStepKey = String(Math.min(curLvl, 5));
    const curDesc = azioniDim[curStepKey] || '—';
    const tgtStepKey = String(Math.min(tgtLvl, 5));
    const tgtDesc = azioniDim[tgtStepKey] || '—';
    const subObiettiviHtml = '';
    // Warning tetto strutturale
    const tettoSettore = (TETTO_BY_SETTORE[settore] || {})[d.id] || 5;
    const warningTetto = tgt > tettoSettore
      ? `\x3cdiv class="tetto-warning">&#9888;&#65039; Obiettivo oltre il tetto strutturale (max ${tettoSettore}) — questa scelta implica un cambio di modello di business\x3c/div>`
      : '';
    return `\x3cdiv style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid var(--border)">
      \x3cdiv style="font-size:12px;font-weight:600;color:var(--white);margin-bottom:6px">${getDimLabel(settore, d.id)}\x3c/div>
      \x3cdiv style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:6px">
        \x3cdiv style="background:var(--bg3);border-radius:var(--rs);padding:7px 10px">
          \x3cdiv style="font-size:9px;color:var(--gray);letter-spacing:.05em;text-transform:uppercase;margin-bottom:3px">Stato attuale\x3c/div>
          \x3cdiv style="font-size:13px;font-weight:600;color:${curCol}">${cur}/5\x3c/div>
          \x3cdiv style="font-size:10px;color:${curCol};line-height:1.4;margin-top:2px">${curDesc}\x3c/div>
        \x3c/div>
        \x3cdiv style="background:var(--amber-bg);border:1px solid var(--gold-dim);border-radius:var(--rs);padding:7px 10px">
          \x3cdiv style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
            \x3cdiv style="font-size:9px;color:var(--gold);letter-spacing:.05em;text-transform:uppercase">Obiettivo finale\x3c/div>
            \x3cspan id="tsem-${d.id}" style="font-size:12px;font-weight:700;white-space:nowrap">${scad ? calcolaSemaforo(scad, d.id) : ''}\x3c/span>
          \x3c/div>
          \x3cdiv style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
            \x3cinput class="target-input" type="number" id="tgt-${d.id}" min="1" max="5" value="${tgt}"
              onchange="previewTarget();updateTargetDesc('${d.id}');aggiornaAzioni('${d.id}')" oninput="previewTarget();updateTargetDesc('${d.id}');aggiornaAzioni('${d.id}')">
            \x3cspan style="font-size:10px;color:var(--gray)">/5\x3c/span>
          \x3c/div>
          ${warningTetto}
          \x3cdiv id="tdesc-${d.id}" style="font-size:10px;color:${tgtCol};line-height:1.4;margin-bottom:6px">${tgtDesc}\x3c/div>
          \x3cdiv style="font-size:9px;color:var(--gray);margin-bottom:3px">Entro il\x3c/div>
          \x3cinput type="date" id="tscad-${d.id}" value="${scad}"
            onchange="aggiornaSemaforo('${d.id}')"
            style="width:100%;padding:3px 6px;background:var(--bg3);border:1px solid var(--border2);border-radius:4px;color:var(--white);font-size:11px;font-family:inherit">
        \x3c/div>
      \x3c/div>
      \x3cdiv id="az-block-${d.id}">${subObiettiviHtml}\x3c/div>
    \x3c/div>`;
  }).join('');
    document.getElementById('target-editor-content').innerHTML = html;
  // Aggiorna mega-grafico ogni volta che il target editor viene renderizzato
  const megaSection = document.getElementById('mega-grafico-section');
  if (megaSection) megaSection.innerHTML = '';
}

function previewTarget() {
  const p = prospects.find(x => x.id === currentId);
  if (!p) return;
  const preview = {};
  DIMS.forEach(d => {
    const el = document.getElementById('tgt-' + d.id);
    if (el) preview[d.id] = parseInt(el.value) || 0;
  });
  drawRadar(p.dims || {}, preview, p.settore);
  // Aggiorna mega-grafico e score con i target in anteprima
  const pPreview = {...p, targets: preview};
  const megaSection = document.getElementById('mega-grafico-section');
  if (megaSection) megaSection.innerHTML = '';
  // Aggiorna grafico timeline con target in anteprima
  const tlContainer = document.getElementById('grafico-timeline-container');
  if (tlContainer) tlContainer.innerHTML = _buildGraficoTimeline(pPreview);
  // Aggiorna score box con score target in anteprima
  const sPreview = calcScoreTarget(pPreview);
  const sLivePreview = calcScoreLive(pPreview);
  const scP = scoreColor(sLivePreview);
  const rsnEl = document.getElementById('radar-score-num');
  const rslEl = document.getElementById('radar-score-label');
  const rsbEl = document.getElementById('radar-score-box');
  const barLiveEl = document.getElementById('radar-score-bar-live');
  const barTgtEl = document.getElementById('radar-score-bar-target');
  const baseValEl = document.getElementById('radar-score-base-val');
  const rstElP = document.getElementById('radar-score-target');
  const barWrapEl = document.getElementById('radar-score-bar-wrap');
  if (rsnEl) { rsnEl.textContent = sLivePreview; rsnEl.style.color = scP.text; }
  if (rslEl) { rslEl.textContent = scP.label; rslEl.style.color = scP.text; }
  if (rsbEl) { rsbEl.style.borderColor = scP.border; rsbEl.style.background = sLivePreview >= 70 ? '#e8f5ee' : sLivePreview >= 45 ? '#fdf3e3' : '#fdecea'; }
  if (barWrapEl) barWrapEl.style.display = 'block';
  if (barLiveEl) { barLiveEl.style.width = sLivePreview + '%'; barLiveEl.style.background = scP.text; }
  if (barTgtEl)  barTgtEl.style.width = sPreview + '%';
  if (baseValEl) baseValEl.textContent = calcScore(p) + '/100';
  if (rstElP)    rstElP.textContent = sPreview > sLivePreview ? '↑ ' + sPreview + ' con il piano' : '';
  // Aggiorna costo mensile in tempo reale
  const ic2 = _calcolaImpattoCumulativo({ ...p, targets: preview });
  const costoEl = document.querySelector('.gmc-investimento');
  if (costoEl && ic2?.costoMensileTot) {
    costoEl.textContent = ic2.costoMensileTot.toLocaleString('it-IT') + '€/mese';
  }
}

function updateTargetDesc(dimId) {
  const el = document.getElementById('tgt-' + dimId);
  const descEl = document.getElementById('tdesc-' + dimId);
  if (!el || !descEl) return;
  const tgt = parseInt(el.value) || 1;
  const p = prospects.find(x => x.id === currentId);
  const settore = p?.settore || '';
  const azioniDim = (AZIONI_TARGET_BY_SETTORE[settore] || {})[dimId] || {};
  const tgtLvl = Math.max(tgt, 1);
  const tgtStepKey = String(Math.min(tgtLvl, 5));
  const desc = azioniDim[tgtStepKey] || '—';
  const col = tgt >= 4 ? 'var(--green)' : tgt >= 3 ? 'var(--gold)' : 'var(--red)';
  descEl.textContent = desc;
  descEl.style.color = col;
}



function calcolaSemaforo(scad, dimId) {
  if (!scad) return '';
  const giorni = Math.round((new Date(scad) - new Date()) / 86400000);
  if (giorni < 0) return '\x3cspan style="color:#FF3B30">&#9679; Scaduto\x3c/span>';
  const soglie = {
    team:     [90, 180],
    vendite:  [60, 120],
    ricavi:   [60, 120],
    pipeline: [45, 90],
    marketing:[45, 90],
    processi: [30, 60],
    ecommerce:[30, 60],
    sitoweb:  [20, 45],
  };
  const s = soglie[dimId] || [30, 60];
  // Testo preciso: giorni se < 60, "X sett." se < 90, "X,X mesi" oltre
  var testo;
  if (giorni < 60)       testo = giorni + ' gg';
  else if (giorni < 90)  testo = Math.round(giorni / 7) + ' sett.';
  else                   testo = (giorni / 30).toFixed(1).replace('.', ',') + ' mesi';
  if (giorni <= s[0]) return '\x3cspan style="color:#FF3B30">&#9679; ' + testo + '\x3c/span>';
  if (giorni <= s[1]) return '\x3cspan style="color:#FF9500">&#9679; ' + testo + '\x3c/span>';
  return '\x3cspan style="color:#30D158">&#9679; ' + testo + '\x3c/span>';
}

function aggiornaSemaforo(dimId) {
  const scEl = document.getElementById('tscad-' + dimId);
  const semEl = document.getElementById('tsem-' + dimId);
  if (scEl && semEl) semEl.innerHTML = calcolaSemaforo(scEl.value, dimId);
}

function aggiornaAzioni(dimId) {
  const p = prospects.find(x => x.id === currentId);
  if (!p) return;
  const cur = (p.dims && p.dims[dimId]) || 0;
  const tgtEl = document.getElementById('tgt-' + dimId);
  const tgt = tgtEl ? parseInt(tgtEl.value) || 0 : 0;
  const block = document.getElementById('az-block-' + dimId);
  if (!block) return;
  block.innerHTML = '';
}

async function toggleAzione(key) {
  const p = prospects.find(x => x.id === currentId);
  if (!p) return;
  const done = Object.assign({}, p.azioni_completate || {});
  done[key] = !done[key];
  const {error} = await sb.from('prospects').update({azioni_completate: done}).eq('id', currentId);
  if (error) { showToast('Errore', 'error'); return; }
  const i = prospects.findIndex(x => x.id === currentId);
  prospects[i].azioni_completate = done;
  // Salva snapshot score
  salvaScoreSnapshot(prospects[i], done[key] ? 'Azione completata' : 'Azione rimossa');
  const el = document.getElementById('az-' + key);
  if (el) {
    const box = el.querySelector('div');
    const txt = el.querySelectorAll('div')[1];
    if (done[key]) {
      box.style.background = 'var(--green)';
      box.style.borderColor = 'var(--green)';
      box.innerHTML = '&#10003;';
      txt.style.textDecoration = 'line-through';
      txt.style.opacity = '.5';
      txt.style.color = 'var(--gray)';
    } else {
      box.style.background = 'transparent';
      box.style.borderColor = 'var(--border2)';
      box.innerHTML = '';
      txt.style.textDecoration = 'none';
      txt.style.opacity = '1';
      txt.style.color = 'var(--white)';
    }
  }
}

async function resetTargets() {
  if (!confirm('Sei sicuro di voler azzerare tutti gli obiettivi e le azioni completate per questo prospect?\nQuesta operazione non può essere annullata.')) return;
  const {error} = await sb.from('prospects').update({targets: {}, target_scadenze: {}, azioni_completate: {}, azioni_custom: {}}).eq('id', currentId);
  if (error) { showToast('Errore reset', 'error'); return; }
  const i = prospects.findIndex(x => x.id === currentId);
  prospects[i].targets = {};
  prospects[i].target_scadenze = {};
  prospects[i].azioni_completate = {};
  prospects[i].azioni_custom = {};
  showToast('Obiettivi azzerati');
  renderProspectDetail(currentId);
}

async function saveTargets() {
  const p = prospects.find(x => x.id === currentId);
  if (!p) return;
  const targets = {};
  const scadenze = {};
  DIMS.forEach(d => {
    const el = document.getElementById('tgt-' + d.id);
    const scEl = document.getElementById('tscad-' + d.id);
    if (el) targets[d.id] = Math.min(5, Math.max(0, parseInt(el.value) || 0));
    if (scEl && scEl.value) scadenze[d.id] = scEl.value;
  });
  const {error} = await sb.from('prospects').update({targets, target_scadenze: scadenze}).eq('id', currentId);
  if (error) { showToast('Errore salvataggio target', 'error'); return; }
  const i = prospects.findIndex(x => x.id === currentId);
  prospects[i].targets = targets;
  prospects[i].target_scadenze = scadenze;
  // Salva snapshot score con i nuovi target
  await salvaScoreSnapshot(prospects[i], 'Target aggiornati',
    'Score target: ' + calcScoreTarget(prospects[i]));
  showToast('Obiettivi salvati!');
  drawRadar(prospects[i].dims || {}, targets, prospects[i].settore);
  // Aggiorna grafico timeline dopo salvataggio target
  var tlC = document.getElementById('grafico-timeline-container');
  if (tlC) tlC.innerHTML = _buildGraficoTimeline(prospects[i]);
  renderProspectDetail(currentId);
}


// -- FINANCIAL INPUT HELPERS -------------------------------
function fmtEuroInput(val) {
  if (!val && val !== 0) return '';
  const n = parseFloat(String(val).replace(/[^\d.-]/g,''));
  if (isNaN(n)) return '';
  return n.toLocaleString('it-IT', {style:'currency', currency:'EUR', maximumFractionDigits:0});
}

function buildFinField(f, val) {
  const id = 'fin-' + f.id;
  const placeholder = f.placeholder || '';

  // Campo calcolato (readonly) — mostra come display, non input
  if (f.readonly) {
    const preview = val ? fmtEuroInput(val) : '—';
    return `\x3cdiv class="form-group">
      \x3clabel style="display:flex;align-items:center;gap:4px;color:var(--gray)">
        ${f.label}
        \x3cspan style="font-size:9px;background:var(--bg3);border:1px solid var(--border);border-radius:10px;padding:1px 7px;color:var(--gray)">calcolato\x3c/span>
      \x3c/label>
      \x3cdiv style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--rs);padding:8px 12px;font-size:13px;font-weight:600;color:var(--green)" id="${id}-display">
        ${preview}
      \x3c/div>
      \x3cinput type="hidden" id="${id}" value="${val||''}">
    \x3c/div>`;
  }

  // Tooltip helper
  const ttLabel = f.tt
    ? `\x3cspan class="tt-wrap" style="display:inline-flex;align-items:center;gap:4px;cursor:default">
         \x3cspan class="tt-icon">?\x3c/span>
         \x3cspan class="tt-bubble">${f.tt}\x3c/span>
       \x3c/span>`
    : '';

  if (f.fmt === 'textarea') {
    return `\x3cdiv class="form-group full">
      \x3clabel style="display:flex;align-items:center;gap:4px">\x3cspan>${f.label}\x3c/span>${ttLabel}\x3c/label>
      \x3ctextarea class="form-input form-textarea" id="${id}" placeholder="${placeholder}">${val||''}\x3c/textarea>
    \x3c/div>`;
  }

  if (f.fmt === 'text') {
    return `\x3cdiv class="form-group">
      \x3clabel style="display:flex;align-items:center;gap:4px">${ttLabel}${f.label}\x3c/label>
      \x3cinput class="form-input" type="text" id="${id}" placeholder="${placeholder}" value="${val||''}">
    \x3c/div>`;
  }

  if (f.fmt === 'euro' || f.fmt === 'euro_calc') {
    const preview = val ? fmtEuroInput(val) : '';
    const isCalc = f.fmt === 'euro_calc';
    const calcBtn = isCalc ? `
      \x3cdiv id="amm-calc-panel" style="margin-top:10px;background:var(--bg3);border:1px solid var(--border);border-radius:var(--rs);padding:12px">
        \x3cdiv style="font-size:10px;font-weight:600;color:var(--gold);letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px">
          ! Calcolatore ammortamenti
        \x3c/div>
        \x3cdiv style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
          \x3cdiv>
            \x3cdiv style="font-size:10px;color:var(--gray);margin-bottom:3px">Immobili di proprieta (valore EUR)\x3c/div>
            \x3cinput class="form-input" type="number" id="amm-immobili" placeholder="es. 500000" step="1" min="0"
              style="font-size:12px;padding:5px 8px" oninput="aggiornaAmm()">
            \x3cdiv style="font-size:9px;color:var(--gray2);margin-top:2px">Aliquota fiscale: 3%/anno\x3c/div>
          \x3c/div>
          \x3cdiv>
            \x3cdiv style="font-size:10px;color:var(--gray);margin-bottom:3px">Macchinari & impianti (valore EUR)\x3c/div>
            \x3cinput class="form-input" type="number" id="amm-macchinari" placeholder="es. 200000" step="1" min="0"
              style="font-size:12px;padding:5px 8px" oninput="aggiornaAmm()">
            \x3cdiv style="font-size:9px;color:var(--gray2);margin-top:2px">Aliquota fiscale: 12.5%/anno\x3c/div>
          \x3c/div>
          \x3cdiv>
            \x3cdiv style="font-size:10px;color:var(--gray);margin-bottom:3px">Attrezzatura & arredamento (EUR)\x3c/div>
            \x3cinput class="form-input" type="number" id="amm-attrezzatura" placeholder="es. 50000" step="1" min="0"
              style="font-size:12px;padding:5px 8px" oninput="aggiornaAmm()">
            \x3cdiv style="font-size:9px;color:var(--gray2);margin-top:2px">Aliquota fiscale: 20%/anno\x3c/div>
          \x3c/div>
          \x3cdiv>
            \x3cdiv style="font-size:10px;color:var(--gray);margin-bottom:3px">Veicoli aziendali (valore EUR)\x3c/div>
            \x3cinput class="form-input" type="number" id="amm-veicoli" placeholder="es. 80000" step="1" min="0"
              style="font-size:12px;padding:5px 8px" oninput="aggiornaAmm()">
            \x3cdiv style="font-size:9px;color:var(--gray2);margin-top:2px">Aliquota fiscale: 20%/anno\x3c/div>
          \x3c/div>
          \x3cdiv>
            \x3cdiv style="font-size:10px;color:var(--gray);margin-bottom:3px">Software & licenze (EUR)\x3c/div>
            \x3cinput class="form-input" type="number" id="amm-software" placeholder="es. 30000" step="1" min="0"
              style="font-size:12px;padding:5px 8px" oninput="aggiornaAmm()">
            \x3cdiv style="font-size:9px;color:var(--gray2);margin-top:2px">Aliquota fiscale: 33%/anno\x3c/div>
          \x3c/div>
          \x3cdiv>
            \x3cdiv style="font-size:10px;color:var(--gray);margin-bottom:3px">Leasing rate mensili (EUR/mese)\x3c/div>
            \x3cinput class="form-input" type="number" id="amm-leasing" placeholder="es. 4500" step="1" min="0"
              style="font-size:12px;padding:5px 8px" oninput="aggiornaAmm()">
            \x3cdiv style="font-size:9px;color:var(--gray2);margin-top:2px">Totale annuo = rata x 12\x3c/div>
          \x3c/div>
        \x3c/div>
        \x3cdiv id="amm-totale" style="font-size:12px;color:var(--gray);background:var(--bg2);border-radius:4px;padding:8px 10px;margin-bottom:8px">
          Ammortamenti totali annui: \x3cstrong style="color:var(--gold)">-- EUR\x3c/strong>
        \x3c/div>
        \x3cbutton type="button" onclick="autoCalcEbitda()" style="
          background:var(--gold);color:#fff;border:none;
          border-radius:4px;padding:6px 14px;font-size:11px;font-weight:600;cursor:pointer;
          font-family:'DM Sans',sans-serif;width:100%">
          Calcola EBITDA
        \x3c/button>
      \x3c/div>
      \x3cdiv style="font-size:10px;color:var(--gray2);margin-top:6px;line-height:1.4">
        EBITDA = Utile netto + imposte stimate (28%) + ammortamenti calcolati sopra.\x3cbr>
        Puoi anche inserire il valore diretto se hai il bilancio.
      \x3c/div>` : '';
    const calcNote = '';
    return `\x3cdiv class="form-group">
      \x3clabel style="display:flex;align-items:center;gap:4px">\x3cspan>${f.label}\x3c/span>${ttLabel}\x3c/label>
      \x3cdiv>
        \x3cinput class="form-input" type="number" id="${id}" placeholder="es. 2500000"
          value="${val||''}" step="1" min="0"
          oninput="document.getElementById('fp-${f.id}').textContent = this.value ? parseFloat(this.value).toLocaleString('it-IT',{style:'currency',currency:'EUR',maximumFractionDigits:0}) : ''; aggiornaMargini()">
        \x3cdiv style="font-size:11px;color:var(--gold);margin-top:3px;min-height:16px" id="fp-${f.id}">${preview}\x3c/div>
        ${calcBtn}
        ${calcNote}
      \x3c/div>
    \x3c/div>`;
  }

  if (f.fmt === 'pct') {
    return `\x3cdiv class="form-group">
      \x3clabel style="display:flex;align-items:center;gap:4px">${ttLabel}${f.label}\x3c/label>
      \x3cdiv style="display:flex;align-items:center;gap:8px">
        \x3cinput class="form-input" type="number" id="${id}" placeholder="es. 32"
          value="${val||''}" min="0" max="100" step="0.1" style="flex:1">
        \x3cspan style="font-size:14px;font-weight:600;color:var(--gray);flex-shrink:0">%\x3c/span>
      \x3c/div>
    \x3c/div>`;
  }

  if (f.fmt === 'int') {
    return `\x3cdiv class="form-group">
      \x3clabel style="display:flex;align-items:center;gap:4px">${ttLabel}${f.label}\x3c/label>
      \x3cinput class="form-input" type="number" id="${id}" placeholder="${placeholder||'es. 0'}"
        value="${val||''}" step="1" min="0">
    \x3c/div>`;
  }

  if (f.fmt === 'year') {
    return `\x3cdiv class="form-group">
      \x3clabel style="display:flex;align-items:center;gap:4px">${ttLabel}${f.label}\x3c/label>
      \x3cinput class="form-input" type="number" id="${id}" placeholder="es. 2005"
        value="${val||''}" min="1900" max="${new Date().getFullYear()}" step="1">
    \x3c/div>`;
  }

  if (f.fmt === 'margine') {
    return `\x3cdiv class="form-group full">
      \x3clabel>${f.label}\x3c/label>
      \x3cdiv id="margine-panel" style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--rs);padding:12px;margin-bottom:8px">
        \x3cdiv style="font-size:10px;font-weight:600;color:var(--gray);letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px">Calcolato dai dati inseriti\x3c/div>
        \x3cdiv style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px">
          \x3cdiv style="background:var(--bg2);border-radius:var(--rs);padding:10px;text-align:center;border:1px solid var(--border)">
            \x3cdiv style="font-size:9px;color:var(--gray);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px">Margine lordo\x3c/div>
            \x3cdiv style="font-size:18px;font-family:'DM Serif Display',serif" id="calc-margine-lordo">--\x3c/div>
            \x3cdiv style="font-size:9px;color:var(--gray2);margin-top:2px">(Fatt. - Costi fissi) / Fatt.\x3c/div>
          \x3c/div>
          \x3cdiv style="background:var(--bg2);border-radius:var(--rs);padding:10px;text-align:center;border:1px solid var(--border)">
            \x3cdiv style="font-size:9px;color:var(--gray);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px">Margine EBITDA\x3c/div>
            \x3cdiv style="font-size:18px;font-family:'DM Serif Display',serif" id="calc-margine-ebitda">--\x3c/div>
            \x3cdiv style="font-size:9px;color:var(--gray2);margin-top:2px">EBITDA / Fatturato\x3c/div>
          \x3c/div>
          \x3cdiv style="background:var(--bg2);border-radius:var(--rs);padding:10px;text-align:center;border:1px solid var(--border)">
            \x3cdiv style="font-size:9px;color:var(--gray);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px">Margine netto\x3c/div>
            \x3cdiv style="font-size:18px;font-family:'DM Serif Display',serif" id="calc-margine-netto">--\x3c/div>
            \x3cdiv style="font-size:9px;color:var(--gray2);margin-top:2px">Utile netto / Fatturato\x3c/div>
          \x3c/div>
        \x3c/div>
        \x3cbutton type="button" onclick="usaMargineCalcolato()" style="
          background:var(--amber-bg);border:1px solid var(--gold-dim);color:var(--gold);
          border-radius:4px;padding:4px 12px;font-size:10px;font-weight:600;cursor:pointer;
          font-family:'DM Sans',sans-serif">
          v Usa margine netto come valore dichiarato
        \x3c/button>
      \x3c/div>
      \x3cdiv style="display:flex;align-items:center;gap:8px">
        \x3cinput class="form-input" type="number" id="fin-margine_pct" placeholder="oppure inserisci manualmente"
          value="${val||''}" min="0" max="100" step="0.1" style="flex:1"
          oninput="aggiornaPreviewMargine()">
        \x3cspan style="font-size:14px;font-weight:600;color:var(--gray);flex-shrink:0">%\x3c/span>
      \x3c/div>
      \x3cdiv style="font-size:10px;color:var(--gray2);margin-top:4px">
        Puoi inserire manualmente il margine dichiarato dal cliente (es. da bilancio), oppure usare uno dei valori calcolati sopra.
      \x3c/div>
    \x3c/div>`;
  }

  if (f.fmt === 'forma_giuridica') {
    const opts = Object.entries(FORME_GIURIDICHE);
    const gruppi = {};
    opts.forEach(([k, v]) => {
      if (!gruppi[v.gruppo]) gruppi[v.gruppo] = [];
      gruppi[v.gruppo].push({ k, label: v.label });
    });
    let selectHtml = '\x3coption value="">-- Seleziona forma giuridica --\x3c/option>';
    Object.entries(gruppi).forEach(([gruppo, voci]) => {
      selectHtml += `\x3coptgroup label="${gruppo}">`;
      voci.forEach(v => {
        selectHtml += `\x3coption value="${v.k}" ${val === v.k ? 'selected' : ''}>${v.label}\x3c/option>`;
      });
      selectHtml += '\x3c/optgroup>';
    });
    return `\x3cdiv class="form-group full">
      \x3clabel>${f.label}\x3c/label>
      \x3cselect class="form-input" id="fin-forma_giuridica" onchange="aggiornaSchemaFiscale(this.value)">
        ${selectHtml}
      \x3c/select>
      \x3cdiv id="schema-fiscale-panel" style="margin-top:10px">\x3c/div>
    \x3c/div>`;
  }

  if (f.fmt === 'anno') {
    const readonly = f.readonly ? 'readonly style="background:var(--bg3);color:var(--gray);cursor:default"' : '';
    const onInput = f.readonly ? '' :
      `oninput="
        const prev = document.getElementById('fin-fatturato_anno_2_label');
        if(prev && this.value) prev.value = parseInt(this.value) - 1;
      "`;
    return `\x3cdiv class="form-group">
      \x3clabel>${f.label}\x3c/label>
      \x3cinput class="form-input" type="number" id="${id}" placeholder="${new Date().getFullYear()}"
        value="${val||''}" min="2000" max="${new Date().getFullYear() + 1}" step="1" ${readonly} ${onInput}>
    \x3c/div>`;
  }

  return '';
}

function buildCalcolatricePL() {
  const p = prospects.find(x => x.id === currentId) || {};
  const dc = p.dati_calcolatrice || {};
  const fv = (field) => dc[field] !== undefined && dc[field] !== null ? dc[field] : (p[field] || '');
  const FORMA_TO_REGIME = {'Srl':'srl','Spa':'srl','Srl semplificata':'srl','srl':'srl','spa':'srl','srls':'srl','Snc':'snc_sas','Sas':'snc_sas','snc':'snc_sas','sas':'snc_sas','Ditta individuale':'ditta','ditta_individuale':'ditta','Libero professionista':'ditta'};
  const formaGiuridica = p.forma_giuridica || '';
  const regimeFiscale = FORMA_TO_REGIME[formaGiuridica] || dc.forma || 'srl';
  const regimeLabel = regimeFiscale === 'srl' ? 'IRES 24% + IRAP 3.9%' : regimeFiscale === 'snc_sas' ? 'IRPEF + IRAP 3.9%' : 'IRPEF + INPS ~24%';
  const formaHtml = formaGiuridica && FORMA_TO_REGIME[formaGiuridica]
    ? '\x3cdiv class="pl-row pl-row-input">\x3cdiv class="pl-label">Regime fiscale\x3c/div>\x3cdiv class="pl-input-wrap">\x3cdiv class="calc-regime-badge">' + formaGiuridica + ' \u2014 ' + regimeLabel + '\x3c/div>\x3cinput type="hidden" id="calc-forma" value="' + regimeFiscale + '">\x3c/div>\x3c/div>'
    : '\x3cdiv class="pl-row pl-row-input">\x3cdiv class="pl-label">Regime fiscale\x3c/div>\x3cdiv class="pl-input-wrap">\x3cdiv class="calc-regime-warning">\u26A0 Imposta la forma giuridica nella tab Struttura Aziendale per calcolare le imposte\x3c/div>\x3cinput type="hidden" id="calc-forma" value="' + regimeFiscale + '">\x3c/div>\x3c/div>';
  return `
  \x3cdiv style="margin-top:20px;border-top:2px solid var(--gold-dim);padding-top:16px">
    \x3cdiv style="font-size:11px;font-weight:600;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;margin-bottom:14px">
      ! Calcolatrice Conto Economico
    \x3c/div>

    \x3c!-- RIGA 1: Fatturato --\x3e
    \x3cdiv class="pl-row pl-row-input">
      \x3cdiv class="pl-label">Fatturato annuo \x3cspan class="tt-wrap">\x3cspan class="tt-icon">?\x3c/span>\x3cspan class="tt-bubble">Il totale dei ricavi dell'anno. Base di tutto il conto economico.\x3c/span>\x3c/span>\x3c/div>
      \x3cdiv class="pl-input-wrap">
        \x3cinput class="form-input pl-input" type="number" id="calc-fatturato" title="Il totale dei ricavi annui. Base di tutto il conto economico." placeholder="es. 3000000"
          value="${dc.fatturato || p.fatturato_anno_1 || ''}" oninput="aggiornaCalcolatrice()">
        \x3cdiv class="pl-preview" id="calc-preview-fatturato">\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- RIGA 2: Costo del venduto --\x3e
    \x3cdiv class="pl-row pl-row-input">
      \x3cdiv class="pl-label">
        Costo del venduto \x3cspan class="tt-wrap">\x3cspan class="tt-icon">?\x3c/span>\x3cspan class="tt-bubble">Materiali, acquisti e costi direttamente legati alla produzione/vendita. NON include affitti o stipendi fissi.\x3c/span>\x3c/span>
        \x3cdiv class="pl-sublabel">materie prime, acquisti diretti, produzione\x3c/div>
      \x3c/div>
      \x3cdiv class="pl-input-wrap">
        \x3cdiv style="display:flex;gap:8px;align-items:center">
          \x3cinput class="form-input pl-input" type="number" id="calc-cdv-pct" title="Il costo diretto per produrre o acquistare cio che vendi: materie prime, acquisti di merce, costo di produzione. NON include affitti o stipendi fissi." placeholder="%" min="0" max="100" step="0.1"
            value="${dc.cdv_pct || ''}" oninput="document.getElementById('calc-cdv-eur').value='';aggiornaCalcolatrice()" style="width:70px">
          \x3cspan style="color:var(--gray);font-size:12px">%\x3c/span>
          \x3cspan style="color:var(--gray2);font-size:11px">oppure\x3c/span>
          \x3cinput class="form-input pl-input" type="number" id="calc-cdv-eur" placeholder="EUR" min="0"
            value="${dc.cdv_eur || ''}" oninput="document.getElementById('calc-cdv-pct').value='';aggiornaCalcolatrice()" style="flex:1">
        \x3c/div>
        \x3cdiv class="pl-preview" id="calc-preview-cdv">\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- RISULTATO: Margine Lordo --\x3e
    \x3cdiv class="pl-row pl-row-result" id="calc-margine-row">
      \x3cdiv class="pl-label">= Margine Lordo\x3c/div>
      \x3cdiv style="display:flex;gap:16px;align-items:baseline">
        \x3cdiv class="pl-result-val" id="calc-margine">--\x3c/div>
        \x3cdiv class="pl-result-pct" id="calc-margine-pct">\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- RIGA 3: Costi fissi --\x3e
    \x3cdiv class="pl-row pl-row-input">
      \x3cdiv class="pl-label">
        Costi fissi mensili \x3cspan class="tt-wrap">\x3cspan class="tt-icon">?\x3c/span>\x3cspan class="tt-bubble">Tutti i costi che paghi ogni mese indipendentemente dal fatturato: affitto, stipendi fissi, utenze, software, commercialista.\x3c/span>\x3c/span>
        \x3cdiv class="pl-sublabel">affitti, utilities, stipendi fissi, servizi\x3c/div>
      \x3c/div>
      \x3cdiv class="pl-input-wrap">
        \x3cinput class="form-input pl-input" type="number" id="calc-costi-fissi" title="Tutti i costi mensili che paghi indipendentemente da quanto vendi: affitto, stipendi fissi, utenze, software, commercialista ecc." placeholder="es. 85000"
          value="${dc.costi_fissi || p.costi_fissi_mensili || ''}" oninput="aggiornaCalcolatrice()">
        \x3cdiv class="pl-preview" id="calc-preview-costi">\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- RISULTATO: EBITDA --\x3e
    \x3cdiv class="pl-row pl-row-result" id="calc-ebitda-row">
      \x3cdiv class="pl-label">= EBITDA\x3c/div>
      \x3cdiv style="display:flex;gap:16px;align-items:baseline">
        \x3cdiv class="pl-result-val" id="calc-ebitda">--\x3c/div>
        \x3cdiv class="pl-result-pct" id="calc-ebitda-pct">\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- RIGA 4: Ammortamenti --\x3e
    \x3cdiv class="pl-row pl-row-input">
      \x3cdiv class="pl-label" style="cursor:pointer" onclick="toggleAmmPanel()">
        Ammortamenti annui \x3cspan class="tt-wrap">\x3cspan class="tt-icon">?\x3c/span>\x3cspan class="tt-bubble">La quota annua di svalutazione dei beni aziendali durevoli (macchinari, auto, software). Clicca per calcolarlo voce per voce.\x3c/span>\x3c/span>
        \x3cdiv class="pl-sublabel">clicca per calcolare per categoria v\x3c/div>
      \x3c/div>
      \x3cdiv class="pl-input-wrap">
        \x3cinput class="form-input pl-input" type="number" id="calc-ammortamenti" title="La quota annuale di "usura" di beni durevoli (macchinari, auto, software). Clicca il titolo per calcolarlo categoria per categoria." placeholder="es. 150000"
          value="${dc.ammortamenti || ''}" oninput="aggiornaCalcolatrice()">
        \x3cdiv class="pl-preview" id="calc-preview-amm">\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- Pannello calcolo ammortamenti --\x3e
    \x3cdiv id="amm-panel-detail" style="display:none;background:var(--bg3);border-radius:var(--rs);padding:12px;margin:4px 0 8px;border:1px solid var(--border)">
      \x3cdiv style="font-size:10px;color:var(--gray);margin-bottom:8px;font-weight:600">Calcola per categoria (aliquote fiscali italiane)\x3c/div>
      \x3cdiv style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        ${[
          {id:'amm-immobili',    label:'Immobili',         aliq:'3%',   val: fv('imm_amm_immobili')},
          {id:'amm-macchinari',  label:'Macchinari',       aliq:'12.5%', val: fv('imm_amm_macchinari')},
          {id:'amm-attrezzatura',label:'Attrezzatura',     aliq:'20%',  val: fv('imm_amm_attrezzatura')},
          {id:'amm-veicoli',     label:'Veicoli',          aliq:'20%',  val: fv('imm_amm_veicoli')},
          {id:'amm-software',    label:'Software',         aliq:'33%',  val: fv('imm_amm_software')},
          {id:'amm-leasing',     label:'Leasing (EUR/mese)', aliq:'x12',  val: fv('imm_amm_leasing')},
        ].map(a => `\x3cdiv>
          \x3cdiv style="font-size:9px;color:var(--gray);margin-bottom:2px">${a.label} \x3cspan style="color:var(--gold-dim)">${a.aliq}\x3c/span>\x3c/div>
          \x3cinput class="form-input" type="number" id="${a.id}" placeholder="valore EUR" value="${a.val}"
            style="font-size:11px;padding:4px 8px" oninput="calcolaAmmDaCategorie()">
        \x3c/div>`).join('')}
      \x3c/div>
      \x3cdiv style="font-size:11px;color:var(--gold);margin-top:8px;font-weight:500" id="amm-totale-detail">Totale: -- EUR\x3c/div>
    \x3c/div>

    \x3c!-- RISULTATO: EBIT --\x3e
    \x3cdiv class="pl-row pl-row-result" id="calc-ebit-row">
      \x3cdiv class="pl-label">= EBIT (utile operativo)\x3c/div>
      \x3cdiv style="display:flex;gap:16px;align-items:baseline">
        \x3cdiv class="pl-result-val" id="calc-ebit">--\x3c/div>
        \x3cdiv class="pl-result-pct" id="calc-ebit-pct">\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- RIGA 5: Regime fiscale (read-only da forma giuridica) --\x3e
    ${formaHtml}
    \x3cdiv class="pl-row pl-row-input">
      \x3cdiv class="pl-label">Reddito titolare / soci (lordo annuo) \x3cspan class="tt-wrap">\x3cspan class="tt-icon">?\x3c/span>\x3cspan class="tt-bubble">Per Srl: compenso amministratore soggetto a INPS gestione separata (~26%). Per ditte individuali: base per calcolo INPS gestione commercianti (~24%).\x3c/span>\x3c/span>\x3c/div>
      \x3cdiv class="pl-input-wrap">
        \x3cinput class="form-input pl-input" type="number" id="calc-reddito-titolare" placeholder="es. 60000" value="${dc.reddito_titolare || ''}" oninput="aggiornaCalcolatrice()">
      \x3c/div>
    \x3c/div>
    \x3cdiv class="pl-row pl-row-input">
      \x3cdiv class="pl-label">Costi strutturali fissi annui \x3cspan class="tt-wrap">\x3cspan class="tt-icon">?\x3c/span>\x3cspan class="tt-bubble">Commercialista, CCIAA, revisore legale, assicurazioni obbligatorie.\x3c/span>\x3c/span>\x3c/div>
      \x3cdiv class="pl-input-wrap">
        \x3cinput class="form-input pl-input" type="number" id="calc-costi-strutturali" placeholder="es. 5000" value="${dc.costi_strutturali || ''}" oninput="aggiornaCalcolatrice()">
      \x3c/div>
    \x3c/div>

    \x3c!-- RISULTATO: Imposte --\x3e
    \x3cdiv class="pl-row pl-row-result" id="calc-imposte-row" style="border-left-color:var(--red)">
      \x3cdiv class="pl-label" style="color:var(--red)">\u2212 Imposte & contributi\x3c/div>
      \x3cdiv style="display:flex;flex-direction:column;align-items:flex-end;gap:2px">
        \x3cdiv class="pl-result-val" id="calc-imposte" style="color:var(--red)">--\x3c/div>
        \x3cdiv class="pl-result-pct" id="calc-imposte-detail" style="font-size:10px;color:var(--gray)"></div>
      \x3c/div>
    \x3c/div>

    \x3c!-- RISULTATO: Utile Netto --\x3e
    \x3cdiv class="pl-row pl-row-result pl-row-final" id="calc-utile-row">
      \x3cdiv class="pl-label" style="font-size:14px;color:var(--white)">= Utile Netto\x3c/div>
      \x3cdiv style="display:flex;gap:16px;align-items:baseline">
        \x3cdiv class="pl-result-val" id="calc-utile" style="font-size:22px;font-family:'DM Serif Display',serif">--\x3c/div>
        \x3cdiv class="pl-result-pct" id="calc-utile-pct">\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- Riepilogo margini --\x3e
    \x3cdiv id="calc-margini-riepilogo" style="display:none;margin-top:12px;background:var(--bg3);border-radius:var(--rs);padding:10px 14px">
      \x3cdiv style="font-size:10px;font-weight:600;color:var(--gray);letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px">Riepilogo margini\x3c/div>
      \x3cdiv style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px" id="calc-margini-grid">\x3c/div>
    \x3c/div>

    \x3cdiv style="display:flex;justify-content:flex-end;margin-top:16px">\x3cbutton class="btn btn-primary" onclick="salvaDaCalcolatrice()">Salva dati finanziari\x3c/button>\x3c/div>
  \x3c/div>`;
}

function toggleAmmPanel() {
  const p = document.getElementById('amm-panel-detail');
  if (p) p.style.display = p.style.display === 'none' ? 'block' : 'none';
}

function calcolaAmmDaCategorie() {
  const v = id => parseFloat(document.getElementById(id)?.value) || 0;
  const tot = Math.round(
    v('amm-immobili')    * 0.03 +
    v('amm-macchinari')  * 0.125 +
    v('amm-attrezzatura')* 0.20 +
    v('amm-veicoli')     * 0.20 +
    v('amm-software')    * 0.33 +
    v('amm-leasing')     * 12
  );
  const el = document.getElementById('amm-totale-detail');
  if (el) el.textContent = `Totale: ${tot.toLocaleString('it-IT')} EUR`;
  // Push to main amm field
  const ammField = document.getElementById('calc-ammortamenti');
  if (ammField) { ammField.value = tot; aggiornaCalcolatrice(); }
}

function calcolaIRPEF(reddito) {
  if (reddito <= 0) return 0;
  var imposta = 0;
  if (reddito > 50000) imposta += (reddito - 50000) * 0.43;
  if (reddito > 28000) imposta += (Math.min(reddito, 50000) - 28000) * 0.35;
  if (reddito > 15000) imposta += (Math.min(reddito, 28000) - 15000) * 0.25;
  imposta += Math.min(reddito, 15000) * 0.23;
  return imposta;
}

function aggiornaCalcolatrice() {
  var vv = function(id) { return parseFloat(document.getElementById(id)?.value) || 0; };
  var fmt = function(n) { return Math.round(n).toLocaleString('it-IT') + '\u20AC'; };
  var pct = function(n, base) { return base ? (n/base*100).toFixed(1)+'%' : ''; };
  var col = function(n) { return n > 0 ? 'var(--green)' : n < 0 ? 'var(--red)' : 'var(--gray)'; };

  var fatturato = vv('calc-fatturato');
  var cogsPct = vv('calc-cdv-pct');
  var cogsVal = vv('calc-cdv-eur');
  var costiFissiMensili = vv('calc-costi-fissi');
  var ammortamenti = vv('calc-ammortamenti');
  var redditoTitolare = vv('calc-reddito-titolare');
  var costiStrutturali = vv('calc-costi-strutturali');
  var forma = document.getElementById('calc-forma')?.value || 'srl';

  var cogs = cogsVal > 0 ? cogsVal : (cogsPct > 0 ? fatturato * cogsPct / 100 : 0);
  var costiFissiAnnui = costiFissiMensili * 12;
  var margineLordo = fatturato - cogs;

  // Sincronizza % ↔ EUR in tempo reale nei placeholder
  var cdvPctEl = document.getElementById('calc-cdv-pct');
  var cdvEurEl = document.getElementById('calc-cdv-eur');
  if (cdvEurEl && cdvEurEl.value && (!cdvPctEl || !cdvPctEl.value) && fatturato > 0) {
    var pctCalc = Math.round((cogsVal / fatturato) * 1000) / 10;
    if (cdvPctEl) { cdvPctEl.style.color = 'var(--gray)'; cdvPctEl.placeholder = pctCalc + '%'; }
  } else if (cdvPctEl && cdvPctEl.value && (!cdvEurEl || !cdvEurEl.value) && fatturato > 0) {
    var eurCalc = Math.round(fatturato * cogsPct / 100);
    if (cdvEurEl) { cdvEurEl.style.color = 'var(--gray)'; cdvEurEl.placeholder = eurCalc.toLocaleString('it-IT') + '\u20AC'; }
  }
  var ebitda = margineLordo - costiFissiAnnui - costiStrutturali;
  var ebit = ebitda - ammortamenti;

  // Calcolo fiscale per forma societaria
  var irap = 0, ires = 0, irpef = 0, inps = 0, imposteTot = 0, imposteDetail = '';
  if (forma === 'srl') {
    irap = Math.max(0, ebitda * 0.039);
    ires = Math.max(0, (ebit - irap) * 0.24);
    inps = redditoTitolare * 0.26;
    imposteTot = irap + ires + inps;
    imposteDetail = 'IRAP ' + fmt(irap) + ' + IRES ' + fmt(ires) + (inps > 0 ? ' + INPS amm. ' + fmt(inps) : '');
  } else if (forma === 'snc_sas') {
    irap = Math.max(0, ebitda * 0.039);
    irpef = calcolaIRPEF(Math.max(0, ebit - irap));
    inps = Math.max(4200, redditoTitolare * 0.24);
    imposteTot = irap + irpef + inps;
    imposteDetail = 'IRAP ' + fmt(irap) + ' + IRPEF ' + fmt(irpef) + ' + INPS ' + fmt(inps);
  } else {
    irpef = calcolaIRPEF(Math.max(0, ebit));
    inps = Math.max(4200, redditoTitolare * 0.24);
    imposteTot = irpef + inps;
    imposteDetail = 'IRPEF ' + fmt(irpef) + ' + INPS ' + fmt(inps);
  }
  var utile = ebit - imposteTot;

  var set = function(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
  var setCol = function(id, n) { var el = document.getElementById(id); if (el) el.style.color = col(n); };
  var setBorder = function(id, n) { var el = document.getElementById(id); if (el) el.style.borderLeftColor = col(n); };

  if (fatturato) set('calc-preview-fatturato', fmt(fatturato));
  if (cogs) set('calc-preview-cdv', fmt(cogs));
  if (costiFissiMensili) set('calc-preview-costi', fmt(costiFissiMensili) + '/mese \u00B7 ' + fmt(costiFissiAnnui) + ' annui');
  if (ammortamenti) set('calc-preview-amm', fmt(ammortamenti));

  if (fatturato) {
    set('calc-margine', fmt(margineLordo)); set('calc-margine-pct', pct(margineLordo, fatturato));
    setCol('calc-margine', margineLordo); setBorder('calc-margine-row', margineLordo);

    set('calc-ebitda', fmt(ebitda)); set('calc-ebitda-pct', pct(ebitda, fatturato));
    setCol('calc-ebitda', ebitda); setBorder('calc-ebitda-row', ebitda);

    var ebitdaDisplay = document.getElementById('fin-ebitda-display');
    var ebitdaHidden = document.getElementById('fin-ebitda');
    if (ebitdaDisplay && ebitda) { ebitdaDisplay.textContent = fmt(ebitda); ebitdaDisplay.style.color = ebitda > 0 ? 'var(--green)' : 'var(--red)'; }
    if (ebitdaHidden && ebitda) ebitdaHidden.value = Math.round(ebitda);

    set('calc-ebit', fmt(ebit)); set('calc-ebit-pct', pct(ebit, fatturato));
    setCol('calc-ebit', ebit); setBorder('calc-ebit-row', ebit);

    set('calc-imposte', '\u2212' + fmt(imposteTot));
    set('calc-imposte-detail', imposteDetail);

    set('calc-utile', fmt(utile)); set('calc-utile-pct', pct(utile, fatturato));
    setCol('calc-utile', utile); setBorder('calc-utile-row', utile);

    var riepilogo = document.getElementById('calc-margini-riepilogo');
    var grid = document.getElementById('calc-margini-grid');
    if (riepilogo && grid) {
      riepilogo.style.display = 'block';
      var margini = [
        { label:'Margine lordo', val: pct(margineLordo, fatturato), n: margineLordo },
        { label:'EBITDA margin', val: pct(ebitda, fatturato), n: ebitda },
        { label:'EBIT margin', val: pct(ebit, fatturato), n: ebit },
        { label:'Utile netto %', val: pct(utile, fatturato), n: utile },
      ];
      grid.innerHTML = margini.map(function(m) {
        return '\x3cdiv style="text-align:center;background:var(--bg2);border-radius:4px;padding:8px 4px;border:1px solid var(--border)">' +
          '\x3cdiv style="font-size:9px;color:var(--gray);text-transform:uppercase;letter-spacing:.04em;margin-bottom:3px">' + m.label + '\x3c/div>' +
          '\x3cdiv style="font-size:16px;font-family:\'DM Serif Display\',serif;color:' + col(m.n) + '">' + (m.val || '--') + '\x3c/div>' +
        '\x3c/div>';
      }).join('');
    }
  }
}

async function salvaDaCalcolatrice() {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;
  var vn = function(id) { return parseFloat(document.getElementById(id)?.value) || null; };
  var vs = function(id) { return document.getElementById(id)?.value || null; };
  var fatturato = vn('calc-fatturato');
  var cdvPct = vn('calc-cdv-pct');
  var cdvEur = vn('calc-cdv-eur');
  var costiFissi = vn('calc-costi-fissi');
  var ammortamenti = vn('calc-ammortamenti');
  var forma = vs('calc-forma') || 'srl';
  var redditoTitolare = vn('calc-reddito-titolare') || 0;
  var costiStrutturali = vn('calc-costi-strutturali') || 0;
  var cogs = cdvEur || (cdvPct && fatturato ? fatturato * cdvPct / 100 : 0);
  var margineLordo = fatturato ? fatturato - cogs : null;
  var costiFissiAnnui = costiFissi ? costiFissi * 12 : 0;
  var ebitda = margineLordo !== null ? margineLordo - costiFissiAnnui - costiStrutturali : null;
  var ebit = ebitda !== null ? ebitda - (ammortamenti || 0) : null;
  var irap = 0, ires = 0, irpef = 0, inps = 0;
  if (forma === 'srl') {
    irap = Math.max(0, (ebitda || 0) * 0.039);
    ires = Math.max(0, ((ebit || 0) - irap) * 0.24);
    inps = redditoTitolare * 0.26;
  } else if (forma === 'snc_sas') {
    irap = Math.max(0, (ebitda || 0) * 0.039);
    irpef = calcolaIRPEF(Math.max(0, (ebit || 0) - irap));
    inps = Math.max(4200, redditoTitolare * 0.24);
  } else {
    irpef = calcolaIRPEF(Math.max(0, ebit || 0));
    inps = Math.max(4200, redditoTitolare * 0.24);
  }
  var imposteTot = irap + ires + irpef + inps;
  var utile = ebit !== null ? ebit - imposteTot : null;
  var marginePct = fatturato && utile ? Math.round(utile / fatturato * 1000) / 10 : null;
  var dati_calcolatrice = {
    fatturato: fatturato, cdv_pct: cdvPct, cdv_eur: cdvEur,
    costi_fissi: costiFissi, ammortamenti: ammortamenti,
    forma: forma, reddito_titolare: redditoTitolare,
    costi_strutturali: costiStrutturali,
  };
  var updates = {
    fatturato_anno_1: fatturato,
    costi_fissi_mensili: costiFissi,
    utile_netto: utile ? Math.round(utile) : null,
    margine_pct: marginePct,
    dati_calcolatrice: dati_calcolatrice,
  };
  Object.assign(p, updates);
  var res = await sb.from('prospects').update(updates).eq('id', p.id);
  if (res.error) { showToast('Errore: ' + res.error.message, 'error'); return; }
  showToast('Dati finanziari salvati');
  renderFinancials(p);
}



// -- SCHEMA FISCALE per forma giuridica ------------------------------------
function aggiornaSchemaFiscale(formaId) {
  const panel = document.getElementById('schema-fiscale-panel');
  if (!panel) return;
  if (!formaId) { panel.innerHTML = ''; return; }

  const s = getFiscalSummary(formaId);
  if (!s) { panel.innerHTML = ''; return; }

  const { forma, rows, vantaggi, svantaggi, note_cso, capitale_minimo, agevolazioni, limiti } = s;

  let html = `\x3cdiv style="border:1px solid var(--border);border-radius:var(--rs);overflow:hidden;font-size:12px">`;

  // Header
  html += `\x3cdiv style="background:var(--amber-bg);border-bottom:1px solid var(--gold-dim);padding:10px 14px">
    \x3cdiv style="font-size:13px;font-weight:600;color:var(--white)">${forma.label}\x3c/div>
    \x3cdiv style="font-size:11px;color:var(--gray);margin-top:2px">${forma.descrizione}\x3c/div>
    ${capitale_minimo !== null && capitale_minimo !== undefined ? `\x3cdiv style="font-size:10px;color:var(--gold);margin-top:3px">Capitale minimo: ${capitale_minimo === 0 || capitale_minimo === 1 ? 'da 1 EUR' : capitale_minimo.toLocaleString('it-IT') + ' EUR'}\x3c/div>` : ''}
  \x3c/div>`;

  // Parametri fiscali
  html += `\x3cdiv style="padding:12px 14px;border-bottom:1px solid var(--border)">
    \x3cdiv style="font-size:9px;font-weight:600;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">Parametri fiscali principali\x3c/div>
    ${rows.map(r => `
      \x3cdiv style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;padding:5px 0;border-bottom:1px solid var(--border)">
        \x3cdiv style="flex:1">
          \x3cdiv style="color:var(--gray)">${r.label}\x3c/div>
          ${r.note ? `\x3cdiv style="font-size:10px;color:var(--gray2);margin-top:1px;line-height:1.3">${r.note}\x3c/div>` : ''}
        \x3c/div>
        \x3cdiv style="font-size:13px;font-weight:700;color:${r.col};flex-shrink:0">${r.val}\x3c/div>
      \x3c/div>`).join('')}
  \x3c/div>`;

  // Agevolazioni se presenti
  if (agevolazioni.length) {
    html += `\x3cdiv style="padding:10px 14px;border-bottom:1px solid var(--border);background:var(--green-bg)">
      \x3cdiv style="font-size:9px;font-weight:600;color:var(--green);letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">Agevolazioni disponibili\x3c/div>
      ${agevolazioni.map(a => `\x3cdiv style="font-size:11px;color:var(--green);padding:2px 0">v ${a}\x3c/div>`).join('')}
    \x3c/div>`;
  }

  // Limiti se presenti (forfettario)
  if (limiti.length) {
    html += `\x3cdiv style="padding:10px 14px;border-bottom:1px solid var(--border);background:var(--red-bg)">
      \x3cdiv style="font-size:9px;font-weight:600;color:var(--red);letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">Limiti e vincoli\x3c/div>
      ${limiti.map(l => `\x3cdiv style="font-size:11px;color:var(--red);padding:2px 0">! ${l}\x3c/div>`).join('')}
    \x3c/div>`;
  }

  // Pro e contro in 2 colonne
  html += `\x3cdiv style="display:grid;grid-template-columns:1fr 1fr;gap:0;border-bottom:1px solid var(--border)">
    \x3cdiv style="padding:10px 14px;border-right:1px solid var(--border)">
      \x3cdiv style="font-size:9px;font-weight:600;color:var(--green);letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">Vantaggi\x3c/div>
      ${vantaggi.map(v => `\x3cdiv style="font-size:11px;color:var(--gray);padding:2px 0;line-height:1.3">+ ${v}\x3c/div>`).join('')}
    \x3c/div>
    \x3cdiv style="padding:10px 14px">
      \x3cdiv style="font-size:9px;font-weight:600;color:var(--red);letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">Svantaggi\x3c/div>
      ${svantaggi.map(s => `\x3cdiv style="font-size:11px;color:var(--gray);padding:2px 0;line-height:1.3">- ${s}\x3c/div>`).join('')}
    \x3c/div>
  \x3c/div>`;

  // Nota CSO
  if (note_cso) {
    html += `\x3cdiv style="padding:10px 14px;background:var(--amber-bg);border-top:1px solid var(--gold-dim)">
      \x3cdiv style="font-size:9px;font-weight:600;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;margin-bottom:4px"> Nota per il CSO\x3c/div>
      \x3cdiv style="font-size:11px;color:var(--white);line-height:1.5">${note_cso}\x3c/div>
    \x3c/div>`;
  }

  html += '\x3c/div>';
  panel.innerHTML = html;
}


// -- FORM DINAMICO DATI COMMERCIALI ---------------------------------------
function buildCommercialeForm(p) {
  const profilo = PROFILI_COMMERCIALI[p.settore];
  const kpi = p.kpi_commerciali || {};
  const tipoInfo = profilo ? TIPO_CLIENTELA_LABELS[profilo.tipo_clientela] : null;

  let html = '\x3cdiv class="form-grid">';

  if (!profilo) {
    // Fallback generico
    html += `
      \x3cdiv class="form-group full" style="background:var(--bg3);border-radius:var(--rs);padding:10px 14px;margin-bottom:4px">
        \x3cdiv style="font-size:11px;color:var(--gray)">! Seleziona il settore del prospect per vedere i KPI personalizzati per la sua tipologia di business\x3c/div>
      \x3c/div>
      \x3cdiv class="form-group">\x3clabel>Clienti attivi (12 mesi)\x3c/label>\x3cinput class="form-input" type="number" id="finc-clienti_attivi" value="${p.clienti_attivi||''}">\x3c/div>
      \x3cdiv class="form-group">\x3clabel>Nuovi clienti/anno\x3c/label>\x3cinput class="form-input" type="number" id="finc-nuovi_clienti_anno" value="${p.nuovi_clienti_anno||''}">\x3c/div>
      \x3cdiv class="form-group">\x3clabel>Tasso riacquisto %\x3c/label>\x3cdiv style="display:flex;align-items:center;gap:8px">\x3cinput class="form-input" type="number" id="finc-tasso_riacquisto_pct" value="${p.tasso_riacquisto_pct||''}" min="0" max="100" style="flex:1">\x3cspan style="color:var(--gray)">%\x3c/span>\x3c/div>\x3c/div>
      \x3cdiv class="form-group">\x3clabel>% fatturato top 3 clienti\x3c/label>\x3cdiv style="display:flex;align-items:center;gap:8px">\x3cinput class="form-input" type="number" id="finc-fatturato_top3_pct" value="${p.fatturato_top3_pct||''}" min="0" max="100" style="flex:1">\x3cspan style="color:var(--gray)">%\x3c/span>\x3c/div>\x3c/div>
    `;
  } else {
    // Header tipo clientela
    html += `\x3cdiv class="form-group full">
      \x3cdiv style="background:var(--bg3);border-radius:var(--rs);padding:10px 14px;display:flex;align-items:center;gap:10px">
        \x3cdiv style="font-size:18px">${tipoInfo.icon}\x3c/div>
        \x3cdiv>
          \x3cdiv style="font-size:12px;font-weight:600;color:${tipoInfo.color}">${tipoInfo.label}\x3c/div>
          \x3cdiv style="font-size:11px;color:var(--gray);margin-top:1px">KPI calibrati per questo tipo di business\x3c/div>
        \x3c/div>
      \x3c/div>
    \x3c/div>`;

    // KPI fields from profilo
    profilo.kpi.forEach(k => {
      // Churn ha senso solo se ci sono clienti attivi
      const clientiAttiviVal = parseFloat(document.getElementById('finc-clienti_attivi')?.value || kpi['clienti_attivi'] || kpi['officine_attive'] || 0);
      if ((k.id === 'churn_annuo_pct' || k.id === 'churn_mensile_pct' || k.id === 'churn_officine') && clientiAttiviVal <= 0) return;
      const val = kpi[k.id] !== undefined ? kpi[k.id] : '';
      const soglie = k.soglie;
      const livello = val !== '' && val !== null ? getSogliaColor(val, soglie) : null;
      const sc = livello ? SOGLIA_COLORS[livello] : null;

      let inputHtml = '';
      if (k.unita === '%') {
        inputHtml = `\x3cdiv style="display:flex;align-items:center;gap:8px">
          \x3cinput class="form-input" type="number" id="finc-${k.id}" value="${val}" min="0" max="100" step="0.1" style="flex:1">
          \x3cspan style="color:var(--gray);font-size:14px;flex-shrink:0">%\x3c/span>
        \x3c/div>`;
      } else if (k.unita === 'EUR') {
        inputHtml = `\x3cinput class="form-input" type="number" id="finc-${k.id}" value="${val}" min="0" step="1" placeholder="es. 5000">`;
      } else {
        inputHtml = `\x3cinput class="form-input" type="number" id="finc-${k.id}" value="${val}" min="0" step="0.1">`;
      }

      const sogliaNota = soglie ? (() => {
        const v = soglie.verde, g = soglie.giallo || soglie.gially, r = soglie.rosso;
        let parts = [];
        if (v) parts.push(`\x3cspan style="color:var(--green)">v ${v[0]}${k.unita==='%'?'%':''} - ${v[1]=== 999 || v[1]===9999 || v[1]===9999999 ? '∞' : v[1]+(k.unita==='%'?'%':'')}\x3c/span>`);
        if (g) parts.push(`\x3cspan style="color:var(--gold)">! ${g[0]}${k.unita==='%'?'%':''} - ${g[1]+(k.unita==='%'?'%':'')}\x3c/span>`);
        if (r) parts.push(`\x3cspan style="color:var(--red)">! ${r[0]}${k.unita==='%'?'%':''} - ${r[1]=== 999 || r[1]===9999 || r[1]===9999999 ? '∞' : r[1]+(k.unita==='%'?'%':'')}\x3c/span>`);
        return parts.join(' . ');
      })() : '';

      // Per i KPI opzionali: mostra il contesto invece delle soglie, e non colora in rosso se vuoto
      const isOpzionale = k.opzionale === true;
      // Se dipende da un altro KPI e quello ? 0/vuoto, salta
      if (k.dipende_da) {
        const depEl = document.getElementById('finc-' + k.dipende_da);
        const depVal = parseFloat(depEl?.value || kpi[k.dipende_da] || 0);
        if (depVal <= 0) return;
      }
      // Per opzionali: non colorare se vuoto
      const scEffettivo = (isOpzionale && (val === '' || val === null)) ? null : sc;

      html += `\x3cdiv class="form-group" style="${scEffettivo ? 'background:'+scEffettivo.bg+';border:1px solid '+scEffettivo.border+';border-radius:var(--rs);padding:8px 10px;' : isOpzionale ? 'border:1px dashed var(--border2);border-radius:var(--rs);padding:8px 10px;' : ''}">
        \x3clabel style="${scEffettivo ? 'color:'+scEffettivo.text+';' : isOpzionale ? 'color:var(--gray);' : ''}display:flex;align-items:center;gap:4px;flex-wrap:wrap">
          \x3cspan>${k.label}\x3c/span>
          ${isOpzionale ? '\x3cspan style="font-size:9px;color:var(--gray2);font-weight:400">(opzionale)\x3c/span>' : ''}
          ${k.unita ? '\x3cspan style="color:var(--gray2);font-size:10px">('+k.unita+')\x3c/span>' : ''}
          ${(k.note || k.contesto) ? `\x3cspan class="tt-wrap">\x3cspan class="tt-icon" style="${scEffettivo ? 'background:'+scEffettivo.border+';color:#fff;' : ''}">?\x3c/span>\x3cspan class="tt-bubble">${k.contesto ? '\x3cstrong>'+k.contesto+'\x3c/strong>\x3cbr>' : ''}${k.note || ''}\x3c/span>\x3c/span>` : ''}
        \x3c/label>
        ${inputHtml}

      \x3c/div>`;
    });
  }

  html += '\x3c/div>';
  html += `\x3cinput type="hidden" id="fin-current-tab" value="commerciale">`;
  return html;
}

async function saveCommercialeForm() {
  const p = prospects.find(x => x.id === currentId);
  if (!p) return;
  const profilo = PROFILI_COMMERCIALI[p.settore];

  const updates = {};
  const kpiUpdates = {};

  if (!profilo) {
    // Fallback
    const v = id => document.getElementById('finc-'+id)?.value;
    updates.clienti_attivi = parseInt(v('clienti_attivi')) || null;
    updates.nuovi_clienti_anno = parseInt(v('nuovi_clienti_anno')) || null;
    updates.tasso_riacquisto_pct = parseFloat(v('tasso_riacquisto_pct')) || null;
    updates.fatturato_top3_pct = parseFloat(v('fatturato_top3_pct')) || null;
  } else {
    profilo.kpi.forEach(k => {
      const el = document.getElementById('finc-' + k.id);
      if (!el) return;
      const val = el.value.trim();
      kpiUpdates[k.id] = val !== '' ? parseFloat(val) : null;
    });
    updates.kpi_commerciali = kpiUpdates;
  }

  const btn = document.getElementById('btn-save-fin');
  btn.textContent = 'Salvataggio...'; btn.disabled = true;

  try {
    // Deriva i nuovi valori dims dai KPI commerciali
    const kpiForDerive = profilo ? kpiUpdates : {
      clienti_attivi: updates.clienti_attivi,
      nuovi_clienti_anno: updates.nuovi_clienti_anno,
      tasso_riacquisto: updates.tasso_riacquisto_pct,
    };
    const newDims = deriveDimsFromKpi({...p, ...updates}, kpiForDerive);
    if (newDims) updates.dims = newDims;

    const {error} = await sb.from('prospects').update(updates).eq('id', currentId);
    if (error) throw error;
    const i = prospects.findIndex(x => x.id === currentId);
    prospects[i] = {...prospects[i], ...updates};

    // Auto-calcolo EBITDA dai dati finanziari inseriti
    // Priorità: ebitda esplicito > calcolo da cogs + costi fissi > stima da utile netto
    const pi = prospects[i];
    // Ricalcola EBITDA se la calcolatrice P&L ha dati (cogs + costi fissi)
    // oppure se ebitda non è ancora compilato ma ci sono dati sufficienti
    const hasPLData = pi.costi_fissi_mensili && pi.fatturato_anno_1 && (pi.cogs_pct || pi.cogs_val);
    if (pi.fatturato_anno_1 && (!pi.ebitda || hasPLData)) {
      let ebitdaCalcolato = null;
      if (hasPLData) {
        const cogs = pi.cogs_val > 0 ? pi.cogs_val : pi.fatturato_anno_1 * pi.cogs_pct / 100;
        const margineLordo = pi.fatturato_anno_1 - cogs;
        ebitdaCalcolato = Math.round((margineLordo - pi.costi_fissi_mensili * 12) / 1000) * 1000;
      } else if (pi.utile_netto && pi.fatturato_anno_1) {
        // Stima EBITDA: utile netto + ~4% ammortamenti tipici PMI
        ebitdaCalcolato = Math.round((pi.utile_netto + pi.fatturato_anno_1 * 0.04) / 1000) * 1000;
      } else if (pi.margine_pct && pi.fatturato_anno_1) {
        ebitdaCalcolato = Math.round(pi.fatturato_anno_1 * pi.margine_pct / 100 / 1000) * 1000;
      }
      if (ebitdaCalcolato !== null && ebitdaCalcolato > 0) {
        prospects[i].ebitda = ebitdaCalcolato;
        await sb.from('prospects').update({ebitda: ebitdaCalcolato}).eq('id', currentId);
      }
    }

    // Se fatturato_anno_1 aggiornato → aggiorna anche la fascia stimata
    if (updates.fatturato_anno_1) {
      const nuovaFascia = _fasciaFromAnno1(updates.fatturato_anno_1);
      if (nuovaFascia && prospects[i].fatturato !== nuovaFascia) {
        prospects[i].fatturato = nuovaFascia;
        await sb.from('prospects').update({fatturato: nuovaFascia}).eq('id', currentId);
      }
    }

    // Notify which dims were updated
    const updated = [];
    if (newDims?.vendite !== p.dims?.vendite) updated.push('Struttura commerciale');
    if (newDims?.ricavi !== p.dims?.ricavi) updated.push('Prevedibilità ricavi');
    if (newDims?.marketing !== p.dims?.marketing) updated.push('Marketing & lead gen');
    if (newDims?.pipeline !== p.dims?.pipeline) updated.push('Pipeline & CRM');

    const msg = updated.length
      ? `Dati salvati . Score aggiornato (${updated.join(', ')})`
      : 'Dati commerciali salvati';
    showToast(msg);

    closeModal('modal-financials');
    // Refresh full prospect view
    renderProspectDetail(currentId);
  } catch(e) {
    showToast('Errore: ' + e.message, 'error');
  } finally {
    btn.textContent = 'Salva'; btn.disabled = false;
  }
}


// -- DERIVA DIMS DA KPI COMMERCIALI ----------------------------------------
// Quando si salvano i KPI commerciali, aggiorna automaticamente 3 dimensioni
// dello score: vendite, ricavi, marketing
// Scala: 1-5 basata sui livelli soglia del profilo

function deriveDimsFromKpi(p, kpiData) {
  const profilo = PROFILI_COMMERCIALI[p.settore];
  if (!profilo || !kpiData) return null;

  const tipo = profilo.tipo_clientela;
  const dims = {...(p.dims || {})};

  // Helper: converti un valore in score 1-5 basato sulle soglie
  function toScore(val, soglie) {
    if (val === null || val === undefined) return null;
    const livello = getSogliaColor(val, soglie);
    if (livello === 'verde') return 5;
    if (livello === 'giallo') return 3;
    if (livello === 'rosso') return 1;
    return null;
  }

  // Helper: media di pi? score (ignora null)
  function avgScore(...scores) {
    const valid = scores.filter(s => s !== null);
    if (!valid.length) return null;
    return Math.round(valid.reduce((a,b) => a+b, 0) / valid.length);
  }

  // -- STRUTTURA COMMERCIALE --------------------------------------------
  // Basata su: canali attivi, clienti attivi, nuovi clienti, conversion rate
  // ? misura COME si vende, non chi
  let venditeScores = [];

  const kpiDefs = profilo.kpi;
  const find = id => kpiDefs.find(k => k.id === id);

  // Clienti attivi / officine / punti vendita
  ['clienti_attivi','officine_attive','punti_vendita_attivi','buyer_attivi',
   'clienti_professionali','clienti_industriali','ospedali_attivi'].forEach(id => {
    const def = find(id); const v = kpiData[id];
    if (def && v !== null && v !== undefined) venditeScores.push(toScore(v, def.soglie));
  });

  // Nuovi clienti / acquisizione
  ['nuovi_clienti_anno','lead_mensili','commesse_anno','progetti_anno'].forEach(id => {
    const def = find(id); const v = kpiData[id];
    if (def && v !== null && v !== undefined) venditeScores.push(toScore(v, def.soglie));
  });

  const venditeScore = avgScore(...venditeScores);
  if (venditeScore !== null) dims.vendite = Math.max(1, Math.min(5, venditeScore));

  // -- PREVEDIBILIT? RICAVI ----------------------------------------------
  // Basata su: retainer %, MRR, contratti quadro, churn, tasso riacquisto,
  //            durata contratti, sell-through
  let ricaviScores = [];

  ['retainer_pct','mrr','mrr_pct_fatturato','contratti_quadro_pct',
   'managed_services_pct','contratti_fornitura'].forEach(id => {
    const def = find(id); const v = kpiData[id];
    if (def && v !== null && v !== undefined) ricaviScores.push(toScore(v, def.soglie));
  });

  // Churn ? inverso: verde churn = verde ricavi
  ['churn_annuo_pct','churn_mensile_pct'].forEach(id => {
    const def = find(id); const v = kpiData[id];
    if (def && v !== null && v !== undefined) ricaviScores.push(toScore(v, def.soglie));
  });

  // Tasso riacquisto
  ['tasso_riacquisto','tasso_rinnovo_pct','tasso_rinnovo_retainer'].forEach(id => {
    const def = find(id); const v = kpiData[id];
    if (def && v !== null && v !== undefined) ricaviScores.push(toScore(v, def.soglie));
  });

  // Sell-through per retail/moda
  ['sell_through_pct','sell_through_saldi','sell_out_pct','sell_out_mensile_pct'].forEach(id => {
    const def = find(id); const v = kpiData[id];
    if (def && v !== null && v !== undefined) ricaviScores.push(toScore(v, def.soglie));
  });

  const ricaviScore = avgScore(...ricaviScores);
  if (ricaviScore !== null) dims.ricavi = Math.max(1, Math.min(5, ricaviScore));

  // -- MARKETING & LEAD GEN ---------------------------------------------
  // Basata su: referral rate, conversion rate, canali attivi, NPS,
  //            recensioni, presenza guide, community
  let mktScores = [];

  ['referral_rate','conversion_lead_vendita','conversion_preventivo',
   'conversion_rate','lead_response_min','nps','recensioni_google',
   'guide_presenza','wine_club_iscritti','clienti_online_pct','dtc_pct'].forEach(id => {
    const def = find(id); const v = kpiData[id];
    if (def && v !== null && v !== undefined) {
      // lead_response_min: verde = buono ma ? inverso (basso ? meglio) ? gi? gestito dalle soglie
      mktScores.push(toScore(v, def.soglie));
    }
  });

  const mktScore = avgScore(...mktScores);
  if (mktScore !== null) dims.marketing = Math.max(1, Math.min(5, mktScore));

  // -- PIPELINE & CRM ----------------------------------------------------
  // Basata su: fill rate, tempo risposta, clienti online, pipeline valore
  // NOTA: 'team' (Capitale umano) non si ricava dai KPI commerciali ?
  // ? una valutazione qualitativa che il CSO inserisce manualmente nel radar
  let pipelineScores = [];
  ['fill_rate_pct','tempo_risposta_h','tempo_risposta_min','pipeline_valore',
   'lead_response_min','clienti_online_pct'].forEach(id => {
    const def = find(id); const v = kpiData[id];
    if (def && v !== null && v !== undefined) pipelineScores.push(toScore(v, def.soglie));
  });
  const pipelineScore = avgScore(...pipelineScores);
  if (pipelineScore !== null) dims.pipeline = Math.max(1, Math.min(5, pipelineScore));

  return dims;
}


async function saveBenchCliente(key, value, label) {
  const p = prospects.find(x => x.id === currentId);
  if (!p) return;

  const current = p.dims_benchmark || {};
  const updated = { ...current, [key]: value };

  try {
    const { error } = await sb.from('prospects').update({ dims_benchmark: updated }).eq('id', currentId);
    if (error) throw error;
    const i = prospects.findIndex(x => x.id === currentId);
    prospects[i] = { ...prospects[i], dims_benchmark: updated };
    // Visual feedback on the input
    const el = document.getElementById('bi-' + key);
    if (el) {
      el.style.borderColor = 'var(--gold)';
      setTimeout(() => { if(el) el.style.borderColor = 'var(--border2)'; }, 1200);
    }
  } catch(e) {
    showToast('Errore salvataggio: ' + e.message, 'error');
  }
}




// ── BENCHMARK MODAL ────────────────────────────────────────────────────────

// Opzioni select per Lead gen (valori reali dal mercato)
var LEAD_GEN_OPTIONS = [
  'Passaparola', 'Passaparola + fiere', 'Passaparola + LinkedIn',
  'Agenti', 'Agenti + fiere', 'Agenti + LinkedIn', 'Agenti + catalogo',
  'Fiere di settore', 'Fiere + LinkedIn', 'Fiere + CRM outbound',
  'LinkedIn outbound', 'LinkedIn + Google Ads', 'LinkedIn + content',
  'Google Ads + SEO', 'Google + remarketing', 'SEO + blog',
  'Cold email', 'Cold email + LinkedIn', 'CRM outbound + referral',
  'Referral clienti', 'Referral + digital', 'Referral + LinkedIn',
  'KAM clienti esistenti', 'KAM + fiere', 'KAM + partner',
  'E-commerce', 'E-commerce + agenti', 'Marketplace (Amazon/ecc.)',
  'Teleselling', 'Teleselling + agenti',
  'Social media organico', 'Social + influencer',
  'Brand + eventi', 'Brand + showroom', 'Brand + referral',
  'GDO (grande distribuzione)', 'GDO + agenti',
  'Broker + agenti', 'Portali B2B', 'RFQ + gare',
  'Altro'
];

function openBenchModal() {
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;
  
  var bench = MARKET[p.settore];
  if (!bench) { showToast('Seleziona prima un settore', 'error'); return; }
  
  var clusterMetrics = (function() {
    var fasciaId = getFasciaId(p.fatturato_anno_1);
    var clusterFascia = MARKET_CLUSTER[p.settore] && fasciaId ? MARKET_CLUSTER[p.settore][fasciaId] : null;
    if (!clusterFascia) return bench.metrics.map(function(m){ return {label:m.label, media:m.media, top:m.top}; });
    var c = clusterFascia;
    return bench.metrics.map(function(m) {
      var l = m.label.toLowerCase();
      var media = m.media, top = m.top;
      if (l.includes('chiusura'))           { media = c.chiusura.media + '%';  top = c.chiusura.top + '%'; }
      else if (l.includes('fatturato') && l.includes('commerciale'))
                                            { media = c.fatxcomm.media + 'k EUR'; top = c.fatxcomm.top + 'k EUR'; }
      else if (l.includes('ciclo'))         { media = c.ciclo.media + ' gg';   top = c.ciclo.top + ' gg'; }
      else if (l.includes('uso crm') || (l.includes('crm') && !l.includes('commerciale')))
                                            { media = c.crm.media + '%';       top = c.crm.top + '%'; }
      else if (l.includes('clienti persi') || l.includes('churn'))
                                            { media = c.churn.media + '%';     top = c.churn.top + '%'; }
      else if (l.includes('lead gen'))      { media = c.lead_gen.media;        top = c.lead_gen.top; }
      return {label:m.label, media:media, top:top};
    });
  })();
  
  var benchCliente = p.dims_benchmark || {};
  
  var html = clusterMetrics.map(function(m) {
    var key = m.label.toLowerCase().replace(/[^a-z0-9]/g, '_');
    var autoVal = getClienteVal(m.label, p);
    var savedVal = benchCliente[key] !== undefined ? benchCliente[key] : '';
    var currentVal = savedVal || '';
    var isLeadGen = m.label.toLowerCase().includes('lead gen') || m.label.toLowerCase().includes('canale');
    var isAuto = autoVal && !savedVal;
    
    var inputHtml;
    if (isLeadGen) {
      // Select con opzioni predefinite
      var opts = LEAD_GEN_OPTIONS.map(function(o) {
        return '\x3coption value="' + o + '"' + (currentVal === o ? ' selected' : '') + '>' + o + '\x3c/option>';
      }).join('');
      inputHtml = '\x3cselect id="bm-' + key + '" style="width:100%;padding:8px 10px;background:var(--bg3);border:1px solid var(--border2);border-radius:8px;color:var(--white);font-size:13px;font-family:inherit">' +
        '\x3coption value="">-- seleziona --\x3c/option>' + opts + '\x3c/select>';
    } else if (autoVal) {
      // Calcolato automaticamente — mostra come read-only con info
      inputHtml = '\x3cdiv style="display:flex;align-items:center;gap:8px">' +
        '\x3cinput id="bm-' + key + '" type="text" value="' + autoVal + '" readonly ' +
        'style="flex:1;padding:8px 10px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;color:var(--gray);font-size:13px;font-family:inherit;cursor:not-allowed">' +
        '\x3cspan style="font-size:10px;color:var(--gray2);white-space:nowrap">calcolato auto\x3c/span>' +
        '\x3c/div>';
    } else {
      // Input numerico libero
      var unit = getBenchUnit(m.label);
      inputHtml = '\x3cdiv style="display:flex;align-items:center;gap:6px">' +
        '\x3cinput id="bm-' + key + '" type="number" value="' + currentVal + '" placeholder="--" min="0" ' +
        'style="flex:1;padding:8px 10px;background:var(--bg3);border:1px solid var(--border2);border-radius:8px;color:var(--white);font-size:13px;font-family:inherit">' +
        (unit ? '\x3cspan style="font-size:12px;color:var(--gray2);min-width:20px">' + unit + '\x3c/span>' : '') +
        '\x3c/div>';
    }
    
    return '\x3cdiv style="margin-bottom:14px">' +
      '\x3cdiv style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:5px">' +
        '\x3clabel style="font-size:12px;font-weight:600;color:var(--white)">' + m.label + '\x3c/label>' +
        '\x3cspan style="font-size:10px;color:var(--gray2)">Media: ' + m.media + ' &nbsp; Best: \x3cspan style="color:var(--green)">' + m.top + '\x3c/span>\x3c/span>' +
      '\x3c/div>' +
      inputHtml +
    '\x3c/div>';
  }).join('');
  
  document.getElementById('bench-modal-fields').innerHTML = html;
  document.getElementById('modal-bench').style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Store metrics keys for saving
  window._benchModalKeys = clusterMetrics.map(function(m){
    return { key: m.label.toLowerCase().replace(/[^a-z0-9]/g,'_'), autoVal: getClienteVal(m.label, p) };
  });
}

function closeBenchModal() {
  document.getElementById('modal-bench').style.display = 'none';
  document.body.style.overflow = '';
}

async function saveBenchModal() {
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;
  
  var current = p.dims_benchmark || {};
  var updated = Object.assign({}, current);
  
  window._benchModalKeys.forEach(function(item) {
    if (item.autoVal) return; // skip auto-calculated
    var el = document.getElementById('bm-' + item.key);
    if (el && el.value !== '') updated[item.key] = el.value;
    else if (el && el.value === '') delete updated[item.key];
  });
  
  try {
    var result = await sb.from('prospects').update({ dims_benchmark: updated }).eq('id', currentId);
    if (result.error) throw result.error;
    var i = prospects.findIndex(function(x){ return x.id === currentId; });
    prospects[i] = Object.assign({}, prospects[i], { dims_benchmark: updated });
    closeBenchModal();
    renderProspectDetail(currentId);
    showToast('Dati benchmark salvati', 'ok');
  } catch(e) {
    showToast('Errore: ' + e.message, 'error');
  }
}


