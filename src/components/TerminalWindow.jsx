export default function TerminalWindow({
  title,
  right,
  children,
  className = '',
  bodyClassName = '',
}) {
  return (
    <div
      className={`overflow-hidden rounded-md border border-line bg-bg-1 ${className}`}
    >
      <div className="flex h-9 items-center gap-2.5 border-b border-line bg-bg-0/60 px-4">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
        />
        <span className="truncate font-mono text-[11px] text-fg-dim">
          {title}
        </span>
        {right ? (
          <span className="ml-auto shrink-0 font-mono text-[11px] text-fg-dim">
            {right}
          </span>
        ) : null}
      </div>
      <div className={`p-5 sm:p-7 ${bodyClassName}`}>{children}</div>
    </div>
  )
}
