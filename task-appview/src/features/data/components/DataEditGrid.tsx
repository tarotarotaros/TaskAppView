import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DataGrid, GridActionsCellItem, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Loading from "../../../common/components/Loading";
import { createPriority, deletePriority, fetchPriorities, updatePriority } from "../../../infrastructures/priorities";
import { CreatePriority, Priority } from "../../../types/Priority";

export default function DataEditGrid() {

    const nameNullErrorMessage: string = "名前が未入力です。";

    // 列定義
    const columns: GridColDef[] = [
        {
            field: 'id', headerName: 'ID',
            headerAlign: 'center',
            align: 'center', width: 50
        },
        {
            field: 'name', headerName: 'Name',
            headerAlign: 'center', width: 250, editable: true, flex: 1
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            onClick={handleCancelClick(id)}
                        />,
                    ];
                }
                return [
                    <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditClick(id)} />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                    />,
                ];
            },
        },
    ];


    const [rows, setRows] = useState<GridRowsProp>([]);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [openValidateErrorDialog, setValidateErrorDialog] = useState(false);

    useEffect(() => {
        loadPriorities();
    }, []);

    const loadPriorities = async () => {
        const fetchedPriorities: Priority[] = await fetchPriorities(); // データ取得
        setRows(fetchedPriorities.map((priority) => ({ id: priority.id, name: priority.name })));
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    // 行操作処理

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        handleDeletePriorities(Number(id));
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    // データ処理
    const handleCreateTask = async (data: CreatePriority) => {
        try {
            await createPriority(data);
        } catch (error) {
            console.error('優先度の作成に失敗しました', error);
        }
    };

    const handleUpdatePriority = async (id: number, data: any) => {
        try {
            const updateData = { ...data, updated_by: 'システム' }
            console.log(updateData)
            await updatePriority(id, updateData);
        } catch (error) {
            console.error('優先度の更新に失敗しました', error);
        }
    };

    const handleDeletePriorities = async (priorityId: number) => {
        try {
            await deletePriority(priorityId);
        } catch (error) {
            console.error('優先度の削除に失敗しました', error);
        }
    };


    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };

        if (!newRow.name || newRow.name.trim() === '') {
            setErrorMessage(nameNullErrorMessage);
            throw new Error(nameNullErrorMessage);
        }

        const isNew: boolean = newRow.isNew;
        const pr: Priority = newRow as Priority;
        if (isNew) {
            handleCreateTask(convertToCreatePriority(pr));
        } else {
            handleUpdatePriority(pr.id, pr);
        }

        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleProcessRowUpdateError = (error: Error) => {
        console.error(error);
        setValidateErrorDialog(true);
    };

    function closeValiteErrorDialog() {
        setValidateErrorDialog(false);
    }

    const handleClick = () => {
        // rowsの中から最大のIDを取得し、+1で新しいIDを生成
        const id = Math.max(...rows.map((row) => row.id as number)) + 1;
        setRows((oldRows) => [...oldRows, { id, name: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };


    function convertToCreatePriority(priority: Priority): CreatePriority {
        const { id, name, created_by, updated_by } = priority;

        return {
            id,
            name,
            created_by,
            updated_by
        };
    }

    if (rows.length === 0) {
        return (<Loading />);
    } else {
        return (
            <div>
                <Grid my={2} size={12} justifyContent="end" spacing={1} container>
                    <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                        Add
                    </Button>
                </Grid>
                <Box sx={{
                    display: 'flex',           // Flexboxを有効にする
                    justifyContent: 'center',   // 横方向の中央揃え
                    alignItems: 'center',       // 縦方向の中央揃え
                    width: '500px',
                    margin: '0 auto'            // Box自体を中央に寄せる
                }}>

                    <DataGrid
                        hideFooter
                        rows={rows}
                        columns={columns}
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={setRowModesModel}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        onProcessRowUpdateError={handleProcessRowUpdateError} // エラー発生時に処理を行う
                    />
                </Box>
                <Dialog
                    open={openValidateErrorDialog}
                >
                    <DialogTitle>エラー({errorMessage})</DialogTitle>
                    <DialogActions>
                        <Button onClick={closeValiteErrorDialog} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
};
