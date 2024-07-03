import { TEMPLATE_APIS } from "../config";
import { fetcher, METHOD } from "../client";

import { IAddTemplate, IGetTemplate } from "@/types/template/TemplateType";

export const getTemplate = async (): Promise<IGetTemplate[]> => {
  return fetcher(METHOD.GET, TEMPLATE_APIS.GET_API)
    .then(res => res.data)
    .catch(error => console.error(error));
};

export const addTemplate = async (templatePayload: IAddTemplate) => {
  return fetcher(METHOD.POST, TEMPLATE_APIS.ADD_API, templatePayload);
};

export const deleteTemplate = async (targetId: number) => {
  return fetcher(METHOD.DELETE, `${TEMPLATE_APIS.DELTE_API}${targetId}`);
};
