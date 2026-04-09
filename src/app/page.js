import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen p-10">

      {/* HERO */}
      <Hero />

      {/* ABOUT SUMMARY */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          About
        </h2>

        <p className="text-gray-400">
          I’m a software and game developer focused on building interactive systems, gameplay mechanics, and development tools using Unity and Unreal Engine. I also have a strong foundation in software development and am expanding into web technologies.
        </p>

        <a
          href="/about"
          className="inline-block mt-4 text-green-400 hover:text-black hover:bg-green-400 border border-green-400 px-4 py-2 rounded transition"
        >
          Learn More →
        </a>
      </section>

      {/* WHAT I'M WORKING ON */}
      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          What I’m Working On
        </h2>

        <p className="text-gray-400 leading-relaxed">
          I’m currently developing projects in both Unity and Unreal to strengthen my game development skills. At the same time, I’m building a strong foundation in web development and continuing to grow as a software engineer through hands-on projects and system design work.
        </p>
      </section>

      {/* SKILLS */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          Skills & Focus
        </h2>

        <div className="space-y-6">

          {/* Core Development */}
          <div>
            <h3 className="text-green-400 mb-2">Core Development</h3>
            <div className="flex flex-wrap gap-2">
              {["C#", "C++", "Unity", "Unreal Engine", "Blueprints"].map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-900 border border-green-500/30 text-green-400 px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Software Development */}
          <div>
            <h3 className="text-green-400 mb-2">Software Development</h3>
            <div className="flex flex-wrap gap-2">
              {[".NET / .NET MAUI", "Application Development", "Systems Design", "Tool Development"].map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-900 border border-green-500/30 text-green-400 px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Web Development */}
          <div>
            <h3 className="text-green-400 mb-2">Web Development (Expanding)</h3>
            <div className="flex flex-wrap gap-2">
              {["HTML", "React", "Next", "Modern Web Development"].map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-900 border border-green-500/30 text-green-400 px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          Let’s Connect
        </h2>

        <p className="text-gray-400 mb-6">
          Interested in collaborating or want to reach out?
        </p>

        <a
          href="/contact"
          className="inline-block px-6 py-3 border border-green-400 text-green-400 rounded hover:bg-green-400 hover:text-black transition"
        >
          Contact Me
        </a>
      </section>

    </main>
  );
}