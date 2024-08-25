import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useToast } from '@/src/shared/hooks';

import { ERROR_MESSAGES, TOAST_MODE } from '@/src/shared/const';

export default function ProtectedPage() {
  const router = useRouter();
  const { showToast } = useToast();
  useEffect(() => {
    showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.PROTECTED_PAGE);
    router.replace('/login');
  }, []);
  return null;
}
