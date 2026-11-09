import React from 'react';
import { 
  ShieldCheck, 
  FolderUp, 
  Cloud, 
  Printer, 
  RotateCcw, 
  ChevronDown, 
  BookOpen,
  Award,
  UserCheck
} from 'lucide-react';
import klustLogo from '../assets/klust-logo.jpg';

export default function Navbar({
  courses,
  activeCourse,
  onSelectCourse,
  onOpenUpload,
  onOpenDriveModal,
  onOpenReport,
  onResetSamples,
  onOpenEditCourse
}) {
  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(15, 23, 42, 0.06)'
    }}>
      {/* Primary Institutional Masthead Header */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #f1f5f9',
        padding: '0.75rem 2rem'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Institutional Brand Header with Official KLUST Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
            <img
              src={klustLogo}
              alt="Kuala Lumpur University of Science and Technology (KLUST)"
              style={{
                height: '48px',
                width: 'auto',
                maxWidth: '220px',
                objectFit: 'contain',
                display: 'block'
              }}
            />
            <div style={{ width: '1.5px', height: '40px', background: '#e2e8f0' }} />
            <div>
              <div style={{ 
                fontSize: '0.88rem', 
                fontWeight: 800, 
                color: '#0f172a', 
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                lineHeight: 1.2
              }}>
                Kuala Lumpur University of Science and Technology
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                color: 'var(--primary)', 
                letterSpacing: '0.01em',
                marginTop: '0.15rem'
              }}>
                Centre for Academic Quality Assurance • Outcome-Based Education (OBE) Audit Portal
              </div>
            </div>
          </div>

          {/* System & Session Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                  EduAudit <span style={{ color: 'var(--primary)' }}>Pro</span>
                </span>
                <span className="badge badge-primary" style={{ fontSize: '0.66rem', padding: '0.12rem 0.45rem' }}>
                  2026 Edition
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Session 2026/2027 • Accredited Framework
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Action & Course Toolbar */}
      <div style={{
        background: '#f8fafc',
        padding: '0.55rem 2rem'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          {/* Course Selector Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Auditing Course:
            </span>
            <div style={{ position: 'relative' }}>
              <select
                value={activeCourse?.id || ''}
                onChange={(e) => onSelectCourse(e.target.value)}
                style={{
                  appearance: 'none',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.42rem 2.2rem 0.42rem 0.85rem',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  outline: 'none',
                  maxWidth: '320px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                }}
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.name.length > 28 ? c.name.slice(0, 28) + '...' : c.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                color: 'var(--text-muted)'
              }} />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onOpenEditCourse}
              title="Edit assigned lecturer, internal auditor, and course settings"
            >
              <UserCheck size={14} style={{ color: 'var(--primary)' }} />
              <span>Auditor & Lecturer</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onOpenDriveModal}
              title="Connect with Google Drive & Apps Script"
            >
              <Cloud size={14} style={{ color: '#0284c7' }} />
              <span>Google Drive</span>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onOpenUpload}
              title="Upload Teaching File Folder or ZIP"
            >
              <FolderUp size={14} />
              <span>Upload Folder / ZIP</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onOpenReport}
              title="Preview and print formal Internal Quality Audit Report"
            >
              <Printer size={14} />
              <span>Audit Report</span>
            </button>

            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={onResetSamples}
              title="Reset to pre-loaded sample courses"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
