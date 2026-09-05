export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 mt-20">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Ammar. Built with React + Tailwind.</p>
        <div className="flex gap-6">
          <a href="https://www.github.com/ammarramma" target="_blank" rel="noopener" className="hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/ammar-shiddiq-bb538833a" target="_blank" rel="noopener" className="hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="mailto:hello@ramma.dev" className="hover:text-white transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}