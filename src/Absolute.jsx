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
        if (!startDate || !finishDate) return
        onChange([startDate.toDate(), finishDate.toDate()])
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
                <Box className={'calendars'}>
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
                </Box>
                <Box className={'absDateTime'}>
                    <DateField
                        label={'From'}
                        value={startDate}
                        onChange={newValue => startHandleChange(newValue)}
                    />
                    <TimeField
                        label={'Time'}
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                    />
                    <DateField
                        label={'To'}
                        value={finishDate}
                        onChange={(newValue) => setFinishDate(newValue)}
                    />
                    <TimeField
                        label={'Time'}
                        value={finishDate}
                        onChange={(newValue) => setFinishDate(newValue)}
                    />
                </Box>
            </LocalizationProvider>
        </Box>
    );
}

export default Absolute;