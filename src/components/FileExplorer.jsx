import React, { useState } from 'react';
import { FileTextIcon, EmailFileIcon, WarningIcon, SecretVaultIcon } from '../retroIcons';
import { playClickSound } from '../soundEffects';

export default function FileExplorer({
  folderName = 'My Documents',
  currentPath = 'C:\\My Documents',
  files = [],
  onOpenFile,
  onUnlockRequest
}) {
  const [selectedFileId, setSelectedFileId] = useState(null);

  const handleRowClick = (file) => {
    playClickSound();
    setSelectedFileId(file.id);
  };

  const handleRowDoubleClick = (file) => {
    playClickSound();
    if (file.isSecretLocked) {
      onUnlockRequest?.();
    } else {
      onOpenFile(file);
    }
  };

  const renderIcon = (file) => {
    if (file.isSecretLocked) {
      return <SecretVaultIcon size={16} locked={true} />;
    }
    if (file.isEmail) {
      return <EmailFileIcon size={16} />;
    }
    if (file.triggersPopup) {
      return <FileTextIcon size={16} isWarning={true} />;
    }
    if (file.isFinal) {
      return <FileTextIcon size={16} isGold={true} />;
    }
    return <FileTextIcon size={16} />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Menu / Address Bar */}
      <div style={{ background: '#c0c0c0', padding: '4px', borderBottom: '1px solid #808080' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: '#444' }}>Address</span>
          <div
            className="win-inset"
            style={{
              flex: 1,
              background: '#fff',
              padding: '2px 6px',
              fontSize: '11px',
              fontFamily: 'monospace'
            }}
          >
            {currentPath}
          </div>
        </div>
      </div>

      {/* Explorer Content Table */}
      <div className="win-file-list win-inset" style={{ flex: 1, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #c0c0c0', background: '#e0e0e0', color: '#333' }}>
              <th style={{ padding: '3px 6px', fontWeight: 'normal', width: '45%' }}>Name</th>
              <th style={{ padding: '3px 6px', fontWeight: 'normal', width: '20%' }}>Size</th>
              <th style={{ padding: '3px 6px', fontWeight: 'normal', width: '35%' }}>Modified</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => {
              const isSelected = selectedFileId === file.id;
              return (
                <tr
                  key={file.id}
                  onClick={() => handleRowClick(file)}
                  onDoubleClick={() => handleRowDoubleClick(file)}
                  style={{
                    backgroundColor: isSelected ? '#000080' : 'transparent',
                    color: isSelected ? '#ffffff' : '#000000',
                    cursor: 'pointer'
                  }}
                >
                  <td style={{ padding: '3px 6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {renderIcon(file)}
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {file.name}
                    </span>
                  </td>
                  <td style={{ padding: '3px 6px' }}>{file.size}</td>
                  <td style={{ padding: '3px 6px' }}>{file.modified || file.deleted || '10/31/1998'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Status Bar */}
      <div
        className="win-sunken-panel"
        style={{
          padding: '2px 8px',
          fontSize: '10px',
          color: '#555',
          marginTop: '2px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <span>{files.length} object(s)</span>
        <span>Free space: 14.8 MB</span>
      </div>
    </div>
  );
}
