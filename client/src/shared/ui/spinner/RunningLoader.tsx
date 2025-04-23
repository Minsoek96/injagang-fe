import styled, { keyframes } from 'styled-components';

import { styleMixin, V } from '@/src/shared/styles';

function RunningLoader() {
  return (
    <LoadingWrapper>
      <RunTrack>
        <Runner>
          <Ghost>
            {/* 유령 본체 */}
            <path
              d="M20,5 C10,5 5,12 5,20 C5,35 5,50 5,55 C5,55 7,53 10,55 C13,57 15,60 20,57 C25,60 27,57 30,55 C33,53 35,55 35,55 C35,55 35,35 35,20 C35,12 30,5 20,5 Z"
              fill="#22C55E"
              opacity="0.4"
            />

            {/* 유령 외곽선 */}
            <path
              d="M20,5 C10,5 5,12 5,20 C5,35 5,50 5,55 C5,55 7,53 10,55 C13,57 15,60 20,57 C25,60 27,57 30,55 C33,53 35,55 35,55 C35,55 35,35 35,20 C35,12 30,5 20,5 Z"
              fill="none"
              stroke="#22C55E"
              strokeWidth="1.5"
            />

            {/* 유령 눈 */}
            <circle cx="15" cy="20" r="3" fill="#ffffff" opacity="0.8" />
            <circle cx="25" cy="20" r="3" fill="#ffffff" opacity="0.8" />

            {/* 유령 입 */}
            <path
              d="M15,30 C18,33 22,30 25,30"
              stroke="#ffffff"
              strokeOpacity="0.8"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />

            {/* 바통 */}
            <rect
              x="25"
              y="5"
              width="25"
              height="4"
              rx="1.5"
              fill="#FFFFFF"
              opacity="0.7"
              transform="rotate(105, 30, 20)"
            />
          </Ghost>
        </Runner>
      </RunTrack>
    </LoadingWrapper>
  );
}

const run = keyframes`
  from {
    transform: translateX(-40px);
  }
  to {
    transform: translateX(calc(100vw - 40px));
  }
`;

const move = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(2deg);
  }
`;

const LoadingWrapper = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
  height: 100px;
`;

const RunTrack = styled.div`
  position: relative;
  width: 100%;
  height: 15rem;
`;

const Runner = styled.div`
  position: absolute;
  bottom: 20px;
  animation: ${run} 6s linear infinite;

  @media screen and (max-width: ${V.mediaTablet}){
    animation: ${run} 2s linear infinite;
  }
`;

const Ghost = styled.svg.attrs({
  width: '80',
  height: '80',
  viewBox: '0 0 40 60',
})`
  animation: ${move} 1s ease-in-out infinite;
`;

export default RunningLoader;
