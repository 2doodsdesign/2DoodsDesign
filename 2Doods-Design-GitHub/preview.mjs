import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';

const port = Number(process.env.PORT || 4173);
const root = new URL('./', import.meta.url);
const sourceFiles = new Set(['index.html', 'site.css', 'intro.css', 'intro.js']);
const mime = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
  ['.woff2', 'font/woff2'],
  ['.txt', 'text/plain; charset=utf-8'],
]);

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  const url = new URL(request.url, 'http://127.0.0.1');
  const file = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
  const type = mime.get(extname(file));
  const isAsset = /^assets\/(brand|portfolio)\/[a-z0-9.-]+$/i.test(file);

  if (!type || (!sourceFiles.has(file) && !isAsset)) {
    response.writeHead(404).end();
    return;
  }

  try {
    const body = await readFile(new URL(file, root));
    response.writeHead(200, {
      'Content-Type': type,
      'Content-Length': body.length,
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 500).end();
  }
});

server.listen(port, '127.0.0.1', () => console.log(`Prévia local: http://127.0.0.1:${server.address().port}/`));
