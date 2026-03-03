import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useToast } from '../context/ToastContext'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { addToast } = useToast()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [agreed, setAgreed] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.includes('@')) e.email = 'Valid email required'
    if (form.password.length < 8) e.password = 'Min 8 characters'
    if (!agreed) e.agreed = 'You must agree to continue'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    addToast('Account created! Welcome to APS.', 'success')
    setTimeout(() => navigate('/dashboard'), 500)
  }

  const handleSocial = (name) => {
    addToast(`Signing in with ${name}...`, 'info')
    setTimeout(() => navigate('/dashboard'), 800)
  }

  return (
    <div className="login-page">
      {/* Left Panel */}
      <div className="login-left">
        <div className="login-left-top">
          <div className="login-brand">
            <div className="login-brand-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#0CC8A8" strokeWidth="2"/>
                <path d="M8 12l3 3 5-5" stroke="#0CC8A8" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span>aps</span>
          </div>
          <button className="theme-toggle-login" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>

        <div className="login-hero">
          <h1>
            Expert level Cybersecurity<br />
            in <span className="hero-accent">hours</span> not weeks.
          </h1>

          <div className="login-features">
            <p className="features-label">What's included</p>
            {[
              'Effortlessly spider and map targets to uncover hidden security flaws',
              'Deliver high-quality, validated findings in hours, not weeks.',
              'Generate professional, enterprise-grade security reports automatically.',
            ].map((f, i) => (
              <div key={i} className="feature-item">
                <span className="feature-check">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="login-trustpilot">
          <span className="tp-star">★</span>
          <span className="tp-label">Trustpilot</span>
          <div className="tp-rating">
            <strong>Rated 4.5/5.0</strong>
            <span className="tp-reviews">(100k+ reviews)</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="login-right">
        <div className="login-card">
          <h2 className="login-title">Sign up</h2>
          <p className="login-sub">
            Already have an account? <a href="#" className="login-link" onClick={(e) => { e.preventDefault(); addToast('Redirecting to login...', 'info'); setTimeout(() => navigate('/dashboard'), 800) }}>Log in</a>
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  className={`login-input ${errors.firstName ? 'error' : ''}`}
                  placeholder="First name*"
                  value={form.firstName}
                  onChange={e => { setForm(f => ({ ...f, firstName: e.target.value })); setErrors(ev => ({ ...ev, firstName: '' })) }}
                />
                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <input
                  className={`login-input ${errors.lastName ? 'error' : ''}`}
                  placeholder="Last name*"
                  value={form.lastName}
                  onChange={e => { setForm(f => ({ ...f, lastName: e.target.value })); setErrors(ev => ({ ...ev, lastName: '' })) }}
                />
                {errors.lastName && <span className="field-error">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <input
                className={`login-input ${errors.email ? 'error' : ''}`}
                type="email"
                placeholder="Email address*"
                value={form.email}
                onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(ev => ({ ...ev, email: '' })) }}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <div className="password-wrap">
                <input
                  className={`login-input ${errors.password ? 'error' : ''}`}
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password (8+ characters)*"
                  value={form.password}
                  onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setErrors(ev => ({ ...ev, password: '' })) }}
                />
                <button type="button" className="pass-toggle" onClick={() => setShowPass(s => !s)}>
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label className={`checkbox-label ${errors.agreed ? 'error' : ''}`}>
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={agreed}
                  onChange={e => { setAgreed(e.target.checked); setErrors(ev => ({ ...ev, agreed: '' })) }}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">
                  I agree to Aps's <a href="#" className="login-link">Terms &amp; Conditions</a> and acknowledge the <a href="#" className="login-link">Privacy Policy</a>
                </span>
              </label>
              {errors.agreed && <span className="field-error">{errors.agreed}</span>}
            </div>

            <button type="submit" className={`btn-create ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? (
                <span className="btn-spinner"></span>
              ) : 'Create account'}
            </button>
          </form>

          <div className="social-divider">
            <span>or</span>
          </div>

          <div className="social-row">
            <button className="social-btn apple" onClick={() => handleSocial('Apple')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>
            <button className="social-btn google" onClick={() => handleSocial('Google')}>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="social-btn meta" onClick={() => handleSocial('Meta')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Meta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
