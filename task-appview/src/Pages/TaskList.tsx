import { Modal } from '@mui/material';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useState } from 'react';
import TaskEditModal from './TaskEditModal';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const customStyles = {
    content: {
        top: "20%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        minWidth: "40%",
    },
};


const modalStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '100px 400px',
    borderRadius: '10px',
};


const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {

    const [isOpen, setIsOpen] = useState(false);
    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);


    const handleRowClick = (params: GridRowParams) => {
        handleOpenModal();
    };


    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <div>
                <Modal open={isOpen} onClose={handleCloseModal}>
                    <TaskEditModal handleCloseModal={handleCloseModal} />

                </Modal>
            </div>
            <DataGrid
                onRowClick={handleRowClick}
                //onRowClick={open}
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                //checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}
