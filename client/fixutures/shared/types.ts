type MockTrack = {
  stop: jest.Mock;
}

type MockStream = {
  getTracks: () => MockTrack[];
}

type MockMediaRecorder = {
  start: jest.Mock;
  stop: jest.Mock;
  pause: jest.Mock;
  resume: jest.Mock;
  ondataavailable: ((event: BlobEvent) => void) | null;
  stream: MockStream;
};

type MockHTMLVideoElement = {
  srcObject: MediaStream | null;
};

type MockUtterance = {
  lang: string | null;
  onboundary: null;
  onend: jest.Mock;
  onerror: null;
  onmark: null;
  onpause: null;
  onresume: null;
  onstart: null;
  pitch: number;
  rate: number;
  text: string;
  voice: null;
  volume: number;
};

type MockSpeech = {
  onvoiceschanged: null,
  paused: boolean,
  pending: boolean,
  speacking: boolean,
  speak: jest.Mock
}

export {
  type MockMediaRecorder,
  type MockStream,
  type MockHTMLVideoElement,
  type MockUtterance,
  type MockSpeech,
};
