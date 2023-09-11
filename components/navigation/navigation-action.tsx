'use client';

import { Plus } from 'lucide-react';

import ActionTooltip from '@/components/action-tooltip';
import { useModal } from '@/hooks/use-modal-store';

export default function NavigationAction() {
  const { onOpen } = useModal();

  function handleButtonClick() {
    onOpen('createServer');
  }

  return (
    <ActionTooltip side="right" content={<p className="text-base font-semibold">서버 추가하기</p>}>
      <button onClick={handleButtonClick} className="flex items-center group">
        <div className="flex items-center justify-center mx-3 overflow-hidden transition-all h-48pxr w-48pxr rounded-24pxr group-hover:rounded-16pxr bg-background-primary group-hover:bg-emerald-500">
          <Plus className="transition group-hover:text-white text-emerald-500" size={25} />
        </div>
      </button>
    </ActionTooltip>
  );
}
