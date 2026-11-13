import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { profile } from '../data/profile'

const typeTone = {
  work: 'bg-accent',
  edu: 'bg-fg-dim',
  cert: 'bg-amber',
}

const typeText = {
  work: 'text-accent',
  edu: 'text-fg-muted',
  cert: 'text-amber',
}

export default function Experience() {
  return (
    <section id="experience" className="pb-24 sm:pb-32">
      <div className="shell">
        <SectionHeader
          command="git log --career"
          index="04 / experience"
          label="Experience"
          description="Work, education, and certification — in reverse chronological order."
        />

        <Reveal>
          <ol className="border-l border-line pl-6 sm:pl-8">
            {profile.career.map((entry) => (
              <li
                key={`${entry.year}-${entry.title}`}
                className="relative pb-10 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 -left-[28px] h-2 w-2 rounded-full sm:-left-[36px] ${
                    typeTone[entry.type]
                  }`}
                />
                <div className="font-mono text-[0.6875rem] text-fg-dim">
                  <span className="text-fg-muted">{entry.year}</span>
                  <span aria-hidden="true" className="mx-2 text-line-strong">
                    ·
                  </span>
                  <span className={typeText[entry.type]}>{entry.type}</span>
                </div>
                <h3 className="mt-1.5 text-lg font-medium text-fg">
                  {entry.title}
                </h3>
                <p className="mt-0.5 text-sm text-fg-muted">{entry.meta}</p>

                {entry.bullets.length > 0 ? (
                  <ul className="mt-3 space-y-1.5 text-sm leading-6 text-fg-muted">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5">
                        <span aria-hidden="true" className="text-fg-dim">
                          -
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
