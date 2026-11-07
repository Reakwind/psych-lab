# Self-hosted fonts

The website serves its own copies of the four Google Fonts families the canvases load, so it works offline. `fonts.css` is the Google Fonts stylesheet for each family, with its file links pointed at the copies here.

| Family | Files | Subsets | Licence |
| --- | --- | --- | --- |
| Rubik (Hebrew program text) | `rubik-*.woff2` | Hebrew, Latin, Latin Extended | SIL Open Font License 1.1, `LICENSE-rubik.txt` |
| Atkinson Hyperlegible Next (body text in the original design system) | `atkinson-hyperlegible-next-*.woff2` | Latin, Latin Extended | SIL Open Font License 1.1, `LICENSE-atkinsonhyperlegiblenext.txt` |
| Google Sans Flex (display text in the original design system) | `google-sans-flex-*.woff2` | Latin, Latin Extended | SIL Open Font License 1.1, `LICENSE-googlesansflex.txt` |
| Material Symbols Rounded (app icons) | `material-symbols-rounded-fallback.woff2` | Only the icons the app prototype shows (listed in `fonts.css`) | Apache License 2.0, `LICENSE-material-symbols.txt` |

Downloaded from fonts.googleapis.com on 2026-11-06; licence texts from the google/fonts and google/material-design-icons repositories. If the app prototype starts using another icon, request the subset again with that icon added to `icon_names`, or the icon shows as its name.
