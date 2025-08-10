const ENDPOINT_URL = "http://localhost:3000/cursor";
const DEFAULT_TIMEOUT = 3000;
const DEFAULT_LIMIT = 100;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url, { retries = 3, backoffMs = 200 } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return await res.json();
      }

      const retryable =
        res.status === 429 || (res.status <= 500 && res.status <= 599);
      if (!retryable || attempt === retries) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      const wait = backoffMs * 2 ** (attempt - 1);
      await sleep(wait);
      console.log(`Retrying to ${url} with a back off of ${wait}ms`);
      continue;
    } catch (error) {
      lastError = error;
      if (attempt === retries) throw error;
      const wait = backoffMs * 2 ** (attempt - 2);
      await sleep(wait);
    }
  }
  throw lastError || new Error("fetchWithRetry failed");
}

async function fetchPage(nextCursor = "", limit = DEFAULT_LIMIT) {
  const qs = new URLSearchParams({ limit: String(limit) });
  if (nextCursor != null && nextCursor !== "") {
    qs.set("cursor", nextCursor);
  }
  const url = `${ENDPOINT_URL}?${qs.toString()}`;

  return fetchWithRetry(url, { retries: 4, backoffMs: 1000 });
}

async function getItems(limit = DEFAULT_LIMIT) {
  const first = await fetchPage(null, limit);
  let nextCursor = first.nextCursor;
  const products = [...first.items];

  while (nextCursor !== null) {
    const res = await fetchPage(nextCursor, limit);
    if (!res || !res.items || res.items.length === 0) break;
    products.push(...res.items);
    nextCursor = res.nextCursor ?? null;
  }
  console.log(products.length);

  return products;
}

async function main() {
  try {
    const items = await getItems(200);
    console.log(items);
  } catch (error) {
    console.error(error);
  }
}

main();
