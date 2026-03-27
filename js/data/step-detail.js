// ============================================================================
// STEP_DETAIL_BY_SETTORE — Listino unico: descrizione + costi per ogni step
// Ricostruito micro-mercato per micro-mercato
// ============================================================================

const STEP_DETAIL_BY_SETTORE = {

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO AUTO MOTO USATO
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_auto_moto_usato: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Solo il titolare vende — nessun supporto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare + aiutante', cosa:'Affiancamento nelle visite e preventivi', costo_mensile:300, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Venditore junior', cosa:'Venditore junior esperienza usato — trattative e permute', costo_mensile:2500, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'Commerciale senior', cosa:'Commerciale con portafoglio clienti e obiettivi mensili', costo_mensile:3500, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Resp. vendite + rete', cosa:'Direzione commerciale con agenti zona e key account fleet', costo_mensile:5000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — trattative a memoria', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel/Google Sheet per tracciare lead e follow-up', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM automotive con lead dai marketplace', costo_mensile:400, costo_setup:800, tempo_mesi:1 },
      '4': { chi:'CRM avanzato', cosa:'CRM integrato con sito, marketplace e WhatsApp', costo_mensile:800, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'DMS completo', cosa:'DMS integrato con contabilità, stock e CRM', costo_mensile:1500, costo_setup:3000, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessun team — il titolare fa tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Aiutante', cosa:'Assumere un aiutante — gestione clienti e pratiche base', costo_mensile:1200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Ruoli separati', cosa:'Ruoli definiti — chi vende, chi fa pratiche, chi segue post-vendita', costo_mensile:1500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Team strutturato', cosa:'Back office commerciale + addetto permute + amministrazione', costo_mensile:3000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Manager + team', cosa:'Responsabile che coordina team, obiettivi e KPI', costo_mensile:4500, costo_setup:2000, tempo_mesi:6 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo formalizzato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Check-list valutazione permute e consegna veicoli', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Consulente + strumenti', cosa:'Contratti standard, valutazione permute con Eurotax e CRM', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Software gestionale', cosa:'Gestionale pratiche auto, finanziamenti e garanzie', costo_mensile:600, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'DMS + automazione', cosa:'Processi automatizzati — firma digitale, pratiche online', costo_mensile:1000, costo_setup:2000, tempo_mesi:3 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Nessuna strategia di pricing — prezzi a sensazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Pricing assertivo — valori di mercato reali', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Strumenti pricing', cosa:'Tool pricing (EurotaxGlass, DAT) per valutazione stock', costo_mensile:300, costo_setup:0, tempo_mesi:1 },
      '4': { chi:'Prodotti finanziari', cosa:'Accordi finanziarie — proposta sistematica ogni vendita', costo_mensile:600, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Revenue management', cosa:'Ottimizzazione margini, fleet pricing, garanzie estese', costo_mensile:1200, costo_setup:2000, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Titolare', cosa:'Nessuna presenza online — solo passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'AutoScout24 e Subito con foto professionali', costo_mensile:200, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Social + portali', cosa:'3+ marketplace + Facebook/Instagram post settimanali', costo_mensile:600, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Agenzia digital', cosa:'Google Ads, remarketing e gestione recensioni', costo_mensile:1200, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Responsabile marketing — brand awareness locale', costo_mensile:2500, costo_setup:4000, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o sito vetrina abbandonato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito base con stock aggiornato e contatti', costo_mensile:100, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Stock real-time, form contatto, valutazione permuta', costo_mensile:300, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'Sito avanzato', cosa:'Chat, test drive, finanziamento online, tracking lead', costo_mensile:600, costo_setup:4000, tempo_mesi:2 },
      '5': { chi:'Sito integrato', cosa:'Sito integrato DMS — stock real-time, CRM automatico', costo_mensile:1000, costo_setup:6000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Approvvigionamento',
      '1': { chi:'Titolare', cosa:'Solo permute — nessun acquisto attivo', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Aste online base (BCA, Autorola)', costo_mensile:300, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Buyer part-time', cosa:'Aste online + accordi privati + acquisto da aziende', costo_mensile:800, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Buyer dedicato', cosa:'Buyer full-time — aste fisiche, fleet, rientri leasing', costo_mensile:2800, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Strategia acquisti', cosa:'Team acquisti KPI, partnership noleggiatori e leasing', costo_mensile:4500, costo_setup:2000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO AUTO MOTO NUOVO
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_auto_moto_nuovo: {
    vendite: {
      '1': { chi:'Team base', cosa:'2-3 venditori formati casa madre — standard minimo brand', costo_mensile:7500, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Team + specialista', cosa:'Venditori specializzati per segmento (privati vs fleet)', costo_mensile:10000, costo_setup:500, tempo_mesi:2 },
      '3': { chi:'Team + KAM', cosa:'Key account manager fleet + sviluppo noleggio lungo termine', costo_mensile:13500, costo_setup:1000, tempo_mesi:3 },
      '4': { chi:'Resp. + team allargato', cosa:'Multi-sede o multi-brand con responsabile commerciale', costo_mensile:18000, costo_setup:2000, tempo_mesi:4 },
      '5': { chi:'Dir. commerciale + team', cosa:'Direzione commerciale strutturata con business development', costo_mensile:25000, costo_setup:3000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'DMS standard', cosa:'DMS casa madre base — gestione ordini e stock obbligatorio', costo_mensile:1500, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'CRM + DMS', cosa:'CRM attivo con follow-up sistematico su lead e scadenze', costo_mensile:2200, costo_setup:1500, tempo_mesi:1 },
      '3': { chi:'Automation + CRM + DMS', cosa:'Marketing automation — nurturing, remarketing, eventi', costo_mensile:3500, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'CRM enterprise + DMS', cosa:'Integrazione completa DMS + CRM + marketing con analytics', costo_mensile:5000, costo_setup:5000, tempo_mesi:3 },
      '5': { chi:'Data analyst + piattaforma', cosa:'Predictive analytics — scoring lead, propensione riacquisto', costo_mensile:7000, costo_setup:8000, tempo_mesi:4 },
    },
    team: {
      '1': { chi:'Team base', cosa:'Team minimo brand — venditori + service advisor + back office', costo_mensile:12000, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Team + consulente', cosa:'Ruoli definiti con KPI individuali e piano incentivi strutturato', costo_mensile:13000, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Team + formatore', cosa:'Formazione continua + certificazioni brand avanzate', costo_mensile:14500, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Team + middle mgmt', cosa:'Middle management — capo vendite, capo service, F&I manager', costo_mensile:20000, costo_setup:1500, tempo_mesi:3 },
      '5': { chi:'Team completo + GM', cosa:'General manager + HR strutturato + academy interna', costo_mensile:28000, costo_setup:3000, tempo_mesi:6 },
    },
    processi: {
      '1': { chi:'Standard brand', cosa:'Processi base imposti dalla casa madre', costo_mensile:300, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Standard + procedure', cosa:'Customer journey documentato dalla lead alla consegna', costo_mensile:300, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Consulente qualità', cosa:'NPS sistematico + gestione reclami + mystery shopping', costo_mensile:700, costo_setup:800, tempo_mesi:2 },
      '4': { chi:'DMS + automazione', cosa:'Digitalizzazione completa — firma digitale, pratiche online', costo_mensile:1100, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'Quality manager', cosa:'Lean management + certificazione qualità + audit interni', costo_mensile:1800, costo_setup:3000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Standard', cosa:'Vendita auto + finanziamento base da casa madre', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Venditore formato', cosa:'Proposta sistematica F&I su ogni trattativa', costo_mensile:0, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Resp. usato', cosa:'Usato garantito + accessori + protezione carrozzeria', costo_mensile:1000, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Service manager', cosa:'After sales come centro profitto — ricambi, tagliandi, carrozzeria', costo_mensile:1500, costo_setup:2000, tempo_mesi:3 },
      '5': { chi:'Revenue manager', cosa:'Revenue management — mix nuovo/usato/km0, fleet, noleggio', costo_mensile:2500, costo_setup:3000, tempo_mesi:4 },
    },
    marketing: {
      '1': { chi:'Casa madre', cosa:'Marketing casa madre — co-op advertising base', costo_mensile:500, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Interno', cosa:'Presenza social attiva + Google My Business ottimizzato', costo_mensile:800, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Agenzia digital', cosa:'Campagne digitali locali — Google Ads, Meta, remarketing', costo_mensile:1700, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Marketing specialist', cosa:'CRM marketing — email personalizzate per lifecycle cliente', costo_mensile:2500, costo_setup:2500, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Brand building locale — eventi, partnership, community', costo_mensile:4000, costo_setup:5000, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Casa madre', cosa:'Sito brand standard fornito dalla casa madre', costo_mensile:200, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Contenuti locali — stock usato, promo, team, recensioni', costo_mensile:400, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito avanzato', cosa:'Configuratore + preventivo online + prenotazione test drive', costo_mensile:700, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'Sito e-commerce', cosa:'E-commerce accessori + prenotazione service online', costo_mensile:1000, costo_setup:5000, tempo_mesi:2 },
      '5': { chi:'Piattaforma digitale', cosa:'Virtual showroom, acquisto online, firma digitale', costo_mensile:1700, costo_setup:10000, tempo_mesi:4 },
    },
    ecommerce: {
      _label: 'Post-vendita / Service',
      '1': { chi:'Service base', cosa:'Service standard — tagliandi e garanzia come da brand', costo_mensile:3000, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Service advisor', cosa:'Richiamo proattivo clienti per tagliandi e scadenze', costo_mensile:3500, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Service advisor senior', cosa:'Service advisor dedicato + upsell attivo su ogni passaggio', costo_mensile:5000, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Resp. after sales', cosa:'Carrozzeria + ricambi + accessori come centro profitto', costo_mensile:7500, costo_setup:2000, tempo_mesi:3 },
      '5': { chi:'After sales manager', cosa:'Contratti manutenzione, fleet management, fidelizzazione', costo_mensile:10000, costo_setup:3000, tempo_mesi:4 },
    },
  },

};

window.STEP_DETAIL_BY_SETTORE = STEP_DETAIL_BY_SETTORE;
