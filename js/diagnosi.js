function calcolaScoreDimensione(dimId, famiglia, risposte) {
  var domande = DIAGNOSI_DOMANDE[famiglia] && DIAGNOSI_DOMANDE[famiglia][dimId];
  if (!domande || !domande.length) return 0;

  var punteggioTot = 0;
  var pesoTotale = 0; // somma di TUTTI i pesi (fisso)
  var pesoRisposto = 0; // peso delle sole domande risposte

  domande.forEach(function(d) {
    pesoTotale += d.peso; // sempre
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

  // Usa pesoTotale come denominatore — le domande non risposte valgono 0
  var normalizzato = (punteggioTot / pesoTotale) * 4 + 1;
  return Math.round(Math.min(5, Math.max(1, normalizzato)));
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
  team: 'Capitale umano',
  processi: 'Processi & script',
  ricavi: 'Prevedibilità ricavi',
  marketing: 'Marketing & lead gen',
  sitoweb: 'Sito web',
  ecommerce: 'E-commerce & digital',
};
var _diagDescr = {
  vendite: 'Come è organizzata la funzione vendite in azienda',
  pipeline: 'Come vengono gestite le trattative e i dati commerciali',
  team: 'Autonomia e competenze del team rispetto al titolare',
  processi: 'Quanto sono definiti e documentati i processi di vendita',
  ricavi: 'Prevedibilità e ricorrenza del fatturato',
  marketing: 'Capacita di generare nuovi clienti in modo strutturato',
  sitoweb: 'Presenza e qualita del sito web',
  ecommerce: 'Presenza e maturita dei canali digitali',
};

async function resetDiagnosi() {
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;
  try {
    await sb.from('prospects').update({ dims: {}, dims_answers: {} }).eq('id', currentId);
    var i = prospects.findIndex(function(x){ return x.id === currentId; });
    prospects[i].dims = {};
    prospects[i].dims_answers = {};
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
  _diagFamiglia = FAMIGLIA_SETTORE[p.settore] || 'b2b_manifatturiero';
  _diagStep = 0;
  _diagCompletata = false;
  // Ricarica risposte salvate per questo prospect (se esistono)
  _diagRisposte = (p.dims_answers && typeof p.dims_answers === 'object')
    ? JSON.parse(JSON.stringify(p.dims_answers))
    : {};
  document.getElementById('diagnosi-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  // Ripristina sempre il pulsante avanti a diagNext
  var btn = document.getElementById('diag-btn-next');
  btn.textContent = 'Avanti';
  btn.setAttribute('onclick', 'diagNext()');
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
  // Aggiorna sempre la scheda
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
  document.getElementById('diag-dim-name').textContent = (_diagProspect ? getDimLabel(_diagProspect.settore, dimId) : _diagLabels[dimId]);
  document.getElementById('diag-dim-desc').textContent = _diagDescr[dimId];

  // Progress bar
  var pct = ((_diagStep) / totalSteps) * 100;
  document.getElementById('diag-progress-fill').style.width = pct + '%';

  // Pulsante prev
  document.getElementById('diag-btn-prev').style.opacity = _diagStep === 0 ? '0.3' : '1';
  document.getElementById('diag-btn-prev').disabled = _diagStep === 0;

  // Pulsante next
  var nextBtn = document.getElementById('diag-btn-next');
  nextBtn.textContent = _diagStep === totalSteps - 1 ? 'Calcola score' : 'Avanti';

  // Domande
  var domande = DIAGNOSI_DOMANDE[_diagFamiglia] && DIAGNOSI_DOMANDE[_diagFamiglia][dimId];
  var risposteDim = _diagRisposte[dimId] || {};
  var body = document.getElementById('diagnosi-body');

  if (!domande) {
    body.innerHTML = '\x3cdiv style="color:var(--gray);text-align:center;padding:40px 0">Nessuna domanda disponibile per questo settore\x3c/div>';
    return;
  }

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
      var siSel = (val === 'si') ? ' selected' : '';
      var noSel = (val === 'no') ? ' selected' : '';
      inputHtml = '\x3cdiv class="diag-yn">' +
        '\x3cbutton class="diag-yn-btn si' + siSel + '" onclick="diagSetRisposta(\'' + dimId + '\',\'' + d.id + '\',\'si\',this,\'yn-si\')">Si\x3c/button>' +
        '\x3cbutton class="diag-yn-btn no' + noSel + '" onclick="diagSetRisposta(\'' + dimId + '\',\'' + d.id + '\',\'no\',this,\'yn-no\')">No\x3c/button>' +
      '\x3c/div>';
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
  }

  aggiornaScorePreview(dimId);
}

function aggiornaScorePreview(dimId) {
  var score = calcolaScoreDimensione(dimId, _diagFamiglia, _diagRisposte[dimId] || {});
  var previewEl = document.getElementById('diag-score-preview');
  if (score > 0) {
    var col = score >= 4 ? '#30D158' : score >= 3 ? '#FF9500' : '#FF3B30';
    previewEl.innerHTML = 'Score stimato: \x3cstrong style="color:' + col + ';font-size:14px;margin-left:4px">' + score + '/5\x3c/strong>';
  } else {
    previewEl.innerHTML = '';
  }
}

function diagPrev() {
  if (_diagStep > 0) {
    _diagStep--;
    renderDiagStep();
  }
}

function diagNext() {
  if (_diagStep < _diagDims.length - 1) {
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

  var gridHtml = _diagDims.map(function(dimId) {
    var score = dims[dimId] || 0;
    var col = score >= 4 ? '#30D158' : score >= 3 ? '#FF9500' : '#FF3B30';
    return '\x3cdiv class="diag-result-item">' +
      '\x3cdiv class="diag-result-dim">' + (_diagProspect ? getDimLabel(_diagProspect.settore, dimId) : _diagLabels[dimId]) + '\x3c/div>' +
      '\x3cdiv class="diag-result-score" style="color:' + col + '">' + (score || '--') + '/5\x3c/div>' +
    '\x3c/div>';
  }).join('');

  var verdetto = scoreFinale >= 70 ? 'Struttura solida. Focus su ottimizzazione e scala.' :
                 scoreFinale >= 45 ? 'Basi presenti ma con gap strutturali.' :
                 'Organizzazione commerciale fragile. Ampi margini di miglioramento.';

  document.getElementById('diagnosi-body').innerHTML =
    '\x3cdiv class="diag-result">' +
      '\x3cdiv style="font-size:48px;font-weight:700;color:' + (scoreFinale >= 70 ? '#30D158' : scoreFinale >= 45 ? '#FF9500' : '#FF3B30') + '">' + scoreFinale + '\x3c/div>' +
      '\x3cdiv style="font-size:14px;color:var(--gray);margin-bottom:4px">Score complessivo su 100\x3c/div>' +
      '\x3cdiv style="font-size:12px;color:var(--white);margin-bottom:20px">' + verdetto + '\x3c/div>' +
    '\x3c/div>' +
    '\x3cdiv class="diag-result-grid">' + gridHtml + '\x3c/div>';
}


// -- INIT --------------------------------------------------
async function init() {
  document.getElementById('dash-date').textContent=new Date().toLocaleDateString('it-IT',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const {data,error}=await sb.from('prospects').select('*').order('created_at',{ascending:false});
  if(error){showToast('Errore connessione database','error');console.error(error);return;}
  prospects=data||[];
  window._allProspects = prospects;
  await loadEventi();
  await loadBenchmarkCustom();
  renderSidebar();
  renderDashboard();
}

init();