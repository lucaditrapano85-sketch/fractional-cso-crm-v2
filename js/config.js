// -- SUPABASE ----------------------------------------------
const { createClient } = supabase;
const sb = createClient(
  'https://glxwvvtdybzkxtobsiin.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdseHd2dnRkeWJ6a3h0b2JzaWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MzYxNzIsImV4cCI6MjA4OTAxMjE3Mn0.FvL3LTPaHC43WXzWn6Z_eXo3nly_Gz3QvvTT_S2QNIY',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false
    }
  }
);


// ===========================================================================
// PROFILI_COMMERCIALI ? Profilo KPI commerciali per sottomercato
//
// Struttura per ogni entry:
//   tipo_clientela: 'ricorrente' | 'mista' | 'occasionale' | 'transazionale'
//   kpi: array di KPI con { id, label, tipo, unita, soglie, note }
//   diagnosi: funzione che riceve i valori e restituisce problemi rilevati
//
// Tipi clientela:
//   ricorrente    = clienti stabili, ordini periodici (B2B classico)
//   mista         = mix ricorrente + occasionale (es. impiantistica)
//   occasionale   = clienti che tornano ma non sistematicamente
//   transazionale = ogni vendita ? indipendente (retail puro)
// ===========================================================================

const TIPO_CLIENTELA_LABELS = {
  ricorrente:    { label: 'B2B ricorrente',    color: 'rgba(40,120,70,0.75)', icon: '' },
  mista:         { label: 'Clientela mista',   color: 'rgba(150,110,30,0.75)', icon: '!' },
  occasionale:   { label: 'Occasionale/progettuale', color: '#4A7AB5', icon: '' },
  transazionale: { label: 'Transazionale/retail',    color: '#A05AB5', icon: '' },
};

// -- Soglie colore ---------------------------------------------------------
// { verde: [min, max], giallo: [min, max], rosso: [min, max] }
// null = non applicabile in quella direzione

const PROFILI_COMMERCIALI = {

  // =============================== MANIFATTURIERO ===========================

  manifatturiero_meccanica: {
    tipo_clientela: 'ricorrente',
    kpi: [
      { id:'clienti_attivi',      label:'Clienti attivi (12 mesi)',   unita:'n.',   soglie:{ verde:[15,999], giallo:[8,14],  rosso:[0,7]   }, note:'< 8 clienti = dipendenza pericolosa' },
      { id:'fatturato_top3_pct',  label:'% fatturato top 3 clienti',  unita:'%',    soglie:{ verde:[0,40],   giallo:[41,60], rosso:[61,100] }, note:'> 60% = rischio concentrazione elevato' },
      { id:'valore_medio_ordine', label:'Valore medio ordine',        unita:'EUR',    soglie:{ verde:[5000,999999], giallo:[2000,4999], rosso:[0,1999] }, note:'Ordini piccoli = margini erosi dai costi fissi' },
      { id:'frequenza_ordini',    label:'Frequenza ordini/cliente/anno', unita:'n.', soglie:{ verde:[6,999], giallo:[3,5],   rosso:[0,2]   }, note:'< 3 ordini/anno = cliente a rischio abbandono' },
      { id:'ciclo_incasso_gg',    label:'Giorni medi di incasso (DSO)', unita:'gg', soglie:{ verde:[0,60],   giallo:[61,90], rosso:[91,999] }, note:'> 90 gg = problema di cash flow' },
      { id:'nuovi_clienti_anno',  label:'Nuovi clienti acquisiti/anno', unita:'n.', soglie:{ verde:[3,999],  giallo:[1,2],   rosso:[0,0]   }, note:'0 nuovi clienti = crescita bloccata' },
      { id:'clienti_persi_anno',  label:'Clienti persi/anno',          unita:'n.', soglie:{ verde:[0,2],    giallo:[3,5],   rosso:[6,999] }, note:'> 5 clienti persi/anno = segnale grave' },
      { id:'tasso_riacquisto',    label:'Tasso riacquisto',            unita:'%',   soglie:{ verde:[80,100], giallo:[60,79], rosso:[0,59]  }, note:'< 60% = problema di retention' },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.fatturato_top3_pct > 60 && v.clienti_attivi < 15, label:'! Concentrazione + bassa diversificazione', desc:'Alta dipendenza da pochi clienti con portafoglio piccolo: un singolo cliente perso puo dimezzare il fatturato.', livello:'rosso' },
      { condizione: (v) => v.ciclo_incasso_gg > 90 && v.valore_medio_ordine > 5000, label:'! Cash flow a rischio', desc:'Ordini di alto valore + incasso lento: il circolante e sotto pressione. Verificare esposizione bancaria.', livello:'rosso' },
      { condizione: (v) => v.nuovi_clienti_anno === 0 && v.clienti_persi_anno > 2, label:'! Portafoglio in erosione', desc:'Nessun nuovo cliente acquisito e clienti persi: il portafoglio si sta restringendo.', livello:'rosso' },
      { condizione: (v) => v.frequenza_ordini < 3 && v.tasso_riacquisto < 70, label:'! Bassa fidelizzazione', desc:'Poca frequenza di ordine + basso riacquisto: i clienti non sono fidelizzati o trovano alternative.', livello:'giallo' },
    ],
  },

  manifatturiero_automotive: {
    tipo_clientela: 'ricorrente',
    kpi: [
      { id:'clienti_attivi',      label:'Clienti OEM/Tier attivi',     unita:'n.',  soglie:{ verde:[5,30],   giallo:[3,4],   rosso:[0,2]   }, note:'< 3 clienti OEM = dipendenza estrema' },
      { id:'fatturato_top3_pct',  label:'% fatturato top 3 clienti',   unita:'%',   soglie:{ verde:[0,50],   giallo:[51,70], rosso:[71,100] }, note:'Supply chain automotive: concentrazione fisiologica ma rischiosa' },
      { id:'valore_lta_medio',    label:'Valore medio contratto LTA',  unita:'EUR',   soglie:{ verde:[200000,9999999], giallo:[80000,199999], rosso:[0,79999] }, note:'LTA piccoli = potere negoziale basso' },
      { id:'durata_contratto_gg', label:'Durata media contratto (anni)', unita:'anni', soglie:{ verde:[3,10],  giallo:[1,2],   rosso:[0,0.9] }, note:'< 1 anno = instabilita revenue' },
      { id:'ciclo_incasso_gg',    label:'Giorni medi di incasso (DSO)', unita:'gg', soglie:{ verde:[0,60],   giallo:[61,90], rosso:[91,999] }, note:'OEM impongono spesso 60-90 gg: oltre e anomalo' },
      { id:'tasso_riacquisto',    label:'Tasso rinnovo contratti',      unita:'%',  soglie:{ verde:[85,100], giallo:[70,84], rosso:[0,69]  }, note:'< 70% rinnovi = problema di qualita o prezzo' },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.fatturato_top3_pct > 70 && v.clienti_attivi < 5, label:' Dipendenza critica da OEM', desc:'Portafoglio ultra-concentrato: la perdita di un contratto LTA e un evento catastrofico per il business.', livello:'rosso' },
      { condizione: (v) => v.durata_contratto_gg < 2 && v.tasso_riacquisto < 80, label:'! Instabilita contrattuale', desc:'Contratti brevi + rinnovi incerti: revenue difficile da prevedere e pianificare.', livello:'rosso' },
    ],
  },

  manifatturiero_packaging: {
    tipo_clientela: 'ricorrente',
    kpi: [
      { id:'clienti_attivi',      label:'Clienti attivi',              unita:'n.',  soglie:{ verde:[20,999], giallo:[10,19], rosso:[0,9]   } },
      { id:'fatturato_top3_pct',  label:'% fatturato top 3 clienti',   unita:'%',   soglie:{ verde:[0,40],   giallo:[41,60], rosso:[61,100] } },
      { id:'frequenza_ordini',    label:'Ordini/cliente/anno',         unita:'n.',  soglie:{ verde:[8,999],  giallo:[4,7],   rosso:[0,3]   }, note:'Il packaging si ordina frequentemente' },
      { id:'valore_medio_ordine', label:'Valore medio ordine',         unita:'EUR',   soglie:{ verde:[3000,999999], giallo:[1000,2999], rosso:[0,999] } },
      { id:'tasso_riacquisto',    label:'Tasso riacquisto',            unita:'%',   soglie:{ verde:[80,100], giallo:[65,79], rosso:[0,64]  } },
      { id:'ciclo_incasso_gg',    label:'DSO (giorni incasso)',        unita:'gg',  soglie:{ verde:[0,45],   giallo:[46,75], rosso:[76,999] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.frequenza_ordini < 4 && v.fatturato_top3_pct > 50, label:'! Pochi ordini + alta concentrazione', desc:'Ordini poco frequenti da pochi clienti: ogni ordine cancellato ha impatto elevato sul fatturato.', livello:'rosso' },
    ],
  },

  manifatturiero_cterzi: {
    tipo_clientela: 'mista',
    kpi: [
      { id:'clienti_attivi',        label:'Clienti attivi',               unita:'n.', soglie:{ verde:[10,999], giallo:[5,9],   rosso:[0,4]   } },
      { id:'fatturato_top3_pct',    label:'% fatturato top 3 clienti',    unita:'%',  soglie:{ verde:[0,45],   giallo:[46,65], rosso:[66,100] } },
      { id:'valore_medio_commessa', label:'Valore medio commessa',        unita:'EUR',  soglie:{ verde:[2000,999999], giallo:[500,1999], rosso:[0,499] }, note:'Commesse piccole = poco margine dopo setup' },
      { id:'tempo_risposta_h',      label:'Tempo medio risposta preventivo', unita:'h', soglie:{ verde:[0,4],   giallo:[5,24],  rosso:[25,999] }, note:'< 4 ore = vantaggio competitivo forte' },
      { id:'tasso_riacquisto',      label:'Tasso riacquisto',             unita:'%',  soglie:{ verde:[70,100], giallo:[50,69], rosso:[0,49]  } },
      { id:'nuovi_clienti_anno',    label:'Nuovi clienti/anno',           unita:'n.', soglie:{ verde:[5,999],  giallo:[2,4],   rosso:[0,1]   } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.tempo_risposta_h > 24 && v.tasso_riacquisto < 60, label:'! Lentezza + bassa retention', desc:'Risposta lenta ai preventivi e clienti che non tornano: probabilmente i competitor rispondono prima.', livello:'rosso' },
      { condizione: (v) => v.valore_medio_commessa < 500 && v.clienti_attivi < 10, label:'! Marginalita compressa', desc:'Commesse piccole con pochi clienti: difficile coprire i costi fissi con questo mix.', livello:'giallo' },
    ],
  },

  manifatturiero_tessile: {
    tipo_clientela: 'mista',
    kpi: [
      { id:'clienti_attivi',      label:'Buyer attivi',                unita:'n.',  soglie:{ verde:[15,999], giallo:[7,14],  rosso:[0,6]   } },
      { id:'sell_through_pct',    label:'Sell-through medio/stagione', unita:'%',   soglie:{ verde:[70,100], giallo:[50,69], rosso:[0,49]  }, note:'< 50% = prodotto non gradito o prezzi errati' },
      { id:'ordini_anticipati_pct', label:'% ordine anticipato vs. pronto', unita:'%', soglie:{ verde:[40,100], giallo:[20,39], rosso:[0,19] }, note:'Alto pronto = gestione stock complessa' },
      { id:'reso_invenduto_pct',  label:'% reso invenduto',           unita:'%',   soglie:{ verde:[0,10],   giallo:[11,20], rosso:[21,100] }, note:'> 20% = problema di assortimento o qualita' },
      { id:'valore_medio_ordine', label:'Valore medio ordine stagionale', unita:'EUR', soglie:{ verde:[5000,999999], giallo:[2000,4999], rosso:[0,1999] } },
      { id:'export_pct',          label:'% fatturato export',         unita:'%',   soglie:{ verde:[30,100], giallo:[10,29], rosso:[0,9]   }, note:'Export basso = dipendenza mercato domestico' },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.sell_through_pct < 50 && v.reso_invenduto_pct > 20, label:' Prodotto non performante', desc:'Scarso sell-through + alto reso: il prodotto non incontra la domanda di mercato. Rivedere collezione e pricing.', livello:'rosso' },
      { condizione: (v) => v.ordini_anticipati_pct < 20 && v.reso_invenduto_pct > 15, label:'! Eccessivo stock a rischio', desc:'Poco ordine anticipato significa produzione senza visibilita: rischio di magazzino invenduto elevato.', livello:'giallo' },
    ],
  },

  // =============================== SERVIZI B2B ==============================

  servizi_it: {
    tipo_clientela: 'mista',
    kpi: [
      { id:'clienti_attivi',    label:'Clienti attivi',              unita:'n.',  soglie:{ verde:[10,50],  giallo:[5,9],   rosso:[0,4]   } },
      { id:'mrr',               label:'MRR (managed services)',      unita:'EUR',   soglie:{ verde:[10000,9999999], giallo:[3000,9999], rosso:[0,2999] }, note:'MRR = Monthly Recurring Revenue da contratti managed' },
      { id:'mrr_pct_fatturato', label:'% MRR su fatturato totale',   unita:'%',   soglie:{ verde:[40,100], giallo:[20,39], rosso:[0,19]  }, note:'< 20% = troppo dipendente da progetti one-shot' },
      { id:'churn_mensile_pct', label:'Churn mensile clienti',       unita:'%',   soglie:{ verde:[0,2],    giallo:[2.1,5], rosso:[5.1,100] }, note:'> 5% mensile = allarme retention' },
      { id:'nps',               label:'NPS (Net Promoter Score)',    unita:'',    soglie:{ verde:[50,100], giallo:[20,49], rosso:[-100,19] }, note:'NPS < 20 = clienti a rischio abbandono' },
      { id:'ticket_medio_anno', label:'Revenue media per cliente/anno (ACV)', unita:'EUR', soglie:{ verde:[20000,9999999], giallo:[8000,19999], rosso:[0,7999] }, opzionale:true, contesto:'Annual Contract Value -- inserisci se disponibile' },
      { id:'ciclo_incasso_gg',  label:'DSO (giorni incasso)',        unita:'gg', soglie:{ verde:[0,30],   giallo:[31,60], rosso:[61,999] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.mrr_pct_fatturato < 20 && v.churn_mensile_pct > 3, label:' Revenue instabile + churn alto', desc:'Poca revenue ricorrente e alto churn: il business e in un ciclo pericoloso di rincorsa costante ai clienti.', livello:'rosso' },
      { condizione: (v) => v.nps < 20 && v.churn_mensile_pct > 2, label:'! Insoddisfazione clienti', desc:'NPS basso correlato con churn elevato: problema di qualita del servizio o di gestione delle aspettative.', livello:'rosso' },
      { condizione: (v) => v.mrr_pct_fatturato > 50 && v.nps > 50, label:'✅ Modello sano', desc:'Alta revenue ricorrente + clienti soddisfatti: il business ha basi solide per crescere.', livello:'verde' },
    ],
  },

  servizi_formazione: {
    tipo_clientela: 'mista',
    kpi: [
      { id:'clienti_attivi',       label:'Aziende clienti attive',      unita:'n.',  soglie:{ verde:[15,999], giallo:[7,14],  rosso:[0,6]   } },
      { id:'tasso_rinnovo_pct',    label:'Tasso rinnovo contratti',     unita:'%',   soglie:{ verde:[60,100], giallo:[40,59], rosso:[0,39]  } },
      { id:'valore_medio_progetto', label:'Valore medio piano formativo', unita:'EUR', soglie:{ verde:[5000,999999], giallo:[2000,4999], rosso:[0,1999] }, opzionale:true, contesto:'Inserisci se il titolare ha il dato -- spesso non monitorato' },
      { id:'fondi_pct',            label:'% fatturato su fondi interprofessionali', unita:'%', soglie:{ verde:[30,80], giallo:[10,29], rosso:[81,100] }, note:'> 80% = dipendenza dai fondi: rischio normativo' },
      { id:'nps',                  label:'NPS post-corso',              unita:'',    soglie:{ verde:[50,100], giallo:[25,49], rosso:[-100,24] } },
      { id:'referral_rate',        label:'% nuovi clienti da referral', unita:'%',   soglie:{ verde:[40,100], giallo:[20,39], rosso:[0,19]  } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.fondi_pct > 80 && v.tasso_rinnovo_pct < 50, label:'! Dipendenza dai fondi + bassa fidelizzazione', desc:'Business costruito quasi interamente sui fondi interprofessionali con clienti che non rinnovano: un cambio normativo puo azzerare il fatturato.', livello:'rosso' },
    ],
  },

  // =============================== EDILIZIA =================================

  edilizia_residenziale: {
    tipo_clientela: 'occasionale',
    kpi: [
      { id:'unita_vendute_anno',   label:'Unita abitative vendute/anno', unita:'n.', soglie:{ verde:[5,999],  giallo:[2,4],   rosso:[0,1]   } },
      { id:'valore_medio_unita',   label:'Prezzo medio per unita',      unita:'EUR',  soglie:{ verde:[200000,9999999], giallo:[100000,199999], rosso:[0,99999] }, opzionale:true, contesto:'Prezzo di vendita medio per unita abitativa' },
      { id:'tempo_medio_vendita',  label:'Tempo medio di vendita (mesi)', unita:'mesi', soglie:{ verde:[0,6],  giallo:[7,12],  rosso:[13,999] }, note:'> 12 mesi = problema di posizionamento o prezzo' },
      { id:'lead_a_rogito_pct',    label:'Conversion rate lead->rogito', unita:'%',  soglie:{ verde:[15,100], giallo:[8,14],  rosso:[0,7]   } },
      { id:'invenduto_pct',        label:'% unita invendute su costruite', unita:'%', soglie:{ verde:[0,15], giallo:[16,30], rosso:[31,100] }, note:'> 30% = problema di mercato o progetto' },
      { id:'referral_rate',        label:'% acquirenti da referral',    unita:'%',  soglie:{ verde:[30,100], giallo:[15,29], rosso:[0,14]  } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.invenduto_pct > 30 && v.tempo_medio_vendita > 12, label:' Stock invenduto + tempi lunghi', desc:'Alto invenduto e tempi di vendita superiori all\'anno: o il prezzo e fuori mercato o il progetto non incontra la domanda locale.', livello:'rosso' },
      { condizione: (v) => v.lead_a_rogito_pct < 8 && v.tempo_medio_vendita > 8, label:'! Conversione bassa', desc:'Pochi lead si trasformano in rogiti e i tempi si allungano: il processo di vendita o la presentazione del prodotto ha criticita.', livello:'giallo' },
    ],
  },

  edilizia_impianti: {
    tipo_clientela: 'mista',
    kpi: [
      { id:'interventi_anno',       label:'Interventi/anno',             unita:'n.',  soglie:{ verde:[100,9999], giallo:[40,99], rosso:[0,39] } },
      { id:'valore_medio_intervento', label:'Valore medio intervento',  unita:'EUR',   soglie:{ verde:[500,9999999], giallo:[200,499], rosso:[0,199] } },
      { id:'contratti_manutenzione', label:'Contratti manutenzione attivi', unita:'n.', soglie:{ verde:[20,9999], giallo:[8,19], rosso:[0,7] }, note:'I contratti manutenzione sono la rendita del settore' },
      { id:'manutenzione_pct',      label:'% fatturato da manutenzione', unita:'%',   soglie:{ verde:[30,100], giallo:[15,29], rosso:[0,14]  }, note:'< 15% = troppo dipendente da lavori spot' },
      { id:'tempo_risposta_h',      label:'Tempo risposta chiamata urgente', unita:'h', soglie:{ verde:[0,2],  giallo:[3,8],   rosso:[9,999] } },
      { id:'recensioni_google',     label:'Numero recensioni Google',   unita:'n.',   soglie:{ verde:[50,9999], giallo:[20,49], rosso:[0,19] }, note:'Le recensioni Google sono il principale canale di acquisizione' },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.manutenzione_pct < 15 && v.contratti_manutenzione < 10, label:'! Nessuna rendita ricorrente', desc:'Tutto basato su interventi spot: ogni mese si riparte da zero. La manutenzione preventiva va proposta sistematicamente dopo ogni intervento.', livello:'giallo' },
      { condizione: (v) => v.tempo_risposta_h > 8 && v.recensioni_google < 30, label:'! Servizio lento + bassa visibilita', desc:'Risposta lenta + poche recensioni: competitor piu reattivi e visibili stanno catturando i clienti in emergenza.', livello:'rosso' },
    ],
  },

  edilizia_ristrutturazioni: {
    tipo_clientela: 'occasionale',
    kpi: [
      { id:'commesse_anno',         label:'Commesse/anno',               unita:'n.',  soglie:{ verde:[8,999],  giallo:[4,7],   rosso:[0,3]   } },
      { id:'valore_medio_commessa', label:'Valore medio cantiere',       unita:'EUR',   soglie:{ verde:[20000,9999999], giallo:[8000,19999], rosso:[0,7999] }, opzionale:true, contesto:'Importo medio per lavoro -- inserisci se disponibile' },
      { id:'referral_rate',         label:'% lavori da referral/passaparola', unita:'%', soglie:{ verde:[50,100], giallo:[25,49], rosso:[0,24] } },
      { id:'rispetto_tempi_pct',    label:'% cantieri consegnati in tempo', unita:'%', soglie:{ verde:[80,100], giallo:[60,79], rosso:[0,59] }, note:'La puntualita e il principale motore di referral' },
      { id:'saldo_bonus_fiscali',   label:'% commesse con bonus fiscali', unita:'%',  soglie:{ verde:[50,100], giallo:[25,49], rosso:[0,24]  }, note:'< 25% = stai lasciando valore al competitor' },
      { id:'pipeline_valore',       label:'Valore pipeline commesse future', unita:'EUR', soglie:{ verde:[50000,9999999], giallo:[20000,49999], rosso:[0,19999] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.referral_rate < 25 && v.rispetto_tempi_pct < 70, label:' Cantieri in ritardo = zero referral', desc:'Il mancato rispetto dei tempi e la prima causa di referral negativi. Senza referral, il costo di acquisizione clienti esplode.', livello:'rosso' },
      { condizione: (v) => v.pipeline_valore < 20000 && v.commesse_anno < 5, label:'! Pipeline vuota', desc:'Poche commesse e pipeline scarsa: problema di visibilita o di processo commerciale.', livello:'giallo' },
    ],
  },

  edilizia_serramenti: {
    tipo_clientela: 'mista',
    kpi: [
      { id:'preventivi_mensili',    label:'Preventivi/mese',             unita:'n.',  soglie:{ verde:[15,999], giallo:[7,14],  rosso:[0,6]   } },
      { id:'conversion_preventivo', label:'Conversion rate preventivo->ordine', unita:'%', soglie:{ verde:[30,100], giallo:[18,29], rosso:[0,17] } },
      { id:'valore_medio_commessa', label:'Valore medio commessa',         unita:'EUR', soglie:{ verde:[5000,9999999], giallo:[2000,4999], rosso:[0,1999] }, opzionale:true, contesto:'Importo medio per fornitura -- retail o B2B' },
      { id:'b2b_pct',               label:'% fatturato B2B (imprese edili)', unita:'%', soglie:{ verde:[30,100], giallo:[15,29], rosso:[0,14] }, note:'Sviluppare il B2B stabilizza il fatturato' },
      { id:'tempo_consegna_sett',   label:'Settimane medie di consegna', unita:'sett.', soglie:{ verde:[0,5],   giallo:[6,8],   rosso:[9,999] }, note:'> 8 settimane = vantaggio per competitor piu veloci' },
      { id:'soddisfazione_posa',    label:'% clienti soddisfatti della posa', unita:'%', soglie:{ verde:[90,100], giallo:[75,89], rosso:[0,74] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.conversion_preventivo < 20 && v.preventivi_mensili > 10, label:'! Tanti preventivi, poche chiusure', desc:'Alto volume di preventivi ma bassa conversione: o il prezzo non e competitivo o il processo di follow-up e carente.', livello:'giallo' },
      { condizione: (v) => v.b2b_pct < 15 && v.valore_medio_commessa < 3000, label:'! Troppo dipendente dal privato piccolo', desc:'Solo clienti privati con ticket basso: marginalita ridotta e stagionalita forte. Sviluppare rapporti con imprese edili.', livello:'giallo' },
    ],
  },

  // =============================== COMMERCIO ================================

  commercio_distribuzione_industriale: {
    tipo_clientela: 'ricorrente',
    kpi: [
      { id:'clienti_attivi',        label:'Clienti attivi',              unita:'n.',  soglie:{ verde:[30,9999], giallo:[15,29], rosso:[0,14] } },
      { id:'fatturato_top3_pct',    label:'% fatturato top 3 clienti',   unita:'%',   soglie:{ verde:[0,35],    giallo:[36,55], rosso:[56,100] } },
      { id:'fill_rate_pct',         label:'Fill rate ordini (%)',         unita:'%',   soglie:{ verde:[96,100],  giallo:[90,95], rosso:[0,89]  }, note:'< 90% = stai regalando clienti ai competitor' },
      { id:'frequenza_ordini',      label:'Ordini/cliente/mese',         unita:'n.',  soglie:{ verde:[2,999],   gially:[1,1.9], rosso:[0,0.9] } },
      { id:'valore_medio_ordine',   label:'Valore medio ordine',         unita:'EUR',   soglie:{ verde:[500,9999999], giallo:[200,499], rosso:[0,199] }, opzionale:true, contesto:'Importo medio per singolo ordine cliente' },
      { id:'ciclo_incasso_gg',      label:'DSO (giorni incasso)',        unita:'gg',  soglie:{ verde:[0,45],    giallo:[46,75], rosso:[76,999] } },
      { id:'rotazione_magazzino',   label:'Rotazione magazzino (volte/anno)', unita:'x', soglie:{ verde:[8,999], giallo:[4,7],   rosso:[0,3]  }, note:'< 4 rotazioni = magazzino ingessato' },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.fill_rate_pct < 92 && v.frequenza_ordini < 2, label:' Servizio scarso + bassa fedelta', desc:'Ordini non evasi + clienti che ordinano poco: i clienti stanno probabilmente affiancando competitor piu affidabili.', livello:'rosso' },
      { condizione: (v) => v.rotazione_magazzino < 4 && v.fill_rate_pct < 95, label:'! Magazzino sbagliato', desc:'Stock che non ruota ma fill rate basso: stai tenendo i prodotti sbagliati e mancando quelli giusti.', livello:'rosso' },
      { condizione: (v) => v.ciclo_incasso_gg > 75 && v.fatturato_top3_pct > 50, label:'! Cash flow a rischio', desc:'Alta concentrazione + pagamenti lenti dai clienti principali: forte pressione sul circolante.', livello:'giallo' },
    ],
  },

  commercio_ingrosso_alimentare: {
    tipo_clientela: 'ricorrente',
    kpi: [
      { id:'clienti_attivi',       label:'Punti vendita/HO.RE.CA. attivi', unita:'n.', soglie:{ verde:[50,9999], giallo:[20,49], rosso:[0,19] } },
      { id:'fill_rate_pct',        label:'Fill rate ordini',            unita:'%',   soglie:{ verde:[97,100],  giallo:[92,96], rosso:[0,91]  }, note:'Nel food il fill rate e critico: rotture di stock = cliente perso' },
      { id:'frequenza_consegna',   label:'Frequenza consegna (gg/settimana)', unita:'x/sett.', soglie:{ verde:[3,999], giallo:[1,2], rosso:[0,0.9] } },
      { id:'sell_out_pct',         label:'% sell-out condiviso con clienti top', unita:'%', soglie:{ verde:[50,100], giallo:[20,49], rosso:[0,19] }, note:'Condividere i dati sell-out fidelizza il cliente' },
      { id:'churn_annuo_pct',      label:'Churn annuo clienti',         unita:'%',   soglie:{ verde:[0,15],    giallo:[16,25], rosso:[26,100] } },
      { id:'valore_medio_ordine',  label:'Valore medio ordine',         unita:'EUR',   soglie:{ verde:[300,9999999], giallo:[100,299], rosso:[0,99] }, opzionale:true, contesto:'Importo medio per consegna/ordine' },
      { id:'reso_pct',             label:'% merce resa/consegnata',     unita:'%',   soglie:{ verde:[0,3],     giallo:[4,7],   rosso:[8,100]  }, note:'Alto reso = problema qualita o over-selling' },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.fill_rate_pct < 95 && v.churn_annuo_pct > 20, label:' Servizio carente + alta perdita clienti', desc:'Nel food, la rottura di stock e imperdonabile. Il churn alto conferma che i clienti stanno passando a distributori piu affidabili.', livello:'rosso' },
      { condizione: (v) => v.reso_pct > 7 && v.churn_annuo_pct > 15, label:'! Qualita o over-selling', desc:'Alto reso correlato con perdita clienti: o la qualita del prodotto e insoddisfacente o si sta spingendo troppo prodotto.', livello:'rosso' },
    ],
  },

  commercio_materiali_edili: {
    tipo_clientela: 'mista',
    kpi: [
      { id:'clienti_professionali', label:'Clienti professionali attivi (imprese/geo)', unita:'n.', soglie:{ verde:[30,9999], giallo:[12,29], rosso:[0,11] } },
      { id:'fatturato_b2b_pct',    label:'% fatturato B2B professionale', unita:'%', soglie:{ verde:[60,100], giallo:[40,59], rosso:[0,39]  }, note:'Piu B2B = piu stabilita e margini migliori' },
      { id:'valore_medio_scontrino_b2b', label:'Valore medio ordine B2B', unita:'EUR', soglie:{ verde:[500,9999999], giallo:[200,499], rosso:[0,199] } },
      { id:'frequenza_b2b',        label:'Frequenza ordini B2B (al mese)', unita:'x', soglie:{ verde:[4,999],  giallo:[2,3],   rosso:[0,1]   } },
      { id:'consegna_cantiere_pct', label:'% ordini consegnati in cantiere', unita:'%', soglie:{ verde:[40,100], giallo:[20,39], rosso:[0,19] }, note:'La consegna in cantiere aumenta fidelizzazione' },
      { id:'fill_rate_pct',        label:'Fill rate da magazzino',       unita:'%',   soglie:{ verde:[92,100],  giallo:[82,91], rosso:[0,81]  } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.fatturato_b2b_pct < 40 && v.valore_medio_scontrino_b2b < 300, label:'! Troppo retail, margini compressi', desc:'Dipendenza dal cliente privato con scontrini bassi: alta operativita, bassa marginalita. Sviluppare la rete professionale e prioritario.', livello:'giallo' },
    ],
  },

  commercio_ricambi_auto: {
    // Profilo adattivo: B2B distribuzione a officine OPPURE retail al dettaglio (es. Norauto)
    // I KPI con campo 'opzionale:true' non vengono penalizzati se assenti
    tipo_clientela: 'mista',
    kpi: [
      // -- KPI rilevanti per TUTTI (distribuzione + retail) --
      { id:'valore_medio_ordine',   label:'Valore medio transazione',   unita:'EUR',
        soglie:{ verde:[60,9999999], giallo:[25,59], rosso:[0,24] },
        note:'Scontrino al banco per il retail . valore ordine per il B2B a officine' },
      { id:'clienti_giornalieri',   label:'Clienti/transazioni al giorno', unita:'n.',
        soglie:{ verde:[15,9999], giallo:[6,14], rosso:[0,5] },
        note:'Ingressi in negozio per il retail . ordini ricevuti per il B2B' },

      // -- KPI B2B distribuzione (opzionali per il retail) --
      { id:'officine_attive',       label:'Officine clienti B2B (se applicabile)', unita:'n.',
        soglie:{ verde:[20,9999], giallo:[8,19], rosso:[0,7] },
        opzionale: true,
        contesto: 'Solo per distributori B2B a officine -- lascia vuoto se vendi al privato',
        note:'Non compilare se sei un negozio al dettaglio' },
      { id:'fill_rate_pct',         label:'Fill rate (B2B -- se applicabile)', unita:'%',
        soglie:{ verde:[93,100], giallo:[85,92], rosso:[0,84] },
        opzionale: true,
        contesto: 'Solo per distributori che evadono ordini B2B -- non applicabile al retail',
        note:'Lascia vuoto se sei un negozio al dettaglio' },
      { id:'tempo_consegna_h',      label:'Tempo consegna B2B (ore)',   unita:'h',
        soglie:{ verde:[0,2], giallo:[3,4], rosso:[5,999] },
        opzionale: true,
        contesto: 'Solo per distributori con consegna a domicilio/officina',
        note:'Non applicabile al negozio al banco' },
      { id:'churn_annuo_pct',       label:'Churn annuo clienti B2B',    unita:'%',
        soglie:{ verde:[0,15], giallo:[16,25], rosso:[26,100] },
        opzionale: true,
        contesto: 'Solo se hai officine o clienti B2B ricorrenti',
        dipende_da: 'officine_attive' },

      // -- KPI retail (opzionali per il B2B puro) --
      { id:'conversion_rate',       label:'Conversion rate al banco',   unita:'%',
        soglie:{ verde:[40,100], giallo:[25,39], rosso:[0,24] },
        opzionale: true,
        contesto: 'Solo per negozi al dettaglio con traffico walk-in',
        note:'Quanti clienti che entrano comprano effettivamente' },
      { id:'clienti_online_pct',    label:'% ordini via app/portale/e-commerce', unita:'%',
        soglie:{ verde:[25,100], giallo:[8,24], rosso:[0,7] },
        note:'Canale digitale -- rilevante per tutti' },
    ],
    diagnosi_legami: [
      // Diagnosi contestualizzate
      { condizione: (v) => v.officine_attive > 0 && v.tempo_consegna_h > 3 && v.churn_annuo_pct > 20,
        label:' Consegna lenta = officine che migrano',
        desc:'Il meccanico ha il cliente in officina e non puo aspettare. Tempi > 3 ore spiegano direttamente il churn alto.',
        livello:'rosso' },
      { condizione: (v) => v.officine_attive > 0 && v.fill_rate_pct < 88,
        label:'! Fill rate insufficiente per il B2B',
        desc:'Le officine dipendono da te per non fermare i lavori. Fill rate < 88% significa perdere clienti B2B a favore di competitor piu affidabili.',
        livello:'rosso' },
      { condizione: (v) => !v.officine_attive && v.conversion_rate < 25,
        label:'! Bassa conversione al banco',
        desc:'Molti clienti entrano ma pochi comprano: o il catalogo non copre i pezzi richiesti o il personale non riesce a trovare il ricambio giusto velocemente.',
        livello:'giallo' },
      { condizione: (v) => v.clienti_online_pct < 8 && v.clienti_giornalieri > 15,
        label:'! Alto volume ancora analogico',
        desc:'Tante transazioni ma zero digitale: margini operativi compressi. Un portale ordini o un catalogo online riducono i costi di gestione.',
        livello:'giallo' },
    ],
  },

  commercio_abbigliamento_ingrosso: {
    tipo_clientela: 'mista',
    kpi: [
      { id:'buyer_attivi',          label:'Buyer/retailer attivi',       unita:'n.',  soglie:{ verde:[30,9999], giallo:[15,29], rosso:[0,14] } },
      { id:'sell_through_pct',      label:'Sell-through medio stagione', unita:'%',   soglie:{ verde:[70,100],  giallo:[50,69], rosso:[0,49]  } },
      { id:'ordini_anticipati_pct', label:'% ordinato anticipato',      unita:'%',   soglie:{ verde:[50,100],  giallo:[25,49], rosso:[0,24]  } },
      { id:'reso_invenduto_pct',    label:'% reso invenduto',           unita:'%',   soglie:{ verde:[0,12],    giallo:[13,22], rosso:[23,100] } },
      { id:'valore_medio_ordine',   label:'Valore medio ordine stagionale', unita:'EUR', soglie:{ verde:[5000,9999999], giallo:[2000,4999], rosso:[0,1999] } },
      { id:'dso_gg',                label:'DSO (giorni incasso)',        unita:'gg',  soglie:{ verde:[0,60],    giallo:[61,90], rosso:[91,999] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.sell_through_pct < 55 && v.reso_invenduto_pct > 18, label:' Collezione fuori mercato', desc:'Scarso sell-through + alto reso: i prodotti non vendono. Problema di trend, pricing o assortimento sbagliato.', livello:'rosso' },
    ],
  },

  commercio_elettronica: {
    tipo_clientela: 'mista',
    kpi: [
      { id:'conversion_rate_store', label:'Conversion rate in-store',   unita:'%',   soglie:{ verde:[35,100], giallo:[20,34], rosso:[0,19]  } },
      { id:'scontrino_medio',       label:'Scontrino medio',            unita:'EUR',   soglie:{ verde:[200,9999999], giallo:[80,199], rosso:[0,79] }, opzionale:true, contesto:'Valore medio per transazione -- inserisci se disponibile' },
      { id:'attach_rate_garanzie',  label:'Attach rate garanzie estese', unita:'%',  soglie:{ verde:[35,100], giallo:[20,34], rosso:[0,19]  }, note:'Le garanzie estese sono il 30% del margine totale' },
      { id:'b2b_pct',               label:'% fatturato B2B',            unita:'%',   soglie:{ verde:[25,100], giallo:[10,24], rosso:[0,9]   } },
      { id:'online_pct',            label:'% vendite online',           unita:'%',   soglie:{ verde:[20,100], giallo:[5,19],  rosso:[0,4]   }, note:'Senza canale online si perde contro Amazon' },
      { id:'ritorno_cliente_pct',   label:'% clienti che tornano (loyalty)', unita:'%', soglie:{ verde:[30,100], giallo:[15,29], rosso:[0,14] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.attach_rate_garanzie < 20 && v.scontrino_medio < 150, label:'! Scontrini bassi senza margine da servizi', desc:'Scontrino medio basso + zero attach garanzie: la marginalita e minima. Formare i venditori sul cross-selling e sulle garanzie e urgente.', livello:'rosso' },
      { condizione: (v) => v.online_pct < 5 && v.conversion_rate_store < 25, label:'! Ne online ne offline performanti', desc:'Assenza digitale e conversion rate basso in store: i clienti confrontano i prezzi online e comprano altrove.', livello:'rosso' },
      { condizione: (v) => v.b2b_pct > 25 && v.scontrino_medio > 300, label:'✅ Mix sano B2B + alto scontrino', desc:'Buona quota B2B con scontrini elevati: marginalita sostenibile e meno dipendenza dal traffico walk-in.', livello:'verde' },
    ],
  },

  commercio_abbigliamento_dettaglio: {
    tipo_clientela: 'transazionale',
    kpi: [
      { id:'ingressi_giornalieri',  label:'Ingressi medi/giorno',        unita:'n.',  soglie:{ verde:[30,9999], giallo:[12,29], rosso:[0,11]  } },
      { id:'conversion_rate',       label:'Conversion rate (ingressi->acquisti)', unita:'%', soglie:{ verde:[35,100], giallo:[20,34], rosso:[0,19] } },
      { id:'scontrino_medio',       label:'Scontrino medio',             unita:'EUR',   soglie:{ verde:[80,9999999], giallo:[40,79], rosso:[0,39]  }, opzionale:true, contesto:'Valore medio per scontrino/acquisto -- spesso non monitorato' },
      { id:'upt',                   label:'UPT (pezzi per scontrino)',   unita:'pz',  soglie:{ verde:[2.5,999], giallo:[1.5,2.4], rosso:[0,1.4] }, note:'UPT basso = mancanza di cross-selling' },
      { id:'fidelity_pct',          label:'% acquisti da clienti fidelizzati', unita:'%', soglie:{ verde:[40,100], giallo:[20,39], rosso:[0,19] } },
      { id:'sell_through_saldi',    label:'Sell-through a inizio saldi', unita:'%',   soglie:{ verde:[70,100],  giallo:[50,69], rosso:[0,49]  }, note:'< 50% = eccesso stock non venduto a prezzo pieno' },
      { id:'fatturato_per_mq',      label:'Fatturato per mq',            unita:'EUR/mq', soglie:{ verde:[3000,9999999], giallo:[1500,2999], rosso:[0,1499] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.conversion_rate < 20 && v.ingressi_giornalieri > 20, label:'! Tanto traffico, poco convertito', desc:'Molti ingressi ma poca conversione: il prodotto non convince, il personale non approccio, o il prezzo e percepito alto.', livello:'giallo' },
      { condizione: (v) => v.upt < 1.5 && v.scontrino_medio < 50, label:'! Zero cross-selling', desc:'Scontrini mono-prodotto e bassi: il personale non sta facendo abbinamenti. Ogni +1 UPT equivale a +30-40% di scontrino medio.', livello:'giallo' },
      { condizione: (v) => v.sell_through_saldi < 50 && v.fatturato_per_mq < 2000, label:' Assortimento sbagliato + bassa produttivita', desc:'Stock invenduto + spazio sotto-sfruttato: problema di acquisto merci o posizionamento del negozio.', livello:'rosso' },
      { condizione: (v) => v.fidelity_pct > 40 && v.conversion_rate > 35, label:'✅ Store ad alta performance', desc:'Buona fidelizzazione + alta conversione: il negozio funziona bene. Focus sulla crescita dello scontrino medio.', livello:'verde' },
    ],
  },

  commercio_orologi_gioielli: {
    tipo_clientela: 'occasionale',
    kpi: [
      { id:'scontrino_medio',       label:'Scontrino medio',             unita:'EUR',   soglie:{ verde:[500,9999999], giallo:[200,499], rosso:[0,199] }, opzionale:true, contesto:'Valore medio per acquisto -- inserisci se lo conosci' },
      { id:'transazioni_mese',      label:'Transazioni/mese',            unita:'n.',  soglie:{ verde:[30,9999], giallo:[12,29], rosso:[0,11]  } },
      { id:'clienti_vip_pct',       label:'% fatturato clienti VIP (top 20%)', unita:'%', soglie:{ verde:[50,100], giallo:[30,49], rosso:[0,29] } },
      { id:'referral_rate',         label:'% acquirenti da referral',    unita:'%',   soglie:{ verde:[40,100],  giallo:[20,39], rosso:[0,19]  } },
      { id:'ritorno_clienti_pct',   label:'% clienti che riacquistano',  unita:'%',   soglie:{ verde:[35,100],  giallo:[18,34], rosso:[0,17]  } },
      { id:'picco_natale_pct',      label:'% fatturato nel periodo natalizio', unita:'%', soglie:{ verde:[25,45], giallo:[15,24], rosso:[46,100] }, note:'> 45% = eccessiva stagionalita, rischio' },
      { id:'valore_stock_giorni',   label:'Giacenza media stock (giorni di vendita)', unita:'gg', soglie:{ verde:[0,180], giallo:[181,360], rosso:[361,999] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.referral_rate < 20 && v.ritorno_clienti_pct < 20, label:'! Zero effetto virale', desc:'Nel lusso, referral e riacquisto sono la colonna vertebrale del business. Senza di essi, si dipende solo dal traffico casuale -- insostenibile nel lungo periodo.', livello:'rosso' },
      { condizione: (v) => v.picco_natale_pct > 45 && v.transazioni_mese < 20, label:'! Business troppo stagionale', desc:'Quasi meta del fatturato in un solo periodo con transazioni basse il resto dell\'anno: il business non e distribuito. Sviluppare eventi e occasioni durante l\'anno.', livello:'giallo' },
      { condizione: (v) => v.valore_stock_giorni > 360 && v.scontrino_medio < 400, label:' Stock fermo + scontrini bassi', desc:'Troppo capitale immobilizzato in stock che non ruota, con scontrini bassi: doppio problema di liquidita e posizionamento.', livello:'rosso' },
    ],
  },

  // =============================== ALIMENTARE ===============================

  alimentare_trasformazione: {
    tipo_clientela: 'ricorrente',
    kpi: [
      { id:'referenze_gdo',         label:'Referenze attive in GDO',    unita:'n.',  soglie:{ verde:[5,999],   giallo:[2,4],   rosso:[0,1]   } },
      { id:'sell_out_mensile_pct',  label:'Sell-through mensile GDO',   unita:'%',   soglie:{ verde:[80,100],  giallo:[60,79], rosso:[0,59]  } },
      { id:'insegne_gdo',           label:'Insegne GDO attive',         unita:'n.',  soglie:{ verde:[4,999],   giallo:[2,3],   rosso:[0,1]   } },
      { id:'export_pct',            label:'% fatturato export',         unita:'%',   soglie:{ verde:[20,100],  giallo:[5,19],  rosso:[0,4]   } },
      { id:'private_label_pct',     label:'% fatturato private label',  unita:'%',   soglie:{ verde:[0,35],    giallo:[36,55], rosso:[56,100] }, note:'> 55% PL = dipendenza dalla GDO, margini erosi' },
      { id:'listing_fee_pct',       label:'% fatturato in listing fee', unita:'%',   soglie:{ verde:[0,8],     giallo:[9,15],  rosso:[16,100] }, note:'Listing fee eccessivi erodono il margine' },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.private_label_pct > 55 && v.export_pct < 10, label:'! Prigioniero della GDO', desc:'Alta dipendenza dal private label con zero export: la GDO ha tutto il potere negoziale. Il brand proprietario e l\'export sono le leve di uscita.', livello:'rosso' },
      { condizione: (v) => v.sell_out_mensile_pct < 60 && v.listing_fee_pct > 12, label:' Margini erosi + bassa rotazione', desc:'I prodotti non vendono ma si pagano comunque i listing fee: doppia perdita. La GDO potrebbe presto de-listare le referenze.', livello:'rosso' },
    ],
  },

  alimentare_vini: {
    tipo_clientela: 'mista',
    kpi: [
      { id:'canali_attivi',         label:'Canali attivi (HO.RE.CA./GDO/export/DTC)', unita:'n.', soglie:{ verde:[3,9], giallo:[2,2], rosso:[0,1] } },
      { id:'export_pct',            label:'% fatturato export',         unita:'%',   soglie:{ verde:[30,100],  giallo:[10,29], rosso:[0,9]  } },
      { id:'prezzo_medio_bottiglia', label:'Prezzo medio bottiglia (ex-cantina)', unita:'EUR', soglie:{ verde:[10,999], giallo:[5,9.9], rosso:[0,4.9] } },
      { id:'dtc_pct',               label:'% vendite DTC (diretto al consumatore)', unita:'%', soglie:{ verde:[20,100], giallo:[5,19], rosso:[0,4] } },
      { id:'wine_club_iscritti',    label:'Iscritti wine club / mailing list', unita:'n.', soglie:{ verde:[200,9999], giallo:[50,199], rosso:[0,49] } },
      { id:'guide_presenza',        label:'Presenze su guide (Gambero, WS ecc.)', unita:'n.', soglie:{ verde:[2,999], giallo:[1,1], rosso:[0,0] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.prezzo_medio_bottiglia < 5 && v.private_label_pct > 40, label:'! Commodity trap', desc:'Prezzo basso + alta quota di sfuso/PL: la cantina non ha posizionamento premium. Molto difficile crescere in redditivita senza investire in brand.', livello:'rosso' },
      { condizione: (v) => v.dtc_pct < 5 && v.wine_club_iscritti < 100, label:'! Zero relazione diretta col consumatore', desc:'Senza canale diretto e senza community, tutta la relazione col consumatore e mediata da distributori: margini bassi e zero fedelta.', livello:'giallo' },
    ],
  },

  alimentare_forno: {
    tipo_clientela: 'ricorrente',
    kpi: [
      { id:'punti_vendita_attivi',  label:'Punti vendita serviti',       unita:'n.',  soglie:{ verde:[30,9999], giallo:[12,29], rosso:[0,11]  } },
      { id:'frequenza_consegna',    label:'Frequenza consegne/sett.',    unita:'x',   soglie:{ verde:[3,999],   giallo:[2,2],   rosso:[0,1]   } },
      { id:'reso_invenduto_pct',    label:'% reso invenduto',           unita:'%',   soglie:{ verde:[0,5],     giallo:[6,10],  rosso:[11,100] } },
      { id:'fill_rate_pct',         label:'Fill rate ordini',            unita:'%',   soglie:{ verde:[97,100],  giallo:[92,96], rosso:[0,91]  } },
      { id:'churn_annuo_pct',       label:'Churn annuo clienti',         unita:'%',   soglie:{ verde:[0,15],    giallo:[16,25], rosso:[26,100] } },
      { id:'stagionale_pct',        label:'% fatturato da picchi stagionali', unita:'%', soglie:{ verde:[20,45], giallo:[46,60], rosso:[61,100] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.reso_invenduto_pct > 10 && v.fill_rate_pct < 95, label:'! Sovra-fornitura + rotture', desc:'Alto reso (troppe consegne) ma fill rate basso (mancano alcuni prodotti): il sistema di previsione ordini e inefficiente.', livello:'giallo' },
    ],
  },

  alimentare_conserve: {
    tipo_clientela: 'ricorrente',
    kpi: [
      { id:'insegne_gdo',           label:'Insegne GDO attive',         unita:'n.',  soglie:{ verde:[4,999],   giallo:[2,3],   rosso:[0,1]   } },
      { id:'referenze_attive',      label:'Referenze totali attive',    unita:'n.',  soglie:{ verde:[10,999],  giallo:[4,9],   rosso:[0,3]   } },
      { id:'sell_out_pct',          label:'Sell-through mensile',       unita:'%',   soglie:{ verde:[78,100],  giallo:[58,77], rosso:[0,57]  } },
      { id:'export_pct',            label:'% export su fatturato',      unita:'%',   soglie:{ verde:[20,100],  giallo:[5,19],  rosso:[0,4]   } },
      { id:'private_label_pct',     label:'% fatturato private label',  unita:'%',   soglie:{ verde:[0,40],    giallo:[41,60], rosso:[61,100] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.sell_out_pct < 60 && v.referenze_attive > 8, label:'! Troppe referenze che non vendono', desc:'Portafoglio ampio ma scarso sell-through: diluisce la visibilita a scaffale. Meglio poche referenze forti che molte invisibili.', livello:'giallo' },
    ],
  },

  alimentare_ingredienti: {
    tipo_clientela: 'ricorrente',
    kpi: [
      { id:'clienti_industriali',   label:'Clienti industriali attivi', unita:'n.',  soglie:{ verde:[8,9999],  giallo:[3,7],   rosso:[0,2]   } },
      { id:'contratti_fornitura',   label:'Contratti pluriennali attivi', unita:'n.', soglie:{ verde:[3,9999], giallo:[1,2],   rosso:[0,0]   } },
      { id:'rd_pct',                label:'% fatturato da co-sviluppo R&D', unita:'%', soglie:{ verde:[15,100], giallo:[5,14], rosso:[0,4]  }, note:'Il co-sviluppo e il lock-in piu forte' },
      { id:'dso_gg',                label:'DSO (giorni incasso)',        unita:'gg',  soglie:{ verde:[0,60],    giallo:[61,90], rosso:[91,999] } },
      { id:'churn_annuo_pct',       label:'Churn annuo clienti',         unita:'%',   soglie:{ verde:[0,8],    giallo:[9,15],  rosso:[16,100] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.contratti_fornitura === 0 && v.churn_annuo_pct > 10, label:'! Nessun vincolo contrattuale + alta perdita clienti', desc:'Senza contratti pluriennali i clienti industriali possono cambiare fornitore da un giorno all\'altro. Il co-sviluppo R&D e l\'unico vero lock-in.', livello:'rosso' },
    ],
  },

  // =============================== TECH =====================================

  tech_saas: {
    tipo_clientela: 'ricorrente',
    kpi: [
      { id:'mrr',                   label:'MRR (Monthly Recurring Revenue)', unita:'EUR', soglie:{ verde:[5000,9999999], giallo:[1000,4999], rosso:[0,999] } },
      { id:'arr',                   label:'ARR (Annual Recurring Revenue)', unita:'EUR',  soglie:{ verde:[60000,9999999], giallo:[12000,59999], rosso:[0,11999] } },
      { id:'churn_mensile_pct',     label:'Churn mensile',                  unita:'%',  soglie:{ verde:[0,1.5],  giallo:[1.6,4],  rosso:[4.1,100] } },
      { id:'nrr',                   label:'NRR (Net Revenue Retention)',    unita:'%',  soglie:{ verde:[100,999], giallo:[85,99], rosso:[0,84]   }, note:'NRR > 100% = i clienti esistenti crescono' },
      { id:'ltv_cac',               label:'LTV/CAC ratio',                  unita:'x',  soglie:{ verde:[3,999],  giallo:[1.5,2.9], rosso:[0,1.4] }, note:'< 1.5x = si spende piu per acquisire che si guadagna' },
      { id:'trial_conversion_pct',  label:'Trial to Paid conversion',       unita:'%',  soglie:{ verde:[20,100], giallo:[10,19],  rosso:[0,9]   } },
      { id:'acv',                   label:'ACV -- Valore contratto annuale medio', unita:'EUR', soglie:{ verde:[5000,9999999], giallo:[1200,4999], rosso:[0,1199] }, opzionale:true, contesto:'Annual Contract Value -- il "scontrino" del SaaS B2B' },
      { id:'time_to_value_gg',      label:'Time to first value (giorni)',   unita:'gg', soglie:{ verde:[0,3],    giallo:[4,14],  rosso:[15,999] }, note:'> 14 gg senza valore = rischio abbandono trial' },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.churn_mensile_pct > 4 && v.nrr < 90, label:' SaaS in crisi di retention', desc:'Churn alto + NRR basso: i clienti se ne vanno e quelli che restano non espandono. Problema di product-market fit o di customer success.', livello:'rosso' },
      { condizione: (v) => v.ltv_cac < 1.5 && v.trial_conversion_pct < 12, label:' Unit economics non sostenibili', desc:'Si spende piu per acquisire i clienti di quanto valgono, e il trial non converte: il business model ha problemi strutturali.', livello:'rosso' },
      { condizione: (v) => v.nrr > 110 && v.churn_mensile_pct < 1.5, label:'✅ SaaS sano: crescita da clienti esistenti', desc:'NRR > 110% significa che la crescita avviene anche senza nuovi clienti: upsell e espansione funzionano. Questo e il modello ideale.', livello:'verde' },
    ],
  },

  tech_system_integrator: {
    tipo_clientela: 'mista',
    kpi: [
      { id:'clienti_attivi',         label:'Clienti con contratto attivo', unita:'n.', soglie:{ verde:[10,9999], giallo:[5,9],   rosso:[0,4]   } },
      { id:'managed_services_pct',   label:'% fatturato managed services', unita:'%', soglie:{ verde:[40,100],  giallo:[20,39], rosso:[0,19]  }, note:'> 40% managed services = revenue stabile' },
      { id:'nps',                    label:'NPS post-delivery',           unita:'',   soglie:{ verde:[45,100],  giallo:[20,44], rosso:[-100,19] } },
      { id:'billable_rate_pct',      label:'% ore fatturabili su disponibili', unita:'%', soglie:{ verde:[70,100], giallo:[55,69], rosso:[0,54] }, note:'< 55% = risorse non sfruttate, costi fissi alti' },
      { id:'valore_medio_progetto',  label:'Valore medio progetto',       unita:'EUR',  soglie:{ verde:[50000,9999999], giallo:[20000,49999], rosso:[0,19999] }, opzionale:true, contesto:'Importo medio per progetto -- inserisci se monitorato' },
      { id:'ciclo_incasso_gg',       label:'DSO (giorni incasso)',        unita:'gg', soglie:{ verde:[0,45],    giallo:[46,75], rosso:[76,999] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.billable_rate_pct < 55 && v.managed_services_pct < 20, label:' Risorse inutilizzate + nessuna rendita', desc:'Persone non fatturate e tutto su progetti one-shot: i costi fissi del personale non sono coperti. Sviluppare i contratti managed services e urgente.', livello:'rosso' },
      { condizione: (v) => v.nps < 20 && v.clienti_attivi < 8, label:'! Clienti insoddisfatti in un portafoglio piccolo', desc:'NPS basso con pochi clienti: il passaparola negativo puo bloccare la crescita in un mercato dove la reputazione e tutto.', livello:'rosso' },
    ],
  },

  tech_digital_agency: {
    tipo_clientela: 'mista',
    kpi: [
      { id:'clienti_retainer',      label:'Clienti in retainer mensile', unita:'n.',  soglie:{ verde:[5,9999],  giallo:[2,4],   rosso:[0,1]   } },
      { id:'retainer_pct',          label:'% fatturato da retainer',     unita:'%',   soglie:{ verde:[50,100],  giallo:[25,49], rosso:[0,24]  } },
      { id:'churn_annuo_pct',       label:'Churn annuo clienti retainer', unita:'%',  soglie:{ verde:[0,20],    giallo:[21,35], rosso:[36,100] } },
      { id:'valore_medio_cliente',  label:'Revenue media per cliente/anno', unita:'EUR', soglie:{ verde:[20000,9999999], giallo:[8000,19999], rosso:[0,7999] }, opzionale:true, contesto:'Fatturato medio annuo per cliente -- il tuo "scontrino" annuale' },
      { id:'revenue_per_persona',   label:'Revenue per dipendente',      unita:'EUR',   soglie:{ verde:[80000,9999999], giallo:[50000,79999], rosso:[0,49999] } },
      { id:'referral_rate',         label:'% nuovi clienti da referral', unita:'%',   soglie:{ verde:[50,100],  giallo:[25,49], rosso:[0,24]  } },
      { id:'nessun_cliente_max_pct', label:'Cliente piu grande su fatturato', unita:'%', soglie:{ verde:[0,25], giallo:[26,40], rosso:[41,100] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.retainer_pct < 25 && v.referral_rate < 25, label:'! Revenue fragile su entrambi i fronti', desc:'Poco ricorrente e pochi referral: ogni mese si dipende da progetti nuovi trovati con fatica. Business stressante e non scalabile.', livello:'rosso' },
      { condizione: (v) => v.nessun_cliente_max_pct > 40 && v.churn_annuo_pct > 25, label:' Cliente dominante a rischio', desc:'Un cliente da solo supera il 40% del fatturato e il churn e alto: la perdita di quel cliente puo essere fatale.', livello:'rosso' },
      { condizione: (v) => v.revenue_per_persona < 50000 && v.retainer_pct < 30, label:'! Produttivita bassa', desc:'Revenue per persona bassa + poco ricorrente: le persone lavorano tanto su progetti che non generano abbastanza fatturato.', livello:'giallo' },
    ],
  },

  tech_automazione: {
    tipo_clientela: 'occasionale',
    kpi: [
      { id:'progetti_anno',          label:'Progetti avviati/anno',       unita:'n.',  soglie:{ verde:[3,999],  giallo:[1,2],   rosso:[0,0]   } },
      { id:'valore_medio_progetto',  label:'Valore medio progetto/impianto', unita:'EUR', soglie:{ verde:[100000,9999999], giallo:[40000,99999], rosso:[0,39999] }, opzionale:true, contesto:'Importo medio per impianto installato -- inserisci se disponibile' },
      { id:'manutenzione_pct',       label:'% fatturato da manutenzione', unita:'%',   soglie:{ verde:[20,100],  giallo:[10,19], rosso:[0,9]   } },
      { id:'payback_offerto_mesi',   label:'Payback period medio offerto', unita:'mesi', soglie:{ verde:[0,24],  giallo:[25,36], rosso:[37,999] }, note:'> 36 mesi = difficile giustificare l\'investimento' },
      { id:'pipeline_valore',        label:'Valore pipeline corrente',    unita:'EUR',   soglie:{ verde:[200000,9999999], giallo:[80000,199999], rosso:[0,79999] } },
      { id:'utilizzo_incentivi_pct', label:'% clienti con incentivi 4.0/5.0', unita:'%', soglie:{ verde:[60,100], giallo:[30,59], rosso:[0,29] } },
    ],
    diagnosi_legami: [
      { condizione: (v) => v.manutenzione_pct < 10 && v.progetti_anno < 3, label:'! Zero rendita, business irregolare', desc:'Pochi progetti e nessuna manutenzione: il fatturato e imprevedibile. I contratti di manutenzione sono la base per stabilizzare il business.', livello:'rosso' },
      { condizione: (v) => v.utilizzo_incentivi_pct < 30 && v.payback_offerto_mesi > 30, label:'! Non stai sfruttando gli incentivi', desc:'Payback lungo e basso utilizzo degli incentivi 4.0/5.0: gli incentivi possono ridurre il payback del 30-50%, rendendo le proposte molto piu convincenti.', livello:'giallo' },
    ],
  },

};

// -- Helper: colori per le soglie ------------------------------------------
function getSogliaColor(valore, soglie) {
  if (valore === null || valore === undefined || valore === '') return null;
  const v = parseFloat(valore);
  if (isNaN(v)) return null;
  if (soglie.verde && v >= soglie.verde[0] && v <= soglie.verde[1]) return 'verde';
  if (soglie.giallo && v >= soglie.giallo[0] && v <= soglie.giallo[1]) return 'giallo';
  if (soglie.rosso && v >= soglie.rosso[0] && v <= soglie.rosso[1]) return 'rosso';
  // gestisci 'giallo' scritto male (giallo con typo)
  const keys = Object.keys(soglie);
  for (const k of keys) {
    if (k.startsWith('gial') && v >= soglie[k][0] && v <= soglie[k][1]) return 'giallo';
  }
  return null;
}

const SOGLIA_COLORS = {
  verde:  { bg:'var(--green-bg)',  text:'var(--green)', border:'var(--green)', icon:'v' },
  giallo: { bg:'var(--amber-bg)',  text:'var(--gold)',  border:'var(--gold)',  icon:'!' },
  rosso:  { bg:'var(--red-bg)',    text:'var(--red)',   border:'var(--red)',   icon:'!' },
};


const DIMS = [
  {id:'vendite',label:'Struttura commerciale'},
  {id:'pipeline',label:'Pipeline & CRM'},
  {id:'team',label:'Capitale umano'},
  {id:'processi',label:'Processi & script'},
  {id:'ricavi',label:'Prevedibilità ricavi'},
  {id:'marketing',label:'Marketing & lead gen'},
  {id:'sitoweb',label:'Sito web'},
  {id:'ecommerce',label:'E-commerce & digital'},
];

function getDimLabel(settore, dimId) {
  const macro = (typeof MICRO_TO_MACRO !== 'undefined' && MICRO_TO_MACRO[settore]) || settore;
  const parts = settore ? settore.split('_') : [];
  const prefix = parts[0] || '';
  const suffix = parts.slice(1).join('_') || '';

  const OVERRIDE = {
    manifatturiero: {
      ecommerce: "Parco macchine & capacità produttiva"
    },
    elettromeccanica: {
      ecommerce: "Attrezzatura tecnica & R&D"
    },
    edilizia: {
      vendite: "Sviluppo clienti",
      pipeline: "Pipeline & preventivi",
      team: "Organizzazione",
      processi: "Capacità tecnica & ufficio tecnico",
      ricavi: "Dotazione cantiere",
      sitoweb: "Sito Web",
      ecommerce: "Cantieri & Preventivazione"
    },
    auto_moto_nuovo: {
      ecommerce: "After Sales & Service"
    },
    auto_moto_usato: {
      ecommerce: "Approvvigionamento & parco veicoli"
    },
    abbigliamento_dettaglio: {
      ecommerce: "Presenza digitale & omnicanalità"
    },
    orologi_gioielli: {
      ecommerce: "Pre-owned & marketplace"
    },
    distribuzione_industriale: {
      ecommerce: "Magazzino & logistica"
    },
    ingrosso_alimentare: {
      ecommerce: "Logistica & catena del freddo"
    },
    materiali_edili: {
      ecommerce: "Logistica & consegna cantiere"
    },
    abbigliamento_ingrosso: {
      ecommerce: "Dropshipping & canali digitali"
    },
    ingredienti: {
      ecommerce: "Sviluppo prodotto & consulenza tecnica"
    },
    birra: {
      ecommerce: "Taproom & esperienza"
    },
    saas: {
      ecommerce: "Prodotto & Trial Experience"
    },
    system_integrator: {
      ecommerce: "Partnerships & Ecosistema Vendor"
    },
    digital_agency: {
      ecommerce: "Partnerships & Referral Network"
    },
    automazione: {
      ecommerce: "Partnerships & Ecosistema Vendor"
    },
    it: {
      ecommerce: "Partnerships & Ecosistema Vendor"
    },
    formazione: {
      ecommerce: "Partnerships & Referral Network"
    }
  };

  const DEFAULT = {
    vendite: "Vendite",
    pipeline: "Pipeline & CRM",
    team: "Organizzazione",
    processi: "Processi",
    ricavi: "Ricavi",
    marketing: "Marketing",
    sitoweb: "Sito Web",
    ecommerce: "E-commerce"
  };

  // Prima fonte: _label da STEP_DETAIL_BY_SETTORE (se disponibile)
  if (typeof STEP_DETAIL_BY_SETTORE !== 'undefined' && STEP_DETAIL_BY_SETTORE[settore]?.[dimId]?._label) {
    return STEP_DETAIL_BY_SETTORE[settore][dimId]._label;
  }
  return OVERRIDE[suffix]?.[dimId] || OVERRIDE[prefix]?.[dimId] || OVERRIDE[macro]?.[dimId] || DEFAULT[dimId] || dimId;
}

const DIM_DESC = {
  vendite:[
    `Solo il titolare vende -- nessun altro ha un ruolo commerciale attivo. Se lui si ferma, le vendite si fermano`,
    `Almeno una persona affianca il titolare nelle vendite: un commesso, un tecnico che vende, un socio o un agente plurimandatario (Enasarco). Le trattative pero dipendono ancora dalla relazione personale del titolare`,
    `Struttura commerciale definita: un responsabile vendite con obiettivi misurabili, agenti monomandatari o una rete di rivenditori con contratti e provvigioni chiari. Il titolare supervisiona ma non vende piu in prima persona`,
    `Piu canali attivi con KPI per ciascuno: vendita diretta + canale digitale, rete agenti + inside sales, negozio fisico + e-commerce. Ogni canale ha un responsabile e un budget`,
    `Struttura matura: il titolare e uscito completamente dalla vendita operativa. I canali funzionano in autonomia con forecast, target e revisioni mensili. La crescita non dipende da nessuna singola persona`
  ],
  pipeline:[
    `Nessuna pipeline -- le trattative vivono nella testa del titolare. Zero visibilita su quante sono, quanto valgono e dove sono bloccate`,
    `Lista clienti su Excel o foglio carta -- si sa chi e cliente ma non dove si trova ogni trattativa, da quanto tempo e qual e il valore potenziale`,
    `CRM base attivo (Pipedrive, HubSpot Free, Zoho CRM o simili) ma usato solo come rubrica -- i contatti ci sono, ma le fasi, le note e i follow-up non vengono tracciati`,
    `CRM usato attivamente per tracciare ogni trattativa con stage, valore e data chiusura stimata -- ma il forecast mensile e ancora impreciso e i dati non sono sempre aggiornati`,
    `Pipeline pulita con stage definiti e probabilita di chiusura per fase. Forecast mensile accurato condiviso col team. CRM aggiornato in tempo reale (HubSpot, Salesforce, Pipedrive Advanced)`
  ],
  team:[
    `Dipendenza totale dal titolare: lui sa tutto, decide tutto, gestisce tutti i clienti. Nessuno puo sostituirlo nemmeno per una settimana`,
    `Qualche collaboratore operativo ma zero autonomia decisionale -- il know-how critico, i contatti chiave e le decisioni importanti restano tutte nelle mani del titolare`,
    `Una o due persone gestiscono l'operativita quotidiana in autonomia (ordini, clienti standard, logistica) -- ma le trattative importanti e i clienti strategici restano al titolare`,
    `Team con ruoli definiti e competenze distribuite: ogni area ha un responsabile. Il titolare interviene sulle eccezioni, non sulla routine. Onboarding strutturato per i nuovi`,
    `Organizzazione scalabile: il titolare puo assentarsi 2-4 settimane senza impatto sul business. Il know-how e documentato, le relazioni clienti sono patrimonio aziendale, non personale`
  ],
  processi:[
    `Nessun processo scritto -- ogni trattativa si gestisce a istinto. Il modo di lavorare cambia da persona a persona e da giorno a giorno`,
    `Qualche abitudine consolidata ma nulla di scritto -- il know-how e nella testa di una persona. Se quella persona se ne va, si riparte da zero`,
    `Uno script base o una checklist esiste per qualche fase (es. come fare un preventivo, come rispondere a un lead) ma non e usato sistematicamente. Tenuto su Notion, Google Docs o simili`,
    `Processo di vendita documentato per le fasi principali: script di qualifica, template offerta, sequenza di follow-up, gestione obiezioni. Usato dal team, non solo dal titolare`,
    `Playbook commerciale completo: script per ogni fase, obiezioni mappate con risposte, onboarding cliente step-by-step, upsell documentato. Aggiornato regolarmente e replicabile da chiunque`
  ],
  ricavi:[
    `Fatturato imprevedibile -- ogni mese e una sorpresa. Zero contratti ricorrenti, zero abbonamenti, zero ordini programmati`,
    `Qualche cliente fisso che riordina, ma il grosso del fatturato arriva da opportunita spot. Impossibile fare previsioni attendibili oltre 4-6 settimane`,
    `Una stima trimestrale e possibile ma con margini di errore alti (+/-30%). Mancano dati storici strutturati e la pipeline non e ancora affidabile come base di forecast`,
    `Forecast abbastanza affidabile a 60-90 giorni basato su pipeline e storico ordini. Alcuni contratti ricorrenti o ordini programmati coprono il 20-30% del fatturato mensile`,
    `Revenue ricorrente oltre il 50% del fatturato. Forecast annuale affidabile con scostamento sotto il 15%. Budget commerciale costruito su dati reali e rivisto trimestralmente`
  ],
  marketing:[
    `Zero marketing attivo -- i clienti arrivano solo se li va a cercare il titolare o per passaparola. Nessuna presenza digitale strutturata`,
    `Profilo social o sito base esistente, ma nessuna attivita strutturata -- nessun post programmato, nessuna campagna, nessun lead generato digitalmente negli ultimi 90 giorni`,
    `Qualche contenuto pubblicato sui social o campagna Google/Meta attivata, ma senza piano editoriale, budget definito ne misurazione dei risultati (reach, click, lead generati)`,
    `Almeno un canale di lead gen attivo e misurabile: LinkedIn Ads, Google Ads, email marketing (Mailchimp, Brevo) o SEO con traffico organico tracciato su Google Analytics`,
    `Sistema di lead generation multi-canale con nurturing automatizzato (HubSpot, ActiveCampaign), KPI di conversione monitorati settimanalmente e budget allocato per canale con ROI misurato`
  ],
  sitoweb:[
    `Nessun sito web -- l'azienda non ha presenza online propria. Chi cerca online non trova nulla`,
    `Sito presente ma fermo da anni -- informazioni obsolete, non mobile-friendly, nessun aggiornamento recente. Probabilmente costruito su piattaforme vecchie (Jimdo, Wix basic, HTML statico)`,
    `Sito aggiornato con info base (chi siamo, contatti, servizi/prodotti) ma senza SEO, senza call-to-action chiare e senza tracciamento visite. Costruito su WordPress, Wix o Squarespace`,
    `Sito ottimizzato per SEO locale/settoriale, con pagine prodotto/servizio curate, form di contatto attivo e Google Analytics installato. Almeno 1 conversione misurabile al mese`,
    `Sito professionale con SEO avanzato, blog con contenuti regolari, form di lead gen, Google Analytics 4 + Search Console, A/B test attivi e velocita di caricamento ottimizzata`
  ],
  ecommerce:[
    `Zero presenza digitale -- nessun canale online sfruttato per vendere o acquisire clienti. Non si trova nemmeno su Google Maps`,
    `Profilo social attivo (Facebook/Instagram/LinkedIn) e/o scheda Google My Business verificata -- visibilita base garantita, ma nessuna vendita diretta ne lead strutturato generato online`,
    `Prima attivita di lead gen digitale: form contatti sul sito con risposta entro 24h, DM gestiti attivamente, qualche vendita online sporadica o WhatsApp Business per ordini rapidi`,
    `Canale digitale strutturato: e-commerce attivo (Shopify, WooCommerce, Prestashop) o portale ordini B2B con catalogo, prezzi e pagamenti. Ordini online gestiti con processo definito`,
    `Digital sales avanzato: automazioni di marketing (carrello abbandonato, upsell, email post-acquisto), remarketing attivo su Meta/Google, analytics per canale con ROI misurato mensilmente`
  ],
};

const STATUS_COLORS = {nuovo:'rgba(60,110,170,0.75)',contattato:'rgba(150,110,30,0.75)',diagnosi:'rgba(110,80,170,0.75)',proposta:'rgba(150,130,30,0.75)',chiuso:'rgba(40,120,70,0.75)'};

// Palette colori prospect ? 12 toni premium
const PROSPECT_PALETTE = [
  'rgba(150,110,30,0.75)', // oro
  'rgba(40,120,70,0.75)', // verde salvia
  '#4A7AB5', // blu
  '#A05AB5', // viola
  'rgba(170,50,40,0.75)', // rosso mattone
  '#3A9AB5', // teal
  '#B58A3A', // ambra scura
  '#5A8A4A', // verde bosco
  '#7A5AB5', // lavanda
  '#C06A3A', // arancio bruciato
  '#3A6AC0', // cobalto
  '#8A4A6A', // prugna
];

function getProspectColor(prospect) {
  if (prospect.color) return prospect.color;
  // Fallback: assign by index in array
  const idx = prospects.indexOf(prospect);
  return PROSPECT_PALETTE[(idx >= 0 ? idx : 0) % PROSPECT_PALETTE.length];
}

function assignNextColor() {
  return PROSPECT_PALETTE[prospects.length % PROSPECT_PALETTE.length];
}
const STATUS_LABELS = {nuovo:'Nuovo',contattato:'Contattato',diagnosi:'Diagnosi',proposta:'Proposta',chiuso:'Chiuso'};

const TETTO_BY_SETTORE = {
  manifatturiero_meccanica:          { ecommerce: 2, sitoweb: 4 },
  manifatturiero_automotive:         { ecommerce: 2, sitoweb: 4 },
  manifatturiero_packaging:          { ecommerce: 2, sitoweb: 4 },
  manifatturiero_cterzi:             { ecommerce: 1, sitoweb: 3 },
  manifatturiero_elettromeccanica:   { ecommerce: 2, sitoweb: 4 },
  manifatturiero_tessile_tessuti:    { ecommerce: 2, sitoweb: 4 },
  manifatturiero_tessile_capi:       { ecommerce: 3, sitoweb: 4 },
  edilizia_residenziale:             { ecommerce: 2, sitoweb: 4 },
  edilizia_impianti:                 { ecommerce: 2, sitoweb: 4 },
  edilizia_serramenti:               { ecommerce: 3, sitoweb: 4 },
  commercio_distribuzione_industriale: { ecommerce: 2, sitoweb: 4 },
  commercio_ingrosso_alimentare:     { ecommerce: 2, sitoweb: 3 },
  commercio_materiali_edili:         { ecommerce: 2, sitoweb: 4 },
  commercio_ricambi_auto:            { ecommerce: 4, sitoweb: 5 },
  commercio_abbigliamento_ingrosso:  { ecommerce: 2, sitoweb: 4 },
  commercio_elettronica:             { ecommerce: 5, sitoweb: 5 },
  commercio_auto_moto_nuovo:         { ecommerce: 2, sitoweb: 5 },
  commercio_auto_moto_usato:         { ecommerce: 3, sitoweb: 5 },
  commercio_abbigliamento_dettaglio: { ecommerce: 4, sitoweb: 5 },
  commercio_orologi_gioielli:        { ecommerce: 3, sitoweb: 5 },
  alimentare_trasformazione:         { ecommerce: 2, sitoweb: 4 },
  alimentare_vini:                   { ecommerce: 3, sitoweb: 5 },
  alimentare_forno:                  { ecommerce: 2, sitoweb: 4 },
  alimentare_conserve:               { ecommerce: 3, sitoweb: 4 },
  alimentare_ingredienti:            { ecommerce: 1, sitoweb: 3 },
  alimentare_birra:                  { ecommerce: 4, sitoweb: 5 },
  tech_saas:                         { ecommerce: 5, sitoweb: 5 },
  tech_system_integrator:            { ecommerce: 2, sitoweb: 4 },
  tech_digital_agency:               { ecommerce: 2, sitoweb: 4 },
  tech_automazione:                  { ecommerce: 2, sitoweb: 4 },
  servizi_it:                        { ecommerce: 2, sitoweb: 4 },
  servizi_formazione:                { ecommerce: 3, sitoweb: 4 },
};

const MATRICE_DIPENDENZE = {
  vendite:   ['pipeline', 'team'],
  marketing: ['sitoweb'],
  ecommerce: ['marketing', 'sitoweb'],
  team:      ['processi'],
  ricavi:    ['vendite', 'pipeline'],
  pipeline:  ['vendite'],
  processi:  ['team'],
  sitoweb:   ['marketing'],
};

const MATRICE_DIPENDENZE_BY_SETTORE = {
  commercio_auto_moto_usato: {
    vendite:   ['pipeline', 'team', 'ecommerce'],
    pipeline:  ['vendite', 'sitoweb'],
    team:      ['processi'],
    processi:  ['team'],
    ricavi:    ['vendite', 'pipeline', 'ecommerce'],
    marketing: ['sitoweb', 'ecommerce'],
    sitoweb:   ['marketing', 'ecommerce'],
    ecommerce: ['ricavi'],
  },
  commercio_auto_moto_nuovo: {
    vendite:   ['pipeline', 'team'],
    pipeline:  ['vendite', 'sitoweb'],
    team:      ['processi'],
    processi:  ['team'],
    ricavi:    ['vendite', 'pipeline'],
    marketing: ['sitoweb'],
    sitoweb:   ['marketing'],
    ecommerce: ['marketing', 'sitoweb'],
  },
};
window.MATRICE_DIPENDENZE_BY_SETTORE = MATRICE_DIPENDENZE_BY_SETTORE;

const BENCHMARK_KPI = {

  // ─── MANIFATTURIERO ───────────────────────────────────────────────
  manifatturiero_meccanica: {
    tasso_conversione_pct:   { basso:8,  medio:18, alto:32, unita:'%',  verso:'alto',  fonte:'Osservatorio PMI Manifatturiere Italiane 2023' },
    ciclo_vendita_gg:        { basso:90, medio:50, alto:25, unita:'gg', verso:'basso', fonte:'UCIMU — Indagine commerciale PMI 2023' },
    valore_medio_ordine:     { basso:5000, medio:18000, alto:60000, unita:'€', verso:'alto', fonte:'Stime settoriali ANIMA Confindustria' },
    concentrazione_top3_pct: { basso:65, medio:45, alto:25, unita:'%',  verso:'basso', fonte:'Osservatorio PMI Manifatturiere Italiane 2023' },
    tasso_riacquisto_pct:    { basso:35, medio:58, alto:78, unita:'%',  verso:'alto',  fonte:'Stime settoriali ANIMA Confindustria' },
    nuovi_clienti_anno:      { basso:3,  medio:8,  alto:20, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:10, medio:30, alto:80, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:15, medio:35, alto:55, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:3000, medio:1200, alto:400, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:90, medio:60, alto:30, unita:'gg', verso:'basso', fonte:'Banca d\'Italia — Tempi di pagamento PMI 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  manifatturiero_automotive: {
    tasso_conversione_pct:   { basso:10, medio:22, alto:38, unita:'%',  verso:'alto',  fonte:'ANFIA — Indagine componentistica 2023' },
    ciclo_vendita_gg:        { basso:120,medio:60, alto:25, unita:'gg', verso:'basso', fonte:'ANFIA — Indagine componentistica 2023' },
    valore_medio_ordine:     { basso:8000, medio:35000, alto:150000, unita:'€', verso:'alto', fonte:'Stime settoriali ANFIA' },
    concentrazione_top3_pct: { basso:75, medio:55, alto:30, unita:'%',  verso:'basso', fonte:'ANFIA — Indagine componentistica 2023' },
    tasso_riacquisto_pct:    { basso:50, medio:70, alto:88, unita:'%',  verso:'alto',  fonte:'Stime settoriali ANFIA' },
    nuovi_clienti_anno:      { basso:1,  medio:4,  alto:12, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:5,  medio:15, alto:40, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:20, medio:45, alto:65, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:5000, medio:2000, alto:600, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:90, medio:60, alto:30, unita:'gg', verso:'basso', fonte:'Banca d\'Italia — Tempi di pagamento PMI 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  manifatturiero_packaging: {
    tasso_conversione_pct:   { basso:10, medio:22, alto:38, unita:'%',  verso:'alto',  fonte:'Istituto Italiano Imballaggio 2023' },
    ciclo_vendita_gg:        { basso:60, medio:35, alto:15, unita:'gg', verso:'basso', fonte:'Istituto Italiano Imballaggio 2023' },
    valore_medio_ordine:     { basso:3000, medio:12000, alto:50000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:60, medio:40, alto:22, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:45, medio:68, alto:85, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:3,  medio:10, alto:25, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:12, medio:35, alto:90, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:20, medio:40, alto:60, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:2500, medio:900, alto:300, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:75, medio:50, alto:28, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  manifatturiero_cterzi: {
    tasso_conversione_pct:   { basso:12, medio:28, alto:48, unita:'%',  verso:'alto',  fonte:'Stime settoriali conto terzi' },
    ciclo_vendita_gg:        { basso:30, medio:15, alto:7,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:1500, medio:6000, alto:25000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:80, medio:60, alto:35, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:55, medio:75, alto:92, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:2,  medio:6,  alto:15, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:5,  medio:15, alto:35, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:30, medio:55, alto:75, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:1500, medio:500, alto:150, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:75, medio:45, alto:20, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  manifatturiero_elettromeccanica: {
    tasso_conversione_pct:   { basso:8,  medio:20, alto:35, unita:'%',  verso:'alto',  fonte:'Stime settoriali ANIE' },
    ciclo_vendita_gg:        { basso:90, medio:50, alto:22, unita:'gg', verso:'basso', fonte:'Stime settoriali ANIE' },
    valore_medio_ordine:     { basso:6000, medio:25000, alto:100000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:70, medio:48, alto:28, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:40, medio:62, alto:82, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:2,  medio:7,  alto:18, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:8,  medio:22, alto:55, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:20, medio:40, alto:60, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:4000, medio:1500, alto:500, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:90, medio:60, alto:30, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:500, alto:3000, unita:'€', verso:'alto', fonte:'Stime settoriali (contratti manutenzione)' },
  },

  manifatturiero_tessile_tessuti: {
    tasso_conversione_pct:   { basso:8,  medio:18, alto:32, unita:'%',  verso:'alto',  fonte:'Sistema Moda Italia 2023' },
    ciclo_vendita_gg:        { basso:60, medio:35, alto:15, unita:'gg', verso:'basso', fonte:'Sistema Moda Italia 2023' },
    valore_medio_ordine:     { basso:3000, medio:12000, alto:45000, unita:'€', verso:'alto', fonte:'Stime settoriali SMI' },
    concentrazione_top3_pct: { basso:65, medio:42, alto:22, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:40, medio:62, alto:80, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:3,  medio:8,  alto:20, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:10, medio:28, alto:70, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:15, medio:35, alto:55, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:2500, medio:900, alto:300, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:90, medio:60, alto:30, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  manifatturiero_tessile_capi: {
    tasso_conversione_pct:   { basso:6,  medio:15, alto:28, unita:'%',  verso:'alto',  fonte:'Sistema Moda Italia 2023' },
    ciclo_vendita_gg:        { basso:45, medio:25, alto:10, unita:'gg', verso:'basso', fonte:'Stime settoriali SMI' },
    valore_medio_ordine:     { basso:2000, medio:8000, alto:30000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:60, medio:38, alto:18, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:35, medio:58, alto:78, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:4,  medio:12, alto:30, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:15, medio:40, alto:100, unita:'n', verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:10, medio:28, alto:48, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:2000, medio:700, alto:200, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:75, medio:50, alto:25, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  // ─── EDILIZIA ─────────────────────────────────────────────────────
  edilizia_residenziale: {
    tasso_conversione_pct:   { basso:8,  medio:20, alto:38, unita:'%',  verso:'alto',  fonte:'ANCE — Osservatorio Congiunturale 2023' },
    ciclo_vendita_gg:        { basso:120,medio:60, alto:25, unita:'gg', verso:'basso', fonte:'ANCE 2023' },
    valore_medio_ordine:     { basso:15000, medio:50000, alto:200000, unita:'€', verso:'alto', fonte:'Stime settoriali ANCE' },
    concentrazione_top3_pct: { basso:55, medio:35, alto:18, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:15, medio:35, alto:58, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:3,  medio:8,  alto:20, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:5,  medio:15, alto:35, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:25, medio:50, alto:72, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:3000, medio:1000, alto:300, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:90, medio:55, alto:25, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  edilizia_impianti: {
    tasso_conversione_pct:   { basso:12, medio:28, alto:48, unita:'%',  verso:'alto',  fonte:'CNA Installatori 2023' },
    ciclo_vendita_gg:        { basso:45, medio:22, alto:8,  unita:'gg', verso:'basso', fonte:'CNA Installatori 2023' },
    valore_medio_ordine:     { basso:2000, medio:8000, alto:35000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:50, medio:30, alto:15, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:30, medio:55, alto:78, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:5,  medio:15, alto:40, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:20, medio:55, alto:130, unita:'n', verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:30, medio:55, alto:75, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:800, medio:300, alto:80, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:75, medio:45, alto:20, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:800, alto:4000, unita:'€', verso:'alto', fonte:'Stime settoriali (contratti manutenzione)' },
  },

  edilizia_serramenti: {
    tasso_conversione_pct:   { basso:10, medio:25, alto:42, unita:'%',  verso:'alto',  fonte:'Uncsaal 2023' },
    ciclo_vendita_gg:        { basso:45, medio:22, alto:8,  unita:'gg', verso:'basso', fonte:'Uncsaal 2023' },
    valore_medio_ordine:     { basso:3000, medio:10000, alto:40000, unita:'€', verso:'alto', fonte:'Stime settoriali Uncsaal' },
    concentrazione_top3_pct: { basso:45, medio:28, alto:12, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:20, medio:42, alto:65, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:8,  medio:22, alto:55, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:25, medio:65, alto:160, unita:'n', verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:25, medio:48, alto:68, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:600, medio:220, alto:60, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:60, medio:35, alto:15, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  // ─── COMMERCIO ────────────────────────────────────────────────────
  commercio_distribuzione_industriale: {
    tasso_conversione_pct:   { basso:10, medio:22, alto:38, unita:'%',  verso:'alto',  fonte:'Stime settoriali distribuzione B2B' },
    ciclo_vendita_gg:        { basso:45, medio:22, alto:8,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:500, medio:2500, alto:12000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:55, medio:35, alto:18, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:45, medio:68, alto:88, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:5,  medio:18, alto:50, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:30, medio:90, alto:250, unita:'n', verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:15, medio:35, alto:55, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:800, medio:300, alto:80, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:75, medio:45, alto:22, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  commercio_ingrosso_alimentare: {
    tasso_conversione_pct:   { basso:12, medio:28, alto:48, unita:'%',  verso:'alto',  fonte:'Federalimentare 2023' },
    ciclo_vendita_gg:        { basso:20, medio:10, alto:4,  unita:'gg', verso:'basso', fonte:'Federalimentare 2023' },
    valore_medio_ordine:     { basso:300, medio:1200, alto:5000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:50, medio:30, alto:15, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:55, medio:75, alto:92, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:5,  medio:18, alto:50, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:40, medio:120, alto:350, unita:'n',verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:20, medio:42, alto:62, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:400, medio:150, alto:40, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:45, medio:28, alto:12, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  commercio_materiali_edili: {
    tasso_conversione_pct:   { basso:15, medio:32, alto:52, unita:'%',  verso:'alto',  fonte:'Stime settoriali distribuzione edile' },
    ciclo_vendita_gg:        { basso:15, medio:7,  alto:2,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:400, medio:1800, alto:8000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:45, medio:28, alto:12, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:50, medio:72, alto:90, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:8,  medio:25, alto:70, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:50, medio:150, alto:400, unita:'n',verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:25, medio:48, alto:68, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:300, medio:100, alto:30, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:60, medio:35, alto:15, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  commercio_ricambi_auto: {
    tasso_conversione_pct:   { basso:20, medio:40, alto:65, unita:'%',  verso:'alto',  fonte:'Stime settoriali aftermarket auto' },
    ciclo_vendita_gg:        { basso:5,  medio:2,  alto:1,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:80, medio:350, alto:1500, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:35, medio:20, alto:8,  unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:45, medio:68, alto:88, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:20, medio:60, alto:180, unita:'n', verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:80, medio:250, alto:700, unita:'n',verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:20, medio:42, alto:62, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:150, medio:50, alto:15, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:30, medio:15, alto:5,  unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  commercio_abbigliamento_ingrosso: {
    tasso_conversione_pct:   { basso:8,  medio:20, alto:38, unita:'%',  verso:'alto',  fonte:'Sistema Moda Italia 2023' },
    ciclo_vendita_gg:        { basso:30, medio:15, alto:5,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:500, medio:2500, alto:12000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:50, medio:32, alto:15, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:40, medio:62, alto:82, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:5,  medio:15, alto:40, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:25, medio:70, alto:200, unita:'n', verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:15, medio:35, alto:55, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:600, medio:200, alto:60, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:75, medio:45, alto:20, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  commercio_elettronica: {
    tasso_conversione_pct:   { basso:15, medio:32, alto:55, unita:'%',  verso:'alto',  fonte:'Netcomm — E-commerce B2B Italia 2023' },
    ciclo_vendita_gg:        { basso:10, medio:4,  alto:1,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:150, medio:600, alto:3000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:30, medio:18, alto:8,  unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:35, medio:58, alto:80, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:30, medio:100, alto:300, unita:'n',verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:100,medio:350, alto:1000,unita:'n',verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:8,  medio:20, alto:38, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:120, medio:40, alto:12, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:15, medio:7,  alto:2,  unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  commercio_auto_moto_nuovo: {
    tasso_conversione_pct:   { basso:15, medio:30, alto:50, unita:'%',  verso:'alto',  fonte:'UNRAE — Indagine dealer 2023' },
    ciclo_vendita_gg:        { basso:30, medio:15, alto:5,  unita:'gg', verso:'basso', fonte:'UNRAE 2023' },
    valore_medio_ordine:     { basso:18000,medio:28000,alto:45000,unita:'€',verso:'alto',fonte:'UNRAE 2023' },
    concentrazione_top3_pct: { basso:35, medio:20, alto:8,  unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:25, medio:45, alto:68, unita:'%',  verso:'alto',  fonte:'UNRAE — Indagine dealer 2023' },
    nuovi_clienti_anno:      { basso:40, medio:100, alto:250, unita:'n',verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:150,medio:400, alto:1000,unita:'n',verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:15, medio:32, alto:52, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:800, medio:300, alto:80, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:10, medio:5,  alto:1,  unita:'gg', verso:'basso', fonte:'Stime settoriali (contanti/finanziamento)' },
    mrr:                     { basso:500, medio:3000, alto:12000, unita:'€', verso:'alto', fonte:'Stime settoriali (after sales + service)' },
  },

  commercio_auto_moto_usato: {
    tasso_conversione_pct:   { basso:20, medio:38, alto:60, unita:'%',  verso:'alto',  fonte:'Stime settoriali usato auto' },
    ciclo_vendita_gg:        { basso:20, medio:8,  alto:2,  unita:'gg', verso:'basso', fonte:'Stime settoriali usato auto' },
    valore_medio_ordine:     { basso:6000, medio:12000, alto:22000, unita:'€', verso:'alto', fonte:'Stime settoriali usato auto' },
    tasso_riacquisto_pct:    { basso:10, medio:22, alto:38, unita:'%',  verso:'alto',  fonte:'Stime settoriali usato auto' },
    nuovi_clienti_anno:      { basso:30, medio:80, alto:200, unita:'n', verso:'alto',  fonte:'Stime settoriali usato auto' },
    cac:                     { basso:800, medio:350, alto:120, unita:'€', verso:'basso', fonte:'Stime settoriali usato auto' },
    contratti_anno:          { basso:80, medio:200, alto:500, unita:'n', verso:'alto',  fonte:'Esperienza settoriale automotive' },
    rotazione_veicoli_gg:    { basso:60, medio:30, alto:12, unita:'gg', verso:'basso', fonte:'Esperienza settoriale automotive' },
    costo_ripristino_medio:  { basso:2500, medio:1200, alto:600, unita:'€', verso:'basso', fonte:'Esperienza settoriale automotive' },
  },

  commercio_abbigliamento_dettaglio: {
    tasso_conversione_pct:   { basso:20, medio:38, alto:60, unita:'%',  verso:'alto',  fonte:'Confcommercio — Indagine retail 2023' },
    ciclo_vendita_gg:        { basso:1,  medio:1,  alto:1,  unita:'gg', verso:'basso', fonte:'Non applicabile (acquisto immediato)' },
    valore_medio_ordine:     { basso:45, medio:120, alto:350, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:15, medio:8,  alto:3,  unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:20, medio:40, alto:65, unita:'%',  verso:'alto',  fonte:'Confcommercio 2023' },
    nuovi_clienti_anno:      { basso:50, medio:200, alto:600, unita:'n',verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:200,medio:700, alto:2000,unita:'n',verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:10, medio:25, alto:45, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:80, medio:25, alto:8,  unita:'€',  verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:1,  medio:1,  alto:1,  unita:'gg', verso:'basso', fonte:'Non applicabile (retail)' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  commercio_orologi_gioielli: {
    tasso_conversione_pct:   { basso:12, medio:28, alto:50, unita:'%',  verso:'alto',  fonte:'Federpreziosi 2023' },
    ciclo_vendita_gg:        { basso:30, medio:10, alto:2,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:200, medio:800, alto:4000, unita:'€', verso:'alto', fonte:'Stime settoriali Federpreziosi' },
    concentrazione_top3_pct: { basso:20, medio:10, alto:4,  unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:15, medio:35, alto:60, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:30, medio:100, alto:300, unita:'n',verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:100,medio:350, alto:1000,unita:'n',verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:20, medio:45, alto:68, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:200, medio:70, alto:20, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:1,  medio:1,  alto:1,  unita:'gg', verso:'basso', fonte:'Non applicabile (retail)' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  // ─── ALIMENTARE ───────────────────────────────────────────────────
  alimentare_trasformazione: {
    tasso_conversione_pct:   { basso:10, medio:24, alto:42, unita:'%',  verso:'alto',  fonte:'Federalimentare 2023' },
    ciclo_vendita_gg:        { basso:30, medio:14, alto:5,  unita:'gg', verso:'basso', fonte:'Federalimentare 2023' },
    valore_medio_ordine:     { basso:500, medio:2500, alto:12000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:55, medio:35, alto:18, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:45, medio:68, alto:88, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:5,  medio:18, alto:50, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:20, medio:65, alto:180, unita:'n', verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:20, medio:42, alto:62, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:600, medio:200, alto:60, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:60, medio:35, alto:15, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  alimentare_vini: {
    tasso_conversione_pct:   { basso:8,  medio:20, alto:38, unita:'%',  verso:'alto',  fonte:'Vinitaly — Osservatorio Vino 2023' },
    ciclo_vendita_gg:        { basso:45, medio:20, alto:7,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:300, medio:1200, alto:6000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:50, medio:30, alto:14, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:30, medio:55, alto:78, unita:'%',  verso:'alto',  fonte:'Vinitaly 2023' },
    nuovi_clienti_anno:      { basso:5,  medio:18, alto:55, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:20, medio:70, alto:200, unita:'n', verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:20, medio:45, alto:68, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:500, medio:180, alto:50, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:60, medio:35, alto:14, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:200, alto:1500, unita:'€', verso:'alto', fonte:'Stime settoriali (wine club/abbonamenti)' },
  },

  alimentare_forno: {
    tasso_conversione_pct:   { basso:20, medio:42, alto:68, unita:'%',  verso:'alto',  fonte:'Assipan 2023' },
    ciclo_vendita_gg:        { basso:5,  medio:2,  alto:1,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:80, medio:300, alto:1200, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:40, medio:22, alto:10, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:50, medio:72, alto:92, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:5,  medio:20, alto:60, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:15, medio:50, alto:150, unita:'n', verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:25, medio:50, alto:72, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:200, medio:70, alto:20, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:20, medio:10, alto:3,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  alimentare_conserve: {
    tasso_conversione_pct:   { basso:10, medio:24, alto:42, unita:'%',  verso:'alto',  fonte:'Federalimentare 2023' },
    ciclo_vendita_gg:        { basso:20, medio:10, alto:4,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:200, medio:900, alto:4000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:50, medio:30, alto:14, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:40, medio:65, alto:85, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:5,  medio:18, alto:50, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:20, medio:65, alto:180, unita:'n', verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:15, medio:38, alto:58, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:400, medio:140, alto:40, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:50, medio:28, alto:12, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  alimentare_ingredienti: {
    tasso_conversione_pct:   { basso:10, medio:22, alto:38, unita:'%',  verso:'alto',  fonte:'Federalimentare 2023' },
    ciclo_vendita_gg:        { basso:30, medio:15, alto:6,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:500, medio:2500, alto:12000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:60, medio:38, alto:18, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:55, medio:75, alto:92, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:3,  medio:10, alto:28, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:15, medio:45, alto:120, unita:'n', verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:20, medio:42, alto:62, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:600, medio:200, alto:60, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:60, medio:35, alto:14, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:0, medio:0, alto:0, unita:'€', verso:'alto', fonte:'Non applicabile' },
  },

  alimentare_birra: {
    tasso_conversione_pct:   { basso:12, medio:28, alto:50, unita:'%',  verso:'alto',  fonte:'Unionbirrai 2023' },
    ciclo_vendita_gg:        { basso:20, medio:8,  alto:2,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:200, medio:800, alto:3500, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:40, medio:22, alto:8,  unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:35, medio:60, alto:82, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:8,  medio:28, alto:80, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:25, medio:90, alto:280, unita:'n', verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:15, medio:38, alto:60, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:300, medio:100, alto:28, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:35, medio:18, alto:6,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    mrr:                     { basso:0, medio:500, alto:3000, unita:'€', verso:'alto', fonte:'Stime settoriali (abbonamenti/club)' },
  },

  // ─── TECH ─────────────────────────────────────────────────────────
  tech_saas: {
    tasso_conversione_pct:   { basso:2,  medio:8,  alto:22, unita:'%',  verso:'alto',  fonte:'SaaS Benchmarks Report — Paddle 2023' },
    ciclo_vendita_gg:        { basso:90, medio:40, alto:14, unita:'gg', verso:'basso', fonte:'SaaS Benchmarks Report — Paddle 2023' },
    valore_medio_ordine:     { basso:500, medio:2500, alto:12000, unita:'€', verso:'alto', fonte:'Stime settoriali SaaS Italia' },
    concentrazione_top3_pct: { basso:45, medio:25, alto:10, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:60, medio:80, alto:95, unita:'%',  verso:'alto',  fonte:'SaaS Benchmarks — ChurnZero 2023' },
    nuovi_clienti_anno:      { basso:10, medio:40, alto:150, unita:'n', verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:20, medio:100, alto:400, unita:'n',verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:5,  medio:18, alto:38, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:2000, medio:800, alto:200, unita:'€', verso:'basso', fonte:'SaaS Benchmarks Report 2023' },
    dso_gg:                  { basso:30, medio:10, alto:1,  unita:'gg', verso:'basso', fonte:'Stime settoriali (pagamenti digitali)' },
    mrr:                     { basso:2000, medio:15000, alto:80000, unita:'€', verso:'alto', fonte:'SaaS Benchmarks Report — Paddle 2023' },
  },

  tech_system_integrator: {
    tasso_conversione_pct:   { basso:8,  medio:20, alto:38, unita:'%',  verso:'alto',  fonte:'Stime settoriali system integrator Italia' },
    ciclo_vendita_gg:        { basso:120,medio:65, alto:28, unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:5000, medio:25000, alto:120000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:70, medio:48, alto:25, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:35, medio:60, alto:82, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:2,  medio:6,  alto:18, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:5,  medio:18, alto:50, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:25, medio:50, alto:72, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:5000, medio:2000, alto:600, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:90, medio:55, alto:25, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:500, medio:3000, alto:15000, unita:'€', verso:'alto', fonte:'Stime settoriali (contratti manutenzione)' },
  },

  tech_digital_agency: {
    tasso_conversione_pct:   { basso:5,  medio:15, alto:32, unita:'%',  verso:'alto',  fonte:'Stime settoriali agenzie digitali Italia' },
    ciclo_vendita_gg:        { basso:60, medio:28, alto:10, unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:800, medio:3500, alto:15000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:55, medio:35, alto:18, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:30, medio:55, alto:78, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:3,  medio:10, alto:28, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:8,  medio:25, alto:70, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:20, medio:45, alto:68, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:1500, medio:500, alto:150, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:45, medio:25, alto:10, unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    mrr:                     { basso:1000, medio:6000, alto:28000, unita:'€', verso:'alto', fonte:'Stime settoriali (retainer mensili)' },
  },

  tech_automazione: {
    tasso_conversione_pct:   { basso:8,  medio:20, alto:38, unita:'%',  verso:'alto',  fonte:'Stime settoriali automazione industriale' },
    ciclo_vendita_gg:        { basso:150,medio:80, alto:35, unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:15000,medio:60000,alto:250000,unita:'€',verso:'alto',fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:65, medio:42, alto:22, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:30, medio:55, alto:78, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:2,  medio:6,  alto:16, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:5,  medio:18, alto:50, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:20, medio:42, alto:62, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:6000, medio:2500, alto:800, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:90, medio:55, alto:25, unita:'gg', verso:'basso', fonte:'Banca d\'Italia 2023' },
    mrr:                     { basso:500, medio:4000, alto:20000, unita:'€', verso:'alto', fonte:'Stime settoriali (contratti manutenzione)' },
  },

  // ─── SERVIZI ──────────────────────────────────────────────────────
  servizi_it: {
    tasso_conversione_pct:   { basso:8,  medio:22, alto:40, unita:'%',  verso:'alto',  fonte:'Stime settoriali MSP Italia' },
    ciclo_vendita_gg:        { basso:45, medio:22, alto:8,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:500, medio:2000, alto:8000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:55, medio:35, alto:16, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:45, medio:70, alto:90, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:3,  medio:10, alto:28, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:10, medio:30, alto:80, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:25, medio:50, alto:72, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:800, medio:280, alto:80, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:45, medio:25, alto:10, unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    mrr:                     { basso:500, medio:3500, alto:18000, unita:'€', verso:'alto', fonte:'Stime settoriali (contratti managed service)' },
  },

  servizi_formazione: {
    tasso_conversione_pct:   { basso:10, medio:25, alto:45, unita:'%',  verso:'alto',  fonte:'Stime settoriali formazione aziendale Italia' },
    ciclo_vendita_gg:        { basso:30, medio:14, alto:5,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    valore_medio_ordine:     { basso:300, medio:1200, alto:6000, unita:'€', verso:'alto', fonte:'Stime settoriali' },
    concentrazione_top3_pct: { basso:45, medio:28, alto:12, unita:'%',  verso:'basso', fonte:'Stime settoriali' },
    tasso_riacquisto_pct:    { basso:30, medio:55, alto:78, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    nuovi_clienti_anno:      { basso:5,  medio:18, alto:55, unita:'n',  verso:'alto',  fonte:'Stime settoriali' },
    clienti_attivi:          { basso:12, medio:40, alto:120, unita:'n', verso:'alto',  fonte:'Stime settoriali' },
    fatturato_referral_pct:  { basso:20, medio:45, alto:68, unita:'%',  verso:'alto',  fonte:'Stime settoriali' },
    cac:                     { basso:500, medio:180, alto:50, unita:'€', verso:'basso', fonte:'Stime settoriali' },
    dso_gg:                  { basso:45, medio:22, alto:8,  unita:'gg', verso:'basso', fonte:'Stime settoriali' },
    mrr:                     { basso:0, medio:1000, alto:8000, unita:'€', verso:'alto', fonte:'Stime settoriali (abbonamenti formativi annuali)' },
  },

};

function getBenchmarkKPI(settore) {
  return BENCHMARK_KPI[settore] || null;
}