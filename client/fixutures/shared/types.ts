type MockMediaRecorder = {
  start: jest.Mock;
  stop: jest.Mock;
  pause: jest.Mock;
  resume: jest.Mock;
  ondataavailable: jest.Mock;
  isTypeSupported: jest.Mock;
};

type MockStream = {
  getAudioTracks: jest.Mock;
  getVideoTracks: jest.Mock;
};

type MockHTMLVideoElement = {
    srcObject: MediaStream | null;
};

export { type MockMediaRecorder, type MockStream, type MockHTMLVideoElement };
