import sequelize from "../../utils/connect.js";
import s from "sequelize";
const { DataTypes } = s;

const Categories = sequelize.define("categories", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Categories;