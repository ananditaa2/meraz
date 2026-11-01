import React from 'react';

export function WindowsFlagIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      {/* Windows 98 classic 4-color wave flag */}
      <rect x="2" y="2" width="5" height="5" fill="#ff0000" />
      <rect x="8" y="2" width="5" height="5" fill="#00aa00" />
      <rect x="2" y="8" width="5" height="5" fill="#0000aa" />
      <rect x="8" y="8" width="5" height="5" fill="#ffaa00" />
      <path d="M7 2v11M2 7h11" stroke="#000" strokeWidth="0.8" />
    </svg>
  );
}

export function MyComputerIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
      {/* Monitor */}
      <rect x="4" y="2" width="22" height="17" fill="#d4d0c8" stroke="#000" strokeWidth="1" />
      <rect x="7" y="5" width="16" height="11" fill="#008080" stroke="#808080" strokeWidth="1" />
      <rect x="9" y="7" width="12" height="7" fill="#000080" />
      {/* Stand */}
      <rect x="13" y="19" width="4" height="3" fill="#808080" />
      <rect x="9" y="22" width="12" height="2" fill="#d4d0c8" stroke="#000" strokeWidth="1" />
      {/* Tower / Computer box */}
      <rect x="19" y="14" width="9" height="15" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      <rect x="21" y="16" width="5" height="1" fill="#000" />
      <rect x="21" y="19" width="5" height="1" fill="#000" />
      <rect x="25" y="24" width="2" height="2" fill="#00aa00" />
    </svg>
  );
}

export function MyDocumentsIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
      {/* Folder back */}
      <path d="M3 8h8l3 3h15v16H3z" fill="#f4d03f" stroke="#000" strokeWidth="1" />
      {/* Paper sticking out */}
      <rect x="7" y="5" width="17" height="10" fill="#ffffff" stroke="#808080" strokeWidth="1" />
      <line x1="10" y1="8" x2="20" y2="8" stroke="#000" strokeWidth="1" />
      <line x1="10" y1="11" x2="18" y2="11" stroke="#808080" strokeWidth="1" />
      {/* Folder front tab */}
      <path d="M2 12h28l-3 14H2z" fill="#f9e79f" stroke="#7d6608" strokeWidth="1" />
    </svg>
  );
}

export function RecycleBinIcon({ size = 32, full = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
      {/* Paper sticking out if full */}
      {full && (
        <>
          <rect x="10" y="4" width="6" height="7" fill="#ffffff" stroke="#808080" strokeWidth="0.8" transform="rotate(-10 10 4)" />
          <rect x="15" y="3" width="7" height="8" fill="#eaecee" stroke="#808080" strokeWidth="0.8" transform="rotate(15 15 3)" />
        </>
      )}
      {/* Wastebasket rim */}
      <ellipse cx="16" cy="11" rx="10" ry="3" fill="#bdc3c7" stroke="#2c3e50" strokeWidth="1" />
      {/* Wastebasket body */}
      <path d="M6 11l3 17h14l3-17" fill="#95a5a6" stroke="#2c3e50" strokeWidth="1" />
      {/* Metal rib lines */}
      <line x1="11" y1="13" x2="12" y2="27" stroke="#7f8c8d" strokeWidth="1" />
      <line x1="16" y1="13" x2="16" y2="28" stroke="#7f8c8d" strokeWidth="1" />
      <line x1="21" y1="13" x2="20" y2="27" stroke="#7f8c8d" strokeWidth="1" />
      {/* Recycle green logo mini */}
      <circle cx="16" cy="20" r="3.5" fill="#27ae60" />
      <path d="M15 19l2 1-2 1z" fill="#fff" />
    </svg>
  );
}

export function NotepadIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
      {/* Notepad body */}
      <rect x="5" y="4" width="20" height="24" fill="#ffffff" stroke="#000" strokeWidth="1" />
      <rect x="5" y="4" width="20" height="4" fill="#3498db" />
      {/* Lines */}
      <line x1="8" y1="12" x2="21" y2="12" stroke="#bdc3c7" strokeWidth="1" />
      <line x1="8" y1="16" x2="21" y2="16" stroke="#bdc3c7" strokeWidth="1" />
      <line x1="8" y1="20" x2="18" y2="20" stroke="#bdc3c7" strokeWidth="1" />
      {/* Pencil */}
      <g transform="rotate(45 18 18)">
        <rect x="14" y="2" width="4" height="18" fill="#f39c12" stroke="#000" strokeWidth="0.8" />
        <polygon points="14,20 18,20 16,25" fill="#d35400" />
        <polygon points="15.5,23.5 16.5,23.5 16,25" fill="#000" />
      </g>
    </svg>
  );
}

export function InternetExplorerIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
      {/* Golden halo ring */}
      <ellipse cx="16" cy="16" rx="14" ry="6" fill="none" stroke="#f1c40f" strokeWidth="2.5" transform="rotate(-30 16 16)" />
      {/* Classic 'e' */}
      <text x="7" y="24" fontFamily="Impact, Arial Black, sans-serif" fontSize="24" fontWeight="bold" fill="#0055aa">
        e
      </text>
    </svg>
  );
}

export function SecretVaultIcon({ size = 32, locked = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
      {/* Metallic Safe / Box */}
      <rect x="4" y="5" width="24" height="22" fill="#7f8c8d" stroke="#2c3e50" strokeWidth="1.5" />
      <rect x="6" y="7" width="20" height="18" fill="#95a5a6" />
      {locked ? (
        <>
          {/* Padlock */}
          <rect x="11" y="14" width="10" height="9" fill="#f1c40f" stroke="#b7950b" strokeWidth="1" />
          <path d="M13 14V11a3 3 0 0 1 6 0v3" fill="none" stroke="#7f8c8d" strokeWidth="2" />
          <circle cx="16" cy="18" r="1.5" fill="#000" />
        </>
      ) : (
        <>
          {/* Open Vault Glowing Green */}
          <rect x="9" y="10" width="14" height="12" fill="#2ecc71" stroke="#27ae60" strokeWidth="1" />
          <circle cx="16" cy="16" r="3" fill="#f1c40f" />
        </>
      )}
    </svg>
  );
}

export function FileTextIcon({ size = 20, isWarning = false, isGold = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <rect x="2" y="1" width="11" height="14" fill={isGold ? '#fff9db' : '#ffffff'} stroke={isGold ? '#f59f00' : '#000'} strokeWidth="1" />
      <polygon points="10,1 13,4 10,4" fill={isGold ? '#f59f00' : '#c0c0c0'} />
      {isWarning ? (
        <text x="5" y="11" fontSize="10" fill="#e03131" fontWeight="bold">!</text>
      ) : (
        <>
          <line x1="4" y1="5" x2="9" y2="5" stroke="#000" strokeWidth="1" />
          <line x1="4" y1="8" x2="11" y2="8" stroke="#808080" strokeWidth="1" />
          <line x1="4" y1="11" x2="8" y2="11" stroke="#808080" strokeWidth="1" />
        </>
      )}
    </svg>
  );
}

export function EmailFileIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <rect x="1" y="3" width="14" height="10" fill="#ffffff" stroke="#000" strokeWidth="1" />
      <polyline points="1,4 8,9 15,4" fill="none" stroke="#0000aa" strokeWidth="1" />
    </svg>
  );
}

export function WarningIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <polygon points="16,3 30,28 2,28" fill="#f1c40f" stroke="#000" strokeWidth="1" />
      <text x="14" y="24" fontSize="18" fontWeight="bold" fill="#000">!</text>
    </svg>
  );
}

export function ErrorIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="13" fill="#e74c3c" stroke="#000" strokeWidth="1" />
      <line x1="10" y1="10" x2="22" y2="22" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <line x1="22" y1="10" x2="10" y2="22" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function QuestionIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="13" fill="#2980b9" stroke="#000" strokeWidth="1" />
      <text x="11" y="23" fontSize="20" fontWeight="bold" fill="#fff">?</text>
    </svg>
  );
}

export function SpeakerIcon({ size = 16, muted = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
      <polygon points="2,5 5,5 9,2 9,14 5,11 2,11" fill="#000" />
      {!muted ? (
        <path d="M11,5 A4,4 0 0,1 11,11 M13,3 A7,7 0 0,1 13,13" fill="none" stroke="#000" strokeWidth="1" />
      ) : (
        <path d="M11,6 L15,10 M15,6 L11,10" fill="none" stroke="#cc0000" strokeWidth="1.5" />
      )}
    </svg>
  );
}
