"use client";
import { useEffect, useState } from "react";
import { DriveFileRenameOutlineRounded } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  Department,
  useDepartments,
  useModifyDepartment,
} from "@/hook/reactQuery/departmentQuery";
import { Student, useModifyStudent } from "@/hook/reactQuery/studentQuery";

type Props = {
  student: Student;
};

const ModifyStudent = ({ student }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Student>({ ...student });
  const { modifyStudentMutation } = useModifyStudent();

  console.log(formData);

  const [departments, setDepartments] = useState<
    { department: string; department_name: string }[]
  >([]);
  const [selectedDepartment, setSelectedDepartment] = useState<{
    department: string;
    department_name: string;
  } | null>(null);

  console.log(selectedDepartment);

  const { getDepartmentsQuery } = useDepartments(open);

  useEffect(() => {
    if (getDepartmentsQuery.data?.results) {
      const departmentData = getDepartmentsQuery.data.results.map((item) => ({
        department: item.id.toString(),
        department_name: item.name,
      }));
      setDepartments(departmentData);

      const selected = departmentData.find(
        (item) => item.department === student.department.toString()
      );

      console.log(selected);
      setSelectedDepartment(selected || null);
    }
  }, [getDepartmentsQuery.data, student.department]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onClose = () => {
    setFormData({ ...student });
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
      toast.error("code is required", {
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
      modifyStudentMutation.mutate(payload, {
        onSuccess: (data) => {
          if (data.status === 200) {
            toast.success("student updated successfully", {
              toastId: "update_student_success",
              closeOnClick: true,
              autoClose: 2000,
            });
            setOpen(false);
          }
        },
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
              Modify Student
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
              value={selectedDepartment}
              onChange={(event, newValue) => {
                setSelectedDepartment(newValue);
                setFormData((prevData) => ({
                  ...prevData,
                  department: newValue?.department || "",
                }));
              }}
              options={departments}
              getOptionLabel={(option) => option.department_name}
              renderInput={(params) => (
                <TextField {...params} label="Department *" />
              )}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option.department_name}
                </Box>
              )}
            />
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

export default ModifyStudent;
