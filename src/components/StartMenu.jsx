import React, { useState } from 'react';
import {
  WindowsFlagIcon,
  NotepadIcon,
  InternetExplorerIcon,
  MyDocumentsIcon,
  SecretVaultIcon
} from '../retroIcons';
import { playClickSound } from '../soundEffects';

export default function StartMenu({
  isOpen,
  onClose,
  onOpenApp,
  onOpenDocument,
  onOpenFind,
  onOpenHelp,
  onOpenRun,
  onOpenShutdown,
  onToggleSound,
  onToggleCRT,
  onResetProgress,
  isSoundMuted,
  isCRTEnabled
}) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  if (!isOpen) return null;

  return (
    <div
      className="win-start-menu win-outset"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Vertical Banner */}
      <div className="win-start-banner">
        <div className="win-start-banner-text">
          Windows<span className="win-start-banner-bold">98</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="win-start-items">
        {/* Programs */}
        <div
          className="win-start-item"
          onMouseEnter={() => setActiveSubmenu('programs')}
          onClick={() => {
            playClickSound();
            onOpenApp('notepad');
            onClose();
          }}
        >
          <span style={{ fontSize: '14px' }}>📁</span>
          <span>Programs</span>
          <span style={{ marginLeft: 'auto', fontSize: '9px' }}>▶</span>
        </div>

        {/* Documents */}
        <div
          className="win-start-item"
          onMouseEnter={() => setActiveSubmenu('documents')}
          onClick={() => {
            playClickSound();
            onOpenApp('my_documents');
            onClose();
          }}
        >
          <span style={{ fontSize: '14px' }}>📂</span>
          <span>Documents</span>
          <span style={{ marginLeft: 'auto', fontSize: '9px' }}>▶</span>
        </div>

        {/* Settings */}
        <div
          className="win-start-item"
          onMouseEnter={() => setActiveSubmenu('settings')}
        >
          <span style={{ fontSize: '14px' }}>⚙</span>
          <span>Settings</span>
          <span style={{ marginLeft: 'auto', fontSize: '9px' }}>▶</span>
        </div>

        {/* Find */}
        <div
          className="win-start-item"
          onMouseEnter={() => setActiveSubmenu(null)}
          onClick={() => {
            playClickSound();
            onOpenFind?.();
            onClose();
          }}
        >
          <span style={{ fontSize: '14px' }}>🔍</span>
          <span>Find...</span>
        </div>

        {/* Help */}
        <div
          className="win-start-item"
          onMouseEnter={() => setActiveSubmenu(null)}
          onClick={() => {
            playClickSound();
            onOpenHelp?.();
            onClose();
          }}
        >
          <span style={{ fontSize: '14px' }}>❓</span>
          <span>Help</span>
        </div>

        {/* Run */}
        <div
          className="win-start-item"
          onMouseEnter={() => setActiveSubmenu(null)}
          onClick={() => {
            playClickSound();
            onOpenRun?.();
            onClose();
          }}
        >
          <span style={{ fontSize: '14px' }}>🏃</span>
          <span>Run...</span>
        </div>

        <div className="win-start-divider" />

        {/* Shut Down */}
        <div
          className="win-start-item"
          onMouseEnter={() => setActiveSubmenu(null)}
          onClick={() => {
            playClickSound();
            onOpenShutdown?.();
            onClose();
          }}
        >
          <span style={{ fontSize: '14px' }}>🛑</span>
          <span>Shut Down...</span>
        </div>
      </div>

      {/* Submenu for Settings */}
      {activeSubmenu === 'settings' && (
        <div
          className="win-start-menu win-outset"
          style={{
            position: 'absolute',
            left: '185px',
            bottom: '40px',
            width: '160px',
            zIndex: 100001
          }}
        >
          <div className="win-start-items">
            <div
              className="win-start-item"
              onClick={() => {
                onToggleSound();
                onClose();
              }}
            >
              <span>{isSoundMuted ? '🔇 Unmute Audio' : '🔊 Mute Audio'}</span>
            </div>
            <div
              className="win-start-item"
              onClick={() => {
                onToggleCRT();
                onClose();
              }}
            >
              <span>{isCRTEnabled ? '📺 Disable CRT' : '📺 Enable CRT'}</span>
            </div>
            <div className="win-start-divider" />
            <div
              className="win-start-item"
              style={{ color: '#900' }}
              onClick={() => {
                onResetProgress();
                onClose();
              }}
            >
              <span>⟳ Reset Mystery</span>
            </div>
          </div>
        </div>
      )}

      {/* Submenu for Programs */}
      {activeSubmenu === 'programs' && (
        <div
          className="win-start-menu win-outset"
          style={{
            position: 'absolute',
            left: '185px',
            bottom: '110px',
            width: '150px',
            zIndex: 100001
          }}
        >
          <div className="win-start-items">
            <div
              className="win-start-item"
              onClick={() => {
                onOpenApp('notepad');
                onClose();
              }}
            >
              <NotepadIcon size={16} />
              <span>Notepad</span>
            </div>
            <div
              className="win-start-item"
              onClick={() => {
                onOpenApp('ie');
                onClose();
              }}
            >
              <InternetExplorerIcon size={16} />
              <span>Internet Explorer</span>
            </div>
            <div
              className="win-start-item"
              onClick={() => {
                onOpenApp('my_documents');
                onClose();
              }}
            >
              <MyDocumentsIcon size={16} />
              <span>File Explorer</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
