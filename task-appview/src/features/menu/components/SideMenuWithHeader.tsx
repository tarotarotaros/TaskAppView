import MenuIcon from '@mui/icons-material/Menu';
import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined';
import { AppBar, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleDialog from '../../../common/components/SelectDialog';
import { fetchProjects } from '../../../infrastructures/projects';
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
    const [selectProject, SetSelectProject] = useState<string>('');
    const [content, setContent] = useState(<Hello />); // 初期コンテンツ
    const [contentKey, setContentKey] = useState("home"); // 初期コンテンツ
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };
    const checkLoginStatus = (): boolean => {
        let token = sessionStorage.getItem('authToken');
        return token !== null && token !== "";  // トークンが存在し、空でないかを確認
    };

    const signout = () => {
        sessionStorage.removeItem('authToken')
        console.log("ログアウト")
        navigate('/'); // 更新
    }

    const handleChangeProjectClick = async () => {
        try {
            const projects: any[] = await fetchProjects();
            const projectItems: SelectDataItem[] = projects.map((data) => ({
                value: data.id,
                label: data.name,
                color: data.color !== undefined ? data.color : null
            }));
            SetSelectProject(projectItems[0].label);
            SetSelectProjectList(projectItems);
            const userInfo = await fetchAuthUserInfo();
            SetUserId(userInfo.id);
            SetOpenSelectProjectDialog(true);
        } catch (error) {
            console.error('プロジェクトの取得に失敗しました', error);
            throw error;
        }

    }

    function handleCloseSelectProjectDialog(selectedId: string): void {
        UpdateUserProject(Number(selectedId), userId);
        SetOpenSelectProjectDialog(false);
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
                    <IconButton color='inherit' onClick={handleChangeProjectClick}
                        sx={{ marginRight: 10 }}>
                        <WebAssetOutlinedIcon />
                    </IconButton>
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
                        if ((value.condition === "signin" && checkLoginStatus()) ||
                            (value.condition === "signout" && !checkLoginStatus()) ||
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
                                                setContent(value.component); // クリックされたアイテムのタイトルをコンテンツにセット
                                                setContentKey(value.key);
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
                selectedValue={selectProject}
                open={openSelectProjectDialog}
                onClose={handleCloseSelectProjectDialog}
            />
        </div >
    );
}


