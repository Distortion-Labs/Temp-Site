import { useSyncExternalStore } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeToReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

/** Tracks the user's reduced-motion preference. Always `false` on the server and during hydration. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  )
}

export const subscribeNoop = () => () => {}

/** `true` once rendering on the client; `false` on the server and during hydration. */
export function useIsClient() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false)
}
