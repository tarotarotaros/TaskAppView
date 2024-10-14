
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { IUserService } from '../../../infrastructures/IUserService';
import Login from './Login';
import Register from './Register';

type UserLoginProps = {
    userService: IUserService;
};

export default function UserLogin({ userService }: UserLoginProps) {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    ログイン
                </AccordionSummary>
                <AccordionDetails>
                    <Login userService={userService} />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    アカウント登録
                </AccordionSummary>
                <AccordionDetails>
                    <Register userService={userService} />
                </AccordionDetails>
            </Accordion>
        </div>
    );

};
