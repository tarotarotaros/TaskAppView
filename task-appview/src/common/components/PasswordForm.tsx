import { FormControl, FormLabel, TextField } from "@mui/material";

type PasswordFormProps = {
    password: string,
    passwordError: boolean,
    errorMessage: string,
    keyText: string,
    onChange: (data: any) => void;
};

export default function PasswordForm({ password, passwordError, errorMessage, keyText, onChange }: PasswordFormProps) {
    const fullKeyText: string = keyText + "password";

    return (
        <FormControl>
            <FormLabel htmlFor="password">パスワード</FormLabel>
            <TextField
                required
                fullWidth
                value={password}
                onChange={onChange}
                name={fullKeyText}
                placeholder="••••••"
                type="password"
                id={fullKeyText}
                autoComplete={fullKeyText}
                variant="outlined"
                error={passwordError}
                helperText={errorMessage}
                color={passwordError ? 'error' : 'primary'}
            />
        </FormControl>
    );
}