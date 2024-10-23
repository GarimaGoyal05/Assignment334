const express = require("express");
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// Sample products
let products = [
    { name: "Laptop", price: 72000 },
    { name: "Smartphone", price: 28000 },
    { name: "Tablet", price: 30000 },
    { name: "Headphones", price: 5000 },
    { name: "Smartwatch", price: 3600 }
];

// Route to display the products
app.get("/products", (req, res) => {
    let filteredProducts = products;
    const searchQuery = req.query.search;

    if (searchQuery) {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    res.render("products", { products: filteredProducts });
});

app.get('/profile/:username', (req, res) => {
    const username = req.params.username;

    // Hard-coded user data based on username
    let userData = {};
    let welcomeMessage;
    switch (username) {
        case 'jane':
            welcomeMessage = "Hey Jane!!Ready for another day of gardening?";
            userData = { age: 30, hobby: 'Gardening' };
            break;
            case 'john':
            welcomeMessage = "Welcome back, John! We hope you're enjoying photography!";
            userData = { age: 25, hobby: 'Photography' };
            break;
        case 'mike':
            welcomeMessage = "Hello Mike! Dive into your next great book!";
            userData = { age: 40, hobby: 'Reading' };
            break;
        case 'sandy':
            welcomeMessage = "Hey!! What are you gonna cook today?";
            userData = { age: 37, hobby: 'Cooking' };
            break;
        default:
            welcomeMessage= "Welcome Buddss!!!";
            userData = { age: 'Unknown', hobby: 'Unknown' };
            break;
    }

    res.render('profile', { username, ...userData , welcomeMessage});
});
app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Listening on port ${PORT}`);
});
