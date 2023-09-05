'use client';

import * as React from 'react';

/**
 * hydration error를 방지하기 위해 사용하는 래퍼 컴포넌트입니다.
 */
export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
}
