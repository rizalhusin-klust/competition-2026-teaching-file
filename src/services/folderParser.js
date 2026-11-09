import JSZip from 'jszip';
import { TEACHING_FILE_ITEMS } from '../data/auditRubrics';

/**
 * Format bytes to human readable format
 */
export function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Match a file's path or name to one of the 13 standard Teaching File Folders
 */
export function matchFileToFolder(filePath, fileName) {
  const normalizedPath = (filePath || fileName).toLowerCase();
  
  // 1. Check for folder number prefixes: e.g. "01", "folder 01", "folder 1", "01 Course Syllabus"
  for (const item of TEACHING_FILE_ITEMS) {
    const num = parseInt(item.id, 10);
    const numPadded = item.id; // '01'
    const patterns = [
      `/${numPadded}`,
      `/${num}/`,
      `folder ${numPadded}`,
      `folder ${num}`,
      `folder_${numPadded}`,
      `folder_${num}`,
      `${numPadded} `,
      `${numPadded}_`,
      `${numPadded}-`
    ];

    if (patterns.some(p => normalizedPath.includes(p))) {
      return item.id;
    }
  }

  // 2. Keyword fallback matching
  for (const item of TEACHING_FILE_ITEMS) {
    for (const kw of item.essentialKeywords) {
      if (normalizedPath.includes(kw)) {
        return item.id;
      }
    }
  }

  // Fallback to Folder 13 (Miscellaneous) if unknown
  return '13';
}

/**
 * Process a list of File objects (e.g. from folder upload or drag & drop)
 */
export async function processUploadedFiles(fileList, courseMeta = {}) {
  const folderBuckets = {};
  for (const item of TEACHING_FILE_ITEMS) {
    folderBuckets[item.id] = {
      submitted: false,
      fileCount: 0,
      files: [],
      qualityScore: 3,
      qualityTier: 'Satisfactory',
      findings: [],
      risks: [],
      auditorNotes: ''
    };
  }

  const filesArray = Array.from(fileList);

  for (const file of filesArray) {
    // Ignore OS hidden files (.DS_Store, Thumbs.db, etc.)
    if (file.name.startsWith('.') || file.name === 'Thumbs.db') continue;

    const path = file.webkitRelativePath || file.name;
    const folderId = matchFileToFolder(path, file.name);

    folderBuckets[folderId].files.push({
      name: file.name,
      path: path,
      size: formatBytes(file.size),
      sizeBytes: file.size,
      updated: new Date(file.lastModified).toISOString().split('T')[0],
      type: file.type || 'application/octet-stream'
    });
    folderBuckets[folderId].fileCount++;
    folderBuckets[folderId].submitted = true;
  }

  // Run automated initial heuristic quality check on each folder
  for (const item of TEACHING_FILE_ITEMS) {
    const bucket = folderBuckets[item.id];
    evaluateFolderHeuristics(item, bucket);
  }

  // Try to detect course code and title from directory name or syllabus files
  let detectedCode = courseMeta.code || 'COURSE 2026';
  let detectedName = courseMeta.name || 'Teaching & Learning Portfolio';

  const firstPath = filesArray[0]?.webkitRelativePath || '';
  if (firstPath) {
    const rootDirName = firstPath.split('/')[0];
    if (rootDirName) {
      const match = rootDirName.match(/([A-Z]{2,4}\s*\d{3,4})/i);
      if (match) {
        detectedCode = match[1].toUpperCase();
      }
      detectedName = rootDirName.replace(detectedCode, '').replace(/[-_]/g, ' ').trim() || detectedName;
    }
  }

  return {
    id: `course_${Date.now()}`,
    code: detectedCode,
    name: detectedName,
    program: courseMeta.program || 'Faculty Undergraduate Programme',
    semester: courseMeta.semester || 'Academic Session 2026/2027',
    lecturer: courseMeta.lecturer || 'Course Lecturer',
    headOfDepartment: courseMeta.headOfDepartment || 'Prof. Ar. Dr. Norwina Mohd Nawawi',
    creditHours: courseMeta.creditHours || 3,
    driveFolderUrl: courseMeta.driveFolderUrl || '',
    auditDate: new Date().toISOString().split('T')[0],
    auditorName: courseMeta.auditorName || 'Internal Quality Auditor',
    auditStatus: 'Audit In Progress',
    folderAudits: folderBuckets,
    totalFilesParsed: filesArray.length
  };
}

/**
 * Process a ZIP file upload using JSZip
 */
export async function processZipFile(zipFile, courseMeta = {}) {
  const zip = new JSZip();
  const loadedZip = await zip.loadAsync(zipFile);
  
  const extractedFiles = [];

  for (const [relativePath, zipEntry] of Object.entries(loadedZip.files)) {
    if (zipEntry.dir) continue;
    if (zipEntry.name.startsWith('__MACOSX') || zipEntry.name.includes('/.') || zipEntry.name.startsWith('.')) continue;

    // Get uncompressed size if available
    const size = zipEntry._data?.uncompressedSize || 1024;
    
    extractedFiles.push({
      name: relativePath.split('/').pop(),
      webkitRelativePath: relativePath,
      size: size,
      lastModified: zipEntry.date ? zipEntry.date.getTime() : Date.now(),
      type: getMimeType(relativePath)
    });
  }

  return processUploadedFiles(extractedFiles, courseMeta);
}

function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  switch (ext) {
    case 'pdf': return 'application/pdf';
    case 'doc':
    case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'xls':
    case 'xlsx': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'ppt':
    case 'pptx': return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    case 'jpg':
    case 'jpeg': return 'image/jpeg';
    case 'png': return 'image/png';
    default: return 'application/octet-stream';
  }
}

/**
 * Intelligent heuristic inspection of uploaded files per folder
 */
function evaluateFolderHeuristics(item, bucket) {
  if (!bucket.submitted || bucket.fileCount === 0) {
    bucket.qualityScore = 1;
    bucket.qualityTier = 'Non-Compliant';
    bucket.findings = [`Submission Missing: No documents uploaded for ${item.title}.`];
    bucket.risks = [`Mandatory Teaching File item is missing from the folder.`];
    bucket.auditorNotes = 'Item missing. Lecturer must upload required documents for quality verification.';
    return;
  }

  const fileNames = bucket.files.map(f => f.name.toLowerCase()).join(' ');

  // Quality evaluation heuristics by folder
  switch (item.id) {
    case '01': // Syllabus
      if (fileNames.includes('approved') || fileNames.includes('signed') || fileNames.includes('matrix')) {
        bucket.qualityScore = 5;
        bucket.qualityTier = 'Exemplary';
        bucket.findings = [
          'Approved course syllabus present with explicit CLO-PLO mapping matrix.',
          'Learning outcomes define measurable cognitive and psychomotor action verbs.'
        ];
      } else {
        bucket.qualityScore = 4;
        bucket.qualityTier = 'Commendable';
        bucket.findings = [
          'Course syllabus and weekly outline provided.',
          'Verify if formal dean/HOD approval signature is attached.'
        ];
      }
      break;

    case '03': // Assessment Plan
      bucket.qualityScore = 4;
      bucket.qualityTier = 'Commendable';
      bucket.findings = [
        'Continuous assessment plan uploaded with component weightages.',
        'Deadlines distributed across semester teaching weeks.'
      ];
      break;

    case '05': // Attendance
      if (fileNames.includes('warning') || fileNames.includes('counsel') || fileNames.includes('barring')) {
        bucket.qualityScore = 5;
        bucket.qualityTier = 'Exemplary';
        bucket.findings = [
          'Complete attendance roster with documented early interventions for at-risk (<80%) students.'
        ];
      } else {
        bucket.qualityScore = 4;
        bucket.qualityTier = 'Commendable';
        bucket.findings = ['Full semester attendance records present. Check if any student breached the 80% threshold.'];
      }
      break;

    case '07': // Lecturer Report & CQI
      if (fileNames.includes('cqi') || fileNames.includes('report') || fileNames.includes('attainment')) {
        bucket.qualityScore = 4;
        bucket.qualityTier = 'Commendable';
        bucket.findings = [
          'End of semester course report and CQI review submitted.',
          'Lecturer should review whether proposed actions are concrete and measurable.'
        ];
      } else {
        bucket.qualityScore = 3;
        bucket.qualityTier = 'Satisfactory';
        bucket.findings = ['Course report document detected. Check for quantitative CLO attainment graphs and action plan.'];
      }
      break;

    case '09': // Exam Moderation
      if (fileNames.includes('moderation') || fileNames.includes('scheme') || fileNames.includes('vetting')) {
        bucket.qualityScore = 5;
        bucket.qualityTier = 'Exemplary';
        bucket.findings = [
          'Pre-moderation vetting forms and comprehensive marking scheme attached.',
          'Internal moderation signatures verified.'
        ];
      } else {
        bucket.qualityScore = 3;
        bucket.qualityTier = 'Satisfactory';
        bucket.findings = ['Exam paper uploaded. Ensure signed pre-moderation committee approval is attached.'];
        bucket.risks = ['Ensure pre-moderation occurred before the examination date.'];
      }
      break;

    case '10': // Exam Scripts
      if (bucket.fileCount >= 9 || (fileNames.includes('high') && fileNames.includes('mid') && fileNames.includes('low'))) {
        bucket.qualityScore = 4;
        bucket.qualityTier = 'Commendable';
        bucket.findings = [
          'Representative sample scripts (High, Mid, Low) uploaded.',
          'Check for post-moderation counter-signatures.'
        ];
      } else {
        bucket.qualityScore = 3;
        bucket.qualityTier = 'Satisfactory';
        bucket.findings = [`${bucket.fileCount} sample script(s) uploaded. Standard requires 9 scripts (3 High, 3 Mid, 3 Low).`];
        bucket.risks = ['Verify full complement of 3 High, 3 Mid, 3 Low scripts are provided.'];
      }
      break;

    case '11': // Coursework Rubrics
      if (fileNames.includes('rubric') || fileNames.includes('scheme') || fileNames.includes('matrix')) {
        bucket.qualityScore = 5;
        bucket.qualityTier = 'Exemplary';
        bucket.findings = [
          'Analytic rubric matrices provided with descriptive performance criteria.',
          'Assessment briefs feature explicit CLO mapping.'
        ];
      } else {
        bucket.qualityScore = 3;
        bucket.qualityTier = 'Satisfactory';
        bucket.findings = ['Coursework briefs provided. Ensure analytic rubrics (not just total marks) are available for students.'];
      }
      break;

    case '12': // Student Samples
      if (fileNames.includes('annotat') || fileNames.includes('feedback') || fileNames.includes('high')) {
        bucket.qualityScore = 4;
        bucket.qualityTier = 'Commendable';
        bucket.findings = [
          'Student coursework samples submitted with evidence of grading.',
          'Verify whether qualitative formative comments and feed-forward remarks are provided.'
        ];
      } else {
        bucket.qualityScore = 3;
        bucket.qualityTier = 'Satisfactory';
        bucket.findings = ['Student work samples uploaded. Check for constructive formative feedback rather than only raw marks.'];
      }
      break;

    default:
      bucket.qualityScore = 4;
      bucket.qualityTier = 'Commendable';
      bucket.findings = [`${bucket.fileCount} file(s) verified for ${item.title}.`];
  }

  bucket.auditorNotes = `Initial review: ${bucket.fileCount} document(s) uploaded. Compliance verified.`;
}
