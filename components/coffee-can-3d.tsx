"use client"

import { useEffect, useRef } from "react"

export default function CoffeeCan3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let rotation = 0
    let isHovering = false
    let mouseX = 0

    const drawRoundRect = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      radii: number | number[],
    ) => {
      const r = Array.isArray(radii) ? radii : [radii, radii, radii, radii]
      ctx.beginPath()
      ctx.moveTo(x + r[0], y)
      ctx.lineTo(x + w - r[1], y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + r[1])
      ctx.lineTo(x + w, y + h - r[2])
      ctx.quadraticCurveTo(x + w, y + h, x + w - r[2], y + h)
      ctx.lineTo(x + r[3], y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - r[3])
      ctx.lineTo(x, y + r[0])
      ctx.quadraticCurveTo(x, y, x + r[0], y)
      ctx.closePath()
    }

    const drawCan = (rotation: number) => {
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2

      // Clear canvas with transparency
      ctx.clearRect(0, 0, width, height)

      ctx.save()

      // Draw shadow base - more pronounced
      ctx.translate(centerX, centerY)
      ctx.scale(1, 0.4)
      ctx.fillStyle = "rgba(0, 0, 0, 0.35)"
      ctx.beginPath()
      ctx.ellipse(0, 140, 95, 50, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      ctx.save()
      ctx.translate(centerX, centerY)

      ctx.translate(0, -60)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.translate(0, 60)

      // Draw can body with advanced gradients
      const bodyGradient = ctx.createLinearGradient(-70, -90, 70, -90)
      bodyGradient.addColorStop(0, "#8b3e00")
      bodyGradient.addColorStop(0.15, "#d97706")
      bodyGradient.addColorStop(0.5, "#ff9a3d")
      bodyGradient.addColorStop(0.85, "#d97706")
      bodyGradient.addColorStop(1, "#8b3e00")

      // Main can body with enhanced shadow
      ctx.fillStyle = bodyGradient
      ctx.shadowBlur = 45
      ctx.shadowColor = "rgba(255, 154, 61, 0.6)"
      ctx.shadowOffsetX = 5
      ctx.shadowOffsetY = 10
      if (typeof (ctx as any).roundRect === "function") {
        ;(ctx as any).roundRect(-70, -90, 140, 140, [18, 18, 10, 10])
        ctx.fill()
      } else {
        drawRoundRect(ctx, -70, -90, 140, 140, [18, 18, 10, 10])
        ctx.fill()
      }

      // Left side darker gradient for depth
      const leftShadow = ctx.createLinearGradient(-70, -90, -50, -90)
      leftShadow.addColorStop(0, "rgba(0, 0, 0, 0.2)")
      leftShadow.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = leftShadow
      if (typeof (ctx as any).roundRect === "function") {
        ;(ctx as any).roundRect(-70, -90, 25, 140, [18, 0, 0, 10])
        ctx.fill()
      } else {
        drawRoundRect(ctx, -70, -90, 25, 140, [18, 0, 0, 10])
        ctx.fill()
      }

      // Metallic shine - primary highlight
      const shine1 = ctx.createLinearGradient(-65, -85, -50, -85)
      shine1.addColorStop(0, "rgba(255, 255, 255, 0.25)")
      shine1.addColorStop(0.5, "rgba(255, 255, 255, 0.4)")
      shine1.addColorStop(1, "rgba(255, 255, 255, 0)")
      ctx.fillStyle = shine1
      if (typeof (ctx as any).roundRect === "function") {
        ;(ctx as any).roundRect(-65, -85, 35, 130, [15, 0, 0, 8])
        ctx.fill()
      } else {
        drawRoundRect(ctx, -65, -85, 35, 130, [15, 0, 0, 8])
        ctx.fill()
      }

      // Secondary subtle shine
      const shine2 = ctx.createLinearGradient(45, -85, 65, -85)
      shine2.addColorStop(0, "rgba(255, 255, 255, 0)")
      shine2.addColorStop(0.5, "rgba(255, 255, 255, 0.15)")
      shine2.addColorStop(1, "rgba(255, 255, 255, 0.05)")
      ctx.fillStyle = shine2
      if (typeof (ctx as any).roundRect === "function") {
        ;(ctx as any).roundRect(45, -85, 25, 130, [0, 15, 8, 0])
        ctx.fill()
      } else {
        drawRoundRect(ctx, 45, -85, 25, 130, [0, 15, 8, 0])
        ctx.fill()
      }

      // Can top cap - metallic aluminum
      ctx.shadowBlur = 0
      const capGradient = ctx.createLinearGradient(0, -92, 0, -78)
      capGradient.addColorStop(0, "#e5e7eb")
      capGradient.addColorStop(0.5, "#d1d5db")
      capGradient.addColorStop(1, "#9ca3af")
      ctx.fillStyle = capGradient
      ctx.beginPath()
      ctx.ellipse(0, -90, 68, 14, 0, 0, Math.PI * 2)
      ctx.fill()

      // Cap rim detail
      ctx.strokeStyle = "rgba(0, 0, 0, 0.3)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.ellipse(0, -90, 68, 14, 0, 0, Math.PI * 2)
      ctx.stroke()

      // Can top shine - very bright
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
      ctx.beginPath()
      ctx.ellipse(0, -92, 45, 7, 0, 0, Math.PI * 2)
      ctx.fill()

      // Label container - rich dark background
      ctx.fillStyle = "#0f0d0a"
      ctx.globalAlpha = 0.9
      if (typeof (ctx as any).roundRect === "function") {
        ;(ctx as any).roundRect(-62, -70, 124, 95, [12, 12, 6, 6])
        ctx.fill()
      } else {
        drawRoundRect(ctx, -62, -70, 124, 95, [12, 12, 6, 6])
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Label border - premium gold accent
      ctx.strokeStyle = "rgba(251, 191, 36, 0.6)"
      ctx.lineWidth = 2.5
      if (typeof (ctx as any).roundRect === "function") {
        ;(ctx as any).roundRect(-62, -70, 124, 95, [12, 12, 6, 6])
        ctx.stroke()
      } else {
        drawRoundRect(ctx, -62, -70, 124, 95, [12, 12, 6, 6])
        ctx.stroke()
      }

      // Label decorative lines
      ctx.strokeStyle = "rgba(251, 191, 36, 0.2)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(-62, -55)
      ctx.lineTo(62, -55)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(-62, 10)
      ctx.lineTo(62, 10)
      ctx.stroke()

      // Main branding text - "BC" Logo
      const logoGradient = ctx.createLinearGradient(-20, -45, 20, -45)
      logoGradient.addColorStop(0, "#fbbf24")
      logoGradient.addColorStop(1, "#ff9a3d")
      ctx.fillStyle = logoGradient
      ctx.font = "bold 48px Arial, sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.shadowBlur = 8
      ctx.shadowColor = "rgba(251, 191, 36, 0.5)"
      ctx.fillText("BC", 0, -40)
      ctx.shadowBlur = 0

      // Brand name
      ctx.font = "bold 18px Arial, sans-serif"
      ctx.fillStyle = "#ff9a3d"
      ctx.fillText("BrewCan", 0, -15)

      // Coffee type / Tagline
      ctx.font = "11px Arial, sans-serif"
      ctx.fillStyle = "#fcd34d"
      ctx.fillText("PREMIUM COLD BREW", 0, 0)

      // Specialty text
      ctx.font = "bold 10px Arial, sans-serif"
      ctx.fillStyle = "rgba(251, 191, 36, 0.8)"
      ctx.fillText("Single Origin • Freshly Roasted", 0, 12)

      // Coffee cup icon
      ctx.font = "40px Arial, sans-serif"
      ctx.fillStyle = "#ff9a3d"
      ctx.fillText("☕", 0, 30)

      ctx.restore()
    }

    let rafId = 0

    const animate = () => {
      if (!isHovering) {
        rotation = (rotation + 0.8) % 360
      }
      drawCan(rotation)
      rafId = requestAnimationFrame(animate)
    }

    const onMouseEnter = () => {
      isHovering = true
    }

    const onMouseMove = (e: MouseEvent) => {
      if (isHovering) {
        const rect = canvas.getBoundingClientRect()
        mouseX = (e as MouseEvent).clientX - rect.left
        const centerX = rect.width / 2
        rotation = ((mouseX - centerX) / rect.width) * 80
      }
    }

    const onMouseLeave = () => {
      isHovering = false
    }

    const onTouchStart = () => {
      isHovering = true
    }

    const onTouchMove = (e: TouchEvent) => {
      if (isHovering && e.touches[0]) {
        const rect = canvas.getBoundingClientRect()
        mouseX = e.touches[0].clientX - rect.left
        const centerX = rect.width / 2
        rotation = ((mouseX - centerX) / rect.width) * 80
      }
    }

    const onTouchEnd = () => {
      isHovering = false
    }

    canvas.addEventListener("mouseenter", onMouseEnter)
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mouseleave", onMouseLeave)
    canvas.addEventListener("touchstart", onTouchStart)
    canvas.addEventListener("touchmove", onTouchMove)
    canvas.addEventListener("touchend", onTouchEnd)

    animate()

    return () => {
      cancelAnimationFrame(rafId)
      canvas.removeEventListener("mouseenter", onMouseEnter)
      canvas.removeEventListener("mousemove", onMouseMove)
      canvas.removeEventListener("mouseleave", onMouseLeave)
      canvas.removeEventListener("touchstart", onTouchStart)
      canvas.removeEventListener("touchmove", onTouchMove)
      canvas.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <canvas
        ref={canvasRef}
        width={420}
        height={600}
        className="cursor-grab active:cursor-grabbing filter drop-shadow-2xl hover:drop-shadow-2xl transition-all duration-300"
      />
      <p className="text-sm text-muted-foreground animate-pulse text-center">
        <span className="block">Hover or tap to rotate</span>
        <span className="text-xs text-primary/60">Discover every angle of BrewCan</span>
      </p>
    </div>
  )
}
