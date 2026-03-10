# Multi-Purpose Website -- Tinaht

## Overview

**Site Name:** Tinaht
**Domain:** [https://tinaht.com](https://tinaht.com)
**Tech Stack:** HTML, CSS, JavaScript (React for dynamic features)
**Hosting/Deployment:** Netlify (static site hosting with CI/CD)
**Design:** Modern, clean, professional -- dark theme with blue and gray colors

Tinaht is a responsive, multi-purpose website for a technology solutions provider specializing in computer science. The site serves as a portfolio, business hub, e-commerce storefront, and blog -- targeting startups and businesses needing scalable, secure, and high-performance networking infrastructure.

---

## Project Scope

The website will include four major sections:

1. **Portfolio** -- Showcase projects with images and descriptions
2. **Business** -- Company overview, services page, and contact form
3. **E-Commerce** -- Product listings, shopping cart, and secure checkout
4. **Blog** -- Articles and updates

All sections share a unified design system, navigation, and responsive layout.

---

## Site Map

```
Home (/)
|
+-- Portfolio (/portfolio)
|   +-- Project Detail (/portfolio/:slug)
|
+-- Business
|   +-- About (/about)
|   +-- Services (/services)
|   +-- Contact (/contact)
|
+-- Shop (/shop)
|   +-- Product Detail (/shop/:slug)
|   +-- Cart (/cart)
|   +-- Checkout (/checkout)
|   +-- Order Confirmation (/checkout/confirmation)
|
+-- Blog (/blog)
|   +-- Article Detail (/blog/:slug)
|   +-- Category Filter (/blog?category=:name)
|
+-- Legal
    +-- Privacy Policy (/privacy)
    +-- Terms of Service (/terms)
    +-- Refund Policy (/refund-policy)
```

### Primary Navigation

| Label     | Path         | Notes                        |
|-----------|--------------|------------------------------|
| Home      | `/`          | Landing page with all highlights |
| Portfolio | `/portfolio` | Project showcase             |
| Services  | `/services`  | Core business offerings      |
| Shop      | `/shop`      | Product catalog              |
| Blog      | `/blog`      | Articles and updates         |
| Contact   | `/contact`   | Contact form + info          |

---

## Section Plans

### 1. Portfolio Section

**Purpose:** Showcase completed and ongoing engineering projects to build credibility and attract clients.

#### Pages
- **Portfolio Index** (`/portfolio`) -- Filterable grid of all projects
- **Project Detail** (`/portfolio/:slug`) -- Full project page

#### Portfolio Index Features
- Responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
- Filter bar by category (AI Automation, Hosting & DevOps, Networking, Cybersecurity, Web Optimization)
- Each card displays:
  - Project thumbnail image
  - Project title
  - Short description (2-3 lines, truncated)
  - Category tag
  - "View Project" link
- Hover effect: subtle scale + shadow lift
- Lazy loading for images

#### Project Detail Features
- Hero image / banner (full-width)
- Project title and category badge
- Client name (optional, with permission)
- Challenge / Solution / Result format
- Image gallery (lightbox on click)
- Technologies used (tag pills)
- Related projects carousel at bottom
- Back to portfolio link

#### Data Structure (per project)
```
{
  slug, title, category, thumbnailUrl,
  heroImageUrl, shortDescription, fullDescription,
  challenge, solution, result,
  gallery: [imageUrls],
  technologies: [strings],
  clientName, completionDate
}
```

---

### 2. Business Section

**Purpose:** Present the company, its services, and provide a way for clients to get in touch.

#### Pages
- **About** (`/about`) -- Company story and team
- **Services** (`/services`) -- Detailed service offerings
- **Contact** (`/contact`) -- Contact form and information

#### About Page Features
- Company story / mission statement
- Founder / team section with photos and bios
- Key statistics (projects completed, years experience, clients served)
- Animated counter for stats on scroll into view
- Timeline of company milestones (optional)
- Testimonials carousel with client quotes, names, and company logos

#### Services Page Features
- Hero section with tagline
- **3 Core Service Pillars** highlighted at the top:

| #  | Core Pillar                        | Description                                                              |
|----|------------------------------------|--------------------------------------------------------------------------|
| 1  | AI Automation Agency               | End-to-end AI-powered automation solutions for businesses.               |
| 2  | Managed Hosting + DevOps           | Reliable hosting, deployment pipelines, and infrastructure management.   |
| 3  | Network Infrastructure Consulting  | Expert consulting for scalable, secure network architecture.             |

- **7 Service Cards** with detailed offerings:

| #  | Service                          | Description                                                                        |
|----|----------------------------------|------------------------------------------------------------------------------------|
| 1  | Local IT Infrastructure Services | Set up networks, routers, switches, and on-premise infrastructure.                 |
| 2  | Website Speed Optimization       | Fix slow websites, performance tuning, and full redesigns.                         |
| 3  | AI Chatbot Builder               | Install and configure AI-powered chatbots on websites.                             |
| 4  | Data Dashboard Service           | Turn raw data into interactive, actionable dashboards.                             |
| 5  | Automation Agency                | Automate business workflows to save time and reduce errors.                        |
| 6  | Cybersecurity Consulting         | Vulnerability scanning, network security setup, and threat assessment.             |
| 7  | Managed Hosting Service          | Docker deployment, automated backups, and 24/7 monitoring.                         |

- Each service expandable to show detailed breakdown, process steps, and pricing tiers
- "Request a Quote" CTA button per service
- FAQ accordion at the bottom

#### Contact Page Features
- Contact form fields: Name, Email, Phone, Company, Service Interest (dropdown), Message
- Client-side validation (required fields, email format)
- Server-side form handler via Netlify Forms (built-in, no backend needed)
- Success / error feedback messages
- Company contact details sidebar:
  - Email address
  - Phone number
  - Business hours
  - Office address with embedded map (Google Maps / OpenStreetMap)
- Social media links

---

### 3. E-Commerce Section

**Purpose:** Sell networking products, equipment, and service packages online.

#### Pages
- **Shop Index** (`/shop`) -- Product catalog
- **Product Detail** (`/shop/:slug`) -- Individual product page
- **Cart** (`/cart`) -- Shopping cart review
- **Checkout** (`/checkout`) -- Payment and shipping
- **Order Confirmation** (`/checkout/confirmation`) -- Post-purchase summary

#### Shop Index Features
- Product grid (3 columns desktop, 2 tablet, 1 mobile)
- Sidebar filters: category, price range, availability
- Sort options: price low-high, high-low, newest, popular
- Search bar for products
- Each product card:
  - Product image
  - Name and short description
  - Price (with sale price strike-through if applicable)
  - "Add to Cart" button
  - Star rating (if reviews exist)
- Pagination or infinite scroll

#### Product Detail Features
- Image gallery with thumbnails and zoom
- Product name, price, SKU
- Full description with specs table
- Quantity selector
- "Add to Cart" button (prominent)
- Stock availability indicator
- Product reviews section (star rating + written reviews)
- Related products carousel

#### Cart Features
- Item list: thumbnail, name, quantity (adjustable), unit price, subtotal
- Remove item button
- Cart summary: subtotal, tax estimate, shipping estimate, total
- "Continue Shopping" and "Proceed to Checkout" buttons
- Cart persisted in localStorage (or session)
- Cart icon in header with item count badge

#### Checkout Features
- Multi-step form:
  1. Shipping information (name, address, city, state, zip, country)
  2. Shipping method selection
  3. Payment (credit card via Stripe integration)
  4. Order review and confirm
- Progress indicator bar
- Order summary sidebar (sticky on desktop)
- Input validation at each step
- SSL/HTTPS required
- PCI-compliant payment handling (Stripe Elements / Checkout)

#### Order Confirmation Features
- Order number and summary
- Estimated delivery date
- Confirmation email trigger
- "Continue Shopping" and "Track Order" links

#### Data Structure (per product)
```
{
  slug, name, category, price, salePrice,
  images: [urls], thumbnailUrl,
  shortDescription, fullDescription,
  specs: { key: value },
  sku, stockQuantity, inStock,
  rating, reviewCount,
  relatedProducts: [slugs]
}
```

---

### 4. Blog Section

**Purpose:** Publish articles, tutorials, industry news, and company updates to drive organic traffic and establish authority.

#### Pages
- **Blog Index** (`/blog`) -- All articles with pagination
- **Article Detail** (`/blog/:slug`) -- Full article page

#### Blog Index Features
- Featured/latest article hero at top (large card)
- Article grid below (2 columns desktop, 1 mobile)
- Each card: featured image, title, excerpt, author, date, category tag, read time
- Category filter tabs (Tutorials, Industry News, Company Updates, Case Studies)
- Pagination (numbered, 6-9 articles per page)
- Search bar
- Sidebar (desktop): recent posts, categories list, newsletter signup

#### Article Detail Features
- Hero image (full-width)
- Title, author with avatar, publish date, read time, category
- Rich content body (headings, paragraphs, images, code blocks, blockquotes)
- Table of contents (auto-generated from headings, sticky sidebar on desktop)
- Social sharing buttons (Twitter/X, LinkedIn, Facebook, copy link)
- Author bio box at bottom
- Related articles section
- Comments section (optional -- Disqus or custom)
- Previous / Next article navigation

#### Data Structure (per article)
```
{
  slug, title, excerpt, content (HTML/Markdown),
  featuredImageUrl, author: { name, avatarUrl, bio },
  category, tags: [strings],
  publishDate, updatedDate, readTime
}
```

---

## Homepage Layout Plan

The homepage acts as a gateway to all four sections with highlight previews.

| Order | Section              | Content                                                  |
|-------|----------------------|----------------------------------------------------------|
| 1     | Hero Banner          | Tagline, subtitle, CTA buttons ("Our Services" / "Shop Now") |
| 2     | About Intro          | Brief company intro with "Learn More" link to About page |
| 3     | Featured Services    | Top 3 services as cards with icons and short descriptions|
| 4     | Portfolio Highlights | 3 featured projects in a responsive grid                 |
| 5     | Shop Highlights      | 4 featured/new products in a carousel or grid            |
| 6     | Blog Latest          | 3 latest articles as cards                               |
| 7     | Testimonials         | Client testimonials carousel                             |
| 8     | Newsletter CTA       | Email signup banner                                      |
| 9     | Footer               | Navigation, social links, contact info, copyright        |

---

## Design System

### Color Palette

| Token               | Hex       | Role                                        |
|----------------------|-----------|---------------------------------------------|
| `--color-primary`    | `#3296ff` | Primary blue (CTA, links, active states)    |
| `--color-primary-dark`| `#003174`| Dark blue (hover, gradient end)             |
| `--color-white`      | `#ffffff` | Headings on dark backgrounds                |
| `--color-gray-100`   | `#f7fafc` | Light backgrounds, card backgrounds         |
| `--color-gray-200`   | `#edf2f7` | Borders, dividers                           |
| `--color-gray-300`   | `#e2e8f0` | Input borders, subtle dividers              |
| `--color-gray-400`   | `#cbd2d9` | Placeholder text, disabled states           |
| `--color-gray-500`   | `#718096` | Secondary text, captions                    |
| `--color-gray-700`   | `#2d3748` | Card borders on dark, secondary headings    |
| `--color-gray-800`   | `#252c39` | Dark body background                        |
| `--color-gray-900`   | `#1a202c` | Darkest background (header, footer, panels) |
| `--color-success`    | `#48bb78` | Success messages, in-stock indicators       |
| `--color-warning`    | `#ecc94b` | Warnings, low-stock indicators              |
| `--color-error`      | `#fc8181` | Error messages, form validation             |

**Primary Gradient:** `linear-gradient(130deg, #3296ff 0%, #003174 100%)`

### Typography

| Element        | Font Family       | Weight | Size   | Notes             |
|----------------|-------------------|--------|--------|-------------------|
| Body           | Libre Baskerville | 400    | 17px   | Serif, readable   |
| Headings       | Libre Franklin    | 700    | varies | Sans-serif, bold  |
| H1             | Libre Franklin    | 700    | 36px   |                   |
| H2             | Libre Franklin    | 700    | 30px   |                   |
| H3             | Roboto Condensed  | 500    | 22px   |                   |
| H4             | Libre Franklin    | 500    | 18px   |                   |
| Site Title     | Montserrat        | 800    | 26px   | Uppercase         |
| Navigation     | Montserrat        | 500    | 15px   |                   |
| Buttons        | Montserrat        | 600    | 15px   | Uppercase         |
| Small / Caption| Libre Franklin    | 400    | 13px   |                   |

**Google Fonts:** Libre Baskerville, Libre Franklin, Montserrat, Roboto Condensed

### Component Styles

#### Buttons
- **Primary:** Blue gradient background, white text, rounded (8px), hover shadow lift
- **Secondary:** Transparent with blue border, blue text, hover fill
- **Destructive:** Red background for remove/delete actions (cart)
- **All:** 12px 28px padding, smooth transition (0.3s)

#### Cards
- Background: `--color-gray-900` (dark) or `--color-white` (light sections)
- Border: 1px solid `--color-gray-700`
- Border-radius: 12px
- Hover: translateY(-4px) + box-shadow
- Padding: 24px

#### Form Inputs
- Background: `--color-gray-800`
- Border: 1px solid `--color-gray-700`, focus: `--color-primary`
- Border-radius: 8px
- Padding: 12px 16px
- Placeholder color: `--color-gray-400`

#### Section Separators
- SVG wave/slant dividers between major sections (carried over from current design)

### Layout
- **Max content width:** 1290px
- **Grid gap:** 24px (desktop), 16px (mobile)
- **Section padding:** 80px vertical (desktop), 48px (mobile)

---

## Responsive Breakpoints

| Name    | Width   | Layout Changes                                          |
|---------|---------|---------------------------------------------------------|
| Desktop | > 1024px| Full navigation, multi-column grids, sidebars visible   |
| Tablet  | 768-1024px| Condensed nav, 2-column grids, sidebars collapse      |
| Mobile  | < 768px | Hamburger menu, single-column, stacked layouts          |

### Mobile-Specific
- Sticky header with hamburger menu drawer
- Touch-friendly tap targets (min 44px)
- Bottom sticky "Add to Cart" bar on product pages
- Swipeable carousels for testimonials and related items
- Collapsible filter panels on shop and portfolio

---

## SEO Strategy

### On-Page SEO
- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- Unique `<title>` and `<meta name="description">` per page
- Proper heading hierarchy (single H1 per page, logical H2-H6 nesting)
- Alt text on all images
- Canonical URLs on all pages
- Clean, descriptive URL slugs

### Structured Data (Schema.org / JSON-LD)
- `Organization` -- company info on all pages
- `WebSite` with `SearchAction` -- sitewide search
- `Service` -- each service on the services page
- `Product` -- each product with price, availability, reviews
- `BlogPosting` -- each blog article with author, date, image
- `BreadcrumbList` -- breadcrumb navigation on all inner pages
- `LocalBusiness` -- contact page with address, hours, phone

### Technical SEO
- Sitemap.xml (auto-generated)
- Robots.txt
- Open Graph and Twitter Card meta tags per page
- Lazy loading images with proper `width`/`height` attributes
- Minified CSS/JS bundles
- Gzip/Brotli compression
- Preconnect to Google Fonts
- Core Web Vitals optimization (LCP, FID, CLS targets)

---

## Technical Architecture

### Option A: Static HTML/CSS/JS (Simpler)
```
/
+-- index.html
+-- portfolio/index.html
+-- services/index.html
+-- about/index.html
+-- contact/index.html
+-- shop/index.html
+-- blog/index.html
+-- cart/index.html
+-- checkout/index.html
+-- css/
|   +-- global.css
|   +-- components.css
|   +-- portfolio.css
|   +-- shop.css
|   +-- blog.css
|   +-- responsive.css
+-- js/
|   +-- main.js
|   +-- cart.js
|   +-- checkout.js
|   +-- portfolio-filter.js
|   +-- blog-filter.js
+-- assets/
|   +-- images/
|   +-- icons/
|   +-- fonts/
+-- data/
    +-- projects.json
    +-- products.json
    +-- articles.json
```

### Option B: React SPA (Dynamic)
```
/src
+-- components/
|   +-- layout/ (Header, Footer, Navigation, Sidebar)
|   +-- ui/ (Button, Card, Modal, Input, Badge, Carousel)
|   +-- portfolio/ (ProjectCard, ProjectGrid, ProjectFilter)
|   +-- business/ (ServiceCard, TeamMember, Testimonial, ContactForm)
|   +-- shop/ (ProductCard, ProductGrid, CartItem, CheckoutForm)
|   +-- blog/ (ArticleCard, ArticleGrid, TableOfContents, AuthorBio)
+-- pages/
|   +-- Home, Portfolio, ProjectDetail
|   +-- About, Services, Contact
|   +-- Shop, ProductDetail, Cart, Checkout, Confirmation
|   +-- Blog, ArticleDetail
|   +-- Privacy, Terms
+-- context/ (CartContext, ThemeContext)
+-- hooks/ (useCart, useProducts, useArticles)
+-- data/ (projects.json, products.json, articles.json)
+-- styles/ (CSS modules or styled-components)
+-- utils/ (formatPrice, slugify, seo helpers)
+-- App.jsx
+-- index.jsx
```

### Recommended: Option A for initial build
Start with HTML/CSS/JS for simplicity and SEO friendliness. Introduce React components selectively for dynamic features (cart, checkout, filtering) using embedded script bundles if needed.

---

## Deployment -- Netlify

### Why Netlify
- Free tier covers static sites with custom domains and SSL
- Built-in CI/CD: auto-deploys on Git push
- Netlify Forms for contact form submissions (no backend server)
- Edge CDN for fast global delivery
- Easy custom domain setup (tinaht.com)
- Serverless functions available if needed (e.g., Stripe checkout handler)

### Deployment Setup
- [ ] Create Netlify account and link to Git repository
- [ ] Configure custom domain (tinaht.com) with DNS settings
- [ ] Enable HTTPS / SSL certificate (automatic via Let's Encrypt)
- [ ] Set up build command and publish directory
- [ ] Configure Netlify Forms on contact page (`data-netlify="true"`)
- [ ] Add `_redirects` or `netlify.toml` for clean URLs and SPA routing
- [ ] Set up deploy previews for pull requests (optional)

### Netlify Configuration (`netlify.toml`)
```toml
[build]
  publish = "/"
  # command = "npm run build"  # if using a build step

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Serverless Functions (for e-commerce)
- Stripe payment processing via Netlify Functions (`/.netlify/functions/`)
- Order confirmation email trigger
- No separate server or hosting needed

---

## Third-Party Integrations

| Service              | Purpose                          | Notes                          |
|----------------------|----------------------------------|--------------------------------|
| Stripe               | Payment processing               | Stripe Elements for PCI compliance |
| Google Maps          | Embedded map on contact page     | Or OpenStreetMap for free      |
| Netlify Forms        | Contact form backend             | Built-in with Netlify hosting  |
| Google Analytics 4   | Traffic and behavior analytics   | With cookie consent banner     |
| Disqus (optional)    | Blog comments                    | Or custom solution             |
| Mailchimp (optional) | Newsletter signup                | Embedded form                  |

---

## Assets (Existing)

| File                                        | Purpose            |
|---------------------------------------------|---------------------|
| `5B4178E1-D91C-4751-85A3-041F66D5D3FB.png` | Favicon / site icon |
| `Logov6.png`                                | Logo version 6      |
| `logov7.png`                                | Logo version 7      |
| `tinaht.html`                               | Current homepage     |

### Assets Needed
- Portfolio project images (thumbnails + detail images)
- Product photos (multiple angles per product)
- Team member headshots
- Client logos for testimonials
- Blog featured images
- Service icons (SVG preferred)
- Social media Open Graph image (1200x630)

---

## Build Phases

### Phase 1: Foundation
- [ ] Set up project structure (HTML/CSS/JS)
- [ ] Create global stylesheet with design tokens (colors, typography, spacing)
- [ ] Build shared layout components (header, footer, navigation)
- [ ] Implement responsive navigation with mobile hamburger menu
- [ ] Create reusable card and button component styles
- [ ] Set up SVG section separators

### Phase 2: Homepage
- [ ] Hero banner with gradient and CTA buttons
- [ ] About intro section
- [ ] Featured services section (3 cards)
- [ ] Portfolio highlights (3 featured projects)
- [ ] Shop highlights (4 products)
- [ ] Latest blog articles (3 cards)
- [ ] Testimonials carousel
- [ ] Newsletter signup CTA
- [ ] Full responsive testing

### Phase 3: Business Section
- [ ] About page (company story, team, stats, testimonials)
- [ ] Services page (3 core pillars + 7 service cards with detail expansion, FAQ)
- [ ] Contact page (form with validation, map embed, contact info)
- [ ] Form submission handler (Netlify Forms)

### Phase 4: Portfolio Section
- [ ] Portfolio index page with filterable grid
- [ ] Project detail page template
- [ ] Image gallery with lightbox
- [ ] Category filtering with JavaScript
- [ ] Populate with sample/real project data

### Phase 5: Blog Section
- [ ] Blog index with featured article hero and grid
- [ ] Category filter tabs
- [ ] Article detail page with rich content layout
- [ ] Table of contents generation
- [ ] Social sharing buttons
- [ ] Author bio component
- [ ] Pagination

### Phase 6: E-Commerce Section
- [ ] Shop index with product grid and filters
- [ ] Product detail page with image gallery
- [ ] Cart system (JavaScript + localStorage)
- [ ] Cart page with quantity controls and summary
- [ ] Checkout multi-step form
- [ ] Stripe integration for payment
- [ ] Order confirmation page
- [ ] Cart icon with item count badge in header

### Phase 7: SEO and Performance
- [ ] Add meta tags (title, description, OG, Twitter) to all pages
- [ ] Implement JSON-LD structured data
- [ ] Generate sitemap.xml and robots.txt
- [ ] Optimize images (WebP format, proper sizing, lazy loading)
- [ ] Minify CSS and JavaScript
- [ ] Test Core Web Vitals (Lighthouse audit)
- [ ] Add breadcrumb navigation

### Phase 8: Polish and Launch
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Accessibility audit (ARIA labels, keyboard navigation, contrast)
- [ ] Legal pages (Privacy Policy, Terms, Refund Policy)
- [ ] Cookie consent banner
- [ ] 404 error page
- [ ] Final responsive testing on real devices
- [ ] Configure social media links
- [ ] Deploy to Netlify and verify
- [ ] Configure custom domain (tinaht.com) on Netlify
- [ ] Verify SSL/HTTPS and DNS propagation
