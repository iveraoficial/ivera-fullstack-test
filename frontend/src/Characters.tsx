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
    const appContext = useContext(AppContext);
    const [error,setError] = useState<IError | null>(null);
    const [isLoading,setIsLoading] = useState(false);
    const [filterParams,setFilterParams] = useState<IGetCharactersOffsetAndLimitQueryParameters>({
        nameStartsWith: '',
        offset: '0',
        limit: '10'
    });
    const [characters,setCharacters] = useState<ICharacter[]>([]);
    const onSetFilterParamsUpdate = async () => {
        if(isLoading){
            return;
        }
        if(!appContext){
            throw new Error('no application context available');
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
            return;
        }
        setCharacters([
            ...characters,
            ...result.data.results
        ]);
        setIsLoading(false);
    };
    const onScroll = () => {
        if((window.scrollY / document.body.scrollHeight) >= 0.88){
            setFilterParams({
                ...filterParams,
                offset: filterParams.limit,
                limit: filterParams.limit + 20,
            });
        }
    };
    useEffect(() => {
        window.addEventListener('scroll',onScroll);
        return () => {
            window.removeEventListener('scroll',onScroll);
        };
    });
    useEffect(() => {
        onSetFilterParamsUpdate()
            .catch(() => {
                setError(createIError({
                    message: 'failed to update character list according to characters filter'
                }));
            });
        return () => {
        };
    },[filterParams,appContext]);
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
            {isLoading ? <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress style={{marginTop: '1rem'}}/>
            </Box> : null}
        </Box>
    );
}
