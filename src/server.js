import express from 'express';
import cors from 'cors';
import sequelize, { testDB } from './utils/connect.js';


const server = express();

server.use(express.json());
server.use(cors());


server.listen(process.env.PORT || 3001, async() => {
    console.log("server is running");
    await testDB();
    await sequelize.sync()
});

server.on("error", (error) => console.log("Server is not running"))