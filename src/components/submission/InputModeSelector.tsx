import { Mic, Video, FileText, Paperclip, Check } from "lucide-react";

type InputMode = 'voice' | 'video' | 'text' | 'file';

interface InputModeSelectorProps {
  selectedMode: InputMode;
  onModeChange: (mode: InputMode) => void;
}

const modes = [
  { id: 'voice' as InputMode, icon: Mic, label: 'Record Voice', sublabel: 'Max 5 minutes' },
  { id: 'video' as InputMode, icon: Video, label: 'Record Video', sublabel: 'Max 3 minutes' },
  { id: 'text' as InputMode, icon: FileText, label: 'Type Text', sublabel: 'Formatted or bullets' },
  { id: 'file' as InputMode, icon: Paperclip, label: 'Upload File', sublabel: 'PDF, PPT, DOC, images' },
];

const InputModeSelector = ({ selectedMode, onModeChange }: InputModeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isSelected = selectedMode === mode.id;
        
        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`
              relative bg-white rounded-xl p-6 transition-all duration-300 cursor-pointer
              ${isSelected 
                ? 'border-2 border-secondary-teal' 
                : 'border-2 border-gray-200 hover:border-secondary-teal hover:bg-secondary-teal/5'
              }
            `}
            style={{
              background: isSelected ? 'rgba(103, 159, 131, 0.1)' : 'white'
            }}
          >
            {/* Checkmark if selected */}
            {isSelected && (
              <div className="absolute top-3 right-3">
                <Check className="w-5 h-5 text-secondary-teal" />
              </div>
            )}

            {/* Icon */}
            <div className="flex justify-center mb-3">
              <Icon className="w-8 h-8 text-secondary-teal" />
            </div>

            {/* Label */}
            <p className="text-sm font-medium text-primary-dark text-center mb-1">
              {mode.label}
            </p>

            {/* Sublabel */}
            <p className="text-xs text-gray-500 text-center">
              {mode.sublabel}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default InputModeSelector;
