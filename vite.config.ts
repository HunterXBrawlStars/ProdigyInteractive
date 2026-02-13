import { Buffer } from 'node:buffer';
import type { IncomingMessage } from 'node:http';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const mattGptHandlerModulePath = new URL('./api/mattgpt.js', import.meta.url).href;

interface VercelLikeResponse {
  status: (code: number) => VercelLikeResponse;
  json: (payload: unknown) => VercelLikeResponse;
}

async function readRawBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];

  return new Promise((resolve, reject) => {
    req.on('data', (chunk: Buffer | string) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function mattGptDevApiPlugin(): Plugin {
  return {
    name: 'mattgpt-dev-api-bridge',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/mattgpt', async (req, res, next) => {
        try {
          const { default: mattGptHandler } = await import(mattGptHandlerModulePath);
          const rawBody = await readRawBody(req);

          const vercelLikeReq = {
            method: req.method,
            headers: req.headers,
            body: rawBody
          };

          let statusCode = 200;
          const vercelLikeRes: VercelLikeResponse = {
            status(code: number) {
              statusCode = code;
              return this;
            },
            json(payload: unknown) {
              if (!res.writableEnded) {
                res.statusCode = statusCode;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(payload));
              }

              return this;
            }
          };

          await mattGptHandler(vercelLikeReq, vercelLikeRes);
        } catch (error) {
          if (!res.writableEnded) {
            const status = (error as { status?: number })?.status ?? 500;
            const message =
              error instanceof Error ? error.message : 'Unexpected local API bridge error.';
            res.statusCode = status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: message }));
          }
        } finally {
          if (!res.writableEnded) {
            next();
          }
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  if (env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY) {
    process.env.OPENAI_API_KEY = env.OPENAI_API_KEY;
  }

  return {
    plugins: [react(), mattGptDevApiPlugin()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) {
              return undefined;
            }

            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor-react';
            }

            if (id.includes('node_modules/@mui/')) {
              return 'vendor-mui';
            }

            if (id.includes('node_modules/framer-motion/')) {
              return 'vendor-motion';
            }

            if (id.includes('node_modules/react-icons/')) {
              return 'vendor-icons';
            }

            return undefined;
          }
        }
      }
    }
  };
});
