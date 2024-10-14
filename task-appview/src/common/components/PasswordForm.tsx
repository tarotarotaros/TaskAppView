import { FormControl, FormLabel, TextField } from "@mui/material";

type PasswordFormProps = {
    title?: string,
    password: string,
    passwordError: boolean,
    errorMessage: string,
    keyText: string,
    onChange: (data: any) => void;
};

export default function PasswordForm({ title = "パスワード", password, passwordError, errorMessage, keyText, onChange }: PasswordFormProps) {

    return (
        <FormControl>
            <FormLabel htmlFor="password">{title}</FormLabel>
            <TextField
                required
                fullWidth
                value={password}
                onChange={onChange}
                name={keyText}
                placeholder="••••••"
                type="password"
                id={keyText}
                autoComplete={keyText}
                variant="outlined"
                error={passwordError}
                helperText={errorMessage}
                color={passwordError ? 'error' : 'primary'}
            />
        </FormControl>
    );
}