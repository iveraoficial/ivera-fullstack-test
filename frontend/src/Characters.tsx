import {
    Alert,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    TextField,
    Typography
} from "@mui/material";
import {
    ChangeEventHandler,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import { useNavigate } from "react-router-dom";
import { createIError } from "../../schema/shared";
import {
    ICharacter,
    IError,
    IGetCharactersOffsetAndLimitQueryParameters
} from "../../shared";
import AppContext from "./AppContext";

export default function Characters(){
    let filterParamsTimeout: number | null = null;
    let setFilterParamsTimeout: number | null = null;
    const appContext = useContext(AppContext);
    const [error,setError] = useState<IError | null>(null);
    const [isLoading,setIsLoading] = useState(false);
    const [isFull,setIsFull] = useState(false);
    const [filterParams,setFilterParams] = useState<IGetCharactersOffsetAndLimitQueryParameters>({
        offset: '0',
        limit: '10',
        nameStartsWith: ''
    });
    const [characters,setCharacters] = useState<ICharacter[]>([]);
    const onSetFilterParamsUpdate = async () => {
        if(isLoading || isFull || !appContext){
            return;
        }
        setError(null);
        setIsLoading(true);
        const result = await appContext.client.listCharacters(filterParams);
        if('message' in result){
            setError(result);
            setIsLoading(false);
            return;
        }
        if(characters.length >= result.data.total){
            setIsLoading(false);
            setIsFull(true);
            return;
        }
        setCharacters(characters => [
            ...characters,
            ...result.data.results
        ]);
        setIsLoading(false);
    };
    const scheduleOnSetFilterParamsUpdate = () => {
        if(isLoading){
            return;
        }
        if(filterParamsTimeout !== null){
            clearTimeout(filterParamsTimeout);
        }
        filterParamsTimeout = window.setTimeout(() => {
            onSetFilterParamsUpdate()
                .catch(() => {
                    setError(createIError({
                        message: 'failed to update character list according to characters filter'
                    }));
                });
        },500);
    };
    const onScroll = () => {
        const {
            scrollingElement
        } = document;
        if(!scrollingElement){
            return;
        }
        const pct = (scrollingElement.scrollTop / (scrollingElement.scrollHeight - scrollingElement.clientHeight));
        if(pct < 0.9){
            return;
        }
        if(setFilterParamsTimeout !== null) clearTimeout(setFilterParamsTimeout);
        setFilterParamsTimeout = window.setTimeout(() => setFilterParams(filterParams => {
            const limit = parseInt(filterParams.limit,10);
            return {
                ...filterParams,
                offset: limit.toString(),
                limit: (limit + 10).toString()
            };
        }),500);
    };
    useEffect(() => {
        scheduleOnSetFilterParamsUpdate();
        window.addEventListener('scroll',onScroll);
        return () => {
            if(filterParamsTimeout !== null) clearTimeout(filterParamsTimeout);
            if(setFilterParamsTimeout !== null) clearTimeout(setFilterParamsTimeout);
            window.removeEventListener('scroll',onScroll);
        };
    },[]);
    useMemo(() => {
        scheduleOnSetFilterParamsUpdate();
    },[filterParams]);
    const navigate = useNavigate();
    const openCharacterDetails = (c: ICharacter) => {
        navigate(`/characters/${c.id}`);
    };
    const onChangeNameStartsWith: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setCharacters([]);
        setFilterParams({
            offset: '0',
            limit: '10',
            nameStartsWith: e.target.value
        });
    }
    return (
        <Box
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            {error ? <Alert severity="error">
                {error.message}
            </Alert> : null}
            <TextField
                style={{
                    marginTop: '1rem',
                    width:'100%'
                }}
                label="Search"
                variant="filled"
                onChange={onChangeNameStartsWith}
                value={filterParams.nameStartsWith}/>
            {characters.map((c,i) => (
                <Card key={i} style={{marginTop: '1rem'}}>
                    <CardMedia
                        height="200"
                        image={`${c.thumbnail.path}.${c.thumbnail.extension}`}
                        component="img"/>
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            {c.name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => openCharacterDetails(c)}>
                            Details
                        </Button>
                    </CardActions>
                </Card>
            ))}
            <Box display="flex" justifyContent="center" alignItems="center">
                {isLoading ? <CircularProgress style={{marginTop: '1rem'}}/> : null}
                {isFull ? (
                    <>
                        No more
                    </>
                ) : null}
            </Box>
        </Box>
    );
}
