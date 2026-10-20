import { useMemo } from 'react'

export default function Home() {
  // random bubbles, generated once
  const bubbles = useMemo(() => Array.from({ length: 14 }, () => {
    const size = 8 + Math.random() * 34
    return { left: `${Math.random() * 100}%`, width: size, height: size,
      animationDuration: `${9 + Math.random() * 12}s`, animationDelay: `-${Math.random() * 15}s` }
  }), [])

  return (
    <section id="home">
      <div className="bubbles" aria-hidden="true">
        {bubbles.map((s, i) => <i key={i} style={s} />)}
      </div>
      <div className="wrap">
        <div className="hero-in">
          <h1>
            <span><i>Every drop,</i></span>
            <span><i>given a</i></span>
            <span><i>second life.</i></span>
          </h1>
          <p>Neerva designs, builds and runs sewage and wastewater treatment plants for cities, factories and housing communities. We turn what you discard into water that’s safe to return to nature.</p>
          <div className="hero-cta">
            <a className="btn" href="#contact">Get a free site assessment</a>
            <a className="btn ghost" href="#process">See how we clean water</a>
          </div>
        </div>
      </div>
      <div className="waves" aria-hidden="true">
        <svg viewBox="0 0 1200 170" preserveAspectRatio="none"><path d="M0 80Q150 30 300 80T600 80T900 80T1200 80V170H0Z" fill="#2ec4b6" /></svg>
        <svg viewBox="0 0 1200 170" preserveAspectRatio="none"><path d="M0 100Q150 60 300 100T600 100T900 100T1200 100V170H0Z" fill="var(--bg)" /></svg>
      </div>
    </section>
  )
}
