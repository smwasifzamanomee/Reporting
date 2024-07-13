"use client";

import { useState } from 'react';
import { AddCircleOutlined } from '@mui/icons-material';
import { Autocomplete, Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { DepartmentPayload, useCreateDepartment } from '@/hook/reactQuery/departmentQuery';

const AddDepartment = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<DepartmentPayload>({
    name: '',
  });

  const { createDepartmentMutation } = useCreateDepartment();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onClose = () => {
    setFormData({
      name: '',
      
    });
    
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
      createDepartmentMutation.mutate(payload, {
        onSuccess: (data) => {
          if (data.status === 201) {
            toast.success("department created successfully", {
              toastId: "create_department_success",
              closeOnClick: true,
              autoClose: 2000,
            });
            setFormData({
              name: '',
             
            });
            setOpen(false);
          }
        }
      });
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        startIcon={<AddCircleOutlined />}
      >
        Add Department
      </Button>
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
          <Stack spacing={6}>
            {/* Your form fields */}

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
              Add Department
            </Typography>
            <TextField
              name="name"
              label="Name *"
              value={formData.name}
              onChange={handleOnChange}
            />
            {/* Your action buttons */}
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

export default AddDepartment;