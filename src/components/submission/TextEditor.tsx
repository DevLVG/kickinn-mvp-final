import { useEffect, useState } from 'react';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor = ({ value, onChange }: TextEditorProps) => {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('idea-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end);
    
    onChange(newText);
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Formatting Toolbar */}
      <div className="flex gap-1 pb-3 border-b border-gray-200">
        <button
          onClick={() => insertFormatting('**', '**')}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Bold"
          type="button"
        >
          <Bold className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={() => insertFormatting('*', '*')}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Italic"
          type="button"
        >
          <Italic className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={() => insertFormatting('\n• ')}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Bullet List"
          type="button"
        >
          <List className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={() => insertFormatting('\n1. ')}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Numbered List"
          type="button"
        >
          <ListOrdered className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Textarea */}
      <textarea
        id="idea-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe the problem you're seeing... You can write freely or use bullet points. The AI will help structure your submission."
        className="w-full min-h-[350px] resize-y text-base leading-relaxed text-primary-dark bg-transparent border-none focus:outline-none"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      />

      {/* Character Counter */}
      <div className="flex justify-end">
        <span className="text-xs text-gray-500">
          {charCount} characters
        </span>
      </div>
    </div>
  );
};

export default TextEditor;
