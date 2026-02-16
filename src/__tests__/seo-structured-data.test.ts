import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('structured data and delivery workflow', () => {
  it('includes local business schema in index metadata', () => {
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');

    expect(html).toContain('"@type":"LocalBusiness"');
    expect(html).toContain('"name":"Prodigy Interactive"');
    expect(html).toContain('Dallas');
    expect(html).toContain('Fort Worth');
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('How do I make my own app for my business?');
    expect(html).toContain('How can I use AI in my business to cut costs?');
  });

  it('keeps canonical SEO URLs aligned to the primary https www host', () => {
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');
    const robots = readFileSync(resolve(process.cwd(), 'public/robots.txt'), 'utf8');
    const sitemap = readFileSync(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8');

    expect(html).toContain('<meta property="og:url" content="https://www.prodigyinteractive.io" />');
    expect(html).toContain('<link rel="canonical" href="https://www.prodigyinteractive.io" />');
    expect(robots).toContain('Host: https://www.prodigyinteractive.io');
    expect(robots).toContain('Sitemap: https://www.prodigyinteractive.io/sitemap.xml');
    expect(sitemap).toContain('<loc>https://www.prodigyinteractive.io/</loc>');
  });

  it('defines a CI workflow that runs lint, test, and build', () => {
    const workflow = readFileSync(resolve(process.cwd(), '.github/workflows/ci.yml'), 'utf8');

    expect(workflow).toContain('npm run lint');
    expect(workflow).toContain('npm run test');
    expect(workflow).toContain('npm run build');
  });
});
