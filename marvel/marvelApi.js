const axios = require("axios");

exports.marvelApi = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
});

exports.buildMarvelApiRoute = (route, queries) => {
  let url = `${route}?apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${process.env.MARVEL_HASH}&ts=${process.env.MARVEL_TIMESTAMP}`;

  if (queries) {
    for (const [key, value] of Object.entries(queries)) {
      url += `&${key}=${value}`;
    }
  }

  return url;
};
