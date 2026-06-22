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
  [/\bv\./g, 'v', 'Michigan case names use v without a period.', true],
  [/\b(Co|Cos|Corp|Inc|Ltd|Mfg|Assocs?|Bros|Bldg|Cas|Ctrs?|Div|Dist|Ed|Equip|Exch|Fed|Fin|Gov’t|Hts|Hwys?|Hosps?|Indep|Indus|Ins|Mgt|Mfr|Mktg|Muni|Mut|Org|Prod|Prof|Props?|Pub|Rd|Schs?|Servs?|Stds?|Sys|Tel|Twp|Univ)\./g, '$1', 'Michigan case-name abbreviations do not use periods.', true],
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
  [['Incorporated'], 'Inc'],
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

const CASE_NAME_PART = String.raw`[A-Z][A-Za-z0-9'’&.\-() ]+?`;
const PIN_CITE = String.raw`(?:\d+(?:-\d+)?|\d+\s+n\s+\d+|\d+\s+nn\s+\d+(?:-\d+)?)`;
const MCL_SECTION = String.raw`\d+\.\d+[A-Za-z]?(?:\([A-Za-z0-9]+\))*`;
const CASE_REPORTER = String.raw`(?:Mich\.?\s*App\.?|Mich\.?|N\.W\.\s*2d|N\.W\.\s*3d|N\.W\.|NW\s*2d|NW\s*3d|NW2d|NW3d|NW)`;
const FEDERAL_REPORTER = String.raw`(?:U\.S\.|US|S\.\s*Ct\.|S\s+Ct|L\.\s*Ed\.\s*2d|L\s+Ed\s+2d|L\.\s*Ed\.|L\s+Ed|F\.\s*Appx|F\s+Appx|Fed\.\s*Cl\.?|Fed\s+Cl|F\.\s*Supp\.\s*3d|F\s+Supp\s+3d|F\.\s*Supp\.\s*2d|F\s+Supp\s+2d|F\.\s*Supp\.|F\s+Supp|F\.\s*2d|F\.\s*3d|F\.\s*4th|F\s*2d|F\s*3d|F\s*4th|F2d|F3d|F4th)`;
const NORMALIZED_PARALLEL_REPORTER = String.raw`(?:Mich App|Mich|NW2d|NW3d|NW|US|S Ct|L Ed(?: 2d)?|F Appx|Fed Cl|F Supp(?: [23]d)?|F2d|F3d|F4th|F)`;

const PATTERNS = [
  ['michigan_case', new RegExp(String.raw`\b${CASE_NAME_PART}\s+v\.?\s+${CASE_NAME_PART},\s+\d+\s+${CASE_REPORTER}\s+\d+(?:,\s*${PIN_CITE})?(?:\s*[;,]\s*\d+\s+${CASE_REPORTER}\s+\d+)?\s*\(\d{4}\)`, 'g')],
  ['michigan_case', new RegExp(String.raw`\b(?:In re|In Re|In the Matter of)\s+${CASE_NAME_PART}(?:\s+\(${CASE_NAME_PART}\s+v\.?\s+${CASE_NAME_PART}\))?,\s+\d+\s+${CASE_REPORTER}\s+\d+(?:,\s*${PIN_CITE})?(?:\s*[;,]\s*\d+\s+${CASE_REPORTER}\s+\d+)?\s*\(\d{4}\)`, 'g')],
  ['michigan_case', new RegExp(String.raw`\b${CASE_NAME_PART}\s+v\.?\s+${CASE_NAME_PART},?\s+\d+\s+${CASE_REPORTER}\s+\d+(?:,\s*${PIN_CITE})?(?:\s*[;,]\s*\d+\s+${CASE_REPORTER}\s+\d+)?(?:\s*\(\d{4}\))?`, 'g')],
  ['michigan_short_case', new RegExp(String.raw`\b[A-Z][A-Za-z0-9'&.\-\s]+?,\s+\d+\s+${CASE_REPORTER}\s+at\s+\d+(?:-\d+)?`, 'g')],
  ['federal_case', new RegExp(String.raw`\b${CASE_NAME_PART}\s+v\.?\s+${CASE_NAME_PART},\s+\d+\s+${FEDERAL_REPORTER}\s+\d+(?:,\s*${PIN_CITE})?(?:\s*[,;]\s*\d+\s+${FEDERAL_REPORTER}\s+\d+)*\s*\((?:[^)]*?,?\s*)?\d{4}\)`, 'g')],
  ['federal_case', new RegExp(String.raw`\b${CASE_NAME_PART},\s+\d+\s+${FEDERAL_REPORTER}\s+\d+(?:,\s*${PIN_CITE})?(?:\s*[,;]\s*\d+\s+${FEDERAL_REPORTER}\s+\d+)*\s*\((?:[^)]*?,?\s*)?\d{4}\)`, 'g')],
  ['id', /\b[Ii]d\.\s*(?:at\s+\d+(?:-\d+)?)?/g],
  ['statute', /\b(?:M\.C\.L\.|MCL|MCLA|MCLS)\s+\d+\.\d+[A-Za-z]?(?:\([A-Za-z0-9]+\))*(?=$|[\s.;,)])(?:\s*(?:through|to|-)\s*(?:M\.C\.L\.|MCL|MCLA|MCLS)?\s*\d+\.\d+[A-Za-z]?(?:\([A-Za-z0-9]+\))*)?(?:\s+et\s+seq\.)?/g],
  ['federal_statute', /\b\d+\s+U\.?S\.?C\.?\s+§*\s*\d+[A-Za-z]?(?:\([A-Za-z0-9]+\))*\b(?:\s+et\s+seq\.)?/g],
  ['court_rule', /\b(?:M\.C\.R\.|MCR)\s+\d+\.\d+(?:\([A-Za-z0-9]+\))*\b(?:(?:\s+and\s+|,\s*|\s*)\([A-Za-z0-9]+\))*|(?:M\.C\.R\.|MCR)\s+\d+\.\d+\s+(?:through|to|-)\s*(?:M\.C\.R\.|MCR)?\s*\d+\.\d+/g],
  ['evidence_rule', /\b(?:M\.R\.E\.|MRE)\s+\d+(?:\([A-Za-z0-9]+\))*(?=$|[\s.;,)])/g],
  ['federal_case', new RegExp(String.raw`\b\d+\s+${FEDERAL_REPORTER}\s+\d+(?:\s*;\s*\d+\s+${FEDERAL_REPORTER}\s+\d+)*(?:\s*\(\d{4}\))?`, 'g')],
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

  const vIndex = candidate.text.search(/\s+v\.?\s+/);
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

  const missingCaseNameCommaPattern = new RegExp(String.raw`(\b${CASE_NAME_PART}\s+v\.?\s+${CASE_NAME_PART})\s+(?=\d+\s+(?:${CASE_REPORTER}|${FEDERAL_REPORTER})\s+\d+)`, 'g');
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
  const correctedCitation = applyRules(finding.originalText).corrected;
  if (options.includeParallelCitations === false && ['michigan_case', 'federal_case'].includes(finding.citationType)) {
    return removeParallelCitations(correctedCitation);
  }
  return correctedCitation;
}

function advisoryIssues(original, type, current) {
  const issues = [];
  const isCase = type === 'michigan_case' || type === 'michigan_short_case' || type === 'federal_case';

  if (isCase && /\b[A-Z][A-Za-z0-9'’&.\-()\s]+?\s+v\.?\s+[A-Z]/.test(original)) {
    issues.push({
      rule: 'Michigan Appellate Opinion Manual 1:7',
      message: 'Case names should be italicized in formatted documents.',
      safeToAutoCorrect: false,
    });
  }

  if (
    (type === 'michigan_case' || type === 'federal_case') &&
    /\b[A-Z][A-Za-z0-9'’&.\-()\s]+?\s+v\.?\s+[A-Z]/.test(original) &&
    !/\(\d{4}\)\s*$/.test(current)
  ) {
    issues.push({
      rule: 'Michigan Appellate Opinion Manual 1:8',
      message: 'Full case citations should include a year parenthetical.',
      safeToAutoCorrect: false,
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

function extractCitations(text) {
  const candidates = [];

  for (const [type, pattern] of PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const trimmed = trimNarrativeCasePrefix(type, trimCitationMatch(match.index, match[0]));
      const location = lineInfo(text, trimmed.start);
      const page = pageForIndex(text, trimmed.start);
      const ruleResult = applyRules(trimmed.text);
      const issues = [...ruleResult.issues, ...advisoryIssues(trimmed.text, type, ruleResult.corrected)];
      const issueSummary = [...new Set(issues.map((issue) => issue.message))].join(' ');
      const nonCompliantIssues = issues.filter((issue) => issue.suggestedCorrection);

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
        suggestedCorrection: ruleResult.corrected !== trimmed.text ? ruleResult.corrected : issues.find((issue) => issue.suggestedCorrection)?.suggestedCorrection,
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
    const commaIndex = correctedCitation.indexOf(',');
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
  let correctedText = text;
  let appliedCorrections = 0;

  const replacements = findings
    .map((finding) => ({ start: finding.start, end: finding.end, replacement: displayCorrectionFor(finding, options), finding }))
    .filter((replacement) => replacement.replacement !== text.slice(replacement.start, replacement.end))
    .sort((a, b) => b.start - a.start);

  const previewText = replacements.reduce((current, replacement) => current.slice(0, replacement.start) + replacement.replacement + current.slice(replacement.end), text);

  if (applySafeCorrections) {
    correctedText = previewText;
    appliedCorrections = replacements.length;
  } else {
    correctedText = previewText;
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
  const citation = displayCorrectionFor(finding, { includeParallelCitations: false });
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
  const commaIndex = correctedCitation.indexOf(',');
  if (commaIndex < 0) return '';
  return correctedCitation.slice(0, commaIndex).trim();
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

function addParallelCitation(citation, parallelCitation) {
  if (!parallelCitation || hasParallelCitation(citation)) return citation;
  const yearMatch = citation.match(/\s*\(\d{4}\)\s*$/);
  if (!yearMatch) return `${citation}; ${parallelCitation}`;
  const year = yearMatch[0];
  return `${citation.slice(0, -year.length)}; ${parallelCitation}${year}`;
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
  const replacements = report.findings
    .map((finding) => ({ start: finding.start, end: finding.end, replacement: displayCorrectionFor(finding, currentOptions()) }))
    .filter((replacement) => replacement.replacement !== text.slice(replacement.start, replacement.end))
    .sort((a, b) => b.start - a.start);
  report.correctedText = replacements.reduce((current, replacement) => (
    current.slice(0, replacement.start) + replacement.replacement + current.slice(replacement.end)
  ), text);
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
        addLookupIssue(finding, 'CourtListener found a case for this reporter citation.');
        const localCaseName = caseNameForFinding(finding);
        if (Array.isArray(result.caseNames) && result.caseNames.length && !caseNamesLikelyMatch(localCaseName, result.caseNames)) {
          verificationWarnings += 1;
          addLookupIssue(
            finding,
            'CourtListener returned a different case name or caption; verify the case name and citation before filing.',
            true,
          );
        }
      } else if (result) {
        verificationWarnings += 1;
        addLookupIssue(finding, 'CourtListener could not verify this reporter citation.', true);
      }

      if (result?.parallelCitation) {
        const baseCitation = displayCorrectionFor(finding, { includeParallelCitations: false });
        finding.parallelSuggestion = addParallelCitation(baseCitation, result.parallelCitation);
        added += 1;
      }
    }
    rebuildOutputs(latestReport);
    render(latestReport);
    if (added) {
      parallelStatus.textContent = `Added ${added} parallel citation suggestion${added === 1 ? '' : 's'} and checked ${verified} reporter citation${verified === 1 ? '' : 's'}. Verify before filing.`;
    } else if (verified && !verificationWarnings) {
      parallelStatus.textContent = `No missing parallels were returned, but CourtListener found ${verified} reporter citation${verified === 1 ? '' : 's'}.`;
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
    html += `<tr><td>p ${finding.page}, line ${finding.line}</td><td>${escapeHtml(finding.citationType.replaceAll('_', ' '))}</td><td>${escapeHtml(finding.originalText)}</td><td>${escapeHtml(displayCorrectionFor(finding, { includeParallelCitations: includeParallels?.checked !== false }))}</td><td>${escapeHtml(finding.status || (finding.appearsCompliant ? 'Compliant' : 'Review'))}</td></tr>`;
  }
  html += '</tbody></table>';
  generatedTable.innerHTML = html;
}

function render(report) {
  document.querySelector('#total').textContent = report.totalCitations;
  document.querySelector('#clean').textContent = report.compliant;
  document.querySelector('#needs').textContent = report.noncompliant;
  corrected.value = report.correctedText || input.value;
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
  apply.disabled = latestReport.noncompliant === 0;
  download.disabled = false;
  copyText.disabled = false;
  copyHtml.disabled = false;
  copyTable.disabled = false;
  if (applySafeCorrections) input.value = latestReport.correctedText;
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
