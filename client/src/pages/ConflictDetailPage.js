import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { conflictsData, conflictTypeColors, statusColors } from '../data/conflictsData';
import Navbar from '../components/Navbar';
import MilitaryComparison from '../components/MilitaryComparison';
import PowerRankings from '../components/PowerRankings.js';

const formatNumber = (n) => {
  if (!n) return '—';
  if (n >= 1000000) return (n / 1000000).toFixed(2) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toLocaleString();
};

const formatDate = (d) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '3px', height: '20px', background: 'linear-gradient(180deg, #ef4444, #f97316)', borderRadius: '2px' }} />
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', color: '#e8eaf0' }}>{title}</div>
      </div>
      {sub && <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4a5568', marginTop: '4px', paddingLeft: '15px', letterSpacing: '0.05em' }}>{sub}</div>}
    </div>
  );
}

function StatCard({ label, value, color = '#ef4444', icon }) {
  return (
    <div style={{
      background: 'rgba(10,15,30,0.8)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '10px',
      padding: '20px',
      borderTop: `2px solid ${color}`,
    }}>
      {icon && <div style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{icon}</div>}
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', letterSpacing: '0.15em', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.4rem', fontWeight: 700, color }}>{value}</div>
    </div>
  );
}

function Timeline({ events }) {
  return (
    <div style={{ position: 'relative', paddingLeft: '24px' }}>
      {/* vertical line */}
      <div style={{ position: 'absolute', left: '6px', top: 0, bottom: 0, width: '1px', background: 'rgba(239,68,68,0.2)' }} />

      {events.map((ev, i) => (
        <div key={i} style={{ position: 'relative', marginBottom: '20px', animation: `fadeInUp 0.4s ease ${i * 0.07}s both` }}>
          {/* dot */}
          <div style={{
            position: 'absolute',
            left: '-20px',
            top: '4px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: i === events.length - 1 ? '#ef4444' : '#1e3050',
            border: `2px solid ${i === events.length - 1 ? '#ef4444' : 'rgba(239,68,68,0.3)'}`,
            boxShadow: i === events.length - 1 ? '0 0 8px rgba(239,68,68,0.6)' : 'none',
          }} />
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#ef4444', marginBottom: '2px', letterSpacing: '0.05em' }}>
            {formatDate(ev.date)}
          </div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '0.9rem', color: '#c8ccd6', lineHeight: 1.4 }}>{ev.event}</div>
        </div>
      ))}
    </div>
  );
}

function SeverityMeter({ score }) {
  const color = score >= 9 ? '#ef4444' : score >= 7 ? '#f97316' : score >= 5 ? '#f59e0b' : '#22c55e';
  const label = score >= 9 ? 'CATASTROPHIC' : score >= 7 ? 'SEVERE' : score >= 5 ? 'MODERATE' : 'LOW';
  return (
    <div style={{ background: 'rgba(10,15,30,0.8)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '24px', textAlign: 'center' }}>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4a5568', letterSpacing: '0.15em', marginBottom: '16px' }}>SEVERITY INDEX</div>
      <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 16px' }}>
        <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="50"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${(score / 10) * 314} 314`}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.8rem', fontWeight: 900, color, lineHeight: 1 }}>{score}</div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: '#4a5568' }}>/10</div>
        </div>
      </div>
      <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.7rem', fontWeight: 700, color, letterSpacing: '0.15em' }}>{label}</div>
    </div>
  );
}

export default function ConflictDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const conflict = conflictsData.find(c => c.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!conflict) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#050810', color: '#ef4444', fontFamily: "'Orbitron', monospace" }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>⚠</div>
          <div>CONFLICT DATA NOT FOUND</div>
          <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#ef4444', borderRadius: '6px', cursor: 'pointer', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem' }}>
            ← RETURN TO MAP
          </button>
        </div>
      </div>
    );
  }

  const typeColor = conflictTypeColors[conflict.conflictType] || '#ef4444';
  const statusColor = statusColors[conflict.status] || '#ef4444';

  const tabs = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'military', label: 'MILITARY INTEL' },
    { id: 'rankings', label: 'POWER RANKINGS' },
    { id: 'timeline', label: 'TIMELINE' },
  ];

  const highlightCodes = conflict.globalPowerRankings.map(r => {
    const found = { 'Russia': 'RU', 'Ukraine': 'UA', 'Israel': 'IL', 'Saudi Arabia': 'SA', 'India': 'IN', 'Pakistan': 'PK', 'Sudan': 'SD', 'Ethiopia': 'ET', 'Myanmar': 'MM' };
    return found[r.country] || '';
  }).filter(Boolean);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', fontFamily: "'Rajdhani', sans-serif" }}>
      <Navbar />

      {/* Hero Header */}
      <div style={{
        marginTop: '64px',
        background: `linear-gradient(135deg, rgba(5,8,16,0.98) 0%, rgba(15,5,5,0.95) 100%)`,
        borderBottom: `1px solid ${typeColor}33`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${typeColor}08 1px, transparent 1px), linear-gradient(90deg, ${typeColor}08 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 40px 32px', position: 'relative' }}>
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '7px 16px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '5px',
              color: '#8892a4',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              marginBottom: '28px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${typeColor}60`; e.currentTarget.style.color = typeColor; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#8892a4'; }}
          >
            ← BACK TO GLOBAL MAP
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              {/* Classification header */}
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4a5568', letterSpacing: '0.2em', marginBottom: '8px' }}>
                CLASSIFIED — CONFLICT INTELLIGENCE REPORT
              </div>

              {/* Country name */}
              <h1 style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 900,
                color: '#e8eaf0',
                letterSpacing: '0.05em',
                marginBottom: '12px',
                lineHeight: 1.1,
              }}>
                {conflict.country.toUpperCase()}
              </h1>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.65rem',
                  padding: '5px 14px',
                  borderRadius: '4px',
                  background: `${typeColor}18`,
                  color: typeColor,
                  border: `1px solid ${typeColor}44`,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  ⚔ {conflict.conflictType}
                </span>
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.65rem',
                  padding: '5px 14px',
                  borderRadius: '4px',
                  background: `${statusColor}18`,
                  color: statusColor,
                  border: `1px solid ${statusColor}44`,
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColor, display: 'inline-block', animation: conflict.status === 'active' ? 'pulse-dot 1.2s infinite' : 'none' }} />
                  {conflict.status.toUpperCase()}
                </span>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: '#4a5568', letterSpacing: '0.05em' }}>
                  ACTIVE SINCE {conflict.startDate}
                </span>
              </div>
            </div>

            {/* Quick stats */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {[
                { label: 'CASUALTIES', value: formatNumber(conflict.activeDeaths), color: '#ef4444' },
                { label: 'DISPLACED', value: formatNumber(conflict.displaced), color: '#f97316' },
                { label: 'CIVILIANS', value: formatNumber(conflict.civilianCasualties), color: '#f59e0b' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', minWidth: '90px' }}>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', letterSpacing: '0.1em', marginBottom: '4px' }}>{s.label}</div>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1.3rem', fontWeight: 700, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '2px', marginTop: '32px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 20px',
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  color: activeTab === tab.id ? typeColor : '#4a5568',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: `2px solid ${activeTab === tab.id ? typeColor : 'transparent'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  marginBottom: '-1px',
                }}
                onMouseEnter={e => { if (activeTab !== tab.id) e.target.style.color = '#8892a4'; }}
                onMouseLeave={e => { if (activeTab !== tab.id) e.target.style.color = '#4a5568'; }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 40px' }}>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px', alignItems: 'start' }}>
            <div>
              {/* Summary */}
              <div style={{ marginBottom: '32px' }}>
                <SectionHeader title="SITUATION SUMMARY" sub="INTELLIGENCE BRIEF" />
                <div style={{
                  background: 'rgba(10,15,30,0.7)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '10px',
                  padding: '24px',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '1rem',
                  color: '#c8ccd6',
                  lineHeight: 1.8,
                  borderLeft: `3px solid ${typeColor}44`,
                }}>
                  {conflict.summary}
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ marginBottom: '32px' }}>
                <SectionHeader title="CASUALTY REPORT" sub="ESTIMATED FIGURES — ICRC / UN DATA" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <StatCard label="TOTAL CASUALTIES" value={formatNumber(conflict.activeDeaths)} color="#ef4444" icon="💀" />
                  <StatCard label="CIVILIAN DEATHS" value={formatNumber(conflict.civilianCasualties)} color="#f97316" icon="👤" />
                  <StatCard label="PERSONS DISPLACED" value={formatNumber(conflict.displaced)} color="#f59e0b" icon="🏕" />
                </div>
              </div>

              {/* Territory */}
              <div style={{ marginBottom: '32px' }}>
                <SectionHeader title="THEATRE OF OPERATIONS" sub="AFFECTED TERRITORY" />
                <div style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>🗺</span>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: '#c8ccd6', lineHeight: 1.6 }}>{conflict.territory}</div>
                </div>
              </div>

              {/* Parties & Proxies */}
              <div>
                <SectionHeader title="BELLIGERENTS & ACTORS" sub="DIRECT AND PROXY INVOLVEMENT" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '20px' }}>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4a5568', letterSpacing: '0.1em', marginBottom: '14px' }}>PRIMARY PARTIES</div>
                    {conflict.parties.map((p, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: typeColor, flexShrink: 0 }} />
                        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '0.95rem', color: '#e8eaf0', fontWeight: 500 }}>{p}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '20px' }}>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4a5568', letterSpacing: '0.1em', marginBottom: '14px' }}>PROXY / EXTERNAL ACTORS</div>
                    {conflict.proxyActors.length > 0 ? conflict.proxyActors.map((p, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7', flexShrink: 0 }} />
                        <span style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '0.95rem', color: '#c8ccd6', fontWeight: 500 }}>{p}</span>
                      </div>
                    )) : <div style={{ color: '#4a5568', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>NO KNOWN PROXIES</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <SeverityMeter score={conflict.severity} />

              {/* Conflict metadata card */}
              <div style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '20px' }}>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4a5568', letterSpacing: '0.1em', marginBottom: '16px' }}>CONFLICT METADATA</div>
                {[
                  { label: 'START DATE', value: formatDate(conflict.startDate) },
                  { label: 'CONFLICT TYPE', value: conflict.conflictType, color: typeColor },
                  { label: 'STATUS', value: conflict.status, color: statusColor },
                  { label: 'CONFLICT ID', value: conflict.id.toUpperCase() },
                  { label: 'COORDINATES', value: `${conflict.coordinates.lat.toFixed(2)}°N, ${conflict.coordinates.lng.toFixed(2)}°E` },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', letterSpacing: '0.05em' }}>{item.label}</span>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: item.color || '#8892a4', textAlign: 'right', maxWidth: '140px' }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* GWP rankings for this conflict */}
              {conflict.globalPowerRankings.length > 0 && (
                <div style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '20px' }}>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4a5568', letterSpacing: '0.1em', marginBottom: '16px' }}>GFP RANKINGS OF PARTIES</div>
                  {conflict.globalPowerRankings.map(r => (
                    <div key={r.country} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div>
                        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: '#e8eaf0' }}>{r.country}</div>
                        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568' }}>GFP Score: {r.score}</div>
                      </div>
                      <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '1rem', fontWeight: 700, color: r.rank <= 5 ? '#ffd700' : r.rank <= 15 ? '#06b6d4' : '#8892a4' }}>
                        #{r.rank}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MILITARY TAB */}
        {activeTab === 'military' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <SectionHeader title="MILITARY INTELLIGENCE" sub="COMPARATIVE FORCE ANALYSIS" />
            <MilitaryComparison military={conflict.military} />

            {/* Nuclear warning if applicable */}
            {Object.values(conflict.military).some(m => m.nuclearWarheads > 0) && (
              <div style={{
                background: 'rgba(245,158,11,0.07)',
                border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: '10px',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <span style={{ fontSize: '1.8rem' }}>☢</span>
                <div>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.7rem', fontWeight: 700, color: '#f59e0b', letterSpacing: '0.1em', marginBottom: '4px' }}>
                    NUCLEAR-ARMED PARTIES INVOLVED
                  </div>
                  <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '0.9rem', color: '#8892a4', lineHeight: 1.5 }}>
                    One or more belligerents in this conflict possess nuclear capabilities. Any escalation to strategic level would have global consequences.
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* RANKINGS TAB */}
        {activeTab === 'rankings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <SectionHeader title="GLOBAL FIRE POWER INDEX" sub="WORLD MILITARY POWER RANKINGS 2024 — LOWER SCORE = GREATER POWER" />
            <PowerRankings highlightCodes={highlightCodes} />
            <div style={{
              background: 'rgba(10,15,30,0.7)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '10px',
              padding: '20px 24px',
            }}>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4a5568', letterSpacing: '0.1em', marginBottom: '10px' }}>ABOUT THE GFP INDEX</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '0.9rem', color: '#8892a4', lineHeight: 1.7 }}>
                The Global Fire Power (GFP) index ranks world military powers using over 60 factors including military assets, geography, logistics, natural resources, financial stability, and allied partnerships. A score of 0.0000 is a perfect power rating (theoretical). The index does not use nuclear capabilities as the primary factor — a nuclear-armed nation can still rank poorly based on conventional capability deficiencies.
              </div>
            </div>
          </div>
        )}

        {/* TIMELINE TAB */}
        {activeTab === 'timeline' && (
          <div style={{ maxWidth: '800px' }}>
            <SectionHeader title="CONFLICT TIMELINE" sub={`KEY EVENTS — ${conflict.startDate} TO PRESENT`} />
            <div style={{ background: 'rgba(10,15,30,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '32px 32px 32px 40px' }}>
              <Timeline events={conflict.keyEvents} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
