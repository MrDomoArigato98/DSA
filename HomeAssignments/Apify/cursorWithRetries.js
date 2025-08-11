const DEFAULT_ENDPOINT = "http://localhost:3000/cursor";
const DEFAULT_TIMEOUT = 3000;
const DEFAULT_BACKOFFMS = 500;
const DEFAULT_RETRIES = 3;
const DEFAULT_ITEM_LIMIT = 100;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(
  url,
  {
    retries = DEFAULT_RETRIES,
    backoffMs = DEFAULT_BACKOFFMS,
    timeoutMs = DEFAULT_TIMEOUT,
  } = {}
) {
  let lastError;
  
  for (let attempts = 1; attempts <= retries; attempts++) {
    const waitTime = backoffMs * 2 ** (attempts - 1);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeoutMs);
    try {
      const res = await fetch(url, { signal: controller.signal });

      if (res.ok) {
        return await res.json();
      }

      const retryable =
        res.status === 429 || (res.status >= 500 && res.status <= 599);

      if (!retryable || attempts === retries) {
        throw new Error(
          `Failed with HTTP Status ${res.status} ${res.statusText}`
        );
      }
      await sleep(waitTime);
      continue;
    } catch (error) {
      lastError = error;
      if (attempts === retries) throw error;
      await sleep(waitTime);
    } finally {
      clearTimeout(timeoutId);
    }
  }
  throw lastError || new Error(`fetchWithRetry() failed`);
}

async function fetchData(nextCursor = null, limit) {
  const qs = new URLSearchParams({ limit: String(limit) });
  if (nextCursor !== null && nextCursor !== "") {
    qs.set("cursor", nextCursor);
  }
  //   console.log(qs)
  const url = `${DEFAULT_ENDPOINT}?${qs.toString()}`;
  return fetchWithRetry(url);
}

async function getItems(limit = DEFAULT_ITEM_LIMIT) {
  const first = await fetchData(null, limit);
  let nextCursor = first.nextCursor;

  const products = [...first.items];
  let counter = 1;
  while (nextCursor != null && nextCursor !== "") {
    const res = await fetchData(nextCursor, limit);
    if (!res || !res.items || res.items.length === 0) break;
    products.push(...res.items);
    nextCursor = res.nextCursor ?? null;
    console.log(counter);
    counter++;
  }
  return products;
}

async function main() {
  try {
    const products = await getItems(200);
    console.log(products.length);
  } catch (error) {
    console.error(error);
  }
}

main();
