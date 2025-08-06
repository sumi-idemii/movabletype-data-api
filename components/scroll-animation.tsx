"use client"

import type React from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

type AnimationType = "fade-up" | "fade-left" | "fade-right" | "zoom-in"
type DelayType = "0" | "100" | "200" | "300" | "400" | "500"

interface ScrollAnimationProps {
  children: React.ReactNode
  type?: AnimationType
  delay?: DelayType
  threshold?: number
  rootMargin?: string
  className?: string
}

export default function ScrollAnimation({
  children,
  type = "fade-up",
  delay = "0",
  threshold = 0.1,
  rootMargin = "0px",
  className = "",
}: ScrollAnimationProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    rootMargin,
  })

  const getAnimationClass = () => {
    switch (type) {
      case "fade-up":
        return "scroll-fade-up"
      case "fade-left":
        return "scroll-fade-left"
      case "fade-right":
        return "scroll-fade-right"
      case "zoom-in":
        return "scroll-zoom-in"
      default:
        return "scroll-fade-up"
    }
  }

  const getDelayClass = () => {
    if (delay === "0") return ""
    return `transition-delay-${delay}`
  }

  return (
    <div
      // @ts-ignore - ref型の問題を回避
      ref={ref}
      className={`${getAnimationClass()} ${getDelayClass()} ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  )
}
