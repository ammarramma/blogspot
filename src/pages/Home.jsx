import { motion } from 'framer-motion'

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 p-[3px]">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0f]">
            <img src="/pp.jpg" alt="Ammar" className="w-full h-full object-cover object-center" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Ammar
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
          Seorang mahasiswa TI yang sedang belajar jadi <span className="text-gray-200 font-medium">Web Developer</span>.
          Suka ngoprek Arch Linux, cinta mati sama terminal, dan percaya
          <span className="text-gray-200 font-medium"> TUI over GUI</span>, lol.
        </p>

        <div className="mt-10 flex gap-4 justify-center">
          <a
            href="/projects"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-medium text-sm hover:opacity-90 transition"
          >
            See My Work
          </a>
          <a
            href="/contact"
            className="px-6 py-3 rounded-xl border border-white/20 text-gray-300 font-medium text-sm hover:bg-white/5 transition"
          >
            Get In Touch
          </a>
        </div>
      </motion.div>
    </section>
  )
}