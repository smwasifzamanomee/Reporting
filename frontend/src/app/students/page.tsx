'use client';

import * as React from 'react';
import { TableContainer, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import PageContainer from '../(DashboardLayout)/components/container/PageContainer'
import { TableHeadCell } from '@/components/ui/TableHeadCell';
import Spinner from '@/components/ui/Spinner';
import MuiTablePagination from '@/components/ui/MuiTablePagination';
import { TableBodyCell } from '@/components/ui/TableBodyCell';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { Department, useGetAllDepartments } from '@/hook/reactQuery/departmentQuery';
import { Course, useGetAllCourses } from '@/hook/reactQuery/courseQuery';
import { Student, useGetAllStudents } from '@/hook/reactQuery/studentQuery';
import AddStudent from './_component/AddStudent';
import ModifyStudent from './_component/ModifyStudent';
import DeleteStudent from './_component/DeleteStudent';



const page = () => {

  const {
    studentsQuery,
    onPageChange,
    onPageSizeChange,
    page,
    page_size,
  } = useGetAllStudents()

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Card sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'white',
        maxHeight: '80vh',
      }}>

        <CardHeader
          sx={{
            color: 'primary.main',
            fontSize: '18px',
            fontWeight: 500,
            lineHeight: '24px',
            letterSpacing: '0.15px',
            
            py: 4.5,
          }}
          title="All Students"
          action={<AddStudent />}
        />
        <Divider />
        {studentsQuery.isLoading ? <Spinner />
          :
          studentsQuery?.data?.results.length === 0 ?
            <Typography
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "18px",
              }}
            >
              No Reporting found
            </Typography>
            :
            studentsQuery.isError ?
              <ErrorMessage /> :
              <TableContainer sx={{ flex: 1, overflowX: 'auto', scrollbarWidth: 'none' }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  sx={{
                    minWidth: 'max-content',
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableHeadCell>Student Name</TableHeadCell>
                      <TableHeadCell>Student Email</TableHeadCell>
                      <TableHeadCell>Department Name</TableHeadCell>
                      <TableHeadCell
                        sx={(theme) => ({
                          width: '200px',
                          [theme.breakpoints.down('md')]: {
                            width: 'auto',
                          }
                        })}
                      >
                        Action
                      </TableHeadCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {studentsQuery.data?.results.map((student: Student, index: number) => {
                      return (
                        <TableRow hover key={`${student.id}-${index}`}>
                          <TableBodyCell>{student.name}</TableBodyCell>
                          <TableBodyCell>{student.email}</TableBodyCell>
                          <TableBodyCell>{student.department_name}</TableBodyCell>
                          <TableBodyCell>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                              <ModifyStudent student={student} />
                              <DeleteStudent studentId={student.id} />
                            </Box>
                          </TableBodyCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>

                </Table>
              </TableContainer>
        }
        {/* <Divider /> */}
        {studentsQuery.data?.count && <CardActions sx={{ justifyContent: 'flex-end' }}>
          <MuiTablePagination
            count={studentsQuery.data?.count || 0}
            page={page}
            page_size={page_size}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </CardActions>}
      </Card>
    </PageContainer>
  );
};
export default page;