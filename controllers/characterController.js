const { marvelApi, buildMarvelApiRoute } = require("../marvel/marvelApi");

class CharacterController {
  async list(req, res) {
    try {
      const { limit, offset } = req.query;

      let queries = {
        limit: 100,
        offset: 0,
      };

      const url = buildMarvelApiRoute("/characters", queries);

      const { data } = await marvelApi.get(url);

      return res.json({
        characters: data.data.results,
        total: data.data.total,
      });
    } catch (error) {
      return res.status(error.status || 400).json(error.message);
    }
  }

  async listData(req, res) {
    try {
      const { limit, offset } = req.params;

      let queries = {
        limit: 20,
        offset: 0,
      };

      const url = buildMarvelApiRoute("/characters", queries);

      const { data } = await marvelApi.get(url);

      return data;
    } catch (error) {
      return console.log(error.message);
    }
  }

  async details(req, res) {
    try {
      const { id } = req.params;

      const url = buildMarvelApiRoute(`/characters/${id}`);

      const { data } = await marvelApi.get(url);

      return res.json(data.data.results);
    } catch (error) {
      return res.status(error.status || 400).json(error.message);
    }
  }

  async detailsData(req, res) {
    try {
      const { id } = req.params;

      const url = buildMarvelApiRoute(`/characters/${id}`);

      const { data } = await marvelApi.get(url);

      return data;
    } catch (error) {
      return console.log(error.message);
    }
  }
}

module.exports = new CharacterController();
