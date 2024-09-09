import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Modal } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { createTask, deleteTask, fetchTasks, updateTask } from "../infrastructures/tasks";
import { CreateTask, Task } from "../types/Task";
import RemoveConfirmModal from "./RemoveConfirmModal";
import TaskEditModal from './TaskEditModal';

const rows = [
    { id: 1, title: 'title', priority: 0, status: 0, deadline: '2024/01/01', start: '2024/01/01', finish: '2024/01/01', manager: '0' },
    { id: 2, title: 'title', priority: 1, status: 1, deadline: '2024/01/01', start: '2024/01/01', finish: '2024/01/01', manager: '0' },
    { id: 3, title: 'title', priority: 2, status: 2, deadline: '2024/01/01', start: '2024/01/01', finish: '2024/01/01', manager: '0' },
    { id: 4, title: 'title', priority: 0, status: 0, deadline: '2024/01/01', start: '2024/01/01', finish: '2024/01/01', manager: '0' },
    { id: 5, title: 'title', priority: 1, status: 1, deadline: '2024/01/01', start: '2024/01/01', finish: '2024/01/01', manager: '0' },
    { id: 6, title: 'title', priority: 2, status: 2, deadline: '2024/01/01', start: '2024/01/01', finish: '2024/01/01', manager: '0' },
    { id: 7, title: 'title', priority: 0, status: 0, deadline: '2024/01/01', start: '2024/01/01', finish: '2024/01/01', manager: '0' },
    { id: 8, title: 'title', priority: 1, status: 1, deadline: '2024/01/01', start: '2024/01/01', finish: '2024/01/01', manager: '0' },
    { id: 9, title: 'title', priority: 2, status: 2, deadline: '2024/01/01', start: '2024/01/01', finish: '2024/01/01', manager: '0' },
];

const paginationModel = { page: 0, pageSize: 20 };

export default function DataTable() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<CreateTask>({
        task_name: '',
        created_by: 'システム',
        updated_by: 'システム',
    });

    // タスクの一覧を取得
    useEffect(() => {
        const loadTasks = async () => {
            const fetchedTasks = await fetchTasks();
            setTasks(fetchedTasks);
        };

        loadTasks();
    }, []);

    // 新しいタスクを追加
    const handleCreateTask = async () => {
        try {
            //エラーチェック
            console.log(newTask)
            const createdTask = await createTask(newTask);
            setTasks([...tasks, createdTask]);
            setNewTask({ task_name: '', created_by: 'システム', updated_by: 'システム' });
        } catch (error) {
            console.error('タスクの作成に失敗しました', error);
        }
    };

    // タスクを更新
    const handleUpdateTask = async (taskId: number) => {
        try {
            const updatedTask = await updateTask(taskId, { task_name: '更新されたタスク', updated_by: 'システム' });
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

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'タイトル', width: 130 },
        { field: 'priority', headerName: '優先度', width: 130 },
        { field: 'status', headerName: 'ステータス', width: 130 },
        { field: 'deadline', headerName: '期限', width: 130 },
        { field: 'start', headerName: '開始日', width: 130 },
        { field: 'finish', headerName: '終了日', width: 130 },
        { field: 'manager', headerName: '担当者', width: 130 },
        {
            field: 'actions',
            type: 'actions',
            headerName: '編集',
            width: 100,
            cellClassName: 'actions',
            getActions: () => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleOpenEditModal}
                        color="inherit"
                    />
                ];
            },
        },
    ];

    const [isEditModalOpen, setEditModalIsOpen] = useState(false);
    const handleOpenEditModal = () => setEditModalIsOpen(true);
    const handleCloseEditModal = () => setEditModalIsOpen(false);

    const [isDeleteConfirmModalOpen, setRemoveConfirmModalIsOpen] = useState(false);
    const handleOpenDeleteConfirmModal = () => setRemoveConfirmModalIsOpen(true);
    const handleCloseDeleteConfirmModal = () => setRemoveConfirmModalIsOpen(false);

    const handleDeleteModal = () => {

    }

    const handleSaveTask = (data: any) => {
        const newTaskData = {
            ...data,
            created_by: 'システム', // 必須フィールド
            updated_by: 'システム', // 必須フィールド
        };
        setNewTask(newTaskData);
        handleCreateTask();
        setEditModalIsOpen(false)
        console.log("Task Data Saved:", newTaskData);
    };


    return (
        <div>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid size={12}>
                    <div>
                        <Modal open={isEditModalOpen}>
                            <TaskEditModal
                                handleCloseModal={handleCloseEditModal}
                                onSave={handleSaveTask} />
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
                        <IconButton aria-label="add" onClick={handleOpenEditModal}><AddIcon /></IconButton>
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
        </div>
    );
}
