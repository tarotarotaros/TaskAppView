
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { IUserService } from '../../../infrastructures/IUserService';
import Signin from './Signin';
import Signup from './Signup';

type UserSigninProps = {
    userService: IUserService;
};

export default function UserSignin({ userService }: UserSigninProps) {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    サインイン
                </AccordionSummary>
                <AccordionDetails>
                    <Signin userService={userService} />
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
                    <Signup userService={userService} />
                </AccordionDetails>
            </Accordion>
        </div>
    );

};
