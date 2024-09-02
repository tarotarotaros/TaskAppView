import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { SidebarData } from "./SidebarData";
const drawerWidth = 240;

export default function SideMenuWithHeader() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div style={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" style={{ zIndex: 1201 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        My Application
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                style={{ width: drawerWidth, flexShrink: 0 }}
                PaperProps={{
                    style: {
                        width: drawerWidth,
                    },
                }}
            >
                <Toolbar />
                <List>
                    {SidebarData.map((value, key) => {
                        return (
                            <ListItem key={key} disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        window.location.pathname = value.link;
                                    }} >
                                    <ListItemIcon>
                                        {value.icon} {/* SidebarData の icon プロパティを表示 */}
                                    </ListItemIcon>
                                    <ListItemText primary={value.title} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
            <main style={{ flexGrow: 1, padding: '16px', marginLeft: open ? drawerWidth : 0 }}>
                <Toolbar />
                <Typography>
                    Content goes here.
                </Typography>
            </main>
        </div>
    );
}
