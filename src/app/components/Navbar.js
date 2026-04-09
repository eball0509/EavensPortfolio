import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center border-b border-blue-500">
      
      {/* Logo / Name */}
      <div className="text-green-400 font-bold text-xl">
        EB
      </div>

      {/* Links */}
      <div className="flex gap-6">
        <Link href="/" className="hover:text-green-400 transition">
          Home
        </Link>
        <Link href="/projects" className="hover:text-green-400 transition">
          Projects
        </Link>
        <Link href="/about" className="hover:text-green-400 transition">
          About
        </Link>
        <Link href="/contact" className="hover:text-green-400 transition">
          Contact
        </Link>
      </div>
    </nav>
  );
}