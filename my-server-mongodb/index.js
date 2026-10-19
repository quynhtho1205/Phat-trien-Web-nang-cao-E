const express = require('express');
const app = express();
const port = 3002;

const morgan = require('morgan');
app.use(morgan('combined'));

const path = require('path');
const fs = require('fs');
app.use(express.static(path.join(__dirname, 'public')));

const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.listen(port, (err) => {
  if (err) return console.error(`Cannot start server on port ${port}:`, err.message);
  console.log(`My Server listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('This Web server is processed for MongoDB');
});

const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017');
client.connect();
const database = client.db('FashionData');
const fashionCollection = database.collection('Fashion');

app.get('/fashions', cors(), async (req, res) => {
  const result = await fashionCollection.find({}).toArray();
  res.send(result);
});


app.get('/fashions/:id', cors(), async (req, res) => {
  const o_id = new ObjectId(req.params['id']);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  res.send(result[0]);
});

app.post('/fashions', cors(), async (req, res) => {
  // put json Fashion into database
  await fashionCollection.insertOne(req.body);
  // send the inserted Fashion (now with _id) back to client
  res.send(req.body);
});

app.put('/fashions', cors(), async (req, res) => {
  // fields to update; keep the old image if no new image is sent
  const fields = {
    style: req.body.style,
    fashion_subject: req.body.fashion_subject,
    fashion_detail: req.body.fashion_detail,
  };
  if (req.body.fashion_image) {
    fields.fashion_image = req.body.fashion_image;
  }
  // update json Fashion into database
  await fashionCollection.updateOne(
    { _id: new ObjectId(req.body._id) }, // condition for update
    { $set: fields }, // fields for updating
  );
  // send Fashion after updating
  const o_id = new ObjectId(req.body._id);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  res.send(result[0]);
});

app.delete('/fashions/:id', cors(), async (req, res) => {
  // find detail Fashion with id
  const o_id = new ObjectId(req.params['id']);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  // delete Fashion from database
  await fashionCollection.deleteOne({ _id: o_id });
  // send the removed Fashion back to client
  res.send(result[0]);
});

// ============================================
// Extension: relative search by name / description
// URL call: /fashions/search/name?keyword=ao
//           /fashions/search/detail?keyword=cotton
// ============================================
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

app.get('/fashions/search/name', cors(), async (req, res) => {
  const keyword = escapeRegex(req.query.keyword || '');
  const result = await fashionCollection
    .find({ fashion_subject: { $regex: keyword, $options: 'i' } })
    .toArray();
  res.send(result);
});

app.get('/fashions/search/detail', cors(), async (req, res) => {
  const keyword = escapeRegex(req.query.keyword || '');
  const result = await fashionCollection
    .find({ fashion_detail: { $regex: keyword, $options: 'i' } })
    .toArray();
  res.send(result);
});

// ============================================
// SearchFashion: rank Fashions by Cosine / Jaccard similarity
// URL call: /fashions/similarity/search?keyword=ao thun&field=subject&metric=cosine&top=10
//   field  : subject | detail
//   metric : cosine | jaccard
//   top    : number of results (0 = all)
// ============================================
const { cosineSimilarity, jaccardSimilarity } = require('./similarity');

app.get('/fashions/similarity/search', cors(), async (req, res) => {
  const keyword = req.query.keyword || '';
  const field = req.query.field === 'detail' ? 'fashion_detail' : 'fashion_subject';
  const metric = req.query.metric === 'jaccard' ? 'jaccard' : 'cosine';
  const top = parseInt(req.query.top, 10) || 0;
  const measure = metric === 'jaccard' ? jaccardSimilarity : cosineSimilarity;

  const all = await fashionCollection.find({}).toArray();
  let ranked = all
    .map((f) => ({ ...f, similarity: measure(keyword, f[field]) }))
    .filter((f) => f.similarity > 0) // only Fashions that match at least one word
    .sort((x, y) => y.similarity - x.similarity); // descending
  if (top > 0) ranked = ranked.slice(0, top);
  res.send(ranked);
});
