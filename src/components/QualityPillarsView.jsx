import React, { useState } from 'react';
import { 
  Target, 
  CheckSquare, 
  Edit3, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Award, 
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { QUALITY_PILLARS, TEACHING_FILE_ITEMS } from '../data/auditRubrics';
import { calculateAuditMetrics } from '../services/auditEngine';

export default function QualityPillarsView({ course, onSelectFolder, onNavigateTab }) {
  if (!course) return null;

  const metrics = calculateAuditMetrics(course);
  const [selectedPillarId, setSelectedPillarId] = useState(QUALITY_PILLARS[0].id);

  const selectedPillar = QUALITY_PILLARS.find(p => p.id === selectedPillarId) || QUALITY_PILLARS[0];
  const pillarScore = metrics.pillarScores[selectedPillar.id] || 0;

  // Find all folders mapped to this pillar
  const mappedFolders = TEACHING_FILE_ITEMS.filter(item => item.pillarId === selectedPillar.id);

  // Icon mapping helper
  const renderPillarIcon = (pillarId, size = 20) => {
    switch (pillarId) {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="fade-in">
      
      {/* Header Info */}
      <div className="card">
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <ShieldCheck size={24} style={{ color: 'var(--primary)' }} />
          The 6 Pillars of Teaching & Learning Quality
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Outcome-Based Education (OBE) and academic accreditation focus on pedagogical efficacy rather than bureaucratic checklist compliance.
        </p>
      </div>

      {/* Top 6 Pillar Selector Pills */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {QUALITY_PILLARS.map(pillar => {
          const score = metrics.pillarScores[pillar.id] || 0;
          const isSelected = pillar.id === selectedPillarId;

          return (
            <div
              key={pillar.id}
              onClick={() => setSelectedPillarId(pillar.id)}
              className="card"
              style={{
                cursor: 'pointer',
                padding: '1.1rem',
                border: isSelected ? `2px solid ${pillar.color}` : '1px solid var(--border)',
                background: isSelected ? '#ffffff' : 'var(--surface-subtle)',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: `${pillar.color}20`,
                  color: pillar.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {renderPillarIcon(pillar.id, 18)}
                </div>

                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: pillar.color }}>
                  {score}%
                </span>
              </div>

              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3 }}>
                {pillar.name}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Weight: {pillar.weight}% of Total Audit
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Pillar Deep Dive Card */}
      <div className="card" style={{ borderLeft: `6px solid ${selectedPillar.color}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge" style={{ background: `${selectedPillar.color}15`, color: selectedPillar.color, border: `1px solid ${selectedPillar.color}30` }}>
                {selectedPillar.code}
              </span>
              <span className="badge badge-neutral">
                Weight: {selectedPillar.weight}%
              </span>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {selectedPillar.name}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '800px' }}>
              {selectedPillar.description}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: selectedPillar.color, lineHeight: 1 }}>
              {pillarScore}%
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Pillar Attainment
            </div>
          </div>
        </div>

        {/* Key Evaluation Questions */}
        <div style={{ background: 'var(--surface-subtle)', padding: '1.2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
            <HelpCircle size={16} style={{ color: selectedPillar.color }} />
            Internal Auditor Guiding Questions:
          </h4>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: '#334155' }}>
            {selectedPillar.keyQuestions.map((q, idx) => (
              <li key={idx}><strong>{q}</strong></li>
            ))}
          </ul>
        </div>

        {/* Contributing Teaching File Folders */}
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.85rem' }}>
            Contributing Teaching File Folders & Evidence ({mappedFolders.length})
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {mappedFolders.map(folder => {
              const folderAudit = course.folderAudits?.[folder.id] || { submitted: false, qualityScore: 1, files: [] };
              const score = folderAudit.qualityScore || 1;

              return (
                <div
                  key={folder.id}
                  style={{
                    padding: '1.1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    background: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-primary">{folder.code}</span>
                      <h5 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {folder.title}
                      </h5>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span className={`badge ${score >= 4 ? 'badge-success' : (score === 3 ? 'badge-warning' : 'badge-danger')}`}>
                        Score: {score} / 5 ({folderAudit.qualityTier || 'Satisfactory'})
                      </span>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          onSelectFolder(folder.id);
                          onNavigateTab('folders');
                        }}
                      >
                        <span>Audit Folder</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Findings snippet */}
                  {folderAudit.findings?.length > 0 && (
                    <div style={{ fontSize: '0.82rem', color: '#065f46', background: 'var(--success-bg)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                      <strong>Key Strength:</strong> {folderAudit.findings[0]}
                    </div>
                  )}

                  {/* Risks snippet */}
                  {folderAudit.risks?.length > 0 && (
                    <div style={{ fontSize: '0.82rem', color: '#991b1b', background: 'var(--danger-bg)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                      <strong>Quality Risk Flag:</strong> {folderAudit.risks[0]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
