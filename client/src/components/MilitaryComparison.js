import React from 'react';

const formatNum = (n) => {
  if (n === null || n === undefined) return '—';
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toLocaleString();
};

const formatBudget = (n) => {
  if (!n) return '—';
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(0) + 'M';
  return '$' + n.toLocaleString();
};

function CompareRow({ label, a, b, aName, bName, aColor, bColor, format }) {
  const aVal = typeof a === 'number' ? a : 0;
  const bVal = typeof b === 'number' ? b : 0;
  const max = Math.max(aVal, bVal, 1);
  const aPct = (aVal / max) * 100;
  const bPct = (bVal / max) * 100;

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4a5568', letterSpacing: '0.1em', marginBottom: '8px', textAlign: 'center' }}>
        {label}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '12px', alignItems: 'center' }}>
        {/* Side A */}
        <div>
          <div style={{ textAlign: 'right', fontFamily: "'Orbitron', monospace", fontSize: '0.85rem', fontWeight: 700, color: aColor, marginBottom: '4px' }}>
            {format ? format(a) : formatNum(a)}
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${aPct}%`, height: '100%', background: aColor, borderRadius: '3px', float: 'right', transition: 'width 0.8s ease' }} />
          </div>
        </div>

        {/* VS */}
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', textAlign: 'center' }}>VS</div>

        {/* Side B */}
        <div>
          <div style={{ textAlign: 'left', fontFamily: "'Orbitron', monospace", fontSize: '0.85rem', fontWeight: 700, color: bColor, marginBottom: '4px' }}>
            {format ? format(b) : formatNum(b)}
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${bPct}%`, height: '100%', background: bColor, borderRadius: '3px', transition: 'width 0.8s ease' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MilitaryComparison({ military }) {
  if (!military) return null;

  const sides = Object.entries(military);
  if (sides.length === 0) return null;

  const colors = ['#3b82f6', '#ef4444', '#a855f7', '#22c55e', '#f59e0b'];
  const sideColors = sides.map((_, i) => colors[i % colors.length]);

  const getField = (data, field) => data?.[field] ?? null;

  if (sides.length === 1) {
    const [name, data] = sides[0];
    return (
      <div style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '24px' }}>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: '#8892a4', marginBottom: '20px' }}>
          MILITARY ASSETS — {name.toUpperCase().replace('_', ' ')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { label: 'Personnel', value: formatNum(data.activePersonnel) },
            { label: 'Tanks', value: formatNum(data.tanks) },
            { label: 'Aircraft', value: formatNum(data.aircraft) },
            { label: 'Naval Vessels', value: formatNum(data.navy) },
            { label: 'Nuclear Warheads', value: formatNum(data.nuclearWarheads) },
            { label: 'Defense Budget', value: formatBudget(data.militaryBudgetUSD) },
          ].map(item => (
            <div key={item.label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', marginBottom: '4px' }}>{item.label.toUpperCase()}</div>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.9rem', fontWeight: 700, color: '#3b82f6' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const [nameA, dataA] = sides[0];
  const [nameB, dataB] = sides[1];
  const colorA = sideColors[0];
  const colorB = sideColors[1];

  return (
    <div style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '24px' }}>
      <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: '#8892a4', marginBottom: '20px' }}>
        MILITARY STRENGTH COMPARISON
      </div>

      {/* Side labels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.75rem', fontWeight: 700, color: colorA, letterSpacing: '0.1em' }}>
            {nameA.toUpperCase().replace('_', ' ')}
          </div>
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4a5568', display: 'flex', alignItems: 'center' }}>⚔</div>
        <div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.75rem', fontWeight: 700, color: colorB, letterSpacing: '0.1em' }}>
            {nameB.toUpperCase().replace('_', ' ')}
          </div>
        </div>
      </div>

      <CompareRow label="ACTIVE PERSONNEL" a={dataA?.activePersonnel} b={dataB?.activePersonnel} aColor={colorA} bColor={colorB} />
      <CompareRow label="TANKS & ARMORED VEHICLES" a={dataA?.tanks} b={dataB?.tanks} aColor={colorA} bColor={colorB} />
      <CompareRow label="TOTAL AIRCRAFT" a={dataA?.aircraft} b={dataB?.aircraft} aColor={colorA} bColor={colorB} />
      <CompareRow label="NAVAL VESSELS" a={dataA?.navy} b={dataB?.navy} aColor={colorA} bColor={colorB} />
      <CompareRow label="NUCLEAR WARHEADS" a={dataA?.nuclearWarheads} b={dataB?.nuclearWarheads} aColor={colorA} bColor={colorB} />
      <CompareRow label="DEFENSE BUDGET" a={dataA?.militaryBudgetUSD} b={dataB?.militaryBudgetUSD} aColor={colorA} bColor={colorB} format={formatBudget} />

      {/* GWP Index */}
      {(dataA?.gwpIndex || dataB?.gwpIndex) && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4a5568', marginBottom: '8px', textAlign: 'center' }}>
            GLOBAL FIRE POWER INDEX (lower = stronger)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[[nameA, dataA, colorA], [nameB, dataB, colorB]].map(([name, data, color]) => (
              data?.gwpIndex && (
                <div key={name} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '12px' }}>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', marginBottom: '4px' }}>{name.toUpperCase().replace('_', ' ')}</div>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1rem', fontWeight: 700, color }}>{data.gwpIndex}</div>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
