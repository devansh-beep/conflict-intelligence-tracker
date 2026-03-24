import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Globe from '../components/Globe';
import ConflictCard from '../components/ConflictCard';
import StatsBar from '../components/StatsBar';
import { conflictsData, conflictTypeColors } from '../data/conflictsData';
import { useNavigate } from 'react-router-dom';

const FILTER_TYPES = ['all', 'civil war', 'proxy war', 'interstate war'];

export default function HomePage() {
  const [selectedConflict, setSelectedConflict] = useState(null);
  const [hoveredConflict, setHoveredConflict] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredConflicts = useMemo(() => {
    return conflictsData
      .filter(c => filter === 'all' || c.conflictType === filter)
      .filter(c => !search || c.country.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => b.severity - a.severity);
  }, [filter, search]);

  const handleSelect = (conflict) => {
    setSelectedConflict(conflict);
    setTimeout(() => navigate(`/conflict/${conflict.id}`), 150);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <Navbar />

      {/* Stats bar */}
      <div style={{ marginTop: '64px' }}>
        <StatsBar conflicts={conflictsData} />
      </div>

      {/* Main layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Sidebar */}
        <div style={{
          width: '340px',
          flexShrink: 0,
          background: 'rgba(5,8,16,0.95)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Search */}
          <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <input
              type="text"
              placeholder="Search conflicts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                padding: '8px 12px',
                color: '#e8eaf0',
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.75rem',
                outline: 'none',
                letterSpacing: '0.05em',
                marginBottom: '12px',
              }}
            />
            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {FILTER_TYPES.map(type => {
                const color = type === 'all' ? '#3b82f6' : conflictTypeColors[type];
                const active = filter === type;
                return (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      border: `1px solid ${active ? color : 'rgba(255,255,255,0.08)'}`,
                      background: active ? `${color}20` : 'transparent',
                      color: active ? color : '#4a5568',
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '0.6rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conflict count */}
          <div style={{ padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4a5568', letterSpacing: '0.1em' }}>
              {filteredConflicts.length} CONFLICT{filteredConflicts.length !== 1 ? 'S' : ''} TRACKED
            </span>
          </div>

          {/* Conflict list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
            {filteredConflicts.map(conflict => (
              <ConflictCard
                key={conflict.id}
                conflict={conflict}
                isSelected={selectedConflict?.id === conflict.id || hoveredConflict?.id === conflict.id}
                onClick={() => setSelectedConflict(conflict)}
              />
            ))}
          </div>
        </div>

        {/* Globe */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse at center, #080d20 0%, #050810 70%)' }}>
          {/* Scanline overlay */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
            pointerEvents: 'none',
            zIndex: 10,
          }} />

          {/* Corner decorations */}
          {['topleft', 'topright', 'bottomleft', 'bottomright'].map(pos => (
            <div key={pos} style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderTop: pos.includes('top') ? '2px solid rgba(239,68,68,0.4)' : 'none',
              borderBottom: pos.includes('bottom') ? '2px solid rgba(239,68,68,0.4)' : 'none',
              borderLeft: pos.includes('left') ? '2px solid rgba(239,68,68,0.4)' : 'none',
              borderRight: pos.includes('right') ? '2px solid rgba(239,68,68,0.4)' : 'none',
              top: pos.includes('top') ? '16px' : 'auto',
              bottom: pos.includes('bottom') ? '16px' : 'auto',
              left: pos.includes('left') ? '16px' : 'auto',
              right: pos.includes('right') ? '16px' : 'auto',
              zIndex: 11,
              pointerEvents: 'none',
            }} />
          ))}

          {/* Title overlay */}
          <div style={{
            position: 'absolute',
            top: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 11,
            pointerEvents: 'none',
          }}>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', color: 'rgba(239,68,68,0.6)', marginBottom: '4px' }}>
              GLOBAL CONFLICT INTELLIGENCE
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>
              INTERACTIVE 3D THEATRE OF OPERATIONS
            </div>
          </div>

          <Globe
            conflicts={filteredConflicts}
            onHover={setHoveredConflict}
            onSelect={handleSelect}
            selectedId={selectedConflict?.id}
          />
        </div>
      </div>
    </div>
  );
}
