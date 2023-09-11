import ClientOnly from '@/components/client-only';
import { CreateServerModal } from '@/components/modals/create-server-modal';
import { InviteModal } from '@/components/modals/invite-modal';

export function ModalProvier() {
  return (
    <ClientOnly>
      <CreateServerModal />
      <InviteModal />
    </ClientOnly>
  );
}
