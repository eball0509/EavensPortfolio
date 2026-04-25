"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/",         label: "Home"     },
  { href: "/projects", label: "Projects" },
  { href: "/about",    label: "About"    },
  { href: "/contact",  label: "Contact"  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="28" height="28">
          <rect width="100" height="100" rx="12" fill="#000"/>
          <g transform="translate(50,50)">
            <path d="M-38,-13 Q-40,-23 -29,-25 L-12,-24 Q0,-29 0,-29 Q0,-29 12,-24 L29,-25 Q40,-23 38,-13 Q42,4 30,18 Q22,27 12,25 L4,18 Q0,17 0,17 Q0,17 -4,18 L-12,25 Q-22,27 -30,18 Q-42,4 -38,-13 Z" fill="#4ade80"/>
            <path d="M-38,-13 Q-40,-23 -29,-25 L-12,-24 Q-17,-12 -21,4 Q-27,17 -30,18 Q-42,4 -38,-13 Z" fill="#16a34a"/>
            <path d="M38,-13 Q40,-23 29,-25 L12,-24 Q17,-12 21,4 Q27,17 30,18 Q42,4 38,-13 Z" fill="#16a34a"/>
            <rect x="-22" y="-10" width="6" height="16" rx="2" fill="#000" opacity="0.7"/>
            <rect x="-25" y="-5" width="12" height="6" rx="2" fill="#000" opacity="0.7"/>
            <circle cx="16"  cy="-8" r="4" fill="#000" opacity="0.7"/>
            <circle cx="22"  cy="-2" r="4" fill="#000" opacity="0.7"/>
            <circle cx="10"  cy="-2" r="4" fill="#000" opacity="0.7"/>
            <circle cx="16"  cy="4"  r="4" fill="#000" opacity="0.7"/>
            <circle cx="-8" cy="8"  r="5" fill="#16a34a"/>
            <circle cx="8"  cy="8"  r="5" fill="#16a34a"/>
            <circle cx="-8" cy="8"  r="3" fill="#000" opacity="0.4"/>
            <circle cx="8"  cy="8"  r="3" fill="#000" opacity="0.4"/>
          </g>
        </svg>
        <span className="text-green-400 font-bold text-xl">EB</span>
      </div>

      {/* Links */}
      <div className="flex gap-6">
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative pb-1 transition ${active ? "text-green-400" : "hover:text-green-400"}`}
            >
              {label}
              {active && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 bottom-0 w-full h-[2px] bg-green-400 rounded"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}