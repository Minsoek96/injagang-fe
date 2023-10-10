import {
  TEMPLATE_REQUEST,
  TEMPLATE_SUCCESS,
  TEMPLATE_FAILURE,
  templateDispatchType,
} from "./types";
import { Dispatch } from "redux";
import {
  addTemplateAPI,
  deleteTemplateAPI,
  getTemplateAPI,
} from "@/api/TEMPLATE/templateAPI";
import { IAddTemplate } from "@/types/template/TemplateType";


/**최초 로딩시 템플릿리스트 반환 */
export const getTemplate =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: TEMPLATE_REQUEST });
      const response = await getTemplateAPI();
      if (response) {
        dispatch({
          type: TEMPLATE_SUCCESS,
          payload: {
            templateState: response.data,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: TEMPLATE_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

/**템플릿 추가요청후 추가된 템플릿 리스트 반환 */
export const addTemplate =
  (listData: IAddTemplate) =>
  async (dispatch: Dispatch<templateDispatchType>): Promise<void> => {
    try {
      dispatch({ type: TEMPLATE_REQUEST });
      const request = await addTemplateAPI(listData);
      dispatch(getTemplate());
    } catch (error) {
      dispatch({
        type: TEMPLATE_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

/**템플릿을 삭제 요청후 삭제가 반영된 템플릿 요청*/
export const removeTemplate =
  (templateId: number) =>
  async (dispatch: Dispatch<templateDispatchType>): Promise<void> => {
    try {
      dispatch({ type: TEMPLATE_REQUEST });
      const request = await deleteTemplateAPI(templateId);
      dispatch(getTemplate());
    } catch (error) {
      dispatch({
        type: TEMPLATE_FAILURE,
        payload: {
          error,
        },
      });
    }
  };
