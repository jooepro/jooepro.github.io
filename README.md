# Yousef Shaban — Personal Portfolio

A static, responsive personal portfolio built for **GitHub Pages** and the custom domain **jooe.pro**.

## Publish on GitHub Pages

1. Upload everything in this folder to the root of your `ujooe.github.io` repository.
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then save.
5. Under **Custom domain**, enter `jooe.pro`.
6. Once DNS is ready, enable **Enforce HTTPS**.

The included `CNAME` file tells GitHub Pages to use `jooe.pro`. Keep it in the repository root.

## Edit your information

Most content is in `index.html`. Search for these items:

- **Name and introduction:** search for `Yousef Shaban` and the hero introduction.
- **Biography:** edit the paragraphs inside `<section id="about">`.
- **Birth date:** update both the visible date in `index.html` and `birthDate` in `script.js`. JavaScript calculates the age automatically. Months use zero-based numbering, so December is `11`.
- **Location:** search for `Cairo, Egypt`.
- **Projects:** each `<article class="project-card">` is one project. Replace its title, category, description, tools, and `href="#"` with your real project URL.
- **Experience:** edit the three `<article class="timeline-item">` entries.
- **Skills and services:** edit the text in the `skills` and `services` sections.
- **Testimonials:** replace all placeholder quotes and names before publishing them as real testimonials.
- **Email:** replace both appearances of `hello@jooe.pro` with your actual email.
- **Social links:** replace each `href="#"` in the contact section with your profile URL.

## Add project images

The current project images are original CSS compositions, so the page works without image files. To use your own image:

1. Put an optimized `.webp` or `.avif` image in `assets/projects/`.
2. Inside the relevant `.project-visual`, replace the placeholder markup with:

```html
<img src="assets/projects/my-project.webp" alt="Short description of the project" loading="lazy">
```

3. Add this CSS if needed:

```css
.project-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

Aim for images under 300 KB when practical.

## Change colors and typography

Open `styles.css`. The editable design variables are at the top in `:root` and `[data-theme="light"]`:

- `--bg`: page background
- `--surface`: card/section background
- `--text`: main text
- `--muted`: secondary text
- `--accent`: main highlight color
- `--orange`: secondary accent
- `--font-display` and `--font-mono`: typefaces

The site uses free Google Fonts. If you want no external font request, remove the Google Fonts links from `index.html`; the CSS includes system fallbacks.

## SEO and sharing

Edit the description and Open Graph tags near the top of `index.html`. The starter social preview is `assets/social-preview.svg`. For broader social-network compatibility, export it as a 1200×630 PNG and update `og:image`.

## Files

- `index.html` — content and page structure
- `styles.css` — design, layout, themes, and responsive behavior
- `script.js` — age/year calculation and interactions
- `assets/favicon.svg` — browser icon
- `assets/social-preview.svg` — sharing preview artwork
- `CNAME` — custom GitHub Pages domain
- `.nojekyll` — serves the static files directly

No build command, database, environment variable, or paid service is required.
