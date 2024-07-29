import { Spinner } from '@/src/shared/components/spinner';
import { useFetchTemplate } from '@/src/entities/template/queries';

interface TemplateListFetcherProps {
  children: (data: unknown) => React.ReactNode;
}

function TemplateListFetcher({ children }: TemplateListFetcherProps) {
  const { data: templateList, isLoading, isError } = useFetchTemplate();

  if (isLoading) return <Spinner />;

  if (isError) {
    return <p>데이터를 불러오지 못했습니다.</p>;
  }

  return <>{children(templateList)}</>;
}

export default TemplateListFetcher;
