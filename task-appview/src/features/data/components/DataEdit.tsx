import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { AssigneeDataEditService } from "./AssigneeDataEditService";
import DataEditGrid from "./DataEditGrid";
import { PriorityDataEditService } from "./PriorityDataEditService";
import { StatusDataEditService } from "./StatusDataEditService";

export default function DataEdit() {

    const priorityDataEditService = new PriorityDataEditService();
    const statusDataEditService = new StatusDataEditService();
    const assigneeDataEditService = new AssigneeDataEditService();

    const displayDatas = [
        { label: "優先度", content: <DataEditGrid hasColor={false} dataLabel="優先度" dataEditService={priorityDataEditService} /> },
        { label: "ステータス", content: <DataEditGrid hasColor={true} dataLabel="ステータス" dataEditService={statusDataEditService} /> },
        { label: "担当者", content: <DataEditGrid hasColor={false} dataLabel="担当者" dataEditService={assigneeDataEditService} /> },
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
            <Box sx={{ display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: 'divider' }}>
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
