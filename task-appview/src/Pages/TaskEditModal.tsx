
import AlarmIcon from "@mui/icons-material/Alarm";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import { Task } from "../types/Task";
import DatePickerWithText from "./DatePickerWithText";
import SelectBoxWithText from "./SelectBoxWithText";

type TaskEditModalProps = {
    handleCloseModal: React.MouseEventHandler<HTMLButtonElement>;
    onSave: (data: any) => void; // 保存時にデータを親に渡す関数
    taskData?: Task; // 編集する既存のタスクデータ
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

export default function TaskEditModal({ handleCloseModal, onSave, taskData }: TaskEditModalProps) {

    const [task_name, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [priority, setPriority] = useState(0);
    const [status, setStatus] = useState(0);
    const [manager, setManager] = useState(0);
    const [deadlineDate, setDeadline] = useState<Date | null>(taskData?.deadline ? new Date(taskData.deadline) : new Date());
    const [startDate, setStartDate] = useState<string | Date>('2024/01/01');
    const [endDate, setEndDate] = useState<string | Date>('2024/01/01');

    useEffect(() => {
        let defaultDate = new Date(2024, 1, 1);
        if (taskData) {
            setTitle(taskData.task_name || '');
            setContent(taskData.content || '');
            setPriority(taskData.priority || 0);
            setStatus(taskData.status || 0);
            setManager(taskData.manager || 0);
            setDeadline(taskData.deadline || defaultDate);
            //setStartDate(taskData.startDate?.toString() || '2024/01/01');
            //setEndDate(taskData.endDate?.toString() || '2024/01/01');
        }
        console.log(taskData?.deadline);
    }, [taskData]);


    const handleSave = () => {

        //let deadline = dayjs(deadlineDate).format('YYYY-MM-DD HH:mm:ss');
        let deadline = deadlineDate;

        if (taskData !== null) {

            let task_id = taskData?.task_id;

            let formData = {
                task_id,
                task_name,
                content,
                priority,
                deadline,
                status,
                manager,
                //startDate,
                //endDate,
            };
            onSave(formData); // 親コンポーネントにデータを渡す
        }
        else {

            let formData = {
                task_name,
                content,
                priority,
                deadline,
                status,
                manager,
                //startDate,
                //endDate,
            };
            onSave(formData); // 親コンポーネントにデータを渡す

        }

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
                            defaultValue={deadlineDate}
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


                {/* <Grid size={4}>
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
                </Grid> */}
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
