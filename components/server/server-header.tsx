'use client';

import type { ServerWithMembersWithProfiles } from '@/types';

import { MemberRole } from '@prisma/client';
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';

type ServerHeaderProps = {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
};

export function ServerHeader({ server, role }: ServerHeaderProps) {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  function handleInviteClick() {
    onOpen('invite', {
      server,
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="flex items-center w-full text-base font-semibold transition border-b-2 px-12pxr h-48pxr border-neutral-200 dark:border-neutral-800 hover:bg-background-primary">
          <span className="truncate">{server.name}</span>
          <ChevronDown className="ml-auto h-20pxr w-20pxr min-w-20pxr min-h-20pxr" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-xs font-medium w-224pxr text-basic space-y-2pxr">
        {isModerator && (
          <DropdownMenuItem
            onClick={handleInviteClick}
            className="text-sm cursor-pointer text-brand-experiment-360 px-12pxr py-8pxr"
          >
            초대하기
            <UserPlus className="ml-auto h-16pxr w-16pxr" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="text-sm cursor-pointer px-12pxr py-8pxr">
            서버 설정
            <Settings className="ml-auto h-16pxr w-16pxr" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="text-sm cursor-pointer px-12pxr py-8pxr">
            멤버 관리
            <Users className="ml-auto h-16pxr w-16pxr" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="text-sm cursor-pointer px-12pxr py-8pxr">
            채널 만들기
            <PlusCircle className="ml-auto h-16pxr w-16pxr" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem className="text-sm cursor-pointer text-status-danger px-12pxr py-8pxr hover:bg-button-danger-background hover:text-basic">
            채널 삭제
            <Trash className="ml-auto h-16pxr w-16pxr" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="text-sm cursor-pointer text-status-danger px-12pxr py-8pxr hover:bg-button-danger-background hover:text-basic">
            서버 나가기
            <LogOut className="ml-auto h-16pxr w-16pxr" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
