import type { Route } from "./+types/portfolio";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePageViewTracking } from "../hooks/useAnalytics";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio — Timothy Suwityarat Web Design Work" },
    { name: "description", content: "Explore my web design portfolio featuring custom websites, ITSM solutions, and digital projects. See examples of my work in web development, user experience design, and technical solutions." },
    { name: "keywords", content: "Timothy Suwityarat portfolio, web design portfolio, ITSM solutions, custom websites, Rhode Island web developer, TeamDynamix solutions" },
    { property: "og:title", content: "Portfolio — Timothy Suwityarat Web Design Work" },
    { property: "og:description", content: "Explore my web design portfolio featuring custom websites, ITSM solutions, and digital projects." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://suwityarat.me/portfolio" },
    { property: "og:site_name", content: "Timothy Suwityarat" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Portfolio — Timothy Suwityarat" },
    { name: "twitter:description", content: "Explore my web design portfolio featuring custom websites, ITSM solutions, and digital projects." },
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

export default function Portfolio({ loaderData }: Route.ComponentProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Track page view
  usePageViewTracking("Portfolio — Timothy Suwityarat Web Design Work");

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
            "@type": "CollectionPage",
            "name": "Timothy Suwityarat Portfolio",
            "description": "Web design portfolio featuring custom websites, ITSM solutions, and digital projects by Timothy Suwityarat",
            "url": "https://suwityarat.me/portfolio",
            "mainEntity": {
              "@type": "Person",
              "name": "Timothy Suwityarat",
              "jobTitle": "Solutions Engineer",
              "url": "https://suwityarat.me"
            },
            "about": [
              {
                "@type": "Thing",
                "name": "Web Design"
              },
              {
                "@type": "Thing", 
                "name": "ITSM Solutions"
              },
              {
                "@type": "Thing",
                "name": "Workflow Automation"
              }
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
            <a href="/about" className="hover:opacity-70 text-left">About</a>
            <button onClick={() => scrollToSection('web-design')} className="hover:opacity-70 text-left">Web Design</button>
            <button onClick={() => scrollToSection('itsm-solutions')} className="hover:opacity-70 text-left">ITSM Solutions</button>
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
            <motion.a 
              href="/about" 
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              About
            </motion.a>
            <motion.button 
              onClick={() => { closeMobileMenu(); setTimeout(() => scrollToSection('web-design'), 100); }} 
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Web Design
            </motion.button>
            <motion.button 
              onClick={() => { closeMobileMenu(); setTimeout(() => scrollToSection('itsm-solutions'), 100); }} 
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              ITSM Solutions
            </motion.button>
            <motion.button 
              onClick={() => { closeMobileMenu(); setTimeout(() => scrollToSection('contact'), 100); }} 
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">My Portfolio</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-neutral-700 mb-6">Web Design & Technical Solutions</p>
          <motion.p 
            className="max-w-3xl mx-auto text-base md:text-lg text-neutral-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            A collection of my web design work, ITSM solutions, and technical projects. Each project represents my commitment to clean design, user experience, and practical solutions.
          </motion.p>
        </motion.div>
      </section>

      {/* Web Design Section */}
      <section id="web-design" className="mx-auto max-w-7xl px-4 py-10">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">Web Design Projects</h2>
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
      </section>

      {/* ITSM Solutions Section */}
      <section id="itsm-solutions" className="mx-auto max-w-7xl px-4 py-10">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">ITSM Solutions</h2>
          <p className="text-base md:text-lg text-neutral-700">Technical solutions and workflow designs for IT service management and process automation.</p>
        </motion.div>

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
          {/* ITSM Project 1 */}
          <motion.div 
            className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/ccri.png" alt="CCRI logo" className="w-8 h-8 object-contain" />
              <h3 className="text-lg font-extrabold tracking-tight">Knowledge Base Restructure</h3>
            </div>
            <p className="text-sm text-neutral-700 mb-4">Led a comprehensive restructure of 600+ knowledge base articles, improving self-service capabilities and user experience.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">TeamDynamix</span>
              <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Content Strategy</span>
              <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">User Experience</span>
            </div>
            <div className="text-xs text-neutral-600">
              <strong>Impact:</strong> Improved article findability and reduced support ticket volume
            </div>
          </motion.div>

          {/* ITSM Project 2 */}
          <motion.div 
            className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/ccri.png" alt="CCRI logo" className="w-8 h-8 object-contain" />
              <h3 className="text-lg font-extrabold tracking-tight">Workflow Automation</h3>
            </div>
            <p className="text-sm text-neutral-700 mb-4">Designed and implemented automated workflows for access requests and equipment reservations, streamlining administrative processes.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">TeamDynamix</span>
              <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Process Design</span>
              <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Integration</span>
            </div>
            <div className="text-xs text-neutral-600">
              <strong>Impact:</strong> Reduced manual processing time and improved accuracy
            </div>
          </motion.div>

          {/* ITSM Project 3 */}
          <motion.div 
            className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/ccri.png" alt="CCRI logo" className="w-8 h-8 object-contain" />
              <h3 className="text-lg font-extrabold tracking-tight">Help Desk Portal Redesign</h3>
            </div>
            <p className="text-sm text-neutral-700 mb-4">Redesigned and coded the IT Help Desk website to improve accessibility, user experience, and information architecture.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Web Development</span>
              <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Accessibility</span>
              <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">UX Design</span>
            </div>
            <div className="text-xs text-neutral-600">
              <strong>Impact:</strong> Enhanced user satisfaction and improved service delivery
            </div>
          </motion.div>

          {/* ITSM Project 4 */}
          <motion.div 
            className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/tdx.webp" alt="TeamDynamix logo" className="w-8 h-8 object-contain" />
              <h3 className="text-lg font-extrabold tracking-tight">Demo Environment Design</h3>
            </div>
            <p className="text-sm text-neutral-700 mb-4">Built customized demo environments and workflows for prospect demonstrations, showcasing real-world scenarios and solutions.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Demo Design</span>
              <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Solution Architecture</span>
              <span className="rounded-xl border border-black/50 bg-neutral-50 px-2.5 py-1 text-xs">Sales Enablement</span>
            </div>
            <div className="text-xs text-neutral-600">
              <strong>Impact:</strong> Improved prospect engagement and solution understanding
            </div>
          </motion.div>
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
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">Let's Work Together</h2>
          <p className="text-base md:text-lg text-neutral-700 mb-6">
            Interested in discussing a web design project or ITSM solution? I'd love to hear about your needs and explore how I can help bring your vision to life.
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
