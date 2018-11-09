const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const operationsRoute = require('./modules/operationsRoute');
const usersRoute = require('./modules/usersRoute');
const articlesRoute = require('./modules/articlesRoute');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "OPTIONS, POST, PUT, GET, HEAD, BODY");
  res.header("Access-Control-Allow-Methods", "OPTIONS, POST, PUT, GET, HEAD, BODY");
  res.header("Allow", "OPTIONS, POST, PUT, GET, HEAD, BODY");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
  next();
  
});


app.use('/operations', operationsRoute);
app.use('/users', usersRoute);
app.use('/articles', articlesRoute);


app.listen(process.env.PORT, function() {
  console.log('API app start...');
  // db.sync({force:false})
  //   .then(message => {
  //     console.log('Database is synced...')
  //   })
  //   .catch()
})

