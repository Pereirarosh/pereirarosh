import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const root = resolve('dist');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};
createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const path = url.pathname === '/' ? '/index.html' : url.pathname;
  const name = resolve(root, '.' + (extname(path) ? path : path.replace(/\/$/,'') + '.html'));
  try {
    if (!name.startsWith(root + sep)) throw new Error('Invalid path');
    const file = await readFile(name);
    res.writeHead(200,{'Content-Type':types[extname(name)] || 'application/octet-stream'});
    res.end(file);
  } catch {
    res.writeHead(404,{'Content-Type':types['.html']});
    res.end(await readFile(resolve(root,'404.html')));
  }
}).listen(Number(process.env.PORT || 4173),'0.0.0.0', () => console.log('Preview at http://localhost:' + (process.env.PORT || 4173)));
