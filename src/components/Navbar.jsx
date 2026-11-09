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
  UserCheck,
  Sparkles,
  GraduationCap,
  Sliders,
  FileCode
} from 'lucide-react';
import klustLogo from '../assets/klust-logo.jpg';

export default function Navbar({
  courses,
  activeCourse,
  onSelectCourse,
  userRole,
  onToggleUserRole,
  aiConfig,
  onOpenAISettings,
  onOpenUpload,
  onOpenDriveModal,
  onOpenReport,
  onResetSamples,
  onOpenEditCourse,
  onOpenExportHtml
}) {
  const isAuditor = userRole === 'auditor';
  const hasCustomKey = Boolean(aiConfig?.apiKey);

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Active AI Status Pill */}
            <button
              type="button"
              onClick={onOpenAISettings}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: hasCustomKey ? 'rgba(37,99,235,0.08)' : 'var(--surface-subtle)',
                border: `1px solid ${hasCustomKey ? 'rgba(37,99,235,0.3)' : 'var(--border)'}`,
                borderRadius: '999px',
                padding: '0.28rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: hasCustomKey ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer'
              }}
              title="Click to configure your own AI (Gemini, OpenAI, OpenRouter)"
            >
              <Sparkles size={14} style={{ color: hasCustomKey ? 'var(--primary)' : '#f59e0b' }} />
              <span>AI: {hasCustomKey ? (aiConfig.provider === 'gemini' ? 'Gemini Active' : 'OpenAI Active') : 'Simulated (Click to set Key)'}</span>
            </button>

            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                  EduAudit <span style={{ color: 'var(--primary)' }}>Pro</span>
                </span>
                <span className="badge badge-primary" style={{ fontSize: '0.66rem', padding: '0.12rem 0.45rem' }}>
                  v2.1 HTML Dossier
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Session 2026/2027 • Portable Archive
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Action & Persona Toolbar */}
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
          
          {/* Left: Course Selector + Dual-Role Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Course Selector Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Course:
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
                    padding: '0.4rem 2.2rem 0.4rem 0.8rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    cursor: 'pointer',
                    outline: 'none',
                    maxWidth: '280px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
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

            {/* DUAL PERSONA TOGGLE (Auditor vs Lecturer) */}
            <div style={{
              display: 'inline-flex',
              background: '#e2e8f0',
              padding: '0.2rem',
              borderRadius: '999px',
              border: '1px solid #cbd5e1'
            }}>
              <button
                type="button"
                onClick={() => onToggleUserRole('auditor')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.28rem 0.75rem',
                  borderRadius: '999px',
                  border: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  background: isAuditor ? '#1e40af' : 'transparent',
                  color: isAuditor ? '#ffffff' : '#475569',
                  boxShadow: isAuditor ? '0 1px 3px rgba(0,0,0,0.2)' : 'none'
                }}
                title="Internal Quality Auditor perspective: Scrutinize evidence, check compliance, issue CARs"
              >
                <ShieldCheck size={14} />
                <span>Auditor Mode</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleUserRole('lecturer')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.28rem 0.75rem',
                  borderRadius: '999px',
                  border: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  background: !isAuditor ? '#065f46' : 'transparent',
                  color: !isAuditor ? '#ffffff' : '#475569',
                  boxShadow: !isAuditor ? '0 1px 3px rgba(0,0,0,0.2)' : 'none'
                }}
                title="Course Lecturer perspective: Self-check before submission, improve rubrics, fill gaps"
              >
                <GraduationCap size={14} />
                <span>Lecturer Self-Check</span>
              </button>
            </div>
          </div>

          {/* Sequential Numbered Workflow Steps Header (Bigger & Explicitly Numbered) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', marginRight: '0.2rem' }}>
              Steps:
            </span>

            {/* Step 1: AI Settings */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onOpenAISettings}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                border: '1.5px solid #cbd5e1',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                gap: '0.45rem'
              }}
              title="Step 1: Configure Bring-Your-Own-AI (Gemini, OpenAI, OpenRouter)"
            >
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#3b82f6',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.74rem',
                fontWeight: 800
              }}>1</span>
              <Sparkles size={15} style={{ color: '#2563eb' }} />
              <span>AI Settings</span>
            </button>

            {/* Step 2: Auditor, Lecturer and HOD */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onOpenEditCourse}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                border: '1.5px solid #cbd5e1',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                gap: '0.45rem'
              }}
              title="Step 2: Edit assigned lecturer, internal auditor, and HOD settings"
            >
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#3b82f6',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.74rem',
                fontWeight: 800
              }}>2</span>
              <UserCheck size={15} style={{ color: '#2563eb' }} />
              <span>Auditor, Lecturer & HOD</span>
            </button>

            {/* Step 3: Google Drive */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onOpenDriveModal}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                border: '1.5px solid #cbd5e1',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                gap: '0.45rem'
              }}
              title="Step 3: Connect with Google Drive & Apps Script"
            >
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#0284c7',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.74rem',
                fontWeight: 800
              }}>3</span>
              <Cloud size={15} style={{ color: '#0284c7' }} />
              <span>Google Drive</span>
            </button>

            {/* Step 4: Upload Folder / ZIP */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenUpload}
              style={{
                padding: '0.45rem 0.95rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                boxShadow: '0 2px 6px rgba(37,99,235,0.25)',
                gap: '0.45rem'
              }}
              title="Step 4: Upload Teaching File Folder or ZIP archive"
            >
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#ffffff',
                color: '#1d4ed8',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.74rem',
                fontWeight: 800
              }}>4</span>
              <FolderUp size={15} />
              <span>Upload Folder / ZIP</span>
            </button>

            {/* Step 5: Audit Report */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onOpenReport}
              style={{
                padding: '0.45rem 0.85rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                border: '1.5px solid #cbd5e1',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                gap: '0.45rem'
              }}
              title="Step 5: Preview and print formal Internal Quality Audit / Self-Check Report"
            >
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#059669',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.74rem',
                fontWeight: 800
              }}>5</span>
              <Printer size={15} style={{ color: '#059669' }} />
              <span>{isAuditor ? 'Audit Report' : 'Self-Check Report'}</span>
            </button>

            {/* Step 6: Single HTML Dossier */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onOpenExportHtml}
              style={{
                padding: '0.45rem 0.9rem',
                fontSize: '0.84rem',
                fontWeight: 800,
                background: '#eff6ff',
                borderColor: '#93c5fd',
                color: '#1e40af',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                gap: '0.45rem'
              }}
              title="Step 6: Save all 13 folders, links, and audit report in a single standalone .html file"
            >
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#1e40af',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.74rem',
                fontWeight: 800
              }}>6</span>
              <FileCode size={15} style={{ color: '#1e40af' }} />
              <span>Single HTML Dossier</span>
            </button>

            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={onResetSamples}
              title="Reset to default pre-loaded sample courses"
              style={{ padding: '0.45rem' }}
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
