const { marvelApi, buildMarvelApiRoute } = require("../marvel/marvelApi");

class CharacterController {
  // GET  http://localhost:3333/characters
  async list(request, response) {
    try {
      const { offset, nameStartsWith } = request.query;

      let queries = {
        limit: 100,
        offset,
      };

      if (nameStartsWith) {
        queries = {
          limit: 100,
          offset: 0,
          nameStartsWith,
        };
      }

      const url = buildMarvelApiRoute("/characters", queries);

      console.log(url);

      const { data } = await marvelApi.get(url);

      return response.json({
        characters: data.data.results,
        total: data.data.total,
      });
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }

  // GET  https://localhost:3333/characters/:id
  async details(request, response) {
    try {
      const { id } = request.params;

      const url = buildMarvelApiRoute(`/characters/${id}`);

      const { data } = await marvelApi.get(url);

      return response.json(data.data.results);
    } catch (error) {
      return response.status(error.status || 400).json(error.message);
    }
  }
}

module.exports = new CharacterController();
