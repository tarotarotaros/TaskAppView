import { FormControl, FormLabel, TextField } from "@mui/material";

type EMailFormProps = {
    email: string,
    emailError: boolean,
    errorMessage: string
    onChange: (data: any) => void;
};

export default function EMailForm({ email, emailError, errorMessage, onChange }: EMailFormProps) {
    return (
        <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
                required
                fullWidth
                id="email"
                value={email}
                onChange={onChange}
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={errorMessage}
                color={emailError ? 'error' : 'primary'}
            />
        </FormControl>
    );
}