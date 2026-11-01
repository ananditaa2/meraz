import React from 'react';
import { WarningIcon, ErrorIcon, QuestionIcon } from '../retroIcons';
import { playClickSound } from '../soundEffects';

export default function SystemDialog({
  isOpen,
  title = 'System Message',
  message = '',
  type = 'warning', // 'warning' | 'error' | 'question' | 'info'
  buttons = [{ label: 'OK', action: 'ok', primary: true }],
  onAction,
  onClose
}) {
  if (!isOpen) return null;

  const renderIcon = () => {
    switch (type) {
      case 'error':
        return <ErrorIcon size={32} />;
      case 'question':
        return <QuestionIcon size={32} />;
      case 'warning':
      default:
        return <WarningIcon size={32} />;
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
        background: 'rgba(0, 0, 0, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000001
      }}
    >
      <div
        className="win-window win-outset"
        style={{
          width: '380px',
          maxWidth: '92vw',
          padding: '3px',
          boxShadow: '4px 4px 16px rgba(0,0,0,0.5)'
        }}
      >
        {/* Title bar */}
        <div className="win-titlebar">
          <div className="win-titlebar-title">
            <span>{title}</span>
          </div>
          <button
            className="win-titlebar-btn"
            onClick={() => {
              playClickSound();
              onClose?.();
            }}
          >
            ✕
          </button>
        </div>

        {/* Message body */}
        <div className="win-dialog-content">
          <div style={{ flexShrink: 0 }}>
            {renderIcon()}
          </div>
          <div style={{ fontSize: '11px', lineHeight: '1.5', whiteSpace: 'pre-line', color: '#111' }}>
            {message}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="win-dialog-actions">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              className="win-button"
              style={{ fontWeight: btn.primary ? 'bold' : 'normal' }}
              onClick={() => {
                playClickSound();
                onAction?.(btn.action);
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
