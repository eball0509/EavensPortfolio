export default function ContactPage() {
  return (
    <main className="bg-black text-white min-h-screen p-10 flex flex-col items-center">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-green-400 mb-6">
         Contact Me
      </h1>


      <p className="text-gray-300 text-center max-w-md mb-10">
        Feel free to reach out to me through any of the platforms below.
      </p>

      {/* Contact Links */}
      <div className="space-y-4 w-full max-w-sm">

        <a
          href="mailto:eavenba3@gmail.com"
          className="block text-center bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-green-400 hover:scale-105 transition"
        >
          📧 Email Me
        </a>

        <a
          href="https://github.com/eball0509"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-green-400 hover:scale-105 transition"
        >
          💻 GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/eaven-ball-40a572295/"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-green-400 hover:scale-105 transition"
        >
          🔗 LinkedIn
        </a>

      </div>

    </main>
  );
}