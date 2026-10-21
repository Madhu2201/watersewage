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
                  backgroundColor: tank.color,
                  height: `${tank.level}%`,
                }}
              >
                <svg
                  className="tank-water-wave wave-back"
                  viewBox="0 0 200 32"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 17 C25 3 50 3 75 17 S125 31 150 17 S175 3 200 17 L200 32 L0 32Z"
                    fill="rgba(225,255,250,.34)"
                  />
                </svg>
                <svg
                  className="tank-water-wave wave-front"
                  viewBox="0 0 200 32"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 14 C25 28 50 28 75 14 S125 0 150 14 S175 28 200 14 L200 32 L0 32Z"
                    fill="rgba(255,255,255,.32)"
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
