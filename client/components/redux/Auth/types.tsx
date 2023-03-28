export const AUTHENTICATE_REQUEST = "AUTHENTICATE_REQUEST";
export const AUTHENTICATE_SUCCESS = "AUTHENTICATE_SUCCESS";
export const AUTHENTICATE_FAILURE = "AUTHENTICATE_FAILURE";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS"
export const CLEAR_ERROR = "CLEAR_ERROR";

export interface authRequest {
  type: typeof AUTHENTICATE_REQUEST;
}

export interface CLEAR_ERROR {
  type: typeof CLEAR_ERROR;
}

export interface authFailDispatch {
  type: typeof AUTHENTICATE_FAILURE;
  payload: {
    error: any;
  };
}

export interface profileSuccessDispatch {
  type: typeof PROFILE_SUCCESS;
  payload: {
    nickname: string;
    role: string;
   }
}

export interface authSuccessDispatch {
  type: typeof AUTHENTICATE_SUCCESS;
  payload: {
    access: string;
    refresh: string;
  };
}

export type authDispatchType =
  | authRequest
  | authFailDispatch
  | authSuccessDispatch
  | profileSuccessDispatch
  | CLEAR_ERROR;
