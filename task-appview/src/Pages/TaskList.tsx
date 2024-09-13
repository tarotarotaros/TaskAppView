import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Modal } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { createTask, deleteTask, fetchTasks, updateTask } from "../infrastructures/tasks";
import { Task } from "../types/Task";
import RemoveConfirmModal from "./RemoveConfirmModal";
import TaskEditModal from './TaskEditModal';
import TaskEditModalStatus from './TaskEditModalStatus';

const paginationModel = { page: 0, pageSize: 20 };

export default function DataTable() {

    const [tasks, setTasks] = useState<Task[]>([]);

    // タスクの一覧を取得
    useEffect(() => {
        const loadTasks = async () => {
            const fetchedTasks = await fetchTasks();
            console.log(fetchedTasks);
            setTasks(fetchedTasks);
        };

        loadTasks();
    }, []);

    // 新しいタスクを追加
    const handleCreateTask = async (task: any) => {
        try {
            //エラーチェック
            console.log("handleCreateTask:" + task);
            const createdTask = await createTask(task);
            setTasks([...tasks, createdTask]);
        } catch (error) {
            console.error('タスクの作成に失敗しました', error);
        }
    };

    // タスクを更新
    const handleUpdateTask = async (taskId: number, task: any) => {
        try {
            console.log("id:" + taskId + "task:" + task);
            const updatedTask = await updateTask(taskId, task);
            setTasks(tasks.map(task => (task.task_id === taskId ? updatedTask : task)));
        } catch (error) {
            console.error('タスクの更新に失敗しました', error);
        }
    };

    // タスクを削除
    const handleDeleteTask = async (taskId: number) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.task_id !== taskId));
        } catch (error) {
            console.error('タスクの削除に失敗しました', error);
        }
    };

    // 列定義
    const columns: GridColDef[] = [
        { field: 'task_id', headerName: 'ID', width: 100, headerAlign: 'center', align: 'center' },
        { field: 'task_name', headerName: 'タイトル', width: 250, headerAlign: 'center', align: 'center' },
        { field: 'priority', headerName: '優先度', width: 130, headerAlign: 'center', align: 'center' },
        { field: 'status', headerName: 'ステータス', width: 130, headerAlign: 'center', align: 'center' },
        {
            field: 'deadline',
            type: 'date',
            valueFormatter: (params) => {
                return dayjs(params).format('YYYY/MM/DD');;
            },
            headerName: '期限',
            width: 130,
            headerAlign: 'center',
            align: 'center'
        },
        { field: 'start', headerName: '開始日', width: 130, headerAlign: 'center', align: 'center' },
        { field: 'finish', headerName: '終了日', width: 130, headerAlign: 'center', align: 'center' },
        { field: 'manager', headerName: '担当者', width: 130, headerAlign: 'center', align: 'center' },
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
            align: 'center'
        },
    ];

    const [isEditModalOpen, setEditModalIsOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any | null>(null);  // 選択されたタスクを保持する
    const [lastModalStatus, SetLastEditModalStatus] = useState<TaskEditModalStatus>(TaskEditModalStatus.Add);

    const handleCloseEditModal = () => setEditModalIsOpen(false);

    const [isDeleteConfirmModalOpen, setRemoveConfirmModalIsOpen] = useState(false);
    const handleOpenDeleteConfirmModal = () => setRemoveConfirmModalIsOpen(true);
    const handleCloseDeleteConfirmModal = () => setRemoveConfirmModalIsOpen(false);

    const handleDeleteModal = () => {

    }


    const handleOpenEditModal = (row: any) => {
        //setSelectedTask(task);  // クリックされた行のタスクを設定
        setSelectedTask(row);
        if (row == null) {
            SetLastEditModalStatus(TaskEditModalStatus.Add);
        } else {
            SetLastEditModalStatus(TaskEditModalStatus.Edit);
        }

        setEditModalIsOpen(true);
    };


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
                // created_by: 'システム', // 必須フィールド
                updated_by: 'システム', // 必須フィールド
            };
            handleUpdateTask(data.task_id, updateTaskData);
        }

        setEditModalIsOpen(false)
    };


    return (
        <div>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid size={12}>
                    <div>
                        <Modal open={isEditModalOpen}>
                            <TaskEditModal
                                handleCloseModal={handleCloseEditModal}
                                onSave={handleSaveTask}
                                taskData={selectedTask} />
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
                        <IconButton aria-label="add" onClick={handleOpenEditModal}
                        //taskData={selectedTask}  // 選択されたタスクデータを渡す
                        ><AddIcon /></IconButton>
                    </Grid>
                    <Grid >
                        <IconButton aria-label="delete" onClick={handleOpenDeleteConfirmModal} ><DeleteIcon /></IconButton>
                    </Grid>
                </Grid>

                <Grid size={12}>
                    <Paper sx={{ height: '90%', width: 'auto' }}>
                        <DataGrid
                            rows={tasks}
                            getRowId={(row) => row.task_id}
                            checkboxSelection
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            sx={{ border: 0 }}
                        />
                    </Paper>
                </Grid></Grid>
        </div >
    );
}
