import type { Route } from "./+types/contact";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePageViewTracking, useAnalytics } from "../hooks/useAnalytics";
import { ContactModal } from "../components/ContactModal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Timothy Suwityarat — Solutions Engineer" },
    { name: "description", content: "I'm Tim, a Solutions Engineer available for ITSM consulting, workflow automation, and web development services. Get in touch with me in Warwick, Rhode Island." },
    { name: "keywords", content: "contact Timothy Suwityarat, Solutions Engineer contact, ITSM consulting, workflow automation, web development Rhode Island" },
    { property: "og:title", content: "Contact Timothy Suwityarat — Solutions Engineer" },
    { property: "og:description", content: "I'm Tim, a Solutions Engineer available for ITSM consulting, workflow automation, and web development services." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://suwityarat.me/contact" },
    { property: "og:site_name", content: "Timothy Suwityarat" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Contact Timothy Suwityarat — Solutions Engineer" },
    { name: "twitter:description", content: "I'm Tim, a Solutions Engineer available for ITSM consulting, workflow automation, and web development services." },
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

export default function Contact({ loaderData }: Route.ComponentProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { trackContactClick } = useAnalytics();
  
  // Track page view
  usePageViewTracking("Contact Timothy Suwityarat — Solutions Engineer");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
    trackContactClick('contact_page_modal_open');
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
            "@type": "ContactPage",
            "name": "Contact Timothy Suwityarat",
            "description": "Contact Timothy Suwityarat, Solutions Engineer, for ITSM consulting, workflow automation, and web development services",
            "url": "https://suwityarat.me/contact",
            "mainEntity": {
              "@type": "Person",
              "name": "Timothy Suwityarat",
              "jobTitle": "Solutions Engineer",
              "email": "jobs@suwityarat.com",
              "telephone": "+1-401-218-7310",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Warwick",
                "addressRegion": "RI",
                "addressCountry": "US"
              },
              "url": "https://suwityarat.me"
            }
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
            <a href="/portfolio" className="hover:opacity-70 text-left">Portfolio</a>
            <a href="/resume-pdf" target="_blank" className="hover:opacity-70 text-left">Resume</a>
            <button onClick={() => scrollToSection('contact-methods')} className="hover:opacity-70 text-left">Contact Methods</button>
            <button onClick={() => scrollToSection('availability')} className="hover:opacity-70 text-left">Availability</button>
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
            <motion.button 
              onClick={() => { closeMobileMenu(); setTimeout(() => scrollToSection('contact-methods'), 100); }} 
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Methods
            </motion.button>
            <motion.button 
              onClick={() => { closeMobileMenu(); setTimeout(() => scrollToSection('availability'), 100); }} 
              className="hover:opacity-70 py-2 text-left"
              variants={{
                open: { opacity: 1, x: 0 },
                closed: { opacity: 0, x: -20 }
              }}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              Availability
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">Let's Connect</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-neutral-700 mb-6">Ready to discuss your next project or opportunity</p>
          <motion.p 
            className="max-w-3xl mx-auto text-base md:text-lg text-neutral-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            I'm always interested in connecting with fellow IT professionals, discussing new opportunities, or sharing insights about technology solutions. Whether you're looking for ITSM consulting, workflow automation, or web development services, I'd love to hear from you.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Methods */}
      <section id="contact-methods" className="mx-auto max-w-7xl px-4 py-10">
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
          <motion.div 
            className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl border border-black bg-black p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">Email</h3>
            </div>
            <p className="text-sm text-neutral-700 mb-4">I prefer email for detailed inquiries, project discussions, and formal communications.</p>
            <motion.a 
              href="mailto:jobs@suwityarat.com" 
              onClick={() => trackContactClick("email_contact")}
              className="inline-flex items-center gap-2 rounded-xl border border-black bg-black px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              jobs@suwityarat.com
            </motion.a>
          </motion.div>

          <motion.div 
            className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl border border-black bg-black p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">Phone</h3>
            </div>
            <p className="text-sm text-neutral-700 mb-4">I'm available by phone for quick questions, urgent matters, or when you prefer to talk directly.</p>
            <motion.a 
              href="tel:+14012187310" 
              onClick={() => trackContactClick("phone_contact")}
              className="inline-flex items-center gap-2 rounded-xl border border-black bg-black px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              +1 (401) 218-7310
            </motion.a>
          </motion.div>

          <motion.div 
            className="rounded-3xl border border-black bg-white p-6 shadow-[0_6px_0_0_#000]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-xl border border-[#0077B5] bg-[#0077B5] p-2">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <h3 className="text-xl font-extrabold tracking-tight">LinkedIn</h3>
            </div>
            <p className="text-sm text-neutral-700 mb-4">I use LinkedIn for professional networking, career opportunities, and industry discussions.</p>
            <motion.a 
              href="https://www.linkedin.com/in/timothy-suwityarat-1737002a0/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackContactClick("linkedin_contact")}
              className="inline-flex items-center gap-2 rounded-xl border border-[#0077B5] bg-[#0077B5] px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#005885] active:translate-y-[2px] active:shadow-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Connect on LinkedIn
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* Availability */}
      <section id="availability" className="mx-auto max-w-7xl px-4 py-10">
        <motion.div 
          className="rounded-3xl border border-black bg-white p-6 md:p-8 shadow-[0_6px_0_0_#000]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">Availability & Response Times</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-extrabold mb-3">Current Status</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="font-semibold">Available for new opportunities</span>
              </div>
              <p className="text-sm text-neutral-700 mb-4">
                I'm currently open to discussing new projects, consulting opportunities, and career prospects. Whether you're looking for ITSM expertise, workflow automation, or web development services, I'd love to hear about your needs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-extrabold mb-3">Best Times to Reach Me</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  <span><strong>Email:</strong> I check regularly throughout the day</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  <span><strong>Phone:</strong> Best during business hours (9 AM - 6 PM EST)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  <span><strong>LinkedIn:</strong> I respond when I'm able</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="mx-auto max-w-7xl px-4 py-10">
        <motion.div 
          className="rounded-3xl border border-black bg-white p-6 md:p-8 shadow-[0_6px_0_0_#000]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">Send a Message</h2>
          <p className="text-neutral-700 mb-6">
            Ready to discuss your project? Fill out the form below and I'll get back to you within 24 hours.
          </p>
          <motion.button
            onClick={openContactModal}
            className="inline-flex items-center gap-2 rounded-xl border border-black bg-black px-6 py-3 text-white font-semibold shadow-[0_4px_0_0_#000] hover:shadow-[0_6px_0_0_#000] active:translate-y-[2px] active:shadow-[0_2px_0_0_#000] transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Open Contact Form
          </motion.button>
        </motion.div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-10">
        <motion.div 
          className="rounded-3xl border border-black bg-white p-6 md:p-8 shadow-[0_6px_0_0_#000]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">How I Can Help</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-black/20 bg-neutral-50 p-4">
              <h3 className="text-lg font-extrabold mb-2">ITSM Consulting</h3>
              <p className="text-sm text-neutral-700 mb-3">TeamDynamix expertise, workflow design, and service catalog optimization.</p>
              <ul className="text-xs text-neutral-600 space-y-1">
                <li>• Workflow automation</li>
                <li>• Knowledge base management</li>
                <li>• Process improvement</li>
              </ul>
            </div>
            <div className="rounded-xl border border-black/20 bg-neutral-50 p-4">
              <h3 className="text-lg font-extrabold mb-2">Web Development</h3>
              <p className="text-sm text-neutral-700 mb-3">Custom websites and web applications for Rhode Island businesses.</p>
              <ul className="text-xs text-neutral-600 space-y-1">
                <li>• Custom website design</li>
                <li>• Local SEO optimization</li>
                <li>• Performance optimization</li>
              </ul>
            </div>
            <div className="rounded-xl border border-black/20 bg-neutral-50 p-4">
              <h3 className="text-lg font-extrabold mb-2">Technical Training</h3>
              <p className="text-sm text-neutral-700 mb-3">Training and knowledge transfer for IT teams and end users.</p>
              <ul className="text-xs text-neutral-600 space-y-1">
                <li>• TeamDynamix training</li>
                <li>• IT process documentation</li>
                <li>• User adoption strategies</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Location */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <motion.div 
          className="rounded-3xl border border-black bg-white p-6 md:p-8 shadow-[0_6px_0_0_#000]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
        >
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">Location & Time Zone</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-xl border border-black bg-black p-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold">Warwick, Rhode Island</h3>
              </div>
              <p className="text-sm text-neutral-700 mb-4">
                Based in Warwick, RI, I serve clients throughout Rhode Island and can work remotely with teams anywhere. I'm familiar with the local business community and understand the unique needs of Rhode Island organizations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-extrabold mb-3">Time Zone</h3>
              <div className="rounded-xl border border-black/20 bg-neutral-50 p-4">
                <div className="text-2xl font-black text-black mb-1">Eastern Time (EST/EDT)</div>
                <p className="text-sm text-neutral-600">UTC-5 (EST) / UTC-4 (EDT)</p>
              </div>
              <p className="text-sm text-neutral-700 mt-4">
                I'm available during standard business hours Eastern Time, but I'm flexible with scheduling for urgent matters or international clients.
              </p>
            </div>
          </div>
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
