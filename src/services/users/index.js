import express from "express";
import { Op, Sequelize } from "sequelize";
import Products from "../../utils/models/products.js";
import User from "../../utils/models/users.js";

const router = express.Router();


router
    .route("/")
    .get(async(req, res, next) => {
        try {
            const user = await User.findAll({
                include: Products,
                where: {
                    ...(req.query.search && {
                        [Op.or]: [{
                                name: {
                                    [Op.iLike]: `%${req.query.search}%`
                                },
                            },
                            {
                                lastName: {
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
                    // here eventually join table
                    //include: [{ model: Products, attributes: { exclude: ["readTimeValue"] } }]

                },

            });
            res.send(user)

        } catch (error) {
            next(error)
        }
    })
    .post(async(req, res, next) => {
        try {
            const user = await User.create(req.body)
            res.send(user)
        } catch (error) {
            next(error)
        }
    });

router
    .route("/:id")
    .get(async(req, res, next) => {
        try {
            const user = await User.findOne({
                where: {
                    id: req.params.id,
                },
                //===== here eventually join
            });
            res.send(user);
        } catch (error) {
            next(error);
        }
    })

.put(async(req, res, next) => {
    try {
        const updateUser = await User.update(req.body, {
            where: { id: req.params.id },
            returning: true,
        });
        res.send(updateUser)


    } catch (error) {
        next(error)
    }
})



.delete(async(req, res, next) => {
    try {
        const deletedUser = await User.destroy({
            where: { id: req.params.id, },

        });
        if (deletedUser > 0) {
            res.send("201. Usere deleted");
        } else {
            ("User not found!");
        }
    } catch (error) {
        next(error)
    }
});




//======== here bulk section
//   .post(async (req, res, next) => {
//     try {
//       const user = await User.bulkCreate(req.body);
//       res.send(user);
//     } catch (error) {
//       next(error);
//     }
//   });



export default router