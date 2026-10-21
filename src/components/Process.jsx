import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { STEPS } from "../data";
import "./Process.css";

const readRgb = (color) =>
  color.startsWith("#")
    ? color.match(/[\da-f]{2}/gi).map((part) => parseInt(part, 16))
    : color
        .match(/[\d.]+/g)
        .slice(0, 3)
        .map(Number);

const blendColor = (from, to, amount) => {
  const start = readRgb(from);
  const end = readRgb(to);
  return `rgb(${start.map((value, index) => Math.round(value + (end[index] - value) * amount)).join(", ")})`;
};

export default function Process() {
  const refs = useRef([]);
  const [current, setCurrent] = useState(0);
  const initialTank = { level: 20, color: STEPS[0].color };
  const [tank, setTank] = useState(initialTank);
  const tankRef = useRef(initialTank);

  // The tank level and colour follow the stage currently on screen.
  useEffect(() => {
    const onScroll = () => {
      let pick = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.55)
          pick = i;
      });
      setCurrent(pick);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const start = tankRef.current;
    const target = {
      level: ((current + 1) / STEPS.length) * 100,
      color: STEPS[current].color,
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tankRef.current = target;
      setTank(target);
      return undefined;
    }
    const startedAt = performance.now();
    const duration = 1100;
    let frame;

    const animateTank = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = {
        level: start.level + (target.level - start.level) * eased,
        color: blendColor(start.color, target.color, eased),
      };
      tankRef.current = next;
      setTank(next);
      if (progress < 1) frame = requestAnimationFrame(animateTank);
    };

    frame = requestAnimationFrame(animateTank);
    return () => cancelAnimationFrame(frame);
  }, [current]);

  return (
    <section id="process">
      <div className="wrap">
        <Reveal as="h2">From murky to clear, in five stages</Reveal>
        <Reveal as="p" style={{ color: "var(--muted)" }}>
          Scroll down to watch the tank rise and the water change through each
          treatment stage.
        </Reveal>
        <div className="proc">
          <div className="pipe">
            <div className="rail" aria-hidden="true">
              <div
                className="fill"
                style={{
                  color: tank.color,
                  height: `${tank.level}%`,
                }}
              >
                <svg
                  className="tank-water-body"
                  viewBox="0 0 400 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 4 C25 -1 50 -1 75 4 S125 9 150 4 S200 -1 225 4 S275 9 300 4 S350 -1 375 4 S425 9 450 4 L450 100 L0 100Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="tank-current current-one" />
                <span className="tank-current current-two" />
                <span className="tank-bubble bubble-one" />
                <span className="tank-bubble bubble-two" />
                <span className="tank-bubble bubble-three" />
                <span className="tank-bubble bubble-four" />
                <span className="tank-bubble bubble-five" />
              </div>
            </div>
            <div className="tank-caption" aria-live="polite">
              <small>
                Treatment stage {current + 1} / {STEPS.length}
              </small>
              <strong>{STEPS[current].title}</strong>
            </div>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div key={s.title} ref={(el) => (refs.current[i] = el)}>
                <Reveal className="step" style={{ "--c": s.color }}>
                  <small>Stage {i + 1}</small>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
