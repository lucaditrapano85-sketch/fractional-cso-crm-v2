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
      '1': { chi:'Titolare solo', cosa:'Solo il titolare vende — nessun supporto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+1 venditore', cosa:'Titolare + 1 persona che affianca nelle vendite', costo_mensile:2200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'+1 venditore (tot 2)', cosa:'2 persone dedicate alla vendita oltre al titolare', costo_mensile:5000, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'+1-2 venditori (tot 3-4)', cosa:'3-4 venditori con il titolare che supervisiona', costo_mensile:9000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Resp. vendite + team', cosa:'Team vendita autonomo — il titolare non vende più', costo_mensile:14000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — trattative a memoria', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel/Google Sheet per tracciare lead e follow-up', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM automotive con lead dai marketplace', costo_mensile:400, costo_setup:800, tempo_mesi:1 },
      '4': { chi:'CRM avanzato', cosa:'CRM integrato con sito, marketplace e WhatsApp', costo_mensile:800, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'DMS completo', cosa:'DMS integrato con contabilità, stock e CRM', costo_mensile:1500, costo_setup:3000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto al momento', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli base definiti — chi fa cosa è chiaro', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Riunione settimanale + obiettivi misurabili per ruolo', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente + titolare', cosa:'KPI individuali + processi decisionali delegati', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Manager operativo', cosa:'Governance strutturata — il titolare fa solo strategia', costo_mensile:1500, costo_setup:2000, tempo_mesi:6 },
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
      '1': { chi:'2-3 venditori', cosa:'Team vendita base brand standard — 2-3 venditori formati casa madre', costo_mensile:7500, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ 1 specialista fleet', cosa:'+1 venditore specialista fleet — segmentazione privati vs aziende', costo_mensile:10000, costo_setup:0, tempo_mesi:2 },
      '3': { chi:'+ 1 KAM fleet', cosa:'+1 KAM fleet + noleggio lungo termine — sviluppo B2B', costo_mensile:13500, costo_setup:0, tempo_mesi:3 },
      '4': { chi:'5-6 venditori', cosa:'Multi-sede con 5-6 venditori e responsabile commerciale', costo_mensile:18000, costo_setup:0, tempo_mesi:4 },
      '5': { chi:'Dir. commerciale + team', cosa:'Direttore commerciale + team vendita completo e autonomo', costo_mensile:25000, costo_setup:0, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'DMS standard', cosa:'DMS casa madre base — gestione ordini e stock obbligatorio', costo_mensile:1500, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'CRM + DMS', cosa:'CRM attivo con follow-up sistematico su lead e scadenze', costo_mensile:2200, costo_setup:1500, tempo_mesi:1 },
      '3': { chi:'Automation + CRM + DMS', cosa:'Marketing automation — nurturing, remarketing, eventi', costo_mensile:3500, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'CRM enterprise + DMS', cosa:'Integrazione completa DMS + CRM + marketing con analytics', costo_mensile:5000, costo_setup:5000, tempo_mesi:3 },
      '5': { chi:'Data analyst + piattaforma', cosa:'Predictive analytics — scoring lead, propensione riacquisto', costo_mensile:7000, costo_setup:8000, tempo_mesi:4 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Casa madre', cosa:'Team minimo brand — ruoli base da casa madre', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Consulente', cosa:'KPI individuali e piano incentivi strutturato', costo_mensile:0, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Formatore', cosa:'Formazione continua + certificazioni brand', costo_mensile:300, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Middle management', cosa:'Middle management — capo vendite, capo service', costo_mensile:800, costo_setup:1500, tempo_mesi:3 },
      '5': { chi:'General manager', cosa:'General manager + governance completa', costo_mensile:2000, costo_setup:3000, tempo_mesi:6 },
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

  // ═══════════════════════════════════════════════════════════════════════════
  // MANIFATTURIERO MECCANICA
  // ═══════════════════════════════════════════════════════════════════════════
  manifatturiero_meccanica: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Solo il titolare vende — nessun venditore', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare + tecnico', cosa:'Titolare + tecnico che affianca nelle visite — solo trasferte', costo_mensile:300, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'1 agente', cosa:'1 agente plurimandatario — provvigioni ~1.200€/mese', costo_mensile:1200, costo_setup:0, tempo_mesi:2 },
      '4': { chi:'1 commerciale', cosa:'1 commerciale interno dedicato — lordo azienda ~2.800€', costo_mensile:2800, costo_setup:0, tempo_mesi:3 },
      '5': { chi:'Resp. + 2 agenti + KAM', cosa:'Resp. commerciale + 2 agenti + KAM', costo_mensile:7500, costo_setup:0, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — offerte a memoria o su carta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Registro offerte su Excel — cliente, lavorazione, importo, stato', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM base (Pipedrive/HubSpot) per offerte e follow-up', costo_mensile:50, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'CRM + processi', cosa:'SLA risposta preventivi (max 48h) + monitoraggio win/loss rate', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'CRM + gestionale', cosa:'CRM integrato con gestionale commesse e fatturazione', costo_mensile:500, costo_setup:2000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna — titolare fa tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli base tra operai', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Resp. produzione libera il titolare', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'Riunioni settimanali + KPI per reparto', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management strutturato — titolare solo strategia', costo_mensile:1500, costo_setup:2000, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo formalizzato — preventivi fatti caso per caso', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Formato preventivo standard con capacità produttive e tempi', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Consulente', cosa:'Listino interno lavorazioni standard + procedura varianti', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Software gestionale', cosa:'Gestionale produzione integrato con parte commerciale', costo_mensile:500, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Quality manager', cosa:'Certificazione qualità (ISO 9001) + audit processi offerta', costo_mensile:1200, costo_setup:8000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Nessun controllo margini — prezzi a sensazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Calcolo costo reale per lavorazione (ore macchina + manodopera)', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Upsell attivo', cosa:'Servizi accessori in offerta — trattamenti, assemblaggio, imballo', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'Accordi commerciali', cosa:'Contratti quadro annuali con clienti principali — volumi garantiti', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue development', cosa:'Offerta servizi a valore aggiunto — prototipazione, engineering', costo_mensile:800, costo_setup:1500, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Titolare', cosa:'Nessuna presenza — solo passaparola e visite dirette', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Google My Business + LinkedIn con foto reparto e capacità', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Fiere', cosa:'1-2 fiere di settore annue (MECSPE, EMO) — stand base', costo_mensile:500, costo_setup:5000, tempo_mesi:2 },
      '4': { chi:'Agenzia digital', cosa:'Campagne LinkedIn Ads su purchasing manager settori target', costo_mensile:1000, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing annuo — fiere + digital + case study + certificazioni', costo_mensile:2500, costo_setup:3000, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o sito vetrina datato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con capacità produttive, lavorazioni, tolleranze e settori', costo_mensile:80, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Case study tecnici + video reparto + modulo preventivo online', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Agenzia SEO', cosa:'SEO tecnico su parole chiave lavorazioni CNC + zona geografica', costo_mensile:600, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Sito avanzato', cosa:'Sito multilingua con area clienti per tracking commesse', costo_mensile:1000, costo_setup:8000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Export / Canale digitale',
      '1': { chi:'Nessuno', cosa:'Nessuna presenza su portali o canali digitali B2B', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Iscrizione portali B2B (Kompass, Europages)', costo_mensile:30, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Configuratore', cosa:'Configuratore preventivi online per lavorazioni standard', costo_mensile:200, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'Export development', cosa:'Partnership con distributori/agenti internazionali per export', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Portale B2B', cosa:'Portale clienti B2B — ordini, tracking commesse, documenti', costo_mensile:800, costo_setup:8000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MANIFATTURIERO AUTOMOTIVE
  // ═══════════════════════════════════════════════════════════════════════════
  manifatturiero_automotive: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare gestisce 2-3 OEM storici — nessun venditore', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Visite pianificate buyer OEM — solo trasferte', costo_mensile:500, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'1 KAM', cosa:'1 KAM automotive dedicato — lordo azienda ~3.000€', costo_mensile:3000, costo_setup:0, tempo_mesi:3 },
      '4': { chi:'KAM + biz dev', cosa:'KAM + business development nuovi OEM', costo_mensile:5500, costo_setup:0, tempo_mesi:4 },
      '5': { chi:'Dir. commerciale', cosa:'Dir. commerciale con presidio internazionale', costo_mensile:9000, costo_setup:0, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — le RFQ arrivano per email', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare + Excel', cosa:'Foglio strutturato RFQ — cliente, part number, stato, deadline, valore', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'CRM automotive', cosa:'CRM con gestione RFQ, PPAP tracking e scadenze campionature', costo_mensile:150, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'CRM + ERP', cosa:'CRM integrato con ERP — visibilità da RFQ a produzione serie', costo_mensile:500, costo_setup:2000, tempo_mesi:3 },
      '5': { chi:'Piattaforma enterprise', cosa:'Gestione gare + portali OEM (Covisint, SupplyOn)', costo_mensile:1000, costo_setup:5000, tempo_mesi:4 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli definiti produzione/qualità', costo_mensile:0, costo_setup:300, tempo_mesi:2 },
      '3': { chi:'Titolare', cosa:'Resp. qualità IATF autonomo', costo_mensile:300, costo_setup:800, tempo_mesi:3 },
      '4': { chi:'Consulente', cosa:'KPI stabilimento + riunioni cross-funzionali', costo_mensile:500, costo_setup:1500, tempo_mesi:4 },
      '5': { chi:'Plant manager', cosa:'Plant manager + continuous improvement', costo_mensile:2000, costo_setup:3000, tempo_mesi:6 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Processi base — si lavora ma senza documentazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Resp. qualità', cosa:'PPAP base + controllo qualità in ingresso e uscita', costo_mensile:300, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Consulente IATF', cosa:'IATF 16949 — sistema qualità automotive completo', costo_mensile:800, costo_setup:12000, tempo_mesi:6 },
      '4': { chi:'ERP + qualità', cosa:'SPC, FMEA, control plan integrati nel gestionale', costo_mensile:1200, costo_setup:3000, tempo_mesi:3 },
      '5': { chi:'Quality manager', cosa:'Lean manufacturing + audit interni + miglioramento continuo', costo_mensile:2000, costo_setup:5000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzi imposti dal cliente OEM — nessuna leva negoziale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Analisi costi reali per componente — margini trasparenti', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Ufficio tecnico', cosa:'Value engineering al cliente — riduzione costi condivisa', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Business development', cosa:'Diversificazione clienti — ridurre dipendenza da 1-2 OEM', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Revenue manager', cosa:'Servizi a valore aggiunto — co-design, assemblaggio, logistica JIT', costo_mensile:1000, costo_setup:2000, tempo_mesi:4 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — i clienti OEM ti conoscono già', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'LinkedIn aziendale + certificazioni in evidenza', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Fiere', cosa:'Fiere automotive (Automechanika, MECSPE) — stand e networking', costo_mensile:600, costo_setup:6000, tempo_mesi:2 },
      '4': { chi:'Agenzia specializzata', cosa:'Content marketing tecnico — case study, white paper, video', costo_mensile:1200, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano B2B — fiere internazionali + LinkedIn + PR settore', costo_mensile:3000, costo_setup:4000, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o sito vetrina datato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con capacità, certificazioni IATF, settori serviti', costo_mensile:80, costo_setup:1200, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Case study OEM + video stabilimento + richiesta RFQ online', costo_mensile:300, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'Sito avanzato', cosa:'Area riservata clienti — documenti PPAP, certificati, tracking', costo_mensile:600, costo_setup:4000, tempo_mesi:2 },
      '5': { chi:'Piattaforma B2B', cosa:'Portale multilingua con catalogo componenti e specifiche tecniche', costo_mensile:1000, costo_setup:10000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Supply chain digitale',
      '1': { chi:'Nessuno', cosa:'Nessuna presenza digitale B2B', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Registrazione su portali OEM e piattaforme sourcing', costo_mensile:50, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Portale ordini', cosa:'Portale clienti per ordini ricorrenti e gestione kanban', costo_mensile:300, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'Integrazione EDI', cosa:'EDI con clienti principali — ordini automatici', costo_mensile:600, costo_setup:5000, tempo_mesi:3 },
      '5': { chi:'Supply chain digitale', cosa:'Forecast condiviso, VMI, consignment stock', costo_mensile:1200, costo_setup:10000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MANIFATTURIERO PACKAGING
  // ═══════════════════════════════════════════════════════════════════════════
  manifatturiero_packaging: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare gestisce clienti storici — nessun venditore', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Campionature proattive verso buyer GDO e industria', costo_mensile:400, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'1 agente', cosa:'1 agente packaging — provvigioni ~1.500€/mese', costo_mensile:1500, costo_setup:0, tempo_mesi:2 },
      '4': { chi:'1 commerciale', cosa:'1 commerciale interno dedicato — lordo azienda ~3.200€', costo_mensile:3200, costo_setup:0, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale + agenti', cosa:'Dir. commerciale + agenti + export', costo_mensile:8000, costo_setup:0, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — offerte via email senza follow-up', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel strutturato — cliente, prodotto, tiratura, margine, stato', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per gestione offerte, campionature e riordini', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM integrato con gestionale produzione — tempi e capacità', costo_mensile:400, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'ERP integrato', cosa:'ERP completo — da offerta a produzione a spedizione', costo_mensile:800, costo_setup:4000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli produzione definiti', costo_mensile:0, costo_setup:200, tempo_mesi:2 },
      '3': { chi:'Titolare', cosa:'Riunioni + pianificazione commesse', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'KPI + processi decisionali', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management R&D + produzione + commerciale', costo_mensile:1500, costo_setup:2000, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo formalizzato — si lavora a esperienza', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Scheda commessa standard — specifiche, tiratura, materiali, tempi', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Software gestionale', cosa:'Gestionale produzione — pianificazione commesse e consuntivi', costo_mensile:400, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Consulente + audit', cosa:'Certificazioni (FSC, BRC/IFS per food contact) — compliance', costo_mensile:800, costo_setup:6000, tempo_mesi:4 },
      '5': { chi:'Quality manager', cosa:'Lean production + controllo scarti + miglioramento continuo', costo_mensile:1500, costo_setup:3000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Nessun controllo margini — prezzi a listino fisso', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Calcolo costo reale per commessa (materiale + macchina + scarti)', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Pricing strutturato', cosa:'Pricing differenziato per tiratura — margini migliori su piccoli lotti', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'Upsell attivo', cosa:'Servizi aggiuntivi — progettazione grafica, prototipazione, stoccaggio', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Contratti quadro annuali con GDO/industria — volumi garantiti', costo_mensile:800, costo_setup:1500, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Titolare', cosa:'Nessuna presenza — solo passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'LinkedIn + Google My Business con foto prodotti e impianti', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Fiere', cosa:'Fiere packaging (IPACK-IMA, Luxe Pack) — stand base', costo_mensile:500, costo_setup:5000, tempo_mesi:2 },
      '4': { chi:'Agenzia digital', cosa:'Campagne LinkedIn su resp. acquisti food/cosmetica/pharma', costo_mensile:1000, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — fiere + digital + portfolio + case study', costo_mensile:2500, costo_setup:3000, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o sito datato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con catalogo prodotti, materiali e certificazioni', costo_mensile:80, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Portfolio visuale + preventivo online + case study', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Sito avanzato', cosa:'Catalogo interattivo con specifiche tecniche e campionature online', costo_mensile:600, costo_setup:4000, tempo_mesi:2 },
      '5': { chi:'Piattaforma B2B', cosa:'Portale B2B — ordini, tracking produzione, documenti qualità', costo_mensile:1000, costo_setup:8000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Canale digitale B2B',
      '1': { chi:'Nessuno', cosa:'Nessuna presenza digitale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Portali B2B packaging (PackagingOnline, Europages)', costo_mensile:30, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Configuratore', cosa:'Configuratore online per prodotti standard (scatole, buste, etichette)', costo_mensile:250, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'E-commerce', cosa:'E-commerce B2B per riordini clienti + piccoli lotti', costo_mensile:500, costo_setup:5000, tempo_mesi:3 },
      '5': { chi:'Piattaforma integrata', cosa:'Portale clienti integrato — riordini automatici, stock dedicato', costo_mensile:1000, costo_setup:8000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MANIFATTURIERO CONTO TERZI
  // ═══════════════════════════════════════════════════════════════════════════
  manifatturiero_cterzi: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare gestisce 3-5 clienti storici — nessun venditore', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Mappatura aziende zona — visite mirate', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'1 agente', cosa:'1 agente — provvigioni ~1.200€/mese', costo_mensile:1200, costo_setup:0, tempo_mesi:2 },
      '4': { chi:'1 commerciale', cosa:'1 commerciale diversificazione clienti — lordo azienda ~3.000€', costo_mensile:3000, costo_setup:0, tempo_mesi:3 },
      '5': { chi:'Resp. + agenti + export', cosa:'Resp. commerciale + agenti + export', costo_mensile:7000, costo_setup:0, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — il cliente chiama quando serve', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con offerte aperte — cliente, lavorazione, valore, stato', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM base per gestire offerte e scadenze contratti', costo_mensile:50, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM + monitoraggio carico macchine e tempi di consegna', costo_mensile:300, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'ERP completo', cosa:'ERP integrato — da preventivo a produzione a fattura', costo_mensile:600, costo_setup:3000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Capo reparto tra operai', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Ruoli separati produzione/commerciale', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'KPI + deleghe operative', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management strutturato', costo_mensile:1500, costo_setup:1500, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni commessa è gestita diversamente', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Scheda commessa standard — tempi, materiali, costi', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Software gestionale', cosa:'Gestionale commesse — pianificazione e consuntivo automatico', costo_mensile:300, costo_setup:1200, tempo_mesi:2 },
      '4': { chi:'Resp. qualità', cosa:'Controllo qualità formalizzato — report per cliente', costo_mensile:600, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Quality manager', cosa:'ISO 9001 + lean + KPI produttività per commessa', costo_mensile:1200, costo_setup:7000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzi storici mai aggiornati — margini che si erodono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ricalcolo costi reali — ore macchina, setup, materiale', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Rinegoziazione prezzi con clienti sotto margine minimo', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '4': { chi:'Upsell', cosa:'Servizi aggiuntivi — assemblaggio, logistica, magazzino conto terzi', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Contratti annuali con volumi minimi + indicizzazione materia prima', costo_mensile:700, costo_setup:1000, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola e clienti storici', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'LinkedIn aziendale con capacità produttive e foto reparto', costo_mensile:80, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Portali + fiere', cosa:'Portali subfornitura (MFG.com, Europages) + fiere locali', costo_mensile:400, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'Agenzia digital', cosa:'Campagne LinkedIn mirate su responsabili acquisti industriali', costo_mensile:900, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — fiere + digital + certificazioni come asset', costo_mensile:2000, costo_setup:2500, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con lavorazioni, capacità, parco macchine, certificazioni', costo_mensile:80, costo_setup:800, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Case study + video + modulo richiesta preventivo online', costo_mensile:250, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'Agenzia SEO', cosa:'SEO su lavorazioni specifiche + zona geografica', costo_mensile:500, costo_setup:1200, tempo_mesi:2 },
      '5': { chi:'Sito avanzato', cosa:'Portale clienti — tracking commesse, documenti, certificati', costo_mensile:800, costo_setup:6000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Canale digitale B2B',
      '1': { chi:'Nessuno', cosa:'Nessuna presenza digitale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Iscrizione portali subfornitura B2B', costo_mensile:30, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Configuratore', cosa:'Preventivatore online per lavorazioni standard', costo_mensile:200, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Portale B2B', cosa:'Portale ordini ricorrenti per clienti esistenti', costo_mensile:400, costo_setup:3000, tempo_mesi:3 },
      '5': { chi:'Integrazione digitale', cosa:'Integrazione ordini con ERP clienti principali', costo_mensile:700, costo_setup:6000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MANIFATTURIERO ELETTROMECCANICA
  // ═══════════════════════════════════════════════════════════════════════════
  manifatturiero_elettromeccanica: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare gestisce i clienti — nessun venditore', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Visite a costruttori macchine — solo trasferte', costo_mensile:300, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'1 agente', cosa:'1 agente tecnico-commerciale — provvigioni ~1.500€/mese', costo_mensile:1500, costo_setup:0, tempo_mesi:2 },
      '4': { chi:'1 commerciale', cosa:'1 commerciale offerte complesse — lordo azienda ~3.200€', costo_mensile:3200, costo_setup:0, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale + export', cosa:'Dir. commerciale + export OEM', costo_mensile:7500, costo_setup:0, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — offerte su email e carta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel strutturato — progetto, cliente, valore, stato, tempi', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per offerte, commesse e follow-up post-vendita', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM integrato con gestionale — da offerta a produzione quadro', costo_mensile:350, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'ERP integrato', cosa:'ERP completo — preventivazione, distinte base, produzione, collaudo', costo_mensile:700, costo_setup:4000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Capo officina gestisce quotidiano', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Ruoli progettazione/produzione separati', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'KPI + project management', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management tecnico + commerciale', costo_mensile:1500, costo_setup:2000, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni quadro è un progetto a sé', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Template preventivo standard — distinta base + ore montaggio', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'SW progettazione', cosa:'Software progettazione elettrica (EPLAN, SEE Electrical)', costo_mensile:300, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'ERP + collaudo', cosa:'Gestionale con distinte base, collaudo e certificazione CE', costo_mensile:600, costo_setup:2500, tempo_mesi:3 },
      '5': { chi:'Quality manager', cosa:'ISO 9001 + procedure collaudo FAT/SAT + lean production', costo_mensile:1200, costo_setup:7000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Nessun controllo margini — prezzi a esperienza', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Calcolo costi reali — componenti + ore progettazione + montaggio', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Upsell tecnico', cosa:'Servizi a valore aggiunto — progettazione, retrofit, assistenza', costo_mensile:200, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'Contratti ricorrenti', cosa:'Contratti manutenzione quadri e impianti installati', costo_mensile:400, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Contratti quadro OEM + revenue da ricambi e service', costo_mensile:900, costo_setup:1500, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola nel distretto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'LinkedIn con foto quadri realizzati e certificazioni', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Fiere', cosa:'Fiere automazione (SPS Italia, MECSPE) — stand e demo', costo_mensile:500, costo_setup:5000, tempo_mesi:2 },
      '4': { chi:'Agenzia digital', cosa:'Campagne LinkedIn su uffici tecnici e resp. produzione', costo_mensile:1000, costo_setup:1200, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — fiere + content tecnico + partnership vendor', costo_mensile:2500, costo_setup:3000, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o sito datato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con tipologie quadri, certificazioni, settori serviti', costo_mensile:80, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Portfolio realizzazioni + video collaudo + richiesta preventivo', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Agenzia SEO', cosa:'SEO su parole chiave (quadri elettrici, automazione + zona)', costo_mensile:550, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Sito avanzato', cosa:'Area riservata clienti — schemi, certificati CE, manuali', costo_mensile:900, costo_setup:7000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Canale digitale B2B',
      '1': { chi:'Nessuno', cosa:'Nessuna presenza digitale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Portali B2B automazione e impiantistica', costo_mensile:30, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Configuratore', cosa:'Configuratore base per quadri standard e componenti', costo_mensile:250, costo_setup:3500, tempo_mesi:2 },
      '4': { chi:'E-commerce ricambi', cosa:'E-commerce ricambi e componenti per clienti esistenti', costo_mensile:500, costo_setup:4000, tempo_mesi:3 },
      '5': { chi:'Piattaforma integrata', cosa:'Portale clienti — ordini ricorrenti, documentazione, assistenza', costo_mensile:900, costo_setup:8000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MANIFATTURIERO TESSILE TESSUTI
  // ═══════════════════════════════════════════════════════════════════════════
  manifatturiero_tessile_tessuti: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare gestisce clienti storici — nessun venditore', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Campionatura proattiva verso confezionisti e brand', costo_mensile:400, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'1 agente', cosa:'1 agente moda/arredamento — provvigioni ~1.500€/mese', costo_mensile:1500, costo_setup:0, tempo_mesi:2 },
      '4': { chi:'1 commerciale + showroom', cosa:'1 commerciale + showroom campionari', costo_mensile:3500, costo_setup:2000, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale + agenti', cosa:'Dir. commerciale + agenti Italia/estero', costo_mensile:8000, costo_setup:3000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini per telefono e email', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con clienti, campionature inviate, ordini in corso', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per campionature, riordini stagionali e follow-up', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM + gestionale produzione — capacità telai e tempi consegna', costo_mensile:400, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'ERP tessile', cosa:'ERP tessile integrato — ordini, pianificazione, qualità, spedizioni', costo_mensile:800, costo_setup:5000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli telaio/finissaggio definiti', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Resp. tecnico sviluppo tessuti', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'KPI produzione + qualità', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management produzione/commerciale', costo_mensile:1500, costo_setup:2000, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — produzione a esperienza del titolare', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Scheda tecnica per articolo — composizione, peso, resa, colori', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Software gestionale', cosa:'Gestionale produzione con pianificazione telai e tintoria', costo_mensile:400, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Consulente + audit', cosa:'Certificazioni tessili (OEKO-TEX, GOTS, GRS per riciclato)', costo_mensile:700, costo_setup:5000, tempo_mesi:4 },
      '5': { chi:'Quality manager', cosa:'Controllo qualità statistico + tracciabilità lotto completa', costo_mensile:1300, costo_setup:3000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzi a metro fissi — nessuna differenziazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Calcolo costo reale per articolo — filato, energia, ore telaio', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Pricing strutturato', cosa:'Pricing differenziato — metrature minime, urgenze, colori speciali', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'Prodotto a valore', cosa:'Sviluppo tessuti esclusivi per brand — margini premium', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Contratti stagionali con brand + revenue da sviluppo campionari', costo_mensile:800, costo_setup:1500, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola nel distretto tessile', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'LinkedIn + foto campionari e impianti', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Fiere', cosa:'Fiere tessili (Milano Unica, Première Vision) — stand campionari', costo_mensile:600, costo_setup:6000, tempo_mesi:2 },
      '4': { chi:'Agenzia digital', cosa:'Campagne digitali verso brand e studi di design', costo_mensile:1000, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — fiere internazionali + lookbook digitale + PR', costo_mensile:2500, costo_setup:4000, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o sito datato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con catalogo tessuti, composizioni e certificazioni', costo_mensile:80, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Lookbook digitale + richiesta campioni online', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Sito avanzato', cosa:'Area riservata con cartelle colore e disponibilità metrature', costo_mensile:600, costo_setup:4000, tempo_mesi:2 },
      '5': { chi:'Piattaforma B2B', cosa:'Portale B2B — ordini, tracking produzione, riordini stagionali', costo_mensile:1000, costo_setup:8000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Approvvigionamento filati',
      '1': { chi:'Titolare', cosa:'Acquisto filato dal solito fornitore — nessuna diversificazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Mappatura fornitori alternativi — confronto prezzi e qualità', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Buyer part-time', cosa:'3-4 fornitori attivi con accordi di prezzo stagionali', costo_mensile:500, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Buyer dedicato', cosa:'Buyer dedicato — negoziazione volumi, stoccaggio strategico', costo_mensile:2000, costo_setup:500, tempo_mesi:3 },
      '5': { chi:'Resp. acquisti', cosa:'Strategia acquisti strutturata — hedging, contratti quadro, import', costo_mensile:3500, costo_setup:1500, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MANIFATTURIERO TESSILE CAPI
  // ═══════════════════════════════════════════════════════════════════════════
  manifatturiero_tessile_capi: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare vende ai soliti brand — nessun venditore', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Campionario stagionale proattivo verso nuovi brand e catene', costo_mensile:500, costo_setup:800, tempo_mesi:1 },
      '3': { chi:'1 agente', cosa:'1 agente moda brand/catene — provvigioni ~1.800€/mese', costo_mensile:1800, costo_setup:0, tempo_mesi:2 },
      '4': { chi:'1 commerciale + showroom', cosa:'1 commerciale + showroom campagne vendita', costo_mensile:3500, costo_setup:2500, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale + agenti', cosa:'Dir. commerciale + agenti export', costo_mensile:8500, costo_setup:3000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini stagionali a voce', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con ordini, campionature inviate, conferme pendenti', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per gestione campagne vendita e riordini', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM + gestionale — capacità produttiva e tempi consegna', costo_mensile:400, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'ERP moda', cosa:'ERP moda — dalla campagna vendita alla produzione alla spedizione', costo_mensile:900, costo_setup:5000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli sartoria definiti', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Resp. produzione campionari', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'KPI + pianificazione stagionale', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management completo', costo_mensile:1500, costo_setup:2000, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — si cuce e si spedisce', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Scheda tecnica per capo — taglie, materiali, tempi, costi', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Software gestionale', cosa:'Gestionale taglie/colori con pianificazione produzione', costo_mensile:400, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Consulente qualità', cosa:'Controllo qualità AQL + compliance etichettatura (reg. UE)', costo_mensile:600, costo_setup:2000, tempo_mesi:3 },
      '5': { chi:'Quality manager', cosa:'Tracciabilità filiera completa + certificazioni sostenibilità', costo_mensile:1200, costo_setup:5000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzi a capo fissi — margini bassi su grandi volumi', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Calcolo costo reale per capo — tessuto, lavorazione, finiture', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Pricing strutturato', cosa:'Differenziazione prezzo per complessità e metratura minima', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'Servizio private label', cosa:'Private label come servizio premium — margini 30-40% superiori', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Collezioni proprie o co-branded + revenue da sviluppo prototipi', costo_mensile:800, costo_setup:2000, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo contatti nel distretto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Instagram con foto capi e produzione + LinkedIn B2B', costo_mensile:150, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Fiere', cosa:'Fiere moda (Première Vision, White, Pitti) — stand campionari', costo_mensile:600, costo_setup:6000, tempo_mesi:2 },
      '4': { chi:'Agenzia digital', cosa:'Campagne digitali verso buyer brand e catene retail', costo_mensile:1000, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — fiere + lookbook + PR + influencer B2B', costo_mensile:2500, costo_setup:4000, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o sito datato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con portfolio capi, capacità e certificazioni', costo_mensile:80, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Lookbook digitale stagionale + richiesta campioni online', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Sito avanzato', cosa:'Area B2B — catalogo, disponibilità, ordini campioni', costo_mensile:600, costo_setup:4000, tempo_mesi:2 },
      '5': { chi:'Piattaforma B2B', cosa:'Portale B2B con ordini, tracking produzione, documenti', costo_mensile:1000, costo_setup:8000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Approvvigionamento tessuti',
      '1': { chi:'Titolare', cosa:'Acquisto tessuti dal solito fornitore — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Mappatura fornitori tessuti — confronto prezzi e MOQ', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Buyer part-time', cosa:'3-4 fornitori attivi + acquisto tessuti a stock per reattività', costo_mensile:500, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Buyer dedicato', cosa:'Buyer dedicato — negoziazione, import diretto, magazzino tessuti', costo_mensile:2000, costo_setup:500, tempo_mesi:3 },
      '5': { chi:'Resp. acquisti', cosa:'Sourcing internazionale, contratti quadro, hedging', costo_mensile:3500, costo_setup:1500, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SERVIZI IT
  // ═══════════════════════════════════════════════════════════════════════════
  servizi_it: {
vendite: {
      '1': { chi:'Titolare solo', cosa:'Solo il titolare vende \u2014 assistenza e vendita insieme', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Mappatura PMI zona con IT datato \u2014 visite dirette', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'+1 account manager', cosa:'1 account manager dedicato \u2014 sviluppa portafoglio e rinnovi', costo_mensile:2500, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'+1 pre-sales (tot 2)', cosa:'Account + tecnico pre-sales per gare e clienti strutturati', costo_mensile:5300, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Sales mgr + team', cosa:'Sales manager + account per verticale + business developer', costo_mensile:8000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ticket e vendite confusi insieme', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con trattative aperte e scadenze contratti esistenti', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM con pipeline + alert scadenza contratti — il rinnovo è oro', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + ticketing', cosa:'CRM integrato con ticketing — visione dal contratto al supporto', costo_mensile:300, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'PSA completo', cosa:'CRM + PSA (Professional Services Automation) completo', costo_mensile:700, costo_setup:3000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Tutto dipende dal titolare \u2014 nessuna delega', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Know-how documentato \u2014 non dipende da una sola persona', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Ruoli definiti per specializzazione (cloud, security, network)', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'Processi decisionali autonomi per team', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Manager operativo', cosa:'Governance con delega completa \u2014 titolare solo strategia', costo_mensile:1500, costo_setup:2000, tempo_mesi:6 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — si risponde quando il cliente chiama', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Contratti di servizio standard — SLA, tempi risposta, escalation', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Ticketing', cosa:'Sistema ticketing (Freshdesk, Zendesk) per gestione richieste', costo_mensile:100, costo_setup:500, tempo_mesi:1 },
      '4': { chi:'RMM + monitoring', cosa:'Monitoraggio proattivo — avvisare il cliente prima del problema', costo_mensile:500, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Quality + security', cosa:'ISO 27001 + procedure incident response + audit periodici', costo_mensile:1200, costo_setup:6000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Interventi a chiamata — fatturato imprevedibile', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Contratti manutenzione mensili — stabilizza il ricavo', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Cloud specialist', cosa:'Upsell cloud — migrazione M365/Azure per recurring revenue', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Security specialist', cosa:'Divisione cybersecurity — servizi ad alto margine', costo_mensile:800, costo_setup:1500, tempo_mesi:3 },
      '5': { chi:'Revenue manager', cosa:'MSSP (Managed Security Services) — ricorrente margini >50%', costo_mensile:1500, costo_setup:3000, tempo_mesi:4 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola tra clienti', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Google My Business ottimizzato + referenze portali locali', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Partnership', cosa:'Partnership vendor (Microsoft, Cisco) — lead da directory', costo_mensile:400, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Agenzia digital', cosa:'Content marketing su cybersecurity e cloud per PMI', costo_mensile:1000, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Account based marketing sulle 100 PMI target della zona', costo_mensile:2500, costo_setup:3000, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o sito datato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con servizi, certificazioni e case study PMI', costo_mensile:80, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito + blog', cosa:'Blog su cybersecurity e digital transformation per PMI', costo_mensile:300, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'Sito avanzato', cosa:'Assessment tool — "Quanto è sicura la tua infrastruttura?"', costo_mensile:600, costo_setup:4000, tempo_mesi:2 },
      '5': { chi:'Piattaforma clienti', cosa:'Portale clienti con dashboard servizi, SLA e ticket', costo_mensile:1000, costo_setup:7000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Approvvigionamento IT + Licensing',
      '1': { chi:'Titolare', cosa:'Acquisto HW e licenze dal solito distributore — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Accordi con 2-3 distributori (Ingram, Esprinet) — confronto prezzi', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CSP partner', cosa:'CSP Microsoft attivo — rivendita licenze M365/Azure con margine', costo_mensile:200, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Buyer IT', cosa:'Buyer dedicato + accordi volume con vendor e distributori', costo_mensile:800, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti + portale', cosa:'Strategia licensing + portale rivendita + contratti quadro vendor', costo_mensile:1500, costo_setup:3000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SERVIZI FORMAZIONE
  // ═══════════════════════════════════════════════════════════════════════════
  servizi_formazione: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare/formatore vende i propri corsi \u2014 nessun commerciale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Proposta proattiva verso HR e resp. formazione aziende zona', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'+1 commerciale', cosa:'1 commerciale dedicato \u2014 sviluppo clienti corporate e enti', costo_mensile:2500, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'+1 comm. (tot 2)', cosa:'Team vendite \u2014 corporate + PA/bandi + catalogo', costo_mensile:5000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Rete + partnership', cosa:'Rete segnalatori + partnership consulenti', costo_mensile:3500, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — corsi venduti a richiesta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con aziende contattate, proposte inviate, follow-up', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per pipeline corporate e scadenze fondi interprofessionali', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + consulente bandi', cosa:'CRM + gestione bandi e fondi (Fondimpresa, Fondirigenti)', costo_mensile:500, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'CRM + LMS integrato', cosa:'CRM integrato con LMS e fatturazione — ciclo completo', costo_mensile:1200, costo_setup:4000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Titolare fa tutto \u2014 nessuna organizzazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Catalogo corsi strutturato con programmi definiti', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Coordinamento rete formatori freelance', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'KPI per formatore + pianificazione didattica', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Direttore academy', cosa:'Governance didattica \u2014 titolare solo strategia', costo_mensile:1500, costo_setup:2000, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni corso è improvvisato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Catalogo corsi standard con programmi e durate definite', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Gestionale corsi', cosa:'Processo iscrizione + materiali + valutazione apprendimento', costo_mensile:200, costo_setup:800, tempo_mesi:2 },
      '4': { chi:'LMS (Moodle, Docebo)', cosa:'LMS per e-learning + blended learning strutturato', costo_mensile:800, costo_setup:3000, tempo_mesi:3 },
      '5': { chi:'Quality manager', cosa:'Certificazione qualità (ISO 21001) + accreditamento regionale', costo_mensile:1500, costo_setup:8000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Corsi a giornata — fatturato a singhiozzo', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Pacchetti formativi annuali per aziende — ricavo prevedibile', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Consulente bandi', cosa:'Formazione finanziata — fondi interprofessionali come leva', costo_mensile:600, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Produzione contenuti', cosa:'E-learning a catalogo — ricavo passivo da corsi registrati', costo_mensile:1000, costo_setup:3000, tempo_mesi:3 },
      '5': { chi:'Revenue manager', cosa:'Academy aziendale white-label per grandi clienti — margini premium', costo_mensile:2000, costo_setup:5000, tempo_mesi:4 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola e contatti personali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'LinkedIn personale del titolare con post su temi formativi', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Webinar + email', cosa:'Webinar gratuiti come lead generation + newsletter', costo_mensile:400, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Agenzia digital', cosa:'Campagne LinkedIn Ads verso HR e responsabili formazione', costo_mensile:1000, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — eventi + content + partnership + PR', costo_mensile:2500, costo_setup:3000, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina personale datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con catalogo corsi, formatori, testimonianze', costo_mensile:100, costo_setup:1200, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Iscrizione online + pagamento + calendario corsi', costo_mensile:350, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'Sito avanzato', cosa:'Area riservata con materiali, attestati e storico formazione', costo_mensile:800, costo_setup:5000, tempo_mesi:2 },
      '5': { chi:'LMS + e-commerce', cosa:'Piattaforma e-learning integrata con e-commerce corsi', costo_mensile:2000, costo_setup:12000, tempo_mesi:4 },
    },
    ecommerce: {
      _label: 'Approvvigionamento docenti e contenuti',
      '1': { chi:'Titolare', cosa:'Nessun approvvigionamento strutturato di contenuti/docenti', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Rete di 3-5 formatori freelance con tariffe concordate', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Accordi formali', cosa:'Accordi con enti certificatori + materiali didattici licenziati', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Partnership + produzione', cosa:'Partnership piattaforme + videomaker per contenuti e-learning', costo_mensile:1500, costo_setup:3000, tempo_mesi:3 },
      '5': { chi:'Resp. contenuti + studio', cosa:'Resp. contenuti + rete 15+ docenti + studio produzione video', costo_mensile:3500, costo_setup:6000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EDILIZIA RESIDENZIALE
  // ═══════════════════════════════════════════════════════════════════════════
  edilizia_residenziale: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare trova lavori tramite passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Rapporti con geometri e architetti della zona', costo_mensile:150, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Titolare strutturato', cosa:'Preventivi professionali + sopralluoghi proattivi', costo_mensile:300, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'+1 commerciale', cosa:'1 commerciale condomini/studi tecnici/enti', costo_mensile:2500, costo_setup:500, tempo_mesi:3 },
      '5': { chi:'Gare + segnalatori', cosa:'Gare pubbliche SOA + rete segnalatori', costo_mensile:3000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — preventivi fatti e dimenticati', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con preventivi aperti, sopralluoghi fatti, follow-up', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per gestire preventivi, cantieri e referenze clienti', costo_mensile:50, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM + gestionale cantieri — margini, avanzamento, SAL', costo_mensile:300, costo_setup:1200, tempo_mesi:2 },
      '5': { chi:'ERP edile', cosa:'ERP edile — preventivazione, contabilità cantiere, fatturazione', costo_mensile:600, costo_setup:3000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Titolare sempre in cantiere \u2014 decide tutto al momento', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Capo cantiere gestisce \u2014 il titolare esce dal cantiere', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Ruoli definiti cantiere/ufficio \u2014 deleghe operative', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'KPI commessa + processi decisionali delegati', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Manager operativo', cosa:'Management \u2014 titolare solo strategia e clienti top', costo_mensile:1500, costo_setup:1500, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni cantiere è diverso', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Computo metrico standard + template preventivo professionale', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Software cantiere', cosa:'Gestionale cantiere — pianificazione lavori e controllo costi', costo_mensile:250, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Consulente fiscale', cosa:'Gestione bonus fiscali — pratiche, asseverazioni, cessioni', costo_mensile:500, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Quality + SOA', cosa:'SOA + certificazioni + sistema qualità cantiere', costo_mensile:1000, costo_setup:6000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzi al ribasso per prendere i lavori — margini minimi', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Calcolo costi reali per cantiere — materiali, ore, subappalti', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Upsell strutturato', cosa:'Preventivi con voci separate — upsell su finiture e varianti', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'Contratti ricorrenti', cosa:'Contratti manutenzione post-cantiere — ricavo ricorrente', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'General contractor — gestione completa con margine su subappalti', costo_mensile:600, costo_setup:1000, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola nel quartiere', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Google My Business con foto cantieri prima/dopo + recensioni', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Portali', cosa:'Presenza su portali ristrutturazione (Houzz, Habitissimo)', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Agenzia digital', cosa:'Google Ads locali + campagne social prima/dopo lavori', costo_mensile:800, costo_setup:1200, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — portfolio, partnership architetti, eventi locali', costo_mensile:2000, costo_setup:2500, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito — solo pagina Facebook', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con portfolio lavori, servizi e zona operativa', costo_mensile:80, costo_setup:800, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Gallery prima/dopo + preventivo online + recensioni', costo_mensile:250, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'Sito + SEO', cosa:'Blog su bonus fiscali e ristrutturazione + SEO locale', costo_mensile:500, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Sito avanzato', cosa:'Configuratore preventivo online per ristrutturazioni standard', costo_mensile:800, costo_setup:5000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Approvvigionamento materiali e subappalti',
      '1': { chi:'Titolare', cosa:'Acquisto materiali dal solito magazzino edile — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Confronto prezzi tra 2-3 fornitori per ogni cantiere', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Accordi fornitori', cosa:'Accordi quadro con fornitori materiali — prezzi riservati', costo_mensile:0, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Gestione subappalti', cosa:'Rete subappaltatori qualificati con tariffe concordate', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — negoziazione volumi, stoccaggio, import diretto', costo_mensile:1500, costo_setup:1000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EDILIZIA IMPIANTI
  // ═══════════════════════════════════════════════════════════════════════════
  edilizia_impianti: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare trova lavori tramite passaparola e imprese', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Rapporti con studi tecnici e amministratori condominio', costo_mensile:150, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Titolare strutturato', cosa:'Preventivi + proposta efficientamento su ogni sopralluogo', costo_mensile:300, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'+1 commerciale', cosa:'1 commerciale condomini/industria/PA', costo_mensile:2500, costo_setup:500, tempo_mesi:3 },
      '5': { chi:'Rete + gare', cosa:'Rete installatori partner + gare pubbliche', costo_mensile:3000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — chiamate e preventivi a memoria', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con preventivi, impianti installati, scadenze manutenzione', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per preventivi + scadenze contratti manutenzione', costo_mensile:50, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM + gestionale interventi — programmazione e consuntivo', costo_mensile:300, costo_setup:1200, tempo_mesi:2 },
      '5': { chi:'ERP impiantistica', cosa:'ERP impiantistica — preventivi, commesse, magazzino, fatturazione', costo_mensile:600, costo_setup:3000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Titolare sugli impianti \u2014 decide tutto al momento', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Capo squadra gestisce cantieri \u2014 titolare si libera', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Ruoli definiti installazione/ufficio', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'KPI + programmazione interventi delegata', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Manager operativo', cosa:'Management \u2014 deleghe complete', costo_mensile:1500, costo_setup:1500, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni impianto è gestito a esperienza', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Scheda impianto standard — specifiche, materiali, tempi, costi', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Software gestionale', cosa:'Gestionale interventi con programmazione manutenzioni', costo_mensile:250, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Consulente + procedure', cosa:'Certificazioni obbligatorie strutturate (DM 37/08) + sicurezza', costo_mensile:500, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Quality manager', cosa:'ISO 9001 + gestione garanzie + audit qualità impianti', costo_mensile:1000, costo_setup:5000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Installazione a prezzo fisso — nessun ricavo ricorrente', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Calcolo costi reali — materiali, ore, spostamenti', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Contratti ricorrenti', cosa:'Contratti manutenzione annuali — caldaie, condizionatori, impianti', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'Upsell strutturato', cosa:'Upsell efficientamento energetico + bonus fiscali come leva', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Contratti full-service condomini e industria — ricavo garantito', costo_mensile:800, costo_setup:1500, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Google My Business + foto impianti realizzati + recensioni', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Portali', cosa:'Portali locali (PagineGialle, Instapro) + partnership edili', costo_mensile:300, costo_setup:400, tempo_mesi:2 },
      '4': { chi:'Agenzia digital', cosa:'Google Ads locali su manutenzione e efficientamento', costo_mensile:700, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — referenze, partnership costruttori, eventi', costo_mensile:1800, costo_setup:2500, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito — solo pagina social', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con servizi, zona operativa, foto impianti', costo_mensile:80, costo_setup:800, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Portfolio lavori + preventivo online + recensioni', costo_mensile:250, costo_setup:1800, tempo_mesi:2 },
      '4': { chi:'Sito + SEO', cosa:'Blog su risparmio energetico e bonus + SEO locale', costo_mensile:450, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Sito avanzato', cosa:'Area clienti — storico impianti, scadenze manutenzione, documenti', costo_mensile:750, costo_setup:4000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Approvvigionamento materiali',
      '1': { chi:'Titolare', cosa:'Acquisto materiali dal grossista di fiducia — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Confronto prezzi tra 2-3 grossisti per ogni commessa', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Accordi distributori', cosa:'Accordi quadro con distributori — prezzi riservati e consegna rapida', costo_mensile:0, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Magazzino strutturato', cosa:'Magazzino materiali ricorrenti + gestione scorte minime', costo_mensile:400, costo_setup:800, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — accordi volume, import diretto, stoccaggio', costo_mensile:1500, costo_setup:1000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EDILIZIA SERRAMENTI
  // ═══════════════════════════════════════════════════════════════════════════
  edilizia_serramenti: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare vende dallo showroom', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Sopralluoghi a domicilio + preventivi strutturati', costo_mensile:200, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'+1 venditore showroom', cosa:'1 venditore showroom dedicato', costo_mensile:2200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'+1 comm. B2B (tot 2)', cosa:'+ commerciale B2B imprese edili e architetti', costo_mensile:4700, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Rete + gare', cosa:'Rete posatori partner + gare ristrutturazione', costo_mensile:3500, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — preventivi su carta e dimenticati', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con preventivi, sopralluoghi, stato trattativa', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per preventivi + follow-up post-sopralluogo', costo_mensile:50, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'CRM + configuratore', cosa:'CRM + configuratore infissi per preventivi automatici', costo_mensile:400, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'CRM + gestionale', cosa:'CRM integrato con gestionale ordini e produzione/fornitori', costo_mensile:700, costo_setup:3500, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Titolare gestisce tutto \u2014 showroom e posa', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli showroom/posa separati', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Riunioni + obiettivi per ruolo', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'KPI + processi decisionali delegati', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Manager operativo', cosa:'Management \u2014 titolare solo strategia', costo_mensile:1500, costo_setup:1500, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — preventivi a mano, posa senza procedura', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Template preventivo con misure, materiali, posa e smaltimento', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Software configuratore', cosa:'Configuratore infissi per preventivi veloci e precisi', costo_mensile:300, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Gestionale', cosa:'Gestionale ordini — da preventivo a ordine fornitore a posa', costo_mensile:500, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'Quality + certificazione', cosa:'Certificazione posa qualificata + gestione garanzie + NPS', costo_mensile:900, costo_setup:4000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Vendita infissi con margine base — nessun upsell', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Calcolo margini reali per prodotto — PVC vs alluminio vs legno', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Upsell strutturato', cosa:'Upsell sistematico — zanzariere, oscuranti, cassonetti, VMC', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'Consulente fiscale', cosa:'Bonus fiscali come leva di vendita — gestione pratiche inclusa', costo_mensile:400, costo_setup:800, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Contratti con imprese edili — fornitura + posa su cantieri', costo_mensile:800, costo_setup:1500, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo insegna showroom e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Google My Business + foto showroom e lavori realizzati', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Agenzia digital', cosa:'Google Ads locali su "infissi + città" + portali casa', costo_mensile:600, costo_setup:800, tempo_mesi:2 },
      '4': { chi:'Social + ads', cosa:'Campagne social con prima/dopo + video posa + recensioni', costo_mensile:1000, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — eventi showroom, partnership architetti, PR', costo_mensile:2200, costo_setup:3000, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con catalogo infissi, showroom, zona operativa', costo_mensile:80, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Gallery lavori + preventivo online + simulatore colori', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Sito + configuratore', cosa:'Configuratore infissi online — misure, materiali, prezzo indicativo', costo_mensile:600, costo_setup:5000, tempo_mesi:2 },
      '5': { chi:'Sito avanzato', cosa:'E-commerce accessori + prenotazione sopralluogo + area clienti', costo_mensile:900, costo_setup:6000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Approvvigionamento infissi',
      '1': { chi:'Titolare', cosa:'Acquisto infissi da un solo produttore — nessuna alternativa', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Confronto tra 2-3 produttori — prezzi e tempi di consegna', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Accordi fornitori', cosa:'Accordi quadro con produttori — sconti volume e priorità consegna', costo_mensile:0, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Buyer dedicato', cosa:'Multi-fornitore strutturato — PVC da uno, alluminio da un altro', costo_mensile:500, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti', cosa:'Partnership produttori + private label + import diretto', costo_mensile:1500, costo_setup:1500, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO DISTRIBUZIONE INDUSTRIALE
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_distribuzione_industriale: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare al banco — chi viene compra', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Visite ai 20 clienti top — sviluppo proattivo', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'1 agente', cosa:'1 agente plurimandatario con portafoglio industriale zona', costo_mensile:1500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'KAM + inside sales', cosa:'1 KAM clienti strategici + 1 inside sales', costo_mensile:4800, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale', cosa:'Dir. commerciale + agenti + inside sales', costo_mensile:8000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini a telefono e banco', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con clienti attivi, frequenza ordini, prodotti principali', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM con alert riordini e follow-up clienti dormienti', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + ERP', cosa:'CRM integrato con ERP — stock, prezzi, storico in tempo reale', costo_mensile:500, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'ERP distribuzione', cosa:'ERP completo — clienti, acquisti, magazzino, logistica', costo_mensile:1000, costo_setup:5000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli banco/magazzino definiti — chi fa cosa è chiaro', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Procedure ordini e consegne formalizzate', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente + titolare', cosa:'KPI per canale + deleghe operative', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management commerciale + logistica strutturato', costo_mensile:1500, costo_setup:1500, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ordini gestiti a memoria e su carta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Gestione ordini strutturata — conferma, tempi, back order', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Software gestionale', cosa:'Gestionale magazzino — giacenze, riordino automatico, inventario', costo_mensile:300, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'ERP distribuzione', cosa:'ERP con gestione listini per cliente e ordini urgenti', costo_mensile:600, costo_setup:3000, tempo_mesi:2 },
      '5': { chi:'ERP + EDI', cosa:'EDI con clienti principali + logistica ottimizzata', costo_mensile:1000, costo_setup:5000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine fisso da listino — nessuna differenziazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Pricing differenziato per volume e categoria cliente', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Servizi a valore', cosa:'Servizi a valore — consegna rapida, magazzino conto deposito', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'Accordi commerciali', cosa:'Accordi fornitura esclusiva con clienti principali', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Kitting, just-in-time, VMI — margini superiori alla distribuzione', costo_mensile:700, costo_setup:1500, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo clienti storici e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Catalogo digitale aggiornato + newsletter mensile ai clienti', costo_mensile:100, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Fiere', cosa:'Fiere industriali locali (MECSPE, BI-MU) — stand base', costo_mensile:400, costo_setup:4000, tempo_mesi:2 },
      '4': { chi:'Agenzia digital', cosa:'Campagne LinkedIn su resp. acquisti e produzione industriale', costo_mensile:800, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — fiere + digital + catalogo + promozioni', costo_mensile:2000, costo_setup:2500, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o sito vetrina datato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con catalogo prodotti e schede tecniche scaricabili', costo_mensile:100, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Area riservata con prezzi, storico ordini, documentazione', costo_mensile:350, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'Sito avanzato', cosa:'E-catalogue con disponibilità stock e tempi di consegna', costo_mensile:600, costo_setup:5000, tempo_mesi:2 },
      '5': { chi:'Piattaforma B2B', cosa:'Portale B2B — ordini online, tracking spedizioni, fatturazione', costo_mensile:1200, costo_setup:10000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Approvvigionamento e fornitori',
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 grossisti — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Confronto fornitori sistematico — prezzi, MOQ, tempi consegna', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Accordi fornitori', cosa:'Accordi quadro con produttori — sconti volume e priorità', costo_mensile:0, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Buyer', cosa:'Buyer dedicato — negoziazione, import diretto, stoccaggio', costo_mensile:1500, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — contratti quadro, import, private label', costo_mensile:3000, costo_setup:1500, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO INGROSSO ALIMENTARE
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_ingrosso_alimentare: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare gestisce clienti storici — ordini per telefono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Visite pianificate HORECA/negozi della zona', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Titolare strutturato', cosa:'Sviluppo canale HORECA — degustazioni, campionature', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'1 agente', cosa:'1 agente dedicato HORECA o GDO', costo_mensile:1800, costo_setup:500, tempo_mesi:3 },
      '5': { chi:'Strategia + agenti export', cosa:'Strategia private label + agenti export', costo_mensile:3000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini per telefono e WhatsApp', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con clienti, frequenza ordini, prodotti principali', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM + gestione listini e promozioni per cliente', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'Gestionale ordini con route planning consegne', costo_mensile:500, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'ERP alimentare', cosa:'ERP alimentare — ordini, magazzino, tracciabilità, logistica', costo_mensile:1200, costo_setup:6000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli magazzino/consegne definiti — chi fa cosa è chiaro', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Procedure HACCP + gestione scadenze formalizzate', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente + titolare', cosa:'KPI + deleghe ordini/logistica', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management completo — commerciale + logistica + qualità', costo_mensile:1500, costo_setup:1500, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ordini e consegne gestiti a vista', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Tracciabilità lotti base + gestione scadenze prodotti', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Software + HACCP', cosa:'HACCP strutturato + gestionale magazzino con lotti e scadenze', costo_mensile:400, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Consulente + strumenti', cosa:'Gestione catena del freddo certificata + logistica ottimizzata', costo_mensile:700, costo_setup:2500, tempo_mesi:3 },
      '5': { chi:'Quality manager', cosa:'Certificazioni BRC/IFS + audit interni + sistema qualità', costo_mensile:1200, costo_setup:6000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine fisso da listino — nessun upsell', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Pricing per canale — HORECA, GDO, dettaglio differenziati', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Promozioni strutturate', cosa:'Promozioni settimanali + prodotti stagionali ad alto margine', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'Private label', cosa:'Private label per GDO locale — margini 15-20% superiori', costo_mensile:400, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Contratti annuali GDO + sviluppo linee premium e bio', costo_mensile:1000, costo_setup:2000, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo relazione diretta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Catalogo digitale + listino aggiornato via WhatsApp/email', costo_mensile:100, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Fiere', cosa:'Fiere alimentari (Cibus, TuttoFood) — stand e degustazione', costo_mensile:500, costo_setup:5000, tempo_mesi:2 },
      '4': { chi:'Agenzia digital', cosa:'Campagne digitali verso buyer GDO e HORECA', costo_mensile:800, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — fiere + catalogo + promozioni + PR settore', costo_mensile:2200, costo_setup:3000, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con catalogo prodotti, certificazioni, zona servita', costo_mensile:80, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Catalogo online con prezzi riservati per cliente registrato', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Portale ordini', cosa:'Ordini online B2B + disponibilità stock in tempo reale', costo_mensile:700, costo_setup:5000, tempo_mesi:2 },
      '5': { chi:'Piattaforma B2B', cosa:'Piattaforma B2B completa — ordini, tracking, fatturazione', costo_mensile:1200, costo_setup:10000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Approvvigionamento prodotti',
      '1': { chi:'Titolare', cosa:'Acquisto da produttori locali abituali — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Diversificazione fornitori — confronto prezzi e qualità', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Accordi fornitori', cosa:'Accordi quadro con produttori — volumi, prezzi stagionali', costo_mensile:0, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Buyer', cosa:'Buyer dedicato — negoziazione, import, gestione catena freddo', costo_mensile:1800, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — contratti annuali, sourcing internazionale', costo_mensile:3500, costo_setup:1500, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO MATERIALI EDILI
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_materiali_edili: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare al banco — chi viene compra', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Visite imprese edili/posatori della zona', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Titolare strutturato', cosa:'Sviluppo showroom — appuntamenti privati', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'1 agente', cosa:'1 agente esterno imprese/cantieri', costo_mensile:1800, costo_setup:500, tempo_mesi:3 },
      '5': { chi:'Strategia + gare', cosa:'Gare pubbliche + accordi quadro costruttori', costo_mensile:3000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — vendite al banco senza storico', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con clienti principali, frequenza acquisti, volumi', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per follow-up preventivi e gestione clienti imprese', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM + gestionale magazzino — stock, prezzi, listini cliente', costo_mensile:500, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'ERP completo', cosa:'ERP — ordini, magazzino, logistica consegne, fatturazione', costo_mensile:1000, costo_setup:5000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli banco/magazzino/showroom definiti — chi fa cosa è chiaro', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Procedure ordini e consegne formalizzate', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente + titolare', cosa:'KPI + deleghe operative', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management commerciale + logistica strutturato', costo_mensile:1500, costo_setup:1500, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — magazzino gestito a vista', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Gestione ordini strutturata — conferma, tempi consegna', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Software gestionale', cosa:'Gestionale magazzino — giacenze, riordino, inventario', costo_mensile:300, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Gestionale logistica', cosa:'Logistica consegne ottimizzata — route planning, mezzi', costo_mensile:600, costo_setup:2500, tempo_mesi:2 },
      '5': { chi:'ERP completo', cosa:'ERP integrato + gestione showroom + consegne pianificate', costo_mensile:1000, costo_setup:5000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine fisso da listino fornitore — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Pricing differenziato — imprese vs privati vs cantieri', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Upsell strutturato', cosa:'Upsell showroom — finiture, accessori, posa consigliata', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'Servizio a valore', cosa:'Servizio consegna in cantiere come voce a margine', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Contratti quadro con costruttori + private label su linee base', costo_mensile:700, costo_setup:1500, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo posizione e insegna', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Google My Business + foto showroom e magazzino', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Agenzia digital', cosa:'Google Ads locali su "materiali edili + città"', costo_mensile:500, costo_setup:800, tempo_mesi:2 },
      '4': { chi:'Social + ads', cosa:'Campagne social con progetti realizzati + promozioni stagionali', costo_mensile:900, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — eventi showroom, partnership progettisti', costo_mensile:2000, costo_setup:2500, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con catalogo prodotti, showroom, zona consegna', costo_mensile:80, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Catalogo ceramiche online + richiesta preventivo', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Sito avanzato', cosa:'Simulatore ambienti + disponibilità stock online', costo_mensile:600, costo_setup:5000, tempo_mesi:2 },
      '5': { chi:'Piattaforma B2B', cosa:'Portale B2B — ordini imprese, listini riservati, tracking', costo_mensile:1000, costo_setup:8000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Approvvigionamento materiali',
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 produttori abituali — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Confronto fornitori su prodotti principali — prezzi e tempi', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Accordi fornitori', cosa:'Accordi quadro con produttori ceramiche e cemento', costo_mensile:0, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Buyer', cosa:'Buyer dedicato — diversificazione fornitori, import diretto', costo_mensile:1500, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — contratti volume, stoccaggio strategico', costo_mensile:3000, costo_setup:1500, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO RICAMBI AUTO
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_ricambi_auto: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare al banco — officine vengono quando serve', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Visite officine/carrozzerie della zona', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Titolare strutturato', cosa:'Sviluppo flotte e noleggiatori — contratti fornitura', costo_mensile:400, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'1 agente', cosa:'1 agente officine fuori zona', costo_mensile:1800, costo_setup:500, tempo_mesi:3 },
      '5': { chi:'Strategia multicanale', cosa:'E-commerce ricambi + reti officine', costo_mensile:3000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — vendite al banco e telefono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con officine clienti, frequenza e volumi acquisto', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'Gestionale + TecDoc', cosa:'Gestionale con catalogo TecDoc integrato per ricerca rapida', costo_mensile:200, costo_setup:800, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM + gestionale — storico cliente, margini, alert riordini', costo_mensile:500, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'ERP ricambi', cosa:'ERP ricambi — ordini, magazzino, TecDoc, logistica, fatturazione', costo_mensile:1000, costo_setup:5000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli banco/magazzino/consegne definiti', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Procedure ordini urgenti formalizzate', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente + titolare', cosa:'KPI evasione ordini + tempi consegna', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management + ottimizzazione logistica', costo_mensile:1500, costo_setup:1500, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ricerca manuale su cataloghi cartacei', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Software TecDoc', cosa:'Catalogo elettronico TecDoc per ricerca per targa/VIN', costo_mensile:100, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Software gestionale', cosa:'Gestionale magazzino con giacenze e riordino automatico', costo_mensile:300, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Gestionale logistica', cosa:'Logistica consegne ottimizzata — route planning, tracking', costo_mensile:500, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'ERP completo', cosa:'ERP integrato + gestione resi + garanzie ricambi', costo_mensile:900, costo_setup:4000, tempo_mesi:3 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine da listino — nessuna differenziazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Pricing differenziato — officine abituali vs occasionali', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Upsell strutturato', cosa:'Upsell prodotti correlati — filtri, olio, pastiglie in kit', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'Accordi commerciali', cosa:'Contratti fornitura con officine — sconti volume, fidelizzazione', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Private label consumabili + revenue da consegna express', costo_mensile:700, costo_setup:1500, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo posizione e insegna', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Google My Business + WhatsApp Business per ordini rapidi', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Agenzia digital', cosa:'Google Ads locali su "ricambi auto + città"', costo_mensile:500, costo_setup:800, tempo_mesi:2 },
      '4': { chi:'Marketing operativo', cosa:'Promozioni mirate per officine — volantini, offerte stagionali', costo_mensile:800, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — digitale + partnership reti officine + eventi', costo_mensile:2000, costo_setup:2500, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito con catalogo marchi trattati, zona consegna, contatti', costo_mensile:80, costo_setup:800, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Ricerca ricambi online per targa/VIN + preventivo', costo_mensile:350, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'E-commerce B2B', cosa:'E-commerce ricambi B2B — ordini online con listini officina', costo_mensile:800, costo_setup:6000, tempo_mesi:2 },
      '5': { chi:'Piattaforma B2B', cosa:'Piattaforma completa — ordini, tracking, resi, fatturazione', costo_mensile:1500, costo_setup:12000, tempo_mesi:4 },
    },
    ecommerce: {
      _label: 'Approvvigionamento ricambi',
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 distributori abituali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Confronto prezzi tra distributori (Rhiag, LKQ, Autodis)', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Accordi distributori', cosa:'Accordi quadro con 3-4 distributori — sconti e priorità', costo_mensile:0, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Buyer', cosa:'Buyer dedicato — ottimizzazione stock, import aftermarket', costo_mensile:1500, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — contratti quadro, private label, import Asia', costo_mensile:3000, costo_setup:1500, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO ABBIGLIAMENTO INGROSSO
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_abbigliamento_ingrosso: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare vende direttamente — showroom e fiere', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Campionario stagionale proattivo ai buyer', costo_mensile:300, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'1 agente', cosa:'1 agente con portafoglio zona', costo_mensile:1500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'2-3 agenti', cosa:'2-3 agenti per zona — copertura regionale', costo_mensile:4000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Rete agenti + showroom', cosa:'Rete agenti + showroom permanente', costo_mensile:7000, costo_setup:2500, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini su carta e telefono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con clienti, ordini stagionali e pagamenti', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM con anagrafica buyer, storico ordini, preferenze', costo_mensile:300, costo_setup:500, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM integrato con gestionale ordini e magazzino', costo_mensile:600, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'ERP fashion B2B', cosa:'ERP fashion — ordini, campionario, spedizioni, fatturazione', costo_mensile:1200, costo_setup:4000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Pianificazione campagne vendita stagionali', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Ruoli magazzino/spedizioni formalizzati', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente + titolare', cosa:'KPI per agente + obiettivi stagione', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management coordinamento rete agenti', costo_mensile:1500, costo_setup:1500, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ordini gestiti a voce e su carta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Catalogo digitale PDF + listino prezzi strutturato', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Gestionale ordini', cosa:'Gestionale ordini con conferma automatica e tracking', costo_mensile:300, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Campionario digitale', cosa:'Campionario digitale + ordini agenti su tablet in showroom', costo_mensile:500, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'ERP + automazione', cosa:'ERP completo — ordini, magazzino, spedizioni, resi automatici', costo_mensile:900, costo_setup:4000, tempo_mesi:3 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine fisso su listino — nessuna strategia pricing', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Sconti volume differenziati per fasce ordine', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Pronto moda', cosa:'Linea pronto moda con margini superiori per riordini rapidi', costo_mensile:0, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Mix margini', cosa:'Mix prodotto ottimizzato — campionario, pronto, fine serie', costo_mensile:300, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Private label + accordi GDO + dynamic pricing per stagione', costo_mensile:800, costo_setup:2000, tempo_mesi:4 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo fiere e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Profilo Instagram B2B con foto collezioni', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Social + fiere', cosa:'Social professionale + partecipazione fiere settore', costo_mensile:500, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'Marketing operativo', cosa:'Lookbook digitale + campagne email per buyer + eventi showroom', costo_mensile:1000, costo_setup:2500, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing B2B — brand positioning, PR, fiere internazionali', costo_mensile:2500, costo_setup:5000, tempo_mesi:4 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina vetrina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito vetrina con collezioni, showroom, contatti', costo_mensile:80, costo_setup:800, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Catalogo online con lookbook e richiesta campionario', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Portale B2B', cosa:'Portale B2B con ordini online, listini riservati, disponibilità', costo_mensile:700, costo_setup:5000, tempo_mesi:3 },
      '5': { chi:'Piattaforma wholesale', cosa:'Piattaforma wholesale — preordini, riassortimenti, tracking', costo_mensile:1300, costo_setup:10000, tempo_mesi:4 },
    },
    ecommerce: {
      _label: 'Approvvigionamento collezioni',
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 fornitori abituali a fiera', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Scouting fornitori a fiere — confronto prezzi e MOQ', costo_mensile:0, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Buyer', cosa:'Buyer dedicato — sourcing Italia e Turchia, campionature', costo_mensile:1500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Buyer + import', cosa:'Import diretto — Cina, Bangladesh — controllo qualità', costo_mensile:2500, costo_setup:2000, tempo_mesi:3 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — diversificazione fornitori, private label', costo_mensile:3500, costo_setup:3000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO ELETTRONICA
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_elettronica: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare/banco — vendita diretta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Inside sales telefonico — sviluppo clienti business', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'1 inside sales', cosa:'1 inside sales dedicato — gestione ordini e sviluppo', costo_mensile:2000, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Account + inside sales', cosa:'1 account + 1 inside sales', costo_mensile:4500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Team vendite', cosa:'Team vendite strutturato — multicanale', costo_mensile:7500, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — tutto a memoria e scontrini', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con clienti business, preventivi e follow-up', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM con lead B2B, preventivi, storico acquisti', costo_mensile:300, costo_setup:500, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM integrato con magazzino e listini distributori', costo_mensile:600, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'ERP distribuzione', cosa:'ERP completo — ordini, stock, pricing, margini real-time', costo_mensile:1200, costo_setup:5000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli vendita/magazzino definiti — chi fa cosa è chiaro', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Procedure pricing e stock formalizzate', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente + titolare', cosa:'KPI margini + rotazione — deleghe operative', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management + analisi dati vendita strutturato', costo_mensile:1500, costo_setup:1500, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — preventivi manuali su carta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Preventivi con template + consultazione listini digitali', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Gestionale', cosa:'Gestionale con listini aggiornati e margini automatici', costo_mensile:300, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Automazione ordini', cosa:'Ordini automatici a distributore al raggiungimento scorta minima', costo_mensile:500, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'ERP + BI', cosa:'ERP con BI per analisi margini, rotazione, trend vendite', costo_mensile:900, costo_setup:4000, tempo_mesi:3 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine da listino distributore — nessun pricing attivo', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Pricing differenziato — privati vs business vs PA', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Servizi a valore', cosa:'Servizi installazione, configurazione e assistenza a margine', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'Contratti assistenza', cosa:'Contratti assistenza annuali + estensioni garanzia', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Bundle HW+SW+servizi, noleggio operativo, ricavi ricorrenti', costo_mensile:700, costo_setup:1500, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo posizione e insegna', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Google My Business + volantini offerte settimanali', costo_mensile:150, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Agenzia digital', cosa:'Google Ads + comparatori prezzi (Trovaprezzi, Idealo)', costo_mensile:600, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Marketing operativo', cosa:'Newsletter offerte B2B + promozioni stagionali + social', costo_mensile:1000, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing omnicanale — brand, partnership vendor, eventi', costo_mensile:2500, costo_setup:4000, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito vetrina con catalogo prodotti e contatti', costo_mensile:80, costo_setup:800, tempo_mesi:1 },
      '3': { chi:'E-commerce base', cosa:'E-commerce con catalogo, prezzi, carrello e pagamento', costo_mensile:400, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'E-commerce avanzato', cosa:'E-commerce con comparazione, recensioni, stock real-time', costo_mensile:800, costo_setup:6000, tempo_mesi:2 },
      '5': { chi:'Piattaforma omnicanale', cosa:'Piattaforma integrata — B2C, B2B, marketplace, click&collect', costo_mensile:1500, costo_setup:12000, tempo_mesi:4 },
    },
    ecommerce: {
      _label: 'Approvvigionamento e distribuzione',
      '1': { chi:'Titolare', cosa:'Acquisto da 1 distributore abituale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Confronto prezzi tra 2-3 distributori (Esprinet, Ingram, TD)', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Accordi distribuzione', cosa:'Accordi quadro con distributori — rebate e priorità consegna', costo_mensile:0, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Buyer', cosa:'Buyer dedicato — ottimizzazione acquisti, drop-shipping', costo_mensile:1500, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — import diretto, accordi vendor, stock strategy', costo_mensile:3000, costo_setup:1500, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO ABBIGLIAMENTO DETTAGLIO
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_abbigliamento_dettaglio: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Solo titolare in negozio', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ 1 commesso/a PT', cosa:'1 commesso/a part-time per coprire turni e weekend', costo_mensile:1000, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'+ 1 commesso/a FT', cosa:'1 commesso/a full-time — vendita assistita', costo_mensile:1700, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'2 commessi + visual', cosa:'2 commessi + visual merchandiser', costo_mensile:4000, costo_setup:500, tempo_mesi:3 },
      '5': { chi:'Store manager + team', cosa:'Store manager + team vendita strutturato', costo_mensile:6500, costo_setup:1000, tempo_mesi:5 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — vendite solo da scontrini', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Registro clienti abituali con preferenze e taglie', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM retail', cosa:'CRM retail con fidelity card e storico acquisti', costo_mensile:200, costo_setup:500, tempo_mesi:1 },
      '4': { chi:'CRM + marketing', cosa:'CRM integrato con email/SMS per promozioni mirate', costo_mensile:400, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'CRM omnicanale', cosa:'CRM omnicanale — negozio, web, social con vista unica cliente', costo_mensile:800, costo_setup:3000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Turni e ruoli definiti — chi fa cosa è chiaro', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Obiettivi vendita per persona definiti', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente + titolare', cosa:'KPI negozio + deleghe operative', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Governance multi-punto vendita', costo_mensile:1500, costo_setup:1500, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — tutto a sensazione ed esperienza', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Gestione cassa con POS e scontrini elettronici', costo_mensile:50, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Gestionale retail', cosa:'Gestionale retail — vendite, giacenze, riordini', costo_mensile:200, costo_setup:800, tempo_mesi:2 },
      '4': { chi:'Processi standard', cosa:'Procedure accoglienza, visual, cambio merce, fidelizzazione', costo_mensile:300, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Retail management', cosa:'Sistema completo — KPI per m², rotazione, sell-through rate', costo_mensile:600, costo_setup:2000, tempo_mesi:3 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine da ricarico standard — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Saldi pianificati e gestione fine serie per liberare cassa', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Upsell + cross', cosa:'Upsell accessori + cross-selling outfit completi', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'Fidelizzazione', cosa:'Programma fedeltà con sconti progressivi e anteprime', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Dynamic pricing stagionale + private label + eventi esclusivi', costo_mensile:600, costo_setup:1500, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo vetrina e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Instagram con foto outfit e nuovi arrivi settimanali', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Social + influencer', cosa:'Instagram + Facebook Ads + micro-influencer locali', costo_mensile:600, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Agenzia + eventi', cosa:'Agenzia social + eventi in-store + collaborazioni brand', costo_mensile:1200, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — brand identity, PR, eventi, community', costo_mensile:2800, costo_setup:4000, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito — solo social media', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito vetrina con brand, collezioni e orari negozio', costo_mensile:80, costo_setup:800, tempo_mesi:1 },
      '3': { chi:'E-commerce base', cosa:'E-commerce con catalogo, taglie, pagamento online', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'E-commerce avanzato', cosa:'E-commerce con outfit suggeriti, wishlist, reso facile', costo_mensile:600, costo_setup:5000, tempo_mesi:2 },
      '5': { chi:'Piattaforma omnicanale', cosa:'Piattaforma integrata — stock unico negozio/web, click&collect', costo_mensile:1200, costo_setup:10000, tempo_mesi:4 },
    },
    ecommerce: {
      _label: 'Approvvigionamento collezioni',
      '1': { chi:'Titolare', cosa:'Acquisto da rappresentanti di zona in showroom', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Scouting brand a fiere (Pitti, MICAM, White)', costo_mensile:0, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Buyer part-time', cosa:'Buyer esterno — selezione brand e pianificazione budget acquisti', costo_mensile:800, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Buyer + pronto moda', cosa:'Acquisti campionario + riassortimenti pronto moda in stagione', costo_mensile:1500, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — mix brand, private label, import diretto', costo_mensile:2800, costo_setup:2000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO OROLOGI E GIOIELLI
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_orologi_gioielli: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Solo titolare in boutique', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ 1 addetto clienteling', cosa:'1 addetto clienteling — accoglienza e follow-up', costo_mensile:2200, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'2 addetti vendita', cosa:'2 addetti vendita specializzati — gemmologia e luxury', costo_mensile:4500, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Team + gemmologa', cosa:'Team vendita + gemmologa dedicata', costo_mensile:7000, costo_setup:1500, tempo_mesi:3 },
      '5': { chi:'Store manager + team', cosa:'Store manager + team clienteling VIP', costo_mensile:10000, costo_setup:2000, tempo_mesi:5 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — clienti a memoria e rubrica', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Rubrica clienti con ricorrenze, gusti e storico acquisti', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM luxury', cosa:'CRM con profilo clienti, anniversari, wish list', costo_mensile:300, costo_setup:800, tempo_mesi:1 },
      '4': { chi:'CRM + automation', cosa:'CRM con automazioni — auguri, inviti eventi, nuove collezioni', costo_mensile:500, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'CRM clienteling', cosa:'Piattaforma clienteling completa — 360° vista cliente luxury', costo_mensile:1000, costo_setup:4000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Procedure accoglienza e clienteling definite', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'CRM clienti VIP + follow-up strutturato', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente + titolare', cosa:'KPI per addetto + obiettivi vendita', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Governance + gestione eventi trunk show', costo_mensile:1500, costo_setup:2000, tempo_mesi:5 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — esperienza e relazione personale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Registro pezzi con certificati e garanzie digitalizzati', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Gestionale gioielleria', cosa:'Gestionale con inventario, certificati, perizie, riparazioni', costo_mensile:250, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Cerimonia vendita', cosa:'Processo di vendita luxury — accoglienza, storytelling, packaging', costo_mensile:300, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Retail management', cosa:'KPI boutique — conversion rate, scontrino medio, clienti VIP', costo_mensile:600, costo_setup:2500, tempo_mesi:3 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine tradizionale da ricarico — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Servizi aggiuntivi — incisioni, packaging regalo, pulizia', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Upsell + servizi', cosa:'Upsell gioielli su misura + servizio riparazione e restyling', costo_mensile:0, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Programma VIP', cosa:'Programma VIP — anteprime, eventi privati, sconti anniversario', costo_mensile:300, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Mix ricavi — vendita, riparazione, usato certificato, eventi', costo_mensile:700, costo_setup:2000, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo vetrina e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Instagram con foto gioielli e storytelling artigianale', costo_mensile:150, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Social + PR', cosa:'Social curato + PR locale + collaborazioni wedding planner', costo_mensile:700, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Agenzia luxury', cosa:'Agenzia specializzata luxury — shooting, video, influencer', costo_mensile:1500, costo_setup:3000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing luxury — brand awareness, eventi esclusivi, PR', costo_mensile:3000, costo_setup:5000, tempo_mesi:4 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito vetrina elegante con collezioni e contatti boutique', costo_mensile:100, costo_setup:1500, tempo_mesi:1 },
      '3': { chi:'Sito luxury', cosa:'Sito con catalogo dettagliato, certificati, prenotazione visita', costo_mensile:400, costo_setup:4000, tempo_mesi:2 },
      '4': { chi:'E-commerce luxury', cosa:'E-commerce luxury con foto HD, zoom, certificati, reso assicurato', costo_mensile:800, costo_setup:8000, tempo_mesi:3 },
      '5': { chi:'Piattaforma omnicanale', cosa:'Piattaforma integrata — e-commerce, CRM, stock unico, wish list', costo_mensile:1500, costo_setup:15000, tempo_mesi:4 },
    },
    ecommerce: {
      _label: 'Approvvigionamento e fornitori',
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 rappresentanti brand abituali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Scouting brand a fiere (VicenzaOro, Baselworld)', costo_mensile:0, costo_setup:800, tempo_mesi:1 },
      '3': { chi:'Buyer', cosa:'Buyer dedicato — selezione pietre, fornitori orafi, brand', costo_mensile:1200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Buyer + laboratorio', cosa:'Import pietre diretto + laboratorio orafo per pezzi unici', costo_mensile:2500, costo_setup:2000, tempo_mesi:3 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — accordi brand, pietre certificate, private label', costo_mensile:3500, costo_setup:3000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE TRASFORMAZIONE
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_trasformazione: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare gestisce clienti storici', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Visite a buyer GDO e HORECA', costo_mensile:300, costo_setup:0, tempo_mesi:2 },
      '3': { chi:'1 agente', cosa:'1 agente dedicato GDO o HORECA (~2.500€ fisso+provvigioni)', costo_mensile:2500, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'2 agenti + inside sales', cosa:'2 agenti per canale + inside sales (~2.800€ commerciale)', costo_mensile:6000, costo_setup:1000, tempo_mesi:4 },
      '5': { chi:'Dir. commerciale + rete', cosa:'Dir. commerciale + rete agenti + export', costo_mensile:9000, costo_setup:2500, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini su carta e telefono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con clienti, ordini e scadenze pagamenti', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM + gestionale', cosa:'CRM con buyer GDO, contratti annuali, promo pianificate', costo_mensile:400, costo_setup:800, tempo_mesi:1 },
      '4': { chi:'CRM avanzato', cosa:'CRM integrato con gestionale produzione e logistica', costo_mensile:800, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'ERP food', cosa:'ERP food completo — ordini, produzione, lotti, tracciabilità', costo_mensile:1500, costo_setup:6000, tempo_mesi:4 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Ruoli base', cosa:'Ruoli produzione/qualità definiti', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Riunioni + pianificazione', cosa:'Riunioni + pianificazione produzione', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'KPI + resp. qualità', cosa:'KPI + resp. qualità autonomo', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management completo', cosa:'Management completo — titolare strategia', costo_mensile:1500, costo_setup:2000, tempo_mesi:4 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Processi artigianali — nessuna formalizzazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Consulente HACCP', cosa:'HACCP strutturato + schede prodotto e allergeni', costo_mensile:200, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Gestionale produzione', cosa:'Gestionale produzione con lotti, scadenze e tracciabilità', costo_mensile:400, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'BRC/IFS', cosa:'Certificazione BRC/IFS — processi qualità per accesso GDO', costo_mensile:600, costo_setup:5000, tempo_mesi:4 },
      '5': { chi:'ERP + automazione', cosa:'ERP produzione + automazione linee + BI per efficienza', costo_mensile:1200, costo_setup:8000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo basato su costo + margine fisso — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Pricing differenziato — GDO vs HORECA vs dettaglio', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Linee prodotto', cosa:'Linea premium + linea standard — segmentazione margini', costo_mensile:0, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Private label', cosa:'Produzione private label per GDO + brand proprio', costo_mensile:300, costo_setup:1500, tempo_mesi:3 },
      '5': { chi:'Revenue manager', cosa:'Mix ricavi ottimizzato — brand, PL, export, DTC, co-packing', costo_mensile:800, costo_setup:2500, tempo_mesi:4 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo etichetta e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Social con foto prodotti + partecipazione fiere food', costo_mensile:200, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Agenzia + fiere', cosa:'Branding professionale + fiere (Cibus, TuttoFood, SIAL)', costo_mensile:800, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'Marketing operativo', cosa:'Trade marketing GDO + social content + PR food blogger', costo_mensile:1500, costo_setup:4000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — brand building, trade, digital, export promo', costo_mensile:3000, costo_setup:6000, tempo_mesi:4 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina vetrina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito vetrina con storia, prodotti, certificazioni', costo_mensile:80, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Sito con catalogo prodotti, schede tecniche, contatti buyer', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Sito + e-commerce DTC', cosa:'E-commerce DTC per vendita diretta + area riservata buyer', costo_mensile:600, costo_setup:5000, tempo_mesi:3 },
      '5': { chi:'Piattaforma integrata', cosa:'Piattaforma B2B/DTC integrata con ERP, ordini e tracciabilità', costo_mensile:1200, costo_setup:10000, tempo_mesi:4 },
    },
    ecommerce: {
      _label: 'Approvvigionamento materie prime',
      '1': { chi:'Titolare', cosa:'Acquisto materie prime da 1-2 fornitori locali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Confronto fornitori — qualità, prezzi, tempi di consegna', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Accordi fornitura', cosa:'Contratti quadro con fornitori — prezzi bloccati e volumi', costo_mensile:0, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Buyer', cosa:'Buyer dedicato — diversificazione fornitori, import materie prime', costo_mensile:2000, costo_setup:800, tempo_mesi:3 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — contratti annuali, hedging prezzi, filiera corta', costo_mensile:3500, costo_setup:2000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE VINI
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_vini: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare vende in cantina', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare + agente', cosa:'Visite enoteche e ristoranti zona', costo_mensile:300, costo_setup:0, tempo_mesi:2 },
      '3': { chi:'1 agente', cosa:'1 agente HORECA/enoteche (~2.000€)', costo_mensile:2000, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'Agente + export', cosa:'Agente + export manager (~3.000€)', costo_mensile:5000, costo_setup:1500, tempo_mesi:4 },
      '5': { chi:'Dir. commerciale + team', cosa:'Dir. commerciale + agenti + wine club', costo_mensile:8000, costo_setup:3000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini a voce e WhatsApp', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con clienti, ordini per etichetta e pagamenti', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM wine', cosa:'CRM con ristoranti, enoteche, importatori e preferenze', costo_mensile:300, costo_setup:500, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM integrato con gestionale cantina e magazzino vini', costo_mensile:600, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'ERP vitivinicolo', cosa:'ERP vitivinicolo — vigna, cantina, vendite, compliance, export', costo_mensile:1200, costo_setup:5000, tempo_mesi:4 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Ruoli base', cosa:'Ruoli cantina/vendita definiti', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Pianificazione', cosa:'Pianificazione vendemmia/produzione', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'KPI + qualità', cosa:'KPI + gestione qualità', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Governance', cosa:'Governance enologo + commerciale', costo_mensile:1500, costo_setup:2000, tempo_mesi:4 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Processi artigianali — nessuna formalizzazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Enologo', cosa:'Schede tecniche vini + gestione lotti e annate', costo_mensile:100, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Gestionale cantina', cosa:'Gestionale cantina — vinificazione, imbottigliamento, lotti', costo_mensile:300, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Compliance export', cosa:'Documentazione export — accise, certificati, compliance DOC/DOCG', costo_mensile:500, costo_setup:2000, tempo_mesi:3 },
      '5': { chi:'ERP + tracciabilità', cosa:'ERP completo — vigna-to-glass, tracciabilità, analisi costi', costo_mensile:1000, costo_setup:5000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo a bottiglia fisso — nessuna segmentazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Pricing differenziato — cantina, HORECA, enoteca, export', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Enoturismo', cosa:'Degustazioni a pagamento + esperienze in vigna', costo_mensile:0, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Wine club', cosa:'Wine club con abbonamento + verticali annate premium', costo_mensile:200, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Mix ricavi — HORECA, export, DTC, enoturismo, eventi privati', costo_mensile:700, costo_setup:2000, tempo_mesi:4 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola e guide vini', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Instagram con foto vigna, cantina e degustazioni', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Social + PR', cosa:'Social curato + PR enogastronomiche + guide (Gambero Rosso)', costo_mensile:600, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'Marketing + eventi', cosa:'Wine events + fiere (Vinitaly, ProWein) + influencer wine', costo_mensile:1500, costo_setup:5000, tempo_mesi:3 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — brand storytelling, export promo, enoturismo', costo_mensile:3000, costo_setup:6000, tempo_mesi:4 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito vetrina con storia, vini, contatti cantina', costo_mensile:80, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Sito con catalogo vini, schede tecniche, prenotazione visite', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'E-commerce DTC', cosa:'E-commerce DTC — vendita diretta, wine club, gift box', costo_mensile:600, costo_setup:5000, tempo_mesi:3 },
      '5': { chi:'Piattaforma integrata', cosa:'Piattaforma DTC + B2B + enoturismo + CRM integrato', costo_mensile:1200, costo_setup:10000, tempo_mesi:4 },
    },
    ecommerce: {
      _label: 'Approvvigionamento e vigna',
      '1': { chi:'Titolare', cosa:'Vigna propria + acquisto uve da conferitori abituali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Enologo', cosa:'Selezione conferitori — analisi uve, contratti annuali', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Agronomo + accordi', cosa:'Agronomo per vigna + accordi pluriennali conferitori', costo_mensile:500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Buyer enologico', cosa:'Buyer per acquisto uve selezionate e packaging premium', costo_mensile:1500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — vigna, uve, packaging, tappi, bottiglie, export', costo_mensile:3000, costo_setup:2000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE FORNO
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_forno: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare al banco', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'1 commesso/a', cosa:'1 commesso/a (~1.600€)', costo_mensile:1600, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Catering + B2B', cosa:'Sviluppo catering e consegne B2B', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'2 commessi + consegne', cosa:'2 commessi + consegne strutturate', costo_mensile:3800, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Resp. vendite + team', cosa:'Resp. vendite + team punti vendita', costo_mensile:6000, costo_setup:2000, tempo_mesi:5 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — vendite solo dal registratore', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Lista clienti HORECA con ordini ricorrenti', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Gestionale base', cosa:'Gestionale con ordini, consegne programmate e fatturazione', costo_mensile:200, costo_setup:500, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM clienti B2B + gestionale produzione e consegne', costo_mensile:400, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'ERP panificazione', cosa:'ERP panificazione — ordini, produzione, consegne, margini', costo_mensile:800, costo_setup:3000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Turni e ruoli', cosa:'Turni e ruoli produzione/banco', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Pianificazione', cosa:'Pianificazione produzione giornaliera', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'KPI', cosa:'KPI produzione + vendita', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management multi-PV', cosa:'Management multi-punto vendita', costo_mensile:1500, costo_setup:2000, tempo_mesi:4 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Ricette a memoria — nessun processo standardizzato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ricettario standardizzato + schede HACCP aggiornate', costo_mensile:100, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Gestionale produzione', cosa:'Gestionale produzione — pianificazione impasti, rese, scarti', costo_mensile:250, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Automazione', cosa:'Impastatrici programmate + porzionatrici + cicli automatici', costo_mensile:400, costo_setup:3000, tempo_mesi:2 },
      '5': { chi:'Lean production', cosa:'Produzione lean — riduzione sprechi, KPI efficienza, turni', costo_mensile:700, costo_setup:4000, tempo_mesi:3 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo al kg tradizionale — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Prodotti speciali a margine superiore (focacce, dolci)', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Linee premium', cosa:'Linea artigianale premium — lievito madre, grani antichi', costo_mensile:0, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Catering + eventi', cosa:'Servizio catering + torte personalizzate + eventi', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Mix ricavi — retail, HORECA, GDO confezionato, e-commerce', costo_mensile:500, costo_setup:1500, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo profumo dal forno e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Instagram con foto prodotti freschi e dietro le quinte', costo_mensile:50, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Social + locale', cosa:'Social curato + Google Maps + promozioni stagionali', costo_mensile:400, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Marketing operativo', cosa:'Brand identity + packaging professionale + degustazioni', costo_mensile:800, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — brand artigianale, PR food, corsi, eventi', costo_mensile:2000, costo_setup:3500, tempo_mesi:3 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito — solo Google Maps', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito vetrina con prodotti, orari, storia del forno', costo_mensile:50, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Sito con catalogo prodotti, ordini online per ritiro', costo_mensile:200, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'E-commerce locale', cosa:'E-commerce con consegna locale + ordini personalizzati', costo_mensile:400, costo_setup:3000, tempo_mesi:2 },
      '5': { chi:'Piattaforma completa', cosa:'Piattaforma ordini B2B + DTC + abbonamenti pane fresco', costo_mensile:800, costo_setup:6000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Approvvigionamento farine e ingredienti',
      '1': { chi:'Titolare', cosa:'Acquisto farina dal mulino della zona', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Confronto mulini — qualità farine, prezzi, consegna', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Accordi mulini', cosa:'Accordi quadro con 2-3 mulini — prezzi bloccati, mix farine', costo_mensile:0, costo_setup:200, tempo_mesi:2 },
      '4': { chi:'Buyer ingredienti', cosa:'Buyer per farine speciali, lieviti, semilavorati premium', costo_mensile:800, costo_setup:300, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — filiera corta, grani antichi, import', costo_mensile:2000, costo_setup:1000, tempo_mesi:3 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE CONSERVE
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_conserve: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare gestisce GDO', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Visite buyer insegne', costo_mensile:300, costo_setup:0, tempo_mesi:2 },
      '3': { chi:'1 agente GDO', cosa:'1 agente GDO nazionale (~2.500€)', costo_mensile:2500, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'Agente + export', cosa:'Agente GDO + export (~2.800€)', costo_mensile:5300, costo_setup:1000, tempo_mesi:4 },
      '5': { chi:'Dir. commerciale + rete', cosa:'Dir. commerciale + rete + private label', costo_mensile:8500, costo_setup:2500, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini telefonici e fiere', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con buyer GDO, ordini stagionali, scadenze', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM food', cosa:'CRM con buyer GDO, contratti promo, pianificazione annuale', costo_mensile:400, costo_setup:800, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM integrato con produzione, stock e logistica', costo_mensile:800, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'ERP food', cosa:'ERP food — ordini, produzione, lotti, export, tracciabilità', costo_mensile:1500, costo_setup:6000, tempo_mesi:4 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Ruoli base', cosa:'Ruoli produzione/qualità', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Pianificazione + qualità', cosa:'Pianificazione + qualità autonoma', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'KPI + certificazioni', cosa:'KPI + certificazioni', costo_mensile:500, costo_setup:1500, tempo_mesi:3 },
      '5': { chi:'Management completo', cosa:'Management completo', costo_mensile:1500, costo_setup:2000, tempo_mesi:4 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Produzione artigianale — ricette tradizionali non codificate', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Consulente qualità', cosa:'HACCP + etichettatura a norma + schede prodotto', costo_mensile:200, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Gestionale produzione', cosa:'Gestionale produzione — lotti, scadenze, rese, tracciabilità', costo_mensile:400, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'BRC/IFS', cosa:'Certificazione BRC/IFS per accesso GDO e export', costo_mensile:600, costo_setup:5000, tempo_mesi:4 },
      '5': { chi:'ERP + automazione', cosa:'ERP produzione + automazione linee confezionamento', costo_mensile:1200, costo_setup:8000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo fisso su listino — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Pricing per canale — GDO vs specialità vs export', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Private label', cosa:'Produzione private label per GDO + brand proprio premium', costo_mensile:0, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Export premium', cosa:'Linea export premium con packaging dedicato e storytelling', costo_mensile:300, costo_setup:1500, tempo_mesi:3 },
      '5': { chi:'Revenue manager', cosa:'Mix brand + PL + export + DTC + co-packing stagionale', costo_mensile:800, costo_setup:2500, tempo_mesi:4 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo etichetta tradizionale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Social con ricette, tradizione e territorio', costo_mensile:150, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Branding + fiere', cosa:'Branding professionale + fiere food (Cibus, Fancy Food)', costo_mensile:700, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'Marketing operativo', cosa:'Trade marketing GDO + PR food + social content professionale', costo_mensile:1500, costo_setup:4000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — brand premium, export promo, storytelling', costo_mensile:3000, costo_setup:6000, tempo_mesi:4 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito vetrina con storia, prodotti, ricette', costo_mensile:80, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Sito con catalogo, schede prodotto, area buyer', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'E-commerce DTC', cosa:'E-commerce DTC — vendita diretta, box regalo, abbonamenti', costo_mensile:600, costo_setup:5000, tempo_mesi:3 },
      '5': { chi:'Piattaforma integrata', cosa:'Piattaforma B2B + DTC integrata con ERP e tracciabilità', costo_mensile:1200, costo_setup:10000, tempo_mesi:4 },
    },
    ecommerce: {
      _label: 'Approvvigionamento materie prime',
      '1': { chi:'Titolare', cosa:'Acquisto pomodori e ortaggi da agricoltori locali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Confronto fornitori — qualità, stagionalità, certificazioni', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Contratti filiera', cosa:'Contratti con agricoltori — volumi garantiti, prezzo fisso', costo_mensile:0, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Buyer', cosa:'Buyer dedicato — scouting materie prime, import pomodoro', costo_mensile:2000, costo_setup:800, tempo_mesi:3 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — filiera controllata, contratti annuali, hedging', costo_mensile:3500, costo_setup:2000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE INGREDIENTI
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_ingredienti: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare gestisce clienti', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Campionature proattive verso industria', costo_mensile:400, costo_setup:300, tempo_mesi:2 },
      '3': { chi:'1 tecnico commerciale', cosa:'1 tecnico commerciale (~2.800€)', costo_mensile:2800, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'2 tecnici', cosa:'2 tecnici per segmento', costo_mensile:5600, costo_setup:1000, tempo_mesi:4 },
      '5': { chi:'Dir. commerciale + R&D', cosa:'Dir. commerciale + R&D applicativo', costo_mensile:8500, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — rapporti personali e telefonate', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con clienti, specifiche richieste e contratti', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM B2B', cosa:'CRM con schede tecniche, campionature, storico forniture', costo_mensile:400, costo_setup:800, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM integrato con gestionale produzione e qualità', costo_mensile:800, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'ERP ingredienti', cosa:'ERP completo — ordini, produzione, lotti, qualità, compliance', costo_mensile:1500, costo_setup:6000, tempo_mesi:4 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Schede tecniche', cosa:'Schede tecniche e specifiche', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Application lab', cosa:'Application lab strutturato', costo_mensile:300, costo_setup:800, tempo_mesi:2 },
      '4': { chi:'KPI + QA', cosa:'KPI + quality assurance', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management tecnico/commerciale', costo_mensile:1500, costo_setup:2000, tempo_mesi:4 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Produzione su ricetta — nessun processo formalizzato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Tecnico qualità', cosa:'Schede tecniche + analisi laboratorio + certificati lotto', costo_mensile:300, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Gestionale qualità', cosa:'Sistema qualità con SPC, HACCP avanzato, audit interni', costo_mensile:500, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'Certificazioni', cosa:'FSSC 22000 + BRC + certificazioni Halal/Kosher', costo_mensile:700, costo_setup:6000, tempo_mesi:4 },
      '5': { chi:'ERP + R&D', cosa:'ERP con modulo R&D — formulazioni, prove, scale-up, costi', costo_mensile:1300, costo_setup:8000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo al kg basato su costi — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Pricing per volume e tipo di cliente industriale', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Prodotti specialità', cosa:'Ingredienti funzionali a margine superiore (clean label)', costo_mensile:0, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Servizio R&D', cosa:'Servizio sviluppo formulazione per clienti — valore aggiunto', costo_mensile:300, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Revenue manager', cosa:'Mix commodity + specialità + R&D + tolling + export', costo_mensile:800, costo_setup:2000, tempo_mesi:4 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo fiere e contatti diretti', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Schede tecniche professionali + LinkedIn aziendale', costo_mensile:100, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Marketing B2B', cosa:'Fiere food ingredients (FiE, Cibus Tec) + catalogo tecnico', costo_mensile:600, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'Content + fiere', cosa:'White paper tecnici + webinar + fiere internazionali', costo_mensile:1200, costo_setup:4000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing B2B — thought leadership, R&D showcase, PR', costo_mensile:2500, costo_setup:5000, tempo_mesi:4 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito vetrina con gamma prodotti e certificazioni', costo_mensile:80, costo_setup:1000, tempo_mesi:1 },
      '3': { chi:'Sito tecnico', cosa:'Sito con schede tecniche, download, richiesta campionature', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Portale B2B', cosa:'Portale B2B con ordini, specifiche personalizzate, tracking', costo_mensile:700, costo_setup:5000, tempo_mesi:3 },
      '5': { chi:'Piattaforma integrata', cosa:'Piattaforma B2B integrata — ordini, formulazioni, compliance', costo_mensile:1300, costo_setup:10000, tempo_mesi:4 },
    },
    ecommerce: {
      _label: 'Approvvigionamento e sourcing',
      '1': { chi:'Titolare', cosa:'Acquisto materie prime da fornitore abituale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Confronto fornitori globali — qualità, certificazioni, prezzi', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Sourcing globale', cosa:'Sourcing internazionale — Europa, Asia — campionature e audit', costo_mensile:500, costo_setup:800, tempo_mesi:2 },
      '4': { chi:'Buyer', cosa:'Buyer dedicato — contratti quadro, hedging commodity, import', costo_mensile:2500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — supply chain globale, dual sourcing, contratti', costo_mensile:4000, costo_setup:2000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE BIRRA
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_birra: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare vende dal taproom', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Visite pub e ristoranti zona', costo_mensile:200, costo_setup:0, tempo_mesi:2 },
      '3': { chi:'1 agente', cosa:'1 agente HORECA (~1.800€)', costo_mensile:1800, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'Agente + e-commerce', cosa:'Agente + e-commerce diretto', costo_mensile:3500, costo_setup:1500, tempo_mesi:4 },
      '5': { chi:'Team vendite', cosa:'Team vendite + distribuzione', costo_mensile:6000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — tutto a voce e WhatsApp', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con pub, ristoranti, ordini e preferenze', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM birrificio', cosa:'CRM con clienti HORECA, storico ordini, degustazioni', costo_mensile:300, costo_setup:500, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM integrato con gestionale birrificio e magazzino', costo_mensile:600, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'ERP birrificio', cosa:'ERP birrificio — ordini, produzione, lotti, accise, export', costo_mensile:1200, costo_setup:5000, tempo_mesi:4 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Ruoli base', cosa:'Ruoli birraio/vendita', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Pianificazione + qualità', cosa:'Pianificazione produzione + qualità', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'KPI + eventi', cosa:'KPI + gestione eventi', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Governance', cosa:'Governance — titolare solo R&D birra', costo_mensile:1500, costo_setup:2000, tempo_mesi:4 },
    },
    processi: {
      '1': { chi:'Birraio', cosa:'Ricette personali — produzione artigianale senza standard', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Birraio', cosa:'Ricettario standardizzato + controllo fermentazione digitale', costo_mensile:100, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Gestionale birrificio', cosa:'Gestionale birrificio — cotte, fermentazione, imbottigliamento', costo_mensile:300, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Qualità + accise', cosa:'Laboratorio analisi + gestione accise + tracciabilità lotti', costo_mensile:500, costo_setup:3000, tempo_mesi:3 },
      '5': { chi:'Produzione ottimizzata', cosa:'Produzione lean — pianificazione cotte, rese, KPI qualità', costo_mensile:800, costo_setup:5000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Birraio', cosa:'Prezzo a bottiglia/fusto fisso — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Pricing differenziato — taproom vs HORECA vs distribuzione', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Birre speciali', cosa:'Birre limited edition e stagionali a margine premium', costo_mensile:0, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Taproom experience', cosa:'Taproom con food pairing, eventi, brewery tour a pagamento', costo_mensile:200, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Mix ricavi — HORECA, taproom, DTC, eventi, contract brewing', costo_mensile:600, costo_setup:1500, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo taproom e passaparola birrofili', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Instagram con foto birre, brewing process, taproom', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Social + eventi', cosa:'Social curato + festival birra + collaborazioni birrifici', costo_mensile:500, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Marketing beer', cosa:'Brand identity + Untappd + PR beer blogger + tap takeover', costo_mensile:1200, costo_setup:3000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — brand craft, community, eventi, export promo', costo_mensile:2500, costo_setup:5000, tempo_mesi:4 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito — solo Untappd e social', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito vetrina con birre, storia, taproom e orari', costo_mensile:80, costo_setup:800, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Sito con catalogo birre, schede, dove trovarci, eventi', costo_mensile:250, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'E-commerce DTC', cosa:'E-commerce DTC — box birre, abbonamenti, gift pack', costo_mensile:500, costo_setup:4000, tempo_mesi:3 },
      '5': { chi:'Piattaforma integrata', cosa:'Piattaforma DTC + B2B + prenotazione taproom + CRM', costo_mensile:1000, costo_setup:8000, tempo_mesi:4 },
    },
    ecommerce: {
      _label: 'Approvvigionamento malti e luppoli',
      '1': { chi:'Birraio', cosa:'Acquisto malti e luppoli da rivenditore locale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Birraio', cosa:'Confronto fornitori — malterie europee, luppoli freschi', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Accordi malterie', cosa:'Accordi con malterie e hop dealer — contratti annuali', costo_mensile:0, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Buyer ingredienti', cosa:'Buyer per luppoli speciali, lieviti, import malti craft', costo_mensile:1200, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — contratti forward luppoli, malterie premium', costo_mensile:2500, costo_setup:1500, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECH SAAS
  // ═══════════════════════════════════════════════════════════════════════════
  tech_saas: {
    vendite: {
      '1': { chi:'Founder', cosa:'Founder vende', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Founder', cosa:'Inbound + content come lead gen', costo_mensile:200, costo_setup:0, tempo_mesi:2 },
      '3': { chi:'1 account/SDR', cosa:'1 account/SDR dedicato (~3.200€ account, ~2.500€ SDR)', costo_mensile:3200, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'2 account + 1 SDR', cosa:'2 account + 1 SDR', costo_mensile:8000, costo_setup:1500, tempo_mesi:4 },
      '5': { chi:'VP Sales + team', cosa:'VP Sales + team + partnerships', costo_mensile:14000, costo_setup:3000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Founder', cosa:'Nessun CRM — lead su email e spreadsheet', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Founder', cosa:'CRM base (HubSpot free/Pipedrive) con pipeline vendita', costo_mensile:50, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM + analytics', cosa:'CRM con lead scoring, sequences e analytics pipeline', costo_mensile:300, costo_setup:500, tempo_mesi:1 },
      '4': { chi:'CRM + product data', cosa:'CRM integrato con product analytics — PQL e usage data', costo_mensile:600, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Revenue ops', cosa:'Revenue ops stack — CRM, BI, forecasting, churn prediction', costo_mensile:1200, costo_setup:4000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Tutto il founder', cosa:'Tutto il founder', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Ruoli base', cosa:'Ruoli dev/sales/support', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Sprint planning', cosa:'Sprint planning + metriche base', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'OKR + management', cosa:'OKR + management per team', costo_mensile:500, costo_setup:1500, tempo_mesi:3 },
      '5': { chi:'Governance C-level', cosa:'Governance C-level — founder solo prodotto', costo_mensile:2000, costo_setup:3000, tempo_mesi:4 },
    },
    processi: {
      '1': { chi:'Founder', cosa:'Nessun processo — tutto ad hoc e manuale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Founder', cosa:'Onboarding utenti documentato + knowledge base interna', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Processo sales', cosa:'Sales playbook — discovery, demo, trial, close, onboarding', costo_mensile:200, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'CS + automazione', cosa:'Customer success process — health score, QBR, churn alert', costo_mensile:400, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'Revenue operations', cosa:'RevOps completo — processi scalabili, playbook, automazioni', costo_mensile:800, costo_setup:4000, tempo_mesi:3 },
    },
    ricavi: {
      '1': { chi:'Founder', cosa:'1 piano pricing — prezzo fisso mensile o annuale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Founder', cosa:'2-3 piani pricing — starter, pro, enterprise', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Usage-based', cosa:'Pricing ibrido — base + usage-based per feature premium', costo_mensile:0, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Expansion revenue', cosa:'Strategia expansion — upsell, cross-sell, add-on, seats', costo_mensile:300, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Revenue model ottimizzato — NRR >120%, LTV/CAC, pricing AI', costo_mensile:700, costo_setup:2000, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Founder', cosa:'Solo passaparola e network personale founder', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Founder', cosa:'Content marketing — blog, LinkedIn founder, Product Hunt', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Growth hacker', cosa:'SEO + content + Google Ads + free trial funnel', costo_mensile:1000, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Marketing team', cosa:'Demand gen + content + paid + community + webinar', costo_mensile:2500, costo_setup:3000, tempo_mesi:3 },
      '5': { chi:'VP Marketing', cosa:'Marketing scalabile — brand, demand gen, PLG, partner marketing', costo_mensile:5000, costo_setup:6000, tempo_mesi:4 },
    },
    sitoweb: {
      '1': { chi:'Founder', cosa:'Landing page base con form di contatto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Founder/dev', cosa:'Sito prodotto con pricing, demo video, sign-up', costo_mensile:50, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Sito marketing con case study, blog, self-service trial', costo_mensile:200, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'Growth site', cosa:'Sito ottimizzato conversione — A/B test, CRO, chatbot', costo_mensile:500, costo_setup:4000, tempo_mesi:2 },
      '5': { chi:'Piattaforma marketing', cosa:'Sito + app center + marketplace integrazioni + community', costo_mensile:1000, costo_setup:8000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Infrastruttura cloud e DevOps',
      '1': { chi:'Founder/CTO', cosa:'Hosting base su VPS o shared — deploy manuale', costo_mensile:50, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'CTO', cosa:'Cloud AWS/GCP con CI/CD base e monitoring', costo_mensile:300, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'DevOps', cosa:'Infrastruttura scalabile — container, auto-scaling, backup', costo_mensile:800, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'DevOps + SRE', cosa:'SRE practices — SLA 99.9%, incident management, DR', costo_mensile:2000, costo_setup:4000, tempo_mesi:3 },
      '5': { chi:'Platform team', cosa:'Platform team — multi-region, zero downtime, compliance SOC2', costo_mensile:4000, costo_setup:8000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECH SYSTEM INTEGRATOR
  // ═══════════════════════════════════════════════════════════════════════════
  tech_system_integrator: {
    vendite: {
      '1': { chi:'Founder/partner', cosa:'Founder/partner vende', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Networking + eventi vendor', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '3': { chi:'1 account manager', cosa:'1 account manager (~3.000€)', costo_mensile:3000, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'Account + pre-sales', cosa:'Account + pre-sales (~3.200€)', costo_mensile:6200, costo_setup:1500, tempo_mesi:4 },
      '5': { chi:'Sales manager + team', cosa:'Sales manager + team', costo_mensile:10000, costo_setup:2500, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun CRM — progetti gestiti via email', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'CRM base con opportunità, preventivi e follow-up', costo_mensile:50, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM + PSA', cosa:'CRM + PSA (Professional Services Automation) per progetti', costo_mensile:400, costo_setup:1000, tempo_mesi:1 },
      '4': { chi:'CRM avanzato', cosa:'CRM con forecast, pipeline pesata e integrazione vendor', costo_mensile:800, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'ERP + CRM + PSA', cosa:'Stack completo — CRM, PSA, timesheet, margini progetto', costo_mensile:1500, costo_setup:5000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Ruoli base', cosa:'Ruoli vendita/delivery separati', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'PM base', cosa:'Project management base', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'KPI progetto', cosa:'KPI progetto + delivery', costo_mensile:500, costo_setup:1500, tempo_mesi:3 },
      '5': { chi:'Governance + PMO', cosa:'Governance + PMO', costo_mensile:2000, costo_setup:2500, tempo_mesi:4 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni progetto è diverso e ad hoc', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Template preventivo + checklist installazione standard', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'PM base', cosa:'Project management base — Gantt, timesheet, documentazione', costo_mensile:300, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'ITIL + PM', cosa:'Framework ITIL per servizi + PM strutturato per progetti', costo_mensile:600, costo_setup:3000, tempo_mesi:3 },
      '5': { chi:'PMO + ITIL', cosa:'PMO strutturato + ITIL + knowledge base + automazioni', costo_mensile:1000, costo_setup:5000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Fatturazione a progetto — prezzo su preventivo', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Contratti assistenza ricorrenti — canone mensile/annuale', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Managed services', cosa:'Managed services — monitoraggio, backup, supporto proattivo', costo_mensile:0, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Ricavi ricorrenti', cosa:'Mix progetto + managed services + licensing = ricavi prevedibili', costo_mensile:300, costo_setup:1500, tempo_mesi:3 },
      '5': { chi:'Revenue manager', cosa:'Revenue model — MSP, cloud managed, consulting premium, SLA', costo_mensile:800, costo_setup:2500, tempo_mesi:4 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola e referral', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'LinkedIn + case study + certificazioni vendor in evidenza', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Marketing B2B', cosa:'Google Ads IT + LinkedIn Ads + webinar tecnici', costo_mensile:800, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Content + eventi', cosa:'Content marketing tecnico + eventi vendor + partner program', costo_mensile:1500, costo_setup:3000, tempo_mesi:2 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing B2B — thought leadership, eventi, partner co-mktg', costo_mensile:3000, costo_setup:5000, tempo_mesi:4 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito vetrina con servizi, competenze e certificazioni', costo_mensile:80, costo_setup:800, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Sito con case study, blog tecnico, richiesta preventivo', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Sito + portale', cosa:'Portale clienti — ticket, monitoring dashboard, documentazione', costo_mensile:600, costo_setup:5000, tempo_mesi:3 },
      '5': { chi:'Piattaforma clienti', cosa:'Piattaforma clienti completa — portale, SLA, report, knowledge', costo_mensile:1200, costo_setup:10000, tempo_mesi:4 },
    },
    ecommerce: {
      _label: 'Approvvigionamento licenze e HW',
      '1': { chi:'Titolare', cosa:'Acquisto HW e licenze su ordine cliente — markup fisso', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Confronto distributori (Esprinet, Ingram, TD SYNNEX)', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Accordi distributori', cosa:'Accordi con distributori — rebate, deal registration vendor', costo_mensile:0, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Buyer IT', cosa:'Buyer IT dedicato — ottimizzazione licensing, cloud brokering', costo_mensile:1800, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — CSP/LSP, hardware staging, vendor management', costo_mensile:3500, costo_setup:2000, tempo_mesi:4 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECH DIGITAL AGENCY
  // ═══════════════════════════════════════════════════════════════════════════
  tech_digital_agency: {
    vendite: {
      '1': { chi:'Founder', cosa:'Founder/creative director vende', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Founder', cosa:'Portfolio + case study come strumento', costo_mensile:200, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'1 account/BD', cosa:'1 account/business developer (~2.800€)', costo_mensile:2800, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'2 account', cosa:'2 account per segmento', costo_mensile:5600, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale', cosa:'Dir. commerciale + rete partnership', costo_mensile:8500, costo_setup:2000, tempo_mesi:5 },
    },
    pipeline: {
      '1': { chi:'Founder', cosa:'Nessun CRM — progetti su email e documenti', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Founder', cosa:'CRM base con opportunità, preventivi e stato progetti', costo_mensile:50, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM + PM', cosa:'CRM + project management tool integrato (Asana, Monday)', costo_mensile:300, costo_setup:500, tempo_mesi:1 },
      '4': { chi:'CRM + automazione', cosa:'CRM con automazioni — lead nurturing, proposal, follow-up', costo_mensile:500, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Revenue ops', cosa:'Stack completo — CRM, PM, timesheet, profittabilità progetto', costo_mensile:1000, costo_setup:3000, tempo_mesi:3 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Workflow', cosa:'Workflow brief-to-delivery', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Ruoli per skill', cosa:'Ruoli per skill (design/dev/copy)', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'KPI + satisfaction', cosa:'KPI per progetto + client satisfaction', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Governance', cosa:'Governance creative + operations', costo_mensile:2000, costo_setup:2000, tempo_mesi:4 },
    },
    processi: {
      '1': { chi:'Founder', cosa:'Nessun processo — ogni progetto gestito diversamente', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Founder', cosa:'Template brief, preventivo e contratto standardizzati', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'PM strutturato', cosa:'Processo progetto — brief, wireframe, sviluppo, test, lancio', costo_mensile:200, costo_setup:800, tempo_mesi:2 },
      '4': { chi:'Agile + retainer', cosa:'Metodologia agile + processi retainer con reporting mensile', costo_mensile:400, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'Operations manager', cosa:'Operations completo — PM, QA, delivery, capacity planning', costo_mensile:800, costo_setup:3000, tempo_mesi:3 },
    },
    ricavi: {
      '1': { chi:'Founder', cosa:'Fatturazione a progetto — preventivo fisso', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Founder', cosa:'Contratti retainer mensili per manutenzione e supporto', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Mix progetto/retainer', cosa:'Strategia 50% retainer + 50% progetti per stabilità', costo_mensile:0, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Revenue ricorrente', cosa:'Servizi ricorrenti — hosting, SEO, social, email marketing', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'Revenue manager', cosa:'Revenue model — retainer, progetti, SaaS proprio, formazione', costo_mensile:600, costo_setup:1500, tempo_mesi:3 },
    },
    marketing: {
      '1': { chi:'Founder', cosa:'Solo passaparola e portfolio personale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Founder', cosa:'Sito portfolio + case study + LinkedIn attivo', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Inbound marketing', cosa:'Blog + SEO + webinar + lead magnet per generare lead', costo_mensile:600, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Marketing + PR', cosa:'Content premium + PR + speaking + awards + partnership', costo_mensile:1500, costo_setup:2500, tempo_mesi:3 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing — thought leadership, community, referral program', costo_mensile:3000, costo_setup:4000, tempo_mesi:4 },
    },
    sitoweb: {
      '1': { chi:'Founder', cosa:'Portfolio personale o pagina LinkedIn', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Founder', cosa:'Sito agency con portfolio, servizi e contatti', costo_mensile:50, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Sito con case study dettagliati, blog, richiesta preventivo', costo_mensile:200, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'Sito + risorse', cosa:'Sito con risorse gratuite, tool, calcolatori — lead generation', costo_mensile:400, costo_setup:4000, tempo_mesi:2 },
      '5': { chi:'Piattaforma agency', cosa:'Piattaforma con portale clienti, report automatici, knowledge', costo_mensile:800, costo_setup:8000, tempo_mesi:3 },
    },
    ecommerce: {
      _label: 'Approvvigionamento freelance e tool',
      '1': { chi:'Founder', cosa:'Freelance trovati su passaparola — tool gratuiti', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Founder', cosa:'Network freelance verificati + stack tool professionale', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Gestione fornitori', cosa:'Pool freelance contrattualizzati + licenze tool centralizzate', costo_mensile:500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Resp. operations', cosa:'Gestione fornitori strutturata — SLA, qualità, backup', costo_mensile:1200, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti', cosa:'Procurement strategico — nearshore team, partnership tool, white label', costo_mensile:2500, costo_setup:2000, tempo_mesi:3 },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECH AUTOMAZIONE
  // ═══════════════════════════════════════════════════════════════════════════
  tech_automazione: {
    vendite: {
      '1': { chi:'Titolare/fondatore', cosa:'Titolare/fondatore vende', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Visite a uffici tecnici industriali', costo_mensile:300, costo_setup:0, tempo_mesi:2 },
      '3': { chi:'1 tecnico commerciale', cosa:'1 tecnico commerciale (~3.000€)', costo_mensile:3000, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'2 commerciali', cosa:'2 commerciali per settore', costo_mensile:6000, costo_setup:1000, tempo_mesi:4 },
      '5': { chi:'Dir. commerciale + export', cosa:'Dir. commerciale + export', costo_mensile:9000, costo_setup:2500, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun CRM — progetti via email e preventivi Word', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'CRM base con opportunità, preventivi e stato commesse', costo_mensile:50, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM + commesse', cosa:'CRM integrato con gestione commesse e preventivazione', costo_mensile:400, costo_setup:1000, tempo_mesi:1 },
      '4': { chi:'CRM + ERP', cosa:'CRM con ERP — commesse, costi, margini, tempistiche', costo_mensile:800, costo_setup:2500, tempo_mesi:2 },
      '5': { chi:'ERP industriale', cosa:'ERP industriale completo — CRM, commesse, produzione, service', costo_mensile:1500, costo_setup:6000, tempo_mesi:4 },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Ruoli base', cosa:'Ruoli progettazione/collaudo', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'PM strutturato', cosa:'Project management strutturato', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'KPI + FAT/SAT', cosa:'KPI + FAT/SAT procedure', costo_mensile:500, costo_setup:1500, tempo_mesi:3 },
      '5': { chi:'Governance', cosa:'Governance tecnica + commerciale', costo_mensile:2000, costo_setup:2500, tempo_mesi:4 },
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni impianto è un pezzo unico', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Template offerta tecnica + documentazione impianto standard', costo_mensile:0, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'PM strutturato', cosa:'Project management — Gantt, milestone, collaudo, documentazione', costo_mensile:300, costo_setup:1500, tempo_mesi:2 },
      '4': { chi:'Ingegneria + PM', cosa:'Processo ingegneria — design review, FAT, SAT, as-built', costo_mensile:600, costo_setup:3000, tempo_mesi:3 },
      '5': { chi:'PMO + qualità', cosa:'PMO + sistema qualità ISO 9001 + standard IEC per safety', costo_mensile:1000, costo_setup:5000, tempo_mesi:4 },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Fatturazione a progetto — prezzo su preventivo', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Contratti assistenza post-vendita annuali', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Service ricorrente', cosa:'Service ricorrente — manutenzione programmata, teleassistenza', costo_mensile:0, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Industry 4.0', cosa:'Servizi Industry 4.0 — IoT, analytics, digital twin as-a-service', costo_mensile:300, costo_setup:2000, tempo_mesi:3 },
      '5': { chi:'Revenue manager', cosa:'Revenue mix — progetti, service, retrofit, training, SaaS IoT', costo_mensile:800, costo_setup:3000, tempo_mesi:4 },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo fiere industriali e referral', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'LinkedIn aziendale + case study impianti realizzati', costo_mensile:100, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Marketing B2B', cosa:'Fiere industriali (SPS, MECSPE) + Google Ads + LinkedIn Ads', costo_mensile:800, costo_setup:2000, tempo_mesi:2 },
      '4': { chi:'Content + eventi', cosa:'White paper tecnici + webinar Industry 4.0 + demo center', costo_mensile:1500, costo_setup:4000, tempo_mesi:3 },
      '5': { chi:'Marketing manager', cosa:'Piano marketing industriale — thought leadership, fiere, partner', costo_mensile:3000, costo_setup:6000, tempo_mesi:4 },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Web agency', cosa:'Sito vetrina con competenze, settori e impianti realizzati', costo_mensile:80, costo_setup:800, tempo_mesi:1 },
      '3': { chi:'Sito professionale', cosa:'Sito con case study, video impianti, richiesta preventivo', costo_mensile:300, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Sito + portale', cosa:'Portale clienti — documentazione, ticket, teleassistenza', costo_mensile:600, costo_setup:5000, tempo_mesi:3 },
      '5': { chi:'Piattaforma industriale', cosa:'Piattaforma clienti — IoT dashboard, service, knowledge base', costo_mensile:1200, costo_setup:10000, tempo_mesi:4 },
    },
    ecommerce: {
      _label: 'Approvvigionamento componenti',
      '1': { chi:'Titolare', cosa:'Acquisto PLC e componenti da distributore abituale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Confronto distributori — Siemens, ABB, Schneider, Omron', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Accordi vendor', cosa:'Accordi quadro con vendor — sconti volume, priorità consegna', costo_mensile:0, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Buyer tecnico', cosa:'Buyer tecnico — ottimizzazione BOM, alternative, lead time', costo_mensile:2000, costo_setup:800, tempo_mesi:2 },
      '5': { chi:'Resp. acquisti', cosa:'Resp. acquisti — vendor management, dual sourcing, stock strategy', costo_mensile:3500, costo_setup:2000, tempo_mesi:4 },
    },
  },

};

window.STEP_DETAIL_BY_SETTORE = STEP_DETAIL_BY_SETTORE;
