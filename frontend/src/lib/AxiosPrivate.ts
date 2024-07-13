"use client";

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { BASE_URL } from '../config/index';

// Define types for your tokens and other relevant data
type Tokens = {
  access_token: string | null;
  refresh_token: string | null;
};

type ErrorResponse = {
  config: AxiosRequestConfig;
  response?: {
    status: number;
  };
};

let isRefreshingToken = false;
let subscribers: ((token: string) => void)[] = [];

const getToken = (key: keyof Tokens): string | null => {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : null;
};

const setToken = (key: keyof Tokens, value: string | null): void => {
  localStorage.setItem(key, value || '');
};

const handleLogout = (): void => {
  // Your logout logic here
};

const addSubscriber = (callback: (token: string) => void): void => {
  subscribers.push(callback);
};

const onAccessTokenFetched = (access: string): void => {
  subscribers.forEach((callback) => callback(access));
  subscribers = [];
};

const resetTokenAndReattemptRequest = async (error: ErrorResponse) => {
  try {
    const refreshToken = getToken('refresh_token');
    if (!refreshToken) {
      handleLogout();
      return Promise.reject(error);
    }

    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber((accessToken) => {
        if (error.config.headers) {
          error.config.headers.Authorization = 'Bearer ' + accessToken;
        }
        resolve(axios(error.config));
      });
    });

    if (!isRefreshingToken) {
      isRefreshingToken = true;
      try {
        const { data, status } = await axios({
          method: 'POST',
          url: `${BASE_URL}/token-refresh/`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            refresh: refreshToken,
          },
        });
        if (!data) {
          handleLogout();
          isRefreshingToken = false;
          return Promise.reject(error);
        }
        const { access } = data;
        await setToken('access_token', access);
        isRefreshingToken = false;
        onAccessTokenFetched(access);
      } catch (err) {
        handleLogout();
        isRefreshingToken = false;
        return Promise.reject(error);
      }
    }
    return retryOriginalRequest;
  } catch (err) {
    handleLogout();
    isRefreshingToken = false;
    return Promise.reject(error);
  }
};

export async function axiosPrivate<T>(
  url: string,
  method: AxiosRequestConfig['method'],
  details: AxiosRequestConfig['data'] = {},
  formData = false
): Promise<AxiosResponse<T>> {
  const token = getToken('access_token');
  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': formData ? 'multipart/form-data' : 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config, response } = error;
      if (response?.status === 403) {
        return resetTokenAndReattemptRequest(error);
      }
      return Promise.reject(error);
    }
  );

  let requestDetails: AxiosRequestConfig = { ...details };
  requestDetails.url = url;
  requestDetails.method = method;
  requestDetails.data = details;
  return api(requestDetails) as Promise<AxiosResponse<T>>;
}