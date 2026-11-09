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
  Link2,
  FolderPlus,
  UploadCloud,
  FileUp,
  FolderCheck
} from 'lucide-react';
import { TEACHING_FILE_ITEMS, QUALITY_PILLARS } from '../data/auditRubrics';

export default function FolderExplorerView({
  course,
  onUpdateCourse,
  initialFolderId = '00',
  userRole = 'auditor',
  onOpenAIReview
}) {
  const isAuditor = userRole === 'auditor';
  const [activeFolderId, setActiveFolderId] = useState(initialFolderId);
  const [savedNotification, setSavedNotification] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [createdFolderNotification, setCreatedFolderNotification] = useState(null);
  const fileInputRef = React.useRef(null);

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

  // Handle multiple files selected or dropped into active folder
  const handleFilesSelected = (filesList) => {
    if (!filesList || filesList.length === 0) return;

    const newFiles = Array.from(filesList).map(f => {
      // Format file size
      let sizeStr = `${(f.size / 1024).toFixed(1)} KB`;
      if (f.size > 1024 * 1024) {
        sizeStr = `${(f.size / (1024 * 1024)).toFixed(1)} MB`;
      }

      return {
        name: f.name,
        size: sizeStr,
        updated: new Date().toISOString().split('T')[0],
        driveLink: course.driveFolderUrl || 'https://drive.google.com'
      };
    });

    const existingFiles = audit.files || [];
    const updatedFiles = [...existingFiles, ...newFiles];

    // Auto-update quality score if folder was previously empty
    let newScore = audit.qualityScore;
    let newTier = audit.qualityTier;
    if (!audit.submitted || audit.qualityScore <= 1) {
      newScore = 4;
      newTier = 'Commendable';
    }

    const updatedAudits = {
      ...course.folderAudits,
      [activeItem.id]: {
        ...audit,
        files: updatedFiles,
        fileCount: updatedFiles.length,
        submitted: true,
        qualityScore: newScore,
        qualityTier: newTier,
        findings: audit.findings?.length > 0 
          ? audit.findings 
          : [`Document ${newFiles[0].name} uploaded and verified for ${activeItem.title}.`]
      }
    };

    onUpdateCourse({ ...course, folderAudits: updatedAudits });
    setCreatedFolderNotification(`Added ${newFiles.length} file(s) to ${activeItem.title}!`);
    setTimeout(() => setCreatedFolderNotification(null), 3000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer && e.dataTransfer.files) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

  // One-click create/initialize all 14 standard Teaching File Folders (00 to 13)
  const handleInitializeAll14Folders = () => {
    const updatedAudits = { ...(course.folderAudits || {}) };
    let initializedCount = 0;

    TEACHING_FILE_ITEMS.forEach(item => {
      if (!updatedAudits[item.id]) {
        updatedAudits[item.id] = {
          submitted: false,
          fileCount: 0,
          files: [],
          qualityScore: 1,
          qualityTier: 'Non-Compliant',
          findings: [],
          risks: [`Mandatory folder structure created; awaiting document upload.`],
          auditorNotes: 'Folder established. Please upload required documentation.'
        };
        initializedCount++;
      }
    });

    onUpdateCourse({ ...course, folderAudits: updatedAudits });
    setCreatedFolderNotification('Standard 14 Teaching File Folders (00 to 13) initialized in this course portfolio!');
    setTimeout(() => setCreatedFolderNotification(null), 3500);
  };

  const handleSaveNotification = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 320px) 1fr', gap: '1.5rem', alignItems: 'flex-start' }} className="fade-in">
      
      {/* Left Sidebar: 14 Folders List */}
      <div className="card" style={{ padding: '0.85rem', position: 'sticky', top: '5rem', maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto' }}>
        <div style={{ padding: '0.5rem 0.5rem 0.85rem 0.5rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              Teaching File Folders
            </h3>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={handleInitializeAll14Folders}
              style={{ padding: '0.2rem 0.45rem', fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700 }}
              title="Create/Ensure all 14 official standard teaching folders (00 to 13) are present"
            >
              <FolderPlus size={13} />
              <span>+ Create All 14</span>
            </button>
          </div>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
            14 Standard Accreditation Folders (00 to 13)
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {TEACHING_FILE_ITEMS.map(item => {
            const is100Coursework = Boolean(course.isCourseworkOnly || course.is100PercentCoursework);
            const isExamFolder = item.id === '09' || item.id === '10';
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
                  background: isSelected ? 'var(--primary-light)' : (is100Coursework && isExamFolder ? '#f8fafc' : 'transparent'),
                  border: isSelected ? '1px solid var(--primary-border)' : '1px solid transparent',
                  opacity: (is100Coursework && isExamFolder && !isSelected) ? 0.75 : 1,
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
                      {is100Coursework && isExamFolder ? (
                        <span style={{ color: '#059669', fontWeight: 700 }}>N/A • 100% Coursework</span>
                      ) : (item.id === '13' || item.isOptional) ? (
                        <span style={{ color: '#64748b' }}>{folderAudit.fileCount > 0 ? `${folderAudit.fileCount} file(s)` : 'Optional (As Needed)'}</span>
                      ) : (
                        `${folderAudit.fileCount || 0} file(s)`
                      )}
                    </div>
                  </div>
                </div>

                {is100Coursework && isExamFolder ? (
                  <span className="badge badge-success" style={{ fontSize: '0.66rem', padding: '0.12rem 0.35rem' }}>
                    Exempt
                  </span>
                ) : (item.id === '13' || item.isOptional) && !folderAudit.fileCount ? (
                  <span className="badge" style={{ fontSize: '0.66rem', padding: '0.12rem 0.35rem', background: '#f1f5f9', color: '#64748b' }}>
                    Optional
                  </span>
                ) : (
                  <span className={`badge ${score >= 4 ? 'badge-success' : (score === 3 ? 'badge-warning' : 'badge-danger')}`} style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                    {score}/5
                  </span>
                )}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                <span className="badge badge-primary">
                  {activeItem.code}
                </span>
                {pillar && (
                  <span className="badge" style={{ background: `${pillar.color}15`, color: pillar.color, border: `1px solid ${pillar.color}30` }}>
                    Mapped Pillar: {pillar.name}
                  </span>
                )}
                {Boolean(course.isCourseworkOnly || course.is100PercentCoursework) && (activeItem.id === '09' || activeItem.id === '10') ? (
                  <span className="badge badge-success" style={{ fontWeight: 800 }}>
                    Exempted: 100% Coursework Subject
                  </span>
                ) : (activeItem.id === '13' || activeItem.isOptional) ? (
                  <span className="badge" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', fontWeight: 700 }}>
                    {audit.submitted ? 'Optional Records Uploaded' : 'Optional (Not Mandatory)'}
                  </span>
                ) : (
                  <span className={`badge ${audit.submitted ? 'badge-success' : 'badge-danger'}`}>
                    {audit.submitted ? 'Folder Submitted' : 'Missing Submission'}
                  </span>
                )}
              </div>

              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {activeItem.title}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Google Drive Directory: <code className="mono">{activeItem.driveFolderName}</code>
              </p>
              
              {(activeItem.id === '13' || activeItem.isOptional) && (
                <div style={{
                  marginTop: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  color: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Info size={16} style={{ color: '#64748b', flexShrink: 0 }} />
                  <span>
                    <strong>Non-Mandatory Folder:</strong> 13 Miscellaneous Records is an as-needed folder for special cases (e.g. medical certificates, deferment letters, special makeup approval memos). If no special incidents occurred during the semester, it can be left empty without any compliance penalty.
                  </span>
                </div>
              )}

              {Boolean(course.isCourseworkOnly || course.is100PercentCoursework) && (activeItem.id === '09' || activeItem.id === '10') && (
                <div style={{
                  marginTop: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  color: '#166534',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <CheckCircle2 size={16} style={{ color: '#16a34a', flexShrink: 0 }} />
                  <span>
                    <strong>100% Coursework Exemption:</strong> This subject has no final examination. Moderated final exam papers and exam answer scripts are not required and do not penalize audit compliance or quality scores.
                  </span>
                </div>
              )}
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
          {/* Hidden direct file input */}
          <input
            type="file"
            ref={fileInputRef}
            multiple
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFilesSelected(e.target.files);
                e.target.value = null; // reset
              }
            }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.65rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Documents in this Folder ({audit.files?.length || 0})
                </h3>
                {createdFolderNotification && (
                  <span className="badge badge-success fade-in" style={{ fontSize: '0.75rem' }}>
                    <Check size={12} /> {createdFolderNotification}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                Upload files directly from your computer or link from Google Drive.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {/* Primary Direct File Upload Button */}
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  boxShadow: '0 2px 6px rgba(37,99,235,0.25)'
                }}
                title="Select and upload documents (PDF, DOCX, XLSX, PPTX, Images) directly into this folder"
              >
                <FileUp size={15} />
                <span>+ Upload Documents</span>
              </button>

              {/* Paste Document Link Button */}
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
                title="Add a direct Google Drive or cloud web link for this folder"
              >
                <Link2 size={14} style={{ color: '#16a34a' }} />
                <span>+ Add Cloud Link</span>
              </button>
            </div>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            style={{
              marginBottom: '1rem',
              padding: '1.25rem 1rem',
              textAlign: 'center',
              borderRadius: 'var(--radius-md)',
              border: `2px dashed ${isDragging ? '#2563eb' : '#cbd5e1'}`,
              background: isDragging ? '#eff6ff' : '#f8fafc',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="Click or drag files here to upload into this folder"
          >
            <UploadCloud size={28} style={{ color: isDragging ? '#2563eb' : '#64748b', margin: '0 auto 0.35rem auto' }} />
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: isDragging ? '#1d4ed8' : 'var(--text-main)' }}>
              Drag & drop files here, or <span style={{ color: 'var(--primary)', textDecoration: 'underline' }}>browse from computer</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Supports PDF, DOCX, XLSX, PPTX, JPG, PNG • Automatically updates verification status
            </div>
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
              padding: '1.5rem',
              textAlign: 'center',
              background: '#fef2f2',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed #fca5a5',
              color: '#991b1b'
            }}>
              <AlertTriangle size={24} style={{ margin: '0 auto 0.4rem auto', color: '#dc2626' }} />
              <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                No Documents in this Folder Yet
              </div>
              <p style={{ fontSize: '0.8rem', marginTop: '0.2rem', color: '#7f1d1d' }}>
                Drag and drop files into the box above, click "+ Upload Documents", or add a cloud link.
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
