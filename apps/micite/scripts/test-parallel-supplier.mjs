import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { createRequire } from 'node:module';

process.env.COURTLISTENER_API_TOKEN = 'test-token';

const require = createRequire(import.meta.url);
const handler = require('../api/parallel-citations.js');

function invoke(payload) {
  return new Promise((resolve) => {
    const request = Readable.from([JSON.stringify(payload)]);
    request.method = 'POST';
    const response = {
      statusCode: 200,
      headers: {},
      setHeader(key, value) {
        this.headers[key.toLowerCase()] = value;
      },
      end(body) {
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: JSON.parse(body),
        });
      },
    };
    handler(request, response);
  });
}

assert.throws(
  () => handler._private.assertCitationOnlyPayload({ text: 'Smith v Jones, 500 Mich 1.' }),
  /text/,
);

assert.throws(
  () => handler._private.assertCitationOnlyPayload({
    citations: [{ id: 'a', volume: '460', reporter: 'Mich.', page: '446', caseName: 'Smith v Globe Life' }],
  }),
  /caseName/,
);

const parallel = handler._private.wantedParallelCitations(
  { volume: '460', reporter: 'Mich.', page: '446' },
  [{ status: 200, clusters: [{ citations: [
    { volume: '460', reporter: 'Mich.', page: '446' },
    { volume: '597', reporter: 'N.W.2d', page: '28' },
  ] }] }],
);
assert.equal(parallel, '597 NW2d 28');

const officialFromRegional = handler._private.wantedParallelCitations(
  { volume: '600', reporter: 'N.W.2d', page: '638' },
  [{ status: 200, clusters: [{ citations: [
    { volume: '461', reporter: 'Mich.', page: '219' },
    { volume: '600', reporter: 'N.W.2d', page: '638' },
  ] }] }],
);
assert.equal(officialFromRegional, '461 Mich 219');

const names = [...handler._private.collectCaseNames({
  clusters: [{ case_name: 'Smith v Globe Life Insurance Co' }],
})];
assert.deepEqual(names, ['Smith v Globe Life Insurance Co']);

const years = [...handler._private.collectYears({
  clusters: [{ date_filed: '1999-07-30' }],
})];
assert.deepEqual(years, ['1999']);

let calls = 0;
globalThis.fetch = async (_url, options) => {
  calls += 1;
  assert(!String(options.body).includes('Globe Life'));
  assert(!String(options.body).includes('document'));

  if (calls === 1) {
    return {
      ok: false,
      status: 415,
      json: async () => ({ error_message: 'Unsupported media type' }),
    };
  }

  assert.equal(options.headers['Content-Type'], 'application/x-www-form-urlencoded');
  assert.equal(String(options.body), 'volume=460&reporter=Mich.&page=446');
  return {
    ok: true,
    status: 200,
    json: async () => ([{
      status: 200,
      clusters: [{ citations: [
        { volume: '460', reporter: 'Mich.', page: '446' },
        { volume: '597', reporter: 'N.W.2d', page: '28' },
      ], case_name: 'Smith v Globe Life Insurance Co', date_filed: '1999-07-30' }],
      normalized_citations: ['460 Mich. 446'],
    }]),
  };
};

const response = await invoke({
  citations: [{ id: '1-10', volume: '460', reporter: 'Mich.', page: '446' }],
});

assert.equal(response.statusCode, 200);
assert.equal(response.body.results[0].found, true);
assert.equal(response.body.results[0].parallelCitation, '597 NW2d 28');
assert.deepEqual(response.body.results[0].caseNames, ['Smith v Globe Life Insurance Co']);
assert.equal(response.body.results[0].year, '1999');
assert.equal(calls, 2);

console.log('Parallel citation supplier tests passed.');
