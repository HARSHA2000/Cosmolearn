import React from "react";
import Link from "next/link";
import { Globe, X, Code2, Mail } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  Programs: [
    {
      label: "Generative AI Workshop",
      href: "/programs/generative-ai-prompt-engineering",
    },
    {
      label: "Computer Vision Bootcamp",
      href: "/programs/computer-vision-bootcamp",
    },
    { label: "FDP — AI for Education", href: "/programs/fdp-ai-tools-education" },
    {
      label: "MLOps & Deployment",
      href: "/programs/mlops-deployment-final-year",
    },
  ],
  Company: [
    { label: "About Harshith", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Request a Proposal", href: "/contact" },
  ],
};

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/harshith",
    icon: Globe, // TODO: Replace with LinkedIn brand icon when available
  },
  {
    label: "GitHub",
    href: "https://github.com/harshith",
    icon: Code2, // TODO: Replace with GitHub brand icon when available
  },
  {
    label: "Twitter/X",
    href: "https://twitter.com/harshith",
    icon: X,
  },
  { label: "Email", href: "mailto:harshith@cosmoverge.in", icon: Mail },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-white overflow-hidden shrink-0 shadow-md">
                <Image
                  src="/cosmolearn-icon.png"
                  alt="CosmoLearn"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-xl font-display tracking-tight leading-none">
                  <span className="text-white">Cosmo</span>
                  <span className="text-amber-400">Learn</span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest mt-1 text-slate-500">
                 Learn | Adapt | Evolve
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Industry-aligned technical training across AI/ML, Cybersecurity,
              Full Stack, DevOps, VLSI & more — for educational institutions across India.
              A Cosmoverge initiative.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    s.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={s.label}
                  className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-white font-semibold text-sm mb-4 font-display">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 font-display">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="mailto:harshith@cosmoverge.in"
                  className="hover:text-white transition-colors"
                >
                  harshith@cosmoverge.in
                </a>
              </li>
              <li>Bengaluru, Karnataka, India</li>
              <li className="pt-2">
                <a
                  href="https://cosmoverge.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
                >
                  cosmoverge.in ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} CosmoLearn / Cosmoverge. All rights
            reserved.
          </p>
          <p className="text-xs text-slate-600">
            Technical training for educational institutions • Bengaluru, India
          </p>
        </div>
      </div>
    </footer>
  );
}
