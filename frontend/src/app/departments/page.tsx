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
import { Report, useGetAllReports } from '@/hook/reactQuery/reportingQuery';
import { TableHeadCell } from '@/components/ui/TableHeadCell';
import Spinner from '@/components/ui/Spinner';
import MuiTablePagination from '@/components/ui/MuiTablePagination';
import { TableBodyCell } from '@/components/ui/TableBodyCell';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { Department, useGetAllDepartments } from '@/hook/reactQuery/departmentQuery';
import AddDepartment from './_components/AddDepartment';
import ModifyDepartment from './_components/ModifyDepartment';
import DeleteDepartment from './_components/DeleteDepartment';


const page = () => {

  const {
    departmentsQuery,
    onPageChange,
    onPageSizeChange,
    page,
    page_size,
  } = useGetAllDepartments()

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
          title="All Departments"
          action={<AddDepartment />}
        />
        <Divider />
        {departmentsQuery.isLoading ? <Spinner />
          :
          departmentsQuery?.data?.results.length === 0 ?
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
            departmentsQuery.isError ?
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
                    {departmentsQuery.data?.results.map((department: Department, index: number) => {
                      return (
                        <TableRow hover key={`${department.id}-${index}`}>
                          <TableBodyCell>{department.name}</TableBodyCell>
                          <TableBodyCell>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                              <ModifyDepartment department={department} />
                              <DeleteDepartment departmentId={department.id} />
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
        {departmentsQuery.data?.count && <CardActions sx={{ justifyContent: 'flex-end' }}>
          <MuiTablePagination
            count={departmentsQuery.data?.count || 0}
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