import React, { useState } from 'react';
import { 
  Folder, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Save, 
  Sparkles,
  Info,
  Check,
  Award,
  Upload,
  AlertCircle,
  Link2
} from 'lucide-react';
import { TEACHING_FILE_ITEMS, QUALITY_PILLARS } from '../data/auditRubrics';

export default function FolderExplorerView({
  course,
  onUpdateCourse,
  initialFolderId = '01',
  userRole = 'auditor',
  onOpenAIReview
}) {
  const isAuditor = userRole === 'auditor';
  const [activeFolderId, setActiveFolderId] = useState(initialFolderId);
  const [savedNotification, setSavedNotification] = useState(false);

  const activeItem = TEACHING_FILE_ITEMS.find(i => i.id === activeFolderId) || TEACHING_FILE_ITEMS[0];
  const audit = course.folderAudits?.[activeItem.id] || {
    submitted: false,
    fileCount: 0,
    files: [],
    qualityScore: 3,
    qualityTier: 'Satisfactory',
    findings: [],
    risks: [],
    auditorNotes: ''
  };

  const pillar = QUALITY_PILLARS.find(p => p.id === activeItem.pillarId);

  // Update audit state for this folder
  const handleScoreChange = (score) => {
    const tierMap = {
      1: 'Non-Compliant',
      2: 'Needs Improvement',
      3: 'Satisfactory',
      4: 'Commendable',
      5: 'Exemplary'
    };

    const updatedAudits = {
      ...course.folderAudits,
      [activeItem.id]: {
        ...audit,
        qualityScore: score,
        qualityTier: tierMap[score]
      }
    };

    onUpdateCourse({ ...course, folderAudits: updatedAudits });
  };

  const handleAuditorNotesChange = (notes) => {
    const updatedAudits = {
      ...course.folderAudits,
      [activeItem.id]: {
        ...audit,
        auditorNotes: notes
      }
    };
    onUpdateCourse({ ...course, folderAudits: updatedAudits });
  };

  const handleAddFinding = () => {
    const newFinding = prompt('Enter quality finding or commendable practice:');
    if (!newFinding) return;

    const updatedFindings = [...(audit.findings || []), newFinding];
    const updatedAudits = {
      ...course.folderAudits,
      [activeItem.id]: {
        ...audit,
        findings: updatedFindings
      }
    };
    onUpdateCourse({ ...course, folderAudits: updatedAudits });
  };

  const handleRemoveFinding = (index) => {
    const updatedFindings = (audit.findings || []).filter((_, i) => i !== index);
    const updatedAudits = {
      ...course.folderAudits,
      [activeItem.id]: {
        ...audit,
        findings: updatedFindings
      }
    };
    onUpdateCourse({ ...course, folderAudits: updatedAudits });
  };

  const handleAddRisk = () => {
    const newRisk = prompt('Enter academic quality risk or deficiency:');
    if (!newRisk) return;

    const updatedRisks = [...(audit.risks || []), newRisk];
    const updatedAudits = {
      ...course.folderAudits,
      [activeItem.id]: {
        ...audit,
        risks: updatedRisks
      }
    };
    onUpdateCourse({ ...course, folderAudits: updatedAudits });
  };

  const handleRemoveRisk = (index) => {
    const updatedRisks = (audit.risks || []).filter((_, i) => i !== index);
    const updatedAudits = {
      ...course.folderAudits,
      [activeItem.id]: {
        ...audit,
        risks: updatedRisks
      }
    };
    onUpdateCourse({ ...course, folderAudits: updatedAudits });
  };

  const handleAddCustomFileLink = () => {
    const fileName = prompt('Enter document name (e.g. Approved_Syllabus.pdf or Studio_Brief.docx):');
    if (!fileName) return;

    const fileLink = prompt('Enter Google Drive or external link for this document:', course.driveFolderUrl || 'https://drive.google.com');
    if (!fileLink) return;

    const newFile = {
      name: fileName.trim(),
      size: 'Cloud Link',
      updated: new Date().toISOString().split('T')[0],
      driveLink: fileLink.trim()
    };

    const existingFiles = audit.files || [];
    const updatedFiles = [...existingFiles, newFile];

    const updatedAudits = {
      ...course.folderAudits,
      [activeItem.id]: {
        ...audit,
        files: updatedFiles,
        fileCount: updatedFiles.length,
        submitted: true
      }
    };

    onUpdateCourse({ ...course, folderAudits: updatedAudits });
  };

  const handleRemoveFile = (index) => {
    if (!window.confirm('Remove this document link from this folder?')) return;
    const existingFiles = audit.files || [];
    const updatedFiles = existingFiles.filter((_, i) => i !== index);

    const updatedAudits = {
      ...course.folderAudits,
      [activeItem.id]: {
        ...audit,
        files: updatedFiles,
        fileCount: updatedFiles.length,
        submitted: updatedFiles.length > 0
      }
    };

    onUpdateCourse({ ...course, folderAudits: updatedAudits });
  };

  const handleSaveNotification = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: '1.5rem', alignItems: 'flex-start' }} className="fade-in">
      
      {/* Left Sidebar: 13 Folders List */}
      <div className="card" style={{ padding: '0.85rem', position: 'sticky', top: '5rem', maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto' }}>
        <div style={{ padding: '0.5rem 0.5rem 0.85rem 0.5rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Teaching File Folders
          </h3>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            13 Standard Audit Categories
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {TEACHING_FILE_ITEMS.map(item => {
            const folderAudit = course.folderAudits?.[item.id] || { submitted: false, qualityScore: 1, fileCount: 0 };
            const isSelected = item.id === activeFolderId;
            const score = folderAudit.qualityScore || 1;

            return (
              <div
                key={item.id}
                onClick={() => setActiveFolderId(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  background: isSelected ? 'var(--primary-light)' : 'transparent',
                  border: isSelected ? '1px solid var(--primary-border)' : '1px solid transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflow: 'hidden' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: isSelected ? 'var(--primary)' : 'var(--text-muted)',
                    background: isSelected ? '#ffffff' : 'var(--surface-muted)',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '4px'
                  }}>
                    {item.id}
                  </span>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{
                      fontSize: '0.84rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {folderAudit.fileCount || 0} file(s)
                    </div>
                  </div>
                </div>

                <span className={`badge ${score >= 4 ? 'badge-success' : (score === 3 ? 'badge-warning' : 'badge-danger')}`} style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                  {score}/5
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Active Folder Detailed Audit View */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Folder Header Card */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-primary">
                  {activeItem.code}
                </span>
                {pillar && (
                  <span className="badge" style={{ background: `${pillar.color}15`, color: pillar.color, border: `1px solid ${pillar.color}30` }}>
                    Mapped Pillar: {pillar.name}
                  </span>
                )}
                <span className={`badge ${audit.submitted ? 'badge-success' : 'badge-danger'}`}>
                  {audit.submitted ? 'Folder Submitted' : 'Missing Submission'}
                </span>
              </div>

              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {activeItem.title}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Google Drive Directory: <code className="mono">{activeItem.driveFolderName}</code>
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.6rem' }}>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => onOpenAIReview && onOpenAIReview(activeItem)}
                style={{
                  background: isAuditor ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  borderColor: 'transparent',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
              >
                <Sparkles size={14} />
                <span>{isAuditor ? '🤖 Review Folder with My AI' : '🤖 AI Self-Check Guidance'}</span>
              </button>

              {/* Quality Score Selector Widget */}
              <div style={{
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '0.65rem 0.95rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.35rem'
              }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {isAuditor ? 'Auditor Score (1-5)' : 'Self-Rating (1-5)'}
                </span>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {[1, 2, 3, 4, 5].map(star => {
                    const isCurrent = audit.qualityScore === star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleScoreChange(star)}
                        className="score-pill"
                        style={{
                          background: isCurrent ? 'var(--primary)' : '#ffffff',
                          color: isCurrent ? '#ffffff' : 'var(--text-muted)',
                          border: isCurrent ? '1px solid var(--primary)' : '1px solid var(--border)',
                          boxShadow: isCurrent ? '0 2px 6px rgba(37,99,235,0.3)' : 'none',
                          cursor: 'pointer'
                        }}
                        title={`Rate as ${star} / 5`}
                      >
                        {star}
                      </button>
                    );
                  })}
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {audit.qualityTier || 'Satisfactory'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Quality & Pedagogical Criteria */}
        <div className="card" style={{ background: '#f8fafc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Award size={18} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Quality & Pedagogical Audit Benchmarks
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {activeItem.qualityAuditCriteria.map((c, idx) => (
              <div key={idx} style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)' }}>
                  {idx + 1}. {c.criterion}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {c.description}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--primary)', marginTop: '0.35rem', fontWeight: 600 }}>
                  <strong>Accreditation Benchmark:</strong> {c.benchmark}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uploaded Documents List */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Documents in this Folder ({audit.files?.length || 0})
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Verified files & direct cloud links available for audit scrutiny.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleAddCustomFileLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                background: '#f0fdf4',
                borderColor: '#86efac',
                color: '#166534'
              }}
              title="Add a document link (Google Drive, Doc, PDF) to this folder"
            >
              <Link2 size={14} style={{ color: '#16a34a' }} />
              <span>+ Add Document Link</span>
            </button>
          </div>

          {audit.files?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {audit.files.map((file, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    background: 'var(--surface-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <FileText size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        {file.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Size: {file.size} • Last Modified: {file.updated || '2026-11-04'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <a
                      href={file.driveLink || course.driveFolderUrl || 'https://drive.google.com'}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
                    >
                      <ExternalLink size={13} />
                      <span>View File</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(idx)}
                      className="btn-ghost"
                      style={{ color: '#991b1b', padding: '0.35rem' }}
                      title="Delete file link"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              background: 'var(--danger-bg)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--danger-border)',
              color: '#991b1b'
            }}>
              <AlertTriangle size={28} style={{ margin: '0 auto 0.5rem auto', color: 'var(--danger)' }} />
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                No Documents Submitted in this Folder
              </div>
              <p style={{ fontSize: '0.82rem', marginTop: '0.25rem' }}>
                This is a required teaching file item. Please request the lecturer to upload relevant files.
              </p>
            </div>
          )}
        </div>

        {/* Quality Findings & Strengths */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {isAuditor ? 'Auditor Quality Findings & Strengths' : 'Identified Strengths & Good Practices'}
              </h3>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleAddFinding}
            >
              <Plus size={13} /> {isAuditor ? 'Add Finding' : 'Add Strength'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {(audit.findings || []).map((finding, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  background: 'var(--success-bg)',
                  border: '1px solid var(--success-border)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{ fontSize: '0.84rem', color: '#065f46', lineHeight: 1.4 }}>
                  • {finding}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFinding(idx)}
                  className="btn-ghost"
                  style={{ color: '#991b1b', padding: '0.1rem' }}
                  title="Remove finding"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Quality Risks / Deficiencies */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={18} style={{ color: 'var(--warning)' }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {isAuditor ? 'Academic Quality Risks & Flags' : 'Identified Gaps to Address Before Submission'} ({audit.risks?.length || 0})
              </h3>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleAddRisk}
            >
              <Plus size={13} /> {isAuditor ? 'Add Risk Flag' : 'Add Missing Item'}
            </button>
          </div>

          {audit.risks?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {audit.risks.map((risk, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    background: 'var(--warning-bg)',
                    border: '1px solid var(--warning-border)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div style={{ fontSize: '0.84rem', color: '#92400e', lineHeight: 1.4 }}>
                    ⚠️ {risk}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveRisk(idx)}
                    className="btn-ghost"
                    style={{ color: '#991b1b', padding: '0.1rem' }}
                    title="Remove risk flag"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              No critical quality risks or deficiencies flagged for this folder.
            </p>
          )}
        </div>

        {/* Auditor / Lecturer Remarks & Recommendations Editor */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {isAuditor ? 'Internal Auditor Feedback & Formal Remarks' : 'Lecturer Self-Review Notes & Remediation Plan'}
            </h3>
            {savedNotification && (
              <span className="badge badge-success fade-in">
                <Check size={12} /> Notes Saved!
              </span>
            )}
          </div>

          <textarea
            rows={4}
            value={audit.auditorNotes || ''}
            onChange={(e) => handleAuditorNotesChange(e.target.value)}
            onBlur={handleSaveNotification}
            placeholder={isAuditor
              ? "Type your qualitative auditor remarks, feed-forward critique, and constructive recommendations here..."
              : "Type your self-assessment notes, reflection on student attainment, and items you plan to fix before HOD submission..."}
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              fontSize: '0.88rem',
              color: 'var(--text-main)',
              lineHeight: 1.5,
              outline: 'none',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.6rem' }}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleSaveNotification}
            >
              <Save size={13} /> Save Remarks
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
