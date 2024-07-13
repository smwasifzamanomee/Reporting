import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

type Props = {
    value: number;
};

const TotalStudents = ({ value }: Props) => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8'; 

  return (
    <DashboardCard
      title="Total Students"
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
            {value}
        </Typography>
      </>
    </DashboardCard>
  );
};

export default TotalStudents;
