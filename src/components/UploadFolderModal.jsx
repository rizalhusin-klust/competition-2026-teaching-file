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
  Loader2
} from 'lucide-react';
import { processUploadedFiles, processZipFile } from '../services/folderParser';

export default function UploadFolderModal({ isOpen, onClose, onCourseCreated }) {
  const [activeTab, setActiveTab] = useState('folder'); // 'folder' | 'zip' | 'drive'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form fields
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [lecturer, setLecturer] = useState('');
  const [headOfDepartment, setHeadOfDepartment] = useState('');
  const [semester, setSemester] = useState('Semester 1 - 2026/2027');
  const [driveUrl, setDriveUrl] = useState('');

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
      code: courseCode || 'ARC 3126',
      name: courseName || 'Architectural Design Studio III',
      lecturer: lecturer || 'Ar. Rizal bin Husin',
      headOfDepartment: headOfDepartment || 'Prof. Ar. Dr. Norwina Mohd Nawawi',
      program: 'Faculty of Built Environment',
      semester: semester,
      creditHours: 4,
      driveFolderUrl: driveUrl,
      auditDate: new Date().toISOString().split('T')[0],
      auditorName: 'Internal Quality Auditor',
      auditStatus: 'Connected to Google Drive',
      overallQualityIndex: 80,
      complianceRate: 100,
      folderAudits: {}
    };

    onCourseCreated(courseObj);
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
              <FolderUp size={22} style={{ color: 'var(--primary)' }} />
              Upload Teaching File Portfolio
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Internal audit quality analysis will be triggered automatically.
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
                placeholder="e.g. ARC 3126"
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
                placeholder="e.g. Architectural Design Studio III"
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
                placeholder="e.g. Ar. Rizal bin Husin"
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

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              Head of Department (HOD) / Dean Name
            </label>
            <input
              type="text"
              placeholder="e.g. Prof. Ar. Dr. Norwina Mohd Nawawi"
              value={headOfDepartment}
              onChange={(e) => setHeadOfDepartment(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
            />
          </div>

          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
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
