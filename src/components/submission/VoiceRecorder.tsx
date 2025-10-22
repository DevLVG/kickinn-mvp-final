import { useState, useRef, useEffect } from 'react';
import { Mic, Pause, Square, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface VoiceRecorderProps {
  onRecordingComplete: (blob: Blob | null) => void;
}

const VoiceRecorder = ({ onRecordingComplete }: VoiceRecorderProps) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string>('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const MAX_DURATION = 300; // 5 minutes in seconds

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioURL) URL.revokeObjectURL(audioURL);
    };
  }, [audioURL]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
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
              description: "5 minutes maximum",
            });
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Access Denied",
        description: "Please enable microphone permissions in your browser settings.",
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
    }
  };

  const cancelRecording = () => {
    stopRecording();
    setRecordingTime(0);
    setAudioBlob(null);
    setAudioURL('');
    onRecordingComplete(null);
  };

  const resetRecording = () => {
    if (audioURL) URL.revokeObjectURL(audioURL);
    setRecordingTime(0);
    setAudioBlob(null);
    setAudioURL('');
    onRecordingComplete(null);
  };

  // Completed state
  if (audioBlob && !isRecording) {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="flex items-center gap-2 text-green-600">
          <span className="text-2xl">✓</span>
          <p className="text-sm">Recording saved: {formatTime(recordingTime)}</p>
        </div>

        <div 
          className="w-full rounded-xl p-4"
          style={{ background: 'rgba(103, 159, 131, 0.1)' }}
        >
          <audio src={audioURL} controls className="w-full" />
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
        {/* Timer */}
        <div className="text-5xl font-bold text-primary-dark">
          {formatTime(recordingTime)}
        </div>

        {/* Recording indicator */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm text-gray-600">
            {isPaused ? 'Paused' : 'Recording...'}
          </span>
        </div>

        {/* Waveform placeholder */}
        <div className="w-full h-24 flex items-center justify-center">
          <div className="flex gap-1 items-end h-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-t from-secondary-teal to-accent-blue rounded-full animate-pulse"
                style={{
                  height: `${Math.random() * 70 + 30}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
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
      <Mic className="w-20 h-20 text-gray-400" />
      <p className="text-base text-gray-600">Click to start recording</p>
      <Button
        onClick={startRecording}
        className="bg-gradient-to-r from-secondary-teal to-accent-blue text-white w-48 h-14 rounded-full text-base font-bold"
      >
        Start Recording
      </Button>
    </div>
  );
};

export default VoiceRecorder;
