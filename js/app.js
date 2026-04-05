// -- STATE -------------------------------------------------
let prospects = [];
let currentId = null;
let editingId = null;
let currentCalls = [];

// -- AUTH --------------------------------------------------
async function logout() {
  const { data: { user } } = await sb.auth.getUser();
  if (user) await sb.from('access_logs').insert({ user_id: user.id, email: user.email, action: 'logout' });
  await sb.auth.signOut();
  window.location.href = '/login.html';
}

// -- INACTIVITY TIMEOUT (3 ore) ----------------------------
(function() {
  const TIMEOUT_MS = 3 * 60 * 60 * 1000;
  let timer;
  function reset() {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      await sb.auth.signOut();
      window.location.href = '/login.html';
    }, TIMEOUT_MS);
  }
  ['mousemove','keydown','click','scroll','touchstart'].forEach(e =>
    document.addEventListener(e, reset, { passive: true })
  );
  reset();
})();

// -- ADMIN -------------------------------------------------
async function renderAdminPanel() {
  // Nascondi tutto e mostra il pannello admin
  document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
  const main = document.querySelector('.main');
  if (!main) return;

  // Carica tutti i profili e i log
  const { data: users, error } = await sb.from('profiles').select('*').order('created_at', { ascending: false });
  if (error) { showToast('Errore caricamento utenti', 'error'); return; }
  const { data: logs } = await sb.from('access_logs').select('*').order('created_at', { ascending: false }).limit(50);

  // Se stiamo visualizzando come un utente, mostra banner
  const viewingAs = window._viewAsUserId;
  const viewingUser = viewingAs ? users.find(u => u.id === viewingAs) : null;

  let html = '<div class="view" id="view-admin" style="display:block;padding:24px">';

  // Banner "stai visualizzando come"
  if (viewingUser) {
    html += '<div class="admin-viewing-banner">' +
      '<span>Stai visualizzando come: <strong>' + (viewingUser.nome || '') + ' ' + (viewingUser.cognome || '') + '</strong> (' + viewingUser.email + ')</span>' +
      '<button onclick="adminExitViewAs()" class="admin-exit-btn">Torna alla vista admin</button>' +
    '</div>';
  }

  html += '<div class="admin-header">' +
    '<div class="admin-header-top">' +
      '<h2 class="admin-title">Gestione Utenti</h2>' +
      '<span class="admin-count">' + users.length + ' utent' + (users.length === 1 ? 'e' : 'i') + '</span>' +
    '</div>' +
    '<div class="admin-search-wrap">' +
      '<input type="text" id="admin-search" class="admin-search" placeholder="Cerca per nome, email o ID..." oninput="adminFilterUsers()">' +
    '</div>' +
  '</div>';

  html += '<div class="admin-users-grid" id="admin-users-grid">';
  users.forEach(function(u) {
    const isCurrentView = viewingAs === u.id;
    const isSelf = u.id === window._currentUserId;
    const nome = (u.nome || '') + ' ' + (u.cognome || '');
    const initials = ((u.nome || '?')[0] + (u.cognome || '?')[0]).toUpperCase();

    var statusTag = '';
    if (u.is_admin) {
      statusTag = '<span class="admin-badge">ADMIN</span>';
    } else if (u.approved) {
      statusTag = '<span class="admin-status-ok">ATTIVO</span>';
    } else {
      statusTag = '<span class="admin-status-pending">IN ATTESA</span>';
    }

    var actionBtns = '';
    if (!isSelf) {
      if (!u.approved) {
        actionBtns = '<div class="admin-user-actions">' +
          '<button class="admin-approve-btn" onclick="event.stopPropagation();adminApprove(\'' + u.id + '\',true)">Approva</button>' +
          '</div>';
      } else if (!u.is_admin) {
        actionBtns = '<div class="admin-user-actions">' +
          '<button class="admin-revoke-btn" onclick="event.stopPropagation();adminApprove(\'' + u.id + '\',false)">Revoca</button>' +
          '</div>';
      }
    }

    html += '<div class="admin-user-card' + (isCurrentView ? ' active' : '') + (isSelf ? ' self' : '') + (!u.approved && !u.is_admin ? ' pending' : '') + '" onclick="adminViewAs(\'' + u.id + '\')" data-search="' + (nome + ' ' + u.email + ' ' + u.id).toLowerCase() + '">' +
      '<div class="admin-user-avatar">' + initials + '</div>' +
      '<div class="admin-user-info">' +
        '<div class="admin-user-name">' + nome.trim() + ' ' + statusTag + '</div>' +
        '<div class="admin-user-email">' + u.email + '</div>' +
        '<div class="admin-user-id">ID: ' + u.id + '</div>' +
        '<div class="admin-user-meta">' +
          (u.telefono ? u.telefono + ' &middot; ' : '') +
          'Registrato il ' + new Date(u.created_at).toLocaleDateString('it-IT', {day:'numeric', month:'long', year:'numeric'}) +
        '</div>' +
      '</div>' +
      actionBtns +
      '<div class="admin-user-arrow">&#8250;</div>' +
    '</div>';
  });
  html += '</div>';

  // Sezione log accessi
  html += '<div style="margin-top:32px">' +
    '<div class="admin-header-top" style="margin-bottom:14px">' +
      '<h2 class="admin-title">Log Accessi</h2>' +
      '<span class="admin-count">ultimi 50</span>' +
    '</div>' +
    '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:12px;overflow:hidden">';

  if (!logs || logs.length === 0) {
    html += '<div style="padding:20px;color:var(--gray);font-size:13px;text-align:center">Nessun accesso registrato</div>';
  } else {
    logs.forEach(function(log) {
      const isLogin = log.action === 'login';
      const color = isLogin ? 'var(--leva-green)' : 'var(--gray)';
      const icon = isLogin ? '↓' : '↑';
      const label = isLogin ? 'Login' : 'Logout';
      const date = new Date(log.created_at).toLocaleString('it-IT', {day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});
      html += '<div style="display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid var(--border);font-size:13px">' +
        '<span style="color:' + color + ';font-weight:700;width:16px;text-align:center">' + icon + '</span>' +
        '<span style="color:' + color + ';font-weight:600;width:52px">' + label + '</span>' +
        '<span style="color:var(--white);flex:1">' + (log.email || '—') + '</span>' +
        '<span style="color:var(--gray);font-size:11px">' + date + '</span>' +
      '</div>';
    });
  }
  html += '</div></div></div>';

  // Rimuovi vecchio pannello admin se esiste
  const old = document.getElementById('view-admin');
  if (old) old.remove();

  main.insertAdjacentHTML('beforeend', html);
}

async function adminApprove(userId, approve) {
  const { error } = await sb.from('profiles').update({ approved: approve }).eq('id', userId);
  if (error) {
    showToast('Errore: ' + error.message, 'error');
    return;
  }
  showToast(approve ? 'Utente approvato' : 'Accesso revocato');
  renderAdminPanel();
}

function adminFilterUsers() {
  const q = (document.getElementById('admin-search')?.value || '').toLowerCase().trim();
  document.querySelectorAll('.admin-user-card').forEach(function(card) {
    const match = !q || (card.dataset.search || '').includes(q);
    card.style.display = match ? '' : 'none';
  });
}

async function adminViewAs(userId) {
  if (userId === window._currentUserId && !window._viewAsUserId) {
    openProfiloModal();
    return;
  }
  window._viewAsUserId = (userId === window._currentUserId) ? null : userId;

  // Ricarica i dati filtrati per quell'utente
  await _loadProspectsData();
  await loadEventi();
  await loadBenchmarkCustom();
  renderSidebar();

  if (window._viewAsUserId) {
    // Mostra la dashboard del CSO selezionato
    renderDashboard();
    showToast('Visualizzazione come utente selezionato');
  } else {
    renderDashboard();
    showToast('Tornato alla tua vista');
  }
}

async function adminExitViewAs() {
  window._viewAsUserId = null;
  await _loadProspectsData();
  await loadEventi();
  await loadBenchmarkCustom();
  renderSidebar();
  renderAdminPanel();
}

// -- UTILS -------------------------------------------------

// Controlla se gli obiettivi sono REALMENTE raggiunti (con sessioni fatte, non solo diagnosi = target)
function _isAllTargetsReached(p) {
  var DIMS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  var targets = p.targets || {};
  var dims = p.dims || {};
  var sc = p.step_completamenti || {};

  // Trova le dimensioni con target attivo (target > 1)
  var dimsConTarget = DIMS.filter(function(id) { return (targets[id] || 0) > 1; });
  if (dimsConTarget.length === 0) return false;

  // Tutte le dimensioni con target devono avere dims >= target
  var tuttiAlLivello = dimsConTarget.every(function(id) { return (dims[id] || 0) >= targets[id]; });
  if (!tuttiAlLivello) return false;

  // Per OGNI dimensione con target, devono esserci step_completamenti che coprono fino al target
  var tuttiCompletati = dimsConTarget.every(function(id) {
    var dimSc = sc[id];
    if (!dimSc || Object.keys(dimSc).length === 0) return false;
    // Lo step del target deve essere registrato nei completamenti
    return dimSc[String(targets[id])] != null;
  });

  return tuttiCompletati;
}

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

function dimColor(v) {
  if (v >= 4) return 'rgba(0,130,95,0.85)';
  if (v >= 2) return 'rgba(175,125,0,0.85)';
  return '#E53935';
}

function scoreColor(s) {
  if(s>=70) return {text:'rgba(0,130,95,0.9)',bg:'rgba(0,130,95,0.1)',border:'rgba(0,130,95,0.35)',label:'Buona base'};
  if(s>=45) return {text:'rgba(175,125,0,0.9)',bg:'rgba(175,125,0,0.1)',border:'rgba(175,125,0,0.35)',label:'Da sviluppare'};
  return {text:'#E53935',bg:'rgba(229,57,53,0.1)',border:'rgba(229,57,53,0.4)',label:'Critica'};
}

function showDimPopup(e, label, desc, col) {
  let popup = document.getElementById('dim-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'dim-popup';
    document.body.appendChild(popup);
  }
  popup.innerHTML = `<div class="dp-label" style="color:${col}">${label}</div><div class="dp-desc">${desc}</div>`;
  popup.style.display = 'block';
  popup.style.position = 'fixed';
  popup.style.zIndex = '9999';
  const rect = e.currentTarget.getBoundingClientRect();
  const popupW = 260;
  let left = rect.left;
  if (left + popupW > window.innerWidth - 12) left = window.innerWidth - popupW - 12;
  if (left < 12) left = 12;
  popup.style.left = left + 'px';
  popup.style.top = (rect.bottom + 6) + 'px';
  e.stopPropagation();
}
document.addEventListener('click', function() {
  const popup = document.getElementById('dim-popup');
  if (popup) popup.style.display = 'none';
});

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
  var DIM_LABELS_S = {vendite:'Sviluppo clienti',pipeline:'Pipeline & CRM',team:'Organizzazione',processi:'Processi & Compliance',ricavi:'Ricavi & Margini',marketing:'Marketing & Domanda',sitoweb:'Sito Web & Presenza',ecommerce:(typeof getDimLabel==='function'?getDimLabel(p.settore,'ecommerce'):'Ecommerce')};
  var oggi = new Date().toISOString().split('T')[0];
  var dimsHtml = DIMS_S.map(function(d) {
    var livelloAttuale = p.dims?.[d] || 1;
    var targetDim = p.targets?.[d] || livelloAttuale;
    var scDim = (p.step_completamenti || {})[d];
    var haCompletamenti = scDim && Object.keys(scDim).length > 0;
    var giaAlTarget = p.targets?.[d] && livelloAttuale >= targetDim && haCompletamenti;
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
  var DIM_LABELS_S = {vendite:'Sviluppo clienti',pipeline:'Pipeline & CRM',team:'Organizzazione',processi:'Processi',ricavi:'Ricavi',marketing:'Marketing',sitoweb:'Sito Web',ecommerce:'Ecommerce'};
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
  var stepCompletamenti = p.step_completamenti || {};
  DIMS_S.forEach(function(d) {
    if (document.getElementById('sess-chk-'+d)?.checked) {
      var nuovoLivello = parseInt(document.getElementById('sess-sel-'+d)?.value);
      if (nuovoLivello && nuovoLivello > (p.dims?.[d] || 1)) {
        var vecchio = p.dims?.[d] || 1;
        newDims[d] = nuovoLivello;
        upgradeEseguiti[d] = { da: vecchio, a: nuovoLivello };
        hasUpgrade = true;
        // Registra data completamento per ogni step intermedio
        if (!stepCompletamenti[d]) stepCompletamenti[d] = {};
        for (var s = vecchio + 1; s <= nuovoLivello; s++) {
          stepCompletamenti[d][String(s)] = data;
        }
      }
    }
  });
  if (hasUpgrade) {
    p.dims = newDims;
    p.step_completamenti = stepCompletamenti;
    await sb.from('prospects').update({ dims: newDims }).eq('id', p.id);
    try { await sb.from('prospects').update({ step_completamenti: stepCompletamenti }).eq('id', p.id); } catch(e) {}
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

function renderGuadagni() {
  var c = document.getElementById('view-guadagni');
  if (!c) return;
  c.innerHTML = '<div style="padding:40px 32px;font-family:\'Plus Jakarta Sans\',sans-serif;">' +
    '<h2 style="font-size:22px;font-weight:700;color:#1a1a2e;margin-bottom:8px;">I miei guadagni</h2>' +
    '<p style="font-size:14px;color:rgba(26,26,46,0.4);margin-bottom:32px;">Riepilogo compensi e fatturato da clienti attivi. Disponibile a breve.</p>' +
    '<div style="background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:14px;padding:48px 32px;text-align:center;color:rgba(26,26,46,0.25);font-size:14px;">' +
    'Funzionalità in arrivo' +
    '</div>' +
  '</div>';
}

function renderRisorse() {
  var c = document.getElementById('view-risorse');
  if (!c) return;
  // Render tabs: Glossario | Listino
  c.innerHTML = '<div style="padding:32px 32px 0;font-family:\'Plus Jakarta Sans\',sans-serif;">' +
    '<h2 style="font-size:22px;font-weight:700;color:#1a1a2e;margin-bottom:20px;">Risorse</h2>' +
    '<div style="display:flex;gap:0;border-bottom:1px solid rgba(0,0,0,0.08);margin-bottom:24px;">' +
      '<button onclick="_risorsaTab(\'glossario\')" id="rtab-glossario" style="background:none;border:none;border-bottom:2px solid #3D5AFE;padding:8px 20px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;font-weight:600;color:#3D5AFE;cursor:pointer;">Glossario</button>' +
      '<button onclick="_risorsaTab(\'listino\')" id="rtab-listino" style="background:none;border:none;border-bottom:2px solid transparent;padding:8px 20px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;font-weight:400;color:rgba(26,26,46,0.4);cursor:pointer;">Listino Servizi</button>' +
    '</div>' +
    '<div id="risorse-body"></div>' +
  '</div>';
  _risorsaTab('glossario');
}

function _risorsaTab(tab) {
  ['glossario','listino'].forEach(function(t) {
    var btn = document.getElementById('rtab-' + t);
    if (!btn) return;
    var active = t === tab;
    btn.style.borderBottomColor = active ? '#3D5AFE' : 'transparent';
    btn.style.color = active ? '#3D5AFE' : 'rgba(26,26,46,0.4)';
    btn.style.fontWeight = active ? '600' : '400';
  });
  var body = document.getElementById('risorse-body');
  if (!body) return;
  if (tab === 'glossario') {
    renderGlossario();
    var src = document.getElementById('view-glossario');
    if (src) body.innerHTML = src.innerHTML;
  } else {
    renderListinoServizi('manifatturiero');
    var src2 = document.getElementById('view-listino');
    if (src2) body.innerHTML = src2.innerHTML;
  }
}

function renderListinoServizi(settore) {
  var sd = typeof STEP_DETAIL_BY_SETTORE !== 'undefined' ? STEP_DETAIL_BY_SETTORE : {};
  var keys = Object.keys(sd).filter(k => !k.startsWith('_'));
  if (!settore && keys.length > 0) settore = keys[0];
  // Render tabs
  var tabsEl = document.getElementById('ls-macro-tabs');
  if (tabsEl) {
    var LABEL_MAP = typeof MARKET !== 'undefined' ? MARKET : {};
    tabsEl.innerHTML = keys.map(function(k) {
      var label = LABEL_MAP[k] ? LABEL_MAP[k].label.split('/')[0].trim() : k.replace(/_/g,' ');
      return '<button class="ls-macro-btn' + (k === settore ? ' active' : '') + '" onclick="lsMacroSwitch(\'' + k + '\',this)">' + label + '</button>';
    }).join('');
  }
  var container = document.getElementById('listino-table-container');
  if (!container) return;
  var data = sd[settore];
  if (!data) { container.innerHTML = '<div style="color:var(--gray);padding:40px;text-align:center">Listino non ancora disponibile per questo micro-mercato.</div>'; return; }
  var DIMS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  var DIM_LABELS_DEFAULT = {vendite:'Vendite',pipeline:'Pipeline & CRM',team:'Team',processi:'Processi',ricavi:'Ricavi & Margini',marketing:'Marketing',sitoweb:'Sito Web',ecommerce:'Ecommerce'};
  var fmtV = function(v) { return v ? v.toLocaleString('it-IT') + '\u20AC' : '\u2014'; };

  // Helper: calcola range costi per uno step con moduli
  function calcStepRange(d) {
    if (!d.moduli || !d.moduli.length) return { minR: d.costo_mensile || 0, maxR: d.costo_mensile || 0, minU: d.costo_setup || 0, maxU: d.costo_setup || 0 };
    var minR = 0, maxR = 0, minU = 0, maxU = 0;
    d.moduli.forEach(function(m) {
      if (m.tipo === 'flag') {
        if (m.obbligatorio) { minR += (m.costo_mensile||0); minU += (m.costo_setup||0); }
        maxR += (m.costo_mensile||0); maxU += (m.costo_setup||0);
      } else if (m.tipo === 'scelta' && m.varianti && m.varianti.length) {
        var costs = m.varianti.map(function(v){return v.costo_mensile||0;});
        var setups = m.varianti.map(function(v){return v.costo_setup||0;});
        if (m.obbligatorio) { minR += Math.min.apply(null, costs); minU += Math.min.apply(null, setups); }
        maxR += Math.max.apply(null, costs); maxU += Math.max.apply(null, setups);
      } else if (m.tipo === 'multi' && m.varianti && m.varianti.length) {
        var minV = m.varianti.map(function(v){return v.costo_mensile||0;});
        var minCost = Math.min.apply(null, minV);
        var maxCost = Math.max.apply(null, minV);
        var mn = m.min || 1;
        if (m.obbligatorio) { minR += minCost * mn; minU += 0; }
        maxR += maxCost * (mn + 2); maxU += 0;
      }
    });
    return { minR: minR, maxR: maxR, minU: minU, maxU: maxU };
  }

  // Helper: render moduli list for a step
  function renderModuliList(d) {
    if (!d.moduli || !d.moduli.length) return '';
    return '<div class="ls-moduli-list">' + d.moduli.map(function(m) {
      var obbTag = m.obbligatorio ? '<span class="ls-mod-obb">richiesto</span>' : '<span class="ls-mod-opt">opzionale</span>';
      var tipoTag = m.tipo === 'flag' ? '' : m.tipo === 'scelta' ? ' <span class="ls-mod-tipo">scelta</span>' : ' <span class="ls-mod-tipo">multi</span>';
      if (m.tipo === 'flag') {
        var costoStr = (m.costo_mensile ? fmtV(m.costo_mensile) + '/mese' : '') + (m.costo_mensile && m.costo_setup ? ' + ' : '') + (m.costo_setup ? fmtV(m.costo_setup) + ' setup' : '');
        return '<div class="ls-mod-item"><div class="ls-mod-head">' + obbTag + ' <span class="ls-mod-nome">' + m.nome + '</span></div>' +
          (costoStr ? '<div class="ls-mod-costo">' + costoStr + '</div>' : '<div class="ls-mod-costo ls-cost-zero">incluso</div>') +
          (m.note ? '<div class="ls-mod-note">' + m.note + '</div>' : '') + '</div>';
      } else {
        var varsHtml = (m.varianti || []).map(function(v) {
          var vc = (v.costo_mensile ? fmtV(v.costo_mensile) + '/mese' : '') + (v.costo_mensile && v.costo_setup ? ' + ' : '') + (v.costo_setup ? fmtV(v.costo_setup) + ' setup' : '');
          return '<div class="ls-var-row"><span class="ls-var-nome">' + v.nome + '</span><span class="ls-var-costo">' + (vc || 'incluso') + '</span></div>';
        }).join('');
        return '<div class="ls-mod-item"><div class="ls-mod-head">' + obbTag + tipoTag + ' <span class="ls-mod-nome">' + m.nome + '</span></div>' +
          '<div class="ls-var-list">' + varsHtml + '</div>' +
          (m.note ? '<div class="ls-mod-note">' + m.note + '</div>' : '') + '</div>';
      }
    }).join('') + '</div>';
  }

  var cards = DIMS.map(function(dim) {
    var dimData = data[dim];
    if (!dimData) return '';
    var dimLabel = dimData._label || DIM_LABELS_DEFAULT[dim] || dim;
    var steps = ['1','2','3','4','5'];
    var stepRows = steps.map(function(s) {
      var d = dimData[s];
      if (!d) return '';
      var hasModuli = d.moduli && d.moduli.length > 0;
      var desc = (d.chi ? d.chi + ' \u2014 ' : '') + (d.cosa || '');

      if (hasModuli) {
        var range = calcStepRange(d);
        var rangeStr = '';
        if (range.minR === range.maxR) {
          rangeStr = fmtV(range.minR) + '/mese';
        } else {
          rangeStr = fmtV(range.minR) + ' \u2013 ' + fmtV(range.maxR) + '/mese';
        }
        return '<div class="ls-step-row ls-step-moduli">' +
          '<div class="ls-step-left">' +
            '<div class="ls-step-badge">Step ' + s + '</div>' +
            '<div class="ls-step-desc">' + desc + '</div>' +
          '</div>' +
          '<div class="ls-step-costs">' +
            '<span class="ls-cost-item"><span class="ls-cost-label">Range mensile</span><span class="ls-cost-val">' + rangeStr + '</span></span>' +
            '<span class="ls-cost-sep">&middot;</span>' +
            '<span class="ls-cost-item"><span class="ls-cost-label">Tempo</span><span class="ls-cost-val">' + (d.tempo_mesi ? d.tempo_mesi + ' mesi' : '\u2014') + '</span></span>' +
          '</div>' +
          renderModuliList(d) +
        '</div>';
      } else {
        return '<div class="ls-step-row">' +
          '<div class="ls-step-left">' +
            '<div class="ls-step-badge">Step ' + s + '</div>' +
            '<div class="ls-step-desc">' + desc + '</div>' +
          '</div>' +
          '<div class="ls-step-costs">' +
            '<span class="ls-cost-item"><span class="ls-cost-label">Mensile</span><span class="ls-cost-val ' + (d.costo_mensile ? '' : 'ls-cost-zero') + '">' + (d.costo_mensile ? fmtV(d.costo_mensile) : '\u2014') + '</span></span>' +
            '<span class="ls-cost-sep">+</span>' +
            '<span class="ls-cost-item"><span class="ls-cost-label">Setup</span><span class="ls-cost-val ' + (d.costo_setup ? '' : 'ls-cost-zero') + '">' + (d.costo_setup ? fmtV(d.costo_setup) : '\u2014') + '</span></span>' +
            '<span class="ls-cost-sep">&middot;</span>' +
            '<span class="ls-cost-item"><span class="ls-cost-label">Tempo</span><span class="ls-cost-val">' + (d.tempo_mesi ? d.tempo_mesi + ' mesi' : '\u2014') + '</span></span>' +
          '</div></div>';
      }
    }).join('');
    return '<div class="ls-card">' +
      '<div class="ls-card-header"><div class="ls-card-title">' + dimLabel + '</div></div>' +
      '<div class="ls-steps">' + stepRows + '</div></div>';
  }).join('');
  container.innerHTML =
    '<div class="ls-grid">' + cards + '</div>' +
    '<div class="ls-footer">Valori al netto IVA \u00B7 I costi variano in base alla configurazione scelta dal cliente</div>';
}

function lsMacroSwitch(settore, btn) {
  document.querySelectorAll('.ls-macro-btn').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  renderListinoServizi(settore);
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
        { termine: 'Investimento mensile', def: 'Costo mensile complessivo del piano, includendo fee di consulenza, strumenti da implementare e attivita da attivare per ogni step. Varia in base alle dimensioni attivate e agli step da completare.', esempio: '3.600/mese comprende la fee del consulente Leva e i costi degli strumenti necessari per gli step in corso.' },
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
          '<option value="fractional"' + (d.pacchetto==='fractional'?' selected':'') + '>Leva \u2014 fee mensile</option>' +
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
  var STATO_COLOR = {bozza:'#4A6180',inviato:'#4E9FE6',accettato:'#00C896',rifiutato:'#E05555'};
  var STATO_LABEL = {bozza:'Bozza',inviato:'Inviato',accettato:'Accettato',rifiutato:'Rifiutato'};

  // Capitolo chiuso (all targets reached) o archivio → blocca preventivi
  var allReached = _isAllTargetsReached(p);
  var capitoloCompletato = allReached && !_isCapitoloReadOnly;

  // Capitolo completato o archivio read-only → preventivi visibili con PDF ma senza creazione/modifica/elimina
  var solaLettura = capitoloCompletato || _isCapitoloReadOnly;

  if (solaLettura) {
    var bannerHtml = capitoloCompletato ? '<div style="text-align:center;padding:20px 16px 16px;border-bottom:1px solid var(--border);margin-bottom:12px">' +
      '<div style="font-size:22px;margin-bottom:6px">\u2705</div>' +
      '<div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:4px">Capitolo completato</div>' +
      '<div style="font-size:11px;color:var(--gray);line-height:1.4">Obiettivi raggiunti. Apri un nuovo capitolo per continuare.</div>' +
    '</div>' : '';

    if (!_preventiviList.length) {
      container.innerHTML = bannerHtml + '<div style="color:var(--gray);font-size:12px;padding:12px 0">Nessun preventivo in questo capitolo.</div>';
    } else {
      container.innerHTML = bannerHtml + _preventiviList.map(function(pv) {
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
            '<button class="btn" onclick="stampaPrev(\'' + pv.id + '\')">Scarica PDF</button>' +
          '</div>' +
        '</div>';
      }).join('');
    }
    return;
  }

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
    fractional: { nome:'Leva', tipo:'Fee mensile', bullet:['1 meeting settimanale online con il cliente (1 ora)','Canale preferenziale diretto via telefono \u2014 disponibilita entro 4 ore lavorative','Presenza operativa nelle call con fornitori, agenzie e collaboratori','Gestione e supervisione diretta delle trattative commerciali per conto del cliente','Referente commerciale esterno verso tutti gli stakeholder interni ed esterni','Supervisione dell\'esecuzione del piano con intervento diretto sulle criticita','Il consulente agisce come Direttore Commerciale part-time a tutti gli effetti'] }
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
  win.document.write('<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"><title>Preventivo \u2014 '+(p.nome||'')+'</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Helvetica Neue,Arial,sans-serif;color:#1a2a3a;background:#fff;font-size:13px;line-height:1.5}.page{max-width:780px;margin:0 auto;padding:48px 52px}.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:36px;padding-bottom:24px;border-bottom:2px solid #0C2340}.logo{display:flex;align-items:center;gap:10px}.logo-bar{width:4px;height:36px;background:#C8A84B;border-radius:2px;flex-shrink:0}.logo-name{font-size:20px;font-weight:700;color:#0C2340;letter-spacing:-.3px}.logo-sub{font-size:9px;color:#8AA4BF;letter-spacing:1.5px;text-transform:uppercase;margin-top:3px}.ref-block{text-align:right;font-size:11px;color:#4A6180;line-height:1.9}.ref-num{font-size:14px;font-weight:700;color:#0C2340;margin-bottom:2px}.hero{background:#0C2340;border-radius:8px;padding:22px 26px;margin-bottom:28px;display:flex;justify-content:space-between;align-items:flex-start;gap:24px}.hero-company{font-size:20px;font-weight:700;color:#fff;margin-bottom:5px}.hero-details{font-size:11px;color:#8AA4BF;line-height:1.8}.hero-contact{text-align:right;font-size:11px;color:#8AA4BF;line-height:1.9}.hero-contact-name{font-size:13px;font-weight:600;color:#C8A84B}.section{margin-bottom:24px;page-break-inside:avoid}.section-title{font-size:9px;font-weight:700;color:#C8A84B;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px;padding-bottom:7px;border-bottom:1px solid #E8EFF7}.svc-card{border:1px solid #E0E8F0;border-radius:8px;overflow:hidden;page-break-inside:avoid}.svc-card-header{background:#F7FAFC;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #E0E8F0}.svc-tipo{font-size:10px;font-weight:700;color:#4A6180;text-transform:uppercase;letter-spacing:.8px}.svc-nome{font-size:16px;font-weight:700;color:#0C2340;margin-top:3px}.svc-price-block{text-align:right}.svc-price{font-size:20px;font-weight:700;color:#0C2340}.svc-price-sub{font-size:10px;color:#8AA4BF;margin-top:2px}.svc-body{padding:16px}.svc-bullet{list-style:none;display:flex;flex-direction:column;gap:7px}.svc-bullet li{display:flex;align-items:flex-start;gap:8px;font-size:12px;color:#2A3A4A;line-height:1.5}.svc-bullet li::before{content:\'\';width:6px;height:6px;border-radius:50%;background:#C8A84B;flex-shrink:0;margin-top:5px}.inv-table{width:100%;border-collapse:collapse;page-break-inside:avoid}.inv-table th{font-size:10px;font-weight:600;color:#4A6180;text-align:left;padding:9px 12px;background:#F7FAFC;border-bottom:2px solid #0C2340}.inv-table th:last-child{text-align:right}.inv-table td{padding:11px 12px;border-bottom:1px solid #F0F4F8;font-size:12px;color:#2A3A4A;vertical-align:top}.inv-table td:last-child{text-align:right;font-weight:600;color:#0C2340;white-space:nowrap}.inv-table tr.subtotal td{background:#F7FAFC;font-size:12px;color:#4A6180}.inv-table tr.total td{background:#0C2340;color:#fff;font-size:14px;font-weight:700;padding:13px 12px}.inv-table tr.total td:last-child{color:#C8A84B}.inv-valore-contratto{background:#FDF6E3;border:1px solid #D4A017;border-radius:6px;padding:12px 16px;margin-top:12px;display:flex;justify-content:space-between;align-items:center;page-break-inside:avoid}.inv-vc-label{font-size:11px;color:#B8860B;font-weight:600;text-transform:uppercase;letter-spacing:.8px}.inv-vc-val{font-size:20px;font-weight:700;color:#B8860B}.cond-list{display:flex;flex-direction:column;gap:10px;page-break-inside:avoid}.cond-item{display:flex;gap:10px;font-size:11px;color:#4A6180;line-height:1.6}.cond-num{font-size:10px;font-weight:700;color:#C8A84B;background:#FDF6E3;border-radius:4px;padding:2px 6px;height:fit-content;flex-shrink:0;margin-top:1px}.cond-item strong{color:#0C2340}.firma-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;page-break-inside:avoid}.firma-box{border:1px solid #D0DCE8;border-radius:8px;padding:20px 18px}.firma-label{font-size:9px;font-weight:700;color:#4A6180;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px}.firma-spazio{height:44px;border-bottom:1px solid #0C2340;margin-bottom:8px}.firma-name{font-size:11px;color:#4A6180}.firma-data{font-size:11px;color:#8AA4BF;margin-top:4px}.validity{background:#F7FAFC;border-left:3px solid #C8A84B;padding:10px 14px;font-size:11px;color:#4A6180;margin-top:16px;line-height:1.6;page-break-inside:avoid}.footer{margin-top:32px;padding-top:14px;border-top:1px solid #E0DAD0;display:flex;justify-content:space-between;font-size:10px;color:#8AA4BF}@page{margin:0;size:A4}@media print{body{padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}.page{padding:32px 40px}.section{page-break-inside:avoid}.svc-card{page-break-inside:avoid}.inv-table{page-break-inside:avoid}.firma-grid{page-break-inside:avoid}.cond-list{page-break-inside:avoid}}</style></head><body><div class="page"><div class="header"><div class="logo"><div class="logo-bar"></div><div><div class="logo-name">Leva</div><div class="logo-sub">Intelligence commerciale per PMI</div></div></div><div class="ref-block"><div class="ref-num">'+numRef+'</div><div>Data: '+fmtDate(d.data)+'</div><div>Scadenza: '+fmtDate(scadenza.toISOString().split('T')[0])+'</div><div style="margin-top:4px">'+(d.consulente||'')+'</div>'+(d.email_consulente?'<div>'+d.email_consulente+'</div>':'')+(d.tel_consulente?'<div>'+d.tel_consulente+'</div>':'')+'</div></div><div class="hero"><div><div class="hero-company">'+(p.nome||'\u2014')+'</div><div class="hero-details">'+(d.indirizzo?d.indirizzo+'<br>':'')+(p.settore?p.settore.replace(/_/g,' '):'')+'</div></div><div class="hero-contact"><div class="hero-contact-name">'+(d.referente||'')+'</div>'+(d.email_cliente?'<div>'+d.email_cliente+'</div>':'')+(d.tel_cliente?'<div>'+d.tel_cliente+'</div>':'')+'</div></div><div class="section"><div class="section-title">Servizio proposto</div><div class="svc-card"><div class="svc-card-header"><div><div class="svc-tipo">'+pkt.tipo+'</div><div class="svc-nome">'+pkt.nome+'</div></div><div class="svc-price-block"><div class="svc-price">'+fmt(d.prezzo)+'</div><div class="svc-price-sub">'+(isDiagnosi?'una tantum':'al mese')+'</div></div></div><div class="svc-body"><ul class="svc-bullet">'+bulletHtml+'</ul></div></div></div><div class="section"><div class="section-title">Piano di investimento</div><table class="inv-table"><thead><tr><th>Voce</th><th>Quantita</th><th>Prezzo unitario</th><th>Totale</th></tr></thead><tbody><tr><td><strong>'+pkt.nome+'</strong></td><td>'+(isDiagnosi?'1':(d.durata_mesi||'\u2014')+' mesi')+'</td><td>'+(isDiagnosi?fmt(d.prezzo):fmt(d.prezzo)+'/mese')+'</td><td>'+(isDiagnosi?fmt(d.prezzo):fmt((d.prezzo||0)*(d.durata_mesi||0)))+'</td></tr>'+(d.una_tantum>0?'<tr><td><strong>Setup e onboarding</strong><br><span style="font-size:11px;color:#4A6180">Attivita di avvio: configurazione strumenti e kick-off operativo</span></td><td>1</td><td>'+fmt(d.una_tantum)+'</td><td>'+fmt(d.una_tantum)+'</td></tr>':'')+(!isDiagnosi?'<tr class="subtotal"><td colspan="3">Subtotale mensile</td><td>'+fmt(d.prezzo)+'/mese</td></tr>':'')+'<tr class="total"><td colspan="3">Totale contratto</td><td>'+fmt(totaleContratto)+'</td></tr></tbody></table>'+(!isDiagnosi?'<div class="inv-valore-contratto"><div><div class="inv-vc-label">Valore totale del contratto</div><div style="font-size:11px;color:#B8860B;margin-top:2px">'+(d.durata_mesi||'\u2014')+' mesi \u00D7 '+fmt(d.prezzo)+'/mese'+(d.una_tantum>0?' + '+fmt(d.una_tantum)+' setup':'')+'</div></div><div class="inv-vc-val">'+fmt(totaleContratto)+'</div></div>':'')+'</div><div class="section"><div class="section-title">Termini e condizioni</div><div class="cond-list"><div class="cond-item"><span class="cond-num">1</span><span><strong>Inizio del mandato.</strong> Il presente accordo entra in vigore dalla data di firma di entrambe le parti. Le attivita operative iniziano entro 7 giorni lavorativi dalla firma.</span></div><div class="cond-item"><span class="cond-num">2</span><span><strong>Pagamento.</strong> La fee mensile e dovuta anticipatamente all\'inizio di ogni mese di mandato. La quota una tantum, se prevista, e dovuta all\'atto della firma. Pagamento tramite bonifico bancario entro 15 giorni dalla fattura.</span></div><div class="cond-item"><span class="cond-num">3</span><span><strong>Durata e rinnovo.</strong> '+(isDiagnosi?'Il presente incarico e una prestazione una tantum senza impegni continuativi successivi.':'Il mandato ha durata di '+(d.durata_mesi||'\u2014')+' mesi dalla data di inizio e si rinnova automaticamente salvo disdetta scritta con preavviso di 30 giorni.')+'</span></div><div class="cond-item"><span class="cond-num">4</span><span><strong>Riservatezza.</strong> Il consulente si impegna a mantenere riservate tutte le informazioni aziendali acquisite durante il mandato, anche successivamente alla sua conclusione.</span></div><div class="cond-item"><span class="cond-num">5</span><span><strong>Proprieta intellettuale.</strong> I piani commerciali, le analisi e i documenti prodotti durante il mandato sono di proprieta del cliente al completamento del pagamento.</span></div></div></div><div class="section"><div class="section-title">Accettazione e firma</div><div class="firma-grid"><div class="firma-box"><div class="firma-label">Il consulente</div><div class="firma-spazio"></div><div class="firma-name">'+(d.consulente||'\u2014')+'</div><div class="firma-data">Data: _______________</div></div><div class="firma-box"><div class="firma-label">Il cliente \u2014 per accettazione</div><div class="firma-spazio"></div><div class="firma-name">'+(d.referente||p.nome||'\u2014')+'</div><div class="firma-data">Data: _______________</div></div></div></div><div class="validity"><strong>Validita:</strong> Il presente preventivo e valido fino al '+fmtDate(scadenza.toISOString().split('T')[0])+' \u00B7 Tutti i prezzi si intendono IVA esclusa \u00B7 Rif. '+numRef+(d.note?'<br><strong>Note:</strong> '+d.note:'')+'</div><div class="footer"><span>Leva \u2014 Intelligence commerciale per PMI</span><span>Generato il '+new Date().toLocaleDateString('it-IT')+'</span></div></div><script>window.onload=function(){setTimeout(function(){window.print()},300)}<\/script></body></html>');
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
// ── CSO Deep Space: sfondo + onde ────────────────────────────────────────────
function _initCSODS() {
  document.body.classList.add('cso-mode');
  document.body.style.background = '#06080F';

  var canvasId = 'leva-waves-cso';
  if (!document.getElementById(canvasId)) {
    var canvas = document.createElement('canvas');
    canvas.id = canvasId;
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.35;';
    document.body.appendChild(canvas);
  }
  if (!window._csoWavesInstance && window.initLevaWaves) {
    window._csoWavesInstance = initLevaWaves(canvasId);
  }
}

function _stopCSODS() {
  document.body.classList.remove('cso-mode');
  document.body.style.background = '';
  if (window._csoWavesInstance) { window._csoWavesInstance.stop(); window._csoWavesInstance = null; }
  var canvas = document.getElementById('leva-waves-cso');
  if (canvas) canvas.remove();
}

function showView(name) {
  _initCSODS();
  // Rimuovi pannello admin se presente
  const adminPanel = document.getElementById('view-admin');
  if (adminPanel) adminPanel.remove();
  document.querySelectorAll('.view').forEach(v=>{v.classList.remove('active'); v.style.display='';});
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
  if(name==='guadagni') renderGuadagni();
  if(name==='risorse') renderRisorse();
}

function openProspect(id) {
  _initCSODS();
  if (currentId !== id) _activeProspectTab = 'panoramica';
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

function _espandiDaFareOggi() {
  var c = document.getElementById('da-fare-oggi-list');
  if (!c || !window._dashAlerts) return;
  c.innerHTML = window._dashAlerts.map(function(a) {
    return '<div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-left:3px solid ' + a.colore + ';border-radius:0 12px 12px 0;padding:14px 16px;margin-bottom:8px;">' +
      '<div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;">' +
        '<div style="width:32px;height:32px;border-radius:50%;background:' + a.colore + '1a;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
          '<div style="width:10px;height:10px;border-radius:50%;background:' + a.colore + ';"></div>' +
        '</div>' +
        '<div style="min-width:0;">' +
          '<div style="font-size:13px;font-weight:600;color:#1a1a2e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + a.testo + '</div>' +
          '<div style="font-size:12px;color:rgba(26,26,46,0.4);margin-top:2px;">' + a.dettaglio + '</div>' +
        '</div>' +
      '</div>' +
      '<button onclick="' + a.btnAction + '" style="flex-shrink:0;margin-left:16px;font-size:12px;padding:6px 14px;border-radius:8px;background:' + a.colore + '14;color:' + a.colore + ';border:none;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;font-weight:500;white-space:nowrap;" onmouseover="this.style.background=\'' + a.colore + '26\'" onmouseout="this.style.background=\'' + a.colore + '14\'">' + a.btnLabel + '</button>' +
    '</div>';
  }).join('');
}

async function reinviaInvito(prospectId) {
  try {
    var res = await fetch('/api/invite', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ prospect_id: prospectId }) });
    if (res.ok) { showToast('Invito reinviato'); }
    else { showToast('Errore reinvio invito'); }
  } catch(e) { showToast('Errore reinvio invito'); }
}

// -- DASHBOARD ---------------------------------------------
async function renderDashboard() {
  // Saluto personalizzato
  (function() {
    var profile = window._currentProfile;
    var nome = (profile && (profile.nome || profile.nome_completo)) || '';
    if (!nome && profile) nome = (profile.email || '').split('@')[0];
    var ora = new Date().getHours();
    var saluto = ora < 13 ? 'Buongiorno' : ora < 18 ? 'Buon pomeriggio' : 'Buonasera';
    var h1 = document.querySelector('#view-dashboard .dash-header h1');
    if (h1) h1.textContent = nome ? saluto + ', ' + nome.split(' ')[0] : saluto;
  })();

  var attivi    = prospects.filter(function(p){ return p.stato === 'attivo'; });
  var inAttesa  = prospects.filter(function(p){ return p.stato === 'in_attesa' || p.stato === 'ingaggiato' || p.stato === 'in_diagnosi' || p.stato === 'pending_confirmation'; });
  var archiviati= prospects.filter(function(p){ return p.stato === 'archiviato' || p.stato === 'chiuso'; });

  var fatTotale = 0, fatPotenziale = 0, scoreMedia = 0, conFatturato = 0;
  attivi.forEach(function(p) {
    if (p.fatturato_anno_1) { fatTotale += p.fatturato_anno_1; conFatturato++; }
    var ic = _calcolaImpattoCumulativo(p);
    if (ic && ic.fat12) fatPotenziale += ic.fat12[1] - (p.fatturato_anno_1 || 0);
    scoreMedia += calcScore(p);
  });
  scoreMedia = attivi.length > 0 ? Math.round(scoreMedia / attivi.length) : 0;
  var fmtK = function(v) { return v >= 1000000 ? (v/1000000).toFixed(1) + 'M' : Math.round(v/1000) + 'k'; };

  var kpiBorderStyle = 'border-radius:0 14px 14px 0;';
  document.getElementById('kpi-grid').innerHTML = [
    { label: 'Clienti attivi',  val: attivi.length,     filter: 'attivo',    border: '#00825F' },
    { label: 'In attesa/onboarding', val: inAttesa.length, filter: 'in_attesa', border: '#AF7D00' },
    { label: 'Archiviati',      val: archiviati.length, filter: 'archiviato',border: 'rgba(26,26,46,0.3)' },
    { label: 'Score medio',     val: scoreMedia + '/100',filter: 'attivo',   border: '#7B61FF' },
  ].map(k => `<div class="kpi-card" onclick="showView('prospects');setProspectFilter('${k.filter}')" style="cursor:pointer;border-left:3px solid ${k.border};${kpiBorderStyle}" title="Clicca per filtrare">
    <div class="kpi-label">${k.label}</div>
    <div class="kpi-val">${k.val}</div>
  </div>`).join('') +
  '<div style="grid-column:1/-1;display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:14px">' +
    '<div class="kpi-card" style="border-left:3px solid #3D5AFE;'+kpiBorderStyle+'"><div class="kpi-label">Fatturato gestito</div><div class="kpi-val" style="font-size:22px">' + fmtK(fatTotale) + '\u20AC</div><div class="kpi-sub">' + conFatturato + ' clienti attivi con fatturato</div></div>' +
    '<div class="kpi-card" style="border-left:3px solid rgba(0,130,95,0.85);'+kpiBorderStyle+'"><div class="kpi-label">Potenziale crescita 12m</div><div class="kpi-val tl-green" style="font-size:22px">+' + fmtK(fatPotenziale) + '\u20AC</div><div class="kpi-sub">proiezioni clienti attivi</div></div>' +
    '<div class="kpi-card" style="border-left:3px solid rgba(175,125,0,0.85);'+kpiBorderStyle+'"><div class="kpi-label">Tot. clienti</div><div class="kpi-val" style="font-size:22px">' + prospects.length + '</div><div class="kpi-sub">inclusi archiviati</div></div>' +
    '<div class="kpi-card" style="border-left:3px solid #FF6B2B;'+kpiBorderStyle+'"><div class="kpi-label">Tasso attivazione</div><div class="kpi-val" style="font-size:22px">' + (prospects.length > 0 ? Math.round(attivi.length / prospects.length * 100) : 0) + '%</div><div class="kpi-sub">attivi / totali</div></div>' +
  '</div>';

  // Alert scadenze in avvicinamento
  var alertHtml = '';
  var scadenze = [];
  prospects.forEach(function(p) {
    if (!p.target_scadenze || !p.targets) return;
    var DIMS_IDS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
    DIMS_IDS.forEach(function(dimId) {
      var scad = p.target_scadenze[dimId];
      var tgt = p.targets[dimId] || 0;
      var cur = (p.dims && p.dims[dimId]) || 0;
      if (!scad || tgt <= cur) return;
      var giorni = Math.round((new Date(scad) - new Date()) / 86400000);
      if (giorni <= 30) scadenze.push({ nome: p.nome, id: p.id, dim: getDimLabel(p.settore, dimId), giorni: giorni, scaduto: giorni < 0 });

      // Milestone intermedie
      var dimMilestones = (p.target_milestones || {})[dimId] || {};
      var sc = (p.step_completamenti || {})[dimId] || {};
      Object.keys(dimMilestones).forEach(function(step) {
        if (sc[step]) return; // step già completato
        if (parseInt(step) <= cur) return;
        var gm = Math.round((new Date(dimMilestones[step]) - new Date()) / 86400000);
        if (gm <= 30) scadenze.push({ nome: p.nome, id: p.id, dim: getDimLabel(p.settore, dimId) + ' step ' + step, giorni: gm, scaduto: gm < 0 });
      });
    });
  });
  scadenze.sort(function(a,b) { return a.giorni - b.giorni; });
  if (scadenze.length > 0) {
    alertHtml = '<div style="margin-bottom:16px;padding:12px 16px;background:rgba(229,57,53,0.06);border:1px solid rgba(229,57,53,0.15);border-radius:12px">' +
      '<div style="font-size:11px;font-weight:700;color:rgba(229,57,53,0.8);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px">\u26A0 Scadenze in avvicinamento (' + scadenze.length + ')</div>' +
      scadenze.slice(0, 5).map(function(s) {
        var col = s.scaduto ? 'rgba(229,57,53,0.8)' : s.giorni <= 7 ? 'rgba(229,57,53,0.7)' : 'rgba(61,90,254,0.7)';
        var label = s.scaduto ? 'Scaduto' : s.giorni + ' giorni';
        return '<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;cursor:pointer" onclick="openProspect(\'' + s.id + '\')">' +
          '<div style="font-size:12px;color:var(--text)"><strong>' + s.nome + '</strong> \u00B7 ' + s.dim + '</div>' +
          '<div style="font-size:11px;font-weight:600;color:' + col + '">' + label + '</div>' +
        '</div>';
      }).join('') +
    '</div>';
  }
  var alertContainer = document.getElementById('alert-scadenze');
  if (alertContainer) alertContainer.innerHTML = alertHtml;

  // ── SEZIONE: I MIEI GUADAGNI ──────────────────────────────
  var attiviBase = attivi.filter(function(p){ return p.piano === 'guided_base'; });
  var attiviPro  = attivi.filter(function(p){ return p.piano === 'guided_pro'; });
  var guadagnoMensile = (attiviBase.length * 200) + (attiviPro.length * 320);
  var guadagnoAnnuo   = guadagnoMensile * 12;

  // Calls questo mese — conteggio asincrono con fallback a 0
  var callsQuest = 0;
  try {
    var prospectIds = prospects.map(function(p){ return p.id; });
    if (prospectIds.length > 0) {
      var meseStart = new Date(); meseStart.setDate(1); meseStart.setHours(0,0,0,0);
      var meseEnd   = new Date(); meseEnd.setMonth(meseEnd.getMonth()+1,0); meseEnd.setHours(23,59,59,999);
      var { data: callsRows } = await sb.from('calls').select('id')
        .in('prospect_id', prospectIds)
        .gte('data', meseStart.toISOString().split('T')[0])
        .lte('data', meseEnd.toISOString().split('T')[0]);
      callsQuest = (callsRows || []).length;
    }
  } catch(e) {}

  var fmtEur = function(v){ return '\u20AC' + v.toLocaleString('it-IT'); };
  var sectionLabel = 'font-size:13px;color:rgba(26,26,46,0.35);text-transform:uppercase;letter-spacing:1px;font-weight:600;margin:24px 0 10px;font-family:\'Plus Jakarta Sans\',sans-serif;';
  var kpiGreen = 'border-radius:0 14px 14px 0;border-left:3px solid #00825F;';
  var gContainer = document.getElementById('guadagni-dashboard');
  if (gContainer) {
    gContainer.innerHTML =
      '<div style="' + sectionLabel + '">I miei guadagni</div>' +
      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:24px;">' +
        '<div class="kpi-card" style="' + kpiGreen + '">' +
          '<div class="kpi-label">Guadagno mensile</div>' +
          '<div class="kpi-val" style="font-size:28px;color:#00825F;">' + fmtEur(guadagnoMensile) + '</div>' +
          '<div class="kpi-sub">' + attiviBase.length + ' Base \xd7 \u20AC200 + ' + attiviPro.length + ' Pro \xd7 \u20AC320</div>' +
        '</div>' +
        '<div class="kpi-card" style="border-radius:0 14px 14px 0;border-left:3px solid rgba(0,130,95,0.6);">' +
          '<div class="kpi-label">Guadagno annuo proiettato</div>' +
          '<div class="kpi-val" style="font-size:28px;color:#00825F;">' + fmtEur(guadagnoAnnuo) + '</div>' +
          '<div class="kpi-sub">mensile \xd7 12</div>' +
        '</div>' +
        '<div class="kpi-card" style="border-radius:0 14px 14px 0;border-left:3px solid #7B61FF;">' +
          '<div class="kpi-label">Call questo mese</div>' +
          '<div class="kpi-val" style="font-size:28px;color:#7B61FF;">' + callsQuest + ' call</div>' +
          '<div class="kpi-sub" style="color:#7B61FF;">' + fmtEur(callsQuest * 90) + ' di consulenza</div>' +
        '</div>' +
      '</div>';
  }

  // ── SEZIONE: DA FARE OGGI ─────────────────────────────────
  var oggiStr = new Date().toISOString().split('T')[0];
  var domaniStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  var oggiMs  = Date.now();
  var alerts  = [];

  // Alert 1 — ROSSO: cliente attivo non aggiornato da 14+ giorni
  attivi.forEach(function(p) {
    var updatedAt = p.updated_at || p.created_at;
    if (!updatedAt) return;
    var giorni = Math.round((oggiMs - new Date(updatedAt)) / 86400000);
    if (giorni >= 14) {
      alerts.push({
        tipo: 1, colore: '#E53935', urgenza: 1,
        testo: (p.nome || p.azienda || '—') + ' \u2014 inattivo da ' + giorni + ' giorni',
        dettaglio: 'Ultimo aggiornamento: ' + new Date(updatedAt).toLocaleDateString('it-IT') + '. Rischio churn.',
        btnLabel: 'Programma call',
        btnAction: 'showView(\'calendario\')',
        id: p.id
      });
    }
  });

  // Alert 2 — ARANCIONE: in_attesa da 7+ giorni
  prospects.filter(function(p){ return p.stato === 'in_attesa'; }).forEach(function(p) {
    var ref = p.invite_sent_at || p.created_at;
    if (!ref) return;
    var giorni = Math.round((oggiMs - new Date(ref)) / 86400000);
    if (giorni >= 7) {
      alerts.push({
        tipo: 2, colore: '#FF6B2B', urgenza: 2,
        testo: (p.nome || p.azienda || '—') + ' \u2014 invito non confermato da ' + giorni + ' giorni',
        dettaglio: 'Email inviata il ' + new Date(ref).toLocaleDateString('it-IT') + '. Considera un sollecito.',
        btnLabel: 'Reinvia invito',
        btnAction: 'reinviaInvito(\'' + p.id + '\')',
        id: p.id
      });
    }
  });

  // Alert 3 — BLU: call in programma oggi o domani
  allEventi.filter(function(e){ return e.data === oggiStr || e.data === domaniStr; }).forEach(function(e) {
    var quando = e.data === oggiStr ? 'oggi' : 'domani';
    var ora    = e.ora || '';
    var pNome  = (e.prospects && e.prospects.nome) || e.nome_custom || '—';
    var pObj   = prospects.find(function(p){ return p.id === e.prospect_id; });
    var score  = pObj ? calcScore(pObj) : '—';
    var piano  = pObj && pObj.piano === 'guided_pro' ? 'Pro' : pObj && pObj.piano === 'guided_base' ? 'Base' : '—';
    alerts.push({
      tipo: 3, colore: '#3D5AFE', urgenza: 3,
      testo: 'Call con ' + pNome + ' \u2014 ' + quando + (ora ? ' alle ' + ora : ''),
      dettaglio: 'Piano: ' + piano + '. Score attuale: ' + score + '/100',
      btnLabel: 'Vedi scheda',
      btnAction: e.prospect_id ? 'openProspect(\'' + e.prospect_id + '\')' : 'showView(\'calendario\')',
      id: e.id
    });
  });

  // Alert 4 — VERDE: Base con score ≥ 70 (candidato upgrade)
  attiviBase.filter(function(p){ return calcScore(p) >= 70; }).forEach(function(p) {
    var score = calcScore(p);
    alerts.push({
      tipo: 4, colore: '#00825F', urgenza: 4,
      testo: (p.nome || p.azienda || '—') + ' \u2014 score ' + score + '/100 \u2014 pronto per upgrade',
      dettaglio: 'Considera proposta upgrade a Pro per massimizzare il potenziale.',
      btnLabel: 'Vedi trend',
      btnAction: 'openProspect(\'' + p.id + '\')',
      id: p.id
    });
  });

  // Alert 5 — VIOLA: attivo da 90+ giorni (ri-diagnosi)
  attivi.forEach(function(p) {
    var ref = p.created_at;
    if (!ref) return;
    var giorni = Math.round((oggiMs - new Date(ref)) / 86400000);
    if (giorni >= 90) {
      alerts.push({
        tipo: 5, colore: '#7B61FF', urgenza: 5,
        testo: (p.nome || p.azienda || '—') + ' \u2014 ri-diagnosi disponibile',
        dettaglio: 'Attivo dal ' + new Date(ref).toLocaleDateString('it-IT') + '. Sono passati ' + giorni + ' giorni.',
        btnLabel: 'Avvia ri-diagnosi',
        btnAction: 'openProspect(\'' + p.id + '\')',
        id: p.id
      });
    }
  });

  // Ordina per urgenza
  alerts.sort(function(a, b){ return a.urgenza - b.urgenza; });

  var dContainer = document.getElementById('da-fare-oggi');
  if (dContainer) {
    var alertCardHtml = '';
    var visible = alerts.slice(0, 5);
    var extra   = alerts.length - 5;
    if (visible.length === 0) {
      alertCardHtml = '<div style="text-align:center;padding:28px;color:rgba(26,26,46,0.35);font-size:14px;background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:12px;">' +
        '<div style="font-size:28px;margin-bottom:8px;">✓</div>' +
        'Tutto in ordine! Nessuna azione urgente per oggi.' +
        '</div>';
    } else {
      alertCardHtml = visible.map(function(a) {
        return '<div style="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-left:3px solid ' + a.colore + ';border-radius:0 12px 12px 0;padding:14px 16px;margin-bottom:8px;">' +
          '<div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;">' +
            '<div style="width:32px;height:32px;border-radius:50%;background:' + a.colore + '1a;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
              '<div style="width:10px;height:10px;border-radius:50%;background:' + a.colore + ';"></div>' +
            '</div>' +
            '<div style="min-width:0;">' +
              '<div style="font-size:13px;font-weight:600;color:#1a1a2e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + a.testo + '</div>' +
              '<div style="font-size:12px;color:rgba(26,26,46,0.4);margin-top:2px;">' + a.dettaglio + '</div>' +
            '</div>' +
          '</div>' +
          '<button onclick="' + a.btnAction + '" style="flex-shrink:0;margin-left:16px;font-size:12px;padding:6px 14px;border-radius:8px;background:' + a.colore + '14;color:' + a.colore + ';border:none;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;font-weight:500;white-space:nowrap;" onmouseover="this.style.background=\'' + a.colore + '26\'" onmouseout="this.style.background=\'' + a.colore + '14\'">' + a.btnLabel + '</button>' +
        '</div>';
      }).join('');
      if (extra > 0) {
        alertCardHtml += '<div onclick="_espandiDaFareOggi()" style="text-align:center;padding:10px;font-size:12px;color:rgba(26,26,46,0.4);cursor:pointer;font-weight:500;">Vedi tutti (' + alerts.length + ') \u25be</div>';
      }
    }
    dContainer.innerHTML =
      '<div style="' + sectionLabel + '">Da fare oggi</div>' +
      '<div id="da-fare-oggi-list">' + alertCardHtml + '</div>';
  }

  window._dashAlerts = alerts;

  const allCols=['in_attesa','ingaggiato','in_diagnosi','attivo','archiviato'];

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

  // Sezione "Richiede Attenzione"
  var oggi = new Date();
  var problematici = prospects.filter(function(p) {
    if (p.stato === 'archiviato' || p.stato === 'chiuso') return false;
    // Score critico
    var s = calcScore(p);
    if (s < 30 && s > 0) return true;
    // Nessuna interazione da 30+ giorni in stato "in_attesa"
    if (p.stato === 'in_attesa' || p.stato === 'pending_confirmation') {
      var created = p.created_at ? new Date(p.created_at) : null;
      if (created && (oggi - created) / 86400000 > 30) return true;
    }
    // Score in calo (score_history)
    if (p.score_history && p.score_history.length >= 2) {
      var last = p.score_history[p.score_history.length - 1];
      var prev = p.score_history[p.score_history.length - 2];
      if (last && prev && (last.score || 0) < (prev.score || 0) - 10) return true;
    }
    return false;
  });

  var attContainer = document.getElementById('richiede-attenzione');
  if (attContainer) {
    if (problematici.length === 0) {
      attContainer.innerHTML = '';
    } else {
      attContainer.innerHTML = '<div class="section-title" style="margin-top:24px;margin-bottom:12px">\u26A0 Richiede attenzione (' + problematici.length + ')</div>' +
        '<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:24px">' +
        problematici.map(function(p) {
          var s = calcScore(p);
          var motivo = s < 30 && s > 0 ? 'Score critico: ' + s + '/100' :
            p.stato === 'nuovo' ? 'Nessuna interazione da ' + Math.floor((oggi - new Date(p.created_at)) / 86400000) + ' giorni' :
            'Score in calo';
          return '<div onclick="openProspect(\'' + p.id + '\')" style="cursor:pointer;background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-left:3px solid #E53935;border-radius:0 12px 12px 0;padding:12px 16px;display:flex;align-items:center;justify-content:space-between">' +
            '<div>' +
              '<div style="font-size:13px;font-weight:600;color:#1a1a2e">' + p.nome + '</div>' +
              '<div style="font-size:11px;color:rgba(26,26,46,0.5);margin-top:2px">' + (p.settore || '--') + '</div>' +
            '</div>' +
            '<div style="font-size:12px;font-weight:600;color:#E53935">' + motivo + '</div>' +
          '</div>';
        }).join('') +
        '</div>';
    }
  }
}

// -- SEZIONE PROSPECT --------------------------------------
let _prospectFilter = 'tutti';
let _prospectSearch = '';
let _prospectSort = 'score';
let _csoFilterPiano = 'tutti';

function setProspectFilter(filter) {
  _prospectFilter = filter;
  renderProspects();
}

function setPianoFilter(piano) {
  _csoFilterPiano = piano;
  renderProspects();
}

function _pianoBadge(piano) {
  if (piano === 'guided_pro')  return '<span style="display:inline-block;font-size:10px;padding:2px 9px;border-radius:8px;background:rgba(255,107,43,0.10);color:#FF6B2B;font-weight:600;margin-left:6px;vertical-align:middle;line-height:1.4">Pro</span>';
  if (piano === 'guided_base') return '<span style="display:inline-block;font-size:10px;padding:2px 9px;border-radius:8px;background:rgba(61,90,254,0.09);color:#3D5AFE;font-weight:600;margin-left:6px;vertical-align:middle;line-height:1.4">Base</span>';
  return '<span style="display:inline-block;font-size:10px;padding:2px 9px;border-radius:8px;background:rgba(26,26,46,0.07);color:rgba(26,26,46,0.45);font-weight:600;margin-left:6px;vertical-align:middle;line-height:1.4">Self</span>';
}

function renderProspectsView() { renderProspects(); }

// ── MODALE NUOVO CLIENTE ─────────────────────────────────────

function apriModaleNuovoCliente() {
  var existing = document.getElementById('cso-modal-overlay');
  if (existing) existing.remove();

  var IS = 'width:100%;background:rgba(255,255,255,0.6);border:1px solid rgba(26,26,46,0.1);border-radius:10px;padding:12px 14px;font-size:14px;color:#1a1a2e;font-family:\'Plus Jakarta Sans\',sans-serif;box-sizing:border-box;outline:none;transition:border-color .15s;';
  var LS = 'display:block;font-size:12px;color:rgba(26,26,46,0.4);margin-bottom:4px;margin-top:14px;';

  var overlay = document.createElement('div');
  overlay.id = 'cso-modal-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.35);z-index:9000;display:flex;align-items:center;justify-content:center;overflow-y:auto;padding:20px 0;box-sizing:border-box;';

  var box = document.createElement('div');
  box.id = 'cso-modal-box';
  box.style.cssText = 'width:520px;max-width:90vw;background:rgba(255,255,255,0.92);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.8);border-radius:20px;padding:28px;box-shadow:0 8px 32px rgba(0,0,0,0.12);transform:scale(0.95);opacity:0;transition:transform 200ms ease-out,opacity 200ms ease-out;';

  box.innerHTML =
    '<div style="font-size:20px;font-weight:600;color:#1a1a2e;margin-bottom:4px;">Registra nuovo cliente</div>' +
    '<div style="font-size:12px;color:rgba(26,26,46,0.4);margin-bottom:20px;">Il cliente riceverà un\'email per completare la registrazione.</div>' +

    // Nome + Cognome
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">' +
      '<div><label style="' + LS + 'margin-top:0;">Nome</label><input id="nc-nome" type="text" autocomplete="given-name" style="' + IS + '" oninput="_ncValidate()" onfocus="this.style.borderColor=\'rgba(61,90,254,0.4)\'" onblur="this.style.borderColor=\'rgba(26,26,46,0.1)\'"></div>' +
      '<div><label style="' + LS + 'margin-top:0;">Cognome</label><input id="nc-cognome" type="text" autocomplete="family-name" style="' + IS + '" oninput="_ncValidate()" onfocus="this.style.borderColor=\'rgba(61,90,254,0.4)\'" onblur="this.style.borderColor=\'rgba(26,26,46,0.1)\'"></div>' +
    '</div>' +

    // Azienda
    '<label style="' + LS + '">Nome azienda</label>' +
    '<input id="nc-azienda" type="text" autocomplete="organization" style="' + IS + '" oninput="_ncValidate()" onfocus="this.style.borderColor=\'rgba(61,90,254,0.4)\'" onblur="this.style.borderColor=\'rgba(26,26,46,0.1)\'">' +

    // P.IVA
    '<label style="' + LS + '">P.IVA</label>' +
    '<input id="nc-piva" type="text" placeholder="IT01234567890" style="' + IS + '" oninput="_ncValidate()" onfocus="this.style.borderColor=\'rgba(61,90,254,0.4)\'" onblur="this.style.borderColor=\'rgba(26,26,46,0.1)\'">' +

    // Telefono + Email
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">' +
      '<div><label style="' + LS + '">Telefono</label><input id="nc-tel" type="tel" placeholder="+39 333 1234567" autocomplete="tel" style="' + IS + '" oninput="_ncValidate()" onfocus="this.style.borderColor=\'rgba(61,90,254,0.4)\'" onblur="this.style.borderColor=\'rgba(26,26,46,0.1)\'"></div>' +
      '<div><label style="' + LS + '">Email</label><input id="nc-email" type="email" placeholder="titolare@azienda.it" autocomplete="email" style="' + IS + '" oninput="_ncValidate()" onfocus="this.style.borderColor=\'rgba(61,90,254,0.4)\'" onblur="this.style.borderColor=\'rgba(26,26,46,0.1)\'"></div>' +
    '</div>' +

    // Pacchetto
    '<label style="' + LS + '">Pacchetto</label>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">' +
      '<div id="nc-card-base" onclick="_ncSelPiano(\'guided_base\')" style="border:2px solid rgba(26,26,46,0.08);border-radius:12px;padding:14px;cursor:pointer;transition:all .15s;display:flex;align-items:flex-start;gap:10px;">' +
        '<div id="nc-radio-base" style="width:16px;height:16px;border-radius:50%;border:2px solid rgba(26,26,46,0.2);flex-shrink:0;margin-top:2px;transition:all .15s;"></div>' +
        '<div><div style="font-size:15px;font-weight:600;color:#3D5AFE;">Guided Base</div>' +
        '<div style="font-size:12px;color:rgba(61,90,254,0.5);margin-top:2px;">€399/mese</div>' +
        '<div style="font-size:11px;color:rgba(26,26,46,0.35);margin-top:4px;">1 call/mese + piano condiviso</div></div>' +
      '</div>' +
      '<div id="nc-card-pro" onclick="_ncSelPiano(\'guided_pro\')" style="border:2px solid rgba(26,26,46,0.08);border-radius:12px;padding:14px;cursor:pointer;transition:all .15s;display:flex;align-items:flex-start;gap:10px;">' +
        '<div id="nc-radio-pro" style="width:16px;height:16px;border-radius:50%;border:2px solid rgba(26,26,46,0.2);flex-shrink:0;margin-top:2px;transition:all .15s;"></div>' +
        '<div><div style="font-size:15px;font-weight:600;color:#FF6B2B;">Guided Pro</div>' +
        '<div style="font-size:12px;color:rgba(255,107,43,0.5);margin-top:2px;">€599/mese</div>' +
        '<div style="font-size:11px;color:rgba(26,26,46,0.35);margin-top:4px;">Report + what-if + benchmark + call illimitate</div></div>' +
      '</div>' +
    '</div>' +

    // Bottoni
    '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:24px;">' +
      '<button onclick="_chiudiModaleCSO()" style="background:transparent;border:1px solid rgba(26,26,46,0.12);color:rgba(26,26,46,0.5);border-radius:10px;padding:10px 24px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;cursor:pointer;">Annulla</button>' +
      '<button id="nc-submit" onclick="inviaInvitoNuovoCliente()" disabled style="background:#3D5AFE;color:white;border:none;border-radius:10px;padding:10px 24px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;font-weight:500;cursor:default;opacity:0.4;transition:opacity .15s;">Invia invito</button>' +
    '</div>';

  overlay.appendChild(box);
  document.body.appendChild(overlay);
  overlay._selectedPiano = null;

  overlay.addEventListener('click', function(e) { if (e.target === overlay) _chiudiModaleCSO(); });
  overlay._escHandler = function(e) { if (e.key === 'Escape') _chiudiModaleCSO(); };
  document.addEventListener('keydown', overlay._escHandler);

  requestAnimationFrame(function() {
    requestAnimationFrame(function() { box.style.transform = 'scale(1)'; box.style.opacity = '1'; });
  });
  setTimeout(function() { var el = document.getElementById('nc-nome'); if (el) el.focus(); }, 60);
}

function _ncSelPiano(piano) {
  var overlay = document.getElementById('cso-modal-overlay');
  if (!overlay) return;
  overlay._selectedPiano = piano;

  var cardBase  = document.getElementById('nc-card-base');
  var cardPro   = document.getElementById('nc-card-pro');
  var radioBase = document.getElementById('nc-radio-base');
  var radioPro  = document.getElementById('nc-radio-pro');

  if (cardBase && cardPro && radioBase && radioPro) {
    if (piano === 'guided_base') {
      cardBase.style.border  = '2px solid #3D5AFE';
      cardBase.style.background = 'rgba(61,90,254,0.04)';
      cardPro.style.border   = '2px solid rgba(26,26,46,0.08)';
      cardPro.style.background  = 'transparent';
      radioBase.style.background = '#3D5AFE';
      radioBase.style.border     = '2px solid #3D5AFE';
      radioPro.style.background  = 'transparent';
      radioPro.style.border      = '2px solid rgba(26,26,46,0.2)';
    } else {
      cardPro.style.border   = '2px solid #FF6B2B';
      cardPro.style.background  = 'rgba(255,107,43,0.04)';
      cardBase.style.border  = '2px solid rgba(26,26,46,0.08)';
      cardBase.style.background = 'transparent';
      radioPro.style.background  = '#FF6B2B';
      radioPro.style.border      = '2px solid #FF6B2B';
      radioBase.style.background = 'transparent';
      radioBase.style.border     = '2px solid rgba(26,26,46,0.2)';
    }
  }
  _ncValidate();
}

function _ncValidate() {
  var overlay = document.getElementById('cso-modal-overlay');
  var btn     = document.getElementById('nc-submit');
  if (!btn || !overlay) return;
  var ok = overlay._selectedPiano &&
    (document.getElementById('nc-nome')?.value.trim()) &&
    (document.getElementById('nc-cognome')?.value.trim()) &&
    (document.getElementById('nc-azienda')?.value.trim()) &&
    (document.getElementById('nc-piva')?.value.trim()) &&
    (document.getElementById('nc-tel')?.value.trim()) &&
    (document.getElementById('nc-email')?.value.trim());
  btn.disabled    = !ok;
  btn.style.opacity = ok ? '1' : '0.4';
  btn.style.cursor  = ok ? 'pointer' : 'default';
}

async function inviaInvitoNuovoCliente() {
  var overlay = document.getElementById('cso-modal-overlay');
  var btn     = document.getElementById('nc-submit');
  if (!overlay || !btn || btn.disabled) return;

  var nome    = document.getElementById('nc-nome').value.trim();
  var cognome = document.getElementById('nc-cognome').value.trim();
  var azienda = document.getElementById('nc-azienda').value.trim();
  var piva    = document.getElementById('nc-piva').value.trim();
  var tel     = document.getElementById('nc-tel').value.trim();
  var email   = document.getElementById('nc-email').value.trim();
  var piano   = overlay._selectedPiano;
  var csoId   = (window._currentProfile || {}).id || null;

  // Spinner
  btn.disabled    = true;
  btn.style.opacity = '0.7';
  btn.innerHTML   = '<span style="display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,0.4);border-top-color:white;border-radius:50%;animation:spin 0.7s linear infinite;vertical-align:middle;margin-right:6px;"></span>Invio in corso...';

  var box = document.getElementById('cso-modal-box');

  try {
    var inviteToken = crypto.randomUUID();
    var payload = {
      nome:         azienda,
      referente:    nome + ' ' + cognome,
      cognome:      cognome,
      azienda:      azienda,
      piva:         piva,
      telefono:     tel,
      email:        email,
      piano:        piano,
      stato:        'in_attesa',
      cso_id:       csoId,
      invite_token: inviteToken,
      created_at:   new Date().toISOString(),
    };
    console.log('Step 1: salvataggio prospect', payload);

    var { data: newP, error: insErr } = await sb.from('prospects').insert(payload).select().single();
    console.log('Step 1 risultato:', newP, insErr);

    if (insErr) {
      if (box) box.innerHTML =
        '<div style="text-align:center;padding:16px 0;">' +
          '<div style="font-size:36px;margin-bottom:12px;">❌</div>' +
          '<div style="font-size:16px;font-weight:600;color:#E53935;margin-bottom:8px;">Errore salvataggio</div>' +
          '<div style="font-size:12px;color:rgba(26,26,46,0.5);margin-bottom:20px;word-break:break-all;">' + insErr.message + '</div>' +
          '<button onclick="_chiudiModaleCSO()" style="background:#3D5AFE;color:white;border:none;border-radius:10px;padding:10px 28px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;cursor:pointer;">Chiudi</button>' +
        '</div>';
      return;
    }

    // Chiama /api/invite
    console.log('Step 2: chiamo /api/invite con id:', newP.id);
    var res = await fetch('/api/invite', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ prospect_id: newP.id }),
    });
    var resJson = await res.json().catch(() => ({}));
    console.log('Step 2 risultato:', resJson);
    if (!res.ok) {
      throw new Error(resJson.error || 'Errore invio email');
    }

    // Aggiorna lista locale
    prospects.unshift(newP);

    // Stato successo nel modale
    if (box) box.innerHTML =
      '<div style="text-align:center;padding:16px 0;">' +
        '<div style="width:48px;height:48px;border-radius:50%;background:#00825F;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">' +
          '<svg width="22" height="16" viewBox="0 0 22 16" fill="none"><path d="M1 8L8 15L21 1" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</div>' +
        '<div style="font-size:18px;font-weight:600;color:#1a1a2e;margin-bottom:8px;">Invito inviato!</div>' +
        '<div style="font-size:13px;color:rgba(26,26,46,0.4);line-height:1.6;margin-bottom:24px;">Email inviata a <strong>' + email + '</strong>.<br>Il cliente completerà la registrazione dal link.</div>' +
        '<button onclick="_chiudiModaleCSO();renderProspects();" style="background:#3D5AFE;color:white;border:none;border-radius:10px;padding:10px 32px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;font-weight:500;cursor:pointer;">Chiudi</button>' +
      '</div>';

  } catch(e) {
    if (box) box.innerHTML =
      '<div style="text-align:center;padding:16px 0;">' +
        '<div style="width:48px;height:48px;border-radius:50%;background:#e74c3c;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">' +
          '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4v8M10 14v2" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>' +
        '</div>' +
        '<div style="font-size:18px;font-weight:600;color:#1a1a2e;margin-bottom:8px;">Errore nell\'invio</div>' +
        '<div style="font-size:13px;color:rgba(26,26,46,0.4);margin-bottom:24px;">' + e.message + '</div>' +
        '<button onclick="_chiudiModaleCSO()" style="background:#3D5AFE;color:white;border:none;border-radius:10px;padding:10px 32px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;font-weight:500;cursor:pointer;">Riprova</button>' +
      '</div>';
  }
}

function renderProspects() {
  const container = document.getElementById('view-prospects');
  if (!container) return;

  const STATI = ['in_attesa','ingaggiato','in_diagnosi','attivo','archiviato'];
  const STATI_LABEL = { in_attesa:'In attesa', ingaggiato:'Ingaggiato', in_diagnosi:'In diagnosi', attivo:'Attivo', archiviato:'Archiviato' };
  const STATI_COLOR = { in_attesa:'#AF7D00', ingaggiato:'#3D5AFE', in_diagnosi:'#7B61FF', attivo:'#00825F', archiviato:'rgba(26,26,46,0.3)' };

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

    var matchPiano = _csoFilterPiano === 'tutti' ? true
      : _csoFilterPiano === 'self'        ? (!p.piano || p.piano === 'self')
      : _csoFilterPiano === 'guided_base' ? p.piano === 'guided_base'
      : _csoFilterPiano === 'guided_pro'  ? p.piano === 'guided_pro'
      : true;

    return matchSearch && matchFilter && matchPiano;
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
        '<div class="pkc-nome">' + (p.nome || '\u2014') +
          (STATI_LABEL[p.stato] ? '<span style="display:inline-block;font-size:10px;padding:2px 8px;border-radius:6px;background:' + (STATI_COLOR[p.stato]||'#888') + '1a;color:' + (STATI_COLOR[p.stato]||'#888') + ';font-weight:600;margin-left:6px;vertical-align:middle;line-height:1.4">' + STATI_LABEL[p.stato] + '</span>' : '') +
          _pianoBadge(p.piano) +
        '</div>' +
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
  var filterBtns = ['tutti','in_attesa','ingaggiato','in_diagnosi','attivo','archiviato','score'].map(function(f) {
    var active = _prospectFilter === f;
    var label  = f === 'tutti' ? 'Tutti' : f === 'score' ? 'Score alto' : STATI_LABEL[f];
    var color  = f === 'score' ? '#f39c12' : (STATI_COLOR[f] || '#3D5AFE');
    return '<button onclick="setProspectFilter(\'' + f + '\')" style="background:none;border:none;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;font-weight:' + (active?'600':'400') + ';color:' + (active?color:'rgba(26,26,46,0.45)') + ';padding:4px 8px;border-bottom:2px solid ' + (active?color:'transparent') + ';transition:all .15s;">' + label + '</button>';
  }).join('');

  var pianoFilterBtns = ['tutti','self','guided_base','guided_pro'].map(function(f) {
    var active = _csoFilterPiano === f;
    var label = f === 'tutti' ? 'Tutti' : f === 'self' ? 'Self' : f === 'guided_base' ? 'Base' : 'Pro';
    return '<button onclick="setPianoFilter(\'' + f + '\')" style="background:none;border:none;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;font-weight:' + (active?'600':'400') + ';color:' + (active?'#3D5AFE':'rgba(26,26,46,0.45)') + ';padding:4px 8px;border-bottom:2px solid ' + (active?'#3D5AFE':'transparent') + ';transition:all .15s;">' + label + '</button>';
  }).join('');

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
        '<button onclick="apriModaleNuovoCliente()" style="background:#3D5AFE;color:white;border:none;border-radius:10px;padding:10px 20px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;">+ Nuovo cliente</button>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:0;padding:6px 0 2px;border-bottom:1px solid rgba(0,0,0,0.06);margin-bottom:0;">' +
        '<span style="font-size:11px;color:rgba(26,26,46,0.35);margin-right:10px;font-weight:500;">Stato:</span>' +
        filterBtns +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:0;padding:6px 0 2px;border-bottom:1px solid rgba(0,0,0,0.06);margin-bottom:4px;">' +
        '<span style="font-size:11px;color:rgba(26,26,46,0.35);margin-right:10px;font-weight:500;">Piano:</span>' +
        pianoFilterBtns +
      '</div>' +
    '</div>' +
    kanban;
}

// -- PROSPECT DETAIL ---------------------------------------
async function renderProspectDetail(id) {
  const p = prospects.find(x=>x.id===id);
  if(!p) return;
  // Reset solo se non stiamo caricando un capitolo archiviato
  if (!_realProspectData) {
    _currentCapitoloView = -1;
    _isCapitoloReadOnly = false;
  }
  const s=calcScore(p), sc=scoreColor(s);

  const pCol = getProspectColor(p);
  document.getElementById('det-company-name').textContent = p.nome;

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
    rsb.style.background = scLive.bg;
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
    const col=dimColor(v);
    const colBg=v>=4?'rgba(0,130,95,0.1)':v>=2?'rgba(175,125,0,0.1)':'rgba(229,57,53,0.12)';
    const _curStep = Math.max(v, 1);
    const desc = _getStepDesc(p.settore || '', d.id, _curStep);
    const label = getDimLabel(p.settore, d.id);
    return `\x3cdiv class="dim-row" style="margin-bottom:10px">
      \x3cdiv style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
        \x3cdiv class="dim-label" style="color:#1a1a2e;font-weight:600">${label}\x3c/div>
        \x3cspan style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px;background:${colBg};color:${col};border:1px solid ${col}33">${v}/5\x3c/span>
      \x3c/div>
      \x3cdiv class="dim-bar-bg" onclick="showDimPopup(event,'${label.replace(/'/g,"\\'")}','${desc.replace(/'/g,"\\'").replace(/\n/g,' ')}','${col}')">\x3cdiv class="dim-bar-fill" style="width:${pct}%;background:${col}">\x3c/div>\x3c/div>
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
  await loadPreventivi(id);
  renderPreventivi(p);
  renderCronistoria(p);
  renderTimelineUnificata(p, currentCalls);
  renderCapitoliTabs(p);
  renderTabPanoramica(p, currentCalls);
  renderCSOAzioniSection(p, currentCalls);
  renderCSONoteSection(p);
  renderTabCallNote(p, currentCalls);
  renderTabFinanziaria(p);
  switchProspectTab(_activeProspectTab || 'panoramica');

  // Read-only mode per capitoli archiviati
  var targetBtns = document.getElementById('target-buttons-row');
  var headerBtns = document.getElementById('header-action-buttons');
  if (_isCapitoloReadOnly) {
    if (targetBtns) targetBtns.style.display = 'none';
    if (headerBtns) headerBtns.style.display = 'none';
  } else {
    if (targetBtns) targetBtns.style.display = '';
    if (headerBtns) headerBtns.style.display = '';
  }
}

// -- PROSPECT TABS -----------------------------------------

var _activeProspectTab = 'panoramica';

function switchProspectTab(tab) {
  _activeProspectTab = tab;
  ['panoramica','diagnosi','azioni','finanziaria','callnote'].forEach(function(t) {
    var panel = document.getElementById('ptab-' + t);
    var btn   = document.getElementById('ptab-btn-' + t);
    if (panel) panel.style.display = t === tab ? '' : 'none';
    if (btn)   btn.classList.toggle('active', t === tab);
  });
}

function renderTabPanoramica(p, calls) {
  var c = document.getElementById('panoramica-content');
  if (!c) return;

  var score = calcScore(p);
  var sc    = scoreColor(score);
  var piano = p.piano || 'self';
  var pianoLabel = piano === 'guided_pro' ? 'Guided Pro' : piano === 'guided_base' ? 'Guided Base' : 'Self';
  var pianoColor = piano === 'guided_pro' ? '#FF6B2B' : piano === 'guided_base' ? '#3D5AFE' : 'rgba(26,26,46,0.4)';

  // Cliente da X mesi
  var mesiCliente = 0;
  if (p.created_at) {
    mesiCliente = Math.floor((Date.now() - new Date(p.created_at)) / (1000 * 60 * 60 * 24 * 30.5));
  }

  // Azioni completate
  var azioni = Array.isArray(p.piano_azioni_cso) ? p.piano_azioni_cso : [];
  var azioniOk = azioni.filter(function(a){ return a.completata; }).length;

  // Ultimo contatto
  var ultimoContatto = '—';
  var ultimoContattoGiorni = '';
  if (calls && calls.length > 0) {
    var lastDate = new Date(calls[0].data);
    var giorni = Math.floor((Date.now() - lastDate) / 86400000);
    ultimoContatto = lastDate.toLocaleDateString('it-IT', { day:'2-digit', month:'short', year:'numeric' });
    ultimoContattoGiorni = giorni === 0 ? 'oggi' : giorni === 1 ? 'ieri' : giorni + ' giorni fa';
  }

  // Prossima azione
  var prossimaAzione = azioni.find(function(a){ return !a.completata; });

  // Trend score
  var trendHtml = '';
  if (p.score_history && p.score_history.length >= 2) {
    var first = p.score_history[0].score;
    var delta = score - first;
    var trendColor = delta >= 0 ? '#00825F' : '#E53935';
    var trendArrow = delta >= 0 ? '↑' : '↓';
    trendHtml = '<span style="color:' + trendColor + ';font-weight:700;font-size:16px;">' + trendArrow + ' ' + Math.abs(delta) + ' pt</span>' +
      '<span style="font-size:12px;color:rgba(26,26,46,0.4);margin-left:6px;">dalla prima diagnosi</span>';
  } else {
    trendHtml = '<span style="font-size:12px;color:rgba(26,26,46,0.4);">Dati insufficienti per il trend</span>';
  }

  var CARD2 = 'background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:12px;padding:16px;';
  var kpiBorderStyle = 'border-radius:0 14px 14px 0;';

  c.innerHTML =
    // 4 mini KPI
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;">' +
      '<div class="kpi-card" style="' + kpiBorderStyle + 'border-left:3px solid ' + sc.text + ';">' +
        '<div class="kpi-label">Score attuale</div>' +
        '<div class="kpi-val" style="font-size:24px;color:' + sc.text + ';">' + score + '/100</div>' +
        '<div class="kpi-sub">' + sc.label + '</div>' +
      '</div>' +
      '<div class="kpi-card" style="' + kpiBorderStyle + 'border-left:3px solid ' + pianoColor + ';">' +
        '<div class="kpi-label">Piano</div>' +
        '<div class="kpi-val" style="font-size:18px;color:' + pianoColor + ';">' + pianoLabel + '</div>' +
      '</div>' +
      '<div class="kpi-card" style="' + kpiBorderStyle + 'border-left:3px solid #7B61FF;">' +
        '<div class="kpi-label">Cliente da</div>' +
        '<div class="kpi-val" style="font-size:24px;">' + mesiCliente + '</div>' +
        '<div class="kpi-sub">mesi</div>' +
      '</div>' +
      '<div class="kpi-card" style="' + kpiBorderStyle + 'border-left:3px solid #00825F;">' +
        '<div class="kpi-label">Azioni completate</div>' +
        '<div class="kpi-val" style="font-size:24px;">' + azioniOk + '/' + azioni.length + '</div>' +
      '</div>' +
    '</div>' +

    // 2 colonne
    '<div style="display:grid;grid-template-columns:3fr 2fr;gap:16px;">' +

      // Colonna sinistra
      '<div style="display:flex;flex-direction:column;gap:12px;">' +
        '<div style="' + CARD2 + '">' +
          '<div style="font-size:11px;color:rgba(26,26,46,0.35);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;font-weight:600;">Ultimo contatto</div>' +
          '<div style="font-size:15px;font-weight:600;color:#1a1a2e;">' + ultimoContatto + '</div>' +
          (ultimoContattoGiorni ? '<div style="font-size:12px;color:rgba(26,26,46,0.4);margin-top:2px;">' + ultimoContattoGiorni + '</div>' : '') +
        '</div>' +
        '<div style="' + CARD2 + '">' +
          '<div style="font-size:11px;color:rgba(26,26,46,0.35);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;font-weight:600;">Prossima azione</div>' +
          (prossimaAzione
            ? '<div style="font-size:13px;font-weight:600;color:#1a1a2e;">' + (prossimaAzione.testo || '').replace(/</g,'&lt;') + '</div>'
            : '<div style="font-size:13px;color:rgba(26,26,46,0.35);">Nessuna azione in sospeso</div>') +
        '</div>' +
        '<div style="' + CARD2 + '">' +
          '<div style="font-size:11px;color:rgba(26,26,46,0.35);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;font-weight:600;">Trend score</div>' +
          '<div style="display:flex;align-items:center;gap:8px;">' + trendHtml + '</div>' +
        '</div>' +
      '</div>' +

      // Colonna destra
      '<div style="display:flex;flex-direction:column;gap:12px;">' +
        '<div style="' + CARD2 + '">' +
          '<div style="font-size:11px;color:rgba(26,26,46,0.35);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px;font-weight:600;">Dati azienda</div>' +
          '<div style="font-size:13px;color:#1a1a2e;line-height:1.8;">' +
            '<div><b>' + (p.nome || '—') + '</b></div>' +
            (p.referente ? '<div>' + p.referente + '</div>' : '') +
            (p.settore ? '<div style="color:rgba(26,26,46,0.5);">' + (p.settore.replace(/_/g,' ')) + '</div>' : '') +
            (p.fatturato ? '<div style="color:rgba(26,26,46,0.5);">' + p.fatturato + '</div>' : '') +
            (p.piva ? '<div style="color:rgba(26,26,46,0.4);font-size:12px;">P.IVA ' + p.piva + '</div>' : '') +
          '</div>' +
        '</div>' +
        '<button onclick="showView(\'calendario\')" style="width:100%;padding:12px;border-radius:12px;background:#3D5AFE;color:white;border:none;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;font-weight:600;cursor:pointer;">📅 Programma call</button>' +
        '<button onclick="aggiungiNotaCSO(\'' + p.id + '\')" style="width:100%;padding:12px;border-radius:12px;background:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.9);color:#1a1a2e;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;font-weight:500;cursor:pointer;">📝 Aggiungi nota</button>' +
      '</div>' +
    '</div>';
}

function renderCSOAzioniSection(p, calls) {
  var c = document.getElementById('cso-azioni-container');
  if (!c) return;

  var piano = p.piano || 'self';
  var isBase = piano === 'guided_base' || piano === 'guided_pro';
  var isPro  = piano === 'guided_pro';
  var CARD = 'background:rgba(255,255,255,0.45);border:1px solid rgba(255,255,255,0.6);border-radius:12px;padding:12px;margin-bottom:8px;';

  var html = '';

  // Alert inattività
  if (isBase) {
    var alertHtml = '';
    if (calls && calls.length > 0) {
      var lastCall = new Date(calls[0].data);
      var diffDays = Math.floor((Date.now() - lastCall.getTime()) / 86400000);
      if (diffDays > 14) {
        alertHtml = '<div style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.4);border-radius:10px;padding:12px 16px;margin-bottom:12px;display:flex;align-items:center;gap:10px;">' +
          '<span style="font-size:18px;">⚠️</span>' +
          '<div><div style="font-size:13px;font-weight:600;color:#92400e;">Inattivo da ' + diffDays + ' giorni</div>' +
          '<div style="font-size:12px;color:rgba(146,64,14,0.7);">Nessuna call negli ultimi ' + diffDays + ' giorni.</div></div></div>';
      }
    }
    html += alertHtml;
  }

  // Piano azioni condiviso (checkbox list)
  var azioni = Array.isArray(p.piano_azioni_cso) ? p.piano_azioni_cso : [];
  var azioniHtml = azioni.length === 0
    ? '<div style="font-size:12px;color:rgba(26,26,46,0.35);padding:8px 0;">Nessuna azione pianificata.</div>'
    : azioni.map(function(a) {
        var checked = a.completata ? 'checked' : '';
        var style   = a.completata ? 'text-decoration:line-through;color:rgba(26,26,46,0.35);' : 'color:#1a1a2e;';
        return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.04);">' +
          '<input type="checkbox" ' + checked + ' onchange="toggleAzioneCSOPiano(\'' + p.id + '\',\'' + a.id + '\')" style="width:16px;height:16px;cursor:pointer;accent-color:#3D5AFE;">' +
          '<span style="font-size:13px;flex:1;' + style + '">' + (a.testo || '').replace(/</g,'&lt;') + '</span>' +
          (a.manual ? '<span style="font-size:10px;padding:2px 6px;border-radius:6px;background:rgba(123,97,255,0.1);color:#7B61FF;flex-shrink:0;">CSO</span>' : '') +
          '<button onclick="eliminaAzioneCSOPiano(\'' + p.id + '\',\'' + a.id + '\')" style="background:none;border:none;cursor:pointer;font-size:16px;color:rgba(26,26,46,0.2);padding:0 4px;" title="Elimina">×</button>' +
        '</div>';
      }).join('');

  html +=
    '<div class="card">' +
      '<div class="card-title" style="display:flex;align-items:center;justify-content:space-between;">' +
        'Piano azioni' +
        '<div style="display:flex;gap:6px;">' +
          '<button onclick="aggiungiAzioneCSOPiano(\'' + p.id + '\')" class="btn btn-secondary" style="font-size:12px;">+ Azione</button>' +
          '<button onclick="apriModaleAzioneManuale(\'' + p.id + '\')" class="btn btn-secondary" style="font-size:12px;border-color:#7B61FF;color:#7B61FF;">+ Personalizzata</button>' +
        '</div>' +
      '</div>' +
      azioniHtml +
    '</div>';

  // Piano condiviso con PMI
  var pianoCondiviso = p.shared_plan || '';
  html +=
    '<div class="card" style="margin-top:12px;">' +
      '<div class="card-title" style="display:flex;align-items:center;justify-content:space-between;">' +
        'Piano condiviso con il cliente' +
        '<button onclick="salvaPianoCondiviso(\'' + p.id + '\')" class="btn btn-primary" style="font-size:12px;">Salva</button>' +
      '</div>' +
      '<div style="font-size:12px;color:rgba(26,26,46,0.4);margin-bottom:10px;">Questo testo sarà visibile al cliente dalla sua app nella sezione Piano.</div>' +
      '<textarea id="shared-plan-textarea" style="width:100%;min-height:120px;border:1px solid rgba(0,0,0,0.1);border-radius:10px;padding:12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;color:#1a1a2e;resize:vertical;background:rgba(255,255,255,0.6);" placeholder="Scrivi il piano strutturato per il cliente...">' + pianoCondiviso.replace(/</g,'&lt;') + '</textarea>' +
    '</div>';

  // Pro: what-if e benchmark
  if (isPro) {
    var dims = p.dims || {};
    var macro = (p.settore || '').split('_')[0];
    var peers = prospects.filter(function(x){ return x.id !== p.id && (x.settore || '').split('_')[0] === macro && x.dims; });

    html +=
      '<div class="card" style="margin-top:12px;">' +
        '<div class="card-title" style="display:flex;align-items:center;justify-content:space-between;">Report PDF' +
          '<button onclick="generaReportProPDF(\'' + p.id + '\')" class="btn btn-primary" style="font-size:12px;">Genera PDF</button>' +
        '</div>' +
        '<div style="font-size:12px;color:rgba(26,26,46,0.45);">Report completo con score, analisi e piano azioni per ' + (p.nome || 'il cliente') + '.</div>' +
      '</div>';
  }

  c.innerHTML = html;
}

function renderCSONoteSection(p) {
  var c = document.getElementById('cso-note-container');
  if (!c) return;

  var CARD = 'background:rgba(255,255,255,0.45);border:1px solid rgba(255,255,255,0.6);border-radius:12px;padding:12px;margin-bottom:8px;';
  var notesList = Array.isArray(p.notes_cso) ? p.notes_cso : [];
  var notesHtml = notesList.length === 0
    ? '<div style="font-size:12px;color:rgba(26,26,46,0.35);padding:8px 0;">Nessuna nota ancora.</div>'
    : notesList.slice().reverse().slice(0, 5).map(function(n) {
        var d = new Date(n.ts);
        var data = d.toLocaleDateString('it-IT', { day:'2-digit', month:'short', year:'numeric' });
        return '<div style="' + CARD + '">' +
          '<div style="font-size:10px;color:rgba(26,26,46,0.35);margin-bottom:4px;">' + data + '</div>' +
          '<div style="font-size:13px;color:#1a1a2e;line-height:1.5;">' + (n.text || '').replace(/</g,'&lt;') + '</div>' +
        '</div>';
      }).join('');

  c.innerHTML =
    '<div class="card" style="margin-top:12px;">' +
      '<div class="card-title" style="display:flex;align-items:center;justify-content:space-between;">' +
        'Note CSO' +
        '<button onclick="aggiungiNotaCSO(\'' + p.id + '\')" class="btn btn-secondary" style="font-size:12px;">+ Aggiungi nota</button>' +
      '</div>' +
      notesHtml +
    '</div>';
}

function renderTabCallNote(p, calls) {
  var c = document.getElementById('calls-list-container');
  if (!c) return;

  var CARD = 'background:rgba(255,255,255,0.45);border:1px solid rgba(255,255,255,0.6);border-radius:12px;padding:12px;margin-bottom:8px;';
  var callsHtml = (calls && calls.length > 0)
    ? calls.map(function(call) {
        var d = new Date(call.data).toLocaleDateString('it-IT', { day:'2-digit', month:'short', year:'numeric' });
        var tipoColor = call.tipo === 'strategica' ? '#3D5AFE' : call.tipo === 'emergenza' ? '#E53935' : '#7B61FF';
        var tipoLabel = call.tipo === 'strategica' ? 'Strategica' : call.tipo === 'emergenza' ? 'Emergenza' : 'Follow-up';
        return '<div style="' + CARD + '">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">' +
            '<div style="display:flex;align-items:center;gap:8px;">' +
              '<span style="font-size:13px;font-weight:600;color:#1a1a2e;">' + d + '</span>' +
              '<span style="font-size:11px;padding:2px 8px;border-radius:6px;background:' + tipoColor + '1a;color:' + tipoColor + ';font-weight:600;">' + tipoLabel + '</span>' +
            '</div>' +
            (call.durata_min ? '<span style="font-size:12px;color:rgba(26,26,46,0.4);">' + call.durata_min + ' min</span>' : '') +
          '</div>' +
          (call.appunti ? '<div style="font-size:12px;color:rgba(26,26,46,0.6);line-height:1.5;margin-bottom:4px;">' + call.appunti.replace(/</g,'&lt;') + '</div>' : '') +
          (call.prossimi_passi ? '<div style="font-size:11px;color:#3D5AFE;margin-top:4px;">→ ' + call.prossimi_passi.replace(/</g,'&lt;') + '</div>' : '') +
        '</div>';
      }).join('')
    : '<div style="font-size:12px;color:rgba(26,26,46,0.35);padding:8px 0;">Nessuna call registrata.</div>';

  c.innerHTML =
    '<div class="card" style="margin-top:12px;">' +
      '<div class="card-title" style="display:flex;align-items:center;justify-content:space-between;">' +
        'Call registrate' +
        '<button onclick="apriModaleRegistraCall(\'' + p.id + '\')" class="btn btn-secondary" style="font-size:12px;">+ Registra call</button>' +
      '</div>' +
      callsHtml +
    '</div>';
}

function renderTabFinanziaria(p) {
  var c = document.getElementById('finanziaria-pro-extras');
  if (!c) return;
  var isPro = p.piano === 'guided_pro';
  if (!isPro) { c.innerHTML = ''; return; }

  // Benchmark peer
  var macro = (p.settore || '').split('_')[0];
  var peers = prospects.filter(function(x){ return x.id !== p.id && (x.settore || '').split('_')[0] === macro && x.dims; });
  var DIMS_IDS = ['vendite','pipeline','organizzazione','processi','ricavi','marketing','sito_web','post_vendita'];
  var benchHtml = '';
  if (peers.length > 0) {
    benchHtml = DIMS_IDS.map(function(dimId) {
      var myVal  = (p.dims || {})[dimId] || 0;
      var peerAvg = peers.reduce(function(sum, x){ return sum + ((x.dims || {})[dimId] || 0); }, 0) / peers.length;
      var diff   = myVal - peerAvg;
      var diffStr = diff >= 0 ? '+' + diff.toFixed(1) : diff.toFixed(1);
      var diffColor = diff >= 0 ? '#00825F' : '#e74c3c';
      var label  = dimId.replace(/_/g,' ').replace(/\b\w/g,function(l){return l.toUpperCase();});
      return '<div style="margin-bottom:10px;">' +
        '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px;">' +
          '<span style="color:#1a1a2e;">' + label + '</span>' +
          '<span style="color:' + diffColor + ';font-weight:600;">' + diffStr + ' vs peer</span>' +
        '</div>' +
        '<div style="position:relative;height:6px;background:rgba(0,0,0,0.07);border-radius:4px;">' +
          '<div style="position:absolute;left:0;top:0;height:100%;width:' + (myVal/5*100).toFixed(0) + '%;background:#3D5AFE;border-radius:4px;opacity:0.7;"></div>' +
          '<div style="position:absolute;left:0;top:0;height:100%;width:' + (peerAvg/5*100).toFixed(0) + '%;background:rgba(0,0,0,0.2);border-radius:4px;border:1px dashed rgba(0,0,0,0.3);"></div>' +
        '</div>' +
        '<div style="font-size:10px;color:rgba(26,26,46,0.4);">' + myVal.toFixed(1) + '/5 · media: ' + peerAvg.toFixed(1) + ' (' + peers.length + ' aziende)</div>' +
      '</div>';
    }).join('');
  } else {
    benchHtml = '<div style="font-size:12px;color:rgba(26,26,46,0.35);">Nessun peer trovato per questo settore.</div>';
  }

  // What-if slider
  var dims = p.dims || {};
  var whatifsHtml = Object.keys(dims).map(function(dimId) {
    var cur  = dims[dimId] || 0;
    var label = dimId.replace(/_/g,' ').replace(/\b\w/g,function(l){return l.toUpperCase();});
    return '<div style="margin-bottom:8px;display:flex;align-items:center;gap:10px;">' +
      '<span style="font-size:12px;color:#1a1a2e;width:130px;flex-shrink:0;">' + label + '</span>' +
      '<input type="range" min="1" max="5" step="1" value="' + cur + '" style="flex:1;accent-color:#3D5AFE;" oninput="aggiornaWhatif(\'' + p.id + '\',\'' + dimId + '\',this.value)">' +
      '<span id="wi-val-' + dimId + '" style="font-size:12px;font-weight:600;color:#3D5AFE;width:28px;text-align:right;">' + cur + '/5</span>' +
    '</div>';
  }).join('');

  c.innerHTML =
    '<div class="card" style="margin-top:12px;">' +
      '<div class="card-title">Benchmark peer — ' + (macro ? macro.charAt(0).toUpperCase()+macro.slice(1) : '') + '</div>' +
      '<div style="font-size:11px;color:rgba(26,26,46,0.4);margin-bottom:12px;">Blu = cliente · grigio = media peer</div>' +
      benchHtml +
    '</div>' +
    '<div class="card" style="margin-top:12px;">' +
      '<div class="card-title">Simulazione what-if</div>' +
      '<div style="font-size:12px;color:rgba(26,26,46,0.45);margin-bottom:12px;">Sposta i cursori per simulare l\'impatto sul score.</div>' +
      whatifsHtml +
      '<div style="margin-top:12px;padding:12px;background:rgba(61,90,254,0.06);border-radius:10px;text-align:center;">' +
        '<div style="font-size:11px;color:rgba(26,26,46,0.4);margin-bottom:2px;">Score simulato</div>' +
        '<div id="whatif-score-display" style="font-size:28px;font-weight:700;color:#3D5AFE;">' + calcScore(p) + '</div>' +
      '</div>' +
    '</div>';
}

// Modale registra call
function apriModaleRegistraCall(prospectId) {
  var oggi = new Date().toISOString().split('T')[0];
  _apriModaleCSO({
    titolo: 'Registra call',
    sottotitolo: 'Inserisci i dettagli della call',
    customBody:
      '<div style="display:flex;flex-direction:column;gap:12px;">' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">' +
          '<div>' +
            '<label style="font-size:12px;color:rgba(26,26,46,0.5);display:block;margin-bottom:4px;">Data</label>' +
            '<input type="date" id="call-data" value="' + oggi + '" style="width:100%;border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:8px 12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;">' +
          '</div>' +
          '<div>' +
            '<label style="font-size:12px;color:rgba(26,26,46,0.5);display:block;margin-bottom:4px;">Durata (min)</label>' +
            '<input type="number" id="call-durata" placeholder="60" min="1" style="width:100%;border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:8px 12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;">' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<label style="font-size:12px;color:rgba(26,26,46,0.5);display:block;margin-bottom:6px;">Tipo</label>' +
          '<div style="display:flex;gap:6px;" id="call-tipo-btns">' +
            '<button onclick="_selCallTipo(\'follow_up\')" id="ctype-follow_up" style="flex:1;padding:8px;border-radius:8px;border:1px solid rgba(0,0,0,0.1);background:rgba(123,97,255,0.1);color:#7B61FF;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:12px;font-weight:600;cursor:pointer;">Follow-up</button>' +
            '<button onclick="_selCallTipo(\'strategica\')" id="ctype-strategica" style="flex:1;padding:8px;border-radius:8px;border:1px solid rgba(0,0,0,0.1);background:none;color:rgba(26,26,46,0.5);font-family:\'Plus Jakarta Sans\',sans-serif;font-size:12px;cursor:pointer;">Strategica</button>' +
            '<button onclick="_selCallTipo(\'emergenza\')" id="ctype-emergenza" style="flex:1;padding:8px;border-radius:8px;border:1px solid rgba(0,0,0,0.1);background:none;color:rgba(26,26,46,0.5);font-family:\'Plus Jakarta Sans\',sans-serif;font-size:12px;cursor:pointer;">Emergenza</button>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<label style="font-size:12px;color:rgba(26,26,46,0.5);display:block;margin-bottom:4px;">Appunti</label>' +
          '<textarea id="call-appunti" placeholder="Note della call..." style="width:100%;min-height:80px;border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:8px 12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;resize:vertical;"></textarea>' +
        '</div>' +
        '<div>' +
          '<label style="font-size:12px;color:rgba(26,26,46,0.5);display:block;margin-bottom:4px;">Prossimi passi</label>' +
          '<textarea id="call-passi" placeholder="Cosa fare entro la prossima call..." style="width:100%;min-height:60px;border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:8px 12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;resize:vertical;"></textarea>' +
        '</div>' +
      '</div>',
    btnLabel: 'Salva call',
    onSalva: function() { salvaCallRegistrata(prospectId); }
  });
  window._callTipoSel = 'follow_up';
}

function _selCallTipo(tipo) {
  window._callTipoSel = tipo;
  ['follow_up','strategica','emergenza'].forEach(function(t) {
    var btn = document.getElementById('ctype-' + t);
    if (!btn) return;
    var color = t === 'follow_up' ? '#7B61FF' : t === 'strategica' ? '#3D5AFE' : '#E53935';
    if (t === tipo) {
      btn.style.background = color + '1a';
      btn.style.color = color;
      btn.style.borderColor = color + '44';
      btn.style.fontWeight = '600';
    } else {
      btn.style.background = 'none';
      btn.style.color = 'rgba(26,26,46,0.5)';
      btn.style.borderColor = 'rgba(0,0,0,0.1)';
      btn.style.fontWeight = '400';
    }
  });
}

async function salvaCallRegistrata(prospectId) {
  var data       = (document.getElementById('call-data') || {}).value || new Date().toISOString().split('T')[0];
  var durata_min = parseInt((document.getElementById('call-durata') || {}).value) || null;
  var tipo       = window._callTipoSel || 'follow_up';
  var appunti    = (document.getElementById('call-appunti') || {}).value || '';
  var prossimi_passi = (document.getElementById('call-passi') || {}).value || '';
  var csoId      = window._currentProfile ? window._currentProfile.id : null;

  try {
    var { error } = await sb.from('calls').insert({
      prospect_id: prospectId,
      cso_id: csoId,
      data: data,
      durata_min: durata_min,
      tipo: tipo,
      appunti: appunti,
      prossimi_passi: prossimi_passi,
    });
    if (error) throw error;
    _chiudiModaleCSO();
    showToast('Call registrata');
    await renderProspectDetail(prospectId);
    switchProspectTab('callnote');
  } catch(e) {
    showToast('Errore salvataggio call');
  }
}

// Salva piano condiviso
async function salvaPianoCondiviso(prospectId) {
  var textarea = document.getElementById('shared-plan-textarea');
  if (!textarea) return;
  var testo = textarea.value;
  try {
    var { error } = await sb.from('prospects').update({ shared_plan: testo }).eq('id', prospectId);
    if (error) throw error;
    var p = prospects.find(function(x){ return x.id === prospectId; });
    if (p) p.shared_plan = testo;
    showToast('Piano condiviso salvato');
  } catch(e) {
    showToast('Errore salvataggio piano');
  }
}

// Modale azione manuale CSO
function apriModaleAzioneManuale(prospectId) {
  _apriModaleCSO({
    titolo: 'Azione personalizzata',
    sottotitolo: 'Aggiungi un\'azione manuale al piano del cliente',
    placeholder: 'Descrizione dell\'azione...',
    maxLen: 400,
    btnLabel: 'Aggiungi',
    onSalva: async function(testo) {
      var p = prospects.find(function(x){ return x.id === prospectId; });
      if (!p) return;
      var azioni = Array.isArray(p.piano_azioni_cso) ? [...p.piano_azioni_cso] : [];
      azioni.push({ id: Date.now().toString(), testo: testo, completata: false, manual: true, cso_id: window._currentProfile?.id, ts: new Date().toISOString() });
      var { error } = await sb.from('prospects').update({ piano_azioni_cso: azioni }).eq('id', prospectId);
      if (error) { showToast('Errore salvataggio'); return; }
      p.piano_azioni_cso = azioni;
      _chiudiModaleCSO();
      renderCSOAzioniSection(p, currentCalls);
      showToast('Azione aggiunta');
    }
  });
}

// -- CSO PIANO SECTIONS (legacy, not used for new tabs) ----

function renderCSOPianoSections(p, calls) {
  var container = document.getElementById('cso-piano-sections');
  if (!container) return;

  var piano   = p.piano || 'self';
  var isBase  = piano === 'guided_base' || piano === 'guided_pro';
  var isPro   = piano === 'guided_pro';
  var CARD    = 'background:rgba(255,255,255,0.45);border:1px solid rgba(255,255,255,0.6);border-radius:12px;padding:12px;margin-bottom:8px;';

  // ── NOTE CSO (tutti i piani) ─────────────────────────────
  var notesList = Array.isArray(p.notes_cso) ? p.notes_cso : [];
  var notesHtml = notesList.length === 0
    ? '<div style="font-size:12px;color:rgba(26,26,46,0.35);padding:8px 0;">Nessuna nota ancora.</div>'
    : notesList.slice().reverse().slice(0, 5).map(function(n) {
        var d = new Date(n.ts);
        var data = d.toLocaleDateString('it-IT', { day:'2-digit', month:'short', year:'numeric' });
        return '<div style="' + CARD + '">' +
          '<div style="font-size:10px;color:rgba(26,26,46,0.35);margin-bottom:4px;">' + data + '</div>' +
          '<div style="font-size:13px;color:#1a1a2e;line-height:1.5;">' + (n.text || '').replace(/</g,'&lt;') + '</div>' +
        '</div>';
      }).join('');

  var noteCSOSection =
    '<div class="card" style="margin-top:16px;">' +
      '<div class="card-title" style="display:flex;align-items:center;justify-content:space-between;">' +
        'Note CSO' +
        '<button onclick="aggiungiNotaCSO(\'' + p.id + '\')" class="btn btn-secondary" style="font-size:12px;">+ Aggiungi nota</button>' +
      '</div>' +
      notesHtml +
    '</div>';

  // ── SEZIONI BASE + PRO ───────────────────────────────────
  var baseProSections = '';
  if (isBase) {
    // Alert inattività: controlla l'ultima call
    var alertHtml = '';
    if (calls && calls.length > 0) {
      var lastCall = new Date(calls[0].data);
      var diffDays = Math.floor((Date.now() - lastCall.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 14) {
        alertHtml = '<div style="background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.4);border-radius:10px;padding:12px 16px;margin-bottom:12px;display:flex;align-items:center;gap:10px;">' +
          '<span style="font-size:18px;">⚠️</span>' +
          '<div><div style="font-size:13px;font-weight:600;color:#92400e;">Inattivo da ' + diffDays + ' giorni</div>' +
          '<div style="font-size:12px;color:rgba(146,64,14,0.7);">Nessuna call negli ultimi ' + diffDays + ' giorni — considera di contattare il cliente.</div></div>' +
        '</div>';
      }
    } else {
      alertHtml = '<div style="background:rgba(251,191,36,0.10);border:1px solid rgba(251,191,36,0.3);border-radius:10px;padding:12px 16px;margin-bottom:12px;display:flex;align-items:center;gap:10px;">' +
        '<span style="font-size:18px;">⚠️</span>' +
        '<div><div style="font-size:13px;font-weight:600;color:#92400e;">Nessuna call registrata</div>' +
        '<div style="font-size:12px;color:rgba(146,64,14,0.7);">Pianifica la prima call con il cliente.</div></div>' +
      '</div>';
    }

    // Piano azioni condiviso
    var azioni = Array.isArray(p.piano_azioni_cso) ? p.piano_azioni_cso : [];
    var azioniHtml = azioni.length === 0
      ? '<div style="font-size:12px;color:rgba(26,26,46,0.35);padding:8px 0;">Nessuna azione pianificata.</div>'
      : azioni.map(function(a) {
          var checked = a.completata ? 'checked' : '';
          var style   = a.completata ? 'text-decoration:line-through;color:rgba(26,26,46,0.35);' : 'color:#1a1a2e;';
          return '<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.04);">' +
            '<input type="checkbox" ' + checked + ' onchange="toggleAzioneCSOPiano(\'' + p.id + '\',\'' + a.id + '\')" style="width:16px;height:16px;cursor:pointer;accent-color:#3D5AFE;">' +
            '<span style="font-size:13px;flex:1;' + style + '">' + (a.testo || '').replace(/</g,'&lt;') + '</span>' +
            '<button onclick="eliminaAzioneCSOPiano(\'' + p.id + '\',\'' + a.id + '\')" style="background:none;border:none;cursor:pointer;font-size:16px;color:rgba(26,26,46,0.2);padding:0 4px;" title="Elimina">×</button>' +
          '</div>';
        }).join('');

    // Storico call
    var callsHtml = (calls && calls.length > 0)
      ? calls.slice(0, 5).map(function(c) {
          var d = new Date(c.data).toLocaleDateString('it-IT', { day:'2-digit', month:'short', year:'numeric' });
          return '<div style="' + CARD + '">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">' +
              '<span style="font-size:12px;font-weight:600;color:#1a1a2e;">' + d + '</span>' +
              (c.durata ? '<span style="font-size:11px;color:rgba(26,26,46,0.4);">' + c.durata + ' min</span>' : '') +
            '</div>' +
            (c.note ? '<div style="font-size:12px;color:rgba(26,26,46,0.6);line-height:1.5;">' + c.note.replace(/</g,'&lt;') + '</div>' : '') +
          '</div>';
        }).join('')
      : '<div style="font-size:12px;color:rgba(26,26,46,0.35);padding:8px 0;">Nessuna call registrata.</div>';

    baseProSections =
      '<div class="card" style="margin-top:12px;">' +
        alertHtml +
        '<div class="card-title" style="display:flex;align-items:center;justify-content:space-between;">' +
          'Piano azioni condiviso' +
          '<button onclick="aggiungiAzioneCSOPiano(\'' + p.id + '\')" class="btn btn-secondary" style="font-size:12px;">+ Aggiungi</button>' +
        '</div>' +
        azioniHtml +
      '</div>' +
      '<div class="card" style="margin-top:12px;">' +
        '<div class="card-title">Storico call</div>' +
        callsHtml +
      '</div>';
  }

  // ── SEZIONI PRO ──────────────────────────────────────────
  var proSections = '';
  if (isPro) {
    // Benchmark peer: media dims del settore
    var macro = (p.settore || '').split('_')[0];
    var peers  = prospects.filter(function(x) { return x.id !== p.id && (x.settore || '').split('_')[0] === macro && x.dims; });
    var benchPeerHtml = '';
    if (peers.length > 0) {
      var DIMS_IDS = ['vendite','pipeline','organizzazione','processi','ricavi','marketing','sito_web','post_vendita'];
      benchPeerHtml = DIMS_IDS.map(function(dimId) {
        var myVal  = (p.dims || {})[dimId] || 0;
        var peerAvg = peers.reduce(function(sum, x) { return sum + ((x.dims || {})[dimId] || 0); }, 0) / peers.length;
        var diff   = myVal - peerAvg;
        var diffStr = diff >= 0 ? '+' + diff.toFixed(1) : diff.toFixed(1);
        var diffColor = diff >= 0 ? '#00825F' : '#e74c3c';
        var label  = dimId.replace(/_/g,' ').replace(/\b\w/g, function(l){return l.toUpperCase();});
        var barW   = (myVal / 5 * 100).toFixed(0) + '%';
        var avgW   = (peerAvg / 5 * 100).toFixed(0) + '%';
        return '<div style="margin-bottom:10px;">' +
          '<div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:3px;">' +
            '<span style="color:#1a1a2e;">' + label + '</span>' +
            '<span style="color:' + diffColor + ';font-weight:600;">' + diffStr + ' vs peer</span>' +
          '</div>' +
          '<div style="position:relative;height:6px;background:rgba(0,0,0,0.07);border-radius:4px;margin-bottom:2px;">' +
            '<div style="position:absolute;left:0;top:0;height:100%;width:' + barW + ';background:#3D5AFE;border-radius:4px;opacity:0.7;"></div>' +
            '<div style="position:absolute;left:0;top:0;height:100%;width:' + avgW + ';background:rgba(0,0,0,0.2);border-radius:4px;border:1px dashed rgba(0,0,0,0.3);"></div>' +
          '</div>' +
          '<div style="font-size:10px;color:rgba(26,26,46,0.4);">' + myVal.toFixed(1) + '/5 · media peer: ' + peerAvg.toFixed(1) + ' (' + peers.length + ' aziende)</div>' +
        '</div>';
      }).join('');
    } else {
      benchPeerHtml = '<div style="font-size:12px;color:rgba(26,26,46,0.35);">Nessun peer dello stesso macro-settore trovato.</div>';
    }

    // Correlazioni: calcola Pearson tra coppie di dims
    var corrHtml = '';
    if (prospects.length >= 5) {
      var DIM_IDS2 = ['vendite','pipeline','organizzazione','processi','ricavi','marketing','sito_web','post_vendita'];
      function _pearson(a, b) {
        var n = a.length, sumA = 0, sumB = 0, sumAB = 0, sumA2 = 0, sumB2 = 0;
        for (var i = 0; i < n; i++) { sumA+=a[i]; sumB+=b[i]; sumAB+=a[i]*b[i]; sumA2+=a[i]*a[i]; sumB2+=b[i]*b[i]; }
        var num = n*sumAB - sumA*sumB;
        var den = Math.sqrt((n*sumA2-sumA*sumA)*(n*sumB2-sumB*sumB));
        return den === 0 ? 0 : num/den;
      }
      var pairs = [];
      for (var i = 0; i < DIM_IDS2.length; i++) {
        for (var j = i+1; j < DIM_IDS2.length; j++) {
          var dA = prospects.map(function(x){ return ((x.dims||{})[DIM_IDS2[i]]||0); });
          var dB = prospects.map(function(x){ return ((x.dims||{})[DIM_IDS2[j]]||0); });
          var r  = _pearson(dA, dB);
          if (Math.abs(r) > 0.3) pairs.push({ a: DIM_IDS2[i], b: DIM_IDS2[j], r: r });
        }
      }
      pairs.sort(function(x,y){ return Math.abs(y.r)-Math.abs(x.r); });
      corrHtml = pairs.slice(0,4).map(function(pair) {
        var label = pair.a.replace(/_/g,' ') + ' ↔ ' + pair.b.replace(/_/g,' ');
        var sign  = pair.r > 0 ? 'correlazione positiva' : 'correlazione negativa';
        var col   = pair.r > 0 ? '#00825F' : '#e74c3c';
        return '<div style="' + CARD + 'display:flex;align-items:center;justify-content:space-between;">' +
          '<div style="font-size:12px;color:#1a1a2e;text-transform:capitalize;">' + label + '</div>' +
          '<div style="font-size:11px;color:' + col + ';font-weight:600;">' + (pair.r*100).toFixed(0) + '% · ' + sign + '</div>' +
        '</div>';
      }).join('') || '<div style="font-size:12px;color:rgba(26,26,46,0.35);">Dati insufficienti per le correlazioni.</div>';
    } else {
      corrHtml = '<div style="font-size:12px;color:rgba(26,26,46,0.35);">Servono almeno 5 prospect per calcolare le correlazioni.</div>';
    }

    // What-if slider
    var dims = p.dims || {};
    var whatifsHtml = Object.keys(dims).map(function(dimId) {
      var cur  = dims[dimId] || 0;
      var label = dimId.replace(/_/g,' ').replace(/\b\w/g,function(l){return l.toUpperCase();});
      return '<div style="margin-bottom:8px;display:flex;align-items:center;gap:10px;">' +
        '<span style="font-size:12px;color:#1a1a2e;width:130px;flex-shrink:0;">' + label + '</span>' +
        '<input type="range" min="1" max="5" step="1" value="' + cur + '" style="flex:1;accent-color:#3D5AFE;" ' +
          'oninput="aggiornaWhatif(\'' + p.id + '\',\'' + dimId + '\',this.value)">' +
        '<span id="wi-val-' + dimId + '" style="font-size:12px;font-weight:600;color:#3D5AFE;width:28px;text-align:right;">' + cur + '/5</span>' +
      '</div>';
    }).join('');

    proSections =
      '<div class="card" style="margin-top:12px;">' +
        '<div class="card-title" style="display:flex;align-items:center;justify-content:space-between;">' +
          'Report PDF' +
          '<button onclick="generaReportProPDF(\'' + p.id + '\')" class="btn btn-primary" style="font-size:12px;">Genera report PDF</button>' +
        '</div>' +
        '<div style="font-size:12px;color:rgba(26,26,46,0.45);">Genera un report completo con score, analisi e piano azioni per ' + (p.nome || 'il cliente') + '.</div>' +
      '</div>' +
      '<div class="card" style="margin-top:12px;">' +
        '<div class="card-title">Benchmark peer — ' + (macro ? macro.charAt(0).toUpperCase()+macro.slice(1) : '') + '</div>' +
        '<div style="font-size:11px;color:rgba(26,26,46,0.4);margin-bottom:12px;">Linea blu = cliente · linea grigia = media peer</div>' +
        benchPeerHtml +
      '</div>' +
      '<div class="card" style="margin-top:12px;">' +
        '<div class="card-title">Simulazione what-if</div>' +
        '<div style="font-size:12px;color:rgba(26,26,46,0.45);margin-bottom:12px;">Sposta i cursori per simulare l\'impatto sul score globale.</div>' +
        whatifsHtml +
        '<div style="margin-top:12px;padding:12px;background:rgba(61,90,254,0.06);border-radius:10px;text-align:center;">' +
          '<div style="font-size:11px;color:rgba(26,26,46,0.4);margin-bottom:2px;">Score simulato</div>' +
          '<div id="whatif-score-display" style="font-size:28px;font-weight:700;color:#3D5AFE;">' + calcScore(p) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="card" style="margin-top:12px;">' +
        '<div class="card-title">Correlazioni tra dimensioni</div>' +
        '<div style="font-size:11px;color:rgba(26,26,46,0.4);margin-bottom:12px;">Calcolate su ' + prospects.length + ' prospect nel sistema.</div>' +
        corrHtml +
      '</div>';
  }

  container.innerHTML = noteCSOSection + baseProSections + proSections;
}

// ── MODALE LIQUID GLASS (CSO) ────────────────────────────────

function _apriModaleCSO(opts) {
  // opts: { titolo, sottotitolo, placeholder, maxLen, btnLabel, onSalva }
  var maxLen   = opts.maxLen || 500;
  var btnLabel = opts.btnLabel || 'Salva';

  // Rimuovi eventuale modale già aperto
  var existing = document.getElementById('cso-modal-overlay');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'cso-modal-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.35);z-index:9000;display:flex;align-items:center;justify-content:center;';

  var box = document.createElement('div');
  box.id = 'cso-modal-box';
  box.style.cssText = 'width:480px;max-width:90vw;background:rgba(255,255,255,0.92);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.8);border-radius:20px;padding:28px;box-shadow:0 8px 32px rgba(0,0,0,0.12);transform:scale(0.95);opacity:0;transition:transform 200ms ease-out,opacity 200ms ease-out;';

  var bodyHtml = opts.customBody
    ? opts.customBody
    : '<div style="position:relative;">' +
        '<textarea id="cso-modal-ta" maxlength="' + maxLen + '" placeholder="' + (opts.placeholder || 'Scrivi...') + '" ' +
          'style="width:100%;height:120px;background:rgba(255,255,255,0.6);border:1px solid rgba(26,26,46,0.1);border-radius:12px;padding:14px;font-size:14px;color:#1a1a2e;font-family:\'Plus Jakarta Sans\',sans-serif;resize:vertical;box-sizing:border-box;outline:none;transition:border-color .15s;" ' +
          'oninput="_csoModalInput(this,' + maxLen + ')"' +
          'onkeydown="_csoModalKeydown(event)">' +
        '</textarea>' +
        '<div id="cso-modal-count" style="position:absolute;bottom:10px;right:12px;font-size:11px;color:rgba(26,26,46,0.25);pointer-events:none;">0/' + maxLen + '</div>' +
      '</div>';

  var saveDisabled = opts.customBody ? '' : 'disabled';
  var saveOpacity  = opts.customBody ? '1' : '0.4';
  var saveCursor   = opts.customBody ? 'pointer' : 'pointer';

  box.innerHTML =
    '<div style="font-size:18px;font-weight:600;color:#1a1a2e;margin-bottom:4px;">' + (opts.titolo || 'Nuova nota') + '</div>' +
    (opts.sottotitolo ? '<div style="font-size:13px;color:rgba(26,26,46,0.4);margin-bottom:18px;">' + opts.sottotitolo + '</div>' : '<div style="margin-bottom:18px;"></div>') +
    bodyHtml +
    '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:16px;">' +
      '<button onclick="_chiudiModaleCSO()" style="background:transparent;border:1px solid rgba(26,26,46,0.12);color:rgba(26,26,46,0.5);border-radius:10px;padding:10px 24px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;cursor:pointer;">Annulla</button>' +
      '<button id="cso-modal-save" onclick="_salvaModaleCSO()" ' + saveDisabled + ' style="background:#3D5AFE;color:white;border:none;border-radius:10px;padding:10px 24px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;font-weight:500;cursor:pointer;opacity:' + saveOpacity + ';transition:opacity .15s;">' + btnLabel + '</button>' +
    '</div>';

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  // Salva callback
  overlay._onSalva = opts.onSalva;

  // Chiudi cliccando overlay (non il box)
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) _chiudiModaleCSO();
  });

  // ESC
  overlay._escHandler = function(e) { if (e.key === 'Escape') _chiudiModaleCSO(); };
  document.addEventListener('keydown', overlay._escHandler);

  // Animazione apertura
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      box.style.transform = 'scale(1)';
      box.style.opacity   = '1';
    });
  });

  // Focus textarea
  setTimeout(function() {
    var ta = document.getElementById('cso-modal-ta');
    if (ta) {
      ta.focus();
      ta.addEventListener('focus', function() { ta.style.borderColor = 'rgba(61,90,254,0.4)'; });
      ta.addEventListener('blur',  function() { ta.style.borderColor = 'rgba(26,26,46,0.1)'; });
    }
  }, 50);
}

function _csoModalInput(ta, maxLen) {
  var len = ta.value.length;
  var cnt = document.getElementById('cso-modal-count');
  if (cnt) cnt.textContent = len + '/' + maxLen;
  var btn = document.getElementById('cso-modal-save');
  if (btn) {
    var empty = !ta.value.trim();
    btn.disabled = empty;
    btn.style.opacity = empty ? '0.4' : '1';
    btn.style.cursor  = empty ? 'default' : 'pointer';
  }
}

function _csoModalKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    var btn = document.getElementById('cso-modal-save');
    if (btn && !btn.disabled) _salvaModaleCSO();
  }
}

function _salvaModaleCSO() {
  var overlay = document.getElementById('cso-modal-overlay');
  if (!overlay || !overlay._onSalva) return;
  var ta = document.getElementById('cso-modal-ta');
  if (ta) {
    // Standard textarea modal
    var testo = ta.value.trim();
    if (!testo) return;
    overlay._onSalva(testo);
    _chiudiModaleCSO();
  } else {
    // Custom body modal — call onSalva directly (no auto-close, the handler closes it)
    overlay._onSalva();
  }
}

function _chiudiModaleCSO() {
  var overlay = document.getElementById('cso-modal-overlay');
  if (!overlay) return;
  var box = document.getElementById('cso-modal-box');
  if (overlay._escHandler) document.removeEventListener('keydown', overlay._escHandler);
  if (box) {
    box.style.transition = 'transform 150ms ease-in,opacity 150ms ease-in';
    box.style.transform  = 'scale(0.95)';
    box.style.opacity    = '0';
  }
  setTimeout(function() { if (overlay.parentNode) overlay.remove(); }, 160);
}

// ── MODALE MULTI-CAMPO (per aggiungiModuloCustom) ────────────

function _apriModaleModuloCSO(onSalva) {
  var existing = document.getElementById('cso-modal-overlay');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'cso-modal-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.35);z-index:9000;display:flex;align-items:center;justify-content:center;';

  var box = document.createElement('div');
  box.id = 'cso-modal-box';
  box.style.cssText = 'width:480px;max-width:90vw;background:rgba(255,255,255,0.92);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.8);border-radius:20px;padding:28px;box-shadow:0 8px 32px rgba(0,0,0,0.12);transform:scale(0.95);opacity:0;transition:transform 200ms ease-out,opacity 200ms ease-out;';

  var fieldStyle = 'width:100%;background:rgba(255,255,255,0.6);border:1px solid rgba(26,26,46,0.1);border-radius:10px;padding:10px 14px;font-size:14px;color:#1a1a2e;font-family:\'Plus Jakarta Sans\',sans-serif;box-sizing:border-box;outline:none;';
  var labelStyle = 'display:block;font-size:12px;font-weight:500;color:rgba(26,26,46,0.5);margin-bottom:5px;margin-top:14px;';

  box.innerHTML =
    '<div style="font-size:18px;font-weight:600;color:#1a1a2e;margin-bottom:18px;">Nuovo modulo personalizzato</div>' +
    '<label style="' + labelStyle + 'margin-top:0;">Nome voce</label>' +
    '<input id="csom-nome" type="text" placeholder="Es: Software gestionale" style="' + fieldStyle + '">' +
    '<label style="' + labelStyle + '">Costo mensile (€)</label>' +
    '<input id="csom-mensile" type="number" min="0" placeholder="0" style="' + fieldStyle + '">' +
    '<label style="' + labelStyle + '">Costo setup una tantum (€)</label>' +
    '<input id="csom-setup" type="number" min="0" placeholder="0" style="' + fieldStyle + '">' +
    '<label style="' + labelStyle + '">Impatto sul fatturato</label>' +
    '<select id="csom-impatto" style="' + fieldStyle + '">' +
      '<option value="0.3">Basso</option>' +
      '<option value="0.6" selected>Medio</option>' +
      '<option value="0.9">Alto</option>' +
    '</select>' +
    '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:22px;">' +
      '<button onclick="_chiudiModaleCSO()" style="background:transparent;border:1px solid rgba(26,26,46,0.12);color:rgba(26,26,46,0.5);border-radius:10px;padding:10px 24px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;cursor:pointer;">Annulla</button>' +
      '<button onclick="_salvaModuloCSO()" style="background:#3D5AFE;color:white;border:none;border-radius:10px;padding:10px 24px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;font-weight:500;cursor:pointer;">Aggiungi</button>' +
    '</div>';

  overlay.appendChild(box);
  document.body.appendChild(overlay);
  overlay._onSalva = onSalva;

  overlay.addEventListener('click', function(e) { if (e.target === overlay) _chiudiModaleCSO(); });
  overlay._escHandler = function(e) { if (e.key === 'Escape') _chiudiModaleCSO(); };
  document.addEventListener('keydown', overlay._escHandler);

  requestAnimationFrame(function() {
    requestAnimationFrame(function() { box.style.transform='scale(1)'; box.style.opacity='1'; });
  });
  setTimeout(function() { var el=document.getElementById('csom-nome'); if(el) el.focus(); }, 50);
}

function _salvaModuloCSO() {
  var nome    = (document.getElementById('csom-nome')?.value || '').trim();
  if (!nome) { showToast('Inserisci un nome per il modulo', 'error'); return; }
  var mensile = parseInt(document.getElementById('csom-mensile')?.value) || 0;
  var setup   = parseInt(document.getElementById('csom-setup')?.value)   || 0;
  var impatto = parseFloat(document.getElementById('csom-impatto')?.value) || 0.6;
  var overlay = document.getElementById('cso-modal-overlay');
  if (overlay && overlay._onSalva) overlay._onSalva({ nome, mensile, setup, impatto });
  _chiudiModaleCSO();
}

// ── NOTE CSO ─────────────────────────────────────────────────

async function aggiungiNotaCSO(prospectId) {
  var p = prospects.find(function(x){ return x.id === prospectId; });
  if (!p) return;
  _apriModaleCSO({
    titolo:      'Nuova nota',
    sottotitolo: p.nome || '',
    placeholder: 'Scrivi la tua nota...',
    maxLen:      500,
    btnLabel:    'Salva nota',
    onSalva: async function(testo) {
      var notes = Array.isArray(p.notes_cso) ? p.notes_cso.slice() : [];
      notes.push({ ts: new Date().toISOString(), text: testo });
      try {
        await sb.from('prospects').update({ notes_cso: notes }).eq('id', prospectId);
        p.notes_cso = notes;
        showToast('Nota salvata');
        renderCSOPianoSections(p, currentCalls);
      } catch(e) {
        showToast('Errore salvataggio nota: ' + e.message, 'error');
      }
    }
  });
}

async function aggiungiAzioneCSOPiano(prospectId) {
  var p = prospects.find(function(x){ return x.id === prospectId; });
  if (!p) return;
  _apriModaleCSO({
    titolo:      'Nuova azione',
    sottotitolo: p.nome || '',
    placeholder: 'Descrivi l\'azione da completare...',
    maxLen:      300,
    btnLabel:    'Aggiungi',
    onSalva: async function(testo) {
      var azioni = Array.isArray(p.piano_azioni_cso) ? p.piano_azioni_cso.slice() : [];
      azioni.push({ id: Date.now().toString(36), testo: testo, completata: false, created_at: new Date().toISOString() });
      try {
        await sb.from('prospects').update({ piano_azioni_cso: azioni }).eq('id', prospectId);
        p.piano_azioni_cso = azioni;
        showToast('Azione aggiunta');
        renderCSOPianoSections(p, currentCalls);
      } catch(e) {
        showToast('Errore: ' + e.message, 'error');
      }
    }
  });
}

async function toggleAzioneCSOPiano(prospectId, azioneId) {
  var p = prospects.find(function(x){ return x.id === prospectId; });
  if (!p) return;
  var azioni = (Array.isArray(p.piano_azioni_cso) ? p.piano_azioni_cso : []).map(function(a) {
    return a.id === azioneId ? Object.assign({}, a, { completata: !a.completata }) : a;
  });
  try {
    await sb.from('prospects').update({ piano_azioni_cso: azioni }).eq('id', prospectId);
    p.piano_azioni_cso = azioni;
    renderCSOPianoSections(p, currentCalls);
  } catch(e) {
    showToast('Errore: ' + e.message, 'error');
  }
}

async function eliminaAzioneCSOPiano(prospectId, azioneId) {
  var p = prospects.find(function(x){ return x.id === prospectId; });
  if (!p) return;
  var azioni = (Array.isArray(p.piano_azioni_cso) ? p.piano_azioni_cso : []).filter(function(a){ return a.id !== azioneId; });
  try {
    await sb.from('prospects').update({ piano_azioni_cso: azioni }).eq('id', prospectId);
    p.piano_azioni_cso = azioni;
    showToast('Azione eliminata');
    renderCSOPianoSections(p, currentCalls);
  } catch(e) {
    showToast('Errore: ' + e.message, 'error');
  }
}

function aggiornaWhatif(prospectId, dimId, newVal) {
  var el = document.getElementById('wi-val-' + dimId);
  if (el) el.textContent = newVal + '/5';
  var p = prospects.find(function(x){ return x.id === prospectId; });
  if (!p) return;
  // Raccoglie tutti i valori correnti dagli slider
  var dimsCopy = Object.assign({}, p.dims || {});
  dimsCopy[dimId] = parseFloat(newVal);
  // Calcola score simulato
  var keys = Object.keys(dimsCopy);
  var sum  = keys.reduce(function(s, k){ return s + (dimsCopy[k] || 0); }, 0);
  var simScore = keys.length > 0 ? Math.round((sum / (keys.length * 5)) * 100) : 0;
  var el2 = document.getElementById('whatif-score-display');
  if (el2) el2.textContent = simScore;
}

async function generaReportProPDF(prospectId) {
  showToast('Generazione report in corso...');
  // Funzionalità futura: chiama /api/ai con type 'report_pdf'
  setTimeout(function() {
    showToast('Report PDF: funzionalità in arrivo nel prossimo aggiornamento.');
  }, 1500);
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
            \x3cbutton onclick="openDetailPanel('${subKey}')" class="btn-xs btn-xs-outline" style="flex-shrink:0;margin-left:8px">Approfondisci ->\x3c/button>
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
            document.getElementById('sd-${d.id}').style.color=dimColor(parseInt(this.value));
          ">
        \x3cdiv class="slider-val" id="sv-${d.id}">${v}\x3c/div>
      \x3c/div>
      \x3cdiv id="sd-${d.id}" style="font-size:11px;padding:3px 6px;border-radius:4px;
        color:${dimColor(v)};
        background:${v>=4?'rgba(0,130,95,0.08)':v>=2?'rgba(175,125,0,0.08)':'rgba(229,57,53,0.08)'};
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

function printReport() {
  var content = document.getElementById('printable-report');
  if (!content) return;
  var win = window.open('', '_blank');
  win.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Report</title>');
  win.document.write('<style>');
  win.document.write('body{font-family:Arial,Helvetica,sans-serif;color:#1a1a2e;padding:24px;max-width:800px;margin:0 auto;font-size:12px;line-height:1.5}');
  win.document.write('table{width:100%;border-collapse:collapse}td,th{padding:6px 8px;border-bottom:1px solid #e0e0e0;text-align:left;font-size:11px}');
  win.document.write('.rp-header{border-bottom:2px solid #b07d1e;padding-bottom:16px;margin-bottom:20px}');
  win.document.write('.rp-company{font-size:22px;font-weight:700;color:#1a1a2e}');
  win.document.write('.rp-sub{font-size:12px;color:#666;margin-top:4px}');
  win.document.write('.rp-score-big{font-size:48px;font-weight:700}');
  win.document.write('.rp-section{margin-top:20px;border-top:1px solid #ddd;padding-top:12px}');
  win.document.write('.rp-section-title{font-size:11px;font-weight:700;color:#b07d1e;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px}');
  win.document.write('@media print{body{padding:0}@page{margin:15mm}}');
  win.document.write('</style></head><body>');
  win.document.write(content.innerHTML);
  win.document.write('</body></html>');
  win.document.close();
  setTimeout(function() { win.print(); }, 300);
}

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
      const costo = _getCosto(settore, d.id, cur, cur + 1, p);
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
        <div style="font-size:17px;font-weight:700;color:#1A1A1A;font-family:'Plus Jakarta Sans',sans-serif">${verdictText}</div>
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
          const col = v >= 4 ? 'rgba(0,200,150,0.75)' : v >= 3 ? 'rgba(61,90,254,0.75)' : v >= 1 ? 'rgba(229,57,53,0.75)' : '#CCC';
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
          const colors = ['rgba(229,57,53,0.75)','rgba(61,90,254,0.75)','#8A6AC9'];
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
          <div style="width:28px;height:28px;border-radius:50%;background:${i === 0 ? 'rgba(140,100,25,0.75)' : '#E8E4DC'};color:${i === 0 ? '#fff' : '#888'};font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">${i+1}</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap">
              <div style="font-size:10px;color:#B8842E;letter-spacing:.06em;text-transform:uppercase;font-weight:600">${a.dim} &nbsp;${a.cur}/5 → ${a.cur+1}/5</div>
               ${a.costo ? '<div style="font-size:10px;color:#00C896;background:rgba(0,200,150,0.08);border-radius:20px;padding:1px 8px;font-weight:600">≈ ' + _formatEur(a.costo.r) + '€/mese' + (a.costo.u > 0 ? ' + ' + _formatEur(a.costo.u) + '€ setup' : '') + '</div>' : ''}
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
            <span style="font-size:11px;color:#00C896;font-weight:600">Top: ${m.top}</span>
          </div>
        </div>`).join('')}
      </div>
    </div>` : ''}

    <div class="rp-footer">
      <span>Documento riservato — preparato per ${p.nome}</span>
      <span style="color:#B8842E;font-weight:600">Leva</span>
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
      body { font-family: 'Plus Jakarta Sans', sans-serif; background: #FAFAF7; padding: 32px; }
      @media print {
        body { padding: 0; background: white; }
        @page { margin: 18mm 20mm; size: A4; }
      }
      .report-preview { background: #FAFAF7; color: #1A1A1A; max-width: 720px; margin: 0 auto; font-family: 'Plus Jakarta Sans', sans-serif; }
      .rp-header { border-bottom: 2px solid #C9973A; padding-bottom: 16px; margin-bottom: 20px; }
      .rp-company { font-size: 24px; font-family: 'Plus Jakarta Sans', sans-serif; color: #1A1A1A; }
      .rp-sub { font-size: 12px; color: #888; margin-top: 4px; }
      .rp-score-row { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; background: #F0EDE6; border-radius: 10px; padding: 16px 20px; }
      .rp-circle { width: 72px; height: 72px; border-radius: 50%; border: 3px solid; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0; }
      .rp-num { font-size: 28px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; line-height: 1; }
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
      h1, h2, h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 400; }
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
      \x3cbutton onclick="toggleMyBenchForm('${subKey}')" class="btn-xs" id="toggle-bench-${subKey}">
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

var KPI_BASE = [
  { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
  { id: 'tasso_conversione_pct', label: 'Tasso di conversione', unita: '%' },
  { id: 'ciclo_vendita_gg', label: 'Ciclo di vendita medio', unita: 'gg' },
  { id: 'nuovi_clienti_anno', label: 'Nuovi clienti / anno', unita: 'n' },
  { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
  { id: 'concentrazione_top3_pct', label: 'Concentrazione top 3 clienti', unita: '%' },
  { id: 'cac', label: 'CAC \u2014 Costo acquisizione cliente', unita: '\u20AC' },
];

var KPI_BY_SETTORE = {
  commercio_auto_moto_usato: [
    { id: 'valore_medio_ordine', label: 'Valore medio veicolo venduto', unita: '\u20AC' },
    { id: 'contratti_anno', label: 'Veicoli venduti / anno', unita: 'n' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione lead\u2192contratto', unita: '%' },
    { id: 'n_venditori', label: 'Numero venditori attuali', unita: 'n' },
    { id: 'costo_ripristino_medio', label: 'Costo medio ripristino veicolo', unita: '\u20AC' },
    { id: 'rotazione_veicoli_gg', label: 'Rotazione media veicoli', unita: 'gg' },
    { id: 'penetrazione_fi_pct', label: 'Penetrazione finanziamento', unita: '%' },
    { id: 'stock_medio', label: 'Veicoli in stock mediamente', unita: 'n' },
    { id: 'cac', label: 'CAC \u2014 Costo acquisizione cliente', unita: '\u20AC' },
  ],
  commercio_auto_moto_nuovo: [
    { id: 'valore_medio_ordine', label: 'Valore medio veicolo venduto', unita: '\u20AC' },
    { id: 'contratti_anno', label: 'Veicoli venduti / anno', unita: 'n' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione lead\u2192contratto', unita: '%' },
    { id: 'n_venditori', label: 'Numero venditori attuali', unita: 'n' },
    { id: 'penetrazione_fi_pct', label: 'Penetrazione F&I', unita: '%' },
    { id: 'stock_medio', label: 'Veicoli in stock/esposizione', unita: 'n' },
    { id: 'passaggi_showroom_mese', label: 'Visite showroom / mese', unita: 'n' },
    { id: 'cac', label: 'CAC \u2014 Costo acquisizione cliente', unita: '\u20AC' },
  ],
  manifatturiero_meccanica: [
    { id: 'valore_medio_ordine', label: 'Valore medio commessa', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione offerte', unita: '%' },
    { id: 'nuovi_clienti_anno', label: 'Nuovi clienti / anno', unita: 'n' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'n_macchine', label: 'Macchine CNC operative', unita: 'n' },
    { id: 'ore_macchina_mese', label: 'Ore macchina / mese', unita: 'n' },
    { id: 'n_commesse_mese', label: 'Commesse attive / mese', unita: 'n' },
    { id: 'concentrazione_top3_pct', label: 'Concentrazione top 3 clienti', unita: '%' },
  ],
  manifatturiero_automotive: [
    { id: 'valore_medio_ordine', label: 'Valore medio commessa OEM', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione RFQ', unita: '%' },
    { id: 'n_clienti_oem', label: 'Clienti OEM attivi', unita: 'n' },
    { id: 'n_part_number', label: 'Part number in produzione', unita: 'n' },
    { id: 'capacita_utilizzo_pct', label: 'Utilizzo capacit\u00E0 produttiva', unita: '%' },
    { id: 'concentrazione_top3_pct', label: 'Concentrazione top 3 clienti', unita: '%' },
  ],
  manifatturiero_packaging: [
    { id: 'valore_medio_ordine', label: 'Valore medio commessa', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione offerte', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'tiratura_media', label: 'Tiratura media per commessa', unita: 'n' },
    { id: 'n_clienti_gdo', label: 'Clienti GDO attivi', unita: 'n' },
    { id: 'capacita_utilizzo_pct', label: 'Utilizzo capacit\u00E0 produttiva', unita: '%' },
  ],
  manifatturiero_cterzi: [
    { id: 'valore_medio_ordine', label: 'Valore medio commessa', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione offerte', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'concentrazione_top_cliente_pct', label: 'Peso primo cliente su fatturato', unita: '%' },
    { id: 'ore_macchina_mese', label: 'Ore macchina / mese', unita: 'n' },
    { id: 'concentrazione_top3_pct', label: 'Concentrazione top 3 clienti', unita: '%' },
  ],
  manifatturiero_elettromeccanica: [
    { id: 'valore_medio_ordine', label: 'Valore medio commessa', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione offerte', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'n_commesse_mese', label: 'Commesse attive / mese', unita: 'n' },
    { id: 'backlog_mesi', label: 'Portafoglio ordini in mesi', unita: 'n' },
    { id: 'concentrazione_top3_pct', label: 'Concentrazione top 3 clienti', unita: '%' },
  ],
  manifatturiero_tessile_tessuti: [
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'n_telai', label: 'Telai operativi', unita: 'n' },
    { id: 'metri_mese', label: 'Metri prodotti / mese', unita: 'n' },
    { id: 'n_clienti_brand', label: 'Clienti brand attivi', unita: 'n' },
    { id: 'concentrazione_top3_pct', label: 'Concentrazione top 3 clienti', unita: '%' },
  ],
  manifatturiero_tessile_capi: [
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'capi_mese', label: 'Capi prodotti / mese', unita: 'n' },
    { id: 'n_clienti_brand', label: 'Clienti brand attivi', unita: 'n' },
    { id: 'pct_private_label', label: '% fatturato da private label', unita: '%' },
    { id: 'concentrazione_top3_pct', label: 'Concentrazione top 3 clienti', unita: '%' },
  ],
  servizi_it: [
    { id: 'valore_medio_ordine', label: 'Valore medio contratto', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione lead', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'n_contratti_attivi', label: 'Contratti manutenzione attivi', unita: 'n' },
    { id: 'canone_medio', label: 'Canone medio mensile/cliente', unita: '\u20AC' },
    { id: 'n_endpoint_gestiti', label: 'Endpoint/postazioni gestite', unita: 'n' },
    { id: 'arr', label: 'ARR \u2014 Fatturato ricorrente annuale', unita: '\u20AC' },
  ],
  servizi_formazione: [
    { id: 'valore_medio_ordine', label: 'Valore medio progetto formativo', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione proposte', unita: '%' },
    { id: 'corsi_anno', label: 'Corsi erogati / anno', unita: 'n' },
    { id: 'n_aziende_clienti', label: 'Aziende clienti attive', unita: 'n' },
    { id: 'fatturato_finanziato_pct', label: '% fatturato da fondi', unita: '%' },
    { id: 'arr', label: 'ARR \u2014 Fatturato ricorrente annuale', unita: '\u20AC' },
  ],
  edilizia_residenziale: [
    { id: 'valore_medio_ordine', label: 'Valore medio cantiere', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione preventivi', unita: '%' },
    { id: 'cantieri_anno', label: 'Cantieri completati / anno', unita: 'n' },
    { id: 'n_squadre', label: 'Squadre operative', unita: 'n' },
    { id: 'nuovi_clienti_anno', label: 'Nuovi clienti / anno', unita: 'n' },
  ],
  edilizia_impianti: [
    { id: 'valore_medio_ordine', label: 'Valore medio intervento', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione preventivi', unita: '%' },
    { id: 'interventi_mese', label: 'Interventi / mese', unita: 'n' },
    { id: 'n_contratti_manutenzione', label: 'Contratti manutenzione attivi', unita: 'n' },
    { id: 'n_squadre', label: 'Squadre operative', unita: 'n' },
    { id: 'arr', label: 'ARR \u2014 Ricavo ricorrente annuale', unita: '\u20AC' },
  ],
  edilizia_serramenti: [
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione preventivi', unita: '%' },
    { id: 'preventivi_mese', label: 'Preventivi / mese', unita: 'n' },
    { id: 'tasso_chiusura_pct', label: 'Tasso chiusura preventivi', unita: '%' },
    { id: 'pct_privati_vs_imprese', label: '% fatturato da privati', unita: '%' },
  ],
  commercio_distribuzione_industriale: [
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione offerte', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'n_referenze', label: 'Referenze a catalogo', unita: 'n' },
    { id: 'ordini_mese', label: 'Ordini evasi / mese', unita: 'n' },
    { id: 'consegna_media_ore', label: 'Tempo medio consegna', unita: 'ore' },
  ],
  commercio_ingrosso_alimentare: [
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'n_referenze', label: 'Referenze a catalogo', unita: 'n' },
    { id: 'n_clienti_horeca', label: 'Clienti HORECA attivi', unita: 'n' },
    { id: 'consegne_giorno', label: 'Consegne / giorno', unita: 'n' },
  ],
  commercio_materiali_edili: [
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione preventivi', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'n_referenze', label: 'Referenze a catalogo', unita: 'n' },
    { id: 'fatturato_showroom_pct', label: '% fatturato da showroom', unita: '%' },
    { id: 'consegne_mese', label: 'Consegne in cantiere / mese', unita: 'n' },
  ],
  commercio_ricambi_auto: [
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'n_officine_clienti', label: 'Officine clienti attive', unita: 'n' },
    { id: 'ordini_giorno', label: 'Ordini evasi / giorno', unita: 'n' },
    { id: 'tempo_consegna_medio_min', label: 'Tempo consegna medio', unita: 'min' },
  ],
  commercio_abbigliamento_ingrosso: [
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione', unita: '%' },
    { id: 'n_agenti', label: 'Agenti attivi', unita: 'n' },
    { id: 'n_clienti_attivi_stagione', label: 'Clienti attivi per stagione', unita: 'n' },
    { id: 'resa_campagna_pct', label: 'Resa campagna vendita', unita: '%' },
  ],
  commercio_elettronica: [
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'n_referenze', label: 'Referenze a catalogo', unita: 'n' },
    { id: 'margine_medio_pct', label: 'Margine medio per prodotto', unita: '%' },
    { id: 'rotazione_stock_gg', label: 'Rotazione stock media', unita: 'gg' },
  ],
  commercio_abbigliamento_dettaglio: [
    { id: 'scontrino_medio', label: 'Scontrino medio', unita: '\u20AC' },
    { id: 'ingressi_giorno', label: 'Ingressi / giorno', unita: 'n' },
    { id: 'tasso_conversione_negozio_pct', label: 'Conversione ingressi\u2192acquisto', unita: '%' },
    { id: 'nuovi_clienti_anno', label: 'Nuovi clienti / anno', unita: 'n' },
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
  ],
  commercio_orologi_gioielli: [
    { id: 'scontrino_medio', label: 'Scontrino medio', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Conversione visite\u2192acquisto', unita: '%' },
    { id: 'appuntamenti_mese', label: 'Appuntamenti / mese', unita: 'n' },
    { id: 'clienti_vip', label: 'Clienti top / alto spendenti', unita: 'n' },
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
  ],
  alimentare_trasformazione: [
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'n_sku', label: 'SKU attive', unita: 'n' },
    { id: 'n_insegne_gdo', label: 'Insegne GDO servite', unita: 'n' },
    { id: 'pct_private_label', label: '% fatturato private label', unita: '%' },
  ],
  alimentare_vini: [
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'bottiglie_anno', label: 'Bottiglie prodotte / anno', unita: 'n' },
    { id: 'prezzo_medio_bottiglia', label: 'Prezzo medio bottiglia', unita: '\u20AC' },
    { id: 'pct_export', label: '% fatturato export', unita: '%' },
  ],
  alimentare_forno: [
    { id: 'scontrino_medio', label: 'Scontrino medio', unita: '\u20AC' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'punti_vendita', label: 'Punti vendita propri', unita: 'n' },
    { id: 'produzione_kg_giorno', label: 'Produzione kg / giorno', unita: 'n' },
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
  ],
  alimentare_conserve: [
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'n_sku', label: 'SKU attive', unita: 'n' },
    { id: 'n_insegne_gdo', label: 'Insegne GDO servite', unita: 'n' },
    { id: 'pct_export', label: '% fatturato export', unita: '%' },
  ],
  alimentare_ingredienti: [
    { id: 'valore_medio_ordine', label: 'Valore medio fornitura', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione', unita: '%' },
    { id: 'n_clienti_industria', label: 'Clienti industria alimentare', unita: 'n' },
    { id: 'valore_medio_fornitura', label: 'Valore medio fornitura annua', unita: '\u20AC' },
    { id: 'n_certificazioni', label: 'Certificazioni attive', unita: 'n' },
  ],
  alimentare_birra: [
    { id: 'valore_medio_ordine', label: 'Valore medio ordine', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'ettolitri_anno', label: 'Ettolitri prodotti / anno', unita: 'n' },
    { id: 'n_locali_serviti', label: 'Pub/ristoranti serviti', unita: 'n' },
    { id: 'pct_taproom', label: '% fatturato da taproom/diretto', unita: '%' },
  ],
  tech_saas: [
    { id: 'mrr', label: 'MRR \u2014 Monthly Recurring Revenue', unita: '\u20AC' },
    { id: 'n_clienti_paganti', label: 'Clienti paganti attivi', unita: 'n' },
    { id: 'churn_rate_pct', label: 'Churn rate mensile', unita: '%' },
    { id: 'arr', label: 'ARR \u2014 Annual Recurring Revenue', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Conversione trial\u2192paid', unita: '%' },
    { id: 'valore_medio_ordine', label: 'ARPU mensile', unita: '\u20AC' },
  ],
  tech_system_integrator: [
    { id: 'valore_medio_ordine', label: 'Valore medio progetto', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione offerte', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'n_progetti_anno', label: 'Progetti completati / anno', unita: 'n' },
    { id: 'backlog_mesi', label: 'Portafoglio ordini in mesi', unita: 'n' },
    { id: 'arr', label: 'ARR \u2014 Fatturato ricorrente', unita: '\u20AC' },
  ],
  tech_digital_agency: [
    { id: 'valore_medio_ordine', label: 'Valore medio progetto', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione offerte', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'n_clienti_retainer', label: 'Clienti a retainer mensile', unita: 'n' },
    { id: 'canone_medio_retainer', label: 'Canone medio retainer', unita: '\u20AC' },
    { id: 'pct_ricorrente', label: '% fatturato ricorrente', unita: '%' },
  ],
  tech_automazione: [
    { id: 'valore_medio_ordine', label: 'Valore medio commessa', unita: '\u20AC' },
    { id: 'tasso_conversione_pct', label: 'Tasso conversione offerte', unita: '%' },
    { id: 'clienti_attivi', label: 'Clienti attivi', unita: 'n' },
    { id: 'n_commesse_anno', label: 'Commesse / anno', unita: 'n' },
    { id: 'backlog_mesi', label: 'Portafoglio ordini in mesi', unita: 'n' },
    { id: 'valore_medio_commessa', label: 'Valore medio commessa', unita: '\u20AC' },
  ],
};

function renderExtraTab(p) {
  var container = document.getElementById('fin-extra-content');
  if (!container) return;
  var cfg = FIN_FORMS['extra'];
  if (!cfg) return;
  var html = '<div style="padding:16px 20px"><div class="fin-section-label">' + cfg.title + '</div><div class="form-grid">';
  cfg.fields.forEach(function(f) {
    var val = p[f.id] !== null && p[f.id] !== undefined ? p[f.id] : '';
    html += buildFinField(f, val);
  });
  if (cfg.bools && cfg.bools.length) {
    cfg.bools.forEach(function(b) {
      var checked = p[b.id] ? 'checked' : '';
      html += '<div class="form-group full" style="flex-direction:row;align-items:center;gap:10px">' +
        '<input type="checkbox" id="fin-' + b.id + '" ' + checked + ' style="width:16px;height:16px;accent-color:var(--gold)">' +
        '<label style="font-size:13px;color:var(--white);text-transform:none;letter-spacing:0">' + b.label + '</label></div>';
    });
  }
  html += '</div>';
  html += '<div style="margin-top:16px"><button class="btn btn-primary" onclick="saveExtraTab()">Salva</button></div></div>';
  container.innerHTML = html;
}

async function saveExtraTab() {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;
  var cfg = FIN_FORMS['extra'];
  var updates = {};
  cfg.fields.forEach(function(f) {
    var el = document.getElementById('fin-' + f.id);
    if (!el) return;
    var val = el.value.trim();
    if (f.fmt === 'euro') updates[f.id] = val !== '' ? parseFloat(val) : null;
    else updates[f.id] = val !== '' ? val : null;
  });
  cfg.bools.forEach(function(b) {
    var el = document.getElementById('fin-' + b.id);
    if (el) updates[b.id] = el.checked;
  });
  Object.assign(p, updates);
  await sb.from('prospects').update(updates).eq('id', p.id);
  showToast('Patrimonio salvato');
}

function renderKpiTab(p) {
  var container = document.getElementById('fin-kpi-content');
  if (!container) return;
  var kpi = p.kpi_commerciali || {};
  var KPI_LIST = KPI_BY_SETTORE[p.settore] || KPI_BASE;
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
      '<p style="font-size:12px;color:var(--gray);margin-bottom:16px">Inserisci i valori reali del cliente. Vengono usati per calcolare le proiezioni di crescita.</p>' +
      '<div class="kpi-edit-grid">' + rows + '</div>' +
      '<button class="btn btn-primary" style="margin-top:16px" onclick="saveKpiTab()">Salva KPI</button>' +
    '</div>';
}

async function saveKpiTab() {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;
  var KPI_LIST = KPI_BY_SETTORE[p.settore] || KPI_BASE;
  var kpi_commerciali = {};
  KPI_LIST.forEach(function(k) {
    var el = document.getElementById('kpiedit-' + k.id);
    if (!el) return;
    var val = parseFloat(el.value);
    kpi_commerciali[k.id] = isNaN(val) ? null : val;
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
    html += `\x3cpolygon points="${tpts}" fill="rgba(61,90,254,0.08)" stroke="rgba(61,90,254,0.75)" stroke-width="1.5" stroke-dasharray="5,3"/>`;
    // Target dots
    DIMS.forEach((d, i) => {
      const v = targets_vals[d.id] || 0;
      if (!v) return;
      const [x, y] = pt(v, angles[i]);
      html += `\x3ccircle cx="${x}" cy="${y}" r="4" fill="rgba(61,90,254,0.75)" stroke="var(--bg2)" stroke-width="1.5"/>`;
    });
  }

  // Current polygon (green)
  const cpts = DIMS.map((d, i) => {
    const v = dims_vals[d.id] || 0;
    return pt(v, angles[i]).join(',');
  }).join(' ');
  html += `\x3cpolygon points="${cpts}" fill="rgba(0,200,150,0.25)" stroke="rgba(0,200,150,0.75)" stroke-width="2"/>`;
  // Current dots
  DIMS.forEach((d, i) => {
    const v = dims_vals[d.id] || 0;
    const [x, y] = pt(v, angles[i]);
    html += `\x3ccircle cx="${x}" cy="${y}" r="4" fill="rgba(0,200,150,0.75)" stroke="var(--bg2)" stroke-width="1.5"/>`;
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
      html += `\x3ctext x="${lx}" y="${startY + li * lineH}" text-anchor="${anchor}" font-size="8" fill="var(--gray)" font-family="Plus Jakarta Sans,sans-serif" font-weight="500">${line}\x3c/text>`;
    });
  });

  svg.innerHTML = html;
}

// Recupera l'azione predefinita per settore+dimensione+step
function _getAzionePredefinita(settore, dimId, fromStep, toStep) {
  const chiave = String(toStep);
  // 1. STEP_DETAIL_BY_SETTORE (fonte primaria)
  const sd = (typeof STEP_DETAIL_BY_SETTORE !== 'undefined') ? STEP_DETAIL_BY_SETTORE : {};
  const detail = sd[settore]?.[dimId]?.[chiave];
  if (detail) return detail.cosa;
  // 2. Fallback AZIONI_TARGET_BY_SETTORE (legacy)
  if (AZIONI_TARGET_BY_SETTORE[settore]?.[dimId]?.[chiave]) {
    return AZIONI_TARGET_BY_SETTORE[settore][dimId][chiave];
  }
  return null;
}

// Calcola costo di uno step dai moduli selezionati dal prospect
function calcolaCostoModuli(settore, dimId, stepKey, moduliSelezionati) {
  var detail = STEP_DETAIL_BY_SETTORE?.[settore]?.[dimId]?.[String(stepKey)];
  if (!detail || !detail.moduli) return null;
  var sel = moduliSelezionati?.[dimId]?.[String(stepKey)] || {};
  var r = 0, u = 0;

  detail.moduli.forEach(function(mod) {
    if (mod.tipo === 'flag') {
      // Flag: se selezionato (o obbligatorio di default)
      if (sel[mod.id] === true || (mod.obbligatorio && sel[mod.id] !== false)) {
        r += mod.costo_mensile || 0;
        u += mod.costo_setup || 0;
      }
    } else if (mod.tipo === 'scelta') {
      // Scelta: una variante selezionata
      var scelta = sel[mod.id];
      var varianteId = typeof scelta === 'object' ? scelta.variante : scelta;
      if (!varianteId && mod.obbligatorio && mod.varianti.length > 0) {
        varianteId = mod.varianti[0].id; // default: prima variante
      }
      if (varianteId) {
        var v = mod.varianti.find(function(x) { return x.id === varianteId; });
        if (v) { r += v.costo_mensile || 0; u += v.costo_setup || 0; }
      }
    } else if (mod.tipo === 'multi') {
      // Multi: array di varianti con quantità
      var items = sel[mod.id];
      if (Array.isArray(items)) {
        items.forEach(function(item) {
          var v = mod.varianti.find(function(x) { return x.id === item.variante; });
          if (v) {
            var qty = item.qty != null ? item.qty : 1;
            r += (v.costo_mensile || 0) * qty;
            u += (v.costo_setup || 0) * qty;
          }
        });
      }
    }
  });

  // Custom modules
  var customMods = sel._custom;
  if (Array.isArray(customMods)) {
    customMods.forEach(function(cm) {
      if (cm.attivo !== false) {
        r += cm.costo_mensile || 0;
        u += cm.costo_setup || 0;
      }
    });
  }

  return { r: r, u: u };
}

// Calcola moltiplicatore impatto dai moduli selezionati (0-1)
function calcolaImpattoModuli(settore, dimId, stepKey, moduliSelezionati) {
  var detail = STEP_DETAIL_BY_SETTORE?.[settore]?.[dimId]?.[String(stepKey)];
  if (!detail || !detail.moduli) return 1.0; // nessun modulo = impatto pieno
  var sel = moduliSelezionati?.[dimId]?.[String(stepKey)] || {};
  var totalImpatto = 0;

  detail.moduli.forEach(function(mod) {
    if (mod.tipo === 'flag') {
      if (sel[mod.id] === true || (mod.obbligatorio && sel[mod.id] !== false)) {
        totalImpatto += mod.impatto || 0;
      }
    } else if (mod.tipo === 'scelta') {
      var scelta = sel[mod.id];
      var varianteId = typeof scelta === 'object' ? scelta.variante : scelta;
      if (!varianteId && mod.obbligatorio && mod.varianti.length > 0) varianteId = mod.varianti[0].id;
      if (varianteId) {
        var v = mod.varianti.find(function(x) { return x.id === varianteId; });
        if (v) totalImpatto += v.impatto || 0;
      }
    } else if (mod.tipo === 'multi') {
      var items = Array.isArray(sel[mod.id]) ? sel[mod.id] : [];
      items.forEach(function(item) {
        var v = mod.varianti.find(function(x) { return x.id === item.variante; });
        if (v) totalImpatto += (v.impatto || 0) * (item.qty != null ? item.qty : 0);
      });
    }
  });

  // Custom modules from prospect
  var customMods = sel._custom;
  if (Array.isArray(customMods)) {
    customMods.forEach(function(cm) {
      if (cm.attivo !== false) totalImpatto += cm.impatto || 0;
    });
  }

  return Math.min(totalImpatto, 1.5); // cap a 1.5x per evitare inflazione
}

// Calcola costo default di uno step (solo moduli obbligatori, prima variante)
function calcolaCostoModuliDefault(settore, dimId, stepKey) {
  var detail = STEP_DETAIL_BY_SETTORE?.[settore]?.[dimId]?.[String(stepKey)];
  if (!detail || !detail.moduli) return null;
  var r = 0, u = 0;
  detail.moduli.forEach(function(mod) {
    if (!mod.obbligatorio) return;
    if (mod.tipo === 'flag') {
      r += mod.costo_mensile || 0;
      u += mod.costo_setup || 0;
    } else if (mod.tipo === 'scelta' && mod.varianti.length > 0) {
      r += mod.varianti[0].costo_mensile || 0;
      u += mod.varianti[0].costo_setup || 0;
    }
  });
  return { r: r, u: u };
}

function _getCosto(settore, dimId, fromStep, toStep, prospect) {
  const chiaveRange = fromStep + '-' + toStep;
  const chiaveStep = String(toStep);

  // 0. Se lo step ha moduli, usa il calcolo moduli
  const detail0 = STEP_DETAIL_BY_SETTORE?.[settore]?.[dimId]?.[chiaveStep];
  if (detail0 && detail0.moduli) {
    var moduliSel = prospect ? (prospect.moduli_selezionati || {}) : {};
    var hasSel = moduliSel[dimId] && moduliSel[dimId][chiaveStep];
    var costo = hasSel ? calcolaCostoModuli(settore, dimId, chiaveStep, moduliSel) : calcolaCostoModuliDefault(settore, dimId, chiaveStep);
    costo.impatto = calcolaImpattoModuli(settore, dimId, chiaveStep, moduliSel);
    return costo;
  }

  // 1. STEP_DETAIL_BY_SETTORE — costi specifici per micro-settore (priorità massima)
  const detail = STEP_DETAIL_BY_SETTORE?.[settore]?.[dimId]?.[chiaveRange]
              || STEP_DETAIL_BY_SETTORE?.[settore]?.[dimId]?.[chiaveStep];
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


function _calcolaPenalita(settore, dimId, targets, dims) {
  dims = dims || {};
  // Usa il sistema di dipendenze pesato per settore
  const dipendenze = _getDipendenze(settore, dimId);
  if (!dipendenze || Object.keys(dipendenze).length === 0) return 0;

  // Livello effettivo = il maggiore tra stato attuale e target
  const livelloDim = Math.max(targets[dimId] || 1, dims[dimId] || 1);

  // Gap pesato: ogni dipendenza conta in proporzione al suo peso
  let gapPesato = 0;
  let pesoTotale = 0;

  Object.entries(dipendenze).forEach(([dep, peso]) => {
    const livelloDep = Math.max(targets[dep] || 1, dims[dep] || 1);
    const gap = Math.max(0, livelloDim - livelloDep);
    gapPesato += gap * peso;
    pesoTotale += peso;
  });

  if (pesoTotale === 0) return 0;
  const gapMedioPesato = gapPesato / pesoTotale;
  const gapMax = 4;

  // Penalità esponenziale — gap piccoli impattano poco, gap grandi impattano molto
  // gapMedioPesato 0.5 → ~10%, 1 → ~20%, 2 → ~45%, 3 → ~70%, 4 → ~85%
  const penalita = 1 - Math.pow(1 - (gapMedioPesato / gapMax), 1.8);

  return Math.min(penalita, 0.85);
}

// ── IMPATTO UNITARIO AUTOMOTIVE ──────────────────────────────────────
const UNITA_PER_STEP_AUTOMOTIVE = {
  commercio_auto_moto_usato: {
    vendite: {
      '1-2': { unita_mese: 1.5,  tipo: 'auto' },
      '2-3': { unita_mese: 3.0,  tipo: 'auto' },
      '3-4': { unita_mese: 5.0,  tipo: 'auto' },
      '4-5': { unita_mese: 7.0,  tipo: 'auto' },
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
  // Normalizza chiave
  const rangeKey = String(stepKey).includes('-') ? String(stepKey) : (parseInt(stepKey) - 1) + '-' + stepKey;
  const singleKey = String(stepKey).includes('-') ? String(stepKey).split('-')[1] : String(stepKey);

  const fat = p?.fatturato_anno_1 || 1;
  const kpi = p?.kpi_commerciali || {};
  const vmo = kpi.valore_medio_ordine || kpi.scontrino_medio || null;
  const tconv = (kpi.tasso_conversione_pct || kpi.tasso_conversione_negozio_pct || 25) / 100;
  const nVenditori = kpi.n_venditori || 0;

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

  const unitaKey = SETTORE_TO_UNITA_KEY?.[settore];
  let dati = null;

  if (unitaKey === 'commercio_auto_moto_usato' || unitaKey === 'commercio_auto_moto_nuovo') {
    dati = UNITA_PER_STEP_AUTOMOTIVE?.[settore]?.[dimId]?.[rangeKey]
        || UNITA_PER_STEP_AUTOMOTIVE?.[settore]?.[dimId]?.[singleKey];
    if (!dati) return null;

    if (dati.unita_mese && vmo) {
      let unitaEff = dati.unita_mese;
      if (nVenditori > 0 && dimId === 'vendite') {
        unitaEff = dati.unita_mese * (1 / (1 + nVenditori * 0.15));
      }
      return calcPct(unitaEff * 12 * vmo / fat);
    }
    if (dati.recupero_pct) return calcPct(dati.recupero_pct * tconv);
    if (dati.contatti_mese) return calcPct(dati.contatti_mese * 12 * (dati.conv_pct || tconv) * (vmo || 10000) / fat);
    if (dati.moltiplicatore) return calcPct(dati.moltiplicatore * 0.7);
    if (dati.margine_extra_pct) return calcPct(dati.margine_extra_pct);
    if (dati.efficienza_pct) return calcPct(dati.efficienza_pct);
    if (dati.upsell_pct) {
      const penFi = kpi.penetrazione_fi_pct || 0;
      return calcPct(penFi > 30 ? dati.upsell_pct * 0.7 : dati.upsell_pct);
    }
    return null;
  }

  if (!unitaKey) return null;
  const tabella = UNITA_PER_STEP_BY_SETTORE?.[unitaKey];
  if (!tabella) return null;
  dati = tabella?.[dimId]?.[rangeKey] || tabella?.[dimId]?.[singleKey];
  if (!dati) return null;

  const vmoEff = vmo || 1000;

  switch (dati.tipo) {
    case 'ordini': {
      let ordiniEff = dati.val;
      if (nVenditori > 0 && dimId === 'vendite') ordiniEff = dati.val * (1 / (1 + nVenditori * 0.15));
      return calcPct(ordiniEff * 12 * vmoEff / fat);
    }
    case 'recupero': return calcPct(dati.val * tconv);
    case 'contatti': return calcPct(dati.val * 12 * (dati.conv || tconv) * vmoEff / fat);
    case 'pct_fat': return calcPct(dati.val);
    case 'vmo_pct': return calcPct(dati.val);
    case 'molt': return calcPct(dati.val * 0.7);
    default: return null;
  }
}
window._calcolaImpattoUnitario = _calcolaImpattoUnitario;


function getStepDetail(settore, dimId, stepKey) {
  const singleKey = String(stepKey).includes('-') ? String(stepKey).split('-')[1] : String(stepKey);
  const rangeKey = String(stepKey).includes('-') ? String(stepKey) : (parseInt(stepKey) - 1) + '-' + stepKey;
  return STEP_DETAIL_BY_SETTORE?.[settore]?.[dimId]?.[singleKey]
      || STEP_DETAIL_BY_SETTORE?.[settore]?.[dimId]?.[rangeKey]
      || null;
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
  // Dimensioni completate: target raggiunto — i costi sono stati sostenuti
  // Dimensioni completate: target raggiunto E con step_completamenti registrati (sessioni fatte)
  const sc = p.step_completamenti || {};
  const completate = DIMS_IDS.filter(id => (targets[id]||0) > 0 && (dims[id]||0) >= (targets[id]||0) && (targets[id]||0) > 1 && sc[id] && Object.keys(sc[id]).length > 0);
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
  if (attive.length === 0 && completate.length === 0) { isSuggerito = true; usaOrganica = true; }
  if (attive.length === 0 && completate.length > 0) { usaOrganica = false; }
  const attive2 = DIMS_IDS.filter(id => !usaOrganica && (targets[id]||0) > (dims[id]||0));
  if (attive2.length === 0 && completate.length === 0 && !usaOrganica) return null;

  // Calcolo costi separando ricorrenti e una tantum
  let costoRicorrenteMensile = 0;
  let costoUnaTantumTot = 0;      // somma una tantum di tutti gli step attivi
  const penalitaPerDim = {};
  const costiPerDim = {};
  if (!usaOrganica) attive.forEach(id => {
    const cur = dims[id] || 0;
    const tgt = targets[id] || 0;
    penalitaPerDim[id] = _calcolaPenalita(settore, id, targets, dims);
    let dimR = 0, dimU = 0;
    const dimSteps = [];
    for (let step = cur; step < tgt; step++) {
      const c = _getCosto(settore, id, step, step+1, p);
      const detail = getStepDetail(settore, id, String(step+1));
      if (c) {
        dimR += c.r || 0;
        dimU += c.u || 0;
        costoRicorrenteMensile += c.r || 0;
        costoUnaTantumTot      += c.u || 0;
      }
      dimSteps.push({ from: step, to: step+1, r: c ? c.r : 0, u: c ? c.u : 0, desc: detail ? detail.cosa : '' });
    }
    costiPerDim[id] = { r: dimR, u: dimU, steps: dimSteps };
  });
  // Aggiungi costi delle dimensioni completate (target raggiunto)
  completate.forEach(id => {
    if (costiPerDim[id]) return; // già calcolata come attiva
    const startDim = 1; // il piano partiva da step 1 (o dal livello iniziale salvato)
    const tgt = targets[id] || 0;
    let dimR = 0, dimU = 0;
    const dimSteps = [];
    for (let step = startDim; step < tgt; step++) {
      const c = _getCosto(settore, id, step, step+1, p);
      const detail = getStepDetail(settore, id, String(step+1));
      if (c) {
        dimR += c.r || 0;
        dimU += c.u || 0;
        costoRicorrenteMensile += c.r || 0;
        costoUnaTantumTot += c.u || 0;
      }
      dimSteps.push({ from: step, to: step+1, r: c ? c.r : 0, u: c ? c.u : 0, desc: detail ? detail.cosa : '' });
    }
    if (dimR > 0 || dimU > 0) costiPerDim[id] = { r: dimR, u: dimU, steps: dimSteps, completed: true };
  });

  // Calcolo costi BASE (stato attuale dalla diagnosi: da step 1 al livello corrente)
  let costoBaseMensile = 0;
  let costoBaseUnaTantum = 0;
  const costiBase = {};
  DIMS_IDS.forEach(id => {
    const cur = dims[id] || 0;
    if (cur <= 1) return; // step 1 = base, nessun costo
    let dimR = 0, dimU = 0;
    const dimSteps = [];
    for (let step = 1; step < cur; step++) {
      const c = _getCosto(settore, id, step, step+1, p);
      const detail = getStepDetail(settore, id, String(step+1));
      if (c) {
        dimR += c.r || 0;
        dimU += c.u || 0;
      }
      dimSteps.push({ from: step, to: step+1, r: c ? c.r : 0, u: c ? c.u : 0, desc: detail ? detail.cosa : '' });
    }
    if (dimR > 0 || dimU > 0) {
      costiBase[id] = { r: dimR, u: dimU, steps: dimSteps };
      costoBaseMensile += dimR;
      costoBaseUnaTantum += dimU;
    }
  });

  const costoMensileTot = costoRicorrenteMensile + costoBaseMensile; // base + piano

  // Calcola crescita composta con penalità
  const calcCrescitaComposta = (orizzonte) => {
    if (usaOrganica) {
      const anni = orizzonte / 12;
      return Math.min(Math.pow(1 + crescitaOrg, anni) - 1, 0.30);
    }
    const anni = orizzonte / 12;
    const floorOrganico = Math.pow(1 + crescitaOrg, anni) - 1;
    let prodotto = 1;
    // Dimensioni con lavoro ancora da fare
    attive.forEach(id => {
      const cur = dims[id] || 0;
      const tgt = targets[id] || 0;
      let contributoTot = 0;
      for (let step = cur; step < tgt; step++) {
        const stepKey = String(step + 1);
        const imp = _calcolaImpattoUnitario(settore, id, stepKey, p) || _getImpatto(settore, id, stepKey);
        if (imp) {
          const pctArr = orizzonte === 6 ? imp.pct_6m : orizzonte === 12 ? imp.pct_12m : imp.pct_24m;
          let midPct = (pctArr[0] + pctArr[1]) / 2 / 100;
          // Applica moltiplicatore impatto dai moduli selezionati
          const costoStep = _getCosto(settore, id, step, step+1, p);
          if (costoStep && costoStep.impatto != null) midPct *= costoStep.impatto;
          contributoTot += midPct;
        }
      }
      const peso = (pesi[id] || 0) / 100;
      const efficienza = 1 - (penalitaPerDim[id] || 0);
      const contributoPesato = Math.min(contributoTot * peso * efficienza, 0.95);
      prodotto *= (1 - contributoPesato);
    });
    // Dimensioni completate — il lavoro è stato fatto, la crescita è reale
    completate.forEach(id => {
      if (attive.indexOf(id) >= 0) return; // già contata
      const startStep = 1;
      const tgt = targets[id] || 0;
      let contributoTot = 0;
      for (let step = startStep; step < tgt; step++) {
        const stepKey = String(step + 1);
        const imp = _calcolaImpattoUnitario(settore, id, stepKey, p) || _getImpatto(settore, id, stepKey);
        if (imp) {
          const pctArr = orizzonte === 6 ? imp.pct_6m : orizzonte === 12 ? imp.pct_12m : imp.pct_24m;
          let midPct = (pctArr[0] + pctArr[1]) / 2 / 100;
          const costoStep = _getCosto(settore, id, step, step+1, p);
          if (costoStep && costoStep.impatto != null) midPct *= costoStep.impatto;
          contributoTot += midPct;
        }
      }
      const peso = (pesi[id] || 0) / 100;
      const contributoPesato = Math.min(contributoTot * peso, 0.95);
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
      const LABEL = {vendite:'Struttura commerciale',pipeline:'Pipeline & CRM',team:'Organizzazione',processi:'Processi & script',ricavi:'Prevedibilità ricavi',marketing:'Marketing & lead gen',sitoweb:'Sito web',ecommerce:'E-commerce & digital'};
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
  const costoPerMesi = (n) => Math.round((costoMensileTot * n + costoUnaTantumTot + costoBaseUnaTantum) / 1000) * 1000;

  // Fatturato proiettato per orizzonti estesi usando crescita composta
  // Usiamo i % di crescita calcolati e li estrapoliamo oltre 24m
  const proiettaFat = (mesi) => {
    // Tasso annuo equivalente dalla crescita totale a 24 mesi
    const tassoAnnuo = Math.pow(1 + crescita24, 0.5) - 1;
    const anni = mesi / 12;
    return [
      Math.round(fat * Math.pow(1 + tassoAnnuo * 0.82, anni) / 1000) * 1000,
      Math.round(fat * Math.pow(1 + tassoAnnuo * 1.18, anni) / 1000) * 1000
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
  const costoAnnuo = Math.round(costoMensileTot * 12 / 1000) * 1000;
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

  // ROI con beneficio cumulativo: somma dei delta annui per periodo
  const costoTot24upd = costoPerMesi(24);
  const delta6min = fat6[0] - fat, delta6max = fat6[1] - fat;
  const delta12min = fat12[0] - fat, delta12max = fat12[1] - fat;
  const delta24min = fat24[0] - fat, delta24max = fat24[1] - fat;
  // Beneficio cumulativo: delta6 × 6/12 + delta12 × 6/12 + delta24 × 12/12
  const benefCumulMin24 = delta6min * 0.5 + delta12min * 0.5 + delta24min * 1.0;
  const benefCumulMax24 = delta6max * 0.5 + delta12max * 0.5 + delta24max * 1.0;
  // ROI: costi totali (base + piano) su 24 mesi
  const costoEffettivo24 = costoPerMesi(24);
  const roiMin24 = costoEffettivo24 > 0 ? Math.round((benefCumulMin24 / costoEffettivo24) * 10) / 10 : null;
  const roiMax24 = costoEffettivo24 > 0 ? Math.round((benefCumulMax24 / costoEffettivo24) * 10) / 10 : null;

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
    costoUnaTantumTot: Math.round((costoUnaTantumTot + costoBaseUnaTantum)/100)*100,
    costoMensileTot: Math.round(costoMensileTot/100)*100,
    costoPianoMensile: Math.round(costoRicorrenteMensile/100)*100,
    costoAnnuo,
    costoTot6, costoTot24: costoTot24upd,
    // ROI e sostenibilità
    roiMin: roiMin24, roiMax: roiMax24,
    dimAttive: attive,
    costiPerDim,
    penalitaPerDim,
    alertSbilanciamento,
    sostenibilita,
    // Costi base (stato attuale dalla diagnosi)
    costiBase,
    costoBaseMensile: Math.round(costoBaseMensile/100)*100,
    costoBaseUnaTantum: Math.round(costoBaseUnaTantum/100)*100,
  };
}


// ── SCHEDA FINANZIARIA OVERLAY ─────────────────────────────────────
var _schedaTabs = ['struttura','financials','commerciale','strategico','kpi','extra'];
var _schedaTabIdx = 0;

function apriSchedaFinanziaria(tab) {
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;
  renderFinancials(p);
  renderStruttura(p);
  renderCommercialeData(p);
  renderStrategico(p);
  renderKpiTab(p);
  renderExtraTab(p);
  _schedaTabIdx = tab ? _schedaTabs.indexOf(tab) : 0;
  if (_schedaTabIdx < 0) _schedaTabIdx = 0;
  _renderSchedaTab();
  document.getElementById('scheda-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function chiudiSchedaFinanziaria() {
  if (window._calcPolling) { clearInterval(window._calcPolling); window._calcPolling = null; }
  document.getElementById('scheda-overlay').classList.remove('open');
  document.body.style.overflow = '';
  _schedaEditMode = false;
  if (currentId) renderProspectDetail(currentId);
}

function switchSchedaTab(tab, btn) {
  _schedaTabIdx = _schedaTabs.indexOf(tab);
  if (_schedaTabIdx < 0) _schedaTabIdx = 0;
  _renderSchedaTab();
}

function schedaTabNext() {
  if (_schedaTabIdx < _schedaTabs.length - 1) {
    _schedaTabIdx++;
    _renderSchedaTab();
  }
}

function schedaTabPrev() {
  if (_schedaTabIdx > 0) {
    _schedaTabIdx--;
    _renderSchedaTab();
  }
}

function _renderSchedaTab() {
  var tab = _schedaTabs[_schedaTabIdx];
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;

  document.querySelectorAll('#scheda-tabs .fin-tab').forEach(function(el, i) {
    el.classList.toggle('active', i === _schedaTabIdx);
  });

  var body = document.getElementById('scheda-body');
  if (!body) return;

  var html = '';
  var cfg = FIN_FORMS[tab];

  if (tab === 'kpi') {
    var KPI_LIST = (typeof KPI_BY_SETTORE !== 'undefined' && KPI_BY_SETTORE[p.settore]) ? KPI_BY_SETTORE[p.settore] : KPI_BASE;
    var kpi = p.kpi_commerciali || {};
    var rows = KPI_LIST.map(function(k) {
      var val = kpi[k.id];
      var hasVal = val !== null && val !== undefined && val !== '';
      return '<div class="kpi-edit-row"><label class="kpi-edit-label">' + k.label + '</label>' +
        '<div class="kpi-edit-input-wrap"><input class="form-input kpi-edit-input scheda-field" type="number" step="0.1" data-kpi-id="' + k.id + '" value="' + (hasVal ? val : '') + '" placeholder="\u2014" disabled>' +
        '<span class="kpi-edit-unit">' + k.unita + '</span></div></div>';
    }).join('');
    html = '<div style="padding:16px 20px"><div class="fin-section-label">KPI Commerciali</div><div class="kpi-edit-grid">' + rows + '</div></div>';
  } else if (tab === 'financials') {
    html = '<div style="padding:16px 20px">' + buildCalcolatricePL() + '</div>';
  } else if (tab === 'commerciale') {
    html = '<div style="padding:16px 20px">' + buildCommercialeForm(p) + '</div>';
  } else if (cfg) {
    html = '<div style="padding:16px 20px"><div class="fin-section-label">' + cfg.title + '</div><div class="form-grid">';
    cfg.fields.forEach(function(f) {
      var val = p[f.id] !== null && p[f.id] !== undefined ? p[f.id] : '';
      html += buildFinField(f, val);
    });
    if (cfg.bools && cfg.bools.length) {
      cfg.bools.forEach(function(b) {
        var checked = p[b.id] ? 'checked' : '';
        html += '<div class="form-group full" style="flex-direction:row;align-items:center;gap:10px">' +
          '<input type="checkbox" class="scheda-field" id="fin-' + b.id + '" ' + checked + ' style="width:16px;height:16px;accent-color:var(--gold)" disabled>' +
          '<label style="font-size:13px;color:var(--white);text-transform:none;letter-spacing:0">' + b.label + '</label></div>';
      });
    }
    html += '</div></div>';
  }

  body.innerHTML = html;

  // Monta la calcolatrice (createElement con listener diretti)
  if (tab === 'financials') {
    var mount = body.querySelector('#calc-mount');
    if (mount) mountCalcolatrice(mount);
  }

  // Tutte le tab partono disabilitate — Modifica le abilita
  body.querySelectorAll('input, select, textarea').forEach(function(el) {
    el.classList.add('scheda-field');
    el.disabled = true;
  });

  // Event delegation: un solo listener su scheda-body per tutti gli input
  if (!body._schedaInputBound) {
    body.addEventListener('input', function(e) {
      var id = e.target.id;
      if (!id) return;
      // Calcolatrice P&L
      if (id.startsWith('calc-')) {
        if (id === 'calc-cdv-pct') { var e2 = document.getElementById('calc-cdv-eur'); if (e2) e2.value = ''; }
        if (id === 'calc-cdv-eur') { var e2 = document.getElementById('calc-cdv-pct'); if (e2) e2.value = ''; }
        aggiornaCalcolatrice();
      }
      // Ammortamenti per categoria
      if (id.startsWith('amm-')) {
        calcolaAmmDaCategorie();
      }
    });
    body._schedaInputBound = true;
  }
  if (tab === 'financials') {
    setTimeout(aggiornaCalcolatrice, 100);
  }


  // Tutte le tab usano Modifica/Salva
  _aggiornaSchedaEditBtn(false);

  var prevBtn = document.getElementById('scheda-btn-prev');
  var nextBtn = document.getElementById('scheda-btn-next');
  if (prevBtn) {
    prevBtn.style.opacity = _schedaTabIdx === 0 ? '0.3' : '1';
    prevBtn.disabled = _schedaTabIdx === 0;
  }
  if (nextBtn) {
    if (_schedaTabIdx === _schedaTabs.length - 1) {
      nextBtn.textContent = 'Chiudi';
      nextBtn.setAttribute('onclick', 'chiudiSchedaFinanziaria()');
    } else {
      nextBtn.textContent = 'Avanti \u2192';
      nextBtn.setAttribute('onclick', 'schedaTabNext()');
    }
  }

}

var _schedaEditMode = false;

function _aggiornaSchedaEditBtn(isAlwaysEditable) {
  var existing = document.getElementById('scheda-btn-edit');
  if (existing) existing.remove();
  if (isAlwaysEditable) return;

  var footer = document.querySelector('#scheda-overlay .diagnosi-footer');
  if (!footer) return;
  var btn = document.createElement('button');
  btn.id = 'scheda-btn-edit';
  btn.style.cssText = 'border-radius:8px;padding:8px 20px;cursor:pointer;font-size:13px;font-weight:600;font-family:inherit;';
  btn.textContent = 'Modifica';
  btn.style.background = 'var(--bg3)';
  btn.style.border = '1px solid var(--gold)';
  btn.style.color = 'var(--gold)';
  btn.onclick = function() { _abilitaModificaScheda(); };
  var nextBtn = document.getElementById('scheda-btn-next');
  footer.insertBefore(btn, nextBtn);
}

function _abilitaModificaScheda() {
  var body = document.getElementById('scheda-body');
  if (!body) return;
  body.querySelectorAll('.scheda-field, input, select, textarea').forEach(function(el) {
    el.disabled = false;
    el.removeAttribute('disabled');
  });
  var tab = _schedaTabs[_schedaTabIdx];
  if (tab === 'financials') {
    // Polling: ricalcola ogni 300ms mentre la scheda è in edit
    if (window._calcPolling) clearInterval(window._calcPolling);
    window._calcPolling = setInterval(function() {
      if (!_schedaEditMode || _schedaTabs[_schedaTabIdx] !== 'financials') {
        clearInterval(window._calcPolling);
        window._calcPolling = null;
        return;
      }
      aggiornaCalcolatrice();
    }, 300);
    setTimeout(aggiornaCalcolatrice, 50);
  }
  var btn = document.getElementById('scheda-btn-edit');
  if (btn) {
    btn.textContent = 'Salva';
    btn.style.background = '#00C896';
    btn.style.border = 'none';
    btn.style.color = '#fff';
    btn.onclick = function() { _salvaSchedaTab(); };
  }
  _schedaEditMode = true;
}

function _salvaSchedaTab() {
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;
  var tab = _schedaTabs[_schedaTabIdx];
  var body = document.getElementById('scheda-body');
  if (!body) return;

  if (tab === 'kpi') {
    var KPI_LIST = (typeof KPI_BY_SETTORE !== 'undefined' && KPI_BY_SETTORE[p.settore]) ? KPI_BY_SETTORE[p.settore] : KPI_BASE;
    var kpi = {};
    body.querySelectorAll('[data-kpi-id]').forEach(function(el) {
      var val = parseFloat(el.value);
      kpi[el.getAttribute('data-kpi-id')] = isNaN(val) ? null : val;
    });
    p.kpi_commerciali = kpi;
    sb.from('prospects').update({ kpi_commerciali: kpi }).eq('id', p.id);
  } else if (tab === 'financials') {
    if (typeof salvaDaCalcolatrice === 'function') salvaDaCalcolatrice();
  } else if (tab === 'commerciale') {
    if (typeof saveCommercialeForm === 'function') saveCommercialeForm();
  } else {
    var cfg = FIN_FORMS[tab];
    if (!cfg) return;
    var updates = {};
    cfg.fields.forEach(function(f) {
      var el = body.querySelector('#fin-' + f.id);
      if (!el || f.readonly) return;
      var val = el.value.trim();
      if (f.fmt === 'euro' || f.fmt === 'pct') updates[f.id] = val !== '' ? parseFloat(val) : null;
      else if (f.fmt === 'int' || f.fmt === 'year') updates[f.id] = val !== '' ? parseInt(val) : null;
      else if (f.fmt === 'forma_giuridica') updates[f.id] = val !== '' ? val : null;
      else updates[f.id] = val !== '' ? val : null;
    });
    if (cfg.bools) cfg.bools.forEach(function(b) {
      var el = body.querySelector('#fin-' + b.id);
      if (el) updates[b.id] = el.checked;
    });
    Object.assign(p, updates);
    sb.from('prospects').update(updates).eq('id', p.id);
  }

  showToast('Salvato!');
  body.querySelectorAll('input, select, textarea').forEach(function(el) { el.disabled = true; });
  var btn = document.getElementById('scheda-btn-edit');
  if (btn) {
    btn.textContent = 'Modifica';
    btn.style.background = 'var(--bg3)';
    btn.style.border = '1px solid var(--gold)';
    btn.style.color = 'var(--gold)';
    btn.onclick = function() { _abilitaModificaScheda(); };
  }
  _schedaEditMode = false;
}

// ── DETAIL OVERLAY (popup dettagli costi e ROI) ──────────────────────
function chiudiDetailOverlay() {
  document.getElementById('detail-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

async function toggleSostenibilita(checked) {
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;
  p.ignora_sostenibilita = checked;
  try { await sb.from('prospects').update({ ignora_sostenibilita: checked }).eq('id', p.id); } catch(e) {}
  if (checked) showToast('Avviso sostenibilità disattivato');
}

function apriDettaglioCosti() {
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;
  var ic = _calcolaImpattoCumulativo(p);
  if (!ic) {
    showToast('Inserisci fatturato e settore per vedere i costi', 'error');
    return;
  }
  var settore = p.settore || '';
  var fmtV = function(v) { return v ? v.toLocaleString('it-IT') + '\u20AC' : '\u2014'; };
  var LABEL = {vendite:'Vendite',pipeline:'Pipeline',team:'Team',processi:'Processi',ricavi:'Ricavi',marketing:'Marketing',sitoweb:'Sito Web',ecommerce:'Approvv.'};
  var sd = (typeof STEP_DETAIL_BY_SETTORE !== 'undefined') ? STEP_DETAIL_BY_SETTORE : {};
  ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'].forEach(function(id) {
    var lbl = sd[settore]?.[id]?._label;
    if (lbl) LABEL[id] = lbl;
  });

  var hasPianoCosti = (ic.costoPianoMensile || 0) > 0;
  var costiBase = ic.costiBase || {};
  var costiPiano = ic.costiPerDim || {};
  var totalR = ic.costoMensileTot || ic.costoBaseMensile || 0;
  var totalU = ic.costoUnaTantumTot || 0;
  var titolo = hasPianoCosti ? 'Dettaglio costi totali' : 'Costi struttura commerciale attuale';
  var sottotitolo = hasPianoCosti ? 'Struttura attuale + investimento piano' : 'Costi attuali derivanti dalla diagnosi';

  var _renderSezione = function(costiDim, sectionTitle) {
    var entries = Object.entries(costiDim);
    if (entries.length === 0) return '';
    var sectionR = 0;
    var rows = entries.map(function(e) {
      var id = e[0], data = e[1];
      sectionR += data.r || 0;
      var stepsHtml = data.steps.map(function(s) {
        return '<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid var(--border)">' +
          '<div style="font-size:11px;color:var(--gray);flex:1">Step ' + s.to + ': ' + (s.desc || '\u2014') + '</div>' +
          '<div style="font-size:11px;color:var(--white);white-space:nowrap;margin-left:12px">' + fmtV(s.r) + '/mese' + (s.u > 0 ? ' + ' + fmtV(s.u) + ' setup' : '') + '</div>' +
        '</div>';
      }).join('');
      return '<div style="margin-bottom:12px">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">' +
          '<div style="font-size:12px;font-weight:600;color:var(--white)">' + (LABEL[id]||id) + '</div>' +
          '<div style="font-size:11px;font-weight:600;color:rgb(40,75,160)">' + fmtV(data.r) + '/mese</div>' +
        '</div>' +
        stepsHtml +
      '</div>';
    }).join('');
    return '<div style="margin-bottom:16px">' +
      '<div style="font-size:10px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid var(--border)">' + sectionTitle + ' \u00B7 ' + fmtV(sectionR) + '/mese</div>' +
      rows +
    '</div>';
  };

  var rows = '';
  if (hasPianoCosti) {
    rows += _renderSezione(costiBase, 'Costi struttura attuale');
    rows += _renderSezione(costiPiano, 'Investimento piano di crescita');
  } else {
    rows += _renderSezione(costiBase, 'Costi struttura attuale');
  }

  var html = rows +
    '<div style="border-top:2px solid var(--border);padding-top:12px;margin-top:8px;display:flex;justify-content:space-between">' +
      '<div style="font-size:14px;font-weight:700;color:var(--white)">Totale</div>' +
      '<div style="text-align:right">' +
        '<div style="font-size:14px;font-weight:700;color:rgb(40,75,160)">' + fmtV(totalR) + '/mese</div>' +
        (totalU > 0 ? '<div style="font-size:11px;color:var(--gray)">+ ' + fmtV(totalU) + ' una tantum</div>' : '') +
        '<div style="font-size:11px;color:var(--gray)">' + fmtV(totalR * 12) + '/anno</div>' +
      '</div>' +
    '</div>';

  document.getElementById('detail-overlay-title').textContent = titolo;
  document.getElementById('detail-overlay-subtitle').textContent = sottotitolo;
  document.getElementById('detail-overlay-body').innerHTML = html;
  document.getElementById('detail-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ── SISTEMA CAPITOLI ──────────────────────────────────────────
var _currentCapitoloView = -1; // -1 = attuale, 0+ = indice capitolo archiviato

function renderCapitoliTabs(p) {
  var container = document.getElementById('capitoli-tabs');
  if (!container) return;
  var capitoli = p.capitoli || [];
  var html = '';
  var hasDims = p.dims && Object.keys(p.dims).length > 0;

  // Mostra tabs se il prospect ha dimensioni (diagnosi fatta)
  if (!hasDims && capitoli.length === 0) { container.innerHTML = ''; return; }

  // Tab capitoli archiviati (folder style)
  capitoli.forEach(function(cap, idx) {
    var label = cap.periodo || 'Cap. ' + (idx + 1);
    var isActive = _currentCapitoloView === idx;
    var canDelete = idx > 0; // il primo capitolo (originale) non si cancella mai
    html += '<div class="folder-tab' + (isActive ? ' active' : '') + '" onclick="switchCapitoloView(' + idx + ')">' +
      '<span class="tab-dot"></span>' + label +
      (canDelete ? '<span class="folder-tab-delete" onclick="event.stopPropagation();eliminaCapitolo(' + idx + ')" title="Elimina capitolo">&times;</span>' : '') +
      '</div>';
  });

  // Tab capitolo attuale
  if (hasDims) {
    var isAttuale = _currentCapitoloView === -1;
    var startLabel = 'Attuale';
    if (capitoli.length > 0) {
      var lastCap = capitoli[capitoli.length - 1];
      if (lastCap.data_fine) {
        startLabel = new Date(lastCap.data_fine).toLocaleDateString('it-IT', {month:'short', year:'numeric'}) + ' \u2192 oggi';
      }
    }
    var canDeleteAttuale = capitoli.length > 0; // cancellabile se non è il capitolo originale
    html += '<div class="folder-tab' + (isAttuale ? ' active-green' : '') + '" onclick="switchCapitoloView(-1)">' +
      '<span class="tab-dot"></span>' + startLabel +
      (canDeleteAttuale ? '<span class="folder-tab-delete" onclick="event.stopPropagation();eliminaCapitoloAttuale()" title="Elimina capitolo attuale">&times;</span>' : '') +
      '</div>';
  }

  // Bottone + sempre visibile alla destra dell'ultimo tab
  html += '<div class="folder-tab-new" onclick="nuovoCapitolo()" title="Nuovo capitolo di crescita">+</div>';

  container.innerHTML = html;
}

// Dati reali del prospect, salvati quando si visualizza un capitolo archiviato
var _realProspectData = null;
var _isCapitoloReadOnly = false;

function switchCapitoloView(idx) {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;

  // Se stavamo visualizzando un archivio, ripristina i dati reali prima
  if (_realProspectData && _currentCapitoloView >= 0) {
    Object.assign(p, _realProspectData);
    _realProspectData = null;
  }

  _currentCapitoloView = idx;

  if (idx === -1) {
    // Torna alla vista attuale — re-render completo con dati reali
    _isCapitoloReadOnly = false;
    renderProspectDetail(currentId);
    return;
  }
  _isCapitoloReadOnly = true;

  // Visualizza capitolo archiviato
  var capitoli = p.capitoli || [];
  if (!capitoli[idx]) return;
  var cap = capitoli[idx];

  // Salva i dati reali
  _realProspectData = {
    dims: p.dims ? JSON.parse(JSON.stringify(p.dims)) : {},
    targets: p.targets ? JSON.parse(JSON.stringify(p.targets)) : {},
    score_history: p.score_history ? JSON.parse(JSON.stringify(p.score_history)) : [],
    proiezione_snapshot: p.proiezione_snapshot ? JSON.parse(JSON.stringify(p.proiezione_snapshot)) : null,
    fatturato_anno_1: p.fatturato_anno_1,
    fatturato_checkpoints: p.fatturato_checkpoints ? JSON.parse(JSON.stringify(p.fatturato_checkpoints)) : {},
    step_completamenti: p.step_completamenti ? JSON.parse(JSON.stringify(p.step_completamenti)) : {},
    stato: p.stato,
  };

  // Sovrapponi i dati del capitolo archiviato
  p.dims = cap.dims || {};
  p.targets = cap.targets || {};
  p.score_history = cap.score_history || [];
  p.proiezione_snapshot = cap.proiezione_snapshot || null;
  p.fatturato_anno_1 = cap.fatturato_finale || cap.fatturato_iniziale || p.fatturato_anno_1;
  p.fatturato_checkpoints = cap.fatturato_checkpoints || {};
  p.step_completamenti = cap.step_completamenti || {};
  p.stato = cap.stato || 'chiuso';

  // Re-render completo — la pagina apparirà identica a come era
  renderProspectDetail(currentId);
}

async function nuovoCapitolo() {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;
  if (!confirm('Archivia il capitolo attuale e inizia un nuovo piano di crescita?\n\nI dati attuali vengono salvati nello storico.')) return;

  var capitoli = p.capitoli || [];
  var oggi = new Date().toISOString();

  // Trova data inizio (dalla fine dell'ultimo capitolo o dalla prima diagnosi)
  var dataInizio = '';
  if (capitoli.length > 0) {
    dataInizio = capitoli[capitoli.length - 1].data_fine || '';
  } else if (p.score_history && p.score_history.length > 0) {
    dataInizio = p.score_history[0].data || '';
  }

  var periodoLabel = '';
  if (dataInizio) {
    periodoLabel = new Date(dataInizio).toLocaleDateString('it-IT', {month:'short', year:'numeric'}) +
      ' \u2013 ' + new Date().toLocaleDateString('it-IT', {month:'short', year:'numeric'});
  } else {
    periodoLabel = 'fino a ' + new Date().toLocaleDateString('it-IT', {month:'short', year:'numeric'});
  }

  // Archivia capitolo corrente
  // Calcola data fine reale dall'ultimo step completato
  var stepComp = p.step_completamenti || {};
  var ultimaData = oggi;
  Object.values(stepComp).forEach(function(dim) {
    Object.values(dim).forEach(function(d) {
      if (d && d > ultimaData) ultimaData = d;
    });
  });

  // Calcola durata
  var dataInizioDate = new Date(dataInizio || oggi);
  var dataFineDate = new Date(ultimaData);
  var durataGiorni = Math.round((dataFineDate - dataInizioDate) / 86400000);
  var durataMesi = Math.round(durataGiorni / 30);

  // Fatturato iniziale (dallo snapshot) e finale (attuale)
  var snap = p.proiezione_snapshot;
  var fatturatoIniziale = snap ? snap.fatturato_base : p.fatturato_anno_1;
  var fatturatoFinale = p.fatturato_anno_1;
  var deltaFatturato = fatturatoFinale && fatturatoIniziale ? fatturatoFinale - fatturatoIniziale : null;
  var deltaPct = fatturatoIniziale > 0 && deltaFatturato !== null ? Math.round(deltaFatturato / fatturatoIniziale * 100) : null;

  var capitoloChiuso = {
    periodo: periodoLabel,
    data_inizio: dataInizio || oggi,
    data_fine: ultimaData,
    durata_giorni: durataGiorni,
    durata_mesi: durataMesi,
    dims_iniziali: snap ? snap.dims_partenza : {},
    dims: {...(p.dims || {})},
    targets: {...(p.targets || {})},
    step_completamenti: {...stepComp},
    score_history: [...(p.score_history || [])],
    fatturato_iniziale: fatturatoIniziale,
    fatturato_finale: fatturatoFinale,
    delta_fatturato: deltaFatturato,
    delta_pct: deltaPct,
    proiezione_snapshot: p.proiezione_snapshot || null,
    fatturato_checkpoints: p.fatturato_checkpoints || {},
    score_finale: calcScore(p),
    stato: p.stato || 'chiuso',
  };

  capitoli.push(capitoloChiuso);

  // Reset per nuovo capitolo: mantieni dims (livello raggiunto), azzera target, stato torna a contattato
  var updates = {
    capitoli: capitoli,
    targets: {},
    target_scadenze: {},
    score_history: [],
    proiezione_snapshot: null,
    fatturato_checkpoints: {},
    step_completamenti: {},
    stato: 'contattato',
  };

  try {
    await sb.from('prospects').update(updates).eq('id', p.id);
  } catch(e) {
    // Se fallisce per campi mancanti, salva solo capitoli, targets e stato
    try { await sb.from('prospects').update({ capitoli: capitoli, targets: {}, target_scadenze: {}, stato: 'contattato' }).eq('id', p.id); } catch(e2) {}
  }

  Object.assign(p, updates);
  showToast('Nuovo capitolo iniziato!');
  renderProspectDetail(currentId);
}

async function eliminaCapitolo(idx) {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;
  var capitoli = p.capitoli || [];
  if (!capitoli[idx]) return;
  var label = capitoli[idx].periodo || 'Capitolo ' + (idx + 1);
  if (!confirm('Eliminare definitivamente il capitolo "' + label + '"?\n\nQuesta azione non è reversibile.')) return;

  capitoli.splice(idx, 1);
  try {
    await sb.from('prospects').update({ capitoli: capitoli }).eq('id', p.id);
  } catch(e) {}
  p.capitoli = capitoli;

  // Se stavamo visualizzando il capitolo eliminato, torna ad Attuale
  if (_currentCapitoloView === idx) {
    _currentCapitoloView = -1;
    _isCapitoloReadOnly = false;
    if (_realProspectData) { Object.assign(p, _realProspectData); _realProspectData = null; }
  } else if (_currentCapitoloView > idx) {
    _currentCapitoloView--;
  }

  showToast('Capitolo "' + label + '" eliminato');
  renderProspectDetail(currentId);
}

async function eliminaCapitoloAttuale() {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;
  var capitoli = p.capitoli || [];
  if (capitoli.length === 0) { showToast('Questo è il capitolo originale, non si può eliminare', 'error'); return; }
  if (!confirm('Eliminare il capitolo attuale e tornare al capitolo precedente?\n\nI dati del capitolo attuale andranno persi.')) return;

  // Ripristina i dati dall'ultimo capitolo archiviato
  var lastCap = capitoli[capitoli.length - 1];
  var restore = {
    dims: lastCap.dims || {},
    targets: lastCap.targets || {},
    score_history: lastCap.score_history || [],
    proiezione_snapshot: lastCap.proiezione_snapshot || null,
    fatturato_anno_1: lastCap.fatturato_finale || lastCap.fatturato_iniziale || p.fatturato_anno_1,
    fatturato_checkpoints: lastCap.fatturato_checkpoints || {},
    step_completamenti: lastCap.step_completamenti || {},
    stato: 'chiuso', // torna allo stato del capitolo archiviato
  };

  // Rimuovi l'ultimo archivio (torna ad essere il capitolo attivo)
  capitoli.pop();
  restore.capitoli = capitoli;

  try {
    await sb.from('prospects').update(restore).eq('id', p.id);
  } catch(e) {
    try { await sb.from('prospects').update({ capitoli: capitoli }).eq('id', p.id); } catch(e2) {}
  }

  Object.assign(p, restore);
  _currentCapitoloView = -1;
  _isCapitoloReadOnly = false;
  _realProspectData = null;
  showToast('Capitolo attuale eliminato, ripristinato il precedente');
  renderProspectDetail(currentId);
}

function chiudiCapitoliOverlay() {
  document.getElementById('capitoli-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function apriCapitoliOverlay(idxIniziale) {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;
  var capitoli = p.capitoli || [];
  if (capitoli.length === 0 && !(p.dims && Object.keys(p.dims).length > 0)) {
    showToast('Nessun capitolo disponibile', 'error');
    return;
  }

  document.getElementById('capitoli-overlay-title').textContent = p.nome + ' \u2014 Capitoli';

  // Render tabs
  var tabsHtml = '';
  capitoli.forEach(function(cap, idx) {
    var isActive = idx === (idxIniziale !== undefined ? idxIniziale : 0);
    tabsHtml += '<div onclick="switchCapitolo(' + idx + ')" style="padding:5px 12px;font-size:11px;border-radius:8px;cursor:pointer;white-space:nowrap;' +
      (isActive ? 'background:rgba(70,100,200,0.15);border:1px solid rgba(70,100,200,0.3);color:rgba(70,100,200,0.9);font-weight:600' : 'background:rgba(0,0,0,0.04);border:1px solid rgba(0,0,0,0.06);color:var(--gray);font-weight:500') +
      '">' + (cap.periodo || 'Cap. ' + (idx+1)) + '</div>';
  });

  // Tab "Attuale"
  var hasDims = p.dims && Object.keys(p.dims).length > 0;
  if (hasDims) {
    var isAttuale = idxIniziale === -1 || (idxIniziale === undefined && capitoli.length === 0);
    tabsHtml += '<div onclick="switchCapitolo(-1)" style="padding:5px 12px;font-size:11px;border-radius:8px;cursor:pointer;white-space:nowrap;' +
      (isAttuale ? 'background:rgba(0,200,150,0.15);border:1px solid rgba(0,200,150,0.3);color:rgba(0,200,150,0.9);font-weight:600' : 'background:rgba(0,0,0,0.04);border:1px solid rgba(0,0,0,0.06);color:var(--gray);font-weight:500') +
      '">Attuale</div>';
  }

  document.getElementById('capitoli-overlay-tabs').innerHTML = tabsHtml;

  // Render contenuto
  var idx = idxIniziale !== undefined ? idxIniziale : (capitoli.length > 0 ? 0 : -1);
  _renderCapitoloContent(p, idx);

  document.getElementById('capitoli-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function switchCapitolo(idx) {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return;

  // Aggiorna tabs attive
  var capitoli = p.capitoli || [];
  var tabs = document.getElementById('capitoli-overlay-tabs');
  if (tabs) {
    var children = tabs.children;
    for (var i = 0; i < children.length; i++) {
      var isThis = (i < capitoli.length && i === idx) || (i === children.length - 1 && idx === -1);
      if (isThis) {
        children[i].style.background = idx === -1 ? 'rgba(0,200,150,0.15)' : 'rgba(70,100,200,0.15)';
        children[i].style.borderColor = idx === -1 ? 'rgba(0,200,150,0.3)' : 'rgba(70,100,200,0.3)';
        children[i].style.color = idx === -1 ? 'rgba(0,200,150,0.9)' : 'rgba(70,100,200,0.9)';
        children[i].style.fontWeight = '600';
      } else {
        children[i].style.background = 'rgba(0,0,0,0.04)';
        children[i].style.borderColor = 'rgba(0,0,0,0.06)';
        children[i].style.color = 'var(--gray)';
        children[i].style.fontWeight = '500';
      }
    }
  }

  _renderCapitoloContent(p, idx);
}

function _renderCapitoloContent(p, idx) {
  var body = document.getElementById('capitoli-overlay-body');
  if (!body) return;
  var fmtF = function(v) { return v >= 1000000 ? (v/1000000).toFixed(1)+'M' : Math.round(v/1000)+'k'; };
  var DIMS_IDS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  var settore = p.settore || '';

  // Capitolo attuale
  if (idx === -1) {
    var targets = p.targets || {};
    var dims = p.dims || {};
    var hasTargets = DIMS_IDS.some(function(id){ return (targets[id]||0) > 0; });
    var snap = p.proiezione_snapshot;
    var fat = p.fatturato_anno_1 || 0;
    var sc = calcScore(p);

    var dimsHtml = DIMS_IDS.map(function(id) {
      var cur = dims[id] || 0;
      var tgt = targets[id] || 0;
      var label = typeof getDimLabel === 'function' ? getDimLabel(settore, id) : id;
      var desc = typeof _getStepDesc === 'function' ? _getStepDesc(settore, id, Math.max(cur, 1)) : '';
      return '<div style="padding:8px 0;border-bottom:1px solid var(--border)">' +
        '<div style="display:flex;align-items:center;justify-content:space-between">' +
          '<div style="font-size:12px;font-weight:600;color:var(--text)">' + label + '</div>' +
          '<div style="font-size:12px;font-weight:600;color:var(--text)">' + cur + '/5' + (tgt > cur ? ' \u2192 target ' + tgt : '') + '</div>' +
        '</div>' +
        (desc && desc !== '\u2014' ? '<div style="font-size:10px;color:var(--gray);margin-top:2px">' + desc + '</div>' : '') +
      '</div>';
    }).join('');

    body.innerHTML = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">' +
      '<div style="background:rgba(0,0,0,0.03);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:var(--gray);text-transform:uppercase;margin-bottom:4px">Fatturato</div><div style="font-size:18px;font-weight:700;color:var(--text)">' + (fat ? fmtF(fat) + '\u20AC' : '\u2014') + '</div></div>' +
      '<div style="background:rgba(0,0,0,0.03);border-radius:10px;padding:12px;text-align:center"><div style="font-size:9px;color:var(--gray);text-transform:uppercase;margin-bottom:4px">Score</div><div style="font-size:18px;font-weight:700;color:var(--text)">' + sc + '/100</div></div>' +
    '</div>' +
    '<div style="font-size:10px;font-weight:600;color:var(--gray);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Dimensioni</div>' +
    dimsHtml;
    return;
  }

  // Capitolo archiviato
  var capitoli = p.capitoli || [];
  if (!capitoli[idx]) { body.innerHTML = ''; return; }
  var cap = capitoli[idx];

  var durataStr = cap.durata_mesi ? cap.durata_mesi + ' mesi' : (cap.durata_giorni ? cap.durata_giorni + ' giorni' : '\u2014');
  var fatIniziale = cap.fatturato_iniziale || cap.fatturato_anno_1;
  var fatFinale = cap.fatturato_finale || cap.fatturato_anno_1;
  var deltaCol = cap.delta_pct > 0 ? '#00C896' : cap.delta_pct < 0 ? 'rgba(229,57,53,0.8)' : 'var(--text)';

  var dimsHtml = (function() {
    var sc = cap.step_completamenti || {};
    return DIMS_IDS.map(function(id) {
      var d = cap.dims[id] || 0;
      var t = cap.targets[id] || 0;
      var di = cap.dims_iniziali ? (cap.dims_iniziali[id] || 0) : 0;
      var raggiunto = d >= t && t > 0;
      var label = typeof getDimLabel === 'function' ? getDimLabel(settore, id) : id;
      var dataComp = '';
      if (sc[id]) {
        var ultime = Object.values(sc[id]).sort();
        if (ultime.length > 0) dataComp = new Date(ultime[ultime.length-1]).toLocaleDateString('it-IT', {day:'2-digit', month:'short', year:'numeric'});
      }
      var desc = typeof _getStepDesc === 'function' ? _getStepDesc(settore, id, Math.max(d, 1)) : '';
      return '<div style="padding:8px 0;border-bottom:1px solid var(--border)">' +
        '<div style="display:flex;align-items:center;justify-content:space-between">' +
          '<div style="font-size:12px;font-weight:600;color:var(--text)">' + label + '</div>' +
          '<div style="display:flex;align-items:center;gap:8px">' +
            (dataComp ? '<span style="font-size:10px;color:var(--gray)">' + dataComp + '</span>' : '') +
            '<span style="font-size:12px;font-weight:600;color:' + (raggiunto ? 'rgba(0,200,150,0.8)' : 'var(--text)') + '">' +
              di + ' \u2192 ' + d + '/5' + (raggiunto ? ' \u2713' : '') +
            '</span>' +
          '</div>' +
        '</div>' +
        (desc && desc !== '\u2014' ? '<div style="font-size:10px;color:var(--gray);margin-top:2px">' + desc + '</div>' : '') +
      '</div>';
    }).join('');
  })();

  var historyHtml = (cap.score_history || []).reverse().map(function(s) {
    return '<div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--gray);padding:3px 0;border-bottom:1px solid var(--border)">' +
      '<span>' + s.evento + '</span>' +
      '<span>' + new Date(s.data).toLocaleDateString('it-IT', {day:'2-digit', month:'short', year:'numeric'}) + ' \u00B7 Score ' + s.score + '</span>' +
    '</div>';
  }).join('');

  body.innerHTML = '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px">' +
    '<div style="background:rgba(0,0,0,0.03);border-radius:10px;padding:12px;text-align:center">' +
      '<div style="font-size:9px;color:var(--gray);text-transform:uppercase;margin-bottom:4px">Durata</div>' +
      '<div style="font-size:16px;font-weight:700;color:var(--text)">' + durataStr + '</div>' +
      '<div style="font-size:10px;color:var(--gray)">' + (cap.periodo || '') + '</div>' +
    '</div>' +
    '<div style="background:rgba(0,0,0,0.03);border-radius:10px;padding:12px;text-align:center">' +
      '<div style="font-size:9px;color:var(--gray);text-transform:uppercase;margin-bottom:4px">Fatturato</div>' +
      '<div style="font-size:14px;font-weight:700;color:var(--text)">' + (fatIniziale ? fmtF(fatIniziale) : '\u2014') + ' \u2192 ' + (fatFinale ? fmtF(fatFinale) : '\u2014') + '\u20AC</div>' +
      (cap.delta_pct !== null && cap.delta_pct !== undefined ? '<div style="font-size:11px;font-weight:600;color:' + deltaCol + '">' + (cap.delta_pct >= 0 ? '+' : '') + cap.delta_pct + '%</div>' : '') +
    '</div>' +
    '<div style="background:rgba(0,0,0,0.03);border-radius:10px;padding:12px;text-align:center">' +
      '<div style="font-size:9px;color:var(--gray);text-transform:uppercase;margin-bottom:4px">Score finale</div>' +
      '<div style="font-size:16px;font-weight:700;color:var(--text)">' + (cap.score_finale || '\u2014') + '/100</div>' +
    '</div>' +
  '</div>' +
  '<div style="font-size:10px;font-weight:600;color:var(--gray);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Dimensioni</div>' +
  dimsHtml +
  (historyHtml ? '<div style="margin-top:14px;font-size:10px;font-weight:600;color:var(--gray);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Timeline attivit\u00E0</div>' + historyHtml : '');
}

// Vecchio popup semplificato (manteniamo per compatibilità)
function apriCapitolo(idx) {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p || !p.capitoli || !p.capitoli[idx]) return;
  var cap = p.capitoli[idx];

  var fmtF = function(v) { return v >= 1000000 ? (v/1000000).toFixed(1)+'M' : Math.round(v/1000)+'k'; };
  var DIMS_IDS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  var settore = p.settore || '';

  var dimsHtml = DIMS_IDS.map(function(id) {
    var d = cap.dims[id] || 0;
    var t = cap.targets[id] || 0;
    var raggiunto = d >= t && t > 0;
    var label = typeof getDimLabel === 'function' ? getDimLabel(settore, id) : id;
    return '<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border)">' +
      '<div style="font-size:12px;color:var(--text)">' + label + '</div>' +
      '<div style="font-size:12px;font-weight:600;color:' + (raggiunto ? 'rgba(0,200,150,0.8)' : 'var(--text)') + '">' +
        d + '/5' + (t > 0 ? ' (target ' + t + ')' : '') + (raggiunto ? ' \u2713' : '') +
      '</div>' +
    '</div>';
  }).join('');

  var historyHtml = (cap.score_history || []).slice(-5).reverse().map(function(s) {
    return '<div style="font-size:11px;color:var(--gray);padding:2px 0">' +
      new Date(s.data).toLocaleDateString('it-IT', {day:'2-digit', month:'short'}) +
      ' \u00B7 ' + s.evento + ' \u00B7 Score ' + s.score + '/100</div>';
  }).join('');

  // Riepilogo periodo
  var durataStr = cap.durata_mesi ? cap.durata_mesi + ' mesi' : (cap.durata_giorni ? cap.durata_giorni + ' giorni' : '\u2014');
  var fatIniziale = cap.fatturato_iniziale || cap.fatturato_anno_1;
  var fatFinale = cap.fatturato_finale || cap.fatturato_anno_1;
  var deltaCol = cap.delta_pct > 0 ? '#00C896' : cap.delta_pct < 0 ? 'rgba(229,57,53,0.8)' : 'var(--text)';

  var html = '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px">' +
    '<div style="background:rgba(0,0,0,0.03);border-radius:10px;padding:10px;text-align:center">' +
      '<div style="font-size:9px;color:var(--gray);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px">Durata</div>' +
      '<div style="font-size:16px;font-weight:700;color:var(--text)">' + durataStr + '</div>' +
    '</div>' +
    '<div style="background:rgba(0,0,0,0.03);border-radius:10px;padding:10px;text-align:center">' +
      '<div style="font-size:9px;color:var(--gray);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px">Fatturato</div>' +
      '<div style="font-size:14px;font-weight:700;color:var(--text)">' + (fatIniziale ? fmtF(fatIniziale) : '\u2014') + ' \u2192 ' + (fatFinale ? fmtF(fatFinale) : '\u2014') + '\u20AC</div>' +
      (cap.delta_pct !== null ? '<div style="font-size:11px;font-weight:600;color:' + deltaCol + '">' + (cap.delta_pct >= 0 ? '+' : '') + cap.delta_pct + '%</div>' : '') +
    '</div>' +
    '<div style="background:rgba(0,0,0,0.03);border-radius:10px;padding:10px;text-align:center">' +
      '<div style="font-size:9px;color:var(--gray);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px">Score finale</div>' +
      '<div style="font-size:16px;font-weight:700;color:var(--text)">' + (cap.score_finale || '\u2014') + '/100</div>' +
    '</div>' +
  '</div>' +

  // Dimensioni con date completamento
  '<div style="font-size:10px;font-weight:600;color:var(--gray);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Dimensioni</div>' +
  (function() {
    var sc = cap.step_completamenti || {};
    return DIMS_IDS.map(function(id) {
      var d = cap.dims[id] || 0;
      var t = cap.targets[id] || 0;
      var di = cap.dims_iniziali ? (cap.dims_iniziali[id] || 0) : 0;
      var raggiunto = d >= t && t > 0;
      var label = typeof getDimLabel === 'function' ? getDimLabel(settore, id) : id;
      var dataComp = '';
      if (sc[id]) {
        var ultime = Object.values(sc[id]).sort();
        if (ultime.length > 0) dataComp = new Date(ultime[ultime.length-1]).toLocaleDateString('it-IT', {day:'2-digit', month:'short', year:'numeric'});
      }
      return '<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border)">' +
        '<div style="font-size:12px;color:var(--text)">' + label + '</div>' +
        '<div style="display:flex;align-items:center;gap:8px">' +
          (dataComp ? '<span style="font-size:10px;color:var(--gray)">' + dataComp + '</span>' : '') +
          '<span style="font-size:12px;font-weight:600;color:' + (raggiunto ? 'rgba(0,200,150,0.8)' : 'var(--text)') + '">' +
            di + ' \u2192 ' + d + '/5' + (raggiunto ? ' \u2713' : '') +
          '</span>' +
        '</div>' +
      '</div>';
    }).join('');
  })() +

  // Timeline attività
  (historyHtml ? '<div style="margin-top:14px;font-size:10px;font-weight:600;color:var(--gray);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Attività</div>' + historyHtml : '');

  document.getElementById('detail-overlay-title').textContent = p.nome + ' \u2014 ' + cap.periodo;
  document.getElementById('detail-overlay-subtitle').textContent = 'Capitolo archiviato (sola lettura)';
  document.getElementById('detail-overlay-body').innerHTML = html;
  document.getElementById('detail-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function apriMultiScenario() {
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;
  var fat = p.fatturato_anno_1 || 0;
  if (!fat) { showToast('Inserisci prima il fatturato', 'error'); return; }

  var DIMS_IDS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  var settore = p.settore || '';
  var fmtF = function(v) { return v >= 1000000 ? (v/1000000).toFixed(1)+'M' : Math.round(v/1000)+'k'; };

  // Genera scenari predefiniti
  var targets = p.targets || {};
  var dims = p.dims || {};
  var attive = DIMS_IDS.filter(function(id) { return (targets[id]||0) > (dims[id]||0); });

  var scenari = [];

  // Scenario 1: Piano completo (tutti i target)
  scenari.push({ nome: 'Piano completo', desc: 'Tutti i target impostati', targets: {...targets} });

  // Scenario 2: Solo le top 2 per impatto/costo
  if (attive.length > 2) {
    var ic = _calcolaImpattoCumulativo(p);
    var costiDim = ic ? ic.costiPerDim || {} : {};
    var ranked = attive.map(function(id) {
      var imp = _calcolaImpattoUnitario(settore, id, String((dims[id]||0)+1), p);
      var impPct = imp ? (imp.pct_12m[0] + imp.pct_12m[1]) / 2 : 0;
      var costo = costiDim[id] ? costiDim[id].r : 0;
      return { id: id, rapporto: costo > 0 ? impPct / costo : 0 };
    }).sort(function(a,b) { return b.rapporto - a.rapporto; });

    var top2Targets = {};
    DIMS_IDS.forEach(function(id) { top2Targets[id] = dims[id] || 0; });
    ranked.slice(0, 2).forEach(function(r) { top2Targets[r.id] = targets[r.id]; });
    var LABEL = {};
    DIMS_IDS.forEach(function(id) {
      LABEL[id] = typeof getDimLabel === 'function' ? getDimLabel(settore, id) : id;
    });
    scenari.push({
      nome: 'Focus priorità',
      desc: ranked.slice(0,2).map(function(r){ return LABEL[r.id]; }).join(' + '),
      targets: top2Targets
    });

    // Scenario 3: Solo la top 1
    var top1Targets = {};
    DIMS_IDS.forEach(function(id) { top1Targets[id] = dims[id] || 0; });
    top1Targets[ranked[0].id] = targets[ranked[0].id];
    scenari.push({
      nome: 'Minimo investimento',
      desc: 'Solo ' + LABEL[ranked[0].id],
      targets: top1Targets
    });
  }

  // Calcola ogni scenario
  var rows = scenari.map(function(sc) {
    var pSim = {...p, targets: sc.targets};
    var icSim = _calcolaImpattoCumulativo(pSim);
    if (!icSim) return '';
    var fat12 = icSim.fat12 || [fat, fat];
    var costo = icSim.costoMensileTot || 0;
    var costoAnno = costo * 12 + (icSim.costoUnaTantumTot || 0);
    var crescita = fat12[1] - fat;
    var pctCrescita = fat > 0 ? Math.round(crescita / fat * 100) : 0;
    var pctFat = fat > 0 ? Math.round(costoAnno / fat * 100) : 0;
    var sostenibile = pctFat <= 15;

    return '<div style="background:rgba(255,255,255,0.3);border:1px solid rgba(0,0,0,0.06);border-radius:12px;padding:14px;margin-bottom:10px">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">' +
        '<div><div style="font-size:13px;font-weight:700;color:var(--text)">' + sc.nome + '</div>' +
        '<div style="font-size:11px;color:var(--gray)">' + sc.desc + '</div></div>' +
        (sostenibile ? '<span style="font-size:9px;padding:3px 8px;border-radius:10px;background:rgba(0,200,150,0.1);color:rgba(0,200,150,0.8);font-weight:600">Sostenibile</span>'
          : '<span style="font-size:9px;padding:3px 8px;border-radius:10px;background:rgba(229,57,53,0.08);color:rgba(229,57,53,0.8);font-weight:600">' + pctFat + '% fatturato</span>') +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">' +
        '<div style="text-align:center"><div style="font-size:10px;color:var(--gray)">Fatturato 12m</div><div style="font-size:14px;font-weight:700;color:var(--text)">' + fmtF(fat12[1]) + '\u20AC</div><div style="font-size:10px;color:#00C896">+' + pctCrescita + '%</div></div>' +
        '<div style="text-align:center"><div style="font-size:10px;color:var(--gray)">Costo/anno</div><div style="font-size:14px;font-weight:700;color:rgb(40,75,160)">' + fmtF(costoAnno) + '\u20AC</div><div style="font-size:10px;color:var(--gray)">' + fmtF(costo) + '/mese</div></div>' +
        '<div style="text-align:center"><div style="font-size:10px;color:var(--gray)">ROI 12m</div><div style="font-size:14px;font-weight:700;color:' + (crescita > costoAnno ? '#00C896' : 'rgba(229,57,53,0.8)') + '">' + (costoAnno > 0 ? (crescita/costoAnno).toFixed(1) + 'x' : '\u2014') + '</div></div>' +
      '</div>' +
    '</div>';
  }).join('');

  var html = '<div style="margin-bottom:12px;font-size:12px;color:var(--gray)">Confronta diversi livelli di investimento per trovare il mix ottimale.</div>' + rows;

  document.getElementById('detail-overlay-title').textContent = 'Confronto scenari';
  document.getElementById('detail-overlay-subtitle').textContent = 'Quale investimento ha più senso?';
  document.getElementById('detail-overlay-body').innerHTML = html;
  document.getElementById('detail-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function apriControlloFatturato() {
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;
  var snap = p.proiezione_snapshot;
  var checkpoints = p.fatturato_checkpoints || {};
  var fat0 = snap ? snap.fatturato_base : (p.fatturato_anno_1 || 0);
  var fmtF = function(v) { return v >= 1000000 ? (v/1000000).toFixed(1)+'M' : Math.round(v/1000)+'k'; };
  var fmtV = function(v) { return v ? v.toLocaleString('it-IT') + '\u20AC' : '\u2014'; };

  var mesi = [6, 12, 18, 24, 30, 36];
  var proiezioni = {};
  if (snap) {
    proiezioni[6] = snap.fat6;
    proiezioni[12] = snap.fat12;
    proiezioni[18] = snap.fat12 && snap.fat24 ? [Math.round((snap.fat12[0]+snap.fat24[0])/2), Math.round((snap.fat12[1]+snap.fat24[1])/2)] : null;
    proiezioni[24] = snap.fat24;
  }
  // Calcola proiezioni per 30 e 36 se non nello snapshot
  var ic = _calcolaImpattoCumulativo(p);
  if (ic) {
    if (!proiezioni[6]) proiezioni[6] = ic.fat6;
    if (!proiezioni[12]) proiezioni[12] = ic.fat12;
    if (!proiezioni[24]) proiezioni[24] = ic.fat24;
    if (ic.fat36) proiezioni[36] = ic.fat36;
    if (!proiezioni[18] && proiezioni[12] && proiezioni[24]) {
      proiezioni[18] = [Math.round((proiezioni[12][0]+proiezioni[24][0])/2), Math.round((proiezioni[12][1]+proiezioni[24][1])/2)];
    }
    if (!proiezioni[30] && proiezioni[24] && proiezioni[36]) {
      proiezioni[30] = [Math.round((proiezioni[24][0]+proiezioni[36][0])/2), Math.round((proiezioni[24][1]+proiezioni[36][1])/2)];
    }
  }

  var dataInizio = snap ? new Date(snap.data) : new Date();

  var rows = mesi.map(function(m) {
    var proj = proiezioni[m];
    var projStr = proj ? fmtF(proj[0]) + '\u2013' + fmtF(proj[1]) + '\u20AC' : '\u2014';
    var actual = checkpoints[String(m)];
    var hasActual = actual !== undefined && actual !== null;

    var scadenzaDate = new Date(dataInizio);
    scadenzaDate.setMonth(scadenzaDate.getMonth() + m);
    var dateStr = scadenzaDate.toLocaleDateString('it-IT', {month:'short', year:'numeric'});

    var statusHtml = '';
    if (hasActual && proj) {
      var inRange = actual >= proj[0] * 0.9 && actual <= proj[1] * 1.1;
      var sopra = actual > proj[1] * 1.1;
      var col = sopra ? '#00C896' : inRange ? 'rgba(61,90,254,0.8)' : 'rgba(229,57,53,0.8)';
      var label = sopra ? '\u2191 Sopra' : inRange ? '\u2248 In linea' : '\u2193 Sotto';
      statusHtml = '<span style="font-size:10px;font-weight:600;color:' + col + '">' + label + '</span>';
    }

    return '<div style="display:grid;grid-template-columns:60px 70px 1fr 1fr 80px;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);align-items:center">' +
      '<div style="font-size:12px;font-weight:700;color:var(--text)">' + m + ' mesi</div>' +
      '<div style="font-size:10px;color:var(--gray)">' + dateStr + '</div>' +
      '<div style="text-align:center"><div style="font-size:10px;color:var(--gray)">Proiettato</div><div style="font-size:12px;color:var(--text)">' + projStr + '</div></div>' +
      '<div style="text-align:center"><div style="font-size:10px;color:var(--gray)">Reale</div>' +
        '<input type="number" id="ck-' + m + '" value="' + (hasActual ? actual : '') + '" placeholder="\u2014" ' +
        'style="width:100px;text-align:center;background:rgba(255,255,255,0.4);border:1px solid rgba(0,0,0,0.08);border-radius:6px;padding:4px 8px;font-size:12px;font-weight:600;color:var(--text);font-family:inherit;outline:none">' +
      '</div>' +
      '<div style="text-align:center">' + statusHtml + '</div>' +
    '</div>';
  }).join('');

  var html = '<div style="margin-bottom:12px;font-size:12px;color:var(--gray)">Fatturato di partenza: <strong style="color:var(--text)">' + fmtV(fat0) + '</strong></div>' +
    rows +
    '<div style="display:flex;justify-content:flex-end;margin-top:16px">' +
      '<button class="btn btn-primary" onclick="salvaCheckpoints()" style="background:var(--green);border:none">Salva</button>' +
    '</div>';

  document.getElementById('detail-overlay-title').textContent = 'Controllo fatturato';
  document.getElementById('detail-overlay-subtitle').textContent = 'Confronto proiezioni vs risultati reali';
  document.getElementById('detail-overlay-body').innerHTML = html;
  document.getElementById('detail-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

async function salvaCheckpoints() {
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;
  var checkpoints = {};
  [6, 12, 18, 24, 30, 36].forEach(function(m) {
    var el = document.getElementById('ck-' + m);
    if (el && el.value !== '') checkpoints[String(m)] = parseFloat(el.value);
  });
  p.fatturato_checkpoints = checkpoints;
  try {
    var res = await sb.from('prospects').update({ fatturato_checkpoints: checkpoints }).eq('id', p.id);
    if (res.error) throw res.error;
    showToast('Checkpoints salvati');
    chiudiDetailOverlay();
    renderProspectDetail(currentId);
  } catch(e) {
    showToast('Errore: ' + e.message, 'error');
  }
}

function apriDettaglioRoi() {
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;
  var ic = _calcolaImpattoCumulativo(p);
  if (!ic) return;
  var fmtV = function(v) { return v ? v.toLocaleString('it-IT') + '\u20AC' : '\u2014'; };
  var fmtF = function(v) { return v >= 1000000 ? (v/1000000).toFixed(1)+'M' : Math.round(v/1000)+'k'; };
  var fat = ic.fat || 0;
  var costoMensile = ic.costoMensileTot || 0;
  var costoSetup = ic.costoUnaTantumTot || 0;

  // Costruisci tabella anno per anno
  var anni = [
    { label: 'Anno 1', fat: ic.fat12, costoAnno: costoMensile * 12 + costoSetup },
    { label: 'Anno 2', fat: ic.fat24, costoAnno: costoMensile * 12 },
  ];
  if (ic.fat36) anni.push({ label: 'Anno 3', fat: ic.fat36, costoAnno: costoMensile * 12 });

  var investitoCumul = 0;
  var beneficioCumul = 0;

  var rows = anni.map(function(a, idx) {
    if (!a.fat) return '';
    var fatMin = a.fat[0], fatMax = a.fat[1];
    var crescitaMin = fatMin - fat;
    var crescitaMax = fatMax - fat;
    investitoCumul += a.costoAnno;
    var beneficioAnnoMin = crescitaMin; // beneficio di quest'anno = delta fatturato annuo
    var beneficioAnnoMax = crescitaMax;

    var roiAnnoMin = a.costoAnno > 0 ? (beneficioAnnoMin / a.costoAnno).toFixed(1) : '\u2014';
    var roiAnnoMax = a.costoAnno > 0 ? (beneficioAnnoMax / a.costoAnno).toFixed(1) : '\u2014';
    var roiCol = roiAnnoMax >= 1.5 ? '#00C896' : roiAnnoMax >= 1 ? 'rgba(61,90,254,0.75)' : 'rgba(229,57,53,0.75)';

    return '<div style="display:grid;grid-template-columns:70px 1fr 1fr 1fr 80px;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);align-items:center">' +
      '<div style="font-size:12px;font-weight:700;color:var(--white)">' + a.label + '</div>' +
      '<div style="text-align:center"><div style="font-size:10px;color:var(--gray)">Fatturato</div><div style="font-size:12px;font-weight:600;color:var(--white)">' + fmtF(fatMin) + '\u2013' + fmtF(fatMax) + '\u20AC</div></div>' +
      '<div style="text-align:center"><div style="font-size:10px;color:var(--gray)">Crescita anno</div><div style="font-size:12px;font-weight:600;color:#00C896">+' + fmtF(crescitaMin) + '\u2013' + fmtF(crescitaMax) + '\u20AC</div></div>' +
      '<div style="text-align:center"><div style="font-size:10px;color:var(--gray)">Costo anno</div><div style="font-size:12px;font-weight:600;color:rgb(40,75,160)">' + fmtF(a.costoAnno) + '\u20AC</div></div>' +
      '<div style="text-align:center"><div style="font-size:10px;color:var(--gray)">ROI anno</div><div style="font-size:13px;font-weight:700;color:' + roiCol + '">' + roiAnnoMin + '\u2013' + roiAnnoMax + 'x</div></div>' +
    '</div>';
  }).join('');

  // Riga totale cumulativo
  var totCrescitaMin = (anni[anni.length-1]?.fat?.[0] || fat) - fat;
  var totCrescitaMax = (anni[anni.length-1]?.fat?.[1] || fat) - fat;
  var totRoiMin = investitoCumul > 0 ? (totCrescitaMin * anni.length / investitoCumul).toFixed(1) : '\u2014';
  var totRoiMax = investitoCumul > 0 ? (totCrescitaMax * anni.length / investitoCumul).toFixed(1) : '\u2014';
  var totRoiCol = totRoiMax >= 1.5 ? '#00C896' : totRoiMax >= 1 ? 'rgba(61,90,254,0.75)' : 'rgba(229,57,53,0.75)';

  rows += '<div style="display:grid;grid-template-columns:70px 1fr 1fr 1fr 80px;gap:8px;padding:12px 0;border-top:2px solid var(--border);align-items:center;margin-top:4px">' +
    '<div style="font-size:12px;font-weight:700;color:var(--white)">Totale</div>' +
    '<div></div>' +
    '<div></div>' +
    '<div style="text-align:center"><div style="font-size:10px;color:var(--gray)">Investito totale</div><div style="font-size:13px;font-weight:700;color:rgb(40,75,160)">' + fmtF(investitoCumul) + '\u20AC</div></div>' +
    '<div style="text-align:center"><div style="font-size:10px;color:var(--gray)">ROI piano</div><div style="font-size:14px;font-weight:700;color:' + totRoiCol + '">' + totRoiMin + '\u2013' + totRoiMax + 'x</div></div>' +
  '</div>';

  var breakevenStr = ic.sostenibilita?.breakevenStr || '\u2014';
  var html = rows +
    '<div style="margin-top:16px;padding:12px;background:var(--bg3);border-radius:8px">' +
      '<div style="font-size:11px;color:var(--gray);margin-bottom:4px">Breakeven stimato</div>' +
      '<div style="font-size:14px;font-weight:600;color:var(--white)">' + breakevenStr + '</div>' +
      '<div style="font-size:10px;color:var(--gray);margin-top:4px">Il momento in cui la crescita di fatturato supera l\'investimento cumulato</div>' +
    '</div>';

  document.getElementById('detail-overlay-title').textContent = 'Dettaglio ROI';
  document.getElementById('detail-overlay-subtitle').textContent = 'Return on Investment per orizzonte temporale';
  document.getElementById('detail-overlay-body').innerHTML = html;
  document.getElementById('detail-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

var _timelineFilter = 'tutti';

function renderTimelineUnificata(p, calls) {
  var container = document.getElementById('timeline-unificata');
  if (!container) return;
  var settore = p.settore || '';

  var events = [];
  var fmtDate = function(d) { return new Date(d).toLocaleDateString('it-IT', {day:'2-digit', month:'short', year:'numeric'}); };
  var fmtMonth = function(d) { return new Date(d).toLocaleDateString('it-IT', {month:'long', year:'numeric'}); };

  // Score history → diagnosi, sessioni con step completati, target
  (p.score_history || []).forEach(function(s) {
    var tipo = s.evento === 'Prima valutazione' ? 'diagnosi' : s.evento.indexOf('Target') >= 0 ? 'target' : 'sessione';
    var ev = {
      data: new Date(s.data),
      tipo: tipo,
      label: s.evento,
      nota: s.nota || '',
      score: s.score,
      score_base: s.score_base,
      upgrade: s.upgrade || null,
      dims: s.dims || null
    };
    events.push(ev);
  });

  // Step completamenti → eventi separati per ogni step raggiunto
  var sc = p.step_completamenti || {};
  Object.keys(sc).forEach(function(dimId) {
    var dimSteps = sc[dimId] || {};
    var label = typeof getDimLabel === 'function' ? getDimLabel(settore, dimId) : dimId;
    Object.keys(dimSteps).forEach(function(step) {
      var dataStr = dimSteps[step];
      if (!dataStr) return;
      var desc = typeof _getStepDesc === 'function' ? _getStepDesc(settore, dimId, parseInt(step)) : '';
      events.push({
        data: new Date(dataStr),
        tipo: 'step',
        label: label + ' \u2192 Step ' + step,
        nota: desc && desc !== '\u2014' ? desc : '',
        dimId: dimId,
        step: parseInt(step)
      });
    });
  });

  // Call
  (calls || []).forEach(function(c) {
    var esitoLabel = c.esito === 'positivo' ? 'Positivo' : c.esito === 'negativo' ? 'Negativo' : 'Neutro';
    events.push({
      data: new Date(c.data),
      tipo: 'call',
      label: 'Call \u00B7 ' + esitoLabel,
      nota: (c.note || '').substring(0, 120) + ((c.note || '').length > 120 ? '...' : ''),
      esito: c.esito
    });
  });

  // Fatturato checkpoints
  var ck = p.fatturato_checkpoints || {};
  Object.keys(ck).forEach(function(m) {
    var snap = p.proiezione_snapshot;
    var dataSnap = snap ? new Date(snap.data) : new Date();
    var dataCk = new Date(dataSnap);
    dataCk.setMonth(dataCk.getMonth() + parseInt(m));
    events.push({
      data: dataCk,
      tipo: 'checkpoint',
      label: 'Controllo fatturato \u00B7 ' + m + ' mesi',
      nota: ck[m].toLocaleString('it-IT') + '\u20AC'
    });
  });

  // Filtra
  if (_timelineFilter !== 'tutti') {
    events = events.filter(function(e) { return e.tipo === _timelineFilter; });
  }

  // Ordina per data (più recente prima)
  events.sort(function(a, b) { return b.data - a.data; });

  // Render filtri
  var filterBar = document.getElementById('timeline-filter-bar');
  if (filterBar) {
    var filtri = [
      {id:'tutti', label:'Tutti'},
      {id:'sessione', label:'Sessioni'},
      {id:'step', label:'Step'},
      {id:'call', label:'Call'},
      {id:'diagnosi', label:'Diagnosi'},
      {id:'checkpoint', label:'Fatturato'}
    ];
    filterBar.innerHTML = filtri.map(function(f) {
      var active = _timelineFilter === f.id;
      return '<span onclick="_timelineFilter=\'' + f.id + '\';renderTimelineUnificata(prospects.find(function(x){return x.id===currentId}),currentCalls)" ' +
        'style="font-size:10px;padding:3px 10px;border-radius:12px;cursor:pointer;font-weight:' + (active ? '700' : '500') +
        ';background:' + (active ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.02)') +
        ';color:' + (active ? 'var(--text)' : 'var(--gray)') +
        ';border:1px solid ' + (active ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.04)') + '">' + f.label + '</span>';
    }).join('');
  }

  if (events.length === 0) {
    container.innerHTML = '<div style="color:var(--gray);font-size:12px;padding:16px 0;text-align:center">Nessuna attivit\u00E0 registrata' +
      (_timelineFilter !== 'tutti' ? ' per questo filtro.' : '.') + '</div>';
    return;
  }

  var TIPO_CONFIG = {
    diagnosi:   {icon:'\uD83C\uDFAF', color:'rgba(110,80,170,0.75)',  bg:'rgba(110,80,170,0.06)'},
    sessione:   {icon:'\u2705',       color:'rgba(0,200,150,0.75)',   bg:'rgba(0,200,150,0.06)'},
    step:       {icon:'\uD83D\uDCC8', color:'rgba(70,100,200,0.75)',  bg:'rgba(70,100,200,0.06)'},
    call:       {icon:'\uD83D\uDCDE', color:'rgba(60,110,170,0.75)',  bg:'rgba(60,110,170,0.06)'},
    target:     {icon:'\uD83C\uDFF9', color:'rgba(61,90,254,0.75)',  bg:'rgba(61,90,254,0.06)'},
    checkpoint: {icon:'\uD83D\uDCB0', color:'rgba(229,57,53,0.75)',   bg:'rgba(229,57,53,0.06)'}
  };

  // Raggruppa per mese
  var grouped = {};
  events.forEach(function(e) {
    var key = fmtMonth(e.data);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  });

  var html = '';
  Object.keys(grouped).forEach(function(month) {
    html += '<div style="margin-bottom:4px">';
    html += '<div style="font-size:10px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.08em;padding:10px 0 6px;border-bottom:1px solid var(--border)">' + month + '</div>';

    grouped[month].forEach(function(e) {
      var cfg = TIPO_CONFIG[e.tipo] || TIPO_CONFIG.sessione;

      // Riga score per sessioni/diagnosi
      var scoreHtml = '';
      if (e.score != null) {
        var sCol = e.score >= 70 ? 'rgba(35,100,40,0.8)' : e.score >= 45 ? 'rgba(140,100,25,0.8)' : 'rgba(170,30,30,0.8)';
        scoreHtml = '<div style="font-size:16px;font-weight:700;font-family:\'Plus Jakarta Sans\',serif;color:' + sCol + '">' + e.score + '<span style="font-size:10px;color:var(--gray)">/100</span></div>';
      }

      // Dettaglio step con barra
      var stepHtml = '';
      if (e.tipo === 'step') {
        var pct = (e.step / 5 * 100);
        stepHtml = '<div style="display:flex;align-items:center;gap:8px;margin-top:4px">' +
          '<div style="flex:1;background:var(--border);border-radius:3px;height:5px;overflow:hidden">' +
            '<div style="width:' + pct + '%;height:100%;background:' + cfg.color + ';border-radius:3px"></div>' +
          '</div>' +
          '<span style="font-size:10px;font-weight:600;color:' + cfg.color + '">' + e.step + '/5</span>' +
        '</div>';
      }

      // Esito call colorato
      var callEsitoHtml = '';
      if (e.tipo === 'call' && e.esito) {
        var esitoCol = e.esito === 'positivo' ? 'rgba(0,200,150,0.7)' : e.esito === 'negativo' ? 'rgba(229,57,53,0.7)' : 'rgba(61,90,254,0.7)';
        callEsitoHtml = '<span style="width:8px;height:8px;border-radius:50%;background:' + esitoCol + ';display:inline-block;margin-right:4px;vertical-align:middle"></span>';
      }

      html += '<div style="display:flex;gap:10px;padding:10px 8px;border-radius:8px;margin:4px 0;background:' + cfg.bg + '">';
      // Icona
      html += '<div style="width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,0.6);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0">' + cfg.icon + '</div>';
      // Contenuto
      html += '<div style="flex:1;min-width:0">';
      html += '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">';
      html += '<div style="flex:1">';
      html += '<div style="font-size:12px;font-weight:600;color:var(--text)">' + callEsitoHtml + e.label + '</div>';
      if (e.nota) html += '<div style="font-size:11px;color:var(--gray);margin-top:2px;line-height:1.4">' + e.nota + '</div>';
      html += '</div>';
      html += '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px;flex-shrink:0">';
      html += '<span style="font-size:10px;color:var(--gray)">' + fmtDate(e.data) + '</span>';
      if (scoreHtml) html += scoreHtml;
      html += '</div>';
      html += '</div>';
      if (stepHtml) html += stepHtml;
      html += '</div></div>';
    });

    html += '</div>';
  });

  container.innerHTML = html;
}

function _buildGraficoTimeline(p) {
  if (!p) return '';
  var fmtF = function(v) { return v >= 1000000 ? (v/1000000).toFixed(1)+'M' : Math.round(v/1000)+'k'; };
  const settore = p.settore || '';
  const dims = p.dims || {};
  const targets = p.targets || {};
  const fat = p.fatturato_anno_1 || 0;
  if (!fat) return '<div class="tl-empty">Inserisci il fatturato per vedere le proiezioni.</div>';

  // Controlla se tutti i target sono raggiunti (con sessioni fatte)
  const allReached = _isAllTargetsReached(p);

  var completedBanner = '';
  if (allReached) {
    completedBanner = '<div style="text-align:center;padding:20px;margin-bottom:16px;background:rgba(0,200,150,0.08);border:1px solid rgba(0,200,150,0.2);border-radius:12px">' +
      '<div style="font-size:20px;margin-bottom:6px">\u2705</div>' +
      '<div style="font-size:14px;font-weight:700;color:var(--text)">Piano completato!</div>' +
      '<div style="font-size:12px;color:var(--gray)">Obiettivi raggiunti. Imposta nuovi target per continuare la crescita.</div>' +
    '</div>';
  }

  const ic = _calcolaImpattoCumulativo(p);
  if (!ic && !allReached) return '<div class="tl-empty">Imposta i target per vedere le proiezioni.</div>';
  if (!ic && allReached) return completedBanner;

  const fat12min = ic.fat12 ? ic.fat12[0] : fat;
  const fat12max = ic.fat12 ? ic.fat12[1] : fat;
  const fat24min = ic.fat24 ? ic.fat24[0] : fat;
  const fat24max = ic.fat24 ? ic.fat24[1] : fat;
  const fat6min  = ic.fat6  ? ic.fat6[0]  : fat;
  const fat6max  = ic.fat6  ? ic.fat6[1]  : fat;
  const costoMensile = ic.costoMensileTot || 0;
  const costoPiano = ic.costoPianoMensile || 0;
  const costoBase = ic.costoBaseMensile || 0;
  const breakevenStr = ic.sostenibilita?.breakevenStr || '\u2014';
  const roiMin = ic.roiMin !== null ? ic.roiMin : null;
  const roiMax = ic.roiMax !== null ? ic.roiMax : null;
  const roiStr = (roiMin !== null && roiMax !== null) ? roiMin.toFixed(1) + '\u2013' + roiMax.toFixed(1) + 'x' : '\u2014';
  const costoLabel = costoMensile > 0 ? '\u2248' + fmtF(costoMensile) + '\u20AC/mese' : '\u2014';
  const costoLabelSub = costoPiano > 0 ? 'base + investimento piano \u00B7 clicca per dettagli' : costoBase > 0 ? 'costi struttura attuale \u00B7 clicca per dettagli' : '';

  const pct12min = fat ? Math.round((fat12min - fat) / fat * 100) : 0;
  const pct12max = fat ? Math.round((fat12max - fat) / fat * 100) : 0;

  // Punti grafico linee: oggi, 3m, 6m, 12m, 18m, 24m
  const pts = {
    base: [fat, fat, fat, fat, fat, fat],
    min:  [fat, Math.round(fat+(fat6min-fat)*0.5), fat6min, fat12min, Math.round(fat12min+(fat24min-fat12min)*0.5), fat24min],
    max:  [fat, Math.round(fat+(fat6max-fat)*0.5), fat6max, fat12max, Math.round(fat12max+(fat24max-fat12max)*0.5), fat24max],
  };

  // Linea ideale: percorso previsto se gli step vengono completati nei tempi
  var DIMS_ALL = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
  var idealPath = null;
  try {
    var milestones = p.target_milestones || {};
    var hasMilestones = Object.keys(milestones).some(function(k) { return Object.keys(milestones[k] || {}).length > 0; });
    if (hasMilestones && Object.keys(targets).some(function(k) { return (targets[k]||0) > (dims[k]||0); })) {
      // Conta gli step totali da fare e calcola la crescita finale (midpoint min/max a 24m)
      var totalStepsDaFare = 0;
      DIMS_ALL.forEach(function(id) {
        var gap = (targets[id] || 0) - (dims[id] || 0);
        if (gap > 0) totalStepsDaFare += gap;
      });
      // Crescita finale = midpoint delle proiezioni a 24 mesi
      var mid24 = ic && ic.fat24 ? (ic.fat24[0] + ic.fat24[1]) / 2 : fat;
      var crescitaFinale24 = mid24 - fat;

      var timePoints = [0, 3, 6, 12, 18, 24];
      idealPath = timePoints.map(function(m) {
        if (m === 0) return fat;
        var futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + m);
        // Conta quanti step dovrebbero essere completati entro questa data
        var stepCompletati = 0;
        DIMS_ALL.forEach(function(id) {
          var dimMilestones = milestones[id] || {};
          Object.keys(dimMilestones).forEach(function(step) {
            if (new Date(dimMilestones[step]) <= futureDate) stepCompletati++;
          });
        });
        // Percentuale di completamento basata su step
        var pctStep = totalStepsDaFare > 0 ? stepCompletati / totalStepsDaFare : 0;
        // Crescita lineare nel tempo, accelerata dagli step completati
        // A 24 mesi con tutti gli step = crescitaFinale24
        var pctTempo = m / 24;
        var crescitaIdeale = crescitaFinale24 * pctTempo * (0.5 + 0.5 * pctStep);
        return Math.round(fat + crescitaIdeale);
      });
    }
  } catch(e) {}

  // Dimensioni con gap
  const DIMS_IDS = DIMS_ALL;
  const _getDimLabel = typeof window.getDimLabel === 'function' ? window.getDimLabel : function(s, id){ return id; };
  const _sc = p.step_completamenti || {};
  const dimsHtml = DIMS_IDS.map(function(d) {
    const cur = dims[d] || 1;
    const tgt = targets[d] || cur;
    const haGap = tgt > cur;
    // "ok" solo se ha completamenti per questa dimensione (sessione fatta)
    const dimCompletata = !haGap && tgt > 1 && _sc[d] && Object.keys(_sc[d]).length > 0;
    const badgeClass = haGap ? 'tl-badge-gap' : dimCompletata ? 'tl-badge-ok' : 'tl-badge-neutral';
    const badgeText = haGap ? (cur + ' \u2192 ' + tgt) : (dimCompletata ? '\u2713 ' + cur + '/5' : cur + '/5');
    const barCol = dimColor(cur);
    const tgtBarCol = dimColor(tgt);
    const curPct = (cur/5)*100;
    const tgtPct = (tgt/5)*100;
    return '<div class="tl-dim-row">' +
      '<div class="tl-dim-header">' +
        '<span class="tl-dim-name">' + _getDimLabel(settore, d) + '</span>' +
        '<span class="tl-dim-badge ' + badgeClass + '">' + badgeText + '</span>' +
      '</div>' +
      '<div style="position:relative;height:5px;background:rgba(26,26,46,0.08);border-radius:3px;overflow:visible">' +
        '<div style="position:absolute;left:0;top:0;height:100%;width:' + curPct + '%;background:' + barCol + ';border-radius:3px"></div>' +
        (haGap ? '<div style="position:absolute;left:' + tgtPct + '%;top:-2px;width:2px;height:9px;background:rgba(175,125,0,0.7);border-radius:1px;transform:translateX(-50%)"></div>' : '') +
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
      const detail = typeof getStepDetail === 'function' ? getStepDetail(settore, d, stepKey) : null;
      const desc = detail ? detail.cosa : '';
      const costoStr = detail ? (detail.costo_mensile > 0 ? '\u2248' + detail.costo_mensile.toLocaleString('it-IT') + '\u20AC/mese' : 'Nessun costo') + ' \u00B7 Operativo in ~' + detail.tempo_mesi + ' ' + (detail.tempo_mesi === 1 ? 'mese' : 'mesi') : '';
      const col = dimColor(dims[d] || 1);
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
    completedBanner +

    // 1. CARD METRICHE
    '<div class="tl-section-label">Quadro economico</div>' +
    '<div class="tl-metric-cards">' +
      (function() {
        var snap = p.proiezione_snapshot;
        var fatSub = 'anno corrente';
        if (snap && snap.fatturato_base && snap.fatturato_base !== fat) {
          var snapDate = new Date(snap.data).toLocaleDateString('it-IT', {month:'short', year:'numeric'});
          var delta = fat - snap.fatturato_base;
          var deltaPct = ((delta / snap.fatturato_base) * 100).toFixed(0);
          var proiMin12 = snap.fat12 ? snap.fat12[0] : 0;
          var proiMax12 = snap.fat12 ? snap.fat12[1] : 0;
          var inRange = fat >= proiMin12 * 0.9 && fat <= proiMax12 * 1.1;
          var sopra = fat > proiMax12 * 1.1;
          var statusCol = sopra ? '#00C896' : inRange ? 'rgba(61,90,254,0.8)' : 'rgba(229,57,53,0.8)';
          var statusLabel = sopra ? '\u2191 Sopra le previsioni' : inRange ? '\u2248 In linea' : '\u2193 Sotto le previsioni';
          fatSub = '<span style="color:' + statusCol + ';font-weight:600">' + (delta >= 0 ? '+' : '') + deltaPct + '% da ' + snapDate + '</span> \u00B7 <span style="color:' + statusCol + '">' + statusLabel + '</span>';
        }
        return '<div class="tl-mc" style="cursor:pointer" onclick="apriControlloFatturato()"><div class="tl-mc-label">Fatturato attuale</div><div class="tl-mc-val">' + fmtF(fat) + '\u20AC</div><div class="tl-mc-sub">' + fatSub + ' \u00B7 clicca per controllo</div></div>';
      })() +
      '<div class="tl-mc"><div class="tl-mc-label">Proiezione 12 mesi</div><div class="tl-mc-val tl-green">' + fmtF(fat12min) + '\u2013' + fmtF(fat12max) + '\u20AC</div><div class="tl-mc-sub">+' + pct12min + '\u2013' + pct12max + '%</div></div>' +
      '<div class="tl-mc" style="cursor:pointer" onclick="apriDettaglioCosti()"><div class="tl-mc-label">' + (costoPiano > 0 ? 'Costi totali' : 'Costi struttura') + '</div><div class="tl-mc-val tl-blue">' + costoLabel + '</div><div class="tl-mc-sub">' + costoLabelSub + '</div></div>' +
      '<div class="tl-mc" style="cursor:pointer" onclick="apriDettaglioRoi()"><div class="tl-mc-label">ROI stimato</div><div class="tl-mc-val tl-amber">' + roiStr + '</div><div class="tl-mc-sub">breakeven ' + breakevenStr + ' · clicca per dettagli</div></div>' +
    '</div>' +

    // 1a. ALERT SOSTENIBILITÀ
    (function() {
      if (!fat || !costoMensile) return '';
      var costoAnnuo = costoMensile * 12 + (ic.costoUnaTantumTot || 0);
      var pctFatturato = (costoAnnuo / fat * 100).toFixed(0);
      if (pctFatturato <= 15) return '';
      var ignorato = p.ignora_sostenibilita;
      if (ignorato) {
        return '<div style="margin:12px 0;padding:10px 16px;background:rgba(0,0,0,0.03);border:1px solid rgba(0,0,0,0.06);border-radius:12px;display:flex;align-items:center;gap:8px">' +
          '<input type="checkbox" id="check-sostenibilita" checked onchange="toggleSostenibilita(this.checked)" style="width:14px;height:14px;accent-color:var(--gold);cursor:pointer">' +
          '<label for="check-sostenibilita" style="font-size:11px;color:var(--gray);cursor:pointer">Il cliente ha le risorse per investire (' + pctFatturato + '% del fatturato)</label>' +
        '</div>';
      }

      var livello = pctFatturato > 30 ? 'critico' : 'alto';
      var col = livello === 'critico' ? 'rgba(229,57,53,0.8)' : 'rgba(61,90,254,0.8)';
      var bgCol = livello === 'critico' ? 'rgba(229,57,53,0.06)' : 'rgba(61,90,254,0.06)';
      var borderCol = livello === 'critico' ? 'rgba(229,57,53,0.2)' : 'rgba(61,90,254,0.2)';
      var icon = livello === 'critico' ? '\u26D4' : '\u26A0';

      // Suggerisci priorità: ordina dimensioni per impatto/costo e suggerisci quelle da fare prima
      var dimAttive = ic.dimAttive || [];
      var costiDim = ic.costiPerDim || {};
      var priorita = dimAttive.map(function(id) {
        var c = costiDim[id];
        if (!c || c.r === 0) return null;
        var imp = _calcolaImpattoUnitario(settore, id, String((dims[id]||0)+1), p);
        var impPct = imp ? (imp.pct_12m[0] + imp.pct_12m[1]) / 2 : 0;
        return { id: id, costo: c.r, impatto: impPct, rapporto: impPct / (c.r || 1) };
      }).filter(Boolean).sort(function(a,b) { return b.rapporto - a.rapporto; });

      var LABEL = {};
      var sd = (typeof STEP_DETAIL_BY_SETTORE !== 'undefined') ? STEP_DETAIL_BY_SETTORE : {};
      ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'].forEach(function(id) {
        LABEL[id] = sd[settore]?.[id]?._label || (typeof getDimLabel === 'function' ? getDimLabel(settore, id) : id);
      });

      var budgetMensile = Math.round(fat * 0.12 / 12 / 100) * 100; // 12% del fatturato / 12 mesi
      var suggerimento = '';
      if (priorita.length > 0) {
        var faseUno = [];
        var costoFaseUno = 0;
        for (var i = 0; i < priorita.length; i++) {
          if (costoFaseUno + priorita[i].costo <= budgetMensile * 1.2) {
            faseUno.push(priorita[i]);
            costoFaseUno += priorita[i].costo;
          }
        }
        if (faseUno.length > 0 && faseUno.length < priorita.length) {
          suggerimento = '<div style="margin-top:8px;font-size:11px;color:var(--text)">' +
            '<strong>Suggerimento:</strong> inizia con ' +
            faseUno.map(function(d) { return '<strong>' + LABEL[d.id] + '</strong>'; }).join(' + ') +
            ' (~' + Math.round(costoFaseUno/100)*100 + '\u20AC/mese) — il miglior rapporto impatto/costo.' +
            ' Le altre dimensioni si aggiungono quando il fatturato cresce.' +
          '</div>';
        }
      }

      return '<div style="margin:12px 0;padding:12px 16px;background:' + bgCol + ';border:1px solid ' + borderCol + ';border-radius:12px">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">' +
          '<span style="font-size:16px">' + icon + '</span>' +
          '<span style="font-size:13px;font-weight:700;color:' + col + '">Investimento ' + livello + ': ' + pctFatturato + '% del fatturato</span>' +
        '</div>' +
        '<div style="font-size:11px;color:var(--gray)">' +
          'Il piano richiede ' + fmtF(costoAnnuo) + '\u20AC/anno su un fatturato di ' + fmtF(fat) + '\u20AC. ' +
          (livello === 'critico'
            ? 'Questo livello di investimento non è sostenibile. Riduci i target o distribuisci nel tempo.'
            : 'Valuta di implementare il piano in fasi per gestire il cash flow.') +
        '</div>' +
        '<div style="font-size:11px;color:var(--gray);margin-top:4px">' +
          'Budget mensile consigliato: <strong>~' + budgetMensile.toLocaleString('it-IT') + '\u20AC/mese</strong> (12% del fatturato)' +
        '</div>' +
        suggerimento +
        '<div style="margin-top:10px;display:flex;align-items:center;gap:8px">' +
          '<input type="checkbox" id="check-sostenibilita" ' + (p.ignora_sostenibilita ? 'checked' : '') + ' onchange="toggleSostenibilita(this.checked)" style="width:14px;height:14px;accent-color:var(--gold);cursor:pointer">' +
          '<label for="check-sostenibilita" style="font-size:11px;color:var(--gray);cursor:pointer">Il cliente ha le risorse per investire</label>' +
        '</div>' +
      '</div>';
    })() +

    // 1b. SBILANCIAMENTO PIANO
    (function() {
      var penDim = ic.penalitaPerDim || {};
      var LABEL = {vendite:'Vendite',pipeline:'Pipeline',team:'Team',processi:'Processi',ricavi:'Ricavi',marketing:'Marketing',sitoweb:'Sito Web',ecommerce:'Approvv.'};
      var sd = (typeof STEP_DETAIL_BY_SETTORE !== 'undefined') ? STEP_DETAIL_BY_SETTORE : {};
      var DIMS_ALL = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];
      DIMS_ALL.forEach(function(id) {
        var lbl = sd[settore]?.[id]?._label;
        if (lbl) LABEL[id] = lbl;
      });
      var entries = Object.entries(penDim).filter(function(e){ return e[1] > 0.05; }).sort(function(a,b){ return b[1]-a[1]; });
      if (entries.length === 0) return '';
      var media = entries.reduce(function(s,e){ return s+e[1]; }, 0) / entries.length;
      var mediaCol = media >= 0.40 ? 'rgba(229,57,53,0.75)' : media >= 0.20 ? 'rgba(61,90,254,0.75)' : 'rgba(0,200,150,0.75)';
      var rows = entries.map(function(e) {
        var id = e[0]; var pct = Math.round(e[1]*100);
        var col = pct >= 40 ? 'rgba(229,57,53,0.75)' : pct >= 20 ? 'rgba(61,90,254,0.75)' : 'rgba(61,90,254,0.75)';
        var livDim = Math.max((targets[id]||1), (dims[id]||1));
        // Trova le dipendenze basse e suggerisci il livello target
        var deps = _getDipendenze(settore, id);
        var suggerimenti = [];
        Object.entries(deps).forEach(function(dep) {
          var depId = dep[0]; var depPeso = dep[1];
          var livDep = Math.max((targets[depId]||1), (dims[depId]||1));
          if (livDim > livDep && depPeso >= 0.15) {
            suggerimenti.push({ id:depId, label:LABEL[depId]||depId, da:livDep, a:livDim, peso:depPeso });
          }
        });
        var sugHtml = suggerimenti.map(function(s) {
          return '<div style="display:flex;align-items:center;gap:6px;margin-top:3px">' +
            '<span style="color:rgb(40,75,160);font-size:10px">\u2191</span>' +
            '<span style="font-size:10px;color:var(--white)">Porta <strong>' + s.label + '</strong> a <strong>' + s.a + '</strong></span>' +
            '<span style="font-size:9px;color:var(--gray)">(ora a ' + s.da + ')</span>' +
          '</div>';
        }).join('');
        return '<div style="margin-bottom:10px;background:var(--bg3);border-radius:6px;padding:8px 12px;border-left:3px solid ' + col + '">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">' +
            '<div style="font-size:11px;color:var(--white);font-weight:600">' + (LABEL[id]||id) + '</div>' +
            '<div style="font-size:11px;font-weight:700;color:' + col + '">-' + pct + '% efficienza</div>' +
          '</div>' +
          '<div style="height:10px;background:var(--border);border-radius:5px;overflow:hidden;margin-bottom:4px">' +
            '<div style="width:' + Math.min(pct, 100) + '%;height:100%;background:' + col + ';border-radius:5px"></div>' +
          '</div>' +
          (sugHtml ? '<div style="border-top:1px solid var(--border);padding-top:4px;margin-top:4px">' +
            '<div style="font-size:9px;color:var(--gray);text-transform:uppercase;letter-spacing:.04em;margin-bottom:2px">Per bilanciare:</div>' +
            sugHtml +
          '</div>' : '') +
        '</div>';
      }).join('');
      return '<div class="tl-divider"></div>' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">' +
          '<div class="tl-section-label" style="margin-bottom:0">\u26A0 Sbilanciamento piano</div>' +
          '<div style="font-size:12px;font-weight:700;color:' + mediaCol + '">' + Math.round(media*100) + '% medio</div>' +
        '</div>' +
        rows;
    })() +

    // 2. GRAFICO LINEE
    '<div class="tl-divider"></div>' +
    '<div class="tl-section-label">Proiezione fatturato</div>' +
    '<div class="tl-legend">' +
      '<span class="tl-leg-item"><span class="tl-leg-dot" style="background:#B4B2A9"></span>Base attuale</span>' +
      '<span class="tl-leg-item"><span class="tl-leg-dot" style="background:#FF6B2B"></span>Scenario minimo</span>' +
      '<span class="tl-leg-item"><span class="tl-leg-dot" style="background:#3D5AFE"></span>Scenario massimo</span>' +
      (idealPath ? '<span class="tl-leg-item"><span class="tl-leg-dot" style="background:rgba(180,140,40,0.6);border:1px dashed rgba(180,140,40,0.8)"></span>Percorso ideale</span>' : '') +
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
            borderColor: '#FF6B2B',
            backgroundColor: 'rgba(255,107,43,0.08)',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#FF6B2B',
            fill: false,
            tension: 0.35,
          },
          {
            label: 'Scenario massimo',
            data: pts.max,
            borderColor: '#3D5AFE',
            backgroundColor: 'rgba(61,90,254,0.08)',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#3D5AFE',
            fill: '-1',
            tension: 0.35,
          }
        ].concat(idealPath ? [{
            label: 'Percorso ideale',
            data: idealPath,
            borderColor: 'rgba(180,140,40,0.6)',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [8, 4],
            pointRadius: 0,
            tension: 0.35,
            fill: false,
          }] : [])
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false, labels: { color: 'rgba(26,26,46,0.55)' } },
          tooltip: {
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: 'rgba(0,0,0,0.08)',
            borderWidth: 1,
            titleColor: '#1a1a2e',
            bodyColor: 'rgba(26,26,46,0.55)',
            callbacks: {
              label: function(ctx) { return ctx.dataset.label + ': ' + fmtF(ctx.parsed.y) + '\u20AC'; }
            }
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 }, color: 'rgba(26,26,46,0.45)' } },
          y: {
            grid: { color: 'rgba(0,0,0,0.06)', lineWidth: 0.5 },
            ticks: { font: { size: 11 }, color: 'rgba(26,26,46,0.45)', callback: function(v) { return fmtF(v) + '\u20AC'; } },
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
  const scoreCol = (s) => s >= 70 ? 'rgba(35,100,40,0.75)' : s >= 45 ? 'rgba(140,100,25,0.75)' : 'rgba(170,30,30,0.75)';

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
    html += '<div style="font-size:18px;font-weight:700;font-family:\'Plus Jakarta Sans\',serif;color:' + col + '">' + snap.score + '<span style="font-size:10px;color:var(--gray)">/100</span></div>';
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

function _getStepDesc(settore, dimId, stepNum) {
  // 1. Settori custom (generati da AI)
  var custom = window._settoriCustomCache && window._settoriCustomCache[settore];
  if (custom && custom.dimensioni) {
    var aiLabel = _DIM_TO_AI_LABEL[dimId];
    var desc = aiLabel && custom.dimensioni[aiLabel] && custom.dimensioni[aiLabel][String(stepNum)];
    if (desc) return desc;
  }
  // 2. Statico
  const sd = (typeof STEP_DETAIL_BY_SETTORE !== 'undefined') ? STEP_DETAIL_BY_SETTORE : {};
  const detail = sd[settore]?.[dimId]?.[String(stepNum)];
  if (detail) return (detail.chi ? detail.chi + ' — ' : '') + (detail.cosa || '');
  return '—';
}

function renderTargetEditor(p) {
  const container = document.getElementById('target-editor-content');
  if (!container) return;
  container.innerHTML = '';

  // Se stiamo visualizzando un capitolo archiviato → read only
  if (_isCapitoloReadOnly) {
    var cap = (p.capitoli || [])[_currentCapitoloView];
    var periodo = cap ? cap.periodo : 'Archiviato';
    container.innerHTML = '<div style="text-align:center;padding:40px 16px;opacity:.7">' +
      '<div style="font-size:28px;margin-bottom:10px">\uD83D\uDCC1</div>' +
      '<div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:8px">Capitolo archiviato</div>' +
      '<div style="font-size:12px;color:var(--gray);line-height:1.5">' + periodo + '<br>Questa \u00E8 una vista storica in sola lettura.</div>' +
    '</div>';
    return;
  }

  const targets = p.targets || {};
  const allReached = _isAllTargetsReached(p);

  if (allReached) {
    container.innerHTML = '<div style="text-align:center;padding:40px 16px">' +
      '<div style="font-size:28px;margin-bottom:10px">\u2705</div>' +
      '<div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:8px">Obiettivi raggiunti!</div>' +
      '<div style="font-size:12px;color:var(--gray);margin-bottom:20px;line-height:1.5">Tutti gli step target sono stati completati.<br>Apri un nuovo capitolo per continuare la crescita.</div>' +
      '<button onclick="nuovoCapitolo()" class="btn btn-primary" style="font-size:13px">+ Nuovo capitolo</button>' +
    '</div>';
    return;
  }

  const scadenze = p.target_scadenze || {};
  const settore = p.settore || '';
  const azioniDone = p.azioni_completate || {};
  const azioniCustom = p.azioni_custom || {};
  let html = DIMS.map(d => {
    const cur = p.dims?.[d.id] || 0;
    const savedTgt = (d.id in targets) ? targets[d.id] : null;
    const tgt = (savedTgt !== null && savedTgt > 0) ? savedTgt : cur;
    const scad = scadenze[d.id] || '';
    const curCol = dimColor(cur);
    const tgtCol = dimColor(tgt);
    const curLvl = Math.max(cur, 1);
    const tgtLvl = Math.max(tgt, 1);
    const curDesc = _getStepDesc(settore, d.id, Math.min(curLvl, 5));
    const tgtDesc = _getStepDesc(settore, d.id, Math.min(tgtLvl, 5));
    const subObiettiviHtml = '';
    // Warning tetto strutturale
    const tettoSettore = (TETTO_BY_SETTORE[settore] || {})[d.id] || 5;
    const warningTetto = tgt > tettoSettore
      ? `\x3cdiv class="tetto-warning">&#9888;&#65039; Obiettivo oltre il tetto strutturale (max ${tettoSettore}) — questa scelta implica un cambio di modello di business\x3c/div>`
      : '';
    const haGap = tgt > cur;
    const chipBg = haGap ? `rgba(175,125,0,0.1)` : `rgba(0,130,95,0.1)`;
    const chipCol = haGap ? `rgba(175,125,0,0.9)` : `rgba(0,130,95,0.85)`;
    const chipBorder = haGap ? `rgba(175,125,0,0.25)` : `rgba(0,130,95,0.25)`;
    const chipText = haGap ? `${cur}/5 → ${tgt}/5` : `${cur}/5 ✓`;
    const curPct = (cur/5)*100;
    const tgtPct = (tgt/5)*100;
    return `\x3cdiv style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid rgba(0,0,0,0.06)">
      \x3cdiv style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        \x3cdiv style="font-size:12px;font-weight:600;color:#1a1a2e">${getDimLabel(settore, d.id)}\x3c/div>
        \x3cspan id="tsem-${d.id}" style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:20px;background:${chipBg};color:${chipCol};border:1px solid ${chipBorder}">${chipText}${scad ? ' ' + calcolaSemaforo(scad, d.id) : ''}\x3c/span>
      \x3c/div>
      \x3cdiv onclick="showTargetPopup(event,'${d.id}')"
        style="position:relative;height:8px;background:rgba(26,26,46,0.08);border-radius:4px;overflow:visible;cursor:pointer;margin-bottom:10px">
        \x3cdiv style="position:absolute;left:0;top:0;height:100%;width:${curPct}%;background:${curCol};border-radius:4px;transition:width .5s ease">\x3c/div>
        ${haGap ? `\x3cdiv style="position:absolute;left:${tgtPct}%;top:-3px;width:3px;height:14px;background:rgba(175,125,0,0.8);border-radius:2px;transform:translateX(-50%)">\x3c/div>` : ''}
      \x3c/div>
      \x3cdiv style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:center">
        \x3cdiv class="target-input-wrap">
          \x3cbutton class="target-btn" onclick="var e=document.getElementById('tgt-${d.id}');if(e&&parseInt(e.value)>1){e.value=parseInt(e.value)-1;previewTarget();updateTargetDesc('${d.id}');aggiornaAzioni('${d.id}')}">\u2212\x3c/button>
          \x3cinput class="target-input" type="number" id="tgt-${d.id}" min="1" max="5" value="${tgt}"
            onchange="previewTarget();updateTargetDesc('${d.id}');aggiornaAzioni('${d.id}')" oninput="previewTarget();updateTargetDesc('${d.id}');aggiornaAzioni('${d.id}')">
          \x3cbutton class="target-btn" onclick="var e=document.getElementById('tgt-${d.id}');if(e&&parseInt(e.value)<5){e.value=parseInt(e.value)+1;previewTarget();updateTargetDesc('${d.id}');aggiornaAzioni('${d.id}')}">+\x3c/button>
        \x3c/div>
        \x3cinput type="date" id="tscad-${d.id}" value="${scad}"
          onchange="aggiornaSemaforo('${d.id}');aggiornaAzioni('${d.id}')"
          style="padding:4px 8px;background:rgba(255,255,255,0.6);border:1px solid rgba(26,26,46,0.15);border-radius:6px;color:#1a1a2e;font-size:11px;font-family:inherit;width:100%">
      \x3c/div>
      \x3cdiv id="tdesc-${d.id}" style="display:none">${tgtDesc}\x3c/div>
      ${warningTetto}
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
  if (rsbEl) { rsbEl.style.borderColor = scP.border; rsbEl.style.background = scP.bg; }
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

function showTargetPopup(event, dimId) {
  const p = prospects.find(x => x.id === currentId);
  if (!p) return;
  const tgtEl = document.getElementById('tgt-' + dimId);
  const tgt = tgtEl ? (parseInt(tgtEl.value) || 1) : 1;
  const settore = p.settore || '';
  const label = getDimLabel(settore, dimId);
  const desc = _getStepDesc(settore, dimId, Math.min(Math.max(tgt, 1), 5));
  showDimPopup(event, label, desc, dimColor(tgt));
}

function updateTargetDesc(dimId) {
  const el = document.getElementById('tgt-' + dimId);
  const descEl = document.getElementById('tdesc-' + dimId);
  if (!el || !descEl) return;
  const tgt = parseInt(el.value) || 1;
  const p = prospects.find(x => x.id === currentId);
  const settore = p?.settore || '';
  const tgtLvl = Math.max(tgt, 1);
  const desc = _getStepDesc(settore, dimId, Math.min(tgtLvl, 5));
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

// Calcola milestone intermedie basate su tempo_mesi di ogni step
function calcolaMilestones(settore, dimId, currentStep, targetStep, finalDateStr) {
  if (targetStep <= currentStep) return {};
  var finalDate = new Date(finalDateStr);
  var oggi = new Date();
  var totalDays = Math.max(1, Math.round((finalDate - oggi) / 86400000));
  var sd = (typeof STEP_DETAIL_BY_SETTORE !== 'undefined') ? STEP_DETAIL_BY_SETTORE : {};
  var dimData = sd[settore] ? sd[settore][dimId] : null;

  // Raccogli tempo_mesi per ogni step intermedio
  var steps = [];
  var totalMesi = 0;
  for (var s = currentStep + 1; s <= targetStep; s++) {
    var detail = dimData ? dimData[String(s)] : null;
    var mesi = detail ? (detail.tempo_mesi || 1) : 1;
    totalMesi += mesi;
    steps.push({ step: s, mesi: mesi, cumMesi: totalMesi });
  }

  // Distribuisci proporzionalmente
  var milestones = {};
  steps.forEach(function(st) {
    var pct = st.cumMesi / totalMesi;
    var stepDate = new Date(oggi.getTime() + pct * totalDays * 86400000);
    milestones[String(st.step)] = stepDate.toISOString().split('T')[0];
  });
  return milestones;
}

// Semaforo per singolo step (basato sulla data milestone)
function calcolaSemaforoStep(milestoneDate, dimId) {
  if (!milestoneDate) return '';
  var giorni = Math.round((new Date(milestoneDate) - new Date()) / 86400000);
  if (giorni < 0) return '<span style="color:#FF3B30;font-weight:700">\u25CF Scaduto</span>';
  var testo;
  if (giorni < 60) testo = giorni + ' gg';
  else if (giorni < 90) testo = Math.round(giorni / 7) + ' sett.';
  else testo = (giorni / 30).toFixed(1).replace('.', ',') + ' mesi';
  // Soglie più strette per singolo step (circa metà delle soglie dimensione)
  if (giorni <= 15) return '<span style="color:#FF3B30;font-weight:600">\u25CF ' + testo + '</span>';
  if (giorni <= 45) return '<span style="color:#FF9500;font-weight:600">\u25CF ' + testo + '</span>';
  return '<span style="color:#30D158;font-weight:600">\u25CF ' + testo + '</span>';
}

function aggiornaAzioni(dimId) {
  const p = prospects.find(x => x.id === currentId);
  if (!p) return;
  const cur = (p.dims && p.dims[dimId]) || 0;
  const tgtEl = document.getElementById('tgt-' + dimId);
  const tgt = tgtEl ? parseInt(tgtEl.value) || 0 : 0;
  const block = document.getElementById('az-block-' + dimId);
  if (!block) return;

  // Mostra milestone + moduli configurabili se c'è gap
  if (tgt > cur) {
    var scEl = document.getElementById('tscad-' + dimId);
    var finalDate = scEl ? scEl.value : '';
    var settore = p.settore || '';
    var sc = p.step_completamenti || {};
    var html = '';

    // Milestone timeline
    if (finalDate) {
      var milestones = calcolaMilestones(settore, dimId, cur, tgt, finalDate);
      html += '<div class="milestone-timeline">';
      Object.keys(milestones).sort(function(a,b){ return parseInt(a)-parseInt(b); }).forEach(function(step) {
        var date = milestones[step];
        var completed = sc[dimId] && sc[dimId][step];
        var detail = typeof getStepDetail === 'function' ? getStepDetail(settore, dimId, step) : null;
        var desc = detail ? detail.cosa : '';
        var sem = completed
          ? '<span style="color:#30D158;font-weight:700">\u2713</span>'
          : calcolaSemaforoStep(date, dimId);
        var fDate = new Date(date).toLocaleDateString('it-IT', {day:'numeric', month:'short'});
        html += '<div class="milestone-row' + (completed ? ' milestone-done' : '') + '">' +
          '<div class="milestone-dot"></div>' +
          '<div class="milestone-content">' +
            '<div style="display:flex;align-items:center;justify-content:space-between">' +
              '<span class="milestone-step">Step ' + step + '</span>' +
              '<span class="milestone-meta">' + fDate + ' ' + sem + '</span>' +
            '</div>' +
            (desc ? '<div class="milestone-desc">' + desc + '</div>' : '') +
          '</div>' +
        '</div>';
      });
      html += '</div>';
    } else {
      html += '<div style="font-size:10px;color:var(--gray);padding:4px 0;font-style:italic">Inserisci la scadenza per vedere le milestone</div>';
    }

    // Moduli configurabili per ogni step con gap
    var moduliSel = p.moduli_selezionati || {};
    var fmtC = function(v) { return v ? v.toLocaleString('it-IT') + '\u20AC' : '\u2014'; };
    for (var step = cur + 1; step <= tgt; step++) {
      var stepDetail = STEP_DETAIL_BY_SETTORE?.[settore]?.[dimId]?.[String(step)];
      if (!stepDetail || !stepDetail.moduli) continue;
      var stepSel = (moduliSel[dimId] || {})[String(step)] || {};

      html += '<div class="moduli-step-block">';
      html += '<div class="moduli-step-header">Step ' + step + ' \u2014 Configurazione</div>';

      stepDetail.moduli.forEach(function(mod) {
        html += '<div class="moduli-item">';
        html += '<div class="moduli-item-header">';
        html += '<span class="moduli-item-nome">' + mod.nome + '</span>';
        if (mod.obbligatorio) html += '<span class="moduli-tag-req">richiesto</span>';
        else html += '<span class="moduli-tag-opt">opzionale</span>';
        html += '</div>';

        if (mod.tipo === 'flag') {
          var checked = stepSel[mod.id] === true || (mod.obbligatorio && stepSel[mod.id] !== false);
          html += '<label class="moduli-flag">' +
            '<input type="checkbox" ' + (checked ? 'checked' : '') + ' ' + (mod.obbligatorio ? 'disabled' : '') +
            ' onchange="toggleModulo(\'' + dimId + '\',' + step + ',\'' + mod.id + '\',this.checked)">' +
            '<span>' + fmtC(mod.costo_mensile) + '/mese' + (mod.costo_setup ? ' + ' + fmtC(mod.costo_setup) + ' setup' : '') + '</span>' +
          '</label>';
          if (mod.note) html += '<div class="moduli-note">' + mod.note + '</div>';

        } else if (mod.tipo === 'scelta') {
          var selVariante = typeof stepSel[mod.id] === 'object' ? stepSel[mod.id].variante : stepSel[mod.id];
          if (!selVariante && mod.obbligatorio && mod.varianti.length) selVariante = mod.varianti[0].id;
          mod.varianti.forEach(function(v) {
            html += '<label class="moduli-radio">' +
              '<input type="radio" name="mod_' + dimId + '_' + step + '_' + mod.id + '" value="' + v.id + '" ' +
              (selVariante === v.id ? 'checked' : '') +
              ' onchange="setModuloScelta(\'' + dimId + '\',' + step + ',\'' + mod.id + '\',\'' + v.id + '\')">' +
              '<span class="moduli-radio-label">' + v.nome + '</span>' +
              '<span class="moduli-radio-costo">' + fmtC(v.costo_mensile) + '/mese' + (v.costo_setup ? ' + ' + fmtC(v.costo_setup) : '') + '</span>' +
            '</label>';
            if (v.note) html += '<div class="moduli-note" style="padding-left:20px">' + v.note + '</div>';
          });

        } else if (mod.tipo === 'multi') {
          var items = Array.isArray(stepSel[mod.id]) ? stepSel[mod.id] : [];
          mod.varianti.forEach(function(v) {
            var found = items.find(function(x) { return x.variante === v.id; });
            var qty = found ? found.qty : 0;
            html += '<div class="moduli-multi-row">' +
              '<span class="moduli-multi-nome">' + v.nome + '</span>' +
              '<span class="moduli-multi-costo">' + fmtC(v.costo_mensile) + '/cad</span>' +
              '<div class="moduli-multi-qty">' +
                '<button class="moduli-qty-btn" onclick="setModuloMultiQty(\'' + dimId + '\',' + step + ',\'' + mod.id + '\',\'' + v.id + '\',' + Math.max(0, qty - 1) + ')">\u2212</button>' +
                '<span class="moduli-qty-val">' + qty + '</span>' +
                '<button class="moduli-qty-btn" onclick="setModuloMultiQty(\'' + dimId + '\',' + step + ',\'' + mod.id + '\',\'' + v.id + '\',' + (qty + 1) + ')">+</button>' +
              '</div>' +
            '</div>';
            if (v.note && qty > 0) html += '<div class="moduli-note" style="padding-left:4px">' + v.note + '</div>';
          });
          if (mod.min) html += '<div class="moduli-note">Minimo ' + mod.min + ' figure</div>';
        }

        html += '</div>'; // fine moduli-item
      });

      // Moduli custom del CSO per questo step
      var customMods = (stepSel._custom || []);
      customMods.forEach(function(cm, ci) {
        var impLabel = cm.impatto >= 0.7 ? 'Alto' : cm.impatto >= 0.4 ? 'Medio' : 'Basso';
        html += '<div class="moduli-item" style="background:rgba(61,90,254,0.04);border-radius:6px;padding:6px 8px;margin-top:4px">' +
          '<div style="display:flex;align-items:center;justify-content:space-between">' +
            '<span class="moduli-item-nome">' + (cm.nome || 'Custom') + '</span>' +
            '<span style="font-size:9px;color:var(--gray)">' + fmtC(cm.costo_mensile || 0) + '/mese · Impatto: ' + impLabel + '</span>' +
            '<button onclick="rimuoviModuloCustom(\'' + dimId + '\',' + step + ',' + ci + ')" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:12px;padding:0 4px">&times;</button>' +
          '</div>' +
        '</div>';
      });

      // Bottone aggiungi custom
      html += '<div onclick="aggiungiModuloCustom(\'' + dimId + '\',' + step + ')" ' +
        'style="margin-top:6px;font-size:10px;color:rgba(70,100,200,0.7);cursor:pointer;font-weight:600;padding:4px 0">+ Voce personalizzata</div>';

      html += '</div>'; // fine moduli-step-block
    }

    block.innerHTML = html;
  } else {
    block.innerHTML = '';
  }
}

// ── MODULI HANDLERS ──────────────────────────────────────────

function aggiungiModuloCustom(dimId, step) {
  _apriModaleModuloCSO(function(dati) {
    var sel = _getModuliSel();
    var stepSel = _ensureModuliPath(sel, dimId, step);
    if (!Array.isArray(stepSel._custom)) stepSel._custom = [];
    stepSel._custom.push({ nome: dati.nome, costo_mensile: dati.mensile, costo_setup: dati.setup, impatto: dati.impatto, attivo: true });
    aggiornaAzioni(dimId);
    previewTarget();
  });
}

function rimuoviModuloCustom(dimId, step, idx) {
  var sel = _getModuliSel();
  var stepSel = (sel[dimId] || {})[String(step)];
  if (stepSel && Array.isArray(stepSel._custom)) {
    stepSel._custom.splice(idx, 1);
    aggiornaAzioni(dimId);
    previewTarget();
  }
}
function _getModuliSel() {
  var p = prospects.find(function(x) { return x.id === currentId; });
  if (!p) return {};
  if (!p.moduli_selezionati) p.moduli_selezionati = {};
  return p.moduli_selezionati;
}
function _ensureModuliPath(sel, dimId, step) {
  if (!sel[dimId]) sel[dimId] = {};
  if (!sel[dimId][String(step)]) sel[dimId][String(step)] = {};
  return sel[dimId][String(step)];
}

function toggleModulo(dimId, step, modId, checked) {
  var sel = _getModuliSel();
  var stepSel = _ensureModuliPath(sel, dimId, step);
  stepSel[modId] = checked;
  previewTarget();
}

function setModuloScelta(dimId, step, modId, varianteId) {
  var sel = _getModuliSel();
  var stepSel = _ensureModuliPath(sel, dimId, step);
  stepSel[modId] = { variante: varianteId };
  previewTarget();
}

function setModuloMultiQty(dimId, step, modId, varianteId, qty) {
  var sel = _getModuliSel();
  var stepSel = _ensureModuliPath(sel, dimId, step);
  if (!Array.isArray(stepSel[modId])) stepSel[modId] = [];
  var items = stepSel[modId];
  var idx = items.findIndex(function(x) { return x.variante === varianteId; });
  if (qty < 0) qty = 0;
  if (idx >= 0) items[idx].qty = qty;
  else items.push({ variante: varianteId, qty: qty });
  // Re-render il blocco per aggiornare i numeri
  aggiornaAzioni(dimId);
  previewTarget();
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

  // Validazione: data obbligatoria quando target > livello attuale
  var missingDates = [];
  DIMS.forEach(d => {
    var cur = (p.dims || {})[d.id] || 0;
    if ((targets[d.id] || 0) > cur && !scadenze[d.id]) {
      missingDates.push(d.id);
    }
  });
  if (missingDates.length > 0) {
    var labels = missingDates.map(id => typeof getDimLabel === 'function' ? getDimLabel(p.settore, id) : id);
    showToast('Inserisci la scadenza per: ' + labels.join(', '), 'error');
    missingDates.forEach(id => {
      var el = document.getElementById('tscad-' + id);
      if (el) { el.classList.add('scad-missing'); setTimeout(function() { el.classList.remove('scad-missing'); }, 3000); }
    });
    var firstEl = document.getElementById('tscad-' + missingDates[0]);
    if (firstEl) firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Calcola milestone intermedie per ogni dimensione con gap
  var milestones = {};
  DIMS.forEach(d => {
    var cur = (p.dims || {})[d.id] || 0;
    if ((targets[d.id] || 0) > cur && scadenze[d.id]) {
      milestones[d.id] = calcolaMilestones(p.settore || '', d.id, cur, targets[d.id], scadenze[d.id]);
    }
  });

  // Salva snapshot proiezione prima di aggiornare i target
  const pTemp = {...p, targets: targets};
  const icSnap = _calcolaImpattoCumulativo(pTemp);
  const proiezioneSnapshot = icSnap ? {
    data: new Date().toISOString(),
    fatturato_base: p.fatturato_anno_1 || 0,
    fat6: icSnap.fat6, fat12: icSnap.fat12, fat24: icSnap.fat24,
    costoMensile: icSnap.costoMensileTot,
    dims_partenza: {...(p.dims || {})},
    targets: {...targets}
  } : null;

  // Salva target (campi sicuri)
  var moduliSel = p.moduli_selezionati || {};
  const {error} = await sb.from('prospects').update({targets, target_scadenze: scadenze, target_milestones: milestones, moduli_selezionati: moduliSel}).eq('id', currentId);
  if (error) { showToast('Errore salvataggio target', 'error'); return; }
  const i = prospects.findIndex(x => x.id === currentId);
  prospects[i].targets = targets;
  prospects[i].target_scadenze = scadenze;
  prospects[i].target_milestones = milestones;
  // Salva snapshot proiezione (campo opzionale, potrebbe non esistere in DB)
  if (proiezioneSnapshot) {
    prospects[i].proiezione_snapshot = proiezioneSnapshot;
    try { await sb.from('prospects').update({proiezione_snapshot: proiezioneSnapshot}).eq('id', currentId); } catch(e) {}
  }
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
          font-family:'Plus Jakarta Sans',sans-serif;width:100%">
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
            \x3cdiv style="font-size:18px;font-family:'Plus Jakarta Sans',sans-serif" id="calc-margine-lordo">--\x3c/div>
            \x3cdiv style="font-size:9px;color:var(--gray2);margin-top:2px">(Fatt. - Costi fissi) / Fatt.\x3c/div>
          \x3c/div>
          \x3cdiv style="background:var(--bg2);border-radius:var(--rs);padding:10px;text-align:center;border:1px solid var(--border)">
            \x3cdiv style="font-size:9px;color:var(--gray);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px">Margine EBITDA\x3c/div>
            \x3cdiv style="font-size:18px;font-family:'Plus Jakarta Sans',sans-serif" id="calc-margine-ebitda">--\x3c/div>
            \x3cdiv style="font-size:9px;color:var(--gray2);margin-top:2px">EBITDA / Fatturato\x3c/div>
          \x3c/div>
          \x3cdiv style="background:var(--bg2);border-radius:var(--rs);padding:10px;text-align:center;border:1px solid var(--border)">
            \x3cdiv style="font-size:9px;color:var(--gray);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px">Margine netto\x3c/div>
            \x3cdiv style="font-size:18px;font-family:'Plus Jakarta Sans',sans-serif" id="calc-margine-netto">--\x3c/div>
            \x3cdiv style="font-size:9px;color:var(--gray2);margin-top:2px">Utile netto / Fatturato\x3c/div>
          \x3c/div>
        \x3c/div>
        \x3cbutton type="button" onclick="usaMargineCalcolato()" style="
          background:var(--amber-bg);border:1px solid var(--gold-dim);color:var(--gold);
          border-radius:4px;padding:4px 12px;font-size:10px;font-weight:600;cursor:pointer;
          font-family:'Plus Jakarta Sans',sans-serif">
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
  return '<div id="calc-mount"></div>';
}

function mountCalcolatrice(container) {
  if (!container) container = document.getElementById('calc-mount');
  if (!container) return;
  var _root = container; // riferimento per le sotto-funzioni

  var p = prospects.find(function(x){ return x.id === currentId; }) || {};
  var dc = p.dati_calcolatrice || {};
  var gv = function(k, fb) { return dc[k] != null ? dc[k] : (fb != null ? fb : ''); };

  container.innerHTML = '';

  var wrap = document.createElement('div');
  wrap.style.cssText = 'padding:4px 0';

  // Helper: crea riga
  function row(label, inputId, placeholder, value) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.textContent = label;
    td1.style.cssText = 'padding:7px 8px;font-size:12px;color:var(--gray);border-bottom:1px solid var(--border);width:55%';
    var td2 = document.createElement('td');
    td2.style.cssText = 'padding:7px 8px;text-align:right;border-bottom:1px solid var(--border)';
    var inp = document.createElement('input');
    inp.type = 'number';
    inp.id = inputId;
    inp.placeholder = placeholder || '';
    inp.value = value !== '' && value != null ? value : '';
    inp.style.cssText = 'background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:6px 10px;font-size:13px;color:var(--white);font-family:inherit;outline:none;width:130px;text-align:right';
    inp.addEventListener('input', calcola);
    inp.addEventListener('focus', function(){ inp.style.borderColor = 'var(--gold)'; });
    inp.addEventListener('blur', function(){ inp.style.borderColor = 'var(--border)'; });
    td2.appendChild(inp);
    tr.appendChild(td1);
    tr.appendChild(td2);
    return tr;
  }

  // Helper: riga risultato con effetto glass
  function resRow(label, resId, big) {
    var tr = document.createElement('tr');
    if (big) {
      tr.style.cssText = 'background:linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%);border-radius:8px';
    }
    var td1 = document.createElement('td');
    td1.textContent = label;
    td1.style.cssText = 'padding:' + (big?'12':'8') + 'px ' + (big?'12':'8') + 'px;font-size:' + (big?'14':'12') + 'px;font-weight:600;color:var(--white);border-bottom:' + (big?'none':'2px solid var(--border)');
    if (big) td1.style.borderRadius = '8px 0 0 8px';
    var td2 = document.createElement('td');
    td2.id = resId;
    td2.textContent = '--';
    td2.style.cssText = 'padding:' + (big?'12':'8') + 'px ' + (big?'12':'8') + 'px;text-align:right;font-size:' + (big?'18':'13') + 'px;font-weight:' + (big?'700':'600') + ';color:var(--white);border-bottom:' + (big?'none':'2px solid var(--border)');
    if (big) {
      td2.style.borderRadius = '0 8px 8px 0';
      td2.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.06)';
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    return tr;
  }

  // Helper: sezione label
  function section(text) {
    var d = document.createElement('div');
    d.textContent = text;
    d.style.cssText = 'font-size:10px;font-weight:700;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;margin:16px 0 8px;padding-bottom:6px;border-bottom:1px solid var(--border)';
    return d;
  }

  // TITOLO
  var title = document.createElement('div');
  title.textContent = 'Conto Economico';
  title.style.cssText = 'font-size:12px;font-weight:700;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;margin-bottom:14px';
  wrap.appendChild(title);

  // RICAVI
  wrap.appendChild(section('Ricavi'));
  var t1 = document.createElement('table');
  t1.style.cssText = 'width:100%;border-collapse:collapse';
  t1.appendChild(row('Fatturato anno corrente', 'c-fat', 'es. 500000', gv('fatturato', p.fatturato_anno_1)));
  t1.appendChild(row('Fatturato anno precedente', 'c-fat-prec', 'es. 450000', gv('fatturato_prec')));
  t1.appendChild(resRow('Delta', 'c-res-delta', false));
  wrap.appendChild(t1);

  // COSTI VARIABILI
  wrap.appendChild(section('Costi variabili'));
  var t2 = document.createElement('table');
  t2.style.cssText = 'width:100%;border-collapse:collapse';

  // CDV riga speciale con % e EUR
  var trCdv = document.createElement('tr');
  var tdCdv1 = document.createElement('td');
  tdCdv1.innerHTML = 'Costo del venduto<br><span style="font-size:10px;color:var(--gray2)">materie prime, acquisti</span>';
  tdCdv1.style.cssText = 'padding:7px 8px;font-size:12px;color:var(--gray);border-bottom:1px solid var(--border);width:55%';
  var tdCdv2 = document.createElement('td');
  tdCdv2.style.cssText = 'padding:7px 8px;text-align:right;border-bottom:1px solid var(--border)';

  var cdvPctInp = document.createElement('input');
  cdvPctInp.type = 'number'; cdvPctInp.id = 'c-cdv-pct';
  cdvPctInp.placeholder = '%'; cdvPctInp.min = '0'; cdvPctInp.max = '100'; cdvPctInp.step = '0.1';
  cdvPctInp.value = gv('cdv_pct');
  cdvPctInp.style.cssText = 'background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:6px 8px;font-size:13px;color:var(--white);font-family:inherit;outline:none;width:60px;text-align:right';

  var cdvEurInp = document.createElement('input');
  cdvEurInp.type = 'number'; cdvEurInp.id = 'c-cdv-eur';
  cdvEurInp.placeholder = 'EUR';
  cdvEurInp.value = gv('cdv_eur');
  cdvEurInp.style.cssText = 'background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:6px 8px;font-size:13px;color:var(--white);font-family:inherit;outline:none;width:100px;text-align:right;margin-left:6px';

  cdvPctInp.addEventListener('input', function(){ cdvEurInp.value = ''; cdvEurInp.style.opacity = '0.3'; cdvPctInp.style.opacity = '1'; calcola(); });
  cdvEurInp.addEventListener('input', function(){ cdvPctInp.value = ''; cdvPctInp.style.opacity = '0.3'; cdvEurInp.style.opacity = '1'; calcola(); });

  var span = document.createElement('span');
  span.textContent = '% ';
  span.style.cssText = 'color:var(--gray);font-size:11px';
  var span2 = document.createElement('span');
  span2.textContent = ' o ';
  span2.style.cssText = 'color:var(--gray2);font-size:10px';

  tdCdv2.appendChild(cdvPctInp);
  tdCdv2.appendChild(span);
  tdCdv2.appendChild(span2);
  tdCdv2.appendChild(cdvEurInp);
  trCdv.appendChild(tdCdv1);
  trCdv.appendChild(tdCdv2);
  t2.appendChild(trCdv);

  t2.appendChild(resRow('= Margine di Contribuzione', 'c-res-margine', false));
  wrap.appendChild(t2);

  // COSTI FISSI
  wrap.appendChild(section('Costi fissi annui'));
  var t3 = document.createElement('table');
  t3.style.cssText = 'width:100%;border-collapse:collapse';
  t3.appendChild(row('Personale (stipendi + contributi)', 'c-cf-pers', 'es. 120000', gv('cf_personale')));
  t3.appendChild(row('Affitto e utenze', 'c-cf-aff', 'es. 24000', gv('cf_affitto')));
  t3.appendChild(row('Servizi e consulenze', 'c-cf-serv', 'es. 18000', gv('cf_servizi')));
  t3.appendChild(row('Altri costi fissi', 'c-cf-altro', 'es. 12000', gv('cf_altro')));
  t3.appendChild(resRow('Totale costi fissi', 'c-res-cf', false));
  wrap.appendChild(t3);

  // EBITDA
  var t4 = document.createElement('table');
  t4.style.cssText = 'width:100%;border-collapse:collapse;margin-top:8px';
  t4.appendChild(resRow('= EBITDA', 'c-res-ebitda', true));
  wrap.appendChild(t4);

  // AMMORTAMENTI
  wrap.appendChild(section('Ammortamenti'));
  var t5 = document.createElement('table');
  t5.style.cssText = 'width:100%;border-collapse:collapse';
  t5.appendChild(row('Ammortamenti annui', 'c-amm', 'es. 30000', gv('ammortamenti')));

  // Calcolatrice ammortamenti per categoria
  var ammToggle = document.createElement('div');
  ammToggle.style.cssText = 'font-size:10px;color:var(--gold);cursor:pointer;padding:6px 8px;margin:4px 0';
  ammToggle.textContent = '\u25BC Calcola per categoria';
  var ammPanel = document.createElement('div');
  ammPanel.style.cssText = 'display:none;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:12px;margin:4px 0 8px';
  ammToggle.addEventListener('click', function() {
    ammPanel.style.display = ammPanel.style.display === 'none' ? 'block' : 'none';
    ammToggle.textContent = ammPanel.style.display === 'none' ? '\u25BC Calcola per categoria' : '\u25B2 Chiudi calcolatrice';
  });

  var ammGrid = document.createElement('div');
  ammGrid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:8px';
  var ammCateg = [
    {id:'amm-immobili', label:'Immobili', aliq:0.03, aliqLabel:'3%', val: gv('imm_amm_immobili')},
    {id:'amm-macchinari', label:'Macchinari', aliq:0.125, aliqLabel:'12.5%', val: gv('imm_amm_macchinari')},
    {id:'amm-attrezzatura', label:'Attrezzatura', aliq:0.20, aliqLabel:'20%', val: gv('imm_amm_attrezzatura')},
    {id:'amm-veicoli', label:'Veicoli', aliq:0.20, aliqLabel:'20%', val: gv('imm_amm_veicoli')},
    {id:'amm-software', label:'Software', aliq:0.33, aliqLabel:'33%', val: gv('imm_amm_software')},
    {id:'amm-leasing', label:'Leasing (EUR/mese)', aliq:12, aliqLabel:'x12', val: gv('imm_amm_leasing')},
  ];
  var ammTotEl = document.createElement('div');
  ammTotEl.style.cssText = 'font-size:12px;color:var(--gold);margin-top:10px;font-weight:600';
  ammTotEl.textContent = 'Totale: -- EUR';

  function calcAmm() {
    var tot = 0;
    ammCateg.forEach(function(c) {
      var el = _root ? _root.querySelector('#' + c.id) : document.getElementById(c.id);
      if (el && el.value) {
        var v = parseFloat(el.value);
        tot += c.aliq < 1 ? v * c.aliq : v * c.aliq;
      }
    });
    ammTotEl.textContent = 'Totale ammortamenti: ' + Math.round(tot).toLocaleString('it-IT') + ' EUR';
    var ammInput = _root ? _root.querySelector('#c-amm') : document.getElementById('c-amm');
    if (ammInput) { ammInput.value = Math.round(tot); calcola(); }
  }

  ammCateg.forEach(function(c) {
    var d = document.createElement('div');
    var lbl = document.createElement('div');
    lbl.style.cssText = 'font-size:10px;color:var(--gray);margin-bottom:3px';
    lbl.innerHTML = c.label + ' <span style="color:var(--gold)">' + c.aliqLabel + '</span>';
    var inp = document.createElement('input');
    inp.type = 'number'; inp.id = c.id; inp.placeholder = 'valore EUR';
    inp.value = c.val !== '' && c.val != null ? c.val : '';
    inp.style.cssText = 'background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:5px 8px;font-size:12px;color:var(--white);font-family:inherit;outline:none;width:100%';
    inp.addEventListener('input', calcAmm);
    d.appendChild(lbl);
    d.appendChild(inp);
    ammGrid.appendChild(d);
  });

  ammPanel.appendChild(ammGrid);
  ammPanel.appendChild(ammTotEl);

  var ammWrap = document.createElement('div');
  ammWrap.appendChild(ammToggle);
  ammWrap.appendChild(ammPanel);
  t5.parentNode || wrap.appendChild(ammWrap); // fallback

  t5.appendChild(resRow('= EBIT (utile operativo)', 'c-res-ebit', false));
  wrap.appendChild(t5);
  wrap.appendChild(ammWrap);

  // AREA FISCALE
  wrap.appendChild(section('Area fiscale'));
  var t6 = document.createElement('table');
  t6.style.cssText = 'width:100%;border-collapse:collapse';
  t6.appendChild(row('Compenso titolare (lordo annuo)', 'c-comp-tit', 'es. 60000', gv('reddito_titolare')));
  t6.appendChild(resRow('- Imposte e contributi', 'c-res-imposte', false));
  wrap.appendChild(t6);

  // UTILE NETTO
  var t7 = document.createElement('table');
  t7.style.cssText = 'width:100%;border-collapse:collapse;margin-top:8px';
  t7.appendChild(resRow('= Utile Netto', 'c-res-utile', true));
  wrap.appendChild(t7);

  // Bottone Salva è nel footer del popup

  container.appendChild(wrap);

  // Calcola subito con i dati presenti
  calcola();
}

function calcola() {
  // Trova il container visibile (potrebbe essere nel popup o nella pagina)
  var _mounts = document.querySelectorAll('#calc-mount');
  var _root = null;
  _mounts.forEach(function(m) { if (m.offsetParent !== null) _root = m; });
  if (!_root) _root = document;
  var _el = function(id) { return _root.querySelector('#' + id) || document.getElementById(id); };
  var fat = parseFloat(_el('c-fat')?.value) || 0;
  var fatPrec = parseFloat(_el('c-fat-prec')?.value) || 0;
  var fmt = function(n) { return Math.round(n).toLocaleString('it-IT') + ' \u20AC'; };
  var pct = function(n, b) { return b > 0 ? ' (' + (n/b*100).toFixed(1) + '%)' : ''; };

  // Delta
  var dEl = _el('c-res-delta');
  if (dEl) {
    if (fatPrec > 0 && fat > 0) {
      var d = ((fat - fatPrec) / fatPrec * 100).toFixed(1);
      dEl.innerHTML = '<span style="color:' + (d >= 0 ? 'var(--green)' : 'var(--red)') + '">' + (d >= 0 ? '+' : '') + d + '%</span>';
    } else dEl.textContent = '--';
  }

  // CDV
  var cdvP = _el('c-cdv-pct')?.value;
  var cdvE = _el('c-cdv-eur')?.value;
  var cdv = 0;
  if (cdvP !== '' && cdvP != null && !isNaN(parseFloat(cdvP))) cdv = fat * parseFloat(cdvP) / 100;
  else if (cdvE !== '' && cdvE != null && !isNaN(parseFloat(cdvE))) cdv = parseFloat(cdvE);

  // Margine
  var margine = fat - cdv;
  var mEl = _el('c-res-margine');
  if (mEl) mEl.innerHTML = fat > 0 ? '<strong>' + fmt(margine) + '</strong>' + pct(margine, fat) : '--';

  // CF
  var cfP = parseFloat(_el('c-cf-pers')?.value) || 0;
  var cfA = parseFloat(_el('c-cf-aff')?.value) || 0;
  var cfS = parseFloat(_el('c-cf-serv')?.value) || 0;
  var cfO = parseFloat(_el('c-cf-altro')?.value) || 0;
  var cfTot = cfP + cfA + cfS + cfO;
  var cfEl = _el('c-res-cf');
  if (cfEl) cfEl.textContent = cfTot > 0 ? fmt(cfTot) : '--';

  // EBITDA
  var ebitda = margine - cfTot;
  var eEl = _el('c-res-ebitda');
  if (eEl) eEl.innerHTML = fat > 0 ? '<strong style="color:' + (ebitda >= 0 ? 'var(--green)' : 'var(--red)') + '">' + fmt(ebitda) + '</strong>' + pct(ebitda, fat) : '--';

  // EBIT
  var amm = parseFloat(_el('c-amm')?.value) || 0;
  var ebit = ebitda - amm;
  var ebitEl = _el('c-res-ebit');
  if (ebitEl) ebitEl.innerHTML = fat > 0 ? '<strong>' + fmt(ebit) + '</strong>' + pct(ebit, fat) : '--';

  // Imposte
  var comp = parseFloat(_el('c-comp-tit')?.value) || 0;
  var p = prospects.find(function(x){ return x.id === currentId; }) || {};
  var FORMA_TO_REGIME = {'Srl':'srl','Spa':'srl','Srls':'srl','Sapa':'srl','Snc':'snc_sas','Sas':'snc_sas','Ditta individuale':'ditta','Imprenditore individuale':'ditta','Cooperativa':'srl'};
  var regime = FORMA_TO_REGIME[p.forma_giuridica || ''] || 'srl';
  var imposte = 0, det = '';
  if (ebit > 0) {
    if (regime === 'srl') {
      var ires = ebit * 0.24, irap = ebit * 0.039, inps = comp * 0.2607;
      imposte = ires + irap + inps;
      det = 'IRES ' + Math.round(ires/1000) + 'k + IRAP ' + Math.round(irap/1000) + 'k' + (comp > 0 ? ' + INPS ' + Math.round(inps/1000) + 'k' : '');
    } else if (regime === 'snc_sas') {
      var irpef = ebit * 0.35, irap = ebit * 0.039;
      imposte = irpef + irap; det = 'IRPEF ~' + Math.round(irpef/1000) + 'k + IRAP ' + Math.round(irap/1000) + 'k';
    } else {
      var irpef = ebit * 0.35, inps = Math.min(ebit, 119650) * 0.24;
      imposte = irpef + inps; det = 'IRPEF ~' + Math.round(irpef/1000) + 'k + INPS ' + Math.round(inps/1000) + 'k';
    }
  }
  var impEl = _el('c-res-imposte');
  if (impEl) impEl.innerHTML = imposte > 0 ? '<span style="color:var(--red)">' + fmt(imposte) + '</span><br><span style="font-size:9px;color:var(--gray)">' + det + '</span>' : '--';

  // Utile
  var utile = ebit - imposte - comp;
  var uEl = _el('c-res-utile');
  if (uEl) uEl.innerHTML = fat > 0 ? '<strong style="color:' + (utile >= 0 ? 'var(--green)' : 'var(--red)') + ';font-size:18px">' + fmt(utile) + '</strong>' + pct(utile, fat) : '--';

  // Memoria — aggiorna solo se il campo fatturato esiste nel DOM
  var fatEl = _el('c-fat');
  if (p.id && fatEl) {
    p.fatturato_anno_1 = fat || p.fatturato_anno_1 || null;
    p.ebitda = ebitda || null;
    p.margine_pct = fat > 0 ? parseFloat((margine / fat * 100).toFixed(1)) : null;
    p.utile_netto = utile || null;
    p.costi_fissi_mensili = cfTot > 0 ? Math.round(cfTot / 12) : null;
  }
}

function aggiornaCalcolatrice() { calcola(); }

async function salvaDaCalcolatrice() {
  var p = prospects.find(function(x){ return x.id === currentId; });
  if (!p) return;
  var _mounts = document.querySelectorAll('#calc-mount');
  var _root = null;
  _mounts.forEach(function(m) { if (m.offsetParent !== null) _root = m; });
  if (!_root) _root = document;
  var gv = function(id) { var el = _root.querySelector('#' + id) || document.getElementById(id); return el && el.value !== '' ? parseFloat(el.value) : null; };
  var dc = {
    fatturato: gv('c-fat'), fatturato_prec: gv('c-fat-prec'),
    cdv_pct: gv('c-cdv-pct'), cdv_eur: gv('c-cdv-eur'),
    cf_personale: gv('c-cf-pers'), cf_affitto: gv('c-cf-aff'),
    cf_servizi: gv('c-cf-serv'), cf_altro: gv('c-cf-altro'),
    ammortamenti: gv('c-amm'), reddito_titolare: gv('c-comp-tit'),
    imm_amm_immobili: gv('amm-immobili'), imm_amm_macchinari: gv('amm-macchinari'),
    imm_amm_attrezzatura: gv('amm-attrezzatura'), imm_amm_veicoli: gv('amm-veicoli'),
    imm_amm_software: gv('amm-software'), imm_amm_leasing: gv('amm-leasing'),
  };
  var fat = dc.fatturato || 0;
  var cdv = dc.cdv_pct != null ? fat * dc.cdv_pct / 100 : (dc.cdv_eur || 0);
  var margine = fat - cdv;
  var cfTot = (dc.cf_personale||0) + (dc.cf_affitto||0) + (dc.cf_servizi||0) + (dc.cf_altro||0);
  var ebitda = margine - cfTot;
  var updates = {
    fatturato_anno_1: fat || null,
    ebitda: ebitda || null,
    margine_pct: fat > 0 ? parseFloat((margine / fat * 100).toFixed(1)) : null,
    costi_fissi_mensili: cfTot > 0 ? Math.round(cfTot / 12) : null,
    dati_calcolatrice: dc
  };
  Object.assign(p, updates);
  try {
    await sb.from('prospects').update(updates).eq('id', p.id);
    showToast('Dati finanziari salvati');
  } catch(e) { showToast('Errore: ' + e.message, 'error'); }
}

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
  // NOTA: 'team' (Organizzazione) non si ricava dai KPI commerciali ?
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


// ═══════════════════════════════════════════════════════════════════════════════
// PMI — FASE 4: Sidebar e navigazione
// ═══════════════════════════════════════════════════════════════════════════════

var _pmiCurrentView = 'home';

/* ── Sidebar tooltip ──────────────────────────────────────────────────────── */
function _levaTipShow(el, text) {
  clearTimeout(window._levaTipTimer);
  window._levaTipTimer = setTimeout(function() {
    var tip = document.getElementById('leva-sidebar-tip');
    if (!tip) {
      tip = document.createElement('div');
      tip.id = 'leva-sidebar-tip';
      document.body.appendChild(tip);
    }
    tip.innerHTML =
      '<div style="position:absolute;left:-5px;top:50%;transform:translateY(-50%);width:0;height:0;' +
        'border-top:5px solid transparent;border-bottom:5px solid transparent;' +
        'border-right:5px solid rgba(123,97,255,0.92);"></div>' + text;
    tip.style.cssText =
      'position:fixed;z-index:99999;background:rgba(123,97,255,0.92);color:white;' +
      'font-size:12px;font-weight:600;padding:6px 12px 6px 14px;border-radius:8px;' +
      'white-space:nowrap;pointer-events:none;opacity:0;transition:opacity 0.15s;';
    var rect = el.getBoundingClientRect();
    tip.style.left  = (rect.right + 8) + 'px';
    tip.style.top   = (rect.top + rect.height / 2) + 'px';
    tip.style.transform = 'translateY(-50%)';
    // Force reflow then fade in
    tip.offsetHeight;
    tip.style.opacity = '1';
  }, 200);
}
function _levaTipHide() {
  clearTimeout(window._levaTipTimer);
  var tip = document.getElementById('leva-sidebar-tip');
  if (tip) { tip.style.opacity = '0'; }
}

function renderSidebarPMI() {
  var sidebar = document.getElementById('pmi-sidebar');
  if (!sidebar) return;

  // ── Deep Space sidebar: 100px, solo icone ─────────────────────────────────
  sidebar.style.cssText = [
    'background:var(--leva-bg-sidebar,#050508)',
    'width:100px','min-width:100px','max-width:100px','height:100vh',
    'padding:20px 0','display:flex','flex-direction:column',
    'align-items:center','gap:8px','overflow:hidden','flex-shrink:0',
    'border-right:0.5px solid rgba(255,255,255,0.05)',
    'position:relative','z-index:2'
  ].join(';');

  var pmiApp = document.getElementById('app-pmi');
  if (pmiApp) {
    pmiApp.style.display = 'grid';
    pmiApp.style.gridTemplateColumns = '100px 1fr';
    pmiApp.style.height = '100vh';
    pmiApp.style.overflow = 'hidden';
    pmiApp.style.position = 'relative';
  }

  var _plan   = window._userPlan || 'self';
  var _isBase = _plan === 'guided_base' || _plan === 'guided_pro';
  var _isPro  = _plan === 'guided_pro';

  var navItems = [
    { id:'home',   title:'Home',
      svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' },
    { id:'azioni', title:'Dashboard',
      svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' },
    { id:'score',  title:'Score',
      svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>' },
    { id:'trend',  title:'Trend',
      svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
  ];

  if (_isBase) navItems.push({ id:'piano_cso', title:'Piano CSO',
    svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="4" y1="6" x2="16" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="11" y2="18"/><circle cx="20" cy="18" r="3"/></svg>' });
  if (_isPro) {
    navItems.push({ id:'report',      title:'Report',
      svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="13" y2="12"/></svg>' });
    navItems.push({ id:'simulazioni', title:'Simulaz.',
      svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l5-6 4 3 6-10"/></svg>' });
    navItems.push({ id:'benchmark',   title:'Benchmark',
      svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="14" width="4" height="6" rx="1"/><rect x="10" y="10" width="4" height="10" rx="1"/><rect x="17" y="6" width="4" height="14" rx="1"/></svg>' });
  }
  navItems.push({ id:'piano', title:'Il tuo piano',
    svg:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 2l2 5.5 5.5.8-4 3.9 1 5.5L12 15l-4.5 2.7 1-5.5-4-3.9 5.5-.8z"/></svg>' });

  // Logo Deep Space: barra viola
  var logoHtml =
    '<div style="margin-bottom:8px;padding:8px 0 4px;display:flex;justify-content:center;">' +
      '<svg width="44" height="44" viewBox="8 4 44 44" fill="none">' +
        '<rect x="8" y="34" width="44" height="4.5" rx="2.25" fill="#7B61FF"/>' +
        '<rect x="27.5" y="10" width="4.5" height="25" rx="2.25" fill="white"/>' +
        '<circle cx="29.75" cy="36.25" r="6" fill="white"/>' +
        '<line x1="29.75" y1="36.25" x2="47" y2="22" stroke="#FF6B2B" stroke-width="3.5" stroke-linecap="round"/>' +
        '<circle cx="47" cy="22" r="3.5" fill="#FF6B2B"/>' +
      '</svg>' +
    '</div>';

  // Divider
  var divHtml = '<div style="width:40px;height:0.5px;background:rgba(255,255,255,0.05);margin:4px 0;"></div>';

  var _up = window._userProfileData || {};
  var _pro = window._currentProfile || {};
  var _fullName = (_up.full_name || '').trim();
  var _nome = (_pro.nome || '').trim();
  var _cognome = (_pro.cognome || '').trim();
  var initials;
  if (_fullName) {
    var _parts = _fullName.split(/\s+/);
    initials = _parts[0][0].toUpperCase() + (_parts.length > 1 ? _parts[_parts.length - 1][0].toUpperCase() : '');
  } else if (_nome) {
    initials = _nome[0].toUpperCase() + (_cognome ? _cognome[0].toUpperCase() : '');
  } else {
    initials = '?';
  }

  // Stile icona nav: 64x64, border-radius 14px
  var iconStyle = 'width:64px;height:64px;border-radius:14px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background 0.15s;';

  sidebar.innerHTML =
    logoHtml +
    navItems.map(function(item) {
      var isActive = item.id === _pmiCurrentView;
      var tip = item.title.replace(/'/g, '&#39;');
      return '<div class="leva-sidebar-icon pmi-nav-item' + (isActive ? ' active' : '') +
        '" data-view="' + item.id + '" onclick="showViewPMI(\'' + item.id + '\')"' +
        ' onmouseenter="_levaTipShow(this,\'' + tip + '\')" onmouseleave="_levaTipHide()"' +
        ' style="' + iconStyle + (isActive ? 'background:rgba(123,97,255,0.15);' : '') + '">' +
        item.svg +
      '</div>';
    }).join('') +
    '<div style="flex:1;"></div>' +
    divHtml +
    '<div class="leva-sidebar-icon" title="Chiedi a Leva" style="' + iconStyle + 'background:rgba(255,107,43,0.1);border:0.5px solid rgba(255,107,43,0.25);animation:leva-glow-orange 3s infinite;margin-bottom:16px;">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF6B2B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' +
      '</svg>' +
    '</div>' +
    '<div onclick="showViewPMI(\'profilo\')" title="Profilo" style="width:50px;height:50px;border-radius:50%;background:#FF6B2B;display:flex;align-items:center;justify-content:center;cursor:pointer;margin-bottom:12px;font-size:14px;font-weight:700;color:white;text-transform:uppercase;letter-spacing:0.5px;">' +
      initials +
    '</div>';
}

function showViewPMI(view) {
  _pmiCurrentView = view;
  document.querySelectorAll('#pmi-sidebar .pmi-nav-item').forEach(function(el) {
    el.classList.toggle('active', el.dataset.view === view);
  });
  renderViewPMI(view);
}

function navigaAzioni(dim) {
  showViewPMI('azioni');
}

function navigaSezione(view) {
  showViewPMI(view);
}

function renderViewPMI(view) {
  var sidebar = document.getElementById('pmi-sidebar');
  var appPmi  = document.getElementById('app-pmi');
  var main    = document.getElementById('pmi-main');
  if (!main) return;

  // Ferma onde CSO e precedenti (ogni PMI render function ne avvia di proprie)
  _stopCSODS();
  if (window._wavesInstance) { window._wavesInstance.stop(); window._wavesInstance = null; }
  if (window._levaWavesInstance) { window._levaWavesInstance.stop(); window._levaWavesInstance = null; }

  if (sidebar) sidebar.style.display = '';

  // Aggiorna il container principale con il tema Deep Space
  if (appPmi) {
    appPmi.style.display = 'grid';
    appPmi.style.gridTemplateColumns = '100px 1fr';
    appPmi.style.height = '100vh';
    appPmi.style.overflow = 'hidden';
    appPmi.style.position = 'relative';
    appPmi.style.background = '#06080F';
  }

  main.style.background = 'transparent';
  main.style.padding    = '0';
  main.style.position   = 'relative';
  main.style.zIndex     = '1';

  renderSidebarPMI();

  if (view === 'home') {
    renderPMIHome(window._pmiProspect || {});
  } else {
    switch (view) {
      case 'score':      renderPMIScore(main);      break;
      case 'azioni':     renderPMIAzioni(main);     break;
      case 'trend':      renderPMITrend(main);      break;
      case 'piano':      renderPMIPiano(main);      break;
      case 'profilo':    renderPMIProfilo(main);    break;
      case 'piano_cso':  renderPMIPianoCSO(main);   break;
      case 'report':     renderPMIReport(main);     break;
      case 'simulazioni':renderPMISimulazioni(main);break;
      case 'benchmark':  renderPMIBenchmark(main);  break;
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// PMI — FASE 12: Primo accesso (selezione settore → diagnosi → AHA)
// ═══════════════════════════════════════════════════════════════════════════════

var PMI_MACRO_SETTORI = [
  { id:'manifatturiero', icon:'⚙️',  label:'Manifatturiero',      desc:'Produzione, metalmeccanica, lavorazioni' },
  { id:'servizi',        icon:'💼',  label:'Servizi B2B',         desc:'Consulenza, formazione, servizi professionali' },
  { id:'edilizia',       icon:'🏗️', label:'Edilizia / Impianti', desc:'Costruzioni, impiantistica, ristrutturazioni' },
  { id:'commercio',      icon:'🛒',  label:'Commercio',           desc:'Retail, distribuzione, ingrosso, automotive' },
  { id:'alimentare',     icon:'🍽️', label:'Alimentare / Food',   desc:'Produzione alimentare, bevande, ristorazione' },
  { id:'tech',           icon:'💻',  label:'Tech / Software',     desc:'SaaS, digital agency, automazione' },
];

var PMI_MICRO_SETTORI = {
  manifatturiero: [
    { id:'manifatturiero_meccanica',        label:'Meccanica / Metalmeccanica' },
    { id:'manifatturiero_elettromeccanica', label:'Elettromeccanica' },
    { id:'manifatturiero_packaging',        label:'Packaging' },
    { id:'manifatturiero_cterzi',           label:'Conto terzi' },
    { id:'manifatturiero_automotive',       label:'Fornitura automotive (OEM)' },
    { id:'manifatturiero_tessile_tessuti',  label:'Tessile — tessuti' },
    { id:'manifatturiero_tessile_capi',     label:'Tessile — capi abbigliamento' },
  ],
  servizi: [
    { id:'servizi_b2b',        label:'Consulenza / Servizi professionali' },
    { id:'servizi_it',         label:'IT / Software house' },
    { id:'servizi_formazione', label:'Formazione' },
  ],
  edilizia: [
    { id:'edilizia_residenziale', label:'Edilizia residenziale' },
    { id:'edilizia_impianti',     label:'Impiantistica' },
    { id:'edilizia_serramenti',   label:'Serramenti / Infissi' },
  ],
  commercio: [
    { id:'commercio_abbigliamento_dettaglio',   label:'Abbigliamento / Moda dettaglio' },
    { id:'commercio_orologi_gioielli',          label:'Orologi & gioielli' },
    { id:'commercio_elettronica',               label:'Elettronica / Hi-tech' },
    { id:'commercio_auto_moto_nuovo',           label:'Auto & moto nuove' },
    { id:'commercio_auto_moto_usato',           label:'Auto & moto usate' },
    { id:'commercio_distribuzione_industriale', label:'Distribuzione industriale' },
    { id:'commercio_ingrosso_alimentare',       label:'Ingrosso alimentare' },
    { id:'commercio_materiali_edili',           label:'Materiali edili' },
    { id:'commercio_ricambi_auto',              label:'Ricambi auto / moto' },
    { id:'commercio_abbigliamento_ingrosso',    label:'Abbigliamento ingrosso' },
  ],
  alimentare: [
    { id:'alimentare_trasformazione', label:'Trasformazione alimentare' },
    { id:'alimentare_vini',           label:'Vini / Cantine' },
    { id:'alimentare_birra',          label:'Birra / Bevande' },
    { id:'alimentare_forno',          label:'Panificazione / Pasticceria' },
    { id:'alimentare_conserve',       label:'Conserve / Salumi' },
    { id:'alimentare_ingredienti',    label:'Ingredienti / Semilavorati' },
  ],
  tech: [
    { id:'tech_saas',              label:'SaaS / Software' },
    { id:'tech_system_integrator', label:'System integrator' },
    { id:'tech_digital_agency',    label:'Digital agency / Marketing digitale' },
    { id:'tech_automazione',       label:'Automazione industriale' },
  ],
};

var PMI_FASCE_FATTURATO = [
  { id:'sotto_500k', label:'Sotto 500k€',   value:300000   },
  { id:'500k_2m',    label:'500k€ – 2M€',   value:1000000  },
  { id:'2m_10m',     label:'2M€ – 10M€',    value:5000000  },
  { id:'sopra_10m',  label:'Oltre 10M€',    value:12000000 },
];

var _pmiSelectedMacro   = null;
var _pmiSelectedSettore = null;
var _pmiSelectedFascia  = null;

function renderPrimoAccesso() {
  // Sidebar nascosta durante onboarding — riappare dopo la diagnosi
  var sidebar = document.getElementById('pmi-sidebar');
  if (sidebar) sidebar.style.display = 'none';
  var appPmi = document.getElementById('app-pmi');
  if (appPmi) appPmi.style.gridTemplateColumns = '1fr';

  var main = document.getElementById('pmi-main');
  if (main) {
    main.style.padding = '0';
    main.style.overflow = 'auto';
    _renderSelezioneSetting(main);
  }
}

// Mapping tag rapidi → micro-settori statici esistenti
var _PMI_TAG_MAP = {
  'Meccanica':            { settore: 'manifatturiero_meccanica',  macro: 'manifatturiero' },
  'Concessionaria':       { settore: 'commercio_auto_moto_nuovo', macro: 'commercio' },
  'Edilizia':             { settore: 'edilizia_residenziale',     macro: 'edilizia' },
  'Studio professionale': { settore: 'servizi_b2b',               macro: 'servizi' }
};

function pmiClickTag(tag) {
  var inp = document.getElementById('pmi-ai-input');
  if (inp) inp.value = tag;
  var staticMatch = _PMI_TAG_MAP[tag];
  if (staticMatch) {
    _pmiSelectedSettore = staticMatch.settore;
    _pmiSelectedMacro   = staticMatch.macro;
    _pmiUpdateAvviaBtn();
    var msg = document.getElementById('pmi-ai-msg');
    if (msg) msg.innerHTML = '<span style="color:#34D399;font-weight:600">✓ ' + _esc(tag) + ' selezionato</span>';
    var op = document.getElementById('pmi-ai-opzioni');
    if (op) op.style.display = 'none';
  } else {
    pmiSuggerisciSettori();
  }
}

function _renderSelezioneSetting(container) {
  _pmiSelectedMacro   = null;
  _pmiSelectedSettore = null;
  _pmiSelectedFascia  = null;

  var FF = window.PMI_FASCE_FATTURATO || [];

  _levaSetDSBg(container);

  container.innerHTML =
    _DS_CANVAS +
    '<div style="position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 20px;box-sizing:border-box;">' +
      '<div onclick="logout()" style="position:fixed;bottom:16px;left:16px;display:flex;align-items:center;gap:10px;padding:10px 16px;margin:0 8px;border-radius:10px;cursor:pointer;color:rgba(255,255,255,0.3);z-index:10;">' +
        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 2H4a2 2 0 00-2 2v8a2 2 0 002 2h2M11 11l3-3-3-3M14 8H6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '<span style="font-size:13px;">Esci</span>' +
      '</div>' +

      // Logo
      '<div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:16px">' +
        '<svg width="90" height="90" viewBox="8 4 44 44" fill="none">' +
          '<rect x="8" y="34" width="44" height="4.5" rx="2.25" fill="#7B61FF"/>' +
          '<rect x="27.5" y="10" width="4.5" height="25" rx="2.25" fill="white"/>' +
          '<circle cx="29.75" cy="36.25" r="6" fill="white"/>' +
          '<line x1="29.75" y1="36.25" x2="47" y2="22" stroke="#FF6B2B" stroke-width="3.5" stroke-linecap="round"/>' +
          '<circle cx="47" cy="22" r="3.5" fill="#FF6B2B"/>' +
        '</svg>' +
        '<span style="font-size:56px;font-weight:700;color:white;letter-spacing:-2px;line-height:1">eva</span>' +
      '</div>' +

      // Claim
      '<p style="font-size:24px;font-weight:700;color:white;text-align:center;letter-spacing:-0.3px;margin:0 0 10px;">Il <span style="color:#FF6B2B">Direttore Commerciale</span> che non hai mai assunto.</p>' +
      '<p style="font-size:15px;color:rgba(255,255,255,0.4);text-align:center;margin:0 0 36px;">Scopri quanto fatturato stai lasciando sul tavolo.</p>' +

      '<div style="width:100%;max-width:560px">' +

        '<h1 style="font-size:32px;font-weight:700;color:white;margin:0 0 10px;text-align:center">Cosa fa la tua azienda?</h1>' +
        '<p style="font-size:15px;color:rgba(255,255,255,0.35);text-align:center;margin:0 0 36px;line-height:1.55">Scrivi il tuo settore e Leva costruirà una diagnosi commerciale su misura per te.</p>' +

        // Barra di ricerca
        '<div id="pmi-search-wrap" style="position:relative;margin-bottom:10px;opacity:0;transform:translateY(10px);transition:opacity 0.5s ease,transform 0.5s ease;">' +
          '<svg style="position:absolute;left:22px;top:50%;transform:translateY(-50%);pointer-events:none;z-index:1" width="20" height="20" viewBox="0 0 20 20" fill="none">' +
            '<circle cx="8.5" cy="8.5" r="6" stroke="rgba(167,139,250,0.6)" stroke-width="1.8"/>' +
            '<line x1="13" y1="13" x2="18" y2="18" stroke="rgba(167,139,250,0.6)" stroke-width="1.8" stroke-linecap="round"/>' +
          '</svg>' +
          '<input id="pmi-ai-input" oninput="pmiAiOnInput()" onkeydown="if(event.key===\'Enter\'&&!this.disabled)pmiSuggerisciSettori()" ' +
            'style="width:100%;box-sizing:border-box;height:60px;background:rgba(255,255,255,0.06);border:1px solid rgba(123,97,255,0.2);border-radius:14px;padding:0 140px 0 58px;font-size:18px;color:white;outline:none;transition:border-color .2s,box-shadow .2s;" ' +
            'placeholder="Scrivi cosa fa la tua azienda..." ' +
            'onfocus="this.style.borderColor=\'#7B61FF\';this.style.boxShadow=\'0 0 12px rgba(123,97,255,0.15)\'" ' +
            'onblur="this.style.borderColor=\'rgba(123,97,255,0.2)\';this.style.boxShadow=\'none\'">' +
          '<button id="pmi-ai-btn" onclick="pmiSuggerisciSettori()" disabled ' +
            'style="position:absolute;right:0;top:0;bottom:0;padding:0 28px;background:#7B61FF;color:#fff;border:none;border-radius:0 14px 14px 0;font-size:15px;font-weight:600;cursor:pointer;opacity:0.4;transition:opacity .15s;white-space:nowrap">' +
            'Cerca' +
          '</button>' +
        '</div>' +

        // Dropdown opzioni AI
        '<div id="pmi-ai-opzioni" style="display:none;margin-bottom:8px;background:rgba(10,12,20,0.95);border:1px solid rgba(123,97,255,0.15);border-radius:14px;overflow:hidden;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);"></div>' +
        '<div id="pmi-ai-msg" style="font-size:13px;min-height:20px;margin-bottom:20px;line-height:1.5;padding:0 4px;color:rgba(255,255,255,0.5)"></div>' +

        '<p id="pmi-inizio-msg" style="font-size:12px;color:#F43F5E;min-height:18px;margin-bottom:14px;text-align:center"></p>' +

        // CTA
        '<div style="display:flex;justify-content:center;margin-bottom:20px">' +
          '<button id="pmi-avvia-btn" onclick="pmiAvviaDiagnosi()" disabled ' +
            'style="width:100%;max-width:400px;padding:16px;background:#7B61FF;color:#fff;border:none;border-radius:14px;font-size:16px;font-weight:700;cursor:not-allowed;opacity:0.4;transition:opacity .15s">' +
            'Inizia la diagnosi gratuita →' +
          '</button>' +
        '</div>' +

      '</div>' +
    '</div>';

  _levaStartWaves('leva-waves-view');

  // Fade-in animation per la barra di ricerca
  requestAnimationFrame(function() {
    var wrap = document.getElementById('pmi-search-wrap');
    if (wrap) { wrap.style.opacity = '1'; wrap.style.transform = 'translateY(0)'; }
  });
}

function _pmiUpdateAvviaBtn() {
  var btn = document.getElementById('pmi-avvia-btn');
  if (!btn) return;
  var ok = !!_pmiSelectedSettore;
  btn.disabled = !ok;
  btn.style.opacity = ok ? '1' : '0.4';
  btn.style.cursor  = ok ? 'pointer' : 'not-allowed';
  if (ok) {
    btn.onmouseover = function(){ this.style.opacity='0.88'; };
    btn.onmouseout  = function(){ this.style.opacity='1'; };
  } else {
    btn.onmouseover = null;
    btn.onmouseout  = null;
  }
}

function pmiSelMacro(macroId) {
  _pmiSelectedMacro   = macroId;
  _pmiSelectedSettore = null;
  _pmiUpdateAvviaBtn();

  // Highlight macro
  document.querySelectorAll('#pmi-macro-grid .pmi-select-card').forEach(function(el) { el.classList.remove('selected'); });
  var mc = document.getElementById('pmi-m-' + macroId);
  if (mc) mc.classList.add('selected');

  // Mostra micro-settori
  var micros = PMI_MICRO_SETTORI[macroId] || [];
  var wrap  = document.getElementById('pmi-micro-wrap');
  var grid  = document.getElementById('pmi-micro-grid');
  var label = document.getElementById('pmi-micro-label');
  if (!wrap || !grid) return;

  var macro = PMI_MACRO_SETTORI.find(function(m){ return m.id === macroId; });
  if (label && macro) label.textContent = 'Specifica — ' + macro.label;

  grid.innerHTML = micros.map(function(m) {
    return '<div class="pmi-select-card" id="pmi-s-' + m.id + '" onclick="pmiSelSettore(\'' + m.id + '\')" ' +
      'style="padding:9px 14px;font-size:12px;font-weight:600;color:#1a1a2e;white-space:nowrap">' +
      m.label +
    '</div>';
  }).join('');

  wrap.style.display = 'block';
}

function pmiSelSettore(id) {
  _pmiSelectedSettore = id;
  document.querySelectorAll('#pmi-micro-grid .pmi-select-card').forEach(function(el) { el.classList.remove('selected'); });
  var c = document.getElementById('pmi-s-' + id);
  if (c) c.classList.add('selected');
  _pmiUpdateAvviaBtn();
}

function pmiSelFascia(id) {
  _pmiSelectedFascia = id;
  document.querySelectorAll('#pmi-fascia-grid .pmi-select-card, #pmi-fascia-grid .pmi-fascia-btn').forEach(function(el) {
    el.classList.remove('selected');
    el.style.borderColor = '';
    el.style.color       = '';
    el.style.background  = '';
  });
  var c = document.getElementById('pmi-f-' + id);
  if (c) {
    c.classList.add('selected');
    c.style.borderColor = '#7B61FF';
    c.style.color       = '#A78BFA';
    c.style.background  = 'rgba(123,97,255,0.08)';
  }
}

// ── Cache settori custom (caricati da Supabase o generati da AI) ──────────────
window._settoriCustomCache = window._settoriCustomCache || {};

// Mapping dimId → label usata dall'AI
var _DIM_TO_AI_LABEL = {
  vendite:'Vendite', pipeline:'Pipeline & CRM', team:'Organizzazione',
  processi:'Processi', ricavi:'Ricavi', marketing:'Marketing',
  sitoweb:'Sito Web', ecommerce:'Post-vendita'
};
var _AI_MACRO_TO_ID = {
  'Manifatturiero':'manifatturiero', 'Servizi':'servizi', 'Servizi B2B':'servizi',
  'Edilizia':'edilizia', 'Edilizia / Impianti':'edilizia',
  'Commercio':'commercio', 'Alimentare':'alimentare', 'Alimentare / Food':'alimentare',
  'Tech':'tech', 'Tech / Software':'tech'
};

// Carica un settore custom dalla cache o da Supabase
async function _caricaSettoreCustom(settoreId) {
  if (window._settoriCustomCache[settoreId]) return window._settoriCustomCache[settoreId];
  if (typeof sb === 'undefined') return null;
  try {
    var { data } = await sb.from('settori_custom').select('*').eq('codice', settoreId).single();
    if (data) {
      window._settoriCustomCache[settoreId] = data;
      return data;
    }
  } catch(e) {}
  return null;
}

function pmiAiOnInput() {
  var val = (document.getElementById('pmi-ai-input') || {}).value || '';
  var btn = document.getElementById('pmi-ai-btn');
  if (btn) { btn.disabled = !val.trim(); btn.style.opacity = val.trim() ? '1' : '0.5'; }
  // Nascondi opzioni se l'utente modifica il testo dopo averle viste
  var opzioni = document.getElementById('pmi-ai-opzioni');
  if (opzioni) opzioni.style.display = 'none';
}

// Step 1: suggerisci 3-4 opzioni veloci
async function pmiSuggerisciSettori() {
  var input = ((document.getElementById('pmi-ai-input') || {}).value || '').trim();
  if (!input) return;

  var btn    = document.getElementById('pmi-ai-btn');
  var msg    = document.getElementById('pmi-ai-msg');
  var opzioni = document.getElementById('pmi-ai-opzioni');

  if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; btn.textContent = '...'; }
  if (msg) msg.innerHTML = '<span style="color:rgba(26,26,46,0.45)">⏳ Ricerca in corso...</span>';
  if (opzioni) opzioni.style.display = 'none';

  try {
    var res  = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'suggerisci_settori', data: { input: input } })
    });
    var json = await res.json();
    if (!json.ok || !Array.isArray(json.data)) throw new Error(json.error || 'Risposta non valida');

    var suggerimenti = json.data;
    if (msg) msg.innerHTML = '';

    // Mostra dropdown opzioni
    var _macroLabel = { commercio:'Commercio', servizi:'Servizi', manifatturiero:'Manifatturiero', edilizia:'Edilizia', alimentare:'Alimentare', tech:'Tech' };
    opzioni.innerHTML = suggerimenti.map(function(s, i) {
      var nome  = _esc(s.nome || s.nome_display || s.codice);
      var desc  = _esc(s.descrizione || '');
      var macro = _macroLabel[(s.codice || '').split('_')[0]] || '';
      return '<div onclick="pmiSelezionaESuggerisci(' + i + ')" style="padding:14px 16px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:space-between;gap:12px;transition:background .12s" onmouseover="this.style.background=\'rgba(123,97,255,0.1)\'" onmouseout="this.style.background=\'\'">' +
        '<div>' +
          '<div style="font-size:15px;font-weight:500;color:white">' + nome + '</div>' +
          (desc ? '<div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:3px">' + desc + '</div>' : '') +
        '</div>' +
        (macro ? '<span style="flex-shrink:0;font-size:11px;font-weight:600;color:#A78BFA;background:rgba(123,97,255,0.1);padding:3px 10px;border-radius:20px;white-space:nowrap">' + macro + '</span>' : '') +
      '</div>';
    }).join('');
    opzioni.style.display = 'block';

    // Salva in window per step 2
    window._pmiAiSuggerimenti = suggerimenti;

  } catch(e) {
    console.error('pmiSuggerisciSettori:', e);
    if (msg) msg.innerHTML = '<span style="color:#E53935">Errore. Riprova o scegli un settore dalla lista.</span>';
  }

  if (btn) { btn.disabled = false; btn.style.opacity = '1'; btn.textContent = 'Cerca'; }
}

// Prefisso codice AI → macro ID app
var _CODICE_PREFIX_TO_MACRO = {
  // 6 macro standard
  commercio:'commercio', servizi:'servizi', manifatturiero:'manifatturiero',
  edilizia:'edilizia', alimentare:'alimentare', tech:'tech',
  // safety net — prefix non standard che l'AI può ancora generare
  ristorazione:'alimentare', benessere:'servizi', sanitario:'servizi',
  automotive:'servizi', artigianato:'manifatturiero', agricoltura:'commercio',
};

// Step 2: utente clicca un'opzione → abilita diagnosi subito, genera in background
function pmiSelezionaESuggerisci(idx) {
  var suggerimenti = window._pmiAiSuggerimenti || [];
  var scelta = suggerimenti[idx];
  if (!scelta) return;

  var opzioni = document.getElementById('pmi-ai-opzioni');
  var msg     = document.getElementById('pmi-ai-msg');
  var btn     = document.getElementById('pmi-ai-btn');

  if (opzioni) opzioni.style.display = 'none';
  if (btn) { btn.disabled = true; btn.style.opacity = '0.5'; }

  var nomeScelta = scelta.nome || scelta.nome_display || scelta.codice;
  // Salva il nome display pulito (usato nella schermata "Analisi in corso")
  window._pmiSelectedNomeDisplay = scelta.nome_display || scelta.nome || scelta.codice;

  // Abilita subito il bottone diagnosi senza aspettare l'AI
  _pmiSelectedSettore = scelta.codice;
  _pmiSelectedMacro   = _CODICE_PREFIX_TO_MACRO[scelta.codice.split('_')[0]] || 'servizi';
  document.querySelectorAll('#pmi-macro-grid .pmi-select-card, #pmi-micro-grid .pmi-select-card').forEach(function(el) {
    el.classList.remove('selected');
  });
  _pmiUpdateAvviaBtn();

  if (msg) msg.innerHTML =
    '<span style="color:#34D399;font-weight:600">✓ ' + _esc(nomeScelta) + ' selezionato!</span>' +
    '<br><span style="color:rgba(255,255,255,0.5)">Clicca qui sotto per iniziare la tua diagnosi gratuita</span>';

  // Genera struttura in background
  window._generaSettoreNome     = nomeScelta;
  window._generaSettoreResolved = false;
  window._generaSettorePromise  = (async function() {
    try {
      var inputGenerazione = scelta.codice + ' — ' + nomeScelta;
      var res  = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'genera_settore', data: { input: inputGenerazione } })
      });
      var json = await res.json();
      if (!json.ok || !json.data) throw new Error(json.error || 'Risposta non valida');

      var sd = json.data;

      // Salva in settori_custom su Supabase
      if (typeof sb !== 'undefined') {
        await sb.from('settori_custom').upsert({
          codice:          sd.codice,
          nome_display:    sd.nome_display,
          macro_settore:   sd.macro_settore,
          dimensioni:      sd.dimensioni,
          moduli:          sd.moduli,
          benchmark_media: sd.benchmark_media,
          created_by:      window._currentUserId || null,
        }, { onConflict: 'codice' });
      }

      // Cache in memoria
      window._settoriCustomCache[sd.codice] = sd;

      // Affina macro con dato preciso dall'AI
      _pmiSelectedMacro = _AI_MACRO_TO_ID[sd.macro_settore] || _pmiSelectedMacro;

      return sd;
    } catch(e) {
      console.error('pmiSelezionaESuggerisci background:', e);
      throw e;
    } finally {
      window._generaSettoreResolved = true;
      if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
    }
  })();
}

async function pmiAvviaDiagnosi() {
  var msg = document.getElementById('pmi-inizio-msg');
  if (!_pmiSelectedMacro)   { if (msg) msg.textContent = 'Scegli il settore prima di continuare.'; return; }
  if (!_pmiSelectedSettore) { if (msg) msg.textContent = 'Specifica il tuo micro-settore.'; return; }
  if (msg) msg.textContent = '';

  // PRIMA COSA: lancia diagnosi-shock + diagnosi-domande in parallelo (fire-and-forget)
  window._datiGenerici = {};
  window._generaSettoreResolved = false;
  window._domandeResolved = false;
  window._domandeData = null;
  console.log('DIAGNOSI-SHOCK LANCIATA:', new Date().toISOString());

  // diagnosi-shock: VELOCE (15-20s) — solo shock + benchmark
  window._generaSettorePromise = fetch('/api/diagnosi-shock', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ settore: _pmiSelectedSettore, user_id: window._currentUserId || null })
  }).then(function(r) { return r.json(); })
    .then(function(data) {
      console.log('DIAGNOSI-SHOCK COMPLETATA:', new Date().toISOString());
      window._generaSettoreResolved = true;
      return data;
    });

  // diagnosi-domande: IN BACKGROUND (40-60s) — domande + tips
  window._domandePromise = fetch('/api/diagnosi-domande', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ settore: _pmiSelectedSettore, user_id: window._currentUserId || null })
  }).then(function(r) { return r.json(); })
    .then(function(data) {
      console.log('DIAGNOSI-DOMANDE COMPLETATA:', new Date().toISOString());
      window._domandeData = data;
      window._domandeResolved = true;
      return data;
    })
    .catch(function(e) {
      console.error('diagnosi-domande:', e);
      window._domandeResolved = true; // marca come completato anche in caso di errore
    });

  var profile = window._currentProfile || {};
  var upData  = window._userProfileData || {};
  var nomePMI = upData.company_name || profile.nome_completo || profile.nome || 'La mia azienda';

  // Aggiorna user_profiles con settore scelto
  try {
    await sb.from('user_profiles').update({ sector: _pmiSelectedSettore })
      .eq('user_id', window._currentUserId);
    window._userProfileData = Object.assign({}, window._userProfileData, { sector: _pmiSelectedSettore });
  } catch(e) { console.warn('user_profiles update:', e.message); }

  // Upsert: aggiorna se esiste già, crea solo se non esiste
  var nuovoP = window._pmiProspect || null;
  if (nuovoP && nuovoP.id) {
    // Prospect già esistente — aggiorna settore e azzera diagnosi precedente
    var { error: errU } = await sb.from('prospects').update({
      settore:      _pmiSelectedSettore,
      dims:         {},
      dims_answers: {},
    }).eq('id', nuovoP.id);
    if (errU) console.warn('update prospect:', errU.message);
    nuovoP = Object.assign({}, nuovoP, {
      settore:      _pmiSelectedSettore,
      dims:         {},
      dims_answers: {},
    });
    // Aggiorna anche l'oggetto nell'array prospects così apriDiagnosi legge dati puliti
    var idxP = prospects.findIndex(function(x){ return x.id === nuovoP.id; });
    if (idxP >= 0) prospects[idxP] = nuovoP;
  } else {
    var { data: created, error: errP } = await sb.from('prospects').insert({
      nome:          nomePMI,
      settore:       _pmiSelectedSettore,
      stato:         'lead',
      owner_user_id: window._currentUserId,
      dims:          {},
      targets:       {},
    }).select().single();
    if (errP || !created) {
      if (msg) msg.textContent = 'Errore nella creazione del profilo. Riprova.';
      console.error(errP);
      return;
    }
    nuovoP = created;
    prospects.push(nuovoP);
  }

  window._pmiProspect = nuovoP;
  window._userPlan = nuovoP.piano || 'self';
  if (!prospects.find(function(x){ return x.id === nuovoP.id; })) prospects.push(nuovoP);
  currentId = nuovoP.id;

  // Salva ID in localStorage come fallback per i refresh (RLS può bloccare SELECT per owner_user_id)
  try { localStorage.setItem('leva_pmi_pid_' + window._currentUserId, nuovoP.id); } catch(e) {}

  // Prepara sidebar HTML ma tienila nascosta durante la diagnosi
  renderSidebarPMI();
  var _sbar = document.getElementById('pmi-sidebar');
  if (_sbar) _sbar.style.display = 'none';
  var _appPmi = document.getElementById('app-pmi');
  if (_appPmi) _appPmi.style.gridTemplateColumns = '1fr';

  // Sposta diagnosi-overlay nel body (è dentro .app che è display:none)
  var diagOverlay = document.getElementById('diagnosi-overlay');
  if (diagOverlay && diagOverlay.parentElement !== document.body) {
    document.body.appendChild(diagOverlay);
  }

  _wizardApri();
}

// ═══════════════════════════════════════════════════════════════════════════════
// PMI — WIZARD GENERICO (6 step hardcoded, zero AI)
// Raccoglie dati base → poi avvia Fase shock quando diagnosi-start è pronto
// ═══════════════════════════════════════════════════════════════════════════════

var _wizStep = 0;
var _wizTot  = 7;
var _comuniData = null; // cache lista comuni italiani

function _loadComuni(cb) {
  if (_comuniData) { if (cb) cb(_comuniData); return; }
  fetch('/js/data/comuni.json')
    .then(function(r) { return r.json(); })
    .then(function(d) { _comuniData = d; if (cb) cb(d); })
    .catch(function() { if (cb) cb([]); });
}

function _wizardApri() {
  _wizStep = 0;
  // Precarica comuni in background
  if (!_comuniData) _loadComuni(null);

  // Rimuovi overlay precedente se c'è
  var _old = document.getElementById('leva-chat-overlay');
  if (_old && _old.parentNode) _old.parentNode.removeChild(_old);

  var overlay = document.createElement('div');
  overlay.id = 'leva-chat-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.45);z-index:9000;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;';

  var panel = document.createElement('div');
  panel.id = 'leva-chat-panel';
  panel.style.cssText = "background:#fff;border-radius:20px;width:100%;max-width:560px;max-height:85vh;display:flex;flex-direction:column;overflow:hidden;font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 24px 64px rgba(0,0,0,0.25);";

  overlay.appendChild(panel);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  _wizRender();
}

function _wizProgressBar(step, tot) {
  var pct = Math.round((step / tot) * 100);
  return '<div style="height:4px;background:#f0f0f5;flex-shrink:0;">' +
    '<div style="height:4px;background:#3D5AFE;width:' + pct + '%;transition:width 0.35s ease;border-radius:0 2px 2px 0;"></div>' +
  '</div>';
}

function _wizRender() {
  var panel = document.getElementById('leva-chat-panel');
  if (!panel) return;
  var nome = (window._datiGenerici && window._datiGenerici.nome) ? window._datiGenerici.nome.split(' ')[0] : '';

  var headerHtml =
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px 12px;flex-shrink:0;">' +
      '<span style="font-size:12px;font-weight:700;color:rgba(26,26,46,0.35);letter-spacing:0.3px;">DIAGNOSI COMMERCIALE</span>' +
      '<button onclick="_chatChiudiOverlay()" style="width:28px;height:28px;background:rgba(0,0,0,0.06);border:none;border-radius:8px;cursor:pointer;font-size:14px;color:rgba(26,26,46,0.4);line-height:1;">✕</button>' +
    '</div>' +
    _wizProgressBar(_wizStep, _wizTot);

  var bodyHtml = '';
  var footHtml = '';

  if (_wizStep === 0) {
    bodyHtml =
      '<div style="padding:32px 28px 8px;">' +
        '<div style="font-size:22px;font-weight:700;color:#1a1a2e;margin-bottom:8px;line-height:1.3;">Ciao! Come ti chiami?</div>' +
        '<div style="font-size:14px;color:rgba(26,26,46,0.45);margin-bottom:24px;">Ti chiedo qualche informazione prima di iniziare.</div>' +
        '<input id="wiz-nome" type="text" placeholder="Il tuo nome" maxlength="50" ' +
          'style="width:100%;padding:14px 16px;border:2px solid #e8e8f0;border-radius:12px;font-size:16px;font-family:\'Plus Jakarta Sans\',sans-serif;outline:none;box-sizing:border-box;color:#1a1a2e;" ' +
          'oninput="document.getElementById(\'wiz-avanti-0\').disabled=this.value.trim().length<2" ' +
          'onkeydown="if(event.key===\'Enter\'&&this.value.trim().length>=2)_wizAvanti()" />' +
      '</div>';
    footHtml =
      '<div style="padding:16px 28px 24px;display:flex;justify-content:flex-end;">' +
        '<button id="wiz-avanti-0" onclick="_wizAvanti()" disabled ' +
          'style="padding:14px 32px;background:#3D5AFE;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;opacity:0.4;transition:opacity 0.2s;" ' +
          'onmouseenter="if(!this.disabled)this.style.opacity=\'0.9\'" onmouseleave="if(!this.disabled)this.style.opacity=\'1\'">Avanti →</button>' +
      '</div>';

  } else if (_wizStep === 1) {
    var domanda = nome ? nome + ', sei soddisfatto del tuo fatturato attuale?' : 'Sei soddisfatto del tuo fatturato attuale?';
    var opz = ['Sì, va bene', 'Potrebbe andare meglio', 'No, sono preoccupato'];
    bodyHtml =
      '<div style="padding:32px 28px 8px;">' +
        '<div style="font-size:22px;font-weight:700;color:#1a1a2e;margin-bottom:24px;line-height:1.3;">' + _esc(domanda) + '</div>' +
        opz.map(function(o, i) {
          var sel = window._datiGenerici.soddisfazione === o;
          return '<button onclick="_wizSelBtn(1,this,' + i + ')" data-val="' + _esc(o) + '" ' +
            'style="display:block;width:100%;text-align:left;padding:14px 18px;margin-bottom:10px;border:2px solid ' + (sel ? '#3D5AFE' : '#e8e8f0') + ';background:' + (sel ? 'rgba(61,90,254,0.07)' : '#fff') + ';border-radius:12px;font-size:15px;font-weight:500;color:#1a1a2e;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;">' +
            _esc(o) + '</button>';
        }).join('') +
      '</div>';
    footHtml = _wizFooter(true, !!window._datiGenerici.soddisfazione);

  } else if (_wizStep === 2) {
    var domanda2 = nome ? nome + ', su quali aree ti senti meno forte?' : 'Su quali aree ti senti meno forte?';
    var aree = ['Vendite','Marketing','Clienti','Prezzi','Team','Processi','Digitale','Fornitori'];
    var sel2 = window._datiGenerici.aree_deboli || [];
    bodyHtml =
      '<div style="padding:32px 28px 8px;">' +
        '<div style="font-size:22px;font-weight:700;color:#1a1a2e;margin-bottom:6px;line-height:1.3;">' + _esc(domanda2) + '</div>' +
        '<div style="font-size:13px;color:rgba(26,26,46,0.4);margin-bottom:20px;">Seleziona fino a 3 aree</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:10px;">' +
        aree.map(function(a) {
          var isS = sel2.indexOf(a) >= 0;
          return '<button onclick="_wizToggleArea(\'' + a + '\')" data-area="' + a + '" ' +
            'style="padding:10px 18px;border:2px solid ' + (isS ? '#3D5AFE' : '#e8e8f0') + ';background:' + (isS ? 'rgba(61,90,254,0.07)' : '#fff') + ';border-radius:22px;font-size:14px;font-weight:600;color:' + (isS ? '#3D5AFE' : '#1a1a2e') + ';cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;">' +
            _esc(a) + '</button>';
        }).join('') +
        '</div>' +
      '</div>';
    footHtml = _wizFooter(true, sel2.length > 0);

  } else if (_wizStep === 3) {
    var fatVal = window._datiGenerici.fatturato_anno_scorso || '';
    bodyHtml =
      '<div style="padding:32px 28px 8px;">' +
        '<div style="font-size:22px;font-weight:700;color:#1a1a2e;margin-bottom:8px;line-height:1.3;">Qual è stato il tuo fatturato l\'anno scorso?</div>' +
        '<div style="font-size:14px;color:rgba(26,26,46,0.45);margin-bottom:24px;">Un\'indicazione approssimativa va benissimo.</div>' +
        '<div style="display:flex;align-items:center;border:2px solid #e8e8f0;border-radius:12px;overflow:hidden;background:#fff;">' +
          '<span style="padding:0 14px;font-size:18px;color:rgba(26,26,46,0.3);font-weight:600;flex-shrink:0;">€</span>' +
          '<input id="wiz-fatturato" type="number" placeholder="es. 350000" min="0" value="' + (fatVal || '') + '" ' +
            'style="flex:1;padding:14px 16px 14px 0;border:none;outline:none;font-size:16px;font-family:\'Plus Jakarta Sans\',sans-serif;color:#1a1a2e;background:transparent;" ' +
            'oninput="document.getElementById(\'wiz-avanti-3\').disabled=!this.value||Number(this.value)<=0" ' +
            'onkeydown="if(event.key===\'Enter\'&&Number(this.value)>0)_wizAvanti()" />' +
        '</div>' +
      '</div>';
    footHtml =
      '<div style="padding:16px 28px 24px;display:flex;justify-content:space-between;">' +
        '<button onclick="_wizIndietro()" style="padding:14px 24px;background:transparent;border:2px solid #e8e8f0;border-radius:12px;font-size:15px;font-weight:600;color:rgba(26,26,46,0.5);cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;">← Indietro</button>' +
        '<button id="wiz-avanti-3" onclick="_wizAvanti()" ' + (!fatVal ? 'disabled' : '') + ' ' +
          'style="padding:14px 32px;background:#3D5AFE;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;' + (!fatVal ? 'opacity:0.4;' : '') + '">Avanti →</button>' +
      '</div>';

  } else if (_wizStep === 4) {
    var opzP = ['Solo io','2-5','6-15','Più di 15'];
    var selP = window._datiGenerici.n_persone;
    bodyHtml =
      '<div style="padding:32px 28px 8px;">' +
        '<div style="font-size:22px;font-weight:700;color:#1a1a2e;margin-bottom:24px;line-height:1.3;">Quante persone lavorano con te?</div>' +
        opzP.map(function(o) {
          var isS = selP === o;
          return '<button onclick="_wizSelBtn(4,this,-1)" data-val="' + _esc(o) + '" ' +
            'style="display:block;width:100%;text-align:left;padding:14px 18px;margin-bottom:10px;border:2px solid ' + (isS ? '#3D5AFE' : '#e8e8f0') + ';background:' + (isS ? 'rgba(61,90,254,0.07)' : '#fff') + ';border-radius:12px;font-size:15px;font-weight:500;color:#1a1a2e;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;">' +
            _esc(o) + '</button>';
        }).join('') +
      '</div>';
    footHtml = _wizFooter(true, !!selP);

  } else if (_wizStep === 5) {
    var opzA = ['Meno di 2','2-5','5-15','Più di 15'];
    var selA = window._datiGenerici.anni_attivita;
    bodyHtml =
      '<div style="padding:32px 28px 8px;">' +
        '<div style="font-size:22px;font-weight:700;color:#1a1a2e;margin-bottom:24px;line-height:1.3;">Da quanti anni è attiva la tua azienda?</div>' +
        opzA.map(function(o) {
          var isS = selA === o;
          return '<button onclick="_wizSelBtn(5,this,-1)" data-val="' + _esc(o) + '" ' +
            'style="display:block;width:100%;text-align:left;padding:14px 18px;margin-bottom:10px;border:2px solid ' + (isS ? '#3D5AFE' : '#e8e8f0') + ';background:' + (isS ? 'rgba(61,90,254,0.07)' : '#fff') + ';border-radius:12px;font-size:15px;font-weight:500;color:#1a1a2e;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;">' +
            _esc(o) + '</button>';
        }).join('') +
      '</div>';
    footHtml = _wizFooter(true, !!selA);

  } else if (_wizStep === 6) {
    var locSel = window._datiGenerici.localita;
    var locVal = locSel ? locSel.comune + ' (' + locSel.provincia + ')' : '';
    bodyHtml =
      '<div style="padding:32px 28px 8px;">' +
        '<div style="font-size:22px;font-weight:700;color:#1a1a2e;margin-bottom:8px;line-height:1.3;">Dove si trova la tua azienda?</div>' +
        '<div style="font-size:14px;color:rgba(26,26,46,0.45);margin-bottom:20px;">Ci serve per confrontarti con aziende simili della tua zona.</div>' +
        '<div style="position:relative;">' +
          '<input id="wiz-localita-inp" type="text" placeholder="Scrivi il nome del tuo comune..." autocomplete="off" ' +
            'value="' + _esc(locVal) + '" ' +
            'style="width:100%;padding:14px 16px;border:2px solid ' + (locSel ? '#3D5AFE' : '#e8e8f0') + ';border-radius:12px;font-size:16px;font-family:\'Plus Jakarta Sans\',sans-serif;outline:none;box-sizing:border-box;color:#1a1a2e;" ' +
            'oninput="_wizComuniInput(this.value)" ' +
            'onfocus="if(this.value.length>=2)_wizComuniInput(this.value)" ' +
            'onblur="setTimeout(function(){var d=document.getElementById(\'wiz-comuni-drop\');if(d)d.style.display=\'none\';},180)" />' +
          '<div id="wiz-comuni-drop" style="display:none;position:fixed;background:#fff;border:1.5px solid #e8e8f0;border-radius:8px;z-index:99999;box-shadow:0 8px 24px rgba(0,0,0,0.15);overflow:hidden;"></div>' +
        '</div>' +
      '</div>';
    footHtml = _wizFooter(true, !!locSel);
  }

  panel.innerHTML =
    headerHtml +
    '<div style="flex:1;overflow-y:auto;">' + bodyHtml + '</div>' +
    footHtml;

  // Focus sul campo testo se step 0
  if (_wizStep === 0) {
    var inp = document.getElementById('wiz-nome');
    if (inp) { setTimeout(function(){ inp.focus(); }, 80); }
    // Abilita pulsante se c'è già un valore (es. tornato indietro)
    var btn = document.getElementById('wiz-avanti-0');
    if (btn && inp && inp.value.trim().length >= 2) btn.disabled = false;
  }
  if (_wizStep === 3) {
    var inp3 = document.getElementById('wiz-fatturato');
    if (inp3) setTimeout(function(){ inp3.focus(); }, 80);
  }
  if (_wizStep === 6) {
    var inpL = document.getElementById('wiz-localita-inp');
    if (inpL) setTimeout(function(){ inpL.focus(); }, 80);
  }
}

function _wizComuniInput(query) {
  var drop = document.getElementById('wiz-comuni-drop');
  if (!drop) return;
  // Reset selezione se l'utente modifica il campo
  if (window._datiGenerici.localita && query !== window._datiGenerici.localita.comune + ' (' + window._datiGenerici.localita.provincia + ')') {
    window._datiGenerici.localita = null;
    // Disabilita avanti
    var av = document.querySelectorAll('#leva-chat-panel button');
    av.forEach(function(b) { if (b.textContent.indexOf('Avanti') >= 0) { b.disabled = true; b.style.opacity = '0.4'; } });
  }
  if (!query || query.trim().length < 2) { drop.style.display = 'none'; return; }
  var q = query.trim().toLowerCase();
  var esegui = function(lista) {
    var matches = [];
    for (var i = 0; i < lista.length && matches.length < 5; i++) {
      if (lista[i].nome.toLowerCase().indexOf(q) === 0) matches.push(lista[i]);
    }
    if (matches.length === 0) {
      // Fallback: contiene
      for (var j = 0; j < lista.length && matches.length < 5; j++) {
        if (lista[j].nome.toLowerCase().indexOf(q) >= 0) matches.push(lista[j]);
      }
    }
    if (matches.length === 0) { drop.style.display = 'none'; return; }
    drop.innerHTML = matches.map(function(c) {
      return '<div onclick="_wizSelComune(\'' + c.nome.replace(/'/g,"\\'") + '\',\'' + c.sigla + '\',\'' + c.regione.nome.replace(/'/g,"\\'") + '\')" ' +
        'style="padding:11px 16px;cursor:pointer;font-size:14px;color:#1a1a2e;border-bottom:1px solid #f0f0f5;font-family:\'Plus Jakarta Sans\',sans-serif;" ' +
        'onmouseenter="this.style.background=\'rgba(61,90,254,0.06)\'" onmouseleave="this.style.background=\'\'"> ' +
        '<strong>' + _esc(c.nome) + '</strong> <span style="color:rgba(26,26,46,0.45);font-size:13px;">(' + _esc(c.sigla) + ')</span>' +
      '</div>';
    }).join('');
    // Position fixed relative to input bounding rect
    var inp2 = document.getElementById('wiz-localita-inp');
    if (inp2) {
      var rect = inp2.getBoundingClientRect();
      drop.style.top  = (rect.bottom + 2) + 'px';
      drop.style.left = rect.left + 'px';
      drop.style.width = rect.width + 'px';
    }
    drop.style.display = 'block';
  };
  _loadComuni(esegui);
}

function _wizSelComune(comune, sigla, regione) {
  window._datiGenerici.localita = { comune: comune, provincia: sigla, regione: regione };
  var inp = document.getElementById('wiz-localita-inp');
  if (inp) {
    inp.value = comune + ' (' + sigla + ')';
    inp.style.borderColor = '#3D5AFE';
  }
  var drop = document.getElementById('wiz-comuni-drop');
  if (drop) drop.style.display = 'none';
  // Abilita avanti
  var btns = document.querySelectorAll('#leva-chat-panel button');
  btns.forEach(function(b) { if (b.textContent.indexOf('Avanti') >= 0) { b.disabled = false; b.style.opacity = '1'; } });
}

function _wizFooter(showBack, enableNext) {
  return '<div style="padding:16px 28px 24px;display:flex;justify-content:' + (showBack ? 'space-between' : 'flex-end') + ';">' +
    (showBack ? '<button onclick="_wizIndietro()" style="padding:14px 24px;background:transparent;border:2px solid #e8e8f0;border-radius:12px;font-size:15px;font-weight:600;color:rgba(26,26,46,0.5);cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;">← Indietro</button>' : '') +
    '<button onclick="_wizAvanti()" ' + (enableNext ? '' : 'disabled ') +
      'style="padding:14px 32px;background:#3D5AFE;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;' + (enableNext ? '' : 'opacity:0.4;') + '">Avanti →</button>' +
  '</div>';
}

function _wizSelBtn(step, btn, idx) {
  // Deseleziona tutti i fratelli
  var parent = btn.parentElement;
  var tutti = parent.querySelectorAll('button[data-val]');
  tutti.forEach(function(b) {
    b.style.borderColor = '#e8e8f0';
    b.style.background = '#fff';
    b.style.color = '#1a1a2e';
  });
  // Seleziona questo
  btn.style.borderColor = '#3D5AFE';
  btn.style.background = 'rgba(61,90,254,0.07)';
  btn.style.color = '#3D5AFE';
  var val = btn.getAttribute('data-val');
  if (step === 1) window._datiGenerici.soddisfazione = val;
  if (step === 4) window._datiGenerici.n_persone = val;
  if (step === 5) window._datiGenerici.anni_attivita = val;
  // Abilita avanti
  var footBtns = document.querySelectorAll('#leva-chat-panel button:not([data-val]):not([data-area])');
  footBtns.forEach(function(b) {
    if (b.textContent.indexOf('Avanti') >= 0) { b.disabled = false; b.style.opacity = '1'; }
  });
}

function _wizToggleArea(area) {
  if (!window._datiGenerici.aree_deboli) window._datiGenerici.aree_deboli = [];
  var arr = window._datiGenerici.aree_deboli;
  var idx = arr.indexOf(area);
  if (idx >= 0) {
    arr.splice(idx, 1);
  } else {
    if (arr.length >= 3) return; // max 3
    arr.push(area);
  }
  _wizRender();
}

function _wizIndietro() {
  if (_wizStep > 0) { _wizStep--; _wizRender(); }
}

function _wizAvanti() {
  // Raccogli valore corrente per lo step
  if (_wizStep === 0) {
    var inp = document.getElementById('wiz-nome');
    if (!inp || inp.value.trim().length < 2) return;
    window._datiGenerici.nome = inp.value.trim();
  }
  if (_wizStep === 3) {
    var inp3 = document.getElementById('wiz-fatturato');
    if (!inp3 || !inp3.value || Number(inp3.value) <= 0) return;
    var fat = Number(inp3.value);
    window._datiGenerici.fatturato_anno_scorso = fat;
    // Calcola fascia — la fetch è già partita in pmiAvviaDiagnosi()
    _pmiSelectedFascia = fat < 500000 ? 'sotto-500k' : fat < 2000000 ? '500k-2M' : fat < 10000000 ? '2M-10M' : 'oltre-10M';
  }

  if (_wizStep === 6) {
    // Validazione localita: deve essere stata selezionata dal dropdown
    if (!window._datiGenerici.localita) return;
  }

  if (_wizStep < _wizTot - 1) {
    _wizStep++;
    _wizRender();
    return;
  }

  // Step 7 (localita) completato — controlla se diagnosi-start è pronto
  _wizDopoStep6();
}

function _wizDopoStep6() {
  if (window._generaSettoreResolved) {
    // Pronto — transizione alla Fase shock
    _wizPassaAShock();
    return;
  }
  // Non pronto — mostra step 7 (cuscinetto)
  _wizRenderStep7();
}

function _wizRenderStep7() {
  var panel = document.getElementById('leva-chat-panel');
  if (!panel) return;
  var nome = (window._datiGenerici && window._datiGenerici.nome) ? window._datiGenerici.nome.split(' ')[0] : '';
  var domanda = nome ? nome + ', hai mai lavorato con un consulente commerciale?' : 'Hai mai lavorato con un consulente commerciale?';
  var opzC = ['Mai', 'Sì, ma non ha funzionato', 'Sì, con buoni risultati'];
  var selC = window._datiGenerici.consulente;

  panel.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px 12px;flex-shrink:0;">' +
      '<span style="font-size:12px;font-weight:700;color:rgba(26,26,46,0.35);letter-spacing:0.3px;">DIAGNOSI COMMERCIALE</span>' +
      '<button onclick="_chatChiudiOverlay()" style="width:28px;height:28px;background:rgba(0,0,0,0.06);border:none;border-radius:8px;cursor:pointer;font-size:14px;color:rgba(26,26,46,0.4);line-height:1;">✕</button>' +
    '</div>' +
    _wizProgressBar(7, 7) +
    '<div style="flex:1;overflow-y:auto;">' +
      '<div style="padding:32px 28px 8px;">' +
        '<div style="font-size:22px;font-weight:700;color:#1a1a2e;margin-bottom:24px;line-height:1.3;">' + _esc(domanda) + '</div>' +
        opzC.map(function(o) {
          var isS = selC === o;
          return '<button onclick="_wizSelConsulente(this)" data-val="' + _esc(o) + '" ' +
            'style="display:block;width:100%;text-align:left;padding:14px 18px;margin-bottom:10px;border:2px solid ' + (isS ? '#3D5AFE' : '#e8e8f0') + ';background:' + (isS ? 'rgba(61,90,254,0.07)' : '#fff') + ';border-radius:12px;font-size:15px;font-weight:500;color:#1a1a2e;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;">' +
            _esc(o) + '</button>';
        }).join('') +
      '</div>' +
    '</div>' +
    '<div style="padding:16px 28px 24px;display:flex;justify-content:flex-end;">' +
      '<button id="wiz-avanti-7" onclick="_wizDopoStep7()" ' + (selC ? '' : 'disabled ') +
        'style="padding:14px 32px;background:#3D5AFE;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;' + (selC ? '' : 'opacity:0.4;') + '">Avanti →</button>' +
    '</div>';
}

function _wizSelConsulente(btn) {
  var parent = btn.parentElement;
  parent.querySelectorAll('button[data-val]').forEach(function(b) {
    b.style.borderColor = '#e8e8f0'; b.style.background = '#fff'; b.style.color = '#1a1a2e';
  });
  btn.style.borderColor = '#3D5AFE';
  btn.style.background = 'rgba(61,90,254,0.07)';
  btn.style.color = '#3D5AFE';
  window._datiGenerici.consulente = btn.getAttribute('data-val');
  var av = document.getElementById('wiz-avanti-7');
  if (av) { av.disabled = false; av.style.opacity = '1'; }
}

function _wizDopoStep7() {
  if (window._generaSettoreResolved) {
    _wizPassaAShock();
    return;
  }
  // Ancora non pronto — mostra loading
  _wizRenderLoading();
}

function _wizRenderLoading() {
  var panel = document.getElementById('leva-chat-panel');
  if (!panel) return;

  // Usa nome_display dalla selezione dropdown (es. "Panificio e bar"), non il codice
  var settore = window._pmiSelectedNomeDisplay || window._generaSettoreNome || _pmiSelectedSettore || 'aziende';
  var fascia  = _pmiSelectedFascia  || 'nd';
  var fat     = (window._datiGenerici && window._datiGenerici.fatturato_anno_scorso) || 0;
  // localita è {comune, provincia, regione} — usa .comune; se stringa, usala direttamente
  var _loc    = (window._datiGenerici && window._datiGenerici.localita) || null;
  var locStr  = _loc ? (typeof _loc === 'object' ? (_loc.comune || 'la tua area') : String(_loc)) : 'la tua area';
  var areDeboli = (window._datiGenerici && window._datiGenerici.aree_deboli && window._datiGenerici.aree_deboli.length)
    ? window._datiGenerici.aree_deboli : [];

  function fmtEuro(n) {
    if (n >= 1000000) return '\u20ac\u00a0' + (n / 1000000).toFixed(1).replace('.', ',') + 'M';
    if (n >= 1000)    return '\u20ac\u00a0' + Math.round(n / 1000) + 'K';
    return '\u20ac\u00a0' + n;
  }

  var fasciaMedia = { 'sotto-500k': 280000, '500k-2M': 950000, '2M-10M': 4200000, 'oltre-10M': 15000000 };
  var mediaN = fasciaMedia[fascia] || 950000;
  var mediaStr = fmtEuro(mediaN);
  var fatSub = fat > 0
    ? 'Il tuo: ' + fmtEuro(fat) + ' — ' + (fat > mediaN ? 'sopra' : fat < mediaN ? 'sotto' : 'in linea con') + ' la media'
    : '';
  var concStr = fascia === 'sotto-500k' ? 'alta' : fascia === 'oltre-10M' ? 'bassa' : 'media';
  var areSub  = areDeboli.length ? areDeboli.join(', ') : 'analisi in corso...';

  var statusTexts = [
    'Raccolta dati di mercato...',
    'Analisi benchmark settore...',
    'Confronto con la tua zona...',
    'Identificazione opportunit\u00e0...',
    'Calcolo impatto potenziale...',
    'Preparazione diagnosi personalizzata...'
  ];

  // Shuffle helper per placeholder casuali
  function _shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // Placeholder tips — mostrati subito, aggiornati con fade quando arrivano quelli reali
  var _placeholderSapevi = _shuffle([
    'Le PMI italiane perdono in media il 23% dei clienti ogni anno senza accorgersene',
    'Solo il 12% delle piccole imprese ha un processo strutturato di follow-up clienti',
    'Il passaparola genera il 65% dei nuovi clienti per le attività locali',
    'Un cliente fidelizzato spende in media 3 volte di più di uno nuovo',
    'Il 78% dei titolari non conosce il proprio margine netto reale'
  ]);
  var _placeholderAzione = _shuffle([
    'Chiama oggi i tuoi 3 migliori clienti e chiedi cosa puoi migliorare',
    'Scrivi su un foglio i 5 servizi che ti chiedono di più — è il tuo listino ideale',
    'Controlla quanti clienti non vedi da oltre 30 giorni — sono soldi che perdi',
    'Fai una foto al tuo negozio dall\'esterno — è quello che vede chi passa',
    'Chiedi ai tuoi dipendenti qual è la domanda più frequente dei clienti'
  ]);

  var iconLine   = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>';
  var iconInfo   = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
  var iconPin    = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
  var iconBolt   = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>';
  var iconTarget = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>';

  function mkCard(id, bg, accent, icon, title, valHtml, sub) {
    return '<div id="' + id + '" style="background:' + bg + ';border-radius:12px;padding:14px 16px;margin-bottom:10px;' +
      'opacity:0;transform:translateY(12px);transition:opacity 0.5s ease,transform 0.5s ease;' +
      'display:flex;align-items:flex-start;gap:12px;">' +
      '<div style="color:' + accent + ';flex-shrink:0;margin-top:1px;">' + icon + '</div>' +
      '<div style="flex:1;min-width:0;">' +
        '<div style="font-size:11px;font-weight:700;color:' + accent + ';letter-spacing:0.04em;text-transform:uppercase;margin-bottom:5px;">' + title + '</div>' +
        '<div style="font-size:15px;font-weight:600;color:#1a1a2e;line-height:1.4;">' + valHtml + '</div>' +
        (sub ? '<div style="font-size:12px;color:rgba(26,26,46,0.5);margin-top:4px;">' + _esc(sub) + '</div>' : '') +
      '</div>' +
    '</div>';
  }

  panel.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px 12px;flex-shrink:0;">' +
      '<span style="font-size:12px;font-weight:700;color:rgba(26,26,46,0.35);letter-spacing:0.05em;">ANALISI IN CORSO</span>' +
      '<button onclick="_chatChiudiOverlay()" style="width:28px;height:28px;background:rgba(0,0,0,0.06);border:none;border-radius:8px;cursor:pointer;font-size:14px;color:rgba(26,26,46,0.4);line-height:1;">\u2715</button>' +
    '</div>' +
    '<div style="flex:1;overflow-y:auto;padding:0 20px 8px;">' +
      '<div style="text-align:center;padding:20px 0 22px;">' +
        '<div style="font-size:24px;font-weight:500;color:#3D5AFE;line-height:1.2;">' + _esc(settore) + '</div>' +
        '<div style="font-size:14px;color:rgba(26,26,46,0.45);margin-top:8px;">Stiamo analizzando il tuo settore nel mercato italiano</div>' +
      '</div>' +
      mkCard('wiz-card-1', '#E6F1FB','#3D5AFE', iconLine,  'Fatturato medio del settore', _esc(mediaStr), fatSub) +
      mkCard('wiz-card-2', '#FCEBEB','#E24B4A', iconInfo,  'Il dato che pochi conoscono', '<span id="wiz-tip-sapevi1" style="transition:opacity 0.3s ease;">' + _esc(_placeholderSapevi[0]) + '</span>', '') +
      mkCard('wiz-card-3', '#E1F5EE','#1D9E75', iconPin,   'La tua zona: ' + _esc(locStr), 'Concorrenza <strong>' + _esc(concStr) + '</strong> nella tua area', '') +
      mkCard('wiz-card-4', '#FCEBEB','#E24B4A', iconInfo,  'Il dato che pochi conoscono', '<span id="wiz-tip-sapevi2" style="transition:opacity 0.3s ease;">' + _esc(_placeholderSapevi[1]) + '</span>', '') +
      mkCard('wiz-card-5', '#EEEDFE','#534AB7', iconTarget,'Le tue aree da esplorare', '<strong>' + _esc(areSub) + '</strong>', 'Corrispondono ai problemi pi\u00f9 comuni del settore') +
      mkCard('wiz-card-6', '#FAEEDA','#BA7517', iconBolt,  'Azione rapida', '<span id="wiz-tip-azione1" style="transition:opacity 0.3s ease;">' + _esc(_placeholderAzione[0]) + '</span>', '') +
    '</div>' +
    '<div style="padding:8px 20px 20px;flex-shrink:0;">' +
      '<div style="width:100%;height:4px;background:#f0f0f5;border-radius:2px;overflow:hidden;margin-bottom:8px;">' +
        '<div id="wiz-prog-bar" style="height:100%;background:#3D5AFE;border-radius:2px;width:8%;transition:width 1.2s ease,background 0.5s ease;"></div>' +
      '</div>' +
      '<div id="wiz-prog-text" style="font-size:12px;color:rgba(26,26,46,0.4);text-align:center;">' + _esc(statusTexts[0]) + '</div>' +
    '</div>';

  // Progress bar: 6 step da 3s ciascuno (18s totali — allineato al nuovo target 15-20s)
  var progIdx = 0;
  var _progId = setInterval(function() {
    progIdx++;
    if (progIdx >= statusTexts.length) { clearInterval(_progId); return; }
    var txt = document.getElementById('wiz-prog-text');
    if (txt) txt.textContent = statusTexts[progIdx];
    var bar = document.getElementById('wiz-prog-bar');
    if (bar) bar.style.width = Math.min(Math.round((progIdx + 1) / statusTexts.length * 88), 88) + '%';
  }, 3000);

  // 6 cards ogni 3s: card-1@3s, card-2@6s, ..., card-6@18s
  [[3000,'wiz-card-1'],[6000,'wiz-card-2'],[9000,'wiz-card-3'],
   [12000,'wiz-card-4'],[15000,'wiz-card-5'],[18000,'wiz-card-6']].forEach(function(c) {
    setTimeout(function() {
      var el = document.getElementById(c[1]);
      if (el) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }
    }, c[0]);
  });

  var _shockData = null;

  function _applyGreenUI() {
    var bar = document.getElementById('wiz-prog-bar');
    var txt = document.getElementById('wiz-prog-text');
    if (bar) { bar.style.background = '#1D9E75'; bar.style.width = '100%'; }
    if (txt) txt.textContent = 'Analisi completata \u2713';
  }

  function _tryTransition() {
    if (_shockData === null) return;
    clearInterval(_progId);
    _wizPassaAShock();
  }

  // Poll diagnosi-shock — transizione appena risponde (nessun minimum time artificiale)
  var _pollId = setInterval(function() {
    if (!window._generaSettoreResolved) return;
    clearInterval(_pollId);
    window._generaSettorePromise.then(function(data) {
      _shockData = data || {};
      _applyGreenUI();
      // Aggiorna tips se diagnosi-domande è già pronta
      if (window._domandeResolved && window._domandeData && window._domandeData.tips) {
        var tips = window._domandeData.tips;
        var sapevi = tips.filter(function(t) { return t.tipo === 'sapevi'; });
        var azione = tips.filter(function(t) { return t.tipo === 'azione'; });
        function _fadeUpdateTip(spanId, cardId, nuovoTesto) {
          var span = document.getElementById(spanId);
          var card = document.getElementById(cardId);
          if (!span || !nuovoTesto) return;
          if (card && card.style.opacity === '1') {
            span.style.opacity = '0';
            setTimeout(function() { span.textContent = nuovoTesto; span.style.opacity = '1'; }, 300);
          } else {
            span.textContent = nuovoTesto;
          }
        }
        if (sapevi[0]) _fadeUpdateTip('wiz-tip-sapevi1', 'wiz-card-2', sapevi[0].testo);
        if (sapevi[1]) _fadeUpdateTip('wiz-tip-sapevi2', 'wiz-card-4', sapevi[1].testo);
        if (azione[0]) _fadeUpdateTip('wiz-tip-azione1', 'wiz-card-6', azione[0].testo);
      }
      setTimeout(function() { _tryTransition(); }, 800); // breve pausa per mostrare il verde
    }).catch(function() {
      _shockData = {};
      _tryTransition();
    });
  }, 400);
}

function _wizPassaAShock() {
  if (!_pmiSelectedFascia) _pmiSelectedFascia = '500k-2M';
  if (!window._generaSettorePromise) {
    // fallback: chiama diagnosi-shock direttamente
    window._generaSettorePromise = fetch('/api/diagnosi-shock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ settore: _pmiSelectedSettore, user_id: window._currentUserId || null })
    }).then(function(r) { return r.json(); });
  }
  window._generaSettorePromise.then(function(shockData) {
    if (!shockData.ok) {
      showToast('Errore nel caricamento della diagnosi. Riprova.', 'error');
      _chatChiudiOverlay();
      renderPrimoAccesso();
      return;
    }
    // Combina shock con domande (già pronte o ancora in arrivo)
    var domandeData = window._domandeData || {};
    var datiStart = Object.assign({}, shockData, {
      tips:          domandeData.tips          || [],
      domande_fase1: domandeData.domande_fase1 || [],
      domande_fase2: domandeData.domande_fase2 || []
    });
    _avviaChatDiagnosi(datiStart);
  }).catch(function(e) {
    console.error('diagnosi-shock:', e);
    showToast('Errore nel caricamento della diagnosi. Riprova.', 'error');
    _chatChiudiOverlay();
    renderPrimoAccesso();
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// PMI — DIAGNOSI CHAT: Fase 0 (shock) → Fase 1 (chat) → Fase 2 (wizard) → Risultati
// ═══════════════════════════════════════════════════════════════════════════════

var _dc = null; // stato diagnosi chat corrente

function _avviaChatDiagnosi(datiStart) {
  _dc = {
    settore:             _pmiSelectedSettore,
    fascia:              _pmiSelectedFascia,
    prospect_id:         window._pmiProspect ? window._pmiProspect.id : null,
    settore_id:          datiStart.settore_id,
    shock:               datiStart.shock || '',
    collegamento:        datiStart.collegamento || '',
    aggancio:            datiStart.aggancio || '',
    domande_fase1:       datiStart.domande_fase1 || [],
    domande_fase2:       datiStart.domande_fase2 || [],
    conversazione:       [],
    risposte_fase1:      [],
    step_fase1:          0,
    risposte_fase2:      [],
    dimensioni_critiche: [],
    sintesi_fase1:       '',
    benchmark_istat:     datiStart.benchmark_istat || null,
    regione:             (window._datiGenerici && window._datiGenerici.localita && window._datiGenerici.localita.regione) || 'Italia'
  };

  // Riutilizza overlay esistente (wizard) se presente, altrimenti crea nuovo
  var panel = document.getElementById('leva-chat-panel');
  if (panel) {
    // Sfuma il contenuto del wizard, poi sostituisce con il pannello chat
    panel.style.transition = 'opacity 0.3s ease';
    panel.style.opacity = '0';
    setTimeout(function() {
      panel.style.cssText = "background:#d8dbe2;border-radius:20px;width:100%;max-width:600px;max-height:85vh;display:flex;flex-direction:column;overflow:hidden;font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 24px 64px rgba(0,0,0,0.25);transition:opacity 0.3s ease;opacity:0;";
      panel.innerHTML =
        _chatPanelHeader('Diagnosi commerciale') +
        '<div id="leva-chat-feed" style="flex:1;overflow-y:auto;padding:20px 16px 12px;box-sizing:border-box;"></div>' +
        '<div id="leva-chat-inputarea" style="flex-shrink:0;background:#d8dbe2;border-top:1px solid rgba(0,0,0,0.06);padding:12px 16px;box-sizing:border-box;"></div>';
      requestAnimationFrame(function() {
        panel.style.opacity = '1';
        _chatFase0();
      });
    }, 300);
  } else {
    // Nessun overlay esistente — crea da zero
    var overlay = document.createElement('div');
    overlay.id = 'leva-chat-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.45);z-index:9000;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;';

    panel = document.createElement('div');
    panel.id = 'leva-chat-panel';
    panel.style.cssText = "background:#d8dbe2;border-radius:20px;width:100%;max-width:600px;max-height:85vh;display:flex;flex-direction:column;overflow:hidden;font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 24px 64px rgba(0,0,0,0.25);";

    panel.innerHTML =
      _chatPanelHeader('Diagnosi commerciale') +
      '<div id="leva-chat-feed" style="flex:1;overflow-y:auto;padding:20px 16px 12px;box-sizing:border-box;"></div>' +
      '<div id="leva-chat-inputarea" style="flex-shrink:0;background:#d8dbe2;border-top:1px solid rgba(0,0,0,0.06);padding:12px 16px;box-sizing:border-box;"></div>';

    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    _chatFase0();
  }
}

function _chatPanelHeader(titolo) {
  return '<div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid rgba(0,0,0,0.07);flex-shrink:0;">' +
    '<span style="font-size:13px;font-weight:600;color:rgba(26,26,46,0.4);font-family:\'Plus Jakarta Sans\',sans-serif;">' + (titolo || 'Diagnosi') + '</span>' +
    '<button onclick="_chatChiudi()" style="width:30px;height:30px;background:rgba(0,0,0,0.07);border:none;border-radius:8px;cursor:pointer;font-size:15px;color:rgba(26,26,46,0.45);line-height:1;font-family:sans-serif;">✕</button>' +
  '</div>';
}

function _chatChiudi() {
  // Salva progresso localmente così può riprendere
  try {
    if (_dc) localStorage.setItem('leva_dc_bak_' + (window._currentUserId || ''), JSON.stringify({
      step_fase1:    _dc.step_fase1,
      risposte_fase1: _dc.risposte_fase1,
      settore:       _dc.settore,
      fascia:        _dc.fascia
    }));
  } catch(e) {}
  _chatChiudiOverlay();
}

function _chatChiudiOverlay() {
  var ov = document.getElementById('leva-chat-overlay');
  if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
  document.body.style.overflow = '';
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function _chatScroll() {
  var feed = document.getElementById('leva-chat-feed');
  if (feed) requestAnimationFrame(function() { feed.scrollTop = feed.scrollHeight; });
}

function _chatAddBolla(ruolo, htmlContent) {
  var feed = document.getElementById('leva-chat-feed');
  if (!feed) return;
  var isAI = (ruolo === 'ai');
  var wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;margin-bottom:10px;' + (isAI ? 'justify-content:flex-start' : 'justify-content:flex-end');
  var bolla = document.createElement('div');
  bolla.style.cssText = 'max-width:84%;padding:13px 16px;word-break:break-word;font-size:15px;line-height:1.6;' +
    (isAI
      ? 'background:rgba(255,255,255,0.75);color:#1a1a2e;border-radius:4px 18px 18px 18px;'
      : 'background:#3D5AFE;color:#fff;border-radius:18px 4px 18px 18px;');
  bolla.innerHTML = htmlContent;
  wrap.appendChild(bolla);
  feed.appendChild(wrap);
  _chatScroll();
}

function _chatAddLoadingBolla() {
  var feed = document.getElementById('leva-chat-feed');
  if (!feed) return;
  var wrap = document.createElement('div');
  wrap.id = 'leva-chat-loading-bolla';
  wrap.style.cssText = 'display:flex;margin-bottom:10px;justify-content:flex-start';
  var bolla = document.createElement('div');
  bolla.style.cssText = 'padding:13px 20px;background:rgba(255,255,255,0.75);border-radius:4px 18px 18px 18px;font-size:20px;letter-spacing:3px;color:#3D5AFE;';
  bolla.textContent = '···';
  wrap.appendChild(bolla);
  feed.appendChild(wrap);
  _chatScroll();
}

function _chatRemoveLoadingBolla() {
  var el = document.getElementById('leva-chat-loading-bolla');
  if (el && el.parentNode) el.parentNode.removeChild(el);
}

function _chatSetInput(html) {
  var area = document.getElementById('leva-chat-inputarea');
  if (area) area.innerHTML = html;
}

// ─── FASE 0: Shock ───────────────────────────────────────────────────────────

function _chatFase0() {
  var panel = document.getElementById('leva-chat-panel');
  if (!panel) return;
  var nome = (window._datiGenerici && window._datiGenerici.nome) ? window._datiGenerici.nome.split(' ')[0] : '';
  var salutoTesto = nome ? _esc(nome) + ', ecco cosa ho trovato.' : 'Ecco cosa ho trovato.';
  panel.innerHTML =
    _chatPanelHeader('Diagnosi commerciale') +
    '<div style="flex:1;overflow-y:auto;padding:24px 20px 16px;box-sizing:border-box;">' +
      '<div style="text-align:center;margin-bottom:24px;">' +
        '<div style="display:inline-flex;align-items:center;gap:6px;">' +
          '<svg width="32" height="32" viewBox="8 4 44 44" fill="none">' +
            '<rect x="8" y="34" width="44" height="4.5" rx="2.25" fill="#3D5AFE"/>' +
            '<rect x="27.5" y="10" width="4.5" height="25" rx="2.25" fill="#1a1a2e"/>' +
            '<circle cx="29.75" cy="36.25" r="6" fill="#1a1a2e"/>' +
            '<line x1="29.75" y1="36.25" x2="47" y2="22" stroke="#FF6B2B" stroke-width="3.5" stroke-linecap="round"/>' +
            '<circle cx="47" cy="22" r="3.5" fill="#FF6B2B"/>' +
          '</svg>' +
          '<span style="font-family:\'Plus Jakarta Sans\',sans-serif;font-size:20px;font-weight:700;color:#1a1a2e;letter-spacing:-0.5px;">eva</span>' +
        '</div>' +
      '</div>' +
      '<div style="font-size:16px;color:rgba(26,26,46,0.5);margin-bottom:20px;">' + salutoTesto + '</div>' +
      '<div style="background:#EEF1FE;border-radius:14px;padding:18px 20px;margin-bottom:16px;">' +
        '<div style="font-size:18px;font-weight:500;color:#1a1a2e;line-height:1.5;">' + _esc(_dc.shock) + '</div>' +
      '</div>' +
      '<div style="font-size:15px;color:#1a1a2e;line-height:1.55;margin-bottom:12px;">' + _esc(_dc.collegamento) + '</div>' +
      '<div style="font-size:15px;font-weight:500;color:#1a1a2e;line-height:1.55;">' + _esc(_dc.aggancio) + '</div>' +
    '</div>' +
    '<div style="padding:12px 20px 20px;flex-shrink:0;">' +
      '<button onclick="_chatIniziaFase1()" style="width:100%;padding:16px;background:#3D5AFE;color:#fff;border:none;border-radius:14px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:16px;font-weight:700;cursor:pointer;">Iniziamo \u2192</button>' +
    '</div>';
}

// ─── FASE 1: Wizard (una domanda per schermata) ───────────────────────────────

function _chatIniziaFase1() {
  // Se le domande non sono ancora arrivate, aspetta diagnosi-domande (max 10s)
  if (!_dc.domande_fase1 || _dc.domande_fase1.length === 0) {
    _chatAttendeDomande();
    return;
  }
  _dc.step_fase1          = 0;
  _dc.conversazione       = [];
  _dc.risposte_fase1      = [];
  _dc.risposte_accumulate = [];
  window._f1Opzioni       = [];
  _chatRenderWizardF1(0);
}

function _chatAttendeDomande() {
  var panel = document.getElementById('leva-chat-panel');
  if (!panel) return;

  // 2-3 card di attesa, max 10 secondi
  panel.innerHTML =
    _chatPanelHeader('Diagnosi commerciale') +
    '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;gap:16px;">' +
      '<div style="width:40px;height:40px;border:3px solid #e8e8f0;border-top-color:#3D5AFE;border-radius:50%;animation:spin 0.8s linear infinite;"></div>' +
      '<div style="font-size:16px;font-weight:600;color:#1a1a2e;text-align:center;">Sto preparando le domande\u2026</div>' +
      '<div style="font-size:13px;color:rgba(26,26,46,0.45);text-align:center;">Solo qualche secondo</div>' +
    '</div>';

  var waited = 0;
  var pollInterval = setInterval(function() {
    waited += 400;
    if (window._domandeResolved) {
      clearInterval(pollInterval);
      if (window._domandeData && window._domandeData.domande_fase1 && window._domandeData.domande_fase1.length > 0) {
        _dc.domande_fase1 = window._domandeData.domande_fase1;
        _dc.domande_fase2 = window._domandeData.domande_fase2 || [];
      }
      if (_dc.domande_fase1 && _dc.domande_fase1.length > 0) {
        _dc.step_fase1          = 0;
        _dc.conversazione       = [];
        _dc.risposte_fase1      = [];
        _dc.risposte_accumulate = [];
        window._f1Opzioni       = [];
        _chatRenderWizardF1(0);
      } else {
        // domande vuote anche dopo attesa: mostra errore
        if (panel) {
          panel.innerHTML =
            _chatPanelHeader('Diagnosi commerciale') +
            '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;gap:16px;">' +
              '<div style="font-size:15px;color:rgba(26,26,46,0.6);text-align:center;">Si \u00e8 verificato un errore. Riprova.</div>' +
              '<button onclick="_chatIniziaFase1()" style="padding:13px 28px;background:#3D5AFE;color:#fff;border:none;border-radius:12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">Riprova</button>' +
            '</div>';
        }
      }
    } else if (waited >= 10000) {
      clearInterval(pollInterval);
      // Timeout: mostra pulsante riprova
      if (panel) {
        panel.innerHTML =
          _chatPanelHeader('Diagnosi commerciale') +
          '<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;gap:16px;">' +
            '<div style="font-size:15px;color:rgba(26,26,46,0.6);text-align:center;">Ci sta mettendo un po\u2019 di pi\u00f9 del solito.</div>' +
            '<button onclick="_chatIniziaFase1()" style="padding:13px 28px;background:#3D5AFE;color:#fff;border:none;border-radius:12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">Riprova</button>' +
          '</div>';
      }
    }
  }, 400);
}

function _chatRenderWizardF1(idx, altroMode) {
  var panel = document.getElementById('leva-chat-panel');
  if (!panel) return;

  var domande = _dc.domande_fase1;
  var tot = domande.length;
  var d = domande[idx];
  if (!d) return;

  // Shuffle opzioni una volta per step, poi mantieni l'ordine stabile
  if (!window._f1Opzioni) window._f1Opzioni = [];
  if (!window._f1Opzioni[idx]) {
    window._f1Opzioni[idx] = (d.opzioni || []).slice().sort(function() { return Math.random() - 0.5; });
  }
  var opzioniStep = window._f1Opzioni[idx];

  var pct = Math.round((idx / tot) * 100);
  var risposta = _dc.risposte_accumulate[idx];

  // 3 opzioni sempre visibili — disabilitate (dimmed) in altroMode
  var opzioniHtml = opzioniStep.map(function(op, i) {
    var isSel = risposta && risposta.risposta === op.testo;
    return '<button ' + (altroMode ? '' : 'onclick="_chatSelFase1(' + idx + ',' + i + ')"') + ' style="' +
      'display:block;width:100%;text-align:left;padding:13px 16px;margin-bottom:8px;border-radius:12px;' +
      'font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;line-height:1.45;' +
      (altroMode ? 'cursor:default;opacity:0.45;pointer-events:none;' : 'cursor:pointer;transition:all .12s;') +
      (isSel
        ? 'background:#3D5AFE;color:#fff;border:2px solid #3D5AFE;font-weight:600;'
        : 'background:rgba(255,255,255,0.65);color:#1a1a2e;border:1.5px solid rgba(255,255,255,0.7);') +
      '">' + _esc(op.testo) + '</button>';
  }).join('');

  if (altroMode) {
    opzioniHtml +=
      '<div style="margin-top:8px;">' +
        '<div style="display:flex;gap:8px;align-items:flex-end;margin-bottom:8px;">' +
          '<textarea id="leva-f1-ta" rows="2" placeholder="Scrivi la tua risposta..." ' +
            'style="flex:1;padding:12px 14px;border-radius:12px;border:1.5px solid rgba(61,90,254,0.3);' +
            'background:rgba(255,255,255,0.7);font-family:\'Plus Jakarta Sans\',sans-serif;' +
            'font-size:14px;resize:none;outline:none;box-sizing:border-box;"></textarea>' +
          '<button onclick="_chatInviaF1Libero(' + idx + ')" style="flex-shrink:0;height:48px;padding:0 18px;' +
            'background:#3D5AFE;color:#fff;border:none;border-radius:12px;font-family:\'Plus Jakarta Sans\',sans-serif;' +
            'font-size:14px;font-weight:600;cursor:pointer;">Invia \u2192</button>' +
        '</div>' +
        '<button onclick="_chatRenderWizardF1(' + idx + ')" style="display:block;width:100%;text-align:center;' +
          'padding:10px 16px;border-radius:12px;background:transparent;color:rgba(26,26,46,0.55);' +
          'border:0.5px solid rgba(26,26,46,0.35);font-family:\'Plus Jakarta Sans\',sans-serif;' +
          'font-size:13px;cursor:pointer;">\u2190 Torna alle opzioni</button>' +
      '</div>';
  } else {
    opzioniHtml +=
      '<button onclick="_chatRenderWizardF1(' + idx + ',true)" style="display:block;width:100%;text-align:center;' +
        'padding:10px 16px;margin-top:4px;border-radius:12px;' +
        'background:transparent;color:rgba(26,26,46,0.55);' +
        'border:0.5px solid var(--color-border-secondary,rgba(26,26,46,0.35));' +
        'font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;line-height:1.45;cursor:pointer;transition:all .12s;">' +
        'Altro \u2014 scrivo io</button>';
  }

  panel.innerHTML =
    _chatPanelHeader('Domanda ' + (idx+1) + ' di ' + tot) +
    '<div style="flex:1;overflow-y:auto;padding:20px 16px 16px;box-sizing:border-box;">' +
      '<div style="margin-bottom:20px;">' +
        '<div style="height:4px;background:rgba(0,0,0,0.08);border-radius:3px;overflow:hidden;">' +
          '<div style="height:100%;background:#3D5AFE;border-radius:3px;width:' + pct + '%;transition:width .3s;"></div>' +
        '</div>' +
      '</div>' +
      '<div style="font-size:11px;font-weight:700;color:#3D5AFE;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:10px;">' + _esc(d.dimensione) + '</div>' +
      '<div style="font-size:18px;font-weight:500;color:#1a1a2e;line-height:1.45;margin-bottom:22px;">' + _esc(d.domanda) + '</div>' +
      opzioniHtml +
      (idx > 0 ? '<div style="margin-top:8px;"><button onclick="_chatStepFase1(' + (idx-1) + ')" style="width:100%;padding:11px;background:rgba(255,255,255,0.4);border:1px solid rgba(0,0,0,0.1);border-radius:12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;cursor:pointer;color:rgba(26,26,46,0.5);">\u2190 Indietro</button></div>' : '') +
    '</div>';

  if (altroMode) {
    var ta = document.getElementById('leva-f1-ta');
    if (ta) {
      ta.focus();
      ta.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); _chatInviaF1Libero(idx); }
      });
    }
  }
}

function _chatSelFase1(idx, optIdx) {
  var opzioniStep = window._f1Opzioni && window._f1Opzioni[idx];
  if (!opzioniStep || !opzioniStep[optIdx]) return;
  var testo = opzioniStep[optIdx].testo;

  _dc.risposte_accumulate[idx] = { step: idx, risposta: testo };

  // Flash: re-render con selezione evidenziata, poi avanza
  _chatRenderWizardF1(idx);
  var tot = _dc.domande_fase1.length;
  setTimeout(function() {
    if (idx < tot - 1) {
      _chatRenderWizardF1(idx + 1);
    } else {
      _chatFase1Fine();
    }
  }, 300);
}

function _chatStepFase1(idx) {
  _chatRenderWizardF1(idx);
}

function _chatInviaF1Libero(idx) {
  var ta = document.getElementById('leva-f1-ta');
  var testo = ta ? ta.value.trim() : '';
  if (!testo) return;

  _dc.risposte_accumulate[idx] = { step: idx, risposta: testo };

  var tot = _dc.domande_fase1.length;
  if (idx < tot - 1) {
    _chatRenderWizardF1(idx + 1);
  } else {
    _chatFase1Fine();
  }
}

function _chatFase1Fine() {
  var panel = document.getElementById('leva-chat-panel');
  if (panel) {
    panel.innerHTML =
      _chatPanelHeader('Diagnosi commerciale') +
      '<div style="flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;padding:32px;">' +
        '<div style="font-size:16px;font-weight:500;color:#1a1a2e;">Elaboro le tue risposte...</div>' +
        '<div style="font-size:13px;color:rgba(26,26,46,0.45);">Un momento</div>' +
      '</div>';
  }
  _chatFase1Batch();
}

// ─── FASE 1: Chat (legacy — non chiamato, kept for reference) ────────────────

function _chatMostraDomanda(step) {
  var d = _dc.domande_fase1[step];
  if (!d) return;
  _chatAddBolla('ai', _esc(d.domanda));

  // Mescola opzioni; salva in globale e passa indice numerico nell'onclick
  // (evita il bug: JSON.stringify con virgolette rompe l'attributo HTML onclick="...")
  window._chatOpzioniCorrente = (d.opzioni || []).slice().sort(function() { return Math.random() - 0.5; });
  var opzioniHtml = window._chatOpzioniCorrente.map(function(op, i) {
    return '<button onclick="_chatSelezionaOp(' + i + ')" ' +
      'style="display:block;width:100%;text-align:left;padding:13px 16px;margin-bottom:8px;' +
      'background:rgba(255,255,255,0.65);border:1.5px solid rgba(255,255,255,0.7);border-radius:12px;' +
      'font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;color:#1a1a2e;cursor:pointer;line-height:1.4;" ' +
      'onmouseover="this.style.background=\'rgba(255,255,255,0.9)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.65)\'">' +
      _esc(op.testo) + '</button>';
  }).join('');

  _chatSetInput(
    '<div>' + opzioniHtml +
      '<button onclick="_chatMostraInputLibero()" style="display:block;width:100%;text-align:left;padding:11px 16px;' +
      'background:transparent;border:1.5px dashed rgba(26,26,46,0.2);border-radius:12px;' +
      'font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;color:rgba(26,26,46,0.5);cursor:pointer;">' +
      '✏️ Altro — scrivo io</button></div>'
  );
  _chatScroll();
}

function _chatMostraInputLibero() {
  _chatSetInput(
    '<div style="display:flex;gap:8px;align-items:flex-end;">' +
      '<textarea id="leva-chat-ta" rows="2" placeholder="Scrivi la tua risposta..." ' +
        'style="flex:1;padding:12px 14px;border-radius:12px;border:1.5px solid rgba(61,90,254,0.3);' +
        'background:rgba(255,255,255,0.7);font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;resize:none;outline:none;box-sizing:border-box;"></textarea>' +
      '<button onclick="_chatInviaTestoLibero()" style="flex-shrink:0;height:48px;padding:0 18px;background:#3D5AFE;color:#fff;border:none;border-radius:12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">Invia →</button>' +
    '</div>'
  );
  var ta = document.getElementById('leva-chat-ta');
  if (ta) {
    ta.focus();
    ta.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); _chatInviaTestoLibero(); }
    });
  }
}

function _chatSelezionaOp(idx) {
  var op = window._chatOpzioniCorrente && window._chatOpzioniCorrente[idx];
  if (!op) return;
  // Flash: evidenzia il bottone selezionato e disabilita tutti per 300ms
  var area = document.getElementById('leva-chat-inputarea');
  if (area) {
    var btns = area.querySelectorAll('button');
    btns.forEach(function(b) { b.disabled = true; b.style.opacity = '0.35'; });
    if (btns[idx]) {
      btns[idx].style.background = '#3D5AFE';
      btns[idx].style.color = '#fff';
      btns[idx].style.borderColor = '#3D5AFE';
      btns[idx].style.opacity = '1';
    }
  }
  setTimeout(function() { _chatRispostaFase1(op.testo); }, 300);
}

function _chatInviaTestoLibero() {
  var ta = document.getElementById('leva-chat-ta');
  var testo = ta ? ta.value.trim() : '';
  if (!testo) return;
  _chatRispostaFase1(testo);
}

// Accumula risposta localmente; chiama API solo all'ultima domanda
function _chatRispostaFase1(testo) {
  var step = _dc.step_fase1;
  var d = _dc.domande_fase1[step];
  var isUltima = step >= _dc.domande_fase1.length - 1;

  // Accumula
  _dc.risposte_accumulate[step] = { step: step, risposta: testo };
  _dc.risposte_fase1.push({ domanda: d.domanda, risposta: testo });
  _dc.conversazione.push({ ruolo: 'ai',       testo: d.domanda });
  _dc.conversazione.push({ ruolo: 'titolare', testo: testo });

  _chatSetInput('');
  _chatAddBolla('titolare', _esc(testo));
  _chatScroll();

  if (!isUltima) {
    // Avanzamento istantaneo — zero chiamate API
    _dc.step_fase1++;
    setTimeout(function() { _chatMostraDomanda(_dc.step_fase1); }, 220);
    return;
  }

  // Ultima domanda: UNA sola chiamata batch con tutte le risposte
  _chatAddLoadingBolla();
  _chatFase1Batch();
}

async function _chatFase1Batch() {
  try {
    // Ricostruisce conversazione e risposte_fase1 dall'accumulate (wizard mode)
    var accumulate = (_dc.risposte_accumulate || []).filter(Boolean);
    _dc.conversazione  = [];
    _dc.risposte_fase1 = [];
    accumulate.forEach(function(r) {
      var d = _dc.domande_fase1[r.step];
      if (d) {
        _dc.conversazione.push({ ruolo: 'ai',       testo: d.domanda });
        _dc.conversazione.push({ ruolo: 'titolare', testo: r.risposta });
        _dc.risposte_fase1.push({ domanda: d.domanda, risposta: r.risposta });
      }
    });

    var lastStep = _dc.domande_fase1.length - 1;
    var lastRisposta = _dc.risposte_accumulate[lastStep];

    var res = await fetch('/api/diagnosi-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        step:                lastStep,
        risposta_titolare:   lastRisposta ? lastRisposta.risposta : '',
        domande_fase1:       _dc.domande_fase1,
        conversazione:       _dc.conversazione,
        settore:             _dc.settore,
        fascia_fatturato:    _dc.fascia,
        shock:               _dc.shock,
        contesto_titolare:   window._datiGenerici || {},
        risposte_accumulate: _dc.risposte_accumulate,
        benchmark_istat:     _dc.benchmark_istat || null,
        regione:             _dc.regione || 'Italia'
      })
    });
    var data = await res.json();
    if (!data.ok) throw new Error(data.error || 'diagnosi-chat error');

    _dc.dimensioni_critiche = data.dimensioni_critiche || [];
    _dc.sintesi_fase1       = data.sintesi_fase1 || '';

    if (data.stima_perdita && data.stima_perdita.totale_annuo_min) {
      _chatMostraStimaPerdita(data.stima_perdita);
    } else {
      _chatIniziaFase2();
    }

  } catch(e) {
    console.error('diagnosi-chat batch:', e);
    var panel = document.getElementById('leva-chat-panel');
    if (panel) {
      panel.innerHTML =
        _chatPanelHeader('Diagnosi commerciale') +
        '<div style="flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;padding:32px;">' +
          '<div style="font-size:14px;color:rgba(26,26,46,0.5);text-align:center;">Si \u00e8 verificato un errore. Riprova.</div>' +
          '<button onclick="_chatFase1Batch()" style="padding:13px 24px;background:#3D5AFE;color:#fff;border:none;' +
            'border-radius:12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">Riprova</button>' +
        '</div>';
    }
  }
}

// ─── TRANSIZIONE F1→F2: Stima perdita ────────────────────────────────────────

function _chatMostraStimaPerdita(sp) {
  var panel = document.getElementById('leva-chat-panel');
  if (!panel) return;

  function fmtEuro(n) {
    return '\u20ac\u00a0' + Math.round(n).toLocaleString('it-IT');
  }

  var breakdownHtml = '';
  if (sp.breakdown && sp.breakdown.length) {
    breakdownHtml =
      '<div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">' +
      sp.breakdown.map(function(b) {
        return '<div style="background:rgba(255,255,255,0.65);border-radius:12px;padding:12px 16px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">' +
            '<span style="font-size:11px;font-weight:700;color:#3D5AFE;text-transform:uppercase;letter-spacing:0.05em;">' + _esc(b.dimensione) + '</span>' +
            '<span style="font-size:15px;font-weight:700;color:#E24B4A;">' + fmtEuro(b.importo) + '</span>' +
          '</div>' +
          '<div style="font-size:11px;color:rgba(26,26,46,0.5);line-height:1.4;">' + _esc(b.motivo) + '</div>' +
        '</div>';
      }).join('') +
      '</div>';
  }

  panel.innerHTML =
    _chatPanelHeader('Diagnosi commerciale') +
    '<div style="flex:1;overflow-y:auto;padding:24px 20px 16px;box-sizing:border-box;">' +
      '<div style="font-size:12px;font-weight:700;color:rgba(26,26,46,0.35);letter-spacing:0.05em;text-transform:uppercase;margin-bottom:16px;">Quanto stai perdendo ogni anno?</div>' +
      '<div style="margin-bottom:6px;">' +
        '<span style="font-size:44px;font-weight:700;color:#E24B4A;line-height:1;">' + fmtEuro(sp.totale_annuo_min) + '</span>' +
      '</div>' +
      '<div style="font-size:14px;color:#1D9E75;font-weight:500;margin-bottom:4px;">' +
        'Con le azioni giuste puoi recuperare fino a ' + fmtEuro(sp.totale_annuo_max) + '/anno' +
      '</div>' +
      '<div style="font-size:12px;color:rgba(26,26,46,0.4);margin-bottom:0;">stima conservativa basata sul tuo fatturato e le tue risposte</div>' +
      breakdownHtml +
    '</div>' +
    '<div style="padding:12px 20px 20px;flex-shrink:0;">' +
      '<button onclick="_chatIniziaFase2()" style="width:100%;padding:16px;background:#3D5AFE;color:#fff;border:none;border-radius:14px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:16px;font-weight:700;cursor:pointer;">Continua con la diagnosi \u2192</button>' +
    '</div>';
}

// ─── FASE 2: Wizard rapido (8 domande) ───────────────────────────────────────

async function _chatIniziaFase2() {
  _chatSetInput('');
  _dc.risposte_fase2 = [];
  window._f2Opzioni  = [];

  // Fallback: carica domande_fase2 da DB se mancanti (settori vecchi)
  if (!_dc.domande_fase2 || _dc.domande_fase2.length === 0) {
    try {
      var q = await sb.from('settori_custom').select('domande_fase2').eq('id', _dc.settore_id).single();
      _dc.domande_fase2 = (q.data && q.data.domande_fase2) ? q.data.domande_fase2 : [];
    } catch(e) { console.error('load domande_fase2:', e); }
  }

  if (!_dc.domande_fase2 || _dc.domande_fase2.length === 0) return _chatTermina();
  _chatRenderWizard(0);
}

function _chatRenderWizard(idx) {
  var panel = document.getElementById('leva-chat-panel');
  if (!panel) return;

  var domande = _dc.domande_fase2;
  var tot     = domande.length;
  var d       = domande[idx];
  if (!d) return;

  var pct    = Math.round((idx / tot) * 100);
  var selIdx = _dc.risposte_fase2[idx]; // origIdx o null
  var isNonSaprei = (selIdx === null);

  // Shuffle opzioni una volta per step, mantieni origIdx per il calcolo score
  if (!window._f2Opzioni) window._f2Opzioni = [];
  if (!window._f2Opzioni[idx]) {
    window._f2Opzioni[idx] = (d.opzioni || []).map(function(op, i) {
      return { testo: op, origIdx: i };
    }).sort(function() { return Math.random() - 0.5; });
  }
  var opzioniStep = window._f2Opzioni[idx];

  var opzioniHtml = opzioniStep.map(function(op, i) {
    var isSel = (selIdx !== null && selIdx !== undefined && selIdx === op.origIdx);
    var testoDisplay = op.testo.replace(/\s*\(score\s*\d+\)\s*$/i, '');
    return '<button onclick="_chatSelFase2(' + idx + ',' + i + ')" style="' +
      'display:block;width:100%;text-align:left;padding:13px 16px;margin-bottom:8px;border-radius:12px;' +
      'font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;line-height:1.45;cursor:pointer;transition:all .12s;' +
      (isSel
        ? 'background:#3D5AFE;color:#fff;border:2px solid #3D5AFE;font-weight:600;'
        : 'background:rgba(255,255,255,0.65);color:#1a1a2e;border:1.5px solid rgba(255,255,255,0.7);') +
      '">' + _esc(testoDisplay) + '</button>';
  }).join('') +
  '<button onclick="_chatSelFase2(' + idx + ',null)" style="' +
    'display:block;width:100%;text-align:center;padding:10px 16px;margin-top:4px;border-radius:12px;' +
    'font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;line-height:1.45;cursor:pointer;transition:all .12s;' +
    (isNonSaprei
      ? 'background:rgba(0,0,0,0.06);color:rgba(26,26,46,0.6);border:1.5px solid rgba(26,26,46,0.45);'
      : 'background:transparent;color:rgba(26,26,46,0.55);border:0.5px solid var(--color-border-secondary,rgba(26,26,46,0.35));') +
    '">Non saprei</button>';

  panel.innerHTML =
    _chatPanelHeader('Domanda ' + (idx+1) + ' di ' + tot) +
    '<div style="flex:1;overflow-y:auto;padding:20px 16px 16px;box-sizing:border-box;">' +
      '<div style="margin-bottom:20px;">' +
        '<div style="height:4px;background:rgba(0,0,0,0.08);border-radius:3px;overflow:hidden;">' +
          '<div style="height:100%;background:#3D5AFE;border-radius:3px;width:' + pct + '%;transition:width .3s;"></div>' +
        '</div>' +
      '</div>' +
      '<div style="font-size:11px;font-weight:700;color:#3D5AFE;text-transform:uppercase;letter-spacing:0.6px;margin-bottom:10px;">' + _esc(d.dimensione) + '</div>' +
      '<div style="font-size:18px;font-weight:600;color:#1a1a2e;line-height:1.45;margin-bottom:22px;">' + _esc(d.domanda) + '</div>' +
      opzioniHtml +
      (idx > 0 ? '<div style="margin-top:8px;"><button onclick="_chatStepFase2(' + (idx-1) + ')" style="width:100%;padding:11px;background:rgba(255,255,255,0.4);border:1px solid rgba(0,0,0,0.1);border-radius:12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;cursor:pointer;color:rgba(26,26,46,0.5);">← Indietro</button></div>' : '') +
    '</div>';
}

function _chatSelFase2(idx, displayIdx) {
  // Risolve displayIdx → origIdx per calcolo score corretto dopo shuffle
  if (displayIdx === null) {
    _dc.risposte_fase2[idx] = null; // Non saprei
  } else {
    var opzioniStep = window._f2Opzioni && window._f2Opzioni[idx];
    var origIdx = (opzioniStep && opzioniStep[displayIdx]) ? opzioniStep[displayIdx].origIdx : displayIdx;
    _dc.risposte_fase2[idx] = origIdx;
  }
  // Mostra selezione (flash blu), poi auto-avanza dopo 300ms
  _chatRenderWizard(idx);
  var tot = (_dc.domande_fase2 || []).length;
  setTimeout(function() {
    if (idx < tot - 1) {
      _chatRenderWizard(idx + 1);
    } else {
      _chatTermina();
    }
  }, 300);
}

function _chatStepFase2(idx) {
  _chatRenderWizard(idx);
}

// ─── FASE 3: Risultati ───────────────────────────────────────────────────────

function _chatTermina() {
  var panel = document.getElementById('leva-chat-panel');
  if (!panel) return;

  // ── 1. Calcola score dal frontend (stesso calcolo di diagnosi-end) ─────────
  var domande  = _dc.domande_fase2 || [];
  var risposte = _dc.risposte_fase2 || [];
  var dimsOrdered = []; // [{nome, score100}] in ordine domande
  var dimsMap = {};     // nome → score 1-5

  domande.forEach(function(d, i) {
    var r = risposte[i];
    if (r === null || r === undefined) return;
    var s = Math.min(5, Math.max(1, r + 1));
    dimsMap[d.dimensione] = s;
    dimsOrdered.push({ nome: d.dimensione, score100: Math.round(s * 20) });
  });

  var dimVals = Object.values(dimsMap);
  var scoreGlobale = dimVals.length > 0
    ? Math.round((dimVals.reduce(function(a, b) { return a + b; }, 0) / dimVals.length) * 20)
    : 0;

  // ── 2. Lancia API diagnosi-end subito (in parallelo col reveal) ────────────
  var _apiData   = null;
  var _apiError  = null;
  var _animDone  = false;
  var _finishing = false;

  fetch('/api/diagnosi-end', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prospect_id:         _dc.prospect_id,
      settore:             _dc.settore,
      fascia_fatturato:    _dc.fascia,
      risposte_fase1:      _dc.risposte_fase1,
      risposte_fase2:      _dc.risposte_fase2,
      domande_fase1:       _dc.domande_fase1,
      domande_fase2:       _dc.domande_fase2,
      sintesi_fase1:       _dc.sintesi_fase1,
      dimensioni_critiche: _dc.dimensioni_critiche,
      shock:               _dc.shock,
      benchmark_istat:     _dc.benchmark_istat || null,
      regione:             _dc.regione || 'Italia',
      contesto_titolare:   window._datiGenerici || {}
    })
  }).then(function(r) { return r.json(); })
    .then(function(data) {
      if (!data.ok) throw new Error(data.error || 'diagnosi-end error');
      if (window._pmiProspect && data.score_globale) {
        window._pmiProspect = Object.assign({}, window._pmiProspect, {
          score_globale:      data.score_globale,
          diagnosi_narrativa: data.diagnosi,
          diagnosi_priorita:  data.priorita
        });
        var idx = prospects.findIndex(function(x) { return window._pmiProspect && x.id === window._pmiProspect.id; });
        if (idx >= 0) prospects[idx] = window._pmiProspect;
      }
      _apiData = data;
      _tryFinish();
    })
    .catch(function(e) {
      console.error('diagnosi-end:', e);
      _apiError = e;
      _tryFinish();
    });

  // ── 3. Helper colori/badge ─────────────────────────────────────────────────
  function scoreColor(s) {
    return s <= 30 ? '#E24B4A' : s <= 50 ? '#EF9F27' : s <= 70 ? '#378ADD' : '#1D9E75';
  }
  function scoreBadge(s) {
    if (s <= 30) return { bg:'#FCEBEB', text:'#791F1F', label:'Critico' };
    if (s <= 50) return { bg:'#FAEEDA', text:'#633806', label:'Da migliorare' };
    if (s <= 70) return { bg:'#E6F1FB', text:'#0C447C', label:'Sufficiente' };
    return { bg:'#E1F5EE', text:'#085041', label:'Buono' };
  }
  function globalLevel(s) {
    if (s < 25) return 'Emergenza';
    if (s < 50) return 'Intervento urgente';
    if (s < 75) return 'In crescita';
    return 'Eccellenza';
  }

  var gc   = scoreColor(scoreGlobale);
  var gb   = scoreBadge(scoreGlobale);
  var glvl = globalLevel(scoreGlobale);

  var statusTexts = [
    'Calcolo dimensioni...',
    'Confronto benchmark settore...',
    'Identificazione priorit\u00e0...',
    'Generazione piano d\'azione...',
    'Diagnosi quasi pronta...',
    'Diagnosi completata.'
  ];

  // ── 4. Render reveal screen ────────────────────────────────────────────────
  var dimRowsHtml = dimsOrdered.map(function(d, i) {
    var b = scoreBadge(d.score100);
    var c = scoreColor(d.score100);
    return '<div id="diag-dim-' + i + '" style="' +
      'opacity:0;transform:translateX(-10px);transition:opacity 0.4s ease,transform 0.4s ease;' +
      'display:flex;align-items:center;gap:10px;margin-bottom:14px;">' +
      '<div style="flex:0 0 85px;font-size:13px;color:rgba(26,26,46,0.55);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + _esc(d.nome) + '</div>' +
      '<div style="flex:1;height:8px;background:rgba(0,0,0,0.07);border-radius:4px;overflow:hidden;">' +
        '<div id="diag-bar-' + i + '" style="height:100%;background:' + c + ';border-radius:4px;width:0%;transition:width 1s ease;"></div>' +
      '</div>' +
      '<div style="flex:0 0 26px;text-align:right;font-size:15px;font-weight:500;color:' + c + ';">' + d.score100 + '</div>' +
      '<div style="flex-shrink:0;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;background:' + b.bg + ';color:' + b.text + ';white-space:nowrap;">' + _esc(b.label) + '</div>' +
    '</div>';
  }).join('');

  panel.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px 12px;flex-shrink:0;">' +
      '<span style="font-size:12px;font-weight:700;color:rgba(26,26,46,0.35);letter-spacing:0.05em;text-transform:uppercase;">ELABORAZIONE DIAGNOSI</span>' +
      '<button onclick="_chatChiudiOverlay()" style="width:28px;height:28px;background:rgba(0,0,0,0.06);border:none;border-radius:8px;cursor:pointer;font-size:14px;color:rgba(26,26,46,0.4);line-height:1;">\u2715</button>' +
    '</div>' +
    '<div id="diag-body" style="flex:1;overflow-y:auto;padding:16px 20px 8px;">' +
      dimRowsHtml +
      '<div id="diag-global" style="opacity:0;transition:opacity 0.6s ease;">' +
        '<div style="height:1px;background:rgba(0,0,0,0.1);margin:16px 0 20px;"></div>' +
        '<div style="font-size:12px;font-weight:700;color:rgba(26,26,46,0.35);letter-spacing:0.05em;text-transform:uppercase;text-align:center;margin-bottom:16px;">IL TUO SCORE COMMERCIALE</div>' +
        '<div style="text-align:center;margin-bottom:12px;">' +
          '<div id="diag-counter" style="font-size:64px;font-weight:500;color:' + gc + ';line-height:1;">0</div>' +
          '<div style="font-size:14px;color:rgba(26,26,46,0.45);margin-top:4px;">su 100</div>' +
          '<div id="diag-badge-global" style="display:inline-block;margin-top:12px;font-size:12px;font-weight:700;padding:4px 14px;border-radius:20px;background:' + gb.bg + ';color:' + gb.text + ';opacity:0;transition:opacity 0.5s ease;">' + _esc(glvl) + '</div>' +
        '</div>' +
      '</div>' +
      '<div id="diag-finalizing" style="display:none;text-align:center;padding:10px 0;">' +
        '<div style="font-size:13px;color:rgba(26,26,46,0.5);font-style:italic;">Stiamo finalizzando il tuo piano...</div>' +
      '</div>' +
    '</div>' +
    '<div style="padding:8px 20px 20px;flex-shrink:0;">' +
      '<div style="width:100%;height:4px;background:#f0f0f5;border-radius:2px;overflow:hidden;margin-bottom:8px;">' +
        '<div id="diag-prog-bar" style="height:100%;background:#3D5AFE;border-radius:2px;width:0%;transition:width 1.5s ease,background 0.5s ease;"></div>' +
      '</div>' +
      '<div id="diag-prog-text" style="font-size:12px;color:rgba(26,26,46,0.4);text-align:center;">' + _esc(statusTexts[0]) + '</div>' +
    '</div>';

  // ── 5. Rivela dimensioni una alla volta (prima a 3.5s, poi ogni 3.5s) ──────
  dimsOrdered.forEach(function(d, i) {
    setTimeout(function() {
      var row = document.getElementById('diag-dim-' + i);
      if (row) { row.style.opacity = '1'; row.style.transform = 'translateX(0)'; }
      setTimeout(function() {
        var bar = document.getElementById('diag-bar-' + i);
        if (bar) bar.style.width = d.score100 + '%';
        var body = document.getElementById('diag-body');
        if (body) body.scrollTop = body.scrollHeight;
      }, 80);
    }, (i + 1) * 3500);
  });

  // ── 6. Progress bar + status text ogni 8s ─────────────────────────────────
  var progIdx = 0;
  var _progId = setInterval(function() {
    progIdx++;
    var maxProg = statusTexts.length - 2; // ultimo riservato al completamento
    if (progIdx > maxProg) { clearInterval(_progId); return; }
    var txt = document.getElementById('diag-prog-text');
    if (txt) txt.textContent = statusTexts[progIdx];
    var bar = document.getElementById('diag-prog-bar');
    if (bar) bar.style.width = Math.round((progIdx / maxProg) * 85) + '%';
  }, 8000);

  // ── 7. Score globale: appare dopo ultima dim + 2s ─────────────────────────
  var lastDimDelay = dimsOrdered.length > 0 ? dimsOrdered.length * 3500 : 0;
  var globalDelay  = lastDimDelay + 2000;

  setTimeout(function() {
    var globalEl = document.getElementById('diag-global');
    if (globalEl) globalEl.style.opacity = '1';
    setTimeout(function() {
      var body = document.getElementById('diag-body');
      if (body) body.scrollTop = body.scrollHeight;
    }, 100);

    // Contatore 0 → scoreGlobale in 1.5s cubic ease-out
    var t0 = Date.now();
    (function tick() {
      var el = document.getElementById('diag-counter');
      if (!el) return;
      var p = Math.min((Date.now() - t0) / 1500, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * scoreGlobale);
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = scoreGlobale;
        setTimeout(function() {
          var badge = document.getElementById('diag-badge-global');
          if (badge) badge.style.opacity = '1';
        }, 150);
      }
    })();
  }, globalDelay);

  // ── 8. Segna animazione completata (dopo counter + badge) ─────────────────
  setTimeout(function() {
    _animDone = true;
    _tryFinish();
  }, globalDelay + 2000); // +1.5s counter +0.5s badge

  // ── 9. tryFinish: entrambi pronti → transizione risultati ─────────────────
  function _tryFinish() {
    if (_finishing || !_animDone) return;

    if (_apiData) {
      _finishing = true;
      clearInterval(_progId);
      var bar = document.getElementById('diag-prog-bar');
      var txt = document.getElementById('diag-prog-text');
      if (bar) { bar.style.background = '#1D9E75'; bar.style.width = '100%'; }
      if (txt) txt.textContent = statusTexts[statusTexts.length - 1];
      setTimeout(function() { _chatMostraRisultati(_apiData); }, 800);

    } else if (_apiError) {
      _finishing = true;
      clearInterval(_progId);
      var p2 = document.getElementById('leva-chat-panel');
      if (p2) p2.innerHTML =
        _chatPanelHeader('Diagnosi commerciale') +
        '<div style="flex:1;display:flex;align-items:center;justify-content:center;padding:24px;">' +
          '<div style="text-align:center;">' +
            '<div style="font-size:15px;color:#E53935;margin-bottom:16px;font-family:\'Plus Jakarta Sans\',sans-serif;">Errore nel calcolo della diagnosi.</div>' +
            '<button onclick="_chatTermina()" style="padding:12px 22px;background:#3D5AFE;color:#fff;border:none;border-radius:12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;font-weight:600;cursor:pointer;">Riprova</button>' +
          '</div>' +
        '</div>';

    } else {
      // Animazione finita ma API non ancora pronta
      var finEl = document.getElementById('diag-finalizing');
      if (finEl) finEl.style.display = 'block';
      var progBar = document.getElementById('diag-prog-bar');
      var progTxt = document.getElementById('diag-prog-text');
      if (progBar) progBar.style.width = '95%';
      if (progTxt) progTxt.textContent = statusTexts[statusTexts.length - 2];
      // _apiData arriverà dal fetch e chiamerà _tryFinish() di nuovo
    }
  }
}

function _chatMostraRisultati(data) {
  var panel = document.getElementById('leva-chat-panel');
  if (!panel) return;

  var sg         = data.score_globale || 0;
  var scoreColor = sg >= 80 ? '#00825F' : sg >= 60 ? '#FF6B2B' : '#E53935';
  var scoreLabel = sg >= 80 ? 'Buona salute commerciale' : sg >= 60 ? 'Margine di miglioramento' : 'Intervento urgente';

  var prioritaHtml = (data.priorita || []).map(function(p) {
    var scoreP100 = Math.round((p.score || 1) * 20);
    return '<div style="background:rgba(255,255,255,0.65);border-radius:14px;padding:16px 18px;margin-bottom:10px;">' +
      '<div style="margin-bottom:8px;"><span style="font-size:11px;font-weight:700;color:' + scoreColor + ';border:1px solid ' + scoreColor + '44;padding:3px 10px;border-radius:20px;">' + _esc(p.dimensione) + ' — ' + scoreP100 + '/100</span></div>' +
      '<div style="font-size:14px;font-weight:500;color:#1a1a2e;margin-bottom:6px;">' + _esc(p.problema) + '</div>' +
      '<div style="font-size:13px;color:rgba(26,26,46,0.55);">→ ' + _esc(p.azione) + '</div>' +
    '</div>';
  }).join('');

  var azioniHtml = (data.azioni_immediate || []).map(function(a, i) {
    return '<div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px;">' +
      '<span style="flex-shrink:0;width:24px;height:24px;background:#3D5AFE;color:#fff;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;margin-top:2px;">' + (i+1) + '</span>' +
      '<span style="font-size:14px;color:#1a1a2e;line-height:1.55;">' + _esc(a) + '</span>' +
    '</div>';
  }).join('');

  panel.innerHTML =
    _chatPanelHeader('La tua diagnosi') +
    '<div style="flex:1;overflow-y:auto;padding:24px 20px 32px;background:#d8dbe2;">' +
      '<div style="text-align:center;margin-bottom:28px;">' +
        '<div style="font-size:12px;font-weight:700;color:rgba(26,26,46,0.35);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:14px;">Score commerciale</div>' +
        '<div style="font-size:72px;font-weight:700;color:' + scoreColor + ';line-height:1;margin-bottom:8px;">' + Math.round(sg) + '</div>' +
        '<div style="font-size:15px;font-weight:600;color:#1a1a2e;">' + _esc(scoreLabel) + '</div>' +
        '<div style="font-size:13px;color:rgba(26,26,46,0.4);margin-top:4px;">su 100 — media delle 8 dimensioni commerciali</div>' +
      '</div>' +
      '<div style="display:flex;justify-content:center;margin-bottom:24px;">' + _chatRadarSVG(data.dims || {}) + '</div>' +
      '<div style="background:rgba(255,255,255,0.65);border-radius:16px;padding:20px;margin-bottom:16px;">' +
        '<div style="font-size:11px;font-weight:700;color:rgba(26,26,46,0.35);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px;">Diagnosi</div>' +
        '<div style="font-size:15px;color:#1a1a2e;line-height:1.7;">' + _esc(data.diagnosi) + '</div>' +
      '</div>' +
      '<div style="margin-bottom:16px;">' +
        '<div style="font-size:11px;font-weight:700;color:rgba(26,26,46,0.35);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px;">Le 3 priorità</div>' +
        prioritaHtml +
      '</div>' +
      '<div style="background:rgba(255,255,255,0.65);border-radius:16px;padding:20px;margin-bottom:24px;">' +
        '<div style="font-size:11px;font-weight:700;color:rgba(26,26,46,0.35);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;">Cosa fare questa settimana</div>' +
        azioniHtml +
      '</div>' +
      '<button onclick="_chatVaiHome()" style="width:100%;padding:17px;background:#3D5AFE;color:#fff;border:none;border-radius:14px;font-size:17px;font-weight:700;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;">Vedi il tuo piano →</button>' +
    '</div>';
}

function _radarScoreColor(sc) {
  return sc <= 30 ? '#E24B4A' : sc <= 50 ? '#EF9F27' : sc <= 70 ? '#BA7517' : '#1D9E75';
}

function _chatRadarSVG(dims) {
  var keys = Object.keys(dims);
  var n = keys.length;
  if (n === 0) return '';
  var cx = 200, cy = 175, r = 105;
  var angles = keys.map(function(_, i) { return (i / n) * 2 * Math.PI - Math.PI / 2; });

  // Score globale per colore poligono
  var vals = keys.map(function(k) { return dims[k] || 0; });
  var avg = vals.length ? Math.round(vals.reduce(function(a,b){return a+b;},0) / vals.length) : 0;
  var polyColor = _radarScoreColor(avg);

  var grid = [20,40,60,80,100].map(function(lvl) {
    var pts = angles.map(function(a) {
      return (cx + r*(lvl/100)*Math.cos(a)).toFixed(1) + ',' + (cy + r*(lvl/100)*Math.sin(a)).toFixed(1);
    }).join(' ');
    return '<polygon points="' + pts + '" fill="none" stroke="rgba(26,26,46,0.1)" stroke-width="1"/>';
  }).join('');

  var axes = keys.map(function(_, i) {
    return '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + r*Math.cos(angles[i])).toFixed(1) + '" y2="' + (cy + r*Math.sin(angles[i])).toFixed(1) + '" stroke="rgba(26,26,46,0.08)" stroke-width="1"/>';
  }).join('');

  var dataPts = keys.map(function(k, i) {
    var sc = Math.min(100, Math.max(0, dims[k] || 0));
    return (cx + r*(sc/100)*Math.cos(angles[i])).toFixed(1) + ',' + (cy + r*(sc/100)*Math.sin(angles[i])).toFixed(1);
  }).join(' ');

  var dots = keys.map(function(k, i) {
    var sc = Math.min(100, Math.max(0, dims[k] || 0));
    return '<circle cx="' + (cx + r*(sc/100)*Math.cos(angles[i])).toFixed(1) + '" cy="' + (cy + r*(sc/100)*Math.sin(angles[i])).toFixed(1) + '" r="4" fill="' + polyColor + '"/>';
  }).join('');

  var labels = keys.map(function(k, i) {
    var sc = Math.min(100, Math.max(0, dims[k] || 0));
    var cosA = Math.cos(angles[i]);
    var sinA = Math.sin(angles[i]);
    var lx = cx + (r + 38) * cosA;
    var ly = cy + (r + 38) * sinA;
    var anchor = cosA < -0.2 ? 'end' : cosA > 0.2 ? 'start' : 'middle';
    var scoreCol = _radarScoreColor(sc);
    return '<text x="' + lx.toFixed(1) + '" y="' + (ly - 8).toFixed(1) + '" text-anchor="' + anchor + '" fill="rgba(26,26,46,0.75)" font-size="13" font-family="Plus Jakarta Sans,sans-serif" font-weight="700">' + _esc(k) + '</text>' +
      '<text x="' + lx.toFixed(1) + '" y="' + (ly + 10).toFixed(1) + '" text-anchor="' + anchor + '" fill="' + scoreCol + '" font-size="15" font-family="Plus Jakarta Sans,sans-serif" font-weight="700">' + sc + '</text>';
  }).join('');

  return '<svg viewBox="0 0 400 350" width="400" height="350" style="display:block;max-width:100%;">' +
    grid + axes +
    '<polygon points="' + dataPts + '" fill="' + polyColor + '33" stroke="' + polyColor + '" stroke-width="2"/>' +
    dots + labels +
  '</svg>';
}

// FIX 2: auto-popola user_profiles e prospect dai dati raccolti durante il wizard
async function _autopopolaProfiloDaDiagnosi() {
  var nomeAzienda = window._pmiSelectedNomeDisplay || _pmiSelectedSettore || '';
  var settore     = _pmiSelectedSettore || '';
  var fascia      = _pmiSelectedFascia  || '';
  var _loc        = (window._datiGenerici && window._datiGenerici.localita) || null;
  var citta       = _loc ? (typeof _loc === 'object' ? (_loc.comune || '') : String(_loc)) : '';

  // Aggiorna in memoria — non sovrascrivere company_name se già impostato
  var upNow = window._userProfileData || {};
  var companyToSave = upNow.company_name || nomeAzienda;
  window._userProfileData = Object.assign({}, upNow, {
    company_name:    companyToSave,
    sector:          settore,
    fascia_fatturato: fascia,
    citta:           citta
  });

  // Salva su Supabase user_profiles
  var uid = window._currentUserId;
  if (uid && typeof sb !== 'undefined') {
    try {
      await sb.from('user_profiles').update({
        company_name:    companyToSave,
        sector:          settore,
        fascia_fatturato: fascia,
        citta:           citta
      }).eq('user_id', uid);
    } catch(e) { console.warn('_autopopolaProfiloDaDiagnosi user_profiles:', e); }
  }

  // Aggiorna citta sul prospect se disponibile
  var p = window._pmiProspect;
  if (p && p.id && citta && typeof sb !== 'undefined') {
    try {
      await sb.from('prospects').update({ citta: citta }).eq('id', p.id);
      window._pmiProspect = Object.assign({}, p, { citta: citta });
    } catch(e) {}
  }
}

function _chatVaiHome() {
  _chatChiudiOverlay();
  renderSidebarPMI();

  // FIX 2: auto-popola profilo dai dati raccolti durante il wizard
  _autopopolaProfiloDaDiagnosi().catch(function(){});

  // Ricarica prospect dal DB PRIMA di renderizzare il piano
  // (diagnosi-end ha già salvato score_globale e dims su Supabase)
  var pid = window._pmiProspect && window._pmiProspect.id;
  if (pid) {
    sb.from('prospects').select('*').eq('id', pid).single()
      .then(function(r) {
        if (r.data) {
          // Preserva score_globale in memoria se Supabase non l'ha salvato (colonne mancanti)
          var cachedScore = window._pmiProspect && window._pmiProspect.score_globale;
          window._pmiProspect = r.data;
          if (!window._pmiProspect.score_globale && cachedScore) {
            window._pmiProspect.score_globale = cachedScore;
          }
          var idx = prospects.findIndex(function(x) { return x.id === r.data.id; });
          if (idx >= 0) prospects[idx] = window._pmiProspect; else prospects.push(window._pmiProspect);
          currentId = r.data.id;
        }
        renderViewPMI('piano');
      }).catch(function() { renderViewPMI('piano'); });
  } else {
    renderViewPMI('piano');
  }
}

// Chiamata da chiudiDiagnosi() in modalità titolare
function _dopoChiudiDiagnosiPMI(pid) {
  var p = prospects.find(function(x){ return x.id === pid; });
  if (p) { window._pmiProspect = p; window._userPlan = p.piano || 'self'; }
  window._pmiDiagnosiMode = false;

  var _STD_DOPO = ['Vendite','Marketing','Clienti','Pipeline','Pricing','Processi','Team','Digitale'];
  var hasDims = !!(p && (
    p.diagnosi_completata === true
    || (p.score_globale > 0)
    || (p.dims && _STD_DOPO.filter(function(k){ return (p.dims[k]||0)>0; }).length >= 4)
    || (p.dims && ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'].every(function(k){ return (p.dims[k]||0)>0; }))
  ));
  var hasAnswers = Object.keys(window._diagRisposte || {}).length > 0;
  var main = document.getElementById('pmi-main');

  if (hasDims) {
    // Diagnosi completata → AHA screen
    if (main) _renderAHAPMI(main);
    renderSidebarPMI();
  } else if (hasAnswers) {
    // Diagnosi iniziata ma non completata → schermata Riprendi
    _renderRiprendiDiagnosi(main);
  } else {
    // Nessuna risposta → torna alla selezione settore
    renderPrimoAccesso();
  }
}

function _renderRiprendiDiagnosi(container) {
  var dimsFatte = Object.keys(window._diagRisposte || {}).length;
  var dimsNome = ['Vendite','Pipeline','Organizzazione','Processi','Ricavi','Marketing','Sito Web','Post-vendita'];

  // Sidebar minimale "in corso"
  var sidebar = document.getElementById('pmi-sidebar');
  if (sidebar) {
    sidebar.innerHTML =
      '<div style="padding:20px 16px;border-bottom:1px solid rgba(255,255,255,0.08)">' +
        '<div style="display:inline-flex;align-items:flex-start;gap:2px">' +
          '<svg width="36" height="36" viewBox="8 4 44 44" fill="none"><rect x="8" y="34" width="44" height="4.5" rx="2.25" fill="#3D5AFE"/><rect x="27.5" y="10" width="4.5" height="25" rx="2.25" fill="white"/><circle cx="29.75" cy="36.25" r="6" fill="white"/><line x1="29.75" y1="36.25" x2="47" y2="22" stroke="#FF6B2B" stroke-width="3.5" stroke-linecap="round"/><circle cx="47" cy="22" r="3.5" fill="#FF6B2B"/></svg>' +
          '<span style="font-family:\'Plus Jakarta Sans\',sans-serif;font-size:30px;font-weight:700;color:white;line-height:1;letter-spacing:-1px">eva</span>' +
        '</div>' +
        '<div style="margin-top:20px;font-size:11px;color:rgba(255,255,255,0.35);line-height:1.7">' +
          '<div style="margin-bottom:8px;color:rgba(255,255,255,0.6);font-weight:600">Diagnosi in corso</div>' +
          dimsFatte + ' di 8 aree completate.' +
        '</div>' +
      '</div>';
  }

  if (!container) return;
  container.innerHTML =
    '<div style="max-width:520px;margin:0 auto;padding:56px 28px;">' +
      '<div style="font-size:22px;font-weight:700;color:#1a1a2e;margin-bottom:8px;">Diagnosi interrotta</div>' +
      '<p style="font-size:14px;color:rgba(26,26,46,0.55);margin-bottom:28px;line-height:1.6;">' +
        'Hai completato <strong>' + dimsFatte + ' di 8</strong> aree. Riprendi da dove hai lasciato.' +
      '</p>' +

      // Barra progresso
      '<div style="background:rgba(0,0,0,0.06);border-radius:6px;height:8px;margin-bottom:24px;">' +
        '<div style="height:8px;border-radius:6px;background:#3D5AFE;width:' + Math.round((dimsFatte/8)*100) + '%;transition:width .4s;"></div>' +
      '</div>' +

      // Lista dimensioni
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:32px;">' +
        dimsNome.map(function(nome, i) {
          var done = i < dimsFatte;
          return '<div style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:10px;background:' +
            (done ? 'rgba(0,130,95,0.07)' : 'rgba(0,0,0,0.04)') + ';border:1px solid ' +
            (done ? 'rgba(0,130,95,0.2)' : 'rgba(0,0,0,0.06)') + ';">' +
            '<span style="font-size:14px;">' + (done ? '✓' : '○') + '</span>' +
            '<span style="font-size:12px;color:' + (done ? 'rgba(0,130,95,0.85)' : 'rgba(26,26,46,0.45)') + ';font-weight:' + (done ? '600' : '400') + ';">' + nome + '</span>' +
          '</div>';
        }).join('') +
      '</div>' +

      '<div style="display:flex;gap:10px;">' +
        '<button onclick="apriDiagnosi()" style="flex:1;padding:13px;background:#3D5AFE;color:#fff;border:none;border-radius:12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:15px;font-weight:700;cursor:pointer;">Riprendi diagnosi →</button>' +
        '<button onclick="renderPrimoAccesso()" style="padding:13px 18px;background:rgba(255,255,255,0.5);border:1px solid rgba(0,0,0,0.08);border-radius:12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;color:rgba(26,26,46,0.55);cursor:pointer;">Ricomincia</button>' +
      '</div>' +
    '</div>';
}

function _renderAHAPMI(container) {
  var p = window._pmiProspect;
  if (!p || !p.dims || !Object.keys(p.dims).some(function(k){ return p.dims[k] > 0; })) {
    renderPMIHome(container);
    return;
  }

  var s = p.score_globale || calcScore(p) || 0;
  if (!s && p.dims) {
    var _ahaDv = ['Vendite','Marketing','Clienti','Pipeline','Pricing','Processi','Team','Digitale']
      .map(function(k){ return p.dims[k]||0; }).filter(function(v){ return v>0; });
    if (_ahaDv.length) s = Math.round(_ahaDv.reduce(function(a,b){return a+b;},0)/_ahaDv.length*20);
  }
  var sc = scoreColor(s);
  var DIMS_LIST = ['Vendite','Marketing','Clienti','Pipeline','Pricing','Processi','Team','Digitale'];

  // Dimensione col punteggio più basso (prima azione)
  var dimMinima = DIMS_LIST.reduce(function(min, d) {
    return (p.dims[d] || 0) < (p.dims[min] || 0) ? d : min;
  }, DIMS_LIST[0]);
  var labelMin  = dimMinima; // key IS the label
  var scoreMin  = p.dims[dimMinima] || 1;
  var stepDesc  = '';

  var gridHtml = DIMS_LIST.map(function(d) {
    var v   = p.dims[d] || 0;
    var col = dimColor(v);
    var pct = (v / 5) * 100;
    return '<div style="background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:12px;padding:10px 12px">' +
      '<div style="font-size:11px;font-weight:600;color:#1a1a2e;margin-bottom:6px">' + d + '</div>' +
      '<div style="height:5px;background:rgba(0,0,0,0.06);border-radius:3px;margin-bottom:5px"><div style="width:' + pct + '%;height:100%;background:' + col + ';border-radius:3px"></div></div>' +
      '<div style="font-size:13px;font-weight:700;color:' + col + '">' + (v || '—') + '/5</div>' +
    '</div>';
  }).join('');

  container.innerHTML =
    '<div style="max-width:640px;margin:0 auto;padding:48px 28px">' +
      // Score globale
      '<div style="text-align:center;margin-bottom:40px">' +
        '<div style="font-size:11px;font-weight:700;color:rgba(26,26,46,0.4);text-transform:uppercase;letter-spacing:0.7px;margin-bottom:18px">La tua diagnosi è pronta</div>' +
        '<div style="display:inline-flex;align-items:center;justify-content:center;width:100px;height:100px;border-radius:50%;border:3px solid ' + sc.text + ';background:' + sc.bg + ';margin-bottom:12px">' +
          '<span style="font-size:38px;font-weight:700;color:' + sc.text + '">' + s + '</span>' +
        '</div>' +
        '<div style="font-size:13px;color:rgba(26,26,46,0.55)">/100 — <strong style="color:' + sc.text + '">' + sc.label + '</strong></div>' +
      '</div>' +
      // Griglia dimensioni
      '<div style="font-size:11px;font-weight:700;color:rgba(26,26,46,0.4);text-transform:uppercase;letter-spacing:0.7px;margin-bottom:12px">Le 8 dimensioni commerciali</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:28px">' + gridHtml + '</div>' +
      // Prima azione
      '<div style="background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:14px;padding:18px;margin-bottom:28px;border-left:3px solid #FF6B2B">' +
        '<div style="font-size:10px;font-weight:700;color:#FF6B2B;text-transform:uppercase;letter-spacing:0.7px;margin-bottom:6px">Prima azione — ' + labelMin + '</div>' +
        '<div style="font-size:13px;color:#1a1a2e;line-height:1.6">' + (stepDesc && stepDesc !== '—' ? stepDesc : 'Questa è la dimensione con il maggiore potenziale: inizia da qui.') + '</div>' +
      '</div>' +
      // CTA
      '<button onclick="showViewPMI(\'home\')" style="width:100%;padding:14px;background:#3D5AFE;color:#fff;border:none;border-radius:12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:opacity .15s" onmouseover="this.style.opacity=\'0.88\'" onmouseout="this.style.opacity=\'1\'">Entra nella tua dashboard →</button>' +
    '</div>';
}

// ── Sezioni PMI (Fasi 5-9) ────────────────────────────────────────────────────

var _PMI_DIMS = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];

var AZIONI_SETTIMANALI = {
  "Vendite": {
    1: {t: "Fai una lista dei tuoi 10 migliori clienti degli ultimi 12 mesi. Per ognuno scrivi: ultimo acquisto, valore, e se li hai sentiti nell'ultimo mese. Se ne trovi 3+ che non senti da oltre 30 giorni, chiamali questa settimana.", o: "Obiettivo: ricontattare almeno 3 clienti dormienti entro venerdì."},
    2: {t: "Prendi i preventivi aperti degli ultimi 60 giorni. Conta quanti sono e quanti hai seguito almeno 2 volte. Chiama i 3 preventivi più grandi non ancora chiusi e proponi una variante semplificata.", o: "Obiettivo: chiuderne almeno 1 entro venerdì."},
    3: {t: "Definisci per iscritto il tuo processo di vendita: quanti step dal primo contatto alla chiusura? Chi fa cosa? Dove si perde tempo? Scrivi tutto su un foglio e identifica il passaggio dove perdi più trattative.", o: "Obiettivo: processo scritto nero su bianco."},
    4: {t: "Analizza il tuo tasso di chiusura: quanti preventivi hai fatto questo mese e quanti hai chiuso? Calcola la percentuale. Se è sotto il 30%, il problema è nel follow-up. Se è sopra ma il fatturato non cresce, il problema è nel numero di lead.", o: "Obiettivo: conoscere il tuo numero esatto."},
    5: {t: "Rivedi i KPI del mese: tasso di chiusura, valore medio ordine, tempo medio di chiusura. Confrontali con il mese scorso. Identifica un KPI in calo.", o: "Obiettivo: definire un'azione correttiva per la prossima settimana."}
  },
  "Pipeline": {
    1: {t: "Apri un foglio Excel o Google Sheet. Crea 5 colonne: Nome cliente, Valore preventivo, Data ultimo contatto, Prossima azione, Stato. Inserisci tutti i preventivi attivi.", o: "Obiettivo: pipeline visibile in un posto solo."},
    2: {t: "Guarda il tuo foglio pipeline. Quanti preventivi hanno la colonna 'Prossima azione' vuota? Compilala per tutti. Per ogni preventivo aperto devi sapere cosa fare dopo e quando.", o: "Obiettivo: zero preventivi senza prossima azione."},
    3: {t: "Imposta un promemoria settimanale: ogni lunedì mattina, 15 minuti per rivedere la pipeline. Se un preventivo è fermo da 45+ giorni senza risposta, segnalo come perso e chiedi il motivo.", o: "Obiettivo: pipeline pulita e aggiornata ogni lunedì."},
    4: {t: "Calcola il tuo ciclo di vendita medio: dalla prima chiamata alla chiusura, quanti giorni passano? Calcolalo sulle ultime 10 chiusure. Se è sopra 30 giorni, identifica dove si blocca.", o: "Obiettivo: conoscere il ciclo e il collo di bottiglia."},
    5: {t: "Implementa un CRM digitale (anche gratuito: HubSpot Free, Pipedrive trial). Migra i dati dal foglio. Configura i promemoria automatici per il follow-up.", o: "Obiettivo: nessun lead dimenticato, mai più."}
  },
  "Team": {
    1: {t: "Scrivi su un foglio quanto tempo dedichi alla vendita ogni settimana — in ore reali. Includi: chiamate, preventivi, visite, follow-up. Se è meno di 10 ore su 40, stai facendo il tuttofare.", o: "Obiettivo: conoscere il tuo numero reale di ore vendita."},
    2: {t: "Identifica le 3 attività che ti rubano più tempo e che NON sono vendita. Per ognuna chiediti: posso delegarla? A chi? A quanto?", o: "Obiettivo: pianificare almeno 1 delega questa settimana."},
    3: {t: "Se hai un commerciale, fissa un incontro settimanale di 30 minuti: revisione pipeline, obiettivi della settimana, problemi aperti. Se non lo fai, il tuo commerciale vende alla cieca.", o: "Obiettivo: primo incontro commerciale strutturato."},
    4: {t: "Definisci obiettivi mensili scritti per ogni persona che vende: numero di chiamate, preventivi, fatturato target. Condividili. Se non misuri, non puoi migliorare.", o: "Obiettivo: obiettivi scritti e comunicati entro venerdì."},
    5: {t: "Rivedi la struttura commerciale: chi genera lead? Chi chiude? Chi gestisce i clienti esistenti? Disegna l'organigramma commerciale.", o: "Obiettivo: organigramma chiaro con responsabilità definite."}
  },
  "Processi": {
    1: {t: "Descrivi il percorso di un cliente dal primo contatto al pagamento. Quanti passaggi? Chi lo gestisce ad ogni step? Dove si perde tempo? Scrivilo su un foglio.", o: "Obiettivo: processo scritto, anche grezzo."},
    2: {t: "Per ogni passaggio del processo segna: tempo medio, responsabile, cosa può andare storto. Identifica il passaggio più lento — quello è il tuo collo di bottiglia.", o: "Obiettivo: identificare il collo di bottiglia numero 1."},
    3: {t: "Standardizza il preventivo: template con layout professionale, condizioni chiare, scadenza 30 giorni, e follow-up automatico dopo 7 giorni.", o: "Obiettivo: template preventivo pronto per tutti i clienti."},
    4: {t: "Misura il tempo dal preventivo alla chiusura. Se è sopra 15 giorni, il cliente sta decidendo altrove. Regola: follow-up al giorno 3, 7, 14. Dopo il 14 chiedi sì o no.", o: "Obiettivo: nessun preventivo in limbo oltre 14 giorni."},
    5: {t: "Automatizza almeno 1 passaggio: promemoria automatici, email template per follow-up, o report settimanale generato automaticamente.", o: "Obiettivo: risparmiare almeno 1 ora a settimana."}
  },
  "Pricing": {
    1: {t: "Calcola quanto fatturato viene dai tuoi 3 clienti più grandi. Se è più del 40% del totale, sei a rischio. Fai una lista di 5 aziende prospect che non hai mai contattato.", o: "Obiettivo: lista di 5 prospect nuovi."},
    2: {t: "Analizza i margini per cliente o prodotto. Quale genera più margine? Quale meno? Calcolalo sui top 5 clienti.", o: "Obiettivo: conoscere il margine sui 5 clienti più grandi."},
    3: {t: "Proponi un upsell o cross-sell a 3 clienti esistenti questa settimana. Il cliente esistente compra 5x più facilmente di uno nuovo.", o: "Obiettivo: 3 proposte aggiuntive inviate."},
    4: {t: "Rivedi il listino prezzi: l'ultima volta che hai alzato i prezzi? Se è più di 18 mesi fa, stai perdendo margine. Prepara un aumento del 3-5% per i nuovi clienti.", o: "Obiettivo: nuovo listino pronto."},
    5: {t: "Identifica un servizio o prodotto complementare da offrire. Testa l'interesse con 5 clienti questa settimana.", o: "Obiettivo: validare una nuova linea di ricavo."}
  },
  "Marketing": {
    1: {t: "Cerca la tua azienda su Google. Cosa esce? Se non esce niente, il tuo marketing è inesistente. Fai lo stesso con i tuoi 3 concorrenti principali.", o: "Obiettivo: sapere cosa vede chi ti cerca online."},
    2: {t: "Crea o aggiorna la scheda Google Business Profile. Aggiungi: indirizzo, orari, foto reali, descrizione. Chiedi a 3 clienti soddisfatti di lasciare una recensione.", o: "Obiettivo: scheda Google con almeno 3 recensioni."},
    3: {t: "Pubblica 1 contenuto a settimana su LinkedIn o Facebook: una foto di un lavoro completato, un consiglio pratico, un caso di successo. Non serve essere creativi.", o: "Obiettivo: 4 post in 4 settimane."},
    4: {t: "Chiedi a 5 clienti come ti hanno trovato. Se la risposta è sempre passaparola, il marketing non funziona. Identifica un canale digitale da testare.", o: "Obiettivo: sapere come ti trovano i clienti."},
    5: {t: "Imposta un budget marketing mensile (anche €200-500). Testa un canale per 60 giorni. Misura: quanti contatti, quanti preventivi, a che costo.", o: "Obiettivo: primo test marketing con budget e misura."}
  },
  "Digitale": {
    1: {t: "Apri il tuo sito sul telefono. Si carica in meno di 3 secondi? Si legge bene? Il numero è cliccabile? Il modulo contatti funziona? Se una risposta è no, il sito ti perde clienti.", o: "Obiettivo: test mobile del tuo sito fatto."},
    2: {t: "Il sito deve avere: chi sei, cosa fai, dove sei, come contattarti, e almeno 3 foto reali. Se manca qualcosa, aggiornalo.", o: "Obiettivo: 5 informazioni base presenti e aggiornate."},
    3: {t: "Installa Google Analytics (gratuito). Dopo una settimana guarda: quante visite, da dove, quale pagina è più vista. Se non misuri, non sai se il sito funziona.", o: "Obiettivo: Analytics installato e funzionante."},
    4: {t: "Aggiungi una pagina casi di successo: 3-5 esempi con foto, problema, soluzione, risultato. Più persuasivo di qualsiasi testo commerciale.", o: "Obiettivo: almeno 3 casi pubblicati."},
    5: {t: "Ottimizza per ricerche locali: inserisci città e servizi nei titoli. 'Meccanica di precisione a Torino' non solo 'I nostri servizi'.", o: "Obiettivo: titoli pagine ottimizzati."}
  },
  "Clienti": {
    1: {t: "Chiama 3 clienti che hanno comprato negli ultimi 6 mesi. Non per vendere — per chiedere come va. Questa telefonata vale più di qualsiasi campagna marketing.", o: "Obiettivo: 3 chiamate di follow-up fatte."},
    2: {t: "Crea un template email: 'Ciao [nome], sono passati 30 giorni dal tuo acquisto. Tutto bene? Posso aiutarti?' Inviala ai clienti degli ultimi 3 mesi.", o: "Obiettivo: template creato e prime 10 email inviate."},
    3: {t: "Definisci un calendario post-vendita: giorno 7 feedback, giorno 30 check-in, giorno 90 proposta riacquisto. Automatizzalo se possibile.", o: "Obiettivo: calendario post-vendita scritto."},
    4: {t: "Misura il tasso di riacquisto: quanti clienti comprano una seconda volta entro 12 mesi? Se è sotto il 20%, il post-vendita non funziona.", o: "Obiettivo: conoscere il tuo tasso di riacquisto."},
    5: {t: "Implementa un programma referral: sconto o servizio gratuito ai clienti che portano un nuovo cliente. Il passaparola incentivato costa meno di qualsiasi pubblicità.", o: "Obiettivo: programma referral attivo."}
  }
};

function generaAnalisiAI(prospect) {
  var dims = prospect.dims || {};
  var scoreGlobale = prospect.scoreGlobale || 0;
  var entries = Object.keys(dims).filter(function(k){ return dims[k] > 0; }).map(function(k){ return [k, dims[k]]; });
  if (entries.length === 0) return {testo: '', consiglio: ''};
  var sorted = entries.slice().sort(function(a,b){ return a[1]-b[1]; });
  var debole = sorted[0];
  var forte  = sorted[sorted.length-1];
  var critiche = entries.filter(function(e){ return e[1]<=1; }).length;

  var s100debole = Math.round(debole[1] * 20);
  var s100forte  = Math.round(forte[1] * 20);

  var testo = '';
  if (debole[1] <= 1) {
    testo = 'La tua area più critica è ' + debole[0] + ' con score ' + s100debole + '/100 — sei ben sotto la media di settore.';
  } else if (debole[1] <= 2) {
    testo = debole[0] + ' (' + s100debole + '/100) è la tua area più debole. C\'è margine di crescita significativo rispetto alla media del settore.';
  } else {
    testo = 'Il tuo profilo è equilibrato. ' + debole[0] + ' (' + s100debole + '/100) è l\'area con più margine di miglioramento.';
  }

  var correlazioni = {'Pipeline':'Processi','Vendite':'Team','Marketing':'Digitale','Pricing':'Clienti'};
  var prereq = correlazioni[debole[0]];
  var consiglio = '';
  if (prereq && dims[prereq] && dims[prereq] <= 2) {
    consiglio = 'Ma prima di lavorare su ' + debole[0] + ', risolvi ' + prereq + ' (' + Math.round((dims[prereq]||0)*20) + '/100) — è un prerequisito. Senza ' + prereq + ' strutturato, i miglioramenti su ' + debole[0] + ' non tengono.';
  } else if (critiche >= 3) {
    consiglio = 'Hai ' + critiche + ' aree critiche — concentrati su una alla volta. Parti da ' + debole[0] + '.';
  } else {
    consiglio = 'Parti da ' + debole[0] + ' — migliorarla avrà l\'impatto maggiore sul tuo fatturato nei prossimi 90 giorni. Il tuo punto di forza è ' + forte[0] + ' (' + s100forte + '/100).';
  }

  return {testo: testo, consiglio: consiglio};
}

// ── FASE 5 — Home ─────────────────────────────────────────────────────────────
function renderPMIHome(p) {
  // ── Saluto contestuale ──
  const ora = new Date().getHours();
  const saluto = ora < 13 ? 'Buongiorno' : ora < 18 ? 'Buon pomeriggio' : 'Buonasera';

  // ── Nome utente ──
  const _up = window._userProfileData || {};
  const _fullName = (_up.full_name || '').trim();
  const _companyName = (_up.company_name || '').trim();
  const _nomeAzienda = (p.nome_azienda || '').trim();
  const nome = _fullName || _companyName || _nomeAzienda || null;

  // ── Piano utente ──
  const piano = window._userPlan || 'free'; // 'free', 'self', 'guided_base', 'guided_pro'
  const isFree = piano === 'free';
  const isPaid = !isFree;

  // ── Dati ──
  const score = p.score_globale || 0;
  const dims = p.dims || {};
  const STD = ['Vendite','Marketing','Clienti','Pipeline','Pricing','Processi','Team','Digitale'];

  const dimVal = (d) => {
    const raw = dims[d] || 0;
    return raw <= 5 ? raw * 20 : raw;
  };

  const scoreColor = score < 40 ? '#F43F5E' : score < 60 ? '#FBBF24' : '#34D399';
  const livello = score < 25 ? 'Emergenza' : score < 50 ? 'Sopravvivenza' : score < 75 ? 'Crescita' : 'Eccellenza';
  const prossimoLivello = score < 25 ? 'Sopravvivenza' : score < 50 ? 'Crescita' : score < 75 ? 'Eccellenza' : 'Master';
  const azione = window._azioneSettimanale || 'Il tuo scontrino medio e\' \u20ac80. Nella tua zona la media e\' \u20ac95. Proponi il pacchetto manutenzione annuale a \u20ac350.';
  const streak = (p.score_history || []).length;
  const azioniCompletate = 3;
  const azioniTotali = 5;
  const mediaSett = 60;

  // ── Stima perdita (da diagnosi-end o calcolata) ──
  const stimaPerdita = p.stima_perdita_annua || 15600;
  const stimaRecupero = Math.round(stimaPerdita * 1.35);

  // ── Trova le 3 dimensioni peggiori ──
  const dimScores = STD.map(d => ({ nome: d, val: dimVal(d) })).sort((a,b) => a.val - b.val);
  const top3Critiche = dimScores.slice(0, 3);

  // ── Sfondo ──
  document.body.style.background = '#06080F';
  document.getElementById('app-pmi').style.background = '#06080F';

  const mainEl = document.querySelector('#app-pmi .pmi-main') || document.querySelector('#app-pmi > div:last-child');
  mainEl.style.background = 'transparent';
  mainEl.style.position = 'relative';
  mainEl.style.overflow = 'hidden';
  mainEl.style.overflowY = 'auto';

  // ══════════════════════════════════════════════════════════════════════════
  // CARD BLOCCATA — helper
  // ══════════════════════════════════════════════════════════════════════════
  function lockedCard(innerHtml, label, sublabel) {
    return `<div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.06);border-radius:14px;padding:24px;position:relative;overflow:hidden;">
      <div style="filter:blur(6px);opacity:0.25;pointer-events:none;">${innerHtml}</div>
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <div style="color:rgba(255,255,255,0.45);font-size:14px;margin-top:8px;font-weight:500;">${label}</div>
        <div style="color:rgba(255,255,255,0.25);font-size:12px;margin-top:2px;">${sublabel}</div>
        <div onclick="showViewPMI('piano')" style="margin-top:12px;padding:8px 20px;border-radius:10px;background:#7B61FF;color:white;font-size:13px;font-weight:500;cursor:pointer;">Sblocca \u2192</div>
      </div>
    </div>`;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // METRIC CARD BLOCCATA (piccola, per la griglia top)
  // ══════════════════════════════════════════════════════════════════════════
  function lockedMetric(blurHtml) {
    return `<div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.06);border-radius:14px;padding:20px;position:relative;overflow:hidden;">
      <div style="filter:blur(6px);opacity:0.25;pointer-events:none;">${blurHtml}</div>
      <div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <div style="color:rgba(255,255,255,0.3);font-size:11px;margin-top:6px;">Piano Self</div>
      </div>
    </div>`;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // KPI (per piano Self+)
  // ══════════════════════════════════════════════════════════════════════════
  const kpiData = [
    { label: 'Incasso',   value: '\u20ac1.850', pct: 62, color: '#7B61FF', media: '\u20ac2.950' },
    { label: 'Clienti',   value: '23',           pct: 45, color: '#FBBF24', media: '51'     },
    { label: 'Scontrino', value: '\u20ac80',     pct: 84, color: '#34D399', media: '\u20ac95'    }
  ];

  const kpiHtml = kpiData.map((k, i) => `<div style="margin-bottom:${i < kpiData.length - 1 ? '18px' : '0'};">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
      <span style="color:rgba(255,255,255,0.5);font-size:16px;">${k.label}</span>
      <span style="color:white;font-size:18px;font-weight:500;">${k.value}</span>
    </div>
    <div style="height:6px;background:rgba(255,255,255,0.04);border-radius:3px;">
      <div style="height:100%;width:${k.pct}%;background:${k.color};border-radius:3px;"></div>
    </div>
    <div style="color:rgba(255,255,255,0.2);font-size:12px;margin-top:4px;">Media zona: ${k.media}</div>
  </div>`).join('');

  // ══════════════════════════════════════════════════════════════════════════
  // GAMIFICATION (per piano Self+)
  // ══════════════════════════════════════════════════════════════════════════
  const gamifDone = Math.min(azioniCompletate, 5);
  const gamifChecks = [1,2,3,4,5].map(n => {
    if (n <= gamifDone) return '<div style="width:32px;height:32px;border-radius:7px;background:rgba(52,211,153,0.15);display:flex;align-items:center;justify-content:center;"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>';
    return '<div style="width:32px;height:32px;border-radius:7px;background:rgba(255,255,255,0.03);"></div>';
  }).join('');

  // ══════════════════════════════════════════════════════════════════════════
  // POSIZIONAMENTO (per piano Self+)
  // ══════════════════════════════════════════════════════════════════════════
  const posDims = STD.slice(0, 5);
  const posHTML = posDims.map(d => {
    const val = dimVal(d);
    const c = val < 40 ? '#F43F5E' : val < 60 ? '#FBBF24' : '#34D399';
    return `<div style="margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
        <span style="color:rgba(255,255,255,0.5);font-size:15px;">${d}</span>
        <span style="color:${c};font-size:15px;font-weight:500;">${val}</span>
      </div>
      <div style="height:6px;background:rgba(255,255,255,0.04);border-radius:3px;position:relative;">
        <div style="height:100%;width:${val}%;background:${c};border-radius:3px;"></div>
        <div style="position:absolute;top:-2px;left:${mediaSett}%;width:1.5px;height:10px;background:rgba(255,255,255,0.15);border-radius:1px;"></div>
      </div>
    </div>`;
  }).join('');

  // ══════════════════════════════════════════════════════════════════════════
  // STREAK BARS
  // ══════════════════════════════════════════════════════════════════════════
  const streakBars = [1,2,3,4,5].map(n => {
    const active = n <= streak;
    return `<div style="width:18px;height:5px;border-radius:2px;background:${active ? '#FF6B2B' : 'rgba(255,255,255,0.04)'};"></div>`;
  }).join('');

  // ══════════════════════════════════════════════════════════════════════════
  // 3 AREE CRITICHE (per Free)
  // ══════════════════════════════════════════════════════════════════════════
  const areeCriticheHtml = top3Critiche.map((d, i) => {
    const c = d.val < 40 ? '#F43F5E' : d.val < 60 ? '#FBBF24' : '#34D399';
    return `<div style="margin-bottom:${i < 2 ? '14px' : '0'};">
      <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
        <span style="color:rgba(255,255,255,0.6);font-size:16px;">${d.nome}</span>
        <span style="color:${c};font-size:16px;font-weight:500;">${d.val}</span>
      </div>
      <div style="height:6px;background:rgba(255,255,255,0.04);border-radius:3px;">
        <div style="height:100%;width:${d.val}%;background:${c};border-radius:3px;"></div>
      </div>
    </div>`;
  }).join('');

  // ══════════════════════════════════════════════════════════════════════════
  // BUILD HTML
  // ══════════════════════════════════════════════════════════════════════════

  // ── BANNER UPGRADE (solo Free) ──
  const bannerHtml = isFree ? `
    <div style="background:rgba(123,97,255,0.06);border:0.5px solid rgba(123,97,255,0.15);border-radius:12px;padding:14px 20px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;">
      <div style="display:flex;align-items:center;gap:10px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <div style="color:rgba(255,255,255,0.6);font-size:14px;">Stai usando il piano gratuito. <span style="color:#A78BFA;font-weight:500;">Sblocca tutte le funzionalita</span></div>
      </div>
      <div onclick="showViewPMI('piano')" style="padding:8px 18px;border-radius:10px;background:#7B61FF;color:white;font-size:13px;font-weight:500;cursor:pointer;">Vedi i piani</div>
    </div>` : '';

  // ── BADGE PIANO ──
  const pianoLabel = isFree ? 'Piano Free' : piano === 'self' ? 'Self' : piano === 'guided_base' ? 'Guided Base' : 'Guided Pro';
  const pianoBadge = isFree
    ? `<div style="padding:6px 14px;border-radius:20px;background:rgba(52,211,153,0.1);border:0.5px solid rgba(52,211,153,0.3);color:#34D399;font-size:13px;font-weight:500;">${pianoLabel}</div>`
    : `<div style="padding:6px 14px;border-radius:20px;border:0.5px solid rgba(255,107,43,0.35);color:#FF6B2B;font-size:14px;font-weight:500;">${livello}</div>
       <div style="padding:6px 14px;border-radius:20px;border:0.5px solid rgba(123,97,255,0.35);color:#A78BFA;font-size:14px;">Sett. 4</div>`;

  // ── 4 METRIC CARDS TOP ──
  let metricsHtml;
  if (isFree) {
    // Free: Score + Stima Perdita visibili, Azioni + Streak bloccati
    metricsHtml = `
      <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.06);border-radius:14px;padding:20px;">
        <div style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:10px;">SCORE</div>
        <div style="color:${scoreColor};font-size:56px;font-weight:500;line-height:1;">${score}</div>
        <div style="color:rgba(255,255,255,0.3);font-size:13px;margin-top:8px;">su 100</div>
      </div>
      <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.06);border-radius:14px;padding:20px;">
        <div style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:10px;">STAI PERDENDO</div>
        <div style="color:#F43F5E;font-size:56px;font-weight:500;line-height:1;">\u20ac${stimaPerdita.toLocaleString('it-IT')}</div>
        <div style="color:rgba(255,255,255,0.3);font-size:13px;margin-top:8px;">ogni anno</div>
      </div>
      ${lockedMetric('<div style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:10px;">AZIONI</div><div style="color:#7B61FF;font-size:48px;font-weight:500;">3/12</div>')}
      ${lockedMetric('<div style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:10px;">STREAK</div><div style="color:#FF6B2B;font-size:48px;font-weight:500;">0</div>')}`;
  } else {
    // Paid: tutto visibile
    metricsHtml = `
      <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.06);border-radius:14px;padding:20px;">
        <div style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:10px;">SCORE</div>
        <div style="color:${scoreColor};font-size:56px;font-weight:500;line-height:1;">${score}</div>
        <div style="display:flex;align-items:center;gap:6px;margin-top:8px;">
          <span style="color:#34D399;font-size:13px;">+3</span>
          <span style="color:rgba(255,255,255,0.35);font-size:13px;">vs sett. scorsa</span>
        </div>
      </div>
      <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.06);border-radius:14px;padding:20px;">
        <div style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:10px;">RECUPERO STIMATO</div>
        <div style="color:#34D399;font-size:56px;font-weight:500;line-height:1;">\u20ac${stimaRecupero.toLocaleString('it-IT')}</div>
        <div style="color:rgba(255,255,255,0.35);font-size:13px;margin-top:8px;">questo mese</div>
      </div>
      <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.06);border-radius:14px;padding:20px;">
        <div style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:10px;">AZIONI</div>
        <div style="color:#7B61FF;font-size:56px;font-weight:500;line-height:1;">${azioniCompletate}<span style="font-size:20px;color:rgba(255,255,255,0.2);">/${azioniTotali}</span></div>
        <div style="height:6px;background:rgba(255,255,255,0.04);border-radius:3px;margin-top:10px;"><div style="height:100%;width:${azioniCompletate/azioniTotali*100}%;background:#7B61FF;border-radius:3px;"></div></div>
      </div>
      <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.06);border-radius:14px;padding:20px;">
        <div style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:10px;">STREAK</div>
        <div style="color:#FF6B2B;font-size:56px;font-weight:500;line-height:1;">${streak}<span style="font-size:18px;color:rgba(255,255,255,0.2);"> sett</span></div>
        <div style="display:flex;gap:4px;margin-top:10px;">${streakBars}</div>
      </div>`;
  }

  // ── COLONNA SINISTRA ──
  let colSxHtml;
  if (isFree) {
    // Free: Leva dice (messaggio generico) + KPI bloccato
    colSxHtml = `
      <div style="background:rgba(123,97,255,0.07);border:0.5px solid rgba(123,97,255,0.2);border-radius:14px;padding:24px;margin-bottom:14px;animation:leva-glow 4s infinite;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
          <div style="width:7px;height:7px;border-radius:50%;background:#7B61FF;animation:leva-pulse 1.5s infinite;"></div>
          <div style="color:#A78BFA;font-size:16px;font-weight:500;">Leva dice</div>
          <div style="color:rgba(255,255,255,0.25);font-size:13px;">ora</div>
        </div>
        <div style="color:white;font-size:18px;line-height:1.7;">Le tue 3 aree piu critiche sono ${top3Critiche.map(d=>d.nome).join(', ')}. Stai perdendo \u20ac${stimaPerdita.toLocaleString('it-IT')}/anno.</div>
        <div style="margin-top:14px;color:rgba(255,255,255,0.4);font-size:15px;font-style:italic;">Vuoi sapere come recuperarli? Scegli un piano.</div>
      </div>
      ${lockedCard(
        '<div style="color:rgba(255,255,255,0.4);font-size:14px;margin-bottom:18px;">I TUOI KPI</div>' + kpiHtml,
        'KPI settimanali',
        'Disponibile con il piano Self'
      )}`;
  } else {
    // Paid: Leva dice con typewriter + KPI visibile
    colSxHtml = `
      <div style="background:rgba(123,97,255,0.07);border:0.5px solid rgba(123,97,255,0.2);border-radius:14px;padding:24px;margin-bottom:14px;animation:leva-glow 4s infinite;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
          <div style="width:7px;height:7px;border-radius:50%;background:#7B61FF;animation:leva-pulse 1.5s infinite;"></div>
          <div style="color:#A78BFA;font-size:16px;font-weight:500;">Leva dice</div>
          <div style="color:rgba(255,255,255,0.25);font-size:13px;">ora</div>
        </div>
        <div id="leva-dice-text" style="color:white;font-size:18px;line-height:1.7;min-height:52px;"></div>
        <div style="margin-top:16px;display:flex;gap:10px;">
          <div style="padding:12px 24px;border-radius:10px;background:#7B61FF;color:white;font-size:15px;font-weight:500;cursor:pointer;">Fatto</div>
          <div style="padding:12px 24px;border-radius:10px;border:0.5px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.4);font-size:15px;cursor:pointer;">Dimmi di piu</div>
        </div>
      </div>
      <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.06);border-radius:14px;padding:24px;">
        <div style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:18px;">I TUOI KPI</div>
        ${kpiHtml}
      </div>`;
  }

  // ── COLONNA DESTRA ──
  let colDxHtml;
  if (isFree) {
    // Free: 3 aree critiche visibili + posizionamento bloccato
    colDxHtml = `
      <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.06);border-radius:14px;padding:24px;margin-bottom:14px;">
        <div style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:16px;">LE TUE 3 AREE CRITICHE</div>
        ${areeCriticheHtml}
      </div>
      ${lockedCard(
        '<div style="color:rgba(255,255,255,0.4);font-size:14px;margin-bottom:12px;">POSIZIONAMENTO</div>' + posHTML,
        'Posizionamento completo',
        'Disponibile con il piano Self'
      )}`;
  } else {
    // Paid: gamification + posizionamento visibili
    colDxHtml = `
      <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.06);border-radius:14px;padding:24px;margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div style="color:rgba(255,255,255,0.5);font-size:14px;">PROSSIMO LIVELLO</div>
          <div style="color:#FF6B2B;font-size:17px;font-weight:500;">${prossimoLivello}</div>
        </div>
        <div style="height:8px;background:rgba(255,255,255,0.04);border-radius:4px;margin-bottom:14px;">
          <div style="height:100%;width:${Math.min(score / 75 * 100, 100)}%;background:#FF6B2B;border-radius:4px;"></div>
        </div>
        <div style="display:flex;gap:6px;">${gamifChecks}</div>
      </div>
      <div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.06);border-radius:14px;padding:24px;">
        <div style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:16px;">POSIZIONAMENTO</div>
        ${posHTML}
        <div style="color:rgba(255,255,255,0.15);font-size:11px;margin-top:8px;">| = media settore</div>
      </div>`;
  }

  // ── CTA UPGRADE FORTE (solo Free) ──
  const ctaHtml = isFree ? `
    <div style="background:rgba(123,97,255,0.08);border:1px solid rgba(123,97,255,0.25);border-radius:14px;padding:24px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div style="color:white;font-size:18px;font-weight:500;margin-bottom:4px;">Recupera fino a \u20ac${stimaRecupero.toLocaleString('it-IT')}/anno</div>
        <div style="color:rgba(255,255,255,0.45);font-size:14px;">Sblocca il piano completo con azioni personalizzate, KPI e benchmark.</div>
      </div>
      <div style="display:flex;gap:10px;">
        <div onclick="showViewPMI('piano')" style="padding:12px 24px;border-radius:10px;background:#7B61FF;color:white;font-size:15px;font-weight:500;cursor:pointer;">Self \u2014 \u20ac199/mese</div>
        <div onclick="showViewPMI('piano')" style="padding:12px 24px;border-radius:10px;border:0.5px solid rgba(255,107,43,0.3);color:#FF6B2B;font-size:15px;cursor:pointer;">Guided \u2014 \u20ac399/mese</div>
      </div>
    </div>` : '';

  // ── FOOTER BAR ──
  const footerHtml = `
    <div style="background:rgba(255,255,255,0.02);border:0.5px solid rgba(255,255,255,0.04);border-radius:14px;padding:18px 24px;display:flex;align-items:center;gap:14px;">
      <div style="width:7px;height:7px;border-radius:50%;background:#7B61FF;animation:leva-pulse 2s infinite;"></div>
      <div id="leva-footer-msg" style="color:rgba(255,255,255,0.4);font-size:15px;flex:1;transition:opacity 0.3s;"></div>
      <div style="padding:8px 18px;border-radius:10px;border:0.5px solid rgba(123,97,255,0.35);color:#A78BFA;font-size:14px;font-weight:500;cursor:pointer;">Chiedi a Leva</div>
    </div>`;

  // ══════════════════════════════════════════════════════════════════════════
  // ASSEMBLE
  // ══════════════════════════════════════════════════════════════════════════
  mainEl.innerHTML = `
    <canvas id="leva-waves-home" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;"></canvas>
    <div style="position:relative;z-index:1;padding:28px 32px;">

      <!-- HEADER -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:${isFree ? '20px' : '28px'};">
        <div>
          <div style="color:rgba(255,255,255,0.5);font-size:14px;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">${saluto.toUpperCase()}</div>
          <div style="color:white;font-size:32px;font-weight:500;">${nome || '<span onclick="showViewPMI(\'profilo\')" style="color:#A78BFA;cursor:pointer;font-size:22px;font-weight:400;border-bottom:1px solid rgba(167,139,250,0.3);">Completa il tuo profilo \u2192</span>'}</div>
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
          <div style="height:9px;width:9px;border-radius:50%;background:#34D399;animation:leva-pulse 2s infinite;"></div>
          <span style="color:rgba(255,255,255,0.4);font-size:14px;">Live</span>
          ${pianoBadge}
        </div>
      </div>

      ${bannerHtml}

      <!-- 4 METRICS -->
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px;margin-bottom:24px;">
        ${metricsHtml}
      </div>

      <!-- GRIGLIA PRINCIPALE -->
      <div style="display:grid;grid-template-columns:1.2fr 0.8fr;gap:16px;margin-bottom:20px;">
        <div>${colSxHtml}</div>
        <div>${colDxHtml}</div>
      </div>

      ${ctaHtml}

      <!-- FOOTER -->
      <div style="margin-top:${isFree ? '20px' : '0'};">
        ${footerHtml}
      </div>

    </div>
  `;

  // ══════════════════════════════════════════════════════════════════════════
  // ANIMAZIONI
  // ══════════════════════════════════════════════════════════════════════════

  // 1. Onde
  if (window.initLevaWaves) {
    if (window._wavesInstance) window._wavesInstance.stop();
    window._wavesInstance = initLevaWaves('leva-waves-home');
  }

  // 2. Typewriter "Leva dice" (solo paid)
  if (isPaid) {
    var levaDiceMsgs = [
      azione,
      'Hai completato ' + azioniCompletate + ' azioni consecutive. Ancora ' + (5 - azioniCompletate) + ' e sali al livello ' + prossimoLivello + '.',
      'Nella tua zona ci sono aziende come la tua che stanno crescendo. Non restare fermo.'
    ];
    var levaDiceIdx = 0;
    var levaDiceEl = document.getElementById('leva-dice-text');
    function typeLevaMsg() {
      if (!levaDiceEl) return;
      var msg = levaDiceMsgs[levaDiceIdx % levaDiceMsgs.length];
      levaDiceEl.textContent = '';
      var i = 0;
      function addCh() {
        if (i < msg.length && levaDiceEl) { levaDiceEl.textContent += msg[i]; i++; setTimeout(addCh, 18); }
      }
      addCh();
      levaDiceIdx++;
    }
    if (window._levaDiceInterval) clearInterval(window._levaDiceInterval);
    setTimeout(typeLevaMsg, 800);
    window._levaDiceInterval = setInterval(typeLevaMsg, 14000);
  }

  // 3. Footer rotante
  var footerMsgs = isFree
    ? ['Stai usando il piano gratuito...', 'Sblocca azioni personalizzate con Self', stimaPerdita > 0 ? 'Stai perdendo \u20ac' + stimaPerdita.toLocaleString('it-IT') + ' ogni anno' : 'Analizzando i tuoi dati...', 'Scopri come recuperare — vedi i piani']
    : ['Analizzando i tuoi dati...', 'Il tuo report serale sara\' pronto alle 15:00', '3 aziende del tuo settore nella tua zona hanno migliorato questa settimana', 'La prossima ri-diagnosi e\' tra 47 giorni'];
  var footerIdx = 0;
  var footerEl = document.getElementById('leva-footer-msg');
  function rotateFooter() {
    if (!footerEl) return;
    footerEl.style.opacity = '0';
    setTimeout(function() {
      if (!footerEl) return;
      footerEl.textContent = footerMsgs[footerIdx % footerMsgs.length];
      footerEl.style.opacity = '1';
      footerIdx++;
    }, 300);
  }
  if (window._footerInterval) clearInterval(window._footerInterval);
  rotateFooter();
  window._footerInterval = setInterval(rotateFooter, 5000);

  // 4. Onboarding tour (solo prima volta)
  setTimeout(_showLevaOnboarding, 600);
}


function _showLevaOnboarding() {
  if (localStorage.getItem('leva_onboarding_done')) return;
  var _p = window._pmiProspect || {};
  if (!(_p.diagnosi_completata === true || _p.score_globale > 0)) return;

  var _steps = [
    {
      title: 'Completa il tuo profilo',
      text: 'Inserisci il tuo nome e quello della tua azienda per personalizzare l\'esperienza.',
      btn: 'Vai al profilo →',
      isFinal: false,
      goProfile: true
    },
    {
      title: 'Le tue azioni settimanali',
      text: 'Ogni settimana riceverai un\'azione concreta. Completala per salire di livello.',
      btn: 'Ho capito →',
      isFinal: false,
      goProfile: false
    },
    {
      title: 'Chiedi a Leva',
      text: 'Hai una domanda? Chiedi direttamente a Leva. Sa tutto della tua azienda.',
      btn: 'Iniziamo! →',
      isFinal: true,
      goProfile: false
    }
  ];

  function _closeTour() {
    localStorage.setItem('leva_onboarding_done', 'true');
    var existing = document.getElementById('leva-onboarding-overlay');
    if (existing) existing.remove();
  }

  function _renderStep(idx) {
    var existing = document.getElementById('leva-onboarding-overlay');
    if (existing) existing.remove();
    if (idx >= _steps.length) {
      localStorage.setItem('leva_onboarding_done', 'true');
      return;
    }
    var s = _steps[idx];
    var dots = _steps.map(function(_, i) {
      return '<div style="width:8px;height:8px;border-radius:50%;background:' +
        (i === idx ? '#7B61FF' : 'rgba(255,255,255,0.15)') + ';transition:background 0.2s;"></div>';
    }).join('');

    var overlay = document.createElement('div');
    overlay.id = 'leva-onboarding-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.65);z-index:9999;display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML =
      '<div id="leva-ob-box" style="position:relative;background:#0F1219;border:0.5px solid rgba(123,97,255,0.2);border-radius:16px;padding:28px;max-width:380px;width:90%;animation:leva-slideUp 0.3s ease;">' +
        '<span id="leva-ob-close" style="position:absolute;top:8px;right:12px;font-size:18px;color:rgba(255,255,255,0.5);cursor:pointer;line-height:1;" onmouseenter="this.style.color=\'white\'" onmouseleave="this.style.color=\'rgba(255,255,255,0.5)\'">&#x2715;</span>' +
        '<div style="font-size:20px;font-weight:500;color:white;margin-bottom:12px;">' + s.title + '</div>' +
        '<div style="font-size:15px;color:rgba(255,255,255,0.6);line-height:1.6;margin-bottom:24px;">' + s.text + '</div>' +
        '<button id="leva-ob-btn" style="background:#7B61FF;color:white;border:none;padding:12px 24px;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;width:100%;">' + s.btn + '</button>' +
        '<div style="display:flex;justify-content:center;gap:8px;margin-top:16px;">' + dots + '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    document.getElementById('leva-ob-close').onclick = function() {
      _closeTour();
    };

    overlay.addEventListener('click', function(e) {
      if (!document.getElementById('leva-ob-box').contains(e.target)) {
        _closeTour();
      }
    });

    document.getElementById('leva-ob-btn').onclick = function() {
      if (s.isFinal) localStorage.setItem('leva_onboarding_done', 'true');
      overlay.remove();
      if (s.goProfile) { showViewPMI('profilo'); return; }
      if (!s.isFinal) _renderStep(idx + 1);
    };
  }

  _renderStep(0);
}

function completaAzioneSettimanale() {
  // TODO Phase 10
  alert('Ottimo! Azione registrata come completata.');
}

function saltaAzioneSettimanale() {
  // TODO Phase 10
  alert('Azione segnata come non applicabile. Passiamo alla prossima.');
}

function apriPrenotazioneCall() {
  // TODO Phase 10
  alert('Funzione prenotazione in arrivo. Contatta il tuo CSO direttamente per ora.');
}

// ── FASE 6 — Score ────────────────────────────────────────────────────────────
/* Shared DS setup — call BEFORE setting container.innerHTML */
function _levaSetDSBg(container) {
  document.body.style.background = '#06080F';
  container.style.background = 'transparent';
  container.style.position   = 'relative';
  container.style.overflowY  = 'auto';
}
/* Shared DS wave start — call AFTER container.innerHTML */
function _levaStartWaves(canvasId) {
  if (window.initLevaWaves) {
    if (window._wavesInstance) window._wavesInstance.stop();
    window._wavesInstance = initLevaWaves(canvasId);
  }
}
var _DS_CANVAS = '<canvas id="leva-waves-view" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.45;"></canvas>';

function renderPMIScore(container) {
  var p = window._pmiProspect;
  if (!p || !p.dims) { renderPMIHome(container); return; }

  _levaSetDSBg(container);

  var s  = p.score_globale || calcScore(p) || 0;
  var dims = p.dims || {};
  var isFree = (window._userPlan || 'free') === 'free';
  var stimaPerdita = p.stima_perdita_annua || 15600;

  var _STD_DIMS_S = ['Vendite','Marketing','Clienti','Pipeline','Pricing','Processi','Team','Digitale'];

  // Convert raw dim value (1-5) to 0-100
  function _dimPct(d) {
    var raw = dims[d] || 0;
    return raw <= 5 ? Math.round(raw * 20) : raw;
  }

  // Semaforo color based on 0-100
  function _dimColDS(pct) {
    if (pct >= 71) return '#00C853';
    if (pct >= 51) return '#FFB800';
    if (pct >= 31) return '#FF6B2B';
    return '#FF4444';
  }

  // Ring color
  var scoreCol = s >= 71 ? '#00C853' : s >= 51 ? '#FFB800' : s >= 31 ? '#FF6B2B' : '#FF4444';
  var circumference = +(2 * Math.PI * 68).toFixed(1);
  var dashOffset     = +((1 - s / 100) * circumference).toFixed(1);

  // Top 3 critiche (sorted by pct asc)
  var dimsByPct = _STD_DIMS_S.slice().sort(function(a, b) { return _dimPct(a) - _dimPct(b); });
  var top3Names = dimsByPct.slice(0, 3).join(', ');

  // Locked card helper
  function _lockedCard(innerHtml, label, sublabel) {
    return '<div style="background:rgba(255,255,255,0.025);border:0.5px solid rgba(255,255,255,0.06);border-radius:16px;padding:24px;position:relative;overflow:hidden;">' +
      '<div style="filter:blur(6px);opacity:0.25;pointer-events:none;">' + innerHtml + '</div>' +
      '<div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(6,8,15,0.7);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
        '<div style="color:rgba(255,255,255,0.4);font-size:14px;margin-top:10px;font-weight:500;">' + label + '</div>' +
        '<div style="color:rgba(255,255,255,0.25);font-size:12px;margin-top:3px;">' + sublabel + '</div>' +
        '<div onclick="showViewPMI(\'piano\')" style="margin-top:14px;padding:8px 22px;border-radius:10px;background:#7B61FF;color:white;font-size:13px;font-weight:500;cursor:pointer;">Sblocca \u2192</div>' +
      '</div>' +
    '</div>';
  }

  // 8-dim cards HTML
  var dimsAlpha = _STD_DIMS_S.slice().sort(function(a, b) { return a.localeCompare(b, 'it'); });
  var dimsHtml = dimsAlpha.map(function(d) {
    var pct = _dimPct(d);
    var col = _dimColDS(pct);
    var statoLabel = pct <= 30 ? 'Critico' : pct <= 50 ? 'In sviluppo' : pct <= 70 ? 'Medio' : 'Solido';
    var statoTxt   = pct <= 30 ? '#F43F5E' : pct <= 50 ? '#FF6B2B' : pct <= 70 ? '#FFB800' : '#34D399';
    var statoBg    = pct <= 30 ? 'rgba(244,63,94,0.12)' : pct <= 50 ? 'rgba(255,107,43,0.12)' : pct <= 70 ? 'rgba(255,184,0,0.12)' : 'rgba(52,211,153,0.12)';
    return '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(123,97,255,0.1);border-radius:16px;padding:14px 16px;margin-bottom:10px">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">' +
        '<div style="display:flex;align-items:center;gap:8px;">' +
          '<div style="font-size:13px;font-weight:600;color:white">' + d + '</div>' +
          '<span style="font-size:9px;font-weight:600;color:' + statoTxt + ';background:' + statoBg + ';padding:2px 7px;border-radius:5px;">' + statoLabel + '</span>' +
        '</div>' +
        '<div style="font-size:18px;font-weight:700;color:' + col + '">' + (dims[d] > 0 ? pct : '—') + '</div>' +
      '</div>' +
      '<div style="height:5px;background:rgba(255,255,255,0.06);border-radius:4px">' +
        '<div style="width:' + pct + '%;height:100%;background:' + col + ';border-radius:4px;transition:width .4s"></div>' +
      '</div>' +
    '</div>';
  }).join('');

  // Benchmark placeholder (for locked section)
  var benchmarkBlurHtml =
    '<div style="font-size:11px;font-weight:600;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;">Benchmark settore</div>' +
    _STD_DIMS_S.slice(0,5).map(function(d) {
      return '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">' +
        '<span style="color:rgba(255,255,255,0.5);font-size:13px;">' + d + '</span>' +
        '<div style="display:flex;align-items:center;gap:8px;">' +
          '<span style="color:rgba(255,255,255,0.5);font-size:12px;">Tu: ' + _dimPct(d) + '</span>' +
          '<span style="color:rgba(255,107,43,0.7);font-size:12px;">Media: 55</span>' +
        '</div>' +
      '</div>';
    }).join('');

  container.innerHTML =
    _DS_CANVAS +
    '<div style="position:relative;z-index:1;max-width:580px;margin:0 auto;padding:40px 28px 60px;">' +

      // Header
      '<h1 style="font-size:28px;font-weight:700;color:white;margin:0 0 4px;">Score commerciale</h1>' +
      '<p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 32px;">Analisi dettagliata del tuo profilo commerciale.</p>' +

      // ── Score ring ──
      '<div style="display:flex;flex-direction:column;align-items:center;margin-bottom:28px;">' +
        '<div style="position:relative;width:180px;height:180px;">' +
          '<svg width="180" height="180" viewBox="0 0 160 160" style="position:absolute;top:10px;left:10px;">' +
            '<circle cx="80" cy="80" r="68" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="8"/>' +
            '<circle cx="80" cy="80" r="68" fill="none" stroke="' + scoreCol + '" stroke-width="8" stroke-linecap="round" ' +
              'stroke-dasharray="' + circumference + '" stroke-dashoffset="' + dashOffset + '" ' +
              'transform="rotate(-90 80 80)" style="transition:stroke-dashoffset .6s ease;"/>' +
          '</svg>' +
          '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">' +
            '<div style="font-size:72px;font-weight:800;color:white;line-height:1;">' + s + '</div>' +
            '<div style="font-size:20px;color:rgba(255,255,255,0.35);margin-top:2px;">su 100</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // ── Stai perdendo ──
      '<div style="background:rgba(255,107,43,0.08);border:1px solid rgba(255,107,43,0.2);border-radius:16px;padding:20px 24px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;">' +
        '<div>' +
          '<div style="font-size:11px;font-weight:600;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Stai perdendo</div>' +
          '<div style="font-size:36px;font-weight:800;color:#FF6B2B;line-height:1;">\u20ac' + stimaPerdita.toLocaleString('it-IT') + '</div>' +
          '<div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:5px;">ogni anno</div>' +
        '</div>' +
        (isFree
          ? '<div onclick="showViewPMI(\'piano\')" style="padding:10px 20px;background:#7B61FF;color:white;border-radius:10px;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;flex-shrink:0;">Sblocca \u2192</div>'
          : '') +
      '</div>' +

      // ── Leva dice ──
      '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(123,97,255,0.1);border-radius:16px;padding:20px;margin-bottom:28px;">' +
        '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">' +
          '<div style="width:7px;height:7px;border-radius:50%;background:#7B61FF;animation:leva-pulse 1.5s infinite;flex-shrink:0;"></div>' +
          '<div style="font-size:13px;font-weight:700;color:#7B61FF;">Leva dice</div>' +
          '<div style="font-size:12px;color:rgba(255,255,255,0.3);">ora</div>' +
        '</div>' +
        '<div style="font-size:14px;color:rgba(255,255,255,0.8);line-height:1.6;">Le tue aree pi\u00f9 critiche sono <strong style="color:white;">' + top3Names + '</strong>. Intervieni su queste per recuperare fatturato.</div>' +
      '</div>' +

      // ── 8 Dimensioni ──
      '<div style="font-size:11px;font-weight:600;color:#7B61FF;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;">Le tue 8 dimensioni</div>' +
      dimsHtml +

      // ── Benchmark (locked for free) ──
      '<div style="margin-top:20px;">' +
        (isFree
          ? _lockedCard(benchmarkBlurHtml, 'Benchmark settore', 'Disponibile con piano Self')
          : '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(123,97,255,0.1);border-radius:16px;padding:20px;">' +
              '<div style="font-size:11px;font-weight:600;color:#7B61FF;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;">Benchmark settore</div>' +
              _STD_DIMS_S.map(function(d) {
                var pct = _dimPct(d);
                var col = _dimColDS(pct);
                return '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">' +
                  '<span style="color:rgba(255,255,255,0.6);font-size:13px;">' + d + '</span>' +
                  '<div style="display:flex;align-items:center;gap:8px;">' +
                    '<span style="font-size:13px;font-weight:600;color:' + col + ';">Tu: ' + pct + '</span>' +
                    '<span style="color:rgba(255,255,255,0.2);font-size:13px;">Media: 55</span>' +
                  '</div>' +
                '</div>';
              }).join('') +
            '</div>') +
      '</div>' +

    '</div>';

  _levaStartWaves('leva-waves-view');
}

// ── FASE 7 — Azioni ───────────────────────────────────────────────────────────
function renderPMIAzioni(container) {
  var p = window._pmiProspect;
  if (!p || !p.dims) { renderPMIHome(container); return; }

  _levaSetDSBg(container);

  var dimsSorted = _PMI_DIMS.slice().sort(function(a, b) {
    return (p.dims[a] || 0) - (p.dims[b] || 0);
  });

  var azioniHtml = dimsSorted.map(function(d) {
    var v    = p.dims[d] || 0;
    var col  = dimColor(v);
    var lbl  = getDimLabel(p.settore, d);
    var desc = (typeof _getStepDesc === 'function') ? _getStepDesc(p.settore, d, v || 1) : '';
    var urgenza = v < 2 ? 'Alta priorità' : v <= 3 ? 'Sviluppabile' : 'Ottimo';
    var urgCol  = v < 2 ? '#F43F5E' : v <= 3 ? '#FBBF24' : '#34D399';
    var urgBg   = v < 2 ? 'rgba(244,63,94,0.12)' : v <= 3 ? 'rgba(251,191,36,0.12)' : 'rgba(52,211,153,0.12)';
    var stepActual = Math.max(1, Math.min(5, Math.round(v || 1)));
    var stepTarget = Math.min(stepActual + 2, 5);
    return '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(123,97,255,0.15);border-radius:14px;padding:14px 16px;margin-bottom:10px">' +
      '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:6px">' +
        '<div style="font-size:13px;font-weight:700;color:white">' + lbl + '</div>' +
        '<div style="display:flex;align-items:center;gap:6px;flex-shrink:0">' +
          '<span style="font-size:10px;font-weight:700;color:' + urgCol + ';background:' + urgBg + ';padding:2px 8px;border-radius:6px;white-space:nowrap">' + urgenza + '</span>' +
          '<span style="font-size:12px;font-weight:700;color:' + col + '">' + (v > 0 ? v + '/5' : '—') + '</span>' +
        '</div>' +
      '</div>' +
      (desc && desc !== '—'
        ? '<div style="font-size:12px;color:rgba(255,255,255,0.5);line-height:1.6;border-top:1px solid rgba(255,255,255,0.06);padding-top:8px;margin-top:6px;margin-bottom:10px">' + desc + '</div>'
        : '<div style="margin-top:8px;margin-bottom:10px;"></div>') +
      '<div style="display:flex;align-items:center;justify-content:space-between;">' +
        '<button id="pmi-mod-btn-' + d + '" onclick="togglePMIModuli(\'' + d + '\')" style="background:rgba(123,97,255,0.1);border:1px solid rgba(123,97,255,0.25);color:#A78BFA;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:600;cursor:pointer;">Vedi moduli →</button>' +
        '<span style="font-size:10px;color:rgba(255,255,255,0.3);">Step attuale: <strong style="color:rgba(255,255,255,0.7)">' + stepActual + '</strong> → Target: <strong style="color:#7B61FF">' + stepTarget + '</strong></span>' +
      '</div>' +
      '<div id="pmi-mod-panel-' + d + '" style="display:none;"></div>' +
    '</div>';
  }).join('');

  container.innerHTML =
    _DS_CANVAS +
    '<div style="position:relative;z-index:1;max-width:580px;margin:0 auto;padding:40px 28px">' +
      '<h1 style="font-size:28px;font-weight:700;color:white;margin-bottom:4px">Il tuo piano d\'azione</h1>' +
      '<p style="font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:28px">Le azioni sono ordinate per priorità, dalla dimensione più critica.</p>' +
      azioniHtml +
    '</div>';

  _levaStartWaves('leva-waves-view');
}

// ── PMI: espandi/collassa moduli per dimensione ───────────────────────────────
function togglePMIModuli(dimId) {
  var panel = document.getElementById('pmi-mod-panel-' + dimId);
  var btn   = document.getElementById('pmi-mod-btn-' + dimId);
  if (!panel) return;
  if (panel.style.display === 'none' || !panel.dataset.rendered) {
    panel.innerHTML = _buildModuliPanelContent(dimId);
    panel.dataset.rendered = '1';
    panel.style.display = 'block';
    if (btn) btn.textContent = 'Nascondi ↑';
  } else {
    panel.style.display = 'none';
    if (btn) btn.textContent = 'Vedi moduli →';
  }
}

function _buildModuliPanelContent(dimId) {
  var p = window._pmiProspect;
  if (!p) return '';
  var v         = (p.dims && p.dims[dimId]) || 0;
  var settore   = p.settore || '';
  var fatturato = p.fatturato || 1000000;

  // Calcolo steps: score = step raggiunto
  var stepCurrent = Math.min(Math.max(Math.floor(v), 1), 5);
  var stepNext    = Math.min(stepCurrent + 1, 5);
  var stepTarget  = Math.min(stepCurrent + 2, 5);

  if (stepCurrent >= 5) {
    return '<div style="border-top:1px solid rgba(255,255,255,0.06);margin-top:14px;padding-top:14px;text-align:center;padding-bottom:8px;">' +
      '<div style="font-size:22px;margin-bottom:8px;">🏆</div>' +
      '<div style="font-size:13px;font-weight:700;color:#34D399;">Eccellenza raggiunta</div>' +
      '<div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:4px;">Questa dimensione è al massimo livello.</div>' +
    '</div>';
  }

  // ─── Track step HTML ────────────────────────────────────────────────────────
  var sLbl = ['','Base','Struttura','Metodo','Eccellenza','Top'];
  function dotState(n) {
    if (n < stepCurrent) return 'done';
    if (n === stepCurrent) return 'current';
    if (n === stepTarget)  return 'target';
    return 'future';
  }
  function dotHtml(n) {
    var st  = dotState(n);
    var bdr = st==='done'?'#34D399':st==='current'?'#FF6B2B':st==='target'?'rgba(123,97,255,0.55)':'rgba(255,255,255,0.12)';
    var bg  = st==='done'?'rgba(52,211,153,0.12)':st==='current'?'rgba(255,107,43,0.12)':st==='target'?'rgba(123,97,255,0.08)':'transparent';
    var col = st==='done'?'#34D399':st==='current'?'#FF6B2B':st==='target'?'#A78BFA':'rgba(255,255,255,0.2)';
    var bs  = st==='target'?'dashed':'solid';
    return '<div style="text-align:center;flex-shrink:0;">' +
      '<div style="width:30px;height:30px;border-radius:50%;border:2px '+bs+' '+bdr+';background:'+bg+';display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:'+col+';margin:0 auto;">' + (st==='done'?'✓':String(n)) + '</div>' +
      '<div style="font-size:7px;margin-top:3px;color:'+col+';">' + (sLbl[n]||'') + '</div>' +
    '</div>';
  }
  function connHtml(n) {
    return '<div style="flex:1;display:flex;align-items:center;padding-bottom:14px;">' +
      '<div style="height:2px;width:100%;background:rgba(255,255,255,0.06);">' +
        (n < stepCurrent ? '<div style="height:2px;width:100%;background:rgba(52,211,153,0.4);border-radius:1px;"></div>' : '') +
      '</div></div>';
  }
  var trackHtml =
    '<div style="font-size:10px;font-weight:700;color:#7B61FF;text-transform:uppercase;letter-spacing:0.7px;margin-bottom:12px;">Track step</div>' +
    '<div style="display:flex;align-items:flex-start;gap:0;margin-bottom:18px;padding:0 4px;">' +
      dotHtml(1)+connHtml(1)+dotHtml(2)+connHtml(2)+dotHtml(3)+connHtml(3)+dotHtml(4)+connHtml(4)+dotHtml(5) +
    '</div>';

  // ─── Moduli ─────────────────────────────────────────────────────────────────
  var moduli = null;

  // 1. Prova settore custom (AI)
  var customSd = window._settoriCustomCache && window._settoriCustomCache[settore];
  if (customSd && customSd.moduli) {
    var aiLabel    = _DIM_TO_AI_LABEL[dimId];
    var transKey   = String(stepCurrent) + '_' + String(stepNext);
    var aiModuli   = aiLabel && customSd.moduli[aiLabel] && customSd.moduli[aiLabel][transKey];
    if (aiModuli && aiModuli.length) {
      // Converti formato AI → formato interno
      moduli = aiModuli.map(function(m, i) {
        return { id: 'ai_' + i, nome: m.titolo || m.nome || '', tipo: 'flag', note: m.descrizione || m.note || '' };
      });
    }
  }

  // 2. Fallback statico
  if (!moduli) {
    var sd = (typeof STEP_DETAIL_BY_SETTORE !== 'undefined') ? STEP_DETAIL_BY_SETTORE : {};
    var nextDetail = (sd[settore] && sd[settore][dimId] && sd[settore][dimId][String(stepNext)]) || null;
    moduli = (nextDetail && nextDetail.moduli && nextDetail.moduli.length)
      ? nextDetail.moduli
      : [
          { id:'mappa',     nome:'Mappatura situazione attuale', tipo:'flag', note:'Analisi di partenza: capire dov\'è il processo oggi e dove si vuole arrivare.' },
          { id:'processo',  nome:'Definizione processo base',    tipo:'flag', note:'Formalizzare i passi chiave e le responsabilità per questa dimensione.' },
          { id:'strumenti', nome:'Implementazione strumenti',    tipo:'flag', note:'Scegliere e configurare gli strumenti minimi necessari per supportare il processo.' },
        ];
  }
  var nextDetail = nextDetail || null;

  var pmiAzioni = p.pmi_azioni || [];
  var tempoMesi = nextDetail ? (nextDetail.tempo_mesi || 1) : 1;
  var totalCostoMensile = 0;
  var dimLblMap = {vendite:'Vendite',pipeline:'Pipeline & CRM',team:'Organizzazione',processi:'Processi',ricavi:'Ricavi',marketing:'Marketing',sitoweb:'Sito Web',ecommerce:'Post-vendita'};
  var dimLabel  = dimLblMap[dimId] || dimId;

  var moduliHtml = moduli.map(function(m) {
    var key    = 'pmi_' + dimId + '_' + stepNext + '_' + m.id;
    var isDone = pmiAzioni.some(function(a) { return a._key === key; });
    var desc   = m.note || (m.varianti && m.varianti.length ? m.varianti[0].note : '') || '';
    var mc     = m.costo_mensile || (m.varianti && m.varianti.length
      ? Math.min.apply(null, m.varianti.map(function(vv){ return vv.costo_mensile || 0; }))
      : 0);
    totalCostoMensile += mc;
    var nomeEsc = m.nome.replace(/'/g, "\\'");
    return '<div id="pmi-mod-row-' + key + '" style="display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">' +
      '<input type="checkbox" id="pmi-chk-' + key + '"' + (isDone?' checked':'') + ' onchange="toggleModuloCompletatoPMI(\'' + key + '\',\'' + dimId + '\',' + stepNext + ',\'' + nomeEsc + '\',\'' + dimLabel + '\',' + moduli.length + ')" style="margin-top:3px;cursor:pointer;accent-color:#7B61FF;width:14px;height:14px;flex-shrink:0;">' +
      '<div style="flex:1;min-width:0;">' +
        '<div style="font-size:12px;font-weight:500;color:rgba(255,255,255,0.85);line-height:1.4;">' + m.nome + '</div>' +
        (desc ? '<div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:2px;line-height:1.4;">' + desc + '</div>' : '') +
      '</div>' +
      '<span class="pmi-mod-badge" style="font-size:9px;font-weight:600;color:' + (isDone?'#34D399':'rgba(255,255,255,0.3)') + ';background:' + (isDone?'rgba(52,211,153,0.1)':'rgba(255,255,255,0.04)') + ';padding:2px 7px;border-radius:4px;white-space:nowrap;flex-shrink:0;">' + (isDone?'Completato':'Da fare') + '</span>' +
    '</div>';
  }).join('');

  // ─── Metriche ────────────────────────────────────────────────────────────────
  var coefficienti = {vendite:0.04,pipeline:0.035,team:0.03,processi:0.03,ricavi:0.045,marketing:0.025,sitoweb:0.02,ecommerce:0.025};
  var coeff          = coefficienti[dimId] || 0.03;
  var gapStep        = Math.max(0.5, Math.min(2, 5 - v));
  var impattoMensile = Math.round(fatturato * gapStep * coeff / 12);
  var tempoFmt       = tempoMesi < 1 ? '2-3 sett.' : tempoMesi === 1 ? '1 mese' : tempoMesi + ' mesi';
  var costoFmt       = totalCostoMensile > 0 ? '€' + totalCostoMensile.toLocaleString('it-IT') + '/mese' : '—';
  var roi            = totalCostoMensile > 0 ? Math.round(impattoMensile * 12 / totalCostoMensile) + 'x/anno' : '—';
  function metricBox(lbl, val) {
    return '<div style="flex:1;text-align:center;padding:10px 6px;background:rgba(123,97,255,0.06);border:1px solid rgba(123,97,255,0.15);border-radius:10px;">' +
      '<div style="font-size:9px;color:#7B61FF;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">' + lbl + '</div>' +
      '<div style="font-size:13px;font-weight:700;color:white;">' + val + '</div>' +
    '</div>';
  }

  var doneCnt = pmiAzioni.filter(function(a) { return a._key && a._key.startsWith('pmi_' + dimId + '_' + stepNext + '_'); }).length;

  return '<div style="border-top:1px solid rgba(255,255,255,0.06);margin-top:14px;padding-top:14px;">' +
    trackHtml +
    '<div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85);margin-bottom:2px;">Per passare da step ' + stepCurrent + ' a step ' + stepNext + '</div>' +
    '<div id="pmi-mod-count-' + dimId + '" style="font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:12px;">' + doneCnt + '/' + moduli.length + ' moduli completati</div>' +
    moduliHtml +
    '<div style="display:flex;gap:8px;margin-top:16px;">' +
      metricBox('Impatto/mese', '+€' + impattoMensile.toLocaleString('it-IT')) +
      metricBox('Costo/mese', costoFmt) +
      metricBox('Tempo', tempoFmt) +
      metricBox('ROI annuo', roi) +
    '</div>' +
  '</div>';
}

async function toggleModuloCompletatoPMI(key, dimId, stepNum, moduloNome, dimLabel, totalModuli) {
  var p = window._pmiProspect;
  if (!p) return;

  var lista     = (p.pmi_azioni || []).slice();
  var idx       = lista.findIndex(function(a) { return a._key === key; });
  var completed = idx === -1; // se non c'è → lo stiamo completando

  if (completed) {
    lista.push({ _key: key, dimensione: dimLabel, step: stepNum, modulo: moduloNome, completato_il: new Date().toISOString() });
  } else {
    lista.splice(idx, 1);
  }
  p.pmi_azioni = lista;

  // Salva su Supabase (fire and forget)
  if (typeof sb !== 'undefined' && p.id) {
    sb.from('prospects').update({ pmi_azioni: lista }).eq('id', p.id);
  }

  // Aggiorna badge
  var row = document.getElementById('pmi-mod-row-' + key);
  if (row) {
    var badge = row.querySelector('.pmi-mod-badge');
    if (badge) {
      badge.textContent      = completed ? 'Completato' : 'Da fare';
      badge.style.color      = completed ? '#34D399' : 'rgba(255,255,255,0.3)';
      badge.style.background = completed ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.04)';
    }
  }

  // Aggiorna contatore
  var prefix   = 'pmi_' + dimId + '_' + stepNum + '_';
  var doneCnt  = lista.filter(function(a) { return a._key && a._key.startsWith(prefix); }).length;
  var counter  = document.getElementById('pmi-mod-count-' + dimId);
  if (counter) counter.textContent = doneCnt + '/' + totalModuli + ' moduli completati';

  // Toast se tutti completati
  if (completed && doneCnt >= totalModuli) {
    showToast('Complimenti! Hai completato lo step ' + stepNum + ' per ' + dimLabel + '. Alla prossima ri-diagnosi vedremo l\'impatto.');
  }
}

// ── FASE 8 — Trend ────────────────────────────────────────────────────────────
function renderPMITrend(container) {
  var p = window._pmiProspect;
  if (!p) { renderPMIHome(container); return; }

  var scoreNow = calcScore(p);
  var oggi     = new Date();

  // Costruisci punti da score_history + score attuale
  var rawHistory = (p.score_history || []).slice();
  var points = rawHistory.map(function(h) {
    return { data: h.data, score: h.score || h.score_base || 0 };
  });

  // Aggiungi score attuale se diverso dall'ultimo
  var lastSc = points.length ? points[points.length - 1].score : null;
  if (lastSc !== scoreNow) {
    points.push({ data: oggi.toISOString(), score: scoreNow });
  }

  // Deduplicazione per giorno (tieni il primo di ogni giorno)
  var seenDays = {};
  points = points.filter(function(pt) {
    var day = (pt.data || '').slice(0, 10);
    if (seenDays[day]) return false;
    seenDays[day] = true;
    return true;
  });

  // Ordine cronologico
  points.sort(function(a, b) { return a.data < b.data ? -1 : 1; });

  // Conteggio azioni completate (CSO dict + PMI array)
  var azioniDict  = p.azioni_completate || {};
  var azioniCount = Object.keys(azioniDict).filter(function(k) { return azioniDict[k]; }).length;
  var pmiCount    = (p.pmi_azioni || []).length;
  var totalAzioni = azioniCount + pmiCount;

  // Calcola giorni da prima diagnosi → giorni rimanenti alla ri-diagnosi
  var dataInizio       = points.length ? new Date(points[0].data) : oggi;
  var giorniDaDiagnosi = Math.floor((oggi - dataInizio) / (1000 * 60 * 60 * 24));
  var giorniRimanenti  = Math.max(0, 90 - giorniDaDiagnosi);

  _levaSetDSBg(container);

  if (!points.length) {
    container.innerHTML =
      _DS_CANVAS +
      '<div style="position:relative;z-index:1;max-width:580px;margin:0 auto;padding:40px 28px">' +
        '<h1 style="font-size:28px;font-weight:700;color:white;margin-bottom:4px">Il tuo andamento</h1>' +
        '<p style="font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:28px">L\'evoluzione del tuo score nel tempo.</p>' +
        '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(123,97,255,0.15);border-radius:16px;padding:36px 28px;text-align:center">' +
          '<div style="font-size:32px;margin-bottom:12px">📊</div>' +
          '<div style="font-size:14px;font-weight:600;color:white;margin-bottom:6px">Nessun dato disponibile</div>' +
          '<div style="font-size:13px;color:rgba(255,255,255,0.4);line-height:1.6">Completa la diagnosi per iniziare a tracciare i tuoi progressi.</div>' +
        '</div>' +
      '</div>';
    _levaStartWaves('leva-waves-view');
    return;
  }

  var isSinglePoint = points.length === 1;
  var scores  = points.map(function(pt) { return pt.score; });
  var labels  = points.map(function(pt) {
    var d = new Date(pt.data);
    return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
  });

  // ── CARD PROGRESSI ─────────────────────────────────────────────────────────
  var progressiHtml;
  if (!isSinglePoint) {
    var scoreOld  = scores[0];
    var scoreNew  = scores[scores.length - 1];
    var delta     = scoreNew - scoreOld;
    var deltaStr  = (delta >= 0 ? '+' : '') + delta;
    var deltaCol  = delta > 0 ? '#34D399' : delta < 0 ? '#F43F5E' : 'rgba(255,255,255,0.4)';
    var mesiRaw   = (oggi - dataInizio) / (1000 * 60 * 60 * 24 * 30);
    var mesiStr   = mesiRaw < 1 ? 'Meno di 1 mese' : Math.round(mesiRaw) + (Math.round(mesiRaw) === 1 ? ' mese' : ' mesi');
    progressiHtml =
      '<div style="font-size:13px;color:rgba(255,255,255,0.6);line-height:1.7">' +
        mesiStr + ' fa eri a <strong style="color:white">' + scoreOld + '/100</strong>. ' +
        'Oggi sei a <strong style="color:white">' + scoreNew + '/100</strong>. ' +
        '<strong style="color:' + deltaCol + '">' + deltaStr + ' punti</strong> ' +
        'grazie a <strong style="color:white">' + totalAzioni + '</strong> ' + (totalAzioni === 1 ? 'azione completata.' : 'azioni completate.') +
      '</div>';
  } else {
    progressiHtml =
      '<div style="font-size:13px;color:rgba(255,255,255,0.6);line-height:1.7">' +
        'Il tuo score attuale è <strong style="color:white">' + scoreNow + '/100</strong>. ' +
        'Tra <strong style="color:white">' + giorniRimanenti + '</strong> ' + (giorniRimanenti === 1 ? 'giorno' : 'giorni') +
        ' potrai vedere i tuoi progressi con la ri-diagnosi.' +
      '</div>';
  }

  // ── MESSAGGIO SOTTO GRAFICO (solo per punto singolo) ──────────────────────
  var singleMsgHtml = isSinglePoint
    ? '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(123,97,255,0.15);border-radius:14px;padding:14px 16px;margin-bottom:16px;display:flex;align-items:center;gap:12px">' +
        '<div style="font-size:22px;flex-shrink:0">📅</div>' +
        '<div style="font-size:13px;color:rgba(255,255,255,0.5);line-height:1.6">' +
          'Completa la ri-diagnosi tra <strong style="color:white">' + giorniRimanenti + '</strong> ' +
          (giorniRimanenti === 1 ? 'giorno' : 'giorni') + ' per vedere il tuo trend.' +
        '</div>' +
      '</div>'
    : '';

  var canvasId = 'pmi-trend-chart';

  // ── Stat cards ────────────────────────────────────────────────────────────
  function _statCard(label, value, valueColor) {
    return '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(123,97,255,0.1);border-radius:16px;padding:16px 18px;">' +
      '<div style="font-size:11px;font-weight:600;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">' + label + '</div>' +
      '<div style="font-size:24px;font-weight:700;color:' + (valueColor || 'white') + ';">' + value + '</div>' +
    '</div>';
  }

  var scoreNowCol = scoreNow >= 70 ? '#34D399' : scoreNow >= 45 ? '#FBBF24' : '#F43F5E';
  var statCardsHtml;
  if (!isSinglePoint) {
    var scoreOld2 = scores[0];
    var scoreNew2 = scores[scores.length - 1];
    var delta2    = scoreNew2 - scoreOld2;
    var deltaStr2 = (delta2 >= 0 ? '+' : '') + delta2;
    var deltaCol2 = delta2 > 0 ? '#34D399' : delta2 < 0 ? '#F43F5E' : 'rgba(255,255,255,0.4)';
    statCardsHtml =
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">' +
        _statCard('Score attuale', scoreNow + '/100', scoreNowCol) +
        _statCard('Variazione', deltaStr2 + ' pt', deltaCol2) +
        _statCard('Azioni completate', totalAzioni, '#7B61FF') +
        _statCard('Giorni alla ri-diagnosi', giorniRimanenti + 'g', 'rgba(255,255,255,0.6)') +
      '</div>';
  } else {
    statCardsHtml =
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">' +
        _statCard('Score attuale', scoreNow + '/100', scoreNowCol) +
        _statCard('Azioni completate', totalAzioni, '#7B61FF') +
        _statCard('Giorni alla ri-diagnosi', giorniRimanenti + 'g', 'rgba(255,255,255,0.6)') +
        _statCard('Storico', '1 punto', 'rgba(255,255,255,0.4)') +
      '</div>';
  }

  container.innerHTML =
    _DS_CANVAS +
    '<div style="position:relative;z-index:1;max-width:580px;margin:0 auto;padding:40px 28px 60px;">' +
      '<h1 style="font-size:28px;font-weight:700;color:white;margin:0 0 4px;">Il tuo andamento</h1>' +
      '<p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 24px;">L\'evoluzione del tuo score nel tempo.</p>' +

      statCardsHtml +

      '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(123,97,255,0.1);border-radius:16px;padding:20px 20px 16px;margin-bottom:16px;">' +
        '<div style="position:relative;height:200px;">' +
          '<canvas id="' + canvasId + '"></canvas>' +
        '</div>' +
      '</div>' +

      singleMsgHtml +

      '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(123,97,255,0.1);border-radius:16px;padding:16px 18px;">' +
        progressiHtml +
      '</div>' +
    '</div>';

  // Inizializza Chart.js dopo inserimento DOM
  setTimeout(function() {
    var ctx = document.getElementById(canvasId);
    if (!ctx || typeof Chart === 'undefined') return;

    // Distruggi istanza precedente se esiste
    var existing = Chart.getChart(canvasId);
    if (existing) existing.destroy();

    // Gradient fill
    var chartCtx = ctx.getContext('2d');
    var gradient = chartCtx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0,   'rgba(123,97,255,0.15)');
    gradient.addColorStop(1,   'rgba(123,97,255,0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: scores,
          borderColor: '#7B61FF',
          borderWidth: 2,
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#7B61FF',
          pointBorderColor: '#7B61FF',
          pointBorderWidth: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#7B61FF',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(6,8,15,0.9)',
            borderColor: 'rgba(123,97,255,0.3)',
            borderWidth: 1,
            titleColor: 'white',
            bodyColor: 'rgba(255,255,255,0.55)',
            padding: 10,
            callbacks: {
              label: function(ctx) { return ' Score: ' + ctx.raw + '/100'; }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 },
            border: { display: false },
            ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 11 } }
          },
          y: {
            min: 0,
            max: 100,
            grid: { color: 'rgba(255,255,255,0.04)', lineWidth: 0.5 },
            border: { display: false },
            ticks: { color: 'rgba(255,255,255,0.35)', font: { size: 11 }, stepSize: 25 }
          }
        }
      }
    });
    _levaStartWaves('leva-waves-view');
  }, 50);
}

// ── FASE 9 — Profilo ──────────────────────────────────────────────────────────
function renderPMIProfilo(container) {
  var p   = window._pmiProspect;
  var up  = window._userProfileData || {};
  var pro = window._currentProfile  || {};

  // Tema Deep Space
  document.body.style.background = '#06080F';
  container.style.background = 'transparent';
  container.style.overflowY  = 'auto';

  var nomeAzienda = up.company_name || (p ? (p.nome_azienda || p.nome) : '') || '';

  var _settoreRaw = (p ? p.settore : '') || up.sector || _pmiSelectedSettore || '';
  var settoreVal  = (function(raw) {
    if (!raw) return '';
    if (PMI_MACRO_SETTORI.find(function(m){ return m.id === raw; })) return raw;
    for (var macroId in PMI_MICRO_SETTORI) {
      if ((PMI_MICRO_SETTORI[macroId] || []).find(function(m){ return m.id === raw; })) return macroId;
    }
    return raw;
  })(_settoreRaw);

  var fasciaVal  = up.fascia_fatturato || _pmiSelectedFascia || '';
  var cittaVal   = up.citta || (p ? p.citta : '') || '';
  var nomeVal    = pro.nome    || (up.full_name || '').split(' ')[0]              || '';
  var cognomeVal = pro.cognome || (up.full_name || '').split(' ').slice(1).join(' ') || '';
  var emailVal   = pro.email || window._currentUserEmail || '';
  var microVal   = _settoreRaw !== settoreVal ? _settoreRaw : (up.microsector || '');

  // ── Deep Space styles ────────────────────────────────────────────────────
  var INP     = 'width:100%;box-sizing:border-box;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:white;border-radius:10px;padding:12px 16px;font-size:15px;outline:none;font-family:inherit;transition:border-color 0.15s;';
  var INP_DIS = 'width:100%;box-sizing:border-box;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);color:rgba(255,255,255,0.4);border-radius:10px;padding:12px 16px;font-size:15px;outline:none;cursor:not-allowed;font-family:inherit;opacity:0.4;';
  var LABEL   = 'font-size:11px;font-weight:600;color:#7B61FF;margin-bottom:6px;display:block;text-transform:uppercase;letter-spacing:1px;';
  var CARD    = 'background:rgba(255,255,255,0.04);border:1px solid rgba(123,97,255,0.15);border-radius:16px;padding:24px;margin-bottom:16px;';
  var SECT    = 'font-size:11px;font-weight:600;color:#7B61FF;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:16px;';

  var _OPT = ' style="background:#0a0c14;color:rgba(255,255,255,0.7);"';
  var settoreOpts = '<option value=""' + _OPT + '>— Settore —</option>' +
    PMI_MACRO_SETTORI.map(function(s) {
      return '<option value="' + s.id + '"' + (settoreVal === s.id ? ' selected' : '') + _OPT + '>' + s.icon + ' ' + s.label + '</option>';
    }).join('');

  var microOpts  = _buildMicroOpts(settoreVal, microVal);
  var fasciaOpts = '<option value=""' + _OPT + '>— Fascia —</option>' +
    PMI_FASCE_FATTURATO.map(function(f) {
      return '<option value="' + f.id + '"' + (fasciaVal === f.id ? ' selected' : '') + _OPT + '>' + f.label + '</option>';
    }).join('');

  container.innerHTML =
    _DS_CANVAS +
    '<div style="position:relative;z-index:1;max-width:560px;margin:0 auto;padding:32px 28px;">' +
      '<h1 style="font-size:28px;font-weight:700;color:white;margin-bottom:28px;">Il tuo profilo</h1>' +

      // ── Card identità (editabile) ───────────────────────────────────────
      '<div style="' + CARD + '">' +
        '<div style="' + SECT + '">La tua identità</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">' +
          '<div><label style="' + LABEL + '">Nome</label>' +
            '<input id="prf-nome" style="' + INP + '" value="' + _esc(nomeVal) + '" placeholder="Mario"></div>' +
          '<div><label style="' + LABEL + '">Cognome</label>' +
            '<input id="prf-cognome" style="' + INP + '" value="' + _esc(cognomeVal) + '" placeholder="Rossi"></div>' +
        '</div>' +
        '<div style="margin-bottom:14px;"><label style="' + LABEL + '">Nome azienda</label>' +
          '<input id="prf-nome-azienda" style="' + INP + '" value="' + _esc(nomeAzienda) + '" placeholder="Es. Rossi Srl"></div>' +
        '<div><label style="' + LABEL + '">Email</label>' +
          '<input style="' + INP_DIS + '" value="' + _esc(emailVal) + '" readonly disabled></div>' +
      '</div>' +

      // ── Card dati diagnosi (sola lettura) ───────────────────────────────
      '<div style="' + CARD + '">' +
        '<div style="' + SECT + '">Dati dalla diagnosi</div>' +
        '<div style="font-size:12px;color:rgba(255,255,255,0.25);background:rgba(255,255,255,0.02);border:0.5px solid rgba(255,255,255,0.05);border-radius:8px;padding:8px 12px;margin-bottom:16px;">Compilati automaticamente. Per modificarli rifai la diagnosi.</div>' +
        '<div style="margin-bottom:14px;"><label style="' + LABEL + '">Settore</label>' +
          '<select id="prf-settore" style="' + INP_DIS + '" disabled>' + settoreOpts + '</select></div>' +
        (settoreVal ?
          '<div style="margin-bottom:14px;" id="prf-micro-wrap"><label style="' + LABEL + '">Micro-settore</label>' +
            '<select id="prf-micro" style="' + INP_DIS + '" disabled>' + microOpts + '</select></div>'
        : '') +
        '<div style="margin-bottom:14px;"><label style="' + LABEL + '">Fascia fatturato</label>' +
          '<select id="prf-fascia" style="' + INP_DIS + '" disabled>' + fasciaOpts + '</select></div>' +
        '<div><label style="' + LABEL + '">Città</label>' +
          '<input style="' + INP_DIS + '" value="' + _esc(cittaVal) + '" disabled></div>' +
      '</div>' +

      // ── Bottone salva ───────────────────────────────────────────────────
      '<button id="prf-salva-btn" onclick="salvaProfiloPMI()" style="width:100%;padding:12px 24px;background:#7B61FF;color:white;border:none;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;margin-bottom:16px;">Salva profilo</button>' +

      // ── Azioni rapide ───────────────────────────────────────────────────
      '<div style="display:flex;gap:10px;margin-bottom:14px;">' +
        '<button onclick="renderPrimoAccesso()" style="flex:1;padding:12px 18px;background:rgba(255,255,255,0.04);border:0.5px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;">Rifai la diagnosi</button>' +
        '<button onclick="prenotaCallSingola()" style="flex:1;padding:12px 18px;background:rgba(123,97,255,0.12);border:0.5px solid rgba(123,97,255,0.25);color:#A78BFA;border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;">Prenota una call — \u20ac120</button>' +
      '</div>' +

      // ── Logout ───────────────────────────────────────────────────────────
      '<button onclick="logout()" style="width:100%;padding:12px 16px;background:rgba(244,63,94,0.06);border:0.5px solid rgba(244,63,94,0.2);color:#F43F5E;border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;">Esci</button>' +
    '</div>';

  // Focus accent on editable inputs
  ['prf-nome','prf-cognome','prf-nome-azienda'].forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('focus', function() { el.style.borderColor = '#7B61FF'; });
    el.addEventListener('blur',  function() { el.style.borderColor = 'rgba(255,255,255,0.1)'; });
  });

  _levaStartWaves('leva-waves-view');
}

async function salvaProfiloPMI() {
  var nome   = (document.getElementById('prf-nome')         || {}).value || '';
  var cognome = (document.getElementById('prf-cognome')      || {}).value || '';
  var nomeAz  = (document.getElementById('prf-nome-azienda') || {}).value || '';
  var fullName = [nome, cognome].filter(Boolean).join(' ');

  var btn = document.getElementById('prf-salva-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Salvataggio...'; }

  try {
    if (typeof sb !== 'undefined' && window._currentUserId) {
      await sb.from('user_profiles').upsert({
        user_id:      window._currentUserId,
        full_name:    fullName,
        company_name: nomeAz
      }, { onConflict: 'user_id' });

      window._userProfileData = Object.assign({}, window._userProfileData, {
        full_name:    fullName,
        company_name: nomeAz
      });
      if (window._currentProfile) {
        window._currentProfile.nome    = nome;
        window._currentProfile.cognome = cognome;
      }
    }
    showToast('Profilo salvato', 'success');
  } catch(e) {
    showToast('Errore nel salvataggio', 'error');
    console.error(e);
  }

  if (btn) { btn.disabled = false; btn.textContent = 'Salva profilo'; }
}

// ── Il tuo piano ─────────────────────────────────────────────────────────────

function renderPMIPiano(container) {
  var p = window._pmiProspect || {};
  var pianoCorrente = p.piano || 'free';

  _levaSetDSBg(container);

  var CHECK = '<span style="font-size:16px;color:#00C853;line-height:1;font-weight:700;">✓</span>';
  var DASH  = '<span style="font-size:14px;color:rgba(255,255,255,0.15);line-height:1;">—</span>';

  // [label, free, self, guided_base, guided_pro]
  var features = [
    ['Diagnosi 8 dimensioni',      CHECK, CHECK, CHECK, CHECK],
    ['Score e semafori',            CHECK, CHECK, CHECK, CHECK],
    ['3 aree critiche',             CHECK, CHECK, CHECK, CHECK],
    ['1 azione AI / settimana',     DASH,  CHECK, CHECK, CHECK],
    ['Ri-diagnosi trimestrale',     DASH,  CHECK, CHECK, CHECK],
    ['Benchmark di settore base',   DASH,  CHECK, CHECK, CHECK],
    ['Controfattuale trimestrale',  DASH,  CHECK, CHECK, CHECK],
    ['1 call CSO al mese',          DASH,  DASH,  CHECK, CHECK],
    ['Piano azioni con CSO',        DASH,  DASH,  CHECK, CHECK],
    ['Report PDF mensile',          DASH,  DASH,  DASH,  CHECK],
    ['Simulazioni what-if',         DASH,  DASH,  DASH,  CHECK],
    ['Benchmark peer dettagliato',  DASH,  DASH,  DASH,  CHECK],
    ['Call CSO illimitate',         DASH,  DASH,  DASH,  CHECK],
  ];

  var planOrder = {free: 0, self: 1, guided_base: 2, guided_pro: 3};

  function mkBtn(planId, upgradeLbl, bg, textColor) {
    var isCurrent = pianoCorrente === planId;
    // Current plan: show label text instead of button
    if (isCurrent) {
      return '<div style="color:#7B61FF;font-weight:700;font-size:14px;text-align:center;padding:9px 0;">Il tuo piano</div>';
    }
    // No downgrade buttons
    if (planOrder[planId] < planOrder[pianoCorrente]) {
      return '';
    }
    return '<button onclick="aggiornaPiano(\'' + planId + '\')" style="width:80%;padding:9px 0;background:' + bg + ';color:' + textColor + ';border:none;border-radius:10px;font-size:12px;font-weight:600;cursor:pointer;transition:opacity .15s;" onmouseover="this.style.opacity=\'0.85\'" onmouseout="this.style.opacity=\'1\'">' + upgradeLbl + '</button>';
  }

  // Floating badge (chip sopra la card) — per "Il tuo piano" e "Consigliato"
  function floatingBadge(text, bg, textColor) {
    return '<span style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:' + bg + ';color:' + textColor + ';font-size:11px;font-weight:700;padding:4px 12px;border-radius:8px;white-space:nowrap;letter-spacing:.3px;z-index:10;">' + text + '</span>';
  }

  function headerBadge(planId) {
    if (pianoCorrente === planId) {
      var bg = planId === 'guided_pro' ? '#FF6B2B' : '#7B61FF';
      return floatingBadge('IL TUO PIANO', bg, 'white');
    }
    // "Consigliato" solo se l'utente non ha già quel piano o superiore
    if (planId === 'guided_base' && planOrder[pianoCorrente] < planOrder['guided_base']) {
      return floatingBadge('Consigliato', '#FF6B2B', 'white');
    }
    return '';
  }

  // ── Headers (padding-top:22px per dare spazio al badge floating) ──────────
  var headerFree =
    '<div style="position:relative;min-height:90px;background:rgba(255,255,255,0.04);border-radius:14px 14px 0 0;border-top:3px solid rgba(255,255,255,0.12);padding:22px 14px 14px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;">' +
      headerBadge('free') +
      '<div style="font-size:17px;font-weight:600;color:white;">Free</div>' +
      '<div style="font-size:13px;color:rgba(255,255,255,0.4);margin-top:3px;">€0</div>' +
    '</div>';

  var headerSelf =
    '<div style="position:relative;min-height:90px;background:rgba(255,255,255,0.04);border-radius:14px 14px 0 0;border-top:3px solid rgba(123,97,255,0.5);padding:22px 14px 14px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;">' +
      headerBadge('self') +
      '<div style="font-size:17px;font-weight:600;color:white;">Self</div>' +
      '<div style="font-size:13px;color:rgba(255,255,255,0.4);margin-top:3px;">€199/mese</div>' +
    '</div>';

  var headerBase =
    '<div style="position:relative;min-height:90px;background:rgba(123,97,255,0.08);border-radius:14px 14px 0 0;border-top:3px solid #7B61FF;padding:22px 14px 14px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;">' +
      headerBadge('guided_base') +
      '<div style="font-size:17px;font-weight:600;color:#A78BFA;">Guided Base</div>' +
      '<div style="font-size:13px;color:rgba(167,139,250,0.6);margin-top:3px;">€399/mese</div>' +
    '</div>';

  var headerPro =
    '<div style="position:relative;min-height:90px;background:rgba(255,107,43,0.08);border-radius:14px 14px 0 0;border-top:3px solid #FF6B2B;padding:22px 14px 14px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;">' +
      headerBadge('guided_pro') +
      '<div style="font-size:17px;font-weight:600;color:#FF6B2B;">Guided Pro</div>' +
      '<div style="font-size:13px;color:rgba(255,107,43,0.5);margin-top:3px;">€599/mese</div>' +
    '</div>';

  // ── Table rows ────────────────────────────────────────────────────────────
  var rowsHtml = features.map(function(row, i) {
    var alt = i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent';
    return '<tr style="background:' + alt + ';">' +
      '<td style="padding:9px 10px 9px 14px;font-size:12px;color:rgba(255,255,255,0.7);line-height:1.35;">' + row[0] + '</td>' +
      '<td style="text-align:center;padding:9px 4px;">' + row[1] + '</td>' +
      '<td style="text-align:center;padding:9px 4px;">' + row[2] + '</td>' +
      '<td style="text-align:center;padding:9px 4px;">' + row[3] + '</td>' +
      '<td style="text-align:center;padding:9px 4px;">' + row[4] + '</td>' +
    '</tr>';
  }).join('');

  var btnRowHtml =
    '<tr>' +
      '<td style="padding:14px 10px 18px 14px;"></td>' +
      '<td style="text-align:center;padding:14px 4px 18px;">' + mkBtn('free', '', '', '') + '</td>' +
      '<td style="text-align:center;padding:14px 4px 18px;">' + mkBtn('self', 'Attiva Self', '#7B61FF', 'white') + '</td>' +
      '<td style="text-align:center;padding:14px 4px 18px;">' + mkBtn('guided_base', 'Attiva Base', '#7B61FF', 'white') + '</td>' +
      '<td style="text-align:center;padding:14px 4px 18px;">' + mkBtn('guided_pro', 'Attiva Pro', '#FF6B2B', 'white') + '</td>' +
    '</tr>';

  // label 28%, 4 piani 18% cad.
  var tableHtml =
    '<table style="width:100%;border-collapse:collapse;">' +
      '<colgroup><col style="width:28%"><col style="width:18%"><col style="width:18%"><col style="width:18%"><col style="width:18%"></colgroup>' +
      '<tbody>' + rowsHtml + btnRowHtml + '</tbody>' +
    '</table>';

  container.innerHTML =
    _DS_CANVAS +
    '<div style="position:relative;z-index:1;max-width:900px;margin:0 auto;padding:40px 20px 60px;">' +
      '<h1 style="font-size:28px;font-weight:700;color:white;margin:0 0 6px;">Il tuo piano</h1>' +
      '<p style="font-size:13px;color:rgba(255,255,255,0.4);margin:0 0 28px;">Scegli il livello di supporto per la tua azienda.</p>' +

      '<div style="overflow-x:auto;overflow-y:visible;">' +
        // Header row — overflow:visible su tutto per badge floating
        '<div style="display:grid;grid-template-columns:28% 18% 18% 18% 18%;min-width:620px;margin-bottom:0;overflow:visible;padding-top:16px;">' +
          '<div></div>' +
          '<div style="padding:0 3px 0 0;overflow:visible;position:relative;">' + headerFree + '</div>' +
          '<div style="padding:0 3px;overflow:visible;position:relative;">' + headerSelf + '</div>' +
          '<div style="padding:0 3px;overflow:visible;position:relative;">' + headerBase + '</div>' +
          '<div style="padding:0 0 0 3px;overflow:visible;position:relative;">' + headerPro + '</div>' +
        '</div>' +
        '<div style="min-width:620px;background:rgba(255,255,255,0.03);border:1px solid rgba(123,97,255,0.12);border-top:none;border-radius:0 0 14px 14px;overflow:hidden;">' +
          tableHtml +
        '</div>' +
      '</div>' +

      '<p style="font-size:11px;color:rgba(255,255,255,0.2);text-align:center;margin-top:10px;">Ogni piano include il precedente. Puoi cambiare in qualsiasi momento.</p>' +

      '<div style="text-align:center;margin-top:20px;">' +
        '<span onclick="prenotaCallSingola()" style="font-size:14px;color:#FF6B2B;cursor:pointer;" ' +
          'onmouseover="this.style.textDecoration=\'underline\'" onmouseout="this.style.textDecoration=\'none\'">' +
          'Oppure prenota una call singola — €120' +
        '</span>' +
      '</div>' +
    '</div>';

  _levaStartWaves('leva-waves-view');
}

async function aggiornaPiano(nuovoPiano) {
  var p = window._pmiProspect;
  if (!p || !p.id) { showToast('Errore: nessun prospect selezionato', 'error'); return; }

  var nomiPiano = { free: 'Free', self: 'Self', guided_base: 'Guided Base', guided_pro: 'Guided Pro' };

  var result;
  try {
    result = await sb.from('prospects').update({ piano: nuovoPiano }).eq('id', p.id).select();
  } catch(e) {
    showToast('Errore di rete: ' + e.message, 'error');
    return;
  }

  if (result && result.error) {
    var errMsg = result.error.message || '';
    console.error('[aggiornaPiano] Supabase error:', result.error);
    if (errMsg.toLowerCase().indexOf('column') !== -1 || errMsg.toLowerCase().indexOf('piano') !== -1) {
      showToast('Errore: aggiorna la tabella prospects su Supabase aggiungendo la colonna piano (varchar, default free)', 'error');
    } else {
      showToast('Errore aggiornamento piano: ' + errMsg, 'error');
    }
    return;
  }

  // Successo — aggiorna stato locale
  window._pmiProspect = Object.assign({}, p, { piano: nuovoPiano });
  window._userPlan = nuovoPiano;
  var idx = prospects.findIndex(function(x){ return x.id === p.id; });
  if (idx >= 0) prospects[idx] = window._pmiProspect;

  console.log('[aggiornaPiano] Piano salvato su Supabase:', nuovoPiano, '| prospect id:', p.id);
  showToast('Piano aggiornato a ' + (nomiPiano[nuovoPiano] || nuovoPiano) + '!', 'success');

  // Re-render pagina piani con il nuovo stato
  renderViewPMI('piano');
}

function prenotaCallSingola() {
  var pro = window._currentProfile  || {};
  var up  = window._userProfileData || {};

  var nomeCompleto = ((pro.nome || '') + ' ' + (pro.cognome || '')).trim();
  var emailVal     = pro.email || window._currentUserEmail || '';
  var telefonoVal  = pro.telefono || up.telefono || '';

  var old = document.getElementById('_leva_call_modal');
  if (old && old.parentNode) old.parentNode.removeChild(old);

  var INP    = 'width:100%;box-sizing:border-box;background:rgba(255,255,255,0.06);border:1px solid rgba(123,97,255,0.2);color:white;border-radius:10px;padding:10px 12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;outline:none;margin-bottom:14px;';
  var INP_RO = 'width:100%;box-sizing:border-box;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.35);border-radius:10px;padding:10px 12px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:13px;outline:none;margin-bottom:14px;';
  var LABEL  = 'font-size:11px;font-weight:600;color:rgba(255,255,255,0.4);margin-bottom:5px;display:block;letter-spacing:0.04em;text-transform:uppercase;';

  var overlay = document.createElement('div');
  overlay.id = '_leva_call_modal';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(6,8,15,0.8);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);z-index:9999;display:flex;align-items:center;justify-content:center;';
  overlay.onclick = function(e) { if (e.target === overlay) overlay.parentNode.removeChild(overlay); };

  overlay.innerHTML =
    '<div style="background:#0a0c14;border:1px solid rgba(123,97,255,0.15);border-radius:20px;max-width:420px;width:90%;padding:28px;position:relative;">' +
      '<button onclick="document.getElementById(\'_leva_call_modal\').remove()" style="position:absolute;top:16px;right:16px;background:none;border:none;font-size:18px;cursor:pointer;color:rgba(255,255,255,0.3);line-height:1;" onmouseover="this.style.color=\'white\'" onmouseout="this.style.color=\'rgba(255,255,255,0.3)\'">✕</button>' +
      '<h2 style="font-size:17px;font-weight:700;color:white;margin:0 24px 6px 0;">Prenota una call con un esperto</h2>' +
      '<p style="font-size:12px;color:rgba(255,255,255,0.4);margin-bottom:22px;line-height:1.5;">Un consulente commerciale ti contatterà per fissare la sessione.</p>' +
      '<label style="' + LABEL + '">Nome</label>' +
      '<input style="' + INP_RO + '" value="' + _esc(nomeCompleto) + '" readonly>' +
      '<label style="' + LABEL + '">Email</label>' +
      '<input style="' + INP_RO + '" value="' + _esc(emailVal) + '" readonly>' +
      '<label style="' + LABEL + '">Telefono</label>' +
      '<input id="_leva_call_tel" style="' + INP + '" value="' + _esc(telefonoVal) + '" placeholder="+39 333 1234567" type="tel" ' +
        'onfocus="this.style.borderColor=\'#7B61FF\';this.style.boxShadow=\'0 0 0 3px rgba(123,97,255,0.12)\'" ' +
        'onblur="this.style.borderColor=\'rgba(123,97,255,0.2)\';this.style.boxShadow=\'none\'">' +
      '<label style="' + LABEL + '">Preferenza oraria</label>' +
      '<select id="_leva_call_orario" style="' + INP + 'appearance:none;-webkit-appearance:none;">' +
        '<option value="mattina" style="background:#0a0c14;">Mattina (9-12)</option>' +
        '<option value="pomeriggio" style="background:#0a0c14;">Pomeriggio (14-17)</option>' +
        '<option value="sera" style="background:#0a0c14;">Sera (17-19)</option>' +
      '</select>' +
      '<button onclick="inviaRichiestaCall()" style="width:100%;padding:12px;background:#7B61FF;color:white;border:none;border-radius:10px;font-family:\'Plus Jakarta Sans\',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:opacity .15s;" onmouseover="this.style.opacity=\'0.88\'" onmouseout="this.style.opacity=\'1\'">Invia richiesta</button>' +
    '</div>';

  document.body.appendChild(overlay);
}

async function inviaRichiestaCall() {
  var pro = window._currentProfile  || {};
  var p   = window._pmiProspect     || {};

  var nomeCompleto = ((pro.nome || '') + ' ' + (pro.cognome || '')).trim();
  var emailVal     = pro.email || window._currentUserEmail || '';
  var tel          = document.getElementById('_leva_call_tel');
  var orario       = document.getElementById('_leva_call_orario');
  if (!tel || !orario) return;

  try {
    await sb.from('call_requests').insert({
      prospect_id:       p.id || null,
      nome:              nomeCompleto,
      email:             emailVal,
      telefono:          tel.value.trim(),
      preferenza_oraria: orario.value,
      status:            'pending',
    });
    var overlay = document.getElementById('_leva_call_modal');
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    showToast('Richiesta inviata! Sarai contattato entro 24 ore.');
  } catch(e) {
    showToast('Errore invio richiesta: ' + e.message, 'error');
  }
}

// ─────────────────────────────────────────────────────────────────────────────

function _esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function _buildMicroOpts(macroId, selectedMicro) {
  var micros = PMI_MICRO_SETTORI[macroId] || [];
  if (!micros.length) return '<option value="">— nessun micro-settore —</option>';
  return '<option value="">— Seleziona micro-settore —</option>' +
    micros.map(function(m) {
      return '<option value="' + m.id + '"' + (selectedMicro === m.id ? ' selected' : '') + '>' + m.label + '</option>';
    }).join('');
}

function pmiProfiloOnMacroChange(macroId) {
  var wrap = document.getElementById('prf-micro-wrap');
  var sel  = document.getElementById('prf-micro');
  if (!wrap || !sel) return;
  if (!macroId) { wrap.style.display = 'none'; return; }
  sel.innerHTML = _buildMicroOpts(macroId, '');
  wrap.style.display = '';
}

async function salvaProfiloPMIAzienda() {
  var nomeAzienda = (document.getElementById('prf-nome-azienda') || {}).value || '';
  var macroSett   = (document.getElementById('prf-settore')      || {}).value || '';
  var microSett   = (document.getElementById('prf-micro')        || {}).value || '';
  var fascia      = (document.getElementById('prf-fascia')       || {}).value || '';
  var citta       = (document.getElementById('prf-citta')        || {}).value || '';

  // Il settore salvato su prospect è il micro (se selezionato), altrimenti il macro
  var settoreSave = microSett || macroSett;

  var btn = document.querySelector('[onclick="salvaProfiloPMIAzienda()"]');
  if (btn) { btn.disabled = true; btn.textContent = 'Salvataggio…'; }

  try {
    var p  = window._pmiProspect;
    var up = window._userProfileData || {};

    // Aggiorna prospect (settore = micro-settore come in diagnosi)
    if (p && p.id && typeof sb !== 'undefined') {
      await sb.from('prospects').update({ nome: nomeAzienda, settore: settoreSave, fatturato: fascia, citta: citta }).eq('id', p.id);
      window._pmiProspect = Object.assign({}, p, { nome: nomeAzienda, settore: settoreSave, fatturato: fascia, citta: citta });
    }

    // Aggiorna user_profiles
    if (typeof sb !== 'undefined') {
      var uid = (window._currentProfile || {}).id;
      if (uid) {
        await sb.from('user_profiles').update({ company_name: nomeAzienda, sector: settoreSave, microsector: microSett, fascia_fatturato: fascia, citta: citta }).eq('user_id', uid);
      }
    }
    window._userProfileData = Object.assign({}, window._userProfileData, { company_name: nomeAzienda, sector: settoreSave, microsector: microSett, fascia_fatturato: fascia, citta: citta });

    showToast('Azienda aggiornata', 'success');
  } catch(e) {
    showToast('Errore nel salvataggio', 'error');
    console.error(e);
  }

  if (btn) { btn.disabled = false; btn.textContent = 'Salva modifiche'; }
}

async function salvaProfiloPMIAccount() {
  var nome     = (document.getElementById('prf-nome')     || {}).value || '';
  var cognome  = (document.getElementById('prf-cognome')  || {}).value || '';
  var telefono = (document.getElementById('prf-telefono') || {}).value || '';
  var fullName = [nome, cognome].filter(Boolean).join(' ');

  var btn = document.querySelector('[onclick="salvaProfiloPMIAccount()"]');
  if (btn) { btn.disabled = true; btn.textContent = 'Salvataggio…'; }

  try {
    if (typeof sb !== 'undefined') {
      var uid = (window._currentProfile || {}).id;
      if (uid) {
        await sb.from('profiles').update({ nome: nome, cognome: cognome, telefono: telefono }).eq('id', uid);
        window._currentProfile = Object.assign({}, window._currentProfile, { nome: nome, cognome: cognome, telefono: telefono });
      }
      // Salva full_name in user_profiles per la home personalizzata
      if (window._currentUserId && fullName) {
        await sb.from('user_profiles').upsert({ user_id: window._currentUserId, full_name: fullName }, { onConflict: 'user_id' });
        window._userProfileData = Object.assign({}, window._userProfileData, { full_name: fullName });
      }
    }
    showToast('Account aggiornato', 'success');
  } catch(e) {
    showToast('Errore nel salvataggio', 'error');
    console.error(e);
  }

  if (btn) { btn.disabled = false; btn.textContent = 'Salva'; }
}

function _profiloRow(label, value) {
  return '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.05)">' +
    '<div style="font-size:12px;color:rgba(26,26,46,0.45)">' + label + '</div>' +
    '<div style="font-size:13px;font-weight:600;color:#1a1a2e;text-align:right;max-width:60%">' + value + '</div>' +
  '</div>';
}


// ═══════════════════════════════════════════════════════════════════════════════
// PMI — VISTE PIANO-DIFFERENZIATE
// ═══════════════════════════════════════════════════════════════════════════════

function renderPMIPianoCSO(container) {
  var p = window._pmiProspect || {};
  var isPro = window._userPlan === 'guided_pro';
  var planCol = isPro ? '#FF6B2B' : '#3D5AFE';
  var csoNome = window._pmiCSONome || '';

  var pianoAzioni = [];
  try { pianoAzioni = JSON.parse(p.piano_azioni_cso || '[]'); } catch(e) {}

  var sharedPlan = p.shared_plan || '';

  var azioniHtml = pianoAzioni.length
    ? pianoAzioni.map(function(a, i) {
        var done = a.done ? 'rgba(0,130,95,0.7)' : 'rgba(26,26,46,0.2)';
        var icon = a.done
          ? '<div style="width:20px;height:20px;border-radius:50%;background:rgba(0,130,95,0.1);border:1.5px solid rgba(0,130,95,0.5);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="rgba(0,130,95,0.8)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
          : '<div style="width:20px;height:20px;border-radius:50%;border:1.5px solid rgba(26,26,46,0.12);flex-shrink:0;"></div>';
        return '<div style="display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.04);">' +
          icon +
          '<div style="flex:1;">' +
            '<div style="font-size:13px;color:' + (a.done ? 'rgba(26,26,46,0.35)' : '#1a1a2e') + ';' + (a.done ? 'text-decoration:line-through;' : '') + 'line-height:1.5;">' + _esc(a.testo || a.text || '') + '</div>' +
            (a.data ? '<div style="font-size:11px;color:rgba(26,26,46,0.35);margin-top:2px;">' + a.data + '</div>' : '') +
          '</div>' +
        '</div>';
      }).join('')
    : '<div style="font-size:13px;color:rgba(26,26,46,0.35);text-align:center;padding:32px 0;">Nessuna azione ancora definita dal tuo CSO.</div>';

  container.innerHTML =
    '<div style="max-width:720px;margin:0 auto;">' +
      '<div style="margin-bottom:24px;">' +
        '<h1 style="font-size:20px;font-weight:700;color:#1a1a2e;margin-bottom:4px;">Piano CSO</h1>' +
        '<p style="font-size:13px;color:rgba(26,26,46,0.45);">Il percorso personalizzato preparato dal tuo consulente commerciale.</p>' +
      '</div>' +

      // CSO banner
      '<div style="background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-left:4px solid ' + planCol + ';border-radius:14px;padding:16px 20px;display:flex;align-items:center;gap:14px;margin-bottom:16px;">' +
        '<div style="width:40px;height:40px;border-radius:50%;background:rgba(61,90,254,0.06);border:1.5px solid ' + planCol + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
          '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="8" r="4" stroke="' + planCol + '" stroke-width="1.4" fill="none"/><path d="M3 19c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="' + planCol + '" stroke-width="1.4" fill="none"/></svg>' +
        '</div>' +
        '<div style="flex:1;">' +
          '<div style="font-size:10px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:' + planCol + ';margin-bottom:2px;">Il tuo consulente CSO</div>' +
          '<div style="font-size:15px;font-weight:600;color:#1a1a2e;">' + (csoNome || 'CSO assegnato al tuo account') + '</div>' +
        '</div>' +
        (isPro ? '<div style="background:rgba(255,107,43,0.08);color:#FF6B2B;font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;">Call illimitate</div>' : '<div style="background:rgba(61,90,254,0.08);color:#3D5AFE;font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;">1 call/mese</div>') +
      '</div>' +

      // Piano testo condiviso
      '<div style="background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:14px;padding:20px;margin-bottom:16px;">' +
        '<div style="font-size:13px;font-weight:600;color:#1a1a2e;margin-bottom:12px;">Note dal tuo CSO</div>' +
        (sharedPlan
          ? '<div style="font-size:13px;color:#1a1a2e;line-height:1.65;white-space:pre-wrap;">' + _esc(sharedPlan) + '</div>'
          : '<div style="font-size:13px;color:rgba(26,26,46,0.35);font-style:italic;">Il tuo CSO non ha ancora aggiunto note. Le riceverai dopo la prima call.</div>'
        ) +
      '</div>' +

      // Piano azioni
      '<div style="background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:14px;padding:20px;">' +
        '<div style="font-size:13px;font-weight:600;color:#1a1a2e;margin-bottom:4px;">Piano azioni</div>' +
        '<div style="font-size:11px;color:rgba(26,26,46,0.40);margin-bottom:12px;">' + pianoAzioni.length + ' azioni definite</div>' +
        azioniHtml +
      '</div>' +
    '</div>';

  // Async: load CSO name if not yet cached
  if (!window._pmiCSONome) {
    (async function() {
      var p2 = window._pmiProspect || {};
      if (p2.cso_id && typeof sb !== 'undefined') {
        var res = await sb.from('profiles').select('nome, cognome').eq('id', p2.cso_id).maybeSingle();
        if (res && res.data) {
          window._pmiCSONome = ((res.data.nome || '') + ' ' + (res.data.cognome || '')).trim();
          container.querySelectorAll('[data-cso-nome]').forEach(function(el) {
            if (window._pmiCSONome) el.textContent = window._pmiCSONome;
          });
        }
      }
    })();
  }
}

function renderPMIReport(container) {
  var p = window._pmiProspect || {};
  var s = calcScore(p);
  var dimLabels = {vendite:'Vendite',pipeline:'Pipeline & CRM',team:'Organizzazione',processi:'Processi',ricavi:'Ricavi',marketing:'Marketing',sitoweb:'Sito Web',ecommerce:'Post-vendita'};
  var _PMI_DIMS2 = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];

  var dimsHtml = _PMI_DIMS2.map(function(k) {
    var v = (p.dims && p.dims[k]) || 0;
    var col = v < 2 ? 'rgba(229,57,53,0.8)' : v < 4 ? 'rgba(175,125,0,0.8)' : 'rgba(0,130,95,0.8)';
    var pct = Math.round((v/5)*100);
    return '<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.04);">' +
      '<div style="width:110px;font-size:12px;color:#1a1a2e;flex-shrink:0;">' + dimLabels[k] + '</div>' +
      '<div style="flex:1;height:6px;background:rgba(0,0,0,0.05);border-radius:3px;">' +
        '<div style="width:' + pct + '%;height:100%;background:' + col + ';border-radius:3px;"></div>' +
      '</div>' +
      '<div style="width:30px;text-align:right;font-size:13px;font-weight:700;color:' + col + ';">' + (v || '—') + '</div>' +
    '</div>';
  }).join('');

  var today = new Date();
  var mese = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'][today.getMonth()];

  container.innerHTML =
    '<div style="max-width:680px;margin:0 auto;">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;">' +
        '<div>' +
          '<h1 style="font-size:20px;font-weight:700;color:#1a1a2e;margin-bottom:4px;">Report mensile</h1>' +
          '<p style="font-size:13px;color:rgba(26,26,46,0.45);">' + mese + ' ' + today.getFullYear() + ' — generato automaticamente</p>' +
        '</div>' +
        '<button style="background:rgba(26,26,46,0.06);color:rgba(26,26,46,0.35);border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:9px 18px;font-size:12px;font-weight:600;cursor:not-allowed;font-family:inherit;">PDF — in arrivo</button>' +
      '</div>' +

      // Score KPI
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px;">' +
        '<div style="background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:14px;padding:16px;text-align:center;">' +
          '<div style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:rgba(26,26,46,0.35);margin-bottom:8px;">Score attuale</div>' +
          '<div style="font-size:32px;font-weight:700;color:#1a1a2e;">' + s + '</div>' +
          '<div style="font-size:11px;color:rgba(26,26,46,0.35);">/100</div>' +
        '</div>' +
        '<div style="background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:14px;padding:16px;text-align:center;">' +
          '<div style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:rgba(26,26,46,0.35);margin-bottom:8px;">Azioni completate</div>' +
          '<div style="font-size:32px;font-weight:700;color:#1a1a2e;">' + Object.values(p.azioni_completate || {}).filter(Boolean).length + '</div>' +
          '<div style="font-size:11px;color:rgba(26,26,46,0.35);">/5 moduli</div>' +
        '</div>' +
        '<div style="background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:14px;padding:16px;text-align:center;">' +
          '<div style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:rgba(26,26,46,0.35);margin-bottom:8px;">Fatturato dichiarato</div>' +
          '<div style="font-size:24px;font-weight:700;color:#1a1a2e;">' + (p.fatturato ? '€' + (p.fatturato/1000).toFixed(0) + 'K' : '—') + '</div>' +
          '<div style="font-size:11px;color:rgba(26,26,46,0.35);">annuo</div>' +
        '</div>' +
      '</div>' +

      // Profilo dimensioni
      '<div style="background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:14px;padding:20px;">' +
        '<div style="font-size:13px;font-weight:600;color:#1a1a2e;margin-bottom:12px;">Profilo per dimensione</div>' +
        dimsHtml +
      '</div>' +
    '</div>';
}

function renderPMISimulazioni(container) {
  var p = window._pmiProspect || {};
  var fatturato = p.fatturato || 1000000;
  var dimLabels = {vendite:'Vendite',pipeline:'Pipeline & CRM',team:'Organizzazione',processi:'Processi',ricavi:'Ricavi',marketing:'Marketing',sitoweb:'Sito Web',ecommerce:'Post-vendita'};
  var coefficienti = {vendite:0.04,pipeline:0.035,team:0.025,processi:0.03,ricavi:0.045,marketing:0.02,sitoweb:0.015,ecommerce:0.03};
  var _PMI_DIMS2 = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];

  var simsHtml = _PMI_DIMS2.map(function(k) {
    var v = (p.dims && p.dims[k]) || 0;
    if (v >= 5) return '';
    var gapMax = 5 - v;
    var impatto1 = Math.round(fatturato * 1 * (coefficienti[k] || 0.03) / 12);
    var impatto2 = Math.round(fatturato * Math.min(2, gapMax) * (coefficienti[k] || 0.03) / 12);
    var col = v < 2 ? 'rgba(229,57,53,0.8)' : v < 4 ? 'rgba(175,125,0,0.8)' : 'rgba(0,130,95,0.8)';
    return '<div style="background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:14px;padding:16px 20px;margin-bottom:10px;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">' +
        '<div>' +
          '<div style="font-size:13px;font-weight:600;color:#1a1a2e;">' + dimLabels[k] + '</div>' +
          '<div style="font-size:11px;color:rgba(26,26,46,0.40);">Score attuale: <span style="font-weight:700;color:' + col + ';">' + v + '/5</span></div>' +
        '</div>' +
        '<div style="text-align:right;">' +
          '<div style="font-size:10px;text-transform:uppercase;letter-spacing:.4px;color:rgba(26,26,46,0.35);margin-bottom:2px;">Impatto stimato</div>' +
          '<div style="font-size:18px;font-weight:700;color:rgba(0,130,95,0.85);">+€' + impatto2.toLocaleString('it-IT') + '/mese</div>' +
          '<div style="font-size:11px;color:rgba(26,26,46,0.35);">portando a ' + Math.min(v+2, 5) + '/5</div>' +
        '</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
        '<div style="background:rgba(0,130,95,0.04);border:1px solid rgba(0,130,95,0.12);border-radius:10px;padding:10px 14px;">' +
          '<div style="font-size:10px;color:rgba(0,130,95,0.6);margin-bottom:3px;">+1 livello</div>' +
          '<div style="font-size:16px;font-weight:700;color:rgba(0,130,95,0.8);">+€' + impatto1.toLocaleString('it-IT') + '/mese</div>' +
        '</div>' +
        '<div style="background:rgba(0,130,95,0.07);border:1px solid rgba(0,130,95,0.18);border-radius:10px;padding:10px 14px;">' +
          '<div style="font-size:10px;color:rgba(0,130,95,0.6);margin-bottom:3px;">+2 livelli</div>' +
          '<div style="font-size:16px;font-weight:700;color:rgba(0,130,95,0.85);">+€' + impatto2.toLocaleString('it-IT') + '/mese</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  container.innerHTML =
    '<div style="max-width:680px;margin:0 auto;">' +
      '<div style="margin-bottom:24px;">' +
        '<h1 style="font-size:20px;font-weight:700;color:#1a1a2e;margin-bottom:4px;">Simulazioni what-if</h1>' +
        '<p style="font-size:13px;color:rgba(26,26,46,0.45);">Stima l\'impatto economico di migliorare ogni dimensione commerciale.</p>' +
      '</div>' +
      '<div style="background:rgba(61,90,254,0.04);border:1px solid rgba(61,90,254,0.12);border-radius:14px;padding:14px 18px;margin-bottom:16px;font-size:12px;color:rgba(26,26,46,0.55);line-height:1.5;">' +
        'Basato su un fatturato dichiarato di <strong style="color:#1a1a2e;">€' + fatturato.toLocaleString('it-IT') + '</strong>. ' +
        'I valori sono stime indicative basate su benchmark di settore PMI italiano.' +
      '</div>' +
      simsHtml +
    '</div>';
}

function renderPMIBenchmark(container) {
  var p = window._pmiProspect || {};
  var s = calcScore(p);
  var settoreRaw = (window._userProfileData || {}).sector || p.settore || '';
  var settore = settoreRaw ? settoreRaw.replace(/_/g,' ').replace(/^\w/, function(c){ return c.toUpperCase(); }) : 'il tuo settore';
  var dimLabels = {vendite:'Vendite',pipeline:'Pipeline & CRM',team:'Organizzazione',processi:'Processi',ricavi:'Ricavi',marketing:'Marketing',sitoweb:'Sito Web',ecommerce:'Post-vendita'};
  var _PMI_DIMS2 = ['vendite','pipeline','team','processi','ricavi','marketing','sitoweb','ecommerce'];

  // Benchmark peer — valori medi di settore simulati (in assenza di dati reali)
  var BENCHMARK_BASE = {vendite:2.8,pipeline:2.3,team:2.6,processi:2.5,ricavi:3.0,marketing:2.1,sitoweb:2.4,ecommerce:2.2};

  var rowsHtml = _PMI_DIMS2.map(function(k) {
    var mio = (p.dims && p.dims[k]) || 0;
    var avg = BENCHMARK_BASE[k] || 2.5;
    var diff = mio - avg;
    var diffCol = diff > 0.3 ? 'rgba(0,130,95,0.8)' : diff < -0.3 ? 'rgba(229,57,53,0.8)' : 'rgba(175,125,0,0.8)';
    var diffLabel = diff > 0.3 ? '↑ sopra media' : diff < -0.3 ? '↓ sotto media' : '≈ nella media';
    var mioPct  = Math.round((mio/5)*100);
    var avgPct  = Math.round((avg/5)*100);
    return '<div style="padding:14px 0;border-bottom:1px solid rgba(0,0,0,0.04);">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
        '<div style="font-size:13px;font-weight:500;color:#1a1a2e;">' + dimLabels[k] + '</div>' +
        '<div style="font-size:11px;font-weight:600;color:' + diffCol + ';">' + diffLabel + '</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">' +
        '<div style="width:50px;font-size:11px;color:rgba(26,26,46,0.40);">Tu</div>' +
        '<div style="flex:1;height:6px;background:rgba(0,0,0,0.05);border-radius:3px;">' +
          '<div style="width:' + mioPct + '%;height:100%;background:#3D5AFE;border-radius:3px;"></div>' +
        '</div>' +
        '<div style="width:24px;text-align:right;font-size:12px;font-weight:700;color:#3D5AFE;">' + mio + '</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:8px;">' +
        '<div style="width:50px;font-size:11px;color:rgba(26,26,46,0.40);">Media</div>' +
        '<div style="flex:1;height:6px;background:rgba(0,0,0,0.05);border-radius:3px;">' +
          '<div style="width:' + avgPct + '%;height:100%;background:rgba(26,26,46,0.20);border-radius:3px;"></div>' +
        '</div>' +
        '<div style="width:24px;text-align:right;font-size:12px;color:rgba(26,26,46,0.40);">' + avg.toFixed(1) + '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  var scoreAvg = 52; // Media PMI italiane
  var scoreDiff = s - scoreAvg;
  var scoreDiffCol = scoreDiff > 0 ? 'rgba(0,130,95,0.8)' : 'rgba(229,57,53,0.8)';

  container.innerHTML =
    '<div style="max-width:680px;margin:0 auto;">' +
      '<div style="margin-bottom:24px;">' +
        '<h1 style="font-size:20px;font-weight:700;color:#1a1a2e;margin-bottom:4px;">Benchmark di settore</h1>' +
        '<p style="font-size:13px;color:rgba(26,26,46,0.45);">Come ti posizioni rispetto alle PMI italiane in ' + settore + '.</p>' +
      '</div>' +

      // Score comparison KPI
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">' +
        '<div style="background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:14px;padding:16px;text-align:center;">' +
          '<div style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:rgba(26,26,46,0.35);margin-bottom:8px;">Il tuo score</div>' +
          '<div style="font-size:38px;font-weight:700;color:#3D5AFE;">' + s + '</div>' +
          '<div style="font-size:11px;color:rgba(26,26,46,0.35);">/100</div>' +
        '</div>' +
        '<div style="background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:14px;padding:16px;text-align:center;">' +
          '<div style="font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:rgba(26,26,46,0.35);margin-bottom:8px;">Media PMI Italia</div>' +
          '<div style="font-size:38px;font-weight:700;color:rgba(26,26,46,0.40);">' + scoreAvg + '</div>' +
          '<div style="font-size:11px;font-weight:600;color:' + scoreDiffCol + ';">' + (scoreDiff >= 0 ? '+' : '') + scoreDiff + ' rispetto alla media</div>' +
        '</div>' +
      '</div>' +

      // Confronto per dimensione
      '<div style="background:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.7);border-radius:14px;padding:20px;">' +
        '<div style="font-size:13px;font-weight:600;color:#1a1a2e;margin-bottom:4px;">Confronto per dimensione</div>' +
        '<div style="font-size:11px;color:rgba(26,26,46,0.35);margin-bottom:12px;">Media settore PMI italiano — dati aggregati benchmark Leva</div>' +
        rowsHtml +
      '</div>' +
    '</div>';
}


