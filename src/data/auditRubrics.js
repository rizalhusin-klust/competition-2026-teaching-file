// Comprehensive Teaching & Learning Quality Audit Standards (OBE & Accreditation Framework)

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
    name: 'Curriculum Currency & Materials',
    code: 'PIL-5',
    weight: 10,
    icon: 'BookOpen',
    color: '#06b6d4', // cyan
    description: 'Up-to-date learning resources, syllabus currency, industry relevance, and engaging instructional materials.',
    keyQuestions: [
      'Are core textbook references and journal readings published within the last 5 years?',
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
    id: '01',
    code: 'Folder 01',
    title: 'Course Syllabus & Course Outline',
    driveFolderName: '01 Course Syllabus & Course Outline',
    pillarId: 'alignment',
    essentialKeywords: ['syllabus', 'outline', 'clo', 'plo', 'learning outcomes', 'credit hours', 'weekly plan'],
    complianceCriteria: [
      'Course code, title, and credit hours match academic handbook.',
      'Approved and signed by Head of Department / Dean.',
      'Explicit mapping between CLOs, PLOs, and Bloom Taxonomy domain levels.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Constructive Alignment Clarity',
        description: 'CLOs use measurable action verbs according to Bloom’s Taxonomy (e.g., Analyze, Evaluate, Synthesize rather than Understand, Know).',
        benchmark: '100% of CLOs possess precise cognitive/psychomotor verbs and clear attainment thresholds.'
      },
      {
        criterion: 'SLT Workload Coherence',
        description: 'Total Student Learning Time (SLT) reflects 40 hours per credit (e.g., 120-160h for a 3-4 credit course) realistically split between face-to-face and independent study.',
        benchmark: 'Transparent breakdown of lecture, tutorial, studio, and self-study hours.'
      }
    ]
  },
  {
    id: '02',
    code: 'Folder 02',
    title: 'Time Table',
    driveFolderName: '02 Time Table',
    pillarId: 'governance',
    essentialKeywords: ['timetable', 'time table', 'schedule', 'venue', 'studio hours', 'contact hours'],
    complianceCriteria: [
      'Official academic calendar semester timetable uploaded.',
      'Contact hours correspond with syllabus credit requirements.',
      'Venue and consultation hours indicated.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Consultation Availability',
        description: 'Designated lecturer consultation / office hours clearly scheduled and communicated to support struggling learners.',
        benchmark: 'Minimum 2-4 hours per week dedicated for student mentoring and academic advisory.'
      }
    ]
  },
  {
    id: '03',
    code: 'Folder 03',
    title: 'Continuous Assessment Plan',
    driveFolderName: '03 Continuous Assessment Plan',
    pillarId: 'assessment',
    essentialKeywords: ['assessment plan', 'continuous assessment', 'weightage', 'deadlines', 'coursework breakdown'],
    complianceCriteria: [
      'Complete table of all assessment components with percentage weightages summing to 100%.',
      'Submission deadlines scheduled systematically across weeks (avoiding end-of-semester bunching).',
      'Distributed to students during Week 1 of the semester.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Assessment Spacing & Pacing',
        description: 'Assessments are scaffolded progressively from formative checkpoints to summative submissions, enabling feed-forward improvement.',
        benchmark: 'At least one major formative checkpoint before Week 7 so students know their standing.'
      },
      {
        criterion: 'CLO Coverage Balance',
        description: 'Weightages assigned to each assessment component proportionally match the complexity and domain of the mapped CLO.',
        benchmark: 'Every CLO is tested with appropriate depth without overloading a single outcome.'
      }
    ]
  },
  {
    id: '04',
    code: 'Folder 04',
    title: 'List of References',
    driveFolderName: '04 List of References',
    pillarId: 'curriculum',
    essentialKeywords: ['references', 'bibliography', 'reading list', 'textbook', 'journal', 'digital resources'],
    complianceCriteria: [
      'Prescribed core textbooks and supplementary references listed.',
      'Available in physical university library or institutional digital repositories.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Reference Currency (<5 Years)',
        description: 'At least 60% of listed books, industry standards, and journal articles published within the last 5 years, ensuring cutting-edge knowledge.',
        benchmark: 'References reflect modern computational, sustainability, or industry advancements.'
      },
      {
        criterion: 'Digital & Open Access Accessibility',
        description: 'Links, DOIs, or digital library codes provided for student ease of access.',
        benchmark: 'No broken links; accessible via university library portal.'
      }
    ]
  },
  {
    id: '05',
    code: 'Folder 05',
    title: 'Student Attendance List',
    driveFolderName: '05 Student Attendance List',
    pillarId: 'governance',
    essentialKeywords: ['attendance', 'absence', 'roster', '80% threshold', 'barring list', 'student list'],
    complianceCriteria: [
      'Complete weekly attendance logs for lecture and studio sessions.',
      'Summary percentage calculated for all registered students.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Early Warning & Remediation (<80%)',
        description: 'Lecturer identifies students absent for more than 2 consecutive sessions early; documented warning letters or counseling records.',
        benchmark: 'Proactive intervention recorded before barring threshold is reached.'
      },
      {
        criterion: 'Integrity & Verification',
        description: 'Signatures or digital LMS timestamp logs verified without retroactive bulk-marking.',
        benchmark: 'Verified logs with justification for excused absences (MC/Official Letter).'
      }
    ]
  },
  {
    id: '06',
    code: 'Folder 06',
    title: 'Student Course Evaluation Report',
    driveFolderName: '06 Student Course Evaluation Report',
    pillarId: 'governance',
    essentialKeywords: ['evaluation', 'feedback', 'student survey', 'rating', 'likert', 'comments', 'critique'],
    complianceCriteria: [
      'Institutional student feedback report generated and included in folder.',
      'Response rate indicated (aim for >= 70% participation).'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Student Satisfaction & Trend Analysis',
        description: 'Overall student satisfaction rating and analysis across teaching clarity, assessment fairness, and learning resource quality.',
        benchmark: 'Average score >= 4.0 / 5.0 (or >= 80%); constructive analysis of recurring student concerns.'
      },
      {
        criterion: 'Lecturer Feedback Closing',
        description: 'Lecturer reviews student qualitative remarks in their final report, explaining actions taken or planned in response.',
        benchmark: 'Transparent acknowledgement of student feedback and practical remedial steps.'
      }
    ]
  },
  {
    id: '07',
    code: 'Folder 07',
    title: 'Report by Lecturer & CQI Review',
    driveFolderName: '07 Report by Lecturer',
    pillarId: 'cqi',
    essentialKeywords: ['lecturer report', 'cqi', 'reflection', 'attainment review', 'closing the loop', 'action plan'],
    complianceCriteria: [
      'Official End of Semester Course Report completed and signed.',
      'CLO and PLO attainment percentages calculated for the entire cohort.',
      'CQI section filled with Strengths, Weaknesses, and Action Plan.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Root-Cause Attainment Analysis',
        description: 'Deep pedagogical reflection explaining why specific CLOs attained or missed targets (e.g. prerequisite knowledge deficit, software learning curve).',
        benchmark: 'Avoids superficial statements like "students need to study harder"; investigates teaching methods.'
      },
      {
        criterion: 'SMART CQI Action Plan',
        description: 'Specific, Measurable, Achievable, Relevant, and Time-bound enhancements formulated for next semester offering.',
        benchmark: 'Identifies concrete intervention (e.g. "Week 6 peer critiquing session", "supplementary Revit BIM video module").'
      },
      {
        criterion: 'Loop Closing Evidence',
        description: 'Verification that enhancements promised in previous semester’s CQI report were actually executed this semester.',
        benchmark: 'Demonstrated improvement in previously flagged weak areas.'
      }
    ]
  },
  {
    id: '08',
    code: 'Folder 08',
    title: 'Teaching Materials',
    driveFolderName: '08 Teaching Materials',
    pillarId: 'curriculum',
    essentialKeywords: ['slides', 'lecture notes', 'briefs', 'tutorials', 'handouts', 'recordings', 'learning materials'],
    complianceCriteria: [
      'Learning materials for all 14 teaching weeks uploaded in organized structure.',
      'Covers all topic modules outlined in the approved course syllabus.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Pedagogical Depth & Clarity',
        description: 'Slides and materials contain rich conceptual depth, explanatory diagrams, case studies, and practical examples rather than sparse bullet points.',
        benchmark: 'Demonstrates modern instructional design with interactive prompts and learning activities.'
      },
      {
        criterion: 'Industry Relevancy & Technology Adoption',
        description: 'Incorporates current industry tools, real-world case studies, professional ethics, or sustainable design considerations.',
        benchmark: 'Exposure to contemporary professional practice.'
      }
    ]
  },
  {
    id: '09',
    code: 'Folder 09',
    title: 'Moderated Final Exam with Marking Scheme',
    driveFolderName: '09 Moderated Final Exam with Marking Scheme',
    pillarId: 'assessment',
    essentialKeywords: ['moderated exam', 'marking scheme', 'answer key', 'pre-moderation', 'vetting', 'exam paper'],
    complianceCriteria: [
      'Complete final examination paper included.',
      'Full, detailed marking scheme / solution key with mark distribution per sub-question.',
      'Internal and external moderation vetting forms signed before exam date.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Pre-Moderation Rigor & Constructive Changes',
        description: 'Evidence that vetting committee reviewed question clarity, timing, Bloom taxonomy levels, and lecturer executed recommended amendments.',
        benchmark: 'Signed moderation report showing active feedback and pre-exam paper revisions.'
      },
      {
        criterion: 'Marking Scheme Granularity',
        description: 'Marking scheme provides clear partial-credit rules, expected formula derivations, keywords, or alternative valid methodologies.',
        benchmark: 'Objective, transparent, and reproducible grading criteria.'
      }
    ]
  },
  {
    id: '10',
    code: 'Folder 10',
    title: 'Final Exam Scripts (3 High, 3 Mid, 3 Low)',
    driveFolderName: '10 Final Exam Scripts (3 higher, 3 lower, and 3 middle scores)',
    pillarId: 'marking',
    essentialKeywords: ['exam scripts', 'high mid low', '3 higher 3 lower', 'moderation scripts', 'graded answer booklets'],
    complianceCriteria: [
      'Exactly 9 representative exam scripts included: 3 High, 3 Mid, 3 Low scores.',
      'Marks accurately totaled and synchronized with official gradebook.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Marking Consistency & Post-Moderation',
        description: 'Consistent grading standards applied across all scripts without arbitrary mark deductions or inflation; post-moderation sampling verified.',
        benchmark: 'Clear checkmarks, itemized scores matching the scheme, and second-examiner post-moderation signature.'
      },
      {
        criterion: 'Grade Differentiation Quality',
        description: 'High, Mid, and Low samples show clear intellectual distinctions reflecting different levels of CLO mastery.',
        benchmark: 'Representative spread across top distinction, median competence, and minimum pass/fail threshold.'
      }
    ]
  },
  {
    id: '11',
    code: 'Folder 11',
    title: 'Coursework with Marking Schemes / Rubrics',
    driveFolderName: '11 Coursework with Marking Schemes',
    pillarId: 'assessment',
    essentialKeywords: ['coursework briefs', 'project brief', 'assignment', 'rubric matrix', 'marking guide', 'marking schemes'],
    complianceCriteria: [
      'All continuous assessment briefs (assignments, studio projects, tests, quizzes) uploaded.',
      'Each brief explicitly states objectives, submission guidelines, deadlines, and CLO mapping.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Analytic Rubric Quality & Descriptors',
        description: 'Rubric matrices feature qualitative descriptors across all scoring tiers (Exemplary, Proficient, Developing, Inadequate) rather than just numbers.',
        benchmark: 'Students understand exactly what constitutes excellence versus mediocrity before attempting the task.'
      },
      {
        criterion: 'Authentic & Problem-Based Learning',
        description: 'Coursework tasks present authentic, real-world scenario challenges that test application, creativity, and critical judgment.',
        benchmark: 'High engagement projects that stimulate professional competence.'
      }
    ]
  },
  {
    id: '12',
    code: 'Folder 12',
    title: 'Samples of Student Coursework (3 High, 3 Mid, 3 Low)',
    driveFolderName: '12 Samples of Student Coursework',
    pillarId: 'marking',
    essentialKeywords: ['coursework samples', 'student work', '3 high 3 mid 3 low', 'graded projects', 'submission samples'],
    complianceCriteria: [
      'Representative student submissions (3 High, 3 Mid, 3 Low) for EVERY major coursework component.',
      'Identified with student matric number and score awarded.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Constructive Formative Feedback (Feed-Forward)',
        description: 'Lecturer provides meaningful qualitative annotations, margin notes, critiques, and actionable guidance directly on student work.',
        benchmark: 'Work includes personalized guidance on strengths and specific areas to refine, not just a bare grade.'
      },
      {
        criterion: 'Rubric Score Calibration',
        description: 'Marks awarded on the sample work strictly match the published rubric matrix performance criteria.',
        benchmark: 'Traceable alignment between qualitative student output and rubric score bands.'
      }
    ]
  },
  {
    id: '13',
    code: 'Folder 13',
    title: 'Miscellaneous Records',
    driveFolderName: '13 Miscellaneous Records',
    pillarId: 'governance',
    essentialKeywords: ['miscellaneous', 'mc', 'medical certificate', 'exemption', 'add drop', 'permits', 'correspondence'],
    complianceCriteria: [
      'Records of special circumstances, medical certificates, deferment letters, or formal academic correspondence.',
      'If no special cases occurred, a signed declaration statement confirming "Nil records" is provided.'
    ],
    qualityAuditCriteria: [
      {
        criterion: 'Fairness & Compliance with University Regulations',
        description: 'Proper procedural handling of student exemptions, makeup assessments, or approved deadline extensions.',
        benchmark: 'Documented approvals ensuring equity and compliance with academic senate bylaws.'
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
