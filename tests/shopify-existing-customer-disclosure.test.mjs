import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const original = name => read('docs/Website/evidence/2026-10-15_shopify_disclosure_before/' + name);
const sha = text => createHash('sha256').update(text).digest('hex');
const once = (text, pattern) => {
  const matches = [...text.matchAll(pattern)];
  assert.equal(matches.length, 1, 'Exactly one intended content region');
  return matches[0];
};

test('retained before-images are exact original website files', () => {
  assert.equal(sha(original('terms.html')), '4363a39e5e73e0352ebae837c2fe0f95cf444b26974b946729f94452cde5f03f');
  assert.equal(sha(original('support.html')), '0751f611ab49c402a6a841a86ef8a490659df417d28e9170d8ae9f450b1456ef');
});

test('terms change only the date and Shopify description, preserving every other legal/provider/script byte', () => {
  const before = original('terms.html'), after = read('terms.html');
  const old = once(before, /^        <p class="text-slate-600">When a User authorises a Shopify connection[^\n]+<\/p>$/gm)[0];
  const next = once(after, /^        <p class="text-slate-600 mb-2">When a User authorises a Shopify connection[^\n]+<\/p>\n        <p class="text-slate-600 mb-2">This connector route[^\n]+<\/p>\n        <p class="text-slate-600">Any historical Shopify-billed subscription[^\n]+<\/p>$/gm)[0];
  assert.ok(next.includes('The User may disconnect the integration at any time.'));
  assert.ok(next.includes('does not cancel or migrate it'));
  assert.ok(next.includes('FlowIQ does not charge both routes for the same active entitlement.'));
  assert.equal(after.replace(next, old).replace('Last Updated: 15 October 2026', 'Last Updated: 8 August 2026'), before);
});

test('support changes only the Shopify description and billing-help sentence', () => {
  const before = original('support.html'), after = read('support.html');
  const region = /<h2 class="mt-5 text-2xl font-bold text-slate-950">FlowIQ Operations for Shopify<\/h2>\n([\s\S]*?)        <ul class="mt-5 space-y-3 text-sm text-slate-600">/g;
  const old = once(before, region)[1], next = once(after, region)[1];
  assert.equal((old.match(/<p /g) || []).length, 1);
  assert.equal((next.match(/<p /g) || []).length, 2);
  assert.ok(next.includes('warehouse mapping, stock and price synchronization, and order flow.'));
  assert.ok(!next.includes('Shopify-billed plans'));
  const billing = /^          <li><strong class="text-slate-900">Billing issue:<\/strong>[^\n]+<\/li>$/gm;
  const oldBilling = once(before, billing)[0], newBilling = once(after, billing)[0];
  assert.ok(newBilling.includes('historical Shopify charge'));
  assert.ok(newBilling.includes('Never email passwords or access tokens.'));
  assert.equal(after.replace(next, old).replace(newBilling, oldBilling), before);
});

for (const file of ['terms.html', 'support.html']) {
  test(file + ' accurately separates existing EcomIQ payment from new Shopify acquisition', () => {
    const page = read(file);
    const disclosure = once(page, /<p class="[^"]+">This connector route[^\n]+<\/p>/g)[0];
    for (const text of [
      'paid EcomIQ subscription with FlowIQ was independently established',
      'before their first public installation attempt for FlowIQ Operations',
      'does not create a new Shopify subscription',
      'does not offer signup, trials, purchases or upgrades',
      'new customers acquired through the Shopify App Store',
      'Availability remains subject to Shopify approval and the permissions granted.',
    ]) assert.ok(disclosure.includes(text), text);
    assert.doesNotMatch(disclosure, /<a\b|<form\b|(?:sb_secret_|sbp_|shpat_|Bearer eyJ)|Shopify-approved|guaranteed approval/i);
    assert.ok(page.includes('mailto:support@flowiq.info'));
    assert.ok(page.includes('href="/privacy.html"'));
  });
}
