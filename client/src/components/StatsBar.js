import React from 'react';

const formatNumber = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toLocaleString();
};

export default function StatsBar({ conflicts }) {
  const totalDeaths = conflicts.reduce((s, c) => s + (c.activeDeaths || 0), 0);
  const totalDisplaced = conflicts.reduce((s, c) => s + (c.displaced || 0), 0);
  const activeCount = conflicts.filter(c => c.status === 'active').length;
  const avgSeverity = (conflicts.reduce((s, c) => s + c.severity, 0) / conflicts.length).toFixed(1);

  const stats = [
    { label: 'ACTIVE CONFLICTS', value: conflicts.length, color: '#ef4444', sub: `${activeCount} active` },
    { label: 'TOTAL CASUALTIES', value: formatNumber(totalDeaths), color: '#ef4444', sub: 'estimated deaths' },
    { label: 'DISPLACED PERSONS', value: formatNumber(totalDisplaced), color: '#f97316', sub: 'civilian displacement' },
    { label: 'AVG SEVERITY', value: avgSeverity, color: '#f59e0b', sub: 'global index /10' },
    { label: 'CIVIL WARS', value: conflicts.filter(c => c.conflictType === 'civil war').length, color: '#ff6b35', sub: 'intrastate' },
    { label: 'PROXY WARS', value: conflicts.filter(c => c.conflictType === 'proxy war').length, color: '#a855f7', sub: 'state-backed' },
    { label: 'INTERSTATE', value: conflicts.filter(c => c.conflictType === 'interstate war').length, color: '#3b82f6', sub: 'nation vs nation' },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: '1px',
      background: 'rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden',
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          flex: 1,
          padding: '14px 16px',
          background: 'rgba(5,8,16,0.6)',
          borderRight: '1px solid rgba(255,255,255,0.04)',
          minWidth: '100px',
        }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', letterSpacing: '0.1em', marginBottom: '4px' }}>{s.label}</div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.1rem', fontWeight: 700, color: s.color, marginBottom: '2px' }}>{s.value}</div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568' }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
