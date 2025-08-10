// const WEBSITE = "https://api.ecommerce.com/products";
const WEBSITE = "http://localhost:3000/products";
const MAX_COUNT = 1000;
const MIN_PRICE = 0;
const MAX_PRICE = 100000;

async function fetchProducts(min, max) {
  try {
    const res = await fetch(`${WEBSITE}?minPrice=${min}&maxPrice=${max}`);
    return await res.json();
  } catch (error) {
    throw new Error(`Failed fetching ${error}`);
  }
}

async function getProducts(min = MIN_PRICE, max = MAX_PRICE) {
  const res = await fetchProducts(min, max);

  if (res.count < MAX_COUNT) {
    return res.products;
  }

  if (min === max) {
    throw new Error("We have reached convergence");
  }

  const mid = Math.floor((min + max) / 2);
  const left = await getProducts(min, mid);
  const right = await getProducts(mid+1, max);

  return [...left, ...right];
}

async function main() {
  try {
    const products = await getProducts();
    console.log(products);
  } catch (error) {
    throw new Error(`Failed ${error}`);
  }
}

main();
