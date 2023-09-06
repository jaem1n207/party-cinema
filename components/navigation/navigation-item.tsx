'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import ActionTooltip from '@/components/action-tooltip';
import { cn } from '@/lib/utils';

type NavigationItemProps = {
  id: string;
  name: string;
  imageUrl: string;
};

export default function NavigationItem({ id, name, imageUrl }: NavigationItemProps) {
  const params = useParams();
  const router = useRouter();

  function handleChannelClick() {
    router.push(`/servers/${id}`);
  }

  return (
    <ActionTooltip
      side="right"
      content={<div className="text-base font-semibold max-w-180pxr line-clamp-2">{name}</div>}
    >
      <button onClick={handleChannelClick} className="relative flex items-center group mb-8pxr">
        <div
          aria-hidden
          className={cn(
            'absolute left-0 bg-header-primary rounded-r-full transition-all w-4pxr',
            params?.serverId !== id ? 'group-hover:h-20pxr' : 'h-36pxr',
          )}
        />
        <div
          className={cn(
            'relative group flex mx-12pxr h-48pxr w-48pxr rounded-24pxr group-hover:rounded-16pxr transition-all overflow-hidden',
            params?.serverId === id && 'bg-primary/10 text-primary !rounded-16pxr',
          )}
        >
          <Image
            className="object-cover pointer-events-none"
            fill
            sizes="48px"
            src={imageUrl}
            alt="채널"
          />
        </div>
      </button>
    </ActionTooltip>
  );
}
