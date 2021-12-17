import express from "express";
import { Op, Sequelize } from "sequelize";

const router = express.Router();

router.route("/")
    .get()
    .post();

router.route("/bulk")
    .get()
    .post()
    .put()
    .delete();



export default router;