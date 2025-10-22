import { useState, useRef, useEffect } from 'react';
import { Video, Pause, Square, X, RotateCcw, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface VideoRecorderProps {
  onRecordingComplete: (blob: Blob | null) => void;
}

const VideoRecorder = ({ onRecordingComplete }: VideoRecorderProps) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoURL, setVideoURL] = useState<string>('');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const MAX_DURATION = 180; // 3 minutes in seconds

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (videoURL) URL.revokeObjectURL(videoURL);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoURL]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode },
        audio: true 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setVideoBlob(blob);
        setVideoURL(URL.createObjectURL(blob));
        onRecordingComplete(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= MAX_DURATION) {
            stopRecording();
            toast({
              title: "Maximum recording time reached",
              description: "3 minutes maximum",
            });
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Access Denied",
        description: "Please enable camera permissions in your browser settings.",
        variant: "destructive",
      });
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  };

  const cancelRecording = () => {
    stopRecording();
    setRecordingTime(0);
    setVideoBlob(null);
    setVideoURL('');
    onRecordingComplete(null);
  };

  const resetRecording = () => {
    if (videoURL) URL.revokeObjectURL(videoURL);
    setRecordingTime(0);
    setVideoBlob(null);
    setVideoURL('');
    onRecordingComplete(null);
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    if (isRecording) {
      // Restart recording with new camera
      stopRecording();
      setTimeout(startRecording, 100);
    }
  };

  // Completed state
  if (videoBlob && !isRecording) {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="flex items-center gap-2 text-green-600">
          <span className="text-2xl">✓</span>
          <p className="text-sm">Video saved: {formatTime(recordingTime)}</p>
        </div>

        <div className="w-full rounded-xl overflow-hidden">
          <video 
            src={videoURL} 
            controls 
            className="w-full rounded-xl"
            style={{ maxHeight: '400px' }}
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={resetRecording}
            className="border-secondary-teal text-secondary-teal hover:bg-secondary-teal/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Re-record
          </Button>
          <Button
            className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // Recording state
  if (isRecording) {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        {/* Video Preview */}
        <div className="relative w-full rounded-xl overflow-hidden" style={{ maxHeight: '400px' }}>
          <video 
            ref={videoRef}
            autoPlay 
            muted
            playsInline
            className="w-full rounded-xl"
            style={{ 
              transform: facingMode === 'user' ? 'scaleX(-1)' : 'none'
            }}
          />
          
          {/* Timer Overlay */}
          <div className="absolute top-4 left-4 bg-black/70 px-4 py-2 rounded-lg">
            <span className="text-white font-bold text-xl">{formatTime(recordingTime)}</span>
          </div>

          {/* Recording Indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/70 px-3 py-2 rounded-lg">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white text-sm">{isPaused ? 'Paused' : 'Recording'}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 flex-wrap justify-center">
          <Button
            variant="outline"
            onClick={toggleCamera}
            className="border-gray-300"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Switch Camera
          </Button>
          <Button
            variant="outline"
            onClick={pauseRecording}
            className="border-gray-300"
          >
            <Pause className="w-4 h-4 mr-2" />
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button
            onClick={stopRecording}
            className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white"
          >
            <Square className="w-4 h-4 mr-2" />
            Stop & Save
          </Button>
          <Button
            variant="ghost"
            onClick={cancelRecording}
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  // Initial state
  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <Video className="w-20 h-20 text-gray-400" />
      <p className="text-base text-gray-600">Click to start video recording</p>
      <Button
        onClick={startRecording}
        className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white w-48 h-14 rounded-full text-base font-bold"
      >
        Start Recording
      </Button>
    </div>
  );
};

export default VideoRecorder;
