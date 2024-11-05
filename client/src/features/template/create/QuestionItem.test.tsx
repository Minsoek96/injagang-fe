import {
  render, screen, fireEvent,
} from '@testing-library/react';
import QuestionItem from '@/src/features/template/create/QuestionItem';
import TestProvider from '@/fixutures/TestProvider';
import { useForm } from 'react-hook-form';
import { templateType } from '@/src/entities/template';

describe('QuestionItem', () => {
  const mockIndex = 3;

  function WrapperComponent({ index }: { index: number }) {
    const { register } = useForm<templateType.IAddFormTemplate>();
    return (
      <TestProvider>
        <QuestionItem index={index} register={register} />
      </TestProvider>
    );
  }

  const renderComponent = () => {
    render(<WrapperComponent index={mockIndex} />);
  };

  it('질문 번호와 placeholder 텍스트가 렌더링된다.', () => {
    renderComponent();
    expect(screen.getByText('4. 질문:')).toBeInTheDocument();
    const textarea = screen.getByPlaceholderText('질문을 입력해주세요');
    expect(textarea).toBeInTheDocument();
  });

  it('textarea에 입력하면 onChange가 호출된다.', () => {
    renderComponent();
    const textarea = screen.getByPlaceholderText('질문을 입력해주세요');
    fireEvent.change(textarea, { target: { value: '새 질문' } });
    expect(textarea).toHaveValue('새 질문');
  });
});
