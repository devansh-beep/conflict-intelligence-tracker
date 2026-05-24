import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
 
// Fix marker icon issue with React
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});
 
// Get color based on severity
function getSeverityColor(severity) {
  if (severity >= 9) return '#ef4444'; // red
  if (severity >= 7) return '#f97316'; // orange
  if (severity >= 5) return '#f59e0b'; // yellow
  return '#22c55e';                    // green
}
 
// Get radius based on severity
function getRadius(severity) {
  return severity * 3 + 5;
}
 
// Auto fit map to show all markers
function FitBounds({ conflicts }) {
  const map = useMap();
  useEffect(() => {
    if (conflicts.length > 0) {
      const bounds = conflicts
        .filter(c => c.coordinates)
        .map(c => [c.coordinates.lat, c.coordinates.lng]);
      if (bounds.length > 0) map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [conflicts, map]);
  return null;
}
 
export default function ConflictMap({ conflicts, onSelectConflict }) {
  const validConflicts = conflicts.filter(c => c.coordinates);
 
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
 
      {/* Header */}
      <div style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        zIndex: 1000, background: 'rgba(5,8,16,0.9)',
        border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px',
        padding: '6px 16px', textAlign: 'center',
      }}>
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.7rem', color: '#ef4444', letterSpacing: '0.15em' }}>
          2D CONFLICT MAP
        </div>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568' }}>
          {validConflicts.length} ACTIVE ZONES · CLICK MARKER FOR INTEL
        </div>
      </div>
 
      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 30, left: 10, zIndex: 1000,
        background: 'rgba(5,8,16,0.9)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px', padding: '10px',
      }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#4a5568', marginBottom: '6px' }}>SEVERITY SCALE</div>
        {[
          { label: 'CRITICAL (9-10)', color: '#ef4444' },
          { label: 'HIGH (7-8)', color: '#f97316' },
          { label: 'MEDIUM (5-6)', color: '#f59e0b' },
          { label: 'LOW (1-4)', color: '#22c55e' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: '#e8eaf0' }}>{item.label}</span>
          </div>
        ))}
      </div>
 
      {/* Map */}
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: '100%', height: '100%', background: '#0a0f1e' }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        {/* Dark military tile layer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
 
        <FitBounds conflicts={validConflicts} />
 
        {/* Conflict markers */}
        {validConflicts.map(conflict => {
          const color = getSeverityColor(conflict.severity);
          const radius = getRadius(conflict.severity);
 
          return (
            <React.Fragment key={conflict.id}>
              {/* Outer pulse ring */}
              <CircleMarker
                center={[conflict.coordinates.lat, conflict.coordinates.lng]}
                radius={radius + 6}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: 0.1,
                  weight: 1,
                  opacity: 0.4,
                }}
              />
              {/* Main marker */}
              <CircleMarker
                center={[conflict.coordinates.lat, conflict.coordinates.lng]}
                radius={radius}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: 0.7,
                  weight: 2,
                }}
                eventHandlers={{
                  click: () => onSelectConflict && onSelectConflict(conflict),
                }}
              >
                <Popup>
                  <div style={{
                    background: '#0d1117',
                    color: '#e8eaf0',
                    fontFamily: "'Share Tech Mono', monospace",
                    minWidth: '200px',
                    padding: '4px',
                  }}>
                    {/* Country */}
                    <div style={{
                      fontFamily: "'Orbitron', monospace",
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: color,
                      marginBottom: '8px',
                      borderBottom: `1px solid ${color}44`,
                      paddingBottom: '6px',
                    }}>
                      {conflict.country.toUpperCase()}
                    </div>
 
                    {/* Type + Status */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.6rem', padding: '2px 6px', background: `${color}22`, border: `1px solid ${color}44`, borderRadius: '3px', color }}>
                        {conflict.conflictType?.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '0.6rem', padding: '2px 6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', color: '#4a5568' }}>
                        {conflict.status?.toUpperCase()}
                      </span>
                    </div>
 
                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                      <div>
                        <div style={{ fontSize: '0.5rem', color: '#4a5568' }}>SEVERITY</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color }}>{conflict.severity}/10</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.5rem', color: '#4a5568' }}>CASUALTIES</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ef4444' }}>
                          {conflict.activeDeaths >= 1000000
                            ? (conflict.activeDeaths / 1000000).toFixed(1) + 'M'
                            : conflict.activeDeaths >= 1000
                            ? (conflict.activeDeaths / 1000).toFixed(0) + 'K'
                            : conflict.activeDeaths || '—'}
                        </div>
                      </div>
                    </div>
 
                    {/* Summary */}
                    {conflict.summary && (
                      <div style={{ fontSize: '0.55rem', color: '#4a5568', lineHeight: '1.5', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px' }}>
                        {conflict.summary.slice(0, 120)}...
                      </div>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
 