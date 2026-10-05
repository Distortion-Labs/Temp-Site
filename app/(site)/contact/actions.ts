'use server'

import { contactLimits, contactTopics, getContactConfig } from '@/lib/contact'
import { siteConfig } from '@/lib/site'

type Field = 'name' | 'email' | 'message'

export interface ContactFormState {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Partial<Record<Field, string>>
  /** Submitted values, echoed back so the form keeps them after a failed submit. */
  values?: Record<Field | 'topic', string>
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function sendContactMessage(_previous: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const rawTopic = String(formData.get('topic') ?? '')
  const values = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
    // Only accept known topics so the subject line can't be used to inject text.
    topic: (contactTopics as readonly string[]).includes(rawTopic) ? rawTopic : contactTopics[0],
  }

  // Honeypot: real visitors never see or fill this field, so pretend success for bots.
  if (String(formData.get('company') ?? '') !== '') {
    return { status: 'success' }
  }

  const fieldErrors: ContactFormState['fieldErrors'] = {}
  if (!values.name) fieldErrors.name = 'Please tell us your name.'
  else if (values.name.length > contactLimits.name) fieldErrors.name = `Please keep your name under ${contactLimits.name} characters.`

  if (!EMAIL_PATTERN.test(values.email) || values.email.length > contactLimits.email) {
    fieldErrors.email = 'Please enter a valid email address.'
  }

  if (values.message.length < contactLimits.messageMin) {
    fieldErrors.message = `Please write at least ${contactLimits.messageMin} characters.`
  } else if (values.message.length > contactLimits.messageMax) {
    fieldErrors.message = `Please keep your message under ${contactLimits.messageMax} characters.`
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', message: 'Please fix the highlighted fields.', fieldErrors, values }
  }

  const config = getContactConfig()
  if (!config) {
    return {
      status: 'error',
      message: `The contact form isn't available right now. Please email us at ${siteConfig.email}.`,
      values,
    }
  }

  // Collapse whitespace so a crafted name can't inject extra lines into the subject.
  const subjectName = values.name.replace(/\s+/g, ' ')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: values.email,
        subject: `[${values.topic}] ${subjectName} via ${siteConfig.name}`,
        text: `Topic: ${values.topic}\nName: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
      }),
    })

    if (!response.ok) {
      console.error('Contact form: Resend responded with', response.status, await response.text())
      throw new Error(`Resend error ${response.status}`)
    }
  } catch (error) {
    console.error('Contact form: failed to send message', error)
    return {
      status: 'error',
      message: `Something went wrong sending your message. Please try again or email us at ${siteConfig.email}.`,
      values,
    }
  }

  return { status: 'success' }
}
