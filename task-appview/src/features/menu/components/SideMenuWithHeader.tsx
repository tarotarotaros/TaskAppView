import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from '@mui/material';
import { cloneElement, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../common/components/Loading';
import SimpleDialog, { NO_SELECT_PROJECT__TEXT } from '../../../common/components/SelectDialog';
import { IUserService } from '../../../infrastructures/IUserService';
import { fetchProject, fetchProjects } from '../../../infrastructures/projects';
import { themeConst } from '../../../themeConst';
import { SelectDataItem } from '../../../types/SelectDataItem';
import Hello from '../../home/components/Hello';
import SigninStatusButton from '../../signin/components/SigninStatusButton';
import UserSetting from '../../user/components/UserSetting';
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
    const [content, SetContent] = useState(<Hello />); // 初期コンテンツ
    const [contentKey, SetContentKey] = useState("home"); // 初期コンテンツ
    const navigate = useNavigate();

    // データ処理関係
    const setUserInfo = useCallback(async () => {
        const userInfo = await userService.fetchAuthUserInfo();
        SetUserId(userInfo.id);
    }, []);

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
    }, [updateSelectProjectList, setUserInfo]);

    // 初期表示
    useEffect(() => {
        const loadDisplayProject = async () => {
            const project = await getSelectProject();
            if (project == null) {
                await handleChangeProjectClick();
                return;
            }
            console.log("load_project:" + project.name)
            SetDisplayProject(project.name);
        };
        loadDisplayProject();
    }, [handleChangeProjectClick]);

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
    const isSignin = (): boolean => {
        let token = sessionStorage.getItem('authToken');
        return token !== null && token !== "";  // トークンが存在し、空でないかを確認
    };

    const signout = () => {
        sessionStorage.removeItem('authToken')
        navigate('/'); // 更新
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


    async function getSelectProject() {
        const userInfo = await userService.fetchAuthUserInfo();
        if (userInfo.project == null) return null;
        const project = await fetchProject(userInfo.project);
        return project;
    }

    const SelectProjectButton = () => {
        if (isSignin()) {
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
        SetContent(<UserSetting />); // クリックされたアイテムのタイトルをコンテンツにセット
        SetContentKey("UserSeting");
    }

    return (
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" style={{ zIndex: 1201 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        タスク管理
                    </Typography>
                    <SelectProjectButton />
                    <SigninStatusButton onClickButton={handleClickUserSetting} />
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
                                            if (value.title === "サインアウト") {
                                                signout();
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
            <main style={{ background: themeConst.THEME_COLOR_BACK, flexGrow: 1, padding: '16px', marginLeft: open ? sidebarwidth : 0 }}>
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

        const isOk: boolean = (value.condition === "signin" && isSignin()) ||
            (value.condition === "signout" && !isSignin()) ||
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


