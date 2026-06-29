# MiCite

Current Version: **1.0.0-Beta**

**MiCite** is a lightweight, deterministic formatting tool for source citations in legal writing filed in or prepared for Michigan courts, where guidelines differ from the Bluebook® and other citation systems. It follows the guidelines published in the Michigan Appellate Opinion Manual, https://www.courts.michigan.gov/4a4a11/siteassets/publications/manuals/msc/miappopmanual.pdf

The manual sets the standards used by the Michigan Supreme Court Office of the Reporter of Decisions when editing appellate opinions for publication. It is not mandatory for state court practice, unlike the former Michigan Uniform System of Citation it replaced, but adhering to it signals professional care and jurisdictional fluency.

**Important limitation:** MiCite is primarily a citation-formatting tool. Optional citation-only CourtListener lookup for parallel citations includes an experimental/prototype check that may report whether a reporter citation was found and may flag apparent case-name/caption mismatches when CourtListener returns usable metadata. MiCite does not verify quoted material or legal inferences, or determine whether an authority has been overruled, superseded, abrogated, vacated, distinguished, or otherwise limited.

Nothing in this README, the FAQ, public pages, documentation, or other project materials constitutes a contract, warranty, legal advice, or assumption of any duty, responsibility, or liability by the developer or Cognisint LLC.

## License

MiCite is shared under the **Functional Source License, Version 1.1, ALv2 Future License** (`FSL-1.1-ALv2`). See [LICENSE.md](LICENSE.md).

## Project Boundaries

MiCite is one tool with multiple surfaces, not multiple separate products.

This repository is the canonical source for the deployable MiCite application, including the public web app at `MiCite.online`, the downloadable local package, privacy/security copy, Vercel configuration, and the optional citation-only CourtListener supplier.

Avoiding duplicate deployable copies is intentional. MiCite contains user-facing privacy notices, security descriptions, citation-formatting behavior, and limitation-of-use disclosures, so stale copies can create real risk: one surface may have newer privacy guards, safer CourtListener lookup behavior, corrected citation rules, or an updated local package while another silently lags behind. Keeping one canonical deployable app reduces drift, makes audits easier, and gives users one source of truth for what MiCite does and does not do.

Other surfaces may call or adapt MiCite, but they should not become independent forks of the deployable app. In particular, Cyrano, LexFiat, and other current and future applications and products from Cognisint may expose a MiCite-powered MCP citation-checking tool, but the deployable MiCite web/local application will be maintained here first.

The intended boundary is:

- `MightyPrytanis/MiCite`: source of truth for the MiCite app, user-facing surfaces, privacy boundary, local package, and deployment.
- `MightyPrytanis/codebase`: source of truth for Cyrano and MCP integration. It may contain adapters or shared/imported citation-checking logic needed by Cyrano, but should not be treated as a second canonical MiCite deployment.
- Future surfaces, such as browser extensions or a Microsoft Word add-in, should reuse the same MiCite rules and privacy model rather than reimplementing citation logic independently.

If MiCite files are temporarily copied into another repository or surface for testing, the copy should be treated as temporary or generated unless a separate architectural decision is made. Privacy-sensitive changes, CourtListener lookup behavior, and citation-formatting rules should be reconciled back into this repository before release.

## Deployment

Public domain: `MiCite.online`. The hosted deployment path is Vercel connected to a public GitHub repository. This repository contains source code and deployment configuration only, not user-submitted documents, citations, reports, or corrected output.

Static deployable app: `apps/micite`. This app gives users a choice between a browser-local web formatting tool and a downloadable local-install package. The local package is intentionally lightweight: static HTML, CSS, JavaScript, and image assets only.

The local package is cross-platform because it runs in the user's browser: Windows on Intel/AMD, macOS on Intel, and macOS on Apple silicon. No native installer or architecture-specific binary is required.

Vercel's security documentation is located at <https://vercel.com/security>. Future versions of MiCite may include security enhancements like TLS 1.3, DDoS protection, specific compliance certifications, and other features, but will not document or claim such enhancements until they have been properly tested and verified for the deployed project.

The current `apps/micite` deployment is implemented as a browser-local checker with an optional same-origin parallel-citation supplier endpoint. The endpoint rejects free-form text/document payloads and accepts only extracted citation identifiers. MiCite has no account system, no database, and no third-party scripts on the checker page. The local package ZIP is generated at `apps/micite/public/downloads/micite-local.zip`.

## Supported Input
Current:
- Current: Plain text from `--text`, stdin, TXT, or MD.

Under Development:
 - *DOCX through raw-text extraction with `mammoth`.*
 - *PDF best-effort through the existing `pdf-parse` dependency.*
- *RTF*

## Citation Coverage

MiCite extracts and reports likely:

- Michigan case citations and short-form case citations.
- `Id.` / `id.` citations.
- Michigan statutes: `MCL`.
- Michigan Court Rules: `MCR`.
- Michigan Rules of Evidence: `MRE`.
- Common federal reporters used in Michigan opinions: `US`, `S Ct`, `L Ed`, `F Supp`, `F2d`, `F3d`, `F4th`.

Each finding includes the original text, citation type, line and offset, compliance status, rule or warning, suggested correction, and confidence.

## Safe Corrections

Automatic correction is intentionally conservative. MiCite safely fixes deterministic formatting issues such as:

- `Mich.` to `Mich`
- `Mich. App.` to `Mich App`
- `N.W.2d` or `NW 2d` to `NW2d`
- `N.W.3d` or `NW 3d` to `NW3d`
- `U.S.` to `US`
- `S. Ct.` to `S Ct`
- `L. Ed.` to `L Ed`
- `F.2d` or `F 2d` to `F2d`
- `M.C.L.` to `MCL`
- `M.C.R.` to `MCR`
- `v.` to `v`

MiCite warns, but does not automatically rewrite, higher-risk legal substance and style choices such as `MCLA`/`MCLS`, missing repeated `MCL` or `MCR` in ranges, hyphenated statutory ranges, and context-dependent case-name abbreviation issues.

MiCite also reports that case names should be italicized in formatted documents. The plain corrected-text panel remains plain text; the formatted-output panel applies italics to case names.

Case-name abbreviation checking includes the full Appendix 5 case-name abbreviation list from the Michigan Appellate Opinion Manual. Most entries are safe deterministic rewrites inside detected case names. Context-dependent entries, including `General`, `Michigan`, and `United States`, are flagged for review rather than automatically rewritten because Appendix 5 contains exceptions for those terms.

The web and local static interface includes a simple `Format with parallel citations` switch. When it is on, supplied parallel citations are retained and the hosted web app can generate missing parallel citation suggestions through a same-origin CourtListener supplier by sending only extracted reporter citations: volume, reporter, and page. MiCite does not send case names or document context for that lookup. The supplier uses a server-side Vercel environment variable, `COURTLISTENER_API_TOKEN`; users do not need CourtListener accounts or tokens. The local offline package does not require CourtListener lookup and does not include a CourtListener API token.

The static interface can generate three table views:

- All detected citations, with corrections where available.
- Incorrect or corrected citations only.
- A table of authorities with page indicators. Page indicators are based on form-feed page breaks in supplied plain text; otherwise they default to the citation's detected text location.

## Source-Format Coverage Status

The current checker is not yet a complete formatter for every authority category discussed in the manual. Current high-confidence coverage focuses on Michigan and common federal case citations, Michigan statutes, Michigan Court Rules, Michigan Rules of Evidence, selected reporter punctuation, semicolon-separated parallel citations, `Id.` citations, case-name italics, and Appendix 5 case-name abbreviations.

**MiCite does not verify whether an authority remains good law, has been correctly quoted, accurately supports a proposition, or has been overruled, superseded, or otherwise limited. Optional citation-only CourtListener lookup includes an experimental/prototype reporter-citation and case-name/caption check for cases, but it is not a substitute for legal research.**

Users should treat MiCite as an helpful and educational tool; they should not rely on MiCite alone for verification of authorities, quotations, and legal propositions before filing or relying on any document.

## Curated Source-Format Extensions

MiCite includes a curated source-format extension layer for selected works that may appear in legal writing. Where the Michigan Appellate Opinion Manual specifies a format, MiCite directs the user to follow the Michigan Manual format.

Where the Michigan Appellate Opinion Manual does not specify a format, MiCite may suggest unofficial extensions based on established academic, religious, classical, literary, philosophical, legal-historical, or other recognized citation conventions. These suggested unofficial extensions are intended to preserve stable internal locators and improve reader access across editions and translations. Outputs identify these suggestions as unofficial extensions rather than Michigan Manual formats.

For works with recognized internal citation systems, the suggested unofficial extension generally uses an author-first legal-writing form: `Author, Title locator.` Examples include `Plato, The Republic 514a-517a.`, `Marcus Aurelius, Meditations 2.1.`, and `Dante, Inferno 3.1-9.`

Where a translation, edition, editor, or version affects the quoted language or cited material, that information should be included in the first citation. Subsequent citations may ordinarily use the author, title, and canonical locator. Where the Michigan Appellate Opinion Manual does not specify a format and the work has no stable internal locator, MiCite should fall back to the ordinary book format.

The current curated extension layer includes examples and locator guidance for religious texts, classical works, Shakespeare and other plays, The Federalist Papers, Blackstone, Coke, Justinian, major philosophical works, and selected legal-historical works. It is advisory and under active development.

## Privacy Model

MiCite is designed around deterministic, no-retention citation-formatting review. The strongest confidentiality mode is the local-install version, where the formatting engine runs on the user's own machine and does not transmit document text to Cognisint, any LLM provider, a remote database, or a third-party citation service. The hosted web version keeps core formatting review in the browser and uses an optional citation-only lookup path for missing parallel citations.

MiCite's current citation-formatting engine does not use generative AI, large language models, or automated legal reasoning. Expanded features currently in development may use AI in limited ways, and AI assistance was used in coding MiCite. MiCite has also been designed to be compatible with AI systems using the Model Context Protocol. MiCite will never transmit user data to generative AI without user notification and opt-in.

## Installation and Use

```bash
npm run citecheck -- --jurisdiction michigan --input sample.txt --report report.json
npm run citecheck -- --jurisdiction michigan --input sample.txt --fix --output corrected.txt
npm run micite:gui
```

The GUI runs locally at `http://localhost:5177` by default. It supports paste-text input, TXT/MD upload, checking, safe correction, JSON report download, corrected-text output, and formatted HTML output with case names italicized.

The local GUI serves bundled assets from the local MiCite process. It does not load the Cognisint logo from a remote URL at runtime.

The app in `apps/micite` provides the same core interface for MiCite.online and for the offline local package. Users can paste text, upload TXT/MD files, review citation formatting, apply safe corrections, copy formatted output, download a JSON report, generate citation tables, and optionally look up missing case parallel citations. Core citation-formatting review is browser-local. Optional CourtListener lookup sends only extracted case-citation identifiers through a same-origin endpoint.
### Local-Install Guarantees

- No user accounts are required.
- No login, password, billing, or personally identifying information is required.
- Citation checking is deterministic rule-based processing, not generative AI.
- Local text input, uploaded files, reports, corrected text, and formatted output remain on the user's machine.
- The local GUI serves bundled assets, including the Cognisint footer logo, from the local MiCite process.
- MiCite does not use document text for model training, tuning, analytics, or product telemetry.

### Local data flow:

```text
[User Browser or CLI]
        |
        | 1. User supplies text or local file
        v
[Local MiCite Process]
        |
        | 2. Deterministic extraction, review, and formatting
        v
[Local Report / Corrected Text / Formatted HTML]
        |
        | 3. Output returned to the same local session
        v
[User Browser or CLI]
```

### Hosted Web-App Requirements: Vercel Connected to GitHub

A hosted version at `MiCite.online` should not simply reuse ordinary web-app defaults. If deployed through Vercel from a GitHub repository, MiCite should be configured as a no-retention request/response service with safeguards appropriate for confidential legal material:

- HTTPS-only transport.
- No accounts unless a later feature truly requires them.
- No server-side document storage by default.
- No request-body logging.
- No analytics that capture text fields, citations, uploaded document contents, or corrected output.
- No third-party scripts on the checker page.
- Strict content-security policy.
- Short request-size limits.
- Optional CourtListener lookup must receive only extracted case-citation identifiers, never full document text, uploaded files, party discussion, legal argument, notes, or surrounding citation context.
- Memory-only processing where practical.
- Immediate deletion of any temporary upload files.
- Separation between public marketing pages and the confidential checker surface.
- Dependency updates, vulnerability scanning, rate limiting, and abuse protection that do not store document contents.
- GitHub issues, pull requests, logs, and Vercel build/deployment logs must not contain client document text or confidential examples.
- Vercel environment variables should not contain user document data.
- Vercel Web Analytics, Speed Insights, or any future analytics should be configured, or omitted, so they do not collect pasted text, uploaded files, corrected output, or report contents.

### Current static hosted data flow:

```text
[User Browser]
        |
        | 1. Static MiCite files load from Vercel
        v
[Browser-Local Deterministic Formatting Engine]
        |
        | 2. No database write; no LLM call; no model training
        v
[Local Report / Corrected Text / Formatted HTML]
        |
        | 3. Output remains in the same browser session
        v
[User Browser]
```

Optional hosted CourtListener lookup flow:

```text
[User Browser]
        |
        | 1. User opts into missing parallel-citation lookup
        v
[Browser-Local Citation Extractor]
        |
        | 2. Extracted volume/reporter/page only
        v
[MiCite Same-Origin Lookup Endpoint]
        |
        | 3. Citation-only CourtListener API request
        v
[CourtListener Citation Lookup API]
        |
        | 4. Possible public parallel citations returned
        v
[User Browser]
```

## Examples

Correct:

```text
People v Albers, 258 Mich App 578; 672 NW2d 336 (2003).
Haynes v Neshewat, 477 Mich 29, 34; 729 NW2d 488 (2007).
MCL 769.1 through MCL 769.36.
MCR 3.977(E)(3) and (4), (F)(1)(c), and (H)(4).
MRE 801.
```

Corrected:

```text
People v Albers, 258 Mich. App. 578; 672 N.W.2d 336 (2003).
```

becomes:

```text
People v Albers, 258 Mich App 578; 672 NW2d 336 (2003).
```

US Supreme Court example:

```text
Brown v. Board of Education, 347 U.S. 483, 74 S. Ct. 686, 98 L. Ed. 873 (1954)
```

becomes:

```text
Brown v Bd of Ed, 347 US 483; 74 S Ct 686; 98 L Ed 873 (1954)
```
## Potential Future Expansion
As stated above, MiCite does not include comprehensive formatting review for all items covered by the Appellate Opinions Manual. The manual provides guidance for many additional source categories that may be added as structured rules before MiCite claims complete manual coverage, including: 
- Constitutions
- local charters and ordinances
- Michigan Supreme Court administrative orders
- Model Jury instructions
- Attorney General opinions
- Law reviews and journals
- Administrative decisions
- Executive orders
- Federal regulations
- Treatises and restatements
- Model codes and uniform laws
- Dictionaries
- Non-legal books and periodicals
- Internet materials

Additional curated formats outside the manual could be maintained separately from the Michigan-manual rule set. Candidate categories include religious texts, classical works, historical legal works, Shakespeare, the Odyssey, the Federalist Papers, Wikipedia, blogs, and other digital sources.

As of now, MiCite remains under development. It may, after testing and user feedback, be expanded and enhanced. Other possible future developments *may* include:

- Incorporate the entirety of the Michigan Appellate Opinion Manual formatting guidance as structured deterministic rule data, with rule-source labels and coverage status.
- Add a curated supplemental source-format layer for authorities not fully covered by the manual, separate from Michigan guidelines.
- Expand and harden accurate missing parallel-citation generation from authoritative sources.
- Browser plug-ins/extensions for checking citations inside web-based drafting workflows.
- Microsoft Word add-in for checking and applying formatted citation corrections inside Word.

If you have a request, suggestion, or wish to report an error or bug in MiCite, please contact us by email at  info@cognisint.com.
