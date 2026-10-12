import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const privacy = fs.readFileSync(new URL('../privacy.html', import.meta.url), 'utf8');
const homepage = fs.readFileSync(new URL('../brandiq-google-ads.html', import.meta.url), 'utf8');
const ads = privacy.slice(privacy.indexOf('<section id="google-ads-data"'), privacy.indexOf('<section id="meta-whatsapp-data"'));

test('Google privacy separates optional uploads from reporting and describes the bounded payload', () => {
  assert.match(ads, /Ads reporting does not require conversion uploads/);
  for (const field of ['GCLID', 'GBRAID', 'WBRAID', 'transaction or event identifier', 'event time', 'conversion value', 'currency', 'consent signals']) assert.ok(ads.includes(field));
  assert.match(ads, /does not include customer names, email addresses, phone numbers or full order contents/);
});
test('withdrawal, provider custody and receipt evidence are not overclaimed', () => {
  assert.match(ads, /Denied, expired or withdrawn consent prevents future eligible uploads/);
  assert.match(ads, /does not itself erase a record already received by Google/);
  assert.match(ads, /does not prove advertising attribution/);
  assert.match(ads, /attempts to revoke the Google grant/);
  assert.match(ads, /Google API Services User Data Policy/);
});
test('reviewer homepage links the optional feature to the existing privacy anchor', () => {
  assert.match(homepage, /additional Google Data Manager permission/);
  assert.match(homepage, /granting permission does not by itself activate uploads or certify attribution/);
  assert.match(homepage, /href="\/privacy\.html#google-ads-data">conversion data and consent details/);
  assert.match(privacy, /id="google-ads-data"/);
});
