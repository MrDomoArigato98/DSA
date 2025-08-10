const WEBSITE_URL = "http://localhost:3000/page";
const DEFAULT_TIMEOUT = 3000;

async function fetchApi(
  pageIndex = 1,
  limit = 100,
  url = WEBSITE_URL,
  timeoutMs = DEFAULT_TIMEOUT
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const res = await fetch(`${url}?page=${pageIndex}&limit=100`, {
      signal: controller.signal,
    });
    if (res.ok) {
      return await res.json();
    } else {
      console.error(`HTTP Error ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error(`Failed to fetch ${error.message}`);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function getProducts(limit = 100) {
  const first = await fetchApi(1, limit);
  let products = [...first.items];

  for (let page = 2; page <= first.totalPages; page++) {
    const res = await fetchApi(page);
    products.push(...res.items);
  }
  return products;
}

async function main() {
  try {
    const products = await getProducts(100);
    console.log(products);
  } catch (error) {
    console.log(error);
  }
}

main();
