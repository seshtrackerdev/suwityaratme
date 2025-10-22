import type { Route } from "./+types/home";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePageViewTracking, useAnalytics } from "../hooks/useAnalytics";
import { ContactModal } from "../components/ContactModal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Timothy Suwityarat — Solutions Engineer | ITSM & Workflow Automation Expert" },
    { name: "description", content: "Timothy Suwityarat is a Solutions Engineer specializing in ITSM, workflow automation, and support portal modernization. Based in Warwick, Rhode Island. View my résumé, portfolio, and contact information." },
    { name: "keywords", content: "Timothy Suwityarat, Suwityarat, Solutions Engineer, ITSM, TeamDynamix, workflow automation, Rhode Island, IT support, CCRI, Warwick RI" },
    { property: "og:title", content: "Timothy Suwityarat — Solutions Engineer | ITSM & Workflow Automation Expert" },
    { property: "og:description", content: "Timothy Suwityarat is a Solutions Engineer specializing in ITSM, workflow automation, and support portal modernization. Based in Warwick, Rhode Island." },
    { property: "og:type", content: "profile" },
    { property: "og:url", content: "https://suwityarat.me" },
    { property: "og:site_name", content: "Timothy Suwityarat" },
    { property: "og:image", content: "https://suwityarat.me/headshot.jpg" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Timothy Suwityarat — Solutions Engineer" },
    { name: "twitter:description", content: "Solutions Engineer specializing in ITSM, workflow automation, and support portal modernization." },
    { name: "twitter:image", content: "https://suwityarat.me/headshot.jpg" },
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

export default function Home({ loaderData }: Route.ComponentProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { trackContactClick, trackDownload, trackNavigationClick } = useAnalytics();
  
  // Track page view
  usePageViewTracking("Timothy Suwityarat — Solutions Engineer");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
    trackContactClick('home_contact_modal_open');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Get actual header height dynamically
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight + 20 : 100; // Add 20px buffer
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
            "description": "Solutions Engineer specializing in ITSM, workflow automation, and support portal modernization",
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
              "Solutions Engineering",
              "Web Development"
            ],
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Solutions Engineer",
              "occupationLocation": {
                "@type": "City",
                "name": "Warwick, Rhode Island"
              }
            }
          })
        }}
      />
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#F7F6F2]/80 border-b border-black/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="#" className="text-lg md:text-xl font-black tracking-tight" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>suwityarat<span className="text-black">.me</span></a>
          
          {/* Desktop Navigation */}
          <nav className="hidden gap-4 md:gap-6 md:flex text-sm">
            <button onClick={() => scrollToSection('about')} className="hover:opacity-70 text-left">About</button>
            <button onClick={() => scrollToSection('portfolio')} className="hover:opacity-70 text-left">Portfolio</button>
            <button onClick={() => scrollToSection('highlights')} className="hover:opacity-70 text-left">Highlights</button>
            <button onClick={() => scrollToSection('resume')} className="hover:opacity-70 font-semibold text-left">Full Résumé</button>
            <button onClick={() => scrollToSection('contact')} className="hover:opacity-70 text-left">Contact</button>
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
          
          <a href="/resume-pdf" target="_blank" className="hidden md:inline-flex items-center gap-2 rounded-xl border border-black bg-black px-3 py-2 text-xs md:text-sm font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none">Save as PDF</a>
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
            <motion.button 
              onClick={() => { closeMobileMenu(); setTimeout(() => scrollToSection('about'), 100); }} 
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              About
            </motion.button>
            <motion.button 
              onClick={() => { closeMobileMenu(); setTimeout(() => scrollToSection('portfolio'), 100); }} 
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Portfolio
            </motion.button>
            <motion.button 
              onClick={() => { closeMobileMenu(); setTimeout(() => scrollToSection('highlights'), 100); }} 
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Highlights
            </motion.button>
            <motion.button 
              onClick={() => { closeMobileMenu(); setTimeout(() => scrollToSection('resume'), 100); }} 
              className="hover:opacity-70 font-semibold py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Full Résumé
            </motion.button>
            <motion.button 
              onClick={() => { closeMobileMenu(); setTimeout(() => openContactModal(), 100); }} 
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Contact
            </motion.button>
            <motion.a 
              href="/resume-pdf" 
              target="_blank"
              onClick={closeMobileMenu}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-black bg-black px-3 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none mt-2" 
              variants={{
                open: { opacity: 1, y: 0, scale: 1 },
                closed: { opacity: 0, y: 10, scale: 0.95 }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save as PDF
            </motion.a>
          </motion.nav>
        </motion.div>
      </header>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-7xl px-4 pt-8 pb-6 md:pt-12 md:pb-8 md:py-20">
        <div className="space-y-8 md:space-y-0 md:grid md:items-start md:gap-10 md:grid-cols-5">
          {/* Mobile: Image centered, Desktop: Left side */}
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Mobile: Centered image and text */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left md:flex-row md:gap-6 mb-6">
              {/* Hero Image */}
              <motion.div 
                className="rounded-2xl border border-black bg-white p-2 shadow-[0_4px_0_0_#000] flex-shrink-0 mb-4 md:mb-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <img 
                  src="/headshot.jpg" 
                  alt="Tim, Solutions Engineer" 
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl object-top object-cover"
                  loading="eager"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">Timothy Suwityarat</h1>
                <p className="mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl font-medium tracking-tight">Solutions Engineer · ITSM · Workflow Automation</p>
              </motion.div>
            </div>
            <motion.p 
              className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-neutral-700 text-center md:text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            >
              I'm a problem solver who streamlines IT service delivery for professional organizations. I modernize support portals and turn messy intake into reliable, automated workflows.
            </motion.p>
            <motion.div 
              className="mt-6 flex flex-col sm:flex-row gap-3 items-center md:items-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              <motion.a 
                href="/resume-pdf" 
                target="_blank"
                onClick={() => trackDownload("Timothy_Suwityarat_Resume.pdf")}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-black bg-black px-5 py-3 text-sm font-semibold text-white shadow-[0_3px_0_0_#000] active:translate-y-[3px] active:shadow-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Save as PDF
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/timothy-suwityarat-1737002a0/" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => trackContactClick("linkedin_hero")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-[#0077B5] bg-[#0077B5] px-5 py-3 text-sm font-semibold text-white shadow-[0_3px_0_0_#005885] active:translate-y-[3px] active:shadow-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </motion.a>
              <motion.button 
                onClick={openContactModal} 
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-black px-5 py-3 text-sm font-semibold shadow-[0_3px_0_0_#000] active:translate-y-[3px] active:shadow-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Contact
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Snapshot Card */}
          <motion.aside 
            className="md:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div 
              className="rounded-3xl border border-black bg-white p-4 md:p-5 shadow-[0_6px_0_0_#000]"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base md:text-lg font-extrabold tracking-tight">Résumé Snapshot</h2>
                <span className="text-xs font-semibold px-2 py-1 border border-black rounded-lg">Open to Roles</span>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold">Experience</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2"><img src="/tdx.webp" alt="TeamDynamix logo" className="w-5 h-5 object-contain flex-shrink-0" /><span className="whitespace-nowrap"><strong>Solutions Engineer</strong> — TDX (2024–Present)</span></div>
                    <div className="flex items-center gap-2"><img src="/ccri.png" alt="CCRI logo" className="w-5 h-5 object-contain flex-shrink-0" /><span><strong>Senior Info. Tech</strong> — CCRI (2021–2024)</span></div>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Core Skills</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[
                      'TeamDynamix (TDX)','Office 365','Workflow Automation','Help Desk','Active Directory','SharePoint','DUO MFA','Troubleshooting','Technical Writing'
                    ].map((s)=> (
                      <span key={s} className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-semibold">Certifications</p>
                  <div className="mt-2 space-y-2">
                    <a href="https://www.credential.net/97cd4f89-b5cc-4d77-be93-308150a13487#acc.5jA7BOUE" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                      <img src="/demo2winbadge.png" alt="Demo2Win! Certified" className="w-6 h-6 object-contain flex-shrink-0 transition-transform group-hover:scale-110" />
                      <span className="group-hover:text-blue-600 transition-colors">Demo2Win! (2024)</span>
                    </a>
                    <div className="flex items-center gap-2 group">
                      <img src="/meddicc logo.png" alt="MEDDPICC Masterclass" className="w-6 h-6 object-contain flex-shrink-0 transition-transform group-hover:scale-110" />
                      <span className="group-hover:text-blue-600 transition-colors">MEDDPICC Masterclass (2024)</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                      <img src="/hdilogo.jpg" alt="HDI Support Center Analyst" className="w-6 h-6 object-contain flex-shrink-0 transition-transform group-hover:scale-110" />
                      <span className="group-hover:text-blue-600 transition-colors">HDI Support Center Analyst (2022)</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                      <img src="/ailogo.jpg" alt="Academic Impressions" className="w-6 h-6 object-contain flex-shrink-0 transition-transform group-hover:scale-110" />
                      <span className="group-hover:text-blue-600 transition-colors">Academic Impressions: Higher Ed Customer Service (2021)</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="mx-auto max-w-7xl px-4 pb-6 md:pb-12">
        <motion.div 
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
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
          {[
            {
              title: 'Solo Web Dev Business',
              desc: 'Founded Websites by Tim, providing custom web solutions to Rhode Island businesses. Specializing in fast-loading sites, local SEO, and client-focused design.'
            },
            {
              title: 'ITSM Overhaul & KB Cleanup',
              desc: 'Led restructure of TDX knowledge base and workflows; cleaned up 600+ articles to improve self-service and routing.'
            },
            {
              title: 'Security & MFA Rollout',
              desc: 'Key role in DUO authentication implementation across CCRI, enhancing campus security and sign-in reliability.'
            },
            {
              title: 'Portal + Intake Redesign',
              desc: 'Redesigned IT Help Desk site and digitized Banner request forms; streamlined intake with automated workflows.'
            },
          ].map((c)=> (
            <motion.div 
              key={c.title} 
              className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <h3 className="text-lg font-extrabold tracking-tight">{c.title}</h3>
              <p className="mt-2 text-sm text-neutral-700">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-10">
        <motion.div 
          className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">About</h2>
          <h3 className="text-lg font-extrabold">Professional Summary</h3>
          <p className="mt-2 text-sm text-neutral-800">
            I'm a Solutions Engineer with a proven track record at TeamDynamix and the Community College of Rhode Island. I enhance IT systems and user experiences through innovative solutions and clear communication. I'm an expert in software troubleshooting and Microsoft 365, focused on automation, knowledge management, and client satisfaction.
          </p>
          <motion.a 
            href="/about" 
            onClick={() => trackNavigationClick("about_page")}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-black bg-black px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Learn More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </section>

      {/* Full Résumé */}
      <section id="resume" className="relative mx-auto max-w-7xl px-4 py-10">
        <motion.div 
          className="mb-6 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">Full Résumé</h2>
          <motion.a 
            href="/resume-pdf" 
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl border border-black bg-black px-3 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Save as PDF
          </motion.a>
        </motion.div>

        {/* Experience */}
        <motion.div 
          className="mt-6 grid gap-6 md:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
        >
          <motion.div 
            className="md:col-span-3 space-y-6"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <motion.div 
              className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img src="/tdx.webp" alt="TeamDynamix logo" className="w-6 h-6 object-contain" />
                  <h4 className="text-base font-extrabold">Solutions Engineer — TeamDynamix</h4>
                </div>
                <span className="text-xs font-semibold">Feb 2024 – Present</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Work closely with Account Executives, Customer Success Managers, and Sales Representatives to deliver tailored demonstrations across ITSM, PPM, and iPaaS solutions.</li>
                <li>Participate in discovery calls to understand prospect needs, identify technical fit, and shape demo strategy based on their goals and pain points.</li>
                <li>Build customized demo environments, workflows, and outlines that reflect real-world scenarios and demonstrate how TeamDynamix can solve prospect-specific challenges.</li>
                <li>Provide deep product knowledge on the TeamDynamix platform, including intake design, ticketing, automation, and portfolio management.</li>
                <li>Help refine and update shared demo environments, scripts, and walkthroughs used across the pre-sales team to ensure consistency and quality.</li>
              </ul>
            </motion.div>

            <motion.div 
              className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img src="/android-chrome-512x512.png" alt="Websites by Tim logo" className="w-6 h-6 object-contain" />
                  <h4 className="text-base font-extrabold">Founder — Websites by Tim</h4>
                </div>
                <span className="text-xs font-semibold">2024 – Present</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Founded solo web development business serving Rhode Island businesses with custom website solutions and local SEO optimization.</li>
                <li>Specialize in creating fast-loading, mobile-responsive websites with clean design and intuitive user experience.</li>
                <li>Provide comprehensive services including single-page sites, multi-page websites, website makeovers, and landing pages for promotions.</li>
                <li>Focus on client collaboration and direct communication, ensuring businesses maintain control over their content while I handle technical implementation.</li>
                <li>Implement local SEO strategies and performance optimization to help businesses improve their online presence and search visibility.</li>
              </ul>
            </motion.div>

            <motion.div 
              className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img src="/ccri.png" alt="CCRI logo" className="w-6 h-6 object-contain" />
                  <h4 className="text-base font-extrabold">Senior Info. Tech — Community College of Rhode Island</h4>
                </div>
                <span className="text-xs font-semibold">Aug 2021 – Feb 2024</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Lead Admin for TeamDynamix: maintained ITSM service, major updates, automation rules; restructured KB and workflows.</li>
                <li>Key role in DUO Authentication integration across the college.</li>
                <li>Redesigned/coded IT Help Desk website to improve accessibility and UX.</li>
                <li>Executed TDX projects: cleaned 600+ KB articles; digitized Banner request forms for efficient administration.</li>
                <li>Delivered training on TDX and IT tools; improved operational efficiency across user groups.</li>
                <li>Built automated workflows for access requests and equipment reservations; enhanced client portal functionality.</li>
              </ul>
            </motion.div>

            <motion.div 
              className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img src="/ccri.png" alt="CCRI logo" className="w-6 h-6 object-contain" />
                  <h4 className="text-base font-extrabold">IT Support — Community College of Rhode Island</h4>
                </div>
                <span className="text-xs font-semibold">Oct 2019 – Aug 2021</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Technical Support and Ticket Management: Utilized ticket-tracking tools to efficiently resolve a wide range of IT-related issues, significantly enhancing user satisfaction.</li>
                <li>Direct User Assistance: Provided hands-on support to faculty, staff, and students, addressing their specific IT needs and challenges.</li>
                <li>Knowledge Base Contributions: Authored and published 22 knowledge base articles, providing valuable resources for user self-help and education.</li>
                <li>Information Management: Digitized and maintained critical information, such as the compromised account list and printer data.</li>
              </ul>
            </motion.div>

            <motion.div 
              className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-3">
                  <img src="/ymca.png" alt="YMCA logo" className="w-6 h-6 object-contain" />
                  <h4 className="text-base font-extrabold">Help Desk — YMCA</h4>
                </div>
                <span className="text-xs font-semibold">2016 – 2020</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Efficient System Management: Leveraged a ticket tracking system to meticulously monitor and manage repairs, updates, and services, ensuring timely and organized responses to technical issues.</li>
                <li>Technical Problem-Solving: Provided essential support in troubleshooting computer systems, resolving basic technical problems and contributing to smoother system operations.</li>
              </ul>
            </motion.div>

            <motion.div 
              className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-base font-extrabold">Co‑Owner — Blackstar Software</h4>
                <span className="text-xs font-semibold">2016 – 2020</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>Client Engagement and Support: Implemented and managed a ticketing system to facilitate direct and effective communication with clients, ensuring prompt resolution of inquiries and issues.</li>
                <li>Troubleshooting and Technical Support: Provided comprehensive troubleshooting for modding services, addressing complex technical challenges and enhancing service quality.</li>
                <li>Community Management and Leadership: Successfully led and nurtured an active community of over 150 members, fostering engagement, collaboration, and a supportive environment.</li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Skills / Education / Certs */}
          <motion.div 
            className="md:col-span-2 space-y-6"
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <motion.div 
              className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <h4 className="text-base font-extrabold">Skills</h4>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {[
                  'Office 365 Support (3y)','TeamDynamix','In‑person & Remote IT Support (3y)','Communication (7y)','DUO Authentication (2y)','Software Troubleshooting','Help Desk (7y)','Active Directory','Windows (10+ y)','Troubleshooting (6y)','Technical Writing (6y)','SharePoint','Web Development','Local SEO','Client Management','Project Management'
                ].map((s)=> (
                  <span key={s} className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1">{s}</span>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <h4 className="text-base font-extrabold">Education</h4>
              <p className="mt-2 text-sm">Associate in Science (AS), Computer Science — Community College of Rhode Island</p>
            </motion.div>
            <motion.div 
              className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              <h4 className="text-base font-extrabold">Certifications</h4>
              <div className="mt-3 space-y-3 text-sm">
                <a href="https://www.credential.net/97cd4f89-b5cc-4d77-be93-308150a13487#acc.5jA7BOUE" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group cursor-pointer">
                  <img src="/demo2winbadge.png" alt="Demo2Win! Certified" className="w-8 h-8 object-contain flex-shrink-0 transition-transform group-hover:scale-110" />
                  <div>
                    <div className="font-semibold group-hover:text-blue-600 transition-colors">Demo2Win!</div>
                    <div className="text-xs text-neutral-600">04/19/2024</div>
                  </div>
                </a>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <img src="/meddicc logo.png" alt="MEDDPICC Masterclass" className="w-8 h-8 object-contain flex-shrink-0 transition-transform group-hover:scale-110" />
                  <div>
                    <div className="font-semibold group-hover:text-blue-600 transition-colors">MEDDPICC Masterclass</div>
                    <div className="text-xs text-neutral-600">Jun 2024</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <img src="/hdilogo.jpg" alt="HDI Support Center Analyst" className="w-8 h-8 object-contain flex-shrink-0 transition-transform group-hover:scale-110" />
                  <div>
                    <div className="font-semibold group-hover:text-blue-600 transition-colors">HDI Support Center Analyst</div>
                    <div className="text-xs text-neutral-600">05/2022</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <img src="/ailogo.jpg" alt="Academic Impressions" className="w-8 h-8 object-contain flex-shrink-0 transition-transform group-hover:scale-110" />
                  <div>
                    <div className="font-semibold group-hover:text-blue-600 transition-colors">Academic Impressions: Higher Education Customer Service</div>
                    <div className="text-xs text-neutral-600">11/2021</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="mx-auto max-w-7xl px-4 py-10">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">Web Design Portfolio</h2>
          <p className="text-base md:text-lg text-neutral-700">Custom websites and web applications designed for Rhode Island businesses and organizations.</p>
        </motion.div>

        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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
          {/* EB Marine Project */}
          <motion.div 
            className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000] flex flex-col h-full"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="aspect-video rounded-xl mb-4 overflow-hidden border border-black/20">
              <img 
                src="/portfolio/ebmarine.png" 
                alt="EB Marine LLC website screenshot showing marine services and outboard motor repair" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-lg font-extrabold tracking-tight mb-2">EB Marine LLC</h3>
              <p className="text-sm text-neutral-700 mb-4 flex-grow">Full-service marine dealership website featuring outboard motor services, boat repair, and trailer services in Warwick, RI.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Responsive Design</span>
                <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Local SEO</span>
                <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Service Pages</span>
              </div>
              <motion.a 
                href="https://eb-marine.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-black bg-black px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                View Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* LTC Contracting Project */}
          <motion.div 
            className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000] flex flex-col h-full"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="aspect-video rounded-xl mb-4 overflow-hidden border border-black/20">
              <img 
                src="/portfolio/ltc.png" 
                alt="LTC Contracting LLC website screenshot showing professional contracting services and project gallery" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-lg font-extrabold tracking-tight mb-2">LTC Contracting LLC</h3>
              <p className="text-sm text-neutral-700 mb-4 flex-grow">Professional contracting website showcasing bathroom renovations, carpentry services, and construction projects throughout Rhode Island.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Project Gallery</span>
                <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Before/After</span>
                <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Service Pages</span>
              </div>
              <motion.a 
                href="https://ltc-contracting.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-black bg-black px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                View Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* MAC'S Pressure Washing Project */}
          <motion.div 
            className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000] flex flex-col h-full"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="aspect-video rounded-xl mb-4 overflow-hidden border border-black/20">
              <img 
                src="/portfolio/macs.png" 
                alt="MAC'S Pressure & Soft Washing website screenshot showing professional cleaning services" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-lg font-extrabold tracking-tight mb-2">MAC'S Pressure & Soft Washing</h3>
              <p className="text-sm text-neutral-700 mb-4 flex-grow">Professional exterior cleaning services website featuring pressure washing, soft washing, and commercial cleaning across Rhode Island, Massachusetts, and Connecticut.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Video Integration</span>
                <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Before/After</span>
                <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Multi-State</span>
              </div>
              <motion.a 
                href="https://macspressuresoftwashing.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-black bg-black px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                View Project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* View Full Portfolio Link */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <motion.a 
            href="/portfolio"
            onClick={() => trackNavigationClick("portfolio_page")}
            className="inline-flex items-center gap-2 rounded-xl border border-black bg-white px-6 py-3 text-sm font-semibold shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            View Full Portfolio
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-4 pb-16">
        <motion.div 
          className="rounded-3xl border border-black bg-white p-4 md:p-6 shadow-[0_6px_0_0_#000]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <h3 className="text-base md:text-lg font-extrabold">Contact</h3>
          <motion.div 
            className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm"
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
              className="rounded-xl border border-black px-3 py-2 shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none text-center sm:text-left"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              jobs@suwityarat.com
            </motion.a>
            <motion.a 
              href="tel:+14012187310" 
              className="rounded-xl border border-black px-3 py-2 shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none text-center sm:text-left"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              +1 (401) 218‑7310
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/timothy-suwityarat-1737002a0/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="rounded-xl border border-black px-3 py-2 shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none text-center sm:text-left"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              LinkedIn
            </motion.a>
            <motion.span 
              className="rounded-xl border border-black px-3 py-2 text-center sm:text-left"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              Warwick, RI
            </motion.span>
          </motion.div>
          
          {/* More Contact Methods Button */}
          <motion.div 
            className="mt-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delay: 0.4
                }
              }
            }}
          >
            <motion.a 
              href="/contact"
              onClick={() => trackNavigationClick("contact_page")}
              className="inline-flex items-center gap-2 rounded-xl border border-black bg-white px-4 py-2 text-sm font-semibold shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              More Contact Methods
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
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

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
