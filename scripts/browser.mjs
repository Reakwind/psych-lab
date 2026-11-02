import {existsSync} from 'node:fs';
import {delimiter, join} from 'node:path';

// Prefer an explicitly configured browser, then the cloud system browser.
// Playwright callers can fall back to their own installed Chromium.
export function chromePath() {
  const explicit = process.env.CHROME_PATH || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  if (explicit) {
    if (!existsSync(explicit)) throw Error(`Configured browser does not exist: ${explicit}`);
    return explicit;
  }
  const paths = (process.env.PATH || '').split(delimiter);
  return [...paths.flatMap(p => ['chromium', 'chromium-browser', 'google-chrome'].map(n => join(p, n))),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(existsSync);
}

export function browserOptions() {
  return {headless: true, executablePath: chromePath()};
}
