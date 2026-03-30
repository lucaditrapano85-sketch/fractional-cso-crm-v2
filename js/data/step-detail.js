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
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Capo reparto tra operai', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Ruoli separati produzione/commerciale', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'KPI + deleghe operative', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management strutturato', costo_mensile:1500, costo_setup:1500, tempo_mesi:5 },
      _label: 'Organizzazione',
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
      '1': { chi:'Nessuno', cosa:'Nessuna presenza digitale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Iscrizione portali subfornitura B2B', costo_mensile:30, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Configuratore', cosa:'Preventivatore online per lavorazioni standard', costo_mensile:200, costo_setup:2500, tempo_mesi:2 },
      '4': { chi:'Portale B2B', cosa:'Portale ordini ricorrenti per clienti esistenti', costo_mensile:400, costo_setup:3000, tempo_mesi:3 },
      '5': { chi:'Integrazione digitale', cosa:'Integrazione ordini con ERP clienti principali', costo_mensile:700, costo_setup:6000, tempo_mesi:4 },
      _label: 'Canale digitale B2B',
    }
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
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Capo officina gestisce quotidiano', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Ruoli progettazione/produzione separati', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'KPI + project management', costo_mensile:500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management tecnico + commerciale', costo_mensile:1500, costo_setup:2000, tempo_mesi:5 },
      _label: 'Organizzazione',
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
      '1': { chi:'Nessuno', cosa:'Nessuna presenza digitale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Portali B2B automazione e impiantistica', costo_mensile:30, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Configuratore', cosa:'Configuratore base per quadri standard e componenti', costo_mensile:250, costo_setup:3500, tempo_mesi:2 },
      '4': { chi:'E-commerce ricambi', cosa:'E-commerce ricambi e componenti per clienti esistenti', costo_mensile:500, costo_setup:4000, tempo_mesi:3 },
      '5': { chi:'Piattaforma integrata', cosa:'Portale clienti — ordini ricorrenti, documentazione, assistenza', costo_mensile:900, costo_setup:8000, tempo_mesi:4 },
      _label: 'Canale digitale B2B',
    }
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
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Ruoli telaio/finissaggio definiti', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Resp. tecnico sviluppo tessuti', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Consulente', cosa:'KPI produzione + qualità', costo_mensile:400, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Management', cosa:'Management produzione/commerciale', costo_mensile:1500, costo_setup:2000, tempo_mesi:5 },
      _label: 'Organizzazione',
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
      '1': { chi:'Titolare', cosa:'Acquisto filato dal solito fornitore — nessuna diversificazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Mappatura fornitori alternativi — confronto prezzi e qualità', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Buyer part-time', cosa:'3-4 fornitori attivi con accordi di prezzo stagionali', costo_mensile:500, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Buyer dedicato', cosa:'Buyer dedicato — negoziazione volumi, stoccaggio strategico', costo_mensile:2000, costo_setup:500, tempo_mesi:3 },
      '5': { chi:'Resp. acquisti', cosa:'Strategia acquisti strutturata — hedging, contratti quadro, import', costo_mensile:3500, costo_setup:1500, tempo_mesi:4 },
      _label: 'Approvvigionamento filati',
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
      '2': {
        cosa: 'Proposta proattiva verso HR e resp. formazione aziende zona',
        tempo_mesi: 1,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: '1 commerciale dedicato — sviluppo clienti corporate e enti',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:2500, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1375, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1125, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Team vendite — corporate + PA/bandi + catalogo',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2000, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1100, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1000, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:750, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Rete segnalatori + partnership consulenti',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:3500, costo_setup:2000, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1925, costo_setup:2000, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1575, costo_setup:2000, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — corsi venduti a richiesta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con aziende contattate, proposte inviate, follow-up',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:100, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'CRM per pipeline corporate e scadenze fondi interprofessionali',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'CRM base', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:300, impatto:0.8 }
        ]
      },
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
      '1': { chi:'Titolare', cosa:'Titolare fa tutto — nessuna organizzazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Catalogo corsi strutturato con programmi definiti',
        tempo_mesi: 1,
        moduli: [
          { id:'organizzazione', nome:'Catalogo corsi strutturato con programmi definiti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Coordinamento rete formatori freelance',
        tempo_mesi: 2,
        moduli: [
          { id:'organizzazione', nome:'Coordinamento rete formatori freelance', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'KPI per formatore + pianificazione didattica',
        tempo_mesi: 3,
        moduli: [
          { id:'organizzazione', nome:'KPI per formatore + pianificazione didattica', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Governance didattica — titolare solo strategia',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'manager',
            nome: 'Figura manageriale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Direttore academy dipendente', costo_mensile:1500, costo_setup:2000, impatto:1, note:'Full-time' },
              { id:'fractional', nome:'Direttore academy fractional', costo_mensile:750, costo_setup:2000, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          }
        ]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni corso è improvvisato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Catalogo corsi standard con programmi e durate definite',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Catalogo corsi standard con programmi e durate definite', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Processo iscrizione + materiali + valutazione apprendimento',
        tempo_mesi: 2,
        moduli: [
          { id:'processo', nome:'Processo iscrizione + materiali + valutazione apprendimento', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:800, impatto:0.8 }
        ]
      },
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
      '2': {
        cosa: 'Pacchetti formativi annuali per aziende — ricavo prevedibile',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Pacchetti formativi annuali per aziende', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Formazione finanziata — fondi interprofessionali come leva',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Formazione finanziata',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:600, costo_setup:1000, impatto:1, note:'Formazione finanziata — fondi interprofessionali come leva' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:300, costo_setup:500, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
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
      '2': {
        cosa: 'LinkedIn personale del titolare con post su temi formativi',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'LinkedIn personale del titolare con post su temi formativi', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Webinar gratuiti come lead generation + newsletter',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Webinar gratuiti come lead generation + newsletter', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:500, impatto:0.8 }
        ]
      },
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
      '2': {
        cosa: 'Sito con catalogo corsi, formatori, testimonianze',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito con catalogo corsi, formatori, testimonianze', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:1200, impatto:0.8 }
        ]
      },
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
      '2': {
        cosa: 'Rete di 3-5 formatori freelance con tariffe concordate',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Rete di 3-5 formatori freelance con tariffe concordate', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Accordi con enti certificatori + materiali didattici licenziati',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Accordi con enti certificatori + materiali didattici licenziati', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:500, impatto:0.8 }
        ]
      },
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
      '2': {
        cosa: 'Rapporti con geometri e architetti della zona',
        tempo_mesi: 1,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:150, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Preventivi professionali + sopralluoghi proattivi',
        tempo_mesi: 2,
        moduli: [
          { id:'supporto', nome:'Titolare strutturato', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: '1 commerciale condomini/studi tecnici/enti',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:2500, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1375, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1125, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Gare pubbliche SOA + rete segnalatori',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:3000, costo_setup:2000, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1650, costo_setup:2000, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1350, costo_setup:2000, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — preventivi fatti e dimenticati', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con preventivi aperti, sopralluoghi fatti, follow-up',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:100, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'CRM per gestire preventivi, cantieri e referenze clienti',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'CRM base', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:200, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'CRM + gestionale cantieri — margini, avanzamento, SAL',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM + gestionale cantieri', costo_mensile:300, costo_setup:1200, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:150, costo_setup:720, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP edile — preventivazione, contabilità cantiere, fatturazione',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP edile', costo_mensile:600, costo_setup:3000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:300, costo_setup:1800, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Titolare', cosa:'Titolare sempre in cantiere — decide tutto al momento', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Capo cantiere gestisce — il titolare esce dal cantiere',
        tempo_mesi: 1,
        moduli: [
          { id:'organizzazione', nome:'Capo cantiere gestisce', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Ruoli definiti cantiere/ufficio — deleghe operative',
        tempo_mesi: 2,
        moduli: [
          { id:'organizzazione', nome:'Ruoli definiti cantiere/ufficio', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'KPI commessa + processi decisionali delegati',
        tempo_mesi: 3,
        moduli: [
          { id:'organizzazione', nome:'KPI commessa + processi decisionali delegati', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Management — titolare solo strategia e clienti top',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'manager',
            nome: 'Figura manageriale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Manager operativo dipendente', costo_mensile:1500, costo_setup:1500, impatto:1, note:'Full-time' },
              { id:'fractional', nome:'Manager operativo fractional', costo_mensile:750, costo_setup:1500, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          }
        ]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni cantiere è diverso', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Computo metrico standard + template preventivo professionale',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Computo metrico standard + template preventivo professionale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Gestionale cantiere — pianificazione lavori e controllo costi',
        tempo_mesi: 2,
        moduli: [
          { id:'processo', nome:'Gestionale cantiere', tipo:'flag', obbligatorio:true, costo_mensile:250, costo_setup:1000, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Gestione bonus fiscali — pratiche, asseverazioni, cessioni',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Gestione bonus fiscali',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:500, costo_setup:1500, impatto:1, note:'Gestione bonus fiscali — pratiche, asseverazioni, cessioni' },
              { id:'base', nome:'Soluzione base', costo_mensile:250, costo_setup:750, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'SOA + certificazioni + sistema qualità cantiere',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'SOA',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:1000, costo_setup:6000, impatto:1, note:'SOA + certificazioni + sistema qualità cantiere' },
              { id:'base', nome:'Soluzione base', costo_mensile:500, costo_setup:3000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzi al ribasso per prendere i lavori — margini minimi', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Calcolo costi reali per cantiere — materiali, ore, subappalti',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Calcolo costi reali per cantiere', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Preventivi con voci separate — upsell su finiture e varianti',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Preventivi con voci separate', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Contratti manutenzione post-cantiere — ricavo ricorrente',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Contratti manutenzione post-cantiere', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'General contractor — gestione completa con margine su subappalti',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'General contractor',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:600, costo_setup:1000, impatto:1, note:'General contractor — gestione completa con margine su subappalti' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:300, costo_setup:500, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola nel quartiere', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Google My Business con foto cantieri prima/dopo + recensioni',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Google My Business con foto cantieri prima/dopo + recensioni', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Presenza su portali ristrutturazione (Houzz, Habitissimo)',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Presenza su portali ristrutturazione (Houzz, Habitissimo)', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Google Ads locali + campagne social prima/dopo lavori',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Google Ads locali + campagne social prima/dopo lavori', tipo:'flag', obbligatorio:true, costo_mensile:800, costo_setup:1200, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Piano marketing — portfolio, partnership architetti, eventi locali',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:2000, costo_setup:2500, impatto:1, note:'Piano marketing — portfolio, partnership architetti, eventi locali' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:800, costo_setup:1250, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito — solo pagina Facebook', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito con portfolio lavori, servizi e zona operativa',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito con portfolio lavori, servizi e zona operativa', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:800, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Gallery prima/dopo + preventivo online + recensioni',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Gallery prima/dopo',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:250, costo_setup:2000, impatto:1, note:'Gallery prima/dopo + preventivo online + recensioni' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:100, costo_setup:800, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Blog su bonus fiscali e ristrutturazione + SEO locale',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Blog su bonus fiscali e ristrutturazione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:500, costo_setup:1500, impatto:1, note:'Blog su bonus fiscali e ristrutturazione + SEO locale' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:200, costo_setup:600, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Configuratore preventivo online per ristrutturazioni standard',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'Configuratore preventivo online per ristrutturazioni standard',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:800, costo_setup:5000, impatto:1, note:'Configuratore preventivo online per ristrutturazioni standard' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:320, costo_setup:2000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto materiali dal solito magazzino edile — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Confronto prezzi tra 2-3 fornitori per ogni cantiere',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Confronto prezzi tra 2-3 fornitori per ogni cantiere', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Accordi quadro con fornitori materiali — prezzi riservati',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Accordi quadro con fornitori materiali', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Rete subappaltatori qualificati con tariffe concordate',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Rete subappaltatori qualificati con tariffe concordate', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:500, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — negoziazione volumi, stoccaggio, import diretto',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1500, costo_setup:1000, impatto:1, note:'Resp. acquisti — negoziazione volumi, stoccaggio, import diretto' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:750, costo_setup:400, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento materiali e subappalti',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EDILIZIA IMPIANTI
  // ═══════════════════════════════════════════════════════════════════════════
  edilizia_impianti: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare trova lavori tramite passaparola e imprese', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Rapporti con studi tecnici e amministratori condominio',
        tempo_mesi: 1,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:150, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Preventivi + proposta efficientamento su ogni sopralluogo',
        tempo_mesi: 2,
        moduli: [
          { id:'supporto', nome:'Titolare strutturato', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: '1 commerciale condomini/industria/PA',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:2500, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1375, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1125, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Rete installatori partner + gare pubbliche',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:3000, costo_setup:2000, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1650, costo_setup:2000, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1350, costo_setup:2000, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — chiamate e preventivi a memoria', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con preventivi, impianti installati, scadenze manutenzione',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:100, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'CRM per preventivi + scadenze contratti manutenzione',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'CRM base', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:200, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'CRM + gestionale interventi — programmazione e consuntivo',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM + gestionale interventi', costo_mensile:300, costo_setup:1200, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:150, costo_setup:720, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP impiantistica — preventivi, commesse, magazzino, fatturazione',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP impiantistica', costo_mensile:600, costo_setup:3000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:300, costo_setup:1800, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Titolare', cosa:'Titolare sugli impianti — decide tutto al momento', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Capo squadra gestisce cantieri — titolare si libera',
        tempo_mesi: 1,
        moduli: [
          { id:'organizzazione', nome:'Capo squadra gestisce cantieri', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Ruoli definiti installazione/ufficio',
        tempo_mesi: 2,
        moduli: [
          { id:'organizzazione', nome:'Ruoli definiti installazione/ufficio', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'KPI + programmazione interventi delegata',
        tempo_mesi: 3,
        moduli: [
          { id:'organizzazione', nome:'KPI + programmazione interventi delegata', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Management — deleghe complete',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'manager',
            nome: 'Figura manageriale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Manager operativo dipendente', costo_mensile:1500, costo_setup:1500, impatto:1, note:'Full-time' },
              { id:'fractional', nome:'Manager operativo fractional', costo_mensile:750, costo_setup:1500, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          }
        ]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni impianto è gestito a esperienza', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Scheda impianto standard — specifiche, materiali, tempi, costi',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Scheda impianto standard', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Gestionale interventi con programmazione manutenzioni',
        tempo_mesi: 2,
        moduli: [
          { id:'processo', nome:'Gestionale interventi con programmazione manutenzioni', tipo:'flag', obbligatorio:true, costo_mensile:250, costo_setup:1000, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Certificazioni obbligatorie strutturate (DM 37/08) + sicurezza',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Certificazioni obbligatorie strutturate (DM 37/08)',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:500, costo_setup:1500, impatto:1, note:'Certificazioni obbligatorie strutturate (DM 37/08) + sicurezza' },
              { id:'base', nome:'Soluzione base', costo_mensile:250, costo_setup:750, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ISO 9001 + gestione garanzie + audit qualità impianti',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'ISO 9001',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:1000, costo_setup:5000, impatto:1, note:'ISO 9001 + gestione garanzie + audit qualità impianti' },
              { id:'base', nome:'Soluzione base', costo_mensile:500, costo_setup:2500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Installazione a prezzo fisso — nessun ricavo ricorrente', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Calcolo costi reali — materiali, ore, spostamenti',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Calcolo costi reali', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Contratti manutenzione annuali — caldaie, condizionatori, impianti',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Contratti manutenzione annuali', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Upsell efficientamento energetico + bonus fiscali come leva',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Upsell efficientamento energetico + bonus fiscali come leva', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:500, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Contratti full-service condomini e industria — ricavo garantito',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Contratti full-service condomini e industria',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:800, costo_setup:1500, impatto:1, note:'Contratti full-service condomini e industria — ricavo garantito' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:400, costo_setup:750, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Google My Business + foto impianti realizzati + recensioni',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Google My Business + foto impianti realizzati + recensioni', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Portali locali (PagineGialle, Instapro) + partnership edili',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Portali locali (PagineGialle, Instapro) + partnership edili', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:400, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Google Ads locali su manutenzione e efficientamento',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Google Ads locali su manutenzione e efficientamento', tipo:'flag', obbligatorio:true, costo_mensile:700, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Piano marketing — referenze, partnership costruttori, eventi',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1800, costo_setup:2500, impatto:1, note:'Piano marketing — referenze, partnership costruttori, eventi' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:720, costo_setup:1250, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito — solo pagina social', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito con servizi, zona operativa, foto impianti',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito con servizi, zona operativa, foto impianti', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:800, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Portfolio lavori + preventivo online + recensioni',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Portfolio lavori',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:250, costo_setup:1800, impatto:1, note:'Portfolio lavori + preventivo online + recensioni' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:100, costo_setup:720, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Blog su risparmio energetico e bonus + SEO locale',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Blog su risparmio energetico e bonus',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:450, costo_setup:1500, impatto:1, note:'Blog su risparmio energetico e bonus + SEO locale' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:180, costo_setup:600, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Area clienti — storico impianti, scadenze manutenzione, documenti',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'Area clienti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:750, costo_setup:4000, impatto:1, note:'Area clienti — storico impianti, scadenze manutenzione, documenti' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:300, costo_setup:1600, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto materiali dal grossista di fiducia — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Confronto prezzi tra 2-3 grossisti per ogni commessa',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Confronto prezzi tra 2-3 grossisti per ogni commessa', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Accordi quadro con distributori — prezzi riservati e consegna rapida',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Accordi quadro con distributori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Magazzino materiali ricorrenti + gestione scorte minime',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Magazzino materiali ricorrenti + gestione scorte minime', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:800, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — accordi volume, import diretto, stoccaggio',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1500, costo_setup:1000, impatto:1, note:'Resp. acquisti — accordi volume, import diretto, stoccaggio' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:750, costo_setup:400, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento materiali',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EDILIZIA SERRAMENTI
  // ═══════════════════════════════════════════════════════════════════════════
  edilizia_serramenti: {
    vendite: {
      '1': { chi:'Titolare solo', cosa:'Titolare vende dallo showroom', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sopralluoghi a domicilio + preventivi strutturati',
        tempo_mesi: 1,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:300, impatto:0.8 }
        ]
      },
      '3': {
        cosa: '1 venditore showroom dedicato',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:2200, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1210, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:990, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: '+ commerciale B2B imprese edili e architetti',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:4700, costo_setup:1000, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:2585, costo_setup:1000, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:2115, costo_setup:1000, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Rete posatori partner + gare ristrutturazione',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:3500, costo_setup:2000, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1925, costo_setup:2000, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1575, costo_setup:2000, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — preventivi su carta e dimenticati', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con preventivi, sopralluoghi, stato trattativa',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:100, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'CRM per preventivi + follow-up post-sopralluogo',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'CRM base', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:200, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'CRM + configuratore infissi per preventivi automatici',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM + configuratore infissi per preventivi automatici', costo_mensile:400, costo_setup:2000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:200, costo_setup:1200, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'CRM integrato con gestionale ordini e produzione/fornitori',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM integrato con gestionale ordini e produzione/fornitori', costo_mensile:700, costo_setup:3500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:350, costo_setup:2100, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Titolare', cosa:'Titolare gestisce tutto — showroom e posa', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli showroom/posa separati',
        tempo_mesi: 1,
        moduli: [
          { id:'organizzazione', nome:'Ruoli showroom/posa separati', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Riunioni + obiettivi per ruolo',
        tempo_mesi: 2,
        moduli: [
          { id:'organizzazione', nome:'Riunioni + obiettivi per ruolo', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'KPI + processi decisionali delegati',
        tempo_mesi: 3,
        moduli: [
          { id:'organizzazione', nome:'KPI + processi decisionali delegati', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Management — titolare solo strategia',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'manager',
            nome: 'Figura manageriale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Manager operativo dipendente', costo_mensile:1500, costo_setup:1500, impatto:1, note:'Full-time' },
              { id:'fractional', nome:'Manager operativo fractional', costo_mensile:750, costo_setup:1500, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          }
        ]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — preventivi a mano, posa senza procedura', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Template preventivo con misure, materiali, posa e smaltimento',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Template preventivo con misure, materiali, posa e smaltimento', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Configuratore infissi per preventivi veloci e precisi',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Configuratore infissi per preventivi veloci e precisi',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:300, costo_setup:1500, impatto:1, note:'Configuratore infissi per preventivi veloci e precisi' },
              { id:'base', nome:'Soluzione base', costo_mensile:150, costo_setup:750, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Gestionale ordini — da preventivo a ordine fornitore a posa',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Gestionale ordini',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:500, costo_setup:2000, impatto:1, note:'Gestionale ordini — da preventivo a ordine fornitore a posa' },
              { id:'base', nome:'Soluzione base', costo_mensile:250, costo_setup:1000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Certificazione posa qualificata + gestione garanzie + NPS',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'Certificazione posa qualificata',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:900, costo_setup:4000, impatto:1, note:'Certificazione posa qualificata + gestione garanzie + NPS' },
              { id:'base', nome:'Soluzione base', costo_mensile:450, costo_setup:2000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Vendita infissi con margine base — nessun upsell', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Calcolo margini reali per prodotto — PVC vs alluminio vs legno',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Calcolo margini reali per prodotto', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Upsell sistematico — zanzariere, oscuranti, cassonetti, VMC',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Upsell sistematico', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Bonus fiscali come leva di vendita — gestione pratiche inclusa',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Bonus fiscali come leva di vendita', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:800, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Contratti con imprese edili — fornitura + posa su cantieri',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Contratti con imprese edili',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:800, costo_setup:1500, impatto:1, note:'Contratti con imprese edili — fornitura + posa su cantieri' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:400, costo_setup:750, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo insegna showroom e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Google My Business + foto showroom e lavori realizzati',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Google My Business + foto showroom e lavori realizzati', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Google Ads locali su "infissi + città" + portali casa',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Google Ads locali su "infissi + città" + portali casa', tipo:'flag', obbligatorio:true, costo_mensile:600, costo_setup:800, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Campagne social con prima/dopo + video posa + recensioni',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'marketing',
            nome: 'Campagne social con prima/dopo + video posa + recensioni',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1000, costo_setup:1500, impatto:1, note:'Campagne social con prima/dopo + video posa + recensioni' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:400, costo_setup:750, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piano marketing — eventi showroom, partnership architetti, PR',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:2200, costo_setup:3000, impatto:1, note:'Piano marketing — eventi showroom, partnership architetti, PR' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:880, costo_setup:1500, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito con catalogo infissi, showroom, zona operativa',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito con catalogo infissi, showroom, zona operativa', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:1000, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Gallery lavori + preventivo online + simulatore colori',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Gallery lavori',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:300, costo_setup:2500, impatto:1, note:'Gallery lavori + preventivo online + simulatore colori' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:120, costo_setup:1000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Configuratore infissi online — misure, materiali, prezzo indicativo',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Configuratore infissi online',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:600, costo_setup:5000, impatto:1, note:'Configuratore infissi online — misure, materiali, prezzo indicativo' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:240, costo_setup:2000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'E-commerce accessori + prenotazione sopralluogo + area clienti',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'E-commerce accessori',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:900, costo_setup:6000, impatto:1, note:'E-commerce accessori + prenotazione sopralluogo + area clienti' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:360, costo_setup:2400, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto infissi da un solo produttore — nessuna alternativa', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Confronto tra 2-3 produttori — prezzi e tempi di consegna',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Confronto tra 2-3 produttori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Accordi quadro con produttori — sconti volume e priorità consegna',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Accordi quadro con produttori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Multi-fornitore strutturato — PVC da uno, alluminio da un altro',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Multi-fornitore strutturato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:500, costo_setup:500, impatto:1, note:'Multi-fornitore strutturato — PVC da uno, alluminio da un altro' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:250, costo_setup:200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Partnership produttori + private label + import diretto',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Partnership produttori + private label + import diretto',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1500, costo_setup:1500, impatto:1, note:'Partnership produttori + private label + import diretto' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:750, costo_setup:600, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento infissi',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO DISTRIBUZIONE INDUSTRIALE
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_distribuzione_industriale: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare al banco — chi viene compra', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Visite ai 20 clienti top — sviluppo proattivo',
        tempo_mesi: 1,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: '1 agente plurimandatario con portafoglio industriale zona',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1500, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:825, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:675, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: '1 KAM clienti strategici + 1 inside sales',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:4800, costo_setup:1000, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:2640, costo_setup:1000, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:2160, costo_setup:1000, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Dir. commerciale + agenti + inside sales',
        tempo_mesi: 6,
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
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini a telefono e banco', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con clienti attivi, frequenza ordini, prodotti principali',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:100, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'CRM con alert riordini e follow-up clienti dormienti',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'CRM base', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'CRM integrato con ERP — stock, prezzi, storico in tempo reale',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM integrato con ERP', costo_mensile:500, costo_setup:2000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:250, costo_setup:1200, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP completo — clienti, acquisti, magazzino, logistica',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP completo', costo_mensile:1000, costo_setup:5000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:500, costo_setup:3000, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli banco/magazzino definiti — chi fa cosa è chiaro',
        tempo_mesi: 1,
        moduli: [
          { id:'organizzazione', nome:'Ruoli banco/magazzino definiti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Procedure ordini e consegne formalizzate',
        tempo_mesi: 2,
        moduli: [
          { id:'organizzazione', nome:'Procedure ordini e consegne formalizzate', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'KPI per canale + deleghe operative',
        tempo_mesi: 3,
        moduli: [
          { id:'organizzazione', nome:'KPI per canale + deleghe operative', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Management commerciale + logistica strutturato',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'manager',
            nome: 'Figura manageriale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Management dipendente', costo_mensile:1500, costo_setup:1500, impatto:1, note:'Full-time' },
              { id:'fractional', nome:'Management fractional', costo_mensile:750, costo_setup:1500, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          }
        ]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ordini gestiti a memoria e su carta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Gestione ordini strutturata — conferma, tempi, back order',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Gestione ordini strutturata', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Gestionale magazzino — giacenze, riordino automatico, inventario',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Gestionale magazzino',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:300, costo_setup:1500, impatto:1, note:'Gestionale magazzino — giacenze, riordino automatico, inventario' },
              { id:'base', nome:'Soluzione base', costo_mensile:150, costo_setup:750, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'ERP con gestione listini per cliente e ordini urgenti',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'ERP con gestione listini per cliente e ordini urgenti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:600, costo_setup:3000, impatto:1, note:'ERP con gestione listini per cliente e ordini urgenti' },
              { id:'base', nome:'Soluzione base', costo_mensile:300, costo_setup:1500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'EDI con clienti principali + logistica ottimizzata',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'EDI con clienti principali',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:1000, costo_setup:5000, impatto:1, note:'EDI con clienti principali + logistica ottimizzata' },
              { id:'base', nome:'Soluzione base', costo_mensile:500, costo_setup:2500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine fisso da listino — nessuna differenziazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Pricing differenziato per volume e categoria cliente',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Pricing differenziato per volume e categoria cliente', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Servizi a valore — consegna rapida, magazzino conto deposito',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Servizi a valore', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Accordi fornitura esclusiva con clienti principali',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Accordi fornitura esclusiva con clienti principali', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Kitting, just-in-time, VMI — margini superiori alla distribuzione',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Kitting, just-in-time, VMI',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:700, costo_setup:1500, impatto:1, note:'Kitting, just-in-time, VMI — margini superiori alla distribuzione' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:350, costo_setup:750, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo clienti storici e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Catalogo digitale aggiornato + newsletter mensile ai clienti',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Catalogo digitale aggiornato + newsletter mensile ai clienti', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Fiere industriali locali (MECSPE, BI-MU) — stand base',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Fiere industriali locali (MECSPE, BI-MU)', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:4000, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Campagne LinkedIn su resp. acquisti e produzione industriale',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Campagne LinkedIn su resp. acquisti e produzione industriale', tipo:'flag', obbligatorio:true, costo_mensile:800, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Piano marketing — fiere + digital + catalogo + promozioni',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:2000, costo_setup:2500, impatto:1, note:'Piano marketing — fiere + digital + catalogo + promozioni' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:800, costo_setup:1250, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o sito vetrina datato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito con catalogo prodotti e schede tecniche scaricabili',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito con catalogo prodotti e schede tecniche scaricabili', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:1000, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Area riservata con prezzi, storico ordini, documentazione',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Area riservata con prezzi, storico ordini, documentazione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:350, costo_setup:3000, impatto:1, note:'Area riservata con prezzi, storico ordini, documentazione' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:140, costo_setup:1200, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'E-catalogue con disponibilità stock e tempi di consegna',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'E-catalogue con disponibilità stock e tempi di consegna',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:600, costo_setup:5000, impatto:1, note:'E-catalogue con disponibilità stock e tempi di consegna' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:240, costo_setup:2000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Portale B2B — ordini online, tracking spedizioni, fatturazione',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'Portale B2B',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1200, costo_setup:10000, impatto:1, note:'Portale B2B — ordini online, tracking spedizioni, fatturazione' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:480, costo_setup:4000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 grossisti — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Confronto fornitori sistematico — prezzi, MOQ, tempi consegna',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Confronto fornitori sistematico', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Accordi quadro con produttori — sconti volume e priorità',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Accordi quadro con produttori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Buyer dedicato — negoziazione, import diretto, stoccaggio',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer dedicato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1500, costo_setup:500, impatto:1, note:'Buyer dedicato — negoziazione, import diretto, stoccaggio' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:750, costo_setup:200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — contratti quadro, import, private label',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:3000, costo_setup:1500, impatto:1, note:'Resp. acquisti — contratti quadro, import, private label' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1500, costo_setup:600, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento e fornitori',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO INGROSSO ALIMENTARE
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_ingrosso_alimentare: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare gestisce clienti storici — ordini per telefono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Visite pianificate HORECA/negozi della zona',
        tempo_mesi: 1,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Sviluppo canale HORECA — degustazioni, campionature',
        tempo_mesi: 2,
        moduli: [
          { id:'supporto', nome:'Titolare strutturato', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: '1 agente dedicato HORECA o GDO',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1800, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:990, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:810, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Strategia private label + agenti export',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:3000, costo_setup:2000, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1650, costo_setup:2000, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1350, costo_setup:2000, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini per telefono e WhatsApp', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con clienti, frequenza ordini, prodotti principali',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:100, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'CRM + gestione listini e promozioni per cliente',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'CRM base', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Gestionale ordini con route planning consegne',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Gestionale ordini con route planning consegne', costo_mensile:500, costo_setup:2000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:250, costo_setup:1200, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP alimentare — ordini, magazzino, tracciabilità, logistica',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP alimentare', costo_mensile:1200, costo_setup:6000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:600, costo_setup:3600, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli magazzino/consegne definiti — chi fa cosa è chiaro',
        tempo_mesi: 1,
        moduli: [
          { id:'organizzazione', nome:'Ruoli magazzino/consegne definiti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Procedure HACCP + gestione scadenze formalizzate',
        tempo_mesi: 2,
        moduli: [
          { id:'organizzazione', nome:'Procedure HACCP + gestione scadenze formalizzate', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'KPI + deleghe ordini/logistica',
        tempo_mesi: 3,
        moduli: [
          { id:'organizzazione', nome:'KPI + deleghe ordini/logistica', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Management completo — commerciale + logistica + qualità',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'manager',
            nome: 'Figura manageriale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Management dipendente', costo_mensile:1500, costo_setup:1500, impatto:1, note:'Full-time' },
              { id:'fractional', nome:'Management fractional', costo_mensile:750, costo_setup:1500, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          }
        ]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ordini e consegne gestiti a vista', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Tracciabilità lotti base + gestione scadenze prodotti',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Tracciabilità lotti base + gestione scadenze prodotti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'HACCP strutturato + gestionale magazzino con lotti e scadenze',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'HACCP strutturato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:400, costo_setup:1500, impatto:1, note:'HACCP strutturato + gestionale magazzino con lotti e scadenze' },
              { id:'base', nome:'Soluzione base', costo_mensile:200, costo_setup:750, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Gestione catena del freddo certificata + logistica ottimizzata',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'processo',
            nome: 'Gestione catena del freddo certificata',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:700, costo_setup:2500, impatto:1, note:'Gestione catena del freddo certificata + logistica ottimizzata' },
              { id:'base', nome:'Soluzione base', costo_mensile:350, costo_setup:1250, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Certificazioni BRC/IFS + audit interni + sistema qualità',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'Certificazioni BRC/IFS',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:1200, costo_setup:6000, impatto:1, note:'Certificazioni BRC/IFS + audit interni + sistema qualità' },
              { id:'base', nome:'Soluzione base', costo_mensile:600, costo_setup:3000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine fisso da listino — nessun upsell', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Pricing per canale — HORECA, GDO, dettaglio differenziati',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Pricing per canale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Promozioni settimanali + prodotti stagionali ad alto margine',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Promozioni settimanali + prodotti stagionali ad alto margine', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Private label per GDO locale — margini 15-20% superiori',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Private label per GDO locale', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Contratti annuali GDO + sviluppo linee premium e bio',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Contratti annuali GDO + sviluppo linee premium e bio',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1000, costo_setup:2000, impatto:1, note:'Contratti annuali GDO + sviluppo linee premium e bio' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:500, costo_setup:1000, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo relazione diretta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Catalogo digitale + listino aggiornato via WhatsApp/email',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Catalogo digitale + listino aggiornato via WhatsApp/email', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Fiere alimentari (Cibus, TuttoFood) — stand e degustazione',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Fiere alimentari (Cibus, TuttoFood)', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:5000, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Campagne digitali verso buyer GDO e HORECA',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Campagne digitali verso buyer GDO e HORECA', tipo:'flag', obbligatorio:true, costo_mensile:800, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Piano marketing — fiere + catalogo + promozioni + PR settore',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:2200, costo_setup:3000, impatto:1, note:'Piano marketing — fiere + catalogo + promozioni + PR settore' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:880, costo_setup:1500, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito con catalogo prodotti, certificazioni, zona servita',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito con catalogo prodotti, certificazioni, zona servita', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:1000, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Catalogo online con prezzi riservati per cliente registrato',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Catalogo online con prezzi riservati per cliente registrato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:300, costo_setup:2500, impatto:1, note:'Catalogo online con prezzi riservati per cliente registrato' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:120, costo_setup:1000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Ordini online B2B + disponibilità stock in tempo reale',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Ordini online B2B',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:700, costo_setup:5000, impatto:1, note:'Ordini online B2B + disponibilità stock in tempo reale' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:280, costo_setup:2000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma B2B completa — ordini, tracking, fatturazione',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma B2B completa',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1200, costo_setup:10000, impatto:1, note:'Piattaforma B2B completa — ordini, tracking, fatturazione' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:480, costo_setup:4000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto da produttori locali abituali — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Diversificazione fornitori — confronto prezzi e qualità',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Diversificazione fornitori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Accordi quadro con produttori — volumi, prezzi stagionali',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Accordi quadro con produttori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Buyer dedicato — negoziazione, import, gestione catena freddo',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer dedicato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1800, costo_setup:500, impatto:1, note:'Buyer dedicato — negoziazione, import, gestione catena freddo' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:900, costo_setup:200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — contratti annuali, sourcing internazionale',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:3500, costo_setup:1500, impatto:1, note:'Resp. acquisti — contratti annuali, sourcing internazionale' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1750, costo_setup:600, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento prodotti',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO MATERIALI EDILI
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_materiali_edili: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare al banco — chi viene compra', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Visite imprese edili/posatori della zona',
        tempo_mesi: 1,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Sviluppo showroom — appuntamenti privati',
        tempo_mesi: 2,
        moduli: [
          { id:'supporto', nome:'Titolare strutturato', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: '1 agente esterno imprese/cantieri',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1800, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:990, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:810, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Gare pubbliche + accordi quadro costruttori',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:3000, costo_setup:2000, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1650, costo_setup:2000, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1350, costo_setup:2000, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — vendite al banco senza storico', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con clienti principali, frequenza acquisti, volumi',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:100, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'CRM per follow-up preventivi e gestione clienti imprese',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'CRM base', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'CRM + gestionale magazzino — stock, prezzi, listini cliente',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM + gestionale magazzino', costo_mensile:500, costo_setup:2000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:250, costo_setup:1200, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP — ordini, magazzino, logistica consegne, fatturazione',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP', costo_mensile:1000, costo_setup:5000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:500, costo_setup:3000, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli banco/magazzino/showroom definiti — chi fa cosa è chiaro',
        tempo_mesi: 1,
        moduli: [
          { id:'organizzazione', nome:'Ruoli banco/magazzino/showroom definiti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Procedure ordini e consegne formalizzate',
        tempo_mesi: 2,
        moduli: [
          { id:'organizzazione', nome:'Procedure ordini e consegne formalizzate', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'KPI + deleghe operative',
        tempo_mesi: 3,
        moduli: [
          { id:'organizzazione', nome:'KPI + deleghe operative', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Management commerciale + logistica strutturato',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'manager',
            nome: 'Figura manageriale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Management dipendente', costo_mensile:1500, costo_setup:1500, impatto:1, note:'Full-time' },
              { id:'fractional', nome:'Management fractional', costo_mensile:750, costo_setup:1500, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          }
        ]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — magazzino gestito a vista', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Gestione ordini strutturata — conferma, tempi consegna',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Gestione ordini strutturata', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Gestionale magazzino — giacenze, riordino, inventario',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Gestionale magazzino',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:300, costo_setup:1500, impatto:1, note:'Gestionale magazzino — giacenze, riordino, inventario' },
              { id:'base', nome:'Soluzione base', costo_mensile:150, costo_setup:750, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Logistica consegne ottimizzata — route planning, mezzi',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Logistica consegne ottimizzata',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:600, costo_setup:2500, impatto:1, note:'Logistica consegne ottimizzata — route planning, mezzi' },
              { id:'base', nome:'Soluzione base', costo_mensile:300, costo_setup:1250, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP integrato + gestione showroom + consegne pianificate',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'ERP integrato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:1000, costo_setup:5000, impatto:1, note:'ERP integrato + gestione showroom + consegne pianificate' },
              { id:'base', nome:'Soluzione base', costo_mensile:500, costo_setup:2500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine fisso da listino fornitore — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Pricing differenziato — imprese vs privati vs cantieri',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Pricing differenziato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Upsell showroom — finiture, accessori, posa consigliata',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Upsell showroom', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Servizio consegna in cantiere come voce a margine',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Servizio consegna in cantiere come voce a margine', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Contratti quadro con costruttori + private label su linee base',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Contratti quadro con costruttori + private label su linee base',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:700, costo_setup:1500, impatto:1, note:'Contratti quadro con costruttori + private label su linee base' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:350, costo_setup:750, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo posizione e insegna', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Google My Business + foto showroom e magazzino',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Google My Business + foto showroom e magazzino', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Google Ads locali su "materiali edili + città"',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Google Ads locali su "materiali edili + città"', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:800, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Campagne social con progetti realizzati + promozioni stagionali',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Campagne social con progetti realizzati + promozioni stagionali', tipo:'flag', obbligatorio:true, costo_mensile:900, costo_setup:1500, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Piano marketing — eventi showroom, partnership progettisti',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:2000, costo_setup:2500, impatto:1, note:'Piano marketing — eventi showroom, partnership progettisti' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:800, costo_setup:1250, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito con catalogo prodotti, showroom, zona consegna',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito con catalogo prodotti, showroom, zona consegna', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:1000, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Catalogo ceramiche online + richiesta preventivo',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Catalogo ceramiche online',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:300, costo_setup:2500, impatto:1, note:'Catalogo ceramiche online + richiesta preventivo' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:120, costo_setup:1000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Simulatore ambienti + disponibilità stock online',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Simulatore ambienti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:600, costo_setup:5000, impatto:1, note:'Simulatore ambienti + disponibilità stock online' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:240, costo_setup:2000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Portale B2B — ordini imprese, listini riservati, tracking',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'Portale B2B',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1000, costo_setup:8000, impatto:1, note:'Portale B2B — ordini imprese, listini riservati, tracking' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:400, costo_setup:3200, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 produttori abituali — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Confronto fornitori su prodotti principali — prezzi e tempi',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Confronto fornitori su prodotti principali', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Accordi quadro con produttori ceramiche e cemento',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Accordi quadro con produttori ceramiche e cemento', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Buyer dedicato — diversificazione fornitori, import diretto',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer dedicato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1500, costo_setup:500, impatto:1, note:'Buyer dedicato — diversificazione fornitori, import diretto' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:750, costo_setup:200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — contratti volume, stoccaggio strategico',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:3000, costo_setup:1500, impatto:1, note:'Resp. acquisti — contratti volume, stoccaggio strategico' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1500, costo_setup:600, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento materiali',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO RICAMBI AUTO
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_ricambi_auto: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare al banco — officine vengono quando serve', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Visite officine/carrozzerie della zona',
        tempo_mesi: 1,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Sviluppo flotte e noleggiatori — contratti fornitura',
        tempo_mesi: 2,
        moduli: [
          { id:'supporto', nome:'Titolare strutturato', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: '1 agente officine fuori zona',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1800, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:990, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:810, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'E-commerce ricambi + reti officine',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:3000, costo_setup:2000, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1650, costo_setup:2000, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1350, costo_setup:2000, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — vendite al banco e telefono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con officine clienti, frequenza e volumi acquisto',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:100, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Gestionale con catalogo TecDoc integrato per ricerca rapida',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Gestionale con catalogo TecDoc integrato per ricerca rapida', costo_mensile:200, costo_setup:800, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:100, costo_setup:480, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM + gestionale — storico cliente, margini, alert riordini',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM + gestionale', costo_mensile:500, costo_setup:2000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:250, costo_setup:1200, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP ricambi — ordini, magazzino, TecDoc, logistica, fatturazione',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP ricambi', costo_mensile:1000, costo_setup:5000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:500, costo_setup:3000, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli banco/magazzino/consegne definiti',
        tempo_mesi: 1,
        moduli: [
          { id:'organizzazione', nome:'Ruoli banco/magazzino/consegne definiti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Procedure ordini urgenti formalizzate',
        tempo_mesi: 2,
        moduli: [
          { id:'organizzazione', nome:'Procedure ordini urgenti formalizzate', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'KPI evasione ordini + tempi consegna',
        tempo_mesi: 3,
        moduli: [
          { id:'organizzazione', nome:'KPI evasione ordini + tempi consegna', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Management + ottimizzazione logistica',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'manager',
            nome: 'Figura manageriale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Management dipendente', costo_mensile:1500, costo_setup:1500, impatto:1, note:'Full-time' },
              { id:'fractional', nome:'Management fractional', costo_mensile:750, costo_setup:1500, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          }
        ]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ricerca manuale su cataloghi cartacei', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Catalogo elettronico TecDoc per ricerca per targa/VIN',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Catalogo elettronico TecDoc per ricerca per targa/VIN', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:300, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Gestionale magazzino con giacenze e riordino automatico',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Gestionale magazzino con giacenze e riordino automatico',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:300, costo_setup:1500, impatto:1, note:'Gestionale magazzino con giacenze e riordino automatico' },
              { id:'base', nome:'Soluzione base', costo_mensile:150, costo_setup:750, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Logistica consegne ottimizzata — route planning, tracking',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Logistica consegne ottimizzata',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:500, costo_setup:2000, impatto:1, note:'Logistica consegne ottimizzata — route planning, tracking' },
              { id:'base', nome:'Soluzione base', costo_mensile:250, costo_setup:1000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP integrato + gestione resi + garanzie ricambi',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'processo',
            nome: 'ERP integrato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:900, costo_setup:4000, impatto:1, note:'ERP integrato + gestione resi + garanzie ricambi' },
              { id:'base', nome:'Soluzione base', costo_mensile:450, costo_setup:2000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine da listino — nessuna differenziazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Pricing differenziato — officine abituali vs occasionali',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Pricing differenziato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Upsell prodotti correlati — filtri, olio, pastiglie in kit',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Upsell prodotti correlati', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Contratti fornitura con officine — sconti volume, fidelizzazione',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Contratti fornitura con officine', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Private label consumabili + revenue da consegna express',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Private label consumabili + revenue da consegna express',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:700, costo_setup:1500, impatto:1, note:'Private label consumabili + revenue da consegna express' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:350, costo_setup:750, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo posizione e insegna', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Google My Business + WhatsApp Business per ordini rapidi',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Google My Business + WhatsApp Business per ordini rapidi', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Google Ads locali su "ricambi auto + città"',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Google Ads locali su "ricambi auto + città"', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:800, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Promozioni mirate per officine — volantini, offerte stagionali',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Promozioni mirate per officine', tipo:'flag', obbligatorio:true, costo_mensile:800, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Piano marketing — digitale + partnership reti officine + eventi',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:2000, costo_setup:2500, impatto:1, note:'Piano marketing — digitale + partnership reti officine + eventi' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:800, costo_setup:1250, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito con catalogo marchi trattati, zona consegna, contatti',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito con catalogo marchi trattati, zona consegna, contatti', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:800, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Ricerca ricambi online per targa/VIN + preventivo',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Ricerca ricambi online per targa/VIN',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:350, costo_setup:3000, impatto:1, note:'Ricerca ricambi online per targa/VIN + preventivo' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:140, costo_setup:1200, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'E-commerce ricambi B2B — ordini online con listini officina',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'E-commerce ricambi B2B',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:800, costo_setup:6000, impatto:1, note:'E-commerce ricambi B2B — ordini online con listini officina' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:320, costo_setup:2400, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma completa — ordini, tracking, resi, fatturazione',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma completa',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1500, costo_setup:12000, impatto:1, note:'Piattaforma completa — ordini, tracking, resi, fatturazione' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:600, costo_setup:4800, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 distributori abituali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Confronto prezzi tra distributori (Rhiag, LKQ, Autodis)',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Confronto prezzi tra distributori (Rhiag, LKQ, Autodis)', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Accordi quadro con 3-4 distributori — sconti e priorità',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Accordi quadro con 3-4 distributori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Buyer dedicato — ottimizzazione stock, import aftermarket',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer dedicato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1500, costo_setup:500, impatto:1, note:'Buyer dedicato — ottimizzazione stock, import aftermarket' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:750, costo_setup:200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — contratti quadro, private label, import Asia',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:3000, costo_setup:1500, impatto:1, note:'Resp. acquisti — contratti quadro, private label, import Asia' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1500, costo_setup:600, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento ricambi',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO ABBIGLIAMENTO INGROSSO
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_abbigliamento_ingrosso: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare vende direttamente — showroom e fiere', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Campionario stagionale proattivo ai buyer',
        tempo_mesi: 1,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:500, impatto:0.8 }
        ]
      },
      '3': {
        cosa: '1 agente con portafoglio zona',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1500, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:825, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:675, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: '2-3 agenti per zona — copertura regionale',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:4000, costo_setup:1000, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:2200, costo_setup:1000, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1800, costo_setup:1000, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Rete agenti + showroom permanente',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2800, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1540, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1400, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1050, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini su carta e telefono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con clienti, ordini stagionali e pagamenti',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'CRM con anagrafica buyer, storico ordini, preferenze',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM con anagrafica buyer, storico ordini, preferenze', costo_mensile:300, costo_setup:500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:150, costo_setup:300, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM integrato con gestionale ordini e magazzino',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM integrato con gestionale ordini e magazzino', costo_mensile:600, costo_setup:1500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:300, costo_setup:900, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP fashion — ordini, campionario, spedizioni, fatturazione',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP fashion', costo_mensile:1200, costo_setup:4000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:600, costo_setup:2400, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Pianificazione campagne vendita stagionali',
        tempo_mesi: 1,
        moduli: [
          { id:'organizzazione', nome:'Pianificazione campagne vendita stagionali', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Ruoli magazzino/spedizioni formalizzati',
        tempo_mesi: 2,
        moduli: [
          { id:'organizzazione', nome:'Ruoli magazzino/spedizioni formalizzati', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'KPI per agente + obiettivi stagione',
        tempo_mesi: 3,
        moduli: [
          { id:'organizzazione', nome:'KPI per agente + obiettivi stagione', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Management coordinamento rete agenti',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'manager',
            nome: 'Figura manageriale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Management dipendente', costo_mensile:1500, costo_setup:1500, impatto:1, note:'Full-time' },
              { id:'fractional', nome:'Management fractional', costo_mensile:750, costo_setup:1500, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          }
        ]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ordini gestiti a voce e su carta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Catalogo digitale PDF + listino prezzi strutturato',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Catalogo digitale PDF + listino prezzi strutturato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Gestionale ordini con conferma automatica e tracking',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Gestionale ordini con conferma automatica e tracking',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:300, costo_setup:1000, impatto:1, note:'Gestionale ordini con conferma automatica e tracking' },
              { id:'base', nome:'Soluzione base', costo_mensile:150, costo_setup:500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Campionario digitale + ordini agenti su tablet in showroom',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Campionario digitale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:500, costo_setup:2000, impatto:1, note:'Campionario digitale + ordini agenti su tablet in showroom' },
              { id:'base', nome:'Soluzione base', costo_mensile:250, costo_setup:1000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP completo — ordini, magazzino, spedizioni, resi automatici',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'processo',
            nome: 'ERP completo',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:900, costo_setup:4000, impatto:1, note:'ERP completo — ordini, magazzino, spedizioni, resi automatici' },
              { id:'base', nome:'Soluzione base', costo_mensile:450, costo_setup:2000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine fisso su listino — nessuna strategia pricing', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sconti volume differenziati per fasce ordine',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Sconti volume differenziati per fasce ordine', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Linea pronto moda con margini superiori per riordini rapidi',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Linea pronto moda con margini superiori per riordini rapidi', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Mix prodotto ottimizzato — campionario, pronto, fine serie',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Mix prodotto ottimizzato', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Private label + accordi GDO + dynamic pricing per stagione',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Private label + accordi GDO + dynamic pricing per stagione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:800, costo_setup:2000, impatto:1, note:'Private label + accordi GDO + dynamic pricing per stagione' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:400, costo_setup:1000, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo fiere e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Profilo Instagram B2B con foto collezioni',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Profilo Instagram B2B con foto collezioni', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Social professionale + partecipazione fiere settore',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Social professionale + partecipazione fiere settore', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:2000, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Lookbook digitale + campagne email per buyer + eventi showroom',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'marketing',
            nome: 'Lookbook digitale + campagne email per buyer + eventi showroom',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1000, costo_setup:2500, impatto:1, note:'Lookbook digitale + campagne email per buyer + eventi showroom' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:400, costo_setup:1250, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piano marketing B2B — brand positioning, PR, fiere internazionali',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing B2B',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:2500, costo_setup:5000, impatto:1, note:'Piano marketing B2B — brand positioning, PR, fiere internazionali' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:1000, costo_setup:2500, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina vetrina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito vetrina con collezioni, showroom, contatti',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito vetrina con collezioni, showroom, contatti', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:800, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Catalogo online con lookbook e richiesta campionario',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Catalogo online con lookbook e richiesta campionario',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:300, costo_setup:2500, impatto:1, note:'Catalogo online con lookbook e richiesta campionario' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:120, costo_setup:1000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Portale B2B con ordini online, listini riservati, disponibilità',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'Portale B2B con ordini online, listini riservati, disponibilità',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:700, costo_setup:5000, impatto:1, note:'Portale B2B con ordini online, listini riservati, disponibilità' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:280, costo_setup:2000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma wholesale — preordini, riassortimenti, tracking',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma wholesale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1300, costo_setup:10000, impatto:1, note:'Piattaforma wholesale — preordini, riassortimenti, tracking' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:520, costo_setup:4000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 fornitori abituali a fiera', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Scouting fornitori a fiere — confronto prezzi e MOQ',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Scouting fornitori a fiere', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Buyer dedicato — sourcing Italia e Turchia, campionature',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer dedicato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1500, costo_setup:500, impatto:1, note:'Buyer dedicato — sourcing Italia e Turchia, campionature' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:750, costo_setup:200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Import diretto — Cina, Bangladesh — controllo qualità',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'canale',
            nome: 'Import diretto',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:2500, costo_setup:2000, impatto:1, note:'Import diretto — Cina, Bangladesh — controllo qualità' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1250, costo_setup:800, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — diversificazione fornitori, private label',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:3500, costo_setup:3000, impatto:1, note:'Resp. acquisti — diversificazione fornitori, private label' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1750, costo_setup:1200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento collezioni',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO ELETTRONICA
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_elettronica: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare/banco — vendita diretta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Inside sales telefonico — sviluppo clienti business',
        tempo_mesi: 1,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: '1 inside sales dedicato — gestione ordini e sviluppo',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:2000, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1100, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:900, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: '1 account + 1 inside sales',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:4500, costo_setup:1000, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:2475, costo_setup:1000, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:2025, costo_setup:1000, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Team vendite strutturato — multicanale',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:3000, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1650, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1500, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1125, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — tutto a memoria e scontrini', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con clienti business, preventivi e follow-up',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'CRM con lead B2B, preventivi, storico acquisti',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM con lead B2B, preventivi, storico acquisti', costo_mensile:300, costo_setup:500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:150, costo_setup:300, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM integrato con magazzino e listini distributori',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM integrato con magazzino e listini distributori', costo_mensile:600, costo_setup:1500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:300, costo_setup:900, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP completo — ordini, stock, pricing, margini real-time',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP completo', costo_mensile:1200, costo_setup:5000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:600, costo_setup:3000, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli vendita/magazzino definiti — chi fa cosa è chiaro',
        tempo_mesi: 1,
        moduli: [
          { id:'organizzazione', nome:'Ruoli vendita/magazzino definiti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Procedure pricing e stock formalizzate',
        tempo_mesi: 2,
        moduli: [
          { id:'organizzazione', nome:'Procedure pricing e stock formalizzate', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'KPI margini + rotazione — deleghe operative',
        tempo_mesi: 3,
        moduli: [
          { id:'organizzazione', nome:'KPI margini + rotazione', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Management + analisi dati vendita strutturato',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'manager',
            nome: 'Figura manageriale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Management dipendente', costo_mensile:1500, costo_setup:1500, impatto:1, note:'Full-time' },
              { id:'fractional', nome:'Management fractional', costo_mensile:750, costo_setup:1500, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          }
        ]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — preventivi manuali su carta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Preventivi con template + consultazione listini digitali',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Preventivi con template + consultazione listini digitali', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Gestionale con listini aggiornati e margini automatici',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Gestionale con listini aggiornati e margini automatici',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:300, costo_setup:1000, impatto:1, note:'Gestionale con listini aggiornati e margini automatici' },
              { id:'base', nome:'Soluzione base', costo_mensile:150, costo_setup:500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Ordini automatici a distributore al raggiungimento scorta minima',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Ordini automatici a distributore al raggiungimento scorta minima',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:500, costo_setup:2000, impatto:1, note:'Ordini automatici a distributore al raggiungimento scorta minima' },
              { id:'base', nome:'Soluzione base', costo_mensile:250, costo_setup:1000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP con BI per analisi margini, rotazione, trend vendite',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'processo',
            nome: 'ERP con BI per analisi margini, rotazione, trend vendite',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:900, costo_setup:4000, impatto:1, note:'ERP con BI per analisi margini, rotazione, trend vendite' },
              { id:'base', nome:'Soluzione base', costo_mensile:450, costo_setup:2000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine da listino distributore — nessun pricing attivo', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Pricing differenziato — privati vs business vs PA',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Pricing differenziato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Servizi installazione, configurazione e assistenza a margine',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Servizi installazione, configurazione e assistenza a margine', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Contratti assistenza annuali + estensioni garanzia',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Contratti assistenza annuali + estensioni garanzia', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Bundle HW+SW+servizi, noleggio operativo, ricavi ricorrenti',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Bundle HW+SW+servizi, noleggio operativo, ricavi ricorrenti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:700, costo_setup:1500, impatto:1, note:'Bundle HW+SW+servizi, noleggio operativo, ricavi ricorrenti' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:350, costo_setup:750, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo posizione e insegna', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Google My Business + volantini offerte settimanali',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Google My Business + volantini offerte settimanali', tipo:'flag', obbligatorio:true, costo_mensile:150, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Google Ads + comparatori prezzi (Trovaprezzi, Idealo)',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Google Ads + comparatori prezzi (Trovaprezzi, Idealo)', tipo:'flag', obbligatorio:true, costo_mensile:600, costo_setup:1000, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Newsletter offerte B2B + promozioni stagionali + social',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'marketing',
            nome: 'Newsletter offerte B2B + promozioni stagionali + social',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1000, costo_setup:1500, impatto:1, note:'Newsletter offerte B2B + promozioni stagionali + social' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:400, costo_setup:750, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piano marketing omnicanale — brand, partnership vendor, eventi',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing omnicanale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:2500, costo_setup:4000, impatto:1, note:'Piano marketing omnicanale — brand, partnership vendor, eventi' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:1000, costo_setup:2000, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito vetrina con catalogo prodotti e contatti',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito vetrina con catalogo prodotti e contatti', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:800, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'E-commerce con catalogo, prezzi, carrello e pagamento',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'E-commerce con catalogo, prezzi, carrello e pagamento',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:400, costo_setup:3000, impatto:1, note:'E-commerce con catalogo, prezzi, carrello e pagamento' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:160, costo_setup:1200, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'E-commerce con comparazione, recensioni, stock real-time',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'E-commerce con comparazione, recensioni, stock real-time',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:800, costo_setup:6000, impatto:1, note:'E-commerce con comparazione, recensioni, stock real-time' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:320, costo_setup:2400, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma integrata — B2C, B2B, marketplace, click&collect',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma integrata',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1500, costo_setup:12000, impatto:1, note:'Piattaforma integrata — B2C, B2B, marketplace, click&collect' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:600, costo_setup:4800, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto da 1 distributore abituale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Confronto prezzi tra 2-3 distributori (Esprinet, Ingram, TD)',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Confronto prezzi tra 2-3 distributori (Esprinet, Ingram, TD)', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Accordi quadro con distributori — rebate e priorità consegna',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Accordi quadro con distributori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Buyer dedicato — ottimizzazione acquisti, drop-shipping',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer dedicato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1500, costo_setup:500, impatto:1, note:'Buyer dedicato — ottimizzazione acquisti, drop-shipping' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:750, costo_setup:200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — import diretto, accordi vendor, stock strategy',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:3000, costo_setup:1500, impatto:1, note:'Resp. acquisti — import diretto, accordi vendor, stock strategy' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1500, costo_setup:600, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento e distribuzione',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO ABBIGLIAMENTO DETTAGLIO
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_abbigliamento_dettaglio: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Solo titolare in negozio', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: '1 commesso/a part-time per coprire turni e weekend',
        tempo_mesi: 1,
        moduli: [
          { id:'supporto', nome:'+ 1 commesso/a PT', tipo:'flag', obbligatorio:true, costo_mensile:1000, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: '1 commesso/a full-time — vendita assistita',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1700, costo_setup:300, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:935, costo_setup:300, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:765, costo_setup:300, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: '2 commessi + visual merchandiser',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:4000, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:2200, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1800, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Store manager + team vendita strutturato',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2600, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1430, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1300, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:975, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — vendite solo da scontrini', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Registro clienti abituali con preferenze e taglie',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'CRM retail con fidelity card e storico acquisti',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM retail con fidelity card e storico acquisti', costo_mensile:200, costo_setup:500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:100, costo_setup:300, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM integrato con email/SMS per promozioni mirate',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM integrato con email/SMS per promozioni mirate', costo_mensile:400, costo_setup:1000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:200, costo_setup:600, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'CRM omnicanale — negozio, web, social con vista unica cliente',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM omnicanale', costo_mensile:800, costo_setup:3000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:400, costo_setup:1800, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Turni e ruoli definiti — chi fa cosa è chiaro',
        tempo_mesi: 1,
        moduli: [
          { id:'organizzazione', nome:'Turni e ruoli definiti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Obiettivi vendita per persona definiti',
        tempo_mesi: 2,
        moduli: [
          { id:'organizzazione', nome:'Obiettivi vendita per persona definiti', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'KPI negozio + deleghe operative',
        tempo_mesi: 3,
        moduli: [
          { id:'organizzazione', nome:'KPI negozio + deleghe operative', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Governance multi-punto vendita',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'manager',
            nome: 'Figura manageriale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Management dipendente', costo_mensile:1500, costo_setup:1500, impatto:1, note:'Full-time' },
              { id:'fractional', nome:'Management fractional', costo_mensile:750, costo_setup:1500, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          }
        ]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — tutto a sensazione ed esperienza', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Gestione cassa con POS e scontrini elettronici',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Gestione cassa con POS e scontrini elettronici', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Gestionale retail — vendite, giacenze, riordini',
        tempo_mesi: 2,
        moduli: [
          { id:'processo', nome:'Gestionale retail', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:800, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Procedure accoglienza, visual, cambio merce, fidelizzazione',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Procedure accoglienza, visual, cambio merce, fidelizzazione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:300, costo_setup:1000, impatto:1, note:'Procedure accoglienza, visual, cambio merce, fidelizzazione' },
              { id:'base', nome:'Soluzione base', costo_mensile:150, costo_setup:500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Sistema completo — KPI per m², rotazione, sell-through rate',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'processo',
            nome: 'Sistema completo',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:600, costo_setup:2000, impatto:1, note:'Sistema completo — KPI per m², rotazione, sell-through rate' },
              { id:'base', nome:'Soluzione base', costo_mensile:300, costo_setup:1000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine da ricarico standard — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Saldi pianificati e gestione fine serie per liberare cassa',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Saldi pianificati e gestione fine serie per liberare cassa', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Upsell accessori + cross-selling outfit completi',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Upsell accessori + cross-selling outfit completi', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Programma fedeltà con sconti progressivi e anteprime',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Programma fedeltà con sconti progressivi e anteprime', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Dynamic pricing stagionale + private label + eventi esclusivi',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Dynamic pricing stagionale + private label + eventi esclusivi',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:600, costo_setup:1500, impatto:1, note:'Dynamic pricing stagionale + private label + eventi esclusivi' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:300, costo_setup:750, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo vetrina e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Instagram con foto outfit e nuovi arrivi settimanali',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Instagram con foto outfit e nuovi arrivi settimanali', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Instagram + Facebook Ads + micro-influencer locali',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Instagram + Facebook Ads + micro-influencer locali', tipo:'flag', obbligatorio:true, costo_mensile:600, costo_setup:1000, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Agenzia social + eventi in-store + collaborazioni brand',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'marketing',
            nome: 'Agenzia social + eventi in-store + collaborazioni brand',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1200, costo_setup:2000, impatto:1, note:'Agenzia social + eventi in-store + collaborazioni brand' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:480, costo_setup:1000, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piano marketing — brand identity, PR, eventi, community',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:2800, costo_setup:4000, impatto:1, note:'Piano marketing — brand identity, PR, eventi, community' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:1120, costo_setup:2000, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito — solo social media', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito vetrina con brand, collezioni e orari negozio',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito vetrina con brand, collezioni e orari negozio', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:800, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'E-commerce con catalogo, taglie, pagamento online',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'E-commerce con catalogo, taglie, pagamento online',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:300, costo_setup:2500, impatto:1, note:'E-commerce con catalogo, taglie, pagamento online' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:120, costo_setup:1000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'E-commerce con outfit suggeriti, wishlist, reso facile',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'E-commerce con outfit suggeriti, wishlist, reso facile',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:600, costo_setup:5000, impatto:1, note:'E-commerce con outfit suggeriti, wishlist, reso facile' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:240, costo_setup:2000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma integrata — stock unico negozio/web, click&collect',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma integrata',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1200, costo_setup:10000, impatto:1, note:'Piattaforma integrata — stock unico negozio/web, click&collect' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:480, costo_setup:4000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto da rappresentanti di zona in showroom', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Scouting brand a fiere (Pitti, MICAM, White)',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Scouting brand a fiere (Pitti, MICAM, White)', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Buyer esterno — selezione brand e pianificazione budget acquisti',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer esterno',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:800, costo_setup:500, impatto:1, note:'Buyer esterno — selezione brand e pianificazione budget acquisti' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:400, costo_setup:200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Acquisti campionario + riassortimenti pronto moda in stagione',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Acquisti campionario + riassortimenti pronto moda in stagione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1500, costo_setup:1000, impatto:1, note:'Acquisti campionario + riassortimenti pronto moda in stagione' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:750, costo_setup:400, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — mix brand, private label, import diretto',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:2800, costo_setup:2000, impatto:1, note:'Resp. acquisti — mix brand, private label, import diretto' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1400, costo_setup:800, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento collezioni',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMERCIO OROLOGI GIOIELLI
  // ═══════════════════════════════════════════════════════════════════════════
  commercio_orologi_gioielli: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Solo titolare in boutique', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: '1 addetto clienteling — accoglienza e follow-up',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:2200, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1210, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:990, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '3': {
        cosa: '2 addetti vendita specializzati — gemmologia e luxury',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:4500, costo_setup:1000, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:2475, costo_setup:1000, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:2025, costo_setup:1000, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Team vendita + gemmologa dedicata',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2800, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1540, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1400, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1050, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Store manager + team clienteling VIP',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:4000, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:2200, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:2000, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1500, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — clienti a memoria e rubrica', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Rubrica clienti con ricorrenze, gusti e storico acquisti',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'CRM con profilo clienti, anniversari, wish list',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM con profilo clienti, anniversari, wish list', costo_mensile:300, costo_setup:800, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:150, costo_setup:480, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM con automazioni — auguri, inviti eventi, nuove collezioni',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM con automazioni', costo_mensile:500, costo_setup:1500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:250, costo_setup:900, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma clienteling completa — 360° vista cliente luxury',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Piattaforma clienteling completa', costo_mensile:1000, costo_setup:4000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:500, costo_setup:2400, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Titolare', cosa:'Nessuna organizzazione — il titolare decide tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Procedure accoglienza e clienteling definite',
        tempo_mesi: 1,
        moduli: [
          { id:'organizzazione', nome:'Procedure accoglienza e clienteling definite', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'CRM clienti VIP + follow-up strutturato',
        tempo_mesi: 2,
        moduli: [
          { id:'organizzazione', nome:'CRM clienti VIP + follow-up strutturato', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'KPI per addetto + obiettivi vendita',
        tempo_mesi: 3,
        moduli: [
          { id:'organizzazione', nome:'KPI per addetto + obiettivi vendita', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Governance + gestione eventi trunk show',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'manager',
            nome: 'Figura manageriale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Management dipendente', costo_mensile:1500, costo_setup:2000, impatto:1, note:'Full-time' },
              { id:'fractional', nome:'Management fractional', costo_mensile:750, costo_setup:2000, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          }
        ]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — esperienza e relazione personale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Registro pezzi con certificati e garanzie digitalizzati',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Registro pezzi con certificati e garanzie digitalizzati', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Gestionale con inventario, certificati, perizie, riparazioni',
        tempo_mesi: 2,
        moduli: [
          { id:'processo', nome:'Gestionale con inventario, certificati, perizie, riparazioni', tipo:'flag', obbligatorio:true, costo_mensile:250, costo_setup:1000, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Processo di vendita luxury — accoglienza, storytelling, packaging',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Processo di vendita luxury',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:300, costo_setup:1500, impatto:1, note:'Processo di vendita luxury — accoglienza, storytelling, packaging' },
              { id:'base', nome:'Soluzione base', costo_mensile:150, costo_setup:750, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'KPI boutique — conversion rate, scontrino medio, clienti VIP',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'processo',
            nome: 'KPI boutique',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:600, costo_setup:2500, impatto:1, note:'KPI boutique — conversion rate, scontrino medio, clienti VIP' },
              { id:'base', nome:'Soluzione base', costo_mensile:300, costo_setup:1250, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Margine tradizionale da ricarico — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Servizi aggiuntivi — incisioni, packaging regalo, pulizia',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Servizi aggiuntivi', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Upsell gioielli su misura + servizio riparazione e restyling',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Upsell gioielli su misura + servizio riparazione e restyling', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Programma VIP — anteprime, eventi privati, sconti anniversario',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Programma VIP', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:1000, impatto:0.8 }
        ]
      },
      '5': {
        cosa: 'Mix ricavi — vendita, riparazione, usato certificato, eventi',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Mix ricavi',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:700, costo_setup:2000, impatto:1, note:'Mix ricavi — vendita, riparazione, usato certificato, eventi' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:350, costo_setup:1000, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo vetrina e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Instagram con foto gioielli e storytelling artigianale',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Instagram con foto gioielli e storytelling artigianale', tipo:'flag', obbligatorio:true, costo_mensile:150, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Social curato + PR locale + collaborazioni wedding planner',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Social curato + PR locale + collaborazioni wedding planner', tipo:'flag', obbligatorio:true, costo_mensile:700, costo_setup:1500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: 'Agenzia specializzata luxury — shooting, video, influencer',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'marketing',
            nome: 'Agenzia specializzata luxury',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1500, costo_setup:3000, impatto:1, note:'Agenzia specializzata luxury — shooting, video, influencer' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:600, costo_setup:1500, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piano marketing luxury — brand awareness, eventi esclusivi, PR',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing luxury',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:3000, costo_setup:5000, impatto:1, note:'Piano marketing luxury — brand awareness, eventi esclusivi, PR' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:1200, costo_setup:2500, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito vetrina elegante con collezioni e contatti boutique',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito vetrina elegante con collezioni e contatti boutique',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:100, costo_setup:1500, impatto:1, note:'Sito vetrina elegante con collezioni e contatti boutique' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:40, costo_setup:600, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '3': {
        cosa: 'Sito con catalogo dettagliato, certificati, prenotazione visita',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito con catalogo dettagliato, certificati, prenotazione visita',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:400, costo_setup:4000, impatto:1, note:'Sito con catalogo dettagliato, certificati, prenotazione visita' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:160, costo_setup:1600, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'E-commerce luxury con foto HD, zoom, certificati, reso assicurato',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'E-commerce luxury con foto HD, zoom, certificati, reso assicurato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:800, costo_setup:8000, impatto:1, note:'E-commerce luxury con foto HD, zoom, certificati, reso assicurato' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:320, costo_setup:3200, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma integrata — e-commerce, CRM, stock unico, wish list',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma integrata',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1500, costo_setup:15000, impatto:1, note:'Piattaforma integrata — e-commerce, CRM, stock unico, wish list' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:600, costo_setup:6000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto da 1-2 rappresentanti brand abituali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Scouting brand a fiere (VicenzaOro, Baselworld)',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Scouting brand a fiere (VicenzaOro, Baselworld)', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:800, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'Buyer dedicato — selezione pietre, fornitori orafi, brand',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer dedicato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1200, costo_setup:500, impatto:1, note:'Buyer dedicato — selezione pietre, fornitori orafi, brand' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:600, costo_setup:200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Import pietre diretto + laboratorio orafo per pezzi unici',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'canale',
            nome: 'Import pietre diretto + laboratorio orafo per pezzi unici',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:2500, costo_setup:2000, impatto:1, note:'Import pietre diretto + laboratorio orafo per pezzi unici' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1250, costo_setup:800, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — accordi brand, pietre certificate, private label',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:3500, costo_setup:3000, impatto:1, note:'Resp. acquisti — accordi brand, pietre certificate, private label' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1750, costo_setup:1200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento e fornitori',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE TRASFORMAZIONE
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_trasformazione: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare gestisce clienti storici', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Visite a buyer GDO e HORECA',
        tempo_mesi: 2,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: '1 agente dedicato GDO o HORECA (~2.500€ fisso+provvigioni)',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:2500, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1375, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1125, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: '2 agenti per canale + inside sales (~2.800€ commerciale)',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2400, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1320, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1200, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:900, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Dir. commerciale + rete agenti + export',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:3600, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1980, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1800, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1350, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini su carta e telefono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con clienti, ordini e scadenze pagamenti',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: 'CRM con buyer GDO, contratti annuali, promo pianificate',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM con buyer GDO, contratti annuali, promo pianificate', costo_mensile:400, costo_setup:800, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:200, costo_setup:480, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM integrato con gestionale produzione e logistica',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM integrato con gestionale produzione e logistica', costo_mensile:800, costo_setup:2000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:400, costo_setup:1200, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP food completo — ordini, produzione, lotti, tracciabilità',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP food completo', costo_mensile:1500, costo_setup:6000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:750, costo_setup:3600, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli produzione/qualità/vendita definiti',
        tempo_mesi: 1,
        moduli: [
      {
            id: 'ruoli',
            nome: 'Organigramma produzione + commerciale',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 200,
            impatto: 0.7,
            note: 'Chi produce, chi controlla qualità, chi vende — mansionario'
      }
,
{
        id: 'sicurezza',
        nome: 'Formazione sicurezza alimentare base',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'HACCP base per tutti i dipendenti'
}
      ]
      },
      '3': {
        cosa: 'Resp. produzione + pianificazione settimanale',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'resp_prod',
            nome: 'Responsabile produzione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'promozione',
                        nome: 'Promozione interna operaio senior',
                        costo_mensile: 200,
                        costo_setup: 500,
                        impatto: 0.85,
                        note: 'Già conosce processi e macchinari'
                  },
                  {
                        id: 'esterno',
                        nome: 'Resp. produzione esterno',
                        costo_mensile: 2500,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Esperienza da altro stabilimento food'
                  }
            ]
      }
]
      },
      '4': {
        cosa: 'KPI produzione + resp. qualità autonomo',
        tempo_mesi: 3,
        moduli: [
      {
            id: 'kpi',
            nome: 'Sistema KPI stabilimento',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.5,
            note: 'Resa produttiva, scarti, tempi, costi per lotto'
      },
      {
            id: 'qualita',
            nome: 'Responsabile qualità dedicato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'interno',
                        nome: 'Addetto qualità interno formato',
                        costo_mensile: 200,
                        costo_setup: 500,
                        impatto: 0.3,
                        note: 'Formazione HACCP avanzata + delega'
                  },
                  {
                        id: 'consulente',
                        nome: 'Consulente qualità esterno',
                        costo_mensile: 400,
                        costo_setup: 0,
                        impatto: 0.4,
                        note: 'Visite periodiche, audit, aggiornamento'
                  }
            ]
      }
]
      },
      '5': {
        cosa: 'Management completo — titolare solo strategia',
        tempo_mesi: 4,
        moduli: [
      {
            id: 'manager',
            nome: 'Direttore stabilimento',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'Direttore stabilimento dipendente',
                        costo_mensile: 3500,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Produzione + qualità + personale + logistica'
                  },
                  {
                        id: 'fractional',
                        nome: 'Plant manager fractional',
                        costo_mensile: 1500,
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
      '1': { chi:'Titolare', cosa:'Processi artigianali — nessuna formalizzazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'HACCP strutturato + schede prodotto e allergeni',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'HACCP strutturato + schede prodotto e allergeni', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'allergeni',
        nome: 'Gestione allergeni e contaminazioni',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Procedure cross-contamination, etichettatura allergeni'
}
      ]
      },
      '3': {
        cosa: 'Gestionale produzione con lotti, scadenze e tracciabilità',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Gestionale produzione con lotti, scadenze e tracciabilità',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:400, costo_setup:2000, impatto:1, note:'Gestionale produzione con lotti, scadenze e tracciabilità' },
              { id:'base', nome:'Soluzione base', costo_mensile:200, costo_setup:1000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Certificazione BRC/IFS — processi qualità per accesso GDO',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'Certificazione BRC/IFS',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:600, costo_setup:5000, impatto:1, note:'Certificazione BRC/IFS — processi qualità per accesso GDO' },
              { id:'base', nome:'Soluzione base', costo_mensile:300, costo_setup:2500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP produzione + automazione linee + BI per efficienza',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'ERP produzione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:1200, costo_setup:8000, impatto:1, note:'ERP produzione + automazione linee + BI per efficienza' },
              { id:'base', nome:'Soluzione base', costo_mensile:600, costo_setup:4000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo basato su costo + margine fisso — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Pricing differenziato — GDO vs HORECA vs dettaglio',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Pricing differenziato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'analisi_margini',
        nome: 'Analisi margini per prodotto/canale',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Quale prodotto guadagna di più, quale canale rende meglio'
}
      ]
      },
      '3': {
        cosa: 'Linea premium + linea standard — segmentazione margini',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'premium',
            nome: 'Linea premium/artigianale',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.5,
            note: 'Packaging premium, ingredienti selezionati — margine 2x'
      },
      {
            id: 'standard',
            nome: 'Linea standard/GDO',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 0,
            impatto: 0.3,
            note: 'Volume, pricing competitivo, margine base'
      }
]
      },
      '4': {
        cosa: 'Private label per GDO + brand proprio posizionato',
        tempo_mesi: 3,
        moduli: [
      {
            id: 'private_label',
            nome: 'Produzione private label GDO',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'copacker',
                        nome: 'Copacking per insegne GDO',
                        costo_mensile: 200,
                        costo_setup: 1000,
                        impatto: 0.7,
                        note: 'Produci con marchio del supermercato — volume garantito'
                  },
                  {
                        id: 'brand',
                        nome: 'Brand proprio per GDO',
                        costo_mensile: 300,
                        costo_setup: 1500,
                        impatto: 1,
                        note: 'Listing fee + promozioni, ma margine e brand tuoi'
                  }
            ]
      }
]
      },
      '5': {
        cosa: 'Mix ricavi ottimizzato — brand, PL, export, DTC, co-packing',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Mix ricavi ottimizzato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:800, costo_setup:2500, impatto:1, note:'Mix ricavi ottimizzato — brand, PL, export, DTC, co-packing' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:400, costo_setup:1250, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo etichetta e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Social con foto prodotti + partecipazione fiere food',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Social con foto prodotti + partecipazione fiere food', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'packaging_comm',
        nome: 'Packaging come strumento di marketing',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Restyling etichette, storytelling su confezione — il pack vende'
}
      ]
      },
      '3': {
        cosa: 'Branding professionale + fiere (Cibus, TuttoFood, SIAL)',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Branding professionale + fiere (Cibus, TuttoFood, SIAL)', tipo:'flag', obbligatorio:true, costo_mensile:800, costo_setup:3000, impatto:0.8 }
        ,
{
        id: 'degustazioni',
        nome: 'Degustazioni in-store/fiere come lead gen',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 200,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Far assaggiare il prodotto — conversion altissima nel food'
}
      ]
      },
      '4': {
        cosa: 'Trade marketing GDO + social content + PR food blogger',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'marketing',
            nome: 'Trade marketing GDO + social content + PR food blogger',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1500, costo_setup:4000, impatto:1, note:'Trade marketing GDO + social content + PR food blogger' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:600, costo_setup:2000, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piano marketing — brand building, trade, digital, export promo',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:3000, costo_setup:6000, impatto:1, note:'Piano marketing — brand building, trade, digital, export promo' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:1200, costo_setup:3000, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina vetrina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito vetrina con storia, prodotti, certificazioni',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito vetrina con storia, prodotti, certificazioni', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:1000, impatto:0.8 }
        ,
{
        id: 'social_link',
        nome: 'Link a social e Google My Business',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.1,
        note: 'Integrazione con profili social esistenti'
}
      ]
      },
      '3': {
        cosa: 'Sito con catalogo prodotti, schede tecniche, contatti buyer',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito con catalogo prodotti, schede tecniche, contatti buyer',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:300, costo_setup:2500, impatto:1, note:'Sito con catalogo prodotti, schede tecniche, contatti buyer' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:120, costo_setup:1000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'E-commerce DTC per vendita diretta + area riservata buyer',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'E-commerce DTC per vendita diretta',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:600, costo_setup:5000, impatto:1, note:'E-commerce DTC per vendita diretta + area riservata buyer' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:240, costo_setup:2000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma B2B/DTC integrata con ERP, ordini e tracciabilità',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma B2B/DTC integrata con ERP, ordini e tracciabilità',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1200, costo_setup:10000, impatto:1, note:'Piattaforma B2B/DTC integrata con ERP, ordini e tracciabilità' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:480, costo_setup:4000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto materie prime da 1-2 fornitori locali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Confronto fornitori — qualità, prezzi, tempi di consegna',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Confronto fornitori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'qualita_mp',
        nome: 'Controllo qualità materie prime in ingresso',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Analisi a campione su ogni lotto — no sorprese in produzione'
}
      ]
      },
      '3': {
        cosa: 'Contratti quadro con fornitori — prezzi bloccati e volumi',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Contratti quadro con fornitori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'filiera_corta',
        nome: 'Sourcing filiera corta/km0',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Fornitori locali per storytelling + freschezza + sostenibilità'
}
      ]
      },
      '4': {
        cosa: 'Buyer dedicato — diversificazione fornitori, import materie prime',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer dedicato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:2000, costo_setup:800, impatto:1, note:'Buyer dedicato — diversificazione fornitori, import materie prime' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1000, costo_setup:320, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — contratti annuali, hedging prezzi, filiera corta',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:3500, costo_setup:2000, impatto:1, note:'Resp. acquisti — contratti annuali, hedging prezzi, filiera corta' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1750, costo_setup:800, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento materie prime',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE VINI
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_vini: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare vende in cantina', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Visite enoteche e ristoranti zona',
        tempo_mesi: 2,
        moduli: [
          { id:'supporto', nome:'Titolare + agente', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: '1 agente HORECA/enoteche (~2.000€)',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:2000, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1100, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:900, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Agente + export manager (~3.000€)',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2000, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1100, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1000, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:750, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Dir. commerciale + agenti + wine club',
        tempo_mesi: 6,
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
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini a voce e WhatsApp', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con clienti, ordini per etichetta e pagamenti',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'agenda_buyer',
        nome: 'Agenda contatti buyer/importatori',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Database ristoranti, enoteche, importatori con note preferenze'
}
      ]
      },
      '3': {
        cosa: 'CRM con ristoranti, enoteche, importatori e preferenze',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM con ristoranti, enoteche, importatori e preferenze', costo_mensile:300, costo_setup:500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:150, costo_setup:300, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM integrato con gestionale cantina e magazzino vini',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM integrato con gestionale cantina e magazzino vini', costo_mensile:600, costo_setup:1500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:300, costo_setup:900, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP vitivinicolo — vigna, cantina, vendite, compliance, export',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP vitivinicolo', costo_mensile:1200, costo_setup:5000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:600, costo_setup:3000, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli cantina/vendita/enoturismo definiti',
        tempo_mesi: 1,
        moduli: [
      {
            id: 'ruoli',
            nome: 'Organigramma cantina',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 200,
            impatto: 0.7,
            note: 'Chi fa cantina, chi vende, chi accoglie in cantina'
      }
,
{
        id: 'accoglienza',
        nome: 'Standard accoglienza visitatori cantina',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'Come accogliere, cosa far assaggiare, come vendere'
}
      ]
      },
      '3': {
        cosa: 'Enologo consulente + pianificazione vendemmia/produzione',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'enologo',
            nome: 'Supporto enologico',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'consulente',
                        nome: 'Enologo consulente esterno',
                        costo_mensile: 300,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Vinificazione, blend, qualità — visite periodiche'
                  },
                  {
                        id: 'interno',
                        nome: 'Cantiniere formato con delega',
                        costo_mensile: 200,
                        costo_setup: 500,
                        impatto: 0.7,
                        note: 'Formazione enologica base, segue le indicazioni'
                  }
            ]
      }
]
      },
      '4': {
        cosa: 'KPI cantina + gestione qualità DOC/DOCG',
        tempo_mesi: 3,
        moduli: [
      {
            id: 'kpi',
            nome: 'KPI produzione e qualità',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.5,
            note: 'Resa per ettaro, costi per bottiglia, qualità per annata'
      },
      {
            id: 'doc',
            nome: 'Gestione disciplinare DOC/DOCG',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.3,
            note: 'Rispetto disciplinare, documentazione, controlli'
      },
      {
            id: 'consulente',
            nome: 'Consulente gestione cantina',
            tipo: 'flag',
            obbligatorio: false,
            costo_mensile: 400,
            costo_setup: 0,
            impatto: 0.2
      }
]
      },
      '5': {
        cosa: 'Governance enologo + commerciale strutturata',
        tempo_mesi: 4,
        moduli: [
      {
            id: 'manager',
            nome: 'Direttore di cantina',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'Direttore cantina dipendente',
                        costo_mensile: 3000,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Produzione + commerciale + enoturismo + qualità'
                  },
                  {
                        id: 'fractional',
                        nome: 'Wine manager fractional',
                        costo_mensile: 1500,
                        costo_setup: 0,
                        impatto: 0.65,
                        note: '2-3 giorni/settimana + vendemmia'
                  }
            ]
      }
]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Processi artigianali — nessuna formalizzazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Schede tecniche vini + gestione lotti e annate',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Schede tecniche vini + gestione lotti e annate', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:300, impatto:0.8 }
        ,
{
        id: 'registro_cantina',
        nome: 'Registro cantina digitale (lotti, analisi)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Registro vinificazione, analisi, travasi — obbligatorio ICQRF'
}
      ]
      },
      '3': {
        cosa: 'Gestionale cantina — vinificazione, imbottigliamento, lotti',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Gestionale cantina',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:300, costo_setup:1500, impatto:1, note:'Gestionale cantina — vinificazione, imbottigliamento, lotti' },
              { id:'base', nome:'Soluzione base', costo_mensile:150, costo_setup:750, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Documentazione export — accise, certificati, compliance DOC/DOCG',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'processo',
            nome: 'Documentazione export',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:500, costo_setup:2000, impatto:1, note:'Documentazione export — accise, certificati, compliance DOC/DOCG' },
              { id:'base', nome:'Soluzione base', costo_mensile:250, costo_setup:1000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP completo — vigna-to-glass, tracciabilità, analisi costi',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'ERP completo',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:1000, costo_setup:5000, impatto:1, note:'ERP completo — vigna-to-glass, tracciabilità, analisi costi' },
              { id:'base', nome:'Soluzione base', costo_mensile:500, costo_setup:2500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo a bottiglia fisso — nessuna segmentazione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Pricing differenziato — cantina, HORECA, enoteca, export',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Pricing differenziato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'prezzi_canale',
        nome: 'Listino per canale (cantina, HORECA, export)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Prezzo diverso per vendita diretta, ristorante, importatore'
}
      ]
      },
      '3': {
        cosa: 'Degustazioni a pagamento + esperienze in vigna',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'enoturismo',
            nome: 'Enoturismo strutturato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'base',
                        nome: 'Degustazioni in cantina',
                        costo_mensile: 0,
                        costo_setup: 500,
                        impatto: 0.7,
                        note: '15-25€ a persona, 2-3 degustazioni/giorno'
                  },
                  {
                        id: 'premium',
                        nome: 'Esperienze premium (vigna + pranzo + degustazione)',
                        costo_mensile: 0,
                        costo_setup: 1000,
                        impatto: 1,
                        note: '50-100€ a persona, margine altissimo'
                  }
            ]
      }
]
      },
      '4': {
        cosa: 'Wine club con abbonamento + verticali annate premium',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'wine_club',
            nome: 'Wine club/abbonamento',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'fisico',
                        nome: 'Wine club con spedizione trimestrale',
                        costo_mensile: 100,
                        costo_setup: 500,
                        impatto: 0.7,
                        note: 'Box 3-6 bottiglie/trimestre — ricavo ricorrente, DTC'
                  },
                  {
                        id: 'digitale',
                        nome: 'Membership digitale + accesso prioritario',
                        costo_mensile: 50,
                        costo_setup: 300,
                        impatto: 0.5,
                        note: 'Anteprime, sconti, eventi riservati — fidelizzazione'
                  }
            ]
      },
      {
            id: 'verticali',
            nome: 'Verticali annate premium',
            tipo: 'flag',
            obbligatorio: false,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.2,
            note: 'Selezione annate vecchie — margine altissimo per intenditori'
      }
]
      },
      '5': {
        cosa: 'Mix ricavi — HORECA, export, DTC, enoturismo, eventi privati',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Mix ricavi',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:700, costo_setup:2000, impatto:1, note:'Mix ricavi — HORECA, export, DTC, enoturismo, eventi privati' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:350, costo_setup:1000, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola e guide vini', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Instagram con foto vigna, cantina e degustazioni',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Instagram con foto vigna, cantina e degustazioni', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'wine_press',
        nome: 'Invio campioni a giornalisti/guide vini',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Gambero Rosso, Slow Wine, Veronelli — punteggi = vendite'
}
      ]
      },
      '3': {
        cosa: 'Social curato + PR enogastronomiche + guide (Gambero Rosso)',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Social curato + PR enogastronomiche + guide (Gambero Rosso)', tipo:'flag', obbligatorio:true, costo_mensile:600, costo_setup:2000, impatto:0.8 }
        ,
{
        id: 'enoturismo_mkt',
        nome: 'Promozione enoturismo (portali, TripAdvisor)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 100,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Winedering, Airbnb Experiences, TripAdvisor — turisti in cantina'
}
      ]
      },
      '4': {
        cosa: 'Wine events + fiere (Vinitaly, ProWein) + influencer wine',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'Wine events + fiere (Vinitaly, ProWein) + influencer wine',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1500, costo_setup:5000, impatto:1, note:'Wine events + fiere (Vinitaly, ProWein) + influencer wine' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:600, costo_setup:2500, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piano marketing — brand storytelling, export promo, enoturismo',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:3000, costo_setup:6000, impatto:1, note:'Piano marketing — brand storytelling, export promo, enoturismo' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:1200, costo_setup:3000, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito vetrina con storia, vini, contatti cantina',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito vetrina con storia, vini, contatti cantina', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:1000, impatto:0.8 }
        ,
{
        id: 'booking',
        nome: 'Form prenotazione visita/degustazione',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Prenotazione online per enoturismo'
}
      ]
      },
      '3': {
        cosa: 'Sito con catalogo vini, schede tecniche, prenotazione visite',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito con catalogo vini, schede tecniche, prenotazione visite',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:300, costo_setup:2500, impatto:1, note:'Sito con catalogo vini, schede tecniche, prenotazione visite' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:120, costo_setup:1000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'E-commerce DTC — vendita diretta, wine club, gift box',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'E-commerce DTC',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:600, costo_setup:5000, impatto:1, note:'E-commerce DTC — vendita diretta, wine club, gift box' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:240, costo_setup:2000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma DTC + B2B + enoturismo + CRM integrato',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma DTC',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1200, costo_setup:10000, impatto:1, note:'Piattaforma DTC + B2B + enoturismo + CRM integrato' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:480, costo_setup:4000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Vigna propria + acquisto uve da conferitori abituali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Selezione conferitori — analisi uve, contratti annuali',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Selezione conferitori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ,
{
        id: 'analisi_uve',
        nome: 'Analisi qualità uve per fornitore',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'Zuccheri, acidità, stato sanitario — selezione obiettiva'
}
      ]
      },
      '3': {
        cosa: 'Agronomo per vigna + accordi pluriennali conferitori',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Agronomo per vigna + accordi pluriennali conferitori',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:500, costo_setup:500, impatto:1, note:'Agronomo per vigna + accordi pluriennali conferitori' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:250, costo_setup:200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Buyer per acquisto uve selezionate e packaging premium',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer per acquisto uve selezionate e packaging premium',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1500, costo_setup:1000, impatto:1, note:'Buyer per acquisto uve selezionate e packaging premium' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:750, costo_setup:400, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — vigna, uve, packaging, tappi, bottiglie, export',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:3000, costo_setup:2000, impatto:1, note:'Resp. acquisti — vigna, uve, packaging, tappi, bottiglie, export' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1500, costo_setup:800, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento e vigna',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE FORNO
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_forno: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare al banco', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: '1 commesso/a (~1.600€)',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1600, costo_setup:0, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:880, costo_setup:0, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:720, costo_setup:0, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '3': {
        cosa: 'Sviluppo catering e consegne B2B',
        tempo_mesi: 2,
        moduli: [
          { id:'supporto', nome:'Catering + B2B', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:500, impatto:0.8 }
        ]
      },
      '4': {
        cosa: '2 commessi + consegne strutturate',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:3800, costo_setup:1000, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:2090, costo_setup:1000, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1710, costo_setup:1000, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. vendite + team punti vendita',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2400, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1320, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1200, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:900, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — vendite solo dal registratore', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Lista clienti HORECA con ordini ricorrenti',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'registro_B2B',
        nome: 'Lista clienti B2B potenziali (bar, ristoranti, hotel)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Mappatura locali zona per consegne giornaliere'
}
      ]
      },
      '3': {
        cosa: 'Gestionale con ordini, consegne programmate e fatturazione',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Gestionale con ordini, consegne programmate e fatturazione', costo_mensile:200, costo_setup:500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:100, costo_setup:300, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM clienti B2B + gestionale produzione e consegne',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM clienti B2B + gestionale produzione e consegne', costo_mensile:400, costo_setup:1000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:200, costo_setup:600, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP panificazione — ordini, produzione, consegne, margini',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP panificazione', costo_mensile:800, costo_setup:3000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:400, costo_setup:1800, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Turni forno/banco definiti — chi produce chi vende',
        tempo_mesi: 1,
        moduli: [
      {
            id: 'turni',
            nome: 'Organigramma forno + banco',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 200,
            impatto: 0.7,
            note: 'Turni mattina presto (produzione) + mattina/pomeriggio (vendita)'
      }
,
{
        id: 'igiene',
        nome: 'Formazione igiene e sicurezza alimentare',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'HACCP base per tutti — obbligatorio'
}
      ]
      },
      '3': {
        cosa: 'Capo panettiere + procedure produzione standardizzate',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'capo',
            nome: 'Capo panettiere/fornaio',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'promozione',
                        nome: 'Promozione fornaio senior',
                        costo_mensile: 200,
                        costo_setup: 300,
                        impatto: 0.85,
                        note: 'Già conosce ricette e processi'
                  },
                  {
                        id: 'esterno',
                        nome: 'Capo panettiere esperto esterno',
                        costo_mensile: 2500,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Esperienza da altri forni, nuove ricette'
                  }
            ]
      }
]
      },
      '4': {
        cosa: 'KPI produzione + gestione sprechi + pianificazione',
        tempo_mesi: 3,
        moduli: [
      {
            id: 'kpi',
            nome: 'KPI forno (sprechi, resa, costi)',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.5,
            note: 'Spreco pane invenduto, resa per kg farina, costo per pezzo'
      },
      {
            id: 'pianificazione',
            nome: 'Pianificazione produzione giornaliera',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 300,
            impatto: 0.3,
            note: 'Quanti pezzi per tipo basato su storico vendite per giorno'
      }
]
      },
      '5': {
        cosa: 'Management completo — titolare solo strategia e ricette',
        tempo_mesi: 4,
        moduli: [
      {
            id: 'manager',
            nome: 'Store/production manager',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'Responsabile punto vendita dipendente',
                        costo_mensile: 2500,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Gestisce produzione + banco + personale + acquisti'
                  },
                  {
                        id: 'fractional',
                        nome: 'Consulente gestione bakery',
                        costo_mensile: 1000,
                        costo_setup: 0,
                        impatto: 0.6,
                        note: '2 giorni/settimana + setup processi'
                  }
            ]
      }
]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Ricette a memoria — nessun processo standardizzato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ricettario standardizzato + schede HACCP aggiornate',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Ricettario standardizzato + schede HACCP aggiornate', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:300, impatto:0.8 }
        ,
{
        id: 'ricette_standard',
        nome: 'Ricettario standardizzato con grammature',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'Ogni prodotto: ingredienti, grammature, tempi, temperature — replicabile'
}
      ]
      },
      '3': {
        cosa: 'Gestionale produzione — pianificazione impasti, rese, scarti',
        tempo_mesi: 2,
        moduli: [
          { id:'processo', nome:'Gestionale produzione', tipo:'flag', obbligatorio:true, costo_mensile:250, costo_setup:1000, impatto:0.8 }
        ,
{
        id: 'haccp_forno',
        nome: 'HACCP specifico forno artigianale',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Temperature, contaminazione allergeni, pulizia — obbligatorio'
}
      ]
      },
      '4': {
        cosa: 'Impastatrici programmate + porzionatrici + cicli automatici',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Impastatrici programmate',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:400, costo_setup:3000, impatto:1, note:'Impastatrici programmate + porzionatrici + cicli automatici' },
              { id:'base', nome:'Soluzione base', costo_mensile:200, costo_setup:1500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Produzione lean — riduzione sprechi, KPI efficienza, turni',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'processo',
            nome: 'Produzione lean',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:700, costo_setup:4000, impatto:1, note:'Produzione lean — riduzione sprechi, KPI efficienza, turni' },
              { id:'base', nome:'Soluzione base', costo_mensile:350, costo_setup:2000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo al kg tradizionale — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Prodotti speciali a margine superiore (focacce, dolci)',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Prodotti speciali a margine superiore (focacce, dolci)', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'mix_prodotti',
        nome: 'Analisi margine per prodotto (pane vs dolci vs focacce)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'I dolci marginano 3x il pane — sposta il mix'
}
      ]
      },
      '3': {
        cosa: 'Linea artigianale premium — lievito madre, grani antichi',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Linea artigianale premium', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ,
{
        id: 'colazione_business',
        nome: 'Servizio colazione per bar/hotel zona',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Cornetti e brioche consegnati alle 6 — ricavo B2B ricorrente'
}
      ]
      },
      '4': {
        cosa: 'Servizio catering + torte personalizzate + eventi',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Servizio catering + torte personalizzate + eventi', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'catering',
        nome: 'Servizio catering eventi/feste',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Focacce, torte, finger food — margine alto su eventi'
}
      ]
      },
      '5': {
        cosa: 'Mix ricavi — retail, HORECA, GDO confezionato, e-commerce',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Mix ricavi',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:500, costo_setup:1500, impatto:1, note:'Mix ricavi — retail, HORECA, GDO confezionato, e-commerce' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:250, costo_setup:750, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo profumo dal forno e passaparola', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Instagram con foto prodotti freschi e dietro le quinte',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Instagram con foto prodotti freschi e dietro le quinte', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'social_pane',
        nome: 'Foto pane/dolci appena sfornati su Instagram',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Stories mattutine con il pane caldo — appetizing content'
}
      ]
      },
      '3': {
        cosa: 'Social curato + Google Maps + promozioni stagionali',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Social curato + Google Maps + promozioni stagionali', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'local_collab',
        nome: 'Collaborazioni ristoranti/bar zona',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Fornitura pane/focacce a ristoranti — co-marketing'
}
      ]
      },
      '4': {
        cosa: 'Brand identity + packaging professionale + degustazioni',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Brand identity + packaging professionale + degustazioni', tipo:'flag', obbligatorio:true, costo_mensile:800, costo_setup:2000, impatto:0.8 }
        ,
{
        id: 'eventi_forno',
        nome: 'Corsi pane/pizza per clienti',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Workshop → fidelizzazione + social content + passaparola'
}
      ]
      },
      '5': {
        cosa: 'Piano marketing — brand artigianale, PR food, corsi, eventi',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:2000, costo_setup:3500, impatto:1, note:'Piano marketing — brand artigianale, PR food, corsi, eventi' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:800, costo_setup:1750, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito — solo Google Maps', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito vetrina con prodotti, orari, storia del forno',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito vetrina con prodotti, orari, storia del forno', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'orari_online',
        nome: 'Orari e prodotti del giorno online',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Google My Business + social con prodotti freschi del giorno'
}
      ]
      },
      '3': {
        cosa: 'Sito con catalogo prodotti, ordini online per ritiro',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito con catalogo prodotti, ordini online per ritiro',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:200, costo_setup:1500, impatto:1, note:'Sito con catalogo prodotti, ordini online per ritiro' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:80, costo_setup:600, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'E-commerce con consegna locale + ordini personalizzati',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'E-commerce con consegna locale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:400, costo_setup:3000, impatto:1, note:'E-commerce con consegna locale + ordini personalizzati' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:160, costo_setup:1200, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma ordini B2B + DTC + abbonamenti pane fresco',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma ordini B2B',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:800, costo_setup:6000, impatto:1, note:'Piattaforma ordini B2B + DTC + abbonamenti pane fresco' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:320, costo_setup:2400, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto farina dal mulino della zona', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Confronto mulini — qualità farine, prezzi, consegna',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Confronto mulini', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'farine_confronto',
        nome: 'Confronto farine tra 2-3 mulini',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Test farine diverse per W, assorbimento, resa — scegli la migliore'
}
      ]
      },
      '3': {
        cosa: 'Accordi quadro con 2-3 mulini — prezzi bloccati, mix farine',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Accordi quadro con 2-3 mulini', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ,
{
        id: 'accordi_mulino',
        nome: 'Accordo quadro con mulino di fiducia',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Prezzo bloccato, farina riservata, consegna programmata'
}
      ]
      },
      '4': {
        cosa: 'Buyer per farine speciali, lieviti, semilavorati premium',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer per farine speciali, lieviti, semilavorati premium',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:800, costo_setup:300, impatto:1, note:'Buyer per farine speciali, lieviti, semilavorati premium' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:400, costo_setup:120, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — filiera corta, grani antichi, import',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:2000, costo_setup:1000, impatto:1, note:'Resp. acquisti — filiera corta, grani antichi, import' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1000, costo_setup:400, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento farine e ingredienti',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE CONSERVE
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_conserve: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare gestisce GDO', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Visite buyer insegne',
        tempo_mesi: 2,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: '1 agente GDO nazionale (~2.500€)',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:2500, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1375, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1125, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Agente GDO + export (~2.800€)',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2120, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1166, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1060, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:795, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Dir. commerciale + rete + private label',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:3400, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1870, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1700, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1275, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini telefonici e fiere', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con buyer GDO, ordini stagionali, scadenze',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'calendario_listing',
        nome: 'Calendario aperture listing GDO',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Quando ogni insegna apre inserimenti nuovi prodotti'
}
      ]
      },
      '3': {
        cosa: 'CRM con buyer GDO, contratti promo, pianificazione annuale',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM con buyer GDO, contratti promo, pianificazione annuale', costo_mensile:400, costo_setup:800, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:200, costo_setup:480, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM integrato con produzione, stock e logistica',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM integrato con produzione, stock e logistica', costo_mensile:800, costo_setup:2000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:400, costo_setup:1200, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP food — ordini, produzione, lotti, export, tracciabilità',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP food', costo_mensile:1500, costo_setup:6000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:750, costo_setup:3600, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli produzione/qualità/commerciale definiti',
        tempo_mesi: 1,
        moduli: [
      {
            id: 'ruoli',
            nome: 'Organigramma stabilimento',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 200,
            impatto: 0.7,
            note: 'Produzione, confezionamento, qualità, vendite — mansionario'
      }
,
{
        id: 'haccp_base',
        nome: 'Formazione HACCP per tutto il personale',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'Obbligatoria, base per certificazioni successive'
}
      ]
      },
      '3': {
        cosa: 'Resp. produzione + pianificazione stagionale',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'resp',
            nome: 'Responsabile produzione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'promozione',
                        nome: 'Promozione interna operaio senior',
                        costo_mensile: 200,
                        costo_setup: 500,
                        impatto: 0.85,
                        note: 'Conosce le linee e i processi'
                  },
                  {
                        id: 'esterno',
                        nome: 'Resp. produzione conserviero esperto',
                        costo_mensile: 2800,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Esperienza da altro conservificio'
                  }
            ]
      }
]
      },
      '4': {
        cosa: 'KPI + resp. qualità + pianificazione campagne produzione',
        tempo_mesi: 3,
        moduli: [
      {
            id: 'kpi',
            nome: 'KPI stabilimento conserviero',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.5,
            note: 'Resa per lotto, scarti, costi, tempi di confezionamento'
      },
      {
            id: 'qualita',
            nome: 'Responsabile qualità',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'interno',
                        nome: 'Addetto qualità formato HACCP/BRC',
                        costo_mensile: 200,
                        costo_setup: 500,
                        impatto: 0.3,
                        note: 'Controlli, documentazione, audit interni'
                  },
                  {
                        id: 'consulente',
                        nome: 'Consulente qualità food esterno',
                        costo_mensile: 400,
                        costo_setup: 0,
                        impatto: 0.4,
                        note: 'Preparazione BRC/IFS, audit, compliance'
                  }
            ]
      }
]
      },
      '5': {
        cosa: 'Management strutturato — titolare solo strategia',
        tempo_mesi: 4,
        moduli: [
      {
            id: 'manager',
            nome: 'Direttore stabilimento',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'Direttore stabilimento dipendente',
                        costo_mensile: 3500,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Produzione + qualità + logistica + personale'
                  },
                  {
                        id: 'fractional',
                        nome: 'Plant manager fractional',
                        costo_mensile: 1500,
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
      '1': { chi:'Titolare', cosa:'Produzione artigianale — ricette tradizionali non codificate', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'HACCP + etichettatura a norma + schede prodotto',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'HACCP + etichettatura a norma + schede prodotto', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'etichettatura',
        nome: 'Compliance etichettatura (reg. UE 1169)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Ingredienti, allergeni, valori nutrizionali — obbligatorio'
}
      ]
      },
      '3': {
        cosa: 'Gestionale produzione — lotti, scadenze, rese, tracciabilità',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Gestionale produzione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:400, costo_setup:2000, impatto:1, note:'Gestionale produzione — lotti, scadenze, rese, tracciabilità' },
              { id:'base', nome:'Soluzione base', costo_mensile:200, costo_setup:1000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Certificazione BRC/IFS per accesso GDO e export',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'Certificazione BRC/IFS per accesso GDO e export',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:600, costo_setup:5000, impatto:1, note:'Certificazione BRC/IFS per accesso GDO e export' },
              { id:'base', nome:'Soluzione base', costo_mensile:300, costo_setup:2500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP produzione + automazione linee confezionamento',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'ERP produzione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:1200, costo_setup:8000, impatto:1, note:'ERP produzione + automazione linee confezionamento' },
              { id:'base', nome:'Soluzione base', costo_mensile:600, costo_setup:4000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo fisso su listino — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Pricing per canale — GDO vs specialità vs export',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Pricing per canale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'margini_prodotto',
        nome: 'Analisi margine per referenza',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Quale conserva guadagna di più — focus sul mix migliore'
}
      ]
      },
      '3': {
        cosa: 'Produzione private label per GDO + brand proprio premium',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Produzione private label per GDO + brand proprio premium', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'formato_famiglia',
        nome: 'Formato famiglia/HORECA ad alto margine',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Formati grandi per HORECA — margine unitario migliore'
}
      ]
      },
      '4': {
        cosa: 'Linea export premium con packaging dedicato e storytelling',
        tempo_mesi: 3,
        moduli: [
          { id:'ricavi', nome:'Linea export premium con packaging dedicato e storytelling', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:1500, impatto:0.8 }
        ,
{
        id: 'bio_premium',
        nome: 'Linea BIO/DOP premium',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 500,
        impatto: 0.15,
        note: 'Certificazione BIO — margine +30-40% sul convenzionale'
}
      ]
      },
      '5': {
        cosa: 'Mix brand + PL + export + DTC + co-packing stagionale',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Mix brand + PL + export + DTC + co-packing stagionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:800, costo_setup:2500, impatto:1, note:'Mix brand + PL + export + DTC + co-packing stagionale' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:400, costo_setup:1250, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo etichetta tradizionale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Social con ricette, tradizione e territorio',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Social con ricette, tradizione e territorio', tipo:'flag', obbligatorio:true, costo_mensile:150, costo_setup:300, impatto:0.8 }
        ,
{
        id: 'storytelling',
        nome: 'Storytelling prodotto (origine, tradizione)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'La storia dietro il prodotto — differenzia dal marchio bianco'
}
      ]
      },
      '3': {
        cosa: 'Branding professionale + fiere food (Cibus, Fancy Food)',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Branding professionale + fiere food (Cibus, Fancy Food)', tipo:'flag', obbligatorio:true, costo_mensile:700, costo_setup:3000, impatto:0.8 }
        ,
{
        id: 'sampling',
        nome: 'Campagne sampling in-store',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 200,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Degustazione al supermercato — conversion 20-30%'
}
      ]
      },
      '4': {
        cosa: 'Trade marketing GDO + PR food + social content professionale',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'marketing',
            nome: 'Trade marketing GDO + PR food + social content professionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1500, costo_setup:4000, impatto:1, note:'Trade marketing GDO + PR food + social content professionale' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:600, costo_setup:2000, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piano marketing — brand premium, export promo, storytelling',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:3000, costo_setup:6000, impatto:1, note:'Piano marketing — brand premium, export promo, storytelling' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:1200, costo_setup:3000, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito vetrina con storia, prodotti, ricette',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito vetrina con storia, prodotti, ricette', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:1000, impatto:0.8 }
        ,
{
        id: 'ricette',
        nome: 'Sezione ricette con i prodotti',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'Content marketing: come usare le conserve — SEO + engagement'
}
      ]
      },
      '3': {
        cosa: 'Sito con catalogo, schede prodotto, area buyer',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito con catalogo, schede prodotto, area buyer',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:300, costo_setup:2500, impatto:1, note:'Sito con catalogo, schede prodotto, area buyer' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:120, costo_setup:1000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'E-commerce DTC — vendita diretta, box regalo, abbonamenti',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'E-commerce DTC',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:600, costo_setup:5000, impatto:1, note:'E-commerce DTC — vendita diretta, box regalo, abbonamenti' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:240, costo_setup:2000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma B2B + DTC integrata con ERP e tracciabilità',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma B2B',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1200, costo_setup:10000, impatto:1, note:'Piattaforma B2B + DTC integrata con ERP e tracciabilità' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:480, costo_setup:4000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto pomodori e ortaggi da agricoltori locali', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Confronto fornitori — qualità, stagionalità, certificazioni',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Confronto fornitori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'stagionalita',
        nome: 'Pianificazione acquisti per stagionalità',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Pomodori in estate, olive in autunno — stock al momento giusto'
}
      ]
      },
      '3': {
        cosa: 'Contratti con agricoltori — volumi garantiti, prezzo fisso',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Contratti con agricoltori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'km0',
        nome: 'Rete agricoltori locali per km0',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Prodotto locale = storytelling + qualità + prezzo migliore'
}
      ]
      },
      '4': {
        cosa: 'Buyer dedicato — scouting materie prime, import pomodoro',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer dedicato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:2000, costo_setup:800, impatto:1, note:'Buyer dedicato — scouting materie prime, import pomodoro' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1000, costo_setup:320, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — filiera controllata, contratti annuali, hedging',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:3500, costo_setup:2000, impatto:1, note:'Resp. acquisti — filiera controllata, contratti annuali, hedging' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1750, costo_setup:800, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento materie prime',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE INGREDIENTI
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_ingredienti: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare gestisce clienti', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Campionature proattive verso industria',
        tempo_mesi: 2,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:400, costo_setup:300, impatto:0.8 }
        ]
      },
      '3': {
        cosa: '1 tecnico commerciale (~2.800€)',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:2800, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1540, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1260, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: '2 tecnici per segmento',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2240, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1232, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1120, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:840, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Dir. commerciale + R&D applicativo',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:3400, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1870, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1700, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1275, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — rapporti personali e telefonate', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con clienti, specifiche richieste e contratti',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'database_rd',
        nome: 'Database resp. R&D industrie target',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Contatti R&D e acquisti delle industrie alimentari target'
}
      ]
      },
      '3': {
        cosa: 'CRM con schede tecniche, campionature, storico forniture',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM con schede tecniche, campionature, storico forniture', costo_mensile:400, costo_setup:800, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:200, costo_setup:480, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM integrato con gestionale produzione e qualità',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM integrato con gestionale produzione e qualità', costo_mensile:800, costo_setup:2000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:400, costo_setup:1200, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP completo — ordini, produzione, lotti, qualità, compliance',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP completo', costo_mensile:1500, costo_setup:6000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:750, costo_setup:3600, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli R&D/produzione/commerciale definiti',
        tempo_mesi: 1,
        moduli: [
      {
            id: 'ruoli',
            nome: 'Organigramma R&D + produzione',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 200,
            impatto: 0.7,
            note: 'Chi fa R&D, chi produce, chi fa qualità, chi vende'
      }
,
{
        id: 'food_safety',
        nome: 'Formazione food safety per personale',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'HACCP + GMP base per tutti i dipendenti'
}
      ]
      },
      '3': {
        cosa: 'Tecnologo alimentare + procedure R&D strutturate',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'tecnologo',
            nome: 'Tecnologo alimentare',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'Tecnologo alimentare dipendente',
                        costo_mensile: 2800,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'R&D, schede tecniche, campionature, compliance'
                  },
                  {
                        id: 'consulente',
                        nome: 'Consulente tecnologo esterno',
                        costo_mensile: 500,
                        costo_setup: 300,
                        impatto: 0.7,
                        note: 'Visite periodiche, supporto R&D'
                  }
            ]
      }
]
      },
      '4': {
        cosa: 'KPI + sistema qualità + gestione certificazioni',
        tempo_mesi: 3,
        moduli: [
      {
            id: 'kpi',
            nome: 'KPI produzione ingredienti',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.5,
            note: 'Purezza, resa, contaminazioni, shelf life, costi'
      },
      {
            id: 'certificazioni',
            nome: 'Gestione certificazioni (BRC, FSSC, BIO)',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 200,
            costo_setup: 500,
            impatto: 0.3,
            note: 'Documentazione, audit, aggiornamento'
      }
]
      },
      '5': {
        cosa: 'Management completo — titolare solo R&D e strategia',
        tempo_mesi: 4,
        moduli: [
      {
            id: 'manager',
            nome: 'Direttore operativo',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'COO/direttore operativo dipendente',
                        costo_mensile: 3500,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Produzione + qualità + R&D coordination + logistica'
                  },
                  {
                        id: 'fractional',
                        nome: 'Operations manager fractional',
                        costo_mensile: 1500,
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
      '1': { chi:'Titolare', cosa:'Produzione su ricetta — nessun processo formalizzato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Schede tecniche + analisi laboratorio + certificati lotto',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'processo',
            nome: 'Schede tecniche',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:300, costo_setup:500, impatto:1, note:'Schede tecniche + analisi laboratorio + certificati lotto' },
              { id:'base', nome:'Soluzione base', costo_mensile:150, costo_setup:250, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '3': {
        cosa: 'Sistema qualità con SPC, HACCP avanzato, audit interni',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Sistema qualità con SPC, HACCP avanzato, audit interni',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:500, costo_setup:2000, impatto:1, note:'Sistema qualità con SPC, HACCP avanzato, audit interni' },
              { id:'base', nome:'Soluzione base', costo_mensile:250, costo_setup:1000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'FSSC 22000 + BRC + certificazioni Halal/Kosher',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'FSSC 22000',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:700, costo_setup:6000, impatto:1, note:'FSSC 22000 + BRC + certificazioni Halal/Kosher' },
              { id:'base', nome:'Soluzione base', costo_mensile:350, costo_setup:3000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP con modulo R&D — formulazioni, prove, scale-up, costi',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'ERP con modulo R&D',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:1300, costo_setup:8000, impatto:1, note:'ERP con modulo R&D — formulazioni, prove, scale-up, costi' },
              { id:'base', nome:'Soluzione base', costo_mensile:650, costo_setup:4000, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Prezzo al kg basato su costi — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Pricing per volume e tipo di cliente industriale',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Pricing per volume e tipo di cliente industriale', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'margini_cliente',
        nome: 'Analisi margine per cliente/settore',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Quale industria paga meglio — focus sui segmenti più redditizi'
}
      ]
      },
      '3': {
        cosa: 'Ingredienti funzionali a margine superiore (clean label)',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Ingredienti funzionali a margine superiore (clean label)', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'custom_blend',
        nome: 'Miscele personalizzate come servizio premium',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Blend su misura per il cliente — margine extra + lock-in'
}
      ]
      },
      '4': {
        cosa: 'Servizio sviluppo formulazione per clienti — valore aggiunto',
        tempo_mesi: 3,
        moduli: [
          { id:'ricavi', nome:'Servizio sviluppo formulazione per clienti', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:1000, impatto:0.8 }
        ,
{
        id: 'consulenza_app',
        nome: 'Consulenza applicativa come servizio',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Aiuti il cliente a usare ingrediente — fiducia + vendite'
}
      ]
      },
      '5': {
        cosa: 'Mix commodity + specialità + R&D + tolling + export',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Mix commodity + specialità + R&D + tolling + export',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:800, costo_setup:2000, impatto:1, note:'Mix commodity + specialità + R&D + tolling + export' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:400, costo_setup:1000, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo fiere e contatti diretti', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Schede tecniche professionali + LinkedIn aziendale',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Schede tecniche professionali + LinkedIn aziendale', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:300, impatto:0.8 }
        ,
{
        id: 'schede_app',
        nome: 'Schede applicative per industria',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Come usare ingrediente, dosaggi, ricette industriali — valore tecnico'
}
      ]
      },
      '3': {
        cosa: 'Fiere food ingredients (FiE, Cibus Tec) + catalogo tecnico',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Fiere food ingredients (FiE, Cibus Tec) + catalogo tecnico', tipo:'flag', obbligatorio:true, costo_mensile:600, costo_setup:3000, impatto:0.8 }
        ,
{
        id: 'webinar_tecnici',
        nome: 'Webinar tecnici per R&D clienti',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 100,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Presentazione nuovi ingredienti/applicazioni — lead gen B2B'
}
      ]
      },
      '4': {
        cosa: 'White paper tecnici + webinar + fiere internazionali',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'marketing',
            nome: 'White paper tecnici + webinar + fiere internazionali',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1200, costo_setup:4000, impatto:1, note:'White paper tecnici + webinar + fiere internazionali' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:480, costo_setup:2000, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piano marketing B2B — thought leadership, R&D showcase, PR',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing B2B',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:2500, costo_setup:5000, impatto:1, note:'Piano marketing B2B — thought leadership, R&D showcase, PR' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:1000, costo_setup:2500, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito vetrina con gamma prodotti e certificazioni',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito vetrina con gamma prodotti e certificazioni', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:1000, impatto:0.8 }
        ,
{
        id: 'schede_tecniche',
        nome: 'Download schede tecniche prodotti',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'Il buyer scarica spec sheet direttamente dal sito'
}
      ]
      },
      '3': {
        cosa: 'Sito con schede tecniche, download, richiesta campionature',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito con schede tecniche, download, richiesta campionature',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:300, costo_setup:2500, impatto:1, note:'Sito con schede tecniche, download, richiesta campionature' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:120, costo_setup:1000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Portale B2B con ordini, specifiche personalizzate, tracking',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'Portale B2B con ordini, specifiche personalizzate, tracking',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:700, costo_setup:5000, impatto:1, note:'Portale B2B con ordini, specifiche personalizzate, tracking' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:280, costo_setup:2000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma B2B integrata — ordini, formulazioni, compliance',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma B2B integrata',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1300, costo_setup:10000, impatto:1, note:'Piattaforma B2B integrata — ordini, formulazioni, compliance' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:520, costo_setup:4000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto materie prime da fornitore abituale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Confronto fornitori globali — qualità, certificazioni, prezzi',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Confronto fornitori globali', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'audit_fornitori',
        nome: 'Audit qualità fornitori base',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Visita + checklist qualità per ogni fornitore critico'
}
      ]
      },
      '3': {
        cosa: 'Sourcing internazionale — Europa, Asia — campionature e audit',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Sourcing internazionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:500, costo_setup:800, impatto:1, note:'Sourcing internazionale — Europa, Asia — campionature e audit' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:250, costo_setup:320, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Buyer dedicato — contratti quadro, hedging commodity, import',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer dedicato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:2500, costo_setup:1000, impatto:1, note:'Buyer dedicato — contratti quadro, hedging commodity, import' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1250, costo_setup:400, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — supply chain globale, dual sourcing, contratti',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:4000, costo_setup:2000, impatto:1, note:'Resp. acquisti — supply chain globale, dual sourcing, contratti' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:2000, costo_setup:800, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento e sourcing',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ALIMENTARE BIRRA
  // ═══════════════════════════════════════════════════════════════════════════
  alimentare_birra: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Titolare vende dal taproom', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Visite pub e ristoranti zona',
        tempo_mesi: 2,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: '1 agente HORECA (~1.800€)',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1800, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:990, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:810, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Agente + e-commerce diretto',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:3500, costo_setup:1500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1925, costo_setup:1500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1575, costo_setup:1500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Team vendite + distribuzione',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2400, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1320, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1200, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:900, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — tutto a voce e WhatsApp', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Excel con pub, ristoranti, ordini e preferenze',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'mappa_locali',
        nome: 'Mappa locali zona con spine disponibili',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Quali pub/ristoranti hanno spine libere per la tua birra'
}
      ]
      },
      '3': {
        cosa: 'CRM con clienti HORECA, storico ordini, degustazioni',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM con clienti HORECA, storico ordini, degustazioni', costo_mensile:300, costo_setup:500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:150, costo_setup:300, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM integrato con gestionale birrificio e magazzino',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM integrato con gestionale birrificio e magazzino', costo_mensile:600, costo_setup:1500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:300, costo_setup:900, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP birrificio — ordini, produzione, lotti, accise, export',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP birrificio', costo_mensile:1200, costo_setup:5000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:600, costo_setup:3000, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli birreria/taproom definiti — chi produce chi vende',
        tempo_mesi: 1,
        moduli: [
      {
            id: 'ruoli',
            nome: 'Organigramma birrificio',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 200,
            impatto: 0.7,
            note: 'Birraio, taproom, vendite, consegne — chi fa cosa'
      }
,
{
        id: 'igiene_birra',
        nome: 'Formazione igiene e pulizia impianti',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'CIP, sanitizzazione, controllo contaminazioni — base'
}
      ]
      },
      '3': {
        cosa: 'Birraio capo + pianificazione cotte e fermentazione',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'birraio',
            nome: 'Birraio capo',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'promozione',
                        nome: 'Promozione birraio senior',
                        costo_mensile: 200,
                        costo_setup: 300,
                        impatto: 0.85,
                        note: 'Già conosce ricette e impianto'
                  },
                  {
                        id: 'esperto',
                        nome: 'Mastro birraio esperto esterno',
                        costo_mensile: 2500,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Esperienza internazionale, nuove ricette'
                  }
            ]
      }
]
      },
      '4': {
        cosa: 'KPI birrificio + gestione qualità + taproom management',
        tempo_mesi: 3,
        moduli: [
      {
            id: 'kpi',
            nome: 'KPI birrificio',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.5,
            note: 'Resa per cotta, costo per litro, rotazione fusti, vendite taproom'
      },
      {
            id: 'taproom',
            nome: 'Responsabile taproom/eventi',
            tipo: 'flag',
            obbligatorio: false,
            costo_mensile: 1500,
            costo_setup: 0,
            impatto: 0.3,
            note: 'Gestisce taproom, eventi, degustazioni — libera il birraio'
      }
]
      },
      '5': {
        cosa: 'Management strutturato — fondatore solo ricette e strategia',
        tempo_mesi: 4,
        moduli: [
      {
            id: 'manager',
            nome: 'General manager birrificio',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'GM birrificio dipendente',
                        costo_mensile: 3000,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Produzione + vendite + taproom + eventi + logistica'
                  },
                  {
                        id: 'fractional',
                        nome: 'Brewery manager fractional',
                        costo_mensile: 1500,
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
      '1': { chi:'Birraio', cosa:'Ricette personali — produzione artigianale senza standard', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ricettario standardizzato + controllo fermentazione digitale',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Ricettario standardizzato + controllo fermentazione digitale', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'analisi_birra',
        nome: 'Analisi birra per ogni cotta',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'OG/FG, IBU, colore, pH — scheda per ogni batch'
}
      ]
      },
      '3': {
        cosa: 'Gestionale birrificio — cotte, fermentazione, imbottigliamento',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Gestionale birrificio',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:300, costo_setup:1500, impatto:1, note:'Gestionale birrificio — cotte, fermentazione, imbottigliamento' },
              { id:'base', nome:'Soluzione base', costo_mensile:150, costo_setup:750, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Laboratorio analisi + gestione accise + tracciabilità lotti',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'processo',
            nome: 'Laboratorio analisi',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:500, costo_setup:3000, impatto:1, note:'Laboratorio analisi + gestione accise + tracciabilità lotti' },
              { id:'base', nome:'Soluzione base', costo_mensile:250, costo_setup:1500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Produzione lean — pianificazione cotte, rese, KPI qualità',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'Produzione lean',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:800, costo_setup:5000, impatto:1, note:'Produzione lean — pianificazione cotte, rese, KPI qualità' },
              { id:'base', nome:'Soluzione base', costo_mensile:400, costo_setup:2500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Birraio', cosa:'Prezzo a bottiglia/fusto fisso — nessuna strategia', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Pricing differenziato — taproom vs HORECA vs distribuzione',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Pricing differenziato', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'prezzi_canale',
        nome: 'Listino per canale (taproom, pub, negozi)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Prezzo diverso per taproom (margine max) vs pub vs bottiglia'
}
      ]
      },
      '3': {
        cosa: 'Taproom come centro profitto + eventi degustazione',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'taproom',
            nome: 'Taproom strutturato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'completo',
                        nome: 'Taproom con food + eventi',
                        costo_mensile: 0,
                        costo_setup: 500,
                        impatto: 0.8,
                        note: 'Birra alla spina + taglieri + eventi — margine 70%+'
                  },
                  {
                        id: 'base',
                        nome: 'Solo mescita + merchandising',
                        costo_mensile: 0,
                        costo_setup: 200,
                        impatto: 0.5,
                        note: 'Birra + gadget brandizzati'
                  }
            ]
      }
]
      },
      '4': {
        cosa: 'Contratti HORECA annuali + birre stagionali/limited',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'contratti',
            nome: 'Contratti fornitura HORECA annuali',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.5,
            note: 'Spine in comodato, fornitura garantita, fidelizzazione'
      },
      {
            id: 'limited',
            nome: 'Birre stagionali/limited edition',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 300,
            impatto: 0.3,
            note: 'Edizioni limitate — prezzo premium, FOMO, buzz social'
      }
]
      },
      '5': {
        cosa: 'Mix ricavi — HORECA, taproom, DTC, eventi, contract brewing',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Mix ricavi',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:600, costo_setup:1500, impatto:1, note:'Mix ricavi — HORECA, taproom, DTC, eventi, contract brewing' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:300, costo_setup:750, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo taproom e passaparola birrofili', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Instagram con foto birre, brewing process, taproom',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Instagram con foto birre, brewing process, taproom', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'tap_takeover',
        nome: 'Tap takeover in pub partner',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Serata con tutte le tue birre in un pub — awareness + vendite'
}
      ]
      },
      '3': {
        cosa: 'Social curato + festival birra + collaborazioni birrifici',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Social curato + festival birra + collaborazioni birrifici', tipo:'flag', obbligatorio:true, costo_mensile:500, costo_setup:1500, impatto:0.8 }
        ,
{
        id: 'beer_community',
        nome: 'Community online beer lovers',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Gruppo Facebook/Telegram per appassionati — eventi, anteprime'
}
      ]
      },
      '4': {
        cosa: 'Brand identity + Untappd + PR beer blogger + tap takeover',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'marketing',
            nome: 'Brand identity + Untappd + PR beer blogger + tap takeover',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1200, costo_setup:3000, impatto:1, note:'Brand identity + Untappd + PR beer blogger + tap takeover' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:480, costo_setup:1500, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piano marketing — brand craft, community, eventi, export promo',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:2500, costo_setup:5000, impatto:1, note:'Piano marketing — brand craft, community, eventi, export promo' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:1000, costo_setup:2500, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito — solo Untappd e social', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito vetrina con birre, storia, taproom e orari',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito vetrina con birre, storia, taproom e orari', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:800, impatto:0.8 }
        ,
{
        id: 'taproom_info',
        nome: 'Orari taproom + birre alla spina oggi',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Aggiornamento in tempo reale birre disponibili'
}
      ]
      },
      '3': {
        cosa: 'Sito con catalogo birre, schede, dove trovarci, eventi',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito con catalogo birre, schede, dove trovarci, eventi',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:250, costo_setup:2000, impatto:1, note:'Sito con catalogo birre, schede, dove trovarci, eventi' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:100, costo_setup:800, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'E-commerce DTC — box birre, abbonamenti, gift pack',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'E-commerce DTC',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:500, costo_setup:4000, impatto:1, note:'E-commerce DTC — box birre, abbonamenti, gift pack' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:200, costo_setup:1600, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma DTC + B2B + prenotazione taproom + CRM',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma DTC',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1000, costo_setup:8000, impatto:1, note:'Piattaforma DTC + B2B + prenotazione taproom + CRM' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:400, costo_setup:3200, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Birraio', cosa:'Acquisto malti e luppoli da rivenditore locale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Confronto fornitori — malterie europee, luppoli freschi',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Confronto fornitori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'malti_confronto',
        nome: 'Confronto malterie e luppoli tra fornitori',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Qualità, prezzo, disponibilità — non dipendere da uno solo'
}
      ]
      },
      '3': {
        cosa: 'Accordi con malterie e hop dealer — contratti annuali',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Accordi con malterie e hop dealer', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ,
{
        id: 'import_luppoli',
        nome: 'Import diretto luppoli (USA, NZ, DE)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Luppoli speciali non disponibili da grossisti italiani'
}
      ]
      },
      '4': {
        cosa: 'Buyer per luppoli speciali, lieviti, import malti craft',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer per luppoli speciali, lieviti, import malti craft',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1200, costo_setup:500, impatto:1, note:'Buyer per luppoli speciali, lieviti, import malti craft' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:600, costo_setup:200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — contratti forward luppoli, malterie premium',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:2500, costo_setup:1500, impatto:1, note:'Resp. acquisti — contratti forward luppoli, malterie premium' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1250, costo_setup:600, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento malti e luppoli',
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
  // TECH SYSTEM INTEGRATOR
  // ═══════════════════════════════════════════════════════════════════════════
  tech_system_integrator: {
    vendite: {
      '1': { chi:'Founder/partner', cosa:'Founder/partner vende', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Networking + eventi vendor',
        tempo_mesi: 2,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:500, impatto:0.8 }
        ]
      },
      '3': {
        cosa: '1 account manager (~3.000€)',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:3000, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1650, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1350, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Account + pre-sales (~3.200€)',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2480, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1364, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1240, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:930, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Sales manager + team',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:4000, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:2200, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:2000, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1500, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun CRM — progetti gestiti via email', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'CRM base con opportunità, preventivi e follow-up',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'forecast',
        nome: 'Forecast pipeline trimestrale',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Previsione chiusure e revenue per trimestre'
}
      ]
      },
      '3': {
        cosa: 'CRM + PSA (Professional Services Automation) per progetti',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM + PSA (Professional Services Automation) per progetti', costo_mensile:400, costo_setup:1000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:200, costo_setup:600, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM con forecast, pipeline pesata e integrazione vendor',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM con forecast, pipeline pesata e integrazione vendor', costo_mensile:800, costo_setup:2000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:400, costo_setup:1200, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Stack completo — CRM, PSA, timesheet, margini progetto',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Stack completo', costo_mensile:1500, costo_setup:5000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:750, costo_setup:3000, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli tecnico/commerciale/PM definiti',
        tempo_mesi: 1,
        moduli: [
      {
            id: 'ruoli',
            nome: 'Organigramma per competenze',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 200,
            impatto: 0.7,
            note: 'Tecnici per specializzazione, PM, commerciale — chi fa cosa'
      }
,
{
        id: 'knowledge_base',
        nome: 'Knowledge base procedure interne',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Wiki con procedure, configurazioni, troubleshooting'
}
      ]
      },
      '3': {
        cosa: 'Team lead tecnico + processi di progetto strutturati',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'team_lead',
            nome: 'Team lead tecnico',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'promozione',
                        nome: 'Promozione senior engineer',
                        costo_mensile: 300,
                        costo_setup: 500,
                        impatto: 0.85,
                        note: 'Coordinamento tecnici, code review, standard'
                  },
                  {
                        id: 'esterno',
                        nome: 'Technical manager esterno',
                        costo_mensile: 3000,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Esperienza da SI più strutturato'
                  }
            ]
      }
]
      },
      '4': {
        cosa: 'PM dedicati + KPI per progetto + certificazioni team',
        tempo_mesi: 3,
        moduli: [
      {
            id: 'pm',
            nome: 'Project manager dedicato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'PM dipendente certificato (PMP/Prince2)',
                        costo_mensile: 2800,
                        costo_setup: 0,
                        impatto: 0.5,
                        note: 'Gestione progetti, clienti, delivery'
                  },
                  {
                        id: 'freelance',
                        nome: 'PM freelance a progetto',
                        costo_mensile: 1500,
                        costo_setup: 0,
                        impatto: 0.35,
                        note: 'Solo su progetti grandi'
                  }
            ]
      },
      {
            id: 'certificazioni',
            nome: 'Piano certificazioni team (MS, AWS, Cisco)',
            tipo: 'flag',
            obbligatorio: false,
            costo_mensile: 200,
            costo_setup: 500,
            impatto: 0.2,
            note: 'Budget annuo per certificazioni — punti nelle gare'
      }
]
      },
      '5': {
        cosa: 'Governance completa — founder solo strategia e relazioni',
        tempo_mesi: 4,
        moduli: [
      {
            id: 'cto',
            nome: 'CTO / Direttore tecnico',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'CTO dipendente',
                        costo_mensile: 4000,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Architettura, standard, team, vendor relationship'
                  },
                  {
                        id: 'fractional',
                        nome: 'CTO fractional',
                        costo_mensile: 2000,
                        costo_setup: 0,
                        impatto: 0.65,
                        note: '2-3 giorni/settimana + review'
                  }
            ]
      }
]
      },
      _label: 'Organizzazione',
    },
    processi: {
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni progetto è diverso e ad hoc', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Template preventivo + checklist installazione standard',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Template preventivo + checklist installazione standard', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ,
{
        id: 'sla_template',
        nome: 'Template SLA standard per clienti',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'Livelli di servizio, tempi risposta, escalation'
}
      ]
      },
      '3': {
        cosa: 'Project management base — Gantt, timesheet, documentazione',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Project management base',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:300, costo_setup:1000, impatto:1, note:'Project management base — Gantt, timesheet, documentazione' },
              { id:'base', nome:'Soluzione base', costo_mensile:150, costo_setup:500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Framework ITIL per servizi + PM strutturato per progetti',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'processo',
            nome: 'Framework ITIL per servizi',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:600, costo_setup:3000, impatto:1, note:'Framework ITIL per servizi + PM strutturato per progetti' },
              { id:'base', nome:'Soluzione base', costo_mensile:300, costo_setup:1500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'PMO strutturato + ITIL + knowledge base + automazioni',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'PMO strutturato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:1000, costo_setup:5000, impatto:1, note:'PMO strutturato + ITIL + knowledge base + automazioni' },
              { id:'base', nome:'Soluzione base', costo_mensile:500, costo_setup:2500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Fatturazione a progetto — prezzo su preventivo', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Contratti assistenza ricorrenti — canone mensile/annuale',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Contratti assistenza ricorrenti', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'manutenzione',
        nome: 'Contratti manutenzione annuali',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Da intervento a chiamata a canone fisso — MRR'
}
      ]
      },
      '3': {
        cosa: 'Managed services — monitoraggio, backup, supporto proattivo',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Managed services', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'managed_svc',
        nome: 'Managed services (monitoraggio + manutenzione)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Tu gestisci infrastruttura del cliente — margine 40-60%'
}
      ]
      },
      '4': {
        cosa: 'Mix progetto + managed services + licensing = ricavi prevedibili',
        tempo_mesi: 3,
        moduli: [
          { id:'ricavi', nome:'Mix progetto + managed services + licensing = ricavi prevedibili', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:1500, impatto:0.8 }
        ,
{
        id: 'cloud_migration',
        nome: 'Revenue da migrazione cloud',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Migrazione + licenze cloud — progetto + ricorrente'
}
      ]
      },
      '5': {
        cosa: 'Revenue model — MSP, cloud managed, consulting premium, SLA',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Revenue model',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:800, costo_setup:2500, impatto:1, note:'Revenue model — MSP, cloud managed, consulting premium, SLA' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:400, costo_setup:1250, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo passaparola e referral', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'LinkedIn + case study + certificazioni vendor in evidenza',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'LinkedIn + case study + certificazioni vendor in evidenza', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'referenze',
        nome: 'Case study clienti sul sito + LinkedIn',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Problema → soluzione → risultato — credibilità per prospect'
}
      ]
      },
      '3': {
        cosa: 'Google Ads IT + LinkedIn Ads + webinar tecnici',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Google Ads IT + LinkedIn Ads + webinar tecnici', tipo:'flag', obbligatorio:true, costo_mensile:800, costo_setup:1500, impatto:0.8 }
        ,
{
        id: 'vendor_mkt',
        nome: 'Co-marketing con vendor (Microsoft, Cisco)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Fondi MDF, eventi congiunti, lead sharing'
}
      ]
      },
      '4': {
        cosa: 'Content marketing tecnico + eventi vendor + partner program',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'marketing',
            nome: 'Content marketing tecnico + eventi vendor + partner program',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1500, costo_setup:3000, impatto:1, note:'Content marketing tecnico + eventi vendor + partner program' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:600, costo_setup:1500, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piano marketing B2B — thought leadership, eventi, partner co-mktg',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing B2B',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:3000, costo_setup:5000, impatto:1, note:'Piano marketing B2B — thought leadership, eventi, partner co-mktg' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:1200, costo_setup:2500, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito vetrina con servizi, competenze e certificazioni',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito vetrina con servizi, competenze e certificazioni', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:800, impatto:0.8 }
        ,
{
        id: 'case_study',
        nome: '2-3 case study clienti sul sito',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Problema → soluzione → risultato — credibilità'
}
      ]
      },
      '3': {
        cosa: 'Sito con case study, blog tecnico, richiesta preventivo',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito con case study, blog tecnico, richiesta preventivo',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:300, costo_setup:2500, impatto:1, note:'Sito con case study, blog tecnico, richiesta preventivo' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:120, costo_setup:1000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Portale clienti — ticket, monitoring dashboard, documentazione',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'Portale clienti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:600, costo_setup:5000, impatto:1, note:'Portale clienti — ticket, monitoring dashboard, documentazione' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:240, costo_setup:2000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma clienti completa — portale, SLA, report, knowledge',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma clienti completa',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1200, costo_setup:10000, impatto:1, note:'Piattaforma clienti completa — portale, SLA, report, knowledge' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:480, costo_setup:4000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto HW e licenze su ordine cliente — markup fisso', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Confronto distributori (Esprinet, Ingram, TD SYNNEX)',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Confronto distributori (Esprinet, Ingram, TD SYNNEX)', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'vendor_tier',
        nome: 'Upgrade tier partnership vendor',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Da Silver a Gold/Platinum — sconti migliori, più lead'
}
      ]
      },
      '3': {
        cosa: 'Accordi con distributori — rebate, deal registration vendor',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Accordi con distributori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'demo_lab',
        nome: 'Lab interno per demo/POC',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 100,
        costo_setup: 500,
        impatto: 0.15,
        note: 'Ambiente di test per mostrare soluzioni ai prospect'
}
      ]
      },
      '4': {
        cosa: 'Buyer IT dedicato — ottimizzazione licensing, cloud brokering',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer IT dedicato',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1800, costo_setup:500, impatto:1, note:'Buyer IT dedicato — ottimizzazione licensing, cloud brokering' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:900, costo_setup:200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — CSP/LSP, hardware staging, vendor management',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:3500, costo_setup:2000, impatto:1, note:'Resp. acquisti — CSP/LSP, hardware staging, vendor management' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1750, costo_setup:800, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento licenze e HW',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECH DIGITAL AGENCY
  // ═══════════════════════════════════════════════════════════════════════════
  tech_digital_agency: {
    vendite: {
      '1': { chi:'Founder', cosa:'Founder/creative director vende', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Portfolio + case study come strumento',
        tempo_mesi: 1,
        moduli: [
          { id:'supporto', nome:'Founder', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:300, impatto:0.8 }
        ,
{
        id: 'portfolio',
        nome: 'Portfolio progetti strutturato',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Case study con metriche: +X% conversioni, +Y% traffico'
}
      ]
      },
      '3': {
        cosa: '1 account/business developer (~2.800€)',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:2800, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1540, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1260, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: '2 account per segmento',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2240, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1232, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1120, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:840, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Dir. commerciale + rete partnership',
        tempo_mesi: 5,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:3400, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1870, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1700, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1275, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Founder', cosa:'Nessun CRM — progetti su email e documenti', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'CRM base con opportunità, preventivi e stato progetti',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Founder', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'brief_template',
        nome: 'Template brief + proposta strutturata',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Brief standard, proposta con scope/tempi/costi/KPI'
}
      ]
      },
      '3': {
        cosa: 'CRM + project management tool integrato (Asana, Monday)',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM + project management tool integrato (Asana, Monday)', costo_mensile:300, costo_setup:500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:150, costo_setup:300, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM con automazioni — lead nurturing, proposal, follow-up',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM con automazioni', costo_mensile:500, costo_setup:1000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:250, costo_setup:600, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Stack completo — CRM, PM, timesheet, profittabilità progetto',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Stack completo', costo_mensile:1000, costo_setup:3000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:500, costo_setup:1800, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli creativi/tecnici/account definiti',
        tempo_mesi: 1,
        moduli: [
      {
            id: 'ruoli',
            nome: 'Organigramma per competenze creative/tech',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 200,
            impatto: 0.7,
            note: 'Designer, developer, copywriter, account — chi fa cosa'
      }
,
{
        id: 'standup',
        nome: 'Daily standup + retrospettive',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Allineamento quotidiano, retrospettiva fine progetto'
}
      ]
      },
      '3': {
        cosa: 'Art director/creative lead + processo creativo strutturato',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'creative',
            nome: 'Creative lead',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'Art director dipendente',
                        costo_mensile: 2800,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Direzione creativa, standard qualità, team design'
                  },
                  {
                        id: 'freelance',
                        nome: 'Art director freelance senior',
                        costo_mensile: 1500,
                        costo_setup: 0,
                        impatto: 0.7,
                        note: '2-3 giorni/settimana + supervisione'
                  }
            ]
      }
]
      },
      '4': {
        cosa: 'Account director + PM + KPI per progetto',
        tempo_mesi: 3,
        moduli: [
      {
            id: 'account_dir',
            nome: 'Account director',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'Account director dipendente',
                        costo_mensile: 3000,
                        costo_setup: 0,
                        impatto: 0.5,
                        note: 'Gestione clienti key, upsell, retention'
                  },
                  {
                        id: 'promozione',
                        nome: 'Promozione account senior',
                        costo_mensile: 500,
                        costo_setup: 500,
                        impatto: 0.35,
                        note: 'Bonus responsabilità + formazione management'
                  }
            ]
      },
      {
            id: 'kpi',
            nome: 'KPI per progetto e per account',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.3,
            note: 'Margine per progetto, NPS, delivery on time, lifetime value'
      }
]
      },
      '5': {
        cosa: 'Management completo — founder solo strategia e new business',
        tempo_mesi: 4,
        moduli: [
      {
            id: 'md',
            nome: 'Managing director / COO',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'Managing director dipendente',
                        costo_mensile: 4000,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Team, processi, P&L, delivery, cultura'
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
      '1': { chi:'Founder', cosa:'Nessun processo — ogni progetto gestito diversamente', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Template brief, preventivo e contratto standardizzati',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Template brief, preventivo e contratto standardizzati', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:200, impatto:0.8 }
        ,
{
        id: 'workflow',
        nome: 'Workflow progetto standardizzato (brief→design→dev→QA→live)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Ogni progetto segue lo stesso flusso — meno errori, più velocità'
}
      ]
      },
      '3': {
        cosa: 'Processo progetto — brief, wireframe, sviluppo, test, lancio',
        tempo_mesi: 2,
        moduli: [
          { id:'processo', nome:'Processo progetto', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:800, impatto:0.8 }
        ,
{
        id: 'time_tracking',
        nome: 'Time tracking per progetto (Harvest, Toggl)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 50,
        costo_setup: 100,
        impatto: 0.15,
        note: 'Sai quanto tempo dedichi a ogni cliente — margine reale'
}
      ]
      },
      '4': {
        cosa: 'Metodologia agile + processi retainer con reporting mensile',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Metodologia agile',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:400, costo_setup:1500, impatto:1, note:'Metodologia agile + processi retainer con reporting mensile' },
              { id:'base', nome:'Soluzione base', costo_mensile:200, costo_setup:750, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Operations completo — PM, QA, delivery, capacity planning',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'processo',
            nome: 'Operations completo',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:800, costo_setup:3000, impatto:1, note:'Operations completo — PM, QA, delivery, capacity planning' },
              { id:'base', nome:'Soluzione base', costo_mensile:400, costo_setup:1500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Founder', cosa:'Fatturazione a progetto — preventivo fisso', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Contratti retainer mensili per manutenzione e supporto',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Contratti retainer mensili per manutenzione e supporto', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'retainer',
        nome: 'Modello retainer mensile vs progetto',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Sposta clienti da progetto singolo a retainer mensile — MRR'
}
      ]
      },
      '3': {
        cosa: 'Strategia 50% retainer + 50% progetti per stabilità',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Strategia 50% retainer + 50% progetti per stabilità', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:300, impatto:0.8 }
        ,
{
        id: 'upsell_servizi',
        nome: 'Upsell servizi ricorrenti (SEO, social, manutenzione)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Dopo il sito, vendi SEO/social/manutenzione — revenue ricorrente'
}
      ]
      },
      '4': {
        cosa: 'Servizi ricorrenti — hosting, SEO, social, email marketing',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Servizi ricorrenti', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'performance',
        nome: 'Fee basata su performance (% revenue, lead gen)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Il cliente paga in base ai risultati — margine potenzialmente infinito'
}
      ]
      },
      '5': {
        cosa: 'Revenue model — retainer, progetti, SaaS proprio, formazione',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Revenue model',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:600, costo_setup:1500, impatto:1, note:'Revenue model — retainer, progetti, SaaS proprio, formazione' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:300, costo_setup:750, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Founder', cosa:'Solo passaparola e portfolio personale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito portfolio + case study + LinkedIn attivo',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'Sito portfolio + case study + LinkedIn attivo', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'clutch',
        nome: 'Profilo su piattaforme agency (Clutch, GoodFirms)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Recensioni verificate — i prospect cercano qui'
}
      ]
      },
      '3': {
        cosa: 'Blog + SEO + webinar + lead magnet per generare lead',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Blog + SEO + webinar + lead magnet per generare lead', tipo:'flag', obbligatorio:true, costo_mensile:600, costo_setup:1000, impatto:0.8 }
        ,
{
        id: 'award',
        nome: 'Partecipazione a contest/award digitali',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Awwwards, CSS Design Awards — portfolio + credibilità'
}
      ]
      },
      '4': {
        cosa: 'Content premium + PR + speaking + awards + partnership',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'Content premium + PR + speaking + awards + partnership',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1500, costo_setup:2500, impatto:1, note:'Content premium + PR + speaking + awards + partnership' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:600, costo_setup:1250, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piano marketing — thought leadership, community, referral program',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:3000, costo_setup:4000, impatto:1, note:'Piano marketing — thought leadership, community, referral program' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:1200, costo_setup:2000, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Founder', cosa:'Portfolio personale o pagina LinkedIn', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito agency con portfolio, servizi e contatti',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito agency con portfolio, servizi e contatti', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'portfolio_web',
        nome: 'Portfolio interattivo con filtri',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Filtri per settore, tipo progetto, risultati — social proof'
}
      ]
      },
      '3': {
        cosa: 'Sito con case study dettagliati, blog, richiesta preventivo',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito con case study dettagliati, blog, richiesta preventivo',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:200, costo_setup:2000, impatto:1, note:'Sito con case study dettagliati, blog, richiesta preventivo' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:80, costo_setup:800, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Sito con risorse gratuite, tool, calcolatori — lead generation',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito con risorse gratuite, tool, calcolatori',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:400, costo_setup:4000, impatto:1, note:'Sito con risorse gratuite, tool, calcolatori — lead generation' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:160, costo_setup:1600, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma con portale clienti, report automatici, knowledge',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma con portale clienti, report automatici, knowledge',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:800, costo_setup:8000, impatto:1, note:'Piattaforma con portale clienti, report automatici, knowledge' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:320, costo_setup:3200, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Founder', cosa:'Freelance trovati su passaparola — tool gratuiti', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Network freelance verificati + stack tool professionale',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Network freelance verificati + stack tool professionale', tipo:'flag', obbligatorio:true, costo_mensile:200, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'contratti_freelance',
        nome: 'Template contratto collaborazione freelance',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'NDA, cessione diritti, tariffe, SLA — standard per tutti'
}
      ]
      },
      '3': {
        cosa: 'Pool freelance contrattualizzati + licenze tool centralizzate',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Pool freelance contrattualizzati + licenze tool centralizzate',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:500, costo_setup:500, impatto:1, note:'Pool freelance contrattualizzati + licenze tool centralizzate' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:250, costo_setup:200, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Gestione fornitori strutturata — SLA, qualità, backup',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Gestione fornitori strutturata',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:1200, costo_setup:1000, impatto:1, note:'Gestione fornitori strutturata — SLA, qualità, backup' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:600, costo_setup:400, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Procurement strategico — nearshore team, partnership tool, white label',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'canale',
            nome: 'Procurement strategico',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:2500, costo_setup:2000, impatto:1, note:'Procurement strategico — nearshore team, partnership tool, white label' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1250, costo_setup:800, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento freelance e tool',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECH AUTOMAZIONE
  // ═══════════════════════════════════════════════════════════════════════════
  tech_automazione: {
    vendite: {
      '1': { chi:'Titolare/fondatore', cosa:'Titolare/fondatore vende', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Visite a uffici tecnici industriali',
        tempo_mesi: 2,
        moduli: [
          { id:'supporto', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:0, impatto:0.8 }
        ]
      },
      '3': {
        cosa: '1 tecnico commerciale (~3.000€)',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'commerciale',
            nome: 'Figura commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:3000, costo_setup:500, impatto:1, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1650, costo_setup:500, impatto:0.7, note:'Provvigioni + ENASARCO mandante' },
              { id:'parttime', nome:'Commerciale part-time', costo_mensile:1350, costo_setup:500, impatto:0.5, note:'20h/settimana' }
            ]
          }
        ]
      },
      '4': {
        cosa: '2 commerciali per settore',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:2400, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1320, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1200, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:900, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Dir. commerciale + export',
        tempo_mesi: 6,
        moduli: [
          {
            id: 'resp',
            nome: 'Responsabile commerciale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'dip', nome:'Resp. commerciale dipendente', costo_mensile:3600, costo_setup:0, impatto:1, note:'Full-time, coordinamento' },
              { id:'fractional', nome:'Resp. commerciale fractional', costo_mensile:1980, costo_setup:0, impatto:0.65, note:'2-3 giorni/settimana' }
            ]
          },
          {
            id: 'team',
            nome: 'Figure commerciali',
            tipo: 'multi',
            obbligatorio: true,
            min: 2,
            varianti: [
              { id:'dip', nome:'Commerciale dipendente', costo_mensile:1800, costo_setup:0, impatto:0.2, note:'Lordo azienda' },
              { id:'agente', nome:'Agente ENASARCO', costo_mensile:1350, costo_setup:0, impatto:0.15, note:'Provvigioni + ENASARCO' }
            ]
          }
        ]
      },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun CRM — progetti via email e preventivi Word', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'CRM base con opportunità, preventivi e stato commesse',
        tempo_mesi: 1,
        moduli: [
          { id:'strumento', nome:'Titolare', tipo:'flag', obbligatorio:true, costo_mensile:50, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'database_stabilimenti',
        nome: 'Database stabilimenti industriali target',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Lista aziende manifatturiere con impianti da modernizzare'
}
      ]
      },
      '3': {
        cosa: 'CRM integrato con gestione commesse e preventivazione',
        tempo_mesi: 1,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM integrato con gestione commesse e preventivazione', costo_mensile:400, costo_setup:1000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:200, costo_setup:600, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'CRM con ERP — commesse, costi, margini, tempistiche',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'CRM con ERP', costo_mensile:800, costo_setup:2500, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:400, costo_setup:1500, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'ERP industriale completo — CRM, commesse, produzione, service',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'crm',
            nome: 'Piattaforma CRM/gestionale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'ERP industriale completo', costo_mensile:1500, costo_setup:6000, impatto:1, note:'Soluzione completa' },
              { id:'base', nome:'Alternativa leggera/economica', costo_mensile:750, costo_setup:3600, impatto:0.75, note:'Più semplice, meno funzioni' }
            ]
          }
        ]
      },
    },
    team: {
      '1': { chi:'Nessuna', cosa:'Nessuna organizzazione strutturata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Ruoli progettazione/produzione/commerciale definiti',
        tempo_mesi: 1,
        moduli: [
      {
            id: 'ruoli',
            nome: 'Organigramma per funzione',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 200,
            impatto: 0.7,
            note: 'Progettazione, assemblaggio, collaudo, commerciale — mansionario'
      }
,
{
        id: 'documentazione',
        nome: 'Documentazione tecnica per ruolo',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Schemi, procedure assemblaggio, collaudo per ogni mansione'
}
      ]
      },
      '3': {
        cosa: 'Resp. produzione/collaudo + procedure assembly strutturate',
        tempo_mesi: 2,
        moduli: [
      {
            id: 'resp',
            nome: 'Responsabile tecnico/produzione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'promozione',
                        nome: 'Promozione senior engineer',
                        costo_mensile: 300,
                        costo_setup: 500,
                        impatto: 0.85,
                        note: 'Già conosce i sistemi, gestisce assemblaggio e collaudo'
                  },
                  {
                        id: 'esterno',
                        nome: 'Resp. produzione automazione esterno',
                        costo_mensile: 3000,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'Esperienza da altro integratore, nuovi metodi'
                  }
            ]
      }
]
      },
      '4': {
        cosa: 'KPI per progetto + PM dedicato + certificazioni',
        tempo_mesi: 3,
        moduli: [
      {
            id: 'pm',
            nome: 'Project manager tecnico',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'PM/application engineer dipendente',
                        costo_mensile: 3000,
                        costo_setup: 0,
                        impatto: 0.5,
                        note: 'Gestione progetti, clienti, FAT/SAT'
                  },
                  {
                        id: 'freelance',
                        nome: 'PM freelance a commessa',
                        costo_mensile: 1500,
                        costo_setup: 0,
                        impatto: 0.35,
                        note: 'Solo su progetti grandi'
                  }
            ]
      },
      {
            id: 'kpi',
            nome: 'KPI per commessa (margine, tempi, reclami)',
            tipo: 'flag',
            obbligatorio: true,
            costo_mensile: 0,
            costo_setup: 500,
            impatto: 0.3
      }
]
      },
      '5': {
        cosa: 'Governance completa — fondatore solo R&D e strategia',
        tempo_mesi: 4,
        moduli: [
      {
            id: 'cto',
            nome: 'CTO / Direttore tecnico automazione',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
                  {
                        id: 'dip',
                        nome: 'Direttore tecnico dipendente',
                        costo_mensile: 4000,
                        costo_setup: 0,
                        impatto: 1,
                        note: 'R&D, standard, team, commesse chiave'
                  },
                  {
                        id: 'fractional',
                        nome: 'CTO fractional',
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
      '1': { chi:'Titolare', cosa:'Nessun processo — ogni impianto è un pezzo unico', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Template offerta tecnica + documentazione impianto standard',
        tempo_mesi: 1,
        moduli: [
          { id:'processo', nome:'Template offerta tecnica + documentazione impianto standard', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'collaudo_checklist',
        nome: 'Checklist collaudo FAT standard',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 100,
        impatto: 0.15,
        note: 'Test funzionale pre-consegna per ogni macchina/linea'
}
      ]
      },
      '3': {
        cosa: 'Project management — Gantt, milestone, collaudo, documentazione',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'processo',
            nome: 'Project management',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:300, costo_setup:1500, impatto:1, note:'Project management — Gantt, milestone, collaudo, documentazione' },
              { id:'base', nome:'Soluzione base', costo_mensile:150, costo_setup:750, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Processo ingegneria — design review, FAT, SAT, as-built',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'processo',
            nome: 'Processo ingegneria',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:600, costo_setup:3000, impatto:1, note:'Processo ingegneria — design review, FAT, SAT, as-built' },
              { id:'base', nome:'Soluzione base', costo_mensile:300, costo_setup:1500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'PMO + sistema qualità ISO 9001 + standard IEC per safety',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'processo',
            nome: 'PMO',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Soluzione completa', costo_mensile:1000, costo_setup:5000, impatto:1, note:'PMO + sistema qualità ISO 9001 + standard IEC per safety' },
              { id:'base', nome:'Soluzione base', costo_mensile:500, costo_setup:2500, impatto:0.7, note:'Versione semplificata' }
            ]
          }
        ]
      },
    },
    ricavi: {
      '1': { chi:'Titolare', cosa:'Fatturazione a progetto — prezzo su preventivo', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Contratti assistenza post-vendita annuali',
        tempo_mesi: 1,
        moduli: [
          { id:'ricavi', nome:'Contratti assistenza post-vendita annuali', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'service_contract',
        nome: 'Contratti service/manutenzione impianti',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Manutenzione programmata — ricorrente, margine 50%+'
}
      ]
      },
      '3': {
        cosa: 'Service ricorrente — manutenzione programmata, teleassistenza',
        tempo_mesi: 2,
        moduli: [
          { id:'ricavi', nome:'Service ricorrente', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'retrofit',
        nome: 'Retrofit e upgrade impianti esistenti',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Modernizzazione impianti vecchi — mercato enorme, margine alto'
}
      ]
      },
      '4': {
        cosa: 'Servizi Industry 4.0 — IoT, analytics, digital twin as-a-service',
        tempo_mesi: 3,
        moduli: [
          { id:'ricavi', nome:'Servizi Industry 4.0', tipo:'flag', obbligatorio:true, costo_mensile:300, costo_setup:2000, impatto:0.8 }
        ,
{
        id: 'ricambi',
        nome: 'Vendita ricambi e consumabili',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'Ricambi proprietari — lock-in + margine alto'
}
      ]
      },
      '5': {
        cosa: 'Revenue mix — progetti, service, retrofit, training, SaaS IoT',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'ricavi',
            nome: 'Revenue mix',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:800, costo_setup:3000, impatto:1, note:'Revenue mix — progetti, service, retrofit, training, SaaS IoT' },
              { id:'graduale', nome:'Implementazione graduale', costo_mensile:400, costo_setup:1500, impatto:0.65, note:'Avvio parziale, si espande' }
            ]
          }
        ]
      },
    },
    marketing: {
      '1': { chi:'Nessuno', cosa:'Nessuno — solo fiere industriali e referral', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'LinkedIn aziendale + case study impianti realizzati',
        tempo_mesi: 1,
        moduli: [
          { id:'marketing', nome:'LinkedIn aziendale + case study impianti realizzati', tipo:'flag', obbligatorio:true, costo_mensile:100, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'linkedin_tecnico',
        nome: 'LinkedIn con contenuti tecnici Industry 4.0',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 0,
        impatto: 0.15,
        note: 'Post su automazione, casi studio, trend — reach su decision maker'
}
      ]
      },
      '3': {
        cosa: 'Fiere industriali (SPS, MECSPE) + Google Ads + LinkedIn Ads',
        tempo_mesi: 2,
        moduli: [
          { id:'marketing', nome:'Fiere industriali (SPS, MECSPE) + Google Ads + LinkedIn Ads', tipo:'flag', obbligatorio:true, costo_mensile:800, costo_setup:2000, impatto:0.8 }
        ,
{
        id: 'fiere_sps',
        nome: 'Stand a fiere automazione (SPS, MECSPE)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 500,
        impatto: 0.15,
        note: 'Demo macchine, networking, lead qualificati'
}
      ]
      },
      '4': {
        cosa: 'White paper tecnici + webinar Industry 4.0 + demo center',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'marketing',
            nome: 'White paper tecnici + webinar Industry 4.0 + demo center',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:1500, costo_setup:4000, impatto:1, note:'White paper tecnici + webinar Industry 4.0 + demo center' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:600, costo_setup:2000, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piano marketing industriale — thought leadership, fiere, partner',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'marketing',
            nome: 'Piano marketing industriale',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'agenzia', nome:'Con agenzia/professionista esterno', costo_mensile:3000, costo_setup:6000, impatto:1, note:'Piano marketing industriale — thought leadership, fiere, partner' },
              { id:'inhouse', nome:'Gestione interna', costo_mensile:1200, costo_setup:3000, impatto:0.6, note:'Formazione + tool, gestione interna' }
            ]
          }
        ]
      },
    },
    sitoweb: {
      '1': { chi:'Nessuno', cosa:'Nessun sito o pagina datata', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Sito vetrina con competenze, settori e impianti realizzati',
        tempo_mesi: 1,
        moduli: [
          { id:'sito', nome:'Sito vetrina con competenze, settori e impianti realizzati', tipo:'flag', obbligatorio:true, costo_mensile:80, costo_setup:800, impatto:0.8 }
        ,
{
        id: 'video_impianti',
        nome: 'Video impianti realizzati',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Video delle macchine in funzione — convincente per buyer tecnici'
}
      ]
      },
      '3': {
        cosa: 'Sito con case study, video impianti, richiesta preventivo',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'sito',
            nome: 'Sito con case study, video impianti, richiesta preventivo',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:300, costo_setup:2500, impatto:1, note:'Sito con case study, video impianti, richiesta preventivo' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:120, costo_setup:1000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '4': {
        cosa: 'Portale clienti — documentazione, ticket, teleassistenza',
        tempo_mesi: 3,
        moduli: [
          {
            id: 'sito',
            nome: 'Portale clienti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:600, costo_setup:5000, impatto:1, note:'Portale clienti — documentazione, ticket, teleassistenza' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:240, costo_setup:2000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Piattaforma clienti — IoT dashboard, service, knowledge base',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'sito',
            nome: 'Piattaforma clienti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'premium', nome:'Soluzione professionale', costo_mensile:1200, costo_setup:10000, impatto:1, note:'Piattaforma clienti — IoT dashboard, service, knowledge base' },
              { id:'economica', nome:'Soluzione economica', costo_mensile:480, costo_setup:4000, impatto:0.65, note:'Template/base, meno personalizzazione' }
            ]
          }
        ]
      },
    },
    ecommerce: {
      '1': { chi:'Titolare', cosa:'Acquisto PLC e componenti da distributore abituale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': {
        cosa: 'Confronto distributori — Siemens, ABB, Schneider, Omron',
        tempo_mesi: 1,
        moduli: [
          { id:'canale', nome:'Confronto distributori', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:0, impatto:0.8 }
        ,
{
        id: 'componentistica',
        nome: 'Database fornitori componentistica',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 200,
        impatto: 0.15,
        note: 'PLC, sensori, motori — confronto prezzi e tempi per marca'
}
      ]
      },
      '3': {
        cosa: 'Accordi quadro con vendor — sconti volume, priorità consegna',
        tempo_mesi: 2,
        moduli: [
          { id:'canale', nome:'Accordi quadro con vendor', tipo:'flag', obbligatorio:true, costo_mensile:0, costo_setup:500, impatto:0.8 }
        ,
{
        id: 'partnership_plc',
        nome: 'Partnership con produttori PLC (Siemens, Allen-Bradley)',
        tipo: 'flag',
        obbligatorio: false,
        costo_mensile: 0,
        costo_setup: 300,
        impatto: 0.15,
        note: 'Sconti, formazione, supporto tecnico, co-marketing'
}
      ]
      },
      '4': {
        cosa: 'Buyer tecnico — ottimizzazione BOM, alternative, lead time',
        tempo_mesi: 2,
        moduli: [
          {
            id: 'canale',
            nome: 'Buyer tecnico',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:2000, costo_setup:800, impatto:1, note:'Buyer tecnico — ottimizzazione BOM, alternative, lead time' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1000, costo_setup:320, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      '5': {
        cosa: 'Resp. acquisti — vendor management, dual sourcing, stock strategy',
        tempo_mesi: 4,
        moduli: [
          {
            id: 'canale',
            nome: 'Resp. acquisti',
            tipo: 'scelta',
            obbligatorio: true,
            varianti: [
              { id:'completo', nome:'Implementazione completa', costo_mensile:3500, costo_setup:2000, impatto:1, note:'Resp. acquisti — vendor management, dual sourcing, stock strategy' },
              { id:'graduale', nome:'Avvio graduale', costo_mensile:1750, costo_setup:800, impatto:0.65, note:'Versione base, si espande' }
            ]
          }
        ]
      },
      _label: 'Approvvigionamento componenti',
    }
  }

};

window.STEP_DETAIL_BY_SETTORE = STEP_DETAIL_BY_SETTORE;
