
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';

import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

type Props = {
    value: number;
};

const TotalDepartments = ({ value }: Props) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  return (
    <DashboardCard title="Total Departments">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {value}
          </Typography>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default TotalDepartments;
