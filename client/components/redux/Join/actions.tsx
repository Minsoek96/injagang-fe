import {
  SIGNUP_REQUEST,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_CLEAR,
  signupDispatchType,
} from "./types";
import { METHOD } from "@/util/fecher";
import fetcher from "@/util/fecher";
import { Dispatch } from "redux";

type MembershipRequest = {
  loginId: string;
  password: string;
  passwordCheck: string;
  email: string;
  nickname: string;
};

export const memberShipRequest =
  (joinData: MembershipRequest) =>
  async (dispatch: Dispatch<signupDispatchType>): Promise<void> => {
    try {
      dispatch({ type: SIGNUP_REQUEST });
      const response = await fetcher(METHOD.POST, "/signup", joinData);
      if (response) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: {
            status: response.status,
          },
        });
      }
    } catch (error: any) {
      dispatch({ type: SIGNUP_FAILURE, payload: { error } });
    }
  };

export const memberShipCleare = () => ({
  type: SIGNUP_CLEAR,
});