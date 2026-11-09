// Comprehensive Teaching & Learning Quality Audit Standards (OBE & Accreditation Framework)
// Exactly aligned with Faculty Accreditation & University Quality Guidelines:
// 00 TEACHING FILE COVER PAGE
// 01 DETAILS OF STUDENTS' RESULTS
// 02 OBE ASSESSMENT
// 03 COURSE SYLLABUS
// 04 TEACHING PLAN
// 05 TIME TABLE OF LECTURER
// 06 STUDENT MONTHLY ATTENDANCE
// 07 REPORT BY LECTURER
// 08 TEACHING MATERIALS
// 09 MODERATE FINAL EXAM WITH MARKING SCHEME
// 10 FINAL EXAM SCRIPTS
// 11 COURSEWORK WITH MARKING SCHEME
// 12 SAMPLES OF STUDENTS WORK
// 13 MISCELLANEOUS RECORDS

export const QUALITY_PILLARS = [
  {
    id: 'alignment',
    name: 'Constructive Alignment & Bloom Rigor',
    code: 'PIL-1',
    weight: 25,
    icon: 'Target',
    color: '#3b82f6', // blue
    description: 'Direct alignment between Course Learning Outcomes (CLOs), Programme Outcomes (PLOs), instructional tasks, and assessment Bloom taxonomy depth.',
    keyQuestions: [
      'Do CLOs map to appropriate cognitive (C1-C6), psychomotor (P1-P7), or affective (A1-A5) domains?',
      'Do assessment questions truly demand the cognitive depth promised in the CLO (e.g. synthesis vs simple recall)?',
      'Is student learning time (SLT) realistic for the proposed outcomes?'
    ]
  },
  {
    id: 'assessment',
    name: 'Assessment Rigor & Rubric Quality',
    code: 'PIL-2',
    weight: 20,
    icon: 'CheckSquare',
    color: '#8b5cf6', // purple
    description: 'Validity, clarity, and moderation of continuous assessment and exam papers, supported by analytic descriptive rubrics.',
    keyQuestions: [
      'Are assessment rubrics criteria-referenced with distinct performance level descriptions (Distinction to Fail)?',
      'Is there verified evidence of pre-moderation (before exam/coursework release) and post-moderation?',
      'Is the assessment weighting balanced and aligned with university regulations?'
    ]
  },
  {
    id: 'marking',
    name: 'Marking Rigor & Formative Feedback',
    code: 'PIL-3',
    weight: 20,
    icon: 'Edit3',
    color: '#10b981', // green
    description: 'Fairness of evaluation in representative student scripts (High, Mid, Low) and presence of actionable formative comments.',
    keyQuestions: [
      'Did the lecturer provide actionable written feed-forward remarks, or solely numerical grades?',
      'Is marking calibrated consistently against the published rubric scheme?',
      'Are representative samples (3 High, 3 Mid, 3 Low) complete, preserved, and accurately graded?'
    ]
  },
  {
    id: 'cqi',
    name: 'CQI & Closing the Loop',
    code: 'PIL-4',
    weight: 15,
    icon: 'TrendingUp',
    color: '#f59e0b', // amber
    description: 'Continual Quality Improvement depth, root-cause diagnosis of CLO gaps, and implementation of concrete pedagogical enhancements.',
    keyQuestions: [
      'Did the lecturer analyze why students underperformed on specific CLOs or assessment tasks?',
      'Are proposed CQI interventions concrete, actionable, and pedagogical (rather than generic)?',
      'Did the lecturer reflect on and track the previous semester’s CQI action plan?'
    ]
  },
  {
    id: 'curriculum',
    name: 'Curriculum Currency & Learning Resources',
    code: 'PIL-5',
    weight: 10,
    icon: 'BookOpen',
    color: '#06b6d4', // cyan
    description: 'Quality and contemporary relevance of teaching slides, studio briefs, readings, and digital learning assets.',
    keyQuestions: [
      'Are references contemporary (published within the last 5 years where applicable)?',
      'Are lecture slides and tutorial briefs detailed, contemporary, and digitally accessible?',
      'Is weekly syllabus progression logical and paced appropriately across 14 teaching weeks?'
    ]
  },
  {
    id: 'governance',
    name: 'Student Voice & Academic Governance',
    code: 'PIL-6',
    weight: 10,
    icon: 'Users',
    color: '#ec4899', // pink
    description: 'Student attendance monitoring (>80% threshold enforcement) and lecturer responsiveness to student course evaluations.',
    keyQuestions: [
      'Were at-risk students (<80% attendance) flagged early with documented counseling or warning letters?',
      'Did the lecturer address student rating trends and qualitative critique in their course report?',
      'Are administrative records (timetable, syllabus sign-offs, permits) officially endorsed?'
    ]
  }
];

export const TEACHING_FILE_ITEMS = [
  {
    id: '00',
    code: 'Folder 00',
    title: 'Teaching File Cover Page',
    driveFolderName: '00 TEACHING FILE COVER PAGE',
    pillarId: 'governance',
    essentialKeywords: ['cover', 'cover page', 'frontpage', 'teaching file cover', 'portfolio cover', '00'],
    complianceCriteria: [
      'Official institutional course cover page completed with course code, title, and session.',
      'Lecturer name, department, credit hours, and faculty indicated accurately.',
      'Verified and signed by course coordinator or HOD.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Completeness & Institutional Branding',
        description: 'Standard faculty cover template properly filled with all academic parameters verified.',
        benchmark: '100% complete metadata with institutional endorsement.'
      }
    ]
  },
  {
    id: '01',
    code: 'Folder 01',
    title: "Details of Students' Results",
    driveFolderName: "01 DETAILS OF STUDENTS' RESULTS",
    pillarId: 'governance',
    essentialKeywords: ['results', 'gradebook', 'marks', 'student results', 'mark sheet', 'summary of marks', '01'],
    complianceCriteria: [
      'Complete official gradebook sheet with itemized continuous assessment and final scores.',
      'Grade distribution summary (A, B, C, D, F) matching faculty senate records.',
      'Endorsed by department exam coordinator / HOD.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Grade Distribution Fairness & Curve',
        description: 'Analysis of score spread and standard deviation across distinction, pass, and fail ranges.',
        benchmark: 'Balanced score distribution with documented justification for anomalies.'
      }
    ]
  },
  {
    id: '02',
    code: 'Folder 02',
    title: 'OBE Assessment',
    driveFolderName: '02 OBE ASSESSMENT',
    pillarId: 'alignment',
    essentialKeywords: ['obe', 'obe assessment', 'clo attainment', 'plo attainment', 'assessment plan', 'obe matrix', '02'],
    complianceCriteria: [
      'Explicit Course Learning Outcomes (CLOs) to Programme Outcomes (PLOs) mapping matrix.',
      'Target vs actual CLO attainment percentages calculated for the student cohort.',
      'Assessment breakdown aligned with prescribed cognitive, psychomotor, or affective domains.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'OBE Constructive Alignment & Attainment Tracking',
        description: 'All assessments measure designated Bloom taxonomy levels with measurable attainment KPI (e.g. >=75% students score >=50%).',
        benchmark: 'Documented cohort CLO attainment analysis showing closed-loop evaluation.'
      }
    ]
  },
  {
    id: '03',
    code: 'Folder 03',
    title: 'Course Syllabus',
    driveFolderName: '03 COURSE SYLLABUS',
    pillarId: 'alignment',
    essentialKeywords: ['syllabus', 'course syllabus', 'course info', 'approved syllabus', 'course profile', 'proforma', '03'],
    complianceCriteria: [
      'Approved syllabus signed by Head of Department / Dean.',
      'Student Learning Time (SLT) reflects 40 hours per credit (120-160 hours total).',
      'Cognitive and psychomotor action verbs clearly defined.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Syllabus Approval & SLT Coherence',
        description: 'Syllabus reflects the official accredited program handbook and specifies weekly topic progression.',
        benchmark: 'Fully validated syllabus with clear prerequisites and credit allocation.'
      }
    ]
  },
  {
    id: '04',
    code: 'Folder 04',
    title: 'Teaching Plan',
    driveFolderName: '04 TEACHING PLAN',
    pillarId: 'curriculum',
    essentialKeywords: ['teaching plan', 'weekly plan', 'schedule', 'lesson plan', 'course outline', 'weekly outline', '04'],
    complianceCriteria: [
      'Detailed 14-week teaching and learning plan distributed to students in Week 1.',
      'Itemized schedule of lectures, studios, tutorials, and submission milestones.',
      'Clear references to weekly readings and assigned tasks.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Pacing & Pedagogical Progression',
        description: 'Logical sequencing from introductory concepts to complex problem-solving without excessive crunch before deadlines.',
        benchmark: 'Well-paced weekly progression distributed early to students.'
      }
    ]
  },
  {
    id: '05',
    code: 'Folder 05',
    title: 'Time Table of Lecturer',
    driveFolderName: '05 TIME TABLE OF LECTURER',
    pillarId: 'governance',
    essentialKeywords: ['time table', 'timetable', 'lecturer timetable', 'consultation hours', 'venue', '05'],
    complianceCriteria: [
      'Official departmental master semester timetable indicating designated studio/lecture contact hours.',
      'Designated consultation / office hours clearly scheduled for student academic mentoring.',
      'Studio venue and studio master assignment confirmed.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Consultation Availability & Venue Allocation',
        description: 'Scheduled office hours provide sufficient access (minimum 2-4 hours weekly) for struggling students.',
        benchmark: 'Officially endorsed timetable with accessible student advisory slots.'
      }
    ]
  },
  {
    id: '06',
    code: 'Folder 06',
    title: 'Student Monthly Attendance',
    driveFolderName: '06 STUDENT MONTHLY ATTENDANCE',
    pillarId: 'governance',
    essentialKeywords: ['attendance', 'monthly attendance', 'student attendance', 'absence', 'barring', '80% threshold', '06'],
    complianceCriteria: [
      'Monthly/weekly signed student attendance logs or verified digital LMS attendance exports.',
      'Overall attendance percentage computed for all registered students.',
      'Early warning notifications issued to students at risk of falling below the 80% threshold.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Attendance Integrity & Early Intervention',
        description: 'Proactive counseling letters and official warnings documented prior to barring threshold enforcement.',
        benchmark: 'Comprehensive attendance tracking with verified absence justifications.'
      }
    ]
  },
  {
    id: '07',
    code: 'Folder 07',
    title: 'Report by Lecturer',
    driveFolderName: '07 REPORT BY LECTURER',
    pillarId: 'cqi',
    essentialKeywords: ['report by lecturer', 'course report', 'end of semester report', 'cqi review', 'reflection', '07'],
    complianceCriteria: [
      'Official End of Semester Course Report completed and signed by lecturer.',
      'Critical reflection on student attainment, cohort challenges, and external jury feedback.',
      'Concrete SMART Continual Quality Improvement (CQI) action plan for subsequent offerings.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Root-Cause Pedagogical Reflection & Closing the Loop',
        description: 'Deep analytical insight examining instructional strengths and identifying concrete pedagogical adjustments rather than superficial remarks.',
        benchmark: 'Clear evidence of closing the quality loop from previous semester CQI.'
      }
    ]
  },
  {
    id: '08',
    code: 'Folder 08',
    title: 'Teaching Materials',
    driveFolderName: '08 TEACHING MATERIALS',
    pillarId: 'curriculum',
    essentialKeywords: ['teaching materials', 'slides', 'lecture notes', 'briefs', 'handouts', 'tutorials', '08'],
    complianceCriteria: [
      'Comprehensive instructional slide decks, tutorial briefs, and technical drawing guides across all modules.',
      'Uploaded to LMS or Google Drive and accessible to students.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Contemporary Relevancy & Instructional Quality',
        description: 'Visually rich, contemporary instructional materials incorporating real-world case studies, current software tools, and statutory codes.',
        benchmark: 'High pedagogical depth supporting self-directed learner inquiry.'
      }
    ]
  },
  {
    id: '09',
    code: 'Folder 09',
    title: 'Moderate Final Exam with Marking Scheme',
    driveFolderName: '09 MODERATE FINAL EXAM WITH MARKING SCHEME',
    pillarId: 'assessment',
    essentialKeywords: ['moderate final exam', 'final exam', 'exam paper', 'marking scheme', 'pre-moderation', 'vetting', '09'],
    complianceCriteria: [
      'Complete final examination paper and itemized solution marking scheme.',
      'Pre-moderation vetting committee forms signed prior to exam execution.',
      'Note: For 100% Coursework courses, this folder is officially marked EXEMPT.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Moderation Rigor & Objective Grading Criteria',
        description: 'Evidence that question clarity, Bloom level mapping, and time allocations were vetted by internal examiners.',
        benchmark: 'Transparent marking schemes with reproducible rubrics (or official 100% Coursework exemption).'
      }
    ]
  },
  {
    id: '10',
    code: 'Folder 10',
    title: 'Final Exam Scripts',
    driveFolderName: '10 FINAL EXAM SCRIPTS',
    pillarId: 'marking',
    essentialKeywords: ['final exam scripts', 'exam scripts', 'answer booklets', 'high mid low scripts', '10'],
    complianceCriteria: [
      'Representative sample scripts (3 High, 3 Mid, 3 Low scores) with itemized examiner marks.',
      'Post-moderation counter-signature by second examiner.',
      'Note: For 100% Coursework courses, this folder is officially marked EXEMPT.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Marking Consistency & Post-Moderation',
        description: 'Fair and calibrated grading matching the published scheme across distinction and threshold pass scripts.',
        benchmark: 'Verified sample scripts with post-moderation endorsement (or official 100% Coursework exemption).'
      }
    ]
  },
  {
    id: '11',
    code: 'Folder 11',
    title: 'Coursework with Marking Scheme',
    driveFolderName: '11 COURSEWORK WITH MARKING SCHEME',
    pillarId: 'assessment',
    essentialKeywords: ['coursework', 'coursework with marking scheme', 'project brief', 'assignment brief', 'rubrics', 'rubric matrix', '11'],
    complianceCriteria: [
      'All project briefs, assignment sheets, and studio design problem statements uploaded.',
      'Explicit analytic rubric matrices detailing performance descriptors (Exemplary to Unsatisfactory) for each criterion.',
      'Weightage breakdown matching approved course syllabus.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Descriptive Rubric Quality & Authentic Tasks',
        description: 'Rubrics communicate clear performance standards so students understand criteria before submission.',
        benchmark: 'Thorough descriptive matrices mapped directly to target CLOs.'
      }
    ]
  },
  {
    id: '12',
    code: 'Folder 12',
    title: 'Samples of Students Work',
    driveFolderName: '12 SAMPLES OF STUDENTS WORK',
    pillarId: 'marking',
    essentialKeywords: ['samples of students work', 'student coursework samples', 'student work', 'high mid low coursework', '12'],
    complianceCriteria: [
      'Representative student work samples (3 High, 3 Mid, 3 Low scores) for every major project/coursework.',
      'Marked with student identifier and corresponding rubric grading sheets.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Actionable Formative Feedback (Feed-Forward)',
        description: 'Direct qualitative annotations, pin-up jury comments, and constructive critiques identifying strengths and remediation areas.',
        benchmark: 'Demonstrated feed-forward remarks fostering student creative and technical growth.'
      }
    ]
  },
  {
    id: '13',
    code: 'Folder 13',
    title: 'Miscellaneous Records',
    driveFolderName: '13 MISCELLANEOUS RECORDS',
    pillarId: 'governance',
    isOptional: true, // Not mandatory - only filed if special student records/cases occurred
    essentialKeywords: ['miscellaneous', 'miscellaneous records', 'mc', 'medical certificate', 'deferment', 'correspondence', '13'],
    complianceCriteria: [
      'Optional / As-needed records: Medical certificates (MC), student deferment letters, special makeups, or faculty correspondence.',
      'Note: This folder is NOT mandatory. If no special incidents occurred during the semester, it can be left empty without any compliance penalty.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Procedural Fairness & Academic Governance (Optional)',
        description: 'Equitable administration of student makeup requests and regulatory compliance when special incidents arise.',
        benchmark: 'Accurate record keeping if special incidents exist; otherwise fully compliant as Nil records.'
      }
    ]
  }
];

export const QUALITY_TIERS = [
  { minScore: 90, label: 'Exemplary', badge: 'Tier 1 - Exemplary Quality', color: '#10b981', summary: 'Outstanding constructive alignment, rigorous descriptive rubrics, rich formative feedback, and actionable CQI.' },
  { minScore: 75, label: 'Commendable', badge: 'Tier 2 - Commendable Quality', color: '#3b82f6', summary: 'Solid pedagogical standards meeting accreditation requirements with minor opportunities for continuous refinement.' },
  { minScore: 60, label: 'Satisfactory', badge: 'Tier 3 - Meets Basic Standards', color: '#f59e0b', summary: 'Compliant with basic submission rules, but lacks deep formative feedback or robust CQI action plans.' },
  { minScore: 0, label: 'Remediation Required', badge: 'Tier 4 - Quality Risk', color: '#ef4444', summary: 'Substantial gaps in constructive alignment, missing moderation evidence, unannotated student work, or weak CQI.' }
];
