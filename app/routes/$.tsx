import type { Route } from "./+types/$";
import { Link } from "react-router";
import { motion } from "framer-motion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "404 - Page Not Found | Timothy Suwityarat" },
    { name: "description", content: "The page you're looking for doesn't exist. Let's get you back on track." },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F6F2] text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#F7F6F2]/80 border-b border-black/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg md:text-xl font-black tracking-tight">
            suwityarat<span className="text-black">.me</span>
          </Link>
          <Link 
            to="/resume-pdf" 
            target="_blank" 
            className="hidden md:inline-flex items-center gap-2 rounded-xl border border-black bg-black px-3 py-2 text-xs md:text-sm font-semibold text-white shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none"
          >
            Save as PDF
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 pt-8 pb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-8xl md:text-9xl font-black text-neutral-200 leading-none">404</h1>
          </motion.div>
          
          {/* Error Message */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
              Page not found
            </h2>
            <p className="text-lg text-neutral-700 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
          </motion.div>
          
          {/* Main CTA Card */}
          <motion.div 
            className="rounded-3xl border border-black bg-white p-6 md:p-8 shadow-[0_6px_0_0_#000] max-w-lg mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <h3 className="text-lg font-extrabold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/"
                className="w-full inline-flex items-center justify-center rounded-2xl border border-black bg-black px-5 py-3 text-sm font-semibold text-white shadow-[0_3px_0_0_#000] active:translate-y-[3px] active:shadow-none"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go to Homepage
              </Link>
              
              <Link
                to="/portfolio"
                className="w-full inline-flex items-center justify-center rounded-2xl border border-black px-5 py-3 text-sm font-semibold shadow-[0_3px_0_0_#000] active:translate-y-[3px] active:shadow-none"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                View Portfolio
              </Link>
              
              <a
                href="https://www.linkedin.com/in/timothy-suwityarat-1737002a0/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-[#0077B5] bg-[#0077B5] px-5 py-3 text-sm font-semibold text-white shadow-[0_3px_0_0_#005885] active:translate-y-[3px] active:shadow-none"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </motion.div>
          
          {/* Contact Card */}
          <motion.div 
            className="rounded-3xl border border-black bg-white p-4 md:p-6 shadow-[0_6px_0_0_#000] max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <h3 className="text-base md:text-lg font-extrabold mb-3">Need Help?</h3>
            <p className="text-sm text-neutral-700 mb-4">
              Can't find what you're looking for? Get in touch and I'll help you out.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <a 
                href="mailto:jobs@suwityarat.com" 
                className="rounded-xl border border-black px-3 py-2 shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none text-center sm:text-left hover:bg-neutral-50 transition-colors"
              >
                jobs@suwityarat.com
              </a>
              <a 
                href="tel:+14012187310" 
                className="rounded-xl border border-black px-3 py-2 shadow-[0_2px_0_0_#000] active:translate-y-[2px] active:shadow-none text-center sm:text-left hover:bg-neutral-50 transition-colors"
              >
                (401) 218-7310
              </a>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
