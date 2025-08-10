const express = require("express");
const app = express();
const PORT = 3000;

/** ---------- Config you can tweak ---------- **/
const TOTAL_ITEMS = 5000;       // dataset size
const MAX_LIMIT = 200;          // upper bound for limit param
const RL_MAX_RPS = 8;           // naive per-IP requests/second
const FLAKY_RATE = 0.10;        // 10% failures when ?flaky=1
/** ----------------------------------------- **/

/** Build a deterministic dataset */
const ITEMS = Array.from({ length: TOTAL_ITEMS }, (_, i) => {
  const id = `item_${i + 1}`;
  const price = 100 + ((i * 37) % 100000); // spread 100..100199 (wraps)
  const category = ["tools", "books", "electronics", "toys"][(i % 4)];
  return { id, price, category, name: `Product ${i + 1}` };
});

/** Simple per-IP rate limiter (1-second window) */
const hits = new Map();
app.use((req, res, next) => {
  const ip = req.ip || "unknown";
  const now = Date.now();
  const windowStart = now - 1000;

  const arr = (hits.get(ip) || []).filter(t => t > windowStart);
  arr.push(now);
  hits.set(ip, arr);

  if (arr.length > RL_MAX_RPS) {
    res.set("Retry-After", "1");
    return res.status(429).json({ error: "Rate limit exceeded. Try again shortly." });
  }
  next();
});

/** Optional chaos: random 429/500 and artificial delay
 *  ?flaky=1 enables failures ~FLAKY_RATE of the time
 *  ?delayMs=XYZ adds delay to the response
 */
app.use(async (req, res, next) => {
  const delayMs = Number(req.query.delayMs || 0);
  if (delayMs > 0) {
    await new Promise(r => setTimeout(r, Math.min(delayMs, 5000)));
  }
  if (req.query.flaky === "1" && Math.random() < FLAKY_RATE) {
    return Math.random() < 0.5
      ? res.status(429).json({ error: "Too Many Requests (flaky test)" })
      : res.status(500).json({ error: "Internal Server Error (flaky test)" });
  }
  next();
});

/** Helper: parse & clamp limit */
function getLimit(req) {
  const lim = Number(req.query.limit || 100);
  return Math.max(1, Math.min(lim, MAX_LIMIT));
}

/** 1) Page + limit: /page?{page,limit}
 *    - page starts at 1
 *    - Response: { items, count, total, page, totalPages }
 */
app.get("/page", (req, res) => {
  const limit = getLimit(req);
  const page = Math.max(1, Number(req.query.page || 1));

  const total = ITEMS.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const slice = ITEMS.slice(start, start + limit);

  res.json({
    items: slice,
    count: slice.length,
    total,
    page,
    totalPages,
  });
});

/** 2) Offset + limit: /offset?{offset,limit}
 *    - offset starts at 0
 *    - Response: { items, count, total, offset, limit }
 */
app.get("/offset", (req, res) => {
  const limit = getLimit(req);
  const offset = Math.max(0, Number(req.query.offset || 0));

  const total = ITEMS.length;
  const slice = ITEMS.slice(offset, offset + limit);

  res.json({
    items: slice,
    count: slice.length,
    total,
    offset,
    limit,
  });
});

/** 3) Cursor-based: /cursor?{cursor,limit}
 *    - cursor is a base64-encoded integer index (start)
 *    - Response: { items, count, nextCursor }
 */
function encodeCursor(i) {
  return Buffer.from(String(i), "utf8").toString("base64");
}
function decodeCursor(c) {
  if (!c) return 0;
  const s = Buffer.from(c, "base64").toString("utf8");
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}
app.get("/cursor", (req, res) => {
  const limit = getLimit(req);
  const start = decodeCursor(req.query.cursor);

  const end = Math.min(start + limit, ITEMS.length);
  const slice = ITEMS.slice(start, end);
  const nextCursor = end >= ITEMS.length ? null : encodeCursor(end);

  res.json({
    items: slice,
    count: slice.length,
    nextCursor,
  });
});

/** 4) Link header pagination: /link?{page,limit}
 *    - Adds RFC5988 Link: <URL>; rel="next"
 *    - Response body mirrors /page
 */
app.get("/link", (req, res) => {
  const limit = getLimit(req);
  const page = Math.max(1, Number(req.query.page || 1));

  const total = ITEMS.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const slice = ITEMS.slice(start, start + limit);

  if (page < totalPages) {
    const nextUrl = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);
    nextUrl.searchParams.set("page", String(page + 1));
    nextUrl.searchParams.set("limit", String(limit));
    res.set("Link", `<${nextUrl.toString()}>; rel="next"`);
  }
  res.json({
    items: slice,
    count: slice.length,
    total,
    page,
    totalPages,
  });
});

app.listen(PORT, () => {
  console.log(`Practice API running on http://localhost:${PORT}`);
  console.log(`Endpoints: /page, /offset, /cursor, /link   (add ?flaky=1 or ?delayMs=500)`);
});
