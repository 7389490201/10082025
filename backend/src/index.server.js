const express = require("express");
const app = express();
const env = require("dotenv").config();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes")
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");

app.use(cors())
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the E-commerce API"
    });
})

app.post("/data", (req, res) => {
    res.status(200).json({
        data: req.body
    })
})

mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(PORT, () => { console.log("server is connected on port " + PORT); })
        console.log("Database is connected");
    }).catch((err) => { console.log(err); })
