import { useEffect } from "react";

import {
  useMeQuery,
} from "@/features/auth/authApi";

import {
  useAppDispatch,
} from "@/store/hooks";

import {
  logout,
  setUser,
  finishInitialization,
} from "@/features/auth/authSlice";

export default function useAuth() {
  const dispatch =
    useAppDispatch();

  const {
    data,
    error,
    isSuccess,
    isLoading,
  } = useMeQuery();

  useEffect(() => {
    if (isSuccess && data) {
      const userPayload = (data as any).data ?? data;
      dispatch(
        setUser(userPayload)
      );
    }

    if (error) {
      dispatch(logout());
    }

    if (
      !isLoading &&
      !isSuccess &&
      !error
    ) {
      dispatch(
        finishInitialization()
      );
    }
  }, [
    data,
    error,
    isLoading,
    isSuccess,
    dispatch,
  ]);

  return {
    isLoading,
  };
}