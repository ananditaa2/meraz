import React, { useState, useEffect, useRef } from 'react';
import { ICQIcon } from '../retroIcons';
import { playClickSound, playICQUhOhSound } from '../soundEffects';

const QUICK_PROMPTS = [
  'Who are you?',
  'What happened in 1998?',
  'What is the vault password?'
];

export default function RetroChat({
  cluesCount = 0,
  isVaultUnlocked = false,
  onNotify
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'David',
      time: '11:58 PM',
      text: 'Wait... is someone actually on my workstation right now? The terminal just pinged after 26 years.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef(null);
  const prevCluesCount = useRef(cluesCount);
  const prevVaultUnlocked = useRef(isVaultUnlocked);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reactive message when clues change
  useEffect(() => {
    if (cluesCount > prevCluesCount.current) {
      prevCluesCount.current = cluesCount;
      const timer = setTimeout(() => {
        playICQUhOhSound();
        let text = 'You are making progress through the files. Keep digging.';
        if (cluesCount === 1) {
          text = 'You found the diary... Dr. Robert told me to leave, but I locked the master vault first.';
        } else if (cluesCount >= 2) {
          text = 'You found Arthur\'s email! That giant launch poster pinned by the rack: Century [19] + Year [98].';
        }
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), sender: 'David', time: '11:59 PM', text }
        ]);
        onNotify?.();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [cluesCount, onNotify]);

  // Reactive message when vault is unlocked
  useEffect(() => {
    if (isVaultUnlocked && !prevVaultUnlocked.current) {
      prevVaultUnlocked.current = true;
      const timer = setTimeout(() => {
        playICQUhOhSound();
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'David',
            time: '12:00 AM',
            text: 'You unlocked it! You actually solved the code 1998. Open FINAL_MESSAGE.txt. Our time capsule was worth it.'
          }
        ]);
        onNotify?.();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVaultUnlocked, onNotify]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;
    playClickSound();

    const userMsg = {
      id: Date.now(),
      sender: 'You',
      time: '12:00 AM',
      text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Generate responsive reply from David
    setTimeout(() => {
      playICQUhOhSound();
      let reply = "I'm communicating through buffered packet echoes left in the kernel cache.";
      const lower = text.toLowerCase();
      if (lower.includes('who are you')) {
        reply = "I'm David. The last computer science researcher left in the basement lab on October 31, 1998.";
      } else if (lower.includes('what happened') || lower.includes('1998')) {
        reply = "Our grant was revoked and the department decided to wipe the drives. Arthur and I couldn't let our work be lost, so we turned this computer into a digital time capsule.";
      } else if (lower.includes('password') || lower.includes('vault') || lower.includes('code')) {
        reply = "The code is 4 digits: our founding century (19) plus the year we launched (98). Put them together: 1998!";
      } else if (lower.includes('hello') || lower.includes('hi')) {
        reply = "Hello from 1998. It feels good to know someone is sitting in that chair again.";
      }
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: 'David', time: '12:00 AM', text: reply }
      ]);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#c0c0c0' }}>
      {/* ICQ Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 8px',
          background: '#d4d0c8',
          borderBottom: '1px solid #808080'
        }}
      >
        <ICQIcon size={20} />
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '11px', color: '#000080' }}>
            David [The Last User] (UIN: 1998-1031)
          </div>
          <div style={{ fontSize: '10px', color: '#666' }}>
            Status: <span style={{ color: '#008000', fontWeight: 'bold' }}>● Online (Signal from Oct 31, 1998)</span>
          </div>
        </div>
      </div>

      {/* Message History View */}
      <div
        className="win-inset"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px',
          margin: '4px',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        {messages.map((m) => {
          const isMe = m.sender === 'You';
          return (
            <div
              key={m.id}
              style={{
                alignSelf: isMe ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: isMe ? '#e3f2fd' : '#f5f5f5',
                border: '1px solid #c0c0c0',
                padding: '6px 10px',
                borderRadius: '2px',
                fontSize: '11px',
                lineHeight: '1.4'
              }}
            >
              <div style={{ fontSize: '10px', color: isMe ? '#1565c0' : '#d32f2f', fontWeight: 'bold', marginBottom: '2px' }}>
                {m.sender} <span style={{ color: '#888', fontWeight: 'normal' }}>({m.time})</span>:
              </div>
              <div style={{ color: '#222' }}>{m.text}</div>
            </div>
          );
        })}
        <div ref={chatBottomRef} />
      </div>

      {/* Quick Prompts */}
      <div style={{ display: 'flex', gap: '4px', padding: '2px 4px', overflowX: 'auto' }}>
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            className="win-button"
            style={{ fontSize: '10px', padding: '2px 6px', minWidth: 'auto', whiteSpace: 'nowrap' }}
            onClick={() => handleSendMessage(prompt)}
          >
            "{prompt}"
          </button>
        ))}
      </div>

      {/* Send Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        style={{ display: 'flex', gap: '4px', padding: '4px' }}
      >
        <input
          type="text"
          className="win-inset"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message to David in 1998..."
          style={{ flex: 1, padding: '4px 6px', fontSize: '11px', outline: 'none' }}
        />
        <button type="submit" className="win-button" style={{ minWidth: '60px', fontWeight: 'bold' }}>
          Send
        </button>
      </form>
    </div>
  );
}
