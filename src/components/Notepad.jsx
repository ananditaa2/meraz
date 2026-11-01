import React from 'react';
import { playClickSound } from '../soundEffects';

export default function Notepad({ file, onShowHelpHint }) {
  if (!file) return null;

  const isFinal = file.isFinal;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#c0c0c0' }}>
      {/* Menu Bar */}
      <div className="win-menubar">
        <span className="win-menu-item" onClick={playClickSound}>File</span>
        <span className="win-menu-item" onClick={playClickSound}>Edit</span>
        <span className="win-menu-item" onClick={playClickSound}>Search</span>
        <span
          className="win-menu-item"
          onClick={() => {
            playClickSound();
            onShowHelpHint?.('Hint: Check dates and references to founding years closely!');
          }}
        >
          Help
        </span>
      </div>

      {/* Editor Content Area */}
      <div
        className="win-inset"
        style={{
          flex: 1,
          overflow: 'auto',
          background: isFinal ? '#fffdf0' : '#ffffff',
          position: 'relative'
        }}
      >
        {isFinal && (
          <div
            style={{
              padding: '6px 12px',
              background: '#fff3bf',
              borderBottom: '1px solid #fcc419',
              color: '#d9480f',
              fontWeight: 'bold',
              fontSize: '11px'
            }}
          >
            ★ Memory Unlocked: The Final Time Capsule ★
          </div>
        )}
        <textarea
          readOnly
          value={file.content || ''}
          className="win-notepad-area"
          style={{
            height: '100%',
            background: 'transparent',
            color: isFinal ? '#2b2c34' : '#000000',
            fontWeight: isFinal ? '500' : 'normal'
          }}
        />
      </div>

      {/* Notepad Status Bar */}
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
        <span>Ready</span>
        <span>Windows (CRLF) | ANSI</span>
      </div>
    </div>
  );
}
