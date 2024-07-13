"use client";
import { axiosPrivate } from "@/lib/AxiosPrivate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export type StudentPayload = {
    name: string;
    email: string;
    department: string
    department_name?: string;
}

export type Student = {
    id: number;
    name: string;
    email: string;
    department: string;
    department_name?: string;
    results?: Student[];
}

type Result<T> = {
    next: string | null;
    previous: string | null;
    count: number;
    results: T;
    message: string;
};

const useGetAllStudents = () => {
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

    const url = `api/student/?${searchParams.toString()}`;

    const studentsQuery = useQuery<Result<Student[]>, AxiosError>({
        queryKey: ['student', props.page, props.page_size],
        queryFn: async () => {
            const { data } = await axiosPrivate<Result<Student[]>>(url, 'get');
            return data;
        },
    });

    return {
        studentsQuery,
        onPageChange,
        onPageSizeChange,
        ...props,
    };
};

const useStudents = (open: boolean) => {
    const url = 'api/student/'
    const getStudentsQuery = useQuery<Student, AxiosError>({
        queryKey: ['student'],
        queryFn: async () => {
            const { data } = await axiosPrivate<Student>(url, 'get');
            return data;
        },
        enabled: open
    });

    return { getStudentsQuery };

}

const useCreateStudent = () => {
    const queryClient = useQueryClient();
    const createStudentMutation = useMutation({
        mutationFn: async (payload: StudentPayload) => {
            return await axiosPrivate<StudentPayload>('api/student/', 'post', payload, true);
        },
        onError(error: AxiosError) {
            const status = error.response?.status;
            if (status === 500) {
                toast.error('Internal server error!', {
                    toastId: 'create_student_error',
                    closeOnClick: true,
                    autoClose: 3000,
                });
            }
            throw error;
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['student'] });
        },
    });
    return { createStudentMutation };
}

const useModifyStudent = () => {
    const queryClient = useQueryClient();

    const modifyStudentMutation = useMutation({
        mutationFn: async (payload: Student) => {
            return await axiosPrivate<Student>(`api/student/${payload.id}/`, 'patch', payload);
        },
        onError(error: AxiosError) {
            const status = error.response?.status;
            if (status === 500) {
                toast.error('Internal server error!', {
                    toastId: 'update_student_error',
                    closeOnClick: true,
                    autoClose: 3000,
                });
            }
            throw error;
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['student'] });
        },
    });

    return { modifyStudentMutation };
};

const useDeleteStudent = () => {
    const queryClient = useQueryClient();
    const deleteStudentMutation = useMutation({
        mutationFn: async (id: string) => {
            return await axiosPrivate(`api/student/${id}/`, 'delete');
        },
        onError(error: AxiosError) {
            const status = error.response?.status;
            if (status === 500) {
                toast.error('Internal server error!', {
                    toastId: 'delete_student_error',
                    closeOnClick: true,
                    autoClose: 3000,
                });
            }
            throw error;
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['student'] });
        },
    });
    return { deleteStudentMutation };
};

export { useGetAllStudents, useStudents, useCreateStudent, useModifyStudent, useDeleteStudent }