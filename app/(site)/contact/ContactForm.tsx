'use client'

import { useActionState, useState } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { contactLimits, contactTopics } from '@/lib/contact'
import { sendContactMessage, type ContactFormState } from './actions'

const initialState: ContactFormState = { status: 'idle' }

const fieldClass =
  'w-full border-0 border-b border-line-strong bg-transparent px-0 py-3 text-lead outline-none transition-colors placeholder:text-muted/60 hover:border-ink/50 focus:border-ink aria-[invalid=true]:border-[#b42318]'

export default function ContactForm() {
  // Remounting the inner form resets its action state for "send another message".
  const [formKey, setFormKey] = useState(0)
  return <ContactFormInner key={formKey} onReset={() => setFormKey((key) => key + 1)} />
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState)

  if (state.status === 'success') {
    return (
      <div className="border-t border-ink pt-8" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-paper">
          <Check className="h-5 w-5" strokeWidth={2} />
        </span>
        <h2 className="mt-6 text-heading font-medium">Message sent.</h2>
        <p className="mt-2 max-w-[40ch] text-small text-muted">Thanks for writing — we typically reply within 24–48 hours.</p>
        <button type="button" onClick={onReset} className="btn mt-8">
          Send another message
        </button>
      </div>
    )
  }

  const errors = state.fieldErrors ?? {}
  const topic = state.values?.topic ?? contactTopics[0]

  return (
    <form action={formAction} noValidate className="relative space-y-10 border-t border-ink pt-8">
      <fieldset>
        <legend className="label mb-4 text-muted">What&apos;s it about?</legend>
        <div className="flex flex-wrap gap-2">
          {contactTopics.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="topic" value={t} defaultChecked={t === topic} className="peer sr-only" />
              <span className="inline-flex min-h-[2.5rem] items-center rounded-full border border-line-strong px-4 text-small transition-colors hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-10 sm:grid-cols-2 sm:gap-6">
        <Field label="Name" id="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={contactLimits.name}
            defaultValue={state.values?.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClass}
          />
        </Field>
        <Field label="Email" id="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={contactLimits.email}
            defaultValue={state.values?.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field label="Message" id="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          minLength={contactLimits.messageMin}
          maxLength={contactLimits.messageMax}
          defaultValue={state.values?.message}
          placeholder="A few lines about what you're making, and when."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${fieldClass} min-h-[9rem] resize-y`}
        />
      </Field>

      {/* Honeypot for bots; hidden from people and assistive tech */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' && state.message && (
        <p role="alert" className="border-l-2 border-[#b42318] pl-4 text-small text-[#b42318]">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={isPending} className="btn btn-solid group !min-h-[3.25rem] !px-7 disabled:cursor-wait disabled:opacity-70">
        {isPending ? 'Sending…' : 'Send message'}
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="nudge-x h-4 w-4" strokeWidth={1.75} />}
      </button>
    </form>
  )
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label block text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-small text-[#b42318]">
          {error}
        </p>
      )}
    </div>
  )
}
