import styled, { keyframes } from 'styled-components';
import { styleMixin } from '@/src/shared/styles';

function RunningLoader() {
  return (
    <LoadingWrapper>
      <RunTrack>
        <Runner>
          <StickMan>
            {/* Head */}
            <circle cx="15" cy="8" r="6" fill="#ff8800" />
            {/* Body */}
            <line
              x1="15"
              y1="14"
              x2="15"
              y2="28"
              stroke="#ff8800"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Arms and Legs */}
            <g>
              <line
                x1="15"
                y1="18"
                x2="8"
                y2="24"
                stroke="#ff8800"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="15"
                y1="18"
                x2="22"
                y2="24"
                stroke="#ff8800"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="15"
                y1="28"
                x2="8"
                y2="36"
                stroke="#ff8800"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                x1="15"
                y1="28"
                x2="22"
                y2="36"
                stroke="#ff8800"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          </StickMan>
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
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
`;

const Runner = styled.div`
  position: absolute;
  bottom: 20px;
  animation: ${run} 3s linear infinite;
`;

const StickMan = styled.svg.attrs({
  width: '30',
  height: '40',
  viewBox: '0 0 30 40',
})`
  animation: ${move} 0.5s ease-in-out infinite;
`;

export default RunningLoader;
