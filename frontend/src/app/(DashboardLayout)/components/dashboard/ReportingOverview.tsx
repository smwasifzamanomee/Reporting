import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { useGetReport } from '@/hook/reactQuery/reportingQuery';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ReportingOverview = () => {
    const { reportQuery } = useGetReport();
    const departmentData = reportQuery?.data?.results || [];

    const [department, setDepartment] = useState(departmentData[0]?.id || '');

    useEffect(() => {
        if (departmentData.length > 0) {
            setDepartment(departmentData[0].id);
        }
    }, [departmentData]);

    const handleChange = (event: any) => {
        setDepartment(event.target.value);
    };

    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    const optionscolumnchart: any = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
            labels: {
                formatter: (val: number) => val.toFixed(0),
            },
        },
        xaxis: {
            categories: ['Department Data'],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
            y: {
                formatter: (val: number) => val.toFixed(0),
            },
        },
    };

    const selectedDepartment = departmentData.find(dep => dep.id === department);

    const seriescolumnchart: any = [
        {
            name: 'Students',
            data: [selectedDepartment?.students_count || 0],
        },
        {
            name: 'Courses',
            data: [selectedDepartment?.courses_count || 0],
        },
    ];

    return (
        <DashboardCard title="Reporting Overview" action={
            <Select
                labelId="department-dd"
                id="department-dd"
                value={department}
                size="small"
                onChange={handleChange}
            >
                {departmentData.map(dep => (
                    <MenuItem key={dep.id} value={dep.id}>
                        {dep.name}
                    </MenuItem>
                ))}
            </Select>
        }>
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height={370} width={"50%"}
            />
        </DashboardCard>
    );
};

export default ReportingOverview;
