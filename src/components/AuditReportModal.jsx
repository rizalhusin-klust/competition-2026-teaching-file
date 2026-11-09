import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  FileText,
  ShieldCheck,
  Calendar,
  User,
  Building,
  FileCode,
  Target,
  CheckSquare,
  Edit3,
  TrendingUp,
  BookOpen,
  Users
} from 'lucide-react';
import { TEACHING_FILE_ITEMS, QUALITY_PILLARS } from '../data/auditRubrics';
import { calculateAuditMetrics, generateExecutiveSummary } from '../services/auditEngine';
import klustLogo from '../assets/klust-logo.jpg';

export default function AuditReportModal({ isOpen, onClose, course, userRole = 'auditor', aiConfig, onOpenExportHtml }) {
  if (!isOpen || !course) return null;

  const isAuditor = userRole === 'auditor';
  const metrics = calculateAuditMetrics(course);
  const summaryText = generateExecutiveSummary(course, metrics);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content fade-in" style={{ maxWidth: '960px', maxHeight: '92vh' }}>
        
        {/* Header - Not printed */}
        <div className="modal-header no-print">
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={22} style={{ color: 'var(--primary)' }} />
              {isAuditor ? 'Formal Teaching & Learning Quality Audit Report' : 'Lecturer Pre-Audit Readiness & Self-Check Report'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {isAuditor
                ? 'Accreditation-compliant internal audit documentation ready for print and faculty submission.'
                : 'Self-assessment and pre-flight quality documentation ready for review before HOD submission.'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {onOpenExportHtml && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={onOpenExportHtml}
                title="Save all 13 folders, links, and reports into a single standalone .html file"
              >
                <FileCode size={15} style={{ color: 'var(--primary)' }} /> Save Single HTML
              </button>
            )}
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handlePrint}
            >
              <Printer size={15} /> Print / Save as PDF
            </button>
            <button type="button" onClick={onClose} className="btn-ghost" style={{ padding: '0.35rem' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Formal Report Content - Formatted for both screen and print */}
        <div className="modal-body" style={{ padding: '2rem' }}>
          
          {/* Official Institutional Header with Official KLUST Landscape Logo */}
          <div className="report-letterhead-header" style={{
            borderBottom: '3px double #0f172a',
            paddingBottom: '1.25rem',
            marginBottom: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}>
            <div style={{ flexShrink: 0 }}>
              <img
                src={klustLogo}
                alt="Kuala Lumpur University of Science and Technology"
                style={{
                  height: '62px',
                  width: 'auto',
                  maxWidth: '300px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
            <div style={{ textAlign: 'right', flex: 1 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.12em', color: 'var(--primary)', textTransform: 'uppercase' }}>
                FABE+ADQAD
              </div>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0 0.15rem 0', letterSpacing: '-0.01em' }}>
                {isAuditor ? 'TEACHING & LEARNING QUALITY AUDIT REPORT' : 'TEACHING & LEARNING PRE-AUDIT READINESS REPORT'}
              </h1>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {isAuditor 
                  ? 'Outcome-Based Education (OBE) Course Teaching Portfolio Assessment • Session 2026/2027' 
                  : 'Course Portfolio Self-Check & Pedagogical Readiness Assessment • Session 2026/2027'}
              </div>
            </div>
          </div>

          {/* Section 1: Course & Audit Metadata */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            background: 'var(--surface-subtle)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            marginBottom: '1.5rem',
            fontSize: '0.88rem'
          }}>
            <div>
              <div><strong>Course Code & Title:</strong> {course.code} - {course.name}</div>
              <div style={{ marginTop: '0.35rem' }}><strong>Academic Programme:</strong> {course.program}</div>
              <div style={{ marginTop: '0.35rem' }}><strong>Credit Hours:</strong> {course.creditHours} Credits ({(course.creditHours || 3) * 40}h SLT)</div>
              <div style={{ marginTop: '0.35rem' }}><strong>Report Type:</strong> <span className={`badge ${isAuditor ? 'badge-primary' : 'badge-success'}`} style={{ fontSize: '0.72rem', verticalAlign: 'middle' }}>{isAuditor ? 'Internal Quality Audit' : 'Lecturer Self-Check'}</span></div>
            </div>
            <div>
              <div><strong>Course Lecturer:</strong> {course.lecturer}</div>
              <div style={{ marginTop: '0.35rem' }}><strong>Head of Department:</strong> {course.headOfDepartment || 'Prof. Ar. Dr. Norwina Mohd Nawawi'}</div>
              <div style={{ marginTop: '0.35rem' }}><strong>Internal Quality Auditor:</strong> {course.auditorName || 'Chief Internal Auditor'}</div>
              <div style={{ marginTop: '0.35rem' }}><strong>Date of Review:</strong> {course.auditDate || '2026-11-09'}</div>
              <div style={{ marginTop: '0.35rem' }}><strong>AI Assistance:</strong> {aiConfig?.apiKey ? `${aiConfig.provider.toUpperCase()} (${aiConfig.model})` : 'EduAudit Heuristic OBE Engine'}</div>
            </div>
          </div>

          {/* Section 2: Executive Summary & Quality Verdict */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem', marginBottom: '0.85rem' }}>
              1. Executive Quality Verdict
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ border: `2px solid ${metrics.qualityTier?.color || '#059669'}`, borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Overall Quality Score</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: metrics.qualityTier?.color || '#059669' }}>{metrics.overallQualityIndex ?? 0}%</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: metrics.qualityTier?.color || '#059669' }}>{metrics.qualityTier?.label || 'Satisfactory'}</div>
              </div>

              <div style={{ border: '2px solid var(--primary)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Submission Compliance</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)' }}>{metrics.complianceRate ?? 0}%</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)' }}>{metrics.submittedFolderCount ?? metrics.submittedFolders ?? 0} of 13 Folders</div>
              </div>

              <div style={{ border: '2px solid #8b5cf6', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Audit Status</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#8b5cf6', marginTop: '0.75rem' }}>
                  {course.auditStatus || 'Approved with Minor CAR'}
                </div>
              </div>
            </div>

            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              <strong>Auditor Qualitative Synthesis:</strong> {summaryText}
            </div>
          </div>

          {/* Section 3: The 6 Quality Pillars Breakdown */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem', marginBottom: '0.85rem' }}>
              2. Core Quality Pillars Performance
            </h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ background: 'var(--surface-muted)', borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '0.65rem 0.75rem' }}>Pillar</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>Core Pedagogical Dimension</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>Weight</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>Score</th>
                  <th style={{ padding: '0.65rem 0.75rem' }}>Attainment Tier</th>
                </tr>
              </thead>
              <tbody>
                {QUALITY_PILLARS.map(p => {
                  const score = metrics.pillarScores[p.id] || 0;
                  
                  const renderIcon = (id) => {
                    switch (id) {
                      case 'alignment': return <Target size={14} style={{ color: p.color }} />;
                      case 'assessment': return <CheckSquare size={14} style={{ color: p.color }} />;
                      case 'marking': return <Edit3 size={14} style={{ color: p.color }} />;
                      case 'cqi': return <TrendingUp size={14} style={{ color: p.color }} />;
                      case 'curriculum': return <BookOpen size={14} style={{ color: p.color }} />;
                      case 'governance': return <Users size={14} style={{ color: p.color }} />;
                      default: return <Award size={14} style={{ color: p.color }} />;
                    }
                  };

                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '0.65rem 0.75rem', fontWeight: 700, color: 'var(--primary)' }}>{p.code}</td>
                      <td style={{ padding: '0.65rem 0.75rem', fontWeight: 600 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                          {renderIcon(p.id)}
                          <span>{p.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>{p.weight}%</td>
                      <td style={{ padding: '0.65rem 0.75rem', fontWeight: 800, color: p.color }}>{score}%</td>
                      <td style={{ padding: '0.65rem 0.75rem' }}>
                        <span className={`badge ${score >= 75 ? 'badge-success' : (score >= 60 ? 'badge-warning' : 'badge-danger')}`}>
                          {score >= 75 ? 'Commended' : (score >= 60 ? 'Satisfactory' : 'Needs Action')}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Section 4: 13-Folder Detailed Findings */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem', marginBottom: '0.85rem' }}>
              3. Teaching File Portfolio Audit Breakdown (Folders 01 to 13)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {TEACHING_FILE_ITEMS.map(item => {
                const audit = course.folderAudits?.[item.id] || { submitted: false, qualityScore: 1, files: [] };
                const score = audit.qualityScore || 1;

                return (
                  <div key={item.id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', background: '#ffffff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)' }}>
                        {item.code}: {item.title}
                      </div>
                      <span className={`badge ${score >= 4 ? 'badge-success' : (score === 3 ? 'badge-warning' : 'badge-danger')}`} style={{ fontSize: '0.72rem' }}>
                        Score: {score} / 5 ({audit.qualityTier || 'Satisfactory'})
                      </span>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Files ({audit.fileCount || 0}): {audit.files?.map(f => f.name).join(', ') || 'No documents uploaded'}
                    </div>

                    {audit.findings?.length > 0 && (
                      <div style={{ fontSize: '0.78rem', color: '#065f46', marginTop: '0.35rem' }}>
                        <strong>Strengths:</strong> {audit.findings.join(' • ')}
                      </div>
                    )}

                    {audit.risks?.length > 0 && (
                      <div style={{ fontSize: '0.78rem', color: '#991b1b', marginTop: '0.25rem' }}>
                        <strong>Quality Risks:</strong> {audit.risks.join(' • ')}
                      </div>
                    )}

                    {audit.auditorNotes && (
                      <div style={{ fontSize: '0.78rem', color: '#1e3a8a', marginTop: '0.25rem', fontStyle: 'italic' }}>
                        <strong>Auditor Remarks:</strong> "{audit.auditorNotes}"
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 5: Corrective Action Requests (CAR) */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem', marginBottom: '0.85rem' }}>
              4. Corrective Action Requests (CAR) & Continual Improvement Tracker
            </h3>

            {course.correctiveActions?.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: 'var(--surface-muted)', borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '0.5rem' }}>CAR ID</th>
                    <th style={{ padding: '0.5rem' }}>Severity Category</th>
                    <th style={{ padding: '0.5rem' }}>Required Pedagogical Action</th>
                    <th style={{ padding: '0.5rem' }}>Person Responsible</th>
                    <th style={{ padding: '0.5rem' }}>Target Date</th>
                    <th style={{ padding: '0.5rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {course.correctiveActions.map((car, idx) => (
                    <tr key={car.id || idx} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '0.5rem', fontWeight: 700, color: 'var(--primary)' }}>{car.id}</td>
                      <td style={{ padding: '0.5rem' }}>
                        <span className={`badge ${car.category.includes('Critical') ? 'badge-danger' : (car.category.includes('Minor') ? 'badge-warning' : 'badge-primary')}`}>
                          {car.category}
                        </span>
                      </td>
                      <td style={{ padding: '0.5rem', lineHeight: 1.3 }}>{car.description}</td>
                      <td style={{ padding: '0.5rem', fontWeight: 600 }}>{car.assignedTo}</td>
                      <td style={{ padding: '0.5rem' }}>{car.deadline}</td>
                      <td style={{ padding: '0.5rem' }}>
                        <span className={`badge ${car.status === 'Closed' ? 'badge-success' : 'badge-warning'}`}>
                          {car.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                No active Corrective Action Requests logged. Course portfolio fulfills all quality benchmarks.
              </p>
            )}
          </div>

          {/* Section 6: Official Sign-Off Block */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            paddingTop: '2rem',
            borderTop: '2px solid var(--border)',
            pageBreakInside: 'avoid'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Audited By (Internal Auditor)
              </div>
              <div style={{ height: '40px', borderBottom: '1px solid #94a3b8', margin: '0.5rem 0' }}></div>
              <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{course.auditorName || 'Lead Internal Quality Auditor'}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Faculty Quality Committee</div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Acknowledged By (Course Lecturer)
              </div>
              <div style={{ height: '40px', borderBottom: '1px solid #94a3b8', margin: '0.5rem 0' }}></div>
              <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{course.lecturer}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Course Coordinator</div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Endorsed By (Dean / Head of Department)
              </div>
              <div style={{ height: '40px', borderBottom: '1px solid #94a3b8', margin: '0.5rem 0' }}></div>
              <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{course.headOfDepartment || 'Prof. Ar. Dr. Norwina Mohd Nawawi'}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Head of Department / Dean</div>
            </div>
          </div>

        </div>

        {/* Modal Footer - Not printed */}
        <div className="modal-footer no-print">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Close Preview
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={handlePrint}>
            <Printer size={15} /> Print / Save as PDF
          </button>
        </div>

      </div>
    </div>
  );
}
