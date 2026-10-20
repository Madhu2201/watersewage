import PropTypes from 'prop-types'
import Reveal from './Reveal'
import { useInView, useCountUp } from '../hooks'
import { STATS } from '../data'

function Stat({ n, label, active }) {
  const v = useCountUp(n, active)
  return <div className="stat"><b>{v}</b><span>{label}</span></div>
}

Stat.propTypes = {
  n: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
}

export default function About() {
  const [ref, seen] = useInView()
  return (
    <section id="about">
      <div className="wrap about">
        <Reveal>
          <h2>We treat the water no one wants to think about.</h2>
          <p>Neerva started with a simple question: why does clean water go in and dirty water just disappear? Since 2009 our engineers have built treatment plants that make the second half of that journey safe.</p>
          <p>From a 50-home apartment complex to a 100-million-litre municipal plant, we handle design, construction and day-to-day operation, so you get one team accountable for the whole result.</p>
          <a className="btn" href="#services" style={{ marginTop: 8, color: 'var(--deeper)' }}>Explore our services</a>
        </Reveal>
        <div className={`stats reveal ${seen ? 'in' : ''}`} ref={ref}>
          {STATS.map((s) => <Stat key={s.label} {...s} active={seen} />)}
        </div>
      </div>
    </section>
  )
}
