# MiCite Static App

This folder contains the static, browser-only MiCite app intended for local installation and deployment to Vercel from GitHub. The home page gives users two choices: run the web app in-browser or download the local package.

**Initial beta version:** This is the initial beta release of MiCite. It is ready for small-group real-world testing, but users should expect edge cases, missed citations, and formatting suggestions that require professional review.

**Important limitation:** MiCite checks citation **format** only. It does not validate that a cited case or source exists, verify quoted material or legal inferences, or determine whether an authority has been overruled, superseded, abrogated, vacated, distinguished, or otherwise limited. MiCite is a formatting tool, not a cite-checking or legal-research tool.

The browser and local package versions use the same interface and citation-formatting engine. Users can paste text, upload TXT/MD files, review citation formatting, apply safe corrections, copy formatted output with italicized case names, download a JSON report, and generate citation tables.

Current table options:

- All detected citations, with corrections where available.
- Incorrect or corrected citations only.
- Table of authorities with page indicators when page breaks are present in the supplied plain text.

The parallel-citation option controls whether supplied parallel citations to regional reporters and `L Ed` are retained in corrected output. The hosted web app can optionally generate missing parallel citation suggestions through CourtListener by sending only extracted citation identifiers: volume, reporter, and page.

Case-name abbreviation checking includes the full Appendix 5 case-name abbreviation list from the Michigan Appellate Opinion Manual. Most entries are safe deterministic rewrites inside detected case names. Context-dependent entries, including `General`, `Michigan`, and `United States`, are flagged for review rather than automatically rewritten because Appendix 5 contains exceptions for those terms.

MiCite is not yet a complete formatter for every source category discussed in the manual. Current high-confidence coverage focuses on Michigan and common federal case citations, Michigan statutes, Michigan Court Rules, Michigan Rules of Evidence, selected reporter punctuation, semicolon-separated parallel citations, `Id.` citations, case-name italics, and Appendix 5 case-name abbreviations.

Future work should incorporate the entire Michigan Appellate Opinion Manual as structured rule data and add a separate curated supplemental source-format layer for sources that are not fully covered by the manual.

## Privacy Posture

- Core citation-formatting review is processed in the browser.
- Optional CourtListener parallel-citation lookup sends only extracted case-citation identifiers, not full document text.
- There is no database, account system, telemetry script, third-party script, or server-side upload handler.
- Static assets are bundled locally.
- Vercel serves static files and the optional same-origin parallel-citation lookup endpoint; user document text is not sent to Vercel for formatting.

## Local Use

Open `public/index.html` directly, or run:

```bash
npm install
npm run start
```

## Local Package

```bash
npm run package:local
```

This creates `release/micite-local.zip` at the repository root.

The local package is intentionally lightweight: plain HTML, CSS, JavaScript, and local image assets. It does not require an installer, account, database, local server, Node.js runtime, or network connection for citation-formatting review.

The local package does not include a CourtListener API token and does not require CourtListener lookup for citation-formatting review. If opened directly from local files, optional hosted lookup is unavailable.

Supported local-install platforms:

- Windows on Intel/AMD.
- macOS on Intel.
- macOS on Apple silicon.

Because the local package runs in the user's browser, MiCite does not need separate native binaries for Intel Macs, Apple silicon Macs, or Windows PCs.

## Vercel Deployment

Set the Vercel project root to `apps/micite`.

Recommended settings:

- Framework preset: Other
- Build command: empty, or `npm run build`
- Output directory: `public`
- Install command: `npm install`
- Analytics: disabled unless confirmed not to collect document content
- Environment variable: `COURTLISTENER_API_TOKEN`, stored only in Vercel project settings

Do not add serverless functions that receive document text unless the privacy model is revisited. The existing parallel-citation endpoint must accept only citation-only payloads and reject free-form `text`, `document`, `body`, `content`, `paragraph`, `sentence`, `file`, `html`, or `markdown` fields.

Before deploying, run:

```bash
npm run package:local
```

This ensures `/downloads/micite-local.zip` exists for the “Install Locally” button.

## Future Development

- Full structured coverage of the Michigan Appellate Opinion Manual.
- Curated supplemental formats for authorities outside the manual.
- Browser extensions for citation-formatting review inside web-based drafting workflows.
- Microsoft Word add-in for citation-formatting review and formatted corrections inside Word.
