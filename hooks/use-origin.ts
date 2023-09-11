import * as React from 'react';

export function useOrigin() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const origin =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

  if (!mounted) return '';

  return origin;
}
