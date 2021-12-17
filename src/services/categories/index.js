import express from "express";
import { Op, Sequelize } from "sequelize";
import Categories from "../../utils/models/categories.js";

const router = express.Router();

router
    .route("/")
    .get(async(req, res, next) => {
        try {
            const categories = await Categories.findAll({
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
            res.send(categories);
        } catch (error) {
            next(error);
        }
    })
    .post(async(req, res, next) => {
        try {
            const categories = await Categories.create(req.body);
            res.send(categories);
        } catch (error) {
            next(error);
        }
    });

router
    .route("/:id")
    .get(async(req, res, next) => {
        try {
            const categories = await Categories.findOne({
                where: {
                    id: req.params.id,
                },
                //===== here eventually join
            });
            res.send(categories);
        } catch (error) {
            next(error);
        }
    })

.put(async(req, res, next) => {
    try {
        const updateCategorie = await Categories.update(req.body, {
            where: { id: req.params.id },
            returning: true,
        });
        res.send(updateCategorie);
    } catch (error) {
        next(error);
    }
})

.delete(async(req, res, next) => {
    try {
        const deletedCategorie = await Categories.destroy({
            where: { id: req.params.id },
        });
        if (deletedCategorie > 0) {
            res.send("201. categoriee deleted");
        } else {
            ("categorie not found!");
        }
    } catch (error) {
        next(error);
    }
});

export default router;