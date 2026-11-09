import React, { useState, useEffect } from 'react';
import { 
  X, 
  UserCheck, 
  User, 
  Calendar, 
  BookOpen, 
  Award, 
  Check, 
  Save, 
  Building 
} from 'lucide-react';

export default function EditCourseModal({ isOpen, onClose, course, onSaveCourse, onSave }) {
  const saveHandler = onSaveCourse || onSave;
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    lecturer: '',
    auditorName: '',
    headOfDepartment: '',
    program: '',
    semester: '',
    creditHours: 3,
    auditDate: '',
    auditStatus: '',
    driveFolderUrl: ''
  });

  useEffect(() => {
    if (course) {
      setFormData({
        code: course.code || '',
        name: course.name || '',
        lecturer: course.lecturer || '',
        auditorName: course.auditorName || '',
        headOfDepartment: course.headOfDepartment || '',
        program: course.program || '',
        semester: course.semester || '',
        creditHours: course.creditHours || 3,
        auditDate: course.auditDate || new Date().toISOString().split('T')[0],
        auditStatus: course.auditStatus || 'Audit In Progress',
        driveFolderUrl: course.driveFolderUrl || ''
      });
      setSavedSuccess(false);
    }
  }, [course, isOpen]);

  if (!isOpen || !course) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (saveHandler) {
      saveHandler({
        ...course,
        ...formData
      });
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 400);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content fade-in" style={{ maxWidth: '640px' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserCheck size={22} style={{ color: 'var(--primary)' }} />
              Course & Auditor Settings
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Set the assigned course lecturer, internal quality auditor, and course details.
            </p>
          </div>
          <button type="button" onClick={onClose} className="btn-ghost" style={{ padding: '0.35rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Lecturer and Auditor Primary Section */}
            <div style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
              border: '1px solid #bfdbfe',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem', fontWeight: 800, color: '#1e40af', marginBottom: '0.35rem' }}>
                  <Award size={16} style={{ color: 'var(--primary)' }} />
                  Assigned Internal Auditor Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Prof. Ts. Dr. Hishamuddin bin Mohd"
                  value={formData.auditorName}
                  onChange={(e) => handleChange('auditorName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #93c5fd',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    background: '#ffffff'
                  }}
                />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'block' }}>
                  This name will appear on the audit findings and the formal sign-off report.
                </span>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem', fontWeight: 800, color: '#166534', marginBottom: '0.35rem' }}>
                  <User size={16} style={{ color: 'var(--success)' }} />
                  Assigned Course Lecturer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ar. Rizal bin Husin"
                  value={formData.lecturer}
                  onChange={(e) => handleChange('lecturer', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #86efac',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    background: '#ffffff'
                  }}
                />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'block' }}>
                  The course coordinator whose teaching file is being evaluated.
                </span>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.84rem', fontWeight: 800, color: '#6b21a8', marginBottom: '0.35rem' }}>
                  <Building size={16} style={{ color: '#9333ea' }} />
                  Head of Department (HOD) / Dean Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Prof. Ar. Dr. Norwina Mohd Nawawi"
                  value={formData.headOfDepartment}
                  onChange={(e) => handleChange('headOfDepartment', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #d8b4fe',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    background: '#ffffff'
                  }}
                />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'block' }}>
                  The Head of Department or Dean who formally endorses and signs the audit report.
                </span>
              </div>
            </div>

            {/* Course Code & Title */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Course Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ARC 3126"
                  value={formData.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Architectural Design Studio III"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            {/* Program & Semester */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Academic Programme / Faculty
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bachelor of Science in Architecture"
                  value={formData.program}
                  onChange={(e) => handleChange('program', e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Semester / Session
                </label>
                <input
                  type="text"
                  placeholder="e.g. Semester 1 - 2026/2027"
                  value={formData.semester}
                  onChange={(e) => handleChange('semester', e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>
            </div>

            {/* Credit Hours, Audit Date, Audit Status */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Credit Hours
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={formData.creditHours}
                  onChange={(e) => handleChange('creditHours', parseInt(e.target.value, 10) || 3)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Audit Date
                </label>
                <input
                  type="date"
                  value={formData.auditDate}
                  onChange={(e) => handleChange('auditDate', e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Audit Status
                </label>
                <select
                  value={formData.auditStatus}
                  onChange={(e) => handleChange('auditStatus', e.target.value)}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: '#ffffff' }}
                >
                  <option value="Audit In Progress">Audit In Progress</option>
                  <option value="Completed - Exemplary">Completed - Exemplary</option>
                  <option value="Completed - Minor CQI Actions Required">Completed - Minor CQI Actions</option>
                  <option value="Pending Action Plan / CAR">Pending Action Plan / CAR</option>
                  <option value="Non-Compliant - Remediation Required">Non-Compliant - Remediation</option>
                </select>
              </div>
            </div>

            {/* Google Drive Folder URL */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Google Drive Folder URL
              </label>
              <input
                type="text"
                placeholder="https://drive.google.com/drive/folders/..."
                value={formData.driveFolderUrl}
                onChange={(e) => handleChange('driveFolderUrl', e.target.value)}
                style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
              />
            </div>

          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary btn-sm"
              style={{
                background: savedSuccess ? 'var(--success)' : 'var(--primary)',
                borderColor: savedSuccess ? 'var(--success)' : 'var(--primary)'
              }}
            >
              {savedSuccess ? <Check size={15} /> : <Save size={15} />}
              <span>{savedSuccess ? 'Saved Successfully!' : 'Save Changes'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
