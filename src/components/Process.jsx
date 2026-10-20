import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { STEPS } from '../data'

export default function Process() {
  const refs = useRef([])
  const [current, setCurrent] = useState(0)

  // the water column takes the colour of whichever stage is on screen
  useEffect(() => {
    const onScroll = () => {
      let pick = 0
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.55) pick = i
      })
      setCurrent(pick)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="process">
      <div className="wrap">
        <Reveal as="h2">From murky to clear, in five stages</Reveal>
        <Reveal as="p" style={{ color: 'var(--muted)' }}>Scroll down and watch the water on the left change as it moves through each stage.</Reveal>
        <div className="proc">
          <div className="pipe">
            <div className="rail" aria-hidden="true">
              <div className="fill" style={{ background: STEPS[current].color }} />
            </div>
            <span className="tag">{STEPS[current].tag}</span>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div key={s.title} ref={(el) => (refs.current[i] = el)}>
                <Reveal className="step" style={{ '--c': s.color }}>
                  <small>Stage {i + 1}</small>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
