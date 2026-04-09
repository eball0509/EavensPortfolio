export default function AboutPage() {
  return (
    <main className="bg-black text-white min-h-screen p-10 flex justify-center">
      
      <div className="max-w-4xl w-full">
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-green-400 mb-6">
          About Me
        </h1>

        {/* Split layout */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Left */}
          <div>
            <p className="text-gray-300 mb-4">
              Hi, I’m <span className="text-green-400">Eaven Ball</span>, a software and game developer focused on building efficient systems.
            </p>

            <p className="text-gray-300">
              I work primarily with <span className="text-blue-400">C#</span> and <span className="text-blue-400">Unity</span>, building systems, tools, and interactive experiences.
            </p>
          </div>

          {/* Right (card) */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h2 className="text-green-400 mb-2">Core Skills</h2>

            <div className="flex flex-wrap gap-2">
              {["C#", "Unity", "C++", "Game Systems", "Gameplay Programming", "Problem Solving"].map((skill) => (
                <span
                  key={skill}
                  className="bg-black border border-gray-700 text-blue-400 px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Extra section */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <h2 className="text-green-400 mb-2">
            Currently Working On
          </h2>

          <p className="text-gray-300">
            I’m currently working in <span className="text-blue-400">Unity</span> and{" "}
            <span className="text-blue-400">Unreal Engine</span>, focusing on improving 
              my game development skills and building more advanced, performance-oriented systems.
          </p>

          <p className="text-gray-300 mt-2">
            Alongside that, I’m expanding into web development, developing a solid 
            foundation and progressing into more intermediate concepts to strengthen 
            my versatility as a developer.
          </p>
        </div>

      </div>

    </main>
  );
}