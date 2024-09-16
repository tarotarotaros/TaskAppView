
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Signin from '../Forms/Signin/SignIn';
import Signup from '../Forms/Signup/Signup';

export default function UserSignin() {
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
                    <Signin />
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
                    <Signup />
                </AccordionDetails>
            </Accordion>
        </div>
    );

};
