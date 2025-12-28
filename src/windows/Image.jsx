import usewindowStore from "../store/window.js";
import WindowWrapper from "../hoc/windowWrapper.jsx";
import WindowsControl from "../components/WindowsControl.jsx";


function Image() {
  const { windows } = usewindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowsControl target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-5 bg-white">
        {imageUrl ? (
          <div className="w-full">
            <img src={imageUrl} alt={name} className="w-full h-auto max-h-[70vh] object-contain rounded" />
          </div>
        ) : null}
      </div>
    </>
  );
}

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;
