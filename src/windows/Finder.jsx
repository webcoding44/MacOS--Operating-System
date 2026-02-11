import { Search } from "lucide-react";
import WindowsControl from "../components/WindowsControl.jsx";
import WindowWrapper from "../hoc/windowWrapper.jsx";
import UseLocationStore from "../store/location.js";
import clsx from "clsx";
import { locations } from "../constants/index.js";
import usewindowStore from "../store/window.js";

function Finder() {
  const { activeLocation, setactiveLocation } = UseLocationStore();
  const { openWindow } = usewindowStore();

  const openitem = (item) => {
    if (item.fileType == "pdf") return openWindow("resume");
    if (item.kind == "folder") return setactiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  // حالا renderList فقط یک لیست عمودی ساده است
  const renderList = (items, name) => (
    <div className="mb-4">
      <h3 className="text-xs uppercase text-gray-500 font-medium tracking-wider mb-1">
        {name}
      </h3>
      <div className="flex flex-col gap-1">
        {" "}
        {/* مهم: flex-col یعنی زیر هم */}
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setactiveLocation(item)}
            className={clsx(
              "flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer text-sm",
              item.id === activeLocation?.id
                ? "bg-blue-100 text-blue-800"
                : "hover:bg-gray-100"
            )}
          >
            <img src={item.icon} className="w-4 h-4" alt={item.name} />
            <span className="truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div id="window-header">
        <WindowsControl target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-gray-500 flex h-full">
        <div className="sidebar w-64 p-3 bg-white border-r overflow-y-auto">
          {renderList(Object.values(locations), "Favorites")}
          {renderList(locations.work.children, "My Projects")}
        </div>

        <ul className="content grid grid-cols-5 gap-6 p-6">
          {activeLocation?.children?.map((item) => (
            <li
              key={item.id}
              onClick={() => openitem(item)}
              className={item.position}
            >
              <img src={item.icon} alt={item.name} className="size-16" />
              <p className="text-sm text-center font-medium w-40 truncate">
                {item.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
