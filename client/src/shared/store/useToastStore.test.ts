import { act } from 'react-dom/test-utils';

import { sampleToast } from '../../../fixutures/shared/index';

import useToastStore from './useToastStore';

describe('useToastStore 훅', () => {
  const resetStore = () => {
    act(() => {
      useToastStore.setState({ toastList: [] });
    });
  };

  beforeEach(() => {
    resetStore();
  });

  const addToast = (toast: typeof sampleToast) => {
    act(() => {
      useToastStore.getState().showToastAction(toast);
    });
  };

  const removeToast = (id: string) => {
    act(() => {
      useToastStore.getState().hideToastAction(id);
    });
  };

  const context = describe;

  context('토스트 알림이 추가되면', () => {
    it('토스트 리스트에 새로운 토스트가 추가되어야 한다.', () => {
      expect(useToastStore.getState().toastList).toHaveLength(0);

      addToast(sampleToast);

      const { toastList } = useToastStore.getState();
      expect(toastList).toHaveLength(1);
      expect(toastList[0]).toEqual(sampleToast);
    });
  });

  context('토스트 알림이 제거될 때', () => {
    it('toastList에서 해당 ID의 토스트가 제거되어야 한다.', () => {
      addToast(sampleToast);

      expect(useToastStore.getState().toastList).toHaveLength(1);

      removeToast(sampleToast.id);

      const { toastList } = useToastStore.getState();
      expect(toastList).toHaveLength(0);
    });
  });
});
