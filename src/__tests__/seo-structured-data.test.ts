import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('structured data and delivery workflow', () => {
  it('includes local business schema in index metadata', () => {
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');

    expect(html).toContain('"@type":"LocalBusiness"');
    expect(html).toContain('"name":"Prodigy Interactive"');
    expect(html).toContain('"serviceArea":["Dallas","Fort Worth","DFW Metroplex"]');
  });

  it('defines a CI workflow that runs lint, test, and build', () => {
    const workflow = readFileSync(resolve(process.cwd(), '.github/workflows/ci.yml'), 'utf8');

    expect(workflow).toContain('npm run lint');
    expect(workflow).toContain('npm run test');
    expect(workflow).toContain('npm run build');
  });
});
