import React from 'react';
import { powerRankingsData } from '../data/conflictsData';

const formatNum = (n) => {
  if (!n) return '—';
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(0) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(0) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return n.toLocaleString();
};

const medalColor = (rank) => {
  if (rank === 1) return '#ffd700';
  if (rank === 2) return '#c0c0c0';
  if (rank === 3) return '#cd7f32';
  return '#4a5568';
};

export default function PowerRankings({ highlightCodes = [] }) {
  return (
    <div style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: '#8892a4' }}>
          GLOBAL FIRE POWER INDEX — TOP 10
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4a5568', marginTop: '4px' }}>
          Lower score = greater military power
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['RANK', 'COUNTRY', 'GFP SCORE', 'PERSONNEL', 'TANKS', 'AIRCRAFT', 'NAVAL', 'NUCLEAR', 'BUDGET'].map(h => (
                <th key={h} style={{ padding: '10px 14px', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', letterSpacing: '0.1em', textAlign: h === 'RANK' || h === 'COUNTRY' ? 'left' : 'right', fontWeight: 500 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {powerRankingsData.map((r) => {
              const isHighlighted = highlightCodes.includes(r.countryCode);
              return (
                <tr key={r.rank} style={{
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  background: isHighlighted ? 'rgba(239,68,68,0.07)' : 'transparent',
                  transition: 'background 0.2s',
                }}>
                  <td style={{ padding: '12px 14px', fontFamily: "'Orbitron', monospace", fontSize: '0.8rem', fontWeight: 700, color: medalColor(r.rank) }}>
                    #{r.rank}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: isHighlighted ? '#ef4444' : '#e8eaf0' }}>
                        {r.country}
                      </div>
                      {isHighlighted && (
                        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: '#ef4444', border: '1px solid rgba(239,68,68,0.4)', padding: '1px 5px', borderRadius: '2px' }}>
                          IN CONFLICT
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.75rem', color: r.rank <= 3 ? '#ffd700' : '#06b6d4', fontWeight: 600 }}>
                      {r.score}
                    </span>
                  </td>
                  {[
                    formatNum(r.activePersonnel),
                    formatNum(r.tanks),
                    formatNum(r.aircraft),
                    formatNum(r.navy),
                    r.nuclearWarheads > 0 ? `☢ ${r.nuclearWarheads.toLocaleString()}` : '—',
                    formatNum(r.budget),
                  ].map((val, i) => (
                    <td key={i} style={{ padding: '12px 14px', textAlign: 'right', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color: val.includes('☢') ? '#f59e0b' : '#8892a4' }}>
                      {val}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
