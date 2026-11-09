import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ExternalLink, 
  User, 
  Calendar, 
  BookOpen, 
  FolderCheck,
  TrendingUp,
  FileText,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Building,
  GraduationCap,
  FileCode
} from 'lucide-react';
import { QUALITY_PILLARS, TEACHING_FILE_ITEMS } from '../data/auditRubrics';
import { calculateAuditMetrics, generateExecutiveSummary } from '../services/auditEngine';

export default function DashboardOverview({
  course,
  userRole = 'auditor',
  onToggleUserRole,
  onNavigateTab,
  onOpenReport,
  onSelectFolder,
  onOpenEditCourse,
  onOpenAIReview,
  onOpenAISettings,
  onOpenExportHtml
}) {
  if (!course) return null;

  const isAuditor = userRole === 'auditor';
  const metrics = calculateAuditMetrics(course);
  const summaryText = generateExecutiveSummary(course, metrics);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="fade-in">
      
      {/* Course Header Banner */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: '#ffffff',
        border: 'none',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative glow */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem', position: 'relative' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#93c5fd', border: '1px solid rgba(255,255,255,0.2)' }}>
                {course.semester}
              </span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.15)' }}>
                {course.creditHours} Credits ({(course.creditHours || 3) * 40}h SLT)
              </span>
              <button
                type="button"
                onClick={onOpenEditCourse}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  background: 'rgba(255,255,255,0.12)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '999px',
                  padding: '0.2rem 0.6rem',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                title="Edit Course, Lecturer, and Auditor names"
              >
                <User size={12} style={{ color: '#60a5fa' }} />
                <span>Change Names / Settings</span>
              </button>
            </div>

            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
              {course.code}: {course.name}
            </h1>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              {course.program}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <span 
                onClick={onOpenEditCourse}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', background: 'rgba(255,255,255,0.08)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-sm)' }}
                title="Click to edit Lecturer Name"
              >
                <User size={15} style={{ color: '#60a5fa' }} />
                <strong>Lecturer:</strong> <span style={{ textDecoration: 'underline dotted', textUnderlineOffset: '3px' }}>{course.lecturer}</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={15} style={{ color: '#60a5fa' }} />
                <strong>Audit Date:</strong> {course.auditDate || '2026-11-09'}
              </span>
              <span 
                onClick={onOpenEditCourse}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', background: 'rgba(255,255,255,0.08)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-sm)' }}
                title="Click to edit Auditor Name"
              >
                <Award size={15} style={{ color: '#fcd34d' }} />
                <strong>Auditor:</strong> <span style={{ textDecoration: 'underline dotted', textUnderlineOffset: '3px' }}>{course.auditorName || 'Internal Quality Auditor'}</span>
              </span>
              <span 
                onClick={onOpenEditCourse}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', background: 'rgba(255,255,255,0.08)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-sm)' }}
                title="Click to edit Head of Department Name"
              >
                <Building size={15} style={{ color: '#c084fc' }} />
                <strong>HOD:</strong> <span style={{ textDecoration: 'underline dotted', textUnderlineOffset: '3px' }}>{course.headOfDepartment || 'Prof. Ar. Dr. Norwina Mohd Nawawi'}</span>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.6rem' }}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onOpenAIReview && onOpenAIReview(course.folders?.[0] || { id: '01', title: 'Course Information & Approved Syllabus' })}
              style={{
                background: isAuditor ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                borderColor: 'transparent',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              <Sparkles size={14} />
              <span>{isAuditor ? '🤖 AI Quality Scrutiny' : '🤖 AI Pre-Audit Health Check'}</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onOpenEditCourse}
              style={{ background: 'rgba(255,255,255,0.18)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              <User size={14} />
              <span>Edit Auditor & Lecturer</span>
            </button>
            {course.driveFolderUrl && (
              <a
                href={course.driveFolderUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)' }}
              >
                <ExternalLink size={14} />
                <span>Open in Google Drive</span>
              </a>
            )}
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onOpenReport}
              style={{ background: 'rgba(255,255,255,0.15)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)' }}
            >
              <FileText size={14} />
              <span>{isAuditor ? 'Generate Audit Report' : 'Preview Self-Check Report'}</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onOpenExportHtml}
              style={{ background: 'rgba(59,130,246,0.25)', color: '#ffffff', borderColor: 'rgba(147,197,253,0.4)', fontWeight: 700 }}
              title="Save all 13 folders, links, and audit report in a single standalone .html file"
            >
              <FileCode size={14} />
              <span>Save Single HTML</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role Context & Guidance Banner */}
      <div style={{
        background: isAuditor ? 'linear-gradient(90deg, #eff6ff 0%, #f8fafc 100%)' : 'linear-gradient(90deg, #ecfdf5 0%, #f8fafc 100%)',
        border: `1px solid ${isAuditor ? '#bfdbfe' : '#a7f3d0'}`,
        borderLeft: `5px solid ${isAuditor ? '#2563eb' : '#059669'}`,
        borderRadius: 'var(--radius-md)',
        padding: '1rem 1.35rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: isAuditor ? '#dbeafe' : '#d1fae5',
            color: isAuditor ? '#1e40af' : '#065f46',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {isAuditor ? <ShieldCheck size={20} /> : <GraduationCap size={20} />}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.92rem', fontWeight: 800, color: isAuditor ? '#1e3a8a' : '#065f46' }}>
                {isAuditor ? 'Active Perspective: Internal Quality Auditor' : 'Active Perspective: Course Lecturer Self-Check'}
              </span>
              <span className={`badge ${isAuditor ? 'badge-primary' : 'badge-success'}`} style={{ fontSize: '0.66rem' }}>
                {isAuditor ? 'Compliance & Scrutiny' : 'Pre-Audit Coaching'}
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0.2rem 0 0 0' }}>
              {isAuditor
                ? 'Reviewing teaching file for accreditation rigor. Verify constructive alignment, evaluate marking objectivity, and flag non-conformance risks.'
                : 'Conducting pre-submission self-assessment. Identify missing files, refine rubric descriptors, and verify continuous quality improvement (CQI).'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onToggleUserRole(isAuditor ? 'lecturer' : 'auditor')}
            style={{ fontSize: '0.78rem' }}
          >
            Switch to {isAuditor ? 'Lecturer Self-Check' : 'Auditor Mode'}
          </button>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        
        {/* KPI 1: Overall Quality Index */}
        <div className="card" style={{ borderLeft: `5px solid ${metrics.qualityTier.color}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Teaching Quality Index
            </span>
            <span className="badge" style={{ background: `${metrics.qualityTier.color}20`, color: metrics.qualityTier.color, border: `1px solid ${metrics.qualityTier.color}40` }}>
              {metrics.qualityTier.label}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>
              {metrics.overallQualityIndex}%
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              weighted average
            </span>
          </div>

          <div style={{ marginTop: '0.75rem', width: '100%', height: '8px', background: 'var(--surface-muted)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              width: `${metrics.overallQualityIndex}%`,
              height: '100%',
              background: metrics.qualityTier.color,
              borderRadius: '999px',
              transition: 'width 0.5s ease'
            }} />
          </div>

          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            {metrics.qualityTier.summary}
          </p>
        </div>

        {/* KPI 2: Submission Compliance */}
        <div className="card" style={{ borderLeft: '5px solid var(--primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Submission Compliance
            </span>
            <span className="badge badge-primary">
              {metrics.submittedFolderCount} / {metrics.totalFolderCount} Folders
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>
              {metrics.complianceRate}%
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              checklist items
            </span>
          </div>

          <div style={{ marginTop: '0.75rem', width: '100%', height: '8px', background: 'var(--surface-muted)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              width: `${metrics.complianceRate}%`,
              height: '100%',
              background: 'var(--primary)',
              borderRadius: '999px',
              transition: 'width 0.5s ease'
            }} />
          </div>

          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            {metrics.complianceRate === 100 ? 'All 13 mandatory teaching file folders uploaded.' : `${13 - metrics.submittedFolderCount} folder(s) pending submission.`}
          </p>
        </div>

        {/* KPI 3: Quality Risks / Flags */}
        <div className="card" style={{ borderLeft: `5px solid ${metrics.criticalRisksCount > 0 ? 'var(--warning)' : 'var(--success)'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Academic Quality Risks
            </span>
            <span className={`badge ${metrics.criticalRisksCount > 0 ? 'badge-warning' : 'badge-success'}`}>
              {metrics.criticalRisksCount > 0 ? 'Attention Needed' : 'Good Stance'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: metrics.criticalRisksCount > 0 ? 'var(--warning)' : 'var(--success)', lineHeight: 1 }}>
              {metrics.criticalRisksCount}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              flags detected
            </span>
          </div>

          <div style={{ marginTop: '0.75rem' }}>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              {metrics.criticalRisksCount > 0 
                ? 'Constructive alignment, feedback depth, or moderation issues require review.'
                : 'No critical pedagogical anomalies detected.'}
            </p>
          </div>
        </div>

        {/* KPI 4: Corrective Actions (CAR) */}
        <div className="card" style={{ borderLeft: '5px solid #8b5cf6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Action Plan / CARs
            </span>
            <span className="badge badge-neutral">
              {course.correctiveActions?.length || 0} Total Actions
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#8b5cf6', lineHeight: 1 }}>
              {metrics.activeCarsCount}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              open actions
            </span>
          </div>

          <div style={{ marginTop: '0.75rem' }}>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              Continual improvement recommendations logged for lecturer follow-up.
            </p>
          </div>
        </div>

      </div>

      {/* Submission vs. Quality Assessment Deep Comparison */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)',
        border: '1px solid #bbf7d0',
        padding: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <Sparkles size={20} style={{ color: '#16a34a' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#14532d' }}>
            Internal Auditor Quality Insight: Going Beyond The Checklist
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
          <div style={{ background: '#ffffff', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <FolderCheck size={16} style={{ color: '#2563eb' }} />
              Traditional Checklist (Submission Check)
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '0.4rem' }}>
              {metrics.complianceRate}% Submission Rate
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              Verifies if folder slots (01 to 13) contain PDF files. Passing this only proves bureaucratic completeness, not educational quality.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid #bbf7d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#15803d', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <Award size={16} style={{ color: '#16a34a' }} />
              EduAudit Quality Check (Teaching & Learning Rigor)
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: metrics.qualityTier.color, marginTop: '0.4rem' }}>
              {metrics.overallQualityIndex}% Quality Score ({metrics.qualityTier.label})
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              Evaluates whether assessment questions test promised Bloom levels, whether student scripts receive rich formative feedback, and whether CQI genuinely closes the loop.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.7)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.05)', fontSize: '0.85rem', color: '#334155' }}>
          <strong>Executive Auditor Verdict:</strong> {summaryText}
        </div>
      </div>

      {/* The 6 Quality Pillars Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              The 6 Core Teaching Quality Pillars
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Accreditation-grade outcome evaluation across the pedagogical life-cycle.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigateTab('pillars')}
          >
            <span>Explore All Criteria</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {QUALITY_PILLARS.map(pillar => {
            const score = metrics.pillarScores[pillar.id] || 0;
            const isGood = score >= 75;
            const isWarning = score >= 55 && score < 75;

            return (
              <div key={pillar.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        background: `${pillar.color}15`,
                        color: pillar.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.85rem'
                      }}>
                        {pillar.code}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {pillar.name}
                        </h3>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          Weight: {pillar.weight}% of Total Audit
                        </span>
                      </div>
                    </div>

                    <span style={{
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      color: isGood ? 'var(--success)' : (isWarning ? 'var(--warning)' : 'var(--danger)')
                    }}>
                      {score}%
                    </span>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '0.85rem' }}>
                    {pillar.description}
                  </p>

                  <div style={{ width: '100%', height: '6px', background: 'var(--surface-muted)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${score}%`,
                      height: '100%',
                      background: pillar.color,
                      borderRadius: '999px'
                    }} />
                  </div>
                </div>

                <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Benchmark: &ge; 75%
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('pillars')}
                    style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    View Details <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Access to the 13 Folders */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Teaching File Folders Status (01 to 13)
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Click any folder below to inspect uploaded documents, quality scores, and auditor remarks.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigateTab('folders')}
          >
            <span>Open Folder Explorer</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.85rem' }}>
          {TEACHING_FILE_ITEMS.map(item => {
            const audit = course.folderAudits?.[item.id] || { submitted: false, qualityScore: 1, files: [] };
            const isSubmitted = audit.submitted && audit.fileCount > 0;
            const score = audit.qualityScore || 1;

            return (
              <div
                key={item.id}
                onClick={() => {
                  onSelectFolder(item.id);
                  onNavigateTab('folders');
                }}
                className="card"
                style={{
                  padding: '1rem',
                  cursor: 'pointer',
                  borderLeft: `4px solid ${isSubmitted ? (score >= 4 ? 'var(--success)' : 'var(--warning)') : 'var(--danger)'}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: isSubmitted ? '#ffffff' : '#fff5f5'
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--primary)', background: 'var(--primary-light)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                      {item.code}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {audit.fileCount || 0} file(s)
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </h4>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span className={`badge ${score >= 4 ? 'badge-success' : (score === 3 ? 'badge-warning' : 'badge-danger')}`} style={{ fontSize: '0.74rem' }}>
                    {score} / 5
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
