var DIAGNOSI_DOMANDE = {

  // ─────────────────────────────────────────────
  // 1. B2B MANIFATTURIERO
  // ─────────────────────────────────────────────
  b2b_manifatturiero: {
    vendite: [
      { id:'v1', testo:'Hai un listino aggiornato con margini verificati per ogni linea di prodotto?', tipo:'yn', peso:3 },
      { id:'v2', testo:'I tuoi commerciali visitano almeno 5 nuovi prospect al mese?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Conosci il valore totale delle offerte aperte in questo momento?', tipo:'yn', peso:3 },
      { id:'p2', testo:'Registri sistematicamente il motivo di ogni offerta persa?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Il titolare può assentarsi 2 settimane senza impatto sulle vendite?', tipo:'yn', peso:3 },
      { id:'t2', testo:'Hai almeno un commerciale dedicato esclusivamente ai nuovi clienti?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Esiste una procedura scritta per la gestione delle offerte tecniche?', tipo:'yn', peso:3 },
      { id:'pr2', testo:'Il passaggio dal commerciale alla produzione avviene con un documento standard?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Il tuo cliente più grande pesa meno del 20% del fatturato totale?', tipo:'yn', peso:3 },
      { id:'r2', testo:'Hai aumentato i prezzi almeno una volta negli ultimi 12 mesi?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Partecipi ad almeno 2 fiere di settore all\'anno come espositore?', tipo:'yn', peso:2 },
      { id:'m2', testo:'Hai un catalogo tecnico aggiornato disponibile anche in formato digitale?', tipo:'yn', peso:2 },
    ],
    sitoweb: [
      { id:'s1', testo:'Il sito mostra schede tecniche scaricabili per i tuoi prodotti principali?', tipo:'yn', peso:3 },
      { id:'s2', testo:'Ricevi almeno 3 richieste di preventivo al mese dal sito web?', tipo:'yn', peso:2 },
    ],
    ecommerce: [
      { id:'e1', testo:'Gestisci la vendita di ricambi o accessori tramite un canale online?', tipo:'yn', peso:2 },
      { id:'e2', testo:'Hai almeno 3 fornitori attivi per la materia prima principale?', tipo:'yn', peso:3 },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. B2B SERVIZI
  // ─────────────────────────────────────────────
  b2b_servizi: {
    vendite: [
      { id:'v1', testo:'Hai un processo strutturato per qualificare i lead prima di fare proposte?', tipo:'yn', peso:3 },
      { id:'v2', testo:'Presenti almeno 4 nuove proposte commerciali al mese?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Hai una previsione scritta dei ricavi attesi nei prossimi 90 giorni?', tipo:'yn', peso:3 },
      { id:'p2', testo:'Tracci il tempo medio tra primo contatto e firma del contratto?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Il know-how critico è documentato e non dipende da una sola persona?', tipo:'yn', peso:3 },
      { id:'t2', testo:'Hai un piano di onboarding strutturato per i nuovi consulenti?', tipo:'yn', peso:2 },
      { id:'t3', testo:'Almeno 2 persone nel team possono gestire i clienti chiave?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Hai SLA definiti e misurati per ogni tipologia di servizio erogato?', tipo:'yn', peso:3 },
      { id:'pr2', testo:'Raccogli feedback strutturato dai clienti alla fine di ogni progetto?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Il fatturato ricorrente (contratti annuali) supera il 30% del totale?', tipo:'yn', peso:3 },
      { id:'r2', testo:'Hai aumentato il valore medio dei contratti rispetto all\'anno scorso?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Pubblichi almeno 2 case study all\'anno con risultati misurabili?', tipo:'yn', peso:2 },
      { id:'m2', testo:'Hai un programma attivo di referral con i clienti esistenti?', tipo:'yn', peso:3 },
    ],
    sitoweb: [
      { id:'s1', testo:'Il sito contiene una sezione dedicata ai risultati ottenuti dai clienti?', tipo:'yn', peso:2 },
      { id:'s2', testo:'Hai un modulo di richiesta consulenza che genera notifiche in tempo reale?', tipo:'yn', peso:2 },
    ],
    ecommerce: [
      { id:'e1', testo:'Vendi pacchetti o servizi standardizzati acquistabili direttamente online?', tipo:'yn', peso:2 },
      { id:'e2', testo:'Offri un\'area clienti riservata per documentazione e fatture?', tipo:'yn', peso:2 },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. EDILIZIA
  // ─────────────────────────────────────────────
  edilizia: {
    vendite: [
      { id:'v1', testo:'Hai un processo per rispondere ai preventivi entro 48 ore?', tipo:'yn', peso:3 },
      { id:'v2', testo:'Mantieni rapporti attivi con almeno 3 studi tecnici o progettisti?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Hai visibilità sui cantieri previsti per i prossimi 6 mesi?', tipo:'yn', peso:3 },
      { id:'p2', testo:'Tracci separatamente le trattative per lavori pubblici e privati?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Hai un capocantiere autonomo che gestisce i lavori senza il titolare?', tipo:'yn', peso:3 },
      { id:'t2', testo:'Il personale di cantiere ha le certificazioni di sicurezza aggiornate?', tipo:'yn', peso:2 },
      { id:'t3', testo:'Riesci a gestire 2 cantieri contemporanei senza rallentamenti?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Hai una checklist standard per l\'apertura e chiusura di ogni cantiere?', tipo:'yn', peso:3 },
      { id:'pr2', testo:'Gestisci la documentazione di cantiere con un sistema digitale?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Conosci il margine effettivo di ogni cantiere a consuntivo?', tipo:'yn', peso:3 },
      { id:'r2', testo:'Hai lavori programmati che coprono almeno i prossimi 3 mesi?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Documenti i lavori completati con foto professionali per il portfolio?', tipo:'yn', peso:2 },
      { id:'m2', testo:'Hai un sistema per raccogliere recensioni dai committenti soddisfatti?', tipo:'yn', peso:2 },
    ],
    sitoweb: [
      { id:'s1', testo:'Il sito mostra un portfolio aggiornato con immagini dei lavori realizzati?', tipo:'yn', peso:3 },
      { id:'s2', testo:'Le pagine del sito sono ottimizzate per ricerche locali nella tua zona?', tipo:'yn', peso:2 },
    ],
    ecommerce: [
      { id:'e1', testo:'Offri la possibilità di richiedere sopralluoghi o preventivi online?', tipo:'yn', peso:2 },
      { id:'e2', testo:'Hai un sistema per vendere materiali o servizi accessori ai clienti?', tipo:'yn', peso:2 },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. DISTRIBUZIONE
  // ─────────────────────────────────────────────
  distribuzione: {
    vendite: [
      { id:'v1', testo:'I tuoi agenti hanno obiettivi mensili scritti con incentivi legati ai risultati?', tipo:'yn', peso:3 },
      { id:'v2', testo:'Hai un processo per riattivare i clienti inattivi da più di 6 mesi?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Monitori il tasso di conversione tra preventivi inviati e ordini ricevuti?', tipo:'yn', peso:3 },
      { id:'p2', testo:'Hai visibilità sugli ordini previsti dai tuoi 10 clienti principali?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Il magazziniere gestisce spedizioni e resi senza intervento del titolare?', tipo:'yn', peso:3 },
      { id:'t2', testo:'Hai un responsabile commerciale che coordina la rete vendita?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Hai un sistema per la gestione automatica dei riordini sotto scorta minima?', tipo:'yn', peso:3 },
      { id:'pr2', testo:'Monitori i tempi di consegna e il tasso di evasione ordini completi?', tipo:'yn', peso:2 },
      { id:'pr3', testo:'Esiste una procedura standard per la gestione dei resi e dei reclami?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Conosci la marginalità per categoria merceologica e per cliente?', tipo:'yn', peso:3 },
      { id:'r2', testo:'Il fatturato del tuo cliente top pesa meno del 15% del totale?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Invii promozioni o volantini mirati almeno una volta al mese ai clienti?', tipo:'yn', peso:2 },
      { id:'m2', testo:'Hai un catalogo digitale consultabile online con disponibilità aggiornata?', tipo:'yn', peso:3 },
    ],
    sitoweb: [
      { id:'s1', testo:'Il sito permette ai clienti B2B di consultare prezzi e disponibilità?', tipo:'yn', peso:3 },
      { id:'s2', testo:'Le categorie prodotto sul sito sono strutturate per facilitare la ricerca?', tipo:'yn', peso:2 },
    ],
    ecommerce: [
      { id:'e1', testo:'I clienti abituali possono riordinare online senza passare dall\'agente?', tipo:'yn', peso:3 },
      { id:'e2', testo:'Hai integrato il gestionale con la piattaforma di vendita online?', tipo:'yn', peso:2 },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. RETAIL
  // ─────────────────────────────────────────────
  retail: {
    vendite: [
      { id:'v1', testo:'Il tuo scontrino medio è cresciuto rispetto a 12 mesi fa?', tipo:'yn', peso:3 },
      { id:'v2', testo:'Il personale propone attivamente prodotti complementari alla vendita?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Tracci il numero di ingressi in negozio e il tasso di conversione?', tipo:'yn', peso:3 },
      { id:'p2', testo:'Hai un piano promozionale trimestrale definito in anticipo?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Il negozio funziona normalmente anche quando il titolare non è presente?', tipo:'yn', peso:3 },
      { id:'t2', testo:'Il personale riceve formazione sui prodotti almeno ogni trimestre?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Hai un sistema per gestire riassortimenti basato sui dati di vendita?', tipo:'yn', peso:3 },
      { id:'pr2', testo:'Aggiorni il visual merchandising e le vetrine almeno ogni 2 settimane?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Conosci il fatturato al metro quadro del tuo punto vendita?', tipo:'yn', peso:2 },
      { id:'r2', testo:'Hai almeno il 20% dei ricavi da clienti fidelizzati e ricorrenti?', tipo:'yn', peso:3 },
    ],
    marketing: [
      { id:'m1', testo:'Hai un programma fedeltà attivo con almeno 200 clienti iscritti?', tipo:'yn', peso:3 },
      { id:'m2', testo:'Pubblichi contenuti sui social con i prodotti in negozio almeno 3 volte a settimana?', tipo:'yn', peso:2 },
    ],
    sitoweb: [
      { id:'s1', testo:'Il sito mostra orari, indirizzo e prodotti aggiornati del punto vendita?', tipo:'yn', peso:2 },
      { id:'s2', testo:'Hai una scheda Google Business ottimizzata con foto e recensioni recenti?', tipo:'yn', peso:3 },
    ],
    ecommerce: [
      { id:'e1', testo:'Vendi online almeno una selezione dei prodotti disponibili in negozio?', tipo:'yn', peso:3 },
      { id:'e2', testo:'Offri il ritiro in negozio per gli acquisti fatti online?', tipo:'yn', peso:2 },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. FOOD
  // ─────────────────────────────────────────────
  food: {
    vendite: [
      { id:'v1', testo:'Hai un agente o broker dedicato per il canale GDO?', tipo:'yn', peso:3 },
      { id:'v2', testo:'Gestisci un listino differenziato per canale (Horeca, GDO, dettaglio)?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Hai trattative aperte con almeno 2 nuove insegne o distributori?', tipo:'yn', peso:3 },
      { id:'p2', testo:'Monitori il sell-out dei tuoi prodotti presso i punti vendita clienti?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Il responsabile qualità opera in autonomia senza dipendere dal titolare?', tipo:'yn', peso:3 },
      { id:'t2', testo:'Hai personale commerciale dedicato separato dalla produzione?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Hai certificazioni aggiornate (HACCP, BRC/IFS) verificate nell\'ultimo anno?', tipo:'yn', peso:3 },
      { id:'pr2', testo:'Garantisci la tracciabilità completa dal lotto al punto vendita finale?', tipo:'yn', peso:2 },
      { id:'pr3', testo:'Hai un piano di richiamo prodotto testato e documentato?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Il margine netto sui prodotti a marchio proprio supera il 25%?', tipo:'yn', peso:3 },
      { id:'r2', testo:'Hai almeno 3 linee di prodotto che contribuiscono ciascuna oltre il 10%?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Il packaging dei prodotti è stato rinnovato negli ultimi 3 anni?', tipo:'yn', peso:2 },
      { id:'m2', testo:'Partecipi a fiere food (Cibus, TuttoFood, Vinitaly) come espositore?', tipo:'yn', peso:3 },
    ],
    sitoweb: [
      { id:'s1', testo:'Il sito mostra schede prodotto con valori nutrizionali e allergeni?', tipo:'yn', peso:2 },
      { id:'s2', testo:'Hai una sezione dedicata alla filiera e all\'origine delle materie prime?', tipo:'yn', peso:2 },
    ],
    ecommerce: [
      { id:'e1', testo:'Vendi direttamente al consumatore tramite un e-commerce proprietario?', tipo:'yn', peso:2 },
      { id:'e2', testo:'Sei presente su almeno una piattaforma specializzata food online?', tipo:'yn', peso:2 },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. TECH
  // ─────────────────────────────────────────────
  tech: {
    vendite: [
      { id:'v1', testo:'Hai un processo strutturato di demo o POC per chiudere le trattative?', tipo:'yn', peso:3 },
      { id:'v2', testo:'Il ciclo di vendita medio è sotto i 90 giorni per il prodotto principale?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Usi un CRM per tracciare ogni fase della pipeline con probabilità di chiusura?', tipo:'yn', peso:3 },
      { id:'p2', testo:'Hai almeno 3x il target trimestrale come valore totale in pipeline?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Hai separato i ruoli di vendita da quelli di delivery/sviluppo?', tipo:'yn', peso:3 },
      { id:'t2', testo:'Il team tecnico può gestire l\'onboarding clienti senza il fondatore?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Hai un processo documentato di onboarding cliente con milestone definite?', tipo:'yn', peso:3 },
      { id:'pr2', testo:'Misuri il tempo medio di risoluzione dei ticket di supporto?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Il ricavo ricorrente (MRR/ARR) supera il 50% del fatturato totale?', tipo:'yn', peso:3 },
      { id:'r2', testo:'Il churn rate annuo dei clienti è sotto il 10%?', tipo:'yn', peso:2 },
      { id:'r3', testo:'Hai aumentato l\'ARPU medio rispetto ai 12 mesi precedenti?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Generi lead inbound tramite contenuti tecnici (blog, webinar, whitepaper)?', tipo:'yn', peso:3 },
      { id:'m2', testo:'Hai almeno 2 partnership attive con vendor o piattaforme complementari?', tipo:'yn', peso:2 },
    ],
    sitoweb: [
      { id:'s1', testo:'Il sito ha una pagina prezzi o un percorso chiaro per richiedere demo?', tipo:'yn', peso:3 },
      { id:'s2', testo:'Tracci le conversioni del sito con analytics configurati su obiettivi?', tipo:'yn', peso:2 },
    ],
    ecommerce: [
      { id:'e1', testo:'I clienti possono acquistare o attivare il servizio direttamente online?', tipo:'yn', peso:3 },
      { id:'e2', testo:'Offri un periodo di prova gratuito o freemium per acquisire nuovi utenti?', tipo:'yn', peso:2 },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. AUTOMOTIVE
  // ─────────────────────────────────────────────
  automotive: {
    vendite: [
      { id:'v1', testo:'Ogni venditore ha un obiettivo mensile scritto su unità e margine?', tipo:'yn', peso:3 },
      { id:'v2', testo:'Offri test drive strutturati con follow-up entro 24 ore?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Tracci ogni contatto dal primo interesse fino alla consegna del veicolo?', tipo:'yn', peso:3 },
      { id:'p2', testo:'Conosci il tasso di conversione tra preventivi e contratti firmati?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'I venditori gestiscono l\'intero ciclo senza intervento del titolare?', tipo:'yn', peso:3 },
      { id:'t2', testo:'Hai un BDC o una persona dedicata alla gestione dei lead telefonici e web?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Hai un processo standard per la valutazione e il ritiro dell\'usato?', tipo:'yn', peso:3 },
      { id:'pr2', testo:'Gestisci la preparazione e consegna veicoli con una checklist formale?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'La penetrazione finanziaria supera il 40% delle vendite totali?', tipo:'yn', peso:3 },
      { id:'r2', testo:'I ricavi post-vendita (officina, ricambi) pesano almeno il 30% del fatturato?', tipo:'yn', peso:2 },
      { id:'r3', testo:'Vendi accessori o pacchetti aggiuntivi su almeno il 50% delle consegne?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Invii comunicazioni mirate ai clienti in scadenza di garanzia o leasing?', tipo:'yn', peso:3 },
      { id:'m2', testo:'Sei presente sui portali auto (AutoScout24, Subito) con stock aggiornato?', tipo:'yn', peso:2 },
    ],
    sitoweb: [
      { id:'s1', testo:'Il sito mostra lo stock disponibile aggiornato in tempo reale?', tipo:'yn', peso:3 },
      { id:'s2', testo:'Hai un configuratore o un modulo per prenotare un test drive online?', tipo:'yn', peso:2 },
    ],
    ecommerce: [
      { id:'e1', testo:'Offri la possibilità di prenotare o bloccare un veicolo con pagamento online?', tipo:'yn', peso:2 },
      { id:'e2', testo:'Vendi online accessori, ricambi o pacchetti di manutenzione?', tipo:'yn', peso:2 },
    ],
  },

};