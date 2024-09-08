
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import DatePickerWithText from "./DatePickerWithText";
import SelectBoxWithText from "./SelectBoxWithText";

type TaskEditModalProps = {
    handleCloseModal: React.MouseEventHandler<HTMLButtonElement>;
};

const testdata = [
    { value: '', label: 'None' },
    { value: '10', label: 'Ten' },
    { value: '20', label: 'Twenty' },
    { value: '30', label: 'Thirty' }
];

export default function TaskEditModal({ handleCloseModal }: TaskEditModalProps) {

    const [selectedAge, setSelectedAge] = useState<string | number>('');
    const [selectedDate, setSelectedDate] = useState<string | Date>('');

    const handleAgeChange = (value: string | number) => {
        setSelectedAge(value);
    };

    const handleDateChange = (value: string | Date) => {
        setSelectedDate(value);
    };


    return (
        <Box
            sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: "10px",
                borderRadius: "10px",
                margin: "auto",
                width: "70%",
                height: "70%",
                bgcolor: "white",
            }}
        >
            <Grid container spacing={2} >
                <Grid size={12} justifyContent="end" container>
                    <Button sx={{ width: '15px', height: '30px', backgroundColor: '#000' }} variant="contained" onClick={handleCloseModal}>
                        <CloseIcon />
                    </Button>
                </Grid>
                <Grid size={12}>
                    <TextField id="outlined-basic" fullWidth label="タイトル" />
                </Grid>
                <Grid size={12}>
                    <TextField
                        multiline
                        id="contents"
                        label="内容"
                        minRows={7}
                        fullWidth
                    />
                </Grid>

                <Grid size={4}>
                    <Grid>
                        <DatePickerWithText
                            icon={<PersonIcon />}
                            label="期限"
                            defaultValue="2024/01/01"
                            onChange={handleDateChange}
                        />
                    </Grid>
                </Grid>
                <Grid size={4}>
                    <SelectBoxWithText
                        icon={<PersonIcon />}
                        label="担当"
                        defaultValue="20"
                        options={testdata}
                        onChange={handleAgeChange}
                    />
                </Grid>
                <Grid size={4}>
                    <SelectBoxWithText
                        icon={<PersonIcon />}
                        label="ステータス"
                        defaultValue=""
                        options={testdata}
                        onChange={handleAgeChange}
                    />
                </Grid>

                <Grid my={2} size={12} justifyContent="end" spacing={1} container>
                    <Grid >
                        <Button sx={{ width: '100px' }} size="medium" variant="contained" color="error">
                            <DeleteIcon />
                            {/* 削除 */}
                        </Button>
                    </Grid>
                    <Grid >
                        <Button sx={{ width: '100px' }} size="medium" variant="contained" color="success">
                            保存
                        </Button>
                    </Grid>
                </Grid>

            </Grid>

        </Box >

    );
}
