// similarity.js - text similarity measures for SearchFashion
// Text -> tokens: lowercase, remove Vietnamese accents, keep letters/digits only
function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 0);
}

// Cosine similarity on term-frequency vectors: (A·B) / (|A| * |B|)
function cosineSimilarity(textA, textB) {
  const a = tokenize(textA);
  const b = tokenize(textB);
  if (a.length === 0 || b.length === 0) return 0;
  const tfA = {};
  const tfB = {};
  a.forEach((t) => (tfA[t] = (tfA[t] || 0) + 1));
  b.forEach((t) => (tfB[t] = (tfB[t] || 0) + 1));
  let dot = 0;
  for (const t in tfA) if (tfB[t]) dot += tfA[t] * tfB[t];
  const normA = Math.sqrt(Object.values(tfA).reduce((s, v) => s + v * v, 0));
  const normB = Math.sqrt(Object.values(tfB).reduce((s, v) => s + v * v, 0));
  return dot / (normA * normB);
}

// Jaccard similarity on token sets: |A ∩ B| / |A ∪ B|
function jaccardSimilarity(textA, textB) {
  const a = new Set(tokenize(textA));
  const b = new Set(tokenize(textB));
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  a.forEach((t) => {
    if (b.has(t)) inter++;
  });
  return inter / (a.size + b.size - inter);
}

module.exports = { tokenize, cosineSimilarity, jaccardSimilarity };
