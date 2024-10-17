import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Chip, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { jaJP } from '@mui/x-data-grid/locales';
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import Loading from "../../../common/components/Loading";
import { IUserService } from "../../../infrastructures/IUserService";
import { fetchPriorities } from "../../../infrastructures/priorities";
import { fetchStatuses } from "../../../infrastructures/statuses";
import { fetchTasksWhereUser } from "../../../infrastructures/tasks";
import { Priority } from "../../../types/Priority";
import { SelectDataItem } from "../../../types/SelectDataItem";
import { Status } from "../../../types/Status";
import { TaskClass } from "../../../types/Task";

type MypageProps = {
  userService: IUserService;
};

export default function Mypage({ userService }: MypageProps) {
  const paginationModel = { page: 0, pageSize: 20 };

  // 列定義
  const myTaskColumns: GridColDef[] = [
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
  ];

  const myTaskCards = () => {
    return (
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid size={12} key={task.task_id}>
            <Card>
              <CardContent>
                <Typography align="right" variant="body2">
                  {(() => {
                    const status = statusselectdatas.find(item => Number(item.value) === Number(task.status));
                    return status ? <Chip label={status.label} sx={{ backgroundColor: status.color, color: 'white', marginLeft: '8px' }} /> : null;
                  })()}
                </Typography>
                <Typography margin={'4px'} variant="h6"> {task.task_name}</Typography>
                <Typography margin={'4px'} variant="body2">優先度: {priprotyselectdatas.find(item => Number(item.value) === Number(task.priority))?.label}</Typography>
                <Typography margin={'4px'} variant="body2">期限: {dayjs(task.deadline).format('YYYY/MM/DD')}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  const [tasks, setTasks] = useState<TaskClass[]>([]);
  const [statusselectdatas, setStatusSelectDatas] = useState<SelectDataItem[]>([]);
  const [priprotyselectdatas, setPriprotySelectDatas] = useState<SelectDataItem[]>([]);
  const [dataLoaded, SetDataLoaded] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // タスクの一覧/担当者一覧を取得
  useEffect(() => {
    const loadTasks = async () => {
      const fetchUserInfo = await userService.fetchAuthUserInfo();
      const fetchedTasksResult = await fetchTasksWhereUser(fetchUserInfo.User.id);
      console.log(fetchedTasksResult.Data);
      setTasks(fetchedTasksResult.Data);

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
    SetDataLoaded(true);
  }, [userService]);
  if (!dataLoaded) {
    return (<Loading />);
  } else {
    return (
      <div>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            あなたに割り当てられたタスク
          </AccordionSummary>
          <AccordionDetails>

            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid my={2} size={12} justifyContent="end" spacing={1} container>
                <Grid size={12}>
                  {isMobile ? (
                    <Paper sx={{ width: '100%', padding: 2 }}>
                      {myTaskCards()} {/* カード表示 */}
                    </Paper>
                  ) : (
                    <Paper sx={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                      <DataGrid
                        rows={tasks}
                        getRowId={(row) => row.task_id}
                        localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
                        autoHeight
                        columns={myTaskColumns.map(col => ({ ...col, flex: col.flex ?? 1 }))}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                      />
                    </Paper>)}
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div >
    );
  }
};
