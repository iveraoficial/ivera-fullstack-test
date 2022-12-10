import { Alert, Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createIError, isIError } from "../../schema/shared";
import { IError, IFrontendUser, IPagination, IRequestLog } from "../../shared";
import AppContext from "./AppContext";
import { IAppState } from "./reducer";
import {
    DateTime
} from 'luxon';

function Logs({user}: {
    user: IFrontendUser | null;
}){
    const {
        scrollingElement
    } = document;
    const [requestLogs,setRequestLogs] = useState<IRequestLog[]>([]);
    const appContext = useContext(AppContext);
    const [error,setError] = useState<IError | null>(null);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [pagination,setPagination] = useState<IPagination>({
        offset: 0,
        limit: 10
    });

    const fetchLogItems = async () => {
        if(!appContext || isLoading){
            return;
        }
        if(!user){
            setError(createIError({
                message: 'user must be authenticated to see this page.'
            }));
            return;
        }
        setIsLoading(true);
        const result = await appContext.client.logs({
            authId: user.authId,
            offset: pagination.offset.toString(),
            limit: pagination.limit.toString()
        });
        setIsLoading(false);
        if(isIError(result)){
            setError(result);
            return;
        }
        setRequestLogs([
            ...requestLogs,
            ...result.logs
        ]);
    };
    const onScroll = () => {
        if(!scrollingElement){
            return;
        }
        const pct = scrollingElement.scrollTop / (scrollingElement.scrollHeight - scrollingElement.clientHeight);
        if(pct < 0.89){
            return;
        }
        setPagination({
            offset: pagination.limit,
            limit: pagination.limit + 10
        })
    }
    useEffect(() => {
        window.addEventListener('scroll',onScroll);
        return  () => {
            window.removeEventListener('scroll',onScroll);
        };
    });
    useEffect(() => {
        fetchLogItems().catch(reason => {
            console.error(reason);
        });
    },[pagination,user]);
    return (
        <>
            {error ? <Box>
                <Alert severity="error">
                    {error.message}
                </Alert>
            </Box> : null}
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {requestLogs.map((r, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    {r.method}
                                </TableCell>
                                <TableCell>
                                    {r.pathname}
                                </TableCell>
                                <TableCell>
                                    {DateTime.fromISO(r.createdAt).toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isLoading ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CircularProgress/>
                </Box>
            ) : null}
        </>
    )
}

function mapStateToProps({user}: IAppState){
    return {
        user
    };
}

export default connect(mapStateToProps)(Logs);
