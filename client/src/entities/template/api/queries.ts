import { useSuspenseQuery } from '@tanstack/react-query';

import { getTemplate } from './apis';

import template from './queryKeys';

/** 템플릿 조회 */
const useFetchTemplate = () =>
  useSuspenseQuery({
    queryKey: template.list(),
    queryFn: () => getTemplate(),
  });

export { useFetchTemplate };
