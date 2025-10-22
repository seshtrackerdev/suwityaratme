import type { Route } from "./+types/about";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePageViewTracking } from "../hooks/useAnalytics";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Timothy Suwityarat — Solutions Engineer & IT Professional" },
    { name: "description", content: "I'm Tim, a Solutions Engineer specializing in ITSM, workflow automation, and IT support. Based in Warwick, Rhode Island with extensive experience at TeamDynamix and CCRI." },
    { name: "keywords", content: "Timothy Suwityarat, Suwityarat, Solutions Engineer, ITSM, TeamDynamix, CCRI, Rhode Island, IT Support, Workflow Automation" },
    { property: "og:title", content: "About Timothy Suwityarat — Solutions Engineer & IT Professional" },
    { property: "og:description", content: "I'm Tim, a Solutions Engineer specializing in ITSM, workflow automation, and IT support." },
    { property: "og:type", content: "profile" },
    { property: "og:url", content: "https://suwityarat.me/about" },
    { property: "og:site_name", content: "Timothy Suwityarat" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "About Timothy Suwityarat — Solutions Engineer" },
    { name: "twitter:description", content: "I'm Tim, a Solutions Engineer specializing in ITSM, workflow automation, and IT support." },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: (context as any).cloudflare?.env?.VALUE_FROM_CLOUDFLARE || "Default" };
}

// Custom hook for scroll-triggered animations
function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return { ref, isInView };
}

export default function About({ loaderData }: Route.ComponentProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Track page view
  usePageViewTracking("About Timothy Suwityarat — Solutions Engineer & IT Professional");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight + 20 : 100;
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-neutral-900 scroll-pt-24">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Timothy Suwityarat",
            "jobTitle": "Solutions Engineer",
            "description": "I'm a Solutions Engineer specializing in ITSM, workflow automation, and IT support",
            "url": "https://suwityarat.me",
            "image": "https://suwityarat.me/headshot.jpg",
            "sameAs": [
              "https://www.linkedin.com/in/timothy-suwityarat-1737002a0/"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Warwick",
              "addressRegion": "RI",
              "addressCountry": "US"
            },
            "email": "jobs@suwityarat.com",
            "telephone": "+1-401-218-7310",
            "worksFor": {
              "@type": "Organization",
              "name": "TeamDynamix"
            },
            "alumniOf": {
              "@type": "Organization",
              "name": "Community College of Rhode Island"
            },
            "knowsAbout": [
              "IT Service Management",
              "TeamDynamix",
              "Workflow Automation",
              "Microsoft 365",
              "IT Support",
              "Solutions Engineering"
            ]
          })
        }}
      />
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#F7F6F2]/80 border-b border-black/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="/" className="text-lg md:text-xl font-black tracking-tight">suwityarat<span className="text-black">.me</span></a>
          
          {/* Desktop Navigation */}
          <nav className="hidden gap-4 md:gap-6 md:flex text-sm">
            <a href="/" className="hover:opacity-70 text-left">Home</a>
            <button onClick={() => scrollToSection('background')} className="hover:opacity-70 text-left">Background</button>
            <button onClick={() => scrollToSection('expertise')} className="hover:opacity-70 text-left">Expertise</button>
            <button onClick={() => scrollToSection('philosophy')} className="hover:opacity-70 text-left">Philosophy</button>
            <a href="/portfolio" className="hover:opacity-70 text-left">Portfolio</a>
            <a href="/resume-pdf" target="_blank" className="hover:opacity-70 text-left">Resume</a>
            <a href="/contact" className="hover:opacity-70 text-left">Contact</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden p-2 rounded-lg border border-black bg-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16"
                animate={{
                  d: isMobileMenuOpen 
                    ? "M6 18L18 6M6 6l12 12" 
                    : "M4 6h16M4 12h16M4 18h16"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </motion.svg>
          </motion.button>
        </div>
        
        {/* Mobile Navigation Menu */}
        <motion.div
          className="md:hidden border-t border-black/10 bg-[#F7F6F2]/95 backdrop-blur overflow-hidden"
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <motion.nav 
            className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-3 text-sm"
            initial="closed"
            animate={isMobileMenuOpen ? "open" : "closed"}
            variants={{
              open: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1
                }
              },
              closed: {
                transition: {
                  staggerChildren: 0.05,
                  staggerDirection: -1
                }
              }
            }}
          >
            <motion.a 
              href="/" 
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Home
            </motion.a>
            <motion.button 
              onClick={() => { closeMobileMenu(); setTimeout(() => scrollToSection('background'), 100); }} 
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Background
            </motion.button>
            <motion.button 
              onClick={() => { closeMobileMenu(); setTimeout(() => scrollToSection('expertise'), 100); }} 
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Expertise
            </motion.button>
            <motion.button 
              onClick={() => { closeMobileMenu(); setTimeout(() => scrollToSection('philosophy'), 100); }} 
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Philosophy
            </motion.button>
            <motion.a 
              href="/portfolio"
              onClick={closeMobileMenu}
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Portfolio
            </motion.a>
            <motion.a 
              href="/resume-pdf" 
              target="_blank"
              onClick={closeMobileMenu}
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Resume
            </motion.a>
            <motion.a 
              href="/contact"
              onClick={closeMobileMenu}
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Contact
            </motion.a>
          </motion.nav>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-6 md:pt-12 md:pb-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            className="rounded-2xl border border-black bg-white p-2 shadow-[0_4px_0_0_#000] inline-block mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <img 
              src="/headshot.jpg" 
              alt="Tim, Solutions Engineer" 
              className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-top object-cover"
              loading="eager"
            />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">About Timothy Suwityarat</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-neutral-700 mb-6">Solutions Engineer · ITSM Specialist · Rhode Island</p>
          <motion.p 
            className="max-w-3xl mx-auto text-base md:text-lg text-neutral-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            I'm Tim, a problem solver who specializes in streamlining IT operations and creating efficient workflows that make technology work better for people.
          </motion.p>
        </motion.div>
      </section>

      {/* Background Section */}
      <section id="background" className="mx-auto max-w-7xl px-4 py-10">
        <motion.div 
          className="rounded-3xl border border-black bg-white p-6 md:p-8 shadow-[0_6px_0_0_#000]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">My Background</h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-base md:text-lg leading-relaxed mb-4">
              My journey in technology started with curiosity about how systems work and wanting to solve problems. Growing up in Rhode Island, I learned to value practical solutions and clear communication. These values have shaped how I approach IT work throughout my career.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-4">
              After earning my Associate in Science in Computer Science from the Community College of Rhode Island, I joined CCRI's IT department. I spent over four years there developing my skills in IT service management, user support, and system administration. This experience taught me a lot about the challenges organizations face when managing technology at scale.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-4">
              In 2024, I moved to TeamDynamix as a Solutions Engineer. Now I help organizations across different industries implement and optimize their ITSM, PPM, and iPaaS solutions. This role lets me combine my technical knowledge with my passion for helping others succeed.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-4">
              Beyond my corporate role, I also founded Websites by Tim, a solo web development business that serves local Rhode Island businesses. This entrepreneurial venture allows me to work directly with small business owners, creating custom websites that help them establish and grow their online presence. It's been rewarding to see how technology can make a real difference for local businesses in my community.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              When I'm not working with technology, you'll find me exploring Rhode Island's coastline, staying active in the local tech community, or working on personal projects that challenge me to learn new skills.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="mx-auto max-w-7xl px-4 py-10">
        <motion.div 
          className="grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
              }
            }
          }}
        >
          <motion.div 
            className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <h3 className="text-xl font-extrabold tracking-tight mb-4">Technical Expertise</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"/>
                <span><strong>IT Service Management (ITSM):</strong> Deep experience with TeamDynamix, workflow design, and service catalog management</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"/>
                <span><strong>Microsoft 365:</strong> Office 365 administration, SharePoint, Active Directory, and enterprise collaboration tools</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"/>
                <span><strong>Security and Authentication:</strong> DUO MFA implementation, security best practices, and access management</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"/>
                <span><strong>Technical Writing:</strong> Knowledge base development, documentation, and user training materials</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-black flex-shrink-0"/>
                <span><strong>Web Development:</strong> Custom website creation, local SEO optimization, and client-focused design solutions</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <h3 className="text-xl font-extrabold tracking-tight mb-4">Certifications & Achievements</h3>
            <div className="space-y-4">
              <a href="https://www.credential.net/97cd4f89-b5cc-4d77-be93-308150a13487#acc.5jA7BOUE" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group cursor-pointer">
                <img src="/demo2winbadge.png" alt="Demo2Win! Certified" className="w-10 h-10 object-contain flex-shrink-0 transition-transform group-hover:scale-110" />
                <div>
                  <div className="font-semibold text-sm group-hover:text-blue-600 transition-colors">Demo2Win! Certified</div>
                  <div className="text-xs text-neutral-600">April 2024</div>
                </div>
              </a>
              <div className="flex items-center gap-3 group cursor-pointer">
                <img src="/meddicc logo.png" alt="MEDDPICC Masterclass" className="w-10 h-10 object-contain flex-shrink-0 transition-transform group-hover:scale-110" />
                <div>
                  <div className="font-semibold text-sm group-hover:text-blue-600 transition-colors">MEDDPICC Masterclass</div>
                  <div className="text-xs text-neutral-600">June 2024</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <img src="/hdilogo.jpg" alt="HDI Support Center Analyst" className="w-10 h-10 object-contain flex-shrink-0 transition-transform group-hover:scale-110" />
                <div>
                  <div className="font-semibold text-sm group-hover:text-blue-600 transition-colors">HDI Support Center Analyst</div>
                  <div className="text-xs text-neutral-600">May 2022</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <img src="/ailogo.jpg" alt="Academic Impressions" className="w-10 h-10 object-contain flex-shrink-0 transition-transform group-hover:scale-110" />
                <div>
                  <div className="font-semibold text-sm group-hover:text-blue-600 transition-colors">Academic Impressions: Higher Education Customer Service</div>
                  <div className="text-xs text-neutral-600">November 2021</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="mx-auto max-w-7xl px-4 py-10">
        <motion.div 
          className="rounded-3xl border border-black bg-white p-6 md:p-8 shadow-[0_6px_0_0_#000]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">My Approach to Technology</h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-base md:text-lg leading-relaxed mb-4">
              I believe technology should serve people, not the other way around. My approach to IT solutions is grounded in understanding the human side of technology and how it affects workflows, productivity, and daily operations.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-4">
              Whether I'm designing a workflow automation, troubleshooting a system issue, or presenting a solution to stakeholders, I focus on clarity, efficiency, and user experience. The best technical solution is one that people can actually use and benefit from.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-4">
              I'm passionate about continuous learning and staying current with evolving technologies. The IT landscape changes rapidly, and I make it a priority to understand new tools, methodologies, and best practices that can benefit the organizations I work with.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Above all, I value collaboration and clear communication. The most successful projects happen when technical teams work closely with end users to understand their needs and deliver solutions that truly make a difference.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mx-auto max-w-7xl px-4 pb-16">
        <motion.div 
          className="rounded-3xl border border-black bg-white p-6 md:p-8 shadow-[0_6px_0_0_#000]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">Let's Connect</h2>
          <p className="text-base md:text-lg text-neutral-700 mb-6">
            I'm always interested in connecting with fellow IT professionals, discussing new opportunities, or sharing insights about technology solutions. Feel free to reach out!
          </p>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
          >
            <motion.a 
              href="mailto:jobs@suwityarat.com" 
              className="rounded-xl border border-black px-4 py-3 shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none text-center sm:text-left inline-flex items-center justify-center gap-2"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              jobs@suwityarat.com
            </motion.a>
            <motion.a 
              href="tel:+14012187310" 
              className="rounded-xl border border-black px-4 py-3 shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none text-center sm:text-left inline-flex items-center justify-center gap-2"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 (401) 218‑7310
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/timothy-suwityarat-1737002a0/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rounded-xl border border-[#0077B5] bg-[#0077B5] px-4 py-3 shadow-[0_2px_0_0_#005885] active:translate-y-[2px] active:shadow-none text-center sm:text-left text-white inline-flex items-center justify-center gap-2"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </motion.a>
            <motion.span 
              className="rounded-xl border border-black px-4 py-3 text-center sm:text-left inline-flex items-center justify-center gap-2"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Warwick, Rhode Island
            </motion.span>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="border-t border-black/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="mx-auto max-w-7xl px-4 py-6 text-xs text-neutral-600 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Timothy Suwityarat</span>
          <motion.a 
            href="#" 
            className="hover:opacity-70" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Back to top ↑
          </motion.a>
        </div>
      </motion.footer>
    </div>
  );
}
