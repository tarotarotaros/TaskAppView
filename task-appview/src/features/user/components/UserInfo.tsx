import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { IUserService } from "../../../infrastructures/IUserService";
import PasswordChange from './PasswordChage';
import UserSetting from "./UserSetting";

type UserInfoProps = {
    userService: IUserService;
};

export default function UserInfo({ userService }: UserInfoProps) {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    ユーザー情報変更
                </AccordionSummary>
                <AccordionDetails>
                    {"変更したいユーザー名・Email、設定済みのパスワードを入力して変更可能です。"}
                    <UserSetting userService={userService} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    パスワード変更
                </AccordionSummary>
                <AccordionDetails>
                    <PasswordChange />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    アカウント削除
                </AccordionSummary>
                <AccordionDetails>
                    {"a"}
                </AccordionDetails>
            </Accordion>
        </div>
    );

};