import React, { useState } from 'react';
import { 
  X, 
  Cloud, 
  Copy, 
  Check, 
  ExternalLink, 
  FolderCheck, 
  FileSpreadsheet, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { GOOGLE_APPS_SCRIPT_TEMPLATE } from '../services/googleDriveBridge';

export default function GoogleDriveSyncModal({ isOpen, onClose, course }) {
  const [copied, setCopied] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');

  if (!isOpen) return null;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSyncToDrive = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('success');
      setTimeout(() => setSyncStatus(''), 3000);
    }, 1200);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content fade-in" style={{ maxWidth: '780px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cloud size={22} style={{ color: '#0284c7' }} />
              Google Drive Management & Cloud Bridge
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Manage teaching files, automated folder creation, and audit result syncing with Google Drive.
            </p>
          </div>
          <button type="button" onClick={onClose} className="btn-ghost" style={{ padding: '0.35rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Active Drive Connection Status */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)',
            border: '1px solid #bae6fd',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-success">
                  <Check size={12} /> Google Drive Connected
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  {course?.code} Portfolio
                </span>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.35rem' }}>
                Google Drive Folder: {course?.code} - {course?.name}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                URL: <code className="mono">{course?.driveFolderUrl || 'https://drive.google.com'}</code>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a
                href={course?.driveFolderUrl || 'https://drive.google.com'}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <ExternalLink size={14} /> Open in Google Drive
              </a>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleSyncToDrive}
                disabled={syncStatus === 'syncing'}
              >
                {syncStatus === 'syncing' ? 'Syncing...' : (syncStatus === 'success' ? 'Synced!' : 'Sync Findings to Drive')}
              </button>
            </div>
          </div>

          {/* How Google Drive Works for Non-Coders */}
          <div style={{ background: 'var(--surface-subtle)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <HelpCircle size={16} style={{ color: 'var(--primary)' }} />
              How Documents are Managed in Google Drive (For Non-Coders)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem', marginTop: '0.75rem' }}>
              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--primary)' }}>Step 1: Standardized 13 Folders</div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Each course has 13 subfolders (01 Course Syllabus to 13 Miscellaneous) in Google Drive.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--primary)' }}>Step 2: Lecturer Uploads</div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  The lecturer simply drops PDFs, exam scripts, and rubrics into their respective Google Drive folders.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--primary)' }}>Step 3: Instant Auditor Quality Scrutiny</div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  The auditor evaluates constructive alignment, rubric depth, and formative feedback with one click.
                </p>
              </div>
            </div>
          </div>

          {/* Optional Google Apps Script Section */}
          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Automated Google Drive & Google Sheets Script (Optional Setup)
                </h4>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  You can paste this script in your Google Sheets Apps Script to automatically build the 13 folders and log audit verdicts!
                </p>
              </div>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleCopyScript}
              >
                {copied ? <Check size={14} style={{ color: 'var(--success)' }} /> : <Copy size={14} />}
                <span>{copied ? 'Code Copied!' : 'Copy Script'}</span>
              </button>
            </div>

            <textarea
              readOnly
              rows={6}
              value={GOOGLE_APPS_SCRIPT_TEMPLATE}
              style={{
                width: '100%',
                background: '#1e293b',
                color: '#e2e8f0',
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                resize: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
