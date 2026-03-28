var DIAGNOSI_DOMANDE = {

  // ─────────────────────────────────────────────
  // 1. B2B MANIFATTURIERO
  // ─────────────────────────────────────────────
  b2b_manifatturiero: {
    vendite: [
      { id:'v1', testo:'Chi gestisce le vendite in azienda?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Solo il titolare, fa tutto lui'},
          {label:'Titolare affiancato da un tecnico'},
          {label:'Un agente esterno plurimandatario'},
          {label:'Un commerciale interno dedicato'},
          {label:'Team commerciale strutturato con ruoli'}
        ]},
      { id:'v2', testo:'Hai un listino prezzi aggiornato con margini verificati per ogni linea?', tipo:'yn', peso:3 },
      { id:'v3', testo:'C\'è qualcuno oltre a te che visita attivamente nuovi prospect?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Come tracci le trattative commerciali?', tipo:'mc', peso:5,
        opzioni:[
          {label:'A memoria, niente di scritto'},
          {label:'Foglio Excel o appunti sparsi'},
          {label:'CRM base con lista contatti'},
          {label:'CRM con pipeline e previsioni'},
          {label:'CRM integrato con gestionale e forecast'}
        ]},
      { id:'p2', testo:'Conosci il valore totale delle offerte aperte in questo momento?', tipo:'yn', peso:3 },
      { id:'p3', testo:'Registri sistematicamente il motivo di ogni offerta persa?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Com\'è organizzato il personale aziendale?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Il titolare fa tutto da solo'},
          {label:'Titolare più operai senza intermedi'},
          {label:'C\'è un capo reparto operativo'},
          {label:'Team con ruoli separati e responsabili'},
          {label:'Management strutturato su più livelli'}
        ]},
      { id:'t2', testo:'Il titolare può assentarsi 2 settimane senza impatto sulle vendite?', tipo:'yn', peso:3 },
      { id:'t3', testo:'Hai almeno un commerciale dedicato esclusivamente ai nuovi clienti?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Come gestisci il passaggio offerta-produzione?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Comunicazione verbale diretta'},
          {label:'Email o messaggi informali'},
          {label:'Un modulo cartaceo standard'},
          {label:'Procedura digitale con checklist'},
          {label:'Workflow automatizzato con ERP integrato'}
        ]},
      { id:'pr2', testo:'Esiste una procedura scritta per la gestione delle offerte tecniche?', tipo:'yn', peso:3 },
      { id:'pr3', testo:'Misuri i tempi di attraversamento dalla richiesta alla consegna?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Come è distribuito il fatturato tra i clienti?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Un solo cliente fa oltre il 50% del fatturato'},
          {label:'2-3 clienti pesano oltre il 70%'},
          {label:'Top client sotto il 30%, ma pochi settori'},
          {label:'Clienti diversificati su più settori'},
          {label:'Portafoglio bilanciato con ricavi prevedibili'}
        ]},
      { id:'r2', testo:'Hai aumentato i prezzi almeno una volta negli ultimi 12 mesi?', tipo:'yn', peso:3 },
      { id:'r3', testo:'Conosci il margine lordo per ogni famiglia di prodotto?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Come promuovi l\'azienda verso nuovi clienti?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Solo passaparola, nessuna attività'},
          {label:'Qualche fiera ogni tanto'},
          {label:'Fiere regolari e catalogo tecnico'},
          {label:'Fiere, sito aggiornato e contenuti tecnici'},
          {label:'Piano marketing strutturato multicanale'}
        ]},
      { id:'m2', testo:'Partecipi ad almeno 2 fiere di settore all\'anno come espositore?', tipo:'yn', peso:2 },
      { id:'m3', testo:'Hai un catalogo tecnico aggiornato disponibile in formato digitale?', tipo:'yn', peso:2 },
    ],
    sitoweb: [
      { id:'s1', testo:'Che ruolo ha il sito web nella tua attività?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Non ho un sito oppure è fermo da anni'},
          {label:'Sito vetrina con info base e contatti'},
          {label:'Sito con schede prodotto e foto'},
          {label:'Sito con schede tecniche scaricabili'},
          {label:'Sito che genera richieste di preventivo regolari'}
        ]},
      { id:'s2', testo:'Il sito mostra schede tecniche scaricabili per i prodotti principali?', tipo:'yn', peso:3 },
      { id:'s3', testo:'Ricevi almeno 3 richieste di preventivo al mese dal sito web?', tipo:'yn', peso:2 },
    ],
    ecommerce: [
      { id:'e1', testo:'Come gestisci l\'approvvigionamento materiali?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Un solo fornitore per ogni materiale'},
          {label:'Confronto prezzi occasionale'},
          {label:'3-4 fornitori con accordi quadro'},
          {label:'Buyer dedicato con trattative strutturate'},
          {label:'Responsabile acquisti con procurement digitale'}
        ]},
      { id:'e2', testo:'Hai almeno 3 fornitori attivi per la materia prima principale?', tipo:'yn', peso:3 },
      { id:'e3', testo:'Negozi i prezzi delle materie prime con contratti a medio termine?', tipo:'yn', peso:2 },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. B2B SERVIZI
  // ─────────────────────────────────────────────
  b2b_servizi: {
    vendite: [
      { id:'v1', testo:'Come acquisisci nuovi clienti oggi?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Solo passaparola, nessuna attività proattiva'},
          {label:'Qualche referral e networking occasionale'},
          {label:'Attività outbound sporadica su contatti freddi'},
          {label:'Mix di inbound e referral con follow-up'},
          {label:'Processo strutturato con qualifica e nurturing'}
        ]},
      { id:'v2', testo:'Hai un processo strutturato per qualificare i lead prima di proporti?', tipo:'yn', peso:3 },
      { id:'v3', testo:'Presenti almeno 4 nuove proposte commerciali al mese?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Come tieni traccia delle opportunità aperte?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Tutto a memoria o su foglietti'},
          {label:'Un file Excel aggiornato saltuariamente'},
          {label:'CRM con lista contatti e note'},
          {label:'CRM con fasi, importi e probabilità'},
          {label:'CRM con forecast e revisione settimanale'}
        ]},
      { id:'p2', testo:'Hai una previsione scritta dei ricavi attesi nei prossimi 90 giorni?', tipo:'yn', peso:3 },
      { id:'p3', testo:'Tracci il tempo medio tra primo contatto e firma del contratto?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Quanto dipende l\'azienda dal fondatore?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Tutto dipende da me, sono io l\'azienda'},
          {label:'Ho collaboratori ma devo supervisionare tutto'},
          {label:'Alcuni consulenti lavorano in autonomia parziale'},
          {label:'Team con specialisti autonomi e un coordinatore'},
          {label:'Struttura con ruoli definiti e delega completa'}
        ]},
      { id:'t2', testo:'Il know-how critico è documentato e non dipende da una sola persona?', tipo:'yn', peso:3 },
      { id:'t3', testo:'Hai un piano di onboarding strutturato per i nuovi consulenti?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Come eroghi i servizi ai clienti?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Ogni progetto è gestito in modo diverso'},
          {label:'Ho un metodo ma non è documentato'},
          {label:'Processo base documentato per i servizi chiave'},
          {label:'SLA definiti e misurati per ogni servizio'},
          {label:'Processi standardizzati con feedback e miglioramento'}
        ]},
      { id:'pr2', testo:'Raccogli feedback strutturato dai clienti alla fine di ogni progetto?', tipo:'yn', peso:3 },
      { id:'pr3', testo:'Hai template standard per proposte, contratti e report?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Come sono strutturati i tuoi ricavi?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Solo progetti una tantum, nessun ricorrente'},
          {label:'Qualche contratto annuale ma sotto il 20%'},
          {label:'Ricorrente tra il 20% e il 40% del totale'},
          {label:'Ricorrente oltre il 40% con buona prevedibilità'},
          {label:'Modello ibrido stabile con ricavi prevedibili'}
        ]},
      { id:'r2', testo:'Hai aumentato il valore medio dei contratti rispetto all\'anno scorso?', tipo:'yn', peso:3 },
      { id:'r3', testo:'Il cliente più grande pesa meno del 25% del fatturato totale?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Come generi visibilità e credibilità sul mercato?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Non faccio nessuna attività di marketing'},
          {label:'Profilo LinkedIn aggiornato ogni tanto'},
          {label:'Pubblico contenuti e qualche case study'},
          {label:'Content marketing regolare e referral attivo'},
          {label:'Piano marketing con lead generation misurabile'}
        ]},
      { id:'m2', testo:'Pubblichi almeno 2 case study all\'anno con risultati misurabili?', tipo:'yn', peso:2 },
      { id:'m3', testo:'Hai un programma attivo di referral con i clienti esistenti?', tipo:'yn', peso:3 },
    ],
    sitoweb: [
      { id:'s1', testo:'Che ruolo ha il sito web per la tua attività?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Non ho un sito o è molto datato'},
          {label:'Sito vetrina con descrizione servizi base'},
          {label:'Sito con servizi, chi siamo e form contatto'},
          {label:'Sito con case study e risultati clienti'},
          {label:'Sito che genera lead qualificati regolarmente'}
        ]},
      { id:'s2', testo:'Il sito contiene una sezione dedicata ai risultati ottenuti?', tipo:'yn', peso:2 },
      { id:'s3', testo:'Hai un modulo di richiesta consulenza che genera notifiche immediate?', tipo:'yn', peso:2 },
    ],
    ecommerce: [
      { id:'e1', testo:'Come gestisci fornitori e subappaltatori?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Faccio tutto internamente senza fornitori'},
          {label:'Uso freelancer occasionali al bisogno'},
          {label:'Ho 2-3 collaboratori esterni stabili'},
          {label:'Rete di partner qualificati con accordi'},
          {label:'Ecosistema di partner gestito con contratti e SLA'}
        ]},
      { id:'e2', testo:'Hai accordi quadro con i tuoi fornitori o subappaltatori principali?', tipo:'yn', peso:2 },
      { id:'e3', testo:'Valuti periodicamente nuovi strumenti o fornitori per migliorare il servizio?', tipo:'yn', peso:2 },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. EDILIZIA
  // ─────────────────────────────────────────────
  edilizia: {
    vendite: [
      { id:'v1', testo:'Come arrivano i lavori alla tua impresa?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Solo passaparola casuale'},
          {label:'Passaparola e qualche contatto con tecnici'},
          {label:'Rapporti stabili con geometri e architetti'},
          {label:'Rete di segnalatori attiva e preventivi rapidi'},
          {label:'Processo commerciale con risposta entro 48 ore'}
        ]},
      { id:'v2', testo:'Mantieni rapporti attivi con almeno 3 studi tecnici o progettisti?', tipo:'yn', peso:3 },
      { id:'v3', testo:'Rispondi ai preventivi entro 48 ore dalla richiesta?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Come tieni traccia dei lavori in arrivo?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Tutto a memoria, niente di scritto'},
          {label:'Qualche appunto su carta o telefono'},
          {label:'File Excel con lista preventivi fatti'},
          {label:'Gestione separata lavori pubblici e privati'},
          {label:'Pianificazione cantieri con visibilità a 6 mesi'}
        ]},
      { id:'p2', testo:'Hai visibilità sui cantieri previsti per i prossimi 6 mesi?', tipo:'yn', peso:3 },
      { id:'p3', testo:'Tracci separatamente le trattative per lavori pubblici e privati?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Chi gestisce i cantieri nella tua impresa?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Solo io, sono sempre in cantiere'},
          {label:'Io con operai che eseguono ordini diretti'},
          {label:'Un capocantiere che gestisce la giornata'},
          {label:'Capocantiere autonomo su più cantieri'},
          {label:'Più squadre autonome con capicantiere dedicati'}
        ]},
      { id:'t2', testo:'Riesci a gestire 2 cantieri contemporanei senza rallentamenti?', tipo:'yn', peso:3 },
      { id:'t3', testo:'Il personale di cantiere ha le certificazioni di sicurezza aggiornate?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Come gestisci la documentazione di cantiere?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Nessuna documentazione formale'},
          {label:'Foto e appunti su carta o WhatsApp'},
          {label:'Checklist cartacea per apertura e chiusura'},
          {label:'Gestione digitale con app di cantiere'},
          {label:'Sistema completo con SAL, foto e reportistica'}
        ]},
      { id:'pr2', testo:'Hai una checklist standard per apertura e chiusura di ogni cantiere?', tipo:'yn', peso:3 },
      { id:'pr3', testo:'Gestisci la contabilità di cantiere separata per ogni commessa?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Come è la situazione economica dei cantieri?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Non conosco i margini reali dei lavori'},
          {label:'So i margini a spanne, non a consuntivo'},
          {label:'Calcolo il margine a fine cantiere'},
          {label:'Monitoro costi e margini durante il cantiere'},
          {label:'Margini controllati con lavori programmati a 3+ mesi'}
        ]},
      { id:'r2', testo:'Conosci il margine effettivo di ogni cantiere a consuntivo?', tipo:'yn', peso:3 },
      { id:'r3', testo:'Hai lavori programmati che coprono almeno i prossimi 3 mesi?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Come promuovi la tua impresa edile?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Non faccio nessuna promozione'},
          {label:'Solo il cartello di cantiere'},
          {label:'Qualche foto lavori sui social'},
          {label:'Portfolio fotografico e raccolta recensioni'},
          {label:'Piano marketing con portfolio, social e referral'}
        ]},
      { id:'m2', testo:'Documenti i lavori completati con foto professionali per il portfolio?', tipo:'yn', peso:2 },
      { id:'m3', testo:'Hai un sistema per raccogliere recensioni dai committenti soddisfatti?', tipo:'yn', peso:2 },
    ],
    sitoweb: [
      { id:'s1', testo:'Com\'è la presenza online della tua impresa?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Non ho un sito web'},
          {label:'Sito base con contatti e descrizione'},
          {label:'Sito con alcune foto di lavori realizzati'},
          {label:'Sito con portfolio aggiornato e SEO locale'},
          {label:'Sito ottimizzato che genera richieste preventivo'}
        ]},
      { id:'s2', testo:'Il sito mostra un portfolio aggiornato con immagini dei lavori?', tipo:'yn', peso:3 },
      { id:'s3', testo:'Le pagine del sito sono ottimizzate per ricerche locali nella tua zona?', tipo:'yn', peso:2 },
    ],
    ecommerce: [
      { id:'e1', testo:'Come gestisci l\'approvvigionamento materiali?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Compro al bisogno dal rivenditore più vicino'},
          {label:'Ho un fornitore di fiducia per quasi tutto'},
          {label:'2-3 fornitori con cui tratto i prezzi'},
          {label:'Accordi quadro con fornitori e prezzi bloccati'},
          {label:'Strategia acquisti pianificata per commessa'}
        ]},
      { id:'e2', testo:'Hai accordi quadro con i fornitori principali di materiale?', tipo:'yn', peso:3 },
      { id:'e3', testo:'Confronti i prezzi di almeno 2-3 fornitori prima di ogni ordine importante?', tipo:'yn', peso:2 },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. DISTRIBUZIONE
  // ─────────────────────────────────────────────
  distribuzione: {
    vendite: [
      { id:'v1', testo:'Come è organizzata la vendita ai clienti?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Solo vendita al banco senza agenti'},
          {label:'Banco più qualche agente senza obiettivi'},
          {label:'Agenti con zone assegnate e listino'},
          {label:'Rete vendita con obiettivi e key account'},
          {label:'Team commerciale strutturato con CRM e incentivi'}
        ]},
      { id:'v2', testo:'C\'è qualcuno oltre a te che vende attivamente ai clienti con obiettivi definiti?', tipo:'yn', peso:3 },
      { id:'v3', testo:'Hai un processo per riattivare i clienti inattivi da più di 6 mesi?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Come monitori ordini e previsioni di vendita?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Gestisco gli ordini man mano che arrivano'},
          {label:'Ho un\'idea generale dei clienti ricorrenti'},
          {label:'Monitoro i preventivi inviati su Excel'},
          {label:'Traccio conversioni e ordini previsti dai top client'},
          {label:'Forecast strutturato con alert riordino automatici'}
        ]},
      { id:'p2', testo:'Monitori il tasso di conversione tra preventivi e ordini ricevuti?', tipo:'yn', peso:3 },
      { id:'p3', testo:'Hai visibilità sugli ordini previsti dai tuoi 10 clienti principali?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Com\'è organizzato il personale operativo?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Titolare gestisce magazzino, vendite e consegne'},
          {label:'Magazziniere e banco, il resto lo fa il titolare'},
          {label:'Team operativo ma serve supervisione costante'},
          {label:'Magazzino, banco e consegne con responsabili'},
          {label:'Struttura autonoma con responsabile commerciale'}
        ]},
      { id:'t2', testo:'C\'è qualcuno che gestisce spedizioni e resi senza il tuo intervento diretto?', tipo:'yn', peso:3 },
      { id:'t3', testo:'Hai un responsabile commerciale che coordina la rete vendita?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Come gestisci scorte e riordini?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Riordino quando mi accorgo che manca qualcosa'},
          {label:'Controllo visivo periodico delle scorte'},
          {label:'Sottoscorta su gestionale con riordino manuale'},
          {label:'Riordino semi-automatico con alert e statistiche'},
          {label:'Gestione automatica con KPI su evasione e tempi'}
        ]},
      { id:'pr2', testo:'Monitori i tempi di consegna e il tasso di evasione ordini completi?', tipo:'yn', peso:3 },
      { id:'pr3', testo:'Esiste una procedura standard per la gestione dei resi e reclami?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Quanto conosci la redditività del business?', tipo:'mc', peso:5,
        opzioni:[
          {label:'So il fatturato totale ma non i margini'},
          {label:'Conosco il margine medio complessivo'},
          {label:'So i margini per categoria merceologica'},
          {label:'Margini per categoria e per cliente principale'},
          {label:'Analisi completa con nessun cliente oltre il 15%'}
        ]},
      { id:'r2', testo:'Conosci la marginalità per categoria merceologica e per cliente?', tipo:'yn', peso:3 },
      { id:'r3', testo:'Il fatturato del tuo cliente top pesa meno del 15% del totale?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Come comunichi con i clienti esistenti e potenziali?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Nessuna comunicazione proattiva'},
          {label:'Qualche telefonata e visita sporadica'},
          {label:'Invio promozioni o volantini ogni tanto'},
          {label:'Newsletter mensile e catalogo digitale'},
          {label:'Marketing multicanale con promozioni mirate regolari'}
        ]},
      { id:'m2', testo:'Invii promozioni mirate almeno una volta al mese ai clienti?', tipo:'yn', peso:2 },
      { id:'m3', testo:'Hai un catalogo digitale consultabile online con disponibilità?', tipo:'yn', peso:3 },
    ],
    sitoweb: [
      { id:'s1', testo:'Che ruolo ha il sito web nel tuo business?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Non ho un sito web'},
          {label:'Sito vetrina con indirizzo e orari'},
          {label:'Sito con catalogo prodotti consultabile'},
          {label:'Sito con prezzi e disponibilità per clienti B2B'},
          {label:'Portale B2B con login, prezzi riservati e ordini'}
        ]},
      { id:'s2', testo:'Il sito permette ai clienti B2B di consultare prezzi e disponibilità?', tipo:'yn', peso:3 },
      { id:'s3', testo:'Le categorie prodotto sono strutturate per facilitare la ricerca?', tipo:'yn', peso:2 },
    ],
    ecommerce: [
      { id:'e1', testo:'Come gestisci i rapporti con i tuoi fornitori?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Compro da un fornitore principale senza alternative'},
          {label:'Ho 2-3 fornitori ma senza accordi strutturati'},
          {label:'Accordi quadro con i fornitori principali'},
          {label:'Strategia acquisti con trattative e confronto prezzi'},
          {label:'Procurement strutturato con scoring fornitori e contratti'}
        ]},
      { id:'e2', testo:'Hai accordi quadro con almeno 3 fornitori principali?', tipo:'yn', peso:3 },
      { id:'e3', testo:'Valuti periodicamente fornitori alternativi per le categorie chiave?', tipo:'yn', peso:2 },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. RETAIL
  // ─────────────────────────────────────────────
  retail: {
    vendite: [
      { id:'v1', testo:'Come funziona la vendita nel tuo punto vendita?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Il cliente entra, guarda e compra da solo'},
          {label:'Il personale assiste solo se richiesto'},
          {label:'Accoglienza attiva con proposta prodotti'},
          {label:'Vendita assistita con upsell e cross-sell'},
          {label:'Clienteling strutturato con appuntamenti dedicati'}
        ]},
      { id:'v2', testo:'Lo scontrino medio è cresciuto rispetto a 12 mesi fa?', tipo:'yn', peso:3 },
      { id:'v3', testo:'C\'è qualcuno oltre a te che propone attivamente prodotti complementari ai clienti?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Come monitori le performance del punto vendita?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Guardo solo l\'incasso a fine giornata'},
          {label:'Confronto incassi con lo stesso periodo scorso'},
          {label:'Traccio ingressi e scontrino medio'},
          {label:'Monitoro conversione, scontrino e pezzi per cliente'},
          {label:'Dashboard con KPI, previsioni e piano promozionale'}
        ]},
      { id:'p2', testo:'Tracci il numero di ingressi in negozio e il tasso di conversione?', tipo:'yn', peso:3 },
      { id:'p3', testo:'Hai un piano promozionale trimestrale definito in anticipo?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Come funziona il negozio quando non ci sei?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Chiudo il negozio se non ci sono'},
          {label:'C\'è qualcuno ma devo controllare tutto'},
          {label:'Il personale gestisce la routine base'},
          {label:'Un responsabile di punto vendita coordina il team'},
          {label:'Il negozio funziona perfettamente senza di me'}
        ]},
      { id:'t2', testo:'Il negozio funziona normalmente anche quando il titolare non c\'è?', tipo:'yn', peso:3 },
      { id:'t3', testo:'C\'è qualcuno oltre a te nel punto vendita che riceve formazione regolare sui prodotti?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Come gestisci il riassortimento del negozio?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Riordino a occhio quando vedo scaffali vuoti'},
          {label:'Controllo periodico manuale delle giacenze'},
          {label:'Riordino basato sullo storico vendite'},
          {label:'Sistema automatico con suggerimenti di riordino'},
          {label:'Gestione stock ottimizzata con visual merchandising'}
        ]},
      { id:'pr2', testo:'Aggiorni il visual merchandising e le vetrine ogni 2 settimane?', tipo:'yn', peso:3 },
      { id:'pr3', testo:'Hai un sistema per gestire riassortimenti basato sui dati di vendita?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Come sono i tuoi ricavi e la fidelizzazione?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Clienti di passaggio, quasi nessuno torna'},
          {label:'Qualche cliente abituale ma senza dati'},
          {label:'Conosco i miei clienti fedeli ma a memoria'},
          {label:'Ho una lista clienti con acquisti tracciati'},
          {label:'Programma fedeltà attivo con oltre il 20% ricorrente'}
        ]},
      { id:'r2', testo:'Hai almeno il 20% dei ricavi da clienti fidelizzati e ricorrenti?', tipo:'yn', peso:3 },
      { id:'r3', testo:'Conosci il fatturato al metro quadro del tuo punto vendita?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Come attiri clienti nel punto vendita?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Aspetto che entrino, nessuna promozione'},
          {label:'Qualche post sui social ogni tanto'},
          {label:'Social regolari e qualche evento in negozio'},
          {label:'Social, eventi e programma fedeltà attivo'},
          {label:'Piano marketing completo con campagne mirate'}
        ]},
      { id:'m2', testo:'Hai un programma fedeltà attivo con almeno 200 clienti iscritti?', tipo:'yn', peso:3 },
      { id:'m3', testo:'Pubblichi contenuti sui social con prodotti almeno 3 volte a settimana?', tipo:'yn', peso:2 },
    ],
    sitoweb: [
      { id:'s1', testo:'Qual è la tua presenza online come negozio?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Non ho né sito né scheda Google'},
          {label:'Scheda Google con info base'},
          {label:'Sito con orari, indirizzo e qualche prodotto'},
          {label:'Sito aggiornato e scheda Google ottimizzata'},
          {label:'Presenza completa con recensioni e contenuti attivi'}
        ]},
      { id:'s2', testo:'Il sito mostra orari, indirizzo e prodotti aggiornati?', tipo:'yn', peso:2 },
      { id:'s3', testo:'Hai una scheda Google Business ottimizzata con foto e recensioni?', tipo:'yn', peso:3 },
    ],
    ecommerce: [
      { id:'e1', testo:'Come vendi al di fuori del negozio fisico?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Vendo solo in negozio, nessun canale online'},
          {label:'Vendo qualcosa via social o WhatsApp'},
          {label:'Ho un e-commerce base con pochi prodotti'},
          {label:'E-commerce attivo con selezione prodotti'},
          {label:'Omnichannel: e-commerce, ritiro in negozio, spedizione'}
        ]},
      { id:'e2', testo:'Vendi online almeno una selezione dei prodotti disponibili?', tipo:'yn', peso:3 },
      { id:'e3', testo:'Offri il ritiro in negozio per gli acquisti fatti online?', tipo:'yn', peso:2 },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. FOOD
  // ─────────────────────────────────────────────
  food: {
    vendite: [
      { id:'v1', testo:'Come vendi i tuoi prodotti alimentari?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Vendo solo a pochi clienti locali diretti'},
          {label:'Un agente plurimandatario copre una zona'},
          {label:'Agente dedicato per un canale (GDO o Horeca)'},
          {label:'Rete agenti su più canali con listini separati'},
          {label:'Team commerciale multicanale con key account'}
        ]},
      { id:'v2', testo:'Gestisci un listino differenziato per canale (Horeca, GDO, dettaglio)?', tipo:'yn', peso:3 },
      { id:'v3', testo:'Hai un agente o broker dedicato per il canale GDO?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Come gestisci le trattative con nuovi clienti?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Aspetto che mi contattino, non cerco clienti'},
          {label:'Qualche contatto sporadico con nuovi buyer'},
          {label:'Ho trattative aperte ma non le traccio'},
          {label:'Traccio le trattative per canale con follow-up'},
          {label:'Pipeline strutturata con monitoraggio sell-out'}
        ]},
      { id:'p2', testo:'Hai trattative aperte con almeno 2 nuove insegne o distributori?', tipo:'yn', peso:3 },
      { id:'p3', testo:'Monitori il sell-out dei tuoi prodotti presso i punti vendita?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Come è organizzato il personale in azienda?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Titolare fa produzione, qualità e vendite'},
          {label:'Titolare con operai, nessun responsabile'},
          {label:'Responsabile produzione, commerciale è il titolare'},
          {label:'Ruoli separati: produzione, qualità e commerciale'},
          {label:'Struttura completa con autonomia su ogni funzione'}
        ]},
      { id:'t2', testo:'C\'è qualcuno che gestisce la qualità in autonomia senza il tuo intervento?', tipo:'yn', peso:3 },
      { id:'t3', testo:'Hai personale commerciale dedicato separato dalla produzione?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Come gestisci qualità e certificazioni?', tipo:'mc', peso:5,
        opzioni:[
          {label:'HACCP base obbligatorio, niente altro'},
          {label:'HACCP aggiornato con documentazione minima'},
          {label:'Certificazioni in corso o ottenute da poco'},
          {label:'Certificazioni aggiornate con tracciabilità completa'},
          {label:'Sistema qualità completo con piano richiamo testato'}
        ]},
      { id:'pr2', testo:'Garantisci la tracciabilità completa dal lotto al punto vendita?', tipo:'yn', peso:3 },
      { id:'pr3', testo:'Hai un piano di richiamo prodotto testato e documentato?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Come sono distribuiti i tuoi ricavi?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Una sola linea prodotto e pochi clienti'},
          {label:'Pochi prodotti con un canale dominante'},
          {label:'2-3 linee ma un canale pesa oltre il 60%'},
          {label:'Più linee su più canali con margini noti'},
          {label:'Portafoglio diversificato con margini sopra il 25%'}
        ]},
      { id:'r2', testo:'Il margine netto sui prodotti a marchio proprio supera il 25%?', tipo:'yn', peso:3 },
      { id:'r3', testo:'Hai almeno 3 linee prodotto che contribuiscono ciascuna oltre il 10%?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Come promuovi il tuo brand alimentare?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Nessuna promozione, il prodotto parla da sé'},
          {label:'Packaging base e qualche degustazione locale'},
          {label:'Brand curato con presenza a qualche fiera'},
          {label:'Fiere importanti, packaging rinnovato e social'},
          {label:'Piano marketing con fiere, eventi e PR strutturate'}
        ]},
      { id:'m2', testo:'Il packaging dei prodotti è stato rinnovato negli ultimi 3 anni?', tipo:'yn', peso:2 },
      { id:'m3', testo:'Partecipi a fiere food (Cibus, TuttoFood, Vinitaly) come espositore?', tipo:'yn', peso:3 },
    ],
    sitoweb: [
      { id:'s1', testo:'Com\'è la tua presenza online come brand food?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Non ho un sito web'},
          {label:'Sito vetrina con storia aziendale e contatti'},
          {label:'Sito con catalogo prodotti e immagini'},
          {label:'Sito con schede prodotto, valori nutrizionali'},
          {label:'Sito completo con filiera, ricette e storytelling'}
        ]},
      { id:'s2', testo:'Il sito mostra schede prodotto con valori nutrizionali e allergeni?', tipo:'yn', peso:2 },
      { id:'s3', testo:'Hai una sezione dedicata alla filiera e origine delle materie prime?', tipo:'yn', peso:2 },
    ],
    ecommerce: [
      { id:'e1', testo:'Come gestisci l\'approvvigionamento materie prime?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Un fornitore principale per ogni materia prima'},
          {label:'2 fornitori ma senza contratti fissi'},
          {label:'Più fornitori con accordi stagionali'},
          {label:'Strategia acquisti con contratti e scorte'},
          {label:'Procurement strutturato con filiera controllata'}
        ]},
      { id:'e2', testo:'Hai almeno 2 fornitori alternativi per ogni materia prima critica?', tipo:'yn', peso:2 },
      { id:'e3', testo:'Blocchi i prezzi delle materie prime con contratti stagionali o annuali?', tipo:'yn', peso:2 },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. TECH
  // ─────────────────────────────────────────────
  tech: {
    vendite: [
      { id:'v1', testo:'Come acquisisci nuovi clienti?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Solo passaparola e rete personale'},
          {label:'Qualche lead inbound dal sito o LinkedIn'},
          {label:'Mix di inbound e outbound non strutturato'},
          {label:'Inbound attivo più partnership con vendor'},
          {label:'Processo strutturato con SDR, demo e closing'}
        ]},
      { id:'v2', testo:'Hai un processo strutturato di demo o POC per le trattative?', tipo:'yn', peso:3 },
      { id:'v3', testo:'Il ciclo di vendita medio è sotto i 90 giorni?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Come gestisci la pipeline commerciale?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Non ho una pipeline definita'},
          {label:'Lista di contatti su foglio senza fasi'},
          {label:'CRM con contatti e qualche nota'},
          {label:'CRM con fasi, importi e probabilità di chiusura'},
          {label:'Pipeline con forecast, review settimanale e 3x target'}
        ]},
      { id:'p2', testo:'Usi un CRM per tracciare ogni fase con probabilità di chiusura?', tipo:'yn', peso:3 },
      { id:'p3', testo:'Hai almeno 3x il target trimestrale come valore in pipeline?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Com\'è organizzato il team aziendale?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Il fondatore fa vendite, delivery e gestione'},
          {label:'Fondatore con sviluppatori, nessun commerciale'},
          {label:'Ruoli tecnici separati ma vendite al fondatore'},
          {label:'Team con vendita e delivery separati'},
          {label:'Struttura completa con autonomia su ogni funzione'}
        ]},
      { id:'t2', testo:'Hai separato i ruoli di vendita da quelli di delivery?', tipo:'yn', peso:3 },
      { id:'t3', testo:'C\'è qualcuno che gestisce l\'onboarding clienti senza il tuo intervento diretto?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Come gestisci l\'onboarding e il supporto clienti?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Ogni cliente è gestito in modo diverso'},
          {label:'Ho un metodo ma non è documentato'},
          {label:'Processo base con checklist di onboarding'},
          {label:'Onboarding con milestone e supporto con SLA'},
          {label:'Processi documentati con KPI su tempi e soddisfazione'}
        ]},
      { id:'pr2', testo:'Hai un processo documentato di onboarding con milestone definite?', tipo:'yn', peso:3 },
      { id:'pr3', testo:'Misuri il tempo medio di risoluzione dei ticket di supporto?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Come sono strutturati i tuoi ricavi?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Solo progetti una tantum senza ricorrente'},
          {label:'Qualche manutenzione ricorrente sotto il 20%'},
          {label:'Ricorrente tra il 20% e il 50% del totale'},
          {label:'MRR/ARR supera il 50% con churn sotto il 10%'},
          {label:'Ricavi prevedibili con ARPU in crescita e churn basso'}
        ]},
      { id:'r2', testo:'Il ricavo ricorrente (MRR/ARR) supera il 50% del fatturato?', tipo:'yn', peso:3 },
      { id:'r3', testo:'Il churn rate annuo dei clienti è sotto il 10%?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Come generi visibilità e lead nel mercato tech?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Non faccio marketing, solo passaparola'},
          {label:'Profilo LinkedIn e qualche post'},
          {label:'Contenuti tecnici occasionali (blog, webinar)'},
          {label:'Content marketing regolare con partnership vendor'},
          {label:'Lead generation strutturata con funnel misurabile'}
        ]},
      { id:'m2', testo:'Generi lead inbound tramite contenuti tecnici regolari?', tipo:'yn', peso:3 },
      { id:'m3', testo:'Hai almeno 2 partnership attive con vendor o piattaforme?', tipo:'yn', peso:2 },
    ],
    sitoweb: [
      { id:'s1', testo:'Che ruolo ha il sito web nel tuo business tech?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Sito base o non aggiornato'},
          {label:'Sito vetrina con descrizione servizi'},
          {label:'Sito con case study e pagina contatti'},
          {label:'Sito con pricing, demo e analytics configurati'},
          {label:'Sito ottimizzato che genera lead qualificati regolari'}
        ]},
      { id:'s2', testo:'Il sito ha una pagina prezzi o un percorso chiaro per richiedere demo?', tipo:'yn', peso:3 },
      { id:'s3', testo:'Tracci le conversioni del sito con analytics su obiettivi?', tipo:'yn', peso:2 },
    ],
    ecommerce: [
      { id:'e1', testo:'Come gestisci infrastruttura e risorse esterne?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Tutto su server fisici o hosting base'},
          {label:'Cloud base senza ottimizzazione costi'},
          {label:'Cloud strutturato con qualche tool SaaS'},
          {label:'Stack cloud ottimizzato con freelancer qualificati'},
          {label:'Infrastruttura scalabile con partner e tool integrati'}
        ]},
      { id:'e2', testo:'Monitori e ottimizzi regolarmente i costi di cloud e licenze software?', tipo:'yn', peso:3 },
      { id:'e3', testo:'Hai contratti strutturati con i fornitori di servizi cloud o tool esterni?', tipo:'yn', peso:2 },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. AUTOMOTIVE
  // ─────────────────────────────────────────────
  automotive: {
    vendite: [
      { id:'v1', testo:'Chi vende i veicoli in azienda?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Solo io (titolare) — faccio tutto da solo'},
          {label:'Io + qualcuno che mi aiuta nelle visite'},
          {label:'Ho almeno una persona dedicata alla vendita'},
          {label:'Ho un commerciale con portafoglio e obiettivi'},
          {label:'Ho un team vendite strutturato con responsabile'}
        ]},
      { id:'v2', testo:'Fai follow-up strutturato dopo ogni visita o contatto?', tipo:'yn', peso:3 },
      { id:'v3', testo:'C\'è qualcuno che può vendere al tuo posto quando non ci sei?', tipo:'yn', peso:2 },
    ],
    pipeline: [
      { id:'p1', testo:'Come tracci contatti e trattative aperte?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Tutto a memoria — non segno nulla'},
          {label:'Appunti su agenda o foglio di carta'},
          {label:'Excel o Google Sheet con le trattative'},
          {label:'CRM o DMS con tracking delle trattative'},
          {label:'DMS/CRM integrato con lead web e conversioni'}
        ]},
      { id:'p2', testo:'Sai quanti preventivi hai aperto in questo momento?', tipo:'yn', peso:3 },
      { id:'p3', testo:'Conosci il tasso di chiusura tra preventivi e contratti?', tipo:'yn', peso:2 },
    ],
    team: [
      { id:'t1', testo:'Quante persone lavorano con te?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Nessuno — sono da solo'},
          {label:'Ho un aiutante ma faccio quasi tutto io'},
          {label:'Ho persone con ruoli definiti (chi vende, chi fa pratiche)'},
          {label:'Ho un team con back office, vendita e amministrazione'},
          {label:'Ho un responsabile che coordina il team'}
        ]},
      { id:'t2', testo:'Puoi stare via una settimana senza che si fermi tutto?', tipo:'yn', peso:3 },
      { id:'t3', testo:'Ogni persona ha un ruolo chiaro e obiettivi definiti?', tipo:'yn', peso:2 },
    ],
    processi: [
      { id:'pr1', testo:'Come gestisci le pratiche e la consegna veicoli?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Tutto a esperienza — nessuna procedura scritta'},
          {label:'Ho una checklist base per la consegna'},
          {label:'Contratti standard e valutazione usato con strumenti'},
          {label:'Gestionale per pratiche, finanziamenti e garanzie'},
          {label:'Processi digitalizzati — firma digitale, NPS automatico'}
        ]},
      { id:'pr2', testo:'Hai contratti e moduli standard per tutte le trattative?', tipo:'yn', peso:3 },
      { id:'pr3', testo:'Misuri i tempi tra arrivo veicolo e vendita?', tipo:'yn', peso:2 },
    ],
    ricavi: [
      { id:'r1', testo:'Da dove arrivano i tuoi ricavi?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Solo vendita veicoli — nient\'altro'},
          {label:'Vendita + qualche finanziamento ogni tanto'},
          {label:'Vendita + finanziamento proposto sistematicamente'},
          {label:'Vendita + F&I + garanzie + qualche servizio'},
          {label:'Mix completo: vendita, F&I, service, accessori, noleggio'}
        ]},
      { id:'r2', testo:'Proponi finanziamento e garanzia estesa su ogni vendita?', tipo:'yn', peso:3 },
      { id:'r3', testo:'Hai ricavi ricorrenti (contratti manutenzione, noleggio)?', tipo:'yn', peso:2 },
    ],
    marketing: [
      { id:'m1', testo:'Come trovi nuovi clienti?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Solo passaparola — non faccio nulla di attivo'},
          {label:'Ho messo qualche annuncio su portali o social'},
          {label:'Sono su 2-3 portali auto con foto aggiornate'},
          {label:'Portali + social attivi + qualche campagna ads'},
          {label:'Marketing strutturato con campagne, CRM e budget'}
        ]},
      { id:'m2', testo:'Aggiorni lo stock sui portali almeno una volta a settimana?', tipo:'yn', peso:3 },
      { id:'m3', testo:'Hai un budget mensile dedicato al marketing?', tipo:'yn', peso:2 },
    ],
    sitoweb: [
      { id:'s1', testo:'Hai un sito web?', tipo:'mc', peso:5,
        opzioni:[
          {label:'No, o ne ho uno vecchissimo che non aggiorno'},
          {label:'Sito base con contatti e qualche info'},
          {label:'Sito con lo stock veicoli visibile'},
          {label:'Sito con stock aggiornato, form contatto e foto'},
          {label:'Sito con stock live, chat, test drive e finanziamento'}
        ]},
      { id:'s2', testo:'Lo stock sul sito è aggiornato in tempo reale?', tipo:'yn', peso:3 },
      { id:'s3', testo:'Un cliente può contattarti o prenotare dal sito?', tipo:'yn', peso:2 },
    ],
    ecommerce: [
      { id:'e1', testo:'Come ti approvvigioni di veicoli da vendere?', tipo:'mc', peso:5,
        opzioni:[
          {label:'Solo permute — aspetto che il cliente porti l\'usato'},
          {label:'Permute + qualche acquisto su aste online'},
          {label:'Aste + accordi con privati e aziende'},
          {label:'Buyer che cerca attivamente su più canali'},
          {label:'Strategia acquisti con team, KPI e partnership'}
        ]},
      { id:'e2', testo:'Hai almeno 3 fonti diverse di approvvigionamento veicoli?', tipo:'yn', peso:3 },
      { id:'e3', testo:'Controlli il costo medio di acquisto per veicolo?', tipo:'yn', peso:2 },
    ],
  },

};
