import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Chip, IconButton, Modal } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Loading from "../../../common/components/Loading";
import RemoveConfirmModal from "../../../common/components/RemoveConfirmModal";
import { fetchAssignees } from "../../../infrastructures/assignees";
import { IUserService } from "../../../infrastructures/IUserService";
import { fetchPriorities } from "../../../infrastructures/priorities";
import { fetchStatuses } from "../../../infrastructures/statuses";
import { createTask, deleteTask, fetchTasks, updateTask } from "../../../infrastructures/tasks";
import { Assignee } from "../../../types/Assignee";
import { Priority } from "../../../types/Priority";
import { SelectDataItem } from "../../../types/SelectDataItem";
import { Status } from "../../../types/Status";
import { Task } from "../../../types/Task";
import TaskEditModal from "./TaskEditModal";
import TaskEditModalStatus from "./TaskEditModalStatus";

const paginationModel = { page: 0, pageSize: 20 };


type TaskListProps = {
    userService: IUserService;
};

export default function TaskList({ userService }: TaskListProps) {

    // 列定義
    const columns: GridColDef[] = [
        { field: 'task_id', headerName: 'ID', width: 100, headerAlign: 'center', align: 'center', headerClassName: 'custom-header' },
        {
            field: 'task_name', headerName: 'タイトル', width: 250, headerAlign: 'center', align: 'center', headerClassName: 'custom-header',
            flex: 1
        },
        {
            field: 'priority', headerName: '優先度', width: 130, headerAlign: 'center', align: 'center',
            valueFormatter: (params) => {
                const result = priprotyselectdatas.find(item => Number(item.value) === Number(params));
                return result ? result.label : "";
            },
            headerClassName: 'custom-header'
        },
        {
            field: 'status', headerName: 'ステータス', width: 130, headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                const result = statusselectdatas.find(item => Number(item.value) === Number(params.value));
                const displayText = result ? result.label : "";
                return (<Chip label={displayText} sx={{ backgroundColor: result?.color, color: 'white' }} />);
            },
            headerClassName: 'custom-header'
        },
        {
            field: 'deadline',
            type: 'date',
            valueFormatter: (params) => {
                return dayjs(params).format('YYYY/MM/DD');;
            },
            headerName: '期限',
            width: 130,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'custom-header'
        },
        {
            field: 'start', headerName: '開始日',
            type: 'date',
            valueFormatter: (params) => {
                return dayjs(params).format('YYYY/MM/DD');;
            },
            width: 130, headerAlign: 'center', align: 'center',
            headerClassName: 'custom-header'
        },
        {
            field: 'end', headerName: '終了日',
            type: 'date',
            valueFormatter: (params) => {
                return dayjs(params).format('YYYY/MM/DD');;
            },
            width: 130, headerAlign: 'center', align: 'center',
            headerClassName: 'custom-header'
        },
        {
            field: 'assignee', headerName: '担当者', width: 130, headerAlign: 'center', align: 'center',
            valueFormatter: (params) => {
                const result = assigneeselectdatas.find(item => Number(item.value) === Number(params));
                return result ? result.label : "";
            },
            headerClassName: 'custom-header'
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: '編集',
            width: 100,
            cellClassName: 'actions',
            renderCell: (params) => (
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={() => handleOpenEditModal(params.row)}
                    color="inherit"
                />),
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'custom-header',
        },
    ];

    const [tasks, setTasks] = useState<Task[]>([]);
    const [assigneeselectdatas, setAssigneeSelectDatas] = useState<SelectDataItem[]>([]);
    const [statusselectdatas, setStatusSelectDatas] = useState<SelectDataItem[]>([]);
    const [priprotyselectdatas, setPriprotySelectDatas] = useState<SelectDataItem[]>([]);
    const [isEditModalOpen, setEditModalIsOpen] = useState(false);
    const [isDeleteConfirmModalOpen, setRemoveConfirmModalIsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any | null>(null);
    const [checkedRowTaskIds, SetCheckedRowTaskIds] = useState<number[]>([]);
    const [lastModalStatus, SetLastEditModalStatus] = useState<TaskEditModalStatus>(TaskEditModalStatus.Add);

    // タスクの一覧/担当者一覧を取得
    useEffect(() => {
        const loadTasks = async () => {
            const userInfo = await userService.fetchAuthUserInfo();
            const fetchedTasks = await fetchTasks(userInfo.project);
            setTasks(fetchedTasks);

            const fetchedAssignees: Assignee[] = await fetchAssignees();
            let assigneedata = fetchedAssignees.map(assignee => ({
                value: assignee.id.toString(), // 数値を文字列に変換
                label: assignee.name,
                color: ""
            }));
            setAssigneeSelectDatas(assigneedata);

            const fetchedStatuses: Status[] = await fetchStatuses();
            let statusdata = fetchedStatuses.map(status => ({
                value: status.id.toString(), // 数値を文字列に変換
                label: status.name,
                color: status.color
            }));
            setStatusSelectDatas(statusdata);

            const fetchedPriorities: Priority[] = await fetchPriorities();
            let prioritydata = fetchedPriorities.map(priority => ({
                value: priority.id.toString(), // 数値を文字列に変換
                label: priority.name,
                color: ""
            }));
            setPriprotySelectDatas(prioritydata);
        };

        loadTasks();
    }, [userService]);

    // 新しいタスクを追加
    const handleCreateTask = async (task: any) => {
        try {
            //エラーチェック
            console.log("handleCreateTask:" + task);
            const userInfo = await userService.fetchAuthUserInfo();
            const createdTask = await createTask(task, userInfo.id);
            setTasks([...tasks, createdTask]);
        } catch (error) {
            console.error('タスクの作成に失敗しました', error);
        }
    };

    // タスクを更新
    const handleUpdateTask = async (taskId: number, task: any) => {
        try {
            const updatedTask = await updateTask(taskId, task);
            setTasks(tasks.map(task => (task.task_id === taskId ? updatedTask : task)));
        } catch (error) {
            console.error('タスクの更新に失敗しました', error);
        }
    };

    // 複数のタスクを削除
    const handleDeleteTasks = async (taskIds: number[]) => {
        try {
            // すべての taskId に対して削除処理を実行
            await Promise.all(taskIds.map(taskId => deleteTask(taskId)));

            // tasks 配列から削除された taskIds に一致しないタスクのみを残す
            setTasks(tasks.filter(task => !taskIds.includes(task.task_id)));
        } catch (error) {
            console.error('タスクの削除に失敗しました', error);
        }
    };

    // 削除確認画面オープン
    const handleOpenDeleteConfirmModal = () => setRemoveConfirmModalIsOpen(true);

    // 削除確認画面クローズ    
    const handleCloseDeleteConfirmModal = () => setRemoveConfirmModalIsOpen(false);

    // 削除ボタンクリック処理
    const handleDeleteModal = () => {
        handleDeleteTasks(checkedRowTaskIds);
        setRemoveConfirmModalIsOpen(false);
    }

    // 編集モーダル開く処理
    const handleOpenEditModal = (row: any) => {
        setSelectedTask(row);
        if ('task_id' in row) {
            SetLastEditModalStatus(TaskEditModalStatus.Edit);
        } else {
            SetLastEditModalStatus(TaskEditModalStatus.Add);
        }

        setEditModalIsOpen(true);
    };

    // 編集モーダルクローズ
    const handleCloseEditModal = () => setEditModalIsOpen(false);

    // 行のチェック変更
    const handleSelectionChange = (selectionModel: any) => {
        SetCheckedRowTaskIds(selectionModel); // 選択された行のIDを保存
    };

    // モーダルよりデータ保存イベント
    const handleSaveTask = (data: any) => {
        if (lastModalStatus === TaskEditModalStatus.Add) {
            const newTaskData = {
                ...data,
                created_by: 'システム', // 必須フィールド
                updated_by: 'システム', // 必須フィールド
            };
            handleCreateTask(newTaskData);
        }
        else if (lastModalStatus === TaskEditModalStatus.Edit) {
            const updateTaskData = {
                ...data,
                updated_by: 'システム', // 必須フィールド
            };
            handleUpdateTask(data.task_id, updateTaskData);
        }

        setEditModalIsOpen(false)
    };


    if (assigneeselectdatas.length === 0 ||
        statusselectdatas.length === 0 ||
        priprotyselectdatas.length === 0) {
        return (<Loading />);
    } else {
        return (
            <div>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid size={12}>
                        <div>
                            <Modal open={isEditModalOpen}>
                                <TaskEditModal
                                    handleCloseModal={handleCloseEditModal}
                                    onSave={handleSaveTask}
                                    taskData={selectedTask}
                                    assigneeSelectDataItem={assigneeselectdatas}
                                    statusSelectDataItem={statusselectdatas}
                                    priorirySelectDataItem={priprotyselectdatas} />
                            </Modal>
                            <Modal open={isDeleteConfirmModalOpen}>
                                <RemoveConfirmModal
                                    handleCancelModal={handleCloseDeleteConfirmModal}
                                    handleDeleteModal={handleDeleteModal} />
                            </Modal>
                        </div>
                    </Grid>
                    <Grid my={2} size={12} justifyContent="end" spacing={1} container>
                        <Grid >
                            <IconButton aria-label="add" onClick={handleOpenEditModal}>
                                <AddIcon />
                            </IconButton>
                        </Grid>
                        <Grid >
                            <IconButton aria-label="delete" onClick={handleOpenDeleteConfirmModal} ><DeleteIcon /></IconButton>
                        </Grid>
                    </Grid>

                    <Grid size={12}>
                        <Paper sx={{ height: '90%', width: 'auto' }}>
                            <DataGrid
                                sx={{
                                    '& .MuiDataGrid-columnHeaderCheckbox': {
                                        backgroundColor: '#fff',
                                    },
                                    '& .custom-header': {
                                        backgroundColor: '#fff',
                                    },
                                }}
                                onRowSelectionModelChange={handleSelectionChange} // 選択モデルが変わったら呼ばれる
                                rows={tasks}
                                getRowId={(row) => row.task_id}
                                checkboxSelection
                                columns={columns}
                                initialState={{ pagination: { paginationModel } }}
                                pageSizeOptions={[5, 10]}
                            />
                        </Paper>
                    </Grid></Grid>
            </div >
        );
    }
}

