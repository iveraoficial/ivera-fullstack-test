const PUBLIC_KEY = 'da813cc89300946c251b632e39f75519';


exports.getMarvelData = async (req,res) => {
    const api = await fetch (`https://gateway.marvel.com:443/v1/public/characters?apikey=${PUBLIC_KEY}`)

    if (api.ok) {
        const data = await api.json();

        console.log(data);

        try {
            res.json(data);
        } catch (err) { 
            console.log(err);
        }
    }
}

exports.getCharacterDetails = async (req, res) => {
    const api = await fetch (`https://gateway.marvel.com:443/v1/public/characters/${character_id}?apikey=${PUBLIC_KEY}`)

    if (api.ok) {
        const data = await api.json();
        console.log(data);

        try {
            res.json(data);
        } catch (err) { 
            console.log(err);
        }
    }
}

getMarvelData();