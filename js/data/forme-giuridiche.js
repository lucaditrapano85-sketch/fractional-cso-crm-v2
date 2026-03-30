// ===========================================================================
// FORME_GIURIDICHE ? Forme giuridiche italiane con parametri fiscali
//
// Fonti:
//   - TUIR (DPR 917/1986) aggiornato 2024
//   - D.Lgs. 446/1997 (IRAP)
//   - Legge 197/2022 (Legge di Bilancio 2023) e successivi
//   - Regime forfettario: Legge 190/2014 e modifiche
//   - Contributi INPS: circolari 2024
// ===========================================================================

const FORME_GIURIDICHE = {

  // -- PERSONE FISICHE / DITTE ----------------------------------------------

  ditta_individuale: {
    label: 'Ditta Individuale',
    gruppo: 'Impresa individuale',
    descrizione: 'Imprenditore persona fisica. Responsabilita illimitata sul patrimonio personale.',
    adatta_per: 'Attivita piccole, commercio al dettaglio, artigianato, servizi semplici.',
    tasse: {
      ires: null,
      irpef: {
        applicabile: true,
        note: 'Reddito d\'impresa soggetto a IRPEF progressiva come reddito personale',
        scaglioni: [
          { da: 0,      a: 28000,    aliquota: 23 },
          { da: 28000,  a: 50000,    aliquota: 35 },
          { da: 50000,  a: null,     aliquota: 43 },
        ]
      },
      irap: { applicabile: true, aliquota: 3.9, note: 'Aliquota ordinaria. Possibile esenzione per ditte senza dipendenti (dipende dalla Regione).' },
      iva: { applicabile: true, regime: 'ordinario' },
      contributi_inps: {
        tipo: 'Gestione Artigiani o Commercianti',
        aliquota_2024: 24.0,
        minimale_annuo: 4427,
        note: 'Aliquota 24% sul reddito eccedente il minimale. Riduzione del 35% per under 35.'
      }
    },
    vantaggi: [
      'Costituzione immediata e a costo zero',
      'Contabilita semplificata sotto soglia di ricavi',
      'Nessun capitale minimo richiesto',
      'Gestione amministrativa semplice',
    ],
    svantaggi: [
      'Responsabilita illimitata: i creditori possono aggredire il patrimonio personale',
      'IRPEF progressiva puo essere penalizzante con redditi elevati',
      'Difficolta di accesso al credito bancario rispetto alle societa',
      'Non adatta alla crescita strutturata con piu soci',
    ],
    note_cso: 'Attenzione alla responsabilita illimitata quando si parla di espansione commerciale. Suggerisci valutazione trasformazione in Srl oltre i 100kEUR di utile.',
  },

  imprenditore_individuale: {
    label: 'Imprenditore Individuale (I.I.)',
    gruppo: 'Impresa individuale',
    descrizione: 'Persona fisica che esercita attivita d\'impresa in modo professionale. Simile alla ditta individuale ma con denominazione distinta.',
    adatta_per: 'Stesse casistiche della ditta individuale.',
    tasse: {
      irpef: { applicabile: true, note: 'Come ditta individuale -- IRPEF progressiva' },
      irap: { applicabile: true, aliquota: 3.9 },
      iva: { applicabile: true },
      contributi_inps: { tipo: 'Gestione Artigiani o Commercianti', aliquota_2024: 24.0 }
    },
    vantaggi: ['Come ditta individuale'],
    svantaggi: ['Come ditta individuale -- responsabilita illimitata'],
    note_cso: 'Spesso confusa con la ditta individuale. Stesse implicazioni commerciali.',
  },

  // -- REGIME FORFETTARIO ---------------------------------------------------

  forfettario: {
    label: 'Regime Forfettario (P.IVA flat)',
    gruppo: 'Regime agevolato',
    descrizione: 'Regime fiscale agevolato per persone fisiche con ricavi/compensi <= 85.000 EUR/anno. Imposta sostitutiva sul reddito imponibile.',
    adatta_per: 'Freelance, consulenti, artigiani, commercianti con volumi contenuti. Ottimale per chi inizia.',
    tasse: {
      irpef: { applicabile: false, note: 'Sostituita dall\'imposta sostitutiva del regime forfettario' },
      imposta_sostitutiva: {
        aliquota_ordinaria: 15,
        aliquota_startup: 5,
        durata_startup: '5 anni (per le nuove attivita)',
        base_imponibile: 'Ricavi x coefficiente di redditivita (varia per categoria ATECO)',
        coefficienti_esempio: [
          { categoria: 'Commercio al dettaglio', coeff: 40 },
          { categoria: 'Servizi professionali', coeff: 78 },
          { categoria: 'Costruzioni e impiantistica', coeff: 86 },
          { categoria: 'Attivita manifatturiere', coeff: 67 },
          { categoria: 'Intermediari del commercio', coeff: 62 },
        ]
      },
      irap: { applicabile: false, note: 'Escluso dal regime forfettario' },
      iva: { applicabile: false, note: 'Non si applica ne si detrae l\'IVA' },
      contributi_inps: {
        tipo: 'Gestione separata o Artigiani/Commercianti',
        riduzione_disponibile: true,
        riduzione_pct: 35,
        note: 'Riduzione contributiva del 35% su richiesta. Attenzione: riduce anche la pensione futura.'
      }
    },
    limiti: [
      'Ricavi/compensi <= 85.000 EUR annui (superamento -> decadenza dall\'anno successivo)',
      'Nessun dipendente con costi > 20.000 EUR',
      'Nessuna partecipazione in societa di persone o associazioni professionali',
      'Nessun reddito da lavoro dipendente > 30.000 EUR (salvo cessazione)',
      'Non applicabile a chi ha ceduto l\'attivita agli ultimi 3 anni al medesimo datore',
    ],
    vantaggi: [
      'Aliquota flat 15% (o 5% per le startup nei primi 5 anni)',
      'Nessuna IVA da applicare e da versare',
      'Contabilita semplificatissima',
      'Nessuna ritenuta d\'acconto subita',
      'Riduzione INPS del 35% possibile',
    ],
    svantaggi: [
      'Limite di 85.000 EUR -- oltre si decade nell\'anno successivo',
      'Non si detrae l\'IVA sugli acquisti',
      'Non si possono dedurre i costi analitici (solo forfait ATECO)',
      'Non si possono emettere fatture con IVA ai clienti privati UE',
      'Meno credibile per clienti corporate o PA',
    ],
    note_cso: 'ATTENZIONE: se il cliente e in forfettario e si avvicina agli 85kEUR, e urgente pianificare il passaggio. La doppia tassazione nell\'anno di transizione puo essere molto onerosa. Aiutalo a capire il momento giusto per strutturarsi.',
  },

  // -- SOCIET? DI PERSONE ---------------------------------------------------

  snc: {
    label: 'S.n.c. -- Societa in Nome Collettivo',
    gruppo: 'Societa di persone',
    descrizione: 'Societa tra 2+ soci. Tutti i soci rispondono solidalmente e illimitatamente per le obbligazioni sociali.',
    adatta_per: 'Attivita artigianali, commerciali o professionali tra soci fidati. Storica forma per PMI familiari.',
    tasse: {
      irpef: { applicabile: true, note: 'Reddito imputato per trasparenza ai soci in proporzione alla quota. IRPEF progressiva.' },
      irap: { applicabile: true, aliquota: 3.9 },
      iva: { applicabile: true },
      contributi_inps: {
        tipo: 'Gestione Artigiani o Commercianti (per ogni socio)',
        aliquota_2024: 24.0,
        note: 'Ogni socio paga contributi sul proprio reddito imputato.'
      }
    },
    capitale_minimo: null,
    vantaggi: [
      'Nessun capitale minimo',
      'Tassazione per trasparenza: eventuali perdite compensabili con altri redditi dei soci',
      'Gestione piu semplice rispetto alle societa di capitali',
      'Nessun obbligo di deposito bilancio al Registro Imprese',
    ],
    svantaggi: [
      'Responsabilita illimitata e solidale di TUTTI i soci',
      'IRPEF progressiva puo diventare penalizzante',
      'Un socio inadempiente mette a rischio gli altri',
      'Difficolta di ingresso/uscita dei soci',
    ],
    note_cso: 'La responsabilita solidale illimitata e il rischio principale. Se i soci hanno patrimoni significativi, suggerisci una valutazione di trasformazione in Srl.',
  },

  sas: {
    label: 'S.a.s. -- Societa in Accomandita Semplice',
    gruppo: 'Societa di persone',
    descrizione: 'Due categorie di soci: accomandatari (gestiscono, responsabilita illimitata) e accomandanti (investono, responsabilita limitata alla quota).',
    adatta_per: 'Quando alcuni soci vogliono investire senza gestire. Struttura familiare con soci "passivi".',
    tasse: {
      irpef: { applicabile: true, note: 'Come Snc -- tassazione per trasparenza sui soci' },
      irap: { applicabile: true, aliquota: 3.9 },
      iva: { applicabile: true },
      contributi_inps: { tipo: 'Solo accomandatari che gestiscono', aliquota_2024: 24.0 }
    },
    capitale_minimo: null,
    vantaggi: [
      'Gli accomandanti hanno responsabilita limitata',
      'Flessibile per strutture familiari con soci investitori',
      'Nessun capitale minimo',
    ],
    svantaggi: [
      'Gli accomandatari hanno responsabilita illimitata',
      'Gli accomandanti NON possono fare atti di gestione (perdono la limitazione)',
      'IRPEF progressiva',
      'Struttura rigida nei rapporti tra soci',
    ],
    note_cso: 'Usata spesso in strutture familiari. Verificare che gli accomandanti non stiano facendo atti di gestione de facto.',
  },

  // -- SOCIET? DI CAPITALI --------------------------------------------------

  srl: {
    label: 'S.r.l. -- Societa a Responsabilita Limitata',
    gruppo: 'Societa di capitali',
    descrizione: 'La forma piu diffusa per le PMI italiane. Responsabilita limitata al capitale conferito. Personalita giuridica autonoma.',
    adatta_per: 'PMI di qualsiasi dimensione, attivita commerciali strutturate, crescita con investitori.',
    tasse: {
      ires: { applicabile: true, aliquota: 24, note: 'Sul reddito imponibile della societa' },
      irap: { applicabile: true, aliquota: 3.9, note: 'Aliquota ordinaria. Regioni possono variare +/-0.92%.' },
      iva: { applicabile: true },
      dividendi: {
        tassazione_persona_fisica: 26,
        note: 'Ritenuta a titolo d\'imposta del 26% sui dividendi percepiti da persone fisiche non imprenditori',
        holding_italiana: '1.2% effettivo (95% esente per partecipazioni qualificate)',
      },
      contributi_socio_amministratore: {
        tipo: 'Gestione separata INPS (se non artigiano/commerciante)',
        aliquota_2024: 26.07,
        massimale_2024: 119650,
        note: 'Se il socio svolge attivita artigiana o commerciale nella Srl -> Gestione Artigiani/Commercianti (24%)'
      }
    },
    capitale_minimo: 1,
    capitale_standard: 10000,
    vantaggi: [
      'Responsabilita limitata al capitale: patrimonio personale dei soci protetto',
      'IRES 24% flat (vs. IRPEF fino al 43%)',
      'Possibilita di non distribuire utili -> accumulo in azienda tassato solo al 24%',
      'Accesso piu facile al credito bancario',
      'Possibilita di ingresso soci/investitori senza stravolgere la struttura',
      'Deducibilita di costi che nelle ditte individuali non sono deducibili',
    ],
    svantaggi: [
      'Costi di costituzione (notaio ~2.000-3.000 EUR)',
      'Obbligo di deposito bilancio al Registro Imprese',
      'Contabilita ordinaria obbligatoria',
      'Se si distribuiscono utili: doppia tassazione (IRES 24% + 26% dividendi = ~43.8% effettivo)',
      'Costi fissi: commercialista, tenuta libri, deposito bilancio',
    ],
    note_cso: 'E la forma ideale per la maggior parte dei clienti PMI. Se il cliente e ancora in ditta individuale o Snc con utili > 80-100kEUR, la trasformazione in Srl puo portare significativi risparmi fiscali. Fai fare il confronto dal commercialista.',
    break_even_vs_ditta: 'Conveniente rispetto a ditta individuale indicativamente da 80-100kEUR di utile annuo.',
  },

  srl_semplificata: {
    label: 'S.r.l.s. -- Srl Semplificata',
    gruppo: 'Societa di capitali',
    descrizione: 'Variante della Srl con atto costitutivo standard, capitale tra 1 e 9.999 EUR. Riservata a persone fisiche. Stessa fiscalita della Srl.',
    adatta_per: 'Startup e nuove imprese con budget limitato per la costituzione.',
    tasse: {
      ires: { applicabile: true, aliquota: 24 },
      irap: { applicabile: true, aliquota: 3.9 },
      iva: { applicabile: true },
      dividendi: { tassazione_persona_fisica: 26 },
      contributi_socio_amministratore: { tipo: 'Gestione separata INPS', aliquota_2024: 26.07 }
    },
    capitale_minimo: 1,
    capitale_massimo: 9999,
    vantaggi: [
      'Costi notarili ridotti o nulli (atto standard)',
      'Costituzione veloce',
      'Stessa responsabilita limitata della Srl classica',
    ],
    svantaggi: [
      'Capitale basso puo ridurre la credibilita verso banche e grandi clienti',
      'Riservata a persone fisiche (no soci societa)',
      'Statuto standard: meno flessibilita rispetto alla Srl ordinaria',
      'Obbligo di accantonare a riserva legale il 20% degli utili fino a 10.000 EUR',
    ],
    note_cso: 'Ottima per partire, ma spesso conviene aumentare il capitale appena possibile per aumentare la credibilita commerciale.',
  },

  spa: {
    label: 'S.p.A. -- Societa per Azioni',
    gruppo: 'Societa di capitali',
    descrizione: 'Struttura per imprese di grandi dimensioni o quotate. Capitale minimo 50.000 EUR. Governance piu complessa.',
    adatta_per: 'Aziende strutturate, quotazione in borsa, raccolta di capitali su larga scala.',
    tasse: {
      ires: { applicabile: true, aliquota: 24 },
      irap: { applicabile: true, aliquota: 3.9 },
      iva: { applicabile: true },
      dividendi: { tassazione_persona_fisica: 26 },
    },
    capitale_minimo: 50000,
    vantaggi: [
      'Massima credibilita e struttura per crescita',
      'Facilita di raccolta capitali (azioni)',
      'Possibilita di quotazione in borsa',
      'Governance strutturata con CDA',
    ],
    svantaggi: [
      'Capitale minimo 50.000 EUR',
      'Costi amministrativi e di governance elevati',
      'Obbligo revisore legale o collegio sindacale',
      'Complessita normativa e gestionale',
    ],
    note_cso: 'Raro nel target PMI del Leva. Se un cliente e una SpA, ha gia una struttura commerciale di un certo livello.',
  },

  sapa: {
    label: 'S.A.p.A. -- Societa in Accomandita per Azioni',
    gruppo: 'Societa di capitali',
    descrizione: 'Ibrido tra SpA e Sas. Accomandatari (gestori, responsabilita illimitata) e accomandanti (azionisti, responsabilita limitata). Molto rara.',
    adatta_per: 'Strutture familiari con volonta di mantenere il controllo. Molto poco diffusa.',
    tasse: {
      ires: { applicabile: true, aliquota: 24 },
      irap: { applicabile: true, aliquota: 3.9 },
      iva: { applicabile: true },
    },
    capitale_minimo: 50000,
    vantaggi: ['Controllo degli accomandatari garantito', 'Raccolta di capitali tramite azioni'],
    svantaggi: ['Molto rara e complessa', 'Responsabilita illimitata degli accomandatari', 'Alti costi di gestione'],
    note_cso: 'Praticamente inesistente nel mercato PMI. Se la incontri, trattala come SpA a livello commerciale.',
  },

  // -- COOPERATIVE ---------------------------------------------------------

  cooperativa: {
    label: 'Societa Cooperativa',
    gruppo: 'Cooperativa',
    descrizione: 'Societa mutualistica: scopo principale non e il profitto ma il vantaggio dei soci (lavoro, consumo, servizi). Regolamentazione speciale.',
    adatta_per: 'Cooperative di lavoratori, cooperative sociali, cooperative di consumo, consorzi.',
    tasse: {
      ires: {
        applicabile: true,
        aliquota: 24,
        note: 'Ma con ampie agevolazioni: le cooperative a mutualita prevalente godono di esenzioni parziali o totali IRES sulle quote mutualistiche.'
      },
      irap: { applicabile: true, aliquota: 3.9 },
      iva: { applicabile: true },
      agevolazioni: [
        'Cooperative di produzione e lavoro: esenti IRES sulle quote destinate a riserva indivisibile',
        'Cooperative sociali (L.381/91): aliquota IVA agevolata al 5% su alcuni servizi',
        'Deduzione IRAP possibile in alcuni casi',
      ]
    },
    vantaggi: [
      'Agevolazioni fiscali significative per le cooperative a mutualita prevalente',
      'Governance democratica (1 testa 1 voto)',
      'Accesso a bandi e fondi dedicati al terzo settore',
    ],
    svantaggi: [
      'Complessita normativa (Codice Civile + leggi speciali)',
      'Obbligo di revisione cooperativa',
      'Distribuzione utili limitata ai soci',
      'Non adatta a logiche di profitto puro',
    ],
    note_cso: 'Target atipico per il Leva commerciale puro. Se lavori con cooperative, focalizzati su sviluppo soci/clienti, non su logiche profit tradizionali.',
  },

  // -- ALTRI ENTI -----------------------------------------------------------

  consorzio: {
    label: 'Consorzio',
    gruppo: 'Altro',
    descrizione: 'Contratto tra piu imprenditori per coordinare attivita o fasi di esse. Puo avere o meno attivita esterna.',
    adatta_per: 'Raggruppamenti di imprese per partecipare a gare, export collettivo, acquisti condivisi.',
    tasse: {
      ires: { applicabile: true, aliquota: 24, note: 'Solo sul reddito proprio del consorzio' },
      irap: { applicabile: true, aliquota: 3.9 },
      iva: { applicabile: true },
    },
    vantaggi: ['Flessibilita contrattuale', 'Permette di partecipare a gare pubbliche di grande dimensione', 'Condivisione costi'],
    svantaggi: ['Complessita gestionale tra imprese diverse', 'Possibili conflitti tra consorziati'],
    note_cso: 'Se un cliente fa parte di un consorzio, valuta la possibilita di espandere le vendite attraverso la rete consorziata.',
  },

  associazione: {
    label: 'Associazione / Ente del Terzo Settore',
    gruppo: 'Altro',
    descrizione: 'Ente non commerciale. Puo svolgere attivita commerciali marginali. Include ODV, APS, ETS dopo la Riforma del Terzo Settore (D.Lgs. 117/2017).',
    adatta_per: 'Attivita culturali, sociali, sportive, formative senza scopo di lucro.',
    tasse: {
      ires: { applicabile: true, aliquota: 24, note: 'Solo sui redditi commerciali. Attivita istituzionale esente.' },
      irap: { applicabile: false, note: 'Generalmente non soggetti se non svolgono attivita commerciale prevalente' },
      iva: { applicabile: true, note: 'Solo sulle attivita commerciali' },
      agevolazioni: [
        '5x1000 per le associazioni iscritte al RUNTS',
        'Deducibilita erogazioni liberali per i donatori',
        'Regime fiscale agevolato per le ASD (associazioni sportive dilettantistiche)',
      ]
    },
    vantaggi: ['Agevolazioni fiscali sulle attivita istituzionali', 'Accesso a contributi pubblici e privati', '5x1000'],
    svantaggi: ['Non puo distribuire utili', 'Vincoli sull\'attivita commerciale', 'Governance associativa'],
    note_cso: 'Target di nicchia. Se lavori con associazioni che hanno un ufficio commerciale (es. formazione a pagamento), puoi applicare metodologie standard.',
  },

  startup_innovativa: {
    label: 'Startup Innovativa (ex L. 221/2012)',
    gruppo: 'Regime agevolato',
    descrizione: 'Non e una forma giuridica autonoma ma uno status riconosciuto a Srl o SpA con requisiti di innovazione. Agevolazioni specifiche per max 5 anni.',
    adatta_per: 'Tech company, software, R&D, innovazione di prodotto/processo.',
    tasse: {
      ires: { applicabile: true, aliquota: 24, note: 'Come Srl/SpA base' },
      irap: { applicabile: true, aliquota: 3.9 },
      agevolazioni_speciali: [
        'Esonero diritti CCIAA per 5 anni',
        'Deroga alla disciplina sulle perdite societarie per 3 anni',
        'Stock option e work for equity con agevolazioni fiscali',
        'Credito d\'imposta R&S (fino al 20% dei costi)',
        'Detrazioni IRPEF/IRES per gli investitori (30-50%)',
        'Accesso a Smart&Start Italia e altri incentivi MIMIT',
        'Crowdfunding equity-based facilitato',
      ]
    },
    requisiti: [
      'Costituita da < 5 anni',
      'Sede in Italia (o UE con sede operativa in Italia)',
      'Fatturato < 5 milioni EUR',
      'Non quotata',
      'Non distribuisce utili',
      '1 dei 3 criteri: 15% spese R&S, 1/3 dipendenti dottori di ricerca, brevetto/software depositato',
    ],
    vantaggi: ['Agevolazioni fiscali per gli investitori attract investment', 'Incentivi per assumere ricercatori', 'Esonero costi CCIAA', 'Ecosistema di supporto'],
    svantaggi: ['Status temporaneo (5 anni)', 'Requisiti stringenti da mantenere', 'Non distribuisce utili durante lo status'],
    note_cso: 'Se il cliente e una startup innovativa, il ciclo di vendita e le metriche sono diversi: ARR, CAC, LTV sono piu rilevanti del fatturato classico.',
  },

};

// -- Helper: ottieni parametri fiscali sintetici per il display --------------
function getFiscalSummary(formaId) {
  const forma = FORME_GIURIDICHE[formaId];
  if (!forma) return null;

  const t = forma.tasse;
  const rows = [];

  if (t.ires?.applicabile)
    rows.push({ label: 'IRES (tassa societaria)', val: t.ires.aliquota + '%', col: '#C9973A', note: t.ires.note });

  if (t.irpef?.applicabile)
    rows.push({ label: 'IRPEF (progressiva)', val: '23-43%', col: '#C05040', note: t.irpef.note });

  if (t.imposta_sostitutiva)
    rows.push({ label: 'Imposta sostitutiva', val: t.imposta_sostitutiva.aliquota_startup + '-' + t.imposta_sostitutiva.aliquota_ordinaria + '%', col: '#4A9A6A', note: `${t.imposta_sostitutiva.aliquota_startup}% startup (5 anni) . ${t.imposta_sostitutiva.aliquota_ordinaria}% ordinaria` });

  if (t.irap?.applicabile)
    rows.push({ label: 'IRAP', val: t.irap.aliquota + '%', col: '#8A6AC9', note: t.irap.note || 'Imposta regionale attivita produttive' });
  else if (t.irap?.applicabile === false)
    rows.push({ label: 'IRAP', val: 'ESENTE', col: '#4A9A6A', note: t.irap.note });

  if (t.dividendi?.tassazione_persona_fisica)
    rows.push({ label: 'Ritenuta dividendi (p.f.)', val: t.dividendi.tassazione_persona_fisica + '%', col: '#4A7AB5', note: 'Ritenuta a titolo d\'imposta su dividendi percepiti da persone fisiche' });

  if (t.contributi_inps || t.contributi_socio_amministratore) {
    const c = t.contributi_inps || t.contributi_socio_amministratore;
    rows.push({ label: 'Contributi INPS', val: c.aliquota_2024 + '%', col: '#3A9AB5', note: c.tipo + (c.note ? ' . ' + c.note : '') });
  }

  if (t.iva?.applicabile === false)
    rows.push({ label: 'IVA', val: 'ESENTE', col: '#4A9A6A', note: 'Non si applica ne si detrae l\'IVA' });

  return {
    forma,
    rows,
    vantaggi: forma.vantaggi || [],
    svantaggi: forma.svantaggi || [],
    note_cso: forma.note_cso || '',
    capitale_minimo: forma.capitale_minimo,
    agevolazioni: t.agevolazioni || t.agevolazioni_speciali || [],
    limiti: forma.limiti || [],
  };
}

