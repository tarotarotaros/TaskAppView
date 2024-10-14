import { FormControl, FormLabel, TextField } from "@mui/material";

type EMailFormProps = {
    email: string,
    emailError: boolean,
    errorMessage: string,
    keyText: string,
    onChange: (data: any) => void;
};

export default function EMailForm({ email, emailError, errorMessage, keyText, onChange }: EMailFormProps) {

    return (
        <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
                required
                fullWidth
                id={keyText}
                value={email}
                onChange={onChange}
                placeholder="your@email.com"
                name={keyText}
                autoComplete={keyText}
                variant="outlined"
                error={emailError}
                helperText={errorMessage}
                color={emailError ? 'error' : 'primary'}
            />
        </FormControl>
    );
}