import sequelize from "../connect.js";

const ProductCategory = sequelize.define(

    "productCategory", {}, { timestamp: false }
);

export default ProductCategory