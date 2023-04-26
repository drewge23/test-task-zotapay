import React, {useEffect, useState} from 'react';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {Box} from "@mui/material";
import {DateField} from '@mui/x-date-pickers/DateField';
import {TimeField} from '@mui/x-date-pickers/TimeField';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import dayjs from "dayjs";

function Absolute({value, onChange}) {
    const [startDate, setStartDate] = useState(value ? dayjs(value[0]) : null)
    const [finishDate, setFinishDate] = useState(value ? dayjs(value[1]) : null)

    useEffect(() => {
        console.log(startDate)
        if (!startDate || !finishDate) return
        onChange([startDate, finishDate])
    }, [startDate, finishDate])

    const startHandleChange = (newValue) => {
        if (Date.now() - newValue > 1000 * 60 * 60 * 24 * 365) {
            alert('Range can only be within 2 years')
            return
        }
        setStartDate(newValue)
    }
    const finishHandleChange = (newValue) => {
        if (Date.now() - newValue > 1000 * 60 * 60 * 24 * 365) {
            alert('Range can only be within 2 years')
            return
        }
        if (newValue.valueOf() < startDate.valueOf()) {
            console.log(finishDate.valueOf())
            console.log(startDate.valueOf())
            alert('Please select a date after the start date')
            return;
        }
        setFinishDate(newValue)
    }

    return (
        <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={startDate}
                    onChange={newValue => startHandleChange(newValue)}
                    disableFuture
                />
                <DateCalendar
                    value={finishDate}
                    onChange={newValue => finishHandleChange(newValue)}
                    disableFuture
                />
                <DateField value={startDate}
                           onChange={newValue => startHandleChange(newValue)}
                />
                <TimeField value={startDate} onChange={(newValue) => setStartDate(newValue)}/>
                <DateField value={finishDate} onChange={(newValue) => setFinishDate(newValue)}/>
                <TimeField value={startDate} onChange={(newValue) => setStartDate(newValue)}/>
            </LocalizationProvider>
        </Box>
    );
}

export default Absolute;