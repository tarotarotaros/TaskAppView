
import AlarmIcon from "@mui/icons-material/Alarm";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { Box, Button, TextField, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import DatePickerWithText from "../../../common/components/DatePickerWithText";
import MarkdownHtml from "../../../common/components/MarkdownHtml";
import SelectBoxWithText from "../../../common/components/SelectBoxWithText";
import '../../../index.css';
import { SelectDataItem } from "../../../types/SelectDataItem";
import { Task } from "../../../types/Task";

type TaskEditModalProps = {
    handleCloseModal: React.MouseEventHandler<HTMLButtonElement>;
    onSave: (data: any) => void; // 保存時にデータを親に渡す関数
    taskData?: Task; // 編集する既存のタスクデータ
    assigneeSelectDataItem: SelectDataItem[];
    priorirySelectDataItem: SelectDataItem[];
    statusSelectDataItem: SelectDataItem[];
};

export default function TaskEditModal({ handleCloseModal, onSave, taskData, assigneeSelectDataItem, priorirySelectDataItem, statusSelectDataItem }: TaskEditModalProps) {

    const PLAIN_TEXT: string = 'Plain';
    const MARK_DOWN_TEXT: string = 'MarkDown';

    const [task_name, setTitle] = useState(taskData?.task_name ? taskData.task_name : '');
    const [content, setContent] = useState(taskData?.content ? taskData.content : '');
    const [priority, setPriority] = useState(taskData?.priority ? taskData?.priority : 1);
    const [status, setStatus] = useState(taskData?.status ? taskData?.status : 1);
    const [assignee, setAssignee] = useState(taskData?.assignee ? taskData?.assignee : 1);
    const [deadlineDate, setDeadline] = useState<Date | null>(taskData?.deadline ? new Date(taskData.deadline) : new Date());
    const [startDate, setStartDate] = useState<Date | null>(taskData?.start ? new Date(taskData.start) : new Date());
    const [endDate, setEndDate] = useState<Date | null>(taskData?.end ? new Date(taskData.end) : new Date());
    const [displyaPattern, setDisplyaPattern] = useState<string>(PLAIN_TEXT);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // 600px以下のときにtrue

    const handleSave = () => {

        let deadline = deadlineDate;
        let start = startDate;
        let end = endDate;

        if (taskData !== null) {

            let task_id = taskData?.task_id;

            let formData = {
                task_id,
                task_name,
                content,
                priority,
                deadline,
                status,
                assignee,
                start,
                end,
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
                assignee,
                start,
                end,
            };
            onSave(formData); // 親コンポーネントにデータを渡す
        }
    };

    function handleChangedisplyaPattern(event: React.MouseEvent<HTMLElement>, value: any): void {
        if (value !== null) {
            setDisplyaPattern(value);
        }
    }


    let editModalTopPer: string = isMobile ? '5%' : '50%';
    let editModalLeftPer: string = isMobile ? '5%' : '50%';
    let editModalWidthPer: string = isMobile ? '90%' : '70%';
    let editModalHeightPer: string = isMobile ? '90%' : '80%';
    let editModalTransformPer: string = isMobile ? 'translate(0%, 0%)' : 'translate(-50%, -50%)';

    return (

        <Box
            sx={{
                position: 'absolute' as 'absolute',
                top: editModalTopPer,
                left: editModalLeftPer,
                transform: editModalTransformPer,
                padding: "10px",
                borderRadius: "10px",
                margin: "auto",
                width: editModalWidthPer,
                height: editModalHeightPer,
                bgcolor: "white",
                overflow: "auto",
            }}
        >

            {isMobile ? (
                <div>
                    <Grid container spacing={2} >
                        <Grid size={12} justifyContent="end" container>
                            <Button sx={{ width: '15px', height: '30px', backgroundColor: '#000', color: '#fff' }} variant="contained" onClick={handleCloseModal}>
                                <CloseIcon />
                            </Button>
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                id="outlined-basic"
                                label="タイトル"
                                fullWidth
                                value={task_name}
                                onChange={(e) => setTitle(e.target.value)} />
                        </Grid>
                        <Grid size={12} >
                            <ToggleButtonGroup
                                value={displyaPattern}
                                exclusive
                                onChange={handleChangedisplyaPattern}
                            >
                                <ToggleButton value={PLAIN_TEXT} >
                                    <div>Plain</div>
                                </ToggleButton>
                                <ToggleButton value={MARK_DOWN_TEXT}>
                                    <div>MarkDown</div>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid size={12}>
                            {displyaPattern === PLAIN_TEXT ? (
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
                            ) : displyaPattern === MARK_DOWN_TEXT ? (
                                <Box
                                    sx={{
                                        borderRadius: '3px',
                                        width: '100%',
                                        height: '300px',
                                        padding: '10px',
                                        border: '0.5px solid #CCCCCC',
                                        overflowY: 'auto',
                                        wordWrap: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    <MarkdownHtml content={content} />
                                </Box>

                            ) : null}
                        </Grid>

                        <Grid size={12}>
                            <SelectBoxWithText
                                icon={<ThermostatIcon />}
                                label="優先度"
                                defaultValue={priority}
                                options={priorirySelectDataItem}
                                onChange={setPriority}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Grid>
                                <DatePickerWithText
                                    icon={<AlarmIcon />}
                                    label="期限"
                                    defaultValue={deadlineDate}
                                    onChange={setDeadline}
                                />
                            </Grid>
                        </Grid>
                        <Grid size={12}>
                            <SelectBoxWithText
                                icon={<AssignmentLateIcon />}
                                label="ステータス"
                                defaultValue={status}
                                options={statusSelectDataItem}
                                onChange={setStatus}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Grid>
                                <DatePickerWithText
                                    icon={<CalendarMonthIcon />}
                                    label="開始"
                                    defaultValue={startDate}
                                    onChange={setStartDate}
                                />
                            </Grid>
                        </Grid>
                        <Grid size={12}>
                            <Grid>
                                <DatePickerWithText
                                    icon={<CalendarMonthIcon />}
                                    label="終了"
                                    defaultValue={endDate}
                                    onChange={setEndDate}
                                />
                            </Grid>
                        </Grid>
                        <Grid size={12}>
                            <SelectBoxWithText
                                icon={<PersonIcon />}
                                label="担当者"
                                defaultValue={assignee}
                                options={assigneeSelectDataItem}
                                onChange={setAssignee}
                            />
                        </Grid>
                        <Grid my={2} size={12} justifyContent="end" spacing={1} container>
                            <Grid >
                                <Button startIcon={<SaveIcon />} sx={{ width: '100px' }} size="medium" variant="contained"
                                    onClick={handleSave} color="success">
                                    保存
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </div>
            ) : (
                <div>
                    <Grid container spacing={2} >
                        <Grid size={12} justifyContent="end" container>
                            <Button sx={{ width: '15px', height: '30px', backgroundColor: '#000', color: '#fff' }} variant="contained" onClick={handleCloseModal}>
                                <CloseIcon />
                            </Button>
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                id="outlined-basic"
                                label="タイトル"
                                fullWidth
                                value={task_name}
                                onChange={(e) => setTitle(e.target.value)} />
                        </Grid>
                        <Grid container size={12} justifyContent="end" alignItems="center">
                            <ToggleButtonGroup
                                value={displyaPattern}
                                exclusive
                                onChange={handleChangedisplyaPattern}
                            >
                                <ToggleButton value={PLAIN_TEXT}>
                                    <div>Plain</div>
                                </ToggleButton>
                                <ToggleButton value={MARK_DOWN_TEXT}>
                                    <div>MarkDown</div>
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid size={12}>
                            {displyaPattern === PLAIN_TEXT ? (
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
                            ) : displyaPattern === MARK_DOWN_TEXT ? (
                                <Box
                                    sx={{
                                        borderRadius: '3px',
                                        width: '100%',
                                        height: '300px',
                                        padding: '10px',
                                        border: '0.5px solid #CCCCCC',
                                        overflowY: 'auto',
                                        wordWrap: 'break-word',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    <MarkdownHtml content={content} />
                                </Box>

                            ) : null}
                        </Grid>
                        <Grid size={4}>
                            <SelectBoxWithText
                                icon={<ThermostatIcon />}
                                label="優先度"
                                defaultValue={priority}
                                options={priorirySelectDataItem}
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
                                options={statusSelectDataItem}
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
                                defaultValue={assignee}
                                options={assigneeSelectDataItem}
                                onChange={setAssignee}
                            />
                        </Grid>
                        <Grid my={2} size={12} justifyContent="end" spacing={1} container>
                            <Grid >
                                <Button startIcon={<SaveIcon />} sx={{ width: '100px' }} size="medium" variant="contained"
                                    onClick={handleSave} color="success">
                                    保存
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </div>
            )
            }

        </Box >

    );
}
