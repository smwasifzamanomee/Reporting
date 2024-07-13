"use client";
import { axiosPrivate } from "@/lib/AxiosPrivate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export type DepartmentPayload = {
    name: string;
}

export type Department = {
    id: number;
    name: string;
    results?: Department[];
}

type Result<T> = {
    next: string | null;
    previous: string | null;
    count: number;
    results: T;
    message: string;
};

const useGetAllDepartments = () => {
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

    const url = `api/department/?${searchParams.toString()}`;

    const departmentsQuery = useQuery<Result<Department[]>, AxiosError>({
        queryKey: ['department', props.page, props.page_size],
        queryFn: async () => {
            const { data } = await axiosPrivate<Result<Department[]>>(url, 'get');
            return data;
        },
    });

    return {
        departmentsQuery,
        onPageChange,
        onPageSizeChange,
        ...props,
    };
};

const useDepartments = (open: boolean) => {
    const url = 'api/department/'
    const getDepartmentsQuery = useQuery<Department, AxiosError>({
        queryKey: ['department'],
        queryFn: async () => {
            const { data } = await axiosPrivate<Department>(url, 'get');
            return data;
        },
        enabled: open
    });

    return { getDepartmentsQuery };

}

const useCreateDepartment = () => {
    const queryClient = useQueryClient();
    const createDepartmentMutation = useMutation({
        mutationFn: async (payload: DepartmentPayload) => {
            return await axiosPrivate<DepartmentPayload>('api/department/', 'post', payload, true);
        },
        onError(error: AxiosError) {
            const status = error.response?.status;
            if (status === 500) {
                toast.error('Internal server error!', {
                    toastId: 'create_product_error',
                    closeOnClick: true,
                    autoClose: 3000,
                });
            }
            throw error;
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['department'] });
        },
    });
    return { createDepartmentMutation };
}

const useModifyDepartment = () => {
    const queryClient = useQueryClient();

    const modifyDepartmentMutation = useMutation({
        mutationFn: async (payload: Department) => {
            return await axiosPrivate<Department>(`api/department/${payload.id}/`, 'patch', payload);
        },
        onError(error: AxiosError) {
            const status = error.response?.status;
            if (status === 500) {
                toast.error('Internal server error!', {
                    toastId: 'update_product_error',
                    closeOnClick: true,
                    autoClose: 3000,
                });
            }
            throw error;
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['department'] });
        },
    });

    return { modifyDepartmentMutation };
};

const useDeleteDepartment = () => {
    const queryClient = useQueryClient();
    const deleteDepartmentMutation = useMutation({
        mutationFn: async (id: string) => {
            return await axiosPrivate(`api/department/${id}/`, 'delete');
        },
        onError(error: AxiosError) {
            const status = error.response?.status;
            if (status === 500) {
                toast.error('Internal server error!', {
                    toastId: 'delete_product_error',
                    closeOnClick: true,
                    autoClose: 3000,
                });
            }
            throw error;
        },
        onSettled() {
            queryClient.invalidateQueries({ queryKey: ['department'] });
        },
    });
    return { deleteDepartmentMutation };
};

export { useGetAllDepartments, useDepartments, useCreateDepartment, useModifyDepartment, useDeleteDepartment }