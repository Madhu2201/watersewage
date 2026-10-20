import Reveal from './Reveal'
import { SERVICES } from '../data'
import './Service.css'

export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <Reveal as="h2">What we build and run</Reveal>
        <Reveal as="p" className="lead">Four services that cover a plant’s whole life, from first survey to years of steady operation.</Reveal>
        <div className="svc">
          {SERVICES.map((s, i) => (
            <Reveal as="article" className="card" delay={i * 80} key={s.title}>
              <svg viewBox="0 0 48 48" aria-hidden="true">{s.icon}</svg>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
