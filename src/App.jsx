
import About from './components/About'
import Contact from './components/Contact'
import Hero from './components/Home'
import Navbar from './components/Navbar'
import Process from './components/Process'
import Services from './components/service'
import Sustainability from './components/sustainability'

function App() {

  return (
    <>
     <Navbar />
     <main>
      <Hero/>
      <About/>
      <Services/>
      <Process/>
      <Sustainability/>
      <Contact/>
     </main>
     <footer>© 2026 Neerva Waterworks. Clean water, returned.</footer>
    </>
  )
}

export default App
