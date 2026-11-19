export default function SectionHeader({ index, title, eyebrow, description }) {
  return (
    <header className="mb-12 sm:mb-16">
      <div className="flex items-end gap-4 border-b border-border pb-5">
        <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-primary">
          {index}
        </span>
        <h2 className="font-serif text-3xl leading-none font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {eyebrow ? (
          <span className="ml-auto hidden text-[0.625rem] font-medium tracking-[0.2em] text-muted-foreground uppercase sm:block">
            {eyebrow}
          </span>
        ) : null}
      </div>
      {description ? (
        <p className="mt-5 max-w-2xl text-[0.9375rem] leading-7 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  )
}
