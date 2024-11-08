const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure cors middleware with specific options
app.use(cors({
    origin: '*',  // Replace with your frontend's actual port
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  }));

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Balerobe123',
    database: 'ometo_capstone',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Register user endpoint
app.post('/register', (req, res) => {
    const { fullName, email, password } = req.body;

    const query = `INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)`;
    db.query(query, [fullName, email, password], (err, results) => {
        if (err) {
            console.error('Error registering user: ' + err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error logging in: ' + err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
        } else {
            res.status(200).json({ message: 'Login successful' });
        }
    });
});

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// ...
app.post('/personalInfoForm', (req, res) => {
    console.log('Received request to /personalInfoForm');
    const { firstName, lastName, address, city, zipcode, state } = req.body;

    const query = `
        INSERT INTO usersInfo (id, firstName, lastName, address, city, zipcode, state)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE firstName=?, lastName=?, address=?, city=?, zipcode=?, state=?
    `;

    db.query(
        insertQuery,
        [userId, firstName, lastName, address, city, zipcode, state, firstName, lastName, address, city, zipcode, state],
        (err, results) => {
            if (err) {
                console.error('Error entering/updating personal info:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            console.log('User information entered/updated successfully:', results);
            res.status(201).json({ message: 'Personal Information has been entered/updated successfully' });
        }
    );
});


// app.get('/getUserInfo', (req, res) => {
//     const userId = getUserIdSomehow(); // Assuming you're passing userId as a query parameter

//     // Fetch user information based on userId from the usersInfo table
//     const getUserInfoQuery = `
//         SELECT * FROM usersInfo
//         WHERE id = ?
//     `;

//     db.query(getUserInfoQuery, [userId], (err, results) => {
//         if (err) {
//             console.error('Error fetching user information:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//             return;
//         }

//         console.log('User information fetched successfully:', results);

//         // Assuming there will be only one result (or none)
//         const userInfo = results.length > 0 ? results[0] : {};
//         res.json(userInfo);
//     });
// });


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});