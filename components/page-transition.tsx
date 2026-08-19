"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { PreLoader_006 } from "@/components/ui/skiper-ui/skiper15"

const COVER_EASE = [0.785, 0.135, 0.15, 0.86] as const
const COVER_MS = 700
const NAV_AT_MS = 380
const HOLD_MS = 1100

type PageTransitionContextValue = {
  isTransitioning: boolean
  transitionTo: (href: string) => void
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

function pathOf(href: string) {
  const path = href.split("#")[0]
  return path === "" ? "/" : path
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext)
  if (!context) {
    throw new Error("usePageTransition must be used within PageTransitionProvider")
  }
  return context
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [cycle, setCycle] = useState(0)
  const lockRef = useRef(false)

  const transitionTo = useCallback(
    (href: string) => {
      const nextPath = pathOf(href)

      if (nextPath === pathname) {
        if (href.includes("#")) {
          const hash = href.split("#")[1]
          const element = hash ? document.getElementById(hash) : null
          element?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
        }
        return
      }

      if (reduceMotion) {
        router.push(href)
        return
      }

      if (lockRef.current) return
      lockRef.current = true
      setCycle((current) => current + 1)
      setVisible(true)

      window.setTimeout(() => {
        router.push(href)
      }, NAV_AT_MS)

      window.setTimeout(() => {
        setVisible(false)
        lockRef.current = false
      }, HOLD_MS)
    },
    [pathname, reduceMotion, router],
  )

  useEffect(() => {
    if (!visible) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [visible])

  const value = useMemo(
    () => ({
      isTransitioning: visible,
      transitionTo,
    }),
    [transitionTo, visible],
  )

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {visible ? (
          <motion.div
            key={cycle}
            className="fixed inset-0 z-[75] overflow-hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: COVER_MS / 1000, ease: COVER_EASE }}
          >
            <PreLoader_006 duration={HOLD_MS - 160} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  )
}
