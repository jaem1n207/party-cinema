'use client';
import axios from 'axios';
import { Check, Copy, RefreshCw } from 'lucide-react';
import * as React from 'react';

import ClientOnly from '@/components/client-only';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useModal } from '@/hooks/use-modal-store';
import { useOrigin } from '@/hooks/use-origin';
import { cn } from '@/lib/utils';

export function InviteModal() {
  const { data, type, isOpen, onOpen, onClose } = useModal();

  const isModalOpen = isOpen && type === 'invite';

  const { server } = data;

  const origin = useOrigin();
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const [copied, onCopy] = useCopyToClipboard();
  function handleInviteUrlCopy() {
    onCopy(inviteUrl);
  }

  const [isGenrateLoading, setIsGenerateLoading] = React.useState(false);
  async function handleGenerateInviteUrl() {
    try {
      setIsGenerateLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen('invite', {
        server: response.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerateLoading(false);
    }
  }

  return (
    <ClientOnly>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-8">
            <DialogTitle className="text-2xl">{server?.name} 그룹으로 초대하기</DialogTitle>
          </DialogHeader>
          <div className="p-24pxr">
            <Label className="text-xs font-bold text-basic-500">
              이 링크를 공유하여 다른 사람들을 서버로 초대하기!
            </Label>
            <div className="flex items-center mt-8pxr gap-x-8pxr">
              <Input
                className={cn(!isGenrateLoading && '!opacity-100')}
                disabled
                value={inviteUrl}
                aria-label="초대 링크"
                maxLength={999}
              />
              <Button disabled={isGenrateLoading} onClick={handleInviteUrlCopy} size="icon">
                {copied ? (
                  <Check className="w-16pxr h-16px" />
                ) : (
                  <Copy className="w-16pxr h-16pxr" />
                )}
              </Button>
            </div>
            <Button
              onClick={handleGenerateInviteUrl}
              disabled={isGenrateLoading}
              variant="link"
              size="sm"
              className="text-xs text-basic-500"
            >
              새 링크 만들기
              <RefreshCw className="w-16pxr h-16pxr ml-8pxr" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </ClientOnly>
  );
}
