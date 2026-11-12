const tones = {
  accent: 'border-accent/30 bg-accent/5 text-accent',
  amber: 'border-amber/30 bg-amber/5 text-amber',
  muted: 'border-line bg-bg-1 text-fg-dim',
}

export default function StatusPill({ tone = 'accent', children }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-sm border px-2.5 py-1 font-mono text-[11px] whitespace-nowrap ${tones[tone]}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}
