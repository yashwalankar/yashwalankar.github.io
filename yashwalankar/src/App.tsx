import React, { useState, useEffect } from 'react';
import { ChevronRight, Mail, Linkedin, Github, MapPin, ExternalLink, Server, FileText } from 'lucide-react';
import { personalInfo, notes } from './deets'
const TITLES = ['Software Engineer', 'Full Stack Dev', 'Cloud Developer', 'Hacker'] as const;
const CATEGORIES = ['About Me', 'Projects', 'Homelab', 'Contact Me'] as const;


function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

function useRotatingTitle(titles: readonly string[], delay = 2000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % titles.length);
    }, delay);
    return () => clearInterval(id);
  }, [titles, delay]);

  return titles[index];
}

function Avatar({ name, initials, src, size }: { name: string; initials: string; src?: string; size: number }) {
  const baseStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    overflow: 'hidden',
    flexShrink: 0,
    fontSize: size * 0.3,
    background: src
      ? 'transparent'
      : 'linear-gradient(to bottom right, #a855f7, #ec4899)',
  };

  return (
    <div style={baseStyle}>
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        initials
      )}
    </div>
  );
}

function SocialLinks({ email, linkedin, github }: { email: string; linkedin: string; github: string }) {
  const iconStyle: React.CSSProperties = {
    color: '#4b5563',
    transition: 'color 0.3s',
    display: 'inline-flex',
  };

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <a href={`mailto:${email}`} style={iconStyle}>
        <Mail style={{ width: 20, height: 20 }} />
      </a>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" style={iconStyle}>
        <Linkedin style={{ width: 20, height: 20 }} />
      </a>
      <a href={github} target="_blank" rel="noopener noreferrer" style={iconStyle}>
        <Github style={{ width: 20, height: 20 }} />
      </a>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof personalInfo.projects[number] }) {
  return (
    <div
      style={{
        background: '#f9fafb',
        padding: 20,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
      }}
    >
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 8 }}>
        {project.name}
      </h3>
      <p style={{ color: '#4b5563', fontSize: 14, marginBottom: 12, lineHeight: 1.6 }}>
        {project.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {project.technologies.map(tech => (
          <span
            key={tech}
            style={{
              background: '#ede9fe',
              color: '#6b21a8',
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {tech}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: '#9333ea',
            fontSize: 14,
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          <Github style={{ width: 16, height: 16 }} />
          View Code
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: '#9333ea',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            <ExternalLink style={{ width: 16, height: 16 }} />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

function HomelabServiceCard({ service }: { service: typeof personalInfo.homelabServices[number] }) {
  return (
    <a
      href={service.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        background: '#f9fafb',
        padding: 16,
        borderRadius: 12,
        border: '1px solid #e5e7eb',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        transition: 'all 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Left column: Logo or Icon */}
      <div style={{
        width: 56,
        height: 56,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: service.logo ? 'transparent' : '#ede9fe',
        borderRadius: 8,
      }}>
        {service.logo ? (
          <img
            src={service.logo}
            alt={service.name}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
        ) : (
          <span style={{ fontSize: 28 }}>{service.icon}</span>
        )}
      </div>

      {/* Right column: Name and Description */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          fontSize: 16,
          fontWeight: 600,
          color: '#111827',
          marginBottom: 4,
          margin: 0
        }}>
          {service.name}
        </h3>
        <p style={{
          color: '#6b7280',
          fontSize: 13,
          lineHeight: 1.5,
          margin: 0
        }}>
          {service.description}
        </p>
      </div>
    </a>
  );
}

function PortfolioCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useIsMobile();
  const rotatingTitle = useRotatingTitle(TITLES);

  const containerStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: 16,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: 'all 0.7s ease-in-out',
    width: '100%',
    maxWidth: isExpanded ? (isMobile ? '100%' : 896) : (isMobile ? '100%' : 448),
    height: isExpanded ? '90vh' : 'auto',
    overflowY: isExpanded ? 'auto' : 'visible',
  };

  return (
    <div style={containerStyle}>
      {/* Header / Business Card */}
      <div
        style={{
          padding: isMobile ? 24 : 32,
          position: 'relative',
          borderBottom: isExpanded ? '1px solid #e5e7eb' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: isExpanded ? 'row' : 'column',
            alignItems: 'center',
            textAlign: isExpanded ? 'left' : 'center',
            gap: isExpanded ? 16 : 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              paddingTop: 14,
            }}
          >
            <Avatar
              name={personalInfo.name}
              initials={personalInfo.initials}
              src={personalInfo.profileImage}
              size={isExpanded ? 64 : 96}
            />
          </div>

          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontSize: isExpanded ? (isMobile ? 20 : 24) : (isMobile ? 24 : 30),
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: 4,
                lineHeight: 1.1,
                margin: 0
              }}
            >
              {personalInfo.name}
            </h1>
            <p
              style={{
                fontSize: isExpanded ? (isMobile ? 14 : 16) : (isMobile ? 16 : 18),
                color: '#4b5563',
                marginBottom: isExpanded ? 0 : 16,
              }}
            >
              {rotatingTitle}
            </p>
          </div>

          {isExpanded ? (
            <SocialLinks
              email={personalInfo.email}
              linkedin={personalInfo.linkedin}
              github={personalInfo.github}
            />
          ) : (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#6b7280',
                  marginBottom: 24,
                }}
              >
                <MapPin style={{ width: 16, height: 16, marginRight: 4 }} />
                <span style={{ fontSize: 14 }}>{personalInfo.location}</span>
              </div>
              <SocialLinks
                email={personalInfo.email}
                linkedin={personalInfo.linkedin}
                github={personalInfo.github}
              />
            </>
          )}
        </div>

        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            style={{
              position: 'absolute',
              bottom: isMobile ? 16 : 32,
              right: isMobile ? 16 : 32,
              background: '#9333ea',
              color: 'white',
              padding: 12,
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronRight style={{ width: 24, height: 24 }} />
          </button>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{ padding: isMobile ? 16 : 32 }}>
          {/* Tab Navigation */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              overflowX: isMobile ? 'auto' : 'visible',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {CATEGORIES.map((category, idx) => (
              <button
                key={category}
                onClick={() => setActiveTab(idx)}
                style={{
                  padding: isMobile ? '8px 12px' : '10px 20px',
                  fontSize: isMobile ? 12 : 14,
                  fontWeight: 500,
                  borderRadius: 8,
                  cursor: 'pointer',
                  border: 'none',
                  outline: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  background: activeTab === idx ? '#9333ea' : 'transparent',
                  color: activeTab === idx ? 'white' : '#6b7280',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== idx) {
                    e.currentTarget.style.background = '#e5e7eb';
                    e.currentTarget.style.color = '#374151';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== idx) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#6b7280';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tab Panels */}
          <div style={{ marginTop: 24 }}>
            {/* About Me Panel */}
            {activeTab === 0 && (
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 16 }}>
                  About Me
                </h2>
                <p style={{ color: '#374151', lineHeight: 1.6, fontSize: 16, marginBottom: 20 }}>
                  {personalInfo.aboutMe}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <a
                    href={personalInfo.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      background: '#9333ea',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: 8,
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: 16,
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#7e22ce';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#9333ea';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <FileText style={{ width: 20, height: 20 }} />
                    View My Resume
                  </a></div>
              </div>
            )}

            {/* Projects Panel */}
            {activeTab === 1 && (
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 16 }}>
                  Projects
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {personalInfo.projects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} />
                  ))}
                </div>
              </div>
            )}

            {/* Homelab Panel */}
            {activeTab === 2 && (
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 12 }}>
                  Homelab
                </h2>
                <div
                  style={{
                    background: '#f0f9ff',
                    border: '1px solid #bae6fd',
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 20,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <Server style={{ width: 20, height: 20, color: '#0369a1' }} />
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#0c4a6e', margin: 0 }}>
                      Self-Hosting Enthusiast
                    </h3>
                  </div>
                  <p style={{ color: '#0c4a6e', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                    {notes.homelabIntro}
                  </p>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginBottom: 12 }}>
                  Services I Self-Host
                </h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: 12,
                  }}
                >
                  {personalInfo.homelabServices.map((service, idx) => (
                    <HomelabServiceCard key={idx} service={service} />
                  ))}
                </div>
              </div>
            )}

            {/* Contact Me Panel */}
            {activeTab === 3 && (
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 16 }}>
                  Contact Me
                </h2>
                <p style={{ color: '#4b5563', fontSize: 16, marginBottom: 24, lineHeight: 1.6 }}>
                  Feel free to reach out to me through any of the following platforms. I'm always open to discussing new projects, creative ideas, or opportunities.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {personalInfo.socialLinks.map((link, idx) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 16,
                          padding: 16,
                          background: '#f9fafb',
                          borderRadius: 12,
                          border: '1px solid #e5e7eb',
                          textDecoration: 'none',
                          transition: 'all 0.3s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(8px)';
                          e.currentTarget.style.borderColor = link.color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.borderColor = '#e5e7eb';
                        }}
                      >
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            background: `${link.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <IconComponent style={{ width: 24, height: 24, color: link.color }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', margin: 0 }}>
                            {link.name}
                          </h3>
                          <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>
                            {link.url.replace('mailto:', '').replace('https://', '')}
                          </p>
                        </div>
                        <ExternalLink style={{ width: 20, height: 20, color: '#9ca3af' }} />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: isMobile ? 16 : 24,
              marginTop: 24,
            }}
          >
            <button
              onClick={() => setIsExpanded(false)}
              style={{
                color: '#9333ea',
                fontWeight: 200,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: isMobile ? 14 : 16,
              }}
            > 
              <ChevronRight style={{ width: 20, height: 20, transform: 'rotate(180deg)' }} />
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <PortfolioCard />
    </div>
  );
}

export default App;