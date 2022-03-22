/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimart = require('./sources/Montlimart');
const adresseParis = require('./sources/adresseParis');
const fs = require('fs');
const db = require('./db');
const shop1='https://www.dedicatedbrand.com/en/men/all-men';
const shop2='https://www.montlimart.com/toute-la-collection.html';
const shop3='https://adresse.paris/630-toute-la-collection';

async function sandbox (eshop,web) {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await web.scrape(eshop);
    for(let i=0;i<products.length;i++){
      if(isNaN(products[i].price)){
        products.splice(i,1);
      }
      else{
        if(i!=products.length-1){
          for(let j=i+1;j<products.length;j++){
            if(products[i].name==products[j].name){
              products.splice(j,1);
            }
          }
        }
      }
      if(eshop.toString().includes("dedicatedbrand")){
        products[i].brand="dedicatedbrand";
      }else{
        if(eshop.toString().includes("montlimart")){
          products[i].brand="montlimart";
        }else{
          products[i].brand="adresseParis";
        }
      }
    }
    fs.writeFileSync('./sources/test.json', JSON.stringify(products,null,'\t'),'utf8',0o666,'as');
    const result = await db.insert(products);
    const brand='montlimart';
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

const [,,eshop] = process.argv;

sandbox(shop1,dedicatedbrand);

async function findBrand(text){
  const query={brand:text};
  const products1 = await db.find(query);
  console.log(products1);
}
const text='montlimart';
//findBrand(text);

async function findPrice(number){
  const query={price:{$lt:number}};
  const products2 = await db.find(query);
  console.log(products2);
}
const price=40;
//findPrice(price);

async function filterPrice(){
  const query={};
  const sort={price:1};
  const product3=await db.find(query,sort);
  console.log(product3);
}
//filterPrice();