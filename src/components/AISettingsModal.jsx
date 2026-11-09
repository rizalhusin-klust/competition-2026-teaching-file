import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Eye, 
  EyeOff, 
  Cpu, 
  ShieldCheck, 
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { 
  AI_PROVIDERS, 
  getStoredAIConfig, 
  saveStoredAIConfig, 
  testAIConnection 
} from '../services/aiService';

export default function AISettingsModal({ isOpen, onClose, onConfigSaved }) {
  if (!isOpen) return null;

  const [config, setConfig] = useState(() => getStoredAIConfig());
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // { success: boolean, message: string }
  const [savedSuccess, setSavedSuccess] = useState(false);

  const selectedProvider = AI_PROVIDERS.find(p => p.id === config.provider) || AI_PROVIDERS[0];

  const handleProviderChange = (providerId) => {
    const provider = AI_PROVIDERS.find(p => p.id === providerId) || AI_PROVIDERS[0];
    setConfig(prev => ({
      ...prev,
      provider: providerId,
      model: provider.defaultModel
    }));
    setTestResult(null);
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await testAIConnection(config);
      setTestResult({
        success: true,
        message: `Connected successfully! Provider response: "${res}"`
      });
    } catch (err) {
      setTestResult({
        success: false,
        message: err.message || 'Connection failed. Please verify your API Key and internet connection.'
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    saveStoredAIConfig(config);
    setSavedSuccess(true);
    if (onConfigSaved) onConfigSaved(config);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    const cleared = {
      provider: 'gemini',
      model: 'gemini-1.5-flash',
      apiKey: '',
      customEndpoint: '',
      enabled: false
    };
    setConfig(cleared);
    saveStoredAIConfig(cleared);
    setTestResult(null);
    if (onConfigSaved) onConfigSaved(cleared);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content fade-in" style={{ maxWidth: '640px' }}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}>
              <Sparkles size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                Bring Your Own AI Settings
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                Connect your personal AI key for real-time audit critiques and quality coaching.
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="btn-ghost" style={{ padding: '0.35rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Privacy & Security Guarantee Banner */}
          <div style={{
            background: 'var(--success-bg)',
            border: '1px solid var(--success-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <ShieldCheck size={20} style={{ color: 'var(--success)', flexShrink: 0 }} />
            <div style={{ fontSize: '0.78rem', color: '#065f46' }}>
              <strong>100% Client-Side Privacy:</strong> Your API key is stored securely in your browser's local memory only. It is never transmitted to any third-party server or stored in the cloud.
            </div>
          </div>

          {/* AI Provider Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
              Select AI Engine / Provider
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem' }}>
              {AI_PROVIDERS.map(p => {
                const isSelected = config.provider === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleProviderChange(p.id)}
                    style={{
                      background: isSelected ? 'var(--primary-subtle)' : 'var(--surface-subtle)',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-md)',
                      padding: '0.65rem 0.85rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.86rem', fontWeight: 800, color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {p.id === 'gemini' ? 'Free tier available' : p.id === 'openai' ? 'Direct API' : 'Custom / Local'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
              AI Model
            </label>
            <select
              value={config.model}
              onChange={(e) => setConfig({ ...config, model: e.target.value })}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                background: '#ffffff',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--text-main)'
              }}
            >
              {selectedProvider.models.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Endpoint (for custom / OpenRouter / Ollama) */}
          {config.provider === 'custom' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                API Endpoint URL (OpenAI Compatible)
              </label>
              <input
                type="text"
                placeholder="https://openrouter.ai/api/v1/chat/completions or http://localhost:11434/v1"
                value={config.customEndpoint || ''}
                onChange={(e) => setConfig({ ...config, customEndpoint: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          )}

          {/* API Key Input */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Your {selectedProvider.name} API Key
              </label>
              <a
                href={selectedProvider.keyHelpUrl}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.74rem', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <span>Get a {selectedProvider.name} Key</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type={showKey ? 'text' : 'password'}
                placeholder={selectedProvider.keyPlaceholder}
                value={config.apiKey || ''}
                onChange={(e) => {
                  setConfig({ ...config, apiKey: e.target.value.trim() });
                  setTestResult(null);
                }}
                style={{
                  width: '100%',
                  padding: '0.65rem 2.5rem 0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '0.88rem',
                  fontFamily: 'monospace'
                }}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
                title={showKey ? 'Hide Key' : 'Show Key'}
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              Leave blank if you prefer to use the built-in simulated OBE advisor without an external key.
            </p>
          </div>

          {/* Test Connection Button & Result */}
          <div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleTestConnection}
              disabled={testing || (!config.apiKey && config.provider !== 'custom')}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {testing ? (
                <>
                  <RefreshCw size={14} className="spin" />
                  <span>Testing Connection to {selectedProvider.name}...</span>
                </>
              ) : (
                <>
                  <Cpu size={14} />
                  <span>Test API Connection</span>
                </>
              )}
            </button>

            {testResult && (
              <div style={{
                marginTop: '0.6rem',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                background: testResult.success ? 'var(--success-bg)' : 'var(--danger-bg)',
                color: testResult.success ? '#065f46' : '#991b1b',
                border: `1px solid ${testResult.success ? 'var(--success-border)' : 'var(--danger-border)'}`
              }}>
                {testResult.success ? (
                  <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
                ) : (
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
                )}
                <div style={{ wordBreak: 'break-word' }}>{testResult.message}</div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handleClear}
            title="Clear stored API Key and reset to default"
          >
            Clear / Disconnect Key
          </button>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleSave}
            >
              {savedSuccess ? 'Saved!' : 'Save & Activate AI'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
