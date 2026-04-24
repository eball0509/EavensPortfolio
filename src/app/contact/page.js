export default function ContactPage() {
  return (
    <main className="bg-black text-white min-h-screen p-10 flex justify-center">

      <div className="max-w-4xl w-full">

        <h1 className="text-4xl font-bold text-green-400 mb-6">
          Contact Me
        </h1>

        <p className="text-gray-300 mb-10 max-w-md">
          Feel free to reach out through any of the platforms below. I'm always open to discussing projects, opportunities, or collaborations.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="space-y-4">

            <a
              href="mailto:eavenba3@gmail.com"
              className="block text-center bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-green-400 hover:bg-gray-800 hover:scale-105 transition"
            >
              Email Me
            </a>

            <a
              href="https://github.com/eball0509"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-green-400 hover:bg-gray-800 hover:scale-105 transition"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/eaven-ball-40a572295/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-green-400 hover:bg-gray-800 hover:scale-105 transition"
            >
              LinkedIn
            </a>

          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

            <h2 className="text-green-400 text-xl mb-3">
              What I’m Open To
            </h2>

            <p className="text-gray-300 mb-4">
              I'm currently open to opportunities involving game development, software engineering, and collaborative projects.
            </p>

            <div className="border-t border-gray-800 my-4" />

            <p className="text-gray-400 text-sm">
              Interests:
            </p>

            <p className="text-blue-400">
              Game Development • Systems Programming • Development Tools and Systems
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}