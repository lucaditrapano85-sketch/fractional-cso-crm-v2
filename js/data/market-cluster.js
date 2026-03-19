// ===========================================================================
// MARKET_CLUSTER ? Benchmark per Sottomercato ? Fascia Fatturato
//
// Fasce:
//   micro  = < 500k ?/anno
//   small  = 500k ? 2M ?/anno
//   mid    = 2M ? 10M ?/anno
//   upper  = 10M ? 50M ?/anno
//
// Per ogni fascia: { chiusura, fatxcomm, ciclo, crm, churn, lead_gen }
//   chiusura  = tasso chiusura medio (%)
//   fatxcomm  = fatturato per commerciale (k?/anno)
//   ciclo     = ciclo vendita medio (giorni)
//   crm       = % aziende che usano CRM
//   churn     = clienti persi per anno (%)
//   lead_gen  = canale principale
//
// NOTA METODOLOGICA:
//   Dati costruiti combinando:
//   - HubSpot State of Sales 2023/2024 (fasce aziendali)
//   - Salesforce SMB Trends 2024
//   - McKinsey B2B Pulse 2024 (Europa)
//   - Cerved PMI Italia 2023 (struttura per fatturato)
//   - Confindustria settoriali 2024
//   Moltiplicatori per fascia validati sulla letteratura:
//   micro ?0.65 / small ?0.85 / mid ?1.10 / upper ?1.35 vs. benchmark macro
// ===========================================================================

const FASCE = [
  { id:'micro', label:'Micro (< 500k EUR)', min:0,      max:500000 },
  { id:'small', label:'Small (500k-2M EUR)',  min:500000, max:2000000 },
  { id:'mid',   label:'Mid (2M-10M EUR)',     min:2000000,max:10000000 },
  { id:'upper', label:'Upper (10M-50M EUR)',  min:10000000,max:50000000 },
];

function getFasciaId(fatturato) {
  if (!fatturato) return null;
  for (const f of FASCE) {
    if (fatturato >= f.min && fatturato < f.max) return f.id;
  }
  if (fatturato >= 50000000) return 'upper';
  return null;
}

const MARKET_CLUSTER = {

  // =============================== MANIFATTURIERO ===========================

  manifatturiero_meccanica: {
    micro: {
      chiusura:{ media:14, top:28 }, fatxcomm:{ media:280, top:480 },
      ciclo:{ media:90, top:50 }, crm:{ media:14, top:55 },
      churn:{ media:20, top:8 }, lead_gen:{ media:'Passaparola, agenti', top:'Passaparola + fiere' }
    },
    small: {
      chiusura:{ media:18, top:32 }, fatxcomm:{ media:420, top:640 },
      ciclo:{ media:75, top:42 }, crm:{ media:22, top:65 },
      churn:{ media:15, top:6 }, lead_gen:{ media:'Agenti, fiere', top:'Fiere + LinkedIn' }
    },
    mid: {
      chiusura:{ media:21, top:38 }, fatxcomm:{ media:580, top:880 },
      ciclo:{ media:60, top:35 }, crm:{ media:34, top:78 },
      churn:{ media:11, top:4 }, lead_gen:{ media:'Fiere, outreach', top:'Fiere + CRM outbound' }
    },
    upper: {
      chiusura:{ media:25, top:44 }, fatxcomm:{ media:820, top:1200 },
      ciclo:{ media:45, top:28 }, crm:{ media:52, top:90 },
      churn:{ media:7,  top:3 }, lead_gen:{ media:'KAM + fiere', top:'KAM + partner OEM' }
    }
  },

  manifatturiero_automotive: {
    micro: {
      chiusura:{ media:10, top:20 }, fatxcomm:{ media:350, top:600 },
      ciclo:{ media:180, top:90 }, crm:{ media:18, top:55 },
      churn:{ media:12, top:4 }, lead_gen:{ media:'Referral supply chain', top:'Referral + RFQ dirette' }
    },
    small: {
      chiusura:{ media:16, top:28 }, fatxcomm:{ media:520, top:850 },
      ciclo:{ media:120, top:65 }, crm:{ media:28, top:68 },
      churn:{ media:9,  top:3 }, lead_gen:{ media:'RFQ, partner Tier', top:'RFQ + relazioni OEM' }
    },
    mid: {
      chiusura:{ media:22, top:38 }, fatxcomm:{ media:720, top:1200 },
      ciclo:{ media:90,  top:50 }, crm:{ media:42, top:82 },
      churn:{ media:7,  top:2 }, lead_gen:{ media:'OEM diretti, Tier1', top:'OEM + APQP proattivo' }
    },
    upper: {
      chiusura:{ media:28, top:46 }, fatxcomm:{ media:1100, top:1800 },
      ciclo:{ media:70,  top:40 }, crm:{ media:62, top:92 },
      churn:{ media:5,  top:2 }, lead_gen:{ media:'KAM OEM + Tier', top:'KAM + sviluppo piattaforma' }
    }
  },

  manifatturiero_packaging: {
    micro: {
      chiusura:{ media:18, top:34 }, fatxcomm:{ media:240, top:420 },
      ciclo:{ media:60, top:32 }, crm:{ media:16, top:52 },
      churn:{ media:25, top:11 }, lead_gen:{ media:'Passaparola', top:'Passaparola + campioni' }
    },
    small: {
      chiusura:{ media:24, top:40 }, fatxcomm:{ media:360, top:580 },
      ciclo:{ media:45, top:24 }, crm:{ media:25, top:64 },
      churn:{ media:20, top:8 }, lead_gen:{ media:'Agenti, catalogo', top:'Agenti + LinkedIn' }
    },
    mid: {
      chiusura:{ media:28, top:46 }, fatxcomm:{ media:480, top:760 },
      ciclo:{ media:35, top:18 }, crm:{ media:36, top:76 },
      churn:{ media:16, top:6 }, lead_gen:{ media:'Agenti + fiere', top:'LinkedIn + fiere Interpack' }
    },
    upper: {
      chiusura:{ media:32, top:52 }, fatxcomm:{ media:680, top:1050 },
      ciclo:{ media:28, top:14 }, crm:{ media:52, top:88 },
      churn:{ media:12, top:4 }, lead_gen:{ media:'KAM + fiere', top:'KAM + e-commerce B2B' }
    }
  },

  manifatturiero_cterzi: {
    micro: {
      chiusura:{ media:22, top:40 }, fatxcomm:{ media:180, top:320 },
      ciclo:{ media:45, top:20 }, crm:{ media:8,  top:38 },
      churn:{ media:22, top:9 }, lead_gen:{ media:'Passaparola', top:'Passaparola' }
    },
    small: {
      chiusura:{ media:28, top:48 }, fatxcomm:{ media:280, top:480 },
      ciclo:{ media:30, top:14 }, crm:{ media:14, top:48 },
      churn:{ media:18, top:7 }, lead_gen:{ media:'Passaparola, portali B2B', top:'Passaparola + Linkedin' }
    },
    mid: {
      chiusura:{ media:32, top:54 }, fatxcomm:{ media:400, top:650 },
      ciclo:{ media:22, top:10 }, crm:{ media:24, top:62 },
      churn:{ media:13, top:5 }, lead_gen:{ media:'Referral + digital', top:'CRM outbound + referral' }
    },
    upper: {
      chiusura:{ media:36, top:58 }, fatxcomm:{ media:560, top:900 },
      ciclo:{ media:18, top:8 }, crm:{ media:38, top:78 },
      churn:{ media:9,  top:3 }, lead_gen:{ media:'KAM + referral', top:'KAM + partner OEM' }
    }
  },

  manifatturiero_elettromeccanica: {
    micro: {
      chiusura:{ media:14, top:28 }, fatxcomm:{ media:260, top:450 },
      ciclo:{ media:75, top:42 }, crm:{ media:12, top:48 },
      churn:{ media:20, top:8 }, lead_gen:{ media:'Passaparola', top:'Passaparola + fiere' }
    },
    small: {
      chiusura:{ media:18, top:34 }, fatxcomm:{ media:380, top:620 },
      ciclo:{ media:60, top:34 }, crm:{ media:22, top:62 },
      churn:{ media:16, top:6 }, lead_gen:{ media:'Agenti tecnici', top:'Agenti + LinkedIn' }
    },
    mid: {
      chiusura:{ media:22, top:40 }, fatxcomm:{ media:520, top:820 },
      ciclo:{ media:48, top:28 }, crm:{ media:34, top:74 },
      churn:{ media:12, top:5 }, lead_gen:{ media:'Agenti + fiere SPS', top:'Fiere + contratti manutenzione' }
    },
    upper: {
      chiusura:{ media:26, top:46 }, fatxcomm:{ media:720, top:1100 },
      ciclo:{ media:38, top:22 }, crm:{ media:50, top:86 },
      churn:{ media:8,  top:3 }, lead_gen:{ media:'KAM + fiere', top:'KAM + manutenzione predittiva' }
    }
  },

  manifatturiero_tessile: {
    micro: {
      chiusura:{ media:14, top:28 }, fatxcomm:{ media:220, top:380 },
      ciclo:{ media:65, top:36 }, crm:{ media:10, top:42 },
      churn:{ media:28, top:12 }, lead_gen:{ media:'Fiere moda', top:'Fiere + showroom' }
    },
    small: {
      chiusura:{ media:18, top:34 }, fatxcomm:{ media:320, top:520 },
      ciclo:{ media:52, top:28 }, crm:{ media:18, top:54 },
      churn:{ media:24, top:10 }, lead_gen:{ media:'Fiere + agenti', top:'Fiere + B2B digital' }
    },
    mid: {
      chiusura:{ media:22, top:40 }, fatxcomm:{ media:440, top:700 },
      ciclo:{ media:42, top:22 }, crm:{ media:28, top:66 },
      churn:{ media:18, top:8 }, lead_gen:{ media:'Agenti + Pitti', top:'Showroom + Joor/NuOrder' }
    },
    upper: {
      chiusura:{ media:26, top:46 }, fatxcomm:{ media:620, top:960 },
      ciclo:{ media:34, top:18 }, crm:{ media:42, top:78 },
      churn:{ media:14, top:5 }, lead_gen:{ media:'KAM buyer + fiere', top:'KAM + portali B2B digital' }
    }
  },

  // =============================== SERVIZI B2B ==============================

  servizi_consulenza: {
    micro: {
      chiusura:{ media:22, top:42 }, fatxcomm:{ media:160, top:300 },
      ciclo:{ media:40, top:18 }, crm:{ media:28, top:65 },
      churn:{ media:28, top:12 }, lead_gen:{ media:'Referral', top:'Referral + LinkedIn' }
    },
    small: {
      chiusura:{ media:28, top:50 }, fatxcomm:{ media:240, top:440 },
      ciclo:{ media:30, top:14 }, crm:{ media:38, top:76 },
      churn:{ media:22, top:9 }, lead_gen:{ media:'Referral + network', top:'Referral + content' }
    },
    mid: {
      chiusura:{ media:34, top:58 }, fatxcomm:{ media:360, top:620 },
      ciclo:{ media:24, top:10 }, crm:{ media:52, top:86 },
      churn:{ media:18, top:7 }, lead_gen:{ media:'Referral + speaking', top:'Thought leadership' }
    },
    upper: {
      chiusura:{ media:40, top:65 }, fatxcomm:{ media:520, top:860 },
      ciclo:{ media:18, top:8 }, crm:{ media:68, top:94 },
      churn:{ media:14, top:5 }, lead_gen:{ media:'Referral + KOL', top:'KOL + partnership' }
    }
  },

  servizi_it: {
    micro: {
      chiusura:{ media:16, top:34 }, fatxcomm:{ media:200, top:380 },
      ciclo:{ media:60, top:28 }, crm:{ media:38, top:72 },
      churn:{ media:24, top:9 }, lead_gen:{ media:'Referral', top:'Referral + partner vendor' }
    },
    small: {
      chiusura:{ media:22, top:42 }, fatxcomm:{ media:320, top:580 },
      ciclo:{ media:45, top:20 }, crm:{ media:52, top:84 },
      churn:{ media:20, top:7 }, lead_gen:{ media:'Referral + partner', top:'Inbound + partner Microsoft' }
    },
    mid: {
      chiusura:{ media:26, top:48 }, fatxcomm:{ media:460, top:780 },
      ciclo:{ media:36, top:16 }, crm:{ media:66, top:92 },
      churn:{ media:16, top:6 }, lead_gen:{ media:'Partner + inbound', top:'Partner Gold + webinar' }
    },
    upper: {
      chiusura:{ media:30, top:54 }, fatxcomm:{ media:640, top:1050 },
      ciclo:{ media:28, top:12 }, crm:{ media:78, top:96 },
      churn:{ media:12, top:4 }, lead_gen:{ media:'KAM + partner', top:'KAM + managed services' }
    }
  },

  servizi_formazione: {
    micro: {
      chiusura:{ media:24, top:46 }, fatxcomm:{ media:120, top:240 },
      ciclo:{ media:28, top:12 }, crm:{ media:24, top:60 },
      churn:{ media:35, top:15 }, lead_gen:{ media:'Referral, LinkedIn', top:'LinkedIn + fondi' }
    },
    small: {
      chiusura:{ media:30, top:52 }, fatxcomm:{ media:200, top:380 },
      ciclo:{ media:22, top:9 }, crm:{ media:35, top:72 },
      churn:{ media:28, top:12 }, lead_gen:{ media:'LinkedIn + fondi', top:'LinkedIn + accordi quadro' }
    },
    mid: {
      chiusura:{ media:36, top:60 }, fatxcomm:{ media:300, top:540 },
      ciclo:{ media:18, top:7 }, crm:{ media:46, top:82 },
      churn:{ media:22, top:9 }, lead_gen:{ media:'Accordi quadro + Fondimpresa', top:'Accordi pluriennali' }
    },
    upper: {
      chiusura:{ media:42, top:66 }, fatxcomm:{ media:420, top:720 },
      ciclo:{ media:14, top:5 }, crm:{ media:58, top:90 },
      churn:{ media:16, top:7 }, lead_gen:{ media:'KAM HR + accordi', top:'KAM + LMS proprietario' }
    }
  },

  // =============================== EDILIZIA =================================

  edilizia_residenziale: {
    micro: {
      chiusura:{ media:14, top:28 }, fatxcomm:{ media:320, top:580 },
      ciclo:{ media:150, top:75 }, crm:{ media:6,  top:38 },
      churn:{ media:14, top:5 }, lead_gen:{ media:'Passaparola', top:'Passaparola + Google' }
    },
    small: {
      chiusura:{ media:18, top:32 }, fatxcomm:{ media:520, top:880 },
      ciclo:{ media:120, top:60 }, crm:{ media:10, top:48 },
      churn:{ media:11, top:4 }, lead_gen:{ media:'Passaparola + portali', top:'Google Ads + portali' }
    },
    mid: {
      chiusura:{ media:22, top:38 }, fatxcomm:{ media:750, top:1200 },
      ciclo:{ media:90,  top:45 }, crm:{ media:18, top:62 },
      churn:{ media:8,  top:3 }, lead_gen:{ media:'Showroom + Google', top:'Showroom + 3D configuratore' }
    },
    upper: {
      chiusura:{ media:26, top:44 }, fatxcomm:{ media:1100, top:1800 },
      ciclo:{ media:70,  top:35 }, crm:{ media:30, top:75 },
      churn:{ media:6,  top:2 }, lead_gen:{ media:'Brand + showroom', top:'Brand + digital luxury' }
    }
  },

  edilizia_impianti: {
    micro: {
      chiusura:{ media:28, top:48 }, fatxcomm:{ media:240, top:420 },
      ciclo:{ media:28, top:10 }, crm:{ media:4,  top:32 },
      churn:{ media:24, top:10 }, lead_gen:{ media:'Google, passaparola', top:'Google My Business' }
    },
    small: {
      chiusura:{ media:34, top:55 }, fatxcomm:{ media:360, top:600 },
      ciclo:{ media:20, top:8 }, crm:{ media:10, top:44 },
      churn:{ media:20, top:8 }, lead_gen:{ media:'Google + passaparola', top:'Google + contratti manutenzione' }
    },
    mid: {
      chiusura:{ media:38, top:60 }, fatxcomm:{ media:520, top:820 },
      ciclo:{ media:16, top:6 }, crm:{ media:18, top:58 },
      churn:{ media:16, top:6 }, lead_gen:{ media:'Google + imprese partner', top:'B2B imprese + Google' }
    },
    upper: {
      chiusura:{ media:42, top:65 }, fatxcomm:{ media:740, top:1150 },
      ciclo:{ media:12, top:5 }, crm:{ media:32, top:72 },
      churn:{ media:12, top:5 }, lead_gen:{ media:'KAM imprese + gare', top:'KAM + framework agreement' }
    }
  },

  edilizia_ristrutturazioni: {
    micro: {
      chiusura:{ media:20, top:38 }, fatxcomm:{ media:200, top:380 },
      ciclo:{ media:60, top:26 }, crm:{ media:4,  top:30 },
      churn:{ media:25, top:11 }, lead_gen:{ media:'Passaparola', top:'Passaparola + Instagram' }
    },
    small: {
      chiusura:{ media:26, top:46 }, fatxcomm:{ media:320, top:560 },
      ciclo:{ media:45, top:20 }, crm:{ media:8,  top:42 },
      churn:{ media:20, top:9 }, lead_gen:{ media:'Instagram + passaparola', top:'Instagram + Google' }
    },
    mid: {
      chiusura:{ media:30, top:52 }, fatxcomm:{ media:460, top:760 },
      ciclo:{ media:36, top:16 }, crm:{ media:14, top:54 },
      churn:{ media:16, top:7 }, lead_gen:{ media:'Google + designer', top:'Designer + CRM follow-up' }
    },
    upper: {
      chiusura:{ media:34, top:56 }, fatxcomm:{ media:650, top:1050 },
      ciclo:{ media:28, top:12 }, crm:{ media:24, top:66 },
      churn:{ media:12, top:5 }, lead_gen:{ media:'Brand + designer', top:'Brand + architetti KOL' }
    }
  },

  edilizia_serramenti: {
    micro: {
      chiusura:{ media:16, top:30 }, fatxcomm:{ media:280, top:480 },
      ciclo:{ media:75, top:38 }, crm:{ media:6,  top:38 },
      churn:{ media:22, top:9 }, lead_gen:{ media:'Showroom + passaparola', top:'Showroom + Google' }
    },
    small: {
      chiusura:{ media:20, top:38 }, fatxcomm:{ media:420, top:680 },
      ciclo:{ media:60, top:30 }, crm:{ media:12, top:52 },
      churn:{ media:18, top:7 }, lead_gen:{ media:'Showroom + Google', top:'Showroom + 3D online' }
    },
    mid: {
      chiusura:{ media:24, top:44 }, fatxcomm:{ media:580, top:920 },
      ciclo:{ media:48, top:24 }, crm:{ media:20, top:64 },
      churn:{ media:14, top:6 }, lead_gen:{ media:'Showroom + imprese', top:'KAM imprese + configuratore' }
    },
    upper: {
      chiusura:{ media:28, top:50 }, fatxcomm:{ media:820, top:1300 },
      ciclo:{ media:38, top:18 }, crm:{ media:34, top:78 },
      churn:{ media:10, top:4 }, lead_gen:{ media:'KAM GC + showroom', top:'KAM + BIM integration' }
    }
  },

  // =============================== COMMERCIO ================================

  commercio_distribuzione_industriale: {
    micro: {
      chiusura:{ media:22, top:40 }, fatxcomm:{ media:380, top:650 },
      ciclo:{ media:28, top:10 }, crm:{ media:22, top:60 },
      churn:{ media:22, top:9 }, lead_gen:{ media:'Agenti + catalogo', top:'Agenti + e-commerce B2B' }
    },
    small: {
      chiusura:{ media:26, top:46 }, fatxcomm:{ media:580, top:940 },
      ciclo:{ media:22, top:8 }, crm:{ media:34, top:72 },
      churn:{ media:18, top:7 }, lead_gen:{ media:'Agenti + catalogo', top:'CRM outbound + catalogo' }
    },
    mid: {
      chiusura:{ media:30, top:52 }, fatxcomm:{ media:820, top:1300 },
      ciclo:{ media:18, top:6 }, crm:{ media:48, top:84 },
      churn:{ media:14, top:5 }, lead_gen:{ media:'KAM + e-commerce B2B', top:'E-commerce + KAM' }
    },
    upper: {
      chiusura:{ media:34, top:56 }, fatxcomm:{ media:1200, top:1900 },
      ciclo:{ media:14, top:5 }, crm:{ media:62, top:92 },
      churn:{ media:10, top:4 }, lead_gen:{ media:'KAM + framework', top:'KAM + EDI integration' }
    }
  },

  commercio_ingrosso_alimentare: {
    micro: {
      chiusura:{ media:30, top:50 }, fatxcomm:{ media:450, top:780 },
      ciclo:{ media:10, top:4 }, crm:{ media:16, top:50 },
      churn:{ media:28, top:12 }, lead_gen:{ media:'Agenti', top:'Agenti + app ordini' }
    },
    small: {
      chiusura:{ media:36, top:58 }, fatxcomm:{ media:680, top:1100 },
      ciclo:{ media:7,  top:3 }, crm:{ media:26, top:64 },
      churn:{ media:24, top:10 }, lead_gen:{ media:'Agenti + catalogo', top:'Agenti + digital ordering' }
    },
    mid: {
      chiusura:{ media:42, top:65 }, fatxcomm:{ media:980, top:1600 },
      ciclo:{ media:5,  top:2 }, crm:{ media:38, top:76 },
      churn:{ media:20, top:8 }, lead_gen:{ media:'KAM GDO + agenti', top:'KAM + sell-out analytics' }
    },
    upper: {
      chiusura:{ media:46, top:70 }, fatxcomm:{ media:1400, top:2200 },
      ciclo:{ media:4,  top:2 }, crm:{ media:52, top:88 },
      churn:{ media:16, top:6 }, lead_gen:{ media:'KAM GDO + broker', top:'KAM + category management' }
    }
  },

  commercio_materiali_edili: {
    micro: {
      chiusura:{ media:28, top:48 }, fatxcomm:{ media:360, top:620 },
      ciclo:{ media:14, top:5 }, crm:{ media:14, top:48 },
      churn:{ media:24, top:10 }, lead_gen:{ media:'Showroom + passaparola', top:'Showroom + Google' }
    },
    small: {
      chiusura:{ media:33, top:52 }, fatxcomm:{ media:540, top:880 },
      ciclo:{ media:10, top:4 }, crm:{ media:22, top:60 },
      churn:{ media:20, top:8 }, lead_gen:{ media:'Showroom + agenti', top:'Showroom + agenti B2B' }
    },
    mid: {
      chiusura:{ media:37, top:58 }, fatxcomm:{ media:780, top:1250 },
      ciclo:{ media:8,  top:3 }, crm:{ media:34, top:72 },
      churn:{ media:16, top:6 }, lead_gen:{ media:'KAM imprese + showroom', top:'KAM + e-commerce B2B' }
    },
    upper: {
      chiusura:{ media:42, top:64 }, fatxcomm:{ media:1100, top:1750 },
      ciclo:{ media:6,  top:2 }, crm:{ media:48, top:84 },
      churn:{ media:12, top:5 }, lead_gen:{ media:'KAM + gare', top:'KAM + piattaforma B2B' }
    }
  },

  commercio_ricambi_auto: {
    micro: {
      chiusura:{ media:32, top:54 }, fatxcomm:{ media:420, top:720 },
      ciclo:{ media:7,  top:3 }, crm:{ media:18, top:52 },
      churn:{ media:26, top:11 }, lead_gen:{ media:'Catalogo + telefono', top:'Catalogo + consegna rapida' }
    },
    small: {
      chiusura:{ media:38, top:60 }, fatxcomm:{ media:620, top:1000 },
      ciclo:{ media:5,  top:2 }, crm:{ media:28, top:65 },
      churn:{ media:22, top:9 }, lead_gen:{ media:'Catalogo + agenti', top:'App ordini + agenti' }
    },
    mid: {
      chiusura:{ media:44, top:66 }, fatxcomm:{ media:900, top:1450 },
      ciclo:{ media:3,  top:1 }, crm:{ media:42, top:78 },
      churn:{ media:18, top:7 }, lead_gen:{ media:'E-commerce + agenti', top:'E-commerce + consegna < 2h' }
    },
    upper: {
      chiusura:{ media:48, top:70 }, fatxcomm:{ media:1300, top:2100 },
      ciclo:{ media:2,  top:1 }, crm:{ media:58, top:88 },
      churn:{ media:14, top:5 }, lead_gen:{ media:'KAM officine + e-comm', top:'KAM + piattaforma EDI' }
    }
  },

  commercio_abbigliamento_ingrosso: {
    micro: {
      chiusura:{ media:22, top:40 }, fatxcomm:{ media:280, top:500 },
      ciclo:{ media:20, top:8 }, crm:{ media:12, top:44 },
      churn:{ media:32, top:14 }, lead_gen:{ media:'Fiere + showroom', top:'Fiere + Joor' }
    },
    small: {
      chiusura:{ media:28, top:48 }, fatxcomm:{ media:420, top:720 },
      ciclo:{ media:15, top:6 }, crm:{ media:20, top:56 },
      churn:{ media:26, top:11 }, lead_gen:{ media:'Fiere + agenti', top:'Fiere + B2B digital' }
    },
    mid: {
      chiusura:{ media:33, top:54 }, fatxcomm:{ media:600, top:980 },
      ciclo:{ media:12, top:5 }, crm:{ media:30, top:68 },
      churn:{ media:22, top:9 }, lead_gen:{ media:'Fiere + KAM buyer', top:'KAM + showroom permanente' }
    },
    upper: {
      chiusura:{ media:38, top:60 }, fatxcomm:{ media:860, top:1380 },
      ciclo:{ media:9,  top:4 }, crm:{ media:44, top:80 },
      churn:{ media:18, top:7 }, lead_gen:{ media:'KAM + brand showroom', top:'KAM + sell-through analytics' }
    }
  },

  commercio_elettronica: {
    micro: {
      chiusura:{ media:26, top:46 }, fatxcomm:{ media:480, top:820 },
      ciclo:{ media:10, top:4 }, crm:{ media:24, top:58 },
      churn:{ media:28, top:12 }, lead_gen:{ media:'Store + Google', top:'Store + Google Shopping' }
    },
    small: {
      chiusura:{ media:32, top:52 }, fatxcomm:{ media:720, top:1150 },
      ciclo:{ media:7,  top:3 }, crm:{ media:36, top:70 },
      churn:{ media:24, top:10 }, lead_gen:{ media:'Google + store', top:'Google + e-commerce' }
    },
    mid: {
      chiusura:{ media:36, top:58 }, fatxcomm:{ media:1050, top:1680 },
      ciclo:{ media:5,  top:2 }, crm:{ media:48, top:82 },
      churn:{ media:20, top:8 }, lead_gen:{ media:'E-commerce + B2B', top:'E-commerce + B2B enterprise' }
    },
    upper: {
      chiusura:{ media:40, top:62 }, fatxcomm:{ media:1500, top:2400 },
      ciclo:{ media:4,  top:2 }, crm:{ media:62, top:90 },
      churn:{ media:16, top:6 }, lead_gen:{ media:'KAM + e-commerce', top:'KAM + marketplace + B2B' }
    }
  },

  commercio_chimici: {
    micro: {
      chiusura:{ media:28, top:48 }, fatxcomm:{ media:320, top:560 },
      ciclo:{ media:18, top:7 }, crm:{ media:20, top:54 },
      churn:{ media:20, top:8 }, lead_gen:{ media:'Agenti tecnici', top:'Agenti + campioni gratuiti' }
    },
    small: {
      chiusura:{ media:34, top:55 }, fatxcomm:{ media:480, top:800 },
      ciclo:{ media:14, top:5 }, crm:{ media:30, top:66 },
      churn:{ media:16, top:6 }, lead_gen:{ media:'Tecnici + contratti quadro', top:'Contratti quadro + lab' }
    },
    mid: {
      chiusura:{ media:40, top:62 }, fatxcomm:{ media:700, top:1150 },
      ciclo:{ media:10, top:4 }, crm:{ media:42, top:78 },
      churn:{ media:12, top:5 }, lead_gen:{ media:'KAM + laboratorio', top:'KAM + co-sviluppo' }
    },
    upper: {
      chiusura:{ media:44, top:68 }, fatxcomm:{ media:1000, top:1600 },
      ciclo:{ media:8,  top:3 }, crm:{ media:58, top:88 },
      churn:{ media:9,  top:3 }, lead_gen:{ media:'KAM + framework', top:'KAM + supply agreement' }
    }
  },

  commercio_medicale: {
    micro: {
      chiusura:{ media:14, top:28 }, fatxcomm:{ media:300, top:540 },
      ciclo:{ media:90, top:45 }, crm:{ media:36, top:68 },
      churn:{ media:14, top:5 }, lead_gen:{ media:'ISF + congressi', top:'ISF + KOL' }
    },
    small: {
      chiusura:{ media:18, top:35 }, fatxcomm:{ media:460, top:780 },
      ciclo:{ media:70, top:35 }, crm:{ media:48, top:78 },
      churn:{ media:12, top:4 }, lead_gen:{ media:'ISF + congressi + gare', top:'ISF + KOL + gare pubbliche' }
    },
    mid: {
      chiusura:{ media:22, top:42 }, fatxcomm:{ media:680, top:1100 },
      ciclo:{ media:55, top:28 }, crm:{ media:62, top:88 },
      churn:{ media:9,  top:3 }, lead_gen:{ media:'Gare + KOL + ISF', top:'Gare + KOL + digital HCP' }
    },
    upper: {
      chiusura:{ media:26, top:46 }, fatxcomm:{ media:980, top:1580 },
      ciclo:{ media:45, top:22 }, crm:{ media:74, top:94 },
      churn:{ media:7,  top:2 }, lead_gen:{ media:'KAM + gare nazionali', top:'KAM + accords-cadre' }
    }
  },

  commercio_auto_moto: {
    micro: {
      chiusura:{ media:12, top:24 }, fatxcomm:{ media:640, top:1150 },
      ciclo:{ media:35, top:14 }, crm:{ media:28, top:62 },
      churn:{ media:45, top:22 }, lead_gen:{ media:'Showroom + portali', top:'Google Ads + portali' }
    },
    small: {
      chiusura:{ media:16, top:30 }, fatxcomm:{ media:960, top:1720 },
      ciclo:{ media:26, top:10 }, crm:{ media:40, top:74 },
      churn:{ media:38, top:19 }, lead_gen:{ media:'Portali + Google', top:'Google + CRM follow-up' }
    },
    mid: {
      chiusura:{ media:20, top:36 }, fatxcomm:{ media:1400, top:2500 },
      ciclo:{ media:20, top:8 }, crm:{ media:54, top:86 },
      churn:{ media:32, top:16 }, lead_gen:{ media:'CRM + portali + Google', top:'BDC + Google + remarketing' }
    },
    upper: {
      chiusura:{ media:24, top:42 }, fatxcomm:{ media:2000, top:3600 },
      ciclo:{ media:16, top:6 }, crm:{ media:66, top:92 },
      churn:{ media:28, top:13 }, lead_gen:{ media:'BDC + CRM + brand', top:'BDC + VIP program + CRM' }
    }
  },

  commercio_abbigliamento_dettaglio: {
    micro: {
      chiusura:{ media:42, top:62 }, fatxcomm:{ media:180, top:340 },
      ciclo:{ media:1,  top:1 }, crm:{ media:6,  top:36 },
      churn:{ media:50, top:25 }, lead_gen:{ media:'Vetrina + passaparola', top:'Instagram + fidelity' }
    },
    small: {
      chiusura:{ media:52, top:72 }, fatxcomm:{ media:280, top:520 },
      ciclo:{ media:1,  top:1 }, crm:{ media:12, top:48 },
      churn:{ media:42, top:21 }, lead_gen:{ media:'Social + vetrina', top:'Social + WhatsApp VIP' }
    },
    mid: {
      chiusura:{ media:58, top:78 }, fatxcomm:{ media:400, top:740 },
      ciclo:{ media:1,  top:1 }, crm:{ media:22, top:60 },
      churn:{ media:36, top:18 }, lead_gen:{ media:'Social + CRM loyalty', top:'Social + CRM + stylist' }
    },
    upper: {
      chiusura:{ media:62, top:82 }, fatxcomm:{ media:580, top:1050 },
      ciclo:{ media:1,  top:1 }, crm:{ media:36, top:72 },
      churn:{ media:30, top:15 }, lead_gen:{ media:'Brand + CRM', top:'Brand + personal shopper' }
    }
  },

  commercio_orologi_gioielli: {
    micro: {
      chiusura:{ media:18, top:35 }, fatxcomm:{ media:260, top:480 },
      ciclo:{ media:10, top:4 }, crm:{ media:8,  top:42 },
      churn:{ media:36, top:16 }, lead_gen:{ media:'Vetrina + passaparola', top:'Passaparola + Instagram' }
    },
    small: {
      chiusura:{ media:24, top:44 }, fatxcomm:{ media:400, top:720 },
      ciclo:{ media:7,  top:3 }, crm:{ media:16, top:54 },
      churn:{ media:30, top:13 }, lead_gen:{ media:'Instagram + eventi', top:'Instagram + eventi VIP' }
    },
    mid: {
      chiusura:{ media:28, top:50 }, fatxcomm:{ media:600, top:1050 },
      ciclo:{ media:5,  top:2 }, crm:{ media:26, top:66 },
      churn:{ media:24, top:10 }, lead_gen:{ media:'Brand + eventi + social', top:'Brand + CRM anniversari' }
    },
    upper: {
      chiusura:{ media:34, top:56 }, fatxcomm:{ media:900, top:1550 },
      ciclo:{ media:4,  top:2 }, crm:{ media:40, top:78 },
      churn:{ media:18, top:8 }, lead_gen:{ media:'Brand + KOL + eventi', top:'Private events + concierge' }
    }
  },

  // =============================== ALIMENTARE ===============================

  alimentare_trasformazione: {
    micro: {
      chiusura:{ media:16, top:30 }, fatxcomm:{ media:220, top:400 },
      ciclo:{ media:65, top:32 }, crm:{ media:10, top:42 },
      churn:{ media:20, top:8 }, lead_gen:{ media:'Fiere + broker', top:'Fiere + contatto diretto GDO' }
    },
    small: {
      chiusura:{ media:20, top:36 }, fatxcomm:{ media:340, top:580 },
      ciclo:{ media:50, top:25 }, crm:{ media:16, top:54 },
      churn:{ media:16, top:6 }, lead_gen:{ media:'Fiere + broker GDO', top:'Fiere + KAM GDO' }
    },
    mid: {
      chiusura:{ media:24, top:42 }, fatxcomm:{ media:500, top:820 },
      ciclo:{ media:40, top:20 }, crm:{ media:26, top:66 },
      churn:{ media:13, top:5 }, lead_gen:{ media:'KAM GDO + export broker', top:'KAM + ECR + export' }
    },
    upper: {
      chiusura:{ media:28, top:48 }, fatxcomm:{ media:720, top:1180 },
      ciclo:{ media:32, top:16 }, crm:{ media:40, top:78 },
      churn:{ media:10, top:4 }, lead_gen:{ media:'KAM + trade marketing', top:'KAM + category + private label' }
    }
  },

  alimentare_vini: {
    micro: {
      chiusura:{ media:20, top:38 }, fatxcomm:{ media:190, top:360 },
      ciclo:{ media:45, top:20 }, crm:{ media:12, top:48 },
      churn:{ media:24, top:10 }, lead_gen:{ media:'Fiere + enoteca', top:'Vinitaly + DTC' }
    },
    small: {
      chiusura:{ media:26, top:46 }, fatxcomm:{ media:300, top:520 },
      ciclo:{ media:36, top:15 }, crm:{ media:20, top:60 },
      churn:{ media:20, top:8 }, lead_gen:{ media:'Fiere + HO.RE.CA.', top:'Fiere + wine club + export' }
    },
    mid: {
      chiusura:{ media:30, top:52 }, fatxcomm:{ media:440, top:740 },
      ciclo:{ media:28, top:12 }, crm:{ media:30, top:72 },
      churn:{ media:16, top:6 }, lead_gen:{ media:'Export + GDO + wine club', top:'Export + DTC + sommelier KOL' }
    },
    upper: {
      chiusura:{ media:34, top:58 }, fatxcomm:{ media:640, top:1050 },
      ciclo:{ media:22, top:9 }, crm:{ media:44, top:84 },
      churn:{ media:12, top:5 }, lead_gen:{ media:'KAM + export + brand', top:'Brand + wine tourism + DTC' }
    }
  },

  alimentare_forno: {
    micro: {
      chiusura:{ media:26, top:46 }, fatxcomm:{ media:150, top:280 },
      ciclo:{ media:18, top:7 }, crm:{ media:6,  top:34 },
      churn:{ media:26, top:11 }, lead_gen:{ media:'Agenti + passaparola', top:'Agenti + HO.RE.CA.' }
    },
    small: {
      chiusura:{ media:32, top:52 }, fatxcomm:{ media:240, top:420 },
      ciclo:{ media:14, top:5 }, crm:{ media:12, top:44 },
      churn:{ media:22, top:9 }, lead_gen:{ media:'Agenti + GDO locale', top:'Agenti + GDO + SIGEP' }
    },
    mid: {
      chiusura:{ media:36, top:58 }, fatxcomm:{ media:360, top:620 },
      ciclo:{ media:10, top:4 }, crm:{ media:20, top:56 },
      churn:{ media:18, top:7 }, lead_gen:{ media:'KAM GDO + agenti', top:'KAM + sell-out analytics' }
    },
    upper: {
      chiusura:{ media:40, top:62 }, fatxcomm:{ media:520, top:880 },
      ciclo:{ media:8,  top:3 }, crm:{ media:34, top:68 },
      churn:{ media:14, top:5 }, lead_gen:{ media:'KAM + private label', top:'KAM + PL + export' }
    }
  },

  alimentare_conserve: {
    micro: {
      chiusura:{ media:16, top:30 }, fatxcomm:{ media:240, top:420 },
      ciclo:{ media:42, top:20 }, crm:{ media:10, top:42 },
      churn:{ media:20, top:8 }, lead_gen:{ media:'Broker + agenti', top:'Broker GDO + Cibus' }
    },
    small: {
      chiusura:{ media:20, top:38 }, fatxcomm:{ media:380, top:640 },
      ciclo:{ media:32, top:15 }, crm:{ media:18, top:54 },
      churn:{ media:17, top:6 }, lead_gen:{ media:'Fiere + KAM GDO', top:'KAM + fiere internazionali' }
    },
    mid: {
      chiusura:{ media:25, top:44 }, fatxcomm:{ media:560, top:920 },
      ciclo:{ media:26, top:12 }, crm:{ media:28, top:66 },
      churn:{ media:13, top:5 }, lead_gen:{ media:'KAM + export', top:'KAM + private label + export' }
    },
    upper: {
      chiusura:{ media:30, top:50 }, fatxcomm:{ media:820, top:1320 },
      ciclo:{ media:20, top:9 }, crm:{ media:42, top:78 },
      churn:{ media:10, top:4 }, lead_gen:{ media:'KAM + PL + trade mktg', top:'KAM + ECR + PL + export' }
    }
  },

  alimentare_ingredienti: {
    micro: {
      chiusura:{ media:14, top:28 }, fatxcomm:{ media:300, top:540 },
      ciclo:{ media:80, top:40 }, crm:{ media:18, top:52 },
      churn:{ media:16, top:6 }, lead_gen:{ media:'Fiere + lab tecnico', top:'Fiere + application lab' }
    },
    small: {
      chiusura:{ media:18, top:34 }, fatxcomm:{ media:480, top:800 },
      ciclo:{ media:65, top:32 }, crm:{ media:26, top:64 },
      churn:{ media:12, top:5 }, lead_gen:{ media:'Application lab + fiere', top:'Lab + KAM R&D' }
    },
    mid: {
      chiusura:{ media:22, top:40 }, fatxcomm:{ media:700, top:1150 },
      ciclo:{ media:52, top:26 }, crm:{ media:36, top:76 },
      churn:{ media:9,  top:3 }, lead_gen:{ media:'KAM R&D + lab', top:'KAM + co-sviluppo + white paper' }
    },
    upper: {
      chiusura:{ media:26, top:46 }, fatxcomm:{ media:1000, top:1650 },
      ciclo:{ media:42, top:20 }, crm:{ media:50, top:86 },
      churn:{ media:7,  top:2 }, lead_gen:{ media:'KAM + supply agreement', top:'KAM + co-dev + brevetti' }
    }
  },

  // =============================== TECH =====================================

  tech_saas: {
    micro: {
      chiusura:{ media:14, top:30 }, fatxcomm:{ media:200, top:420 },
      ciclo:{ media:45, top:20 }, crm:{ media:54, top:88 },
      churn:{ media:36, top:14 }, lead_gen:{ media:'Inbound + trial', top:'PLG + inbound' }
    },
    small: {
      chiusura:{ media:18, top:38 }, fatxcomm:{ media:340, top:680 },
      ciclo:{ media:32, top:14 }, crm:{ media:68, top:94 },
      churn:{ media:30, top:11 }, lead_gen:{ media:'PLG + inbound', top:'PLG + SDR + G2' }
    },
    mid: {
      chiusura:{ media:22, top:45 }, fatxcomm:{ media:520, top:1000 },
      ciclo:{ media:24, top:10 }, crm:{ media:82, top:98 },
      churn:{ media:24, top:8 }, lead_gen:{ media:'Inbound + SDR outbound', top:'Inbound + ABM + SDR' }
    },
    upper: {
      chiusura:{ media:26, top:50 }, fatxcomm:{ media:760, top:1450 },
      ciclo:{ media:18, top:8 }, crm:{ media:92, top:99 },
      churn:{ media:18, top:6 }, lead_gen:{ media:'ABM + SDR + partner', top:'ABM + enterprise + partner' }
    }
  },

  tech_system_integrator: {
    micro: {
      chiusura:{ media:16, top:32 }, fatxcomm:{ media:260, top:480 },
      ciclo:{ media:80, top:40 }, crm:{ media:40, top:72 },
      churn:{ media:24, top:9 }, lead_gen:{ media:'Referral + partner vendor', top:'Referral + Microsoft/AWS' }
    },
    small: {
      chiusura:{ media:20, top:38 }, fatxcomm:{ media:400, top:720 },
      ciclo:{ media:65, top:32 }, crm:{ media:55, top:84 },
      churn:{ media:20, top:7 }, lead_gen:{ media:'Partner + referral', top:'Partner Gold + webinar' }
    },
    mid: {
      chiusura:{ media:26, top:46 }, fatxcomm:{ media:580, top:1000 },
      ciclo:{ media:52, top:26 }, crm:{ media:68, top:92 },
      churn:{ media:16, top:6 }, lead_gen:{ media:'Partner + KAM', top:'Partner + ABM + KAM' }
    },
    upper: {
      chiusura:{ media:30, top:52 }, fatxcomm:{ media:840, top:1450 },
      ciclo:{ media:42, top:20 }, crm:{ media:78, top:96 },
      churn:{ media:12, top:4 }, lead_gen:{ media:'KAM + gare + partner', top:'KAM + framework + partnership' }
    }
  },

  tech_digital_agency: {
    micro: {
      chiusura:{ media:20, top:40 }, fatxcomm:{ media:160, top:300 },
      ciclo:{ media:28, top:12 }, crm:{ media:36, top:70 },
      churn:{ media:38, top:16 }, lead_gen:{ media:'Referral + portfolio', top:'Referral + LinkedIn' }
    },
    small: {
      chiusura:{ media:26, top:48 }, fatxcomm:{ media:260, top:480 },
      ciclo:{ media:22, top:9 }, crm:{ media:50, top:82 },
      churn:{ media:32, top:13 }, lead_gen:{ media:'Referral + LinkedIn', top:'Referral + case study' }
    },
    mid: {
      chiusura:{ media:30, top:54 }, fatxcomm:{ media:380, top:680 },
      ciclo:{ media:18, top:7 }, crm:{ media:62, top:90 },
      churn:{ media:26, top:10 }, lead_gen:{ media:'Referral + contenuti', top:'Referral + premi + speaking' }
    },
    upper: {
      chiusura:{ media:34, top:58 }, fatxcomm:{ media:540, top:960 },
      ciclo:{ media:14, top:6 }, crm:{ media:72, top:94 },
      churn:{ media:22, top:8 }, lead_gen:{ media:'Brand + referral + LinkedIn', top:'Brand + ABM + thought leadership' }
    }
  },

  tech_automazione: {
    micro: {
      chiusura:{ media:12, top:24 }, fatxcomm:{ media:320, top:580 },
      ciclo:{ media:120, top:60 }, crm:{ media:34, top:66 },
      churn:{ media:16, top:5 }, lead_gen:{ media:'Fiere + partner OEM', top:'Fiere SPS + incentivi 4.0' }
    },
    small: {
      chiusura:{ media:16, top:30 }, fatxcomm:{ media:520, top:920 },
      ciclo:{ media:95,  top:48 }, crm:{ media:46, top:78 },
      churn:{ media:13, top:4 }, lead_gen:{ media:'Fiere + bandi 4.0', top:'Fiere + referral + bandi' }
    },
    mid: {
      chiusura:{ media:20, top:38 }, fatxcomm:{ media:760, top:1350 },
      ciclo:{ media:75,  top:38 }, crm:{ media:60, top:88 },
      churn:{ media:10, top:3 }, lead_gen:{ media:'KAM + fiere + bandi', top:'KAM + ROI calculator + bandi' }
    },
    upper: {
      chiusura:{ media:24, top:44 }, fatxcomm:{ media:1100, top:1900 },
      ciclo:{ media:60,  top:30 }, crm:{ media:72, top:94 },
      churn:{ media:7,  top:2 }, lead_gen:{ media:'KAM + gare + OEM', top:'KAM + IoT platform + framework' }
    }
  },

};