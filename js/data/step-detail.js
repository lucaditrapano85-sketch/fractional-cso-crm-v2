// ============================================================================
// STEP_DETAIL_BY_SETTORE — Costi calibrati per tutti i 32 micro-mercati
// ============================================================================

// Manifatturiero
const _SD_MANIFATTURIERO = {

  // ── Meccanica (CNC, fresatura, tornitura, OEM, commesse) ──
  manifatturiero_meccanica: {
    vendite: {
      '1-2': { chi: 'Titolare / resp. commerciale', cosa: 'Mappatura clienti OEM attivi e classificazione commesse per margine', costo_mensile: 250, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Sales manager meccanica', cosa: 'Creazione listino per lavorazioni CNC e pacchetti fresatura/tornitura per segmento OEM', costo_mensile: 1500, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Team vendite + back office', cosa: 'Offertazione strutturata su commesse complesse con calcolo costi macchina e margine', costo_mensile: 3000, costo_setup: 2000, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. commerciale + KAM OEM', cosa: 'Contratti quadro pluriennali con clienti OEM e presidio diretto su top account', costo_mensile: 7000, costo_setup: 5000, tempo_mesi: 5 }
    },
    pipeline: {
      '1-2': { chi: 'Titolare', cosa: 'Elenco trattative aperte su foglio condiviso con stato e valore', costo_mensile: 30, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. commerciale', cosa: 'CRM base con pipeline per tipo lavorazione e dimensione commessa', costo_mensile: 100, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Sales ops', cosa: 'Pipeline segmentata per cliente OEM, tipo pezzo e probabilità di chiusura', costo_mensile: 350, costo_setup: 1500, tempo_mesi: 2 },
      '4-5': { chi: 'Sales ops + direzione', cosa: 'Forecasting avanzato con integrazione dati produzione e saturazione impianti', costo_mensile: 900, costo_setup: 4000, tempo_mesi: 5 }
    },
    team: {
      '1-2': { chi: 'Titolare', cosa: 'Definizione ruoli minimi: chi vende, chi fa offerte, chi segue produzione', costo_mensile: 200, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'HR + titolare', cosa: 'Inserimento back office commerciale e formazione su preventivazione CNC', costo_mensile: 2500, costo_setup: 1000, tempo_mesi: 3 },
      '3-4': { chi: 'HR + resp. commerciale', cosa: 'Team vendite dedicato con specializzazione per settore cliente e tipo commessa', costo_mensile: 4000, costo_setup: 2500, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. commerciale + HR', cosa: 'Rete vendita multicanale con KAM per grandi OEM e agenti per mercato spot', costo_mensile: 7500, costo_setup: 5000, tempo_mesi: 5 }
    },
    processi: {
      '1-2': { chi: 'Titolare', cosa: 'Documentazione iter base: richiesta offerta, conferma ordine, avvio commessa', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. operations', cosa: 'Processo strutturato offerta-ordine con verifica fattibilità e tempi macchina', costo_mensile: 400, costo_setup: 800, tempo_mesi: 2 },
      '3-4': { chi: 'Operations + qualità', cosa: 'Workflow integrato dal preventivo alla consegna con controllo qualità in-process', costo_mensile: 800, costo_setup: 3000, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. operations + IT', cosa: 'Digitalizzazione completa del ciclo commessa con MES e tracciabilità pezzi', costo_mensile: 3500, costo_setup: 10000, tempo_mesi: 6 }
    },
    ricavi: {
      '1-2': { chi: 'Titolare', cosa: 'Analisi fatturato per cliente e margine lordo per tipo lavorazione', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Controller / commerciale', cosa: 'Report mensile ricavi per segmento OEM e incidenza costi variabili macchina', costo_mensile: 200, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Controller', cosa: 'Dashboard ricavi con analisi margine per commessa e saturazione impianto', costo_mensile: 500, costo_setup: 2000, tempo_mesi: 2 },
      '4-5': { chi: 'CFO + dir. commerciale', cosa: 'Modello predittivo ricavi basato su portafoglio ordini e pipeline pesata', costo_mensile: 1000, costo_setup: 4000, tempo_mesi: 5 }
    },
    marketing: {
      '1-2': { chi: 'Titolare / esterno', cosa: 'Schede tecniche lavorazioni e presentazione aziendale per fiere di settore', costo_mensile: 200, costo_setup: 300, tempo_mesi: 1 },
      '2-3': { chi: 'Marketing specialist', cosa: 'Catalogo digitale lavorazioni CNC con case study e certificazioni qualità', costo_mensile: 1000, costo_setup: 1500, tempo_mesi: 2 },
      '3-4': { chi: 'Team marketing', cosa: 'Content marketing tecnico con video lavorazioni e presenza su portali industriali', costo_mensile: 1800, costo_setup: 3500, tempo_mesi: 3 },
      '4-5': { chi: 'Marketing manager + agenzia', cosa: 'Strategia omnicanale con fiere internazionali, LinkedIn B2B e lead generation OEM', costo_mensile: 4000, costo_setup: 8000, tempo_mesi: 5 }
    },
    sitoweb: {
      '1-2': { chi: 'Agenzia / freelance', cosa: 'Sito vetrina con pagine lavorazioni, parco macchine e form contatto', costo_mensile: 80, costo_setup: 500, tempo_mesi: 1 },
      '2-3': { chi: 'Web agency', cosa: 'Sito ottimizzato SEO con schede tecniche macchine e richiesta preventivo online', costo_mensile: 300, costo_setup: 2000, tempo_mesi: 2 },
      '3-4': { chi: 'Web agency + marketing', cosa: 'Portale con area clienti, tracking commesse e catalogo interattivo lavorazioni', costo_mensile: 600, costo_setup: 4000, tempo_mesi: 3 },
      '4-5': { chi: 'Team digitale + agenzia', cosa: 'Piattaforma digitale con configuratore pezzi, RFQ online e portale clienti OEM', costo_mensile: 1000, costo_setup: 8000, tempo_mesi: 5 }
    },
    ecommerce: {
      '1-2': { chi: 'N/A', cosa: 'Non applicabile: produzione su commessa, focus su preventivazione diretta', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. commerciale', cosa: 'Sistema RFQ online per richiesta preventivi su lavorazioni standard ripetitive', costo_mensile: 300, costo_setup: 1500, tempo_mesi: 2 },
      '3-4': { chi: 'Team digitale', cosa: 'Portale ordini per clienti ricorrenti con listino dedicato e storico commesse', costo_mensile: 1000, costo_setup: 4000, tempo_mesi: 3 },
      '4-5': { chi: 'E-commerce manager + IT', cosa: 'Piattaforma B2B con quotazione automatica pezzi standard e gestione ordini OEM', costo_mensile: 2500, costo_setup: 10000, tempo_mesi: 5 }
    }
  },

  // ── Automotive (componentistica, Tier1/Tier2, IATF) ──
  manifatturiero_automotive: {
    vendite: {
      '1-2': { chi: 'Titolare / resp. commerciale', cosa: 'Censimento clienti Tier1/Tier2 attivi e analisi volumi per codice componente', costo_mensile: 250, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Sales manager automotive', cosa: 'Strutturazione offerte per componentistica con logica PPAP e requisiti IATF', costo_mensile: 1800, costo_setup: 800, tempo_mesi: 3 },
      '3-4': { chi: 'Team vendite + quality', cosa: 'Gestione gare e nomination con documentazione APQP e analisi costi target', costo_mensile: 3500, costo_setup: 3000, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. commerciale + KAM Tier1', cosa: 'Partnership strategiche con OEM e Tier1 con contratti life-of-program', costo_mensile: 8500, costo_setup: 6000, tempo_mesi: 6 }
    },
    pipeline: {
      '1-2': { chi: 'Titolare', cosa: 'Lista progetti in corso e nomination pendenti con scadenze e volumi', costo_mensile: 30, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. commerciale', cosa: 'CRM con tracking nomination, fase APQP e probabilità di aggiudicazione', costo_mensile: 100, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Sales ops', cosa: 'Pipeline per programma veicolo con volumi previsti e timeline SOP/EOP', costo_mensile: 400, costo_setup: 2000, tempo_mesi: 2 },
      '4-5': { chi: 'Sales ops + direzione', cosa: 'Forecast pluriennale per programma con simulazione scenari volumi e mix prodotto', costo_mensile: 1100, costo_setup: 5000, tempo_mesi: 5 }
    },
    team: {
      '1-2': { chi: 'Titolare', cosa: 'Identificazione competenze IATF nel team e gap di copertura commerciale', costo_mensile: 200, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'HR + titolare', cosa: 'Inserimento figure con esperienza automotive e formazione su requisiti IATF 16949', costo_mensile: 3000, costo_setup: 1500, tempo_mesi: 3 },
      '3-4': { chi: 'HR + dir. commerciale', cosa: 'Team vendite con project manager dedicati per cliente Tier1 e supporto qualità', costo_mensile: 4500, costo_setup: 3000, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. commerciale + HR', cosa: 'Organizzazione commerciale con KAM per OEM, team gare e ufficio tecnico vendite', costo_mensile: 8000, costo_setup: 5000, tempo_mesi: 5 }
    },
    processi: {
      '1-2': { chi: 'Titolare', cosa: 'Mappatura processo base: richiesta quotazione, PPAP, avvio serie', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Quality + commerciale', cosa: 'Processo strutturato conforme APQP con gate review e documentazione PPAP', costo_mensile: 500, costo_setup: 1200, tempo_mesi: 3 },
      '3-4': { chi: 'Operations + qualità', cosa: 'Workflow IATF completo dalla quotazione alla produzione serie con audit trail', costo_mensile: 900, costo_setup: 4000, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. operations + IT', cosa: 'Sistema integrato ERP-qualità con tracciabilità lotto, gestione reclami e KPI IATF', costo_mensile: 4500, costo_setup: 15000, tempo_mesi: 6 }
    },
    ricavi: {
      '1-2': { chi: 'Titolare', cosa: 'Analisi fatturato per cliente Tier e margine per famiglia componente', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Controller', cosa: 'Report ricavi per programma veicolo con analisi scostamento vs target price', costo_mensile: 200, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Controller + commerciale', cosa: 'Dashboard marginalità per codice con analisi impatto scarti e costi qualità', costo_mensile: 500, costo_setup: 2500, tempo_mesi: 2 },
      '4-5': { chi: 'CFO + dir. commerciale', cosa: 'Modello ricavi pluriennale per programma con simulazione phase-in/phase-out', costo_mensile: 1100, costo_setup: 5000, tempo_mesi: 5 }
    },
    marketing: {
      '1-2': { chi: 'Titolare / esterno', cosa: 'Company profile con certificazioni IATF, capacità produttive e case history', costo_mensile: 200, costo_setup: 500, tempo_mesi: 1 },
      '2-3': { chi: 'Marketing specialist', cosa: 'Materiali per fiere automotive e presentazioni tecniche per audit cliente', costo_mensile: 1000, costo_setup: 2000, tempo_mesi: 2 },
      '3-4': { chi: 'Team marketing', cosa: 'Posizionamento su portali automotive, content tecnico e presenza a fiere Tier1', costo_mensile: 1800, costo_setup: 4000, tempo_mesi: 3 },
      '4-5': { chi: 'Marketing manager + agenzia', cosa: 'Branding Tier1 con fiere internazionali, PR settore e thought leadership tecnico', costo_mensile: 4500, costo_setup: 10000, tempo_mesi: 5 }
    },
    sitoweb: {
      '1-2': { chi: 'Agenzia / freelance', cosa: 'Sito vetrina con certificazioni IATF, capacità produttive e contatti', costo_mensile: 80, costo_setup: 500, tempo_mesi: 1 },
      '2-3': { chi: 'Web agency', cosa: 'Sito con area tecnica, schede prodotto per famiglia e sezione certificazioni', costo_mensile: 300, costo_setup: 2500, tempo_mesi: 2 },
      '3-4': { chi: 'Web agency + marketing', cosa: 'Portale con area riservata clienti, documenti PPAP scaricabili e news settore', costo_mensile: 600, costo_setup: 4500, tempo_mesi: 3 },
      '4-5': { chi: 'Team digitale + agenzia', cosa: 'Piattaforma digitale con portale fornitori, tracking qualità e reportistica OEM', costo_mensile: 1000, costo_setup: 9000, tempo_mesi: 5 }
    },
    ecommerce: {
      '1-2': { chi: 'N/A', cosa: 'Non applicabile: componentistica automotive su commessa e programma veicolo', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. commerciale', cosa: 'Portale ordini ricambi aftermarket per distributori e officine autorizzate', costo_mensile: 400, costo_setup: 2000, tempo_mesi: 3 },
      '3-4': { chi: 'Team digitale', cosa: 'Piattaforma B2B aftermarket con catalogo ricambi, disponibilità e ordini online', costo_mensile: 1200, costo_setup: 5000, tempo_mesi: 3 },
      '4-5': { chi: 'E-commerce manager + IT', cosa: 'Marketplace aftermarket integrato con gestione resi, garanzie e logistica dedicata', costo_mensile: 3000, costo_setup: 12000, tempo_mesi: 6 }
    }
  },

  // ── Packaging (imballaggi, converting, grande distribuzione) ──
  manifatturiero_packaging: {
    vendite: {
      '1-2': { chi: 'Titolare / resp. commerciale', cosa: 'Mappatura clienti GDO e industria con analisi volumi imballaggio per formato', costo_mensile: 250, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Sales manager packaging', cosa: 'Listino per formato e materiale con offerte per lotti converting e private label', costo_mensile: 1200, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Team vendite + R&D', cosa: 'Proposte commerciali con prototipi personalizzati e analisi costo/imballo per GDO', costo_mensile: 2800, costo_setup: 2000, tempo_mesi: 2 },
      '4-5': { chi: 'Dir. commerciale + KAM GDO', cosa: 'Accordi quadro con catene GDO e contratti annuali con brand industriali', costo_mensile: 7500, costo_setup: 4000, tempo_mesi: 5 }
    },
    pipeline: {
      '1-2': { chi: 'Titolare', cosa: 'Elenco trattative per cliente con volumi stimati e tipo imballo richiesto', costo_mensile: 30, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. commerciale', cosa: 'CRM con pipeline per canale (GDO, industria, food) e fase trattativa', costo_mensile: 100, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Sales ops', cosa: 'Pipeline segmentata per formato imballo, materiale e probabilità di conversione', costo_mensile: 350, costo_setup: 1500, tempo_mesi: 2 },
      '4-5': { chi: 'Sales ops + direzione', cosa: 'Forecasting con previsione volumi stagionali e impatto variazione costi materia prima', costo_mensile: 1000, costo_setup: 4500, tempo_mesi: 5 }
    },
    team: {
      '1-2': { chi: 'Titolare', cosa: 'Definizione ruoli: vendita, customer service, gestione ordini converting', costo_mensile: 200, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'HR + titolare', cosa: 'Inserimento commerciale con esperienza packaging e customer service dedicato', costo_mensile: 2500, costo_setup: 800, tempo_mesi: 2 },
      '3-4': { chi: 'HR + resp. commerciale', cosa: 'Team vendite per canale con supporto tecnico per sviluppo imballi custom', costo_mensile: 3800, costo_setup: 2000, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. commerciale + HR', cosa: 'Rete vendita nazionale con KAM GDO, agenti per industria e team export', costo_mensile: 7000, costo_setup: 4000, tempo_mesi: 5 }
    },
    processi: {
      '1-2': { chi: 'Titolare', cosa: 'Iter base: richiesta campione, approvazione grafica, ordine, produzione', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. operations', cosa: 'Processo strutturato con gestione campionature, approvazione colore e avvio stampa', costo_mensile: 350, costo_setup: 800, tempo_mesi: 2 },
      '3-4': { chi: 'Operations + qualità', cosa: 'Workflow dalla campionatura alla consegna con controllo qualità stampa e imballo', costo_mensile: 700, costo_setup: 2500, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. operations + IT', cosa: 'Sistema integrato con pianificazione converting, tracciabilità lotti e EDI con GDO', costo_mensile: 3000, costo_setup: 10000, tempo_mesi: 5 }
    },
    ricavi: {
      '1-2': { chi: 'Titolare', cosa: 'Analisi fatturato per cliente e margine per tipo imballo e materiale', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Controller', cosa: 'Report ricavi per canale con monitoraggio incidenza materia prima su margine', costo_mensile: 200, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Controller + commerciale', cosa: 'Dashboard marginalità per formato con analisi impatto scarti converting e rese', costo_mensile: 450, costo_setup: 2000, tempo_mesi: 2 },
      '4-5': { chi: 'CFO + dir. commerciale', cosa: 'Modello predittivo ricavi con simulazione variazione costi carta/plastica/film', costo_mensile: 1000, costo_setup: 4000, tempo_mesi: 5 }
    },
    marketing: {
      '1-2': { chi: 'Titolare / esterno', cosa: 'Catalogo formati imballo con specifiche tecniche e certificazioni alimentari', costo_mensile: 200, costo_setup: 400, tempo_mesi: 1 },
      '2-3': { chi: 'Marketing specialist', cosa: 'Materiali per fiere packaging con case study sostenibilità e soluzioni green', costo_mensile: 800, costo_setup: 1500, tempo_mesi: 2 },
      '3-4': { chi: 'Team marketing', cosa: 'Content su packaging sostenibile, trend GDO e partecipazione a fiere converting', costo_mensile: 1500, costo_setup: 3500, tempo_mesi: 3 },
      '4-5': { chi: 'Marketing manager + agenzia', cosa: 'Branding settore con campagne sostenibilità, fiere internazionali e PR trade', costo_mensile: 3500, costo_setup: 8000, tempo_mesi: 5 }
    },
    sitoweb: {
      '1-2': { chi: 'Agenzia / freelance', cosa: 'Sito vetrina con catalogo formati, materiali disponibili e form contatto', costo_mensile: 80, costo_setup: 500, tempo_mesi: 1 },
      '2-3': { chi: 'Web agency', cosa: 'Sito con configuratore imballo base, galleria progetti e area certificazioni', costo_mensile: 300, costo_setup: 2000, tempo_mesi: 2 },
      '3-4': { chi: 'Web agency + marketing', cosa: 'Portale con preventivatore online, area clienti e catalogo interattivo formati', costo_mensile: 550, costo_setup: 4000, tempo_mesi: 3 },
      '4-5': { chi: 'Team digitale + agenzia', cosa: 'Piattaforma con configuratore 3D imballo, ordini online e integrazione EDI GDO', costo_mensile: 1000, costo_setup: 9000, tempo_mesi: 5 }
    },
    ecommerce: {
      '1-2': { chi: 'N/A', cosa: 'Non applicabile in fase iniziale: focus su ordini diretti e grandi volumi', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. commerciale', cosa: 'Shop B2B per imballi standard a catalogo con ordine minimo e spedizione', costo_mensile: 350, costo_setup: 1500, tempo_mesi: 2 },
      '3-4': { chi: 'Team digitale', cosa: 'E-commerce B2B con listino personalizzato per cliente e riordino automatico', costo_mensile: 1000, costo_setup: 4500, tempo_mesi: 3 },
      '4-5': { chi: 'E-commerce manager + IT', cosa: 'Marketplace B2B packaging con personalizzazione grafica online e logistica integrata', costo_mensile: 2500, costo_setup: 10000, tempo_mesi: 5 }
    }
  },

  // ── Conto Terzi (lavorazioni conto terzi, subfornitura) ──
  manifatturiero_cterzi: {
    vendite: {
      '1-2': { chi: 'Titolare / resp. commerciale', cosa: 'Censimento clienti attivi e analisi fatturato per tipo lavorazione conto terzi', costo_mensile: 250, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Sales manager subfornitura', cosa: 'Listino lavorazioni con pricing per volume e complessità, offerte strutturate', costo_mensile: 1200, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Team vendite + uff. tecnico', cosa: 'Proposte tecniche con analisi fattibilità, tempi ciclo e ottimizzazione costi cliente', costo_mensile: 2800, costo_setup: 2000, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. commerciale + KAM', cosa: 'Contratti quadro di subfornitura con SLA, penali e revisione prezzi indicizzata', costo_mensile: 6500, costo_setup: 3500, tempo_mesi: 5 }
    },
    pipeline: {
      '1-2': { chi: 'Titolare', cosa: 'Lista richieste preventivo aperte con tipo lavorazione e valore stimato', costo_mensile: 30, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. commerciale', cosa: 'CRM con pipeline per tipo lavorazione, cliente e fase di quotazione', costo_mensile: 100, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Sales ops', cosa: 'Pipeline con analisi capacità produttiva disponibile e priorità per margine', costo_mensile: 300, costo_setup: 1500, tempo_mesi: 2 },
      '4-5': { chi: 'Sales ops + direzione', cosa: 'Forecast integrato con pianificazione capacità e ottimizzazione mix lavorazioni', costo_mensile: 900, costo_setup: 4000, tempo_mesi: 5 }
    },
    team: {
      '1-2': { chi: 'Titolare', cosa: 'Ruoli base: chi quota, chi pianifica, chi gestisce il rapporto cliente', costo_mensile: 200, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'HR + titolare', cosa: 'Inserimento preventivista tecnico e rafforzamento customer service operativo', costo_mensile: 2500, costo_setup: 800, tempo_mesi: 2 },
      '3-4': { chi: 'HR + resp. commerciale', cosa: 'Team commerciale con figure tecniche per quotazione e gestione commessa cliente', costo_mensile: 3500, costo_setup: 2000, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. commerciale + HR', cosa: 'Rete vendita con KAM per clienti strategici e agenti per acquisizione nuovi mandati', costo_mensile: 6500, costo_setup: 3500, tempo_mesi: 5 }
    },
    processi: {
      '1-2': { chi: 'Titolare', cosa: 'Iter base: richiesta preventivo, conferma, lancio produzione, consegna', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. operations', cosa: 'Processo strutturato con verifica fattibilità, pianificazione e conferma tempi', costo_mensile: 300, costo_setup: 600, tempo_mesi: 2 },
      '3-4': { chi: 'Operations + qualità', cosa: 'Workflow completo con gestione modifiche tecniche, non conformità e azioni correttive', costo_mensile: 700, costo_setup: 2500, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. operations + IT', cosa: 'Sistema integrato con portale cliente per tracking ordini e condivisione documenti', costo_mensile: 2500, costo_setup: 8000, tempo_mesi: 5 }
    },
    ricavi: {
      '1-2': { chi: 'Titolare', cosa: 'Analisi fatturato per cliente e margine per tipo lavorazione conto terzi', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Controller', cosa: 'Report ricavi per cliente con analisi ore lavorate vs preventivate e margine reale', costo_mensile: 200, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Controller + commerciale', cosa: 'Dashboard marginalità per commessa con analisi efficienza e scostamenti costo', costo_mensile: 400, costo_setup: 1800, tempo_mesi: 2 },
      '4-5': { chi: 'CFO + dir. commerciale', cosa: 'Modello ricavi con simulazione saturazione impianti e ottimizzazione mix clienti', costo_mensile: 900, costo_setup: 3500, tempo_mesi: 5 }
    },
    marketing: {
      '1-2': { chi: 'Titolare / esterno', cosa: 'Presentazione aziendale con capacità produttive, parco macchine e referenze', costo_mensile: 200, costo_setup: 300, tempo_mesi: 1 },
      '2-3': { chi: 'Marketing specialist', cosa: 'Profilo su portali subfornitura, schede lavorazioni e presenza su MecSpe/SPS', costo_mensile: 800, costo_setup: 1200, tempo_mesi: 2 },
      '3-4': { chi: 'Team marketing', cosa: 'Content tecnico su lavorazioni specializzate, video impianti e case study clienti', costo_mensile: 1500, costo_setup: 3000, tempo_mesi: 3 },
      '4-5': { chi: 'Marketing manager + agenzia', cosa: 'Strategia di posizionamento subfornitura con fiere, PR settore e lead generation B2B', costo_mensile: 3500, costo_setup: 7000, tempo_mesi: 5 }
    },
    sitoweb: {
      '1-2': { chi: 'Agenzia / freelance', cosa: 'Sito vetrina con elenco lavorazioni, parco macchine e modulo contatto', costo_mensile: 80, costo_setup: 500, tempo_mesi: 1 },
      '2-3': { chi: 'Web agency', cosa: 'Sito con schede lavorazioni dettagliate, gallery e form richiesta preventivo', costo_mensile: 300, costo_setup: 1800, tempo_mesi: 2 },
      '3-4': { chi: 'Web agency + marketing', cosa: 'Portale con area clienti, upload disegni tecnici e tracking stato commesse', costo_mensile: 500, costo_setup: 3500, tempo_mesi: 3 },
      '4-5': { chi: 'Team digitale + agenzia', cosa: 'Piattaforma con quotazione online lavorazioni standard e portale collaborativo', costo_mensile: 900, costo_setup: 7000, tempo_mesi: 5 }
    },
    ecommerce: {
      '1-2': { chi: 'N/A', cosa: 'Non applicabile: lavorazioni su specifica cliente, no prodotto a catalogo', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. commerciale', cosa: 'Form RFQ online con upload disegno tecnico e richiesta preventivo automatica', costo_mensile: 250, costo_setup: 1000, tempo_mesi: 2 },
      '3-4': { chi: 'Team digitale', cosa: 'Portale ordini per lavorazioni ricorrenti con listino cliente e riordino rapido', costo_mensile: 800, costo_setup: 3500, tempo_mesi: 3 },
      '4-5': { chi: 'E-commerce manager + IT', cosa: 'Piattaforma quotazione istantanea per lavorazioni standard con checkout B2B', costo_mensile: 2000, costo_setup: 8000, tempo_mesi: 5 }
    }
  },

  // ── Elettromeccanica (quadri elettrici, automazione, impiantistica) ──
  manifatturiero_elettromeccanica: {
    vendite: {
      '1-2': { chi: 'Titolare / resp. commerciale', cosa: 'Mappatura clienti per tipo impianto e analisi commesse quadri elettrici attive', costo_mensile: 250, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Sales manager automazione', cosa: 'Offertazione strutturata per quadri e impianti con distinta componenti e margine', costo_mensile: 1500, costo_setup: 600, tempo_mesi: 2 },
      '3-4': { chi: 'Team vendite + progettisti', cosa: 'Proposte tecniche per automazione industriale con studio fattibilità e ROI cliente', costo_mensile: 3200, costo_setup: 2500, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. commerciale + KAM', cosa: 'Contratti quadro impiantistica con SLA manutenzione e progetti chiavi in mano', costo_mensile: 8000, costo_setup: 5000, tempo_mesi: 5 }
    },
    pipeline: {
      '1-2': { chi: 'Titolare', cosa: 'Lista offerte aperte per quadri e impianti con valore e stato trattativa', costo_mensile: 30, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. commerciale', cosa: 'CRM con pipeline per tipo impianto, settore cliente e fase progetto', costo_mensile: 100, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Sales ops', cosa: 'Pipeline con tracking commesse automazione e analisi capacità progettazione', costo_mensile: 400, costo_setup: 1800, tempo_mesi: 2 },
      '4-5': { chi: 'Sales ops + direzione', cosa: 'Forecast per linea prodotto con simulazione carico ufficio tecnico e produzione', costo_mensile: 1000, costo_setup: 4500, tempo_mesi: 5 }
    },
    team: {
      '1-2': { chi: 'Titolare', cosa: 'Definizione ruoli: vendita, progettazione, cablaggio, commissioning', costo_mensile: 200, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'HR + titolare', cosa: 'Inserimento tecnico commerciale con competenze automazione e quadristica', costo_mensile: 2800, costo_setup: 1000, tempo_mesi: 3 },
      '3-4': { chi: 'HR + resp. commerciale', cosa: 'Team con venditori tecnici, project manager e supporto pre-vendita progettazione', costo_mensile: 4200, costo_setup: 2500, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. commerciale + HR', cosa: 'Organizzazione con KAM per settore, team gare e ufficio tecnico commerciale', costo_mensile: 7500, costo_setup: 4500, tempo_mesi: 5 }
    },
    processi: {
      '1-2': { chi: 'Titolare', cosa: 'Iter base: sopralluogo, preventivo, progettazione, produzione, collaudo', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. operations', cosa: 'Processo strutturato con milestone progettuali e gestione modifiche in corso', costo_mensile: 400, costo_setup: 1000, tempo_mesi: 2 },
      '3-4': { chi: 'Operations + progettazione', cosa: 'Workflow completo dalla specifica al collaudo con gestione documentazione tecnica', costo_mensile: 800, costo_setup: 3000, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. operations + IT', cosa: 'Sistema integrato con PDM, gestione commesse e documentazione CE/conformità', costo_mensile: 4000, costo_setup: 12000, tempo_mesi: 6 }
    },
    ricavi: {
      '1-2': { chi: 'Titolare', cosa: 'Analisi fatturato per tipo impianto e margine per commessa completata', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Controller', cosa: 'Report ricavi per linea con analisi scostamento ore progettazione vs preventivo', costo_mensile: 200, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Controller + commerciale', cosa: 'Dashboard marginalità per commessa con analisi costi componenti e manodopera', costo_mensile: 500, costo_setup: 2000, tempo_mesi: 2 },
      '4-5': { chi: 'CFO + dir. commerciale', cosa: 'Modello ricavi con previsione su portafoglio commesse e contratti manutenzione', costo_mensile: 1000, costo_setup: 4500, tempo_mesi: 5 }
    },
    marketing: {
      '1-2': { chi: 'Titolare / esterno', cosa: 'Schede tecniche quadri e impianti con certificazioni e referenze settoriali', costo_mensile: 200, costo_setup: 300, tempo_mesi: 1 },
      '2-3': { chi: 'Marketing specialist', cosa: 'Case study impianti realizzati con specifiche tecniche e risultati ottenuti', costo_mensile: 900, costo_setup: 1500, tempo_mesi: 2 },
      '3-4': { chi: 'Team marketing', cosa: 'Content tecnico su automazione industriale, video impianti e fiere SPS/Mecspe', costo_mensile: 1700, costo_setup: 3500, tempo_mesi: 3 },
      '4-5': { chi: 'Marketing manager + agenzia', cosa: 'Strategia omnicanale con webinar tecnici, fiere internazionali e PR settore', costo_mensile: 4000, costo_setup: 8000, tempo_mesi: 5 }
    },
    sitoweb: {
      '1-2': { chi: 'Agenzia / freelance', cosa: 'Sito vetrina con portfolio impianti, certificazioni e richiesta sopralluogo', costo_mensile: 80, costo_setup: 500, tempo_mesi: 1 },
      '2-3': { chi: 'Web agency', cosa: 'Sito con schede prodotto per linea, gallery progetti e area documentazione', costo_mensile: 300, costo_setup: 2000, tempo_mesi: 2 },
      '3-4': { chi: 'Web agency + marketing', cosa: 'Portale con configuratore quadri base, area clienti e documentazione tecnica', costo_mensile: 600, costo_setup: 4500, tempo_mesi: 3 },
      '4-5': { chi: 'Team digitale + agenzia', cosa: 'Piattaforma con configuratore impianti, preventivazione guidata e portale assistenza', costo_mensile: 1100, costo_setup: 9000, tempo_mesi: 5 }
    },
    ecommerce: {
      '1-2': { chi: 'N/A', cosa: 'Non applicabile: impianti su commessa, focus su vendita progettuale diretta', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. commerciale', cosa: 'Shop B2B per componentistica standard e ricambi quadri con ordine diretto', costo_mensile: 350, costo_setup: 1500, tempo_mesi: 2 },
      '3-4': { chi: 'Team digitale', cosa: 'E-commerce ricambi e componenti standard con gestione scorte e spedizione', costo_mensile: 1100, costo_setup: 4500, tempo_mesi: 3 },
      '4-5': { chi: 'E-commerce manager + IT', cosa: 'Piattaforma B2B completa con ricambi, accessori e contratti manutenzione online', costo_mensile: 2800, costo_setup: 10000, tempo_mesi: 5 }
    }
  },

  // ── Tessile Tessuti (tessiture, finissaggio, converter) ──
  manifatturiero_tessile_tessuti: {
    vendite: {
      '1-2': { chi: 'Titolare / resp. commerciale', cosa: 'Mappatura clienti converter e confezionisti con analisi metrature per articolo', costo_mensile: 250, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Sales manager tessile', cosa: 'Cartella campioni strutturata con listino per articolo, finissaggio e quantità', costo_mensile: 1300, costo_setup: 600, tempo_mesi: 2 },
      '3-4': { chi: 'Team vendite + R&D tessile', cosa: 'Sviluppo articoli su richiesta con proposte trend stagionali e campionatura dedicata', costo_mensile: 2800, costo_setup: 2500, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. commerciale + KAM brand', cosa: 'Partnership con brand moda e converter internazionali su collezioni esclusive', costo_mensile: 7000, costo_setup: 4000, tempo_mesi: 5 }
    },
    pipeline: {
      '1-2': { chi: 'Titolare', cosa: 'Lista clienti con campioni inviati, feedback e ordini attesi per stagione', costo_mensile: 30, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. commerciale', cosa: 'CRM con pipeline per stagione, tipo articolo e fase di campionatura', costo_mensile: 100, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Sales ops', cosa: 'Pipeline stagionale con tracking campioni, approvazioni e previsione ordini', costo_mensile: 350, costo_setup: 1500, tempo_mesi: 2 },
      '4-5': { chi: 'Sales ops + direzione', cosa: 'Forecasting per stagione e articolo con analisi sell-through e riassortimenti', costo_mensile: 900, costo_setup: 4000, tempo_mesi: 5 }
    },
    team: {
      '1-2': { chi: 'Titolare', cosa: 'Ruoli base: vendita, campionatura, gestione ordini tessitura/finissaggio', costo_mensile: 200, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'HR + titolare', cosa: 'Inserimento agente tessile e rafforzamento ufficio campionario e customer care', costo_mensile: 2500, costo_setup: 800, tempo_mesi: 2 },
      '3-4': { chi: 'HR + resp. commerciale', cosa: 'Team vendite con specialisti per mercato moda e arredamento, supporto tecnico', costo_mensile: 3800, costo_setup: 2000, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. commerciale + HR', cosa: 'Rete agenti Italia/estero con showroom, KAM brand e team sviluppo prodotto', costo_mensile: 7000, costo_setup: 4000, tempo_mesi: 5 }
    },
    processi: {
      '1-2': { chi: 'Titolare', cosa: 'Iter base: richiesta campione, tessitura prova, finissaggio, spedizione', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. operations', cosa: 'Processo campionatura strutturato con tempistiche per fase e gestione varianti', costo_mensile: 350, costo_setup: 700, tempo_mesi: 2 },
      '3-4': { chi: 'Operations + qualità', cosa: 'Workflow dalla cartella colori alla consegna con controllo qualità tessuto in-line', costo_mensile: 700, costo_setup: 2500, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. operations + IT', cosa: 'Sistema integrato con gestione ricette colore, tracciabilità filati e certificazioni', costo_mensile: 3000, costo_setup: 9000, tempo_mesi: 5 }
    },
    ricavi: {
      '1-2': { chi: 'Titolare', cosa: 'Analisi fatturato per cliente e margine per articolo tessuto e finissaggio', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Controller', cosa: 'Report ricavi per stagione con analisi incidenza filati e costi finissaggio', costo_mensile: 200, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Controller + commerciale', cosa: 'Dashboard marginalità per articolo con analisi rese telaio e scarti tintoria', costo_mensile: 450, costo_setup: 1800, tempo_mesi: 2 },
      '4-5': { chi: 'CFO + dir. commerciale', cosa: 'Modello ricavi stagionale con simulazione variazione costi filati e mix articoli', costo_mensile: 900, costo_setup: 3500, tempo_mesi: 5 }
    },
    marketing: {
      '1-2': { chi: 'Titolare / esterno', cosa: 'Cartella tessuti con hand-feel, composizioni e applicazioni per mercato', costo_mensile: 200, costo_setup: 400, tempo_mesi: 1 },
      '2-3': { chi: 'Marketing specialist', cosa: 'Lookbook stagionale con trend colori, materiali sostenibili e certificazioni', costo_mensile: 900, costo_setup: 1500, tempo_mesi: 2 },
      '3-4': { chi: 'Team marketing', cosa: 'Presenza a Premiere Vision e fiere tessili con campagne trend e sostenibilità', costo_mensile: 1700, costo_setup: 4000, tempo_mesi: 3 },
      '4-5': { chi: 'Marketing manager + agenzia', cosa: 'Branding tessile con showroom, collaborazioni designer e campagne internazionali', costo_mensile: 3800, costo_setup: 9000, tempo_mesi: 5 }
    },
    sitoweb: {
      '1-2': { chi: 'Agenzia / freelance', cosa: 'Sito vetrina con gallery tessuti, composizioni e form richiesta campioni', costo_mensile: 80, costo_setup: 500, tempo_mesi: 1 },
      '2-3': { chi: 'Web agency', cosa: 'Sito con catalogo tessuti filtrabile per composizione, peso e destinazione uso', costo_mensile: 300, costo_setup: 2000, tempo_mesi: 2 },
      '3-4': { chi: 'Web agency + marketing', cosa: 'Portale con area clienti, ordine campioni online e archivio collezioni stagionali', costo_mensile: 600, costo_setup: 4000, tempo_mesi: 3 },
      '4-5': { chi: 'Team digitale + agenzia', cosa: 'Piattaforma con showroom virtuale, ordine metratura online e gestione riassortimenti', costo_mensile: 1000, costo_setup: 8000, tempo_mesi: 5 }
    },
    ecommerce: {
      '1-2': { chi: 'N/A', cosa: 'Non applicabile in fase iniziale: vendita tramite campionario e agenti', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. commerciale', cosa: 'Shop B2B per tessuti a stock con ordine minimo per pezza e taglio campione', costo_mensile: 300, costo_setup: 1500, tempo_mesi: 2 },
      '3-4': { chi: 'Team digitale', cosa: 'E-commerce B2B con listino per cliente, riordino rapido e tracking spedizione', costo_mensile: 900, costo_setup: 4000, tempo_mesi: 3 },
      '4-5': { chi: 'E-commerce manager + IT', cosa: 'Piattaforma tessuti con campionatura digitale, ordini online e integrazione ERP', costo_mensile: 2500, costo_setup: 9000, tempo_mesi: 5 }
    }
  },

  // ── Tessile Capi (confezione, pronto moda, private label) ──
  manifatturiero_tessile_capi: {
    vendite: {
      '1-2': { chi: 'Titolare / resp. commerciale', cosa: 'Censimento clienti brand e analisi fatturato per tipo capo e private label', costo_mensile: 250, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Sales manager moda', cosa: 'Offerte per collezione con pricing per capo, MOQ e tempi consegna pronto moda', costo_mensile: 1400, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Team vendite + sviluppo', cosa: 'Proposte private label con prototipi, sdifettamento e industrializzazione capo', costo_mensile: 3000, costo_setup: 2500, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. commerciale + KAM brand', cosa: 'Partnership con brand internazionali per produzioni continuative e capsule collection', costo_mensile: 7500, costo_setup: 4500, tempo_mesi: 5 }
    },
    pipeline: {
      '1-2': { chi: 'Titolare', cosa: 'Lista brand con campioni inviati, ordini attesi e stagione di riferimento', costo_mensile: 30, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. commerciale', cosa: 'CRM con pipeline per brand, stagione e fase sviluppo capo/approvazione', costo_mensile: 100, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Sales ops', cosa: 'Pipeline per collezione con tracking prototipi, fit session e conferme ordine', costo_mensile: 350, costo_setup: 1500, tempo_mesi: 2 },
      '4-5': { chi: 'Sales ops + direzione', cosa: 'Forecast stagionale per brand con analisi riassortimenti e programmi continuativi', costo_mensile: 1000, costo_setup: 4500, tempo_mesi: 5 }
    },
    team: {
      '1-2': { chi: 'Titolare', cosa: 'Ruoli base: commerciale, modellista, responsabile produzione confezione', costo_mensile: 200, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'HR + titolare', cosa: 'Inserimento commerciale moda e rafforzamento ufficio stile/modelleria', costo_mensile: 2800, costo_setup: 1000, tempo_mesi: 3 },
      '3-4': { chi: 'HR + resp. commerciale', cosa: 'Team vendite con specialisti per fast fashion e private label, supporto tecnico', costo_mensile: 4000, costo_setup: 2500, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. commerciale + HR', cosa: 'Rete vendita con showroom, KAM brand internazionali e team sviluppo prodotto', costo_mensile: 7500, costo_setup: 5000, tempo_mesi: 5 }
    },
    processi: {
      '1-2': { chi: 'Titolare', cosa: 'Iter base: brief cliente, prototipo, sdifettamento, produzione, spedizione', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. operations', cosa: 'Processo strutturato con gestione taglie, varianti colore e controllo qualità capo', costo_mensile: 400, costo_setup: 800, tempo_mesi: 2 },
      '3-4': { chi: 'Operations + qualità', cosa: 'Workflow dal prototipo alla spedizione con AQL, gestione resi e azioni correttive', costo_mensile: 800, costo_setup: 3000, tempo_mesi: 3 },
      '4-5': { chi: 'Dir. operations + IT', cosa: 'Sistema PLM integrato con gestione collezioni, distinte base e tracciabilità filiera', costo_mensile: 3500, costo_setup: 12000, tempo_mesi: 6 }
    },
    ricavi: {
      '1-2': { chi: 'Titolare', cosa: 'Analisi fatturato per brand cliente e margine per tipo capo confezionato', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Controller', cosa: 'Report ricavi per stagione con analisi costo capo e incidenza tessuti/accessori', costo_mensile: 200, costo_setup: 500, tempo_mesi: 2 },
      '3-4': { chi: 'Controller + commerciale', cosa: 'Dashboard marginalità per collezione con analisi efficienza confezionamento e scarti', costo_mensile: 500, costo_setup: 2000, tempo_mesi: 2 },
      '4-5': { chi: 'CFO + dir. commerciale', cosa: 'Modello ricavi per brand con simulazione mix collezione e impatto costi materiali', costo_mensile: 1000, costo_setup: 4000, tempo_mesi: 5 }
    },
    marketing: {
      '1-2': { chi: 'Titolare / esterno', cosa: 'Portfolio produzioni con foto capi, capacità produttive e certificazioni etiche', costo_mensile: 200, costo_setup: 400, tempo_mesi: 1 },
      '2-3': { chi: 'Marketing specialist', cosa: 'Lookbook produzioni con shooting professionale e materiali per fiere moda', costo_mensile: 1000, costo_setup: 2000, tempo_mesi: 2 },
      '3-4': { chi: 'Team marketing', cosa: 'Presenza a fiere moda (Milano Unica, Texworld) e content su sostenibilità filiera', costo_mensile: 1800, costo_setup: 4000, tempo_mesi: 3 },
      '4-5': { chi: 'Marketing manager + agenzia', cosa: 'Branding confezione con showroom, PR moda internazionale e campagne sostenibilità', costo_mensile: 4000, costo_setup: 9000, tempo_mesi: 5 }
    },
    sitoweb: {
      '1-2': { chi: 'Agenzia / freelance', cosa: 'Sito vetrina con portfolio capi, capacità produttive e form contatto brand', costo_mensile: 80, costo_setup: 500, tempo_mesi: 1 },
      '2-3': { chi: 'Web agency', cosa: 'Sito con gallery collezioni, schede tecniche capo e sezione private label', costo_mensile: 300, costo_setup: 2000, tempo_mesi: 2 },
      '3-4': { chi: 'Web agency + marketing', cosa: 'Portale con area brand, tracking ordini produzione e showroom virtuale capi', costo_mensile: 650, costo_setup: 4500, tempo_mesi: 3 },
      '4-5': { chi: 'Team digitale + agenzia', cosa: 'Piattaforma B2B con ordini collezione online, configuratore capo e portale brand', costo_mensile: 1200, costo_setup: 9000, tempo_mesi: 5 }
    },
    ecommerce: {
      '1-2': { chi: 'N/A', cosa: 'Non applicabile: produzione per brand terzi, no vendita diretta al consumatore', costo_mensile: 0, costo_setup: 0, tempo_mesi: 1 },
      '2-3': { chi: 'Resp. commerciale', cosa: 'Shop B2B pronto moda con catalogo capi disponibili e ordine minimo per colore', costo_mensile: 500, costo_setup: 2000, tempo_mesi: 3 },
      '3-4': { chi: 'Team digitale', cosa: 'E-commerce B2B con gestione pre-ordini collezione, taglie e varianti colore', costo_mensile: 1500, costo_setup: 5000, tempo_mesi: 3 },
      '4-5': { chi: 'E-commerce manager + IT', cosa: 'Piattaforma omnicanale con B2B wholesale, dropshipping e private label digitale', costo_mensile: 3500, costo_setup: 12000, tempo_mesi: 6 }
    }
  }

};

const _SD_SERVIZI = {

  /* ================================================================
     SERVIZI IT – MSP, cybersecurity, cloud migration, SMB clients
     ================================================================ */
  servizi_it: {

    vendite: {
      '1-2': { chi: 'Titolare o tecnico senior',    cosa: 'Audit informale del processo di vendita servizi IT e gestione lead MSP',                costo_mensile: 0,    costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Sales specialist IT',           cosa: 'Strutturazione pipeline commerciale per contratti MSP e cloud migration',              costo_mensile: 2200, costo_setup: 800,  tempo_mesi: 2 },
      '3-4': { chi: 'Sales manager IT dedicato',     cosa: 'Gestione trattative complesse cybersecurity e progetti infrastrutturali enterprise',   costo_mensile: 3500, costo_setup: 2000, tempo_mesi: 3 },
      '4-5': { chi: 'Direttore commerciale IT',      cosa: 'Strategia vendite multicanale per servizi gestiti, cloud e sicurezza informatica',     costo_mensile: 7000, costo_setup: 5000, tempo_mesi: 4 },
    },

    pipeline: {
      '1-2': { chi: 'Tecnico interno',               cosa: 'Mappatura opportunità attive e prospect SMB in un foglio condiviso',                   costo_mensile: 35,   costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'CRM specialist',                cosa: 'Configurazione CRM con stage specifici per servizi IT e cicli di rinnovo',             costo_mensile: 120,  costo_setup: 500,  tempo_mesi: 2 },
      '3-4': { chi: 'Revenue ops analyst',            cosa: 'Dashboard predittive su pipeline MSP, churn contratti e upsell cybersecurity',         costo_mensile: 500,  costo_setup: 1500, tempo_mesi: 2 },
      '4-5': { chi: 'Head of revenue operations',     cosa: 'Orchestrazione completa del ciclo di vendita IT con scoring e forecasting avanzato',   costo_mensile: 1200, costo_setup: 4000, tempo_mesi: 4 },
    },

    team: {
      '1-2': { chi: 'Titolare',                      cosa: 'Valutazione competenze commerciali del team tecnico IT esistente',                     costo_mensile: 200,  costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'HR consultant IT',              cosa: 'Formazione tecnico-commerciale su vendita servizi gestiti e cloud per il team',        costo_mensile: 2800, costo_setup: 1200, tempo_mesi: 2 },
      '3-4': { chi: 'Sales trainer IT verticale',    cosa: 'Programma di coaching su vendita consulenziale cybersecurity e managed services',      costo_mensile: 4200, costo_setup: 3000, tempo_mesi: 3 },
      '4-5': { chi: 'VP sales & talent IT',          cosa: 'Costruzione e gestione team commerciale IT con specialisti per ogni linea di servizio', costo_mensile: 8500, costo_setup: 8000, tempo_mesi: 5 },
    },

    processi: {
      '1-2': { chi: 'Tecnico interno',               cosa: 'Documentazione informale dei processi di onboarding clienti IT e ticketing',           costo_mensile: 0,    costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Process analyst',               cosa: 'Formalizzazione workflow di vendita, provisioning e supporto tecnico livello 1-2',     costo_mensile: 400,  costo_setup: 800,  tempo_mesi: 2 },
      '3-4': { chi: 'Operations manager IT',         cosa: 'Automazione processi di delivery servizi IT, SLA monitoring e escalation',             costo_mensile: 800,  costo_setup: 2500, tempo_mesi: 3 },
      '4-5': { chi: 'COO servizi IT',                cosa: 'Reingegnerizzazione completa dei processi operativi e commerciali IT con ITIL',        costo_mensile: 3200, costo_setup: 7000, tempo_mesi: 5 },
    },

    ricavi: {
      '1-2': { chi: 'Titolare',                      cosa: 'Analisi marginalità per tipologia di contratto IT e servizio gestito',                 costo_mensile: 0,    costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Controller',                    cosa: 'Modello di pricing per servizi MSP ricorrenti e progetti cloud one-shot',              costo_mensile: 200,  costo_setup: 300,  tempo_mesi: 2 },
      '3-4': { chi: 'Revenue manager IT',            cosa: 'Ottimizzazione mix ricavi ricorrenti vs progetto e strategie di upsell',               costo_mensile: 500,  costo_setup: 1500, tempo_mesi: 2 },
      '4-5': { chi: 'CFO fractional IT',             cosa: 'Piano ricavi pluriennale con modelli di crescita MRR e churn management avanzato',     costo_mensile: 1000, costo_setup: 4000, tempo_mesi: 4 },
    },

    marketing: {
      '1-2': { chi: 'Titolare o tecnico',            cosa: 'Presenza base su LinkedIn e profilo Google Business per servizi IT locali',             costo_mensile: 200,  costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Marketing specialist IT',       cosa: 'Content marketing su cybersecurity e cloud con lead magnet per PMI',                   costo_mensile: 800,  costo_setup: 1000, tempo_mesi: 3 },
      '3-4': { chi: 'Marketing manager IT',          cosa: 'Campagne inbound multicanale su servizi gestiti con webinar e case study',             costo_mensile: 1500, costo_setup: 3500, tempo_mesi: 3 },
      '4-5': { chi: 'CMO fractional IT',             cosa: 'Strategia marketing integrata per brand positioning come MSP di riferimento',          costo_mensile: 3200, costo_setup: 8000, tempo_mesi: 5 },
    },

    sitoweb: {
      '1-2': { chi: 'Tecnico interno',               cosa: 'Sito vetrina base con pagine servizi IT, contatti e form richiesta supporto',          costo_mensile: 80,   costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Web developer',                 cosa: 'Sito professionale con area servizi MSP, blog cybersecurity e landing page',           costo_mensile: 300,  costo_setup: 1500, tempo_mesi: 2 },
      '3-4': { chi: 'Digital agency IT',             cosa: 'Portale clienti con area riservata, knowledge base e richiesta ticket online',         costo_mensile: 600,  costo_setup: 3500, tempo_mesi: 2 },
      '4-5': { chi: 'Digital experience manager',    cosa: 'Piattaforma web completa con configuratore servizi, portale cliente e chatbot AI',     costo_mensile: 1000, costo_setup: 8000, tempo_mesi: 5 },
    },

    ecommerce: {
      '1-2': { chi: 'Non necessario',                cosa: 'Nessuna vendita online attiva per servizi IT',                                         costo_mensile: 0,    costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Web developer',                 cosa: 'Shop online per licenze software, antivirus e pacchetti assistenza prepagati',         costo_mensile: 350,  costo_setup: 1200, tempo_mesi: 3 },
      '3-4': { chi: 'E-commerce manager IT',         cosa: 'Piattaforma vendita online servizi IT con abbonamenti, bundle e self-provisioning',    costo_mensile: 900,  costo_setup: 4000, tempo_mesi: 3 },
      '4-5': { chi: 'Head of digital commerce IT',   cosa: 'Marketplace servizi IT completo con configuratore, pagamento ricorrente e upsell AI',  costo_mensile: 2200, costo_setup: 10000, tempo_mesi: 5 },
    },
  },

  /* ================================================================
     SERVIZI FORMAZIONE – corsi, academy, e-learning, formazione aziendale
     ================================================================ */
  servizi_formazione: {

    vendite: {
      '1-2': { chi: 'Titolare o formatore senior',   cosa: 'Raccolta informale richieste formazione e passaparola tra aziende clienti',             costo_mensile: 0,    costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Sales consultant formazione',   cosa: 'Strutturazione offerta commerciale per corsi aziendali e academy a catalogo',          costo_mensile: 2000, costo_setup: 600,  tempo_mesi: 2 },
      '3-4': { chi: 'Sales manager formazione',      cosa: 'Gestione vendita progetti formativi complessi con fondi interprofessionali',            costo_mensile: 3800, costo_setup: 2500, tempo_mesi: 3 },
      '4-5': { chi: 'Direttore commerciale academy', cosa: 'Strategia vendite B2B e B2C per formazione in aula, e-learning e blended',             costo_mensile: 6500, costo_setup: 4000, tempo_mesi: 4 },
    },

    pipeline: {
      '1-2': { chi: 'Segreteria o formatore',        cosa: 'Lista contatti e aziende interessate in foglio di calcolo condiviso',                   costo_mensile: 35,   costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'CRM specialist',                cosa: 'CRM configurato per ciclo vendita formazione con stage per preventivo e iscrizione',    costo_mensile: 150,  costo_setup: 500,  tempo_mesi: 2 },
      '3-4': { chi: 'Revenue ops formazione',        cosa: 'Pipeline avanzata con tracking corsi, edizioni, tasso di conversione e rinnovi',        costo_mensile: 450,  costo_setup: 2000, tempo_mesi: 2 },
      '4-5': { chi: 'Head of revenue ops academy',   cosa: 'Sistema predittivo di pipeline con forecasting iscrizioni e ottimizzazione calendari',  costo_mensile: 1100, costo_setup: 5000, tempo_mesi: 4 },
    },

    team: {
      '1-2': { chi: 'Titolare',                      cosa: 'Valutazione competenze dei formatori e del personale di segreteria',                    costo_mensile: 200,  costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'HR consultant formazione',      cosa: 'Piano sviluppo competenze per formatori e team commerciale academy',                   costo_mensile: 2500, costo_setup: 1000, tempo_mesi: 2 },
      '3-4': { chi: 'Training director',             cosa: 'Programma di certificazione interna formatori e team di instructional design',          costo_mensile: 4500, costo_setup: 3500, tempo_mesi: 3 },
      '4-5': { chi: 'VP people & academy',           cosa: 'Gestione organizzazione completa con faculty management e talent acquisition docenti',  costo_mensile: 9000, costo_setup: 9000, tempo_mesi: 6 },
    },

    processi: {
      '1-2': { chi: 'Formatore senior',              cosa: 'Documentazione informale del processo di erogazione corsi e gestione aule',             costo_mensile: 0,    costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Process analyst',               cosa: 'Formalizzazione workflow iscrizione, erogazione corso e rilascio attestati',            costo_mensile: 350,  costo_setup: 600,  tempo_mesi: 2 },
      '3-4': { chi: 'Operations manager formazione', cosa: 'Automazione gestione edizioni, calendari docenti e reportistica fondi interpro',        costo_mensile: 700,  costo_setup: 2000, tempo_mesi: 2 },
      '4-5': { chi: 'COO academy',                   cosa: 'Reingegnerizzazione completa processi formativi con LMS integrato e qualità ISO',      costo_mensile: 2800, costo_setup: 6000, tempo_mesi: 5 },
    },

    ricavi: {
      '1-2': { chi: 'Titolare',                      cosa: 'Analisi marginalità per tipologia di corso e canale di vendita formazione',             costo_mensile: 0,    costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Controller',                    cosa: 'Modello pricing per corsi a catalogo, formazione aziendale e percorsi e-learning',     costo_mensile: 200,  costo_setup: 400,  tempo_mesi: 2 },
      '3-4': { chi: 'Revenue manager formazione',    cosa: 'Ottimizzazione ricavi con bundle formativi, abbonamenti academy e fondi interpro',     costo_mensile: 450,  costo_setup: 1800, tempo_mesi: 3 },
      '4-5': { chi: 'CFO fractional formazione',     cosa: 'Piano ricavi pluriennale con modelli scalabili per e-learning e licensing contenuti',   costo_mensile: 900,  costo_setup: 3500, tempo_mesi: 4 },
    },

    marketing: {
      '1-2': { chi: 'Titolare o segreteria',         cosa: 'Presenza base su social e invio newsletter a database contatti esistenti',              costo_mensile: 200,  costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Marketing specialist edu',      cosa: 'Campagne social e Google Ads per promozione corsi con landing page dedicate',          costo_mensile: 700,  costo_setup: 800,  tempo_mesi: 2 },
      '3-4': { chi: 'Marketing manager academy',     cosa: 'Strategia inbound con webinar gratuiti, lead nurturing e community building',          costo_mensile: 1400, costo_setup: 3000, tempo_mesi: 3 },
      '4-5': { chi: 'CMO fractional formazione',     cosa: 'Brand positioning come academy di riferimento con partnership e thought leadership',   costo_mensile: 3000, costo_setup: 7000, tempo_mesi: 5 },
    },

    sitoweb: {
      '1-2': { chi: 'Webmaster o segreteria',        cosa: 'Sito vetrina con catalogo corsi, calendario edizioni e form di contatto',               costo_mensile: 80,   costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Web developer',                 cosa: 'Sito professionale con schede corso dettagliate, blog e area iscrizione online',       costo_mensile: 300,  costo_setup: 1200, tempo_mesi: 2 },
      '3-4': { chi: 'Digital agency formazione',     cosa: 'Portale academy con area studenti, materiali didattici e certificazioni online',       costo_mensile: 550,  costo_setup: 3000, tempo_mesi: 3 },
      '4-5': { chi: 'Digital experience manager',    cosa: 'Piattaforma web completa con LMS integrato, community e percorsi personalizzati',     costo_mensile: 1100, costo_setup: 9000, tempo_mesi: 5 },
    },

    ecommerce: {
      '1-2': { chi: 'Non necessario',                cosa: 'Nessuna vendita online attiva per corsi di formazione',                                 costo_mensile: 0,    costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Web developer',                 cosa: 'Shop online per vendita corsi a catalogo con pagamento e iscrizione automatica',       costo_mensile: 400,  costo_setup: 1500, tempo_mesi: 3 },
      '3-4': { chi: 'E-commerce manager edu',        cosa: 'Piattaforma e-commerce formazione con abbonamenti, bundle e accesso e-learning',       costo_mensile: 1000, costo_setup: 4500, tempo_mesi: 3 },
      '4-5': { chi: 'Head of digital learning',      cosa: 'Marketplace formativo completo con corsi on-demand, live e subscription premium',      costo_mensile: 2500, costo_setup: 11000, tempo_mesi: 6 },
    },
  },

};

/* ================================================================
   STEP-DETAIL — EDILIZIA  (3 settori)
   Generato: 2026-03-27
   ================================================================ */

const _SD_EDILIZIA = {

  /* ──────────────────────────────────────────────────────────────
     EDILIZIA RESIDENZIALE
     cantieri, ristrutturazioni, bonus fiscali, architetti/geometri
     ────────────────────────────────────────────────────────────── */
  edilizia_residenziale: {
    vendite: {
      '1-2': { chi:'Titolare / geometra interno',   cosa:'Mappare cantieri attivi e referenze da architetti e geometri della zona',               costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Commerciale cantieri junior',    cosa:'Visite settimanali a studi tecnici e imprese per preventivi ristrutturazione',          costo_mensile:1200, costo_setup:500,  tempo_mesi:2 },
      '3-4': { chi:'Resp. sviluppo commerciale',     cosa:'Gestire gare private e capitolati con tracking bonus fiscali e margini per cantiere',   costo_mensile:2500, costo_setup:1500, tempo_mesi:3 },
      '4-5': { chi:'Sales manager edilizia',         cosa:'Coordinare rete agenti multi-zona con forecast su pipeline cantieri e ristrutturazioni', costo_mensile:5000, costo_setup:3000, tempo_mesi:4 }
    },
    pipeline: {
      '1-2': { chi:'Titolare',                      cosa:'Elenco preventivi aperti su foglio condiviso con stato e importo stimato',               costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Assistente commerciale',         cosa:'CRM base con fasi cantiere: sopralluogo, preventivo, conferma, SAL, fine lavori',       costo_mensile:50,   costo_setup:300,  tempo_mesi:2 },
      '3-4': { chi:'CRM specialist edilizia',        cosa:'Pipeline per tipologia lavoro con alert scadenze bonus e follow-up post-cantiere',      costo_mensile:300,  costo_setup:800,  tempo_mesi:2 },
      '4-5': { chi:'Revenue operations manager',     cosa:'Dashboard predittiva su conversione preventivi, valore medio cantiere e redditività',   costo_mensile:800,  costo_setup:2500, tempo_mesi:4 }
    },
    team: {
      '1-2': { chi:'Titolare',                      cosa:'Definire ruoli base: chi fa sopralluoghi, chi segue pratiche bonus fiscali',             costo_mensile:200,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Consulente organizzazione',      cosa:'Strutturare team cantiere con responsabilità chiare e obiettivi settimanali',            costo_mensile:2200, costo_setup:800,  tempo_mesi:2 },
      '3-4': { chi:'HR manager / consulente esterno', cosa:'Piano assunzioni capocantiere e commerciali con incentivi su margine cantiere',         costo_mensile:3500, costo_setup:1500, tempo_mesi:3 },
      '4-5': { chi:'Direttore operativo',            cosa:'Organigramma completo con KPI per ruolo e piani di crescita legati a volume cantieri',   costo_mensile:6000, costo_setup:3000, tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Titolare',                      cosa:'Checklist sopralluogo e template preventivo standardizzato per ristrutturazioni',        costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Resp. qualità / geometra',       cosa:'Workflow da richiesta a consegna lavori con milestone e controllo documentale',          costo_mensile:300,  costo_setup:500,  tempo_mesi:2 },
      '3-4': { chi:'Process manager edilizia',       cosa:'Digitalizzare gestione SAL, computi metrici e pratiche bonus con firma digitale',        costo_mensile:650,  costo_setup:2000, tempo_mesi:3 },
      '4-5': { chi:'COO / consulente operations',    cosa:'Sistema integrato commessa-contabilità-cantiere con alert margini e scadenze',           costo_mensile:2500, costo_setup:5000, tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Titolare / commercialista',      cosa:'Analisi margine lordo per tipologia cantiere e incidenza bonus fiscali',                 costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Controller part-time',           cosa:'Report mensile ricavi per cantiere con confronto preventivo vs consuntivo',              costo_mensile:250,  costo_setup:300,  tempo_mesi:2 },
      '3-4': { chi:'Controller gestionale',          cosa:'Analisi redditività per tipologia lavoro e cliente con pricing dinamico',                costo_mensile:700,  costo_setup:1200, tempo_mesi:2 },
      '4-5': { chi:'CFO / finance manager',          cosa:'Modello previsionale ricavi su pipeline cantieri con scenari bonus e margini netti',     costo_mensile:2200, costo_setup:4000, tempo_mesi:4 }
    },
    marketing: {
      '1-2': { chi:'Titolare / segretaria',          cosa:'Pagina Google Business con foto cantieri completati e recensioni clienti',               costo_mensile:150,  costo_setup:200,  tempo_mesi:1 },
      '2-3': { chi:'Social media manager freelance', cosa:'Post settimanali prima/dopo ristrutturazioni e guide su bonus fiscali vigenti',         costo_mensile:600,  costo_setup:400,  tempo_mesi:2 },
      '3-4': { chi:'Agenzia marketing edilizia',     cosa:'Campagne local SEO e Google Ads su ristrutturazioni con landing dedicate per zona',     costo_mensile:1200, costo_setup:1500, tempo_mesi:3 },
      '4-5': { chi:'Marketing manager + agenzia',    cosa:'Strategia multicanale con video cantieri, case study e lead generation per architetti',  costo_mensile:2800, costo_setup:4000, tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Titolare / web freelance',       cosa:'Sito vetrina con portfolio lavori, servizi offerti e form richiesta preventivo',         costo_mensile:50,   costo_setup:400,  tempo_mesi:1 },
      '2-3': { chi:'Web designer freelance',         cosa:'Sezione progetti realizzati con gallery, filtri per tipologia e testimonianze',          costo_mensile:250,  costo_setup:800,  tempo_mesi:2 },
      '3-4': { chi:'Agenzia web specializzata',      cosa:'Sito ottimizzato SEO locale con configuratore preventivo e blog bonus edilizi',         costo_mensile:450,  costo_setup:2000, tempo_mesi:2 },
      '4-5': { chi:'Team digital + agenzia',         cosa:'Piattaforma con area clienti, tracking cantiere in tempo reale e preventivi online',    costo_mensile:800,  costo_setup:4500, tempo_mesi:4 }
    },
    ecommerce: {
      '1-2': { chi:'Titolare',                      cosa:'Catalogo PDF materiali e finiture scaricabile dal sito per clienti e progettisti',       costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Assistente digitale',            cosa:'Sezione sito con listino materiali e simulatore costi ristrutturazione base',           costo_mensile:100,  costo_setup:500,  tempo_mesi:2 },
      '3-4': { chi:'E-commerce manager part-time',   cosa:'Shop online materiali edili e finiture con ritiro in magazzino e consegna cantiere',    costo_mensile:350,  costo_setup:1800, tempo_mesi:3 },
      '4-5': { chi:'Digital commerce manager',       cosa:'Piattaforma B2B per imprese e studi tecnici con listini dedicati e ordini ricorrenti',  costo_mensile:1000, costo_setup:5000, tempo_mesi:5 }
    }
  },

  /* ──────────────────────────────────────────────────────────────
     EDILIZIA IMPIANTI
     termoidraulica, elettrico, climatizzazione, manutenzione
     ────────────────────────────────────────────────────────────── */
  edilizia_impianti: {
    vendite: {
      '1-2': { chi:'Titolare / tecnico senior',      cosa:'Censire clienti attivi e mappare contratti manutenzione in scadenza nella zona',         costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Commerciale tecnico junior',     cosa:'Visite a condomini e imprese per proporre contratti manutenzione e efficientamento',     costo_mensile:1000, costo_setup:400,  tempo_mesi:2 },
      '3-4': { chi:'Resp. commerciale impianti',     cosa:'Gestire preventivi impianti complessi con upsell climatizzazione e pompe di calore',    costo_mensile:2200, costo_setup:1200, tempo_mesi:3 },
      '4-5': { chi:'Sales manager impiantistica',    cosa:'Rete vendita su territorio con specialisti per residenziale, industriale e pubblico',    costo_mensile:4500, costo_setup:2500, tempo_mesi:4 }
    },
    pipeline: {
      '1-2': { chi:'Titolare',                      cosa:'Lista interventi e preventivi aperti con priorità e stato su foglio condiviso',          costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Segretaria / back-office',       cosa:'CRM con fasi: sopralluogo, preventivo, ordine materiali, installazione, collaudo',      costo_mensile:40,   costo_setup:250,  tempo_mesi:2 },
      '3-4': { chi:'CRM specialist',                cosa:'Pipeline separata per nuovi impianti e contratti manutenzione con scadenzario',          costo_mensile:250,  costo_setup:700,  tempo_mesi:2 },
      '4-5': { chi:'Revenue operations analyst',     cosa:'Forecast automatizzato su installazioni e rinnovi con analisi conversion rate',          costo_mensile:700,  costo_setup:2000, tempo_mesi:4 }
    },
    team: {
      '1-2': { chi:'Titolare',                      cosa:'Assegnare ruoli chiari tra tecnici installatori e chi gestisce i clienti',               costo_mensile:200,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Consulente HR part-time',        cosa:'Struttura team con capo-squadra, tecnici e apprendisti con obiettivi mensili',           costo_mensile:2000, costo_setup:600,  tempo_mesi:2 },
      '3-4': { chi:'HR manager settore impianti',    cosa:'Piano formazione tecnica continua e certificazioni con percorsi di carriera',            costo_mensile:3200, costo_setup:1500, tempo_mesi:3 },
      '4-5': { chi:'Direttore tecnico',              cosa:'Organigramma multi-squadra con KPI produttività per tecnico e soddisfazione cliente',   costo_mensile:5500, costo_setup:2500, tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Titolare / capo-squadra',        cosa:'Checklist intervento standard e modulo rapportino lavoro per ogni uscita tecnica',       costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Resp. tecnico',                  cosa:'Workflow intervento digitale: richiesta, diagnosi, preventivo, esecuzione, collaudo',    costo_mensile:250,  costo_setup:400,  tempo_mesi:2 },
      '3-4': { chi:'Process engineer impianti',      cosa:'Gestione magazzino ricambi integrata con pianificazione interventi e schede tecniche',   costo_mensile:600,  costo_setup:1800, tempo_mesi:3 },
      '4-5': { chi:'Operations manager',             cosa:'Sistema ERP impianti con tracciamento ore, materiali, garanzie e manutenzioni programmate', costo_mensile:2000, costo_setup:4500, tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Titolare / commercialista',      cosa:'Calcolo margine per tipo intervento: manutenzione ordinaria vs installazione nuova',    costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Amministrazione interna',        cosa:'Report ricavi mensili per linea servizio con incidenza costo materiali e manodopera',   costo_mensile:200,  costo_setup:200,  tempo_mesi:2 },
      '3-4': { chi:'Controller di gestione',         cosa:'Analisi redditività per cliente e tipologia impianto con ottimizzazione listini',       costo_mensile:600,  costo_setup:1000, tempo_mesi:2 },
      '4-5': { chi:'CFO / finance controller',       cosa:'Modello ricavi ricorrenti da manutenzione vs una tantum con LTV cliente e churn rate',  costo_mensile:1800, costo_setup:3500, tempo_mesi:4 }
    },
    marketing: {
      '1-2': { chi:'Titolare',                      cosa:'Profilo Google Business con servizi, area coperta e recensioni clienti soddisfatti',     costo_mensile:150,  costo_setup:150,  tempo_mesi:1 },
      '2-3': { chi:'Social media freelance',         cosa:'Contenuti su risparmio energetico, manutenzione caldaie e novità pompe di calore',      costo_mensile:500,  costo_setup:300,  tempo_mesi:2 },
      '3-4': { chi:'Agenzia marketing locale',       cosa:'Campagne Google Ads stagionali per climatizzazione estate e riscaldamento inverno',     costo_mensile:1100, costo_setup:1200, tempo_mesi:3 },
      '4-5': { chi:'Marketing manager + agenzia',    cosa:'Piano marketing annuale con content su efficienza energetica e lead nurturing B2B',     costo_mensile:2500, costo_setup:3500, tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Web freelance',                  cosa:'Sito one-page con servizi impianti offerti, zona coperta e contatti rapidi',            costo_mensile:50,   costo_setup:350,  tempo_mesi:1 },
      '2-3': { chi:'Web designer',                   cosa:'Sito con pagine per servizio, gallery lavori realizzati e form preventivo rapido',      costo_mensile:200,  costo_setup:700,  tempo_mesi:2 },
      '3-4': { chi:'Agenzia web',                    cosa:'Sito SEO ottimizzato con blog tecnico, calcolatore risparmio energetico e chat',        costo_mensile:500,  costo_setup:2200, tempo_mesi:2 },
      '4-5': { chi:'Team digital dedicato',          cosa:'Portale clienti con storico interventi, scadenze manutenzione e prenotazione online',   costo_mensile:900,  costo_setup:5000, tempo_mesi:4 }
    },
    ecommerce: {
      '1-2': { chi:'Titolare',                      cosa:'PDF scaricabile con listino ricambi e accessori per clienti fidelizzati',                costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Assistente back-office',         cosa:'Catalogo online ricambi e accessori con richiesta preventivo per quantità',             costo_mensile:80,   costo_setup:400,  tempo_mesi:2 },
      '3-4': { chi:'E-commerce manager part-time',   cosa:'Shop ricambi e componenti per installatori con listini B2B e consegna rapida',          costo_mensile:300,  costo_setup:1500, tempo_mesi:3 },
      '4-5': { chi:'Digital commerce manager',       cosa:'Piattaforma B2B per installatori con ordini ricorrenti, scorte e prezzi riservati',     costo_mensile:900,  costo_setup:4500, tempo_mesi:5 }
    }
  },

  /* ──────────────────────────────────────────────────────────────
     EDILIZIA SERRAMENTI
     showroom, posa, rivenditori, efficienza energetica
     ────────────────────────────────────────────────────────────── */
  edilizia_serramenti: {
    vendite: {
      '1-2': { chi:'Titolare / resp. showroom',      cosa:'Mappare clienti passati e referenze da posatori e rivenditori della zona',               costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Consulente showroom',            cosa:'Gestire visite showroom con consulenza su efficienza energetica e detrazioni fiscali',  costo_mensile:1100, costo_setup:500,  tempo_mesi:2 },
      '3-4': { chi:'Resp. commerciale serramenti',   cosa:'Sviluppare rete rivenditori e accordi con imprese edili per forniture cantiere',        costo_mensile:2800, costo_setup:1500, tempo_mesi:3 },
      '4-5': { chi:'Sales director serramenti',      cosa:'Strategia vendita multicanale: showroom, rivenditori, cantieri e gare con forecast',    costo_mensile:5500, costo_setup:3500, tempo_mesi:5 }
    },
    pipeline: {
      '1-2': { chi:'Titolare',                      cosa:'Registro preventivi con misure, modello serramento e stato trattativa su foglio',        costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Back-office commerciale',        cosa:'CRM con fasi: misura, preventivo, conferma, ordine fornitore, posa, collaudo',          costo_mensile:60,   costo_setup:300,  tempo_mesi:2 },
      '3-4': { chi:'CRM specialist serramenti',      cosa:'Pipeline per canale vendita con alert tempi consegna fornitore e posa programmata',     costo_mensile:350,  costo_setup:900,  tempo_mesi:2 },
      '4-5': { chi:'Revenue operations manager',     cosa:'Dashboard predittiva su conversion rate showroom, valore medio ordine e lead time',     costo_mensile:900,  costo_setup:2500, tempo_mesi:4 }
    },
    team: {
      '1-2': { chi:'Titolare',                      cosa:'Definire chi gestisce showroom, chi fa misure e chi coordina la posa in opera',          costo_mensile:200,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Consulente organizzazione',      cosa:'Team showroom con ruoli vendita e tecnico, formazione prodotto e tecniche di posa',     costo_mensile:2400, costo_setup:800,  tempo_mesi:2 },
      '3-4': { chi:'HR manager / resp. personale',   cosa:'Piano assunzioni posatori qualificati e venditori showroom con incentivi su venduto',   costo_mensile:3800, costo_setup:1800, tempo_mesi:3 },
      '4-5': { chi:'Direttore commerciale',          cosa:'Organigramma multi-sede con academy interna su prodotto e tecniche di vendita',         costo_mensile:6500, costo_setup:3500, tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Titolare / resp. tecnico',       cosa:'Scheda misure standard e checklist posa in opera per garantire qualità installazione',  costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Resp. tecnico serramenti',       cosa:'Workflow da sopralluogo a posa con gestione ordini fornitore e tempi consegna',         costo_mensile:350,  costo_setup:500,  tempo_mesi:2 },
      '3-4': { chi:'Process manager',                cosa:'Gestione digitale commesse con tracciamento misure, produzione, consegna e posa',       costo_mensile:700,  costo_setup:2500, tempo_mesi:3 },
      '4-5': { chi:'COO serramenti',                 cosa:'ERP integrato con configuratore prodotto, gestione magazzino e pianificazione pose',    costo_mensile:3000, costo_setup:5500, tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Titolare / commercialista',      cosa:'Margine per tipologia serramento: PVC, alluminio, legno e relativi accessori',          costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Amministrazione',                cosa:'Report mensile vendite per prodotto e canale con incidenza costo posa e trasporto',     costo_mensile:300,  costo_setup:300,  tempo_mesi:2 },
      '3-4': { chi:'Controller di gestione',         cosa:'Analisi marginalità per commessa con ottimizzazione mix prodotto e pricing canale',     costo_mensile:800,  costo_setup:1200, tempo_mesi:2 },
      '4-5': { chi:'CFO / finance manager',          cosa:'Modello previsionale ricavi per showroom e canale con analisi stagionalità e trend',    costo_mensile:2500, costo_setup:4500, tempo_mesi:4 }
    },
    marketing: {
      '1-2': { chi:'Titolare / segretaria',          cosa:'Profilo Google Business con foto showroom, prodotti installati e recensioni clienti',   costo_mensile:150,  costo_setup:200,  tempo_mesi:1 },
      '2-3': { chi:'Social media freelance',         cosa:'Contenuti su risparmio energetico, confronto materiali e vantaggi sostituzione infissi', costo_mensile:700,  costo_setup:400,  tempo_mesi:2 },
      '3-4': { chi:'Agenzia marketing serramenti',   cosa:'Campagne local con landing per detrazioni fiscali e configuratore infissi online',      costo_mensile:1400, costo_setup:1800, tempo_mesi:3 },
      '4-5': { chi:'Marketing manager + agenzia',    cosa:'Strategia brand con showroom experience, eventi e partnership architetti e designer',   costo_mensile:3200, costo_setup:5000, tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Web freelance',                  cosa:'Sito vetrina con catalogo serramenti, gallery showroom e modulo contatto rapido',       costo_mensile:50,   costo_setup:500,  tempo_mesi:1 },
      '2-3': { chi:'Web designer',                   cosa:'Sito con schede prodotto dettagliate, filtri per materiale e simulatore colori',        costo_mensile:300,  costo_setup:900,  tempo_mesi:2 },
      '3-4': { chi:'Agenzia web specializzata',      cosa:'Sito con configuratore serramento online, blog efficienza energetica e SEO locale',    costo_mensile:550,  costo_setup:2500, tempo_mesi:3 },
      '4-5': { chi:'Team digital + agenzia',         cosa:'Piattaforma con preventivatore automatico, virtual showroom 3D e area rivenditori',     costo_mensile:1000, costo_setup:6000, tempo_mesi:5 }
    },
    ecommerce: {
      '1-2': { chi:'Titolare',                      cosa:'Catalogo PDF con gamma prodotti, finiture e prezzi indicativi scaricabile dal sito',     costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Assistente digitale',            cosa:'Catalogo interattivo online con richiesta preventivo per prodotto e configurazione',    costo_mensile:150,  costo_setup:600,  tempo_mesi:2 },
      '3-4': { chi:'E-commerce manager part-time',   cosa:'Shop accessori e ricambi serramenti con vendita online e ritiro showroom',              costo_mensile:400,  costo_setup:2000, tempo_mesi:3 },
      '4-5': { chi:'Digital commerce manager',       cosa:'Piattaforma B2B per rivenditori con listini dedicati, ordini e tracking consegne',      costo_mensile:1200, costo_setup:5500, tempo_mesi:5 }
    }
  }

};

const _SD_COMMERCIO_B2B = {

  commercio_distribuzione_industriale: {
    vendite: {
      '1-2': { chi:'Titolare con listino tecnico', cosa:'Organizza catalogo prodotti industriali e inizia visite sistematiche ai clienti attivi', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Agente plurimandatario tecnico', cosa:'Inserisci agente con portafoglio nel settore industriale e affiancalo con schede tecniche prodotto', costo_mensile:1800, costo_setup:500, tempo_mesi:2 },
      '3-4': { chi:'Commerciale interno + agenti', cosa:'Assumi un commerciale dedicato che coordina agenti e gestisce trattative su forniture ricorrenti', costo_mensile:3500, costo_setup:1000, tempo_mesi:3 },
      '4-5': { chi:'Direttore commerciale + rete', cosa:'Struttura direzione vendite con KAM per clienti strategici, agenti di zona e supporto tecnico-commerciale', costo_mensile:7000, costo_setup:3000, tempo_mesi:5 }
    },
    pipeline: {
      '1-2': { chi:'Titolare o back-office', cosa:'Crea un file Excel con offerte inviate, stato trattativa e follow-up settimanale', costo_mensile:30, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Responsabile vendite', cosa:'Adotta CRM base per tracciare offerte, lead e scadenze contratti di fornitura', costo_mensile:150, costo_setup:500, tempo_mesi:2 },
      '3-4': { chi:'Sales operations', cosa:'CRM integrato con ERP per gestione listini, scontistica cliente e storico ordini automatizzato', costo_mensile:500, costo_setup:2500, tempo_mesi:3 },
      '4-5': { chi:'IT + direzione commerciale', cosa:'CRM con EDI integrato, forecast automatico, dashboard vendite per linea prodotto e marginalità', costo_mensile:1200, costo_setup:8000, tempo_mesi:5 }
    },
    team: {
      '1-2': { chi:'Titolare', cosa:'Forma il magazziniere e il back-office sulla comunicazione tecnica con i clienti', costo_mensile:150, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Consulente vendite', cosa:'Struttura piano provvigionale per agenti e incentivi su nuovi clienti industriali acquisiti', costo_mensile:2000, costo_setup:800, tempo_mesi:2 },
      '3-4': { chi:'Resp. commerciale', cosa:'Riunioni settimanali vendite, KPI per agente, formazione tecnica continua su nuove linee prodotto', costo_mensile:3500, costo_setup:1500, tempo_mesi:3 },
      '4-5': { chi:'HR + direzione vendite', cosa:'Team strutturato con KAM, inside sales, agenti e piano carriera con certificazioni tecniche', costo_mensile:7500, costo_setup:4000, tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Titolare', cosa:'Standardizza il formato offerte con condizioni di vendita, tempi consegna e MOQ chiari', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Back-office commerciale', cosa:'Digitalizza listini con scontistica per fascia cliente e automatizza conferme ordine via gestionale', costo_mensile:400, costo_setup:1000, tempo_mesi:2 },
      '3-4': { chi:'Operations + IT', cosa:'Integrazione ERP-magazzino per disponibilità in tempo reale e gestione automatica riordini fornitori', costo_mensile:800, costo_setup:3500, tempo_mesi:3 },
      '4-5': { chi:'Supply chain manager', cosa:'Processo end-to-end digitalizzato: ordine-picking-spedizione-fatturazione con EDI verso clienti chiave', costo_mensile:3000, costo_setup:10000, tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Titolare', cosa:'Analizza margini per linea prodotto e identifica i 20 articoli più redditizi da spingere', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Controller o consulente', cosa:'Rivedi politica prezzi con mark-up differenziato per categoria e cliente, elimina articoli a margine zero', costo_mensile:250, costo_setup:500, tempo_mesi:2 },
      '3-4': { chi:'Direzione commerciale', cosa:'Introduci contratti quadro annuali con volumi minimi e servizi a valore aggiunto inclusi', costo_mensile:600, costo_setup:1500, tempo_mesi:2 },
      '4-5': { chi:'CFO + direzione vendite', cosa:'Revenue management con pricing dinamico per segmento, rebate strutturati e analisi marginalità per cliente', costo_mensile:1200, costo_setup:5000, tempo_mesi:4 }
    },
    marketing: {
      '1-2': { chi:'Titolare o assistente', cosa:'Aggiorna profilo Google Business e LinkedIn aziendale con catalogo prodotti e settori serviti', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Agenzia o freelance', cosa:'Partecipa a 1-2 fiere di settore e crea materiale commerciale tecnico per agenti', costo_mensile:800, costo_setup:2000, tempo_mesi:3 },
      '3-4': { chi:'Marketing specialist', cosa:'Campagne LinkedIn Ads su buyer industriali, newsletter tecnica mensile e case study settoriali', costo_mensile:1500, costo_setup:2500, tempo_mesi:3 },
      '4-5': { chi:'Team marketing + agenzia', cosa:'Piano marketing annuale con fiere internazionali, content tecnico, SEO industriale e lead nurturing', costo_mensile:3500, costo_setup:8000, tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Web designer freelance', cosa:'Aggiorna sito con catalogo prodotti, schede tecniche scaricabili e modulo richiesta preventivo', costo_mensile:80, costo_setup:500, tempo_mesi:1 },
      '2-3': { chi:'Agenzia web', cosa:'Sito con catalogo ricercabile per codice e categoria, area download documentazione tecnica', costo_mensile:300, costo_setup:2000, tempo_mesi:2 },
      '3-4': { chi:'Agenzia web + SEO', cosa:'SEO su keyword industriali di settore, landing page per applicazione e configuratore richieste', costo_mensile:600, costo_setup:4000, tempo_mesi:3 },
      '4-5': { chi:'Team digitale + agenzia', cosa:'Sito multilingua con area riservata clienti, listini personalizzati e tracking ordini online', costo_mensile:1000, costo_setup:10000, tempo_mesi:5 }
    },
    ecommerce: {
      '1-2': { chi:'Titolare', cosa:'Registrati su portali B2B di settore per aumentare visibilità verso buyer industriali', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '2-3': { chi:'Agenzia e-commerce', cosa:'Attiva catalogo online B2B con prezzi riservati per cliente e riordino semplificato', costo_mensile:500, costo_setup:3000, tempo_mesi:3 },
      '3-4': { chi:'E-commerce manager', cosa:'Piattaforma B2B con listini dinamici, scontistica per volume e integrazione con ERP magazzino', costo_mensile:1200, costo_setup:5000, tempo_mesi:3 },
      '4-5': { chi:'Team digitale + IT', cosa:'E-commerce B2B integrato con EDI clienti, ordini automatici da punchout catalog e reportistica avanzata', costo_mensile:3000, costo_setup:12000, tempo_mesi:6 }
    }
  },

  commercio_ingrosso_alimentare: {
    vendite: {
      '1-2': { chi:'Titolare o agente senior', cosa:'Mappa clienti attivi GDO e HORECA, pianifica giro visite settimanale con listino aggiornato', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Agente di zona dedicato', cosa:'Inserisci agente con portafoglio HORECA o GDO locale e affiancalo sui primi clienti', costo_mensile:2000, costo_setup:500, tempo_mesi:2 },
      '3-4': { chi:'Resp. vendite + agenti', cosa:'Commerciale interno che coordina agenti per canale (GDO, HORECA, dettaglio) con obiettivi mensili', costo_mensile:3800, costo_setup:1200, tempo_mesi:3 },
      '4-5': { chi:'Direttore commerciale + rete', cosa:'Direzione vendite con KAM per GDO, resp. HORECA, agenti di zona e category management', costo_mensile:7500, costo_setup:3000, tempo_mesi:5 }
    },
    pipeline: {
      '1-2': { chi:'Titolare o back-office', cosa:'Registra su Excel ordini, clienti attivi, frequenza acquisto e valore medio ordine', costo_mensile:30, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Back-office commerciale', cosa:'CRM base per tracciare visite agenti, ordini ricorrenti e scadenze contratti di fornitura', costo_mensile:120, costo_setup:400, tempo_mesi:2 },
      '3-4': { chi:'Sales operations', cosa:'CRM integrato con gestionale per ordini automatici, alert su cali di acquisto e forecast stagionale', costo_mensile:450, costo_setup:2000, tempo_mesi:2 },
      '4-5': { chi:'IT + direzione vendite', cosa:'CRM con analisi predittiva ordini, integrazione con catena del freddo e tracciabilità lotto completa', costo_mensile:1000, costo_setup:6000, tempo_mesi:4 }
    },
    team: {
      '1-2': { chi:'Titolare', cosa:'Forma autisti-consegnatari sulla relazione cliente e sulla raccolta ordini durante la consegna', costo_mensile:150, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Consulente vendite', cosa:'Piano provvigionale per agenti con bonus su nuovi clienti HORECA e volumi GDO incrementali', costo_mensile:1800, costo_setup:600, tempo_mesi:2 },
      '3-4': { chi:'Resp. commerciale', cosa:'Riunioni vendite settimanali, KPI su penetrazione cliente e formazione su normative alimentari', costo_mensile:3200, costo_setup:1500, tempo_mesi:3 },
      '4-5': { chi:'HR + direzione vendite', cosa:'Team vendite con specialisti per canale, inside sales per riordini e academy interna su HACCP', costo_mensile:7000, costo_setup:4000, tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Titolare', cosa:'Standardizza processo ordine-consegna con conferma scritta, DDT e verifica catena del freddo', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Resp. qualità', cosa:'Implementa tracciabilità lotti base, procedure HACCP documentate e gestione non conformità', costo_mensile:350, costo_setup:1000, tempo_mesi:2 },
      '3-4': { chi:'Operations manager', cosa:'Gestionale integrato ordini-magazzino-logistica con tracciabilità completa e gestione scadenze automatica', costo_mensile:700, costo_setup:3000, tempo_mesi:3 },
      '4-5': { chi:'Supply chain + qualità', cosa:'Processo certificato con tracciabilità end-to-end, audit fornitori, cold chain monitoring IoT e EDI con GDO', costo_mensile:2500, costo_setup:8000, tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Titolare', cosa:'Analizza margini per categoria merceologica e identifica prodotti ad alta rotazione più redditizi', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Controller o consulente', cosa:'Rivedi mark-up per canale (GDO vs HORECA), negozia condizioni migliori con fornitori strategici', costo_mensile:250, costo_setup:500, tempo_mesi:2 },
      '3-4': { chi:'Category manager', cosa:'Introduci prodotti a marchio privato per HORECA e contratti annuali con volumi garantiti', costo_mensile:600, costo_setup:2000, tempo_mesi:3 },
      '4-5': { chi:'CFO + direzione vendite', cosa:'Revenue management per canale con pricing dinamico stagionale, private label e rebate strutturati', costo_mensile:1100, costo_setup:5000, tempo_mesi:4 }
    },
    marketing: {
      '1-2': { chi:'Titolare o assistente', cosa:'Aggiorna profilo Google Business, crea catalogo PDF con listino e condizioni di fornitura', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Freelance marketing', cosa:'Partecipa a fiere alimentari di zona, crea brochure per canale HORECA e GDO con foto prodotti', costo_mensile:600, costo_setup:1500, tempo_mesi:2 },
      '3-4': { chi:'Marketing specialist', cosa:'Campagne mirate su buyer GDO e ristoratori, degustazioni prodotto e promozioni stagionali', costo_mensile:1200, costo_setup:2500, tempo_mesi:3 },
      '4-5': { chi:'Team marketing + agenzia', cosa:'Piano marketing annuale con fiere nazionali, trade marketing GDO, eventi HORECA e content food', costo_mensile:3000, costo_setup:7000, tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Web designer freelance', cosa:'Sito vetrina con catalogo prodotti per categoria, certificazioni e modulo contatto per grossisti', costo_mensile:80, costo_setup:500, tempo_mesi:1 },
      '2-3': { chi:'Agenzia web', cosa:'Sito con catalogo fotografico, schede prodotto con allergeni e area download listini riservata', costo_mensile:300, costo_setup:2000, tempo_mesi:2 },
      '3-4': { chi:'Agenzia web + SEO', cosa:'SEO locale per ingrosso alimentare, landing per HORECA e GDO, blog con ricette e trend food', costo_mensile:500, costo_setup:3500, tempo_mesi:3 },
      '4-5': { chi:'Team digitale + agenzia', cosa:'Sito multilingua con area clienti, catalogo interattivo, ordini online e integrazione gestionale', costo_mensile:900, costo_setup:8000, tempo_mesi:4 }
    },
    ecommerce: {
      '1-2': { chi:'Titolare', cosa:'Attiva WhatsApp Business per raccolta ordini rapida da clienti HORECA ricorrenti', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Agenzia e-commerce', cosa:'Portale ordini B2B semplice con catalogo, prezzi riservati e storico ordini per cliente', costo_mensile:400, costo_setup:2500, tempo_mesi:3 },
      '3-4': { chi:'E-commerce manager', cosa:'Piattaforma B2B con gestione listini per canale, riordino rapido e alert su promozioni stagionali', costo_mensile:1000, costo_setup:4500, tempo_mesi:3 },
      '4-5': { chi:'Team digitale + IT', cosa:'E-commerce B2B integrato con ERP, ordini automatici da GDO via EDI e app mobile per agenti', costo_mensile:2500, costo_setup:10000, tempo_mesi:6 }
    }
  },

  commercio_materiali_edili: {
    vendite: {
      '1-2': { chi:'Titolare o banconista senior', cosa:'Organizza giro visite a cantieri e imprese edili della zona con listino aggiornato', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Agente tecnico-commerciale', cosa:'Inserisci agente con contatti nel settore edile che visiti imprese, geometri e architetti', costo_mensile:2200, costo_setup:500, tempo_mesi:2 },
      '3-4': { chi:'Resp. vendite + agenti', cosa:'Commerciale interno per preventivi cantiere, agenti per imprese e addetto showroom finiture', costo_mensile:3800, costo_setup:1500, tempo_mesi:3 },
      '4-5': { chi:'Direttore commerciale + rete', cosa:'Direzione vendite con KAM per imprese strutturate, resp. showroom, agenti e preventivisti tecnici', costo_mensile:7000, costo_setup:3000, tempo_mesi:5 }
    },
    pipeline: {
      '1-2': { chi:'Titolare o back-office', cosa:'Registra preventivi cantiere su Excel con importo, impresa, stato e data prevista chiusura', costo_mensile:30, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Back-office commerciale', cosa:'CRM per tracciare preventivi cantiere, follow-up su imprese e scadenze forniture programmate', costo_mensile:150, costo_setup:500, tempo_mesi:2 },
      '3-4': { chi:'Sales operations', cosa:'CRM integrato con gestionale per stato preventivi, margini per cantiere e pipeline per agente', costo_mensile:500, costo_setup:2500, tempo_mesi:3 },
      '4-5': { chi:'IT + direzione vendite', cosa:'CRM con forecast per cantiere, integrazione logistica consegne e analisi marginalità per commessa', costo_mensile:1100, costo_setup:7000, tempo_mesi:5 }
    },
    team: {
      '1-2': { chi:'Titolare', cosa:'Forma banconisti sulla consulenza tecnica ai privati e sulla vendita suggerita di accessori', costo_mensile:150, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Consulente vendite', cosa:'Piano incentivi per banconisti su vendita accessori e per agenti su nuove imprese acquisite', costo_mensile:2200, costo_setup:800, tempo_mesi:2 },
      '3-4': { chi:'Resp. commerciale', cosa:'Riunioni vendite settimanali, KPI per addetto, formazione tecnica su nuovi materiali e normative', costo_mensile:3800, costo_setup:1500, tempo_mesi:3 },
      '4-5': { chi:'HR + direzione vendite', cosa:'Team strutturato showroom-cantiere-logistica con formazione continua e certificazioni prodotto', costo_mensile:7500, costo_setup:4000, tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Titolare', cosa:'Standardizza formato preventivo cantiere con materiali, quantità, prezzi unitari e trasporto', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Back-office + magazzino', cosa:'Gestionale per preventivi con calcolo automatico da computo metrico e verifica giacenze in tempo reale', costo_mensile:400, costo_setup:1500, tempo_mesi:2 },
      '3-4': { chi:'Operations manager', cosa:'Integrazione gestionale-magazzino-logistica per consegne cantiere programmate e tracciamento mezzi', costo_mensile:800, costo_setup:3500, tempo_mesi:3 },
      '4-5': { chi:'Supply chain manager', cosa:'Processo digitalizzato ordine-magazzino-consegna con ottimizzazione carichi, giri consegna e resi cantiere', costo_mensile:3000, costo_setup:9000, tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Titolare', cosa:'Analizza margini per categoria materiale e identifica le famiglie prodotto più profittevoli', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Controller o consulente', cosa:'Rivedi scontistica per impresa con margine minimo garantito, spingi vendita accessori e finiture', costo_mensile:250, costo_setup:500, tempo_mesi:2 },
      '3-4': { chi:'Direzione commerciale', cosa:'Contratti quadro con imprese strutturate, servizi a valore come consulenza tecnica e consegna cantiere', costo_mensile:700, costo_setup:2000, tempo_mesi:2 },
      '4-5': { chi:'CFO + direzione vendite', cosa:'Revenue per canale (showroom, cantiere, rivenditori) con pricing dinamico e analisi marginalità per commessa', costo_mensile:1300, costo_setup:5000, tempo_mesi:4 }
    },
    marketing: {
      '1-2': { chi:'Titolare o assistente', cosa:'Aggiorna Google Business con foto showroom, orari e catalogo materiali disponibili a magazzino', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Freelance marketing', cosa:'Open day showroom per architetti e privati, volantini per imprese e presenza su portali edilizia', costo_mensile:700, costo_setup:1500, tempo_mesi:2 },
      '3-4': { chi:'Marketing specialist', cosa:'Campagne Google Ads locali, eventi showroom con fornitori e newsletter tecnica per professionisti', costo_mensile:1400, costo_setup:2500, tempo_mesi:3 },
      '4-5': { chi:'Team marketing + agenzia', cosa:'Piano marketing con showroom experience, eventi per progettisti, SEO locale e partnership fornitori', costo_mensile:3200, costo_setup:7000, tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Web designer freelance', cosa:'Sito vetrina con catalogo materiali, foto showroom e modulo richiesta preventivo cantiere', costo_mensile:80, costo_setup:500, tempo_mesi:1 },
      '2-3': { chi:'Agenzia web', cosa:'Sito con catalogo per categoria, schede tecniche, gallery showroom e calcolatore quantità base', costo_mensile:350, costo_setup:2500, tempo_mesi:2 },
      '3-4': { chi:'Agenzia web + SEO', cosa:'SEO locale per materiali edili, landing page per tipologia lavoro e virtual tour showroom', costo_mensile:600, costo_setup:4000, tempo_mesi:3 },
      '4-5': { chi:'Team digitale + agenzia', cosa:'Sito con configuratore progetto, area clienti con listini dedicati e preventivazione online', costo_mensile:1000, costo_setup:10000, tempo_mesi:5 }
    },
    ecommerce: {
      '1-2': { chi:'Titolare', cosa:'Attiva WhatsApp Business per preventivi rapidi e pubblica prodotti su marketplace edilizia', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '2-3': { chi:'Agenzia e-commerce', cosa:'Catalogo online B2B con prezzi riservati per imprese registrate e riordino semplificato', costo_mensile:500, costo_setup:3000, tempo_mesi:3 },
      '3-4': { chi:'E-commerce manager', cosa:'E-commerce B2B con listini per impresa, gestione cantiere e integrazione con magazzino e logistica', costo_mensile:1200, costo_setup:5000, tempo_mesi:3 },
      '4-5': { chi:'Team digitale + IT', cosa:'Piattaforma e-commerce B2B+B2C integrata con ERP, consegna cantiere programmata e portale imprese', costo_mensile:3500, costo_setup:12000, tempo_mesi:6 }
    }
  },

  commercio_ricambi_auto: {
    vendite: {
      '1-2': { chi:'Titolare o banconista senior', cosa:'Organizza giro visite a officine e carrozzerie della zona con catalogo ricambi aggiornato', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Agente commerciale dedicato', cosa:'Inserisci agente che visiti officine, carrozzerie e autoricambi indipendenti nella provincia', costo_mensile:2000, costo_setup:500, tempo_mesi:2 },
      '3-4': { chi:'Resp. vendite + agenti', cosa:'Commerciale interno per clienti strutturati e agenti di zona per officine e carrozzerie', costo_mensile:3500, costo_setup:1000, tempo_mesi:3 },
      '4-5': { chi:'Direttore commerciale + rete', cosa:'Direzione vendite con KAM per flotte e assicurazioni, agenti per officine e team e-commerce ricambi', costo_mensile:6500, costo_setup:2500, tempo_mesi:4 }
    },
    pipeline: {
      '1-2': { chi:'Titolare o back-office', cosa:'Registra clienti officina su Excel con frequenza ordini, valore medio e marchi preferiti', costo_mensile:30, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Back-office commerciale', cosa:'CRM per tracciare visite agenti, ordini ricorrenti officine e alert su cali di acquisto', costo_mensile:130, costo_setup:400, tempo_mesi:2 },
      '3-4': { chi:'Sales operations', cosa:'CRM integrato con gestionale ricambi per cross-reference codici, disponibilità e storico ordini', costo_mensile:600, costo_setup:3000, tempo_mesi:3 },
      '4-5': { chi:'IT + direzione vendite', cosa:'CRM con catalogo elettronico integrato, identificazione veicolo per targa e forecast per famiglia ricambio', costo_mensile:1500, costo_setup:8000, tempo_mesi:5 }
    },
    team: {
      '1-2': { chi:'Titolare', cosa:'Forma banconisti sulla ricerca ricambi per targa e sulla vendita suggerita di accessori', costo_mensile:150, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Consulente vendite', cosa:'Piano provvigionale per agenti con bonus su nuove officine acquisite e volumi incrementali', costo_mensile:1800, costo_setup:600, tempo_mesi:2 },
      '3-4': { chi:'Resp. commerciale', cosa:'Riunioni vendite settimanali, formazione su nuove gamme ricambio e KPI per agente e banconista', costo_mensile:3500, costo_setup:1500, tempo_mesi:3 },
      '4-5': { chi:'HR + direzione vendite', cosa:'Team strutturato con specialisti per marchio auto, inside sales, agenti e supporto tecnico ricambi', costo_mensile:7000, costo_setup:3500, tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Titolare', cosa:'Standardizza processo ordine-consegna con conferma disponibilità immediata e tempi di consegna certi', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Back-office + magazzino', cosa:'Gestionale ricambi con cross-reference codici OEM e aftermarket, verifica giacenze in tempo reale', costo_mensile:400, costo_setup:1500, tempo_mesi:2 },
      '3-4': { chi:'Operations manager', cosa:'Integrazione con cataloghi elettronici TecDoc/TecAlliance e gestione automatica riordini fornitori', costo_mensile:900, costo_setup:4000, tempo_mesi:3 },
      '4-5': { chi:'Supply chain + IT', cosa:'Processo digitalizzato con identificazione ricambio per targa, ordine automatico e consegna express tracking', costo_mensile:3500, costo_setup:10000, tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Titolare', cosa:'Analizza margini per famiglia ricambio e identifica le categorie a più alta rotazione e margine', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Controller o consulente', cosa:'Rivedi mark-up per categoria con focus su ricambi a domanda rigida e accessori ad alto margine', costo_mensile:200, costo_setup:300, tempo_mesi:2 },
      '3-4': { chi:'Direzione commerciale', cosa:'Contratti con flotte aziendali e convenzioni con carrozzerie assicurative per volumi garantiti', costo_mensile:500, costo_setup:1500, tempo_mesi:2 },
      '4-5': { chi:'CFO + direzione vendite', cosa:'Revenue management con pricing per canale, programma fedeltà officine e rebate fornitori strutturati', costo_mensile:1000, costo_setup:4000, tempo_mesi:4 }
    },
    marketing: {
      '1-2': { chi:'Titolare o assistente', cosa:'Aggiorna Google Business con orari, catalogo marchi trattati e servizio consegna express', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Freelance marketing', cosa:'Volantini per officine con promozioni mensili, presenza su portali ricambi e WhatsApp broadcast', costo_mensile:600, costo_setup:1000, tempo_mesi:2 },
      '3-4': { chi:'Marketing specialist', cosa:'Campagne Google Ads su ricambi auto locali, promozioni stagionali e eventi per officine partner', costo_mensile:1200, costo_setup:2000, tempo_mesi:3 },
      '4-5': { chi:'Team marketing + agenzia', cosa:'Piano marketing con programma fedeltà officine, sponsoring eventi automotive e brand awareness locale', costo_mensile:2800, costo_setup:6000, tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Web designer freelance', cosa:'Sito vetrina con marchi trattati, servizi offerti e modulo richiesta ricambio per targa', costo_mensile:80, costo_setup:500, tempo_mesi:1 },
      '2-3': { chi:'Agenzia web', cosa:'Sito con ricerca ricambio per targa o codice OEM, disponibilità e richiesta preventivo online', costo_mensile:350, costo_setup:2500, tempo_mesi:2 },
      '3-4': { chi:'Agenzia web + SEO', cosa:'SEO locale per ricambi auto, catalogo online con cross-reference e area riservata officine', costo_mensile:550, costo_setup:4000, tempo_mesi:3 },
      '4-5': { chi:'Team digitale + agenzia', cosa:'Sito con catalogo TecDoc integrato, area clienti con listini e storico ordini per officina', costo_mensile:1000, costo_setup:9000, tempo_mesi:5 }
    },
    ecommerce: {
      '1-2': { chi:'Titolare', cosa:'Pubblica ricambi su eBay e marketplace automotive per testare la vendita online B2C e B2B', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '2-3': { chi:'Agenzia e-commerce', cosa:'E-commerce ricambi con ricerca per targa, compatibilità veicolo e spedizione express nazionale', costo_mensile:600, costo_setup:3000, tempo_mesi:3 },
      '3-4': { chi:'E-commerce manager', cosa:'Piattaforma e-commerce B2B+B2C con catalogo TecDoc, prezzi per profilo e gestione resi automatizzata', costo_mensile:1500, costo_setup:5000, tempo_mesi:3 },
      '4-5': { chi:'Team digitale + IT', cosa:'E-commerce avanzato con identificazione automatica ricambio, ordini B2B via API e integrazione ERP fornitori', costo_mensile:4000, costo_setup:12000, tempo_mesi:6 }
    }
  },

  commercio_abbigliamento_ingrosso: {
    vendite: {
      '1-2': { chi:'Titolare o agente senior', cosa:'Organizza giro visite a negozi e boutique della zona con campionario stagione corrente', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Agente plurimandatario moda', cosa:'Inserisci agente con portafoglio negozi nella regione e affiancalo con lookbook e condizioni', costo_mensile:1800, costo_setup:500, tempo_mesi:2 },
      '3-4': { chi:'Resp. vendite + agenti', cosa:'Commerciale interno per showroom e ordini pronto moda, agenti per negozi e boutique di zona', costo_mensile:3200, costo_setup:1000, tempo_mesi:3 },
      '4-5': { chi:'Direttore commerciale + rete', cosa:'Direzione vendite con resp. showroom, agenti regionali, key account catene e gestione pronto moda', costo_mensile:6000, costo_setup:2500, tempo_mesi:4 }
    },
    pipeline: {
      '1-2': { chi:'Titolare o back-office', cosa:'Registra su Excel clienti negozio, ordini per stagione, budget e preferenze di stile per cliente', costo_mensile:30, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Back-office commerciale', cosa:'CRM per tracciare ordini stagionali, campagna vendita e follow-up su negozi non ancora ordinanti', costo_mensile:130, costo_setup:400, tempo_mesi:2 },
      '3-4': { chi:'Sales operations', cosa:'CRM integrato con gestionale per tracking ordini, riassortimenti pronto moda e analisi sell-through', costo_mensile:500, costo_setup:2500, tempo_mesi:3 },
      '4-5': { chi:'IT + direzione vendite', cosa:'CRM con analisi vendite per negozio, suggerimenti riassortimento automatici e forecast per collezione', costo_mensile:1000, costo_setup:6000, tempo_mesi:5 }
    },
    team: {
      '1-2': { chi:'Titolare', cosa:'Forma personale showroom sulla presentazione collezioni e sulla vendita suggerita di accessori', costo_mensile:150, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Consulente vendite moda', cosa:'Piano provvigionale agenti con bonus su nuovi negozi e premi su raggiungimento budget stagionale', costo_mensile:1500, costo_setup:500, tempo_mesi:2 },
      '3-4': { chi:'Resp. commerciale', cosa:'Riunioni vendite pre e post campagna, formazione su trend stagionali e KPI per agente', costo_mensile:3000, costo_setup:1200, tempo_mesi:3 },
      '4-5': { chi:'HR + direzione vendite', cosa:'Team vendite con visual merchandiser, showroom manager, agenti regionali e formazione trend continua', costo_mensile:6500, costo_setup:3500, tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Titolare', cosa:'Standardizza ordine con taglie, colori, consegna e condizioni reso chiare per ogni cliente', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Back-office + magazzino', cosa:'Gestionale ordini con griglia taglie-colori, gestione campionario e tracking consegne per negozio', costo_mensile:350, costo_setup:1200, tempo_mesi:2 },
      '3-4': { chi:'Operations manager', cosa:'Integrazione gestionale-magazzino con picking per ordine, packing list fotografico e gestione resi', costo_mensile:700, costo_setup:3000, tempo_mesi:3 },
      '4-5': { chi:'Supply chain + IT', cosa:'Processo end-to-end dalla campagna vendita al riassortimento con analisi sell-through per punto vendita', costo_mensile:2500, costo_setup:8000, tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Titolare', cosa:'Analizza margini per brand e categoria, identifica le linee più richieste e profittevoli', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Controller o consulente', cosa:'Politica sconti per volume con soglie chiare, push su accessori e complementi ad alto margine', costo_mensile:200, costo_setup:400, tempo_mesi:2 },
      '3-4': { chi:'Direzione commerciale', cosa:'Programma pronto moda con ricarichi superiori, flash sale fine stagione e capsule collection esclusive', costo_mensile:600, costo_setup:1500, tempo_mesi:2 },
      '4-5': { chi:'CFO + direzione vendite', cosa:'Revenue management con pricing per canale, gestione markdown ottimizzata e private label ad alto margine', costo_mensile:1000, costo_setup:4000, tempo_mesi:4 }
    },
    marketing: {
      '1-2': { chi:'Titolare o assistente', cosa:'Crea profilo Instagram business con foto prodotto e lookbook stagionale per attrarre negozi', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Social media manager', cosa:'Gestione social con lookbook digitale, inviti showroom e partecipazione a fiere moda di settore', costo_mensile:700, costo_setup:1500, tempo_mesi:2 },
      '3-4': { chi:'Marketing specialist moda', cosa:'Campagne social mirate su buyer negozi, eventi showroom stagionali e collaborazioni con influencer B2B', costo_mensile:1500, costo_setup:3000, tempo_mesi:3 },
      '4-5': { chi:'Team marketing + agenzia', cosa:'Piano marketing con fashion week, showroom permanente, digital PR e brand positioning nel segmento', costo_mensile:3500, costo_setup:8000, tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Web designer freelance', cosa:'Sito vetrina con lookbook fotografico, brand trattati e modulo richiesta accesso showroom', costo_mensile:80, costo_setup:500, tempo_mesi:1 },
      '2-3': { chi:'Agenzia web moda', cosa:'Sito con lookbook interattivo, catalogo per collezione e area riservata per buyer registrati', costo_mensile:350, costo_setup:2500, tempo_mesi:2 },
      '3-4': { chi:'Agenzia web + SEO', cosa:'SEO per ingrosso abbigliamento, virtual showroom e area B2B con disponibilità per taglia e colore', costo_mensile:600, costo_setup:4500, tempo_mesi:3 },
      '4-5': { chi:'Team digitale + agenzia', cosa:'Sito con virtual showroom immersivo, area buyer con ordini online e integrazione gestionale moda', costo_mensile:1100, costo_setup:10000, tempo_mesi:5 }
    },
    ecommerce: {
      '1-2': { chi:'Titolare', cosa:'Pubblica catalogo su marketplace B2B moda come Orderchamp o FashionUnited per visibilità', costo_mensile:0, costo_setup:200, tempo_mesi:1 },
      '2-3': { chi:'Agenzia e-commerce moda', cosa:'Portale B2B con catalogo per collezione, ordini per griglia taglie e prezzi riservati per buyer', costo_mensile:500, costo_setup:3000, tempo_mesi:3 },
      '3-4': { chi:'E-commerce manager', cosa:'Piattaforma B2B con showroom virtuale, ordini campagna e pronto moda, riassortimenti rapidi online', costo_mensile:1300, costo_setup:5000, tempo_mesi:3 },
      '4-5': { chi:'Team digitale + IT', cosa:'E-commerce B2B integrato con ERP moda, gestione campagne vendita digitali e dropshipping per selezionati', costo_mensile:3000, costo_setup:11000, tempo_mesi:6 }
    }
  },

  commercio_elettronica: {
    vendite: {
      '1-2': { chi:'Titolare o commerciale sr', cosa:'Mappa distributori e VAR di zona, pianifica visite con listino e condizioni di partnership', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Agente tecnico-commerciale', cosa:'Inserisci agente con portafoglio rivenditori IT e VAR per vendita prodotti a catalogo', costo_mensile:2500, costo_setup:500, tempo_mesi:2 },
      '3-4': { chi:'Resp. vendite + agenti', cosa:'Commerciale interno per distributori e key account, agenti per rivenditori e system integrator', costo_mensile:4000, costo_setup:1500, tempo_mesi:3 },
      '4-5': { chi:'Direttore commerciale + rete', cosa:'Direzione vendite con channel manager, KAM per distributori, agenti per VAR e team e-commerce B2B', costo_mensile:8000, costo_setup:3000, tempo_mesi:5 }
    },
    pipeline: {
      '1-2': { chi:'Titolare o back-office', cosa:'Registra su Excel clienti rivenditori, volumi per brand, margini e frequenza ordini mensile', costo_mensile:30, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Back-office commerciale', cosa:'CRM per tracciare deal con rivenditori, registrazione opportunità e scadenze contratti vendor', costo_mensile:200, costo_setup:500, tempo_mesi:2 },
      '3-4': { chi:'Sales operations', cosa:'CRM integrato con gestionale per deal registration vendor, margini per deal e pipeline per canale', costo_mensile:700, costo_setup:3000, tempo_mesi:3 },
      '4-5': { chi:'IT + direzione vendite', cosa:'CRM con integrazione portali vendor, forecast automatico per linea prodotto e analisi marginalità deal', costo_mensile:1500, costo_setup:8000, tempo_mesi:5 }
    },
    team: {
      '1-2': { chi:'Titolare', cosa:'Forma il team interno sulle specifiche tecniche dei prodotti a catalogo e sulle certificazioni', costo_mensile:150, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Vendor o consulente', cosa:'Attiva formazione certificata dai vendor principali e struttura incentivi per agenti su margine', costo_mensile:2800, costo_setup:1000, tempo_mesi:2 },
      '3-4': { chi:'Resp. commerciale', cosa:'Riunioni vendite settimanali, KPI per agente su margine e volume, certificazioni vendor obbligatorie', costo_mensile:4500, costo_setup:2000, tempo_mesi:3 },
      '4-5': { chi:'HR + direzione vendite', cosa:'Team con pre-sales tecnico, channel manager, agenti certificati e formazione vendor continua', costo_mensile:8500, costo_setup:5000, tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Titolare', cosa:'Standardizza processo preventivo con verifica disponibilità, prezzo vendor aggiornato e margine minimo', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Back-office + acquisti', cosa:'Gestionale con listini vendor aggiornati, calcolo margine automatico e gestione deal registration', costo_mensile:500, costo_setup:1500, tempo_mesi:2 },
      '3-4': { chi:'Operations + IT', cosa:'Integrazione con portali vendor per disponibilità real-time, drop-ship e tracking ordini automatizzato', costo_mensile:1000, costo_setup:4000, tempo_mesi:3 },
      '4-5': { chi:'Supply chain + IT', cosa:'Processo digitalizzato con ordini automatici ai vendor, drop-ship integrato e gestione resi RMA strutturata', costo_mensile:4000, costo_setup:10000, tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Titolare', cosa:'Analizza margini per vendor e categoria, identifica i prodotti con marginalità migliore e peggiore', costo_mensile:0, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Controller o consulente', cosa:'Ottimizza mix vendita verso prodotti a margine più alto, attiva rebate e promo vendor disponibili', costo_mensile:300, costo_setup:500, tempo_mesi:2 },
      '3-4': { chi:'Direzione commerciale', cosa:'Struttura offerte bundle prodotto+servizio, contratti quadro con rivenditori e upsell garanzie estese', costo_mensile:800, costo_setup:2000, tempo_mesi:2 },
      '4-5': { chi:'CFO + direzione vendite', cosa:'Revenue management con pricing dinamico per canale, rebate vendor ottimizzati e servizi managed ad alto margine', costo_mensile:1500, costo_setup:5000, tempo_mesi:4 }
    },
    marketing: {
      '1-2': { chi:'Titolare o assistente', cosa:'Aggiorna LinkedIn e sito con brand distribuiti, certificazioni vendor e case study installazioni', costo_mensile:200, costo_setup:0, tempo_mesi:1 },
      '2-3': { chi:'Freelance marketing', cosa:'Co-marketing con vendor per eventi demo, webinar tecnici e promozioni congiunte per rivenditori', costo_mensile:1000, costo_setup:2000, tempo_mesi:3 },
      '3-4': { chi:'Marketing specialist IT', cosa:'Campagne digitali su IT manager, partecipazione a fiere tech e programma partner per rivenditori', costo_mensile:1800, costo_setup:3000, tempo_mesi:3 },
      '4-5': { chi:'Team marketing + agenzia', cosa:'Piano marketing con eventi vendor, digital marketing B2B, partner program strutturato e thought leadership', costo_mensile:4000, costo_setup:8000, tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Web designer freelance', cosa:'Sito vetrina con catalogo brand, certificazioni vendor e modulo richiesta preventivo B2B', costo_mensile:80, costo_setup:500, tempo_mesi:1 },
      '2-3': { chi:'Agenzia web', cosa:'Sito con catalogo prodotti per categoria, schede tecniche, comparatore e area partner riservata', costo_mensile:400, costo_setup:2500, tempo_mesi:2 },
      '3-4': { chi:'Agenzia web + SEO', cosa:'SEO su keyword tech B2B, landing page per soluzione e configuratore prodotto con compatibilità', costo_mensile:700, costo_setup:4500, tempo_mesi:3 },
      '4-5': { chi:'Team digitale + agenzia', cosa:'Sito B2B con area partner, listini personalizzati, configuratore soluzioni e integrazione vendor portal', costo_mensile:1200, costo_setup:10000, tempo_mesi:5 }
    },
    ecommerce: {
      '1-2': { chi:'Titolare', cosa:'Pubblica prodotti su Amazon Business e marketplace B2B tech per testare vendita online', costo_mensile:0, costo_setup:300, tempo_mesi:1 },
      '2-3': { chi:'Agenzia e-commerce', cosa:'E-commerce B2B con catalogo tech, prezzi riservati per rivenditori e ordini con PO number', costo_mensile:800, costo_setup:3000, tempo_mesi:3 },
      '3-4': { chi:'E-commerce manager', cosa:'Piattaforma B2B con listini per livello partner, disponibilità real-time e integrazione drop-ship vendor', costo_mensile:2000, costo_setup:5000, tempo_mesi:3 },
      '4-5': { chi:'Team digitale + IT', cosa:'E-commerce B2B integrato con portali vendor, punchout catalog per clienti enterprise e API per system integrator', costo_mensile:4000, costo_setup:12000, tempo_mesi:6 }
    }
  }

};

const _SD_COMMERCIO_B2C = {

  /* ------------------------------------------------------------------ */
  /*  COMMERCIO AUTO/MOTO USATO                                         */
  /* ------------------------------------------------------------------ */
  commercio_auto_moto_usato: {
    vendite: {
      '1-2': { chi: 'Titolare + supporto',      cosa: 'Tecnici interni che affiancano nelle visite e preventivi',                     costo_mensile: 300,  costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Venditore junior',          cosa: 'Venditore junior esperienza usato \u2014 trattative e permute',                     costo_mensile: 2500, costo_setup: 500,  tempo_mesi: 3 },
      '3-4': { chi: 'Commerciale senior',        cosa: 'Commerciale con portafoglio clienti e obiettivi mensili',                     costo_mensile: 3500, costo_setup: 1000, tempo_mesi: 2 },
      '4-5': { chi: 'Resp. vendite + rete',      cosa: 'Direzione commerciale con agenti zona e key account fleet',                  costo_mensile: 5000, costo_setup: 2000, tempo_mesi: 6 },
    },
    pipeline: {
      '1-2': { chi: 'Titolare',                  cosa: 'Excel o Google Sheet per tracciare lead e follow-up',                        costo_mensile: 0,    costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'CRM base',                  cosa: 'CRM automotive con lead dai marketplace',                                    costo_mensile: 400,  costo_setup: 800,  tempo_mesi: 1 },
      '3-4': { chi: 'CRM avanzato',              cosa: 'CRM integrato con sito, marketplace e WhatsApp',                             costo_mensile: 800,  costo_setup: 1500, tempo_mesi: 2 },
      '4-5': { chi: 'DMS completo',              cosa: 'DMS integrato con contabilita, stock e CRM',                                 costo_mensile: 1500, costo_setup: 3000, tempo_mesi: 3 },
    },
    team: {
      '1-2': { chi: 'Collaboratore interno',     cosa: 'Formare collaboratore esistente sulla gestione clienti',                     costo_mensile: 200,  costo_setup: 0,    tempo_mesi: 2 },
      '2-3': { chi: 'Personale dedicato',        cosa: 'Persona dedicata alla vendita con obiettivi misurabili',                     costo_mensile: 2000, costo_setup: 500,  tempo_mesi: 3 },
      '3-4': { chi: 'Team strutturato',          cosa: 'Venditore, addetto permute, back office commerciale',                        costo_mensile: 3000, costo_setup: 1000, tempo_mesi: 3 },
      '4-5': { chi: 'Manager + team',            cosa: 'Responsabile che coordina team, obiettivi e KPI',                            costo_mensile: 4500, costo_setup: 2000, tempo_mesi: 6 },
    },
    processi: {
      '1-2': { chi: 'Titolare',                  cosa: 'Check-list valutazione permute e consegna veicoli',                          costo_mensile: 0,    costo_setup: 200,  tempo_mesi: 1 },
      '2-3': { chi: 'Consulente + strumenti',    cosa: 'Contratti standard, valutazione permute con Eurotax e CRM',                  costo_mensile: 300,  costo_setup: 500,  tempo_mesi: 2 },
      '3-4': { chi: 'Software gestionale',       cosa: 'Gestionale pratiche auto, finanziamenti e garanzie',                         costo_mensile: 600,  costo_setup: 1000, tempo_mesi: 2 },
      '4-5': { chi: 'DMS + automazione',         cosa: 'Processi automatizzati \u2014 firma digitale, pratiche online',                    costo_mensile: 1000, costo_setup: 2000, tempo_mesi: 3 },
    },
    ricavi: {
      '1-2': { chi: 'Titolare',                  cosa: 'Pricing assertivo \u2014 valori di mercato reali',                                costo_mensile: 0,    costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Strumenti pricing',         cosa: 'Tool pricing (EurotaxGlass, DAT) per valutazione stock',                     costo_mensile: 300,  costo_setup: 0,    tempo_mesi: 1 },
      '3-4': { chi: 'Prodotti finanziari',       cosa: 'Accordi finanziarie \u2014 proposta sistematica ogni vendita',                     costo_mensile: 600,  costo_setup: 1000, tempo_mesi: 2 },
      '4-5': { chi: 'Revenue management',        cosa: 'Ottimizzazione margini, fleet pricing, garanzie estese',                     costo_mensile: 1200, costo_setup: 2000, tempo_mesi: 3 },
    },
    marketing: {
      '1-2': { chi: 'Titolare',                  cosa: 'AutoScout24 e Subito con foto professionali',                                costo_mensile: 200,  costo_setup: 300,  tempo_mesi: 1 },
      '2-3': { chi: 'Social + portali',          cosa: '3+ marketplace + Facebook/Instagram post settimanali',                       costo_mensile: 600,  costo_setup: 1000, tempo_mesi: 2 },
      '3-4': { chi: 'Agenzia digital',           cosa: 'Google Ads, remarketing e gestione recensioni',                              costo_mensile: 1200, costo_setup: 2000, tempo_mesi: 2 },
      '4-5': { chi: 'Marketing manager',         cosa: 'Responsabile marketing \u2014 brand awareness locale',                             costo_mensile: 2500, costo_setup: 4000, tempo_mesi: 3 },
    },
    sitoweb: {
      '1-2': { chi: 'Web agency',                cosa: 'Sito base con stock aggiornato e contatti',                                  costo_mensile: 100,  costo_setup: 500,  tempo_mesi: 1 },
      '2-3': { chi: 'Sito professionale',        cosa: 'Stock real-time, form contatto, valutazione permuta',                        costo_mensile: 300,  costo_setup: 2000, tempo_mesi: 2 },
      '3-4': { chi: 'Sito avanzato',             cosa: 'Chat, test drive, finanziamento online, tracking lead',                      costo_mensile: 600,  costo_setup: 4000, tempo_mesi: 2 },
      '4-5': { chi: 'Sito integrato DMS',        cosa: 'Sito integrato DMS \u2014 stock real-time, CRM automatico',                       costo_mensile: 1000, costo_setup: 6000, tempo_mesi: 3 },
    },
    ecommerce: {
      '1-2': { chi: 'Titolare',                  cosa: 'Aste online base (BCA, Autorola)',                                           costo_mensile: 300,  costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Buyer part-time',           cosa: 'Aste online + accordi privati + acquisto da aziende',                        costo_mensile: 800,  costo_setup: 500,  tempo_mesi: 2 },
      '3-4': { chi: 'Buyer dedicato',            cosa: 'Buyer full-time \u2014 aste fisiche, fleet, rientri leasing',                      costo_mensile: 2800, costo_setup: 1000, tempo_mesi: 3 },
      '4-5': { chi: 'Strategia acquisti',        cosa: 'Team acquisti KPI, partnership noleggiatori e leasing',                      costo_mensile: 4500, costo_setup: 2000, tempo_mesi: 4 },
    },
  },

  /* ------------------------------------------------------------------ */
  /*  COMMERCIO AUTO/MOTO NUOVO                                         */
  /* ------------------------------------------------------------------ */
  commercio_auto_moto_nuovo: {
    vendite: {
      '1-2': { chi: 'Titolare + receptionist',   cosa: 'Visite strutturate, brochure, follow-up post visita',                        costo_mensile: 200,  costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Venditore junior',          cosa: 'Venditore esperienza brand \u2014 trattative e consegne',                          costo_mensile: 2500, costo_setup: 500,  tempo_mesi: 3 },
      '3-4': { chi: 'Senior dealer',             cosa: 'Senior con portafoglio clienti e trattative fleet',                          costo_mensile: 3500, costo_setup: 1000, tempo_mesi: 2 },
      '4-5': { chi: 'Team vendite',              cosa: 'Responsabile + venditori per segmento (privati, fleet, km0)',                costo_mensile: 5000, costo_setup: 2000, tempo_mesi: 6 },
    },
    pipeline: {
      '1-2': { chi: 'CRM base',                  cosa: 'CRM per lead da sito e showroom',                                            costo_mensile: 300,  costo_setup: 500,  tempo_mesi: 1 },
      '2-3': { chi: 'CRM avanzato',              cosa: 'CRM integrato con DMS casa madre',                                           costo_mensile: 600,  costo_setup: 1000, tempo_mesi: 2 },
      '3-4': { chi: 'Marketing automation',      cosa: 'Lead nurturing \u2014 email, SMS, remarketing',                                    costo_mensile: 1000, costo_setup: 2000, tempo_mesi: 2 },
      '4-5': { chi: 'DMS completo',              cosa: 'DMS casa madre \u2014 forecast, allocazioni, ordini',                              costo_mensile: 1500, costo_setup: 3000, tempo_mesi: 3 },
    },
    team: {
      '1-2': { chi: 'Formazione interna',        cosa: 'Formazione processo vendita e gestione obiezioni',                           costo_mensile: 100,  costo_setup: 500,  tempo_mesi: 1 },
      '2-3': { chi: 'Venditore dedicato',        cosa: 'Persona dedicata con obiettivi mensili e incentivi',                         costo_mensile: 2000, costo_setup: 500,  tempo_mesi: 2 },
      '3-4': { chi: 'Team strutturato',          cosa: 'Venditori, fleet manager, post-vendita commerciale',                         costo_mensile: 3000, costo_setup: 1000, tempo_mesi: 3 },
      '4-5': { chi: 'Sales manager',             cosa: 'Responsabile \u2014 team, obiettivi, formazione, incentivi',                       costo_mensile: 4000, costo_setup: 2000, tempo_mesi: 4 },
    },
    processi: {
      '1-2': { chi: 'Titolare',                  cosa: 'Processo consegna e follow-up post vendita',                                 costo_mensile: 0,    costo_setup: 200,  tempo_mesi: 1 },
      '2-3': { chi: 'Consulente + DMS',          cosa: 'Processi documentati dalla lead alla consegna',                              costo_mensile: 300,  costo_setup: 500,  tempo_mesi: 2 },
      '3-4': { chi: 'DMS + automazione',         cosa: 'Pratiche digitali, firma elettronica, garanzie',                             costo_mensile: 600,  costo_setup: 1500, tempo_mesi: 2 },
      '4-5': { chi: 'DMS casa madre',            cosa: 'Integrazione completa \u2014 ordini, allocazioni, assistenza',                     costo_mensile: 1000, costo_setup: 2000, tempo_mesi: 3 },
    },
    ricavi: {
      '1-2': { chi: 'Titolare',                  cosa: 'Proposta sistematica finanziamento e garanzia estesa',                       costo_mensile: 0,    costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Accordo finanziaria',       cosa: 'Partnership finanziaria con obiettivi penetrazione',                         costo_mensile: 200,  costo_setup: 0,    tempo_mesi: 1 },
      '3-4': { chi: 'F&I manager',               cosa: 'Finance & Insurance \u2014 massimizza ricavi accessori',                           costo_mensile: 800,  costo_setup: 500,  tempo_mesi: 2 },
      '4-5': { chi: 'Revenue management',        cosa: 'Ottimizzazione mix km0/nuovo/usato, pricing dinamico',                      costo_mensile: 1200, costo_setup: 1000, tempo_mesi: 3 },
    },
    marketing: {
      '1-2': { chi: 'Titolare',                  cosa: 'Google My Business + portali con foto professionali',                        costo_mensile: 200,  costo_setup: 300,  tempo_mesi: 1 },
      '2-3': { chi: 'Social + portali',          cosa: 'Social attivo + Google Ads per test drive',                                  costo_mensile: 800,  costo_setup: 1000, tempo_mesi: 2 },
      '3-4': { chi: 'Agenzia digital',           cosa: 'Google, Meta, remarketing + gestione recensioni',                            costo_mensile: 1500, costo_setup: 2000, tempo_mesi: 2 },
      '4-5': { chi: 'Marketing strutturato',     cosa: 'Brand building, eventi, partnership fleet',                                  costo_mensile: 3000, costo_setup: 5000, tempo_mesi: 3 },
    },
    sitoweb: {
      '1-2': { chi: 'Web agency',                cosa: 'Sito con configuratore, stock km0, form test drive',                         costo_mensile: 150,  costo_setup: 1000, tempo_mesi: 1 },
      '2-3': { chi: 'Sito avanzato',             cosa: 'Chat, test drive online, finanziamento, DMS',                                costo_mensile: 400,  costo_setup: 3000, tempo_mesi: 2 },
      '3-4': { chi: 'Sito integrato',            cosa: 'Integrazione casa madre \u2014 stock, configuratore, lead',                        costo_mensile: 700,  costo_setup: 5000, tempo_mesi: 2 },
      '4-5': { chi: 'Esperienza digitale',       cosa: 'Tour virtuale, acquisto online, firma digitale',                             costo_mensile: 1200, costo_setup: 8000, tempo_mesi: 4 },
    },
    ecommerce: {
      '1-2': { chi: 'Titolare',                  cosa: 'Post-vendita base \u2014 tagliandi e revisioni',                                   costo_mensile: 0,    costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Accordo officina',          cosa: 'Officina autorizzata \u2014 garanzie, recall, NPS',                                costo_mensile: 300,  costo_setup: 500,  tempo_mesi: 2 },
      '3-4': { chi: 'Post-vendita strutturato',  cosa: 'Officina dedicata \u2014 post-vendita centro di ricavo',                           costo_mensile: 800,  costo_setup: 1500, tempo_mesi: 3 },
      '4-5': { chi: 'After sales manager',       cosa: 'Fidelizzazione, contratti manutenzione, flotte',                             costo_mensile: 2000, costo_setup: 3000, tempo_mesi: 4 },
    },
  },

  /* ------------------------------------------------------------------ */
  /*  COMMERCIO ABBIGLIAMENTO AL DETTAGLIO                              */
  /* ------------------------------------------------------------------ */
  commercio_abbigliamento_dettaglio: {
    vendite: {
      '1-2': { chi: 'Titolare',                  cosa: 'Vendita diretta in negozio con approccio consulenziale',                     costo_mensile: 200,  costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Addetto vendita',           cosa: 'Addetto vendita formato su styling e cross-selling',                         costo_mensile: 1800, costo_setup: 500,  tempo_mesi: 2 },
      '3-4': { chi: 'Store manager',             cosa: 'Store manager con obiettivi vendita e visual merchandising',                 costo_mensile: 3000, costo_setup: 1000, tempo_mesi: 2 },
      '4-5': { chi: 'Retail manager',            cosa: 'Retail manager \u2014 multi-punto vendita, KPI, formazione',                       costo_mensile: 5000, costo_setup: 2000, tempo_mesi: 4 },
    },
    pipeline: {
      '1-2': { chi: 'Titolare',                  cosa: 'Registro clienti abituali e preferenze di acquisto',                         costo_mensile: 30,   costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'CRM retail',                cosa: 'CRM con schede cliente, storico acquisti e preferenze',                      costo_mensile: 150,  costo_setup: 500,  tempo_mesi: 2 },
      '3-4': { chi: 'CRM + loyalty',             cosa: 'CRM integrato con loyalty program e segmentazione',                          costo_mensile: 400,  costo_setup: 1500, tempo_mesi: 2 },
      '4-5': { chi: 'CRM omnichannel',           cosa: 'CRM omnichannel \u2014 negozio, e-commerce, social unificati',                     costo_mensile: 800,  costo_setup: 3000, tempo_mesi: 3 },
    },
    team: {
      '1-2': { chi: 'Collaboratore',             cosa: 'Formazione base su accoglienza e tecniche di vendita',                       costo_mensile: 150,  costo_setup: 200,  tempo_mesi: 1 },
      '2-3': { chi: 'Addetti formati',           cosa: 'Addetti vendita con formazione styling e visual',                            costo_mensile: 2000, costo_setup: 800,  tempo_mesi: 2 },
      '3-4': { chi: 'Team negozio',              cosa: 'Store manager, addetti vendita, magazziniere',                               costo_mensile: 3500, costo_setup: 1000, tempo_mesi: 3 },
      '4-5': { chi: 'Struttura retail',          cosa: 'Area manager, store manager, team vendita e visual',                         costo_mensile: 6000, costo_setup: 2000, tempo_mesi: 5 },
    },
    processi: {
      '1-2': { chi: 'Titolare',                  cosa: 'Procedure base di cassa, resi e gestione magazzino',                        costo_mensile: 0,    costo_setup: 200,  tempo_mesi: 1 },
      '2-3': { chi: 'Consulente retail',         cosa: 'Processi riordino, visual merchandising, gestione stagioni',                 costo_mensile: 300,  costo_setup: 800,  tempo_mesi: 2 },
      '3-4': { chi: 'Gestionale retail',         cosa: 'Gestionale integrato \u2014 POS, magazzino, riordini automatici',                  costo_mensile: 600,  costo_setup: 2000, tempo_mesi: 2 },
      '4-5': { chi: 'ERP retail',                cosa: 'ERP con gestione multi-punto vendita, buying, markdown',                     costo_mensile: 1500, costo_setup: 4000, tempo_mesi: 4 },
    },
    ricavi: {
      '1-2': { chi: 'Titolare',                  cosa: 'Pricing basato su ricarico e sconti stagionali',                             costo_mensile: 0,    costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Analisi margini',           cosa: 'Analisi margini per categoria e gestione promozioni',                        costo_mensile: 200,  costo_setup: 500,  tempo_mesi: 2 },
      '3-4': { chi: 'Category management',       cosa: 'Category management \u2014 buying plan e markdown ottimizzato',                    costo_mensile: 500,  costo_setup: 1000, tempo_mesi: 2 },
      '4-5': { chi: 'Revenue manager',           cosa: 'Pricing dinamico, analisi sell-through, ottimizzazione mix',                 costo_mensile: 1200, costo_setup: 2000, tempo_mesi: 3 },
    },
    marketing: {
      '1-2': { chi: 'Titolare',                  cosa: 'Instagram con foto prodotto e vetrine curate',                               costo_mensile: 300,  costo_setup: 300,  tempo_mesi: 1 },
      '2-3': { chi: 'Social media manager',      cosa: 'Social strategy, influencer locali, email marketing',                        costo_mensile: 1000, costo_setup: 1500, tempo_mesi: 2 },
      '3-4': { chi: 'Agenzia digital',           cosa: 'Meta Ads, Google Shopping, influencer, eventi in-store',                     costo_mensile: 2000, costo_setup: 3000, tempo_mesi: 2 },
      '4-5': { chi: 'Marketing manager',         cosa: 'Brand strategy, campagne omnichannel, PR e collaborazioni',                  costo_mensile: 3500, costo_setup: 5000, tempo_mesi: 3 },
    },
    sitoweb: {
      '1-2': { chi: 'Web agency',                cosa: 'Sito vetrina con catalogo, orari e contatti',                                costo_mensile: 100,  costo_setup: 500,  tempo_mesi: 1 },
      '2-3': { chi: 'Sito + blog',               cosa: 'Sito con lookbook, blog moda e integrazione social',                        costo_mensile: 300,  costo_setup: 2000, tempo_mesi: 2 },
      '3-4': { chi: 'Sito e-commerce',           cosa: 'E-commerce integrato con gestionale e spedizioni',                           costo_mensile: 600,  costo_setup: 5000, tempo_mesi: 3 },
      '4-5': { chi: 'Piattaforma omnichannel',   cosa: 'Sito omnichannel \u2014 click & collect, reso in-store',                           costo_mensile: 1200, costo_setup: 8000, tempo_mesi: 4 },
    },
    ecommerce: {
      '1-2': { chi: 'Titolare',                  cosa: 'Vendita su Instagram e WhatsApp Business',                                   costo_mensile: 200,  costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Marketplace',               cosa: 'Presenza su Zalando, Amazon Fashion o Depop',                                costo_mensile: 800,  costo_setup: 1500, tempo_mesi: 2 },
      '3-4': { chi: 'E-commerce manager',        cosa: 'E-commerce proprietario con logistica e customer care',                      costo_mensile: 2000, costo_setup: 5000, tempo_mesi: 3 },
      '4-5': { chi: 'Digital commerce',           cosa: 'Strategia omnichannel \u2014 e-commerce, marketplace, social selling',             costo_mensile: 4000, costo_setup: 10000,tempo_mesi: 5 },
    },
  },

  /* ------------------------------------------------------------------ */
  /*  COMMERCIO OROLOGI E GIOIELLI                                      */
  /* ------------------------------------------------------------------ */
  commercio_orologi_gioielli: {
    vendite: {
      '1-2': { chi: 'Titolare',                  cosa: 'Vendita consulenziale in boutique con appuntamento',                         costo_mensile: 200,  costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Consulente vendita',        cosa: 'Consulente formato su gemmologia e storytelling prodotto',                   costo_mensile: 2500, costo_setup: 800,  tempo_mesi: 3 },
      '3-4': { chi: 'Senior advisor',            cosa: 'Senior advisor con portafoglio clienti VIP e alta gamma',                    costo_mensile: 4000, costo_setup: 1500, tempo_mesi: 2 },
      '4-5': { chi: 'Direttore commerciale',     cosa: 'Direzione commerciale \u2014 relazioni brand, eventi, key client',                 costo_mensile: 7000, costo_setup: 3000, tempo_mesi: 5 },
    },
    pipeline: {
      '1-2': { chi: 'Titolare',                  cosa: 'Rubrica clienti con preferenze e ricorrenze',                                costo_mensile: 30,   costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'CRM luxury',                cosa: 'CRM con profilazione clienti, wishlist e follow-up',                         costo_mensile: 200,  costo_setup: 800,  tempo_mesi: 2 },
      '3-4': { chi: 'CRM + clienteling',         cosa: 'CRM avanzato con clienteling, eventi e segmentazione',                       costo_mensile: 600,  costo_setup: 2000, tempo_mesi: 2 },
      '4-5': { chi: 'CRM enterprise',            cosa: 'CRM enterprise \u2014 analytics predittivo, lifetime value',                       costo_mensile: 1200, costo_setup: 4000, tempo_mesi: 4 },
    },
    team: {
      '1-2': { chi: 'Collaboratore',             cosa: 'Formazione su accoglienza luxury e conoscenza prodotto',                     costo_mensile: 150,  costo_setup: 300,  tempo_mesi: 1 },
      '2-3': { chi: 'Consulente formato',        cosa: 'Consulente con certificazione gemmologica e vendita luxury',                 costo_mensile: 2500, costo_setup: 1000, tempo_mesi: 3 },
      '3-4': { chi: 'Team boutique',             cosa: 'Senior advisor, consulente, responsabile post-vendita',                      costo_mensile: 4000, costo_setup: 1500, tempo_mesi: 3 },
      '4-5': { chi: 'Struttura luxury',          cosa: 'Boutique manager, advisor senior, personal shopper, CRM',                    costo_mensile: 7500, costo_setup: 3000, tempo_mesi: 6 },
    },
    processi: {
      '1-2': { chi: 'Titolare',                  cosa: 'Certificati, garanzie e registro preziosi a norma',                          costo_mensile: 0,    costo_setup: 300,  tempo_mesi: 1 },
      '2-3': { chi: 'Consulente + gestionale',   cosa: 'Gestionale gioielleria \u2014 inventario, certificati, garanzie',                  costo_mensile: 400,  costo_setup: 1000, tempo_mesi: 2 },
      '3-4': { chi: 'Software specializzato',    cosa: 'Gestionale completo con tracciabilita, assicurazione, perizie',              costo_mensile: 800,  costo_setup: 2500, tempo_mesi: 2 },
      '4-5': { chi: 'ERP luxury',                cosa: 'ERP integrato \u2014 stock multi-sede, compliance, blockchain',                    costo_mensile: 2000, costo_setup: 5000, tempo_mesi: 4 },
    },
    ricavi: {
      '1-2': { chi: 'Titolare',                  cosa: 'Pricing basato su listini brand e quotazioni metalli',                      costo_mensile: 0,    costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Analisi margini',           cosa: 'Analisi margini per brand, servizi post-vendita aggiuntivi',                 costo_mensile: 300,  costo_setup: 500,  tempo_mesi: 2 },
      '3-4': { chi: 'Revenue optimization',      cosa: 'Servizi accessori \u2014 incisioni, riparazioni, custom design',                   costo_mensile: 800,  costo_setup: 1500, tempo_mesi: 2 },
      '4-5': { chi: 'Revenue manager',           cosa: 'Pre-owned certified, investment pieces, servizi VIP',                        costo_mensile: 2000, costo_setup: 3000, tempo_mesi: 4 },
    },
    marketing: {
      '1-2': { chi: 'Titolare',                  cosa: 'Instagram curato, Google My Business, vetrine tematiche',                    costo_mensile: 300,  costo_setup: 500,  tempo_mesi: 1 },
      '2-3': { chi: 'Social + eventi',           cosa: 'Social strategy luxury, micro-eventi in boutique',                           costo_mensile: 1500, costo_setup: 2000, tempo_mesi: 2 },
      '3-4': { chi: 'Agenzia luxury',            cosa: 'Campagne digital premium, eventi esclusivi, PR locale',                      costo_mensile: 2500, costo_setup: 4000, tempo_mesi: 3 },
      '4-5': { chi: 'Marketing director',        cosa: 'Brand positioning luxury, collaborazioni, trunk show',                       costo_mensile: 5000, costo_setup: 8000, tempo_mesi: 4 },
    },
    sitoweb: {
      '1-2': { chi: 'Web agency',                cosa: 'Sito vetrina elegante con catalogo e appuntamenti',                          costo_mensile: 100,  costo_setup: 500,  tempo_mesi: 1 },
      '2-3': { chi: 'Sito premium',              cosa: 'Sito luxury con catalogo interattivo e prenotazione',                        costo_mensile: 500,  costo_setup: 3000, tempo_mesi: 2 },
      '3-4': { chi: 'Sito e-commerce luxury',    cosa: 'E-commerce con virtual try-on, pagamento rateale',                           costo_mensile: 800,  costo_setup: 6000, tempo_mesi: 3 },
      '4-5': { chi: 'Digital luxury experience',  cosa: 'Esperienza digitale premium \u2014 AR, concierge, configuratore',                 costo_mensile: 1500, costo_setup: 12000,tempo_mesi: 5 },
    },
    ecommerce: {
      '1-2': { chi: 'Titolare',                  cosa: 'Vendita su WhatsApp e Instagram con spedizione assicurata',                  costo_mensile: 200,  costo_setup: 0,    tempo_mesi: 1 },
      '2-3': { chi: 'Marketplace luxury',        cosa: 'Presenza su Chrono24, Vestiaire Collective, 1stDibs',                        costo_mensile: 1200, costo_setup: 2000, tempo_mesi: 2 },
      '3-4': { chi: 'E-commerce dedicato',       cosa: 'E-commerce proprietario con certificazione e spedizione luxury',             costo_mensile: 3000, costo_setup: 6000, tempo_mesi: 3 },
      '4-5': { chi: 'Omnichannel luxury',        cosa: 'Strategia omnichannel \u2014 boutique, online, concierge service',                 costo_mensile: 5000, costo_setup: 15000,tempo_mesi: 5 },
    },
  },

};

// ──────────────────────────────────────────────
//  STEP-DETAIL — SETTORI ALIMENTARE (6 settori)
// ──────────────────────────────────────────────

const _SD_ALIMENTARE = {

  // ═══════════════════════════════════════════
  //  1. ALIMENTARE — TRASFORMAZIONE
  // ═══════════════════════════════════════════
  alimentare_trasformazione: {
    vendite: {
      '1-2': { chi:'Consulente vendite alimentare',   cosa:'Audit canali GDO e HORECA, mappatura clienti attivi e prospect',                     costo_mensile:300,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales manager food industry',     cosa:'Sviluppo rete agenti GDO, negoziazione listing e piani promozionali',               costo_mensile:2200, costo_setup:2000, tempo_mesi:2 },
      '3-4': { chi:'Direttore commerciale alimentare',cosa:'Strategia multichannel GDO-HORECA-private label con KPI per canale',                costo_mensile:4000, costo_setup:4000, tempo_mesi:3 },
      '4-5': { chi:'Chief Revenue Officer food',      cosa:'Espansione internazionale, accordi quadro GDO esteri e certificazioni BRC/IFS',     costo_mensile:8000, costo_setup:10000,tempo_mesi:5 }
    },
    pipeline: {
      '1-2': { chi:'CRM specialist',                  cosa:'Setup CRM con anagrafica buyer GDO, catene HORECA e distributori',                  costo_mensile:30,   costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales ops alimentare',             cosa:'Pipeline per canale con tracking listing, rotazioni e riordini',                    costo_mensile:120,  costo_setup:800,  tempo_mesi:2 },
      '3-4': { chi:'Revenue ops manager',              cosa:'Forecasting per canale e insegna, analisi sell-out e stock rotation',               costo_mensile:400,  costo_setup:2500, tempo_mesi:2 },
      '4-5': { chi:'Head of sales operations',         cosa:'Modello predittivo domanda GDO, integrazione EDI e gestione promo',                costo_mensile:1000, costo_setup:6000, tempo_mesi:5 }
    },
    team: {
      '1-2': { chi:'HR consulente settore food',       cosa:'Analisi competenze rete vendita e gap su canali GDO e HORECA',                     costo_mensile:200,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales trainer alimentare',         cosa:'Formazione su negoziazione GDO, category management e sell-in',                    costo_mensile:2800, costo_setup:1500, tempo_mesi:2 },
      '3-4': { chi:'Head of sales food',               cosa:'Struttura team per canale: key account GDO, agenti HORECA, export',                costo_mensile:4500, costo_setup:3500, tempo_mesi:3 },
      '4-5': { chi:'VP Sales alimentare',              cosa:'Organizzazione commerciale completa con national account e area manager',           costo_mensile:8500, costo_setup:12000,tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Process analyst',                  cosa:'Mappatura processo ordine-consegna e gestione resi/reclami',                        costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Consulente operations food',       cosa:'Ottimizzazione flusso ordini GDO, gestione promo e listini per canale',             costo_mensile:400,  costo_setup:1000, tempo_mesi:2 },
      '3-4': { chi:'Operations manager alimentare',    cosa:'Automazione EDI, gestione penali GDO e tracciabilità lotti',                       costo_mensile:800,  costo_setup:3000, tempo_mesi:3 },
      '4-5': { chi:'Chief operations officer food',    cosa:'Supply chain integrata con previsioni GDO, co-packing e private label',             costo_mensile:3500, costo_setup:10000,tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Analista pricing food',            cosa:'Analisi marginalità per canale, confronto prezzi scaffale vs listino',              costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Revenue analyst alimentare',       cosa:'Modello pricing per canale con simulazione promo e contributi GDO',                costo_mensile:250,  costo_setup:800,  tempo_mesi:2 },
      '3-4': { chi:'Pricing manager food',             cosa:'Strategia pricing multichannel, ottimizzazione mix prodotto-canale',                costo_mensile:650,  costo_setup:2500, tempo_mesi:3 },
      '4-5': { chi:'Chief pricing officer',            cosa:'Revenue management avanzato con dynamic pricing e trade spend optimization',        costo_mensile:1200, costo_setup:8000, tempo_mesi:5 }
    },
    marketing: {
      '1-2': { chi:'Marketing consultant food',        cosa:'Audit posizionamento brand, analisi scaffale e comunicazione pack',                 costo_mensile:300,  costo_setup:500,  tempo_mesi:1 },
      '2-3': { chi:'Brand manager alimentare',         cosa:'Piano marketing trade e consumer, materiali POS e campagne in-store',               costo_mensile:1200, costo_setup:3000, tempo_mesi:2 },
      '3-4': { chi:'Marketing director food',          cosa:'Strategia brand multicanale, campagne TV/digital e co-marketing GDO',              costo_mensile:2200, costo_setup:5000, tempo_mesi:3 },
      '4-5': { chi:'CMO alimentare',                   cosa:'Brand building internazionale, lancio nuove linee e category captainship',          costo_mensile:5000, costo_setup:12000,tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Web designer food',                cosa:'Audit sito aziendale, verifica catalogo prodotti e schede tecniche',                costo_mensile:100,  costo_setup:300,  tempo_mesi:1 },
      '2-3': { chi:'Web developer alimentare',         cosa:'Restyling sito con catalogo prodotti, certificazioni e area buyer',                 costo_mensile:350,  costo_setup:2000, tempo_mesi:2 },
      '3-4': { chi:'Digital project manager food',     cosa:'Piattaforma B2B con ordini online, schede tecniche e portale agenti',               costo_mensile:600,  costo_setup:5000, tempo_mesi:2 },
      '4-5': { chi:'Head of digital alimentare',       cosa:'Ecosistema digitale completo: B2B portal, product storytelling e DAM',              costo_mensile:1200, costo_setup:10000,tempo_mesi:5 }
    },
    ecommerce: {
      '1-2': { chi:'E-commerce analyst',               cosa:'Analisi opportunità vendita online e marketplace food',                             costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'E-commerce manager food',          cosa:'Setup shop online B2C, integrazione marketplace alimentari',                        costo_mensile:600,  costo_setup:3000, tempo_mesi:3 },
      '3-4': { chi:'Head of e-commerce alimentare',    cosa:'Piattaforma e-commerce con logistica refrigerata, abbonamenti e bundle',            costo_mensile:1800, costo_setup:6000, tempo_mesi:3 },
      '4-5': { chi:'Director e-commerce food',         cosa:'Omnichannel commerce con dark store, quick delivery e marketplace proprietario',    costo_mensile:4000, costo_setup:15000,tempo_mesi:6 }
    }
  },

  // ═══════════════════════════════════════════
  //  2. ALIMENTARE — VINI
  // ═══════════════════════════════════════════
  alimentare_vini: {
    vendite: {
      '1-2': { chi:'Consulente vendite vinicole',      cosa:'Audit canali distribuzione: enoteche, HORECA, export e wine club',                  costo_mensile:300,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Export manager vini',              cosa:'Sviluppo rete importatori esteri, partecipazione fiere e wine tasting',             costo_mensile:2500, costo_setup:3000, tempo_mesi:3 },
      '3-4': { chi:'Direttore commerciale cantina',    cosa:'Strategia vendite multichannel: HORECA, export, DTC e wine club',                   costo_mensile:4200, costo_setup:5000, tempo_mesi:3 },
      '4-5': { chi:'Chief Revenue Officer wine',       cosa:'Espansione mercati premium internazionali, allocazioni e fine wine strategy',       costo_mensile:8500, costo_setup:12000,tempo_mesi:5 }
    },
    pipeline: {
      '1-2': { chi:'CRM specialist vini',              cosa:'Setup CRM con anagrafica enoteche, ristoranti e importatori',                       costo_mensile:30,   costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales ops vinicolo',               cosa:'Pipeline per mercato export con tracking ordini e riordini stagionali',              costo_mensile:130,  costo_setup:700,  tempo_mesi:2 },
      '3-4': { chi:'Revenue ops wine',                 cosa:'Forecasting per annata e mercato, gestione allocazioni e liste attesa',              costo_mensile:450,  costo_setup:2000, tempo_mesi:2 },
      '4-5': { chi:'Head of wine operations',          cosa:'Sistema integrato vendemmia-allocazione-vendita con previsioni multiannuali',        costo_mensile:1100, costo_setup:5000, tempo_mesi:5 }
    },
    team: {
      '1-2': { chi:'HR consulente wine sector',        cosa:'Analisi competenze team commerciale e conoscenze enologiche',                       costo_mensile:200,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Wine sales trainer',               cosa:'Formazione team su degustazione, storytelling e vendita esperienziale',              costo_mensile:2700, costo_setup:1500, tempo_mesi:2 },
      '3-4': { chi:'Head of sales wine',               cosa:'Struttura team: export manager per area, brand ambassador e HORECA sales',           costo_mensile:4200, costo_setup:3000, tempo_mesi:3 },
      '4-5': { chi:'VP Sales vinicolo',                cosa:'Organizzazione con wine director, sommelier sales team e area export manager',       costo_mensile:8000, costo_setup:10000,tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Process analyst wine',             cosa:'Mappatura processo ordine-spedizione e gestione temperature',                        costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Operations consultant wine',       cosa:'Ottimizzazione logistica vini, gestione documenti export e accise',                  costo_mensile:350,  costo_setup:1200, tempo_mesi:2 },
      '3-4': { chi:'Operations manager vinicolo',      cosa:'Automazione evasione ordini, tracciabilità lotti e gestione magazzino',              costo_mensile:700,  costo_setup:3500, tempo_mesi:3 },
      '4-5': { chi:'COO cantina',                      cosa:'Supply chain vino integrata con previsioni vendemmia e allocazione globale',         costo_mensile:3000, costo_setup:9000, tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Analista pricing wine',            cosa:'Analisi posizionamento prezzo per denominazione e mercato',                          costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Revenue analyst vinicolo',         cosa:'Modello pricing per annata, formato e canale con marginalità export',                costo_mensile:280,  costo_setup:600,  tempo_mesi:2 },
      '3-4': { chi:'Pricing manager wine',             cosa:'Strategia pricing premium, gestione allocazioni e listini per mercato',              costo_mensile:700,  costo_setup:2000, tempo_mesi:2 },
      '4-5': { chi:'Chief pricing officer wine',       cosa:'Revenue optimization con fine wine pricing, futures e auction strategy',             costo_mensile:1400, costo_setup:7000, tempo_mesi:5 }
    },
    marketing: {
      '1-2': { chi:'Marketing consultant wine',        cosa:'Audit brand cantina, posizionamento etichette e presenza guide',                     costo_mensile:300,  costo_setup:500,  tempo_mesi:1 },
      '2-3': { chi:'Wine marketing manager',           cosa:'Piano comunicazione con PR enogastronomiche, eventi e social storytelling',           costo_mensile:1300, costo_setup:2500, tempo_mesi:2 },
      '3-4': { chi:'Marketing director vinicolo',      cosa:'Strategia brand premium, wine experience, partnership chef e influencer',             costo_mensile:2300, costo_setup:6000, tempo_mesi:3 },
      '4-5': { chi:'CMO cantina',                      cosa:'Brand internazionale con wine tourism, fine dining partnership e luxury positioning', costo_mensile:5500, costo_setup:14000,tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Web designer wine',                cosa:'Audit sito cantina, verifica catalogo vini e storytelling territorio',                costo_mensile:100,  costo_setup:300,  tempo_mesi:1 },
      '2-3': { chi:'Web developer vinicolo',           cosa:'Restyling sito con catalogo vini, schede degustazione e prenotazione visite',        costo_mensile:400,  costo_setup:2500, tempo_mesi:2 },
      '3-4': { chi:'Digital PM wine',                  cosa:'Piattaforma con wine club, area riservata importatori e booking esperienze',          costo_mensile:750,  costo_setup:5000, tempo_mesi:3 },
      '4-5': { chi:'Head of digital wine',             cosa:'Ecosistema digitale: virtual tasting, NFT vini, portale trade e wine community',     costo_mensile:1400, costo_setup:10000,tempo_mesi:5 }
    },
    ecommerce: {
      '1-2': { chi:'E-commerce analyst wine',          cosa:'Analisi opportunità DTC online e marketplace vini',                                  costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'E-commerce manager wine',          cosa:'Setup shop DTC con spedizione condizionata e wine club subscription',                costo_mensile:700,  costo_setup:3500, tempo_mesi:3 },
      '3-4': { chi:'Head of DTC wine',                 cosa:'Piattaforma DTC con abbonamenti, anteprime annata e gifting personalizzato',          costo_mensile:2000, costo_setup:7000, tempo_mesi:3 },
      '4-5': { chi:'Director e-commerce vinicolo',     cosa:'Omnichannel wine commerce con live tasting, en primeur online e marketplace',         costo_mensile:4500, costo_setup:14000,tempo_mesi:6 }
    }
  },

  // ═══════════════════════════════════════════
  //  3. ALIMENTARE — FORNO (Panificazione/Pasticceria)
  // ═══════════════════════════════════════════
  alimentare_forno: {
    vendite: {
      '1-2': { chi:'Consulente vendite panificazione',  cosa:'Audit canali vendita: punti vendita propri, GDO locale e catering',                costo_mensile:300,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales manager forno',               cosa:'Sviluppo clienti GDO locale, accordi catering e servizio consegna B2B',            costo_mensile:1900, costo_setup:1500, tempo_mesi:2 },
      '3-4': { chi:'Direttore commerciale forno',       cosa:'Strategia multichannel: retail proprio, GDO, catering e delivery B2C',              costo_mensile:3200, costo_setup:3500, tempo_mesi:3 },
      '4-5': { chi:'Chief Revenue Officer bakery',      cosa:'Espansione rete punti vendita, franchising e contratti GDO nazionali',              costo_mensile:6500, costo_setup:8000, tempo_mesi:5 }
    },
    pipeline: {
      '1-2': { chi:'CRM specialist forno',              cosa:'Setup CRM con anagrafica clienti B2B, catering e punti vendita',                    costo_mensile:30,   costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales ops panificazione',           cosa:'Pipeline clienti B2B con tracking ordini ricorrenti e consegne',                    costo_mensile:100,  costo_setup:600,  tempo_mesi:2 },
      '3-4': { chi:'Revenue ops forno',                 cosa:'Forecasting produzione-vendita, gestione ordini programmati e stagionalità',         costo_mensile:380,  costo_setup:2000, tempo_mesi:2 },
      '4-5': { chi:'Head of ops bakery',                cosa:'Sistema integrato produzione-ordini-consegna con previsione domanda',                costo_mensile:900,  costo_setup:5000, tempo_mesi:5 }
    },
    team: {
      '1-2': { chi:'HR consulente bakery',              cosa:'Analisi competenze team vendita e servizio al banco',                                costo_mensile:200,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales trainer forno',               cosa:'Formazione vendita al banco, upselling e gestione clienti catering',                 costo_mensile:2500, costo_setup:1000, tempo_mesi:2 },
      '3-4': { chi:'Head of sales forno',               cosa:'Struttura team: responsabili punto vendita, agenti B2B e delivery manager',          costo_mensile:3800, costo_setup:3000, tempo_mesi:3 },
      '4-5': { chi:'VP Sales bakery',                   cosa:'Organizzazione retail completa con area manager e franchising coordinator',           costo_mensile:7000, costo_setup:9000, tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Process analyst bakery',            cosa:'Mappatura processo produzione-vendita e gestione invenduto',                          costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Operations consultant forno',       cosa:'Ottimizzazione ciclo produzione-consegna e riduzione sprechi',                        costo_mensile:300,  costo_setup:800,  tempo_mesi:2 },
      '3-4': { chi:'Operations manager forno',          cosa:'Automazione ordini ricorrenti, gestione turni produzione e logistica',                 costo_mensile:650,  costo_setup:2500, tempo_mesi:3 },
      '4-5': { chi:'COO bakery',                        cosa:'Supply chain panificazione con produzione centralizzata e hub distributivi',           costo_mensile:2500, costo_setup:8000, tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Analista pricing forno',            cosa:'Analisi marginalità per prodotto e canale vendita',                                    costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Revenue analyst panificazione',     cosa:'Modello pricing per canale con ottimizzazione mix e gestione peso/prezzo',              costo_mensile:200,  costo_setup:500,  tempo_mesi:2 },
      '3-4': { chi:'Pricing manager forno',             cosa:'Strategia pricing retail-B2B-delivery con promozioni stagionali',                       costo_mensile:550,  costo_setup:1800, tempo_mesi:2 },
      '4-5': { chi:'Chief pricing bakery',              cosa:'Revenue management multi-punto vendita con dynamic pricing e bundle strategy',           costo_mensile:1000, costo_setup:5000, tempo_mesi:4 }
    },
    marketing: {
      '1-2': { chi:'Marketing consultant forno',        cosa:'Audit brand, immagine punti vendita e comunicazione locale',                            costo_mensile:300,  costo_setup:300,  tempo_mesi:1 },
      '2-3': { chi:'Marketing manager bakery',          cosa:'Piano marketing locale: social, volantini, eventi e programma fedeltà',                  costo_mensile:900,  costo_setup:2000, tempo_mesi:2 },
      '3-4': { chi:'Marketing director forno',          cosa:'Strategia brand con storytelling artigianale, campagne social e PR locale',               costo_mensile:1800, costo_setup:4500, tempo_mesi:3 },
      '4-5': { chi:'CMO bakery',                        cosa:'Brand building regionale/nazionale, loyalty program avanzato e media mix',                costo_mensile:4000, costo_setup:10000,tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Web designer bakery',               cosa:'Audit sito con verifica orari, prodotti e mappa punti vendita',                          costo_mensile:100,  costo_setup:200,  tempo_mesi:1 },
      '2-3': { chi:'Web developer forno',               cosa:'Restyling sito con catalogo prodotti, prenotazione e orari in tempo reale',               costo_mensile:300,  costo_setup:1500, tempo_mesi:2 },
      '3-4': { chi:'Digital PM bakery',                  cosa:'Piattaforma con ordini online, prenotazione torte e area catering B2B',                   costo_mensile:550,  costo_setup:4000, tempo_mesi:2 },
      '4-5': { chi:'Head of digital forno',              cosa:'Ecosistema digitale: app ordini, digital signage punti vendita e CRM cliente',            costo_mensile:1100, costo_setup:8000, tempo_mesi:5 }
    },
    ecommerce: {
      '1-2': { chi:'E-commerce analyst bakery',          cosa:'Analisi opportunità ordini online e consegna a domicilio',                                costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'E-commerce manager forno',           cosa:'Setup ordini online con consegna locale e ritiro in negozio',                              costo_mensile:500,  costo_setup:2500, tempo_mesi:2 },
      '3-4': { chi:'Head of delivery forno',             cosa:'Piattaforma e-commerce con delivery proprio, abbonamenti pane e gift box',                 costo_mensile:1500, costo_setup:5000, tempo_mesi:3 },
      '4-5': { chi:'Director e-commerce bakery',         cosa:'Omnichannel con app proprietaria, dark kitchen e spedizione prodotti secchi',               costo_mensile:3500, costo_setup:12000,tempo_mesi:5 }
    }
  },

  // ═══════════════════════════════════════════
  //  4. ALIMENTARE — CONSERVE
  // ═══════════════════════════════════════════
  alimentare_conserve: {
    vendite: {
      '1-2': { chi:'Consulente vendite conserve',       cosa:'Audit canali GDO, distribuzione tradizionale e opportunità export',                  costo_mensile:300,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales manager conserve',            cosa:'Sviluppo listing GDO, negoziazione private label e apertura export',                 costo_mensile:2300, costo_setup:2000, tempo_mesi:2 },
      '3-4': { chi:'Direttore commerciale conserve',    cosa:'Strategia vendite GDO nazionale e internazionale con private label strategy',        costo_mensile:4300, costo_setup:5000, tempo_mesi:3 },
      '4-5': { chi:'Chief Revenue Officer conserve',    cosa:'Espansione globale con accordi quadro catene internazionali e co-packing',           costo_mensile:8500, costo_setup:12000,tempo_mesi:5 }
    },
    pipeline: {
      '1-2': { chi:'CRM specialist conserve',           cosa:'Setup CRM con anagrafica buyer GDO, distributori e importatori',                     costo_mensile:30,   costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales ops conserviero',              cosa:'Pipeline per insegna GDO con tracking listing, rotazioni e promo',                   costo_mensile:140,  costo_setup:800,  tempo_mesi:2 },
      '3-4': { chi:'Revenue ops conserve',               cosa:'Forecasting per canale e paese, analisi sell-out e gestione stock',                  costo_mensile:480,  costo_setup:2500, tempo_mesi:2 },
      '4-5': { chi:'Head of sales ops conserve',         cosa:'Modello predittivo domanda GDO internazionale con gestione campagne e EDI',          costo_mensile:1100, costo_setup:6000, tempo_mesi:5 }
    },
    team: {
      '1-2': { chi:'HR consulente food industry',        cosa:'Analisi competenze team vendita e conoscenza canale GDO',                            costo_mensile:200,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales trainer conserve',             cosa:'Formazione su category management, negoziazione GDO e gestione promo',               costo_mensile:2800, costo_setup:1500, tempo_mesi:2 },
      '3-4': { chi:'Head of sales conserve',             cosa:'Struttura team: key account nazionali, export manager e private label PM',            costo_mensile:4800, costo_setup:4000, tempo_mesi:3 },
      '4-5': { chi:'VP Sales conserviero',               cosa:'Organizzazione commerciale internazionale con country manager e trade team',          costo_mensile:9000, costo_setup:12000,tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Process analyst conserve',           cosa:'Mappatura processo produzione-stoccaggio-distribuzione e shelf life',                  costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Operations consultant conserve',     cosa:'Ottimizzazione pianificazione produzione, gestione campagne e stoccaggio',             costo_mensile:450,  costo_setup:1200, tempo_mesi:2 },
      '3-4': { chi:'Operations manager conserviero',     cosa:'Automazione EDI GDO, gestione co-packing e tracciabilità filiera',                     costo_mensile:900,  costo_setup:3500, tempo_mesi:3 },
      '4-5': { chi:'COO conserve',                       cosa:'Supply chain internazionale con pianificazione campagne e logistica multi-paese',       costo_mensile:4000, costo_setup:10000,tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Analista pricing conserve',          cosa:'Analisi marginalità per prodotto, formato e canale distributivo',                       costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Revenue analyst conserviero',        cosa:'Modello pricing per canale con simulazione promo GDO e contributi trade',               costo_mensile:250,  costo_setup:700,  tempo_mesi:2 },
      '3-4': { chi:'Pricing manager conserve',           cosa:'Strategia pricing brand-private label, ottimizzazione trade spending',                   costo_mensile:650,  costo_setup:2500, tempo_mesi:2 },
      '4-5': { chi:'Chief pricing conserviero',          cosa:'Revenue management con price pack architecture e trade promotion optimization',          costo_mensile:1300, costo_setup:7000, tempo_mesi:5 }
    },
    marketing: {
      '1-2': { chi:'Marketing consultant conserve',      cosa:'Audit brand, packaging e posizionamento scaffale GDO',                                   costo_mensile:300,  costo_setup:400,  tempo_mesi:1 },
      '2-3': { chi:'Brand manager conserve',             cosa:'Piano marketing: restyling packaging, campagne trade e comunicazione consumer',           costo_mensile:1100, costo_setup:2500, tempo_mesi:2 },
      '3-4': { chi:'Marketing director conserviero',     cosa:'Strategia brand con campagne mass media, in-store e digital content',                      costo_mensile:2000, costo_setup:5500, tempo_mesi:3 },
      '4-5': { chi:'CMO conserve',                       cosa:'Brand building internazionale, innovazione prodotto e category leadership',                costo_mensile:4500, costo_setup:12000,tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Web designer conserve',              cosa:'Audit sito con verifica catalogo prodotti, ricette e valori nutrizionali',                  costo_mensile:100,  costo_setup:300,  tempo_mesi:1 },
      '2-3': { chi:'Web developer conserviero',          cosa:'Restyling sito con catalogo prodotti, ricettario e area trade B2B',                         costo_mensile:350,  costo_setup:2000, tempo_mesi:2 },
      '3-4': { chi:'Digital PM conserve',                cosa:'Piattaforma con portale buyer GDO, catalogo multilingua e area stampa',                     costo_mensile:600,  costo_setup:4500, tempo_mesi:2 },
      '4-5': { chi:'Head of digital conserve',           cosa:'Ecosistema digitale: portale trade internazionale, content hub e DAM',                       costo_mensile:1200, costo_setup:9000, tempo_mesi:5 }
    },
    ecommerce: {
      '1-2': { chi:'E-commerce analyst conserve',        cosa:'Analisi opportunità vendita online e marketplace alimentari',                                costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'E-commerce manager conserve',        cosa:'Setup shop online B2C, presenza su marketplace food e Amazon',                               costo_mensile:600,  costo_setup:3000, tempo_mesi:3 },
      '3-4': { chi:'Head of e-commerce conserve',        cosa:'Piattaforma e-commerce con box degustazione, abbonamenti e ricettario integrato',             costo_mensile:1800, costo_setup:6000, tempo_mesi:3 },
      '4-5': { chi:'Director e-commerce conserviero',    cosa:'Omnichannel con marketplace proprietario, DTC internazionale e subscription box',              costo_mensile:4200, costo_setup:14000,tempo_mesi:6 }
    }
  },

  // ═══════════════════════════════════════════
  //  5. ALIMENTARE — INGREDIENTI (B2B Food)
  // ═══════════════════════════════════════════
  alimentare_ingredienti: {
    vendite: {
      '1-2': { chi:'Consulente vendite ingredienti',     cosa:'Audit portafoglio clienti B2B food, mappatura industrie e laboratori',                 costo_mensile:300,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales manager ingredienti',          cosa:'Sviluppo clienti industria alimentare con campionature e specifiche tecniche',         costo_mensile:2100, costo_setup:2000, tempo_mesi:2 },
      '3-4': { chi:'Direttore commerciale ingredienti',  cosa:'Strategia vendite B2B con key account industria, R&D partnership e contratti',         costo_mensile:3800, costo_setup:4000, tempo_mesi:3 },
      '4-5': { chi:'CRO ingredienti alimentari',         cosa:'Espansione internazionale B2B, accordi quadro multinazionali e innovazione',           costo_mensile:7500, costo_setup:10000,tempo_mesi:5 }
    },
    pipeline: {
      '1-2': { chi:'CRM specialist B2B food',            cosa:'Setup CRM con anagrafica aziende food, buyer tecnici e R&D manager',                   costo_mensile:30,   costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales ops ingredienti',              cosa:'Pipeline B2B con tracking campionature, test e approvazioni tecniche',                   costo_mensile:120,  costo_setup:700,  tempo_mesi:2 },
      '3-4': { chi:'Revenue ops ingredienti',            cosa:'Forecasting B2B per settore e cliente, gestione contratti annuali',                      costo_mensile:400,  costo_setup:2000, tempo_mesi:2 },
      '4-5': { chi:'Head of ops ingredienti',            cosa:'Sistema integrato vendite-R&D-produzione con forecasting contratti pluriennali',          costo_mensile:1000, costo_setup:5500, tempo_mesi:5 }
    },
    team: {
      '1-2': { chi:'HR consulente B2B food',             cosa:'Analisi competenze team tecnico-commerciale e gap formativi',                             costo_mensile:200,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales trainer ingredienti',          cosa:'Formazione tecnica su formulazioni, normativa e vendita consultiva B2B',                  costo_mensile:2600, costo_setup:1500, tempo_mesi:2 },
      '3-4': { chi:'Head of sales ingredienti',          cosa:'Struttura team: tecnici commerciali, application specialist e key account',               costo_mensile:4000, costo_setup:3500, tempo_mesi:3 },
      '4-5': { chi:'VP Sales ingredienti',               cosa:'Organizzazione con regional sales director, application lab e customer service',          costo_mensile:7500, costo_setup:10000,tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Process analyst ingredienti',        cosa:'Mappatura processo campionatura-approvazione-ordine e tempi ciclo',                        costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Operations consultant B2B food',     cosa:'Ottimizzazione ciclo campionatura, gestione specifiche e certificazioni',                  costo_mensile:400,  costo_setup:1000, tempo_mesi:2 },
      '3-4': { chi:'Operations manager ingredienti',     cosa:'Automazione ordini B2B, gestione lotti e tracciabilità per food safety',                    costo_mensile:800,  costo_setup:3000, tempo_mesi:3 },
      '4-5': { chi:'COO ingredienti alimentari',         cosa:'Supply chain B2B integrata con pianificazione produzioni e logistica just-in-time',          costo_mensile:3500, costo_setup:9000, tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Analista pricing ingredienti',       cosa:'Analisi marginalità per cliente, volume e complessità formulazione',                         costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Revenue analyst B2B food',           cosa:'Modello pricing per volume e contratto con escalation e formule indicizzate',                 costo_mensile:230,  costo_setup:600,  tempo_mesi:2 },
      '3-4': { chi:'Pricing manager ingredienti',        cosa:'Strategia pricing B2B con contratti a volume, indici materie prime e hedging',                 costo_mensile:600,  costo_setup:2000, tempo_mesi:2 },
      '4-5': { chi:'Chief pricing ingredienti',          cosa:'Revenue management B2B con modelli di pricing dinamico e value-based pricing',                  costo_mensile:1100, costo_setup:6000, tempo_mesi:5 }
    },
    marketing: {
      '1-2': { chi:'Marketing consultant B2B food',      cosa:'Audit posizionamento tecnico, documentazione prodotto e presenza fiere',                        costo_mensile:300,  costo_setup:300,  tempo_mesi:1 },
      '2-3': { chi:'Marketing manager ingredienti',      cosa:'Piano marketing B2B: content tecnico, fiere di settore e webinar formativi',                     costo_mensile:800,  costo_setup:2000, tempo_mesi:2 },
      '3-4': { chi:'Marketing director ingredienti',     cosa:'Strategia thought leadership: white paper, application lab e partnership R&D',                    costo_mensile:1600, costo_setup:4000, tempo_mesi:3 },
      '4-5': { chi:'CMO ingredienti alimentari',         cosa:'Brand positioning globale B2B, innovation center e programma co-development',                      costo_mensile:3800, costo_setup:10000,tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Web designer B2B food',              cosa:'Audit sito con verifica catalogo tecnico, schede prodotto e certificazioni',                        costo_mensile:100,  costo_setup:200,  tempo_mesi:1 },
      '2-3': { chi:'Web developer ingredienti',          cosa:'Restyling sito con catalogo tecnico, motore ricerca ingredienti e area download',                    costo_mensile:350,  costo_setup:2000, tempo_mesi:2 },
      '3-4': { chi:'Digital PM ingredienti',             cosa:'Piattaforma B2B con configuratore formulazioni, richiesta campioni e portale tecnico',               costo_mensile:600,  costo_setup:5000, tempo_mesi:2 },
      '4-5': { chi:'Head of digital ingredienti',        cosa:'Ecosistema digitale: portale clienti, knowledge base tecnica e application finder',                   costo_mensile:1100, costo_setup:9000, tempo_mesi:5 }
    },
    ecommerce: {
      '1-2': { chi:'E-commerce analyst B2B',             cosa:'Analisi opportunità ordini online B2B e portale riordino',                                             costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'E-commerce manager ingredienti',     cosa:'Setup portale ordini B2B con listino personalizzato e storico acquisti',                                costo_mensile:450,  costo_setup:2500, tempo_mesi:2 },
      '3-4': { chi:'Head of digital commerce B2B',       cosa:'Piattaforma B2B con ordini automatici, riordino programmato e integrazione ERP',                        costo_mensile:1300, costo_setup:5500, tempo_mesi:3 },
      '4-5': { chi:'Director digital commerce B2B',      cosa:'Marketplace B2B ingredienti con AI recommendation, self-service e API integration',                      costo_mensile:3000, costo_setup:12000,tempo_mesi:5 }
    }
  },

  // ═══════════════════════════════════════════
  //  6. ALIMENTARE — BIRRA (Birrifici artigianali)
  // ═══════════════════════════════════════════
  alimentare_birra: {
    vendite: {
      '1-2': { chi:'Consulente vendite birra',           cosa:'Audit canali: pub, ristoranti, distribuzione e taproom',                                  costo_mensile:300,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales manager birrificio',           cosa:'Sviluppo rete pub e ristoranti, accordi distributori e eventi degustazione',              costo_mensile:2000, costo_setup:1800, tempo_mesi:2 },
      '3-4': { chi:'Direttore commerciale birra',        cosa:'Strategia multichannel: HORECA, distribuzione, taproom ed export',                         costo_mensile:3500, costo_setup:4000, tempo_mesi:3 },
      '4-5': { chi:'Chief Revenue Officer brewery',      cosa:'Espansione nazionale e export, contratti catene pub e distribuzione organizzata',           costo_mensile:7000, costo_setup:10000,tempo_mesi:5 }
    },
    pipeline: {
      '1-2': { chi:'CRM specialist birra',               cosa:'Setup CRM con anagrafica pub, ristoranti, distributori e beer shop',                       costo_mensile:30,   costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales ops birrificio',               cosa:'Pipeline per canale con tracking fusti, ordini ricorrenti e stagionalità',                  costo_mensile:110,  costo_setup:700,  tempo_mesi:2 },
      '3-4': { chi:'Revenue ops birra',                  cosa:'Forecasting produzione-vendita per stile birra, canale e stagione',                         costo_mensile:420,  costo_setup:2200, tempo_mesi:2 },
      '4-5': { chi:'Head of ops brewery',                cosa:'Sistema integrato cotte-vendite con previsione domanda e gestione materie prime',            costo_mensile:1050, costo_setup:5500, tempo_mesi:5 }
    },
    team: {
      '1-2': { chi:'HR consulente brewery',              cosa:'Analisi competenze team vendita e conoscenza prodotto birra',                                costo_mensile:200,  costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Sales trainer birrificio',           cosa:'Formazione team su stili birra, abbinamenti food e vendita esperienziale',                    costo_mensile:2600, costo_setup:1200, tempo_mesi:2 },
      '3-4': { chi:'Head of sales birra',                cosa:'Struttura team: agenti HORECA, taproom manager, export e beer ambassador',                    costo_mensile:4000, costo_setup:3000, tempo_mesi:3 },
      '4-5': { chi:'VP Sales brewery',                   cosa:'Organizzazione con area manager, brand ambassador team e taproom operations',                 costo_mensile:7500, costo_setup:10000,tempo_mesi:5 }
    },
    processi: {
      '1-2': { chi:'Process analyst brewery',            cosa:'Mappatura processo cotta-confezionamento-distribuzione e gestione fusti',                      costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Operations consultant birra',        cosa:'Ottimizzazione pianificazione cotte, gestione magazzino e logistica fusti',                    costo_mensile:350,  costo_setup:1000, tempo_mesi:2 },
      '3-4': { chi:'Operations manager birrificio',      cosa:'Automazione ordini HORECA, tracciabilità lotti e gestione deposito fusti',                      costo_mensile:750,  costo_setup:3000, tempo_mesi:3 },
      '4-5': { chi:'COO brewery',                        cosa:'Supply chain birrificio con pianificazione produzione e distribuzione multicanale',              costo_mensile:3200, costo_setup:9000, tempo_mesi:5 }
    },
    ricavi: {
      '1-2': { chi:'Analista pricing birra',             cosa:'Analisi marginalità per formato (fusto, bottiglia, lattina) e canale',                          costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'Revenue analyst birrificio',         cosa:'Modello pricing per canale e formato con gestione listino HORECA e retail',                      costo_mensile:240,  costo_setup:600,  tempo_mesi:2 },
      '3-4': { chi:'Pricing manager birra',              cosa:'Strategia pricing multichannel con ottimizzazione mix formato-canale',                            costo_mensile:600,  costo_setup:2000, tempo_mesi:2 },
      '4-5': { chi:'Chief pricing brewery',              cosa:'Revenue management con limited edition pricing, taproom optimization e export pricing',            costo_mensile:1200, costo_setup:6000, tempo_mesi:5 }
    },
    marketing: {
      '1-2': { chi:'Marketing consultant birra',         cosa:'Audit brand birrificio, packaging etichette e comunicazione taproom',                             costo_mensile:300,  costo_setup:500,  tempo_mesi:1 },
      '2-3': { chi:'Marketing manager birrificio',       cosa:'Piano marketing: social craft beer, eventi taproom e collaborazioni birrifici',                    costo_mensile:1100, costo_setup:2500, tempo_mesi:2 },
      '3-4': { chi:'Marketing director birra',           cosa:'Strategia brand craft con beer festival, limited edition e influencer beer',                        costo_mensile:2100, costo_setup:5500, tempo_mesi:3 },
      '4-5': { chi:'CMO brewery',                        cosa:'Brand building nazionale, beer tourism, collab brewing e community management',                      costo_mensile:4800, costo_setup:13000,tempo_mesi:5 }
    },
    sitoweb: {
      '1-2': { chi:'Web designer brewery',               cosa:'Audit sito con verifica catalogo birre, taproom info e dove trovarci',                               costo_mensile:100,  costo_setup:300,  tempo_mesi:1 },
      '2-3': { chi:'Web developer birrificio',           cosa:'Restyling sito con catalogo birre, beer finder, prenotazione taproom e eventi',                       costo_mensile:380,  costo_setup:2000, tempo_mesi:2 },
      '3-4': { chi:'Digital PM brewery',                 cosa:'Piattaforma con beer club area, prenotazione eventi e portale HORECA B2B',                             costo_mensile:700,  costo_setup:5000, tempo_mesi:3 },
      '4-5': { chi:'Head of digital brewery',            cosa:'Ecosistema digitale: app beer club, virtual tasting, beer finder e community',                          costo_mensile:1300, costo_setup:10000,tempo_mesi:5 }
    },
    ecommerce: {
      '1-2': { chi:'E-commerce analyst birra',           cosa:'Analisi opportunità vendita online DTC e marketplace birra',                                             costo_mensile:0,    costo_setup:0,    tempo_mesi:1 },
      '2-3': { chi:'E-commerce manager birrificio',      cosa:'Setup shop online DTC con spedizione condizionata e beer club subscription',                              costo_mensile:700,  costo_setup:3500, tempo_mesi:3 },
      '3-4': { chi:'Head of DTC brewery',                cosa:'Piattaforma DTC con abbonamenti, limited edition drop e gift pack personalizzati',                         costo_mensile:2200, costo_setup:7000, tempo_mesi:3 },
      '4-5': { chi:'Director e-commerce brewery',        cosa:'Omnichannel beer commerce con app, taproom pickup, subscription e marketplace craft',                       costo_mensile:4800, costo_setup:15000,tempo_mesi:6 }
    }
  }

};

const _SD_TECH = {

  /* ================================================================
     TECH SaaS – ARR, MRR, churn, onboarding, customer success, PLG
     ================================================================ */
  tech_saas: {

    vendite: {
      '1-2': { chi: 'Founder o CTO',                  cosa: 'Audit informale del processo di vendita SaaS e gestione trial-to-paid',                  costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Sales specialist SaaS',           cosa: 'Strutturazione processo commerciale con focus su MRR e ciclo demo-close',                costo_mensile: 3000,  costo_setup: 1000,  tempo_mesi: 2 },
      '3-4': { chi: 'Sales manager SaaS dedicato',     cosa: 'Gestione pipeline enterprise con trattative ARR e strategie di upsell',                  costo_mensile: 5000,  costo_setup: 3000,  tempo_mesi: 3 },
      '4-5': { chi: 'VP sales SaaS',                   cosa: 'Strategia commerciale product-led growth con team SDR, AE e customer success',           costo_mensile: 10000, costo_setup: 8000,  tempo_mesi: 5 },
    },

    pipeline: {
      '1-2': { chi: 'Founder o dev interno',           cosa: 'Tracciamento lead e trial in foglio condiviso con metriche base',                        costo_mensile: 50,    costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'CRM specialist SaaS',             cosa: 'CRM configurato con stage specifici per trial, demo, onboarding e churn',                costo_mensile: 250,   costo_setup: 800,   tempo_mesi: 2 },
      '3-4': { chi: 'Revenue ops analyst',              cosa: 'Dashboard predittive su MRR, churn rate, LTV/CAC e cohort analysis',                     costo_mensile: 800,   costo_setup: 3000,  tempo_mesi: 2 },
      '4-5': { chi: 'Head of revenue operations',       cosa: 'Orchestrazione completa del funnel PLG con scoring, forecasting e automazioni',          costo_mensile: 1600,  costo_setup: 7000,  tempo_mesi: 5 },
    },

    team: {
      '1-2': { chi: 'Founder',                         cosa: 'Valutazione competenze commerciali del team tecnico SaaS esistente',                     costo_mensile: 300,   costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'HR consultant tech',              cosa: 'Recruiting e onboarding primo SDR e account executive per vendita SaaS',                 costo_mensile: 3500,  costo_setup: 1500,  tempo_mesi: 3 },
      '3-4': { chi: 'Sales enablement manager',        cosa: 'Programma di coaching su vendita consultiva SaaS e customer success',                    costo_mensile: 5500,  costo_setup: 4000,  tempo_mesi: 3 },
      '4-5': { chi: 'VP sales & talent SaaS',          cosa: 'Costruzione team commerciale completo con SDR, AE, CSM e sales ops',                    costo_mensile: 11000, costo_setup: 12000, tempo_mesi: 5 },
    },

    processi: {
      '1-2': { chi: 'Founder o PM',                    cosa: 'Documentazione informale dei processi di onboarding cliente e supporto',                 costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Process analyst SaaS',            cosa: 'Formalizzazione workflow trial, onboarding, billing e gestione churn',                   costo_mensile: 500,   costo_setup: 1000,  tempo_mesi: 2 },
      '3-4': { chi: 'Operations manager SaaS',         cosa: 'Automazione processi di provisioning, renewal e escalation con tooling',                 costo_mensile: 1200,  costo_setup: 4000,  tempo_mesi: 3 },
      '4-5': { chi: 'COO SaaS',                        cosa: 'Reingegnerizzazione completa dei processi operativi PLG con AI e automation',            costo_mensile: 4500,  costo_setup: 12000, tempo_mesi: 5 },
    },

    ricavi: {
      '1-2': { chi: 'Founder',                         cosa: 'Analisi marginalità per piano e segmento, calcolo MRR e churn base',                    costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Controller SaaS',                 cosa: 'Modello di pricing per piani SaaS con analisi LTV, CAC e payback period',               costo_mensile: 350,   costo_setup: 500,   tempo_mesi: 2 },
      '3-4': { chi: 'Revenue manager SaaS',            cosa: 'Ottimizzazione pricing tiers, strategie di expansion revenue e net retention',           costo_mensile: 800,   costo_setup: 2500,  tempo_mesi: 2 },
      '4-5': { chi: 'CFO fractional SaaS',             cosa: 'Piano ricavi pluriennale con modelli ARR, cohort analysis e scenario planning',          costo_mensile: 1800,  costo_setup: 6000,  tempo_mesi: 5 },
    },

    marketing: {
      '1-2': { chi: 'Founder o dev',                   cosa: 'Presenza base su Product Hunt, LinkedIn e community tech di settore',                    costo_mensile: 300,   costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Growth marketer SaaS',            cosa: 'Content marketing tecnico, SEO per keyword SaaS e campagne trial acquisition',           costo_mensile: 1200,  costo_setup: 1500,  tempo_mesi: 3 },
      '3-4': { chi: 'Marketing manager SaaS',          cosa: 'Campagne inbound PLG con webinar, demo automatiche e nurturing avanzato',                costo_mensile: 2800,  costo_setup: 5000,  tempo_mesi: 3 },
      '4-5': { chi: 'CMO fractional SaaS',             cosa: 'Strategia marketing integrata PLG e sales-led con brand positioning globale',            costo_mensile: 5500,  costo_setup: 15000, tempo_mesi: 5 },
    },

    sitoweb: {
      '1-2': { chi: 'Dev interno',                     cosa: 'Landing page prodotto con pricing, feature list e form richiesta demo',                  costo_mensile: 150,   costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Web developer SaaS',              cosa: 'Sito prodotto professionale con blog tecnico, documentazione e signup flow',             costo_mensile: 500,   costo_setup: 2000,  tempo_mesi: 2 },
      '3-4': { chi: 'Digital product designer',         cosa: 'Portale con area clienti, knowledge base, changelog e onboarding interattivo',           costo_mensile: 900,   costo_setup: 5000,  tempo_mesi: 2 },
      '4-5': { chi: 'Head of digital experience',       cosa: 'Piattaforma web completa con self-service, community, academy e chatbot AI',             costo_mensile: 2000,  costo_setup: 12000, tempo_mesi: 5 },
    },

    ecommerce: {
      '1-2': { chi: 'Non necessario',                  cosa: 'Nessun e-commerce attivo, vendita tramite demo e contatto diretto',                      costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Dev interno',                     cosa: 'Integrazione Stripe per self-service signup e gestione abbonamenti base',                costo_mensile: 600,   costo_setup: 1500,  tempo_mesi: 2 },
      '3-4': { chi: 'E-commerce manager SaaS',         cosa: 'Piattaforma billing completa con upgrade, downgrade, add-on e fatturazione',             costo_mensile: 2000,  costo_setup: 6000,  tempo_mesi: 3 },
      '4-5': { chi: 'Head of digital commerce',         cosa: 'Marketplace self-service con pricing dinamico, usage-based billing e upsell AI',         costo_mensile: 4500,  costo_setup: 15000, tempo_mesi: 5 },
    },
  },

  /* ================================================================
     TECH SYSTEM INTEGRATOR – progetti, consulting, partnership vendor
     ================================================================ */
  tech_system_integrator: {

    vendite: {
      '1-2': { chi: 'Titolare o partner tecnico',      cosa: 'Audit informale del processo di vendita progetti e consulting IT',                       costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Sales consultant IT',              cosa: 'Strutturazione pipeline per progetti Microsoft, SAP e system integration',               costo_mensile: 3200,  costo_setup: 1200,  tempo_mesi: 2 },
      '3-4': { chi: 'Sales manager enterprise',         cosa: 'Gestione trattative complesse con vendor partnership e progetti multi-fase',             costo_mensile: 5500,  costo_setup: 3500,  tempo_mesi: 3 },
      '4-5': { chi: 'Direttore commerciale SI',         cosa: 'Strategia vendite enterprise con partner program vendor e gestione gare',                costo_mensile: 10000, costo_setup: 7000,  tempo_mesi: 5 },
    },

    pipeline: {
      '1-2': { chi: 'Project manager interno',         cosa: 'Mappatura opportunità attive e prospect enterprise in foglio condiviso',                 costo_mensile: 50,    costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'CRM specialist enterprise',       cosa: 'CRM configurato con stage per pre-sales, POC, implementazione e go-live',               costo_mensile: 300,   costo_setup: 1000,  tempo_mesi: 2 },
      '3-4': { chi: 'Revenue ops analyst',              cosa: 'Dashboard predittive su pipeline progetti, win rate e forecast trimestrale',              costo_mensile: 700,   costo_setup: 2500,  tempo_mesi: 2 },
      '4-5': { chi: 'Head of revenue operations',       cosa: 'Orchestrazione pipeline enterprise con deal desk, scoring e partner tracking',            costo_mensile: 1500,  costo_setup: 5000,  tempo_mesi: 5 },
    },

    team: {
      '1-2': { chi: 'Titolare',                        cosa: 'Valutazione competenze pre-sales e commerciali del team tecnico',                        costo_mensile: 300,   costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'HR consultant tech',              cosa: 'Recruiting solution architect e pre-sales consultant con certificazioni',                costo_mensile: 3800,  costo_setup: 2000,  tempo_mesi: 3 },
      '3-4': { chi: 'Sales trainer enterprise',         cosa: 'Programma coaching su vendita consulenziale e gestione relazioni vendor',                 costo_mensile: 6000,  costo_setup: 5000,  tempo_mesi: 3 },
      '4-5': { chi: 'VP sales & delivery',              cosa: 'Costruzione team commerciale enterprise con pre-sales, PM e partner manager',             costo_mensile: 12000, costo_setup: 15000, tempo_mesi: 6 },
    },

    processi: {
      '1-2': { chi: 'Project manager',                 cosa: 'Documentazione informale dei processi di delivery e gestione progetti',                  costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Process analyst',                  cosa: 'Formalizzazione workflow pre-sales, delivery e post-vendita con SLA',                    costo_mensile: 600,   costo_setup: 1200,  tempo_mesi: 2 },
      '3-4': { chi: 'Operations manager SI',            cosa: 'Automazione processi di project delivery, resource planning e billing',                  costo_mensile: 1300,  costo_setup: 4500,  tempo_mesi: 3 },
      '4-5': { chi: 'COO system integrator',            cosa: 'Reingegnerizzazione processi operativi con PMO, governance e vendor management',         costo_mensile: 5000,  costo_setup: 14000, tempo_mesi: 5 },
    },

    ricavi: {
      '1-2': { chi: 'Titolare',                        cosa: 'Analisi marginalità per progetto, consulting e servizi ricorrenti',                      costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Controller',                       cosa: 'Modello di pricing per giornate consulting, progetti a corpo e managed services',        costo_mensile: 400,   costo_setup: 600,   tempo_mesi: 2 },
      '3-4': { chi: 'Revenue manager SI',               cosa: 'Ottimizzazione mix ricavi progetto vs ricorrenti e marginalità per practice',            costo_mensile: 800,   costo_setup: 2000,  tempo_mesi: 2 },
      '4-5': { chi: 'CFO fractional SI',                cosa: 'Piano ricavi pluriennale con modelli per practice, partner rebate e crescita ARR',       costo_mensile: 2000,  costo_setup: 5000,  tempo_mesi: 5 },
    },

    marketing: {
      '1-2': { chi: 'Partner o tecnico senior',         cosa: 'Presenza base su LinkedIn e directory vendor Microsoft, SAP e Oracle',                   costo_mensile: 300,   costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Marketing specialist IT',          cosa: 'Content marketing su case study progetti e partecipazione eventi vendor',                costo_mensile: 1300,  costo_setup: 1500,  tempo_mesi: 3 },
      '3-4': { chi: 'Marketing manager enterprise',     cosa: 'Campagne ABM per target enterprise con webinar tecnici e whitepaper',                    costo_mensile: 3000,  costo_setup: 6000,  tempo_mesi: 3 },
      '4-5': { chi: 'CMO fractional SI',                cosa: 'Strategia marketing integrata con co-marketing vendor e thought leadership',             costo_mensile: 6000,  costo_setup: 18000, tempo_mesi: 6 },
    },

    sitoweb: {
      '1-2': { chi: 'Dev interno',                     cosa: 'Sito vetrina con pagine competenze, partnership vendor e form contatto',                 costo_mensile: 150,   costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Web developer',                    cosa: 'Sito professionale con area practice, case study e certificazioni vendor',               costo_mensile: 500,   costo_setup: 2000,  tempo_mesi: 2 },
      '3-4': { chi: 'Digital agency enterprise',        cosa: 'Portale con area clienti, documentazione progetto e richiesta supporto',                 costo_mensile: 1000,  costo_setup: 6000,  tempo_mesi: 3 },
      '4-5': { chi: 'Head of digital experience',       cosa: 'Piattaforma web con partner portal, project tracker e knowledge base AI',                costo_mensile: 2200,  costo_setup: 14000, tempo_mesi: 5 },
    },

    ecommerce: {
      '1-2': { chi: 'Non necessario',                  cosa: 'Nessuna vendita online attiva per servizi di system integration',                        costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Web developer',                    cosa: 'Shop online per licenze software, pacchetti supporto e formazione a catalogo',           costo_mensile: 700,   costo_setup: 1800,  tempo_mesi: 2 },
      '3-4': { chi: 'E-commerce manager',               cosa: 'Piattaforma vendita servizi ricorrenti con abbonamenti e configuratore',                 costo_mensile: 2000,  costo_setup: 7000,  tempo_mesi: 3 },
      '4-5': { chi: 'Head of digital commerce',         cosa: 'Marketplace servizi IT con configuratore progetti, licensing e billing ricorrente',       costo_mensile: 4500,  costo_setup: 16000, tempo_mesi: 5 },
    },
  },

  /* ================================================================
     TECH DIGITAL AGENCY – clienti, retainer, project-based, portfolio
     ================================================================ */
  tech_digital_agency: {

    vendite: {
      '1-2': { chi: 'Founder o creative director',     cosa: 'Audit informale del processo di acquisizione clienti e gestione brief',                  costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Business developer agency',       cosa: 'Strutturazione pipeline commerciale per progetti e retainer digitali',                   costo_mensile: 2800,  costo_setup: 800,   tempo_mesi: 2 },
      '3-4': { chi: 'Sales manager agency',             cosa: 'Gestione trattative complesse per progetti enterprise e retainer strategici',             costo_mensile: 4500,  costo_setup: 2500,  tempo_mesi: 3 },
      '4-5': { chi: 'Direttore commerciale agency',     cosa: 'Strategia new business con portfolio, case study e gare per clienti enterprise',          costo_mensile: 9000,  costo_setup: 6000,  tempo_mesi: 5 },
    },

    pipeline: {
      '1-2': { chi: 'Founder o account',               cosa: 'Lista clienti e prospect in foglio condiviso con stato progetto',                        costo_mensile: 50,    costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'CRM specialist',                   cosa: 'CRM configurato con stage per brief, proposta, progetto e retainer renewal',             costo_mensile: 200,   costo_setup: 700,   tempo_mesi: 2 },
      '3-4': { chi: 'Revenue ops analyst',               cosa: 'Dashboard predittive su pipeline progetti, conversion rate e valore medio deal',         costo_mensile: 700,   costo_setup: 2500,  tempo_mesi: 2 },
      '4-5': { chi: 'Head of revenue operations',        cosa: 'Orchestrazione pipeline con scoring, capacity planning e forecasting ricavi',             costo_mensile: 1400,  costo_setup: 5000,  tempo_mesi: 5 },
    },

    team: {
      '1-2': { chi: 'Founder',                         cosa: 'Valutazione competenze commerciali e di account management del team',                    costo_mensile: 300,   costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'HR consultant digital',            cosa: 'Recruiting account manager e business developer con esperienza agency',                  costo_mensile: 3200,  costo_setup: 1500,  tempo_mesi: 2 },
      '3-4': { chi: 'Sales trainer agency',              cosa: 'Programma coaching su vendita consulenziale e gestione relazioni cliente',                costo_mensile: 5500,  costo_setup: 4000,  tempo_mesi: 3 },
      '4-5': { chi: 'VP client services',                cosa: 'Costruzione team commerciale agency con account director e new business team',            costo_mensile: 10000, costo_setup: 10000, tempo_mesi: 5 },
    },

    processi: {
      '1-2': { chi: 'Project manager',                 cosa: 'Documentazione informale dei processi di gestione progetto e delivery',                  costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Process analyst agency',            cosa: 'Formalizzazione workflow brief, proposta, produzione e review con il cliente',            costo_mensile: 500,   costo_setup: 1000,  tempo_mesi: 2 },
      '3-4': { chi: 'Operations manager agency',         cosa: 'Automazione processi di project management, resource allocation e reporting',             costo_mensile: 1100,  costo_setup: 3500,  tempo_mesi: 3 },
      '4-5': { chi: 'COO digital agency',                cosa: 'Reingegnerizzazione processi operativi con PMO, capacity planning e profitability',       costo_mensile: 4000,  costo_setup: 10000, tempo_mesi: 5 },
    },

    ricavi: {
      '1-2': { chi: 'Founder',                         cosa: 'Analisi marginalità per progetto e tipologia di servizio digitale',                      costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Controller',                        cosa: 'Modello di pricing per progetti a corpo, retainer mensili e giornate consulenza',        costo_mensile: 300,   costo_setup: 500,   tempo_mesi: 2 },
      '3-4': { chi: 'Revenue manager agency',            cosa: 'Ottimizzazione mix ricavi progetto vs retainer e marginalità per servizio',               costo_mensile: 700,   costo_setup: 2000,  tempo_mesi: 2 },
      '4-5': { chi: 'CFO fractional agency',             cosa: 'Piano ricavi pluriennale con modelli per crescita retainer e new business',               costo_mensile: 1500,  costo_setup: 5000,  tempo_mesi: 4 },
    },

    marketing: {
      '1-2': { chi: 'Founder o creative',               cosa: 'Presenza base su LinkedIn, Behance e Dribbble con portfolio progetti',                   costo_mensile: 300,   costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Marketing specialist agency',       cosa: 'Content marketing con case study, behind the scenes e award submission',                  costo_mensile: 1100,  costo_setup: 1200,  tempo_mesi: 3 },
      '3-4': { chi: 'Marketing manager agency',          cosa: 'Campagne inbound con webinar, report di settore e thought leadership',                    costo_mensile: 2500,  costo_setup: 5000,  tempo_mesi: 3 },
      '4-5': { chi: 'CMO fractional agency',             cosa: 'Strategia marketing integrata per posizionamento premium e new business',                  costo_mensile: 5000,  costo_setup: 12000, tempo_mesi: 5 },
    },

    sitoweb: {
      '1-2': { chi: 'Dev interno o designer',           cosa: 'Sito portfolio base con progetti selezionati e form di contatto',                        costo_mensile: 150,   costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Web developer senior',              cosa: 'Sito portfolio professionale con case study interattive e blog di settore',               costo_mensile: 450,   costo_setup: 1800,  tempo_mesi: 2 },
      '3-4': { chi: 'Digital experience designer',       cosa: 'Portale agency con case study animate, area clienti e richiesta brief online',            costo_mensile: 800,   costo_setup: 5000,  tempo_mesi: 2 },
      '4-5': { chi: 'Head of digital experience',        cosa: 'Piattaforma web immersiva con portfolio interattivo, blog e area clienti premium',        costo_mensile: 1800,  costo_setup: 10000, tempo_mesi: 5 },
    },

    ecommerce: {
      '1-2': { chi: 'Non necessario',                  cosa: 'Nessun e-commerce attivo, vendita tramite contatto diretto e portfolio',                 costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Web developer',                    cosa: 'Shop online per pacchetti servizi standard, template e consulenze prepagate',             costo_mensile: 600,   costo_setup: 1500,  tempo_mesi: 2 },
      '3-4': { chi: 'E-commerce manager',               cosa: 'Piattaforma vendita pacchetti agency con configuratore servizi e retainer',               costo_mensile: 1800,  costo_setup: 5500,  tempo_mesi: 3 },
      '4-5': { chi: 'Head of digital commerce',          cosa: 'Marketplace servizi agency con preventivatore automatico e self-service onboarding',      costo_mensile: 4000,  costo_setup: 13000, tempo_mesi: 5 },
    },
  },

  /* ================================================================
     TECH AUTOMAZIONE – PLC, SCADA, Industry 4.0, robotica, integration
     ================================================================ */
  tech_automazione: {

    vendite: {
      '1-2': { chi: 'Titolare o ing. senior',          cosa: 'Audit informale del processo di vendita impianti PLC, SCADA e robotica',                 costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Sales engineer automazione',       cosa: 'Strutturazione pipeline commerciale per progetti Industry 4.0 e retrofitting',            costo_mensile: 3500,  costo_setup: 1200,  tempo_mesi: 2 },
      '3-4': { chi: 'Sales manager automazione',        cosa: 'Gestione trattative complesse per impianti industriali e integrazione robotica',          costo_mensile: 5500,  costo_setup: 3500,  tempo_mesi: 3 },
      '4-5': { chi: 'Direttore commerciale Industry',   cosa: 'Strategia vendite per soluzioni Industry 4.0 con partner OEM e system integration',      costo_mensile: 11000, costo_setup: 8000,  tempo_mesi: 6 },
    },

    pipeline: {
      '1-2': { chi: 'Ing. interno o PM',               cosa: 'Mappatura opportunità e commesse attive in foglio condiviso',                            costo_mensile: 50,    costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'CRM specialist industriale',       cosa: 'CRM configurato con stage per offerta, progettazione, commessa e collaudo',              costo_mensile: 350,   costo_setup: 1000,  tempo_mesi: 2 },
      '3-4': { chi: 'Revenue ops analyst',               cosa: 'Dashboard predittive su pipeline commesse, marginalità e forecast trimestrale',           costo_mensile: 900,   costo_setup: 3500,  tempo_mesi: 3 },
      '4-5': { chi: 'Head of revenue operations',        cosa: 'Orchestrazione pipeline industriale con deal desk, capacity planning e partner mgmt',     costo_mensile: 1800,  costo_setup: 7000,  tempo_mesi: 5 },
    },

    team: {
      '1-2': { chi: 'Titolare',                        cosa: 'Valutazione competenze tecnico-commerciali del team automazione',                        costo_mensile: 300,   costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'HR consultant industriale',        cosa: 'Recruiting sales engineer e pre-sales con competenze PLC e SCADA',                      costo_mensile: 4000,  costo_setup: 2000,  tempo_mesi: 3 },
      '3-4': { chi: 'Sales trainer industriale',         cosa: 'Programma coaching su vendita tecnica impianti e gestione gare Industry 4.0',             costo_mensile: 6500,  costo_setup: 5000,  tempo_mesi: 3 },
      '4-5': { chi: 'VP sales & engineering',            cosa: 'Costruzione team commerciale con sales engineer, PM e application specialist',            costo_mensile: 13000, costo_setup: 18000, tempo_mesi: 6 },
    },

    processi: {
      '1-2': { chi: 'Ing. interno',                    cosa: 'Documentazione informale dei processi di progettazione e commissioning',                 costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Process analyst industriale',       cosa: 'Formalizzazione workflow offerta, progettazione, produzione e collaudo FAT/SAT',          costo_mensile: 700,   costo_setup: 1500,  tempo_mesi: 2 },
      '3-4': { chi: 'Operations manager industriale',    cosa: 'Automazione processi di project delivery, resource planning e quality assurance',          costo_mensile: 1500,  costo_setup: 5000,  tempo_mesi: 3 },
      '4-5': { chi: 'COO automazione industriale',       cosa: 'Reingegnerizzazione processi operativi con digital twin, IoT monitoring e AI',             costo_mensile: 6000,  costo_setup: 18000, tempo_mesi: 6 },
    },

    ricavi: {
      '1-2': { chi: 'Titolare',                        cosa: 'Analisi marginalità per commessa e tipologia di impianto industriale',                   costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Controller industriale',            cosa: 'Modello di pricing per impianti chiavi in mano, service contract e retrofit',             costo_mensile: 500,   costo_setup: 800,   tempo_mesi: 2 },
      '3-4': { chi: 'Revenue manager industriale',       cosa: 'Ottimizzazione mix ricavi progetto vs service e analisi marginalità per commessa',        costo_mensile: 1000,  costo_setup: 3000,  tempo_mesi: 3 },
      '4-5': { chi: 'CFO fractional industriale',        cosa: 'Piano ricavi pluriennale con modelli per backlog, service revenue e crescita Industry',   costo_mensile: 2500,  costo_setup: 8000,  tempo_mesi: 5 },
    },

    marketing: {
      '1-2': { chi: 'Titolare o ing. senior',           cosa: 'Presenza base su LinkedIn e partecipazione fiere automazione industriale',               costo_mensile: 300,   costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Marketing specialist industry',     cosa: 'Content marketing tecnico su Industry 4.0, robotica e case study impianti',               costo_mensile: 1500,  costo_setup: 1500,  tempo_mesi: 3 },
      '3-4': { chi: 'Marketing manager industriale',     cosa: 'Campagne ABM per target manufacturing con whitepaper, demo e fiere settore',               costo_mensile: 3500,  costo_setup: 8000,  tempo_mesi: 3 },
      '4-5': { chi: 'CMO fractional industriale',        cosa: 'Strategia marketing integrata per posizionamento leader automazione e Industry 4.0',       costo_mensile: 7000,  costo_setup: 20000, tempo_mesi: 6 },
    },

    sitoweb: {
      '1-2': { chi: 'Dev o agenzia esterna',            cosa: 'Sito vetrina con pagine soluzioni PLC, SCADA, robotica e form contatto',                costo_mensile: 150,   costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Web developer industriale',         cosa: 'Sito professionale con area soluzioni, case study impianti e referenze',                 costo_mensile: 600,   costo_setup: 2500,  tempo_mesi: 2 },
      '3-4': { chi: 'Digital agency industriale',        cosa: 'Portale con configuratore soluzioni, area clienti e documentazione tecnica',             costo_mensile: 1200,  costo_setup: 7000,  tempo_mesi: 3 },
      '4-5': { chi: 'Head of digital experience',        cosa: 'Piattaforma web con digital twin demo, portale clienti IoT e knowledge base AI',         costo_mensile: 2500,  costo_setup: 15000, tempo_mesi: 5 },
    },

    ecommerce: {
      '1-2': { chi: 'Non necessario',                  cosa: 'Nessuna vendita online attiva per impianti di automazione industriale',                   costo_mensile: 0,     costo_setup: 0,     tempo_mesi: 1 },
      '2-3': { chi: 'Web developer',                    cosa: 'Shop online per ricambi, componenti PLC e pacchetti assistenza prepagati',                costo_mensile: 800,   costo_setup: 2000,  tempo_mesi: 3 },
      '3-4': { chi: 'E-commerce manager industriale',    cosa: 'Piattaforma vendita ricambi con catalogo tecnico, configuratore e assistenza',            costo_mensile: 2500,  costo_setup: 8000,  tempo_mesi: 3 },
      '4-5': { chi: 'Head of digital commerce',          cosa: 'Marketplace industriale con spare parts, service contract e predictive maintenance',      costo_mensile: 5500,  costo_setup: 18000, tempo_mesi: 6 },
    },
  },

};

const STEP_DETAIL_BY_SETTORE = Object.assign({},
  _SD_MANIFATTURIERO,
  _SD_SERVIZI,
  _SD_EDILIZIA,
  _SD_COMMERCIO_B2B,
  _SD_COMMERCIO_B2C,
  _SD_ALIMENTARE,
  _SD_TECH
);
window.STEP_DETAIL_BY_SETTORE = STEP_DETAIL_BY_SETTORE;
