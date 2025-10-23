import { UseFormReturn } from "react-hook-form";
import { OfferFormData } from "@/pages/MakeOffer";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface OfferStep2TermsProps {
  form: UseFormReturn<OfferFormData>;
}

const OfferStep2Terms = ({ form }: OfferStep2TermsProps) => {
  const closingDate = form.watch('closingDate');
  const assetsIncluded = form.watch('assetsIncluded');
  const contingencies = form.watch('contingencies');
  
  const daysUntilClosing = Math.ceil((closingDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const allAssets = [
    { id: 'source_code', label: 'Source code & repositories' },
    { id: 'domain', label: 'Domain name & SSL' },
    { id: 'user_db', label: 'User database (anonymized)' },
    { id: 'brand_assets', label: 'Brand assets & IP' },
    { id: 'social_media', label: 'Social media accounts' },
    { id: 'email_lists', label: 'Email lists (GDPR compliant)' },
    { id: 'analytics', label: 'Historical analytics' },
    { id: 'vendor_contracts', label: 'Vendor contracts' },
    { id: 'documentation', label: 'Support documentation' }
  ];

  const allContingencies = [
    { id: 'tech_audit', label: 'Technical audit approval' },
    { id: 'financial_verify', label: 'Financial records verification' },
    { id: 'customer_retention', label: 'Customer retention confirmation' },
    { id: 'no_changes', label: 'No material business changes' },
    { id: 'personnel_retention', label: 'Key personnel retention' },
    { id: 'regulatory', label: 'Regulatory approval' }
  ];

  const toggleAsset = (assetId: string) => {
    const current = assetsIncluded || [];
    if (current.includes(assetId)) {
      form.setValue('assetsIncluded', current.filter(id => id !== assetId));
    } else {
      form.setValue('assetsIncluded', [...current, assetId]);
    }
  };

  const toggleContingency = (contingencyId: string) => {
    const current = contingencies || [];
    if (current.includes(contingencyId)) {
      form.setValue('contingencies', current.filter(id => id !== contingencyId));
    } else {
      form.setValue('contingencies', [...current, contingencyId]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[rgba(25,74,97,0.3)] backdrop-blur-[20px] border border-[rgba(103,159,131,0.2)] rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-white mb-2">Acquisition Terms</h3>
        <p className="text-sm text-white/60 mb-8">Define structure and timeline</p>

        {/* Closing Timeline */}
        <div className="mb-8">
          <Label className="text-white text-base font-bold mb-3 block">Desired Closing Date</Label>
          <p className="text-sm text-white/60 mb-4">When to complete acquisition?</p>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-[rgba(15,43,56,0.8)] border-[rgba(103,159,131,0.3)] text-white hover:bg-[rgba(15,43,56,0.9)] h-14",
                  !closingDate && "text-white/60"
                )}
              >
                <CalendarIcon className="mr-3 h-5 w-5" />
                {closingDate ? format(closingDate, "MMMM dd, yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={closingDate}
                onSelect={(date) => date && form.setValue('closingDate', date)}
                disabled={(date) => date < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) || date > new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {/* Timeline Breakdown */}
          <div className="mt-6 p-5 bg-[rgba(103,159,131,0.1)] border border-[rgba(103,159,131,0.2)] rounded-xl">
            <p className="text-lg font-bold text-[#679f83] mb-4">
              {daysUntilClosing} days until closing
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">DD period</span>
                <span className="text-white font-medium">14 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Contract negotiation</span>
                <span className="text-white font-medium">10 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Smart contract setup</span>
                <span className="text-white font-medium">7 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Payment processing</span>
                <span className="text-white font-medium">5 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Asset transfer</span>
                <span className="text-white font-medium">9 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Asset Transfer Preferences */}
        <div className="mb-8">
          <Label className="text-white text-base font-bold mb-3 block">What assets included?</Label>
          <div className="space-y-3">
            {allAssets.map((asset) => (
              <div key={asset.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[rgba(103,159,131,0.05)] transition-colors">
                <Checkbox
                  id={asset.id}
                  checked={assetsIncluded?.includes(asset.id)}
                  onCheckedChange={() => toggleAsset(asset.id)}
                  className="border-[rgba(103,159,131,0.4)]"
                />
                <Label htmlFor={asset.id} className="text-white cursor-pointer flex-1">
                  {asset.label}
                </Label>
              </div>
            ))}
          </div>

          {/* Custom Requirements */}
          <div className="mt-6">
            <Label className="text-white mb-2 block">Custom Additions</Label>
            <Textarea
              {...form.register('customRequirements')}
              placeholder="E.g., team transition, integrations..."
              className="bg-[rgba(15,43,56,0.8)] border-[rgba(103,159,131,0.3)] text-white min-h-[100px]"
              maxLength={500}
            />
            <p className="text-xs text-white/50 mt-2 text-right">
              {form.watch('customRequirements')?.length || 0} / 500
            </p>
          </div>
        </div>

        {/* Contingencies */}
        <div>
          <Label className="text-white text-base font-bold mb-3 block">Offer Contingencies</Label>
          <p className="text-sm text-white/60 mb-4">Conditions that must be met</p>
          
          <div className="space-y-3 mb-4">
            {allContingencies.map((contingency) => (
              <div key={contingency.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[rgba(103,159,131,0.05)] transition-colors">
                <Checkbox
                  id={contingency.id}
                  checked={contingencies?.includes(contingency.id)}
                  onCheckedChange={() => toggleContingency(contingency.id)}
                  className="border-[rgba(103,159,131,0.4)]"
                />
                <Label htmlFor={contingency.id} className="text-white cursor-pointer flex-1">
                  {contingency.label}
                </Label>
              </div>
            ))}
          </div>

          {/* Warning */}
          <div className="p-4 bg-[rgba(251,146,60,0.1)] border border-[rgba(251,146,60,0.3)] rounded-xl flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div className="flex-1">
              <p className="text-sm text-[#fb923c] leading-relaxed">
                More contingencies extend timeline & reduce competitiveness
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferStep2Terms;
