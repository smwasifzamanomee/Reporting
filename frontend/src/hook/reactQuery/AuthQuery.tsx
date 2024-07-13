"use client";

import { axiosPrivate } from "@/lib/AxiosPrivate";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useLoginMutation = () => {
    const loginMutation = useMutation({
        mutationFn: async (user: any) => {
            return await axiosPrivate("user/login/", "post", user);
        },
        onError: (error: any) => {
            if (error?.response?.status === 400) {
                toast.error("Email or password is incorrect", {
                    toastId: "login_email_pass_error1",
                    closeOnClick: true,
                    autoClose: 3000,
                });
            } else if (
                error?.response?.status === 401 &&
                error?.response?.statusText === "Unauthorized"
            ) {
                toast.error("Invalid email or password.", {
                    toastId: "login_email_pass_error2",
                    closeOnClick: true,
                    autoClose: 3000,
                });
            } else if (error?.response?.status === 404) {
                toast.error("User with this email does not exist.", {
                    toastId: "login_email_pass_error3",
                    closeOnClick: true,
                    autoClose: 3000,
                });
            } else {
                toast.error("Something went wrong, Please try again later", {
                    toastId: "login_error",
                    closeOnClick: true,
                    autoClose: 3000,
                });
            }
        },
    });
    return { loginMutation };
};

export { useLoginMutation };