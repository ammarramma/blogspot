import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { profile } from '../data/profile'

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          index="01"
          title="About"
          eyebrow="Introduction"
          description="A design-minded engineer focused on secure backends, useful interfaces, and systems that stay understandable as they grow."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal className="space-y-5">
            {profile.about.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-[0.9375rem] leading-8 text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                'Based in Lhokseumawe, ID',
                'Open to internships',
                'Learning in public',
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-card/60 px-3 py-1 text-[0.6875rem] text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-ring/60 hover:shadow-md motion-reduce:hover:translate-y-0 sm:p-8">
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                  At a glance
                </h3>
                <span className="text-[0.625rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  Quick facts
                </span>
              </div>

              <dl className="divide-y divide-border">
                {profile.facts.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[92px_1fr] gap-3 py-2.5 text-[0.8125rem]"
                  >
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="break-words text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
