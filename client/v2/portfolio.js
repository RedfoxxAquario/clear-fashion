// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const filterByPrice = document.querySelector('#filter-price');
const filterByDate = document.querySelector('#filter-date');
const selectsort = document.querySelector('#sort-select');
const selectBrand = document.querySelector('#brand-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbNewProducts = document.querySelector('#nbNewProducts');
const spanP50 = document.querySelector('#p50');
const spanP90 = document.querySelector('#p90');
const spanP95 = document.querySelector('#p95');
const spanLastReleasedDate = document.querySelector('#lastReleasedDate');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-coral.vercel.app/products/search`
    );

    const result = await response.json();
    console.log("result :");
    console.log(result); 

    if(result.length==0){
      console.error(result);
      return{currentProducts,currentPagination};
    }
    let meta = {"currentPage":page,"count":result.length,"pageCount":1,"pageSize":result.length}
    let res = {result,meta}
    //console.log(res);
    return res;
  
  } catch (error) {
    console.log("in catch :");
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  console.log('products :',products);
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = (pagination,products )=> {
  const {count} = pagination;
  const nb=NbNewProducts(products);
  const p50=p_value(products,50);
  const p90=p_value(products,90);
  const p95=p_value(products,95);
  const lastReleasedDate=LastReleasedDate(products);
  console.log(lastReleasedDate)
  spanNbProducts.innerHTML = count;
  spanNbNewProducts.innerHTML=nb;

  spanLastReleasedDate.innerHTML=lastReleasedDate;
  spanP50.innerHTML=p50;
  spanP90.innerHTML=p90;
  spanP95.innerHTML=p95;
};

function p_value(products,value){
  const val=(100-value)/100;

  var prices=new Set();
  for(let i=0;i<products.length;i++){
    prices.add(products[i].price);
  }
  var tab=Array.from(prices);
  tab.sort(function(a, b) {return a - b;});
  //console.log(tab[Math.trunc(val*tab.length)])
  return tab[Math.trunc(val*tab.length)];
}

function LastReleasedDate(products){
  var releasedates=new Set();
  for(let i=0;i<products.length;i++){
    releasedates.add(products[i].released);
    //console.log(products[i].released);
  }
  var tab=Array.from(releasedates);
  tab.sort(function(a, b) {return a - b;});
  //console.log(tab[0])
  return tab[0];
}

function NbNewProducts(products){
  var x = 0;
  for (let i=0;i<products.length;i++)
  {
    //console.log(new Date(Math.abs(Date.now() - 12096e5)))
    //console.log(new Date(products[i].released))
    if (new Date(products[i].released)>new Date(Math.abs(Date.now() - 12096e5)))
    {
      x=x+1;
    }
  }
  //console.log(x);
  return x;
}

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination,products);
  renderBrandination(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value), currentPagination.size)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

filterByPrice.onclick=function(){
  currentProducts=currentProducts.filter(a=>a.price<50);
  render(currentProducts,currentPagination);
};

filterByDate.onclick=function(){
  currentProducts=currentProducts.filter(a=>
    Math.abs(new Date(a.released)-Date.now())>12096e5
  );
  render(currentProducts,currentPagination);
};

selectsort.addEventListener('change',event=>{
  switch(event.target.value){
    case 'price-asc':
      currentProducts.sort(function(a, b) {return a.price - b.price;});
      break;
    case 'price-desc':
      currentProducts.sort(function(a, b) {return a.price - b.price;}).reverse();
      break;
    case 'date-asc':
      currentProducts.sort(function(a, b) {return new Date(a.released.split('-')[0],a.released.split('-')[1],a.released.split('-')[2]) - new Date(b.released.split('-')[0],b.released.split('-')[1],b.released.split('-')[2]);});
      break;
    case 'date-desc':
      currentProducts.sort(function(a, b) {return new Date(a.released.split('-')[0],a.released.split('-')[1],a.released.split('-')[2]) - new Date(b.released.split('-')[0],b.released.split('-')[1],b.released.split('-')[2]);}).reverse();
      break;
    default:
      console.log("patate");
  }
  render(currentProducts, currentPagination);
});

const renderBrandination = products => {
  let brands=[];
  for (let i=0;i<currentProducts.length;i++){
    brands.push(currentProducts[i].brand)
  }
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  var unique_brands = brands.filter(onlyUnique);
  const options = Array.from(
    {'length': unique_brands.length},
    (value, index) => `<option value="${unique_brands[index]}">${unique_brands[index]}</option>`
  ).join('');

  selectBrand.innerHTML = options;
};

selectBrand.addEventListener('change', event=>{
  currentProducts=currentProducts.filter(a=>a.brand == event.target.value);
  render(currentProducts,currentPagination);
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);
