import express from "express";
import { Op, Sequelize } from "sequelize";
import Products from "../../utils/models/products.js";
import Reviews from "../../utils/models/reviews.js";
import User from "../../utils/models/users.js";
import Categories from "../../utils/models/categories.js";
import ShoppingCart from "../../utils/models/shoppingCart.js";

const router = express.Router();

router
    .route("/")
    .get(async(req, res, next) => {
        try {
            const product = await Products.findAll({
                include: User,
                Categories,
                // [{
                //         model: Categories,
                //         through: { attributes: [] },
                //         where: {
                //             ...(req.query.category && {
                //                 categoryName: {
                //                     [Op.in]: req.category.categoryName.split(","),
                //                 },
                //             }),
                //         },
                //     },
                //     { model: Reviews, include: User },
                //     User
                // ],
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
            res.send(product);
        } catch (error) {
            next(error);
        }
    })
    .post(async(req, res, next) => {
        try {
            // const { categoriesId, ...rest } = req.body
            const product = await Products.create(req.body);
            // if (product) {
            //     const dataToInsert = categoriesId.map((id) => ({
            //         categoriesId: id,
            //         productsId: product.id
            //     }));
            // }
            res.send(product);
        } catch (error) {
            next(error);
        }
    });

router
    .route("/:id")
    .get(async(req, res, next) => {
        try {
            const product = await Products.findOne({
                where: {
                    id: req.params.id,
                },
                include: [User, Reviews]
                    //===== here eventually join
            });
            res.send(product);
        } catch (error) {
            next(error);
        }
    })

.put(async(req, res, next) => {
    try {
        const updateProduct = await Products.update(req.body, {
            where: { id: req.params.id },
            returning: true,
        });
        res.send(updateProduct);
    } catch (error) {
        next(error);
    }
})

.delete(async(req, res, next) => {
    try {
        const deletedProduct = await Products.destroy({
            where: { id: req.params.id },
        });
        if (deletedProduct > 0) {
            res.send("201. producte deleted");
        } else {
            ("product not found!");
        }
    } catch (error) {
        next(error);
    }
});

export default router