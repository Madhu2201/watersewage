import { useEffect, useState } from "react";
import { NAV } from "../data";
import "./Navbar.css";

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);
      let cur = "home";
      NAV.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4)
          cur = id;
      });
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={solid ? "solid" : ""}>
      <div className="wrap">
        <nav aria-label="Main">
          <a className="logo" href="#home" aria-label="Neerva Waterworks home">
            <svg width="30" height="34" viewBox="0 0 30 34" aria-hidden="true">
              <path
                d="M15 1C15 1 3 15 3 22a12 12 0 0 0 24 0C27 15 15 1 15 1Z"
                fill="#2ec4b6"
              />
              <path
                d="M8 23c3-3 5 3 7 0s4 3 7 0"
                stroke="#041f27"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            Neerva
          </a>
          <button
            className={`burger ${open ? "open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
          <ul className={`menu ${open ? "open" : ""}`}>
            {NAV.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={active === id ? "on" : ""}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
