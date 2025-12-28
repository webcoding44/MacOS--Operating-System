import {techStack} from '../constants/index.js'
import usewindowStore from '../store/window.js';
import WindowsControl from '../components/WindowsControl.jsx';
import { Check, Flag } from 'lucide-react';
import WindowWrapper from '../hoc/windowWrapper.jsx';


function Terminal() {
  const { windows } = usewindowStore();

  if (!windows.terminal?.isOpen) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 max-w-xl relative">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <div className="flex items-center gap-45">
          <WindowsControl target="terminal" />
          <h2 className="text-xl font-semibold text-gray-700">Tech Stack</h2>
        </div>
      </div>

      {/* Command Line */}
      <div className="mb-4">
        <p className="font-mono text-sm text-gray-800">
          <span className="font-bold text-green-600">@Safiurahman %</span> show tech stack
        </p>
      </div>

      {/* Table Header */}
      <div className="flex justify-center items-center mb-3 pb-2 border-b border-dashed">
        <p className="font-medium text-gray-600 w-1/3">Category</p>
        <p className="font-medium text-gray-600 w-3/4">Technologies</p>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {techStack.map(({ category, items }, index) => (
          <div key={category} className={`flex items-start gap-4 py-2 ${index < techStack.length - 1 ? 'border-b border-dashed' : ''}`}>
            {/* Check Icon */}
            <Check size={20} className="text-green-500 flex-shrink-0 mt-1" />

            {/* Category */}
            <p className="font-semibold text-green-500 w-1/4">{category}</p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 w-3/4">
              {items.map((item, i) => (
                <span key={item} className="text-gray-800">
                  {item}{i < items.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-dashed text-sm text-gray-500 space-y-2">
        <div className="flex items-center gap-2">
          <Check size={20} className="text-green-500" />
          <span>5 of 5 stacks loaded successfully (100%)</span>
        </div>
        <div className="flex items-center gap-2">
          <Flag size={20} fill="black" />
          <span>Render time: 6ms</span>
        </div>
      </div>
    </div>
  );
}

const TerminalWindow = WindowWrapper(Terminal , "terminal")

export default TerminalWindow;

