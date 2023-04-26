import React, {useEffect, useState} from 'react';
import {Box, Input, Typography} from "@mui/material";

const MINUTE = 1000 * 60
const rangeOptionsText = [
    '5 minutes',
    '1 hour',
    '5 hours',
    '24 hours',
    '1 week',
    '2 years',
]
const rangeOptionsMs = [
    MINUTE * 5,
    MINUTE * 60,
    MINUTE * 60 * 5,
    MINUTE * 60 * 24,
    MINUTE * 60 * 24 * 7,
    MINUTE * 60 * 24 * 30 * 12 * 2,
]
const timeUnitsOptionsText = [
    'minutes',
    'hours',
    'days',
    'weeks',
    'months',
    'years',
]
const timeUnitsOptionsMs = [
    MINUTE,
    MINUTE * 60,
    MINUTE * 60 * 24,
    MINUTE * 60 * 24 * 7,
    MINUTE * 60 * 24 * 30,
    MINUTE * 60 * 24 * 30 * 12,
]

function Relative({value, onChange}) {
    const [isCustom, setIsCustom] = useState(false)

    const [durationValue, setDurationValue] = useState(24)
    const [timeUnits, setTimeUnits] = useState('hours')
    const [maxDuration, setMaxDuration] = useState(60)

    const setRelativeDateTime = (date) => {
        if (!date) return
        if (Date.now() - date.getTime() < MINUTE * 60) {
            setDurationValue(Math.floor(Date.now() - date.getTime() / MINUTE))
            setTimeUnits('minutes')
            return
        }
        if (Date.now() - date.getTime() < MINUTE * 60 * 24 + 1) {
            setDurationValue(Math.floor(Date.now() - date.getTime() / MINUTE * 60))
            setTimeUnits('hours')
            return
        }
        if (Date.now() - date.getTime() < MINUTE * 60 * 24 * 7) {
            setDurationValue(Math.floor(Date.now() - date.getTime() / MINUTE * 60 * 24))
            setTimeUnits('days')
            return
        }
        if (Date.now() - date.getTime() < MINUTE * 60 * 24 * 30) {
            setDurationValue(Math.floor(Date.now() - date.getTime() / MINUTE * 60 * 24 * 7))
            setTimeUnits('weeks')
            return
        }
        if (Date.now() - date.getTime() < MINUTE * 60 * 24 * 30 * 12) {
            setDurationValue(Math.floor(Date.now() - date.getTime() / MINUTE * 60 * 24 * 30))
            setTimeUnits('months')
            return
        }
        if (Date.now() - date.getTime() > MINUTE * 60 * 24 * 30 * 12) {
            setDurationValue(Math.floor(Date.now() - date.getTime() / MINUTE * 60 * 24 * 30 * 12))
            setTimeUnits('years')
        }
    }
    useEffect(() => {
        if (!value) return
        setRelativeDateTime(value[0])
    }, [value])
    useEffect(() => {
        switch (timeUnits) {
            case 'minutes':
                setMaxDuration(60)
                break
            case 'hours':
                setMaxDuration(24)
                break
            case 'days':
                setMaxDuration(365 * 2)
                break
            case 'weeks':
                setMaxDuration(56 * 2)
                break
            case 'months':
                setMaxDuration(24)
                break
            case 'years':
                setMaxDuration(2)
                break
            default:
                setMaxDuration(60)
        }
    }, [timeUnits])
    useEffect(() => {
        let tempTimeUnits = durationValue === 1 && timeUnits[timeUnits.length - 1] === 's'
            ? timeUnits.substring(0, timeUnits.length - 1)
            : timeUnits
        const index = timeUnitsOptionsText.findIndex((el) => el === timeUnits)
        const date = new Date(Date.now() - durationValue * timeUnitsOptionsMs[index])
        console.log(date)
        onChange([date])
    }, [durationValue, timeUnits])

    return (
        <Box>
            <Typography>
                Choose a range
            </Typography>
            <Box className={'rangesContainer'}>
                {rangeOptionsMs.map((option, index) => {
                    return (<Box key={option}>
                        <Input
                            type={'radio'}
                            name={'range'}
                            onClick={() => {
                                setIsCustom(false)
                                onChange([new Date(Date.now() - option)])
                            }}
                        />
                        <label htmlFor="">Last {rangeOptionsText[index]}</label>
                    </Box>)
                })}
                <Box>
                    <Input
                        type={'radio'}
                        name={'range'}
                        onClick={() => {
                            setIsCustom(true)
                            onChange(null)
                        }}
                    />
                    <label htmlFor="">Custom range</label>
                    {isCustom && <p>Range can be only within 2 years</p>}
                </Box>
            </Box>

            {isCustom && <Box>
                <label htmlFor="">Duration</label>
                <Input
                    slotProps={{
                        input: {
                            min: 1,
                            max: maxDuration,
                            step: 1,
                        },
                    }}
                    type={'number'}
                    max={maxDuration}
                    value={durationValue}
                    onChange={(e) => {
                        if (e.target.value > maxDuration) return
                        setDurationValue(e.target.value)
                    }}
                />
                <label htmlFor="">Unit of time</label>
                <select
                    key={'select'}
                    value={timeUnits}
                    onChange={(e) => setTimeUnits(e.target.value)}>
                    {timeUnitsOptionsText.map(option => (
                        <option value={option} key={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </Box>}
        </Box>
    );
}

export default Relative;