import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import Grid from '@mui/material/Grid2';
import React from 'react';

interface SelectBoxWithTextProps {
    icon: React.ReactNode;
    label: string;
    options: { value: string | number, label: string }[];
    defaultValue: number;
    onChange: (value: number) => void; // 選択された値を親に渡すコールバック
}

export default function SelectBoxWithText({ icon, label, options, defaultValue, onChange }: SelectBoxWithTextProps) {
    const [selectedValue, setSelectedValue] = React.useState<number>(defaultValue);

    const handleChange = (event: SelectChangeEvent<number>) => {
        const value: number = (event.target.value as number);
        setSelectedValue(value);
        onChange(value); // 親に選択された値を渡す
    };

    return (
        <Grid container alignItems="center" spacing={2}>
            <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                {icon}
            </Grid>
            {/* テキストラベル */}
            <Grid sx={{ width: '100px' }}>
                <InputLabel>{label}{"："}</InputLabel>
            </Grid>
            {/* セレクトボックス */}
            <Grid>
                <FormControl fullWidth>
                    <Select sx={{ width: '200px' }}
                        fullWidth
                        value={selectedValue}
                        onChange={handleChange}
                        id="demo-select-small"
                    >
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}