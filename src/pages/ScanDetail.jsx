import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import { activeScan, activityLogs, verificationLogs, findings } from '../data/mockData'
import { useToast } from '../context/ToastContext'
import './ScanDetail.css'

const STEPS = ['Spidering', 'Mapping', 'Testing', 'Validating', 'Reporting']

function StepIcon({ step }) {
  const icons = {
    Spidering: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/><path d="M12 3v3m0 12v3M3 12h3m12 0h3"/>
        <path d="M5.64 5.64l2.12 2.12m8.48 8.48l2.12 2.12M5.64 18.36l2.12-2.12m8.48-8.48l2.12-2.12"/>
      </svg>
    ),
    Mapping: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
      </svg>
    ),
    Testing: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2h-4m-6 0h6"/>
      </svg>
    ),
    Validating: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    Reporting: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  }
  return icons[step] || null
}

function LogLine({ log }) {
  if (log.type === 'url') {
    return (
      <div className="log-line">
        <span className="log-time">[{log.time}]</span>{' '}
        {log.text}
        {log.highlight && <span className="log-url">{log.highlight}</span>}
        {log.rest}
      </div>
    )
  }
  if (log.type === 'block') {
    return (
      <div className="log-line">
        <span className="log-time">[{log.time}]</span> {log.text}
        {log.block && <div className="log-block"><span className="log-block-bar"></span>{log.block}</div>}
        {log.rest}
      </div>
    )
  }
  if (log.type === 'mixed') {
    return (
      <div className="log-line">
        <span className="log-time">[{log.time}]</span>{' '}
        {log.text}
        {log.code1 && <span className="log-string">"{log.code1.replace(/"/g,'')}"</span>}
        {log.mid}
        {log.code2 && <span className="log-code">{log.code2}</span>}
        {log.rest}
      </div>
    )
  }
  if (log.type === 'code') {
    return (
      <div className="log-line">
        <span className="log-time">[{log.time}]</span>{' '}
        {log.text}
        {log.code1 && <span className="log-string">{log.code1}</span>}
        {log.rest}
      </div>
    )
  }
  if (log.type === 'idor') {
    return (
      <div className="log-line">
        <span className="log-time">[{log.time}]</span>{' '}
        {log.text}
        {log.highlight2 && <span className="log-highlight">{log.highlight2}</span>}
        {log.mid}
        {log.bold && <strong className="log-bold">{log.bold.replace(/\*\*/g,'')}</strong>}
        {log.rest}
      </div>
    )
  }
  return (
    <div className="log-line">
      <span className="log-time">[{log.time}]</span> {log.text}
    </div>
  )
}

function FindingCard({ finding }) {
  const map = {
    critical: { cls: 'badge-critical', label: 'Critical' },
    high: { cls: 'badge-high', label: 'High' },
    medium: { cls: 'badge-medium', label: 'Medium' },
    low: { cls: 'badge-low', label: 'Low' },
  }
  const { cls, label } = map[finding.severity] || {}
  return (
    <div className="finding-card">
      <div className="finding-header">
        <span className={`badge ${cls}`}>{label}</span>
        <span className="finding-time">{finding.time}</span>
      </div>
      <div className="finding-title">{finding.title}</div>
      <div className="finding-endpoint">{finding.endpoint}</div>
      <div className="finding-desc">{finding.description}</div>
    </div>
  )
}

export default function ScanDetail() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [activeTab, setActiveTab] = useState('activity')
  const logRef = useRef(null)
  const [visibleLogs, setVisibleLogs] = useState([])
  const [scanRunning, setScanRunning] = useState(true)
  const scan = activeScan

  // Simulate logs appearing
  useEffect(() => {
    const logs = activeTab === 'activity' ? activityLogs : verificationLogs
    setVisibleLogs([])
    let i = 0
    const interval = setInterval(() => {
      if (i < logs.length) {
        setVisibleLogs(prev => [...prev, logs[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 400)
    return () => clearInterval(interval)
  }, [activeTab])

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [visibleLogs])

  const handleExport = () => addToast('Generating export report...', 'info')
  const handleStop = () => {
    setScanRunning(false)
    addToast('Scan stopped successfully.', 'error')
  }

  return (
    <AppLayout>
      <div className="scan-detail-page fade-in">
        {/* Header */}
        <div className="dashboard-header">
          <div className="breadcrumb">
            <span className="breadcrumb-root">Scan</span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-link">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              </svg>
            </span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-link" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
              Private Assets
            </span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-active teal">New Scan</span>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline" onClick={handleExport}>Export Report</button>
            <button
              className={`btn ${scanRunning ? 'btn-danger' : 'btn-outline'}`}
              onClick={handleStop}
            >
              {scanRunning ? 'Stop Scan' : 'Scan Stopped'}
            </button>
          </div>
        </div>

        {/* Scan Overview Card */}
        <div className="scan-overview">
          {/* Progress Circle */}
          <div className="progress-circle-wrap">
            <div className="progress-circle">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bg-elevated)" strokeWidth="8"/>
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="var(--teal)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - scan.progress / 100)}`}
                  transform="rotate(-90 50 50)"
                  style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                />
              </svg>
              <div className="circle-inner">
                <span className="circle-pct">{scan.progress}%</span>
                <span className="circle-label">In Progress</span>
              </div>
            </div>
          </div>

          {/* Step Tracker */}
          <div className="step-section">
            <div className="step-tracker">
              {STEPS.map((step, i) => (
                <React.Fragment key={step}>
                  <div className={`step-item ${i === scan.currentStep ? 'active' : i < scan.currentStep ? 'done' : ''}`}>
                    <div className={`step-icon-wrap ${i === scan.currentStep ? 'active' : i < scan.currentStep ? 'done' : ''}`}>
                      <StepIcon step={step} />
                    </div>
                    <span className="step-label">{step}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`step-connector ${i < scan.currentStep ? 'done' : ''}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Metadata */}
            <div className="scan-meta">
              {[
                { label: 'Scan Type', value: scan.scanType },
                { label: 'Targets', value: scan.targets },
                { label: 'Started At', value: scan.startedAt },
                { label: 'Credentials', value: scan.credentials },
                { label: 'Files', value: scan.files },
                { label: 'Checklists', value: scan.checklists, accent: true },
              ].map(m => (
                <div key={m.label} className="meta-item">
                  <span className="meta-label">{m.label}</span>
                  <span className={`meta-value ${m.accent ? 'teal' : ''}`}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Console + Findings */}
        <div className="console-section">
          {/* Live Console */}
          <div className="console-panel">
            <div className="console-header">
              <div className="console-title-row">
                <div className="console-dot"></div>
                <span className="console-title">Live Scan Console</span>
              </div>
              <div className="console-running">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{ animation: scanRunning ? 'spin 1.5s linear infinite' : 'none' }}>
                  <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                </svg>
                {scanRunning ? 'Running...' : 'Stopped'}
              </div>
              <div className="console-actions">
                <button className="btn btn-ghost" style={{ padding: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <button className="btn btn-ghost" style={{ padding: '4px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="console-tabs">
              <button
                className={`console-tab ${activeTab === 'activity' ? 'active' : ''}`}
                onClick={() => setActiveTab('activity')}
              >Activity Log</button>
              <button
                className={`console-tab ${activeTab === 'verification' ? 'active' : ''}`}
                onClick={() => setActiveTab('verification')}
              >Verification Loops</button>
            </div>

            <div className="console-log" ref={logRef}>
              {visibleLogs.map((log, i) => (
                <LogLine key={i} log={log} />
              ))}
              {scanRunning && <span className="log-cursor">█</span>}
            </div>
          </div>

          {/* Finding Log */}
          <div className="findings-panel">
            <div className="findings-header">
              <span className="findings-title">Finding Log</span>
            </div>
            <div className="findings-list">
              {findings.map(f => (
                <FindingCard key={f.id} finding={f} />
              ))}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-item">
            <span className="status-dot neutral"></span>
            <span>Sub-Agents: <strong>{scan.subAgents}</strong></span>
          </div>
          <span className="status-sep">•</span>
          <div className="status-item">
            <span className="status-dot neutral"></span>
            <span>Parallel Executions: <strong>{scan.parallelExecutions}</strong></span>
          </div>
          <span className="status-sep">•</span>
          <div className="status-item">
            <span className="status-dot neutral"></span>
            <span>Operations: <strong>{scan.operations}</strong></span>
          </div>
          <span className="status-sep status-right-group">•</span>
          <div className="status-item"><span style={{color:'var(--red)'}}>Critical: <strong>0</strong></span></div>
          <span className="status-sep">•</span>
          <div className="status-item"><span style={{color:'var(--orange)'}}>High: <strong>0</strong></span></div>
          <span className="status-sep">•</span>
          <div className="status-item"><span style={{color:'var(--yellow)'}}>Medium: <strong>0</strong></span></div>
          <span className="status-sep">•</span>
          <div className="status-item"><span style={{color:'var(--green)'}}>Low: <strong>0</strong></span></div>
        </div>
      </div>
    </AppLayout>
  )
}
