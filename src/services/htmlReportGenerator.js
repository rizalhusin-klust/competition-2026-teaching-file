import { TEACHING_FILE_ITEMS, QUALITY_PILLARS } from '../data/auditRubrics';
import { calculateAuditMetrics, generateExecutiveSummary } from './auditEngine';
import klustLogo from '../assets/klust-logo.jpg';

/**
 * Clean and sanitize a string for safe filesystem filename
 */
function sanitizeForFilename(str) {
  if (!str) return '';
  return str
    .replace(/[^\w\s-]/g, '') // remove special characters
    .trim()
    .replace(/\s+/g, '');    // remove spaces (CamelCase style)
}

/**
 * Shorten academic program title for concise, professional filenames
 */
function abbreviateProgram(program) {
  if (!program) return 'AcademicCourse';
  const clean = program.trim();
  if (/architecture/i.test(clean)) return 'BScArch';
  if (/software\s*engineering/i.test(clean)) return 'BScSE';
  if (/computer\s*science/i.test(clean)) return 'BCS';
  if (/information\s*technology/i.test(clean)) return 'BIT';
  if (/civil/i.test(clean)) return 'BEngCivil';
  if (/mechanical/i.test(clean)) return 'BEngMech';
  if (/electrical/i.test(clean)) return 'BEngElec';
  if (/business/i.test(clean)) return 'BBA';
  
  // Extract initials if unknown
  const words = clean.split(/\s+/).filter(w => !['of', 'in', 'and', 'the', '&'].includes(w.toLowerCase()));
  if (words.length >= 2) {
    return words.map(w => w[0].toUpperCase()).join('');
  }
  return sanitizeForFilename(clean);
}

/**
 * Shorten semester string
 */
function formatSemester(semester) {
  if (!semester) return 'Session2026';
  return semester
    .replace(/\s*-\s*/g, '_')
    .replace(/\//g, '-')
    .replace(/\s+/g, '');
}

/**
 * Generates an institutional standard archive filename based on:
 * [Program]_[Semester]_[SubjectCode]_[SubjectName]_[LecturerName]_[ReportType].html
 */
export function generateSuggestedFilename(course, role = 'auditor') {
  if (!course) return 'EduAudit_Report_2026.html';

  const progPart = abbreviateProgram(course.program);
  const semPart = formatSemester(course.semester);
  const codePart = sanitizeForFilename(course.code);
  
  // Clean subject name up to 20 chars
  const namePart = sanitizeForFilename(course.name).slice(0, 22);

  // Clean lecturer name (remove titles like Ar., Dr., Prof., Ts., bin, binti)
  let lecClean = (course.lecturer || 'Lecturer')
    .replace(/\b(Prof|Assoc|Dr|Ar|Ts|Ir|bin|binti|bt|b)\b\.?/gi, '')
    .trim();
  lecClean = sanitizeForFilename(lecClean).slice(0, 18);
  if (!lecClean) lecClean = 'CourseLecturer';

  const reportType = role === 'auditor' ? 'QualityAuditReport' : 'LecturerSelfCheckReport';

  return `${progPart}_${semPart}_${codePart}_${namePart}_${lecClean}_${reportType}.html`;
}

/**
 * Fetch logo and convert to Base64 data URL for offline embedding
 */
export async function getLogoBase64() {
  try {
    const res = await fetch(klustLogo);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve(klustLogo);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn('Could not base64 encode logo, using reference path:', e);
    return klustLogo;
  }
}

/**
 * Compile entire portfolio into a complete, self-contained standalone HTML document
 */
export function generateStandaloneHtmlContent(course, role = 'auditor', logoDataUrl = '') {
  const isAuditor = role === 'auditor';
  const metrics = calculateAuditMetrics(course);
  const summaryText = generateExecutiveSummary(course, metrics);
  const reportDate = course.auditDate || new Date().toISOString().split('T')[0];

  const logoSrc = logoDataUrl || klustLogo;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${course.code} - ${isAuditor ? 'Quality Audit Report' : 'Lecturer Self-Check Dossier'} (KLUST)</title>
  <style>
    :root {
      --primary: #1e40af;
      --primary-light: #eff6ff;
      --secondary: #0f172a;
      --success: #059669;
      --success-light: #ecfdf5;
      --warning: #d97706;
      --warning-light: #fffbeb;
      --danger: #dc2626;
      --danger-light: #fef2f2;
      --border: #e2e8f0;
      --text: #0f172a;
      --text-muted: #64748b;
      --bg-subtle: #f8fafc;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: var(--text);
      background: #f1f5f9;
      line-height: 1.5;
      padding: 2rem 1rem;
    }

    .container {
      max-width: 1080px;
      margin: 0 auto;
      background: #ffffff;
      padding: 3rem;
      border-radius: 12px;
      box-shadow: 0 4px 25px rgba(0,0,0,0.08);
      border: 1px solid var(--border);
    }

    /* Print & Action Bar */
    .action-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      color: #ffffff;
      padding: 0.85rem 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: #2563eb;
      color: #ffffff;
      padding: 0.45rem 1rem;
      border-radius: 6px;
      text-decoration: none;
      font-size: 0.84rem;
      font-weight: 700;
      border: none;
      cursor: pointer;
    }
    .action-btn:hover { background: #1d4ed8; }
    .action-btn-secondary {
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.25);
    }
    .action-btn-secondary:hover { background: rgba(255,255,255,0.25); }

    /* Letterhead Header */
    .letterhead {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 3px double #0f172a;
      padding-bottom: 1.5rem;
      margin-bottom: 2rem;
      gap: 1.5rem;
    }
    .letterhead img {
      max-height: 68px;
      width: auto;
      object-fit: contain;
    }
    .letterhead-text {
      text-align: right;
    }
    .letterhead-dept {
      font-size: 0.78rem;
      font-weight: 800;
      letterSpacing: 0.12em;
      color: var(--primary);
      text-transform: uppercase;
    }
    .letterhead-title {
      font-size: 1.55rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0.25rem 0 0.15rem 0;
      letter-spacing: -0.01em;
    }
    .letterhead-sub {
      font-size: 0.84rem;
      color: var(--text-muted);
    }

    /* Section Styling */
    .section-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 0.45rem;
      margin: 2.25rem 0 1rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Metadata Grid */
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
      background: var(--bg-subtle);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.25rem;
      font-size: 0.9rem;
    }
    .meta-item { margin-bottom: 0.45rem; }
    .meta-item strong { color: #334155; }

    /* Verdict Box */
    .verdict-banner {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 1.25rem 0;
    }
    .verdict-card {
      border: 2px solid;
      border-radius: 8px;
      padding: 1.1rem;
      text-align: center;
      background: #ffffff;
    }
    .verdict-metric {
      font-size: 2.3rem;
      font-weight: 800;
      line-height: 1.1;
      margin: 0.25rem 0;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.88rem;
      margin: 1rem 0;
    }
    th, td {
      padding: 0.65rem 0.85rem;
      text-align: left;
      border: 1px solid var(--border);
    }
    th {
      background: var(--bg-subtle);
      font-weight: 700;
      color: #334155;
    }

    /* Badges */
    .badge {
      display: inline-block;
      padding: 0.2rem 0.55rem;
      border-radius: 9999px;
      font-size: 0.74rem;
      font-weight: 700;
      letter-spacing: 0.02em;
    }
    .badge-primary { background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; }
    .badge-success { background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0; }
    .badge-warning { background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
    .badge-danger { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }

    /* Folders List */
    .folder-item {
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.25rem;
      margin-bottom: 1.25rem;
      background: #ffffff;
      break-inside: avoid;
    }
    .folder-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.75rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .folder-title {
      font-size: 1.05rem;
      font-weight: 800;
      color: #0f172a;
    }
    .drive-link {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: #0284c7;
      text-decoration: underline;
      font-weight: 600;
      font-size: 0.82rem;
    }

    /* Sign-off Blocks */
    .sign-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
      margin-top: 2rem;
      break-inside: avoid;
    }
    .sign-box {
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.25rem;
      background: var(--bg-subtle);
    }
    .sign-line {
      height: 48px;
      border-bottom: 1px dashed #94a3b8;
      margin: 1.5rem 0 0.75rem 0;
    }

    /* Print Styles */
    @media print {
      body { background: #ffffff; padding: 0; }
      .container { border: none; box-shadow: none; padding: 0; max-width: 100%; }
      .action-bar { display: none !important; }
      .page-break { page-break-before: always; }
      .folder-item { break-inside: avoid; }
      a { text-decoration: none; color: inherit; }
      .drive-link { color: #0f172a; }
    }
  </style>
</head>
<body>

  <div class="container">
    
    <!-- Action Bar (Not Printed) -->
    <div class="action-bar">
      <div>
        <strong>KLUST EduAudit Pro v2.1</strong> • Standalone Academic Quality Dossier
      </div>
      <div style="display: flex; gap: 0.5rem;">
        ${course.driveFolderUrl ? `
        <a href="${course.driveFolderUrl}" target="_blank" class="action-btn action-btn-secondary">
          Open Google Drive Folder
        </a>` : ''}
        <button type="button" class="action-btn" onclick="window.print()">
          Print / Save as PDF
        </button>
      </div>
    </div>

    <!-- Official Institutional Letterhead Header -->
    <div class="letterhead">
      <div>
        <img src="${logoSrc}" alt="Kuala Lumpur University of Science and Technology">
      </div>
      <div class="letterhead-text">
        <div class="letterhead-dept">Centre for Academic Quality Assurance & Accreditation</div>
        <h1 class="letterhead-title">${isAuditor ? 'TEACHING & LEARNING QUALITY AUDIT REPORT' : 'TEACHING & LEARNING PRE-AUDIT READINESS REPORT'}</h1>
        <div class="letterhead-sub">Outcome-Based Education (OBE) Complete Course Teaching Portfolio • Session 2026/2027</div>
      </div>
    </div>

    <!-- Section 1: Course & Audit Metadata -->
    <div class="meta-grid">
      <div>
        <div class="meta-item"><strong>Course Code:</strong> ${course.code}</div>
        <div class="meta-item"><strong>Course Title:</strong> ${course.name}</div>
        <div class="meta-item"><strong>Academic Programme:</strong> ${course.program}</div>
        <div class="meta-item"><strong>Academic Session:</strong> ${course.semester}</div>
        <div class="meta-item"><strong>Credit Hours:</strong> ${course.creditHours} Credits (${(course.creditHours || 3) * 40}h SLT)</div>
      </div>
      <div>
        <div class="meta-item"><strong>Course Lecturer:</strong> ${course.lecturer}</div>
        <div class="meta-item"><strong>Internal Quality Auditor:</strong> ${course.auditorName || 'Chief Internal Auditor'}</div>
        <div class="meta-item"><strong>Head of Department:</strong> ${course.headOfDepartment || 'Prof. Ar. Dr. Norwina Mohd Nawawi'}</div>
        <div class="meta-item"><strong>Date of Review:</strong> ${reportDate}</div>
        <div class="meta-item"><strong>Report Type:</strong> <span class="badge ${isAuditor ? 'badge-primary' : 'badge-success'}">${isAuditor ? 'Formal Internal Quality Audit' : 'Lecturer Self-Check Dossier'}</span></div>
      </div>
    </div>

    <!-- Section 2: Executive Quality Verdict -->
    <div class="section-title">
      <span>1. Executive Quality Verdict</span>
      <span class="badge" style="background: ${metrics.qualityTier.color}20; color: ${metrics.qualityTier.color}; border: 1px solid ${metrics.qualityTier.color};">
        ${metrics.qualityTier.label}
      </span>
    </div>

    <div class="verdict-banner">
      <div class="verdict-card" style="border-color: ${metrics.qualityTier.color};">
        <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Overall Quality Index</div>
        <div class="verdict-metric" style="color: ${metrics.qualityTier.color};">${metrics.overallQualityIndex}%</div>
        <div style="font-size: 0.85rem; font-weight: 700; color: ${metrics.qualityTier.color};">${metrics.qualityTier.label}</div>
      </div>

      <div class="verdict-card" style="border-color: #0284c7;">
        <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Submission Compliance</div>
        <div class="verdict-metric" style="color: #0284c7;">${metrics.complianceRate}%</div>
        <div style="font-size: 0.85rem; font-weight: 700; color: #0284c7;">${metrics.submittedFolders} / 13 Folders Filed</div>
      </div>

      <div class="verdict-card" style="border-color: #059669;">
        <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Average Quality Score</div>
        <div class="verdict-metric" style="color: #059669;">${metrics.avgQualityScore} / 5.0</div>
        <div style="font-size: 0.85rem; font-weight: 700; color: #059669;">Weighted Across 6 Pillars</div>
      </div>

      <div class="verdict-card" style="border-color: #d97706;">
        <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Identified Risk Flags</div>
        <div class="verdict-metric" style="color: #d97706;">${metrics.totalRisks}</div>
        <div style="font-size: 0.85rem; font-weight: 700; color: #d97706;">Accreditation Review Points</div>
      </div>
    </div>

    <div style="background: var(--bg-subtle); border: 1px solid var(--border); border-radius: 8px; padding: 1.1rem; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">
      <strong>Executive Qualitative Assessment:</strong><br>
      ${summaryText}
    </div>

    <!-- Section 3: The 6 Quality Pillars Evaluation -->
    <div class="section-title">
      <span>2. Evaluation Across the 6 Quality Pillars</span>
    </div>

    <table>
      <thead>
        <tr>
          <th style="width: 32%;">Quality Pillar</th>
          <th style="width: 10%;">Weight</th>
          <th style="width: 12%;">Score</th>
          <th style="width: 16%;">Rating Tier</th>
          <th>Accreditation & Pedagogical Indicators</th>
        </tr>
      </thead>
      <tbody>
        ${QUALITY_PILLARS.map(p => {
          const score = metrics.pillarScores[p.id] || 3.0;
          const tier = score >= 4.5 ? 'Exemplary' : score >= 3.8 ? 'Commendable' : score >= 3.0 ? 'Satisfactory' : 'Needs Remediation';
          const tierColor = score >= 4.5 ? '#059669' : score >= 3.8 ? '#1e40af' : score >= 3.0 ? '#d97706' : '#dc2626';
          return `
          <tr>
            <td>
              <strong>${p.name}</strong><br>
              <span style="font-size: 0.76rem; color: var(--text-muted);">${p.description}</span>
            </td>
            <td><strong>${p.weight}%</strong></td>
            <td><strong style="color: ${tierColor};">${score.toFixed(1)} / 5.0</strong></td>
            <td><span class="badge" style="background: ${tierColor}15; color: ${tierColor}; border: 1px solid ${tierColor}40;">${tier}</span></td>
            <td style="font-size: 0.82rem; color: #334155;">${p.criteria?.slice(0, 2).join('; ') || 'EAC/MQA outcome alignment verification'}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>

    <!-- Section 4: All 13 Teaching File Folders with Links -->
    <div class="section-title">
      <span>3. Complete 13 Teaching File Folders & Document Links</span>
      ${course.driveFolderUrl ? `<a href="${course.driveFolderUrl}" target="_blank" class="drive-link">Main Drive Folder ↗</a>` : ''}
    </div>

    <div class="folders-dossier">
      ${TEACHING_FILE_ITEMS.map(item => {
        const audit = course.folderAudits?.[item.id] || {};
        const score = audit.qualityScore || 3;
        const submitted = Boolean(audit.submitted);
        const folderDriveUrl = audit.driveLink || course.driveFolderUrl;

        return `
        <div class="folder-item">
          <div class="folder-header">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span class="badge badge-primary">${item.code}</span>
                <span class="badge ${submitted ? 'badge-success' : 'badge-danger'}">${submitted ? 'Submitted' : 'Missing File'}</span>
                <span class="badge" style="background: #f1f5f9; color: #475569;">Drive: ${item.driveFolderName}</span>
              </div>
              <div class="folder-title">${item.title}</div>
            </div>
            <div style="text-align: right;">
              <span class="badge ${score >= 4 ? 'badge-success' : score === 3 ? 'badge-warning' : 'badge-danger'}" style="font-size: 0.85rem; padding: 0.25rem 0.65rem;">
                Score: ${score} / 5
              </span>
              ${folderDriveUrl ? `
              <div style="margin-top: 0.35rem;">
                <a href="${folderDriveUrl}" target="_blank" class="drive-link">
                  Open Folder in Google Drive ↗
                </a>
              </div>` : ''}
            </div>
          </div>

          <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.6rem;">
            <strong>OBE Quality Focus:</strong> ${item.obeFocus}
          </div>

          <!-- Uploaded Documents & Links -->
          ${audit.files && audit.files.length > 0 ? `
          <div style="margin: 0.65rem 0;">
            <strong style="font-size: 0.82rem; color: #334155;">Submitted Documents (${audit.files.length}):</strong>
            <ul style="margin: 0.35rem 0 0 1.25rem; font-size: 0.82rem; color: #1e293b;">
              ${audit.files.map(f => `
                <li style="margin-bottom: 0.25rem;">
                  <strong>${f.name}</strong> 
                  ${f.size ? `<span style="color: var(--text-muted);">(${f.size})</span>` : ''}
                  ${f.qualityFlag ? `<span class="badge ${f.qualityFlag.includes('Verified') ? 'badge-success' : 'badge-warning'}" style="font-size: 0.68rem; margin-left: 0.35rem;">${f.qualityFlag}</span>` : ''}
                  ${f.driveLink ? `<a href="${f.driveLink}" target="_blank" class="drive-link" style="margin-left: 0.5rem;">[View File ↗]</a>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>` : '<div style="font-size: 0.82rem; color: #dc2626; font-style: italic;">No specific files attached in this audit entry.</div>'}

          <!-- Strengths -->
          ${audit.findings && audit.findings.length > 0 ? `
          <div style="background: var(--success-light); border: 1px solid #a7f3d0; border-radius: 6px; padding: 0.6rem 0.85rem; margin-top: 0.6rem; font-size: 0.82rem; color: #065f46;">
            <strong>Quality Strengths:</strong> ${audit.findings.join(' • ')}
          </div>` : ''}

          <!-- Risks -->
          ${audit.risks && audit.risks.length > 0 ? `
          <div style="background: var(--warning-light); border: 1px solid #fde68a; border-radius: 6px; padding: 0.6rem 0.85rem; margin-top: 0.45rem; font-size: 0.82rem; color: #92400e;">
            <strong>Identified Risk Flags / Deficiencies:</strong> ${audit.risks.join(' • ')}
          </div>` : ''}

          <!-- Remarks -->
          ${audit.auditorNotes ? `
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.65rem 0.85rem; margin-top: 0.45rem; font-size: 0.84rem; color: #334155;">
            <strong>${isAuditor ? 'Auditor Remarks:' : 'Lecturer Self-Check Remarks:'}</strong> ${audit.auditorNotes}
          </div>` : ''}
        </div>`;
      }).join('')}
    </div>

    <!-- Section 5: Constructive Alignment Matrix -->
    <div class="section-title page-break">
      <span>4. Constructive Alignment & CLO Attainment Matrix</span>
    </div>

    <table>
      <thead>
        <tr>
          <th>CLO Code</th>
          <th>Outcome Statement</th>
          <th>Mapped PLO</th>
          <th>Bloom Level</th>
          <th>Target</th>
          <th>Actual</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${(course.clos || []).map(clo => `
        <tr>
          <td><strong>${clo.code}</strong></td>
          <td style="font-size: 0.82rem;">${clo.description}</td>
          <td style="font-size: 0.82rem;">${clo.ploCode}</td>
          <td><span class="badge badge-primary">${clo.bloomLevel}</span></td>
          <td>${clo.targetAttainmentPct}%</td>
          <td><strong>${clo.actualAttainmentPct}%</strong></td>
          <td>
            <span class="badge ${clo.actualAttainmentPct >= clo.targetAttainmentPct ? 'badge-success' : 'badge-danger'}">
              ${clo.status}
            </span>
          </td>
        </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Section 6: Formal 3-Part Signature Endorsement Block -->
    <div class="section-title">
      <span>5. Formal Institutional Audit Endorsement & Sign-Off</span>
    </div>

    <div class="sign-grid">
      <div class="sign-box">
        <div style="font-size: 0.78rem; font-weight: 800; color: var(--primary); text-transform: uppercase;">
          1. Internal Quality Auditor
        </div>
        <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">
          Verified compliance against OBE quality framework
        </div>
        <div class="sign-line"></div>
        <div style="font-size: 0.88rem; font-weight: 700;">${course.auditorName || 'Chief Internal Auditor'}</div>
        <div style="font-size: 0.76rem; color: var(--text-muted);">Assigned Auditor • Date: ${reportDate}</div>
      </div>

      <div class="sign-box">
        <div style="font-size: 0.78rem; font-weight: 800; color: #166534; text-transform: uppercase;">
          2. Course Coordinator / Lecturer
        </div>
        <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">
          Acknowledged findings & committed to CQI action plan
        </div>
        <div class="sign-line"></div>
        <div style="font-size: 0.88rem; font-weight: 700;">${course.lecturer}</div>
        <div style="font-size: 0.76rem; color: var(--text-muted);">Course Lecturer • Date: ${reportDate}</div>
      </div>

      <div class="sign-box">
        <div style="font-size: 0.78rem; font-weight: 800; color: #6b21a8; text-transform: uppercase;">
          3. Head of Department / Dean
        </div>
        <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">
          Endorsed for faculty records & accreditation audit
        </div>
        <div class="sign-line"></div>
        <div style="font-size: 0.88rem; font-weight: 700;">${course.headOfDepartment || 'Prof. Ar. Dr. Norwina Mohd Nawawi'}</div>
        <div style="font-size: 0.76rem; color: var(--text-muted);">Head of Department • Date: ${reportDate}</div>
      </div>
    </div>

    <!-- Institutional Footer -->
    <div style="border-top: 1px solid var(--border); padding-top: 1.5rem; margin-top: 2.5rem; text-align: center; font-size: 0.75rem; color: var(--text-muted);">
      <div>Kuala Lumpur University of Science and Technology (KLUST) • Centre for Academic Quality Assurance & Accreditation</div>
      <div style="margin-top: 0.25rem;">Generated by EduAudit Pro v2.1 • Document Hash: KLUST-QA-${course.code.replace(/\s+/g, '')}-${reportDate}</div>
    </div>

  </div>

</body>
</html>`;

  return html;
}

/**
 * Trigger immediate client-side download of the standalone HTML dossier
 */
export async function downloadStandaloneHtmlReport(course, role = 'auditor', customFilename = null) {
  const filename = customFilename || generateSuggestedFilename(course, role);
  const logoDataUrl = await getLogoBase64();
  const htmlContent = generateStandaloneHtmlContent(course, role, logoDataUrl);

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return filename;
}

/**
 * Open standalone HTML dossier directly in a new browser tab for immediate preview
 */
export async function openStandaloneHtmlInNewTab(course, role = 'auditor') {
  const logoDataUrl = await getLogoBase64();
  const htmlContent = generateStandaloneHtmlContent(course, role, logoDataUrl);
  
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
