# Product Requirements Document  
**Project Title:** SEO Tag Visualizer MVP  

---

## Project Overview  
Build a web app that lets users quickly check and visualize SEO meta tags for any website. The app fetches HTML, extracts metadata, and provides clear, visual feedback aligned with SEO best practices. It also generates **Google search** and **social media previews** so users can confirm how their content appears externally.  

---

## Type of Project  
Web Application • SEO Utility • Data Visualization  

---

## Skills Required (Industry Best Practices)  

- **Backend Development**  
  - **Python (FastAPI)** for a lightweight API service to fetch and parse HTML.  
  - Proficiency with **Requests** (HTTP calls) and **BeautifulSoup4** (HTML parsing).  
  - Strong error handling, retries, and rate limiting for robust URL fetching.  

- **SEO Knowledge**  
  - Deep understanding of **Google SEO best practices** (title tags, meta descriptions, robots directives).  
  - Knowledge of **Open Graph** and **Twitter Card** metadata for accurate social previews.  
  - Familiarity with **SEO scoring frameworks** (inspired by tools like Google Lighthouse).  

- **Frontend Development**  
  - **React** for building an interactive, responsive user interface.  
  - Experience with **React Hooks** and **Context API** for state management.  
  - Use of **Tailwind CSS** for rapid, consistent styling.  

- **Data Visualization & UI/UX**  
  - Ability to design **color-coded scoring systems** (e.g., red = missing, green = valid).  
  - Experience creating **preview components** that closely replicate Google search results and social share cards.  
  - Awareness of **WCAG accessibility standards** to ensure inclusive design.  

---

## Key Features  
1. **URL Input & Fetching** – User enters a URL → app fetches HTML.  
2. **Metadata Extraction** – Parse key SEO tags:  
   - `<title>`  
   - `<meta name="description">`  
   - `<meta name="robots">`  
   - Open Graph tags (`og:title`, `og:description`, `og:image`)  
   - Twitter Card tags (`twitter:title`, `twitter:description`, `twitter:image`)  
3. **Scoring System (0–100)** – Weighted score based on tag presence, length, and alignment with SEO best practices.  
4. **Interactive Visualization** – Show parsed tags in clean, color-coded UI (green = correct, red = issues).  
5. **Previews** – Generate simulated previews:  
   - Google search snippet  
   - Facebook/Twitter share card  

---

## User Flow  
1. Enter a website URL.  
2. App fetches and analyzes HTML.  
3. User sees:  
   - **Score (0–100)**  
   - **Visual tag breakdown**  
   - **Google & social previews**  
4. Issues are highlighted for quick fixes.  

---

## Design Patterns  
- **Transparency** – Show exactly what was extracted and why it matters.  
- **Familiarity** – Use previews that mimic real Google/social layouts.  
- **Speed & Simplicity** – One-click insight without sign-up or complexity.  
- **Visual Feedback** – Use color coding for instant clarity.  

---

## Target Audience & Value  
- **Audience:** SEO specialists, marketers, small business owners, and developers.  
- **Value:** Immediate, actionable insight into whether SEO tags are properly implemented, with no bloat or distractions.  

---

## Non-Goals  
- No advanced audits (schema, backlinks, page speed).  
- No bulk analysis.  
- No exports or API integrations.  

---

✅ **Scope locked for MVP:** fetch → analyze → score → preview.  
