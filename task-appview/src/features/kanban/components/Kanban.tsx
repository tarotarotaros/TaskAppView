import { Card, Column, ControlledBoard, KanbanBoard, moveCard, OnDragEndNotification } from '@caldwell619/react-kanban';
import '@caldwell619/react-kanban/dist/styles.css';
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import { Box, Button, CardContent, Chip, Grid2 as Grid, Modal, Card as MuiCard, useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Loading from '../../../common/components/Loading';
import SelectBoxWithText from '../../../common/components/SelectBoxWithText';
import { IUserService } from '../../../infrastructures/IUserService';
import { fetchStatuses } from '../../../infrastructures/statuses';
import { fetchTasks, updateTask } from '../../../infrastructures/tasks';
import { Status } from '../../../types/Status';
import { Task } from '../../../types/Task';
import '../styles/Kanban.scss';

type KanbanProps = {
    userService: IUserService;
};

export default function Kanban({ userService }: KanbanProps) {

    const [board, SetBoard] = useState<KanbanBoard<Card> | null>(null);
    const [statuses, SetStatuses] = useState<Status[]>([]);
    const [currentSelectStatusId, SetCurrentSelectStatusId] = useState<number>(0);
    const [openSelectStatusModal, SetOpenSelectStatusModal] = useState<boolean>(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // タスクの期限フォーマット
    const formatDate = useCallback((date: Date): string => {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // 月は0から始まるので+1
        const day = ('0' + date.getDate()).slice(-2); // 日を2桁にする
        return `${year}年${month}月${day}日`;
    }, []);

    // カードの説明テキストを作成
    const createDescriptionText = useCallback((task: Task): string => {
        const deadline = task.deadline ? new Date(task.deadline) : undefined;
        const text = "期限:" + (deadline ? formatDate(deadline) : "未設定");
        return text;
    }, [formatDate]); // formatDateに依存

    // カンバンボード用データを作成
    const createKanbanBoard = useCallback((fetchedTasks: Task[], fetchedStatuses: any[]): KanbanBoard<Card> => {
        const columns: Column<Card>[] = fetchedStatuses.map(status => ({
            id: status.id,
            title: status.name,
            cards: []
        }));

        fetchedTasks.forEach(task => {
            const column = columns.find(column => column.id === task.status);
            const descriptionText = createDescriptionText(task);
            if (column) {
                column.cards.push({
                    id: task.task_id,
                    title: task.task_name,
                    description: descriptionText,
                });
            }
        });

        return {
            columns: columns
        };
    }, [createDescriptionText]);

    // データロード処理
    useEffect(() => {
        const loadTasks = async () => {
            const fetchUserInfo = await userService.fetchAuthUserInfo();
            const fetchedTasks: Task[] = await fetchTasks(fetchUserInfo.User.projectId);
            const fetchedStatuses: Status[] = await fetchStatuses();
            const createdBoard = createKanbanBoard(fetchedTasks, fetchedStatuses);
            SetBoard(createdBoard);
            SetStatuses(fetchedStatuses);
        };
        loadTasks();
    }, [createKanbanBoard, userService]); // createKanbanBoardを依存配列に追加

    // カード移動時にデータ更新
    const handleCardMove: OnDragEndNotification<Card> = async (_card, source, destination) => {
        SetBoard(currentBoard => {
            return moveCard(currentBoard, source, destination)
        })

        const taskId: number = _card.id as number;
        const status: number = destination?.toColumnId as number;
        const updated_by = "システム";
        const updateTaskData = { status, updated_by };
        await updateTask(taskId, updateTaskData);

        // TODO:エラーチェック処理
    }

    function kanbanComponent(board: KanbanBoard<Card>) {
        return <ControlledBoard
            renderColumnHeader={(column: Column<Card>) => {
                const taskStatus = statuses.find(item => item.name === column.title);
                return (<Chip label={column.title} sx={{ backgroundColor: taskStatus?.color, color: 'white', marginBottom: '10px' }} />);
            }}
            disableColumnDrag={true}
            allowRemoveCard={false}
            allowRemoveColumn={false}
            allowRenameColumn={false}
            allowAddColumn={false}
            allowAddCard={false}
            onCardDragEnd={handleCardMove}
        >{board}</ControlledBoard>;
    }

    function handleOpenCardMoveModal(columnId: number, cardId: number) {
        SetCurrentSelectStatusId(columnId);
        SetOpenSelectStatusModal(true);
    }

    function handleCloseSelectModal() {
        SetOpenSelectStatusModal(false);
    }

    function handleChangeStatus(): void {
        // TODO:データ処理
        SetOpenSelectStatusModal(false);
    }
    if (!board) {
        return (<Loading />)
            ;
    } else {

        if (isMobile) {
            const selectList: { value: string | number, label: string }[] = statuses.map((status) => {
                return { value: status.id, label: status.name }
            });

            return (
                <div>
                    <Grid size={12}>
                        {board.columns.map((column) => {
                            const taskStatus = statuses.find(item => item.name === column.title);


                            return (
                                <Grid size={12}>
                                    <MuiCard sx={{ margin: '5px' }}>
                                        <CardContent>
                                            <Chip label={column.title} sx={{ backgroundColor: taskStatus?.color, color: 'white', marginBottom: '10px' }} />
                                            {column.cards.map((card) => (
                                                <Grid size={12} key={card.id}>
                                                    <Button
                                                        onClick={() => handleOpenCardMoveModal(Number(column.id), Number(card.id))}
                                                        variant="contained" color="primary"
                                                        fullWidth>{card.title}</Button>
                                                </Grid>
                                            ))}
                                        </CardContent>
                                    </MuiCard>
                                </Grid>

                            )
                        }
                        )}
                        <Grid size={12}>
                            <Modal open={openSelectStatusModal}
                                onClose={handleCloseSelectModal}>
                                <Box
                                    sx={{
                                        position: 'absolute' as 'absolute',
                                        top: '10%',
                                        left: '10%',
                                        transform: 'translate(0%, 0%)',
                                        padding: "10px",
                                        borderRadius: "10px",
                                        margin: "auto",
                                        width: '80%',
                                        height: '100px',
                                        bgcolor: "white",
                                    }}
                                >
                                    <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
                                        <Grid container spacing={2} justifyContent="center">
                                            <SelectBoxWithText
                                                icon={<AssignmentLateIcon />}
                                                label="ステータス"
                                                defaultValue={currentSelectStatusId}
                                                options={selectList}
                                                onChange={handleChangeStatus}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box >
                            </Modal>
                        </Grid>
                    </Grid>
                </div>
            )
        } else {
            return (
                kanbanComponent(board)
            );
        }
    }

}

