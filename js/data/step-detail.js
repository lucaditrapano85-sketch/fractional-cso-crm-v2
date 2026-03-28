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

  // ═══════════════════════════════════════════════════════════════════════════
  // MANIFATTURIERO MECCANICA
  // ═══════════════════════════════════════════════════════════════════════════
  manifatturiero_meccanica: {
    vendite: {
      '1': { chi:'Titolare', cosa:'Solo il titolare visita clienti — nessun supporto commerciale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare + tecnico', cosa:'Tecnico interno affianca nelle visite e nei preventivi', costo_mensile:300, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Agente esterno', cosa:'Agente plurimandatario con portafoglio nella meccanica', costo_mensile:1200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Commerciale senior', cosa:'Commerciale interno con portafoglio e obiettivi mensili', costo_mensile:3000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale', cosa:'Direzione commerciale — resp. vendite + agenti + KAM OEM', costo_mensile:7500, costo_setup:2500, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — offerte a memoria o su carta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Registro offerte su Excel — cliente, lavorazione, importo, stato', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM base (Pipedrive/HubSpot) per offerte e follow-up', costo_mensile:50, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'CRM + processi', cosa:'SLA risposta preventivi (max 48h) + monitoraggio win/loss rate', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '5': { chi:'CRM + gestionale', cosa:'CRM integrato con gestionale commesse e fatturazione', costo_mensile:500, costo_setup:2000, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare + operatori', cosa:'Titolare + 2-3 operatori macchina — produzione e preventivi', costo_mensile:6000, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Formazione interna', cosa:'Formare operatori sulla comunicazione commerciale con i clienti', costo_mensile:6500, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Resp. officina', cosa:'Assumere responsabile officina — libera il titolare per il commerciale', costo_mensile:9000, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Team commerciale', cosa:'Aggiungere commerciale interno + back office dedicato', costo_mensile:13000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Struttura completa', cosa:'Resp. commerciale + resp. produzione + KPI e riunioni settimanali', costo_mensile:18000, costo_setup:1500, tempo_mesi:5 },
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
      '1': { chi:'Titolare', cosa:'Titolare gestisce 2-3 clienti OEM storici — nessun sviluppo', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare + tecnico', cosa:'Mappatura sistematica buyer OEM e Tier1 — visite pianificate', costo_mensile:500, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'KAM automotive', cosa:'Key account dedicato per clienti OEM principali', costo_mensile:3000, costo_setup:1000, tempo_mesi:3 },
      '4': { chi:'Team commerciale', cosa:'KAM + business development nuovi OEM', costo_mensile:5500, costo_setup:2000, tempo_mesi:4 },
      '5': { chi:'Dir. commerciale', cosa:'Direzione commerciale con presidio internazionale e gare Tier1', costo_mensile:9000, costo_setup:3000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — le RFQ arrivano per email', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare + Excel', cosa:'Foglio strutturato RFQ — cliente, part number, stato, deadline, valore', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'CRM automotive', cosa:'CRM con gestione RFQ, PPAP tracking e scadenze campionature', costo_mensile:150, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'CRM + ERP', cosa:'CRM integrato con ERP — visibilità da RFQ a produzione serie', costo_mensile:500, costo_setup:2000, tempo_mesi:3 },
      '5': { chi:'Piattaforma enterprise', cosa:'Gestione gare + portali OEM (Covisint, SupplyOn)', costo_mensile:1000, costo_setup:5000, tempo_mesi:4 },
    },
    team: {
      '1': { chi:'Titolare + operatori', cosa:'Titolare + operatori — produzione e qualità insieme', costo_mensile:8000, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ resp. qualità', cosa:'Resp. qualità dedicato — gestione IATF e audit cliente', costo_mensile:11000, costo_setup:500, tempo_mesi:2 },
      '3': { chi:'+ resp. produzione', cosa:'Resp. produzione — libera titolare per sviluppo commerciale', costo_mensile:14500, costo_setup:1000, tempo_mesi:3 },
      '4': { chi:'Team strutturato', cosa:'Qualità + produzione + commerciale + ufficio tecnico', costo_mensile:20000, costo_setup:1500, tempo_mesi:4 },
      '5': { chi:'Management completo', cosa:'Plant manager + KPI di stabilimento + continuous improvement', costo_mensile:26000, costo_setup:2500, tempo_mesi:6 },
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
      '1': { chi:'Titolare', cosa:'Titolare gestisce clienti storici — nessuno sviluppo nuovo', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare + campionature', cosa:'Mappatura prospect per settore — visite a buyer GDO e industria', costo_mensile:400, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Agente esterno', cosa:'Agente plurimandatario con portafoglio nel packaging', costo_mensile:1500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Commerciale senior', cosa:'Commerciale interno dedicato — offerte e key account', costo_mensile:3200, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale', cosa:'Direzione commerciale — resp. vendite + agenti + export', costo_mensile:8000, costo_setup:2500, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — offerte via email senza follow-up', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel strutturato — cliente, prodotto, tiratura, margine, stato', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per gestione offerte, campionature e riordini', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM integrato con gestionale produzione — tempi e capacità', costo_mensile:400, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'ERP integrato', cosa:'ERP completo — da offerta a produzione a spedizione', costo_mensile:800, costo_setup:4000, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare + operatori', cosa:'Titolare + operatori macchina — produzione e commerciale insieme', costo_mensile:7000, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ resp. produzione', cosa:'Resp. produzione — gestisce turni e commesse, libera il titolare', costo_mensile:10000, costo_setup:500, tempo_mesi:2 },
      '3': { chi:'+ back office', cosa:'Back office commerciale — gestione ordini e rapporto clienti', costo_mensile:12500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Team commerciale', cosa:'Commerciale + grafico/prestampa interno', costo_mensile:16000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Struttura completa', cosa:'Resp. commerciale + resp. produzione + qualità + R&D packaging', costo_mensile:22000, costo_setup:2000, tempo_mesi:5 },
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
      '1': { chi:'Titolare', cosa:'Titolare gestisce 3-5 clienti storici — zero prospecting', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Mappatura aziende zona che esternalizzano — visite mirate', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Agente esterno', cosa:'Agente plurimandatario nel settore di specializzazione', costo_mensile:1200, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Commerciale', cosa:'Commerciale interno — sviluppo nuovi clienti e diversificazione', costo_mensile:3000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale', cosa:'Resp. commerciale + rete agenti + sviluppo export', costo_mensile:7000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — il cliente chiama quando serve', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con offerte aperte — cliente, lavorazione, valore, stato', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM base per gestire offerte e scadenze contratti', costo_mensile:50, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM + monitoraggio carico macchine e tempi di consegna', costo_mensile:300, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'ERP completo', cosa:'ERP integrato — da preventivo a produzione a fattura', costo_mensile:600, costo_setup:3000, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare + operatori', cosa:'Titolare + 2-4 operatori — il titolare è in produzione', costo_mensile:5500, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ capo reparto', cosa:'Capo reparto tra gli operatori — gestisce il quotidiano', costo_mensile:7500, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'+ resp. produzione', cosa:'Resp. produzione assunto — libera il titolare per vendere', costo_mensile:10500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Team completo', cosa:'Back office + commerciale — il titolare fa strategia', costo_mensile:14000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Struttura manageriale', cosa:'Resp. commerciale + resp. produzione + qualità', costo_mensile:19000, costo_setup:1500, tempo_mesi:5 },
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
      '1': { chi:'Titolare', cosa:'Titolare gestisce i clienti — nessun sviluppo strutturato', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare + tecnico', cosa:'Visite pianificate a costruttori macchine e integratori della zona', costo_mensile:300, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Agente esterno', cosa:'Agente tecnico-commerciale con portafoglio automazione', costo_mensile:1500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Commerciale senior', cosa:'Commerciale interno — offerte complesse e key account', costo_mensile:3200, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale', cosa:'Dir. commerciale + sviluppo mercati export e OEM', costo_mensile:7500, costo_setup:2500, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — offerte su email e carta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel strutturato — progetto, cliente, valore, stato, tempi', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per offerte, commesse e follow-up post-vendita', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM integrato con gestionale — da offerta a produzione quadro', costo_mensile:350, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'ERP integrato', cosa:'ERP completo — preventivazione, distinte base, produzione, collaudo', costo_mensile:700, costo_setup:4000, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare + operatori', cosa:'Titolare + 2-3 cablaggiatori/quadristi', costo_mensile:6500, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ capo officina', cosa:'Capo officina — gestisce produzione e collaudi', costo_mensile:9000, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'+ progettista', cosa:'Progettista elettrico — schemi e distinte base', costo_mensile:12500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Team strutturato', cosa:'Progettazione + produzione + commerciale', costo_mensile:17000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Struttura manageriale', cosa:'Resp. tecnico + resp. commerciale + qualità + project manager', costo_mensile:23000, costo_setup:2000, tempo_mesi:5 },
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
      '1': { chi:'Titolare', cosa:'Titolare gestisce clienti storici — campionari su richiesta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare + campioni', cosa:'Campionatura proattiva verso confezionisti e brand della zona', costo_mensile:400, costo_setup:500, tempo_mesi:1 },
      '3': { chi:'Agente tessile', cosa:'Agente con portafoglio moda/arredamento — visite a studi e brand', costo_mensile:1500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Commerciale senior', cosa:'Commerciale interno + showroom campionari permanente', costo_mensile:3500, costo_setup:2000, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale', cosa:'Dir. commerciale + agenti Italia/estero + fiere internazionali', costo_mensile:8000, costo_setup:3000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini per telefono e email', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con clienti, campionature inviate, ordini in corso', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per campionature, riordini stagionali e follow-up', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM + gestionale produzione — capacità telai e tempi consegna', costo_mensile:400, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'ERP tessile', cosa:'ERP tessile integrato — ordini, pianificazione, qualità, spedizioni', costo_mensile:800, costo_setup:5000, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare + operatori', cosa:'Titolare + operatori telai/finissaggio', costo_mensile:6000, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ capo reparto', cosa:'Capo reparto — gestisce produzione e qualità tessuto', costo_mensile:8500, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'+ resp. tecnico', cosa:'Responsabile tecnico — sviluppo nuovi tessuti e campionature', costo_mensile:11500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Team completo', cosa:'Back office commerciale + logistica', costo_mensile:15000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Struttura manageriale', cosa:'Resp. commerciale + resp. produzione + sviluppo prodotto', costo_mensile:21000, costo_setup:2000, tempo_mesi:5 },
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
      '1': { chi:'Titolare', cosa:'Titolare vende ai soliti grossisti/brand — nessun sviluppo', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare + campionario', cosa:'Campionario stagionale proattivo verso nuovi brand e catene', costo_mensile:500, costo_setup:800, tempo_mesi:1 },
      '3': { chi:'Agente moda', cosa:'Agente moda con portafoglio brand e catene retail', costo_mensile:1800, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Commerciale senior', cosa:'Commerciale interno + showroom per campagne vendita', costo_mensile:3500, costo_setup:2500, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale', cosa:'Dir. commerciale + agenti export + fiere internazionali', costo_mensile:8500, costo_setup:3000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini stagionali a voce', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con ordini, campionature inviate, conferme pendenti', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per gestione campagne vendita e riordini', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM + gestionale — capacità produttiva e tempi consegna', costo_mensile:400, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'ERP moda', cosa:'ERP moda — dalla campagna vendita alla produzione alla spedizione', costo_mensile:900, costo_setup:5000, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare + operaie', cosa:'Titolare + sarte/operaie — confezionamento in casa', costo_mensile:5000, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ capo sarta', cosa:'Capo sarta — gestisce produzione e qualità capi', costo_mensile:7000, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'+ modellista', cosa:'Modellista/stilista — sviluppo campionari e prototipi', costo_mensile:10000, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Team completo', cosa:'Back office + commerciale + logistica spedizioni', costo_mensile:14000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Struttura manageriale', cosa:'Resp. produzione + resp. commerciale + sviluppo prodotto', costo_mensile:20000, costo_setup:2000, tempo_mesi:5 },
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
      '1': { chi:'Titolare', cosa:'Titolare fa tutto — assistenza e vendita ai clienti storici', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Mappatura PMI della zona con IT datato — visite dirette', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Account manager', cosa:'Account manager dedicato — sviluppa portafoglio e rinnovi', costo_mensile:2500, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'Team commerciale', cosa:'Account + tecnico pre-sales per gare e clienti strutturati', costo_mensile:4500, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale', cosa:'Sales manager + account per verticale + business developer', costo_mensile:8000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ticket e vendite confusi insieme', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con trattative aperte e scadenze contratti esistenti', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM con pipeline + alert scadenza contratti — il rinnovo è oro', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + ticketing', cosa:'CRM integrato con ticketing — visione dal contratto al supporto', costo_mensile:300, costo_setup:1000, tempo_mesi:2 },
      '5': { chi:'PSA completo', cosa:'CRM + PSA (Professional Services Automation) completo', costo_mensile:700, costo_setup:3000, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare + tecnici', cosa:'Titolare + 1-2 tecnici — tutti fanno tutto', costo_mensile:5000, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Formazione interna', cosa:'Tecnici formati sulla comunicazione col cliente non tecnico', costo_mensile:5500, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'+ service manager', cosa:'Service manager — garantisce qualità servizio e soddisfazione', costo_mensile:8500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Team specializzato', cosa:'Specializzazioni — cloud, security, networking su persone diverse', costo_mensile:13000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Struttura completa', cosa:'Account + service + tecnici specializzati + help desk L1', costo_mensile:18000, costo_setup:2000, tempo_mesi:5 },
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
      '1': { chi:'Titolare', cosa:'Titolare/formatore vende i propri corsi — nessun commerciale', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Proposta proattiva verso HR e resp. formazione aziende zona', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Commerciale', cosa:'Commerciale dedicato — sviluppo clienti corporate e enti', costo_mensile:2500, costo_setup:500, tempo_mesi:3 },
      '4': { chi:'Team commerciale', cosa:'Team vendite — corporate + PA/bandi + catalogo interaziendale', costo_mensile:5000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale', cosa:'Dir. commerciale + rete segnalatori + partnership consulenti', costo_mensile:8500, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — corsi venduti a richiesta', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con aziende contattate, proposte inviate, follow-up', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per pipeline corporate e scadenze fondi interprofessionali', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + consulente bandi', cosa:'CRM + gestione bandi e fondi (Fondimpresa, Fondirigenti)', costo_mensile:500, costo_setup:1500, tempo_mesi:2 },
      '5': { chi:'CRM + LMS integrato', cosa:'CRM integrato con LMS e fatturazione — ciclo completo', costo_mensile:1200, costo_setup:4000, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare', cosa:'Titolare-formatore solo — fa tutto', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Assistente', cosa:'Assistente — gestione aule, materiali, iscrizioni', costo_mensile:1500, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'+ formatori freelance', cosa:'Rete di formatori freelance coordinati dal titolare', costo_mensile:3000, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Team strutturato', cosa:'Coordinatore didattico + segreteria + commerciale', costo_mensile:8000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Academy completa', cosa:'Direttore academy + team formatori + progettazione didattica', costo_mensile:14000, costo_setup:2500, tempo_mesi:5 },
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
      '1': { chi:'Titolare', cosa:'Titolare trova lavori tramite passaparola — nessuna azione', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Rapporto sistematico con geometri e architetti della zona', costo_mensile:150, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Titolare strutturato', cosa:'Preventivi professionali + sopralluoghi proattivi su segnalazioni', costo_mensile:300, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Commerciale edile', cosa:'Commerciale dedicato — sviluppo condomini, studi tecnici, enti', costo_mensile:2500, costo_setup:500, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale', cosa:'Dir. commerciale + rete segnalatori + gare pubbliche SOA', costo_mensile:6000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — preventivi fatti e dimenticati', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con preventivi aperti, sopralluoghi fatti, follow-up', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per gestire preventivi, cantieri e referenze clienti', costo_mensile:50, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM + gestionale cantieri — margini, avanzamento, SAL', costo_mensile:300, costo_setup:1200, tempo_mesi:2 },
      '5': { chi:'ERP edile', cosa:'ERP edile — preventivazione, contabilità cantiere, fatturazione', costo_mensile:600, costo_setup:3000, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare + muratori', cosa:'Titolare + 2-3 muratori — tutti in cantiere, titolare fa tutto', costo_mensile:7000, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ capo cantiere', cosa:'Capo cantiere — gestisce i lavori, il titolare esce dal cantiere', costo_mensile:10000, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'+ tecnico', cosa:'Geometra/tecnico interno — computi, pratiche, sicurezza, bonus', costo_mensile:13500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Squadre + back office', cosa:'2+ squadre autonome + back office amministrativo', costo_mensile:22000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Struttura completa', cosa:'Resp. tecnico + capicantiere + amministrazione strutturata', costo_mensile:30000, costo_setup:2000, tempo_mesi:5 },
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
      '1': { chi:'Titolare', cosa:'Titolare trova lavori tramite passaparola e imprese edili', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Rapporti con studi tecnici, amministratori condominio, imprese', costo_mensile:150, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Titolare strutturato', cosa:'Preventivi strutturati + proposta efficientamento su ogni sopralluogo', costo_mensile:300, costo_setup:300, tempo_mesi:2 },
      '4': { chi:'Commerciale', cosa:'Commerciale dedicato — sviluppo condomini, industria, PA', costo_mensile:2500, costo_setup:500, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale', cosa:'Dir. commerciale + rete installatori partner + gare pubbliche', costo_mensile:6000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — chiamate e preventivi a memoria', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con preventivi, impianti installati, scadenze manutenzione', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per preventivi + scadenze contratti manutenzione', costo_mensile:50, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM + gestionale interventi — programmazione e consuntivo', costo_mensile:300, costo_setup:1200, tempo_mesi:2 },
      '5': { chi:'ERP impiantistica', cosa:'ERP impiantistica — preventivi, commesse, magazzino, fatturazione', costo_mensile:600, costo_setup:3000, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare + installatori', cosa:'Titolare + 1-2 installatori — tutti sugli impianti', costo_mensile:5500, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ capo squadra', cosa:'Capo squadra — gestisce cantieri, titolare esce dagli impianti', costo_mensile:8000, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'+ progettista', cosa:'Tecnico progettista — dimensionamento impianti e pratiche', costo_mensile:11500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Squadre + back office', cosa:'2+ squadre autonome + back office amministrativo', costo_mensile:18000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Struttura completa', cosa:'Resp. tecnico + capicantiere + amministrazione strutturata', costo_mensile:25000, costo_setup:1500, tempo_mesi:5 },
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
      '1': { chi:'Titolare', cosa:'Titolare vende dallo showroom — chi entra compra', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Sopralluoghi a domicilio + preventivi strutturati con rendering', costo_mensile:200, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'Titolare', cosa:'Sviluppo canale B2B — visite a imprese edili e studi tecnici', costo_mensile:300, costo_setup:200, tempo_mesi:2 },
      '4': { chi:'Commerciale B2B', cosa:'Commerciale esterno dedicato a imprese edili e architetti', costo_mensile:2500, costo_setup:500, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale', cosa:'Dir. commerciale + rete posatori partner + gare ristrutturazione', costo_mensile:6500, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — preventivi su carta e dimenticati', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con preventivi, sopralluoghi, stato trattativa', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per preventivi + follow-up post-sopralluogo', costo_mensile:50, costo_setup:200, tempo_mesi:1 },
      '4': { chi:'CRM + configuratore', cosa:'CRM + configuratore infissi per preventivi automatici', costo_mensile:400, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'CRM + gestionale', cosa:'CRM integrato con gestionale ordini e produzione/fornitori', costo_mensile:700, costo_setup:3500, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare + posatori', cosa:'Titolare + 1-2 posatori — showroom e posa', costo_mensile:5000, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ capo posatore', cosa:'Capo posatore — gestisce cantieri, titolare resta in showroom', costo_mensile:7500, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'+ addetto showroom', cosa:'Addetto showroom — accoglienza, preventivi, follow-up clienti', costo_mensile:10000, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Squadre + back office', cosa:'2+ squadre posa autonome + back office', costo_mensile:16000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Struttura completa', cosa:'Resp. commerciale + resp. posa + amministrazione', costo_mensile:22000, costo_setup:1500, tempo_mesi:5 },
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
      '1': { chi:'Titolare', cosa:'Titolare gestisce clienti storici — ordini per telefono', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Visite sistematiche ai 20 clienti con maggior potenziale', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Agente esterno', cosa:'Agente plurimandatario con portafoglio industriale della zona', costo_mensile:1500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'KAM + inside sales', cosa:'Key account manager per clienti strategici + inside sales', costo_mensile:4000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Dir. commerciale', cosa:'Dir. commerciale — KAM + agenti zona + inside sales + sviluppo', costo_mensile:8000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini a telefono e banco', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con clienti attivi, frequenza ordini, prodotti principali', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM con alert riordini e follow-up clienti dormienti', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + ERP', cosa:'CRM integrato con ERP — stock, prezzi, storico in tempo reale', costo_mensile:500, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'ERP distribuzione', cosa:'ERP completo — clienti, acquisti, magazzino, logistica', costo_mensile:1000, costo_setup:5000, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare + magazziniere', cosa:'Titolare + magazziniere — banco e consegne', costo_mensile:4000, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ addetto banco', cosa:'Addetto banco/vendite — gestisce ordini, il titolare esce', costo_mensile:6500, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'+ inside sales', cosa:'Inside sales — gestione telefonica ordini e sviluppo clienti', costo_mensile:9000, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Team strutturato', cosa:'Banco + inside sales + logistica + back office', costo_mensile:14000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Struttura manageriale', cosa:'Resp. commerciale + resp. logistica + amministrazione', costo_mensile:20000, costo_setup:1500, tempo_mesi:5 },
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
      '2': { chi:'Titolare', cosa:'Visite pianificate a ristoranti, hotel e negozi della zona', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Titolare strutturato', cosa:'Sviluppo canale HORECA — degustazioni, campionature, listini dedicati', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Agente esterno', cosa:'Agente dedicato canale HORECA o GDO locale', costo_mensile:1800, costo_setup:500, tempo_mesi:3 },
      '5': { chi:'Strategia + agenti export', cosa:'Sviluppo private label per GDO + apertura canale export', costo_mensile:3000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — ordini per telefono e WhatsApp', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con clienti, frequenza ordini, prodotti principali', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM + gestione listini e promozioni per cliente', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'Gestionale ordini con route planning consegne', costo_mensile:500, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'ERP alimentare', cosa:'ERP alimentare — ordini, magazzino, tracciabilità, logistica', costo_mensile:1200, costo_setup:6000, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare + operativi', cosa:'Titolare + magazziniere + autista', costo_mensile:5500, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ addetto ordini', cosa:'Addetto ordini — gestisce telefono e preparazione', costo_mensile:7500, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'+ resp. magazzino', cosa:'Resp. magazzino — gestisce stock, rotazione, scadenze', costo_mensile:10500, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Team completo', cosa:'Team logistica strutturato + back office commerciale', costo_mensile:16000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Struttura manageriale', cosa:'Resp. commerciale + resp. logistica + qualità HACCP', costo_mensile:22000, costo_setup:1500, tempo_mesi:5 },
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
      '1': { chi:'Titolare', cosa:'Titolare vende al banco — chi viene compra', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Visite pianificate a imprese edili e posatori della zona', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '3': { chi:'Titolare strutturato', cosa:'Sviluppo canale showroom ceramiche — appuntamenti con privati', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Agente edile', cosa:'Agente esterno per imprese edili + cantieri medio-grandi', costo_mensile:1800, costo_setup:500, tempo_mesi:3 },
      '5': { chi:'Strategia + gare', cosa:'Sviluppo gare pubbliche + accordi quadro con costruttori', costo_mensile:3000, costo_setup:2000, tempo_mesi:6 },
    },
    pipeline: {
      '1': { chi:'Titolare', cosa:'Nessun tracciamento — vendite al banco senza storico', costo_mensile:0, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'Titolare', cosa:'Excel con clienti principali, frequenza acquisti, volumi', costo_mensile:0, costo_setup:100, tempo_mesi:1 },
      '3': { chi:'CRM base', cosa:'CRM per follow-up preventivi e gestione clienti imprese', costo_mensile:80, costo_setup:300, tempo_mesi:1 },
      '4': { chi:'CRM + gestionale', cosa:'CRM + gestionale magazzino — stock, prezzi, listini cliente', costo_mensile:500, costo_setup:2000, tempo_mesi:2 },
      '5': { chi:'ERP completo', cosa:'ERP — ordini, magazzino, logistica consegne, fatturazione', costo_mensile:1000, costo_setup:5000, tempo_mesi:3 },
    },
    team: {
      '1': { chi:'Titolare + operativi', cosa:'Titolare + magazziniere + autista con gru', costo_mensile:5500, costo_setup:0, tempo_mesi:0 },
      '2': { chi:'+ addetto banco', cosa:'Addetto banco vendita — libera il titolare dal banco', costo_mensile:7500, costo_setup:300, tempo_mesi:1 },
      '3': { chi:'+ addetto showroom', cosa:'Addetto showroom ceramiche — consulenza e preventivi privati', costo_mensile:10000, costo_setup:500, tempo_mesi:2 },
      '4': { chi:'Team completo', cosa:'Team logistica + banco + showroom + back office', costo_mensile:16000, costo_setup:1000, tempo_mesi:3 },
      '5': { chi:'Struttura manageriale', cosa:'Resp. commerciale + resp. logistica + amministrazione', costo_mensile:22000, costo_setup:1500, tempo_mesi:5 },
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

};

window.STEP_DETAIL_BY_SETTORE = STEP_DETAIL_BY_SETTORE;
