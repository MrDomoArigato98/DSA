const DEFAULT_ENDPOINT = "http://localhost:3000/page";
const DEFAULT_RETRIES = 3;
const DEFAULT_TIMEOUT = 3000;
const DEFAULT_BACKOFF_MS = 500;
const DEFAULT_LIMIT = 100;

//need a sleeper function
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//We need a function to fetch
async function fetchWithRetry(
  url,
  {
    retries = DEFAULT_RETRIES,
    backoffMs = DEFAULT_BACKOFF_MS,
    timeout = DEFAULT_TIMEOUT,
  } = {}
) {
  let prevError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    const waitTime = backoffMs * 2 ** (attempt - 1);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
    try {
      const res = await fetch(url, { signal: controller.signal });

      if (res.ok) {
        return await res.json();
      }
      const retryable =
        res.status === 429 || (res.status >= 500 && res.status <= 599);

      if (!retryable) {
        throw new Error(
          `Failed with HTTP Status code ${res.status} ${res.statusText}`
        );
      }

      await sleep(waitTime);
      continue;
    } catch (error) {
      if (attempt === retries) throw error;
      prevError = error;
      await sleep(waitTime);
    } finally {
      clearTimeout(timeoutId);
    }
  }
  throw prevError || new Error(`fetchWithRetry failed`);
}
// function that prepares the url
async function fetchWithCursor(nextcursor = "", limit) {
  const qs = new URLSearchParams({ limit: String(limit) });
  if (nextcursor != null && nextcursor != "") {
    qs.set("cursor", nextcursor);
  }
  const url = `${DEFAULT_ENDPOINT}?${qs.toString()}`;
  return await fetchWithRetry(url);
}

//function that loops to get all the products
async function getProducts(limit = DEFAULT_LIMIT) {
  const first = await fetchWithCursor(1, limit);
  let nextCursor = first.nextCursor;
  const products = [...first.items];

  while (nextCursor != null && nextCursor != "") {
    const res = await fetchWithCursor(nextCursor, limit);

    if (!res || !res.items || res.items.length === 0) break;
    console.log(nextCursor);

    products.push(...res.items);
    nextCursor = res.nextCursor ?? null;
    console.log(products.length);
  }
  return products;
}

async function fetchWithPageLimit(page, limit) {
  const qs = new URLSearchParams({ limit: String(limit) });
  qs.set("page", String(page));

  const url = `${DEFAULT_ENDPOINT}?${qs.toString()}`;
  return fetchWithRetry(url);
}
async function getProductsPageLimit(limit) {
  const first = await fetchWithPageLimit(1, limit);
  const products = [...first.items];

  for (let page = 2; page <= first.totalPages; page++) {
    const res = await fetchWithPageLimit(page, limit);
    products.push(...res.items);
  }
  console.log(products.length);
  return products;
}

async function fetchWithOffset(offset, limit) {
  const qs = new URLSearchParams({ limit: String(limit) });
  qs.set("offset", offset);
  const url = `http://localhost:3000/offset?${qs.toString()}`;
  return fetchWithRetry(url);
}

async function getWithOffset(limit) {
  const first = await fetchWithOffset(0, limit);
  let offset = first.items.length;
  const products = [...first.items];

  while (true) {
    const res = await fetchWithOffset(offset, limit);
    if (!res.items || res.items.length === 0) break;
    offset += res.items.length;
    products.push(...res.items);

    if (res.items.length < limit) break;
  }
  console.log(products)
  return products;
}

//Main function
async function main() {
  try {
    // const products = await getProducts(100);
    const products = await getWithOffset(200);
  } catch (error) {
    console.error(error);
  }
}

main();
