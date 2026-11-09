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
  FileCode,
  Target,
  CheckSquare,
  Edit3,
  Users,
  PlusCircle
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
  onOpenExportHtml,
  onOpenUpload
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', position: 'relative' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#93c5fd', border: '1px solid rgba(255,255,255,0.2)' }}>
                {course.semester}
              </span>
              <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.15)' }}>
                {course.creditHours} Credits ({(course.creditHours || 3) * 40}h SLT)
              </span>
              {Boolean(course.isCourseworkOnly || course.is100PercentCoursework) && (
                <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.25)', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.4)', fontWeight: 800 }}>
                  ✓ 100% Coursework (Exam Exempt)
                </span>
              )}
            </div>

            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
              {course.code}: {course.name}
            </h1>
            <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              {course.program}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#cbd5e1' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={15} style={{ color: '#60a5fa' }} />
                <span style={{ color: '#94a3b8' }}>Lecturer:</span> <strong style={{ color: '#ffffff' }}>{course.lecturer}</strong>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={15} style={{ color: '#fcd34d' }} />
                <span style={{ color: '#94a3b8' }}>Auditor:</span> <strong style={{ color: '#ffffff' }}>{course.auditorName || 'Internal Quality Auditor'}</strong>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Building size={15} style={{ color: '#c084fc' }} />
                <span style={{ color: '#94a3b8' }}>HOD:</span> <strong style={{ color: '#ffffff' }}>{course.headOfDepartment || 'Prof. Ar. Dr. Norwina Mohd Nawawi'}</strong>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={15} style={{ color: '#94a3b8' }} />
                <span style={{ color: '#94a3b8' }}>Date:</span> <strong style={{ color: '#ffffff' }}>{course.auditDate || '2026-11-09'}</strong>
              </span>
            </div>
          </div>

          {/* Clean Primary Actions (No duplicate Edit buttons) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onOpenEditCourse}
              style={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)' }}
              title="Edit Course details, assigned Lecturer, Auditor, and HOD"
            >
              <User size={14} />
              <span>Edit Details</span>
            </button>

            {onOpenUpload && (
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={onOpenUpload}
                style={{
                  background: 'rgba(34,197,94,0.2)',
                  color: '#ffffff',
                  borderColor: 'rgba(74,222,128,0.4)',
                  fontWeight: 700
                }}
                title="Add and analyze a new course portfolio"
              >
                <PlusCircle size={14} style={{ color: '#86efac' }} />
                <span>+ Add New Course</span>
              </button>
            )}

            {course.driveFolderUrl && (
              <a
                href={course.driveFolderUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)' }}
                title="Open Course Repository in Google Drive"
              >
                <ExternalLink size={14} />
                <span>Google Drive</span>
              </a>
            )}

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onOpenAIReview && onOpenAIReview(course.folders?.[0] || { id: '01', title: 'Course Information & Approved Syllabus' })}
              style={{
                background: isAuditor ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                borderColor: 'transparent',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                fontWeight: 700
              }}
            >
              <Sparkles size={14} />
              <span>{isAuditor ? 'AI Quality Scrutiny' : 'AI Pre-Audit Check'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recommended 4-Step Pedagogical Audit Process Bar */}
      <div className="card" style={{ padding: '1rem 1.25rem', background: '#ffffff', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)' }}>
              Recommended Audit Workflow
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              • Complete each phase to achieve accreditation compliance
            </span>
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => onToggleUserRole(isAuditor ? 'lecturer' : 'auditor')}
            style={{ fontSize: '0.76rem', color: isAuditor ? '#2563eb' : '#059669', fontWeight: 700 }}
          >
            Active Mode: {isAuditor ? 'Auditor' : 'Lecturer'} (Switch)
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '0.75rem'
        }}>
          {/* Step 1: Upload & Verify Checklist */}
          <div 
            onClick={() => onNavigateTab('folders')}
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: `1px solid ${metrics.complianceRate === 100 ? '#bbf7d0' : '#bfdbfe'}`,
              background: metrics.complianceRate === 100 ? '#f0fdf4' : '#eff6ff',
              cursor: 'pointer',
              transition: 'transform 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: metrics.complianceRate === 100 ? '#15803d' : '#1d4ed8' }}>
                STEP 1 • EVIDENCE
              </span>
              <span className={`badge ${metrics.complianceRate === 100 ? 'badge-success' : 'badge-primary'}`} style={{ fontSize: '0.66rem' }}>
                {metrics.submittedFolderCount} / 13 Folders
              </span>
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a', marginTop: '0.3rem' }}>
              Folders 01 to 13
            </div>
            <p style={{ fontSize: '0.74rem', color: '#475569', margin: '0.2rem 0 0 0' }}>
              Upload and verify documents across all 13 checklist slots.
            </p>
          </div>

          {/* Step 2: Quality Pillars Evaluation */}
          <div 
            onClick={() => onNavigateTab('pillars')}
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: `1px solid ${metrics.overallQualityIndex >= 70 ? '#bbf7d0' : '#fed7aa'}`,
              background: metrics.overallQualityIndex >= 70 ? '#f0fdf4' : '#fffbeb',
              cursor: 'pointer',
              transition: 'transform 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: metrics.overallQualityIndex >= 70 ? '#15803d' : '#b45309' }}>
                STEP 2 • RIGOR
              </span>
              <span className="badge" style={{ fontSize: '0.66rem', background: `${metrics.qualityTier.color}20`, color: metrics.qualityTier.color }}>
                {metrics.overallQualityIndex}% Index
              </span>
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a', marginTop: '0.3rem' }}>
              The 6 Quality Pillars
            </div>
            <p style={{ fontSize: '0.74rem', color: '#475569', margin: '0.2rem 0 0 0' }}>
              Evaluate constructive alignment, feedback, and moderation.
            </p>
          </div>

          {/* Step 3: AI Quality Review */}
          <div 
            onClick={() => onOpenAIReview && onOpenAIReview(course.folders?.[0] || { id: '01', title: 'Course Information & Approved Syllabus' })}
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #e9d5ff',
              background: '#faf5ff',
              cursor: 'pointer',
              transition: 'transform 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#7e22ce' }}>
                STEP 3 • INTELLIGENCE
              </span>
              <Sparkles size={13} style={{ color: '#a855f7' }} />
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a', marginTop: '0.3rem' }}>
              AI Scrutiny & Coach
            </div>
            <p style={{ fontSize: '0.74rem', color: '#475569', margin: '0.2rem 0 0 0' }}>
              Run automated Bloom verb, rubric, and CQI gap analysis.
            </p>
          </div>

          {/* Step 4: Report & HTML Dossier Export */}
          <div 
            onClick={onOpenExportHtml}
            style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              cursor: 'pointer',
              transition: 'transform 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0f172a' }}>
                STEP 4 • ENDORSEMENT
              </span>
              <FileCode size={13} style={{ color: 'var(--primary)' }} />
            </div>
            <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0f172a', marginTop: '0.3rem' }}>
              Dossier & Report
            </div>
            <p style={{ fontSize: '0.74rem', color: '#475569', margin: '0.2rem 0 0 0' }}>
              Generate formal PDF report and save standalone HTML dossier.
            </p>
          </div>
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
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: metrics.qualityTier?.color || '#059669', marginTop: '0.4rem' }}>
              {metrics.overallQualityIndex ?? 0}% Quality Score ({metrics.qualityTier?.label || 'Satisfactory'})
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              Evaluates whether assessment questions test promised Bloom levels, whether student scripts receive rich formative feedback, and whether CQI genuinely closes the loop.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.7)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.05)', fontSize: '0.85rem', color: '#334155' }}>
          <strong>{isAuditor ? 'Executive Auditor Verdict:' : 'Executive Self-Check Verdict:'}</strong> {summaryText}
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

            // Render suitable icon for each of the 6 pillars
            const renderPillarIcon = (id, size = 18) => {
              switch (id) {
                case 'alignment': return <Target size={size} />;
                case 'assessment': return <CheckSquare size={size} />;
                case 'marking': return <Edit3 size={size} />;
                case 'cqi': return <TrendingUp size={size} />;
                case 'curriculum': return <BookOpen size={size} />;
                case 'governance': return <Users size={size} />;
                default: return <Award size={size} />;
              }
            };

            return (
              <div key={pillar.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: `${pillar.color}15`,
                        color: pillar.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        border: `1px solid ${pillar.color}30`
                      }}
                      title={`${pillar.code} - ${pillar.name}`}
                      >
                        {renderPillarIcon(pillar.id, 20)}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: pillar.color, background: `${pillar.color}12`, padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                            {pillar.code}
                          </span>
                          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                            Weight: {pillar.weight}%
                          </span>
                        </div>
                        <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                          {pillar.name}
                        </h3>
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
