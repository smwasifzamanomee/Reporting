"use client";
import axios from "axios";

// config.ts
export const BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || '';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

export default axiosInstance;