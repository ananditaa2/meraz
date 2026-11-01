import React from 'react';
import { playClickSound } from '../soundEffects';

export default function EmailViewer({ file }) {
  if (!file) return null;
  const details = file.emailDetails || {
    from: 'arthur.pendleton@cs.mit.edu',
    to: 'david.vance@netscape.net',
    date: 'Wed, 28 Oct 1998 16:45:12 -0500',
    subject: 'Re: Vault passcode and the poster'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#c0c0c0' }}>
      {/* Outlook Express Toolbar */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          padding: '4px',
          borderBottom: '1px solid #808080',
          background: '#c0c0c0'
        }}
      >
        <button className="win-button" style={{ minWidth: '55px', fontSize: '10px' }} onClick={playClickSound}>
          ✉ Reply
        </button>
        <button className="win-button" style={{ minWidth: '65px', fontSize: '10px' }} onClick={playClickSound}>
          👥 Reply All
        </button>
        <button className="win-button" style={{ minWidth: '60px', fontSize: '10px' }} onClick={playClickSound}>
          ➡ Forward
        </button>
        <button className="win-button" style={{ minWidth: '50px', fontSize: '10px' }} onClick={playClickSound}>
          🖨 Print
        </button>
      </div>

      {/* Email Header Info */}
      <div
        className="win-sunken-panel"
        style={{
          padding: '6px 8px',
          margin: '3px',
          fontSize: '11px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px'
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <strong style={{ width: '50px', color: '#555' }}>From:</strong>
          <span>{details.from}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <strong style={{ width: '50px', color: '#555' }}>Date:</strong>
          <span>{details.date}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <strong style={{ width: '50px', color: '#555' }}>To:</strong>
          <span>{details.to}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <strong style={{ width: '50px', color: '#555' }}>Subject:</strong>
          <span style={{ fontWeight: 'bold', color: '#000080' }}>{details.subject}</span>
        </div>
      </div>

      {/* Email Body */}
      <div
        className="win-inset"
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '12px',
          margin: '3px',
          background: '#ffffff',
          fontFamily: 'monospace',
          fontSize: '12px',
          lineHeight: '1.5',
          whiteSpace: 'pre-wrap',
          userSelect: 'text'
        }}
      >
        {file.content}
      </div>
    </div>
  );
}
