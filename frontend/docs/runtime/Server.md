## Express Server (SSR)

- File: `server.ts`

Provides an Express server configured for Angular SSR via `@angular/ssr`'s `CommonEngine`.

### Exports

- `app(): express.Express` — creates and configures the Express server.

### Behavior

- Serves static content from `../browser` with caching.
- Renders all routes using `CommonEngine.render` with server-side bootstrap.
- Listens on `PORT` env var or `4000` by default.

### Local Run

```bash
node server.js
```

Or with ts-node during development, depending on your setup.

