import { locations } from "../constants/index.js";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import usewindowStore from "../store/window.js";
import UseLocationStore from "../store/location.js";

const projects = locations.work?.children ?? [];

function Home() {
  const { setactiveLocation } = UseLocationStore();
  const { openWindow } = usewindowStore();

  const handleOpnePronjectFinder = (project) => {
    setactiveLocation(project);
    openWindow("finder");
  };

  useGSAP(() => {
    Draggable.create(".folder");
  }, []);

  return (
    <>
      <section id="home">
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              className={clsx("group folder", project.windowPosition)}
              onClick={() => handleOpnePronjectFinder(project)}
            >
              <img src="/images/folder.png" alt={project.name} />
              <p>{project.name}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}



export default Home;
