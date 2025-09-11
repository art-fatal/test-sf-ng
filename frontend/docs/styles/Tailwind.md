## Tailwind CSS Configuration

- File: `tailwind.config.js`

Configured to scan Angular `src/**/*.{html,ts}` for class usage. Extend the theme or add plugins as needed.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: { extend: {} },
  plugins: [],
};
```

Utility classes are used throughout the components for layout and styling.

