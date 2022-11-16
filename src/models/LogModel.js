const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    requestMethod: { type: String, required: true },
    url: {type: String, required: true},
    parameters: {type: Object, required: true}
  });
  
  const LogModel = mongoose.model('Log', LogSchema);

class LogRequests{
    constructor(body){
        this.body = body;
    }

    static async createLog(values){
        this.body = await LogModel.create(values);
    }

    static async buscaLog(){
        const log = await LogModel.find()
        return log;
    }
}

module.exports = LogRequests;