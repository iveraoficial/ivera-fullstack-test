const axios = require("axios");
const md5 = require("md5");

exports.marvelApi = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
});

exports.buildMarvelApiRoute = (route, queries) => {
  const time = Number(new Date());
  const hash = md5(
    time + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY
  );

  let url = `${route}?&ts=${time}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${hash}`;

  if (queries) {
    for (const [key, value] of Object.entries(queries)) {
      url += `&${key}=${value}`;
    }
  }

  return url;
};
