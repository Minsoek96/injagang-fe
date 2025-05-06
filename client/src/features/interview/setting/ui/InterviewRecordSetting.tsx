import { useState } from 'react';

import styled from 'styled-components';
import { styleMixin } from '@/src/shared/styles';

import dynamic from 'next/dynamic';
import { TermsAgreement } from './agreement';

const DeviceSettings = dynamic(() => import('./device-setting/ui/DeviceSettings'), {
  ssr: false,
});

export default function InterViewRecordSetting() {
  const [isTermsAccepted, setIsTermAccepted] = useState<boolean>(false);

  return (
    <Container>
      {!isTermsAccepted ? (
        <TermsWrapper>
          <TermsAgreement onAccept={setIsTermAccepted} />
        </TermsWrapper>
      ) : (
        <DevicesSettingWrapper>
          <DeviceSettings />
        </DevicesSettingWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const TermsWrapper = styled.div`
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  border-radius: 8px;
  padding: 2rem 4rem;
  font-size: 1.6rem;
`;

const DevicesSettingWrapper = styled.div`
  ${styleMixin.Column()};
`;
