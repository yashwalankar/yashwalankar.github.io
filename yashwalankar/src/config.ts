// ── Site-level config ─────────────────────────────────────────────────────────
// Edit this file to customise all UI text, section visibility, and status flags.
// Portfolio content (projects, experience, homelab data) lives in deets.tsx.

export const siteConfig = {
  subtitle: 'Software Engineer',
  availability: {
    open: true,           // false hides the green dot + badge entirely
    label: 'Open to roles',
    ctaLabel: 'Open',
  },
  resume: {
    displayName: 'Résumé — 2026.pdf',
    updatedLabel: 'Updated Mar 2026',
  },
} as const;

// ── Sections / tabs ───────────────────────────────────────────────────────────
// Order here = render order. Set enabled: false to hide a tab entirely.
export const sections = [
  { id: 'about',    label: 'About',      enabled: true },
  { id: 'projects', label: 'Projects',   enabled: true },
  { id: 'homelab',  label: 'Homelab',    enabled: true },
  { id: 'ai',       label: 'AI Toolkit', enabled: true },
  { id: 'reads',    label: 'Reads',      enabled: true },
  { id: 'contact',  label: 'Contact',    enabled: true },
] as const;

export type SectionId = typeof sections[number]['id'];

export const enabledSections = sections.filter(
  (s): s is typeof s & { enabled: true } => s.enabled
);

// ── Section editorial copy ────────────────────────────────────────────────────
// kicker  = small label above the title
// title   = headline (supports HTML e.g. <br /> for line breaks)
export const sectionCopy = {
  about: {
    kicker: 'About',
    title: "Building quiet systems<br />that don't page you at 3am.",
    experience: 'Experience',
    toolkit: 'Toolkit',
  },
  projects: {
    kicker: 'Projects',
    title: 'Selected work.',
  },
  homelab: {
    kicker: 'Homelab',
    title: 'Eleven services, three boxes.',
    servicesLabel: 'Services',   // rendered as "Services · N"
  },
  ai: {
    kicker: 'AI Toolkit',
    title: 'How I build with models.',
    toolsLabel: 'Tools & integrations',
    toolsHeader: 'Name · Role · Type',
    modelsLabel: 'Models in rotation',
    modelsHeader: 'Cloud + local',
  },
  reads: {
    kicker: 'Reads',
    title: 'Notes & essays.',
    writingLabel: 'My Writing',   // rendered as "My Writing · N"
    writingEmpty: 'Nothing here yet.',
    bookmarksLabel: 'Bookmarks',  // rendered as "Bookmarks · N"
    bookmarksEmpty: 'No bookmarks yet.',
  },
  contact: {
    kicker: 'Contact',
    title: 'Say hello.',
    directLabel: 'Direct',
    currentlyIn: 'Currently in',
    replyNote: 'Typical reply within 24h.',
    form: {
      fields: {
        name:    { label: 'Name',    placeholder: 'Jane Developer' },
        email:   { label: 'Email',   placeholder: 'jane@company.com' },
        subject: { label: 'Subject', placeholder: 'A role on your team' },
        message: { label: 'Message', placeholder: 'Tell me a little about what you\u2019re working on\u2026' },
      },
      submit:  'Send message',
      sending: 'Sending\u2026',
      sent:    'Sent \u2014 thanks',
      error:   'Something went wrong \u2014 try emailing directly.',
    },
  },
} as const;

// ── Navigation chrome ─────────────────────────────────────────────────────────
export const navCopy = {
  sectionsLabel: 'Sections',
  elsewhereLabel: 'Elsewhere',
  collapseLabel: 'Collapse card',
} as const;
