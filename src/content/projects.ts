export const featuredProjects = [
  {
    title: 'SAP-BTP-MCP Gateway',
    subtitle: 'LLM to SAP Enterprise Bridge',
    status: 'In Production at Etzel',
    description:
      'Enterprise Model Context Protocol gateway deployed in active production at Etzel IT Solutions, enabling deterministic natural-language interactions across SAP BTP and OData services.',
    details: [
      'Empowers employees to execute purchase-order approvals, vendor queries, and inventory checks via natural dialogue.',
      'Bridges LLMs to SAP ERP modules including MM, SD, FI, CO, PM, and WF with strict auditability.',
      'Featured architectural motif for the site hero: LLM ↔ MCP ↔ SAP OData.',
    ],
    tags: ['Model Context Protocol', 'SAP BTP', 'OData', 'Python', 'Enterprise AI'],
    flow: ['LLM', 'MCP Server', 'SAP BTP', 'OData Service'],
  },
  {
    title: 'AURUM',
    subtitle: 'Emergency Intelligence & Dynamic Routing Platform',
    status: 'Flagship Platform',
    description:
      "Optimized real-time emergency response and constraint-based routing for India's 108 ambulance network, engineered around four coordinated AI engines: APEX, ORACLE, NEXUS, and HELIX.",
    details: [
      'Features dynamic WebSockets, real-time telemetry, and Integer Linear Programming (ILP) algorithms.',
      'Presented at HackArena 2.0 Mumbai Zonals with complete architectural SRS and DPDP Act compliance review.',
      'Integrates HL7/FHIR hospital electronic record interchange with emergency response dispatchers.',
    ],
    tags: ['AI Dispatch', 'Integer Linear Programming', 'FastAPI', 'WebSockets', 'React'],
    flow: ['APEX (Triage)', 'ORACLE (Forecast)', 'NEXUS (Routing)', 'HELIX (Dispatch)'],
  },
  {
    title: 'AegisOps',
    subtitle: 'Autonomous AI Cloud Remediation',
    status: 'Autonomous SRE Platform',
    description:
      'Autonomous Site Reliability Engineering platform powered by a dual-LLM backend to instantly detect, isolate, and remediate cloud infrastructure incidents in real time.',
    details: [
      'Slashed Mean Time To Recovery (MTTR) by 95% and reduced potential incident downtime costs by ~$513K.',
      'Autonomous dual-LLM architecture: Diagnostician LLM parses anomalies while Remediator LLM generates and verifies canary fixes.',
      'Real-time WebSocket event bus with human-in-the-loop safety checkpoints.',
    ],
    tags: ['LangChain', 'FastAPI', 'React', 'WebSockets', 'Autonomous SRE'],
    flow: ['Telemetry', 'Diagnostician LLM', 'Safety Sandbox', 'Remediator LLM'],
  },
  {
    title: 'VIGIL VMS',
    subtitle: 'WhatsApp-First Visitor Management System',
    status: 'Client Production Delivery',
    description:
      'Production QR and WhatsApp-driven visitor management platform engineered under hard deadlines for commercial facilities, featuring automated host notifications and security passes.',
    details: [
      'Engineered with a high-performance React 19, TypeScript, and Tailwind CSS frontend paired with a hardened PHP/MySQL API.',
      'Delivered custom design system and mobile-optimized guard console.',
    ],
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'PHP / MySQL', 'QR Protocol'],
    flow: ['Visitor QR', 'WhatsApp API', 'Host Approval', 'Security Clearance'],
  },
  {
    title: 'NoteSphere',
    subtitle: 'Knowledge Graph & Neural Notes Engine',
    status: 'Collaborative AI Product',
    description:
      'Next-generation knowledge engine built with Next.js 14, Firebase, and Gemini Pro in collaboration with Manish Patil and Abid Abdulla, combining semantic search with AI synthesis.',
    details: [
      'Embeds multidimensional semantic search and context retrieval over unstructured engineering notes.',
      'Features real-time collaborative editing and autonomous summary synthesis.',
    ],
    tags: ['Next.js 14', 'Firebase', 'Gemini Pro', 'Vector Search'],
    flow: ['Raw Notes', 'Vector Embeddings', 'Gemini Pro', 'Knowledge Synthesis'],
  },
  {
    title: 'SCRIPT',
    subtitle: 'Multilingual Indic Waybill & OCR Pipeline',
    status: 'In Active R&D',
    description:
      'Marathi, Hindi, and English courier parcel tracking system that parses stamped, degraded, and handwritten waybills via hybrid vision-LLM pipelines.',
    details: [
      'Utilizes localized OCR models augmented by multimodal LLMs for zero-shot handwriting recognition.',
      'Includes a human-in-the-loop verification console for low-confidence scans.',
    ],
    tags: ['Multimodal LLM', 'OCR', 'Indic NLP', 'Logistics AI'],
    flow: ['Image Capture', 'Preprocessing', 'Vision LLM', 'Verified Tracking'],
  },
] as const

export const compactProjects = [
  'Quantum Variational Classifier (IBM Qiskit)',
  'SeaQuel (Natural Language to SQL Engine)',
  'Smart Dynamic Traffic Optimization (QNN)',
  'Autonomous Barcode Synthesis Engine',
] as const
