import { Alert, Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { FormEventHandler, useContext, useState } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AppContext from "./AppContext";

export default function Register(){
    const [errorMessage,setErrorMessage] = useState<string | null>(null);
    const [successMessage,setSuccessMessage] = useState<string | null>(null);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const appContext = useContext(AppContext);
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if(!appContext){
            return;
        }
        const data = new FormData(e.currentTarget);
        const [username,password] = [
            data.get('username'),
            data.get('password')
        ];
        if(typeof username !== 'string' || typeof password !== 'string'){
            return;
        }
        setSuccessMessage(null);
        setErrorMessage(null);
        setIsLoading(true);
        try {
            const result = await appContext.client.registerUser(
                username,
                password
            );
            if(result.status === 'failure'){
                setErrorMessage(`failed to create account with error: ${result.message}`);
            } else {
                setSuccessMessage('account successfully created');
            }
        } catch(reason) {
            setErrorMessage('internal failure, please try again later');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {successMessage ? <Alert severity="success">
                {successMessage}
            </Alert> : errorMessage && <Alert severity="error">
                {errorMessage}
            </Alert>}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box onSubmit={onSubmit} component="form">
                <TextField
                    fullWidth
                    autoComplete="username"
                    required
                    margin="normal"
                    id="username"
                    name="username"
                    label="Username"/>
                <TextField
                    type="password"
                    fullWidth
                    autoComplete="password"
                    required
                    margin="normal"
                    id="password"
                    name="password"
                    label="Password"/>
                <Button
                    disabled={isLoading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    {isLoading ? 'Please wait...' : 'Sign Up'}
                </Button>
            </Box>
        </Box>
    );
}
