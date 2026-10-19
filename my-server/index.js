const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan');
app.use(morgan('combined'));

const path = require('path');
const fs = require('fs');
app.use(express.static(path.join(__dirname, 'public')));

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Create default API
app.get('/', (req, res) => {
  res.send('Hello Restful API');
});

app.listen(port, (err) => {
  if (err) return console.error(`Cannot start server on port ${port}:`, err.message);
  console.log(`My Server listening on port ${port}`);
});

let database = [
  { BookId: 'b1', BookName: 'Basic Programming Techniques', Price: 70, Image: 'b1.jpg' },
  { BookId: 'b2', BookName: 'Advanced Programming Techniques', Price: 100, Image: 'b2.jpg' },
  { BookId: 'b3', BookName: 'Introduction to Machine Learning', Price: 200, Image: 'b3.jpg' },
  { BookId: 'b4', BookName: 'Advanced Machine Learning', Price: 300, Image: 'b4.jpg' },
  { BookId: 'b5', BookName: 'Basic Robot Programming', Price: 250, Image: 'b5.jpg' },
];

app.get('/books', (req, res) => {
  res.send(database);
});

app.get('/books/:id', cors(), (req, res) => {
  id = req.params['id'];
  let p = database.find((x) => x.BookId == id);
  res.send(p);
});

// ============================================
// API to filter books by price range (min/max)
// URL call: http://localhost:3000/books/filter/price?min=250&max=300
// ============================================
app.get('/books/filter/price', cors(), (req, res) => {
  // 1. Extract the min and max values from the Query String
  let minPrice = req.query.min;
  let maxPrice = req.query.max;
  // 2. Validate the parameters
  if (!minPrice || !maxPrice) {
    return res.status(400).send('Please provide full parameters ?min=...&max=...');
  }
  // 3. Cast types to numbers and perform filtering
  let min = parseFloat(minPrice);
  let max = parseFloat(maxPrice);
  let filteredBooks = database.filter((x) => x.Price >= min && x.Price <= max);
  // 4. Return the results
  res.send(filteredBooks);
});

app.post('/books', cors(), (req, res) => {
  let newBook = req.body;
  if (newBook.ImageBase64) {
    // Strip the Base64 header (e.g., "data:image/png;base64,")
    const base64Data = newBook.ImageBase64.replace(/^data:image\/\w+;base64,/, '');
    const fileName = `${newBook.BookId}.png`;
    const destPath = path.join(__dirname, 'public', 'images', fileName);
    try {
      // Write the encoded string into an image file
      fs.writeFileSync(destPath, base64Data, 'base64');
      newBook.Image = fileName;
    } catch (error) {
      return res.status(500).send('Base64 image saving error');
    }
    delete newBook.ImageBase64;
  }
  database.push(newBook);
  res.send(database);
});

app.put('/books', cors(), (req, res) => {
  let updatedBook = req.body;
  // 1. Find the index of the book to update in the array
  const index = database.findIndex((x) => x.BookId === updatedBook.BookId);
  // If the book is not found, return a 404 error
  if (index === -1) {
    return res.status(404).send('Book not found!');
  }
  // 2. Check if the Client sent a new image
  if (updatedBook.ImageBase64) {
    // Has new image -> save a new image file (like POST)
    const base64Data = updatedBook.ImageBase64.replace(/^data:image\/\w+;base64,/, '');
    const fileName = `${updatedBook.BookId}_${Date.now()}.png`;
    const destPath = path.join(__dirname, 'public', 'images', fileName);
    try {
      fs.writeFileSync(destPath, base64Data, 'base64');
      updatedBook.Image = fileName;
    } catch (error) {
      return res.status(500).send('Error saving Base64 image!');
    }
    // Delete the base64 string to save memory
    delete updatedBook.ImageBase64;
  } else {
    // NO new image -> Keep the old image name from the database
    updatedBook.Image = database[index].Image;
  }
  // 3. Overwrite the new data at the correct index
  database[index] = updatedBook;
  // 4. Return the book list so Angular can update the UI
  res.send(database);
});

app.delete('/books/:id', cors(), (req, res) => {
  const id = req.params['id'];
  database = database.filter((x) => x.BookId !== id);
  res.send(database);
});