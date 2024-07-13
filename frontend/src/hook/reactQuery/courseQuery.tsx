"use client";
import { axiosPrivate } from "@/lib/AxiosPrivate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export type CoursePayload = {
    name: string;
    code: string;
    department: string
    department_name?: string;
}

export type Course = {
    id: number;
    name: string;
    code: string;
    department: string;
    department_name?: string;
    results?: Course[];
}

type Result<T> = {
    next: string | null;
    previous: string | null;
    count: number;
    results: T;
    message: string;
};

const useGetAllCourses = () => {
    const [props, setProps] = useState({
        page: 1,
        page_size: 10,
    });
    const searchParams = new URLSearchParams({
        page: String(props.page),
        page_size: String(props.page_size),
    });

    const onPageChange = (newPage: number) => {
        setProps((prev) => ({ ...prev, page: newPage }));
    };

    const onPageSizeChange = (newPageSize: number) => {
        setProps((prev) => ({ ...prev, page_size: newPageSize }));
        onPageChange(1);
    };

    const url = `api/course/?${searchParams.toString()}`;

    const coursesQuery = useQuery<Result<Course[]>, AxiosError>({
        queryKey: ['course', props.page, props.page_size],
        queryFn: async () => {
            const { data } = await axiosPrivate<Result<Course[]>>(url, 'get');
            return data;
        },
    });

    return {
        coursesQuery,
        onPageChange,
        onPageSizeChange,
        ...props,
    };
};

const useCourses = (open: boolean) => {
    const url = 'api/course/'
    const getCoursessQuery = useQuery<Course, AxiosError>({
        queryKey: ['course'],
        queryFn: async () => {
            const { data } = await axiosPrivate<Course>(url, 'get');
            return data;
        },
        enabled: open
    });

    return { getCoursessQuery };

}

const useCreateCourse = () => {
    const queryClient = useQueryClient();
    const createCourseMutation = useMutation({
        mutationFn: async (payload: CoursePayload) => {
            return await axiosPrivate<CoursePayload>('api/course/', 'post', payload, true);
        },
        onError(error: AxiosError) {
            const status = error.response?.status;
            if (status === 500) {
                toast.error('Internal server error!', {
                    toastId: 'create_course_error',
                    closeOnClick: true,
                    autoClose: 3000,
                });
            }
            throw error;
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['course'] });
        },
    });
    return { createCourseMutation };
}

const useModifyCourse = () => {
    const queryClient = useQueryClient();

    const modifyCourseMutation = useMutation({
        mutationFn: async (payload: Course) => {
            return await axiosPrivate<Course>(`api/course/${payload.id}/`, 'patch', payload);
        },
        onError(error: AxiosError) {
            const status = error.response?.status;
            if (status === 500) {
                toast.error('Internal server error!', {
                    toastId: 'update_course_error',
                    closeOnClick: true,
                    autoClose: 3000,
                });
            }
            throw error;
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['course'] });
        },
    });

    return { modifyCourseMutation };
};

const useDeleteCourse = () => {
    const queryClient = useQueryClient();
    const deleteCourseMutation = useMutation({
        mutationFn: async (id: string) => {
            return await axiosPrivate(`api/course/${id}/`, 'delete');
        },
        onError(error: AxiosError) {
            const status = error.response?.status;
            if (status === 500) {
                toast.error('Internal server error!', {
                    toastId: 'delete_course_error',
                    closeOnClick: true,
                    autoClose: 3000,
                });
            }
            throw error;
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['course'] });
        },
    });
    return { deleteCourseMutation };
};

export { useGetAllCourses, useCourses, useCreateCourse, useModifyCourse, useDeleteCourse }