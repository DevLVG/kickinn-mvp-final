import { Button } from '@/components/ui/button';

interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  url: string;
}

interface SharedFilesProps {
  ventureId: string;
}

const mockFiles: File[] = [
  {
    id: 'f1',
    name: 'api-documentation.pdf',
    type: 'pdf',
    size: '2.3 MB',
    uploadedBy: 'Marco',
    uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    url: '#',
  },
  {
    id: 'f2',
    name: 'design-mockups.fig',
    type: 'figma',
    size: '8.1 MB',
    uploadedBy: 'Aisha',
    uploadedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    url: '#',
  },
  {
    id: 'f3',
    name: 'database-schema.png',
    type: 'image',
    size: '456 KB',
    uploadedBy: 'Sara',
    uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    url: '#',
  },
];

const SharedFiles = ({ ventureId }: SharedFilesProps) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return { bg: 'bg-red-500', icon: '📄' };
      case 'image':
        return { bg: 'bg-purple-500', icon: '🖼️' };
      case 'figma':
        return { bg: 'bg-blue-500', icon: '🎨' };
      case 'code':
        return { bg: 'bg-green-500', icon: '💻' };
      default:
        return { bg: 'bg-gray-500', icon: '📁' };
    }
  };

  const getTimeAgo = (date: string) => {
    const hours = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">📁</span>
          <h2 className="text-lg font-bold text-[hsl(var(--primary-dark))]">Shared Files</h2>
        </div>
        <Button className="bg-[hsl(var(--secondary-teal))] hover:bg-[hsl(var(--accent-blue))] text-white text-xs px-3 py-1.5 h-auto">
          <span className="mr-1">⬆️</span>
          Upload
        </Button>
      </div>

      {/* Files List */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {mockFiles.map((file) => {
          const fileConfig = getFileIcon(file.type);

          return (
            <div
              key={file.id}
              className="flex items-center gap-3 bg-muted border border-border rounded-lg p-3 hover:bg-card hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              {/* File Icon */}
              <div
                className={`w-8 h-8 rounded-lg ${fileConfig.bg} flex items-center justify-center text-base`}
              >
                {fileConfig.icon}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[hsl(var(--primary-dark))] truncate">
                  {file.name}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {file.size} • {file.uploadedBy} • {getTimeAgo(file.uploadedAt)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-1">
                <button className="text-base text-muted-foreground hover:text-[hsl(var(--secondary-teal))] transition-colors">
                  ⬇️
                </button>
                <button className="text-base text-muted-foreground hover:text-muted-foreground/70 transition-colors">
                  ⋮
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {mockFiles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <span className="text-4xl mb-2">📁</span>
          <p className="text-sm text-muted-foreground">No files yet</p>
          <button className="text-sm text-[hsl(var(--secondary-teal))] underline hover:no-underline mt-2">
            Upload first file
          </button>
        </div>
      )}
    </div>
  );
};

export default SharedFiles;
