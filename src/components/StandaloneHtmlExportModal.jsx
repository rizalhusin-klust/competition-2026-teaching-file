import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  FileCode, 
  Check, 
  Sparkles, 
  FolderCheck, 
  ShieldCheck, 
  GraduationCap, 
  HelpCircle,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { 
  generateSuggestedFilename, 
  downloadStandaloneHtmlReport, 
  openStandaloneHtmlInNewTab 
} from '../services/htmlReportGenerator';

export default function StandaloneHtmlExportModal({ isOpen, onClose, course, userRole = 'auditor' }) {
  if (!isOpen || !course) return null;

  const isAuditor = userRole === 'auditor';
  const defaultFilename = generateSuggestedFilename(course, userRole);
  const [filename, setFilename] = useState(defaultFilename);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    if (course) {
      setFilename(generateSuggestedFilename(course, userRole));
      setDownloadSuccess(false);
    }
  }, [course, userRole, isOpen]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadStandaloneHtmlReport(course, userRole, filename);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setDownloading(false);
    }
  };

  const handlePreview = async () => {
    await openStandaloneHtmlInNewTab(course, userRole);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content fade-in" style={{ maxWidth: '680px' }}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #1e40af 0%, #0284c7 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)'
            }}>
              <FileCode size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Export Standalone HTML Dossier
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                Save all 14 folders (00 to 13), links, and OBE quality findings in a single portable .html file.
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="btn-ghost" style={{ padding: '0.35rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Key Advantage Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
            border: '1px solid #bfdbfe',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <Sparkles size={20} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.82rem', color: '#1e3a8a', lineHeight: 1.5 }}>
              <strong>100% Self-Contained & Universal:</strong> This single file embeds the official KLUST letterhead logo, all 14 folder audit findings (00 to 13), direct Google Drive links, and signature blocks. It opens in <strong>any web browser</strong> offline without requiring internet, hosting, or external stylesheets!
            </div>
          </div>

          {/* Suggested Filename Generator Section */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Recommended Systematic Filename
              </label>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setFilename(defaultFilename)}
                style={{ fontSize: '0.72rem', color: 'var(--primary)', padding: '0.1rem 0.4rem' }}
              >
                Reset to Default
              </button>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--primary)',
                  fontSize: '0.86rem',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  background: '#ffffff'
                }}
              />
            </div>

            {/* Filename Composition Breakdown */}
            <div style={{
              marginTop: '0.65rem',
              background: 'var(--surface-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '0.5rem',
              fontSize: '0.74rem'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Programme:</span><br />
                <strong style={{ color: '#1e40af' }}>{course.program ? (course.program.slice(0, 15) + '...') : 'BSc'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Semester:</span><br />
                <strong style={{ color: '#0f172a' }}>{course.semester ? course.semester.replace('Semester ', 'Sem') : 'Sem1'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Course Code:</span><br />
                <strong style={{ color: 'var(--primary)' }}>{course.code}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Lecturer:</span><br />
                <strong style={{ color: '#166534' }}>{course.lecturer ? course.lecturer.slice(0, 14) : 'Lecturer'}</strong>
              </div>
            </div>
          </div>

          {/* Dossier Content Summary */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
              Included Inside This Standalone Document:
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              fontSize: '0.78rem',
              color: '#334155'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
                <span>Official KLUST Letterhead Logo</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
                <span>All 14 Folders (00 to 13) with File Lists & Links</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
                <span>Direct Google Drive Folder Link</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
                <span>The 6 Quality Pillars Weighted Scores</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
                <span>Constructive Alignment (CLO-PLO) Table</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--success)' }} />
                <span>Formal Auditor, Lecturer & HOD Signatures</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handlePreview}
            title="Open and preview standalone HTML in a new tab"
          >
            <ExternalLink size={14} />
            <span>Preview in New Tab</span>
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleDownload}
              disabled={downloading}
              style={{
                background: downloadSuccess ? 'var(--success)' : 'var(--primary)',
                borderColor: downloadSuccess ? 'var(--success)' : 'var(--primary)'
              }}
            >
              {downloadSuccess ? (
                <>
                  <Check size={14} />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>Download .html Dossier</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
