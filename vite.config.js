import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite plugin to mock Vercel API for local development
const vercelApiMock = () => {
  return {
    name: 'vercel-api-mock',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/gemini' && req.method === 'POST') {
          try {
            let body = '';
            req.on('data', chunk => { body += chunk.toString() });
            req.on('end', async () => {
              try {
                req.body = JSON.parse(body);
                // dynamically import the api handler
                const handlerModule = await import('./api/gemini.js');
                const handler = handlerModule.default;
                await handler(req, res);
              } catch (err) {
                console.error(err);
                res.statusCode = 500;
                res.end('Error processing request in local mock');
              }
            });
          } catch (e) {
            console.error(e);
            next();
          }
        } else {
          next();
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiMock()],
})
