import { IAddTemplate } from '@/types/template/TemplateType';
import { TEMPLATE_APIS } from '../config';
import { fetcher, METHOD } from '../client';

export const getTemplateAPI = async () =>
  fetcher(METHOD.GET, TEMPLATE_APIS.GET_API);

export const addTemplateAPI = async (templatePayload: IAddTemplate) =>
  fetcher(METHOD.POST, TEMPLATE_APIS.ADD_API, templatePayload);

export const deleteTemplateAPI = async (targetId: number) =>
  fetcher(METHOD.DELETE, `${TEMPLATE_APIS.DELTE_API}${targetId}`);
