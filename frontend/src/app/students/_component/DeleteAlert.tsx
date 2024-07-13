'use client';

import { useDeleteCourse } from '@/hook/reactQuery/courseQuery';
import { useDeleteDepartment } from '@/hook/reactQuery/departmentQuery';
import { useDeleteStudent } from '@/hook/reactQuery/studentQuery';
import { CloseOutlined, DeleteForeverRounded, WarningAmberOutlined } from '@mui/icons-material';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    IconButton,
} from '@mui/material';
import { toast } from 'react-toastify';

interface DeleteAlertProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    studentId: number;
}

const DeleteAlert = ({ open, setOpen, studentId }: DeleteAlertProps) => {
    const onClose = () => setOpen(false);
    const { deleteStudentMutation } = useDeleteStudent();

    const handleDeletePurchase = () => {
        deleteStudentMutation.mutate(String(studentId), {
            onSuccess: (data) => {
                if (data.status === 204) {
                    toast.success('student deleted successfully', {
                        toastId: 'delete_student_success',
                        closeOnClick: true,
                        autoClose: 2000
                    });
                    setOpen(false);
                }
            }
        });
    }

    return (
        <>
            <IconButton color="error" onClick={() => setOpen(true)}>
                <DeleteForeverRounded fontSize="medium" />
            </IconButton>
            <Dialog open={open} onClose={onClose} role="alertdialog" fullWidth>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WarningAmberOutlined color="warning" />
                    Confirmation
                </DialogTitle>
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                    }}
                    onClick={onClose}
                >
                    <CloseOutlined />
                </IconButton>
                <Divider />
                <DialogContent>
                    <DialogContentText> Are you sure you want to delete this?</DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 2 }}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeletePurchase}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default DeleteAlert;