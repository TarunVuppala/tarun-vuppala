"use client"

import { motion } from "framer-motion"
import ContentContainer from "@/components/layout/container"

export default function WorkInterludeSection() {
  return (
    <section className="relative overflow-hidden pb-1 pt-0 sm:pb-2">
      <ContentContainer>
        <motion.div
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-stone-950/10 pt-4 dark:border-white/10"
        >
          <div className="max-w-3xl">
            <p className="section-kicker">Selected work</p>
            <p className="mt-3 text-lg text-stone-700/84 dark:text-stone-300/76 sm:text-[1.15rem]">
              AI/ML, backend, and product work.
            </p>
          </div>
        </motion.div>
      </ContentContainer>
    </section>
  )
}
