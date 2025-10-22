import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

const tips = [
  {
    title: "Focus on the Problem, Not the Solution",
    description: "Describe what's broken or inefficient. We'll help build the solution."
  },
  {
    title: "Be Specific About Who Feels This Pain",
    description: 'Example: "Small textile shops" instead of "businesses"'
  },
  {
    title: "Share Real Examples",
    description: "Personal experiences make stronger submissions than theoretical problems"
  },
  {
    title: "Don't Worry About Business Plans",
    description: "Just describe the problem clearly. Our AI will handle validation and structure."
  },
  {
    title: "Use Any Format You Prefer",
    description: "Voice notes, videos, bullet points, sketches — all formats work equally well"
  }
];

const HelpModal = ({ open, onClose }: HelpModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary-dark">
            Tips for Great Submissions
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500 hover:text-gray-900" />
          </button>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex gap-3">
              <span className="text-2xl flex-shrink-0">💡</span>
              <div>
                <h3 className="text-base font-bold text-primary-dark mb-1">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white px-8"
          >
            Got It
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpModal;
