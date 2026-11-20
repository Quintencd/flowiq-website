(() => {
  const payrollIncludedEmployees = 5;
  // The public catalogue omits the internal employee billing line.
  const payrollEmployeeRates = {
    ZAR: { monthly: 20, annual: 216 },
    USD: { monthly: 1, annual: 11 }
  };
  const includedModules = {
    workiq_addon: 'workiq',
    bankingiq_addon: 'bankingiq',
    payroll_pack: 'payrolliq',
    ai_auto_capture: 'ai_auto_capture',
    ecom_pack: 'ecomiq',
    forecasting_intelligence_pack: 'forecastiq_advanced'
  };
  const moduleNotes = {
    trade_portal: 'Assisted rollout',
    jobiq_addon: 'Assisted onboarding',
    posiq_till_integration_pack: 'Locations · 0 to skip'
  };

  function create(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content !== undefined) element.textContent = content;
    return element;
  }

  function validPrice(price) {
    return typeof price === 'number' && Number.isFinite(price) && price >= 0;
  }

  function offerAmount(offer, interval, currency) {
    const field = interval === 'annual' ? 'annual_price' : 'price';
    return offer?.[currency === 'USD' ? field + '_usd' : field];
  }

  function planAmount(plan, interval, currency) {
    return currency === 'USD'
      ? plan.regional_prices?.USD?.[interval]?.amount
      : plan[interval]?.amount;
  }

  function mount({ root, launcher, status, moduleKeys, capacityKeys, setBillingInterval }) {
    const byId = (name) => root.querySelector('#subscription-' + name);
    const planList = byId('plans');
    const moduleList = byId('modules');
    const packList = byId('packs');
    const users = byId('users');
    const periodRadios = root.querySelectorAll('[name="subscription-interval"]');
    let catalogue;
    let planKey;
    let quantities = new Map();

    const selectedPlan = () => catalogue.plans[planKey];
    const unitAmount = (offer) => offerAmount(offer, catalogue.billingInterval, catalogue.currency);

    function format(amount) {
      const usd = catalogue.currency === 'USD';
      return (usd ? '$' : 'R') + amount.toLocaleString(usd ? 'en-US' : 'en-ZA', {
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
        maximumFractionDigits: 2
      });
    }

    function rate(amount, unit) {
      if (!validPrice(amount)) return 'Price unavailable';
      const period = catalogue.billingInterval === 'annual' ? 'year' : 'month';
      return format(amount) + (unit ? ' / ' + unit : '') + ' / ' + period;
    }

    function renderPlans() {
      const tiles = catalogue.planOrder.filter((key) => catalogue.plans[key]).map((key) => {
        const plan = catalogue.plans[key];
        const label = create('label', 'subscription-plan');
        const input = create('input');
        input.type = 'radio';
        input.name = 'subscription-plan';
        input.value = key;
        input.id = 'subscription-plan-' + key;
        input.checked = key === planKey;
        const copy = create('span', 'subscription-plan-copy');
        copy.append(create('strong', '', plan.name), create('small', '',
          plan[catalogue.billingInterval]?.custom ? 'Custom quote' :
            rate(planAmount(plan, catalogue.billingInterval, catalogue.currency))));
        label.append(input, copy);
        return label;
      });
      planList.replaceChildren(...tiles);
    }

    function quantityInput(id, minimum, maximum, value) {
      const input = create('input');
      input.id = id;
      input.type = 'number';
      input.inputMode = 'numeric';
      input.min = minimum;
      input.step = 1;
      if (maximum != null) input.max = maximum;
      input.value = value;
      return input;
    }

    function optionRow(key, offer, kind) {
      const label = create('label', 'subscription-option');
      const input = kind === 'quantity'
        ? quantityInput('subscription-option-' + key, 0, offer.limit, quantities.get(key) ?? 0)
        : create('input');
      if (kind !== 'quantity') {
        input.type = kind;
        input.id = 'subscription-option-' + key;
        input.checked = Boolean(quantities.get(key));
      }
      if (kind === 'radio') {
        input.name = 'subscription-projects-tier';
        input.checked = key === 'no-projects'
          ? ![...quantities].some(([id, qty]) => qty && selectedPlan().add_ons[id]?.tier_group === 'projectsiq')
          : Boolean(quantities.get(key));
      }
      input.dataset.offer = key;
      label.htmlFor = input.id;
      const copy = create('span', 'subscription-option-copy');
      copy.append(create('strong', '', offer.name));
      if (key !== 'no-projects') {
        const unit = kind === 'quantity' ? (key === 'posiq_till_integration_pack' ? 'location' : 'pack') : '';
        copy.append(create('small', '', rate(unitAmount(offer), unit)));
      }
      const unitNote = moduleNotes[key] || (kind === 'quantity' && offer.unit ? offer.unit + ' per pack' : '');
      const limitNote = kind === 'quantity' && offer.limit != null ? 'Max ' + offer.limit : '';
      const note = [unitNote, limitNote].filter(Boolean).join(' · ');
      if (note) copy.append(create('small', 'subscription-option-note', note));
      if (key === 'payroll_pack') {
        copy.append(create('small', 'subscription-option-note', 'Includes ' + payrollIncludedEmployees + ' active employees'));
      }
      label.append(copy, input);
      return label;
    }

    function renderOptions() {
      const plan = selectedPlan();
      const custom = plan[catalogue.billingInterval]?.custom;
      byId('plan-options').hidden = Boolean(custom);
      if (custom) return;

      const included = plan.limits?.users;
      const seatOffer = plan.add_ons?.extra_users;
      const maxSeats = included === null || (seatOffer && seatOffer.limit == null)
        ? null
        : included + (seatOffer?.limit || 0);
      if (maxSeats == null) users.removeAttribute('max');
      else users.max = maxSeats;
      const allowance = included === null ? 'Unlimited users included.' :
        included + (included === 1 ? ' user included.' : ' users included.');
      byId('users-hint').textContent = seatOffer
        ? allowance + ' Extra seats ' + rate(unitAmount(seatOffer), 'user') + '.'
        : allowance;

      const includedNames = moduleKeys
        .filter((key) => plan.features?.includes(includedModules[key]) && !plan.add_ons?.[key])
        .map((key) => catalogue.planOrder.map((id) => catalogue.plans[id]?.add_ons?.[key]?.name).find(Boolean))
        .filter(Boolean)
        .map((name) => name.replace(/ Add-on$/, ''));
      const includedList = byId('included');
      includedList.hidden = !includedNames.length;
      includedList.textContent = includedNames.length ? 'Included in this plan · ' + includedNames.join(', ') : '';

      const modules = [];
      const projects = create('fieldset', 'subscription-projects');
      projects.append(create('legend', '', 'ProjectsIQ tier'));
      projects.append(optionRow('no-projects', { name: 'No ProjectsIQ add-on' }, 'radio'));
      for (const key of moduleKeys) {
        const offer = plan.add_ons?.[key];
        if (!offer) continue;
        if (offer.tier_group === 'projectsiq') {
          projects.append(optionRow(key, offer, 'radio'));
        } else {
          modules.push(optionRow(key, offer, key === 'posiq_till_integration_pack' ? 'quantity' : 'checkbox'));
          if (key === 'payroll_pack') {
            const payroll = create('label', 'subscription-option subscription-payroll');
            payroll.id = 'subscription-payroll-employees-row';
            const copy = create('span', 'subscription-option-copy');
            copy.append(create('strong', '', 'Active payroll employees'),
              create('small', '', rate(payrollEmployeeRates[catalogue.currency][catalogue.billingInterval], 'additional employee')));
            const input = quantityInput('subscription-payroll-employees', 1, null,
              quantities.get('payroll-employees') ?? payrollIncludedEmployees);
            input.dataset.offer = 'payroll-employees';
            payroll.append(copy, input);
            modules.push(payroll);
          }
        }
      }
      if (projects.querySelectorAll('input').length > 1) modules.push(projects);
      moduleList.replaceChildren(...(modules.length ? modules : [create('p', '', 'No optional modules for this plan.')]));

      const packs = capacityKeys.filter((key) => plan.add_ons?.[key])
        .map((key) => optionRow(key, plan.add_ons[key], 'quantity'));
      byId('capacity').hidden = !packs.length;
      packList.replaceChildren(...packs);
      updateDependencies();
    }

    function updateDependencies() {
      const payroll = byId('payroll-employees-row');
      if (payroll) payroll.hidden = !quantities.get('payroll_pack');
      const storage = byId('option-projectsiq_storage_20gb');
      if (storage) {
        const plan = selectedPlan();
        const hasProjects = plan.features?.includes('projectsiq') ||
          moduleKeys.some((key) => plan.add_ons[key]?.tier_group === 'projectsiq' && quantities.get(key));
        storage.disabled = !hasProjects;
        storage.closest('label').classList.toggle('subscription-option-disabled', !hasProjects);
        const note = storage.closest('label').querySelector('.subscription-option-note');
        const storageOffer = plan.add_ons.projectsiq_storage_20gb;
        note.textContent = hasProjects
          ? [storageOffer.unit + ' per pack', storageOffer.limit != null ? 'Max ' + storageOffer.limit : ''].filter(Boolean).join(' · ')
          : 'Choose a ProjectsIQ tier first';
        if (!hasProjects) {
          quantities.delete('projectsiq_storage_20gb');
          storage.value = 0;
        }
      }
    }

    function renderEstimate() {
      const plan = selectedPlan();
      const interval = catalogue.billingInterval;
      const custom = Boolean(plan[interval]?.custom);
      const breakdown = byId('breakdown');
      const billingNote = byId('billing-note');
      const total = byId('total');
      const rows = [];
      byId('quote').hidden = !custom;
      byId('estimate-note').hidden = custom;
      const totalLabel = interval === 'annual' ? 'Monthly equivalent' : 'Estimated monthly cost';
      byId('total-label').textContent = custom ? plan.name : totalLabel + ' · ' + catalogue.currency;
      billingNote.textContent = '';
      breakdown.hidden = true;
      byId('line-items').replaceChildren();
      if (custom) {
        total.textContent = 'Custom quote';
        billingNote.textContent = 'Get pricing tailored to your team and modules.';
        return;
      }

      rows.push([plan.name + ' plan', planAmount(plan, interval, catalogue.currency)]);
      const included = plan.limits?.users;
      const extraSeats = included === null ? 0 : Math.max(0, users.valueAsNumber - included);
      if (extraSeats > 0) {
        const seatPrice = unitAmount(plan.add_ons?.extra_users);
        rows.push(['Extra users × ' + extraSeats, validPrice(seatPrice) ? seatPrice * extraSeats : null]);
      }

      for (const key of [...moduleKeys, ...capacityKeys]) {
        const qty = quantities.get(key);
        const offer = plan.add_ons?.[key];
        if (qty > 0 && offer) {
          const unit = unitAmount(offer);
          rows.push([offer.name + (qty > 1 ? ' × ' + qty : ''), validPrice(unit) ? unit * qty : null]);
        }
      }
      const payrollEmployees = quantities.get('payroll-employees') ?? payrollIncludedEmployees;
      if (quantities.get('payroll_pack') && payrollEmployees > payrollIncludedEmployees) {
        const extra = payrollEmployees - payrollIncludedEmployees;
        rows.push(['Additional payroll employees × ' + extra, payrollEmployeeRates[catalogue.currency][interval] * extra]);
      }

      const invalidFields = [...byId('plan-options').querySelectorAll('input[type="number"]')]
        .filter((input) => !input.disabled && !input.closest('[hidden]'))
        .filter((input) => {
          const invalid = !input.validity.valid || !Number.isSafeInteger(input.valueAsNumber);
          input.setAttribute('aria-invalid', String(invalid));
          return invalid;
        });
      const recurring = rows.reduce((sum, [, amount]) => sum + amount, 0);
      if (invalidFields.length || rows.some(([, amount]) => !validPrice(amount)) || recurring > Number.MAX_SAFE_INTEGER) {
        total.textContent = 'Estimate unavailable';
        billingNote.textContent = invalidFields.length
          ? 'Enter whole numbers within the allowed limits.'
          : 'A price is unavailable for this selection.';
        return;
      }

      total.textContent = format(interval === 'annual' ? Math.round(recurring * 100 / 12) / 100 : recurring);
      billingNote.textContent = interval === 'annual'
        ? format(recurring) + ' billed annually'
        : format(recurring) + ' billed monthly';
      byId('line-items').replaceChildren(...rows.map(([label, amount]) => {
        const item = create('div');
        item.append(create('dt', '', label), create('dd', '', format(amount)));
        return item;
      }));
      breakdown.hidden = false;
    }

    function render() {
      const focusedId = root.contains(document.activeElement) ? document.activeElement.id : '';
      renderPlans();
      renderOptions();
      for (const radio of periodRadios) radio.checked = radio.value === catalogue.billingInterval;
      renderEstimate();
      if (focusedId) document.getElementById(focusedId)?.focus({ preventScroll: true });
    }

    root.addEventListener('change', ({ target }) => {
      if (target.name === 'subscription-plan') {
        planKey = target.value;
        const plan = selectedPlan();
        const previousCount = quantities.size;
        quantities = new Map([...quantities].filter(([key, qty]) => {
          if (key === 'payroll-employees') return Boolean(plan.add_ons?.payroll_pack);
          const offer = plan.add_ons?.[key];
          return offer && (offer.limit == null || qty <= offer.limit);
        }));
        byId('changes').textContent = quantities.size < previousCount
          ? 'Selections outside this plan’s limits were removed.' : '';
        render();
      } else if (target.name === 'subscription-interval') {
        setBillingInterval(target.value);
      }
    });

    root.addEventListener('input', ({ target }) => {
      const key = target.dataset.offer;
      if (key) {
        if (target.type === 'radio') {
          for (const id of moduleKeys) {
            if (selectedPlan().add_ons[id]?.tier_group === 'projectsiq') quantities.delete(id);
          }
        }
        const quantity = target.type === 'number' ? target.valueAsNumber : Number(target.checked);
        if (key !== 'no-projects') {
          if (quantity > 0) quantities.set(key, quantity);
          else quantities.delete(key);
        }
        updateDependencies();
      }
      if (key || target === users) renderEstimate();
    });

    launcher.addEventListener('click', () => {
      render();
      root.showModal();
    });
    root.addEventListener('close', () => launcher.focus({ preventScroll: true }));

    return {
      update(nextCatalogue) {
        catalogue = nextCatalogue;
        planKey ??= catalogue.planOrder.find((key) => catalogue.plans[key]);
        if (!planKey) {
          this.unavailable();
          return;
        }
        status.hidden = true;
        launcher.disabled = false;
        if (root.open) render();
      },
      unavailable() {
        launcher.disabled = true;
        status.hidden = false;
        status.textContent = 'Pricing is temporarily unavailable. Please refresh to try again.';
      }
    };
  }

  window.FlowIQSubscriptionCalculator = { mount };
})();
