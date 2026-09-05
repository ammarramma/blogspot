import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Belajar API',
    desc: 'Pengen banget bikin REST API pake Laravel. Lagi belajar routing, migration, dan CRUD. Semoga kelar, lawak.',
    tags: ['Laravel', 'Postman', 'MySQL'],
    status: 'In Progress',
  },
  {
    title: 'CLI Tools',
    desc: 'Mau bikin aplikasi terminal sederhana pake Go atau Python. Biar makin betah di TUI, lol.',
    tags: ['Go', 'Python', 'Terminal'],
    status: 'Planning',
  },
  {
    title: 'Portfolio Ini',
    desc: 'Website yang lagi lu liat ini, bro. Dibikin pake React + Tailwind + Framer Motion. Lernin by doing.',
    tags: ['React', 'Tailwind', 'Vite'],
    status: 'Live',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

export default function Projects() {
  return (
    <section className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4 text-center"
        {...fadeUp}
      >
        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Projects</span>
      </motion.h1>

      <motion.p
        className="text-gray-400 text-center mb-14 max-w-lg mx-auto"
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Project-project yang gue lagi kerjain (dan beberapa belum kelar, maap lol).
      </motion.p>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            whileHover={{ y: -6 }}
            className="group block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                {i + 1}
              </span>
              <span className="text-xs px-2 py-1 rounded-full font-medium" style={{
                color: p.status === 'Live' ? '#4ade80' : p.status === 'In Progress' ? '#facc15' : '#9ca3af',
                backgroundColor: p.status === 'Live' ? 'rgba(74,222,128,0.2)' : p.status === 'In Progress' ? 'rgba(250,204,21,0.2)' : 'rgba(156,163,175,0.2)',
              }}>
                {p.status}
              </span>
            </div>
            <h2 className="text-lg font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition">
              {p.title}
            </h2>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-500"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}