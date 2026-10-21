import treatmentPlantImage from '../assets/image/image.png'
import './Home.css'

export default function Home() {
  const trackRipple = (event) => {
    if (event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--ripple-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    event.currentTarget.style.setProperty('--ripple-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <section id="home">
      <div className="wrap hero-layout">
        <div className="hero-photo" onPointerMove={trackRipple}>
          <img
            src={treatmentPlantImage}
            alt="Aerial view of circular wastewater treatment clarifiers surrounded by green grounds"
            fetchPriority="high"
          />
          <div className="hero-ripple" aria-hidden="true" />
          <div className="hero-in">
            <span className="eyebrow">Engineering a cleaner tomorrow</span>
            <h1>Wastewater is not the end. <em>It’s a new beginning.</em></h1>
            <p>Intelligent water treatment for a more sustainable world.</p>
            <div className="hero-cta">
              <a className="btn" href="#process">Explore our process <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
