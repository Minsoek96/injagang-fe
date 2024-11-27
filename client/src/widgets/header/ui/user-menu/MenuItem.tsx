import {
  BiSun, BiMoon, BiLogOut, BiUserCheck,
} from 'react-icons/bi';

function ThemeItem({ isDark }: {isDark: boolean}) {
  return (
    <>
      {isDark ? <BiSun /> : <BiMoon />}
      <span>{isDark ? '밝게' : '다크'}</span>
    </>
  );
}

function LogoutItem() {
  return (
    <>
      <BiLogOut />
      <span>로그아웃</span>
    </>
  );
}

function MyProfileItem() {
  return (
    <>
      <BiUserCheck />
      <span>나의정보</span>
    </>
  );
}

export {
  ThemeItem,
  LogoutItem,
  MyProfileItem,
};
