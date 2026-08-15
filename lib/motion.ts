export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const progressSpring = {
  stiffness: 140,
  damping: 32,
  mass: 0.22,
  restDelta: 0.001,
} as const

export function whenMotion<T, S = false>(
  reduce: boolean | null,
  animated: T,
  staticValue: S = false as S,
): T | S {
  // Treat unknown (SSR / first paint) as motion so server HTML matches the client.
  return reduce === true ? staticValue : animated
}
