'use client';

import { Plus } from 'lucide-react';

import ActionTooltip from '@/components/action-tooltip';

export default function NavigationAction() {
  return (
    <div>
      <ActionTooltip side="right" label="서버 추가하기">
        <button className="flex items-center group">
          <div className="flex items-center justify-center mx-3 overflow-hidden transition-all h-48pxr w-48pxr rounded-24pxr group-hover:rounded-16pxr bg-background-primary group-hover:bg-emerald-500">
            <Plus className="transition group-hover:text-white text-emerald-500" size={25} />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}
