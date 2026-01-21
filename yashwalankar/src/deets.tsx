import defaultpfp from './media/avatar/Default_pfp.jpg'
import myAvatar from './media/avatar/avatar-yash.png'
import { Mail, Linkedin, Github } from 'lucide-react';
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
  homelabIntro: "I enjoy self-hosting and maintaining my own infrastructure. My homelab serves as both a learning sandbox and a personal production setup, driven by my belief in data ownership, privacy, and control over my software stack."
}
export const personalInfo = {
  name: "Yash Walankar",
  initials: "YW",
  profileImage: myAvatar, // Add your image URL or leave empty for gradient
  email: "walankar.yash@gmail.com",
  linkedin: "https://linkedin.com/in/yashwalankar",
  github: "https://github.com/yashwalankar",
  location: "Detroit Metro Area, MI",
  resumeLink: "https://github.com/yashwalankar/resume-in-tex/blob/main/YashW_resume.pdf", // Add your resume link
  aboutMe: "Software engineer with ~5 years of experience across big tech and startups. I work across backend and full-stack systems, building scalable cloud applications including ETL pipelines, analytics workflows, and payment processing. I enjoy exploring new technologies and turning complex problems into simple solutions.",
  projects: [
    {
      name: "QuickETL",
      description: "Think Web UI based cron scheduler, used to collect 1min OHLCV data for SPY daily",
      technologies: ["React", "Node.js", "PostgreSQL", "Python", "Docker"],
      link: "https://github.com/yashwalankar/quickETL",
      demo: ""
    },
    {
      name: "Minimal Personal Landing Page",
      description: "Static React.js site hosted on Github for Free using Github Build and Deploy Actions",
      technologies: ["React", "TypeScript", "HTML/CSS", "Github Actions"],
      link: "https://github.com/yashwalankar/yashwalankar.github.io",
      demo: ""
    },
    {
      name: "Influx Nimble API",
      description: "Minimal, memory-efficient Go API server to query InfluxDB v2",
      technologies: ["Go", "Docker"],
      link: "https://github.com/yashwalankar/homelab/tree/main/pi/influx-nimble-api",
      demo: ""
    },
    {
      name: "Ambient Temp Monitor",
      description: "Collection agent for SHT42 Based Temp Monitor to collect datat in InfluxDB",
      technologies: ["Go", "Docker"],
      link: " https://github.com/yashwalankar/homelab/tree/main/pi/ambient-temp-monitor",
      demo: ""
    }
  ],
  homelabServices: [
    {
      name: "Proxmox VE",
      description: "VM Platforms and LXCs as needed",
      logo: proxmoxIcon,
      icon: null, // Use logo
      link: "https://www.proxmox.com/"
    },
    {
      name: "Docker + Portainer",
      description: "Most of the services I host run either on docker or docker via portainer",
      logo: dockerIcon,
      icon: null,
      link: "https://www.portainer.io/"
    },
    {
      name: "Ad Guard",
      description: "Network-wide ad blocking and local DNS server",
      logo: adguardHomeIcon,
      icon: null,
      link: "https://adguard.com/"
    },
    {
      name: "InfluxDB",
      description: "Store Metrics data and Graphs on Metrics",
      logo: influxdbIcon,
      icon: null,
      link: "https://influxdb.com/"
    },
    {
      name: "QuestDB",
      description: "Store timeseries data",
      logo: questdbIcon,
      icon: null,
      link: "https://questdb.com/"
    },
    {
      name: "Nginx",
      description: "Reverse Proxy for hosted services",
      logo: nginxIcon,
      icon: null,
      link: "https://nginx.org/"
    },
    {
      name: "Tailscale",
      description: "Zero config mesh VPN based on wireguard",
      logo: tailscaleIcon,
      icon: null,
      link: "https://tailscale.com/"
    },
    {
      name: "Wireguard",
      description: "VPN Server",
      logo: wireguardIcon,
      icon: null,
      link: "https://www.wireguard.com/"
    },
    {
      name: "Synology",
      description: "Platform for NAS",
      logo: synologyIcon,
      icon: null,
      link: "https://www.synology.com/"
    },
    {
      name: "Telegraf",
      description: "Plugin driven collection agent for sys metrics",
      logo: telegrafIcon,
      icon: null,
      link: "https://github.com/influxdata/telegraf"
    },
    {
      name: "Glance-app",
      description: "Homepage solution for self hosted services",
      logo: glanceAppIcon,
      icon: null,
      link: "https://github.com/glanceapp/glance/tree/main?tab=readme-ov-file"
    },
    {
      name: "Paperless",
      description: "Document Storage and archive with OCR",
      logo: paperlessIcon,
      icon: null,
      link: "https://docs.paperless-ngx.com/"
    },
    {
      name: "Booklore",
      description: "eBooks and Research Papers pdf management",
      logo: bookLoreIcon,
      icon: null,
      link: "https://github.com/booklore-app/booklore"
    },
    {
      name: "Jellyfin",
      description: "Personal media streaming server",
      logo: jellyfinIcon, // Use icon instead
      icon: null,
      link: "https://jellyfin.org/"
    },
    {
      name: "StirlingPDF",
      description: "PDF tool",
      logo: stirlingPdfIcon,
      icon: null,
      link: "https://github.com/Stirling-Tools/Stirling-PDF"
    },
  ],
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/yashwalankar",
      icon: Github,
      color: "#333"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yashwalankar",
      icon: Linkedin,
      color: "#0077b5"
    },
    {
      name: "Email",
      url: "mailto:walankar.yash@gmail.com",
      icon: Mail,
      color: "#ea4335"
    }
  ]
};

