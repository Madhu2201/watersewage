// import Reveal from './Reveal'
// import { useInView } from '../hooks'
// import { RINGS } from '../data'
// import './Sustainability.css'

// export default function Sustainability() {
//   const [ref, seen] = useInView()
//   return (
//     <section id="sustainability">
//       <div className="wrap sus">
//         <Reveal>
//           <h2>Clean water is only the start.</h2>
//           <p>A treatment plant should leave a place better than it found it. We design every Neerva plant to use less energy, recover more resources and give water back to the neighbourhood it came from.</p>
//           <p>Sludge becomes compost and biogas. Treated water irrigates parks and cools buildings. Rooftop solar powers the pumps.</p>
//         </Reveal>
//         <div className={`rings reveal ${seen ? 'in' : ''}`} ref={ref}>
//           {RINGS.map((r) => (
//             <div className={`ring ${seen ? 'in' : ''}`} style={{ '--p': r.p }} key={r.text}>
//               <svg viewBox="0 0 100 100" aria-hidden="true">
//                 <circle className="t" cx="50" cy="50" r="42" />
//                 <circle className="v" cx="50" cy="50" r="42" />
//               </svg>
//               <div><b>{r.p}%</b><span>{r.text}</span></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Reveal from './Reveal'
import { useInView } from '../hooks'
import { RINGS } from '../data'
import './Sustainability.css'

// One full sine period = 50 units. The path is 200 wide, so sliding it
// left by exactly 50 loops seamlessly.
const WAVE =
  'M0 6 Q12.5 0 25 6 T50 6 T75 6 T100 6 T125 6 T150 6 T175 6 T200 6 V120 H0 Z'

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Counts 0 -> target in sync with the water rising.
function useCountUp(target, active, delay = 0, duration = 2200) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    if (prefersReduced()) {
      setN(target)
      return
    }
    let raf
    let start
    const t = setTimeout(() => {
      const tick = (now) => {
        if (start === undefined) start = now
        const k = Math.min((now - start) / duration, 1)
        setN(Math.round(target * (1 - Math.pow(1 - k, 3)))) // ease-out
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
    }
  }, [active, target, delay, duration])
  return n
}

function Ring({ r, i, seen }) {
  const delay = i * 260
  const n = useCountUp(r.p, seen, delay)
  // circle spans y 6..94 (88 tall); wave midline sits at y=6 inside the group
  const ty = 0.88 * (100 - r.p) - (r.p >= 100 ? 3 : 0)

  return (
    <div
      className={`ring ${seen ? 'in' : ''}`}
      style={{ '--ty': `${ty}px`, '--d': `${delay}ms` }}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <clipPath id={`clip-${i}`}>
            <circle cx="50" cy="50" r="43" />
          </clipPath>
          <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8fd16f" />
            <stop offset="1" stopColor="#148779" />
          </linearGradient>
        </defs>
        <circle className="glass" cx="50" cy="50" r="43" />
        <g clipPath={`url(#clip-${i})`}>
          <g className="water">
            <path className="wave back" d={WAVE} />
            <path className="wave front" d={WAVE} fill={`url(#grad-${i})`} />
          </g>
        </g>
        <circle className="rim" cx="50" cy="50" r="46" />
        <path className="shine" d="M22 38 A31 31 0 0 1 38 21" />
      </svg>
      <div>
        <b>
          {n}
          <small>%</small>
        </b>
        <span>{r.text}</span>
      </div>
    </div>
  )
}

Ring.propTypes = {
  r: PropTypes.shape({
    p: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  i: PropTypes.number.isRequired,
  seen: PropTypes.bool.isRequired,
}

export default function Sustainability() {
  const [ref, seen] = useInView()
  return (
    <section id="sustainability">
      <div className="wrap sus">
        <Reveal>
          <h2>Clean water is only the start.</h2>
          <p>
            A treatment plant should leave a place better than it found it. We design every Neerva
            plant to use less energy, recover more resources and give water back to the
            neighbourhood it came from.
          </p>
          <p>
            Sludge becomes compost and biogas. Treated water irrigates parks and cools buildings.
            Rooftop solar powers the pumps.
          </p>
        </Reveal>
        <div className={`rings reveal ${seen ? 'in' : ''}`} ref={ref}>
          {RINGS.map((r, i) => (
            <Ring r={r} i={i} seen={seen} key={r.text} />
          ))}
        </div>
      </div>
    </section>
  )
}