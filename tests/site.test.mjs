import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const publicDir = new URL('../public/', import.meta.url);
const pages = ['index', 'about', 'services', 'contact', 'guide', 'privacy'];

for (const page of pages) {
  test(`${page} has the company filings and working local links`, async () => {
    const html = await readFile(new URL(page + '.html', publicDir), 'utf8');
    const footer = html.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/)?.[0] || '';
    assert.match(footer, /广州锦奕咨询服务有限公司/);
    assert.match(footer, /href="https:\/\/beian\.miit\.gov\.cn\/"[^>]*>粤ICP备2026186178号<\/a>/);
    assert.match(footer, /href="https:\/\/beian\.mps\.gov\.cn\/#\/query\/webSearch\?code=44011802001719"[^>]*>\s*<img [^>]*src="images\/police-filing\.webp"[^>]*>\s*<span>粤公网安备44011802001719号<\/span>/);
    assert.doesNotMatch(footer, /tel:|173\s*2225\s*1752/);
    if (page === 'contact') assert.match(html, /href="tel:17322251752"/);
    if (page === 'index') {
      assert.match(html, /class="gallery"/);
      assert.match(html, /aria-label="复制小程序名称：岭南旺铺"/);
      assert.equal([...html.matchAll(/<img\b/g)].length, 6);
    }

    for (const [, ref] of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
      const url = new URL(ref, 'https://site.test/' + page + '.html');
      if (url.origin !== 'https://site.test') continue;
      const name = url.pathname.slice(1) || 'index.html';
      const target = new URL(name, publicDir);
      assert.ok((await stat(target)).isFile(), ref);
      if (url.hash) {
        const content = await readFile(target, 'utf8');
        assert.ok(content.includes(`id="${url.hash.slice(1)}"`), ref);
      }
      if (name.endsWith('.webp')) {
        assert.equal((await readFile(target)).toString('ascii', 8, 12), 'WEBP', ref);
      }
    }
  });
}
