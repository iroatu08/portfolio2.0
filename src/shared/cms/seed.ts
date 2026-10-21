import type { Article, Project, SiteSettings, Skill, Testimonial } from './types'

export const siteSettings: SiteSettings = {
  name: 'Iroatu Chibuzor Prince',
  role: 'Software Developer',
  bio: 'I build scalable, accessible web and mobile products across healthcare, legaltech, proptech, and agritech — from shared UI systems to production apps on the stores.',
  location: 'Lagos, Nigeria',
  email: 'iroatu7@gmail.com',
  avatarUrl: '/portraits/avatar.jpg',
  aboutPortraitUrl: '/portraits/about.jpg',
  playPortraitUrl: '/portraits/play.jpg',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/princeiroatu/' },
    { label: 'GitHub', href: 'https://github.com/iroatu08' },
    { label: 'Email', href: 'mailto:iroatu7@gmail.com' },
  ],
  nextFocus: 'Next stop: AI engineering & leadership.',
}

export const skills: Skill[] = [
  { id: 'react', label: 'React', category: 'Frameworks' },
  { id: 'ts', label: 'TypeScript', category: 'Languages' },
  { id: 'rn', label: 'React Native', category: 'Frameworks' },
  { id: 'next', label: 'Next.js', category: 'Frameworks' },
  { id: 'gsap', label: 'GSAP', category: 'Motion' },
  { id: 'tw', label: 'Tailwind', category: 'Styling' },
  { id: 'ds', label: 'Design Systems', category: 'Practices' },
  { id: 'ai', label: 'AI Direction', category: 'Focus' },
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Prince ships polished interfaces under real product pressure — healthcare flows, auth, and consultation UX that feel trustworthy.',
    author: 'Product partner',
    title: 'Call A Doctor',
  },
  {
    id: 't2',
    quote:
      'He translates Figma into production-ready, accessible UI and keeps data flow with the backend clean and reliable.',
    author: 'Engineering collaborator',
    title: 'Fragvest / Lextech',
  },
  {
    id: 't3',
    quote:
      'Strong ownership of component patterns and mentoring through review — the kind of lead energy AI teams need.',
    author: 'Peer engineer',
    title: 'Cross-team',
  },
]

export const projects: Project[] = [
  {
    id: 'call-a-doctor',
    title: 'Call A Doctor',
    slug: 'call-a-doctor',
    org: 'Call A Doctor',
    role: 'Mobile Engineer · Lead',
    summary:
      'On-demand digital healthcare — chat, voice, and video consults with licensed doctors, plus prescriptions, labs, and pharmacy delivery in one app.',
    body: [
      'Leading mobile engineering for Call A Doctor: architecting the React Native app from product requirements through Play Store and iOS release.',
      'Owned UI architecture for consultation, booking, authentication, notifications, and user management so new features stay consistent.',
      'Integrated backend APIs and real-time communication for chat, voice, and video — with privacy practices expected of a healthcare platform.',
      'MDCN-verified doctors, nationwide consults, and an end-to-end care path from symptoms to medication at the door.',
    ],
    stack: ['React Native', 'TypeScript', 'REST APIs', 'Auth', 'Realtime'],
    links: [
      { label: 'Website', href: 'https://calladoctornow.com/' },
    ],
    coverImageUrl: '/projects/call-a-doctor.png',
    coverGradient: 'linear-gradient(145deg, #3a0a16 0%, #6b0f24 45%, #1a1a1a 100%)',
    coverLabel: 'Healthcare',
    featured: true,
    order: 1,
  },
  {
    id: 'fragvest',
    title: 'Fragvest',
    slug: 'fragvest',
    org: 'Fragvest',
    role: 'Frontend Engineer',
    summary:
      'Real estate investment platform that improves property access and reduces fraud risk for investors.',
    body: [
      'Built investor-facing experiences with React, TypeScript, and Tailwind — responsive, WCAG-minded, and performance-focused.',
      'Partnered with backend engineers on REST data flow so listings, auth, and portfolio views stay accurate against the database.',
      'Ran structured testing and feedback loops to keep the product experience seamless across devices.',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    links: [
      { label: 'Dashboard', href: 'https://dashboard.fragvest.com/' },
    ],
    coverImageUrl: '/projects/fragvest.png',
    coverGradient: 'linear-gradient(145deg, #0f2a24 0%, #1a4d3e 50%, #161616 100%)',
    coverLabel: 'Proptech',
    featured: true,
    order: 2,
  },
  {
    id: 'nomaos',
    title: 'NomaOS / Agrovesto',
    slug: 'nomaos',
    org: 'NomaOS · Agrovesto',
    role: 'Frontend Engineer (Contract)',
    summary:
      'Agricultural financing and market-access platform connecting farmers, co-ops, institutions, and agribusiness.',
    body: [
      'Shipped responsive interfaces for financing, farm operations, market access, input distribution, impact tracking, and reporting.',
      'Collaborated cross-functionally on API-backed, data-driven product features for stakeholders across the agritech value chain.',
      'Contributed to the NomaOS product recognized with ₦6M first-place funding at the Innovation Makers Challenge 2.0.',
    ],
    stack: ['React', 'TypeScript', 'REST APIs', 'Dashboards'],
    links: [
      { label: 'Onboarding', href: 'https://onboarding.nomaos.com/' },
    ],
    coverImageUrl: '/projects/nomaos.png',
    coverGradient: 'linear-gradient(145deg, #1a2e0a 0%, #3d6b1a 45%, #161616 100%)',
    coverLabel: 'Agritech',
    featured: true,
    order: 3,
  },
  {
    id: 'aqee',
    title: 'Aqee',
    slug: 'aqee',
    org: 'Aqee',
    role: 'Software Developer',
    summary:
      'Relocation life platform — a personalised path through paperwork, services, local discovery, and everyday decisions abroad.',
    body: [
      'Aqee turns “I just moved” into “I live here” with Path-to-Goal milestones, Quests, Trackers, Smart Vault, and community buddy help.',
      'Supports planners, new arrivals, long-term residents, and mobile professionals managing documents and deadlines across borders.',
      'Product surface balances calm admin UX with discovery — residency, banking, housing, renewals, and city life in one journey.',
    ],
    stack: ['React', 'Product UX', 'Content systems'],
    links: [
      { label: 'Live site', href: 'https://aqee.io/' },
    ],
    coverImageUrl: '/projects/aqee.png',
    coverGradient: 'linear-gradient(145deg, #1a1530 0%, #3b2a6b 50%, #161616 100%)',
    coverLabel: 'Relocation',
    featured: true,
    order: 4,
  },
  {
    id: 'icase-anambra',
    title: 'iCASEFLOW — Anambra',
    slug: 'icaseflow-anambra',
    org: 'Lextech · iCASEFLOW',
    role: 'Frontend Engineer',
    summary:
      'Judicial e-filing modernization for Anambra State — automating critical touch points on the justice journey.',
    body: [
      'Built responsive React and TypeScript applications for court e-filing with reliable REST integration and strong system performance.',
      'Delivered pixel-faithful UI within Agile sprints, with peer review keeping quality high across judiciary platforms.',
      'Part of a broader Lextech ecosystem that also includes AI-assisted transcription and research tooling (LexScriptsAI, JudexAI).',
    ],
    stack: ['React', 'TypeScript', 'REST APIs', 'Legaltech'],
    links: [
      { label: 'E-filing', href: 'https://efiling.judiciary.an.gov.ng/' },
    ],
    coverImageUrl: '/projects/icase-anambra.png',
    coverGradient: 'linear-gradient(145deg, #0a1a2e 0%, #1a3a5c 50%, #161616 100%)',
    coverLabel: 'Legaltech',
    featured: true,
    order: 5,
  },
  {
    id: 'icase-enugu',
    title: 'iCASEFLOW — Enugu',
    slug: 'icaseflow-enugu',
    org: 'Lextech · iCASEFLOW',
    role: 'Frontend Engineer',
    summary:
      'Same iCASEFLOW platform family for Enugu State judiciary — modernising filings and court workflows.',
    body: [
      'Extended responsive web applications across a second state judiciary with shared patterns and consistent UX.',
      'Focused on reliable data flow, accessibility, and maintainable component systems under Agile delivery.',
    ],
    stack: ['React', 'TypeScript', 'REST APIs', 'Legaltech'],
    links: [
      { label: 'E-filing', href: 'https://efiling.judiciary.en.gov.ng/' },
    ],
    coverImageUrl: '/projects/icase-enugu.png',
    coverGradient: 'linear-gradient(145deg, #0a222e 0%, #1a4a5c 50%, #161616 100%)',
    coverLabel: 'Legaltech',
    featured: false,
    order: 6,
  },
  {
    id: 'e-affidavit',
    title: 'e-Affidavit',
    slug: 'e-affidavit',
    org: 'Anambra Judiciary',
    role: 'Frontend Engineer',
    summary:
      'Verifiable digital affidavits — templates, payment, virtual Commissioner for Oaths, and authenticity checks.',
    body: [
      'Users select a template, edit and pay online, meet a Commissioner for Oaths via video, then receive a signed stamped copy by email.',
      'Designed to reduce forgery risk and office queues while keeping court printing workflows intact when official stationery is required.',
      'Clear step guidance and FAQ-driven UX for a sensitive, high-trust public service.',
    ],
    stack: ['React', 'TypeScript', 'Payments', 'Legaltech'],
    links: [
      { label: 'Platform', href: 'https://www.affidavit.judiciary.an.gov.ng/' },
    ],
    coverImageUrl: '/projects/e-affidavit.png',
    coverGradient: 'linear-gradient(145deg, #2e1a0a 0%, #5c3a1a 50%, #161616 100%)',
    coverLabel: 'Legaltech',
    featured: true,
    order: 7,
  },
]

export const articles: Article[] = [
  {
    id: 'a1',
    title: 'Shipping healthcare UX that people trust',
    slug: 'shipping-healthcare-ux-that-people-trust',
    excerpt:
      'Lessons from building consultation, booking, and privacy-sensitive flows for Call A Doctor.',
    publishedAt: '2026-08-12',
    tags: ['Healthcare', 'Mobile', 'Product'],
    coverGradient: 'linear-gradient(135deg, #6b0f24, #1a1a1a)',
    body: [
      'Healthcare interfaces fail when they feel clever instead of calm. Patients need clarity in the first ten seconds: who is the doctor, how do they talk, what happens to their data.',
      'On Call A Doctor we treated consultation modes — chat, voice, video — as one coherent journey, not three apps glued together. Shared components for booking, identity, and records kept the mobile surface consistent as features landed.',
      'Privacy is a product feature. Showing what you, your doctor, and nobody else can see builds more trust than a generic “we care about security” line.',
      'As I move toward AI engineering and leadership, the same principle holds: tools should reduce anxiety, not invent new rituals.',
    ],
  },
  {
    id: 'a2',
    title: 'Design systems that survive Agile sprints',
    slug: 'design-systems-that-survive-agile-sprints',
    excerpt:
      'How reusable UI ownership keeps judiciary and fintech products coherent under pressure.',
    publishedAt: '2026-06-02',
    tags: ['Design Systems', 'React', 'Leadership'],
    coverGradient: 'linear-gradient(135deg, #1a3a5c, #161616)',
    body: [
      'A design system is not a Figma dump — it is a contract between product speed and interface quality.',
      'Across iCASEFLOW and investment dashboards, the wins came from naming patterns clearly, reviewing PRs for drift, and making the “happy path” component the easiest one to import.',
      'TypeScript and Tailwind help, but culture matters more: every engineer should know where tokens live and how to extend them without forking the look.',
      'Leadership in this space means protecting that contract while still shipping — especially when AI features start attaching to existing flows.',
    ],
  },
  {
    id: 'a3',
    title: 'From frontend craft to AI engineering',
    slug: 'from-frontend-craft-to-ai-engineering',
    excerpt:
      'Why product instincts and accessible UI are an unfair advantage when building AI-assisted tools.',
    publishedAt: '2026-04-18',
    tags: ['AI', 'Career', 'Leadership'],
    coverGradient: 'linear-gradient(135deg, #3b2a6b, #0d0d0d)',
    body: [
      'I have shipped AI-adjacent judicial tooling that improves transcription and research — the lesson is that models are only useful when the interface explains uncertainty.',
      'Frontend craft teaches latency empathy, empty states, and progressive disclosure. Those skills transfer directly to AI products where answers are probabilistic.',
      'My next chapter is deliberate: deepen AI engineering while growing the leadership muscle — mentoring, architecture calls, and product framing.',
      'This portfolio is part of that story: serious case studies, written thinking, and a playful lab because curiosity should stay visible.',
    ],
  },
]
