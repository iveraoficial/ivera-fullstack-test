import "dotenv/config"
import md5 from "md5";

const montarQueryStringApi = () => {
    const ts = new Date().getTime();
    const apiKey = process.env.API_KEY;
    const privateKey = process.env.PRIVATE_KEY;
    const hash = md5(ts+privateKey+apiKey);

    return `ts=${ts}&apikey=${apiKey}&hash=${hash}`
}

export {montarQueryStringApi};