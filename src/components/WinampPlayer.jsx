import React, { useState, useEffect } from 'react';
import { WinampIcon } from '../retroIcons';
import {
  playClickSound,
  playWinampTrack,
  stopMusic,
  getVisualizerLevels
} from '../soundEffects';

const TRACKS = [
  { id: 'lofi', title: '1. David - 1998 Midnight Lab (Synthwave Lo-Fi)', duration: '02:45' },
  { id: 'voicemail', title: '2. Tape - Corrupted Voicemail Oct 31 1998', duration: '01:15' }
];

export default function WinampPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(14);
  const [eqLevels, setEqLevels] = useState([3, 5, 4, 7, 6, 8, 5, 3]);

  // Audio equalizer ticker
  useEffect(() => {
    let animId;
    const updateEq = () => {
      if (isPlaying) {
        setEqLevels(getVisualizerLevels());
      } else {
        setEqLevels([1, 1, 1, 1, 1, 1, 1, 1]);
      }
      animId = requestAnimationFrame(updateEq);
    };
    animId = requestAnimationFrame(updateEq);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Timer counter
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = (idx = currentTrackIndex) => {
    playClickSound();
    setCurrentTrackIndex(idx);
    setIsPlaying(true);
    playWinampTrack(TRACKS[idx].id);
  };

  const handlePause = () => {
    playClickSound();
    setIsPlaying(false);
    stopMusic();
  };

  const handleStop = () => {
    playClickSound();
    setIsPlaying(false);
    setSeconds(0);
    stopMusic();
  };

  const handleNext = () => {
    playClickSound();
    const next = (currentTrackIndex + 1) % TRACKS.length;
    handlePlay(next);
  };

  const handlePrev = () => {
    playClickSound();
    const prev = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    handlePlay(prev);
  };

  const currentTrack = TRACKS[currentTrackIndex];
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#232526',
        color: '#00ff00',
        fontFamily: "'Courier New', Courier, monospace",
        padding: '6px',
        boxSizing: 'border-box'
      }}
    >
      {/* Top Main Panel */}
      <div
        style={{
          background: '#1a1c1d',
          border: '2px solid #555',
          borderRadius: '3px',
          padding: '8px',
          marginBottom: '6px'
        }}
      >
        {/* LED Time and Track Display */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div
            style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#00ff66',
              textShadow: '0 0 6px #00ff66',
              letterSpacing: '2px'
            }}
          >
            {formatTime(seconds)}
          </div>
          <div style={{ fontSize: '10px', color: '#ffcc00', textAlign: 'right' }}>
            <span>128 kbps</span> | <span>44 kHz</span>
            <br />
            <span style={{ color: '#00ccff' }}>STEREO</span>
          </div>
        </div>

        {/* Marquee Track Title */}
        <div
          style={{
            background: '#0a0d0e',
            color: '#00ff66',
            padding: '4px 6px',
            fontSize: '11px',
            border: '1px solid #333',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            marginBottom: '8px'
          }}
        >
          {isPlaying ? '▶ ' : '■ '}
          {currentTrack.title}
        </div>

        {/* Live Graphic Equalizer Bars */}
        <div
          style={{
            height: '34px',
            background: '#0d1112',
            border: '1px solid #333',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: '2px 8px',
            gap: '4px'
          }}
        >
          {eqLevels.map((lvl, i) => (
            <div
              key={i}
              style={{
                width: '10%',
                height: `${lvl * 10}%`,
                background: lvl > 7 ? '#ff3333' : lvl > 4 ? '#ffcc00' : '#00ff66',
                boxShadow: '0 0 4px rgba(0,255,100,0.5)',
                transition: 'height 0.08s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          justifyContent: 'center',
          marginBottom: '8px'
        }}
      >
        <button className="win-button" style={{ minWidth: '35px', padding: '2px' }} onClick={handlePrev} title="Previous">
          ⏮
        </button>
        <button
          className={`win-button ${isPlaying ? 'active' : ''}`}
          style={{ minWidth: '45px', fontWeight: 'bold' }}
          onClick={() => handlePlay()}
          title="Play"
        >
          ▶ Play
        </button>
        <button className="win-button" style={{ minWidth: '35px', padding: '2px' }} onClick={handlePause} title="Pause">
          ⏸
        </button>
        <button className="win-button" style={{ minWidth: '35px', padding: '2px' }} onClick={handleStop} title="Stop">
          ⏹
        </button>
        <button className="win-button" style={{ minWidth: '35px', padding: '2px' }} onClick={handleNext} title="Next">
          ⏭
        </button>
      </div>

      {/* Playlist Section */}
      <div
        className="win-inset"
        style={{
          flex: 1,
          background: '#000000',
          color: '#ffffff',
          overflowY: 'auto',
          padding: '4px',
          fontSize: '11px',
          border: '1px solid #444'
        }}
      >
        <div style={{ color: '#ffcc00', fontWeight: 'bold', marginBottom: '4px', borderBottom: '1px solid #333', paddingBottom: '2px' }}>
          WINAMP PLAYLIST:
        </div>
        {TRACKS.map((t, i) => {
          const isSelected = i === currentTrackIndex;
          return (
            <div
              key={t.id}
              onClick={() => handlePlay(i)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '3px 6px',
                cursor: 'pointer',
                background: isSelected ? '#000080' : 'transparent',
                color: isSelected ? '#ffffff' : '#a0a0a0'
              }}
            >
              <span>{t.title}</span>
              <span>{t.duration}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
