import React, {useEffect, useState} from 'react';
import {Box, Input, Typography} from "@mui/material";

const rangeOptions = [
    '5 minutes',
    '1 hour',
    '5 hours',
    '24 hours',
    '1 week',
    '2 years',
]
const timeUnitsOptions = [
    'minutes',
    'hours',
    'days',
    'weeks',
    'months',
    'years',
]

function Relative({value, onChange}) {
    const [isCustom, setIsCustom] = useState(false)
    const [durationValue, setDurationValue] = useState(value.split(' ')[1] || 24)
    const [timeUnits, setTimeUnits] = useState(value.split(' ')[2] || 'hours')
    const [maxDuration, setMaxDuration] = useState(60)

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
        let tempTimeUnits = durationValue === '1' && timeUnits[timeUnits.length] === 's'
            ? timeUnits.substring(0, timeUnits.length - 1)
            : timeUnits
        let str = 'Last ' + durationValue + ' ' + tempTimeUnits
        onChange(str)
    }, [durationValue, timeUnits])

    return (
        <Box>
            <Typography>
                Choose a range
            </Typography>
            <Box className={'rangesContainer'}>
                {rangeOptions.map((option) => {
                    return (<Box key={option}>
                        <Input
                            type={'radio'}
                            name={'range'}
                            onClick={() => {
                                setIsCustom(false)
                                onChange('Last ' + option)
                            }}
                        />
                        <label htmlFor="">Last {option}</label>
                    </Box>)
                })}
                <Box>
                    <Input
                        type={'radio'}
                        name={'range'}
                        onClick={() => {
                            setIsCustom(true)
                            onChange('')
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
                    {timeUnitsOptions.map(option => (
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