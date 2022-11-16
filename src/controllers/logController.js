const LogRequests = require('../models/LogModel')

exports.showLog = async (req,res)=>{
    try{
        const logs = await LogRequests.buscaLog();
        res.send(logs);
    } catch(e){
        console.log(e);
        res.render('404');
    }
}