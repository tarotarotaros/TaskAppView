import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessPage from '../Pages/SuccessPage';
import { SidebarData } from "./SidebarData";

const sidebarwidth = 250;
export default function SideMenuWithHeader() {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(<SuccessPage />); // 初期コンテンツ
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
    return (
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" style={{ zIndex: 1201 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        タスク管理
                    </Typography>
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
                }}
            >
                <Toolbar />
                <List>
                    {SidebarData.map((value, key) => {
                        if ((value.condition === "signin" && checkLoginStatus()) ||
                            (value.condition === "signout" && !checkLoginStatus()) ||
                            value.condition === "") {
                            return (
                                <ListItem key={key} disablePadding>
                                    <ListItemButton
                                        onClick={() => {
                                            if (value.title === "サインアウト") {
                                                signout();
                                            } else {
                                                setContent(value.component); // クリックされたアイテムのタイトルをコンテンツにセット
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
            <main style={{ flexGrow: 1, padding: '16px', marginLeft: open ? sidebarwidth : 0 }}>
                <Toolbar />
                <Typography>
                    {content} {/* 動的に変更されるコンテンツ */}
                </Typography>
            </main>
        </div>
    );
}
