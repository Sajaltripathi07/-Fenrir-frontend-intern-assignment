export const orgStats = {
  org: 'Project X',
  owner: 'Nammagiri',
  totalScans: 100,
  scheduled: 1000,
  rescans: 100,
  failedScans: 100,
  lastUpdated: '10 mins ago',
  severity: {
    critical: { count: 86, change: '+2%', up: true },
    high: { count: 16, change: '+0.9%', up: true },
    medium: { count: 26, change: '+0.9%', up: false },
    low: { count: 16, change: '+0.9%', up: true },
  }
}

export const scans = [
  { id: 1, name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 2, name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 3, name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 4, name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 5, name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 6, name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 7, name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 5, high: 12, medium: 21, low: 18 }, lastScan: '4d ago' },
  { id: 8, name: 'Web App Servers', type: 'Greybox', status: 'scheduled', progress: 100, vuln: { critical: 5, high: 12, medium: null, low: null }, lastScan: '4d ago' },
  { id: 9, name: 'Web App Servers', type: 'Greybox', status: 'scheduled', progress: 100, vuln: { critical: 5, high: 12, medium: null, low: null }, lastScan: '4d ago' },
  { id: 10, name: 'IoT Devices', type: 'Blackbox', status: 'failed', progress: 10, vuln: { critical: 2, high: 4, medium: 8, low: 1 }, lastScan: '3d ago' },
  { id: 11, name: 'Temp Data', type: 'Blackbox', status: 'failed', progress: 10, vuln: { critical: 2, high: 4, medium: 8, low: 1 }, lastScan: '3d ago' },
  { id: 12, name: 'API Gateway', type: 'Blackbox', status: 'completed', progress: 100, vuln: { critical: 3, high: 7, medium: 14, low: 9 }, lastScan: '2d ago' },
  { id: 13, name: 'Mobile Backend', type: 'Greybox', status: 'completed', progress: 100, vuln: { critical: 1, high: 5, medium: 11, low: 6 }, lastScan: '1d ago' },
  { id: 14, name: 'Cloud Infrastructure', type: 'Whitebox', status: 'scheduled', progress: 0, vuln: { critical: null, high: null, medium: null, low: null }, lastScan: '—' },
  { id: 15, name: 'DNS & Network', type: 'Blackbox', status: 'completed', progress: 100, vuln: { critical: 4, high: 9, medium: 16, low: 12 }, lastScan: '5d ago' },
]

export const activeScan = {
  id: 'scan-active-001',
  name: 'New Scan',
  breadcrumb: ['Private Assets', 'New Scan'],
  progress: 0,
  status: 'in_progress',
  currentStep: 0,
  steps: ['Spidering', 'Mapping', 'Testing', 'Validating', 'Reporting'],
  scanType: 'Grey Box',
  targets: 'google.com',
  startedAt: 'Nov 22, 09:00AM',
  credentials: '2 Active',
  files: 'Control.pdf',
  checklists: '40/350',
  subAgents: 0,
  parallelExecutions: 2,
  operations: 1,
  severityCounts: { critical: 0, high: 0, medium: 0, low: 0 },
}

export const activityLogs = [
  {
    time: '09:00:00',
    text: "I'll begin a systematic penetration test on ",
    highlight: 'helpdesk.democorp.com',
    rest: ". Let me start with reconnaissance and enumeration.",
    type: 'url'
  },
  {
    time: '09:01:00',
    text: "Good! target is online. Now let me perform port scanning to identify running services.",
    type: 'normal'
  },
  {
    time: '09:02:00',
    text: "Excellent reconnaissance results:",
    block: "- helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)",
    rest: "\nLet me probe the web server on target first to understand its structure.",
    type: 'block'
  },
  {
    time: '09:03:00',
    text: `Great! I found a login page for a Help Desk Platform. I can see a useful comment: `,
    code1: '"TODO: Delete the testing account (test:test)"',
    mid: `. Let me test this credential. The login redirects to `,
    code2: '/password/test',
    rest: '. Let me follow that path and explore it.',
    type: 'mixed'
  },
  {
    time: '09:04:00',
    text: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to ",
    code1: "'#'",
    rest: " which means the current page. Let me try a different approach.",
    type: 'code'
  },
  {
    time: '09:05:00',
    text: "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the ",
    highlight: 'test:test',
    rest: " password directly on other endpoints.",
    type: 'url'
  },
  {
    time: '09:06:00',
    text: "Great! I can access the dashboard using the ",
    highlight2: "'X-UserId: 10032'",
    mid: " header.\nThe dashboard shows \"Welcome, John Doe\". This suggests an ",
    bold: "**IDOR vulnerability**",
    rest: " - I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application...",
    type: 'idor'
  },
]

export const verificationLogs = [
  { time: '09:07:00', text: 'Initiating verification loop for IDOR vulnerability on /api/user/profile endpoint.', type: 'normal' },
  { time: '09:08:00', text: 'Testing X-UserId header with values: 10033, 10034, 10035...', type: 'normal' },
  { time: '09:09:00', text: 'Confirmed: All user IDs return valid profile data. No authorization checks present.', highlight: 'Confirmed', type: 'url' },
  { time: '09:10:00', text: 'Running SQL injection verification on /api/auth/login — time-based blind injection detected.', type: 'normal' },
  { time: '09:11:00', text: 'Payload: ', code1: "' OR SLEEP(5)--", rest: ' — Response time: 5.012s. Injection confirmed.', type: 'code' },
  { time: '09:12:00', text: 'Rate limiting check on /api/search — sending 500 requests in 60s window...', type: 'normal' },
  { time: '09:13:00', text: 'No 429 responses received. Rate limiting not enforced.', highlight: 'No 429 responses', type: 'url' },
]

export const findings = [
  {
    id: 1,
    severity: 'critical',
    time: '10:45:23',
    title: 'SQL Injection in Authentication Endpoint',
    endpoint: '/api/users/profile',
    description: 'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.',
  },
  {
    id: 2,
    severity: 'high',
    time: '10:45:23',
    title: 'Unauthorized Access to User Metadata',
    endpoint: '/api/auth/login',
    description: 'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.',
  },
  {
    id: 3,
    severity: 'medium',
    time: '10:46:01',
    title: 'Broken Authentication Rate Limiting',
    endpoint: '/api/search',
    description: 'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.',
  },
  {
    id: 4,
    severity: 'high',
    time: '10:47:15',
    title: 'IDOR in User Profile Endpoint',
    endpoint: '/api/user/profile',
    description: 'Insecure Direct Object Reference allows any authenticated user to access other users\' profile data by modifying the X-UserId header.',
  },
  {
    id: 5,
    severity: 'low',
    time: '10:48:32',
    title: 'Missing Security Headers',
    endpoint: '/',
    description: 'Several security headers are missing: X-Frame-Options, X-XSS-Protection, Content-Security-Policy.',
  },
]
