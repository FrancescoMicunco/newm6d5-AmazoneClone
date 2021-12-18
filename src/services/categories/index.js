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
                            categoryName: {
                                [Op.iLike]: `%${req.query.search}%`,
                            },
                        }, ],
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
        const deletedCategory = await Categories.destroy({
            where: { id: req.params.id },
        });
        if (deletedCategory > 0) {
            res.send("201. category deleted");
        } else {
            ("category not found!");
        }
    } catch (error) {
        next(error);
    }
});

export default router;