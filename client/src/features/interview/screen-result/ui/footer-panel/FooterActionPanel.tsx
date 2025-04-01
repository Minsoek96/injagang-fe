import { useIntvContentStore, useIntvRecordStore } from '@/src/entities/interview_question';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { MdOutlineFileDownload, MdOutlineReplay } from 'react-icons/md';

import { HideSvg } from '@/src/shared/ui';

import { ResultStateProps, useDownloadHandler } from '../../model';

type Props = {
    resultState : ResultStateProps;
};

export default function FooterActionPanel({ resultState }: Props) {
  const setFeedModal = useIntvContentStore((state) => state.setFeedModalOpen);
  const setInterviewMode = useIntvRecordStore(
    (state) => state.setInterviewMode,
  );
  const { downloadVideo } = useDownloadHandler({ ...resultState });
  return (
    <>
      <HideSvg
        Logo={<MdOutlineFileDownload />}
        label="다운로드"
        onClick={downloadVideo}
        sx={{ fontSize: '3.5rem' }}
      />
      <HideSvg
        Logo={<AiOutlineFileSearch />}
        label="피드백 분석 요청"
        onClick={() => setFeedModal(true)}
        sx={{ fontSize: '3.5rem' }}
      />
      <HideSvg
        Logo={<MdOutlineReplay />}
        label="면접장으로"
        onClick={() => setInterviewMode('record')}
        sx={{ fontSize: '3.5rem' }}
      />
    </>
  );
}
