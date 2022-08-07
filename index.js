const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const morgan = require('morgan');
const config = require('config');
const devLog = require('debug')('app:dev');
const prodLog = require('debug')('app:db');
const students = require('./routes/students');
const home = require('./routes/home');

console.log(config.get('name'));

app.set('view engine', 'pug');
//deafult in express but if there is layouts folder then add line app.set('views', './layouts');
//app.set('views', './views');

app.use(express.json());
devLog('Before using logger middleware');
app.use(logger);
app.use('/api/students', students);
app.use('/', home);

app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
prodLog('DB connection');
//console.log(app.get('env'));         // - development
//console.log(process.env.NODE_ENV);   // - undefined
if(app.get('env') == 'development') {
     app.use(morgan('tiny'));
}

const port = process.env.PORT || 51174;

//app.get('/', (req,res) => res.send('Express application'));

app.listen(port, () => {
    console.log(`Listing to port ${port}`);
});