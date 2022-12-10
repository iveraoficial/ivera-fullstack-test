import {
    Alert,
    Avatar,
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormEventHandler, useContext, useState } from "react";
import AppContext from "./AppContext";
import { IFrontendUser } from "../../shared";
import { connect } from "react-redux";
import { IAppState, setCurrentUser } from "./reducer";
import { useNavigate } from "react-router-dom";

function Login({setCurrentUser}:{
    setCurrentUser: (user: IFrontendUser) => void;
}){
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const appContext = useContext(AppContext);
    const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
        e.preventDefault();
        if(!appContext){
            return;
        }
        setIsLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');
        if(typeof username === 'string' && typeof password === 'string'){
            const result = await appContext.client.logIn(username,password);
            if('status' in result){
                setErrorMessage(result.message);
            } else {
                setCurrentUser({
                    authId: result.authId,
                    username
                });
                navigate('/characters');
            }
        } else {
            setErrorMessage('please fill out username and password before login');
        }
        setIsLoading(false);
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            {errorMessage ? <Alert severity="error">
                {errorMessage}                
            </Alert> : successMessage ? <Alert severity="success">
                {successMessage}
            </Alert> : null}
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
                    {isLoading ? 'Please wait...' : 'Sign In'}
                </Button>
            </Box>
        </Box>
    );
}

function mapStateToProps({user}: IAppState){
    return {
        user
    };
}

export default connect(mapStateToProps,{
    setCurrentUser
})(Login);
