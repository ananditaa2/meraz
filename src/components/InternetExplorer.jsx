import React, { useState, useEffect } from 'react';
import { InternetExplorerIcon } from '../retroIcons';
import { playClickSound, playErrorSound } from '../soundEffects';

const STAGES = [
  { text: 'Connecting to the internet...', progress: 15, sub: 'Dialing 1-800-RETRO-NET...' },
  { text: 'Checking modem... BEEP BOOP KSHHH...', progress: 38, sub: 'Negotiating baud rate at 28.8 kbps...' },
  { text: 'Waiting for someone to stop using the telephone...', progress: 65, sub: 'Line busy: Mom is calling aunt Brenda...' },
  { text: 'Downloading Netscape Navigator 4.0...', progress: 85, sub: 'Speed: 1.2 KB/sec' },
  { text: 'Estimated completion: 2045.', progress: 99, sub: 'Connection stalled. Have you tried blowing on the phone cord?' }
];

export default function InternetExplorer() {
  const [stageIndex, setStageIndex] = useState(0);
  const [isDialing, setIsDialing] = useState(true);

  useEffect(() => {
    if (!isDialing) return;
    const interval = setInterval(() => {
      setStageIndex((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [isDialing]);

  const handleDisconnect = () => {
    playErrorSound();
    setIsDialing(false);
  };

  const handleRetry = () => {
    playClickSound();
    setStageIndex(0);
    setIsDialing(true);
  };

  const currentStage = STAGES[stageIndex];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#c0c0c0' }}>
      {/* Browser Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px', borderBottom: '1px solid #808080' }}>
        <button className="win-button" style={{ minWidth: '45px', fontSize: '10px' }} onClick={playClickSound}>◀ Back</button>
        <button className="win-button" style={{ minWidth: '45px', fontSize: '10px' }} onClick={playClickSound}>▶ Fwd</button>
        <button className="win-button" style={{ minWidth: '45px', fontSize: '10px' }} onClick={handleDisconnect}>✕ Stop</button>
        <button className="win-button" style={{ minWidth: '55px', fontSize: '10px' }} onClick={handleRetry}>⟳ Refresh</button>
        <button className="win-button" style={{ minWidth: '50px', fontSize: '10px' }} onClick={playClickSound}>🏠 Home</button>
      </div>

      {/* Address Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px', borderBottom: '1px solid #808080' }}>
        <span style={{ fontSize: '11px', color: '#444' }}>Address</span>
        <div className="win-inset" style={{ flex: 1, padding: '2px 6px', fontSize: '11px', fontFamily: 'monospace' }}>
          http://www.geocities.com/area51/research/1998/
        </div>
      </div>

      {/* Dialup Simulation Viewport */}
      <div
        className="win-inset"
        style={{
          flex: 1,
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center'
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <InternetExplorerIcon size={48} />
        </div>

        <h3 style={{ fontSize: '14px', marginBottom: '8px', color: '#000080' }}>
          Microsoft Internet Explorer 4.0
        </h3>

        <div
          className="win-sunken-panel"
          style={{
            width: '90%',
            maxWidth: '380px',
            padding: '16px',
            background: '#f0f0f0',
            marginBottom: '16px',
            border: '1px solid #808080'
          }}
        >
          <p style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '8px', color: '#222' }}>
            {currentStage.text}
          </p>
          <p style={{ fontSize: '11px', color: '#666', marginBottom: '12px', fontFamily: 'monospace' }}>
            {currentStage.sub}
          </p>

          {/* Retro Progress Bar */}
          <div
            className="win-inset"
            style={{
              width: '100%',
              height: '18px',
              background: '#ffffff',
              padding: '2px',
              display: 'flex',
              gap: '2px'
            }}
          >
            {Array.from({ length: Math.floor(currentStage.progress / 5) }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: '100%',
                  background: '#000080'
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="win-button" onClick={handleDisconnect}>
            Pick up phone (Disconnect)
          </button>
          <button className="win-button" onClick={handleRetry}>
            Try Dialing Again
          </button>
        </div>
      </div>

      {/* Browser Status Bar */}
      <div
        className="win-sunken-panel"
        style={{
          padding: '2px 8px',
          fontSize: '10px',
          color: '#555',
          marginTop: '2px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <span>Status: {isDialing ? 'Dialing through COM3...' : 'Call dropped'}</span>
        <span>Modem: US Robotics 56K Sportster</span>
      </div>
    </div>
  );
}
