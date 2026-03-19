// -- MARKET DATA -------------------------------------------
const MARKET = {

  // =============== MANIFATTURIERO ===============
  manifatturiero: {
    label:'Manifatturiero / Metalmeccanico', parent:null,
    metrics:[
      {label:'Tasso di chiusura medio',media:'22%',top:'38%'},
      {label:'Fatturato/commerciale',media:'480k EUR/anno',top:'720k EUR/anno'},
      {label:'Ciclo vendita medio',media:'60 gg',top:'35 gg'},
      {label:'Lead gen principale',media:'Fiere, agenti',top:'LinkedIn + fiere'},
      {label:'Uso CRM',media:'31%',top:'78%'},
      {label:'Clienti persi/anno',media:'18%',top:'8%'},
    ]
  },
  manifatturiero_meccanica: {
    label:'Meccanica di precisione', parent:'manifatturiero',
    metrics:[
      {label:'Tasso di chiusura medio',media:'19%',top:'35%'},
      {label:'Fatturato/commerciale',media:'520k EUR/anno',top:'800k EUR/anno'},
      {label:'Ciclo vendita medio',media:'75 gg',top:'40 gg'},
      {label:'Lead gen principale',media:'Fiere settoriali',top:'Fiere + outreach diretto'},
      {label:'Uso CRM',media:'28%',top:'72%'},
      {label:'Clienti persi/anno',media:'12%',top:'5%'},
    ]
  },
  manifatturiero_automotive: {
    label:'Automotive supply chain', parent:'manifatturiero',
    metrics:[
      {label:'Tasso di chiusura medio',media:'24%',top:'40%'},
      {label:'Fatturato/commerciale',media:'650k EUR/anno',top:'1.1M EUR/anno'},
      {label:'Ciclo vendita medio',media:'90 gg',top:'50 gg'},
      {label:'Lead gen principale',media:'Tender & RFQ',top:'Relazioni OEM dirette'},
      {label:'Uso CRM',media:'35%',top:'80%'},
      {label:'Clienti persi/anno',media:'8%',top:'3%'},
    ]
  },
  manifatturiero_packaging: {
    label:'Packaging & converting', parent:'manifatturiero',
    metrics:[
      {label:'Tasso di chiusura medio',media:'26%',top:'44%'},
      {label:'Fatturato/commerciale',media:'430k EUR/anno',top:'680k EUR/anno'},
      {label:'Ciclo vendita medio',media:'45 gg',top:'25 gg'},
      {label:'Lead gen principale',media:'Agenti, fiere',top:'LinkedIn + agenti'},
      {label:'Uso CRM',media:'30%',top:'70%'},
      {label:'Clienti persi/anno',media:'20%',top:'9%'},
    ]
  },
  manifatturiero_cterzi: {
    label:'Lavorazioni conto terzi', parent:'manifatturiero',
    metrics:[
      {label:'Tasso di chiusura medio',media:'30%',top:'50%'},
      {label:'Fatturato/commerciale',media:'350k EUR/anno',top:'580k EUR/anno'},
      {label:'Ciclo vendita medio',media:'30 gg',top:'15 gg'},
      {label:'Lead gen principale',media:'Passaparola',top:'Passaparola + digital'},
      {label:'Uso CRM',media:'18%',top:'55%'},
      {label:'Clienti persi/anno',media:'15%',top:'6%'},
    ]
  },
  manifatturiero_elettromeccanica: {
    label:'Elettromeccanica', parent:'manifatturiero',
    metrics:[
      {label:'Tasso di chiusura medio',media:'21%',top:'37%'},
      {label:'Fatturato/commerciale',media:'460k EUR/anno',top:'720k EUR/anno'},
      {label:'Ciclo vendita medio',media:'60 gg',top:'35 gg'},
      {label:'Lead gen principale',media:'Fiere, agenti',top:'Fiere + LinkedIn'},
      {label:'Uso CRM',media:'29%',top:'68%'},
      {label:'Clienti persi/anno',media:'14%',top:'6%'},
    ]
  },
  manifatturiero_tessile: {
    label:'Tessile & abbigliamento (produzione)', parent:'manifatturiero',
    metrics:[
      {label:'Tasso di chiusura medio',media:'20%',top:'36%'},
      {label:'Fatturato/commerciale',media:'380k EUR/anno',top:'620k EUR/anno'},
      {label:'Ciclo vendita medio',media:'50 gg',top:'28 gg'},
      {label:'Lead gen principale',media:'Fiere, agenti moda',top:'Showroom + B2B digital'},
      {label:'Uso CRM',media:'24%',top:'60%'},
      {label:'Clienti persi/anno',media:'22%',top:'10%'},
    ]
  },

  // =============== SERVIZI B2B ===============
  servizi_b2b: {
    label:'Servizi B2B / Consulenza', parent:null,
    metrics:[
      {label:'Tasso di chiusura medio',media:'28%',top:'52%'},
      {label:'Fatturato/commerciale',media:'320k EUR/anno',top:'580k EUR/anno'},
      {label:'Ciclo vendita medio',media:'25 gg',top:'12 gg'},
      {label:'Lead gen principale',media:'Referral',top:'LinkedIn + content'},
      {label:'Uso CRM',media:'44%',top:'85%'},
      {label:'Clienti persi/anno',media:'22%',top:'9%'},
    ]
  },
  servizi_it: {
    label:'Servizi IT & system integrator', parent:'servizi_b2b',
    metrics:[
      {label:'Tasso di chiusura medio',media:'25%',top:'48%'},
      {label:'Fatturato/commerciale',media:'380k EUR/anno',top:'680k EUR/anno'},
      {label:'Ciclo vendita medio',media:'45 gg',top:'20 gg'},
      {label:'Lead gen principale',media:'Referral, partner',top:'Inbound + partner network'},
      {label:'Uso CRM',media:'55%',top:'90%'},
      {label:'Clienti persi/anno',media:'18%',top:'7%'},
    ]
  },
  servizi_formazione: {
    label:'Formazione aziendale', parent:'servizi_b2b',
    metrics:[
      {label:'Tasso di chiusura medio',media:'35%',top:'58%'},
      {label:'Fatturato/commerciale',media:'220k EUR/anno',top:'420k EUR/anno'},
      {label:'Ciclo vendita medio',media:'20 gg',top:'8 gg'},
      {label:'Lead gen principale',media:'Referral, LinkedIn',top:'LinkedIn + content marketing'},
      {label:'Uso CRM',media:'38%',top:'78%'},
      {label:'Clienti persi/anno',media:'28%',top:'12%'},
    ]
  },

  // =============== EDILIZIA ===============
  edilizia: {
    label:'Edilizia / Impianti', parent:null,
    metrics:[
      {label:'Tasso di chiusura medio',media:'18%',top:'32%'},
      {label:'Fatturato/commerciale',media:'550k EUR/anno',top:'900k EUR/anno'},
      {label:'Ciclo vendita medio',media:'90 gg',top:'50 gg'},
      {label:'Lead gen principale',media:'Preventivi',top:'Preventivi + referral'},
      {label:'Uso CRM',media:'18%',top:'62%'},
      {label:'Clienti persi/anno',media:'14%',top:'6%'},
    ]
  },
  edilizia_residenziale: {
    label:'Costruzioni residenziali', parent:'edilizia',
    metrics:[
      {label:'Tasso di chiusura medio',media:'20%',top:'35%'},
      {label:'Fatturato/commerciale',media:'600k EUR/anno',top:'1M EUR/anno'},
      {label:'Ciclo vendita medio',media:'120 gg',top:'60 gg'},
      {label:'Lead gen principale',media:'Passaparola, agenzie',top:'Web + passaparola'},
      {label:'Uso CRM',media:'14%',top:'55%'},
      {label:'Clienti persi/anno',media:'10%',top:'4%'},
    ]
  },
  edilizia_impianti: {
    label:'Impiantistica (elettrica/idraulica)', parent:'edilizia',
    metrics:[
      {label:'Tasso di chiusura medio',media:'35%',top:'55%'},
      {label:'Fatturato/commerciale',media:'420k EUR/anno',top:'700k EUR/anno'},
      {label:'Ciclo vendita medio',media:'20 gg',top:'8 gg'},
      {label:'Lead gen principale',media:'Passaparola',top:'Passaparola + Google Ads'},
      {label:'Uso CRM',media:'12%',top:'50%'},
      {label:'Clienti persi/anno',media:'18%',top:'8%'},
    ]
  },
  edilizia_ristrutturazioni: {
    label:'Ristrutturazioni', parent:'edilizia',
    metrics:[
      {label:'Tasso di chiusura medio',media:'28%',top:'48%'},
      {label:'Fatturato/commerciale',media:'380k EUR/anno',top:'640k EUR/anno'},
      {label:'Ciclo vendita medio',media:'45 gg',top:'20 gg'},
      {label:'Lead gen principale',media:'Passaparola',top:'Google Ads + Houzz'},
      {label:'Uso CRM',media:'10%',top:'48%'},
      {label:'Clienti persi/anno',media:'20%',top:'9%'},
    ]
  },
  edilizia_serramenti: {
    label:'Serramenti & facciate', parent:'edilizia',
    metrics:[
      {label:'Tasso di chiusura medio',media:'22%',top:'40%'},
      {label:'Fatturato/commerciale',media:'480k EUR/anno',top:'780k EUR/anno'},
      {label:'Ciclo vendita medio',media:'60 gg',top:'30 gg'},
      {label:'Lead gen principale',media:'Preventivi, showroom',top:'Showroom + digital'},
      {label:'Uso CRM',media:'16%',top:'58%'},
      {label:'Clienti persi/anno',media:'16%',top:'7%'},
    ]
  },

  // =============== COMMERCIO ===============
  commercio: {
    label:'Commercio / Distribuzione', parent:null,
    metrics:[
      {label:'Tasso di chiusura medio',media:'32%',top:'55%'},
      {label:'Fatturato/commerciale',media:'650k EUR/anno',top:'1.1M EUR/anno'},
      {label:'Ciclo vendita medio',media:'12 gg',top:'5 gg'},
      {label:'Lead gen principale',media:'Agenti, catalogo',top:'E-commerce + agenti'},
      {label:'Uso CRM',media:'38%',top:'80%'},
      {label:'Clienti persi/anno',media:'20%',top:'10%'},
    ]
  },
  commercio_distribuzione_industriale: {
    label:'Distribuzione industriale', parent:'commercio',
    metrics:[
      {label:'Tasso di chiusura medio',media:'28%',top:'48%'},
      {label:'Fatturato/commerciale',media:'720k EUR/anno',top:'1.2M EUR/anno'},
      {label:'Ciclo vendita medio',media:'20 gg',top:'8 gg'},
      {label:'Lead gen principale',media:'Agenti, catalogo',top:'CRM outbound + catalogo'},
      {label:'Uso CRM',media:'42%',top:'82%'},
      {label:'Clienti persi/anno',media:'15%',top:'6%'},
    ]
  },
  commercio_ingrosso_alimentare: {
    label:'Ingrosso alimentare', parent:'commercio',
    metrics:[
      {label:'Tasso di chiusura medio',media:'40%',top:'62%'},
      {label:'Fatturato/commerciale',media:'850k EUR/anno',top:'1.5M EUR/anno'},
      {label:'Ciclo vendita medio',media:'7 gg',top:'3 gg'},
      {label:'Lead gen principale',media:'Agenti, catalogo',top:'Agenti + ordini digitali'},
      {label:'Uso CRM',media:'32%',top:'72%'},
      {label:'Clienti persi/anno',media:'22%',top:'10%'},
    ]
  },
  commercio_materiali_edili: {
    label:'Materiali edili & ferramenta', parent:'commercio',
    metrics:[
      {label:'Tasso di chiusura medio',media:'35%',top:'55%'},
      {label:'Fatturato/commerciale',media:'680k EUR/anno',top:'1.1M EUR/anno'},
      {label:'Ciclo vendita medio',media:'10 gg',top:'4 gg'},
      {label:'Lead gen principale',media:'Showroom, agenti',top:'Showroom + e-commerce B2B'},
      {label:'Uso CRM',media:'28%',top:'68%'},
      {label:'Clienti persi/anno',media:'18%',top:'8%'},
    ]
  },
  commercio_ricambi_auto: {
    label:'Ricambi auto & veicoli', parent:'commercio',
    metrics:[
      {label:'Tasso di chiusura medio',media:'42%',top:'65%'},
      {label:'Fatturato/commerciale',media:'780k EUR/anno',top:'1.3M EUR/anno'},
      {label:'Ciclo vendita medio',media:'5 gg',top:'2 gg'},
      {label:'Lead gen principale',media:'Catalogo, agenti',top:'E-commerce + agenti'},
      {label:'Uso CRM',media:'35%',top:'75%'},
      {label:'Clienti persi/anno',media:'20%',top:'9%'},
    ]
  },
  commercio_abbigliamento_ingrosso: {
    label:'Abbigliamento & tessile (ingrosso)', parent:'commercio',
    metrics:[
      {label:'Tasso di chiusura medio',media:'30%',top:'50%'},
      {label:'Fatturato/commerciale',media:'520k EUR/anno',top:'880k EUR/anno'},
      {label:'Ciclo vendita medio',media:'15 gg',top:'6 gg'},
      {label:'Lead gen principale',media:'Fiere, agenti',top:'Showroom + fiere'},
      {label:'Uso CRM',media:'25%',top:'62%'},
      {label:'Clienti persi/anno',media:'25%',top:'12%'},
    ]
  },
  commercio_elettronica: {
    label:'Elettronica & elettrodomestici', parent:'commercio',
    metrics:[
      {label:'Tasso di chiusura medio',media:'33%',top:'55%'},
      {label:'Fatturato/commerciale',media:'900k EUR/anno',top:'1.6M EUR/anno'},
      {label:'Ciclo vendita medio',media:'8 gg',top:'3 gg'},
      {label:'Lead gen principale',media:'Catalogo, GDO',top:'E-commerce + GDO'},
      {label:'Uso CRM',media:'40%',top:'78%'},
      {label:'Clienti persi/anno',media:'22%',top:'10%'},
    ]
  },
  commercio_chimici: {
    label:'Prodotti chimici & pulizia', parent:'commercio',
    metrics:[
      {label:'Tasso di chiusura medio',media:'38%',top:'60%'},
      {label:'Fatturato/commerciale',media:'620k EUR/anno',top:'1M EUR/anno'},
      {label:'Ciclo vendita medio',media:'12 gg',top:'5 gg'},
      {label:'Lead gen principale',media:'Agenti, catalogo',top:'Agenti + contratti quadro'},
      {label:'Uso CRM',media:'36%',top:'74%'},
      {label:'Clienti persi/anno',media:'14%',top:'5%'},
    ]
  },
  commercio_medicale: {
    label:'Medicale & farmaceutico', parent:'commercio',
    metrics:[
      {label:'Tasso di chiusura medio',media:'22%',top:'40%'},
      {label:'Fatturato/commerciale',media:'580k EUR/anno',top:'950k EUR/anno'},
      {label:'Ciclo vendita medio',media:'60 gg',top:'30 gg'},
      {label:'Lead gen principale',media:'ISF, congressi',top:'ISF + digital'},
      {label:'Uso CRM',media:'55%',top:'88%'},
      {label:'Clienti persi/anno',media:'10%',top:'4%'},
    ]
  },
  commercio_auto_moto: {
    label:'Vendita al dettaglio auto & moto', parent:'commercio',
    metrics:[
      {label:'Tasso di chiusura medio',media:'18%',top:'32%'},
      {label:'Fatturato/commerciale',media:'1.2M EUR/anno',top:'2.4M EUR/anno'},
      {label:'Ciclo vendita medio',media:'25 gg',top:'10 gg'},
      {label:'Lead gen principale',media:'Showroom, portali',top:'Google Ads + portali + CRM'},
      {label:'Uso CRM',media:'45%',top:'85%'},
      {label:'Clienti persi/anno',media:'35%',top:'18%'},
    ]
  },
  commercio_abbigliamento_dettaglio: {
    label:'Abbigliamento al dettaglio', parent:'commercio',
    metrics:[
      {label:'Tasso di chiusura medio',media:'55%',top:'75%'},
      {label:'Fatturato/commerciale',media:'320k EUR/anno',top:'580k EUR/anno'},
      {label:'Ciclo vendita medio',media:'1 gg',top:'stesso giorno'},
      {label:'Lead gen principale',media:'Passaparola, vetrina',top:'Social + fidelity card'},
      {label:'Uso CRM',media:'15%',top:'55%'},
      {label:'Clienti persi/anno',media:'40%',top:'20%'},
    ]
  },
  commercio_orologi_gioielli: {
    label:'Orologi & gioielli (dettaglio)', parent:'commercio',
    metrics:[
      {label:'Tasso di chiusura medio',media:'25%',top:'45%'},
      {label:'Fatturato/commerciale',media:'480k EUR/anno',top:'950k EUR/anno'},
      {label:'Ciclo vendita medio',media:'7 gg',top:'3 gg'},
      {label:'Lead gen principale',media:'Passaparola, vetrina',top:'Social + eventi + referral'},
      {label:'Uso CRM',media:'20%',top:'62%'},
      {label:'Clienti persi/anno',media:'28%',top:'12%'},
    ]
  },

  // =============== ALIMENTARE ===============
  alimentare: {
    label:'Alimentare / Food', parent:null,
    metrics:[
      {label:'Tasso di chiusura medio',media:'25%',top:'42%'},
      {label:'Fatturato/commerciale',media:'380k EUR/anno',top:'620k EUR/anno'},
      {label:'Ciclo vendita medio',media:'40 gg',top:'20 gg'},
      {label:'Lead gen principale',media:'Fiere, GDO',top:'GDO + digital'},
      {label:'Uso CRM',media:'22%',top:'65%'},
      {label:'Clienti persi/anno',media:'16%',top:'7%'},
    ]
  },
  alimentare_trasformazione: {
    label:'Trasformazione agroalimentare', parent:'alimentare',
    metrics:[
      {label:'Tasso di chiusura medio',media:'22%',top:'38%'},
      {label:'Fatturato/commerciale',media:'420k EUR/anno',top:'680k EUR/anno'},
      {label:'Ciclo vendita medio',media:'50 gg',top:'25 gg'},
      {label:'Lead gen principale',media:'Fiere, broker',top:'Fiere + GDO diretta'},
      {label:'Uso CRM',media:'20%',top:'60%'},
      {label:'Clienti persi/anno',media:'14%',top:'6%'},
    ]
  },
  alimentare_vini: {
    label:'Vini & spirits', parent:'alimentare',
    metrics:[
      {label:'Tasso di chiusura medio',media:'28%',top:'48%'},
      {label:'Fatturato/commerciale',media:'360k EUR/anno',top:'600k EUR/anno'},
      {label:'Ciclo vendita medio',media:'35 gg',top:'15 gg'},
      {label:'Lead gen principale',media:'Fiere, agenti',top:'Fiere + wine export'},
      {label:'Uso CRM',media:'26%',top:'68%'},
      {label:'Clienti persi/anno',media:'18%',top:'8%'},
    ]
  },
  alimentare_forno: {
    label:'Prodotti da forno & pasticceria', parent:'alimentare',
    metrics:[
      {label:'Tasso di chiusura medio',media:'35%',top:'55%'},
      {label:'Fatturato/commerciale',media:'280k EUR/anno',top:'480k EUR/anno'},
      {label:'Ciclo vendita medio',media:'14 gg',top:'5 gg'},
      {label:'Lead gen principale',media:'Agenti, passaparola',top:'Agenti + GDO'},
      {label:'Uso CRM',media:'15%',top:'50%'},
      {label:'Clienti persi/anno',media:'20%',top:'9%'},
    ]
  },
  alimentare_conserve: {
    label:'Conserve & surgelati', parent:'alimentare',
    metrics:[
      {label:'Tasso di chiusura medio',media:'24%',top:'42%'},
      {label:'Fatturato/commerciale',media:'450k EUR/anno',top:'750k EUR/anno'},
      {label:'Ciclo vendita medio',media:'30 gg',top:'14 gg'},
      {label:'Lead gen principale',media:'GDO, broker',top:'GDO + private label'},
      {label:'Uso CRM',media:'22%',top:'62%'},
      {label:'Clienti persi/anno',media:'15%',top:'6%'},
    ]
  },
  alimentare_ingredienti: {
    label:'Ingredienti B2B', parent:'alimentare',
    metrics:[
      {label:'Tasso di chiusura medio',media:'20%',top:'36%'},
      {label:'Fatturato/commerciale',media:'580k EUR/anno',top:'950k EUR/anno'},
      {label:'Ciclo vendita medio',media:'60 gg',top:'30 gg'},
      {label:'Lead gen principale',media:'Fiere, agenti tecnici',top:'Fiere + key account'},
      {label:'Uso CRM',media:'30%',top:'70%'},
      {label:'Clienti persi/anno',media:'10%',top:'4%'},
    ]
  },

  // =============== TECH ===============
  tech: {
    label:'Tech / Software', parent:null,
    metrics:[
      {label:'Tasso di chiusura medio',media:'22%',top:'45%'},
      {label:'Fatturato/commerciale',media:'420k EUR/anno',top:'850k EUR/anno'},
      {label:'Ciclo vendita medio',media:'35 gg',top:'18 gg'},
      {label:'Lead gen principale',media:'Referral',top:'Inbound + LinkedIn'},
      {label:'Uso CRM',media:'68%',top:'95%'},
      {label:'Clienti persi/anno',media:'25%',top:'10%'},
    ]
  },
  tech_saas: {
    label:'SaaS B2B', parent:'tech',
    metrics:[
      {label:'Tasso di chiusura medio',media:'20%',top:'42%'},
      {label:'Fatturato/commerciale',media:'380k EUR/anno',top:'800k EUR/anno'},
      {label:'Ciclo vendita medio',media:'30 gg',top:'14 gg'},
      {label:'Lead gen principale',media:'Inbound, trial',top:'PLG + SDR outbound'},
      {label:'Uso CRM',media:'78%',top:'98%'},
      {label:'Clienti persi/anno',media:'28%',top:'10%'},
    ]
  },
  tech_system_integrator: {
    label:'System integrator', parent:'tech',
    metrics:[
      {label:'Tasso di chiusura medio',media:'24%',top:'44%'},
      {label:'Fatturato/commerciale',media:'480k EUR/anno',top:'850k EUR/anno'},
      {label:'Ciclo vendita medio',media:'60 gg',top:'30 gg'},
      {label:'Lead gen principale',media:'Referral, partner',top:'Partner network + account'},
      {label:'Uso CRM',media:'62%',top:'92%'},
      {label:'Clienti persi/anno',media:'18%',top:'7%'},
    ]
  },
  tech_digital_agency: {
    label:'Digital agency & e-commerce', parent:'tech',
    metrics:[
      {label:'Tasso di chiusura medio',media:'28%',top:'50%'},
      {label:'Fatturato/commerciale',media:'280k EUR/anno',top:'520k EUR/anno'},
      {label:'Ciclo vendita medio',media:'20 gg',top:'8 gg'},
      {label:'Lead gen principale',media:'Referral, LinkedIn',top:'Referral + content'},
      {label:'Uso CRM',media:'55%',top:'88%'},
      {label:'Clienti persi/anno',media:'30%',top:'14%'},
    ]
  },
  tech_automazione: {
    label:'Automazione industriale', parent:'tech',
    metrics:[
      {label:'Tasso di chiusura medio',media:'18%',top:'35%'},
      {label:'Fatturato/commerciale',media:'600k EUR/anno',top:'1.1M EUR/anno'},
      {label:'Ciclo vendita medio',media:'90 gg',top:'45 gg'},
      {label:'Lead gen principale',media:'Fiere, partner OEM',top:'Fiere + key account'},
      {label:'Uso CRM',media:'58%',top:'88%'},
      {label:'Clienti persi/anno',media:'10%',top:'4%'},
    ]
  },
};

const MARKET_DETAIL = {

  // =======================================================
  // MANIFATTURIERO
  // =======================================================

  manifatturiero_meccanica: {
    ciclo_fasi: [
      { fase: 'Primo contatto', durata: '1-2 sett.', note: 'Spesso da fiera o referral. Difficile il freddo.' },
      { fase: 'Richiesta offerta / capitolato', durata: '2-4 sett.', note: 'Il cliente prepara specifiche tecniche. Fase lunga.' },
      { fase: 'Offerta tecnica + commerciale', durata: '1-2 sett.', note: 'Spesso si compete con 3-5 fornitori.' },
      { fase: 'Negoziazione e validazione', durata: '2-6 sett.', note: 'Campionatura, test, approvazione qualita.' },
      { fase: 'Chiusura e ordine', durata: '1-2 sett.', note: 'Contratto quadro o ordine spot.' },
    ],
    struttura_commerciale: 'Tipicamente il titolare o un responsabile commerciale senior gestisce i key account. Gli agenti plurimandatari coprono i territori. Rarissima la figura di SDR dedicato.',
    obiezioni: [
      '"Abbiamo gia un fornitore consolidato" -- la piu comune. Richiede campionatura.',
      '"Il prezzo e troppo alto" -- spesso pretesto: il vero blocco e il rischio di cambio fornitore.',
      '"Non abbiamo volumi sufficienti" -- usata per rimandare. Va trasformata in opportunita di crescita comune.',
    ],
    canali: [
      { nome: 'Fiere di settore (BI-MU, EMO, ecc.)', efficacia: 90 },
      { nome: 'Referral da clienti esistenti', efficacia: 85 },
      { nome: 'LinkedIn outreach diretto', efficacia: 55 },
      { nome: 'Sito web + SEO tecnico', efficacia: 40 },
      { nome: 'Cold call / email fredda', efficacia: 15 },
    ],
    stagionalita: 'Picco ordini: settembre-novembre e febbraio-aprile. Calo: agosto e dicembre-gennaio. I budget vengono approvati a ottobre per l\'anno successivo.',
    kpi: [
      { nome: 'Tasso campionatura -> ordine', benchmark: '35-50%' },
      { nome: 'Valore medio ordine', benchmark: '15k-80k EUR' },
      { nome: 'Durata media contratto quadro', benchmark: '12-36 mesi' },
    ],
    valore_cliente: '40k-250k EUR/anno per cliente attivo',
    maturita: [
      'CRM con storico offerte e win/loss analysis',
      'Processo di campionatura documentato con tempi definiti',
      'Key account manager dedicato per top 10 clienti',
      'Forecast trimestrale basato su pipeline reale',
    ],
  },

  manifatturiero_automotive: {
    ciclo_fasi: [
      { fase: 'Qualifica fornitore', durata: '2-6 mesi', note: 'Audit IATF, PPAP, FMEA. Fase piu lunga e costosa.' },
      { fase: 'RFQ (Request for Quotation)', durata: '4-8 sett.', note: 'Gara formale con specifiche dettagliate.' },
      { fase: 'Negoziazione tecnica', durata: '2-4 sett.', note: 'Engineering change, tolleranze, APQP.' },
      { fase: 'Negoziazione commerciale', durata: '2-6 sett.', note: 'Target pricing, LTA (Long Term Agreement).' },
      { fase: 'SOP (Start of Production)', durata: '2-4 sett.', note: 'Avvio produzione e ramping.' },
    ],
    struttura_commerciale: 'Key Account Manager specializzati per OEM o Tier1. Il ciclo e guidato dall\'ufficio acquisti del cliente. La vendita e quasi sempre tecnica, non relazionale.',
    obiezioni: [
      '"Non siete certificati IATF/ISO 16949" -- blocco reale, non negoziabile.',
      '"Il vostro lead time e troppo lungo" -- supply chain e tutto in automotive.',
      '"Il prezzo non e competitivo" -- il target pricing viene dall\'OEM, non trattabile.',
    ],
    canali: [
      { nome: 'Tier1/OEM direct contact', efficacia: 95 },
      { nome: 'Fiere (Automotive Interiors, IAA)', efficacia: 70 },
      { nome: 'Referral da partner della supply chain', efficacia: 65 },
      { nome: 'LinkedIn (engineering buyer)', efficacia: 40 },
      { nome: 'Cold outreach', efficacia: 5 },
    ],
    stagionalita: 'Ciclo legato ai modelli auto (3-5 anni). I picchi RFQ seguono i lanci di nuovi modelli. Estate: bassa attivita. Fine anno: budget planning.',
    kpi: [
      { nome: 'Win rate su RFQ formali', benchmark: '18-28%' },
      { nome: 'Valore LTA medio', benchmark: '200k-2M EUR/anno' },
      { nome: 'Durata contratto medio', benchmark: '3-5 anni' },
    ],
    valore_cliente: '200k-5M EUR/anno per contratto LTA',
    maturita: [
      'Certificazione IATF 16949 attiva',
      'Customer portal integrato con EDI del cliente',
      'KAM dedicato per ogni OEM/Tier1',
      'APQP process documentato e auditato',
    ],
  },

  manifatturiero_packaging: {
    ciclo_fasi: [
      { fase: 'Brief cliente', durata: '1 sett.', note: 'Specifiche materiale, quantita, grafica.' },
      { fase: 'Mockup / campione gratuito', durata: '1-2 sett.', note: 'Spesso richiesto come standard.' },
      { fase: 'Offerta commerciale', durata: '3-5 gg', note: 'Pricing su volumi annui stimati.' },
      { fase: 'Approvazione campione', durata: '1-3 sett.', note: 'Test interni del cliente, spesso piu cicli.' },
      { fase: 'Ordine e setup stampi', durata: '1-2 sett.', note: 'Investimento iniziale in attrezzature.' },
    ],
    struttura_commerciale: 'Mix di agenti di zona e commerciali interni. La trattativa e spesso gestita dall\'ufficio acquisti del cliente. Forte pressione su prezzo e MOQ.',
    obiezioni: [
      '"Il MOQ e troppo alto per noi" -- cliente piccolo non ha volumi.',
      '"Il fornitore attuale fa lo stesso a meno" -- commodity pricing.',
      '"I tempi di consegna sono troppo lunghi" -- il packaging e critico per la linea produttiva.',
    ],
    canali: [
      { nome: 'Agenti di zona + fiere (Interpack, Drupa)', efficacia: 80 },
      { nome: 'Referral clienti attuali', efficacia: 75 },
      { nome: 'LinkedIn (marketing manager, supply chain)', efficacia: 50 },
      { nome: 'Sito web + Google Ads B2B', efficacia: 35 },
      { nome: 'Cold email con campione fisico', efficacia: 40 },
    ],
    stagionalita: 'Picchi pre-Natale (settembre-ottobre) e pre-estate (aprile-maggio) per il food. Il gennaio-febbraio e il momento dei budget e dei nuovi contratti annuali.',
    kpi: [
      { nome: 'Valore medio ordine ricorrente', benchmark: '8k-40k EUR' },
      { nome: 'Frequenza ordini per cliente attivo', benchmark: '6-12 ordini/anno' },
      { nome: 'Retention rate clienti', benchmark: '78-88%' },
    ],
    valore_cliente: '50k-300k EUR/anno per cliente consolidato',
    maturita: [
      'Configuratore prezzi automatico per preventivi rapidi',
      'Gestione proattiva delle scadenze rinnovo contratti',
      'Database campioni con tempi di approvazione tracciati',
      'Upsell sistematico su materiali sostenibili/premium',
    ],
  },

  manifatturiero_cterzi: {
    ciclo_fasi: [
      { fase: 'Richiesta preventivo', durata: '1-3 gg', note: 'Spesso urgente. Chi risponde prima vince.' },
      { fase: 'Analisi tecnica + offerta', durata: '2-5 gg', note: 'Ciclo breve: il cliente ha gia un fornitore di riferimento.' },
      { fase: 'Trattativa prezzo', durata: '1-3 gg', note: 'Molto price-sensitive. Margini stretti.' },
      { fase: 'Primo lotto campione', durata: '1-2 sett.', note: 'Validazione qualita prima di ordini continuativi.' },
      { fase: 'Ordini continuativi', durata: 'ongoing', note: 'Se il primo lotto va bene, il rapporto dura anni.' },
    ],
    struttura_commerciale: 'Spesso e il titolare stesso a gestire i clienti. Pochissimi commerciali dedicati. Il 70% dei nuovi clienti arriva da referral o passaparola.',
    obiezioni: [
      '"Abbiamo gia chi fa questo lavoro" -- risposta: sei piu veloce, piu preciso, o piu economico?',
      '"Il prezzo e alto" -- il c/terzi e commodity pura. Il differenziale e la qualita e la puntualita.',
      '"Non sappiamo i volumi futuri" -- proponi un contratto flessibile senza MOQ fisso.',
    ],
    canali: [
      { nome: 'Passaparola e referral', efficacia: 90 },
      { nome: 'LinkedIn (responsabili produzione)', efficacia: 60 },
      { nome: 'Portali B2B (Kompass, Europages)', efficacia: 35 },
      { nome: 'Fiere locali di distretto', efficacia: 40 },
      { nome: 'Cold call a uffici acquisti', efficacia: 20 },
    ],
    stagionalita: 'Relativamente stabile. Picchi a settembre e gennaio (ripresa post-vacanze). Agosto e dicembre: fermi quasi totali.',
    kpi: [
      { nome: 'Velocita risposta preventivo', benchmark: 'Entro 24h (top: < 4h)' },
      { nome: 'Valore medio commessa', benchmark: '2k-15k EUR' },
      { nome: 'Frequenza ordini cliente attivo', benchmark: '4-12 volte/anno' },
    ],
    valore_cliente: '20k-80k EUR/anno per cliente consolidato',
    maturita: [
      'Preventivi automatizzati con risposta < 4 ore',
      'Portale clienti per tracking ordini in tempo reale',
      'Programma referral strutturato con incentivi',
      'Certificazione qualita ISO 9001 visibile e aggiornata',
    ],
  },

  manifatturiero_elettromeccanica: {
    ciclo_fasi: [
      { fase: 'Analisi esigenza tecnica', durata: '1-2 sett.', note: 'Spesso serve un sopralluogo tecnico iniziale.' },
      { fase: 'Progetto + offerta', durata: '2-4 sett.', note: 'Offerta tecnica dettagliata con disegni.' },
      { fase: 'Valutazione e confronto', durata: '2-4 sett.', note: 'Il cliente compara 2-3 fornitori.' },
      { fase: 'Negoziazione finale', durata: '1-2 sett.', note: 'Poco margine di manovra sul prezzo.' },
      { fase: 'Ordine e produzione', durata: '4-12 sett.', note: 'Tempi produzione lunghi su misura.' },
    ],
    struttura_commerciale: 'Agenti tecnici di zona + commerciali interni. La trattativa richiede competenza tecnica: il commerciale deve capire di elettrotecnica.',
    obiezioni: [
      '"Non conosciamo il vostro brand" -- settore molto legato alla reputazione locale.',
      '"I tempi di consegna sono troppo lunghi" -- critico per i clienti in emergenza.',
      '"Il servizio post-vendita e garantito?" -- la manutenzione e un argomento di vendita forte.',
    ],
    canali: [
      { nome: 'Agenti tecnici + fiere (SPS, MCE)', efficacia: 82 },
      { nome: 'Referral da installatori/manutentori', efficacia: 78 },
      { nome: 'LinkedIn (responsabili tecnici)', efficacia: 52 },
      { nome: 'Sito web con catalogo tecnico scaricabile', efficacia: 45 },
      { nome: 'Cold outreach a uffici tecnici', efficacia: 18 },
    ],
    stagionalita: 'Picchi a marzo-aprile e settembre-ottobre. I budget manutenzione vengono approvati a fine anno. Agosto: fermo quasi totale.',
    kpi: [
      { nome: 'Valore medio progetto', benchmark: '20k-150k EUR' },
      { nome: 'Contratti manutenzione attivi', benchmark: 'Obiettivo: 40% del fatturato' },
      { nome: 'Tasso rinnovo contratti manutenzione', benchmark: '75-90%' },
    ],
    valore_cliente: '30k-200k EUR/anno con manutenzione inclusa',
    maturita: [
      'Contratti di manutenzione preventiva su tutti i prodotti installati',
      'Tecnici commerciali certificati dai principali brand',
      'CRM con storico interventi per ogni cliente',
      'Upsell sistematico da riparazione a sostituzione',
    ],
  },

  manifatturiero_tessile: {
    ciclo_fasi: [
      { fase: 'Showroom / campionario', durata: '1-3 sett.', note: 'Il catalogo stagionale e il cuore della vendita.' },
      { fase: 'Campione di produzione', durata: '2-4 sett.', note: 'Il cliente valuta qualita, colore, finissaggio.' },
      { fase: 'Offerta su ordine stagionale', durata: '1 sett.', note: 'Prezzi stagionali con sconti su volume.' },
      { fase: 'Conferma ordine', durata: '1-2 sett.', note: 'Spesso a inizio stagione (feb e ago).' },
      { fase: 'Consegna e reorder', durata: 'Stagionale', note: 'I reorder veloci fanno la differenza.' },
    ],
    struttura_commerciale: 'Agenti monomandatari o plurimandatari di zona. Il responsabile commerciale gestisce i buyer dei grandi clienti. La relazione personale e centrale.',
    obiezioni: [
      '"Il prezzo non e competitivo con l\'Asia" -- il differenziale deve essere qualita, velocita e flessibilita.',
      '"I MOQ sono troppo alti" -- blocco tipico per i clienti piccoli.',
      '"I colori non sono nelle tendenze richieste" -- il color forecasting e critico.',
    ],
    canali: [
      { nome: 'Fiere (Premiere Vision, Milano Unica, Texworld)', efficacia: 92 },
      { nome: 'Showroom monomarca', efficacia: 80 },
      { nome: 'Agenti moda di zona', efficacia: 75 },
      { nome: 'LinkedIn (buyer, product manager)', efficacia: 48 },
      { nome: 'B2B digital (NuOrder, Joor)', efficacia: 40 },
    ],
    stagionalita: 'Due stagioni nette: SS (collezione presentata a luglio-agosto, ordini settembre-ottobre) e AW (presentata febbraio-marzo, ordini aprile-maggio). Fuori stagione: campagne flash.',
    kpi: [
      { nome: 'Ordine medio per cliente', benchmark: '5k-50k EUR/stagione' },
      { nome: 'Tasso reorder sulla stagione', benchmark: '25-40% del venduto' },
      { nome: 'Numero agenti attivi', benchmark: '1 ogni 500k EUR di fatturato' },
    ],
    valore_cliente: '15k-150k EUR/anno per buyer consolidato',
    maturita: [
      'Portale B2B digitale per ordini e reorder online',
      'Color service con palette allineata ai trend internazionali',
      'Agenti formati su vendita consultiva, non solo catalogo',
      'CRM con storico ordini per stagione e previsione reorder',
    ],
  },

  // =======================================================
  // SERVIZI B2B
  // =======================================================

  servizi_it: {
    ciclo_fasi: [
      { fase: 'Discovery tecnica', durata: '1-2 sett.', note: 'Analisi infrastruttura e pain point IT.' },
      { fase: 'Proposta tecnica + commerciale', durata: '1-2 sett.', note: 'Documento dettagliato con architettura proposta.' },
      { fase: 'Proof of Concept', durata: '2-4 sett.', note: 'Richiesto sempre piu spesso dai clienti enterprise.' },
      { fase: 'Valutazione e gara', durata: '2-6 sett.', note: 'Spesso RFP formale per ticket > 50k EUR.' },
      { fase: 'Contratto e onboarding', durata: '1-3 sett.', note: 'SLA, NDA, DPA obbligatori.' },
    ],
    struttura_commerciale: 'Account executive tecnici + pre-sales engineer. Il CTO/IT manager del cliente e il decision maker tecnico, ma il CFO approva il budget. Serve doppio interlocutore.',
    obiezioni: [
      '"Abbiamo gia un fornitore IT" -- la piu comune. Entra con un servizio complementare.',
      '"E troppo costoso" -- focus sul TCO (total cost of ownership), non sul prezzo iniziale.',
      '"Non siamo pronti per questo cambiamento" -- la resistenza al change e il vero blocco.',
    ],
    canali: [
      { nome: 'Partner program (Microsoft, AWS, Google)', efficacia: 85 },
      { nome: 'Referral da clienti esistenti', efficacia: 82 },
      { nome: 'LinkedIn (CTO, IT manager)', efficacia: 65 },
      { nome: 'Webinar tecnici e demo online', efficacia: 55 },
      { nome: 'Cold email con case study', efficacia: 22 },
    ],
    stagionalita: 'I budget IT si decidono a Q4. Picco progetti: Q1 (inizio anno) e Q3 (prima dei freeze di fine anno). Luglio-agosto e dicembre: lenti.',
    kpi: [
      { nome: 'MRR (Monthly Recurring Revenue)', benchmark: '2k-20k EUR per cliente managed services' },
      { nome: 'NPS clienti attivi', benchmark: '>45 per i top performer' },
      { nome: 'Churn rate annuo', benchmark: '< 8% per i migliori' },
    ],
    valore_cliente: '30k-300k EUR/anno per managed services . fino a 1M EUR per progetti infrastrutturali',
    maturita: [
      'Modello recurring revenue (managed services) > 50% del fatturato',
      'Customer success manager dedicato per top 20% clienti',
      'NPS misurato ogni trimestre con azioni correttive documentate',
      'Certificazioni vendor attive e aggiornate (Microsoft Gold, AWS Partner)',
    ],
  },

  servizi_formazione: {
    ciclo_fasi: [
      { fase: 'Analisi del fabbisogno formativo', durata: '1-2 sett.', note: 'Spesso ignorata. Chi la fa si differenzia.' },
      { fase: 'Proposta corso personalizzato', durata: '3-5 gg', note: 'Catalog vs. customized: il custom vince.' },
      { fase: 'Approvazione HR + budget', durata: '1-3 sett.', note: 'Spesso passa per piu livelli.' },
      { fase: 'Calendarizzazione', durata: '1-2 sett.', note: 'Trovare date compatibili con il cliente e un incubo.' },
      { fase: 'Erogazione e follow-up', durata: 'Variabile', note: 'Il follow-up post-corso apre nuove vendite.' },
    ],
    struttura_commerciale: 'Commerciali interni + rete di consulenti/docenti freelance. Il decision maker e HR o il responsabile di funzione. Il budget spesso viene dai fondi interprofessionali.',
    obiezioni: [
      '"Non abbiamo tempo per la formazione" -- proponi formati brevi (micro-learning, webinar).',
      '"Costa troppo" -- i fondi Fondimpresa/Fondirigenti coprono fino al 100%.',
      '"Abbiamo gia formato le persone" -- proponi verifica delle competenze e gap analysis.',
    ],
    canali: [
      { nome: 'LinkedIn (HR manager, L&D)', efficacia: 75 },
      { nome: 'Referral da altri clienti HR', efficacia: 72 },
      { nome: 'Associazioni di categoria e confindustria', efficacia: 60 },
      { nome: 'Fondi interprofessionali (Fondimpresa)', efficacia: 58 },
      { nome: 'Cold outreach a HR director', efficacia: 20 },
    ],
    stagionalita: 'Picco settembre-novembre (budget appena approvati) e gennaio-marzo (nuovi piani formativi). L\'estate e il periodo natalizio sono quasi morti.',
    kpi: [
      { nome: 'Costo giornata formativa media', benchmark: '1.500-4.000 EUR per gruppo' },
      { nome: 'Tasso riacquisto cliente', benchmark: '50-65% entro 12 mesi' },
      { nome: 'NPS post-corso', benchmark: '>60 per i migliori' },
    ],
    valore_cliente: '10k-80k EUR/anno per azienda con piano formativo continuativo',
    maturita: [
      'Accordo quadro pluriennale con i top 10 clienti',
      'Gestione autonoma dei fondi interprofessionali per i clienti',
      'Alumni community post-corso per retention e upsell',
      'Misura ROI formativo con pre/post assessment documentato',
    ],
  },

  // =======================================================
  // EDILIZIA
  // =======================================================

  edilizia_residenziale: {
    ciclo_fasi: [
      { fase: 'Primo contatto (annuncio/agenzia)', durata: '1-2 sett.', note: 'Il cliente arriva informato dai portali.' },
      { fase: 'Sopralluogo e consulenza', durata: '1-2 sett.', note: 'Fase cruciale: si vende il progetto, non il mattone.' },
      { fase: 'Proposta e preventivo', durata: '1-3 sett.', note: 'Molto personalizzato. Spesso 2-3 revisioni.' },
      { fase: 'Decisione e contratto preliminare', durata: '2-8 sett.', note: 'Il cliente confronta 2-4 costruttori.' },
      { fase: 'Rogito e avvio cantiere', durata: '2-4 sett.', note: 'Tempi notarili e tecnici.' },
    ],
    struttura_commerciale: 'Showroom / ufficio vendite con consulenti. Collaborazione con agenzie immobiliari. Il word of mouth e ancora il canale principale per i costruttori locali.',
    obiezioni: [
      '"Il prezzo al m2 e troppo alto" -- confronto con usato mal posto. Educa sul costo totale.',
      '"Aspettiamo che il mercato scenda" -- il classico rinvio. Crea urgenza con disponibilita limitata.',
      '"Non conosciamo la vostra azienda" -- le referenze di cantieri finiti sono la risposta.',
    ],
    canali: [
      { nome: 'Portali immobiliari (Immobiliare.it, Casa.it)', efficacia: 80 },
      { nome: 'Agenzie immobiliari partner', efficacia: 75 },
      { nome: 'Passaparola e referral acquirenti', efficacia: 70 },
      { nome: 'Google Ads + sito web con configuratore', efficacia: 55 },
      { nome: 'Social (Instagram per render)', efficacia: 42 },
    ],
    stagionalita: 'Picchi: primavera (marzo-maggio) e autunno (settembre-ottobre). Calo: agosto e dicembre-gennaio. Le fiere del settore (Ecomondo, Made Expo) generano lead.',
    kpi: [
      { nome: 'Lead to visit rate', benchmark: '25-40%' },
      { nome: 'Visit to proposta rate', benchmark: '40-60%' },
      { nome: 'Proposta to rogito rate', benchmark: '20-35%' },
    ],
    valore_cliente: '250k-1.5M EUR per unita residenziale',
    maturita: [
      'Configuratore online 3D con prezzi in tempo reale',
      'Video tour virtuale dei cantieri completati',
      'Programma referral strutturato per acquirenti soddisfatti',
      'CRM con tracking del ciclo acquisto per ogni lead',
    ],
  },

  edilizia_impianti: {
    ciclo_fasi: [
      { fase: 'Richiesta preventivo (spesso urgente)', durata: '1-3 gg', note: 'Chi risponde prima ha vantaggio netto.' },
      { fase: 'Sopralluogo tecnico', durata: '1-3 gg', note: 'Obbligatorio per interventi > 2k EUR.' },
      { fase: 'Preventivo dettagliato', durata: '2-5 gg', note: 'Troppi aspettano giorni. I top rispondono in 24h.' },
      { fase: 'Negoziazione (rara)', durata: '1-3 gg', note: 'Spesso il prezzo e fisso. Si compete su velocita.' },
      { fase: 'Esecuzione lavori', durata: '1 gg - 2 sett.', note: 'La qualita dell\'esecuzione genera referral.' },
    ],
    struttura_commerciale: 'Il titolare gestisce i clienti principali. Per i sub-appaltatori la rete si costruisce con imprese edili partner. Il cliente privato arriva via Google o passaparola.',
    obiezioni: [
      '"Ho gia chi mi segue" -- proponi il contratto di manutenzione preventiva annuale.',
      '"Costa troppo" -- break-even energetico per impianti termici/fotovoltaici.',
      '"Non ho tempo per i lavori" -- pianificazione flessibile fuori orari di lavoro.',
    ],
    canali: [
      { nome: 'Google My Business + recensioni', efficacia: 88 },
      { nome: 'Passaparola vicini/conoscenti', efficacia: 85 },
      { nome: 'Partner imprese edili e geometri', efficacia: 72 },
      { nome: 'Google Ads (termini di emergenza)', efficacia: 60 },
      { nome: 'Volantinaggio locale', efficacia: 20 },
    ],
    stagionalita: 'Picco guasti: inverno (impianti termici) ed estate (climatizzazione). Ristrutturazioni: primavera e autunno. Il fotovoltaico ha picco a febbraio-aprile (incentivi).',
    kpi: [
      { nome: 'Tempo risposta preventivo', benchmark: 'Top performer: < 2 ore' },
      { nome: 'Valore medio intervento', benchmark: '500-8.000 EUR' },
      { nome: 'Contratti manutenzione annui', benchmark: 'Obiettivo: 30% clienti attivi' },
    ],
    valore_cliente: '1k-15k EUR/anno con manutenzione inclusa',
    maturita: [
      'Preventivi online automatizzati per interventi standard',
      'Contratto manutenzione proposto sistematicamente post-intervento',
      '100+ recensioni Google con risposta attiva',
      'App di scheduling per interventi pianificati',
    ],
  },

  edilizia_ristrutturazioni: {
    ciclo_fasi: [
      { fase: 'Contatto iniziale', durata: '1 sett.', note: 'Spesso da Google, Instagram o passaparola.' },
      { fase: 'Sopralluogo gratuito', durata: '3-5 gg', note: 'Standard del settore. Chi non lo offre perde.' },
      { fase: 'Progetto + computo metrico', durata: '1-3 sett.', note: 'La qualita del preventivo e gia la vendita.' },
      { fase: 'Confronto con altri preventivi', durata: '2-4 sett.', note: 'Il cliente fa sempre 2-3 preventivi.' },
      { fase: 'Contratto e avvio cantiere', durata: '1-2 sett.', note: 'SAL (stato avanzamento lavori) definisce il cash flow.' },
    ],
    struttura_commerciale: 'Quasi sempre il titolare. Per le imprese piu strutturate: un tecnico commerciale con background architettonico. La partnership con interior designer e molto efficace.',
    obiezioni: [
      '"Ho trovato qualcuno piu economico" -- i "piu economici" spesso spariscono a meta lavori.',
      '"Quanto durera il cantiere?" -- il rispetto dei tempi e il vantaggio competitivo piu credibile.',
      '"Superbonus/Ecobonus: posso ancora usarli?" -- conosci le agevolazioni fiscali meglio del cliente.',
    ],
    canali: [
      { nome: 'Instagram (before/after)', efficacia: 78 },
      { nome: 'Google Maps + recensioni', efficacia: 75 },
      { nome: 'Referral clienti soddisfatti', efficacia: 88 },
      { nome: 'Partnership interior designer/architetti', efficacia: 70 },
      { nome: 'Houzz e Pinterest', efficacia: 38 },
    ],
    stagionalita: 'Primavera (marzo-giugno) e il picco: le persone vogliono finire prima dell\'estate. Secondo picco: settembre-ottobre. Agosto e gennaio-febbraio sono spenti.',
    kpi: [
      { nome: 'Valore medio commessa', benchmark: '20k-120k EUR' },
      { nome: 'Durata media cantiere', benchmark: '4-16 settimane' },
      { nome: 'Referral rate', benchmark: 'Top performer: 1 referral ogni 2 lavori completati' },
    ],
    valore_cliente: '20k-120k EUR per commessa . spesso 1 commessa ogni 5-8 anni per cliente',
    maturita: [
      'Portfolio fotografico professionale (before/after) su ogni cantiere',
      'Processo SAL documentato con aggiornamenti settimanali al cliente',
      'Accordo formale di referral con i 10 interior designer partner',
      'Gestione autonoma delle pratiche per incentivi fiscali',
    ],
  },

  edilizia_serramenti: {
    ciclo_fasi: [
      { fase: 'Contatto da showroom o sito', durata: '1 sett.', note: 'Lo showroom fisico e ancora decisivo.' },
      { fase: 'Sopralluogo e misure', durata: '3-5 gg', note: 'Obbligatorio. Occasione per upsell su accessori.' },
      { fase: 'Configurazione + offerta', durata: '3-7 gg', note: 'Configuratore digitale = vantaggio competitivo.' },
      { fase: 'Decisione (spesso familiare)', durata: '1-4 sett.', note: 'La moglie/marito spesso decide i colori.' },
      { fase: 'Produzione e posa', durata: '4-10 sett.', note: 'Il rispetto dei tempi di consegna e cruciale.' },
    ],
    struttura_commerciale: 'Showroom + tecnici commerciali di zona. Il cliente privato viene allo showroom. Il B2B (imprese edili, general contractor) va gestito con un KAM dedicato.',
    obiezioni: [
      '"Online costano la meta" -- educa sulla posa professionale e garanzia post-vendita.',
      '"I tempi sono troppo lunghi" -- i migliori consegnano in 4 sett. vs. 10 sett. della media.',
      '"Non so che colore/materiale scegliere" -- il consulente che aiuta a scegliere chiude di piu.',
    ],
    canali: [
      { nome: 'Showroom fisico con esposizione', efficacia: 85 },
      { nome: 'Referral e passaparola', efficacia: 80 },
      { nome: 'Google Ads + showroom virtuale 3D', efficacia: 58 },
      { nome: 'Partnership con imprese edili', efficacia: 65 },
      { nome: 'Fiere (Made Expo, Klimahouse)', efficacia: 55 },
    ],
    stagionalita: 'Picco ordini: marzo-maggio e settembre-ottobre (ristrutturazioni). Le promozioni di inizio anno (gennaio) funzionano bene per anticipare la stagione.',
    kpi: [
      { nome: 'Valore medio commessa privato', benchmark: '5k-25k EUR' },
      { nome: 'Valore medio commessa B2B', benchmark: '30k-200k EUR' },
      { nome: 'Tasso sopralluogo -> offerta -> ordine', benchmark: '85% -> 60% -> 35%' },
    ],
    valore_cliente: '5k-25k EUR privato . 50k-500k EUR/anno per general contractor',
    maturita: [
      'Configuratore 3D online con simulazione colori e prezzi',
      'KAM dedicato per i top 20 general contractor partner',
      'Showroom con campionatura completa e consulente dedicato',
      'Processo post-vendita con visita tecnica a 6 mesi dalla posa',
    ],
  },

  // =======================================================
  // COMMERCIO
  // =======================================================

  commercio_distribuzione_industriale: {
    ciclo_fasi: [
      { fase: 'Visita agente / cold call', durata: '1-2 sett.', note: 'L\'agente porta il catalogo. Il cliente chiede prezzi.' },
      { fase: 'Primo ordine di prova', durata: '1-2 sett.', note: 'Piccolo ordine per testare qualita e servizio.' },
      { fase: 'Valutazione post-primo ordine', durata: '2-4 sett.', note: 'Il servizio (puntualita, qualita) decide tutto.' },
      { fase: 'Accordo quadro / listino dedicato', durata: '1-2 sett.', note: 'I clienti voluminosi negoziano sconti strutturali.' },
      { fase: 'Riordini continuativi', durata: 'Ongoing', note: 'Il cliente che riordina senza chiamarti e il migliore.' },
    ],
    struttura_commerciale: 'Rete agenti di zona + inside sales per gestione ordini. I key account (clienti > 100k EUR/anno) vengono gestiti direttamente dal direttore commerciale.',
    obiezioni: [
      '"Ho gia il mio fornitore di fiducia" -- proponi un prodotto complementare non in conflitto.',
      '"I vostri prezzi non sono competitivi" -- sposta il discorso su servizio e disponibilita.',
      '"Non ho stock" -- la disponibilita immediata vale un premio di prezzo del 10-15%.',
    ],
    canali: [
      { nome: 'Rete agenti di zona', efficacia: 85 },
      { nome: 'Inside sales (telefono + email)', efficacia: 72 },
      { nome: 'E-commerce B2B con catalogo digitale', efficacia: 58 },
      { nome: 'Fiere di settore', efficacia: 48 },
      { nome: 'LinkedIn (responsabili acquisti)', efficacia: 38 },
    ],
    stagionalita: 'Relativamente stabile. Picchi a settembre (post-estate) e a marzo (inizio anno produttivo). Fine anno: accelerazione ordini per esaurire budget.',
    kpi: [
      { nome: 'Frequenza ordini per cliente', benchmark: '2-4 volte/mese per clienti attivi' },
      { nome: 'Valore medio ordine', benchmark: '500-5.000 EUR' },
      { nome: 'Fill rate ordini', benchmark: 'Top performer: > 97%' },
    ],
    valore_cliente: '20k-300k EUR/anno per cliente consolidato',
    maturita: [
      'E-commerce B2B con ordine automatico sotto scorta minima',
      'KPI fill rate monitorato giornalmente',
      'Programma fedelta con sconti progressivi su volumi',
      'Account manager dedicato per top 20% clienti (80% fatturato)',
    ],
  },

  commercio_ingrosso_alimentare: {
    ciclo_fasi: [
      { fase: 'Visita agente a punto vendita', durata: '1 sett.', note: 'L\'agente visita il cliente ogni 1-2 settimane.' },
      { fase: 'Proposta assortimento', durata: '3-5 gg', note: 'Il buyer valuta rotazione e margine.' },
      { fase: 'Accordo listino + condizioni', durata: '1 sett.', note: 'Sconti, premi fedelta, contributi promozioni.' },
      { fase: 'Primo ordine', durata: 'Immediato', note: 'Il ciclo e molto rapido nel food.' },
      { fase: 'Riordini e promozioni', durata: 'Settimanale', note: 'Il riordine e la vera vita del business.' },
    ],
    struttura_commerciale: 'Agenti monomandatari di zona + area manager + direttore vendite. I grandi clienti (GDO, catene HO.RE.CA.) hanno un KAM dedicato.',
    obiezioni: [
      '"Non ho spazio a scaffale" -- il sell-out veloce fa spazio da solo. Porta i dati di rotazione.',
      '"Il prezzo non mi permette il margine" -- negozia sulla promozione condivisa, non sul listino.',
      '"Ho gia un fornitore per questa categoria" -- entra con un prodotto non sovrapponibile.',
    ],
    canali: [
      { nome: 'Rete agenti monomandatari', efficacia: 90 },
      { nome: 'Fiere (CIBUS, TuttoFood, HOST)', efficacia: 75 },
      { nome: 'Broker GDO per la grande distribuzione', efficacia: 80 },
      { nome: 'Digital ordering (app/portale)', efficacia: 55 },
      { nome: 'Cold outreach HO.RE.CA.', efficacia: 30 },
    ],
    stagionalita: 'Molto legato al prodotto. Food natalizio: picco ottobre-dicembre. Bevande: estate. Prodotti base: stabile tutto l\'anno con picchi a Pasqua e agosto.',
    kpi: [
      { nome: 'Rotazione media prodotto a scaffale', benchmark: '1-3 settimane per fresh' },
      { nome: 'Frequenza visita agente', benchmark: 'Top performer: ogni 7-10 gg' },
      { nome: 'Fill rate ordini', benchmark: '> 96%' },
    ],
    valore_cliente: '10k-500k EUR/anno (da negozio indipendente a catena regionale)',
    maturita: [
      'App di ordine per il cliente con stock in tempo reale',
      'Analisi sell-out condivisa con i top 50 clienti',
      'Promo manager dedicato per promozioni GDO',
      'Category management come servizio ai buyer',
    ],
  },

  commercio_materiali_edili: {
    ciclo_fasi: [
      { fase: 'Visita agente / arrivo in punto vendita', durata: '1 sett.', note: 'Il professionista viene da te con il progetto in mano.' },
      { fase: 'Consulenza tecnica + preventivo', durata: '1-3 gg', note: 'Il tecnico commerciale fa la differenza.' },
      { fase: 'Confronto prezzi', durata: '1-5 gg', note: 'Il cliente compara 2-3 rivenditori.' },
      { fase: 'Ordine', durata: 'Immediato-3 gg', note: 'Per materiali standard: immediato. Su misura: settimane.' },
      { fase: 'Consegna cantiere', durata: 'Variabile', note: 'La logistica last-mile e un vantaggio competitivo.' },
    ],
    struttura_commerciale: 'Punto vendita + commerciali di zona per i professionisti (imprese, geometri, architetti). Il privato fai-da-te e gestito in store.',
    obiezioni: [
      '"Online costa meno" -- la disponibilita immediata e la consulenza tecnica valgono di piu.',
      '"Il vostro catalogo e limitato" -- il servizio di ordinazione rapida compensa.',
      '"Non consegnate in cantiere" -- la consegna diretta in cantiere e un servizio premium.',
    ],
    canali: [
      { nome: 'Punto vendita fisico con esposizione', efficacia: 85 },
      { nome: 'Agenti su imprese edili e professionisti', efficacia: 80 },
      { nome: 'Google Maps + recensioni locali', efficacia: 65 },
      { nome: 'Accordi con geometri e architetti', efficacia: 62 },
      { nome: 'E-commerce B2B per clienti abituali', efficacia: 40 },
    ],
    stagionalita: 'Segue l\'edilizia: picco primavera (marzo-giugno) e autunno (settembre-ottobre). I bonus edilizi (110%, 50%, 65%) creano picchi artificiali.',
    kpi: [
      { nome: 'Valore medio scontrino B2B', benchmark: '500-5.000 EUR' },
      { nome: 'Frequenza acquisto cliente professionale', benchmark: '2-8 volte/mese' },
      { nome: 'Margine medio per categoria', benchmark: '18-32%' },
    ],
    valore_cliente: '20k-200k EUR/anno per impresa edile cliente abituale',
    maturita: [
      'Consulente tecnico dedicato per i 20 professionisti top',
      'Consegna in cantiere entro 24h per materiali a stock',
      'Programma punti per professionisti con premi catalogati',
      'Showroom rinnovato con campionature espositive premium',
    ],
  },

  commercio_ricambi_auto: {
    ciclo_fasi: [
      { fase: 'Richiesta urgente (spesso telefonica)', durata: 'Immediata', note: 'Il meccanico ha il cliente in officina e l\'auto alzata.' },
      { fase: 'Verifica disponibilita + prezzo', durata: '5-15 min', note: 'Chi ha il pezzo disponibile vince sempre.' },
      { fase: 'Ordine + consegna', durata: '< 2 ore (top performer)', note: 'La consegna rapida e il differenziale principale.' },
      { fase: 'Fatturazione e credito', durata: '30-60 gg', note: 'Il credito al meccanico e standard del settore.' },
      { fase: 'Riordine continuativo', durata: 'Giornaliero', note: 'I migliori clienti ordinano ogni mattina.' },
    ],
    struttura_commerciale: 'Inside sales + consegna propria. I grossisti nazionali (LKQ, Autodis) dominano con catalogo e velocita. Il distributore locale vince sulla relazione e il servizio extra.',
    obiezioni: [
      '"Acquisto online, costa meno" -- il meccanico professionale non puo aspettare 3 giorni.',
      '"Il vostro catalogo non e completo" -- investi in ampliamento gamma o accordi con sub-fornitori.',
      '"Il credito che date e insufficiente" -- il plafond di credito e un vantaggio competitivo.',
    ],
    canali: [
      { nome: 'Rete di consegna locale (furgoni)', efficacia: 92 },
      { nome: 'Catalogo digitale + app ordini', efficacia: 80 },
      { nome: 'Agenti su officine indipendenti', efficacia: 70 },
      { nome: 'Accordi con concessionari multimarca', efficacia: 60 },
      { nome: 'Fiere (Autopromotec)', efficacia: 35 },
    ],
    stagionalita: 'Relativamente stabile. Picco: agosto-settembre (revisioni post-estate) e gennaio (pneumatici invernali). Le campagne cambio gomme sono fondamentali.',
    kpi: [
      { nome: 'Frequenza ordini per officina attiva', benchmark: '5-20 ordini/settimana' },
      { nome: 'Tempo medio consegna', benchmark: 'Top: < 90 min nella zona' },
      { nome: 'Fill rate primo ordine', benchmark: '> 94%' },
    ],
    valore_cliente: '20k-150k EUR/anno per officina multimarca attiva',
    maturita: [
      'App mobile per ordini in 30 secondi con stock live',
      'Consegna garantita entro 2 ore nel raggio di 30 km',
      'Plafond di credito personalizzato per ogni officina',
      'Account manager dedicato per top 30 officine (visita settimanale)',
    ],
  },

  commercio_abbigliamento_ingrosso: {
    ciclo_fasi: [
      { fase: 'Presentazione campionario stagionale', durata: '2-4 sett.', note: 'Il buyer viene allo showroom o alla fiera.' },
      { fase: 'Selezione articoli', durata: '1-2 sett.', note: 'Il buyer valuta margine, rotazione e tendenze.' },
      { fase: 'Negoziazione condizioni', durata: '3-5 gg', note: 'Sconti volume, consegna, reso invenduto.' },
      { fase: 'Ordine stagionale', durata: 'Una volta/stagione', note: 'Ordine anticipato vs. pronto: dinamiche diverse.' },
      { fase: 'Reintegri e riordini flash', durata: 'In stagione', note: 'I reintegri veloci fanno la differenza sul sell-out.' },
    ],
    struttura_commerciale: 'Agenti di zona monomandatari + showroom. Due stagioni (SS e AW). I buyer della GDO fashion richiedono un KAM dedicato e termini di pagamento a 90-120 gg.',
    obiezioni: [
      '"Non riesco a smaltire l\'invenduto" -- proponi il servizio di analisi sell-out e reso concordato.',
      '"I prezzi non mi permettono il margine" -- educa sulle rotazioni e il markdown planning.',
      '"I tempi di consegna non sono rispettati" -- la puntualita nella moda vale il doppio.',
    ],
    canali: [
      { nome: 'Showroom + agenti di zona', efficacia: 88 },
      { nome: 'Fiere (Pitti, Moda Prima, Who\'s Next)', efficacia: 82 },
      { nome: 'Piattaforme B2B digital (Joor, NuOrder)', efficacia: 55 },
      { nome: 'LinkedIn (buyer, merchandise manager)', efficacia: 42 },
      { nome: 'Catalogo digitale online', efficacia: 38 },
    ],
    stagionalita: 'Due stagioni nette. SS: ordini ottobre-dicembre, consegne febbraio-aprile. AW: ordini marzo-maggio, consegne agosto-settembre. Il pronto e continuo.',
    kpi: [
      { nome: 'Sell-through medio per stagione', benchmark: 'Top: > 75% del venduto' },
      { nome: 'Percentuale reorder su stagionale', benchmark: '20-35%' },
      { nome: 'Giorni medi di pagamento', benchmark: 'Standard: 60-90 gg' },
    ],
    valore_cliente: '10k-100k EUR/stagione per retailer indipendente . fino a 500k EUR per catene',
    maturita: [
      'Dashboard sell-through condivisa con i top 30 buyer',
      'Servizio reintegro rapido (consegna < 5 gg da ordine)',
      'Accordo reso concordato per massimo X% dell\'ordinato',
      'Consulenza assortimento come servizio differenziante',
    ],
  },

  commercio_elettronica: {
    ciclo_fasi: [
      { fase: 'Ricerca online + comparazione', durata: '1-7 gg', note: 'Il cliente arriva gia informato. Il prezzo e visibile.' },
      { fase: 'Contatto / visita punto vendita', durata: '1-3 gg', note: 'Lo specialista fa la differenza nella consulenza.' },
      { fase: 'Demo / prova prodotto', durata: '1 gg', note: 'La demo in store aumenta il tasso di conversione del 40%.' },
      { fase: 'Decisione e acquisto', durata: '1-5 gg', note: 'Il cliente chiede di "pensarci". Il follow-up e cruciale.' },
      { fase: 'Upsell garanzie e accessori', durata: 'Al momento dell\'acquisto', note: 'Il 30% del margine viene da garanzie estese e accessori.' },
    ],
    struttura_commerciale: 'Store manager + venditori specializzati per reparto. Per il B2B: account manager per aziende e PA. Il mercato e dominato da Amazon e dai grandi player.',
    obiezioni: [
      '"Su Amazon costa meno" -- garanzia locale, assistenza immediata, bundle personalizzato.',
      '"Devo pensarci" -- il 60% di chi "ci pensa" non torna. Offri una prenotazione.',
      '"Non so quale prodotto scegliere" -- il consulente specializzato e il tuo vantaggio.',
    ],
    canali: [
      { nome: 'Store fisico con demo live', efficacia: 82 },
      { nome: 'E-commerce con comparatore', efficacia: 75 },
      { nome: 'Google Shopping + SEO prodotto', efficacia: 68 },
      { nome: 'Partnership con aziende (B2B)', efficacia: 65 },
      { nome: 'Social (unboxing, review)', efficacia: 45 },
    ],
    stagionalita: 'Picco assoluto: novembre-dicembre (Black Friday + Natale). Secondo picco: settembre (back to school). Estate: bassa per elettrodomestici, alta per climatizzatori.',
    kpi: [
      { nome: 'Tasso conversione in store', benchmark: '35-55%' },
      { nome: 'Attach rate garanzie estese', benchmark: 'Top: > 40% dei prodotti venduti' },
      { nome: 'Valore medio scontrino', benchmark: '150-800 EUR' },
    ],
    valore_cliente: '500-5.000 EUR/anno per cliente privato abituale . 10k-100k EUR per aziende',
    maturita: [
      'Programma fedelta con cashback e accesso a offerte anticipate',
      'B2B desk dedicato per aziende e pubblica amministrazione',
      'Formazione venditori su ogni nuova gamma di prodotti',
      'E-commerce integrato con stock dello store fisico',
    ],
  },

  commercio_chimici: {
    ciclo_fasi: [
      { fase: 'Analisi esigenza tecnica', durata: '1-2 sett.', note: 'Il cliente ha un problema specifico. Serve consulenza.' },
      { fase: 'Schede tecniche + campioni', durata: '1-2 sett.', note: 'Il campione gratuito e lo standard del settore.' },
      { fase: 'Test interni del cliente', durata: '1-4 sett.', note: 'Il cliente testa in produzione prima di impegnarsi.' },
      { fase: 'Accordo quadro annuale', durata: '1-2 sett.', note: 'Prezzi fissi o indicizzati alle materie prime.' },
      { fase: 'Riordini continuativi', durata: 'Mensile', note: 'La continuita del servizio e tutto.' },
    ],
    struttura_commerciale: 'Tecnici commerciali (non semplici venditori) + inside sales. Il cliente parla con l\'ufficio tecnico, non con il commerciale puro. La competenza tecnica e obbligatoria.',
    obiezioni: [
      '"Ho gia il mio fornitore da 10 anni" -- sicurezza del cambio: proponi test parallelo senza interrompere fornitura.',
      '"I prezzi variano troppo" -- proponi price cap annuale indicizzato a materie prime.',
      '"Non ho la scheda di sicurezza in italiano" -- adempimento normativo: risolvilo prima della trattativa.',
    ],
    canali: [
      { nome: 'Tecnici commerciali + campioni gratuiti', efficacia: 88 },
      { nome: 'Fiere (Achema, Interclean)', efficacia: 72 },
      { nome: 'Referral da distributori partner', efficacia: 65 },
      { nome: 'LinkedIn (responsabili produzione/acquisti)', efficacia: 50 },
      { nome: 'Catalogo tecnico scaricabile', efficacia: 35 },
    ],
    stagionalita: 'Relativamente stabile. Pulizia professionale: picco pre-estate (hotel, HO.RE.CA.) e pre-Natale. Chimici industriali: seguono il ciclo produttivo del cliente.',
    kpi: [
      { nome: 'Valore medio ordine ricorrente', benchmark: '1.000-10.000 EUR' },
      { nome: 'Durata contratto quadro medio', benchmark: '12-24 mesi' },
      { nome: 'Tasso di switch a contratto', benchmark: 'Top performer: 65% dei nuovi clienti in 6 mesi' },
    ],
    valore_cliente: '15k-200k EUR/anno per cliente industriale',
    maturita: [
      'Tecnico di laboratorio disponibile per supporto clienti',
      'Accordi di fornitura pluriennali con price review semestrale',
      'Schede tecniche e di sicurezza sempre aggiornate e accessibili online',
      'Sistema di monitoraggio consumi per prevenire stockout del cliente',
    ],
  },

  commercio_medicale: {
    ciclo_fasi: [
      { fase: 'Identificazione decision maker (ISF)', durata: '2-4 sett.', note: 'In ospedale: primario, procurement, direzione sanitaria.' },
      { fase: 'Presentazione clinica + trial', durata: '2-6 sett.', note: 'Il trial clinico e obbligatorio per dispositivi.' },
      { fase: 'Gara pubblica (CIG)', durata: '2-6 mesi', note: 'Ospedali pubblici: solo tramite gara. Processo lungo.' },
      { fase: 'Approvazione budget sanitario', durata: '1-3 mesi', note: 'I budget ospedalieri si approvano annualmente.' },
      { fase: 'Contratto e fornitura', durata: '1-2 mesi', note: 'Contratti pluriennali con rinnovi.' },
    ],
    struttura_commerciale: 'ISF (Informatori Scientifici del Farmaco) + specialist. La vendita e tecnico-scientifica. Il KOL (Key Opinion Leader) influence e fondamentale.',
    obiezioni: [
      '"Non possiamo prescindere dalla gara pubblica" -- non e un\'obiezione, e la legge. Prepara la gara.',
      '"Non abbiamo budget quest\'anno" -- porta dati di farmacoeconomia (cost-effectiveness).',
      '"Il prodotto non e nel prontuario" -- il percorso di inserimento in prontuario e la vendita vera.',
    ],
    canali: [
      { nome: 'ISF + congressi medici', efficacia: 90 },
      { nome: 'KOL (Key Opinion Leader)', efficacia: 85 },
      { nome: 'Gare pubbliche (portali MePA/CONSIP)', efficacia: 78 },
      { nome: 'Cliniche private (ciclo piu breve)', efficacia: 70 },
      { nome: 'Digital (per awareness, non per vendita diretta)', efficacia: 30 },
    ],
    stagionalita: 'I budget ospedalieri si stanziano a gennaio. Le gare escono con 3-6 mesi di ritardo. Congressi medici: marzo-aprile e ottobre-novembre.',
    kpi: [
      { nome: 'Conversion rate trial clinico -> ordine', benchmark: '55-75%' },
      { nome: 'Durata media contratto ospedaliero', benchmark: '24-48 mesi' },
      { nome: 'Valore medio contratto ospedale', benchmark: '50k-500k EUR/anno' },
    ],
    valore_cliente: '30k-2M EUR/anno per ospedale (dipende da categoria)',
    maturita: [
      'Database aggiornato di tutte le gare pubbliche attive (CIG)',
      'KOL network strutturato con almeno 1 per specializzazione',
      'Dossier farmacoeconomico per ogni prodotto core',
      'ISF con quota visita tracciata e CRM aggiornato ogni settimana',
    ],
  },

  commercio_auto_moto: {
    ciclo_fasi: [
      { fase: 'Lead da portale/sito/showroom', durata: '1-3 gg', note: 'Il cliente fa ricerca online prima di venire.' },
      { fase: 'Contatto + appuntamento', durata: '1-5 gg', note: 'La velocita di risposta al lead e critica (< 1 ora).' },
      { fase: 'Visita showroom + prova su strada', durata: '1-2 gg', note: 'Il test drive chiude il 60% dei clienti indecisi.' },
      { fase: 'Valutazione usato + finanziamento', durata: '1-5 gg', note: 'Il 70% dei clienti usa finanziamento. E un prodotto da vendere.' },
      { fase: 'Ordine + consegna', durata: '1-12 sett.', note: 'Dipende da disponibilita e configurazione.' },
    ],
    struttura_commerciale: 'Venditori showroom + responsabile commerciale + F&I (Finance & Insurance) manager. Il BDC (Business Development Center) gestisce i lead digitali.',
    obiezioni: [
      '"Trovo lo stesso online a meno" -- il valore del concessionario e: finanziamento, usato, garanzia, assistenza post-vendita.',
      '"Devo pensarci" -- il 70% di chi "ci pensa" compra da un competitor entro 2 settimane. Follow-up entro 24h.',
      '"L\'usato vale poco" -- mostra la stima online (Eurotax) prima della proposta. Trasparenza = fiducia.',
    ],
    canali: [
      { nome: 'Portali (AutoScout24, Autovit, OLX)', efficacia: 88 },
      { nome: 'Google Ads (marchio + modello)', efficacia: 80 },
      { nome: 'Showroom + walk-in', efficacia: 72 },
      { nome: 'Database clienti per sostituzione', efficacia: 68 },
      { nome: 'Social (Meta Ads, Instagram)', efficacia: 52 },
    ],
    stagionalita: 'Picchi: marzo-aprile (targhe nuove) e settembre-ottobre. Calo estivo. Le immatricolazioni di fine anno (novembre-dicembre) spingono i dealer a scontare per raggiungere i target.',
    kpi: [
      { nome: 'Lead response time', benchmark: 'Top dealer: < 15 minuti' },
      { nome: 'Tasso lead -> appuntamento', benchmark: '25-40%' },
      { nome: 'Penetrazione F&I (finanziamento/assicurazione)', benchmark: 'Top: > 60% delle vendite' },
    ],
    valore_cliente: '15k-60k EUR per transazione . 3-5 anni per riacquisto medio',
    maturita: [
      'BDC dedicato con SLA di risposta lead < 15 minuti',
      'CRM con workflow automatizzato per follow-up a 3/7/30 giorni',
      'F&I manager dedicato con formazione certificata',
      'Programma di sostituzione proattiva (contatto cliente a 36 mesi)',
    ],
  },

  commercio_abbigliamento_dettaglio: {
    ciclo_fasi: [
      { fase: 'Attrattiva vetrina / passaggio', durata: 'Immediata', note: 'La vetrina e la vendita. Cambia ogni 2 settimane.' },
      { fase: 'Accoglienza e approccio', durata: '1-3 min', note: 'Il primo approccio sbagliato fa uscire il cliente.' },
      { fase: 'Consulenza look / styling', durata: '10-30 min', note: 'Il consulente di stile vende 3x il prodotto.' },
      { fase: 'Prova e decisione', durata: '5-20 min', note: 'Il camerino chiude. Chi prova, compra.' },
      { fase: 'Checkout + fidelity', durata: '3-5 min', note: 'Il momento della carta fedelta e il momento della retention.' },
    ],
    struttura_commerciale: 'Store manager + commessi specializzati. Lo styling advisor e il ruolo piu efficace per l\'upsell. La fidelity card e lo strumento principale di retention.',
    obiezioni: [
      '"Costa troppo" -- mostra il costo per utilizzo, non il prezzo assoluto.',
      '"Ci penso" -- offri la prenotazione del capo. Il 40% torna.',
      '"Online costa meno" -- differenziati con il servizio: prova, abbinamento, styling.',
    ],
    canali: [
      { nome: 'Vetrina e posizione fisica (traffico pedonale)', efficacia: 85 },
      { nome: 'Instagram/TikTok (look del giorno)', efficacia: 72 },
      { nome: 'Fidelity card + newsletter', efficacia: 68 },
      { nome: 'WhatsApp per clienti VIP', efficacia: 62 },
      { nome: 'Google Maps + recensioni', efficacia: 55 },
    ],
    stagionalita: 'Saldi: gennaio e luglio (picco di traffico, basso margine). Natale: novembre-dicembre. Primavera: marzo-aprile. La stagione e tutto nel retail fashion.',
    kpi: [
      { nome: 'Conversion rate (ingressi -> acquisti)', benchmark: 'Top: > 35%' },
      { nome: 'Scontrino medio', benchmark: '60-180 EUR' },
      { nome: 'Frequenza visita cliente fidelizzato', benchmark: '4-8 volte/anno' },
    ],
    valore_cliente: '300-1.500 EUR/anno per cliente fidelizzato',
    maturita: [
      'WhatsApp business per clienti VIP con preview novita esclusive',
      'Styling service su appuntamento per i top 50 clienti',
      'Analytics vendita per categoria + sell-through settimanale',
      'Fidelity card con tier system e accesso anticipato ai saldi',
    ],
  },

  commercio_orologi_gioielli: {
    ciclo_fasi: [
      { fase: 'Contatto (spesso per occasione)', durata: '1-4 sett.', note: 'L\'acquisto e legato a un evento: matrimonio, anniversario, regalo.' },
      { fase: 'Visita in negozio + consulenza', durata: '30-90 min', note: 'L\'esperienza in store e tutto. Serve lusso e cura.' },
      { fase: 'Proposta personalizzata', durata: '1-3 gg', note: 'Per pezzi importanti: piu visite. La fretta uccide la vendita.' },
      { fase: 'Decisione (spesso di coppia)', durata: '1-7 gg', note: 'Spesso la decisione finale e di coppia.' },
      { fase: 'Acquisto + after-sale', durata: 'Immediato', note: 'La custodia, il certificato, la pulizia: tutto conta.' },
    ],
    struttura_commerciale: 'Store manager esperto + specialisti di prodotto. Il venditore di gioielli e orologi di lusso deve avere cultura del prodotto, non solo tecniche di vendita.',
    obiezioni: [
      '"Online costa meno" -- autenticita, esperienza, garanzia, assistenza. Il lusso non si compra su Amazon.',
      '"Non so se e il pezzo giusto" -- il consulente esperto guida la scelta senza pressione.',
      '"E troppo costoso" -- posiziona il pezzo come investimento (gli orologi apprezzano di valore).',
    ],
    canali: [
      { nome: 'Passaparola e referral clienti', efficacia: 90 },
      { nome: 'Vetrina + posizione premium', efficacia: 82 },
      { nome: 'Instagram (lifestyle, eventi)', efficacia: 70 },
      { nome: 'Serate/eventi VIP per clienti', efficacia: 68 },
      { nome: 'Google (ricerche brand specifici)', efficacia: 55 },
    ],
    stagionalita: 'Natale (novembre-dicembre): 35-40% del fatturato annuo. San Valentino: picco gioielli. Periodo matrimoni (maggio-giugno): picco fedi e anelli. Estate: bassa.',
    kpi: [
      { nome: 'Scontrino medio', benchmark: '500-5.000 EUR (orologi premium: 10k-50k EUR)' },
      { nome: 'Frequenza acquisto cliente abituale', benchmark: '1-2 volte/anno per eventi' },
      { nome: 'Tasso di referral', benchmark: 'Top: 1 nuovo cliente ogni 2 acquisti' },
    ],
    valore_cliente: '1k-20k EUR/anno per cliente fedele . fino a 100k EUR per collezionisti',
    maturita: [
      'Database clienti con storico acquisti e occasioni (anniversari, compleanni)',
      'Reminder automatico pre-anniversario/compleanno per suggerire acquisto',
      'Serate VIP private con anteprima nuove collezioni',
      'Servizio di personalizzazione e incisione come differenziante',
    ],
  },

  // =======================================================
  // ALIMENTARE
  // =======================================================

  alimentare_trasformazione: {
    ciclo_fasi: [
      { fase: 'Incontro fiera / contatto broker', durata: '1-2 sett.', note: 'CIBUS e TuttoFood sono i momenti chiave.' },
      { fase: 'Campionatura e analisi', durata: '2-4 sett.', note: 'Il buyer fa analisi sensoriali e analisi chimiche.' },
      { fase: 'Negoziazione listino + condizioni', durata: '1-3 sett.', note: 'Sconti, premi fine anno, contributi promozione.' },
      { fase: 'Approvazione etichette (GDO)', durata: '2-6 sett.', note: 'La GDO ha iter burocratici lenti e rigidi.' },
      { fase: 'Primo ordine + listing', durata: '1-4 sett.', note: 'Il listing fee GDO e realta per i nuovi prodotti.' },
    ],
    struttura_commerciale: 'Area manager per canale (GDO, HO.RE.CA., Specialty food). Il broker internazionale per l\'export. Il trade marketing manager gestisce le promozioni con la GDO.',
    obiezioni: [
      '"Abbiamo gia fornitori per questa categoria" -- differenziati su origine, certificazioni (bio, DOP, IGP).',
      '"Il prezzo e troppo alto" -- il consumatore finale paga il posizionamento premium.',
      '"Non abbiamo spazio assortimentale" -- il sell-out veloce crea spazio da solo.',
    ],
    canali: [
      { nome: 'Fiere nazionali (CIBUS, Vinitaly, TuttoFood)', efficacia: 88 },
      { nome: 'Broker GDO + agenti specializzati', efficacia: 85 },
      { nome: 'Contatto diretto buyer GDO', efficacia: 72 },
      { nome: 'Export: broker internazionali (Anuga, SIAL)', efficacia: 68 },
      { nome: 'Digital B2B (RangeMe, piattaforme buyer)', efficacia: 35 },
    ],
    stagionalita: 'Molto legato alla categoria. I budget GDO si definiscono a ottobre-novembre. Le promozioni stagionali (Natale, Pasqua, estate) vanno pianificate 4-6 mesi prima.',
    kpi: [
      { nome: 'Numero referenze in listing GDO', benchmark: 'Obiettivo minimo: 3-5 per canale' },
      { nome: 'Sell-through medio mensile per referenza', benchmark: '> 80% dello stock consegnato' },
      { nome: 'Margine lordo medio', benchmark: '35-55% sul prezzo di vendita al consumatore' },
    ],
    valore_cliente: '50k-2M EUR/anno per catena GDO regionale',
    maturita: [
      'Trade marketing manager dedicato per top 5 insegne GDO',
      'Sistema ECR (Efficient Consumer Response) con dati sell-out condivisi',
      'Piano promozionale annuale concordato con 12 mesi di anticipo',
      'Certificazioni (BIO, DOP, IGP, IFS) come leva commerciale attiva',
    ],
  },

  alimentare_vini: {
    ciclo_fasi: [
      { fase: 'Degustazione / visita cantina', durata: '1-3 gg', note: 'L\'esperienza cantina e gia vendita. Invita i buyer.' },
      { fase: 'Campionatura e analisi', durata: '1-3 sett.', note: 'Il buyer porta i campioni all\'enoteca o al ristorante.' },
      { fase: 'Negoziazione listino e condizioni', durata: '1-2 sett.', note: 'Sconti volume, esclusiva territoriale, marketing fund.' },
      { fase: 'Primo ordine', durata: '1-2 sett.', note: 'Spesso piccolo ordine di prova.' },
      { fase: 'Riordini stagionali', durata: 'Trimestrale', note: 'Il vino si ordina per stagione o per vendemmia.' },
    ],
    struttura_commerciale: 'Agenti monomandatari di zona + export manager. La cantina di piccole dimensioni spesso vende direttamente. Il wine club / DTC (Direct to Consumer) e il futuro.',
    obiezioni: [
      '"Ho gia troppe etichette in carta" -- differenziati su unicita: territorio, biologico, storia.',
      '"Il prezzo non e competitivo" -- il vino non e commodity. Il posizionamento e tutto.',
      '"Non ho spazio in cantina" -- consegna just-in-time, niente stock minimo obbligatorio.',
    ],
    canali: [
      { nome: 'Vinitaly, Prowein, Vinexpo', efficacia: 92 },
      { nome: 'Enoteca e wine bar (HO.RE.CA. specialty)', efficacia: 80 },
      { nome: 'Wine export (broker/importer USA, Germania, UK)', efficacia: 75 },
      { nome: 'DTC / Wine club diretto al consumatore', efficacia: 65 },
      { nome: 'Instagram / wine influencer', efficacia: 50 },
    ],
    stagionalita: 'Picco ordini: ottobre-novembre (Natale) e marzo-aprile (Pasqua + primavera). L\'annuncio della nuova vendemmia e un evento commerciale. Estate: turismo enoico.',
    kpi: [
      { nome: 'Fatturato export vs. Italia', benchmark: 'Top cantina media: 40-60% export' },
      { nome: 'Prezzo medio bottiglia', benchmark: 'Segmento premium: > 15 EUR alla cantina' },
      { nome: 'Wine club: rinnovo abbonamento annuo', benchmark: 'Top performer: > 70%' },
    ],
    valore_cliente: '5k-100k EUR/anno per importatore/distributore . 200-2.000 EUR/anno per wine club member',
    maturita: [
      'Wine club con membership e spedizioni programmate',
      'Export in almeno 3 mercati con importatore dedicato',
      'Wine tourism: visite cantina monetizzate come lead generation',
      'Presenza costante sulle guide internazionali (Parker, Gambero Rosso)',
    ],
  },

  alimentare_forno: {
    ciclo_fasi: [
      { fase: 'Presentazione campionatura', durata: '1 sett.', note: 'Il prodotto si vende mangiandolo. La degustazione e obbligatoria.' },
      { fase: 'Test scaffale/banco', durata: '2-4 sett.', note: 'Il cliente mette il prodotto in prova per 4 settimane.' },
      { fase: 'Valutazione sell-out', durata: '2-4 sett.', note: 'Se vende, resta. Se non vende, esce.' },
      { fase: 'Accordo fornitura continuativa', durata: '1 sett.', note: 'Frequenza consegna, MOQ, condizioni reso.' },
      { fase: 'Crescita assortimento', durata: 'Progressiva', note: 'Il successo di un prodotto apre la porta agli altri.' },
    ],
    struttura_commerciale: 'Agenti di zona + responsabile HO.RE.CA. I prodotti freschi richiedono consegna diretta o distribuzione capillare. La freschezza e il primo argomento di vendita.',
    obiezioni: [
      '"I tuoi prodotti durano poco" -- la breve shelf life e il segno della qualita. Educalo.',
      '"Ho gia il fornitore da anni" -- portaci con una referenza nuova, non in conflitto.',
      '"Non gestisco i prodotti freschi" -- proponi un distributore intermedio per i punti lontani.',
    ],
    canali: [
      { nome: 'Agenti + distribuzione diretta', efficacia: 88 },
      { nome: 'HO.RE.CA. (bar, ristoranti, hotel)', efficacia: 80 },
      { nome: 'GDO locale + supermercati indipendenti', efficacia: 72 },
      { nome: 'Fiere (Sigep, HostMilano)', efficacia: 65 },
      { nome: 'Instagram (food porn, ricette)', efficacia: 48 },
    ],
    stagionalita: 'Natale e Pasqua: picco assoluto (panettone, colomba, pastiera). Estate: calo per prodotti invernali. I prodotti da colazione sono stabili tutto l\'anno.',
    kpi: [
      { nome: 'Frequenza consegna media', benchmark: '2-3 volte/settimana per prodotti freschi' },
      { nome: 'Tasso di reso invenduto', benchmark: 'Top: < 5% del consegnato' },
      { nome: 'Fill rate ordini', benchmark: '> 98% (la rottura di stock in panetteria e intollerabile)' },
    ],
    valore_cliente: '5k-60k EUR/anno per punto vendita attivo',
    maturita: [
      'Analisi sell-out condivisa con i top 30 clienti per ottimizzare gli ordini',
      'Prodotto personalizzato (private label o packaging dedicato) per i top clienti',
      'Sistema di preordine automatico basato sulle vendite storiche',
      'Certificazioni qualita (IFS, BRC) per accesso alla GDO strutturata',
    ],
  },

  alimentare_conserve: {
    ciclo_fasi: [
      { fase: 'Contatto buyer GDO o HO.RE.CA.', durata: '2-4 sett.', note: 'Il buyer GDO va prima convinto con i dati di sell-out.' },
      { fase: 'Campionatura + analisi laboratorio', durata: '2-4 sett.', note: 'Il buyer fa analisi sensoriali e microbiologiche.' },
      { fase: 'Negoziazione listino annuale', durata: '2-4 sett.', note: 'I contratti sono annuali con revisione prezzi.' },
      { fase: 'Approvazione etichette e claim', durata: '3-6 sett.', note: 'La GDO ha regole rigide su claim e packaging.' },
      { fase: 'Listing e primi ordini', durata: '2-4 sett.', note: 'Il listing fee e spesso richiesto dalla GDO.' },
    ],
    struttura_commerciale: 'KAM per GDO + agenti HO.RE.CA. Il private label e una quota significativa per molti produttori (20-50% del fatturato). Il canale export e strategico.',
    obiezioni: [
      '"La categoria e gia piena" -- differenziati su formato, ingredienti, origine certificata.',
      '"Il prezzo e superiore ai competitor" -- posizionamento premium vs. primo prezzo: non competere sui costi.',
      '"Non gestiamo i marchi piccoli" -- inizia con il canale specialty e cresce verso la GDO.',
    ],
    canali: [
      { nome: 'KAM diretto su GDO nazionale/regionale', efficacia: 85 },
      { nome: 'Broker internazionali per export', efficacia: 78 },
      { nome: 'HO.RE.CA. (agenti specializzati food service)', efficacia: 70 },
      { nome: 'Fiere (CIBUS, SIAL Paris, Anuga)', efficacia: 72 },
      { nome: 'E-commerce DTC (Amazon, sito proprio)', efficacia: 45 },
    ],
    stagionalita: 'Natale (pomodori, sughi, conserve regalo): picco ottobre-dicembre. Estate: conserve di stagione (pomodoro, peperoni). Tutto l\'anno per le referenze base.',
    kpi: [
      { nome: 'Numero referenze per insegna GDO', benchmark: 'Obiettivo: 5-15 SKU' },
      { nome: 'Margine industria (EX-FACTORY)', benchmark: '25-45%' },
      { nome: 'Export su fatturato totale', benchmark: 'Top PMI: 30-50%' },
    ],
    valore_cliente: '100k-2M EUR/anno per catena GDO . 10k-100k EUR per importatore estero',
    maturita: [
      'ECR con i top 5 clienti GDO: dati di sell-out settimanali condivisi',
      'Piano annuale di sviluppo assortimento condiviso con ogni buyer',
      'Private label come leva per entrare in insegne difficili',
      'Certificazioni BRC/IFS di primo livello per l\'export',
    ],
  },

  alimentare_ingredienti: {
    ciclo_fasi: [
      { fase: 'Contatto R&D + ufficio acquisti', durata: '2-4 sett.', note: 'Serve doppio interlocutore: tecnico + commerciale.' },
      { fase: 'Campioni tecnici + schede', durata: '2-6 sett.', note: 'Il R&D testa l\'ingrediente nel prodotto finito.' },
      { fase: 'Scale-up e validazione', durata: '4-12 sett.', note: 'Dal laboratorio alla produzione industriale.' },
      { fase: 'Accordo fornitura continuativa', durata: '2-4 sett.', note: 'Contratto annuale con forecast.' },
      { fase: 'Sviluppo nuove applicazioni', durata: 'Continuo', note: 'Il fornitore che porta innovazione resta per anni.' },
    ],
    struttura_commerciale: 'Application specialist (tecnico + commerciale) + KAM per i grandi clienti industriali. La vendita e consulenziale: non si vende un ingrediente, si vende la soluzione.',
    obiezioni: [
      '"Abbiamo gia il fornitore per questa materia prima" -- entra con una funzionalita che il concorrente non ha.',
      '"Il prezzo e troppo alto" -- costo in uso (dose efficace x prezzo) vs. prezzo al kg.',
      '"Non possiamo cambiare fornitore senza validare" -- supporta il processo di validazione gratuitamente.',
    ],
    canali: [
      { nome: 'Application lab + demo tecniche', efficacia: 90 },
      { nome: 'Fiere (Food Ingredients Europe, IFT)', efficacia: 85 },
      { nome: 'Contatto diretto R&D manager', efficacia: 78 },
      { nome: 'Pubblicazioni scientifiche e white paper', efficacia: 60 },
      { nome: 'LinkedIn (food scientist, R&D director)', efficacia: 55 },
    ],
    stagionalita: 'Relativamente stabile. I lanci di nuovi prodotti seguono i cicli della GDO (primavera e autunno). I budget R&D si approvano a settembre-ottobre.',
    kpi: [
      { nome: 'Durata media relazione cliente', benchmark: '5-10 anni (alta stickiness)' },
      { nome: 'Valore medio contratto annuo', benchmark: '50k-500k EUR' },
      { nome: 'Revenue da nuove applicazioni', benchmark: 'Top performer: > 20% del fatturato/anno' },
    ],
    valore_cliente: '100k-2M EUR/anno per cliente industriale strutturato',
    maturita: [
      'Application lab accessibile ai clienti per co-sviluppo',
      'Application specialist dedicato per i top 10 clienti',
      'White paper e webinar tecnici per positioning da expert',
      'Co-sviluppo prodotti con i key account per lock-in strategico',
    ],
  },

  // =======================================================
  // TECH
  // =======================================================

  tech_saas: {
    ciclo_fasi: [
      { fase: 'Lead (inbound o outbound)', durata: '1-2 sett.', note: 'Il PLG (Product-Led Growth) riduce il ciclo drasticamente.' },
      { fase: 'Demo personalizzata', durata: '3-5 gg', note: 'La demo deve replicare il caso d\'uso specifico del cliente.' },
      { fase: 'Trial gratuito (14-30 gg)', durata: '2-4 sett.', note: 'L\'attivazione entro 48h dal trial e predittiva del close.' },
      { fase: 'Negoziazione piano + contratto', durata: '1-3 sett.', note: 'Annuale vs. mensile. L\'annuale ha tasso di churn molto piu basso.' },
      { fase: 'Onboarding + customer success', durata: '2-4 sett.', note: 'Il primo valore percepito nei 30 gg decide il rinnovo.' },
    ],
    struttura_commerciale: 'SDR (inbound qualifica) + AE (Account Executive per demo/close) + CSM (Customer Success Manager per retention). Il rapporto AE/CSM e la chiave della crescita.',
    obiezioni: [
      '"Abbiamo gia uno strumento simile" -- ROI comparison: tempo risparmiato x costo orario.',
      '"E troppo costoso" -- costo mensile per utente vs. alternativa: spesso < 1 ora di lavoro.',
      '"Non siamo pronti per il cambio" -- change management: proponi onboarding guidato.',
    ],
    canali: [
      { nome: 'Inbound + content marketing + SEO', efficacia: 85 },
      { nome: 'Product-Led Growth (trial self-service)', efficacia: 80 },
      { nome: 'LinkedIn SDR outbound', efficacia: 65 },
      { nome: 'Partner / reseller network', efficacia: 58 },
      { nome: 'G2, Capterra (review platform)', efficacia: 55 },
    ],
    stagionalita: 'Q1 e Q3 sono i picchi di nuovi contratti (budget appena approvati). Q4: rinnovi e upsell. Agosto: lento. Il churn e piu alto a gennaio (revisione tool aziendali).',
    kpi: [
      { nome: 'MRR (Monthly Recurring Revenue)', benchmark: 'Crescita target: > 10% mese su mese early stage' },
      { nome: 'CAC (Customer Acquisition Cost)', benchmark: 'Target: recupero < 12 mesi (LTV/CAC > 3x)' },
      { nome: 'Churn rate mensile', benchmark: 'Top SaaS B2B: < 1% mensile' },
      { nome: 'NRR (Net Revenue Retention)', benchmark: 'Top: > 120% (espansione > churn)' },
      { nome: 'Trial to paid conversion', benchmark: 'Top performer: > 25%' },
      { nome: 'Ticket medio annuale (ACV)', benchmark: 'SMB: 1.200-12.000 EUR . Mid-market: 12k-80k EUR' },
    ],
    valore_cliente: '1.200-80.000 EUR/anno (ACV) . LTV: 3-8x ACV',
    maturita: [
      'NRR > 110% (upsell + espansione > churn)',
      'Time to first value < 24h dall\'attivazione',
      'CSM dedicato per clienti > 5k EUR/anno',
      'Product analytics (Mixpanel, Amplitude) per prevenire il churn',
    ],
  },

  tech_system_integrator: {
    ciclo_fasi: [
      { fase: 'Identificazione opportunita (RFP o proactive)', durata: '2-4 sett.', note: 'Le RFP formali arrivano tardi. Bisogna essere nel processo prima.' },
      { fase: 'Assessment tecnico', durata: '1-3 sett.', note: 'Analisi dell\'infrastruttura esistente. Spesso gratuita.' },
      { fase: 'Proposta tecnica dettagliata', durata: '2-4 sett.', note: 'Documento complesso: architettura, tempi, team, SLA.' },
      { fase: 'Valutazione e short list', durata: '2-6 sett.', note: 'Spesso si compete contro 3-5 system integrator.' },
      { fase: 'Negoziazione e contratto', durata: '2-4 sett.', note: 'Contratto quadro + statement of work per ogni progetto.' },
    ],
    struttura_commerciale: 'Account executive + pre-sales architect (technical win). Per i grandi clienti: virtual team con delivery manager. Il vendor certification (Microsoft Gold, etc.) apre le porte.',
    obiezioni: [
      '"Abbiamo gia un system integrator" -- entrate su un progetto specifico non coperto dall\'attuale SI.',
      '"Non conosciamo la vostra azienda" -- referenze in settore + certificazioni vendor sono il passaporto.',
      '"Il prezzo e troppo alto" -- costruisci il TCO completo che includa i costi dell\'alternativa.',
    ],
    canali: [
      { nome: 'Partner program vendor (Microsoft, AWS, SAP)', efficacia: 88 },
      { nome: 'Referral da clienti esistenti', efficacia: 82 },
      { nome: 'LinkedIn (CTO, IT director)', efficacia: 62 },
      { nome: 'Eventi vendor + hackathon', efficacia: 55 },
      { nome: 'Risposta a gare/RFP pubbliche', efficacia: 50 },
    ],
    stagionalita: 'I budget IT si decidono a Q4 per l\'anno successivo. Picco nuovi progetti: Q1 e Q3. I progetti pubblici seguono i cicli delle gare (variabile).',
    kpi: [
      { nome: 'Revenue per dipendente tecnico', benchmark: '80k-150k EUR/anno' },
      { nome: 'Tasso utilizzo (billable hours)', benchmark: 'Top: > 75% del disponibile' },
      { nome: 'Valore medio progetto', benchmark: '50k-500k EUR' },
    ],
    valore_cliente: '100k-2M EUR/anno per cliente enterprise strutturato',
    maturita: [
      'Certification center interno con almeno 3 vendor premier partnership',
      'Delivery excellence: NPS progetto > 50 misurato a fine delivery',
      'Framework proprietary per assessment e proposal (accelera il ciclo)',
      'Programma di sviluppo continuo per i pre-sales architect',
    ],
  },

  tech_digital_agency: {
    ciclo_fasi: [
      { fase: 'Brief iniziale', durata: '1 sett.', note: 'Il cliente spesso non sa cosa vuole. Aiutalo a definirlo.' },
      { fase: 'Proposta creativa + commerciale', durata: '1-2 sett.', note: 'La qualita della proposta e gia la vendita.' },
      { fase: 'Confronto con altre agenzie', durata: '1-3 sett.', note: 'Il cliente fa sempre 2-3 brief contemporanei.' },
      { fase: 'Negoziazione e kick-off', durata: '1 sett.', note: 'Il contratto deve definire chiaramente scope e revisioni.' },
      { fase: 'Delivery e upsell', durata: 'Variabile', note: 'Il progetto finito apre la porta al retainer.' },
    ],
    struttura_commerciale: 'New business manager + account director per i clienti esistenti. Il portafoglio clienti e il vero asset. Il retainer mensile e il modello di revenue piu stabile.',
    obiezioni: [
      '"Avete gia lavorato nel nostro settore?" -- il portfolio e i case study devono rispondere prima di te.',
      '"Perche costate piu degli altri?" -- qualita, seniority del team, metodologia comprovata.',
      '"Possiamo fare tutto internamente" -- mostra il costo opportunita delle risorse interne.',
    ],
    canali: [
      { nome: 'Referral da clienti soddisfatti', efficacia: 90 },
      { nome: 'Portfolio online + case study', efficacia: 78 },
      { nome: 'LinkedIn (CMO, marketing director)', efficacia: 68 },
      { nome: 'Premi di settore (best of web, awwwards)', efficacia: 58 },
      { nome: 'Cold outreach con portfolio specifico per settore', efficacia: 22 },
    ],
    stagionalita: 'Picco brief: settembre-ottobre (budget annuali) e gennaio-febbraio (nuovi obiettivi). Le campagne natalizie si pianificano a settembre. Estate: lenta.',
    kpi: [
      { nome: 'Revenue per persona', benchmark: '60k-120k EUR/anno' },
      { nome: 'Percentuale retainer su fatturato', benchmark: 'Obiettivo: > 50%' },
      { nome: 'Tasso rinnovo retainer', benchmark: 'Top agenzie: > 80% annuo' },
    ],
    valore_cliente: '20k-200k EUR/anno per cliente in retainer . fino a 500k per progetti grandi',
    maturita: [
      'Piu del 50% del fatturato da retainer ricorrenti',
      'Case study strutturati con KPI misurabili per ogni settore',
      'Nessun cliente oltre il 25% del fatturato totale (diversificazione rischio)',
      'Processo di briefing standardizzato che filtra i clienti non adatti',
    ],
  },

  tech_automazione: {
    ciclo_fasi: [
      { fase: 'Analisi processo produttivo', durata: '2-4 sett.', note: 'Il sopralluogo tecnico e obbligatorio. Non si vende da remoto.' },
      { fase: 'Studio di fattibilita', durata: '2-6 sett.', note: 'Spesso e un servizio a pagamento. Filtra i clienti seri.' },
      { fase: 'Proposta tecnica + ROI', durata: '2-4 sett.', note: 'Il payback period e l\'argomento centrale (target: < 24 mesi).' },
      { fase: 'Negoziazione e approvazione', durata: '2-8 sett.', note: 'Spesso serve approvazione del board o accesso a finanziamenti.' },
      { fase: 'Progettazione, installazione, collaudo', durata: '3-18 mesi', note: 'Il progetto e lungo. La gestione del cliente e critica.' },
    ],
    struttura_commerciale: 'Tecnici commerciali senior con background ingegneristico. Il pre-sales e quasi tutto tecnico. I progetti grandi richiedono un project sponsor nel management del cliente.',
    obiezioni: [
      '"E troppo costoso" -- calcola il ROI: risparmio manodopera + scarti + velocita produttiva.',
      '"Non abbiamo il personale per gestirlo" -- proponi il training e il contratto di manutenzione.',
      '"Non e il momento giusto" -- i bandi Industria 4.0 / transizione 5.0 creano urgenza artificiale.',
    ],
    canali: [
      { nome: 'Fiere (SPS, Mecspe, EMO)', efficacia: 88 },
      { nome: 'Referral da clienti soddisfatti', efficacia: 85 },
      { nome: 'Partner OEM (integratori di macchine)', efficacia: 78 },
      { nome: 'Bandi e incentivi 4.0/5.0 (generano lead)', efficacia: 70 },
      { nome: 'LinkedIn (operations manager, plant manager)', efficacia: 55 },
    ],
    stagionalita: 'I piani di investimento si definiscono a Q4. I bandi Industria 4.0 (iperammortamento, credito d\'imposta) creano picchi di domanda quando vengono approvati o prorogati.',
    kpi: [
      { nome: 'Valore medio progetto', benchmark: '100k-2M EUR' },
      { nome: 'Payback period proposto al cliente', benchmark: 'Obiettivo: < 24 mesi' },
      { nome: 'Revenue contratti manutenzione post-vendita', benchmark: 'Obiettivo: 20-30% del fatturato' },
    ],
    valore_cliente: '200k-5M EUR per progetto . 30k-200k EUR/anno per manutenzione',
    maturita: [
      'Studio di fattibilita come servizio a pagamento (filtra e prequalifica)',
      'ROI calculator personalizzato per ogni settore di applicazione',
      'Contratti di manutenzione predittiva con IoT integrato',
      'Finanziamento chiavi in mano con leasing operativo proposto',
    ],
  },

};