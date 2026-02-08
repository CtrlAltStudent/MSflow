import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 60
const CONNECT_DISTANCE = 120
const MOUSE_INFLUENCE = 0.03

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

/**
 * Tło z siecią cząsteczek (canvas 2D) – łączenie w pobliżu, lekkie przyciąganie do kursora.
 * Przy reduced-motion nie renderuje się; na mobile można wyłączyć (np. przez prop).
 */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (particlesRef.current.length === 0) {
        particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        }))
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      const w = canvas.width
      const h = canvas.height
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx.clearRect(0, 0, w, h)

      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        p.x = Math.max(0, Math.min(w, p.x))
        p.y = Math.max(0, Math.min(h, p.y))

        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.hypot(dx, dy)
        if (dist < 200 && dist > 0) {
          const f = (1 - dist / 200) * MOUSE_INFLUENCE
          p.vx += (dx / dist) * f
          p.vy += (dy / dist) * f
        }
        p.vx *= 0.99
        p.vy *= 0.99
      }

      /* Linie łączące – widoczne na jasnym tle */
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.28)'
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < CONNECT_DISTANCE) {
            ctx.globalAlpha = (1 - d / CONNECT_DISTANCE) * 0.9
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }
      ctx.fillStyle = 'rgba(37, 99, 235, 0.55)'
      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden />
}
