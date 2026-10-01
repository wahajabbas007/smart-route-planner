import React, { useState, useEffect } from 'react';
import { LAHORE_LOCATIONS, calculateMetrics } from './utils/calculations';
import LocalMapContainer from './components/LocalMapContainer';

export default function App() {
  const [startLoc, setStartLoc] = useState('muridke');
  const [endLoc, setEndLoc] = useState('shahkot');
  const [petrolPrice, setPetrolPrice] = useState(280);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [metrics, setMetrics] = useState(() => calculateMetrics('muridke', 'shahkot', 280));

  // Recalculate cost automatically whenever petrol price or locations change
  useEffect(() => {
    setMetrics(calculateMetrics(startLoc, endLoc, petrolPrice));
  }, [petrolPrice, startLoc, endLoc]);

  const handleAnalyze = () => {
    if (startLoc === endLoc) return;
    setIsAnalyzing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setMetrics(calculateMetrics(startLoc, endLoc, petrolPrice));
          return 100;
        }
        return prev + 10;
      });
    }, 30);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#030712', color: '#f9fafb', padding: '24px', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '800', color: '#22c55e', marginBottom: '20px' }}>
          📍 Lahore Division GPS Route & Trip Cost Calculator
        </h1>

        {/* Input Bar: Start, End, Petrol Price, Button */}
        <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '18px', border: '1px solid #1e293b', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '15px' }}>
            
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', color: '#4ade80', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>🟢 Starting Point</label>
              <select value={startLoc} onChange={(e) => setStartLoc(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '10px' }}>
                {Object.entries(LAHORE_LOCATIONS).map(([key, loc]) => (
                  <option key={key} value={key}>{loc.name}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', color: '#f87171', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>🔴 Destination Point</label>
              <select value={endLoc} onChange={(e) => setEndLoc(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '10px' }}>
                {Object.entries(LAHORE_LOCATIONS).map(([key, loc]) => (
                  <option key={key} value={key}>{loc.name}</option>
                ))}
              </select>
            </div>

            {/* Petrol Price Input Field */}
            <div style={{ width: '150px' }}>
              <label style={{ display: 'block', color: '#fbbf24', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>⛽ Petrol Rate (PKR/L)</label>
              <input
                type="number"
                value={petrolPrice}
                onChange={(e) => setPetrolPrice(Number(e.target.value))}
                style={{ width: '100%', padding: '10px', backgroundColor: '#1e293b', color: '#4ade80', fontWeight: 'bold', border: '1px solid #334155', borderRadius: '10px', textAlign: 'center' }}
              />
            </div>

          </div>

          <button onClick={handleAnalyze} disabled={isAnalyzing} style={{ width: '100%', padding: '12px', backgroundColor: '#16a34a', color: '#fff', fontWeight: 'bold', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
            {isAnalyzing ? `Analyzing Road Network... ${progress}%` : "⚡ Analyze & Highlight Best Route"}
          </button>
        </div>

        {/* Map with Streets & Dotted Line */}
        <LocalMapContainer startLoc={startLoc} endLoc={endLoc} />

        {/* 3 COLORFUL BOXES IN A SINGLE HORIZONTAL ROW */}
        {metrics && (
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between', marginTop: '20px' }}>
            
            {/* CAR CARD */}
            <div style={{ flex: 1, backgroundColor: '#0b1329', border: '2px solid #0284c7', borderRadius: '18px', padding: '18px', boxShadow: '0 8px 20px rgba(2, 132, 199, 0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>🚗</span>
                <span style={{ background: '#0369a1', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '8px' }}>BY CAR</span>
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#38bdf8', margin: '4px 0' }}>{metrics.distanceKm} <span style={{ fontSize: '13px', color: '#94a3b8' }}>KM</span></h2>
              <p style={{ color: '#bae6fd', fontWeight: 'bold', fontSize: '13px', marginBottom: '10px' }}>Fuel Expense: PKR {metrics.car.cost}</p>
              <hr style={{ borderColor: '#1e293b', margin: '10px 0' }} />
              <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.8' }}>
                <div>⛽ Petrol Needed: <b>{metrics.car.litres} Litres</b></div>
                <div>⏱️ Travel Time: <b style={{ color: '#38bdf8' }}>{metrics.car.timeMin} Mins</b></div>
              </div>
            </div>

            {/* BIKE CARD */}
            <div style={{ flex: 1, backgroundColor: '#0b1329', border: '2px solid #16a34a', borderRadius: '18px', padding: '18px', boxShadow: '0 8px 20px rgba(22, 163, 74, 0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>🏍️</span>
                <span style={{ background: '#15803d', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '8px' }}>BY BIKE</span>
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#4ade80', margin: '4px 0' }}>{metrics.distanceKm} <span style={{ fontSize: '13px', color: '#94a3b8' }}>KM</span></h2>
              <p style={{ color: '#bbf7d0', fontWeight: 'bold', fontSize: '13px', marginBottom: '10px' }}>Fuel Expense: PKR {metrics.bike.cost}</p>
              <hr style={{ borderColor: '#1e293b', margin: '10px 0' }} />
              <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.8' }}>
                <div>⛽ Petrol Needed: <b>{metrics.bike.litres} Litres</b></div>
                <div>⏱️ Travel Time: <b style={{ color: '#4ade80' }}>{metrics.bike.timeMin} Mins</b></div>
              </div>
            </div>

            {/* WALK CARD */}
            <div style={{ flex: 1, backgroundColor: '#0b1329', border: '2px solid #d97706', borderRadius: '18px', padding: '18px', boxShadow: '0 8px 20px rgba(217, 119, 6, 0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>🚶</span>
                <span style={{ background: '#b45309', color: '#fff', fontSize: '11px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '8px' }}>BY WALK</span>
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: '900', color: '#fbbf24', margin: '4px 0' }}>{metrics.walk.steps.toLocaleString()} <span style={{ fontSize: '13px', color: '#94a3b8' }}>Steps</span></h2>
              <p style={{ color: '#fde68a', fontWeight: 'bold', fontSize: '13px', marginBottom: '10px' }}>Zero Cost (Healthy)</p>
              <hr style={{ borderColor: '#1e293b', margin: '10px 0' }} />
              <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.8' }}>
                <div>🔥 Calories Burned: <b style={{ color: '#fbbf24' }}>{metrics.walk.calories} kcal</b></div>
                <div>⏱️ Travel Time: <b>{metrics.walk.timeMin} Mins</b></div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}