import { Dayjs } from 'dayjs';

interface DatePickerWithTextProps {
    label: string;
    defaultValue: Dayjs | null;
    onChange: (value: Dayjs | null) => void; // 選択された値を親に渡すコールバック
}

export default function SelectBoxWithText({ label, defaultValue, onChange }: DatePickerWithTextProps) {
    //const [selectedValue, setSelectedValue] = React.useState<string | Date>(defaultValue);
    // const [value, setSelectedValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    // const handleChange = (event: SelectChangeEvent<Dayjs | null>) => {
    //     const value = event.target.value;
    //     setSelectedValue(value);
    //     onChange(value); // 親に選択された値を渡す
    // };

    return (
        <></>
        // <Grid container alignItems="center" spacing={2}>
        //     {/* テキストラベル */}
        //     <Grid>
        //         <InputLabel>{label}{"："}</InputLabel>
        //     </Grid>
        //     {/* セレクトボックス */}
        //     <Grid>
        //         <FormControl fullWidth>
        //             <LocalizationProvider dateAdapter={AdapterDayjs} >
        //                 <DatePicker sx={{ width: '300px' }}
        //                     fullWidth
        //                     value={value}
        //                     onChange={handleChange}
        //                     id="demo-select-small" format="YYYY/MM/DD"
        //                 />
        //             </LocalizationProvider>
        //         </FormControl>
        //     </Grid>
        // </Grid>
    );
}