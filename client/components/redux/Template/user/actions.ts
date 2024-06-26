import { IGetTemplate } from "@/types/template/TemplateType";
import { SET_CUR_TEMPLATE_LIST, ADD_TEMPLATE_TOGGLE, INIT_CUR_TEMPLATE_LIST } from "./types";

export const setCurTemplateList = (TemplateList: IGetTemplate) => ({
  type: SET_CUR_TEMPLATE_LIST,
  payload: { selectedTemplateList: TemplateList },
});

export const addTemplaetToggle = (isAddTemplate: boolean = true) => ({
  type: ADD_TEMPLATE_TOGGLE,
  payload: { isAddTemplate },
});

export const clearCurTemplateList = () => (
  {type: INIT_CUR_TEMPLATE_LIST}
)