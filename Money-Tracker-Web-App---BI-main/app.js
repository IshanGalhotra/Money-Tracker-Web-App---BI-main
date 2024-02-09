// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost:27017/money-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000
});

const Expense = mongoose.model('Expense', {
  description: String,
  amount: Number
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  const expenses = await Expense.find();
  res.render('index', { expenses });
});

app.post('/addExpense', async (req, res) => {
  const { description, amount } = req.body;
  const expense = new Expense({ description, amount });
  await expense.save();
  res.redirect('/');
});

app.get('/getExpenses', async (req, res) => {
  const expenses = await Expense.find();
  res.json({ expenses });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
