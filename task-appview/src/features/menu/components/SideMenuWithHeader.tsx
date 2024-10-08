import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from '@mui/material';
import { cloneElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../common/components/Loading';
import SimpleDialog, { NO_SELECT_PROJECT__TEXT } from '../../../common/components/SelectDialog';
import { fetchProject, fetchProjects } from '../../../infrastructures/projects';
import { fetchAuthUserInfo, UpdateUserProject } from '../../../infrastructures/user';
import { themeConst } from '../../../themeConst';
import { SelectDataItem } from '../../../types/SelectDataItem';
import Hello from '../../home/components/Hello';
import SigninStatus from '../../signin/components/SigninStatus';
import './../../../index.css';
import { SidebarData } from "./SidebarData";

const sidebarwidth = 250;
export default function SideMenuWithHeader() {

    const theme = useTheme(); // テーマを取得

    const [open, setOpen] = useState(false);
    const [userId, SetUserId] = useState(0);
    const [openSelectProjectDialog, SetOpenSelectProjectDialog] = useState(false);
    const [selectProjectList, SetSelectProjectList] = useState<SelectDataItem[]>([]);
    const [displayProject, SetDisplayProject] = useState<string>('');
    const [content, SetContent] = useState(<Hello />); // 初期コンテンツ
    const [contentKey, SetContentKey] = useState("home"); // 初期コンテンツ
    const navigate = useNavigate();

    // プロジェクトを初期表示
    useEffect(() => {
        const loadDisplayProject = async () => {
            const project = await GetSelectProject();
            if (project == null) {
                await handleChangeProjectClick();
                return;
            }
            console.log("load_project:" + project.name)
            SetDisplayProject(project.name);
        };
        loadDisplayProject();
    }, []);

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

    const handleChangeProjectClick = async () => {
        await updateSelectProjectList();
        await setUserInfo();
        SetOpenSelectProjectDialog(true);
    }

    const handleCloseSelectProjectDialog = async (selectedId: string | null) => {
        if (selectedProject(selectedId)) {
            UpdateUserProject(Number(selectedId), userId);
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


    useEffect(() => {
        if (displayProject !== '') {
            SetOpenSelectProjectDialog(false);
        }
    }, [displayProject]);

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

    function updateContent(componentKey: string) {
        if (contentKey === componentKey) {
            const kanbanComponent = SidebarData.find(item => item.key === componentKey)?.component;
            if (kanbanComponent) {
                SetContent(cloneElement(kanbanComponent, { key: `${componentKey}-${Date.now()}` }));
            }
        }
    }

    function selectedProject(selectedId: string | null) {
        return selectedId !== NO_SELECT_PROJECT__TEXT &&
            isNumeric(selectedId as string);
    }

    function isInitSelectProject() {
        return displayProject === '';
    }

    async function setUserInfo() {
        const userInfo = await fetchAuthUserInfo();
        SetUserId(userInfo.id);
    }

    async function updateSelectProjectList() {
        const projects: any[] = await fetchProjects();
        const projectItems: SelectDataItem[] = projects.map((data) => ({
            value: data.id,
            label: data.name,
            color: data.color !== undefined ? data.color : null
        }));
        SetSelectProjectList(projectItems);
    }

    async function GetSelectProject() {
        const userInfo = await fetchAuthUserInfo();
        if (userInfo.project == null) return null;
        const project = await fetchProject(userInfo.project);
        return project;
    }

    function isNumeric(value: string): boolean {
        // 数値に変換し、NaN（数値でない値）かどうかを確認
        return !isNaN(Number(value));
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
                    <SigninStatus />
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
                        if ((value.condition === "signin" && isSignin()) ||
                            (value.condition === "signout" && !isSignin()) ||
                            value.condition === "") {
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

}


