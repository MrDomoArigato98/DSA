/*
Goal: 
Extract data from  https://api.ecommerce.com/products

- Simple GET
- Max 1000 productsp er API Call
- Price between $0 and $100,000
- minPrice & maxPrice Query string

API Returns this
{
"total": 99999,
"count": 1000,
"products": [{}, {}, ...]
}

*/

const { log } = require("node:console");

const WEBSITE_URL = "http://localhost:3000/products";
const MAX_COUNT = 1000;
const MIN_PRICE = 0;
const MAX_PRICE = 100000;

async function fetchData(min, max) {
  //Here we fetch from the API
  try {
    const res = await fetch(`${WEBSITE_URL}?minPrice=${min}&maxPrice=${max}`);
    return await res.json();
  } catch (error) {
    throw new Error(`Failed to get data: ${error.message}`);
  }
}

async function getProducts(min, max) {
  const res = await fetchData(min, max);

  if (res.count < MAX_COUNT) {
    return res.products;
  }

  if (min === max) {
    console.warn("Test");
    throw new Error(`Too many products at price ${min}, stuck`);
  }

  const mid = Math.floor((min + max) / 2);
  const left = await getProducts(min, mid); // min to mid
  const right = await getProducts(mid + 1, max); // mid to right

  return [...left, ...right];
}

async function main() {
  try {
    const products = await getProducts(MIN_PRICE, MAX_PRICE);
    products.sort(sortProducts);
    console.log(products);
    
  } catch (error) {
    throw new Error(`Failed to get products: ${error.message}`);
  }
}

function sortProducts(a, b) {
  if (a.id > b.id) return 1;
  if (b.id > a.id) return -1;
  return 0;
}
main();
