import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  Copy, 
  Check, 
  ExternalLink, 
  UploadCloud, 
  DownloadCloud, 
  Sparkles, 
  Database,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { 
  getStoredGSheetConfig, 
  saveStoredGSheetConfig, 
  syncCourseToGoogleSheet, 
  loadCoursesFromGoogleSheet, 
  GSHEET_DATABASE_APPS_SCRIPT 
} from '../services/googleSheetDatabase';

export default function GoogleSheetDatabaseModal({ 
  isOpen, 
  onClose, 
  course, 
  onCoursesLoaded,
  onCourseUpdated 
}) {
  const [config, setConfig] = useState(() => getStoredGSheetConfig());
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('connect'); // 'connect' | 'setup_guide' | 'script'

  useEffect(() => {
    if (isOpen) {
      setConfig(getStoredGSheetConfig());
      setStatusMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GSHEET_DATABASE_APPS_SCRIPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSaveConfig = () => {
    saveStoredGSheetConfig(config);
    setStatusMessage({ type: 'success', text: 'Google Sheet settings saved!' });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handlePushCurrentCourse = async () => {
    if (!config.webAppUrl || !config.webAppUrl.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your Apps Script Web App URL first.' });
      return;
    }

    setIsSyncing(true);
    setStatusMessage(null);

    try {
      await syncCourseToGoogleSheet(course, config.webAppUrl);
      const updatedConfig = {
        ...config,
        lastSyncedAt: new Date().toLocaleString()
      };
      setConfig(updatedConfig);
      saveStoredGSheetConfig(updatedConfig);
      setStatusMessage({ 
        type: 'success', 
        text: `Successfully synced ${course.code} data, 13 folder links & remarks to your Google Sheet!` 
      });
    } catch (err) {
      console.error(err);
      setStatusMessage({ 
        type: 'error', 
        text: `Sync note: If your script doesn't allow cross-origin direct responses, request was dispatched. Please verify in your Google Sheet: ${err.message}` 
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handlePullFromSheet = async () => {
    if (!config.webAppUrl || !config.webAppUrl.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your Apps Script Web App URL first.' });
      return;
    }

    setIsPulling(true);
    setStatusMessage(null);

    try {
      const fetchedCourses = await loadCoursesFromGoogleSheet(config.webAppUrl);
      if (fetchedCourses && fetchedCourses.length > 0) {
        if (onCoursesLoaded) {
          onCoursesLoaded(fetchedCourses);
        }
        setStatusMessage({ 
          type: 'success', 
          text: `Loaded ${fetchedCourses.length} course(s) from your Google Sheet database!` 
        });
      } else {
        setStatusMessage({ 
          type: 'info', 
          text: 'Google Sheet connected, but no course records were found yet. Use "Save to Google Sheet" to push your first course!' 
        });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ 
        type: 'error', 
        text: `Failed to load from Google Sheet: ${err.message}. Make sure your Web App deployment is set to "Who has access: Anyone".` 
      });
    } finally {
      setIsPulling(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content fade-in" style={{ maxWidth: '820px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)'
            }}>
              <FileSpreadsheet size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                Google Sheet Database Integration
                <span className="badge badge-success" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                  Live Cloud Database
                </span>
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                Store all keyed-in course information, 13 folder links, auditor remarks, and OBE scores in your own Google Sheet.
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="btn-ghost" style={{ padding: '0.35rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Status Alert Banner */}
        {statusMessage && (
          <div style={{
            margin: '0.75rem 1.5rem 0 1.5rem',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: statusMessage.type === 'success' ? '#f0fdf4' : (statusMessage.type === 'error' ? '#fef2f2' : '#f0f9ff'),
            border: `1px solid ${statusMessage.type === 'success' ? '#86efac' : (statusMessage.type === 'error' ? '#fca5a5' : '#bae6fd')}`,
            color: statusMessage.type === 'success' ? '#166534' : (statusMessage.type === 'error' ? '#991b1b' : '#0369a1'),
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {statusMessage.type === 'success' && <CheckCircle2 size={16} />}
            {statusMessage.type === 'error' && <AlertCircle size={16} />}
            {statusMessage.type === 'info' && <HelpCircle size={16} />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border)',
          padding: '0 1.5rem',
          marginTop: '0.75rem',
          gap: '1rem'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('connect')}
            style={{
              padding: '0.65rem 0.25rem',
              fontWeight: 700,
              fontSize: '0.88rem',
              color: activeTab === 'connect' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'connect' ? '2.5px solid var(--primary)' : '2.5px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Database size={16} />
            <span>Database Sync & Actions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('setup_guide')}
            style={{
              padding: '0.65rem 0.25rem',
              fontWeight: 700,
              fontSize: '0.88rem',
              color: activeTab === 'setup_guide' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'setup_guide' ? '2.5px solid var(--primary)' : '2.5px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <HelpCircle size={16} />
            <span>3-Step Setup Guide</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('script')}
            style={{
              padding: '0.65rem 0.25rem',
              fontWeight: 700,
              fontSize: '0.88rem',
              color: activeTab === 'script' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'script' ? '2.5px solid var(--primary)' : '2.5px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Copy size={16} />
            <span>Google Apps Script Code</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {activeTab === 'connect' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Active Course Card Preview */}
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                border: '1px solid #a7f3d0',
                borderRadius: 'var(--radius-lg)',
                padding: '1.15rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-success" style={{ fontWeight: 800 }}>
                      Active Course to Sync
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#065f46' }}>
                      {course?.code}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.3rem' }}>
                    {course?.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    Lecturer: <strong>{course?.lecturer}</strong> • Auditor: <strong>{course?.auditorName}</strong> • HOD: <strong>{course?.headOfDepartment}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handlePushCurrentCourse}
                    disabled={isSyncing}
                    style={{
                      background: '#059669',
                      borderColor: '#047857',
                      color: '#ffffff',
                      fontWeight: 800,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.55rem 1rem'
                    }}
                  >
                    {isSyncing ? <RefreshCw size={15} className="spin" /> : <UploadCloud size={15} />}
                    <span>{isSyncing ? 'Saving to Sheet...' : 'Save Current Course to Google Sheet'}</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={handlePullFromSheet}
                    disabled={isPulling}
                    style={{
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.55rem 1rem'
                    }}
                  >
                    {isPulling ? <RefreshCw size={15} className="spin" /> : <DownloadCloud size={15} />}
                    <span>{isPulling ? 'Loading from Sheet...' : 'Load Courses from Google Sheet'}</span>
                  </button>
                </div>
              </div>

              {/* URL Configuration Inputs */}
              <div style={{ background: 'var(--surface-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                  Your Google Sheet Connection Settings
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      Google Apps Script Web App URL (Database API) <span style={{ color: 'var(--danger)' }}>*</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                      value={config.webAppUrl}
                      onChange={(e) => setConfig({ ...config, webAppUrl: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border)',
                        fontSize: '0.85rem',
                        fontFamily: 'monospace'
                      }}
                    />
                    <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Get this from your Google Sheet by clicking: Extensions &rarr; Apps Script &rarr; Deploy &rarr; Web app.
                    </p>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                      Google Sheet URL (For Direct Access / Viewing)
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="url"
                        placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                        value={config.spreadsheetUrl}
                        onChange={(e) => setConfig({ ...config, spreadsheetUrl: e.target.value })}
                        style={{
                          flex: 1,
                          padding: '0.65rem 0.85rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border)',
                          fontSize: '0.85rem'
                        }}
                      />
                      {config.spreadsheetUrl && (
                        <a
                          href={config.spreadsheetUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-secondary btn-sm"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap' }}
                        >
                          <ExternalLink size={14} /> Open Sheet
                        </a>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      {config.lastSyncedAt ? `Last Synced: ${config.lastSyncedAt}` : 'No sync recorded yet'}
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={handleSaveConfig}
                    >
                      <Check size={14} /> Save Connection Settings
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'setup_guide' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                  How to Set Up Your Google Sheet Database (In 2 Minutes)
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#059669',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      flexShrink: 0
                    }}>1</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        Create a Blank Google Sheet in your Google Drive
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        Go to <a href="https://sheets.google.com" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', fontWeight: 700 }}>sheets.google.com</a>, create a new spreadsheet, and name it e.g. <code>EduAudit Teaching Files 2026 Database</code>.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#059669',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      flexShrink: 0
                    }}>2</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        Paste the Apps Script Database Code
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        In the Google Sheet top menu, click <strong>Extensions &rarr; Apps Script</strong>. Delete any code inside <code>Code.gs</code>, switch to the <em>Google Apps Script Code</em> tab above, click <strong>Copy Script</strong>, and paste it into the editor.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#059669',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      flexShrink: 0
                    }}>3</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                        Deploy as Web App & Paste URL Here
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                        In Apps Script, click <strong>Deploy &rarr; New deployment &rarr; Select type (gear icon) &rarr; Web app</strong>. Set <em>Execute as: Me</em> and <em>Who has access: Anyone</em>. Click Deploy, grant Google permissions, and copy the Web App URL into the field in Tab 1!
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{
                  marginTop: '1.25rem',
                  padding: '0.85rem',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  color: '#166534'
                }}>
                  <strong>What gets saved automatically:</strong> The script will automatically generate 2 organized sheets in your Google Sheet:
                  <ul style={{ margin: '0.4rem 0 0 1.25rem' }}>
                    <li><strong>CoursesDatabase</strong>: Master list of all courses, lecturers, auditors, compliance rates, overall OBE scores, and status.</li>
                    <li><strong>TeachingFilesBreakdown</strong>: Detailed audit verdicts, scores (1-5), findings, and links for all 13 Teaching File Folders.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'script' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    Copyable Google Apps Script Code
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Paste this into Extensions &rarr; Apps Script in your Google Sheet.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleCopyScript}
                  style={{ background: '#059669', borderColor: '#047857' }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Code Copied!' : 'Copy Entire Script'}</span>
                </button>
              </div>

              <textarea
                readOnly
                rows={14}
                value={GSHEET_DATABASE_APPS_SCRIPT}
                style={{
                  width: '100%',
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.78rem',
                  fontFamily: 'monospace',
                  resize: 'none',
                  boxSizing: 'border-box',
                  border: '1px solid #334155'
                }}
              />
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Google Sheet acts as your own private, persistent cloud database.
          </div>
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
