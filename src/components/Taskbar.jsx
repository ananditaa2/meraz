import React from 'react';
import { WindowsFlagIcon, SpeakerIcon, SecretVaultIcon } from '../retroIcons';
import { playClickSound } from '../soundEffects';

export default function Taskbar({
  windows = [],
  activeWindowId,
  isStartOpen,
  onToggleStart,
  onWindowClick,
  isMuted,
  onToggleMute,
  cluesCount = 0,
  isVaultUnlocked = false
}) {
  return (
    <div className="win-taskbar win-outset">
      {/* Start Button */}
      <button
        className={`win-button win-start-btn ${isStartOpen ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          playClickSound();
          onToggleStart();
        }}
      >
        <WindowsFlagIcon size={14} />
        <span>Start</span>
      </button>

      {/* Taskbar open windows */}
      <div className="win-taskbar-tasks">
        {windows.map((win) => {
          const isActive = win.id === activeWindowId && !win.isMinimized;
          return (
            <button
              key={win.id}
              className={`win-button win-task-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                playClickSound();
                onWindowClick(win.id);
              }}
              title={win.title}
            >
              {win.icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{win.icon}</span>}
              <span>{win.title}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="win-tray">
        {/* Clue Tracker indicator */}
        <div
          title={isVaultUnlocked ? 'Secret Archive Decrypted!' : `Clues discovered: ${cluesCount}/3`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '10px',
            cursor: 'default',
            color: isVaultUnlocked ? '#006600' : '#444'
          }}
        >
          <SecretVaultIcon size={12} locked={!isVaultUnlocked} />
          <span>{isVaultUnlocked ? 'UNLOCKED' : `Clues: ${cluesCount}/3`}</span>
        </div>

        {/* Audio Speaker Mute Toggle */}
        <div
          onClick={() => {
            playClickSound();
            onToggleMute();
          }}
          title={isMuted ? 'Sound Muted (Click to enable)' : 'Sound Enabled (Click to mute)'}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <SpeakerIcon size={14} muted={isMuted} />
        </div>

        {/* Retro Clock with Easter Egg Tooltip */}
        <div
          title="Don't trust the computer clock..."
          style={{
            fontSize: '11px',
            fontFamily: 'monospace',
            color: '#000',
            cursor: 'help'
          }}
        >
          11:59 PM
        </div>
      </div>
    </div>
  );
}
