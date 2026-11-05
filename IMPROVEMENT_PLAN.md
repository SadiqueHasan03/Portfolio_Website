# Portfolio Website - Improvement Plan
**Generated:** 2026-08-28  
**Target:** `portfolio-react/` (React 19.1.1 + Vite 7.1.2 + Tailwind 3.4.15)  
**Baseline verification:** `npm run build` ✓ (16.13s) | `npm run lint` ✗ (30 errors, 1 warning) | `npm run test:run` ✗ (7 suites failed - missing `@testing-library/dom`)

---

## 1. Executive Summary

The portfolio is functional and visually polished (glassmorphism + liquid blob theme) with good structure (components/pages/hooks/stores/utils separation, Zustand persistence, code-splitting via `React.lazy`). Build is clean and deploys to Netlify/Vercel.

Primary debt is not feature completeness but **correctness, performance, accessibility, and maintainability**:

- **Critical (P0):** Broken tests, ESLint errors blocking CI, SEO metadata missing, dead links (`"#"` in projects), CV download fragile.
- **High (P1):** Bundle not optimized (259 KB main chunk, no manualChunks), images 501 KB unoptimized, Formspree vs EmailJS config mismatch, accessibility gaps.
- **Medium/Low (P2/P3):** Content inconsistencies, design-system duplication, DX improvements.

Estimated effort to reach production-grade: **~12-16 hours** for P0+P1, **+8h** for polish.

---

## 2. Current State

### 2.1 Structure
```
portfolio-react/src/
 App.jsx:1, main.jsx:1, index.css:1
 components/{layout,sections,ui}
 pages/{Home.jsx:1, Projects.jsx:1, Contact.jsx:1, Resume.jsx:1}
 data/portfolioData.js:1
 stores/useAppStore.js:1 (zustand + persist)
 hooks/{useSystemTheme.js:1, useAnimations.js}
 utils/{helpers.js:1, navigation.js:1, performance.js:1}
 services/imageService.js:1
 public/images/{profile,projects,placeholders}
```

### 2.2 Build Output (verified)
```
dist/assets/index-S5xp2yXH.js  259.44 kB (gzip 83.85 kB)
dist/assets/index-DwcLO9m9.css  59.71 kB (gzip 9.61 kB)
dist/assets/Home-BdcXBHi7.js    20.49 kB
dist/assets/ContactSection-BMp_r3aC.js 23.51 kB
```
Single large entry chunk; no vendor split, no image compression.

### 2.3 Dependency Notes
`package.json:1` - React 19, Framer Motion 12, Zustand 5, Tailwind 3, Vitest 3. `@formspree/react:17` is used but `README.md:54` and `.env.example:1` still document EmailJS. `react-spring` is installed but never imported (unused dep).

---

## 3. Strengths to Preserve

1.  **Design system:** Glass utilities in `src/index.css:52` and `tailwind.config.js:10` are well-structured and theme-aware.
2.  **Theme persistence:** `stores/useAppStore.js:4` with `persist` + `useSystemTheme.js:4` correctly handles `system` preference and `prefers-color-scheme` listener.
3.  **Image fallback strategy:** `components/ui/ImageWithFallback.jsx:8` + `LazyImage.jsx:9` + `services/imageService.js:5` provide graceful degradation.
4.  **Navigation abstraction:** `utils/navigation.js:40` with hash sanitization `sanitizeSectionId:23` prevents XSS.
5.  **Code splitting:** `components/layout/AppRoutes.jsx:6` lazy-loads pages correctly.

---

## 4. Detailed Findings

### 4.1 Tooling & Code Quality — **31 lint issues**

| File | Line | Issue | Fix |
|------|------|-------|-----|
| `eslint.config.js:30` | `no-unused-vars` strict | `react-refresh` rule warns on non-component exports | Allow `use*` exports or configure override |
| `tailwind.config.js:187` | `require is not defined` | ESM file uses `require` | Change to `import forms from '@tailwindcss/forms'` |
| `vitest.config.js:26` | `__dirname is not defined` | ESM scope | Use `import { fileURLToPath }` or `path.resolve()` via `import.meta` |
| `src/test/setup.js:11` | `global is not defined` | Should be `globalThis` in ESM | Replace `global.` with `globalThis.` |
| `src/test/integration/fixes.test.jsx:10` | `vi is not defined`, `global` | Missing `/* global vi */` or import | `import { vi } from 'vitest'` |
| `src/components/ui/ImageWithFallback.test.jsx:105` | `Parsing error \uXXXX` | Invalid escape in test string | Fix string: `\\u` -> `\\uXXXX` |
| `src/components/layout/Header.jsx:4` | `navigationItems` unused | Dead import | Remove `import { navigationItems }` |
| `src/components/layout/Footer.jsx:11` | `isHomePage` unused | Dead variable | Remove or use for conditional logic |
| `src/components/ui/LazyImage.jsx:16` | `isInView` assigned but never used | Redundant state | Remove `isInView` or use it to gate animation |
| `src/components/ui/ProjectCard.jsx:18` | `id` unused | Destructured but not used | Use `id` as `key`/`aria-label` or remove |
| `src/services/imageService.js:128` | `width` unused | `getResizedUrl(src, width)` ignores width | Implement or prefix `_width` |
| `src/utils/performance.js:180` | `quality` unused | `generateResponsiveUrl(baseUrl, width, quality)` ignores quality | Remove param or use |
| `src/components/ui/ScrollToTop.jsx:27` | `exhaustive-deps` warning | `handleScroll` recreated each render | Wrap with `useCallback` or add to dep array |
| `public/test-navigation.js:119` | `module is not defined` | Node-style export in browser file | Convert to ESM or exclude from lint |

**Impact:** CI will fail if lint is gated. 7 test suites fail due to missing `npm` peer: `@testing-library/dom` not installed (`package.json:32` has `@testing-library/react` but transitive dep missing/resolution error).

### 4.2 Performance

| Area | Current | Issue | Improvement |
|------|---------|-------|-------------|
| **Bundle** | `vite.config.js:5` has no `build.rollupOptions` | 259 KB main bundle includes React, Framer, Zustand, all sections | Manual chunks: `vendor: react, react-dom, react-router`, `motion: framer-motion`, `ui: zustand` |
| **CSS** | `src/index.css:1` loads Google Fonts via `@import` | Render-blocking, 2 network trips | Preload via `<link rel="preconnect">` in `index.html:4` + `display=swap` already has swap, but move to HTML head |
| **Images** | `public/images/profile/perfil.png` = 501 KB | No WebP, no responsive srcset | Convert to WebP (≈ 40-70 KB), generate 320/640/960 `srcset` via `imageService.js:112`, use `vite-imagetools` |
| **Blob/Particle** | `HeroSection.jsx:25` mounts both `LiquidBlobBackground` + `ParticleBackground` + `gradientShift:45` + SVG filter `App.jsx:65` with animated turbulence | 3 concurrent infinite animations = high GPU on mobile | Gate with `prefersReducedMotion:149` and `window.matchMedia('(max-width:768px)')` to disable particles on mobile, `will-change: transform` sparingly |
| **Lazy loading** | `performance.js:107` sets rootMargin 50px but duplicates logic in `LazyImage.jsx:20` | Duplicate observers, no cleanup reuse | Consolidate to `imageService.js:79` singleton |
| **Preload** | `performance.js:202` preloads fonts as `rel=preload as=style` without `onload` handler | Blocks rendering | Use `<link rel="preload" as="style" onload="this.rel='stylesheet'">` or `rel="preconnect"` |

**LightHouse expectation now:** Performance ~70, CLS risk from `ImageWithFallback.jsx:64` placeholder absolute overlay with no `aspect-ratio`.

### 4.3 Routing & Navigation

- `data/portfolioData.js:163` defines ids `home, about, skills, services, qualification, contact` but `Footer.jsx:108` links to `/#qualifications` (plural) causing `navigation.js:94` warn "Section not found" and fallback to top.
- `Navigation.jsx:13` handles `item.href.startsWith('#')` but `portfolioData.js:164` hrefs are `#home` etc. while `Footer.jsx:89` uses `/#about` (absolute). Inconsistent handling - `navigateToSection:44` parses basePath as `targetUrl.split('#')[0]` which for `/#about` gives `/` correct, but for `#about` gives `` empty then coerced to `/` - subtle bug on nested routes like `/projects#contact` (not existent).
- No 404 handling: `AppRoutes.jsx:14` has no `path="*"` route.
- No scroll restoration: navigating `/` -> `/projects` -> back leaves scroll at previous position.

### 4.4 Content & Data

- `portfolioData.js:27` `LeetCode` key capitalized vs `linkedin`/`github` lowercase breaks `Object.entries` icon mapping fragility in `HeroSection.jsx:41`.
- `projectsData:114` all have `liveUrl: "#", githubUrl: "#"` → `ProjectCard.jsx:29` hides buttons, leaving empty `flex space-x-3` div and unreachable CTAs. Also `image: "/images/projects/honey-website.jpg"` are tiny 1-2 KB placeholder JPGs (likely broken thumbnails).
- `qualificationData:76` mixes education with "projects" under qualification; `QualificationSection.jsx` likely confuses semantics.
- `personalInfo.description:5` says "Computer Science and Engineering student" while `AboutSection.jsx:87` says "final-year B.Tech graduate, Class of 2025" - inconsistent timeline (now 2026, suggests outdated).
- `AboutSection.jsx:8` `CV_PATH = '/assets/documents/coming-soon.docx'` but `public/assets/documents/` contains both `coming-soon.docx` and `Sadique_Hasan_CV.pdf`. Download logic does `fetch HEAD` then `link.download = 'Coming soon.docx'` - spaces in filename + HEAD may fail on Netlify without CORS. User sees generic alert.
- Skills percentages (`skillsData:33` 80/75/90) are not credible and lack context.

### 4.5 Accessibility (a11y)

- No skip-to-content link.
- `Header.jsx:50` mobile toggle has `aria-label` but not `aria-expanded`.
- `SkillsSection.jsx:23` accordion button missing `aria-expanded`, `aria-controls`, and `id` association.
- `HeroSection.jsx:82` `<h1> Hi, I'm` + animated span without `aria-live="polite"` may confuse SR; pulsing `|` has no `aria-hidden`.
- `ContactSection.jsx:113` inputs have labels but no `required`, `aria-required`, or `aria-describedby` for errors; `ValidationError:120` renders but not linked via `aria-invalid`.
- `ProjectCard.jsx:50` overlay with buttons appears only on `group-hover` - keyboard users never see it (no `focus-within`).
- `ScrollToTop.jsx:69` `title` duplicates `aria-label` - OK but `disabled` during scroll removes from tab order unexpectedly.
- Contrast: glass on `bg-gradient-light:34` #f0f4ff may fail WCAG AA for `text-gray-600` on light glass.

### 4.6 SEO & Metadata

`index.html:1` is minimal:
```html
<title>Sadique Hasan</title>
```
Missing:
- `<meta name="description">`, `keywords`, `author`, `canonical`
- Open Graph (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card
- `theme-color` (dynamically set in `App.jsx:37` but not present statically - FOUC)
- `lang="en"` present but no `og:locale`
- No `robots.txt`, `sitemap.xml`, `manifest.json`, `favicon` variants
- No JSON-LD `Person` schema
- `netlify.toml:1` and `vercel.json:1` both define redirects - redundant if single host, but headers lack `Permissions-Policy` and CSP.

### 4.7 Security

- `vercel.json:19` sets `X-Frame-Options: DENY` good, but no `Content-Security-Policy`, `Strict-Transport-Security`, `Permissions-Policy`.
- Formspree endpoint `ContactSection.jsx:7` `useForm("mdkpoqpw")` is hardcoded; exposing in source is expected but should be env var `VITE_FORMSPREE_ID` per README env pattern.
- `personalInfo.email:6` exposed plain text will be scraped; consider obfuscation or click-to-reveal.

### 4.8 Testing

- All 7 suites fail due to missing dep; even after fix, coverage excludes are fine but no test for critical flows: theme toggle, navigation, CV download.
- `src/utils/propTypes.js` not shown but `Button.jsx:2` imports `ButtonPropTypes` - likely outdated vs `prop-types` package.

---

## 5. Prioritized Roadmap

### P0 — Must fix before next deploy (2-3h)

| # | Task | File(s) | Acceptance |
|---|------|---------|------------|
| P0-1 | Fix broken tests | `package.json:32`, `src/test/setup.js:11` | `npm install @testing-library/dom --save-dev` + replace `global.` → `globalThis.` , `import { vi } from 'vitest'` in `fixes.test.jsx:10` |
| P0-2 | Fix ESLint blocking errors | `tailwind.config.js:187`, `vitest.config.js:26`, `eslint.config.js:1` | Convert to ESM imports; add `languageOptions.globals` for `__dirname`, `module`, `vi`, `global`; run `npm run lint` → 0 errors |
| P0-3 | Fix Formspree vs EmailJS mismatch | `README.md:54`, `.env.example:1`, `ContactSection.jsx:7` | Update README to Formspree, move hardcoded ID to `.env` as `VITE_FORMSPREE_FORM_ID`, add fallback UI |
| P0-4 | Fix dead project links | `data/portfolioData.js:126` | Replace `"#"` with real `githubUrl`/`liveUrl` or add `status: "private"` and render "Code Private" badge; ensure `ProjectCard.jsx:29` handles empty gracefully |
| P0-5 | Fix navigation href mismatch | `Footer.jsx:108`, `data/portfolioData.js:164` | Align to `/#qualification` (singular) or change data id to `qualifications`; test anchor scroll from `/projects` |
| P0-6 | Add 404 route | `AppRoutes.jsx:14` | `Route path="*" element={<NotFound />}` with link to Home |

### P1 — High impact (4-6h)

| # | Task | Details |
|---|------|---------|
| P1-1 | SEO metadata | Add to `index.html:4`: `<meta name="description" content="Sadique Hasan — Software Engineer ...">`, OG tags, `theme-color`, `canonical`, preconnect to fonts. Create `public/robots.txt`, `public/sitemap.xml`, `public/site.webmanifest`. Add JSON-LD in `App.jsx:50` or via `react-helmet-async`. |
| P1-2 | Bundle optimization | Update `vite.config.js:5`: `build: { rollupOptions: { output: { manualChunks: { vendor: ['react','react-dom','react-router-dom'], motion: ['framer-motion'], form: ['@formspree/react'] } } }, chunkSizeWarningLimit: 500 }` Add `build: { sourcemap: false, cssCodeSplit: true }`. |
| P1-3 | Image optimization | Convert `perfil.png` (501 KB) → WebP 650w/960w via `sharp` or `vite-imagetools`. Implement `srcset` in `ImageWithFallback.jsx:74` + `width`/`height` + `aspect-ratio`. Add `loading="eager"` + `fetchpriority="high"` for hero image. |
| P1-4 | Accessibility audit | Add `aria-expanded` to `Header.jsx:50` and `SkillsSection.jsx:23`, add `aria-controls`, add `focus-within:opacity-100` to `ProjectCard.jsx:67` overlay, associate `ValidationError` via `aria-describedby`. Add skip link in `Layout.jsx:6`. |
| P1-5 | Remove dead code | Uninstall `react-spring` (`package.json:25`) if unused, delete `public/test-navigation.js` or exclude from lint, remove `react-spring` import, prune `isInView` state in `LazyImage.jsx:16`. |
| P1-6 | CV download robustness | In `AboutSection.jsx:13` use `fetch` with `cache: 'no-store'`, handle 404 by falling back to `Sadique_Hasan_CV.pdf`, fix filename to `Sadique_Hasan_CV.pdf` without spaces, add `if ('showSaveFilePicker' in window)` progressive enhancement. |

### P2 — Medium (3-4h)

| # | Task | Details |
|---|------|---------|
| P2-1 | Content refresh | Update `personalInfo:5` + `AboutSection.jsx:87` to current status (2026). Normalize `LeetCode` key to `leetcode`. Replace skill `%` with `level: 'Advanced'` or years of experience. Fill real project descriptions + tags. |
| P2-2 | UX polish | In `SkillsSection.jsx:36` change `max-h-96` to `max-h-[600px]` with `grid-rows-[0fr]` pattern to avoid clipping; add `motion.div` with `AnimatePresence`. Add empty-state illustration polish in `Projects.jsx:119`. |
| P2-3 | Performance - reduce motion | In `HeroSection.jsx:23` wrap `LiquidBlobBackground` + `ParticleBackground` with `if (!prefersReducedMotion() && !isMobile)`. Add `will-change: transform` only during animation. Throttle `Header.jsx:15` debounce 10ms → 50ms + use `requestAnimationFrame`. |
| P2-4 | Error boundaries | Wrap `App.jsx:51` with `ErrorBoundary` component; add `Suspense` fallback skeleton instead of spinner for LCP. |
| P2-5 | Env consistency | Create `.env` template with `VITE_FORMSPREE_FORM_ID`, `VITE_SITE_URL`, `VITE_GA_ID`; update `netlify.toml:7` `NODE_VERSION = "20"` (18 EOL). |

### P3 — Nice to have (2-3h)

- Migrate to Tailwind 4 or keep 3 but use `tailwind.config.js` ESM with `import`.
- Add `vitest` coverage threshold `80%` and CI workflow `.github/workflows/ci.yml` (lint + test + build).
- Add `eslint-plugin-jsx-a11y` and `eslint-plugin-import`.
- Add `unplugin-auto-import` for `react-router`? Not needed.
- Implement `View Transitions API` for route changes.
- Add analytics (Plausible) and `web-vitals` reporting to `performance.js:10` (`import { onCLS, onINP, onLCP } from 'web-vitals'`).
- Dark mode FOUC fix: inline script in `index.html:7` to set `documentElement.classList` before React mounts.
- Add `CONTRIBUTING.md`, `Lighthouse CI`.

---

## 6. Quick Wins (<15 min each)

1.  **SEO title:** `index.html:7` → `<title>Sadique Hasan — Software Engineer | Portfolio</title>` + `<meta name="description" content="Software Engineer specializing in Java, Spring Boot, React. Building scalable web apps.">`
2.  **Preconnect:** Add to `index.html:4`:
    ```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://unicons.iconscout.com">
    ```
3.  **Fix lint excludes:** `eslint.config.js:7` add `ignores: ['dist', 'public/test-navigation.js']`
4.  **Fix Heading hierarchy:** `Home.jsx:8` ensures single `h1` in Hero, others `h2`. Currently footer uses `h3` correct.
5.  **Textarea consistency:** `ContactSection.jsx:175` change `border border-gray-300 ... dark:bg-gray-700` to `glass-input` same as other inputs.
6.  **Add `rel="noopener"` already done — verify all `target="_blank"` have it (Footer, Hero).**
7.  **Year in Footer:** `Footer.jsx:7` `new Date().getFullYear()` will be 2026 - OK.
8.  **Remove console.log:** `Projects.jsx:35` `console.log('Viewing project...')` should be removed or gated by `import.meta.env.DEV`.

---

## 7. Code Fixes — Copy-Paste Ready

### 7.1 `vite.config.js` — optimized
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          form: ['@formspree/react'],
          state: ['zustand']
        }
      }
    },
    chunkSizeWarningLimit: 500
  }
})
```

### 7.2 `index.html` — SEO head
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Sadique Hasan — Software Engineer (Java, Spring Boot, React). CSE graduate 2025 building scalable web apps and solving 70+ LeetCode problems." />
  <meta name="author" content="Sadique Hasan" />
  <link rel="canonical" href="https://sadiquehasan.dev/" />
  <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)">
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Sadique Hasan — Software Engineer" />
  <meta property="og:description" content="Portfolio of Sadique Hasan, Software Engineer." />
  <meta property="og:image" content="/images/profile/perfil.png" />
  <meta property="og:url" content="https://sadiquehasan.dev/" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" type="image/svg+xml" href="/images/profile/perfil.png" />
  <title>Sadique Hasan — Software Engineer | Portfolio</title>
</head>
```

### 7.3 `tailwind.config.js` — ESM
```js
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [typography, forms],
}
```

### 7.4 `vitest.config.js` — __dirname fix
```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export default defineConfig({
  plugins: [react()],
  test: { globals: true, environment: 'jsdom', setupFiles: ['./src/test/setup.js'] },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})
```

### 7.5 `eslint.config.js` — globals fix
```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
export default [
  { ignores: ['dist', 'public/test-navigation.js'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, __dirname: 'readonly', global: 'readonly', vi: 'readonly', module: 'readonly' },
    },
    // ...
  }
]
```

### 7.6 `.env.example` — Formspree
```
VITE_FORMSPREE_FORM_ID=mdkpoqpw
VITE_SITE_URL=https://sadiquehasan.dev
```

Then `ContactSection.jsx:7`:
```js
const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_FORM_ID);
```

### 7.7 `ContactSection.jsx` — textarea fix
Change line 175 class to `glass-input` to match `src/index.css:221`.

---

## 8. Verification Checklist

- [ ] `npm run lint` → 0 errors
- [ ] `npm run test:run` → all suites pass, coverage > 60%
- [ ] `npm run build && npx serve dist` → no 404 on refresh `/projects`, `/resume`
- [ ] Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95
- [ ] `axe-core` scan: 0 violations on Home, Projects, Contact
- [ ] Images: WebP served, `perfil.png` < 80 KB, LCP < 2.5s on Fast 3G
- [ ] Keyboard nav: Tab through Header → Hero CTA → About → Skills accordion (Enter/Space) → Projects → Contact → Footer → ScrollToTop
- [ ] Theme toggle persists after reload, respects `prefers-color-scheme`
- [ ] CV download works with JS disabled? Fallback `<a href="/assets/documents/Sadique_Hasan_CV.pdf" download>` in `<noscript>`

---

## 9. Effort & Impact Matrix

| Priority | Effort | Impact | ROI |
|----------|--------|--------|-----|
| P0 | Low (2-3h) | High (fixes broken CI, dead links, SEO) | **High** |
| P1 | Medium (4-6h) | High (perf, a11y, bundle) | **High** |
| P2 | Medium (3-4h) | Medium (content, UX) | Medium |
| P3 | Low-Med (2-3h) | Low-Med (DX, analytics) | Low |

**Recommended sprint:** P0 this week, P1 next, P2+P3 backlog.

---

## 10. References (files analyzed)

- `portfolio-react/package.json:1` `index.html:1` `vite.config.js:1` `tailwind.config.js:1` `eslint.config.js:1` `netlify.toml:1` `vercel.json:1` `vitest.config.js:1`
- `src/App.jsx:1` `src/main.jsx:1` `src/index.css:1` `src/data/portfolioData.js:1`
- `src/components/layout/*:1` `src/components/sections/*:1` `src/components/ui/*:1` `src/pages/*:1` `src/stores/useAppStore.js:1` `src/hooks/*:1` `src/utils/*:1` `src/services/imageService.js:1`
- Verified via `npm run build` (✓) and `npm run lint` (✗ 31), `npm run test:run` (✗).

---

**Next step:** Create GitHub issues from P0 table and assign to milestone `v1.1 - Production Hardening`. The file is intentionally actionable — each item maps to a single file + line for easy PR diffing.
