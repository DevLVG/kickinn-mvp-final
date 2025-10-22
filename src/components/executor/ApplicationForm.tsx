import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, AlertTriangle, Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ApplicationFormProps {
  aiEstimate: string;
  onSubmit: (data: any) => Promise<void>;
}

interface FormData {
  motivation: string;
  timeEstimate: number;
  timeUnit: 'days' | 'weeks';
  agreement: boolean;
}

const ApplicationForm = ({ aiEstimate, onSubmit }: ApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      timeUnit: 'weeks',
      agreement: false,
    }
  });

  const motivation = watch('motivation') || '';
  const timeEstimate = watch('timeEstimate');
  const timeUnit = watch('timeUnit');
  const agreement = watch('agreement');

  // Parse AI estimate (e.g., "3 weeks" -> 21 days)
  const aiEstimateDays = parseInt(aiEstimate) * 7; // Assuming weeks
  const executorEstimateDays = timeEstimate ? (timeUnit === 'weeks' ? timeEstimate * 7 : timeEstimate) : 0;
  const showWarning = executorEstimateDays > aiEstimateDays * 1.5;
  const showInfo = executorEstimateDays > 0 && executorEstimateDays < aiEstimateDays * 0.5;

  const onFormSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const timeEstimateDays = data.timeUnit === 'weeks' ? data.timeEstimate * 7 : data.timeEstimate;
      await onSubmit({
        motivation: data.motivation,
        timeEstimateDays,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = motivation.length >= 10 && motivation.length <= 300 && timeEstimate && agreement;

  return (
    <div className="bg-card border-2 border-secondary-teal rounded-2xl p-8 shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary-dark mb-2">Apply for This Opportunity</h2>
        <p className="text-sm text-muted-foreground">Tell us why you're the right fit</p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Motivation Input */}
        <div>
          <label htmlFor="motivation" className="block font-medium text-sm text-foreground mb-2">
            Why do you want to work on this venture?
          </label>
          <Textarea
            id="motivation"
            {...register('motivation', { 
              required: true, 
              minLength: 10,
              maxLength: 300 
            })}
            placeholder="Share your interest in this problem, relevant experience, or unique approach..."
            className="min-h-[100px] bg-muted border-secondary-teal/30 focus:border-secondary-teal resize-vertical"
          />
          <div className="flex justify-between items-center mt-1">
            {errors.motivation && (
              <span className="text-xs text-destructive">
                {errors.motivation.type === 'minLength' && 'At least 10 characters required'}
                {errors.motivation.type === 'maxLength' && 'Maximum 300 characters allowed'}
                {errors.motivation.type === 'required' && 'This field is required'}
              </span>
            )}
            <span className={`text-xs ml-auto ${motivation.length > 300 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {motivation.length}/300 characters
            </span>
          </div>
        </div>

        {/* Time Estimate Input */}
        <div>
          <label className="block font-medium text-sm text-foreground mb-2">
            How long do you think this will take you?
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              min="1"
              max="90"
              {...register('timeEstimate', { required: true, min: 1, max: 90 })}
              className="w-32 bg-muted border-secondary-teal/30 focus:border-secondary-teal"
              placeholder="0"
            />
            <Select
              value={timeUnit}
              onValueChange={(value: 'days' | 'weeks') => setValue('timeUnit', value)}
            >
              <SelectTrigger className="w-32 bg-muted border-secondary-teal/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="weeks">Weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Warning for long estimate */}
          {showWarning && (
            <div className="mt-2 bg-warning/10 border border-warning rounded-lg p-3 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-sm text-warning">
                Your estimate is significantly longer than the AI projection ({aiEstimate}). This may affect your application.
              </p>
            </div>
          )}

          {/* Info for short estimate */}
          {showInfo && (
            <div className="mt-2 bg-info/10 border border-info rounded-lg p-3 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
              <p className="text-sm text-info">
                Your estimate is much faster than projected. Ensure you can deliver quality work in this timeframe.
              </p>
            </div>
          )}
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="agreement"
            checked={agreement}
            onCheckedChange={(checked) => setValue('agreement', checked as boolean)}
            className="mt-1"
          />
          <label htmlFor="agreement" className="text-sm text-foreground leading-relaxed cursor-pointer">
            I understand that if selected, I'll need to sign a smart contract with the agreed terms, timeline, and token reward.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full bg-gradient-to-r from-secondary-teal to-accent-blue text-white py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:hover:translate-y-0 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting Application...
            </>
          ) : (
            <>
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
