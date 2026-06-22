const COURTLISTENER_ENDPOINT = 'https://www.courtlistener.com/api/rest/v4/citation-lookup/';
const MAX_CITATIONS_PER_REQUEST = 50;
const TOKEN = process.env.COURTLISTENER_API_TOKEN;

const REPORTER_TO_MICHIGAN_STYLE = new Map([
  ['Mich.', 'Mich'],
  ['Mich. App.', 'Mich App'],
  ['N.W.2d', 'NW2d'],
  ['N.W.3d', 'NW3d'],
  ['U.S.', 'US'],
  ['S. Ct.', 'S Ct'],
  ['L. Ed.', 'L Ed'],
  ['L. Ed. 2d', 'L Ed 2d'],
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
    if (!/^[\w-]{1,80}$/.test(String(id))) throw new Error('Invalid citation id.');
    if (!/^\d{1,5}$/.test(String(volume))) throw new Error('Invalid citation volume.');
    if (!/^[A-Za-z0-9. ]{1,30}$/.test(String(reporter))) throw new Error('Invalid citation reporter.');
    if (!/^\d{1,6}[A-Za-z]?$/.test(String(page))) throw new Error('Invalid citation page.');
    return {
      id: String(id),
      volume: String(volume),
      reporter: String(reporter),
      page: String(page),
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
  if (primaryReporter === 'US') return new Set(['S Ct', 'L Ed 2d', 'L Ed']);
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

function citationString(citation) {
  return `${citation.volume} ${courtListenerReporter(citation.reporter)} ${citation.page}`;
}

async function lookupCitation(citation) {
  const baseHeaders = {
    Accept: 'application/json',
  };
  if (TOKEN) baseHeaders.Authorization = `Token ${TOKEN}`;

  const jsonResponse = await fetch(COURTLISTENER_ENDPOINT, {
    method: 'POST',
    headers: {
      ...baseHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: citationString(citation) }),
  });
  let response = jsonResponse;
  let payload = await response.json().catch(() => null);

  if (!response.ok && (response.status === 400 || response.status === 415 || response.status === 422)) {
    const form = new URLSearchParams();
    form.set('volume', citation.volume);
    form.set('reporter', courtListenerReporter(citation.reporter));
    form.set('page', citation.page);
    response = await fetch(COURTLISTENER_ENDPOINT, {
      method: 'POST',
      headers: {
        ...baseHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
    });
    payload = await response.json().catch(() => null);
  }

  const first = Array.isArray(payload) ? payload[0] : payload;
  const status = first?.status || response.status;
  const parallelCitation = response.ok && (!first?.status || first.status === 200)
    ? wantedParallelCitations(citation, payload)
    : '';

  return {
    id: citation.id,
    citation: `${citation.volume} ${citation.reporter} ${citation.page}`,
    status,
    error: first?.error_message || '',
    normalizedCitations: first?.normalized_citations || [],
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
      return sendJson(response, 503, { error: 'CourtListener lookup is not configured.' });
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
  normalizeReporter,
  wantedParallelCitations,
};
