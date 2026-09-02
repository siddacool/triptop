import { createDate } from '$lib/utils/date-time/createDate';
import pkg from '../../../package.json';

export const prerender = true;

export function GET() {
  const buildTime = createDate();

  return new Response(
    JSON.stringify(
      {
        name: pkg.name,
        version: pkg.version,
        build: {
          iso: buildTime.toISOString(),
          date: buildTime.format('DD-MM-YYYY'),
          time: buildTime.format('hh:mm:ss A'),
          zone: buildTime.format('Z'),
        },
      },
      null,
      2,
    ),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
