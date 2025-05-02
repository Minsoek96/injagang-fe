import { useEffect } from 'react';

import { AUTH_ERROR_CODES } from '@/src/shared/const';

export default function RequireLogin() {
  const handleRedirect = () => {
    const returnUrl = encodeURIComponent(
      window.location.pathname + window.location.search,
    );

    window.location.href = `/login?returnUrl=${returnUrl}&error=${AUTH_ERROR_CODES.TOKEN_EXPIRED}`;
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return <div />;
}
