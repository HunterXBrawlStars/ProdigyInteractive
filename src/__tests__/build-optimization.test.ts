import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('build optimization config', () => {
  it('defines manual vendor chunk splitting', () => {
    const viteConfig = readFileSync(resolve(process.cwd(), 'vite.config.ts'), 'utf8');

    expect(viteConfig).toContain('manualChunks');
    expect(viteConfig).toContain('vendor-react');
    expect(viteConfig).toContain('vendor-mui');
    expect(viteConfig).toContain('vendor-motion');
  });
});
