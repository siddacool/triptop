// src/routes/robots.txt/+server.ts
import { text } from '@sveltejs/kit';

export function GET() {
  const robotsTxt = `User-agent: *
Disallow:
`;

  return text(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
