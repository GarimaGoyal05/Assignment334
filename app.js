const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set views directory
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.use('/images', express.static('images')); // Serve image files

// Mock product data
const products = [
    { name: "Product 1", description: "Description for Product 1", image: "/images/product1.jpg" },
    { name: "Product 2", description: "Description for Product 2", image: "/images/product2.jpg" },
    { name: "Product 3", description: "Description for Product 3", image: "/images/product3.jpg" },
];

// Route to display the product catalog
app.get("/products", (req, res) => {
    res.render("products", { products });
});

// Route to display the contact form
app.get("/contact", (req, res) => {
    res.render("contact", { error: null }); // Pass an empty error variable when rendering the form
});

// Handle contact form submission
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    // Simple validation to check if all fields are filled
    if (!name || !email || !message) {
        return res.render("contact", { error: "All fields are required." });
    }

    // Render thank you message with entered data
    res.render("thank-you", { name, email, message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
