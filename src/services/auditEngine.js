import { QUALITY_PILLARS, QUALITY_TIERS, TEACHING_FILE_ITEMS } from '../data/auditRubrics';

/**
 * Calculate overall metrics and pillar scores for a course audit
 */
export function calculateAuditMetrics(course) {
  if (!course || !course.folderAudits) {
    return {
      overallQualityIndex: 0,
      complianceRate: 0,
      avgQualityScore: 0,
      pillarScores: {},
      qualityTier: QUALITY_TIERS[3],
      submittedFolderCount: 0,
      submittedFolders: 0,
      totalFolderCount: 14,
      criticalRisksCount: 0,
      totalRisks: 0,
      activeCarsCount: 0
    };
  }

  const folderAudits = course.folderAudits;
  let submittedCount = 0;
  let totalScoreSum = 0;
  let criticalRisksCount = 0;

  // Track pillar averages
  const pillarTotals = {};
  const pillarCounts = {};

  for (const pillar of QUALITY_PILLARS) {
    pillarTotals[pillar.id] = 0;
    pillarCounts[pillar.id] = 0;
  }

  const is100PercentCoursework = Boolean(course.isCourseworkOnly || course.is100PercentCoursework);

  for (const item of TEACHING_FILE_ITEMS) {
    // If 100% coursework, exam folders 09 and 10 are not applicable
    const isExamFolder = item.id === '09' || item.id === '10';
    if (is100PercentCoursework && isExamFolder) {
      continue;
    }

    const audit = folderAudits[item.id] || { submitted: false, qualityScore: 1, risks: [] };
    if (audit.submitted && audit.fileCount > 0) {
      submittedCount++;
    }

    const score = audit.qualityScore || 1; // 1-5 scale
    totalScoreSum += score;

    if (audit.risks && audit.risks.length > 0) {
      criticalRisksCount += audit.risks.length;
    }

    if (item.pillarId && pillarTotals[item.pillarId] !== undefined) {
      // Map 1-5 score to 0-100 percentage: 1=20%, 2=40%, 3=60%, 4=80%, 5=100%
      const pct = (score / 5) * 100;
      pillarTotals[item.pillarId] += pct;
      pillarCounts[item.pillarId]++;
    }
  }

  // Calculate weighted pillar scores
  const pillarScores = {};
  let weightedIndexSum = 0;
  let totalWeightSum = 0;

  for (const pillar of QUALITY_PILLARS) {
    const count = pillarCounts[pillar.id] || 0;
    // If a pillar has no applicable folders (or folders were excluded), fallback to 100 or folder 11/12 score
    let avgScore = 80;
    if (count > 0) {
      avgScore = Math.round(pillarTotals[pillar.id] / count);
    } else if (is100PercentCoursework) {
      // If assessment/marking pillar has no exam folders, inherit from coursework folders 11 & 12
      const f11 = folderAudits['11']?.qualityScore || 4;
      const f12 = folderAudits['12']?.qualityScore || 4;
      avgScore = Math.round(((f11 + f12) / 10) * 100);
    }

    pillarScores[pillar.id] = Math.min(100, Math.max(0, avgScore));

    weightedIndexSum += (pillarScores[pillar.id] * pillar.weight);
    totalWeightSum += pillar.weight;
  }

  const applicableFolderCount = is100PercentCoursework ? (TEACHING_FILE_ITEMS.length - 2) : TEACHING_FILE_ITEMS.length;
  const overallQualityIndex = Math.round(weightedIndexSum / (totalWeightSum || 100));
  const complianceRate = Math.round((submittedCount / (applicableFolderCount || 1)) * 100);

  // Determine Quality Tier
  const tier = QUALITY_TIERS.find(t => overallQualityIndex >= t.minScore) || QUALITY_TIERS[QUALITY_TIERS.length - 1];

  const activeCarsCount = (course.correctiveActions || []).filter(c => c.status !== 'Closed').length;
  const avgQualityScore = Number((totalScoreSum / (applicableFolderCount || 12)).toFixed(1));

  return {
    overallQualityIndex,
    complianceRate: Math.min(100, complianceRate),
    avgQualityScore,
    pillarScores,
    qualityTier: tier,
    submittedFolderCount: submittedCount,
    submittedFolders: submittedCount,
    totalFolderCount: applicableFolderCount,
    criticalRisksCount,
    totalRisks: criticalRisksCount,
    activeCarsCount,
    is100PercentCoursework
  };
}

/**
 * Generate an executive audit summary paragraph
 */
export function generateExecutiveSummary(course, metrics) {
  const { overallQualityIndex, complianceRate, qualityTier, submittedFolderCount, is100PercentCoursework } = metrics;
  
  let text = `The internal teaching file audit for ${course.code} (${course.name}), taught by ${course.lecturer} for ${course.semester}, has been conducted. `;
  const applicableTotal = is100PercentCoursework ? 12 : 14;
  text += `Submission compliance is currently at ${complianceRate}% (${submittedFolderCount} of ${applicableTotal} folders submitted). `;
  text += `The overall Teaching & Learning Quality Index is evaluated at ${overallQualityIndex}%, placing the portfolio under ${qualityTier.badge}. `;

  if (overallQualityIndex >= 85) {
    text += `The course exhibits exemplary constructive alignment, rigorous criteria-referenced rubrics, and rich formative feedback on student sample scripts. Continuous Quality Improvement (CQI) actions are mature and evidence-driven.`;
  } else if (overallQualityIndex >= 70) {
    text += `The portfolio demonstrates commendable teaching standards and meets institutional accreditation benchmarks. Minor improvements are advised to deepen qualitative student feedback and strengthen specific CQI action timelines.`;
  } else if (overallQualityIndex >= 55) {
    text += `Basic submission compliance is satisfied, but critical quality improvements are necessary. The auditor highlights gaps in rubric granularity, missing formative feedback annotations on student samples, and superficial CQI closing-the-loop plans.`;
  } else {
    text += `Substantial academic quality risks have been flagged. Missing mandatory folders (e.g. final exam scripts or moderation forms) and constructive misalignment require urgent remedial intervention before faculty board endorsement.`;
  }

  return text;
}
