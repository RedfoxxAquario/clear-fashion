// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);
//const marketplace=require('C:/Users/lilil/Documents/Lisa/Formation ESILV 2018 2023/A4/S2/Web application architecture/clear-fashion/client/v1/data.js');
const marketplace=require('./data.js');


/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

let cheapshirt={'url':'','price':10000};
for(let i=0;i<marketplace.length;i++){
  MY_FAVORITE_BRANDS.forEach(element=>{
    if(marketplace[i].brand.toLowerCase()==element.name.toLowerCase()){
      if(marketplace[i].name.toLowerCase().search("t-shirt")!=-1){
        if(marketplace[i].price<cheapshirt.price){
          cheapshirt.url=marketplace[i].link;
          cheapshirt.price=marketplace[i].price;
        }
      }
  }});
}
console.log(cheapshirt.url);


/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

const marketplace=require('./data.js');
var counter = 0
console.log(marketplace);
for (let i = 0; i < marketplace.length; i++) {
  counter = counter+1;
}
console.log(counter)

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

let brands=[];
for (let i=0;i<marketplace.length;i++){
  brands.push(marketplace[i]['brand'])
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

console.log(brands)
var unique_brands = brands.filter(onlyUnique);
console.log(unique_brands.length)

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable

const sorted_market = marketplace.sort(function(a, b){return a.price - b.price});
for (let i = 0; i < sorted_market.length; i++) {
  console.log(sorted_market[i]);
}


// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable
const sorted_market_by_date = marketplace.sort(function(a, b){return new Date(b.date) - new Date(a.date)});
for (let i = 0; i < sorted_market_by_date.length; i++) {
  console.log(sorted_market_by_date[i]);
}


// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

const marketplace2 = []
for (let i = 0; i < marketplace.length; i++) {
  if(marketplace[i].price >50 && marketplace[i].price <100){
    marketplace2.push(marketplace[i]);
  }
}console.log(marketplace2);
const sorted_50_100_market = marketplace2.sort(function(a, b){return a.price - b.price});
for (let i = 0; i < sorted_50_100_market.length; i++) {
  console.log(sorted_50_100_market[i]);
}

// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
// 2. Log the average


var average=0;
for(let i=0;i<marketplace.length;i++){
  average+=marketplace[i].price;
}
average/=marketplace.length;
console.log(average);


/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */


// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands$

const brands_bis={}
for(let i=0;i<unique_brands.length;i++)
{
  brands_bis[unique_brands[i]]=[]
}
for (let i=0;i<marketplace.length;i++)
{
  brands_bis[marketplace[i]['brand']].push(marketplace[i])
}
console.log(brands_bis)
for(let i=0;i<unique_brands.length;i++)
{
  console.log(brands_bis[unique_brands[i]].length)
}


// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort
var dico={};
for(let i=0;i<marketplace.length;i++){
  if(marketplace[i].brand in dico){
    dico[marketplace[i].brand].push(marketplace[i]);
  }
  else{
    dico[marketplace[i].brand]=[marketplace[i]];
  }
}
for(let i=0;i<Object.keys(dico).length;i++){
  const sorted_brand=dico[Object.keys(dico)[i]].sort(function(a, b){return a.price - b.price});
  for(let j=0;j<sorted_brand.length;j++){
    //console.log(sorted_brand[j]);
  }
}



// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort
console.log("Sort by date for each brand")
for(let i=0;i<unique_brands.length;i++)
{
  //console.log("brand : ",unique_brands[i])
  let sorted=[];
  sorted = brands_bis[unique_brands[i]].sort(function(a, b){return new Date(b.date) - new Date(a.date)});
  for (let j=0;j<sorted.length;j++)
  {
    //console.log(sorted[j])
  }
}


/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products
var p90=0;
var prices=new Set();
for(let i=0;i<marketplace.length;i++){
  prices.add(marketplace[i].price);
}
var tab=Array.from(prices);
tab.sort(function(a, b) {return a - b;});
console.log(tab[Math.trunc(0.1*tab.length)]);




/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
console.log("new released products")
var x = new Boolean("false");
for (let i=0;i<COTELE_PARIS.length;i++)
{
  if (new Date(COTELE_PARIS.released)>new Date(Date.now() - 12096e5))
  {
    x=new Boolean("true");
  }
}
console.log(x)

// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€
console.log("reasonable price")
var x = new Boolean("false");
for (let i=0;i<COTELE_PARIS.length;i++)
{
  if (COTELE_PARIS[i]['price']>100)
  {
    x=new Boolean("true");
  }
}
console.log(x)

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product
console.log("specific product")
for (let i=0;i<COTELE_PARIS.length;i++)
{
  if (COTELE_PARIS[i]['uuid']===`b56c6d88-749a-5b4c-b571-e5b5c6483131`)
  {
    console.log(COTELE_PARIS[i])
    break;
  }
}

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product
console.log("delete a specific product")
console.table(COTELE_PARIS)

for (let i=0;i<COTELE_PARIS.length;i++)
{
  if (COTELE_PARIS[i]['uuid']===`b56c6d88-749a-5b4c-b571-e5b5c6483131`)
  {
    COTELE_PARIS.splice(i,1)
    break;
  }
}
console.table(COTELE_PARIS)


// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?
console.log(jacket);
console.log(blueJacket);

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties
Object.assign(jacket,blueJacket);
jacket.favorite=true;
console.log(jacket);
console.log(blueJacket);




/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
localStorage.setItem('MY_FAVORITES_BRANDS',JSON.stringify(MY_FAVORITE_BRANDS));
var brand=localStorage.getItem('MY_FAVORITES_BRANDS');
//console.log(brand);