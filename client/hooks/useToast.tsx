import React, { useCallback } from "react";

import { v4 as uuid4 } from "uuid";

import styled from "styled-components";

import ToastItem from "./toast/ToastItem";

import { TOAST_MODE } from "@/constants";

import useToastStore from "@/store/toast/useToastStore";

export interface IToast {
  id: string;
  message: string;
  mode: TOAST_MODE;
  duration: number;
  startTime: number;
}

export type TOAST_MODE = (typeof TOAST_MODE)[keyof typeof TOAST_MODE];

const useToast = (duration: number = 3000) => {
  const { toastList, showToastAction, hideToastAction } = useToastStore();

  const showToast = useCallback(
    (mode: TOAST_MODE = "Info", message: string) => {
      const id = uuid4();
      const startTime = Date.now();
      const newToastList = { id, mode, message, duration, startTime };
      showToastAction(newToastList);
      hideToast(id);
    },
    [],
  );

  const hideToast = useCallback(
    (id: string) => {
      const timeoutId = setTimeout(() => {
        hideToastAction(id);
      }, duration);
      return () => clearTimeout(timeoutId);
    },
    [],
  );

  const RenderToast: React.FC = () => (
    <ToastContainer>
      {toastList &&
        toastList.map(toast => <ToastItem key={toast.id} {...toast} />)}
    </ToastContainer>
  );
  return [showToast, RenderToast] as const;
};
export default useToast;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;
