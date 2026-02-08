/**
 * Tło Hero – gradient orbs (rozmyte kule) w stylu Linear.
 * Animacja CSS keyframes; przy prefers-reduced-motion orby są statyczne.
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Warstwa bazowa */}
      <div className="absolute inset-0 bg-[var(--color-bg)]" />
      {/* Siatka – delikatna */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
        }}
      />
      {/* Orby – 4 bloby w kolorze akcentu + fiolet */}
      <div
        className="hero-orb absolute w-[min(80vw,600px)] h-[min(80vw,600px)] rounded-full opacity-40 blur-[100px] -left-[20%] top-[10%]"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)',
        }}
      />
      <div
        className="hero-orb hero-orb-2 absolute w-[min(60vw,400px)] h-[min(60vw,400px)] rounded-full opacity-30 blur-[80px] right-[-10%] top-[40%]"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)',
        }}
      />
      <div
        className="hero-orb hero-orb-3 absolute w-[min(50vw,350px)] h-[min(50vw,350px)] rounded-full opacity-25 blur-[90px] left-[30%] -bottom-[15%]"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.45) 0%, transparent 70%)',
        }}
      />
      <div
        className="hero-orb hero-orb-4 absolute w-[min(40vw,280px)] h-[min(40vw,280px)] rounded-full opacity-20 blur-[70px] right-[20%] top-[5%]"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)',
        }}
      />
      {/* Gradient maska u dołu */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)]" />
    </div>
  )
}
