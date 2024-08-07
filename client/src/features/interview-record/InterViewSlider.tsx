import styled from 'styled-components';

import { MdOutlineFileDownload } from 'react-icons/md';

import { styleMixin } from '@/src/shared/styles';
import { saveAs } from 'file-saver';

type InterViewSliderProps = {
  video: Blob[];
  question: string[];
  idx: number;
};
function InterViewSlider({ video, question, idx }: InterViewSliderProps) {
  const downloadVideo = () => {
    if (video.length > 0) {
      const url = URL.createObjectURL(video[idx]);
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          saveAs(blob, 'interview_video.mp4');
          URL.revokeObjectURL(url);
        });
    }
  };
  return (
    <InterViewSliderStyle>
      <InterViewInfo>
        <h2>
          질문:
          {question[idx]}
        </h2>
        <h2>나의 대답: </h2>
      </InterViewInfo>
      <video autoPlay controls src={URL.createObjectURL(video[idx])}>
        <track
          kind="captions"
          src="path/to/captions.vtt"
          srcLang="en"
          label="English captions"
          default
        />
        Your browser does not support the video tag.
      </video>
      <button type="button" onClick={downloadVideo}>
        <MdOutlineFileDownload />
        DOWNLOAD
      </button>
    </InterViewSliderStyle>
  );
}

export default InterViewSlider;

const InterViewSliderStyle = styled.div`
  ${styleMixin.Column()}
  width: 100%;
  height: 100%;
  overflow-x: auto;
  ${styleMixin.ScrollBar}
  gap: 15px;
  font-size: 13px;
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 10px;
  video {
    width: 100%;
    height: 60%;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  svg {
    font-size: 24px;
    margin-right: 8px;
  }
  button {
    ${styleMixin.Flex()}
    align-items: center;
    background-color: #777;
    opacity: 0.7;
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, opacity 0.3s;
  }
  &:hover {
    button {
      background-color: #3b3a3a;
      opacity: 1;
    }
  }
`;

const InterViewInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  h2 {
    margin-bottom: 10px;
  }
`;
