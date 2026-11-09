# EduAudit Pro v2.0: Dual-Persona OBE Quality Auditor & Self-Check Portal

> **Accreditation-Grade Outcome-Based Education (OBE) Internal Quality Audit & Lecturer Self-Check Platform**  
> **Version 2.0 — Bring-Your-Own-AI & Dual-Persona Edition**  
> Built for Kuala Lumpur University of Science and Technology (KLUST). Evaluates the **pedagogical depth and quality** of teaching portfolios, constructive alignment, Bloom taxonomy rigor, and continuous quality improvement (CQI).

---

## 🌟 What's New in Version 2.0

### 1. Dual-Persona Role Switcher (Auditor vs. Lecturer)
Switch perspectives anytime with the toggle in the header navigation:
- 🛡️ **Internal Quality Auditor Mode**:
  - Focus: Independent compliance scrutiny, verifying evidence authenticity, auditing rubric granularity, flagging accreditation risks (MQA/EAC/LAM), and issuing formal Corrective Action Requests (CAR).
- 👨‍🏫 **Course Lecturer Self-Check Mode**:
  - Focus: Pre-flight readiness check before formal submission to the Head of Department (HOD) and Auditor. Evaluates what documents are missing, provides constructive coaching tips to strengthen rubrics, and helps write continuous quality improvement (CQI) reflections.

### 2. Bring Your Own AI (BYO-AI Engine)
Users can now connect their own preferred AI key directly in the application:
- **Google Gemini**: Gemini 1.5 Flash (free tier), Gemini 1.5 Pro, Gemini 2.0 Flash via Google AI Studio.
- **OpenAI**: GPT-4o, GPT-4o-mini.
- **OpenRouter / Local LLM**: Connect local Ollama (`http://localhost:11434/v1`) or custom OpenAI-compatible endpoints.
- **Built-in Offline / Simulated AI**: Zero setup required! If no key is entered, an intelligent heuristic OBE engine evaluates the portfolio immediately.
- **100% Client-Side Privacy Guarantee**: API keys are saved exclusively in your browser's local memory (`localStorage`). Keys are never sent to any intermediary server.

### 3. Real-Time AI Quality Critique on Folders
- Click **"🤖 Review Folder with My AI"** on any of the 13 Teaching File folders.
- Get instant, tailored analysis:
  - Quality Assessment Overview
  - Key Strengths
  - Areas for Improvement / Audit Risks
  - Concrete Actionable Recommendations
  - Recommended Quality Score (1 to 5)
- One-click **"Save to Folder Remarks"** to automatically insert the AI's recommendations into the official audit notes.

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
2. Type a short description of what you changed (e.g. `v2.0: Added Dual-Persona and BYO-AI`).
3. Press **Enter**. Your changes will automatically commit and push to GitHub, triggering an automatic rebuild on GitHub Pages!
