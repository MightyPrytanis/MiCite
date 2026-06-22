# MiCite

MiCite is a deterministic Michigan legal citation-formatting tool for legal writing that should follow Michigan citation style under the Michigan Appellate Opinion Manual.

**Initial beta version:** This repository contains the initial beta release of MiCite. It is ready for small-group real-world testing, but users should expect edge cases, missed citations, and formatting suggestions that require professional review.

**Important limitation:** MiCite checks citation **format** only. It does not validate that a cited case or source exists, verify quoted material or legal inferences, or determine whether an authority has been overruled, superseded, abrogated, vacated, distinguished, or otherwise limited. MiCite is a formatting tool, not a cite-checking or legal-research tool.

## App

The deployable static app is in:

`apps/micite`

For Vercel, set the project root to `apps/micite` and the output directory to `public`.

## License

MiCite is shared under the Functional Source License, Version 1.1, ALv2 Future License (`FSL-1.1-ALv2`). See [LICENSE.md](LICENSE.md).

GitHub may not offer FSL as a setup-template option; the repository includes the license text directly.
