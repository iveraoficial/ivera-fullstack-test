import {
    createRoot
} from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { StrictMode, Suspense } from 'react';
import AppContext, { IAppContext } from './AppContext';
import Client from './Client';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducer';
import { Box, CircularProgress, CssBaseline } from '@mui/material';

document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore({
        reducer
    });
    const el = document.getElementById('app');
    if(!el){
        return;
    }
    const appContext: IAppContext = {
        client: new Client({
            baseUrl: 'http://localhost:8040'
        })
    };
    const root = createRoot(el);
    root.render(
        <StrictMode>
            <CssBaseline/>
            <Provider store={store}>
                <AppContext.Provider value={appContext}>
                    <BrowserRouter>
                        <Suspense fallback={
                            <Box
                                width={window.innerWidth}
                                height={window.innerHeight}
                            >
                                <CircularProgress/>
                            </Box>
                        }>
                            <App/>
                        </Suspense>
                    </BrowserRouter>
                </AppContext.Provider>
            </Provider>
        </StrictMode>
    );
});