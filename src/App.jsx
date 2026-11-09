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
import { 
  getStoredCourses, 
  getActiveCourseId, 
  setActiveCourseId, 
  updateCourseInStore, 
  resetToSampleCourses 
} from './services/storage';
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

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);

  // Active course reference
  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0];

  const handleSelectCourse = (courseId) => {
    setActiveCourseIdState(courseId);
    setActiveCourseId(courseId);
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

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        courses={courses}
        activeCourse={activeCourse}
        onSelectCourse={handleSelectCourse}
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
            onNavigateTab={setActiveTab}
            onOpenReport={() => setIsReportOpen(true)}
            onSelectFolder={setSelectedFolderId}
            onOpenEditCourse={() => setIsEditCourseOpen(true)}
          />
        )}

        {activeTab === 'folders' && (
          <FolderExplorerView
            course={activeCourse}
            onUpdateCourse={handleUpdateCourse}
            initialFolderId={selectedFolderId}
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
      />

      <EditCourseModal
        isOpen={isEditCourseOpen}
        onClose={() => setIsEditCourseOpen(false)}
        course={activeCourse}
        onSaveCourse={handleUpdateCourse}
      />
    </div>
  );
}
