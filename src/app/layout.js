import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import BackgroundCanvas from "./components/BackgroundCanvas";
import CustomCursor from "./components/CustomCursor";
import PageTransition from "./components/PageTransition";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Eavens Portfolio",
  description: "Built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">

        <CustomCursor />
        <BackgroundCanvas />

        {/* Ambient glow blob */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full z-0"
          style={{
            background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <Navbar />
        <PageTransition>
          {children}
          <Footer />
        </PageTransition>

      </body>
    </html>
  );
}