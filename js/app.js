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

  var _DIMS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  var _DIM_LABELS = {
    vendite:'Vendite', pipeline:'Pipeline', team:'Team', processi:'Processi',
    ricavi:'Ricavi', marketing:'Marketing', sitoweb:'Sito Web',
    ecommerce: (typeof getDimLabel === 'function') ? getDimLabel(p.settore, 'ecommerce') : 'Ecommerce'
  };

  var oggi = new Date().toISOString().split('T')[0];
  var slidersHtml = _DIMS.map(function(d) {
    var val = p.dims?.[d] || 1;
    return '<div class="sess-dim-row">' +
      '<div class="sess-dim-header">' +
        '<label class="sess-dim-label">' + _DIM_LABELS[d] + '</label>' +
        '<span class="sess-dim-val" id="sess-val-' + d + '">' + val + '</span>' +
      '</div>' +
      '<input type="range" class="sess-slider" id="sess-' + d + '" min="1" max="5" step="1" value="' + val + '"' +
        ' oninput="document.getElementById(\'sess-val-' + d + '\').textContent=this.value">' +
      '<div class="sess-slider-marks"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>' +
    '</div>';
  }).join('');

  document.getElementById('modal-sessione-body').innerHTML =
    '<div class="sess-date-row">' +
      '<label>Data sessione</label>' +
      '<input class="form-input" id="sess-data" type="date" value="' + oggi + '">' +
    '</div>' +
    '<div class="sess-note-row">' +
      '<label>Note sessione</label>' +
      '<textarea class="form-input" id="sess-note" rows="2" placeholder="Cosa è stato affrontato in questa sessione..."></textarea>' +
    '</div>' +
    '<div class="sess-dims-title">Aggiorna i valori reali raggiunti</div>' +
    '<div class="sess-dims-grid">' + slidersHtml + '</div>';

  document.getElementById('modal-sessione-title').textContent = 'Registra sessione \u2014 ' + p.nome;
  document.getElementById('modal-sessione').style.display = 'flex';
}

async function saveSessione() {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;

  var _DIMS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  var newDims = {};
  _DIMS.forEach(function(d) {
    var el = document.getElementById('sess-' + d);
    if (el) newDims[d] = parseInt(el.value);
  });

  var nota = (document.getElementById('sess-note')?.value || '');
  var data = (document.getElementById('sess-data')?.value || new Date().toISOString().split('T')[0]);

  p.dims = newDims;
  await sb.from('prospects').update({ dims: newDims }).eq('id', p.id);

  var snapshot = {
    data: new Date(data).toISOString(),
    score: calcScore(p),
    score_base: calcScore(p),
    dims: Object.assign({}, newDims),
    targets: Object.assign({}, p.targets || {}),
    evento: 'Sessione registrata',
    nota: nota,
  };
  p.score_history = (p.score_history || []).concat([snapshot]);
  await sb.from('prospects').update({ score_history: p.score_history }).eq('id', p.id);

  document.getElementById('modal-sessione').style.display = 'none';
  renderProspectDetail(p.id);
  showToast('Sessione registrata con successo');
  await aggiornaStatoAutomatico(p.id, 'diagnosi');
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
  var idxAttuale = ordine.indexOf(p.stato);
  var idxNuovo = ordine.indexOf(nuovoStato);
  if (idxNuovo <= idxAttuale) return;
  p.stato = nuovoStato;
  await sb.from('prospects').update({ stato: nuovoStato }).eq('id', prospectId);
  showToast('Stato aggiornato: ' + nuovoStato.charAt(0).toUpperCase() + nuovoStato.slice(1));
  renderSidebar();
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
  var ic = null;
  try { ic = _calcolaImpattoCumulativo(p); } catch(e) {}
  var feeMensile = ic ? (ic.costoMensileTot || 0) : 0;
  var unatantum = ic ? (ic.costoUnaTantumTot || 0) : 0;
  var dati = prev ? (prev.dati || {}) : {};
  var DIMS_IDS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  var DIM_LBL = {vendite:'Vendite',pipeline:'Pipeline',team:'Team',processi:'Processi',ricavi:'Ricavi',marketing:'Marketing',sitoweb:'Sito Web',ecommerce:(typeof getDimLabel==='function'?getDimLabel(p.settore,'ecommerce'):'Ecommerce')};
  var dimsAttive = DIMS_IDS.filter(function(d) { return p.targets && p.targets[d] && p.targets[d] > (p.dims?.[d]||1); });
  var modal = document.getElementById('modal-preventivo');
  var body = document.getElementById('modal-preventivo-body');
  if (!modal || !body) return;
  document.getElementById('modal-preventivo-title').textContent = prev ? 'Modifica Preventivo' : 'Nuovo Preventivo';
  var oggi = new Date().toISOString().split('T')[0];
  var fatObj12 = (ic && ic.fat12) ? Math.round((ic.fat12[0]+ic.fat12[1])/2) : '';
  body.innerHTML =
    '<div class="prev-form">' +
      '<div class="prev-section-title">Dati cliente</div>' +
      '<div class="form-grid">' +
        '<div class="form-group form-group-full"><label>Azienda</label><input class="form-input" id="prev-azienda" value="' + (p.nome||'') + '" readonly></div>' +
        '<div class="form-group"><label>Referente</label><input class="form-input" id="prev-referente" value="' + (dati.referente||p.referente||'') + '"></div>' +
        '<div class="form-group"><label>Data preventivo</label><input class="form-input" type="date" id="prev-data" value="' + (dati.data||oggi) + '"></div>' +
        '<div class="form-group"><label>Validita (giorni)</label><input class="form-input" type="number" id="prev-validita" value="' + (dati.validita||30) + '"></div>' +
        '<div class="form-group"><label>Durata mandato</label><select class="form-input" id="prev-durata">' +
          ['6 mesi','12 mesi','24 mesi'].map(function(v) { return '<option value="'+v+'"'+((dati.durata||'12 mesi')===v?' selected':'')+'>'+v+'</option>'; }).join('') +
        '</select></div>' +
      '</div>' +
      '<div class="prev-section-title" style="margin-top:16px">Scope del mandato</div>' +
      '<div class="prev-dims-check">' +
        DIMS_IDS.map(function(d) {
          var checked = dati.scope ? dati.scope.indexOf(d) >= 0 : dimsAttive.indexOf(d) >= 0;
          return '<label class="prev-dim-check"><input type="checkbox" value="'+d+'"'+(checked?' checked':'')+'>'+DIM_LBL[d]+'</label>';
        }).join('') +
      '</div>' +
      '<div class="prev-section-title" style="margin-top:16px">Investimento</div>' +
      '<div class="form-grid">' +
        '<div class="form-group"><label>Fee mensile</label><input class="form-input" type="number" id="prev-fee" value="' + (dati.fee_mensile||feeMensile) + '"></div>' +
        '<div class="form-group"><label>Una tantum</label><input class="form-input" type="number" id="prev-unatantum" value="' + (dati.una_tantum||unatantum) + '"></div>' +
        '<div class="form-group"><label>Fatturato attuale</label><input class="form-input" type="number" id="prev-fatattuale" value="' + (dati.fat_attuale||p.fatturato_anno_1||'') + '"></div>' +
        '<div class="form-group"><label>Fatturato obiettivo 12m</label><input class="form-input" type="number" id="prev-fatobj" value="' + (dati.fat_obiettivo||fatObj12) + '"></div>' +
      '</div>' +
      '<div class="prev-section-title" style="margin-top:16px">Note e condizioni</div>' +
      '<textarea class="form-input" id="prev-note" rows="3" placeholder="Note aggiuntive, condizioni particolari...">' + (dati.note||'') + '</textarea>' +
    '</div>';
  modal.style.display = 'flex';
  modal._editingId = existingId || null;
}

async function savePreventivo() {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;
  var scope = [];
  document.querySelectorAll('#modal-preventivo-body input[type=checkbox]:checked').forEach(function(cb) { scope.push(cb.value); });
  var dati = {
    data: document.getElementById('prev-data')?.value,
    validita: parseInt(document.getElementById('prev-validita')?.value)||30,
    durata: document.getElementById('prev-durata')?.value,
    fee_mensile: parseFloat(document.getElementById('prev-fee')?.value)||0,
    una_tantum: parseFloat(document.getElementById('prev-unatantum')?.value)||0,
    fat_attuale: parseFloat(document.getElementById('prev-fatattuale')?.value)||0,
    fat_obiettivo: parseFloat(document.getElementById('prev-fatobj')?.value)||0,
    note: document.getElementById('prev-note')?.value||'',
    referente: document.getElementById('prev-referente')?.value||'',
    scope: scope,
  };
  var modal = document.getElementById('modal-preventivo');
  var editingId = modal ? modal._editingId : null;
  if (editingId) {
    await sb.from('preventivi').update({ dati: dati, stato: 'bozza' }).eq('id', editingId);
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
  showToast('Stato preventivo: ' + nuovoStato);
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
        '</div>' +
      '</div>';
    }).join('');
}

function stampaPrev(id) {
  var pv = _preventiviList.find(function(x) { return x.id === id; });
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!pv || !p) return;
  var d = pv.dati || {};
  var DIMS_LABELS = {vendite:'Vendite',pipeline:'Pipeline',team:'Team',processi:'Processi',ricavi:'Ricavi',marketing:'Marketing',sitoweb:'Sito Web',ecommerce:'Ecommerce'};
  var totMensile = d.fee_mensile || 0;
  var durMesi = parseInt(d.durata) || 12;
  var totale = Math.round(totMensile * durMesi + (d.una_tantum||0));
  var scadenza = new Date(d.data);
  scadenza.setDate(scadenza.getDate() + (d.validita||30));
  var win = window.open('', '_blank');
  win.document.write('<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"><title>Preventivo - ' + p.nome + '</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,Helvetica Neue,Arial,sans-serif;color:#1a2a3a;background:#fff}.page{max-width:800px;margin:0 auto;padding:48px 56px}.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:48px;padding-bottom:24px;border-bottom:2px solid #0C2340}.logo{font-size:18px;font-weight:700;color:#0C2340}.logo-sub{font-size:10px;color:#8AA4BF;letter-spacing:1px;text-transform:uppercase;margin-top:2px}.doc-info{text-align:right}.doc-tipo{font-size:22px;font-weight:700;color:#0C2340}.doc-data{font-size:12px;color:#4A6180;margin-top:4px}.section{margin-bottom:32px}.section-title{font-size:10px;font-weight:700;color:#C8A84B;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:12px;padding-bottom:6px;border-bottom:1px solid #E8EFF7}.two-col{display:grid;grid-template-columns:1fr 1fr;gap:24px}.field-label{font-size:11px;color:#4A6180;margin-bottom:3px}.field-val{font-size:14px;color:#0C2340;font-weight:500}.inv-table{width:100%;border-collapse:collapse}.inv-table th{font-size:11px;font-weight:600;color:#4A6180;text-align:left;padding:8px 12px;background:#F7FAFC;border-bottom:1px solid #E0DAD0}.inv-table td{padding:10px 12px;border-bottom:1px solid #F0F4F8;font-size:13px}.inv-table tr.total td{font-weight:700;font-size:15px;color:#0C2340;border-top:2px solid #0C2340;border-bottom:none;padding-top:14px}.scope-tags{display:flex;flex-wrap:wrap;gap:6px}.scope-tag{background:#E8EFF7;color:#0C2340;font-size:11px;font-weight:500;padding:4px 10px;border-radius:4px}.note-box{background:#F7FAFC;border-left:3px solid #C8A84B;padding:12px 16px;font-size:13px;color:#4A6180;line-height:1.6}.footer{margin-top:48px;padding-top:20px;border-top:1px solid #E0DAD0;display:flex;justify-content:space-between;font-size:11px;color:#8AA4BF}.validity{background:#FDF6E3;border:1px solid #D4A017;border-radius:6px;padding:10px 14px;font-size:12px;color:#B8860B;margin-top:16px}@media print{body{padding:0}.page{padding:32px 40px}}</style></head><body><div class="page"><div class="header"><div><div class="logo">Fractional CSO</div><div class="logo-sub">Consulenza Commerciale</div></div><div class="doc-info"><div class="doc-tipo">Preventivo</div><div class="doc-data">N. ' + (Math.floor(Math.random()*9000)+1000) + ' &middot; ' + (d.data ? new Date(d.data).toLocaleDateString('it-IT',{day:'2-digit',month:'long',year:'numeric'}) : '\u2014') + '</div></div></div><div class="section"><div class="section-title">Dati cliente</div><div class="two-col"><div><div class="field-label">Azienda</div><div class="field-val">' + (p.nome||'\u2014') + '</div></div><div><div class="field-label">Referente</div><div class="field-val">' + (d.referente||p.referente||'\u2014') + '</div></div><div><div class="field-label">Settore</div><div class="field-val">' + (p.settore||'\u2014') + '</div></div><div><div class="field-label">Fatturato attuale</div><div class="field-val">' + (d.fat_attuale ? d.fat_attuale.toLocaleString('it-IT')+'\u20AC' : '\u2014') + '</div></div></div></div><div class="section"><div class="section-title">Scope del mandato</div><div class="scope-tags">' + (d.scope||[]).map(function(s){return '<span class="scope-tag">'+(DIMS_LABELS[s]||s)+'</span>';}).join('') + '</div><div style="margin-top:10px"><div class="field-label">Durata mandato</div><div class="field-val">' + (d.durata||'\u2014') + '</div></div>' + (d.fat_obiettivo ? '<div style="margin-top:10px"><div class="field-label">Fatturato obiettivo 12 mesi</div><div class="field-val" style="color:#1CB889">' + d.fat_obiettivo.toLocaleString('it-IT') + '\u20AC</div></div>' : '') + '</div><div class="section"><div class="section-title">Piano di investimento</div><table class="inv-table"><thead><tr><th>Voce</th><th>Importo</th><th>Note</th></tr></thead><tbody><tr><td>Fee mensile consulenza</td><td>' + totMensile.toLocaleString('it-IT') + '\u20AC/mese</td><td>Per ' + (d.durata||'\u2014') + '</td></tr>' + (d.una_tantum ? '<tr><td>Setup iniziale (una tantum)</td><td>' + d.una_tantum.toLocaleString('it-IT') + '\u20AC</td><td>Da corrispondere all\'avvio</td></tr>' : '') + '<tr><td>Totale fee per durata mandato</td><td>' + (totMensile*durMesi).toLocaleString('it-IT') + '\u20AC</td><td>Escluso setup</td></tr><tr class="total"><td>Investimento totale</td><td colspan="2">' + totale.toLocaleString('it-IT') + '\u20AC</td></tr></tbody></table></div>' + (d.note ? '<div class="section"><div class="section-title">Note e condizioni</div><div class="note-box">' + d.note + '</div></div>' : '') + '<div class="validity">Preventivo valido fino al ' + scadenza.toLocaleDateString('it-IT',{day:'2-digit',month:'long',year:'numeric'}) + ' &middot; Prezzi IVA esclusa</div><div class="footer"><span>Fractional CSO \u2014 Consulenza Commerciale per PMI</span><span>Documento generato il ' + new Date().toLocaleDateString('it-IT') + '</span></div></div><script>window.onload=function(){window.print();}<\/script></body></html>');
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
  if(name==='listino') { setTimeout(()=>{ const s=document.getElementById('listino-macro-select'); if(s) renderListinoTable(s.value); },50); }
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
    const desc=DIM_DESC[d.id]?.[v-1]||'';
    const tgtDesc=t?DIM_DESC[d.id]?.[t-1]||'':'';
    const tgtStr = t ? `\x3cspan style="font-size:10px;color:var(--gold-dim);margin-left:6px">-> ${t}/5\x3c/span>` : '';
    return `\x3cdiv class="dim-row" style="margin-bottom:10px">
      \x3cdiv class="dim-label" style="display:flex;align-items:center;margin-bottom:3px">${getDimLabel(p.settore, d.id)}${tgtStr}\x3c/div>
      \x3cdiv style="display:flex;align-items:center;gap:8px">
        \x3cdiv class="dim-bar-bg" style="flex:1">\x3cdiv class="dim-bar-fill" style="width:${pct}%;background:${col}">\x3c/div>\x3c/div>
        \x3cdiv class="dim-val" style="color:${col}">${v}/5\x3c/div>
      \x3c/div>
      \x3cdiv style="font-size:10px;color:${col};margin-top:2px;line-height:1.3">${desc}\x3c/div>
      ${tgtDesc && t!==v ? `\x3cdiv style="font-size:10px;color:var(--gold-dim);margin-top:1px">Obiettivo: ${tgtDesc}\x3c/div>` : ''}
    \x3c/div>`;
  }).join('');

  // Draw radar + target editor
  setTimeout(() => {
    drawRadar(p.dims || {}, p.targets || {}, p.settore);
    renderTargetEditor(p);
    // Mega-grafico cumulativo sotto la ragnatela
    const megaSection = document.getElementById('mega-grafico-section');
    if (megaSection) { const _mg = _buildMegaGrafico(p); if (_mg !== null) megaSection.innerHTML = _mg; }
    // Grafico timeline progressione
    const tlContainer = document.getElementById('grafico-timeline-container');
    if (tlContainer) tlContainer.innerHTML = _buildGraficoTimeline(p);
    // Salva snapshot iniziale se non ha ancora storia
    if (!p.score_history || p.score_history.length === 0) {
      salvaScoreSnapshot(p, 'Prima valutazione');
    }
  }, 50);

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
          ${['Srl','Spa','Sas','Snc','Ditta individuale','Cooperativa','Altro'].map(f=>`<option value="${f}" ${p.forma_giuridica===f?'selected':''}>${f}</option>`).join('')}
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
      const impattoRaw = _getImpatto(settore, d.id, cur + '-' + (cur + 1));
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
    const tabs = ['financials','struttura','commerciale','strategico','kpi'];
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
  const hasData = p.fatturato_anno_1 || p.utile_netto || p.ebitda || p.costi_fissi_mensili;

  if (!hasData) {
    document.getElementById('fin-financials-content').innerHTML = `
      \x3cdiv class="no-data-msg">Nessun dato finanziario inserito
        \x3cspan>Clicca "Modifica" per aggiungere fatturato, utile e struttura dei costi\x3c/span>
      \x3c/div>
      \x3cdiv style="text-align:center">\x3cbutton class="fin-edit-btn" onclick="openFinModal('financials')">+ Aggiungi dati finanziari\x3c/button>\x3c/div>`;
    return;
  }

  // Trend fatturato
  let trend = '';
  if (p.fatturato_anno_1 && p.fatturato_anno_2) {
    const diff = ((p.fatturato_anno_1 - p.fatturato_anno_2) / p.fatturato_anno_2 * 100).toFixed(1);
    trend = diff > 0
      ? `\x3cspan class="trend-up">▲ ${diff}% vs anno prec.\x3c/span>`
      : `\x3cspan class="trend-down">▼ ${Math.abs(diff)}% vs anno prec.\x3c/span>`;
  }

  const margPct = p.margine_pct ? p.margine_pct + '%' : (p.fatturato_anno_1 && p.utile_netto ? (p.utile_netto/p.fatturato_anno_1*100).toFixed(1)+'%' : '--');

  document.getElementById('fin-financials-content').innerHTML = `
    \x3cdiv class="fin-grid">
      \x3cdiv class="fin-kpi">
        \x3cdiv class="fin-kpi-label">Fatturato ${p.fatturato_anno_1_label || 'ultimo anno'}\x3c/div>
        \x3cdiv class="fin-kpi-val gold">${fmt(p.fatturato_anno_1,'EUR')}\x3c/div>
        \x3cdiv class="fin-kpi-sub">${trend || (p.fatturato_anno_2 ? 'Anno prec.: ' + fmt(p.fatturato_anno_2,'EUR') : '')}\x3c/div>
      \x3c/div>
      \x3cdiv class="fin-kpi">
        \x3cdiv class="fin-kpi-label">Utile netto\x3c/div>
        \x3cdiv class="fin-kpi-val ${p.utile_netto > 0 ? 'positive' : p.utile_netto < 0 ? 'negative' : ''}">${fmt(p.utile_netto,'EUR')}\x3c/div>
        \x3cdiv class="fin-kpi-sub">Margine: ${margPct}\x3c/div>
      \x3c/div>
      \x3cdiv class="fin-kpi">
        \x3cdiv class="fin-kpi-label">EBITDA\x3c/div>
        \x3cdiv class="fin-kpi-val ${p.ebitda > 0 ? 'positive' : ''}">${fmt(p.ebitda,'EUR')}\x3c/div>
        \x3cdiv class="fin-kpi-sub">${p.ebitda && p.fatturato_anno_1 ? 'EBITDA margin: '+(p.ebitda/p.fatturato_anno_1*100).toFixed(1)+'%' : ''}\x3c/div>
      \x3c/div>
    \x3c/div>
    \x3cdiv class="fin-section-label">Struttura dei costi\x3c/div>
    \x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">Costi fissi mensili\x3c/div>\x3cdiv class="fin-field-val">${fmt(p.costi_fissi_mensili,'EUR')}\x3c/div>\x3c/div>
    \x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">Costi fissi annuali (stima)\x3c/div>\x3cdiv class="fin-field-val">${p.costi_fissi_mensili ? fmt(p.costi_fissi_mensili*12,'EUR') : '--'}\x3c/div>\x3c/div>
    \x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">Margine % dichiarato\x3c/div>\x3cdiv class="fin-field-val">${p.margine_pct ? p.margine_pct+'%' : '--'}\x3c/div>\x3c/div>
    \x3cdiv class="fin-section-label">Immobili & Finanziamenti\x3c/div>
    \x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">Immobili di proprieta\x3c/div>\x3cdiv class="fin-field-val">${fmtBool(p.immobili_proprieta)}${p.immobili_valore ? ' . ' + fmt(p.immobili_valore,'EUR') : ''}\x3c/div>\x3c/div>
    \x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">Leasing/finanziamenti -- rata mensile totale\x3c/div>\x3cdiv class="fin-field-val">${fmt(p.leasing_rata_mensile,'EUR')}\x3c/div>\x3c/div>
    ${p.leasing_note ? `\x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">Note leasing\x3c/div>\x3cdiv class="fin-field-val" style="font-size:12px;color:var(--gray)">${p.leasing_note}\x3c/div>\x3c/div>` : ''}
    \x3cdiv class="fin-field-row">\x3cdiv class="fin-field-label">Banche di riferimento\x3c/div>\x3cdiv class="fin-field-val">${p.banche_riferimento || '--'}\x3c/div>\x3c/div>
    \x3cdiv style="text-align:right">\x3cbutton class="fin-edit-btn" onclick="openFinModal('financials')">Modifica\x3c/button>\x3c/div>`;
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
  var KPI_LIST = [
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
    { id: 'arr', label: 'ARR \u2014 Fatturato ricorrente annuale', unita: '\u20AC' },
  ];
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
  var KPI_IDS = ['tasso_conversione_pct','ciclo_vendita_gg','valore_medio_ordine',
    'concentrazione_top3_pct','tasso_riacquisto_pct','nuovi_clienti_anno',
    'clienti_attivi','fatturato_referral_pct','cac','dso_gg','arr'];
  var kpi_commerciali = {};
  KPI_IDS.forEach(function(id) {
    var val = parseFloat(document.getElementById('kpiedit-'+id)?.value);
    kpi_commerciali[id] = isNaN(val) ? null : val;
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
    fields: [
      { id:'fatturato_anno_1', label:'Fatturato anno corrente', fmt:'euro' },
      { id:'fatturato_anno_1_label', label:'Anno di riferimento', fmt:'anno' },
      { id:'fatturato_anno_2', label:'Fatturato anno precedente', fmt:'euro' },
      { id:'fatturato_anno_2_label', label:'Anno precedente', fmt:'anno', readonly:true },
      { id:'costi_fissi_mensili', label:'Costi fissi mensili', fmt:'euro' },
      { id:'immobili_valore', label:'Valore immobili di proprieta', fmt:'euro' },
      { id:'leasing_rata_mensile', label:'Rata mensile totale leasing/finanz.', fmt:'euro' },
      { id:'leasing_note', label:'Note leasing/finanziamenti', fmt:'text', placeholder:'es. Auto aziendale + macchinario' },
      { id:'banche_riferimento', label:'Banche di riferimento', fmt:'text', placeholder:'es. Intesa, UniCredit' },
      { id:'utile_netto', label:'Utile netto', fmt:'euro' },
      { id:'ebitda', label:'EBITDA (calcolato)', fmt:'euro', readonly: true },
      { id:'margine_pct', label:'Margine % dichiarato', fmt:'pct' },
    ],
    bools: [{ id:'immobili_proprieta', label:'Immobili di proprieta' }],
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
  }
};

function renderCronistoria(p) {
  const card = document.getElementById('card-cronistoria');
  const container = document.getElementById('cronistoria-content');
  if (!card || !container) return;
  const history = p.score_history || [];
  if (history.length === 0) {
    card.style.display = 'none';
    return;
  }
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
  const chiave = fromStep + '-' + toStep;
  if (AZIONI_TARGET_BY_SETTORE[settore] && AZIONI_TARGET_BY_SETTORE[settore][dimId] && AZIONI_TARGET_BY_SETTORE[settore][dimId][chiave]) {
    return AZIONI_TARGET_BY_SETTORE[settore][dimId][chiave];
  }
  if (AZIONI_TARGET_GENERIC[dimId] && AZIONI_TARGET_GENERIC[dimId][chiave]) {
    return AZIONI_TARGET_GENERIC[dimId][chiave][0] || null;
  }
  return null;
}

function _getCosto(settore, dimId, fromStep, toStep) {
  const chiave = fromStep + '-' + toStep;
  // Prima cerca in COSTI_BY_SETTORE (override specifico)
  if (COSTI_BY_SETTORE[settore]?.[dimId]?.[chiave]) {
    return COSTI_BY_SETTORE[settore][dimId][chiave];
  }
  // Fallback: legge da LISTINO_DEFAULT via MICRO_TO_MACRO
  const macro = MICRO_TO_MACRO[settore] || settore;
  if (LISTINO_DEFAULT[macro]?.[dimId]?.[chiave]) {
    return LISTINO_DEFAULT[macro][dimId][chiave];
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
  const targetLvl = parseInt((stepKey || '').split('-')[1]) || 5;
  if (targetLvl > tetto) return null;
  const settoreData = IMPATTO_BY_SETTORE[settore] || IMPATTO_BY_SETTORE['manifatturiero_meccanica'];
  const dimData = settoreData?.[dimId];
  return dimData?.[stepKey] || null;
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
  "manifatturiero_meccanica":        {"vendite":28,"pipeline":12,"team":12,"processi":10,"ricavi":10,"marketing":14,"sitoweb":8,"ecommerce":6},
  "manifatturiero_automotive":       {"vendite":30,"pipeline":14,"team":12,"processi":11,"ricavi":11,"marketing":12,"sitoweb":6,"ecommerce":4},
  "manifatturiero_packaging":        {"vendite":26,"pipeline":11,"team":11,"processi":10,"ricavi":10,"marketing":16,"sitoweb":9,"ecommerce":7},
  "manifatturiero_cterzi":           {"vendite":30,"pipeline":13,"team":13,"processi":12,"ricavi":10,"marketing":12,"sitoweb":7,"ecommerce":3},
  "manifatturiero_elettromeccanica": {"vendite":28,"pipeline":12,"team":12,"processi":11,"ricavi":12,"marketing":13,"sitoweb":8,"ecommerce":4},
  "manifatturiero_tessile":          {"vendite":30,"pipeline":10,"team":11,"processi":8, "ricavi":10,"marketing":20,"sitoweb":7,"ecommerce":4},
  "servizi_it":                      {"vendite":24,"pipeline":17,"team":15,"processi":9, "ricavi":13,"marketing":13,"sitoweb":7,"ecommerce":2},
  "servizi_formazione":              {"vendite":24,"pipeline":16,"team":14,"processi":9, "ricavi":13,"marketing":14,"sitoweb":6,"ecommerce":4},
  "edilizia_residenziale":           {"vendite":32,"pipeline":14,"team":12,"processi":10,"ricavi":12,"marketing":12,"sitoweb":6,"ecommerce":2},
  "edilizia_impianti":               {"vendite":30,"pipeline":14,"team":12,"processi":10,"ricavi":14,"marketing":12,"sitoweb":6,"ecommerce":2},
  "edilizia_ristrutturazioni":       {"vendite":32,"pipeline":13,"team":12,"processi":10,"ricavi":11,"marketing":13,"sitoweb":6,"ecommerce":3},
  "edilizia_serramenti":             {"vendite":26,"pipeline":13,"team":11,"processi":9, "ricavi":11,"marketing":12,"sitoweb":10,"ecommerce":8},
  "commercio_distribuzione_industriale": {"vendite":30,"pipeline":14,"team":10,"processi":8,"ricavi":14,"marketing":10,"sitoweb":6,"ecommerce":8},
  "commercio_ingrosso_alimentare":   {"vendite":28,"pipeline":13,"team":10,"processi":8, "ricavi":16,"marketing":10,"sitoweb":5,"ecommerce":10},
  "commercio_materiali_edili":       {"vendite":30,"pipeline":13,"team":10,"processi":8, "ricavi":14,"marketing":11,"sitoweb":7,"ecommerce":7},
  "commercio_ricambi_auto":          {"vendite":28,"pipeline":12,"team":10,"processi":8, "ricavi":15,"marketing":9, "sitoweb":6,"ecommerce":12},
  "commercio_abbigliamento_ingrosso":{"vendite":28,"pipeline":12,"team":10,"processi":8, "ricavi":14,"marketing":14,"sitoweb":7,"ecommerce":7},
  "commercio_elettronica":           {"vendite":26,"pipeline":13,"team":10,"processi":8, "ricavi":13,"marketing":11,"sitoweb":7,"ecommerce":12},
  "commercio_abbigliamento_dettaglio":{"vendite":20,"pipeline":10,"team":10,"processi":8,"ricavi":10,"marketing":18,"sitoweb":6,"ecommerce":18},
  "commercio_orologi_gioielli":      {"vendite":28,"pipeline":16,"team":12,"processi":8, "ricavi":14,"marketing":12,"sitoweb":6,"ecommerce":4},
  "alimentare_trasformazione":       {"vendite":28,"pipeline":10,"team":10,"processi":8, "ricavi":16,"marketing":16,"sitoweb":6,"ecommerce":6},
  "alimentare_vini":                 {"vendite":24,"pipeline":10,"team":10,"processi":7, "ricavi":14,"marketing":22,"sitoweb":7,"ecommerce":6},
  "alimentare_forno":                {"vendite":30,"pipeline":10,"team":10,"processi":8, "ricavi":22,"marketing":10,"sitoweb":5,"ecommerce":5},
  "alimentare_conserve":             {"vendite":28,"pipeline":10,"team":10,"processi":8, "ricavi":16,"marketing":16,"sitoweb":6,"ecommerce":6},
  "alimentare_ingredienti":          {"vendite":26,"pipeline":11,"team":11,"processi":9, "ricavi":16,"marketing":15,"sitoweb":7,"ecommerce":5},
  "tech_saas":                       {"vendite":16,"pipeline":18,"team":14,"processi":8, "ricavi":14,"marketing":18,"sitoweb":8,"ecommerce":4},
  "tech_system_integrator":          {"vendite":24,"pipeline":16,"team":14,"processi":9, "ricavi":14,"marketing":13,"sitoweb":7,"ecommerce":3},
  "tech_digital_agency":             {"vendite":22,"pipeline":16,"team":14,"processi":8, "ricavi":14,"marketing":16,"sitoweb":8,"ecommerce":2},
  "tech_automazione":                {"vendite":26,"pipeline":14,"team":14,"processi":10,"ricavi":14,"marketing":13,"sitoweb":7,"ecommerce":2}
}
;
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
  const dipendenze = MATRICE_DIPENDENZE[dimId] || [];
  if (dipendenze.length === 0) return 0;

  const targetDim = targets[dimId] || 1;
  let gapTotale = 0;

  dipendenze.forEach(dep => {
    const targetDep = targets[dep] || 1;
    const gap = Math.max(0, targetDim - targetDep);
    gapTotale += gap;
  });

  const gapMedio = gapTotale / dipendenze.length;
  const gapMax = 4; // gap massimo possibile (da 1 a 5)
  const penalita = (gapMedio / gapMax) * 0.5; // cap 50%

  return Math.min(penalita, 0.5);
}

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
        const imp = _getImpatto(settore, id, step + '-' + (step+1));
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
  let fat12m = null, fat12pct = null, breakeven = null, roi24 = null;
  try {
    const ic = _calcolaImpattoCumulativo(p);
    if (ic) {
      fat12m = ic.fat12 ? Math.round((ic.fat12[0] + ic.fat12[1]) / 2) : null;
      fat12pct = ic.pct12 ? Math.round((ic.pct12[0] + ic.pct12[1]) / 2) : null;
      breakeven = ic.sostenibilita ? ic.sostenibilita.breakeven : null;
      roi24 = (ic.roiMin !== null && ic.roiMax !== null) ? ((ic.roiMin + ic.roiMax) / 2).toFixed(1) : null;
    }
  } catch(e) {}

  const fat12Str = fat12m ? (fat12m >= 1000000 ? (fat12m/1000000).toFixed(1)+'M\u20AC' : Math.round(fat12m/1000)+'k\u20AC') : '\u2014';
  const fat12PctStr = fat12pct ? '+'+fat12pct+'%' : '';
  const breakevenStr = breakeven ? breakeven+'m' : '\u2014';
  const roiStr = roi24 ? roi24+'x' : '\u2014';

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

      var costoMensile = ic2.costoMensileTot ? '\u2248'+fmtF(ic2.costoMensileTot)+'/mese' : '\u2014';
      var totale24 = ic2.costoTot24 ? '\u2248 '+fmtF(ic2.costoTot24)+' totali 24m' : '';
      var roi24str2 = (ic2.roiMin !== null && ic2.roiMax !== null) ? ((ic2.roiMin + ic2.roiMax) / 2).toFixed(1)+'x' : '\u2014';

      var tableRows = projRows.map(function(r) {
        return '<tr class="tl-proj-row">' +
          '<td class="tl-proj-td tl-proj-label">' + r.label + '</td>' +
          '<td class="tl-proj-td tl-proj-fat">' + fmtR(r.fat) + '</td>' +
          '<td class="tl-proj-td tl-proj-pct">' + fmtP(r.pct) + '</td>' +
          '<td class="tl-proj-td tl-proj-cost">' + costoMensile + '</td>' +
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

  let html = '<div style="margin-top:20px">';
  html += '<div style="font-size:10px;font-weight:700;color:var(--gray);letter-spacing:.06em;text-transform:uppercase;margin-bottom:12px">CRONISTORIA CRESCITA</div>';
  html += '<div style="position:relative;padding-left:20px">';
  // Linea verticale
  html += '<div style="position:absolute;left:6px;top:8px;bottom:8px;width:2px;background:var(--border2);border-radius:2px"></div>';

  history.slice().reverse().forEach((snap, idx) => {
    const isFirst = idx === history.length - 1;
    const isLast = idx === 0;
    const col = scoreCol(snap.score);
    html += '<div style="position:relative;margin-bottom:12px">';
    // Dot
    html += '<div style="position:absolute;left:-17px;top:4px;width:10px;height:10px;border-radius:50%;background:' + col + ';border:2px solid #fff;box-shadow:0 0 0 1px ' + col + '"></div>';
    // Content
    html += '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:6px;padding:7px 10px">';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px">';
    html += '<div style="font-size:10px;font-weight:700;color:' + col + '">' + snap.evento + '</div>';
    html += '<div style="font-size:18px;font-weight:700;font-family:\'DM Serif Display\',serif;color:' + col + '">' + snap.score + '<span style="font-size:10px;color:var(--gray)">/100</span></div>';
    html += '</div>';
    html += '<div style="font-size:9px;color:var(--gray)">' + fmt(snap.data) + (snap.nota ? ' · ' + snap.nota : '') + '</div>';
    if (snap.score_base && snap.score_base !== snap.score) {
      html += '<div style="font-size:9px;color:var(--gray);margin-top:2px">Score base: ' + snap.score_base + ' · Live: ' + snap.score + '</div>';
    }
    html += '</div></div>';
  });

  html += '</div></div>';
  return html;
}

function _buildMegaGrafico(p) {
  const ic = _calcolaImpattoCumulativo(p);
  if (!ic) return '';

  const fmt = _formatEur;
  const hasEbitda = ic.ebitda24min !== null;
  const fat = ic.fat;

  // ── SVG bar chart ──────────────────────────────────────────────────────────
  const maxVal = ic.fat60[1] * 1.08;
  const svgW = 420, svgH = 200;
  const labelW = 46, barH = 24, barGap = 10, xStart = labelW;
  const scaleX = (v) => Math.round((v / maxVal) * (svgW - labelW - 60));

  // Calcola EBITDA netto per ogni orizzonte e determina il colore
  const ebitdaNettoRows = ic.ebitdaBase ? [
    { label:'6m',  val: ic.ebitdaNettoMin6,  positivo: ic.ebitdaNettoMin6  !== null && ic.ebitdaNettoMin6  >= 0 },
    { label:'12m', val: ic.ebitdaNettoMin12, positivo: ic.ebitdaNettoMin12 !== null && ic.ebitdaNettoMin12 >= 0 },
    { label:'24m', val: ic.ebitdaNettoMin24, positivo: ic.ebitdaNettoMin24 !== null && ic.ebitdaNettoMin24 >= 0 },
    { label:'36m', val: ic.ebitdaNettoMin36, positivo: ic.ebitdaNettoMin36 !== null && ic.ebitdaNettoMin36 >= 0 },
    { label:'48m', val: ic.ebitdaNettoMin48, positivo: ic.ebitdaNettoMin48 !== null && ic.ebitdaNettoMin48 >= 0 },
    { label:'60m', val: ic.ebitdaNettoMin60, positivo: ic.ebitdaNettoMin60 !== null && ic.ebitdaNettoMin60 >= 0 }
  ] : [];

  const rows = [
    { label:'6m',  min:ic.fat6[0],  max:ic.fat6[1],  pctMin:ic.pct6[0],  pctMax:ic.pct6[1],  fill:'#A5D6A7', fillBg:'#E8F5E9', y:8 },
    { label:'12m', min:ic.fat12[0], max:ic.fat12[1], pctMin:ic.pct12[0], pctMax:ic.pct12[1], fill:'#66BB6A', fillBg:'#C8E6C9', y:8+(barH+barGap) },
    { label:'24m', min:ic.fat24[0], max:ic.fat24[1], pctMin:ic.pct24[0], pctMax:ic.pct24[1], fill:'#43A047', fillBg:'#A5D6A7', y:8+(barH+barGap)*2 },
    { label:'36m', min:ic.fat36[0], max:ic.fat36[1], pctMin:ic.pct36[0], pctMax:ic.pct36[1], fill:'#2E7D32', fillBg:'#81C784', y:8+(barH+barGap)*3 },
    { label:'48m', min:ic.fat48[0], max:ic.fat48[1], pctMin:ic.pct48[0], pctMax:ic.pct48[1], fill:'#1B5E20', fillBg:'#66BB6A', y:8+(barH+barGap)*4 },
    { label:'60m', min:ic.fat60[0], max:ic.fat60[1], pctMin:ic.pct60[0], pctMax:ic.pct60[1], fill:'#0D3B14', fillBg:'#4CAF50', y:8+(barH+barGap)*5 }
  ];

  // linea base
  const xBase = scaleX(fat) + xStart;
  let svg = '<svg width="' + svgW + '" height="' + svgH + '" xmlns="http://www.w3.org/2000/svg">';
  svg += '<line x1="' + xBase + '" y1="0" x2="' + xBase + '" y2="' + (svgH-18) + '" stroke="#BDBDBD" stroke-width="1" stroke-dasharray="3,2"/>';
  svg += '<text x="' + xBase + '" y="' + (svgH-6) + '" font-size="8" fill="#BDBDBD" text-anchor="middle">Oggi</text>';

  rows.forEach(r => {
    const wMax = scaleX(r.max);
    const wMin = scaleX(r.min);
    svg += '<text x="0" y="' + (r.y + barH/2 + 1) + '" font-size="9" fill="#558B2F" font-weight="700" dominant-baseline="middle">' + r.label + '</text>';
    svg += '<rect x="' + xStart + '" y="' + r.y + '" width="' + wMax + '" height="' + barH + '" rx="4" fill="' + r.fillBg + '"/>';
    svg += '<rect x="' + xStart + '" y="' + r.y + '" width="' + wMin + '" height="' + barH + '" rx="4" fill="' + r.fill + '"/>';
    svg += '<text x="' + (xStart + wMax + 5) + '" y="' + (r.y + barH/2 + 1) + '" font-size="9" fill="#1B5E20" font-weight="600" dominant-baseline="middle">' + fmt(r.min) + '–' + fmt(r.max) + '€ <tspan fill="#81C784">(+' + r.pctMin + '–' + r.pctMax + '%)</tspan></text>';
  });
  svg += '</svg>';

  // ── KPI cards ──────────────────────────────────────────────────────────────
  const nCols = hasEbitda ? 4 : 3;
  let kpi = '<div style="display:grid;grid-template-columns:repeat(' + nCols + ',1fr);border-bottom:1px solid #C8E6C9">';

  // KPI 1: fatturato target 24m
  kpi += '<div style="padding:10px 12px;border-right:1px solid #C8E6C9">';
  kpi += '<div style="font-size:8px;color:#558B2F;font-weight:700;letter-spacing:.05em;margin-bottom:4px">FATTURATO TARGET 24m</div>';
  kpi += '<div style="font-size:15px;font-weight:700;color:#1B5E20;line-height:1">' + fmt(ic.fat24[0]) + '–' + fmt(ic.fat24[1]) + '€</div>';
  kpi += '<div style="font-size:9px;color:#388E3C;margin-top:2px">+' + fmt(ic.fat24[0]-fat) + '–' + fmt(ic.fat24[1]-fat) + '€ vs oggi</div>';
  kpi += '</div>';

  // KPI 2: investimento totale
  kpi += '<div style="padding:10px 12px;border-right:1px solid #C8E6C9">';
  kpi += '<div style="font-size:8px;color:#558B2F;font-weight:700;letter-spacing:.05em;margin-bottom:4px">INVESTIMENTO TOTALE 24m</div>';
  kpi += '<div style="font-size:15px;font-weight:700;color:#B8842E;line-height:1">≈ ' + fmt(ic.costoTot24) + '€</div>';
  kpi += '<div style="font-size:9px;color:#8D6E63;margin-top:2px">≈ ' + fmt(ic.costoMensileTot) + '€/mese · ' + ic.nDimAttive + ' aree</div>';
  kpi += '</div>';

  // KPI 3: ROI
  if (ic.roiMin) {
    kpi += '<div style="padding:10px 12px' + (hasEbitda ? ';border-right:1px solid #C8E6C9' : '') + '">';
    kpi += '<div style="font-size:8px;color:#558B2F;font-weight:700;letter-spacing:.05em;margin-bottom:4px">ROI STIMATO 24m</div>';
    kpi += '<div style="font-size:15px;font-weight:700;color:#1B5E20;line-height:1">' + ic.roiMin + '–' + ic.roiMax + 'x</div>';
    kpi += '<div style="font-size:9px;color:#388E3C;margin-top:2px">per ogni € investito</div>';
    kpi += '</div>';
  }

  // KPI 4: EBITDA netto dopo investimento (se disponibile)
  if (hasEbitda) {
    const nettoMin24 = ic.ebitdaNettoMin24;
    const nettoMax24 = ic.ebitdaNettoMax24;
    const isPositivo = nettoMin24 !== null && nettoMin24 > (ic.ebitdaBase || 0);
    const isNegativo = nettoMin24 !== null && nettoMin24 < 0;
    const colore = isNegativo ? '#B71C1C' : isPositivo ? '#1B5E20' : '#E65100';
    const bgColore = isNegativo ? '#FFEBEE' : isPositivo ? '#E8F5E9' : '#FFF3E0';
    const labelColore = isNegativo ? '#D32F2F' : isPositivo ? '#2E7D32' : '#E65100';
    kpi += '<div style="padding:10px 12px">';
    kpi += '<div style="font-size:8px;color:' + labelColore + ';font-weight:700;letter-spacing:.05em;margin-bottom:4px">EBITDA NETTO 24m (dopo costi)</div>';
    kpi += '<div style="font-size:15px;font-weight:700;color:' + colore + ';line-height:1;background:' + bgColore + ';border-radius:4px;padding:3px 6px;display:inline-block">' +
      (nettoMin24 < 0 ? '−' : '+') + fmt(Math.abs(nettoMin24)) + '–' + (nettoMax24 < 0 ? '−' : '+') + fmt(Math.abs(nettoMax24)) + '€</div>';
    kpi += '<div style="font-size:9px;color:' + labelColore + ';margin-top:4px">' +
      (isNegativo ? '⚠ Breakeven stimato: ' + (ic.sostenibilita?.breakevenStr || 'oltre 36 mesi') :
       isPositivo ? '✓ In attivo già a 24m · breakeven: ' + (ic.sostenibilita?.breakevenStr || '24 mesi') :
       '◎ Breakeven: ' + (ic.sostenibilita?.breakevenStr || 'oltre 36 mesi')) +
    '</div>';
    kpi += '</div>';
  }
  kpi += '</div>';

  // ── Legenda dimensioni attive ───────────────────────────────────────────────
  const DIMS_LABEL = {vendite:'Struttura commerciale',pipeline:'Pipeline & CRM',team:'Capitale umano',processi:'Processi & script',ricavi:'Prevedibilità ricavi',marketing:'Marketing & lead gen',sitoweb:'Sito web',ecommerce:'E-commerce & digital'};
  const dimTags = ic.dimAttive.map(id =>
    '<span style="font-size:8px;background:#E8F5E9;color:#2E7D32;border-radius:20px;padding:2px 8px;border:1px solid #C8E6C9">' + (DIMS_LABEL[id]||id) + '</span>'
  ).join(' ');

  // ── Assembla tutto ─────────────────────────────────────────────────────────
  // ── Messaggio narrativo ────────────────────────────────────────────────────
  const narrativa =
    '<div style="padding:10px 14px;background:#F0F7F0;border-bottom:1px solid #C8E6C9;font-size:11px;color:#1B5E20;line-height:1.5">' +
      '<strong>Oggi sei a ' + fmt(fat) + '€ di fatturato' + (ic.ebitdaBase ? ' e ' + fmt(ic.ebitdaBase) + '€ di EBITDA' : '') + '.</strong> ' +
      'Con questo piano (≈ ' + fmt(ic.costoMensileTot) + '€/mese su ' + ic.nDimAttive + ' aree) puoi arrivare a ' +
      '<strong>' + fmt(ic.fat6[0]) + '–' + fmt(ic.fat6[1]) + '€ in 6 mesi</strong>, ' +
      '<strong>' + fmt(ic.fat12[0]) + '–' + fmt(ic.fat12[1]) + '€ in 12 mesi</strong> e ' +
      '<strong>' + fmt(ic.fat24[0]) + '–' + fmt(ic.fat24[1]) + '€ in 24 mesi</strong>' +
      (ic.ebitdaNettoMin24 !== null ?
        '. Il tuo EBITDA crescerà di <strong>' + fmt(ic.deltaEbitda24min||0) + '–' + fmt(ic.deltaEbitda24max||0) + '€</strong> annui. ' +
        'L\'investimento si ripaga in <strong style="color:' + (ic.sostenibilita?.breakeven ? '#2E7D32' : '#C62828') + '">' +
        (ic.sostenibilita?.breakevenStr || 'oltre 36 mesi') + '</strong>.' :
        '.') +
    '</div>';

  // Nota contestuale: collo di bottiglia non commerciale
  let _bottleneckNote = '';
  if (!ic.isSuggerito && ic.ebitdaNettoMin24 !== null && ic.ebitdaNettoMin24 < 0 && ic.costoMensileTot > 3000) {
    const crescitaMedia24 = (ic.pct24[0] + ic.pct24[1]) / 2;
    if (crescitaMedia24 < 25) {
      _bottleneckNote = '<div style="background:#f0f4ff;border:1px solid #c7d2fe;border-radius:6px;padding:10px 14px;font-size:11px;color:#3730a3;margin-bottom:12px;line-height:1.5">' +
        '<strong>&#9888; Nota strategica:</strong> Nonostante l\'investimento commerciale, la crescita proiettata rimane contenuta. ' +
        'Potrebbe esserci un collo di bottiglia <strong>non commerciale</strong>: margini di prodotto bassi, gamma poco differenziata, dipendenza da pochi fornitori o pricing non ottimizzato. ' +
        'Valuta il modello di business prima di scalare il commerciale.' +
        '</div>';
    }
  }
  return _bottleneckNote + '<div id="mega-grafico-container"><div style="margin-top:20px;border:1px solid #C8E6C9;border-radius:10px;overflow:hidden;box-shadow:0 2px 8px rgba(46,125,50,.08)">' +
    // Header
    '<div style="background:linear-gradient(135deg,#1B5E20,#2E7D32);color:#fff;padding:10px 14px;display:flex;justify-content:space-between;align-items:center">' +
      '<div>' +
        '<div style="font-size:11px;font-weight:700;letter-spacing:.07em">PROIEZIONE CRESCITA COMPLESSIVA</div>' +
        '<div style="font-size:9px;opacity:.8;margin-top:2px">Modello composto con diminishing returns · Base: ' + fmt(fat) + '€' + (ic.ebitdaMarginPct ? ' · EBITDA margin: ' + ic.ebitdaMarginPct + '%' : '') + '</div>' +
      '</div>' +
      '<div style="font-size:9px;opacity:.75">' + ic.nDimAttive + ' dimensioni attive</div>' +
    '</div>' +
    // Narrativa
    narrativa +
    // KPI
    kpi +
    // SVG chart
    '<div style="padding:14px 14px 6px;background:#fff">' +
      '<div style="font-size:8px;color:#9E9E9E;margin-bottom:6px;letter-spacing:.04em">PROIEZIONE FATTURATO (min–max)</div>' +
      svg +
    '</div>' +
    // Legenda aree
    // Sezione EBITDA netto con barre colorate
    (ic.ebitdaBase ? ('<div style="padding:10px 14px;background:#FAFAFA;border-top:1px solid #E8E8E8">' +
      '<div style="font-size:8px;color:#666;font-weight:700;letter-spacing:.05em;margin-bottom:8px">RITORNO INCREMENTALE EBITDA vs COSTO ANNUO (≈ ' + fmt(ic.costoAnnuo) + '€/anno) &nbsp;<span style="font-weight:400">🟥 in rientro &nbsp;🟧 in miglioramento &nbsp;🟩 in attivo</span></div>' +
      '<div style="display:grid;grid-template-columns:52px 1fr;gap:4px">' +
        ebitdaNettoRows.map((r,i) => {
          if (r.val === null) return '';
          const isNeg = r.val < 0;
          const isPos = r.positivo;
          // Confronta con il valore precedente per capire se sta migliorando
          const valPrev = i > 0 ? ebitdaNettoRows[i-1].val : null;
          const staMigliorando = valPrev !== null && r.val > valPrev;
          const barColor = isPos ? '#43A047' : (staMigliorando ? '#FFA726' : '#EF5350');
          const bgColor  = isPos ? '#E8F5E9' : (staMigliorando ? '#FFF3E0' : '#FFEBEE');
          const maxAbs = Math.max(Math.abs(ic.ebitdaNettoMin24||1), Math.abs(ic.ebitdaBase||1), 1);
          const barW = Math.min(95, Math.round(Math.abs(r.val) / maxAbs * 95));
          return '<div style="font-size:9px;font-weight:700;color:#555;display:flex;align-items:center">' + ['6m','12m','24m','36m','48m','60m'][i] + '</div>' +
            '<div style="display:flex;align-items:center;gap:6px">' +
              '<div style="flex:1;background:#F0F0F0;border-radius:3px;height:16px;position:relative;overflow:hidden">' +
                '<div style="position:absolute;' + (isNeg ? 'right:0' : 'left:0') + ';top:0;height:100%;width:' + barW + '%;background:' + barColor + ';border-radius:3px"></div>' +
              '</div>' +
              '<div style="font-size:9px;font-weight:700;color:' + barColor + ';min-width:60px;text-align:right;background:' + bgColor + ';border-radius:3px;padding:1px 5px">' +
                (isNeg ? '−' : '+') + fmt(Math.abs(r.val)) + '€' +
              '</div>' +
            '</div>';
        }).join('') +
      '</div>' +
    '</div>') : '') +
    '<div style="padding:8px 14px;background:#F9FBF9;border-top:1px solid #E8F5E9">' +
      '<span style="font-size:8px;color:#9E9E9E;margin-right:6px">Aree incluse:</span>' + dimTags +
    '</div>' +
    (ic.alertSbilanciamento && ic.alertSbilanciamento.length > 0 ?
      '<div style="padding:7px 14px;background:#FFF8E1;border-top:1px solid #FFE082;display:flex;flex-wrap:wrap;gap:6px;align-items:center">' +
        '<span style="font-size:8px;color:#F57F17;font-weight:700;margin-right:4px">⚠ SBILANCIAMENTO:</span>' +
        ic.alertSbilanciamento.map(a => '<span style="font-size:8px;background:#FFF3CD;color:#856404;border:1px solid #FFE082;border-radius:20px;padding:2px 8px">' + a.label + ' −' + a.penalita + '% efficienza</span>').join(' ') +
      '</div>'
    : '') +
  '</div></div>';
}



function _calcolaImpatto(impatto, fatturatoPStr, fatturato_anno_1, ebitda, margine_pct, utile_netto) {
  if (!impatto) return null;
  // 1. Fatturato base: valore preciso > valore medio della fascia
  const fasciaMap = {
    '<100k': 75000, '100k-250k': 175000, '250k-500k': 375000,
    '500k-1M': 750000, '1M-2M': 1500000, '2M-5M': 3500000, '5M-20M': 12500000
  };
  const fasciaEffettiva = _fasciaFromAnno1(fatturato_anno_1) || fatturatoPStr;
  const fatBase = fatturato_anno_1 || fasciaMap[fasciaEffettiva];
  if (!fatBase) return null;

  // 2. EBITDA margin: priorità ebitda assoluto > margine_pct dichiarato > stima da utile_netto
  let ebitdaMargin = null;
  if (ebitda && fatBase) {
    ebitdaMargin = ebitda / fatBase; // es. 0.127 = 12.7%
  } else if (margine_pct) {
    ebitdaMargin = margine_pct / 100;
  } else if (utile_netto && fatBase) {
    // Stima EBITDA da utile netto: aggiungi ~4% per ammortamenti tipici PMI
    ebitdaMargin = (utile_netto / fatBase) + 0.04;
  }

  // 3. Leva operativa: i costi fissi vengono assorbiti dalla crescita del fatturato
  // Più alto il fatturato, più alta la leva (struttura più matura)
  let levaOp = 1.2; // default PMI piccola
  if (fatBase >= 2000000) levaOp = 1.5;
  else if (fatBase >= 500000) levaOp = 1.35;

  // 4. Calcolo per ogni orizzonte temporale
  const calcOrizzonte = (pctMin, pctMax) => {
    const fatMin = Math.round(fatBase * (1 + pctMin/100) / 1000) * 1000;
    const fatMax = Math.round(fatBase * (1 + pctMax/100) / 1000) * 1000;
    const deltaFatMin = fatMin - fatBase;
    const deltaFatMax = fatMax - fatBase;

    let ebitdaMin = null, ebitdaMax = null, ebitdaBaseVal = null;
    if (ebitdaMargin !== null) {
      ebitdaBaseVal = Math.round(fatBase * ebitdaMargin / 1000) * 1000;
      // EBITDA cresce più del fatturato per effetto leva operativa
      const deltaEbitdaMin = Math.round(deltaFatMin * ebitdaMargin * levaOp / 1000) * 1000;
      const deltaEbitdaMax = Math.round(deltaFatMax * ebitdaMargin * levaOp / 1000) * 1000;
      ebitdaMin = ebitdaBaseVal + deltaEbitdaMin;
      ebitdaMax = ebitdaBaseVal + deltaEbitdaMax;
    }

    return {
      pctMin, pctMax,
      fatMin, fatMax,         // fatturato totale proiettato
      deltaFatMin, deltaFatMax, // incremento assoluto
      ebitdaMin, ebitdaMax,   // EBITDA proiettato (null se non disponibile)
      ebitdaBaseVal
    };
  };

  return {
    fatBase,
    ebitdaBase: ebitda || (ebitdaMargin ? Math.round(fatBase * ebitdaMargin / 1000) * 1000 : null),
    ebitdaMarginPct: ebitdaMargin ? Math.round(ebitdaMargin * 1000) / 10 : null, // es. 12.7
    m6:  calcOrizzonte(impatto.pct_6m[0],  impatto.pct_6m[1]),
    m12: calcOrizzonte(impatto.pct_12m[0], impatto.pct_12m[1]),
    m24: calcOrizzonte(impatto.pct_24m[0], impatto.pct_24m[1]),
    note: impatto.note
  };
}

function _formatEur(n) {
  if (n >= 1000000) return (n/1000000).toFixed(1).replace('.0','') + 'M';
  if (n >= 1000) return Math.round(n/1000) + 'k';
  return n.toString();
}

// Costruisce il blocco azione per un singolo step (from→to) con checkbox + pulsante +
function _buildStepBlock(dimId, fromStep, toStep, settore, azioniDone, azioniCustom, p) {

  const chiave = fromStep + '-' + toStep;
  const azPredefinita = _getAzionePredefinita(settore, dimId, fromStep, toStep);
  const stepKey = dimId + '_' + fromStep + '_' + toStep;
  const customList = (azioniCustom && azioniCustom[stepKey]) || [];

  const costo = _getCosto(settore, dimId, fromStep, toStep);
  let html = '\x3cdiv style="background:var(--bg);border-radius:var(--rs);padding:10px 12px;margin-top:6px">';
  // Badge costo e impatto
  const impatto = _getImpatto(settore, dimId, fromStep + '-' + toStep);
  let impattoCalc = null;
  try { impattoCalc = p ? _calcolaImpatto(impatto, p.fatturato, p.fatturato_anno_1, p.ebitda, p.margine_pct, p.utile_netto) : null; } catch(e) { impattoCalc = null; }
  if (costo || impatto) {
    html += '\x3cdiv style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:8px">';
    if (costo) {
      const costoLabel = _getCostoLabel(settore, dimId, fromStep, toStep);
      html += '\x3cspan style="font-size:10px;color:var(--gold);background:var(--amber-bg);border:1px solid var(--gold-dim);border-radius:20px;padding:2px 10px;font-weight:600">≈ ' + (costoLabel || '—') + '\x3c/span>';
    }
    if (impatto && impattoCalc && impattoCalc.m6) {
      const ic = impattoCalc;
      const hasEbitda = ic.m6 && ic.m6.ebitdaMin !== null;
      const fatBaseStr = _formatEur(ic.fatBase) + '€';
      const ebitdaBaseStr = hasEbitda ? _formatEur(ic.ebitdaBase) + '€ (' + ic.ebitdaMarginPct + '%)' : null;
      html += '\x3cdiv style="margin-top:8px;border:1px solid #C8E6C9;border-radius:8px;overflow:hidden;font-size:11px">' +
        '\x3cdiv style="background:#2E7D32;color:#fff;padding:5px 10px;font-size:10px;font-weight:700;letter-spacing:.06em;display:flex;justify-content:space-between;align-items:center">' +
          '\x3cspan>IMPATTO STIMATO SUL FATTURATO\x3c/span>' +
          '\x3cspan style="font-weight:400;font-size:9px;opacity:.85">Base: ' + fatBaseStr + (ebitdaBaseStr ? ' · EBITDA: ' + ebitdaBaseStr : '') + '\x3c/span>' +
        '\x3c/div>' +
        '\x3cdiv style="display:grid;grid-template-columns:52px 1fr 1fr' + (hasEbitda ? ' 1fr' : '') + ';background:#F9FBF9">' +
          '\x3cdiv style="padding:4px 8px;font-size:9px;color:#666;border-bottom:1px solid #E8F5E9;font-weight:600">\x3c/div>' +
          '\x3cdiv style="padding:4px 8px;font-size:9px;color:#666;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9;font-weight:600">CRESCITA %\x3c/div>' +
          '\x3cdiv style="padding:4px 8px;font-size:9px;color:#666;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9;font-weight:600">FATTURATO TOTALE\x3c/div>' +
          (hasEbitda ? '\x3cdiv style="padding:4px 8px;font-size:9px;color:#666;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9;font-weight:600">EBITDA PROIETTATO\x3c/div>' : '') +
          // 6 mesi
          '\x3cdiv style="padding:5px 8px;font-size:10px;font-weight:700;color:#1B5E20;background:#fff;border-bottom:1px solid #E8F5E9">6 mesi\x3c/div>' +
          '\x3cdiv style="padding:5px 8px;font-size:11px;color:#2E7D32;font-weight:700;background:#fff;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9">+' + ic.m6.pctMin + '–' + ic.m6.pctMax + '%\x3c/div>' +
          '\x3cdiv style="padding:5px 8px;font-size:10px;color:#1B5E20;background:#fff;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9">' + _formatEur(ic.m6.fatMin) + '–' + _formatEur(ic.m6.fatMax) + '€ \x3cspan style="color:#81C784;font-size:9px">(+' + _formatEur(ic.m6.deltaFatMin) + '–' + _formatEur(ic.m6.deltaFatMax) + '€)\x3c/span>\x3c/div>' +
          (hasEbitda ? '\x3cdiv style="padding:5px 8px;font-size:10px;color:#1B5E20;background:#fff;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9">' + _formatEur(ic.m6.ebitdaMin) + '–' + _formatEur(ic.m6.ebitdaMax) + '€\x3c/div>' : '') +
          // 12 mesi
          '\x3cdiv style="padding:5px 8px;font-size:10px;font-weight:700;color:#1B5E20;background:#F1F8E9;border-bottom:1px solid #E8F5E9">12 mesi\x3c/div>' +
          '\x3cdiv style="padding:5px 8px;font-size:11px;color:#2E7D32;font-weight:700;background:#F1F8E9;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9">+' + ic.m12.pctMin + '–' + ic.m12.pctMax + '%\x3c/div>' +
          '\x3cdiv style="padding:5px 8px;font-size:10px;color:#1B5E20;background:#F1F8E9;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9">' + _formatEur(ic.m12.fatMin) + '–' + _formatEur(ic.m12.fatMax) + '€ \x3cspan style="color:#81C784;font-size:9px">(+' + _formatEur(ic.m12.deltaFatMin) + '–' + _formatEur(ic.m12.deltaFatMax) + '€)\x3c/span>\x3c/div>' +
          (hasEbitda ? '\x3cdiv style="padding:5px 8px;font-size:10px;color:#1B5E20;background:#F1F8E9;border-bottom:1px solid #E8F5E9;border-left:1px solid #E8F5E9">' + _formatEur(ic.m12.ebitdaMin) + '–' + _formatEur(ic.m12.ebitdaMax) + '€\x3c/div>' : '') +
          // 24 mesi
          '\x3cdiv style="padding:5px 8px;font-size:10px;font-weight:700;color:#1B5E20;background:#fff">24 mesi\x3c/div>' +
          '\x3cdiv style="padding:5px 8px;font-size:11px;color:#2E7D32;font-weight:700;background:#fff;border-left:1px solid #E8F5E9">+' + ic.m24.pctMin + '–' + ic.m24.pctMax + '%\x3c/div>' +
          '\x3cdiv style="padding:5px 8px;font-size:10px;color:#1B5E20;background:#fff;border-left:1px solid #E8F5E9">' + _formatEur(ic.m24.fatMin) + '–' + _formatEur(ic.m24.fatMax) + '€ \x3cspan style="color:#81C784;font-size:9px">(+' + _formatEur(ic.m24.deltaFatMin) + '–' + _formatEur(ic.m24.deltaFatMax) + '€)\x3c/span>\x3c/div>' +
          (hasEbitda ? '\x3cdiv style="padding:5px 8px;font-size:10px;color:#1B5E20;background:#fff;border-left:1px solid #E8F5E9">' + _formatEur(ic.m24.ebitdaMin) + '–' + _formatEur(ic.m24.ebitdaMax) + '€\x3c/div>' : '') +
        '\x3c/div>' +
        '\x3cdiv style="padding:5px 10px;background:#E8F5E9;font-size:9px;color:#558B2F;font-style:italic;border-top:1px solid #C8E6C9">' + ic.note + '\x3c/div>' +
      '\x3c/div>';
    } else if (impatto) {
      // Fallback senza fatturato: solo % su badge compatto
      html += '\x3cspan style="font-size:10px;color:#2E7D32;background:#E8F5E9;border:1px solid #A5D6A7;border-radius:20px;padding:2px 10px;font-weight:600">+' + impatto.pct_6m[0] + '–' + impatto.pct_6m[1] + '% a 6m / +' + impatto.pct_12m[0] + '–' + impatto.pct_12m[1] + '% a 12m / +' + impatto.pct_24m[0] + '–' + impatto.pct_24m[1] + '% a 24m\x3c/span>';
    }
    html += '\x3c/div>';
  }
  // Azione predefinita (sempre presente se esiste)
  if (azPredefinita) {
    const keyPred = stepKey + '_pred';
    const done = !!azioniDone[keyPred];
    html += '\x3cdiv style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="toggleAzione(\'' + keyPred + '\')" id="az-' + keyPred + '">' +
      '\x3cdiv style="width:16px;height:16px;border-radius:4px;border:2px solid ' + (done ? 'var(--green)' : 'var(--gold-dim)') + ';background:' + (done ? 'var(--green)' : 'transparent') + ';flex-shrink:0;margin-top:1px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff">' + (done ? '&#10003;' : '') + '\x3c/div>' +
      '\x3cdiv style="font-size:12px;color:' + (done ? 'var(--gray)' : 'var(--white)') + ';line-height:1.4;flex:1;' + (done ? 'text-decoration:line-through;opacity:.5;' : '') + '">' + azPredefinita + '\x3c/div>' +
    '\x3c/div>';
  }

  // Azioni custom salvate
  customList.forEach(function(az, i) {
    const keyCustom = stepKey + '_custom_' + i;
    const done = !!azioniDone[keyCustom];
    html += '\x3cdiv style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="toggleAzione(\'' + keyCustom + '\')" id="az-' + keyCustom + '">' +
      '\x3cdiv style="width:16px;height:16px;border-radius:4px;border:2px solid ' + (done ? 'var(--green)' : 'var(--border2)') + ';background:' + (done ? 'var(--green)' : 'transparent') + ';flex-shrink:0;margin-top:1px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff">' + (done ? '&#10003;' : '') + '\x3c/div>' +
      '\x3cdiv style="font-size:12px;color:' + (done ? 'var(--gray)' : 'var(--white)') + ';line-height:1.4;flex:1;' + (done ? 'text-decoration:line-through;opacity:.5;' : '') + '">' + az + '\x3c/div>' +
    '\x3c/div>';
  });

  // Pulsante + per aggiungere azione custom
  html += '\x3cdiv style="margin-top:6px">' +
    '\x3cbutton onclick="aggiungiAzioneCustom(\'' + stepKey + '\')" style="background:none;border:1px dashed var(--border2);color:var(--gray);border-radius:4px;padding:3px 10px;font-size:11px;cursor:pointer;font-family:inherit;width:100%;text-align:left">+ Aggiungi azione personalizzata\x3c/button>' +
    '\x3cdiv id="custom-input-' + stepKey + '" style="display:none;margin-top:6px">' +
      '\x3cdiv style="display:flex;gap:6px">' +
        '\x3cinput type="text" id="custom-text-' + stepKey + '" placeholder="Descrivi l\'azione..." style="flex:1;background:var(--bg3);border:1px solid var(--border2);border-radius:4px;padding:5px 8px;color:var(--white);font-size:12px;font-family:inherit;outline:none">' +
        '\x3cbutton onclick="salvaAzioneCustom(\'' + stepKey + '\')" style="background:var(--gold);border:none;color:#fff;border-radius:4px;padding:5px 12px;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap">Salva\x3c/button>' +
        '\x3cbutton onclick="document.getElementById(\'custom-input-' + stepKey + '\').style.display=\'none\'" style="background:var(--bg3);border:1px solid var(--border2);color:var(--gray);border-radius:4px;padding:5px 8px;font-size:11px;cursor:pointer;font-family:inherit">✕\x3c/button>' +
      '\x3c/div>' +
    '\x3c/div>' +
  '\x3c/div>';

  html += '\x3c/div>';
  return html;
}

// Costruisce tutti gli step dal cur al tgt
function _buildSubObiettivi(dimId, cur, tgt, settore, azioniDone, azioniCustom, p) {
  const gap = tgt - cur;
  if (gap <= 0) {
    if (cur >= 4) return '\x3cdiv style="font-size:11px;color:var(--green);padding:8px 0;font-weight:600">✓ Obiettivo raggiunto — livello eccellente.\x3c/div>';
    return '\x3cdiv style="font-size:11px;color:var(--green);padding:8px 0;font-weight:600">✓ Obiettivo raggiunto. Imposta un target più alto per continuare a crescere.\x3c/div>';
  }

  let html = '\x3cdiv style="margin-top:8px">';

  // --- Raccolta dati progressivi per tutti gli step ---
  const fatBase = p ? (p.fatturato_anno_1 || null) : null;
  const ebitdaBase = p ? (p.ebitda || null) : null;
  const ebitdaMarginBase = (ebitdaBase && fatBase) ? ebitdaBase / fatBase : null;
  let fatProgr = fatBase;
  let ebitdaProgr = ebitdaBase;

  // Struttura dati per il grafico: un punto per step
  // punti[i] = { step, fatMin6, fatMax6, fatMin12, fatMax12, fatMin24, fatMax24, ebitdaMin12, ebitdaMax12, costoMensile }
  const puntiGrafico = [];

  for (let step = cur; step < tgt; step++) {
    const isFirst = step === cur;
    const stepDesc = DIM_DESC[dimId]?.[step - 1] || '';
    const pStep = p ? {...p, fatturato_anno_1: fatProgr, ebitda: ebitdaProgr} : p;

    // Raccoglie dati per il grafico
    const impattoStep = _getImpatto(settore, dimId, step + '-' + (step + 1));
    const costoStep = _getCosto(settore, dimId, step, step + 1);
    let costoMensile = null;
    if (costoStep) {
      costoMensile = costoStep.r || 0;
    }
    if (impattoStep && fatProgr) {
      puntiGrafico.push({
        step,
        label: step + '\u2192' + (step+1),
        fatBase: fatProgr,
        fatMin6:  Math.round(fatProgr*(1+impattoStep.pct_6m[0]/100)/1000)*1000,
        fatMax6:  Math.round(fatProgr*(1+impattoStep.pct_6m[1]/100)/1000)*1000,
        fatMin12: Math.round(fatProgr*(1+impattoStep.pct_12m[0]/100)/1000)*1000,
        fatMax12: Math.round(fatProgr*(1+impattoStep.pct_12m[1]/100)/1000)*1000,
        fatMin24: Math.round(fatProgr*(1+impattoStep.pct_24m[0]/100)/1000)*1000,
        fatMax24: Math.round(fatProgr*(1+impattoStep.pct_24m[1]/100)/1000)*1000,
        ebitdaMin12: ebitdaMarginBase ? Math.round(fatProgr*(1+impattoStep.pct_12m[0]/100)*ebitdaMarginBase*(fatProgr>=2000000?1.5:fatProgr>=500000?1.35:1.2)/1000)*1000 : null,
        ebitdaMax12: ebitdaMarginBase ? Math.round(fatProgr*(1+impattoStep.pct_12m[1]/100)*ebitdaMarginBase*(fatProgr>=2000000?1.5:fatProgr>=500000?1.35:1.2)/1000)*1000 : null,
        costoMensile
      });
      // Aggiorna base per step successivo
      const midPct12 = (impattoStep.pct_12m[0] + impattoStep.pct_12m[1]) / 2;
      fatProgr = Math.round(fatProgr * (1 + midPct12/100) / 1000) * 1000;
      if (ebitdaProgr && ebitdaMarginBase) {
        const leva = fatProgr>=2000000?1.5:fatProgr>=500000?1.35:1.2;
        ebitdaProgr = Math.round(fatProgr * ebitdaMarginBase * leva / 1000) * 1000;
      }
    }

    // Renderizza lo step — card impatto SOLO sul primo step
    html += '\x3cdiv style="margin-bottom:12px;border-left:2px solid ' + (isFirst ? 'var(--gold)' : 'var(--border2)') + ';padding-left:10px">';
    html += '\x3cdiv style="display:flex;align-items:center;gap:6px;margin-bottom:4px">';
    html += '\x3cdiv style="font-size:10px;font-weight:700;color:' + (isFirst ? 'var(--gold)' : 'var(--gray)') + ';background:' + (isFirst ? 'var(--amber-bg)' : 'var(--bg3)') + ';border:1px solid ' + (isFirst ? 'var(--gold-dim)' : 'var(--border)') + ';border-radius:4px;padding:2px 8px">';
    html += step + ' \u2192 ' + (step+1) + (isFirst ? ' \u00b7 Da fare ora' : '') + '\x3c/div>';
    html += '\x3c/div>';
    if (stepDesc) html += '\x3cdiv style="font-size:10px;color:var(--gray2);line-height:1.4;margin-bottom:4px;font-style:italic">' + stepDesc + '\x3c/div>';
    // Card impatto solo sul primo step
    html += _buildStepBlock(dimId, step, step+1, settore, azioniDone, azioniCustom, null);
    html += '\x3c/div>';
  }

  // --- Grafico unico in fondo (solo se target > cur+1 oppure sempre se c'è impatto) ---
  if (puntiGrafico.length > 0 && fatBase) {
    const gap = tgt - cur;
    const hasEbitda = puntiGrafico.some(p => p.ebitdaMin12 !== null);

    // Valore finale complessivo (ultimo step, proiezione 24m)
    const ultimo = puntiGrafico[puntiGrafico.length - 1];
    const fatFinaleMin = ultimo.fatMin24;
    const fatFinaleMax = ultimo.fatMax24;
    const deltaMin = fatFinaleMin - fatBase;
    const deltaMax = fatFinaleMax - fatBase;
    const pctFinMin = Math.round((fatFinaleMin/fatBase - 1)*100);
    const pctFinMax = Math.round((fatFinaleMax/fatBase - 1)*100);

    // Costo totale mensile stimato (somma di tutti gli step)
    const costoTotMensile = puntiGrafico.reduce((s,p) => s + (p.costoMensile||0), 0);
    const costoTot24 = Math.round(costoTotMensile * 24 / 1000) * 1000;
    const roiMin = deltaMin > 0 && costoTot24 > 0 ? Math.round((deltaMin / costoTot24) * 10) / 10 : null;
    const roiMax = deltaMax > 0 && costoTot24 > 0 ? Math.round((deltaMax / costoTot24) * 10) / 10 : null;

    // SVG bar chart — barre orizzontali per ogni step + orizzonti
    // Larghezza massima = fatMax24 dell'ultimo step
    const maxVal = Math.max(...puntiGrafico.map(p => p.fatMax24), fatBase) * 1.05;
    const barH = 22;
    const barGap = 8;
    const labelW = 38;
    const chartW = 320;
    const totalH = puntiGrafico.length * (barH * 3 + barGap * 4) + 60;

    let svgBars = '';
    puntiGrafico.forEach((pt, i) => {
      const yBase = i * (barH * 3 + barGap * 4) + 30;
      const scaleW = (v) => Math.round((v / maxVal) * (chartW - labelW - 8));

      // Label step
      svgBars += '\x3ctext x="0" y="' + (yBase + barH*1.5) + '" font-size="9" fill="var(--gray)" font-weight="700" dominant-baseline="middle">' + pt.label + '\x3c/text>';

      // Barra 6m
      const w6min = scaleW(pt.fatMin6); const w6max = scaleW(pt.fatMax6);
      svgBars += '\x3crect x="' + labelW + '" y="' + yBase + '" width="' + w6max + '" height="' + barH + '" rx="3" fill="#C8E6C9" opacity=".7"/>\x3c/rect>';
      svgBars += '\x3crect x="' + labelW + '" y="' + yBase + '" width="' + w6min + '" height="' + barH + '" rx="3" fill="#81C784"/>\x3c/rect>';
      svgBars += '\x3ctext x="' + (labelW + w6max + 4) + '" y="' + (yBase + barH/2) + '" font-size="8" fill="var(--gray)" dominant-baseline="middle">6m: ' + _formatEur(pt.fatMin6) + '–' + _formatEur(pt.fatMax6) + '€\x3c/text>';

      // Barra 12m
      const w12min = scaleW(pt.fatMin12); const w12max = scaleW(pt.fatMax12);
      svgBars += '\x3crect x="' + labelW + '" y="' + (yBase+barH+barGap) + '" width="' + w12max + '" height="' + barH + '" rx="3" fill="#A5D6A7" opacity=".7"/>\x3c/rect>';
      svgBars += '\x3crect x="' + labelW + '" y="' + (yBase+barH+barGap) + '" width="' + w12min + '" height="' + barH + '" rx="3" fill="#4CAF50"/>\x3c/rect>';
      svgBars += '\x3ctext x="' + (labelW + w12max + 4) + '" y="' + (yBase+barH+barGap+barH/2) + '" font-size="8" fill="var(--gray)" dominant-baseline="middle">12m: ' + _formatEur(pt.fatMin12) + '–' + _formatEur(pt.fatMax12) + '€\x3c/text>';

      // Barra 24m
      const w24min = scaleW(pt.fatMin24); const w24max = scaleW(pt.fatMax24);
      svgBars += '\x3crect x="' + labelW + '" y="' + (yBase+barH*2+barGap*2) + '" width="' + w24max + '" height="' + barH + '" rx="3" fill="#66BB6A" opacity=".7"/>\x3c/rect>';
      svgBars += '\x3crect x="' + labelW + '" y="' + (yBase+barH*2+barGap*2) + '" width="' + w24min + '" height="' + barH + '" rx="3" fill="#2E7D32"/>\x3c/rect>';
      svgBars += '\x3ctext x="' + (labelW + w24max + 4) + '" y="' + (yBase+barH*2+barGap*2+barH/2) + '" font-size="8" fill="#1B5E20" font-weight="600" dominant-baseline="middle">24m: ' + _formatEur(pt.fatMin24) + '–' + _formatEur(pt.fatMax24) + '€\x3c/text>';

      // Linea separatore tra step
      if (i < puntiGrafico.length - 1) {
        svgBars += '\x3cline x1="0" y1="' + (yBase + barH*3 + barGap*3 + barGap/2) + '" x2="' + (chartW+60) + '" y2="' + (yBase + barH*3 + barGap*3 + barGap/2) + '" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,3"/>\x3c/line>';
      }
    });

    html += '\x3cdiv style="margin-top:16px;border:1px solid #C8E6C9;border-radius:8px;overflow:hidden">';
    // Header
    html += '\x3cdiv style="background:#1B5E20;color:#fff;padding:8px 12px;display:flex;justify-content:space-between;align-items:center">';
    html += '\x3cdiv style="font-size:10px;font-weight:700;letter-spacing:.06em">PROIEZIONE CRESCITA ' + cur + ' → ' + tgt + '\x3c/div>';
    html += '\x3cdiv style="font-size:9px;opacity:.85">Base: ' + _formatEur(fatBase) + '€' + (hasEbitda ? ' · EBITDA: ' + _formatEur(ebitdaBase) + '€' : '') + '\x3c/div>';
    html += '\x3c/div>';
    // Summary KPI
    html += '\x3cdiv style="display:grid;grid-template-columns:1fr 1fr' + (roiMin ? ' 1fr' : '') + ';background:#F1F8E9;border-bottom:1px solid #C8E6C9">';
    html += '\x3cdiv style="padding:8px 12px;border-right:1px solid #C8E6C9">';
    html += '\x3cdiv style="font-size:8px;color:#558B2F;font-weight:700;letter-spacing:.05em;margin-bottom:3px">FATTURATO TARGET 24m\x3c/div>';
    html += '\x3cdiv style="font-size:13px;font-weight:700;color:#1B5E20">' + _formatEur(fatFinaleMin) + '–' + _formatEur(fatFinaleMax) + '€\x3c/div>';
    html += '\x3cdiv style="font-size:9px;color:#388E3C">+' + _formatEur(deltaMin) + '–' + _formatEur(deltaMax) + '€ (+' + pctFinMin + '–' + pctFinMax + '%)\x3c/div>';
    html += '\x3c/div>';
    html += '\x3cdiv style="padding:8px 12px' + (roiMin ? ';border-right:1px solid #C8E6C9' : '') + '">';
    html += '\x3cdiv style="font-size:8px;color:#558B2F;font-weight:700;letter-spacing:.05em;margin-bottom:3px">INVESTIMENTO TOTALE 24m\x3c/div>';
    html += '\x3cdiv style="font-size:13px;font-weight:700;color:#B8842E">≈ ' + _formatEur(costoTot24) + '€\x3c/div>';
    html += '\x3cdiv style="font-size:9px;color:#8D6E63">≈ ' + _formatEur(Math.round(costoTotMensile/1000)*1000) + '€/mese\x3c/div>';
    html += '\x3c/div>';
    if (roiMin) {
      html += '\x3cdiv style="padding:8px 12px">';
      html += '\x3cdiv style="font-size:8px;color:#558B2F;font-weight:700;letter-spacing:.05em;margin-bottom:3px">ROI STIMATO 24m\x3c/div>';
      html += '\x3cdiv style="font-size:13px;font-weight:700;color:#1B5E20">' + roiMin + '–' + roiMax + 'x\x3c/div>';
      html += '\x3cdiv style="font-size:9px;color:#388E3C">per ogni € investito\x3c/div>';
      html += '\x3c/div>';
    }
    html += '\x3c/div>';
    // SVG chart
    html += '\x3cdiv style="padding:12px;background:#fff;overflow-x:auto">';
    html += '\x3csvg width="' + (chartW+80) + '" height="' + totalH + '" xmlns="http://www.w3.org/2000/svg">';
    // Linea base (fatturato attuale)
    const xBase = Math.round((fatBase / maxVal) * (chartW - labelW - 8)) + labelW;
    html += '\x3cline x1="' + xBase + '" y1="0" x2="' + xBase + '" y2="' + (totalH-20) + '" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,3"/>\x3c/line>';
    html += '\x3ctext x="' + xBase + '" y="' + (totalH-8) + '" font-size="8" fill="#BDBDBD" text-anchor="middle">Base\x3c/text>';
    html += svgBars;
    html += '\x3c/svg>';
    html += '\x3c/div>';
    // Legenda colori
    html += '\x3cdiv style="padding:6px 12px;background:#F9FBF9;border-top:1px solid #E8F5E9;display:flex;gap:16px;flex-wrap:wrap">';
    html += '\x3cspan style="font-size:8px;color:#558B2F;display:flex;align-items:center;gap:4px">\x3cspan style="width:10px;height:10px;background:#81C784;border-radius:2px;display:inline-block">\x3c/span>6 mesi\x3c/span>';
    html += '\x3cspan style="font-size:8px;color:#558B2F;display:flex;align-items:center;gap:4px">\x3cspan style="width:10px;height:10px;background:#4CAF50;border-radius:2px;display:inline-block">\x3c/span>12 mesi\x3c/span>';
    html += '\x3cspan style="font-size:8px;color:#558B2F;display:flex;align-items:center;gap:4px">\x3cspan style="width:10px;height:10px;background:#2E7D32;border-radius:2px;display:inline-block">\x3c/span>24 mesi\x3c/span>';
    html += '\x3cspan style="font-size:8px;color:#9E9E9E;display:flex;align-items:center;gap:4px">\x3cspan style="width:10px;height:1px;background:#E0E0E0;border-top:1px dashed #E0E0E0;display:inline-block">\x3c/span>fatturato base\x3c/span>';
    html += '\x3c/div>';
    html += '\x3c/div>';
  }

  html += '\x3c/div>';
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
  if (block) block.innerHTML = _buildSubObiettivi(stepKey.split('_')[0], pi.dims?.[stepKey.split('_')[0]] || 0, pi.targets?.[stepKey.split('_')[0]] || 0, pi.settore || '', pi.azioni_completate || {}, pi.azioni_custom || {}, pi);
  showToast('Azione aggiunta!');
}

function renderTargetEditor(p) {
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
    const curDesc = DIM_DESC[d.id]?.[cur-1] || '--';
    const tgtDesc = DIM_DESC[d.id]?.[tgt-1] || '--';
    const subObiettiviHtml = _buildSubObiettivi(d.id, cur, tgt, settore, azioniDone, azioniCustom, p);
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
  if (megaSection) megaSection.innerHTML = _buildMegaGrafico(p);
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
  if (megaSection) megaSection.innerHTML = _buildMegaGrafico(pPreview);
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
}

function updateTargetDesc(dimId) {
  const el = document.getElementById('tgt-' + dimId);
  const descEl = document.getElementById('tdesc-' + dimId);
  if (!el || !descEl) return;
  const v = parseInt(el.value) || 1;
  const desc = DIM_DESC[dimId]?.[v-1] || '--';
  const col = v >= 4 ? 'var(--green)' : v >= 3 ? 'var(--gold)' : 'var(--red)';
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
  block.innerHTML = _buildSubObiettivi(dimId, cur, tgt, p.settore || '', p.azioni_completate || {}, p.azioni_custom || {}, p);
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
  const fv = (field) => p[field] || '';
  return `
  \x3cdiv style="margin-top:20px;border-top:2px solid var(--gold-dim);padding-top:16px">
    \x3cdiv style="font-size:11px;font-weight:600;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;margin-bottom:14px">
      ! Calcolatrice Conto Economico
    \x3c/div>

    \x3c!-- RIGA 1: Fatturato --\x3e
    \x3cdiv class="pl-row pl-row-input">
      \x3cdiv class="pl-label">Fatturato annuo \x3cspan class="tt-wrap">\x3cspan class="tt-icon">?\x3c/span>\x3cspan class="tt-bubble">Il totale dei ricavi dell'anno. Base di tutto il conto economico.\x3c/span>\x3c/span>\x3c/div>
      \x3cdiv class="pl-input-wrap">
        \x3cinput class="form-input pl-input" type="number" id="pl-fatturato" title="Il totale dei ricavi annui. Base di tutto il conto economico." placeholder="es. 3000000"
          value="${fv('fatturato_anno_1')}" oninput="aggiornaCalcolatrice()">
        \x3cdiv class="pl-preview" id="plp-fatturato">\x3c/div>
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
          \x3cinput class="form-input pl-input" type="number" id="pl-cogs-pct" title="Il costo diretto per produrre o acquistare cio che vendi: materie prime, acquisti di merce, costo di produzione. NON include affitti o stipendi fissi." placeholder="%" min="0" max="100" step="0.1"
            value="${fv('cogs_pct') || ''}" oninput="aggiornaCalcolatrice()" style="width:70px">
          \x3cspan style="color:var(--gray);font-size:12px">%\x3c/span>
          \x3cspan style="color:var(--gray2);font-size:11px">oppure\x3c/span>
          \x3cinput class="form-input pl-input" type="number" id="pl-cogs-val" placeholder="EUR" min="0"
            value="${fv('cogs_val') || ''}" oninput="aggiornaCalcolatrice()" style="flex:1">
        \x3c/div>
        \x3cdiv class="pl-preview" id="plp-cogs">\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- RISULTATO: Margine Lordo --\x3e
    \x3cdiv class="pl-row pl-row-result" id="plr-margine-lordo">
      \x3cdiv class="pl-label">= Margine Lordo\x3c/div>
      \x3cdiv style="display:flex;gap:16px;align-items:baseline">
        \x3cdiv class="pl-result-val" id="plv-margine-lordo">--\x3c/div>
        \x3cdiv class="pl-result-pct" id="plp-margine-lordo">\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- RIGA 3: Costi fissi --\x3e
    \x3cdiv class="pl-row pl-row-input">
      \x3cdiv class="pl-label">
        Costi fissi mensili \x3cspan class="tt-wrap">\x3cspan class="tt-icon">?\x3c/span>\x3cspan class="tt-bubble">Tutti i costi che paghi ogni mese indipendentemente dal fatturato: affitto, stipendi fissi, utenze, software, commercialista.\x3c/span>\x3c/span>
        \x3cdiv class="pl-sublabel">affitti, utilities, stipendi fissi, servizi\x3c/div>
      \x3c/div>
      \x3cdiv class="pl-input-wrap">
        \x3cinput class="form-input pl-input" type="number" id="pl-costi-fissi" title="Tutti i costi mensili che paghi indipendentemente da quanto vendi: affitto, stipendi fissi, utenze, software, commercialista ecc." placeholder="es. 85000"
          value="${fv('costi_fissi_mensili')}" oninput="aggiornaCalcolatrice()">
        \x3cdiv class="pl-preview" id="plp-costi-fissi">\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- RISULTATO: EBITDA --\x3e
    \x3cdiv class="pl-row pl-row-result" id="plr-ebitda">
      \x3cdiv class="pl-label">= EBITDA\x3c/div>
      \x3cdiv style="display:flex;gap:16px;align-items:baseline">
        \x3cdiv class="pl-result-val" id="plv-ebitda">--\x3c/div>
        \x3cdiv class="pl-result-pct" id="plp-ebitda-pct">\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- RIGA 4: Ammortamenti --\x3e
    \x3cdiv class="pl-row pl-row-input">
      \x3cdiv class="pl-label" style="cursor:pointer" onclick="toggleAmmPanel()">
        Ammortamenti annui \x3cspan class="tt-wrap">\x3cspan class="tt-icon">?\x3c/span>\x3cspan class="tt-bubble">La quota annua di svalutazione dei beni aziendali durevoli (macchinari, auto, software). Clicca per calcolarlo voce per voce.\x3c/span>\x3c/span>
        \x3cdiv class="pl-sublabel">clicca per calcolare per categoria v\x3c/div>
      \x3c/div>
      \x3cdiv class="pl-input-wrap">
        \x3cinput class="form-input pl-input" type="number" id="pl-ammortamenti" title="La quota annuale di "usura" di beni durevoli (macchinari, auto, software). Clicca il titolo per calcolarlo categoria per categoria." placeholder="es. 150000"
          value="${fv('ammortamenti_annui') || ''}" oninput="aggiornaCalcolatrice()">
        \x3cdiv class="pl-preview" id="plp-ammortamenti">\x3c/div>
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
    \x3cdiv class="pl-row pl-row-result" id="plr-ebit">
      \x3cdiv class="pl-label">= EBIT (utile operativo)\x3c/div>
      \x3cdiv style="display:flex;gap:16px;align-items:baseline">
        \x3cdiv class="pl-result-val" id="plv-ebit">--\x3c/div>
        \x3cdiv class="pl-result-pct" id="plp-ebit-pct">\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- RIGA 5: Imposte --\x3e
    \x3cdiv class="pl-row pl-row-input">
      \x3cdiv class="pl-label">
        Aliquota fiscale stimata \x3cspan class="tt-wrap">\x3cspan class="tt-icon">?\x3c/span>\x3cspan class="tt-bubble">La % di tasse sul reddito. Srl: IRES 24% + IRAP ~3.9% = ~28%. Ditte individuali: IRPEF progressiva 23-43%. Forfettario: 15% (o 5% startup).\x3c/span>\x3c/span>
        \x3cdiv class="pl-sublabel">IRES 24% + IRAP ~3.9% = 28% default PMI\x3c/div>
      \x3c/div>
      \x3cdiv class="pl-input-wrap">
        \x3cdiv style="display:flex;align-items:center;gap:8px">
          \x3cinput class="form-input pl-input" type="number" id="pl-aliquota" title="L'aliquota fiscale totale stimata (IRES 24% + IRAP ~3.9% = ~28% per le Srl). Modifica se conosci l'aliquota effettiva." placeholder="28" min="0" max="60"
            value="28" oninput="aggiornaCalcolatrice()" style="width:80px">
          \x3cspan style="color:var(--gray);font-size:12px">%\x3c/span>
        \x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- RISULTATO: Utile Netto --\x3e
    \x3cdiv class="pl-row pl-row-result pl-row-final" id="plr-utile">
      \x3cdiv class="pl-label" style="font-size:14px;color:var(--white)">= Utile Netto\x3c/div>
      \x3cdiv style="display:flex;gap:16px;align-items:baseline">
        \x3cdiv class="pl-result-val" id="plv-utile" style="font-size:22px;font-family:'DM Serif Display',serif">--\x3c/div>
        \x3cdiv class="pl-result-pct" id="plp-utile-pct">\x3c/div>
      \x3c/div>
    \x3c/div>

    \x3c!-- Riepilogo margini --\x3e
    \x3cdiv id="pl-margini-riepilogo" style="display:none;margin-top:12px;background:var(--bg3);border-radius:var(--rs);padding:10px 14px">
      \x3cdiv style="font-size:10px;font-weight:600;color:var(--gray);letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px">Riepilogo margini\x3c/div>
      \x3cdiv style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px" id="pl-margini-grid">\x3c/div>
    \x3c/div>

    \x3cbutton type="button" onclick="salvaDaCalcolatrice()" style="
      background:var(--gold);color:#fff;border:none;border-radius:var(--rs);
      padding:10px 20px;font-size:13px;font-weight:600;cursor:pointer;
      font-family:'DM Sans',sans-serif;width:100%;margin-top:16px">
      v Salva tutti i valori calcolati
    \x3c/button>
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
  const ammField = document.getElementById('pl-ammortamenti');
  if (ammField) { ammField.value = tot; aggiornaCalcolatrice(); }
}

function aggiornaCalcolatrice() {
  const v = id => parseFloat(document.getElementById(id)?.value) || 0;
  const fmt = n => n.toLocaleString('it-IT', {style:'currency', currency:'EUR', maximumFractionDigits:0});
  const pct = (n, base) => base ? (n/base*100).toFixed(1)+'%' : '';
  const col = n => n > 0 ? 'var(--green)' : n < 0 ? 'var(--red)' : 'var(--gray)';

  const fatturato  = v('pl-fatturato');
  const cogsPct    = v('pl-cogs-pct');
  const cogsVal    = v('pl-cogs-val');
  const costiFissiMensili = v('pl-costi-fissi');
  const ammortamenti = v('pl-ammortamenti');
  const aliquota   = v('pl-aliquota') / 100 || 0.28;

  // Costo del venduto: preferisci valore ?, altrimenti % su fatturato
  const cogs = cogsVal > 0 ? cogsVal : (cogsPct > 0 ? fatturato * cogsPct / 100 : 0);
  const costiFissiAnnui = costiFissiMensili * 12;

  const margineLordo = fatturato - cogs;
  const ebitda = margineLordo - costiFissiAnnui;
  const ebit = ebitda - ammortamenti;
  const imposte = ebit > 0 ? ebit * aliquota : 0;
  const utile = ebit - imposte;

  // Update previews
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setCol = (id, n) => { const el = document.getElementById(id); if (el) el.style.color = col(n); };

  if (fatturato) set('plp-fatturato', fmt(fatturato));
  if (cogs)      { set('plp-cogs', fmt(cogs)); }
  if (costiFissiMensili) set('plp-costi-fissi', `${fmt(costiFissiMensili)}/mese . ${fmt(costiFissiAnnui)} annui`);
  if (ammortamenti) set('plp-ammortamenti', fmt(ammortamenti));

  if (fatturato) {
    // Margine lordo
    set('plv-margine-lordo', fmt(margineLordo));
    set('plp-margine-lordo', pct(margineLordo, fatturato));
    setCol('plv-margine-lordo', margineLordo);
    document.getElementById('plr-margine-lordo').style.borderLeftColor = col(margineLordo);

    // EBITDA
    set('plv-ebitda', fmt(ebitda));
    set('plp-ebitda-pct', pct(ebitda, fatturato));
    setCol('plv-ebitda', ebitda);
    document.getElementById('plr-ebitda').style.borderLeftColor = col(ebitda);
    // Aggiorna il campo EBITDA readonly nel form
    const ebitdaDisplay = document.getElementById('fin-ebitda-display');
    const ebitdaHidden  = document.getElementById('fin-ebitda');
    if (ebitdaDisplay && ebitda) {
      ebitdaDisplay.textContent = fmt(ebitda);
      ebitdaDisplay.style.color = ebitda > 0 ? 'var(--green)' : 'var(--red)';
    }
    if (ebitdaHidden && ebitda) ebitdaHidden.value = Math.round(ebitda);

    // EBIT
    set('plv-ebit', fmt(ebit));
    set('plp-ebit-pct', pct(ebit, fatturato));
    setCol('plv-ebit', ebit);
    document.getElementById('plr-ebit').style.borderLeftColor = col(ebit);

    // Utile netto
    set('plv-utile', fmt(utile));
    set('plp-utile-pct', pct(utile, fatturato));
    setCol('plv-utile', utile);
    document.getElementById('plr-utile').style.borderLeftColor = col(utile);

    // Riepilogo margini
    const riepilogo = document.getElementById('pl-margini-riepilogo');
    const grid = document.getElementById('pl-margini-grid');
    if (riepilogo && grid) {
      riepilogo.style.display = 'block';
      const margini = [
        { label:'Margine lordo', val: pct(margineLordo, fatturato), n: margineLordo },
        { label:'EBITDA margin', val: pct(ebitda, fatturato), n: ebitda },
        { label:'EBIT margin',   val: pct(ebit, fatturato), n: ebit },
        { label:'Utile netto %', val: pct(utile, fatturato), n: utile },
      ];
      grid.innerHTML = margini.map(m => `
        \x3cdiv style="text-align:center;background:var(--bg2);border-radius:4px;padding:8px 4px;border:1px solid var(--border)">
          \x3cdiv style="font-size:9px;color:var(--gray);text-transform:uppercase;letter-spacing:.04em;margin-bottom:3px">${m.label}\x3c/div>
          \x3cdiv style="font-size:16px;font-family:'DM Serif Display',serif;color:${col(m.n)}">${m.val || '--'}\x3c/div>
        \x3c/div>`).join('');
    }
  }
}

function salvaDaCalcolatrice() {
  const v = id => parseFloat(document.getElementById(id)?.value) || null;
  const cogsPct = v('pl-cogs-pct');
  const cogsVal = v('pl-cogs-val');
  const fatturato = v('pl-fatturato');
  const cogs = cogsVal || (cogsPct && fatturato ? fatturato * cogsPct / 100 : null);
  const costiFissi = v('pl-costi-fissi');
  const ammortamenti = v('pl-ammortamenti');
  const aliquota = (v('pl-aliquota') || 28) / 100;

  const margineLordo = fatturato && cogs ? fatturato - cogs : null;
  const costiFissiAnnui = costiFissi ? costiFissi * 12 : 0;
  const ebitda = margineLordo !== null ? margineLordo - costiFissiAnnui : null;
  const ebit = ebitda !== null && ammortamenti ? ebitda - ammortamenti : ebitda;
  const imposte = ebit > 0 ? ebit * aliquota : 0;
  const utile = ebit !== null ? ebit - imposte : null;
  const marginePct = fatturato && utile ? (utile / fatturato * 100) : null;

  // Push values into the form fields
  const setField = (id, val) => {
    const el = document.getElementById('fin-' + id);
    if (el && val !== null) {
      el.value = Math.round(val);
      const fp = document.getElementById('fp-' + id);
      if (fp) fp.textContent = Math.round(val).toLocaleString('it-IT',{style:'currency',currency:'EUR',maximumFractionDigits:0});
    }
  };

  if (fatturato) setField('fatturato_anno_1', fatturato);
  if (costiFissi) setField('costi_fissi_mensili', costiFissi);
  if (ebitda) setField('ebitda', ebitda);
  if (utile) setField('utile_netto', utile);
  if (marginePct) {
    const el = document.getElementById('fin-margine_pct');
    if (el) el.value = marginePct.toFixed(1);
  }
  // Save leasing from amm panel if set
  const leasingAmm = parseFloat(document.getElementById('amm-leasing')?.value) || null;
  if (leasingAmm) setField('leasing_rata_mensile', leasingAmm);

  // Show confirmation
  const btn = document.querySelector('[onclick="salvaDaCalcolatrice()"]');
  if (btn) {
    btn.textContent = 'v Valori copiati nei campi -- ora premi Salva';
    btn.style.background = 'var(--green)';
  }
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


