
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, InputLabel, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import SelectBoxWithText from "./SelectBoxWithText";

type TaskEditModalProps = {
    handleCloseModal: React.MouseEventHandler<HTMLButtonElement>;
};

export default function TaskEditModal({ handleCloseModal }: TaskEditModalProps) {

    const [selectedAge, setSelectedAge] = useState<string | number>('');

    const handleAgeChange = (value: string | number) => {
        setSelectedAge(value);
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
                        <InputLabel>テキスト</InputLabel>
                    </Grid>
                    <Grid>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker format="YYYY/MM/DD" sx={{ width: '300px' }} />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid size={4}>

                    <SelectBoxWithText
                        label="Age"
                        defaultValue="20"
                        options={[
                            { value: '', label: 'None' },
                            { value: '10', label: 'Ten' },
                            { value: '20', label: 'Twenty' },
                            { value: '30', label: 'Thirty' }
                        ]}
                        onChange={handleAgeChange} // 選択された値を取得するためのコールバック
                    />
                </Grid>
                <Grid size={4}>
                    <SelectBoxWithText
                        label="状態"
                        defaultValue=""
                        options={[
                            { value: '0', label: '未対応' },
                            { value: '1', label: '対応中' },
                            { value: '2', label: '確認中' },
                            { value: '3', label: '対応済' }
                        ]}
                        onChange={handleAgeChange} // 選択された値を取得するためのコールバック
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
