import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, Chip, Dialog, DialogActions, DialogTitle } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DataGrid, GridActionsCellItem, GridAlignment, GridColDef, GridEventListener, GridRenderCellParams, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridRowsProp } from "@mui/x-data-grid";
import { jaJP } from '@mui/x-data-grid/locales';
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ColorResult, GithubPicker } from "react-color";
import Loading from "../../../common/components/Loading";
import { DataEditService } from "./DataEditService";

interface DataEditGridProps {
    dataEditService: DataEditService;
    dataLabel: string;
    hasColor: boolean;
    isReadOnly?: boolean;
}

export default function DataEditGrid({ dataEditService, dataLabel, hasColor, isReadOnly = false }: DataEditGridProps) {
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
            headerAlign: 'center', width: 250, editable: true, flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                if (hasColor) {
                    return (<Chip label={params.row.name} sx={{ backgroundColor: params.row.color, color: 'white' }} />);
                } else {
                    return params.row.name;
                }
            },

        },
        ...(hasColor
            ? [
                {
                    field: 'color', headerName: 'Color',
                    headerAlign: 'center' as GridAlignment,
                    align: 'center' as GridAlignment,
                    width: 130,
                    renderCell: (params: GridRenderCellParams) => {
                        const cellElement = params.api.getCellElement(params.id, params.field);
                        let { x, y } = getLocation(cellElement);

                        return (
                            <div
                                onClick={() => handleColorCellClick(params.id, params.value, x, y)} // セルクリック時の処理
                                style={{ cursor: 'pointer', width: '100%', height: '100%' }}
                            >
                                {params.value || 'N/A'} {/* params.value を表示 */}
                            </div>);
                    },
                },
            ]
            : []),
        ...(!isReadOnly
            ? [
                {
                    field: 'actions',
                    headerName: 'Actions', // type を削除
                    width: 100,
                    getActions: ({ id }: { id: GridRowId }) => {
                        const idNumber: GridRowId = id as GridRowId;
                        const isInEditMode = rowModesModel[idNumber]?.mode === GridRowModes.Edit;
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
                }
            ]
            : []),
    ];
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [isLoadComplete, SetLoadComplete] = useState<boolean>(false);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [openValidateErrorDialog, setValidateErrorDialog] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [editId, setEditId] = useState<string>("");
    const [popupPosition, setPopupPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    const loadDatas = useCallback(async () => {
        const fetchedDatas: any[] = await dataEditService.fetch();
        setRows(fetchedDatas.map((data) => ({
            id: data.id,
            name: data.name,
            color: data.color !== undefined ? data.color : null  // colorフィールドが存在するか確認
        })));
        SetLoadComplete(true);
    }, [dataEditService]);  // 依存関係が必要ならここに追加

    useEffect(() => {
        loadDatas();
    }, [loadDatas]);

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        setShowColorPicker(false);
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        handleDeleteData(Number(id));
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

        setShowColorPicker(false);
    };

    function handleColorCellClick(id: any, color: any, x: number, y: number): any {
        if (rowModesModel[id]?.mode !== GridRowModes.Edit) return;

        setEditId(id);
        setPopupPosition({ x: x, y: y });
        setShowColorPicker(true);
    }

    const handleColorChange = (value: any) => {
        // editId の行を見つけ、その color を更新
        const updatedRows = rows.map((row) => {
            if (row.id === editId) {
                return { ...row, color: value }; // color を更新
            }
            return row;
        });

        setRows(updatedRows);
        setShowColorPicker(false); // ピッカーを閉じる
    };

    const handleProcessRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };

        if (!newRow.name || newRow.name.trim() === '') {
            setErrorMessage(nameNullErrorMessage);
            throw new Error(nameNullErrorMessage);
        }

        const isNew: boolean = newRow.isNew;
        if (isNew) {
            const createData = convertToCreateData(newRow);
            handleCreateData(createData);
        } else {
            console.log("update:" + newRow.color);
            handleUpdateData(newRow.id, newRow);
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
        const id = rows.length > 0 ? Math.max(...rows.map((row) => row.id as number)) + 1 : 1;
        setRows((oldRows) => [...oldRows, { id, name: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    // データCUD処理
    const handleCreateData = async (data: any) => {
        try {
            const createdData = {
                ...data,
                created_by: 'システム',
                updated_by: 'システム',
            };
            await dataEditService.create(createdData);
        } catch (error) {
            console.error(`${dataLabel}の作成に失敗しました`, error);
        }
    };

    const handleUpdateData = async (id: number, data: any) => {
        try {
            const updateData = {
                ...data,
                updated_by: 'システム'
            };
            console.log(updateData);
            await dataEditService.update(id, updateData);
        } catch (error) {
            console.error(`${dataLabel}の更新に失敗しました`, error);
        }
    };

    const handleDeleteData = async (id: number) => {
        try {
            await dataEditService.delete(id);
        } catch (error) {
            console.error(`${dataLabel}の削除に失敗しました`, error);
        }
    };

    // 色の変更&クローズ
    function handleGithubPickerChange(color: ColorResult, event: ChangeEvent<HTMLInputElement>): void {
        handleColorChange(color.hex);
    }

    // データ変換処理
    function convertToCreateData(data: any): any {
        if (hasColor) {
            const { id, name, color, created_by, updated_by } = data;
            return {
                id,
                name,
                color,
                created_by,
                updated_by
            };
        } else {
            const { id, name, created_by, updated_by } = data;
            return {
                id,
                name,
                created_by,
                updated_by
            };
        }
    }

    function getLocation(cellElement: HTMLDivElement | null) {
        let x = 0;
        let y = 0;
        if (cellElement) {
            const rect = cellElement.getBoundingClientRect();
            x = rect?.left ?? 0;
            y = rect?.bottom ?? 0;
        }
        return { x, y };
    }

    function GetAddButton() {
        if (isReadOnly) return (
            <Grid my={2} size={12} justifyContent="end" spacing={1} container>
                {"※閲覧のみ"}
            </Grid>);
        return (
            <Grid my={2} size={12} justifyContent="end" spacing={1} container>
                <Button color="secondary" variant="contained" startIcon={<AddIcon />} onClick={handleClick}>
                    Add
                </Button>
            </Grid>
        )
    }


    if (!isLoadComplete) {
        return (<Loading />);
    } else {
        return (
            <div>
                <Grid size={12} sx={{ width: '100%' }}>
                    {GetAddButton()}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '100%',
                        margin: '0 auto'
                    }}>
                        <DataGrid

                            localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
                            hideFooter
                            rows={rows}
                            columns={columns}
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={setRowModesModel}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={handleProcessRowUpdate}
                            onProcessRowUpdateError={handleProcessRowUpdateError}
                            sx={{
                                width: '100%',
                                maxWidth: '100%',
                            }}
                        />
                    </Box>
                    <Dialog open={openValidateErrorDialog}>
                        <DialogTitle>エラー({errorMessage})</DialogTitle>
                        <DialogActions>
                            <Button onClick={closeValiteErrorDialog} color="primary">
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
                {showColorPicker &&
                    <div style={{
                        position: 'absolute',
                        top: popupPosition.y + window.scrollY,
                        left: popupPosition.x + window.scrollX,
                        backgroundColor: 'white',
                        zIndex: 1000,
                    }}>
                        <GithubPicker
                            onChange={handleGithubPickerChange} />
                    </div>
                }

            </div>
        );
    }
};