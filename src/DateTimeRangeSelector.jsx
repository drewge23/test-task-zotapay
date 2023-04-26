import React, {useState} from 'react';
import {Box, Button, Input, Menu, Typography} from "@mui/material";
import Relative from "./Relative";
import Absolute from "./Absolute";

function DateTimeRangeSelector({value, onChange}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [range, setRange] = useState('relative')

    return (
        <Box>
            <Typography
                sx={{width: 60, bgcolor: 'red'}}
                onClick={(e) => handleClick(e)}
            >
                {value}
            </Typography>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Box>
                    <Button onClick={() => setRange('relative')}>
                        Relative range
                    </Button>
                    <Button onClick={() => setRange('absolute')}>
                        Absolute range
                    </Button>

                    {range === 'relative' && <Relative value={value} onChange={onChange}/>}
                    {range === 'absolute' && <Absolute value={value} onChange={onChange}/>}

                    <hr/>
                    <Box>
                        <Button onClick={() => {
                            onChange('')
                            handleClose()
                        }}>
                            Clear and dismiss
                        </Button>
                        <Button onClick={() => {
                            onChange('')
                            handleClose()
                        }}>
                            Cancel
                        </Button>
                        <Button onClick={handleClose}>
                            Apply
                        </Button>
                    </Box>
                </Box>
            </Menu>
        </Box>
    );
}

export default DateTimeRangeSelector;