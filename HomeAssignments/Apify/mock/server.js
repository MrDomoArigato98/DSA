const express = require("express");
const app = express();
const PORT = 3000;

const MAX_PER_FETCH = 1000;
const MIN_PRICE = 0;
const MAX_PRICE = 100000;

function makeCatalog() {
  const products = [];
  let id = 1;

  // Broad random spread (20k items)
  for (let i = 0; i < 20000; i++) {
    const price = Math.floor(Math.random() * (MAX_PRICE + 1));
    products.push({ id: id++, price, name: `Random-${id}` });
  }

  // Cluster around 5,000 (12k items)
  for (let i = 0; i < 12000; i++) {
    const price = 5000 + Math.floor((Math.random() - 0.5) * 400); // 4800–5200
    products.push({ id: id++, price, name: `Cluster5000-${id}` });
  }

  // Previously: all 19999 — now spread over ±10 so it’s splittable
  for (let i = 0; i < 2500; i++) {
    const price = 19990 + Math.floor(Math.random() * 21); // 19990–20010
    products.push({ id: id++, price, name: `Near20k-${id}` });
  }

  // Cluster near 80k (7k items)
  for (let i = 0; i < 7000; i++) {
    const price = 80000 + Math.floor((Math.random() - 0.5) * 3000); // 78500–81500
    products.push({ id: id++, price, name: `Cluster80k-${id}` });
  }

  return products;
}

const CATALOG = makeCatalog();

app.get("/products", (req, res) => {
  const minPrice = Number(req.query.minPrice);
  const maxPrice = Number(req.query.maxPrice);

  if (
    Number.isNaN(minPrice) ||
    Number.isNaN(maxPrice) ||
    minPrice < MIN_PRICE ||
    maxPrice > MAX_PRICE ||
    minPrice > maxPrice
  ) {
    return res.status(400).json({
      error:
        "Provide valid minPrice/maxPrice within 0–100000 and ensure minPrice <= maxPrice.",
    });
  }

  const matched = CATALOG.filter(
    (p) => p.price >= minPrice && p.price <= maxPrice
  );

  const total = matched.length;
  const slice = matched.slice(0, MAX_PER_FETCH);

  res.json({
    total,
    count: slice.length,
    products: slice,
  });
});

app.listen(PORT, () => {
  console.log(`Dummy API running on http://localhost:${PORT}`);
});
