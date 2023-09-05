'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type ActionTooltipProps = {
  label: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
};

export default function ActionTooltip({
  label,
  children,
  side = 'top',
  align = 'center',
}: ActionTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <div className="relative">{children}</div>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className="text-base font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
