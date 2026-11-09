import React from 'react';
import { 
  Target, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  BookOpen, 
  Layers,
  ArrowRight
} from 'lucide-react';

export default function ConstructiveAlignmentMatrix({ course }) {
  if (!course) return null;

  const clos = course.clos || [];
  const assessments = course.assessments || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }} className="fade-in">
      
      {/* Overview Card */}
      <div className="card">
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Target size={24} style={{ color: 'var(--primary)' }} />
          Constructive Alignment & Outcome Attainment Matrix
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Verifies alignment between Bloom Taxonomy cognitive/psychomotor depth, assessments, and continuous quality improvement (CQI).
        </p>
      </div>

      {/* CLO Attainment Table */}
      <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: 'var(--surface-muted)', borderBottom: '2px solid var(--border)', color: 'var(--text-main)' }}>
              <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>CLO Code</th>
              <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Course Learning Outcome Statement</th>
              <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Bloom Level & Domain</th>
              <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Target</th>
              <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Actual Attainment</th>
              <th style={{ padding: '0.85rem 1rem', fontWeight: 800 }}>Attainment Status</th>
            </tr>
          </thead>
          <tbody>
            {clos.map((clo, idx) => {
              const isAchieved = (clo.actualAttainmentPct || 0) >= (clo.targetAttainmentPct || 70);
              const diff = (clo.actualAttainmentPct || 0) - (clo.targetAttainmentPct || 70);

              return (
                <tr key={clo.id || idx} style={{ borderBottom: '1px solid var(--border)', background: idx % 2 === 0 ? '#ffffff' : 'var(--surface-subtle)' }}>
                  <td style={{ padding: '1rem', fontWeight: 800, color: 'var(--primary)', verticalAlign: 'top' }}>
                    {clo.code}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-main)', maxWidth: '380px', lineHeight: 1.4, verticalAlign: 'top' }}>
                    <div style={{ fontWeight: 600 }}>{clo.description}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Mapped to: <strong>{clo.ploCode}</strong>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                    <span className="badge badge-primary">
                      {clo.bloomLevel || 'C4 Analysis'}
                    </span>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Domain: {clo.domain || 'Cognitive'}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-muted)', verticalAlign: 'top' }}>
                    {clo.targetAttainmentPct || 75}%
                  </td>
                  <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: isAchieved ? 'var(--success)' : 'var(--danger)' }}>
                      {clo.actualAttainmentPct || 0}%
                    </span>
                    <span style={{ fontSize: '0.74rem', color: isAchieved ? 'var(--success)' : 'var(--danger)', marginLeft: '0.35rem', fontWeight: 600 }}>
                      ({diff >= 0 ? `+${diff}%` : `${diff}%`})
                    </span>
                  </td>
                  <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                    <span className={`badge ${isAchieved ? 'badge-success' : 'badge-danger'}`}>
                      {isAchieved ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                      {clo.status || (isAchieved ? 'Target Achieved' : 'Gap Flagged')}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Assessment to CLO Mapping Grid */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
          Assessment Methods & Weightage Distribution
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Checks whether assessment tasks sufficiently assess the assigned learning outcome.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {assessments.map((ass, idx) => {
            const mappedClo = clos.find(c => c.id === ass.cloId || c.code === ass.cloCode);

            return (
              <div
                key={ass.id || idx}
                style={{
                  background: 'var(--surface-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  padding: '1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span className="badge badge-primary">
                      {ass.type || 'Continuous Assessment'}
                    </span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {ass.weight}%
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.5rem' }}>
                    {ass.name}
                  </h4>
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.65rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Assessing: <strong style={{ color: 'var(--text-main)' }}>{mappedClo ? `${mappedClo.code} (${mappedClo.bloomLevel})` : 'All CLOs'}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
