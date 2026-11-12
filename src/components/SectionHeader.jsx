export default function SectionHeader({ command, index, description, label }) {
  return (
    <div className="mb-10 sm:mb-12">
      <div className="flex items-center gap-4">
        <h2 className="font-mono text-lg text-fg sm:text-xl">
          <span className="sr-only">{label}</span>
          <span aria-hidden="true">
            <span className="text-accent">$</span> {command}
          </span>
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        <span className="shrink-0 font-mono text-[11px] text-fg-dim">
          {index}
        </span>
      </div>
      {description ? (
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-fg-muted">
          {description}
        </p>
      ) : null}
    </div>
  )
}
