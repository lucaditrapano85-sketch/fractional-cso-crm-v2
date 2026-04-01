function calcolaScoreDimensione(dimId, famiglia, risposte) {
  var domande = DIAGNOSI_DOMANDE[famiglia] && DIAGNOSI_DOMANDE[famiglia][dimId];
  if (!domande || !domande.length) return 0;

  var punteggioTot = 0;
  var pesoTotale = 0;
  var pesoRisposto = 0;

  domande.forEach(function(d) {
    pesoTotale += d.peso;
    var val = risposte[d.id];
    if (val === undefined || val === null || val === '') return;
    pesoRisposto += d.peso;

    if (d.tipo === 'yn') {
      punteggioTot += (val === 'si' || val === true || val === 1) ? d.peso : 0;
    } else if (d.tipo === 'mc') {
      var maxScore = d.opzioni.length - 1;
      var rawScore = typeof val === 'number' ? val : parseInt(val) || 0;
      punteggioTot += (rawScore / maxScore) * d.peso;
    }
  });

  if (pesoRisposto === 0) return 0;

  // Normalizza sulle domande risposte, penalizza leggermente se poche
  var copertura = pesoRisposto / pesoTotale;
  var scoreBase = (punteggioTot / pesoRisposto) * 4 + 1;
  var fattoreCopertura = copertura < 0.5 ? 0.7 + (copertura * 0.6) : 1;
  var score = Math.round(Math.min(5, Math.max(1, scoreBase * fattoreCopertura)));

  // Cap: lo score non può superare (livello_MC + 1).
  // La domanda MC è l'ancoraggio principale — le YN affinano ma non saltano livello.
  var mcDomanda = domande.find(function(d){ return d.tipo === 'mc'; });
  if (mcDomanda) {
    var mcVal = risposte[mcDomanda.id];
    if (mcVal !== undefined && mcVal !== null && mcVal !== '') {
      var mcLivello = typeof mcVal === 'number' ? mcVal : parseInt(mcVal) || 0;
      var maxConsentito = mcLivello + 1; // opzione 0 → max 1, opzione 4 → max 5
      score = Math.min(score, maxConsentito);
    }
  }

  return score;
}

// ── DIAGNOSI GUIDATA — LOGICA ──────────────────────────────────────────────

var _diagProspect = null;
var _diagFamiglia = null;
var _diagStep = 0; // 0-7 = dimensioni, 8 = risultato
var _diagRisposte = {}; // { dimId: { domandaId: valore } }
var _diagCompletata = false;
var _diagDims = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
var _diagLabels = {
  vendite: 'Struttura commerciale',
  pipeline: 'Pipeline & CRM',
  team: 'Organizzazione',
  processi: 'Processi & script',
  ricavi: 'Prevedibilità ricavi',
  marketing: 'Marketing & lead gen',
  sitoweb: 'Sito web',
  ecommerce: 'Approvvigionamento / Specifico',
};
var _diagDescr = {
  vendite: 'Come è organizzata la funzione vendite in azienda',
  pipeline: 'Come vengono gestite le trattative e i dati commerciali',
  team: 'Come sono organizzati ruoli, deleghe e processi decisionali',
  processi: 'Quanto sono definiti e documentati i processi di vendita',
  ricavi: 'Prevedibilità e ricorrenza del fatturato',
  marketing: 'Capacita di generare nuovi clienti in modo strutturato',
  sitoweb: 'Presenza e qualita del sito web',
  ecommerce: 'Strategia di approvvigionamento e gestione fornitori',
};
function _getDiagLabel(settore, dimId) {
  // Label specifico da STEP_DETAIL se disponibile
  var sd = (typeof STEP_DETAIL_BY_SETTORE !== 'undefined') ? STEP_DETAIL_BY_SETTORE : {};
  var lbl = sd[settore]?.[dimId]?._label;
  if (lbl) return lbl;
  if (typeof getDimLabel === 'function') return getDimLabel(settore, dimId);
  return _diagLabels[dimId] || dimId;
}
function _getDiagDescr(settore, dimId) {
  return _diagDescr[dimId] || '';
}

async function resetDiagnosi() {
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;
  try {
    await sb.from('prospects').update({ dims: {}, dims_answers: {}, step_completamenti: {}, azioni_completate: {}, targets: {}, score_history: [] }).eq('id', currentId);
    var i = prospects.findIndex(function(x){ return x.id === currentId; });
    prospects[i].dims = {};
    prospects[i].dims_answers = {};
    prospects[i].step_completamenti = {};
    prospects[i].targets = {};
    prospects[i].score_history = [];
    _diagRisposte = {};
    showToast('Diagnosi azzerata');
    drawRadar({}, prospects[i].targets || {});
    renderProspectDetail(currentId);
  } catch(e) {
    showToast('Errore: ' + e.message, 'error');
  }
}

function apriDiagnosi() {
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;
  if (!p.settore) {
    showToast('Seleziona prima il settore del prospect', 'error');
    return;
  }
  _diagProspect = p;
  var settoreBase = FAMIGLIA_SETTORE[p.settore] || 'b2b_manifatturiero';
  var isAutomotive = ['commercio_auto_moto_nuovo','commercio_auto_moto_usato'].indexOf(p.settore) >= 0;
  _diagFamiglia = isAutomotive ? 'automotive' : settoreBase;
  // Verifica che la famiglia esista in DIAGNOSI_DOMANDE, altrimenti fallback
  if (!DIAGNOSI_DOMANDE[_diagFamiglia]) _diagFamiglia = 'b2b_manifatturiero';
  _diagStep = 0;
  _diagCompletata = false;
  // Ricarica risposte salvate per questo prospect (se esistono)
  _diagRisposte = (p.dims_answers && typeof p.dims_answers === 'object')
    ? JSON.parse(JSON.stringify(p.dims_answers))
    : {};
  document.getElementById('diagnosi-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('diag-btn-prev').style.display = '';
  renderDiagStep();
}

function chiudiDiagnosi() {
  document.getElementById('diagnosi-overlay').classList.remove('open');
  document.body.style.overflow = '';
  if (!_diagProspect) return;
  var pid = _diagProspect.id;
  // Ricalcola dims solo se non già fatto da salvaDiagnosiScore
  if (!_diagCompletata && Object.keys(_diagRisposte).length > 0) {
    var _all = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
    var nuoviDims = {};
    _all.forEach(function(dimId) {
      nuoviDims[dimId] = calcolaScoreDimensione(dimId, _diagFamiglia, _diagRisposte[dimId] || {});
    });
    var i = prospects.findIndex(function(x){ return x.id === pid; });
    if (i >= 0) {
      prospects[i].dims = nuoviDims;
      prospects[i].dims_answers = _diagRisposte;
    }
    sb.from('prospects').update({ dims: nuoviDims, dims_answers: _diagRisposte }).eq('id', pid).catch(function(){});
  }
  // Fase 12: routing diverso per titolari PMI
  if (window.LEVA_USER_ROLE === 'titolare' && typeof _dopoChiudiDiagnosiPMI === 'function') {
    setTimeout(function() { _dopoChiudiDiagnosiPMI(pid); }, 150);
    return;
  }
  // Aggiorna sempre la scheda (CSO)
  setTimeout(function() {
    var p = prospects.find(function(x){ return x.id === pid; });
    if (p) { drawRadar(p.dims || {}, p.targets || {}); renderProspectDetail(pid); }
  }, 150);
}

function renderDiagStep() {
  var totalSteps = _diagDims.length;
  var dimId = _diagDims[_diagStep];

  // Header
  document.getElementById('diag-step-label').textContent = 'Step ' + (_diagStep + 1) + ' di ' + totalSteps;
  var _settore = _diagProspect ? _diagProspect.settore : '';
  document.getElementById('diag-dim-name').textContent = _getDiagLabel(_settore, dimId);
  document.getElementById('diag-dim-desc').textContent = _getDiagDescr(_settore, dimId);

  // Progress bar
  var pct = ((_diagStep) / totalSteps) * 100;
  document.getElementById('diag-progress-fill').style.width = pct + '%';

  // Pulsante prev
  document.getElementById('diag-btn-prev').style.opacity = _diagStep === 0 ? '0.3' : '1';
  document.getElementById('diag-btn-prev').disabled = _diagStep === 0;

  // Pulsante next
  var nextBtn = document.getElementById('diag-btn-next');
  nextBtn.textContent = _diagStep === totalSteps - 1 ? 'Calcola score' : 'Avanti';

  // Domande dalla famiglia
  var domande = DIAGNOSI_DOMANDE[_diagFamiglia] && DIAGNOSI_DOMANDE[_diagFamiglia][dimId];
  if (!domande) domande = [];

  var risposteDim = _diagRisposte[dimId] || {};
  var body = document.getElementById('diagnosi-body');

  if (domande.length === 0) {
    body.innerHTML = '\x3cdiv style="color:var(--gray);text-align:center;padding:40px 0">Nessuna domanda disponibile per questo settore\x3c/div>';
    return;
  }

  // Trova la MC principale e il suo valore
  var mcDomanda = domande.find(function(d){ return d.tipo === 'mc'; });
  var mcVal = mcDomanda ? risposteDim[mcDomanda.id] : undefined;
  var mcLivello = (mcVal !== undefined && mcVal !== null && mcVal !== '') ? (typeof mcVal === 'number' ? mcVal : parseInt(mcVal) || 0) : -1;

  var html = domande.map(function(d) {
    var val = risposteDim[d.id];
    var inputHtml = '';

    if (d.tipo === 'mc') {
      var optsHtml = d.opzioni.map(function(o, i) {
        var sel = (val === i || val === i.toString()) ? ' selected' : '';
        return '\x3cbutton class="diag-opt-btn' + sel + '" onclick="diagSetRisposta(\'' + dimId + '\',\'' + d.id + '\',' + i + ',this)">' + o.label + '\x3c/button>';
      }).join('');
      inputHtml = '\x3cdiv class="diag-opt">' + optsHtml + '\x3c/div>';
    } else if (d.tipo === 'yn') {
      // Se la yn ha disableIfMcBelow e la MC è sotto quel livello → forza No
      var forzaNo = (typeof d.disableIfMcBelow === 'number' && mcLivello >= 0 && mcLivello < d.disableIfMcBelow);
      if (forzaNo) {
        risposteDim[d.id] = 'no';
        if (!_diagRisposte[dimId]) _diagRisposte[dimId] = {};
        _diagRisposte[dimId][d.id] = 'no';
        inputHtml = '\x3cdiv class="diag-yn" style="opacity:0.35;pointer-events:none">' +
          '\x3cbutton class="diag-yn-btn si">Si\x3c/button>' +
          '\x3cbutton class="diag-yn-btn no selected">No\x3c/button>' +
        '\x3c/div>';
      } else {
        var siSel = (val === 'si') ? ' selected' : '';
        var noSel = (val === 'no') ? ' selected' : '';
        inputHtml = '\x3cdiv class="diag-yn">' +
          '\x3cbutton class="diag-yn-btn si' + siSel + '" onclick="diagSetRisposta(\'' + dimId + '\',\'' + d.id + '\',\'si\',this,\'yn-si\')">Si\x3c/button>' +
          '\x3cbutton class="diag-yn-btn no' + noSel + '" onclick="diagSetRisposta(\'' + dimId + '\',\'' + d.id + '\',\'no\',this,\'yn-no\')">No\x3c/button>' +
        '\x3c/div>';
      }
    }

    return '\x3cdiv class="diag-q">' +
      '\x3cdiv class="diag-q-testo">' + d.testo + '\x3c/div>' +
      inputHtml +
    '\x3c/div>';
  }).join('');

  body.innerHTML = html;
  body.scrollTop = 0;

  // Score preview
  aggiornaScorePreview(dimId);
}

function diagSetRisposta(dimId, domandaId, valore, el, tipo) {
  if (!_diagRisposte[dimId]) _diagRisposte[dimId] = {};
  _diagRisposte[dimId][domandaId] = valore;

  // Aggiorna UI
  if (tipo === 'yn-si' || tipo === 'yn-no') {
    // Deseleziona entrambi i pulsanti yn nel gruppo
    var parent = el.closest('.diag-yn');
    if (parent) parent.querySelectorAll('.diag-yn-btn').forEach(function(b){ b.classList.remove('selected'); });
    el.classList.add('selected');
  } else {
    // mc: deseleziona tutti nel gruppo
    var parent = el.closest('.diag-opt');
    if (parent) parent.querySelectorAll('.diag-opt-btn').forEach(function(b){ b.classList.remove('selected'); });
    el.classList.add('selected');
    // Se è una MC, ri-renderizza lo step per aggiornare stato yn
    renderDiagStep();
    return;
  }

  aggiornaScorePreview(dimId);
}

function aggiornaScorePreview(dimId) {
  var score = calcolaScoreDimensione(dimId, _diagFamiglia, _diagRisposte[dimId] || {});
  var previewEl = document.getElementById('diag-score-preview');
  if (score > 0) {
    var col = (typeof dimColor === 'function') ? dimColor(score) : (score >= 4 ? 'rgba(0,130,95,0.85)' : score >= 2 ? 'rgba(175,125,0,0.85)' : '#E53935');
    var settore = _diagProspect ? _diagProspect.settore : '';
    var stepDesc = (typeof _getStepDesc === 'function') ? _getStepDesc(settore, dimId, score) : '';
    var descHtml = (stepDesc && stepDesc !== '\u2014') ? '\x3cdiv style="font-size:10px;color:var(--gray);margin-top:3px">' + stepDesc + '\x3c/div>' : '';
    previewEl.innerHTML = 'Score stimato: \x3cstrong style="color:' + col + ';font-size:14px;margin-left:4px">' + score + '/5\x3c/strong>' + descHtml;
  } else {
    previewEl.innerHTML = '';
  }
}

async function _salvaRisposteIncrementale() {
  if (!_diagProspect) return;
  var i = prospects.findIndex(function(x){ return x.id === _diagProspect.id; });
  if (i >= 0) prospects[i].dims_answers = JSON.parse(JSON.stringify(_diagRisposte));
  try { await sb.from('prospects').update({ dims_answers: _diagRisposte }).eq('id', _diagProspect.id); } catch(e) {}
}

function diagPrev() {
  if (_diagStep > 0) {
    _salvaRisposteIncrementale();
    _diagStep--;
    renderDiagStep();
  }
}

function diagNext() {
  if (_diagStep < _diagDims.length - 1) {
    _salvaRisposteIncrementale();
    _diagStep++;
    renderDiagStep();
  } else {
    // Calcola e salva gli score
    salvaDiagnosiScore();
  }
}

async function salvaDiagnosiScore() {
  var _diagDimsAll = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  // Calcola score per ogni dimensione — 0 se non compilata
  var nuoviDims = {};
  _diagDimsAll.forEach(function(dimId) {
    var score = calcolaScoreDimensione(dimId, _diagFamiglia, _diagRisposte[dimId] || {});
    nuoviDims[dimId] = score; // include anche gli 0
  });

  // Aggiorna subito in memoria
  var i = prospects.findIndex(function(x){ return x.id === _diagProspect.id; });
  if (i >= 0) {
    prospects[i].dims = nuoviDims;
    prospects[i].dims_answers = _diagRisposte;
  }
  _diagCompletata = true;

  // Mostra risultati
  mostraRisultatoDiagnosi(nuoviDims);

  // Salva su Supabase
  try {
    var result = await sb.from('prospects').update({ dims: nuoviDims }).eq('id', _diagProspect.id);
    if (result.error) throw result.error;
    try { await sb.from('prospects').update({ dims_answers: _diagRisposte }).eq('id', _diagProspect.id); } catch(e2) {}
    showToast('Score calcolato e salvato!');
  } catch(e) {
    showToast('Errore salvataggio: ' + e.message, 'error');
  }
}

function mostraRisultatoDiagnosi(dims) {
  // Progress bar al 100%
  document.getElementById('diag-progress-fill').style.width = '100%';
  document.getElementById('diag-step-label').textContent = 'Diagnosi completata';
  document.getElementById('diag-dim-name').textContent = 'Risultati';
  document.getElementById('diag-dim-desc').textContent = 'Score calcolato per ogni dimensione';
  document.getElementById('diag-btn-prev').style.display = 'none';
  document.getElementById('diag-score-preview').innerHTML = '';

  var nextBtn = document.getElementById('diag-btn-next');
  nextBtn.textContent = 'Chiudi';
  nextBtn.setAttribute('onclick', 'chiudiDiagnosi()');
  document.getElementById('diag-btn-prev').style.display = 'none';
  var scoreFinale = calcScore({dims: dims});

  var _settoreR = _diagProspect ? _diagProspect.settore : '';
  var gridHtml = _diagDims.map(function(dimId) {
    var score = dims[dimId] || 0;
    var col = (typeof dimColor === 'function') ? dimColor(score) : (score >= 4 ? 'rgba(0,130,95,0.85)' : score >= 2 ? 'rgba(175,125,0,0.85)' : '#E53935');
    var colBg = score >= 4 ? 'rgba(0,130,95,0.1)' : score >= 2 ? 'rgba(175,125,0,0.1)' : 'rgba(229,57,53,0.1)';
    var stepDesc = (typeof _getStepDesc === 'function') ? _getStepDesc(_settoreR, dimId, Math.max(score, 1)) : '';
    return '\x3cdiv class="diag-result-item">' +
      '\x3cdiv class="diag-result-dim">' + _getDiagLabel(_settoreR, dimId) + '\x3c/div>' +
      '\x3cdiv class="diag-result-score" style="color:' + col + ';background:' + colBg + ';border-radius:6px;padding:2px 8px;display:inline-block">' + (score || '--') + '/5\x3c/div>' +
      (stepDesc && stepDesc !== '\u2014' ? '\x3cdiv style="font-size:10px;color:var(--gray);margin-top:2px">' + stepDesc + '\x3c/div>' : '') +
    '\x3c/div>';
  }).join('');

  var verdetto = scoreFinale >= 70 ? 'Struttura solida. Focus su ottimizzazione e scala.' :
                 scoreFinale >= 45 ? 'Basi presenti ma con gap strutturali.' :
                 'Organizzazione commerciale fragile. Ampi margini di miglioramento.';

  document.getElementById('diagnosi-body').innerHTML =
    '\x3cdiv class="diag-result">' +
      '\x3cdiv style="font-size:48px;font-weight:700;color:' + (scoreFinale >= 70 ? 'rgba(0,130,95,0.9)' : scoreFinale >= 45 ? 'rgba(175,125,0,0.9)' : '#E53935') + '">' + scoreFinale + '\x3c/div>' +
      '\x3cdiv style="font-size:14px;color:var(--gray);margin-bottom:4px">Score complessivo su 100\x3c/div>' +
      '\x3cdiv style="font-size:12px;color:var(--white);margin-bottom:20px">' + verdetto + '\x3c/div>' +
    '\x3c/div>' +
    '\x3cdiv class="diag-result-grid">' + gridHtml + '\x3c/div>';
}


// -- INIT --------------------------------------------------
async function init() {
  // Auth guard: redirect to login if not authenticated
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { window.location.href = '/login.html'; return; }
  window._currentUserId = session.user.id;
  window._currentUserEmail = session.user.email;
  window._viewAsUserId = null; // admin: se impostato, filtra per questo utente

  // Fase 1: Leggi ruolo da user_profiles, con fallback su user_metadata (signup)
  const { data: upData } = await sb.from('user_profiles')
    .select('role, company_name, sector, fascia_fatturato')
    .eq('user_id', session.user.id)
    .single();
  const metaRole = session.user.user_metadata?.role || null;
  window.LEVA_USER_ROLE = upData?.role || metaRole || 'cso';
  window._userProfileData = upData || null;

  // Se user_profiles mancante ma ruolo noto da metadata, crea il record
  if (!upData && metaRole) {
    try {
      await sb.from('user_profiles').insert({ user_id: session.user.id, role: metaRole });
      window._userProfileData = { role: metaRole };
    } catch(e) { console.warn('user_profiles insert fallback:', e.message); }
  }

  // Carica profilo per check admin e approvazione
  const { data: profile } = await sb.from('profiles').select('*').eq('id', session.user.id).single();
  window._isAdmin = profile?.is_admin === true;
  window._currentProfile = profile;

  // I titolari PMI non necessitano di approvazione — solo i CSO
  if (window.LEVA_USER_ROLE !== 'titolare') {
    if (!profile?.approved && !profile?.is_admin) {
      window.location.href = '/pending.html';
      return;
    }
  }

  // Fase 3: Router — CSO o titolare PMI
  if (window.LEVA_USER_ROLE === 'titolare') {
    await initPMI();
  } else {
    await initCSO();
  }
}

// ── CSO (comportamento invariato rispetto all'originale) ──────────────────────
async function initCSO() {
  document.getElementById('dash-date').textContent = new Date().toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

  await _loadProspectsData();
  await loadEventi();
  await loadBenchmarkCustom();
  renderSidebar();
  renderDashboard();

  if (window._isAdmin) {
    const adminBtn = document.getElementById('admin-btn');
    if (adminBtn) adminBtn.style.display = '';
  }
}

// ── PMI (Fasi 4-12) ──────────────────────────────────────────────────────────
async function initPMI() {
  // Sposta #app-pmi nel body (potrebbe essere annidato dentro .main/.app)
  var pmiApp = document.getElementById('app-pmi');
  if (pmiApp && pmiApp.parentElement !== document.body) {
    document.body.appendChild(pmiApp);
  }
  var csoApp = document.querySelector('.app');
  if (csoApp) csoApp.style.display = 'none';
  if (pmiApp) pmiApp.style.display = 'flex';

  // Carica prospect del titolare (per owner_user_id)
  var { data: pOwned } = await sb.from('prospects')
    .select('*').eq('owner_user_id', window._currentUserId).maybeSingle();
  window._pmiProspect = pOwned || null;

  // Fase 12: se non ha prospect o diagnosi mai completata → primo accesso
  var hasDiagnosi = window._pmiProspect
    && window._pmiProspect.dims
    && Object.keys(window._pmiProspect.dims).some(function(k) { return (window._pmiProspect.dims[k] || 0) > 0; });

  if (!hasDiagnosi) {
    if (typeof renderPrimoAccesso === 'function') renderPrimoAccesso();
    return;
  }

  // Ha diagnosi → app normale
  if (!window.prospects) window.prospects = [];
  if (!window.prospects.find(function(x) { return x.id === window._pmiProspect.id; })) {
    window.prospects.push(window._pmiProspect);
  }
  window.currentId = window._pmiProspect.id;

  if (typeof renderSidebarPMI === 'function') renderSidebarPMI();
  if (typeof renderViewPMI === 'function') renderViewPMI('home');
}



function openProfiloModal() {
  const profile = window._currentProfile || {};
  document.getElementById('profilo-nome').value = profile.nome || '';
  document.getElementById('profilo-cognome').value = profile.cognome || '';
  document.getElementById('profilo-telefono').value = profile.telefono || '';
  document.getElementById('modal-profilo').style.display = 'flex';
}

async function salvaProfilo() {
  const nome = document.getElementById('profilo-nome').value.trim();
  const cognome = document.getElementById('profilo-cognome').value.trim();
  const telefono = document.getElementById('profilo-telefono').value.trim();

  const { error } = await sb.from('profiles').update({
    nome, cognome, telefono, nome_completo: (nome + ' ' + cognome).trim()
  }).eq('id', window._currentUserId);

  if (error) { showToast('Errore salvataggio', 'error'); return; }

  // Aggiorna stato locale
  window._currentProfile = Object.assign({}, window._currentProfile, { nome, cognome, telefono, nome_completo: (nome + ' ' + cognome).trim() });

  // Aggiorna saluto dashboard
  const ora = new Date().getHours();
  const saluto = ora < 13 ? 'Buongiorno' : ora < 18 ? 'Buon pomeriggio' : 'Buonasera';
  const h1 = document.querySelector('#view-dashboard .dash-header h1');
  if (h1 && nome) h1.textContent = saluto + ', ' + nome;

  document.getElementById('modal-profilo').style.display = 'none';
  showToast('Profilo aggiornato');
}

async function _loadProspectsData() {
  let query = sb.from('prospects').select('*').order('created_at',{ascending:false});
  // Se admin sta visualizzando un utente specifico, filtra per user_id
  if (window._viewAsUserId) {
    query = query.eq('user_id', window._viewAsUserId);
  }
  const {data,error} = await query;
  if(error){showToast('Errore connessione database','error');console.error(error);return;}
  prospects=data||[];
  window._allProspects = prospects;
}

init();