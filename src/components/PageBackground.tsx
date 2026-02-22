/**
 * Delikatna orb w rogu – tło spójne z Hero na podstronach (O mnie, Projekty, Pobieralnia, Zabawki).
 */
export default function PageBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
      aria-hidden
    >
      <div
        className="absolute w-[min(60vw,400px)] h-[min(60vw,400px)] rounded-full blur-[80px] opacity-25 -right-[10%] -top-[5%]"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
