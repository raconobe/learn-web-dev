# ⚡ JavaScript Module

JavaScript adds interactivity, logic, and dynamic data handling to web pages.

---

## 📚 Core Topics

1. **Fundamentals:** Variables (`const`, `let`), control flow, and functions.
2. **DOM Manipulation:** Selecting elements, modifying styles, listening to user events.
3. **Modern ES6+ Features:** Arrow functions, destructuring, template literals, array methods (`map`, `filter`, `reduce`).
4. **Asynchronous JS:** `fetch()`, Promises, and `async/await`.

---

## 🛠️ Recommended Resources

* [JavaScript.info — Modern JavaScript Tutorial](https://javascript.info/)
* [MDN Web Docs: JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 💻 Code Example: Fetching Data asynchronously

```javascript
async function fetchUserData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error(`User not found: ${response.status}`);
        }
        const data = await response.json();
        console.log("User Profile:", data);
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}

// Call example function
fetchUserData('octocat');
```

---

## 📌 Exercises

- [ ] Build a simple To-Do application manipulating the DOM.
- [ ] Fetch data from an open API (e.g., GitHub API) and render cards dynamically.