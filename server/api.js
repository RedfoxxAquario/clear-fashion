const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db =require('./db')
const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/products/:id', async (request, response) => {
  wanted_id=request.params.id;
  result=await db.find({_id:wanted_id});
  //result=String(result);
  console.log(result);
  response.send(result);
});
app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
