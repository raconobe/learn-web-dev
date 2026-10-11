# 🎨 CSS3 Module
css_module
CSS (Cascading Style Sheets) controls the visual presentation, layout, and responsiveness of web applications.

---

## 📚 Core Topics

1. **Box Model:** Content, Padding, Border, Margin.
2. **Flexbox:** One-dimensional layout system (`display: flex`, `justify-content`, `align-items`).
3. **CSS Grid:** Two-dimensional layout system (`grid-template-columns`, `gap`).
4. **Responsive Design:** `@media` queries and fluid typography.

---

## 🛠️ Recommended Resources

* [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [CSS-Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

## 💻 Code Example: Responsive Flex Center

```css
.card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f4f9;
}

.card {
    background: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

---

## 📌 Exercises

- [ ] Design a responsive navigation bar using Flexbox.
- [ ] Create a photo gallery layout using CSS Grid.






---
L
---
**Yes**, naming the main file `index.md` inside each subfolder (e.g., `html/index.md`) is standard practice because VitePress automatically maps `html/index.md` to the web route `/html/`.

The dead link warnings occur because VitePress expects links to point directly to folder paths (`/html/`) or explicit `.md` files (`./html/index.md`), rather than omitting the file extension.

---

### Step 1: Fix the Links in `index.md`

Open `index.md` in your editor or terminal:

```bash
nano index.md

```

Update lines 17–19 so the links end with `/` or `.md`:

```markdown
* 🏗️ **[HTML5 Module](./html/)** — Semantic markup, accessibility, and modern document structure.
* 🎨 **[CSS3 Module](./css/)** — Responsive design, Flexbox, Grid, and modern styling.
* ⚡ **[JavaScript Module](./javascript/)** — Core syntax, DOM manipulation, asynchronous programming, and ES6+.

```

Save and exit (`Ctrl + O`, `Enter`, `Ctrl + X`).

---

### Step 2: Ensure the Folder Structure Matches

Verify that your subfolders contain `index.md` using `ls`:

```bash
ls html/ css/ javascript/

```

Your file tree should look like this:

```text
learn-web-dev/
├── index.md
├── roadmap.md
├── html/
│   └── index.md
├── css/
│   └── index.md
└── javascript/
    └── index.md

```

---

### Step 3: Test and Push to GitHub

1. Run the local build to ensure all dead link warnings are resolved:
```bash
npm run docs:build

```


2. Commit and push the fix:
```bash
git add .
git commit -m "Fix VitePress relative links in index.md"
git push -u origin main

```



Once pushed, GitHub Actions will automatically re-deploy your site cleanly without build errors.