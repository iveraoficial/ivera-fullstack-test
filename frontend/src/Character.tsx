import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isICharacters, isIError } from "../../schema/shared";
import { ICharacter } from "../../shared";
import AppContext from "./AppContext";

export default function Character(){
    const appContext = useContext(AppContext);
    const {characterId} = useParams();
    const [errorMessage,setErrorMessage] = useState<string | null>(null);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [character,setCharacter] = useState<ICharacter | null>(null);
    const getCharacterDetails = async () => {
        if(!characterId || !appContext){
            return;
        }
        setIsLoading(true);
        setErrorMessage(null);
        const result = await appContext.client.getCharacter(characterId);
        setIsLoading(false);
        if(isIError(result)){
            setErrorMessage(result.message);
            return;
        } else if(!isICharacters(result)){
            setErrorMessage('backend has returned invalid data');
            return;
        }
        const [first] = result.data.results;
        if(!first){
            setErrorMessage(`no character could be found with id: ${characterId}`);
            return;
        }
        setCharacter(first);
    }
    useEffect(() => {
        getCharacterDetails()
            .catch(reason => {
                console.error(reason);
            })
    },[characterId]);
    if(errorMessage){
        return (
            <Box>
                <Alert severity="error">
                    {errorMessage}
                </Alert>
            </Box>
        )
    }
    if(!character){
        return (
            <Box>
                no character available yet
            </Box>
        );
    }
    if(isLoading){
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <CircularProgress/>
            </Box>
        )
    }
    return (
        <>
            <Card style={{marginTop: '1rem'}}>
                <CardMedia
                    component="img"
                    image={`${character.thumbnail.path}.${character.thumbnail.extension}`}/>
                <CardContent>
                    <Typography variant="h4">
                        {character.name}
                    </Typography>
                    <Box>
                        {character.description || 'No description available.'}
                    </Box>
                    <Typography variant="h5">
                        Comics
                    </Typography>
                    {character.comics.items.length ? character.comics.items.map((item,i) => (
                        <Box key={i}>
                            <Button key={item.resourceURI} variant="text">
                                {item.name}
                            </Button>
                        </Box>
                    )) : <Box>No comics available</Box>}
                    <Typography variant="h5">
                        Events
                    </Typography>
                    {character.events.items.length ? character.events.items.map((e,i) => (
                        <Box key={i}>
                            <Button variant="text">
                                {e.name}
                            </Button>
                        </Box>
                    )) : <Box>
                        No events available to show
                    </Box>}
                </CardContent>
            </Card>
        </>
    );
}