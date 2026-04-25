"use client";

import Link from "next/link";

const links = [
  { href: "/",         label: "Home"     },
  { href: "/projects", label: "Projects" },
  { href: "/about",    label: "About"    },
  { href: "/contact",  label: "Contact"  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-20 px-10 py-10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-8">

        {/* Left — name + tagline */}
        <div>
          <p className="text-green-400 font-bold text-lg">Eaven Ball</p>
          <p className="text-gray-500 text-sm mt-1">Game & Software Developer</p>
        </div>

        {/* Center — nav */}
        <div className="flex flex-col gap-2">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-gray-400 text-sm hover:text-green-400 transition"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right — LinkedIn + copyright */}
        <div className="flex flex-col justify-between gap-4">
          <a
            href="https://www.linkedin.com/in/eaven-ball-40a572295/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 text-sm hover:text-green-400 transition"
          >
            LinkedIn ↗
          </a>
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Eaven Ball. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}