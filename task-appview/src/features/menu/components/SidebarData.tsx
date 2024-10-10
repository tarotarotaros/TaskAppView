import BackupTable from "@mui/icons-material/BackupTable";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import Dataset from "@mui/icons-material/Dataset";
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
        isSelectProject: false,
        icon: <HomeIcon />,
        link: "/",
        component: <></>,
    },
    {
        title: "サインイン（アカウント登録）",
        key: "signin",
        condition: "signout",
        isSelectProject: false,
        icon: <Person />,
        link: "/signin",
        component: <UserSignin />,
    },
    {
        title: "タスク",
        key: "task",
        condition: "signin",
        isSelectProject: true,
        icon: <BackupTable />,
        link: "/friends",
        component: <TaskList />,
    },
    {
        title: "カンバン",
        key: "kanban",
        condition: "signin",
        isSelectProject: true,
        icon: <CalendarMonth />,
        link: "/upload",
        component: <Kanban />,
    },
    {
        title: "データ編集",
        key: "data",
        condition: "signin",
        isSelectProject: false,
        icon: <Dataset />,
        component: <DataEdit />,
    },
    {
        title: "サインアウト",
        key: "signout",
        condition: "signin",
        isSelectProject: false,
        icon: <SettingsIcon />,
        link: "/signout",
        component: <></>,
    },
];