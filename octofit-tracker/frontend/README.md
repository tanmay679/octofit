# OctoFit Tracker Frontend

## Environment variable setup

Define `VITE_CODESPACE_NAME` for Codespaces API routing.

Example `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the app calls APIs using:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

This fallback avoids invalid URLs such as `https://undefined-8000.app.github.dev`.
