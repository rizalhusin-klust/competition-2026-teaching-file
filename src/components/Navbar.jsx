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
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0.85rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <img
            src={klustLogo}
            alt="Kuala Lumpur University of Science and Technology"
            style={{
              height: '42px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
          <div style={{ width: '1px', height: '34px', background: 'var(--border)' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                EduAudit <span style={{ color: 'var(--primary)' }}>Pro</span>
              </span>
              <span className="badge badge-primary" style={{ fontSize: '0.68rem', padding: '0.12rem 0.45rem' }}>
                2026 Edition
              </span>
            </div>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Teaching & Learning Quality Auditor
            </p>
          </div>
        </div>

        {/* Course Selector Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Auditing Course:
          </span>
          <div style={{ position: 'relative' }}>
            <select
              value={activeCourse?.id || ''}
              onChange={(e) => onSelectCourse(e.target.value)}
              style={{
                appearance: 'none',
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem 2.2rem 0.5rem 0.85rem',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                cursor: 'pointer',
                outline: 'none',
                maxWidth: '280px'
              }}
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.code} - {c.name.length > 25 ? c.name.slice(0, 25) + '...' : c.name}
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
            <UserCheck size={15} style={{ color: 'var(--primary)' }} />
            <span>Auditor & Lecturer</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onOpenDriveModal}
            title="Connect with Google Drive & Apps Script"
          >
            <Cloud size={15} style={{ color: '#0284c7' }} />
            <span>Google Drive</span>
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onOpenUpload}
            title="Upload Teaching File Folder or ZIP"
          >
            <FolderUp size={15} />
            <span>Upload Folder / ZIP</span>
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onOpenReport}
            title="Preview and print formal Internal Quality Audit Report"
          >
            <Printer size={15} />
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
    </header>
  );
}
