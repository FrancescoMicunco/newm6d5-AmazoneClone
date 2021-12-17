import express from "express";
import { Op, Sequelize } from "sequelize";

const router = express.Router();

router
    .route("/")
    .get(async(req, res, next) => {
        try {} catch (error) {}
    })
    .post(async(req, res, next) => {
        try {} catch (error) {}
    });

router
    .route("/bulk")
    .get(async(req, res, next) => {
        try {} catch (error) {}
    })
    .post(async(req, res, next) => {
        try {} catch (error) {}
    })
    .put(async(req, res, next) => {
        try {} catch (error) {}
    })
    .delete(async(req, res, next) => {
        try {} catch (error) {}
    });

export default router;