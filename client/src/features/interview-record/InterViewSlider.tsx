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
      <h2>
        질문:
        {question[idx]}
      </h2>
      <h2>나의 대답: </h2>
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
`;
