import usewindowStore from '../store/window.js';

function WindowsControl({ target }) {
  const { closeWindow } = usewindowStore();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => closeWindow(target)}
        className="size-3.5 rounded-full bg-[#ff6157] cursor-pointer hover:bg-red-500 transition-colors"
        aria-label="Close"
      />
      <button
        className="size-3.5 rounded-full bg-[#ffc030] cursor-pointer hover:bg-yellow-500 transition-colors"
        aria-label="Minimize"
      />
      <button
        className="size-3.5 rounded-full bg-[#2acb42] cursor-pointer hover:bg-green-500 transition-colors"
        aria-label="Maximize"
      />
    </div>
  );
}

export default WindowsControl;