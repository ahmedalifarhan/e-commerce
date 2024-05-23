const express = require("express");
const app = express();

const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);

module.exports = app;
