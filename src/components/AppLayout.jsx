import React, { useState } from 'react'
import Sidebar from './Sidebar'
import './AppLayout.css'

export default function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="app-layout">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <main className="app-main">
        <div className="mobile-header show-mobile">
          <button className="hamburger" onClick={() => setMobileOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div className="mobile-logo">aps</div>
        </div>
        {children}
      </main>
    </div>
  )
}
