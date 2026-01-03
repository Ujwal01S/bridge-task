import { getAuthFn, type IAuthPayload } from "@/api/functions/auth";
import { notificationMessage } from "@/constants";
import { useAuthStore } from "@/store/use-auth-store";
import {
  errorNotification,
  successNotification,
} from "@/utils/toast-notification";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const { mutate: login, isPending: loginIsPending } = useMutation({
    mutationFn: async (payload: IAuthPayload) => getAuthFn.login(payload),
    onSuccess: (data) => {
      setUser({
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        image: data.image,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      successNotification({
        header: "Login Success",
        description: notificationMessage.LOGIN_SUCCESS,
      });
      navigate("/");
    },
    onError: (error: Error) => {
      errorNotification({
        header: "Login Failed",
        description: error.message || notificationMessage.LOGIN_FAIL,
      });
    },
  });

  return { login, loginIsPending };
};
