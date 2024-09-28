import BackupTable from "@mui/icons-material/BackupTable";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Dashboard from "@mui/icons-material/Dashboard";
import Dataset from "@mui/icons-material/Dataset";
import Flag from "@mui/icons-material/Flag";
import HomeIcon from "@mui/icons-material/Home";
import Person from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import DataEdit from "../../data/components/DataEdit";
import Kanban from "../../kanban/components/Kanban";
import UserSignin from "../../signin/components/UserSignin";
import TaskList from "../../tasklist/components/TaskList";

export const SidebarData = [
    {
        title: "ホーム",
        key: "home",
        condition: "",
        icon: <HomeIcon />,
        link: "/",
        component: <></>,
    },
    {
        title: "サインイン（アカウント登録）",
        key: "signin",
        condition: "signout",
        icon: <Person />,
        link: "/signin",
        component: <UserSignin />,
    },
    {
        title: "タスク",
        key: "task",
        condition: "signin",
        icon: <BackupTable />,
        link: "/friends",
        component: <TaskList />,
    },
    {
        title: "カンバン",
        key: "kanban",
        condition: "signin",
        icon: <CalendarMonth />,
        link: "/upload",
        component: <Kanban />,
    },
    {
        title: "データ編集",
        key: "data",
        condition: "signin",
        icon: <Dataset />,
        component: <DataEdit />,
    },
    {
        title: "マイルストーン",
        key: "milestone",
        condition: "signin",
        icon: <Flag />,
        link: "/upload",
        component: <></>,
    },
    {
        title: "分析",
        key: "ana",
        condition: "signin",
        icon: <Dashboard />,
        link: "/payment",
        component: <></>,
    },
    {
        title: "サインアウト",
        key: "signout",
        condition: "signin",
        icon: <SettingsIcon />,
        link: "/signout",
        component: <></>,
    },
];