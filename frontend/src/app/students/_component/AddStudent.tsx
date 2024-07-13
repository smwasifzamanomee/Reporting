"use client";

import { useEffect, useState } from "react";
import { AddCircleOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { CoursePayload, useCreateCourse } from "@/hook/reactQuery/courseQuery";
import { useDepartments } from "@/hook/reactQuery/departmentQuery";
import { StudentPayload, useCreateStudent } from "@/hook/reactQuery/studentQuery";

const AddStudent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<StudentPayload>({
    name: "",
    email: "",
    department: "",
  });

  const { createStudentMutation } = useCreateStudent();

  const [departments, setDepartments] = useState<{ department: string, department_name: string }[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<{ department: string, department_name: string } | null>(null);

  const {getDepartmentsQuery} = useDepartments(open);

  useEffect(() => {
    if (getDepartmentsQuery.data?.results) {
      const departmentData = getDepartmentsQuery.data.results.map((item) => ({
        department: item.id.toString(), // Convert brand_id to string
        department_name: item.name,
      }));
      setDepartments(departmentData);
    }
  }, [getDepartmentsQuery.data]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onClose = () => {
    setFormData({
      name: "",
      email: "",
      department: "",
    });

    setOpen(false);
  };

  const validateDepartmentInfo = () => {
    if (!formData.name || formData.name === "") {
      toast.error("name is required", {
        toastId: "name",
        closeOnClick: true,
        autoClose: 3000,
      });
      return false;
    }
    if (!formData.email || formData.email === "") {
      toast.error("email is required", {
        toastId: "code",
        closeOnClick: true,
        autoClose: 3000,
      });
      return false;
    }
    if (!formData.department || formData.department === "") {
      toast.error("department is required", {
        toastId: "department",
        closeOnClick: true,
        autoClose: 3000,
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
      createStudentMutation.mutate(payload, {
        onSuccess: (data) => {
          if (data.status === 201) {
            toast.success("student created successfully", {
              toastId: "create_student_success",
              closeOnClick: true,
              autoClose: 2000,
            });
            setFormData({
              name: "",
              email: "",
              department: "",
            });
            setOpen(false);
          }
        },
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
        Add Student
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          component="form"
          onSubmit={handleOnSubmit}
          sx={{
            maxWidth: "650px",
            width: "100%",
            py: 8,
            px: 6,
            bgcolor: "background.paper",
            borderRadius: "4px",
            height: "70vh",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
          <Stack spacing={6}>
            {/* Your form fields */}

            <Typography
              variant="h6"
              sx={{
                color: "text.primary",
                fontSize: "24px",
                fontWeight: 500,
                lineHeight: "24px",
                letterSpacing: "0.15px",
              }}
            >
              Add Student
            </Typography>
            <TextField
              name="name"
              label="Name *"
              value={formData.name}
              onChange={handleOnChange}
            />
            <TextField
              name="email"
              label="Email *"
              value={formData.email}
              onChange={handleOnChange}
            />
            <Autocomplete
              id="department"
              options={departments}
              getOptionLabel={(option) => option.department_name}
              value={selectedDepartment}
              onChange={(e, value) => {
                setSelectedDepartment(value);
                setFormData((prevData) => ({
                  ...prevData,
                  department: value?.department || "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Department *"
                  name="department"
                  value={formData.department}
                />
              )}
            />
            {/* Your action buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                size="large"
                onClick={onClose}
                type="button"
                variant="outlined"
                color="error"
              >
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

export default AddStudent;
