import WindowWrapper from "../hoc/windowWrapper.jsx";
import WindowsControl from "../components/WindowsControl.jsx";
import { gallery, photosLinks } from "../constants/index.js";
import usewindowStore from "../store/window.js";
import { Mail, Search } from "lucide-react";

function Photo() {
  const { openWindow } = usewindowStore();

  return (
    <>
      <div id="window-header">
        <WindowsControl target="photos" />

        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      <div className="flex w-full h-full">
        {/* Sidebar - فهرست عکس‌ها */}
        <div className="sidebar w-64 p-4 bg-white border-r overflow-y-auto">
          <h2 className="text-sm font-medium text-gray-500 mb-3">Photos</h2>
          <div className="flex flex-col gap-1">
            {" "}
            {/* مهم: flex-col → زیر هم */}
            {photosLinks.map(({ id, icon, title }) => (
              <div
                key={id}
                className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-100"
              >
                <img src={icon} alt={title} className="w-4 h-4" />
                <span className="text-sm truncate">{title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery - نمایش عکس‌ها */}
        <div className="gallery flex-1 p-4 bg-gray-50">
          <ul className="grid grid-cols-5 gap-4">
            {gallery.map(({ id, img }) => (
              <li
                key={id}
                onClick={() =>
                  openWindow("imgfile", {
                    id,
                    name: "Gallery image",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl: img,
                  })
                }
                className="cursor-pointer group"
              >
                <img
                  src={img}
                  alt={`Gallery image ${id}`}
                  className="w-full h-32 object-cover rounded-md shadow-sm group-hover:shadow-lg transition-shadow"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

const PhotoPortfolio = WindowWrapper(Photo, "photos");

export default PhotoPortfolio;
