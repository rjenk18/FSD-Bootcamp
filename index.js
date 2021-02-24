const express = require('express');
const routes = require('./routes/routes');
const port = 8000;
const app = express();
const router = express.Router();

routes(router);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', router);

app.listen(port, function() {
  console.log("Listening" + port);
});
