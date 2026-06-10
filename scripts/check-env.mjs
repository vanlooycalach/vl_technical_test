import { existsSync, readFileSync } from 'node:fs';

function readApiUrlFromEnvFile() {
  if (!existsSync('.env')) {
    return null;
  }

  const match = readFileSync('.env', 'utf8').match(/^NG_APP_API_URL=(.+)$/m);

  return match?.[1]?.trim() || null;
}

const apiUrl = process.env.NG_APP_API_URL?.trim() || readApiUrlFromEnvFile();

if (!apiUrl) {
  console.error(
    'Missing NG_APP_API_URL. Copy .env.example to .env and set the API base URL.',
  );
  process.exit(1);
}
