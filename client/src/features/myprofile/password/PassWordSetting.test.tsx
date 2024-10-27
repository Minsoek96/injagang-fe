import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import PassWordSetting from '@/src/features/myprofile/password/PassWordSetting';

describe('UserInfoSetting', () => {
  const renderComponent = () => {
    render(
      <TestProvider>
        <PassWordSetting />
      </TestProvider>,
    );
  };

  it('메인 타이틀이 보인다', () => {
    renderComponent();
    const searchTitle = screen.getByText('비밀번호 변경');
    expect(searchTitle).toBeInTheDocument();
  });
});
