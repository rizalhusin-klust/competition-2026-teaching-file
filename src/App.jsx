import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import FolderExplorerView from './components/FolderExplorerView';
import QualityPillarsView from './components/QualityPillarsView';
import ConstructiveAlignmentMatrix from './components/ConstructiveAlignmentMatrix';
import UploadFolderModal from './components/UploadFolderModal';
import GoogleDriveSyncModal from './components/GoogleDriveSyncModal';
import AuditReportModal from './components/AuditReportModal';
import EditCourseModal from './components/EditCourseModal';
import AISettingsModal from './components/AISettingsModal';
import AIEvaluationModal from './components/AIEvaluationModal';
import { 
  getStoredCourses, 
  getActiveCourseId, 
  setActiveCourseId, 
  updateCourseInStore, 
  resetToSampleCourses 
} from './services/storage';
import { 
  getStoredUserRole, 
  setStoredUserRole, 
  getStoredAIConfig, 
  saveStoredAIConfig 
} from './services/aiService';
import { 
  LayoutDashboard, 
  FolderCheck, 
  ShieldCheck, 
  Target 
} from 'lucide-react';

export default function App() {
  const [courses, setCourses] = useState(() => getStoredCourses());
  const [activeCourseId, setActiveCourseIdState] = useState(() => getActiveCourseId());
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'folders' | 'pillars' | 'alignment'
  const [selectedFolderId, setSelectedFolderId] = useState('01');

  // Dual Role Perspective: 'auditor' | 'lecturer'
  const [userRole, setUserRole] = useState(() => getStoredUserRole());

  // Bring-Your-Own-AI Configuration
  const [aiConfig, setAiConfig] = useState(() => getStoredAIConfig());

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
  const [isAISettingsOpen, setIsAISettingsOpen] = useState(false);
  const [aiEvalState, setAiEvalState] = useState({ isOpen: false, folder: null });

  // Active course reference
  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0];

  const handleSelectCourse = (courseId) => {
    setActiveCourseIdState(courseId);
    setActiveCourseId(courseId);
  };

  const handleToggleUserRole = (newRole) => {
    setUserRole(newRole);
    setStoredUserRole(newRole);
  };

  const handleUpdateCourse = (updatedCourse) => {
    const newCourseList = updateCourseInStore(updatedCourse);
    setCourses([...newCourseList]);
  };

  const handleCourseCreated = (newCourse) => {
    const newCourseList = updateCourseInStore(newCourse);
    setCourses([...newCourseList]);
    setActiveCourseIdState(newCourse.id);
    setActiveCourseId(newCourse.id);
    setActiveTab('overview');
  };

  const handleResetSamples = () => {
    if (window.confirm('Reset all audit records to default pre-loaded sample courses?')) {
      const resetList = resetToSampleCourses();
      setCourses([...resetList]);
      setActiveCourseIdState(resetList[0].id);
      setActiveTab('overview');
    }
  };

  const handleOpenAIReview = (folder) => {
    setAiEvalState({
      isOpen: true,
      folder: folder || { id: '01', title: 'Course Information & Approved Syllabus' }
    });
  };

  const handleApplyRemarks = (folderId, remarksText) => {
    const existingAudit = activeCourse.folderAudits?.[folderId] || {};
    const updatedNotes = existingAudit.auditorNotes 
      ? `${existingAudit.auditorNotes}\n\n--- [AI Quality Insights (${userRole.toUpperCase()})] ---\n${remarksText}`
      : remarksText;
    
    const updatedCourse = {
      ...activeCourse,
      folderAudits: {
        ...activeCourse.folderAudits,
        [folderId]: {
          ...existingAudit,
          auditorNotes: updatedNotes
        }
      }
    };
    handleUpdateCourse(updatedCourse);
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        courses={courses}
        activeCourse={activeCourse}
        onSelectCourse={handleSelectCourse}
        userRole={userRole}
        onToggleUserRole={handleToggleUserRole}
        aiConfig={aiConfig}
        onOpenAISettings={() => setIsAISettingsOpen(true)}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenDriveModal={() => setIsDriveModalOpen(true)}
        onOpenReport={() => setIsReportOpen(true)}
        onResetSamples={handleResetSamples}
        onOpenEditCourse={() => setIsEditCourseOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Navigation Tabs */}
        <div className="tabs-nav no-print">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard Overview</span>
          </button>

          <button
            type="button"
            className={`tab-btn ${activeTab === 'folders' ? 'active' : ''}`}
            onClick={() => setActiveTab('folders')}
          >
            <FolderCheck size={18} />
            <span>Teaching File Folders (01 to 13)</span>
          </button>

          <button
            type="button"
            className={`tab-btn ${activeTab === 'pillars' ? 'active' : ''}`}
            onClick={() => setActiveTab('pillars')}
          >
            <ShieldCheck size={18} />
            <span>The 6 Quality Pillars</span>
          </button>

          <button
            type="button"
            className={`tab-btn ${activeTab === 'alignment' ? 'active' : ''}`}
            onClick={() => setActiveTab('alignment')}
          >
            <Target size={18} />
            <span>Constructive Alignment Matrix</span>
          </button>
        </div>

        {/* Tab Views */}
        {activeTab === 'overview' && (
          <DashboardOverview
            course={activeCourse}
            userRole={userRole}
            onToggleUserRole={handleToggleUserRole}
            onNavigateTab={setActiveTab}
            onOpenReport={() => setIsReportOpen(true)}
            onSelectFolder={setSelectedFolderId}
            onOpenEditCourse={() => setIsEditCourseOpen(true)}
            onOpenAIReview={handleOpenAIReview}
            onOpenAISettings={() => setIsAISettingsOpen(true)}
          />
        )}

        {activeTab === 'folders' && (
          <FolderExplorerView
            course={activeCourse}
            userRole={userRole}
            onUpdateCourse={handleUpdateCourse}
            initialFolderId={selectedFolderId}
            onOpenAIReview={handleOpenAIReview}
          />
        )}

        {activeTab === 'pillars' && (
          <QualityPillarsView
            course={activeCourse}
            onSelectFolder={setSelectedFolderId}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'alignment' && (
          <ConstructiveAlignmentMatrix
            course={activeCourse}
          />
        )}

      </main>

      {/* Modals */}
      <UploadFolderModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onCourseCreated={handleCourseCreated}
      />

      <GoogleDriveSyncModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        course={activeCourse}
      />

      <AuditReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        course={activeCourse}
        userRole={userRole}
        aiConfig={aiConfig}
      />

      <EditCourseModal
        isOpen={isEditCourseOpen}
        onClose={() => setIsEditCourseOpen(false)}
        course={activeCourse}
        onSave={handleUpdateCourse}
        onSaveCourse={handleUpdateCourse}
      />

      <AISettingsModal
        isOpen={isAISettingsOpen}
        onClose={() => setIsAISettingsOpen(false)}
        onConfigSaved={(newConfig) => setAiConfig(newConfig)}
      />

      <AIEvaluationModal
        isOpen={aiEvalState.isOpen}
        onClose={() => setAiEvalState({ isOpen: false, folder: null })}
        folder={aiEvalState.folder}
        course={activeCourse}
        role={userRole}
        aiConfig={aiConfig}
        onOpenAISettings={() => {
          setAiEvalState({ isOpen: false, folder: null });
          setIsAISettingsOpen(true);
        }}
        onApplyRemarks={handleApplyRemarks}
      />

    </div>
  );
}
