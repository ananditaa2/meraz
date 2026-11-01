import React, { useState, useEffect, useRef } from 'react';
import { SecretVaultIcon } from '../retroIcons';
import { playClickSound, playErrorSound, playSuccessFanfare } from '../soundEffects';
import confetti from 'canvas-confetti';

export default function PasswordDialog({
  isOpen,
  onClose,
  onSuccess,
  onWrongPassword,
  onShowHint
}) {
  const [password, setPassword] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    playClickSound();

    const clean = password.trim();
    if (clean === '1998') {
      playSuccessFanfare();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.debug('Confetti error', err);
      }
      onSuccess?.();
    } else {
      playErrorSound();
      onWrongPassword?.(clean);
      setPassword('');
      inputRef.current?.focus();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000000
      }}
    >
      <div
        className="win-window win-outset"
        style={{
          width: '380px',
          padding: '3px',
          boxShadow: '4px 4px 14px rgba(0,0,0,0.5)'
        }}
      >
        {/* Title bar */}
        <div className="win-titlebar">
          <div className="win-titlebar-title">
            <SecretVaultIcon size={16} locked={true} />
            <span>Enter Network Password - C:\Secret_Archive</span>
          </div>
          <button className="win-titlebar-btn" onClick={onClose}>✕</button>
        </div>

        {/* Dialog Body */}
        <div style={{ padding: '16px', background: '#c0c0c0' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
            <SecretVaultIcon size={40} locked={true} />
            <div>
              <p style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '4px' }}>
                Resource: C:\Secret_Archive
              </p>
              <p style={{ fontSize: '11px', color: '#333' }}>
                This folder is encrypted. Enter the 4-digit system passcode to decrypt its contents:
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', width: '70px', fontWeight: 'bold' }}>Password:</label>
              <input
                ref={inputRef}
                type="password"
                className="win-inset"
                maxLength={10}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter 4-digit code"
                style={{
                  flex: 1,
                  padding: '4px 6px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  letterSpacing: '3px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                className="win-button"
                onClick={() => {
                  playClickSound();
                  onShowHint?.();
                }}
              >
                Clue Hint?
              </button>
              <button type="button" className="win-button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="win-button" style={{ fontWeight: 'bold' }}>
                OK
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
