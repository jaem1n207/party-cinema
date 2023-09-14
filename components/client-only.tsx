'use client';

import * as React from 'react';

/**
 * Hydration error를 방지하기 위해 사용하는 래퍼 컴포넌트입니다.
 *
 * 클라이언트에서만 렌더링되도록 하여 이를 방지하는 원리입니다.
 * Hydration error는 서버에서 렌더링된 HTML과 hydration 후 React가 기대하는 HTML이 다를 때 발생합니다.
 * Hydration은 DOM이 변경될 것에 대비하는 렌더링 과정과는 다르게 DOM이 변경되지 않을 것이라 가정하기 때문입니다.
 * 불일치를 포착하고 수정하는 것이 아니라, 빠르게 과정을 끝낼 수 있도록 최적화되어 있기 때문입니다.
 * 따라서, 이 컴포넌트는 hydration 중에 DOM을 채택하면 `useEffect`가 아직 호출되지 않았으므로
 * React의 기대를 충족할 수 있게 됩니다.
 * 이 비교 직후, 리렌더링을 시작하고 React는 적절한 조정을 수행하게 됩니다. 그리고 DOM을 업데이트합니다.
 */
export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
}
