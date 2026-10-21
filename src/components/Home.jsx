import treatmentPlantImage from '../assets/image/image.png'
import './Home.css'

export default function Home() {
  return (
    <section id="home">
      <div className="wrap hero-layout">
        <div className="hero-photo">
          <img
            src={treatmentPlantImage}
            alt="Aerial view of circular wastewater treatment clarifiers surrounded by green grounds"
            fetchPriority="high"
          />
          <div className="water-dots" aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => <i key={i} />)}
          </div>
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
