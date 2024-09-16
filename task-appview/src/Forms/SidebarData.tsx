import BackupTable from "@mui/icons-material/BackupTable";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Dashboard from "@mui/icons-material/Dashboard";
import Flag from "@mui/icons-material/Flag";
import HomeIcon from "@mui/icons-material/Home";
import Person from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Kanban from "../Pages/Kanban";
import TaskList from "../Pages/TaskList";
import UserSignin from "../Pages/UserSignin";

export const SidebarData = [
    {
        title: "ホーム",
        condition: "",
        icon: <HomeIcon />,
        link: "/",
        component: <></>,
    },
    {
        title: "サインイン（アカウント登録）",
        condition: "signout",
        icon: <Person />,
        link: "/signin",
        component: <UserSignin />,
    },
    {
        title: "タスク",
        condition: "signin",
        icon: <BackupTable />,
        link: "/friends",
        component: <TaskList />,
    },
    {
        title: "カンバン",
        condition: "signin",
        icon: <CalendarMonth />,
        link: "/upload",
        component: <Kanban />,
    },
    {
        title: "マイルストーン",
        condition: "signin",
        icon: <Flag />,
        link: "/upload",
        component: <></>,
    },
    {
        title: "分析",
        condition: "signin",
        icon: <Dashboard />,
        link: "/payment",
        component: <></>,
    },
    {
        title: "サインアウト",
        condition: "signin",
        icon: <SettingsIcon />,
        link: "/signout",
        component: <></>,
    },
];