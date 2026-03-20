var AZIONI_TARGET_BY_SETTORE = 
{
  "manifatturiero_meccanica": {
    "vendite": {
      "1-2": "Il titolare gestisce tutto: identifica 1-2 tecnici interni che possono affiancarti nelle visite cliente e nei preventivi",
      "2-3": "Attiva un agente plurimandatario per coprire zone o settori che non riesci a seguire direttamente",
      "3-4": "Assumi un commerciale interno con portafoglio clienti assegnato, obiettivi mensili e autonomia nelle trattative",
      "4-5": "Struttura una direzione commerciale con responsabile vendite, agenti di zona e key account per clienti strategici OEM"

    },
    "pipeline": {
      "1-2": "Crea un registro offerte su Excel: cliente, lavorazione richiesta, importo, data e stato",
      "2-3": "Adotta un CRM semplice come Pipedrive per tracciare offerte, follow-up e storico cliente",
      "3-4": "Definisci tempi di risposta massimi per i preventivi e monitora win/loss rate mensile",
      "4-5": "CRM integrato con gestione commesse, tempi di produzione, avanzamento lavori e fatturazione attiva"

    },
    "team": {
      "1-2": "Forma un operaio senior come riferimento tecnico-commerciale per i clienti abituali quando il titolare non c'è",
      "2-3": "Assumi un tecnico-venditore o inside sales con conoscenza delle lavorazioni e capacità di fare preventivi",
      "3-4": "Team commerciale strutturato: senior + junior + back office preventivi con ruoli e obiettivi distinti",
      "4-5": "Struttura completa con direttore commerciale, team vendite, supporto tecnico dedicato e formazione continua"

    },
    "processi": {
      "1-2": "Check base obbligatorio: DVR presente, DPI disponibili, estintori a norma. Standardizza i tempi di risposta ai preventivi",
      "2-3": "Formazione sicurezza obbligatoria per tutti gli operatori, referente sicurezza nominato. Crea un sistema di gestione commesse con priorità e stato avanzamento",
      "3-4": "Audit sicurezza interni periodici, near-miss tracciati. Processi operativi documentati e controllo qualità attivo — prerequisito per entrare nei vendor list dei clienti medi e grandi",
      "4-5": "Sistema sicurezza strutturato come KPI aziendale. ERP integrato con produzione, qualità e fatturazione. ISO 9001 — IATF 16949 se servi l'automotive"

    },
    "ricavi": {
      "1-2": "Analizza i margini per tipo di lavorazione: identifica quali sono più redditizie e orientati verso quelle",
      "2-3": "Riduci la dipendenza dal cliente principale — nessun singolo cliente oltre il 40% del fatturato",
      "3-4": "Attiva contratti di fornitura continuativa con i clienti principali per garantire un volume base di ricavi stabili",
      "4-5": "Portafoglio clienti diversificato per settore con contratti quadro pluriennali e forecast fatturato affidabile a 12 mesi"

    },
    "marketing": {
      "1-2": "Crea una pagina LinkedIn aziendale con lavorazioni principali, materiali lavorati, tolleranze e certificazioni",
      "2-3": "Partecipa a una fiera di settore (BI-MU, EMO) e attiva campagne LinkedIn verso buyer e responsabili acquisti industriali",
      "3-4": "Content marketing tecnico: case history, video lavorazioni, articoli su riviste di settore per costruire autorevolezza",
      "4-5": "Piano marketing strutturato con fiere internazionali, digital B2B, PR di settore e co-marketing con clienti anchor"

    },
    "sitoweb": {
      "1-2": "Sito vetrina con lavorazioni, materiali, tolleranze, certificazioni e modulo richiesta preventivo",
      "2-3": "Sito con galleria lavori realizzati, settori serviti e area download schede tecniche",
      "3-4": "Sito professionale con SEO industriale, case history clienti e form preventivo strutturato con specifiche tecniche",
      "4-5": "Portale con configuratore preventivi online, area clienti riservata e catalogo lavorazioni completo"

    },
    "ecommerce": {
      "1-2": "Parco macchine datato o generico: identifica quale lavorazione perdi più spesso per limiti di attrezzatura",
      "2-3": "Primo investimento mirato: un centro di lavoro CNC o una macchina specifica per il mercato che vuoi conquistare",
      "3-4": "Parco macchine aggiornato con capacità multi-asse, attrezzature speciali e accordi di subappalto per lavorazioni complementari",
      "4-5": "Linea produttiva strutturata con pianificazione capacità, manutenzione programmata e OEE monitorato mensilmente"

    }
  },
  "manifatturiero_automotive": {
    "vendite": {
      "1-2": "Non si vende con un commerciale: entra nelle vendor list dei tier-1 locali. Prepara un dossier aziendale con capacità produttive, certificazioni e referenze clienti",
      "2-3": "Partecipa alle qualifiche fornitori dei tier-1 della tua zona. Usa un tecnico interno come interfaccia con gli uffici acquisti — la relazione tecnica conta più di quella commerciale",
      "3-4": "Nomina un key account dedicato ai clienti automotive con conoscenza dei processi APQP/PPAP e capacità di gestire audit clienti",
      "4-5": "Struttura un ufficio commerciale-tecnico con key account per cliente, gestione RFQ strutturata e partecipazione a gare internazionali"

    },
    "pipeline": {
      "1-2": "Traccia su Excel tutte le RFQ ricevute: cliente, componente, volumi stimati, data risposta e stato",
      "2-3": "Adotta un sistema di gestione offerte con storico RFQ, win/loss rate per cliente e tempi medi di risposta",
      "3-4": "Pipeline strutturata con forecast volumi per cliente, gestione change requests e monitoraggio cost reduction annua",
      "4-5": "Sistema integrato RFQ-produzione-fatturazione con EDI verso i clienti principali e dashboard forecast 12 mesi"

    },
    "team": {
      "1-2": "Forma un operaio senior come quality champion interno — primo responsabile della conformità sul campo",
      "2-3": "Assumi un quality engineer dedicato: gestisce le non conformità, gli audit clienti e la documentazione PPAP",
      "3-4": "Team tecnico-commerciale strutturato: quality manager + process engineer + inside sales per gestione ordini",
      "4-5": "Struttura completa con direttore tecnico, quality manager, process engineering e customer service dedicato per cliente"

    },
    "processi": {
      "1-2": "Check base sicurezza obbligatorio: DVR, DPI, formazione operatori. Avvia il percorso IATF 16949 — senza non puoi entrare nella supply chain automotive",
      "2-3": "Implementa IATF 16949: control plan, FMEA, MSA. Formazione sicurezza avanzata per operatori su macchine a rischio. Referente qualità nominato internamente",
      "3-4": "Sistema qualità IATF certificato e mantenuto. Audit interni programmati, gestione NC strutturata, KPI qualità monitorati. Zero infortuni come obiettivo aziendale misurabile",
      "4-5": "Eccellenza operativa: IATF + sistemi lean/Six Sigma, OEE monitorato in tempo reale, audit clienti sempre superati, sistema sicurezza integrato nella cultura aziendale"

    },
    "ricavi": {
      "1-2": "Analizza i margini per componente: l'automotive paga puntuale ma negozia duro — identifica i prodotti sotto margine da abbandonare o rinegoziare",
      "2-3": "Prepara una strategia per la cost reduction annua richiesta dai clienti: efficienza produttiva, riduzione scarti, ottimizzazione acquisti materie prime",
      "3-4": "Contratti pluriennali con pricing strutturato che include la cost reduction programmata. Diversifica su almeno 3-4 clienti automotive per ridurre il rischio di singola piattaforma",
      "4-5": "Portfolio bilanciato tra automotive (volumi stabili) e altri settori (margini migliori). Contratti LTA con forecast vincolanti e gestione del rischio commodity"

    },
    "marketing": {
      "1-2": "Aggiorna il sito con capacità produttive dettagliate, certificazioni IATF, attrezzature e settori serviti — i buyer automotive lo verificano prima di qualsiasi contatto",
      "2-3": "Iscrizione ai portali fornitori dei principali OEM e tier-1 della tua area. Presenza su Automotive Supplier Directory",
      "3-4": "Partecipazione a fiere di settore (Mecspe, Euromold) con focus su innovazione processo e nuovi materiali. Case history certificati con clienti anchor",
      "4-5": "Posizionamento come fornitore tecnico di eccellenza: white paper, partecipazione a tavoli di settore ANFIA, co-sviluppo con clienti strategici"

    },
    "sitoweb": {
      "1-2": "Sito con scheda tecnica dettagliata: lavorazioni, materiali, tolleranze, strumenti di misura, certificazioni e capacità produttiva mensile",
      "2-3": "Sito aggiornato con IATF 16949 in evidenza, galleria componenti realizzati per settore e modulo RFQ strutturato",
      "3-4": "Sito professionale con case history automotive, download certificazioni e area fornitori per gestione documentazione",
      "4-5": "Portale B2B con area clienti dedicata, gestione documenti qualità online e integrazione con sistemi EDI dei clienti principali"

    },
    "ecommerce": {
      "1-2": "Macchine standard — identifica le tolleranze che non riesci a garantire e che ti escludono dalle RFQ più redditizie",
      "2-3": "Investi in strumentazione di misura (CMM, rugosimetro) e in almeno un centro di lavoro CNC a 4-5 assi per componenti complessi",
      "3-4": "Parco macchine automotive-grade: tolleranze micrometriche garantite, capacità di produzione in lotti ripetibili con SPC attivo",
      "4-5": "Linea produttiva dedicata all'automotive con celle robotizzate, controllo qualità in-process automatizzato e OEE superiore all'85%"

    }
  },
  "manifatturiero_packaging": {
    "vendite": {
      "1-2": "Il titolare gestisce tutto: individua 2-3 clienti industriali locali (food, cosmetica, e-commerce) a cui proporre campioni e preventivi per piccoli lotti",
      "2-3": "Attiva 1-2 agenti con esperienza nel settore packaging o nel food/farmaceutico per coprire zone o clienti che non riesci a seguire direttamente",
      "3-4": "Struttura un team commerciale con inside sales per la gestione ordini ripetuti e un key account per i clienti GDO e industriali strategici",
      "4-5": "Direzione commerciale completa con key account per cliente, gestione gare annuali strutturata e presidio dei canali GDO, farmaceutico e food"

    },
    "pipeline": {
      "1-2": "Crea un registro ordini su Excel: cliente, prodotto, volumi, scadenza e stato. Tieni traccia delle gare annuali in scadenza",
      "2-3": "Adotta un CRM semplice per tracciare preventivi, campioni inviati, follow-up e rinnovi contratto annuali",
      "3-4": "Pipeline strutturata con forecast volumi per cliente, gestione gare con anticipo e monitoraggio rinnovi contratti",
      "4-5": "Sistema integrato ordini-produzione-fatturazione con EDI verso i clienti GDO e dashboard forecast 12 mesi"

    },
    "team": {
      "1-2": "Forma un operaio senior come riferimento tecnico per i clienti — sa rispondere alle domande su materiali, spessori e certificazioni",
      "2-3": "Assumi un inside sales con conoscenza dei materiali e dei processi di stampa per gestire preventivi e campioni in autonomia",
      "3-4": "Team strutturato: commerciale senior + grafico/reparto prestampa + back office ordini con ruoli definiti",
      "4-5": "Struttura completa con direttore commerciale, key account, reparto grafico interno e customer service dedicato"

    },
    "processi": {
      "1-2": "Check base sicurezza: DVR aggiornato, DPI per operatori su macchinari di stampa e taglio, formazione obbligatoria. Inizia il percorso FSC se lavori con carta e cartone",
      "2-3": "Certificazione FSC per carta/cartone. Formazione sicurezza avanzata su macchinari. Se servi il food avvia ISO 22000 — è un requisito dei clienti GDO e industria alimentare",
      "3-4": "ISO 22000 per imballaggi alimentari, ISO 15378 se servi il farmaceutico. Audit sicurezza interni programmati, near-miss tracciati. Processi di controllo qualità stampa documentati",
      "4-5": "Sistema qualità e sicurezza integrato: certificazioni multiple mantenute, sustainability report annuale, carbon footprint calcolata, packaging biodegradabile certificato come leva commerciale"

    },
    "ricavi": {
      "1-2": "Analizza i margini per linea prodotto: i lotti piccoli custom hanno margini migliori dei grandi volumi standard — orienta il mix verso quelli",
      "2-3": "Contratti annuali con i clienti principali per garantire volumi minimi. Attenzione al costo materie prime: carta e plastica oscillano molto",
      "3-4": "Diversifica su almeno 3 settori clienti (es. food + cosmetica + e-commerce) per ridurre il rischio di concentrazione. Pricing strutturato per volume e personalizzazione",
      "4-5": "Portfolio clienti bilanciato con contratti pluriennali, clausole di indicizzazione al costo materie prime e revenue ricorrente da clienti con ordini automatici"

    },
    "marketing": {
      "1-2": "Crea campionari fisici e digitali con tutti i formati, materiali e opzioni di stampa disponibili — è lo strumento di vendita principale nel packaging",
      "2-3": "Partecipa a Packaging Première o Ipack-Ima. Attiva LinkedIn con case history visive — il packaging si vende con gli occhi",
      "3-4": "Content marketing su sostenibilità e innovazione materiali: articoli, video, post LinkedIn verso buyer food e farmaceutico. Certificazioni in evidenza sul sito",
      "4-5": "Piano marketing strutturato con fiere internazionale (Interpack Düsseldorf), co-marketing con clienti anchor e posizionamento come partner di innovazione packaging"

    },
    "sitoweb": {
      "1-2": "Sito con catalogo prodotti visivo: foto campioni, materiali disponibili, opzioni di stampa e modulo richiesta campione gratuito",
      "2-3": "Sito con galleria lavori realizzati per settore, certificazioni in evidenza (FSC, ISO) e configuratore formato base",
      "3-4": "Sito professionale con case history clienti, sezione sostenibilità con dati concreti e form preventivo strutturato con specifiche tecniche",
      "4-5": "Portale B2B con area clienti, riordino online, tracking ordini e catalogo personalizzato per cliente"

    },
    "ecommerce": {
      "1-2": "Macchinari datati o poco versatili: identifica i formati o le lavorazioni che devi rifiutare più spesso per limiti tecnici",
      "2-3": "Investi in una macchina da stampa digitale per piccoli lotti personalizzati — ti apre il mercato e-commerce e PMI senza minimi d'ordine alti",
      "3-4": "Parco macchine versatile: stampa offset + digitale + fustellatura + accoppiamento. Capacità produttiva certificata per food e farmaceutico",
      "4-5": "Linea produttiva automatizzata con controllo qualità in-process, cambio formato rapido e capacità di gestire lotti da 100 a 1.000.000 pezzi sulla stessa linea"

    }
  },
  "manifatturiero_cterzi": {
    "vendite": {
      "1-2": "Non aspettare che i clienti ti chiamino: mappa 10-15 aziende della tua zona che potrebbero aver bisogno delle tue lavorazioni e contattale con un dossier aziendale (capacità, attrezzature, referenze)",
      "2-3": "Specializzati su una lavorazione o un materiale specifico — diventa il riferimento nella tua zona per quel processo. È più efficace che essere generici per tutti",
      "3-4": "Attiva un agente o un procacciatore con contatti nel settore industriale per aprire nuovi clienti in zone o settori che non presidia",
      "4-5": "Struttura commerciale con key account dedicati ai clienti strategici e pipeline attiva per nuovi clienti in settori diversificati"

    },
    "pipeline": {
      "1-2": "Traccia su Excel tutte le richieste ricevute: cliente, lavorazione, quantità, valore e stato. Tieni memoria di chi hai contattato e con quale esito",
      "2-3": "CRM semplice per gestire le trattative attive, i follow-up sulle offerte inviate e lo storico ordini per cliente",
      "3-4": "Pipeline strutturata con forecast mensile, tempi medi di preventivazione e win rate per tipo di lavorazione",
      "4-5": "CRM integrato con produzione: dalla richiesta al preventivo all'ordine alla consegna — tutto tracciato con KPI monitorati"

    },
    "team": {
      "1-2": "Il titolare fa tutto. Individua almeno un operaio senior che possa gestire i clienti abituali quando sei in produzione",
      "2-3": "Assumi un back office o una figura amministrativo-commerciale che gestisca preventivi, ordini e comunicazione clienti",
      "3-4": "Team strutturato: referente commerciale interno + responsabile produzione con autonomia operativa",
      "4-5": "Struttura completa con responsabile commerciale, responsabile produzione e quality manager — il titolare esce dall'operativo"

    },
    "processi": {
      "1-2": "Check base sicurezza obbligatorio: DVR, DPI, formazione operatori. Standardizza i tempi di risposta ai preventivi — massimo 48 ore è il minimo per essere competitivi",
      "2-3": "Sistema di gestione commesse con priorità, stato avanzamento e date di consegna. Formazione sicurezza avanzata. Riduci i ritardi di consegna — è la lamentela numero uno dei clienti verso i terzisti",
      "3-4": "Controllo qualità documentato su ogni lotto. Audit sicurezza interni. ISO 9001 se vuoi entrare nei vendor list dei clienti strutturati — senza non passi la qualifica",
      "4-5": "ERP integrato con produzione, qualità e fatturazione. Sistema sicurezza come KPI aziendale. Certificazioni specifiche per settore (IATF per automotive, ISO 13485 per medicale)"

    },
    "ricavi": {
      "1-2": "Analizza subito la concentrazione clienti: se un solo cliente vale più del 50% del fatturato sei in zona di rischio esistenziale — inizia oggi a cercarne altri",
      "2-3": "Obiettivo concreto: nessun cliente oltre il 35% del fatturato. Ogni nuovo cliente acquisito riduce il rischio e aumenta il potere negoziale con i vecchi",
      "3-4": "Portafoglio con almeno 5-6 clienti attivi in settori diversi. Contratti di fornitura con volumi minimi garantiti per i clienti principali",
      "4-5": "Diversificazione completa per settore e dimensione cliente. Forecast fatturato affidabile a 12 mesi. Pricing strutturato che include il costo del rischio di concentrazione"

    },
    "marketing": {
      "1-2": "Crea un dossier aziendale PDF con lavorazioni, materiali, attrezzature, tolleranze e referenze — è il tuo biglietto da visita quando butti bussare a nuovi clienti",
      "2-3": "Profilo LinkedIn aziendale aggiornato con foto del reparto, macchine e lavorazioni. I responsabili acquisti cercano fornitori anche lì",
      "3-4": "Partecipa a Mecspe o a fiere di settore specifiche per il tuo mercato principale. Raccogli testimonianze scritte dai clienti soddisfatti",
      "4-5": "Posizionamento come specialista di riferimento per la tua lavorazione: content tecnico, presenza su directory fornitori industriali, co-marketing con clienti anchor"

    },
    "sitoweb": {
      "1-2": "Sito essenziale ma professionale: lavorazioni, materiali, attrezzature con foto reali, tolleranze garantite e modulo richiesta preventivo",
      "2-3": "Sito con galleria lavori realizzati, settori serviti, certificazioni e tempi medi di consegna — informazioni che un buyer cerca in 30 secondi",
      "3-4": "Sito ottimizzato per ricerche locali (es. 'torneria conto terzi Milano') con case history e form preventivo strutturato",
      "4-5": "Portale con area clienti per tracking ordini, download certificati di conformità e storico forniture"

    },
    "ecommerce": {
      "1-2": "Mappa le lavorazioni che devi rifiutare più spesso: sono opportunità perse che indicano dove investire",
      "2-3": "Investi in una macchina o attrezzatura che ti permette di fare lavorazioni complementari a quelle attuali — aumenta il valore per pezzo e riduce i fornitori del cliente",
      "3-4": "Parco macchine versatile con capacità di fare lavorazioni complete: dalla materia prima al pezzo finito colaudato. Riduci i terzisti dei tuoi clienti",
      "4-5": "Linea produttiva strutturata con capacità di gestire più lavorazioni in sequenza, controllo qualità integrato e certificazioni che aprono nuovi settori"

    }
  },
  "manifatturiero_elettromeccanica": {
    "vendite": {
      "1-2": "Il tecnico è il venditore: identifica 3-5 aziende che usano sistemi simili ai tuoi e proponi un incontro tecnico — non commerciale. I buyer comprano competenza, non pezzi",
      "2-3": "Attiva un tecnico-commerciale interno o un agente con background ingegneristico: sa parlare con i progettisti dei clienti e capisce le specifiche tecniche",
      "3-4": "Key account tecnici dedicati ai clienti strategici: gestiscono la relazione ingegnere-ingegnere, i progetti di co-sviluppo e le gare tecniche",
      "4-5": "Struttura commerciale-tecnica completa con application engineer per pre-vendita, key account per clienti e inside sales per ordini ripetuti e ricambi"

    },
    "pipeline": {
      "1-2": "Traccia su Excel tutti i progetti in corso: cliente, specifica tecnica, valore stimato, fase e data decisione",
      "2-3": "CRM con gestione progetti tecnici: dalla specifica al preventivo all'ordine. Tieni traccia anche delle installazioni attive — sono la fonte dei contratti service",
      "3-4": "Pipeline strutturata con forecast per fase progetto, gestione opportunità di upsell su installazioni esistenti e monitoraggio scadenze contratti manutenzione",
      "4-5": "CRM integrato con gestione commesse, post vendita e contratti service — visibilità completa dal preventivo al ciclo di vita del prodotto"

    },
    "team": {
      "1-2": "Il titolare è anche l'ingegnere. Forma un tecnico interno che possa gestire le installazioni e la prima assistenza in autonomia",
      "2-3": "Assumi un application engineer o un tecnico senior che possa supportare i clienti nelle fasi di integrazione e start-up",
      "3-4": "Team tecnico strutturato: progettazione + produzione + service con ruoli distinti. Il service non è un costo — è un centro di profitto",
      "4-5": "Struttura completa con direttore tecnico, team R&D, produzione e service dedicato con SLA definiti per i clienti sotto contratto"

    },
    "processi": {
      "1-2": "Check sicurezza obbligatorio: DVR, DPI per lavori su impianti elettrici, formazione PES/PAV obbligatoria per chi lavora sotto tensione. Marcatura CE su tutti i prodotti — è un obbligo di legge",
      "2-3": "Direttiva Macchine e Direttiva Bassa Tensione documentate e applicate su ogni prodotto. Formazione sicurezza avanzata. Fascicolo tecnico completo per ogni prodotto — ti copre legalmente e apre porte commerciali",
      "3-4": "ISO 9001 per la gestione qualità. Processi di test e collaudo documentati per ogni prodotto. Audit sicurezza interni. Prerequisito per fornire energia, trasporti e industria di processo",
      "4-5": "Sistema qualità certificato, processi R&D strutturati, ERP integrato con produzione e service. Zero infortuni come KPI. Certificazioni specifiche per settore (ATEX per ambienti esplosivi, IECEx)"

    },
    "ricavi": {
      "1-2": "Inizia a offrire assistenza tecnica a pagamento — anche solo 2-3 interventi al mese di post vendita sono fatturato puro ad alto margine",
      "2-3": "Proponi contratti di manutenzione preventiva annuale ai clienti con installazioni attive: costo fisso per loro, ricavo ricorrente per te",
      "3-4": "Service contract pluriennali con SLA definiti (tempi di intervento, disponibilità ricambi). Il service vale spesso più della vendita iniziale in termini di margine",
      "4-5": "Centro di profitto service autonomo: contratti pluriennali, fornitura ricambi proprietari, aggiornamenti firmware e upgrade. Fatturato ricorrente prevedibile e margini superiori al 40%"

    },
    "marketing": {
      "1-2": "Scheda tecnica professionale per ogni prodotto: specifiche, certificazioni, settori applicativi e casi d'uso. È il primo filtro dei progettisti quando cercano componenti",
      "2-3": "Presenza su SPS Italia o Motek. LinkedIn con contenuti tecnici verso progettisti e responsabili manutenzione — sono loro che decidono il fornitore",
      "3-4": "Case history tecnici con dati reali: problema del cliente, soluzione adottata, risultati misurati. I progettisti li condividono tra colleghi",
      "4-5": "Posizionamento come partner tecnologico: white paper, webinar tecnici, partecipazione a tavoli di normazione e co-sviluppo con clienti anchor"

    },
    "sitoweb": {
      "1-2": "Sito con catalogo prodotti tecnico: specifiche, dimensioni, certificazioni, settori applicativi e download datasheet",
      "2-3": "Sito con sezione applicazioni per settore, galleria installazioni realizzate e area download documentazione tecnica",
      "3-4": "Sito professionale con configuratore prodotto, richiesta preventivo strutturata con specifiche tecniche e area clienti per documentazione",
      "4-5": "Portale tecnico completo: configuratore avanzato, area clienti con storico ordini e interventi, richiesta ricambi online e accesso remoto alla documentazione di installazione"

    },
    "ecommerce": {
      "1-2": "Valuta il tuo software di progettazione: se usi ancora AutoCAD 2D sei in svantaggio — i clienti avanzati richiedono modelli 3D e simulazioni",
      "2-3": "Investi in CAD 3D professionale (SolidWorks, Inventor) e in strumentazione di collaudo adeguata — banchi test, oscilloscopi, analizzatori di rete",
      "3-4": "Laboratorio R&D strutturato con strumentazione di misura certificata, software di simulazione e prototipazione rapida per ridurre i tempi di sviluppo",
      "4-5": "Centro tecnologico completo con R&D dedicato, laboratorio di certificazione interno, software PLM per gestione ciclo vita prodotto e capacità di sviluppo firmware/software embedded"

    }
  },
  "manifatturiero_tessile_tessuti": {
    "vendite": {
      "1-2": "Prepara un campionario fisico professionale con cartella colori stagionale, schede tecniche e listino prezzi al metro — è il tuo strumento di vendita principale",
      "2-3": "Attiva 1-2 agenti plurimandatari con portafoglio clienti nel fashion e nel tessile. Partecipa a Milano Unica — è dove si fa business in Italia",
      "3-4": "Rete agenti strutturata per mercato con obiettivi stagionali. Presenza a Première Vision Parigi — accesso ai brand internazionali e agli uffici stile delle maison",
      "4-5": "Struttura commerciale con area manager per mercato (Italia, Francia, Germania, UK), campionario digitale e B2B portal per ordini diretti dagli uffici stile"

    },
    "pipeline": {
      "1-2": "Traccia su Excel le richieste campioni inviate: brand, stagione, articolo, metraggio stimato e stato. Il follow-up sistematico dopo le fiere è fondamentale",
      "2-3": "CRM semplice per gestire i contatti fiera, i campioni inviati e le conferme ordine per stagione. Tieni traccia dei clienti per stagione precedente",
      "3-4": "Pipeline strutturata per stagione con forecast metraggio per cliente, gestione sviluppi colore e monitoraggio tempi di approvazione campioni",
      "4-5": "Sistema integrato campionario-ordini-produzione con portale B2B per ordini diretti e forecast stagionale condiviso con i clienti principali"

    },
    "team": {
      "1-2": "Il titolare gestisce tutto. Forma un collaboratore interno sulla presentazione del campionario e sulla gestione delle richieste campioni",
      "2-3": "Assumi un inside sales o un assistente commerciale con conoscenza del settore tessile per gestire gli ordini e i follow-up stagionali",
      "3-4": "Team commerciale con responsabile vendite Italia + agenti + back office ordini. Reparto sviluppo colori con colorista dedicato",
      "4-5": "Struttura completa con direttore commerciale, team vendite per mercato, reparto sviluppo prodotto e customer service dedicato ai brand principali"

    },
    "processi": {
      "1-2": "Check sicurezza obbligatorio: DVR, DPI per operatori su telai e macchine tessili, formazione obbligatoria. Inizia il percorso OEKO-TEX Standard 100 — sempre più brand lo richiedono nei capitolati",
      "2-3": "OEKO-TEX Standard 100 ottenuto. Formazione sicurezza avanzata. Processi di controllo qualità tessuto documentati: titolo, grammatura, solidità colori, restringimento",
      "3-4": "GOTS se usi fibre biologiche. Processi di sviluppo colore e campionatura standardizzati con tempi definiti. Audit sicurezza interni. Prerequisito per lavorare con brand sostenibili",
      "4-5": "Sistema qualità completo con certificazioni multiple mantenute, tracciabilità filiera documentata, carbon footprint calcolata e sustainability report annuale per i brand più esigenti"

    },
    "ricavi": {
      "1-2": "Analizza i margini per articolo e per stagione: identifica i tessuti a più alto valore aggiunto su cui concentrare lo sviluppo del campionario",
      "2-3": "Contratti stagionali con i brand principali per garantire volumi minimi. Attenzione al costo materie prime — il cotone e la lana oscillano molto",
      "3-4": "Diversifica su almeno 3-4 segmenti clienti (lusso, contemporary, sportswear, arredo) per ridurre il rischio della stagionalità e delle tendenze moda",
      "4-5": "Portfolio bilanciato con contratti pluriennali sui best seller, sviluppo esclusivo per brand anchor e revenue da licenze o co-design"

    },
    "marketing": {
      "1-2": "Profilo LinkedIn aziendale con foto del campionario, dettagli tecnici dei tessuti e settori serviti. Schede tecniche scaricabili sul sito",
      "2-3": "Presenza professionale a Milano Unica e alle fiere regionali. Lookbook stagionale digitale da inviare ai contatti dopo ogni fiera",
      "3-4": "Content marketing su sostenibilità e innovazione tessile. Presenza su Première Vision con stand professionale. Collaborazioni con fashion school per visibilità",
      "4-5": "Posizionamento come produttore di eccellenza: editorial in riviste di settore (Vogue Italia, Textile View), partnership con designer emergenti, showroom a Milano o Parigi"

    },
    "sitoweb": {
      "1-2": "Sito con catalogo tessuti fotografato professionalmente: composizione, peso, larghezza, disponibilità colori e richiesta campione",
      "2-3": "Sito con collezione stagionale aggiornata, certificazioni in evidenza e area download schede tecniche",
      "3-4": "Sito professionale con lookbook digitale, filtro per composizione e destinazione d'uso, e form richiesta campioni strutturato",
      "4-5": "Portale B2B con area brand riservata, campionario digitale interattivo, ordini online e tracking consegne campioni"

    },
    "ecommerce": {
      "1-2": "Valuta il parco telai e macchine: identifica i titoli, le composizioni o le lavorazioni che non riesci a produrre e che ti escludono da certi segmenti di mercato",
      "2-3": "Investi in attrezzatura per lavorazioni speciali (jacquard, velluto, stampa digitale) che alzano il valore al metro e aprono segmenti premium",
      "3-4": "Parco macchine versatile per lavorare composizioni diverse: fibre naturali, tecnici, riciclati. Laboratorio colori interno per sviluppi rapidi",
      "4-5": "Reparto R&D tessile strutturato: sviluppo nuove strutture, laboratorio test prestazionali, collaborazioni con università tessili e capacità di brevettare innovazioni"

    }
  },
  "manifatturiero_tessile_capi": {
    "vendite": {
      "1-2": "Prepara un campionario capi fotografato professionalmente con schede prodotto, composizioni, taglie disponibili e listino ingrosso — è il tuo strumento di vendita principale",
      "2-3": "Attiva agenti plurimandatari con portafoglio clienti nel fashion wholesale. Partecipa a fiere di settore (White Milano, Pitti Uomo) per incontrare buyer e brand",
      "3-4": "Rete agenti strutturata per canale (multimarca, GDO, brand in licenza) con obiettivi stagionali. Presenza a fiere internazionali per aprire mercati esteri",
      "4-5": "Struttura commerciale con area manager per canale e mercato, showroom dedicato e portale B2B per ordini diretti dai buyer"

    },
    "pipeline": {
      "1-2": "Traccia su Excel gli ordini per stagione: cliente, collezione, pezzi, valore e stato consegna. Il sell-through dei clienti è il KPI più importante da monitorare",
      "2-3": "CRM per gestire i contatti buyer, i campioni inviati e gli ordini stagionali. Tieni traccia del riordino — i clienti che riordinano sono oro",
      "3-4": "Pipeline strutturata con forecast per stagione e per canale. Gestione anticipi, conferme ordine e pianificazione produzione integrata",
      "4-5": "Sistema integrato ordini-produzione-logistica con EDI verso i clienti GDO e portale B2B per ordini diretti e tracking consegne"

    },
    "team": {
      "1-2": "Il titolare gestisce tutto. Forma un collaboratore per la gestione ordini e la comunicazione con i clienti durante le stagioni di punta",
      "2-3": "Assumi un inside sales con esperienza nel fashion wholesale per gestire gli ordini stagionali e il follow-up buyer in autonomia",
      "3-4": "Team commerciale con responsabile vendite, agenti e back office ordini. Responsabile produzione con autonomia sulla pianificazione",
      "4-5": "Struttura completa con direttore commerciale, team vendite per canale, responsabile produzione e logistica e customer service dedicato"

    },
    "processi": {
      "1-2": "Check sicurezza obbligatorio: DVR, DPI per operatori su macchine da cucire e taglio, formazione obbligatoria. OEKO-TEX sui tessuti utilizzati — sempre più buyer lo richiedono",
      "2-3": "Controllo qualità capi documentato: misure, finiture, solidità colori, etichettatura CE. Formazione sicurezza avanzata. SA8000 se vuoi lavorare con brand internazionali attenti alla responsabilità sociale",
      "3-4": "GOTS se usi materiali biologici. Processi di campionatura standardizzati con tempi definiti. Audit sicurezza interni. Tracciabilità filiera documentata per i buyer più esigenti",
      "4-5": "Sistema qualità completo con certificazioni mantenute, sustainability report annuale, carbon footprint calcolata e politica di produzione responsabile come leva commerciale"

    },
    "ricavi": {
      "1-2": "Analizza i margini per capo e per canale: il multimarca paga di meno ma è più stabile, il brand in licenza paga meglio ma richiede investimenti — trovare il mix giusto è la chiave",
      "2-3": "Contratti stagionali con i clienti principali per garantire volumi minimi. Attenzione ai tempi di pagamento — il tessile è noto per i ritardi",
      "3-4": "Diversifica su almeno 3 canali (multimarca, GDO, private label) per ridurre la dipendenza dalla stagionalità e dalle tendenze moda",
      "4-5": "Portfolio bilanciato con contratti pluriennali su linee best seller, sviluppo private label per retailer strutturati e revenue da licenze o co-design con brand"

    },
    "marketing": {
      "1-2": "Lookbook stagionale fotografato professionalmente con stilismo curato — è il tuo strumento di presentazione ai buyer",
      "2-3": "Presenza professionale a White Milano o Pitti. Instagram e LinkedIn con contenuti visivi della collezione stagionale verso buyer e stampa di settore",
      "3-4": "Ufficio stampa per visibilità su riviste di settore. Collaborazioni con influencer o stylist per dare visibilità alla collezione. PR verso buyer internazionali",
      "4-5": "Piano marketing strutturato con fiere internazionali, campagne digitali B2B, showroom a Milano e posizionamento come brand di produzione italiano di qualità"

    },
    "sitoweb": {
      "1-2": "Sito con lookbook stagionale, composizioni, taglie disponibili e modulo richiesta listino ingrosso",
      "2-3": "Sito con collezione aggiornata ogni stagione, certificazioni in evidenza e area download listino per buyer registrati",
      "3-4": "Sito professionale con lookbook interattivo, sezione sostenibilità e form ordine campioni strutturato",
      "4-5": "Portale B2B con area buyer riservata, ordini online, tracking consegne e catalogo stagionale interattivo"

    },
    "ecommerce": {
      "1-2": "Valuta le macchine e le lavorazioni disponibili: identifica le tipologie di capi che non riesci a produrre internamente e che devi subappaltare",
      "2-3": "Investi in macchinari per lavorazioni speciali (maglieria, ricamo, stampa digitale su tessuto) che alzano il valore del capo e aprono segmenti premium",
      "3-4": "Reparto produzione versatile per lavorare collezioni diverse: pronto, programmato e su misura. Capacità di gestire lotti piccoli per nicchie premium",
      "4-5": "Struttura produttiva flessibile con linee dedicate per canale, controllo qualità in-process e capacità di sviluppare e produrre internamente dall'ideazione al capo finito"

    }
  },
  "servizi_it": {
    "vendite": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "pipeline": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "team": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "processi": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "ricavi": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "marketing": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "sitoweb": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "ecommerce": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    }
  },
  "servizi_formazione": {
    "vendite": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "pipeline": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "team": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "processi": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "ricavi": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "marketing": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "sitoweb": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "ecommerce": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    }
  },
  "edilizia_residenziale": {
    "vendite": {
      "1-2": "Il cantiere aperto è la tua migliore vetrina: metti un cartello professionale con foto, contatti e QR code. Chiedi referenze attive ai clienti soddisfatti — il passaparola è il tuo canale principale",
      "2-3": "Costruisci una rete di segnalatori: geometri, architetti, studi tecnici della zona. Un accordo di segnalazione formale (anche solo una cena e un ringraziamento) vale più di qualsiasi pubblicità",
      "3-4": "Attiva un commerciale part-time o un procacciatore per sviluppare i contatti con sviluppatori immobiliari, cooperative e amministratori di condominio",
      "4-5": "Struttura commerciale con responsabile sviluppo clienti, rete di segnalatori attiva e presenza su portali immobiliari per nuove costruzioni e ristrutturazioni chiavi in mano"

    },
    "pipeline": {
      "1-2": "Tieni un registro delle trattative aperte su Excel: cliente, tipo di lavoro, valore stimato, stato e prossimo step. Con cicli di vendita lunghi la memoria non basta",
      "2-3": "CRM semplice per tracciare ogni contatto: sopralluogo, preventivo, follow-up e stato trattativa. I lavori si perdono spesso per mancanza di follow-up sistematico",
      "3-4": "Pipeline strutturata con forecast mensile, gestione SAL per cantieri attivi e monitoraggio scadenze preventivi aperti",
      "4-5": "Sistema integrato trattative-cantieri-fatturazione con gestione SAL automatizzata e forecast trimestrale affidabile"

    },
    "team": {
      "1-2": "Collaboratore esterno a P.IVA (geometra junior o praticante) per supporto su sopralluoghi e pratiche amministrative",
      "2-3": "Geometra o perito dipendente (RAL 28-32k) per gestire pratiche, computi metrici e direzione lavori in autonomia",
      "3-4": "Coordinatore cantieri senior (RAL 35-40k) con capacità di gestire più cantieri in parallelo e interfacciarsi con i clienti",
      "4-5": "Struttura operativa completa: direttore tecnico, coordinatore cantieri, geometra e back office amministrativo"

    },
    "processi": {
      "1-2": "Check sicurezza obbligatorio: DVR cantieri, DPI per tutti gli operatori, PSC per cantieri sopra soglia. Computo metrico su Excel strutturato con voci di costo separate",
      "2-3": "Software preventivazione base (PriMus free o Edilius): preventivi accurati riducono i cantieri in perdita. Formazione sicurezza avanzata, RSPP nominato",
      "3-4": "Gestionale cantieri con SAL documentati, controllo costi in tempo reale e scostamenti budget. Coordinatore sicurezza esterno qualificato per cantieri complessi",
      "4-5": "ERP edile integrato con produzione, subappalti e fatturazione. Sistema sicurezza strutturato come KPI aziendale. SOA se vuoi accedere agli appalti pubblici"

    },
    "ricavi": {
      "1-2": "Analizza i margini per tipo di lavoro: nuova costruzione vs ristrutturazione vs manutenzione. Identifica dove guadagni davvero e orienta lo sviluppo clienti verso quei lavori",
      "2-3": "Struttura gli anticipi e i SAL in modo chiaro nel contratto — il cash flow è il problema numero uno dell'edilizia. Mai iniziare un cantiere senza acconto",
      "3-4": "Contratti chiari con capitolato dettagliato, SAL concordati e clausole di revisione prezzi per lavori lunghi. Riduci i lavori extra non fatturati",
      "4-5": "Portfolio lavori diversificato (privati + cooperative + sviluppatori) con contratti strutturati, polizze decennali come leva commerciale e forecast trimestrale"

    },
    "marketing": {
      "1-2": "Profilo Google My Business completo con foto cantieri, recensioni clienti e risposta attiva. È il primo posto dove ti cercano i privati",
      "2-3": "Sito con galleria before/after, testimonianze clienti e modulo richiesta preventivo. Instagram con aggiornamenti di cantiere — i privati adorano seguire i lavori",
      "3-4": "Google Ads locali su ricerche come 'costruttori X città' e 'ristrutturazione casa X città'. Case history complete con foto, tempi e budget rispettati",
      "4-5": "Piano marketing strutturato: Google Ads + social + PR locale + presenza su portali immobiliari come costruttore di riferimento della zona"

    },
    "sitoweb": {
      "1-2": "Sito base con presentazione aziendale, galleria lavori con foto professionali, referenze e contatti chiari",
      "2-3": "Sito con galleria before/after per tipo di intervento, testimonianze clienti verificate e modulo richiesta sopralluogo gratuito",
      "3-4": "Sito professionale con SEO locale, case history dettagliate con tempi e budget e sezione nuovi progetti in corso",
      "4-5": "Sito avanzato con configuratore preventivo base, area clienti per seguire lo stato del cantiere e blog tecnico su ristrutturazioni e normative"

    },
    "ecommerce": {
      "1-2": "Nessuna gestione strutturata: preventivi a memoria, fornitori scelti volta per volta, attrezzatura propria minima",
      "2-3": "Software preventivazione (PriMus o Edilius base) + scadenziario revisioni mezzi + accordi fissi con noleggiatori locali per ponteggi e attrezzatura",
      "3-4": "Gestionale cantieri completo con controllo costi per commessa, parco mezzi aziendale strutturato (furgoni in NLT, attrezzatura propria per lavorazioni ricorrenti)",
      "4-5": "ERP edile integrato con gestione subappalti e forniture, parco mezzi pianificato con manutenzione programmata e forecast costi per commessa"

    }
  },
  "edilizia_impianti": {
    "vendite": {
      "1-2": "Chiedi attivamente referenze ai clienti soddisfatti — un idraulico che risolve un'emergenza alle 22 viene raccontato a tutti. Metti un adesivo con il tuo numero su ogni impianto installato",
      "2-3": "Costruisci accordi con geometri, amministratori di condominio e imprese edili della zona: sono i tuoi segnalatori naturali. Un accordo anche solo informale porta lavoro costante",
      "3-4": "Attiva un commerciale part-time per sviluppare il segmento condomini e aziende: contratti manutenzione su scala, non solo interventi spot",
      "4-5": "Struttura commerciale con key account dedicati a condomini, facility manager e aziende. Il passaparola rimane la base ma diventa sistematico e misurabile"

    },
    "pipeline": {
      "1-2": "Tieni un registro degli interventi su Excel: cliente, tipo di impianto, data, valore e note. È la base per proporre contratti manutenzione ai clienti abituali",
      "2-3": "CRM semplice per tracciare clienti attivi, scadenze manutenzione e follow-up preventivi aperti. Le scadenze dei controlli caldaia sono opportunità di contatto automatico",
      "3-4": "Pipeline strutturata con gestione contratti manutenzione attivi, scadenze revisioni e forecast mensile interventi programmati vs spot",
      "4-5": "Sistema integrato interventi-contratti-fatturazione con reminder automatici per scadenze manutenzione e dashboard ricavi ricorrenti vs una tantum"

    },
    "team": {
      "1-2": "Collaboratore esterno a P.IVA per coprire i picchi di lavoro — un secondo paio di mani nelle emergenze vale oro",
      "2-3": "Primo dipendente tecnico (RAL 26-30k) con abilitazioni specifiche per espandere le tipologie di impianti gestibili",
      "3-4": "Team tecnico strutturato con figure specializzate: termoidraulico + elettricista + frigorista. Ognuno copre la sua area con autonomia",
      "4-5": "Struttura operativa completa con responsabile tecnico, squadre specializzate e reperibilità notturna organizzata per le emergenze"

    },
    "processi": {
      "1-2": "Abilitazioni base obbligatorie: legge 46/90 per elettricisti, libretto impianto per termoidraulici, DVR aggiornato. Senza non puoi lavorare legalmente",
      "2-3": "Patentino F-Gas per chi gestisce climatizzatori e pompe di calore — apre un mercato in forte crescita. Formazione sicurezza avanzata per lavori in quota e su impianti elettrici",
      "3-4": "ISO 9001 se vuoi accedere al facility management strutturato. Sistema di documentazione interventi completo: rapportini digitali, foto before/after, certificati di conformità",
      "4-5": "Sistema qualità certificato con SOA per appalti pubblici, certificazioni specifiche per settore (ATEX per ambienti esplosivi, medicale per ospedali) e KPI qualità monitorati"

    },
    "ricavi": {
      "1-2": "Inizia a proporre contratti manutenzione annuale caldaia ai clienti esistenti — è fatturato garantito, lavoro programmato e fidelizzazione in un colpo solo",
      "2-3": "Portfolio contratti manutenzione su almeno 30-50 clienti: la base del fatturato diventa prevedibile. Aggiungi manutenzione climatizzatori e impianti elettrici",
      "3-4": "Contratti pluriennali con condomini e aziende con SLA definiti (tempi di intervento garantiti). Il ricorrente supera il 40% del fatturato totale",
      "4-5": "Centro di profitto service autonomo: contratti pluriennali con SLA, fornitura ricambi, servizio reperibilità H24 a pagamento e upgrade impianti come leva commerciale"

    },
    "marketing": {
      "1-2": "Google My Business completo con foto lavori, recensioni clienti e risposta attiva. È il primo posto dove ti cercano i privati in emergenza",
      "2-3": "Sito con servizi chiari, zone coperte e numero di reperibilità in evidenza. Google Ads su ricerche locali tipo 'idraulico emergenza X città' — il ROI è immediato",
      "3-4": "Campagne Google Ads stagionali (manutenzione caldaie a settembre, climatizzatori a maggio). Raccolta recensioni sistematica dopo ogni intervento",
      "4-5": "Piano marketing strutturato con Google Ads + social + newsletter ai clienti con contratto per promemoria scadenze e promozioni stagionali"

    },
    "sitoweb": {
      "1-2": "Sito base con servizi, zona di copertura, numero reperibilità e modulo richiesta intervento — deve caricare in 2 secondi su mobile",
      "2-3": "Sito con galleria interventi realizzati, certificazioni in evidenza e area preventivo online per i lavori standard",
      "3-4": "Sito professionale con SEO locale per ogni tipo di impianto, area clienti per segnalare guasti e scaricare rapportini intervento",
      "4-5": "Portale clienti completo con storico interventi, scadenze manutenzione, richiesta assistenza online e pagamento fatture digitale"

    },
    "ecommerce": {
      "1-2": "Attrezzatura base propria per i lavori ricorrenti, noleggio spot per attrezzatura speciale. Furgone del titolare con scorta minima di ricambi più usati",
      "2-3": "Primo furgone aziendale attrezzato in NLT (~350€/mese tutto incluso) con scorta ricambi organizzata. Riduce i tempi di intervento e migliora l'immagine professionale",
      "3-4": "Parco furgoni per squadra (1 per tecnico) con attrezzatura specifica per tipo di impianto. Magazzino ricambi strutturato con i pezzi più richiesti sempre disponibili",
      "4-5": "Flotta aziendale gestita con manutenzione programmata, GPS per ottimizzare gli interventi e magazzino ricambi con riordino automatico sui consumi"

    }
  },
  "edilizia_serramenti": {
    "vendite": {
      "1-2": "Identifica 2-3 rivenditori locali o showroom a cui proporre la tua linea prodotti",
      "2-3": "Attiva una rete di agenti monomandatari con zona assegnata e listino prezzi definito",
      "3-4": "Struttura un key account manager dedicato ai clienti costruttori e general contractor",
      "4-5": "Crea una direzione commerciale con responsabile vendite, agenti e inside sales"

    },
    "pipeline": {
      "1-2": "Crea un registro offerte su Excel con cliente, prodotto, importo e stato",
      "2-3": "Adotta un CRM semplice (Pipedrive o Zoho) per tracciare offerte e follow-up",
      "3-4": "Implementa un processo di offerta standardizzato con tempi di risposta definiti",
      "4-5": "CRM avanzato integrato con gestione ordini, produzione e post-vendita"

    },
    "team": {
      "1-2": "Forma un collaboratore interno sulle caratteristiche tecniche dei prodotti per supportare le vendite",
      "2-3": "Assumi un agente o un addetto commerciale interno con obiettivi mensili",
      "3-4": "Struttura un team vendite con commerciale senior + supporto tecnico + back office",
      "4-5": "Direzione commerciale completa con responsabile, agenti zonali e customer service dedicato"

    },
    "processi": {
      "1-2": "Standardizza il processo di preventivazione con listino prezzi aggiornato e tempi di risposta",
      "2-3": "Crea un manuale operativo per la gestione ordini, consegne e reclami",
      "3-4": "Implementa un sistema di controllo qualità e gestione resi strutturato",
      "4-5": "Certificazioni ISO, processi ERP integrati, KPI operativi monitorati mensilmente"

    },
    "ricavi": {
      "1-2": "Analizza i margini per linea prodotto e identifica i prodotti più redditizi",
      "2-3": "Introduci una politica di sconti strutturata per volume e canale distributivo",
      "3-4": "Attiva contratti quadro con i clienti principali per garantire ricavi ricorrenti",
      "4-5": "Revenue management con pricing dinamico, contratti pluriennali e gestione portafoglio clienti"

    },
    "marketing": {
      "1-2": "Crea una scheda prodotto professionale con foto, specifiche tecniche e certificazioni",
      "2-3": "Partecipa a una fiera di settore (Made Expo, Fensterbau) e attiva LinkedIn aziendale",
      "3-4": "Campagne Google Ads su ricerche locali + catalogo digitale scaricabile",
      "4-5": "Piano marketing strutturato: fiere, digital, PR di settore e co-marketing con distributori"

    },
    "sitoweb": {
      "1-2": "Sito vetrina con catalogo prodotti, specifiche tecniche e modulo richiesta preventivo",
      "2-3": "Sito con area riservata per rivenditori, listino scaricabile e configuratore base",
      "3-4": "Sito professionale con SEO settoriale, case history installazioni e certificazioni",
      "4-5": "Portale B2B con ordini online per rivenditori, tracking consegne e supporto tecnico"

    },
    "ecommerce": {
      "1-2": "Vendi solo diretto: cliente finale chiama, tu preventivi e consegni",
      "2-3": "Attiva 1-2 rivenditori/showroom in zone limitrofe con accordo commerciale formale",
      "3-4": "Rete distributiva regionale con 5-10 rivenditori, agente di zona e politica commerciale",
      "4-5": "Rete nazionale con distributori regionali, agenti multi-zona e contratti OEM con costruttori"

    }
  },
  "commercio_distribuzione_industriale": {
    "vendite": {
      "1-2": "Il tuo agente deve conoscere gli impianti del cliente meglio del cliente stesso — visita periodica, check scorte, proposta proattiva prima che si rompa qualcosa. Chi aspetta l'ordine perde terreno ad Amazon Business",
      "2-3": "Segmenta i clienti per potenziale: il 20% dei clienti fa l'80% del fatturato. Concentra le visite sugli account strategici e attiva visite a cadenza fissa con agenda strutturata",
      "3-4": "Key account dedicati per i clienti più grandi con accordi di fornitura preferenziale, scorte dedicate e tempi di consegna garantiti. Il cliente grande vuole un interlocutore unico affidabile",
      "4-5": "Struttura commerciale con area manager, key account e inside sales per la gestione ordini ricorrenti. Integrazione con i sistemi e-procurement dei clienti principali"

    },
    "pipeline": {
      "1-2": "Traccia su Excel le visite clienti: data, prodotti discussi, opportunità aperte e follow-up. Senza tracciatura sistematica ogni visita riparte da zero",
      "2-3": "CRM per gestire il portafoglio clienti: storico acquisti, prodotti non ancora venduti al cliente, scadenze contratti e alert su cali di acquisto",
      "3-4": "Pipeline strutturata con forecast mensile per agente, wallet share per cliente e opportunità cross-selling identificate sistematicamente",
      "4-5": "CRM integrato con il gestionale: l'agente vede in tempo reale stock, prezzi, margini e storico cliente prima di ogni visita"

    },
    "team": {
      "1-2": "L'agente plurimandatario non conosce i tuoi prodotti abbastanza — formazione tecnica obbligatoria. Un agente che non sa rispondere alle domande tecniche perde l'ordine",
      "2-3": "Affianca agli agenti un inside sales tecnico: gestisce i clienti minori, risponde alle richieste urgenti e libera gli agenti per le visite strategiche",
      "3-4": "Team strutturato: agenti di zona + inside sales + application engineer per supporto tecnico avanzato. La competenza tecnica è il differenziatore vs Amazon Business",
      "4-5": "Struttura completa con direttore commerciale, key account, rete agenti e ufficio tecnico interno per consulenza e progettazione soluzioni"

    },
    "processi": {
      "1-2": "Gestione ordini strutturata: tempi di risposta definiti, conferma d'ordine sempre inviata, avviso anticipo in caso di ritardo. L'affidabilità è il tuo asset principale",
      "2-3": "Processo di gestione urgenze: il fermo macchina non aspetta. Definisci un protocollo per le consegne urgenti con tempi garantiti — è la leva che giustifica il prezzo superiore ad Amazon",
      "3-4": "Processi certificati ISO 9001, gestione resi strutturata e KPI di servizio monitorati: tasso di consegna puntuale, fill rate, tempi medi di risposta",
      "4-5": "ERP integrato con fornitori e clienti, gestione multi-magazzino automatizzata e SLA contrattualizzati con penali — entra nei vendor list dei clienti industriali più esigenti"

    },
    "ricavi": {
      "1-2": "Analizza i margini per categoria: i consumabili hanno margini alti e rotazione veloce, le macchine hanno margini bassi ma ticket alto. Ottimizza il mix verso le categorie più redditizie",
      "2-3": "Contratti di fornitura annuali con i clienti principali: volumi minimi garantiti in cambio di prezzi dedicati. Riduce la volatilità del fatturato e aumenta il switching cost",
      "3-4": "Servizi a valore aggiunto ad alto margine: consegna urgente premium, gestione scorte conto deposito presso il cliente, contratti di manutenzione preventiva",
      "4-5": "Revenue mix strutturato: prodotti standard + servizi logistici + consulenza tecnica + contratti VMI (vendor managed inventory). Il servizio vale più del prodotto"

    },
    "marketing": {
      "1-2": "Catalogo prodotti digitale aggiornato con prezzi e disponibilità — il cliente vuole trovare il codice da solo senza chiamare. Schede tecniche scaricabili per ogni prodotto",
      "2-3": "Newsletter tecnica mensile verso i responsabili acquisti e manutenzione: novità prodotto, consigli tecnici, promozioni. Posizionati come partner tecnico, non solo fornitore",
      "3-4": "Presenza su fiere di settore (SPS, Mecspe) e webinar tecnici su prodotti specifici. I responsabili tecnici comprano da chi dimostra competenza",
      "4-5": "Piano marketing strutturato: digitale B2B + fiere + content tecnico + co-marketing con i brand distribuiti per campagne di visibilità condivise"

    },
    "sitoweb": {
      "1-2": "Sito con catalogo prodotti ricercabile per codice o categoria, disponibilità in tempo reale e form ordine rapido",
      "2-3": "Sito con area riservata clienti: listino dedicato, storico ordini, download documentazione tecnica e fatture",
      "3-4": "E-commerce B2B con prezzi personalizzati per cliente, ordini ricorrenti salvati e integrazione con i principali sistemi e-procurement (Ariba, Jaggaer)",
      "4-5": "Portale B2B completo con EDI, gestione scorte conto deposito in tempo reale e dashboard cliente con KPI di fornitura"

    },
    "ecommerce": {
      "1-2": "Magazzino disorganizzato: rotture di stock frequenti sui prodotti più venduti. Inizia con una scorta minima garantita per i 50 codici a più alta rotazione",
      "2-3": "Software gestione magazzino con soglie di riordino automatico, codici OEM mappati e giacenze in tempo reale. Elimina le rotture di stock sui best seller",
      "3-4": "Magazzino strutturato per categoria con rotazione monitorata, scorte dedicate per i clienti chiave e consegna same-day per le urgenze nella zona servita",
      "4-5": "Logistica avanzata: multi-magazzino con hub regionale, consegna urgente entro 2 ore nella zona, conto deposito presso i clienti strategici e gestione VMI automatizzata"

    }
  },
  "commercio_ingrosso_alimentare": {
    "vendite": {
      "1-2": "Il ristoratore fedele ordina ogni giorno — costruisci quella fedeltà con visite periodiche, assortimento affidabile e un numero diretto sempre raggiungibile. Chi risponde alle 7 di mattina vince",
      "2-3": "Segmenta i clienti HoReCa per potenziale: ristoranti stellati vs pizzerie vs mense hanno esigenze completamente diverse. Assegna agenti specializzati per tipo di cliente",
      "3-4": "Key account per i clienti strutturati (catene, gruppi ristorazione, mense aziendali): contratti di fornitura con assortimento dedicato, prezzi fissi e consegne programmate",
      "4-5": "Struttura commerciale con area manager HoReCa, key account per gruppi e catene, inside sales per la gestione ordini quotidiani e specialista retail alimentare indipendente"

    },
    "pipeline": {
      "1-2": "Traccia i clienti per frequenza di ordine: chi non ordina da 2 settimane sta comprando altrove. Il calo silenzioso è il segnale più pericoloso",
      "2-3": "CRM per monitorare wallet share per cliente: quanto compra da te vs quanto potrebbe comprare. Ogni categoria non ancora venduta al cliente è un'opportunità",
      "3-4": "Pipeline strutturata con forecast settimanale per agente, gestione nuovi clienti HoReCa e alert automatici su cali di acquisto superiori al 20%",
      "4-5": "Sistema integrato ordini-magazzino-consegne con portale ordini online per i clienti e dashboard real-time su fatturato per zona e per agente"

    },
    "team": {
      "1-2": "L'agente deve conoscere i prodotti che vende — formazione su stagionalità, provenienza, conservazione e abbinamenti. Un agente che sa consigliare lo chef fidelizza per anni",
      "2-3": "Specializzazione per canale: chi segue HoReCa premium conosce i prodotti di qualità, chi segue la ristorazione veloce conosce i volumi e i prezzi",
      "3-4": "Team strutturato: agenti di zona + inside sales per ordini quotidiani + specialista prodotti freschi. I freschi richiedono gestione separata per urgenza e deperibilità",
      "4-5": "Struttura completa con direttore commerciale, team agenti per zona e canale, customer service dedicato e specialista category per i prodotti a più alto margine"

    },
    "processi": {
      "1-2": "Gestione scadenze obbligatoria: nessun prodotto fuori temperatura o vicino alla scadenza deve uscire dal magazzino. Un reclamo sulla qualità distrugge anni di fiducia",
      "2-3": "Processo FIFO (first in first out) rigido per tutti i prodotti. Certificazione HACCP aggiornata, tracciabilità documentata per ogni lotto — è un obbligo di legge e una leva commerciale",
      "3-4": "Sistema qualità documentato con controlli in accettazione, gestione non conformità e audit periodici sui fornitori. I clienti strutturati (catene, mense) lo richiedono nei capitolati",
      "4-5": "ERP integrato con gestione lotti, tracciabilità completa farm-to-fork, certificazioni multiple mantenute (BRC, IFS) e KPI qualità monitorati in tempo reale"

    },
    "ricavi": {
      "1-2": "Analizza i margini per categoria: freschi e specialty hanno margini alti, commodity (pasta, olio) sono quasi a zero. Orienta il mix verso i prodotti a valore aggiunto",
      "2-3": "Gestione credito strutturata: il settore HoReCa è noto per i ritardi di pagamento. Definisci condizioni chiare, monitora i DSO per cliente e agisci subito sui ritardatari",
      "3-4": "Contratti annuali con i clienti principali: assortimento minimo garantito, prezzi stabili trimestrali e pagamenti a 30 giorni. Riduce la volatilità e migliora il cash flow",
      "4-5": "Revenue mix ottimizzato: commodity + specialty + private label + servizi logistici premium. Il margine medio ponderato come KPI principale, non solo il fatturato"

    },
    "marketing": {
      "1-2": "Catalogo stagionale con i prodotti di punta, schede tecniche e suggerimenti di utilizzo per lo chef. Distribuito fisicamente durante le visite — lo chef lo consulta quando crea il menu",
      "2-3": "Newsletter mensile con novità di stagione, ricette con i tuoi prodotti e promozioni. I cuochi adorano l'ispirazione — posizionati come partner creativo, non solo fornitore",
      "3-4": "Presenza a fiere di settore (Host Milano, Sigep) e degustazioni prodotti presso i clienti chiave. Il campione gratuito che diventa ordine fisso vale più di qualsiasi pubblicità",
      "4-5": "Piano marketing strutturato: fiere + content food + co-marketing con i produttori distribuiti per campagne di visibilità e degustazioni eventi"

    },
    "sitoweb": {
      "1-2": "Catalogo prodotti digitale con foto, schede tecniche, unità di misura e disponibilità. Il ristoratore vuole ordinare velocemente senza chiamare",
      "2-3": "Portale ordini online semplice: il cliente accede, vede il suo listino personalizzato e ordina in 2 minuti. Riduce le chiamate e gli errori di ordine",
      "3-4": "Portale B2B con storico ordini, fatture scaricabili, gestione resi online e catalogo stagionale aggiornato con disponibilità in tempo reale",
      "4-5": "Piattaforma digitale completa con app mobile per ordinare da smartphone (lo chef ordina dal telefono in cucina), integrazione con i gestionali dei clienti principali e EDI"

    },
    "ecommerce": {
      "1-2": "Consegne in ritardo o con prodotti sbagliati — ogni errore logistico è un cliente perso. Inizia con un processo di picking controllato e un sistema di verifica prima della consegna",
      "2-3": "Mezzi frigoriferi dedicati con temperatura monitorata e documentata. Giri di consegna ottimizzati per zona — la puntualità è il tuo KPI più importante agli occhi del cliente",
      "3-4": "Logistica strutturata: celle frigorifere multi-temperatura, giri di consegna pianificati con finestre orarie garantite ai clienti e tracciabilità consegne in tempo reale",
      "4-5": "Piattaforma logistica avanzata: consegna same-day per urgenze, tracking in tempo reale per il cliente, ottimizzazione automatica dei giri e gestione multi-magazzino per coprire più zone"

    }
  },
  "commercio_materiali_edili": {
    "vendite": {
      "1-2": "Il muratore fedele compra ogni mattina — conosci i suoi cantieri attivi, anticipa i suoi fabbisogni e chiamalo prima che vada dalla concorrenza. Il banco deve essere un punto di riferimento, non solo un negozio",
      "2-3": "Segmenta i clienti: imprese edili strutturate (volume, pagamenti a 60gg), artigiani (frequenza alta, ticket medio), privati (margine alto, occasionale). Strategie diverse per ognuno",
      "3-4": "Key account per le imprese edili più grandi: preventivi cantiere, forniture programmate, consegne dedicate. Un accordo di fornitura con un'impresa media vale anni di fatturato stabile",
      "4-5": "Struttura commerciale con agenti per zona, key account per imprese strutturate e inside sales per la gestione ordini quotidiani e i clienti retail"

    },
    "pipeline": {
      "1-2": "Traccia i cantieri attivi dei tuoi clienti principali: quando finisce un cantiere, ne inizia un altro — tu devi saperlo prima di loro",
      "2-3": "CRM per monitorare i clienti attivi, i cantieri in corso e le gare di appalto pubblicate nella tua zona. Un cantiere nuovo è un'opportunità da cogliere subito",
      "3-4": "Pipeline strutturata con forecast mensile per cliente, gestione preventivi cantiere e alert su cali di acquisto",
      "4-5": "Sistema integrato ordini-magazzino-consegne con portale ordini online per i clienti abituali e dashboard real-time su fatturato e margine per categoria"

    },
    "team": {
      "1-2": "Il banco deve essere presidiato da persone competenti: chi non sa consigliare il prodotto giusto per l'applicazione perde la vendita e la fiducia del cliente",
      "2-3": "Formazione tecnica continua su nuovi prodotti e normative (cappotto termico, impermeabilizzazioni, sistemi a secco). Il cliente si fida di chi sa più di lui",
      "3-4": "Team strutturato: banco clienti + commerciale imprese + magazzinieri formati sulla movimentazione sicura dei materiali pesanti",
      "4-5": "Struttura completa con responsabile commerciale, team banco, agenti di zona e specialista per le forniture a imprese strutturate e appalti pubblici"

    },
    "processi": {
      "1-2": "Sicurezza base obbligatoria: DVR per magazzino materiali edili, DPI per movimentazione manuale carichi pesanti, formazione addetti. Schede di sicurezza disponibili per tutti i prodotti chimici venduti",
      "2-3": "Patentino mulettista per chi usa carrelli elevatori — obbligo di legge spesso ignorato. Gestione ordini strutturata con conferma sempre inviata e tempi di consegna definiti. Informazione al cliente sui DPI da usare durante la posa di prodotti chimici",
      "3-4": "Audit sicurezza interni periodici, gestione non conformità documentata. Processo di carico/scarico sicuro con attrezzatura adeguata. ISO 9001 per accedere alle forniture di imprese strutturate e appalti pubblici",
      "4-5": "Sistema sicurezza integrato come KPI aziendale, zero infortuni obiettivo misurabile. ERP con gestione lotti, tracciabilità prodotti e KPI operativi monitorati mensilmente"

    },
    "ricavi": {
      "1-2": "Analizza i margini per categoria: i prodotti di finitura (pavimenti, rivestimenti, pitture) hanno margini doppi rispetto ai materiali strutturali (cemento, mattoni). Orienta il mix",
      "2-3": "Gestione credito strutturata: le imprese edili pagano tardi — definisci fidi massimi, monitora i DSO e agisci subito sui ritardatari. Il credito incontrollato è il rischio principale",
      "3-4": "Servizi a valore aggiunto: consegna in cantiere programmata, piccolo taglio materiali, consulenza tecnica per posa — differenziano da Leroy Merlin e giustificano il prezzo",
      "4-5": "Revenue mix ottimizzato: materiali strutturali + finitura + servizi logistici + consulenza tecnica. Margine medio ponderato come KPI principale con obiettivi trimestrali per categoria"

    },
    "marketing": {
      "1-2": "Profilo Google My Business completo con orari, foto del punto vendita e risposta attiva alle recensioni. Il privato che ristruttura ti cerca online prima di venire",
      "2-3": "Presenza sui portali locali per artigiani ed imprese edili. Newsletter tecnica mensile verso i clienti B2B con novità prodotto, promozioni e aggiornamenti normativi",
      "3-4": "Eventi in punto vendita: presentazioni di nuovi sistemi costruttivi con i produttori, formazione tecnica gratuita per artigiani. Chi forma il cliente lo fidelizza",
      "4-5": "Piano marketing strutturato: digitale + eventi + co-marketing con i brand distribuiti + presenza a fiere locali di settore edilizio"

    },
    "sitoweb": {
      "1-2": "Sito con catalogo prodotti per categoria, disponibilità indicativa e form richiesta preventivo per forniture cantiere",
      "2-3": "Sito con area riservata clienti abituali: listino dedicato, storico ordini e richiesta consegna cantiere online",
      "3-4": "Sito professionale con schede tecniche scaricabili, calcolatore quantità materiali per tipo di intervento e portale ordini B2B",
      "4-5": "Portale completo con e-commerce B2B, calcolo automatico fabbisogni per cantiere, tracking consegne e area tecnica con normative e dettagli costruttivi"

    },
    "ecommerce": {
      "1-2": "Consegne in ritardo o materiali sbagliati bloccano un cantiere — ogni errore logistico distrugge la fiducia. Inizia con un processo di preparazione ordini controllato prima della consegna",
      "2-3": "Mezzo aziendale dedicato alle consegne cantiere con sponda idraulica: la consegna al piano o vicino al punto di utilizzo vale un sovrapprezzo che il cliente accetta volentieri",
      "3-4": "Logistica strutturata: giri di consegna pianificati con finestre orarie, tracciabilità consegne e gestione urgenze cantiere con risposta garantita entro 2 ore",
      "4-5": "Flotta mezzi dedicata con gru di carico per materiali pesanti, consegna same-day nella zona servita e sistema di tracciamento consegne in tempo reale per il cliente"

    }
  },
  "commercio_ricambi_auto": {
    "vendite": {
      "1-2": "Il tuo vantaggio vs Amazon è la consulenza immediata: il cliente non sa cosa gli serve, tu sì. Forma tutto il personale a fare almeno 3 domande prima di cercare il pezzo — marca, modello, anno, problema",
      "2-3": "Costruisci relazioni con le officine di quartiere: conto aperto, consegna rapida, ricambi riservati. Un'officina cliente vale 10 privati e torna ogni settimana",
      "3-4": "Commerciale dedicato alle officine B2B: visite periodiche, listino dedicato, servizio consegna entro 2 ore. Le officine comprano da chi è affidabile, non da chi costa meno",
      "4-5": "Struttura commerciale con key account per officine e carrozzerie, programma fidelizzazione clienti professionali e accordi con reti di assistenza per forniture continuative"

    },
    "pipeline": {
      "1-2": "Traccia i clienti abituali: chi compra cosa, con quale frequenza. È la base per proporre ricambi in modo proattivo prima che il cliente li cerchi altrove",
      "2-3": "CRM semplice per gestire i clienti B2B (officine, carrozzerie): storico acquisti, preferenze, scadenze revisioni veicoli in flotta. Il follow-up proattivo fidelizza",
      "3-4": "Pipeline B2B strutturata con forecast mensile per cliente officina, gestione ordini ricorrenti e alert su clienti che non comprano da 30+ giorni",
      "4-5": "Sistema integrato con software gestionale officine (es. Autosoft, Datasystem) per ordini automatici ricambi e fatturazione EDI con i clienti principali"

    },
    "team": {
      "1-2": "Il banco deve essere presidiato da persone competenti — un addetto che non conosce i ricambi fa più danni che benefici. Formazione tecnica base obbligatoria per tutti",
      "2-3": "Specialista B2B dedicato alle officine: conosce le esigenze dei meccanici, gestisce i conti aperti e fa le consegne rapide",
      "3-4": "Team strutturato: banco clienti retail + commerciale officine + magazziniere. Ruoli distinti con obiettivi separati",
      "4-5": "Struttura completa con responsabile commerciale, team banco, commerciale B2B dedicato e responsabile magazzino con gestione automatica delle scorte"

    },
    "processi": {
      "1-2": "Gestione magazzino minima: codifica i ricambi più venduti, tieni una scorta minima garantita per i pezzi più richiesti. Zero rotture di stock sui best seller",
      "2-3": "Software gestione magazzino (anche base) con codici OEM, giacenze in tempo reale e riordino automatico sotto scorta minima. Riduce gli ordini urgenti costosi",
      "3-4": "Processi di ricezione merce, controllo qualità ricambi e gestione resi strutturati. Certificazione per ricambi originali vs aftermarket ben documentata",
      "4-5": "ERP integrato con fornitori per ordini automatici, gestione multi-magazzino e KPI rotazione stock per categoria. Zero ricambi fermi da oltre 90 giorni"

    },
    "ricavi": {
      "1-2": "Analizza i margini per categoria: oli e lubrificanti hanno margini alti, ricambi comuni sono commodity. Sposta il mix verso accessori e ricambi premium",
      "2-3": "Servizi aggiuntivi ad alto margine: montaggio in loco per ricambi semplici, noleggio attrezzi, gonfiagggio azoto, pulizia iniettori — differenziano dal puro rivenditore",
      "3-4": "Contratti di fornitura con officine per ricambi standard ricorrenti (filtri, pastiglie, cinghie). Fatturato prevedibile e margini stabili",
      "4-5": "Centro di profitto strutturato: retail + B2B officine + servizi + marketplace online. Margine medio monitorato per canale con obiettivi trimestrali"

    },
    "marketing": {
      "1-2": "Google My Business completo con orari, foto del negozio e risposta attiva alle recensioni. Il cliente cerca 'ricambi auto X città' su Google prima di uscire di casa",
      "2-3": "Volantinaggio nelle officine della zona con listino prezzi B2B e contatto diretto. Social media con contenuti tecnici utili — consigli manutenzione, novità prodotto",
      "3-4": "Google Ads locali su ricerche specifiche (es. 'pastiglie freno X marca'), campagne email al database officine per promozioni stagionali (catene neve, gomme estive)",
      "4-5": "Piano marketing strutturato: digitale + B2B + programma fedeltà per officine con punti e premi. Sponsorizzazione eventi motoristici locali per visibilità"

    },
    "sitoweb": {
      "1-2": "Sito base con catalogo ricambi principali, orari, zona di consegna e contatto rapido. Deve funzionare perfettamente su mobile — il meccanico cerca da smartphone in officina",
      "2-3": "Sito con ricerca per targa o codice OEM, disponibilità in tempo reale e prenotazione ritiro in negozio",
      "3-4": "Sito professionale con area riservata officine (listino dedicato, ordini online, storico acquisti) e integrazione con i principali cataloghi ricambi (TecDoc)",
      "4-5": "E-commerce completo con spedizione nazionale, area B2B officine, integrazione TecDoc per ricerca per targa e gestione resi online"

    },
    "ecommerce": {
      "1-2": "Zero presenza online — perdi clienti ogni giorno a favore di Amazon e Autodoc. Inizia con un profilo eBay Motors per i ricambi più venduti",
      "2-3": "Presenza attiva su eBay Motors e Subito con i ricambi a più alta rotazione. Spedizione in 24h come leva competitiva vs i privati",
      "3-4": "Marketplace strutturato: eBay Motors + proprio e-commerce per ricambi standard. Gestione automatica stock online sincronizzata con il magazzino fisico",
      "4-5": "Strategia omnicanale completa: negozio fisico + e-commerce + marketplace + consegna B2B officine. Il canale online genera il 20-30% del fatturato con margini superiori al banco"

    }
  },
  "commercio_abbigliamento_ingrosso": {
    "vendite": {
      "1-2": "Il negoziante compra da chi lo aiuta a vendere — non solo da chi ha il prezzo più basso. Visita i tuoi clienti in negozio, capisce cosa vende e cosa resta in magazzino, e seleziona i pezzi giusti per loro",
      "2-3": "Posizionati sulla qualità e sull'esclusività: proponi brand o linee che i negozi cinesi non hanno. Il negoziante che vuole distinguersi ha bisogno di te, non di chi vende a prezzi impossibili",
      "3-4": "Agente specializzato per tipo di cliente: boutique premium, negozi di quartiere e mercati hanno logiche completamente diverse. Chi capisce il cliente vende di più",
      "4-5": "Struttura commerciale con agenti di zona, showroom stagionale e programma di supporto al cliente per aiutarlo a vendere — non solo a comprare"

    },
    "pipeline": {
      "1-2": "Traccia gli ordini per stagione per cliente: chi ha comprato bene la stagione scorsa va visitato prima degli altri per la nuova collezione",
      "2-3": "CRM per gestire il portafoglio clienti con storico acquisti, sell-through per categoria e alert su clienti che non riordinano",
      "3-4": "Pipeline strutturata con forecast stagionale per agente, gestione campionario e monitoraggio riordini durante la stagione",
      "4-5": "Sistema integrato ordini-magazzino con portale B2B per ordini online e dashboard real-time su sell-through per collezione e per cliente"

    },
    "team": {
      "1-2": "Il venditore deve avere gusto e conoscere le tendenze — non si vende abbigliamento come si vende cemento. Seleziona persone con sensibilità per il prodotto",
      "2-3": "Formazione su trend stagionali, abbinamenti e visual merchandising: il bravo agente aiuta il negoziante ad allestire il negozio, non solo a fare l'ordine",
      "3-4": "Team con agenti commerciali + stylist/visual merchandiser che supporta i clienti nell'allestimento e nella vendita assistita",
      "4-5": "Struttura completa con direttore commerciale, agenti di zona, supporto visual merchandising e customer service dedicato ai clienti e-commerce"

    },
    "processi": {
      "1-2": "Gestione campionario strutturata: ogni capo ha scheda con composizione, taglie disponibili, prezzi e tempi di consegna. Senza queste info il negoziante non ordina con sicurezza",
      "2-3": "Processo di acquisto merce con OTB (open to buy) per stagione, analisi sell-through della stagione precedente prima di fare i nuovi ordini e gestione resi invenduto strutturata",
      "3-4": "Processo di qualità documentato: controllo capi in arrivo, gestione non conformità con i fornitori, certificazioni tessili (OEKO-TEX) come leva commerciale verso i clienti più attenti",
      "4-5": "Sistema gestionale completo con OTB automatico, analisi ABC per brand e categoria, markdown programmato sull'invenduto e KPI rotazione stock monitorati per stagione"

    },
    "ricavi": {
      "1-2": "Analizza i margini per brand e categoria: non tutti i capi rendono uguale. Identifica le linee a più alto margine e aumenta il loro peso nell'assortimento",
      "2-3": "Riduci l'invenduto lavorando meglio sull'acquisto: meno quantità ma più mirata. Ogni capo invenduto a fine stagione è margine perso — il saldo a -50% distrugge la redditività",
      "3-4": "Servizi aggiuntivi a margine: dropshipping per i clienti e-commerce, visual merchandising a pagamento, gestione social per i clienti più piccoli che non sanno farlo",
      "4-5": "Revenue mix ottimizzato: vendita diretta + dropshipping + servizi marketing + private label. Il dropshipping in particolare ha margini bassi ma zero rischio di invenduto"

    },
    "marketing": {
      "1-2": "Lookbook stagionale professionale con foto curate — è lo strumento che il negoziante usa per scegliere i pezzi e che poi usa per vendere ai suoi clienti",
      "2-3": "Showroom stagionale o partecipazione a fiere di settore (White Milano, Moda Prima): il negoziante vuole toccare i capi prima di ordinare",
      "3-4": "Content marketing su tendenze e abbinamenti: aiuta i tuoi clienti negozianti a vendere di più con consigli pratici su come allestire e comunicare la collezione",
      "4-5": "Piano marketing strutturato: showroom + fiere + newsletter + supporto social ai clienti. Posizionati come partner di business del negoziante, non solo fornitore"

    },
    "sitoweb": {
      "1-2": "Catalogo digitale stagionale con foto professionali, taglie disponibili, prezzi ingrosso e modulo richiesta campionario",
      "2-3": "Portale B2B con area riservata per i clienti: catalogo con prezzi dedicati, disponibilità in tempo reale e ordini online",
      "3-4": "Portale B2B completo con storico ordini, gestione resi, catalogo dropshipping per i clienti e-commerce e area download materiali marketing",
      "4-5": "Piattaforma digitale completa con portale B2B, integrazione dropshipping automatica con i principali e-commerce dei clienti e dashboard sell-through condivisa"

    },
    "ecommerce": {
      "1-2": "Zero servizi digitali — perdi i clienti e-commerce che cercano un fornitore con dropshipping. Inizia a capire quanti dei tuoi clienti vendono anche online",
      "2-3": "Attiva il dropshipping per i clienti e-commerce: loro vendono online, tu spedisci direttamente al cliente finale. Zero rischio invenduto per te, servizio ad alto valore per loro",
      "3-4": "Servizio dropshipping strutturato con feed prodotti automatico, foto e descrizioni ottimizzate per e-commerce e gestione resi integrata",
      "4-5": "Piattaforma dropshipping professionale con API per integrazione automatica con Shopify, WooCommerce e marketplace. Il canale digitale genera il 30-40% del fatturato senza rischio stock"

    }
  },
  "commercio_elettronica": {
    "vendite": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "pipeline": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "team": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "processi": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "ricavi": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "marketing": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "sitoweb": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "ecommerce": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    }
  },
  "commercio_auto_moto_nuovo": {
    "vendite": {
      "1-2": "Il walk-in viene gestito in piedi con 2 domande e un preventivo — il cliente va via. Introduci subito un processo minimo: accogli seduto, fai almeno 5 domande di discovery, proponi sistematicamente il test drive",
      "2-3": "Codifica il processo di vendita: script di accoglienza, domande di discovery, gestione obiezioni e follow-up entro 48 ore su ogni preventivo aperto. Il venditore deve smettere di improvvisare",
      "3-4": "Team vendite con KPI individuali misurati settimanalmente: preventivi aperti, test drive effettuati, tasso di chiusura, CSI. Role play mensili e affiancamento per i venditori sotto target",
      "4-5": "Sales manager dedicato con P&L vendite, processo certificato dalla casa madre, formazione continua e sistema di incentivi legato al CSI oltre che ai volumi"

    },
    "pipeline": {
      "1-2": "Traccia tutti i preventivi aperti su un registro: cliente, modello, valore, data e stato. Quanti preventivi aperti hai in questo momento? Se non lo sai, stai perdendo soldi",
      "2-3": "CRM per gestire i lead: walk-in, chiamate, form web, campagne casa madre. Follow-up sistematico a 48h, 1 settimana e 1 mese su ogni preventivo non chiuso",
      "3-4": "Pipeline strutturata con forecast mensile, gestione lead per fonte e tasso di conversione per venditore. Il CRM deve essere usato — non opzionale",
      "4-5": "CRM integrato con DMS (Dealer Management System) della casa madre, gestione lead multicanale e dashboard direzionale con KPI vendite in tempo reale"

    },
    "team": {
      "1-2": "Il venditore non è formato — conosce il prodotto ma non sa vendere. Inizia con una formazione base: ascolto attivo, domande aperte, gestione obiezioni sul prezzo",
      "2-3": "Formazione vendita strutturata per tutto il team: processo, tecniche, prodotto e finanziamenti. Il venditore deve saper proporre il finanziamento come prima opzione, non come ripiego",
      "3-4": "Team con ruoli distinti: venditore nuovo, venditore usato, responsabile finanziamenti. Ogni figura ha obiettivi e formazione specifica",
      "4-5": "Struttura commerciale completa: sales manager, team vendite nuovo e usato, specialista F&I (finance & insurance) e back office contratti"

    },
    "processi": {
      "1-2": "Processi base: contratto standard completo, gestione permute con valutazione scritta, consegna veicolo con checklist. Riduci i contenziosi post vendita",
      "2-3": "Standardizza tutto il processo: dalla accettazione del lead alla consegna del veicolo. Tempi definiti per ogni fase, responsabilità chiare, documentazione completa",
      "3-4": "Processi certificati dalla casa madre, gestione qualità documentata, mystery shopping interno e CSI monitorato mensilmente come KPI primario",
      "4-5": "DMS integrato con CRM e contabilità, processi ISO-like per consegne e reclami, audit interni trimestrali e benchmark con altri dealer della rete"

    },
    "ricavi": {
      "1-2": "Il margine sul nuovo è basso — stai lasciando soldi sul tavolo su accessori e finanziamenti. Analizza quanti clienti escono senza un accessorio e senza un finanziamento proposto",
      "2-3": "Obiettivo: ogni contratto nuovo deve includere almeno un accessorio e una proposta finanziamento. La penetrazione finanziamenti è il KPI più redditizio che puoi misurare",
      "3-4": "Revenue mix strutturato: nuovo + usato + finanziamenti + accessori + service. Nessuna voce sotto il 15% del totale — la dipendenza dal solo nuovo è il rischio maggiore",
      "4-5": "Centro di profitto per business unit: vendite nuovo, vendite usato, F&I, service e ricambi — ognuno con P&L autonomo e obiettivi trimestrali"

    },
    "marketing": {
      "1-2": "Non affidarti solo alle campagne della casa madre — sono uguali per tutti i dealer. Attiva Google My Business, raccogli recensioni e fai campagne locali su eventi e promozioni proprie",
      "2-3": "Piano marketing locale: Google Ads geolocalizzati, social media con contenuti propri (non solo materiale casa madre), email marketing al database clienti esistente",
      "3-4": "Marketing strutturato con budget dedicato, campagne di retention verso clienti in scadenza garanzia e leasing, eventi in concessionaria per test drive e lanci modelli",
      "4-5": "Marketing manager dedicato o agenzia specializzata automotive, piano annuale con obiettivi lead per fonte, campagne multicanale e marketing automation per il database clienti"

    },
    "sitoweb": {
      "1-2": "Sito aggiornato con stock veicoli, promozioni del mese e form richiesta preventivo o test drive — il minimo per esistere online",
      "2-3": "Sito con stock usato fotografato professionalmente, recensioni clienti in evidenza e chat online per rispondere ai lead in tempo reale",
      "3-4": "Sito professionale con configuratore veicoli, richiesta finanziamento online, prenotazione test drive e area clienti per storico interventi",
      "4-5": "Portale digitale integrato con DMS: stock in tempo reale, preventivo online completo di finanziamento, prenotazione service e area clienti con storico completo"

    },
    "ecommerce": {
      "1-2": "Il service è un centro di costo — i clienti vanno all'officina indipendente dopo la garanzia. Inizia a misurare quanti clienti tornano per il primo tagliando",
      "2-3": "Reminder tagliandi attivi via SMS e telefono, pacchetti manutenzione proposti al momento della vendita, follow-up sistematico dopo ogni intervento service",
      "3-4": "Service come centro di profitto con KPI dedicati: ore fatturate, ricambi venduti, CSI service, clienti attivi. Service advisor formato sulla vendita attiva di interventi aggiuntivi",
      "4-5": "After sales come business unit autonoma: service manager con P&L, programma fidelizzazione clienti, acquisizione clienti non acquirenti e contratti di manutenzione pluriennali"

    }
  },
  "commercio_auto_moto_usato": {
    "vendite": {
      "1-2": "La vendita dell'usato inizia dall'accoglienza e dalla fiducia: il cliente cerca il giusto rapporto qualità-prezzo e un venditore onesto. Sii trasparente sulla storia del veicolo — nascondere difetti costa caro in reputazione",
      "2-3": "Struttura il processo di vendita: scheda cliente, domande di discovery sulle esigenze, proposta mirata da stock e gestione della permuta come leva di chiusura",
      "3-4": "Team vendite formato sulla gestione dell'obiezione prezzo tipica dell'usato: spiega il valore aggiunto (garanzia, revisione, storico) rispetto al privato o al concorrente",
      "4-5": "Struttura commerciale con venditori specializzati per segmento (city car, SUV, premium), gestione lead multicanale e follow-up sistematico su ogni contatto"

    },
    "pipeline": {
      "1-2": "Traccia su Excel ogni contatto: fonte (marketplace, walk-in, passaparola), veicolo richiesto, budget e stato. I lead dell'usato si bruciano in 24-48 ore se non rispondi",
      "2-3": "CRM per gestire i lead dai marketplace (AutoScout, Mobile.de, Subito) con risposta entro 2 ore — chi risponde prima vende. Traccia anche le permute valutate non chiuse",
      "3-4": "Pipeline strutturata con forecast settimanale, gestione lead per fonte e per venditore, tempi medi di vendita per segmento di veicolo",
      "4-5": "CRM integrato con i marketplace per gestione lead automatica, dashboard rotazione stock e alert su veicoli fermi da oltre 30 giorni"

    },
    "team": {
      "1-2": "Il titolare fa tutto. Forma un collaboratore sulla valutazione permute base e sulla presentazione dei veicoli — la qualità dell'annuncio dipende da chi lo crea",
      "2-3": "Primo venditore dedicato con conoscenza tecnica dei veicoli e capacità di valutare le permute in modo autonomo",
      "3-4": "Team strutturato: venditore + responsabile acquisti + preparatore veicoli. Chi compra e chi vende devono essere figure distinte",
      "4-5": "Struttura completa con responsabile commerciale, team vendite, buyer dedicato agli acquisti e officina preparazione interna"

    },
    "processi": {
      "1-2": "Check base: contratto di vendita standard completo, garanzia minima per legge (12 mesi), documentazione veicolo in ordine prima di ogni vendita",
      "2-3": "Processo di preparazione standardizzato per ogni veicolo: revisione meccanica, carrozzeria, pulizia, foto professionali e scheda tecnica completa prima della messa in vendita",
      "3-4": "Valutazione permute con sistema strutturato (Eurotax, valutazione stato reale), gestione rientri da leasing e aste documentata, checklist consegna veicolo",
      "4-5": "Processi certificati: certificazione qualità veicoli usati (es. programmi casa madre), garanzie estese come leva commerciale, gestione reclami strutturata e KPI qualità monitorati"

    },
    "ricavi": {
      "1-2": "Analizza i margini per segmento: city car, berlina, SUV, premium hanno margini molto diversi. Identifica dove guadagni davvero e orienta gli acquisti verso quei veicoli",
      "2-3": "Finanziamenti e garanzie estese sono il vero margine aggiuntivo — proponi sistematicamente a ogni cliente. La penetrazione finanziamenti sull'usato è spesso più alta che sul nuovo",
      "3-4": "Ottimizza la rotazione stock: un veicolo fermo 60+ giorni perde valore ogni giorno. Target di rotazione media 30-45 giorni con pricing dinamico",
      "4-5": "Centro di profitto strutturato: margine veicolo + finanziamento + garanzia + accessori + service post vendita. Forecast mensile affidabile basato su stock e pipeline"

    },
    "marketing": {
      "1-2": "Annunci professionali su AutoScout24 e Subito con foto di qualità (minimo 20 foto per veicolo), descrizione dettagliata e prezzo competitivo aggiornato settimanalmente",
      "2-3": "Presenza su almeno 3 marketplace con annunci ottimizzati. Google My Business con recensioni attive. Il passaparola si alimenta con professionalità e trasparenza costanti",
      "3-4": "Piano marketing digitale: remarketing su chi ha visitato gli annunci, campagne social con stock in evidenza, email marketing al database clienti per nuovi arrivi",
      "4-5": "Marketing strutturato con budget dedicato, SEO locale per 'auto usate X città', campagne automatizzate per stock e programma referral clienti soddisfatti"

    },
    "sitoweb": {
      "1-2": "Sito con stock aggiornato, foto professionali, filtri per marca/modello/prezzo e form contatto rapido. Deve funzionare perfettamente su mobile",
      "2-3": "Sito con schede veicolo complete (storia, km certificati, optional, garanzia), chat online per risposta rapida e integrazione con i marketplace",
      "3-4": "Sito professionale con valutazione permuta online, richiesta finanziamento e recensioni clienti verificate in evidenza",
      "4-5": "Portale con stock in tempo reale, configuratore finanziamento online, prenotazione visita e area clienti per storico acquisti e interventi"

    },
    "ecommerce": {
      "1-2": "Ti affidi solo alle permute per rifornire lo stock — sei in balia dei prezzi e delle condizioni che ti porta il cliente. Inizia a esplorare le aste online (BCA, Autorola)",
      "2-3": "Diversifica le fonti di approvvigionamento: aste online + permute + acquisto da privati. Le aste ti danno accesso a flotte aziendali e rientri leasing a prezzi competitivi",
      "3-4": "Buyer dedicato agli acquisti con accesso a più canali: aste fisiche e online, accordi con noleggiatori per rientri fleet, acquisto diretto da aziende. Chi compra meglio guadagna prima di vendere",
      "4-5": "Strategia acquisti strutturata con KPI dedicati: costo medio acquisto per segmento, margine medio per fonte, rotazione per canale. Partnership strategiche con noleggiatori e società leasing per flusso costante di veicoli"

    }
  },
  "commercio_abbigliamento_dettaglio": {
    "vendite": {
      "1-2": "Il cliente entra, guarda e va via — nessuno lo accoglie o lo coinvolge. Forma il personale su accoglienza attiva: saluto, domanda aperta, proposta di un capo in base a quello che sta guardando",
      "2-3": "Il commesso diventa consulente di stile: impara a costruire outfit completi, proporre abbinamenti e fare upsell naturale. Un cliente che entra per una maglia deve uscire con un outfit",
      "3-4": "Sistema di incentivi legato alle vendite individuali: il commesso ha interesse economico nel vendere bene, non solo nel stare al banco. KPI per addetto: scontrino medio e pezzi per transazione",
      "4-5": "Store manager con P&L del negozio, team formato con ruoli distinti (floor, cassa, vetrina) e processo di vendita codificato e monitorato settimanalmente"

    },
    "pipeline": {
      "1-2": "Inizia a raccogliere i contatti dei clienti: nome, email o WhatsApp. Anche solo 10 contatti al giorno costruiscono in un anno un database di migliaia di clienti fidelizzati",
      "2-3": "WhatsApp Business per i clienti VIP: avvisali dei nuovi arrivi prima che vadano online, riservali capi della loro taglia, falli sentire speciali. È il CRM del retail indipendente",
      "3-4": "Database clienti segmentato per gusto, taglia e frequenza di acquisto. Newsletter mensile con nuovi arrivi e promozioni esclusive per iscritti",
      "4-5": "CRM retail strutturato con storico acquisti, preferenze e trigger automatici: compleanno, anniversario primo acquisto, avviso rientro taglia esaurita"

    },
    "team": {
      "1-2": "Il turnover è alto perché non si investe nelle persone — interrompi il circolo vizioso. Anche solo una formazione mensile di 2 ore su tecniche di vendita e prodotto aumenta motivazione e risultati",
      "2-3": "Sistema di incentivi chiaro e trasparente: commissione sulle vendite personali o bonus mensile su obiettivo negozio. Il commesso bravo deve guadagnare di più di quello mediocre",
      "3-4": "Percorso di crescita definito: commesso → senior → responsabile di reparto → store manager. Chi vede un futuro nel negozio non se ne va",
      "4-5": "Team stabile con store manager autonomo, formazione continua su prodotto e vendita, cultura del negozio come brand e sistema di welfare che riduce il turnover"

    },
    "processi": {
      "1-2": "Gestione base: apertura e chiusura cassa strutturata, inventario mensile, resa merce invenduta nei tempi — errori qui costano margine",
      "2-3": "Processo di acquisto merce strutturato: budget per categoria, OTB (open to buy) monitorato, analisi sell-through per brand prima del riordino",
      "3-4": "Visual merchandising come processo: rotazione vetrina settimanale, layout negozio ottimizzato per percorso cliente, segnaletica prezzi sempre aggiornata",
      "4-5": "Gestione retail professionale: OTB per stagione, analisi ABC per brand e categoria, markdown automatico su invenduto, KPI giornalieri monitorati"

    },
    "ricavi": {
      "1-2": "Analizza i margini per brand e categoria: non tutti i capi guadagnano uguale. Identifica i brand a più alto margine e aumenta il loro peso nell'assortimento",
      "2-3": "Riduci i saldi di fine stagione lavorando meglio sull'acquisto: compra meno quantità ma più mirata. Ogni capo invenduto è margine perso",
      "3-4": "Scontrino medio come KPI primario: punta ad aumentarlo con outfit completi, accessori abbinati e proposte di stile. Raddoppiare lo scontrino medio vale più che raddoppiare i clienti",
      "4-5": "Revenue mix ottimizzato: full price vs saldo vs outlet. Obiettivo: almeno il 70% delle vendite a prezzo pieno. Programma fidelizzazione che sposta gli acquisti fuori dal periodo saldi"

    },
    "marketing": {
      "1-2": "Instagram con foto professionali dei nuovi arrivi, outfit del giorno e vita del negozio. Non serve un fotografo — serve costanza e autenticità",
      "2-3": "Collaborazioni con micro-influencer locali (1.000-10.000 follower): costano poco e portano clienti reali della zona. Un evento in negozio con 3-4 influencer locali vale più di qualsiasi pubblicità",
      "3-4": "Piano editoriale social con contenuti misti: prodotto, styling, dietro le quinte, clienti soddisfatti. Email marketing mensile al database con anteprime e offerte esclusive",
      "4-5": "Marketing strutturato: social manager dedicato, collaborazioni stabili con influencer, campagne Meta Ads geolocalizzate e programma referral clienti soddisfatti"

    },
    "sitoweb": {
      "1-2": "Profilo Instagram curato è più importante del sito per il retail fashion. Se non hai tempo per entrambi, concentrati su Instagram",
      "2-3": "Sito o landing page semplice con orari, indirizzo, link Instagram e form iscrizione newsletter. Google My Business aggiornato con foto del negozio",
      "3-4": "Sito con lookbook stagionale, sezione nuovi arrivi aggiornata e possibilità di prenotare un appuntamento di styling personale",
      "4-5": "Presenza digitale completa: sito con e-commerce base per i clienti fuori zona, Instagram shop attivo e integrazione WhatsApp Business per ordini e prenotazioni"

    },
    "ecommerce": {
      "1-2": "Zero presenza digitale oltre il negozio fisico — ogni giorno perdi clienti che ti cercano online e non ti trovano. Apri subito Instagram e Google My Business",
      "2-3": "WhatsApp Business come canale di vendita per i clienti VIP: foto dei nuovi arrivi, prenotazione capi, acquisto e ritiro in negozio. Costa zero e fidelizza moltissimo",
      "3-4": "Instagram shop attivo con tag prodotti nelle foto, link diretto all'acquisto o alla prenotazione. Marketplace selettivi (Depop per vintage, Vinted per outlet) per smaltire invenduto",
      "4-5": "Omnicanalità strutturata: negozio fisico + e-commerce + Instagram shop + WhatsApp Business. Il cliente compra dove vuole, tu sei presente ovunque con la stessa esperienza"

    }
  },
  "commercio_orologi_gioielli": {
    "vendite": {
      "1-2": "Il cliente compra fiducia prima che un orologio: conosci la storia di ogni pezzo, i movimenti, i materiali, le varianti. Un venditore competente vale più di qualsiasi vetrina",
      "2-3": "Costruisci relazioni con i collezionisti locali: sono i clienti più fedeli e i migliori passaparola. Un collezionista soddisfatto porta altri collezionisti",
      "3-4": "Attiva un sistema di segnalatori: gioiellerie complementari, studi notarili, consulenti patrimoniali — chi gestisce patrimoni conosce chi vuole investire in orologi",
      "4-5": "Struttura commerciale con specialisti per segmento (orologi sportivi, dress watch, gioielli da cerimonia) e programma VIP per i clienti alto spendenti"

    },
    "pipeline": {
      "1-2": "Tieni un registro dei clienti con storico acquisti e preferenze: marca, stile, budget. Un cliente che ha comprato un Rolex sport potrebbe volere un dress watch — tu devi saperlo prima che lo cerchi altrove",
      "2-3": "CRM semplice per gestire i contatti: avvisa i clienti quando arriva un pezzo nel loro stile o budget. Il pre-avviso esclusivo fidelizza più di qualsiasi sconto",
      "3-4": "Pipeline strutturata con gestione wish list clienti, alert su Chrono24 per pezzi ricercati e forecast acquisti pre-owned basato sulla domanda del database",
      "4-5": "CRM avanzato integrato con i marketplace: quando arriva su Chrono24 un pezzo cercato da un tuo cliente, lo contatti prima che lo trovi da solo"

    },
    "team": {
      "1-2": "Il venditore deve sapere tutto: movimenti, referenze, storia dei brand, differenze tra varianti. Investi in formazione tecnica — un venditore ignorante in questo settore è pericoloso",
      "2-3": "Specializzazione per categoria: chi conosce gli orologi da sport, chi i dress watch, chi i gioielli da cerimonia. La competenza specifica aumenta la fiducia del cliente",
      "3-4": "Gemmologo o orologiaio certificato in staff: non solo per le riparazioni ma come leva commerciale — l'autenticazione interna è un differenziatore enorme vs la concorrenza",
      "4-5": "Team strutturato con responsabile vendite, specialisti per categoria, orologiaio/gemmologo interno e responsabile acquisti pre-owned"

    },
    "processi": {
      "1-2": "Autenticazione documentata per ogni pezzo: cartellino con provenienza, stato, accessori inclusi e garanzia. Un orologio senza documentazione vale il 30% in meno",
      "2-3": "Processo di valutazione e acquisto pre-owned strutturato: check list tecnica, verifica autenticità, valutazione mercato Chrono24 prima di fare un'offerta",
      "3-4": "Certificazioni formali: AGS per gioielli, formazione orologiera riconosciuta. Polizza assicurativa adeguata per il valore dello stock — spesso sottovalutata",
      "4-5": "Sistema qualità completo: certificazioni gemologiche, partnership con centri di assistenza ufficiali, processo di autenticazione certificato e gestione resi strutturata"

    },
    "ricavi": {
      "1-2": "Analizza i margini per categoria: il pre-owned ha margini doppi rispetto al nuovo. Ogni orologio nuovo venduto è un'opportunità di acquistare l'usato del cliente",
      "2-3": "La permuta è la leva di chiusura più potente in questo settore: il cliente vuole il nuovo ma ha già un orologio. Gestisci la permuta come centro di profitto, non come costo",
      "3-4": "Revenue mix strutturato: nuovo + pre-owned + riparazioni + servicing + gioielli. Il servicing orologi (revisione, cinturini, bracciali) è margine puro e fidelizza",
      "4-5": "Pre-owned come business unit autonoma con buyer dedicato, rotazione stock monitorata e presenza strutturata su Chrono24 e Catawiki come canali di vendita globali"

    },
    "marketing": {
      "1-2": "Instagram con foto professionali di ogni pezzo: luce giusta, dettagli del quadrante, del movimento se visibile. Gli orologi si vendono con gli occhi — la foto è il 50% della vendita",
      "2-3": "Presenza attiva su Chrono24 e Catawiki come vetrine globali — non sono concorrenti, sono canali. Un pezzo su Chrono24 viene visto da collezionisti di tutto il mondo",
      "3-4": "Contenuti tecnici su Instagram e YouTube: storia di un modello, come riconoscere un falso, guida all'acquisto. Posizionati come esperto di riferimento nella tua zona",
      "4-5": "Piano marketing strutturato: social + marketplace + eventi privati per clienti VIP + collaborazioni con case d'aste per pezzi di valore"

    },
    "sitoweb": {
      "1-2": "Sito con stock fotografato professionalmente, schede tecniche complete e contatto diretto. Il cliente vuole vedere il pezzo prima di venire in negozio",
      "2-3": "Sito con filtri per brand, categoria e fascia di prezzo, sezione pre-owned dedicata e form richiesta valutazione del proprio orologio",
      "3-4": "Sito professionale con certificazioni in evidenza, case history di acquisti notevoli e area clienti per tracciare le proprie acquisizioni",
      "4-5": "Portale con stock in tempo reale sincronizzato con Chrono24, richiesta valutazione online e area VIP riservata per i clienti alto spendenti"

    },
    "ecommerce": {
      "1-2": "Vendi solo in negozio — perdi clienti che cercano online. Apri subito un profilo Chrono24 anche con 5-10 pezzi: è la vetrina globale del tuo stock",
      "2-3": "Chrono24 e Catawiki come canali attivi con stock aggiornato, foto professionali e risposta rapida alle richieste. Usa Chrono24 anche per acquistare pezzi da rivendere",
      "3-4": "Strategia pre-owned strutturata: acquisto da privati, permute valutate correttamente, rivendita su marketplace e in negozio. Il margine sul pre-owned è il doppio del nuovo",
      "4-5": "Pre-owned come centro di profitto autonomo: buyer dedicato, presenza certificata su Chrono24 come dealer verificato, partecipazione a Catawiki per pezzi di valore e rete di fornitori privati fidelizzati"

    }
  },
  "alimentare_trasformazione": {
    "vendite": {
      "1-2": "Vendi solo ai soliti canali locali — zero sviluppo commerciale. Mappa i negozi specialty food, enoteche e ristoranti della zona che valorizzano i prodotti artigianali e proponi una fornitura di prova con campioni",
      "2-3": "Attiva un agente o un broker con contatti nella GDO locale e nell'horeca regionale. Parallelamente costruisci il canale diretto: chi visita il tuo stabilimento è il cliente ideale per l'acquisto diretto",
      "3-4": "Rete commerciale strutturata per canale: GDO locale + specialty food + horeca + export. Il prodotto DOP o IGP si vende all'estero con margini superiori all'Italia",
      "4-5": "Struttura commerciale completa con agenti per canale, export manager per i mercati esteri prioritari e canale diretto (e-commerce + spaccio aziendale) come centro di profitto autonomo"

    },
    "pipeline": {
      "1-2": "Tieni un registro dei clienti attivi: canale, prodotto, volumi e frequenza di riordino. Il cliente che smette di riordinare va contattato subito — spesso è un problema di servizio risolvibile",
      "2-3": "CRM per gestire clienti B2B e lista clienti diretti. Traccia i campioni inviati, le degustazioni fatte e i follow-up aperti",
      "3-4": "Pipeline strutturata per canale con forecast mensile, gestione stagionalità produzione e alert su cali di acquisto per cliente",
      "4-5": "Sistema integrato produzione-ordini-logistica: visibilità completa su stock disponibile, ordini confermati e capacità produttiva residua per prendere decisioni commerciali in tempo reale"

    },
    "team": {
      "1-2": "Il titolare produce e vende — zero separazione. Anche solo una figura part-time per la gestione ordini e la comunicazione con i clienti libera tempo prezioso per la produzione",
      "2-3": "Commerciale dedicato con conoscenza del prodotto e del territorio: sa raccontare la storia del salume, del formaggio, della pasta — e quella storia è il 50% della vendita",
      "3-4": "Team strutturato: produzione + commerciale + logistica. Chi gestisce l'export deve conoscere le normative doganali e i requisiti sanitari dei mercati esteri",
      "4-5": "Struttura completa con responsabile produzione, direttore commerciale, export manager e responsabile qualità certificazioni"

    },
    "processi": {
      "1-2": "Stabilimento riconosciuto CE obbligatorio per vendere fuori regione. Bollo sanitario, piano HACCP avanzato, tracciabilità lotti documentata — sono obblighi di legge non negoziabili",
      "2-3": "Certificazione DOP o IGP se il prodotto ne ha i requisiti — è la leva di valorizzazione più potente del made in Italy alimentare. Processo di controllo qualità documentato per ogni lotto",
      "3-4": "BRC o IFS per accedere alla GDO strutturata. Certificazione biologica se usi materie prime bio. Processo di gestione fornitori qualificati per garantire la qualità della materia prima",
      "4-5": "Sistema qualità certificato con audit periodici, tracciabilità completa filiera, certificazioni per export (USDA, halal, kosher se necessario) e carbon footprint come leva sostenibilità"

    },
    "ricavi": {
      "1-2": "Analizza i margini per prodotto e per canale: vendere il prosciutto al banco del produttore a 25€/kg è molto più redditizio che venderlo al grossista a 12€/kg. Il canale diretto vale il doppio",
      "2-3": "Filiera come vantaggio competitivo e leva di prezzo: se allevi i tuoi animali o coltivi le tue materie prime, puoi comunicare e prezzare la tracciabilità completa",
      "3-4": "Mix canali ottimizzato: GDO (volume, margini bassi) + specialty e horeca (margini medi) + diretto (margini alti) + export premium (margini alti + valorizzazione brand)",
      "4-5": "Revenue strutturato con contratti annuali GDO, forniture continuative horeca, e-commerce diretto come centro di profitto e export con importatori esclusivi per mercato"

    },
    "marketing": {
      "1-2": "Il territorio è il brand — racconta la storia delle materie prime, del processo produttivo, della tradizione. Instagram e Facebook con foto del laboratorio e del prodotto finito",
      "2-3": "Presenza a fiere di settore (Cibus, Salone del Gusto, TUTTOFOOD) — sono dove si incontrano i buyer della GDO, dell'horeca e dell'export. Un campione al momento giusto vale più di anni di telefonate",
      "3-4": "PR gastronomica: riviste food, guide, chef ambassador. Un Michelin che usa il tuo prodotto vale più di qualsiasi pubblicità. Collaborazioni con chef per visibilità e credibilità",
      "4-5": "Piano marketing strutturato: fiere nazionali e internazionali + PR gastronomica + storytelling digitale + presenza su piattaforme food premium (Eataly, Amazon Gourmet)"

    },
    "sitoweb": {
      "1-2": "Sito con storia dell'azienda e del territorio, catalogo prodotti con foto professionali e contatti diretti. Il buyer straniero cerca il produttore online prima di qualsiasi contatto",
      "2-3": "E-commerce per vendite dirette ai privati: spedizione in tutta Italia, confezioni regalo e box tematiche. Il prodotto trasformato si spedisce facilmente e ha lunga conservazione",
      "3-4": "Sito professionale con e-commerce, sezione ricette con i propri prodotti, area stampa con materiali scaricabili e versione multilingua per export",
      "4-5": "Portale completo con e-commerce multilingua, area B2B per negozi e ristoranti, spaccio aziendale prenotabile online e integrazione con marketplace food premium"

    },
    "ecommerce": {
      "1-2": "Vendi solo localmente — il tuo prodotto artigianale potrebbe raggiungere tutta Italia e l'estero. Inizia con uno shop online semplice e spedizione con corriere refrigerato",
      "2-3": "Shop online attivo con box regalo e confezioni natalizie: il salume artigianale o il formaggio DOP sono i regali aziendali perfetti. Margini altissimi e domanda garantita a Natale",
      "3-4": "Strategia e-commerce strutturata con sito proprio + presenza su Eataly online + Amazon Gourmet. Export diretto verso i mercati dove il made in Italy alimentare ha più valore (USA, Giappone, Germania)",
      "4-5": "Canale digitale come centro di profitto autonomo: e-commerce proprio + marketplace premium + export diretto online. Il digitale genera il 30-40% del fatturato con i margini più alti di tutti i canali"

    }
  },
  "alimentare_vini": {
    "vendite": {
      "1-2": "Il titolare porta qualche bottiglia ai ristoratori amici — zero struttura commerciale. Mappa i ristoranti, enoteche e wine bar della tua zona e inizia a visitarli con un listino professionale e campioni",
      "2-3": "Attiva 1-2 agenti plurimandatari con portafoglio clienti horeca nella tua regione. Parallelamente inizia a costruire una lista di privati appassionati — sono i futuri clienti diretti",
      "3-4": "Rete agenti strutturata per zona con obiettivi mensili. Export manager per almeno 1-2 mercati esteri prioritari (Germania, Svizzera, USA, UK). I privati fidelizzati ricevono anteprime e riservazioni",
      "4-5": "Struttura commerciale completa: agenti per canale (horeca, GDO, export), wine club per i privati con abbonamento e enoturismo come canale di acquisizione e fidelizzazione"

    },
    "pipeline": {
      "1-2": "Tieni un registro dei clienti horeca attivi: ristorante, referente, bottiglie ordinate per referenza e frequenza. Senza tracciatura non sai chi sta smettendo di comprare",
      "2-3": "CRM semplice per gestire agenti, clienti horeca e lista privati. Traccia le degustazioni fatte, i feedback ricevuti e i follow-up aperti",
      "3-4": "Pipeline strutturata per canale: horeca + privati + export + enoturismo. Forecast trimestrale per referenza con gestione vendemmia e stock disponibile",
      "4-5": "Sistema integrato con gestione ordini, stock cantina e CRM: il commerciale sa sempre quali referenze sono disponibili e quante bottiglie restano prima di fare proposte ai clienti"

    },
    "team": {
      "1-2": "L'enologo è anche il venditore — ma non può fare tutto. Identifica una figura anche part-time che gestisca gli ordini, le spedizioni e i contatti con i clienti abituali",
      "2-3": "Primo commerciale dedicato con passione per il vino e capacità relazionale: gestisce gli agenti, visita i clienti chiave e costruisce la lista privati",
      "3-4": "Team strutturato: responsabile commerciale + agenti + addetto export. Chi fa enoturismo deve avere competenze di ospitalità oltre che di vendita",
      "4-5": "Struttura completa con direttore commerciale, team vendite per canale, export manager e responsabile enoturismo con obiettivi autonomi"

    },
    "processi": {
      "1-2": "Documentazione base obbligatoria: etichette conformi al Regolamento UE 2021/2117, schede tecniche per ogni referenza, registro di cantina aggiornato. Senza non puoi vendere legalmente",
      "2-3": "Certificazione biologica o biodinamica se le pratiche lo consentono — è una leva commerciale crescente sia nell'horeca che nei privati. Fascicolo tecnico completo per ogni referenza",
      "3-4": "SQNPI o certificazione di sostenibilità viticola. Processi di gestione ordini e spedizioni documentati. Prerequisito per GDO e export strutturato",
      "4-5": "Sistema qualità certificato, tracciabilità completa dalla vigna alla bottiglia, certificazioni per i mercati export (biologico EU, USDA Organic per USA) e carbon footprint calcolata"

    },
    "ricavi": {
      "1-2": "Analizza i margini per referenza e per canale: vendere all'horeca a 5€ la bottiglia o al privato a 15€ sono due modelli diversi. Capire dove guadagni davvero orienta tutta la strategia",
      "2-3": "Riduci la dipendenza da 1-2 grossisti che ti comprano tutto a prezzo basso — ti tolgono margine e potere negoziale. Ogni cliente diretto acquisito aumenta la redditività media",
      "3-4": "Mix di canali ottimizzato: horeca (volume), privati (margine), export (prestigio e valorizzazione), enoturismo (margine altissimo + fidelizzazione). Nessun canale oltre il 50% del fatturato",
      "4-5": "Revenue strutturato con contratti annuali horeca, wine club con abbonamento mensile, export con importatori esclusivi e enoturismo come centro di profitto autonomo"

    },
    "marketing": {
      "1-2": "Presenza sulle guide vini (Gambero Rosso, Veronelli, Slow Food) — una citazione positiva vale più di qualsiasi pubblicità. Manda campioni ai giornalisti di settore",
      "2-3": "Instagram con storytelling della cantina: vendemmia, vita in vigna, degustazioni. Il vino si vende con le emozioni — mostra il territorio e le persone prima del prodotto",
      "3-4": "Presenza a Vinitaly e a fiere internazionali selezionate (ProWein, Vinexpo). Collaborazioni con sommelier e wine influencer per raggiungere i privati appassionati",
      "4-5": "Piano marketing strutturato: fiere + digital storytelling + PR enogastronomica + enoturismo come strumento di marketing esperienziale. La cantina visitabile è il miglior venditore"

    },
    "sitoweb": {
      "1-2": "Sito con storia della cantina, referenze con schede tecniche e foto professionali, contatti e form richiesta listino. Il buyer straniero lo visita prima di qualsiasi contatto",
      "2-3": "Sito con sezione enoturismo (visite e degustazioni prenotabili online), blog sulla vita in cantina e area riservata per i clienti horeca con listino e documenti",
      "3-4": "Sito professionale con e-commerce per privati, prenotazione visite online, versione in almeno 2 lingue per l'export e area press con materiali scaricabili",
      "4-5": "Portale completo con e-commerce multilingua, wine club con abbonamento, prenotazione enoturismo integrata e area importatori con documenti doganali e certificazioni"

    },
    "ecommerce": {
      "1-2": "Zero vendite dirette — tutto passa da grossisti e agenti che prendono il margine. Inizia raccogliendo email di privati interessati durante le degustazioni e le visite in cantina",
      "2-3": "Shop online semplice per vendere direttamente ai privati: spedizione in tutta Italia, confezioni regalo, abbonamento mensile base. Ogni bottiglia venduta diretto vale 3 volte quella venduta al grossista",
      "3-4": "E-commerce strutturato con wine club, abbonamenti stagionali e spedizioni internazionali. Presenza su marketplace di vino (Tannico, Vinomofo) per visibilità e nuovi clienti",
      "4-5": "Strategia direct-to-consumer completa: e-commerce proprio + marketplace selezionati + wine club con 500+ iscritti + enoturismo integrato. Il canale diretto vale il 30-40% del fatturato con margini doppi rispetto all'horeca"

    }
  },
  "alimentare_forno": {
    "vendite": {
      "1-2": "Il forno vive di clienti abituali che entrano ogni mattina — conosci i loro nomi e le loro abitudini. Inizia a proporre attivamente prodotti nuovi e abbinamenti: chi compra il pane potrebbe comprare anche la focaccia farcita",
      "2-3": "Apri il canale B2B locale: bar, caffetterie e ristoranti della zona hanno bisogno di prodotti freschi ogni giorno. Una fornitura fissa a 3-4 bar vale più di 50 clienti retail occasionali",
      "3-4": "Struttura le forniture B2B con listino dedicato, consegna programmata e accordi stagionali. Attiva il catering per eventi locali — matrimoni, comunioni, aziende — con margini molto superiori al retail",
      "4-5": "Struttura commerciale con responsabile B2B per le forniture horeca, gestione catering eventi e canale online per ordini e consegna a domicilio"

    },
    "pipeline": {
      "1-2": "Tieni un registro dei clienti B2B: bar, ristoranti, quantità ordinate e frequenza. Chi non ordina da una settimana sta comprando altrove",
      "2-3": "CRM semplice per gestire i clienti horeca: storico ordini, prodotti preferiti e scadenze contratti stagionali",
      "3-4": "Pipeline strutturata con forecast settimanale per cliente B2B, gestione ordini catering e database clienti retail per promozioni e novità",
      "4-5": "Sistema integrato ordini-produzione: gli ordini B2B del giorno dopo arrivano entro le 18 per pianificare la produzione notturna senza sprechi"

    },
    "team": {
      "1-2": "Il fornaio fa tutto — produce e vende. Anche solo un aiutante part-time al banco libera tempo prezioso e migliora il servizio al cliente",
      "2-3": "Fornaio junior o apprendista: il problema del ricambio generazionale va affrontato subito. Cerca nelle scuole alberghiere e offri un percorso di crescita concreto",
      "3-4": "Team strutturato: produzione (fornai) separata dalla vendita (banco + consegne). Chi vende non produce e viceversa — qualità e servizio migliorano entrambi",
      "4-5": "Struttura completa con responsabile produzione, responsabile vendite e banco, addetto consegne B2B e figura dedicata al catering eventi"

    },
    "processi": {
      "1-2": "HACCP obbligatorio e aggiornato — è la base legale per operare. Tracciabilità delle materie prime documentata. Senza non puoi lavorare",
      "2-3": "Certificazione per allergeni: etichettatura precisa di tutti i prodotti con i 14 allergeni — obbligo di legge spesso gestito male. Processo di gestione energetica base: il forno è il costo principale",
      "3-4": "Certificazione biologica se usi farine bio — è una leva commerciale crescente. Processo di ottimizzazione energetica: programmazione cotture per ridurre i consumi nelle ore di punta",
      "4-5": "Sistema qualità documentato, ottimizzazione energetica avanzata (forno a basso consumo, recupero calore), certificazioni per GDO e catering aziendale strutturato"

    },
    "ricavi": {
      "1-2": "Analizza i margini per prodotto: il pane base ha margini bassi, la pasticceria e la gastronomia hanno margini tripli. Ogni ora di forno usata per torte guadagna più del pane bianco",
      "2-3": "Diversifica l'offerta verso prodotti ad alto margine: pasticceria, gastronomia, prodotti speciali (lievito madre, farine antiche, gluten free). Il cliente paga il premium per la qualità artigianale",
      "3-4": "Mix di ricavi strutturato: retail + B2B horeca + catering + prodotti speciali. Riduci la dipendenza dal pane commodity che compete con il supermercato",
      "4-5": "Revenue ottimizzato con contratti B2B annuali, catering come centro di profitto autonomo e prodotti a marchio proprio in GDO locale o online"

    },
    "marketing": {
      "1-2": "Google My Business aggiornato con foto dei prodotti, orari precisi e risposta alle recensioni. Il cliente cerca il forno su Google Maps prima di uscire di casa",
      "2-3": "Instagram con foto dei prodotti freschi ogni mattina — il pane appena sfornato alle 7 sui social porta clienti. Semplice, autentico, costante",
      "3-4": "Storytelling del territorio: farine locali, ricette tradizionali, collaborazioni con produttori locali. Il cliente paga di più se conosce la storia dietro il prodotto",
      "4-5": "Piano marketing strutturato: social + PR locale + presenza a mercati e fiere gastronomiche + collaborazioni con ristoranti per valorizzazione reciproca"

    },
    "sitoweb": {
      "1-2": "Sito base con prodotti, orari, indirizzo e possibilità di prenotare prodotti da ritirare. Riduce le code e garantisce disponibilità",
      "2-3": "Sito con catalogo prodotti fotografato, sezione speciali e prenotazioni online per prodotti su ordinazione (torte, catering)",
      "3-4": "Sito professionale con e-commerce per spedizione prodotti a lunga conservazione (panettoni, biscotti, grissini) e prenotazione catering",
      "4-5": "Portale completo con ordini online per consegna a domicilio, abbonamento pane settimanale e area B2B per i clienti horeca"

    },
    "ecommerce": {
      "1-2": "Zero canale online — perdi i clienti che non possono venire di persona. Inizia con un sistema di prenotazione WhatsApp per i prodotti del giorno dopo",
      "2-3": "Ordini online o via app per ritiro in negozio: riduce gli sprechi perché produci quello che è già venduto. Consegna a domicilio nella zona come servizio premium",
      "3-4": "E-commerce per prodotti a lunga conservazione (panettoni, colombe, biscotti artigianali): vendita nazionale con margini alti e zero deperibilità",
      "4-5": "Strategia omnicanale: negozio fisico + consegna a domicilio + e-commerce nazionale per specialty + abbonamento settimanale pane fresco per i clienti fedeli"

    }
  },
  "alimentare_conserve": {
    "vendite": {
      "1-2": "Vendi solo ai mercati locali e agli amici — zero struttura. Mappa negozi alimentari, enoteche e gastronomie della zona e proponi una fornitura di prova con campioni: il prodotto artigianale si vende facendolo assaggiare",
      "2-3": "Attiva canali B2B locali: negozi specialty food, agriturismi, enoteche. Parallelamente costruisci una lista clienti diretti — chi compra al mercato è il cliente ideale per l'e-commerce",
      "3-4": "Agente o broker per la GDO locale e i negozi specialty food regionali. Canale turistico strutturato: accordi con agriturismi, B&B e punti vendita turistici per forniture continuative",
      "4-5": "Struttura commerciale con responsabile B2B per GDO e specialty, canale export per mercati esteri (USA, Germania, Giappone adorano i prodotti italiani artigianali) e e-commerce come canale primario"

    },
    "pipeline": {
      "1-2": "Tieni un registro dei clienti B2B: negozio, referente, prodotti ordinati e frequenza. La conserva dura mesi — il riordino non è automatico, va stimolato",
      "2-3": "CRM semplice per gestire clienti B2B e lista privati. Traccia i campioni inviati e i follow-up aperti. I clienti che hanno assaggiato e non hanno ordinato vanno ricontattati",
      "3-4": "Pipeline strutturata per canale con forecast stagionale basato sulla produzione disponibile. Gestione liste d'attesa per prodotti limitati — la scarsità è una leva di valore",
      "4-5": "Sistema integrato produzione-ordini-spedizioni: sai sempre quanti vasetti hai disponibili per ogni referenza e gestisci gli ordini in base allo stock reale"

    },
    "team": {
      "1-2": "Produzione familiare — tutto nelle mani del titolare. Anche solo un aiutante stagionale durante il periodo di produzione fa la differenza sulla quantità producibile",
      "2-3": "Figura dedicata alla gestione ordini, spedizioni e customer service: il cliente online che aspetta il vasetto di pomodoro vuole risposta rapida",
      "3-4": "Team strutturato: produzione (stagionale con picchi) + commerciale + logistica spedizioni. Chi spedisce deve imballare bene — un vasetto rotto è un cliente perso",
      "4-5": "Struttura completa con responsabile produzione, commerciale B2B, e-commerce manager e addetto logistica spedizioni con standard packaging definiti"

    },
    "processi": {
      "1-2": "Autorizzazione sanitaria per la produzione alimentare artigianale (notifica OSA) obbligatoria. HACCP documentato. Etichette conformi con tutti gli allergeni — senza non puoi vendere legalmente",
      "2-3": "Tracciabilità lotti documentata: ogni vasetto deve avere lotto, data produzione e scadenza. Processo di controllo qualità per ogni lotto prodotto — un difetto su scala fa danni enormi",
      "3-4": "Certificazione biologica se usi materie prime bio — è la leva principale per e-commerce e export. BRC o IFS per accedere alla GDO strutturata",
      "4-5": "Sistema qualità certificato con tracciabilità completa, certificazioni per export (USDA Organic, certificazioni halal se serve), carbon footprint e packaging sostenibile come leva commerciale"

    },
    "ricavi": {
      "1-2": "Analizza i margini per prodotto: la confettura artigianale a 8€ ha margini molto superiori alla passata a 3€. Orienta la produzione verso i prodotti premium",
      "2-3": "Il canale diretto (mercati, e-commerce) ha margini doppi rispetto alla GDO. Ogni cliente diretto acquisito vale molto di più di uno scaffale in supermercato",
      "3-4": "Box regalo e kit tematici: un cesto natalizio con 5 prodotti a 35€ vale più di 5 vasetti venduti singolarmente a 6€ l'uno. Il confezionamento regalo moltiplica il valore percepito",
      "4-5": "Revenue mix ottimizzato: GDO locale (volume) + specialty e horeca (margine medio) + e-commerce diretto (margine alto) + export (prestigio e valorizzazione) + gift box (margine altissimo)"

    },
    "marketing": {
      "1-2": "Il territorio è il tuo brand: racconta la storia delle materie prime, del luogo, della ricetta di famiglia. Instagram con foto dei prodotti e del processo di produzione — l'autenticità vende",
      "2-3": "Presenza ai mercati contadini e alle fiere enogastronomiche locali: il campione gratuito converte meglio di qualsiasi pubblicità. Raccogli email ad ogni degustazione",
      "3-4": "Collaborazioni con food blogger e influencer gastronomici: una recensione autentica raggiunge migliaia di clienti ideali. PR verso riviste food e guide gastronomiche",
      "4-5": "Piano marketing strutturato: social storytelling + fiere nazionali (Salone del Gusto, Cibus) + PR gastronomica + collaborazioni con chef per visibilità e credibilità"

    },
    "sitoweb": {
      "1-2": "Sito con storia del produttore, catalogo prodotti con foto professionali e contatti. Il vasetto artigianale si vende con la storia — senza storia è solo un vasetto",
      "2-3": "E-commerce semplice per vendere online: spedizione in tutta Italia, confezioni regalo e abbonamento box mensile. La conserva si spedisce facilmente — è il prodotto ideale per l'online",
      "3-4": "Sito professionale con e-commerce, sezione ricette con i propri prodotti, area stampa con materiali scaricabili e versione in inglese per i clienti stranieri",
      "4-5": "Portale completo con e-commerce multilingua, abbonamento box personalizzabile, area B2B per negozi e ristoranti e integrazione con i principali marketplace food (Amazon, Eataly online)"

    },
    "ecommerce": {
      "1-2": "Vendi solo ai mercati locali — il tuo raggio d'azione è limitato dalla geografia. Un e-commerce semplice ti apre l'Italia intera senza costi fissi aggiuntivi",
      "2-3": "Shop online attivo con spedizione in 48 ore: box regalo, confezioni natalizie e abbonamento mensile. Il cliente del nord che ha assaggiato al mercato al sud può continuare a comprare da te",
      "3-4": "Presenza su marketplace food specializzati (Gustoso, La Pignatta, Eataly online) per visibilità e nuovi clienti. Amazon per i prodotti a più alto volume",
      "4-5": "Strategia e-commerce strutturata: sito proprio + marketplace selezionati + export diretto online verso USA e Germania. Il canale digitale genera il 40-50% del fatturato con i margini più alti"

    }
  },
  "alimentare_ingredienti": {
    "vendite": {
      "1-2": "Il cliente compra l'ingrediente ma in realtà compra una soluzione — il pasticcere vuole un risultato nel piatto, non una polvere in un sacchetto. Visita i clienti con campioni e dimostrazioni pratiche: fai assaggiare il risultato finale",
      "2-3": "Attiva agenti tecnico-commerciali con background alimentare: devono parlare la stessa lingua del cliente. Un agente che non sa cos'è il Brix o il pH non vende ingredienti professionali",
      "3-4": "Key account per i clienti industriali: contratti annuali con volumi minimi, prezzi fissi trimestrali e tecnico dedicato. Il cliente industriale vuole certezza di fornitura e qualità costante",
      "4-5": "Struttura commerciale con agenti per canale (pasticceria, gelateria, industria, horeca), application lab per dimostrazioni e key account per i clienti strutturati"

    },
    "pipeline": {
      "1-2": "Traccia i clienti per prodotto acquistato e frequenza: chi usa il tuo ingrediente X probabilmente ha bisogno anche del Y complementare — è cross-selling naturale",
      "2-3": "CRM per gestire clienti attivi, campioni inviati e sviluppi in corso. Ogni ricetta sviluppata con il cliente è un vincolo alla concorrenza — tracciala come opportunità",
      "3-4": "Pipeline strutturata con gestione sviluppi prodotto per cliente, forecast annuale per referenza e alert su lotti in scadenza da gestire commercialmente",
      "4-5": "Sistema integrato clienti-sviluppi-produzione: visibilità completa su quali clienti stanno sviluppando nuovi prodotti con i tuoi ingredienti e quali opportunità sono in pipeline"

    },
    "team": {
      "1-2": "Il tecnico è il venditore — chi conosce l'ingrediente lo sa vendere meglio di qualsiasi commerciale puro. Forma le figure tecniche sulle basi della comunicazione commerciale",
      "2-3": "Application specialist dedicato: visita i clienti in laboratorio, sviluppa ricette dimostrative e forma i loro tecnici sull'uso ottimale dei prodotti",
      "3-4": "Team tecnico-commerciale strutturato: application specialist + agenti commerciali + inside sales per la gestione ordini ricorrenti",
      "4-5": "Struttura completa con direttore tecnico-commerciale, team application specialist per segmento, agenti di zona e laboratorio R&D dedicato allo sviluppo nuove applicazioni"

    },
    "processi": {
      "1-2": "Certificazioni base obbligatorie: HACCP, tracciabilità lotti, schede tecniche e schede di sicurezza per ogni prodotto. Il cliente professionale le richiede sempre prima del primo ordine",
      "2-3": "Certificazione biologica EU se hai materie prime bio — è requisito crescente nell'industria alimentare. Halal e kosher se vuoi accedere a quei mercati. Processo di controllo qualità per lotto documentato",
      "3-4": "BRC o IFS per i clienti industria strutturata — senza non passi la qualifica fornitore. Processo di gestione non conformità e gestione reclami documentato e rapido",
      "4-5": "Sistema qualità certificato con audit periodici, tracciabilità completa, certificazioni multiple mantenute e laboratorio analisi interno per garantire costanza qualitativa lotto su lotto"

    },
    "ricavi": {
      "1-2": "Analizza i margini per categoria: gli ingredienti funzionali e gli aromi naturali hanno margini molto superiori alle materie prime commodity. Orienta lo sviluppo verso i prodotti ad alto valore aggiunto",
      "2-3": "Contratti annuali con i clienti principali: volumi minimi garantiti in cambio di prezzi stabili e priorità di fornitura. Riduce la volatilità e aumenta lo switching cost",
      "3-4": "Servizi tecnici a pagamento: sviluppo ricette personalizzate, formazione tecnica, ottimizzazione processi del cliente. La consulenza vale spesso più dell'ingrediente stesso",
      "4-5": "Revenue mix strutturato: ingredienti standard (volume) + specialty e funzionali (margine) + servizi consulenza tecnica (margine alto) + sviluppo esclusivo per cliente (lock-in)"

    },
    "marketing": {
      "1-2": "Schede tecniche professionali per ogni prodotto: composizione, dosaggi consigliati, applicazioni, certificazioni e shelf life. Il tecnico del cliente le scarica prima di qualsiasi contatto commerciale",
      "2-3": "Presenza a fiere di settore (sigep, Host, Cibus, Fi Europe): sono dove si incontrano i buyer e i tecnici dell'industria alimentare. Una demo pratica allo stand vale più di qualsiasi brochure",
      "3-4": "Workshop tecnici per i clienti: giornate di formazione sulle nuove applicazioni dei tuoi ingredienti. Chi forma il cliente lo fidelizza profondamente",
      "4-5": "Piano marketing strutturato: fiere internazionali + workshop tecnici + pubblicazioni su riviste di settore + partnership con scuole di cucina e pasticceria per visibilità e credibilità"

    },
    "sitoweb": {
      "1-2": "Sito con catalogo prodotti tecnico: composizione, dosaggi, applicazioni, certificazioni e download schede tecniche. Il tecnico deve trovare tutto senza chiamare",
      "2-3": "Sito con area ricette dimostrative per applicazione, sezione novità prodotto e form richiesta campioni con specifica dell'applicazione di interesse",
      "3-4": "Portale tecnico con area riservata clienti, download documentazione qualità, richiesta sviluppo personalizzato e webinar tecnici on-demand",
      "4-5": "Piattaforma digitale completa con area clienti dedicata, gestione sviluppi in corso, ordini online con specifiche tecniche e knowledge base ricette per applicazione"

    },
    "ecommerce": {
      "1-2": "Fornisci solo l'ingrediente senza supporto tecnico — il cliente lo usa male e incolpa il prodotto. Inizia a offrire dosaggi consigliati e ricette base per ogni ingrediente venduto",
      "2-3": "Application specialist che visita i clienti in laboratorio: sviluppa con loro una ricetta usando il tuo ingrediente. Quella ricetta crea un vincolo fortissimo alla concorrenza",
      "3-4": "Laboratorio dimostrativo interno dove i clienti vengono a fare prove e sviluppi: chi sviluppa una ricetta nel tuo lab con i tuoi ingredienti difficilmente cambia fornitore",
      "4-5": "Centro di eccellenza tecnica: laboratorio R&D avanzato, co-sviluppo esclusivo con i clienti strategici, brevetti su nuove applicazioni e consulenza tecnica come business unit autonoma"

    }
  },
  "alimentare_birra": {
    "vendite": {
      "1-2": "Vendi solo ai tuoi amici e ai bar del quartiere — zero struttura. Mappa i pub, le enoteche e i ristoranti della zona che valorizzano il craft beer e proponi una fornitura di prova con campioni: la birra si vende facendola assaggiare",
      "2-3": "Attiva un distributore locale o regionale specializzato in craft beer: conosce i locali giusti e ha già le relazioni. Parallelamente costruisci la community di appassionati — sono i tuoi futuri clienti diretti e ambasciatori",
      "3-4": "Rete distributiva strutturata per zona con distributori specializzati. Export verso i mercati esteri più attivi sul craft italiano (USA, Giappone, Scandinavia). La taproom come canale di vendita diretto con margini altissimi",
      "4-5": "Struttura commerciale con responsabile distribuzione B2B, export manager e responsabile taproom ed esperienze. Il brand del birrificio è il vero asset — proteggilo e sviluppalo"

    },
    "pipeline": {
      "1-2": "Tieni un registro dei locali serviti: tipo di locale, referenze ordinate e frequenza. Chi non riordina da un mese sta comprando da un altro birrificio",
      "2-3": "CRM semplice per gestire distributori, clienti horeca diretti e lista appassionati per eventi e degustazioni",
      "3-4": "Pipeline strutturata per canale: horeca + taproom + eventi + export. Gestione birre stagionali e limited edition con liste d'attesa — la scarsità è una leva di valore nel craft",
      "4-5": "Sistema integrato produzione-ordini-distribuzione: visibilità completa su stock per referenza, ordini confermati e capacità produttiva residua per gestire le opportunità commerciali"

    },
    "team": {
      "1-2": "Il birraio fa tutto. Anche solo una figura part-time per la gestione ordini, le consegne e i social libera tempo prezioso per la produzione",
      "2-3": "Brand ambassador dedicato: appassionato di birra, sa raccontare il prodotto, gestisce i social e rappresenta il birrificio agli eventi. È il volto del brand fuori dalla produzione",
      "3-4": "Team strutturato: produzione + commerciale distribuzione + responsabile taproom. Chi lavora in taproom deve saper raccontare ogni birra — è vendita esperienziale",
      "4-5": "Struttura completa con head brewer, responsabile commerciale, export manager e responsabile hospitality per taproom ed eventi"

    },
    "processi": {
      "1-2": "Autorizzazione sanitaria per produzione birra, accisa sull'alcol gestita correttamente, etichette conformi al Reg. UE — sono obblighi fiscali e sanitari non negoziabili",
      "2-3": "Processo di controllo qualità per ogni lotto: analisi chimiche base (grado alcolico, amaro IBU, colore EBC), gestione temperatura durante fermentazione e stoccaggio",
      "3-4": "Certificazione biologica se usi ingredienti bio — crescente richiesta nel craft. Processo HACCP documentato per accedere alla GDO. Gestione accise strutturata con software dedicato",
      "4-5": "Sistema qualità certificato, tracciabilità completa dalla materia prima alla spina, certificazioni per export e laboratorio analisi interno per garantire costanza qualitativa"

    },
    "ricavi": {
      "1-2": "Analizza i margini per referenza e per canale: vendere in taproom a 5€ la pinta ha margini enormi rispetto a vendere la bottiglia al distributore a 2€. La taproom è il canale più redditizio",
      "2-3": "Limited edition e birre stagionali: margini superiori alle referenze fisse e creano urgenza di acquisto. Il cliente che sa che finisce compra subito",
      "3-4": "Mix canali ottimizzato: distribuzione horeca (volume) + taproom (margine alto) + e-commerce bottiglie (margine medio) + export (prestigio). Nessun canale oltre il 50% del fatturato",
      "4-5": "Revenue strutturato con contratti distributori, taproom come centro di profitto autonomo, abbonamento beer club per privati e export con importatori esclusivi per mercato"

    },
    "marketing": {
      "1-2": "Instagram e Facebook con foto del processo produttivo, nuove uscite e vita del birrificio. La community craft è attivissima sui social — l'autenticità conta più della perfezione",
      "2-3": "Presenza agli homebrew festival e alle fiere craft (Rimini Beer Attraction, Birreria). Collaborazioni con altri birrifici per brew collabs — amplificano entrambe le audience",
      "3-4": "Storytelling strutturato: ogni birra ha una storia, un territorio, un'ispirazione. Content marketing su Instagram, YouTube e Untappd — la piattaforma dove vivono gli appassionati di craft",
      "4-5": "Piano marketing strutturato: eventi + fiere nazionali e internazionali + digital community + PR specializzata + collaborazioni con chef e ristoratori per abbinamenti cibo-birra"

    },
    "sitoweb": {
      "1-2": "Sito con storia del birrificio, catalogo birre con schede tecniche (stile, grado alcolico, ingredienti, abbinamenti) e contatti. Il buyer straniero lo visita prima di qualsiasi contatto",
      "2-3": "E-commerce per vendite dirette: spedizione in tutta Italia, box regalo e abbonamento mensile. La birra artigianale in bottiglia si spedisce facilmente",
      "3-4": "Sito professionale con e-commerce, prenotazione visite in birrificio, calendario eventi e area stampa con materiali scaricabili",
      "4-5": "Portale completo con e-commerce multilingua, beer club con abbonamento, prenotazione taproom ed eventi integrata e area importatori per l'export"

    },
    "ecommerce": {
      "1-2": "Nessuna taproom o esperienza diretta — vendi solo attraverso distributori. Anche solo aprire il birrificio al pubblico un weekend al mese crea community e fatturato diretto ad altissimo margine",
      "2-3": "Taproom aperta regolarmente con mescita delle birre di produzione: ogni visita è un'esperienza che crea fan, non solo clienti. Organizza degustazioni guidate a pagamento",
      "3-4": "Taproom strutturata come locale vero con orari fissi, food pairing, eventi tematici e merchandising. Le visite al birrificio diventano un'attrazione — enoturismo della birra",
      "4-5": "Esperienza completa: taproom + tour del birrificio + degustazioni private + eventi aziendali + beer club per gli appassionati. L'hospitality genera il 30-40% del fatturato con i margini più alti"

    }
  },
  "tech_saas": {
    "vendite": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "pipeline": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "team": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "processi": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "ricavi": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "marketing": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "sitoweb": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "ecommerce": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    }
  },
  "tech_system_integrator": {
    "vendite": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "pipeline": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "team": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "processi": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "ricavi": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "marketing": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "sitoweb": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "ecommerce": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    }
  },
  "tech_digital_agency": {
    "vendite": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "pipeline": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "team": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "processi": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "ricavi": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "marketing": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "sitoweb": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "ecommerce": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    }
  },
  "tech_automazione": {
    "vendite": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "pipeline": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "team": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "processi": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "ricavi": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "marketing": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "sitoweb": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    },
    "ecommerce": {
      "1-2": "",
      "2-3": "",
      "3-4": "",
      "4-5": ""

    }
  }
};

var MICRO_TO_MACRO = {"manifatturiero_meccanica":"manifatturiero","manifatturiero_automotive":"manifatturiero","manifatturiero_packaging":"manifatturiero","manifatturiero_cterzi":"manifatturiero","manifatturiero_elettromeccanica":"manifatturiero","manifatturiero_tessile_tessuti":"manifatturiero","manifatturiero_tessile_capi":"manifatturiero","servizi_it":"servizi","servizi_formazione":"servizi","edilizia_residenziale":"edilizia","edilizia_impianti":"edilizia","edilizia_serramenti":"commercio","commercio_distribuzione_industriale":"commercio","commercio_ingrosso_alimentare":"commercio","commercio_materiali_edili":"commercio","commercio_ricambi_auto":"commercio","commercio_abbigliamento_ingrosso":"commercio","commercio_elettronica":"commercio","alimentare_birra":"alimentare","commercio_auto_moto_nuovo":"commercio","commercio_auto_moto_usato":"commercio","commercio_abbigliamento_dettaglio":"commercio","commercio_orologi_gioielli":"commercio","alimentare_trasformazione":"alimentare","alimentare_vini":"alimentare","alimentare_forno":"alimentare","alimentare_conserve":"alimentare","alimentare_ingredienti":"alimentare","tech_saas":"tech","tech_system_integrator":"tech","tech_digital_agency":"tech","tech_automazione":"tech"};
var LISTINO_DEFAULT = {"manifatturiero":{"vendite":{"1-2":{"r":250,"u":0},"2-3":{"r":2000,"u":600},"3-4":{"r":3500,"u":1200},"4-5":{"r":6500,"u":2500}},"pipeline":{"1-2":{"r":30,"u":0},"2-3":{"r":100,"u":800},"3-4":{"r":450,"u":3000},"4-5":{"r":900,"u":6000}},"team":{"1-2":{"r":200,"u":0},"2-3":{"r":3000,"u":600},"3-4":{"r":4500,"u":1200},"4-5":{"r":8500,"u":2500}},"processi":{"1-2":{"r":350,"u":0},"2-3":{"r":700,"u":1800},"3-4":{"r":1200,"u":3500},"4-5":{"r":5000,"u":6000}},"ricavi":{"1-2":{"r":150,"u":0},"2-3":{"r":250,"u":500},"3-4":{"r":450,"u":1500},"4-5":{"r":900,"u":3000}},"marketing":{"1-2":{"r":300,"u":0},"2-3":{"r":900,"u":600},"3-4":{"r":2000,"u":1800},"4-5":{"r":3500,"u":3500}},"sitoweb":{"1-2":{"r":80,"u":1500},"2-3":{"r":300,"u":3500},"3-4":{"r":600,"u":6000},"4-5":{"r":1000,"u":10000}},"ecommerce":{"1-2":{"r":0,"u":0},"2-3":{"r":250,"u":4000},"3-4":{"r":800,"u":8000},"4-5":{"r":2000,"u":15000}}},"servizi":{"vendite":{"1-2":{"r":0,"u":0},"2-3":{"r":1500,"u":400},"3-4":{"r":3200,"u":1000},"4-5":{"r":6000,"u":2000}},"pipeline":{"1-2":{"r":35,"u":0},"2-3":{"r":110,"u":900},"3-4":{"r":480,"u":3200},"4-5":{"r":950,"u":6500}},"team":{"1-2":{"r":200,"u":0},"2-3":{"r":3300,"u":600},"3-4":{"r":5000,"u":1200},"4-5":{"r":9500,"u":2500}},"processi":{"1-2":{"r":250,"u":0},"2-3":{"r":550,"u":1200},"3-4":{"r":900,"u":2500},"4-5":{"r":4000,"u":5000}},"ricavi":{"1-2":{"r":100,"u":0},"2-3":{"r":200,"u":300},"3-4":{"r":380,"u":1000},"4-5":{"r":750,"u":2500}},"marketing":{"1-2":{"r":250,"u":0},"2-3":{"r":750,"u":500},"3-4":{"r":1700,"u":1500},"4-5":{"r":3200,"u":3000}},"sitoweb":{"1-2":{"r":80,"u":1500},"2-3":{"r":300,"u":3500},"3-4":{"r":600,"u":6000},"4-5":{"r":1000,"u":10000}},"ecommerce":{"1-2":{"r":0,"u":0},"2-3":{"r":200,"u":2500},"3-4":{"r":600,"u":6000},"4-5":{"r":1800,"u":12000}}},"edilizia":{"vendite":{"1-2":{"r":0,"u":0},"2-3":{"r":0,"u":0},"3-4":{"r":800,"u":200},"4-5":{"r":1500,"u":500}},"pipeline":{"1-2":{"r":15,"u":0},"2-3":{"r":30,"u":0},"3-4":{"r":50,"u":300},"4-5":{"r":150,"u":1000}},"team":{"1-2":{"r":700,"u":0},"2-3":{"r":3200,"u":800},"3-4":{"r":4500,"u":1200},"4-5":{"r":6500,"u":2000}},"processi":{"1-2":{"r":200,"u":0},"2-3":{"r":450,"u":1000},"3-4":{"r":800,"u":2200},"4-5":{"r":3500,"u":4500}},"ricavi":{"1-2":{"r":0,"u":0},"2-3":{"r":350,"u":500},"3-4":{"r":1000,"u":1500},"4-5":{"r":3000,"u":3000}},"marketing":{"1-2":{"r":250,"u":0},"2-3":{"r":700,"u":400},"3-4":{"r":1400,"u":1400},"4-5":{"r":2800,"u":2800}},"sitoweb":{"1-2":{"r":0,"u":800},"2-3":{"r":50,"u":2000},"3-4":{"r":150,"u":3500},"4-5":{"r":300,"u":6000}},"ecommerce":{"1-2":{"r":0,"u":200},"2-3":{"r":50,"u":500},"3-4":{"r":200,"u":2000},"4-5":{"r":500,"u":5000}}},"commercio":{"vendite":{"1-2":{"r":200,"u":0},"2-3":{"r":1700,"u":500},"3-4":{"r":3300,"u":1000},"4-5":{"r":6500,"u":2000}},"pipeline":{"1-2":{"r":30,"u":0},"2-3":{"r":100,"u":800},"3-4":{"r":420,"u":2800},"4-5":{"r":850,"u":5500}},"team":{"1-2":{"r":150,"u":0},"2-3":{"r":2800,"u":500},"3-4":{"r":4300,"u":1000},"4-5":{"r":8000,"u":2000}},"processi":{"1-2":{"r":200,"u":0},"2-3":{"r":500,"u":1000},"3-4":{"r":900,"u":2500},"4-5":{"r":3500,"u":5000}},"ricavi":{"1-2":{"r":100,"u":0},"2-3":{"r":220,"u":400},"3-4":{"r":400,"u":1200},"4-5":{"r":800,"u":2500}},"marketing":{"1-2":{"r":300,"u":0},"2-3":{"r":850,"u":500},"3-4":{"r":1900,"u":1600},"4-5":{"r":3500,"u":3200}},"sitoweb":{"1-2":{"r":80,"u":1500},"2-3":{"r":280,"u":3200},"3-4":{"r":550,"u":5800},"4-5":{"r":950,"u":9500}},"ecommerce":{"1-2":{"r":0,"u":0},"2-3":{"r":50,"u":200},"3-4":{"r":400,"u":5000},"4-5":{"r":1500,"u":15000}}},"alimentare":{"vendite":{"1-2":{"r":300,"u":0},"2-3":{"r":2000,"u":600},"3-4":{"r":3800,"u":1200},"4-5":{"r":7500,"u":2500}},"pipeline":{"1-2":{"r":30,"u":0},"2-3":{"r":100,"u":800},"3-4":{"r":420,"u":2800},"4-5":{"r":850,"u":5500}},"team":{"1-2":{"r":200,"u":0},"2-3":{"r":3000,"u":600},"3-4":{"r":4500,"u":1200},"4-5":{"r":8500,"u":2500}},"processi":{"1-2":{"r":200,"u":0},"2-3":{"r":500,"u":1200},"3-4":{"r":900,"u":2800},"4-5":{"r":3800,"u":5500}},"ricavi":{"1-2":{"r":120,"u":0},"2-3":{"r":250,"u":450},"3-4":{"r":450,"u":1300},"4-5":{"r":900,"u":2800}},"marketing":{"1-2":{"r":400,"u":0},"2-3":{"r":1100,"u":700},"3-4":{"r":2400,"u":2200},"4-5":{"r":4500,"u":4500}},"sitoweb":{"1-2":{"r":100,"u":2000},"2-3":{"r":350,"u":4000},"3-4":{"r":700,"u":7000},"4-5":{"r":1200,"u":12000}},"ecommerce":{"1-2":{"r":0,"u":0},"2-3":{"r":550,"u":7000},"3-4":{"r":1500,"u":14000},"4-5":{"r":3500,"u":25000}}},"tech":{"vendite":{"1-2":{"r":0,"u":0},"2-3":{"r":2200,"u":600},"3-4":{"r":5000,"u":1200},"4-5":{"r":10000,"u":2500}},"pipeline":{"1-2":{"r":50,"u":0},"2-3":{"r":180,"u":1500},"3-4":{"r":700,"u":5000},"4-5":{"r":1400,"u":10000}},"team":{"1-2":{"r":400,"u":0},"2-3":{"r":4200,"u":1000},"3-4":{"r":7000,"u":2000},"4-5":{"r":13000,"u":4000}},"processi":{"1-2":{"r":300,"u":0},"2-3":{"r":700,"u":2000},"3-4":{"r":1400,"u":5000},"4-5":{"r":5500,"u":9000}},"ricavi":{"1-2":{"r":100,"u":0},"2-3":{"r":300,"u":500},"3-4":{"r":600,"u":2000},"4-5":{"r":1200,"u":4000}},"marketing":{"1-2":{"r":400,"u":0},"2-3":{"r":1200,"u":800},"3-4":{"r":2800,"u":3000},"4-5":{"r":6000,"u":6000}},"sitoweb":{"1-2":{"r":150,"u":2500},"2-3":{"r":500,"u":5000},"3-4":{"r":1000,"u":9000},"4-5":{"r":2000,"u":15000}},"ecommerce":{"1-2":{"r":0,"u":0},"2-3":{"r":700,"u":8000},"3-4":{"r":2000,"u":16000},"4-5":{"r":5000,"u":28000}}}};
var COSTI_BY_SETTORE = {};

var IMPATTO_BY_SETTORE = 
{"manifatturiero_meccanica":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Primo supporto alla vendita riduce le opportunità perse per mancanza di follow-up. Impatto diretto su conversione preventivi."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"Struttura commerciale formalizzata con agenti o rete aumenta la copertura territoriale del 60-80%."},"3-4":{"pct_6m":[6,10],"pct_12m":[13,20],"pct_24m":[20,32],"note":"Multi-canale con KPI misurabili ottimizza il mix e riduce la dipendenza da pochi clienti."},"4-5":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[12,18],"note":"Struttura matura scala senza il titolare: crescita più stabile e sostenibile nel lungo periodo."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Visibilità minima sulle trattative aperte riduce le perdite per dimenticanza del 15-25%."},"2-3":{"pct_6m":[3,6],"pct_12m":[6,11],"pct_24m":[9,15],"note":"CRM attivo migliora il tasso di chiusura del 15-25% nei contesti manifatturieri B2B."},"3-4":{"pct_6m":[4,7],"pct_12m":[8,13],"pct_24m":[11,17],"note":"Forecast affidabile permette di allocare risorse sulle trattative ad alto potenziale."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Pipeline ottimizzata con win-rate per stage riduce il tempo ciclo del 20-30%."}},"team":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Primo trasferimento di know-how riduce il rischio di perdita clienti per assenza del titolare."},"2-3":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Team con autonomia operativa permette di gestire più trattative in parallelo."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[12,18],"note":"Il titolare libero dall'operativo si concentra su clienti strategici e sviluppo business."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[8,13],"note":"Struttura scalabile: crescita possibile senza colli di bottiglia manageriali."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Template offerta standardizzato riduce i tempi di risposta e migliora la qualità percepita."},"2-3":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,12],"note":"Script discovery e checklist riducono il ciclo vendita del 15-20% in meccanica B2B."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,14],"note":"Playbook obiezioni aumenta il tasso di conversione nelle fasi finali della trattativa."},"4-5":{"pct_6m":[2,3],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Processo replicabile permette di scalare il team commerciale senza perdita di qualità."}},"ricavi":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Primi accordi ricorrenti riducono la volatilità mensile e aumentano la base ricavi difendibile."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Forecast trimestrale permette di pianificare la produzione e ridurre i costi di sotto/sovra-capacità."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[10,17],"note":"30% ricorrente riduce il churn e stabilizza il fatturato in periodi di mercato debole."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,11],"note":"Ricorrenza > 50% con forecast annuale affidabile permette investimenti a lungo termine."}},"marketing":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"LinkedIn aziendale attivo genera 2-4 lead qualificati/mese in contesti meccanica B2B."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Case study pubblicati + outbound sistematico generano 5-10 opportunità/mese qualificate."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Campagna LinkedIn Ads verso buyer industriali porta 10-20 contatti qualificati/mese."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Sistema multi-canale con nurturing riduce il costo di acquisizione del 30-40%."}},"sitoweb":{"1-2":{"pct_6m":[0,1],"pct_12m":[1,3],"pct_24m":[2,5],"note":"Sito base con contatti genera 1-3 richieste/mese da ricerche dirette del nome azienda."},"2-3":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Sito aggiornato con case study aumenta la credibilità e riduce il ciclo di qualificazione."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"SEO su keyword lavorazioni genera 5-15 richieste organiche/mese da buyer qualificati."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Sito con form avanzato e blog tecnico porta 15-30 lead organici/mese ad alto intento."}},"ecommerce":{"1-2":{"pct_6m":[0,1],"pct_12m":[1,2],"pct_24m":[2,4],"note":"Profilo su portali B2B genera 1-3 richieste/mese da buyer che cercano fornitori attivamente."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Preventivo online riduce la barriera di contatto e aumenta il volume di richieste entranti."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Portale clienti con stato commesse riduce il churn da insoddisfazione operativa."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Integrazione digitale con clienti principali aumenta la stickiness e riduce il rischio perdita."}}},"manifatturiero_automotive":{"vendite":{"1-2":{"pct_6m":[2,5],"pct_12m":[6,11],"pct_24m":[10,18],"note":"Presenza a fiere automotive genera 3-8 contatti qualificati/evento con OEM e tier-1."},"2-3":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"KAM dedicato aumenta la penetrazione nei conti chiave del 20-35% in 12 mesi."},"3-4":{"pct_6m":[6,11],"pct_12m":[14,22],"pct_24m":[22,35],"note":"Team vendite strutturato per OEM/tier-1/tier-2 ottimizza il mix e aumenta il valore medio commessa."},"4-5":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,17],"note":"Gestione autonoma RFQ e gare permette di aumentare il numero di offerte presentate del 40%."}},"pipeline":{"1-2":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[7,12],"note":"Registro RFQ strutturato aumenta il hit rate sulle gare del 10-15%."},"2-3":{"pct_6m":[4,7],"pct_12m":[8,14],"pct_24m":[12,20],"note":"CRM con gestione RFQ migliora il win rate del 15-25% su gare automotive."},"3-4":{"pct_6m":[4,8],"pct_12m":[9,15],"pct_24m":[13,20],"note":"Forecast trimestrale su RFQ permette di allocare capacità produttiva in anticipo."},"4-5":{"pct_6m":[2,5],"pct_12m":[5,9],"pct_24m":[8,13],"note":"Pipeline ottimizzata con hit rate per tipo gara riduce il costo di offerta del 20%."}},"team":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Documentazione clienti OEM riduce il rischio di perdita relazioni per turn-over interno."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[12,20],"note":"Team autonomo su PPAP e qualifica consente di gestire 2-3 qualifiche in parallelo."},"3-4":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"PM dedicati ai clienti OEM aumentano la soddisfazione e riducono il churn del 30%."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,13],"note":"Struttura autonoma scalabile consente l'ingresso in nuovi OEM senza blocchi operativi."}},"processi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Template RFQ strutturato aumenta la qualità dell'offerta e riduce i tempi del 30%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,18],"note":"Processo qualifica documentato riduce il time-to-SOP del 20-30%."},"3-4":{"pct_6m":[4,7],"pct_12m":[8,14],"pct_24m":[12,19],"note":"Playbook 8D e non conformità riduce i costi di qualità del 15-25%."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,12],"note":"Sistema IATF integrato con processi documentati riduce i costi di audit del 40%."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Rinnovi LTA anticipati bloccano il fatturato ricorrente e riducono la volatilità."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"40% LTA pluriennali con OEM stabili garantisce prevedibilità e riduce il costo del debito."},"3-4":{"pct_6m":[4,8],"pct_12m":[9,16],"pct_24m":[14,23],"note":"Diversificazione portafoglio: nessun cliente > 30% riduce il rischio di concentrazione."},"4-5":{"pct_6m":[2,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Ricorrenza > 60% con LTA pluriennali permette pianificazione investimenti a lungo termine."}},"marketing":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Dossier tecnico-commerciale completo accelera la qualifica presso nuovi OEM del 20%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Presenza fiere automotive genera 5-12 contatti qualificati/evento con potenziale LTA."},"3-4":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"Outreach diretto buyer OEM genera 3-8 nuove opportunità di qualifica/trimestre."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Presenza strutturata fiere + LinkedIn + whitepaper riduce il costo di acquisizione OEM del 35%."}},"sitoweb":{"1-2":{"pct_6m":[0,1],"pct_12m":[1,3],"pct_24m":[2,5],"note":"Pagina certificazioni aumenta la credibilità nella fase di pre-qualifica OEM."},"2-3":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Schede lavorazione con referenze OEM anonimizzate riducono il ciclo di qualifica del 15%."},"3-4":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"SEO automotive supply chain genera 3-8 richieste organiche/mese da buyer qualificati."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Area riservata clienti con documenti qualità riduce il costo di gestione post-vendita del 25%."}},"ecommerce":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Iscrizione portali vendor OEM aumenta la visibilità sulle gare del 30%."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Piattaforma B2B automotive genera 5-12 RFQ digitali/mese aggiuntivi."},"3-4":{"pct_6m":[2,5],"pct_12m":[5,9],"pct_24m":[7,13],"note":"Integrazione portale fornitore OEM riduce il costo di gestione ordini del 20%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"EDI integrato riduce il lead time di consegna del 15% e aumenta la soddisfazione OEM."}}},"manifatturiero_packaging":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Incontri tecnici con buyer food/cosmetico generano 3-6 campionature/mese qualificate."},"2-3":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Agente di rappresentanza aumenta la copertura territoriale del 60-80%."},"3-4":{"pct_6m":[5,9],"pct_12m":[12,19],"pct_24m":[18,29],"note":"Rete agenti per settore merceologico ottimizza il mix clienti e aumenta il valore medio ordine."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,14],"note":"Responsabile commerciale autonomo scala la struttura senza aumentare i costi fissi del titolare."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Tracciamento campionature riduce le perdite per mancato follow-up del 20-30%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,18],"note":"CRM campagne stagionali migliora il conversion rate campione→ordine del 15-25%."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[10,16],"note":"Forecast stagionale permette di ottimizzare la produzione e ridurre i costi del 10-15%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Pipeline integrata con operations riduce il time-to-market di nuovi prodotti del 20%."}},"team":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Primo trasferimento competenze commerciali riduce la dipendenza dal titolare nelle fiere."},"2-3":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Commerciale interno gestisce autonomamente il campionario standard liberando il titolare."},"3-4":{"pct_6m":[4,7],"pct_12m":[8,14],"pct_24m":[12,20],"note":"Team autonomo permette di gestire 2 stagioni in parallelo (SS + AW) senza saturazione."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,12],"note":"Struttura scalabile consente di aggiungere linee di prodotto senza riorganizzazione."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Scheda tecnica standard riduce i tempi di preventivazione del 40% e gli errori di specifiche."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,11],"note":"Processo approvazione campioni documentato riduce il time-to-order del 25-35%."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,13],"note":"Script discovery buyer riduce le campionature non qualificate del 30-40%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,6],"pct_24m":[5,8],"note":"Playbook stagionale completo riduce il ciclo vendita del 20% e aumenta il tasso di riordino."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Contratti annuali con i top 5 clienti garantiscono una base ricavi prevedibile del 20-30%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,18],"note":"Forecast stagionale permette di pianificare acquisti materie prime e ridurre i costi del 8-12%."},"3-4":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"40% fatturato su contratti annuali riduce la volatilità stagionale e il rischio di invenduto."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,11],"note":"Revenue ricorrente > 55% con pianificazione integrata riduce il costo del capitale circolante."}},"marketing":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Portfolio fotografico professionale aumenta la conversion rate nelle fiere del 20-30%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Stand a Ipack-Ima o Luxe Pack genera 15-30 contatti buyer qualificati per evento."},"3-4":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"LinkedIn con contenuti tecnici sul packaging sostenibile genera 8-15 lead/mese qualificati."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Presenza strutturata riduce il costo di acquisizione buyer del 35% rispetto alle sole fiere."}},"sitoweb":{"1-2":{"pct_6m":[0,1],"pct_12m":[1,3],"pct_24m":[2,5],"note":"Galleria prodotti online genera 2-5 richieste/mese da buyer che cercano fornitori online."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Schede prodotto con certificazioni food-contact riducono la fase di qualifica del 20%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"SEO su keyword packaging per settore genera 10-20 richieste organiche/mese qualificate."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Configuratore packaging online riduce il costo di preventivazione del 50% per ordini standard."}},"ecommerce":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Profilo su Alibaba/Made in Italy genera 3-8 richieste/mese da buyer esteri qualificati."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Shop B2B per ordini campione riduce il tempo di gestione richieste del 40%."},"3-4":{"pct_6m":[3,6],"pct_12m":[6,11],"pct_24m":[9,16],"note":"Portale clienti con riordino riduce il churn da insoddisfazione operativa del 25-35%."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"E-commerce B2B con configuratore aumenta il valore medio ordine del 15-20%."}}},"manifatturiero_cterzi":{"vendite":{"1-2":{"pct_6m":[1,3],"pct_12m":[4,7],"pct_24m":[7,12],"note":"Contatti diretti con 10 aziende locali generano 2-4 richieste preventivo/mese qualificate."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[12,20],"note":"Tecnico-venditore formato gestisce le offerte standard liberando il titolare per trattative complesse."},"3-4":{"pct_6m":[5,9],"pct_12m":[12,19],"pct_24m":[18,29],"note":"Accordi di subfornitura con aziende complementari aumentano il fatturato del 15-25%."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,14],"note":"Commerciale dedicato scala il portafoglio clienti senza aumentare il carico del titolare."}},"pipeline":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Registro preventivi riduce la perdita di opportunità per mancato follow-up del 15-25%."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"CRM con tracciamento tempi medi per fase identifica i colli di bottiglia e aumenta il win-rate."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,14],"note":"Forecast mensile permette di ottimizzare il carico macchine e ridurre i fermi produttivi."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Pipeline integrata con produzione riduce il lead time di risposta del 20-30%."}},"team":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Documentazione clienti e lavorazioni riduce il rischio di perdita know-how in caso di assenza."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[7,12],"note":"Capo officina autonomo sui preventivi standard libera il titolare per sviluppo nuovi clienti."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,18],"note":"Team con commerciale e tecnico autonomi permette di gestire 3-4 clienti strategici in più."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,12],"note":"Struttura autonoma consente di accettare più commesse senza saturare il titolare."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Modulo raccolta dati tecnici riduce gli errori di preventivazione del 30-40%."},"2-3":{"pct_6m":[2,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Processo documentato riduce il tempo di risposta al preventivo del 25-35%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Script discovery riduce le richieste non qualificate del 25% e migliora il mix commesse."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Playbook completo riduce il ciclo vendita del 20% e permette di gestire più commesse in parallelo."}},"ricavi":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Accordi di subfornitura mensili con i top 3 clienti garantiscono una base ricavi prevedibile."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Forecast trimestrale permette di ottimizzare il carico e ridurre i periodi di sotto-utilizzo."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,18],"note":"30% subfornitura ricorrente riduce la volatilità mensile e permette la pianificazione del personale."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,11],"note":"Revenue ricorrente > 50% permette di sostenere investimenti in macchinari con maggiore certezza."}},"marketing":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Registrazione su Kompass/IndustryStock genera 2-4 richieste/mese da buyer che cercano terzisti."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"LinkedIn con foto officina e casi lavorazione genera 3-6 richieste/mese qualificate."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[7,13],"note":"Presenza a Mecspe genera 8-15 contatti qualificati per evento con potenziale subfornitura."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Outreach sistematico verso responsabili acquisti genera 5-10 nuove opportunità/mese qualificate."}},"sitoweb":{"1-2":{"pct_6m":[0,1],"pct_12m":[1,2],"pct_24m":[2,4],"note":"Sito con capacità produttive genera 1-3 richieste/mese da buyer che cercano terzisti online."},"2-3":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Schede lavorazione con tolleranze e settori riducono le richieste non qualificate del 30%."},"3-4":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"SEO locale su lavorazioni genera 5-12 richieste organiche/mese da buyer qualificati."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Preventivo online con upload disegno tecnico riduce il costo di gestione richieste del 40%."}},"ecommerce":{"1-2":{"pct_6m":[0,1],"pct_12m":[1,3],"pct_24m":[2,5],"note":"Profili su piattaforme B2B manifatturiero generano 2-5 richieste/mese da buyer internazionali."},"2-3":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Richiesta preventivo online con upload disegno aumenta il volume di richieste del 30-50%."},"3-4":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Portale clienti con stato avanzamento riduce le chiamate di aggiornamento del 60%."},"4-5":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Integrazione digitale con clienti principali aumenta la stickiness e riduce il rischio di perdita."}}},"manifatturiero_elettromeccanica":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Assessment impianti gratuiti generano 3-6 opportunità qualificate/trimestre."},"2-3":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Tecnico-venditore formato aumenta il numero di offerte presentate del 50-70%."},"3-4":{"pct_6m":[5,9],"pct_12m":[12,20],"pct_24m":[19,30],"note":"Rete agenti specializzati aumenta la copertura settoriale e il volume di gare presidiate."},"4-5":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,17],"note":"Team con PM dedicati ai clienti chiave riduce il churn del 30% e aumenta l'upsell."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Tracciamento offerte tecniche riduce le perdite per mancato follow-up del 20-25%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"CRM con gestione offerte complesse migliora il win-rate del 15-25% su commesse > 50k€."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[10,17],"note":"Forecast trimestrale permette di allocare il team tecnico in anticipo e ridurre i fermi."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,11],"note":"Pipeline con forecast mensile < 20% scarto permette pianificazione approvvigionamenti."}},"team":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Documentazione impianti installati riduce il rischio di perdita clienti per turn-over."},"2-3":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Tecnico senior autonomo su offerte standard libera il titolare per commesse strategiche."},"3-4":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"PM dedicati ai clienti chiave aumentano la soddisfazione e il tasso di rinnovo contratti."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,13],"note":"Struttura scalabile con PM autonomi permette di gestire 3-4 commesse grandi in parallelo."}},"processi":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Template offerta con ROI stimato aumenta il tasso di conversione del 15-20% sui clienti industriali."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Processo di discovery tecnica documentato riduce il time-to-offer del 30-40%."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,14],"note":"Playbook obiezioni prezzo/ROI aumenta il tasso di chiusura del 20-25% su trattative avanzate."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Processo end-to-end documentato riduce il costo di commissioning del 15-20%."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Contratti manutenzione annuale su impianti installati garantiscono 20-30k€/anno ricorrenti per impianto."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"40% fatturato su manutenzione ricorrente riduce la volatilità legata ai cicli di investimento."},"3-4":{"pct_6m":[4,8],"pct_12m":[9,16],"pct_24m":[14,23],"note":"Forecast annuale affidabile su manutenzione + pipeline permette la pianificazione del team."},"4-5":{"pct_6m":[2,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Revenue ricorrente > 55% con contratti pluriennali permette investimenti in attrezzature specializzate."}},"marketing":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Case study LinkedIn con dati ROI impianti generano 3-6 richieste qualificate/mese."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Webinar tecnici su efficienza energetica generano 8-15 lead qualificati per webinar."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Partnership con vendor aumenta la visibilità del 50% e genera referral qualificati."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Marketing strutturato riduce il costo di acquisizione cliente del 35-40%."}},"sitoweb":{"1-2":{"pct_6m":[0,1],"pct_12m":[1,3],"pct_24m":[2,5],"note":"Pagina soluzioni per settore genera 2-5 richieste/mese da energy manager e responsabili manutenzione."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Case study per settore con ROI riducono il ciclo di qualificazione del 20-25%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,11],"note":"SEO su quadri elettrici e revamping genera 8-15 richieste organiche/mese qualificate."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,6],"pct_24m":[5,8],"note":"Calcolatore ROI online aumenta la qualità dei lead inbound e riduce il ciclo di vendita del 15%."}},"ecommerce":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Profilo su portali gare d'appalto aumenta la visibilità sulle gare pubbliche del 30-40%."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Shop ricambi standard riduce il costo di gestione richieste ricambi del 40%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Portale clienti con scadenze manutenzione riduce il churn del 20-30% per dimenticanza."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Sistema IoT per monitoraggio remoto aumenta il valore percepito e giustifica contratti premium."}}},"manifatturiero_tessile":{"vendite":{"1-2":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[12,20],"note":"Presenza a Première Vision genera 10-20 contatti buyer qualificati per edizione."},"2-3":{"pct_6m":[6,11],"pct_12m":[14,23],"pct_24m":[22,35],"note":"Agente di rappresentanza a Milano/Firenze aumenta la presenza nei brand premium del 60-80%."},"3-4":{"pct_6m":[7,13],"pct_12m":[16,26],"pct_24m":[25,40],"note":"Rete agenti nazionale con showroom aumenta il fatturato del 25-40% in 12 mesi."},"4-5":{"pct_6m":[4,7],"pct_12m":[8,14],"pct_24m":[12,19],"note":"Export manager con agenti internazionali apre mercati esteri con potenziale 30-50% fatturato aggiuntivo."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Tracciamento campionari riduce le perdite per mancato follow-up buyer del 25-35%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"CRM stagionale SS/AW migliora il conversion rate campionario→ordine del 20-30%."},"3-4":{"pct_6m":[4,7],"pct_12m":[8,14],"pct_24m":[12,19],"note":"Forecast stagionale per agente permette di ottimizzare la produzione e ridurre i costi del 12-18%."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Pipeline con prevendita vendemmia garantisce ordini certi prima della produzione."}},"team":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Agente interno formato gestisce autonomamente il campionario per una stagione."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"Showroom manager autonomo permette di gestire entrambe le stagioni in parallelo."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Team con brand manager e agenti per area scala senza aumentare il carico del titolare."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Struttura internazionale autonoma permette di aggiungere nuovi mercati senza riorganizzazione."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Schede tecniche standardizzate riducono gli errori di specifiche e i resi del 20-30%."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,11],"note":"Processo campionario documentato riduce il time-to-showroom del 25-35%."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,13],"note":"Playbook buyer riduce i campionari non convertiti del 30-40%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,6],"pct_24m":[5,8],"note":"Processo stagionale completo riduce il ciclo vendita del 20% e aumenta il tasso di riordino."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Ordini programmati SS+AW dai top 5 brand garantiscono 30-40% del fatturato prima della produzione."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Forecast stagionale affidabile permette di ottimizzare gli acquisti di filati e ridurre i costi del 10-15%."},"3-4":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"45% ordini programmati riduce il rischio di invenduto e permette prezzi più stabili."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"60% ordini programmati con contratti stagionali permette pianificazione di lungo periodo."}},"marketing":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Lookbook digitale professionale aumenta la conversion rate nelle fiere del 25-35%."},"2-3":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Stand a Première Vision Paris genera 20-40 contatti buyer internazionali qualificati per edizione."},"3-4":{"pct_6m":[6,11],"pct_12m":[13,22],"pct_24m":[20,33],"note":"Showroom permanente a Milano aumenta la presenza nei brand premium del 40-60%."},"4-5":{"pct_6m":[4,7],"pct_12m":[8,14],"pct_24m":[12,19],"note":"Presenza internazionale strutturata riduce il costo di acquisizione buyer del 40%."}},"sitoweb":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Catalogo digitale online genera 3-6 richieste/mese da buyer internazionali."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Schede articolo con certificazioni OEKO-TEX aumentano la credibilità nelle gare fashion."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Area riservata buyer con catalogo stagionale riduce il costo di gestione richieste del 40%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Showroom digitale con visualizzatore 3D riduce il numero di campioni fisici richiesti del 30%."}},"ecommerce":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Profilo su piattaforme B2B tessile genera 3-8 richieste/mese da buyer internazionali."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Shop B2B per ordini campione riduce il costo di gestione richieste del 40%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Portale buyer con ordini stagionali riduce il tempo di raccolta ordini del 50%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Configuratore colori online riduce i campioni fisici del 40% e accelera il processo di acquisto."}}},"servizi_it":{"vendite":{"1-2":{"pct_6m":[2,5],"pct_12m":[6,11],"pct_24m":[10,18],"note":"Assessment IT gratuiti generano 3-6 opportunità qualificate/trimestre con PMI locali."},"2-3":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Tecnico senior formato sulla vendita aumenta il numero di proposte presentate del 40-60%."},"3-4":{"pct_6m":[5,9],"pct_12m":[12,20],"pct_24m":[19,30],"note":"Account manager per segmento aumenta la penetrazione nei conti target del 25-40%."},"4-5":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,17],"note":"Team vendite autonomo con specializzazione per segmento scala senza saturare la delivery."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"CRM con tracciamento opportunità riduce la perdita di deal per mancato follow-up del 25-35%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Pipeline con stage definiti aumenta il win-rate del 20-30% su deal IT complessi."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Forecast trimestrale permette di pianificare il team tecnico e ridurre i sotto-utilizzi."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,11],"note":"Pipeline con forecast MRR affidabile permette investimenti in certificazioni e strumenti."}},"team":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Documentazione clienti e sistemi riduce il rischio di perdita know-how in caso di turn-over."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"System engineer autonomo su rinnovi libera l'account manager per lo sviluppo nuovi clienti."},"3-4":{"pct_6m":[4,8],"pct_12m":[9,16],"pct_24m":[14,23],"note":"Account manager autonomo gestisce il portafoglio completo: +30-50% capacità di gestione clienti."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Struttura scalabile per segmento permette di aggiungere verticals senza riorganizzazione."}},"processi":{"1-2":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Template assessment IT standardizzato riduce il tempo di qualificazione del 40-50%."},"2-3":{"pct_6m":[3,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Script discovery documenta il bisogno e aumenta il tasso di proposta accettata del 20-25%."},"3-4":{"pct_6m":[3,6],"pct_12m":[6,11],"pct_24m":[9,16],"note":"Playbook obiezioni managed services aumenta il tasso di conversione del 20-30%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Sales playbook permette di replicare il processo su nuovi account manager con qualità costante."}},"ricavi":{"1-2":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[12,20],"note":"Primi 3 contratti managed services garantiscono 3-6k€/mese di MRR prevedibile."},"2-3":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"50% MRR riduce la volatilità da progetti one-shot e permette la pianificazione del team."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,26],"note":"Forecast annuale MRR + pipeline progetti permette investimenti in certificazioni e strumenti."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"MRR > 60% con contratti pluriennali stabilizza il business e riduce il churn del 40%."}},"marketing":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Contenuti LinkedIn su problemi IT PMI generano 3-6 conversazioni qualificate/mese."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Webinar tecnici mensili generano 8-15 lead qualificati per webinar con costo di acquisizione basso."},"3-4":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"LinkedIn Ads con assessment gratuito genera 5-12 lead qualificati/mese con CAC 2-3x inferiore."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Funnel digitale completo genera 10-20 opportunità qualificate/mese in modo automatizzato."}},"sitoweb":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Sito con lista servizi managed genera 2-5 richieste/mese da IT manager che cercano fornitori."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"3 case study per settore aumentano la credibilità e riducono il ciclo di vendita del 20-25%."},"3-4":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"SEO su managed services + città genera 8-15 richieste organiche/mese qualificate."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Assessment IT online genera 5-10 lead qualificati/settimana in modo automatizzato."}},"ecommerce":{"1-2":{"pct_6m":[0,1],"pct_12m":[1,3],"pct_24m":[2,5],"note":"Profilo su marketplace IT aumenta la visibilità verso rivenditori e partner del 30%."},"2-3":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Shop licenze e hardware riduce il costo di gestione ordini standard del 40%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Portale clienti con ticketing riduce il costo di supporto del 30% e aumenta la soddisfazione."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Self-service con provisioning automatico aumenta la capacità di gestione clienti del 40%."}}},"servizi_formazione":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Analisi fabbisogni gratuita genera 2-4 proposte qualificate/trimestre con HR manager."},"2-3":{"pct_6m":[3,6],"pct_12m":[8,14],"pct_24m":[13,22],"note":"Trainer formato sulla vendita consulenziale aumenta il numero di proposte presentate del 40%."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Account manager corporate gestisce contratti formativi annuali con 5-10 aziende target."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Team BD + coordinatori autonomi permette di gestire gare FSE e contratti in parallelo."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"CRM con tracciamento trattative riduce la perdita di opportunità per mancato follow-up del 25%."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Pipeline con gestione finanziamenti aumenta il tasso di conversione delle proposte del 20-30%."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Forecast trimestrale permette di pianificare trainer e aule riducendo i costi di sotto-utilizzo."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Pipeline FSE + aziendale + open course permette di ottimizzare il mix e la marginalità."}},"team":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Trainer in presentazione raddoppia la capacità di sviluppo business nelle aziende target."},"2-3":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Trainer senior autonomo sulle trattative libera il titolare per sviluppo nuovi clienti corporate."},"3-4":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"Coordinatori per area tematica permettono di gestire 2-3 gare FSE in parallelo."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Struttura autonoma scala senza il titolare: crescita 20-35% senza saturazione."}},"processi":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Template proposta formativa standardizzata riduce il tempo di preparazione del 50%."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Script analisi fabbisogni documenta il bisogno e aumenta il tasso di proposta accettata del 25%."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Playbook finanziamenti aumenta il tasso di conversione delle proposte con fondi del 30%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,6],"pct_24m":[5,8],"note":"Processo end-to-end permette di gestire la rendicontazione FSE senza errori e ritardi."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Piano formativo annuale all-inclusive garantisce 5-15k€/anno per azienda di ricavi prevedibili."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Forecast trimestrale permette di pianificare trainer e ottimizzare i costi variabili del 10-15%."},"3-4":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"40% contratti annuali aziendali riduce la volatilità legata alle scadenze FSE."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Revenue ricorrente > 55% con contratti pluriennali permette investimenti in nuove aree tematiche."}},"marketing":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Contenuti LinkedIn su temi HR generano 3-5 conversazioni qualificate/mese con HR manager."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Webinar gratuiti mensili generano 8-15 lead qualificati per webinar con HR e titolari PMI."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Newsletter su fondi formativi genera 5-10 richieste/mese qualificate da HR manager."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Thought leadership HR genera 8-15 lead/mese qualificati con costo di acquisizione basso."}},"sitoweb":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Catalogo corsi online genera 2-4 richieste/mese da HR che cercano formazione aziendale."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Guida pratica ai fondi formativi genera 5-10 richieste/mese da aziende che cercano risparmio."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"SEO su formazione finanziata per settore genera 8-15 richieste organiche/mese qualificate."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Configuratore percorso formativo genera 5-10 lead qualificati/settimana in modo automatizzato."}},"ecommerce":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Corsi su Udemy/Teachable generano 1-3k€/mese di revenue passiva e visibilità sul mercato."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Piattaforma e-learning aziendale riduce il costo di erogazione del 30-40% per corsi ripetuti."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"LMS clienti con iscrizioni autonome riduce il costo amministrativo del 40%."},"4-5":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[7,12],"note":"Ecosistema digitale completo aumenta la capacità di gestire studenti senza aumentare il personale."}}},"edilizia_residenziale":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Referral attivi generano 1-3 cantieri aggiuntivi/trimestre con costo di acquisizione quasi zero."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"Collaborazione con geometri/architetti genera 2-4 preventivi qualificati/mese aggiuntivi."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Commerciale dedicato gestisce sistematicamente i contatti in ingresso aumentando il tasso di firma del 25%."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Team commerciale strutturato per segmento scala senza saturare il titolare."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Tracciamento preventivi riduce la perdita di opportunità per mancato follow-up del 20-30%."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"CRM con tempi medi per fase identifica i colli di bottiglia e aumenta il tasso di firma del 15-20%."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Forecast trimestrale permette di pianificare le squadre e ridurre i periodi di sotto-utilizzo."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Pipeline integrata con pianificazione cantieri riduce i tempi morti tra un cantiere e l'altro del 20%."}},"team":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Capo cantiere in sopralluoghi commerciali aumenta la capacità di gestire più trattative in parallelo."},"2-3":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Geometra autonomo sui preventivi standard libera il titolare per trattative complesse e sviluppo."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"PM cantiere autonomo permette di gestire 2-3 cantieri in parallelo senza il titolare su tutti."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Struttura scalabile con PM e commerciale permette di aumentare il volume cantieri del 30-40%."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Computo metrico standard riduce il tempo di preventivazione del 40% e gli errori di stima."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,11],"note":"Checklist sopralluogo riduce i sopralluoghi di ritorno del 30% e migliora la qualità del preventivo."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Playbook obiezioni prezzo aumenta il tasso di firma del 15-25% sulle trattative in fase avanzata."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Processo end-to-end documentato permette di replicare la qualità su nuovi PM senza perdita."}},"ricavi":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Accordo manutenzione post-cantiere genera 500-2000€/anno per cliente di ricavi ricorrenti."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Forecast trimestrale permette di pianificare le squadre e ridurre il costo del personale inattivo."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,13],"note":"30% manutenzione ricorrente riduce la stagionalità e garantisce una base ricavi prevedibile."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Accordi pluriennali con immobiliaristi garantiscono cantieri programmati con 6-12 mesi anticipo."}},"marketing":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Instagram prima/dopo genera 3-6 richieste/mese qualificate da privati in zona."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Google Business ottimizzato genera 5-10 richieste/mese qualificate da ricerche locali."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Google Ads locale genera 10-20 richieste/mese qualificate con costo per lead di 30-60€."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Marketing integrato riduce il costo di acquisizione cliente del 35-45% rispetto alle sole referenze."}},"sitoweb":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Galleria lavori online genera 2-4 richieste/mese da privati in ricerca di imprese edili."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Pagina incentivi fiscali genera 3-6 richieste/mese qualificate da clienti interessati ai bonus."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"SEO locale su ristrutturazione genera 8-15 richieste organiche/mese qualificate."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Configuratore preventivo online genera 5-10 lead qualificati/settimana in modo automatizzato."}},"ecommerce":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Profilo su Habitissimo/Instapro genera 3-8 preventivi richiesti/mese da clienti qualificati."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Form preventivo online con foto aumenta il volume di richieste del 30-50%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Portale clienti con SAL riduce le chiamate di aggiornamento del 60% e aumenta la soddisfazione."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"App cantiere con foto giornaliere aumenta la fiducia del cliente e riduce i contenziosi del 30%."}}},"edilizia_impianti":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Collaborazione con imprese edili genera 2-4 preventivi impianti qualificati/mese aggiuntivi."},"2-3":{"pct_6m":[3,6],"pct_12m":[8,14],"pct_24m":[13,22],"note":"Tecnico-venditore formato aumenta il numero di offerte presentate del 40-60%."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Account manager per segmento (terziario, residenziale) aumenta la penetrazione del 25-40%."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Team commerciale strutturato per tipo impianto scala senza saturare il titolare."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Registro preventivi riduce la perdita di opportunità per mancato follow-up del 20-30%."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"CRM con tempi medi aumenta il tasso di firma del 15-20% su offerte impianti."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Forecast trimestrale permette di pianificare le squadre e ridurre i periodi di sotto-utilizzo."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Pipeline integrata con risorse permette di gestire picchi stagionali senza perdere opportunità."}},"team":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Capo tecnico in sopralluogo commerciale aumenta la qualità dell'offerta e la credibilità."},"2-3":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Tecnico senior autonomo sui preventivi standard libera il titolare per trattative complesse."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"PM per tipo impianto gestisce cantieri e clienti in autonomia: +30-40% capacità."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Struttura con PM e commerciale scala il volume cantieri del 30-40% senza il titolare su tutto."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Template preventivo impianti riduce il tempo di preventivazione del 40% e gli errori."},"2-3":{"pct_6m":[2,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Checklist sopralluogo tecnico riduce i ritorni del 30% e migliora la qualità del preventivo."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,11],"note":"Playbook obiezioni efficienza energetica aumenta il tasso di firma del 15-25%."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Processo end-to-end documentato riduce il costo di commissioning del 15-20%."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Contratti manutenzione annuale impianti garantiscono 500-3000€/anno per cliente di MRR."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"40% manutenzione ricorrente riduce la stagionalità e garantisce una base ricavi prevedibile."},"3-4":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"Forecast annuale manutenzione + pipeline nuovi impianti permette la pianificazione del team."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Revenue ricorrente > 55% permette investimenti in attrezzature e formazione tecnica."}},"marketing":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Google Business ottimizzato con certificazioni genera 3-6 richieste/mese qualificate."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Google Ads locale su tipo impianto genera 8-15 richieste/mese con costo per lead di 25-50€."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Partnership con produttori genera referral qualificati e co-marketing a costo zero."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Marketing strutturato riduce il costo di acquisizione del 35-40% rispetto alle sole referenze."}},"sitoweb":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Sito con servizi e certificazioni genera 2-4 richieste/mese da ricerche locali."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Calcolatore risparmio energetico genera 3-6 richieste/mese qualificate da clienti orientati ai bonus."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"SEO su installazione impianti + città genera 8-15 richieste organiche/mese qualificate."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,6],"pct_24m":[5,8],"note":"Sito con configuratore preventivo e calcolatore incentivi genera 5-10 lead/settimana automatici."}},"ecommerce":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Profilo su Habitissimo/Instapro genera 3-8 richieste preventivo impianti/mese qualificate."},"2-3":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Shop ricambi/accessori riduce il costo di gestione richieste ricambi del 40%."},"3-4":{"pct_6m":[2,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Portale clienti con scadenze manutenzione riduce il churn del 20-30% per dimenticanza."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"App clienti con alert manutenzione aumenta il rinnovo contratti del 25-35%."}}},"edilizia_ristrutturazioni":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Referral attivi con piccolo incentivo generano 1-3 cantieri aggiuntivi/trimestre a costo quasi zero."},"2-3":{"pct_6m":[3,6],"pct_12m":[8,14],"pct_24m":[13,22],"note":"Collaborazione con interior designer genera 2-4 preventivi qualificati/mese aggiuntivi."},"3-4":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Commerciale dedicato ristrutturazioni chiavi in mano aumenta il tasso di firma del 20-30%."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Team commerciale con account B2B (alberghi, negozi) apre segmento con valore medio 3-5x superiore."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Excel preventivi riduce la perdita di opportunità per mancato follow-up del 20-25%."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,9],"pct_24m":[7,13],"note":"CRM con probabilità per valore aumenta il tasso di firma del 15-20% sulle trattative."},"3-4":{"pct_6m":[2,5],"pct_12m":[5,9],"pct_24m":[8,13],"note":"Forecast trimestrale permette di pianificare le squadre e ridurre i fermi tra cantieri del 20%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Pipeline con pianificazione subappaltatori riduce i ritardi e aumenta la soddisfazione del cliente."}},"team":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Geometra in sopralluogo aumenta la qualità del preventivo e riduce i ritorni del 30%."},"2-3":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,12],"note":"Geometra autonomo su sopralluogo e preventivo standard libera il titolare per clienti VIP."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,18],"note":"PM cantiere autonomo permette di gestire 2-3 cantieri in parallelo senza il titolare presente."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,12],"note":"Struttura con PM e commerciale scala il volume cantieri del 30-40%."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Template preventivo ristrutturazione riduce il tempo di preparazione del 40% e gli errori."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Checklist sopralluogo riduce i ritorni del 25% e migliora la qualità dell'offerta."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,11],"note":"Playbook obiezioni prezzo/materiali aumenta il tasso di firma del 15-20%."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Processo completo documentato permette di replicare la qualità su nuovi PM."}},"ricavi":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Piano piccola manutenzione post-cantiere genera 300-1500€/anno per cliente di ricavi ricorrenti."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Forecast trimestrale permette di pianificare le squadre e ridurre il costo del personale inattivo."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,13],"note":"Accordi con agenzie immobiliari garantiscono 3-6 cantieri programmati/trimestre."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Accordi B2B con alberghi e GDO garantiscono cantieri di valore medio 5-10x superiore al privato."}},"marketing":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Instagram prima/dopo genera 3-6 richieste/mese qualificate da privati in zona."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Google Business ottimizzato genera 5-10 richieste/mese qualificate da ricerche locali."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Google Ads su ristrutturazione per tipo genera 10-20 richieste/mese con CPL di 20-40€."},"4-5":{"pct_6m":[2,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Marketing integrato riduce il costo di acquisizione cliente del 35-40%."}},"sitoweb":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Galleria prima/dopo genera 2-4 richieste/mese da privati che cercano ristrutturatori."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Pagina incentivi fiscali genera 3-6 richieste/mese qualificate da clienti orientati ai bonus."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"SEO su ristrutturazione per tipo + città genera 8-15 richieste organiche/mese qualificate."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,6],"pct_24m":[5,8],"note":"Configuratore preventivo base genera 5-10 lead qualificati/settimana in modo automatizzato."}},"ecommerce":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Profilo su Habitissimo/Instapro genera 3-8 richieste preventivo ristrutturazione/mese."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,8],"note":"Form preventivo online con foto riduce il tempo di qualificazione del 50%."},"3-4":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Portale clienti con foto cantiere aumenta la fiducia e riduce le richieste di aggiornamento del 60%."},"4-5":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,5],"note":"App cantiere con approvazione varianti online riduce i contenziosi del 30%."}}},"edilizia_serramenti":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Tecnico-venditore formato gestisce i sopralluoghi standard aumentando la capacità del 50%."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"Tecnico-venditore autonomo sul ciclo completo libera il titolare per i clienti business."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Rete posatori come canale vendita aumenta la copertura territoriale del 60-80%."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Team vendite per area con showroom manager scala il volume ordini del 30-40%."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Excel preventivi riduce la perdita di opportunità per mancato follow-up del 20-25%."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"CRM con tempi medi per prodotto identifica i prodotti con conversione più alta e ottimizza il mix."},"3-4":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,13],"note":"Forecast mensile permette di pianificare gli ordini ai fornitori e ridurre i tempi di attesa del 20%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,6],"pct_24m":[5,8],"note":"Pipeline integrata con produzione/fornitura riduce il lead time di consegna del 15%."}},"team":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Tecnico formato su misure e presentazione catalogo aumenta la capacità di gestire più clienti."},"2-3":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Tecnico-venditore autonomo su tutto il ciclo libera il titolare per lo sviluppo business."},"3-4":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"Team showroom + tecnici area permette di gestire 2-3x più trattative in parallelo."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,12],"note":"Responsabile commerciale autonomo con team scala il volume senza il titolare su ogni trattativa."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Scheda tecnica per prodotto riduce le richieste di informazioni del 40% e gli errori di ordine."},"2-3":{"pct_6m":[2,3],"pct_12m":[3,6],"pct_24m":[5,8],"note":"Processo misura-offerta documentato riduce il tempo di risposta del 30-40%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,11],"note":"Playbook obiezioni prezzo vs efficienza energetica aumenta il tasso di firma del 15-25%."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Playbook completo con configuratore riduce il ciclo vendita del 20% e aumenta il valore medio ordine."}},"ricavi":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Contratto manutenzione annuale serramenti genera 150-500€/anno per cliente di ricavi ricorrenti."},"2-3":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Forecast trimestrale basato su stagionalità permette di ottimizzare gli ordini ai fornitori."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Accordi con imprese edili garantiscono 3-6 forniture programmate/trimestre a valore certo."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Revenue ricorrente > 40% con manutenzione e accordi B2B riduce la volatilità stagionale."}},"marketing":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Showroom con bonus aggiornati genera 3-6 richieste/mese qualificate da clienti orientati agli incentivi."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Google Business ottimizzato genera 5-10 richieste/mese da ricerche locali su serramenti."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Google Ads su serramenti + marca + città genera 10-20 richieste/mese con CPL di 20-40€."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Marketing integrato riduce il costo di acquisizione del 35-40%."}},"sitoweb":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Catalogo prodotti online genera 2-4 richieste/mese da acquirenti che cercano preventivi."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Guida Ecobonus serramenti genera 3-6 richieste/mese qualificate da clienti con bonus attivi."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"SEO su serramenti + città + marca genera 8-15 richieste organiche/mese qualificate."},"4-5":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[7,12],"note":"Configuratore serramento online con preventivo istantaneo genera 10-20 lead/mese automatici."}},"ecommerce":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Profilo su Habitissimo/Instapro genera 3-8 richieste preventivo serramenti/mese."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Preventivatore base online genera 5-10 richieste/mese qualificate senza intervento diretto."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[7,12],"note":"Portale rivenditori con catalogo e ordini genera ricavi aggiuntivi dal canale B2B."},"4-5":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[7,12],"note":"Configuratore avanzato con ordine online riduce il costo di vendita del 30% su ordini standard."}}},"commercio_distribuzione_industriale":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Visite sistematiche ai clienti inattivi recuperano 10-20% del fatturato dormiente."},"2-3":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Agente di zona con portafoglio assegnato aumenta la copertura clienti attivi del 40-60%."},"3-4":{"pct_6m":[5,9],"pct_12m":[12,20],"pct_24m":[19,31],"note":"Rete agenti per area con KPI di acquisizione nuovi clienti porta 5-10 nuovi clienti/mese."},"4-5":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,17],"note":"Responsabile commerciale con rete agenti e inside sales scala senza aumentare il carico del titolare."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"CRM base con segmentazione clienti identifica il 20-30% dei clienti ad alto potenziale non sviluppato."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Pipeline sviluppo clienti separata dalla gestione attivi aumenta il win-rate su nuovi clienti del 20%."},"3-4":{"pct_6m":[2,5],"pct_12m":[5,9],"pct_24m":[8,13],"note":"Forecast mensile per agente permette di ottimizzare la copertura territoriale e ridurre i costi."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,6],"pct_24m":[5,8],"note":"Pipeline con forecast < 15% scarto permette di ottimizzare gli acquisti e ridurre lo stock del 15%."}},"team":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Magazziniere formato su presentazione catalogo aumenta la conversione delle visite in sede del 15%."},"2-3":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,12],"note":"Inside sales autonomo su ordini ricorrenti libera gli agenti per lo sviluppo nuovi clienti."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Team agenti + inside sales copre tutto il portafoglio aumentando la frequenza di contatto del 40%."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,12],"note":"Responsabile commerciale autonomo scala la struttura senza il titolare su ogni decisione."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Listino digitale sempre aggiornato riduce gli errori di prezzo del 90% e i tempi di risposta del 50%."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Script visita cliente con cross-selling aumenta il valore medio ordine del 10-20%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Playbook obiezioni prezzo/concorrenza aumenta il tasso di mantenimento clienti a rischio del 20%."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Processo completo onboarding + sviluppo + fidelizzazione riduce il churn del 30%."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Accordi quadro annuali con i top 5 clienti garantiscono 20-35% del fatturato programmato."},"2-3":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Forecast mensile permette di ottimizzare gli acquisti e ridurre il capitale immobilizzato in stock del 15%."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,18],"note":"40% accordi quadro riduce la volatilità e permette di negoziare prezzi migliori con i fornitori."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,11],"note":"Revenue ricorrente > 55% con accordi pluriennali permette investimenti in magazzino e sistemi."}},"marketing":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Newsletter mensile con promozioni genera 5-10% di riordini aggiuntivi dai clienti attivi."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Email segmentata per settore genera 3-6 richieste qualificate/mese da prospect freddi."},"3-4":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"LinkedIn verso responsabili acquisti genera 5-10 nuove opportunità/mese qualificate."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Marketing B2B strutturato riduce il costo di acquisizione cliente del 30-40%."}},"sitoweb":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Catalogo online genera 2-5 richieste/mese da buyer che cercano fornitori industriali online."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Schede prodotto tecniche riducono le richieste di informazioni del 40% e qualificano meglio i contatti."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"SEO su brand distribuiti genera 8-15 richieste organiche/mese da buyer qualificati."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Area riservata clienti con listini e disponibilità riduce il costo di gestione ordini del 30%."}},"ecommerce":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,12],"note":"Ordini online per i 50 codici più venduti aumentano la frequenza di riordino del 20-30%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Shop B2B completo aumenta il fatturato online del 15-25% e riduce il costo per ordine del 40%."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[10,17],"note":"Portale clienti con ordini e fatture riduce il costo amministrativo del 30% e aumenta la soddisfazione."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"E-commerce B2B integrato con gestionale aumenta la capacità di gestire ordini del 50%."}}},"commercio_ingrosso_alimentare":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Visite sistematiche ai clienti inattivi recuperano 10-20% del fatturato dormiente HO.RE.CA."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,16],"pct_24m":[14,24],"note":"Agente HO.RE.CA. con portafoglio aumenta la copertura clienti attivi del 40-60%."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Rete agenti per canale con obiettivi separati porta 5-10 nuovi clienti/mese per canale."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Direttore vendite con team agenti per canale scala la struttura commerciale senza il titolare."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Segmentazione clienti per frequenza e valore identifica i top 20% che generano l'80% del fatturato."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"CRM con alert inattività riduce il churn dei clienti HO.RE.CA. del 15-25%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Forecast settimanale permette di ottimizzare gli acquisti di freschi e ridurre gli sprechi del 20%."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Pipeline integrata con acquisti e logistica riduce le rotture di stock del 30% e i clienti persi."}},"team":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Magazziniere formato su ordini telefonici riduce il carico del titolare del 30%."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Inside sales autonomo su ordini standard libera gli agenti per lo sviluppo nuovi clienti."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Team agenti + inside sales + customer service copre il portafoglio aumentando la frequenza di contatto."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Responsabile commerciale autonomo per canale scala senza il titolare su ogni decisione."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Listino digitale con prezzi del giorno riduce gli errori di prezzo del 90% e i tempi del 50%."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,8],"note":"Script visita HO.RE.CA. con proposta stagionale aumenta il valore medio ordine del 8-15%."},"3-4":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Playbook gestione reclami qualità riduce il churn post-problema del 30-40%."},"4-5":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,5],"note":"Processo completo con upsell stagionale aumenta il valore medio cliente del 10-20%."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Ordini programmati settimanali fissi con 10 ristoranti garantiscono 20-35% del fatturato programmato."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Forecast settimanale permette di ottimizzare gli acquisti di freschi e ridurre gli sprechi del 15-25%."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"50% ordini programmati HO.RE.CA. riduce il rischio di invenduto e permette prezzi migliori dai fornitori."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Revenue ricorrente > 65% con ordini automatici permette investimenti in logistica e flotta."}},"marketing":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Newsletter settimanale con promozioni genera 5-10% di riordini aggiuntivi dai clienti attivi."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"WhatsApp Business per promozioni flash genera 3-5% di vendite aggiuntive sulle eccedenze."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Social con ricette e prodotti stagionali genera 3-6 nuovi ristoratori qualificati/mese."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Marketing strutturato riduce il costo di acquisizione HO.RE.CA. del 30-40%."}},"sitoweb":{"1-2":{"pct_6m":[0,1],"pct_12m":[1,3],"pct_24m":[2,5],"note":"Catalogo online genera 1-3 richieste/mese da ristoratori che cercano fornitori alternativi."},"2-3":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Area riservata con listino personalizzato riduce le chiamate per prezzi del 50%."},"3-4":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"SEO su ingrosso alimentare + città genera 3-6 richieste organiche/mese da nuovi operatori."},"4-5":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,5],"note":"Portale B2B con ordini in tempo reale riduce il costo di gestione ordini del 30%."}},"ecommerce":{"1-2":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"App ordini per HO.RE.CA. aumenta la frequenza di riordino del 20-30% e riduce gli ordini incompleti."},"2-3":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Ordini online con cut-off sera riduce il costo operativo notturno del 20%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Portale con ordini ricorrenti automatici riduce il costo per ordine del 40%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Piattaforma B2B integrata con gestionale cliente riduce il costo di gestione del 50%."}}},"commercio_materiali_edili":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Visite sistematiche alle imprese edili locali recuperano 10-20% del fatturato dormiente."},"2-3":{"pct_6m":[3,6],"pct_12m":[8,14],"pct_24m":[13,22],"note":"Agente dedicato canale imprese aumenta la copertura cantieri attivi del 40-60%."},"3-4":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Team vendite con account imprese e privati ottimizza il mix di canale e il margine."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Responsabile commerciale autonomo scala la struttura senza il titolare su ogni cantiere."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Registro cantieri in zona identifica il 30-40% dei cantieri non presidiati con potenziale fornitura."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"CRM sviluppo cantieri aumenta il tasso di prima fornitura del 20-30% sulle imprese contattate."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Forecast mensile su cantieri in corso permette di ottimizzare lo stock e ridurre le rotture del 25%."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Pipeline con forecast integrato con magazzino riduce il capitale immobilizzato in stock del 15%."}},"team":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Addetto vendite formato su consulenza tecnica aumenta la conversione showroom del 15-20%."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Addetto vendite showroom autonomo gestisce i privati liberando il titolare per le imprese."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Team showroom + commerciale imprese + customer service copre tutti i segmenti in autonomia."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Struttura con showroom manager e account imprese scala senza il titolare su ogni decisione."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Listino imprese con sconti per volume riduce le trattative informali e aumenta il margine del 5-10%."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,8],"note":"Processo preventivo cantiere con risposta entro 24h aumenta il tasso di firma del 15-20%."},"3-4":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Script consulenza showroom aumenta la conversione visita→acquisto del 15-25%."},"4-5":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,5],"note":"Processo end-to-end con upsell aumenta il valore medio cantiere del 10-15%."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Accordi quadro con i top 5 costruttori garantiscono 25-40% del fatturato programmato."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Forecast trimestrale su cantieri in corso permette di ottimizzare acquisti e ridurre lo stock del 15%."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"40% accordi quadro riduce la volatilità e permette di negoziare prezzi migliori dai fornitori."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Revenue ricorrente > 50% con accordi pluriennali permette investimenti in showroom e sistemi."}},"marketing":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Showroom con bonus aggiornati genera 3-6 richieste/mese qualificate da privati con cantieri."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Newsletter imprese con promozioni genera 5-8% di riordini aggiuntivi sui cantieri attivi."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Google Ads su materiali edili + città genera 8-15 richieste/mese qualificate da privati e imprese."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Marketing integrato riduce il costo di acquisizione del 30-35%."}},"sitoweb":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Catalogo online genera 2-4 richieste/mese da imprese e privati che cercano materiali online."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Guida bonus edilizia genera 3-6 richieste/mese qualificate da clienti con interventi in corso."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"SEO su materiali + città genera 8-15 richieste organiche/mese da acquirenti qualificati."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"E-commerce B2B con prezzi imprese riduce il costo per ordine del 40% e aumenta la frequenza."}},"ecommerce":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Ordini online per i 100 codici più venduti aumentano la frequenza di riordino del 20-30%."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,16],"note":"Shop B2B per imprese con listino riservato aumenta gli ordini digitali del 25-35%."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[7,12],"note":"Portale imprese con ordini per cantiere riduce il costo di gestione del 30%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Piattaforma B2B integrata con gestionale impresa scala la capacità senza aumentare il personale."}}},"commercio_ricambi_auto":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Visite sistematiche alle officine inattive recuperano 10-20% del fatturato dormiente."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,16],"pct_24m":[14,24],"note":"Agente dedicato con portafoglio officine aumenta la copertura clienti attivi del 40-60%."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Team agenti per area con obiettivi di acquisizione nuove officine porta 5-10 nuovi clienti/mese."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Responsabile commerciale con team agenti e inside sales scala senza il titolare su ogni decisione."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Segmentazione officine per frequenza e valore identifica il 20-30% con potenziale non sviluppato."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"CRM sviluppo officine aumenta il tasso di prima fornitura del 20-30% sulle officine contattate."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Forecast settimanale permette di ottimizzare lo stock delle rotazioni veloci e ridurre le rotture del 25%."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Pipeline con forecast integrato con magazzino riduce il capitale immobilizzato in stock del 15%."}},"team":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Addetto magazzino formato sulla ricerca codici riduce il tempo per ordine del 50%."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,11],"note":"Inside sales autonomo su ordini telefonici libera gli agenti per lo sviluppo nuove officine."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Team agenti + inside sales copre tutto il portafoglio aumentando la frequenza di contatto del 40%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Responsabile commerciale autonomo scala la struttura senza saturare il titolare."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Processo ricerca codice standardizzato riduce gli errori di ordine del 70% e i resi del 40%."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,8],"note":"Script visita officina con cross-selling aumenta il valore medio ordine del 10-20%."},"3-4":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Procedura reso rapido riduce il churn post-problema del 25-35% nelle officine a rischio."},"4-5":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,5],"note":"Processo completo dalla visita al riordino automatico aumenta la frequenza del 20-30%."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Ordini programmati settimanali con 10 officine garantiscono 25-40% del fatturato programmato."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Forecast settimanale permette di ottimizzare lo stock delle rotazioni veloci riducendo sprechi del 20%."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"50% ordini programmati riduce la volatilità e permette prezzi migliori dai fornitori del 5-10%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Revenue ricorrente > 65% con ordini automatici permette investimenti in magazzino automatizzato."}},"marketing":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Newsletter settimanale con promozioni genera 5-8% di riordini aggiuntivi dalle officine attive."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,8],"note":"WhatsApp Business per promozioni flash genera 3-5% di vendite aggiuntive sulle eccedenze di stock."},"3-4":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Email segmentata per marca auto genera 3-5 nuove officine qualificate/mese."},"4-5":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,5],"note":"Marketing strutturato riduce il costo di acquisizione officina del 30%."}},"sitoweb":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Catalogo con ricerca per targa/modello genera 3-5 richieste/mese da officine online."},"2-3":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Area officine riservata con listino riduce le chiamate per prezzi del 50%."},"3-4":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"SEO su ricambi + marca + città genera 5-10 richieste organiche/mese da officine qualificate."},"4-5":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,5],"note":"Portale B2B con integrazione gestionale officina riduce il costo per ordine del 40%."}},"ecommerce":{"1-2":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"App ordini per officine aumenta la frequenza di riordino del 25-35% e riduce gli ordini telefonici del 40%."},"2-3":{"pct_6m":[3,6],"pct_12m":[6,12],"pct_24m":[9,18],"note":"E-commerce B2B con consegna 2h aumenta il volume ordini urgenti del 30-40%."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[7,12],"note":"Portale officine con storico e programma fedeltà aumenta il tasso di retention del 20-25%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Piattaforma integrata con gestionale officina scala la capacità senza aumentare il personale."}}},"commercio_abbigliamento_ingrosso":{"vendite":{"1-2":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[12,20],"note":"Presenza a fiera moda genera 10-20 contatti buyer qualificati per edizione."},"2-3":{"pct_6m":[5,9],"pct_12m":[12,20],"pct_24m":[19,31],"note":"Agente di rappresentanza per area aumenta la copertura buyer attivi del 50-70%."},"3-4":{"pct_6m":[6,11],"pct_12m":[14,23],"pct_24m":[22,35],"note":"Rete agenti con showroom nelle piazze moda principali aumenta il fatturato del 25-40%."},"4-5":{"pct_6m":[4,7],"pct_12m":[8,14],"pct_24m":[12,19],"note":"Responsabile commerciale con export manager apre mercati esteri con potenziale 30-50% aggiuntivo."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Tracciamento rivenditori contattati riduce le perdite per mancato follow-up buyer del 25-35%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"CRM stagionale SS/AW migliora il tasso di conversione campionario→ordine del 20-30%."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[10,17],"note":"Forecast stagionale per agente permette di ottimizzare gli acquisti e ridurre l'invenduto del 15-20%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Pipeline con preordini stagionali garantisce ordini certi prima degli acquisti dal produttore."}},"team":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Agente interno formato gestisce autonomamente un'area geografica con il campionario."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"Showroom manager autonomo permette di gestire entrambe le stagioni SS e AW in parallelo."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Rete agenti con showroom scala senza aumentare il carico del titolare."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Direttore vendite autonomo con team permette di aggiungere nuovi mercati/brand senza riorganizzazione."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Scheda prodotto stagionale standardizzata riduce gli errori di ordine del 30% e i resi."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,11],"note":"Processo campagna stagionale documentato riduce il time-to-market del 25-30%."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,13],"note":"Playbook buyer riduce i campionari non convertiti del 30-40%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Playbook stagionale completo riduce il ciclo vendita del 20% e aumenta il tasso di riordino."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Ordini programmati bianco SS+AW dai top 5 negozi garantiscono 30-45% del fatturato prima della produzione."},"2-3":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Forecast stagionale per agente permette di ottimizzare gli acquisti e ridurre l'invenduto del 15-20%."},"3-4":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"45% ordini programmati riduce il rischio di invenduto e permette prezzi migliori dai produttori."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"60% ordini programmati con contratti stagionali permette una pianificazione di lungo periodo."}},"marketing":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Lookbook digitale professionale aumenta la conversion rate nelle fiere del 25-35%."},"2-3":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Stand a Pitti Uomo o White genera 15-30 contatti buyer qualificati per edizione."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Campagna email segmentata per tipo negozio genera 5-10 nuovi buyer qualificati/mese."},"4-5":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,17],"note":"Presenza strutturata riduce il costo di acquisizione buyer del 35-40%."}},"sitoweb":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Catalogo stagionale online genera 2-5 richieste/mese da buyer che cercano nuovi fornitori."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Area riservata buyer con catalogo stagionale riduce il costo di gestione campionario del 30%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"SEO su brand rappresentati genera 5-10 richieste organiche/mese da buyer qualificati."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Showroom digitale con ordini B2B online riduce il costo di gestione ordini del 30%."}},"ecommerce":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Portale B2B con catalogo stagionale riduce il costo di gestione richieste del 40%."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Shop B2B con ordini stagionali aumenta il tasso di riordino del 20-25%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Portale agenti con statistiche venduto ottimizza il mix e aumenta la produttività del 20%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Piattaforma B2B integrata scala la capacità di gestione ordini senza aumentare il personale."}}},"commercio_elettronica":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Demo tecniche agli installatori generano 3-6 nuovi clienti qualificati/trimestre."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,16],"pct_24m":[14,24],"note":"Agente tecnico dedicato aumenta la copertura installatori attivi del 40-60%."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Team agenti per segmento (automazione, audio/video, sicurezza) ottimizza la penetrazione nei verticali."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Responsabile commerciale con team agenti e inside sales scala senza il titolare su ogni decisione."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"CRM base con installatori identifica il 20-30% con potenziale non sviluppato."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Pipeline sviluppo nuovi installatori aumenta il tasso di prima fornitura del 20-30%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Forecast mensile permette di ottimizzare lo stock per categoria e ridurre le rotture del 25%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Pipeline con forecast integrato con magazzino riduce il capitale immobilizzato in stock del 15%."}},"team":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Tecnico-venditore formato su demo aumenta la conversione delle visite del 20-30%."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Tecnico-venditore autonomo libera il titolare per i clienti strategici e i nuovi segmenti."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Team per segmento prodotto in piena autonomia aumenta la specializzazione e il valore percepito."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Struttura con product manager e account per canale scala senza il titolare su ogni decisione."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Schede tecniche sintetiche per prodotti chiave riducono le richieste di informazioni del 40%."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,8],"note":"Script discovery per installatori riduce le demo non qualificate del 25-30%."},"3-4":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Playbook obiezioni prezzo/supporto tecnico aumenta il tasso di mantenimento installatori del 20%."},"4-5":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,5],"note":"Processo completo dalla qualificazione al riordino automatico aumenta la frequenza del 20%."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Accordi quadro con installatori garantiscono 20-35% del fatturato programmato."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Forecast mensile permette di ottimizzare lo stock per categoria riducendo sprechi del 15-20%."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,13],"note":"40% accordi quadro riduce la volatilità e permette di negoziare prezzi migliori dai brand."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Revenue ricorrente > 55% con partnership strutturate permette investimenti in certificazioni."}},"marketing":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Newsletter tecnica mensile genera 5-8% di riordini aggiuntivi dagli installatori attivi."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Webinar tecnico su nuovi prodotti genera 8-15 partecipanti qualificati per webinar."},"3-4":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"LinkedIn verso responsabili acquisti installatori genera 5-10 nuove opportunità/mese qualificate."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Marketing B2B strutturato riduce il costo di acquisizione installatore del 30-35%."}},"sitoweb":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Catalogo online con schede tecniche genera 2-4 richieste/mese da installatori che cercano prodotti."},"2-3":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Area tecnica riservata riduce le richieste di documentazione del 50% e aumenta la soddisfazione."},"3-4":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"SEO su brand distribuiti e categorie genera 5-10 richieste organiche/mese da installatori qualificati."},"4-5":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,5],"note":"Portale B2B con listini riservati riduce il costo di gestione ordini del 35%."}},"ecommerce":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Shop online con prezzi riservati installatori aumenta la frequenza di riordino del 20-30%."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"E-commerce B2B aumenta gli ordini digitali del 25-35% riducendo il costo per ordine del 40%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Portale rivenditori con listino personalizzato e area tecnica aumenta la retention del 20%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Piattaforma B2B integrata con gestionale rivenditore scala la capacità senza aumentare il personale."}}},"commercio_abbigliamento_dettaglio":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Addetto formato sul cross-selling aumenta lo scontrino medio del 15-25%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[12,20],"note":"Addetto con obiettivo scontrino medio e conversion rate aumenta il fatturato del 15-25%."},"3-4":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Store manager con team formato e visual merchandising ottimizzato aumenta il fatturato del 20-30%."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Store manager autonomo scala il negozio senza il titolare su ogni decisione operativa."}},"pipeline":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Tracciamento scontrino medio e conversion rate giornaliero identifica le aree di miglioramento."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"CRM fidelity con storico acquisti permette comunicazioni personalizzate che aumentano i ritorni del 20%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Forecast stagionale su sell-through permette di ottimizzare i riordini e ridurre l'invenduto del 15%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Pipeline VIP con forecast permette di gestire proattivamente i clienti ad alto valore."}},"team":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Sessioni formative su nuova collezione aumentano la conversione delle visite del 10-15%."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Store manager con obiettivi aumenta il fatturato per m² del 15-20%."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Team autonomo su vendita e visual aumenta il fatturato del 15-25% senza il titolare presente."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Store manager con delega completa scala il negozio e permette l'apertura di punti vendita aggiuntivi."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Script accoglienza standardizzato aumenta la soddisfazione percepita e la likelihood di acquisto del 10%."},"2-3":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Processo fidelity con iscrizione e comunicazioni personalizzate aumenta i ritorni del 20-30%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Playbook gestione lamentele riduce il churn post-problema del 30-40%."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Manuale operativo completo permette di aprire nuovi punti vendita replicando il modello."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Programma fedeltà con punti aumenta la frequenza di visita del 20-30% e il fatturato per cliente del 15%."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Forecast stagionale su sell-through permette di ottimizzare riordini e ridurre i saldi del 15%."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,13],"note":"30% fatturato da clienti fidelity con acquisto ricorrente riduce la dipendenza dal traffico occasionale."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Revenue ricorrente > 45% da VIP con servizi personalizzati permette una gestione più stabile."}},"marketing":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,12],"note":"Instagram con outfit del giorno genera 5-10 visite aggiuntive/settimana al negozio da follower locali."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,16],"note":"WhatsApp Business per nuovi arrivi genera 3-6 visite aggiuntive/settimana da clienti fidelizzati."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,14],"pct_24m":[11,22],"note":"Meta Ads locale su nuovi arrivi genera 20-40 visite/mese qualificate con CPL di 5-15€."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Marketing integrato riduce il costo di acquisizione del 30-35%."}},"sitoweb":{"1-2":{"pct_6m":[0,1],"pct_12m":[1,3],"pct_24m":[2,5],"note":"Google Business ottimizzato genera 3-5 visite aggiuntive/settimana da ricerche di prossimità."},"2-3":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Sito con galleria stagionale genera 5-10 visite organiche/giorno da acquirenti locali."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,13],"note":"SEO locale su abbigliamento + città genera 15-30 visite organiche/giorno qualificate."},"4-5":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[7,12],"note":"E-commerce con click&collect aumenta il fatturato del 10-15% senza aumentare il personale."}},"ecommerce":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,12],"note":"Instagram Shopping con tag prodotti genera 5-10 ordini/mese aggiuntivi da follower."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,11],"pct_24m":[8,18],"note":"E-commerce base con 50-100 articoli stagionali genera 20-50 ordini/mese aggiuntivi."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,14],"pct_24m":[11,22],"note":"Shop online completo con reso gratuito aumenta il fatturato totale del 15-25%."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Omnichannel con CRM unificato aumenta il valore medio cliente del 20-30% e riduce il churn."}}},"commercio_orologi_gioielli":{"vendite":{"1-2":{"pct_6m":[2,5],"pct_12m":[6,11],"pct_24m":[10,18],"note":"Consulente di vendita formato aumenta lo scontrino medio del 20-35% grazie all'upselling guidato."},"2-3":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Consulente dedicato all'alta fascia su appuntamento aumenta il valore medio transazione del 30-50%."},"3-4":{"pct_6m":[5,9],"pct_12m":[12,20],"pct_24m":[19,31],"note":"Team con specialisti per categoria ottimizza la consulenza e aumenta il sell-through del 20-30%."},"4-5":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,17],"note":"Store manager con team e gestione VIP autonoma scala senza il titolare su ogni cliente importante."}},"pipeline":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Registro clienti importanti con compleanni/anniversari genera 3-6 visite proattive aggiuntive/mese."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"CRM con alert automatici per occasioni speciali aumenta il fatturato da clienti esistenti del 20-30%."},"3-4":{"pct_6m":[3,6],"pct_12m":[6,11],"pct_24m":[9,16],"note":"Forecast stagionale (Natale, S. Valentino, Pasqua) permette di ottimizzare lo stock e le promozioni."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Pipeline VIP con forecast annuale permette di gestire proattivamente i clienti ad alto valore."}},"team":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Formazione mensile su nuove collezioni e gemmologia aumenta la competenza percepita del team."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Consulente senior autonomo sull'alta fascia libera il titolare per i clienti VIP più importanti."},"3-4":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"Team con specialisti per categoria aumenta la qualità della consulenza e il valore medio vendita del 20%."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Store manager con delega completa permette al titolare di sviluppare nuove linee o punti vendita."}},"processi":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Script accoglienza premium aumenta la perceived value e la conversion rate del 15-20%."},"2-3":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Processo personalizzazione con tempi certi aumenta la soddisfazione e i referral del 25%."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Playbook clienti VIP con contatto proattivo per occasioni aumenta il fatturato VIP del 25-35%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Manuale relazione VIP completo permette di replicare la qualità su nuovi consulenti."}},"ricavi":{"1-2":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[12,20],"note":"Contatto proattivo dei top 20 clienti per nuova collezione genera 5-10 visite ad alto valore/mese."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Forecast stagionale permette di preparare lo stock giusto per i picchi riducendo le vendite perse del 20%."},"3-4":{"pct_6m":[4,7],"pct_12m":[8,14],"pct_24m":[12,20],"note":"35% fatturato da VIP con acquisti ricorrenti riduce la dipendenza dal traffico occasionale."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Revenue ricorrente > 50% da VIP fidelizzati permette una gestione più stabile e investimenti in nuove linee."}},"marketing":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,12],"note":"Instagram con storytelling su ogni pezzo genera 3-6 richieste/mese da clienti nuovi qualificati."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,16],"note":"Evento privato VIP annuale genera 5-10 acquisti ad alto valore per evento e rafforza la fidelizzazione."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Meta Ads su target alto-spendenti locali per Natale e S. Valentino genera 15-30 visite qualificate."},"4-5":{"pct_6m":[2,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Marketing esclusivo con PR locali riduce il costo di acquisizione del 30-35%."}},"sitoweb":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Galleria collezioni professionale genera 2-4 richieste/mese da acquirenti che cercano gioiellerie online."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Pagina brand con storytelling aumenta la credibilità e il valore percepito del negozio."},"3-4":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"SEO su gioielleria + città genera 5-10 visite organiche/giorno da acquirenti in ricerca attiva."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Sito luxury con configuratore e area VIP aumenta la perceived exclusivity e il valore medio del 15%."}},"ecommerce":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Wishlist digitale per clienti genera 3-6 contatti proattivi/mese ad alto valore per occasioni speciali."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,13],"note":"Shop online entry-level genera 5-15 ordini/mese aggiuntivi da acquirenti fuori zona."},"3-4":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,16],"note":"E-commerce con certificazione digitale aumenta la fiducia e il valore medio ordine online del 20%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Piattaforma luxury con consultazione video raggiunge clienti nazionali ad alto valore."}}},"alimentare_trasformazione":{"vendite":{"1-2":{"pct_6m":[2,5],"pct_12m":[6,11],"pct_24m":[10,18],"note":"Campionatura a 5 GDO locali o ristoranti genera 2-4 listing aggiuntivi/trimestre."},"2-3":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Agente alimentare per canale aumenta la copertura clienti attivi del 50-70%."},"3-4":{"pct_6m":[5,9],"pct_12m":[12,20],"pct_24m":[19,31],"note":"Rete agenti per canale (GDO, HO.RE.CA., export) ottimizza il mix e aumenta il valore medio cliente."},"4-5":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,17],"note":"Direttore commerciale con team agenti scala senza il titolare su ogni trattativa."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Registro clienti con rotazione stimata identifica il 20-30% dei clienti con potenziale non sviluppato."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"CRM con tracciamento listing GDO aumenta il tasso di approvazione del 15-20%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Forecast mensile su ordini programmati permette di ottimizzare la produzione e ridurre sprechi del 20%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Pipeline integrata con produzione riduce i costi di sotto/sovra-produzione del 15%."}},"team":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Responsabile produzione formato sugli argomenti di vendita aumenta la credibilità nelle presentazioni."},"2-3":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Agente interno gestisce autonomamente un'area geografica liberando il titolare per i key account."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Team commerciale per canale scala la struttura senza aumentare il carico del titolare."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Struttura autonoma con direttore commerciale permette di espandersi su nuovi mercati/canali."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Scheda prodotto standardizzata con valori nutrizionali riduce le richieste di informazioni del 50%."},"2-3":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Processo campionatura documentato riduce il time-to-listing del 25-30%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Playbook negoziazione GDO aumenta il win-rate del 15-25% su nuovi listing."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Processo end-to-end dalla campionatura al category management riduce il costo di listing del 20%."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Ordini programmati mensili con 5 clienti HO.RE.CA. garantiscono 20-35% del fatturato prevedibile."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Forecast mensile per canale permette di ottimizzare la produzione e ridurre gli sprechi del 15-20%."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,18],"note":"50% ordini programmati riduce il rischio di sottoproduzione e permette di ottimizzare i margini."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,11],"note":"Revenue ricorrente > 60% con contratti GDO pluriennali permette investimenti in capacità produttiva."}},"marketing":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Stand a Cibus/TuttoFood genera 15-30 contatti buyer qualificati per evento."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Newsletter ricette mensile per HO.RE.CA. genera 3-5 richieste qualificate/mese aggiuntive."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,18],"note":"LinkedIn verso buyer GDO con dati sell-out genera 5-8 opportunità di listing qualificate/mese."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Marketing strutturato riduce il costo di acquisizione buyer del 30-35%."}},"sitoweb":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Catalogo online con certificazioni genera 2-4 richieste/mese da buyer che cercano fornitori qualificati."},"2-3":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Pagina ricette professionali per HO.RE.CA. aumenta la credibilità e riduce il ciclo di qualificazione del 20%."},"3-4":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Area riservata buyer con sell-out dati aumenta la conversione nelle presentazioni GDO del 15%."},"4-5":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,5],"note":"Portale B2B con ordini online riduce il costo di gestione del 30%."}},"ecommerce":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[5,12],"note":"Shop D2C genera 1-3k€/mese aggiuntivi a margine pieno e valida nuovi prodotti sul mercato."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,16],"note":"Portale ordini HO.RE.CA. con listino riservato aumenta la frequenza di riordino del 20-25%."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[7,12],"note":"E-commerce strutturato B2C + portale B2B ottimizza il mix di canale e la marginalità."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Piattaforma omnichannel con GDO integrata riduce il costo di gestione ordini del 35%."}}},"alimentare_vini":{"vendite":{"1-2":{"pct_6m":[3,6],"pct_12m":[8,14],"pct_24m":[13,22],"note":"Campionatura a 5 enoteche e ristoranti top genera 2-4 listing ad alto margine/trimestre."},"2-3":{"pct_6m":[6,11],"pct_12m":[14,23],"pct_24m":[22,35],"note":"Agente con portafoglio HO.RE.CA. fine dining + enoteche aumenta la copertura del 50-70%."},"3-4":{"pct_6m":[7,13],"pct_12m":[16,26],"pct_24m":[25,40],"note":"Rete agenti per canale con sommelier come sales tool aumenta il valore medio contratto del 30%."},"4-5":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"Export manager con agenti per mercato apre canali internazionali con potenziale 40-60% aggiuntivo."}},"pipeline":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Registro clienti con degustazioni e follow-up riduce le perdite per mancato contatto del 25%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"CRM con gestione degustazioni migliora il conversion rate degustazione→ordine del 20-30%."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[10,17],"note":"Forecast per vendemmia su allocazioni e prevendite permette di ottimizzare la produzione."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Pipeline con prevendita vendemmia e allocazioni export garantisce ordini certi prima della produzione."}},"team":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Cantiniere/export assistant gestisce autonomamente degustazioni e follow-up ordini."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"Agente o export assistant autonomo su degustazioni e ordini libera il titolare per i key account."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Team con agenti per mercato e sommelier aziendale scala senza aumentare il carico del titolare."},"4-5":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,17],"note":"Struttura internazionale autonoma permette di aggiungere nuovi mercati senza riorganizzazione."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Schede tecniche vini con note di degustazione e abbinamenti riducono le richieste di info del 40%."},"2-3":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Processo degustazione professionale documentato aumenta il conversion rate del 20-30%."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Playbook enoteche e HO.RE.CA. riduce il ciclo di vendita del 20% e aumenta il valore medio ordine."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Processo end-to-end vendemmia-allocazione-consegna riduce il costo di gestione del 20%."}},"ricavi":{"1-2":{"pct_6m":[2,5],"pct_12m":[6,11],"pct_24m":[10,18],"note":"En primeur o preordine vendemmia dai top importatori garantisce 25-40% del fatturato pre-produzione."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"Forecast per vendemmia su preordini confermati ottimizza la produzione e riduce i costi del 10-15%."},"3-4":{"pct_6m":[4,8],"pct_12m":[9,16],"pct_24m":[14,23],"note":"40% allocazioni pluriennali con importatori stabili garantisce prevedibilità e riduce la volatilità."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Revenue ricorrente > 55% con contratti pluriennali permette investimenti in cantina e vigneto."}},"marketing":{"1-2":{"pct_6m":[2,5],"pct_12m":[6,11],"pct_24m":[10,18],"note":"Stand a Vinitaly o ProWein genera 20-40 contatti buyer internazionali qualificati per edizione."},"2-3":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Wine tasting privato in cantina per importatori selezionati genera 5-10 ordini ad alto valore per evento."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Campagna email e LinkedIn verso buyer HO.RE.CA. internazionali genera 8-15 nuove opportunità/mese."},"4-5":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,17],"note":"Presenza strutturata fiere internazionali + digital storytelling vendemmia riduce CAC del 35%."}},"sitoweb":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,12],"note":"Sito con storia cantina e schede vini genera 3-6 richieste/mese da buyer e wine lovers internazionali."},"2-3":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Blog vendemmia con storytelling genera 5-10 richieste organiche/mese da buyer internazionali."},"3-4":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"SEO su cantina + zona DOC + vitigno genera 10-20 richieste organiche/mese qualificate."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Sito con e-commerce D2C e area importatori aumenta il fatturato a margine pieno del 10-15%."}},"ecommerce":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Shop online D2C genera 2-5k€/mese a margine pieno e costruisce una base clienti diretta."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,20],"note":"Wine club con abbonamento mensile genera MRR prevedibile da consumatori fidelizzati."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[10,17],"note":"Portale importatori con listini per paese e ordini online aumenta l'efficienza del 30%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Piattaforma omnichannel D2C + importatori + wine club aumenta il fatturato totale del 15-20%."}}},"alimentare_forno":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Visite a 10 bar con campionatura generano 3-6 nuovi clienti HO.RE.CA. qualificati/trimestre."},"2-3":{"pct_6m":[3,6],"pct_12m":[8,14],"pct_24m":[13,22],"note":"Agente con portafoglio bar/caffetterie aumenta la copertura clienti attivi del 50-70%."},"3-4":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Rete agenti per area con sviluppo canale GDO locale porta 5-10 nuovi punti vendita/mese."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Responsabile commerciale con agenti per canale scala senza il titolare su ogni decisione."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Registro clienti con frequenza consegna e prodotti forniti identifica il 20-30% con potenziale non sviluppato."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"CRM con gestione clienti bar aumenta il tasso di sviluppo assortimento del 20-30%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Forecast settimanale su ordini programmati permette di ottimizzare la produzione e ridurre gli scarti del 20%."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Pipeline integrata con produzione: ordini confermati = programmazione forno notturno ottimizzata."}},"team":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Autista-consegnatario formato su presentazione nuovi prodotti aumenta lo sviluppo assortimento del 15%."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Autista-venditore autonomo sullo sviluppo assortimento libera il titolare per nuovi canali."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Team con agenti sviluppo + autisti-consegnatari gestisce il portafoglio completo in autonomia."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Responsabile commerciale autonomo scala la struttura senza il titolare su ogni decisione."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Schede prodotto con shelf life e presentazione riducono le richieste di informazioni del 40%."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,8],"note":"Processo campionatura bar con follow-up pomeriggio riduce il time-to-order del 30-40%."},"3-4":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Script sviluppo assortimento con proposta stagionale aumenta il valore medio cliente del 10-20%."},"4-5":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,5],"note":"Processo completo dalla campionatura all'ordine programmato aumenta la stickiness del 25%."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Ordini programmati giornalieri fissi con 10 bar garantiscono 30-45% del fatturato prevedibile."},"2-3":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Forecast settimanale su ordini programmati permette di ottimizzare la produzione quotidiana e ridurre gli scarti del 20%."},"3-4":{"pct_6m":[4,7],"pct_12m":[8,14],"pct_24m":[12,20],"note":"60% ordini programmati giornalieri riduce gli sprechi e permette prezzi migliori sulle materie prime."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,14],"note":"Revenue ricorrente > 75% con ordini automatici permette investimenti in macchinari e automazione."}},"marketing":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Instagram con foto prodotti freschi del giorno genera 3-5 nuovi contatti qualificati/mese."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Presenza a fiera agroalimentare locale con degustazione genera 8-15 contatti qualificati per evento."},"3-4":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Google Ads locale su pasticceria artigianale + città genera 10-20 richieste/mese qualificate."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Marketing strutturato riduce il costo di acquisizione HO.RE.CA. del 30-35%."}},"sitoweb":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Sito con catalogo e info consegna genera 2-4 richieste/mese da nuovi operatori HO.RE.CA."},"2-3":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Blog con ricette e stagionalità aumenta la credibilità e genera traffico organico qualificato."},"3-4":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"SEO su forno artigianale + città genera 5-10 richieste organiche/mese qualificate."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Portale ordini HO.RE.CA. con cut-off sera riduce il costo operativo e aumenta la fidelizzazione."}},"ecommerce":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"App ordini mattutini per bar aumenta la frequenza di riordino del 25-35% e riduce gli ordini mancati."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Shop online con spedizione tutta Italia genera 1-3k€/mese di revenue aggiuntiva a margine pieno."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Portale HO.RE.CA. con ordini programmati riduce il costo di gestione del 30%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Piattaforma ordini integrata con produzione riduce gli sprechi del 20% e aumenta la marginalità."}}},"alimentare_conserve":{"vendite":{"1-2":{"pct_6m":[2,5],"pct_12m":[6,11],"pct_24m":[10,18],"note":"Stand a TuttoFood o Cibus genera 15-30 contatti buyer GDO/HO.RE.CA. qualificati per evento."},"2-3":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Agente alimentare per canale aumenta la copertura clienti attivi del 50-70%."},"3-4":{"pct_6m":[5,9],"pct_12m":[12,20],"pct_24m":[19,31],"note":"Rete agenti per canale con key account GDO ottimizza il mix e aumenta il valore medio contratto."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Direttore commerciale con team per canale scala senza il titolare su ogni trattativa."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Registro GDO contattate con stato listing identifica il 30-40% dei canali non presidiati."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"CRM listing GDO aumenta il tasso di approvazione buyer del 15-20%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Forecast mensile su ordini GDO e HO.RE.CA. permette di ottimizzare la campagna di produzione."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Pipeline integrata con produzione riduce i costi di sotto/sovra-produzione del 15%."}},"team":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Responsabile produzione formato sugli argomenti di vendita aumenta la credibilità nelle presentazioni buyer."},"2-3":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Agente interno gestisce autonomamente un'area geografica liberando il titolare per i key account."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Team commerciale per canale scala la struttura senza aumentare il carico del titolare."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Struttura autonoma permette di espandersi su nuovi mercati e canali senza riorganizzazione."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Scheda prodotto con shelf life e formati per canale riduce le richieste di informazioni del 50%."},"2-3":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Processo listing GDO documentato riduce il time-to-listing del 25-30%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Playbook negoziazione GDO aumenta il win-rate del 15-25% su nuovi listing."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Processo completo dalla campionatura al category management riduce il costo operativo del 20%."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Accordo fornitura annuale con 3 buyer GDO garantisce 25-40% del fatturato pre-produzione."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Forecast mensile su ordini GDO permette di ottimizzare la campagna e ridurre i costi del 15%."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,18],"note":"55% ordini GDO programmati riduce il rischio di sovra-produzione e permette prezzi migliori."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,11],"note":"Revenue ricorrente > 65% con contratti GDO pluriennali permette investimenti in capacità produttiva."}},"marketing":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Stand a TuttoFood o Cibus genera 15-30 contatti buyer qualificati per evento."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Newsletter ricette mensile per HO.RE.CA. genera 3-5 richieste qualificate/mese aggiuntive."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"LinkedIn verso buyer GDO con dati sell-out genera 5-8 opportunità di listing qualificate/mese."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Marketing strutturato riduce il costo di acquisizione buyer del 30-35%."}},"sitoweb":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Catalogo online con certificazioni genera 2-4 richieste/mese da buyer che cercano fornitori qualificati."},"2-3":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Pagina ricette professionali per HO.RE.CA. aumenta la credibilità e riduce il ciclo di qualificazione."},"3-4":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Area riservata buyer con dati sell-out aumenta la conversione nelle presentazioni GDO del 15%."},"4-5":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,5],"note":"Portale B2B con ordini online riduce il costo di gestione del 30%."}},"ecommerce":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[5,12],"note":"Shop D2C genera 1-3k€/mese a margine pieno e valida nuovi prodotti e formati sul mercato."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Portale ordini HO.RE.CA. con listino riservato aumenta la frequenza di riordino del 20-25%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"E-commerce B2C strutturato + portale B2B ottimizza il mix di canale e la marginalità."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Piattaforma omnichannel riduce il costo di gestione ordini del 35% aumentando la capacità."}}},"alimentare_ingredienti":{"vendite":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Campionatura a 5 laboratori artigianali genera 2-4 nuovi clienti qualificati/trimestre."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,16],"pct_24m":[14,24],"note":"Agente tecnico-commerciale per segmento aumenta la penetrazione del 40-60%."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Team agenti per segmento con supporto applicativo ottimizza la penetrazione nei verticali."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Responsabile commerciale con team tecnico-vendita scala senza il titolare su ogni trattativa."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Registro clienti con ingredienti forniti e frequenza riordino identifica il 20-30% con potenziale."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"CRM con gestione campionatura tecnica aumenta il conversion rate campione→ordine del 20-30%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Forecast mensile su ordini programmati permette di ottimizzare gli approvvigionamenti del 15%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Pipeline integrata con magazzino riduce le rotture di stock del 25% e il capitale immobilizzato del 15%."}},"team":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,7],"note":"Tecnico di laboratorio formato sulla presentazione degli ingredienti aumenta la credibilità tecnica."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Tecnico-commerciale autonomo su campionature libera il titolare per i clienti industriali strategici."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Team agenti + tecnici applicativi in autonomia aumenta la specializzazione e il valore percepito."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Struttura con laboratorio applicativo e responsabile commerciale scala senza il titolare."}},"processi":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Scheda ingrediente con applicazioni consigliate e dosaggi riduce le richieste di consulenza del 40%."},"2-3":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Processo campionatura tecnica con demo applicativa riduce il time-to-order del 30-40%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Playbook sviluppo applicazione riduce le campionature non convertite del 25% e ottimizza il mix."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Processo end-to-end dalla campionatura all'ordine ricorrente aumenta la stickiness del 30%."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Accordo fornitura mensile con 5 clienti stabili garantisce 25-40% del fatturato programmato."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Forecast mensile su ordini programmati ottimizza gli approvvigionamenti e ridurre i costi del 15%."},"3-4":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"50% contratti periodici riduce la volatilità e permette prezzi migliori dai fornitori del 5-8%."},"4-5":{"pct_6m":[2,4],"pct_12m":[5,8],"pct_24m":[7,12],"note":"Revenue ricorrente > 65% con contratti annuali permette investimenti in laboratorio e R&D."}},"marketing":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Presenza a Sigep o Cibus Tec con demo applicative genera 10-20 contatti qualificati per evento."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Webinar tecnico su applicazioni ingredienti genera 8-15 lead qualificati per webinar."},"3-4":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Newsletter tecnica bimestrale con ricette professionali genera 5-8 richieste qualificate/mese."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Marketing strutturato con fiere + webinar + newsletter riduce il costo di acquisizione del 30%."}},"sitoweb":{"1-2":{"pct_6m":[0,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Catalogo ingredienti con schede tecniche e dosaggi genera 2-4 richieste/mese da artigiani e industria."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Ricettario professionale per segmento genera 5-8 richieste organiche/mese da pasticceri e gelatieri."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Area tecnica riservata con formulazioni riduce le richieste di supporto del 40%."},"4-5":{"pct_6m":[1,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Portale tecnico con configuratore applicazione genera lead qualificati e riduce il ciclo di vendita."}},"ecommerce":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Shop online per artigiani con ordini minimi accessibili genera 1-3k€/mese di revenue aggiuntiva."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Portale B2B con listini per segmento e campioni online aumenta la frequenza di riordino del 20%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"E-commerce B2B con ordini ricorrenti e documentazione tecnica riduce il costo per ordine del 40%."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Piattaforma B2B integrata con gestionale cliente scala la capacità senza aumentare il personale."}}},"tech_saas":{"vendite":{"1-2":{"pct_6m":[3,7],"pct_12m":[8,15],"pct_24m":[14,24],"note":"Outbound LinkedIn sistematico genera 5-10 conversazioni qualificate/mese con decision maker ICP."},"2-3":{"pct_6m":[6,12],"pct_12m":[15,25],"pct_24m":[24,40],"note":"SDR dedicato alla qualificazione genera 10+ SQL qualificate/mese che entrano in pipeline commerciale."},"3-4":{"pct_6m":[8,15],"pct_12m":[18,30],"pct_24m":[28,45],"note":"Team SDR + AE + CS strutturato scala il fatturato senza aumentare il tempo del founder."},"4-5":{"pct_6m":[5,9],"pct_12m":[10,17],"pct_24m":[15,24],"note":"Revenue team autonomo con head of sales scala sistematicamente verso nuovi segmenti e mercati."}},"pipeline":{"1-2":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"CRM con tracciamento funnel trial→demo→proposta riduce la perdita di lead del 30-40%."},"2-3":{"pct_6m":[4,8],"pct_12m":[9,16],"pct_24m":[14,23],"note":"Pipeline con stage definiti e follow-up automatici aumenta il win-rate del 25-35%."},"3-4":{"pct_6m":[4,8],"pct_12m":[9,16],"pct_24m":[14,22],"note":"Forecast MRR mensile con probabilità per stage permette di pianificare team e investimenti."},"4-5":{"pct_6m":[2,5],"pct_12m":[5,9],"pct_24m":[7,12],"note":"RevOps con forecast MRR, churn prediction e upsell forecasting ottimizza il revenue engine."}},"team":{"1-2":{"pct_6m":[2,5],"pct_12m":[6,11],"pct_24m":[10,18],"note":"Primo collaboratore formato sulla demo raddoppia la capacità di gestire trial e conversioni."},"2-3":{"pct_6m":[5,10],"pct_12m":[12,20],"pct_24m":[19,31],"note":"AE autonomo su demo e proposta libera il founder per lo sviluppo prodotto e la strategia."},"3-4":{"pct_6m":[8,14],"pct_12m":[17,28],"pct_24m":[26,42],"note":"Team SDR + AE + CSM scala il fatturato del 30-50% senza aumentare il carico del founder."},"4-5":{"pct_6m":[5,9],"pct_12m":[10,17],"pct_24m":[15,24],"note":"Head of sales autonomo con team strutturato per segmento scala verso mid-market e enterprise."}},"processi":{"1-2":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Script demo strutturato aumenta il tasso di conversione demo→proposta del 20-30%."},"2-3":{"pct_6m":[4,8],"pct_12m":[9,16],"pct_24m":[14,23],"note":"Playbook MEDDIC/SPIN riduce il ciclo di vendita del 20-30% e aumenta la qualità delle opportunità."},"3-4":{"pct_6m":[4,8],"pct_12m":[8,14],"pct_24m":[12,20],"note":"Playbook obiezioni SaaS aumenta il tasso di chiusura del 25-35% sulle trattative avanzate."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Sales playbook completo permette di replicare il processo su nuovi AE con ramping più veloce del 40%."}},"ricavi":{"1-2":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[12,20],"note":"Conversione mensili→annuali prepagati aumenta il cash flow del 10-15% e riduce il churn."},"2-3":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Churn < 5% mensile + expansion > 10% porta NRR > 110%: ogni cohorte vale di più nel tempo."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,26],"note":"NRR > 110% con upsell sistematico significa che il fatturato cresce anche senza nuovi clienti."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"NRR > 120% con expansion automatica porta il business verso crescita composta del 20-30% annuo."}},"marketing":{"1-2":{"pct_6m":[3,7],"pct_12m":[8,15],"pct_24m":[13,22],"note":"3 contenuti/settimana su LinkedIn generano 5-10 trial inbound/mese qualificati dall'ICP target."},"2-3":{"pct_6m":[6,12],"pct_12m":[14,23],"pct_24m":[22,35],"note":"Content marketing strutturato + newsletter genera 15-30 MQL/mese con costo di acquisizione basso."},"3-4":{"pct_6m":[7,13],"pct_12m":[16,26],"pct_24m":[25,40],"note":"Demand gen multi-canale (SEO + LinkedIn Ads + G2/Capterra) genera 20-40 SQL/mese in modo scalabile."},"4-5":{"pct_6m":[4,8],"pct_12m":[9,15],"pct_24m":[13,21],"note":"PLG + demand gen + partner channel riduce il CAC del 40% e scala l'acquisizione sistematicamente."}},"sitoweb":{"1-2":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[12,20],"note":"Landing page ottimizzata con CTA trial aumenta la conversione visitatore→trial del 30-50%."},"2-3":{"pct_6m":[4,8],"pct_12m":[9,16],"pct_24m":[14,23],"note":"Case study per settore aumentano la conversione trial→demo del 20-30% per l'ICP target."},"3-4":{"pct_6m":[4,8],"pct_12m":[9,16],"pct_24m":[14,23],"note":"SEO strutturato con blog e comparison page genera 20-50 trial organici/mese ad alto intento."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Sito PLG ottimizzato per self-serve genera trial autonomi con attivazione e upgrade automatici."}},"ecommerce":{"1-2":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[12,20],"note":"Trial gratuito 14 giorni con onboarding guidato genera 10-20% di conversione a pagamento."},"2-3":{"pct_6m":[5,10],"pct_12m":[12,20],"pct_24m":[19,31],"note":"Freemium con upgrade in-app per piani SMB elimina la frizione e aumenta i clienti self-serve del 40%."},"3-4":{"pct_6m":[6,11],"pct_12m":[13,22],"pct_24m":[20,32],"note":"PLG engine con self-serve + feature gate genera 30-50% dei nuovi MRR senza intervento sales."},"4-5":{"pct_6m":[4,7],"pct_12m":[8,14],"pct_24m":[12,19],"note":"PLG + sales assist per enterprise + marketplace integrazioni scala l'acquisizione su tutti i segmenti."}}},"tech_system_integrator":{"vendite":{"1-2":{"pct_6m":[2,5],"pct_12m":[6,11],"pct_24m":[10,18],"note":"Assessment IT gratuiti a 5 manifatturieri locali generano 2-4 opportunità qualificate/trimestre."},"2-3":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Pre-sales tecnico dedicato aumenta il numero di proposte presentate del 40-60%."},"3-4":{"pct_6m":[5,9],"pct_12m":[12,20],"pct_24m":[19,30],"note":"Account manager per settore aumenta la penetrazione nei conti target del 25-40%."},"4-5":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,17],"note":"Team vendite con account per settore e partner manager scala senza il titolare su ogni decisione."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"CRM con tracciamento opportunità complesse riduce la perdita di deal per mancato follow-up del 30%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Pipeline con stakeholder map e documenti allegati aumenta il win-rate del 20-30%."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[10,17],"note":"Forecast trimestrale su opportunità per tipo permette di pianificare il team tecnico in anticipo."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,11],"note":"Pipeline con forecast mensile affidabile permette investimenti in certificazioni e strumenti."}},"team":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Tecnico senior in 2 meeting commerciali/mese supporta il pre-sales e aumenta la qualità dell'offerta."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Pre-sales autonomo su assessment e proposta tecnica libera l'account per lo sviluppo nuovi clienti."},"3-4":{"pct_6m":[4,8],"pct_12m":[9,16],"pct_24m":[14,23],"note":"Account + pre-sales + PM autonomi gestiscono il ciclo completo senza il titolare su ogni progetto."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Struttura autonoma con sales director e partner manager scala verso nuovi verticali e mercati."}},"processi":{"1-2":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Template assessment IT standardizzato riduce il tempo di qualificazione del 40-50%."},"2-3":{"pct_6m":[3,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Processo discovery tecnica con 8 domande chiave aumenta il tasso di proposta accettata del 20-25%."},"3-4":{"pct_6m":[3,6],"pct_12m":[6,11],"pct_24m":[9,16],"note":"Playbook obiezioni system integration aumenta il tasso di chiusura del 20-30%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Sales playbook con metodologia progettuale e referenze per settore scala la qualità su nuovi account."}},"ricavi":{"1-2":{"pct_6m":[2,5],"pct_12m":[6,11],"pct_24m":[10,18],"note":"Contratti manutenzione evolutiva annuale garantiscono 2-5k€/mese per cliente di MRR prevedibile."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"40% fatturato su manutenzione ricorrente riduce la volatilità da progetti one-shot."},"3-4":{"pct_6m":[4,8],"pct_12m":[9,16],"pct_24m":[14,23],"note":"Forecast annuale manutenzione + pipeline nuovi progetti permette pianificazione team e certificazioni."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"MRR managed services > 50% con contratti pluriennali stabilizza il business e permette investimenti."}},"marketing":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Case study implementazione su LinkedIn genera 3-6 richieste qualificate/mese da aziende simili."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Webinar tecnico mensile su digitalizzazione per settore target genera 8-15 lead qualificati per webinar."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Partnership con vendor (SAP, Microsoft) genera referral qualificati e co-marketing a costo contenuto."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Thought leadership strutturata con partner riduce il CAC del 35-40%."}},"sitoweb":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Pagina soluzioni per settore con casi implementazione genera 2-4 richieste/mese qualificate."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Case study per settore con ROI misurabili aumentano la credibilità e riducono il ciclo di vendita del 20%."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"SEO su integrazione sistemi + settore genera 5-10 richieste organiche/mese da decision maker qualificati."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"ROI calculator online genera lead più qualificati e riduce il ciclo di vendita del 20%."}},"ecommerce":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Portale partner con documentazione tecnica e training online riduce il costo di supporto del 30%."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Self-assessment online genera lead pre-qualificati che arrivano alla prima call già informati."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Marketplace soluzioni con demo on-demand aumenta la visibilità e genera 5-8 richieste/mese."},"4-5":{"pct_6m":[2,3],"pct_12m":[3,5],"pct_24m":[4,7],"note":"Piattaforma clienti con ticketing e monitoring integrato aumenta la soddisfazione e il tasso di rinnovo."}}},"tech_digital_agency":{"vendite":{"1-2":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[12,20],"note":"Referral attivi da 3 clienti soddisfatti generano 2-4 nuovi mandati/trimestre con tasso di chiusura > 60%."},"2-3":{"pct_6m":[5,9],"pct_12m":[12,20],"pct_24m":[19,31],"note":"Business developer part-time genera 5-10 conversazioni qualificate/mese con CMO e marketing manager."},"3-4":{"pct_6m":[6,11],"pct_12m":[14,23],"pct_24m":[22,35],"note":"BD senior con pipeline strutturata porta 3-6 nuovi mandati/trimestre in modo sistematico."},"4-5":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,17],"note":"Head of growth con team BD e account scala senza aumentare il carico dei senior."}},"pipeline":{"1-2":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[7,12],"note":"CRM con tracciamento dal primo contatto alla proposta riduce la perdita di opportunità del 30%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Pipeline con next step su ogni deal aumenta il tasso di conversione da prospect a proposta del 25%."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[10,17],"note":"Forecast mensile su proposte in attesa permette di pianificare la capacità del team e ridurre i sotto-utilizzi."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"RevOps con pipeline e forecast MRR retainer ottimizza il mix progetto/retainer e la marginalità."}},"team":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Account o senior in 2 discovery call/mese raddoppia la capacità di sviluppo business."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"Account manager autonomo su portafoglio e upsell libera il founder per strategy e nuovi clienti."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"Team BD + account + PM scala la struttura senza il founder su ogni cliente."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Head of growth autonomo con team scala verso nuovi verticali e mercati senza saturare la delivery."}},"processi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Template proposta con struttura fissa riduce il tempo di preparazione del 50% e migliora la qualità."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Script discovery con 7 domande chiave documenta il bisogno e aumenta il tasso di proposta accettata del 25%."},"3-4":{"pct_6m":[4,7],"pct_12m":[8,14],"pct_24m":[12,20],"note":"Playbook obiezioni agency aumenta il tasso di chiusura del 25-35% sulle trattative avanzate."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Sales playbook completo permette di replicare il processo su nuovi account con qualità costante."}},"ricavi":{"1-2":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[12,20],"note":"Primi 2 retainer mensili garantiscono 3-8k€/mese di base ricavi prevedibile."},"2-3":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"40% retainer riduce la volatilità da progetti one-shot e permette la pianificazione del team."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,26],"note":"Forecast affidabile retainer + pipeline permette di fare scelte di hiring e investimenti sul team."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"MRR retainer > 60% con contratti pluriennali stabilizza il business e permette investimenti in strumenti."}},"marketing":{"1-2":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"3 contenuti LinkedIn/settimana con dati dai progetti generano 3-6 conversazioni qualificate/mese."},"2-3":{"pct_6m":[4,8],"pct_12m":[9,16],"pct_24m":[14,24],"note":"Case study mensili con KPI misurabili generano 5-10 richieste qualificate/mese da prospect simili."},"3-4":{"pct_6m":[5,9],"pct_12m":[11,18],"pct_24m":[17,27],"note":"LinkedIn Ads con lead magnet verso CMO e marketing manager genera 5-12 lead qualificati/mese."},"4-5":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,17],"note":"Thought leadership strutturata genera 8-15 lead/mese qualificati con CAC 2-3x inferiore alla media."}},"sitoweb":{"1-2":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Portfolio con 5 case study recenti aumenta la credibilità e genera 3-5 richieste inbound/mese."},"2-3":{"pct_6m":[3,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Pagina servizi con posizionamento chiaro e ROI tipici riduce il ciclo di vendita del 20%."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"SEO su servizi + settore target genera 10-20 richieste organiche/mese qualificate."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"ROI calculator + audit gratuito automatizzato genera 5-10 lead qualificati/settimana in modo autonomo."}},"ecommerce":{"1-2":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Audit gratuito automatizzato come lead magnet cattura 5-10 contatti qualificati/mese."},"2-3":{"pct_6m":[3,6],"pct_12m":[6,12],"pct_24m":[9,18],"note":"Pacchetti servizi con prezzi indicativi online riducono il tempo di qualificazione del 30%."},"3-4":{"pct_6m":[3,5],"pct_12m":[5,9],"pct_24m":[7,12],"note":"Portale clienti con dashboard campagne e report mensili aumenta la soddisfazione e riduce il churn del 20%."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Piattaforma self-service con dashboard e billing aumenta la capacità di gestione clienti del 40%."}}},"tech_automazione":{"vendite":{"1-2":{"pct_6m":[2,5],"pct_12m":[6,11],"pct_24m":[10,18],"note":"Analisi ROI gratuita a 5 manifatturieri locali genera 2-4 opportunità qualificate/trimestre."},"2-3":{"pct_6m":[4,8],"pct_12m":[10,17],"pct_24m":[16,26],"note":"Tecnico-venditore per settore aumenta il numero di offerte presentate del 50-70%."},"3-4":{"pct_6m":[5,9],"pct_12m":[12,20],"pct_24m":[19,30],"note":"Team account per settore con pre-sales aumenta la penetrazione nei conti target del 25-40%."},"4-5":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[11,17],"note":"Responsabile commerciale con team strutturato e gestione gare internazionali scala senza il titolare."}},"pipeline":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"CRM con tracciamento opportunità complesse riduce la perdita di deal per mancato follow-up del 25%."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Pipeline con decisori mappa e documenti allegati aumenta il win-rate del 20-30%."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,12],"pct_24m":[10,17],"note":"Forecast trimestrale su commesse in offerta permette di allocare risorse progetto in anticipo."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,11],"note":"Pipeline con forecast mensile affidabile permette pianificazione risorse e approvvigionamenti."}},"team":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Ingegnere in 2 visite commerciali/mese supporta il pre-sales e aumenta la qualità dell'offerta tecnica."},"2-3":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Tecnico-venditore autonomo su analisi ROI e proposta libera il titolare per commesse strategiche."},"3-4":{"pct_6m":[4,8],"pct_12m":[9,16],"pct_24m":[14,23],"note":"Account + pre-sales + PM autonomi gestiscono il ciclo completo senza il titolare su ogni progetto."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Struttura autonoma con sales director e PM per settore scala verso mercati esteri."}},"processi":{"1-2":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Template analisi ROI standardizzato aumenta il tasso di conversione visita→offerta del 20-30%."},"2-3":{"pct_6m":[3,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Processo analisi processo cliente documentato riduce il time-to-offer del 30-40%."},"3-4":{"pct_6m":[3,6],"pct_12m":[6,11],"pct_24m":[9,16],"note":"Playbook obiezioni automazione aumenta il tasso di chiusura del 20-30% su commesse > 100k€."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Sales playbook con referenze per settore e gestione gare scala la qualità su nuovi account."}},"ricavi":{"1-2":{"pct_6m":[2,4],"pct_12m":[5,9],"pct_24m":[8,14],"note":"Contratto manutenzione preventiva annuale impianti garantisce 2-5k€/mese per impianto di MRR."},"2-3":{"pct_6m":[4,7],"pct_12m":[9,15],"pct_24m":[14,22],"note":"40% fatturato su manutenzione ricorrente riduce la volatilità da commesse one-shot."},"3-4":{"pct_6m":[4,8],"pct_12m":[9,16],"pct_24m":[14,23],"note":"Forecast annuale manutenzione + pipeline nuovi impianti permette pianificazione team e certificazioni."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Revenue ricorrente > 50% con contratti pluriennali e servizi IIoT/monitoring permette investimenti."}},"marketing":{"1-2":{"pct_6m":[1,3],"pct_12m":[3,7],"pct_24m":[6,11],"note":"Case study automazione con video e dati ROI su LinkedIn genera 3-6 richieste qualificate/mese."},"2-3":{"pct_6m":[2,5],"pct_12m":[5,10],"pct_24m":[8,15],"note":"Webinar tecnico mensile su automazione per settore genera 8-15 lead qualificati per webinar."},"3-4":{"pct_6m":[3,6],"pct_12m":[7,13],"pct_24m":[11,19],"note":"Partnership con vendor (Fanuc, KUKA, Siemens) genera referral qualificati e co-marketing."},"4-5":{"pct_6m":[3,5],"pct_12m":[6,10],"pct_24m":[9,15],"note":"Thought leadership strutturata con whitepaper ROI riduce il CAC del 35-40%."}},"sitoweb":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,5],"pct_24m":[4,8],"note":"Pagina soluzioni per settore con video impianti e ROI genera 2-4 richieste qualificate/mese."},"2-3":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Calcolatore ROI automazione online genera lead pre-qualificati con budget e urgenza definiti."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"SEO su automazione industriale + settore genera 5-10 richieste organiche/mese qualificate."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Sito con calcolatore ROI avanzato e area clienti monitoring genera lead più qualificati e riduce il ciclo."}},"ecommerce":{"1-2":{"pct_6m":[1,2],"pct_12m":[2,4],"pct_24m":[3,6],"note":"Portale partner con documentazione tecnica e demo virtuali riduce il costo di supporto del 30%."},"2-3":{"pct_6m":[1,3],"pct_12m":[3,6],"pct_24m":[5,9],"note":"Simulatore processo online genera lead pre-qualificati che arrivano alla prima call già informati."},"3-4":{"pct_6m":[2,4],"pct_12m":[4,8],"pct_24m":[6,12],"note":"Portale clienti con monitoring da remoto e ticket manutenzione aumenta la soddisfazione e il tasso di rinnovo."},"4-5":{"pct_6m":[2,4],"pct_12m":[4,7],"pct_24m":[6,10],"note":"Piattaforma IIoT con alert predittivi aumenta il valore percepito e giustifica contratti premium."}}}};

var AZIONI_TARGET_GENERIC = {
  "vendite": {
    "1-2": [],
    "1-3": [],
    "1-4": [],
    "1-5": [],
    "2-3": [],
    "2-4": [],
    "2-5": [],
    "3-4": [],
    "3-5": [],
    "4-5": []
  },
  "pipeline": {
    "1-2": [],
    "1-3": [],
    "1-4": [],
    "1-5": [],
    "2-3": [],
    "2-4": [],
    "2-5": [],
    "3-4": [],
    "3-5": [],
    "4-5": []
  },
  "team": {
    "1-2": [],
    "1-3": [],
    "1-4": [],
    "1-5": [],
    "2-3": [],
    "2-4": [],
    "2-5": [],
    "3-4": [],
    "3-5": [],
    "4-5": []
  },
  "processi": {
    "1-2": [],
    "1-3": [],
    "1-4": [],
    "1-5": [],
    "2-3": [],
    "2-4": [],
    "2-5": [],
    "3-4": [],
    "3-5": [],
    "4-5": []
  },
  "ricavi": {
    "1-2": [],
    "1-3": [],
    "1-4": [],
    "1-5": [],
    "2-3": [],
    "2-4": [],
    "2-5": [],
    "3-4": [],
    "3-5": [],
    "4-5": []
  },
  "marketing": {
    "1-2": [],
    "1-3": [],
    "1-4": [],
    "1-5": [],
    "2-3": [],
    "2-4": [],
    "2-5": [],
    "3-4": [],
    "3-5": [],
    "4-5": []
  },
  "sitoweb": {
    "1-2": [],
    "1-3": [],
    "1-4": [],
    "1-5": [],
    "2-3": [],
    "2-4": [],
    "2-5": [],
    "3-4": [],
    "3-5": [],
    "4-5": []
  },
  "ecommerce": {
    "1-2": [],
    "1-3": [],
    "1-4": [],
    "1-5": [],
    "2-3": [],
    "2-4": [],
    "2-5": [],
    "3-4": [],
    "3-5": [],
    "4-5": []
  }
};

var FAMIGLIA_SETTORE = {
  manifatturiero: 'b2b_manifatturiero',
  manifatturiero_meccanica: 'b2b_manifatturiero',
  manifatturiero_automotive: 'b2b_manifatturiero',
  manifatturiero_packaging: 'b2b_manifatturiero',
  manifatturiero_cterzi: 'b2b_manifatturiero',
  manifatturiero_elettromeccanica: 'b2b_manifatturiero',
  manifatturiero_tessile_tessuti: 'b2b_manifatturiero',
  manifatturiero_tessile_capi: 'b2b_manifatturiero',
  servizi_b2b: 'b2b_servizi',
  servizi_it: 'b2b_servizi',
  servizi_formazione: 'b2b_servizi',
  edilizia: 'edilizia',
  edilizia_residenziale: 'edilizia',
  edilizia_impianti: 'edilizia',
  edilizia_serramenti: 'distribuzione',
  commercio: 'retail',
  commercio_distribuzione_industriale: 'distribuzione',
  commercio_ingrosso_alimentare: 'distribuzione',
  commercio_materiali_edili: 'distribuzione',
  commercio_ricambi_auto: 'retail',
  commercio_abbigliamento_ingrosso: 'distribuzione',
  commercio_elettronica: 'retail',
  alimentare_birra: 'food',
  commercio_auto_moto_nuovo: 'retail',
  commercio_auto_moto_usato: 'retail',
  commercio_abbigliamento_dettaglio: 'retail',
  commercio_orologi_gioielli: 'retail',
  alimentare: 'food',
  alimentare_trasformazione: 'food',
  alimentare_vini: 'food',
  alimentare_forno: 'food',
  alimentare_conserve: 'food',
  alimentare_ingredienti: 'food',
  tech: 'tech',
  tech_saas: 'tech',
  tech_system_integrator: 'tech',
  tech_digital_agency: 'tech',
  tech_automazione: 'b2b_manifatturiero',
};

// Domande per famiglia × dimensione
// tipo: 'yn' (sì/no, score: no=0 si=1), 'mc' (scelta multipla), 'num' (numerico)
// per 'mc': opzioni: [{label, score}] dove score è 0-3
// peso: quanto conta nel totale (somma pesi = max grezzo)