import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2 font-bold font-headline", className)}>
      <BrainCircuit className="h-8 w-8 text-primary" />
      {showText && <span className='text-2xl'>NeuroQuadAI</span>}
    </div>
  );
}
