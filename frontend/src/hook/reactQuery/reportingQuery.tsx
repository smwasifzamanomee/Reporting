"use client";

import { axiosPrivate } from "@/lib/AxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type Report = {
    id: number;
    name: string;
    students_count: number;
    courses_count: number;
    results?: Report[];
};

export type Metrics = {
  departments: number;
  students: number;
  courses: number;
};

const useGetReport = () => {
  const url = "api/department-details/";
  const reportQuery = useQuery<Report, AxiosError>({
    queryKey: ["report"],
    queryFn: async () => {
      const { data } = await axiosPrivate<Report>(url, "get");
      return data;
    },
  });

  return { reportQuery };
};

const useGetAllMetrics = () => {
  const url = "utils/metrics/";
  const metricsQuery = useQuery<Metrics, AxiosError>({
    queryKey: ["metrics"],
    queryFn: async () => {
      const { data } = await axiosPrivate<Metrics>(url, "get");
      return data;
    },
  });

  return { metricsQuery };
};

export { useGetReport, useGetAllMetrics };
