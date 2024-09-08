import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Modal } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
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

    return (
        <div>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid size={12}>
                    <div>
                        <Modal open={isEditModalOpen}>
                            <TaskEditModal handleCloseModal={handleCloseEditModal} />
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
                            rows={rows}
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
