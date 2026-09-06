# Overdrive Utility

Public website for **Overdrive Labs** — one place for every app and game, plus
support pages. Served by GitHub Pages at
<https://overdrivelabs998.github.io/OverdriveUtility/>.

| Page | File | What it is |
|---|---|---|
| Home | `index.html` | Hub listing apps (DriveMeter, DriveVolt, OBD2 Easy) and games (Pixel Putt) |
| TOU Calendar | `tou.html` | ปฏิทิน Off-Peak TOU 2569 — mobile-friendly, live Peak/Off-Peak status, browser reminders, `.ics` export, print A4 |
| Connect | `connect.html` | Store links, privacy policies, contact channels, deep-link parameters |
| Feedback | `feedback.html` | Bug / suggestion form — opens the visitor's email app, nothing is collected |
| Terms | `terms.html` | Terms of use (Thai + English) |

Static HTML only: no build step, no external scripts or fonts, nothing that
phones home. Editing a file and pushing to `main` is the whole deployment.

## GitHub Pages setup

Repository → **Settings → Pages** → Source: *Deploy from a branch* →
Branch `main`, folder `/ (root)`. `.nojekyll` is present so files are served as-is.

## Language

Every page is Thai by default with an **EN** toggle (top right). Text lives in
`data-th` / `data-en` attributes; `assets/site.js` swaps them and remembers the
choice in `localStorage`. Add `?lang=en` to a URL to force a language.

## Deep links from apps

```
feedback.html?app=DriveVolt&v=1.8.1(2010)&d=Pixel%207&lang=th
```

`app` preselects the product, `v` and `d` are appended to the email body.

## TOU reminders

- **Browser notifications** — work while `tou.html` is open or installed to the
  home screen (PWA via `manifest.webmanifest` + `sw.js`). Checked every 30 s.
- **`.ics` export** — generates a calendar for the whole year with `VALARM`
  entries, so reminders fire from the phone's calendar even with the site closed.
- Holidays are hard-coded for 2026 (พ.ศ. 2569) in `tou.html`; update the
  `holidays` map and `YEAR` for a new year.
