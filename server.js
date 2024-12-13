const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const path = require('path');
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
// MongoDB connection setup
const uri = "mongodb+srv://avishek:perseverance@database.qbio8qc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = "Aces_techfest";



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (like CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

let db;
(async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
})();

// Function to get the db connection
function getDb() {
  if (!db) {
    throw new Error('MongoDB is not connected');
  }
  return db;
}

module.exports = { getDb };


app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/blog1', (req, res) => {
    res.render('blog1');
});

app.get('/blog2', (req, res) => {
    res.render('blog2');
});

app.get('/blogs', (req, res) => {
    res.render('blogs');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/hints', (req, res) => {
    res.render('hints');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/reset-password', (req, res) => {
    res.render('reset-password');
});

app.get('/scoreboard', (req, res) => {
    res.render('scoreboard');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        User = db.collection('SQL_injection');
        const user = await User.findOne({ username: username, password: password });
        if (user) {
            res.send("ACESCtf{This_is_your_2nd_flag_from_techfest_7.0}");
        } else {
            res.send("Invalid username or password.");
        }
    } catch (error) {
        res.status(500).send("An error occurred: " + error.message);
    }
});

app.listen(port, () => {
    console.log('Server running on http://localhost:3000');
});
