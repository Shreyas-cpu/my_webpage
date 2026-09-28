export const profileFacts = {
  displayName: 'Shreyas Mudholkar',
  initials: 'SM',
  role: 'AI Systems Integration Engineer / MCP & Enterprise AI Developer',
  positioning: 'Connecting LLMs to the enterprise systems that run the real world.',
  resumePath: '/resume/Shreyas_Resume.pdf',
  about:
    'Final-year B.Tech Computer Science student at Jawaharlal Nehru Engineering College (JNEC), MGM University, Chhatrapati Sambhajinagar (Aurangabad). Currently Software Engineering Intern at Etzel IT Solutions, where he engineered the production SAP-BTP-MCP Gateway. His engineering domain: Model Context Protocol (MCP) systems, multi-agent AI architectures, deterministic enterprise integration, and applied AI platforms.',
  contact: {
    github: 'https://github.com/Shreyas-cpu',
    linkedin: 'https://linkedin.com/in/shreyasmudholkar',
    email: 'shreyasmudholkar12345@gmail.com',
    phone: '+91 8830030979',
  },
  education: {
    institution:
      'Jawaharlal Nehru Engineering College (JNEC), MGM University, CSN',
    degree: 'B.Tech, Computer Science',
    dates: 'Expected May 2027',
    cgpa: '8.62 / 10',
  },
} as const

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const

export const experience = [
  {
    company: 'Etzel IT Solutions & Consultancy',
    role: 'Software Engineering Intern',
    dates: 'May 2026 – Present',
    points: [
      'Engineered 4+ industry-ready software products, translating requirements from 15+ industrial client visits into scalable, resilient architectures.',
      'Architected and deployed the production SAP-BTP-MCP Gateway, connecting LLMs deterministically to SAP BTP and OData services across MM, SD, FI, CO, PM, and WF modules.',
      'Attended the MCP Dev Summit Mumbai 2026 at the Linux Foundation event hosted at Jio World Convention Centre.',
    ],
  },
  {
    company: 'Indian Space Lab',
    role: 'Aerospace Technical Intern',
    dates: 'Feb 2026 – Apr 2026',
    points: [
      'Engineered automated data pipelines using Python, Pandas, and NumPy to accelerate drone telemetry data analysis during live test flights.',
      'Implemented real-time sensor stream parsing and spatial coordinate sanity validation routines for UAV platforms.',
    ],
  },
] as const

export const leadership = [
  {
    title: 'Blackbox AI Maverick Club',
    role: 'Administrator & Technical Head',
    dates: 'Sep 2025 – Present',
    detail:
      'Scaled an AI/ML developer organization to 1,000+ community members and 200+ active developers by delivering 4 hands-on seminars on advanced AIML and agentic architectures.',
  },
  {
    title: 'Google Developer Community',
    role: 'Google Student Ambassador',
    dates: 'Aug 2025 – Aug 2026',
    detail:
      'Engaged 800+ students in Google community initiatives, securing Gemini student offers, and mobilized 1,200+ developers across technical campaigns.',
  },
  {
    title: 'TEDxMGMU / TEDx JNEC',
    role: 'Event Management Head',
    dates: 'Jan 2026 – Mar 2026',
    detail:
      'Delivered a high-impact flagship conference for 1,000+ attendees by supervising a 64-member organizing committee under global TEDx licensing guidelines.',
  },
  {
    title: 'E-Cell MGMU',
    role: 'Core Team Member',
    dates: '2024 – 2025',
    detail:
      'Member of a 113-person ecosystem driving student entrepreneurship, pitch events, and startup incubation initiatives.',
  },
] as const

export const skills = [
  {
    group: 'AI Systems & MCP',
    items: [
      'Model Context Protocol (MCP)',
      'Multi-Agent AI Systems',
      'LLM Tool Use & Function Calling',
      'LangChain & LangGraph',
      'RAG Pipelines',
      'Vision-LLM & OCR Pipelines',
      'Prompt Engineering',
    ],
  },
  {
    group: 'Enterprise & Backend',
    items: [
      'SAP BTP & OData APIs',
      'FastAPI',
      'Python',
      'Node.js',
      'WebSockets',
      'Docker & Kubernetes',
      'REST APIs & Microservices',
      'Linux / Arch Systems',
    ],
  },
  {
    group: 'Frontend & UI Engineering',
    items: [
      'React 19',
      'TypeScript',
      'Next.js',
      'Tailwind CSS v4',
      'GSAP 3 & ScrollTrigger',
      'Framer Motion',
      'Lenis Smooth Scroll',
      'Vite',
    ],
  },
  {
    group: 'Specialized & Foundations',
    items: [
      'IBM Qiskit & Quantum Information',
      'PyTorch & Scikit-learn',
      'NumPy & Pandas',
      'Rust, Go, C/C++, Java, SQL',
    ],
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
