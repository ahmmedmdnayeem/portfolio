import type {
  Project,
  Skill,
  Experience,
  Certification,
  Testimonial,
} from '@/lib/types/database';

const now = new Date().toISOString();

// Placeholder learning / portfolio projects — swap real GitHub work via the admin panel.
export const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'This Portfolio Site',
    slug: 'portfolio-site',
    description: 'The site you are looking at — built with Next.js 14, TypeScript, Supabase, and Tailwind.',
    long_description: 'A full-stack portfolio with public showcase, admin dashboard, contact form, and Supabase-backed CMS. Demonstrates end-to-end ownership of UI, data, and deployment.',
    category: 'web3',
    tech_stack: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    live_url: null,
    github_url: null,
    image_url: null,
    featured: true,
    status: 'completed',
    client_name: null,
    completion_date: '2026-05-01',
    sort_order: 1,
    created_at: now,
    updated_at: now,
  },
  {
    id: '2',
    title: 'Python Automation Toolkit',
    slug: 'python-automation',
    description: 'Collection of Python scripts for web scraping, data cleaning, and workflow automation.',
    long_description: 'Hands-on Python practice — scrapers, CSV/Excel processors, scheduled task runners. Built while studying Python fundamentals.',
    category: 'other',
    tech_stack: ['Python', 'BeautifulSoup', 'Pandas', 'Requests'],
    live_url: null,
    github_url: null,
    image_url: null,
    featured: true,
    status: 'completed',
    client_name: null,
    completion_date: '2025-12-01',
    sort_order: 2,
    created_at: now,
    updated_at: now,
  },
  {
    id: '3',
    title: 'Solidity ERC-20 Token (Learning)',
    slug: 'erc20-token-learning',
    description: 'Custom ERC-20 token deployed to a testnet, with mint/burn and access control.',
    long_description: 'Walked through Solidity fundamentals — variables, mappings, modifiers, events. Deployed and verified on Sepolia testnet using Hardhat.',
    category: 'smart-contract',
    tech_stack: ['Solidity', 'Hardhat', 'OpenZeppelin', 'Ethers.js'],
    live_url: null,
    github_url: null,
    image_url: null,
    featured: true,
    status: 'completed',
    client_name: null,
    completion_date: '2025-11-15',
    sort_order: 3,
    created_at: now,
    updated_at: now,
  },
  {
    id: '4',
    title: 'Upwork Client Dashboard (Personal)',
    slug: 'upwork-dashboard',
    description: 'Personal dashboard tracking client projects, revenue, and delivery deadlines.',
    long_description: 'Combining marketing experience with new dev skills — built this to manage my own freelance pipeline.',
    category: 'other',
    tech_stack: ['Next.js', 'Supabase', 'Tailwind'],
    live_url: null,
    github_url: null,
    image_url: null,
    featured: false,
    status: 'in-progress',
    client_name: null,
    completion_date: null,
    sort_order: 4,
    created_at: now,
    updated_at: now,
  },
  {
    id: '5',
    title: 'Marketing Copy Generator',
    slug: 'copy-generator',
    description: 'AI-assisted tool that drafts marketing copy variations using prompt templates.',
    long_description: 'Combines my marketing instincts with Python + LLM APIs. Templates for ads, emails, landing pages.',
    category: 'other',
    tech_stack: ['Python', 'OpenAI API', 'Streamlit'],
    live_url: null,
    github_url: null,
    image_url: null,
    featured: false,
    status: 'in-progress',
    client_name: null,
    completion_date: null,
    sort_order: 5,
    created_at: now,
    updated_at: now,
  },
];

export const fallbackSkills: Skill[] = [
  // Languages
  { id: '1', name: 'Python', category: 'languages', proficiency: 80, icon_name: null, years_experience: 2, sort_order: 1, created_at: now },
  { id: '2', name: 'JavaScript / TypeScript', category: 'languages', proficiency: 70, icon_name: null, years_experience: 1.5, sort_order: 2, created_at: now },
  { id: '3', name: 'HTML / CSS', category: 'languages', proficiency: 80, icon_name: null, years_experience: 2, sort_order: 3, created_at: now },
  { id: '4', name: 'SQL', category: 'languages', proficiency: 65, icon_name: null, years_experience: 1, sort_order: 4, created_at: now },

  // Full-stack
  { id: '10', name: 'Next.js / React', category: 'fullstack', proficiency: 72, icon_name: null, years_experience: 1, sort_order: 10, created_at: now },
  { id: '11', name: 'Node.js', category: 'fullstack', proficiency: 70, icon_name: null, years_experience: 1, sort_order: 11, created_at: now },
  { id: '12', name: 'Tailwind CSS', category: 'fullstack', proficiency: 78, icon_name: null, years_experience: 1, sort_order: 12, created_at: now },
  { id: '13', name: 'REST APIs', category: 'fullstack', proficiency: 70, icon_name: null, years_experience: 1, sort_order: 13, created_at: now },
  { id: '14', name: 'PostgreSQL', category: 'fullstack', proficiency: 65, icon_name: null, years_experience: 1, sort_order: 14, created_at: now },
  { id: '15', name: 'Git / GitHub', category: 'fullstack', proficiency: 80, icon_name: null, years_experience: 2, sort_order: 15, created_at: now },

  // Blockchain (fundamentals)
  { id: '20', name: 'Solidity Basics', category: 'blockchain', proficiency: 60, icon_name: null, years_experience: 0.5, sort_order: 20, created_at: now },
  { id: '21', name: 'Web3 / Ethers.js', category: 'blockchain', proficiency: 55, icon_name: null, years_experience: 0.5, sort_order: 21, created_at: now },
  { id: '22', name: 'EVM Fundamentals', category: 'blockchain', proficiency: 55, icon_name: null, years_experience: 0.5, sort_order: 22, created_at: now },
  { id: '23', name: 'DeFi Concepts', category: 'blockchain', proficiency: 60, icon_name: null, years_experience: 0.5, sort_order: 23, created_at: now },

  // Marketing (the proven track record)
  { id: '30', name: 'Upwork Freelancing', category: 'marketing', proficiency: 95, icon_name: null, years_experience: 2, sort_order: 30, created_at: now },
  { id: '31', name: 'Copywriting', category: 'marketing', proficiency: 92, icon_name: null, years_experience: 2, sort_order: 31, created_at: now },
  { id: '32', name: 'Digital Marketing', category: 'marketing', proficiency: 90, icon_name: null, years_experience: 2, sort_order: 32, created_at: now },
  { id: '33', name: 'Client Management', category: 'marketing', proficiency: 95, icon_name: null, years_experience: 2, sort_order: 33, created_at: now },
  { id: '34', name: 'SEO & Analytics', category: 'marketing', proficiency: 85, icon_name: null, years_experience: 2, sort_order: 34, created_at: now },
  { id: '35', name: 'Growth Strategy', category: 'marketing', proficiency: 85, icon_name: null, years_experience: 2, sort_order: 35, created_at: now },

  // Tools
  { id: '40', name: 'VS Code', category: 'tools', proficiency: 90, icon_name: null, years_experience: 2, sort_order: 40, created_at: now },
  { id: '41', name: 'Linux / Bash', category: 'tools', proficiency: 70, icon_name: null, years_experience: 1.5, sort_order: 41, created_at: now },
  { id: '42', name: 'Notion / Figma', category: 'tools', proficiency: 80, icon_name: null, years_experience: 2, sort_order: 42, created_at: now },
];

export const fallbackExperience: Experience[] = [
  {
    id: '1',
    company: 'Self-Taught — Tech Pivot',
    role: 'Aspiring Full-Stack & Python Developer',
    description: 'Actively transitioning from marketing into software engineering. Building projects in Python, Next.js, and exploring blockchain fundamentals. Open to internship and entry-level opportunities.',
    responsibilities: [
      'Python scripting & automation projects',
      'Full-stack web apps with Next.js + Supabase',
      'Studying blockchain fundamentals (Solidity, Web3)',
      'Open-source learning & GitHub contributions',
    ],
    tech_used: ['Python', 'Next.js', 'React', 'Node.js', 'Solidity'],
    start_date: '2025-01-01',
    end_date: null,
    is_current: true,
    company_url: null,
    sort_order: 1,
    created_at: now,
  },
  {
    id: '2',
    company: 'Upwork — Top 1% Freelancer',
    role: 'Marketing & Copywriting Specialist',
    description: 'Earned $100,000+ in revenue over 2 years delivering marketing services to clients worldwide. Achieved Top 1% freelancer status through consistent quality, communication, and on-time delivery.',
    responsibilities: [
      'Delivered marketing campaigns and copywriting for 50+ clients',
      'Built long-term retainer relationships and repeat business',
      'Generated measurable revenue and growth outcomes',
      'Managed end-to-end project delivery across time zones',
    ],
    tech_used: ['SEO', 'Copywriting', 'Analytics', 'Client Strategy'],
    start_date: '2023-01-01',
    end_date: null,
    is_current: true,
    company_url: 'https://upwork.com',
    sort_order: 2,
    created_at: now,
  },
];

export const fallbackCertifications: Certification[] = [
  { id: '1', name: 'Top Rated Plus — Upwork', issuer: 'Upwork', issue_date: '2024-06-01', expiry_date: null, credential_url: 'https://upwork.com', badge_url: null, category: 'platform', sort_order: 1, created_at: now },
  { id: '2', name: 'Python for Everybody', issuer: 'University of Michigan (Coursera)', issue_date: '2024-08-10', expiry_date: null, credential_url: null, badge_url: null, category: 'platform', sort_order: 2, created_at: now },
  { id: '3', name: 'Meta Front-End Developer (in progress)', issuer: 'Meta / Coursera', issue_date: '2025-02-01', expiry_date: null, credential_url: null, badge_url: null, category: 'platform', sort_order: 3, created_at: now },
  { id: '4', name: 'Ethereum & Solidity: The Complete Developer Guide', issuer: 'Udemy', issue_date: '2025-03-01', expiry_date: null, credential_url: null, badge_url: null, category: 'blockchain', sort_order: 4, created_at: now },
  { id: '5', name: 'HSK Chinese Proficiency', issuer: 'Hanban', issue_date: '2023-05-01', expiry_date: null, credential_url: null, badge_url: null, category: 'platform', sort_order: 5, created_at: now },
];

// Placeholder Upwork-style testimonials — replace with real client quotes via admin panel.
export const fallbackTestimonials: Testimonial[] = [
  { id: '1', client_name: 'Marketing Client', client_title: 'Founder', client_company: 'E-commerce Brand', client_avatar_url: null, content: 'Communication and delivery were excellent. Hit every deadline. Definitely on the Top 1% list for a reason.', rating: 5, platform: 'upwork', project_type: 'Marketing', is_featured: true, sort_order: 1, created_at: now },
  { id: '2', client_name: 'Repeat Client', client_title: 'CEO', client_company: 'SaaS Startup', client_avatar_url: null, content: 'Reliable, thoughtful, and a pleasure to work with. Already booked the next project.', rating: 5, platform: 'upwork', project_type: 'Copywriting', is_featured: true, sort_order: 2, created_at: now },
  { id: '3', client_name: 'Long-term Client', client_title: 'Marketing Director', client_company: 'Agency', client_avatar_url: null, content: 'Patient, detail-oriented, and consistently delivers quality. One of my go-to freelancers.', rating: 5, platform: 'upwork', project_type: 'Content', is_featured: true, sort_order: 3, created_at: now },
];