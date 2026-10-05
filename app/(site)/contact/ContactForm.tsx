'use client'

import { useActionState, useState } from 'react'
import { CheckCircle, Loader2, Send } from 'lucide-react'
import { contactLimits } from '@/lib/contact'
import { sendContactMessage, type ContactFormState } from './actions'

const initialState: ContactFormState = { status: 'idle' }

const inputClass =
  'w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm sm:text-base text-white placeholder:text-white/25 outline-none transition-colors duration-200 hover:border-white/15 focus:border-primary-400/60 focus:bg-white/[0.06] aria-[invalid=true]:border-rose-400/60'

export default function ContactForm() {
  // Remounting the inner form resets its action state for "send another message".
  const [formKey, setFormKey] = useState(0)
  return <ContactFormInner key={formKey} onReset={() => setFormKey((key) => key + 1)} />
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction, isPending] = useActionState(sendContactMessage, initialState)

  if (state.status === 'success') {
    return (
      <div className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center" role="status">
        <div className="inline-flex items-center justify-center w-14 h-14 mb-5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600">
          <CheckCircle className="w-7 h-7 text-white" />
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">Message sent</h2>
        <p className="text-sm sm:text-base text-white/50 mb-6">
          Thanks for reaching out — we typically respond within 24-48 hours.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="btn-glass px-5 py-2.5 text-sm font-medium text-white/80 rounded-xl"
        >
          Send another message
        </button>
      </div>
    )
  }

  const errors = state.fieldErrors ?? {}

  return (
    <form action={formAction} noValidate className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-5">
      <div>
        <h2 className="font-display text-lg sm:text-xl font-semibold text-white mb-1">Send us a message</h2>
        <p className="text-sm text-white/40">All fields are required.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" id="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={contactLimits.name}
            defaultValue={state.values?.name}
            placeholder="Ada Lovelace"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputClass}
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
            placeholder="you@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Message" id="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={contactLimits.messageMin}
          maxLength={contactLimits.messageMax}
          defaultValue={state.values?.message}
          placeholder="Tell us about your idea, project or question…"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${inputClass} resize-y min-h-[140px]`}
        />
      </Field>

      {/* Honeypot for bots; hidden from people and assistive tech */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' && state.message && (
        <p role="alert" className="text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-primary px-6 sm:px-8 py-3.5 text-sm sm:text-base font-medium text-white rounded-xl disabled:opacity-70 disabled:cursor-wait"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 relative z-10 animate-spin" />
        ) : (
          <Send className="w-4 h-4 relative z-10" />
        )}
        <span className="relative z-10">{isPending ? 'Sending…' : 'Send message'}</span>
      </button>
    </form>
  )
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string
  id: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white/70 mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs sm:text-sm text-rose-300">
          {error}
        </p>
      )}
    </div>
  )
}
