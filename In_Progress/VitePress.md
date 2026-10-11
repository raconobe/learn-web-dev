We can turn your Markdown files into a static website deployed to **GitHub Pages** using **VitePress**. VitePress is lightweight, fast, and builds a documentation site directly from Markdown files.

---

### Step 1: Initialize the Project

Inside your `learn-web-dev` directory, create a `package.json` file to manage VitePress dependencies:

```bash
cd ~/Desktop/projects-vault-raco/learn-web-dev
npm init -y
npm install -D vitepress vue

```

---

### Step 2: Configure VitePress

Create the hidden configuration folder `.vitepress` and add `config.mjs`:

```bash
mkdir -p .vitepress

```

Create `.vitepress/config.mjs`:

```javascript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Learn Web Dev",
  description: "Web Development Roadmap & Resources",
  base: '/learn-web-dev/', // Set to match your GitHub repository name
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Roadmap', link: '/roadmap' },
      { text: 'HTML', link: '/html/' },
      { text: 'CSS', link: '/css/' },
      { text: 'JavaScript', link: '/javascript/' }
    ],
    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Roadmap', link: '/roadmap' }
        ]
      },
      {
        text: 'Modules',
        items: [
          { text: 'HTML Fundamentals', link: '/html/' },
          { text: 'CSS & Styling', link: '/css/' },
          { text: 'JavaScript Programming', link: '/javascript/' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/YOUR_GITHUB_USERNAME/learn-web-dev' }
    ]
  }
})

```

---

### Step 3: Test Locally

Start the local preview server to review your static website:

```bash
npx vitepress dev

```

Open the local URL displayed in your terminal (usually `http://localhost:5173`) to navigate your compiled website.

---

### Step 4: Automate Deployment with GitHub Actions

Create a GitHub Actions workflow to automatically build and deploy your site whenever you push changes to `main`:

```bash
mkdir -p .github/workflows

```

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci || npm install

      - name: Build site
        run: npx vitepress build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```

---

### Step 5: Enable GitHub Pages and Push

1. Open your GitHub repository on the web (`learn-web-dev`).
2. Go to **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.
4. Stage, commit, and push your changes using your personal SSH profile:

```bash
git add .
git commit -m "Configure VitePress static site and GitHub Actions workflow"
git push -u origin main

```

Your site will automatically build and publish to `

---
L
---
To install Node.js and `npm` on Debian Linux, the cleanest and recommended approach is using **NVM** (Node Version Manager). This allows you to install Node.js without requiring `sudo` root permissions for `npm install -g`.

1. **Install Node Version Manager (NVM):** Terminal.
Download and run the official NVM installation script:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

```

**Verification:** Reload your terminal configuration or close and reopen your terminal:

```bash
source ~/.bashrc
nvm --version

```


2. **Install Node.js LTS:** Terminal.
Install the latest Long Term Support (LTS) release of Node.js:

```bash
nvm install --lts

```

NVM will automatically set the newly installed version as active and install `npm` alongside it.

**Verification:** Check your Node.js and NPM versions:

```bash
node -v
npm -v

```


3. **Proceed with VitePress Setup:** Terminal.
Now navigate back to your project directory and run the initialization commands:

```bash
cd ~/Desktop/projects-vault-raco/learn-web-dev
npm init -y
npm install -D vitepress vue

```

**Verification:** Check that `node_modules` and `package.json` were successfully generated inside `learn-web-dev`.


---
L
---
1. **Add VitePress Scripts to package.json:** Terminal.
Open `package.json` in `nano` to add convenience scripts for starting and building VitePress:

```bash
nano package.json

```

Update the `"scripts"` section so your file looks like this:

```json
{
  "name": "learn-web-dev",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
  },
  "devDependencies": {
    "vitepress": "^1.0.0",
    "vue": "^3.0.0"
  }
}

```

Save and exit (`Ctrl + O`, `Enter`, `Ctrl + X`).


2. **Start the Local Development Server:** Terminal.
Run the dev server:

```bash
npm run docs:dev

```

**Verification:** Look for terminal output similar to:

```text
  vitepress v1.x.x dev server running at:

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose

```

Open `http://localhost:5173/` in your web browser to view your live site. Any edits you make to your `.md` files will instantly update in the browser.


3. **Test Production Build (Optional):** Terminal.
To test building the static HTML output locally:

```bash
npm run docs:build

```

**Verification:** Check that a output directory `.vitepress/dist` is generated containing the compiled HTML, CSS, and JS assets.

---
L
---


That is the beauty of **Static Site Generators** (SSGs) like VitePress! You write plain Markdown files without worrying about HTML tags, layout CSS, or responsive sidebars, and VitePress compiles them into a documentation portal.

Now that your local build is working, you can commit everything and push it to GitHub using your personal SSH key.

1. **Check Local Repository Status:** Terminal.
Make sure you are in your project folder and view modified files:

```bash
cd ~/Desktop/projects-vault-raco/learn-web-dev
git status

```

**Verification:** You should see `index.md`, `.vitepress/`, `package.json`, `package-lock.json`, and `.github/` listed.


2. **Add .gitignore for node_modules:** Terminal.
Ensure you do not commit the heavy `node_modules` directory to Git:

```bash
echo "node_modules" >> .gitignore
echo ".vitepress/cache" >> .gitignore
echo ".vitepress/dist" >> .gitignore

```

**Verification:** Run `cat .gitignore` to confirm `node_modules` is listed.


3. **Commit and Push to GitHub:** Terminal.
Stage all files, commit them, and push using your personal SSH host alias (`github.com-raco`):

```bash
git add .
git commit -m "Configure VitePress static site and GitHub Actions deployment"
git push -u origin main

```

**Verification:** Run `git status`. It should output `Your branch is up to date with 'origin/main'`.


4. **Enable GitHub Pages on GitHub:** Browser.
1. Open your GitHub repository in your browser (`learn-web-dev`).
2. Go to **Settings** $\rightarrow$ **Pages**.
3. Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.

**Verification:** Click on the **Actions** tab at the top of your repository page to watch the automated deployment workflow run. Once finished, your site will be live on GitHub Pages!



---


The "Get started with GitHub Actions" page appears because the `.github/workflows/deploy.yml` file has not been committed and pushed to your remote repository yet.

Follow these steps to commit the workflow file and push it to GitHub:

1. **Verify the workflow file exists locally**
Run this in your terminal:
```bash
ls -la .github/workflows/

```


*Expected output:* You should see `deploy.yml`.
2. **Stage, commit, and push all files to GitHub**
Execute these commands inside your `learn-web-dev` directory:
```bash
cd ~/Desktop/projects-vault-raco/learn-web-dev
git add .
git commit -m "Add GitHub Actions workflow for VitePress deployment"
git push -u origin main

```


3. **Check the Actions tab again**
Refresh the **Actions** page in your browser (`[github.com/raconobe/learn-web-dev/actions](https://github.com/raconobe/learn-web-dev/actions)`). You will now see your **"Deploy VitePress site to Pages"** workflow running automatically. Once completed, your live site will be accessible at:


`[https://raconobe.github.io/learn-web-dev/](https://raconobe.github.io/learn-web-dev/)`