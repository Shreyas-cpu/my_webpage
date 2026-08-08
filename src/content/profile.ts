export const profileFacts = {
  displayName: 'Shreyas Mudholkar',
  initials: 'SM',
  role: 'AI Systems Integration Engineer / MCP & Enterprise AI Developer',
  positioning: 'Connecting LLMs to the enterprise systems that run the real world.',
  resumePath: '/resume/Shreyas_Resume.pdf',
  about:
    'Final-year B.Tech Computer Science Engineering student at Jawaharlal Nehru Engineering College (JNEC), MGM University, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra. Currently completing a six-month internship at ETZEL IT Solutions & Consultancy while finishing his degree. His focus: building the bridge between large language models and enterprise systems - Model Context Protocol (MCP) architecture, multi-agent AI, and applied AI for Indian-context problems.',
  contact: {
    github: 'https://github.com/Shreyas-cpu',
    linkedin: 'https://linkedin.com/in/shreyasmudholkar',
    email: 'shreyasmudholkar12345@gmail.com',
  },
  education: {
    institution:
      'Jawaharlal Nehru Engineering College (JNEC), MGM University',
    degree: 'B.Tech, Computer Science Engineering',
    dates: 'Expected May 2027',
    cgpa: '8.62 / 10',
  },
} as const

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact Me', href: '#contact' },
] as const

export const experience = [
  {
    company: 'ETZEL IT Solutions & Consultancy',
    role: 'MCP / SAP ERP Integration Intern',
    dates: 'June - December 2026',
    points: [
      'Built the SAP.MCP Intelligence Gateway, connecting LLMs to SAP OData services across MM, SD, FI, CO, PM, and WF modules.',
      'The gateway is in active production use for purchase-order approvals, vendor master-data queries, inventory management, and workflow processing through natural-language SAP interaction.',
      'Attended the MCP Dev Summit Mumbai 2026 at the Linux Foundation event hosted at Jio World Convention Centre.',
    ],
  },
] as const

export const leadership = [
  {
    title: 'E-Cell',
    detail: 'Member of a 113-person team driving campus entrepreneurship initiatives.',
  },
  {
    title: 'TEDx JNEC',
    detail: 'Member of a 64-person organizing committee.',
  },
  {
    title: 'Google Student Ambassador',
    detail: 'Building and supporting a developer community of 800+ members.',
  },
] as const

export const skills = [
  {
    group: 'AI / Integration',
    items: [
      'Model Context Protocol',
      'multi-agent AI systems',
      'LLM tool-use',
      'SAP OData',
      'prompt engineering',
      'OCR / vision-LLM pipelines',
    ],
  },
  {
    group: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Vite'],
  },
  {
    group: 'Backend / Data',
    items: ['Node.js', 'PHP / MySQL', 'Firebase'],
  },
  {
    group: 'Other',
    items: ['IBM Qiskit', 'quantum computing fundamentals', 'Python'],
  },
] as const

export const designDirection = {
  thesis: 'Routing, connection, and signal flow between AI and enterprise systems.',
  base: '#0B0E14',
  text: '#EDEFF3',
  accent: '#FF8A3D',
  displayFont: 'Space Grotesk',
  bodyFont: 'Inter',
  monoFont: 'JetBrains Mono',
} as const

export const resumePlaceholders = [
  'Full name',
  'Email',
  'LinkedIn URL',
  'Exact education dates',
  'CGPA / scores',
  'Resume PDF',
] as const
