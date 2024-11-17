import { saveAs } from 'file-saver';

type Props = {
  video: Blob[];
  recordInfoList: {
    script: string;
    timer: string;
  }[];
  question: string[];
  counter: number;
};

export function useDownloadLogic({
  video,
  recordInfoList,
  question,
  counter,
}: Props) {
  const downloadScript = () => {
    if (recordInfoList.length) {
      const recordInfos = new Blob(
        [
          `질문내용 : ${question[counter]}\n`,
          `작성한 대본 : ${recordInfoList[counter]?.script}\n`,
          `녹화시간 : ${recordInfoList[counter]?.timer}\n`,
        ],
        {
          type: 'text/plain;charset=utf-8',
        },
      );

      const url = URL.createObjectURL(recordInfos);

      saveAs(recordInfos, `${question[counter]}대본.txt`);

      URL.revokeObjectURL(url);
    }
  };

  const downloadVideo = () => {
    if (video.length > 0) {
      const url = URL.createObjectURL(video[counter]);
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          saveAs(blob, `${question[counter]}.mp4`);
          URL.revokeObjectURL(url);
        });
      downloadScript();
    }
  };

  return { downloadVideo };
}
