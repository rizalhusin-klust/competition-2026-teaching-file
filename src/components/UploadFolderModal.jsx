import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  FolderUp, 
  FileArchive, 
  Cloud, 
  Check, 
  AlertCircle,
  Sparkles,
  Loader2,
  PlusCircle,
  BookOpen
} from 'lucide-react';
import { processUploadedFiles, processZipFile } from '../services/folderParser';
import { TEACHING_FILE_ITEMS } from '../data/auditRubrics';

export default function UploadFolderModal({ isOpen, onClose, onCourseCreated }) {
  const [activeTab, setActiveTab] = useState('folder'); // 'folder' | 'zip' | 'drive'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form fields
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [lecturer, setLecturer] = useState('');
  const [headOfDepartment, setHeadOfDepartment] = useState('');
  const [auditorName, setAuditorName] = useState('');
  const [semester, setSemester] = useState('Semester 1 - 2026/2027');
  const [driveUrl, setDriveUrl] = useState('');
  const [isCourseworkOnly, setIsCourseworkOnly] = useState(false);

  const folderInputRef = useRef(null);
  const zipInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFolderChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    setError('');

    try {
      const parsedCourse = await processUploadedFiles(files, {
        code: courseCode,
        name: courseName,
        lecturer: lecturer,
        headOfDepartment: headOfDepartment,
        auditorName: auditorName,
        semester: semester,
        driveFolderUrl: driveUrl
      });
      onCourseCreated(parsedCourse);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to parse uploaded folder: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleZipChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      const parsedCourse = await processZipFile(file, {
        code: courseCode,
        name: courseName,
        lecturer: lecturer,
        headOfDepartment: headOfDepartment,
        auditorName: auditorName,
        semester: semester,
        driveFolderUrl: driveUrl
      });
      onCourseCreated(parsedCourse);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to extract and parse ZIP archive: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDriveSubmit = (e) => {
    e.preventDefault();
    if (!driveUrl) {
      setError('Please provide a Google Drive folder link or ID.');
      return;
    }

    setLoading(true);
    // Create course stub connected to Google Drive
    const mockFiles = [];
    const courseObj = {
      id: `course_${Date.now()}`,
      code: courseCode || 'ARCH 1111',
      name: courseName || 'Architecture Design Studio 1',
      lecturer: lecturer || 'Rizal bin Husin',
      headOfDepartment: headOfDepartment || 'Anna Kamelia bt Kamaruddin',
      auditorName: auditorName || 'Zairila Juria bt Zainal Abidin',
      program: 'Faculty of Built Environment (FABE)',
      semester: semester,
      creditHours: 4,
      driveFolderUrl: driveUrl,
      auditDate: new Date().toISOString().split('T')[0],
      auditStatus: 'Connected to Google Drive',
      overallQualityIndex: 80,
      complianceRate: 100,
      folderAudits: {}
    };

    onCourseCreated(courseObj);
    setLoading(false);
    onClose();
  };

  const handleCreateBlankCourse = (e) => {
    e.preventDefault();
    if (!courseCode.trim() || !courseName.trim()) {
      setError('Please provide at least a Course Code and Course Title.');
      return;
    }

    setLoading(true);
    // Initialize 13 audit folder entries
    const initialFolderAudits = {};
    for (const item of TEACHING_FILE_ITEMS) {
      initialFolderAudits[item.id] = {
        submitted: false,
        fileCount: 0,
        files: [],
        qualityScore: 3,
        qualityTier: 'Satisfactory',
        findings: ['Portfolio item registered for audit tracking.'],
        risks: [],
        auditorNotes: 'Awaiting syllabus and document upload.'
      };
    }

    const newCourse = {
      id: `course_${Date.now()}`,
      code: courseCode.trim().toUpperCase(),
      name: courseName.trim(),
      lecturer: lecturer.trim() || 'Rizal bin Husin',
      headOfDepartment: headOfDepartment.trim() || 'Anna Kamelia bt Kamaruddin',
      auditorName: auditorName.trim() || 'Zairila Juria bt Zainal Abidin',
      program: 'Faculty of Architecture & Built Environment (FABE)',
      semester: semester,
      creditHours: 3,
      driveFolderUrl: driveUrl.trim() || '',
      isCourseworkOnly: isCourseworkOnly,
      auditDate: new Date().toISOString().split('T')[0],
      auditStatus: 'Pending Verification',
      overallQualityIndex: 60,
      complianceRate: 0,
      folderAudits: initialFolderAudits,
      clos: [
        {
          id: 'clo1',
          code: 'CLO 1',
          description: 'Explain foundational course theoretical principles and statutory codes.',
          ploCode: 'PLO 1 (Knowledge)',
          domain: 'Cognitive',
          bloomLevel: 'C2 (Understanding)',
          targetAttainmentPct: 75,
          actualAttainmentPct: 75,
          status: 'Achieved'
        }
      ],
      assessments: [
        { id: 'ass1', name: 'Continuous Assessment 1', weight: 40, cloId: 'clo1', type: 'Coursework', maxMarks: 100 },
        { id: 'ass2', name: 'Final Assessment', weight: 60, cloId: 'clo1', type: 'Final Exam / Portfolio', maxMarks: 100 }
      ],
      correctiveActions: []
    };

    onCourseCreated(newCourse);
    setLoading(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content fade-in" style={{ maxWidth: '640px' }}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PlusCircle size={22} style={{ color: 'var(--primary)' }} />
              Add Course to be Analyzed
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Create a new course audit by uploading a folder, ZIP, Google Drive, or creating a new course entry.
            </p>
          </div>
          <button type="button" onClick={onClose} className="btn-ghost" style={{ padding: '0.35rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {error && (
            <div style={{ padding: '0.75rem 1rem', background: 'var(--danger-bg)', border: '1px solid var(--danger-border)', borderRadius: 'var(--radius-md)', color: '#991b1b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Optional Meta Information */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Course Code
              </label>
              <input
                type="text"
                placeholder="e.g. ARCH 1111"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Course Title
              </label>
              <input
                type="text"
                placeholder="e.g. Architecture Design Studio 1"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Course Lecturer
              </label>
              <input
                type="text"
                placeholder="e.g. Rizal bin Husin"
                value={lecturer}
                onChange={(e) => setLecturer(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Semester / Session
              </label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Head of Department (HOD)
              </label>
              <input
                type="text"
                placeholder="e.g. Anna Kamelia bt Kamaruddin"
                value={headOfDepartment}
                onChange={(e) => setHeadOfDepartment(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Auditor
              </label>
              <input
                type="text"
                placeholder="e.g. Zairila Juria bt Zainal Abidin"
                value={auditorName}
                onChange={(e) => setAuditorName(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
              />
            </div>
          </div>

          {/* 100% Coursework Assessment Type Toggle */}
          <div style={{
            background: isCourseworkOnly ? '#f0fdf4' : 'var(--surface-subtle)',
            border: `1.5px solid ${isCourseworkOnly ? '#86efac' : 'var(--border)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onClick={() => setIsCourseworkOnly(!isCourseworkOnly)}
          >
            <div>
              <div style={{ fontSize: '0.86rem', fontWeight: 800, color: isCourseworkOnly ? '#166534' : 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span>100% Coursework Subject (Studio / Lab / Practical)</span>
                {isCourseworkOnly && (
                  <span className="badge badge-success" style={{ fontSize: '0.66rem', padding: '0.1rem 0.35rem' }}>
                    No Final Exam Required
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                Exempts Folder 09 (Moderated Exam) and Folder 10 (Exam Scripts). Only requires the 11 coursework folders.
              </div>
            </div>

            <input
              type="checkbox"
              checked={isCourseworkOnly}
              onChange={(e) => setIsCourseworkOnly(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#16a34a' }}
            />
          </div>

          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`btn btn-sm ${activeTab === 'folder' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('folder')}
            >
              <FolderUp size={14} /> Upload Folder
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeTab === 'zip' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('zip')}
            >
              <FileArchive size={14} /> Upload ZIP
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeTab === 'drive' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('drive')}
            >
              <Cloud size={14} /> Connect Google Drive
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeTab === 'manual' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('manual')}
            >
              <PlusCircle size={14} /> New Course Entry
            </button>
          </div>

          {/* Tab 1: Folder Upload */}
          {activeTab === 'folder' && (
            <div style={{ textAlign: 'center', padding: '2rem 1.5rem', border: '2px dashed #93c5fd', borderRadius: 'var(--radius-lg)', background: '#f0f9ff' }}>
              <FolderUp size={44} style={{ color: 'var(--primary)', margin: '0 auto 0.75rem auto' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0369a1' }}>
                Select Teaching File Folder
              </h4>
              <p style={{ fontSize: '0.84rem', color: '#0284c7', marginTop: '0.25rem', maxWidth: '380px', margin: '0.25rem auto 1.25rem auto' }}>
                Select the folder containing your teaching file documents. Files will be auto-categorized into the 13 folders!
              </p>

              <input
                type="file"
                ref={folderInputRef}
                webkitdirectory="true"
                directory="true"
                multiple
                onChange={handleFolderChange}
                style={{ display: 'none' }}
              />

              <button
                type="button"
                className="btn btn-primary"
                disabled={loading}
                onClick={() => folderInputRef.current?.click()}
              >
                {loading ? <Loader2 size={16} className="spin" /> : <Upload size={16} />}
                <span>{loading ? 'Analyzing Quality...' : 'Browse Local Folder'}</span>
              </button>
            </div>
          )}

          {/* Tab 2: ZIP Upload */}
          {activeTab === 'zip' && (
            <div style={{ textAlign: 'center', padding: '2rem 1.5rem', border: '2px dashed #c084fc', borderRadius: 'var(--radius-lg)', background: '#faf5ff' }}>
              <FileArchive size={44} style={{ color: '#9333ea', margin: '0 auto 0.75rem auto' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#6b21a8' }}>
                Select Teaching File ZIP Archive
              </h4>
              <p style={{ fontSize: '0.84rem', color: '#7e22ce', marginTop: '0.25rem', maxWidth: '380px', margin: '0.25rem auto 1.25rem auto' }}>
                Drop or select a .zip archive of the course portfolio. The app will extract and evaluate all files in your browser.
              </p>

              <input
                type="file"
                ref={zipInputRef}
                accept=".zip"
                onChange={handleZipChange}
                style={{ display: 'none' }}
              />

              <button
                type="button"
                className="btn btn-primary"
                style={{ background: '#9333ea' }}
                disabled={loading}
                onClick={() => zipInputRef.current?.click()}
              >
                {loading ? <Loader2 size={16} className="spin" /> : <Upload size={16} />}
                <span>{loading ? 'Extracting & Auditing...' : 'Browse .ZIP File'}</span>
              </button>
            </div>
          )}

          {/* Tab 3: Google Drive Connect */}
          {activeTab === 'drive' && (
            <form onSubmit={handleDriveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#166534', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Cloud size={16} /> Link Directly to Google Drive
                </div>
                <p style={{ fontSize: '0.78rem', color: '#15803d', marginTop: '0.2rem' }}>
                  Paste the Google Drive folder link where the lecturer has uploaded their 13 folders.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Google Drive Folder URL or Folder ID
                </label>
                <input
                  type="text"
                  placeholder="https://drive.google.com/drive/folders/1JwFjnGtv_vlHhuC3..."
                  value={driveUrl}
                  onChange={(e) => setDriveUrl(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-success" disabled={loading}>
                  <Check size={16} /> Connect & Audit Drive Folder
                </button>
              </div>
            </form>
          )}

          {/* Tab 4: Manual Course Entry */}
          {activeTab === 'manual' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e3a8a', fontWeight: 800, fontSize: '0.92rem' }}>
                <PlusCircle size={18} style={{ color: '#2563eb' }} />
                <span>Create New Course Audit Entry</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Initializes all 13 accreditation folders (Course Outline, Assessment Matrix, CQI, Moderation, etc.) ready for immediate audit evaluation, document attachment, and AI review.
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreateBlankCourse}
                  disabled={loading}
                  style={{ gap: '0.45rem', fontWeight: 700 }}
                >
                  {loading ? <Loader2 size={16} className="spin" /> : <PlusCircle size={16} />}
                  <span>Initialize & Analyze Course</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
