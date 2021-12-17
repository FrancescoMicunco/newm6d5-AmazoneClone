import express from "express";
import { Op, Sequelize } from "sequelize";
import Reviews from "../../utils/models/reviews.js";

const router = express.Router();

router
    .route("/")
    .get(async(req, res, next) => {
        try {
            const reviews = await Reviews.findAll({
                where: {
                    ...(req.query.search && {
                        [Op.or]: [{
                                name: {
                                    [Op.iLike]: `%${req.query.search}%`,
                                },
                            },
                            {
                                lastName: {
                                    [Op.iLike]: `%${req.query.search}%`,
                                },
                            },
                            {
                                email: {
                                    [Op.iLike]: `%${req.query.search}%`,
                                },
                            },
                            {
                                country: {
                                    [Op.iLike]: `%${req.query.search}%`,
                                },
                            },
                        ],
                    }),
                },
                // here eventually join table
                //===================
            });
            res.send(reviews);
        } catch (error) {
            next(error);
        }
    })
    .post(async(req, res, next) => {
        try {
            const reviews = await Reviews.create(req.body);
            res.send(reviews);
        } catch (error) {
            next(error);
        }
    });

router
    .route("/:id")
    .get(async(req, res, next) => {
        try {
            const reviews = await Reviews.findOne({
                where: {
                    id: req.params.id,
                },
                //===== here eventually join
            });
            res.send(reviews);
        } catch (error) {
            next(error);
        }
    })

.put(async(req, res, next) => {
    try {
        const updateReviews = await Reviews.update(req.body, {
            where: { id: req.params.id },
            returning: true,
        });
        res.send(updateReviews);
    } catch (error) {
        next(error);
    }
})

.delete(async(req, res, next) => {
    try {
        const deletedReviews = await Reviews.destroy({
            where: { id: req.params.id },
        });
        if (deletedReviews > 0) {
            res.send("201. reviewse deleted");
        } else {
            ("reviews not found!");
        }
    } catch (error) {
        next(error);
    }
});



export default router;