const COURTLISTENER_ENDPOINT = 'https://www.courtlistener.com/api/rest/v4/citation-lookup/';
const MAX_CITATIONS_PER_REQUEST = 50;
const TOKEN = process.env.COURTLISTENER_API_TOKEN;
const ALLOWED_REPORTERS = new Set([
  'Mich.',
  'Mich. App.',
  'Mich',
  'Mich App',
  'N.W.',
  'N.W.2d',
  'N.W.3d',
  'NW',
  'NW2d',
  'NW3d',
  'U.S.',
  'US',
  'S. Ct.',
  'S Ct',
  'L. Ed.',
  'L Ed',
  'L. Ed. 2d',
  'L Ed 2d',
  'F. Appx',
  'F Appx',
  'Fed. Cl.',
  'Fed Cl',
  'F. Supp.',
  'F Supp',
  'F. Supp. 2d',
  'F Supp 2d',
  'F. Supp. 3d',
  'F Supp 3d',
  'F.2d',
  'F2d',
  'F.3d',
  'F3d',
  'F.4th',
  'F4th',
]);

const REPORTER_TO_MICHIGAN_STYLE = new Map([
  ['Mich.', 'Mich'],
  ['Mich. App.', 'Mich App'],
  ['N.W.2d', 'NW2d'],
  ['N.W.3d', 'NW3d'],
  ['U.S.', 'US'],
  ['S. Ct.', 'S Ct'],
  ['L. Ed.', 'L Ed'],
  ['L. Ed. 2d', 'L Ed 2d'],
  ['F. Appx', 'F Appx'],
  ['Fed. Cl.', 'Fed Cl'],
  ['F. Supp.', 'F Supp'],
  ['F. Supp. 2d', 'F Supp 2d'],
  ['F. Supp. 3d', 'F Supp 3d'],
  ['F.2d', 'F2d'],
  ['F.3d', 'F3d'],
  ['F.4th', 'F4th'],
]);

const MICHIGAN_STYLE_TO_COURTLISTENER_REPORTER = new Map([
  ['Mich', 'Mich.'],
  ['Mich App', 'Mich. App.'],
  ['NW2d', 'N.W.2d'],
  ['NW3d', 'N.W.3d'],
  ['US', 'U.S.'],
  ['S Ct', 'S. Ct.'],
  ['L Ed', 'L. Ed.'],
  ['L Ed 2d', 'L. Ed. 2d'],
  ['F Appx', 'F. Appx'],
  ['Fed Cl', 'Fed. Cl.'],
  ['F Supp', 'F. Supp.'],
  ['F Supp 2d', 'F. Supp. 2d'],
  ['F Supp 3d', 'F. Supp. 3d'],
  ['F2d', 'F.2d'],
  ['F3d', 'F.3d'],
  ['F4th', 'F.4th'],
]);

const REPORTER_PRIORITY = [
  'Mich',
  'Mich App',
  'NW3d',
  'NW2d',
  'NW',
  'US',
  'S Ct',
  'L Ed 2d',
  'L Ed',
  'Fed Cl',
  'F Appx',
  'F Supp 3d',
  'F Supp 2d',
  'F Supp',
  'F4th',
  'F3d',
  'F2d',
];

function sendJson(response, status, payload) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.end(JSON.stringify(payload));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 12000) {
        reject(new Error('Request is too large for citation-only lookup.'));
        request.destroy();
      }
    });
    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON.'));
      }
    });
    request.on('error', reject);
  });
}

function assertCitationOnlyPayload(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new Error('Expected a citation-only JSON object.');
  }

  const forbiddenKeys = ['text', 'document', 'body', 'content', 'paragraph', 'sentence', 'file', 'html', 'markdown'];
  for (const key of forbiddenKeys) {
    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      throw new Error(`Refusing lookup payload containing ${key}. Send extracted citations only.`);
    }
  }

  if (!Array.isArray(payload.citations)) {
    throw new Error('Expected citations array.');
  }
  if (payload.citations.length > MAX_CITATIONS_PER_REQUEST) {
    throw new Error(`At most ${MAX_CITATIONS_PER_REQUEST} citations may be looked up at once.`);
  }

  return payload.citations.map((citation) => {
    if (!citation || typeof citation !== 'object') throw new Error('Invalid citation entry.');
    const allowedKeys = new Set(['id', 'volume', 'reporter', 'page']);
    for (const key of Object.keys(citation)) {
      if (!allowedKeys.has(key)) {
        throw new Error(`Invalid citation field ${key}. Send only id, volume, reporter, and page.`);
      }
    }
    const { id, volume, reporter, page } = citation;
    if (typeof id !== 'string' || !/^[A-Za-z0-9_-]{1,80}$/.test(id)) throw new Error('Invalid citation id.');
    if (typeof volume !== 'string' || !/^\d{1,5}$/.test(volume)) throw new Error('Invalid citation volume.');
    if (typeof reporter !== 'string' || !ALLOWED_REPORTERS.has(reporter)) throw new Error('Invalid citation reporter.');
    if (typeof page !== 'string' || !/^\d{1,6}[A-Za-z]?$/.test(page)) throw new Error('Invalid citation page.');
    return {
      id,
      volume,
      reporter,
      page,
    };
  });
}

function normalizeReporter(reporter) {
  return REPORTER_TO_MICHIGAN_STYLE.get(reporter) || reporter.replace(/\./g, '').replace(/\s+/g, ' ').trim();
}

function courtListenerReporter(reporter) {
  return MICHIGAN_STYLE_TO_COURTLISTENER_REPORTER.get(reporter) || reporter;
}

function citationPart(citation) {
  if (!citation?.volume || !citation?.reporter || !citation?.page) return null;
  return `${citation.volume} ${normalizeReporter(citation.reporter)} ${citation.page}`;
}

function wantedReportersFor(primaryReporter) {
  if (primaryReporter === 'Mich' || primaryReporter === 'Mich App') return new Set(['NW3d', 'NW2d', 'NW']);
  if (primaryReporter === 'NW' || primaryReporter === 'NW2d' || primaryReporter === 'NW3d') return new Set(['Mich', 'Mich App']);
  if (primaryReporter === 'US') return new Set(['S Ct', 'L Ed 2d', 'L Ed']);
  if (primaryReporter === 'S Ct' || primaryReporter === 'L Ed' || primaryReporter === 'L Ed 2d') return new Set(['US']);
  return new Set();
}

function parseCitationString(value) {
  if (typeof value !== 'string') return null;
  const match = value.match(/\b(\d{1,5})\s+([A-Za-z. ]+?)\s+(\d{1,6}[A-Za-z]?)\b/);
  if (!match) return null;
  return { volume: match[1], reporter: match[2].trim(), page: match[3] };
}

function collectCitationObjects(value, citations = [], depth = 0) {
  if (depth > 8 || value == null) return citations;
  if (typeof value === 'string') {
    const parsed = parseCitationString(value);
    if (parsed) citations.push(parsed);
    return citations;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectCitationObjects(item, citations, depth + 1);
    return citations;
  }
  if (typeof value !== 'object') return citations;

  if (value.volume && value.reporter && value.page) {
    citations.push({
      volume: String(value.volume),
      reporter: String(value.reporter),
      page: String(value.page),
    });
  }

  for (const key of ['citations', 'normalized_citations', 'parallel_citations', 'clusters', 'results', 'opinions', 'citations_resolved']) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      collectCitationObjects(value[key], citations, depth + 1);
    }
  }
  return citations;
}

function collectCaseNames(value, names = new Set(), depth = 0) {
  if (depth > 8 || value == null) return names;
  if (Array.isArray(value)) {
    for (const item of value) collectCaseNames(item, names, depth + 1);
    return names;
  }
  if (typeof value !== 'object') return names;

  for (const key of ['caseName', 'case_name', 'caseNameFull', 'case_name_full', 'caseNameShort', 'case_name_short', 'caption', 'caption_full', 'name']) {
    const valueForKey = value[key];
    if (typeof valueForKey === 'string' && /[A-Za-z]/.test(valueForKey)) {
      names.add(valueForKey.trim());
    }
  }

  for (const key of ['clusters', 'results', 'opinions', 'citations_resolved', 'sub_opinions', 'absolute_url']) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      collectCaseNames(value[key], names, depth + 1);
    }
  }
  return names;
}

function collectYears(value, years = new Set(), depth = 0) {
  if (depth > 8 || value == null) return years;
  if (Array.isArray(value)) {
    for (const item of value) collectYears(item, years, depth + 1);
    return years;
  }
  if (typeof value !== 'object') return years;

  for (const key of ['dateFiled', 'date_filed', 'dateDecided', 'date_decided', 'date', 'year']) {
    const valueForKey = value[key];
    const match = String(valueForKey || '').match(/\b(1[7-9]\d{2}|20\d{2})\b/);
    if (match) years.add(match[1]);
  }

  for (const key of ['clusters', 'results', 'opinions', 'citations_resolved', 'sub_opinions']) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      collectYears(value[key], years, depth + 1);
    }
  }
  return years;
}

function wantedParallelCitations(primary, courtListenerPayload) {
  const primaryReporter = normalizeReporter(primary.reporter);
  const wantedReporters = wantedReportersFor(primaryReporter);
  if (!wantedReporters.size) return '';

  const seen = new Set([`${primary.volume} ${primaryReporter} ${primary.page}`]);
  const partsByReporter = new Map();

  for (const citation of collectCitationObjects(courtListenerPayload)) {
    const reporter = normalizeReporter(citation.reporter);
    const part = citationPart(citation);
    if (!part || !wantedReporters.has(reporter) || seen.has(part)) continue;
    seen.add(part);
    if (!partsByReporter.has(reporter)) partsByReporter.set(reporter, part);
  }

  return REPORTER_PRIORITY
    .filter((reporter) => partsByReporter.has(reporter))
    .map((reporter) => partsByReporter.get(reporter))
    .join('; ');
}

async function lookupCitation(citation) {
  const baseHeaders = {
    Accept: 'application/json',
  };
  if (TOKEN) baseHeaders.Authorization = `Token ${TOKEN}`;

  const form = new URLSearchParams();
  form.set('volume', citation.volume);
  form.set('reporter', courtListenerReporter(citation.reporter));
  form.set('page', citation.page);

  const response = await fetch(COURTLISTENER_ENDPOINT, {
    method: 'POST',
    headers: {
      ...baseHeaders,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  });
  const payload = await response.json().catch(() => null);

  const first = Array.isArray(payload) ? payload[0] : payload;
  const status = first?.status || response.status;
  const returnedCitations = collectCitationObjects(payload);
  const found = response.ok && Boolean(first) && (!first.status || first.status === 200) && returnedCitations.length > 0;
  const parallelCitation = found
    ? wantedParallelCitations(citation, payload)
    : '';

  return {
    id: citation.id,
    citation: `${citation.volume} ${citation.reporter} ${citation.page}`,
    status,
    found,
    error: first?.error_message || '',
    normalizedCitations: first?.normalized_citations || [],
    caseNames: [...collectCaseNames(payload)].slice(0, 5),
    year: [...collectYears(payload)][0] || '',
    parallelCitation,
  };
}

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { error: 'Method not allowed.' });
  }

  try {
    const payload = await readJson(request);
    const citations = assertCitationOnlyPayload(payload);
    if (!TOKEN) {
      return sendJson(response, 503, {
        error: 'Parallel citation lookup is not available yet. No document text was sent.',
      });
    }
    const results = [];

    for (const citation of citations) {
      results.push(await lookupCitation(citation));
    }

    return sendJson(response, 200, { results });
  } catch (error) {
    return sendJson(response, 400, {
      error: error instanceof Error ? error.message : 'Parallel citation lookup failed.',
    });
  }
};

module.exports._private = {
  assertCitationOnlyPayload,
  collectCitationObjects,
  collectCaseNames,
  collectYears,
  normalizeReporter,
  wantedParallelCitations,
};
