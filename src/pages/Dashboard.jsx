import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import { orgStats, scans } from '../data/mockData'
import { useToast } from '../context/ToastContext'
import NewScanModal from '../components/NewScanModal'
import './Dashboard.css'

function SeverityCard({ label, count, change, up, icon }) {
  return (
    <div className="severity-card">
      <div className="severity-header">
        <span className="severity-label">{label}</span>
        <span className={`severity-icon ${label.toLowerCase().replace(' severity', '')}`}>{icon}</span>
      </div>
      <div className="severity-count">{count}</div>
      <div className={`severity-change ${up ? 'up' : 'down'}`}>
        {up ? '↑' : '↓'} {change} {up ? 'increase' : 'decrease'} than yesterday
      </div>
    </div>
  )
}

function VulnBadges({ vuln }) {
  return (
    <div className="vuln-badges">
      {vuln.critical !== null && <span className="vuln-badge vuln-critical">{vuln.critical}</span>}
      {vuln.high !== null && <span className="vuln-badge vuln-high">{vuln.high}</span>}
      {vuln.medium !== null && <span className="vuln-badge vuln-medium">{vuln.medium}</span>}
      {vuln.low !== null && <span className="vuln-badge vuln-low">{vuln.low}</span>}
    </div>
  )
}

function StatusChip({ status }) {
  const map = {
    completed: 'status-completed',
    scheduled: 'status-scheduled',
    failed: 'status-failed',
  }
  return <span className={`status-chip ${map[status] || ''}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
}

function ProgressBar({ value, status }) {
  return (
    <div className="scan-progress">
      <div className="progress-bar">
        <div
          className={`progress-fill ${status === 'failed' ? 'failed' : ''}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="progress-text">{value}%</span>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [search, setSearch] = useState('')
  const [showNewScan, setShowNewScan] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [page, setPage] = useState(1)
  const perPage = 15

  const filtered = useMemo(() => {
    return scans.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                          s.type.toLowerCase().includes(search.toLowerCase())
      const matchFilter = filterStatus === 'all' || s.status === filterStatus
      return matchSearch && matchFilter
    })
  }, [search, filterStatus])

  const paginated = filtered.slice(0, page * perPage)
  const hasMore = filtered.length > paginated.length

  const handleExport = () => addToast('Report exported successfully!', 'success')
  const handleStopScan = () => addToast('Scan stopped.', 'error')
  const handleNewScan = () => setShowNewScan(true)

  const { severity } = orgStats

  return (
    <AppLayout>
      <div className="dashboard-page fade-in">
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
            <span className="breadcrumb-link">Private Assets</span>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-active teal">New Scan</span>
          </div>
          <div className="header-actions">
            <button className="btn btn-outline" onClick={handleExport}>Export Report</button>
            <button className="btn btn-danger" onClick={handleStopScan}>Stop Scan</button>
          </div>
        </div>

        {/* Org Stats */}
        <div className="org-stats-bar">
          <div className="org-stat"><span className="org-label">Org:</span><strong>{orgStats.org}</strong></div>
          <div className="org-divider hide-mobile" />
          <div className="org-stat"><span className="org-label">Owner:</span><strong>{orgStats.owner}</strong></div>
          <div className="org-divider hide-mobile" />
          <div className="org-stat"><span className="org-label">Total Scans:</span><strong>{orgStats.totalScans}</strong></div>
          <div className="org-divider hide-mobile" />
          <div className="org-stat"><span className="org-label">Scheduled:</span><strong>{orgStats.scheduled}</strong></div>
          <div className="org-divider hide-mobile" />
          <div className="org-stat hide-mobile"><span className="org-label">Rescans:</span><strong>{orgStats.rescans}</strong></div>
          <div className="org-divider hide-mobile" />
          <div className="org-stat hide-mobile"><span className="org-label">Failed Scans:</span><strong>{orgStats.failedScans}</strong></div>
          <div className="org-stat org-refresh">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{animation: 'spin 3s linear infinite'}}>
              <path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
            </svg>
            {orgStats.lastUpdated}
          </div>
        </div>

        {/* Severity Cards */}
        <div className="severity-grid">
          <SeverityCard label="Critical Severity" count={severity.critical.count} change={severity.critical.change} up={severity.critical.up} icon="🚫" />
          <SeverityCard label="High Severity" count={severity.high.count} change={severity.high.change} up={severity.high.up} icon="⚠️" />
          <SeverityCard label="Medium Severity" count={severity.medium.count} change={severity.medium.change} up={severity.medium.up} icon="⚠️" />
          <SeverityCard label="Low Severity" count={severity.low.count} change={severity.low.change} up={severity.low.up} icon="🔍" />
        </div>

        {/* Scan Table Container */}
        <div className="scans-section">
          {/* Toolbar */}
          <div className="scan-toolbar">
            <div className="search-wrap">
              <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className="scan-search"
                placeholder="Search scans by name or type..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch('')}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
            <div className="toolbar-right">
              <div className="filter-wrap">
                <button
                  className={`btn btn-outline ${showFilter ? 'active' : ''}`}
                  onClick={() => setShowFilter(s => !s)}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                  </svg>
                  Filter
                </button>
                {showFilter && (
                  <div className="filter-dropdown">
                    {['all', 'completed', 'scheduled', 'failed'].map(s => (
                      <button
                        key={s}
                        className={`filter-option ${filterStatus === s ? 'active' : ''}`}
                        onClick={() => { setFilterStatus(s); setShowFilter(false) }}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button className="btn btn-outline hide-mobile">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6" strokeWidth="3"/>
                  <line x1="3" y1="12" x2="3.01" y2="12" strokeWidth="3"/><line x1="3" y1="18" x2="3.01" y2="18" strokeWidth="3"/>
                </svg>
                Column
              </button>
              <button className="btn btn-primary" onClick={handleNewScan}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                New scan
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="scan-table-wrap">
            <table className="scan-table">
              <thead>
                <tr>
                  <th>Scan Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th className="hide-mobile">Vulnerability</th>
                  <th>Last Scan</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((scan) => (
                  <tr
                    key={scan.id}
                    className="scan-row"
                    onClick={() => navigate(`/scans/${scan.id}`)}
                  >
                    <td className="scan-name">{scan.name}</td>
                    <td className="scan-type">{scan.type}</td>
                    <td><StatusChip status={scan.status} /></td>
                    <td><ProgressBar value={scan.progress} status={scan.status} /></td>
                    <td className="hide-mobile"><VulnBadges vuln={scan.vuln} /></td>
                    <td className="scan-last">{scan.lastScan}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="empty-state">
                      No scans match your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="table-footer">
            <span className="showing-label">
              Showing {Math.min(paginated.length, filtered.length)} of {filtered.length} Scans
            </span>
            <div className="pagination">
              <button
                className="page-btn"
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                ‹
              </button>
              <button
                className="page-btn"
                disabled={!hasMore}
                onClick={() => setPage(p => p + 1)}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {showNewScan && <NewScanModal onClose={() => setShowNewScan(false)} onSuccess={() => {
        setShowNewScan(false)
        addToast('New scan initiated!', 'success')
        navigate('/scans/active')
      }} />}
    </AppLayout>
  )
}
