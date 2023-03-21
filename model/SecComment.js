
const SecComment = (Sequelize, DataTypes) => {
  return Sequelize.define(
    // table name
    "seccomment",
    {
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      foreign_comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      img: {
        type: DataTypes.STRING(200),
        allownull: true
      },
      createdAt: {
        type: DataTypes.DATE(6),
        timestamps: true,

      },
      updatedAt: {
        type: DataTypes.DATE,
        timestamps: true
      }
    },
    {
      tablename: "seccomment",
      freezeTableName: true,
      timestamps: true
    }
  );
}

module.exports = SecComment;