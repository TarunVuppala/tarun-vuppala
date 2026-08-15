"use client"

import { useEffect, useState } from "react"

export default function LocalClock() {
  const [now, setNow] = useState<string>("")

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date())

    setNow(format())
    const id = window.setInterval(() => setNow(format()), 1000)
    return () => window.clearInterval(id)
  }, [])

  if (!now) {
    return <span className="font-mono text-xs tracking-wider text-stone-600 dark:text-stone-400">IST —</span>
  }

  return (
    <span className="font-mono text-xs tracking-wider text-stone-600 dark:text-stone-400">
      IST {now}
    </span>
  )
}
