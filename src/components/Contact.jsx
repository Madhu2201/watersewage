import { useState } from 'react'
import Reveal from './Reveal'

const rules = {
  name: (v) => v.trim().length > 1,
  email: (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),
  message: (v) => v.trim().length > 4,
}
const empty = { name: '', email: '', service: 'Industrial effluent', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    Object.keys(rules).forEach((k) => { if (!rules[k](form[k])) errs[k] = true })
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSent(true)
      setForm(empty)
      setTimeout(() => setSent(false), 6000)
    }
  }

  return (
    <section id="contact">
      <div className="wrap ct">
        <Reveal>
          <h2>Let’s plan your plant.</h2>
          <p>Tell us about your site and your discharge needs. An engineer will reply within one working day with next steps and a rough estimate.</p>
          <ul><li>hello@neerva.example</li><li>+91 98765 43210</li><li>14 Riverside Road, Coimbatore, Tamil Nadu</li></ul>
        </Reveal>
        <Reveal as="form" noValidate onSubmit={submit}>
          <div className={`f ${errors.name ? 'err' : ''}`}>
            <input id="n" placeholder=" " autoComplete="name" value={form.name} onChange={set('name')} />
            <label htmlFor="n">Your name</label><span className="m">Please enter your name.</span>
          </div>
          <div className={`f ${errors.email ? 'err' : ''}`}>
            <input id="e" type="email" placeholder=" " autoComplete="email" value={form.email} onChange={set('email')} />
            <label htmlFor="e">Email address</label><span className="m">Enter a valid email, like name@company.com.</span>
          </div>
          <div className="f">
            <select id="s" value={form.service} onChange={set('service')}>
              <option>Industrial effluent</option><option>Municipal sewage</option>
              <option>Water recycling</option><option>Operation and maintenance</option>
            </select>
            <label htmlFor="s">Service needed</label>
          </div>
          <div className={`f ${errors.message ? 'err' : ''}`}>
            <textarea id="t" placeholder=" " value={form.message} onChange={set('message')} />
            <label htmlFor="t">Tell us about your site</label><span className="m">Add a few words about your project.</span>
          </div>
          <button className="btn" type="submit">Send enquiry</button>
          {sent && <div className="ok" role="status" style={{ display: 'block' }}>Thank you. Your enquiry is sent and we’ll reply within one working day.</div>}
        </Reveal>
      </div>
    </section>
  )
}
