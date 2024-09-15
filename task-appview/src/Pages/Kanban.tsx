import { Card, Column, KanbanBoard, UncontrolledBoard } from '@caldwell619/react-kanban';
import '@caldwell619/react-kanban/dist/styles.css';
import CircularProgress from '@mui/joy/CircularProgress';
import { useEffect, useState } from 'react';
import { fetchStatuses } from '../infrastructures/statuses';
import { fetchTasks } from '../infrastructures/tasks';
import { Status } from '../types/Status';
import { Task } from '../types/Task';
import './Kanban.scss';



export default function Kanban() {

    const [board, SetBoard] = useState<KanbanBoard<Card> | null>(null);

    // カンバンボード用データを作成
    function createKanbanBoard(fetchedTasks: any[], fetchedStatuses: any[]): KanbanBoard<Card> {
        // 1. ステータスをもとにカラムを初期化
        const columns: Column<Card>[] = fetchedStatuses.map(status => ({
            id: status.id,
            title: status.name,
            cards: []
        }));

        // 2. タスクをループして適切なカラムにカードを追加
        fetchedTasks.forEach(task => {
            const column = columns.find(column => column.id === task.status);
            if (column) {
                column.cards.push({
                    id: task.task_id,
                    title: task.task_name,
                    description: task.content
                });
            }
        });

        // KanbanBoardを作成して返す
        return {
            columns: columns
        };
    };

    // データロード処理
    useEffect(() => {
        const loadTasks = async () => {
            const fetchedTasks: Task[] = await fetchTasks();
            const fetchedStatuses: Status[] = await fetchStatuses();
            const createdBoard = createKanbanBoard(fetchedTasks, fetchedStatuses);

            SetBoard(createdBoard);
        };
        loadTasks();
    }, [])



    if (!board) {
        return (
            <div><p>Loading...</p>
                <CircularProgress size="sm" /></div>)
            ;
    } else {
        return (
            <UncontrolledBoard
                initialBoard={board}
                disableColumnDrag={true}
                allowRemoveCard={false}
                allowRemoveColumn={false}
                allowRenameColumn={false}
                allowAddColumn={false}
                allowAddCard={false}
            />);
    }
}