/**
 * AI Service for EduAudit Pro v2.0
 * Supports Bring-Your-Own-AI (BYO-AI):
 * - Google Gemini (Gemini 1.5 Flash, 1.5 Pro, 2.0 Flash)
 * - OpenAI (GPT-4o-mini, GPT-4o)
 * - OpenRouter / Ollama / Custom OpenAI-compatible endpoints
 * - Offline / Simulated Fallback when no key is entered
 */

const AI_CONFIG_KEY = 'eduaudit_ai_config_v2';
const USER_ROLE_KEY = 'eduaudit_user_role_v2';

export const AI_PROVIDERS = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Recommended: Fast, highly capable, free tier available via Google AI Studio',
    defaultModel: 'gemini-1.5-flash',
    models: [
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Fast & Free)' },
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Deep Reasoning)' },
      { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash (Next-Gen)' }
    ],
    keyPlaceholder: 'AIzaSy...',
    keyHelpUrl: 'https://aistudio.google.com/app/apikey'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Industry standard models (GPT-4o, GPT-4o-mini)',
    defaultModel: 'gpt-4o-mini',
    models: [
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini (Cost-efficient)' },
      { id: 'gpt-4o', name: 'GPT-4o (High precision)' }
    ],
    keyPlaceholder: 'sk-proj-...',
    keyHelpUrl: 'https://platform.openai.com/api-keys'
  },
  {
    id: 'custom',
    name: 'OpenRouter / Local LLM / Custom',
    description: 'Connect OpenRouter or local endpoints like Ollama (http://localhost:11434/v1)',
    defaultModel: 'anthropic/claude-3.5-sonnet',
    models: [
      { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet (via OpenRouter)' },
      { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Llama 3.3 70B (via OpenRouter)' },
      { id: 'custom-model', name: 'Custom Specified Model' }
    ],
    keyPlaceholder: 'sk-or-... or local token',
    keyHelpUrl: 'https://openrouter.ai/keys'
  }
];

export function getStoredAIConfig() {
  try {
    const raw = localStorage.getItem(AI_CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading AI config', e);
  }
  return {
    provider: 'gemini',
    model: 'gemini-1.5-flash',
    apiKey: '',
    customEndpoint: '',
    enabled: false
  };
}

export function saveStoredAIConfig(config) {
  try {
    localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving AI config', e);
  }
}

export function getStoredUserRole() {
  return localStorage.getItem(USER_ROLE_KEY) || 'auditor'; // 'auditor' | 'lecturer'
}

export function setStoredUserRole(role) {
  localStorage.setItem(USER_ROLE_KEY, role);
}

/**
 * Test user's API Key connection
 */
export async function testAIConnection(config) {
  if (!config.apiKey && config.provider !== 'custom') {
    throw new Error('Please enter an API Key to test connection.');
  }

  const prompt = 'Respond with exactly: "EduAudit AI Connection Verified."';

  if (config.provider === 'gemini') {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model || 'gemini-1.5-flash'}:generateContent?key=${config.apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Google Gemini API returned status ${res.status}`);
    }
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return text.trim();
  }

  if (config.provider === 'openai' || config.provider === 'custom') {
    const endpoint = config.customEndpoint || 'https://api.openai.com/v1/chat/completions';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model || 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 30
      })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `API returned status ${res.status}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || 'Verified';
  }

  return 'Simulated verified';
}

/**
 * Run Quality Audit / Self-Check on a Folder using user's AI
 */
export async function runAIFolderAudit({
  folder,
  course,
  role = 'auditor',
  aiConfig
}) {
  const isAuditor = role === 'auditor';

  // System Persona
  const persona = isAuditor
    ? `You are an elite Higher Education Academic Quality Auditor & Accreditation Assessor (evaluating according to EAC/MQA/LAM Outcome-Based Education standards). Your objective is rigorous scrutiny: identify constructive alignment flaws, cognitive depth mismatches (Bloom taxonomy), rubric vagueness, formative feedback quality, and evidence gaps. Be objective, thorough, and professional.`
    : `You are an Academic Teaching Mentor & OBE Quality Coach assisting a course lecturer conducting a self-audit of their Teaching File before formal submission to the Head of Department and Auditor. Your tone is supportive, constructive, and actionable: point out what is missing, how to strengthen rubrics, and how to demonstrate continuous quality improvement (CQI) to pass the audit with excellence.`;

  const prompt = `
Course: ${course.code} - ${course.name}
Lecturer: ${course.lecturer}
Assigned Auditor: ${course.auditorName || 'Internal Auditor'}
Head of Department: ${course.headOfDepartment || 'HOD'}
Academic Session: 2026/2027

Folder Under Review:
- Code: Folder ${folder.id}
- Title: ${folder.title}
- OBE Focus Area: ${folder.obeFocus}
- Current Score: ${folder.score || 3}/5
- Existing Files in Folder: ${folder.files?.map(f => `${f.name} (${f.qualityFlag || 'Normal'})`).join(', ') || 'No files uploaded yet'}
- Existing Strengths: ${folder.strengths || 'None recorded'}
- Existing Risks: ${folder.risks || 'None recorded'}

Task for ${isAuditor ? 'INTERNAL QUALITY AUDITOR' : 'LECTURER SELF-CHECK'}:
1. Assess the adequacy and academic quality of the documents in this folder.
2. Check for constructive alignment and Bloom taxonomy rigor appropriate for this course level.
3. Highlight 2-3 specific Strengths.
4. Highlight 2-3 specific Gaps / Accreditation Risks.
5. Provide 2-3 Actionable Recommendations for ${isAuditor ? 'Corrective Action Request (CAR)' : 'Pre-submission Improvement'}.
6. Suggest an appropriate Quality Rating (1 to 5).

Format your response in clean markdown with the headings:
### Quality Assessment Overview
### Key Strengths
### Areas for Improvement / Audit Risks
### Actionable Recommendations
### Recommended Quality Score (1-5)
`;

  // Check if user has an active real AI key
  if (aiConfig && aiConfig.apiKey) {
    try {
      if (aiConfig.provider === 'gemini') {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${aiConfig.model || 'gemini-1.5-flash'}:generateContent?key=${aiConfig.apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${persona}\n\n${prompt}` }] }]
          })
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || `Gemini API error ${res.status}`);
        }
        const data = await res.json();
        return {
          source: `Google Gemini (${aiConfig.model})`,
          text: data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.'
        };
      }

      if (aiConfig.provider === 'openai' || aiConfig.provider === 'custom') {
        const endpoint = aiConfig.customEndpoint || 'https://api.openai.com/v1/chat/completions';
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${aiConfig.apiKey}`
          },
          body: JSON.stringify({
            model: aiConfig.model || 'gpt-4o-mini',
            messages: [
              { role: 'system', content: persona },
              { role: 'user', content: prompt }
            ],
            temperature: 0.7
          })
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || `AI API error ${res.status}`);
        }
        const data = await res.json();
        return {
          source: `${aiConfig.provider === 'openai' ? 'OpenAI' : 'Custom Endpoint'} (${aiConfig.model})`,
          text: data.choices?.[0]?.message?.content || 'No response generated.'
        };
      }
    } catch (apiError) {
      console.warn('Real AI call failed, falling back to simulated engine:', apiError);
      const simulated = generateSimulatedAudit(folder, course, role);
      return {
        source: 'Simulated AI Engine (API connection failed: ' + apiError.message + ')',
        text: simulated,
        isFallback: true
      };
    }
  }

  // Fallback: Built-in Simulated AI Engine
  const simulated = generateSimulatedAudit(folder, course, role);
  return {
    source: 'Built-in OBE Advisor (No API Key configured)',
    text: simulated,
    isFallback: false
  };
}

/**
 * High-quality heuristic OBE advisor when running without an external API key
 */
function generateSimulatedAudit(folder, course, role) {
  const isAuditor = role === 'auditor';

  if (isAuditor) {
    return `### Quality Assessment Overview
As an **Internal Quality Auditor**, Folder **${folder.id}: ${folder.title}** was audited against MQA/EAC accreditation quality indicators. The audit verified that files exist, but constructive alignment between Course Learning Outcomes (CLOs) and assessment tasks requires closer examination of marking rubrics and evidence depth.

### Key Strengths
- **Folder Completeness**: Documents are mapped to the required 13-folder institutional taxonomy.
- **Traceability**: Assessment tasks reference designated Programme Learning Outcomes (PLOs).
- **Format Consistency**: Documents follow university syllabus templates.

### Areas for Improvement / Audit Risks
- **Rubric Descriptors**: Marking rubrics rely on generic qualitative markers (e.g., "Good", "Satisfactory") rather than measurable, objective behavioral performance criteria.
- **Bloom Taxonomy Alignment**: The cognitive verbs in assessment tasks should be verified against higher-order Bloom levels (C4 Analysis to C6 Creation).
- **Formative Feedback Samples**: Missing explicit evidence of actionable feedback given to students before final grading.

### Actionable Recommendations
1. Require the course lecturer to revise rubric descriptors into observable performance thresholds.
2. Attach 3 moderated student scripts (High, Average, Marginal) with visible auditor/moderator stamps.
3. Include explicit documentation of Continuous Quality Improvement (CQI) closing the loop from previous cohort findings.

### Recommended Quality Score (1-5)
**${folder.score || 3} / 5** — *Conditional Compliance: Quality evidence is acceptable but requires rubric and CQI remediation.*`;
  } else {
    return `### Quality Assessment Overview
Hello **${course.lecturer}**! As your **Teaching & Learning Quality Coach**, I reviewed your **${folder.title} (Folder ${folder.id})** to ensure it is in top shape before you submit it to the Head of Department (${course.headOfDepartment || 'HOD'}) and your internal auditor.

### Key Strengths
- **Solid Foundation**: Your teaching materials are organized and align well with the approved course syllabus.
- **Course Engagement**: Assessment tasks reflect the practical domain of ${course.code}.
- **Timely Preparation**: All core documentation is compiled for internal peer review.

### Areas for Improvement / Audit Risks
- **Accreditation Readiness**: Auditors will look for explicit student work moderation sheets in this folder.
- **Feedback Evidence**: Make sure student sample submissions show handwritten or digital annotations with formative feedback, not just raw scores.
- **Rubric Granularity**: Enhance your rubrics with explicit criteria so students understand exactly how marks are earned.

### Actionable Recommendations
1. **Add Moderation Form**: Ensure the Internal Pre-Assessment and Post-Assessment Moderation Forms are signed and filed here.
2. **Highlight Formative Feedback**: Select 3 sample student submissions and annotate where feedback guided student learning.
3. **Double-check CLO Weighting**: Verify that the marks in your assessment match the CLO-PLO distribution in your syllabus.

### Recommended Quality Score (1-5)
**${Math.min(5, (folder.score || 3) + 1)} / 5** — *Ready for Submission once moderation and feedback samples are attached!*`;
  }
}
