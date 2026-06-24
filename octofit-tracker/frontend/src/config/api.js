const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export const buildApiUrl = (resource) => `${apiBaseUrl}/${resource}/`;

export const normalizeItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && payload.data && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
};
