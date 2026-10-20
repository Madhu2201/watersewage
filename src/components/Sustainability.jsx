import Reveal from './Reveal'
import { useInView } from '../hooks'
import { RINGS } from '../data'

export default function Sustainability() {
  const [ref, seen] = useInView()
  return (
    <section id="sustainability">
      <div className="wrap sus">
        <Reveal>
          <h2>Clean water is only the start.</h2>
          <p>A treatment plant should leave a place better than it found it. We design every Neerva plant to use less energy, recover more resources and give water back to the neighbourhood it came from.</p>
          <p>Sludge becomes compost and biogas. Treated water irrigates parks and cools buildings. Rooftop solar powers the pumps.</p>
        </Reveal>
        <div className={`rings reveal ${seen ? 'in' : ''}`} ref={ref}>
          {RINGS.map((r) => (
            <div className={`ring ${seen ? 'in' : ''}`} style={{ '--p': r.p }} key={r.text}>
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle className="t" cx="50" cy="50" r="42" />
                <circle className="v" cx="50" cy="50" r="42" />
              </svg>
              <div><b>{r.p}%</b><span>{r.text}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
