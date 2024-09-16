import { FormControl, FormLabel, TextField } from "@mui/material";

type EMailFormProps = {
    email: string,
    emailError: boolean,
    errorMessage: string,
    keyText: string,
    onChange: (data: any) => void;
};

export default function EMailForm({ email, emailError, errorMessage, keyText, onChange }: EMailFormProps) {
    const fullKeyText: string = keyText + "email";

    return (
        <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
                required
                fullWidth
                id={fullKeyText}
                value={email}
                onChange={onChange}
                placeholder="your@email.com"
                name={fullKeyText}
                autoComplete={fullKeyText}
                variant="outlined"
                error={emailError}
                helperText={errorMessage}
                color={emailError ? 'error' : 'primary'}
            />
        </FormControl>
    );
}