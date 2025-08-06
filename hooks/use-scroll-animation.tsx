"use client"

import { useState, useEffect, useRef } from "react"

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollAnimation({
  threshold = 0.1,
  rootMargin = "0px",
  once = true,
}: UseScrollAnimationOptions = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && currentRef) {
            observer.unobserve(currentRef)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}
