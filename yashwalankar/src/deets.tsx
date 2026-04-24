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
  homelabIntro: "I self-host everything I reasonably can. My homelab is both a learning sandbox and a production setup for my household — built around data ownership, privacy, and control over my software stack.",
}

export const writingPosts = [
  { title: 'Exactly-once is a lie — and what to do instead',     date: 'Mar 2026', readTime: '8 min' },
  { title: "My homelab runs on 116W. Here's the breakdown",       date: 'Jan 2026', readTime: '5 min' },
  { title: 'Writing Postgres migrations that actually roll back',  date: 'Nov 2025', readTime: '6 min' },
  { title: 'A cron scheduler is a database in disguise',          date: 'Aug 2025', readTime: '4 min' },
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
  aboutMe: "Software engineer with ~5 years of experience across big tech and startups. I work across backend and full-stack systems, building scalable cloud applications — ETL pipelines, analytics workflows, and payment processing. I enjoy exploring new technologies and turning complex problems into simple solutions.",
  homelabIntro: notes.homelabIntro,

  // Update with your actual experience
  experience: [
    { company: '[Company]',   role: 'Software Engineer',    period: '2023 — Present' },
    { company: '[Company]',   role: 'Full-Stack Engineer',  period: '2021 — 2023'   },
    { company: '[Company]',   role: 'Software Engineer',    period: '2019 — 2021'   },
  ],

  toolkit: ['Go', 'TypeScript', 'Python', 'Postgres', 'Docker', 'Kubernetes', 'React', 'Node.js', 'gRPC', 'Kafka'],

  // Physical rack inventory
  hardware: [
    { name: 'Repurposed PC',   role: 'Proxmox host · VMs + Docker',  watts: 48 },
    { name: 'Synology DS923+', role: 'NAS · backups + media store',  watts: 28 },
    { name: 'Raspberry Pi 4',  role: 'DNS + monitoring',              watts: 5  },
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
      year: "2024",
      description: "Uses AlpacaAPI to listen to live market feed via websockets and trades on set rules, opens/closes positions, supports stop-losses and take-profits, notifies on order fills.",
      technologies: ["Python", "FastAPI", "Docker", "Websockets"],
      link: "",
      demo: "",
    },
    {
      name: "Minimal Personal Landing Page",
      year: "2024",
      description: "Static React.js site hosted on Github Pages using Github Build and Deploy Actions.",
      technologies: ["React", "TypeScript", "HTML/CSS", "Github Actions"],
      link: "https://github.com/yashwalankar/yashwalankar.github.io",
      demo: "",
    },
    {
      name: "Influx Nimble API",
      year: "2023",
      description: "Minimal, memory-efficient Go API server to query InfluxDB v2.",
      technologies: ["Go", "Docker"],
      link: "https://github.com/yashwalankar/homelab/tree/main/pi/influx-nimble-api",
      demo: "",
    },
    {
      name: "Ambient Temp Monitor",
      year: "2023",
      description: "Collection agent for SHT42 based temperature sensor; writes data to InfluxDB.",
      technologies: ["Go", "Docker"],
      link: "https://github.com/yashwalankar/homelab/tree/main/pi/ambient-temp-monitor",
      demo: "",
    },
  ],

  homelabServices: [
    { name: 'Proxmox VE',     cat: 'Platform',     tag: 'hypervisor',  desc: 'VM + LXC orchestration on the repurposed PC.' },
    { name: 'Docker',         cat: 'Platform',     tag: 'containers',  desc: 'Stack per service, composed declaratively.' },
    { name: 'AdGuard Home',   cat: 'Network',      tag: 'dns',         desc: 'Network-wide ad + tracker blocking on the Pi.' },
    { name: 'Tailscale',      cat: 'Network',      tag: 'mesh vpn',    desc: 'Zero-config access to services from anywhere.' },
    { name: 'Nextcloud',      cat: 'Storage',      tag: 'files',       desc: 'Personal Drive-replacement backed by the NAS.' },
    { name: 'Jellyfin',       cat: 'Media',        tag: 'streaming',   desc: 'Household media server, hardware-transcoded.' },
    { name: 'Vaultwarden',    cat: 'Security',     tag: 'secrets',     desc: 'Self-hosted Bitwarden for the whole family.' },
    { name: 'Gitea',          cat: 'Dev',          tag: 'git',         desc: 'Private Git mirror + CI for side projects.' },
    { name: 'Home Assistant', cat: 'IoT',          tag: 'automation',  desc: '41 devices, local-first, no cloud dependency.' },
    { name: 'InfluxDB',       cat: 'Observability',tag: 'metrics',     desc: 'Time-series store for uptime + power draw.' },
    { name: 'Grafana',        cat: 'Observability',tag: 'dashboards',  desc: 'The single pane of glass over everything.' },
  ],

  socialLinks: [
    { name: "GitHub",   url: "https://github.com/yashwalankar",       icon: Github,   color: "#333"     },
    { name: "LinkedIn", url: "https://linkedin.com/in/yashwalankar",  icon: Linkedin, color: "#0077b5"  },
    { name: "Email",    url: "mailto:walankar.yash@gmail.com",        icon: Mail,     color: "#ea4335"  },
  ],
};

export const aiToolkit = {
  intro: 'I build with AI daily — writing code, wiring agents into real systems, and letting models poke at my homelab. My setup leans on open standards (MCP) so tools compose instead of locking me in.',
  models: [
    { name: 'Claude Sonnet 4.5', vendor: 'Anthropic', use: 'Primary coding + long-context refactors',   via: 'API · Cursor' },
    { name: 'GPT-5',             vendor: 'OpenAI',    use: 'Second opinion, planning, image reasoning', via: 'API' },
    { name: 'Llama 3.1 70B',     vendor: 'Meta',      use: 'Local inference for private data',          via: 'Ollama · homelab' },
    { name: 'Qwen 2.5 Coder',    vendor: 'Alibaba',   use: 'Local code-completion / autocomplete',      via: 'Ollama · homelab' },
  ],
  agents: [
    { name: 'Claude Code', role: 'CLI + editor coding agent',         type: 'IDE'        },
    { name: 'Cursor',      role: 'Day-to-day editor',                 type: 'IDE'        },
    { name: 'Open WebUI',  role: 'Private chat UI over Ollama',       type: 'chat'       },
    { name: 'n8n',         role: 'Agentic workflows + cron triggers', type: 'automation' },
  ],
  mcps: [
    { name: 'filesystem',     scope: 'Read/write scoped project dirs',  trust: 'local'     },
    { name: 'github',         scope: 'PRs, issues, code search',        trust: 'token'     },
    { name: 'postgres',       scope: 'Read-only analytics queries',     trust: 'RO'        },
    { name: 'linear',         scope: 'Ticket CRUD + sprint queries',    trust: 'token'     },
    { name: 'playwright',     scope: 'Browser automation for scrapers', trust: 'local'     },
    { name: 'homelab-status', scope: 'Query Uptime Kuma + Grafana',     trust: 'LAN'       },
    { name: 'memory',         scope: 'Cross-session notes + facts',     trust: 'local'     },
    { name: 'fetch',          scope: 'URL retrieval w/ allow-list',     trust: 'sandboxed' },
  ],
  practices: [
    'Every prompt that ships as code gets committed alongside the diff.',
    'No cloud-model access to secrets — local Llama handles sensitive data.',
    'Evals before deploys: small golden-set before any agent touches prod.',
    'MCP tools preferred over bespoke plugins — portable across clients.',
  ],
};
