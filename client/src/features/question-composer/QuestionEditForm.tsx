import dynamic from 'next/dynamic';

import {
  useForm, Controller, FieldValues, Path, DefaultValues,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  boardSchema,
} from '@/src/entities/qnaboard';

import {
  MainButton, Container, Spinner,
  UnInput,
} from '@/src/shared/ui';

const MarkdownEditor = dynamic(
  () => import('@/src/shared/ui/markdown/MarkdownEditor'),
  {
    loading: () => <Spinner message="편집기를 불러오는 중입니다." />,
    ssr: false,
  },
);

type Props<T extends FieldValues> = {
    onSubmit: (data: T) => void;
    defaultValues: DefaultValues<T>;
};

function QuestionEditForm<T extends FieldValues>({ onSubmit, defaultValues }: Props<T>) {
  const {
    register,
    handleSubmit,
    control,
  } = useForm<T>({
    resolver: zodResolver(boardSchema.revise),
    defaultValues,
  });

  return (
    <Container.ArticleCard $size={{ width: '100%', height: '87vh' }}>
      <UnInput
        register={register('changeTitle' as Path<T>)}
        style={{ width: '100%', marginBottom: '1rem' }}
        placeholder="제목을 작성해주세요."
      />
      <Controller
        name={'changeContent' as Path<T>}
        control={control}
        render={({ field: { onChange, value } }) => (
          <MarkdownEditor
            initText={value}
            onChange={onChange}
            placeholder="질문을 작성해주세요."
          />
        )}
      />
      <MainButton
        label="수정완료"
        onClick={handleSubmit(onSubmit)}
        sx={{
          width: '100%',
          minHeight: '4rem',
          fontSize: '1.6rem',
          backgroundColor: '#ff8800',
        }}
      />
    </Container.ArticleCard>
  );
}

export default QuestionEditForm;
