import { FormControl, FormLabel, TextField } from "@mui/material";

type PasswordFormProps = {
    password: string,
    passwordError: boolean,
    errorMessage: string
    onChange: (data: any) => void;
};

export default function PasswordForm({ password, passwordError, errorMessage, onChange }: PasswordFormProps) {
    return (
        <FormControl>
            <FormLabel htmlFor="password">パスワード</FormLabel>
            <TextField
                required
                fullWidth
                value={password}
                onChange={onChange}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={errorMessage}
                color={passwordError ? 'error' : 'primary'}
            />
        </FormControl>
    );
}