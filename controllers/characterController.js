const { marvelApi, buildMarvelApiRoute } = require("../marvel/marvelApi");

class CharacterController {
  // API
  async list(req, res) {
    try {
      const { offset, nameStartsWith } = req.query;

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

      const { data } = await marvelApi.get(url);

      return res.json({
        characters: data.data.results,
        total: data.data.total,
      });
    } catch (error) {
      return res.status(error.status || 400).json(error.message);
    }
  }

  // API
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

  // PUG
  async listData(req, res) {
    try {
      const { offset, nameStartsWith } = req.query;

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

      const { data } = await marvelApi.get(url);

      return data;
    } catch (error) {
      return console.log(error.message);
    }
  }

  // PUG
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
