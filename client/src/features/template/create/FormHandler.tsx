import { styled } from 'styled-components';

import { BiCheck, BiPlus, BiRedo } from 'react-icons/bi';

import { styleMixin } from '@/src/shared/styles';
import { keys } from '@/src/shared/utils';
import { HideSvg } from '@/src/shared/ui';

type ControllerItem = {
  icon: React.ReactNode;
  onClick: () => void;
  text: string;
};

type Props = {
  onAddQuestion: () => void;
  onDeleteQuestion: () => void;
  handleSubmit: () => void;
};

/** FormHandler : 템플릿 생성 폼을 핸들링 하는 버튼
 *
 * @param onAddQuestion - 폼 추가
 * @param onDeleteQuestion - 폼 삭제
 * @param handleSubmit - 폼 제출
 */
export default function FormHandler({
  onAddQuestion,
  onDeleteQuestion,
  handleSubmit,
}: Props) {
  const ControllerData: ControllerItem[] = [
    {
      icon: <BiPlus />,
      onClick: onAddQuestion,
      text: '질문추가',
    },
    {
      icon: <BiRedo />,
      onClick: onDeleteQuestion,
      text: '되돌리기',
    },
    {
      icon: <BiCheck />,
      onClick: handleSubmit,
      text: '확정하기',
    },
  ];
  return (
    <Wrapper>
      {ControllerData.map((info, idx) => (
        <HideSvg
          key={keys(info.text, idx)}
          Logo={info.icon}
          label={info.text}
          onClick={info.onClick}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${styleMixin.Flex()};
`;
