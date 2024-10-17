import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { cloneElement, useCallback, useEffect, useState } from 'react';
import Loading from '../../../common/components/Loading';
import SimpleDialog, { NO_SELECT_PROJECT__TEXT } from '../../../common/components/SelectDialog';
import { IUserService } from '../../../infrastructures/IUserService';
import { fetchProject, fetchProjects } from '../../../infrastructures/projects';
import { themeConst } from '../../../themeConst';
import { SelectDataItem } from '../../../types/SelectDataItem';
import Mypage from '../../home/components/Mypage';
import LoginStatusButton from '../../login/components/LoginStatusButton';
import UserLogin from '../../login/components/UserLogin';
import UserInfo from '../../user/components/UserInfo';
import './../../../index.css';
import { SidebarData } from "./SidebarData";

const sidebarwidth = 250;

type SideMenuWithHeaderProps = {
    userService: IUserService;
};

export default function SideMenuWithHeader({ userService }: SideMenuWithHeaderProps) {

    const theme = useTheme(); // テーマを取得

    const INIT_DISPLAY_PROJECT_TEXT: string = '';

    const [open, setOpen] = useState(false);
    const [userId, SetUserId] = useState(0);
    const [openSelectProjectDialog, SetOpenSelectProjectDialog] = useState(false);
    const [selectProjectList, SetSelectProjectList] = useState<SelectDataItem[]>([]);
    const [displayProject, SetDisplayProject] = useState<string>(INIT_DISPLAY_PROJECT_TEXT);
    const [content, SetContent] = useState(isLogin() ? <Mypage userService={userService} /> : <UserLogin userService={userService} />); // 初期コンテンツ
    const [contentKey, SetContentKey] = useState(isLogin() ? "home" : "login"); // 初期コンテンツ
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // データ処理関係
    const setUserInfo = useCallback(async () => {
        const fetchUserInfo = await userService.fetchAuthUserInfo();
        SetUserId(fetchUserInfo.User.id);
        console.log(fetchUserInfo.User.id);
    }, [userService]);

    const updateSelectProjectList = useCallback(async () => {
        const projects: any[] = await fetchProjects();
        const projectItems: SelectDataItem[] = projects.map((data) => ({
            value: data.id,
            label: data.name,
            color: data.color !== undefined ? data.color : null
        }));
        SetSelectProjectList(projectItems);
    }, []);

    const handleChangeProjectClick = useCallback(async () => {
        await updateSelectProjectList();
        await setUserInfo();
        SetOpenSelectProjectDialog(true);
    }, [updateSelectProjectList, setUserInfo])

    const getSelectProject = useCallback(async () => {
        const fetchUserInfo = await userService.fetchAuthUserInfo();
        if (!fetchUserInfo.Result.Result) return null;
        const project = await fetchProject(fetchUserInfo.User.projectId);
        return project;
    }, [userService]);

    // 初期表示
    useEffect(() => {
        const loadDisplayProject = async () => {
            if (sessionStorage.getItem('authToken') === null) return;
            const project = await getSelectProject();
            if (project == null) {
                await handleChangeProjectClick();
                return;
            }
            SetDisplayProject(project.name);
        };
        loadDisplayProject();
    }, [handleChangeProjectClick, getSelectProject]);

    // イベント
    const handleCloseSelectProjectDialog = async (selectedId: string | null) => {
        if (isSelectedProject(selectedId)) {
            userService.updateUserProject(Number(selectedId), userId);
            const project = await fetchProject(Number(selectedId));
            SetDisplayProject(project.name);

            // コンテンツを再描画
            updateContent("task");
            updateContent("kanban");
        } else {
            // 選択していない&初期状態なら閉じない
            if (isInitSelectProject()) {
                return;
            }
        }

        SetOpenSelectProjectDialog(false);
    }

    const toggleDrawer = () => {
        setOpen(!open);
    };
    function isLogin(): boolean {
        let token = sessionStorage.getItem('authToken');
        return token !== null && token !== "";  // トークンが存在し、空でないかを確認
    };

    function logout() {
        sessionStorage.removeItem('authToken')
        window.location.reload();
    }

    function updateContent(componentKey: string) {
        if (contentKey === componentKey) {
            const kanbanComponent = SidebarData.find(item => item.key === componentKey)?.component;
            if (kanbanComponent) {
                SetContent(cloneElement(kanbanComponent, { key: `${componentKey}-${Date.now()}` }));
            }
        }
    }

    function isSelectedProject(selectedId: string | null) {
        return selectedId !== NO_SELECT_PROJECT__TEXT &&
            isNumeric(selectedId as string);
    }

    function isInitSelectProject() {
        return displayProject === INIT_DISPLAY_PROJECT_TEXT;
    }

    function isNumeric(value: string): boolean {
        // 数値に変換し、NaN（数値でない値）かどうかを確認
        return !isNaN(Number(value));
    }

    const SelectProjectButton = () => {
        if (isLogin()) {
            if (displayProject === '') {
                return (<Loading size="small" marginRight={10} color='secondary' />)
            }
            else {

                return (
                    <div>
                        <Button size="medium" color='inherit' onClick={handleChangeProjectClick}
                            sx={{ marginRight: 10, border: 1 }}>
                            {displayProject}
                        </Button>
                    </div>
                );
            }
        }
        else {
            return null;
        }
    };

    function handleClickUserSetting(): void {
        SetContent(<UserInfo userService={userService} />); // クリックされたアイテムのタイトルをコンテンツにセット
        SetContentKey("UserSeting");
    }

    return (
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" style={{ zIndex: 1201 }}>
                <Toolbar>
                    {isLogin() ? (
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                    ) :
                        (null)
                    }
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        タスク管理
                    </Typography>
                    <SelectProjectButton />
                    <LoginStatusButton onClickButton={handleClickUserSetting} />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                style={{ width: 0, flexShrink: 0 }}
                PaperProps={{
                    style: {
                        width: sidebarwidth,
                    },
                    sx: {
                        color: theme.palette.primary.contrastText,
                        backgroundColor: theme.palette.primary.main,
                        border: 0,
                    }
                }}
            >
                <Toolbar />
                <List >

                    {SidebarData.map((value, key) => {
                        if (isDisplayCondition(value)) {
                            const selectedBackColor = value.key === contentKey ? themeConst.THEME_COLOR_BACK : theme.palette.primary.main;
                            return (
                                <ListItem key={key} disablePadding>
                                    <ListItemButton
                                        sx={{
                                            backgroundColor: selectedBackColor
                                        }}
                                        onClick={() => {
                                            if (value.title === "ログアウト") {
                                                logout();
                                            } else {
                                                SetContent(value.component); // クリックされたアイテムのタイトルをコンテンツにセット
                                                SetContentKey(value.key);
                                            }
                                        }} >
                                        <ListItemIcon>
                                            {value.icon} {/* SidebarData の icon プロパティを表示 */}
                                        </ListItemIcon>
                                        <ListItemText primary={value.title} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        }
                        else {
                            return null;
                        }
                    })}
                </List>
            </Drawer>
            <main style={{ background: themeConst.THEME_COLOR_BACK, flexGrow: 1, padding: '16px', marginLeft: 0 }}>
                <Toolbar />
                <Typography>
                    {content} {/* 動的に変更されるコンテンツ */}
                </Typography>
            </main >
            <SimpleDialog
                title={'プロジェクト選択'}
                options={selectProjectList}
                open={openSelectProjectDialog}
                onClose={handleCloseSelectProjectDialog}
            />
        </div >
    );


    function isDisplayCondition(value: any) {

        const isOk: boolean = (value.condition === "login" && isLogin()) ||
            (value.condition === "logout" && !isLogin()) ||
            value.condition === "";

        let isOkProjectCondition: boolean = false;
        if (value.isSelectProject) {
            isOkProjectCondition = !isInitSelectProject();
        } else {
            isOkProjectCondition = true;
        }

        return isOk && isOkProjectCondition;
    }
}


