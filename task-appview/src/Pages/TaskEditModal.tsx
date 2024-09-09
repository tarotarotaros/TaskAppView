
import AlarmIcon from "@mui/icons-material/Alarm";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import DatePickerWithText from "./DatePickerWithText";
import SelectBoxWithText from "./SelectBoxWithText";

type TaskEditModalProps = {
    handleCloseModal: React.MouseEventHandler<HTMLButtonElement>;
    onSave: (data: any) => void; // 保存時にデータを親に渡す関数
};

const statusdata = [
    { value: '0', label: '未着手' },
    { value: '1', label: '対応中' },
    { value: '2', label: '対応済' },
    { value: '3', label: '完了' },
    { value: '10', label: '保留' },
];

const managerdata = [
    { value: '0', label: '未定' },
    { value: '1', label: '赤星' },
    { value: '2', label: '藤川' }
];


const priprity = [
    { value: '0', label: '低' },
    { value: '1', label: '中' },
    { value: '2', label: '高' }
];

export default function TaskEditModal({ handleCloseModal, onSave }: TaskEditModalProps) {

    const [task_name, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [priority, setPriority] = useState('0');
    const [status, setStatus] = useState('0');
    const [manager, setManager] = useState('0');
    const [deadline, setDeadline] = useState<string | Date>('2024/01/01');
    const [startDate, setStartDate] = useState<string | Date>('2024/01/01');
    const [endDate, setEndDate] = useState<string | Date>('2024/01/01');

    const handleSave = () => {
        const formData = {
            task_name,
            content,
            priority,
            status,
            manager,
            deadline,
            startDate,
            endDate,
        };
        onSave(formData); // 親コンポーネントにデータを渡す
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
                    <TextField
                        id="outlined-basic"
                        fullWidth
                        value={task_name}
                        onChange={(e) => setTitle(e.target.value)} />
                </Grid>
                <Grid size={12}>
                    <TextField
                        multiline
                        id="contents"
                        label="内容"
                        minRows={11}
                        maxRows={11}
                        fullWidth
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Grid>

                <Grid size={4}>
                    <SelectBoxWithText
                        icon={<ThermostatIcon />}
                        label="優先度"
                        defaultValue={priority}
                        options={priprity}
                        onChange={setPriority}
                    />
                </Grid>
                <Grid size={4}>
                    <Grid>
                        <DatePickerWithText
                            icon={<AlarmIcon />}
                            label="期限"
                            defaultValue={deadline}
                            onChange={setDeadline}
                        />
                    </Grid>
                </Grid>
                <Grid size={4}>
                    <SelectBoxWithText
                        icon={<AssignmentLateIcon />}
                        label="ステータス"
                        defaultValue={status}
                        options={statusdata}
                        onChange={setStatus}
                    />
                </Grid>


                <Grid size={4}>
                    <Grid>
                        <DatePickerWithText
                            icon={<CalendarMonthIcon />}
                            label="開始"
                            defaultValue={startDate}
                            onChange={setStartDate}
                        />
                    </Grid>
                </Grid>
                <Grid size={4}>
                    <Grid>
                        <DatePickerWithText
                            icon={<CalendarMonthIcon />}
                            label="終了"
                            defaultValue={endDate}
                            onChange={setEndDate}
                        />
                    </Grid>
                </Grid>
                <Grid size={4}>
                    <SelectBoxWithText
                        icon={<PersonIcon />}
                        label="担当者"
                        defaultValue={manager}
                        options={managerdata}
                        onChange={setManager}
                    />
                </Grid>

                <Grid my={2} size={12} justifyContent="end" spacing={1} container>
                    <Grid >
                        <Button startIcon={<DeleteIcon />} sx={{ width: '100px' }} size="medium" variant="contained" color="error">
                            削除
                        </Button>
                    </Grid>
                    <Grid >
                        <Button startIcon={<SaveIcon />} sx={{ width: '100px' }} size="medium" variant="contained"
                            onClick={handleSave} color="success">
                            保存
                        </Button>
                    </Grid>
                </Grid>

            </Grid>

        </Box >

    );
}
