/**
 * Tło Hero – gradient orbs (rozmyte kule), widoczne na jasnym tle.
 * Animacja CSS keyframes; przy prefers-reduced-motion orby są statyczne.
 */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Warstwa bazowa – jasne tło */}
      <div className="absolute inset-0 bg-[var(--color-bg)]" />
      {/* Siatka – wyraźna na jasnym */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.12) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.12) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
      {/* Orby – żywe kolory, dobrze widoczne na jasnym */}
      <div
        className="hero-orb absolute w-[min(85vw,620px)] h-[min(85vw,620px)] rounded-full blur-[90px] -left-[25%] top-[5%]"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.55) 0%, rgba(59,130,246,0.15) 45%, transparent 70%)',
          opacity: 0.9,
        }}
      />
      <div
        className="hero-orb hero-orb-2 absolute w-[min(65vw,420px)] h-[min(65vw,420px)] rounded-full blur-[75px] right-[-15%] top-[35%]"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0.12) 45%, transparent 70%)',
          opacity: 0.85,
        }}
      />
      <div
        className="hero-orb hero-orb-3 absolute w-[min(55vw,380px)] h-[min(55vw,380px)] rounded-full blur-[85px] left-[25%] -bottom-[10%]"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.48) 0%, rgba(99,102,241,0.1) 45%, transparent 70%)',
          opacity: 0.8,
        }}
      />
      <div
        className="hero-orb hero-orb-4 absolute w-[min(45vw,300px)] h-[min(45vw,300px)] rounded-full blur-[65px] right-[15%] top-[0%]"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 60%)',
          opacity: 0.75,
        }}
      />
      {/* Maska u dołu – płynne zejście do tła strony */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)]" />
    </div>
  )
}
