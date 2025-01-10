import { render, screen, fireEvent } from '@testing-library/react';

import { useForm } from 'react-hook-form';

import { coverLetterType } from '@/src/entities/coverLetter';

import TestProvider from '@/fixutures/TestProvider';
import CoverLetterItem from './CoverLetterItem';

// TODO: 테스트코드 수정
describe('CoverLetterItem', () => {
  const mockRemove = jest.fn();

  function Wrapper() {
    const { register, control } = useForm<coverLetterType.IWriteCoverLetter>({
      defaultValues: {
        qnaList: [
          { question: '', answer: '' },
        ],
      },
    });

    return (
      <TestProvider>
        <CoverLetterItem
          index={0}
          register={register}
          control={control}
          remove={mockRemove}
        />
      </TestProvider>
    );
  }

  it('컴포넌트가 렌더링된다.', () => {
    render(<Wrapper />);
    expect(screen.getByPlaceholderText('질문을 작성해주세요.')).toBeInTheDocument();
    expect(screen.getByText('글자수 : 0/500')).toBeInTheDocument();
  });

  it('답변 텍스트 입력 시 글자수가 업데이트된다.', () => {
    render(<Wrapper />);
    const answerTextarea = screen.getByPlaceholderText('답변을 작성해주세요.');
    fireEvent.change(answerTextarea, { target: { value: '테스트 답변' } });
    expect(screen.getByText('글자수 : 6/500')).toBeInTheDocument();
  });

  it('삭제 버튼을 클릭하면 remove 함수가 호출된다.', () => {
    render(<Wrapper />);

    const deleteButton = screen.getByText('삭제');
    fireEvent.click(deleteButton);
    expect(mockRemove).toHaveBeenCalled();
  });
});
