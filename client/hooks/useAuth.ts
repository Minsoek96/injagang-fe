import { useEffect } from "react";

import Cookies from "js-cookie";

import { useFetchUserInfo } from "@/api/AUTH/mutations";

//인증을 위한 훅
export const useAuth = () => {
  const { mutate: getProfile, isSuccess } = useFetchUserInfo();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      return;
    }
    getProfile();
  }, []);

  return isSuccess;
};
