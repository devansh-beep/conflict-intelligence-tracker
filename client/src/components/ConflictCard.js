import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { conflictTypeColors, statusColors } from '../data/conflictsData';
 
const NEWS_API_KEY = '748c2ad683f34bd9bc96496a37d0314f';
 
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
        <div style={{ width: `${score * 10}%`, height: '100%', background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: '2px' }} />
      </div>
      <span style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.75rem', fontWeight: 700, color, minWidth: '28px' }}>{score}</span>
    </div>
  );
}
 
// ── FEATURE 2: Severity Alert Badge ──────────────────────
function SeverityAlert({ score }) {
  const [visible, setVisible] = useState(true);
 
  // Blink effect
  useEffect(() => {
    const interval = setInterval(() => setVisible(v => !v), 800);
    return () => clearInterval(interval);
  }, []);
 
  if (score < 8) return null; // Only show for high severity
 
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      background: 'rgba(239,68,68,0.15)',
      border: '1px solid rgba(239,68,68,0.6)',
      borderRadius: '4px',
      padding: '3px 8px',
      marginBottom: '8px',
    }}>
      {/* Blinking dot */}
      <div style={{
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: '#ef4444',
        opacity: visible ? 1 : 0.2,
        transition: 'opacity 0.3s ease',
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.6rem',
        color: '#ef4444',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        ⚠ HIGH SEVERITY ALERT — SCORE {score}/10
      </span>
    </div>
  );
}
 
// ── FEATURE 1: Live News Section ──────────────────────
function LiveNews({ country }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
 
  const fetchNews = async () => {
    if (news.length > 0) { setOpen(o => !o); return; } // Already fetched
    setLoading(true);
    setOpen(true);
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(country + ' conflict war')}&sortBy=publishedAt&pageSize=3&language=en&apiKey=${NEWS_API_KEY}`
      );
      const data = await res.json();
      setNews(data.articles || []);
    } catch {
      setNews([]);
    }
    setLoading(false);
  };
 
  return (
    <div style={{ marginTop: '10px' }}>
      {/* Toggle button */}
      <button
        onClick={(e) => { e.stopPropagation(); fetchNews(); }}
        style={{
          width: '100%',
          padding: '6px',
          background: 'rgba(59,130,246,0.1)',
          border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: '4px',
          color: '#3b82f6',
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        <span style={{ fontSize: '0.7rem' }}>📰</span>
        {open ? 'HIDE LIVE NEWS' : 'SHOW LIVE NEWS'}
      </button>
 
      {/* News items */}
      {open && (
        <div style={{ marginTop: '8px' }}>
          {loading && (
            <div style={{ color: '#4a5568', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', textAlign: 'center', padding: '8px' }}>
              Fetching latest intel...
            </div>
          )}
          {!loading && news.length === 0 && (
            <div style={{ color: '#4a5568', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', textAlign: 'center', padding: '8px' }}>
              No recent news found
            </div>
          )}
          {!loading && news.map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'block',
                marginBottom: '6px',
                padding: '8px',
                background: 'rgba(59,130,246,0.05)',
                border: '1px solid rgba(59,130,246,0.15)',
                borderRadius: '4px',
                textDecoration: 'none',
              }}
            >
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.6rem',
                color: '#e8eaf0',
                lineHeight: '1.4',
                marginBottom: '3px',
              }}>
                {article.title?.slice(0, 80)}{article.title?.length > 80 ? '...' : ''}
              </div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: '#4a5568' }}>
                {article.source?.name} · {new Date(article.publishedAt).toLocaleDateString()}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
 
// ── MAIN ConflictCard ──────────────────────
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
 
      {/* FEATURE 2: Severity Alert Badge */}
      <SeverityAlert score={conflict.severity} />
 
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
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', marginBottom: '4px' }}>SEVERITY</div>
        <SeverityBar score={conflict.severity} />
      </div>
 
      {/* Parties */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', marginBottom: '4px' }}>PARTIES</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {conflict.parties.slice(0, 3).map((p, i) => (
            <span key={i} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', padding: '2px 6px', borderRadius: '3px', border: `1px solid ${typeColor}33`, color: '#4a5568' }}>
              {p}
            </span>
          ))}
          {conflict.parties.length > 3 && <span style={{ fontSize: '0.55rem', color: '#4a5568' }}>+{conflict.parties.length - 3}</span>}
        </div>
      </div>
 
      {/* FEATURE 1: Live News */}
      <LiveNews country={conflict.country} />
 
      {/* CTA Button */}
      <button
        onClick={(e) => { e.stopPropagation(); navigate(`/conflict/${conflict.id}`); }}
        style={{
          width: '100%',
          padding: '8px',
          marginTop: '10px',
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
        onMouseEnter={(e) => { e.target.style.background = `${typeColor}30`; }}
        onMouseLeave={(e) => { e.target.style.background = `${typeColor}15`; }}
      >
        + FULL INTEL REPORT
      </button>
    </div>
  );
}
 