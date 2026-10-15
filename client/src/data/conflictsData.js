
// Static conflict data — replace with API calls when backend is ready
export const conflictsData = [
  {
    id: "ukr-rus-2022",
    country: "Ukraine",
    countryCode: "UA",
    coordinates: { lat: 48.3794, lng: 31.1656 },
    conflictType: "interstate war",
    severity: 9.4,
    status: "active",
    startDate: "2022-02-24",
    parties: ["Ukraine", "Russia"],
    proxyActors: ["NATO (indirect)", "Wagner Group"],
    activeDeaths: 487000,
    civilianCasualties: 10000,
    displaced: 14000000,
    summary: "Full-scale Russian invasion of Ukraine following the 2014 Donbas conflict. One of the largest conventional wars in Europe since WWII.",
    territory: "Eastern and Southern Ukraine, including Donbas, Zaporizhzhia, Kherson, and Crimea",
    keyEvents: [
      { date: "2022-02-24", event: "Russia launches full-scale invasion" },
      { date: "2022-04-03", event: "Bucha massacre discovered" },
      { date: "2022-09-11", event: "Ukrainian Kharkiv counteroffensive" },
      { date: "2023-06-04", event: "Ukrainian summer counteroffensive begins" },
      { date: "2024-10-01", event: "Russia advances in Donetsk" }
    ],
    military: {
      ukraine: { activePersonnel: 900000, tanks: 2500, aircraft: 67, navy: 10, militaryBudgetUSD: 64000000000, nuclearWarheads: 0, gwpIndex: 0.3425 },
      russia: { activePersonnel: 1320000, tanks: 12500, aircraft: 1511, navy: 598, militaryBudgetUSD: 109000000000, nuclearWarheads: 5889, gwpIndex: 0.0501 }
    },
    globalPowerRankings: [
      { country: "Russia", rank: 2, score: 0.0501 },
      { country: "Ukraine", rank: 22, score: 0.3425 }
    ]
  },
  {
    id: "gaza-2023",
    country: "Palestine / Gaza",
    countryCode: "PS",
    coordinates: { lat: 31.3547, lng: 34.3088 },
    conflictType: "interstate war",
    severity: 9.2,
    status: "active",
    startDate: "2023-10-07",
    parties: ["Israel", "Hamas", "Palestinian Islamic Jihad"],
    proxyActors: ["Iran (Hamas backer)", "Hezbollah", "Houthis"],
    activeDeaths: 45000,
    civilianCasualties: 33000,
    displaced: 1900000,
    summary: "Following the Hamas-led October 7 attacks on Israel, Israel launched a full military campaign in the Gaza Strip causing catastrophic civilian casualties.",
    territory: "Gaza Strip, West Bank",
    keyEvents: [
      { date: "2023-10-07", event: "Hamas launches surprise attack on Israel" },
      { date: "2023-11-01", event: "IDF ground operation begins in Gaza City" },
      { date: "2024-05-06", event: "IDF enters Rafah" },
      { date: "2025-01-19", event: "Ceasefire agreement reached" }
    ],
    military: {
      israel: { activePersonnel: 169500, tanks: 1370, aircraft: 612, navy: 67, militaryBudgetUSD: 27500000000, nuclearWarheads: 90, gwpIndex: 0.1674 },
      hamas: { activePersonnel: 40000, tanks: 0, aircraft: 0, navy: 0, militaryBudgetUSD: 300000000, nuclearWarheads: 0, gwpIndex: null }
    },
    globalPowerRankings: [{ country: "Israel", rank: 17, score: 0.1674 }]
  },
  {
    id: "sudan-2023",
    country: "Sudan",
    countryCode: "SD",
    coordinates: { lat: 12.8628, lng: 30.2176 },
    conflictType: "civil war",
    severity: 8.7,
    status: "active",
    startDate: "2023-04-15",
    parties: ["Sudanese Armed Forces (SAF)", "Rapid Support Forces (RSF)"],
    proxyActors: ["UAE (RSF support)", "Wagner Group", "Egypt (SAF support)"],
    activeDeaths: 150000,
    civilianCasualties: 50000,
    displaced: 10800000,
    summary: "Armed conflict between the Sudanese Armed Forces and the paramilitary RSF, triggering one of the world's worst humanitarian crises.",
    territory: "Khartoum, Darfur, Kordofan, Gezira",
    keyEvents: [
      { date: "2023-04-15", event: "Fighting erupts in Khartoum" },
      { date: "2023-06-01", event: "RSF captures most of Khartoum" },
      { date: "2023-11-03", event: "RSF captures El Geneina, mass atrocities in Darfur" },
      { date: "2024-09-26", event: "SAF launches major offensive to retake Khartoum" }
    ],
    military: {
      saf: { activePersonnel: 109000, tanks: 410, aircraft: 65, navy: 18, militaryBudgetUSD: 4000000000, nuclearWarheads: 0, gwpIndex: null },
      rsf: { activePersonnel: 100000, tanks: 100, aircraft: 0, navy: 0, militaryBudgetUSD: 500000000, nuclearWarheads: 0, gwpIndex: null }
    },
    globalPowerRankings: [{ country: "Sudan", rank: 60, score: 1.7835 }]
  },
  {
    id: "myanmar-2021",
    country: "Myanmar",
    countryCode: "MM",
    coordinates: { lat: 19.7633, lng: 96.0785 },
    conflictType: "civil war",
    severity: 8.1,
    status: "active",
    startDate: "2021-02-01",
    parties: ["Military Junta (SAC)", "People's Defence Force (PDF)", "Ethnic Armed Organizations"],
    proxyActors: ["China (Junta support)", "Three Brotherhood Alliance"],
    activeDeaths: 50000,
    civilianCasualties: 7000,
    displaced: 2600000,
    summary: "Following the February 2021 coup, the military junta faces a nationwide armed resistance by the PDF and ethnic armed groups across Myanmar.",
    territory: "Nationwide, especially Sagaing, Mandalay, Chin, Karen, Kachin states",
    keyEvents: [
      { date: "2021-02-01", event: "Military coup ousts Aung San Suu Kyi" },
      { date: "2021-09-07", event: "NUG declares people's defensive war" },
      { date: "2023-10-27", event: "Operation 1027: Alliance launches major offensive" },
      { date: "2024-01-05", event: "Alliance captures Laukkai" }
    ],
    military: {
      militaryJunta: { activePersonnel: 350000, tanks: 500, aircraft: 128, navy: 65, militaryBudgetUSD: 2800000000, nuclearWarheads: 0, gwpIndex: null },
      pdf_eao: { activePersonnel: 65000, tanks: 0, aircraft: 0, navy: 0, militaryBudgetUSD: null, nuclearWarheads: 0, gwpIndex: null }
    },
    globalPowerRankings: [{ country: "Myanmar", rank: 36, score: 0.7489 }]
  },
  {
    id: "yemen-2014",
    country: "Yemen",
    countryCode: "YE",
    coordinates: { lat: 15.5527, lng: 48.5164 },
    conflictType: "proxy war",
    severity: 8.5,
    status: "active",
    startDate: "2014-09-21",
    parties: ["Houthi Movement", "Yemeni Government", "Saudi-led Coalition"],
    proxyActors: ["Iran (Houthi backer)", "Saudi Arabia", "UAE", "USA (indirect)"],
    activeDeaths: 377000,
    civilianCasualties: 150000,
    displaced: 4500000,
    summary: "A multi-sided civil war and regional proxy conflict between the Iranian-backed Houthis and the Saudi-backed Yemeni government. One of the world's worst humanitarian disasters.",
    territory: "Nationwide, Red Sea coast, Marib, Hodeidah",
    keyEvents: [
      { date: "2014-09-21", event: "Houthis seize Sanaa" },
      { date: "2015-03-26", event: "Saudi-led coalition intervenes" },
      { date: "2022-04-02", event: "UN-brokered truce begins" },
      { date: "2024-01-11", event: "US and UK strike Houthi targets" }
    ],
    military: {
      houthis: { activePersonnel: 200000, tanks: 66, aircraft: 6, navy: 0, militaryBudgetUSD: null, nuclearWarheads: 0, gwpIndex: null },
      saudiCoalition: { activePersonnel: 580000, tanks: 1060, aircraft: 862, navy: 203, militaryBudgetUSD: 75600000000, nuclearWarheads: 0, gwpIndex: 0.1711 }
    },
    globalPowerRankings: [{ country: "Saudi Arabia", rank: 16, score: 0.1711 }]
  },
  {
    id: "ethiopia-tigray",
    country: "Ethiopia",
    countryCode: "ET",
    coordinates: { lat: 9.145, lng: 40.4897 },
    conflictType: "civil war",
    severity: 7.2,
    status: "ceasefire",
    startDate: "2020-11-04",
    parties: ["Ethiopian National Defence Force", "Tigray People's Liberation Front", "Amhara Fano"],
    proxyActors: ["Eritrea (ENDF ally)", "UAE (drone support)"],
    activeDeaths: 600000,
    civilianCasualties: 200000,
    displaced: 2500000,
    summary: "One of the deadliest conflicts of the 21st century. A peace deal was signed in November 2022 but inter-ethnic tensions and Fano insurgency continue.",
    territory: "Tigray, Amhara, Afar regions",
    keyEvents: [
      { date: "2020-11-04", event: "Ethiopian government launches military offensive" },
      { date: "2021-07-02", event: "TPLF recaptures Mekelle" },
      { date: "2022-11-02", event: "Peace agreement signed in Pretoria" }
    ],
    military: {
      ethiopia: { activePersonnel: 138000, tanks: 600, aircraft: 82, navy: 0, militaryBudgetUSD: 847000000, nuclearWarheads: 0, gwpIndex: null }
    },
    globalPowerRankings: [{ country: "Ethiopia", rank: 59, score: 1.7388 }]
  },
  {
    id: "syria-2011",
    country: "Syria",
    countryCode: "SY",
    coordinates: { lat: 34.8021, lng: 38.9968 },
    conflictType: "proxy war",
    severity: 7.8,
    status: "active",
    startDate: "2011-03-15",
    parties: ["Syrian Forces (HTS)", "Rebel Factions", "Kurdish SDF"],
    proxyActors: ["Russia", "Iran", "Turkey", "USA (SDF support)", "Israel"],
    activeDeaths: 620000,
    civilianCasualties: 300000,
    displaced: 13500000,
    summary: "What began as an Arab Spring uprising evolved into a catastrophic multi-sided proxy war. In late 2024, HTS rebels overthrew Assad. Multiple foreign powers remain involved.",
    territory: "Northwestern Syria, Kurdish regions, Israeli-occupied buffer zones",
    keyEvents: [
      { date: "2011-03-15", event: "Arab Spring protests begin" },
      { date: "2015-09-30", event: "Russia begins airstrikes" },
      { date: "2024-12-08", event: "Assad regime falls; HTS takes Damascus" }
    ],
    military: {
      syrianForces: { activePersonnel: 130000, tanks: 3000, aircraft: 90, navy: 20, militaryBudgetUSD: 1800000000, nuclearWarheads: 0, gwpIndex: null }
    },
    globalPowerRankings: []
  },
  {
    id: "sahel-mali",
    country: "Mali",
    countryCode: "ML",
    coordinates: { lat: 17.5707, lng: -3.9962 },
    conflictType: "proxy war",
    severity: 7.0,
    status: "active",
    startDate: "2012-01-16",
    parties: ["Malian Armed Forces", "JNIM (al-Qaeda affiliate)", "ISGS (ISIS affiliate)"],
    proxyActors: ["Russia/Africa Corps", "Wagner Group"],
    activeDeaths: 40000,
    civilianCasualties: 15000,
    displaced: 800000,
    summary: "A jihadist insurgency, coup cycles, and regional destabilization across the Sahel. Mali expelled French and UN forces and turned to Russia's Africa Corps.",
    territory: "Northern and Central Mali, Ménaka, Kidal",
    keyEvents: [
      { date: "2012-01-16", event: "Tuareg uprising begins" },
      { date: "2021-05-24", event: "Second military coup" },
      { date: "2022-02-17", event: "France, EU withdraw forces" }
    ],
    military: {
      mali_faf: { activePersonnel: 21000, tanks: 21, aircraft: 24, navy: 3, militaryBudgetUSD: 450000000, nuclearWarheads: 0, gwpIndex: null }
    },
    globalPowerRankings: []
  },
  {
    id: "drc-m23",
    country: "DR Congo",
    countryCode: "CD",
    coordinates: { lat: -4.0383, lng: 21.7587 },
    conflictType: "proxy war",
    severity: 7.5,
    status: "active",
    startDate: "2012-04-04",
    parties: ["DRC Armed Forces (FARDC)", "M23 Rebels", "Allied Democratic Forces"],
    proxyActors: ["Rwanda (M23 support)", "Uganda", "UN MONUSCO"],
    activeDeaths: 120000,
    civilianCasualties: 45000,
    displaced: 7200000,
    summary: "Eastern DRC has been plagued by multiple armed groups for decades. The M23 resurgence, backed by Rwanda, has intensified conflict and caused massive displacement.",
    territory: "North Kivu, South Kivu, Ituri provinces",
    keyEvents: [
      { date: "2022-10-28", event: "M23 captures Kiwanja and Rutshuru" },
      { date: "2025-01-27", event: "M23 captures Goma, DRC's eastern capital" }
    ],
    military: {
      fardc: { activePersonnel: 134000, tanks: 57, aircraft: 35, navy: 8, militaryBudgetUSD: 780000000, nuclearWarheads: 0, gwpIndex: null }
    },
    globalPowerRankings: []
  },
  {
    id: "india-pakistan",
    country: "Pakistan",
    countryCode: "PK",
    coordinates: { lat: 30.3753, lng: 69.3451 },
    conflictType: "interstate war",
    severity: 6.5,
    status: "simmering",
    startDate: "1947-10-22",
    parties: ["Pakistan", "India", "Taliban (TTP)","Balochistan Liberation Army (BLA)"],
    proxyActors: ["China (Pakistan ally)", "USA (India ties)"],
    activeDeaths: 12000,
    civilianCasualties: 3000,
    displaced: 400000,
    summary: "The decades-old Kashmir dispute continues with cross-border skirmishes, TTP attacks inside Pakistan, and ongoing India-Pakistan military standoffs along the Line of Control.",
    territory: "Kashmir, Line of Control, Balochistan",
    keyEvents: [
      { date: "2019-02-26", event: "India airstrikes on Balakot" },
      { date: "2021-02-25", event: "India-Pakistan agree to LoC ceasefire" },
      { date: "2023-11-01", event: "Pakistan launches Operation Azm-e-Istehkam vs TTP" }
    ],
    military: {
      pakistan: { activePersonnel: 654000, tanks: 2627, aircraft: 425, navy: 121, militaryBudgetUSD: 10300000000, nuclearWarheads: 170, gwpIndex: 0.1711 },
      india: { activePersonnel: 1455550, tanks: 4614, aircraft: 2296, navy: 293, militaryBudgetUSD: 81400000000, nuclearWarheads: 172, gwpIndex: 0.1007 }
    },
    globalPowerRankings: [
      { country: "India", rank: 4, score: 0.1007 },
      { country: "Pakistan", rank: 9, score: 0.1711 }
    ]
  },
  {
  id: "iran-israel-2026",
  country: "Iran",
  countryCode: "IR",
  coordinates: { lat: 32.4279, lng: 53.6880 },
  conflictType: "interstate war / regional conflict",
  severity: 9.2,
  status: "active",
  startDate: "2026-02-28",
  parties: ["Iran", "Israel", "United States", "Hezbollah", "Houthi Movement"],
  proxyActors: ["UAE (US base host)", "Qatar (US base host)", "Bahrain (US base host)", "Lebanon (Hezbollah base)"],
  activeDeaths: 40000,
  civilianCasualties: 18000,
  displaced: 2500000,
  summary: "The 2026 Iran war began after coordinated US-Israeli airstrikes on Iranian nuclear facilities, military infrastructure, and leadership. Iran retaliated with ballistic missile and drone attacks on Israeli cities, US military bases across the Gulf, and regional energy infrastructure. Tehran also disrupted and partially closed the Strait of Hormuz, targeting shipping and threatening global oil supply. The conflict has expanded regionally with Hezbollah attacks from Lebanon and threats against Gulf states hosting US forces, raising fears of a wider Middle East war and global energy crisis.",
  territory: "Iran, Israel, Persian Gulf, Strait of Hormuz, Lebanon, Gulf States",
  keyEvents: [
    { date: "2026-02-28", event: "US and Israel launch coordinated strikes on Iranian nuclear and military targets (start of war)" },
    { date: "2026-03-02", event: "Iran launches missile and drone attacks on Israel and US bases in Gulf countries" },
    { date: "2026-03-07", event: "Strikes reported on Iranian infrastructure including Qeshm Island amid escalation" },
    { date: "2026-03-13", event: "US conducts major airstrike on Kharg Island, targeting Iranian military assets" },
    { date: "2026-03-15", event: "Iran deploys mines and disrupts shipping in Strait of Hormuz, reducing global oil flow" },
    { date: "2026-03-19", event: "US begins military campaign to reopen Strait of Hormuz, targeting Iranian naval assets" },
    { date: "2026-03-22", event: "US issues ultimatum to Iran to reopen Hormuz; Iran threatens full closure and wider retaliation" },
    { date: "2026-03-24", event: "Ongoing missile exchanges, energy infrastructure attacks, and global oil supply disruption continue" }
  ],
  military: {
    iran: { activePersonnel: 610000, tanks: 1996, aircraft: 541, navy: 398, militaryBudgetUSD: 25000000000, nuclearWarheads: 0, gwpIndex: 0.2269 },
    israel: { activePersonnel: 169500, tanks: 2200, aircraft: 612, navy: 67, militaryBudgetUSD: 24500000000, nuclearWarheads: 90, gwpIndex: 0.2757 },
    usa: { activePersonnel: 1390000, tanks: 4657, aircraft: 13200, navy: 490, militaryBudgetUSD: 877000000000, nuclearWarheads: 5244, gwpIndex: 0.0712 }
  },
  globalPowerRankings: [
    { country: "United States", rank: 1, score: 0.0712 },
    { country: "Israel", rank: 18, score: 0.2757 },
    { country: "Iran", rank: 14, score: 0.2269 }
  ]
},
{
  id: "delhi-jantar-mantar-2026",
  country: "India",
  countryCode: "IN",
  coordinates: { lat: 28.6236, lng: 77.2090 },

  conflictType: "civil unrest",
  severity: 7.5,
  status: "resolved",
  startDate: "2026-06-06",
  endDate: "2026-07-25",

  parties: [
    "Cockroach Janta Party (CJP)",
    "All India Students' Association (AISA)",
    "All India Students' Federation (AISF)",
    "Students' Federation of India (SFI)",
    "Students and NEET aspirants",
    "Government of India",
    "Delhi Police",
    "Central Reserve Police Force (CRPF)"
  ],

  proxyActors: [
    "Indian National Congress (INC)",
    "Opposition coalition leaders",
    "Civil society organisations",
    "Student organisations",
    "Public figures supporting examination reform"
  ],

  activeDeaths: 0,
  civilianCasualties: 100,
  displaced: 0,

  summary:
    "A youth-led protest movement began at Jantar Mantar, New Delhi, on 6 June 2026, following the NEET-UG paper-leak controversy, related student suicides, alleged CBSE examination irregularities, and longstanding concerns about public examination administration. Led by the Cockroach Janta Party (CJP), the movement demanded Union Education Minister Dharmendra Pradhan's resignation and comprehensive examination reforms. Sit-ins, hunger strikes, nationwide solidarity demonstrations, and the Sansad Chalo march escalated into clashes with police on 20 July. Authorities reported injuries among police personnel, while hospitals and protesters reported injuries among demonstrators. After negotiations, government assurances, and the announcement of examination-related measures, Dharmendra Pradhan resigned on 25 July. CJP subsequently called off the agitation in good faith.",

  keyEvents: [
    {
      date: "2026-05-03",
      event:
        "NEET-UG 2026 examination takes place; subsequent paper-leak allegations trigger a national examination-integrity controversy"
    },
    {
      date: "2026-05-12",
      event:
        "NEET-UG examination is cancelled following allegations of irregularities"
    },
    {
      date: "2026-05-16",
      event:
        "Abhijeet Dipke launches the Cockroach Janta Party as a satirical online platform that develops into a protest movement"
    },
    {
      date: "2026-06-06",
      event:
        "First major CJP gathering at Jantar Mantar demands Education Minister Dharmendra Pradhan's resignation and examination reforms"
    },
    {
      date: "2026-06-07",
      event:
        "CJP begins periodic sit-ins and digital campaigns to build support for accountability in public examinations"
    },
    {
      date: "2026-06-20",
      event:
        "An extended sit-in begins at Jantar Mantar; organisers appeal to NEET aspirants and other affected students to join"
    },
    {
      date: "2026-06-28",
      event:
        "Sonam Wangchuk and student activists associated with AISA begin hunger strikes demanding accountability"
    },
    {
      date: "2026-07-01",
      event:
        "Activists, opposition leaders, civil society representatives, and public figures increasingly express solidarity with protesters"
    },
    {
      date: "2026-07-18",
      event:
        "Sonam Wangchuk is taken to hospital during his hunger strike; the movement gains further political attention"
    },
    {
      date: "2026-07-19",
      event:
        "Large crowds assemble ahead of the planned Sansad Chalo march during Parliament's Monsoon Session"
    },
    {
      date: "2026-07-20",
      event:
        "Sansad Chalo march escalates into clashes; police use baton charges and tear gas, protesters reportedly engage in stone-pelting, and injuries and property damage are reported"
    },
    {
      date: "2026-07-21",
      event:
        "Protesters return to Jantar Mantar after police remove protest infrastructure; opposition leaders protest police action and are detained"
    },
    {
      date: "2026-07-22",
      event:
        "Demonstrations spread to multiple Indian cities; Delhi Metro closes several central stations and additional security forces are deployed"
    },
    {
      date: "2026-07-23",
      event:
        "Prime Minister Narendra Modi announces proposed tough measures against examination paper leaks; negotiations with protest representatives continue"
    },
    {
      date: "2026-07-24",
      event:
        "Sonam Wangchuk ends his hunger strike following government engagement; CJP maintains its demand for Dharmendra Pradhan's resignation"
    },
    {
      date: "2026-07-25",
      event:
        "Dharmendra Pradhan resigns as Education Minister amid the continuing agitation; CJP announces that it is calling off the protest in good faith following talks and assurances"
    },
    {
      date: "2026-08-02",
      event:
        "The President clears the Public Examinations (Prevention of Unfair Means) Amendment Act, 2026, according to the article's cited aftermath reporting"
    }
  ],

  military: {
    governmentForces:
      "Delhi Police / Central Reserve Police Force (CRPF) / Rapid Action Force (RAF)",
    rebelForces:
      "Civilian protesters, students, and protest organisers"
  },

  globalPowerRankings: []
},

{
  id: "delhi-anti-cec-2026",
  country: "India",
  countryCode: "IN",
  coordinates: { lat: 28.6236, lng: 77.2090 },

  conflictType: "civil unrest / electoral dispute",
  severity: 7.5,
  status: "active",
  startDate: "2026-09-24",

  parties: [
    "Cockroach Janta Party (CJP)",
    "All India Students' Association (AISA)",
    "Indian National Congress (INC)",
    "INDIA opposition bloc",
    "Left parties",
    "Bharatiya Janata Party (BJP)",
    "Election Commission of India",
    "Delhi Police"
  ],

  proxyActors: [
    "Student organisations",
    "Civil society groups",
    "Opposition coalition leaders",
    "Journalists and civil liberties advocates"
  ],

  activeDeaths: 0,
  civilianCasualties: null,
  displaced: 0,

  summary:
    "A renewed protest movement emerged in September 2026, led by the Cockroach Janta Party and joined by student organisations and opposition parties. Demonstrators demand Chief Election Commissioner Gyanesh Kumar's resignation and changes to the Special Intensive Revision (SIR) of electoral rolls. Protesters allege that the revision process risks excluding eligible voters and undermining electoral fairness. The Election Commission maintains that the exercise is intended to update electoral rolls and that eligible voters can seek re-enrolment. On 10 October, a major mobilisation in Delhi was met with extensive police restrictions and mass detentions. Opposition parties subsequently marched to the Supreme Court and challenged the electoral-roll revisions and the handling of protests. On 14 October, CJP leaders Ashutosh Ranka and Saurav Das were reported to have been placed in five-day judicial custody. The CEC resignation demand remains unresolved.",

  keyEvents: [
    {
      date: "2026-09-24",
      event:
        "CJP announces a renewed campaign demanding Chief Election Commissioner Gyanesh Kumar's resignation over alleged electoral-roll irregularities"
    },
    {
      date: "2026-10-02",
      event:
        "Student organisations and opposition groups organise demonstrations against the SIR electoral-roll revision process"
    },
    {
      date: "2026-10-03",
      event:
        "CJP and opposition supporters demonstrate in Delhi and Mumbai; hundreds of detentions are reported in Delhi"
    },
    {
      date: "2026-10-04",
      event:
        "Protests intensify across multiple cities, with demonstrators demanding electoral accountability and Kumar's resignation"
    },
    {
      date: "2026-10-10",
      event:
        "Major CJP-led mobilisation in Delhi is blocked by extensive security restrictions; mass detentions, transport disruption and restrictions on public assembly are reported"
    },
    {
      date: "2026-10-11",
      event:
        "CJP founder Abhijeet Dipke and other leaders are released following court proceedings and undertakings concerning public peace; further demonstrations continue"
    },
    {
      date: "2026-10-12",
      event:
        "INDIA opposition bloc leaders march towards the Supreme Court and submit a joint challenge concerning SIR electoral-roll revisions and related issues"
    },
    {
      date: "2026-10-12",
      event:
        "Delhi Police denotifies Jantar Mantar Road as a designated protest site and identifies alternative locations"
    },
    {
      date: "2026-10-13",
      event:
        "CJP leaders attempt to enter the barricaded Jantar Mantar area; police detain party leaders and volunteers"
    },
    {
      date: "2026-10-14",
      event:
        "CJP leaders Ashutosh Ranka and Saurav Das are placed in five-day judicial custody following their detention; opposition leaders criticise the arrests"
    },
    {
      date: "2026-10-14",
      event:
        "CJP founder Abhijeet Dipke announces a further tricolour demonstration at Connaught Place for 16 October"
    }
  ],

  military: {
    governmentForces:
      "Delhi Police / Central Reserve Police Force (CRPF) / other deployed security personnel",
    rebelForces:
      "Civilian protesters, students, CJP supporters and opposition demonstrators"
  },

  globalPowerRankings: []
}
];

export const powerRankingsData = [
  { rank: 1, country: "United States", countryCode: "US", score: 0.0741, activePersonnel: 1328000, tanks: 5500, aircraft: 13300, navy: 920, budget: "886B", nuclearWarheads: 5550 },
  { rank: 2, country: "Russia", countryCode: "RU", score: 0.0791, activePersonnel: 1320000, tanks: 12500, aircraft: 4173, navy: 598, budget: "109B", nuclearWarheads: 5889 },
  { rank: 3, country: "China", countryCode: "CN", score: 0.0919, activePersonnel: 2185000, tanks: 5000, aircraft: 3304, navy: 730, budget: "225B", nuclearWarheads: 500 },
  { rank: 4, country: "India", countryCode: "IN", score: 0.1346, activePersonnel: 1455550, tanks: 4614, aircraft: 2296, navy: 293, budget: "81.4B", nuclearWarheads: 172 },
  { rank: 5, country: "South Korea", countryCode: "KR", score: 0.1642, activePersonnel: 555000, tanks: 2130, aircraft: 1595, navy: 234, budget: "46.4B", nuclearWarheads: 0 },
  { rank: 6, country: "France", countryCode: "FR", score: 0.1798, activePersonnel: 205000, tanks: 222, aircraft: 1055, navy: 180, budget: "55B", nuclearWarheads: 290 },
  { rank: 7, country: "Japan", countryCode: "JP", score: 0.1876, activePersonnel: 247000, tanks: 1004, aircraft: 1449, navy: 155, budget: "49B", nuclearWarheads: 0 },
  { rank: 8, country: "United Kingdom", countryCode: "GB", score: 0.1881, activePersonnel: 194000, tanks: 227, aircraft: 693, navy: 76, budget: "72.8B", nuclearWarheads: 225 },
  { rank: 9, country: "Turkey", countryCode: "TR", score: 0.1975, activePersonnel: 380000, tanks: 2889, aircraft: 1077, navy: 194, budget: "39.4B", nuclearWarheads: 0 },
  { rank: 10, country: "Italy", countryCode: "IT", score: 0.2211, activePersonnel: 165000, tanks: 200, aircraft: 800, navy: 143, budget: "32B", nuclearWarheads: 0 }
];


export const conflictTypeColors = {
  "civil war": "#ff6b35",
  "proxy war": "#a855f7",
  "interstate war": "#ef4444",
  "interstate war / regional conflict": "#ef4444",
  "civil unrest": "#facc15"   // ← ADD THIS
};

export const statusColors = {
  active: "#ef4444",
  ceasefire: "#f59e0b",
  simmering: "#f97316",
  resolved: "#22c55e",
  frozen: "#64748b",       // ← ADD THIS
  escalating: "#dc2626"    // ← ADD THIS
}; 
