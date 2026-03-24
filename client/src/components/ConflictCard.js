import React from 'react';
import { useNavigate } from 'react-router-dom';
import { conflictTypeColors, statusColors } from '../data/conflictsData';

const formatNumber = (n) => {
  if (!n) return '—';
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toLocaleString();
};

function SeverityBar({ score }) {
  const color = score >= 9 ? '#ef4444' : score >= 7 ? '#f97316' : score >= 5 ? '#f59e0b' : '#22c55e';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${score * 10}%`, height: '100%', background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: '2px', transition: 'width 0.5s ease' }} />
      </div>
      <span style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.75rem', fontWeight: 700, color, minWidth: '28px' }}>{score}</span>
    </div>
  );
}

export default function ConflictCard({ conflict, isSelected, onClick }) {
  const navigate = useNavigate();
  const typeColor = conflictTypeColors[conflict.conflictType] || '#ef4444';
  const statusColor = statusColors[conflict.status] || '#ef4444';

  return (
    <div
      onClick={onClick}
      style={{
        background: isSelected ? 'rgba(15,20,40,0.95)' : 'rgba(10,15,30,0.7)',
        border: `1px solid ${isSelected ? typeColor + '60' : 'rgba(255,255,255,0.07)'}`,
        borderLeft: `3px solid ${typeColor}`,
        borderRadius: '8px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: isSelected ? `0 0 20px ${typeColor}22` : 'none',
        marginBottom: '8px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.8rem', fontWeight: 700, color: '#e8eaf0', letterSpacing: '0.05em' }}>
            {conflict.country.toUpperCase()}
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: statusColor, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ animation: conflict.status === 'active' ? 'pulse-dot 1.2s infinite' : 'none', display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: statusColor }} />
            {conflict.status.toUpperCase()}
          </div>
        </div>
        <span style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.55rem',
          padding: '3px 8px',
          borderRadius: '3px',
          background: `${typeColor}15`,
          color: typeColor,
          border: `1px solid ${typeColor}33`,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
        }}>
          {conflict.conflictType}
        </span>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
        <div style={{ background: 'rgba(239,68,68,0.06)', borderRadius: '4px', padding: '8px' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', marginBottom: '2px' }}>CASUALTIES</div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.85rem', fontWeight: 700, color: '#ef4444' }}>{formatNumber(conflict.activeDeaths)}</div>
        </div>
        <div style={{ background: 'rgba(249,115,22,0.06)', borderRadius: '4px', padding: '8px' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', marginBottom: '2px' }}>DISPLACED</div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.85rem', fontWeight: 700, color: '#f97316' }}>{formatNumber(conflict.displaced)}</div>
        </div>
      </div>

      {/* Severity */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', marginBottom: '4px' }}>SEVERITY INDEX</div>
        <SeverityBar score={conflict.severity} />
      </div>

      {/* Parties */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', marginBottom: '4px' }}>PARTIES</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {conflict.parties.slice(0, 3).map((p, i) => (
            <span key={i} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', padding: '2px 6px', borderRadius: '3px', background: 'rgba(255,255,255,0.05)', color: '#8892a4', border: '1px solid rgba(255,255,255,0.07)' }}>
              {p}
            </span>
          ))}
          {conflict.parties.length > 3 && <span style={{ fontSize: '0.55rem', color: '#4a5568' }}>+{conflict.parties.length - 3}</span>}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={(e) => { e.stopPropagation(); navigate(`/conflict/${conflict.id}`); }}
        style={{
          width: '100%',
          padding: '8px',
          background: `${typeColor}15`,
          border: `1px solid ${typeColor}44`,
          borderRadius: '5px',
          color: typeColor,
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.target.style.background = `${typeColor}30`; }}
        onMouseLeave={e => { e.target.style.background = `${typeColor}15`; }}
      >
        ▶ FULL INTEL REPORT
      </button>
    </div>
  );
}
