import BackupTable from "@mui/icons-material/BackupTable";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Dataset from "@mui/icons-material/Dataset";
import HomeIcon from "@mui/icons-material/Home";
import Person from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { UserService } from "../../../infrastructures/UserService";
import DataEdit from "../../data/components/DataEdit";
import Mypage from "../../home/components/Mypage";
import Kanban from "../../kanban/components/Kanban";
import UserLogin from "../../login/components/UserLogin";
import TaskList from "../../tasklist/components/TaskList";

export const SidebarData = [
    {
        title: "ホーム",
        key: "home",
        condition: "",
        isSelectProject: false,
        icon: <HomeIcon />,
        link: "/",
        component: <Mypage userService={new UserService()} />,
    },
    {
        title: "ログイン（アカウント登録）",
        key: "login",
        condition: "logout",
        isSelectProject: false,
        icon: <Person />,
        link: "/login",
        component: <UserLogin userService={new UserService()} />,
    },
    {
        title: "タスク",
        key: "task",
        condition: "login",
        isSelectProject: true,
        icon: <BackupTable />,
        link: "/friends",
        component: <TaskList userService={new UserService()} />,
    },
    {
        title: "カンバン",
        key: "kanban",
        condition: "login",
        isSelectProject: true,
        icon: <CalendarMonth />,
        link: "/upload",
        component: <Kanban userService={new UserService()} />,
    },
    {
        title: "データ編集",
        key: "data",
        condition: "login",
        isSelectProject: false,
        icon: <Dataset />,
        component: <DataEdit />,
    },
    {
        title: "ログアウト",
        key: "logout",
        condition: "login",
        isSelectProject: false,
        icon: <SettingsIcon />,
        link: "/logout",
        component: <></>,
    },
];