import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/src/shared/hooks';

import { IAddTemplate } from '@/src/entities/template/type';

import { ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_MODE } from '@/src/shared/const';

import { addTemplate, deleteTemplate } from './apis';

import template from './queryKeys';

const useAddTemplate = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTemplate: IAddTemplate) => addTemplate(newTemplate),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: template.all });
      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.ADDED_TEMPLATE);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.ADDED_TEMPLATE);
    },
  });
};

const useDeleteTemplate = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTemplate(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: template.all });
      showToast(TOAST_MODE.SUCCESS, SUCCESS_MESSAGES.DELETED_TEMPLATE);
    },

    onError: () => {
      showToast(TOAST_MODE.ERROR, ERROR_MESSAGES.DELETED_TEMPLATE);
    },
  });
};

export { useAddTemplate, useDeleteTemplate };
