// Pre-loaded realistic sample courses for internal auditor testing and benchmarking

export const SAMPLE_COURSES = [
  {
    id: 'course_arc3126',
    code: 'ARC 3126',
    name: 'Architectural Design Studio III',
    program: 'Bachelor of Science in Architecture',
    semester: 'Semester 1 - 2026/2027',
    lecturer: 'Ar. Rizal bin Husin',
    creditHours: 4,
    driveFolderUrl: 'https://drive.google.com/drive/folders/1JwFjnGtv_vlHhuC3U5zOAgppdc6S3a0V1ji',
    auditDate: '2026-11-04',
    auditorName: 'Prof. Ts. Dr. Hishamuddin bin Mohd (Chief Internal Auditor)',
    headOfDepartment: 'Prof. Ar. Dr. Norwina Mohd Nawawi (Head of Architecture)',
    auditStatus: 'Completed - Minor CQI Actions Required',
    overallQualityIndex: 84, // 84% Commendable
    complianceRate: 100, // All 13 folders submitted
    clos: [
      {
        id: 'clo1',
        code: 'CLO 1',
        description: 'Synthesize site context, microclimate, zoning by-laws, and urban cultural heritage into a coherent conceptual masterplan.',
        ploCode: 'PLO 1 (Disciplinary Knowledge & Theory)',
        domain: 'Cognitive',
        bloomLevel: 'C5 (Synthesis & Creation)',
        targetAttainmentPct: 75,
        actualAttainmentPct: 88,
        status: 'Achieved'
      },
      {
        id: 'clo2',
        code: 'CLO 2',
        description: 'Formulate detailed structural framing systems, spatial tectonic joints, and passive environmental bioclimatic solutions.',
        ploCode: 'PLO 2 (Practical, Technical & Design Execution)',
        domain: 'Psychomotor',
        bloomLevel: 'P5 (Complex Overt Response)',
        targetAttainmentPct: 75,
        actualAttainmentPct: 71,
        status: 'Margin Miss (-4%)'
      },
      {
        id: 'clo3',
        code: 'CLO 3',
        description: 'Defend architectural design decisions persuasively through coordinated technical drawings, physical models, and verbal jury critique.',
        ploCode: 'PLO 4 (Communication & Verbal Critique)',
        domain: 'Affective',
        bloomLevel: 'A3 (Valuing & Justification)',
        targetAttainmentPct: 80,
        actualAttainmentPct: 85,
        status: 'Achieved'
      }
    ],
    assessments: [
      { id: 'ass1', name: 'Project 1: Site Analysis & Precedent Synthesis', weight: 20, cloId: 'clo1', type: 'Studio Coursework', maxMarks: 100 },
      { id: 'ass2', name: 'Project 2A: Schematic Design & Interim Review', weight: 30, cloId: 'clo2', type: 'Studio Coursework', maxMarks: 100 },
      { id: 'ass3', name: 'Project 2B: Final Master Drawings & Model Presentation', weight: 50, cloId: 'clo3', type: 'Studio Coursework (Final)', maxMarks: 100 }
    ],
    studentMetrics: {
      totalStudents: 32,
      passedStudents: 30,
      passRate: 93.8,
      averageMark: 76.4,
      highestMark: 92,
      lowestMark: 48,
      gradeDistribution: { 'A': 8, 'B': 16, 'C': 6, 'D/F': 2 }
    },
    folderAudits: {
      '01': {
        submitted: true,
        fileCount: 3,
        files: [
          { name: 'ARC3126_Course_Syllabus_Approved_2026.pdf', size: '2.4 MB', updated: '2026-09-02', driveLink: 'https://drive.google.com' },
          { name: 'Course_Outline_Week_1_to_14_Schedule.pdf', size: '820 KB', updated: '2026-09-04', driveLink: 'https://drive.google.com' },
          { name: 'LAM_Part1_Accreditation_Mapping_Matrix.xlsx', size: '450 KB', updated: '2026-09-03', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 5,
        qualityTier: 'Exemplary',
        findings: [
          'Exemplary constructive alignment: All 3 CLOs are clearly mapped to LAM (Board of Architects Malaysia) Part 1 competencies and MQF level descriptors.',
          'Bloom taxonomy cognitive and psychomotor action verbs are appropriately ambitious (C5 and P5) for a Year 3 design studio.',
          'Student Learning Time (SLT) total is 160 hours for 4 credit hours, properly itemized across lecture, studio critiques, and self-directed modeling.'
        ],
        risks: [],
        auditorNotes: 'Course syllabus is up to date and signed by the Program Director. Syllabus outlines weekly milestones with great clarity.'
      },
      '02': {
        submitted: true,
        fileCount: 1,
        files: [
          { name: 'ARC3126_Timetable_Studio_Venues_Sem1_2026.pdf', size: '340 KB', updated: '2026-09-05', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 4,
        qualityTier: 'Commendable',
        findings: [
          'Studio contact hours (6 studio hours weekly) correspond with curriculum credit weighting.',
          'Designated lecturer consultation schedule (Thursdays 2-4 PM) is explicitly stated.'
        ],
        risks: [],
        auditorNotes: 'Timetable verified with Faculty Master Schedule. Studio venue bookings confirmed.'
      },
      '03': {
        submitted: true,
        fileCount: 2,
        files: [
          { name: 'ARC3126_Continuous_Assessment_Plan_2026.pdf', size: '610 KB', updated: '2026-09-08', driveLink: 'https://drive.google.com' },
          { name: 'Student_Assessment_Briefing_Slide_Week1.pptx', size: '4.8 MB', updated: '2026-09-10', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 5,
        qualityTier: 'Exemplary',
        findings: [
          'Clear progression from formative Site Analysis (20%) in Week 5 to Interim Review (30%) in Week 9, concluding with Final Master Defense (50%) in Week 14.',
          'Assessment plan distributed to students during Week 1 orientation session.',
          'Submission milestones prevent collision with other departmental core subject deadlines.'
        ],
        risks: [],
        auditorNotes: 'Excellent scaffolding. Formative feedback given at Week 5 and Week 9 allows iterative design refinement before final jury.'
      },
      '04': {
        submitted: true,
        fileCount: 1,
        files: [
          { name: 'ARC3126_Reading_List_and_Digital_References.pdf', size: '280 KB', updated: '2026-09-12', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 4,
        qualityTier: 'Commendable',
        findings: [
          'Includes modern architectural publications (Ching’s Building Construction Illustrated 2024, Deplazes Constructing Architecture 2023).',
          '80% of listed references published within the last 5 years with library direct call numbers and digital DOIs.',
          'Includes sustainable design codes: Malaysian Standard MS 1525 (Energy Efficiency in Non-Residential Buildings).'
        ],
        risks: [],
        auditorNotes: 'Well-curated references. Recommending inclusion of 1-2 open-access sustainable urbanism journals for student precedent study.'
      },
      '05': {
        submitted: true,
        fileCount: 2,
        files: [
          { name: 'ARC3126_Studio_Attendance_Log_Full_Semester.xlsx', size: '1.2 MB', updated: '2026-11-01', driveLink: 'https://drive.google.com' },
          { name: 'Attendance_Warning_Letters_Student_Barring_Records.pdf', size: '890 KB', updated: '2026-10-18', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 4,
        qualityTier: 'Commendable',
        findings: [
          'Comprehensive 14-week studio pin-up and lecture attendance logs maintained.',
          'Two students (s5 Danish and s8 Huda) fell below 85% attendance at Week 7; documented warning letters and counseling were conducted.'
        ],
        risks: [],
        auditorNotes: 'Good administrative diligence. Attendance warnings were issued early, successfully preventing final exam barring.'
      },
      '06': {
        submitted: true,
        fileCount: 1,
        files: [
          { name: 'ARC3126_Student_Course_Evaluation_Survey_Report.pdf', size: '1.5 MB', updated: '2026-11-02', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 4,
        qualityTier: 'Commendable',
        findings: [
          'High student response rate of 87.5% (28 of 32 students participated).',
          'Overall lecturer rating: 4.62 / 5.0 (Very High).',
          'Students commended the inspiring studio critiques and real-world site visits, but requested earlier feedback on structural coordination.'
        ],
        risks: [],
        auditorNotes: 'Student satisfaction is very healthy. Lecturer noted the structural coordination comment in the CQI reflection.'
      },
      '07': {
        submitted: true,
        fileCount: 2,
        files: [
          { name: 'ARC3126_End_of_Semester_Course_Report_signed.pdf', size: '3.1 MB', updated: '2026-11-03', driveLink: 'https://drive.google.com' },
          { name: 'CQI_Action_Plan_Implementation_Tracker_2026.xlsx', size: '540 KB', updated: '2026-11-03', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 4,
        qualityTier: 'Commendable',
        findings: [
          'Thorough quantitative CLO attainment analysis: CLO 1 achieved 88% (target 75%), CLO 3 achieved 85% (target 80%).',
          'Identified root cause for CLO 2 slight dip (71% vs 75% target): Students experienced software integration hurdles between Rhino/Grasshopper and structural load simulations.',
          'SMART CQI Action Plan: Introduce an embedded 2-hour structural consultant workshop in Week 7 and pre-model templates for next semester.'
        ],
        risks: [],
        auditorNotes: 'High quality CQI self-reflection. Demonstrates pedagogical maturity and actionable loop closing rather than boilerplate statements.'
      },
      '08': {
        submitted: true,
        fileCount: 8,
        files: [
          { name: 'Week01_Urban_Morphology_and_Site_Forces.pdf', size: '14.2 MB', updated: '2026-09-08', driveLink: 'https://drive.google.com' },
          { name: 'Week04_Bioclimatic_Facade_Design_Techniques.pdf', size: '18.6 MB', updated: '2026-09-29', driveLink: 'https://drive.google.com' },
          { name: 'Week07_Structural_Framing_Systems_and_Long_Spans.pdf', size: '22.1 MB', updated: '2026-10-20', driveLink: 'https://drive.google.com' },
          { name: 'Week11_Graphic_Representation_and_Jury_Protocol.pdf', size: '9.4 MB', updated: '2026-11-01', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 5,
        qualityTier: 'Exemplary',
        findings: [
          'Visually compelling, high-resolution instructional slides combining architectural theory with contemporary case studies (e.g. tropical high-rise precedents).',
          'Studio tutorial handouts include progressive step-by-step pin-up checklists.',
          'All lecture materials uploaded to Google Drive and university LMS 48 hours prior to class sessions.'
        ],
        risks: [],
        auditorNotes: 'Outstanding educational materials that effectively bridge architectural theory with practical tectonic assembly.'
      },
      '09': {
        submitted: true,
        fileCount: 3,
        files: [
          { name: 'ARC3126_Final_Jury_Brief_and_Marking_Scheme_Approved.pdf', size: '1.8 MB', updated: '2026-10-15', driveLink: 'https://drive.google.com' },
          { name: 'Internal_Moderation_Committee_Form_Signed.pdf', size: '750 KB', updated: '2026-10-14', driveLink: 'https://drive.google.com' },
          { name: 'External_Examiner_Studio_Vetting_Endorsement.pdf', size: '820 KB', updated: '2026-10-16', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 5,
        qualityTier: 'Exemplary',
        findings: [
          'Course is 100% coursework studio design; final assessment is a comprehensive Final Jury Project with moderated rubrics.',
          'Pre-moderation vetting completed and signed by Internal Moderation Committee on 2026-10-14 before student issuance.',
          'External Examiner endorsement attached, confirming parity with regional architectural schools.'
        ],
        risks: [],
        auditorNotes: 'Full compliance with Board of Architects Malaysia (LAM) studio moderation guidelines.'
      },
      '10': {
        submitted: true,
        fileCount: 9,
        files: [
          { name: 'Exam_Scripts_High_Score_s7_Lee_95pct.pdf', size: '8.4 MB', updated: '2026-11-04', driveLink: 'https://drive.google.com' },
          { name: 'Exam_Scripts_High_Score_s2_NurSarah_92pct.pdf', size: '7.8 MB', updated: '2026-11-04', driveLink: 'https://drive.google.com' },
          { name: 'Exam_Scripts_High_Score_s4_Divya_88pct.pdf', size: '7.1 MB', updated: '2026-11-04', driveLink: 'https://drive.google.com' },
          { name: 'Exam_Scripts_Mid_Score_s1_AhmadFaiz_82pct.pdf', size: '6.9 MB', updated: '2026-11-04', driveLink: 'https://drive.google.com' },
          { name: 'Exam_Scripts_Mid_Score_s6_SitiAminah_78pct.pdf', size: '6.5 MB', updated: '2026-11-04', driveLink: 'https://drive.google.com' },
          { name: 'Exam_Scripts_Mid_Score_s8_Huda_74pct.pdf', size: '6.2 MB', updated: '2026-11-04', driveLink: 'https://drive.google.com' },
          { name: 'Exam_Scripts_Low_Score_s3_Chong_68pct.pdf', size: '5.8 MB', updated: '2026-11-04', driveLink: 'https://drive.google.com' },
          { name: 'Exam_Scripts_Low_Score_s5_Danish_58pct.pdf', size: '5.5 MB', updated: '2026-11-04', driveLink: 'https://drive.google.com' },
          { name: 'Exam_Scripts_Low_Score_s9_Kannan_48pct.pdf', size: '5.1 MB', updated: '2026-11-04', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 4,
        qualityTier: 'Commendable',
        findings: [
          'Complete submission of representative 9 sample submissions (3 High, 3 Mid, 3 Low).',
          'Marking shows clear grade differentiation across distinct student design competencies.',
          'Internal post-moderation sampling verified and counter-signed by Lead Studio Master.'
        ],
        risks: [
          'For script s9 (marginal fail 48%), auditor notes that second-examiner post-moderation sheet was signed, but margin annotations explaining the specific 2-mark deduction could be more explicit.'
        ],
        auditorNotes: 'Scripts well preserved in digital PDF with high-resolution drawing sheets.'
      },
      '11': {
        submitted: true,
        fileCount: 4,
        files: [
          { name: 'Project_1_Brief_Site_Analysis_Rubric.pdf', size: '1.4 MB', updated: '2026-09-08', driveLink: 'https://drive.google.com' },
          { name: 'Project_2A_Interim_Schematic_Rubric_Matrix.pdf', size: '1.9 MB', updated: '2026-10-02', driveLink: 'https://drive.google.com' },
          { name: 'Project_2B_Final_Jury_Analytic_Rubric.pdf', size: '2.3 MB', updated: '2026-10-18', driveLink: 'https://drive.google.com' },
          { name: 'Studio_Peer_Critique_Evaluation_Form.pdf', size: '420 KB', updated: '2026-10-25', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 5,
        qualityTier: 'Exemplary',
        findings: [
          'Outstanding analytic rubric matrices: Features detailed qualitative descriptors across 5 grade tiers (Exemplary 80-100%, Proficient 70-79%, Competent 60-69%, Marginal 50-59%, Inadequate <50%).',
          'Rubrics clearly distinguish between spatial innovation, structural feasibility, and verbal presentation eloquence.',
          'Rubrics distributed to students prior to project commencement.'
        ],
        risks: [],
        auditorNotes: 'Benchmark quality rubric design. Can serve as a model template for other design studios in the Faculty.'
      },
      '12': {
        submitted: true,
        fileCount: 9,
        files: [
          { name: 'Student_Coursework_P1_High_s7_Annotated.pdf', size: '16.5 MB', updated: '2026-10-12', driveLink: 'https://drive.google.com' },
          { name: 'Student_Coursework_P1_Mid_s1_Annotated.pdf', size: '14.2 MB', updated: '2026-10-12', driveLink: 'https://drive.google.com' },
          { name: 'Student_Coursework_P1_Low_s5_Annotated.pdf', size: '11.8 MB', updated: '2026-10-12', driveLink: 'https://drive.google.com' },
          { name: 'Student_Coursework_P2A_High_s2_Annotated.pdf', size: '21.0 MB', updated: '2026-10-28', driveLink: 'https://drive.google.com' },
          { name: 'Student_Coursework_P2A_Mid_s6_Annotated.pdf', size: '18.4 MB', updated: '2026-10-28', driveLink: 'https://drive.google.com' },
          { name: 'Student_Coursework_P2A_Low_s3_Annotated.pdf', size: '15.9 MB', updated: '2026-10-28', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 4,
        qualityTier: 'Commendable',
        findings: [
          'High quality qualitative feedback: Tutor provided extensive red-line sketch overlays, margin notes, and constructive feed-forward recommendations.',
          'Critique points directly guide the student on how to improve structural integrity and spatial clarity for the subsequent submission.',
          'Awarded marks strictly correlate with the published rubric scoring criteria.'
        ],
        risks: [
          'On two of the Low samples in Project 1, summary feedback was concise; recommended expanding feed-forward remarks for borderline students.'
        ],
        auditorNotes: 'Clear evidence of active teaching and learning dialogue between lecturer and student through formative critique annotations.'
      },
      '13': {
        submitted: true,
        fileCount: 2,
        files: [
          { name: 'Student_Medical_Certificate_Exemption_Log.pdf', size: '480 KB', updated: '2026-10-24', driveLink: 'https://drive.google.com' },
          { name: 'Official_Declaration_of_Records_Signed.pdf', size: '210 KB', updated: '2026-11-04', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 5,
        qualityTier: 'Exemplary',
        findings: [
          'One approved medical certificate for 3-day absence during interim pin-up; makeup presentation session properly recorded and conducted.',
          'Signed official declaration letter confirming completeness of academic records.'
        ],
        risks: [],
        auditorNotes: 'Clean, auditable, and compliant with Faculty Examination Board regulations.'
      }
    },
    qualityPillarScores: {
      alignment: 92, // Exemplary
      assessment: 90, // Exemplary
      marking: 82, // Commendable
      cqi: 80, // Commendable
      curriculum: 85, // Commendable
      governance: 84 // Commendable
    },
    correctiveActions: [
      {
        id: 'car-1',
        category: 'Opportunity for Improvement (OFI)',
        folder: 'Folder 07 / CLO 2',
        description: 'CLO 2 attainment fell 4% short of target (71% vs 75%). Execute the proposed Week 7 structural consultant workshop and report outcomes in next semester CQI.',
        assignedTo: 'Ar. Rizal bin Husin',
        deadline: '2027-04-15',
        status: 'In Progress'
      },
      {
        id: 'car-2',
        category: 'Minor Deficiency (MD)',
        folder: 'Folder 12 / Student Samples',
        description: 'Ensure low-scoring student sample portfolios consistently feature comprehensive written feed-forward guidance to facilitate targeted remedial learning.',
        assignedTo: 'Studio Tutors',
        deadline: '2026-12-01',
        status: 'Closed'
      }
    ]
  },
  {
    id: 'course_cse2104',
    code: 'CSE 2104',
    name: 'Software Engineering & Agile Methodologies',
    program: 'Bachelor of Computer Science (Software Engineering)',
    semester: 'Semester 1 - 2026/2027',
    lecturer: 'Dr. Mazlina binti Abdul Manan',
    creditHours: 3,
    driveFolderUrl: 'https://drive.google.com/drive/folders/1XYZ987SoftwareEngTeachingFile2026',
    auditDate: '2026-11-06',
    auditorName: 'Assoc. Prof. Dr. Aminah binti Mohamed Bakhari (Academic Quality Auditor)',
    headOfDepartment: 'Assoc. Prof. Dr. Shamsul bin Sahibuddin (Head of Computing)',
    auditStatus: 'Pending Minor Rectification (Action Plan Required)',
    overallQualityIndex: 68, // 68% Satisfactory (Needs attention)
    complianceRate: 92.3, // 12 of 13 folders submitted (Folder 10 pending)
    clos: [
      {
        id: 'clo1',
        code: 'CLO 1',
        description: 'Apply Agile Scrum frameworks and Git workflows to synthesize software product backlogs and sprint plans.',
        ploCode: 'PLO 2 (Practical Computing Skills)',
        domain: 'Cognitive',
        bloomLevel: 'C3 (Application)',
        targetAttainmentPct: 70,
        actualAttainmentPct: 82,
        status: 'Achieved'
      },
      {
        id: 'clo2',
        code: 'CLO 2',
        description: 'Evaluate architectural patterns and refactor code for testability, security, and performance.',
        ploCode: 'PLO 3 (Critical Thinking & Analysis)',
        domain: 'Cognitive',
        bloomLevel: 'C5 (Evaluation)',
        targetAttainmentPct: 70,
        actualAttainmentPct: 58,
        status: 'Significant Gap (-12%)'
      },
      {
        id: 'clo3',
        code: 'CLO 3',
        description: 'Demonstrate professional teamwork and ethical peer code review within collaborative sprint retrospectives.',
        ploCode: 'PLO 5 (Ethics & Professional Practice)',
        domain: 'Affective',
        bloomLevel: 'A3 (Valuing)',
        targetAttainmentPct: 75,
        actualAttainmentPct: 78,
        status: 'Achieved'
      }
    ],
    assessments: [
      { id: 'ass1', name: 'Quiz 1 & 2: Agile Concepts', weight: 15, cloId: 'clo1', type: 'Continuous Assessment', maxMarks: 50 },
      { id: 'ass2', name: 'Mid-Term Test: Architecture & Design Patterns', weight: 25, cloId: 'clo2', type: 'Continuous Assessment', maxMarks: 100 },
      { id: 'ass3', name: 'Group Project: Full-Stack Web Application', weight: 30, cloId: 'clo1', type: 'Coursework Project', maxMarks: 100 },
      { id: 'ass4', name: 'Final Examination (Comprehensive Theory & Design)', weight: 30, cloId: 'clo2', type: 'Final Examination', maxMarks: 100 }
    ],
    studentMetrics: {
      totalStudents: 45,
      passedStudents: 38,
      passRate: 84.4,
      averageMark: 67.2,
      highestMark: 88,
      lowestMark: 41,
      gradeDistribution: { 'A': 6, 'B': 20, 'C': 12, 'D/F': 7 }
    },
    folderAudits: {
      '01': {
        submitted: true,
        fileCount: 2,
        files: [
          { name: 'CSE2104_Course_Syllabus_2026.pdf', size: '1.8 MB', updated: '2026-09-01', driveLink: 'https://drive.google.com' },
          { name: 'Weekly_Teaching_Schedule_Agile.pdf', size: '640 KB', updated: '2026-09-02', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 3,
        qualityTier: 'Satisfactory',
        findings: [
          'Course syllabus covers essential IEEE/ACM Software Engineering guidelines.',
          'CLO 2 targets Bloom Level C5 (Evaluation), however Mid-term and Final Exam questions primarily ask for definitions and rote diagram reproduction (C1-C2).'
        ],
        risks: [
          'Quality Flag: Constructive misalignment between CLO 2 high cognitive level (C5) and Lower-Order Thinking Skills (LOTS) assessment questions.'
        ],
        auditorNotes: 'Recommended: Refactor Mid-term questions to include real-world faulty code snippets that students must analyze and refactor.'
      },
      '02': {
        submitted: true,
        fileCount: 1,
        files: [{ name: 'CSE2104_Timetable_Lab_Slots.pdf', size: '280 KB', updated: '2026-09-03', driveLink: 'https://drive.google.com' }],
        qualityScore: 4,
        qualityTier: 'Commendable',
        findings: ['3 hours of weekly computer lab contact hours verified.'],
        risks: [],
        auditorNotes: 'Compliant.'
      },
      '03': {
        submitted: true,
        fileCount: 1,
        files: [{ name: 'CSE2104_Assessment_Scheme_2026.pdf', size: '420 KB', updated: '2026-09-05', driveLink: 'https://drive.google.com' }],
        qualityScore: 4,
        qualityTier: 'Commendable',
        findings: ['Weightage balances 70% coursework and 30% final exam.'],
        risks: [],
        auditorNotes: 'Balanced weight distribution.'
      },
      '04': {
        submitted: true,
        fileCount: 1,
        files: [{ name: 'Reference_List_CSE2104.pdf', size: '310 KB', updated: '2026-09-05', driveLink: 'https://drive.google.com' }],
        qualityScore: 3,
        qualityTier: 'Satisfactory',
        findings: [
          'Main textbook is Pressman Software Engineering 9th Edition (2020).',
          'Several supplementary references are outdated (dating from 2012-2015).'
        ],
        risks: [
          'Quality Flag: Need modern DevSecOps, Cloud Native, and AI-assisted programming references.'
        ],
        auditorNotes: 'Update reference list with modern CI/CD and automated testing literature.'
      },
      '05': {
        submitted: true,
        fileCount: 1,
        files: [{ name: 'CSE2104_Attendance_Sheet_Sem1.xlsx', size: '890 KB', updated: '2026-10-30', driveLink: 'https://drive.google.com' }],
        qualityScore: 4,
        qualityTier: 'Commendable',
        findings: ['Attendance tracked via LMS biometric check-ins; average cohort attendance is 89%.'],
        risks: [],
        auditorNotes: 'Satisfactory attendance records.'
      },
      '06': {
        submitted: true,
        fileCount: 1,
        files: [{ name: 'Student_Evaluation_Summary_CSE2104.pdf', size: '1.1 MB', updated: '2026-11-01', driveLink: 'https://drive.google.com' }],
        qualityScore: 3,
        qualityTier: 'Satisfactory',
        findings: [
          'Survey score: 3.82 / 5.0.',
          'Students raised concerns that project team member contributions were uneven ("free-rider problem").'
        ],
        risks: [
          'Need peer evaluation matrix to prevent team contribution disputes.'
        ],
        auditorNotes: 'Introduce a formal peer-assessment multiplier for the group project.'
      },
      '07': {
        submitted: true,
        fileCount: 1,
        files: [{ name: 'CSE2104_Course_Report_and_CQI_Draft.pdf', size: '2.1 MB', updated: '2026-11-05', driveLink: 'https://drive.google.com' }],
        qualityScore: 3,
        qualityTier: 'Satisfactory',
        findings: [
          'CQI notes the 12% gap in CLO 2 attainment (58% vs 70% target).',
          'However, proposed CQI proposal is generic: "Will advise students to read lecture notes more frequently."'
        ],
        risks: [
          'Quality Flag: CQI action plan is superficial and lacks specific pedagogical intervention or measurable timeline.'
        ],
        auditorNotes: 'Corrective action required: Revise CQI to include practical hands-on lab refactoring drills.'
      },
      '08': {
        submitted: true,
        fileCount: 6,
        files: [
          { name: 'Slides_Module1_Agile_Scrum.pdf', size: '6.2 MB', updated: '2026-09-12', driveLink: 'https://drive.google.com' },
          { name: 'Slides_Module2_Requirements_UserStories.pdf', size: '5.8 MB', updated: '2026-09-24', driveLink: 'https://drive.google.com' },
          { name: 'Slides_Module3_Design_Patterns.pdf', size: '7.4 MB', updated: '2026-10-14', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 4,
        qualityTier: 'Commendable',
        findings: ['Slides are well organized with practical Jira/GitHub examples.'],
        risks: [],
        auditorNotes: 'Solid learning materials.'
      },
      '09': {
        submitted: true,
        fileCount: 2,
        files: [
          { name: 'CSE2104_Final_Exam_Paper_2026.pdf', size: '1.2 MB', updated: '2026-10-18', driveLink: 'https://drive.google.com' },
          { name: 'Marking_Scheme_Answer_Key.pdf', size: '950 KB', updated: '2026-10-18', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 3,
        qualityTier: 'Satisfactory',
        findings: [
          'Detailed solution key provided.',
          'Pre-moderation vetting form is included, but only signed 2 days before the exam with no record of external review.'
        ],
        risks: [
          'Quality Flag: Late pre-moderation turnaround.'
        ],
        auditorNotes: 'Ensure examination committee completes vetting at least 3 weeks prior to exam date.'
      },
      '10': {
        submitted: false,
        fileCount: 0,
        files: [],
        qualityScore: 1,
        qualityTier: 'Non-Compliant',
        findings: [
          'CRITICAL DEFICIENCY: Folder 10 is empty. Representative 9 final exam scripts (3 High, 3 Mid, 3 Low) have not been uploaded.'
        ],
        risks: [
          'Critical Risk: Accreditation non-compliance. Exam scripts must be preserved for external audit inspection.'
        ],
        auditorNotes: 'URGENT: Lecturer must retrieve scanned answer booklets from the Examination Department immediately.'
      },
      '11': {
        submitted: true,
        fileCount: 3,
        files: [
          { name: 'Group_Project_Specification_Brief.pdf', size: '1.6 MB', updated: '2026-09-18', driveLink: 'https://drive.google.com' },
          { name: 'Project_Marking_Rubric_Holistic.pdf', size: '580 KB', updated: '2026-09-18', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 3,
        qualityTier: 'Satisfactory',
        findings: [
          'Project brief is comprehensive.',
          'However, the marking rubric is holistic rather than analytic; lacks descriptive criteria distinguishing an A grade from a B grade.'
        ],
        risks: [
          'Quality Flag: Vague rubric descriptors increase risk of subjective grading bias.'
        ],
        auditorNotes: 'Upgrade rubric to an analytic matrix with criteria for Code Architecture, Test Coverage, Git Commits, and UI/UX.'
      },
      '12': {
        submitted: true,
        fileCount: 6,
        files: [
          { name: 'Student_Project_High_TeamAlpha.pdf', size: '8.2 MB', updated: '2026-11-04', driveLink: 'https://drive.google.com' },
          { name: 'Student_Project_Mid_TeamBeta.pdf', size: '7.5 MB', updated: '2026-11-04', driveLink: 'https://drive.google.com' },
          { name: 'Student_Project_Low_TeamGamma.pdf', size: '6.1 MB', updated: '2026-11-04', driveLink: 'https://drive.google.com' }
        ],
        qualityScore: 2,
        qualityTier: 'Needs Improvement',
        findings: [
          'Representative project reports submitted for 3 teams.',
          'DEFICIENCY: Student reports contain only final numerical marks on the front cover; ZERO written formative feedback, comments, or critique annotations are provided inside the documents.'
        ],
        risks: [
          'Quality Flag: Absence of formative feedback undermines student learning progression.'
        ],
        auditorNotes: 'Lecturer must provide written commentary explaining why marks were deducted and how the student could improve.'
      },
      '13': {
        submitted: true,
        fileCount: 1,
        files: [{ name: 'Signed_Declaration_of_Records.pdf', size: '180 KB', updated: '2026-11-05', driveLink: 'https://drive.google.com' }],
        qualityScore: 5,
        qualityTier: 'Exemplary',
        findings: ['Nil special records declared.'],
        risks: [],
        auditorNotes: 'Compliant.'
      }
    },
    qualityPillarScores: {
      alignment: 62, // Satisfactory
      assessment: 65, // Satisfactory
      marking: 45, // Needs Improvement (Missing exam scripts & unannotated coursework)
      cqi: 58, // Needs Improvement (Superficial CQI plan)
      curriculum: 74, // Satisfactory
      governance: 82 // Commendable
    },
    correctiveActions: [
      {
        id: 'car-c1',
        category: 'Critical Non-Compliance (CNC)',
        folder: 'Folder 10 / Exam Scripts',
        description: 'Upload the mandatory 9 representative final exam scripts (3 High, 3 Mid, 3 Low) with complete post-moderation counter-signatures.',
        assignedTo: 'Dr. Mazlina binti Abdul Manan',
        deadline: '2026-11-16',
        status: 'Open'
      },
      {
        id: 'car-c2',
        category: 'Major Deficiency (MD)',
        folder: 'Folder 07 / CQI',
        description: 'Revise CQI action plan for CLO 2 (-12% deficit). Formulate specific lab-based refactoring workshops with measurable target benchmarks.',
        assignedTo: 'Dr. Mazlina binti Abdul Manan',
        deadline: '2026-11-20',
        status: 'Open'
      },
      {
        id: 'car-c3',
        category: 'Minor Deficiency (MD)',
        folder: 'Folder 12 / Student Feedback',
        description: 'Ensure student project submissions feature written qualitative formative feedback rather than solely numerical marks.',
        assignedTo: 'Teaching Team',
        deadline: '2026-12-05',
        status: 'Open'
      }
    ]
  }
];
