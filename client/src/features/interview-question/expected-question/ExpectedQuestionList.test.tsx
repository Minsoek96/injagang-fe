import { render, screen, fireEvent } from '@testing-library/react';
import { sampleResponseQuestions } from '@/fixutures/entities/intervew_question';
import TestProvider from '@/fixutures/TestProvider';
import ExpectedQuestionList from '@/src/features/interview-question/expected-question/ExpectedQuestionList';

const context = describe;
describe('ExpectedQuestionList', () => {
  const mockHandleCheckList = jest.fn();

  const renderComponent = (mockCheckList: number[]) => {
    render(
      <TestProvider>
        <ExpectedQuestionList
          questions={sampleResponseQuestions}
          checkList={mockCheckList}
          handleCheckList={mockHandleCheckList}
        />
      </TestProvider>,
    );
  };

  context('전체 체크리스트 선택된 경우', () => {
    it('전체의 아이템의 상태가 true가 된다.', () => {
      const mockList = sampleResponseQuestions.map((item) => item.id);
      renderComponent(mockList);

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(sampleResponseQuestions.length);

      // 모든 항목의 체크 상태 확인
      listItems.forEach((item) => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        expect(checkbox).toBeChecked();
      });
    });
  });

  context('전체 체크리스트 해제된 경우', () => {
    it('전체의 아이템의 상태가 false가 된다.', () => {
      const mockList = [0];
      renderComponent(mockList);

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(sampleResponseQuestions.length);

      // 모든 항목의 체크 해제 확인
      listItems.forEach((item) => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        expect(checkbox).not.toBeChecked();
      });
    });
  });

  context('개별 아이템 클릭 시', () => {
    it('handleCheckList가 호출된다.', () => {
      renderComponent([]);

      const listItems = screen.getAllByRole('listitem');
      const firstItem = listItems[0];

      fireEvent.click(firstItem); // 첫 번째 아이템 클릭

      expect(mockHandleCheckList).toHaveBeenCalledWith(
        sampleResponseQuestions[0].id,
        true,
      );
    });
  });
});
