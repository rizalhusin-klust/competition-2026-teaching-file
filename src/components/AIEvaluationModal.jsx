import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  RefreshCw, 
  Check, 
  ShieldCheck, 
  GraduationCap, 
  Copy, 
  ArrowRight, 
  Sliders,
  FileCheck
} from 'lucide-react';
import { runAIFolderAudit } from '../services/aiService';

export default function AIEvaluationModal({
  isOpen,
  onClose,
  folder,
  course,
  role,
  aiConfig,
  onOpenAISettings,
  onApplyRemarks
}) {
  if (!isOpen || !folder || !course) return null;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  const isAuditor = role === 'auditor';

  const triggerAudit = async () => {
    setLoading(true);
    setResult(null);
    setApplied(false);
    try {
      const res = await runAIFolderAudit({
        folder,
        course,
        role,
        aiConfig
      });
      setResult(res);
    } catch (err) {
      setResult({
        source: 'Error',
        text: `Error conducting AI review: ${err.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      triggerAudit();
    }
  }, [isOpen, folder?.id, role, aiConfig?.apiKey, aiConfig?.provider]);

  const handleCopy = () => {
    if (!result?.text) return;
    navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    if (!result?.text || !onApplyRemarks) return;
    onApplyRemarks(folder.id, result.text);
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content fade-in" style={{ maxWidth: '780px', maxHeight: '90vh' }}>
        
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: isAuditor 
                ? 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' 
                : 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              {isAuditor ? <ShieldCheck size={24} /> : <GraduationCap size={24} />}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  Folder {folder.id}: {folder.title}
                </h3>
                <span className={`badge ${isAuditor ? 'badge-primary' : 'badge-success'}`} style={{ fontSize: '0.72rem' }}>
                  {isAuditor ? 'Auditor Scrutiny' : 'Lecturer Self-Check'}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                {isAuditor
                  ? 'Independent evaluation of evidence, rubrics, and accreditation compliance.'
                  : 'Pre-flight gap analysis and coaching tips before HOD submission.'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onOpenAISettings}
              title="Change AI Provider or Model"
            >
              <Sliders size={14} />
              <span>AI Engine</span>
            </button>
            <button type="button" onClick={onClose} className="btn-ghost" style={{ padding: '0.35rem' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Engine Banner */}
        <div style={{
          background: 'var(--surface-subtle)',
          borderBottom: '1px solid var(--border)',
          padding: '0.6rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.78rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-muted)' }}>
            <Sparkles size={14} style={{ color: 'var(--primary)' }} />
            <span>AI Source: <strong>{result?.source || (loading ? 'Analyzing...' : 'Connected AI')}</strong></span>
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={triggerAudit}
            disabled={loading}
            style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
          >
            <RefreshCw size={12} className={loading ? 'spin' : ''} />
            <span>Re-evaluate</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="modal-body" style={{ padding: '1.5rem', maxHeight: '58vh', overflowY: 'auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <RefreshCw size={36} className="spin" style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Running AI Quality Review...
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0.5rem auto 0 auto' }}>
                Analyzing {folder.files?.length || 0} files in Folder {folder.id} from the perspective of an {isAuditor ? 'Internal Quality Auditor' : 'Academic Course Lecturer'}...
              </p>
            </div>
          ) : (
            <div className="ai-markdown-content" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#1e293b' }}>
              {result?.text?.split('\n').map((line, idx) => {
                if (line.startsWith('### ')) {
                  return (
                    <h4 key={idx} style={{
                      fontSize: '1.02rem',
                      fontWeight: 800,
                      color: isAuditor ? '#1e3a8a' : '#065f46',
                      marginTop: '1.25rem',
                      marginBottom: '0.5rem',
                      borderBottom: '1px solid #e2e8f0',
                      paddingBottom: '0.25rem'
                    }}>
                      {line.replace('### ', '')}
                    </h4>
                  );
                }
                if (line.startsWith('- ')) {
                  return (
                    <li key={idx} style={{ marginLeft: '1.25rem', marginBottom: '0.35rem' }}>
                      <span dangerouslySetInnerHTML={{ __html: line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </li>
                  );
                }
                if (/^\d+\.\s/.test(line)) {
                  return (
                    <div key={idx} style={{ marginLeft: '1.25rem', marginBottom: '0.35rem' }}>
                      <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </div>
                  );
                }
                if (!line.trim()) {
                  return <div key={idx} style={{ height: '0.5rem' }} />;
                }
                return (
                  <p key={idx} style={{ marginBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleCopy}
            disabled={loading || !result?.text}
          >
            {copied ? <Check size={14} style={{ color: 'var(--success)' }} /> : <Copy size={14} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Review'}</span>
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleApply}
              disabled={loading || !result?.text}
              style={{
                background: isAuditor ? 'var(--primary)' : 'var(--success)',
                borderColor: isAuditor ? 'var(--primary)' : 'var(--success)'
              }}
            >
              {applied ? <Check size={14} /> : <FileCheck size={14} />}
              <span>{applied ? 'Saved to Folder!' : isAuditor ? 'Record as Auditor Remark' : 'Save as Improvement Note'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
