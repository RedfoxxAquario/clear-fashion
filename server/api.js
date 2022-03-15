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
app.get('/products/search/', async (request, response) => {
  var url=new URL('http://localhost:8092'+request.originalUrl);
  console.log('search params:',url.searchParams)
  query={}
  if(url.searchParams.has('brand')){
    console.log('has brand')
    query['brand']=url.searchParams.get('brand');
  }
  if(url.searchParams.has('price')){
    console.log('has price')
    query['price']=parseInt(url.searchParams.get('price'));  }

  if(url.searchParams.has('limit')){
    console.log('has limit')
    var wanted_limit=parseInt(url.searchParams.get('limit'));  }
  console.log("query:",query);
  result=await db.find(query,0,limit=wanted_limit);
  //result=String(result);
  //console.log(result);
  response.send(result);
});

app.get('/products/:id', async (request, response) => {
  wanted_id=request.params.id;
  result=await db.find({_id:wanted_id});
  console.log(result);
  response.send(result);
});


app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
