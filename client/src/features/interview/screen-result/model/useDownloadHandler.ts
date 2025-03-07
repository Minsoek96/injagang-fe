import { saveAs } from 'file-saver';

type Props = {
  video: Blob[];
  recordInfoList: {
    script: string;
    timer: string;
    voiceScript: string;
  }[];
  question: string[];
  counter: number;
};

export function useDownloadHandler({
  video, recordInfoList, question, counter,
}: Props) {
  const downloadScript = () => {
    if (!recordInfoList[counter]) return;
    const { script, timer, voiceScript } = recordInfoList[counter];

    const recordInfoBlob = new Blob(
      [
        `질문내용 : ${question[counter]}\n`,
        `작성한 대본 : ${script || '없음'}\n`,
        `발음 확인 : ${voiceScript || '없음'}\n`,
        `녹화시간 : ${timer || '00:00'}\n`,
      ],
      { type: 'text/plain;charset=utf-8' },
    );

    saveAs(recordInfoBlob, `${question[counter]}_대본.txt`);
  };

  const downloadVideo = () => {
    if (!video[counter]) return;
    saveAs(video[counter], `${question[counter]}.mp4`);
    downloadScript();
  };

  return { downloadVideo };
}
