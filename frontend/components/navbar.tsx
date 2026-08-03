"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "./motion";
import { contactPhone, contactPhoneE164, whatsappNumber } from "@/lib/contact";

const projectLinks = [
  { label: "Etihad Town Phase IV", href: "/projects/phase-4" },
  { label: "Etihad Town Phase III", href: "/projects/phase-3" },
  { label: "Etihad Town Phase II", href: "/projects/phase-2" },
  { label: "Etihad Town Phase I", href: "/projects/phase-1" },
  { label: "Premier Enclave", href: "/projects/premier-enclave" },
  { label: "Etihad Town Sialkot", href: "/projects/sialkot" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects", dropdown: true },
  { label: "Blog", href: "/blog" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const message = encodeURIComponent(
    "Hi, I'm interested in learning more about Etihad Town plots and payment plans."
  );
  
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/etihad-logo.png"
                alt="Etihad Town"
                className="h-8 lg:h-9 w-auto"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  className="relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
                >
                  {link.dropdown ? (
                    <div
                      onMouseEnter={() => setOpen(true)}
                      onMouseLeave={() => setOpen(false)}
                    >
                      <span className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-primary cursor-default transition-colors">
                        Projects
                        <svg
                          className={`w-3 h-3 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                      <AnimatePresence>
                        {open && (
                          <motion.div
                            className="absolute top-full left-0 mt-0 w-56 bg-white border-t-2 border-accent shadow-lg"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Link
                              href="/projects"
                              className="block px-5 py-3 text-sm font-semibold text-primary border-b border-neutral-100 hover:bg-neutral-50"
                              onClick={() => setOpen(false)}
                            >
                              All Projects
                            </Link>
                            {projectLinks.map((pl, idx) => (
                              <Link
                                key={pl.href}
                                href={pl.href}
                                className={`block px-5 py-3 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 transition-colors ${
                                  idx < projectLinks.length - 1 ? "border-b border-neutral-50" : ""
                                }`}
                                onClick={() => setOpen(false)}
                              >
                                {pl.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                        isActive(link.href) ? "text-primary" : "text-neutral-600 hover:text-primary"
                      }`}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <motion.span
                          className="absolute -bottom-[3px] left-4 right-4 h-0.5 bg-accent rounded-full"
                          layoutId="nav-active"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Link
                 href={`https://wa.me/${whatsappNumber}?text=${message}`}
                  className="ml-4 px-6 py-2.5 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-dark transition-all duration-200"
                >
                  +92 320 4474819
                </Link>
              </motion.div>
            </div>

            <button
              className="lg:hidden p-2 text-primary"
              aria-label={mobileOpen ? "Close" : "Menu"}
              onClick={() => setMobileOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 border-l border-neutral-100 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/etihad-logo.png"
                      alt="Etihad Town"
                      className="h-8 w-auto"
                    />
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="p-2 text-neutral-400 hover:text-primary">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-1">
                  <Link href="/" className="block py-3 text-sm font-medium border-b border-neutral-100 text-neutral-600 hover:text-primary" onClick={() => setMobileOpen(false)}>Home</Link>
                  <Link href="/projects" className="block py-3 text-sm font-medium border-b border-neutral-100 text-primary" onClick={() => setMobileOpen(false)}>All Projects</Link>
                  <div className="pl-4 space-y-0 ml-4 border-l border-neutral-200 mb-2 mt-1">
                    {projectLinks.map((pl) => (
                      <Link key={pl.href} href={pl.href} className="block py-2 text-sm text-neutral-500 hover:text-primary" onClick={() => setMobileOpen(false)}>{pl.label}</Link>
                    ))}
                  </div>
                  <Link href="/blog" className="block py-3 text-sm font-medium border-b border-neutral-100 text-neutral-600 hover:text-primary" onClick={() => setMobileOpen(false)}>Blog</Link>
                  <Link href="/media" className="block py-3 text-sm font-medium border-b border-neutral-100 text-neutral-600 hover:text-primary" onClick={() => setMobileOpen(false)}>Media</Link>
                  <Link href="/contact" className="block py-3 text-sm font-medium border-b border-neutral-100 text-neutral-600 hover:text-primary" onClick={() => setMobileOpen(false)}>Contact</Link>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-100">
                  <p className="text-xs text-neutral-400 tracking-wider uppercase mb-3">Corporate Office</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">Etihad Town Phase II<br />4km Off Ferozpur Road, Lahore</p>
                  <a href={`tel:${contactPhoneE164}`} className="block mt-3 text-sm font-medium text-primary">{contactPhone}</a>
                  <Link href="/contact" className="block w-full text-center mt-6 py-3 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-dark" onClick={() => setMobileOpen(false)}>
                    Book a Visit
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
