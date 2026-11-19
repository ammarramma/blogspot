import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import { socials } from '../data/profile'

const fieldClass =
  'mt-2 w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-all duration-200 hover:border-ring/40 focus:border-ring focus:bg-background focus:shadow-sm'

export default function Contact() {
  const formRef = useRef(null)
  const [state, setState] = useState('idle')

  const sendEmail = (event) => {
    event.preventDefault()
    if (state === 'sending') return

    setState('sending')
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setState('sent')
        formRef.current?.reset()
      })
      .catch((error) => {
        console.error('EmailJS error:', error)
        setState('error')
      })
  }

  return (
    <section id="contact" className="pb-24 sm:pb-32">
      <div className="shell">
        <SectionHeader
          index="05"
          title="Contact"
          eyebrow="Say hello"
          description="Have a project, an internship opening, or just want to talk shop? My inbox is open."
        />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal>
            <p className="max-w-sm text-[0.9375rem] leading-8 text-muted-foreground">
              I read everything and reply within a day or two. Email is best,
              but GitHub and LinkedIn work too.
            </p>

            <ul className="mt-8 space-y-1">
              {socials.map((social) => (
                <li
                  key={social.label}
                  className="grid grid-cols-[72px_1fr] gap-4 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-card/60"
                >
                  <span className="text-[0.6875rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                    {social.label}
                  </span>
                  <a
                    href={social.href}
                    target={
                      social.href.startsWith('mailto:') ? undefined : '_blank'
                    }
                    rel={
                      social.href.startsWith('mailto:')
                        ? undefined
                        : 'noopener noreferrer'
                    }
                    className="break-all text-muted-foreground transition-colors hover:text-primary"
                  >
                    {social.text}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-sm text-muted-foreground">
              Currently in Lhokseumawe, Indonesia (UTC+7).
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div aria-live="polite" className="sr-only">
                {state === 'sent'
                  ? 'Message sent.'
                  : state === 'error'
                    ? 'Message failed to send.'
                    : ''}
              </div>

              {state === 'sent' ? (
                <div className="py-10">
                  <p className="font-serif text-3xl font-semibold tracking-tight text-foreground">
                    Message sent.
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                    Thanks for reaching out. I&apos;ll get back to you within a
                    day or two.
                  </p>
                  <button
                    type="button"
                    onClick={() => setState('idle')}
                    className="mt-7 text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                    Send a message
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A few lines are enough — I&apos;ll take it from there.
                  </p>

                  <form
                    ref={formRef}
                    onSubmit={sendEmail}
                    className="mt-6 space-y-4"
                  >
                    <label className="block">
                      <span className="text-[0.6875rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                        Name
                      </span>
                      <input
                        type="text"
                        name="from_name"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        disabled={state === 'sending'}
                        className={fieldClass}
                      />
                    </label>

                    <label className="block">
                      <span className="text-[0.6875rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                        Email
                      </span>
                      <input
                        type="email"
                        name="from_email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        disabled={state === 'sending'}
                        className={fieldClass}
                      />
                    </label>

                    <label className="block">
                      <span className="text-[0.6875rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                        Message
                      </span>
                      <textarea
                        name="message"
                        required
                        rows="5"
                        placeholder="What's on your mind?"
                        disabled={state === 'sending'}
                        className={`${fieldClass} resize-none`}
                      />
                    </label>

                    {state === 'error' ? (
                      <p className="text-sm text-destructive">
                        Message not sent. Try again or email me directly.
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={state === 'sending'}
                      className="w-full rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                      {state === 'sending' ? 'Sending…' : 'Send message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
