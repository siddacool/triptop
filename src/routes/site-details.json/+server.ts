import pkg from '../../../package.json';

export const prerender = true;

export function GET() {
  return new Response(
    JSON.stringify(
      {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        buildTime: new Date().toISOString(),
        nodeEnv: 'production',
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
