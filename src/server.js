import express from 'express';
import cors from 'cors';
import sequelize, { testDB } from './utils/connect.js';
import Products from './utils/models/products.js'
import Reviews from "./utils/models/reviews.js";
import Users from "./utils/models/Users.js";
import Categories from "./utils/models/categories.js";
import ShoppingCart from "./utils/models/shoppinngCart.js";
import productsRouter from "./services/products/index.js";
import shoppingCartRouter from "./services/shoppingCart/index.js";
import reviewsRouter from "./services/reviews/index.js";
import categoriesRouter from "./services/categories/index.js";
import usersRouter from "./services/users/index.js";




const server = express();

server.use(express.json());
server.use(cors());

//======== router ================
server.use("/product", productsRouter);
server.use("/reviews", reviewsRouter);
server.use("/users", usersRouter);
server.use("/categories", categoriesRouter);
server.use("/shoppingCart", shoppingCartRouter);



server.listen(process.env.PORT || 3001, async() => {
    console.log("server is running");
    await testDB();
    await sequelize.sync({ logging: false, alter: true }, );
});

server.on("error", (error) => console.log("Server is not running"))