import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import SectionHeader from '../components/SectionHeader'
import TerminalWindow from '../components/TerminalWindow'
import Reveal from '../components/Reveal'
import { socials } from '../data/profile'

const fieldClass =
  'mt-1.5 w-full rounded-sm border border-line bg-bg-0 px-3 py-2.5 font-mono text-sm text-fg placeholder:text-fg-dim transition-colors focus:border-accent'

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
          command="mail ammar"
          index="05 / contact"
          label="Contact"
          description="Have a project, an internship opening, or just want to talk shop? My inbox is open."
        />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal>
            <p className="max-w-sm text-[0.9375rem] leading-8 text-fg-muted">
              I read everything and reply within a day or two. Email is best,
              but GitHub and LinkedIn work too.
            </p>

            <ul className="mt-8 space-y-3">
              {socials.map((social) => (
                <li
                  key={social.label}
                  className="grid grid-cols-[64px_1fr] gap-4 font-mono text-xs"
                >
                  <span className="text-fg-dim">{social.label}</span>
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
                    className="break-all text-fg-muted transition-colors hover:text-accent"
                  >
                    {social.text}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-10 font-mono text-[0.6875rem] text-fg-dim">
              <span className="text-accent">#</span> currently in Lhokseumawe,
              Indonesia (UTC+7)
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <TerminalWindow title="compose — new message" right="emailjs">
              <div aria-live="polite" className="sr-only">
                {state === 'sent'
                  ? 'Message sent.'
                  : state === 'error'
                    ? 'Message failed to send.'
                    : ''}
              </div>

              {state === 'sent' ? (
                <div className="py-6">
                  <p className="font-mono text-sm text-accent">$ message sent</p>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-fg-muted">
                    Thanks for reaching out. I&apos;ll get back to you within a
                    day or two.
                  </p>
                  <button
                    type="button"
                    onClick={() => setState('idle')}
                    className="mt-6 font-mono text-[0.6875rem] text-fg-dim underline decoration-line underline-offset-4 transition-colors hover:text-fg"
                  >
                    send another message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                  <label className="block">
                    <span className="font-mono text-[0.6875rem] text-fg-dim">
                      from:
                    </span>
                    <input
                      type="text"
                      name="from_name"
                      required
                      autoComplete="name"
                      placeholder="your name"
                      disabled={state === 'sending'}
                      className={fieldClass}
                    />
                  </label>

                  <label className="block">
                    <span className="font-mono text-[0.6875rem] text-fg-dim">
                      email:
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
                    <span className="font-mono text-[0.6875rem] text-fg-dim">
                      message:
                    </span>
                    <textarea
                      name="message"
                      required
                      rows="5"
                      placeholder="what's on your mind?"
                      disabled={state === 'sending'}
                      className={`${fieldClass} resize-none`}
                    />
                  </label>

                  {state === 'error' ? (
                    <p className="font-mono text-[0.6875rem] text-red">
                      $ error: message not sent. Try again or email me directly.
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={state === 'sending'}
                    className="w-full bg-accent px-4 py-3 font-mono text-xs font-semibold text-bg-0 transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {state === 'sending' ? 'sending...' : '[ send message ]'}
                  </button>
                </form>
              )}
            </TerminalWindow>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
