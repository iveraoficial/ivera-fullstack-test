import {
    AppBar,
    Button,
    Container,
    Toolbar,
    Typography
} from "@mui/material";
import { lazy } from "react";
import { connect } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { IUser } from "../../shared";
import Character from "./Character";
import { IAppState } from "./reducer";

const Register = lazy(() => import('./Register'));
const Login = lazy(() => import('./Login'));
const Characters = lazy(() => import('./Characters'));
const Logs = lazy(() => import('./Logs'));

function App({user}: {
    user: IUser | null;
}){
    const navigate = useNavigate();
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Home
                    </Typography>
                    {user === null ? <>
                        <Button color="inherit" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                        <Button color="inherit" onClick={() => navigate('/register')}>
                            Register
                        </Button>
                    </> : (
                        <>
                            <Button color="inherit" onClick={() => navigate('/characters')}>
                                Characters
                            </Button>
                            <Button color="inherit" onClick={() => navigate('/logs')}>
                                Request logs
                            </Button>
                            <Button color="inherit">
                                {user.username}
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm">
                <Routes>
                    <Route path="/">
                        <Route index element={<div>start</div>} />
                        <Route path="register" element={<Register/>} />
                        <Route path="login" element={<Login/>} />
                        <Route path="characters" element={<Characters/>} />
                        <Route path="logs" element={<Logs/>} />
                        <Route path="characters/:characterId" element={<Character/>} />
                    </Route>
                </Routes>
            </Container>
        </>
    );
}

function mapStateToProps({user}: IAppState){
    return {
        user
    };
}

export default connect(mapStateToProps)(App);
