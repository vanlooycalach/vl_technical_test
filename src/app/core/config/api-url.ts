const rawApiUrl = import.meta.env.NG_APP_API_URL;

if (typeof rawApiUrl !== 'string' || !rawApiUrl.trim()) {
  throw new Error(
    'NG_APP_API_URL is required. Copy .env.example to .env and set the API base URL.',
  );
}

export const API_URL = rawApiUrl.trim();
