import React, { useState } from 'react'

export default function NewScanModal({ onClose, onSuccess }) {
  const [name, setName] = useState('')
  const [type, setType] = useState('Greybox')
  const [target, setTarget] = useState('')

  const handleCreate = () => {
    if (!name.trim() || !target.trim()) return
    onSuccess()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">New Scan</h3>
          <button className="modal-close" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Scan Name</label>
            <input
              className="input"
              placeholder="e.g. Web App Servers"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Scan Type</label>
            <select
              className="input"
              value={type}
              onChange={e => setType(e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              <option>Greybox</option>
              <option>Blackbox</option>
              <option>Whitebox</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>Target URL / IP</label>
            <input
              className="input"
              placeholder="e.g. https://example.com"
              value={target}
              onChange={e => setTarget(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '6px', justifyContent: 'flex-end' }}>
            <button className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button
              className="btn btn-primary"
              onClick={handleCreate}
              disabled={!name.trim() || !target.trim()}
              style={{ opacity: (!name.trim() || !target.trim()) ? 0.5 : 1 }}
            >
              Start Scan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
