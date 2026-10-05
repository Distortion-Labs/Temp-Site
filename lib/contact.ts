import { siteConfig } from './site'

/**
 * Contact form delivery settings (server-only). The form is sent through Resend's HTTP API;
 * when RESEND_API_KEY or CONTACT_FROM_EMAIL is missing the contact page falls back to email links.
 */
export function getContactConfig() {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !from) return null

  return {
    apiKey,
    from,
    to: process.env.CONTACT_TO_EMAIL || siteConfig.email,
  }
}

export const contactLimits = {
  name: 100,
  email: 200,
  messageMin: 10,
  messageMax: 5000,
}
