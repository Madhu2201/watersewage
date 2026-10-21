import PropTypes from "prop-types";
import { useRef, useState } from "react";
import Reveal from "./Reveal";
import { useInView, useCountUp } from "../hooks";
import { STATS } from "../data";
import "./About.css";

function Stat({ n, label, active }) {
  const v = useCountUp(n, active);
  const [ripple, setRipple] = useState(null);
  const rippleId = useRef(0);

  const tiltCard = (event) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 8}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 8}deg`);
    event.currentTarget.style.setProperty("--glow-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--glow-y", `${y * 100}%`);
  };

  const resetTilt = (event) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  const makeRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    rippleId.current += 1;
    setRipple({
      id: rippleId.current,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <div className="stat-float">
      <div
        className="stat"
        onPointerMove={tiltCard}
        onPointerLeave={resetTilt}
        onClick={makeRipple}
      >
        <b>
          <span className="stat-number">{v}</span>
        </b>
        <span>{label}</span>
        {ripple && (
          <i
            key={ripple.id}
            className="stat-ripple"
            style={{ left: ripple.x, top: ripple.y }}
            onAnimationEnd={() => setRipple(null)}
          />
        )}
      </div>
    </div>
  );
}

Stat.propTypes = {
  n: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default function About() {
  const [ref, seen] = useInView();
  return (
    <section id="about" className="about-section">
      <div className="wrap about">
        <Reveal className="about-copy">
          <span className="about-eyebrow">About Neerva</span>
          <h2>
            We treat the water <em>no one wants to think about.</em>
          </h2>
          <p>
            Neerva started with a simple question: why does clean water go in
            and dirty water just disappear? Since 2009 our engineers have built
            treatment plants that make the second half of that journey safe.
          </p>
          <p>
            From a 50-home apartment complex to a 100-million-litre municipal
            plant, we handle design, construction and day-to-day operation, so
            you get one team accountable for the whole result.
          </p>
          <a
            className="btn"
            href="#services"
            style={{ marginTop: 8, color: "var(--deeper)" }}
          >
            Explore our services
          </a>
        </Reveal>
        <div
          className={`stats ${seen ? "in" : ""}`}
          ref={ref}
          aria-label="Neerva impact statistics"
        >
          {STATS.map((s) => (
            <Stat key={s.label} {...s} active={seen} />
          ))}
        </div>
      </div>
    </section>
  );
}
