import React, {useState} from 'react';
import {Box, Button, Input, Menu, Typography} from "@mui/material";
import Relative from "./Relative";
import Absolute from "./Absolute";
import dayjs from "./dayjs-local";

function DateTimeRangeSelector({value, onChange}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function formatRelativeDateTime(date) {
        const now = dayjs();
        const diff = now.diff(date);

        const units = [
            {name: "year", milliseconds: 31536000000},
            {name: "month", milliseconds: 2592000000},
            {name: "day", milliseconds: 86400000},
            {name: "hour", milliseconds: 3600000},
            {name: "minute", milliseconds: 60000},
            {name: "second", milliseconds: 1000},
        ];

        for (let i = 0; i < units.length; i++) {
            const unit = units[i];
            if (diff >= unit.milliseconds) {
                const count = Math.round(diff / unit.milliseconds);
                return `Last ${count} ${unit.name}${count !== 1 ? "s" : ""}`;
            }
        }

        return "Last 1 minute";
    }

    const [range, setRange] = useState('absolute')
    const absDateTimeRange = value ? `From ${dayjs(value[0]).format('L LT')} : to ${dayjs(value[1]).format('L LT')}` : ''
    const relDateTimeRange = value ? formatRelativeDateTime(value[0]) : ''

    return (
        <Box>
            <Box
                className={'dateTimeRangeLabel'}
                onClick={(e) => handleClick(e)}
            >
                {range === 'relative' ? relDateTimeRange : absDateTimeRange}
            </Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Box className='menu'>
                    <Box className={'buttons'}>
                        <Button onClick={() => setRange('relative')}
                                className='outlinedBtn'
                                style={range === 'relative' ? {
                                    color: 'black',
                                    border: '1px solid black',
                                    backgroundColor: '#c9c7c7',
                                } : null}
                        >
                            Relative range
                        </Button>
                        <Button onClick={() => setRange('absolute')}
                                className='outlinedBtn'
                                style={range === 'absolute' ? {
                                    color: 'black',
                                    border: '1px solid black',
                                    backgroundColor: '#c9c7c7',
                                } : null}
                        >
                            Absolute range
                        </Button>
                    </Box>

                    {range === 'relative' && <Relative value={value} onChange={onChange}/>}
                    {range === 'absolute' && <Absolute value={value} onChange={onChange}/>}

                    <hr/>
                    <Box className='footerBtns'>
                        <Button onClick={() => {
                            onChange('')
                            handleClose()
                        }}>
                            Clear and dismiss
                        </Button>
                        <Box className='cancelApply'>
                            <Button onClick={() => {
                                onChange('')
                                handleClose()
                            }}>
                                Cancel
                            </Button>
                            <Button onClick={handleClose}
                                    className='outlinedBtn'>
                                Apply
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Menu>
        </Box>
    );
}

export default DateTimeRangeSelector;