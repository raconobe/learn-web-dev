```
git add .
git commit -m "Fix root index.md layout using VitePress frontmatter"
git push -u origin main
```



npm run docs:build
git add .
git commit -m "Add core module markdown placeholders and About page"
git push -u origin main




To test the production build locally and inspect the exact links before pushing to GitHub Pages or Firebase, you can use VitePress's built-in **preview server**.

Unlike `npm run docs:dev` (which serves everything dynamically in memory), the **preview command** serves the actual compiled `.html` files straight out of `.vitepress/dist/`. This lets you catch broken or relative path link issues early.

---

### Step 1: Clean and Build the Production HTML

First, remove any old cache and build fresh static files:

```bash
cd ~/Desktop/projects-vault-raco/learn-web-dev
rm -rf .vitepress/cache .vitepress/dist
npm run docs:build

```

---

### Step 2: Run the Production Preview Server

Run the preview command to serve the compiled `dist/` folder locally:

```bash
npm run docs:preview

```

The terminal will print a local URL:

```text
  vitepress v1.x.x preview server running at:

  ➜  Local:   http://localhost:4173/learn-web-dev/

```

Open that exact URL (`http://localhost:4173/learn-web-dev/`) in your browser to test all navigation links, sidebars, and subfolder paths.

---

### Understanding and Fixing Common Link Issues

In VitePress, relative vs. root-absolute links behave differently depending on your `base` setting in `.vitepress/config.mjs`.

#### Rule 1: Always Use Absolute Paths in Markdown Links

When linking between pages in VitePress, use root-absolute paths starting with `/`. VitePress will automatically append your `base` path (`/learn-web-dev/`) during the build step.

* ❌ **Avoid relative dot paths:** `[HTML](./html.md)` or `[HTML](../frontend/html)`
* ✅ **Use root-absolute paths:** `[HTML](/frontend/html)` or `[Overview](/frontend/)`

#### Rule 2: Linking Guidelines Reference Table

| Target Page File Location | Correct Link Syntax in `.md` | Rendered Live URL |
| --- | --- | --- |
| `frontend/index.md` | `[Frontend](/frontend/)` | `/learn-web-dev/frontend/` |
| `frontend/html.md` | `[HTML5](/frontend/html)` | `/learn-web-dev/frontend/html` |
| `backend/node.md` | `[Node.js](/backend/node)` | `/learn-web-dev/backend/node` |
| `about.md` | `[About](/about)` | `/learn-web-dev/about` |
| `roadmap.md` | `[Roadmap](/roadmap)` | `/learn-web-dev/roadmap` |

---

### Step 3: Inspecting Links in Compiled HTML Files

If a link is still failing, you can open the generated HTML file directly in VS Code to see how VitePress rendered the link target:

```bash
code .vitepress/dist/frontend/index.html

```

Search for `<a href=` inside the HTML file. You should see VitePress automatically transformed `/frontend/html` into `href="/learn-web-dev/frontend/html.html"`.




---


Here is the difference between `dev` and `build`:

* **`npm run docs:dev`**: Runs a dynamic development server in memory. It lets you write and preview pages in your browser instantly. If a link points to a non-existent file or uses wrong syntax, the server ignores it or shows a 404 page, but **it never stops or crashes**.
* **`npm run docs:build`**: Performs the production build step. It scans every link across all your `.md` files to compile static HTML. If it finds even a single link pointing to a file or path that doesn't exist, **it stops immediately and throws a build error** to prevent deploying a broken site.

---

### Why the Build Failed

The build engine stopped because of two specific causes in your markdown files:

1. **Relative `./` paths inside category folders**: Inside `backend/index.md`, link syntax like `./node` tries to resolve relatively instead of mapping from the root route. In VitePress, root paths should start with `/` (e.g., `/backend/node`).
2. **The `In_Progress/` directory**: Your repository has an `In_Progress/index1.md` file containing outdated `./html/index` links. VitePress scans **all** `.md` files in your workspace, even inside subfolders like `In_Progress/`.

---

### Step 1: Fix the Links Across Your Vault

To make `docs:build` compile cleanly without throwing dead link errors, update those `.md` files with root-absolute paths:

#### In `backend/index.md`:

```markdown
* [Node.js Architecture](/backend/node)
* [PHP & Web Engines](/backend/php)
* [Go Systems Programming](/backend/go)

```

#### In `frontend/index.md`:

```markdown
* [HTML5 Fundamentals](/frontend/html)
* [CSS3 & Modern Styling](/frontend/css)

```

#### In `languages/index.md`:

```markdown
* [Python Reference](/languages/python)
* [Java Reference](/languages/java)
* [C / C++ Reference](/languages/cpp)

```

#### In `tools-os/index.md`:

```markdown
* [Git Version Control Guides](/tools-os/git)
* [Debian Linux Administration](/tools-os/debian)

```

---

### Step 2: Handle the `In_Progress` Folder

Because `In_Progress/index1.md` contains invalid links, you have two choices:

**Option A (Recommended): Tell VitePress to ignore the folder**
Open `.vitepress/config.mjs` and add `srcExclude` to skip `In_Progress`:

```javascript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Dev Learning Vault",
  description: "Comprehensive Web Dev, Backend, Languages & OS Knowledge Hub",
  base: '/learn-web-dev/',
  srcExclude: ['**/In_Progress/**'], // Ignore draft or in-progress files
  themeConfig: {
    // ... rest of your config
  }
})

```

**Option B: Remove or rename the draft extension**
Move `In_Progress` out of your VitePress repository directory or rename `index1.md` to `index1.txt` so VitePress doesn't treat it as a site page.

---

### Step 3: Run Dev vs. Build

Now you can run the live development server without build checks stopping you:

```bash
npm run docs:dev

```

Once you've updated the links, verify the full static build:

```bash
npm run docs:build

```


----


---


When you build a VitePress project, the conversion happens during the build process, and the generated `.html` files are stored in a hidden directory inside your project:

```text
learn-web-dev/.vitepress/dist/

```

### How to See the Converted HTML Files

Run the build command in your terminal:

```bash
cd ~/Desktop/projects-vault-raco/learn-web-dev
npm run docs:build

```

Once the build finishes, you can inspect the generated files inside `.vitepress/dist`:

```bash
ls -la .vitepress/dist

```

### How Markdown Files Map to HTML Output

VitePress converts your directory and Markdown structure into standard static HTML files:

| Source Markdown File | Compiled HTML Output File | Served Route URL |
| --- | --- | --- |
| `index.md` | `.vitepress/dist/index.html` | `/` |
| `about.md` | `.vitepress/dist/about.html` | `/about` |
| `roadmap.md` | `.vitepress/dist/roadmap.html` | `/roadmap` |
| `frontend/index.md` | `.vitepress/dist/frontend/index.html` | `/frontend/` |
| `frontend/html.md` | `.vitepress/dist/frontend/html.html` | `/frontend/html` |
| `backend/node.md` | `.vitepress/dist/backend/node.html` | `/backend/node` |

---

### What Inside `.vitepress/dist` Looks Like

When you deploy your site to **GitHub Pages**, **Firebase Hosting**, or any web host, it is **only the `.vitepress/dist/` folder** that gets uploaded.

That folder contains:

* Complete static `.html` pages for every `.md` file.
* An `assets/` subfolder containing JavaScript, bundled CSS, optimized fonts, and images.


----


**Yes, absolutely.** VitePress compiles your Markdown files into standard static HTML, CSS, and JavaScript files (located in `.vitepress/dist` after running `npm run docs:build`). You can host those static files on **Firebase Hosting**, Netlify, Vercel, Cloudflare Pages, or any web server.

---

### Step-by-Step: Deploying VitePress to Firebase Hosting

1. **Install Firebase CLI Tools:** Terminal.
Install the official Firebase CLI globally or locally in your project:

```bash
npm install -g firebase-tools

```

**Verification:** Run `firebase --version` to confirm the installation.


2. **Log in and Initialize Firebase:** Terminal.
Log in to your Google account and initialize Firebase inside your VitePress project directory:

```bash
cd ~/Desktop/projects-vault-raco/learn-web-dev
firebase login
firebase init hosting

```

When prompted during setup, select the following choices:

* **Project Setup:** Select an existing Firebase project or create a new one.
* **Public Directory:** Enter `.vitepress/dist` *(this tells Firebase where VitePress outputs the compiled HTML/CSS)*.
* **Configure as a single-page app (SPA)?** Type `N` (No).
* **Set up automatic builds and deploys with GitHub?** Type `Y` (Yes) or `N` based on your preference.
* **Overwrite index.html?** Type `N` (No).


3. **Build and Deploy:** Terminal.
Compile your VitePress site and deploy it directly to Firebase:

```bash
npm run docs:build
firebase deploy --only hosting

```

**Verification:** Firebase will print your live URL (e.g., `[https://your-project-id.web.app](https://your-project-id.web.app)`), where your VitePress site is hosted.


---

### Key Difference: Config Base Path

When hosting on **Firebase Hosting**, your site usually lives at the root domain (`[https://your-app.web.app/](https://your-app.web.app/)`) rather than a subpath like GitHub Pages (`/learn-web-dev/`).

If you host on Firebase at the root level, make sure to set `base: '/'` in `.vitepress/config.mjs`:

```javascript
export default defineConfig({
  base: '/', // Use '/' for root hosting on Firebase
  // ... rest of your config
})

```


---



git add .
git commit -m "Add About module and updated VitePress index files"
git push -u origin main