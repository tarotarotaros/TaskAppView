import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

export default function DataEdit() {

    const displayDatas = [
        { label: "優先度", content: <div>優先度の内容</div> },
        { label: "ステータス", content: <div>ステータスの内容</div> },
        { label: "担当者", content: <div>担当者の内容</div> },
        { label: "プロジェクト", content: <div>プロジェクトの内容</div> }
    ];

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function generateId(type: 'tab' | 'tabpanel', index: number) {
        return `simple-${type}-${index}`;
    }

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index } = props;
        return (
            <div
                id={generateId('tabpanel', index)}
                aria-labelledby={generateId('tab', index)}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    function TabProps(index: number) {
        return {
            id: generateId('tab', index),
            'aria-controls': generateId('tabpanel', index),
        };
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    {displayDatas.map((tab, index) => (
                        <Tab key={index} label={tab.label} {...TabProps(index)} />
                    ))}
                </Tabs>
            </Box>
            {displayDatas.map((tab, index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    {tab.content}
                </CustomTabPanel>
            ))}
        </Box>
    );
};
