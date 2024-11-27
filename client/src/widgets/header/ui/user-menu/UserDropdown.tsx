import Link from 'next/link';

import { styled } from 'styled-components';

import { GrUserSettings } from 'react-icons/gr';

import { useLogout } from '@/src/features/auth';
import { useThemeToggler } from '@/src/shared/hooks';

import { Dropdown } from '@/src/shared/ui/dropbox';

import { styleMixin } from '@/src/shared/styles';
import {
  ThemeItem,
  LogoutItem,
  MyProfileItem,
} from './MenuItem';

function UserDropdown() {
  const { onCheckOut } = useLogout();
  const [isDark, onToggle] = useThemeToggler();
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <GrUserSettings />
      </Dropdown.Trigger>
      <Dropdown.Menu style={{ right: 0 }}>
        <Container>
          {/* 테마 아이템 */}
          <Dropdown.Item onClick={onToggle}>
            <ThemeItem isDark={isDark} />
          </Dropdown.Item>

          {/* 나의정보 아이템 */}
          <StyleLink href="/myProfile">
            <Dropdown.Item>
              <MyProfileItem />
            </Dropdown.Item>
          </StyleLink>

          {/* 로그아웃 아이템 */}
          <Dropdown.Item onClick={onCheckOut}>
            <LogoutItem />
          </Dropdown.Item>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;

const Container = styled.ul`
  border-radius: 12px;
  width: 25rem;
  background-color: ${(props) => props.theme.colors.primary};
  list-style: none;

  > div,
  a > div {
    font-size: 2rem;
    gap: 1.2rem;
    ${styleMixin.Flex('flex-start')}
    padding-inline: 1.2rem;
    padding-block: 0.8rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.mainLine};
    border-radius: 12px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }

    svg {
      color: ${(props) => props.theme.colors.dropBoxColor};
    }
  }
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
