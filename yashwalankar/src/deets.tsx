import myAvatar from './media/avatar/avatar-yash.png'
import { Mail, Linkedin, Github } from 'lucide-react';

// ── Homelab service logos (kept for reference / future use) ─────────────────
import adguardHomeIcon from './media/icons/adguard-home.png'
import bookLoreIcon from './media/icons/book-lore.png'
import dockerIcon from './media/icons/docker.png'
import glanceAppIcon from './media/icons/glanceapp.png'
import influxdbIcon from './media/icons/influxdb.png'
import jellyfinIcon from './media/icons/jellyfin.png'
import nginxIcon from './media/icons/nginx.png'
import openwrtIcon from './media/icons/openwrt.png'
import paperlessIcon from './media/icons/paperless.png'
import proxmoxIcon from './media/icons/proxmox.png'
import questdbIcon from './media/icons/questdb.png'
import stirlingPdfIcon from './media/icons/stirling-pdf.png'
import synologyIcon from './media/icons/synology.png'
import tailscaleIcon from './media/icons/tailscale.png'
import telegrafIcon from './media/icons/telegraf.png'
import wireguardIcon from './media/icons/wireguard.png'

export const notes = {
  homelabIntro: "I self-host everything I reasonably can. My homelab is both a learning sandbox and a personal production setup for my household, focused on data ownership, privacy, and control over my software stack. If you're trying to set up something like this and get stuck, feel free to reach out.",
}
export const myWriting: { title: string; link: string; source?: string; date?: string }[] = [
  // { title: 'Exactly-once is a lie — and what to do instead',    link: '', source: 'Medium', date: 'Mar 2026' },
  // { title: "My homelab runs on 116W. Here's the breakdown",     link: '', source: 'Medium', date: 'Jan 2026' },
  // { title: 'Writing Postgres migrations that actually roll back', link: '', source: 'Medium', date: 'Nov 2025' },
  // { title: 'A cron scheduler is a database in disguise',        link: '', source: 'Medium', date: 'Aug 2025' },
];

export const bookmarks: { title: string; link: string; source?: string; date?: string; tags?: string[] }[] = [
  // { title: 'The Log: What every software engineer should know about real-time data', link: 'https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying', source: 'LinkedIn Eng', date: 'Dec 2025', tags: ['distributed systems', 'data'] },
  // { title: 'Designing Data-Intensive Applications — chapter notes', link: '', source: 'book', date: 'Nov 2025', tags: ['databases', 'architecture'] },
];

export const personalInfo = {
  name: "Yash Walankar",
  initials: "YW",
  profileImage: myAvatar,
  email: "walankar.yash@gmail.com",
  linkedin: "https://linkedin.com/in/yashwalankar",
  github: "https://github.com/yashwalankar",
  location: "Detroit Metro Area, MI",
  resumeLink: "https://github.com/yashwalankar/resume-in-tex/blob/main/YashW_resume.pdf",
  aboutMe: "I've spent the last five years across between big tech and startups, building systems that move data, process payments, and hold things together under load. I care less about the stack and more about the right solution.",
  homelabIntro: notes.homelabIntro,

  experience: [
    { company: 'MarginEdge', role: 'Software Engineer', period: '2023 — 2025' },
    { company: 'Amazon', role: 'Software Engineer', period: '2021 — 2023' },
    { company: 'Tenneco', role: 'Software Engineer co-op', period: '2020 - 2020' },
    { company: 'Regal Beloit', role: 'Software Engineer co-op', period: '2018 - 2018' },
    { company: 'University of Toledo', role: 'IT Technician - part-time', period: '2018 - 2021' },
  ],

  toolkit: ['TypeScript', 'Python', 'Go', 'Postgres', 'Docker', 'AWS', 'React', 'Node.js', 'Vercel'],

  // Physical rack inventory
  hardware: [
    { name: 'Repurposed PC', role: 'Proxmox host · VMs + Docker', watts: 48 },
    { name: 'Synology DS923+', role: 'NAS · backups + media store ', watts: 28 },
    { name: 'Raspberry Pi 4B', role: 'DNS + monitoring', watts: 5 },
  ],

  projects: [
    {
      name: "QuickETL",
      year: "2025",
      description: "Web UI based cron scheduler for scripts. Collects 1min OHLCV data for SPY daily for backtests, loads into a timeseries DB, handles web-scraping automations.",
      technologies: ["React", "Node.js", "Postgres", "Python", "Docker"],
      link: "https://github.com/yashwalankar/quickETL",
      demo: "",
    },
    {
      name: "AlpacaTradingBot",
      year: "2025",
      description: "Uses AlpacaAPI to listen to live market feed via websockets and trades on set rules, opens/closes positions, supports stop-losses and take-profits, notifies on order fills.",
      technologies: ["Python", "FastAPI", "Docker", "Websockets"],
      link: "",
      demo: "",
    },
    {
      name: "Personal Landing Page",
      year: "2025",
      description: "React.js site hosted on Github Pages using Github Build and Deploy Actions and vercel backend.",
      technologies: ["React", "TypeScript", "HTML/CSS", "Github Actions", "vercel"],
      link: "https://github.com/yashwalankar/yashwalankar.github.io",
      demo: "",
    },
    {
      name: "Influx Nimble API",
      year: "2025",
      description: "Minimal, memory-efficient Go API server to query InfluxDB v2.",
      technologies: ["Go", "Docker"],
      link: "https://github.com/yashwalankar/homelab/tree/main/pi/influx-nimble-api",
      demo: "",
    },
    {
      name: "Ambient Temp Monitor",
      year: "2025",
      description: "Collection agent for SHT42 based temperature sensor; writes data to InfluxDB.",
      technologies: ["Go", "Docker"],
      link: "https://github.com/yashwalankar/homelab/tree/main/pi/ambient-temp-monitor",
      demo: "",
    },
    {
      name: "Insulin Dosage Monitor",
      year: "2021",
      description: "Mobile app for Senior Design Project working with an Endocrinologist to calulate dosage of Insulin based on Meals, utilized FDA API to read barcode to get nutrition data for food",
      technologies: ["ReactNative", "AWS"],
      link: "",
      demo: "",
    },
    {
      name: "CNGF Link Prediction",
      year: "2021",
      description: "Link Prediction Algorithm improving Common Neighbor with a global graph factor",
      technologies: ["Python", "NetworkX"],
      link: "https://github.com/cgalo/networkx",
      demo: "",
    },
  ],

  homelabServices: [
    { name: 'Proxmox VE', cat: 'Platform', tag: 'hypervisor', desc: 'Virtual machine and LXC orchestration on a repurposed host.' },
    { name: 'Docker + Portainer', cat: 'Platform', tag: 'containers', desc: 'Containerized services managed with declarative stacks.' },
    { name: 'Synology', cat: 'Platform', tag: 'storage', desc: 'Network-attached storage platform for files and backups.' },
    { name: 'OpenWRT', cat: 'Network', tag: 'router', desc: 'Open source router environment' },
    { name: 'AdGuard Home', cat: 'Network', tag: 'dns', desc: 'Network-wide DNS filtering for ads and trackers.' },
    { name: 'WireGuard', cat: 'Network', tag: 'vpn', desc: 'Self-hosted VPN server for secure remote access.' },
    { name: 'Tailscale', cat: 'Network', tag: 'mesh-vpn', desc: 'Zero-config mesh VPN for accessing services from anywhere.' },
    { name: 'NginX', cat: 'Network', tag: 'reverse-proxy', desc: 'Reverse proxy for TLS termination, subdomain routing, and service exposure.' },
    { name: 'QuestDB', cat: 'Database', tag: 'timeseries', desc: 'Time-series database for market and trading data.' },
    { name: 'InfluxDB', cat: 'Database', tag: 'timeseries', desc: 'Time-series database for system and environment metrics.' },
    { name: 'Paperless', cat: 'Applications', tag: 'documents', desc: 'Document management system with OCR and search.' },
    { name: 'Telegraf', cat: 'Observability', tag: 'collector', desc: 'Plugin-based agent for collecting system metrics.' },
    { name: 'Glance', cat: 'Observability', tag: 'dashboard', desc: 'Unified dashboard for accessing and monitoring services.' },
    { name: 'Jellyfin', cat: 'Applications', tag: 'streaming', desc: 'Self-hosted media server with hardware-accelerated streaming.' },
    { name: 'Booklore', cat: 'Applications', tag: 'ebooks', desc: 'Ebook and research paper library server.' },
    { name: 'Home Assistant', cat: 'Applications', tag: 'automation', desc: 'Local-first home automation platform without cloud dependency.' },
    { name: 'Change-detection', cat: 'Applications', tag: 'automation', desc: 'locally hosted notification service for change detection' },
    { name: 'Stirling-pdf', cat: 'Applications', tag: 'pdf', desc: 'locally hosted one stop shop for all pdf needs' }

  ],

  socialLinks: [
    { name: "GitHub", url: "https://github.com/yashwalankar", icon: Github, color: "#333" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yashwalankar", icon: Linkedin, color: "#0077b5" },
    { name: "Email", url: "mailto:walankar.yash@gmail.com", icon: Mail, color: "#ea4335" },
  ],
};

export const aiToolkit = {
  intro: 'AI is part of my workflow — I use it to write code faster, wire agents into real systems, and automate parts of my homelab. I prefer open standards like MCP so the pieces compose without vendor lock-in.',
  tools: [
    // Clients & agents
    { name: 'claude-code', role: 'CLI coding agent with skills, hooks & MCP', type: 'Agent' },
    //{ name: 'Cursor', role: 'Day-to-day editor', type: 'IDE' },
    { name: 'open-webUI', role: 'Private chat UI over Ollama', type: 'Chat' },
    { name: 'graphify', role: 'Knowledge graph for AI coding assistants', type: 'Skill' },
    { name: 'abtop', role: 'Htop but for token management for AI ', type: 'Tool' },
    //{ name: 'n8n', role: 'Agentic workflows + cron triggers', type: 'Automation' },
    // MCP servers
    // { name: '@filesystem', role: 'Read/write scoped project dirs', type: 'MCP · local' },
    // { name: '@github', role: 'PRs, issues, code search', type: 'MCP · token' },
    // { name: '@postgres', role: 'Read-only analytics queries', type: 'MCP · RO' },
    // { name: '@linear', role: 'Ticket CRUD + sprint queries', type: 'MCP · token' },
    // { name: '@playwright', role: 'Browser automation for scrapers', type: 'MCP · local' },
    // { name: '@homelab-status', role: 'Query Uptime Kuma + Grafana', type: 'MCP · LAN' },
    // { name: '@memory', role: 'Cross-session notes + facts', type: 'MCP · local' },
    // { name: '@fetch', role: 'URL retrieval w/ allow-list', type: 'MCP · sandboxed' },
  ],
  models: [
    { name: 'Claude Sonnet 4.6', vendor: 'Anthropic', use: 'Primary coding + long-context refactors', via: 'Claude Code' },
    { name: 'GPT-5', vendor: 'OpenAI', use: 'Second opinion, planning, image reasoning', via: 'Codex' },
    { name: 'Gemma 4 26B-A4B', vendor: 'Google', use: 'Local inference for private data', via: 'Ollama' },
    //{ name: 'Qwen 2.5 Coder', vendor: 'Alibaba', use: 'Local code-completion / autocomplete', via: 'Ollama · homelab' },
  ],
};
