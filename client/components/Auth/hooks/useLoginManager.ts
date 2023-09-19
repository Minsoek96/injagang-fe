import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { clearAuthError, getProfile } from "@/components/redux/Auth/actions";
import { RootReducerType } from "@/components/redux/store";

import { ERROR_MESSAGES } from "@/constants";

const useLoginManager = () => {
  const dispatch = useDispatch();
  const [userMsg, setUserMsg] = useState<string>("");
  const { error, success } = useSelector(
    (state: RootReducerType) => state.auth,
  );
  const router = useRouter();

  useEffect(() => {
    if (success) {
      dispatch(getProfile());
      dispatch(clearAuthError());
      router.replace("/");
      return;
    }
    if (error) {
      setUserMsg(ERROR_MESSAGES.DOESN_T_MATCH);
    }
  }, [error, success]);

  return { userMsg };
};

export default useLoginManager;
