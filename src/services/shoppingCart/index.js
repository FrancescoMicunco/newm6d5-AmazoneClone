import express from "express";
import { Op, Sequelize } from "sequelize";
import ShoppingCart from "../../utils/models/shoppingCart.js";
import User from "../../utils/models/users.js";



const router = express.Router();


router.route("/")
    .get(async(req, res, next) => {
        try {
            const cart = await ShoppingCart.findAll({
                include: User,

            });
            res.send(cart)
        } catch (error) {
            next(error)
        }
    })
    .post(async(req, res, next) => {
        try {
            const cart = await ShoppingCart.create(req.body);
            res.send(cart);
        } catch (error) {
            next(error);
        }
    });

router.route("/bulk")
    .get(async(req, res, next) => {
        try {

        } catch (error) {

        }
    })
    .post(async(req, res, next) => {
        try {

        } catch (error) {

        }
    })
    .put(async(req, res, next) => {
        try {

        } catch (error) {

        }
    })
    .delete(async(req, res, next) => {
        try {

        } catch (error) {

        }
    });


export default router;