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

function citationPart(citation) {
  if (!citation?.volume || !citation?.reporter || !citation?.page) return null;
  return `${citation.volume} ${normalizeReporter(citation.reporter)} ${citation.page}`;
}

function wantedParallelCitations(primary, clusters) {
  const primaryReporter = normalizeReporter(primary.reporter);
  const wantedReporters = primaryReporter === 'US'
    ? new Set(['S Ct', 'L Ed', 'L Ed 2d'])
    : new Set(['NW2d', 'NW3d']);
  const seen = new Set([`${primary.volume} ${primaryReporter} ${primary.page}`]);
  const parts = [];

  for (const cluster of clusters || []) {
    for (const citation of cluster.citations || []) {
      const reporter = normalizeReporter(citation.reporter);
      const part = citationPart(citation);
      if (!part || !wantedReporters.has(reporter) || seen.has(part)) continue;
      seen.add(part);
      parts.push(part);
    }
  }

  return parts.join('; ');
}

async function lookupCitation(citation) {
  const form = new URLSearchParams();
  form.set('volume', citation.volume);
  form.set('reporter', citation.reporter);
  form.set('page', citation.page);

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  if (TOKEN) headers.Authorization = `Token ${TOKEN}`;

  const response = await fetch(COURTLISTENER_ENDPOINT, {
    method: 'POST',
    headers,
    body: form.toString(),
  });
  const data = await response.json().catch(() => []);
  const first = Array.isArray(data) ? data[0] : null;
  const parallelCitation = first?.status === 200 ? wantedParallelCitations(citation, first.clusters) : '';

  return {
    id: citation.id,
    citation: `${citation.volume} ${citation.reporter} ${citation.page}`,
    status: first?.status || response.status,
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
