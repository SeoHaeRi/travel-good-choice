
const Post = (Sequelize, DataTypes) => {
    return Sequelize.define(
        // table name
        "post",
        {

            index_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING(25),
                allowNull: false,
            },
            star: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            maintext: {
                type: DataTypes.STRING(3000),
                allowNull: false,
            },
            region: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            writer: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            img: {
                type: DataTypes.STRING(1000),
                allownull: true
            },
            createdAt: {
                type: DataTypes.DATE,
                timestamps: true,

            },
            updatedAt: {
                type: DataTypes.DATE(6),
                timestamps: true
            },
            userid: {
                type: DataTypes.STRING(40),
                allowNull: false,
            },
            //korea_region:{
            //  type:DataTypes.STRING(10),
            //  allowNull:false
            //}
        },
        {
            tablename: "post",
            freezeTableName: true,
            timestamps: true
        }
    );
}

module.exports = Post;