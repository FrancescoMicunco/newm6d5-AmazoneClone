import express from "express";
import { Op, Sequelize } from "sequelize";
import User from "../../utils/models/users.js";

const router = express.Router();


router
    .route("/")
    .get(async(req, res, next) => {
        try {
            const user = User.findAll({
                where: {
                    ...(req.query.search && {
                        [Op.or]: [{
                                name: {
                                    [Op.iLike]: `%${req.query.search}%`
                                },
                            },
                            {
                                lastname: {
                                    [Op.iLike]: `%${req.query.search}%`
                                },
                            },
                            {
                                email: {
                                    [Op.iLike]: `%${req.query.search}%`
                                },
                            },
                            {
                                country: {
                                    [Op.iLike]: `%${req.query.search}%`
                                },
                            },
                        ],
                    }),
                },
                // here eventually join table
                //===================
            });
            res.send(user)

        } catch (error) {
            next(error)
        }
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




export default router