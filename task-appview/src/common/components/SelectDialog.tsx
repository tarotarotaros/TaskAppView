import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { SelectDataItem } from "../../types/SelectDataItem";


export interface SimpleDialogProps {
    open: boolean;
    title: string;
    options: SelectDataItem[];
    selectedValue: string;
    onClose: (value: string) => void;
}

export default function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open, options, title } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{title}</DialogTitle>
            <List sx={{ pt: 0, maxHeight: 300, overflowY: 'auto' }}>
                {options.map((option) => (
                    <ListItem disableGutters key={option.label}>
                        <ListItemButton onClick={() => handleListItemClick(option.value)}>
                            <ListItemText primary={option.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}