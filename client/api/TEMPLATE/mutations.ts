import { useMutation, useQueryClient } from "@tanstack/react-query";
import template from "./queryKeys";

import { addTemplate, deleteTemplate } from "./apis";

import useToast from "@/hooks/useToast";

import { IAddTemplate } from "@/types/template/TemplateType";

import { ERROR_MESSAGES, SUCCESS_MESSAGES, TOAST_MODE } from "@/constants";

const useAddTemplate = () => {
  const [showToast] = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (template: IAddTemplate) => addTemplate(template),

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
  const [showToast] = useToast();
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
