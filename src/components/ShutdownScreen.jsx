import React from 'react';
import { playStartupSound } from '../soundEffects';

export default function ShutdownScreen({ onRestart }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#000000',
        color: '#ff8800',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999999,
        fontFamily: "'Courier New', Courier, monospace",
        textAlign: 'center',
        padding: '24px'
      }}
    >
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '28px',
            letterSpacing: '2px',
            textShadow: '0 0 10px rgba(255, 136, 0, 0.7)',
            marginBottom: '16px'
          }}
        >
          It's now safe to turn off your computer.
        </h1>
        <p style={{ color: '#aaaaaa', fontSize: '14px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
          Thank you for playing "The Last User" at the Gandhi Hackathon, IIT Bhilai.
          <br />
          Memories don't fade when someone remembers them.
        </p>
      </div>

      <button
        onClick={() => {
          playStartupSound();
          onRestart?.();
        }}
        className="win-button"
        style={{
          fontSize: '13px',
          padding: '8px 20px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        ⟳ Turn On Computer
      </button>
    </div>
  );
}
