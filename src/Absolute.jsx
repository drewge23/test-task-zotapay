import React from 'react';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {Box} from "@mui/material";
import {DateField} from '@mui/x-date-pickers/DateField';
import {TimeField} from '@mui/x-date-pickers/TimeField';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';

function Absolute(props) {
    return (
        <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar/>
                <DateCalendar/>
                <DateField/>
                <TimeField/>
                <DateField/>
                <TimeField/>
            </LocalizationProvider>
        </Box>
    );
}

export default Absolute;