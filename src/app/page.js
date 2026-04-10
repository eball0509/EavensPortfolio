import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen p-10">

      <Hero />

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          About
        </h2>

        <p className="text-gray-400">
          Games. Tools. Engines. I build things that move, respond, and scale — and I'm always working on what's next.
        </p>

        <a
          href="/about"
          className="inline-block mt-4 text-green-400 hover:text-black hover:bg-green-400 border border-green-400 px-4 py-2 rounded transition"
        >
          Learn More →
        </a>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          What I’m Working On
        </h2>

        <p className="text-gray-400 leading-relaxed">
          I’m currently developing projects in both Unity and Unreal to strengthen my game development skills. At the same time, I’m building a strong foundation in web development and continuing to grow as a software engineer through hands-on projects and system design work.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          Skills & Focus
        </h2>

        <div className="space-y-6">

          <div>
            <h3 className="text-green-400 mb-2">Core Development</h3>
            <div className="flex flex-wrap gap-2">
              {["C#", "C++", "Unity", "Unreal Engine", "Blueprints", "GitHub"].map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-900 border border-green-500/30 text-green-400 px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-green-400 mb-2">Software Development</h3>
            <div className="flex flex-wrap gap-2">
              {[".NET / .NET MAUI", "Application Development", "Systems Design", "Tool Development", "OOP", "Data Structures", "Algorithms"].map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-900 border border-green-500/30 text-green-400 px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-green-400 mb-2">AI & Tooling</h3>
            <div className="flex flex-wrap gap-2">
              {["AI Integration", "Python", "Java"].map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-900 border border-green-500/30 text-green-400 px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-green-400 mb-2">Web Development (Expanding)</h3>
            <div className="flex flex-wrap gap-2">
              {["HTML", "React", "Next", "javaScript", "Modern Web Development", "API Integration"].map((skill) => (
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