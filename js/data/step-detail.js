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
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto al momento', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli base definiti — chi fa cosa è chiaro', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Riunione settimanale + obiettivi misurabili per ruolo', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente + titolare', cosa:'KPI individuali + processi decisionali delegati', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Manager operativo', cosa:'Governance strutturata — il titolare fa solo strategia', costo_mensile:1500, costo_setup:2000, tempo_mesi:6 },
      _label: 'Organizzazione',
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
      '1': { chi:'Titolare', cosa:'Solo permute — nessun acquisto attivo', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Aste online base (BCA, Autorola)', costo_mensile:300, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Buyer part-time', cosa:'Aste online + accordi privati + acquisto da aziende', costo_mensile:800, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Buyer dedicato', cosa:'Buyer full-time — aste fisiche, fleet, rientri leasing', costo_mensile:2800, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Strategia acquisti', cosa:'Team acquisti KPI, partnership noleggiatori e leasing', costo_mensile:4500, costo_setup:2000, tempo_mesi:4 },
      _label: 'Approvvigionamento',
    }
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
      '1': { chi:'Casa madre', cosa:'Team minimo brand — ruoli base da casa madre', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Consulente', cosa:'KPI individuali e piano incentivi strutturato', costo_mensile:0, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Formatore', cosa:'Formazione continua + certificazioni brand', costo_mensile:300, costo_setup:1000, tempo_mesi:2 },
      '4': { chi:'Middle management', cosa:'Middle management — capo vendite, capo service', costo_mensile:800, costo_setup:1500, tempo_mesi:3 },
      '5': { chi:'General manager', cosa:'General manager + governance completa', costo_mensile:2000, costo_setup:3000, tempo_mesi:6 },
      _label: 'Organizzazione',
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
      '1': { chi:'Service base', cosa:'Service standard — tagliandi e garanzia come da brand', costo_mensile:3000, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Service advisor', cosa:'Richiamo proattivo clienti per tagliandi e scadenze', costo_mensile:3500, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Service advisor senior', cosa:'Service advisor dedicato + upsell attivo su ogni passaggio', costo_mensile:5000, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Resp. after sales', cosa:'Carrozzeria + ricambi + accessori come centro profitto', costo_mensile:7500, costo_setup:2000, tempo_mesi:3 },
      '5': { chi:'After sales manager', cosa:'Contratti manutenzione, fleet management, fidelizzazione', costo_mensile:10000, costo_setup:3000, tempo_mesi:4 },
      _label: 'Post-vendita / Service',
    }
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
      '1': { chi:'Titolare', cosa:'Nessuna — titolare fa tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli base tra operai', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Resp. produzione libera il titolare', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'Riunioni settimanali + KPI per reparto', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management strutturato — titolare solo strategia', costo_mensile:1500, costo_setup:2000, tempo_mesi:5 },
      _label: 'Organizzazione',
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
      '1': { chi:'Nessuno', cosa:'Nessuna presenza su portali o canali digitali B2B', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Iscrizione portali B2B (Kompass, Europages)', costo_mensile:30, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Configuratore', cosa:'Configuratore preventivi online per lavorazioni standard', costo_mensile:200, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'Export development', cosa:'Partnership con distributori/agenti internazionali per export', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Portale B2B', cosa:'Portale clienti B2B — ordini, tracking commesse, documenti', costo_mensile:800, costo_setup:8000, tempo_mesi:4 },
      _label: 'Export / Canale digitale',
    }
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
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli definiti produzione/qualità', costo_mensile:0, costo_setup:300, tempo_mesi:2 },
      '3': { chi:'Titolare', cosa:'Resp. qualità IATF autonomo', costo_mensile:300, costo_setup:800, tempo_mesi:3 },
      '4': { chi:'Consulente', cosa:'KPI stabilimento + riunioni cross-funzionali', costo_mensile:500, costo_setup:1500, tempo_mesi:4 },
      '5': { chi:'Plant manager', cosa:'Plant manager + continuous improvement', costo_mensile:2000, costo_setup:3000, tempo_mesi:6 },
      _label: 'Organizzazione',
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
      '1': { chi:'Nessuno', cosa:'Nessuna presenza digitale B2B', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Registrazione su portali OEM e piattaforme sourcing', costo_mensile:50, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Portale ordini', cosa:'Portale clienti per ordini ricorrenti e gestione kanban', costo_mensile:300, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'Integrazione EDI', cosa:'EDI con clienti principali — ordini automatici', costo_mensile:600, costo_setup:5000, tempo_mesi:3 },
      '5': { chi:'Supply chain digitale', cosa:'Forecast condiviso, VMI, consignment stock', costo_mensile:1200, costo_setup:10000, tempo_mesi:4 },
      _label: 'Supply chain digitale',
    }
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
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli produzione definiti', costo_mensile:0, costo_setup:200, tempo_mesi:2 },
      '3': { chi:'Titolare', cosa:'Riunioni + pianificazione commesse', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'KPI + processi decisionali', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management R&D + produzione + commerciale', costo_mensile:1500, costo_setup:2000, tempo_mesi:5 },
      _label: 'Organizzazione',
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
      '1': { chi:'Nessuno', cosa:'Nessuna presenza digitale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Portali B2B packaging (PackagingOnline, Europages)', costo_mensile:30, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Configuratore', cosa:'Configuratore online per prodotti standard (scatole, buste, etichette)', costo_mensile:250, costo_setup:3000, tempo_mesi:2 },
      '4': { chi:'E-commerce', cosa:'E-commerce B2B per riordini clienti + piccoli lotti', costo_mensile:500, costo_setup:5000, tempo_mesi:3 },
      '5': { chi:'Piattaforma integrata', cosa:'Portale clienti integrato — riordini automatici, stock dedicato', costo_mensile:1000, costo_setup:8000, tempo_mesi:4 },
      _label: 'Canale digitale B2B',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MANIFATTURIERO CTERZI
  // ═══════════════════════════════════════════════════════════════════════════
  manifatturiero_cterzi: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare gestisce 3-5 clienti storici — nessun venditore', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Mappatura aziende zona + visite proattive a uffici acquisti', tempo_mesi:1, moduli:[
        { id:'mappatura', nome:'Mappatura prospect industriali zona', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.6, note:'Database aziende target: settore, dimensione, tipo lavorazioni richieste' },
        { id:'visite', nome:'Piano visite uffici acquisti', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.3, note:'1-2 giorni/settimana fuori, visita prospect con campioni e listino' },
      ]},
      '3': { cosa:'Agente B2B industriale per diversificazione clienti', tempo_mesi:2, moduli:[
        { id:'agente', nome:'Agente industriale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agente', nome:'Agente ENASARCO B2B industriale', costo_mensile:1000, costo_setup:500, impatto:1.0, note:'Provvigione 3-5% su commesse, porta portafoglio clienti del settore' },
          { id:'dip', nome:'Commerciale dipendente esterno', costo_mensile:2500, costo_setup:0, impatto:0.8, note:'Fisso + auto + incentivi, fidelizzato' },
        ]},
      ]},
      '4': { cosa:'Commerciale + inside sales per sviluppo e fidelizzazione', tempo_mesi:3, moduli:[
        { id:'commerciale', nome:'Commerciale B2B esterno', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Commerciale dipendente', costo_mensile:2500, costo_setup:0, impatto:0.5, note:'Visite prospect, gestione offerte, rapporti uffici acquisti' },
          { id:'agente', nome:'Agente ENASARCO', costo_mensile:1200, costo_setup:0, impatto:0.35, note:'Provvigione su nuovi clienti' },
        ]},
        { id:'inside', nome:'Inside sales/back-office commerciale', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'dip', nome:'Inside sales dipendente', costo_mensile:1800, costo_setup:0, impatto:0.2, note:'Preventivi, follow-up, gestione ordini ricorrenti' },
          { id:'parttime', nome:'Inside sales part-time', costo_mensile:900, costo_setup:0, impatto:0.12, note:'4h/giorno' },
        ]},
      ]},
      '5': { cosa:'Resp. commerciale + agenti + sviluppo export', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Responsabile commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale dipendente', costo_mensile:3500, costo_setup:0, impatto:0.5, note:'Coordinamento vendite, pricing, grandi clienti, export' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1800, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini a voce e email', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con clienti, commesse, offerte e scadenze', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Cliente, offerta, stato, valore, margine stimato' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot/Zoho)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline + storico + reminder' },
        ]},
      ]},
      '3': { cosa:'CRM B2B con gestione offerte e ciclo vendita lungo', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM B2B manifatturiero', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'b2b', nome:'CRM B2B (Salesforce/Zoho CRM)', costo_mensile:60, costo_setup:400, impatto:1.0, note:'Pipeline, offerte, contratti quadro, forecast' },
          { id:'generico', nome:'CRM leggero (Pipedrive)', costo_mensile:30, costo_setup:200, impatto:0.65, note:'Pipeline base' },
        ]},
      ]},
      '4': { cosa:'CRM integrato con gestionale produzione e commesse', tempo_mesi:2, moduli:[
        { id:'erp', nome:'Gestionale produzione cterzi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'erp', nome:'ERP manifatturiero (TeamSystem/Mago4)', costo_mensile:400, costo_setup:2000, impatto:1.0, note:'Offerte, commesse, produzione, acquisti, consuntivo, fatturazione' },
          { id:'base', nome:'Gestionale + Excel produzione', costo_mensile:150, costo_setup:800, impatto:0.55, note:'Fatturazione + foglio commesse' },
        ]},
      ]},
      '5': { cosa:'ERP manifatturiero completo con MES e BI', tempo_mesi:4, moduli:[
        { id:'erp_full', nome:'ERP manifatturiero enterprise', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP + MES (SAP B1/Mago4 Manufacturing)', costo_mensile:800, costo_setup:5000, impatto:1.0, note:'Offerte, commesse, MRP, produzione, qualita, logistica, BI' },
          { id:'mid', nome:'ERP mid-market', costo_mensile:400, costo_setup:2500, impatto:0.6, note:'Core features' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Titolare decide tutto — in officina e in ufficio', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Capo officina autonomo + separazione ruoli', tempo_mesi:1, moduli:[
        { id:'capo', nome:'Capo officina/reparto', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione interna operaio esperto', costo_mensile:0, costo_setup:300, impatto:1.0, note:'Gia conosce macchine e lavorazioni, formazione gestione' },
          { id:'esterno', nome:'Assunzione capo reparto esterno', costo_mensile:300, costo_setup:0, impatto:0.8, note:'Esperienza da altro terzista' },
        ]},
      ]},
      '3': { cosa:'Impiegata tecnica/commerciale + obiettivi per reparto', tempo_mesi:2, moduli:[
        { id:'admin', nome:'Impiegata tecnica/commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Impiegata dipendente', costo_mensile:1800, costo_setup:0, impatto:0.7, note:'Preventivi, ordini, DDT, fatture, rapporto clienti' },
          { id:'parttime', nome:'Impiegata part-time', costo_mensile:900, costo_setup:0, impatto:0.5, note:'4h/giorno' },
        ]},
      ]},
      '4': { cosa:'KPI produzione + responsabile qualita', tempo_mesi:3, moduli:[
        { id:'kpi', nome:'Dashboard KPI officina', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'OEE macchine, tempi ciclo, scarti, on-time delivery, margine per commessa' },
        { id:'qualita', nome:'Responsabile qualita', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'interno', nome:'Addetto qualita formato', costo_mensile:200, costo_setup:500, impatto:0.3, note:'Controllo dimensionale, documentazione, certificati' },
          { id:'consulente', nome:'Consulente qualita esterno', costo_mensile:400, costo_setup:0, impatto:0.4, note:'ISO 9001, audit, metrologia' },
        ]},
      ]},
      '5': { cosa:'Management completo — titolare solo strategia e sviluppo', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Direttore operativo/stabilimento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. operativo dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Produzione, qualita, personale, logistica' },
          { id:'fractional', nome:'Operations manager fractional', costo_mensile:1800, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — tutto a esperienza', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Schede di lavorazione + controllo qualita in ingresso/uscita', tempo_mesi:1, moduli:[
        { id:'schede', nome:'Schede di lavorazione standard', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.6, note:'Scheda per commessa: disegno, materiale, lavorazioni, tempi, tolleranze' },
        { id:'controllo', nome:'Controllo qualita base', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.25, note:'Controllo dimensionale in ingresso e uscita, registro NC' },
      ]},
      '3': { cosa:'Gestionale commesse + pianificazione produzione', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Software gestione commesse', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Gestionale produzione (Mago4/Fluentis)', costo_mensile:200, costo_setup:1500, impatto:1.0, note:'Commesse, cicli, tempi, materiali, consuntivo automatico' },
          { id:'base', nome:'Excel avanzato + Gantt', costo_mensile:0, costo_setup:500, impatto:0.45, note:'Foglio commesse + pianificazione manuale' },
        ]},
      ]},
      '4': { cosa:'ISO 9001 + gestione strumenti di misura + SPC', tempo_mesi:3, moduli:[
        { id:'iso', nome:'Certificazione ISO 9001', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'consulente', nome:'ISO 9001 con consulente + ente', costo_mensile:150, costo_setup:4000, impatto:1.0, note:'Prerequisito per molti clienti industriali e automotive' },
          { id:'interno', nome:'Sistema qualita senza certificazione', costo_mensile:0, costo_setup:1000, impatto:0.45, note:'Processi documentati ma senza ente terzo' },
        ]},
      ]},
      '5': { cosa:'ERP + MES + monitoraggio macchine (Industry 4.0)', tempo_mesi:4, moduli:[
        { id:'mes', nome:'MES + monitoraggio macchine', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'MES + IoT macchine (OEE real-time)', costo_mensile:500, costo_setup:5000, impatto:1.0, note:'Tempi ciclo reali, OEE, fermi macchina, consuntivo automatico' },
          { id:'base', nome:'ERP con modulo produzione avanzato', costo_mensile:300, costo_setup:2500, impatto:0.55, note:'Gestione commesse avanzata, senza IoT macchine' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo orario fisso — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Calcolo costi reali per lavorazione — margine per commessa', tempo_mesi:1, moduli:[
        { id:'costing', nome:'Sistema calcolo costi commessa', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8, note:'Costo orario macchina + operatore + materiale + setup — margine reale' },
      ]},
      '3': { cosa:'Contratti quadro con clienti principali — volumi garantiti', tempo_mesi:1, moduli:[
        { id:'contratti', nome:'Contratti quadro clienti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.7, note:'Prezzo bloccato per volume annuo, priorita, pagamento regolare' },
      ]},
      '4': { cosa:'Servizi a valore: trattamenti, assemblaggi, kit completi', tempo_mesi:2, moduli:[
        { id:'servizi', nome:'Servizi a valore aggiunto', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Non solo lavorazione: trattamento, assemblaggio, kitting, confezionamento' },
        { id:'logistica', nome:'Consegna just-in-time/kanban', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Consegna programmata, kanban, stock a magazzino per il cliente' },
      ]},
      '5': { cosa:'Co-design + gestione progetto completo + prodotto finito', tempo_mesi:3, moduli:[
        { id:'codesign', nome:'Servizio co-design/engineering', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'Co-design + prodotto finito completo', costo_mensile:500, costo_setup:2000, impatto:1.0, note:'Dal disegno al prodotto finito: engineering, prototipo, produzione, assemblaggio' },
          { id:'parziale', nome:'Supporto engineering su lavorazioni', costo_mensile:200, costo_setup:800, impatto:0.5, note:'Ottimizzazione progetto per produzione, DFM' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola industriale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'LinkedIn aziendale + foto officina/lavorazioni', tempo_mesi:1, moduli:[
        { id:'linkedin', nome:'LinkedIn aziendale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Post: lavorazioni, macchine, pezzi finiti, team — visibilita B2B' },
        { id:'video', nome:'Video lavorazioni/macchine', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.3, note:'Video brevi CNC, fresatura, tornitura — best visual per industria' },
      ]},
      '3': { cosa:'Fiere subfornitura (MECSPE, Fornitore Offresi) + portali B2B', tempo_mesi:2, moduli:[
        { id:'fiere', nome:'Fiere subfornitura', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'stand', nome:'Stand MECSPE/Fornitore Offresi', costo_mensile:200, costo_setup:3000, impatto:1.0, note:'Stand con campioni, 1 fiera/anno' },
          { id:'visitatore', nome:'Visita come operatore', costo_mensile:100, costo_setup:500, impatto:0.4, note:'Networking, niente stand' },
        ]},
        { id:'portali', nome:'Portali subfornitura (MFG.com/Xometry)', tipo:'flag', obbligatorio:false, costo_mensile:100, costo_setup:0, impatto:0.2, note:'Profilo su piattaforme di sourcing industriale' },
      ]},
      '4': { cosa:'LinkedIn Ads su uffici acquisti + content tecnico', tempo_mesi:2, moduli:[
        { id:'digital', nome:'Marketing digitale B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing B2B industriale', costo_mensile:600, costo_setup:500, impatto:1.0, note:'LinkedIn Ads, content tecnico, case study, video' },
          { id:'interno', nome:'LinkedIn autogestito + ads base', costo_mensile:200, costo_setup:200, impatto:0.5, note:'Post + budget ads' },
        ]},
      ]},
      '5': { cosa:'Piano marketing B2B — brand industriale, fiere, digital, partnership', tempo_mesi:3, moduli:[
        { id:'piano', nome:'Piano marketing B2B cterzi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing B2B industriale', costo_mensile:1500, costo_setup:3000, impatto:1.0, note:'Brand, fiere, LinkedIn, content, portali' },
          { id:'interno', nome:'Marketing coordinator interno', costo_mensile:800, costo_setup:500, impatto:0.6, note:'1 risorsa' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito con lavorazioni, parco macchine, certificazioni, settori serviti', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito manifatturiero B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom WordPress', costo_mensile:30, costo_setup:2000, impatto:1.0, note:'Lavorazioni, macchine, tolleranze, certificazioni, gallery, form RFQ' },
          { id:'template', nome:'Sito da template industriale', costo_mensile:20, costo_setup:600, impatto:0.5, note:'Template B2B' },
        ]},
      ]},
      '3': { cosa:'Catalogo capacita produttive + form RFQ online', tempo_mesi:2, moduli:[
        { id:'capacita', nome:'Catalogo capacita produttive', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1000, impatto:0.5, note:'Macchine, dimensioni max, tolleranze, materiali, certificazioni — il buyer capisce subito' },
        { id:'rfq', nome:'Form RFQ (richiesta offerta) online', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.4, note:'Upload disegno, materiale, quantita, urgenza — lead qualificato' },
      ]},
      '4': { cosa:'Portale clienti con tracking commesse e documentazione', tempo_mesi:3, moduli:[
        { id:'portale', nome:'Portale clienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'integrato', nome:'Portale integrato con ERP', costo_mensile:200, costo_setup:3000, impatto:1.0, note:'Stato commesse, certificati qualita, DDT, fatture — self-service' },
          { id:'base', nome:'Area riservata base', costo_mensile:50, costo_setup:1000, impatto:0.5, note:'Documentazione + form richieste' },
        ]},
      ]},
      '5': { cosa:'Piattaforma digitale — sito, portale clienti, RFQ automatizzato, BI', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma digitale manifatturiera', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Piattaforma enterprise', costo_mensile:500, costo_setup:8000, impatto:1.0, note:'Sito, portale clienti, RFQ + quotazione automatica, tracking, BI' },
          { id:'mid', nome:'Sito + portale base', costo_mensile:200, costo_setup:3000, impatto:0.5, note:'WordPress + area clienti + form' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento materiali',
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 fornitori abituali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto fornitori materiali — acciaio, alluminio, plastica', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database fornitori materiali', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda: centro servizi, tipo materiale, certificazioni, tempi, prezzi' },
      ]},
      '3': { cosa:'Accordi quadro con centri servizi e distributori', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro fornitori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Prezzi bloccati, consegna rapida, certificati materiale inclusi' },
      ]},
      '4': { cosa:'Buyer dedicato — dual sourcing, gestione scorte, import', tempo_mesi:3, moduli:[
        { id:'buyer', nome:'Buyer materiali', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer industriale dipendente', costo_mensile:2000, costo_setup:0, impatto:1.0, note:'Negoziazione, dual sourcing, gestione scorte, import' },
          { id:'parttime', nome:'Admin con delega acquisti', costo_mensile:900, costo_setup:0, impatto:0.6, note:'Gestisce riordini e confronto prezzi' },
        ]},
      ]},
      '5': { cosa:'Supply chain manager — hedging prezzi, import diretto, stock strategy', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Resp. supply chain', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Supply chain manager dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Strategia acquisti, hedging, import, ottimizzazione scorte' },
          { id:'fractional', nome:'Supply chain manager fractional', costo_mensile:1500, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MANIFATTURIERO ELETTROMECCANICA
  // ═══════════════════════════════════════════════════════════════════════════
  manifatturiero_elettromeccanica: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare gestisce clienti — nessun venditore', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Visite a costruttori macchine e OEM — proposta componenti/assiemi', tempo_mesi:1, moduli:[
        { id:'visite', nome:'Piano visite OEM/costruttori', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:0, impatto:0.6, note:'Visite a costruttori macchine, quadristi, impiantisti della zona' },
        { id:'campioni', nome:'Campionatura componenti per test', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.3, note:'Prototipi e campioni per qualifica presso OEM' },
      ]},
      '3': { cosa:'Tecnico-commerciale per sviluppo nuovi OEM', tempo_mesi:2, moduli:[
        { id:'commerciale', nome:'Tecnico-commerciale elettromeccanica', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Tecnico-commerciale dipendente', costo_mensile:2800, costo_setup:0, impatto:1.0, note:'Competenza tecnica (schemi, componenti) + vendita' },
          { id:'agente', nome:'Agente B2B industriale', costo_mensile:1200, costo_setup:500, impatto:0.7, note:'Provvigione su commesse, porta contatti OEM' },
        ]},
      ]},
      '4': { cosa:'Account manager OEM + inside sales per riordini', tempo_mesi:3, moduli:[
        { id:'account', nome:'Account manager OEM', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Account OEM dipendente', costo_mensile:3000, costo_setup:0, impatto:0.5, note:'Gestisce top 10 OEM, sviluppo co-design, pricing' },
          { id:'fractional', nome:'Account fractional', costo_mensile:1500, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
        { id:'inside', nome:'Inside sales/ordini', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'dip', nome:'Inside sales dipendente', costo_mensile:1800, costo_setup:0, impatto:0.2, note:'Gestione riordini, preventivi standard, follow-up' },
          { id:'parttime', nome:'Inside sales part-time', costo_mensile:900, costo_setup:0, impatto:0.12, note:'4h/giorno' },
        ]},
      ]},
      '5': { cosa:'Dir. commerciale + sviluppo export + partnership OEM internazionali', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Direttore commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale dipendente', costo_mensile:3500, costo_setup:0, impatto:0.5, note:'Coordinamento vendite, pricing, grandi OEM, export' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1800, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'CRM base per pipeline offerte e commesse', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'hubspot', nome:'HubSpot Free/Starter', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline offerte + storico + reminder' },
          { id:'excel', nome:'Excel strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Foglio offerte e commesse' },
        ]},
      ]},
      '3': { cosa:'CRM con gestione offerte complesse e contratti quadro', tempo_mesi:1, moduli:[
        { id:'crm_pro', nome:'CRM professionale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'salesforce', nome:'Salesforce/Zoho CRM', costo_mensile:60, costo_setup:400, impatto:1.0, note:'Pipeline, offerte multi-fase, contratti, forecast' },
          { id:'pipedrive', nome:'Pipedrive', costo_mensile:30, costo_setup:200, impatto:0.65, note:'Pipeline visuale' },
        ]},
      ]},
      '4': { cosa:'Gestionale integrato — offerte, commesse, produzione, acquisti', tempo_mesi:2, moduli:[
        { id:'erp', nome:'ERP elettromeccanico', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'erp', nome:'ERP manifatturiero (TeamSystem/Mago4)', costo_mensile:400, costo_setup:2000, impatto:1.0, note:'Offerte, commesse, distinte base, produzione, acquisti, fatturazione' },
          { id:'base', nome:'Gestionale + moduli', costo_mensile:150, costo_setup:800, impatto:0.55, note:'Fatturazione + Excel commesse' },
        ]},
      ]},
      '5': { cosa:'ERP completo con MRP, configuratore prodotto e BI', tempo_mesi:4, moduli:[
        { id:'erp_full', nome:'ERP enterprise', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP + MRP (SAP B1/Mago4 Manufacturing)', costo_mensile:800, costo_setup:5000, impatto:1.0, note:'MRP, distinte multilivello, commesse, qualita, logistica, BI' },
          { id:'mid', nome:'ERP mid-market', costo_mensile:400, costo_setup:2500, impatto:0.6, note:'Core features' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Titolare in officina — decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Capo officina + separazione ruoli produzione/collaudo', tempo_mesi:1, moduli:[
        { id:'capo', nome:'Capo officina/produzione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione interna', costo_mensile:0, costo_setup:300, impatto:1.0, note:'Conosce macchine e prodotti' },
          { id:'esterno', nome:'Assunzione esterna', costo_mensile:300, costo_setup:0, impatto:0.8, note:'Esperienza da altro elettromeccanico' },
        ]},
      ]},
      '3': { cosa:'Impiegata tecnica + progettista/disegnatore', tempo_mesi:2, moduli:[
        { id:'progettista', nome:'Progettista elettromeccanico', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Progettista CAD/CAE dipendente', costo_mensile:2500, costo_setup:0, impatto:0.7, note:'Schemi elettrici, 3D meccanica, distinte base, prototipi' },
          { id:'freelance', nome:'Progettista freelance', costo_mensile:1200, costo_setup:0, impatto:0.5, note:'A progetto, per picchi di lavoro' },
        ]},
      ]},
      '4': { cosa:'KPI produzione + resp. qualita + certificazioni', tempo_mesi:3, moduli:[
        { id:'qualita', nome:'Responsabile qualita', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'interno', nome:'Addetto qualita formato', costo_mensile:200, costo_setup:500, impatto:0.4, note:'Collaudo, certificati, ISO 9001, gestione NC' },
          { id:'consulente', nome:'Consulente qualita', costo_mensile:400, costo_setup:0, impatto:0.5, note:'ISO 9001, audit, metrologia, certificazioni CE' },
        ]},
        { id:'kpi', nome:'Dashboard KPI produzione', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'OEE, scarti, tempi ciclo, on-time delivery' },
      ]},
      '5': { cosa:'Management completo — titolare solo R&D e strategia', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Direttore operativo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. operativo dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Produzione, qualita, personale, logistica' },
          { id:'fractional', nome:'Operations manager fractional', costo_mensile:1800, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — produzione artigianale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Distinte base strutturate + schemi elettrici + collaudo', tempo_mesi:1, moduli:[
        { id:'distinte', nome:'Distinte base e documentazione tecnica', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'BOM, schemi elettrici, disegni meccanici, procedure collaudo' },
        { id:'collaudo', nome:'Procedura collaudo strutturata', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.25, note:'Checklist collaudo elettrico e meccanico, registrazione risultati' },
      ]},
      '3': { cosa:'Gestionale produzione + pianificazione commesse', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Software gestione produzione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'ERP manifatturiero (Mago4/Fluentis)', costo_mensile:200, costo_setup:1500, impatto:1.0, note:'Commesse, distinte, cicli, MRP base, acquisti' },
          { id:'base', nome:'Excel + gestionale base', costo_mensile:0, costo_setup:500, impatto:0.45, note:'Foglio commesse + fatturazione' },
        ]},
      ]},
      '4': { cosa:'ISO 9001 + marcatura CE + gestione configurazioni', tempo_mesi:3, moduli:[
        { id:'iso', nome:'ISO 9001', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'consulente', nome:'ISO 9001 con consulente + ente', costo_mensile:150, costo_setup:4000, impatto:1.0, note:'Prerequisito per OEM e mercato industriale' },
          { id:'interno', nome:'Sistema qualita senza certificazione', costo_mensile:0, costo_setup:1000, impatto:0.45, note:'Processi documentati' },
        ]},
        { id:'ce', nome:'Marcatura CE strutturata', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Direttiva Bassa Tensione, EMC, documentazione tecnica CE' },
      ]},
      '5': { cosa:'ERP + PDM/PLM + MES per tracciabilita completa', tempo_mesi:4, moduli:[
        { id:'plm', nome:'PDM/PLM + MES', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'ERP + PDM + MES integrati', costo_mensile:600, costo_setup:5000, impatto:1.0, note:'Gestione configurazioni, versioni, tracciabilita, OEE' },
          { id:'base', nome:'ERP avanzato senza PLM', costo_mensile:300, costo_setup:2500, impatto:0.55, note:'Commesse avanzate, senza PDM/PLM' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo a preventivo — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Calcolo costi reali per componente/assieme', tempo_mesi:1, moduli:[
        { id:'costing', nome:'Sistema costing prodotti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8, note:'Costo materiale + lavorazione + assemblaggio + collaudo — margine reale' },
      ]},
      '3': { cosa:'Contratti quadro OEM + servizi di co-design', tempo_mesi:1, moduli:[
        { id:'contratti', nome:'Contratti quadro OEM', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Volume annuo, prezzo bloccato, consegna programmata' },
        { id:'codesign', nome:'Servizio co-design componenti', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Progettazione congiunta con OEM — margine engineering' },
      ]},
      '4': { cosa:'Prodotto standard configurabile + service post-vendita', tempo_mesi:2, moduli:[
        { id:'standard', nome:'Prodotto standard a catalogo', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1000, impatto:0.6, note:'Componenti/assiemi standard configurabili — margine superiore, delivery veloce' },
        { id:'service', nome:'Service e ricambi post-vendita', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Ricambi, riparazioni, upgrade — ricavo ricorrente' },
      ]},
      '5': { cosa:'IP proprietaria + prodotto finito + export', tempo_mesi:3, moduli:[
        { id:'ip', nome:'Prodotto/IP proprietaria', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'prodotto', nome:'Prodotto finito con brand proprio', costo_mensile:500, costo_setup:3000, impatto:1.0, note:'Da terzista a produttore: prodotto proprio, margine pieno, brand' },
          { id:'oem', nome:'Prodotto OEM white label', costo_mensile:200, costo_setup:1000, impatto:0.5, note:'Prodotto proprio venduto con marchio OEM — volume senza marketing' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'LinkedIn aziendale + foto prodotti e processi', tempo_mesi:1, moduli:[
        { id:'linkedin', nome:'LinkedIn aziendale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Post: prodotti, assemblaggio, collaudo, team' },
        { id:'video', nome:'Video prodotti/processi', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.3, note:'Video brevi produzione e collaudo' },
      ]},
      '3': { cosa:'Fiere industriali (SPS, MECSPE) + portali B2B', tempo_mesi:2, moduli:[
        { id:'fiere', nome:'Fiere industriali', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'stand', nome:'Stand SPS/MECSPE', costo_mensile:200, costo_setup:3000, impatto:1.0, note:'Stand con campioni, 1 fiera/anno' },
          { id:'visitatore', nome:'Visita come operatore', costo_mensile:100, costo_setup:500, impatto:0.4, note:'Networking' },
        ]},
      ]},
      '4': { cosa:'LinkedIn Ads + content tecnico + case study', tempo_mesi:2, moduli:[
        { id:'digital', nome:'Marketing digitale B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia B2B industriale', costo_mensile:600, costo_setup:500, impatto:1.0, note:'LinkedIn Ads, content, case study, video' },
          { id:'interno', nome:'Autogestito + ads', costo_mensile:200, costo_setup:200, impatto:0.5, note:'Post + budget ads' },
        ]},
      ]},
      '5': { cosa:'Piano marketing B2B — brand, fiere, digital, partnership OEM', tempo_mesi:3, moduli:[
        { id:'piano', nome:'Piano marketing B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing B2B', costo_mensile:1500, costo_setup:3000, impatto:1.0, note:'Brand, fiere, LinkedIn, content, PR' },
          { id:'interno', nome:'Marketing coordinator', costo_mensile:800, costo_setup:500, impatto:0.6, note:'1 risorsa' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito con prodotti, capacita, certificazioni', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito B2B elettromeccanica', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom', costo_mensile:30, costo_setup:2000, impatto:1.0, note:'Prodotti, capacita, certificazioni, gallery, form RFQ' },
          { id:'template', nome:'Sito template', costo_mensile:20, costo_setup:600, impatto:0.5, note:'Template industriale' },
        ]},
      ]},
      '3': { cosa:'Catalogo prodotti con schede tecniche + configuratore base', tempo_mesi:2, moduli:[
        { id:'catalogo', nome:'Catalogo prodotti tecnico', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1500, impatto:0.5, note:'Schede prodotto con specifiche, disegni, datasheet scaricabili' },
        { id:'rfq', nome:'Form RFQ online', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.4, note:'Richiesta offerta con specifiche tecniche' },
      ]},
      '4': { cosa:'Portale clienti con tracking ordini e documentazione', tempo_mesi:3, moduli:[
        { id:'portale', nome:'Portale clienti OEM', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'integrato', nome:'Portale integrato ERP', costo_mensile:200, costo_setup:3000, impatto:1.0, note:'Stato ordini, certificati, disegni, test report' },
          { id:'base', nome:'Area riservata base', costo_mensile:50, costo_setup:1000, impatto:0.5, note:'Documentazione + form' },
        ]},
      ]},
      '5': { cosa:'Piattaforma digitale con configuratore prodotto e BI', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma digitale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Piattaforma con configuratore', costo_mensile:500, costo_setup:8000, impatto:1.0, note:'Configuratore prodotto online, portale clienti, BI' },
          { id:'mid', nome:'Sito + portale', costo_mensile:200, costo_setup:3000, impatto:0.5, note:'WordPress + area clienti' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento componenti',
      '1': { chi:'Titolare', cosa:'Acquisto da distributori abituali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto distributori componenti elettromeccanici', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database fornitori componenti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Distributori: RS, Farnell, TME, produttori diretti — listini, tempi, MOQ' },
      ]},
      '3': { cosa:'Accordi quadro con distributori + produttori componenti', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro fornitori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Sconti volume, consegna rapida, supporto tecnico' },
      ]},
      '4': { cosa:'Buyer dedicato — dual sourcing, import, gestione obsolescenza', tempo_mesi:3, moduli:[
        { id:'buyer', nome:'Buyer componenti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer tecnico dipendente', costo_mensile:2000, costo_setup:0, impatto:1.0, note:'Negoziazione, dual sourcing, gestione obsolescenza, import' },
          { id:'parttime', nome:'Admin con delega acquisti', costo_mensile:900, costo_setup:0, impatto:0.6, note:'Gestisce riordini e confronto prezzi' },
        ]},
      ]},
      '5': { cosa:'Supply chain manager — vendor management, stock strategy, import', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Resp. supply chain', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Supply chain manager', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Vendor management, dual sourcing, stock componenti critici' },
          { id:'fractional', nome:'SCM fractional', costo_mensile:1500, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MANIFATTURIERO TESSILE TESSUTI
  // ═══════════════════════════════════════════════════════════════════════════
  manifatturiero_tessile_tessuti: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare gestisce clienti storici (confezionisti e brand)', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Campionatura proattiva verso confezionisti e brand nuovi', tempo_mesi:1, moduli:[
        { id:'campionatura', nome:'Servizio campionatura strutturato', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:500, impatto:0.6, note:'Cartella colori, campioni tessuto, schede tecniche — invio a stilisti e buyer' },
        { id:'fiere', nome:'Partecipazione fiere tessili', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Premiere Vision, Milano Unica — presentazione collezioni tessuto' },
      ]},
      '3': { cosa:'Agente tessile per confezionisti e brand moda', tempo_mesi:2, moduli:[
        { id:'agente', nome:'Agente tessile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'plurimandatario', nome:'Agente tessile plurimandatario', costo_mensile:800, costo_setup:500, impatto:1.0, note:'Provvigione 5-8%, porta portafoglio confezionisti e brand' },
          { id:'dip', nome:'Commerciale tessile dipendente', costo_mensile:2500, costo_setup:0, impatto:0.8, note:'Fisso + incentivi, dedica tutto il tempo al tessitore' },
        ]},
      ]},
      '4': { cosa:'Rete agenti + sviluppo brand moda internazionali', tempo_mesi:3, moduli:[
        { id:'rete', nome:'Rete agenti tessile', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'agente', nome:'Agente tessile per zona/segmento', costo_mensile:800, costo_setup:0, impatto:0.3, note:'Italia o estero' },
          { id:'dip', nome:'Commerciale dipendente', costo_mensile:2500, costo_setup:0, impatto:0.25, note:'Per zona ad alto potenziale' },
        ]},
      ]},
      '5': { cosa:'Dir. commerciale + rete agenti + export + showroom', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Direttore commerciale tessile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale dipendente', costo_mensile:3500, costo_setup:0, impatto:0.5, note:'Coordinamento agenti, brand moda, pricing, export' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1800, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con clienti, campioni inviati, ordini stagionali', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Tracciamento clienti/campioni', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Cliente, campioni inviati, ordini SS/FW, metratura, pagamenti' },
          { id:'crm', nome:'CRM gratuito', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline + storico + campionature' },
        ]},
      ]},
      '3': { cosa:'CRM tessile con gestione campionature e ordini per stagione', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM tessile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'b2b', nome:'CRM B2B (Salesforce/Zoho)', costo_mensile:60, costo_setup:400, impatto:1.0, note:'Pipeline per campagna, campionature, ordini, forecast' },
          { id:'generico', nome:'CRM leggero (Pipedrive)', costo_mensile:30, costo_setup:200, impatto:0.6, note:'Pipeline base' },
        ]},
      ]},
      '4': { cosa:'Gestionale tessile integrato — ordini, produzione, magazzino', tempo_mesi:2, moduli:[
        { id:'erp', nome:'Gestionale tessile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'ERP tessile (Datatex/Cybertex)', costo_mensile:500, costo_setup:2000, impatto:1.0, note:'Ordini, ricette tessuto, produzione, tintoria, magazzino, fatturazione' },
          { id:'generico', nome:'ERP generico + Excel produzione', costo_mensile:200, costo_setup:800, impatto:0.55, note:'Meno specifico per tessile' },
        ]},
      ]},
      '5': { cosa:'ERP tessile completo con pianificazione produzione e BI', tempo_mesi:4, moduli:[
        { id:'erp_full', nome:'ERP tessile enterprise', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP tessile enterprise (Datatex/SAP)', costo_mensile:1000, costo_setup:5000, impatto:1.0, note:'Pianificazione, produzione, qualita, logistica, BI, export' },
          { id:'mid', nome:'Gestionale tessile mid-market', costo_mensile:500, costo_setup:2500, impatto:0.6, note:'Core features' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Titolare al telaio — decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Capo produzione + separazione tessitura/finissaggio/confezionamento', tempo_mesi:1, moduli:[
        { id:'capo', nome:'Capo produzione tessile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione interna tessitore esperto', costo_mensile:0, costo_setup:300, impatto:1.0, note:'Conosce telai e processi' },
          { id:'esterno', nome:'Capo produzione esterno', costo_mensile:300, costo_setup:0, impatto:0.8, note:'Esperienza da altro tessitore' },
        ]},
      ]},
      '3': { cosa:'Stilista/product developer + impiegata commerciale', tempo_mesi:2, moduli:[
        { id:'stilista', nome:'Product developer/stilista tessuti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Product developer dipendente', costo_mensile:2500, costo_setup:0, impatto:0.7, note:'Sviluppo collezione tessuti, trend, campionature, rapporto stilisti' },
          { id:'freelance', nome:'Stilista tessile freelance', costo_mensile:1000, costo_setup:0, impatto:0.5, note:'A progetto, per collezione SS/FW' },
        ]},
      ]},
      '4': { cosa:'KPI produzione + responsabile qualita tessile', tempo_mesi:3, moduli:[
        { id:'qualita', nome:'Resp. qualita tessile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'interno', nome:'Addetto qualita formato', costo_mensile:200, costo_setup:500, impatto:0.4, note:'Controllo metratura, peso, solidita colore, difetti' },
          { id:'consulente', nome:'Consulente qualita tessile', costo_mensile:400, costo_setup:0, impatto:0.5, note:'ISO 9001, OEKO-TEX, audit, laboratorio' },
        ]},
        { id:'kpi', nome:'KPI produzione tessile', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Resa telaio, scarti, tempi produzione, on-time delivery' },
      ]},
      '5': { cosa:'Management completo — titolare solo R&D e strategia', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Direttore operativo tessile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. operativo dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Produzione, qualita, personale, logistica' },
          { id:'fractional', nome:'Operations manager fractional', costo_mensile:1800, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Produzione artigianale — tutto a esperienza', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Schede tessuto standardizzate + controllo qualita base', tempo_mesi:1, moduli:[
        { id:'schede', nome:'Schede tecniche tessuto', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.6, note:'Composizione, peso, altezza, resa tintoria, lavaggio, istruzioni' },
        { id:'controllo', nome:'Controllo qualita base', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.25, note:'Ispezione visiva, peso, metratura, solidita colore' },
      ]},
      '3': { cosa:'Gestionale produzione tessile + pianificazione telai', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Software produzione tessile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Gestionale tessile (Datatex/Cybertex)', costo_mensile:250, costo_setup:1500, impatto:1.0, note:'Ricette tessuto, pianificazione telai, orditi, tintoria, finissaggio' },
          { id:'base', nome:'Excel avanzato + gestionale base', costo_mensile:0, costo_setup:500, impatto:0.45, note:'Foglio produzione + fatturazione' },
        ]},
      ]},
      '4': { cosa:'Certificazioni (OEKO-TEX, GOTS/BIO, ISO 9001)', tempo_mesi:3, moduli:[
        { id:'certificazioni', nome:'Certificazioni tessile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'oekotex_gots', nome:'OEKO-TEX + GOTS (sostenibilita)', costo_mensile:200, costo_setup:3000, impatto:1.0, note:'Richieste da brand moda, prerequisito per molti clienti' },
          { id:'oekotex', nome:'Solo OEKO-TEX Standard 100', costo_mensile:100, costo_setup:1500, impatto:0.6, note:'Certificazione base sostanze nocive' },
        ]},
      ]},
      '5': { cosa:'ERP tessile completo + laboratorio qualita + BI', tempo_mesi:4, moduli:[
        { id:'erp', nome:'ERP tessile + qualita', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP tessile enterprise', costo_mensile:800, costo_setup:5000, impatto:1.0, note:'Produzione, qualita lab, tracciabilita lotto, logistica, BI' },
          { id:'mid', nome:'Gestionale tessile avanzato', costo_mensile:400, costo_setup:2500, impatto:0.55, note:'Core features' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo al metro — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Calcolo costo reale per articolo tessuto', tempo_mesi:1, moduli:[
        { id:'costing', nome:'Costing per articolo', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8, note:'Filato + orditura + tessitura + finissaggio + tintoria — margine per articolo' },
      ]},
      '3': { cosa:'Collezione propria di tessuti + servizio campionatura rapida', tempo_mesi:2, moduli:[
        { id:'collezione', nome:'Collezione tessuti propria', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Cartella SS/FW con tessuti a stock — vendita rapida senza attesa produzione' },
        { id:'campionatura', nome:'Servizio campionatura rapida', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Campione in 5-7gg vs 3-4 settimane standard — premium price' },
      ]},
      '4': { cosa:'Tessuti tecnici/funzionali + servizi a valore (tintoria, finissaggio)', tempo_mesi:2, moduli:[
        { id:'tecnici', nome:'Tessuti tecnici/funzionali', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1000, impatto:0.6, note:'Tessuti performance, antimacchia, ignifughi, stretch — margine 2-3x' },
        { id:'servizi', nome:'Servizi tintoria/finissaggio conto terzi', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Tintoria e finissaggio anche per altri tessitori — utilizzo capacita' },
      ]},
      '5': { cosa:'Co-development con brand + tessuti sostenibili + export premium', tempo_mesi:3, moduli:[
        { id:'codev', nome:'Co-development tessuti per brand', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'Sviluppo tessuto esclusivo per brand', costo_mensile:500, costo_setup:2000, impatto:1.0, note:'R&D congiunta, tessuto in esclusiva, margine engineering + produzione' },
          { id:'parziale', nome:'Personalizzazione tessuti esistenti', costo_mensile:200, costo_setup:500, impatto:0.5, note:'Varianti colore/finissaggio su base esistente' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo relazione diretta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'LinkedIn + Instagram con foto tessuti e lavorazioni', tempo_mesi:1, moduli:[
        { id:'social', nome:'Social media tessile', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Foto tessuti, macro dettagli, telai in funzione, processi' },
      ]},
      '3': { cosa:'Fiere tessili (Premiere Vision, Milano Unica) + cartella campioni', tempo_mesi:2, moduli:[
        { id:'fiere', nome:'Fiere tessili', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'stand', nome:'Stand Premiere Vision/Milano Unica', costo_mensile:300, costo_setup:5000, impatto:1.0, note:'Stand con campionatura, contatto diretto buyer e stilisti' },
          { id:'visitatore', nome:'Visita come operatore', costo_mensile:100, costo_setup:500, impatto:0.4, note:'Networking, scouting trend' },
        ]},
      ]},
      '4': { cosa:'PR moda + partnership con stilisti/brand + content', tempo_mesi:2, moduli:[
        { id:'pr', nome:'PR e comunicazione tessile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia PR tessile/moda', costo_mensile:1000, costo_setup:1000, impatto:1.0, note:'PR su riviste textile (Textile Research Journal, Tessile e Salute), partnership' },
          { id:'freelance', nome:'PR freelance + LinkedIn', costo_mensile:500, costo_setup:300, impatto:0.5, note:'Focus LinkedIn e riviste trade' },
        ]},
      ]},
      '5': { cosa:'Piano marketing tessile — brand, fiere internazionali, sostenibilita', tempo_mesi:4, moduli:[
        { id:'piano', nome:'Piano marketing tessile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing tessile/moda', costo_mensile:2000, costo_setup:4000, impatto:1.0, note:'Brand positioning Made in Italy, fiere internazionali, sostenibilita, PR' },
          { id:'interno', nome:'Marketing coordinator', costo_mensile:1000, costo_setup:500, impatto:0.6, note:'1 risorsa' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito con collezione tessuti, capacita, certificazioni', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito tessitore', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom (design tessile)', costo_mensile:30, costo_setup:2000, impatto:1.0, note:'Collezione, macro foto tessuti, processi, certificazioni, contatti' },
          { id:'template', nome:'Sito template', costo_mensile:20, costo_setup:600, impatto:0.5, note:'Template B2B' },
        ]},
      ]},
      '3': { cosa:'Catalogo tessuti online con filtri, campioni richiedibili', tempo_mesi:2, moduli:[
        { id:'catalogo', nome:'Catalogo tessuti online', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1500, impatto:0.5, note:'Tessuti per composizione/peso/uso, foto macro, richiesta campione online' },
      ]},
      '4': { cosa:'Portale B2B con ordini e tracking produzione', tempo_mesi:3, moduli:[
        { id:'portale', nome:'Portale B2B tessile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'integrato', nome:'Portale integrato ERP', costo_mensile:300, costo_setup:4000, impatto:1.0, note:'Ordini online, tracking produzione, documentazione, fatture' },
          { id:'base', nome:'Area ordini base', costo_mensile:100, costo_setup:1500, impatto:0.5, note:'Form ordini + area documenti' },
        ]},
      ]},
      '5': { cosa:'Piattaforma digitale con configuratore tessuto e tracciabilita', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma digitale tessile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Piattaforma con configuratore tessuto', costo_mensile:500, costo_setup:8000, impatto:1.0, note:'Configuratore tessuto online, tracciabilita lotto, portale B2B, BI' },
          { id:'mid', nome:'Portale B2B avanzato', costo_mensile:200, costo_setup:3000, impatto:0.5, note:'Ordini + catalogo + tracking' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento filati',
      '1': { chi:'Titolare', cosa:'Acquisto filati da 1-2 filature', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto filature — qualita, titolazione, colori, prezzi', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database filature e fornitori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Filatura, tipo filato, titolazione, colori disponibili, prezzi, MOQ' },
      ]},
      '3': { cosa:'Accordi con filature + fornitori ausiliari (tintoria, finissaggio)', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro filature', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Contratti con 2-3 filature: prezzi campagna, colori, consegna' },
      ]},
      '4': { cosa:'Buyer dedicato — diversificazione filati, import, sostenibilita', tempo_mesi:3, moduli:[
        { id:'buyer', nome:'Buyer filati/materie prime', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer tessile dipendente', costo_mensile:2200, costo_setup:0, impatto:1.0, note:'Sourcing filati, negoziazione, qualita, import, filati sostenibili' },
          { id:'parttime', nome:'Buyer part-time', costo_mensile:1000, costo_setup:0, impatto:0.6, note:'Gestisce riordini e confronto prezzi' },
        ]},
      ]},
      '5': { cosa:'Supply chain tessile — hedging cotone, filati sostenibili, import diretto', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Resp. supply chain tessile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Supply chain manager tessile', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Hedging materie prime, filati riciclati/bio, import diretto, tracciabilita' },
          { id:'fractional', nome:'SCM fractional', costo_mensile:1500, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MANIFATTURIERO TESSILE CAPI
  // ═══════════════════════════════════════════════════════════════════════════
  manifatturiero_tessile_capi: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare vende ai soliti brand — nessun venditore', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Campionario stagionale proattivo verso nuovi brand e catene', tempo_mesi:1, moduli:[
        { id:'campionario', nome:'Sviluppo campionario proattivo', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:800, impatto:0.6, note:'Ricerca tendenze, prototipi per presentazione a brand target' },
        { id:'trasferte', nome:'Trasferte buyer/showroom', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:0, impatto:0.3, note:'Visite dirette a brand e catene, Milano/Firenze' },
      ]},
      '3': { cosa:'Agente moda con portafoglio brand/catene', tempo_mesi:2, moduli:[
        { id:'agente_moda', nome:'Figura commerciale moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agente_pluri', nome:'Agente moda plurimandatario', costo_mensile:1200, costo_setup:0, impatto:0.75, note:'Portafoglio brand gia avviato, showroom condiviso' },
          { id:'agente_mono', nome:'Agente moda monomandatario', costo_mensile:1800, costo_setup:0, impatto:1.0, note:'Dedicato, segue solo i tuoi campionari' },
          { id:'commerciale_dip', nome:'Commerciale interno dedicato', costo_mensile:2200, costo_setup:0, impatto:0.85, note:'Dipendente, meno rete ma piu controllo' },
        ]},
        { id:'lookbook', nome:'Lookbook stagionale professionale', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Foto, styling, layout per presentazione ai buyer' },
      ]},
      '4': { cosa:'Commerciale + showroom per campagne vendita', tempo_mesi:3, moduli:[
        { id:'showroom', nome:'Showroom/campagna vendita', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'showroom_proprio', nome:'Showroom proprio (Milano/Firenze)', costo_mensile:2000, costo_setup:5000, impatto:1.0, note:'Spazio dedicato per campagne vendita' },
          { id:'showroom_condiviso', nome:'Showroom condiviso/temporary', costo_mensile:800, costo_setup:1000, impatto:0.7, note:'Spazio in co-working moda o temporary' },
          { id:'solo_agente', nome:'Solo agente con campionario itinerante', costo_mensile:500, costo_setup:500, impatto:0.5, note:'Nessuno spazio fisso, visite dirette' },
        ]},
        { id:'agente_estero', nome:'Agente/distributore estero', tipo:'flag', obbligatorio:false, costo_mensile:1000, costo_setup:0, impatto:0.25, note:'Primo mercato export (DE/FR/UK)' },
      ]},
      '5': { cosa:'Direttore commerciale + rete agenti Italia/export', tempo_mesi:6, moduli:[
        { id:'dir_comm', nome:'Direzione commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Direttore commerciale dipendente', costo_mensile:3500, costo_setup:0, impatto:0.5, note:'Full-time, coordina agenti e showroom' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1800, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana + fiere' },
        ]},
        { id:'rete', nome:'Rete agenti', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'agente_it', nome:'Agente moda Italia', costo_mensile:1200, costo_setup:0, impatto:0.15, note:'Zona geografica o canale (brand/retail)' },
          { id:'agente_export', nome:'Agente/distributore export', costo_mensile:1500, costo_setup:0, impatto:0.2, note:'Mercato estero specifico' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini stagionali a voce', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Registro ordini e campionature su Excel strutturato', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Google Sheet con template moda', costo_mensile:0, costo_setup:100, impatto:0.6, note:'Template stagionale, gestione manuale' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline automatica, reminder follow-up' },
        ]},
      ]},
      '3': { cosa:'CRM per gestione campagne vendita e riordini', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'crm_moda', nome:'CRM specifico moda (Zedonk, Fashion Cloud)', costo_mensile:80, costo_setup:300, impatto:1.0, note:'Gestione campagne, ordini, riordini stagionali' },
          { id:'crm_gen', nome:'CRM generico (Pipedrive, HubSpot)', costo_mensile:50, costo_setup:200, impatto:0.75, note:'Piu flessibile, meno specifico moda' },
        ]},
      ]},
      '4': { cosa:'CRM + gestionale — capacita produttiva e tempi consegna', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Gestionale moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'erp_moda', nome:'Gestionale moda (Tex Design, Lectra)', costo_mensile:400, costo_setup:1500, impatto:1.0, note:'Taglie/colori, pianificazione, capacita' },
          { id:'erp_gen', nome:'Gestionale generico adattato', costo_mensile:250, costo_setup:800, impatto:0.7, note:'Meno specifico ma piu economico' },
        ]},
      ]},
      '5': { cosa:'ERP moda — dalla campagna vendita alla produzione alla spedizione', tempo_mesi:3, moduli:[
        { id:'erp', nome:'ERP moda integrato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'erp_full', nome:'ERP moda enterprise (Centric PLM, Infor Fashion)', costo_mensile:900, costo_setup:5000, impatto:1.0, note:'End-to-end: design - produzione - spedizione' },
          { id:'erp_mid', nome:'ERP moda mid-range (Tex Design, Esse Solutions)', costo_mensile:500, costo_setup:3000, impatto:0.75, note:'Buon compromesso costi/funzioni' },
        ]},
        { id:'b2b_ordini', nome:'Portale ordini B2B per agenti', tipo:'flag', obbligatorio:false, costo_mensile:100, costo_setup:500, impatto:0.15, note:'Agenti inseriscono ordini da tablet' },
      ]},
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Ruoli sartoria definiti — taglio, cucitura, stiro, confezionamento', tempo_mesi:1, moduli:[
        { id:'organigramma', nome:'Definizione ruoli e flussi sartoria', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7 },
        { id:'turni', nome:'Pianificazione turni per campionario', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:0, impatto:0.15, note:'Priorita campionario vs produzione serie' },
      ]},
      '3': { cosa:'Responsabile produzione/campionario dedicato', tempo_mesi:2, moduli:[
        { id:'resp_prod', nome:'Resp. produzione campionari', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione interna primo/a sarto/a', costo_mensile:200, costo_setup:500, impatto:0.85, note:'Gia conosce i processi, bonus responsabilita' },
          { id:'esterno', nome:'Resp. produzione esterno esperto moda', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Esperienza da altre aziende moda' },
        ]},
      ]},
      '4': { cosa:'KPI produzione + pianificazione stagionale strutturata', tempo_mesi:3, moduli:[
        { id:'kpi', nome:'Sistema KPI produzione moda', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Tempi per capo, scarti, rispetto delivery' },
        { id:'pianificazione', nome:'Pianificazione stagionale (capacity planning)', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.3, note:'Calendario campagne vendita - produzione - consegna' },
        { id:'consulente', nome:'Consulente organizzativo moda', tipo:'flag', obbligatorio:false, costo_mensile:400, costo_setup:0, impatto:0.2 },
      ]},
      '5': { cosa:'Management completo — titolare solo strategia e relazioni', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Figura manageriale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Direttore operativo dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Full-time, gestione quotidiana sartoria' },
          { id:'fractional', nome:'Manager operativo fractional', costo_mensile:1500, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
      ]},
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — si cuce e si spedisce', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Scheda tecnica per capo — taglie, materiali, tempi, costi', tempo_mesi:1, moduli:[
        { id:'scheda_tec', nome:'Scheda tecnica standardizzata', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Template per ogni capo: distinta base, tempi, costi' },
        { id:'foto_prod', nome:'Foto standardizzata campionario', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:150, impatto:0.15 },
      ]},
      '3': { cosa:'Gestionale taglie/colori con pianificazione produzione', tempo_mesi:2, moduli:[
        { id:'gestionale_prod', nome:'Gestionale produzione moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Software moda (Tex Design, Datatex)', costo_mensile:400, costo_setup:1500, impatto:1.0, note:'Taglie/colori, distinta base, avanzamento' },
          { id:'generico', nome:'Gestionale generico + Excel taglie', costo_mensile:200, costo_setup:500, impatto:0.65, note:'Piu semplice, meno integrato' },
        ]},
      ]},
      '4': { cosa:'Controllo qualita AQL + compliance etichettatura UE', tempo_mesi:3, moduli:[
        { id:'aql', nome:'Sistema controllo qualita AQL', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.5, note:'Ispezione a campione su ogni lotto' },
        { id:'compliance', nome:'Compliance etichettatura (reg. UE 1007/2011)', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.3, note:'Composizione, origine, cura — obbligatorio per vendita UE' },
        { id:'consulente_qa', nome:'Consulente qualita tessile', tipo:'flag', obbligatorio:false, costo_mensile:300, costo_setup:0, impatto:0.2 },
      ]},
      '5': { cosa:'Tracciabilita filiera completa + certificazioni sostenibilita', tempo_mesi:4, moduli:[
        { id:'tracciabilita', nome:'Sistema tracciabilita filiera', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'blockchain', nome:'Piattaforma blockchain/digitale (TextileGenesis)', costo_mensile:500, costo_setup:3000, impatto:1.0, note:'Tracciabilita dalla fibra al capo finito' },
          { id:'documentale', nome:'Tracciabilita documentale tradizionale', costo_mensile:200, costo_setup:1000, impatto:0.65, note:'Certificati cartacei/PDF per ogni lotto' },
        ]},
        { id:'cert_sostenibilita', nome:'Certificazioni sostenibilita', tipo:'multi', obbligatorio:false, min:1, varianti:[
          { id:'gots', nome:'GOTS (Global Organic Textile Standard)', costo_mensile:100, costo_setup:3000, impatto:0.15, note:'Per fibre organiche — richiesto dai brand premium' },
          { id:'oeko', nome:'OEKO-TEX Standard 100', costo_mensile:50, costo_setup:1500, impatto:0.1, note:'Test sostanze nocive — base per mercato UE' },
          { id:'grs', nome:'GRS (Global Recycled Standard)', costo_mensile:80, costo_setup:2000, impatto:0.1, note:'Per materiali riciclati' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzi a capo fissi — margini bassi su grandi volumi', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Calcolo costo reale per capo — tessuto, lavorazione, finiture', tempo_mesi:1, moduli:[
        { id:'costing', nome:'Sistema costing per capo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Foglio costo per capo strutturato', costo_mensile:0, costo_setup:0, impatto:0.7, note:'Tessuto + lavorazione + accessori + margine' },
          { id:'software', nome:'Software costing moda', costo_mensile:100, costo_setup:300, impatto:1.0, note:'Calcolo automatico da distinta base' },
        ]},
      ]},
      '3': { cosa:'Differenziazione prezzo per complessita e metratura minima', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Listino differenziato per complessita', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Prezzo diverso per jersey vs tessuto vs capo destrutturato' },
        { id:'moq', nome:'Policy metratura/quantita minima', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:0, impatto:0.15, note:'No ordini sotto X pezzi per colore/taglia' },
      ]},
      '4': { cosa:'Private label come servizio premium — margini 30-40% superiori', tempo_mesi:2, moduli:[
        { id:'private_label', nome:'Servizio private label', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Etichetta del cliente, produzione tua — margini superiori' },
        { id:'prototipazione', nome:'Servizio prototipazione rapida', tipo:'flag', obbligatorio:false, costo_mensile:300, costo_setup:0, impatto:0.15, note:'Prototipi in 5-7 giorni — valore aggiunto per brand' },
      ]},
      '5': { cosa:'Collezioni proprie o co-branded + revenue da sviluppo prototipi', tempo_mesi:3, moduli:[
        { id:'collezione', nome:'Collezione propria/co-branded', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'propria', nome:'Linea propria con brand', costo_mensile:500, costo_setup:2000, impatto:1.0, note:'Design, produzione e vendita diretta — margine massimo' },
          { id:'cobranded', nome:'Capsule co-branded con clienti', costo_mensile:300, costo_setup:1000, impatto:0.7, note:'Collaborazione con brand per collezioni speciali' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo contatti nel distretto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Instagram con foto capi e produzione + LinkedIn B2B', tempo_mesi:1, moduli:[
        { id:'social', nome:'Presenza social', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'interno', nome:'Gestione interna (titolare/dipendente)', costo_mensile:0, costo_setup:0, impatto:0.5, note:'Foto con smartphone, post settimanali' },
          { id:'freelance', nome:'Social media manager moda freelance', costo_mensile:300, costo_setup:0, impatto:1.0, note:'Contenuti professionali, styling, reels' },
        ]},
        { id:'linkedin', nome:'LinkedIn aziendale B2B', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:0, impatto:0.15, note:'Per buyer e brand' },
      ]},
      '3': { cosa:'Fiere moda — stand con campionari', tempo_mesi:2, moduli:[
        { id:'fiere', nome:'Partecipazione fiere moda', tipo:'multi', obbligatorio:true, min:1, varianti:[
          { id:'premiere', nome:'Premiere Vision (Parigi)', costo_mensile:400, costo_setup:4000, impatto:0.4, note:'La piu importante per tessuti e conto terzi' },
          { id:'white', nome:'White Milano', costo_mensile:300, costo_setup:3000, impatto:0.3, note:'Focus brand emergenti e contemporary' },
          { id:'pitti', nome:'Pitti Uomo/Filati', costo_mensile:300, costo_setup:3000, impatto:0.3, note:'Focus menswear e filati' },
        ]},
      ]},
      '4': { cosa:'Campagne digitali verso buyer brand e catene retail', tempo_mesi:2, moduli:[
        { id:'adv', nome:'Advertising B2B moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia_moda', nome:'Agenzia digital specializzata moda', costo_mensile:1000, costo_setup:1500, impatto:1.0, note:'LinkedIn Ads + Instagram B2B + content per buyer' },
          { id:'inhouse', nome:'Advertising in-house', costo_mensile:400, costo_setup:500, impatto:0.55, note:'Solo budget ads + Canva, gestione interna' },
        ]},
        { id:'pr', nome:'PR e ufficio stampa moda', tipo:'flag', obbligatorio:false, costo_mensile:300, costo_setup:0, impatto:0.2, note:'Comunicati, press day, relazioni con riviste trade' },
      ]},
      '5': { cosa:'Piano marketing completo — fiere + lookbook + PR + influencer B2B', tempo_mesi:3, moduli:[
        { id:'mkt_mgr', nome:'Marketing manager moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Marketing/comunicazione dipendente', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Full-time, gestisce fiere + digital + PR' },
          { id:'fractional', nome:'Marketing manager fractional moda', costo_mensile:1200, costo_setup:0, impatto:0.65, note:'2 giorni/settimana + fiere' },
        ]},
        { id:'lookbook_pro', nome:'Lookbook/catalogo professionale stagionale', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:3000, impatto:0.15, note:'Shooting, styling, layout — 2 volte/anno' },
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o sito datato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito con portfolio capi, capacita e certificazioni', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito web', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'template', nome:'Sito da template moda (Squarespace, WordPress)', costo_mensile:30, costo_setup:500, impatto:0.7, note:'Veloce, belle gallery, economico' },
          { id:'custom', nome:'Sito custom web agency moda', costo_mensile:80, costo_setup:1500, impatto:1.0, note:'Design su misura, forte impatto visivo' },
        ]},
      ]},
      '3': { cosa:'Lookbook digitale stagionale + richiesta campioni online', tempo_mesi:2, moduli:[
        { id:'lookbook_dig', nome:'Lookbook digitale interattivo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'platform', nome:'Piattaforma lookbook (Issuu, FlipHTML5)', costo_mensile:100, costo_setup:1000, impatto:0.8, note:'Sfogliabile online, embed sul sito' },
          { id:'custom', nome:'Lookbook custom integrato nel sito', costo_mensile:200, costo_setup:2500, impatto:1.0, note:'Design coerente, richiesta campioni integrata' },
        ]},
        { id:'campioni_form', nome:'Form richiesta campioni online', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Buyer richiedono campioni direttamente dal sito' },
      ]},
      '4': { cosa:'Area B2B — catalogo taglie/colori, disponibilita, ordini campioni', tempo_mesi:2, moduli:[
        { id:'b2b_area', nome:'Area riservata B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'piattaforma', nome:'Piattaforma B2B moda (Joor, NuOrder, Fashion Cloud)', costo_mensile:400, costo_setup:2000, impatto:1.0, note:'Standard di settore per ordini wholesale' },
          { id:'custom', nome:'Area B2B custom sul sito', costo_mensile:300, costo_setup:4000, impatto:0.8, note:'Piu personalizzabile ma piu costoso setup' },
        ]},
      ]},
      '5': { cosa:'Portale B2B con ordini, tracking produzione, documenti', tempo_mesi:3, moduli:[
        { id:'portale', nome:'Portale B2B integrato con ERP', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:5000, impatto:0.7, note:'Ordini, stato produzione, DDT, fatture' },
        { id:'virtual_showroom', nome:'Virtual showroom 3D/360', tipo:'flag', obbligatorio:false, costo_mensile:300, costo_setup:3000, impatto:0.2, note:'Campionario virtuale navigabile' },
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento tessuti',
      '1': { chi:'Titolare', cosa:'Acquisto tessuti dal solito fornitore — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Mappatura fornitori tessuti — confronto prezzi e MOQ', tempo_mesi:1, moduli:[
        { id:'mappatura', nome:'Database fornitori tessuti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda per ogni fornitore: prezzi, MOQ, tempi, specialita' },
        { id:'fiere_tessuti', nome:'Visita fiere tessuti (Premiere Vision Fabrics)', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Scouting nuovi fornitori e tendenze' },
      ]},
      '3': { cosa:'3-4 fornitori attivi + acquisto tessuti a stock per reattivita', tempo_mesi:2, moduli:[
        { id:'stock', nome:'Strategia stock tessuti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'stock_proprio', nome:'Magazzino tessuti proprio', costo_mensile:500, costo_setup:300, impatto:1.0, note:'Acquisti anticipati su previsione — reattivita 48h' },
          { id:'accordi_riserva', nome:'Accordi riserva con fornitori', costo_mensile:200, costo_setup:0, impatto:0.7, note:'Tessuti in conto deposito o con prelazione' },
        ]},
      ]},
      '4': { cosa:'Buyer tessuti dedicato — negoziazione, import diretto', tempo_mesi:3, moduli:[
        { id:'buyer', nome:'Buyer tessuti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer tessuti dipendente', costo_mensile:2000, costo_setup:0, impatto:1.0, note:'Full-time, fiere, negoziazione, import' },
          { id:'freelance', nome:'Buyer freelance/agente acquisti', costo_mensile:1000, costo_setup:0, impatto:0.7, note:'A progetto/stagione, rete fornitori propria' },
        ]},
        { id:'import', nome:'Import diretto (Turchia, Portogallo, Far East)', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Tagliare intermediari, margini migliori' },
      ]},
      '5': { cosa:'Sourcing internazionale strutturato + contratti quadro', tempo_mesi:4, moduli:[
        { id:'sourcing', nome:'Sourcing manager', tipo:'flag', obbligatorio:true, costo_mensile:3000, costo_setup:0, impatto:0.5, note:'Gestione fornitori internazionali, qualita, compliance' },
        { id:'contratti_quadro', nome:'Contratti quadro annuali con fornitori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1000, impatto:0.3, note:'Prezzi bloccati, volumi garantiti, priorita produzione' },
        { id:'hedging', nome:'Hedging prezzi materie prime', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.1, note:'Protezione da oscillazioni cotone/poliestere' },
      ]},
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SERVIZI IT
  // ═══════════════════════════════════════════════════════════════════════════
  servizi_it: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Solo il titolare vende — assistenza e vendita insieme', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Mappatura PMI zona con IT datato — visite e demo dirette', tempo_mesi:1, moduli:[
        { id:'mappatura', nome:'Database PMI target zona', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Lista PMI 10-50 dip con infrastruttura >5 anni' },
        { id:'trasferte', nome:'Budget trasferte visite e demo', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.4, note:'Visite on-site con assessment gratuito' },
      ]},
      '3': { cosa:'Account manager dedicato — sviluppa portafoglio e rinnovi', tempo_mesi:3, moduli:[
        { id:'account', nome:'Account manager', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Account manager dipendente', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Lordo azienda, gestione portafoglio + new business' },
          { id:'agente', nome:'Agente IT ENASARCO', costo_mensile:1500, costo_setup:0, impatto:0.7, note:'Provvigioni su nuovi contratti + rinnovi' },
          { id:'parttime', nome:'Commerciale part-time', costo_mensile:1200, costo_setup:0, impatto:0.5, note:'20h/sett, focus rinnovi e upsell' },
        ]},
        { id:'crm_comm', nome:'CRM commerciale dedicato', tipo:'flag', obbligatorio:false, costo_mensile:50, costo_setup:500, impatto:0.1, note:'Pipeline, scadenze contratti, forecast' },
      ]},
      '4': { cosa:'Account + tecnico pre-sales per gare e clienti strutturati', tempo_mesi:3, moduli:[
        { id:'account', nome:'Account manager senior', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Account manager dipendente', costo_mensile:2800, costo_setup:0, impatto:0.5, note:'Gestione clienti top + gare' },
          { id:'agente', nome:'Agente IT senior', costo_mensile:1800, costo_setup:0, impatto:0.35, note:'Rete propria, clienti strutturati' },
        ]},
        { id:'presales', nome:'Tecnico pre-sales', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip_presales', nome:'Pre-sales engineer dipendente', costo_mensile:2500, costo_setup:0, impatto:0.4, note:'Demo, POC, risposte a bandi' },
          { id:'freelance_presales', nome:'Pre-sales freelance a progetto', costo_mensile:1500, costo_setup:0, impatto:0.25, note:'Solo su gare specifiche' },
        ]},
      ]},
      '5': { cosa:'Sales manager + account per verticale + business developer', tempo_mesi:6, moduli:[
        { id:'sales_mgr', nome:'Sales manager', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Sales manager dipendente', costo_mensile:3500, costo_setup:0, impatto:0.45, note:'Coordinamento team, KPI, forecast' },
          { id:'fractional', nome:'Sales director fractional', costo_mensile:2000, costo_setup:0, impatto:0.3, note:'2-3 giorni/settimana + review mensile' },
        ]},
        { id:'team_vendita', nome:'Team commerciale', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'account_vert', nome:'Account per verticale (PA, sanita, manifatturiero)', costo_mensile:2500, costo_setup:0, impatto:0.2, note:'Specialista di settore' },
          { id:'biz_dev', nome:'Business developer new logo', costo_mensile:2000, costo_setup:0, impatto:0.15, note:'Solo acquisizione nuovi clienti' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ticket e vendite confusi insieme', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel trattative aperte + scadenze contratti esistenti', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Tracciamento pipeline', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Google Sheet con template MSP', costo_mensile:0, costo_setup:0, impatto:0.6, note:'Pipeline + scadenze contratti' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free)', costo_mensile:0, costo_setup:100, impatto:0.85, note:'Pipeline + reminder rinnovi' },
        ]},
      ]},
      '3': { cosa:'CRM con pipeline + alert scadenza contratti', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM per MSP/IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'crm_msp', nome:'CRM specifico MSP (ConnectWise Sell, Datto Commerce)', costo_mensile:80, costo_setup:300, impatto:1.0, note:'Pipeline + quoting + scadenze integrato' },
          { id:'crm_gen', nome:'CRM generico (Pipedrive, HubSpot Starter)', costo_mensile:50, costo_setup:200, impatto:0.75, note:'Piu flessibile, meno specifico IT' },
        ]},
      ]},
      '4': { cosa:'CRM integrato con ticketing — visione dal contratto al supporto', tempo_mesi:2, moduli:[
        { id:'integrazione', nome:'CRM + Ticketing integrato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'connectwise', nome:'ConnectWise suite (Sell + Manage)', costo_mensile:300, costo_setup:1000, impatto:1.0, note:'Nativo MSP, tutto integrato' },
          { id:'mix', nome:'CRM + ticketing separati con integrazione', costo_mensile:200, costo_setup:800, impatto:0.8, note:'Es. HubSpot + Freshdesk via Zapier' },
        ]},
      ]},
      '5': { cosa:'CRM + PSA (Professional Services Automation) completo', tempo_mesi:3, moduli:[
        { id:'psa', nome:'Piattaforma PSA', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'psa_full', nome:'PSA enterprise (ConnectWise, Autotask/Datto)', costo_mensile:500, costo_setup:2000, impatto:1.0, note:'Progetto + tempo + fatturazione + ticketing' },
          { id:'psa_light', nome:'PSA leggera (HaloPSA, Atera)', costo_mensile:300, costo_setup:1000, impatto:0.75, note:'Piu economica, meno integrazioni native' },
        ]},
        { id:'forecast', nome:'Forecast MRR/ARR automatico', tipo:'flag', obbligatorio:false, costo_mensile:100, costo_setup:500, impatto:0.15, note:'Dashboard ricavi ricorrenti da CRM' },
      ]},
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Tutto dipende dal titolare — nessuna delega', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Knowledge base interna — know-how non dipende da una persona', tempo_mesi:1, moduli:[
        { id:'kb', nome:'Knowledge base documentata', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'wiki', nome:'Wiki interna (Notion, Confluence)', costo_mensile:0, costo_setup:300, impatto:0.85, note:'Procedure, configurazioni, troubleshooting' },
          { id:'docs', nome:'Documentazione su cartelle condivise', costo_mensile:0, costo_setup:100, impatto:0.6, note:'Google Drive/SharePoint strutturato' },
        ]},
      ]},
      '3': { cosa:'Ruoli definiti per specializzazione (cloud, security, network)', tempo_mesi:2, moduli:[
        { id:'specializzazione', nome:'Definizione ruoli e specializzazioni', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6 },
        { id:'certificazioni', nome:'Piano certificazioni tecniche', tipo:'flag', obbligatorio:false, costo_mensile:200, costo_setup:500, impatto:0.25, note:'Microsoft, Cisco, AWS — budget annuo per esami' },
      ]},
      '4': { cosa:'Team lead tecnici con delega decisionale', tempo_mesi:3, moduli:[
        { id:'team_lead', nome:'Team lead tecnico', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione interna tecnico senior', costo_mensile:300, costo_setup:500, impatto:0.85, note:'Bonus responsabilita + formazione leadership' },
          { id:'esterno', nome:'Technical manager esterno', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Esperienza da MSP piu strutturato' },
        ]},
        { id:'kpi_tecnici', nome:'KPI per team (SLA, tempo risoluzione, CSAT)', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15 },
      ]},
      '5': { cosa:'Governance completa — titolare solo strategia e relazioni', tempo_mesi:6, moduli:[
        { id:'cto', nome:'CTO / Direttore tecnico', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'CTO dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Full-time, architettura + team + vendor' },
          { id:'fractional', nome:'CTO fractional', costo_mensile:1500, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana + on-call' },
        ]},
      ]},
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — si risponde quando il cliente chiama', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Contratti di servizio standard — SLA, tempi risposta, escalation', tempo_mesi:1, moduli:[
        { id:'sla', nome:'Template SLA e contratti assistenza', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Livelli di servizio, tempi risposta, penali' },
        { id:'onboarding', nome:'Procedura onboarding nuovo cliente', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:100, impatto:0.15 },
      ]},
      '3': { cosa:'Sistema ticketing per gestione richieste strutturata', tempo_mesi:1, moduli:[
        { id:'ticketing', nome:'Piattaforma ticketing', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'freshdesk', nome:'Freshdesk / Zendesk', costo_mensile:60, costo_setup:300, impatto:0.85, note:'SaaS, facile, buon rapporto costi' },
          { id:'connectwise', nome:'ConnectWise Manage', costo_mensile:100, costo_setup:500, impatto:1.0, note:'Specifico MSP, piu completo' },
          { id:'open', nome:'Ticketing open source (osTicket, Zammad)', costo_mensile:0, costo_setup:500, impatto:0.6, note:'Gratis ma serve manutenzione' },
        ]},
      ]},
      '4': { cosa:'Monitoraggio proattivo — avvisare il cliente prima del problema', tempo_mesi:2, moduli:[
        { id:'rmm', nome:'Piattaforma RMM (Remote Monitoring)', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'rmm_pro', nome:'RMM professionale (Datto RMM, ConnectWise Automate)', costo_mensile:400, costo_setup:1000, impatto:1.0, note:'Monitoraggio + patch + automazione alert' },
          { id:'rmm_light', nome:'RMM leggero (NinjaRMM, Atera)', costo_mensile:200, costo_setup:500, impatto:0.75, note:'Piu economico, meno automazione' },
        ]},
        { id:'backup_monitoring', nome:'Monitoraggio backup proattivo', tipo:'flag', obbligatorio:false, costo_mensile:100, costo_setup:200, impatto:0.15 },
      ]},
      '5': { cosa:'ISO 27001 + procedure incident response + audit periodici', tempo_mesi:4, moduli:[
        { id:'iso27001', nome:'Certificazione ISO 27001', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:5000, impatto:0.5, note:'Security management — differenzia dai concorrenti' },
        { id:'incident', nome:'Procedura incident response documentata', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.2 },
        { id:'audit', nome:'Audit interni periodici', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'interno', nome:'Audit interni con checklist', costo_mensile:0, costo_setup:300, impatto:0.15, note:'Trimestrale, autogestito' },
          { id:'esterno', nome:'Audit esterno annuale', costo_mensile:200, costo_setup:0, impatto:0.25, note:'Consulente sicurezza, piu credibile' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Interventi a chiamata — fatturato imprevedibile', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Contratti manutenzione mensili — stabilizza il ricavo', tempo_mesi:1, moduli:[
        { id:'contratti_mnt', nome:'Template contratti manutenzione', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Da intervento a chiamata a canone fisso — MRR' },
        { id:'listino', nome:'Listino servizi strutturato', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:0, impatto:0.15, note:'Prezzo chiaro per ogni tipo di intervento' },
      ]},
      '3': { cosa:'Upsell cloud — migrazione M365/Azure per recurring revenue', tempo_mesi:2, moduli:[
        { id:'cloud', nome:'Offerta cloud/CSP', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'m365', nome:'Microsoft 365 + Azure CSP', costo_mensile:200, costo_setup:500, impatto:1.0, note:'Margine 15-20% su licenze + servizi migrazione' },
          { id:'google', nome:'Google Workspace', costo_mensile:100, costo_setup:300, impatto:0.7, note:'Alternativa per clienti non-Microsoft' },
        ]},
      ]},
      '4': { cosa:'Divisione cybersecurity — servizi ad alto margine', tempo_mesi:3, moduli:[
        { id:'cyber', nome:'Servizio cybersecurity', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'soc_proprio', nome:'SOC/servizi gestiti internamente', costo_mensile:800, costo_setup:1500, impatto:1.0, note:'Vulnerability assessment, firewall gestiti, EDR' },
          { id:'soc_partner', nome:'SOC in partnership (white label)', costo_mensile:400, costo_setup:500, impatto:0.7, note:'Rivendi servizi SOC di un partner, meno investimento' },
        ]},
      ]},
      '5': { cosa:'MSSP (Managed Security Services Provider) — ricorrente margini >50%', tempo_mesi:4, moduli:[
        { id:'mssp', nome:'Piattaforma MSSP', tipo:'flag', obbligatorio:true, costo_mensile:1000, costo_setup:2000, impatto:0.6, note:'SIEM, SOC 24/7, incident response — margini altissimi' },
        { id:'compliance', nome:'Servizio compliance (GDPR, NIS2)', tipo:'flag', obbligatorio:false, costo_mensile:300, costo_setup:500, impatto:0.2, note:'Consulenza + tool — molto richiesto da PMI' },
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola tra clienti', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Google My Business + referenze su portali IT locali', tempo_mesi:1, moduli:[
        { id:'gmb', nome:'Google My Business ottimizzato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5 },
        { id:'referenze', nome:'Referenze su portali (Clutch, GoodFirms)', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:0, impatto:0.2 },
        { id:'linkedin', nome:'LinkedIn aziendale con case study', tipo:'flag', obbligatorio:false, costo_mensile:100, costo_setup:0, impatto:0.2 },
      ]},
      '3': { cosa:'Partnership vendor — lead da directory Microsoft/Cisco', tempo_mesi:2, moduli:[
        { id:'partnership', nome:'Partnership vendor', tipo:'multi', obbligatorio:true, min:1, varianti:[
          { id:'microsoft', nome:'Microsoft Partner Network (Silver/Gold)', costo_mensile:200, costo_setup:500, impatto:0.4, note:'Lead da directory, co-selling, fondi marketing' },
          { id:'cisco', nome:'Cisco Partner Program', costo_mensile:100, costo_setup:300, impatto:0.25, note:'Deal registration, lead, formazione' },
          { id:'altri', nome:'Altri vendor (Fortinet, Sophos, VMware)', costo_mensile:100, costo_setup:200, impatto:0.2, note:'Lead e co-marketing' },
        ]},
      ]},
      '4': { cosa:'Content marketing su cybersecurity e cloud per PMI', tempo_mesi:2, moduli:[
        { id:'content', nome:'Content marketing IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia content B2B specializzata IT', costo_mensile:800, costo_setup:1000, impatto:1.0, note:'Blog + white paper + webinar su cyber/cloud' },
          { id:'inhouse', nome:'Content in-house (tecnico che scrive)', costo_mensile:300, costo_setup:500, impatto:0.6, note:'Il tecnico migliore scrive 2 post/mese' },
        ]},
        { id:'webinar', nome:'Webinar mensile per PMI', tipo:'flag', obbligatorio:false, costo_mensile:100, costo_setup:300, impatto:0.15, note:'Lead generation + posizionamento esperto' },
      ]},
      '5': { cosa:'Account based marketing sulle 100 PMI target della zona', tempo_mesi:3, moduli:[
        { id:'abm', nome:'Account Based Marketing', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia_abm', nome:'Agenzia ABM specializzata', costo_mensile:2000, costo_setup:2000, impatto:1.0, note:'Targeting, personalizzazione, nurturing su top 100 PMI' },
          { id:'inhouse_abm', nome:'ABM in-house con tool', costo_mensile:800, costo_setup:1000, impatto:0.6, note:'LinkedIn Sales Navigator + email personalizzate' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o sito datato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito con servizi, certificazioni e case study PMI', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito web IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'template', nome:'Sito da template IT (WordPress/Starter)', costo_mensile:30, costo_setup:500, impatto:0.7, note:'Template settore IT, veloce da lanciare' },
          { id:'custom', nome:'Sito custom web agency', costo_mensile:80, costo_setup:1500, impatto:1.0, note:'Design professionale, case study integrati' },
        ]},
      ]},
      '3': { cosa:'Blog tecnico su cybersecurity e digital transformation', tempo_mesi:2, moduli:[
        { id:'blog', nome:'Blog tecnico', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:500, impatto:0.6, note:'2-4 articoli/mese su trend IT per PMI' },
        { id:'seo', nome:'SEO locale IT', tipo:'flag', obbligatorio:false, costo_mensile:200, costo_setup:500, impatto:0.2, note:'Keyword: assistenza informatica + citta, cybersecurity PMI' },
      ]},
      '4': { cosa:'Assessment tool online — quanto e sicura la tua infrastruttura', tempo_mesi:2, moduli:[
        { id:'assessment', nome:'Tool assessment online', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Assessment custom (sviluppo ad hoc)', costo_mensile:200, costo_setup:3000, impatto:1.0, note:'Quiz interattivo - report - contatto commerciale' },
          { id:'saas', nome:'Tool SaaS assessment (Typeform + automazione)', costo_mensile:100, costo_setup:500, impatto:0.7, note:'Piu semplice, meno personalizzabile' },
        ]},
      ]},
      '5': { cosa:'Portale clienti con dashboard servizi, SLA e ticket', tempo_mesi:3, moduli:[
        { id:'portale', nome:'Portale clienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'integrato', nome:'Portale integrato con PSA (ConnectWise, Autotask)', costo_mensile:500, costo_setup:3000, impatto:1.0, note:'Dashboard SLA, ticket, fatture, asset' },
          { id:'custom', nome:'Portale custom (sviluppo interno)', costo_mensile:300, costo_setup:5000, impatto:0.8, note:'Piu flessibile ma costoso da mantenere' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento IT + Licensing',
      '1': { chi:'Titolare', cosa:'Acquisto HW e licenze dal solito distributore', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Accordi con 2-3 distributori — confronto prezzi', tempo_mesi:1, moduli:[
        { id:'distributori', nome:'Network distributori', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'ingram', nome:'Ingram Micro', costo_mensile:0, costo_setup:0, impatto:0.35, note:'Leader, catalogo vastissimo' },
          { id:'esprinet', nome:'Esprinet', costo_mensile:0, costo_setup:0, impatto:0.3, note:'Forte in Italia, buon supporto' },
          { id:'td_synnex', nome:'TD Synnex', costo_mensile:0, costo_setup:0, impatto:0.25, note:'Focus enterprise e cloud' },
        ]},
      ]},
      '3': { cosa:'CSP Microsoft attivo — rivendita licenze con margine', tempo_mesi:2, moduli:[
        { id:'csp', nome:'Programma CSP', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'csp_diretto', nome:'CSP diretto Microsoft', costo_mensile:100, costo_setup:500, impatto:1.0, note:'Margine pieno, gestione diretta clienti' },
          { id:'csp_indiretto', nome:'CSP indiretto (via distributore)', costo_mensile:50, costo_setup:200, impatto:0.7, note:'Meno margine, piu semplice da gestire' },
        ]},
      ]},
      '4': { cosa:'Buyer IT dedicato + accordi volume con vendor', tempo_mesi:2, moduli:[
        { id:'buyer', nome:'Buyer IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer IT dipendente', costo_mensile:2000, costo_setup:0, impatto:1.0, note:'Negoziazione, confronto prezzi, stock' },
          { id:'parttime', nome:'Buyer part-time/admin con delega', costo_mensile:800, costo_setup:0, impatto:0.65, note:'Admin che gestisce anche acquisti' },
        ]},
      ]},
      '5': { cosa:'Strategia licensing + portale rivendita + contratti quadro', tempo_mesi:4, moduli:[
        { id:'licensing_mgr', nome:'Licensing manager', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:0, impatto:0.4, note:'Ottimizzazione licensing clienti = revenue ricorrente' },
        { id:'portale_rivend', nome:'Portale rivendita licenze/servizi', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:2000, impatto:0.35, note:'Clienti acquistano licenze in self-service' },
        { id:'contratti_vendor', nome:'Contratti quadro vendor (Microsoft, Cisco, Fortinet)', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Sconti volume, rebate, co-marketing' },
      ]},
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SERVIZI FORMAZIONE
  // ═══════════════════════════════════════════════════════════════════════════
  servizi_formazione: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare/formatore vende i propri corsi — nessun commerciale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Proposta proattiva verso HR e resp. formazione aziende zona', tempo_mesi:1, moduli:[
        { id:'mappatura', nome:'Database aziende target', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Lista HR manager e resp. formazione PMI zona' },
        { id:'trasferte', nome:'Visite e presentazioni dirette', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.4, note:'Visite aziendali con presentazione catalogo e demo' },
      ]},
      '3': { cosa:'Commerciale dedicato — sviluppo clienti corporate e enti', tempo_mesi:3, moduli:[
        { id:'commerciale', nome:'Figura commerciale formazione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Commerciale dipendente', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Lordo azienda, visite HR + risposta bandi' },
          { id:'agente', nome:'Agente formazione ENASARCO', costo_mensile:1500, costo_setup:0, impatto:0.7, note:'Provvigioni su contratti chiusi + ENASARCO' },
          { id:'segnalatore', nome:'Rete segnalatori (consulenti lavoro, commercialisti)', costo_mensile:500, costo_setup:500, impatto:0.5, note:'Fee su segnalazioni convertite' },
        ]},
      ]},
      '4': { cosa:'Team vendite — corporate + PA/bandi + catalogo interaziendale', tempo_mesi:3, moduli:[
        { id:'resp', nome:'Responsabile sviluppo business', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2800, costo_setup:0, impatto:0.5, note:'Coordina commerciali, gestisce key account' },
          { id:'fractional', nome:'Business developer fractional', costo_mensile:1500, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
        { id:'team', nome:'Commerciali', tipo:'multi', obbligatorio:true, min:1, varianti:[
          { id:'corporate', nome:'Commerciale corporate', costo_mensile:2200, costo_setup:0, impatto:0.2, note:'Aziende private, piani formativi annuali' },
          { id:'bandi', nome:'Specialista bandi/PA', costo_mensile:1800, costo_setup:0, impatto:0.15, note:'Fondi interprofessionali, bandi regionali, PNRR' },
        ]},
      ]},
      '5': { cosa:'Rete segnalatori + partnership consulenti + key account', tempo_mesi:6, moduli:[
        { id:'dir_comm', nome:'Direttore commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale dipendente', costo_mensile:3500, costo_setup:0, impatto:0.45, note:'Strategia + team + partnership' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1800, costo_setup:0, impatto:0.3, note:'3 giorni/settimana' },
        ]},
        { id:'rete', nome:'Rete commerciale', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'commerciale', nome:'Commerciale corporate', costo_mensile:2200, costo_setup:0, impatto:0.15, note:'Vendita diretta a imprese' },
          { id:'partner', nome:'Partnership con consulenti/studi', costo_mensile:500, costo_setup:500, impatto:0.1, note:'Commercialisti, consulenti lavoro come segnalatori' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — corsi venduti a richiesta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con aziende contattate e proposte inviate', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Tracciamento pipeline', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Google Sheet con template formazione', costo_mensile:0, costo_setup:0, impatto:0.6, note:'Aziende, contatti HR, proposte, follow-up' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free)', costo_mensile:0, costo_setup:100, impatto:0.85, note:'Pipeline + reminder automatici' },
        ]},
      ]},
      '3': { cosa:'CRM per pipeline corporate + scadenze fondi interprofessionali', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM formazione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'crm_formazione', nome:'CRM con modulo formazione (Salesforce, Zoho)', costo_mensile:80, costo_setup:300, impatto:1.0, note:'Pipeline + scadenze fondi + gestione piani formativi' },
          { id:'crm_light', nome:'CRM leggero (Pipedrive)', costo_mensile:50, costo_setup:200, impatto:0.75, note:'Solo pipeline, scadenze manuali' },
        ]},
      ]},
      '4': {
        cosa: 'CRM + gestione bandi e fondi (Fondimpresa, Fondirigenti)',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM + gestione bandi e fondi (Fondimpresa, Fondirigenti)', costo_mensile:500, costo_setup:1500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:250, costo_setup:900, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'CRM integrato con LMS e fatturazione — ciclo completo',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM integrato con LMS e fatturazione', costo_mensile:1200, costo_setup:4000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:600, costo_setup:2400, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Titolare fa tutto — nessuna organizzazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Catalogo corsi strutturato con programmi e prezzi definiti', tempo_mesi:1, moduli:[
        { id:'catalogo', nome:'Catalogo corsi formalizzato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.7, note:'Schede corso: obiettivi, programma, durata, prezzo, docente' },
        { id:'template_prop', nome:'Template proposta formativa', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:100, impatto:0.15, note:'Proposta brandizzata per le aziende' },
      ]},
      '3': { cosa:'Coordinamento rete formatori freelance', tempo_mesi:2, moduli:[
        { id:'coordinamento', nome:'Coordinamento docenti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'interno', nome:'Coordinatore interno (titolare + admin)', costo_mensile:200, costo_setup:500, impatto:0.8, note:'Agenda docenti, assegnazione corsi, feedback' },
          { id:'tutor', nome:'Tutor didattico dedicato', costo_mensile:1500, costo_setup:0, impatto:1.0, note:'Figura dedicata al coordinamento docenti e qualita' },
        ]},
      ]},
      '4': { cosa:'KPI per formatore + pianificazione didattica annuale', tempo_mesi:3, moduli:[
        { id:'kpi', nome:'Sistema KPI formatori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Valutazione partecipanti, repeat rate, NPS' },
        { id:'pianificazione', nome:'Pianificazione didattica annuale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.3, note:'Calendario corsi, assegnazione docenti, aule' },
      ]},
      '5': { cosa:'Governance didattica completa — titolare solo strategia', tempo_mesi:5, moduli:[
        { id:'direttore', nome:'Direttore academy', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Direttore academy dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Full-time: docenti, qualita, innovazione didattica' },
          { id:'fractional', nome:'Direttore didattico fractional', costo_mensile:1500, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana + supervisione' },
        ]},
      ]},
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni corso è improvvisato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Programmi corsi standard con materiali e durate definite', tempo_mesi:1, moduli:[
        { id:'programmi', nome:'Standardizzazione programmi corsi', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.7, note:'Slide, esercitazioni, test — replicabili da qualsiasi docente' },
        { id:'valutazione', nome:'Questionario valutazione fine corso', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:100, impatto:0.15, note:'Customer satisfaction + NPS' },
      ]},
      '3': { cosa:'Processo iscrizione + materiali + valutazione apprendimento', tempo_mesi:2, moduli:[
        { id:'gestione', nome:'Sistema gestione corsi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'saas', nome:'Piattaforma gestione corsi SaaS (Eventbrite Pro, Arlo)', costo_mensile:150, costo_setup:300, impatto:1.0, note:'Iscrizioni, pagamenti, attestati automatici' },
          { id:'manuale', nome:'Gestione manuale strutturata (form + email)', costo_mensile:0, costo_setup:500, impatto:0.6, note:'Google Form + email automatiche + Excel' },
        ]},
      ]},
      '4': {
        cosa: 'LMS per e-learning + blended learning strutturato',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'processo',
            nome: 'LMS per e-learning',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:800, costo_setup:3000, impatto:1, note:'LMS per e-learning + blended learning strutturato' },
              { id:'base', nome:'Soluzione base', costo_mensile:400, costo_setup:1500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Certificazione qualità (ISO 21001) + accreditamento regionale',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'Certificazione qualità (ISO 21001)',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:1500, costo_setup:8000, impatto:1, note:'Certificazione qualità (ISO 21001) + accreditamento regionale' },
              { id:'base', nome:'Soluzione base', costo_mensile:750, costo_setup:4000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Corsi a giornata — fatturato a singhiozzo', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pacchetti formativi annuali — ricavo prevedibile', tempo_mesi:1, moduli:[
        { id:'pacchetti', nome:'Offerta pacchetti annuali alle aziende', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Da corsi singoli a piani formativi annuali — MRR' },
        { id:'listino', nome:'Listino servizi con prezzi chiari', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:0, impatto:0.15, note:'Prezzo per giornata, per modulo, per partecipante' },
      ]},
      '3': { cosa:'Formazione finanziata — fondi interprofessionali come leva', tempo_mesi:2, moduli:[
        { id:'fondi', nome:'Gestione fondi interprofessionali', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'interno', nome:'Gestione interna fondi (Fondimpresa, Fondirigenti)', costo_mensile:300, costo_setup:500, impatto:0.85, note:'Il cliente paga zero, i fondi coprono il costo' },
          { id:'partner', nome:'Partnership con ente accreditato', costo_mensile:100, costo_setup:300, impatto:1.0, note:'Ente gestisce pratiche, tu eroghi' },
        ]},
      ]},
      '4': {
        cosa: 'E-learning a catalogo — ricavo passivo da corsi registrati',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'E-learning a catalogo',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1000, costo_setup:3000, impatto:1, note:'E-learning a catalogo — ricavo passivo da corsi registrati' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:500, costo_setup:1500, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Academy aziendale white-label per grandi clienti — margini premium',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Academy aziendale white-label per grandi clienti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:2000, costo_setup:5000, impatto:1, note:'Academy aziendale white-label per grandi clienti — margini premium' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:1000, costo_setup:2500, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola e contatti personali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'LinkedIn personale del titolare + profilo aziendale', tempo_mesi:1, moduli:[
        { id:'linkedin', nome:'Presenza LinkedIn', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'personale', nome:'LinkedIn personale del titolare (post settimanali)', costo_mensile:0, costo_setup:0, impatto:0.7, note:'Il formatore come thought leader' },
          { id:'ghostwriter', nome:'Ghostwriter LinkedIn', costo_mensile:300, costo_setup:0, impatto:1.0, note:'2-3 post/sett professionali + engagement' },
        ]},
      ]},
      '3': { cosa:'Webinar gratuiti come lead generation + newsletter', tempo_mesi:2, moduli:[
        { id:'webinar', nome:'Webinar lead generation', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:300, impatto:0.6, note:'1-2 webinar/mese gratuiti su temi caldi — lead capture' },
        { id:'newsletter', nome:'Newsletter mensile formazione', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:200, impatto:0.3, note:'Mailchimp/Brevo, nurturing su database HR' },
      ]},
      '4': {
        cosa: 'Campagne LinkedIn Ads verso HR e responsabili formazione',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'marketing',
            nome: 'Campagne LinkedIn Ads verso HR e responsabili formazione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1000, costo_setup:1500, impatto:1, note:'Campagne LinkedIn Ads verso HR e responsabili formazione' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:400, costo_setup:750, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piano marketing — eventi + content + partnership + PR',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:2500, costo_setup:3000, impatto:1, note:'Piano marketing — eventi + content + partnership + PR' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:1000, costo_setup:1500, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina personale datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito con catalogo corsi, formatori e testimonianze', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito web formazione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'template', nome:'Sito da template (WordPress Education)', costo_mensile:30, costo_setup:500, impatto:0.7, note:'Template settore formazione, veloce' },
          { id:'custom', nome:'Sito custom web agency', costo_mensile:100, costo_setup:1500, impatto:1.0, note:'Design professionale, catalogo interattivo' },
        ]},
      ]},
      '3': {
        cosa: 'Iscrizione online + pagamento + calendario corsi',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Iscrizione online',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:350, costo_setup:3000, impatto:1, note:'Iscrizione online + pagamento + calendario corsi' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:140, costo_setup:1200, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Area riservata con materiali, attestati e storico formazione',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Area riservata con materiali, attestati e storico formazione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:800, costo_setup:5000, impatto:1, note:'Area riservata con materiali, attestati e storico formazione' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:320, costo_setup:2000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma e-learning integrata con e-commerce corsi',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma e-learning integrata con e-commerce corsi',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:2000, costo_setup:12000, impatto:1, note:'Piattaforma e-learning integrata con e-commerce corsi' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:800, costo_setup:4800, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Nessun approvvigionamento strutturato di contenuti/docenti', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Rete di 3-5 formatori freelance con tariffe concordate', tempo_mesi:1, moduli:[
        { id:'rete_docenti', nome:'Costruzione rete docenti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda per ogni docente: competenze, tariffa, disponibilita, feedback' },
        { id:'contratti_docenti', nome:'Contratti standard collaborazione', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Template contratto, NDA, cessione diritti contenuti' },
      ]},
      '3': { cosa:'Accordi con enti certificatori + materiali didattici', tempo_mesi:2, moduli:[
        { id:'certificatori', nome:'Partnership enti certificatori', tipo:'multi', obbligatorio:true, min:1, varianti:[
          { id:'ente_sicurezza', nome:'Ente sicurezza lavoro (D.Lgs 81/08)', costo_mensile:100, costo_setup:300, impatto:0.35, note:'Corsi obbligatori — domanda garantita' },
          { id:'ente_it', nome:'Ente certificazioni IT (EIPASS, ICDL)', costo_mensile:100, costo_setup:200, impatto:0.25, note:'Certificazioni informatiche riconosciute' },
          { id:'ente_lingua', nome:'Ente certificazioni linguistiche', costo_mensile:100, costo_setup:200, impatto:0.2, note:'Cambridge, DELF, Goethe — domanda costante' },
        ]},
      ]},
      '4': {
        cosa: 'Partnership piattaforme + videomaker per contenuti e-learning',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'canale',
            nome: 'Partnership piattaforme + videomaker per contenuti e-learning',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1500, costo_setup:3000, impatto:1, note:'Partnership piattaforme + videomaker per contenuti e-learning' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:750, costo_setup:1200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. contenuti + rete 15+ docenti + studio produzione video',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. contenuti + rete 15+ docenti + studio produzione video',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:3500, costo_setup:6000, impatto:1, note:'Resp. contenuti + rete 15+ docenti + studio produzione video' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1750, costo_setup:2400, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento docenti e contenuti',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EDILIZIA RESIDENZIALE
  // ═══════════════════════════════════════════════════════════════════════════
  edilizia_residenziale: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare trova lavori tramite passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Rapporti strutturati con geometri e architetti della zona', tempo_mesi:1, moduli:[
        { id:'rete_tecnici', nome:'Network studi tecnici', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.6, note:'Database geometri/architetti zona, visite periodiche' },
        { id:'trasferte', nome:'Pranzi/eventi con professionisti', tipo:'flag', obbligatorio:true, costo_mensile:150, costo_setup:0, impatto:0.3, note:'Relazione diretta, passaparola qualificato' },
      ]},
      '3': { cosa:'Preventivi professionali + sopralluoghi proattivi', tempo_mesi:2, moduli:[
        { id:'preventivazione', nome:'Sistema preventivazione professionale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'software', nome:'Software computo metrico (PriMus, STR)', costo_mensile:100, costo_setup:300, impatto:1.0, note:'Preventivi dettagliati, professionali, veloci' },
          { id:'template', nome:'Template Excel strutturato', costo_mensile:0, costo_setup:200, impatto:0.6, note:'Manuale ma professionale' },
        ]},
        { id:'sopralluoghi', nome:'Sopralluoghi proattivi condomini', tipo:'flag', obbligatorio:false, costo_mensile:200, costo_setup:0, impatto:0.2, note:'Visita condomini zona per proposte manutenzione' },
      ]},
      '4': { cosa:'Commerciale dedicato condomini/studi tecnici/enti', tempo_mesi:3, moduli:[
        { id:'commerciale', nome:'Figura commerciale edilizia', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Commerciale dipendente', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Visite studi, condomini, imprese, enti pubblici' },
          { id:'agente', nome:'Procacciatore di affari', costo_mensile:1200, costo_setup:0, impatto:0.7, note:'Fee su lavori acquisiti, rete propria' },
          { id:'segnalatore', nome:'Rete segnalatori (amministratori, geometri)', costo_mensile:500, costo_setup:300, impatto:0.5, note:'Fee su segnalazioni convertite' },
        ]},
      ]},
      '5': { cosa:'Gare pubbliche SOA + rete segnalatori strutturata', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Responsabile sviluppo business', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:3000, costo_setup:0, impatto:0.5, note:'Gare, studi tecnici, enti, condomini' },
          { id:'fractional', nome:'Business developer fractional', costo_mensile:1500, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana, focus gare' },
        ]},
        { id:'gare', nome:'Specialista gare pubbliche', tipo:'flag', obbligatorio:false, costo_mensile:500, costo_setup:1000, impatto:0.2, note:'Preparazione documentazione, MEPA, qualificazione SOA' },
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — preventivi fatti e dimenticati', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Registro preventivi e sopralluoghi su Excel', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Tracciamento preventivi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Google Sheet con template cantieri', costo_mensile:0, costo_setup:0, impatto:0.6, note:'Preventivo, importo, stato, follow-up' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free)', costo_mensile:0, costo_setup:100, impatto:0.85, note:'Pipeline automatica + reminder' },
        ]},
      ]},
      '3': { cosa:'CRM per gestire preventivi, cantieri e referenze', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM edilizia', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'crm_edile', nome:'CRM specifico edilizia (Edilconnect, Buildertrend)', costo_mensile:50, costo_setup:200, impatto:1.0, note:'Pipeline + cantieri + referenze' },
          { id:'crm_gen', nome:'CRM generico (Pipedrive)', costo_mensile:30, costo_setup:100, impatto:0.7, note:'Piu semplice, meno specifico' },
        ]},
      ]},
      '4': { cosa:'CRM + gestionale cantieri — margini, avanzamento, SAL', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Gestionale cantiere', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Software cantiere (STR Vision, TeamSystem CPM)', costo_mensile:300, costo_setup:1200, impatto:1.0, note:'SAL, avanzamento, margini, contabilita cantiere' },
          { id:'generico', nome:'Gestionale generico + Excel cantiere', costo_mensile:150, costo_setup:500, impatto:0.65, note:'Meno integrato, piu manuale' },
        ]},
      ]},
      '5': { cosa:'ERP edile — preventivazione, contabilita cantiere, fatturazione', tempo_mesi:3, moduli:[
        { id:'erp', nome:'ERP edile integrato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'erp_full', nome:'ERP edile completo (TeamSystem CPM, STR Vision)', costo_mensile:600, costo_setup:3000, impatto:1.0, note:'End-to-end: preventivo - cantiere - fattura' },
          { id:'erp_cloud', nome:'ERP cloud edile (Edilconnect Pro)', costo_mensile:350, costo_setup:1500, impatto:0.75, note:'Piu leggero, accessibile da cantiere' },
        ]},
      ]},
    },
    team: {
      _label: 'Organizzazione',
      '1': { chi:'Titolare', cosa:'Titolare sempre in cantiere — decide tutto al momento', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Capo cantiere autonomo — il titolare esce dal cantiere', tempo_mesi:1, moduli:[
        { id:'capo_cantiere', nome:'Capo cantiere con delega', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione operaio senior a capo cantiere', costo_mensile:0, costo_setup:300, impatto:0.85, note:'Bonus responsabilita + formazione sicurezza' },
          { id:'esterno', nome:'Assunzione capo cantiere esperto', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Esperienza da altre imprese' },
        ]},
      ]},
      '3': { cosa:'Ruoli definiti cantiere/ufficio — deleghe operative', tempo_mesi:2, moduli:[
        { id:'ruoli', nome:'Organigramma cantiere/ufficio', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.5 },
        { id:'admin', nome:'Figura amministrativa/segreteria', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Segretaria/admin dipendente', costo_mensile:1500, costo_setup:0, impatto:0.35, note:'Preventivi, fatture, documenti, telefono' },
          { id:'parttime', nome:'Admin part-time', costo_mensile:800, costo_setup:0, impatto:0.2, note:'3 mattine/settimana' },
        ]},
      ]},
      '4': { cosa:'KPI per commessa + processi decisionali delegati', tempo_mesi:3, moduli:[
        { id:'kpi', nome:'Sistema KPI per cantiere', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Margine per cantiere, tempi vs preventivo, scarti' },
        { id:'riunione', nome:'Riunione settimanale cantieri', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.2 },
        { id:'consulente', nome:'Consulente organizzativo edile', tipo:'flag', obbligatorio:false, costo_mensile:400, costo_setup:500, impatto:0.25 },
      ]},
      '5': { cosa:'Management — titolare solo strategia e clienti top', tempo_mesi:5, moduli:[
        { id:'direttore', nome:'Direttore tecnico/operativo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Direttore tecnico dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Gestione quotidiana cantieri, personale, sicurezza' },
          { id:'fractional', nome:'Direttore tecnico fractional', costo_mensile:1500, costo_setup:0, impatto:0.65, note:'3 giorni/settimana + reperibilita' },
        ]},
      ]},
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni cantiere e diverso', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Computo metrico standard + template preventivo professionale', tempo_mesi:1, moduli:[
        { id:'computo', nome:'Software computo metrico', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'primus', nome:'PriMus (ACCA Software)', costo_mensile:0, costo_setup:300, impatto:1.0, note:'Standard italiano, aggiornamento prezziari' },
          { id:'excel', nome:'Template Excel strutturato', costo_mensile:0, costo_setup:100, impatto:0.6, note:'Manuale ma funzionale per piccoli lavori' },
        ]},
      ]},
      '3': { cosa:'Gestionale cantiere — pianificazione lavori e controllo costi', tempo_mesi:2, moduli:[
        { id:'gestionale_cantiere', nome:'Software gestione cantiere', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Gestionale cantiere (Regolo, Cantieri+)', costo_mensile:200, costo_setup:800, impatto:1.0, note:'Gantt, avanzamento, contabilita lavori' },
          { id:'project', nome:'Project management generico (Monday, Asana)', costo_mensile:100, costo_setup:300, impatto:0.65, note:'Meno specifico ma piu versatile' },
        ]},
      ]},
      '4': { cosa:'Gestione bonus fiscali — pratiche, asseverazioni, cessioni', tempo_mesi:2, moduli:[
        { id:'bonus', nome:'Gestione bonus edilizi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'interno', nome:'Gestione interna con software (ACCA, Blumatica)', costo_mensile:200, costo_setup:500, impatto:0.85, note:'APE, asseverazioni, pratica ENEA' },
          { id:'studio', nome:'Partnership con studio tecnico', costo_mensile:0, costo_setup:500, impatto:1.0, note:'Lo studio fa le pratiche, tu porti i lavori' },
        ]},
      ]},
      '5': { cosa:'Certificazione SOA + sistema qualita cantiere', tempo_mesi:4, moduli:[
        { id:'soa', nome:'Qualificazione SOA', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:4000, impatto:0.5, note:'Accesso gare pubbliche, credibilita' },
        { id:'iso', nome:'Certificazione ISO 9001', tipo:'flag', obbligatorio:false, costo_mensile:100, costo_setup:3000, impatto:0.2, note:'Sistema qualita — punti extra nelle gare' },
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzi al ribasso per prendere i lavori — margini minimi', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Calcolo costi reali per cantiere — materiali, ore, subappalti', tempo_mesi:1, moduli:[
        { id:'costing', nome:'Sistema calcolo costi cantiere', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'software', nome:'Software analisi costi (STR, PriMus)', costo_mensile:0, costo_setup:0, impatto:1.0, note:'Costo reale per lavorazione: materiale + ore + sub' },
          { id:'excel', nome:'Foglio costi strutturato', costo_mensile:0, costo_setup:0, impatto:0.6, note:'Template per analisi margini per cantiere' },
        ]},
      ]},
      '3': { cosa:'Preventivi con voci separate — upsell su finiture e varianti', tempo_mesi:1, moduli:[
        { id:'upsell', nome:'Strategia upsell finiture', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.6, note:'Pacchetti standard/premium/luxury per finiture' },
        { id:'varianti', nome:'Gestione varianti in corso opera', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:100, impatto:0.15, note:'Template per varianti con approvazione scritta' },
      ]},
      '4': { cosa:'Contratti manutenzione post-cantiere — ricavo ricorrente', tempo_mesi:2, moduli:[
        { id:'manutenzione', nome:'Programma manutenzione post-lavori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Contratto annuale per manutenzione ordinaria' },
        { id:'admin_cond', nome:'Servizio per amministratori condominio', tipo:'flag', obbligatorio:false, costo_mensile:200, costo_setup:0, impatto:0.15, note:'Manutenzione programmata condomini — lavori ricorrenti' },
      ]},
      '5': { cosa:'General contractor — gestione completa con margine su subappalti', tempo_mesi:3, moduli:[
        { id:'gc', nome:'Modello general contractor', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'full', nome:'GC completo (progetto + esecuzione + pratiche)', costo_mensile:500, costo_setup:1000, impatto:1.0, note:'Chiavi in mano — margine 15-25% su tutto' },
          { id:'partial', nome:'GC parziale (solo coordinamento lavori)', costo_mensile:200, costo_setup:500, impatto:0.65, note:'Coordini i sub, il cliente gestisce il progetto' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola nel quartiere', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Google My Business + foto cantieri prima/dopo + recensioni', tempo_mesi:1, moduli:[
        { id:'gmb', nome:'Google My Business ottimizzato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Foto prima/dopo, risposte recensioni, post settimanali' },
        { id:'recensioni', nome:'Strategia raccolta recensioni', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:0, impatto:0.15, note:'Richiesta sistematica a fine lavoro' },
      ]},
      '3': { cosa:'Presenza su portali ristrutturazione + social', tempo_mesi:2, moduli:[
        { id:'portali', nome:'Portali ristrutturazione', tipo:'multi', obbligatorio:true, min:1, varianti:[
          { id:'houzz', nome:'Houzz Italia', costo_mensile:150, costo_setup:200, impatto:0.35, note:'Portfolio, contatti qualificati' },
          { id:'habitissimo', nome:'Habitissimo', costo_mensile:100, costo_setup:0, impatto:0.25, note:'Richieste preventivo dirette' },
          { id:'instapro', nome:'Instapro', costo_mensile:100, costo_setup:0, impatto:0.2, note:'Lead locali' },
        ]},
      ]},
      '4': { cosa:'Google Ads locali + campagne social prima/dopo', tempo_mesi:2, moduli:[
        { id:'adv', nome:'Advertising locale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia digital locale', costo_mensile:600, costo_setup:800, impatto:1.0, note:'Google Ads + Meta Ads + remarketing locale' },
          { id:'inhouse', nome:'Google Ads in-house', costo_mensile:300, costo_setup:400, impatto:0.6, note:'Solo Google Ads, gestione interna' },
        ]},
      ]},
      '5': { cosa:'Piano marketing — portfolio, partnership architetti, eventi', tempo_mesi:3, moduli:[
        { id:'mkt_mgr', nome:'Referente marketing', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing edile', costo_mensile:1500, costo_setup:1500, impatto:1.0, note:'Portfolio + ads + eventi + PR locale' },
          { id:'freelance', nome:'Marketing freelance', costo_mensile:800, costo_setup:500, impatto:0.65, note:'Social + content + ads, 2-3 giorni/sett' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito — solo pagina Facebook', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito con portfolio lavori, servizi e zona operativa', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito web edile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'template', nome:'Sito da template (WordPress/Wix)', costo_mensile:30, costo_setup:400, impatto:0.7, note:'Gallery cantieri, servizi, contatti' },
          { id:'custom', nome:'Sito custom con fotografo', costo_mensile:80, costo_setup:1200, impatto:1.0, note:'Design su misura, foto professionali' },
        ]},
      ]},
      '3': { cosa:'Gallery prima/dopo + richiesta preventivo online', tempo_mesi:2, moduli:[
        { id:'gallery', nome:'Gallery interattiva prima/dopo', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:800, impatto:0.6, note:'Slider comparativo per ogni lavoro' },
        { id:'form_prev', nome:'Form preventivo strutturato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.25, note:'Tipo lavoro, metratura, budget — lead qualificati' },
      ]},
      '4': { cosa:'Blog su bonus fiscali e ristrutturazione + SEO locale', tempo_mesi:2, moduli:[
        { id:'blog', nome:'Blog bonus/ristrutturazione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'copywriter', nome:'Content con copywriter specializzato', costo_mensile:400, costo_setup:500, impatto:1.0, note:'2-4 articoli/mese su bonus, tendenze, consigli' },
          { id:'interno', nome:'Blog autogestito', costo_mensile:0, costo_setup:300, impatto:0.5, note:'Il titolare scrive 1 articolo/mese' },
        ]},
      ]},
      '5': { cosa:'Configuratore preventivo online per ristrutturazioni standard', tempo_mesi:3, moduli:[
        { id:'configuratore', nome:'Configuratore preventivo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Configuratore custom (sviluppo ad hoc)', costo_mensile:300, costo_setup:4000, impatto:1.0, note:'Il cliente configura la ristrutturazione e ha un prezzo indicativo' },
          { id:'saas', nome:'Tool SaaS (Typeform + logica prezzi)', costo_mensile:100, costo_setup:1000, impatto:0.65, note:'Piu semplice, meno preciso' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento materiali e subappalti',
      '1': { chi:'Titolare', cosa:'Acquisto materiali dal solito magazzino edile', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto prezzi tra 2-3 fornitori per ogni cantiere', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database fornitori materiali', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda per fornitore: prezzi, tempi, affidabilita, MOQ' },
      ]},
      '3': { cosa:'Accordi quadro con fornitori materiali — prezzi riservati', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro fornitori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Prezzi bloccati con 2-3 magazzini edili principali' },
        { id:'online', nome:'Acquisti online materiali (ManoMano Pro, Wurth)', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:0, impatto:0.15, note:'Confronto prezzi e consegna in cantiere' },
      ]},
      '4': { cosa:'Rete subappaltatori qualificati con tariffe concordate', tempo_mesi:2, moduli:[
        { id:'sub', nome:'Albo subappaltatori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Database sub: elettricista, idraulico, cartongessista — qualificati' },
        { id:'contratti_sub', nome:'Contratti quadro subappalto', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.25, note:'Tariffe concordate, tempi garantiti, penali' },
      ]},
      '5': { cosa:'Responsabile acquisti — negoziazione volumi, stoccaggio', tempo_mesi:4, moduli:[
        { id:'buyer', nome:'Responsabile acquisti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer edile dipendente', costo_mensile:2000, costo_setup:0, impatto:1.0, note:'Negoziazione, logistica cantiere, controllo qualita materiali' },
          { id:'parttime', nome:'Buyer part-time/admin con delega', costo_mensile:800, costo_setup:0, impatto:0.6, note:'Gestisce ordini e confronto prezzi' },
        ]},
      ]},
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EDILIZIA IMPIANTI
  // ═══════════════════════════════════════════════════════════════════════════
  edilizia_impianti: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare trova lavori tramite passaparola e imprese edili', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Rapporti strutturati con amministratori condominio e studi tecnici', tempo_mesi:1, moduli:[
        { id:'rete', nome:'Network amministratori e studi tecnici', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.6, note:'Database amministratori condomini, studi ingegneria, imprese edili zona' },
        { id:'trasferte', nome:'Visite e pranzi con professionisti', tipo:'flag', obbligatorio:true, costo_mensile:150, costo_setup:0, impatto:0.3, note:'Relazione diretta, passaparola qualificato su manutenzioni' },
      ]},
      '3': { cosa:'Preventivi dettagliati + proposta efficientamento su ogni sopralluogo', tempo_mesi:2, moduli:[
        { id:'preventivazione', nome:'Sistema preventivazione impianti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'software', nome:'Software computo metrico impiantistico (Primus/Acca)', costo_mensile:80, costo_setup:300, impatto:1.0, note:'Preventivi dettagliati con computo materiali e manodopera' },
          { id:'template', nome:'Template Excel strutturato', costo_mensile:0, costo_setup:150, impatto:0.6, note:'Manuale ma organizzato per tipologia impianto' },
        ]},
        { id:'efficientamento', nome:'Proposta efficientamento energetico', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.2, note:'Scheda risparmio energetico + bonus fiscali su ogni sopralluogo' },
      ]},
      '4': { cosa:'Commerciale dedicato condomini/industria/PA', tempo_mesi:3, moduli:[
        { id:'commerciale', nome:'Figura commerciale impiantistica', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Commerciale dipendente', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Visita amministratori, studi, aziende, enti pubblici' },
          { id:'agente', nome:'Procacciatore di affari', costo_mensile:1200, costo_setup:0, impatto:0.7, note:'Fee su commesse acquisite, rete propria nel territorio' },
          { id:'parttime', nome:'Commerciale part-time', costo_mensile:1100, costo_setup:0, impatto:0.5, note:'20h/settimana, focus condomini e PMI' },
        ]},
      ]},
      '5': { cosa:'Rete installatori partner + gare pubbliche MEPA', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Responsabile sviluppo business', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:3000, costo_setup:0, impatto:0.5, note:'Gare MEPA, contratti quadro PA, grandi condomini, industria' },
          { id:'fractional', nome:'Business developer fractional', costo_mensile:1500, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana, focus gare e grandi commesse' },
        ]},
        { id:'gare', nome:'Specialista gare pubbliche', tipo:'flag', obbligatorio:false, costo_mensile:500, costo_setup:1000, impatto:0.2, note:'Preparazione documentazione MEPA, qualificazione, bandi' },
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — chiamate e preventivi a memoria', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con preventivi, impianti installati, scadenze manutenzione', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Fogli Google strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Template con colonne: cliente, impianto, stato, scadenza manutenzione' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free/Zoho)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline base + reminder scadenze' },
        ]},
      ]},
      '3': { cosa:'CRM con gestione contratti manutenzione e scadenze', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM impiantistica', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'CRM settore impianti (Syncro/Wello)', costo_mensile:50, costo_setup:300, impatto:1.0, note:'Gestione interventi, manutenzioni programmate, storico impianti' },
          { id:'generico', nome:'CRM generico (Pipedrive/HubSpot)', costo_mensile:30, costo_setup:200, impatto:0.7, note:'Buono per vendite, meno per gestione interventi tecnici' },
        ]},
      ]},
      '4': { cosa:'Gestionale interventi — programmazione, consuntivo, margini', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Gestionale interventi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'erp_imp', nome:'Gestionale impiantistica (Perfetto/Syncro Pro)', costo_mensile:250, costo_setup:1200, impatto:1.0, note:'Programmazione interventi, materiali, ore, consuntivo automatico' },
          { id:'project', nome:'Project management + CRM (Monday/Asana + CRM)', costo_mensile:150, costo_setup:600, impatto:0.7, note:'Piu flessibile, meno specifico per impiantistica' },
        ]},
      ]},
      '5': { cosa:'ERP impiantistica — preventivi, commesse, magazzino, fatturazione', tempo_mesi:3, moduli:[
        { id:'erp', nome:'ERP impiantistica', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'ERP specifico (Perfetto/ThermoPlan)', costo_mensile:500, costo_setup:3000, impatto:1.0, note:'Preventivi tecnici, commesse, magazzino ricambi, fatturazione elettronica' },
          { id:'modulare', nome:'ERP generico + modulo commesse (Fatture in Cloud + Asana)', costo_mensile:250, costo_setup:1500, impatto:0.65, note:'Meno integrato ma piu economico' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Titolare sugli impianti — decide tutto al momento', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Capo squadra autonomo su installazioni e manutenzioni', tempo_mesi:1, moduli:[
        { id:'caposquadra', nome:'Capo squadra', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione interna operaio esperto', costo_mensile:0, costo_setup:300, impatto:1.0, note:'Gia in organico, formazione su gestione squadra e rapporto cliente' },
          { id:'esterno', nome:'Assunzione capo squadra esterno', costo_mensile:300, costo_setup:500, impatto:0.8, note:'Delta costo rispetto a operaio, porta esperienza da fuori' },
        ]},
      ]},
      '3': { cosa:'Ruoli definiti: installazione, manutenzione, ufficio tecnico', tempo_mesi:2, moduli:[
        { id:'admin', nome:'Segreteria/amministrazione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Impiegata amministrativa', costo_mensile:1800, costo_setup:0, impatto:0.7, note:'Fatture, DDT, rapportini, gestione clienti' },
          { id:'parttime', nome:'Segretaria part-time', costo_mensile:900, costo_setup:0, impatto:0.5, note:'4h/giorno, gestione base' },
        ]},
        { id:'organigramma', nome:'Organigramma e mansionario', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Chi fa cosa: installazione, manutenzione, pronto intervento, ufficio' },
      ]},
      '4': { cosa:'Responsabile tecnico + KPI per squadra', tempo_mesi:3, moduli:[
        { id:'resp_tecnico', nome:'Responsabile tecnico', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Direttore tecnico dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Supervisione tecnica, preventivi complessi, rapporti PA' },
          { id:'fractional', nome:'Direttore tecnico fractional', costo_mensile:1500, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana, focus progetti complessi' },
        ]},
        { id:'kpi', nome:'Dashboard KPI squadre', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Interventi/giorno, tempo medio, tasso richiamo, margine per commessa' },
      ]},
      '5': { cosa:'Management completo — deleghe operative totali al titolare', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Direttore operativo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Operations manager dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Gestione totale: squadre, materiali, clienti, programmazione' },
          { id:'fractional', nome:'Operations manager fractional', costo_mensile:1800, costo_setup:0, impatto:0.65, note:'3 giorni/settimana, il titolare si dedica a sviluppo business' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni impianto gestito a esperienza', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Scheda impianto standard — specifiche, materiali, tempi, costi', tempo_mesi:1, moduli:[
        { id:'scheda', nome:'Scheda intervento standard', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Template per tipo impianto: materiali, ore stimate, margine target' },
        { id:'checklist', nome:'Checklist sicurezza cantiere', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.2, note:'DPI, verifiche pre-intervento, documentazione obbligatoria' },
      ]},
      '3': { cosa:'Gestionale interventi + programmazione manutenzioni ricorrenti', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Software gestione interventi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Gestionale impiantistica (Syncro/ThermoClick)', costo_mensile:200, costo_setup:800, impatto:1.0, note:'Programmazione manutenzioni, rapportini digitali, storico impianti' },
          { id:'generico', nome:'Project management (Asana/Monday)', costo_mensile:100, costo_setup:400, impatto:0.6, note:'Gestione task e scadenze, meno specifico per impiantistica' },
        ]},
      ]},
      '4': { cosa:'Certificazioni DM 37/08 strutturate + sicurezza cantiere', tempo_mesi:2, moduli:[
        { id:'certificazioni', nome:'Gestione certificazioni DM 37/08', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'digitale', nome:'Software certificazioni (CerTus/Blumatica)', costo_mensile:100, costo_setup:500, impatto:1.0, note:'DiCo, DiRi, libretti impianto digitali, scadenze automatiche' },
          { id:'manuale', nome:'Gestione manuale strutturata', costo_mensile:0, costo_setup:300, impatto:0.6, note:'Template Word/PDF, archivio ordinato, reminder manuali' },
        ]},
        { id:'sicurezza', nome:'Piano sicurezza cantiere strutturato', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'POS, DUVRI, formazione periodica squadre' },
      ]},
      '5': { cosa:'ISO 9001 + gestione garanzie + audit qualita impianti', tempo_mesi:4, moduli:[
        { id:'iso', nome:'Certificazione ISO 9001', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'consulente', nome:'ISO con consulente + ente certificatore', costo_mensile:200, costo_setup:5000, impatto:1.0, note:'Certificazione completa, prerequisito per gare PA sopra soglia' },
          { id:'interno', nome:'Sistema qualita interno (senza certificazione)', costo_mensile:0, costo_setup:1500, impatto:0.5, note:'Processi documentati ma senza ente terzo' },
        ]},
        { id:'garanzie', nome:'Gestione garanzie impianti', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.15, note:'Registro garanzie, scadenze, richiami proattivi pre-scadenza' },
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Installazione a prezzo fisso — nessun ricavo ricorrente', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Calcolo costi reali per tipo di intervento', tempo_mesi:1, moduli:[
        { id:'costing', nome:'Sistema calcolo costi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'software', nome:'Foglio costi per tipo impianto (Excel avanzato)', costo_mensile:0, costo_setup:200, impatto:0.8, note:'Materiali, ore, spostamenti, margine per tipologia intervento' },
          { id:'erp', nome:'Modulo costing da gestionale', costo_mensile:50, costo_setup:300, impatto:1.0, note:'Consuntivo automatico da rapportini e DDT' },
        ]},
      ]},
      '3': { cosa:'Contratti manutenzione annuali — caldaie, clima, impianti elettrici', tempo_mesi:1, moduli:[
        { id:'manutenzione', nome:'Contratti manutenzione programmata', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8, note:'Contratti annuali/biennali per caldaie, condizionatori, impianti elettrici' },
        { id:'pricing', nome:'Listino manutenzioni per tipologia', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.15, note:'Prezzi standard per manutenzione ordinaria/straordinaria per tipo impianto' },
      ]},
      '4': { cosa:'Upsell efficientamento energetico + bonus fiscali come leva', tempo_mesi:2, moduli:[
        { id:'efficientamento', nome:'Pacchetti efficientamento energetico', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.7, note:'Proposta sostituzione caldaia, pompa di calore, fotovoltaico con analisi risparmio' },
        { id:'bonus', nome:'Servizio pratiche bonus fiscali', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'interno', nome:'Gestione interna pratiche', costo_mensile:0, costo_setup:500, impatto:0.2, note:'Formazione su Ecobonus, Conto Termico, detrazioni 50%' },
          { id:'partner', nome:'Partnership con studio tecnico', costo_mensile:0, costo_setup:200, impatto:0.15, note:'Lo studio gestisce pratiche, voi portate il cliente' },
        ]},
      ]},
      '5': { cosa:'Contratti full-service condomini e industria — ricavo garantito', tempo_mesi:3, moduli:[
        { id:'fullservice', nome:'Contratti full-service', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'Global service condomini/industria', costo_mensile:500, costo_setup:1500, impatto:1.0, note:'Manutenzione totale impianti, pronto intervento, ricambio programmato' },
          { id:'parziale', nome:'Contratti manutenzione estesi', costo_mensile:200, costo_setup:500, impatto:0.6, note:'Manutenzione programmata + pronto intervento, senza global service' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Google My Business + foto impianti realizzati + recensioni', tempo_mesi:1, moduli:[
        { id:'gmb', nome:'Google My Business ottimizzato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.6, note:'Scheda completa, foto prima/dopo impianti, risposte recensioni' },
        { id:'recensioni', nome:'Sistema raccolta recensioni', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Richiesta recensione post-intervento via WhatsApp/email' },
      ]},
      '3': { cosa:'Portali locali + partnership con imprese edili', tempo_mesi:2, moduli:[
        { id:'portali', nome:'Portali settore (Instapro/PagineGialle/Edilportale)', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.5, note:'Profilo premium, preventivi online, zona coperta' },
        { id:'partnership', nome:'Partnership imprese edili', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.3, note:'Accordi con costruttori e ristrutturatori per subappalto impianti' },
      ]},
      '4': { cosa:'Google Ads locali su manutenzione e efficientamento', tempo_mesi:2, moduli:[
        { id:'ads', nome:'Campagne Google Ads', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Gestione ads con agenzia', costo_mensile:600, costo_setup:500, impatto:1.0, note:'Campagne local su "caldaista zona", "manutenzione condizionatori", "impianto fotovoltaico"' },
          { id:'interno', nome:'Ads autogestiti', costo_mensile:300, costo_setup:200, impatto:0.5, note:'Budget ads diretto, gestione interna con formazione base' },
        ]},
      ]},
      '5': { cosa:'Piano marketing completo — referenze, partnership costruttori, eventi', tempo_mesi:3, moduli:[
        { id:'piano', nome:'Piano marketing strutturato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing specializzata edilizia', costo_mensile:1500, costo_setup:2000, impatto:1.0, note:'Strategia completa: SEO, ads, social, eventi, partnership' },
          { id:'freelance', nome:'Freelance marketing + tool', costo_mensile:800, costo_setup:500, impatto:0.6, note:'1 professionista, focus su lead generation e contenuti' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina social base', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito vetrina con servizi, zona operativa, foto impianti', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito vetrina impiantistica', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom WordPress/Starter', costo_mensile:30, costo_setup:1500, impatto:1.0, note:'Design personalizzato, gallery lavori, form contatto' },
          { id:'template', nome:'Sito da template (Wix/Jimdo)', costo_mensile:20, costo_setup:500, impatto:0.6, note:'Veloce da lanciare, meno personalizzabile' },
        ]},
      ]},
      '3': { cosa:'Portfolio impianti realizzati + form preventivo online', tempo_mesi:2, moduli:[
        { id:'portfolio', nome:'Gallery impianti prima/dopo', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Foto e descrizione lavori per tipologia: idraulico, elettrico, clima' },
        { id:'form', nome:'Form preventivo online', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.4, note:'Form con tipo impianto, metratura, urgenza — lead qualificato' },
      ]},
      '4': { cosa:'Blog su risparmio energetico, bonus fiscali, manutenzione', tempo_mesi:2, moduli:[
        { id:'blog', nome:'Blog contenuti tecnici', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'copywriter', nome:'Copywriter tecnico specializzato', costo_mensile:400, costo_setup:500, impatto:1.0, note:'2-4 articoli/mese: bonus, risparmio energetico, guide manutenzione' },
          { id:'interno', nome:'Blog autogestito dal titolare', costo_mensile:0, costo_setup:200, impatto:0.4, note:'1 articolo/mese, il titolare scrive di casi reali' },
        ]},
        { id:'seo', nome:'SEO locale', tipo:'flag', obbligatorio:false, costo_mensile:200, costo_setup:500, impatto:0.25, note:'Ottimizzazione per "idraulico + citta", "manutenzione caldaia + zona"' },
      ]},
      '5': { cosa:'Area clienti — storico impianti, scadenze manutenzione, documenti', tempo_mesi:3, moduli:[
        { id:'area_clienti', nome:'Area clienti riservata', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Portale clienti custom', costo_mensile:200, costo_setup:4000, impatto:1.0, note:'Storico impianti, certificazioni, scadenze, richiesta intervento online' },
          { id:'saas', nome:'Area clienti SaaS (Freshdesk/Zendesk)', costo_mensile:100, costo_setup:1000, impatto:0.6, note:'Ticketing + knowledge base, meno personalizzato' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento materiali',
      '1': { chi:'Titolare', cosa:'Acquisto materiali dal grossista di fiducia — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto prezzi tra 2-3 grossisti per ogni commessa', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database fornitori materiali impiantistici', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda per grossista: prezzi tubi/cavi/caldaie, tempi consegna, MOQ' },
      ]},
      '3': { cosa:'Accordi quadro con distributori — prezzi riservati e consegna rapida', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro grossisti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Prezzi bloccati con 2-3 distributori (Würth, Saint-Gobain, grossista locale)' },
        { id:'online', nome:'Acquisti online (Würth Online/ManoMano Pro)', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:0, impatto:0.15, note:'Confronto prezzi e consegna diretta in cantiere' },
      ]},
      '4': { cosa:'Magazzino materiali ricorrenti + gestione scorte minime', tempo_mesi:2, moduli:[
        { id:'magazzino', nome:'Gestione magazzino', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'software', nome:'Software gestione scorte (modulo ERP/dedicato)', costo_mensile:100, costo_setup:500, impatto:1.0, note:'Scorte minime, riordino automatico materiali ricorrenti' },
          { id:'manuale', nome:'Gestione manuale con Excel', costo_mensile:0, costo_setup:200, impatto:0.5, note:'Inventario periodico, riordino manuale' },
        ]},
      ]},
      '5': { cosa:'Responsabile acquisti — accordi volume, import diretto componenti', tempo_mesi:4, moduli:[
        { id:'buyer', nome:'Responsabile acquisti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer impiantistico dipendente', costo_mensile:2200, costo_setup:0, impatto:1.0, note:'Negoziazione diretta produttori, import componentistica, logistica cantiere' },
          { id:'parttime', nome:'Buyer part-time/admin con delega', costo_mensile:900, costo_setup:0, impatto:0.6, note:'Gestisce ordini, confronto prezzi, rapporto fornitori' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EDILIZIA SERRAMENTI
  // ═══════════════════════════════════════════════════════════════════════════
  edilizia_serramenti: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare vende dallo showroom — passaparola e passaggio', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sopralluoghi a domicilio + preventivi strutturati con rendering', tempo_mesi:1, moduli:[
        { id:'sopralluogo', nome:'Kit sopralluogo professionale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Laser metro, tablet con catalogo digitale, scheda rilievo misure standardizzata' },
        { id:'rendering', nome:'Rendering 3D infissi in ambiente', tipo:'flag', obbligatorio:false, costo_mensile:50, costo_setup:500, impatto:0.3, note:'Software rendering (es. WinDoor) per mostrare al cliente il risultato finale' },
      ]},
      '3': { cosa:'Venditore showroom dedicato + consulente sopralluoghi', tempo_mesi:2, moduli:[
        { id:'venditore', nome:'Venditore showroom', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Venditore dipendente showroom', costo_mensile:2200, costo_setup:0, impatto:1.0, note:'Full-time in showroom, consulenza infissi, gestione cliente fino a posa' },
          { id:'parttime', nome:'Venditore part-time (weekend + 2 gg)', costo_mensile:1200, costo_setup:0, impatto:0.6, note:'Copre i giorni di punta: venerdi-sabato + 1-2 giorni' },
          { id:'provvigione', nome:'Venditore solo provvigione', costo_mensile:0, costo_setup:0, impatto:0.4, note:'Provvigione 3-5% sul venduto, nessun fisso' },
        ]},
      ]},
      '4': { cosa:'Commerciale B2B per imprese edili, architetti e general contractor', tempo_mesi:3, moduli:[
        { id:'b2b', nome:'Commerciale B2B edilizia', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Commerciale B2B dipendente', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Visite cantieri, studi architettura, imprese ristrutturazione' },
          { id:'agente', nome:'Agente plurimandatario edilizia', costo_mensile:1200, costo_setup:0, impatto:0.7, note:'Provvigione su forniture cantiere, rete propria' },
        ]},
      ]},
      '5': { cosa:'Rete posatori partner + canale contract/grandi cantieri', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Responsabile canale contract', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. grandi commesse dipendente', costo_mensile:3000, costo_setup:0, impatto:0.5, note:'Gestione gare, capitolati, rapporti con GC e studi progettazione' },
          { id:'fractional', nome:'Business developer fractional', costo_mensile:1500, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana, focus grandi cantieri' },
        ]},
        { id:'posatori', nome:'Rete posatori certificati', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Albo posatori qualificati con formazione e certificazione' },
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — preventivi su carta e dimenticati', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel/foglio con preventivi, sopralluoghi e stato trattativa', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Fogli Google strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Template: cliente, misure, prodotto, stato, data posa prevista' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free/Zoho)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline preventivi + reminder follow-up' },
        ]},
      ]},
      '3': { cosa:'CRM per gestione preventivi + follow-up post-sopralluogo', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM serramenti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'CRM settore serramenti (Wintel/SerramentiCRM)', costo_mensile:60, costo_setup:300, impatto:1.0, note:'Gestione preventivi con configuratore, ordini fornitore, posa' },
          { id:'generico', nome:'CRM generico (Pipedrive/HubSpot Starter)', costo_mensile:30, costo_setup:200, impatto:0.65, note:'Pipeline vendita, follow-up, ma senza configuratore prodotto' },
        ]},
      ]},
      '4': { cosa:'CRM + configuratore infissi per preventivi automatici', tempo_mesi:2, moduli:[
        { id:'configuratore', nome:'Configuratore preventivi infissi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'professionale', nome:'Configuratore professionale (WinDoor/LogiKal)', costo_mensile:300, costo_setup:2000, impatto:1.0, note:'Configurazione infisso, calcolo prezzo, ordine fornitore automatico' },
          { id:'semplice', nome:'Configuratore semplice (foglio calcolo avanzato)', costo_mensile:0, costo_setup:800, impatto:0.55, note:'Template con formule: dimensioni, materiale, accessori, prezzo' },
        ]},
      ]},
      '5': { cosa:'Gestionale integrato: CRM + ordini + produzione/fornitori + posa', tempo_mesi:3, moduli:[
        { id:'gestionale', nome:'Gestionale serramenti integrato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'erp', nome:'ERP serramenti (Wintel Pro/SerramentiOne)', costo_mensile:600, costo_setup:3500, impatto:1.0, note:'CRM + configuratore + ordini fornitori + pianificazione posa + fatturazione' },
          { id:'modulare', nome:'CRM + gestionale separati (Pipedrive + Danea)', costo_mensile:300, costo_setup:1500, impatto:0.6, note:'Meno integrato, piu flessibile, costo inferiore' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Titolare gestisce tutto — showroom, sopralluoghi e posa', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Separazione ruoli showroom e squadra posa', tempo_mesi:1, moduli:[
        { id:'posa', nome:'Capo posatore', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione posatore esperto interno', costo_mensile:0, costo_setup:300, impatto:1.0, note:'Gia in organico, formazione su gestione squadra e rapporto cliente' },
          { id:'esterno', nome:'Assunzione capo posatore esterno', costo_mensile:300, costo_setup:500, impatto:0.8, note:'Delta costo, porta competenze da fuori' },
        ]},
      ]},
      '3': { cosa:'Addetto showroom + back-office ordini', tempo_mesi:2, moduli:[
        { id:'backoffice', nome:'Back-office/amministrazione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Impiegata amministrativa', costo_mensile:1800, costo_setup:0, impatto:0.7, note:'Ordini fornitori, DDT, fatture, gestione cantieri posa' },
          { id:'parttime', nome:'Segretaria part-time', costo_mensile:900, costo_setup:0, impatto:0.5, note:'4h/giorno, gestione ordini e contabilita base' },
        ]},
        { id:'organigramma', nome:'Organigramma e mansionario', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.2, note:'Showroom, posa, admin, magazzino — chi fa cosa' },
      ]},
      '4': { cosa:'Responsabile commerciale + KPI per ruolo', tempo_mesi:3, moduli:[
        { id:'resp_comm', nome:'Responsabile commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Direttore commerciale dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Coordina venditori, target, pricing, rapporti B2B' },
          { id:'fractional', nome:'Direttore commerciale fractional', costo_mensile:1500, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana, strategia + coaching venditori' },
        ]},
        { id:'kpi', nome:'Dashboard KPI showroom', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Tasso chiusura preventivi, scontrino medio, tempi consegna, NPS' },
      ]},
      '5': { cosa:'Management completo — titolare solo strategia e sviluppo', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Store manager/Direttore operativo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Store manager dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Gestione totale: showroom, posa, ordini, personale, clienti' },
          { id:'fractional', nome:'Operations manager fractional', costo_mensile:1500, costo_setup:0, impatto:0.65, note:'3 giorni/settimana, il titolare si dedica a sviluppo business' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — preventivi a mano, posa senza procedura', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Template preventivo strutturato: misure, materiali, posa, smaltimento', tempo_mesi:1, moduli:[
        { id:'template', nome:'Template preventivo serramenti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Scheda con: tipo infisso, materiale, colore, vetro, accessori, posa, smaltimento vecchi' },
        { id:'checklist_posa', nome:'Checklist pre-posa e post-posa', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.2, note:'Verifica misure, protezione ambiente, pulizia finale, collaudo apertura/chiusura' },
      ]},
      '3': { cosa:'Configuratore infissi per preventivi veloci e precisi', tempo_mesi:2, moduli:[
        { id:'configuratore', nome:'Software configurazione infissi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'professionale', nome:'Configuratore professionale (WinDoor/LogiKal)', costo_mensile:200, costo_setup:1500, impatto:1.0, note:'Configurazione completa: dimensioni, materiale, vetro, colore, accessori, prezzo' },
          { id:'excel', nome:'Foglio di calcolo avanzato', costo_mensile:0, costo_setup:500, impatto:0.5, note:'Template Excel con formule per calcolo prezzo per tipologia' },
        ]},
      ]},
      '4': { cosa:'Gestionale ordini: da preventivo a ordine fornitore a programmazione posa', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Gestionale ordini serramenti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dedicato', nome:'Software gestione ordini (Wintel/Serr. One)', costo_mensile:300, costo_setup:1500, impatto:1.0, note:'Preventivo, conferma, ordine fornitore, arrivo merce, pianificazione posa' },
          { id:'generico', nome:'Project management (Asana/Trello + spreadsheet)', costo_mensile:50, costo_setup:500, impatto:0.5, note:'Board kanban per fasi: confermato, ordinato, in magazzino, posato' },
        ]},
      ]},
      '5': { cosa:'Certificazione posa qualificata + gestione garanzie + NPS', tempo_mesi:4, moduli:[
        { id:'certificazione', nome:'Certificazione posa qualificata', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'ente', nome:'Certificazione con ente (Casa Clima/Legambiente)', costo_mensile:100, costo_setup:3000, impatto:1.0, note:'Posatori certificati, protocollo posa documentato, audit periodici' },
          { id:'interno', nome:'Protocollo qualita interno', costo_mensile:0, costo_setup:1000, impatto:0.5, note:'Checklist qualita, foto documentazione, ma senza ente terzo' },
        ]},
        { id:'garanzie', nome:'Gestione garanzie e NPS', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.15, note:'Registro garanzie, follow-up 6-12 mesi, sondaggio soddisfazione' },
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Vendita infissi con margine base — nessun upsell', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Calcolo margini reali per linea: PVC vs alluminio vs legno-alluminio', tempo_mesi:1, moduli:[
        { id:'costing', nome:'Analisi margini per prodotto', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8, note:'Margine reale per linea (PVC, alluminio, legno-alluminio) con costi posa inclusi' },
      ]},
      '3': { cosa:'Upsell sistematico: zanzariere, oscuranti, cassonetti coibentati, VMC', tempo_mesi:1, moduli:[
        { id:'upsell', nome:'Catalogo accessori per upsell', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Checklist upsell per ogni preventivo: zanzariere, tapparelle, cassonetti, VMC, soglie' },
        { id:'formazione', nome:'Formazione venditori su upsell', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Script vendita per proporre accessori in modo naturale durante il sopralluogo' },
      ]},
      '4': { cosa:'Bonus fiscali come leva di vendita — gestione pratiche', tempo_mesi:2, moduli:[
        { id:'bonus', nome:'Servizio pratiche bonus fiscali', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'interno', nome:'Gestione interna pratiche Ecobonus/50%', costo_mensile:0, costo_setup:800, impatto:1.0, note:'Formazione + software per gestione pratiche ENEA, asseverazioni, visto' },
          { id:'partner', nome:'Partnership con studio tecnico/CAF', costo_mensile:0, costo_setup:200, impatto:0.6, note:'Lo studio gestisce le pratiche, il serramentista porta il cliente' },
        ]},
      ]},
      '5': { cosa:'Contratti quadro con imprese edili — fornitura + posa su cantieri', tempo_mesi:3, moduli:[
        { id:'contract', nome:'Canale contract imprese edili', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'strutturato', nome:'Accordi quadro con 3-5 imprese edili', costo_mensile:0, costo_setup:500, impatto:1.0, note:'Listino dedicato, priorita consegna, posa coordinata con cantiere' },
          { id:'spot', nome:'Forniture spot su richiesta', costo_mensile:0, costo_setup:0, impatto:0.5, note:'Preventivi caso per caso, nessun accordo fisso' },
        ]},
        { id:'noleggio', nome:'Servizio noleggio operativo infissi (grandi cantieri)', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:1000, impatto:0.15, note:'Formula noleggio per cantieri grandi: il costruttore paga canone, noi gestiamo tutto' },
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo insegna showroom e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Google My Business + foto showroom e lavori prima/dopo', tempo_mesi:1, moduli:[
        { id:'gmb', nome:'Google My Business ottimizzato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.6, note:'Foto showroom, lavori prima/dopo, orari, risposte recensioni' },
        { id:'recensioni', nome:'Sistema raccolta recensioni post-posa', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Richiesta recensione dopo collaudo posa — Google + portali' },
      ]},
      '3': { cosa:'Google Ads locali + portali casa (Houzz, Habitissimo)', tempo_mesi:2, moduli:[
        { id:'ads', nome:'Google Ads locali', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:500, impatto:0.5, note:'Campagne su "infissi + citta", "serramenti + zona", "sostituzione finestre"' },
        { id:'portali', nome:'Portali casa (Houzz/Habitissimo/Instapro)', tipo:'flag', obbligatorio:false, costo_mensile:150, costo_setup:0, impatto:0.3, note:'Profilo premium con gallery lavori, preventivi online' },
      ]},
      '4': { cosa:'Social media: video prima/dopo, reel posa, recensioni video', tempo_mesi:2, moduli:[
        { id:'social', nome:'Gestione social media', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Social media manager/agenzia', costo_mensile:800, costo_setup:500, impatto:1.0, note:'Piano editoriale, video prima/dopo, reel posa, storie showroom' },
          { id:'interno', nome:'Social autogestiti', costo_mensile:200, costo_setup:200, impatto:0.4, note:'Il titolare/venditore pubblica 2-3 post/settimana con smartphone' },
        ]},
      ]},
      '5': { cosa:'Piano marketing: eventi showroom, partnership architetti, PR locale', tempo_mesi:3, moduli:[
        { id:'piano', nome:'Piano marketing strutturato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing specializzata', costo_mensile:1800, costo_setup:2000, impatto:1.0, note:'Strategia: eventi showroom, partnership studi architettura, PR, influencer casa' },
          { id:'freelance', nome:'Freelance marketing + tool', costo_mensile:800, costo_setup:500, impatto:0.6, note:'1 professionista, focus lead generation e contenuti' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito vetrina con catalogo infissi, showroom virtuale, zona operativa', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito vetrina serramenti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom WordPress', costo_mensile:30, costo_setup:2000, impatto:1.0, note:'Design personalizzato, catalogo prodotti, gallery showroom, form contatto' },
          { id:'template', nome:'Sito da template (Wix/Jimdo)', costo_mensile:20, costo_setup:600, impatto:0.55, note:'Veloce da lanciare, meno personalizzabile' },
        ]},
      ]},
      '3': { cosa:'Gallery lavori prima/dopo + preventivo online + simulatore colori', tempo_mesi:2, moduli:[
        { id:'gallery', nome:'Gallery lavori prima/dopo', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Foto professionali prima/dopo per ogni materiale e tipologia' },
        { id:'form_prev', nome:'Form preventivo online', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.4, note:'Form con tipo infisso, numero finestre, materiale preferito — lead qualificato' },
      ]},
      '4': { cosa:'Configuratore infissi online — dimensioni, materiale, colore, prezzo indicativo', tempo_mesi:2, moduli:[
        { id:'configuratore', nome:'Configuratore infissi online', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Configuratore custom sviluppato ad hoc', costo_mensile:200, costo_setup:5000, impatto:1.0, note:'Il cliente configura finestra/porta, sceglie materiale/colore/vetro, vede prezzo indicativo' },
          { id:'saas', nome:'Tool SaaS (Typeform + logica prezzi)', costo_mensile:50, costo_setup:1000, impatto:0.5, note:'Form guidato con calcolo prezzo approssimativo' },
        ]},
      ]},
      '5': { cosa:'E-commerce accessori + area clienti post-vendita', tempo_mesi:3, moduli:[
        { id:'ecommerce', nome:'E-commerce accessori e ricambi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'E-commerce WooCommerce/Shopify', costo_mensile:200, costo_setup:4000, impatto:1.0, note:'Vendita online: maniglie, guarnizioni, zanzariere, tapparelle, kit manutenzione' },
          { id:'catalogo', nome:'Catalogo online con richiesta ordine', costo_mensile:50, costo_setup:1000, impatto:0.5, note:'Catalogo sfogliabile, il cliente chiede preventivo via form' },
        ]},
        { id:'area_clienti', nome:'Area clienti riservata', tipo:'flag', obbligatorio:false, costo_mensile:50, costo_setup:1500, impatto:0.2, note:'Storico ordini, garanzie, manuali manutenzione, prenotazione assistenza' },
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento infissi',
      '1': { chi:'Titolare', cosa:'Acquisto infissi da un solo produttore — nessuna alternativa', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto tra 2-3 produttori per materiale e fascia prezzo', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database produttori infissi', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda per produttore: listino, tempi consegna, MOQ, qualita, assistenza' },
      ]},
      '3': { cosa:'Accordi quadro con produttori — sconti volume e priorita consegna', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro produttori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Prezzi bloccati con 2-3 produttori (Schuco, Internorm, Finstral, o italiani)' },
        { id:'showroom', nome:'Campionario showroom aggiornato', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Campioni angolari, finiture, vetri per ogni produttore in showroom' },
      ]},
      '4': { cosa:'Multi-fornitore per materiale: PVC da uno, alluminio da un altro, legno-alu da un terzo', tempo_mesi:2, moduli:[
        { id:'multi', nome:'Strategia multi-fornitore', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'strutturato', nome:'Multi-fornitore strutturato con accordi', costo_mensile:0, costo_setup:500, impatto:1.0, note:'Fornitore primario per materiale, backup per ciascuno, prezzi e tempi concordati' },
          { id:'flessibile', nome:'Multi-fornitore flessibile', costo_mensile:0, costo_setup:200, impatto:0.6, note:'Si sceglie caso per caso il fornitore migliore per ogni commessa' },
        ]},
      ]},
      '5': { cosa:'Partnership produttori + private label + import diretto', tempo_mesi:4, moduli:[
        { id:'partnership', nome:'Partnership strategica produttori', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'premium', nome:'Partnership premium + private label', costo_mensile:500, costo_setup:3000, impatto:1.0, note:'Linea infissi con marchio proprio, produzione dedicata, esclusiva zona' },
          { id:'import', nome:'Import diretto (Est Europa/Turchia)', costo_mensile:200, costo_setup:1500, impatto:0.65, note:'Margini maggiori, tempi piu lunghi, rischio qualita da gestire' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO DISTRIBUZIONE INDUSTRIALE
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_distribuzione_industriale: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare al banco — chi viene compra', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Visite proattive ai 20 clienti top + analisi potenziale inespresso', tempo_mesi:1, moduli:[
        { id:'analisi', nome:'Analisi ABC clienti + potenziale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.6, note:'Classificazione clienti per fatturato e margine, gap vs potenziale di acquisto' },
        { id:'visite', nome:'Piano visite clienti top', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.3, note:'Titolare esce 1-2 giorni/settimana per visite programmate ai clienti A e B' },
      ]},
      '3': { cosa:'Agente plurimandatario con portafoglio industriale zona', tempo_mesi:2, moduli:[
        { id:'commerciale', nome:'Figura commerciale esterna', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agente', nome:'Agente ENASARCO plurimandatario', costo_mensile:800, costo_setup:500, impatto:1.0, note:'Provvigioni 3-5% + ENASARCO, porta portafoglio clienti industriali zona' },
          { id:'procacciatore', nome:'Procacciatore di affari', costo_mensile:0, costo_setup:300, impatto:0.6, note:'Solo provvigione su nuovi clienti portati, nessun fisso' },
          { id:'dip', nome:'Commerciale dipendente esterno', costo_mensile:2200, costo_setup:0, impatto:0.8, note:'Stipendio fisso + auto + telefono, fidelizzato ma costo fisso alto' },
        ]},
      ]},
      '4': { cosa:'KAM clienti strategici + inside sales telefonico', tempo_mesi:3, moduli:[
        { id:'kam', nome:'Key Account Manager', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'KAM dipendente', costo_mensile:2800, costo_setup:0, impatto:1.0, note:'Gestisce top 10 clienti, sviluppo cross-selling, visite settimanali' },
          { id:'fractional', nome:'KAM fractional/consulente', costo_mensile:1400, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana, focus solo clienti A' },
        ]},
        { id:'inside', nome:'Inside sales', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'dip', nome:'Inside sales dipendente', costo_mensile:1800, costo_setup:0, impatto:0.3, note:'Telefono + email per riordini, follow-up offerte, clienti B e C' },
          { id:'parttime', nome:'Inside sales part-time', costo_mensile:900, costo_setup:0, impatto:0.2, note:'4h/giorno, focus su riattivazione dormienti e riordini' },
        ]},
      ]},
      '5': { cosa:'Direttore commerciale + rete agenti + inside sales', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Direttore commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale dipendente', costo_mensile:3500, costo_setup:0, impatto:0.5, note:'Coordinamento agenti, pricing, budget, sviluppo nuovi mercati' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1800, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana, strategia + coaching' },
        ]},
        { id:'team', nome:'Rete vendita', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'agente', nome:'Agente ENASARCO', costo_mensile:800, costo_setup:0, impatto:0.15, note:'Per zona/settore industriale' },
          { id:'dip', nome:'Commerciale dipendente', costo_mensile:2000, costo_setup:0, impatto:0.2, note:'Lordo azienda, auto aziendale' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini a telefono e banco', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con clienti attivi, frequenza ordini, prodotti principali', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento clienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Fogli Google strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Template: cliente, ultimo ordine, frequenza, prodotti, valore annuo' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free/Zoho)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline + alert riordino + storico contatti' },
        ]},
      ]},
      '3': { cosa:'CRM con alert riordini automatici e follow-up clienti dormienti', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM distribuzione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'b2b', nome:'CRM B2B (Salesforce Essentials/Zoho CRM)', costo_mensile:80, costo_setup:300, impatto:1.0, note:'Pipeline, alert riordino, segmentazione clienti, report vendite' },
          { id:'generico', nome:'CRM leggero (Pipedrive/Freshsales)', costo_mensile:40, costo_setup:200, impatto:0.7, note:'Pipeline base + automazioni email' },
        ]},
      ]},
      '4': { cosa:'CRM integrato con ERP — stock, prezzi, storico ordini in tempo reale', tempo_mesi:2, moduli:[
        { id:'integrazione', nome:'Integrazione CRM-ERP', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'nativa', nome:'ERP con CRM integrato (SAP B1/TeamSystem)', costo_mensile:400, costo_setup:2000, impatto:1.0, note:'Giacenze live, prezzi per cliente, storico ordini, tutto in un sistema' },
          { id:'api', nome:'CRM + ERP connessi via API/Zapier', costo_mensile:250, costo_setup:1200, impatto:0.7, note:'Sistemi separati ma sincronizzati, piu flessibile' },
        ]},
      ]},
      '5': { cosa:'ERP completo — clienti, acquisti, magazzino, logistica, BI', tempo_mesi:3, moduli:[
        { id:'erp', nome:'ERP distribuzione industriale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP enterprise (SAP B1/Microsoft Dynamics)', costo_mensile:800, costo_setup:5000, impatto:1.0, note:'Gestione completa: vendite, acquisti, magazzino, logistica, contabilita, BI' },
          { id:'mid', nome:'ERP mid-market (TeamSystem/Mago4)', costo_mensile:400, costo_setup:3000, impatto:0.7, note:'Funzionalita core, costo inferiore, meno personalizzabile' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Ruoli banco/magazzino definiti — mansionario chiaro', tempo_mesi:1, moduli:[
        { id:'organigramma', nome:'Organigramma e mansionario', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Banco vendita, magazzino/spedizioni, amministrazione — chi fa cosa' },
        { id:'resp_magazzino', nome:'Responsabile magazzino', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione interna magazziniere esperto', costo_mensile:0, costo_setup:200, impatto:1.0, note:'Gia in organico, delta costo minimo, conosce il prodotto' },
          { id:'esterno', nome:'Assunzione resp. magazzino', costo_mensile:300, costo_setup:0, impatto:0.8, note:'Porta esperienza logistica da fuori' },
        ]},
      ]},
      '3': { cosa:'Procedure ordini e consegne formalizzate + riunione settimanale', tempo_mesi:2, moduli:[
        { id:'admin', nome:'Impiegata commerciale/amministrativa', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Impiegata commerciale dipendente', costo_mensile:1800, costo_setup:0, impatto:0.7, note:'Ordini, offerte, DDT, fatture, gestione reclami' },
          { id:'parttime', nome:'Impiegata part-time', costo_mensile:900, costo_setup:0, impatto:0.5, note:'4h/giorno, gestione ordini e contabilita base' },
        ]},
      ]},
      '4': { cosa:'KPI per canale + deleghe operative al responsabile', tempo_mesi:3, moduli:[
        { id:'resp_ops', nome:'Responsabile operativo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. operativo dipendente', costo_mensile:2800, costo_setup:0, impatto:1.0, note:'Gestione magazzino, logistica, personale operativo, KPI' },
          { id:'fractional', nome:'Resp. operativo fractional', costo_mensile:1400, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
        { id:'kpi', nome:'Dashboard KPI per canale', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Fatturato per agente, margine per linea, rotazione scorte, fill rate' },
      ]},
      '5': { cosa:'Management strutturato — commerciale + operations + amministrazione', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Direttore generale/COO', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'COO/Direttore operativo dipendente', costo_mensile:4000, costo_setup:0, impatto:1.0, note:'Gestione totale day-to-day, il titolare fa strategia e sviluppo' },
          { id:'fractional', nome:'COO fractional', costo_mensile:2000, costo_setup:0, impatto:0.65, note:'3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ordini gestiti a memoria e su carta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Gestione ordini strutturata — conferma, tempi, back order', tempo_mesi:1, moduli:[
        { id:'ordini', nome:'Processo ordini formalizzato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Flusso: richiesta, conferma, picking, spedizione, fattura — con checklist' },
        { id:'reclami', nome:'Procedura reclami e resi', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.2, note:'Modulo reclamo, analisi causa, azione correttiva, feedback al cliente' },
      ]},
      '3': { cosa:'Gestionale magazzino — giacenze, riordino automatico, inventario', tempo_mesi:2, moduli:[
        { id:'wms', nome:'Software gestione magazzino', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'wms', nome:'WMS dedicato (Odoo Magazzino/Danea)', costo_mensile:200, costo_setup:1500, impatto:1.0, note:'Giacenze real-time, sotto-scorta, riordino automatico, inventario rotativo' },
          { id:'erp_modulo', nome:'Modulo magazzino ERP (Fatture in Cloud/TeamSystem)', costo_mensile:100, costo_setup:800, impatto:0.65, note:'Gestione base giacenze, meno automazione' },
        ]},
      ]},
      '4': { cosa:'ERP con listini per cliente, condizioni commerciali, ordini urgenti', tempo_mesi:2, moduli:[
        { id:'erp', nome:'ERP con gestione listini', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'ERP distribuzione (SAP B1/Mago4)', costo_mensile:500, costo_setup:3000, impatto:1.0, note:'Listini per cliente, sconti a cascata, condizioni pagamento, ordini urgenti' },
          { id:'leggero', nome:'Gestionale leggero + Excel listini', costo_mensile:200, costo_setup:1000, impatto:0.55, note:'Gestionale per ordini/fatture + listini gestiti a parte' },
        ]},
      ]},
      '5': { cosa:'EDI con clienti principali + logistica ottimizzata + KPI supply chain', tempo_mesi:4, moduli:[
        { id:'edi', nome:'Integrazione EDI', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'EDI strutturato (ordini + DDT + fatture)', costo_mensile:500, costo_setup:5000, impatto:1.0, note:'Scambio documenti elettronico con top 5-10 clienti, zero errori manuali' },
          { id:'parziale', nome:'Portale ordini B2B (semi-EDI)', costo_mensile:200, costo_setup:2000, impatto:0.55, note:'I clienti ordinano online, meno integrazione ma piu accessibile' },
        ]},
        { id:'logistica', nome:'Ottimizzazione logistica consegne', tipo:'flag', obbligatorio:false, costo_mensile:200, costo_setup:1000, impatto:0.2, note:'Software pianificazione giri, tracking consegne, ottimizzazione percorsi' },
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine fisso da listino — nessuna differenziazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pricing differenziato per volume e categoria cliente', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Matrice prezzi per cliente/volume', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8, note:'Listino A/B/C per categoria, sconti volume, condizioni per fidelizzazione' },
      ]},
      '3': { cosa:'Servizi a valore aggiunto — consegna rapida, conto deposito, taglio', tempo_mesi:1, moduli:[
        { id:'servizi', nome:'Servizi a valore aggiunto', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.7, note:'Consegna express, magazzino conto deposito, taglio/kitting base' },
        { id:'formazione', nome:'Formazione tecnica prodotto ai clienti', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Giornate formative su nuovi prodotti — fidelizzazione + upselling' },
      ]},
      '4': { cosa:'Accordi fornitura esclusiva + cross-selling sistematico', tempo_mesi:2, moduli:[
        { id:'esclusiva', nome:'Accordi fornitura esclusiva', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Contratti annuali con clienti top: prezzo bloccato, volume garantito, esclusiva' },
        { id:'crossselling', nome:'Programma cross-selling', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Analisi gap: prodotti che il cliente compra altrove ma potrebbe comprare da noi' },
      ]},
      '5': { cosa:'Kitting, just-in-time, VMI — servizi ad alto margine', tempo_mesi:3, moduli:[
        { id:'vmi', nome:'Servizi logistici avanzati', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'VMI + kitting + JIT completo', costo_mensile:500, costo_setup:1500, impatto:1.0, note:'Vendor Managed Inventory presso il cliente, kitting personalizzato, consegna JIT' },
          { id:'parziale', nome:'Kitting base + consegna programmata', costo_mensile:200, costo_setup:500, impatto:0.55, note:'Kit pre-assemblati e consegne settimanali programmate' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo clienti storici e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Catalogo digitale aggiornato + newsletter mensile ai clienti', tempo_mesi:1, moduli:[
        { id:'catalogo', nome:'Catalogo digitale PDF/sfogliabile', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.5, note:'Catalogo prodotti con schede tecniche, disponibilita, prezzi indicativi' },
        { id:'newsletter', nome:'Newsletter mensile clienti', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:0, impatto:0.3, note:'Novita prodotto, promozioni, disponibilita speciali — Mailchimp/Brevo' },
      ]},
      '3': { cosa:'Fiere industriali (MECSPE, BI-MU, SPS) — stand e networking', tempo_mesi:2, moduli:[
        { id:'fiere', nome:'Partecipazione fiere industriali', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'stand', nome:'Stand espositivo (MECSPE/BI-MU)', costo_mensile:300, costo_setup:4000, impatto:1.0, note:'Stand 9-16 mq, campionatura, materiale promozionale, 1-2 fiere/anno' },
          { id:'visitatore', nome:'Visita come operatore + networking', costo_mensile:100, costo_setup:500, impatto:0.4, note:'Biglietti VIP, eventi networking, niente stand ma presenza attiva' },
        ]},
      ]},
      '4': { cosa:'LinkedIn Ads su resp. acquisti + content marketing tecnico', tempo_mesi:2, moduli:[
        { id:'linkedin', nome:'Campagne LinkedIn B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Gestione LinkedIn con agenzia B2B', costo_mensile:700, costo_setup:500, impatto:1.0, note:'Ads targetizzati su resp. acquisti/produzione, content strategy tecnico' },
          { id:'interno', nome:'LinkedIn autogestito + ads base', costo_mensile:300, costo_setup:200, impatto:0.5, note:'Post settimanali + budget ads diretto, gestione interna' },
        ]},
      ]},
      '5': { cosa:'Piano marketing integrato — fiere + digital + catalogo + promozioni', tempo_mesi:3, moduli:[
        { id:'piano', nome:'Piano marketing B2B strutturato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing B2B industriale', costo_mensile:1800, costo_setup:2000, impatto:1.0, note:'Strategia completa: fiere, LinkedIn, catalogo, email marketing, lead generation' },
          { id:'interno', nome:'Marketing manager interno + tool', costo_mensile:1000, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata con budget tool e ads' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o sito vetrina datato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito con catalogo prodotti, schede tecniche scaricabili, form contatto', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito catalogo industriale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom WordPress + catalogo', costo_mensile:50, costo_setup:2000, impatto:1.0, note:'Catalogo prodotti navigabile, schede tecniche PDF, form richiesta offerta' },
          { id:'template', nome:'Sito da template + pagine prodotto', costo_mensile:30, costo_setup:800, impatto:0.55, note:'Template industriale, inserimento prodotti manuale' },
        ]},
      ]},
      '3': { cosa:'Area riservata clienti — prezzi dedicati, storico ordini, documenti', tempo_mesi:2, moduli:[
        { id:'area_riservata', nome:'Area riservata B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Portale clienti custom', costo_mensile:200, costo_setup:3000, impatto:1.0, note:'Login, prezzi dedicati per cliente, storico ordini, documentazione, certificati' },
          { id:'plugin', nome:'Area riservata con plugin (WooCommerce B2B)', costo_mensile:80, costo_setup:1200, impatto:0.6, note:'Prezzi nascosti, login obbligatorio, meno personalizzazione' },
        ]},
      ]},
      '4': { cosa:'E-catalogue con disponibilita stock e tempi di consegna live', tempo_mesi:2, moduli:[
        { id:'ecatalogue', nome:'E-catalogue con stock live', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'integrato', nome:'Catalogo integrato con ERP (stock real-time)', costo_mensile:400, costo_setup:5000, impatto:1.0, note:'Giacenze live, tempi consegna, alternativa se esaurito — da ERP' },
          { id:'manuale', nome:'Catalogo con aggiornamento periodico', costo_mensile:100, costo_setup:2000, impatto:0.5, note:'Stock aggiornato settimanalmente, non in tempo reale' },
        ]},
      ]},
      '5': { cosa:'Portale B2B completo — ordini online, tracking, fatturazione elettronica', tempo_mesi:3, moduli:[
        { id:'portale', nome:'Portale e-commerce B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Portale B2B enterprise (Magento B2B/OroCommerce)', costo_mensile:800, costo_setup:10000, impatto:1.0, note:'Ordini online, prezzi per cliente, tracking spedizioni, fatturazione, riordino rapido' },
          { id:'mid', nome:'WooCommerce B2B / PrestaShop B2B', costo_mensile:300, costo_setup:4000, impatto:0.6, note:'E-commerce B2B piu semplice, meno integrazioni' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento e fornitori',
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 grossisti — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto fornitori sistematico — prezzi, MOQ, tempi, qualita', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database fornitori strutturato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda per fornitore: listino, MOQ, lead time, condizioni pagamento, affidabilita' },
      ]},
      '3': { cosa:'Accordi quadro con produttori — sconti volume e priorita consegna', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro produttori/distributori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Contratti annuali con 3-5 fornitori chiave: prezzi bloccati, priorita, resi' },
        { id:'backup', nome:'Fornitori backup per linee critiche', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:0, impatto:0.15, note:'Secondo fornitore qualificato per ogni linea ad alta rotazione' },
      ]},
      '4': { cosa:'Buyer dedicato — negoziazione, import diretto, gestione scorte', tempo_mesi:2, moduli:[
        { id:'buyer', nome:'Buyer dedicato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer industriale dipendente', costo_mensile:2200, costo_setup:0, impatto:1.0, note:'Negoziazione diretta produttori, analisi costi, import, gestione scorte' },
          { id:'parttime', nome:'Buyer part-time/admin con delega', costo_mensile:1000, costo_setup:0, impatto:0.6, note:'Gestisce riordini, confronto prezzi, rapporto fornitori' },
        ]},
      ]},
      '5': { cosa:'Resp. supply chain — contratti quadro, import diretto, private label', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Responsabile supply chain', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Supply chain manager dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Strategia acquisti, import diretto, private label, ottimizzazione scorte' },
          { id:'fractional', nome:'Supply chain manager fractional', costo_mensile:1800, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana, focus negoziazioni e import' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO INGROSSO ALIMENTARE
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_ingrosso_alimentare: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare gestisce clienti storici — ordini per telefono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Visite pianificate a ristoranti, bar, pizzerie e negozi alimentari zona', tempo_mesi:1, moduli:[
        { id:'analisi', nome:'Analisi clienti HORECA zona', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.6, note:'Mappatura ristoranti/bar/pizzerie/hotel nel raggio di consegna, classificazione A/B/C' },
        { id:'campionature', nome:'Kit campionature per visite', tipo:'flag', obbligatorio:true, costo_mensile:150, costo_setup:0, impatto:0.3, note:'Campioni prodotti nuovi, degustazione in loco, materiale promozionale' },
      ]},
      '3': { cosa:'Sviluppo canale HORECA — degustazioni, menu consulting, campionature', tempo_mesi:2, moduli:[
        { id:'venditori', nome:'Venditore canale HORECA', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agente', nome:'Agente ENASARCO food', costo_mensile:800, costo_setup:500, impatto:1.0, note:'Provvigione 3-5%, porta portafoglio ristoranti/bar della zona' },
          { id:'dip', nome:'Venditore dipendente', costo_mensile:2000, costo_setup:0, impatto:0.8, note:'Fisso + incentivi, auto aziendale, fidelizzato' },
          { id:'parttime', nome:'Venditore part-time', costo_mensile:1000, costo_setup:0, impatto:0.5, note:'Mattina per consegne + vendita, pomeriggio libero' },
        ]},
      ]},
      '4': { cosa:'Agente dedicato HORECA + sviluppo canale GDO locale', tempo_mesi:3, moduli:[
        { id:'horeca', nome:'Agente HORECA dedicato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agente', nome:'Agente ENASARCO HORECA', costo_mensile:1000, costo_setup:0, impatto:0.6, note:'Espansione zona, nuovi ristoranti/bar/hotel' },
          { id:'dip', nome:'Commerciale HORECA dipendente', costo_mensile:2200, costo_setup:0, impatto:0.5, note:'Stipendio fisso + auto, gestisce anche key account' },
        ]},
        { id:'gdo', nome:'Sviluppo canale GDO', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'agente_gdo', nome:'Agente GDO specializzato', costo_mensile:1200, costo_setup:500, impatto:0.3, note:'Conosce buyer GDO locale, gestisce listing e promozioni' },
          { id:'diretto', nome:'Contatto diretto buyer GDO', costo_mensile:0, costo_setup:300, impatto:0.15, note:'Il titolare gestisce direttamente 2-3 insegne locali' },
        ]},
      ]},
      '5': { cosa:'Dir. commerciale + rete agenti + private label + export', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Direttore commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale dipendente', costo_mensile:3500, costo_setup:0, impatto:0.5, note:'Coordinamento agenti, rapporti GDO, sviluppo private label, export' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1800, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
        { id:'team', nome:'Rete vendita', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'agente', nome:'Agente ENASARCO', costo_mensile:800, costo_setup:0, impatto:0.15, note:'Per zona/canale' },
          { id:'dip', nome:'Venditore dipendente', costo_mensile:2000, costo_setup:0, impatto:0.2, note:'Fisso + auto + incentivi' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini per telefono e WhatsApp', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con clienti, frequenza ordini, prodotti e volumi principali', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Fogli Google strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Template: cliente, canale, ultimo ordine, frequenza, prodotti, valore mensile' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free/Zoho)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline + storico ordini + reminder riordino' },
        ]},
      ]},
      '3': { cosa:'CRM con gestione listini per canale e promozioni settimanali', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM food distribution', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Gestionale distribuzione food (Deliverect/iOrder)', costo_mensile:80, costo_setup:300, impatto:1.0, note:'Ordini, listini per canale, promozioni, giro consegne' },
          { id:'generico', nome:'CRM generico (Pipedrive/Freshsales)', costo_mensile:40, costo_setup:200, impatto:0.65, note:'Pipeline vendita, meno specifico per food' },
        ]},
      ]},
      '4': { cosa:'Gestionale ordini con route planning consegne e stock live', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Gestionale ordini + logistica', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'erp_food', nome:'ERP distribuzione alimentare (Argo/FoodManager)', costo_mensile:400, costo_setup:2000, impatto:1.0, note:'Ordini, lotti, scadenze, route planning, consegne, DDT automatici' },
          { id:'modulare', nome:'CRM + app consegne separati', costo_mensile:200, costo_setup:1000, impatto:0.65, note:'CRM per vendita + app route planning (es. Routific) separata' },
        ]},
      ]},
      '5': { cosa:'ERP alimentare completo — ordini, magazzino, tracciabilita, logistica, BI', tempo_mesi:3, moduli:[
        { id:'erp', nome:'ERP alimentare completo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP food enterprise (SAP Food/Sage X3)', costo_mensile:1000, costo_setup:6000, impatto:1.0, note:'Ordini, magazzino FIFO, tracciabilita lotti, logistica, contabilita, BI' },
          { id:'mid', nome:'ERP mid-market (Argo/TeamSystem food)', costo_mensile:500, costo_setup:3000, impatto:0.65, note:'Funzionalita core food, costo inferiore' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Ruoli magazzino/consegne separati — mansionario chiaro', tempo_mesi:1, moduli:[
        { id:'organigramma', nome:'Organigramma e mansionario', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Magazzino, consegne, ordini, amministrazione — chi fa cosa' },
        { id:'resp_magazzino', nome:'Responsabile magazzino/freddo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione interna magazziniere', costo_mensile:0, costo_setup:200, impatto:1.0, note:'Gia in organico, formazione su gestione FIFO e catena freddo' },
          { id:'esterno', nome:'Assunzione resp. magazzino', costo_mensile:300, costo_setup:0, impatto:0.8, note:'Esperienza gestione magazzino alimentare e catena freddo' },
        ]},
      ]},
      '3': { cosa:'Resp. HACCP interno + procedure scadenze formalizzate', tempo_mesi:2, moduli:[
        { id:'haccp', nome:'Responsabile HACCP', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'interno', nome:'Formazione interna resp. HACCP', costo_mensile:0, costo_setup:500, impatto:0.7, note:'Corso HACCP per una risorsa interna + manuale autocontrollo' },
          { id:'consulente', nome:'Consulente HACCP esterno', costo_mensile:200, costo_setup:300, impatto:1.0, note:'Consulente dedica 1-2 giorni/mese, audit, aggiornamento piano' },
        ]},
        { id:'admin', nome:'Impiegata ordini/amministrazione', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'dip', nome:'Impiegata dipendente', costo_mensile:1800, costo_setup:0, impatto:0.2, note:'Gestione ordini, fatture, DDT, rapporti clienti' },
          { id:'parttime', nome:'Impiegata part-time', costo_mensile:900, costo_setup:0, impatto:0.15, note:'4h/giorno' },
        ]},
      ]},
      '4': { cosa:'KPI per canale + deleghe logistica e ordini', tempo_mesi:3, moduli:[
        { id:'resp_ops', nome:'Responsabile operativo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. operativo dipendente', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Gestione magazzino, logistica consegne, personale operativo, KPI' },
          { id:'fractional', nome:'Resp. operativo fractional', costo_mensile:1200, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
      ]},
      '5': { cosa:'Management completo — commerciale + logistica + qualita', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Direttore operativo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'COO/Dir. operativo dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Gestione totale: vendite, logistica, qualita, il titolare fa sviluppo' },
          { id:'fractional', nome:'COO fractional', costo_mensile:1800, costo_setup:0, impatto:0.65, note:'3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ordini e consegne gestiti a vista', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Tracciabilita lotti base + gestione FIFO scadenze', tempo_mesi:1, moduli:[
        { id:'tracciabilita', nome:'Registro tracciabilita lotti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Registro entrata/uscita lotti, fornitore, data scadenza, cliente destinatario' },
        { id:'fifo', nome:'Procedura FIFO magazzino', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.2, note:'First In First Out obbligatorio, etichettatura scaffali, rotazione stock' },
      ]},
      '3': { cosa:'HACCP strutturato + gestionale magazzino con lotti e scadenze', tempo_mesi:2, moduli:[
        { id:'haccp', nome:'Piano HACCP strutturato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'consulente', nome:'Piano HACCP con consulente + software', costo_mensile:200, costo_setup:1000, impatto:1.0, note:'Analisi rischi, CCP, monitoraggio temperature, registrazioni digitali' },
          { id:'manuale', nome:'Piano HACCP manuale + registri cartacei', costo_mensile:0, costo_setup:500, impatto:0.55, note:'Manuale autocontrollo, registri temperatura, checklist pulizia' },
        ]},
        { id:'software_mag', nome:'Software gestione magazzino alimentare', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'dedicato', nome:'WMS alimentare (con lotti/scadenze)', costo_mensile:200, costo_setup:1000, impatto:0.3, note:'Gestione lotti, scadenze, ubicazioni, picking, alert sotto-scorta' },
          { id:'base', nome:'Excel avanzato con alert scadenze', costo_mensile:0, costo_setup:200, impatto:0.15, note:'Foglio con formattazione condizionale per scadenze imminenti' },
        ]},
      ]},
      '4': { cosa:'Catena del freddo certificata + logistica consegne ottimizzata', tempo_mesi:3, moduli:[
        { id:'freddo', nome:'Monitoraggio catena del freddo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'digitale', nome:'Sensori IoT + registrazione automatica', costo_mensile:300, costo_setup:2000, impatto:1.0, note:'Data logger in celle e mezzi, allarmi automatici, report per ASL' },
          { id:'manuale', nome:'Registrazione manuale + termometri', costo_mensile:0, costo_setup:500, impatto:0.5, note:'Registri temperatura 2x/giorno, termometri calibrati' },
        ]},
        { id:'route', nome:'Ottimizzazione giri consegna', tipo:'flag', obbligatorio:false, costo_mensile:100, costo_setup:500, impatto:0.2, note:'Software route planning (Routific/OptimoRoute) per minimizzare km e tempi' },
      ]},
      '5': { cosa:'Certificazioni BRC/IFS + audit interni + sistema qualita completo', tempo_mesi:4, moduli:[
        { id:'certificazione', nome:'Certificazione qualita food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'brc_ifs', nome:'Certificazione BRC/IFS con ente', costo_mensile:300, costo_setup:6000, impatto:1.0, note:'Standard richiesto da GDO, prerequisito per forniture catene nazionali' },
          { id:'iso22000', nome:'ISO 22000 (alternativa)', costo_mensile:200, costo_setup:4000, impatto:0.7, note:'Meno costosa di BRC/IFS, buona per HORECA e GDO locale' },
        ]},
        { id:'audit', nome:'Programma audit interni', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Audit trimestrali, azioni correttive, aggiornamento procedure' },
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine fisso da listino — nessun upsell', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pricing differenziato per canale: HORECA, GDO, dettaglio', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Listini per canale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8, note:'Prezzo diverso per ristorante, minimarket, GDO — margini ottimizzati per canale' },
      ]},
      '3': { cosa:'Promozioni settimanali + prodotti stagionali ad alto margine', tempo_mesi:1, moduli:[
        { id:'promo', nome:'Piano promozioni settimanali', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.6, note:'Volantino/WhatsApp con offerte della settimana su prodotti da smaltire o stagionali' },
        { id:'stagionali', nome:'Gamma prodotti stagionali premium', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Selezione prodotti stagionali locali ad alto margine (tartufo, funghi, agrumi, ecc.)' },
      ]},
      '4': { cosa:'Private label per GDO locale — margini 15-20% superiori', tempo_mesi:2, moduli:[
        { id:'private_label', nome:'Sviluppo linea private label', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'Linea PL completa (packaging + produzione conto terzi)', costo_mensile:300, costo_setup:1500, impatto:1.0, note:'Marchio proprio, packaging dedicato, produzione presso partner selezionati' },
          { id:'copacking', nome:'Co-packing con marchio distributore', costo_mensile:100, costo_setup:500, impatto:0.5, note:'Prodotti sfusi confezionati con marchio del grossista' },
        ]},
      ]},
      '5': { cosa:'Contratti annuali GDO + linee premium, bio e km zero', tempo_mesi:3, moduli:[
        { id:'gdo', nome:'Contratti annuali GDO', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'strutturato', nome:'Accordi quadro con 2-3 insegne', costo_mensile:500, costo_setup:2000, impatto:1.0, note:'Listing fee, promozioni concordate, volumi garantiti, margine prevedibile' },
          { id:'spot', nome:'Forniture spot a insegne locali', costo_mensile:0, costo_setup:500, impatto:0.4, note:'Ordini caso per caso, senza accordo fisso' },
        ]},
        { id:'premium', nome:'Sviluppo linee premium/bio/km zero', tipo:'flag', obbligatorio:false, costo_mensile:200, costo_setup:500, impatto:0.2, note:'Selezione produttori locali, certificazione bio/DOP/IGP, margini piu alti' },
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo relazione diretta col cliente', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Catalogo digitale + listino aggiornato via WhatsApp/email', tempo_mesi:1, moduli:[
        { id:'catalogo', nome:'Catalogo prodotti digitale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.5, note:'PDF sfogliabile o app con catalogo, foto prodotti, schede tecniche' },
        { id:'whatsapp', nome:'Lista broadcast WhatsApp Business', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Offerte settimanali, disponibilita, novita — a tutti i clienti attivi' },
      ]},
      '3': { cosa:'Fiere alimentari (Cibus, TuttoFood, MARCA) — stand e degustazione', tempo_mesi:2, moduli:[
        { id:'fiere', nome:'Partecipazione fiere alimentari', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'stand', nome:'Stand espositivo (Cibus/TuttoFood)', costo_mensile:300, costo_setup:5000, impatto:1.0, note:'Stand 9-16 mq, campionatura, degustazione, 1-2 fiere/anno' },
          { id:'visitatore', nome:'Visita come operatore + networking', costo_mensile:100, costo_setup:500, impatto:0.4, note:'Biglietti VIP, eventi B2B, niente stand ma ricerca fornitori e clienti' },
        ]},
      ]},
      '4': { cosa:'Campagne LinkedIn/email verso buyer GDO e chef HORECA', tempo_mesi:2, moduli:[
        { id:'digital', nome:'Marketing digitale B2B food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing food B2B', costo_mensile:700, costo_setup:500, impatto:1.0, note:'LinkedIn Ads su buyer, email marketing, content su prodotti e territorio' },
          { id:'interno', nome:'Marketing autogestito + tool', costo_mensile:300, costo_setup:200, impatto:0.5, note:'LinkedIn manuale + Mailchimp/Brevo per newsletter' },
        ]},
      ]},
      '5': { cosa:'Piano marketing completo — fiere + digital + PR settore food', tempo_mesi:3, moduli:[
        { id:'piano', nome:'Piano marketing food B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia specializzata food/beverage', costo_mensile:1800, costo_setup:2000, impatto:1.0, note:'Strategia: fiere, digital, PR su riviste food, eventi degustazione' },
          { id:'freelance', nome:'Freelance food marketing + tool', costo_mensile:800, costo_setup:500, impatto:0.6, note:'1 professionista con esperienza food, gestisce tutto' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito vetrina con catalogo prodotti, certificazioni e zona servita', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito vetrina alimentare', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom WordPress + catalogo', costo_mensile:30, costo_setup:1500, impatto:1.0, note:'Catalogo prodotti con foto, schede, certificazioni, zona consegna' },
          { id:'template', nome:'Sito da template (Wix/Jimdo)', costo_mensile:20, costo_setup:500, impatto:0.55, note:'Veloce, meno personalizzabile' },
        ]},
      ]},
      '3': { cosa:'Catalogo online con prezzi riservati per cliente registrato', tempo_mesi:2, moduli:[
        { id:'catalogo_online', nome:'Catalogo B2B con login', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Area riservata custom con prezzi per cliente', costo_mensile:200, costo_setup:2500, impatto:1.0, note:'Login, listino personalizzato per canale, storico ordini, download DDT' },
          { id:'plugin', nome:'WooCommerce B2B con prezzi nascosti', costo_mensile:80, costo_setup:1000, impatto:0.6, note:'Plugin B2B, prezzi visibili solo con login, meno personalizzazione' },
        ]},
      ]},
      '4': { cosa:'Ordini online B2B + disponibilita stock e scadenze in tempo reale', tempo_mesi:2, moduli:[
        { id:'ordini_online', nome:'Portale ordini B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'integrato', nome:'Portale ordini integrato con ERP (stock live)', costo_mensile:500, costo_setup:5000, impatto:1.0, note:'Ordini online, giacenze live, date scadenza, DDT automatici' },
          { id:'standalone', nome:'E-commerce B2B standalone', costo_mensile:200, costo_setup:2000, impatto:0.6, note:'Ordini online, stock aggiornato periodicamente' },
        ]},
      ]},
      '5': { cosa:'Piattaforma B2B completa — ordini, tracking consegne, fatturazione', tempo_mesi:3, moduli:[
        { id:'piattaforma', nome:'Piattaforma B2B food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Portale B2B enterprise (Magento B2B/custom)', costo_mensile:800, costo_setup:10000, impatto:1.0, note:'Ordini, listini per cliente, tracking consegne GPS, fatturazione, riordino rapido' },
          { id:'mid', nome:'WooCommerce B2B avanzato', costo_mensile:300, costo_setup:4000, impatto:0.6, note:'E-commerce B2B con plugin avanzati, meno integrazioni' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento prodotti',
      '1': { chi:'Titolare', cosa:'Acquisto da produttori locali abituali — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Diversificazione fornitori — confronto prezzi, qualita e affidabilita', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database fornitori alimentari', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda per produttore: listino, MOQ, lead time, certificazioni, stagionalita' },
      ]},
      '3': { cosa:'Accordi quadro con produttori — volumi, prezzi stagionali, esclusiva zona', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro produttori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Contratti con 5-10 produttori chiave: prezzi stagionali, volumi, esclusiva zona' },
        { id:'dop', nome:'Accordi con produttori DOP/IGP locali', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Prodotti tipici locali in esclusiva per differenziazione vs concorrenza' },
      ]},
      '4': { cosa:'Buyer dedicato — negoziazione, import, gestione catena freddo', tempo_mesi:2, moduli:[
        { id:'buyer', nome:'Buyer alimentare', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer food dipendente', costo_mensile:2200, costo_setup:0, impatto:1.0, note:'Negoziazione, sourcing, gestione qualita, import, catena freddo' },
          { id:'parttime', nome:'Buyer part-time/admin con delega', costo_mensile:1000, costo_setup:0, impatto:0.6, note:'Gestisce riordini, confronto fornitori, controllo qualita base' },
        ]},
      ]},
      '5': { cosa:'Resp. acquisti — contratti annuali, sourcing internazionale, private label', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Responsabile supply chain food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Supply chain manager food dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Strategia acquisti, import, sviluppo PL, ottimizzazione scorte, rapporti produttori' },
          { id:'fractional', nome:'Supply chain manager fractional', costo_mensile:1800, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO MATERIALI EDILI
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_materiali_edili: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare al banco — chi viene compra', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Visite proattive a imprese edili, posatori e artigiani zona', tempo_mesi:1, moduli:[
        { id:'analisi', nome:'Analisi clienti imprese/artigiani', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.6, note:'Mappatura imprese edili, posatori, idraulici, elettricisti nel raggio di consegna' },
        { id:'visite', nome:'Piano visite cantieri e imprese', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.3, note:'1-2 giorni/settimana fuori dal punto vendita' },
      ]},
      '3': { cosa:'Showroom professionale + consulenza progetto per privati e architetti', tempo_mesi:2, moduli:[
        { id:'showroom', nome:'Addetto showroom/consulente', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Consulente showroom dipendente', costo_mensile:2000, costo_setup:0, impatto:1.0, note:'Accoglienza, consulenza materiali, progetto bagno/pavimenti, preventivi' },
          { id:'parttime', nome:'Consulente part-time (weekend + 2 gg)', costo_mensile:1100, costo_setup:0, impatto:0.6, note:'Copre sabato + 2 giorni, il resto il titolare' },
        ]},
        { id:'progettazione', nome:'Software progettazione 3D ambienti', tipo:'flag', obbligatorio:false, costo_mensile:50, costo_setup:500, impatto:0.2, note:'Rendering bagno/cucina/pavimenti per mostrare al cliente il risultato' },
      ]},
      '4': { cosa:'Agente esterno per cantieri e imprese edili', tempo_mesi:3, moduli:[
        { id:'agente', nome:'Figura commerciale B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agente', nome:'Agente plurimandatario edilizia', costo_mensile:800, costo_setup:500, impatto:1.0, note:'Provvigione 3-5%, visita cantieri, rapporti con capocantiere e geometri' },
          { id:'dip', nome:'Commerciale esterno dipendente', costo_mensile:2200, costo_setup:0, impatto:0.8, note:'Stipendio + auto, fidelizzato, dedica tutto il tempo alla rivendita' },
          { id:'parttime', nome:'Commerciale part-time', costo_mensile:1000, costo_setup:0, impatto:0.5, note:'Mattina visite cantieri, pomeriggio in showroom' },
        ]},
      ]},
      '5': { cosa:'Gare pubbliche MEPA + accordi quadro con costruttori/GC', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Resp. grandi clienti e gare', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. commerciale B2B dipendente', costo_mensile:3000, costo_setup:0, impatto:0.5, note:'Gare MEPA, capitolati, accordi quadro costruttori, rapporti studi' },
          { id:'fractional', nome:'Business developer fractional', costo_mensile:1500, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana, focus grandi commesse' },
        ]},
        { id:'gare', nome:'Preparazione gare pubbliche', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:1000, impatto:0.2, note:'Iscrizione MEPA, documentazione, qualificazione albo fornitori PA' },
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — vendite al banco senza storico', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con clienti principali, frequenza acquisti, volumi per categoria', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Fogli Google strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Cliente, tipo (impresa/privato/artigiano), ultimo acquisto, valore, prodotti top' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free/Zoho)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline preventivi + storico acquisti + reminder' },
        ]},
      ]},
      '3': { cosa:'CRM per follow-up preventivi e gestione clienti imprese', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM rivendita edile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'b2b', nome:'CRM B2B (Salesforce Essentials/Zoho CRM)', costo_mensile:60, costo_setup:300, impatto:1.0, note:'Pipeline preventivi imprese, follow-up, segmentazione per canale' },
          { id:'generico', nome:'CRM leggero (Pipedrive/Freshsales)', costo_mensile:30, costo_setup:200, impatto:0.65, note:'Pipeline base, reminder, storico' },
        ]},
      ]},
      '4': { cosa:'CRM + gestionale magazzino — stock, prezzi, listini per cliente', tempo_mesi:2, moduli:[
        { id:'integrazione', nome:'Gestionale integrato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'erp_edile', nome:'Gestionale rivendita edile (Danea/TeamSystem)', costo_mensile:400, costo_setup:2000, impatto:1.0, note:'Magazzino, listini per cliente, DDT, fatturazione, stock live' },
          { id:'modulare', nome:'CRM + gestionale separati', costo_mensile:200, costo_setup:1000, impatto:0.65, note:'CRM per vendite + Danea/Fatture in Cloud per magazzino/fatture' },
        ]},
      ]},
      '5': { cosa:'ERP completo — ordini, magazzino, logistica consegne, fatturazione, BI', tempo_mesi:3, moduli:[
        { id:'erp', nome:'ERP rivendita edile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP distribuzione (SAP B1/Mago4)', costo_mensile:800, costo_setup:5000, impatto:1.0, note:'Gestione completa: vendite, acquisti, magazzino, logistica, contabilita, BI' },
          { id:'mid', nome:'ERP mid-market (TeamSystem/Danea Enterprise)', costo_mensile:400, costo_setup:2500, impatto:0.65, note:'Funzionalita core, costo inferiore' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Ruoli banco/magazzino/showroom separati con mansionario', tempo_mesi:1, moduli:[
        { id:'organigramma', nome:'Organigramma e mansionario', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Banco vendita, magazzino/piazzale, showroom, consegne, admin — chi fa cosa' },
        { id:'resp_mag', nome:'Responsabile magazzino/piazzale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione interna', costo_mensile:0, costo_setup:200, impatto:1.0, note:'Magazziniere esperto promosso, conosce giacenze e prodotti' },
          { id:'esterno', nome:'Assunzione esterna', costo_mensile:300, costo_setup:0, impatto:0.8, note:'Esperienza in logistica edile' },
        ]},
      ]},
      '3': { cosa:'Addetti showroom + back-office ordini/fatturazione', tempo_mesi:2, moduli:[
        { id:'admin', nome:'Impiegata amministrativa/ordini', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Impiegata dipendente', costo_mensile:1800, costo_setup:0, impatto:0.7, note:'Ordini, DDT, fatture, rapporto fornitori, gestione crediti' },
          { id:'parttime', nome:'Impiegata part-time', costo_mensile:900, costo_setup:0, impatto:0.5, note:'4h/giorno' },
        ]},
      ]},
      '4': { cosa:'Responsabile commerciale + KPI per reparto', tempo_mesi:3, moduli:[
        { id:'resp_comm', nome:'Responsabile commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2800, costo_setup:0, impatto:1.0, note:'Coordinamento vendite banco/showroom/esterno, pricing, target' },
          { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1400, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
        { id:'kpi', nome:'Dashboard KPI per reparto', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Fatturato banco/showroom/esterno, margine per linea, rotazione scorte' },
      ]},
      '5': { cosa:'Management completo — il titolare fa solo strategia e sviluppo', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Store/Operations manager', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Store manager dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Gestione totale: personale, magazzino, showroom, consegne, clienti' },
          { id:'fractional', nome:'Operations manager fractional', costo_mensile:1500, costo_setup:0, impatto:0.65, note:'3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — magazzino gestito a vista', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Gestione ordini strutturata — conferma, tempi, consegna cantiere', tempo_mesi:1, moduli:[
        { id:'ordini', nome:'Processo ordini e preventivi', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Flusso: preventivo, conferma, picking magazzino, DDT, consegna/ritiro' },
        { id:'consegne', nome:'Procedura consegne in cantiere', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.2, note:'Orari consegna, scarico con gru/muletto, firma DDT, foto scarico' },
      ]},
      '3': { cosa:'Gestionale magazzino con giacenze, sotto-scorta e riordino', tempo_mesi:2, moduli:[
        { id:'wms', nome:'Software gestione magazzino', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dedicato', nome:'WMS per rivendita edile (Danea/Odoo)', costo_mensile:200, costo_setup:1500, impatto:1.0, note:'Giacenze per ubicazione (magazzino/piazzale/showroom), sotto-scorta, riordino' },
          { id:'base', nome:'Gestione magazzino base (Excel avanzato)', costo_mensile:0, costo_setup:500, impatto:0.5, note:'Foglio con giacenze e alert, aggiornamento manuale' },
        ]},
      ]},
      '4': { cosa:'Logistica consegne ottimizzata + gestione piazzale/scoperto', tempo_mesi:2, moduli:[
        { id:'logistica', nome:'Ottimizzazione consegne', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'software', nome:'Route planning + tracking consegne', costo_mensile:200, costo_setup:1000, impatto:1.0, note:'Pianificazione giri, tracking GPS mezzi, conferma consegna digitale' },
          { id:'manuale', nome:'Pianificazione manuale strutturata', costo_mensile:0, costo_setup:300, impatto:0.5, note:'Tabellone consegne settimanale, priorita per cantiere' },
        ]},
        { id:'piazzale', nome:'Gestione piazzale/scoperto', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.15, note:'Mappatura ubicazioni, rotazione materiali pesanti, safety zone' },
      ]},
      '5': { cosa:'ERP integrato + showroom management + consegne pianificate', tempo_mesi:4, moduli:[
        { id:'erp', nome:'ERP integrato rivendita', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'ERP completo (SAP B1/TeamSystem)', costo_mensile:800, costo_setup:5000, impatto:1.0, note:'Vendite, acquisti, magazzino, showroom, logistica, contabilita, tutto integrato' },
          { id:'modulare', nome:'Moduli separati integrati via API', costo_mensile:400, costo_setup:2500, impatto:0.6, note:'CRM + magazzino + fatturazione collegati, meno integrato' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine fisso da listino fornitore — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pricing differenziato per canale: imprese, artigiani, privati', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Listini per canale cliente', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8, note:'Prezzo diverso per impresa edile, artigiano, privato — margini ottimizzati' },
      ]},
      '3': { cosa:'Upsell showroom: finiture premium, accessori, posa consigliata', tempo_mesi:1, moduli:[
        { id:'upsell', nome:'Programma upsell showroom', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.6, note:'Checklist per venditori: proporre finiture superiori, battiscopa, sigillanti, posa' },
        { id:'posa', nome:'Servizio posa con artigiani convenzionati', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Rete posatori convenzionati, il cliente compra materiale + posa da noi' },
      ]},
      '4': { cosa:'Servizio consegna in cantiere a pagamento + noleggio attrezzature', tempo_mesi:2, moduli:[
        { id:'consegna', nome:'Consegna cantiere premium', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Consegna con gru, scarico al piano, orario concordato — servizio a pagamento' },
        { id:'noleggio', nome:'Noleggio attrezzature edili', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:1000, impatto:0.2, note:'Betoniere, ponteggi, tagliatrici — margine 30-40% sul noleggio' },
      ]},
      '5': { cosa:'Contratti quadro con costruttori + private label su linee base', tempo_mesi:3, moduli:[
        { id:'contratti', nome:'Accordi quadro costruttori', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'strutturato', nome:'Accordi quadro con 3-5 costruttori', costo_mensile:0, costo_setup:500, impatto:1.0, note:'Listino dedicato, priorita consegna, volumi garantiti, pagamento a 60gg' },
          { id:'spot', nome:'Forniture spot su richiesta', costo_mensile:0, costo_setup:0, impatto:0.4, note:'Preventivi caso per caso' },
        ]},
        { id:'pl', nome:'Private label su linee base', tipo:'flag', obbligatorio:false, costo_mensile:200, costo_setup:1000, impatto:0.2, note:'Cemento, malte, impermeabilizzanti con marchio proprio — margine +15-20%' },
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo posizione e insegna', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Google My Business + foto showroom, piazzale, consegne', tempo_mesi:1, moduli:[
        { id:'gmb', nome:'Google My Business ottimizzato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.6, note:'Foto showroom/piazzale/consegne, orari, risposte recensioni' },
        { id:'recensioni', nome:'Raccolta recensioni clienti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Richiesta recensione post-acquisto a imprese e privati soddisfatti' },
      ]},
      '3': { cosa:'Google Ads locali + portali edilizia (Edilportale)', tempo_mesi:2, moduli:[
        { id:'ads', nome:'Google Ads locali', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:500, impatto:0.5, note:'Campagne su "materiali edili + citta", "ceramiche + zona", "rivendita edile"' },
        { id:'portali', nome:'Portali edilizia (Edilportale/EdilPRO)', tipo:'flag', obbligatorio:false, costo_mensile:100, costo_setup:0, impatto:0.2, note:'Profilo aziendale, catalogo prodotti, richieste preventivo' },
      ]},
      '4': { cosa:'Social media: progetti realizzati, promozioni stagionali, video showroom', tempo_mesi:2, moduli:[
        { id:'social', nome:'Gestione social media', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Social media manager/agenzia', costo_mensile:700, costo_setup:500, impatto:1.0, note:'Piano editoriale: lavori realizzati, promo stagionali, novita showroom, reel' },
          { id:'interno', nome:'Social autogestiti', costo_mensile:200, costo_setup:200, impatto:0.4, note:'Il titolare/addetto pubblica 2-3 post/settimana' },
        ]},
      ]},
      '5': { cosa:'Piano marketing completo — eventi showroom, partnership architetti e progettisti', tempo_mesi:3, moduli:[
        { id:'piano', nome:'Piano marketing strutturato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing edilizia', costo_mensile:1800, costo_setup:2000, impatto:1.0, note:'Strategia: eventi showroom, partnership studi, fiere locali, digital' },
          { id:'freelance', nome:'Freelance marketing + tool', costo_mensile:800, costo_setup:500, impatto:0.6, note:'1 professionista, focus lead generation e contenuti' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito con catalogo prodotti, showroom virtuale, zona consegna', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito rivendita edile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom WordPress + catalogo', costo_mensile:30, costo_setup:2000, impatto:1.0, note:'Catalogo per categoria, foto showroom, zona consegna, form preventivo' },
          { id:'template', nome:'Sito da template', costo_mensile:20, costo_setup:600, impatto:0.55, note:'Template edilizia, meno personalizzabile' },
        ]},
      ]},
      '3': { cosa:'Catalogo ceramiche/finiture online + form preventivo dettagliato', tempo_mesi:2, moduli:[
        { id:'catalogo', nome:'Catalogo online con filtri', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1500, impatto:0.5, note:'Catalogo navigabile per tipo/marca/prezzo, schede con foto HD e specifiche' },
        { id:'form', nome:'Form preventivo dettagliato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.4, note:'Form con tipo lavoro, materiali, metratura, urgenza — lead qualificato' },
      ]},
      '4': { cosa:'Simulatore ambienti 3D + disponibilita stock online', tempo_mesi:2, moduli:[
        { id:'simulatore', nome:'Simulatore ambienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Simulatore 3D custom/integrato', costo_mensile:200, costo_setup:5000, impatto:1.0, note:'Il cliente carica foto stanza e prova ceramiche/pavimenti in ambiente reale' },
          { id:'saas', nome:'Tool SaaS (Tilesview/Roomvo)', costo_mensile:100, costo_setup:1000, impatto:0.55, note:'Plugin integrabile, libreria prodotti da caricare' },
        ]},
      ]},
      '5': { cosa:'Portale B2B — ordini imprese online, listini riservati, tracking consegne', tempo_mesi:3, moduli:[
        { id:'portale', nome:'Portale B2B imprese', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Portale B2B custom/Magento', costo_mensile:600, costo_setup:8000, impatto:1.0, note:'Ordini online, listini per cliente, stock live, tracking consegne, fatture' },
          { id:'mid', nome:'WooCommerce B2B', costo_mensile:200, costo_setup:3000, impatto:0.55, note:'E-commerce B2B con plugin, meno personalizzazione' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento materiali',
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 produttori abituali — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto fornitori su prodotti principali: ceramiche, cemento, laterizi', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database fornitori materiali edili', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda per produttore: listino, MOQ, tempi consegna, resa, qualita' },
      ]},
      '3': { cosa:'Accordi quadro con produttori ceramiche, cemento e laterizi', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro produttori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Prezzi bloccati con Marazzi/Keope/Buzzi/laterifici locali' },
        { id:'campionario', nome:'Campionario showroom aggiornato', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Campioni ceramiche/pavimenti/rivestimenti aggiornati da ogni produttore' },
      ]},
      '4': { cosa:'Buyer dedicato — diversificazione fornitori, import diretto', tempo_mesi:2, moduli:[
        { id:'buyer', nome:'Buyer materiali edili', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer dipendente', costo_mensile:2200, costo_setup:0, impatto:1.0, note:'Negoziazione produttori, import ceramiche, gestione scorte, qualita' },
          { id:'parttime', nome:'Buyer part-time/admin con delega', costo_mensile:1000, costo_setup:0, impatto:0.6, note:'Gestisce riordini, confronto listini, rapporto fornitori' },
        ]},
      ]},
      '5': { cosa:'Resp. acquisti — contratti volume, stoccaggio strategico, import diretto', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Responsabile supply chain', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Supply chain manager dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Strategia acquisti, import diretto ceramiche (Spagna/Turchia), stoccaggio, logistica' },
          { id:'fractional', nome:'Supply chain manager fractional', costo_mensile:1500, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO RICAMBI AUTO
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_ricambi_auto: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare al banco — officine vengono quando serve', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Visite proattive a officine e carrozzerie della zona', tempo_mesi:1, moduli:[
        { id:'analisi', nome:'Analisi officine zona', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.6, note:'Mappatura officine/carrozzerie/gommisti nel raggio consegna, classificazione A/B/C' },
        { id:'visite', nome:'Piano visite officine', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.3, note:'1-2 giorni/settimana: presentazione gamma, novita, promozioni' },
      ]},
      '3': { cosa:'Sviluppo flotte aziendali e noleggiatori — contratti fornitura', tempo_mesi:2, moduli:[
        { id:'flotte', nome:'Sviluppo canale flotte/NLT', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:300, impatto:0.7, note:'Contatto gestori flotte, noleggiatori, aziende con parco auto >10 veicoli' },
        { id:'catalogo_flotte', nome:'Catalogo dedicato flotte', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Listino per manutenzione programmata: kit tagliando, freni, filtri per modello' },
      ]},
      '4': { cosa:'Agente dedicato officine fuori zona + inside sales telefonico', tempo_mesi:3, moduli:[
        { id:'agente', nome:'Agente esterno officine', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agente', nome:'Agente ENASARCO aftermarket', costo_mensile:800, costo_setup:500, impatto:1.0, note:'Provvigione 3-5%, porta portafoglio officine fuori zona attuale' },
          { id:'dip', nome:'Commerciale dipendente esterno', costo_mensile:2200, costo_setup:0, impatto:0.8, note:'Fisso + auto + incentivi, fidelizzato' },
        ]},
        { id:'inside', nome:'Inside sales telefonico', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'dip', nome:'Inside sales dipendente', costo_mensile:1800, costo_setup:0, impatto:0.25, note:'Telefono per riordini, follow-up, offerte settimanali a officine B/C' },
          { id:'parttime', nome:'Inside sales part-time', costo_mensile:900, costo_setup:0, impatto:0.15, note:'4h/giorno, focus riattivazione e riordini' },
        ]},
      ]},
      '5': { cosa:'Dir. commerciale + e-commerce ricambi + rete officine convenzionate', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Direttore commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale dipendente', costo_mensile:3000, costo_setup:0, impatto:0.5, note:'Coordinamento agenti, pricing, sviluppo e-commerce, accordi flotte' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1500, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
        { id:'rete', nome:'Programma officine convenzionate', tipo:'flag', obbligatorio:false, costo_mensile:200, costo_setup:1000, impatto:0.2, note:'Network officine con insegna/convenzione, listino dedicato, promozioni esclusive' },
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — vendite al banco e telefono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con officine clienti, frequenza e volumi per categoria ricambio', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Fogli Google strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Officina, ultimo ordine, frequenza, categorie top (freni, filtri, olio, ecc.)' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free/Zoho)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline + storico ordini + reminder riordino' },
        ]},
      ]},
      '3': { cosa:'Gestionale ricambi con catalogo TecDoc integrato', tempo_mesi:1, moduli:[
        { id:'gestionale', nome:'Gestionale ricambi + TecDoc', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Gestionale ricambi (Sicipart/InforAuto/PartFinder)', costo_mensile:150, costo_setup:800, impatto:1.0, note:'Ricerca per targa/VIN, equivalenze OE/aftermarket, giacenze, ordine' },
          { id:'tecdoc', nome:'TecDoc standalone + gestionale generico', costo_mensile:80, costo_setup:500, impatto:0.65, note:'Licenza TecDoc + Danea/FiC per fatturazione, meno integrato' },
        ]},
      ]},
      '4': { cosa:'CRM + gestionale integrato — storico officina, margini, alert riordini', tempo_mesi:2, moduli:[
        { id:'crm_gestionale', nome:'CRM + gestionale ricambi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'integrato', nome:'Gestionale ricambi con CRM integrato (Sicipart Pro)', costo_mensile:400, costo_setup:2000, impatto:1.0, note:'TecDoc + magazzino + CRM + storico per officina + alert riordino' },
          { id:'separato', nome:'CRM + gestionale separati via API', costo_mensile:200, costo_setup:1000, impatto:0.65, note:'Pipedrive/Zoho + gestionale ricambi collegati' },
        ]},
      ]},
      '5': { cosa:'ERP ricambi completo — ordini, magazzino, TecDoc, logistica, fatturazione', tempo_mesi:3, moduli:[
        { id:'erp', nome:'ERP ricambi auto', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP aftermarket (Sicipart Enterprise/PartsPoint)', costo_mensile:800, costo_setup:5000, impatto:1.0, note:'TecDoc, magazzino, ordini multi-fornitore, logistica, e-commerce B2B, BI' },
          { id:'mid', nome:'ERP mid-market + modulo TecDoc', costo_mensile:400, costo_setup:2500, impatto:0.6, note:'TeamSystem/Danea + plugin TecDoc, meno specifico' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Ruoli banco/magazzino/consegne separati con mansionario', tempo_mesi:1, moduli:[
        { id:'organigramma', nome:'Organigramma e mansionario', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Bancone (ricerca + vendita), magazzino (picking + inventario), consegne, admin' },
        { id:'resp_mag', nome:'Responsabile magazzino', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione interna magazziniere', costo_mensile:0, costo_setup:200, impatto:1.0, note:'Conosce le giacenze, i codici, le ubicazioni' },
          { id:'esterno', nome:'Assunzione resp. magazzino', costo_mensile:300, costo_setup:0, impatto:0.8, note:'Esperienza logistica ricambi' },
        ]},
      ]},
      '3': { cosa:'Procedure ordini urgenti + back-office formalizzato', tempo_mesi:2, moduli:[
        { id:'admin', nome:'Impiegata commerciale/ordini', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Impiegata dipendente', costo_mensile:1800, costo_setup:0, impatto:0.7, note:'Ordini, DDT, fatture, resi, gestione crediti, rapporto distributori' },
          { id:'parttime', nome:'Impiegata part-time', costo_mensile:900, costo_setup:0, impatto:0.5, note:'4h/giorno' },
        ]},
      ]},
      '4': { cosa:'KPI evasione ordini + tempi consegna + responsabile operativo', tempo_mesi:3, moduli:[
        { id:'resp_ops', nome:'Responsabile operativo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. operativo dipendente', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Gestione magazzino, logistica consegne, personale, KPI evasione' },
          { id:'fractional', nome:'Resp. operativo fractional', costo_mensile:1200, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
        { id:'kpi', nome:'Dashboard KPI', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Tempo evasione ordine, fill rate, resi, margine per officina' },
      ]},
      '5': { cosa:'Management completo — commerciale + operations strutturati', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Direttore operativo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'COO/Dir. operativo dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Gestione totale day-to-day, il titolare fa sviluppo business' },
          { id:'fractional', nome:'COO fractional', costo_mensile:1800, costo_setup:0, impatto:0.65, note:'3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ricerca manuale su cataloghi cartacei', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Catalogo elettronico TecDoc per ricerca per targa/VIN + equivalenze', tempo_mesi:1, moduli:[
        { id:'tecdoc', nome:'Licenza TecDoc/catalogo elettronico', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'tecdoc', nome:'TecDoc (licenza ufficiale)', costo_mensile:80, costo_setup:300, impatto:1.0, note:'Ricerca per targa/VIN, equivalenze OE-aftermarket, applicazioni veicolo' },
          { id:'alternativo', nome:'Catalogo alternativo (PartsLink24/InfoRicambi)', costo_mensile:50, costo_setup:200, impatto:0.7, note:'Catalogo ricambi con ricerca veicolo, meno marchi aftermarket' },
        ]},
      ]},
      '3': { cosa:'Gestionale magazzino con giacenze, sotto-scorta e riordino automatico', tempo_mesi:2, moduli:[
        { id:'wms', nome:'Software gestione magazzino ricambi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'WMS ricambi (Sicipart/InforAuto)', costo_mensile:200, costo_setup:1500, impatto:1.0, note:'Giacenze per ubicazione, sotto-scorta per codice, riordino automatico, inventario rotativo' },
          { id:'generico', nome:'Gestionale generico (Danea/Odoo)', costo_mensile:100, costo_setup:800, impatto:0.6, note:'Gestione base giacenze, meno automazione specifica ricambi' },
        ]},
      ]},
      '4': { cosa:'Logistica consegne express — route planning, tracking, 2 giri/giorno', tempo_mesi:2, moduli:[
        { id:'logistica', nome:'Ottimizzazione consegne express', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'software', nome:'Route planning + tracking GPS', costo_mensile:150, costo_setup:1000, impatto:1.0, note:'Pianificazione 2 giri/giorno, tracking real-time, conferma consegna digitale' },
          { id:'manuale', nome:'Pianificazione giri manuale strutturata', costo_mensile:0, costo_setup:300, impatto:0.5, note:'Tabellone giri mattina/pomeriggio, priorita per urgenza' },
        ]},
        { id:'urgenze', nome:'Procedura ordini urgenti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.15, note:'Flusso urgenze: ordine, verifica stock, eventuale richiesta a distributore, consegna entro 2h' },
      ]},
      '5': { cosa:'ERP integrato + gestione resi/garanzie + qualita aftermarket', tempo_mesi:3, moduli:[
        { id:'erp', nome:'ERP ricambi integrato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'ERP aftermarket (Sicipart Enterprise)', costo_mensile:700, costo_setup:4000, impatto:1.0, note:'Tutto integrato: TecDoc, magazzino, ordini multi-fornitore, resi, garanzie, fatturazione' },
          { id:'modulare', nome:'Moduli separati integrati', costo_mensile:350, costo_setup:2000, impatto:0.55, note:'Gestionale + TecDoc + fatturazione collegati via API' },
        ]},
        { id:'resi', nome:'Procedura resi e garanzie strutturata', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.15, note:'Modulo reso, tracciamento garanzia fornitore, nota credito automatica' },
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine da listino — nessuna differenziazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pricing differenziato: officine abituali, occasionali, flotte', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Listini per tipologia cliente', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8, note:'Sconto diverso per officina abituale, occasionale, carrozzeria, flotta' },
      ]},
      '3': { cosa:'Upsell kit manutenzione: filtri + olio + pastiglie in pacchetto', tempo_mesi:1, moduli:[
        { id:'kit', nome:'Kit manutenzione pre-confezionati', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.6, note:'Kit tagliando per modello: filtri + olio + candele + pastiglie — margine +15%' },
        { id:'correlati', nome:'Suggerimento prodotti correlati (cross-selling)', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.2, note:'Al banco/online: "Per questo lavoro serve anche..." — aumento scontrino medio' },
      ]},
      '4': { cosa:'Contratti fornitura annuali con officine + consegna express a pagamento', tempo_mesi:2, moduli:[
        { id:'contratti', nome:'Contratti fornitura officine', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Accordo annuale: sconto volume, priorita consegna, pagamento 30gg' },
        { id:'express', nome:'Servizio consegna express premium', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Consegna entro 1h a pagamento (5-10 euro), servizio differenziante' },
      ]},
      '5': { cosa:'Private label su consumabili + revenue e-commerce B2C', tempo_mesi:3, moduli:[
        { id:'pl', nome:'Private label consumabili', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completa', nome:'Linea PL completa (olio, filtri, pastiglie)', costo_mensile:300, costo_setup:1500, impatto:1.0, note:'Marchio proprio su consumabili ad alta rotazione, margine +20-25%' },
          { id:'parziale', nome:'PL solo su 1-2 categorie (filtri o olio)', costo_mensile:100, costo_setup:500, impatto:0.5, note:'Inizio graduale su categoria a piu alta rotazione' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo posizione e insegna', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Google My Business + WhatsApp Business per ordini rapidi', tempo_mesi:1, moduli:[
        { id:'gmb', nome:'Google My Business ottimizzato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Foto magazzino, orari, marchi trattati, risposte recensioni' },
        { id:'whatsapp', nome:'WhatsApp Business per ordini', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Catalogo WhatsApp, ordini rapidi via chat, conferma disponibilita istantanea' },
      ]},
      '3': { cosa:'Google Ads locali + promozioni stagionali per officine', tempo_mesi:2, moduli:[
        { id:'ads', nome:'Google Ads locali', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:500, impatto:0.5, note:'Campagne su "ricambi auto + citta", "autoricambi + zona"' },
        { id:'promo', nome:'Promozioni stagionali officine', tipo:'flag', obbligatorio:false, costo_mensile:200, costo_setup:200, impatto:0.3, note:'Volantino/email: promo pneumatici inverno, kit clima estate, pastiglie, ecc.' },
      ]},
      '4': { cosa:'Programma fidelizzazione officine + eventi/formazione tecnica', tempo_mesi:2, moduli:[
        { id:'fidelity', nome:'Programma fidelizzazione officine', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'strutturato', nome:'Programma punti/premi per officine', costo_mensile:300, costo_setup:1000, impatto:1.0, note:'Punti su acquisti, premi (attrezzatura, formazione, viaggi), esclusiva' },
          { id:'semplice', nome:'Sconti progressivi a volume', costo_mensile:0, costo_setup:300, impatto:0.5, note:'Fasce sconto automatiche per volume annuo raggiunto' },
        ]},
      ]},
      '5': { cosa:'Piano marketing completo — digital + partnership reti officine + brand', tempo_mesi:3, moduli:[
        { id:'piano', nome:'Piano marketing aftermarket', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing automotive', costo_mensile:1500, costo_setup:2000, impatto:1.0, note:'Strategia: digital, fidelizzazione, brand, partnership, eventi' },
          { id:'interno', nome:'Marketing manager interno + tool', costo_mensile:800, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito vetrina con marchi trattati, zona consegna, contatti', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito ricambi auto', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom WordPress', costo_mensile:30, costo_setup:1500, impatto:1.0, note:'Marchi, categorie, zona consegna, form richiesta rapida per targa' },
          { id:'template', nome:'Sito da template', costo_mensile:20, costo_setup:500, impatto:0.55, note:'Template base, landing page con contatti' },
        ]},
      ]},
      '3': { cosa:'Ricerca ricambi online per targa/VIN + richiesta preventivo', tempo_mesi:2, moduli:[
        { id:'ricerca', nome:'Motore ricerca ricambi per targa', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'tecdoc_web', nome:'TecDoc Web integrato nel sito', costo_mensile:200, costo_setup:3000, impatto:1.0, note:'Ricerca per targa/VIN, risultati con equivalenze, richiesta preventivo online' },
          { id:'form', nome:'Form richiesta per targa (manuale)', costo_mensile:0, costo_setup:500, impatto:0.4, note:'Il cliente inserisce targa e ricambio, noi rispondiamo con preventivo' },
        ]},
      ]},
      '4': { cosa:'E-commerce ricambi B2B — ordini online con listini officina', tempo_mesi:2, moduli:[
        { id:'ecommerce', nome:'E-commerce ricambi B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'E-commerce aftermarket (PartsCat/custom)', costo_mensile:500, costo_setup:6000, impatto:1.0, note:'Ricerca TecDoc, listini per officina, ordine diretto, stock live, DDT automatico' },
          { id:'generico', nome:'WooCommerce B2B + catalogo', costo_mensile:200, costo_setup:2500, impatto:0.5, note:'E-commerce con login officina, prezzi dedicati, meno integrato' },
        ]},
      ]},
      '5': { cosa:'Piattaforma B2B/B2C completa — ordini, tracking, resi, fatturazione', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma ricambi completa', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Piattaforma aftermarket enterprise', costo_mensile:1200, costo_setup:12000, impatto:1.0, note:'B2B + B2C, TecDoc integrato, ordini, tracking spedizioni, resi, fatturazione, app mobile' },
          { id:'mid', nome:'E-commerce avanzato (PrestaShop/Magento)', costo_mensile:500, costo_setup:5000, impatto:0.55, note:'E-commerce multi-canale, meno specifico per aftermarket' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento ricambi',
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 distributori abituali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto prezzi tra distributori (Rhiag, LKQ, Autodis, Stahlgruber)', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database distributori aftermarket', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda per distributore: listino, sconti, tempi consegna, resi, catalogo online' },
      ]},
      '3': { cosa:'Accordi quadro con 3-4 distributori — sconti volume e priorita consegna', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro distributori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Contratti con Rhiag, LKQ, Autodis: sconti per volume, 2 consegne/giorno, resi facili' },
        { id:'multi_ordine', nome:'Piattaforma ordini multi-distributore', tipo:'flag', obbligatorio:false, costo_mensile:50, costo_setup:300, impatto:0.15, note:'Software per confrontare prezzo/disponibilita tra distributori e ordinare dal migliore' },
      ]},
      '4': { cosa:'Buyer dedicato — ottimizzazione stock, aftermarket alternativo, import', tempo_mesi:2, moduli:[
        { id:'buyer', nome:'Buyer ricambi aftermarket', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer aftermarket dipendente', costo_mensile:2000, costo_setup:0, impatto:1.0, note:'Ottimizzazione stock, negoziazione distributori, sourcing aftermarket alternativo' },
          { id:'parttime', nome:'Buyer part-time/admin con delega', costo_mensile:900, costo_setup:0, impatto:0.6, note:'Gestisce riordini, confronto prezzi, rapporto distributori' },
        ]},
      ]},
      '5': { cosa:'Resp. acquisti — contratti quadro, private label, import aftermarket Asia', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Responsabile supply chain aftermarket', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Supply chain manager dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Strategia acquisti, import aftermarket (Asia/Est Europa), PL, ottimizzazione stock' },
          { id:'fractional', nome:'Supply chain manager fractional', costo_mensile:1500, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO ABBIGLIAMENTO INGROSSO
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_abbigliamento_ingrosso: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare vende direttamente — showroom e fiere', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Campionario stagionale proattivo inviato ai buyer dei negozi', tempo_mesi:1, moduli:[
        { id:'campionario', nome:'Kit campionario stagionale', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.6, note:'Campionatura SS/FW preparata e inviata a lista buyer selezionati' },
        { id:'lookbook', nome:'Lookbook fotografico professionale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.3, note:'Foto still-life + indossato per ogni modello, PDF + Instagram' },
      ]},
      '3': { cosa:'Agente moda plurimandatario con portafoglio negozi zona', tempo_mesi:2, moduli:[
        { id:'agente', nome:'Agente moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'plurimandatario', nome:'Agente ENASARCO plurimandatario moda', costo_mensile:800, costo_setup:500, impatto:1.0, note:'Provvigione 8-12%, porta portafoglio negozi/boutique della zona' },
          { id:'monomandatario', nome:'Agente monomandatario', costo_mensile:1500, costo_setup:0, impatto:0.8, note:'Fisso + provvigione, dedicato solo al nostro brand' },
          { id:'showroom', nome:'Showroom multibrand (affitto spazio)', costo_mensile:600, costo_setup:1000, impatto:0.6, note:'Spazio in showroom condiviso, i buyer vengono da soli' },
        ]},
      ]},
      '4': { cosa:'2-3 agenti per macro-zona + copertura regionale/nazionale', tempo_mesi:3, moduli:[
        { id:'rete', nome:'Rete agenti zonale', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'plurimandatario', nome:'Agente plurimandatario moda', costo_mensile:800, costo_setup:500, impatto:0.3, note:'Per zona: Nord-Ovest, Nord-Est, Centro, Sud' },
          { id:'monomandatario', nome:'Agente monomandatario', costo_mensile:1500, costo_setup:0, impatto:0.25, note:'Dedicato, per zone ad alto potenziale' },
        ]},
      ]},
      '5': { cosa:'Dir. commerciale + rete agenti nazionale + showroom permanente', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Direttore commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale dipendente', costo_mensile:3000, costo_setup:0, impatto:0.5, note:'Coordinamento agenti, campagne vendita, pricing, sviluppo estero' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1500, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana, focus strategia e campagne' },
        ]},
        { id:'showroom', nome:'Showroom permanente', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'proprio', nome:'Showroom proprio (affitto + allestimento)', costo_mensile:1500, costo_setup:5000, impatto:0.2, note:'Spazio dedicato per campagne vendita e visite buyer' },
          { id:'condiviso', nome:'Spazio in showroom multibrand', costo_mensile:600, costo_setup:1000, impatto:0.1, note:'Corner in showroom condiviso, costi ridotti' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini su carta e telefono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con buyer, ordini stagionali, pagamenti e preferenze', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento buyer', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Fogli Google strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Buyer, negozio, zona, ordine SS/FW, valore, pagamenti, preferenze taglie/colori' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free/Zoho)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline campagna vendita + storico ordini + reminder' },
        ]},
      ]},
      '3': { cosa:'CRM moda con anagrafica buyer, storico ordini, preferenze stile', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM fashion wholesale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'CRM/gestionale moda (NuOrder/Joor lite)', costo_mensile:200, costo_setup:500, impatto:1.0, note:'Anagrafica buyer, lookbook digitale, ordini per campagna, storico' },
          { id:'generico', nome:'CRM generico (Pipedrive/Zoho CRM)', costo_mensile:50, costo_setup:300, impatto:0.6, note:'Pipeline vendita, meno specifico per fashion' },
        ]},
      ]},
      '4': { cosa:'Gestionale ordini moda integrato — campionario, taglie, consegne', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Gestionale ordini fashion', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'fashion', nome:'Gestionale moda (Gest.Fashion/Cegid Y2)', costo_mensile:500, costo_setup:1500, impatto:1.0, note:'Ordini per campagna, griglia taglie/colori, magazzino, spedizioni, fatturazione' },
          { id:'generico', nome:'Gestionale generico + foglio taglie', costo_mensile:200, costo_setup:800, impatto:0.55, note:'Danea/FiC con gestione manuale griglia taglie' },
        ]},
      ]},
      '5': { cosa:'ERP fashion completo — ordini, campionario, magazzino, spedizioni, BI', tempo_mesi:3, moduli:[
        { id:'erp', nome:'ERP fashion wholesale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP moda (Cegid Y2/Stealth/K3 Fashion)', costo_mensile:1000, costo_setup:4000, impatto:1.0, note:'Ordini, griglia taglie, magazzino, produzione, spedizioni, fatturazione, BI' },
          { id:'mid', nome:'Gestionale moda mid-market', costo_mensile:500, costo_setup:2000, impatto:0.6, note:'Funzionalita core fashion, meno personalizzabile' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pianificazione campagne vendita stagionali SS/FW', tempo_mesi:1, moduli:[
        { id:'calendario', nome:'Calendario campagne vendita', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Timeline: sviluppo collezione, campionario, campagna vendita, produzione, consegna' },
        { id:'showroom_mgr', nome:'Addetto showroom/campionario', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Addetto showroom dipendente', costo_mensile:1800, costo_setup:0, impatto:0.8, note:'Gestione campionario, accoglienza buyer, preparazione ordini' },
          { id:'stagionale', nome:'Addetto stagionale (campagne)', costo_mensile:1200, costo_setup:0, impatto:0.5, note:'Solo durante campagne vendita (4-5 mesi/anno)' },
        ]},
      ]},
      '3': { cosa:'Magazziniere/spedizioniere + back-office ordini', tempo_mesi:2, moduli:[
        { id:'magazzino', nome:'Magazziniere/spedizioniere', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Magazziniere dipendente', costo_mensile:1600, costo_setup:0, impatto:0.7, note:'Picking, packing, spedizioni, inventario, resi' },
          { id:'parttime', nome:'Magazziniere part-time', costo_mensile:800, costo_setup:0, impatto:0.5, note:'Durante picchi di spedizione (post-campagna)' },
        ]},
        { id:'admin', nome:'Impiegata ordini/amministrazione', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'dip', nome:'Impiegata dipendente', costo_mensile:1800, costo_setup:0, impatto:0.2, note:'Conferme ordine, fatture, gestione crediti, rapporto agenti' },
          { id:'parttime', nome:'Impiegata part-time', costo_mensile:900, costo_setup:0, impatto:0.15, note:'4h/giorno' },
        ]},
      ]},
      '4': { cosa:'KPI per agente + obiettivi stagione + responsabile vendite', tempo_mesi:3, moduli:[
        { id:'resp_vendite', nome:'Responsabile vendite', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Sales manager dipendente', costo_mensile:2800, costo_setup:0, impatto:1.0, note:'Coordinamento agenti, campagne vendita, pricing, analisi sell-through' },
          { id:'fractional', nome:'Sales manager fractional', costo_mensile:1400, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana, focus campagne e agenti' },
        ]},
        { id:'kpi', nome:'Dashboard KPI agenti/campagna', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Ordini per agente, per zona, per campagna, sell-through, resi' },
      ]},
      '5': { cosa:'Management completo — il titolare fa solo sviluppo prodotto e brand', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Direttore operativo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'COO/Dir. operativo dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Gestione totale: vendite, produzione, logistica, il titolare fa brand e prodotto' },
          { id:'fractional', nome:'COO fractional', costo_mensile:1800, costo_setup:0, impatto:0.65, note:'3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ordini gestiti a voce e su carta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Catalogo digitale PDF + listino prezzi con griglia taglie/colori', tempo_mesi:1, moduli:[
        { id:'catalogo', nome:'Catalogo e listino digitale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.7, note:'PDF con foto, codici, prezzi, griglia taglie disponibili per modello' },
        { id:'ordine', nome:'Modulo ordine strutturato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.2, note:'Modulo con griglia taglie/colori, condizioni, consegna prevista' },
      ]},
      '3': { cosa:'Gestionale ordini fashion con conferma automatica e tracking spedizione', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Gestionale ordini moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'fashion', nome:'Gestionale moda (Gest.Fashion/Tekla)', costo_mensile:250, costo_setup:1000, impatto:1.0, note:'Ordini per campagna, griglia taglie, conferma auto, tracking, resi' },
          { id:'generico', nome:'Gestionale generico + Excel griglia', costo_mensile:100, costo_setup:500, impatto:0.5, note:'Fatture in Cloud/Danea + fogli Excel per griglia taglie' },
        ]},
      ]},
      '4': { cosa:'Campionario digitale su tablet + ordini agenti in tempo reale', tempo_mesi:2, moduli:[
        { id:'campionario_dig', nome:'App campionario digitale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'App wholesale (NuOrder/Joor/Ordre)', costo_mensile:400, costo_setup:2000, impatto:1.0, note:'Agente mostra collezione su tablet, buyer ordina in tempo reale, stock live' },
          { id:'pdf', nome:'Lookbook PDF interattivo + form ordine', costo_mensile:50, costo_setup:500, impatto:0.4, note:'PDF sfogliabile con link a form ordine, meno integrato' },
        ]},
      ]},
      '5': { cosa:'ERP fashion completo — ordini, produzione, magazzino, spedizioni, resi', tempo_mesi:3, moduli:[
        { id:'erp', nome:'ERP fashion wholesale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP moda (Cegid Y2/K3 Fashion)', costo_mensile:800, costo_setup:4000, impatto:1.0, note:'Ordini campagna, griglia taglie, produzione, magazzino, spedizioni, resi, BI' },
          { id:'mid', nome:'Gestionale moda mid-market', costo_mensile:400, costo_setup:2000, impatto:0.55, note:'Core fashion features, meno reporting avanzato' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine fisso su listino — nessuna strategia pricing', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sconti volume differenziati per fasce ordine e fidelizzazione', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Matrice sconti per fascia/fidelizzazione', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8, note:'Sconti per volume ordine, per fidelizzazione (nuovo vs storico), per pagamento anticipato' },
      ]},
      '3': { cosa:'Linea pronto moda per riordini rapidi a margine superiore', tempo_mesi:2, moduli:[
        { id:'pronto', nome:'Linea pronto moda/continuativo', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.7, note:'Capi basici/best-seller sempre disponibili a magazzino, margine +15-20% vs campionario' },
        { id:'flash', nome:'Flash collection (capsule fuori stagione)', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.15, note:'Mini-collezioni intermedie per generare riordini tra una campagna e altra' },
      ]},
      '4': { cosa:'Mix prodotto ottimizzato: campionario + pronto + fine serie + outlet', tempo_mesi:2, moduli:[
        { id:'mix', nome:'Ottimizzazione mix prodotto', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Analisi sell-through per categoria, ottimizzazione campionario vs pronto vs fine serie' },
        { id:'outlet', nome:'Canale outlet/stock per fine serie', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Vendita stock a stockisti/outlet online, libera magazzino, recupera margine' },
      ]},
      '5': { cosa:'Private label per catene + dynamic pricing per fase stagione', tempo_mesi:4, moduli:[
        { id:'pl', nome:'Sviluppo private label', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completa', nome:'Linea PL per catene/gruppi acquisto', costo_mensile:500, costo_setup:2000, impatto:1.0, note:'Produzione con marchio del cliente, margine inferiore ma volumi garantiti' },
          { id:'capsule', nome:'Capsule PL per 1-2 clienti top', costo_mensile:200, costo_setup:800, impatto:0.5, note:'Test con clienti migliori, volumi ridotti' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo fiere e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Instagram B2B con foto collezioni + WhatsApp broadcast per buyer', tempo_mesi:1, moduli:[
        { id:'instagram', nome:'Profilo Instagram B2B', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Foto still-life e indossato, stories showroom, tag buyer' },
        { id:'whatsapp', nome:'WhatsApp broadcast per buyer', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Novita collezione, disponibilita pronto moda, promozioni fine stagione' },
      ]},
      '3': { cosa:'Fiere moda (Pitti, MICAM, White, TheOne) + social professionale', tempo_mesi:2, moduli:[
        { id:'fiere', nome:'Partecipazione fiere moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'stand', nome:'Stand espositivo (Pitti/White/MICAM)', costo_mensile:300, costo_setup:5000, impatto:1.0, note:'Stand 12-24 mq, allestimento, campionario, 1-2 fiere/anno' },
          { id:'visitatore', nome:'Visita come operatore + networking', costo_mensile:100, costo_setup:1000, impatto:0.4, note:'Biglietti, eventi B2B, contatto buyer, niente stand' },
        ]},
      ]},
      '4': { cosa:'Lookbook digitale + email marketing buyer + eventi showroom stagionali', tempo_mesi:2, moduli:[
        { id:'lookbook', nome:'Produzione lookbook professionale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'pro', nome:'Lookbook con fotografo/agenzia', costo_mensile:500, costo_setup:2000, impatto:1.0, note:'Shooting SS/FW, still-life + indossato, video, distribuzione digitale' },
          { id:'base', nome:'Lookbook foto interne + grafica', costo_mensile:200, costo_setup:500, impatto:0.5, note:'Foto in showroom, grafica freelance, PDF + social' },
        ]},
        { id:'email', nome:'Email marketing per buyer', tipo:'flag', obbligatorio:false, costo_mensile:50, costo_setup:200, impatto:0.2, note:'Newsletter stagionale, novita pronto moda, inviti eventi — Mailchimp/Brevo' },
      ]},
      '5': { cosa:'Piano marketing B2B completo — brand positioning, PR moda, fiere internazionali', tempo_mesi:4, moduli:[
        { id:'piano', nome:'Piano marketing fashion B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Ufficio stampa/agenzia PR moda', costo_mensile:2000, costo_setup:3000, impatto:1.0, note:'PR su riviste trade, influencer B2B, eventi, fiere internazionali (Premium Berlin, Who is Next)' },
          { id:'interno', nome:'Marketing manager moda interno', costo_mensile:1000, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata a marketing, social, fiere, lookbook' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina vetrina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito vetrina con collezioni, showroom, brand story', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito brand moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom WordPress (design moda)', costo_mensile:30, costo_setup:2000, impatto:1.0, note:'Design editoriale, gallery collezioni, brand story, contatti agenti' },
          { id:'template', nome:'Sito da template fashion (Squarespace/Cargo)', costo_mensile:20, costo_setup:600, impatto:0.55, note:'Template moda, meno personalizzabile' },
        ]},
      ]},
      '3': { cosa:'Lookbook online interattivo + richiesta campionario/login buyer', tempo_mesi:2, moduli:[
        { id:'lookbook_online', nome:'Lookbook online interattivo', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1500, impatto:0.5, note:'Collezione sfogliabile online, zoom dettagli, download schede prodotto' },
        { id:'form_buyer', nome:'Area buyer con richiesta campionario', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.4, note:'Form per buyer: richiesta appuntamento showroom, campionario, listino' },
      ]},
      '4': { cosa:'Portale B2B wholesale — ordini online con griglia taglie/colori', tempo_mesi:3, moduli:[
        { id:'b2b', nome:'Portale wholesale B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Piattaforma wholesale (NuOrder/Joor/Centra)', costo_mensile:500, costo_setup:5000, impatto:1.0, note:'Ordini per campagna, griglia taglie/colori, listini per buyer, stock live' },
          { id:'woocommerce', nome:'WooCommerce B2B + plugin moda', costo_mensile:200, costo_setup:2000, impatto:0.5, note:'E-commerce con login buyer, prezzi dedicati, meno specifico fashion' },
        ]},
      ]},
      '5': { cosa:'Piattaforma wholesale completa — preordini, riassortimenti, tracking, analytics', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma wholesale enterprise', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'NuOrder/Joor/Ordre Enterprise', costo_mensile:1000, costo_setup:10000, impatto:1.0, note:'Preordini campagna, riassortimenti pronto moda, tracking spedizioni, sell-through analytics' },
          { id:'custom', nome:'Portale B2B custom', costo_mensile:500, costo_setup:5000, impatto:0.55, note:'Sviluppo ad hoc, meno features standard ma piu personalizzato' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento collezioni',
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 fornitori abituali a fiera', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Scouting fornitori a fiere moda — confronto prezzi, MOQ, qualita', tempo_mesi:1, moduli:[
        { id:'scouting', nome:'Scouting fornitori fiere', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.7, note:'Visita Premiere Vision, Texworld, fiere filati — campionature, listini, MOQ' },
      ]},
      '3': { cosa:'Buyer/product manager — sourcing Italia, Turchia, Portogallo', tempo_mesi:2, moduli:[
        { id:'buyer', nome:'Buyer moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer/product manager dipendente', costo_mensile:2200, costo_setup:0, impatto:1.0, note:'Sourcing tessuti/produzione, campionature, controllo qualita, trend analysis' },
          { id:'freelance', nome:'Buyer freelance/consulente', costo_mensile:1000, costo_setup:0, impatto:0.6, note:'A progetto, per campagna, esperto del segmento' },
        ]},
      ]},
      '4': { cosa:'Import diretto — Cina, Bangladesh, Turchia — con controllo qualita', tempo_mesi:3, moduli:[
        { id:'import', nome:'Canale import diretto', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agente', nome:'Agente di acquisto in loco (sourcing agent)', costo_mensile:1500, costo_setup:2000, impatto:1.0, note:'Agente in Cina/Bangladesh, controllo qualita, gestione produzione, spedizione' },
          { id:'diretto', nome:'Import diretto con viaggi periodici', costo_mensile:500, costo_setup:1000, impatto:0.6, note:'2-3 viaggi/anno, contatto diretto fabbriche, rischio qualita maggiore' },
        ]},
      ]},
      '5': { cosa:'Resp. supply chain — diversificazione fornitori, PL, near-shoring', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Responsabile supply chain moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Supply chain manager moda dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Strategia sourcing, mix Italia/estero, sviluppo PL, sostenibilita, near-shoring' },
          { id:'fractional', nome:'Supply chain manager fractional', costo_mensile:1800, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO ELETTRONICA
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_elettronica: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare al banco — vendita diretta a chi entra', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Inside sales telefonico per sviluppo clienti business/PA', tempo_mesi:1, moduli:[
        { id:'inside', nome:'Inside sales telefono/email', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.6, note:'Titolare dedica 1-2h/giorno a chiamare aziende, studi, PA della zona' },
        { id:'listino_b2b', nome:'Listino B2B/PA dedicato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Prezzi differenziati per partita IVA, convenzioni CONSIP/MEPA' },
      ]},
      '3': { cosa:'Inside sales dedicato + sviluppo canale B2B/PA', tempo_mesi:2, moduli:[
        { id:'commerciale', nome:'Inside sales dedicato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Inside sales dipendente', costo_mensile:2000, costo_setup:0, impatto:1.0, note:'Telefono + email + preventivi B2B, gestione ordini business' },
          { id:'parttime', nome:'Inside sales part-time', costo_mensile:1000, costo_setup:0, impatto:0.5, note:'4-5h/giorno, focus preventivi e follow-up' },
        ]},
      ]},
      '4': { cosa:'Account manager B2B esterno + inside sales per e-commerce', tempo_mesi:3, moduli:[
        { id:'account', nome:'Account manager B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Account B2B dipendente', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Visite aziende, studi professionali, enti, gare MEPA/CONSIP' },
          { id:'agente', nome:'Agente ENASARCO B2B', costo_mensile:1000, costo_setup:500, impatto:0.7, note:'Provvigione su ordini B2B, porta portafoglio clienti business' },
        ]},
        { id:'ecomm_sales', nome:'Inside sales e-commerce', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'dip', nome:'Inside sales e-commerce dipendente', costo_mensile:1800, costo_setup:0, impatto:0.25, note:'Gestione ordini online, customer care, chat, resi' },
          { id:'parttime', nome:'Inside sales part-time', costo_mensile:900, costo_setup:0, impatto:0.15, note:'4h/giorno' },
        ]},
      ]},
      '5': { cosa:'Team vendite multicanale — negozio + B2B + e-commerce + marketplace', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Direttore commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale dipendente', costo_mensile:3000, costo_setup:0, impatto:0.5, note:'Coordinamento canali: negozio, B2B, e-commerce, Amazon/eBay' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1500, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
        { id:'team', nome:'Team vendita', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'inside', nome:'Inside sales/e-commerce', costo_mensile:1800, costo_setup:0, impatto:0.2, note:'Gestione ordini online, preventivi, customer care' },
          { id:'account', nome:'Account B2B', costo_mensile:2200, costo_setup:0, impatto:0.2, note:'Visite clienti business, gare, preventivi complessi' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — tutto a memoria e scontrini', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con clienti business, preventivi aperti, follow-up', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Fogli Google strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Cliente, tipo (privato/business/PA), preventivo, stato, margine stimato' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free/Zoho)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline preventivi B2B + storico acquisti + reminder' },
        ]},
      ]},
      '3': { cosa:'CRM con lead B2B, preventivi automatici, storico per cliente', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM per rivendita IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'b2b', nome:'CRM B2B (Salesforce Essentials/Zoho CRM)', costo_mensile:60, costo_setup:300, impatto:1.0, note:'Pipeline preventivi, lead B2B/PA, storico, automazioni follow-up' },
          { id:'generico', nome:'CRM leggero (Pipedrive/Freshsales)', costo_mensile:30, costo_setup:200, impatto:0.65, note:'Pipeline base, reminder, storico' },
        ]},
      ]},
      '4': { cosa:'CRM integrato con magazzino e listini distributori real-time', tempo_mesi:2, moduli:[
        { id:'integrazione', nome:'Gestionale integrato IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'erp_it', nome:'Gestionale rivendita IT (Sencare/ITResellerPro)', costo_mensile:400, costo_setup:1500, impatto:1.0, note:'CRM + magazzino + listini distributori live + margini automatici' },
          { id:'modulare', nome:'CRM + gestionale separati', costo_mensile:200, costo_setup:800, impatto:0.6, note:'Pipedrive + Danea/FiC, aggiornamento listini manuale' },
        ]},
      ]},
      '5': { cosa:'ERP completo — ordini, stock, pricing dinamico, margini real-time, BI', tempo_mesi:3, moduli:[
        { id:'erp', nome:'ERP rivendita elettronica', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP IT distribution (SAP B1/Mago4 + modulo IT)', costo_mensile:1000, costo_setup:5000, impatto:1.0, note:'Ordini multi-distributore, stock, pricing dinamico, margini, e-commerce, BI' },
          { id:'mid', nome:'Gestionale mid-market + integrazioni', costo_mensile:500, costo_setup:2500, impatto:0.6, note:'TeamSystem/Danea + API distributori' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Ruoli vendita/magazzino/assistenza separati', tempo_mesi:1, moduli:[
        { id:'organigramma', nome:'Organigramma e mansionario', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Vendita banco, B2B/preventivi, magazzino/spedizioni, assistenza tecnica' },
      ]},
      '3': { cosa:'Procedure pricing + gestione stock + tecnico assistenza', tempo_mesi:2, moduli:[
        { id:'tecnico', nome:'Tecnico assistenza/configurazione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Tecnico hardware/software dipendente', costo_mensile:1800, costo_setup:0, impatto:0.7, note:'Configurazione PC, installazione SW, assistenza, riparazioni' },
          { id:'parttime', nome:'Tecnico part-time/a chiamata', costo_mensile:800, costo_setup:0, impatto:0.45, note:'Su appuntamento, per configurazioni e assistenza' },
        ]},
        { id:'pricing', nome:'Procedura pricing e margini', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.2, note:'Regole margine minimo per categoria, pricing B2B vs B2C, promozioni' },
      ]},
      '4': { cosa:'KPI margini + rotazione + responsabile operativo', tempo_mesi:3, moduli:[
        { id:'resp_ops', nome:'Responsabile operativo/store manager', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Store manager dipendente', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Gestione negozio, personale, stock, pricing, customer service' },
          { id:'fractional', nome:'Operations manager fractional', costo_mensile:1200, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
        { id:'kpi', nome:'Dashboard KPI vendite/margini', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Margine per categoria, rotazione stock, tasso conversione, scontrino medio' },
      ]},
      '5': { cosa:'Management multicanale — negozio + online + B2B strutturati', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Direttore operativo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'COO/Dir. operativo dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Gestione totale: negozio, e-commerce, B2B, magazzino, personale' },
          { id:'fractional', nome:'COO fractional', costo_mensile:1800, costo_setup:0, impatto:0.65, note:'3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — preventivi manuali, stock a vista', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Template preventivi B2B + consultazione listini distributori online', tempo_mesi:1, moduli:[
        { id:'preventivi', nome:'Template preventivi strutturati', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Modello preventivo con margine target, condizioni, consegna, validita' },
        { id:'listini', nome:'Accesso listini distributori online', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.2, note:'Portali Esprinet/Ingram/TD per confronto prezzi e disponibilita in tempo reale' },
      ]},
      '3': { cosa:'Gestionale con listini aggiornati automaticamente e calcolo margini', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Gestionale con listini IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Gestionale rivendita IT (con feed distributori)', costo_mensile:200, costo_setup:1000, impatto:1.0, note:'Listini aggiornati via API/feed da Esprinet/Ingram, margine automatico, stock live' },
          { id:'generico', nome:'Gestionale generico + aggiornamento manuale', costo_mensile:80, costo_setup:500, impatto:0.5, note:'Danea/FiC, listini caricati manualmente' },
        ]},
      ]},
      '4': { cosa:'Riordino automatico sotto-scorta + gestione resi e garanzie', tempo_mesi:2, moduli:[
        { id:'riordino', nome:'Sistema riordino automatico', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'integrato', nome:'Riordino integrato con distributori (API)', costo_mensile:300, costo_setup:2000, impatto:1.0, note:'Sotto-scorta, ordine automatico al distributore con prezzo migliore' },
          { id:'alert', nome:'Alert sotto-scorta + ordine manuale', costo_mensile:50, costo_setup:500, impatto:0.5, note:'Notifica quando stock scende, ordine manuale dal portale distributore' },
        ]},
        { id:'resi', nome:'Procedura resi e garanzie', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Flusso reso: accettazione, diagnosi, RMA fornitore, sostituzione/rimborso' },
      ]},
      '5': { cosa:'ERP con BI — analisi margini per categoria, rotazione, trend, pricing dinamico', tempo_mesi:3, moduli:[
        { id:'erp', nome:'ERP con Business Intelligence', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'ERP + BI (SAP B1/Mago4 + Power BI)', costo_mensile:700, costo_setup:4000, impatto:1.0, note:'Analisi margini per SKU, rotazione, trend, pricing dinamico, previsione domanda' },
          { id:'leggero', nome:'Gestionale + report avanzati', costo_mensile:300, costo_setup:1500, impatto:0.5, note:'Report su margini e rotazione, meno previsionale' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine da listino distributore — nessun pricing attivo', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pricing differenziato per canale: privato, business, PA', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Matrice prezzi per canale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8, note:'Prezzo diverso per privato, azienda, studio professionale, PA — margini ottimizzati' },
      ]},
      '3': { cosa:'Servizi a margine: installazione, configurazione, migrazione dati', tempo_mesi:1, moduli:[
        { id:'servizi', nome:'Listino servizi tecnici', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.6, note:'Installazione, configurazione, migrazione dati, setup rete — margine 50-70%' },
        { id:'accessori', nome:'Cross-selling accessori ad alto margine', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:0, impatto:0.2, note:'Custodie, cavi, mouse, tastiere, zaini — margine 40-60%, upsell al banco' },
      ]},
      '4': { cosa:'Contratti assistenza annuali + estensioni garanzia + noleggio', tempo_mesi:2, moduli:[
        { id:'assistenza', nome:'Contratti assistenza IT annuali', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Contratto annuale per PMI: assistenza HW/SW, interventi, backup — ricavo ricorrente' },
        { id:'garanzia', nome:'Estensioni garanzia a pagamento', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Garanzia estesa 2-3 anni su PC, stampanti — margine 30-40%' },
      ]},
      '5': { cosa:'Bundle HW+SW+servizi, noleggio operativo, ricavi ricorrenti', tempo_mesi:3, moduli:[
        { id:'bundle', nome:'Offerte bundle HW+SW+servizi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'Bundle strutturati + noleggio operativo', costo_mensile:500, costo_setup:1500, impatto:1.0, note:'PC+Office+setup+assistenza in canone mensile, fidelizzazione totale' },
          { id:'parziale', nome:'Bundle semplici HW+accessori+servizio', costo_mensile:200, costo_setup:500, impatto:0.5, note:'Pacchetti precofigurati, senza canone ricorrente' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo posizione e insegna', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Google My Business + offerte settimanali su volantino/social', tempo_mesi:1, moduli:[
        { id:'gmb', nome:'Google My Business ottimizzato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Foto negozio, orari, prodotti, risposte recensioni' },
        { id:'offerte', nome:'Volantino offerte settimanali', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.3, note:'PDF/immagine con offerte top da condividere su WhatsApp, social, negozio' },
      ]},
      '3': { cosa:'Google Ads + comparatori prezzi (Trovaprezzi, Idealo, Google Shopping)', tempo_mesi:2, moduli:[
        { id:'ads', nome:'Google Ads + Shopping', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:500, impatto:0.5, note:'Campagne su "computer + citta", Google Shopping per prodotti specifici' },
        { id:'comparatori', nome:'Comparatori prezzi (Trovaprezzi/Idealo)', tipo:'flag', obbligatorio:false, costo_mensile:150, costo_setup:300, impatto:0.25, note:'Feed prodotti su comparatori, visibilita su chi cerca il prezzo migliore' },
      ]},
      '4': { cosa:'Newsletter B2B + promozioni stagionali + social media attivi', tempo_mesi:2, moduli:[
        { id:'email', nome:'Email marketing B2B', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:200, impatto:0.4, note:'Newsletter mensile a clienti B2B: offerte, novita, fine serie — Mailchimp/Brevo' },
        { id:'social', nome:'Gestione social media', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Social media manager/agenzia', costo_mensile:600, costo_setup:500, impatto:0.5, note:'Piano editoriale: offerte, unboxing, tutorial, recensioni prodotti' },
          { id:'interno', nome:'Social autogestiti', costo_mensile:200, costo_setup:200, impatto:0.25, note:'Post 3x/settimana, foto prodotti, offerte' },
        ]},
      ]},
      '5': { cosa:'Piano marketing omnicanale — brand, partnership vendor, eventi, marketplace', tempo_mesi:3, moduli:[
        { id:'piano', nome:'Piano marketing IT omnicanale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing digitale/IT', costo_mensile:2000, costo_setup:3000, impatto:1.0, note:'Strategia: SEO, ads, social, marketplace, partnership vendor (HP, Lenovo, Apple)' },
          { id:'interno', nome:'Marketing manager interno + tool', costo_mensile:1000, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata, gestisce tutti i canali' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito vetrina con catalogo prodotti, servizi, contatti', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito rivendita IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom WordPress + catalogo', costo_mensile:30, costo_setup:1500, impatto:1.0, note:'Catalogo prodotti per categoria, servizi, form preventivo B2B' },
          { id:'template', nome:'Sito da template', costo_mensile:20, costo_setup:500, impatto:0.5, note:'Template base con pagine prodotto' },
        ]},
      ]},
      '3': { cosa:'E-commerce con catalogo, prezzi, carrello e pagamento online', tempo_mesi:2, moduli:[
        { id:'ecommerce', nome:'E-commerce elettronica', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'woocommerce', nome:'WooCommerce/PrestaShop + feed distributori', costo_mensile:200, costo_setup:3000, impatto:1.0, note:'Catalogo con prezzi live, carrello, pagamento, spedizione, feed da distributori' },
          { id:'shopify', nome:'Shopify + catalogo manuale', costo_mensile:100, costo_setup:1200, impatto:0.6, note:'Setup veloce, catalogo caricato manualmente, meno integrazioni' },
        ]},
      ]},
      '4': { cosa:'E-commerce avanzato + comparazione prodotti + recensioni + stock real-time', tempo_mesi:2, moduli:[
        { id:'avanzato', nome:'E-commerce avanzato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'pro', nome:'E-commerce con feed live distributori + comparatore', costo_mensile:500, costo_setup:6000, impatto:1.0, note:'Prezzi e stock real-time da distributori, comparazione specifiche, recensioni, filtri avanzati' },
          { id:'base', nome:'E-commerce con aggiornamento periodico', costo_mensile:200, costo_setup:2500, impatto:0.55, note:'Stock e prezzi aggiornati giornalmente, meno real-time' },
        ]},
      ]},
      '5': { cosa:'Piattaforma omnicanale — B2C + B2B + marketplace + click and collect', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma omnicanale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'E-commerce enterprise (Magento/custom)', costo_mensile:1200, costo_setup:12000, impatto:1.0, note:'B2C + B2B con listini, marketplace (Amazon/eBay), click&collect, app mobile' },
          { id:'mid', nome:'WooCommerce avanzato + integrazioni marketplace', costo_mensile:500, costo_setup:5000, impatto:0.55, note:'E-commerce + plugin Amazon/eBay, meno personalizzazione' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento e distribuzione',
      '1': { chi:'Titolare', cosa:'Acquisto da 1 distributore abituale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto prezzi tra distributori (Esprinet, Ingram Micro, TD Synnex)', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database distributori IT', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda per distributore: listino, sconti, tempi, programmi partner, rebate' },
      ]},
      '3': { cosa:'Accordi quadro con distributori — rebate, priorita consegna, demo unit', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro distributori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Contratti con Esprinet, Ingram, TD: rebate per volume, programmi partner vendor' },
        { id:'vendor', nome:'Programmi partner vendor (HP, Lenovo, Apple)', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Iscrizione programmi partner: sconti aggiuntivi, demo unit, formazione, co-marketing' },
      ]},
      '4': { cosa:'Buyer dedicato — ottimizzazione acquisti, drop-shipping, stock rotation', tempo_mesi:2, moduli:[
        { id:'buyer', nome:'Buyer IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer IT dipendente', costo_mensile:2000, costo_setup:0, impatto:1.0, note:'Ottimizzazione acquisti, confronto distributori, stock rotation, drop-shipping' },
          { id:'parttime', nome:'Buyer part-time/admin con delega', costo_mensile:900, costo_setup:0, impatto:0.6, note:'Gestisce riordini, confronto prezzi, rapporto distributori' },
        ]},
      ]},
      '5': { cosa:'Resp. supply chain — import diretto, accordi vendor premium, stock strategy', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Responsabile supply chain IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Supply chain manager IT dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Strategia acquisti, accordi vendor tier 1, import diretto, stock optimization' },
          { id:'fractional', nome:'Supply chain manager fractional', costo_mensile:1500, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO ABBIGLIAMENTO DETTAGLIO
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_abbigliamento_dettaglio: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Solo titolare in negozio — vende a chi entra', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Commesso/a part-time per coprire turni e weekend', tempo_mesi:1, moduli:[
        { id:'commesso', nome:'Commesso/a part-time', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'esperto', nome:'Commesso/a con esperienza moda', costo_mensile:1100, costo_setup:0, impatto:1.0, note:'Sa vendere, conosce i tessuti, consiglia outfit — scontrino medio piu alto' },
          { id:'base', nome:'Commesso/a generico/stagionale', costo_mensile:800, costo_setup:0, impatto:0.6, note:'Copre turni, cassa, riordino scaffali — meno impatto su vendita' },
        ]},
      ]},
      '3': { cosa:'Commesso/a full-time specializzato in vendita assistita + styling', tempo_mesi:2, moduli:[
        { id:'venditore', nome:'Venditore/trice full-time', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'stylist', nome:'Venditore/consulente di stile', costo_mensile:1700, costo_setup:0, impatto:1.0, note:'Vendita assistita, total look, fidelizzazione clienti, WhatsApp personale' },
          { id:'commesso', nome:'Commesso/a full-time', costo_mensile:1400, costo_setup:0, impatto:0.7, note:'Vendita, cassa, vetrina, magazzino — polivalente' },
        ]},
      ]},
      '4': { cosa:'Team vendita: 2 commessi + visual merchandiser/vetrinista', tempo_mesi:3, moduli:[
        { id:'team', nome:'Team vendita negozio', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'stylist', nome:'Venditore/consulente di stile', costo_mensile:1700, costo_setup:0, impatto:0.35, note:'Vendita assistita, consulenza outfit, clienteling' },
          { id:'commesso', nome:'Commesso/a', costo_mensile:1400, costo_setup:0, impatto:0.25, note:'Vendita, cassa, magazzino' },
        ]},
        { id:'visual', nome:'Visual merchandiser/vetrinista', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'fisso', nome:'Visual merchandiser fisso', costo_mensile:500, costo_setup:0, impatto:0.15, note:'1-2 giorni/settimana, cambio vetrina, allestimento, rotazione prodotti' },
          { id:'consulente', nome:'Consulente visual a chiamata', costo_mensile:200, costo_setup:0, impatto:0.1, note:'Cambio vetrina ogni 2-3 settimane, per stagione/evento' },
        ]},
      ]},
      '5': { cosa:'Store manager + team vendita strutturato + clienteling avanzato', tempo_mesi:5, moduli:[
        { id:'store_mgr', nome:'Store manager', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Store manager dipendente', costo_mensile:2500, costo_setup:0, impatto:0.5, note:'Gestione negozio, personale, target, visual, ordini, clienti VIP' },
          { id:'titolare', nome:'Titolare come store manager + coaching', costo_mensile:0, costo_setup:500, impatto:0.35, note:'Formazione su gestione team, KPI, delega — il titolare cresce come manager' },
        ]},
        { id:'team', nome:'Team vendita', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'stylist', nome:'Venditore/consulente di stile', costo_mensile:1700, costo_setup:0, impatto:0.2, note:'Vendita assistita, total look, clienteling' },
          { id:'commesso', nome:'Commesso/a', costo_mensile:1400, costo_setup:0, impatto:0.15, note:'Vendita, cassa, magazzino' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — vendite solo da scontrini', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Registro clienti abituali con preferenze, taglie e contatti', tempo_mesi:1, moduli:[
        { id:'registro', nome:'Rubrica clienti strutturata', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'whatsapp', nome:'WhatsApp Business + rubrica clienti', costo_mensile:0, costo_setup:0, impatto:0.7, note:'Etichette per tipo cliente, broadcast novita, foto nuovi arrivi personali' },
          { id:'excel', nome:'Excel/Fogli Google con anagrafica', costo_mensile:0, costo_setup:100, impatto:0.6, note:'Nome, taglia, brand preferiti, ultimo acquisto, compleanno' },
        ]},
      ]},
      '3': { cosa:'CRM retail con fidelity card digitale e storico acquisti', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM retail fashion', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'CRM retail moda (Loyverse/Lightspeed)', costo_mensile:50, costo_setup:300, impatto:1.0, note:'Fidelity digitale, storico acquisti, preferenze, promozioni personalizzate' },
          { id:'generico', nome:'CRM generico (HubSpot/Zoho)', costo_mensile:30, costo_setup:200, impatto:0.6, note:'Anagrafica clienti, storico, meno specifico per retail' },
        ]},
      ]},
      '4': { cosa:'CRM con automazioni email/SMS per promozioni mirate e compleanni', tempo_mesi:2, moduli:[
        { id:'automazioni', nome:'Marketing automation retail', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'avanzato', nome:'CRM + automation (Mailchimp/Klaviyo + POS)', costo_mensile:150, costo_setup:800, impatto:1.0, note:'Email/SMS automatici: compleanno, nuovi arrivi per stile, saldi riservati, winback' },
          { id:'base', nome:'CRM + newsletter manuale', costo_mensile:50, costo_setup:300, impatto:0.5, note:'Newsletter mensile, promozioni manuali, meno personalizzazione' },
        ]},
      ]},
      '5': { cosa:'CRM omnicanale — negozio + web + social con vista unica cliente', tempo_mesi:3, moduli:[
        { id:'omnicanale', nome:'CRM omnicanale retail', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Piattaforma omnicanale (Shopify POS + CRM)', costo_mensile:300, costo_setup:2000, impatto:1.0, note:'Cliente unico negozio/web, storico unificato, promo cross-canale, wishlist' },
          { id:'modulare', nome:'CRM + e-commerce separati ma collegati', costo_mensile:150, costo_setup:1000, impatto:0.55, note:'Dati sincronizzati periodicamente, meno real-time' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Turni e ruoli definiti — vendita, cassa, magazzino, vetrina', tempo_mesi:1, moduli:[
        { id:'turni', nome:'Pianificazione turni strutturata', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Turni settimanali, copertura weekend/festivi, ruoli per turno' },
      ]},
      '3': { cosa:'Obiettivi vendita individuali + formazione vendita assistita', tempo_mesi:2, moduli:[
        { id:'obiettivi', nome:'Target vendita per persona', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Obiettivo giornaliero/settimanale, scontrino medio, pezzi per scontrino' },
        { id:'formazione', nome:'Formazione vendita moda', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'corso', nome:'Corso vendita assistita (consulente esterno)', costo_mensile:0, costo_setup:500, impatto:0.25, note:'1-2 giornate formative su total look, cross-selling, gestione obiezioni' },
          { id:'interno', nome:'Formazione interna dal titolare', costo_mensile:0, costo_setup:0, impatto:0.1, note:'Il titolare forma sui brand, abbinamenti, gestione cliente' },
        ]},
      ]},
      '4': { cosa:'KPI negozio + deleghe operative + incentivi', tempo_mesi:3, moduli:[
        { id:'kpi', nome:'Dashboard KPI negozio', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Fatturato, scontrino medio, conversion rate, pezzi/scontrino, sell-through' },
        { id:'incentivi', nome:'Piano incentivi venditori', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.2, note:'Bonus su target raggiunto, contest mensili, premi per scontrino medio' },
      ]},
      '5': { cosa:'Governance strutturata — store manager o multi-punto vendita', tempo_mesi:5, moduli:[
        { id:'governance', nome:'Store manager/Area manager', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'store_mgr', nome:'Store manager dedicato', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Gestione completa: team, KPI, visual, ordini, clienti VIP, il titolare sviluppa' },
          { id:'area_mgr', nome:'Area manager per piu punti vendita', costo_mensile:3000, costo_setup:0, impatto:0.8, note:'Supervisione 2-3 negozi, standard, KPI comparativi' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — tutto a sensazione ed esperienza', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'POS/cassa evoluto + scontrini elettronici + gestione resi', tempo_mesi:1, moduli:[
        { id:'pos', nome:'POS/cassa per retail moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'cloud', nome:'POS cloud (Lightspeed/Shopify POS/Loyverse)', costo_mensile:50, costo_setup:300, impatto:1.0, note:'Cassa, scontrini, resi, report vendite, gestione taglie/colori' },
          { id:'tradizionale', nome:'Registratore di cassa evoluto', costo_mensile:20, costo_setup:200, impatto:0.5, note:'Scontrini elettronici, report base, meno funzionalita' },
        ]},
      ]},
      '3': { cosa:'Gestionale retail — vendite per categoria, giacenze, riordini, margini', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Gestionale retail moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'fashion', nome:'Gestionale moda (Gest.Fashion/Tekla Retail)', costo_mensile:150, costo_setup:800, impatto:1.0, note:'Griglia taglie/colori, sell-through, riordini, margini per brand/categoria' },
          { id:'generico', nome:'POS avanzato con inventario (Lightspeed)', costo_mensile:80, costo_setup:500, impatto:0.65, note:'Inventario, report vendite, meno specifico per griglia taglie' },
        ]},
      ]},
      '4': { cosa:'Procedure store: accoglienza, visual merchandising, cambio merce, fidelizzazione', tempo_mesi:2, moduli:[
        { id:'procedure', nome:'Manuale operativo negozio', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Procedure scritte: apertura/chiusura, accoglienza, prova, cassa, reso, reclamo' },
        { id:'visual', nome:'Calendario visual merchandising', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'pro', nome:'Visual merchandising con consulente', costo_mensile:300, costo_setup:500, impatto:0.4, note:'Cambio vetrina/allestimento ogni 2-3 settimane, regole esposizione' },
          { id:'interno', nome:'Visual autogestito con linee guida', costo_mensile:0, costo_setup:300, impatto:0.2, note:'Regole base di esposizione, il team gestisce internamente' },
        ]},
      ]},
      '5': { cosa:'Sistema KPI avanzato — vendite per m2, rotazione, sell-through, benchmark', tempo_mesi:3, moduli:[
        { id:'analytics', nome:'Analytics retail avanzato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'BI retail (Power BI/Tableau + dati POS)', costo_mensile:200, costo_setup:1500, impatto:1.0, note:'KPI per m2, sell-through per brand, rotazione, margine per categoria, benchmark' },
          { id:'base', nome:'Report avanzati dal POS', costo_mensile:50, costo_setup:500, impatto:0.5, note:'Report settimanali automatici, meno personalizzazione' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine da ricarico standard — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Piano saldi strutturato + gestione fine serie per liberare cassa', tempo_mesi:1, moduli:[
        { id:'saldi', nome:'Calendario saldi e markdown', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8, note:'Pianificazione markdown: mid-season, saldi, fine serie — tempistica per massimizzare margine' },
      ]},
      '3': { cosa:'Upsell accessori + cross-selling outfit completi + total look', tempo_mesi:1, moduli:[
        { id:'upsell', nome:'Programma upsell/cross-selling', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.6, note:'Formazione venditori su total look: "Con questo pantalone sta benissimo questa maglia..."' },
        { id:'accessori', nome:'Selezione accessori ad alto margine', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.2, note:'Cinture, sciarpe, borse, gioielli — margine 60-80%, completano outfit' },
      ]},
      '4': { cosa:'Programma fidelizzazione con sconti progressivi, anteprime, eventi', tempo_mesi:2, moduli:[
        { id:'fidelity', nome:'Programma fidelizzazione clienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'digitale', nome:'Fidelity card digitale (app/POS integrato)', costo_mensile:50, costo_setup:500, impatto:1.0, note:'Punti, sconti compleanno, anteprime saldi, eventi riservati, WhatsApp VIP' },
          { id:'semplice', nome:'Card fisica + registro manuale', costo_mensile:0, costo_setup:200, impatto:0.5, note:'Carta timbrabile, sconto dopo 10 acquisti, piu semplice' },
        ]},
      ]},
      '5': { cosa:'Dynamic pricing stagionale + capsule private label + eventi esclusivi', tempo_mesi:3, moduli:[
        { id:'pricing', nome:'Dynamic pricing per fase stagione', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Prezzo pieno primi 2 mesi, poi mid-season, poi saldi — margine ottimizzato per fase' },
        { id:'pl', nome:'Capsule private label', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'propria', nome:'Linea basici con marchio proprio', costo_mensile:200, costo_setup:1000, impatto:0.3, note:'T-shirt, maglieria basica con etichetta del negozio — margine +30% vs brand' },
          { id:'collab', nome:'Collaborazione con designer locale', costo_mensile:100, costo_setup:500, impatto:0.15, note:'Capsule in esclusiva con designer/artigiano locale' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo vetrina e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Instagram con foto outfit, nuovi arrivi, stories dallo store', tempo_mesi:1, moduli:[
        { id:'instagram', nome:'Profilo Instagram attivo', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.6, note:'Post 3-4x/settimana: nuovi arrivi, outfit, stories dietro le quinte, reel' },
        { id:'whatsapp', nome:'WhatsApp broadcast nuovi arrivi', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Foto nuovi arrivi alle clienti abituali, anteprime, inviti eventi' },
      ]},
      '3': { cosa:'Instagram + Facebook/Meta Ads locali + micro-influencer', tempo_mesi:2, moduli:[
        { id:'ads', nome:'Meta Ads locali', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:300, impatto:0.5, note:'Instagram/Facebook Ads geolocalizzati, target donna 25-55, interesse moda' },
        { id:'influencer', nome:'Collaborazione micro-influencer locali', tipo:'flag', obbligatorio:false, costo_mensile:200, costo_setup:0, impatto:0.25, note:'2-3 influencer locali con 5-20k follower, barter + piccolo fee' },
      ]},
      '4': { cosa:'Social media manager + eventi in-store + collaborazioni brand', tempo_mesi:2, moduli:[
        { id:'social', nome:'Social media professionale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'smm', nome:'Social media manager/agenzia', costo_mensile:800, costo_setup:500, impatto:1.0, note:'Piano editoriale, shooting mensile, stories, reel, ads, community management' },
          { id:'freelance', nome:'Freelance content creator', costo_mensile:400, costo_setup:200, impatto:0.6, note:'Foto/video mensili + piano editoriale, il titolare pubblica' },
        ]},
        { id:'eventi', nome:'Eventi in-store', tipo:'flag', obbligatorio:false, costo_mensile:200, costo_setup:300, impatto:0.2, note:'Aperitivo novita stagione, trunk show, shopping night, presentazione brand' },
      ]},
      '5': { cosa:'Piano marketing completo — brand identity, PR locale, community, eventi', tempo_mesi:3, moduli:[
        { id:'piano', nome:'Piano marketing fashion retail', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing moda', costo_mensile:2000, costo_setup:3000, impatto:1.0, note:'Brand identity, PR su riviste locali, eventi, influencer, community, ads' },
          { id:'interno', nome:'Marketing manager interno', costo_mensile:1000, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata a marketing, social, eventi, CRM' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito — solo social media', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito vetrina con brand story, collezioni, orari e mappa negozio', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito vetrina fashion', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom (WordPress/Squarespace)', costo_mensile:20, costo_setup:1500, impatto:1.0, note:'Design moda, gallery collezioni, brand story, Instagram feed, mappa' },
          { id:'linktree', nome:'Landing page (Linktree/Milkshake)', costo_mensile:5, costo_setup:0, impatto:0.3, note:'Link da Instagram con orari, mappa, WhatsApp — velocissimo' },
        ]},
      ]},
      '3': { cosa:'E-commerce con catalogo, taglie/colori, pagamento e spedizione', tempo_mesi:2, moduli:[
        { id:'ecommerce', nome:'E-commerce fashion', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'shopify', nome:'Shopify (template moda)', costo_mensile:100, costo_setup:2000, impatto:1.0, note:'Catalogo con griglia taglie, foto lifestyle, carrello, spedizione, reso' },
          { id:'woocommerce', nome:'WooCommerce + tema fashion', costo_mensile:50, costo_setup:1500, impatto:0.7, note:'Piu personalizzabile, richiede piu manutenzione' },
        ]},
      ]},
      '4': { cosa:'E-commerce con outfit suggeriti, wishlist, reso facile, live shopping', tempo_mesi:2, moduli:[
        { id:'avanzato', nome:'E-commerce fashion avanzato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'pro', nome:'Shopify + app outfit/wishlist/live shopping', costo_mensile:250, costo_setup:3000, impatto:1.0, note:'Suggerimenti outfit, wishlist, reso prepagato, live shopping Instagram/sito' },
          { id:'base', nome:'E-commerce con plugin upsell base', costo_mensile:100, costo_setup:1500, impatto:0.55, note:'Suggerimenti "abbina con", reso standard, meno features' },
        ]},
      ]},
      '5': { cosa:'Piattaforma omnicanale — stock unico negozio/web, click and collect', tempo_mesi:4, moduli:[
        { id:'omnicanale', nome:'Piattaforma omnicanale moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Shopify Plus / Centra / custom', costo_mensile:500, costo_setup:8000, impatto:1.0, note:'Stock unico negozio+web, click&collect, reso cross-canale, clienteling digitale' },
          { id:'mid', nome:'Shopify + POS integrato', costo_mensile:200, costo_setup:3000, impatto:0.55, note:'Stock sincronizzato, click&collect base, meno personalizzazione' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento collezioni',
      '1': { chi:'Titolare', cosa:'Acquisto da rappresentanti di zona in showroom', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Scouting brand a fiere moda (Pitti, MICAM, White, TheOne)', tempo_mesi:1, moduli:[
        { id:'fiere', nome:'Visita fiere moda per scouting', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.7, note:'Biglietti, viaggio, alloggio per 1-2 fiere/anno — scoprire nuovi brand' },
      ]},
      '3': { cosa:'Buyer esterno/consulente per selezione brand e budget acquisti', tempo_mesi:2, moduli:[
        { id:'buyer', nome:'Buyer/consulente acquisti moda', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'consulente', nome:'Buyer consulente esterno', costo_mensile:500, costo_setup:500, impatto:1.0, note:'Esperto retail, aiuta a selezionare brand/modelli, pianificare budget per stagione' },
          { id:'autonomo', nome:'Acquisti autonomi con metodo strutturato', costo_mensile:0, costo_setup:300, impatto:0.5, note:'Il titolare compra con foglio budget, analisi sell-through stagione precedente' },
        ]},
      ]},
      '4': { cosa:'Mix acquisti: campionario anticipato + pronto moda in stagione', tempo_mesi:2, moduli:[
        { id:'mix', nome:'Strategia acquisti mista', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.7, note:'70% campionario anticipato (margine alto) + 30% pronto moda (trend + riassortimento)' },
        { id:'pronto', nome:'Fornitori pronto moda selezionati', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.2, note:'2-3 fornitori pronto moda affidabili per riassortimento rapido in stagione' },
      ]},
      '5': { cosa:'Resp. acquisti — ottimizzazione mix brand, PL, open-to-buy avanzato', tempo_mesi:4, moduli:[
        { id:'resp', nome:'Responsabile acquisti/product manager', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer/product manager dipendente', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Selezione brand, budget open-to-buy, analisi sell-through, sviluppo PL' },
          { id:'fractional', nome:'Buyer fractional/consulente', costo_mensile:1200, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana, focus campagne acquisto e analisi' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO OROLOGI GIOIELLI
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_orologi_gioielli: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Solo titolare in boutique — clientela storica', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Addetto/a clienteling — accoglienza, follow-up, WhatsApp VIP', tempo_mesi:1, moduli:[
        { id:'addetto', nome:'Addetto/a vendita luxury', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'esperto', nome:'Venditore/trice con esperienza gioielleria', costo_mensile:2200, costo_setup:0, impatto:1.0, note:'Conosce pietre, orologi, sa gestire clientela alto-spendente' },
          { id:'formabile', nome:'Addetto/a da formare', costo_mensile:1600, costo_setup:500, impatto:0.6, note:'Buona presenza e comunicazione, formazione interna su prodotto' },
        ]},
      ]},
      '3': { cosa:'2 addetti vendita specializzati: gioielleria + orologeria', tempo_mesi:2, moduli:[
        { id:'team', nome:'Addetti vendita specializzati', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'gioielli', nome:'Consulente gioielleria', costo_mensile:2200, costo_setup:0, impatto:0.4, note:'Esperto pietre, metalli, gioielli su misura, cerimonie' },
          { id:'orologi', nome:'Consulente orologeria', costo_mensile:2200, costo_setup:0, impatto:0.35, note:'Conosce movimenti, brand, manutenzione, mercato pre-owned' },
        ]},
      ]},
      '4': { cosa:'Team vendita + gemmologa/o per consulenze personalizzate', tempo_mesi:3, moduli:[
        { id:'gemmologo', nome:'Gemmologo/a per consulenze', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Gemmologo/a dipendente (IGI/GIA)', costo_mensile:2500, costo_setup:0, impatto:0.5, note:'Certificazioni pietre, consulenze sposi, perizie, valutazioni' },
          { id:'consulente', nome:'Gemmologo/a a consulenza', costo_mensile:500, costo_setup:0, impatto:0.3, note:'Su appuntamento, per vendite importanti e perizie' },
        ]},
        { id:'clienteling', nome:'Responsabile clienteling VIP', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Gestione lista VIP, auguri, anteprime, inviti eventi, gift personali' },
      ]},
      '5': { cosa:'Store manager + team clienteling VIP + eventi esclusivi', tempo_mesi:5, moduli:[
        { id:'store_mgr', nome:'Store manager luxury', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Store manager esperto gioielleria', costo_mensile:3500, costo_setup:0, impatto:0.5, note:'Gestione boutique, team, clienti VIP, eventi, acquisti, brand relations' },
          { id:'titolare', nome:'Titolare come store manager + coaching', costo_mensile:0, costo_setup:1000, impatto:0.35, note:'Formazione su management luxury, KPI, delega operativa' },
        ]},
        { id:'team', nome:'Team vendita specializzato', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'consulente', nome:'Consulente luxury', costo_mensile:2200, costo_setup:0, impatto:0.2, note:'Vendita assistita, clienteling, eventi' },
          { id:'junior', nome:'Addetto/a vendita junior', costo_mensile:1600, costo_setup:0, impatto:0.12, note:'Supporto vendita, cassa, esposizione' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — clienti a memoria e rubrica', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Rubrica clienti VIP con ricorrenze, gusti e storico acquisti', tempo_mesi:1, moduli:[
        { id:'rubrica', nome:'Rubrica clienti luxury strutturata', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'digitale', nome:'App clienteling (WhatsApp Business + note)', costo_mensile:0, costo_setup:0, impatto:0.7, note:'Etichette VIP, anniversari, compleanni, stile preferito, storico regali' },
          { id:'excel', nome:'Excel/Fogli Google con anagrafica VIP', costo_mensile:0, costo_setup:100, impatto:0.6, note:'Scheda cliente: ricorrenze, acquisti, budget, partner, figli' },
        ]},
      ]},
      '3': { cosa:'CRM gioielleria con profilo cliente, anniversari, wish list, certificati', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM luxury/gioielleria', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'CRM gioielleria (Jeweler/ClientBook)', costo_mensile:100, costo_setup:500, impatto:1.0, note:'Profilo VIP, wish list, anniversari, certificati associati, storico completo' },
          { id:'generico', nome:'CRM generico (HubSpot/Zoho)', costo_mensile:50, costo_setup:300, impatto:0.6, note:'Pipeline clienti, storico, meno specifico per gioielleria' },
        ]},
      ]},
      '4': { cosa:'CRM con automazioni — auguri personalizzati, inviti eventi, novita', tempo_mesi:2, moduli:[
        { id:'automazioni', nome:'Automazioni clienteling', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'avanzato', nome:'CRM + automation (Klaviyo/ActiveCampaign)', costo_mensile:200, costo_setup:1000, impatto:1.0, note:'Auguri automatici, inviti trunk show, novita brand preferito, follow-up post-acquisto' },
          { id:'base', nome:'CRM + reminder manuali', costo_mensile:50, costo_setup:300, impatto:0.5, note:'Alert anniversari, titolare gestisce contatto personale' },
        ]},
      ]},
      '5': { cosa:'Piattaforma clienteling luxury 360 gradi — vista unica cliente', tempo_mesi:3, moduli:[
        { id:'clienteling', nome:'Piattaforma clienteling luxury', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Clienteling luxury (Salesforce/ClientBook Pro)', costo_mensile:500, costo_setup:3000, impatto:1.0, note:'Vista 360: storico, wish list, certificati, eventi, social, preferenze, famiglia' },
          { id:'mid', nome:'CRM avanzato + integrazioni', costo_mensile:200, costo_setup:1500, impatto:0.55, note:'CRM + email + social collegati, meno specifico luxury' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Procedure accoglienza luxury e clienteling definite', tempo_mesi:1, moduli:[
        { id:'procedure', nome:'Protocollo accoglienza boutique', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.7, note:'Accoglienza, proposta, storytelling pezzo, chiusura, confezionamento, follow-up' },
      ]},
      '3': { cosa:'Formazione vendita luxury + obiettivi per addetto', tempo_mesi:2, moduli:[
        { id:'formazione', nome:'Formazione vendita luxury/gemmologia', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'corso', nome:'Corso vendita luxury con formatore esterno', costo_mensile:0, costo_setup:800, impatto:0.7, note:'1-2 giornate su clienteling luxury, gestione obiezioni, upsell, storytelling' },
          { id:'brand', nome:'Formazione tramite brand partner', costo_mensile:0, costo_setup:200, impatto:0.5, note:'Training dei brand (Rolex, Cartier, ecc.) sul prodotto specifico' },
        ]},
        { id:'obiettivi', nome:'Target vendita per addetto', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.2, note:'Obiettivo mensile, scontrino medio, clienti nuovi, richiami VIP' },
      ]},
      '4': { cosa:'KPI boutique + incentivi + responsabile clienteling', tempo_mesi:3, moduli:[
        { id:'kpi', nome:'Dashboard KPI boutique luxury', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Conversion rate, scontrino medio, clienti VIP attivi, retention, referral' },
        { id:'incentivi', nome:'Piano incentivi venditori', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.2, note:'Bonus su scontrino medio, clienti nuovi, referral — non solo fatturato' },
      ]},
      '5': { cosa:'Governance boutique — store manager + eventi trunk show + multi-punto', tempo_mesi:5, moduli:[
        { id:'governance', nome:'Store manager/Brand ambassador', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Store manager luxury dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Gestione boutique, team, clienti VIP, eventi, rapporti brand, il titolare sviluppa' },
          { id:'fractional', nome:'Retail consultant fractional', costo_mensile:1500, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana, focus eventi, clienteling, KPI' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — esperienza e relazione personale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Registro pezzi con certificati GIA/IGI e garanzie digitalizzati', tempo_mesi:1, moduli:[
        { id:'registro', nome:'Registro inventario con certificati', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.7, note:'Scheda per pezzo: foto, certificato GIA/IGI, prezzo, garanzia, ubicazione vetrina' },
        { id:'assicurazione', nome:'Gestione polizza assicurativa inventario', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.2, note:'Inventario aggiornato per assicurazione, documentazione furto/smarrimento' },
      ]},
      '3': { cosa:'Gestionale gioielleria — inventario, certificati, perizie, riparazioni', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Gestionale gioielleria', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Software gioielleria (Jeweler Pro/GoldPro)', costo_mensile:150, costo_setup:1000, impatto:1.0, note:'Inventario per categoria, certificati associati, storico perizie, lab riparazioni' },
          { id:'generico', nome:'Gestionale retail + personalizzazione', costo_mensile:80, costo_setup:500, impatto:0.55, note:'Lightspeed/Danea con campi personalizzati per certificati e pietre' },
        ]},
      ]},
      '4': { cosa:'Processo vendita luxury completo: accoglienza, storytelling, packaging, follow-up', tempo_mesi:2, moduli:[
        { id:'vendita_luxury', nome:'Manuale vendita luxury', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Protocollo: accoglienza, scoperta esigenze, presentazione con storia, prova, packaging premium, follow-up 7gg' },
        { id:'packaging', nome:'Packaging e confezionamento premium', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'brandizzato', nome:'Packaging brandizzato personalizzato', costo_mensile:100, costo_setup:500, impatto:0.4, note:'Scatole, sacchetti, biglietti con logo boutique — esperienza unboxing' },
          { id:'standard', nome:'Packaging standard dei brand', costo_mensile:0, costo_setup:0, impatto:0.2, note:'Si usa il packaging fornito dai brand, senza personalizzazione' },
        ]},
      ]},
      '5': { cosa:'KPI boutique avanzati + gestione certificazioni + antifrode', tempo_mesi:3, moduli:[
        { id:'analytics', nome:'Analytics boutique luxury', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'BI luxury (conversion, LTV, referral, VIP score)', costo_mensile:200, costo_setup:2000, impatto:1.0, note:'Conversion rate, lifetime value cliente, VIP scoring, margine per categoria' },
          { id:'base', nome:'Report avanzati dal gestionale', costo_mensile:50, costo_setup:500, impatto:0.5, note:'Report settimanali su vendite, margini, inventario' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine tradizionale da ricarico — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Servizi aggiuntivi: incisioni, packaging regalo, pulizia professionale', tempo_mesi:1, moduli:[
        { id:'servizi', nome:'Servizi a valore aggiunto', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Incisioni, pulizia ultrasuoni, lucidatura, confezionamento regalo — margine puro' },
        { id:'manutenzione', nome:'Servizio manutenzione orologi', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Cambio batteria, regolazione, invio a centro assistenza brand — margine servizio' },
      ]},
      '3': { cosa:'Gioielli su misura + servizio riparazione e restyling', tempo_mesi:2, moduli:[
        { id:'su_misura', nome:'Servizio gioielli su misura', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'laboratorio', nome:'Con laboratorio orafo convenzionato', costo_mensile:0, costo_setup:500, impatto:0.7, note:'Il cliente sceglie pietre e design, noi gestiamo la realizzazione — margine 50-70%' },
          { id:'partner', nome:'Partnership con orafo artigiano', costo_mensile:0, costo_setup:200, impatto:0.5, note:'Referral a orafo di fiducia, commissione su realizzazione' },
        ]},
        { id:'restyling', nome:'Servizio restyling gioielli vecchi', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Il cliente porta oro/pietre vecchie, noi trasformiamo in pezzo nuovo' },
      ]},
      '4': { cosa:'Programma VIP — anteprime, eventi privati, sconti anniversario', tempo_mesi:2, moduli:[
        { id:'vip', nome:'Programma VIP clienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'strutturato', nome:'Club VIP con livelli (Silver/Gold/Platinum)', costo_mensile:100, costo_setup:800, impatto:1.0, note:'Anteprime collezioni, eventi privati, sconto anniversario, regalo compleanno' },
          { id:'informale', nome:'Trattamento VIP informale', costo_mensile:50, costo_setup:200, impatto:0.5, note:'Il titolare gestisce personalmente i top client con attenzioni dedicate' },
        ]},
      ]},
      '5': { cosa:'Mix ricavi: vendita, su misura, pre-owned certificato, eventi, noleggio', tempo_mesi:3, moduli:[
        { id:'preowned', nome:'Canale pre-owned certificato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'strutturato', nome:'Servizio acquisto/vendita usato certificato', costo_mensile:200, costo_setup:1500, impatto:0.6, note:'Valutazione, certificazione, garanzia propria, vendita usato — margine 25-40%' },
          { id:'intermediazione', nome:'Intermediazione conto vendita', costo_mensile:0, costo_setup:500, impatto:0.3, note:'Il cliente lascia il pezzo, noi lo vendiamo e tratteniamo commissione' },
        ]},
        { id:'eventi', nome:'Eventi esclusivi in boutique', tipo:'flag', obbligatorio:false, costo_mensile:200, costo_setup:500, impatto:0.2, note:'Trunk show brand, serate private, presentazione collezioni — vendite in evento' },
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo vetrina e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Instagram curato con foto gioielli professionali e storytelling', tempo_mesi:1, moduli:[
        { id:'instagram', nome:'Profilo Instagram luxury curato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.6, note:'Foto professionali gioielli, macro dettagli, storie artigianali, indossato' },
        { id:'whatsapp', nome:'WhatsApp VIP per clienti top', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Novita esclusive, anteprime, auguri personalizzati alle clienti migliori' },
      ]},
      '3': { cosa:'Social curato + PR locale + partnership wedding planner/eventi', tempo_mesi:2, moduli:[
        { id:'social', nome:'Social media professionale luxury', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'fotografo', nome:'Fotografo gioielli + SMM', costo_mensile:500, costo_setup:500, impatto:1.0, note:'Shooting mensile still-life + indossato, piano editoriale, stories, reel' },
          { id:'interno', nome:'Foto interne + grafica freelance', costo_mensile:200, costo_setup:200, impatto:0.5, note:'Foto con smartphone + luce, grafica esterna per post curati' },
        ]},
        { id:'wedding', nome:'Partnership wedding planner', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.25, note:'Accordi con wedding planner e location: fedi, gioielli sposa, regali testimoni' },
      ]},
      '4': { cosa:'Agenzia luxury — shooting video, influencer gioielli, PR', tempo_mesi:2, moduli:[
        { id:'luxury_mkt', nome:'Marketing luxury professionale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia specializzata luxury/gioielli', costo_mensile:1200, costo_setup:2000, impatto:1.0, note:'Shooting editoriali, video gioielli, influencer gioielli/moda, PR su riviste' },
          { id:'freelance', nome:'Team freelance (fotografo + SMM + PR)', costo_mensile:600, costo_setup:1000, impatto:0.6, note:'Professionisti singoli coordinati, costo piu contenuto' },
        ]},
      ]},
      '5': { cosa:'Piano marketing luxury completo — brand awareness, eventi esclusivi, PR', tempo_mesi:4, moduli:[
        { id:'piano', nome:'Piano marketing luxury boutique', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing luxury', costo_mensile:2500, costo_setup:4000, impatto:1.0, note:'Brand positioning, PR su riviste luxury, eventi VIP, influencer, digital strategy' },
          { id:'interno', nome:'Marketing coordinator interno', costo_mensile:1200, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata a marketing, eventi, social, CRM' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito vetrina elegante con collezioni, boutique e prenotazione visita', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito boutique luxury', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom (design luxury)', costo_mensile:30, costo_setup:2500, impatto:1.0, note:'Design elegante, gallery collezioni, storia boutique, prenotazione appuntamento' },
          { id:'template', nome:'Sito da template (Squarespace luxury)', costo_mensile:20, costo_setup:800, impatto:0.5, note:'Template elegante, meno personalizzazione' },
        ]},
      ]},
      '3': { cosa:'Catalogo online dettagliato con certificati GIA/IGI e prenotazione visita', tempo_mesi:2, moduli:[
        { id:'catalogo', nome:'Catalogo online gioielli', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:2000, impatto:0.5, note:'Ogni pezzo con foto HD, dettagli pietre, certificato, prezzo su richiesta' },
        { id:'booking', nome:'Prenotazione appuntamento online', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.4, note:'Calendly/form per prenotare visita privata in boutique' },
      ]},
      '4': { cosa:'E-commerce luxury — foto HD, zoom pietre, certificati, spedizione assicurata', tempo_mesi:3, moduli:[
        { id:'ecommerce', nome:'E-commerce gioielli luxury', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'E-commerce luxury custom (Shopify Plus/custom)', costo_mensile:400, costo_setup:8000, impatto:1.0, note:'Foto HD macro, video 360, certificati scaricabili, spedizione assicurata, reso 30gg' },
          { id:'shopify', nome:'Shopify + tema jewelry', costo_mensile:100, costo_setup:3000, impatto:0.55, note:'Template gioielli, funzionalita base, meno personalizzazione' },
        ]},
      ]},
      '5': { cosa:'Piattaforma integrata — e-commerce, CRM, stock unico, wish list VIP', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma omnicanale luxury', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Piattaforma luxury enterprise (Shopify Plus + CRM)', costo_mensile:800, costo_setup:15000, impatto:1.0, note:'E-commerce + CRM + stock unico + wish list VIP + clienteling digitale + app' },
          { id:'mid', nome:'Shopify + CRM collegato', costo_mensile:300, costo_setup:5000, impatto:0.5, note:'E-commerce + CRM sincronizzati, meno features luxury' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento e fornitori',
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 rappresentanti brand abituali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Scouting brand e fornitori a fiere (VicenzaOro, Baselworld, HK)', tempo_mesi:1, moduli:[
        { id:'fiere', nome:'Visita fiere gioielleria/orologeria', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:800, impatto:0.7, note:'VicenzaOro, Baselworld/Watches&Wonders, HK Jewellery Show — scouting e ordini' },
      ]},
      '3': { cosa:'Buyer/consulente per selezione pietre, fornitori orafi e brand', tempo_mesi:2, moduli:[
        { id:'buyer', nome:'Buyer gioielleria', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'consulente', nome:'Buyer/consulente esterno esperto', costo_mensile:500, costo_setup:500, impatto:1.0, note:'Seleziona pietre, negozia con fornitori, consiglia brand, gestisce budget' },
          { id:'autonomo', nome:'Acquisti autonomi con metodo', costo_mensile:0, costo_setup:300, impatto:0.5, note:'Il titolare acquista con budget strutturato e analisi sell-through' },
        ]},
      ]},
      '4': { cosa:'Import pietre diretto + partnership laboratorio orafo per pezzi unici', tempo_mesi:3, moduli:[
        { id:'import', nome:'Import pietre diretto', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'broker', nome:'Broker diamanti/pietre (Anversa/Mumbai)', costo_mensile:0, costo_setup:2000, impatto:1.0, note:'Acquisto diretto pietre certificate GIA/IGI, margine superiore' },
          { id:'grossista', nome:'Grossista pietre Italia (Valenza/Arezzo)', costo_mensile:0, costo_setup:500, impatto:0.6, note:'Fornitore italiano, meno margine ma meno rischio e logistica' },
        ]},
        { id:'laboratorio', nome:'Partnership laboratorio orafo', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Orafo di fiducia per pezzi su misura, restyling, riparazioni complesse' },
      ]},
      '5': { cosa:'Resp. acquisti — accordi brand premium, pietre certificate, linea propria', tempo_mesi:4, moduli:[
        { id:'resp', nome:'Responsabile acquisti gioielleria', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer/product manager dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Strategia acquisti, rapporti brand (Rolex, Cartier...), import pietre, sviluppo linea propria' },
          { id:'fractional', nome:'Buyer fractional/consulente senior', costo_mensile:1500, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana, focus campagne acquisto e brand relations' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE TRASFORMAZIONE
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_trasformazione: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare gestisce clienti storici — vendita diretta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Visite proattive a buyer GDO locale e HORECA zona', tempo_mesi:2, moduli:[
        { id:'campionature', nome:'Kit campionature per visite buyer', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.6, note:'Campioni prodotto, schede tecniche, listino per canale — visite buyer GDO e chef' },
        { id:'fiere_local', nome:'Partecipazione fiere food locali', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Stand a fiere regionali, degustazioni, contatto diretto buyer zona' },
      ]},
      '3': { cosa:'Agente dedicato canale GDO o HORECA', tempo_mesi:3, moduli:[
        { id:'agente', nome:'Agente food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'gdo', nome:'Agente ENASARCO canale GDO', costo_mensile:1000, costo_setup:500, impatto:1.0, note:'Provvigione 3-6%, porta portafoglio buyer GDO, gestisce listing e promozioni' },
          { id:'horeca', nome:'Agente ENASARCO canale HORECA', costo_mensile:800, costo_setup:500, impatto:0.8, note:'Ristoranti, hotel, catering — provvigione su venduto' },
          { id:'dip', nome:'Commerciale dipendente multicanale', costo_mensile:2500, costo_setup:0, impatto:0.7, note:'Fisso + incentivi, gestisce GDO + HORECA + dettaglio' },
        ]},
      ]},
      '4': { cosa:'2 agenti per canale (GDO + HORECA) + inside sales', tempo_mesi:4, moduli:[
        { id:'rete', nome:'Rete agenti per canale', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'agente_gdo', nome:'Agente GDO', costo_mensile:1000, costo_setup:0, impatto:0.3, note:'Per insegna/zona' },
          { id:'agente_horeca', nome:'Agente HORECA', costo_mensile:800, costo_setup:0, impatto:0.25, note:'Per zona/tipologia ristorazione' },
          { id:'dip', nome:'Commerciale dipendente', costo_mensile:2200, costo_setup:0, impatto:0.25, note:'Fisso + incentivi' },
        ]},
        { id:'inside', nome:'Inside sales/back-office commerciale', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'dip', nome:'Inside sales dipendente', costo_mensile:1800, costo_setup:0, impatto:0.2, note:'Gestione ordini, riordini, promozioni, supporto agenti' },
          { id:'parttime', nome:'Inside sales part-time', costo_mensile:900, costo_setup:0, impatto:0.1, note:'4h/giorno' },
        ]},
      ]},
      '5': { cosa:'Dir. commerciale + rete agenti nazionale + sviluppo export', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Direttore commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale food dipendente', costo_mensile:3500, costo_setup:0, impatto:0.5, note:'Coordinamento agenti, rapporti GDO, pricing, sviluppo export' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1800, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
        { id:'export', nome:'Sviluppo export', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'manager', nome:'Export manager dedicato', costo_mensile:2500, costo_setup:0, impatto:0.2, note:'Fiere internazionali, importatori, certificazioni export' },
          { id:'consulente', nome:'Consulente export/TEM', costo_mensile:1000, costo_setup:500, impatto:0.1, note:'Temporary export manager, supporto bandi ICE/SIMEST' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini su carta e telefono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con clienti, ordini, scadenze pagamenti e promozioni', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Fogli Google strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Cliente, canale (GDO/HORECA/dettaglio), ordini, pagamenti, promo attive' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free/Zoho)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline buyer, storico ordini, reminder scadenze' },
        ]},
      ]},
      '3': { cosa:'CRM food con buyer GDO, contratti annuali, promozioni pianificate', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM food industry', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'CRM food/FMCG (Salesforce/Zoho CRM)', costo_mensile:80, costo_setup:500, impatto:1.0, note:'Pipeline buyer, contratti annuali, piano promo, performance per insegna' },
          { id:'generico', nome:'CRM leggero (Pipedrive/Freshsales)', costo_mensile:40, costo_setup:300, impatto:0.6, note:'Pipeline base, storico, meno specifico per food trade' },
        ]},
      ]},
      '4': { cosa:'CRM integrato con gestionale produzione e logistica', tempo_mesi:2, moduli:[
        { id:'integrazione', nome:'Gestionale food integrato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'erp_food', nome:'ERP food (CSB-System/Sage X3 Food)', costo_mensile:600, costo_setup:2000, impatto:1.0, note:'Ordini, produzione, lotti, tracciabilita, logistica, fatturazione' },
          { id:'modulare', nome:'CRM + gestionale produzione separati', costo_mensile:300, costo_setup:1000, impatto:0.6, note:'Sistemi collegati via API, meno integrato' },
        ]},
      ]},
      '5': { cosa:'ERP food completo — ordini, produzione, lotti, tracciabilita, BI', tempo_mesi:4, moduli:[
        { id:'erp', nome:'ERP food enterprise', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP food enterprise (CSB/SAP Food/Infor M3)', costo_mensile:1200, costo_setup:6000, impatto:1.0, note:'Ordini, ricette, produzione, lotti, tracciabilita, qualita, logistica, BI' },
          { id:'mid', nome:'ERP food mid-market (Argo Food/TeamSystem)', costo_mensile:600, costo_setup:3000, impatto:0.6, note:'Funzionalita core food, costo inferiore' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Organigramma produzione/qualita/vendita definito', tempo_mesi:1, moduli:[
        { id:'ruoli', nome:'Organigramma produzione + commerciale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Chi produce, chi controlla qualita, chi vende — mansionario' },
        { id:'sicurezza', nome:'Formazione HACCP base tutti i dipendenti', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:100, impatto:0.15, note:'Corso HACCP base obbligatorio per tutti' },
      ]},
      '3': { cosa:'Responsabile produzione + pianificazione settimanale', tempo_mesi:2, moduli:[
        { id:'resp_prod', nome:'Responsabile produzione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione interna operaio senior', costo_mensile:200, costo_setup:500, impatto:0.85, note:'Gia conosce processi e macchinari' },
          { id:'esterno', nome:'Resp. produzione esterno', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Esperienza da altro stabilimento food' },
        ]},
      ]},
      '4': { cosa:'KPI produzione + responsabile qualita autonomo', tempo_mesi:3, moduli:[
        { id:'kpi', nome:'Sistema KPI stabilimento', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Resa produttiva, scarti, tempi, costi per lotto' },
        { id:'qualita', nome:'Responsabile qualita dedicato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'interno', nome:'Addetto qualita interno formato', costo_mensile:200, costo_setup:500, impatto:0.3, note:'Formazione HACCP avanzata + delega controllo qualita' },
          { id:'consulente', nome:'Consulente qualita esterno', costo_mensile:400, costo_setup:0, impatto:0.4, note:'Visite periodiche, audit, aggiornamento HACCP' },
        ]},
      ]},
      '5': { cosa:'Management completo — titolare solo strategia e sviluppo', tempo_mesi:4, moduli:[
        { id:'manager', nome:'Direttore stabilimento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Direttore stabilimento dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Produzione + qualita + personale + logistica' },
          { id:'fractional', nome:'Plant manager fractional', costo_mensile:1500, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Processi artigianali — nessuna formalizzazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'HACCP strutturato + schede prodotto e gestione allergeni', tempo_mesi:1, moduli:[
        { id:'haccp', nome:'Piano HACCP strutturato', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'consulente', nome:'Piano HACCP con consulente + software', costo_mensile:150, costo_setup:500, impatto:0.7, note:'Analisi rischi, CCP, registrazioni digitali, aggiornamento periodico' },
          { id:'manuale', nome:'Piano HACCP manuale + registri', costo_mensile:0, costo_setup:300, impatto:0.45, note:'Manuale autocontrollo, registri cartacei, checklist pulizia' },
        ]},
        { id:'allergeni', nome:'Gestione allergeni e contaminazioni', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Procedure cross-contamination, etichettatura allergeni, linee dedicate' },
      ]},
      '3': { cosa:'Gestionale produzione con ricette, lotti, scadenze e tracciabilita', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Software gestione produzione food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'MES/gestionale food (CSB-System lite/FoodManager)', costo_mensile:300, costo_setup:2000, impatto:1.0, note:'Ricette, distinte base, lotti, tracciabilita, scadenze, costi produzione' },
          { id:'generico', nome:'Gestionale generico + Excel produzione', costo_mensile:100, costo_setup:800, impatto:0.5, note:'Fatture in Cloud + fogli Excel per lotti e tracciabilita' },
        ]},
      ]},
      '4': { cosa:'Certificazione BRC/IFS per accesso GDO nazionale', tempo_mesi:4, moduli:[
        { id:'certificazione', nome:'Certificazione qualita food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'brc_ifs', nome:'BRC/IFS con consulente + ente certificatore', costo_mensile:200, costo_setup:5000, impatto:1.0, note:'Standard richiesto da GDO nazionale/internazionale, prerequisito listing' },
          { id:'iso22000', nome:'ISO 22000 (alternativa)', costo_mensile:150, costo_setup:3500, impatto:0.65, note:'Meno costosa, buona per HORECA e GDO locale' },
        ]},
      ]},
      '5': { cosa:'ERP produzione con MES + automazione linee + BI per efficienza', tempo_mesi:4, moduli:[
        { id:'erp_prod', nome:'ERP produzione food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP + MES food (CSB/SAP PP)', costo_mensile:1000, costo_setup:8000, impatto:1.0, note:'Pianificazione produzione, MES, OEE, tracciabilita completa, BI efficienza' },
          { id:'mid', nome:'Gestionale produzione mid-market', costo_mensile:500, costo_setup:4000, impatto:0.55, note:'Funzionalita core, meno automazione e BI' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo basato su costo + margine fisso — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pricing differenziato per canale: GDO, HORECA, dettaglio, DTC', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Listini per canale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Prezzo diverso per GDO (volume), HORECA (servizio), dettaglio, e-commerce' },
        { id:'analisi', nome:'Analisi margini per prodotto e canale', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:0, impatto:0.15, note:'Quale prodotto guadagna di piu, quale canale rende meglio' },
      ]},
      '3': { cosa:'Linea premium/artigianale + linea standard — segmentazione margini', tempo_mesi:2, moduli:[
        { id:'premium', nome:'Linea premium/artigianale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Packaging premium, ingredienti selezionati, storytelling — margine 2x' },
        { id:'standard', nome:'Linea standard/GDO', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Volume, pricing competitivo, margine base' },
      ]},
      '4': { cosa:'Private label per GDO + brand proprio posizionato', tempo_mesi:3, moduli:[
        { id:'pl', nome:'Strategia private label/brand', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'copacker', nome:'Copacking per insegne GDO', costo_mensile:200, costo_setup:1000, impatto:0.7, note:'Produci con marchio del supermercato — volume garantito, margine piu basso' },
          { id:'brand', nome:'Brand proprio per GDO (listing)', costo_mensile:300, costo_setup:1500, impatto:1.0, note:'Listing fee + promozioni, ma margine e brand tuoi' },
        ]},
      ]},
      '5': { cosa:'Mix ricavi ottimizzato — brand, PL, export, DTC, co-packing', tempo_mesi:4, moduli:[
        { id:'mix', nome:'Strategia mix ricavi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'Mix completo (brand + PL + export + DTC)', costo_mensile:500, costo_setup:2500, impatto:1.0, note:'Bilanciamento brand proprio, PL per volumi, export per margine, DTC per relazione' },
          { id:'focus', nome:'Focus su 2 canali principali', costo_mensile:200, costo_setup:1000, impatto:0.55, note:'Concentrazione su brand GDO + 1 canale secondario' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo etichetta e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Social con foto prodotti/ricette + packaging come strumento di vendita', tempo_mesi:1, moduli:[
        { id:'social', nome:'Social media food', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.5, note:'Instagram/Facebook con foto prodotti, ricette, dietro le quinte produzione' },
        { id:'packaging', nome:'Restyling packaging/etichette', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Il pack vende: storytelling su confezione, design professionale' },
      ]},
      '3': { cosa:'Branding professionale + fiere food (Cibus, TuttoFood, SIAL)', tempo_mesi:2, moduli:[
        { id:'fiere', nome:'Partecipazione fiere food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'stand', nome:'Stand espositivo (Cibus/TuttoFood)', costo_mensile:300, costo_setup:5000, impatto:1.0, note:'Stand con degustazione, 1-2 fiere/anno, contatto diretto buyer' },
          { id:'visitatore', nome:'Visita come operatore + networking', costo_mensile:100, costo_setup:500, impatto:0.4, note:'Biglietti, eventi B2B, niente stand' },
        ]},
        { id:'degustazioni', nome:'Degustazioni in-store/eventi', tipo:'flag', obbligatorio:false, costo_mensile:200, costo_setup:300, impatto:0.15, note:'Far assaggiare il prodotto — conversion altissima nel food' },
      ]},
      '4': { cosa:'Trade marketing GDO + social content + PR food blogger', tempo_mesi:2, moduli:[
        { id:'trade', nome:'Trade marketing GDO', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia trade marketing food', costo_mensile:1200, costo_setup:2000, impatto:1.0, note:'Promozioni in-store, materiale POP, volantini insegne, degustazioni' },
          { id:'interno', nome:'Trade marketing interno', costo_mensile:500, costo_setup:1000, impatto:0.5, note:'Gestione diretta promo con buyer, materiale base' },
        ]},
        { id:'pr', nome:'PR food blogger/influencer', tipo:'flag', obbligatorio:false, costo_mensile:300, costo_setup:500, impatto:0.2, note:'Invio prodotti a food blogger, recensioni, ricette sponsorizzate' },
      ]},
      '5': { cosa:'Piano marketing completo — brand building, trade, digital, export', tempo_mesi:4, moduli:[
        { id:'piano', nome:'Piano marketing food completo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing food/FMCG', costo_mensile:2500, costo_setup:5000, impatto:1.0, note:'Brand building, trade marketing, digital, fiere internazionali, export promo' },
          { id:'interno', nome:'Marketing manager food interno', costo_mensile:1200, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata a marketing, trade, social, fiere' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito vetrina con storia aziendale, prodotti, certificazioni', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito vetrina food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom WordPress (design food)', costo_mensile:30, costo_setup:2000, impatto:1.0, note:'Storytelling, gallery prodotti, certificazioni, ricette, contatti buyer' },
          { id:'template', nome:'Sito da template (Wix/Squarespace)', costo_mensile:20, costo_setup:600, impatto:0.5, note:'Template food, meno personalizzabile' },
        ]},
      ]},
      '3': { cosa:'Catalogo prodotti online con schede tecniche e contatti buyer', tempo_mesi:2, moduli:[
        { id:'catalogo', nome:'Catalogo prodotti B2B', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1500, impatto:0.5, note:'Schede prodotto con ingredienti, allergeni, shelf life, packaging, MOQ' },
        { id:'ricette', nome:'Sezione ricette con i prodotti', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Ricette per HORECA e consumatori con i nostri prodotti come ingredienti' },
      ]},
      '4': { cosa:'E-commerce DTC per vendita diretta al consumatore + area buyer', tempo_mesi:3, moduli:[
        { id:'ecommerce', nome:'E-commerce food DTC', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'shopify', nome:'Shopify + tema food', costo_mensile:100, costo_setup:3000, impatto:1.0, note:'Vendita diretta consumatore, box regalo, abbonamenti, storytelling' },
          { id:'woocommerce', nome:'WooCommerce + plugin food', costo_mensile:50, costo_setup:2000, impatto:0.6, note:'Piu personalizzabile, meno app ecosystem' },
        ]},
        { id:'buyer_area', nome:'Area riservata buyer B2B', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:1000, impatto:0.2, note:'Login buyer con listini, ordini, documentazione tecnica' },
      ]},
      '5': { cosa:'Piattaforma B2B/DTC integrata con ERP, ordini e tracciabilita lotto', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma food omnicanale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Piattaforma integrata ERP (B2B + DTC)', costo_mensile:800, costo_setup:10000, impatto:1.0, note:'E-commerce DTC + portale B2B + ERP, ordini, tracciabilita lotto, fatturazione' },
          { id:'mid', nome:'Shopify + area B2B separata', costo_mensile:300, costo_setup:4000, impatto:0.5, note:'E-commerce DTC + portale B2B base, meno integrato' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento materie prime',
      '1': { chi:'Titolare', cosa:'Acquisto materie prime da 1-2 fornitori locali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto fornitori — qualita, prezzi, certificazioni, tempi', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database fornitori materie prime', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda per fornitore: listino, certificazioni, tempi consegna, lotti minimi' },
        { id:'qualita_mp', nome:'Controllo qualita materie prime in ingresso', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Analisi a campione su ogni lotto — no sorprese in produzione' },
      ]},
      '3': { cosa:'Contratti quadro con fornitori — prezzi bloccati, volumi, filiera corta', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro fornitori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Contratti annuali con 3-5 fornitori chiave, prezzi bloccati, volumi' },
        { id:'filiera', nome:'Sourcing filiera corta/km0', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Fornitori locali per storytelling + freschezza + sostenibilita' },
      ]},
      '4': { cosa:'Buyer dedicato — diversificazione fornitori, import materie prime', tempo_mesi:3, moduli:[
        { id:'buyer', nome:'Buyer materie prime food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer food dipendente', costo_mensile:2200, costo_setup:0, impatto:1.0, note:'Negoziazione, sourcing, controllo qualita, import, gestione scorte' },
          { id:'parttime', nome:'Buyer part-time/admin con delega', costo_mensile:1000, costo_setup:0, impatto:0.6, note:'Gestisce riordini, confronto fornitori, controllo qualita base' },
        ]},
      ]},
      '5': { cosa:'Resp. supply chain — contratti annuali, hedging prezzi, filiera certificata', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Responsabile supply chain food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Supply chain manager food dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Strategia acquisti, hedging prezzi materie prime, filiera certificata, import' },
          { id:'fractional', nome:'Supply chain manager fractional', costo_mensile:1800, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE VINI
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_vini: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare vende in cantina e a pochi clienti storici', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Visite proattive a enoteche, ristoranti e wine bar zona', tempo_mesi:2, moduli:[
        { id:'degustazioni', nome:'Kit degustazione per visite', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.6, note:'Campioni vino, schede tecniche, listino HORECA — visite a ristoranti e enoteche' },
        { id:'wine_list', nome:'Proposta inserimento in carta vini', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Scheda vino per sommelier: abbinamenti, note degustazione, premi' },
      ]},
      '3': { cosa:'Agente vini per HORECA/enoteche della regione', tempo_mesi:3, moduli:[
        { id:'agente', nome:'Agente vini', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'plurimandatario', nome:'Agente plurimandatario vini', costo_mensile:800, costo_setup:500, impatto:1.0, note:'Provvigione 8-12%, porta portafoglio ristoranti/enoteche, gestisce ordini' },
          { id:'dip', nome:'Commerciale wine dipendente', costo_mensile:2200, costo_setup:0, impatto:0.8, note:'Fisso + auto + incentivi, fidelizzato alla cantina' },
          { id:'distributore', nome:'Accordo con distributore vini locale', costo_mensile:0, costo_setup:500, impatto:0.6, note:'Il distributore gestisce logistica e vendita, margine inferiore' },
        ]},
      ]},
      '4': { cosa:'Rete agenti regionale + sviluppo export o GDO', tempo_mesi:4, moduli:[
        { id:'rete', nome:'Rete agenti vini', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'agente', nome:'Agente HORECA/enoteche', costo_mensile:800, costo_setup:0, impatto:0.3, note:'Per zona/regione' },
          { id:'dip', nome:'Commerciale dipendente', costo_mensile:2200, costo_setup:0, impatto:0.25, note:'Per zona ad alto potenziale' },
        ]},
        { id:'export', nome:'Sviluppo export', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'manager', nome:'Export manager vini dedicato', costo_mensile:2500, costo_setup:0, impatto:0.2, note:'Fiere internazionali, importatori, certificazioni export' },
          { id:'tem', nome:'Temporary export manager', costo_mensile:1000, costo_setup:500, impatto:0.1, note:'Supporto bandi ICE/SIMEST, contatti importatori' },
        ]},
      ]},
      '5': { cosa:'Dir. commerciale + rete agenti nazionale + export strutturato', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Direttore commerciale vini', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale wine dipendente', costo_mensile:3500, costo_setup:0, impatto:0.5, note:'Coordinamento agenti, rapporti GDO, pricing, export' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1800, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini a voce e WhatsApp', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con clienti HORECA, ordini, pagamenti e preferenze', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Fogli Google strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Cliente, tipo (ristorante/enoteca/privato), ordini, vini preferiti' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free/Zoho)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline + storico ordini + reminder riordino' },
        ]},
      ]},
      '3': { cosa:'CRM vini con gestione clienti HORECA, contratti e promozioni', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM wine/HORECA', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'CRM wine (VinCRM/Vin65)', costo_mensile:80, costo_setup:500, impatto:1.0, note:'Gestione clienti HORECA, wine club, ordini per etichetta, storico' },
          { id:'generico', nome:'CRM generico (Pipedrive/Zoho)', costo_mensile:40, costo_setup:300, impatto:0.6, note:'Pipeline vendita, meno specifico per vino' },
        ]},
      ]},
      '4': { cosa:'Gestionale cantina integrato — ordini, stock bottiglie, spedizioni', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Gestionale cantina', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'wine', nome:'Gestionale cantina (Enologia/WineDirect)', costo_mensile:300, costo_setup:1500, impatto:1.0, note:'Stock per etichetta/annata, ordini, spedizioni, compliance accise' },
          { id:'generico', nome:'Gestionale generico + foglio stock', costo_mensile:100, costo_setup:600, impatto:0.55, note:'Danea/FiC + Excel per stock bottiglie' },
        ]},
      ]},
      '5': { cosa:'ERP wine completo — produzione, stock, ordini, accise, export docs', tempo_mesi:4, moduli:[
        { id:'erp', nome:'ERP cantina completo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP wine (Enologia Pro/SAP Wine)', costo_mensile:800, costo_setup:5000, impatto:1.0, note:'Vendemmia, vinificazione, imbottigliamento, stock, accise, ordini, export, BI' },
          { id:'mid', nome:'Gestionale cantina mid-market', costo_mensile:400, costo_setup:2500, impatto:0.6, note:'Funzionalita core, meno automazione' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — titolare fa tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Ruoli cantina/vendita separati — mansionario', tempo_mesi:1, moduli:[
        { id:'organigramma', nome:'Organigramma cantina + commerciale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Enologo/cantina, vendita/accoglienza, amministrazione — chi fa cosa' },
      ]},
      '3': { cosa:'Enologo/responsabile cantina + addetto accoglienza/vendita', tempo_mesi:2, moduli:[
        { id:'enologo', nome:'Enologo/responsabile cantina', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Enologo dipendente', costo_mensile:2500, costo_setup:0, impatto:0.7, note:'Gestione vinificazione, qualita, blend, imbottigliamento' },
          { id:'consulente', nome:'Enologo consulente', costo_mensile:800, costo_setup:0, impatto:0.5, note:'Visite periodiche, analisi, consigli vendemmia e vinificazione' },
        ]},
        { id:'accoglienza', nome:'Addetto wine tasting/vendita diretta', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'dip', nome:'Addetto accoglienza dipendente', costo_mensile:1600, costo_setup:0, impatto:0.2, note:'Degustazioni, visite cantina, vendita diretta, wine club' },
          { id:'stagionale', nome:'Addetto stagionale (primavera-autunno)', costo_mensile:1200, costo_setup:0, impatto:0.15, note:'Solo stagione alta: aprile-ottobre' },
        ]},
      ]},
      '4': { cosa:'KPI cantina/vendita + responsabile commerciale', tempo_mesi:3, moduli:[
        { id:'resp_comm', nome:'Responsabile commerciale vini', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2800, costo_setup:0, impatto:1.0, note:'Coordinamento agenti, rapporti HORECA, pricing, export' },
          { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1400, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
        { id:'kpi', nome:'Dashboard KPI cantina', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Vendite per etichetta, margine, rotazione, export vs Italia' },
      ]},
      '5': { cosa:'Management completo — titolare solo strategia e brand', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Direttore operativo cantina', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. operativo dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Cantina, vendite, logistica, personale — il titolare fa brand e relazioni' },
          { id:'fractional', nome:'Operations manager fractional', costo_mensile:1500, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Processi artigianali — nessuna formalizzazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Schede vino strutturate + gestione registro cantina/accise', tempo_mesi:1, moduli:[
        { id:'registro', nome:'Registro cantina e accise digitale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.7, note:'Registro carico/scarico, accise, documenti di trasporto e-AD' },
        { id:'schede', nome:'Schede tecniche vini', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.2, note:'Scheda per etichetta: vitigno, vinificazione, analisi, note degustazione, abbinamenti' },
      ]},
      '3': { cosa:'Software gestione cantina con vinificazione e tracciabilita', tempo_mesi:2, moduli:[
        { id:'software', nome:'Software gestione cantina', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Gestionale cantina (Enologia/WineGest)', costo_mensile:200, costo_setup:1500, impatto:1.0, note:'Vinificazione, vasche, analisi, imbottigliamento, lotti, accise automatiche' },
          { id:'base', nome:'Foglio Excel avanzato + registro cartaceo', costo_mensile:0, costo_setup:500, impatto:0.4, note:'Gestione manuale strutturata' },
        ]},
      ]},
      '4': { cosa:'Certificazioni qualita (DOC/DOCG/BIO) + processo qualita strutturato', tempo_mesi:3, moduli:[
        { id:'certificazioni', nome:'Gestione certificazioni vino', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'doc_bio', nome:'DOC/DOCG + certificazione biologica', costo_mensile:200, costo_setup:2000, impatto:1.0, note:'Documentazione DOC/DOCG, eventuale conversione bio, audit annuali' },
          { id:'doc', nome:'Solo DOC/DOCG (senza bio)', costo_mensile:100, costo_setup:1000, impatto:0.6, note:'Gestione disciplinare, analisi, documentazione per consorzio' },
        ]},
      ]},
      '5': { cosa:'ERP cantina + tracciabilita completa vigna-bottiglia + BI', tempo_mesi:4, moduli:[
        { id:'erp', nome:'ERP cantina completo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP wine (Enologia Pro/Custom)', costo_mensile:700, costo_setup:5000, impatto:1.0, note:'Vigna, vendemmia, vinificazione, imbottigliamento, stock, accise, vendite, BI' },
          { id:'mid', nome:'Gestionale cantina avanzato', costo_mensile:350, costo_setup:2500, impatto:0.55, note:'Funzionalita core, meno BI' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo unico per tutti — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pricing differenziato per canale: HORECA, enoteca, privato, export', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Listini per canale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Prezzo diverso per ristorante, enoteca, privato, distributore, export' },
        { id:'analisi', nome:'Analisi margini per etichetta/canale', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:0, impatto:0.15, note:'Quale vino rende di piu, quale canale e piu profittevole' },
      ]},
      '3': { cosa:'Wine tasting in cantina + vendita diretta a privati', tempo_mesi:2, moduli:[
        { id:'tasting', nome:'Wine tasting experience', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'strutturato', nome:'Degustazione strutturata a pagamento', costo_mensile:0, costo_setup:500, impatto:0.6, note:'Percorso degustazione, abbinamento cibo, tour cantina — conversion vendita 80%+' },
          { id:'gratuito', nome:'Degustazione gratuita per gruppi/visitatori', costo_mensile:100, costo_setup:200, impatto:0.35, note:'Degustazione base per attrarre visitatori, vendita al calice' },
        ]},
        { id:'wine_club', nome:'Wine club/abbonamento', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Abbonamento trimestrale/semestrale con selezione vini, eventi riservati' },
      ]},
      '4': { cosa:'Linea premium/riserva + eventi in cantina come revenue', tempo_mesi:2, moduli:[
        { id:'premium', nome:'Linea premium/riserva/cru', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Selezione top, invecchiamento, packaging premium — margine 3-5x vs base' },
        { id:'eventi', nome:'Eventi in cantina (cene, matrimoni, corporate)', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Affitto spazi + catering + vini propri — revenue aggiuntivo' },
      ]},
      '5': { cosa:'Mix ricavi ottimizzato — HORECA, export, DTC, wine club, eventi', tempo_mesi:3, moduli:[
        { id:'mix', nome:'Ottimizzazione mix ricavi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'Mix completo (HORECA + export + DTC + eventi)', costo_mensile:500, costo_setup:2000, impatto:1.0, note:'Diversificazione canali per massimizzare margine e ridurre rischio' },
          { id:'focus', nome:'Focus su 2 canali principali', costo_mensile:200, costo_setup:800, impatto:0.55, note:'Concentrazione su HORECA Italia + 1 canale secondario' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo etichetta e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Instagram con foto vigneto/cantina + Google My Business', tempo_mesi:1, moduli:[
        { id:'social', nome:'Social media cantina', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Instagram con foto vigneto, cantina, vendemmia, degustazioni' },
        { id:'gmb', nome:'Google My Business cantina', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Scheda con orari, foto, recensioni, prenotazione degustazione' },
      ]},
      '3': { cosa:'Fiere vino (Vinitaly, Prowein) + guide (Gambero Rosso, Slow Wine)', tempo_mesi:2, moduli:[
        { id:'fiere', nome:'Partecipazione fiere vino', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'stand', nome:'Stand a Vinitaly/Prowein', costo_mensile:300, costo_setup:5000, impatto:1.0, note:'Stand, campionatura, 1-2 fiere/anno, contatto diretto importatori e buyer' },
          { id:'collettivo', nome:'Partecipazione collettiva con consorzio', costo_mensile:150, costo_setup:1500, impatto:0.5, note:'Spazio condiviso con consorzio, costi ridotti' },
        ]},
        { id:'guide', nome:'Iscrizione guide vino', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Gambero Rosso, Slow Wine, Bibenda — invio campioni, visite degustatori' },
      ]},
      '4': { cosa:'PR wine + enoturismo strutturato + collaborazioni chef', tempo_mesi:2, moduli:[
        { id:'pr', nome:'PR e comunicazione vino', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia PR wine specializzata', costo_mensile:1000, costo_setup:2000, impatto:1.0, note:'Ufficio stampa, recensioni, eventi stampa, influencer wine' },
          { id:'freelance', nome:'PR freelance + social', costo_mensile:500, costo_setup:500, impatto:0.5, note:'1 professionista, focus stampa locale e social' },
        ]},
        { id:'enoturismo', nome:'Pacchetti enoturismo', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Accordi con agriturismi, tour operator, piattaforme (Winedering, Airbnb Experiences)' },
      ]},
      '5': { cosa:'Piano marketing wine completo — brand, fiere internazionali, digital, enoturismo', tempo_mesi:4, moduli:[
        { id:'piano', nome:'Piano marketing wine', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing wine/food', costo_mensile:2000, costo_setup:4000, impatto:1.0, note:'Brand positioning, fiere internazionali, digital, PR, enoturismo' },
          { id:'interno', nome:'Marketing manager wine interno', costo_mensile:1000, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito cantina con storia, vini, territorio e contatti', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito cantina', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom (design wine)', costo_mensile:30, costo_setup:2000, impatto:1.0, note:'Storytelling, gallery vini, territorio, prenotazione degustazione' },
          { id:'template', nome:'Sito da template (Squarespace/Wix)', costo_mensile:20, costo_setup:600, impatto:0.5, note:'Template wine, meno personalizzabile' },
        ]},
      ]},
      '3': { cosa:'Catalogo vini online con schede tecniche + prenotazione degustazione', tempo_mesi:2, moduli:[
        { id:'catalogo', nome:'Catalogo vini online', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1000, impatto:0.5, note:'Scheda per vino: foto, vitigno, vinificazione, note degustazione, premi' },
        { id:'booking', nome:'Prenotazione degustazione online', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.4, note:'Calendly/form per prenotare visita e degustazione in cantina' },
      ]},
      '4': { cosa:'E-commerce DTC per vendita diretta + wine club online', tempo_mesi:3, moduli:[
        { id:'ecommerce', nome:'E-commerce wine DTC', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'shopify', nome:'Shopify + tema wine', costo_mensile:100, costo_setup:3000, impatto:1.0, note:'Vendita diretta, box regalo, abbonamento wine club, spedizione' },
          { id:'woocommerce', nome:'WooCommerce + plugin wine', costo_mensile:50, costo_setup:2000, impatto:0.6, note:'Piu personalizzabile, gestione eta minima, temperatura spedizione' },
        ]},
      ]},
      '5': { cosa:'Piattaforma integrata — DTC + B2B + wine club + enoturismo', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma wine omnicanale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Piattaforma wine enterprise (WineDirect/custom)', costo_mensile:500, costo_setup:8000, impatto:1.0, note:'E-commerce DTC + portale B2B + wine club + prenotazione esperienze + CRM' },
          { id:'mid', nome:'Shopify + area B2B + plugin wine club', costo_mensile:200, costo_setup:3000, impatto:0.5, note:'E-commerce + gestione base wine club e B2B' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento e vigna',
      '1': { chi:'Titolare', cosa:'Vigna propria e acquisto uve da 1-2 conferitori', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Selezione fornitori — uve, tappi, bottiglie, etichette', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database fornitori cantina', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda per fornitore: uve (vitigno, zona, qualita), vetro, tappi, etichette, cartoni' },
      ]},
      '3': { cosa:'Accordi con conferitori uve + fornitori packaging selezionati', tempo_mesi:2, moduli:[
        { id:'uve', nome:'Accordi conferitori uve', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Contratti con 2-3 viticoltori: vitigno, resa max, prezzo, tempistica vendemmia' },
        { id:'packaging', nome:'Fornitori packaging qualita', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Bottiglie, tappi sughero/sintetico, etichette, capsule — qualita per posizionamento' },
      ]},
      '4': { cosa:'Enologo consulente per blend + gestione vigna strutturata', tempo_mesi:3, moduli:[
        { id:'vigna', nome:'Gestione vigna/agronomo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agronomo', nome:'Agronomo/consulente viticolo', costo_mensile:500, costo_setup:0, impatto:1.0, note:'Gestione fitosanitaria, potatura, vendemmia, conversione bio' },
          { id:'autonomo', nome:'Gestione autonoma con formazione', costo_mensile:0, costo_setup:500, impatto:0.5, note:'Il titolare gestisce con supporto formativo periodico' },
        ]},
      ]},
      '5': { cosa:'Resp. produzione — vigna, cantina, qualita, packaging, logistica', tempo_mesi:4, moduli:[
        { id:'resp', nome:'Responsabile produzione cantina', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Enologo/resp. produzione dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Vigna, vinificazione, qualita, imbottigliamento, accise, logistica' },
          { id:'fractional', nome:'Enologo consulente avanzato', costo_mensile:1200, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana, periodi critici full-time (vendemmia)' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE FORNO
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_forno: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare al banco — vendita diretta al pubblico', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Consegne a bar, ristoranti e hotel della zona', tempo_mesi:1, moduli:[
        { id:'consegne', nome:'Servizio consegna HORECA zona', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.6, note:'Consegna mattutina a bar, ristoranti, hotel nel raggio 15-20 km' },
        { id:'campionature', nome:'Kit degustazione per nuovi clienti HORECA', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.3, note:'Campioni pane speciale, dolci, focacce — lasciati in prova' },
      ]},
      '3': { cosa:'Agente/venditore dedicato canale HORECA + GDO locale', tempo_mesi:2, moduli:[
        { id:'venditore', nome:'Venditore HORECA/GDO', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Venditore dipendente con furgone', costo_mensile:2000, costo_setup:0, impatto:1.0, note:'Vendita + consegna, giro clienti fisso, sviluppo nuovi' },
          { id:'agente', nome:'Agente ENASARCO food', costo_mensile:800, costo_setup:500, impatto:0.7, note:'Provvigione su venduto, porta portafoglio bar/ristoranti' },
        ]},
      ]},
      '4': { cosa:'2 venditori per zona + sviluppo GDO con listing', tempo_mesi:3, moduli:[
        { id:'rete', nome:'Rete vendita forno', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'venditore', nome:'Venditore/consegnatore', costo_mensile:2000, costo_setup:0, impatto:0.3, note:'Giro clienti fisso per zona' },
          { id:'agente', nome:'Agente HORECA', costo_mensile:800, costo_setup:0, impatto:0.2, note:'Per zona/canale' },
        ]},
        { id:'gdo', nome:'Sviluppo canale GDO locale', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Contatto buyer GDO locale, listing prodotti confezionati' },
      ]},
      '5': { cosa:'Resp. commerciale + rete vendita + canale GDO strutturato', tempo_mesi:5, moduli:[
        { id:'resp', nome:'Responsabile commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2800, costo_setup:0, impatto:0.5, note:'Coordinamento venditori, rapporti GDO, pricing, sviluppo' },
          { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1400, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — vendite al banco e a memoria', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con clienti HORECA, ordini ricorrenti, consegne', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel/Fogli Google strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Cliente, tipo, ordine ricorrente, giorno consegna, prodotti' },
          { id:'crm_free', nome:'CRM gratuito (HubSpot Free)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline clienti + reminder riordini' },
        ]},
      ]},
      '3': { cosa:'Gestionale con ordini ricorrenti, produzione e consegne', tempo_mesi:1, moduli:[
        { id:'gestionale', nome:'Gestionale panificio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Gestionale panificio/food (GestPan/FoodManager)', costo_mensile:80, costo_setup:500, impatto:1.0, note:'Ordini ricorrenti, produzione, consegne, listini per cliente' },
          { id:'generico', nome:'Gestionale generico (Danea/FiC)', costo_mensile:40, costo_setup:300, impatto:0.6, note:'Fatturazione e ordini, meno specifico per forno' },
        ]},
      ]},
      '4': { cosa:'Gestionale integrato — ordini, produzione, consegne, magazzino', tempo_mesi:2, moduli:[
        { id:'erp', nome:'ERP panificio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'food', nome:'ERP food con modulo produzione', costo_mensile:400, costo_setup:2000, impatto:1.0, note:'Ordini, ricette/distinte, produzione, consegne, tracciabilita' },
          { id:'base', nome:'Gestionale + Excel produzione', costo_mensile:150, costo_setup:800, impatto:0.55, note:'Fatturazione/ordini + foglio produzione separato' },
        ]},
      ]},
      '5': { cosa:'ERP completo — ordini, produzione, HACCP, consegne, fatturazione, BI', tempo_mesi:3, moduli:[
        { id:'erp_full', nome:'ERP panificio completo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP food enterprise', costo_mensile:800, costo_setup:5000, impatto:1.0, note:'Ordini, ricette, produzione, HACCP, consegne, accise, fatturazione, BI' },
          { id:'mid', nome:'ERP mid-market food', costo_mensile:400, costo_setup:2500, impatto:0.6, note:'Funzionalita core' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Titolare in laboratorio e al banco — nessuna delega', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Separazione ruoli: laboratorio, banco vendita, consegne', tempo_mesi:1, moduli:[
        { id:'organigramma', nome:'Organigramma forno', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Laboratorio (produzione), banco (vendita), consegne, admin — chi fa cosa' },
      ]},
      '3': { cosa:'Capo panettiere + addetto banco formato', tempo_mesi:2, moduli:[
        { id:'capo', nome:'Capo panettiere/pasticcere', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione interna operaio esperto', costo_mensile:200, costo_setup:300, impatto:0.85, note:'Gia conosce ricette e macchinari, formazione su gestione turni' },
          { id:'esterno', nome:'Capo panettiere esterno', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Esperienza da altro laboratorio, porta ricette e competenze' },
        ]},
        { id:'banco', nome:'Addetto banco vendita formato', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'dip', nome:'Addetto banco dipendente', costo_mensile:1500, costo_setup:0, impatto:0.2, note:'Vendita, cassa, consiglio prodotto, ordini clienti' },
          { id:'parttime', nome:'Addetto part-time', costo_mensile:800, costo_setup:0, impatto:0.12, note:'Copre mattina o pomeriggio' },
        ]},
      ]},
      '4': { cosa:'KPI produzione + responsabile qualita/HACCP', tempo_mesi:3, moduli:[
        { id:'kpi', nome:'KPI laboratorio/vendita', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Resa produttiva, scarti, scontrino medio banco, fatturato HORECA' },
        { id:'haccp_resp', nome:'Responsabile HACCP', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'interno', nome:'Formazione interna resp. HACCP', costo_mensile:0, costo_setup:500, impatto:0.3, note:'Corso HACCP avanzato per 1 risorsa interna' },
          { id:'consulente', nome:'Consulente HACCP esterno', costo_mensile:200, costo_setup:0, impatto:0.4, note:'Visite periodiche, audit, aggiornamento piano' },
        ]},
      ]},
      '5': { cosa:'Management completo — titolare solo sviluppo e prodotto', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Responsabile operativo forno', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. operativo dipendente', costo_mensile:2800, costo_setup:0, impatto:1.0, note:'Laboratorio, vendita, consegne, personale — il titolare fa sviluppo e ricette' },
          { id:'fractional', nome:'Operations manager fractional', costo_mensile:1400, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Processi artigianali — tutto a esperienza', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Ricettario strutturato + HACCP base + gestione scadenze', tempo_mesi:1, moduli:[
        { id:'ricettario', nome:'Ricettario standardizzato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.6, note:'Ricette con dosi precise, tempi, temperature — producibilita anche senza titolare' },
        { id:'haccp', nome:'Piano HACCP strutturato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.25, note:'CCP, registrazioni temperature, pulizia, allergeni' },
      ]},
      '3': { cosa:'Gestionale produzione con pianificazione giornaliera e tracciabilita', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Software gestione produzione forno', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Gestionale panificio (GestPan/BakeryPro)', costo_mensile:150, costo_setup:1000, impatto:1.0, note:'Pianificazione produzione, ricette, lotti, tracciabilita, ordini HORECA' },
          { id:'manuale', nome:'Pianificazione manuale strutturata', costo_mensile:0, costo_setup:300, impatto:0.45, note:'Tabellone produzione + foglio ordini, aggiornamento manuale' },
        ]},
      ]},
      '4': { cosa:'Certificazioni (BIO, senza glutine) + packaging confezionato per GDO', tempo_mesi:3, moduli:[
        { id:'certificazioni', nome:'Certificazioni prodotto', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'bio', nome:'Certificazione biologica + allergeni', costo_mensile:100, costo_setup:2000, impatto:1.0, note:'Bio per linea premium, gestione allergeni, etichettatura conforme' },
          { id:'standard', nome:'Solo HACCP avanzato + etichettatura', costo_mensile:50, costo_setup:500, impatto:0.5, note:'Etichettatura conforme reg. 1169/2011, tabella nutrizionale' },
        ]},
      ]},
      '5': { cosa:'ERP forno completo + automazione linee + BI produzione', tempo_mesi:4, moduli:[
        { id:'erp', nome:'ERP forno/food completo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP food con MES', costo_mensile:600, costo_setup:4000, impatto:1.0, note:'Pianificazione, produzione, tracciabilita, qualita, consegne, BI' },
          { id:'mid', nome:'Gestionale avanzato', costo_mensile:300, costo_setup:2000, impatto:0.55, note:'Funzionalita core' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo unico al banco — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pricing differenziato: banco, HORECA, GDO, eventi', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Listini per canale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8, note:'Prezzo diverso per banco (pieno), HORECA (volume), GDO (minimo)' },
      ]},
      '3': { cosa:'Linea premium (lievito madre, grani antichi) + servizio catering', tempo_mesi:2, moduli:[
        { id:'premium', nome:'Linea premium/artigianale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Pane lievito madre, grani antichi, farine macinate a pietra — margine 2x' },
        { id:'catering', nome:'Servizio catering/eventi', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Pane per banchetti, focacce per eventi, torte personalizzate' },
      ]},
      '4': { cosa:'Prodotti confezionati per GDO + linea senza glutine/BIO', tempo_mesi:2, moduli:[
        { id:'confezionato', nome:'Linea confezionata GDO', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'brand', nome:'Linea confezionata con brand proprio', costo_mensile:200, costo_setup:1500, impatto:1.0, note:'Grissini, taralli, biscotti confezionati per GDO — margine e brand' },
          { id:'pl', nome:'Produzione private label per insegne', costo_mensile:100, costo_setup:500, impatto:0.6, note:'Volume garantito, margine inferiore, nessun costo marketing' },
        ]},
      ]},
      '5': { cosa:'Mix ricavi: banco + HORECA + GDO confezionato + e-commerce + catering', tempo_mesi:3, moduli:[
        { id:'mix', nome:'Diversificazione canali ricavi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'Mix completo 5 canali', costo_mensile:300, costo_setup:1500, impatto:1.0, note:'Banco, HORECA, GDO confezionato, e-commerce DTC, catering/eventi' },
          { id:'focus', nome:'Focus su 2-3 canali', costo_mensile:100, costo_setup:500, impatto:0.55, note:'Banco + HORECA + 1 canale aggiuntivo' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo insegna e profumo dal forno', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Instagram con foto pane/dolci + Google My Business', tempo_mesi:1, moduli:[
        { id:'social', nome:'Social media forno', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Foto pane appena sfornato, dietro le quinte, storie dal laboratorio' },
        { id:'gmb', nome:'Google My Business + recensioni', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Orari, foto, recensioni, indicazioni — chi cerca "panificio vicino a me"' },
      ]},
      '3': { cosa:'Fiere food artigianali + collaborazioni ristoranti locali', tempo_mesi:2, moduli:[
        { id:'fiere', nome:'Fiere food artigianali/locali', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:1000, impatto:0.5, note:'Stand a mercati, sagre, fiere artigianali — visibilita e vendita diretta' },
        { id:'collab', nome:'Collaborazioni ristoranti/chef', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.2, note:'Il ristorante mette in carta "pane del Forno X" — co-branding' },
      ]},
      '4': { cosa:'Social media professionale + packaging storytelling + eventi', tempo_mesi:2, moduli:[
        { id:'social_pro', nome:'Social media professionale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'smm', nome:'Social media manager/food photographer', costo_mensile:600, costo_setup:500, impatto:1.0, note:'Foto professionali, reel produzione, storie, piano editoriale' },
          { id:'interno', nome:'Social autogestiti con smartphone', costo_mensile:100, costo_setup:200, impatto:0.4, note:'Il titolare filma e posta 3x/settimana' },
        ]},
      ]},
      '5': { cosa:'Piano marketing completo — brand artigianale, fiere, digital, GDO', tempo_mesi:3, moduli:[
        { id:'piano', nome:'Piano marketing forno/bakery', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing food artigianale', costo_mensile:1500, costo_setup:3000, impatto:1.0, note:'Brand identity artigianale, digital, packaging, fiere, PR food' },
          { id:'interno', nome:'Marketing coordinator interno', costo_mensile:800, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito — solo social', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito vetrina con storia, prodotti, orari e dove trovarci', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito panificio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom (design artigianale)', costo_mensile:20, costo_setup:1500, impatto:1.0, note:'Storytelling, foto prodotti, orari, mappa, prenotazione pane' },
          { id:'template', nome:'Sito da template/landing', costo_mensile:10, costo_setup:300, impatto:0.4, note:'Pagina base con info essenziali' },
        ]},
      ]},
      '3': { cosa:'Catalogo prodotti online + prenotazione ordini speciali', tempo_mesi:2, moduli:[
        { id:'catalogo', nome:'Catalogo prodotti + ordini online', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:800, impatto:0.5, note:'Gallery prodotti, ingredienti, allergeni, form ordine per eventi/feste' },
        { id:'prenotazione', nome:'Prenotazione pane/dolci online', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.3, note:'Il cliente prenota pane speciale per il giorno dopo — zero spreco' },
      ]},
      '4': { cosa:'E-commerce prodotti confezionati + box regalo + abbonamento', tempo_mesi:3, moduli:[
        { id:'ecommerce', nome:'E-commerce bakery', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'shopify', nome:'Shopify + tema food', costo_mensile:80, costo_setup:2000, impatto:1.0, note:'Grissini, taralli, biscotti, box regalo, abbonamento mensile' },
          { id:'woocommerce', nome:'WooCommerce', costo_mensile:40, costo_setup:1200, impatto:0.6, note:'Piu personalizzabile' },
        ]},
      ]},
      '5': { cosa:'Piattaforma integrata — e-commerce + ordini B2B + prenotazione', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma omnicanale forno', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'Piattaforma integrata (DTC + B2B + prenotazione)', costo_mensile:400, costo_setup:6000, impatto:1.0, note:'E-commerce + portale ordini HORECA + prenotazione banco + ERP' },
          { id:'base', nome:'E-commerce + area ordini B2B semplice', costo_mensile:150, costo_setup:2500, impatto:0.5, note:'E-commerce DTC + form ordini HORECA' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento farine e ingredienti',
      '1': { chi:'Titolare', cosa:'Acquisto farine dal mulino di fiducia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto mulini — qualita farine, prezzi, certificazioni', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database mulini e fornitori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda per mulino: tipo farina, W, prezzi, consegna, certificazioni bio/macinata a pietra' },
      ]},
      '3': { cosa:'Accordi quadro con mulini + fornitori ingredienti selezionati', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro mulini', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Contratti con 2-3 mulini: prezzo bloccato, consegna settimanale, qualita garantita' },
        { id:'ingredienti', nome:'Fornitori ingredienti premium', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Lievito madre, grani antichi, frutta secca, cioccolato — qualita per linea premium' },
      ]},
      '4': { cosa:'Diversificazione mulini + import grani speciali', tempo_mesi:3, moduli:[
        { id:'buyer', nome:'Buyer farine/ingredienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. acquisti forno dipendente', costo_mensile:1800, costo_setup:0, impatto:1.0, note:'Negoziazione mulini, controllo qualita farine, gestione scorte' },
          { id:'titolare', nome:'Titolare con metodo strutturato', costo_mensile:0, costo_setup:300, impatto:0.5, note:'Il titolare gestisce con budget e analisi costi periodica' },
        ]},
      ]},
      '5': { cosa:'Supply chain forno ottimizzata — filiera corta, grani propri, packaging', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Ottimizzazione supply chain', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'filiera', nome:'Filiera corta con mulino partner', costo_mensile:200, costo_setup:1500, impatto:1.0, note:'Accordo con agricoltore + mulino: grano locale, macinazione dedicata, storytelling' },
          { id:'standard', nome:'Ottimizzazione acquisti standard', costo_mensile:0, costo_setup:500, impatto:0.5, note:'Confronto sistematico, scorte ottimizzate, nessun accordo di filiera' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE CONSERVE
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_conserve: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare gestisce clienti storici — GDO locale e dettaglio', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Visite buyer GDO locale + sviluppo canale HORECA/gastronomie', tempo_mesi:2, moduli:[
        { id:'campionature', nome:'Kit campionature per buyer', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.6, note:'Campioni conserve + schede tecniche + listino per canale' },
        { id:'degustazione', nome:'Degustazioni in-store/fiere', tipo:'flag', obbligatorio:false, costo_mensile:150, costo_setup:200, impatto:0.2, note:'Far assaggiare il prodotto ai buyer e al pubblico' },
      ]},
      '3': { cosa:'Agente food per GDO regionale o HORECA/gastronomie', tempo_mesi:3, moduli:[
        { id:'agente', nome:'Agente conserve alimentari', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'gdo', nome:'Agente ENASARCO canale GDO', costo_mensile:1000, costo_setup:500, impatto:1.0, note:'Provvigione 3-6%, gestisce listing, promozioni, rapporti buyer' },
          { id:'horeca', nome:'Agente HORECA/gastronomie', costo_mensile:800, costo_setup:500, impatto:0.8, note:'Ristoranti, gastronomie, negozi specializzati' },
          { id:'dip', nome:'Commerciale dipendente multicanale', costo_mensile:2200, costo_setup:0, impatto:0.7, note:'Fisso + incentivi, gestisce tutti i canali' },
        ]},
      ]},
      '4': { cosa:'2 agenti (GDO + specializzato) + sviluppo export', tempo_mesi:4, moduli:[
        { id:'rete', nome:'Rete agenti per canale', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'agente_gdo', nome:'Agente GDO', costo_mensile:1000, costo_setup:0, impatto:0.3, note:'Per insegna/zona' },
          { id:'agente_spec', nome:'Agente specializzato/HORECA', costo_mensile:800, costo_setup:0, impatto:0.25, note:'Gastronomie, ristoranti, negozi gourmet' },
        ]},
        { id:'export', nome:'Sviluppo export', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'manager', nome:'Export manager dedicato', costo_mensile:2500, costo_setup:0, impatto:0.2, note:'Fiere internazionali (SIAL, Anuga), importatori, certificazioni export' },
          { id:'tem', nome:'Temporary export manager', costo_mensile:1000, costo_setup:500, impatto:0.1, note:'Supporto bandi ICE/SIMEST' },
        ]},
      ]},
      '5': { cosa:'Dir. commerciale + rete agenti nazionale + export strutturato', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Direttore commerciale food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale dipendente', costo_mensile:3500, costo_setup:0, impatto:0.5, note:'Coordinamento agenti, rapporti GDO, pricing, export' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1800, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini su carta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con buyer, ordini, promozioni e pagamenti', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Buyer, insegna, ordini, promozioni attive, scadenze pagamento' },
          { id:'crm_free', nome:'CRM gratuito', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline buyer + storico + reminder' },
        ]},
      ]},
      '3': { cosa:'CRM food con buyer GDO, contratti annuali, promozioni', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM food/FMCG', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'b2b', nome:'CRM B2B food (Salesforce/Zoho)', costo_mensile:80, costo_setup:500, impatto:1.0, note:'Pipeline buyer, contratti annuali, piano promo, performance' },
          { id:'generico', nome:'CRM leggero (Pipedrive)', costo_mensile:40, costo_setup:300, impatto:0.6, note:'Pipeline base' },
        ]},
      ]},
      '4': { cosa:'Gestionale integrato — ordini, produzione, magazzino, spedizioni', tempo_mesi:2, moduli:[
        { id:'erp', nome:'ERP conserviero', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'food', nome:'ERP food (CSB-System/Argo Food)', costo_mensile:600, costo_setup:2000, impatto:1.0, note:'Ordini, ricette, produzione batch, lotti, tracciabilita, spedizioni' },
          { id:'generico', nome:'Gestionale + moduli separati', costo_mensile:250, costo_setup:1000, impatto:0.6, note:'Danea/TeamSystem + Excel produzione' },
        ]},
      ]},
      '5': { cosa:'ERP food completo con BI — produzione, qualita, commerciale', tempo_mesi:4, moduli:[
        { id:'erp_full', nome:'ERP food enterprise', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP food enterprise (CSB/SAP Food)', costo_mensile:1200, costo_setup:6000, impatto:1.0, note:'Ordini, ricette, produzione batch, lotti, BRC/IFS, logistica, BI' },
          { id:'mid', nome:'ERP food mid-market', costo_mensile:600, costo_setup:3000, impatto:0.6, note:'Funzionalita core' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — titolare fa tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Organigramma produzione/qualita/vendita definito', tempo_mesi:1, moduli:[
        { id:'organigramma', nome:'Organigramma + mansionario', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Produzione, confezionamento, qualita, vendita, admin — chi fa cosa' },
      ]},
      '3': { cosa:'Resp. produzione + HACCP strutturato', tempo_mesi:2, moduli:[
        { id:'resp_prod', nome:'Responsabile produzione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'promozione', nome:'Promozione interna operaio senior', costo_mensile:200, costo_setup:500, impatto:0.85, note:'Conosce ricette, macchinari, stagionalita materie prime' },
          { id:'esterno', nome:'Resp. produzione esterno', costo_mensile:2500, costo_setup:0, impatto:1.0, note:'Esperienza da altro stabilimento conserviero' },
        ]},
      ]},
      '4': { cosa:'KPI produzione + responsabile qualita/R&D', tempo_mesi:3, moduli:[
        { id:'qualita', nome:'Responsabile qualita', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'interno', nome:'Addetto qualita formato internamente', costo_mensile:200, costo_setup:500, impatto:0.4, note:'HACCP avanzato + BRC/IFS + controllo qualita' },
          { id:'consulente', nome:'Consulente qualita esterno', costo_mensile:400, costo_setup:0, impatto:0.5, note:'Visite periodiche, audit, preparazione BRC/IFS' },
        ]},
        { id:'kpi', nome:'Dashboard KPI stabilimento', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Resa, scarti, tempi, costi per lotto, OEE linee' },
      ]},
      '5': { cosa:'Management completo — direttore stabilimento + titolare strategia', tempo_mesi:4, moduli:[
        { id:'manager', nome:'Direttore stabilimento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Direttore stabilimento dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Produzione + qualita + personale + logistica' },
          { id:'fractional', nome:'Plant manager fractional', costo_mensile:1500, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Processi artigianali — ricette a memoria', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Ricettario standardizzato + HACCP + gestione allergeni', tempo_mesi:1, moduli:[
        { id:'haccp', nome:'Piano HACCP conserviero', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'consulente', nome:'HACCP con consulente specializzato', costo_mensile:150, costo_setup:500, impatto:0.7, note:'CCP specifici conserve (sterilizzazione, pH, Aw), registrazioni' },
          { id:'manuale', nome:'HACCP manuale + registri', costo_mensile:0, costo_setup:300, impatto:0.45, note:'Manuale autocontrollo, registri temperatura/pH' },
        ]},
        { id:'ricettario', nome:'Ricettario e distinte base', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.2, note:'Ricette con dosi, tempi sterilizzazione, parametri critici — riproducibilita' },
      ]},
      '3': { cosa:'Gestionale produzione batch con lotti, tracciabilita e scadenze', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Software gestione produzione conserve', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'MES/gestionale food (CSB lite/FoodManager)', costo_mensile:300, costo_setup:2000, impatto:1.0, note:'Produzione batch, lotti, tracciabilita, sterilizzazione, etichettatura' },
          { id:'generico', nome:'Gestionale + Excel produzione', costo_mensile:100, costo_setup:800, impatto:0.5, note:'Fatturazione + fogli per lotti e tracciabilita' },
        ]},
      ]},
      '4': { cosa:'Certificazione BRC/IFS per accesso GDO nazionale', tempo_mesi:4, moduli:[
        { id:'certificazione', nome:'Certificazione qualita food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'brc_ifs', nome:'BRC/IFS con consulente + ente', costo_mensile:200, costo_setup:5000, impatto:1.0, note:'Prerequisito per listing GDO nazionale e internazionale' },
          { id:'iso22000', nome:'ISO 22000', costo_mensile:150, costo_setup:3500, impatto:0.65, note:'Alternativa per GDO locale e export' },
        ]},
      ]},
      '5': { cosa:'ERP produzione + automazione linee confezionamento + BI', tempo_mesi:4, moduli:[
        { id:'erp', nome:'ERP produzione conserviero', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP + MES food (CSB/SAP PP)', costo_mensile:1000, costo_setup:8000, impatto:1.0, note:'Pianificazione, produzione batch, sterilizzazione, confezionamento, BI' },
          { id:'mid', nome:'Gestionale produzione mid-market', costo_mensile:500, costo_setup:4000, impatto:0.55, note:'Core features' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo fisso — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pricing per canale: GDO, gastronomie, HORECA, e-commerce', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Listini per canale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Prezzo diverso per GDO (volume), gastronomia (premium), HORECA, online' },
      ]},
      '3': { cosa:'Linea premium/artigianale + linea standard GDO', tempo_mesi:2, moduli:[
        { id:'premium', nome:'Linea premium/artigianale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Packaging vetro, ingredienti selezionati, ricetta tradizionale — margine 2-3x' },
        { id:'standard', nome:'Linea standard GDO', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Volume, packaging economico, pricing competitivo' },
      ]},
      '4': { cosa:'Private label GDO + brand posizionato + DOP/IGP', tempo_mesi:3, moduli:[
        { id:'pl', nome:'Strategia private label/brand', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'copacker', nome:'Copacking per insegne GDO', costo_mensile:200, costo_setup:1000, impatto:0.7, note:'Volume garantito, margine base' },
          { id:'brand', nome:'Brand proprio posizionato', costo_mensile:300, costo_setup:1500, impatto:1.0, note:'Listing + promozioni, margine e brand tuoi' },
        ]},
        { id:'dop', nome:'Certificazione DOP/IGP', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:1000, impatto:0.15, note:'Se il prodotto lo consente — premium price e protezione' },
      ]},
      '5': { cosa:'Mix ricavi: brand + PL + export + DTC + co-packing', tempo_mesi:4, moduli:[
        { id:'mix', nome:'Diversificazione ricavi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'Mix completo 5 canali', costo_mensile:500, costo_setup:2500, impatto:1.0, note:'Brand GDO + PL + export + e-commerce DTC + co-packing' },
          { id:'focus', nome:'Focus su 2-3 canali', costo_mensile:200, costo_setup:1000, impatto:0.55, note:'Brand GDO + 1-2 canali secondari' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo etichetta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Social con foto prodotti/ricette + packaging come strumento vendita', tempo_mesi:1, moduli:[
        { id:'social', nome:'Social media food', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.5, note:'Instagram/Facebook: foto prodotti, ricette, dietro le quinte produzione' },
        { id:'packaging', nome:'Restyling packaging/etichette', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Design professionale, storytelling su confezione' },
      ]},
      '3': { cosa:'Fiere food (Cibus, TuttoFood, MARCA) + degustazioni', tempo_mesi:2, moduli:[
        { id:'fiere', nome:'Partecipazione fiere food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'stand', nome:'Stand espositivo (Cibus/TuttoFood)', costo_mensile:300, costo_setup:5000, impatto:1.0, note:'Stand con degustazione, contatto buyer GDO e importatori' },
          { id:'visitatore', nome:'Visita come operatore', costo_mensile:100, costo_setup:500, impatto:0.4, note:'Networking, niente stand' },
        ]},
      ]},
      '4': { cosa:'Trade marketing GDO + PR food blogger + social professionale', tempo_mesi:2, moduli:[
        { id:'trade', nome:'Trade marketing', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia trade marketing food', costo_mensile:1200, costo_setup:2000, impatto:1.0, note:'Promozioni in-store, volantini, degustazioni, materiale POP' },
          { id:'interno', nome:'Trade marketing interno', costo_mensile:500, costo_setup:1000, impatto:0.5, note:'Gestione diretta promo con buyer' },
        ]},
      ]},
      '5': { cosa:'Piano marketing food completo — brand, trade, digital, export', tempo_mesi:4, moduli:[
        { id:'piano', nome:'Piano marketing food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing food/FMCG', costo_mensile:2500, costo_setup:5000, impatto:1.0, note:'Brand building, trade, digital, fiere internazionali, export' },
          { id:'interno', nome:'Marketing manager interno', costo_mensile:1200, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito vetrina con storia, prodotti, certificazioni, territorio', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito vetrina food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom WordPress', costo_mensile:30, costo_setup:2000, impatto:1.0, note:'Storytelling territorio, gallery prodotti, certificazioni, ricette' },
          { id:'template', nome:'Sito da template', costo_mensile:20, costo_setup:600, impatto:0.5, note:'Template food' },
        ]},
      ]},
      '3': { cosa:'Catalogo prodotti con schede tecniche + area buyer', tempo_mesi:2, moduli:[
        { id:'catalogo', nome:'Catalogo B2B online', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1500, impatto:0.5, note:'Schede prodotto con ingredienti, allergeni, shelf life, packaging, MOQ' },
        { id:'ricette', nome:'Sezione ricette con i prodotti', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Ricette HORECA e consumatori — i prodotti come ingredienti' },
      ]},
      '4': { cosa:'E-commerce DTC + area riservata buyer B2B', tempo_mesi:3, moduli:[
        { id:'ecommerce', nome:'E-commerce food DTC', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'shopify', nome:'Shopify + tema food', costo_mensile:100, costo_setup:3000, impatto:1.0, note:'Vendita diretta, box regalo, abbonamento, storytelling territorio' },
          { id:'woocommerce', nome:'WooCommerce', costo_mensile:50, costo_setup:2000, impatto:0.6, note:'Piu personalizzabile' },
        ]},
      ]},
      '5': { cosa:'Piattaforma B2B/DTC integrata con ERP e tracciabilita', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma food omnicanale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Piattaforma integrata ERP', costo_mensile:800, costo_setup:10000, impatto:1.0, note:'DTC + B2B + ERP, ordini, tracciabilita lotto, fatturazione' },
          { id:'mid', nome:'Shopify + area B2B', costo_mensile:300, costo_setup:4000, impatto:0.5, note:'DTC + B2B base' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento materie prime',
      '1': { chi:'Titolare', cosa:'Acquisto da produttori locali — pomodoro, ortaggi, olio', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto fornitori — qualita, prezzi, stagionalita, certificazioni', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database fornitori materie prime', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda: produttore, qualita, certificazioni (bio/DOP), prezzi, campagna' },
      ]},
      '3': { cosa:'Contratti quadro con agricoltori — prezzi campagna, volumi', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro agricoltori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Contratti pre-campagna: prezzo, volume, qualita, consegna' },
        { id:'filiera', nome:'Filiera corta/km0 per linea premium', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Pomodoro locale, olio EVO zona — storytelling + qualita' },
      ]},
      '4': { cosa:'Buyer dedicato — diversificazione fornitori, scorte strategiche', tempo_mesi:3, moduli:[
        { id:'buyer', nome:'Buyer materie prime food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer food dipendente', costo_mensile:2200, costo_setup:0, impatto:1.0, note:'Negoziazione, sourcing, controllo qualita, gestione campagna' },
          { id:'parttime', nome:'Buyer part-time', costo_mensile:1000, costo_setup:0, impatto:0.6, note:'Gestisce riordini e rapporto fornitori' },
        ]},
      ]},
      '5': { cosa:'Supply chain manager — contratti annuali, hedging, filiera certificata', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Resp. supply chain food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Supply chain manager dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Strategia acquisti, hedging prezzi materie prime, filiera certificata' },
          { id:'fractional', nome:'Supply chain manager fractional', costo_mensile:1800, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE INGREDIENTI
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_ingredienti: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare gestisce clienti — industria food e artigiani', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Visite proattive a laboratori food, pasticcerie, industria', tempo_mesi:2, moduli:[
        { id:'campionature', nome:'Kit campionature ingredienti', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.6, note:'Campioni ingredienti + schede tecniche + applicazioni suggerite' },
        { id:'assistenza', nome:'Assistenza tecnica applicativa', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Supporto R&D clienti: formulazione, dosaggi, test' },
      ]},
      '3': { cosa:'Agente B2B per industria alimentare e laboratori artigianali', tempo_mesi:3, moduli:[
        { id:'agente', nome:'Agente ingredienti food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agente', nome:'Agente ENASARCO B2B food', costo_mensile:1000, costo_setup:500, impatto:1.0, note:'Provvigione su venduto, porta portafoglio industrie food zona' },
          { id:'dip', nome:'Tecnico-commerciale dipendente', costo_mensile:2500, costo_setup:0, impatto:0.8, note:'Competenza tecnica + vendita, visita laboratori e R&D clienti' },
        ]},
      ]},
      '4': { cosa:'Rete agenti per zona + sviluppo grandi clienti industriali', tempo_mesi:4, moduli:[
        { id:'rete', nome:'Rete agenti/tecnici-commerciali', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'agente', nome:'Agente B2B food', costo_mensile:1000, costo_setup:0, impatto:0.3, note:'Per zona/settore' },
          { id:'tecnico', nome:'Tecnico-commerciale', costo_mensile:2500, costo_setup:0, impatto:0.25, note:'Per clienti che richiedono supporto R&D' },
        ]},
      ]},
      '5': { cosa:'Dir. commerciale + rete nazionale + export + key account industriali', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Direttore commerciale ingredienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale dipendente', costo_mensile:3500, costo_setup:0, impatto:0.5, note:'Coordinamento agenti, grandi clienti, pricing, export' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1800, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini a telefono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con clienti industria, ordini ricorrenti, volumi', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Cliente, settore, volumi, frequenza, ingredienti principali' },
          { id:'crm_free', nome:'CRM gratuito', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline + storico + reminder' },
        ]},
      ]},
      '3': { cosa:'CRM B2B con contratti annuali e gestione campionature', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM B2B ingredienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'b2b', nome:'CRM B2B (Salesforce/Zoho)', costo_mensile:80, costo_setup:500, impatto:1.0, note:'Pipeline, contratti annuali, campionature, schede tecniche' },
          { id:'generico', nome:'CRM leggero (Pipedrive)', costo_mensile:40, costo_setup:300, impatto:0.6, note:'Pipeline base' },
        ]},
      ]},
      '4': { cosa:'CRM integrato con gestionale — stock, lotti, ordini automatici', tempo_mesi:2, moduli:[
        { id:'erp', nome:'ERP ingredienti food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'food', nome:'ERP food (CSB/Argo Food)', costo_mensile:600, costo_setup:2000, impatto:1.0, note:'Ordini, stock ingredienti, lotti, tracciabilita, scadenze, logistica' },
          { id:'generico', nome:'Gestionale + moduli', costo_mensile:250, costo_setup:1000, impatto:0.6, note:'Danea/TeamSystem + Excel stock' },
        ]},
      ]},
      '5': { cosa:'ERP completo — ordini, stock, R&D, tracciabilita, export docs, BI', tempo_mesi:4, moduli:[
        { id:'erp_full', nome:'ERP ingredienti enterprise', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP food enterprise (SAP/CSB)', costo_mensile:1200, costo_setup:6000, impatto:1.0, note:'Ordini, stock, formulazioni R&D, tracciabilita, qualita, export, BI' },
          { id:'mid', nome:'ERP mid-market food', costo_mensile:600, costo_setup:3000, impatto:0.6, note:'Funzionalita core' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Organigramma commerciale/logistica/qualita', tempo_mesi:1, moduli:[
        { id:'organigramma', nome:'Organigramma + mansionario', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Commerciale, logistica/magazzino, qualita/R&D, admin' },
      ]},
      '3': { cosa:'Tecnico applicativo + resp. magazzino/logistica', tempo_mesi:2, moduli:[
        { id:'tecnico', nome:'Tecnico applicativo/R&D', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Tecnico applicativo dipendente', costo_mensile:2200, costo_setup:0, impatto:0.7, note:'Supporto formulazione clienti, test, campionature, schede tecniche' },
          { id:'consulente', nome:'Consulente tecnologo alimentare', costo_mensile:800, costo_setup:0, impatto:0.5, note:'Su richiesta, per progetti R&D complessi' },
        ]},
      ]},
      '4': { cosa:'KPI + resp. qualita/regolatorio dedicato', tempo_mesi:3, moduli:[
        { id:'qualita', nome:'Resp. qualita/regolatorio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'interno', nome:'Resp. qualita interno', costo_mensile:200, costo_setup:500, impatto:0.4, note:'HACCP, BRC/IFS, schede sicurezza, etichettatura, regolamenti EU' },
          { id:'consulente', nome:'Consulente qualita esterno', costo_mensile:400, costo_setup:0, impatto:0.5, note:'Audit, certificazioni, aggiornamento normativo' },
        ]},
        { id:'kpi', nome:'KPI aziendali', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Margine per prodotto, rotazione stock, fill rate ordini' },
      ]},
      '5': { cosa:'Management completo — il titolare fa solo strategia', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Direttore operativo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. operativo dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Commerciale + logistica + qualita + personale' },
          { id:'fractional', nome:'COO fractional', costo_mensile:1800, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo formalizzato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Schede tecniche ingredienti + HACCP + gestione allergeni', tempo_mesi:1, moduli:[
        { id:'schede', nome:'Schede tecniche e sicurezza', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Scheda per ingrediente: composizione, allergeni, shelf life, dosaggi, applicazioni' },
        { id:'haccp', nome:'Piano HACCP strutturato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.25, note:'CCP, allergeni, tracciabilita lotti' },
      ]},
      '3': { cosa:'Gestionale con lotti, tracciabilita e scadenze ingredienti', tempo_mesi:2, moduli:[
        { id:'gestionale', nome:'Software gestione ingredienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Gestionale food/ingredienti (CSB lite)', costo_mensile:300, costo_setup:2000, impatto:1.0, note:'Lotti, tracciabilita, scadenze, formulazioni, ordini automatici' },
          { id:'generico', nome:'Gestionale + Excel', costo_mensile:100, costo_setup:800, impatto:0.5, note:'Fatturazione + fogli per lotti e stock' },
        ]},
      ]},
      '4': { cosa:'Certificazioni BRC/IFS + FSSC 22000 per grandi clienti', tempo_mesi:4, moduli:[
        { id:'certificazione', nome:'Certificazione qualita', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'fssc', nome:'FSSC 22000 (standard ingredienti)', costo_mensile:200, costo_setup:5000, impatto:1.0, note:'Standard specifico per ingredienti, richiesto da multinazionali food' },
          { id:'brc_ifs', nome:'BRC/IFS', costo_mensile:200, costo_setup:4500, impatto:0.8, note:'Alternativa accettata da GDO e industria food' },
        ]},
      ]},
      '5': { cosa:'ERP con R&D management + tracciabilita completa + BI', tempo_mesi:4, moduli:[
        { id:'erp', nome:'ERP ingredienti + R&D', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP con modulo R&D (SAP/CSB)', costo_mensile:1000, costo_setup:8000, impatto:1.0, note:'Formulazioni, test, tracciabilita vigna-piatto, qualita, BI' },
          { id:'mid', nome:'Gestionale + software R&D separato', costo_mensile:500, costo_setup:4000, impatto:0.55, note:'ERP base + tool R&D/formulazione' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo fisso — margine da ricarico', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pricing per volume e tipo cliente (industria vs artigiano)', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Listini per segmento cliente', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Industria (volume), artigiano (servizio), laboratorio (piccoli lotti)' },
      ]},
      '3': { cosa:'Servizi a valore: assistenza tecnica, formulazione, campionature', tempo_mesi:2, moduli:[
        { id:'servizi', nome:'Servizi tecnici a valore', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Assistenza formulazione, test applicativi, campionature personalizzate' },
        { id:'custom', nome:'Ingredienti custom/blend personalizzati', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Blend su specifica del cliente — margine superiore 30-50%' },
      ]},
      '4': { cosa:'Contratti annuali industria + sviluppo linee specializzate', tempo_mesi:3, moduli:[
        { id:'contratti', nome:'Contratti fornitura annuali', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Contratti con industrie: volumi garantiti, prezzo bloccato, fornitura programmata' },
        { id:'specializzati', nome:'Linee ingredienti specializzati', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:800, impatto:0.2, note:'Bio, clean label, senza glutine, funzionali — margine premium' },
      ]},
      '5': { cosa:'Mix ricavi: distribuzione + custom blending + consulenza R&D + export', tempo_mesi:4, moduli:[
        { id:'mix', nome:'Diversificazione ricavi', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'Distribuzione + blending + R&D + export', costo_mensile:500, costo_setup:2000, impatto:1.0, note:'Mix completo per margine e stabilita' },
          { id:'focus', nome:'Focus distribuzione + 1 servizio', costo_mensile:200, costo_setup:800, impatto:0.55, note:'Distribuzione + custom blending o assistenza tecnica' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo relazione diretta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Catalogo digitale ingredienti + LinkedIn per B2B', tempo_mesi:1, moduli:[
        { id:'catalogo', nome:'Catalogo ingredienti digitale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.5, note:'PDF sfogliabile con schede ingredienti, applicazioni, certificazioni' },
        { id:'linkedin', nome:'Profilo LinkedIn aziendale attivo', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Post su applicazioni, novita normative, trend ingredienti' },
      ]},
      '3': { cosa:'Fiere ingredienti (FI Europe, Cibus Tec) + webinar tecnici', tempo_mesi:2, moduli:[
        { id:'fiere', nome:'Fiere ingredienti food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'stand', nome:'Stand FI Europe/Cibus Tec', costo_mensile:300, costo_setup:5000, impatto:1.0, note:'Stand con campionature, 1-2 fiere/anno, contatto R&D e buyer industria' },
          { id:'visitatore', nome:'Visita come operatore + networking', costo_mensile:100, costo_setup:500, impatto:0.4, note:'Biglietti, eventi B2B' },
        ]},
      ]},
      '4': { cosa:'Content marketing tecnico + LinkedIn Ads su R&D manager', tempo_mesi:2, moduli:[
        { id:'content', nome:'Content marketing B2B food', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia content B2B specializzata', costo_mensile:800, costo_setup:500, impatto:1.0, note:'White paper, case study, webinar tecnici, LinkedIn Ads' },
          { id:'interno', nome:'Content interno + ads base', costo_mensile:300, costo_setup:200, impatto:0.5, note:'Post tecnici + budget ads LinkedIn' },
        ]},
      ]},
      '5': { cosa:'Piano marketing B2B ingredienti — fiere, content, partnership, export', tempo_mesi:4, moduli:[
        { id:'piano', nome:'Piano marketing B2B ingredienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing B2B food/ingredienti', costo_mensile:2000, costo_setup:4000, impatto:1.0, note:'Fiere internazionali, content, LinkedIn, webinar, PR trade' },
          { id:'interno', nome:'Marketing manager B2B interno', costo_mensile:1000, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito con catalogo ingredienti, certificazioni, contatti', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito B2B ingredienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom WordPress B2B', costo_mensile:30, costo_setup:2000, impatto:1.0, note:'Catalogo ingredienti, schede tecniche, certificazioni, form contatto' },
          { id:'template', nome:'Sito da template B2B', costo_mensile:20, costo_setup:600, impatto:0.5, note:'Template industriale' },
        ]},
      ]},
      '3': { cosa:'Catalogo online con schede tecniche scaricabili + area riservata', tempo_mesi:2, moduli:[
        { id:'catalogo_online', nome:'Catalogo B2B con download', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1500, impatto:0.5, note:'Schede tecniche, SDS, certificazioni scaricabili, filtri per applicazione' },
        { id:'area_riservata', nome:'Area riservata clienti', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:800, impatto:0.3, note:'Login con listini dedicati, storico ordini, documentazione' },
      ]},
      '4': { cosa:'Portale B2B con ordini online e stock real-time', tempo_mesi:3, moduli:[
        { id:'portale', nome:'Portale ordini B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'integrato', nome:'Portale B2B integrato con ERP', costo_mensile:400, costo_setup:5000, impatto:1.0, note:'Ordini online, stock live, listini per cliente, schede tecniche' },
          { id:'standalone', nome:'E-commerce B2B standalone', costo_mensile:200, costo_setup:2000, impatto:0.55, note:'Ordini online, stock periodico' },
        ]},
      ]},
      '5': { cosa:'Piattaforma B2B completa — ordini, R&D collaboration, tracciabilita', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma B2B ingredienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Portale enterprise con R&D hub', costo_mensile:800, costo_setup:10000, impatto:1.0, note:'Ordini, R&D collaboration, formulazioni condivise, tracciabilita, BI' },
          { id:'mid', nome:'Portale B2B avanzato', costo_mensile:300, costo_setup:4000, impatto:0.5, note:'Ordini + area documentale, senza R&D hub' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento e sourcing',
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 produttori/importatori', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto fornitori — qualita, certificazioni, prezzi, MOQ', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database fornitori ingredienti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda: produttore, origine, certificazioni (bio, kosher, halal), prezzi, MOQ' },
      ]},
      '3': { cosa:'Accordi con produttori/importatori — prezzi e volumi', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro fornitori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Contratti annuali con 3-5 fornitori chiave' },
      ]},
      '4': { cosa:'Buyer dedicato — diversificazione, import diretto, qualita', tempo_mesi:3, moduli:[
        { id:'buyer', nome:'Buyer ingredienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer ingredienti dipendente', costo_mensile:2200, costo_setup:0, impatto:1.0, note:'Sourcing, negoziazione, controllo qualita, import diretto' },
          { id:'parttime', nome:'Buyer part-time', costo_mensile:1000, costo_setup:0, impatto:0.6, note:'Gestisce riordini e rapporto fornitori' },
        ]},
      ]},
      '5': { cosa:'Supply chain manager — contratti globali, hedging, certificazioni', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Resp. supply chain ingredienti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Supply chain manager dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Sourcing globale, hedging prezzi, certificazioni origine, logistica' },
          { id:'fractional', nome:'Supply chain manager fractional', costo_mensile:1800, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE BIRRA
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_birra: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare vende dal taproom e a pochi locali amici', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Visite a pub, birrerie, ristoranti e wine bar della zona', tempo_mesi:2, moduli:[
        { id:'campionature', nome:'Kit degustazione per locali', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.6, note:'Fusti campione, schede birra, listino HORECA — visite a pub e ristoranti' },
        { id:'taproom', nome:'Taproom/punto vendita diretto strutturato', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Orari fissi, degustazioni programmate, vendita asporto' },
      ]},
      '3': { cosa:'Agente/distributore birra artigianale per HORECA regionale', tempo_mesi:3, moduli:[
        { id:'distribuzione', nome:'Canale distribuzione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'distributore', nome:'Accordo con distributore birra artigianale', costo_mensile:0, costo_setup:500, impatto:1.0, note:'Il distributore gestisce logistica e vendita a locali — margine inferiore ma volume' },
          { id:'agente', nome:'Agente HORECA dedicato', costo_mensile:800, costo_setup:500, impatto:0.8, note:'Provvigione su venduto, gestisce rapporti con pub e ristoranti' },
          { id:'diretto', nome:'Vendita diretta con consegna propria', costo_mensile:500, costo_setup:0, impatto:0.6, note:'Il birraio consegna personalmente — margine pieno, volume limitato' },
        ]},
      ]},
      '4': { cosa:'Rete distribuzione regionale + sviluppo GDO specializzata + e-commerce', tempo_mesi:4, moduli:[
        { id:'rete', nome:'Espansione distribuzione', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'distributore', nome:'Distributore birra per zona', costo_mensile:0, costo_setup:500, impatto:0.3, note:'Copertura regionale/interregionale' },
          { id:'agente', nome:'Agente HORECA', costo_mensile:800, costo_setup:0, impatto:0.25, note:'Per zone/canali specifici' },
        ]},
        { id:'gdo', nome:'Sviluppo GDO specializzata/bio shop', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Eataly, NaturaSi, Carrefour Bio, catene gourmet — listing bottiglie' },
      ]},
      '5': { cosa:'Dir. commerciale + distribuzione nazionale + export + beer firm', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Responsabile commerciale birra', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:3000, costo_setup:0, impatto:0.5, note:'Coordinamento distributori, rapporti GDO, export, eventi' },
          { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1500, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — vendite a memoria', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Excel con locali clienti, ordini, fusti/bottiglie, pagamenti', tempo_mesi:1, moduli:[
        { id:'strumento', nome:'Strumento tracciamento', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'excel', nome:'Excel strutturato', costo_mensile:0, costo_setup:100, impatto:0.7, note:'Locale, tipo (pub/ristorante/enoteca), ordini, fusti vs bottiglie, pagamenti' },
          { id:'crm_free', nome:'CRM gratuito', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline + storico + reminder riordino' },
        ]},
      ]},
      '3': { cosa:'Gestionale birrificio con ordini, produzione e stock fusti/bottiglie', tempo_mesi:1, moduli:[
        { id:'gestionale', nome:'Gestionale birrificio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Gestionale birrificio (Breww/Ekos/BeerRun)', costo_mensile:100, costo_setup:500, impatto:1.0, note:'Ordini, produzione batch, stock fusti/bottiglie, accise, spedizioni' },
          { id:'generico', nome:'Gestionale generico + Excel produzione', costo_mensile:40, costo_setup:300, impatto:0.55, note:'Danea/FiC + foglio per batch e stock' },
        ]},
      ]},
      '4': { cosa:'Gestionale integrato — produzione, vendite, accise, distribuzione', tempo_mesi:2, moduli:[
        { id:'erp', nome:'ERP birrificio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'brewery', nome:'ERP birrificio (Breww Pro/Orchestrated Beer)', costo_mensile:400, costo_setup:2000, impatto:1.0, note:'Ricette, batch, fermentazione, packaging, accise, ordini, distribuzione' },
          { id:'food', nome:'ERP food generico + modulo birra', costo_mensile:250, costo_setup:1000, impatto:0.6, note:'Meno specifico per birra, piu flessibile' },
        ]},
      ]},
      '5': { cosa:'ERP birrificio completo — produzione, qualita, distribuzione, e-commerce, BI', tempo_mesi:4, moduli:[
        { id:'erp_full', nome:'ERP birrificio enterprise', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Breww Enterprise / custom', costo_mensile:800, costo_setup:5000, impatto:1.0, note:'Produzione, qualita, accise, distribuzione, e-commerce, taproom POS, BI' },
          { id:'mid', nome:'Gestionale birrificio avanzato', costo_mensile:400, costo_setup:2500, impatto:0.6, note:'Core features' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Titolare birraio + tutto il resto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Separazione ruoli: produzione, taproom/vendita, consegne', tempo_mesi:1, moduli:[
        { id:'organigramma', nome:'Organigramma birrificio', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Produzione (cotta, fermentazione, imbottigliamento), taproom, consegne, admin' },
      ]},
      '3': { cosa:'Assistente birraio + addetto taproom/vendita', tempo_mesi:2, moduli:[
        { id:'birraio', nome:'Assistente birraio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Assistente birraio dipendente', costo_mensile:1800, costo_setup:0, impatto:0.7, note:'Supporto produzione, imbottigliamento, pulizia, fusti' },
          { id:'stagionale', nome:'Assistente stagionale', costo_mensile:1200, costo_setup:0, impatto:0.45, note:'Rinforzo nei periodi di punta (estate, feste)' },
        ]},
        { id:'taproom', nome:'Addetto taproom/vendita', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'dip', nome:'Addetto taproom dipendente', costo_mensile:1500, costo_setup:0, impatto:0.2, note:'Taproom, degustazioni, vendita asporto, eventi' },
          { id:'parttime', nome:'Addetto part-time weekend', costo_mensile:700, costo_setup:0, impatto:0.12, note:'Venerdi-sabato-domenica' },
        ]},
      ]},
      '4': { cosa:'Birraio capo + KPI produzione + resp. qualita', tempo_mesi:3, moduli:[
        { id:'head_brewer', nome:'Head brewer/birraio capo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Head brewer dipendente', costo_mensile:2800, costo_setup:0, impatto:1.0, note:'Gestione ricette, produzione, qualita, il titolare fa business' },
          { id:'promozione', nome:'Promozione assistente birraio', costo_mensile:300, costo_setup:500, impatto:0.7, note:'Formazione avanzata + delega produzione' },
        ]},
        { id:'kpi', nome:'KPI birrificio', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Resa batch, costi produzione, qualita, sell-through per stile' },
      ]},
      '5': { cosa:'Management completo — titolare solo ricette e brand', tempo_mesi:5, moduli:[
        { id:'manager', nome:'Direttore operativo birrificio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. operativo dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Produzione, vendite, taproom, logistica — il titolare fa ricette e brand' },
          { id:'fractional', nome:'Operations manager fractional', costo_mensile:1500, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Produzione artigianale — tutto a esperienza', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Ricettario strutturato + registro accise + HACCP base', tempo_mesi:1, moduli:[
        { id:'ricettario', nome:'Ricettario e log produzione', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.6, note:'Ricette con dosi, tempi, temperature, densita, note — riproducibilita' },
        { id:'accise', nome:'Registro accise digitale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.25, note:'Registro carico/scarico, telematico accise, e-DAS' },
      ]},
      '3': { cosa:'Software gestione birrificio — batch, fermentazione, packaging', tempo_mesi:2, moduli:[
        { id:'software', nome:'Software birrificio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'specifico', nome:'Brewery management (Breww/Ekos/BeerSmith Pro)', costo_mensile:100, costo_setup:800, impatto:1.0, note:'Ricette, batch, fermentazione tracking, carbonazione, packaging, accise' },
          { id:'manuale', nome:'Foglio produzione + registro manuale', costo_mensile:0, costo_setup:300, impatto:0.4, note:'Excel/Google Sheet per batch e fermentazioni' },
        ]},
      ]},
      '4': { cosa:'Controllo qualita strutturato + certificazioni (BIO, artigianale)', tempo_mesi:3, moduli:[
        { id:'qualita', nome:'Sistema qualita birrificio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'laboratorio', nome:'Laboratorio analisi interno/convenzionato', costo_mensile:200, costo_setup:1500, impatto:1.0, note:'Analisi microbiologiche, densita, pH, IBU — ogni batch controllato' },
          { id:'base', nome:'Controllo qualita base (sensoriale + densimetro)', costo_mensile:0, costo_setup:500, impatto:0.5, note:'Degustazione panel, densimetro, pH-metro — no laboratorio' },
        ]},
        { id:'certificazioni', nome:'Certificazioni prodotto', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:1000, impatto:0.15, note:'Bio, marchio "artigianale" (L. 154/2016), certificazione indipendente' },
      ]},
      '5': { cosa:'ERP birrificio + automazione + BI per efficienza produttiva', tempo_mesi:4, moduli:[
        { id:'erp', nome:'ERP birrificio completo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP brewery enterprise', costo_mensile:600, costo_setup:4000, impatto:1.0, note:'Produzione, qualita, accise, distribuzione, taproom POS, BI' },
          { id:'mid', nome:'Gestionale birrificio avanzato', costo_mensile:300, costo_setup:2000, impatto:0.55, note:'Core features' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo unico — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pricing per canale: taproom, HORECA, bottiglia, distribuzione', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Listini per canale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Taproom (margine max), HORECA (fusti), bottiglia dettaglio, distributore' },
      ]},
      '3': { cosa:'Taproom experience + eventi degustazione + birre stagionali', tempo_mesi:2, moduli:[
        { id:'taproom', nome:'Taproom experience strutturata', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Degustazioni guidate, abbinamenti cibo, tour birrificio — margine pieno' },
        { id:'stagionali', nome:'Birre stagionali/limited edition', tipo:'flag', obbligatorio:false, costo_mensile:100, costo_setup:200, impatto:0.2, note:'Edizioni limitate per creare hype e giustificare premium price' },
      ]},
      '4': { cosa:'Beer club/abbonamento + private label per locali + merchandising', tempo_mesi:2, moduli:[
        { id:'beerclub', nome:'Beer club/abbonamento mensile', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Box mensile con birre + gadget, ricavo ricorrente, fidelizzazione' },
        { id:'pl', nome:'Birre private label per locali', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.2, note:'Birra con etichetta del locale/ristorante — volume garantito' },
      ]},
      '5': { cosa:'Mix ricavi: HORECA + taproom + e-commerce + beer firm + eventi', tempo_mesi:3, moduli:[
        { id:'mix', nome:'Diversificazione ricavi birrificio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'Mix completo 5 canali', costo_mensile:300, costo_setup:1500, impatto:1.0, note:'HORECA + taproom + e-commerce + beer club + eventi/festival' },
          { id:'focus', nome:'Focus HORECA + taproom', costo_mensile:100, costo_setup:500, impatto:0.55, note:'2 canali principali ben gestiti' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola beer geek', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Instagram con foto birre/taproom + Untappd per recensioni', tempo_mesi:1, moduli:[
        { id:'social', nome:'Social media birrificio', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Instagram: foto birre, behind the scenes, brewing day, taproom' },
        { id:'untappd', nome:'Profilo Untappd verificato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Birre su Untappd con descrizione, ABV, IBU — recensioni community' },
      ]},
      '3': { cosa:'Festival birra artigianale + collaborazioni con altri birrifici', tempo_mesi:2, moduli:[
        { id:'festival', nome:'Partecipazione festival birra', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:1500, impatto:0.5, note:'Italia Beer Festival, Eurhop, BeerAttraction — stand con spillatura' },
        { id:'collab', nome:'Collaborazioni brewing con altri birrifici', tipo:'flag', obbligatorio:false, costo_mensile:100, costo_setup:0, impatto:0.25, note:'Collab brew con birrifici noti — visibilita e cross-marketing' },
      ]},
      '4': { cosa:'Social professionale + PR beer blogger + eventi taproom', tempo_mesi:2, moduli:[
        { id:'pr', nome:'PR e comunicazione birra', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia PR craft beer', costo_mensile:800, costo_setup:500, impatto:1.0, note:'PR su riviste beer (Fermento, Birra&Sound), blogger, influencer birra' },
          { id:'interno', nome:'Marketing interno + tool', costo_mensile:300, costo_setup:200, impatto:0.5, note:'Social autogestiti + invio birre a blogger' },
        ]},
      ]},
      '5': { cosa:'Piano marketing birrificio — brand, festival, digital, taproom events', tempo_mesi:4, moduli:[
        { id:'piano', nome:'Piano marketing craft beer', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing food/beverage', costo_mensile:1500, costo_setup:3000, impatto:1.0, note:'Brand positioning, festival, digital, taproom events, PR' },
          { id:'interno', nome:'Marketing coordinator interno', costo_mensile:800, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito — solo social', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito birrificio con storia, birre, taproom e dove trovarci', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito birrificio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom (design craft)', costo_mensile:20, costo_setup:1500, impatto:1.0, note:'Storytelling, gallery birre, taproom, mappa locali dove trovarci' },
          { id:'template', nome:'Sito da template', costo_mensile:10, costo_setup:400, impatto:0.45, note:'Template birrificio/food' },
        ]},
      ]},
      '3': { cosa:'Catalogo birre online + mappa locali + prenotazione taproom', tempo_mesi:2, moduli:[
        { id:'catalogo', nome:'Catalogo birre online', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:800, impatto:0.5, note:'Scheda per birra: stile, ABV, IBU, malti, luppoli, abbinamenti, foto' },
        { id:'taproom_booking', nome:'Prenotazione degustazione/taproom', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.3, note:'Calendly/form per prenotare visita e degustazione guidata' },
      ]},
      '4': { cosa:'E-commerce DTC — bottiglie, box, abbonamento, merchandising', tempo_mesi:3, moduli:[
        { id:'ecommerce', nome:'E-commerce birrificio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'shopify', nome:'Shopify + tema brewery', costo_mensile:80, costo_setup:2000, impatto:1.0, note:'Bottiglie, box degustazione, abbonamento beer club, merchandising' },
          { id:'woocommerce', nome:'WooCommerce', costo_mensile:40, costo_setup:1200, impatto:0.6, note:'Piu personalizzabile' },
        ]},
      ]},
      '5': { cosa:'Piattaforma integrata — DTC + B2B + taproom POS + beer club', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma birrificio omnicanale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Piattaforma brewery (Breww + Shopify)', costo_mensile:400, costo_setup:5000, impatto:1.0, note:'E-commerce DTC + portale B2B + taproom POS + beer club + CRM' },
          { id:'mid', nome:'E-commerce + gestionale base', costo_mensile:150, costo_setup:2000, impatto:0.5, note:'DTC + ordini B2B semplici' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento malti e luppoli',
      '1': { chi:'Titolare', cosa:'Acquisto malti e luppoli da 1-2 fornitori', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto fornitori malti/luppoli — qualita, varieta, prezzi', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database fornitori brewing', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda: malteria/hop farm, varieta, lotti, prezzi, tempi consegna' },
      ]},
      '3': { cosa:'Accordi con malterie e hop farm — prezzi campagna, varieta dedicate', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi fornitori brewing', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Contratti con 2-3 malterie/importatori: Weyermann, Malteries Franco-Belges, hop farm' },
        { id:'locali', nome:'Luppoli e malti italiani/locali', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Malterie italiane, luppolo italiano — storytelling + km0' },
      ]},
      '4': { cosa:'Import diretto luppoli (USA/NZ/AU) + malti speciali', tempo_mesi:3, moduli:[
        { id:'import', nome:'Import diretto ingredienti brewing', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'diretto', nome:'Import diretto da hop farm (Yakima/NZ)', costo_mensile:200, costo_setup:1000, impatto:1.0, note:'Luppoli freschi diretti, varieta esclusive, contratti annuali' },
          { id:'importatore', nome:'Tramite importatore specializzato', costo_mensile:0, costo_setup:300, impatto:0.6, note:'Piu semplice, meno scelta, prezzi piu alti' },
        ]},
      ]},
      '5': { cosa:'Resp. acquisti — contratti annuali, hedging, luppoli esclusivi, packaging', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Resp. supply chain birrificio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Resp. acquisti/produzione dipendente', costo_mensile:2800, costo_setup:0, impatto:1.0, note:'Malti, luppoli, lieviti, packaging, CO2, gestione scorte' },
          { id:'fractional', nome:'Consulente acquisti brewing', costo_mensile:1000, costo_setup:0, impatto:0.6, note:'Supporto negoziazione e sourcing' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECH SAAS
  // ═══════════════════════════════════════════════════════════════════════════
  tech_saas: {
    vendite: {
      '1': { chi:'Founder', cosa:'Founder vende', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Inbound + content come lead gen',
        tempo_mesi: 2,
        moduli: [
          { id:'supporto', nome:'Founder', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'outreach',
        nome: 'Outreach strutturato (email + LinkedIn)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Sequenze email fredde + LinkedIn verso ICP definito'
}
      ]
      },
      '3': {
        cosa: '1 account/SDR dedicato (~3.200€ account, ~2.500€ SDR)',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:3200, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1760, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1440, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: '2 account + 1 SDR',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:3200, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1760, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1600, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1200, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'VP Sales + team + partnerships',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:5600, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:3080, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:2800, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:2100, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Founder', cosa:'Nessun CRM — lead su email e spreadsheet', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'CRM base (HubSpot free/Pipedrive) con pipeline vendita',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Founder', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'product_analytics',
        nome: 'Product analytics per lead scoring',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Chi usa il free tier e come — identifica chi è pronto a pagare'
}
      ]
      },
      '3': {
        cosa: 'CRM con lead scoring, sequences e analytics pipeline',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM con lead scoring, sequences e analytics pipeline', costo_mensile:300, costo_setup:500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:150, costo_setup:300, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM integrato con product analytics — PQL e usage data',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM integrato con product analytics', costo_mensile:600, costo_setup:1500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:300, costo_setup:900, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Revenue ops stack — CRM, BI, forecasting, churn prediction',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Revenue ops stack', costo_mensile:1200, costo_setup:4000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:600, costo_setup:2400, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Tutto il founder', cosa:'Tutto il founder', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli dev/vendite separati — founder esce dal codice',
        tempo_mesi: 1,
        moduli: [
      {
            id: 'ruoli',
            nome: 'Separazione dev/vendite/support',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 200,
            impatto: 0.7,
            note: 'Chi sviluppa, chi vende, chi fa support — il founder delega'
      }
,
{
        id: 'standup',
        nome: 'Daily standup dev + weekly all-hands',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Allineamento quotidiano dev, settimanale tutto il team'
}
      ]
      },
      '3': {
        cosa: 'CTO/lead dev + processo development strutturato',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'cto',
            nome: 'CTO/Lead developer',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'CTO dipendente',
                        costo_mensile: 3500,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Architettura, team dev, roadmap tecnica'
                  },
                  {
                        id: 'fractional',
                        nome: 'CTO fractional',
                        costo_mensile: 1500,
                        costo_setup: 0,
                        impatto: 0.7,
                        note: '2 giorni/settimana + code review'
                  }
            ]
      }
]
      },
      '4': {
        cosa: 'Team strutturato + KPI per reparto (dev, sales, support)',
        tempo_mesi: 3,
        moduli: [
      {
            id: 'kpi',
            nome: 'KPI per team (MRR, churn, NPS, velocity)',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.5,
            note: 'MRR, churn rate, NPS, sprint velocity, response time'
      },
      {
            id: 'hr',
            nome: 'Processi HR + cultura aziendale',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.3,
            note: 'Onboarding, 1:1, review, OKR'
      }
]
      },
      '5': {
        cosa: 'Management completo — founder solo prodotto e vision',
        tempo_mesi: 4,
        moduli: [
      {
            id: 'coo',
            nome: 'COO / Head of Operations',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'COO dipendente',
                        costo_mensile: 4000,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Operations, team, processi, metriche, cultura'
                  },
                  {
                        id: 'fractional',
                        nome: 'COO fractional',
                        costo_mensile: 2000,
                        costo_setup: 0,
                        impatto: 0.65,
                        note: '2-3 giorni/settimana'
                  }
            ]
      }
]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Founder', cosa:'Nessun processo — tutto ad hoc e manuale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Onboarding utenti documentato + knowledge base interna',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Onboarding utenti documentato + knowledge base interna', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ,
{
        id: 'docs_api',
        nome: 'Documentazione API + knowledge base utenti',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Self-service per clienti — riduce ticket support'
}
      ]
      },
      '3': {
        cosa: 'Sales playbook — discovery, demo, trial, close, onboarding',
        tempo_mesi: 2,
        moduli: [
          { id:'processo', nome:'Sales playbook', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:1000, impatto:0.8 }
        ,
{
        id: 'ci_cd',
        nome: 'CI/CD pipeline strutturata',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 500,
        impatto: 0.15,
        note: 'Deploy automatico, test, rollback — rilasci più frequenti e sicuri'
}
      ]
      },
      '4': {
        cosa: 'Customer success process — health score, QBR, churn alert',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Customer success process',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:400, costo_setup:2000, impatto:1, note:'Customer success process — health score, QBR, churn alert' },
              { id:'base', nome:'Soluzione base', costo_mensile:200, costo_setup:1000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'RevOps completo — processi scalabili, playbook, automazioni',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'processo',
            nome: 'RevOps completo',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:800, costo_setup:4000, impatto:1, note:'RevOps completo — processi scalabili, playbook, automazioni' },
              { id:'base', nome:'Soluzione base', costo_mensile:400, costo_setup:2000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Founder', cosa:'1 piano pricing — prezzo fisso mensile o annuale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: '2-3 piani pricing — starter, pro, enterprise',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'2-3 piani pricing', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'metriche_saas',
        nome: 'Tracking MRR, churn, LTV base',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Spreadsheet con metriche SaaS essenziali'
}
      ]
      },
      '3': {
        cosa: 'Pricing tier strutturato + annual billing come leva',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'pricing',
            nome: 'Pricing strategy SaaS',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'tier',
                        nome: '3-tier pricing (Starter/Pro/Enterprise)',
                        costo_mensile: 0,
                        costo_setup: 500,
                        impatto: 1,
                        note: 'Segmentazione per valore — upsell naturale'
                  },
                  {
                        id: 'usage',
                        nome: 'Usage-based pricing',
                        costo_mensile: 0,
                        costo_setup: 500,
                        impatto: 0.7,
                        note: 'Pay per use — bassa barriera ingresso'
                  }
            ]
      }
]
      },
      '4': {
        cosa: 'Upsell/cross-sell + expansion revenue + annual billing',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'expansion',
            nome: 'Programma expansion revenue',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.6,
            note: 'Upsell feature, cross-sell moduli, upgrade piano — NRR >100%'
      },
      {
            id: 'annual',
            nome: 'Incentivo annual billing',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 200,
            impatto: 0.25,
            note: 'Sconto 15-20% per pagamento annuale — cash flow + retention'
      }
]
      },
      '5': {
        cosa: 'Revenue model ottimizzato — NRR >120%, LTV/CAC, pricing AI',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Revenue model ottimizzato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:700, costo_setup:2000, impatto:1, note:'Revenue model ottimizzato — NRR >120%, LTV/CAC, pricing AI' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:350, costo_setup:1000, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Founder', cosa:'Solo passaparola e network personale founder', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Content marketing — blog, LinkedIn founder, Product Hunt',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Content marketing', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'seo_blog',
        nome: 'Blog + SEO per keyword prodotto',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: '2-4 articoli/mese su problemi che il prodotto risolve'
}
      ]
      },
      '3': {
        cosa: 'SEO + content + Google Ads + free trial funnel',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'marketing',
            nome: 'SEO + content + Google Ads + free trial funnel',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1000, costo_setup:1500, impatto:1, note:'SEO + content + Google Ads + free trial funnel' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:400, costo_setup:750, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Demand gen + content + paid + community + webinar',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'Demand gen + content + paid + community + webinar',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:2500, costo_setup:3000, impatto:1, note:'Demand gen + content + paid + community + webinar' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:1000, costo_setup:1500, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Marketing scalabile — brand, demand gen, PLG, partner marketing',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'marketing',
            nome: 'Marketing scalabile',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:5000, costo_setup:6000, impatto:1, note:'Marketing scalabile — brand, demand gen, PLG, partner marketing' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:2000, costo_setup:3000, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Founder', cosa:'Landing page base con form di contatto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito prodotto con pricing, demo video, sign-up',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito prodotto con pricing, demo video, sign-up', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'demo_cta',
        nome: 'CTA demo/trial prominente',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'Bottone demo/free trial visibile su ogni pagina'
}
      ]
      },
      '3': {
        cosa: 'Sito marketing con case study, blog, self-service trial',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito marketing con case study, blog, self-service trial',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:200, costo_setup:2000, impatto:1, note:'Sito marketing con case study, blog, self-service trial' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:80, costo_setup:800, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Sito ottimizzato conversione — A/B test, CRO, chatbot',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito ottimizzato conversione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:500, costo_setup:4000, impatto:1, note:'Sito ottimizzato conversione — A/B test, CRO, chatbot' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:200, costo_setup:1600, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Sito + app center + marketplace integrazioni + community',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1000, costo_setup:8000, impatto:1, note:'Sito + app center + marketplace integrazioni + community' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:400, costo_setup:3200, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Founder/CTO', cosa:'Hosting base su VPS o shared — deploy manuale', costo_mensile:50, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Cloud AWS/GCP con CI/CD base e monitoring',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Cloud AWS/GCP con CI/CD base e monitoring', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'monitoring',
        nome: 'Monitoring base (uptime, errori)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Sentry/Datadog base per alert e debug'
}
      ]
      },
      '3': {
        cosa: 'Infrastruttura scalabile — container, auto-scaling, backup',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Infrastruttura scalabile',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:800, costo_setup:2000, impatto:1, note:'Infrastruttura scalabile — container, auto-scaling, backup' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:400, costo_setup:800, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'SRE practices — SLA 99.9%, incident management, DR',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'canale',
            nome: 'SRE practices',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:2000, costo_setup:4000, impatto:1, note:'SRE practices — SLA 99.9%, incident management, DR' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1000, costo_setup:1600, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Platform team — multi-region, zero downtime, compliance SOC2',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Platform team',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:4000, costo_setup:8000, impatto:1, note:'Platform team — multi-region, zero downtime, compliance SOC2' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:2000, costo_setup:3200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Infrastruttura cloud e DevOps',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECH DIGITAL AGENCY
  // ═══════════════════════════════════════════════════════════════════════════
  tech_digital_agency: {
    vendite: {
      '1': { chi:'Founder', cosa:'Founder vende tramite network personale e referral', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Personal branding founder + portfolio strutturato + networking eventi', tempo_mesi:2, moduli:[
        { id:'portfolio', nome:'Portfolio progetti strutturato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Case study con risultati misurabili, screenshot, testimonial' },
        { id:'networking', nome:'Networking eventi digital/marketing', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.3, note:'Meetup, conferenze (WMF, Mashable), community marketing digitale' },
      ]},
      '3': { cosa:'Account manager/business developer dedicato', tempo_mesi:3, moduli:[
        { id:'account', nome:'Account manager/BD', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'senior', nome:'Account manager senior digital', costo_mensile:2800, costo_setup:0, impatto:1.0, note:'Esperienza in agenzia, porta portafoglio clienti, gestisce vendita complessa' },
          { id:'junior', nome:'Business developer junior + mentoring', costo_mensile:1800, costo_setup:500, impatto:0.6, note:'Da formare, il founder fa mentoring' },
        ]},
      ]},
      '4': { cosa:'Team new business + account management separati', tempo_mesi:4, moduli:[
        { id:'new_biz', nome:'New business development', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'BD manager dipendente', costo_mensile:2800, costo_setup:0, impatto:0.5, note:'Lead gen, pitch, nuovi clienti — separato da account management' },
          { id:'fractional', nome:'BD fractional/consulente', costo_mensile:1500, costo_setup:0, impatto:0.3, note:'2-3 giorni/settimana' },
        ]},
        { id:'account', nome:'Account manager clienti esistenti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Account manager dipendente', costo_mensile:2500, costo_setup:0, impatto:0.35, note:'Gestione clienti attivi, upselling, retention, soddisfazione' },
          { id:'parttime', nome:'Account part-time', costo_mensile:1200, costo_setup:0, impatto:0.2, note:'Per portafoglio clienti ridotto' },
        ]},
      ]},
      '5': { cosa:'Dir. commerciale + team BD + account + partner channel', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Direttore commerciale agenzia', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale dipendente', costo_mensile:3500, costo_setup:0, impatto:0.5, note:'Strategia vendita, pricing, partner, grandi pitch' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:1800, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Founder', cosa:'Nessun tracciamento — deal a memoria e email', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'CRM base per pipeline opportunita e forecast', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM per agenzia digital', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'hubspot', nome:'HubSpot CRM (free/starter)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline, deal, email tracking, task — gratis per iniziare' },
          { id:'pipedrive', nome:'Pipedrive', costo_mensile:30, costo_setup:200, impatto:0.7, note:'Pipeline visuale, automazioni, integrazioni' },
        ]},
      ]},
      '3': { cosa:'CRM con gestione proposte, contratti e retainer', tempo_mesi:1, moduli:[
        { id:'crm_pro', nome:'CRM professionale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'hubspot_pro', nome:'HubSpot Sales Pro', costo_mensile:80, costo_setup:500, impatto:1.0, note:'Pipeline, proposte, contratti, automazioni, forecast' },
          { id:'salesforce', nome:'Salesforce Essentials', costo_mensile:60, costo_setup:400, impatto:0.75, note:'CRM enterprise, piu complesso' },
        ]},
      ]},
      '4': { cosa:'CRM integrato con project management e timesheet', tempo_mesi:2, moduli:[
        { id:'integrazione', nome:'CRM + PM integrati', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'all_in_one', nome:'Piattaforma all-in-one (HubSpot + Asana/Monday)', costo_mensile:200, costo_setup:1000, impatto:1.0, note:'Dal lead al progetto, ore, margine, tutto tracciato' },
          { id:'agency_tool', nome:'Tool agenzia dedicato (Productive/Teamwork)', costo_mensile:150, costo_setup:800, impatto:0.8, note:'CRM + PM + timesheet + fatturazione per agenzie' },
        ]},
      ]},
      '5': { cosa:'Piattaforma agenzia completa — CRM, PM, finance, BI', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma agency management', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Agency management (Productive/Accelo)', costo_mensile:400, costo_setup:2000, impatto:1.0, note:'CRM, progetti, risorse, timesheet, fatturazione, profitability, BI' },
          { id:'modulare', nome:'CRM + PM + finance separati', costo_mensile:200, costo_setup:1000, impatto:0.6, note:'Tool separati collegati via API' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Founder', cosa:'Founder fa tutto — vendita, delivery, admin', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Separazione ruoli: account, creativi, developer', tempo_mesi:1, moduli:[
        { id:'organigramma', nome:'Organigramma agenzia', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Account/PM, creativi (design/copy), developer, admin — chi fa cosa' },
      ]},
      '3': { cosa:'PM dedicato + team creativo strutturato', tempo_mesi:2, moduli:[
        { id:'pm', nome:'Project manager digital', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'PM dipendente (esperienza agenzia)', costo_mensile:2500, costo_setup:0, impatto:0.7, note:'Gestione progetti, risorse, deadline, rapporto cliente' },
          { id:'promozione', nome:'Promozione senior a PM', costo_mensile:300, costo_setup:500, impatto:0.5, note:'Formazione PM + delega' },
        ]},
      ]},
      '4': { cosa:'Head of + KPI per team/progetto + specializzazioni', tempo_mesi:3, moduli:[
        { id:'head', nome:'Head of department', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'creative', nome:'Creative director', costo_mensile:3000, costo_setup:0, impatto:0.5, note:'Supervisione qualita creativa, brand, pitch, mentoring team' },
          { id:'tech', nome:'Tech lead/CTO', costo_mensile:3000, costo_setup:0, impatto:0.45, note:'Architettura, code review, scelte tecniche, mentoring dev' },
        ]},
        { id:'kpi', nome:'Dashboard KPI agenzia', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Utilization rate, margine per progetto, NPS cliente, delivery on-time' },
      ]},
      '5': { cosa:'Management completo — founder solo strategia e grandi clienti', tempo_mesi:5, moduli:[
        { id:'coo', nome:'COO/Operations director', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'COO dipendente', costo_mensile:4000, costo_setup:0, impatto:1.0, note:'Delivery, HR, operations, finance — il founder fa strategia e BD' },
          { id:'fractional', nome:'COO fractional', costo_mensile:2000, costo_setup:0, impatto:0.65, note:'3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Founder', cosa:'Nessun processo — ogni progetto gestito ad hoc', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Template proposta/brief + processo onboarding cliente', tempo_mesi:1, moduli:[
        { id:'template', nome:'Template proposta e brief strutturati', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Brief creativo, proposta commerciale, contratto, onboarding checklist' },
        { id:'workflow', nome:'Workflow approvazione deliverable', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.25, note:'Bozza, revisione interna, presentazione, feedback, approvazione' },
      ]},
      '3': { cosa:'Project management strutturato + timesheet + QA', tempo_mesi:2, moduli:[
        { id:'pm_tool', nome:'Tool project management', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'asana', nome:'Asana/Monday.com per agenzia', costo_mensile:50, costo_setup:500, impatto:1.0, note:'Task, milestone, dipendenze, template progetto, timesheet' },
          { id:'basecamp', nome:'Basecamp (semplice + cliente)', costo_mensile:30, costo_setup:300, impatto:0.6, note:'Semplice, con accesso cliente per feedback' },
        ]},
        { id:'timesheet', nome:'Tracking ore per progetto', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.2, note:'Toggl/Harvest/Clockify — ore per progetto/task/persona' },
      ]},
      '4': { cosa:'Processi per servizio (SEO, ads, social, dev) + SLA', tempo_mesi:2, moduli:[
        { id:'sop', nome:'SOP per servizio/disciplina', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Procedure standard per ogni servizio: SEO audit, campagna ads, redesign sito' },
        { id:'sla', nome:'SLA e reporting strutturati', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.3, note:'Report mensile per cliente, KPI concordati, SLA tempi risposta' },
      ]},
      '5': { cosa:'Agency management platform + BI profitability + automation', tempo_mesi:4, moduli:[
        { id:'platform', nome:'Agency management completo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Productive/Accelo/Scoro', costo_mensile:300, costo_setup:2000, impatto:1.0, note:'PM, risorse, timesheet, budget, fatturazione, profitability per progetto' },
          { id:'modulare', nome:'Tool separati integrati (Asana + Harvest + QBO)', costo_mensile:150, costo_setup:800, impatto:0.55, note:'Meno integrato, piu flessibile' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Founder', cosa:'Progetti one-shot a prezzo fisso — nessun ricavo ricorrente', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pricing strutturato — daily rate + pacchetti per servizio', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Rate card e pacchetti servizi', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Daily rate per seniority, pacchetti per servizio (sito, SEO, social)' },
      ]},
      '3': { cosa:'Retainer mensili per gestione continuativa (social, SEO, ads)', tempo_mesi:2, moduli:[
        { id:'retainer', nome:'Contratti retainer mensili', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.7, note:'Gestione social, SEO, advertising in abbonamento — MRR prevedibile' },
        { id:'performance', nome:'Fee a performance/success fee', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Bonus su risultati (lead, vendite) — allinea interessi' },
      ]},
      '4': { cosa:'Revenue mix: progetti + retainer + consulenza + formazione', tempo_mesi:3, moduli:[
        { id:'consulenza', nome:'Servizi consulenza strategica', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Audit digital, strategia marketing, workshop — margine 80%+' },
        { id:'formazione', nome:'Formazione aziendale digital', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.15, note:'Corsi social, ads, analytics per team cliente — ricavo aggiuntivo' },
      ]},
      '5': { cosa:'Revenue scalabile: prodotti (template, SaaS tool), white label, franchising', tempo_mesi:4, moduli:[
        { id:'prodotto', nome:'Prodotti/servizi scalabili', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'saas', nome:'SaaS tool/prodotto digitale proprio', costo_mensile:500, costo_setup:5000, impatto:1.0, note:'Tool proprietario per clienti (dashboard, automation) — revenue ricorrente scalabile' },
          { id:'template', nome:'Template/framework riutilizzabili', costo_mensile:200, costo_setup:2000, impatto:0.5, note:'Template siti, setup ads, processi pre-configurati — delivery piu veloce' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo referral e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'LinkedIn founder + sito agenzia con portfolio', tempo_mesi:1, moduli:[
        { id:'linkedin', nome:'Personal branding founder su LinkedIn', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Post settimanali: case study, insights, behind the scenes' },
        { id:'clutch', nome:'Profilo su Clutch/Sortlist/DesignRush', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.3, note:'Recensioni verificate su piattaforme di ranking agenzie' },
      ]},
      '3': { cosa:'Content marketing + webinar + community building', tempo_mesi:2, moduli:[
        { id:'content', nome:'Content marketing agenzia', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'strutturato', nome:'Blog + newsletter + webinar mensile', costo_mensile:300, costo_setup:500, impatto:1.0, note:'Articoli su trend digital, case study, webinar per lead gen' },
          { id:'base', nome:'Blog + LinkedIn organico', costo_mensile:100, costo_setup:200, impatto:0.5, note:'1-2 articoli/mese + post LinkedIn' },
        ]},
      ]},
      '4': { cosa:'LinkedIn/Meta Ads + PR su riviste digital + speaker a eventi', tempo_mesi:2, moduli:[
        { id:'ads', nome:'Advertising B2B per agenzia', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'strutturato', nome:'LinkedIn Ads + retargeting + landing page', costo_mensile:600, costo_setup:500, impatto:1.0, note:'Lead gen su decision maker, retargeting visitatori, LP dedicate' },
          { id:'base', nome:'LinkedIn Ads base + content boost', costo_mensile:300, costo_setup:200, impatto:0.5, note:'Budget ads + boost post migliori' },
        ]},
      ]},
      '5': { cosa:'Piano marketing agenzia — brand, thought leadership, PR, awards', tempo_mesi:4, moduli:[
        { id:'piano', nome:'Piano marketing agenzia digital', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'PR + awards + conferenze (con supporto esterno)', costo_mensile:1500, costo_setup:3000, impatto:1.0, note:'Candidatura awards (Awwwards, CSS Design), speaker conferenze, PR su riviste' },
          { id:'interno', nome:'Marketing manager interno', costo_mensile:800, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata al marketing agenzia' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina base', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito agenzia con portfolio, servizi, team e contatti', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito agenzia digital', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom (design showcase)', costo_mensile:30, costo_setup:3000, impatto:1.0, note:'Il sito stesso e il biglietto da visita — design, animazioni, case study' },
          { id:'template', nome:'Sito da template premium (Framer/Webflow)', costo_mensile:20, costo_setup:1000, impatto:0.6, note:'Template premium, veloce da lanciare' },
        ]},
      ]},
      '3': { cosa:'Case study interattivi + blog + risorse scaricabili per lead gen', tempo_mesi:2, moduli:[
        { id:'case_study', nome:'Case study interattivi', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1500, impatto:0.5, note:'Case study con metriche, before/after, video — conversione alta' },
        { id:'lead_gen', nome:'Risorse gated per lead generation', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.3, note:'Template, checklist, guide scaricabili in cambio di email' },
      ]},
      '4': { cosa:'Sito con chatbot, preventivatore automatico, area clienti', tempo_mesi:3, moduli:[
        { id:'automatizzazione', nome:'Automazione sito agenzia', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'avanzato', nome:'Chatbot + preventivatore + booking', costo_mensile:100, costo_setup:2000, impatto:1.0, note:'Chatbot qualificazione lead, preventivatore online, booking call' },
          { id:'base', nome:'Form contatto avanzato + Calendly', costo_mensile:0, costo_setup:500, impatto:0.5, note:'Form qualificato + prenotazione call' },
        ]},
      ]},
      '5': { cosa:'Piattaforma digitale — sito, portale clienti, dashboard risultati', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma agenzia digitale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Sito + portale clienti + dashboard risultati', costo_mensile:300, costo_setup:6000, impatto:1.0, note:'Area clienti con dashboard KPI, report automatici, file condivisi, fatture' },
          { id:'mid', nome:'Sito + area clienti base (Notion/Google Data Studio)', costo_mensile:100, costo_setup:2000, impatto:0.5, note:'Piu semplice, meno personalizzato' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento freelance e tool',
      '1': { chi:'Founder', cosa:'Tutto interno o 1-2 freelance occasionali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Network freelance qualificati per competenze mancanti', tempo_mesi:1, moduli:[
        { id:'freelance', nome:'Database freelance qualificati', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Rete di designer, developer, copywriter, SEO specialist testati' },
      ]},
      '3': { cosa:'Accordi con freelance fidati + stack tool ottimizzato', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi quadro freelance/white label', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Tariffe concordate, NDA, SLA qualita, disponibilita garantita' },
        { id:'tool', nome:'Stack tool agenzia ottimizzato', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.15, note:'Negoziazione licenze: Adobe, Figma, Semrush, Mailchimp, hosting' },
      ]},
      '4': { cosa:'Team esteso nearshore + white label partnership', tempo_mesi:3, moduli:[
        { id:'nearshore', nome:'Team nearshore/white label', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'nearshore', nome:'Team dev nearshore (Est Europa)', costo_mensile:0, costo_setup:1000, impatto:1.0, note:'Developer nearshore per progetti grandi, costo -40%, fuso compatibile' },
          { id:'whitelabel', nome:'Partnership white label con altre agenzie', costo_mensile:0, costo_setup:500, impatto:0.6, note:'Subappalto competenze specifiche (video, 3D, app) a agenzie partner' },
        ]},
      ]},
      '5': { cosa:'Resp. operations — gestione risorse, vendor, profitability', tempo_mesi:4, moduli:[
        { id:'ops', nome:'Resp. operations/resource manager', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Operations manager dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Staffing, vendor management, budget, qualita delivery' },
          { id:'fractional', nome:'Operations manager fractional', costo_mensile:1500, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECH SYSTEM INTEGRATOR
  // ═══════════════════════════════════════════════════════════════════════════
  tech_system_integrator: {
    vendite: {
      '1': { chi:'Founder/partner', cosa:'Founder/partner vende tramite network personale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Networking strutturato + eventi vendor (Microsoft, SAP, Oracle)', tempo_mesi:2, moduli:[
        { id:'networking', nome:'Piano networking e eventi vendor', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.6, note:'Partecipazione eventi Microsoft/SAP/Oracle partner, community IT manager' },
        { id:'partnership', nome:'Partnership con vendor tecnologici', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.3, note:'Certificazione partner Microsoft/SAP/Oracle, accesso a lead vendor' },
      ]},
      '3': { cosa:'Account manager dedicato per sviluppo nuovi clienti', tempo_mesi:3, moduli:[
        { id:'account', nome:'Account manager IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'senior', nome:'Account manager senior (esperienza IT)', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Conosce il mercato, ha network, gestisce vendite complesse' },
          { id:'junior', nome:'Account manager junior + mentoring', costo_mensile:2000, costo_setup:500, impatto:0.6, note:'Da formare, il founder fa mentoring' },
        ]},
      ]},
      '4': { cosa:'Account manager + pre-sales tecnico per demo e POC', tempo_mesi:4, moduli:[
        { id:'presales', nome:'Pre-sales/solution architect', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Solution architect dipendente', costo_mensile:3500, costo_setup:0, impatto:0.5, note:'Demo, POC, architettura soluzioni, supporto vendita tecnica' },
          { id:'parttime', nome:'Pre-sales a progetto/fractional', costo_mensile:1500, costo_setup:0, impatto:0.3, note:'Interviene su deal complessi, supporta account manager' },
        ]},
        { id:'account2', nome:'Secondo account manager', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'senior', nome:'Account manager senior', costo_mensile:3000, costo_setup:0, impatto:0.25, note:'Per settore/zona diversa dal primo' },
          { id:'inside', nome:'Inside sales/lead generation', costo_mensile:1800, costo_setup:0, impatto:0.15, note:'Qualificazione lead, appuntamenti, follow-up' },
        ]},
      ]},
      '5': { cosa:'Dir. commerciale + team account + pre-sales + partner channel', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Direttore commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale IT dipendente', costo_mensile:4000, costo_setup:0, impatto:0.5, note:'Strategia, pipeline, pricing, partner management, grandi deal' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:2000, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
        { id:'team', nome:'Team vendita', tipo:'multi', obbligatorio:true, min:2, varianti:[
          { id:'account', nome:'Account manager', costo_mensile:3000, costo_setup:0, impatto:0.2, note:'Per vertical/zona' },
          { id:'inside', nome:'Inside sales/SDR', costo_mensile:1800, costo_setup:0, impatto:0.12, note:'Lead gen, qualificazione, appuntamenti' },
        ]},
      ]},
    },
    pipeline: {
      '1': { chi:'Founder', cosa:'Nessun tracciamento — deal a memoria', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'CRM base per tracciare opportunita, deal e forecast', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM per vendita IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'hubspot', nome:'HubSpot CRM (free/starter)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline, deal tracking, email tracking, forecast base' },
          { id:'pipedrive', nome:'Pipedrive', costo_mensile:30, costo_setup:200, impatto:0.7, note:'Pipeline visuale, automazioni, integrazioni' },
        ]},
      ]},
      '3': { cosa:'CRM con gestione offerte, contratti e SLA', tempo_mesi:1, moduli:[
        { id:'crm_pro', nome:'CRM professionale IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'salesforce', nome:'Salesforce Essentials/Professional', costo_mensile:100, costo_setup:800, impatto:1.0, note:'Pipeline, offerte, contratti, SLA, forecast avanzato' },
          { id:'hubspot_pro', nome:'HubSpot Sales Pro', costo_mensile:80, costo_setup:500, impatto:0.8, note:'Pipeline, sequenze, documenti, forecast' },
        ]},
      ]},
      '4': { cosa:'CRM integrato con PSA (project accounting) e helpdesk', tempo_mesi:2, moduli:[
        { id:'psa', nome:'PSA (Professional Services Automation)', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'PSA completo (ConnectWise/Autotask)', costo_mensile:300, costo_setup:2000, impatto:1.0, note:'CRM + progetti + timesheet + ticketing + fatturazione, tutto integrato' },
          { id:'modulare', nome:'CRM + project management separati', costo_mensile:150, costo_setup:800, impatto:0.6, note:'Salesforce + Asana/Monday, meno integrazione' },
        ]},
      ]},
      '5': { cosa:'Piattaforma gestione completa — CRM, PSA, helpdesk, BI', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma IT services', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ConnectWise/Autotask + BI', costo_mensile:600, costo_setup:5000, impatto:1.0, note:'CRM, PSA, helpdesk, RMM, fatturazione, BI — tutto integrato' },
          { id:'mid', nome:'CRM Pro + PSA base', costo_mensile:300, costo_setup:2500, impatto:0.6, note:'Meno integrato' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Founder', cosa:'Founder fa tutto — vendita, delivery, admin', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Separazione vendita/delivery — organigramma base', tempo_mesi:1, moduli:[
        { id:'organigramma', nome:'Organigramma IT company', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Vendita, delivery/progetti, supporto, admin — chi fa cosa' },
      ]},
      '3': { cosa:'PM dedicato + team tecnico strutturato', tempo_mesi:2, moduli:[
        { id:'pm', nome:'Project manager IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'PM dipendente certificato (PMP/Prince2)', costo_mensile:3000, costo_setup:0, impatto:0.7, note:'Gestione progetti, risorse, budget, SLA, rapporto cliente' },
          { id:'promozione', nome:'Promozione tecnico senior a PM', costo_mensile:300, costo_setup:500, impatto:0.5, note:'Formazione PM + delega, conosce gia i progetti' },
        ]},
      ]},
      '4': { cosa:'KPI per team + delivery manager + practice lead', tempo_mesi:3, moduli:[
        { id:'delivery_mgr', nome:'Delivery manager', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Delivery manager dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Supervisione tutti i progetti, risorse, qualita, escalation' },
          { id:'fractional', nome:'Delivery manager fractional', costo_mensile:1800, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' },
        ]},
        { id:'kpi', nome:'Dashboard KPI delivery', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Margine per progetto, utilization rate, on-time delivery, CSAT' },
      ]},
      '5': { cosa:'Management completo — founder solo strategia e grandi clienti', tempo_mesi:5, moduli:[
        { id:'coo', nome:'COO/Direttore operativo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'COO dipendente', costo_mensile:4500, costo_setup:0, impatto:1.0, note:'Delivery, HR, operations, finance — il founder fa strategia e BD' },
          { id:'fractional', nome:'COO fractional', costo_mensile:2200, costo_setup:0, impatto:0.65, note:'3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Founder', cosa:'Nessun processo — ogni progetto gestito ad hoc', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Template proposta/offerta + processo vendita definito', tempo_mesi:1, moduli:[
        { id:'template', nome:'Template offerta/SOW strutturato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Scope of Work, timeline, deliverables, pricing, T&C — riutilizzabile' },
        { id:'processo_vendita', nome:'Processo vendita step-by-step', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.25, note:'Lead, qualificazione, demo, POC, proposta, negoziazione, close' },
      ]},
      '3': { cosa:'Metodologia progetti + timesheet + gestione risorse', tempo_mesi:2, moduli:[
        { id:'metodologia', nome:'Metodologia delivery progetti', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agile', nome:'Framework Agile/Scrum per delivery', costo_mensile:0, costo_setup:500, impatto:1.0, note:'Sprint, backlog, daily standup, review, retrospective — con tool (Jira/Azure DevOps)' },
          { id:'waterfall', nome:'Metodologia waterfall strutturata', costo_mensile:0, costo_setup:300, impatto:0.6, note:'Fasi, milestone, deliverables, sign-off — per progetti piu tradizionali' },
        ]},
        { id:'timesheet', nome:'Sistema timesheet/resource planning', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:300, impatto:0.2, note:'Tracking ore per progetto/task, utilization rate, capacity planning' },
      ]},
      '4': { cosa:'PSA completo + SLA strutturati + knowledge base', tempo_mesi:3, moduli:[
        { id:'psa', nome:'Professional Services Automation', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'completo', nome:'PSA completo (ConnectWise/Autotask)', costo_mensile:250, costo_setup:2000, impatto:1.0, note:'Progetti, risorse, timesheet, ticketing, SLA, fatturazione automatica' },
          { id:'leggero', nome:'PM tool + helpdesk separati (Jira + Freshdesk)', costo_mensile:100, costo_setup:800, impatto:0.55, note:'Meno integrato, piu flessibile' },
        ]},
      ]},
      '5': { cosa:'ITIL/ISO 20000 + governance IT + BI per margini e delivery', tempo_mesi:4, moduli:[
        { id:'framework', nome:'Framework ITIL/governance', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'itil', nome:'ITIL + ISO 20000 con consulente', costo_mensile:200, costo_setup:5000, impatto:1.0, note:'Service management strutturato, prerequisito per grandi clienti/PA' },
          { id:'interno', nome:'Governance interna senza certificazione', costo_mensile:0, costo_setup:1500, impatto:0.5, note:'Processi documentati ma senza ente terzo' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Founder', cosa:'Revenue solo da progetti T&M — nessun ricavo ricorrente', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pricing strutturato — daily rate per seniority + fixed price per servizi standard', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Rate card strutturata', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Daily rate per junior/mid/senior/architect, fixed price per servizi standard' },
      ]},
      '3': { cosa:'Contratti managed services + supporto ricorrente', tempo_mesi:2, moduli:[
        { id:'managed', nome:'Contratti managed services', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Supporto IT ricorrente, monitoring, manutenzione — MRR prevedibile' },
        { id:'sla', nome:'SLA premium a pagamento', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'SLA con tempo di risposta garantito, on-site, 24/7 — upsell' },
      ]},
      '4': { cosa:'Revenue mix: progetti + managed services + licensing/reselling', tempo_mesi:3, moduli:[
        { id:'licensing', nome:'Reselling licenze software', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.5, note:'Reselling Microsoft 365/Azure, licenze ERP/CRM — revenue ricorrente + margine' },
        { id:'training', nome:'Servizi formazione/training', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.15, note:'Training utenti, certificazioni, change management — margine 70%+' },
      ]},
      '5': { cosa:'Revenue scalabile: IP propria, prodotti + servizi, canale partner', tempo_mesi:4, moduli:[
        { id:'ip', nome:'Sviluppo IP/prodotto proprio', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'prodotto', nome:'Software/tool proprietario (SaaS add-on)', costo_mensile:500, costo_setup:5000, impatto:1.0, note:'Vertical add-on su piattaforma vendor, licensing proprio, margine alto' },
          { id:'framework', nome:'Framework/accelerator riutilizzabile', costo_mensile:200, costo_setup:2000, impatto:0.5, note:'Template, script, connettori riutilizzabili — delivery piu veloce, margine superiore' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo network personale founder', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'LinkedIn aziendale attivo + case study pubblicati', tempo_mesi:1, moduli:[
        { id:'linkedin', nome:'LinkedIn aziendale professionale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Post settimanali: case study, insights, team, eventi vendor' },
        { id:'case_study', nome:'Case study strutturati', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.3, note:'2-3 case study con problema, soluzione, risultati — social proof' },
      ]},
      '3': { cosa:'Content marketing tecnico + eventi/webinar + vendor co-marketing', tempo_mesi:2, moduli:[
        { id:'content', nome:'Content marketing B2B IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia content B2B tech', costo_mensile:800, costo_setup:500, impatto:1.0, note:'Blog tecnico, white paper, webinar, LinkedIn Ads, newsletter' },
          { id:'interno', nome:'Content interno + tool', costo_mensile:300, costo_setup:200, impatto:0.5, note:'Founder/tecnici scrivono, tool per distribuzione' },
        ]},
        { id:'vendor', nome:'Co-marketing con vendor', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:200, impatto:0.2, note:'MDF vendor (Microsoft/SAP), eventi congiunti, lead sharing' },
      ]},
      '4': { cosa:'LinkedIn Ads su CIO/IT manager + account-based marketing', tempo_mesi:2, moduli:[
        { id:'abm', nome:'Account-based marketing', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'strutturato', nome:'ABM con tool dedicato (Demandbase/6sense)', costo_mensile:800, costo_setup:1000, impatto:1.0, note:'Target account list, personalized outreach, intent data' },
          { id:'manuale', nome:'ABM manuale (LinkedIn + email sequenze)', costo_mensile:300, costo_setup:300, impatto:0.5, note:'LinkedIn Sales Navigator + email outreach manuale' },
        ]},
      ]},
      '5': { cosa:'Piano marketing B2B completo — brand, ABM, content, partner, eventi', tempo_mesi:4, moduli:[
        { id:'piano', nome:'Piano marketing B2B IT', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing B2B tech', costo_mensile:2500, costo_setup:4000, impatto:1.0, note:'Brand, ABM, content, LinkedIn, eventi, PR tech, analyst relations' },
          { id:'interno', nome:'Marketing manager B2B interno', costo_mensile:1200, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina base', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito professionale con servizi, competenze, certificazioni vendor', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito system integrator', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom WordPress/Next.js', costo_mensile:30, costo_setup:2500, impatto:1.0, note:'Servizi, tecnologie, certificazioni partner, team, case study' },
          { id:'template', nome:'Sito da template tech', costo_mensile:20, costo_setup:800, impatto:0.5, note:'Template B2B tech' },
        ]},
      ]},
      '3': { cosa:'Sito con case study, blog tecnico, risorse scaricabili', tempo_mesi:2, moduli:[
        { id:'content_hub', nome:'Content hub tecnico', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1500, impatto:0.5, note:'Case study, blog, white paper, video demo — lead generation' },
        { id:'form', nome:'Form contatto/richiesta consulenza', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.4, note:'Form qualificato: azienda, ruolo, esigenza, budget, timeline' },
      ]},
      '4': { cosa:'Sito con portale clienti, ticketing, knowledge base', tempo_mesi:3, moduli:[
        { id:'portale', nome:'Portale clienti/helpdesk', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'integrato', nome:'Portale integrato con PSA/helpdesk', costo_mensile:200, costo_setup:3000, impatto:1.0, note:'Ticketing, SLA tracking, knowledge base, documentazione progetto' },
          { id:'standalone', nome:'Helpdesk standalone (Freshdesk/Zendesk)', costo_mensile:100, costo_setup:1000, impatto:0.55, note:'Ticketing + KB, meno integrato con sito' },
        ]},
      ]},
      '5': { cosa:'Piattaforma digitale completa — sito, portale clienti, automazioni, BI', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma digitale SI', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Piattaforma enterprise (custom/HubSpot CMS)', costo_mensile:500, costo_setup:8000, impatto:1.0, note:'Sito, portale clienti, chatbot, automazioni marketing, BI, CRM integrato' },
          { id:'mid', nome:'Sito avanzato + portale base', costo_mensile:200, costo_setup:3000, impatto:0.5, note:'WordPress + Freshdesk + integrazioni' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento freelance e tool',
      '1': { chi:'Founder', cosa:'Team interno fisso — nessuna strategia risorse esterne', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Network freelance/contractor per picchi di lavoro', tempo_mesi:1, moduli:[
        { id:'freelance', nome:'Database freelance/contractor IT', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Rete di specialisti per competenze mancanti o picchi: dev, infra, security' },
      ]},
      '3': { cosa:'Accordi con societa di body rental + partnership tecnologiche', tempo_mesi:2, moduli:[
        { id:'body_rental', nome:'Accordi body rental/nearshore', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Accordi con fornitori risorse IT per scale-up rapido' },
        { id:'tool', nome:'Stack tool ottimizzato', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.15, note:'Negoziazione licenze tool interni: Jira, Confluence, Azure DevOps, monitoring' },
      ]},
      '4': { cosa:'Team nearshore/offshore per delivery + ottimizzazione costi', tempo_mesi:3, moduli:[
        { id:'nearshore', nome:'Team nearshore/offshore', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'nearshore', nome:'Team nearshore (Est Europa/Portogallo)', costo_mensile:0, costo_setup:2000, impatto:1.0, note:'Developer/tester nearshore, fuso orario compatibile, costo -40%' },
          { id:'freelance_team', nome:'Team freelance strutturato', costo_mensile:0, costo_setup:500, impatto:0.6, note:'Freelance italiani/EU fidelizzati, costo variabile ma qualita' },
        ]},
      ]},
      '5': { cosa:'Resp. delivery/operations — gestione risorse, vendor, margini', tempo_mesi:4, moduli:[
        { id:'resp', nome:'Resp. delivery/resource management', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Delivery/resource manager dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Gestione team, staffing progetti, vendor management, margini' },
          { id:'fractional', nome:'Operations manager fractional', costo_mensile:1800, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana' },
        ]},
      ]},
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECH AUTOMAZIONE
  // ═══════════════════════════════════════════════════════════════════════════
  tech_automazione: {
    vendite: {
      '1': { chi:'Titolare/fondatore', cosa:'Titolare/fondatore vende tramite network industriale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Networking a fiere industriali (SPS, MECSPE) + visite stabilimenti', tempo_mesi:2, moduli:[
        { id:'fiere', nome:'Partecipazione fiere automazione', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.6, note:'SPS, MECSPE, A&T — stand o visita, contatto con resp. produzione' },
        { id:'visite', nome:'Visite stabilimenti prospect', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.3, note:'Audit gratuito linee produttive, proposta miglioramento' },
      ]},
      '3': { cosa:'Tecnico-commerciale per vendita soluzioni automazione', tempo_mesi:3, moduli:[
        { id:'tecnico_comm', nome:'Tecnico-commerciale automazione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'senior', nome:'Tecnico-commerciale senior (esperienza PLC/robot)', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Competenza tecnica + vendita, progetta soluzioni, gestisce clienti' },
          { id:'junior', nome:'Tecnico-commerciale junior + mentoring', costo_mensile:2000, costo_setup:500, impatto:0.6, note:'Laurea ing. meccanica/automazione, formazione interna' },
        ]},
      ]},
      '4': { cosa:'Account industriale + application engineer per progetti complessi', tempo_mesi:4, moduli:[
        { id:'account', nome:'Account manager industriale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Account manager dipendente', costo_mensile:3000, costo_setup:0, impatto:0.5, note:'Gestisce portafoglio clienti, identifica opportunita, negozia' },
          { id:'agente', nome:'Agente industriale ENASARCO', costo_mensile:1200, costo_setup:500, impatto:0.35, note:'Provvigione su commesse, porta contatti nel settore' },
        ]},
        { id:'app_eng', nome:'Application engineer', tipo:'scelta', obbligatorio:false, varianti:[
          { id:'dip', nome:'Application engineer dipendente', costo_mensile:3000, costo_setup:0, impatto:0.3, note:'Progettazione tecnica, pre-sales, POC, demo' },
          { id:'progetto', nome:'Ing. a progetto/freelance', costo_mensile:1500, costo_setup:0, impatto:0.2, note:'Per deal complessi' },
        ]},
      ]},
      '5': { cosa:'Dir. commerciale + team vendita + partnership OEM/integratori', tempo_mesi:6, moduli:[
        { id:'resp', nome:'Direttore commerciale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. commerciale automazione dipendente', costo_mensile:4000, costo_setup:0, impatto:0.5, note:'Strategia, grandi commesse, partnership OEM, pricing' },
          { id:'fractional', nome:'Dir. commerciale fractional', costo_mensile:2000, costo_setup:0, impatto:0.35, note:'2-3 giorni/settimana' },
        ]},
        { id:'partner', nome:'Programma partner/integratori', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:1000, impatto:0.2, note:'Rete integratori/OEM che propongono le nostre soluzioni' },
      ]},
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — commesse a memoria', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'CRM base per tracciare commesse e offerte', tempo_mesi:1, moduli:[
        { id:'crm', nome:'CRM per vendita industriale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'hubspot', nome:'HubSpot CRM (free/starter)', costo_mensile:0, costo_setup:200, impatto:0.85, note:'Pipeline commesse, offerte, forecast' },
          { id:'pipedrive', nome:'Pipedrive', costo_mensile:30, costo_setup:200, impatto:0.7, note:'Pipeline visuale, deal complessi' },
        ]},
      ]},
      '3': { cosa:'CRM con gestione offerte complesse e ciclo vendita lungo', tempo_mesi:1, moduli:[
        { id:'crm_pro', nome:'CRM professionale B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'salesforce', nome:'Salesforce Professional', costo_mensile:80, costo_setup:600, impatto:1.0, note:'Pipeline, offerte multi-fase, forecast, report per account' },
          { id:'hubspot_pro', nome:'HubSpot Sales Pro', costo_mensile:60, costo_setup:400, impatto:0.75, note:'Pipeline, sequenze, documenti, quote' },
        ]},
      ]},
      '4': { cosa:'CRM integrato con project management e produzione', tempo_mesi:2, moduli:[
        { id:'integrazione', nome:'CRM + Project Management', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'integrato', nome:'CRM + PM integrati (Salesforce + Jira)', costo_mensile:200, costo_setup:1500, impatto:1.0, note:'Dal deal al progetto, risorse, milestone, margine — vista unificata' },
          { id:'separato', nome:'CRM + PM separati', costo_mensile:100, costo_setup:600, impatto:0.6, note:'Tool separati, aggiornamento manuale' },
        ]},
      ]},
      '5': { cosa:'ERP industriale — commesse, produzione, acquisti, service', tempo_mesi:4, moduli:[
        { id:'erp', nome:'ERP per automazione industriale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP commesse (SAP B1/TeamSystem Manufacturing)', costo_mensile:800, costo_setup:5000, impatto:1.0, note:'Offerte, commesse, progettazione, acquisti, produzione, collaudo, service' },
          { id:'mid', nome:'Gestionale commesse mid-market', costo_mensile:400, costo_setup:2500, impatto:0.6, note:'Core features commesse + fatturazione' },
        ]},
      ]},
    },
    team: {
      '1': { chi:'Titolare', cosa:'Titolare fa tutto — vendita, progettazione, installazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Separazione commerciale/tecnico/installazione', tempo_mesi:1, moduli:[
        { id:'organigramma', nome:'Organigramma aziendale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.7, note:'Commerciale, progettazione, montaggio/installazione, service, admin' },
      ]},
      '3': { cosa:'Resp. tecnico/progettazione + team installazione strutturato', tempo_mesi:2, moduli:[
        { id:'resp_tecnico', nome:'Responsabile tecnico/progettazione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Ing. progettista senior dipendente', costo_mensile:3000, costo_setup:0, impatto:0.7, note:'Progettazione PLC, robot, HMI, quadri — supervisione tecnica' },
          { id:'promozione', nome:'Promozione tecnico esperto interno', costo_mensile:300, costo_setup:500, impatto:0.55, note:'Gia conosce i sistemi, formazione su gestione progetti' },
        ]},
      ]},
      '4': { cosa:'KPI per commessa + PM dedicato + team in crescita', tempo_mesi:3, moduli:[
        { id:'pm', nome:'Project manager commesse', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'PM industriale dipendente', costo_mensile:3000, costo_setup:0, impatto:1.0, note:'Gestione commesse, timeline, budget, risorse, collaudo' },
          { id:'fractional', nome:'PM fractional/a progetto', costo_mensile:1500, costo_setup:0, impatto:0.6, note:'Per commesse grandi' },
        ]},
        { id:'kpi', nome:'KPI commesse e delivery', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:500, impatto:0.15, note:'Margine per commessa, on-time delivery, ore vs preventivo, rework' },
      ]},
      '5': { cosa:'Management completo — titolare solo strategia e grandi clienti', tempo_mesi:5, moduli:[
        { id:'coo', nome:'Direttore operativo', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Dir. operativo/tecnico dipendente', costo_mensile:4000, costo_setup:0, impatto:1.0, note:'Progetti, team tecnico, installazione, service — il titolare fa BD e strategia' },
          { id:'fractional', nome:'Operations manager fractional', costo_mensile:2000, costo_setup:0, impatto:0.65, note:'3 giorni/settimana' },
        ]},
      ]},
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni commessa gestita ad hoc', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Template offerta tecnica + processo vendita definito', tempo_mesi:1, moduli:[
        { id:'template', nome:'Template offerta tecnica', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.6, note:'Scope, specifiche tecniche, timeline, condizioni — riutilizzabile' },
        { id:'processo', nome:'Processo vendita step-by-step', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.25, note:'Primo contatto, sopralluogo, offerta, negoziazione, ordine, kick-off' },
      ]},
      '3': { cosa:'Gestione commesse strutturata — Gantt, milestone, collaudo', tempo_mesi:2, moduli:[
        { id:'commesse', nome:'Software gestione commesse', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'pm_tool', nome:'Project management (Microsoft Project/Primavera)', costo_mensile:50, costo_setup:500, impatto:1.0, note:'Gantt, milestone, risorse, dipendenze, tracking avanzamento' },
          { id:'agile', nome:'Kanban + milestone (Asana/Monday)', costo_mensile:30, costo_setup:300, impatto:0.6, note:'Board visuale, meno formale, buono per commesse brevi' },
        ]},
      ]},
      '4': { cosa:'Certificazioni (CE, sicurezza macchine) + documentazione tecnica strutturata', tempo_mesi:3, moduli:[
        { id:'certificazioni', nome:'Gestione certificazioni CE/sicurezza', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'consulente', nome:'Consulente sicurezza macchine', costo_mensile:200, costo_setup:1000, impatto:1.0, note:'Analisi rischi, Direttiva Macchine 2006/42/CE, documentazione CE' },
          { id:'interno', nome:'Formazione interna + template', costo_mensile:0, costo_setup:500, impatto:0.5, note:'Il tecnico prepara documentazione con template e checklist' },
        ]},
        { id:'documentazione', nome:'Documentazione tecnica strutturata', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Schemi elettrici, programmi PLC, manuali uso/manutenzione, as-built' },
      ]},
      '5': { cosa:'ERP commesse + PLM + service management strutturato', tempo_mesi:4, moduli:[
        { id:'erp', nome:'ERP commesse automazione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'ERP commesse (SAP B1/Mago4 Manufacturing)', costo_mensile:800, costo_setup:6000, impatto:1.0, note:'Offerte, commesse, acquisti, produzione, collaudo, service, BI' },
          { id:'mid', nome:'Gestionale commesse mid-market', costo_mensile:400, costo_setup:3000, impatto:0.55, note:'Core features + fatturazione' },
        ]},
      ]},
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Revenue solo da commesse — nessun ricavo ricorrente', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Pricing strutturato — listino ore + materiali + margine commessa', tempo_mesi:1, moduli:[
        { id:'pricing', nome:'Struttura pricing commesse', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Tariffa ora per ruolo, margine materiali, costi trasferta — preventivo preciso' },
      ]},
      '3': { cosa:'Contratti assistenza/manutenzione impianti — ricavo ricorrente', tempo_mesi:2, moduli:[
        { id:'service', nome:'Contratti service/manutenzione', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Manutenzione programmata, assistenza remota, pronto intervento — MRR' },
        { id:'ricambi', nome:'Vendita ricambi e upgrade', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.2, note:'Stock ricambi critici, proposta upgrade software/hardware — margine alto' },
      ]},
      '4': { cosa:'Retrofit + upgrade impianti esistenti + formazione operatori', tempo_mesi:3, moduli:[
        { id:'retrofit', nome:'Servizio retrofit/upgrade', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Aggiornamento PLC, HMI, robot su impianti esistenti — commessa ricorrente' },
        { id:'training', nome:'Formazione operatori/manutentori', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.15, note:'Corsi per operatori e manutentori del cliente — margine 70%+' },
      ]},
      '5': { cosa:'Revenue scalabile: prodotto standard + service + consulenza Industry 4.0', tempo_mesi:4, moduli:[
        { id:'prodotto', nome:'Prodotto/soluzione standard ripetibile', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'standard', nome:'Macchina/cella standard configurabile', costo_mensile:500, costo_setup:5000, impatto:1.0, note:'Soluzione pre-ingegnerizzata personalizzabile — margine superiore, delivery veloce' },
          { id:'moduli', nome:'Moduli software riutilizzabili', costo_mensile:200, costo_setup:2000, impatto:0.5, note:'Librerie PLC, HMI template, connettori — riuso su commesse' },
        ]},
      ]},
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo network personale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'LinkedIn aziendale + video impianti realizzati', tempo_mesi:1, moduli:[
        { id:'linkedin', nome:'LinkedIn aziendale professionale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.5, note:'Post: impianti realizzati, video funzionamento, case study tecnici' },
        { id:'video', nome:'Video impianti/installazioni', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.3, note:'Video brevi degli impianti in funzione — il miglior biglietto da visita' },
      ]},
      '3': { cosa:'Fiere automazione (SPS, MECSPE) + content tecnico', tempo_mesi:2, moduli:[
        { id:'fiere_mkt', nome:'Stand fiere automazione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'stand', nome:'Stand SPS/MECSPE con demo', costo_mensile:300, costo_setup:5000, impatto:1.0, note:'Stand con demo live impianto, 1-2 fiere/anno' },
          { id:'visitatore', nome:'Visita + networking eventi', costo_mensile:100, costo_setup:500, impatto:0.4, note:'Visitatore VIP, workshop, networking' },
        ]},
      ]},
      '4': { cosa:'LinkedIn Ads su resp. produzione + webinar tecnici + PR', tempo_mesi:2, moduli:[
        { id:'digital', nome:'Marketing digitale B2B industriale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing B2B industriale', costo_mensile:800, costo_setup:500, impatto:1.0, note:'LinkedIn Ads, content tecnico, webinar, case study, PR su riviste' },
          { id:'interno', nome:'Marketing interno + tool', costo_mensile:300, costo_setup:200, impatto:0.5, note:'Post tecnici + budget ads LinkedIn' },
        ]},
      ]},
      '5': { cosa:'Piano marketing completo — brand, fiere, content, partner, ABM', tempo_mesi:4, moduli:[
        { id:'piano', nome:'Piano marketing automazione B2B', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'agenzia', nome:'Agenzia marketing B2B industriale', costo_mensile:2000, costo_setup:4000, impatto:1.0, note:'Brand positioning, fiere internazionali, ABM, content, PR tech' },
          { id:'interno', nome:'Marketing manager B2B interno', costo_mensile:1000, costo_setup:500, impatto:0.6, note:'1 risorsa dedicata' },
        ]},
      ]},
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina base', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Sito con soluzioni, settori serviti, video impianti', tempo_mesi:1, moduli:[
        { id:'sito', nome:'Sito automazione industriale', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'custom', nome:'Sito custom WordPress/Next.js', costo_mensile:30, costo_setup:2500, impatto:1.0, note:'Soluzioni per settore, video impianti, case study, team, certificazioni' },
          { id:'template', nome:'Sito da template industriale', costo_mensile:20, costo_setup:800, impatto:0.5, note:'Template B2B industriale' },
        ]},
      ]},
      '3': { cosa:'Case study dettagliati + blog tecnico + form contatto qualificato', tempo_mesi:2, moduli:[
        { id:'content', nome:'Content hub industriale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:1500, impatto:0.5, note:'Case study con foto/video, blog su Industry 4.0, white paper' },
        { id:'form', nome:'Form contatto qualificato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.4, note:'Settore, esigenza, volume produzione, timeline, budget indicativo' },
      ]},
      '4': { cosa:'Portale clienti con documentazione tecnica e richiesta assistenza', tempo_mesi:3, moduli:[
        { id:'portale', nome:'Portale clienti/service', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'integrato', nome:'Portale integrato con ticketing', costo_mensile:200, costo_setup:3000, impatto:1.0, note:'Documentazione impianto, manuali, richiesta assistenza, storico interventi' },
          { id:'base', nome:'Area riservata base + form assistenza', costo_mensile:50, costo_setup:1000, impatto:0.5, note:'Documentazione scaricabile + form richiesta assistenza' },
        ]},
      ]},
      '5': { cosa:'Piattaforma digitale — sito, portale clienti, configuratore soluzioni', tempo_mesi:4, moduli:[
        { id:'piattaforma', nome:'Piattaforma digitale automazione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'enterprise', nome:'Piattaforma enterprise con configuratore', costo_mensile:500, costo_setup:8000, impatto:1.0, note:'Sito, portale clienti, configuratore soluzioni, chatbot tecnico, CRM integrato' },
          { id:'mid', nome:'Sito avanzato + portale clienti', costo_mensile:200, costo_setup:3000, impatto:0.5, note:'WordPress + ticketing + documentazione' },
        ]},
      ]},
    },
    ecommerce: {
      _label: 'Approvvigionamento componenti',
      '1': { chi:'Titolare', cosa:'Acquisto componenti da distributori abituali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { cosa:'Confronto distributori — Siemens, ABB, Schneider, Fanuc, Kuka', tempo_mesi:1, moduli:[
        { id:'fornitori', nome:'Database distributori componenti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.7, note:'Scheda: distributore, brand (Siemens/ABB/Schneider), listini, tempi, sconti' },
      ]},
      '3': { cosa:'Accordi quadro con distributori + programmi partner vendor', tempo_mesi:2, moduli:[
        { id:'accordi', nome:'Accordi distributori componenti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.6, note:'Sconti volume, priorita consegna, supporto tecnico vendor' },
        { id:'partner', nome:'Programmi partner vendor (Siemens/ABB)', tipo:'flag', obbligatorio:false, costo_mensile:0, costo_setup:300, impatto:0.15, note:'Certificazione partner, sconti aggiuntivi, formazione, lead sharing' },
      ]},
      '4': { cosa:'Buyer dedicato — ottimizzazione acquisti per commessa, dual sourcing', tempo_mesi:3, moduli:[
        { id:'buyer', nome:'Buyer componenti industriali', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Buyer industriale dipendente', costo_mensile:2200, costo_setup:0, impatto:1.0, note:'Ottimizzazione acquisti per commessa, negoziazione, dual sourcing' },
          { id:'parttime', nome:'Admin con delega acquisti', costo_mensile:900, costo_setup:0, impatto:0.6, note:'Gestisce riordini, confronto prezzi, rapporto distributori' },
        ]},
      ]},
      '5': { cosa:'Supply chain manager — vendor management, dual sourcing, stock strategy', tempo_mesi:4, moduli:[
        { id:'supply', nome:'Resp. supply chain automazione', tipo:'scelta', obbligatorio:true, varianti:[
          { id:'dip', nome:'Supply chain manager dipendente', costo_mensile:3500, costo_setup:0, impatto:1.0, note:'Vendor management, dual sourcing, stock componenti critici, import' },
          { id:'fractional', nome:'Supply chain manager fractional', costo_mensile:1800, costo_setup:0, impatto:0.6, note:'2-3 giorni/settimana' },
        ]},
      ]},
    }
  }

};

window.STEP_DETAIL_BY_SETTORE = STEP_DETAIL_BY_SETTORE;
