"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { useLoginMutation } from "@/hook/reactQuery/AuthQuery";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

type LoginState = {
  email: string;
  password: string;
};

const initialState: LoginState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [state, setState] = useState<LoginState>({ ...initialState });
  const [loading, setLoading] = useState<boolean>(false);
  const { loginMutation } = useLoginMutation();
  const router = useRouter();
  const { setUser } = useUser();

  const { email, password } = state;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const validateLoginInfo = () => {
    if (!email.trim()) {
      toast.error("Please enter email");
      return false;
    }
    if (!password.trim()) {
      toast.error("Please enter password");
      return false;
    }
    return true;
  };

  const getFormData = () => {
    const formData = new FormData();
    if (email) formData.append("email", email);
    if (password) formData.append("password", password);
    return formData;
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateLoginInfo();
    if (isValid) {
      setLoading(true);
      const formData = getFormData();
      loginMutation.mutate(formData, {
        onError: (error) => {
          console.error("Error occurred while logging in", error);
          setLoading(false);
        },
        onSuccess: (data: AxiosResponse) => {
          setLoading(false);
          toast.success("Login successful");
          setUser(data.data.access_token);
          localStorage.setItem("access_token", JSON.stringify(data.data.access_token));
          localStorage.setItem("refresh_token", JSON.stringify(data.data.refresh));
          localStorage.setItem("user", JSON.stringify(data.data));
          router.push("/");
        },
      });
    }
  };

  const isReadyToSubmit = useMemo(() => {
    return email.trim() !== "" && password.trim() !== "";
  }, [email, password]);

  return (
    <>

      <Stack component="form" onSubmit={handleLogin}>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField
            variant="outlined"
            fullWidth
            name="email"
            value={email}
            onChange={handleOnChange}
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={password}
            onChange={handleOnChange}
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          {/* <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup> */}
          {/* <Typography
            component={Link}
            href="/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography> */}
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={!isReadyToSubmit}
            loading={loading}
          >
            Sign In
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default AuthLogin;