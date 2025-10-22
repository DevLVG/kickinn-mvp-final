import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paperclip, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        toast({
          title: "File too large",
          description: "File size exceeds 10MB limit",
          variant: "destructive",
        });
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        toast({
          title: "Invalid file type",
          description: "Please upload PDF, PowerPoint, Word, PNG, or JPG files",
          variant: "destructive",
        });
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileSelect(file);

      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  }, [onFileSelect, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const removeFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    onFileSelect(null);
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('presentation') || type.includes('powerpoint')) return '📊';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('image')) return '🖼️';
    return '📎';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (selectedFile) {
    return (
      <div className="py-8">
        <div 
          className="bg-white rounded-xl p-5 flex items-center gap-4 relative"
          style={{ border: '1px solid rgba(103, 159, 131, 0.2)' }}
        >
          {/* File Icon */}
          <span className="text-5xl">{getFileIcon(selectedFile.type)}</span>

          {/* File Info */}
          <div className="flex-1">
            <p className="text-base font-bold text-primary-dark truncate">
              {selectedFile.name}
            </p>
            <p className="text-sm text-gray-600">
              {formatFileSize(selectedFile.size)}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={removeFile}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-red-50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Upload Progress */}
        {uploadProgress < 100 && (
          <div className="mt-4">
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-300"
                style={{
                  width: `${uploadProgress}%`,
                  background: 'linear-gradient(to right, #679f83, #23698a)'
                }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">{uploadProgress}%</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        min-h-[350px] flex items-center justify-center rounded-2xl p-12 cursor-pointer transition-all duration-300
        ${isDragActive 
          ? 'border-2 border-solid border-secondary-teal bg-secondary-teal/10' 
          : 'border-2 border-dashed bg-secondary-teal/5'
        }
      `}
      style={{
        borderColor: isDragActive ? '#679f83' : 'rgba(103, 159, 131, 0.3)'
      }}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center text-center">
        <Paperclip className="w-16 h-16 text-gray-400 mb-4" />
        
        <p className="text-lg font-bold text-primary-dark mb-2">
          {isDragActive ? 'Drop file here' : 'Drag & drop your file here'}
        </p>
        
        <p className="text-sm text-gray-500 mb-4">
          or click to browse
        </p>
        
        <div className="text-xs text-gray-500 space-y-1">
          <p>PDF, PowerPoint, Word, PNG, JPG</p>
          <p>Max file size: 10MB</p>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
