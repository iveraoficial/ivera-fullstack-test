const LogRequests = require('../models/LogModel');

exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
};

exports.logRequests = async (req, res, next) => {
  try{
    res.locals.logRequests = req.session.logRequests;
    if(!res.locals.logRequests){
      res.locals.logRequests = {
        requestMethod: 'get',
        url: `http://localhost:3000/logout`,
        parameters: []
      }
      await LogRequests.createLog(res.locals.logRequests);
    } else{
      await LogRequests.createLog(res.locals.logRequests);
    }
  } catch(e){
    console.log(e);
  }
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err && 'EBADCSRFTOKEN' === err.code) {
    return res.render('404');
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) =>{
  if(!req.session.user){
    req.flash('errors', 'Você precisa fazer login');
    req.session.save(()=> res.redirect('http://localhost:3000'))
      return; 
  }
  next();
};
