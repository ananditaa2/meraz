import React, { useState, useEffect } from 'react';
import {
  MyComputerIcon,
  MyDocumentsIcon,
  RecycleBinIcon,
  NotepadIcon,
  InternetExplorerIcon,
  SecretVaultIcon,
  ICQIcon,
  WinampIcon
} from './retroIcons';
import RetroWindow from './components/RetroWindow';
import FileExplorer from './components/FileExplorer';
import Notepad from './components/Notepad';
import EmailViewer from './components/EmailViewer';
import InternetExplorer from './components/InternetExplorer';
import RetroChat from './components/RetroChat';
import WinampPlayer from './components/WinampPlayer';
import PasswordDialog from './components/PasswordDialog';
import SystemDialog from './components/SystemDialog';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import ShutdownScreen from './components/ShutdownScreen';
import {
  INITIAL_FILES,
  LAST_NOTE_FILE,
  SECRET_ARCHIVE_FILES,
  RECYCLE_BIN_FILES,
  WRONG_PASSWORD_RESPONSES
} from './mysteryData';
import {
  playClickSound,
  playDingSound,
  playErrorSound,
  playStartupSound,
  playClueSound,
  toggleMute,
  getMuted
} from './soundEffects';

export default function App() {
  // LocalStorage / Game State
  const [discoveredClues, setDiscoveredClues] = useState(() => {
    try {
      const saved = localStorage.getItem('last_user_clues');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isVaultUnlocked, setIsVaultUnlocked] = useState(() => {
    try {
      return localStorage.getItem('last_user_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const [isCRTEnabled, setIsCRTEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isShutDown, setIsShutDown] = useState(false);
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState(null);

  // Active Windows State
  // { id, title, icon, type, data, isOpen, isMinimized, zIndex }
  const [windows, setWindows] = useState([
    {
      id: 'my_documents',
      title: 'My Documents',
      icon: <MyDocumentsIcon size={14} />,
      type: 'explorer',
      data: { folder: 'my_documents' },
      isOpen: false,
      isMinimized: false,
      zIndex: 10
    }
  ]);
  const [topZIndex, setTopZIndex] = useState(20);
  const [activeWindowId, setActiveWindowId] = useState(null);

  // Dialogs State
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [wrongAttemptIndex, setWrongAttemptIndex] = useState(0);

  const [systemDialogState, setSystemDialogState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'warning',
    buttons: [{ label: 'OK', action: 'ok', primary: true }],
    onAction: null
  });

  // Track Easter Egg 3 (Nostalgia Error) trigger
  const [actionCounter, setActionCounter] = useState(0);
  const [hasShownNostalgiaError, setHasShownNostalgiaError] = useState(false);

  // Synchronize LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('last_user_clues', JSON.stringify(discoveredClues));
    } catch {}
  }, [discoveredClues]);

  useEffect(() => {
    try {
      localStorage.setItem('last_user_unlocked', String(isVaultUnlocked));
    } catch {}
  }, [isVaultUnlocked]);

  // Initial Welcome Notification
  useEffect(() => {
    const timer = setTimeout(() => {
      playStartupSound();
      setSystemDialogState({
        isOpen: true,
        title: 'System Notification - Windows 98',
        message: `Welcome back, User.\n\nLast active session: October 31, 1998 at 11:59 PM.\nThere are unread documents waiting in "My Documents".`,
        type: 'warning',
        buttons: [
          { label: 'Explore Files', action: 'open_docs', primary: true },
          { label: 'Dismiss', action: 'close' }
        ],
        onAction: (action) => {
          if (action === 'open_docs') {
            openAppWindow('my_documents');
          }
          setSystemDialogState((s) => ({ ...s, isOpen: false }));
        }
      });
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Trigger Nostalgia Error Easter Egg after 4 file interactions
  const checkNostalgiaEasterEgg = () => {
    setActionCounter((prev) => {
      const next = prev + 1;
      if (next === 4 && !hasShownNostalgiaError) {
        setHasShownNostalgiaError(true);
        setTimeout(() => {
          playDingSound();
          setSystemDialogState({
            isOpen: true,
            title: 'Windows 98 - General Exception',
            message: `An unexpected amount of nostalgia has occurred.\n\nPlease restart your childhood.`,
            type: 'error',
            buttons: [
              { label: 'Cry Nostalgic Tears', action: 'cry', primary: true },
              { label: 'Ignore', action: 'ignore' }
            ],
            onAction: () => setSystemDialogState((s) => ({ ...s, isOpen: false }))
          });
        }, 500);
      }
      return next;
    });
  };

  // Helper to bring window to front or open if closed
  const bringToFront = (windowId) => {
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setActiveWindowId(windowId);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZ } : w
      )
    );
  };

  // Open generic app window
  const openAppWindow = (appType) => {
    checkNostalgiaEasterEgg();
    if (appType === 'my_documents') {
      const existing = windows.find((w) => w.id === 'my_documents');
      if (existing) {
        bringToFront('my_documents');
      } else {
        const nextZ = topZIndex + 1;
        setTopZIndex(nextZ);
        setActiveWindowId('my_documents');
        setWindows((prev) => [
          ...prev,
          {
            id: 'my_documents',
            title: 'C:\\My Documents',
            icon: <MyDocumentsIcon size={14} />,
            type: 'explorer',
            data: { folder: 'my_documents' },
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ
          }
        ]);
      }
    } else if (appType === 'secret_archive') {
      if (!isVaultUnlocked) {
        setIsPasswordDialogOpen(true);
      } else {
        const existing = windows.find((w) => w.id === 'secret_archive');
        if (existing) {
          bringToFront('secret_archive');
        } else {
          const nextZ = topZIndex + 1;
          setTopZIndex(nextZ);
          setActiveWindowId('secret_archive');
          setWindows((prev) => [
            ...prev,
            {
              id: 'secret_archive',
              title: 'C:\\Secret_Archive',
              icon: <SecretVaultIcon size={14} locked={false} />,
              type: 'explorer',
              data: { folder: 'secret_archive' },
              isOpen: true,
              isMinimized: false,
              zIndex: nextZ
            }
          ]);
        }
      }
    } else if (appType === 'recycle_bin') {
      const existing = windows.find((w) => w.id === 'recycle_bin');
      if (existing) {
        bringToFront('recycle_bin');
      } else {
        const nextZ = topZIndex + 1;
        setTopZIndex(nextZ);
        setActiveWindowId('recycle_bin');
        setWindows((prev) => [
          ...prev,
          {
            id: 'recycle_bin',
            title: 'Recycle Bin',
            icon: <RecycleBinIcon size={14} />,
            type: 'explorer',
            data: { folder: 'recycle_bin' },
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ
          }
        ]);
      }
    } else if (appType === 'ie') {
      const existing = windows.find((w) => w.id === 'ie');
      if (existing) {
        bringToFront('ie');
      } else {
        const nextZ = topZIndex + 1;
        setTopZIndex(nextZ);
        setActiveWindowId('ie');
        setWindows((prev) => [
          ...prev,
          {
            id: 'ie',
            title: 'Microsoft Internet Explorer',
            icon: <InternetExplorerIcon size={14} />,
            type: 'ie',
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ
          }
        ]);
      }
    } else if (appType === 'notepad') {
      const winId = `notepad_empty`;
      const existing = windows.find((w) => w.id === winId);
      if (existing) {
        bringToFront(winId);
      } else {
        const nextZ = topZIndex + 1;
        setTopZIndex(nextZ);
        setActiveWindowId(winId);
        setWindows((prev) => [
          ...prev,
          {
            id: winId,
            title: 'Untitled - Notepad',
            icon: <NotepadIcon size={14} />,
            type: 'notepad',
            data: { file: { name: 'Untitled', content: 'Type your thoughts here...' } },
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ
          }
        ]);
      }
    } else if (appType === 'chat') {
      const existing = windows.find((w) => w.id === 'icq_chat');
      if (existing) {
        bringToFront('icq_chat');
      } else {
        const nextZ = topZIndex + 1;
        setTopZIndex(nextZ);
        setActiveWindowId('icq_chat');
        setWindows((prev) => [
          ...prev,
          {
            id: 'icq_chat',
            title: 'ICQ 98a - David (The Last User)',
            icon: <ICQIcon size={14} />,
            type: 'chat',
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ
          }
        ]);
      }
    } else if (appType === 'winamp') {
      const existing = windows.find((w) => w.id === 'winamp_player');
      if (existing) {
        bringToFront('winamp_player');
      } else {
        const nextZ = topZIndex + 1;
        setTopZIndex(nextZ);
        setActiveWindowId('winamp_player');
        setWindows((prev) => [
          ...prev,
          {
            id: 'winamp_player',
            title: 'WinAMP 2.0 - RetroAudio Player',
            icon: <WinampIcon size={14} />,
            type: 'winamp',
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ
          }
        ]);
      }
    }
  };

  // Open specific file in appropriate window
  const handleOpenFile = (file) => {
    checkNostalgiaEasterEgg();

    // Trigger clue discovery
    if (file.clueId && !discoveredClues.includes(file.clueId)) {
      playClueSound();
      setDiscoveredClues((prev) => [...prev, file.clueId]);

      // If user opens Read_Me_First, surprise them with David's ICQ message popup!
      if (file.id === 'read_me') {
        setTimeout(() => {
          openAppWindow('chat');
        }, 1200);
      }
    }

    // Easter Egg 5: IMPORTANT.txt popup
    if (file.triggersPopup) {
      playDingSound();
      setSystemDialogState({
        isOpen: true,
        title: 'Instruction Warning',
        message: `Why would you do that?\n\nThe instructions were literally written above.`,
        type: 'warning',
        buttons: [{ label: 'I Regret Nothing', action: 'ok', primary: true }],
        onAction: () => setSystemDialogState((s) => ({ ...s, isOpen: false }))
      });
    }

    // Open file in viewer
    const winId = `file_${file.id}`;
    const existing = windows.find((w) => w.id === winId);
    if (existing) {
      bringToFront(winId);
      return;
    }

    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setActiveWindowId(winId);

    const isEmail = file.isEmail;
    setWindows((prev) => [
      ...prev,
      {
        id: winId,
        title: isEmail ? `Message: ${file.name}` : `${file.name} - Notepad`,
        icon: isEmail ? <EmailViewer file={file} /> : <NotepadIcon size={14} />,
        type: isEmail ? 'email' : 'notepad',
        data: { file },
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ
      }
    ]);
  };

  const handleCloseWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const handleMinimizeWindow = (id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const handleTaskbarWindowClick = (id) => {
    const win = windows.find((w) => w.id === id);
    if (!win) return;
    if (win.isMinimized) {
      bringToFront(id);
    } else if (activeWindowId === id) {
      handleMinimizeWindow(id);
    } else {
      bringToFront(id);
    }
  };

  // Password submission success
  const handlePasswordSuccess = () => {
    setIsVaultUnlocked(true);
    setIsPasswordDialogOpen(false);
    setTimeout(() => {
      openAppWindow('secret_archive');
    }, 400);
  };

  // Wrong password Easter Egg handling
  const handleWrongPassword = () => {
    const resp = WRONG_PASSWORD_RESPONSES[wrongAttemptIndex % WRONG_PASSWORD_RESPONSES.length];
    setWrongAttemptIndex((prev) => prev + 1);

    setSystemDialogState({
      isOpen: true,
      title: resp.title,
      message: resp.text,
      type: 'error',
      buttons: [{ label: 'Try Again', action: 'retry', primary: true }],
      onAction: () => setSystemDialogState((s) => ({ ...s, isOpen: false }))
    });
  };

  // Hint dialog
  const handleShowHint = () => {
    playDingSound();
    setSystemDialogState({
      isOpen: true,
      title: 'Password Clue Summary',
      message: `Clue 1 (Diary): The first two digits mark our century (19--).\nClue 2 (Arthur's Email): The last two digits are our launch year ('98).\n\nCombine both: 1998.`,
      type: 'warning',
      buttons: [{ label: 'Got It!', action: 'ok', primary: true }],
      onAction: () => setSystemDialogState((s) => ({ ...s, isOpen: false }))
    });
  };

  // Reset entire puzzle progress for judge replayability
  const handleResetProgress = () => {
    localStorage.removeItem('last_user_clues');
    localStorage.removeItem('last_user_unlocked');
    setDiscoveredClues([]);
    setIsVaultUnlocked(false);
    setWindows([
      {
        id: 'my_documents',
        title: 'C:\\My Documents',
        icon: <MyDocumentsIcon size={14} />,
        type: 'explorer',
        data: { folder: 'my_documents' },
        isOpen: true,
        isMinimized: false,
        zIndex: 10
      }
    ]);
    playStartupSound();
  };

  // Find Dialog
  const handleOpenFind = () => {
    playDingSound();
    setSystemDialogState({
      isOpen: true,
      title: 'Find: All Files',
      message: `Search Query: "password"\n\nResults found:\n1. Read_Me_First.txt (Mentions clock)\n2. personal_diary.txt (Century clue: 19)\n3. old_email.eml (Year clue: 98)\n4. Secret_Archive (Encrypted)`,
      type: 'warning',
      buttons: [
        { label: 'Open Documents', action: 'open_docs', primary: true },
        { label: 'Close', action: 'close' }
      ],
      onAction: (action) => {
        if (action === 'open_docs') openAppWindow('my_documents');
        setSystemDialogState((s) => ({ ...s, isOpen: false }));
      }
    });
  };

  // Help Dialog
  const handleOpenHelp = () => {
    playDingSound();
    setSystemDialogState({
      isOpen: true,
      title: 'Windows 98 Help & Mystery Guide',
      message: `OBJECTIVE:\n1. Open "My Documents" and read the files.\n2. Discover the 4-digit passcode hidden in the diary and email.\n3. Open "Secret Archive" on the desktop.\n4. Enter the passcode to discover the final secret!`,
      type: 'warning',
      buttons: [{ label: 'Start Investigating', action: 'ok', primary: true }],
      onAction: () => setSystemDialogState((s) => ({ ...s, isOpen: false }))
    });
  };

  // Run Dialog
  const handleOpenRun = () => {
    const command = window.prompt('Type the name of a program, folder, document, or Internet resource:\n(Try: notepad, ie, secret, 1998, docs)');
    if (!command) return;
    const cmd = command.toLowerCase().trim();
    if (cmd === 'notepad') openAppWindow('notepad');
    else if (cmd === 'ie' || cmd === 'explorer') openAppWindow('ie');
    else if (cmd === 'docs' || cmd === 'documents') openAppWindow('my_documents');
    else if (cmd === 'secret' || cmd === 'archive' || cmd === '1998') {
      if (!isVaultUnlocked) setIsPasswordDialogOpen(true);
      else openAppWindow('secret_archive');
    } else {
      playErrorSound();
      alert(`Cannot find the file '${command}' (or one of its components). Make sure the path and filename are correct.`);
    }
  };

  // Shut Down confirmation (Easter Egg 6)
  const handleOpenShutdown = () => {
    playDingSound();
    setSystemDialogState({
      isOpen: true,
      title: 'Shut Down Windows',
      message: `Are you sure?\n\nYou just made a new friend.`,
      type: 'question',
      buttons: [
        { label: 'Yes, Shut Down', action: 'confirm_shutdown', primary: false },
        { label: 'Cancel', action: 'cancel', primary: true }
      ],
      onAction: (action) => {
        if (action === 'confirm_shutdown') {
          setIsShutDown(true);
        }
        setSystemDialogState((s) => ({ ...s, isOpen: false }));
      }
    });
  };

  // Prepare file list for My Documents (last_note appears if >= 2 clues or unlocked)
  const showLastNote = discoveredClues.length >= 2 || isVaultUnlocked;
  const myDocsFiles = showLastNote
    ? [...INITIAL_FILES, LAST_NOTE_FILE]
    : INITIAL_FILES;

  if (isShutDown) {
    return <ShutdownScreen onRestart={() => setIsShutDown(false)} />;
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        backgroundColor: '#008080',
        overflow: 'hidden'
      }}
      onClick={() => {
        if (isStartOpen) setIsStartOpen(false);
      }}
    >
      {/* CRT Scanline Effect */}
      {isCRTEnabled && <div className="crt-overlay" />}

      {/* Desktop Icons */}
      <div className="win-desktop-icons">
        {/* My Computer */}
        <div
          className={`win-desktop-icon ${selectedDesktopIcon === 'my_computer' ? 'selected' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            setSelectedDesktopIcon('my_computer');
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openAppWindow('my_documents');
          }}
        >
          <MyComputerIcon size={32} />
          <span className="win-desktop-icon-label">My Computer</span>
        </div>

        {/* My Documents */}
        <div
          className={`win-desktop-icon ${selectedDesktopIcon === 'my_documents' ? 'selected' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            setSelectedDesktopIcon('my_documents');
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openAppWindow('my_documents');
          }}
        >
          <MyDocumentsIcon size={32} />
          <span className="win-desktop-icon-label">My Documents</span>
        </div>

        {/* Internet Explorer (Easter Egg 2) */}
        <div
          className={`win-desktop-icon ${selectedDesktopIcon === 'ie' ? 'selected' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            setSelectedDesktopIcon('ie');
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openAppWindow('ie');
          }}
        >
          <InternetExplorerIcon size={32} />
          <span className="win-desktop-icon-label">Internet Explorer</span>
        </div>

        {/* Notepad */}
        <div
          className={`win-desktop-icon ${selectedDesktopIcon === 'notepad' ? 'selected' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            setSelectedDesktopIcon('notepad');
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openAppWindow('notepad');
          }}
        >
          <NotepadIcon size={32} />
          <span className="win-desktop-icon-label">Notepad</span>
        </div>

        {/* Recycle Bin (Easter Egg 1) */}
        <div
          className={`win-desktop-icon ${selectedDesktopIcon === 'recycle_bin' ? 'selected' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            setSelectedDesktopIcon('recycle_bin');
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openAppWindow('recycle_bin');
          }}
        >
          <RecycleBinIcon size={32} />
          <span className="win-desktop-icon-label">Recycle Bin</span>
        </div>

        {/* David ICQ Chat (Digital Ghost) */}
        <div
          className={`win-desktop-icon ${selectedDesktopIcon === 'icq' ? 'selected' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            setSelectedDesktopIcon('icq');
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openAppWindow('chat');
          }}
        >
          <ICQIcon size={32} />
          <span className="win-desktop-icon-label" style={{ color: '#88ff88', fontWeight: 'bold' }}>
            David (ICQ 98)
          </span>
        </div>

        {/* Winamp 2.0 Audio Player */}
        <div
          className={`win-desktop-icon ${selectedDesktopIcon === 'winamp' ? 'selected' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            setSelectedDesktopIcon('winamp');
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openAppWindow('winamp');
          }}
        >
          <WinampIcon size={32} />
          <span className="win-desktop-icon-label">WinAMP 2.0</span>
        </div>

        {/* Secret Archive (The Mystery Vault) */}
        <div
          className={`win-desktop-icon ${selectedDesktopIcon === 'secret_archive' ? 'selected' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            setSelectedDesktopIcon('secret_archive');
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openAppWindow('secret_archive');
          }}
        >
          <SecretVaultIcon size={32} locked={!isVaultUnlocked} />
          <span
            className="win-desktop-icon-label"
            style={{ fontWeight: isVaultUnlocked ? 'bold' : 'normal', color: isVaultUnlocked ? '#ffffaa' : '#ffffff' }}
          >
            {isVaultUnlocked ? 'Secret Archive' : 'Secret_Archive'}
          </span>
        </div>
      </div>

      {/* Render Active Windows */}
      {windows.map((win) => (
        <RetroWindow
          key={win.id}
          id={win.id}
          title={win.title}
          icon={win.icon}
          isOpen={win.isOpen}
          isMinimized={win.isMinimized}
          zIndex={win.zIndex}
          onClose={() => handleCloseWindow(win.id)}
          onMinimize={() => handleMinimizeWindow(win.id)}
          onFocus={() => bringToFront(win.id)}
        >
          {win.type === 'explorer' && (
            <FileExplorer
              currentPath={
                win.data?.folder === 'secret_archive'
                  ? 'C:\\Secret_Archive'
                  : win.data?.folder === 'recycle_bin'
                  ? 'Recycle Bin'
                  : 'C:\\My Documents'
              }
              files={
                win.data?.folder === 'secret_archive'
                  ? SECRET_ARCHIVE_FILES
                  : win.data?.folder === 'recycle_bin'
                  ? RECYCLE_BIN_FILES
                  : myDocsFiles
              }
              onOpenFile={handleOpenFile}
              onUnlockRequest={() => setIsPasswordDialogOpen(true)}
            />
          )}

          {win.type === 'notepad' && (
            <Notepad
              file={win.data?.file}
              onShowHelpHint={handleShowHint}
            />
          )}

          {win.type === 'email' && (
            <EmailViewer file={win.data?.file} />
          )}

          {win.type === 'ie' && (
            <InternetExplorer />
          )}

          {win.type === 'chat' && (
            <RetroChat
              cluesCount={discoveredClues.length}
              isVaultUnlocked={isVaultUnlocked}
            />
          )}

          {win.type === 'winamp' && (
            <WinampPlayer />
          )}
        </RetroWindow>
      ))}

      {/* Password Authentication Modal Dialog */}
      <PasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        onSuccess={handlePasswordSuccess}
        onWrongPassword={handleWrongPassword}
        onShowHint={handleShowHint}
      />

      {/* Universal System Dialog (Alerts, Easter Eggs, Warnings) */}
      <SystemDialog
        isOpen={systemDialogState.isOpen}
        title={systemDialogState.title}
        message={systemDialogState.message}
        type={systemDialogState.type}
        buttons={systemDialogState.buttons}
        onAction={systemDialogState.onAction}
        onClose={() => setSystemDialogState((s) => ({ ...s, isOpen: false }))}
      />

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        onOpenApp={openAppWindow}
        onOpenFind={handleOpenFind}
        onOpenHelp={handleOpenHelp}
        onOpenRun={handleOpenRun}
        onOpenShutdown={handleOpenShutdown}
        onToggleSound={() => setIsMuted(toggleMute())}
        onToggleCRT={() => setIsCRTEnabled(!isCRTEnabled)}
        onResetProgress={handleResetProgress}
        isSoundMuted={isMuted}
        isCRTEnabled={isCRTEnabled}
      />

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        isStartOpen={isStartOpen}
        onToggleStart={() => setIsStartOpen(!isStartOpen)}
        onWindowClick={handleTaskbarWindowClick}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(toggleMute())}
        cluesCount={discoveredClues.length}
        isVaultUnlocked={isVaultUnlocked}
      />
    </div>
  );
}
