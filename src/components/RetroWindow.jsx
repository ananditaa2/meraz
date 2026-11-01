import React, { useState, useRef, useEffect } from 'react';

export default function RetroWindow({
  id,
  title,
  icon,
  isOpen,
  isMinimized,
  zIndex,
  initialPosition = { x: 100, y: 50 },
  initialSize = { width: 480, height: 340 },
  onClose,
  onMinimize,
  onFocus,
  children
}) {
  const [pos, setPos] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current || isMaximized) return;
      const newX = Math.max(0, Math.min(window.innerWidth - 60, e.clientX - dragOffset.current.x));
      const newY = Math.max(0, Math.min(window.innerHeight - 60, e.clientY - dragOffset.current.y));
      setPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMaximized]);

  if (!isOpen || isMinimized) return null;

  const handleTitleMouseDown = (e) => {
    if (e.target.closest('.win-titlebar-btn')) return;
    onFocus?.();
    if (isMaximized) return;
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    };
  };

  const windowStyle = isMaximized
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 28px)',
        zIndex
      }
    : {
        top: `${pos.y}px`,
        left: `${pos.x}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex
      };

  return (
    <div
      className="win-window win-outset"
      style={windowStyle}
      onMouseDown={() => onFocus?.()}
    >
      {/* Titlebar */}
      <div
        className="win-titlebar"
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={() => setIsMaximized(!isMaximized)}
      >
        <div className="win-titlebar-title">
          {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
          <span>{title}</span>
        </div>
        <div className="win-titlebar-controls">
          <button
            className="win-titlebar-btn"
            title="Minimize"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize?.();
            }}
          >
            _
          </button>
          <button
            className="win-titlebar-btn"
            title={isMaximized ? 'Restore' : 'Maximize'}
            onClick={(e) => {
              e.stopPropagation();
              setIsMaximized(!isMaximized);
            }}
          >
            {isMaximized ? '❐' : '□'}
          </button>
          <button
            className="win-titlebar-btn"
            title="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="win-window-body">
        {children}
      </div>
    </div>
  );
}
