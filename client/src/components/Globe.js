import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { conflictTypeColors, statusColors } from '../data/conflictsData';
import countries from '../data/countries.geo.json';

const GLOBE_RADIUS = 2.2;

function latLngToVec3(lat, lng, radius = GLOBE_RADIUS) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function Globe({ conflicts, onHover, onSelect, selectedId }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const globeRef = useRef(null);
  const markersRef = useRef([]);
  const frameRef = useRef(null);
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0 });
  const autoRotate = useRef(true);
  const mouseRef = useRef(new THREE.Vector2());
  const raycasterRef = useRef(new THREE.Raycaster());
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  function drawCountries(ctx) {
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 0.6;

  countries.features.forEach(feature => {
    const coords = feature.geometry.coordinates;

    const drawPolygon = (polygon) => {
      polygon.forEach(ring => {
        ctx.beginPath();
        ring.forEach(([lng, lat], i) => {
          const x = ((lng + 180) / 360) * 2048;
          const y = ((90 - lat) / 180) * 1024;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      });
    };

    if (feature.geometry.type === 'Polygon') {
      drawPolygon(coords);
    } else if (feature.geometry.type === 'MultiPolygon') {
      coords.forEach(drawPolygon);
    }
  });
}
  useEffect(() => {
    const mount = mountRef.current;
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.z = 6;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(starGeo, starMat));

    // Globe atmosphere glow
    const atmosphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.06, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0,0,1.0)), 3.0);
          gl_FragColor = vec4(0.1, 0.3, 0.8, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    scene.add(new THREE.Mesh(atmosphereGeo, atmosphereMat));

    // Globe
    const globeGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const loader = new THREE.TextureLoader();

    // Create canvas-based texture for globe
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Ocean
    const gradient = ctx.createRadialGradient(1024, 512, 0, 1024, 512, 1024);
    gradient.addColorStop(0, '#0a1628');
    gradient.addColorStop(1, '#050c1a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2048, 1024);

    // Grid lines
    ctx.strokeStyle = 'rgba(30, 60, 120, 0.3)';
    ctx.lineWidth = 0.5;
    for (let lat = -90; lat <= 90; lat += 15) {
      const y = ((90 - lat) / 180) * 1024;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(2048, y);
      ctx.stroke();
    }
    for (let lng = -180; lng <= 180; lng += 15) {
      const x = ((lng + 180) / 360) * 2048;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    const globeMat = new THREE.MeshPhongMaterial({
      map: texture,
      specular: new THREE.Color(0x112244),
      shininess: 15,
      transparent: false,
    });

    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);
    globeRef.current = globe;

    drawCountries(ctx);

    // Lights
    scene.add(new THREE.AmbientLight(0x223366, 1.5));
    const dirLight = new THREE.DirectionalLight(0x4488ff, 2);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x112244, 1);
    rimLight.position.set(-5, -3, -5);
    scene.add(rimLight);

    // Conflict markers
    const markerGroup = new THREE.Group();
    scene.add(markerGroup);
    markersRef.current = [];

    conflicts.forEach(conflict => {
      const pos = latLngToVec3(conflict.coordinates.lat, conflict.coordinates.lng);
      const color = new THREE.Color(conflictTypeColors[conflict.conflictType] || '#ef4444');

      // Pulsing ring
      const ringGeo = new THREE.RingGeometry(0.04, 0.1, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);

      // Center dot
      const dotGeo = new THREE.SphereGeometry(0.04, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color });
      const dot = new THREE.Mesh(dotGeo, dotMat);

      const markerGroup2 = new THREE.Group();
      markerGroup2.add(ring);
      markerGroup2.add(dot);
      markerGroup2.position.copy(pos);
      markerGroup2.lookAt(new THREE.Vector3(0, 0, 0));
      markerGroup2.rotateX(Math.PI / 2);

      markerGroup2.userData = { conflict, color };
      markerGroup.add(markerGroup2);
      markersRef.current.push({ mesh: markerGroup2, dot, ring, conflict, color, phase: Math.random() * Math.PI * 2 });
    });

    // Animation
    let t = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      t += 0.016;

      // Auto-rotate
      if (autoRotate.current && !isDragging.current) {
        globe.rotation.y += 0.0015;
        markerGroup.rotation.y += 0.0015;
      }

      // Apply velocity after drag
      if (!isDragging.current && (Math.abs(rotationVelocity.current.x) > 0.0001 || Math.abs(rotationVelocity.current.y) > 0.0001)) {
        globe.rotation.y += rotationVelocity.current.x;
        globe.rotation.x += rotationVelocity.current.y;
        markerGroup.rotation.y += rotationVelocity.current.x;
        markerGroup.rotation.x += rotationVelocity.current.y;
        rotationVelocity.current.x *= 0.95;
        rotationVelocity.current.y *= 0.95;
      }

      // Animate markers
      markersRef.current.forEach(({ dot, ring, conflict, phase }, i) => {
        const pulse = Math.sin(t * 2 + phase) * 0.5 + 0.5;
        ring.material.opacity = 0.3 + pulse * 0.5;
        const scale = 1 + pulse * (conflict.severity / 10) * 0.5;
        ring.scale.set(scale, scale, 1);
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const W = mount.clientWidth;
      const H = mount.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameRef.current);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [conflicts]);

  // Mouse interaction
  const handleMouseMove = useCallback((e) => {
    const mount = mountRef.current;
    const rect = mount.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    if (isDragging.current) {
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      const globe = globeRef.current;
      const scene = sceneRef.current;

      rotationVelocity.current.x = dx * 0.005;
      rotationVelocity.current.y = dy * 0.005;

      globe.rotation.y += dx * 0.005;
      globe.rotation.x += dy * 0.005;

      // Rotate marker group too
      const mg = scene.children.find(c => c.isGroup);
      if (mg) {
        mg.rotation.y += dx * 0.005;
        mg.rotation.x += dy * 0.005;
      }

      prevMouse.current = { x: e.clientX, y: e.clientY };
      autoRotate.current = false;
    }

    // Raycasting for hover
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const meshes = markersRef.current.map(m => m.dot);
    const intersects = raycasterRef.current.intersectObjects(meshes);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const markerData = markersRef.current.find(m => m.dot === hit);
      if (markerData) {
        setHovered(markerData.conflict);
        setTooltipPos({ x: e.clientX, y: e.clientY });
        onHover && onHover(markerData.conflict);
        mount.style.cursor = 'pointer';
      }
    } else {
      setHovered(null);
      onHover && onHover(null);
      mount.style.cursor = isDragging.current ? 'grabbing' : 'grab';
    }
  }, [onHover]);

  const handleMouseDown = useCallback((e) => {
    isDragging.current = true;
    prevMouse.current = { x: e.clientX, y: e.clientY };
    mountRef.current.style.cursor = 'grabbing';
  }, []);

  const handleMouseUp = useCallback((e) => {
    if (!isDragging.current) return;

    const dx = Math.abs(e.clientX - prevMouse.current.x);
    const dy = Math.abs(e.clientY - prevMouse.current.y);

    if (dx < 5 && dy < 5 && hovered) {
      onSelect && onSelect(hovered);
    }

    isDragging.current = false;
    mountRef.current.style.cursor = 'grab';

    // Resume auto-rotate after 3s of inactivity
    setTimeout(() => { autoRotate.current = true; }, 3000);
  }, [hovered, onSelect]);

  const handleWheel = useCallback((e) => {
    const cam = cameraRef.current;
    cam.position.z = Math.max(3.5, Math.min(10, cam.position.z + e.deltaY * 0.005));
  }, []);

  const formatNumber = (n) => {
    if (!n) return '—';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
    return n.toLocaleString();
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        ref={mountRef}
        style={{ width: '100%', height: '100%', cursor: 'grab' }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { isDragging.current = false; setHovered(null); }}
        onWheel={handleWheel}
      />

      {/* Hover tooltip */}
      {hovered && (
        <div style={{
          position: 'fixed',
          left: tooltipPos.x + 16,
          top: tooltipPos.y - 10,
          zIndex: 2000,
          background: 'rgba(5,8,16,0.97)',
          border: `1px solid ${conflictTypeColors[hovered.conflictType]}`,
          borderRadius: '8px',
          padding: '14px 18px',
          minWidth: '240px',
          pointerEvents: 'none',
          boxShadow: `0 0 30px ${conflictTypeColors[hovered.conflictType]}33`,
        }}>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: conflictTypeColors[hovered.conflictType], marginBottom: '6px' }}>
            {hovered.country.toUpperCase()}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', padding: '2px 8px', borderRadius: '3px', background: `${conflictTypeColors[hovered.conflictType]}22`, color: conflictTypeColors[hovered.conflictType], border: `1px solid ${conflictTypeColors[hovered.conflictType]}44`, textTransform: 'uppercase' }}>
              {hovered.conflictType}
            </span>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: statusColors[hovered.status], textTransform: 'uppercase' }}>● {hovered.status}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#4a5568', fontFamily: "'Share Tech Mono', monospace", marginBottom: '2px' }}>CASUALTIES</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ef4444', fontFamily: "'Orbitron', monospace" }}>{formatNumber(hovered.activeDeaths)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#4a5568', fontFamily: "'Share Tech Mono', monospace", marginBottom: '2px' }}>SEVERITY</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f59e0b', fontFamily: "'Orbitron', monospace" }}>{hovered.severity}<span style={{ fontSize: '0.6rem', color: '#4a5568' }}>/10</span></div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#4a5568', fontFamily: "'Share Tech Mono', monospace", marginBottom: '2px' }}>DISPLACED</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f97316' }}>{formatNumber(hovered.displaced)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#4a5568', fontFamily: "'Share Tech Mono', monospace", marginBottom: '2px' }}>SINCE</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#8892a4', fontFamily: "'Share Tech Mono', monospace" }}>{hovered.startDate.slice(0, 4)}</div>
            </div>
          </div>
          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.65rem', color: '#4a5568', fontFamily: "'Share Tech Mono', monospace'" }}>
            CLICK FOR FULL INTELLIGENCE REPORT
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '24px',
        background: 'rgba(5,8,16,0.85)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
        padding: '14px 18px',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4a5568', letterSpacing: '0.15em', marginBottom: '10px' }}>CONFLICT TYPE</div>
        {Object.entries(conflictTypeColors).map(([type, color]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: '#8892a4', textTransform: 'uppercase' }}>{type}</span>
          </div>
        ))}
      </div>

      {/* Controls hint */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        right: '24px',
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.6rem',
        color: '#4a5568',
        textAlign: 'right',
        lineHeight: 2,
      }}>
        <div>DRAG to rotate</div>
        <div>SCROLL to zoom</div>
        <div>CLICK to inspect</div>
      </div>
    </div>
  );
}
