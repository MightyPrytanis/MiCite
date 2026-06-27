const RULES = [
  [/\bMich\.\s*App\./g, 'Mich App', 'Michigan reporter abbreviations omit periods.', true],
  [/\bMichApp\b/g, 'Mich App', 'Michigan Court of Appeals reporter is styled Mich App.', true],
  [/\bMich\./g, 'Mich', 'Michigan reporter abbreviations omit periods.', true],
  [/\bN\.W\.\s*2d\b/g, 'NW2d', 'Michigan style uses NW2d, not N.W.2d or NW 2d.', true],
  [/\bN\.W\.\s*3d\b/g, 'NW3d', 'Michigan style uses NW3d, not N.W.3d or NW 3d.', true],
  [/\bN\.W\.\b/g, 'NW', 'Michigan style omits periods in NW.', true],
  [/\bNW\s+2d\b/g, 'NW2d', 'Michigan style keeps NW2d closed up.', true],
  [/\bNW\s+3d\b/g, 'NW3d', 'Michigan style keeps NW3d closed up.', true],
  [/\bU\.S\.C\./g, 'USC', 'Federal code citations omit periods in USC.', true],
  [/\bU\.S\.(?!\s*C)/g, 'US', 'Michigan style omits periods in US reporter citations.', true],
  [/\bS\.\s*Ct\./g, 'S Ct', 'Michigan style omits periods in S Ct.', true],
  [/\bL\.\s*Ed\.\s*2d\b/g, 'L Ed 2d', 'Michigan style omits periods in L Ed 2d.', true],
  [/\bL\.\s*Ed\./g, 'L Ed', 'Michigan style omits periods in L Ed.', true],
  [/\bFed\.\s*Cl\./g, 'Fed Cl', 'Michigan style omits periods in Fed Cl.', true],
  [/\bF\.\s*Appx\b/g, 'F Appx', 'Michigan style omits periods in F Appx.', true],
  [/\bF\.\s*Supp\.\s*3d\b/g, 'F Supp 3d', 'Michigan style omits periods in F Supp 3d.', true],
  [/\bF\.\s*Supp\.\s*2d\b/g, 'F Supp 2d', 'Michigan style omits periods in F Supp 2d.', true],
  [/\bF\.\s*Supp\./g, 'F Supp', 'Michigan style omits periods in F Supp.', true],
  [/\bF\.\s*2d\b/g, 'F2d', 'Michigan style uses F2d, not F.2d or F 2d.', true],
  [/\bF\.\s*3d\b/g, 'F3d', 'Michigan style uses F3d, not F.3d or F 3d.', true],
  [/\bF\.\s*4th\b/g, 'F4th', 'Michigan style uses F4th, not F.4th or F 4th.', true],
  [/\bF\s+2d\b/g, 'F2d', 'Michigan style keeps F2d closed up.', true],
  [/\bF\s+3d\b/g, 'F3d', 'Michigan style keeps F3d closed up.', true],
  [/\bF\s+4th\b/g, 'F4th', 'Michigan style keeps F4th closed up.', true],
  [/\bM\.C\.L\./g, 'MCL', 'Michigan statutes are cited as MCL.', true],
  [/\b(USC)\s+§+\s*/g, '$1 ', 'Michigan style uses USC without a section symbol.', true],
  [/\bM\.C\.R\./g, 'MCR', 'Michigan court rules are cited as MCR.', true],
  [/\bM\.R\.E\./g, 'MRE', 'Michigan Rules of Evidence are cited as MRE.', true],
  [/\bvs\.?\b/gi, 'v', 'Michigan case names use v, not vs.', true],
  [/\bv\./g, 'v', 'Michigan case names use v without a period.', true],
  [/\b(Co|Cos|Corp|Inc|Incorp|Ltd|Mfg|Assocs?|Bros|Bldg|Cas|Ctrs?|Div|Dist|Ed|Equip|Exch|Fed|Fin|Gov’t|Hts|Hwys?|Hosps?|Indep|Indus|Ins|Mgt|Mfr|Mktg|Muni|Mut|Org|Prod|Prof|Props?|Pub|Rd|Schs?|Servs?|Stds?|Sys|Tel|Twp|Univ)\./g, '$1', 'Michigan case-name abbreviations do not use periods.', true],
  [/\bMCLA\b/g, 'MCL', 'Use MCL, not MCLA, for Michigan Compiled Laws.', false],
  [/\bMCLS\b/g, 'MCL', 'Use MCL, not MCLS, for Michigan Compiled Laws.', false],
];

const APPENDIX_5_CASE_NAME_ABBREVIATIONS = [
  [['Administration', 'Administrative'], 'Admin'],
  [['Savings and Loan'], 'S&L'],
  [['And'], '&'],
  [['Assistant'], 'Ass’t'],
  [['Associates'], 'Assoc'],
  [['Association'], 'Ass’n'],
  [['Authority'], 'Auth'],
  [['Automobile', 'Automotive'], 'Auto'],
  [['Board'], 'Bd'],
  [['Brothers'], 'Bros'],
  [['Building'], 'Bldg'],
  [['Casualty'], 'Cas'],
  [['Centers', 'Centres'], 'Ctrs'],
  [['Center', 'Centre'], 'Ctr'],
  [['Chemical'], 'Chem'],
  [['Commission'], 'Comm'],
  [['Commissioners'], 'Comm’rs'],
  [['Commissioner'], 'Comm’r'],
  [['Committee'], 'Comm'],
  [['Companies'], 'Cos'],
  [['Company'], 'Co'],
  [['Condominiums'], 'Condos'],
  [['Condominium'], 'Condo'],
  [['Consolidated'], 'Consol'],
  [['Construction'], 'Constr'],
  [['Cooperative'], 'Coop'],
  [['Corporation'], 'Corp'],
  [['Counties'], 'Cos'],
  [['County'], 'Co'],
  [['Department'], 'Dep’t'],
  [['Development'], 'Dev'],
  [['Director'], 'Dir'],
  [['Distributors', 'Distributing'], 'Distrib'],
  [['Distributor'], 'Distrib'],
  [['District'], 'Dist'],
  [['Division'], 'Div'],
  [['Education', 'Educational'], 'Ed'],
  [['Equipment'], 'Equip'],
  [['Exchange'], 'Exch'],
  [['Federal'], 'Fed'],
  [['Finance', 'Financial', 'Financing'], 'Fin'],
  [['General'], 'Gen'],
  [['Government'], 'Gov’t'],
  [['Heights'], 'Hts'],
  [['Highways'], 'Hwys'],
  [['Highway'], 'Hwy'],
  [['Hospitals'], 'Hosps'],
  [['Hospital'], 'Hosp'],
  [['Incorporated', 'Incorp'], 'Inc'],
  [['Independent'], 'Indep'],
  [['Industries'], 'Indus'],
  [['Industry', 'Industrial'], 'Indus'],
  [['Information'], 'Info'],
  [['Insurance'], 'Ins'],
  [['International'], 'Int’l'],
  [['Limited'], 'Ltd'],
  [['Management'], 'Mgt'],
  [['Manufacturers'], 'Mfr'],
  [['Manufacturer'], 'Mfr'],
  [['Manufacturing'], 'Mfg'],
  [['Marketing'], 'Mktg'],
  [['Mechanical', 'Mechanic'], 'Mech'],
  [['Medical', 'Medicine'], 'Med'],
  [['Memorial'], 'Mem'],
  [['Metropolitan'], 'Metro'],
  [['Michigan'], 'Mich'],
  [['Mortgages', 'Mortgaging'], 'Mtg'],
  [['Mortgage'], 'Mtg'],
  [['Municipal'], 'Muni'],
  [['Mutual'], 'Mut'],
  [['National'], 'Nat’l'],
  [['Number'], 'No'],
  [['Organization'], 'Org'],
  [['Pharmaceutics', 'Pharmaceuticals'], 'Pharm'],
  [['Pharmaceutic', 'Pharmaceutical'], 'Pharm'],
  [['Products', 'Production'], 'Prod'],
  [['Product'], 'Prod'],
  [['Professional'], 'Prof'],
  [['Properties'], 'Props'],
  [['Property'], 'Prop'],
  [['Public'], 'Pub'],
  [['Railroad', 'Railway'], 'R'],
  [['Rehabilitation', 'Rehabilitating'], 'Rehab'],
  [['Road'], 'Rd'],
  [['Schools'], 'Schs'],
  [['School'], 'Sch'],
  [['Services'], 'Servs'],
  [['Service'], 'Serv'],
  [['Standards'], 'Stds'],
  [['Standard'], 'Std'],
  [['Systems'], 'Sys'],
  [['System'], 'Sys'],
  [['Telecommunications'], 'Telecom'],
  [['Telecommunication'], 'Telecom'],
  [['Telephone', 'Telegraph'], 'Tel'],
  [['Township'], 'Twp'],
  [['Transportation', 'Transport', 'Transporting'], 'Transp'],
  [['United States'], 'US'],
  [['University'], 'Univ'],
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

for (const [terms, replacement] of APPENDIX_5_CASE_NAME_ABBREVIATIONS) {
  for (const term of terms) {
    const contextDependent = ['General', 'Michigan', 'United States'].includes(term);
    RULES.splice(RULES.length - 2, 0, [
      new RegExp(`\\b${escapeRegex(term).replace(/\s+/g, '\\s+')}\\b`, 'g'),
      replacement,
      contextDependent
        ? `Appendix 5 abbreviates ${term} as ${replacement} in case names, but this term has a context-dependent exception.`
        : `Appendix 5 abbreviates ${term} as ${replacement} in case names.`,
      !contextDependent,
    ]);
  }
}

const CASE_NAME_PART = String.raw`[A-Za-z0-9][A-Za-z0-9'’&.,\-() ]+?`;
const CASE_CONNECTOR = String.raw`(?:v\.?|vs\.?)`;
const PIN_CITE = String.raw`(?:\d+(?:-\d+)?|\d+\s+n\s+\d+|\d+\s+nn\s+\d+(?:-\d+)?)`;
const MCL_SECTION = String.raw`\d+\.\d+[A-Za-z]?(?:\([A-Za-z0-9]+\))*`;
const CASE_REPORTER = String.raw`(?:Mich\.?\s*App\.?|Mich\.?|N\.W\.\s*2d|N\.W\.\s*3d|N\.W\.|NW\s*2d|NW\s*3d|NW2d|NW3d|NW)`;
const FEDERAL_REPORTER = String.raw`(?:U\.S\.|US|S\.\s*Ct\.|S\s+Ct|L\.\s*Ed\.\s*2d|L\s+Ed\s+2d|L\.\s*Ed\.|L\s+Ed|F\.\s*Appx|F\s+Appx|Fed\.\s*Cl\.?|Fed\s+Cl|F\.\s*Supp\.\s*3d|F\s+Supp\s+3d|F\.\s*Supp\.\s*2d|F\s+Supp\s+2d|F\.\s*Supp\.|F\s+Supp|F\.\s*2d|F\.\s*3d|F\.\s*4th|F\s*2d|F\s*3d|F\s*4th|F2d|F3d|F4th)`;
const NORMALIZED_PARALLEL_REPORTER = String.raw`(?:Mich App|Mich|NW2d|NW3d|NW|US|S Ct|L Ed(?: 2d)?|F Appx|Fed Cl|F Supp(?: [23]d)?|F2d|F3d|F4th|F)`;
const NORMALIZED_REGIONAL_REPORTER = String.raw`(?:NW2d|NW3d|NW)`;
const CASE_REPORTER_SEPARATOR = String.raw`(?:\s*[,;:.\-–—]+\s*|\s+)`;
const PARALLEL_LOOKUP_REPORTERS = new Set([
  'Mich.',
  'Mich. App.',
  'N.W.',
  'N.W.2d',
  'N.W.3d',
  'U.S.',
  'S. Ct.',
  'L. Ed.',
  'L. Ed. 2d',
  'F. Appx',
  'Fed. Cl.',
  'F. Supp.',
  'F. Supp. 2d',
  'F. Supp. 3d',
  'F.2d',
  'F.3d',
  'F.4th',
]);

const PATTERNS = [
  ['michigan_case', new RegExp(String.raw`\b${CASE_NAME_PART}\s+${CASE_CONNECTOR}\s+${CASE_NAME_PART}${CASE_REPORTER_SEPARATOR}\d+\s+${CASE_REPORTER}\s+\d+(?:,\s*${PIN_CITE})?(?:\s*[;,]\s*\d+\s+${CASE_REPORTER}\s+\d+)?\s*\(\d{4}\)(?:\s+${CASE_REPORTER}\s+\d+)?`, 'g')],
  ['michigan_case', new RegExp(String.raw`\b(?:In re|In Re|In the Matter of)\s+${CASE_NAME_PART}(?:\s+\(${CASE_NAME_PART}\s+${CASE_CONNECTOR}\s+${CASE_NAME_PART}\))?${CASE_REPORTER_SEPARATOR}\d+\s+${CASE_REPORTER}\s+\d+(?:,\s*${PIN_CITE})?(?:\s*[;,]\s*\d+\s+${CASE_REPORTER}\s+\d+)?\s*\(\d{4}\)(?:\s+${CASE_REPORTER}\s+\d+)?`, 'g')],
  ['michigan_case', new RegExp(String.raw`\b${CASE_NAME_PART}\s+${CASE_CONNECTOR}\s+${CASE_NAME_PART}${CASE_REPORTER_SEPARATOR}\d+\s+${CASE_REPORTER}\s+\d+(?:,\s*${PIN_CITE})?(?:\s*[;,]\s*\d+\s+${CASE_REPORTER}\s+\d+|\s+${CASE_REPORTER}\s+\d+)?(?:\s*\(\d{4}\))?`, 'g')],
  ['michigan_short_case', new RegExp(String.raw`\b[A-Z][A-Za-z0-9'&.\-\s]+?,\s+\d+\s+${CASE_REPORTER}\s+at\s+\d+(?:-\d+)?`, 'g')],
  ['federal_case', new RegExp(String.raw`\b${CASE_NAME_PART}\s+${CASE_CONNECTOR}\s+${CASE_NAME_PART}${CASE_REPORTER_SEPARATOR}\d+\s+${FEDERAL_REPORTER}\s+\d+(?:,\s*${PIN_CITE})?(?:\s*[,;]\s*\d+\s+${FEDERAL_REPORTER}\s+\d+)*\s*\((?:[^)]*?,?\s*)?\d{4}\)`, 'g')],
  ['federal_case', new RegExp(String.raw`\b${CASE_NAME_PART},\s+\d+\s+${FEDERAL_REPORTER}\s+\d+(?:,\s*${PIN_CITE})?(?:\s*[,;]\s*\d+\s+${FEDERAL_REPORTER}\s+\d+)*\s*\((?:[^)]*?,?\s*)?\d{4}\)`, 'g')],
  ['id', /\b[Ii]d\.\s*(?:at\s+\d+(?:-\d+)?)?/g],
  ['statute', /\b(?:M\.C\.L\.|MCL|MCLA|MCLS)\s+\d+\.\d+[A-Za-z]?(?:\([A-Za-z0-9]+\))*(?=$|[\s.;,)])(?:\s*(?:through|to|-)\s*(?:M\.C\.L\.|MCL|MCLA|MCLS)?\s*\d+\.\d+[A-Za-z]?(?:\([A-Za-z0-9]+\))*)?(?:\s+et\s+seq\.)?/g],
  ['federal_statute', /\b\d+\s+U\.?S\.?C\.?\s+§*\s*\d+[A-Za-z]?(?:\([A-Za-z0-9]+\))*\b(?:\s+et\s+seq\.)?/g],
  ['court_rule', /\b(?:M\.C\.R\.|MCR)\s+\d+\.\d+(?:\([A-Za-z0-9]+\))*\b(?:(?:\s+and\s+|,\s*|\s*)\([A-Za-z0-9]+\))*|(?:M\.C\.R\.|MCR)\s+\d+\.\d+\s+(?:through|to|-)\s*(?:M\.C\.R\.|MCR)?\s*\d+\.\d+/g],
  ['evidence_rule', /\b(?:M\.R\.E\.|MRE)\s+\d+(?:\([A-Za-z0-9]+\))*(?=$|[\s.;,)])/g],
  ['federal_case', new RegExp(String.raw`\b\d+\s+${FEDERAL_REPORTER}\s+\d+(?:\s*;\s*\d+\s+${FEDERAL_REPORTER}\s+\d+)*(?:\s*\(\d{4}\))?`, 'g')],
];

const SOURCE_FORMAT_EXTENSIONS = [
  {
    name: 'Bible',
    pattern: /\b(?:Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|Samuel|Kings|Chronicles|Ezra|Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|Isaiah|Jeremiah|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Romans|Corinthians|Galatians|Ephesians|Philippians|Colossians|Thessalonians|Timothy|Titus|Philemon|Hebrews|James|Peter|Jude|Revelation)\s+\d+:\d+(?:-\d+)?(?:\s*\([A-Za-z0-9 -]+\))?/g,
    example: 'Genesis 1:1 (NRSV).',
    locator: 'book chapter:verse',
    edition: 'Identify the translation or version if wording matters.',
  },
  { name: 'Qur’an', pattern: /\bQur[’']?an\s+\d+:\d+(?:-\d+)?/g, example: 'Qur’an 45:6.', locator: 'sura/chapter:ayah/verse', edition: 'Identify the translation if quoting English wording.' },
  { name: 'Shakespeare', pattern: /\bShakespeare,\s+[A-Z][A-Za-z ]+,\s+act\s+[IVXLC]+,\s+sc\s+\d+(?:,\s+line[s]?\s+\d+(?:-\d+)?)?/g, example: 'Shakespeare, The Tempest, act II, sc 1.', locator: 'act and scene; add line number if needed by analogy', manual: true },
  { name: 'Classic plays', pattern: /\b(?:Sophocles|Euripides|Aeschylus|Aristophanes),\s+[A-Z][A-Za-z ]+\s+\d+(?:-\d+)?/g, example: 'Sophocles, Antigone 441-581.', locator: 'line numbers', edition: 'Identify translator or edition if quoting a translation.' },
  { name: 'The Federalist Papers', pattern: /\bThe Federalist No\.\s+\d+(?:\s+\([A-Za-z]+\))?(?:\s+\([^)]+\))?(?:,\s+p\s+\d+)?/g, example: 'The Federalist No. 81 (Hamilton) (Rossiter ed, 1961), p 482.', locator: 'essay number; author and edition when needed', manual: true },
  { name: 'Anti-Federalist Papers', pattern: /\b(?:Brutus|Cato|Centinel|Federal Farmer)\s+No\.\s+[IVXLC]+/g, example: 'Brutus No. XI.', locator: 'pseudonym/title and essay number', edition: 'Cite collection or editor if needed.' },
  { name: 'Marcus Aurelius, Meditations', pattern: /\bMarcus Aurelius,\s+Meditations\s+\d+\.\d+/g, example: 'Marcus Aurelius, Meditations 2.1.', locator: 'book.section', edition: 'Identify translator if quoting.' },
  { name: 'Gilgamesh', pattern: /\bGilgamesh,\s+tablet\s+\d+,\s+lines?\s+\d+(?:-\d+)?/g, example: 'Gilgamesh, tablet 2, lines 111-114.', locator: 'tablet.line', edition: 'Identify edition or translator if quoting.' },
  { name: 'Beowulf', pattern: /\bBeowulf\s+\d+(?:-\d+)?/g, example: 'Beowulf 86-89.', locator: 'line numbers', edition: 'Identify editor or translator if quoting.' },
  { name: 'Homer', pattern: /\bHomer,\s+(?:Iliad|Odyssey)\s+\d+\.\d+(?:-\d+)?/g, example: 'Homer, Odyssey 11.489-491.', locator: 'book.line', edition: 'Identify translator if quoting.' },
  { name: 'Virgil, Aeneid', pattern: /\bVirgil,\s+Aeneid\s+\d+\.\d+(?:-\d+)?/g, example: 'Virgil, Aeneid 2.49.', locator: 'book.line', edition: 'Identify translator if quoting.' },
  { name: 'Ovid, Metamorphoses', pattern: /\bOvid,\s+Metamorphoses\s+\d+\.\d+(?:-\d+)?/g, example: 'Ovid, Metamorphoses 1.452-567.', locator: 'book.line', edition: 'Identify translator if quoting.' },
  { name: 'Dante', pattern: /\bDante,\s+(?:Inferno|Purgatorio|Paradiso)\s+\d+\.\d+(?:-\d+)?/g, example: 'Dante, Inferno 3.1-9.', locator: 'canticle.canto.line', edition: 'Identify translator if quoting.' },
  { name: 'Milton, Paradise Lost', pattern: /\bMilton,\s+Paradise Lost\s+\d+\.\d+(?:-\d+)?/g, example: 'Milton, Paradise Lost 1.1-26.', locator: 'book.line', edition: 'Identify edition if quoting a particular text.' },
  { name: 'Chaucer, Canterbury Tales', pattern: /\bChaucer,\s+Canterbury Tales\s+[IVXLC]+\([A-Z]\)\.\d+(?:-\d+)?/g, example: 'Chaucer, Canterbury Tales I(A).1-18.', locator: 'fragment/group.line', edition: 'Identify edition if using scholarly lineation.' },
  { name: 'Plato', pattern: /\bPlato,\s+(?:The Republic|Republic|Phaedrus|Apology|Crito|Gorgias|Laws|Symposium)\s+\d+[a-e](?:-\d+[a-e])?/g, example: 'Plato, The Republic 514a-517a.', locator: 'Stephanus pagination', edition: 'Identify translator if quoting.' },
  { name: 'Aristotle', pattern: /\bAristotle,\s+(?:Nicomachean Ethics|Politics)\s+(?:\d+\.\d+,\s+)?\d{4}[ab]\d+(?:-\d+)?/g, example: 'Aristotle, Nicomachean Ethics 1.7, 1098a16.', locator: 'book.chapter and/or Bekker number', edition: 'Identify translator if quoting.' },
  { name: 'Kant, Critique of Pure Reason', pattern: /\bKant,\s+Critique of Pure Reason\s+A\d+\/B\d+/g, example: 'Kant, Critique of Pure Reason A51/B75.', locator: 'A/B pagination', edition: 'Identify translator or edition if quoting.' },
  { name: 'Augustine', pattern: /\bAugustine,\s+(?:Confessions|City of God)\s+\d+\.\d+(?:\.\d+)?/g, example: 'Augustine, Confessions 1.1.1.', locator: 'book.chapter.section or book.chapter', edition: 'Identify translator if quoting.' },
  { name: 'Aquinas, Summa Theologiae', pattern: /\bAquinas,\s+Summa Theologiae\s+[IVX-]+,\s+q\s+\d+,\s+art\s+\d+/g, example: 'Aquinas, Summa Theologiae I-II, q 96, art 4.', locator: 'part, question, article, objection/reply', edition: 'Identify translation if quoting.' },
  { name: 'Mishnah', pattern: /\bMishnah,\s+[A-Z][A-Za-z]+\s+\d+:\d+/g, example: 'Mishnah, Avot 2:5.', locator: 'tractate chapter:mishnah', edition: 'Identify translation or edition if quoting.' },
  { name: 'Babylonian Talmud', pattern: /\bBabylonian Talmud,\s+[A-Z][A-Za-z]+\s+\d+[ab]/g, example: 'Babylonian Talmud, Kiddushin 29b.', locator: 'tractate folio side', edition: 'Identify edition or translation if quoting.' },
  { name: 'Bhagavad Gita', pattern: /\bBhagavad Gita\s+\d+\.\d+/g, example: 'Bhagavad Gita 2.47.', locator: 'chapter.verse', edition: 'Identify translator if quoting.' },
  { name: 'Mahābhārata', pattern: /\bMah[āa]bh[āa]rata\s+\d+\.\d+\.\d+/g, example: 'Mahābhārata 6.23.1.', locator: 'book.chapter.verse', edition: 'Identify edition or translation because numbering can vary.' },
  { name: 'Rāmāyaṇa', pattern: /\bR[āa]m[āa]ya[ṇn]a\s+\d+\.\d+\.\d+/g, example: 'Rāmāyaṇa 2.31.4.', locator: 'kāṇḍa/book.sarga.verse', edition: 'Identify edition or translation because numbering can vary.' },
  { name: 'Confucius, Analects', pattern: /\bConfucius,\s+Analects\s+\d+\.\d+/g, example: 'Confucius, Analects 2.4.', locator: 'book.passage', edition: 'Identify translator if quoting.' },
  { name: 'Laozi, Dao De Jing', pattern: /\bLaozi,\s+(?:Dao De Jing|Tao Te Ching)\s+ch\s+\d+/g, example: 'Laozi, Dao De Jing ch 1.', locator: 'chapter', edition: 'Identify translator if quoting.' },
  { name: 'Pali Canon / Buddhist suttas', pattern: /\b(?:Digha Nikaya|Majjhima Nikaya)\s+\d+/g, example: 'Digha Nikaya 2.', locator: 'collection and sutta number; sometimes PTS page', edition: 'Identify translation or edition if quoting.' },
  { name: 'Dhammapada', pattern: /\bDhammapada\s+(?:\d+\.\d+|v\s+\d+)/g, example: 'Dhammapada 1.1.', locator: 'chapter.verse or verse number', edition: 'Identify translator if quoting.' },
  { name: 'Sun Tzu, The Art of War', pattern: /\bSun Tzu,\s+The Art of War\s+ch\s+\d+/g, example: 'Sun Tzu, The Art of War ch 1.', locator: 'chapter; sometimes paragraph/section', edition: 'Identify translator or edition because paragraph numbering varies.' },
  { name: 'Machiavelli', pattern: /\bMachiavelli,\s+(?:The Prince\s+ch\s+\d+|Discourses on Livy\s+\d+\.\d+)/g, example: 'Machiavelli, The Prince ch 18.', locator: 'chapter or book.chapter', edition: 'Identify translator if quoting.' },
  { name: 'Hobbes, Leviathan', pattern: /\bHobbes,\s+Leviathan\s+ch\s+\d+/g, example: 'Hobbes, Leviathan ch 13.', locator: 'chapter; sometimes paragraph', edition: 'Identify edition if paragraph numbering matters.' },
  { name: 'Locke, Second Treatise of Government', pattern: /\bLocke,\s+Second Treatise of Government\s+§\s*\d+/g, example: 'Locke, Second Treatise of Government § 95.', locator: 'section number', edition: 'Identify edition if quoting.' },
  { name: 'Montesquieu, The Spirit of the Laws', pattern: /\bMontesquieu,\s+The Spirit of the Laws\s+bk\s+[IVXLC]+,\s+ch\s+\d+/g, example: 'Montesquieu, The Spirit of the Laws bk XI, ch 6.', locator: 'book.chapter', edition: 'Identify translator if quoting.' },
  { name: 'Rousseau, The Social Contract', pattern: /\bRousseau,\s+The Social Contract\s+bk\s+[IVXLC]+,\s+ch\s+\d+/g, example: 'Rousseau, The Social Contract bk I, ch 6.', locator: 'book.chapter', edition: 'Identify translator if quoting.' },
  { name: 'Mill, On Liberty', pattern: /\bMill,\s+On Liberty\s+ch\s+\d+/g, example: 'Mill, On Liberty ch 2.', locator: 'chapter; sometimes paragraph/page', edition: 'Identify edition if quoting.' },
  { name: 'Tocqueville, Democracy in America', pattern: /\bTocqueville,\s+Democracy in America\s+vol\s+\d+,\s+pt\s+\d+,\s+ch\s+\d+/g, example: 'Tocqueville, Democracy in America vol 1, pt 2, ch 8.', locator: 'volume/part/chapter', edition: 'Identify translator or edition because editions vary.' },
  { name: 'Blackstone, Commentaries', pattern: /\bBlackstone,\s+Commentaries(?: on the Laws of England)?\s+\d+\s*\*\d+/g, example: 'Follow Michigan Manual format for Blackstone star-page citations.', locator: 'volume and star page', manual: true },
  { name: 'Coke, Institutes', pattern: /\bCoke,\s+Institutes\s+\d+\s+[A-Za-z0-9]+/g, example: 'Follow Michigan Manual format for Coke.', locator: 'volume/work/page or folio side', manual: true },
  { name: 'Justinian, Institutes', pattern: /\bJustinian,\s+Institutes\s+\d+\.\d+\.\d+/g, example: 'Follow Michigan Manual format for Justinian.', locator: 'book/title/section', edition: 'Identify translation if quoting.', manual: true },
];

const input = document.querySelector('#input');
const corrected = document.querySelector('#corrected');
const formatted = document.querySelector('#formatted');
const results = document.querySelector('#results');
const apply = document.querySelector('#apply');
const download = document.querySelector('#download');
const copyText = document.querySelector('#copy-text');
const copyHtml = document.querySelector('#copy-html');
const copyTable = document.querySelector('#copy-table');
const includeParallels = document.querySelector('#include-parallels');
const parallelSwitchLabel = document.querySelector('.switch-label');
const parallelStatus = document.querySelector('#parallel-status');
const tableMode = document.querySelector('#table-mode');
const generatedTable = document.querySelector('#generated-table');
let latestReport = null;

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function lineInfo(text, index) {
  const before = text.slice(0, index);
  const lines = before.split(/\r\n|\r|\n/);
  return { line: lines.length, offset: lines[lines.length - 1].length + 1 };
}

function pageForIndex(text, index) {
  return text.slice(0, index).split('\f').length;
}

function trimCitationMatch(start, value) {
  const leading = value.match(/^\s*/)?.[0].length || 0;
  let text = value.trim();
  const adjustedStart = start + leading;
  while (/[;:,]$/.test(text)) text = text.slice(0, -1);
  return { text, start: adjustedStart, end: adjustedStart + text.length };
}

function trimNarrativeCasePrefix(type, candidate) {
  if (type !== 'michigan_case' && type !== 'federal_case') return candidate;
  if (/^(?:In re|In Re|In the Matter of)\b/.test(candidate.text)) return candidate;

  const vIndex = candidate.text.search(new RegExp(String.raw`\s+${CASE_CONNECTOR}\s+`));
  if (vIndex < 0) return candidate;

  const leftSide = candidate.text.slice(0, vIndex);
  const narrativeMatch = leftSide.match(/^.*\bin\s+([A-Z0-9&][A-Za-z0-9'’&.\-() ]*)$/);
  if (!narrativeMatch?.[1]) return candidate;

  const prefixLength = candidate.text.indexOf(narrativeMatch[1]);
  const text = candidate.text.slice(prefixLength);
  return { text, start: candidate.start + prefixLength, end: candidate.start + prefixLength + text.length };
}

function applyRules(text) {
  let correctedText = text;
  const issues = [];

  for (const [pattern, replacement, message, safeToAutoCorrect] of RULES) {
    pattern.lastIndex = 0;
    if (!pattern.test(correctedText)) continue;
    pattern.lastIndex = 0;
    const suggestedCorrection = correctedText.replace(pattern, replacement);
    const advisoryOnly = !safeToAutoCorrect && message.includes('context-dependent exception');
    issues.push({
      rule: 'Michigan Appellate Opinion Manual',
      message,
      suggestedCorrection: advisoryOnly ? undefined : suggestedCorrection,
      safeToAutoCorrect,
    });
    if (safeToAutoCorrect) correctedText = suggestedCorrection;
  }

  const parallelPattern = new RegExp(String.raw`(\d+\s+${NORMALIZED_PARALLEL_REPORTER}\s+\d+),\s+(?=\d+\s+${NORMALIZED_PARALLEL_REPORTER}\s+\d+)`, 'g');
  if (parallelPattern.test(correctedText)) {
    parallelPattern.lastIndex = 0;
    const suggestedCorrection = correctedText.replace(parallelPattern, '$1; ');
    issues.push({
      rule: 'Michigan Appellate Opinion Manual 1:9.1-1:9.2',
      message: 'Parallel citations in Michigan style are separated by semicolons.',
      suggestedCorrection,
      safeToAutoCorrect: true,
    });
    correctedText = suggestedCorrection;
  }

  const duplicatedParallelVolumePattern = new RegExp(String.raw`(\d+\s+(?:Mich App|Mich)\s+\d+),\s*(\d+)\s*;\s*\2\s+(${NORMALIZED_REGIONAL_REPORTER})\s+(\d+)`, 'g');
  if (duplicatedParallelVolumePattern.test(correctedText)) {
    duplicatedParallelVolumePattern.lastIndex = 0;
    const suggestedCorrection = correctedText.replace(duplicatedParallelVolumePattern, '$1; $2 $3 $4');
    issues.push({
      rule: 'Michigan Appellate Opinion Manual 1:9.1-1:9.2',
      message: 'Parallel citation volume numbers should not be duplicated as a pin cite before the semicolon.',
      suggestedCorrection,
      safeToAutoCorrect: true,
    });
    correctedText = suggestedCorrection;
  }

  const duplicatedTrailingReporterPattern = new RegExp(String.raw`(\b\d+\s+(${NORMALIZED_REGIONAL_REPORTER})\s+(\d+)\s*\(\d{4}\))\s+\2\s+\3\b`, 'g');
  if (duplicatedTrailingReporterPattern.test(correctedText)) {
    duplicatedTrailingReporterPattern.lastIndex = 0;
    const suggestedCorrection = correctedText.replace(duplicatedTrailingReporterPattern, '$1');
    issues.push({
      rule: 'Michigan Appellate Opinion Manual 1:9.1-1:9.2',
      message: 'A duplicate reporter/page fragment after the year parenthetical should be removed.',
      suggestedCorrection,
      safeToAutoCorrect: true,
    });
    correctedText = suggestedCorrection;
  }

  const caseNameWithoutReporter = String.raw`(?:(?!\d+\s+(?:${CASE_REPORTER}|${FEDERAL_REPORTER})\s+\d+)[A-Za-z0-9'’&.,\-() ])+?`;
  const noisyCaseReporterSeparatorPattern = new RegExp(String.raw`(\b${caseNameWithoutReporter}\s+${CASE_CONNECTOR}\s+${caseNameWithoutReporter})\s*(?:,{2,}|[,;:.\-–—]*[;:.\-–—]+[,;:.\-–—]*)\s*(?=\d+\s+(?:${CASE_REPORTER}|${FEDERAL_REPORTER})\s+\d+)`, 'g');
  if (noisyCaseReporterSeparatorPattern.test(correctedText)) {
    noisyCaseReporterSeparatorPattern.lastIndex = 0;
    const suggestedCorrection = correctedText.replace(noisyCaseReporterSeparatorPattern, (_match, caseName) => `${caseName.replace(/[,\s;:.\-–—]+$/, '')}, `);
    issues.push({
      rule: 'Michigan Appellate Opinion Manual 1:8',
      message: 'Full case citations use one comma between the case name and reporter citation; stray separator punctuation is disregarded.',
      suggestedCorrection,
      safeToAutoCorrect: true,
    });
    correctedText = suggestedCorrection;
  }

  const missingCaseNameCommaPattern = new RegExp(String.raw`(\b${CASE_NAME_PART}\s+${CASE_CONNECTOR}\s+${CASE_NAME_PART})(?<!,)\s+(?=\d+\s+(?:${CASE_REPORTER}|${FEDERAL_REPORTER})\s+\d+)`, 'g');
  if (missingCaseNameCommaPattern.test(correctedText)) {
    missingCaseNameCommaPattern.lastIndex = 0;
    const suggestedCorrection = correctedText.replace(missingCaseNameCommaPattern, '$1, ');
    issues.push({
      rule: 'Michigan Appellate Opinion Manual 1:8',
      message: 'Full case citations use a comma between the case name and reporter citation.',
      suggestedCorrection,
      safeToAutoCorrect: true,
    });
    correctedText = suggestedCorrection;
  }

  return { corrected: correctedText, issues };
}

function applyCaseAwareRules(text, type) {
  const casing = normalizeDetectedCaseNameCasing(text, type);
  const ruleResult = applyRules(casing.corrected);
  return {
    corrected: ruleResult.corrected,
    issues: [...casing.issues, ...ruleResult.issues],
  };
}

function titleCaseLikelyCaseNameWord(word) {
  if (/^(?:v|vs|of|and|the|for|in|on|at|by)$/i.test(word)) return word.toLowerCase();
  if (/^(?:LLC|PLLC|PC|PLC|NAACP|AFL|CIO|USA|US)$/.test(word)) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function normalizeDetectedCaseNameCasing(text, type) {
  if (type !== 'michigan_case' && type !== 'federal_case') return { corrected: text, issues: [] };
  const reporterMatch = text.match(new RegExp(String.raw`\s+\d+\s+(?:${CASE_REPORTER}|${FEDERAL_REPORTER})\s+\d+`));
  if (!reporterMatch?.index) return { corrected: text, issues: [] };

  const prefix = text.slice(0, reporterMatch.index);
  const normalizedPrefix = prefix.replace(/\b[A-Za-z][A-Za-z'’]*\b/g, titleCaseLikelyCaseNameWord);
  if (normalizedPrefix === prefix) return { corrected: text, issues: [] };

  return {
    corrected: normalizedPrefix + text.slice(reporterMatch.index),
    issues: [{
      rule: 'MiCite conservative case-name cleanup',
      message: 'Case-name capitalization appears inconsistent; MiCite normalized obvious mixed-case words in the detected citation.',
      suggestedCorrection: normalizedPrefix + text.slice(reporterMatch.index),
      safeToAutoCorrect: true,
    }],
  };
}

function removeParallelCitations(citation) {
  const commaIndex = citation.indexOf(',');
  if (commaIndex < 0) return citation;

  const caseName = citation.slice(0, commaIndex + 1);
  const body = citation.slice(commaIndex + 1).trim();
  const yearMatch = body.match(/\s*\(\d{4}\)\s*$/);
  const year = yearMatch ? yearMatch[0] : '';
  const bodyWithoutYear = year ? body.slice(0, -year.length).trim() : body;
  const firstCitation = bodyWithoutYear.split(/\s*;\s*/)[0].trim();
  return `${caseName} ${firstCitation}${year}`;
}

function displayCorrectionFor(finding, options = {}) {
  if (options.includeParallelCitations !== false && finding.parallelSuggestion) {
    return finding.parallelSuggestion;
  }
  const correctedCitation = applyCaseAwareRules(finding.originalText, finding.citationType).corrected;
  if (hasAmbiguousReporterSequence(correctedCitation) && !finding.parallelSuggestion) {
    return finding.originalText.trim();
  }
  if (options.includeParallelCitations === false && ['michigan_case', 'federal_case'].includes(finding.citationType)) {
    return removeParallelCitations(correctedCitation);
  }
  return correctedCitation;
}

function caseNameBoundary(citation) {
  const boundary = citation.match(new RegExp(String.raw`,\s+\d+\s+(?:${CASE_REPORTER}|${FEDERAL_REPORTER})\s+\d+`));
  return boundary?.index ?? citation.indexOf(',');
}

function hasAmbiguousReporterSequence(citation) {
  return new RegExp(String.raw`\b\d+\s+(?:Mich App|Mich|US)\s+\d+\s+(?:NW2d|NW3d|NW|S Ct|L Ed(?: 2d)?)\s+\d+\b`).test(citation);
}

function ambiguousRegionalCitationParts(finding, citation = displayCorrectionFor(finding, { includeParallelCitations: false })) {
  if (!['michigan_case', 'federal_case'].includes(finding.citationType)) return null;
  const match = citation.match(/\b\d+\s+(Mich App|Mich|US)\s+(\d+)\s+(NW2d|NW3d|NW|S Ct|L Ed(?: 2d)?)\s+(\d+)\b/);
  if (!match) return null;
  const regionalReporter = courtListenerReporter(match[3]);
  return {
    id: `${finding.start}-${finding.end}`,
    volume: match[2],
    reporter: regionalReporter,
    page: match[4],
  };
}

function advisoryIssues(original, type, current) {
  const issues = [];
  const isCase = type === 'michigan_case' || type === 'michigan_short_case' || type === 'federal_case';

  if (isCase && new RegExp(String.raw`\b[A-Za-z0-9][A-Za-z0-9'’&.\-()\s]+?\s+${CASE_CONNECTOR}\s+[A-Za-z0-9]`).test(original)) {
    issues.push({
      rule: 'Michigan Appellate Opinion Manual 1:7',
      message: 'Case names should be italicized in formatted documents.',
      safeToAutoCorrect: false,
    });
  }

  if (
    (type === 'michigan_case' || type === 'federal_case') &&
    new RegExp(String.raw`\b[A-Za-z0-9][A-Za-z0-9'’&.\-()\s]+?\s+${CASE_CONNECTOR}\s+[A-Za-z0-9]`).test(original) &&
    !/\(\d{4}\)\s*$/.test(current)
  ) {
    issues.push({
      rule: 'Michigan Appellate Opinion Manual 1:8',
      message: 'Full case citations should include a year parenthetical.',
      safeToAutoCorrect: false,
    });
  }

  if ((type === 'michigan_case' || type === 'federal_case') && /\bvs\.?\b/i.test(original)) {
    issues.push({
      rule: 'MiCite citation review',
      message: 'Review the case name and caption; MiCite can normalize citation format but does not verify the authority or party names.',
      safeToAutoCorrect: false,
    });
  }

  if ((type === 'michigan_case' || type === 'federal_case') && hasAmbiguousReporterSequence(current)) {
    issues.push({
      rule: 'MiCite citation review',
      message: 'Reporter sequence appears malformed; MiCite cannot safely correct it without a successful citation lookup. Double-check the actual case, official reporter page, parallel reporter citation, and year before relying on the citation.',
      safeToAutoCorrect: false,
      verificationProblem: true,
    });
  }

  if (
    isCase &&
    /\bMichigan\s+(?:Department|Dep’t|Dept|Secretary|Commission|Comm|Board|Bd|Employment Security|Employment Sec|Agency|Office|Bureau|Treasury|State Police|Civil Rights|Public Service|Workers'? Compensation)\b/.test(original)
  ) {
    issues.push({
      rule: 'Michigan Appellate Opinion Manual 1:7.1, 1:7.3',
      message: 'Practice note: Although not specified by the manual, opinions and official reports often omit "Michigan" in agency names. Under §§ 1:7.1 and 1:7.3, a shortened case name may be used if it remains recognizable.',
      safeToAutoCorrect: false,
    });
  }

  const hyphenRangePattern = new RegExp(String.raw`\b(?:MCL|M\.C\.L\.|MCLA|MCLS)\s+${MCL_SECTION}\s*-\s*(?:MCL|M\.C\.L\.|MCLA|MCLS)?\s*${MCL_SECTION}`);
  if (type === 'statute' && hyphenRangePattern.test(original)) {
    issues.push({
      rule: 'Michigan Appellate Opinion Manual 1:21',
      message: 'Use through or to for inclusive statutory ranges; do not use a hyphen.',
      suggestedCorrection: current.replace(/\s+-\s+/, ' through '),
      safeToAutoCorrect: false,
    });
  }

  const missingRepeatedMclPattern = new RegExp(String.raw`\bMCL\s+${MCL_SECTION}\s+(?:through|to)\s+${MCL_SECTION}`);
  if (type === 'statute' && missingRepeatedMclPattern.test(current)) {
    issues.push({
      rule: 'Michigan Appellate Opinion Manual 1:21',
      message: 'Repeat MCL in statutory ranges.',
      suggestedCorrection: current.replace(new RegExp(String.raw`\b(MCL\s+${MCL_SECTION}\s+(?:through|to)\s+)(${MCL_SECTION})`), '$1MCL $2'),
      safeToAutoCorrect: false,
    });
  }

  return issues;
}

function sourceExtensionIssue(rule) {
  const base = rule.manual
    ? `Michigan Manual format: follow the Michigan Appellate Opinion Manual's specific form for ${rule.name}.`
    : `Unofficial extension, not a Michigan Manual rule: suggested practical form for ${rule.name}.`;
  const details = [`${base} Locator convention: ${rule.locator}.`];
  if (rule.edition) details.push(rule.edition);
  return {
    rule: rule.manual ? 'Michigan Appellate Opinion Manual source format' : 'MiCite curated unofficial source-format extension',
    message: details.join(' '),
    safeToAutoCorrect: false,
  };
}

function extractSourceFormatExtensions(text) {
  const findings = [];

  for (const rule of SOURCE_FORMAT_EXTENSIONS) {
    rule.pattern.lastIndex = 0;
    let match;
    while ((match = rule.pattern.exec(text)) !== null) {
      const trimmed = trimCitationMatch(match.index, match[0]);
      const location = lineInfo(text, trimmed.start);
      const page = pageForIndex(text, trimmed.start);
      const issue = sourceExtensionIssue(rule);
      findings.push({
        originalText: trimmed.text,
        citationType: 'source_format',
        start: trimmed.start,
        end: trimmed.end,
        line: location.line,
        offset: location.offset,
        page,
        appearsCompliant: true,
        status: 'Note',
        ruleViolatedOrWarning: issue.message,
        suggestedCorrection: rule.example,
        confidence: .72,
        issues: [issue],
      });
    }
  }

  return findings;
}

function extractCitations(text) {
  const candidates = [...extractSourceFormatExtensions(text)];

  for (const [type, pattern] of PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const trimmed = trimNarrativeCasePrefix(type, trimCitationMatch(match.index, match[0]));
      const location = lineInfo(text, trimmed.start);
      const page = pageForIndex(text, trimmed.start);
      const ruleResult = applyCaseAwareRules(trimmed.text, type);
      const corrected = ruleResult.corrected;
      const issues = [
        ...ruleResult.issues,
        ...advisoryIssues(trimmed.text, type, corrected),
      ];
      const issueSummary = [...new Set(issues.map((issue) => issue.message))].join(' ');
      const nonCompliantIssues = issues.filter((issue) => issue.suggestedCorrection || issue.verificationProblem);
      const hasUnresolvedMalformedReporter = hasAmbiguousReporterSequence(corrected);

      candidates.push({
        originalText: trimmed.text,
        citationType: type,
        start: trimmed.start,
        end: trimmed.end,
        line: location.line,
        offset: location.offset,
        page,
        appearsCompliant: nonCompliantIssues.length === 0,
        status: nonCompliantIssues.length > 0 ? 'Review' : issues.length > 0 ? 'Note' : 'Compliant',
        ruleViolatedOrWarning: issueSummary || undefined,
        suggestedCorrection: hasUnresolvedMalformedReporter
          ? undefined
          : corrected !== trimmed.text ? corrected : issues.find((issue) => issue.suggestedCorrection)?.suggestedCorrection,
        confidence: issues.length === 0 ? 1 : nonCompliantIssues.every((issue) => issue.safeToAutoCorrect) ? .95 : .82,
        issues,
      });
    }
  }

  return candidates
    .sort((a, b) => a.start - b.start || b.end - a.end)
    .filter((finding, index, sorted) => !sorted.slice(0, index).some((prior) => finding.start >= prior.start && finding.end <= prior.end));
}

function formattedCitationHtml(finding, options = {}) {
  const correctedCitation = displayCorrectionFor(finding, options);
  if (['michigan_case', 'michigan_short_case', 'federal_case'].includes(finding.citationType)) {
    const commaIndex = caseNameBoundary(correctedCitation);
    if (commaIndex > 0) {
      return `<em>${escapeHtml(correctedCitation.slice(0, commaIndex))}</em>${escapeHtml(correctedCitation.slice(commaIndex))}`;
    }
  }
  return escapeHtml(correctedCitation);
}

function formattedHtmlFor(text, findings, options = {}) {
  let cursor = 0;
  let html = '';
  for (const finding of findings) {
    html += escapeHtml(text.slice(cursor, finding.start));
    html += formattedCitationHtml(finding, options);
    cursor = finding.end;
  }
  html += escapeHtml(text.slice(cursor));
  return html;
}

function checkText(text, applySafeCorrections = false, options = {}) {
  const findings = extractCitations(text);
  let correctedText = '';
  let appliedCorrections = 0;

  const replacements = findings
    .map((finding) => ({ start: finding.start, end: finding.end, replacement: displayCorrectionFor(finding, options), finding }))
    .filter((replacement) => replacement.replacement !== text.slice(replacement.start, replacement.end))
    .sort((a, b) => b.start - a.start);

  const previewText = findings.length && replacements.length
    ? replacements.reduce((current, replacement) => current.slice(0, replacement.start) + replacement.replacement + current.slice(replacement.end), text)
    : '';

  if (applySafeCorrections && findings.length) {
    correctedText = previewText;
    appliedCorrections = replacements.length;
  } else {
    correctedText = previewText;
  }
  if (findings.length === 1 && text.trim() === findings[0].originalText && correctedText.trim()) {
    correctedText = correctedText.trim();
  }

  return {
    manual: {
      name: 'Michigan Appellate Opinion Manual',
      source: 'https://www.courts.michigan.gov/4a4a11/siteassets/publications/manuals/msc/miappopmanual.pdf',
    },
    totalCitations: findings.length,
    compliant: findings.filter((finding) => finding.appearsCompliant).length,
    noncompliant: findings.filter((finding) => !finding.appearsCompliant).length,
    warnings: findings.reduce((count, finding) => count + finding.issues.filter((issue) => !issue.safeToAutoCorrect).length, 0),
    findings,
    sourceText: text,
    correctedText,
    formattedHtml: formattedHtmlFor(text, findings, options),
    tables: buildTables(findings, options),
    appliedCorrections,
  };
}

function hasParallelCitation(citation) {
  const body = citation.slice(citation.indexOf(',') + 1);
  return /\s;\s*\d+\s+[A-Za-z]/.test(body);
}

function primaryCitationParts(finding) {
  if (!['michigan_case', 'federal_case'].includes(finding.citationType)) return null;
  const citation = applyCaseAwareRules(finding.originalText, finding.citationType).corrected;
  if (hasAmbiguousReporterSequence(citation)) return ambiguousRegionalCitationParts(finding, citation);
  const match = citation.match(/\b(\d+)\s+(Mich App|Mich|US|S Ct|L Ed(?: 2d)?|NW2d|NW3d|F Appx|Fed Cl|F Supp(?: [23]d)?|F2d|F3d|F4th)\s+(\d+)\b/);
  if (!match) return null;
  return {
    id: `${finding.start}-${finding.end}`,
    volume: match[1],
    reporter: courtListenerReporter(match[2]),
    page: match[3],
  };
}

function courtListenerReporter(reporter) {
  return {
    'Mich App': 'Mich. App.',
    Mich: 'Mich.',
    US: 'U.S.',
    'S Ct': 'S. Ct.',
    'L Ed': 'L. Ed.',
    'L Ed 2d': 'L. Ed. 2d',
    NW2d: 'N.W.2d',
    NW3d: 'N.W.3d',
    'F Appx': 'F. Appx',
    'Fed Cl': 'Fed. Cl.',
    'F Supp': 'F. Supp.',
    'F Supp 2d': 'F. Supp. 2d',
    'F Supp 3d': 'F. Supp. 3d',
    F2d: 'F.2d',
    F3d: 'F.3d',
    F4th: 'F.4th',
  }[reporter] || reporter;
}

function caseNameForFinding(finding) {
  const correctedCitation = displayCorrectionFor(finding, { includeParallelCitations: false });
  const commaIndex = caseNameBoundary(correctedCitation);
  if (commaIndex < 0) return '';
  return correctedCitation.slice(0, commaIndex).trim();
}

function caseNameFromNormalizedCitation(citation) {
  const commaIndex = caseNameBoundary(citation);
  if (commaIndex < 0) return '';
  return citation.slice(0, commaIndex).trim();
}

function normalizeCaseNameForCompare(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\bversus\b/g, ' v ')
    .replace(/\bv\.\b/g, ' v ')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(the|inc|corp|co|company|ins|insurance|mfg|manufacturing|of|and)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function caseNamesLikelyMatch(localName, returnedNames = []) {
  const local = normalizeCaseNameForCompare(localName);
  if (!local || !returnedNames.length) return true;
  return returnedNames.some((name) => {
    const remote = normalizeCaseNameForCompare(name);
    if (!remote) return false;
    return remote.includes(local) || local.includes(remote);
  });
}

function parallelLookupRequests(report) {
  return report.findings
    .filter((finding) => ['michigan_case', 'federal_case'].includes(finding.citationType))
    .filter((finding) => !hasParallelCitation(displayCorrectionFor(finding, { includeParallelCitations: true })))
    .map(primaryCitationParts)
    .filter(Boolean);
}

function isParallelLookupCitation(citation) {
  if (!citation || typeof citation !== 'object' || Array.isArray(citation)) return false;
  const keys = Object.keys(citation);
  if (keys.length !== 4 || !keys.every((key) => ['id', 'volume', 'reporter', 'page'].includes(key))) return false;
  return /^[A-Za-z0-9_-]{1,80}$/.test(citation.id)
    && /^\d{1,5}$/.test(citation.volume)
    && PARALLEL_LOOKUP_REPORTERS.has(citation.reporter)
    && /^\d{1,6}[A-Za-z]?$/.test(citation.page);
}

function addParallelCitation(citation, parallelCitation) {
  if (!parallelCitation || hasParallelCitation(citation)) return citation;
  const yearMatch = citation.match(/\s*\(\d{4}\)\s*$/);
  if (!yearMatch) return `${citation}; ${parallelCitation}`;
  const year = yearMatch[0];
  return `${citation.slice(0, -year.length)}; ${parallelCitation}${year}`;
}

function addYearParenthetical(citation, year) {
  if (!year || /\(\d{4}\)\s*$/.test(citation)) return citation;
  return `${citation} (${year})`;
}

function repairAmbiguousReporterSequence(finding, baseCitation, returnedParallelCitation, year) {
  const normalizedCitation = applyCaseAwareRules(finding.originalText, finding.citationType).corrected;
  if (!hasAmbiguousReporterSequence(normalizedCitation)) return '';
  const regional = ambiguousRegionalCitationParts(finding, normalizedCitation);
  if (!regional) return '';
  const officialMatch = String(returnedParallelCitation || '').match(/\b\d+\s+(?:Mich App|Mich|US)\s+\d+\b/);
  if (!officialMatch) return '';
  const caseName = caseNameFromNormalizedCitation(normalizedCitation);
  if (!caseName) return '';
  const regionalCitation = `${regional.volume} ${normalizeReporterForMichiganDisplay(regional.reporter)} ${regional.page}`;
  return addYearParenthetical(`${caseName}, ${officialMatch[0]}; ${regionalCitation}`, year);
}

function normalizeReporterForMichiganDisplay(reporter) {
  return {
    'Mich. App.': 'Mich App',
    'Mich.': 'Mich',
    'N.W.2d': 'NW2d',
    'N.W.3d': 'NW3d',
    'U.S.': 'US',
    'S. Ct.': 'S Ct',
    'L. Ed.': 'L Ed',
    'L. Ed. 2d': 'L Ed 2d',
  }[reporter] || reporter;
}

function recomputeFindingStatus(finding) {
  const issues = finding.issues || [];
  finding.ruleViolatedOrWarning = [...new Set(issues.map((issue) => issue.message).filter(Boolean))].join(' ') || undefined;
  const nonCompliantIssues = issues.filter((issue) => issue.suggestedCorrection || issue.verificationProblem);
  finding.appearsCompliant = nonCompliantIssues.length === 0;
  finding.status = nonCompliantIssues.length > 0 ? 'Review' : issues.length > 0 ? 'Note' : 'Compliant';
}

function addLookupIssue(finding, message, verificationProblem = false) {
  finding.issues = finding.issues || [];
  if (!finding.issues.some((issue) => issue.message === message)) {
    finding.issues.push({
      rule: 'CourtListener citation-only lookup',
      message,
      safeToAutoCorrect: false,
      verificationProblem,
    });
  }
  recomputeFindingStatus(finding);
}

function rebuildOutputs(report) {
  const text = report.sourceText || input.value;
  if (!report.findings.length) {
    report.correctedText = '';
    report.formattedHtml = escapeHtml(text);
    report.tables = buildTables(report.findings, currentOptions());
    return;
  }
  const replacements = report.findings
    .map((finding) => ({ start: finding.start, end: finding.end, replacement: displayCorrectionFor(finding, currentOptions()) }))
    .filter((replacement) => replacement.replacement !== text.slice(replacement.start, replacement.end))
    .sort((a, b) => b.start - a.start);
  report.correctedText = replacements.length
    ? replacements.reduce((current, replacement) => (
      current.slice(0, replacement.start) + replacement.replacement + current.slice(replacement.end)
    ), text)
    : '';
  if (report.findings.length === 1 && text.trim() === report.findings[0].originalText && report.correctedText.trim()) {
    report.correctedText = report.correctedText.trim();
  }
  report.formattedHtml = formattedHtmlFor(text, report.findings, currentOptions());
  report.tables = buildTables(report.findings, currentOptions());
}

async function supplyParallelCitations() {
  if (!latestReport || includeParallels?.checked === false) return;
  if (location.protocol === 'file:') {
    parallelStatus.textContent = 'Offline local mode: supplied parallel citations can be kept or omitted, but CourtListener lookup is available only in the hosted web app.';
    return;
  }
  const citations = parallelLookupRequests(latestReport);
  if (!citations.length) {
    parallelStatus.textContent = 'Parallel citation formatting is on. No missing parallel citations were found for lookup.';
    return;
  }
  if (!citations.every(isParallelLookupCitation)) {
    parallelStatus.textContent = 'Parallel lookup was stopped because a citation-only request could not be verified in the browser.';
    return;
  }
  parallelStatus.textContent = `Looking up ${citations.length} extracted reporter citation${citations.length === 1 ? '' : 's'} only. No document text or case names are sent.`;

  try {
    const response = await fetch('/api/parallel-citations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ citations }),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(payload?.error || 'MiCite could not retrieve parallel citations right now. No document text was sent.');
    }
    if (!Array.isArray(payload?.results)) {
      throw new Error('MiCite could not read the parallel-citation response. No document text was sent.');
    }

    let added = 0;
    let verified = 0;
    let verificationWarnings = 0;
    const byId = new Map(payload.results.map((result) => [result.id, result]));
    for (const finding of latestReport.findings) {
      const result = byId.get(`${finding.start}-${finding.end}`);
      finding.parallelLookup = result;
      if (result?.found) {
        verified += 1;
        addLookupIssue(finding, 'Prototype lookup note: CourtListener returned data for this reporter citation.');
        const localCaseName = caseNameForFinding(finding);
        if (Array.isArray(result.caseNames) && result.caseNames.length && !caseNamesLikelyMatch(localCaseName, result.caseNames)) {
          verificationWarnings += 1;
          addLookupIssue(
            finding,
            'Prototype lookup note: CourtListener returned a different case name or caption; verify the case name and citation before filing.',
            true,
          );
        }
      } else if (result) {
        verificationWarnings += 1;
        addLookupIssue(finding, 'Prototype lookup note: CourtListener did not return matching data for this reporter citation.', true);
      }

      if (result?.parallelCitation) {
        const baseCitation = displayCorrectionFor(finding, { includeParallelCitations: false });
        const repairedCitation = repairAmbiguousReporterSequence(finding, baseCitation, result.parallelCitation, result.year);
        finding.parallelSuggestion = repairedCitation || addYearParenthetical(addParallelCitation(baseCitation, result.parallelCitation), result.year);
        if (repairedCitation) {
          addLookupIssue(finding, 'Prototype lookup repaired a malformed official/regional reporter sequence from the extracted regional citation. Verify before filing.', true);
        }
        added += 1;
      } else if (result?.year && !/\(\d{4}\)\s*$/.test(displayCorrectionFor(finding, { includeParallelCitations: false }))) {
        finding.parallelSuggestion = addYearParenthetical(displayCorrectionFor(finding, { includeParallelCitations: true }), result.year);
        added += 1;
      }
    }
    rebuildOutputs(latestReport);
    render(latestReport);
    if (added) {
      parallelStatus.textContent = `Added ${added} parallel citation suggestion${added === 1 ? '' : 's'}. Prototype lookup notes may appear in the results. Verify before filing.`;
    } else if (verified && !verificationWarnings) {
      parallelStatus.textContent = 'No missing parallels were returned. Prototype lookup notes may appear in the results.';
    } else if (payload.results.some((result) => result?.error || Number(result?.status) >= 400)) {
      parallelStatus.textContent = 'MiCite could not retrieve parallel citations right now. No document text was sent.';
    } else {
      parallelStatus.textContent = 'No matching parallel citations were found for the extracted reporter citations.';
    }
  } catch (error) {
    parallelStatus.textContent = error instanceof Error
      ? error.message
      : 'MiCite could not retrieve parallel citations right now. No document text was sent.';
  }
}

function citationLabel(finding, options = {}) {
  const correctedCitation = displayCorrectionFor(finding, options);
  const commaIndex = correctedCitation.indexOf(',');
  return commaIndex > 0 ? correctedCitation.slice(0, commaIndex) : correctedCitation;
}

function tableRowsFor(findings, mode, options = {}) {
  if (mode === 'incorrect') {
    return findings.filter((finding) => !finding.appearsCompliant || finding.suggestedCorrection);
  }
  return findings;
}

function buildAuthorities(findings, options = {}) {
  const authorities = new Map();
  for (const finding of findings) {
    if (!['michigan_case', 'michigan_short_case', 'federal_case'].includes(finding.citationType)) continue;
    const correctedCitation = displayCorrectionFor(finding, options);
    const label = citationLabel(finding, options);
    if (!authorities.has(label)) {
      authorities.set(label, {
        authority: label,
        citation: correctedCitation,
        pages: new Set(),
      });
    }
    authorities.get(label).pages.add(String(finding.page || finding.line));
  }
  return [...authorities.values()]
    .sort((a, b) => a.authority.localeCompare(b.authority))
    .map((authority) => ({
      ...authority,
      pages: [...authority.pages].join(', '),
    }));
}

function buildTables(findings, options = {}) {
  return {
    all: tableRowsFor(findings, 'all', options),
    incorrect: tableRowsFor(findings, 'incorrect', options),
    authorities: buildAuthorities(findings, options),
  };
}

function renderTable(report) {
  const mode = tableMode?.value || 'all';
  let html = '';

  if (mode === 'toa') {
    const rows = report.tables.authorities;
    if (!rows.length) {
      generatedTable.innerHTML = '<p class="empty">No authorities found.</p>';
      return;
    }
    html = '<table><thead><tr><th>Authority</th><th>Citation</th><th>Pages</th></tr></thead><tbody>';
    for (const row of rows) {
      html += `<tr><td><em>${escapeHtml(row.authority)}</em></td><td>${escapeHtml(row.citation)}</td><td>${escapeHtml(row.pages)}</td></tr>`;
    }
    html += '</tbody></table>';
    generatedTable.innerHTML = html;
    return;
  }

  const rows = mode === 'incorrect' ? report.tables.incorrect : report.tables.all;
  if (!rows.length) {
    generatedTable.innerHTML = '<p class="empty">No citations for this table.</p>';
    return;
  }
  html = '<table><thead><tr><th>Location</th><th>Type</th><th>Original</th><th>Correction</th><th>Status</th></tr></thead><tbody>';
  for (const finding of rows) {
    const correction = finding.suggestedCorrection || displayCorrectionFor(finding, { includeParallelCitations: includeParallels?.checked !== false });
    html += `<tr><td>p ${finding.page}, line ${finding.line}</td><td>${escapeHtml(finding.citationType.replaceAll('_', ' '))}</td><td>${escapeHtml(finding.originalText)}</td><td>${escapeHtml(correction)}</td><td>${escapeHtml(finding.status || (finding.appearsCompliant ? 'Compliant' : 'Review'))}</td></tr>`;
  }
  html += '</tbody></table>';
  generatedTable.innerHTML = html;
}

function render(report) {
  document.querySelector('#total').textContent = report.totalCitations;
  document.querySelector('#clean').textContent = report.compliant;
  document.querySelector('#needs').textContent = report.noncompliant;
  corrected.value = report.findings.length ? report.correctedText : '';
  formatted.innerHTML = report.formattedHtml || escapeHtml(input.value);
  renderTable(report);
  results.innerHTML = report.findings.length ? '' : '<p class="message">No likely citations found.</p>';

  for (const finding of report.findings) {
    const row = document.createElement('div');
    row.className = 'finding';
    row.innerHTML = '<div class="finding-top"><span></span><span class="pill"></span></div><div class="citation"></div>';
    row.querySelector('.finding-top span').textContent = `Line ${finding.line}, col ${finding.offset} · ${finding.citationType.replaceAll('_', ' ')}`;
    const pill = row.querySelector('.pill');
    const status = finding.status || (finding.appearsCompliant ? 'Compliant' : 'Review');
    pill.textContent = status;
    if (status === 'Review') pill.classList.add('bad');
    if (status === 'Note') pill.classList.add('note');
    row.querySelector('.citation').textContent = finding.originalText;

    if (finding.ruleViolatedOrWarning) {
      const messages = [...new Set((finding.issues || []).map((issue) => issue.message).filter(Boolean))];
      if (messages.length > 1) {
        const list = document.createElement('ul');
        list.className = 'message-list';
        for (const item of messages) {
          const li = document.createElement('li');
          li.textContent = item;
          list.appendChild(li);
        }
        row.appendChild(list);
      } else {
        const message = document.createElement('div');
        message.className = 'message';
        message.textContent = messages[0] || finding.ruleViolatedOrWarning;
        row.appendChild(message);
      }
    }
    if (finding.suggestedCorrection && finding.suggestedCorrection !== finding.originalText) {
      const suggestion = document.createElement('div');
      suggestion.className = 'suggestion';
      suggestion.textContent = `Suggestion: ${finding.suggestedCorrection}`;
      row.appendChild(suggestion);
    }
    results.appendChild(row);
  }
}

function currentOptions() {
  return { includeParallelCitations: includeParallels?.checked !== false };
}

function updateParallelSwitchLabel() {
  if (parallelSwitchLabel) parallelSwitchLabel.textContent = includeParallels?.checked === false ? 'Off' : 'On';
}

async function check(applySafeCorrections = false, options = {}) {
  updateParallelSwitchLabel();
  latestReport = checkText(input.value, applySafeCorrections, currentOptions());
  render(latestReport);
  const hasFindings = latestReport.totalCitations > 0;
  apply.disabled = latestReport.noncompliant === 0 || !hasFindings;
  download.disabled = false;
  copyText.disabled = !hasFindings;
  copyHtml.disabled = !hasFindings;
  copyTable.disabled = !hasFindings;
  if (applySafeCorrections && hasFindings) input.value = latestReport.correctedText;
  if (includeParallels?.checked === false) {
    parallelStatus.textContent = 'Parallel citation formatting is off. MiCite will omit supplied parallel citations where it can do so safely.';
    return;
  }
  if (options.skipParallelLookup) {
    parallelStatus.textContent = 'Parallel citation formatting is on. Missing parallels are supplied from extracted reporter citations only when you check text.';
    return;
  }
  await supplyParallelCitations();
}

async function copyFormatted() {
  const html = latestReport?.formattedHtml || formatted.innerHTML;
  const text = formatted.textContent || '';
  if (navigator.clipboard && window.ClipboardItem) {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([text], { type: 'text/plain' }),
      }),
    ]);
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  }
}

document.querySelector('#check').addEventListener('click', () => check(false));
apply.addEventListener('click', () => check(true));
copyText.addEventListener('click', () => navigator.clipboard?.writeText(corrected.value));
copyHtml.addEventListener('click', () => copyFormatted());
copyTable.addEventListener('click', () => navigator.clipboard?.writeText(generatedTable.innerText || ''));
includeParallels?.addEventListener('change', () => {
  updateParallelSwitchLabel();
  parallelStatus.textContent = includeParallels.checked
    ? 'Parallel citation formatting is on. Missing parallels are supplied from extracted reporter citations only: volume, reporter, and page.'
    : 'Parallel citation formatting is off. MiCite will omit supplied parallel citations where it can do so safely.';
  if (latestReport) check(false);
});
tableMode?.addEventListener('change', () => latestReport && renderTable(latestReport));
download.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(latestReport, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'micite-report.json';
  a.click();
  URL.revokeObjectURL(url);
});
document.querySelector('#file').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  input.value = await file.text();
  check(false);
});

if (location.protocol === 'file:') {
  parallelStatus.textContent = 'Offline local mode: supplied parallel citations can be kept or omitted, but CourtListener lookup is available only in the hosted web app.';
}
updateParallelSwitchLabel();
check(false, { skipParallelLookup: true });
