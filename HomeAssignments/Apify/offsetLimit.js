const WEBSITE_URL = "http://localhost:3000/offset";
const DEFAULT_TIMEOUT = 3000;
const LIMIT = 25;

async function fetchApi(
  offset = 0,
  limit = LIMIT,
  url = WEBSITE_URL,
  timeoutMs = DEFAULT_TIMEOUT
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);
  try {
    const res = await fetch(`${WEBSITE_URL}?offset=${offset}&limit=${limit}`, {
      signal: controller.signal,
    });

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error(`Error Fetching: ${error.message}`);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function getProducts(limit = LIMIT) {
  const first = await fetchApi(0, limit);
  const total = first.total;
  const products = [...first.items];
  let offset = first.items.length;

  while (true) {
    const data = await fetchApi(offset, limit);
    if (!data.items || data.items.length === 0) break;
    products.push(...data.items);
    offset += data.items.length;

    if (data.items.length < limit) break;
  }

  return products;
}

async function main() {
  try {
    const products = await getProducts(25);
    console.log(`Fetched ${products.length} products`);
  } catch (error) {
    throw new Error(`Failed getting products ${error}`);
  }
}

main();
