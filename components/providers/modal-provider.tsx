import ClientOnly from '@/components/client-only';
import { CreateServerModal } from '@/components/modals/create-server-modal';

export function ModalProvier() {
  return (
    <ClientOnly>
      <CreateServerModal />
    </ClientOnly>
  );
}
