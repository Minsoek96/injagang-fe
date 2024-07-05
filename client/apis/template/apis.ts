import { IAddTemplate, IGetTemplate } from '@/types/template/TemplateType';
import { TEMPLATE_APIS } from '../config';
import { fetcher, METHOD } from '../client';

export const getTemplate = async (): Promise<IGetTemplate[]> =>
  fetcher(METHOD.GET, TEMPLATE_APIS.GET_API)
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const addTemplate = async (templatePayload: IAddTemplate) =>
  fetcher(METHOD.POST, TEMPLATE_APIS.ADD_API, templatePayload);

export const deleteTemplate = async (targetId: number) =>
  fetcher(METHOD.DELETE, `${TEMPLATE_APIS.DELTE_API}${targetId}`);
