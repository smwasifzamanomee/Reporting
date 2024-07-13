'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import TotalDepartments from './components/dashboard/TotalDepartments';
import TotalStudents from './components/dashboard/TotalStudents';
import TotalCourses from '@/app/(DashboardLayout)/components/dashboard/TotalCourses';
import { useGetAllMetrics } from '@/hook/reactQuery/reportingQuery';
import ReportingOverview from './components/dashboard/ReportingOverview';

const Dashboard = () => {
  const { metricsQuery } = useGetAllMetrics();
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <ReportingOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TotalDepartments value={metricsQuery?.data?.departments || 0}/>
              </Grid>
              <Grid item xs={12}>
                <TotalStudents value={metricsQuery?.data?.students || 0}/>
              </Grid>
              <Grid item xs={12}>
                <TotalCourses value={metricsQuery?.data?.courses || 0}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
