import React, { useState, useEffect } from 'react';
import {
  Mail, Linkedin, Github, MapPin, ExternalLink,
  FileText, ChevronRight, ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, myWriting, bookmarks, aiToolkit } from './deets';
import { submitContact, trackResumeDownload, incrementViewCount, ContactPayload } from './api';
import { siteConfig, sections, sectionCopy as C, navCopy, SectionId, enabledSections } from './config';
import './App.css';

// ── Theme ────────────────────────────────────────────────────────────────────
const T = {
  bg:          '#f4f1ec',
  card:        '#ffffff',
  ink:         '#1c1a17',
  sub:         '#6b635a',
  hair:        '#e4ded4',
  hairStrong:  '#c9c0b2',
  chipBg:      '#f0ebe1',
  green:       '#3d8a5b',
  bgWarm:      '#fbf8f2',
} as const;

const F = {
  display: `'Fraunces', 'Iowan Old Style', Georgia, serif`,
  body:    `'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif`,
  mono:    `'JetBrains Mono', ui-monospace, Menlo, monospace`,
} as const;

type Route = SectionId;

// ── Hooks ────────────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, [breakpoint]);
  return isMobile;
}

// ── Primitives ───────────────────────────────────────────────────────────────
function PaperLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontFamily: F.mono,
      fontSize: 10,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: T.sub,
      ...style,
    }}>
      {children}
    </div>
  );
}

function PaperChip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 8px',
      background: T.chipBg,
      color: T.ink,
      fontSize: 11,
      fontFamily: F.mono,
      letterSpacing: '0.02em',
      borderRadius: 2,
      marginRight: 4,
      marginBottom: 4,
    }}>
      {children}
    </span>
  );
}

function AvatarMono({ size, initials, src }: { size: number; initials: string; src?: string }) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      flexShrink: 0,
      background: 'repeating-linear-gradient(135deg, #eee7d8 0 6px, #e5dcc8 6px 12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#3a2f22',
      fontFamily: F.mono,
      fontSize: size * 0.32,
      fontWeight: 500,
      letterSpacing: '0.02em',
      overflow: 'hidden',
    }}>
      {showImage
        ? <img src={src} alt={initials} onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : initials}
    </div>
  );
}

function IntroCardBody({
  onOpen, avatarSize, nameSize, subtitleSize, locSize,
}: {
  onOpen: () => void;
  avatarSize: number; nameSize: number; subtitleSize: number; locSize: number;
}) {
  return (
    <>
      <AvatarMono size={avatarSize} initials={personalInfo.initials} src={personalInfo.profileImage} />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: F.display, fontSize: nameSize, lineHeight: 1.1, letterSpacing: '-0.01em', fontWeight: 500 }}>
          {personalInfo.name}
        </div>
        <div style={{ marginTop: 4, color: T.sub, fontSize: subtitleSize }}>
          {siteConfig.subtitle}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, color: T.sub, fontSize: locSize, alignItems: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <MapPin size={Math.round(locSize)} /> {personalInfo.location}
        </span>
        {siteConfig.availability.open && (
          <>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: T.sub, display: 'inline-block' }} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.green, display: 'inline-block' }} />
              {siteConfig.availability.label}
            </span>
          </>
        )}
      </div>
      <div style={{ width: '100%', height: 1, background: T.hair }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', gap: 14, color: T.ink }}>
          <span onClick={e => { e.stopPropagation(); window.location.href = `mailto:${personalInfo.email}`; }}>
            <Mail size={14} />
          </span>
          <span onClick={e => { e.stopPropagation(); window.open(personalInfo.linkedin, '_blank'); }}>
            <Linkedin size={14} />
          </span>
          <span onClick={e => { e.stopPropagation(); window.open(personalInfo.github, '_blank'); }}>
            <Github size={14} />
          </span>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: F.mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.ink }}>
          {siteConfig.availability.ctaLabel} <ArrowRight size={12} />
        </div>
      </div>
    </>
  );
}

function SectionHead({ num, kicker, title }: { num: string; kicker: string; title: string }) {
  return (
    <header style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <PaperLabel>{kicker}</PaperLabel>
        <PaperLabel>{num}</PaperLabel>
      </div>
      <h1
        style={{
          fontFamily: F.display,
          fontSize: 36,
          lineHeight: 1.05,
          margin: '10px 0 0',
          letterSpacing: '-0.02em',
          fontWeight: 500,
          color: T.ink,
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div style={{ height: 1, background: T.hairStrong, marginTop: 16 }} />
    </header>
  );
}

function PaperInput({
  label, placeholder, textarea = false, name,
}: {
  label: string; placeholder: string; textarea?: boolean; name: string;
}) {
  const El = textarea ? 'textarea' : 'input';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <PaperLabel>{label}</PaperLabel>
      <El
        name={name}
        placeholder={placeholder}
        required
        rows={textarea ? 4 : undefined}
        style={{
          width: '100%',
          boxSizing: 'border-box' as const,
          padding: '10px 0',
          border: 'none',
          borderBottom: `1px solid ${T.hairStrong}`,
          fontFamily: F.body,
          fontSize: 13.5,
          color: T.ink,
          background: 'transparent',
          outline: 'none',
          resize: textarea ? ('vertical' as const) : ('none' as const),
        }}
      />
    </label>
  );
}

// ── Section panels ────────────────────────────────────────────────────────────

function PaperAbout({ num, isMobile }: { num: string; isMobile: boolean }) {
  const [loading, setLoading] = useState(false);

  async function handleResume() {
    setLoading(true);
    await trackResumeDownload();
    window.open(personalInfo.resumeLink, '_blank', 'noopener,noreferrer');
    setLoading(false);
  }

  return (
    <>
      <SectionHead num={num} kicker={C.about.kicker} title={C.about.title} />
      <p style={{ fontSize: 15, lineHeight: 1.65, maxWidth: 520, color: T.ink }}>
        {personalInfo.aboutMe}
      </p>
      <div style={{
        marginTop: 32,
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 24 : 32,
      }}>
        {/* Experience */}
        <div>
          <PaperLabel style={{ marginBottom: 10 }}>{C.about.experience}</PaperLabel>
          {personalInfo.experience.map((e, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '10px 0',
              borderTop: `1px solid ${T.hair}`,
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: T.ink }}>{e.company}</div>
                <div style={{ fontSize: 12, color: T.sub }}>{e.role}</div>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 11, color: T.sub, whiteSpace: 'nowrap' }}>
                {e.period}
              </div>
            </div>
          ))}
        </div>

        {/* Toolkit + Resume */}
        <div>
          <PaperLabel style={{ marginBottom: 10 }}>{C.about.toolkit}</PaperLabel>
          <div>
            {personalInfo.toolkit.map(t => <PaperChip key={t}>{t}</PaperChip>)}
          </div>
          <div style={{
            marginTop: 22,
            padding: '14px 16px',
            border: `1px solid ${T.hair}`,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: T.ink, display: 'flex', alignItems: 'center', gap: 6 }}>
                <FileText size={13} /> {siteConfig.resume.displayName}
              </div>
              <div style={{ fontSize: 11, color: T.sub, marginTop: 2 }}>{siteConfig.resume.updatedLabel}</div>
            </div>
            <button
              onClick={handleResume}
              style={{
                background: T.ink,
                color: T.card,
                border: 'none',
                cursor: 'pointer',
                fontFamily: F.mono,
                fontSize: 11,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '8px 12px',
                borderRadius: 2,
                flexShrink: 0,
              }}
            >
              {loading ? '…' : 'Download'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function PaperProjects({ num }: { num: string }) {
  return (
    <>
      <SectionHead num={num} kicker={C.projects.kicker} title={C.projects.title} />
      <div>
        {personalInfo.projects.map((p, i) => (
          <article key={p.name} style={{
            display: 'grid',
            gridTemplateColumns: '36px 1fr auto',
            gap: 16,
            alignItems: 'start',
            padding: '20px 0',
            borderTop: i === 0 ? `1px solid ${T.hairStrong}` : `1px solid ${T.hair}`,
          }}>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: T.sub, paddingTop: 3 }}>
              №{String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                <h3 style={{
                  fontFamily: F.display,
                  fontSize: 20,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: T.ink,
                  margin: 0,
                }}>
                  {p.name}
                </h3>
                {p.year && (
                  <span style={{ fontFamily: F.mono, fontSize: 11, color: T.sub }}>{p.year}</span>
                )}
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: T.ink, maxWidth: 460, margin: 0 }}>
                {p.description}
              </p>
              <div style={{ marginTop: 10 }}>
                {p.technologies.map(t => <PaperChip key={t}>{t}</PaperChip>)}
              </div>
            </div>
            {p.link ? (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: F.mono,
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: T.ink,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  marginTop: 6,
                  whiteSpace: 'nowrap',
                }}
              >
                Code <ExternalLink size={10} />
              </a>
            ) : <div />}
          </article>
        ))}
      </div>
    </>
  );
}

const homelabCategories = personalInfo.homelabServices.reduce<Record<string, typeof personalInfo.homelabServices>>((acc, s) => {
  (acc[s.cat] = acc[s.cat] ?? []).push(s);
  return acc;
}, {});
const homelabCats = Object.keys(homelabCategories);

function PaperHomelab({ num, isMobile }: { num: string; isMobile: boolean }) {

  return (
    <>
      <SectionHead num={num} kicker={C.homelab.kicker} title={C.homelab.title} />
      <p style={{ fontSize: 14, lineHeight: 1.6, color: T.sub, maxWidth: 540 }}>
        {personalInfo.homelabIntro}
      </p>

      {/* Host strip */}
      <div style={{
        marginTop: 20,
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: 10,
      }}>
        {personalInfo.hardware.map(h => (
          <div key={h.name} style={{
            border: `1px solid ${T.hair}`,
            borderRadius: 3,
            padding: '12px 14px',
            background: T.bgWarm,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: T.ink }}>{h.name}</div>
            <div style={{ fontSize: 11, color: T.sub }}>{h.role}</div>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: T.sub, marginTop: 4 }}>~{h.watts}W</div>
          </div>
        ))}
      </div>

      {/* Services table */}
      <div style={{ marginTop: 26 }}>
        <PaperLabel style={{ marginBottom: 10 }}>
          {C.homelab.servicesLabel} · {personalInfo.homelabServices.length}
        </PaperLabel>
        <div style={{ border: `1px solid ${T.hairStrong}`, borderRadius: 3 }}>
          {homelabCats.map((cat, ci) => (
            <div key={cat} style={{
              borderTop: ci === 0 ? 'none' : `1px solid ${T.hairStrong}`,
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '110px 1fr',
            }}>
              {/* Category label */}
              <div style={{
                padding: '14px 14px',
                background: T.bgWarm,
                borderRight: isMobile ? 'none' : `1px solid ${T.hair}`,
                borderBottom: isMobile ? `1px solid ${T.hair}` : 'none',
              }}>
                <div style={{ fontFamily: F.display, fontSize: 14, fontWeight: 500, color: T.ink }}>{cat}</div>
              </div>

              {/* Service rows */}
              <div>
                {homelabCategories[cat].map((s, i) => (
                  <div key={s.name} style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '140px 1fr',
                    gap: 10,
                    padding: '10px 14px',
                    alignItems: 'start',
                    borderBottom: i === homelabCategories[cat].length - 1 ? 'none' : `1px dashed ${T.hair}`,
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: T.ink }}>{s.name}</div>
                      <div style={{ fontFamily: F.mono, fontSize: 10, color: T.sub, marginTop: 2 }}>{s.tag}</div>
                    </div>
                    <div style={{ fontSize: 12, color: T.sub, lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PaperAIToolkit({ num, isMobile }: { num: string; isMobile: boolean }) {
  return (
    <>
      <SectionHead num={num} kicker={C.ai.kicker} title={C.ai.title} />
      <p style={{ fontSize: 14, lineHeight: 1.65, color: T.sub, maxWidth: 540 }}>
        {aiToolkit.intro}
      </p>

      {/* Unified tools table */}
      <div style={{ marginTop: 26 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <PaperLabel>{C.ai.toolsLabel}</PaperLabel>
          <PaperLabel>{C.ai.toolsHeader}</PaperLabel>
        </div>
        <div style={{ border: `1px solid ${T.hairStrong}`, borderRadius: 3 }}>
          {aiToolkit.tools.map((t, i) => (
            <div key={t.name} style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '140px 1fr 120px',
              gap: 12,
              padding: '11px 14px',
              alignItems: 'center',
              borderTop: i === 0 ? 'none' : `1px solid ${T.hair}`,
              background: i % 2 ? T.bgWarm : 'transparent',
            }}>
              <div style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 500, color: T.ink }}>{t.name}</div>
              <div style={{ fontSize: 12.5, color: T.ink, lineHeight: 1.45 }}>{t.role}</div>
              <div style={{
                fontFamily: F.mono, fontSize: 9.5, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: T.sub,
                textAlign: isMobile ? 'left' : 'right',
              }}>{t.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Models table */}
      <div style={{ marginTop: 26 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <PaperLabel>{C.ai.modelsLabel}</PaperLabel>
          <PaperLabel>{C.ai.modelsHeader}</PaperLabel>
        </div>
        <div style={{ border: `1px solid ${T.hairStrong}`, borderRadius: 3 }}>
          {aiToolkit.models.map((m, i) => (
            <div key={m.name} style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1.3fr 160px',
              gap: 12,
              padding: '13px 16px',
              alignItems: 'center',
              borderTop: i === 0 ? 'none' : `1px solid ${T.hair}`,
              background: i % 2 ? T.bgWarm : 'transparent',
            }}>
              <div>
                <div style={{ fontFamily: F.display, fontSize: 15, fontWeight: 500, color: T.ink }}>{m.name}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: T.sub, marginTop: 2 }}>{m.vendor}</div>
              </div>
              <div style={{ fontSize: 12.5, color: T.ink }}>{m.use}</div>
              <div style={{ fontFamily: F.mono, fontSize: 10.5, color: T.sub, textAlign: isMobile ? 'left' : 'right' }}>{m.via}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PaperWriting({ num }: { num: string }) {
  return (
    <>
      <SectionHead num={num} kicker={C.reads.kicker} title={C.reads.title} />

      {/* My Writing */}
      <PaperLabel style={{ marginBottom: 0 }}>{C.reads.writingLabel} · {myWriting.length}</PaperLabel>
      {myWriting.length === 0 ? (
        <div style={{ borderTop: `1px solid ${T.hair}`, padding: '20px 0', fontFamily: F.mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.sub }}>
          {C.reads.writingEmpty}
        </div>
      ) : myWriting.map((w, i) => {
        const El = w.link ? 'a' : 'div';
        const linkProps = w.link
          ? { href: w.link, target: '_blank', rel: 'noopener noreferrer' }
          : {};
        return (
          <El
            key={w.title}
            {...(linkProps as any)}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto',
              gap: 12,
              alignItems: 'baseline',
              padding: '16px 0',
              borderTop: i === 0 ? `1px solid ${T.hairStrong}` : `1px solid ${T.hair}`,
              textDecoration: 'none',
              cursor: w.link ? 'pointer' : 'default',
            }}
          >
            <div style={{
              fontFamily: F.display,
              fontSize: 17,
              fontWeight: 500,
              letterSpacing: '-0.01em',
              color: T.ink,
              opacity: w.link ? 1 : 0.55,
            }}>
              {w.title}
            </div>
            {w.source && (
              <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.sub, whiteSpace: 'nowrap' }}>
                {w.source}
              </div>
            )}
            {w.date && (
              <div style={{ fontFamily: F.mono, fontSize: 11, color: T.sub, width: 72, textAlign: 'right' }}>
                {w.date}
              </div>
            )}
          </El>
        );
      })}

      {/* Bookmarks */}
      <PaperLabel style={{ marginTop: 28, marginBottom: 0 }}>{C.reads.bookmarksLabel} · {bookmarks.length}</PaperLabel>
      {bookmarks.length === 0 ? (
        <div style={{ borderTop: `1px solid ${T.hair}`, padding: '20px 0', fontFamily: F.mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.sub }}>
          {C.reads.bookmarksEmpty}
        </div>
      ) : bookmarks.map((b, i) => {
        const El = b.link ? 'a' : 'div';
        const linkProps = b.link
          ? { href: b.link, target: '_blank', rel: 'noopener noreferrer' }
          : {};
        return (
          <El
            key={b.title}
            {...(linkProps as any)}
            style={{
              display: 'block',
              padding: '16px 0',
              borderTop: i === 0 ? `1px solid ${T.hairStrong}` : `1px solid ${T.hair}`,
              textDecoration: 'none',
              cursor: b.link ? 'pointer' : 'default',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 12, alignItems: 'baseline' }}>
              <div style={{
                fontFamily: F.display,
                fontSize: 17,
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: T.ink,
                opacity: b.link ? 1 : 0.55,
              }}>
                {b.title}
              </div>
              {b.source && (
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.sub, whiteSpace: 'nowrap' }}>
                  {b.source}
                </div>
              )}
              {b.date && (
                <div style={{ fontFamily: F.mono, fontSize: 11, color: T.sub, width: 72, textAlign: 'right' }}>
                  {b.date}
                </div>
              )}
            </div>
            {b.tags && b.tags.length > 0 && (
              <div style={{ marginTop: 8 }}>
                {b.tags.map(tag => <PaperChip key={tag}>{tag}</PaperChip>)}
              </div>
            )}
          </El>
        );
      })}
    </>
  );
}

function PaperContact({ num, isMobile }: { num: string; isMobile: boolean }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const fd = new FormData(e.currentTarget);
    const payload: ContactPayload = {
      name:    fd.get('name')    as string,
      email:   fd.get('email')   as string,
      subject: fd.get('subject') as string,
      message: fd.get('message') as string,
    };
    try {
      await submitContact(payload);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <SectionHead num={num} kicker={C.contact.kicker} title={C.contact.title} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 28 : 32,
      }}>
        {/* Contact form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <PaperInput label={C.contact.form.fields.name.label}    name="name"    placeholder={C.contact.form.fields.name.placeholder} />
          <PaperInput label={C.contact.form.fields.email.label}   name="email"   placeholder={C.contact.form.fields.email.placeholder} />
          <PaperInput label={C.contact.form.fields.subject.label} name="subject" placeholder={C.contact.form.fields.subject.placeholder} />
          <PaperInput label={C.contact.form.fields.message.label} name="message" placeholder={C.contact.form.fields.message.placeholder} textarea />
          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            style={{
              background: T.ink,
              color: T.card,
              border: 'none',
              cursor: status === 'sent' ? 'default' : 'pointer',
              marginTop: 6,
              padding: '12px 16px',
              fontFamily: F.mono,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textAlign: 'center',
              borderRadius: 2,
              opacity: status === 'sending' ? 0.6 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {status === 'sent' ? C.contact.form.sent : status === 'sending' ? C.contact.form.sending : C.contact.form.submit}
          </button>
          {status === 'error' && (
            <div style={{ fontSize: 12, color: '#c0392b', fontFamily: F.mono }}>
              {C.contact.form.error}
            </div>
          )}
        </form>

        {/* Direct links */}
        <div>
          <PaperLabel style={{ marginBottom: 10 }}>{C.contact.directLabel}</PaperLabel>
          {([
            { Icon: Mail,     label: 'Email',    value: personalInfo.email,                                        href: `mailto:${personalInfo.email}` },
            { Icon: Linkedin, label: 'LinkedIn', value: personalInfo.linkedin.replace('https://', ''),             href: personalInfo.linkedin },
            { Icon: Github,   label: 'GitHub',   value: personalInfo.github.replace('https://', ''),              href: personalInfo.github },
          ] as const).map((r, i) => (
            <a
              key={r.label}
              href={r.href}
              target={i === 0 ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderTop: i === 0 ? `1px solid ${T.hairStrong}` : `1px solid ${T.hair}`,
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <r.Icon size={15} color={T.sub} />
                <div>
                  <div style={{ fontSize: 11, color: T.sub, fontFamily: F.mono, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{r.label}</div>
                  <div style={{ fontSize: 13, color: T.ink }}>{r.value}</div>
                </div>
              </div>
              <ExternalLink size={13} color={T.sub} />
            </a>
          ))}
          <div style={{
            marginTop: 18,
            padding: 14,
            border: `1px solid ${T.hair}`,
            borderRadius: 3,
            fontSize: 12,
            color: T.sub,
            lineHeight: 1.5,
          }}>
            {C.contact.currentlyIn} <strong style={{ color: T.ink }}>{personalInfo.location}</strong>.{' '}
            {C.contact.replyNote}
          </div>
        </div>
      </div>
    </>
  );
}

// ── Intro card ────────────────────────────────────────────────────────────────

function PaperIntroCard({ onOpen, isMobile }: { onOpen: () => void; isMobile: boolean }) {
  if (isMobile) {
    return (
      <div style={{
        background: T.bg,
        padding: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}>
        <button
          onClick={onOpen}
          style={{
            all: 'unset',
            cursor: 'pointer',
            width: '100%',
            background: T.card,
            border: `1px solid ${T.hair}`,
            borderRadius: 4,
            padding: '26px 22px 22px',
            boxShadow: '0 30px 60px -40px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
            fontFamily: F.body,
            color: T.ink,
            boxSizing: 'border-box',
          }}
        >
          <IntroCardBody onOpen={onOpen} avatarSize={68} nameSize={26} subtitleSize={12.5} locSize={11.5} />
        </button>
      </div>
    );
  }

  // Desktop
  return (
    <button
      onClick={onOpen}
      style={{
        all: 'unset',
        cursor: 'pointer',
        width: '100%',
        padding: '34px 28px 30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 17,
        fontFamily: F.body,
        color: T.ink,
        boxSizing: 'border-box',
      }}
    >
      <IntroCardBody onOpen={onOpen} avatarSize={82} nameSize={26} subtitleSize={13} locSize={12} />
    </button>
  );
}

// ── Expanded panel ────────────────────────────────────────────────────────────

function SectionContent({ route, isMobile }: { route: Route; isMobile: boolean }) {
  const idx = enabledSections.findIndex(s => s.id === route);
  const total = enabledSections.length;
  const num = `${String(idx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={route}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{ duration: 0.22 }}
      >
        {route === 'about'    && <PaperAbout     num={num} isMobile={isMobile} />}
        {route === 'projects' && <PaperProjects  num={num} />}
        {route === 'homelab'  && <PaperHomelab   num={num} isMobile={isMobile} />}
        {route === 'ai'       && <PaperAIToolkit num={num} isMobile={isMobile} />}
        {route === 'reads'    && <PaperWriting   num={num} />}
        {route === 'contact'  && <PaperContact   num={num} isMobile={isMobile} />}
      </motion.div>
    </AnimatePresence>
  );
}

function PaperExpanded({
  route, setRoute, onClose, isMobile,
}: {
  route: Route;
  setRoute: (r: Route) => void;
  onClose: () => void;
  isMobile: boolean;
}) {
  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '90vh', fontFamily: F.body, color: T.ink }}>
        {/* Compact header */}
        <div style={{
          padding: '12px 16px',
          borderBottom: `1px solid ${T.hair}`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexShrink: 0,
        }}>
          <AvatarMono size={36} initials={personalInfo.initials} src={personalInfo.profileImage} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.display, fontSize: 15, fontWeight: 500 }}>{personalInfo.name}</div>
            <div style={{ fontSize: 10.5, color: T.sub }}>{siteConfig.subtitle}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.sub, display: 'flex', padding: 0 }}>
            <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>

        {/* Pill tabs */}
        <div style={{
          padding: '10px 16px',
          borderBottom: `1px solid ${T.hair}`,
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          flexShrink: 0,
        }}
          className="paper-scroll"
        >
          {enabledSections.map(s => (
            <button
              key={s.id}
              onClick={() => setRoute(s.id)}
              style={{
                background: route === s.id ? T.ink : 'transparent',
                color:      route === s.id ? T.card : T.sub,
                border: route === s.id ? 'none' : `1px solid ${T.hair}`,
                cursor: 'pointer',
                padding: '6px 12px',
                fontFamily: F.mono,
                fontSize: 10.5,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                borderRadius: 0,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div className="paper-scroll" style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 40px' }}>
          <SectionContent route={route} isMobile />
        </div>
      </div>
    );
  }

  // Desktop: two-column grid
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '240px 1fr',
      height: '90vh',
      fontFamily: F.body,
      color: T.ink,
    }}>
      {/* Left rail */}
      <aside className="paper-scroll" style={{
        padding: '28px 22px',
        borderRight: `1px solid ${T.hair}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <AvatarMono size={44} initials={personalInfo.initials} src={personalInfo.profileImage} />
          <div>
            <div style={{ fontFamily: F.display, fontSize: 17, lineHeight: 1, fontWeight: 500 }}>{personalInfo.name}</div>
            <div style={{ fontSize: 11, color: T.sub, marginTop: 4 }}>{siteConfig.subtitle}</div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          <PaperLabel style={{ marginBottom: 8 }}>{navCopy.sectionsLabel}</PaperLabel>
          {enabledSections.map((s, i) => {
            const active = route === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setRoute(s.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderTop: `1px solid ${T.hair}`,
                  borderBottom: i === enabledSections.length - 1 ? `1px solid ${T.hair}` : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 8px',
                  color: active ? T.ink : T.sub,
                  fontSize: 14,
                  textAlign: 'left',
                  fontFamily: F.body,
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: F.mono, fontSize: 10, width: 18, color: active ? T.ink : T.sub }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.label}
                </span>
                {active && <ChevronRight size={12} />}
              </button>
            );
          })}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PaperLabel>{navCopy.elsewhereLabel}</PaperLabel>
          {[
            { href: personalInfo.github,   Icon: Github,   label: personalInfo.github.replace('https://', '') },
            { href: personalInfo.linkedin, Icon: Linkedin, label: personalInfo.linkedin.replace('https://', '') },
            { href: `mailto:${personalInfo.email}`, Icon: Mail, label: personalInfo.email },
          ].map(l => (
            <a key={l.label} href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
              style={{ color: T.ink, fontSize: 12, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              <l.Icon size={13} /> {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: F.mono,
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: T.sub,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: 0,
          }}
        >
          <ChevronRight size={12} style={{ transform: 'rotate(180deg)' }} />
          {navCopy.collapseLabel}
        </button>
      </aside>

      {/* Right content */}
      <section className="paper-scroll" style={{ padding: '36px 40px 32px', overflowY: 'auto' }}>
        <SectionContent route={route} isMobile={false} />
      </section>
    </div>
  );
}

// ── Portfolio card (manages state) ────────────────────────────────────────────

function PortfolioCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [route, setRoute] = useState<Route>(enabledSections[0].id);
  const isMobile = useIsMobile();

  useEffect(() => {
    incrementViewCount();
  }, []);

  const isBareShell = isMobile && !isExpanded;

  return (
    <motion.div
      animate={{ maxWidth: isExpanded ? (isMobile ? '100%' : 880) : (isMobile ? '100%' : 408) }}
      transition={{ type: 'spring', bounce: 0.1, duration: 0.55 }}
      style={{
        width: '100%',
        background: isBareShell ? 'transparent' : T.card,
        border: isBareShell ? 'none' : `1px solid ${T.hair}`,
        borderRadius: isBareShell ? 0 : 4,
        boxShadow: isBareShell ? 'none' : '0 1px 0 rgba(0,0,0,0.02), 0 30px 60px -40px rgba(0,0,0,0.3)',
        overflow: isBareShell ? 'visible' : 'hidden',
      }}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <PaperIntroCard onOpen={() => setIsExpanded(true)} isMobile={isMobile} />
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <PaperExpanded
              route={route}
              setRoute={setRoute}
              onClose={() => { setIsExpanded(false); setRoute(enabledSections[0].id); }}
              isMobile={isMobile}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: T.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    }}>
      <PortfolioCard />
    </div>
  );
}
