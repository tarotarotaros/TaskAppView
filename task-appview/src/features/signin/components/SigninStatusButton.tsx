
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { IconButton } from '@mui/material';

type SigninStatusButtonProps = {
    onClickButton: () => void; // 保存時にデータを親に渡す関数
};


export default function SigninStatusButton({ onClickButton }: SigninStatusButtonProps) {

    let authToken = sessionStorage.getItem('authToken');
    if (authToken != null) {
        return (
            <IconButton aria-label="UserSetting" size="large" onClick={onClickButton} >
                <ManageAccountsIcon />
            </IconButton >
        );
    } else {
        return null;
    }
};

