import { Card, Column, ControlledBoard, KanbanBoard, moveCard, OnDragEndNotification } from '@caldwell619/react-kanban';
import '@caldwell619/react-kanban/dist/styles.css';
import { Chip } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Loading from '../../../common/components/Loading';
import { fetchStatuses } from '../../../infrastructures/statuses';
import { fetchTasks, updateTask } from '../../../infrastructures/tasks';
import { Status } from '../../../types/Status';
import { Task } from '../../../types/Task';
import '../styles/Kanban.scss';
export default function Kanban() {

    const [board, SetBoard] = useState<KanbanBoard<Card> | null>(null);
    const [statuses, SetStatuses] = useState<Status[]>([]);

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
            const fetchedTasks: Task[] = await fetchTasks();
            const fetchedStatuses: Status[] = await fetchStatuses();
            const createdBoard = createKanbanBoard(fetchedTasks, fetchedStatuses);
            SetBoard(createdBoard);
            SetStatuses(fetchedStatuses);
        };
        loadTasks();
    }, [createKanbanBoard]); // createKanbanBoardを依存配列に追加

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

    if (!board) {
        return (<Loading />)
            ;
    } else {

        return (
            <ControlledBoard
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
            >{board}</ControlledBoard>);

    }
}

