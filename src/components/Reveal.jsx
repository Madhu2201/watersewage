import PropTypes from 'prop-types'
import { useInView } from '../hooks'
import './Reveal.css'

// Wrapper that fades its children in when scrolled into view
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, seen] = useInView()
  return (
    <Tag ref={ref} className={`reveal ${seen ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...rest.style }} {...rest}>
      {children}
    </Tag>
  )
}

Reveal.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  delay: PropTypes.number,
  children: PropTypes.node,
}
