import { FormControl, InputLabel } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

interface DatePickerWithTextProps {
    icon: React.ReactNode;
    label: string;
    defaultValue: Date | null;
    onChange: (value: Date | null) => void; // 選択された値を親に渡すコールバック
}

export default function DatePickerWithText({ icon, label, defaultValue, onChange }: DatePickerWithTextProps) {
    const [selectedValue, setSelectedValue] = React.useState<Date | null>(defaultValue);

    const handleChange = (newValue: Dayjs | null) => {
        setSelectedValue(newValue?.toDate() ? newValue.toDate() : null); // 選択された値を状態に設定
        onChange(newValue?.toDate() ? newValue.toDate() : null); // 親に値を渡す
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
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker
                            sx={{ width: '200px' }}
                            defaultValue={dayjs(defaultValue)}
                            value={dayjs(selectedValue)}
                            onChange={handleChange}
                            format="YYYY/MM/DD"
                        />
                    </LocalizationProvider>
                </FormControl>
            </Grid>
        </Grid>
    );
}