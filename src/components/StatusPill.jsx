const tones = {
  accent: {
    box: 'border-ring/40 bg-ring/10 text-primary',
    dot: 'bg-ring',
  },
  amber: {
    box: 'border-chart-1/50 bg-chart-1/10 text-primary',
    dot: 'bg-chart-1',
  },
  rose: {
    box: 'border-chart-2/40 bg-chart-2/10 text-primary',
    dot: 'bg-chart-2',
  },
  muted: {
    box: 'border-border bg-muted/60 text-muted-foreground',
    dot: 'bg-muted-foreground',
  },
}

export default function StatusPill({ tone = 'accent', children }) {
  const style = tones[tone] ?? tones.accent

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm motion-reduce:hover:translate-y-0 ${style.box}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
      />
      {children}
    </span>
  )
}
