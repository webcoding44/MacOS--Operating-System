import { useRef } from "react";
import { dockApps } from "../constants/index.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Tooltip } from "react-tooltip";
import usewindowStore from "../store/window.js";

function Dock() {
  const { openWindow, closeWindow, windows } = usewindowStore();

  const dockref = useRef(null);

  useGSAP(() => {
    const dock = dockref.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const animate = (mousex) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mousex - center);

        const intensity = Math.exp(-(distance ** 2) / 2000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animate(e.clientX - left);
    };

    const resetIcons = () => {
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        });
      });
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const toggleApp = (app) => {
    if (!app.canOpen) return;

    const window = windows[app.id];

    if (window.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }
  };

  return (
    <>
      <section id="dock">
        <div ref={dockref} className="dock-container">
          {dockApps.map(({ id, name, icon, canOpen }) => (
            <div key={id} className="relative flex justify-center">
              <button
                type="button"
                className="dock-icon"
                aria-label={name}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-delay-show={150}
                disabled={!canOpen}
                onClick={() => toggleApp({ id, canOpen })}
              >
                <img
                  src={`/public/images/${icon}`}
                  alt={name}
                  loading="lazy"
                  className={canOpen ? "" : "opacity-95"}
                />
              </button>
            </div>
          ))}
          <Tooltip id="dock-tooltip" place="top" className="tooltip" />
        </div>
      </section>
    </>
  );
}

export default Dock;
