import { motion } from 'framer-motion'

const skills = [
  { name: 'Laravel', level: 85 },
  { name: 'HTML', level: 70 },
  { name: 'CSS', level: 60 },
  { name: 'JavaScript', level: 30 },
  { name: 'Java', level: 40 },
  { name: 'C', level: 30 },
  { name: 'Go', level: 10 },
  { name: 'Python', level: 40 },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function About() {
  return (
    <section className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
        {...fadeUp}
      >
        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Me</span>
      </motion.h1>

      <motion.p
        className="text-gray-400 text-lg leading-relaxed mb-16 text-center"
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Gue Ammar — mahasiswa TI yang lagi merantau di dunia coding. Masih
        jauh dari jago, tapi setiap hari belajar buat jadi{' '}
        <span className="text-gray-200 font-medium">Web Developer</span> yang
        bener. Di luar ngoding, gue suka{' '}
        <span className="text-gray-200 font-medium">rice Arch Linux</span>
        {' '}sampe WMs broken, ngoprak-ngoprak terminal, dan basically{' '}
        <span className="text-gray-200 font-medium">TUI for life</span>. Oh
        iya, gue juga seorang pemalas — tapi kalo udah suka sama sesuatu,
        gue bakal dalemin sampe bisa, lol.
      </motion.p>

      <motion.h2
        className="text-2xl font-semibold mb-8 text-center"
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Skills
      </motion.h2>

      <div className="space-y-5">
        {skills.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300 font-medium">{s.name}</span>
              <span className="text-gray-500">{s.level}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}