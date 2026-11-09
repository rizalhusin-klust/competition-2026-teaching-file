# EduAudit Pro v2.1: Standalone Single-File HTML Dossier & Dual-Persona OBE Quality Auditor

> **Accreditation-Grade Outcome-Based Education (OBE) Internal Quality Audit & Lecturer Self-Check Platform**  
> **Version 2.1 — Standalone Single-File HTML Dossier Edition**  
> Built for Kuala Lumpur University of Science and Technology (KLUST). Evaluates the **pedagogical depth and quality** of teaching portfolios, constructive alignment, Bloom taxonomy rigor, and continuous quality improvement (CQI).

---

## 🌟 What's New in Version 2.1: Standalone Single-File HTML Dossier

### 1. Complete Single-File HTML Dossier (.html)
Auditors and lecturers can now download and view the **entire audit portfolio and all links in a single, 100% self-contained `.html` document**:
- **Offline & Portable**: The official KLUST letterhead logo is embedded directly as a **Base64 Data URI** (`data:image/jpeg;base64,...`), so the file displays with complete institutional fidelity anywhere—even with no internet connection, and never has broken image links.
- **All 13 Folders & Direct Drive Links**: Lists every submitted file across folders 01 to 13, with direct clickable links to the institution's Google Drive repository.
- **The 6 Quality Pillars**: Embeds weighted scores, quality ratings, and accreditation indicators.
- **Constructive Alignment (CLO-PLO-Bloom)**: Complete tabular attainment metrics against targets.
- **Formal 3-Part Sign-Off Blocks**: Signature and date boxes for the **Internal Auditor**, **Course Lecturer**, and **Head of Department (HOD)**.
- **Universal Browser Compatibility**: Can be emailed, uploaded to Google Drive, saved on a USB drive, or printed/saved as PDF with the embedded **"Print / Save as PDF"** button.

---

### 2. Systematic Academic Filename Convention

The application automatically generates standardized, archive-compliant filenames based on:
```
[PROGRAM]_[SEMESTER]_[COURSE_CODE]_[COURSE_NAME]_[LECTURER]_[REPORT_TYPE].html
```

#### Systematic Breakdown:
| Component | Source Field | Example Format |
|---|---|---|
| **Program** | Academic Programme | `BScArch` / `BScSE` |
| **Semester** | Academic Session | `Sem1-2026-2027` |
| **Subject Code** | Course Code | `ARC3126` / `CSE2104` |
| **Subject Name** | Course Title | `DesignStudioIII` / `SoftwareEng` |
| **Lecturer** | Assigned Lecturer | `ArRizalHusin` / `DrMazlina` |
| **Report Type** | Active Role | `QualityAuditReport` (Auditor) / `LecturerSelfCheckReport` (Lecturer) |

#### Real Examples:
* **Architecture Studio:**  
  `BScArch_Sem1-2026-2027_ARC3126_DesignStudioIII_ArRizalHusin_QualityAuditReport.html`
* **Software Engineering:**  
  `BScSE_Sem1-2026-2027_CSE2104_SoftwareEng_DrMazlina_QualityAuditReport.html`

Users can inspect, edit, or reset the filename directly in the **"Export Standalone HTML Dossier"** modal before downloading or previewing in a new tab.

---

## 🎭 Dual-Persona Role Switcher (Auditor vs. Lecturer)

Switch perspectives anytime with the toggle in the header navigation:
- 🛡️ **Internal Quality Auditor Mode**:
  - Focus: Independent compliance scrutiny, verifying evidence authenticity, auditing rubric granularity, flagging accreditation risks (MQA/EAC/LAM), and issuing formal Corrective Action Requests (CAR).
- 👨‍🏫 **Course Lecturer Self-Check Mode**:
  - Focus: Pre-flight readiness check before formal submission to the Head of Department (HOD) and Auditor. Evaluates what documents are missing, provides constructive coaching tips to strengthen rubrics, and helps write continuous quality improvement (CQI) reflections.

---

## 🤖 Bring Your Own AI (BYO-AI Engine)

Users can connect their own AI API Key directly in the application:
- **Google Gemini**: Gemini 1.5 Flash (free tier), Gemini 1.5 Pro, Gemini 2.0 Flash via Google AI Studio.
- **OpenAI**: GPT-4o, GPT-4o-mini.
- **OpenRouter / Local LLM**: Connect local Ollama (`http://localhost:11434/v1`) or custom OpenAI-compatible endpoints.
- **Built-in Offline / Simulated AI**: Zero setup required! If no key is entered, an intelligent heuristic OBE engine evaluates the portfolio immediately.
- **100% Client-Side Privacy Guarantee**: API keys are saved exclusively in your browser's local memory (`localStorage`). Keys are never sent to any intermediary server.

---

## 🏛️ The 6 Quality Pillars of OBE Assessment

1. **Constructive Alignment & Bloom Rigor (25%)**: Checks whether Course Learning Outcomes (CLOs) match Program Outcomes (PLOs) and whether assessment tasks truly demand the promised Bloom Taxonomy depth.
2. **Assessment Rigor & Rubric Quality (20%)**: Analyzes whether rubrics provide descriptive criteria across performance tiers (Distinction to Fail) and checks for moderation forms.
3. **Marking Rigor & Formative Feedback (20%)**: Examines representative student scripts (**3 High, 3 Mid, 3 Low**) to verify meaningful feed-forward critique.
4. **CQI Actionability & Closing the Loop (15%)**: Evaluates whether the lecturer's self-reflection diagnoses pedagogical root causes and tracks proposed improvements from previous cohorts.
5. **Curriculum Currency & Learning Resources (10%)**: Checks reference recency (< 5 years) and instructional material clarity.
6. **Student Voice & Academic Governance (10%)**: Monitors student attendance thresholds and responsiveness to student course ratings.

---

## 📁 The 13 Standard Teaching File Folders

- **Folder 01**: Course Information & Approved Syllabus
- **Folder 02**: Assessment Specifications & CLO-PLO Mapping Matrix
- **Folder 03**: Continuous Assessment Instruments & Detailed Marking Rubrics
- **Folder 04**: Moderated Student Work Samples (High / Average / Marginal)
- **Folder 05**: Final Examination Question Paper, Marking Scheme & Moderation
- **Folder 06**: Course Learning Outcome (CLO) Attainment Analysis & Score Sheets
- **Folder 07**: Course Committee Minutes & Department Academic Review
- **Folder 08**: External Examiner & Industry Advisory Panel (IAP) Reports
- **Folder 09**: Student Attendance Records & Barred Student Lists
- **Folder 10**: Student Feedback & Course Evaluation Survey (SUFO/SFES)
- **Folder 11**: Lecture Notes, Reference Materials & Digital Resources
- **Folder 12**: Laboratory Manuals, Studio Briefs & Safety Compliance
- **Folder 13**: Continuous Quality Improvement (CQI) Action Plan & Closing the Loop

---

## 🚀 Running the Application Locally

1. Double-click the file **`run-app.bat`** in this folder.
2. The server will start and open your web browser at:
   ```
   http://localhost:3000
   ```
3. Pre-loaded benchmark courses available:
   - **`ARC 3126: Architectural Design Studio III`** (Lecturer: Ar. Rizal bin Husin)
   - **`CSE 2104: Software Engineering & Agile Methods`** (Lecturer: Dr. Mazlina binti Abdul Manan)

---

## 🌐 Deploy to GitHub & Future Version Control

**Repository:** `https://github.com/rizalhusin-klust/competition-2026-teaching-file.git`  
**Live Site:** `https://rizalhusin-klust.github.io/competition-2026-teaching-file/`

### To Push Updates Anytime (One-Click)
1. Double-click **`push-version.bat`** in this folder.
2. Type a short description of what you changed (e.g. `v2.1: Added Standalone Single-File HTML Dossier Export`).
3. Press **Enter**. Your changes will automatically commit and push to GitHub, triggering an automatic rebuild on GitHub Pages!
