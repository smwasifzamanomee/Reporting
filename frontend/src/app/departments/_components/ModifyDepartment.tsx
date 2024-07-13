"use client";
import { useState } from 'react';
import { DriveFileRenameOutlineRounded } from '@mui/icons-material';
import { Autocomplete, Box, Button, IconButton, Modal, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { Department, useModifyDepartment } from '@/hook/reactQuery/departmentQuery';

type Props = {
  department: Department
};

const ModifyDepartment = ({ department }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Department>({ ...department });
  const { modifyDepartmentMutation } = useModifyDepartment();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onClose = () => {
    setFormData({ ...department });
    setOpen(false);
  }

  const validateDepartmentInfo = () => {
    if (!formData.name || formData.name === '') {
      toast.error('name is required', {
        toastId: 'name',
        closeOnClick: true,
        autoClose: 3000
      });
      return false;
    }
    return true;
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateDepartmentInfo()) {
      const payload = {
        ...formData,
      };
      modifyDepartmentMutation.mutate(payload, {
        onSuccess: (data) => {
          if (data.status === 200) {
            toast.success("Department updated successfully", {
              toastId: "update_department_success",
              closeOnClick: true,
              autoClose: 2000,
            });
            setOpen(false);
          }
        }
      });
    }
  };

  return (
    <>
      <IconButton color="info" onClick={() => setOpen(true)}>
        <DriveFileRenameOutlineRounded fontSize="medium" />
      </IconButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          component="form"
          onSubmit={handleOnSubmit}
          sx={{
            maxWidth: '650px',
            width: '100%',
            py: 8,
            px: 6,
            bgcolor: 'background.paper',
            borderRadius: '4px',
            height: '40vh',
            overflowY: 'auto',
            scrollbarWidth: 'none'
          }}
        >
          <Stack
            spacing={6}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'text.primary',
                fontSize: '24px',
                fontWeight: 500,
                lineHeight: '24px',
                letterSpacing: '0.15px',
              }}
            >
              Modify Department
            </Typography>
            <TextField
              name="name"
              label="Name *"
              value={formData.name}
              onChange={handleOnChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button size="large" onClick={onClose} type="button" variant="outlined" color="error">
                Cancel
              </Button>
              <Button size="large" type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ModifyDepartment;