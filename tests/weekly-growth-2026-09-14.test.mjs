import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read = p => fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8');
function runtime(readyState) {
  const listeners = {}, formListeners = {}, events = [], web = [];
  const form = { getAttribute: key => key === 'name' ? 'calculator-lead' : '', addEventListener: (key, fn) => formListeners[key] = fn };
  const document = { readyState, title: 'Calculator', referrer: '', body: { dataset: {} },
    getElementById: () => ({}), querySelectorAll: selector => selector === 'form' ? [form] : [],
    addEventListener: (key, fn) => (listeners[key] ||= []).push(fn) };
  const window = { location: { pathname: '/tools/landed-cost-calculator.html' },
    addEventListener: () => {}, FlowIQWebsiteAnalytics: { track: (...args) => web.push(args) },
    gtag: (...args) => events.push(args) };
  const context = vm.createContext({ window, document, sessionStorage: {getItem: () => null, setItem: () => {}}, Set });
  const run = () => vm.runInContext(read('assets/growth-analytics.js'), context);
  return {run, listeners, formListeners, events, web};
}
for (const state of ['loading', 'interactive', 'complete']) {
  test(`growth initializes once when loaded during ${state}`, () => {
    const r = runtime(state); r.run(); r.run();
    if (state === 'loading') {
      assert.equal(r.listeners.click, undefined);
      assert.equal(r.listeners.DOMContentLoaded.length, 1);
      r.listeners.DOMContentLoaded[0]();
    }
    assert.equal(r.listeners.click.length, 1);
    r.formListeners.submit();
    assert.equal(r.events.filter(e => e[1] === 'lead_form_attempt').length, 1);
    assert.equal(r.web.filter(e => e[0] === 'web_calculator_use').length, 0);
    const attrs = {'data-analytics-event': 'calculator_use', 'data-calculator-id': 'landed-cost'};
    r.listeners.click[0]({target:{closest:()=>({tagName:'BUTTON',textContent:'Calculate',getAttribute:k=>attrs[k]||null})}});
    assert.equal(r.web.filter(e => e[0] === 'web_calculator_use').length, 1);
    assert.equal(r.web[0][1].calculator_id, 'landed-cost');
  });
}
test('demo module error waits for submission and clears after correction; classification survives', () => {
  const listeners = {}, changes = {};
  let hidden = true, focused = false;
  const input = {checked:false,value:'ImportIQ',addEventListener:(k,f)=>changes[k]=f,focus:()=>focused=true};
  const error = {classList:{toggle:(_,v)=>hidden=v,remove:()=>hidden=false}};
  const fields = {moduleInterestError:error, feature_interest:{value:''}, lead_route:{value:''},lead_source:{value:''},plan_interest:{value:''}};
  const values = {team_size:'11-25',timeline:'Within 30 days',buying_role:'Decision maker',onboarding_readiness:'Ready to assign an owner and prepare our data'};
  const form = {querySelectorAll:()=>[input],querySelector:q=>({value: values[q.match(/name="([^"]+)"/)[1]]}),addEventListener:(k,f)=>listeners[k]=f};
  vm.runInNewContext(read('assets/js/demo-fit-questionnaire.js'),{document:{getElementById:id=>id==='demo-fit-form'?form:fields[id],referrer:''},window:{location:{search:'',origin:'https://www.flowiq.info'}},URLSearchParams,URL});
  assert.equal(hidden,true);
  let prevented=false;
  listeners.submit({preventDefault:()=>prevented=true});
  assert.equal(prevented,true); assert.equal(hidden,false); assert.equal(focused,true);
  input.checked=true;changes.change();assert.equal(hidden,true);
  assert.equal(fields.feature_interest.value,'ImportIQ');
  listeners.submit({preventDefault:()=>assert.fail('valid submission blocked')});
  assert.equal(fields.lead_route.value,'qualified_demo');
});
