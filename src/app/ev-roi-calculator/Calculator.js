'use client';

import { useState } from 'react';

function track(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

function inr(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

const DEFAULTS = {
  numChargers: 1,
  chargerCost: 87000,
  extraSetupCost: 0,
  meterType: 'Home Meter',
  evMeterSLD: 0,
  evMeterDeposit: 0,
  rate: 30,
  elecCost: 8,
  unitsPerSession: 2,
  sessionsPerDay: 7,
  landType: 'Own',
  monthlyRent: 0,
};

export default function Calculator() {
  const [inputs, setInputs] = useState(DEFAULTS);
  const [result, setResult] = useState(null);

  const update = (key) => (e) => {
    const raw = e.target.value;
    const val = e.target.type === 'number' ? (raw === '' ? '' : Number(raw)) : raw;
    setInputs((prev) => ({ ...prev, [key]: val }));
  };

  const num = (v) => (v === '' || v === undefined ? 0 : Number(v));

  const compute = () => {
    const numChargers = num(inputs.numChargers);
    const chargerCost = num(inputs.chargerCost);
    const extraSetupCost = num(inputs.extraSetupCost);
    const evMeterSLD = num(inputs.evMeterSLD);
    const evMeterDeposit = num(inputs.evMeterDeposit);
    const rate = num(inputs.rate);
    const elecCost = num(inputs.elecCost);
    const unitsPerSession = num(inputs.unitsPerSession);
    const sessionsPerDay = num(inputs.sessionsPerDay);
    const monthlyRent = num(inputs.monthlyRent);
    const isEvMeter = inputs.meterType === 'EV Meter';
    const isRent = inputs.landType === 'Rent';

    const commissionPct = numChargers >= 3 ? 0.2 : 0.15;
    const commissionPerUnit = rate * commissionPct;
    const profitPerUnit = rate - elecCost - commissionPerUnit;
    const profitPerSession = profitPerUnit * unitsPerSession;
    const effectiveMonthlyRent = isRent ? monthlyRent : 0;
    const totalInvestment = numChargers * chargerCost + extraSetupCost + (isEvMeter ? evMeterSLD : 0);
    const upfrontCashNeeded = totalInvestment + (isEvMeter ? evMeterDeposit : 0);

    const dailyProfitGross = profitPerSession * sessionsPerDay * numChargers;
    const monthlyProfitGross = dailyProfitGross * 30;
    const monthlyProfitNet = monthlyProfitGross - effectiveMonthlyRent;
    const annualProfitNet = monthlyProfitNet * 12;
    const paybackMonths = monthlyProfitNet > 0 ? totalInvestment / monthlyProfitNet : null;

    const scenarios = [
      { label: 'Quiet', sessions: 5 },
      { label: 'Moderate', sessions: 7 },
      { label: 'Busy', sessions: 10 },
      { label: 'Near-max', sessions: 13 },
    ].map((s) => {
      const net = profitPerSession * s.sessions * numChargers * 30 - effectiveMonthlyRent;
      const payback = net > 0 ? totalInvestment / net : null;
      return { ...s, net, payback };
    });

    setResult({
      commissionPct,
      commissionPerUnit,
      profitPerUnit,
      profitPerSession,
      effectiveMonthlyRent,
      totalInvestment,
      upfrontCashNeeded,
      dailyProfitGross,
      monthlyProfitGross,
      monthlyProfitNet,
      annualProfitNet,
      paybackMonths,
      scenarios,
    });

    track('calculate_roi_click', {
      num_chargers: numChargers,
      meter_type: inputs.meterType,
      land_type: inputs.landType,
    });

    setTimeout(() => {
      document.getElementById('evg-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleDownload = () => {
    track('download_excel_click', { source: 'ev-roi-calculator-page' });
  };

  return (
    <div className="evg-calc">
      <div className="evg-grid">
        <label className="evg-field">
          <span>Number of chargers</span>
          <input type="number" min="1" value={inputs.numChargers} onChange={update('numChargers')} />
        </label>

        <label className="evg-field">
          <span>Charger cost (₹ per charger)</span>
          <input type="number" min="0" value={inputs.chargerCost} onChange={update('chargerCost')} />
        </label>

        <label className="evg-field">
          <span>Extra one-time setup cost (canopy/wiring/meter)</span>
          <input type="number" min="0" value={inputs.extraSetupCost} onChange={update('extraSetupCost')} />
        </label>

        <label className="evg-field">
          <span>Meter type</span>
          <select value={inputs.meterType} onChange={update('meterType')}>
            <option>Home Meter</option>
            <option>EV Meter</option>
          </select>
        </label>

        {inputs.meterType === 'EV Meter' && (
          <>
            <label className="evg-field">
              <span>EV meter SLD charges (₹) — non-refundable</span>
              <input type="number" min="0" value={inputs.evMeterSLD} onChange={update('evMeterSLD')} />
            </label>
            <label className="evg-field">
              <span>EV meter deposit (₹) — refundable</span>
              <input type="number" min="0" value={inputs.evMeterDeposit} onChange={update('evMeterDeposit')} />
            </label>
          </>
        )}

        <label className="evg-field">
          <span>Rate charged to customer (₹ / unit)</span>
          <input type="number" min="0" value={inputs.rate} onChange={update('rate')} />
        </label>

        <label className="evg-field">
          <span>Electricity cost (₹ / unit)</span>
          <input type="number" min="0" value={inputs.elecCost} onChange={update('elecCost')} />
        </label>

        <label className="evg-field">
          <span>Avg units per session</span>
          <input type="number" min="0" step="0.1" value={inputs.unitsPerSession} onChange={update('unitsPerSession')} />
        </label>

        <label className="evg-field">
          <span>Sessions per day (per charger)</span>
          <input type="number" min="0" value={inputs.sessionsPerDay} onChange={update('sessionsPerDay')} />
        </label>

        <label className="evg-field">
          <span>Land</span>
          <select value={inputs.landType} onChange={update('landType')}>
            <option>Own</option>
            <option>Rent</option>
          </select>
        </label>

        {inputs.landType === 'Rent' && (
          <label className="evg-field">
            <span>Monthly rent (₹)</span>
            <input type="number" min="0" value={inputs.monthlyRent} onChange={update('monthlyRent')} />
          </label>
        )}
      </div>

      <button className="evg-calc-btn" onClick={compute}>
        Calculate ROI
      </button>

      {result && (
        <div id="evg-results" className="evg-results">
          <h2>Your Results</h2>

          <div className="evg-result-row evg-highlight">
            <span>Payback period</span>
            <strong>{result.paybackMonths ? `${result.paybackMonths.toFixed(1)} months` : 'Loss — inputs check karo'}</strong>
          </div>

          <div className="evg-result-row">
            <span>Total investment</span>
            <strong>{inr(result.totalInvestment)}</strong>
          </div>
          <div className="evg-result-row">
            <span>Upfront cash needed (incl. refundable deposit)</span>
            <strong>{inr(result.upfrontCashNeeded)}</strong>
          </div>
          <div className="evg-result-row">
            <span>Profit per session</span>
            <strong>{inr(result.profitPerSession)}</strong>
          </div>
          <div className="evg-result-row">
            <span>Daily profit (gross)</span>
            <strong>{inr(result.dailyProfitGross)}</strong>
          </div>
          <div className="evg-result-row">
            <span>Monthly profit (net, after rent)</span>
            <strong>{inr(result.monthlyProfitNet)}</strong>
          </div>
          <div className="evg-result-row">
            <span>Annual profit (net)</span>
            <strong>{inr(result.annualProfitNet)}</strong>
          </div>

          <h3>Scenario comparison (by footfall)</h3>
          <div className="evg-table-wrap">
            <table className="evg-table">
              <thead>
                <tr>
                  <th>Scenario</th>
                  {result.scenarios.map((s) => (
                    <th key={s.label}>{s.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sessions/day per charger</td>
                  {result.scenarios.map((s) => (
                    <td key={s.label}>{s.sessions}</td>
                  ))}
                </tr>
                <tr>
                  <td>Monthly profit (net)</td>
                  {result.scenarios.map((s) => (
                    <td key={s.label}>{inr(s.net)}</td>
                  ))}
                </tr>
                <tr>
                  <td>Payback (months)</td>
                  {result.scenarios.map((s) => (
                    <td key={s.label}>{s.payback ? s.payback.toFixed(1) : 'Loss'}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <a
        href="/ev-roi-calculator.xlsx"
        download
        onClick={handleDownload}
        className="evg-download-btn"
      >
        ⬇ Download Excel version (offline use ke liye)
      </a>

      <p className="evg-note">
        Commission: 3+ chargers = 20% (Premium), warna 15% (Basic). Payback non-refundable investment pe based hai.
      </p>
    </div>
  );
}
