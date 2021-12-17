import sequelize from "../../utils/connect.js";
import s from "sequelize";
const { DataTypes } = s;

const ShoppingCart = sequelize.define("shoppingCart", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    }
});




export default ShoppingCart;