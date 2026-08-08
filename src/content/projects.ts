export const featuredProjects = [
  {
    title: 'AURUM',
    subtitle: 'Adaptive Unified Routing for Urgent Medicine',
    status: 'Featured case study',
    description:
      "AI-powered emergency medical dispatch system targeting India's 108 ambulance network, built around four coordinated engines: APEX, ORACLE, NEXUS, and HELIX.",
    details: [
      'Presented at HackArena 2.0 Mumbai Zonals.',
      'Supported by a full SRS document and architectural feasibility review.',
      'Review scope covered WebSocket reliability, HL7/FHIR integration, and DPDP Act compliance.',
    ],
    tags: ['AI dispatch', 'routing engines', 'healthcare'],
    flow: ['APEX', 'ORACLE', 'NEXUS', 'HELIX'],
  },
  {
    title: 'VIGIL VMS',
    subtitle: 'WhatsApp-first visitor management',
    status: 'Client delivery',
    description:
      'QR-powered visitor management system with a React 18, TypeScript, Vite, and TailwindCSS frontend plus a PHP/MySQL backend.',
    details: [
      'Delivered under a hard client deadline.',
      'Included a complete design system for the product interface.',
    ],
    tags: ['React', 'TypeScript', 'PHP/MySQL'],
    flow: ['QR', 'WhatsApp', 'Visitor', 'Admin'],
  },
  {
    title: 'SAP.MCP Intelligence Gateway',
    subtitle: 'LLM to SAP OData bridge',
    status: 'Flagship technical project',
    description:
      'Production gateway connecting LLMs to SAP OData services across enterprise modules including MM, SD, FI, CO, PM, and WF.',
    details: [
      'Approves purchase orders through natural-language interaction.',
      'Queries vendor master data and manages inventory workflows.',
      'Directly informs the site hero motif: LLM <-> MCP <-> SAP OData.',
    ],
    tags: ['MCP', 'SAP OData', 'enterprise AI'],
    flow: ['LLM', 'MCP', 'SAP', 'OData'],
  },
  {
    title: 'NoteSphere',
    subtitle: 'Full-stack notes and knowledge platform',
    status: 'Collaboration',
    description:
      'Knowledge platform built with Next.js 14, Firebase, and Gemini Pro in collaboration with Manish Patil and Abid Abdulla.',
    details: [
      'Combines note capture, retrieval, and AI-assisted knowledge workflows.',
    ],
    tags: ['Next.js', 'Firebase', 'Gemini Pro'],
    flow: ['Notes', 'Firebase', 'Gemini', 'Search'],
  },
  {
    title: 'SCRIPT',
    subtitle: 'Multilingual courier parcel tracking',
    status: 'In development',
    description:
      'Marathi / Hindi / English parcel-tracking system that reads ink stamps and handwritten waybill data via OCR and vision-LLMs.',
    details: [
      'Uses a hybrid extraction pipeline.',
      'Includes a human-in-the-loop review console.',
    ],
    tags: ['OCR', 'vision LLMs', 'logistics'],
    flow: ['Stamp', 'OCR', 'Review', 'Tracking'],
  },
] as const

export const compactProjects = [
  'Quantum Variational Classifier',
  'SeaQuel',
  'Smart Dynamic Traffic Management',
  'Barcode Generator',
] as const
