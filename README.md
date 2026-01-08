# Portfolio Website

This is a simple static portfolio site (HTML/CSS/JS) split into logical files for easy editing and Git deployment.

## Files
- `index.html` — main page (root) ready for GitHub Pages
- `style.css` — all site styles (extracted from the original inline <style>)
- `script.js` — interactive code (extracted from the original inline <script>)

## Run locally
- Option A (quick): open `index.html` in your browser.
- Option B (recommended for working with JS modules or fetch): run a local server:
  - Python 3: `python -m http.server 8000` then visit `http://localhost:8000`
  - VS Code: use Live Server extension

## Deploy to GitHub Pages
1. Create a repository and push the `one file/` folder contents (or the whole repo with `index.html` at root).
2. In repository settings -> Pages, select the branch and `/ (root)` folder; save.
3. Your site will be served at `https://<username>.github.io/<repo>/`.

## Editing guidance
- Edit `style.css` to change look & layout.
- Edit `script.js` for interactive logic (charts, ticker, projects rendering).
  - Projects: modify the `PROJECTS` array near the top of `script.js` to add, update, or remove projects.
  - Certificates: modify the `EPAT_CERTIFICATES` array to change which certificates appear under the EPAT card.
- Icons are provided by Lucide (already loaded via CDN).
- Chart.js is included via CDN.

If you want, I can:
- Move assets to `assets/` and create a proper project structure (README, LICENSE, index at repo root).
- Add a GitHub Actions workflow to auto-deploy to Pages on push.

---
