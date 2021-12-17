import sequelize from "../../utils/connect.js";
import s from "sequelize";
const { DataTypes } = s;

const Reviews = sequelize.define("reviews", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

export default Reviews;