import { FormControl, InputLabel } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs'; // dayjsをインポート
import React from 'react';

interface DatePickerWithTextProps {
    icon: React.ReactNode;
    label: string;
    defaultValue: string | Date;
    onChange: (value: string | Date) => void; // 選択された値を親に渡すコールバック
}

export default function DatePickerWithText({ icon, label, defaultValue, onChange }: DatePickerWithTextProps) {
    const [selectedValue, setSelectedValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    const handleChange = (newValue: Dayjs | null) => {
        setSelectedValue(newValue); // 選択された値を状態に設定
        onChange(newValue ? newValue.toString() : ''); // 親に値を渡す
    };

    return (
        <Grid container alignItems="center" spacing={2}>
            <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                {icon}
            </Grid>
            {/* テキストラベル */}
            <Grid>
                <InputLabel>{label}{"："}</InputLabel>
            </Grid>
            {/* セレクトボックス */}
            <Grid>
                <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker
                            sx={{ width: '200px' }}
                            value={selectedValue}
                            onChange={handleChange}
                            format="YYYY/MM/DD"
                        />
                    </LocalizationProvider>
                </FormControl>
            </Grid>
        </Grid>
    );
}