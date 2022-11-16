const  axios = require('axios');
const md5 = require('md5');
const { ids } = require('webpack');


class Character {
    constructor(body){
        this.body = body;
        this.user = null
    }

    static createHash(){
        const apiKeyPu = "197de9a1103a002f827026b400a57be8";
        const apiKeyPri = "561165f97250d50774e45786f78e674cdfd1f75a";
        const timeStamp = Number(new Date());
        const hash = md5(timeStamp + apiKeyPri + apiKeyPu);

        const urlVal = {
            apiKey : apiKeyPu,
            time : timeStamp,
            hash : hash
        }
        return urlVal;
    }

    static createUrl(offset, name = false){
        if(!name) {
            const urlVals = this.createHash();
            const url = `http://gateway.marvel.com/v1/public/characters?ts=${urlVals.time}&apikey=${urlVals.apiKey}&hash=${urlVals.hash}&limit=100&offset=${offset}`;
            return url;
        }
        else {
            const urlVals = this.createHash();
            const url = `http://gateway.marvel.com/v1/public/characters?name=${name}&ts=${urlVals.time}&apikey=${urlVals.apiKey}&hash=${urlVals.hash}`;
            return url;
        }
    }

    static createUrlId(id){
        const urlVals = this.createHash();
        const url = `http://gateway.marvel.com/v1/public/characters?id=${id}&ts=${urlVals.time}&apikey=${urlVals.apiKey}&hash=${urlVals.hash}`;
        return url;
    }

    static async buscaChacaracters(page = 0){
        const totalResult = [];
        let cleanResult1=[];
        let cleanResult2=[];
        const offset = [0,100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500];

        try{
            const url = this.createUrl(offset[page]);
            await axios.get(url)
            .then(response =>{
                const result = response.data.data.results;
                cleanResult1 = result.slice(0,50);
                cleanResult2 = result.slice(50, result.length);
            })
            .catch(e =>{
                console.log(e);
                
            })
            totalResult.push(cleanResult1);
            totalResult.push(cleanResult2);
            return totalResult;
        } catch(e){
            console.log(e);
        }
    }

    static async buscaCharacter(name){
        let result = [];
        try{
            const url = this.createUrl(0,name);
            await axios.get(url)
            .then(response =>{
                result = response.data.data.results;
            })
            .catch(e =>{
                // console.log(e);
                
            })
            return result;
        } catch(e){
            console.log(e);
        }
    }

    static async buscaCharacterId(id){
        let result = [];
        const url = this.createUrlId(id)
        await axios.get(url)
        .then(response =>{
            result = response.data.data.results;
        })
        .catch(e =>{
            console.log(e);
        })
        return result[0];
    }
}

module.exports = Character;