import { render, screen } from '@testing-library/react';

import TestProvider from '@/fixutures/TestProvider';
import UserInfoSetting from '@/src/features/myprofile/nick/UserInfoSetting';

describe('UserInfoSetting', () => {
  const renderComponent = () => {
    render(
      <TestProvider>
        <UserInfoSetting />
      </TestProvider>,
    );
  };

  it('메인 타이틀이 보인다', () => {
    renderComponent();
    const searchTitle = screen.getByText('닉네임 변경');
    expect(searchTitle).toBeInTheDocument();
  });
});
