import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'rgba(5, 8, 16, 0.85)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
    padding: '0 2rem',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    border: '2px solid #ef4444',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    animation: 'borderPulse 2s infinite',
  },
  logoDot: {
    width: '8px',
    height: '8px',
    background: '#ef4444',
    borderRadius: '50%',
    animation: 'pulse-dot 1.5s infinite',
  },
  logoText: {
    fontFamily: "'Orbitron', monospace",
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    color: '#e8eaf0',
  },
  logoSub: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '0.6rem',
    color: '#ef4444',
    letterSpacing: '0.2em',
    marginTop: '-4px',
  },
  liveIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '0.75rem',
    color: '#ef4444',
    letterSpacing: '0.1em',
  },
  liveDot: {
    width: '8px',
    height: '8px',
    background: '#ef4444',
    borderRadius: '50%',
    animation: 'pulse-dot 1s infinite',
  },
  datetime: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '0.7rem',
    color: '#4a5568',
    letterSpacing: '0.05em',
  }
};

export default function Navbar() {
  const [time, setTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d) =>
  d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }) + " IST";

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        <div style={styles.logoIcon}>
          <div style={styles.logoDot}></div>
        </div>
        <div>
          <div style={styles.logoText}>CONFLICT INTEL</div>
          <div style={styles.logoSub}>GLOBAL TRACKER v2.0</div>
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={styles.liveIndicator}>
          <div style={styles.liveDot}></div>
          LIVE MONITORING
        </div>
        <div style={styles.datetime}>{formatTime(time)}</div>
      </div>
    </nav>
  );
}
