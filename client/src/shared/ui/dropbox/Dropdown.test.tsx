import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
  const renderComponent = (onClick = () => {}) => {
    render(
      <>
        <div>외부영역</div>
        <Dropdown>
          <Dropdown.Trigger>트리거</Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item onClick={onClick}>아이템</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>,
    );
  };
  it('드롭다운 기본 렌더링', () => {
    renderComponent();

    expect(screen.getByText('트리거')).toBeInTheDocument();
    expect(screen.queryByText('아이템')).not.toBeInTheDocument();
  });

  it('트리거 클릭시 메뉴 토글', () => {
    renderComponent();

    fireEvent.click(screen.getByText('트리거'));
    expect(screen.getByText('아이템')).toBeInTheDocument();

    fireEvent.click(screen.getByText('트리거'));
    expect(screen.queryByText('아이템')).not.toBeInTheDocument();
  });

  it('메뉴 외부 클릭시 닫힘', () => {
    renderComponent();

    fireEvent.click(screen.getByText('트리거'));
    expect(screen.getByText('아이템')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByText('외부영역'));
    expect(screen.queryByText('아이템')).not.toBeInTheDocument();
  });

  it('아이템 클릭시 이벤트 핸들러 호출', () => {
    const onClick = jest.fn();
    renderComponent(onClick);

    fireEvent.click(screen.getByText('트리거'));
    fireEvent.click(screen.getByText('아이템'));

    expect(onClick).toHaveBeenCalled();
    expect(screen.queryByText('아이템')).not.toBeInTheDocument();
  });
});
