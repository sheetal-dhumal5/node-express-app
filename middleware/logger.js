const log = (req,res,next) => {
    //logic goes here
    console.log('Login Middleware');
    next();
};

module.exports = log;