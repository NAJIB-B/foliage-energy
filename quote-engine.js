(() => {
    const INVERTER_POWER_FACTOR = 0.8;
    const BATTERY_DEPTH_OF_DISCHARGE = 0.8;
    const BATTERY_CONVERSION_EFFICIENCY = 0.9;
    const BATTERY_USABLE_FRACTION = BATTERY_DEPTH_OF_DISCHARGE * BATTERY_CONVERSION_EFFICIENCY;
    const PEAK_SUN_HOURS = 4.5;
    const PV_SYSTEM_EFFICIENCY = 0.8;
    const PV_RESERVE_MARGIN = 1.2;

    const inverters = [
        { name: '1.5kVA 12V IVPS', kva: 1.5, price: 180000 },
        { name: '2.5kVA 12V IVPS', kva: 2.5, price: 290000 },
        { name: '2.5kVA 24V IVPS', kva: 2.5, price: 290000 },
        { name: '3kVA IVEM', kva: 3, price: 310000 },
        { name: '3.5kVA IVPS', kva: 3.5, price: 350000 },
        { name: '4kVA IVEM', kva: 4, price: 400000 },
        { name: '5kVA IVPS', kva: 5, price: 480000 },
        { name: '7.5kVA IVPS', kva: 7.5, price: 530000 },
        { name: '6kVA IVEM', kva: 6, price: 580000 },
        { name: '5kVA IVPM', kva: 5, price: 640000 },
        { name: '5kVA All-in-One Inverter', kva: 5, price: 650000 },
        { name: '7.5kVA IVPM', kva: 7.5, price: 680000 },
        { name: '8kVA IVEM', kva: 8, price: 760000 },
        { name: '10kVA IVPS', kva: 10, price: 760000 },
        { name: '8kVA All-in-One Inverter', kva: 8, price: 900000 },
        { name: '10kVA IVPM', kva: 10, price: 920000 },
        { name: '12kVA IVEM', kva: 12, price: 950000 },
        { name: '10kVA IVGM 3-Phase Inverter', kva: 10, price: 1700000, phase: 3 },
        { name: '12kVA IVGM 3-Phase Inverter', kva: 12, price: 2300000, phase: 3 },
        { name: '15kVA IVGM 3-Phase Inverter', kva: 15, price: 2300000, phase: 3 },
        { name: '20kVA IVGM 3-Phase Inverter', kva: 20, price: 2750000, phase: 3 },
        { name: '30kVA IVGM 3-Phase Inverter', kva: 30, price: 3350000, phase: 3 },
        { name: '50kVA 3-Phase Inverter', kva: 50, price: 4500000, phase: 3 }
    ];

    const batteries = [
        { name: 'Haustrom Tubular 220Ah battery', kwh: null, price: 240000 },
        { name: 'Durasol Tubular 220Ah battery', kwh: null, price: 250000 },
        { name: 'Multi Power Tubular battery', kwh: null, price: 250000 },
        { name: '12.8V 1.28kWh Lithium Battery', kwh: 1.28, price: 310000 },
        { name: 'Quanta Battery', kwh: null, price: 370000 },
        { name: '12.8V 2.56kWh Lithium Battery', kwh: 2.56, price: 430000 },
        { name: '5kWh 48V Lithium battery', kwh: 5, price: 950000 },
        { name: '5kWh 24V Lithium battery', kwh: 5, price: 950000 },
        { name: '5kWh 48V All-in-One Lithium battery', kwh: 5, price: 1080000 },
        { name: '10kWh Lithium battery', kwh: 10, price: 1600000 },
        { name: 'Blue Carbon 15kWh Non-Smart BMS battery', kwh: 15, price: 1650000 },
        { name: 'Blue Carbon 15kWh Smart BMS Lithium battery', kwh: 15, price: 1700000 },
        { name: '12.5kWh FLA Lithium battery', kwh: 12.5, price: 1800000 },
        { name: '15kWh TG2 Slim battery', kwh: 15, price: 2100000 },
        { name: '15kWh Lithium Slim battery', kwh: 15, price: 2150000 },
        { name: '15kWh Lithium Standing battery', kwh: 15, price: 2200000 },
        { name: '17.5kWh Lithium battery', kwh: 17.5, price: 2200000 },
        { name: '25kWh Lithium battery', kwh: 25, price: 3300000 }
    ];

    const panels = [
        { name: '210W Nevis panel', watts: 210, price: 40000 },
        { name: '280W Felicity panel', watts: 280, price: 75000 },
        { name: '320W Nevis panel', watts: 320, price: 75000 },
        { name: 'Felicity 580W Bi-Facial panel', watts: 580, price: 145000 },
        { name: 'Jinko 590W Bi-Facial panel', watts: 590, price: 145000 },
        { name: 'Jinko 620W Bi-Facial panel', watts: 620, price: 150000 },
        { name: 'Jinko 635W Bi-Facial panel', watts: 635, price: 156000 },
        { name: 'Jinko 640W Bi-Facial panel', watts: 640, price: 158000 },
        { name: 'Jinko 645W Bi-Facial panel', watts: 645, price: 160000 },
        { name: 'Jinko 650W Bi-Facial panel', watts: 650, price: 162000 },
        { name: 'Jinko 670W Bi-Facial panel', watts: 670, price: 164000 }
    ];

    const hourDefaults = {
        Lights: 5,
        Fans: 8,
        TV: 4,
        Fridge: 24,
        Freezer: 24,
        'Laptop / Wi-Fi': 8,
        'Water pump': 2,
        'Air conditioner': 6
    };
    const form = document.querySelector('#quote-form');
    const picker = document.querySelector('#appliance-picker');
    const detailedAppliances = document.querySelector('.detailed-appliances');
    const hoursSlider = document.querySelector('#hours');
    const liveEstimate = document.createElement('div');
    const customLoads = document.createElement('div');
    const addCustomButton = document.createElement('button');

    if (!form || !picker || !detailedAppliances) return;

    picker.querySelector('.picker-title').innerHTML = 'Your energy loads <span>Select appliances or add a custom load; enter quantity, watts per unit and daily run time</span>';

    document.querySelectorAll('.appliance-item').forEach(item => {
        const name = item.querySelector('.appliance-check').value;
        item.dataset.defaultQuantity = item.querySelector('.quantity output').textContent;
        const runtime = document.createElement('label');
        runtime.className = 'run-hours-field';
        runtime.innerHTML = `Hours used per day <input class="run-hours-input" type="number" min="0" max="24" step="0.5" value="${hourDefaults[name] ?? 4}" aria-label="Hours per day for ${name}">`;
        item.append(runtime);
    });

    customLoads.className = 'custom-load-list';
    customLoads.id = 'custom-load-list';
    addCustomButton.type = 'button';
    addCustomButton.className = 'add-custom-load';
    addCustomButton.id = 'add-custom-load';
    addCustomButton.textContent = '+ Add a custom appliance';
    liveEstimate.className = 'quote-live-estimate';
    liveEstimate.id = 'quote-live-estimate';
    liveEstimate.setAttribute('aria-live', 'polite');
    liveEstimate.setAttribute('aria-atomic', 'true');
    detailedAppliances.insertAdjacentElement('afterend', customLoads);
    customLoads.insertAdjacentElement('afterend', addCustomButton);
    addCustomButton.insertAdjacentElement('afterend', liveEstimate);

    const currency = value => new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0
    }).format(value);
    const number = value => Number.isFinite(Number(value)) ? Number(value) : 0;
    const formatWatts = value => `${Math.round(value).toLocaleString('en-NG')} W`;
    const formatEnergy = value => `${Math.round(value).toLocaleString('en-NG')} Wh (${(value / 1000).toFixed(2)} kWh)`;
    const formatKwh = value => `${value.toFixed(2)} kWh`;

    function getLoads() {
        const preset = [...document.querySelectorAll('.appliance-item')]
            .filter(item => item.querySelector('.appliance-check')?.checked)
            .map(item => ({
                name: item.querySelector('.appliance-check').value,
                quantity: Math.max(1, number(item.querySelector('.quantity output')?.textContent)),
                watts: number(item.querySelector('.wattage-range')?.value),
                hours: Math.min(24, Math.max(0, number(item.querySelector('.run-hours-input')?.value)))
            }));
        const custom = [...customLoads.querySelectorAll('.custom-load-row')]
            .map(row => ({
                name: row.querySelector('.custom-name').value.trim() || 'Custom appliance',
                quantity: Math.max(1, number(row.querySelector('.custom-quantity').value)),
                watts: Math.max(0, number(row.querySelector('.custom-watts').value)),
                hours: Math.min(24, Math.max(0, number(row.querySelector('.custom-hours').value)))
            }));
        return [...preset, ...custom].filter(load => load.watts > 0);
    }

    function recommendInverter(loadW) {
        const requiredW = loadW * 1.25;
        if (requiredW <= 0) return { requiredW, product: null };
        const candidates = inverters
            .map(product => ({ ...product, outputW: product.kva * 1000 * INVERTER_POWER_FACTOR }))
            .filter(product => product.outputW >= requiredW)
            .sort((a, b) => a.kva - b.kva || a.price - b.price);
        return { requiredW, product: candidates[0] || null };
    }

    function recommendBattery(loadW, backupHours) {
        const requiredUsableWh = loadW * backupHours;
        const requiredNominalKwh = requiredUsableWh / (1000 * BATTERY_USABLE_FRACTION);
        if (requiredNominalKwh <= 0) return { requiredUsableWh, requiredNominalKwh, bank: null };

        const candidates = batteries
            .filter(product => product.kwh > 0)
            .map(product => {
                const quantity = Math.max(1, Math.ceil(requiredNominalKwh / product.kwh));
                const capacityKwh = quantity * product.kwh;
                return {
                    product,
                    quantity,
                    capacityKwh,
                    usableKwh: capacityKwh * BATTERY_USABLE_FRACTION,
                    cost: quantity * product.price
                };
            })
            .sort((a, b) => a.capacityKwh - b.capacityKwh || a.cost - b.cost || a.quantity - b.quantity);

        return { requiredUsableWh, requiredNominalKwh, bank: candidates[0] || null };
    }

    function recommendPanels(dailyEnergyWh) {
        const requiredArrayW = dailyEnergyWh > 0
            ? dailyEnergyWh / (PEAK_SUN_HOURS * PV_SYSTEM_EFFICIENCY) * PV_RESERVE_MARGIN
            : 0;
        if (requiredArrayW <= 0) return { requiredArrayW, array: null };

        const candidates = panels
            .map(product => {
                const quantity = Math.ceil(requiredArrayW / product.watts);
                const capacityW = quantity * product.watts;
                return { product, quantity, capacityW, cost: quantity * product.price };
            })
            .sort((a, b) => a.cost - b.cost || a.capacityW - b.capacityW || a.quantity - b.quantity);

        return { requiredArrayW, array: candidates[0] || null };
    }

    function calculateEstimate() {
        const loads = getLoads();
        const connectedLoadW = loads.reduce((sum, load) => sum + load.quantity * load.watts, 0);
        const dailyEnergyWh = loads.reduce((sum, load) => sum + load.quantity * load.watts * load.hours, 0);
        const backupHours = number(hoursSlider.value);
        const inverter = recommendInverter(connectedLoadW);
        const battery = recommendBattery(connectedLoadW, backupHours);
        const solar = recommendPanels(dailyEnergyWh);
        const selectedSolutions = [...document.querySelectorAll('.choice.selected')].map(choice => choice.dataset.value);
        const needsCustom = connectedLoadW > 0 && (!inverter.product || !battery.bank || !solar.array);
        const knownBatteryProducts = batteries.filter(product => product.kwh > 0).length;

        return {
            loads,
            selectedSolutions,
            connectedLoadW,
            dailyEnergyWh,
            backupHours,
            inverter,
            battery,
            solar,
            needsCustom,
            totalCost: (inverter.product?.price || 0) + (battery.bank?.cost || 0) + (solar.array?.cost || 0),
            unknownBatteryProducts: batteries.length - knownBatteryProducts
        };
    }

    function renderRecommendation(name, value, detail = '') {
        return `<div class="quote-live-item"><span>${name}</span><strong>${value}</strong>${detail ? `<small>${detail}</small>` : ''}</div>`;
    }

    function updateLiveEstimate() {
        const selectedChoices = document.querySelectorAll('.choice.selected').length;
        picker.classList.toggle('is-hidden', selectedChoices === 0);
        const estimate = calculateEstimate();
        if (estimate.connectedLoadW <= 0) {
            liveEstimate.innerHTML = '<p class="quote-live-empty">Select at least one appliance or add a custom load to see a system estimate.</p>';
            return;
        }

        const inverterText = estimate.inverter.product
            ? estimate.inverter.product.name
            : 'Custom system required';
        const batteryText = estimate.battery.bank
            ? `${estimate.battery.bank.quantity} × ${estimate.battery.bank.product.name}`
            : 'Custom battery bank required';
        const panelText = estimate.solar.array
            ? `${estimate.solar.array.quantity} × ${estimate.solar.array.product.name}`
            : 'Custom solar array required';

        liveEstimate.innerHTML = `
          <div class="quote-live-heading"><span>LIVE SYSTEM ESTIMATE</span><small>Preliminary sizing from your current selections</small></div>
          <div class="quote-live-grid">
            ${renderRecommendation('CONNECTED LOAD', formatWatts(estimate.connectedLoadW), `Including 25% margin: ${formatWatts(estimate.inverter.requiredW)}`)}
            ${renderRecommendation('DAILY ENERGY', formatEnergy(estimate.dailyEnergyWh))}
            ${renderRecommendation('INVERTER', inverterText, estimate.inverter.product ? currency(estimate.inverter.product.price) : 'Available catalogue capacity exceeded')}
            ${renderRecommendation('BATTERY BANK', batteryText, estimate.battery.bank ? `${formatKwh(estimate.battery.bank.capacityKwh)} nominal` : 'Check custom system')}
            ${renderRecommendation('SOLAR ARRAY', panelText, estimate.solar.array ? `${formatWatts(estimate.solar.array.capacityW)} total` : 'Check custom system')}
          </div>
          <p class="quote-live-assumptions">Planning assumptions: 0.8 inverter power factor; 80% battery usable capacity and 90% conversion efficiency; 4.5 peak-sun hours, 80% PV system efficiency and 20% array reserve. Final sizing is confirmed after site assessment.</p>
          ${estimate.needsCustom ? '<p class="quote-custom-warning">Your load exceeds what the supplied catalogue can size. A custom or large-scale system is required.</p>' : ''}`;
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[char]);
    }

    function renderFinalQuote() {
        const estimate = calculateEstimate();
        const clientName = document.querySelector('#client-name').value.trim() || 'there';
        const clientEmail = document.querySelector('#client-email').value.trim();
        const summary = document.querySelector('#quote-summary');
        const solutionText = estimate.selectedSolutions.join(', ') || 'a tailored setup';
        summary.textContent = `Thanks, ${clientName}. Here is a preliminary equipment estimate for ${solutionText}${clientEmail ? `, prepared for ${clientEmail}` : ''}.`;

        let message = '';
        if (estimate.connectedLoadW <= 0) {
            message = '<p class="quote-custom-warning">Add at least one appliance or custom load before creating a system estimate.</p>';
        } else if (estimate.needsCustom) {
            message = '<p class="quote-custom-warning">Your load exceeds the supplied product range. A custom or large-scale system is required; the figures below are partial equipment estimates only.</p>';
        }

        const loadRows = estimate.loads.map(load => `<span>${escapeHtml(load.name)} × ${load.quantity} · ${formatWatts(load.watts)} each · ${load.hours} h/day</span>`).join('');
        const inverterRow = estimate.inverter.product
            ? `<div class="quote-line"><span>Recommended inverter: ${escapeHtml(estimate.inverter.product.name)} (${formatWatts(estimate.inverter.product.outputW)} rated at assumed power factor)</span><strong>${currency(estimate.inverter.product.price)}</strong></div>`
            : '<div class="quote-line"><span>Recommended inverter</span><strong>Custom design required</strong></div>';
        const batteryRow = estimate.battery.bank
            ? `<div class="quote-line"><span>Recommended battery: ${estimate.battery.bank.quantity} × ${escapeHtml(estimate.battery.bank.product.name)}<small>${formatKwh(estimate.battery.bank.capacityKwh)} nominal · ${formatKwh(estimate.battery.bank.usableKwh)} estimated usable</small></span><strong>${currency(estimate.battery.bank.cost)}</strong></div>`
            : '<div class="quote-line"><span>Recommended battery</span><strong>Custom design required</strong></div>';
        const panelRow = estimate.solar.array
            ? `<div class="quote-line"><span>Recommended panels: ${estimate.solar.array.quantity} × ${escapeHtml(estimate.solar.array.product.name)}<small>${formatWatts(estimate.solar.array.capacityW)} total solar capacity</small></span><strong>${currency(estimate.solar.array.cost)}</strong></div>`
            : '<div class="quote-line"><span>Recommended panels</span><strong>Not available</strong></div>';
        const unknownBatteryNote = estimate.unknownBatteryProducts
            ? `<p class="quote-note">${estimate.unknownBatteryProducts} battery catalogue entries have no stated kWh capacity and are not auto-sized. Please provide their capacity/voltage to include them.</p>`
            : '';

        let details = document.querySelector('.quote-breakdown');
        if (!details) {
            details = document.createElement('div');
            details.className = 'quote-breakdown';
            document.querySelector('#quote-summary').insertAdjacentElement('afterend', details);
        }
        details.innerHTML = `
          ${message}
          <div class="quote-spec-grid">
            <div><span>TOTAL CONNECTED LOAD</span><strong>${formatWatts(estimate.connectedLoadW)}</strong></div>
            <div><span>DAILY ENERGY</span><strong>${formatEnergy(estimate.dailyEnergyWh)}</strong></div>
            <div><span>BACKUP TARGET</span><strong>${estimate.backupHours} hours</strong></div>
            <div><span>BATTERY ENERGY REQUIRED</span><strong>${formatEnergy(estimate.battery.requiredUsableWh)}</strong><small>${formatKwh(estimate.battery.requiredNominalKwh)} nominal before product rounding</small></div>
          </div>
          <div class="quote-line-list">
            ${inverterRow}
            ${batteryRow}
            ${panelRow}
          </div>
          <div class="quote-total"><span>ESTIMATED EQUIPMENT TOTAL</span><strong>${currency(estimate.totalCost)}</strong></div>
          <details class="quote-load-details"><summary>Appliance load used for this estimate</summary><div>${loadRows || '<span>No appliance rows were included.</span>'}</div></details>
          <p class="quote-note">Battery bank assumes repeating identical units; voltage, parallel limits, phase and product compatibility must be confirmed during system design. Tubular batteries without stated kWh capacity and the Quanta battery are excluded from automatic sizing.</p>
          <p class="quote-note">Solar sizing assumes ${PEAK_SUN_HOURS} peak-sun hours per day, ${Math.round(PV_SYSTEM_EFFICIENCY * 100)}% system efficiency and a ${Math.round((PV_RESERVE_MARGIN - 1) * 100)}% array reserve. Equipment estimate only; installation and site-specific costs are confirmed after assessment.</p>`;
    }

    function addCustomLoad() {
        const row = document.createElement('article');
        row.className = 'custom-load-row';
        row.innerHTML = `
          <label>Appliance name<input class="custom-name" type="text" value="Custom appliance" maxlength="60"></label>
          <label>Quantity<input class="custom-quantity" type="number" min="1" step="1" value="1"></label>
          <label>Watts per unit<input class="custom-watts" type="number" min="1" step="1" value="500"></label>
          <label>Hours per day<input class="custom-hours" type="number" min="0" max="24" step="0.5" value="4"></label>
          <button class="remove-custom-load" type="button" aria-label="Remove custom appliance">Remove</button>`;
        customLoads.append(row);
        row.querySelector('.custom-name').focus();
        updateLiveEstimate();
    }

    document.querySelector('#add-custom-load').addEventListener('click', addCustomLoad);
    customLoads.addEventListener('click', event => {
        if (event.target.closest('.remove-custom-load')) {
            event.target.closest('.custom-load-row').remove();
            updateLiveEstimate();
        }
    });
    document.querySelector('.choice-grid').addEventListener('click', event => {
        if (event.target.closest('.choice')) requestAnimationFrame(updateLiveEstimate);
    });
    form.addEventListener('input', event => {
        if (event.target.matches('.appliance-check, .wattage-range, .run-hours-input, .custom-name, .custom-quantity, .custom-watts, .custom-hours, #hours')) updateLiveEstimate();
    });
    form.addEventListener('change', event => {
        if (event.target.matches('.appliance-check, .wattage-range, .run-hours-input, .custom-name, .custom-quantity, .custom-watts, .custom-hours, #hours')) updateLiveEstimate();
    });
    document.addEventListener('click', event => {
        if (event.target.closest('[data-change]')) updateLiveEstimate();
        if (event.target.closest('#next') && document.querySelector('#quote-modal').open) renderFinalQuote();
    });

    document.querySelector('#quote-modal').addEventListener('close', () => {
        form.reset();
        customLoads.replaceChildren();

        document.querySelectorAll('.choice').forEach(choice => {
            choice.classList.toggle('selected', choice.dataset.value === 'Home essentials');
        });

        document.querySelectorAll('.appliance-item').forEach(item => {
            const checkbox = item.querySelector('.appliance-check');
            item.classList.toggle('selected', checkbox.checked);
            item.querySelector('.quantity output').textContent = item.dataset.defaultQuantity;
            item.querySelector('.wattage-range').dispatchEvent(new Event('input', { bubbles: true }));
        });

        document.querySelector('.quote-breakdown')?.remove();
        document.querySelector('#quote-summary').textContent = '';
        hoursSlider.dispatchEvent(new Event('input', { bubbles: true }));

        while (form.querySelector('.form-step.active')?.dataset.step !== '1') {
            document.querySelector('#back').click();
        }

        updateLiveEstimate();
    });

    updateLiveEstimate();
})();
